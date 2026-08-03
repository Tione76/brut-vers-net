import { describe, expect, it } from "vitest";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import { roundCent } from "@/site/salary-calculator/conversions";
import {
  GROSS_TO_NET_AMOUNTS,
  grossToNetPath,
  isGrossToNetAmount,
  parseGrossToNetMontantParam,
} from "./config";
import {
  buildAllProfileNetEstimates,
  buildGrossToNetComparisonRows,
  estimateNetMonthlyFromGross,
} from "./data";
import {
  buildGrossToNetEditorial,
  buildGrossToNetFaqItems,
  buildGrossToNetSeoMeta,
  getNearbyGrossToNetAmounts,
} from "./content";
import { buildCalculatorGrossPrefillHref } from "./prefill";

describe("série salaire brut mensuel → net (pilote 1 000 €)", () => {
  it("ne publie que le montant 1 000 €", () => {
    expect(GROSS_TO_NET_AMOUNTS).toEqual([1000]);
    expect(isGrossToNetAmount(1000)).toBe(true);
    expect(isGrossToNetAmount(1050)).toBe(false);
    expect(parseGrossToNetMontantParam("1000")).toBe(1000);
    expect(parseGrossToNetMontantParam("1050")).toBeNull();
    expect(grossToNetPath(1000)).toBe("/quel-salaire-net-mensuel-pour-1000-euros-brut");
    expect(grossToNetPath(1000)).toContain("mensuel");
  });

  it("calcule les nets des trois profils pour 1 000 € brut", () => {
    const estimates = buildAllProfileNetEstimates(1000);
    expect(estimates.nonExecutive.netMonthly).toBe(780);
    expect(estimates.executive.netMonthly).toBe(750);
    expect(estimates.publicService.netMonthly).toBe(810);
    expect(estimates.nonExecutive.netAnnual).toBe(9360);
    expect(estimateNetMonthlyFromGross(1000, "executive")).toBe(
      roundCent(1000 * getProfileCoefficient("executive")),
    );
  });

  it("génère le tableau 900 / 950 / 1000 / 1050 / 1100 autour de 1 000 €", () => {
    const rows = buildGrossToNetComparisonRows(1000);
    expect(rows.map((row) => row.grossMonthly)).toEqual([900, 950, 1000, 1050, 1100]);
    expect(rows.find((row) => row.isCurrent)?.grossMonthly).toBe(1000);
  });

  it("applique le SEO pilote sans tiret cadratin et sans fuite de 1 500 €", () => {
    const seo = buildGrossToNetSeoMeta(1000);
    const estimates = buildAllProfileNetEstimates(1000);
    const faq = buildGrossToNetFaqItems(1000, estimates);
    const editorial = buildGrossToNetEditorial(1000, estimates);

    expect(seo.h1).toMatch(
      /^Quel salaire net mensuel pour 1[\u00a0\u202f ]?000[\u00a0\u202f ]€ brut par mois \?$/,
    );
    expect(seo.title).toMatch(
      /^1[\u00a0\u202f ]?000[\u00a0\u202f ]€ brut par mois : combien en net \?$/,
    );
    expect([...seo.title].length).toBeLessThanOrEqual(60);
    expect(seo.description).toMatch(
      /brut par mois en net \? Estimation selon votre statut \(non-cadre, cadre ou fonction publique\)/,
    );
    expect([...seo.description].length).toBeLessThanOrEqual(160);
    expect(seo.answerH2).toMatch(
      /^Quel salaire net pour 1[\u00a0\u202f ]?000[\u00a0\u202f ]€ brut par mois \?$/,
    );
    expect(faq).toHaveLength(3);
    expect(faq[0]?.question).toMatch(/1[\u00a0\u202f ]?000/);
    expect(faq[2]?.answer).toContain("utilisez notre calculateur de salaire brut et net");

    const blob = [
      seo.title,
      seo.description,
      seo.h1,
      seo.answerH2,
      ...faq.flatMap((item) => [item.question, item.answer]),
      ...editorial.flatMap((section) => [section.title, ...section.paragraphs]),
    ].join(" ");
    expect(blob).not.toContain("\u2014");
    expect(blob).not.toMatch(/1[\u00a0\u202f ]?500/);
    expect(blob).not.toMatch(/combien-gagner-brut-mensuel/);
  });

  it("préremplit le calculateur principal avec brut et profil", () => {
    expect(buildCalculatorGrossPrefillHref(1000, "nonExecutive")).toBe(
      "/?brut=1000&profil=non-cadre",
    );
    expect(buildCalculatorGrossPrefillHref(1100, "executive")).toContain("profil=cadre");
  });

  it("prépare les montants proches sans lier de pages non publiées", () => {
    expect(getNearbyGrossToNetAmounts(1000)).toEqual([]);
    expect(isGrossToNetAmount(1050)).toBe(false);
  });

  it("reste hors sitemap / pages publiques tant que la fiche est pilote", async () => {
    const { getAllPublicPages, getSitemapEntries, isPathIndexable } = await import(
      "@/site/public-pages"
    );
    const path = grossToNetPath(1000);
    expect(getAllPublicPages().some((page) => page.path === path)).toBe(false);
    expect(getSitemapEntries().some((entry) => entry.path === path)).toBe(false);
    expect(isPathIndexable(path)).toBe(false);
  });
});
