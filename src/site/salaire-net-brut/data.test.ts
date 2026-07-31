import { describe, expect, it } from "vitest";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import { roundCent } from "@/site/salary-calculator/conversions";
import {
  NET_TO_GROSS_AMOUNTS,
  isNetToGrossAmount,
  netToGrossPath,
  parseNetToGrossMontantParam,
} from "./config";
import {
  buildAllProfileEstimates,
  buildComparisonRows,
  buildNearbyLinks,
  estimateGrossMonthlyFromNet,
} from "./data";
import {
  buildSeriesEditorial,
  buildSeriesFaqItems,
  buildSeriesSeoMeta,
  getSeriesNearbyAmounts,
} from "./page-1500-content";

describe("salaire-net-brut série mensuelle", () => {
  it("utilise le format URL combien-gagner-brut-mensuel-pour-{n}-net pour toute la série", () => {
    for (const amount of NET_TO_GROSS_AMOUNTS) {
      expect(netToGrossPath(amount)).toBe(`/combien-gagner-brut-mensuel-pour-${amount}-net`);
    }
    expect(parseNetToGrossMontantParam("1500")).toBe(1500);
    expect(parseNetToGrossMontantParam("3000")).toBe(3000);
    expect(parseNetToGrossMontantParam("1499")).toBeNull();
  });

  it("préserve les montants proches validés de la page 1 500 €", () => {
    expect(getSeriesNearbyAmounts(1500)).toEqual([
      1600, 1700, 1800, 1900, 2000, 2500, 3000,
    ]);
  });

  it("exclut la page courante des montants proches", () => {
    const nearby = getSeriesNearbyAmounts(2000);
    expect(nearby).not.toContain(2000);
    expect(nearby.every((amount) => isNetToGrossAmount(amount))).toBe(true);
    expect(nearby).toHaveLength(7);
  });

  it("calcule les trois profils pour 1 500 € et 2 000 €", () => {
    const e1500 = buildAllProfileEstimates(1500);
    expect(e1500.nonExecutive.grossMonthly).toBe(1923.08);
    expect(e1500.executive.grossMonthly).toBe(2000);
    expect(e1500.publicService.grossMonthly).toBe(roundCent(1500 / 0.81));

    const e2000 = buildAllProfileEstimates(2000);
    expect(e2000.nonExecutive.grossMonthly).toBe(roundCent(2000 / 0.78));
    expect(e2000.executive.grossMonthly).toBe(roundCent(2000 / 0.75));
  });

  it("génère un tableau à trois colonnes autour du montant", () => {
    const rows = buildComparisonRows(2000);
    expect(rows.map((row) => row.netMonthly)).toEqual([1900, 1950, 2000, 2050, 2100]);
    for (const row of rows) {
      expect(row.nonExecutive).toBe(roundCent(row.netMonthly / 0.78));
      expect(row.executive).toBe(roundCent(row.netMonthly / getProfileCoefficient("executive")));
      expect(row.publicService).toBe(roundCent(row.netMonthly / 0.81));
    }
  });

  it("applique le SEO modèle sans tiret cadratin et sans 1 500 € sur les autres pages", () => {
    const seo1600 = buildSeriesSeoMeta(1600);
    const seo2000 = buildSeriesSeoMeta(2000);
    const seo3000 = buildSeriesSeoMeta(3000);
    const faq2000 = buildSeriesFaqItems(2000, buildAllProfileEstimates(2000));
    const editorial2000 = buildSeriesEditorial(2000, buildAllProfileEstimates(2000));

    expect(seo1600.h1).toContain("par mois");
    expect(seo1600.title).toMatch(/brut mensuel/);
    expect(seo1600.title).not.toContain("| Calcul gratuit");
    expect([...seo1600.title].length).toBeLessThanOrEqual(60);
    expect(seo2000.description).toContain("2");
    expect(seo2000.description).not.toContain("non-cadre");
    expect(seo3000.title).not.toMatch(/1[\u00a0\u202f]500/);

    const blob = [
      seo2000.title,
      seo2000.description,
      seo2000.h1,
      ...faq2000.flatMap((item) => [item.question, item.answer]),
      ...editorial2000.flatMap((section) => [section.title, ...section.paragraphs]),
    ].join(" ");
    expect(blob).not.toContain("\u2014");
    expect(blob).not.toMatch(/1[\u00a0\u202f]500/);
  });

  it("aligne buildNearbyLinks legacy sur les nouvelles URLs", () => {
    const nearby = buildNearbyLinks(1600);
    expect(nearby.every((item) => item.href === netToGrossPath(item.netMonthly))).toBe(true);
    expect(estimateGrossMonthlyFromNet(1600)).toBe(roundCent(1600 / 0.78));
  });
});
