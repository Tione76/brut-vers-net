import { describe, expect, it } from "vitest";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import { roundCent } from "@/site/salary-calculator/conversions";
import {
  GROSS_TO_NET_AMOUNTS,
  GROSS_TO_NET_HUB_PATH,
  GROSS_TO_NET_INDEX_PATH,
  PUBLISHED_GROSS_TO_NET_AMOUNTS,
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

describe("série salaire brut mensuel → net (vague 1 : 1 000 → 3 500)", () => {
  it("publie 51 montants de 1 000 € à 3 500 € par pas de 50 €", () => {
    expect(GROSS_TO_NET_AMOUNTS).toHaveLength(51);
    expect(PUBLISHED_GROSS_TO_NET_AMOUNTS).toBe(GROSS_TO_NET_AMOUNTS);
    expect(GROSS_TO_NET_AMOUNTS[0]).toBe(1000);
    expect(GROSS_TO_NET_AMOUNTS[50]).toBe(3500);
    expect(isGrossToNetAmount(1000)).toBe(true);
    expect(isGrossToNetAmount(1050)).toBe(true);
    expect(isGrossToNetAmount(3500)).toBe(true);
    expect(isGrossToNetAmount(3550)).toBe(false);
    expect(parseGrossToNetMontantParam("1000")).toBe(1000);
    expect(parseGrossToNetMontantParam("3500")).toBe(3500);
    expect(parseGrossToNetMontantParam("3550")).toBeNull();
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

  it("propose des montants proches publiés sans auto-lien", () => {
    expect(getNearbyGrossToNetAmounts(1000)).toEqual([
      1050, 1100, 1150, 1200, 1250, 1300, 1350,
    ]);
    expect(getNearbyGrossToNetAmounts(1000)).not.toContain(1000);
    expect(getNearbyGrossToNetAmounts(3500)).not.toContain(3550);
  });

  it("indexe Hub, Index et fiches publiées dans sitemap / pages publiques", async () => {
    const { getAllPublicPages, getSitemapEntries, isPathIndexable } = await import(
      "@/site/public-pages"
    );
    const publicPaths = new Set(getAllPublicPages().map((page) => page.path));
    const sitemapPaths = new Set(getSitemapEntries().map((entry) => entry.path));

    expect(publicPaths.has(GROSS_TO_NET_HUB_PATH)).toBe(true);
    expect(publicPaths.has(GROSS_TO_NET_INDEX_PATH)).toBe(true);
    expect(sitemapPaths.has(GROSS_TO_NET_HUB_PATH)).toBe(true);
    expect(sitemapPaths.has(GROSS_TO_NET_INDEX_PATH)).toBe(true);
    expect(isPathIndexable(GROSS_TO_NET_HUB_PATH)).toBe(true);
    expect(isPathIndexable(GROSS_TO_NET_INDEX_PATH)).toBe(true);

    for (const amount of [1000, 1050, 2000, 3500] as const) {
      const path = grossToNetPath(amount);
      expect(publicPaths.has(path)).toBe(true);
      expect(sitemapPaths.has(path)).toBe(true);
      expect(isPathIndexable(path)).toBe(true);
    }

    expect(isPathIndexable(grossToNetPath(3550))).toBe(false);
  });
});
