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
import { getNearbyGrossToNetAmounts } from "./content";
import { buildCalculatorGrossPrefillHref } from "./prefill";
import {
  GROSS_TO_NET_REDESIGN_DATE_MODIFIED,
  buildPage1000FaqItems,
  formatPilotEuro,
  resolveGrossToNetSeoMeta,
} from "./page-1000-pilot";

describe("série salaire brut mensuel → net (1 000 → 6 000)", () => {
  it("publie 101 montants de 1 000 € à 6 000 € par pas de 50 €", () => {
    expect(GROSS_TO_NET_AMOUNTS).toHaveLength(101);
    expect(PUBLISHED_GROSS_TO_NET_AMOUNTS).toBe(GROSS_TO_NET_AMOUNTS);
    expect(GROSS_TO_NET_AMOUNTS[0]).toBe(1000);
    expect(GROSS_TO_NET_AMOUNTS[100]).toBe(6000);
    expect(isGrossToNetAmount(1000)).toBe(true);
    expect(isGrossToNetAmount(1050)).toBe(true);
    expect(isGrossToNetAmount(3500)).toBe(true);
    expect(isGrossToNetAmount(3550)).toBe(true);
    expect(isGrossToNetAmount(6000)).toBe(true);
    expect(isGrossToNetAmount(6050)).toBe(false);
    expect(parseGrossToNetMontantParam("1000")).toBe(1000);
    expect(parseGrossToNetMontantParam("3500")).toBe(3500);
    expect(parseGrossToNetMontantParam("3550")).toBe(3550);
    expect(parseGrossToNetMontantParam("6000")).toBe(6000);
    expect(parseGrossToNetMontantParam("6050")).toBeNull();
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

  it("applique le SEO du modèle 1 000 € à une fiche de la série (1 050 €)", () => {
    const seo = resolveGrossToNetSeoMeta(1050);
    const faq = buildPage1000FaqItems(1050);
    const label = formatPilotEuro(1050);

    expect(seo.title).toBe("1 050 € brut en net : combien ça fait ?");
    expect(seo.h1).toBe(seo.title);
    expect(seo.title).not.toMatch(/par mois/i);
    expect(seo.description).toContain("1 050 euros brut en net");
    expect(seo.description).not.toMatch(/\d[\d\s\u00a0\u202f]*€/);
    expect(seo.answerH2).toBe(`${label} brut : combien en net selon votre statut ?`);
    expect(faq).toHaveLength(5);
    expect(faq[0]?.question).toBe(`Combien font ${label} brut en net ?`);
    expect(faq.some((item) => item.question.includes("prime"))).toBe(true);

    const blob = [
      seo.title,
      seo.description,
      seo.h1,
      seo.answerH2,
      ...faq.flatMap((item) => [item.question, item.answer]),
    ].join(" ");
    expect(blob).not.toContain("\u2014");
    expect(blob).not.toMatch(/combien-gagner-brut-mensuel/);
    expect(GROSS_TO_NET_REDESIGN_DATE_MODIFIED).toBe("2026-10-31");
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
    expect(getNearbyGrossToNetAmounts(3500)).toContain(3550);
    expect(getNearbyGrossToNetAmounts(6000)).not.toContain(6000);
    expect(getNearbyGrossToNetAmounts(6000)).toHaveLength(7);
  });

  it(
    "indexe Hub, Index et fiches publiées dans sitemap / pages publiques",
    async () => {
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

      for (const amount of [1000, 1050, 2000, 3500, 3550, 6000] as const) {
        const path = grossToNetPath(amount);
        expect(publicPaths.has(path)).toBe(true);
        expect(sitemapPaths.has(path)).toBe(true);
        expect(isPathIndexable(path)).toBe(true);
      }

      expect(isPathIndexable(grossToNetPath(6050))).toBe(false);
    },
    30_000,
  );
});
