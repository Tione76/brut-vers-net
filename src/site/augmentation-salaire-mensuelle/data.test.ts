import { describe, expect, it } from "vitest";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import { roundCent } from "@/site/salary-calculator/conversions";
import {
  MONTHLY_INCREASE_AMOUNTS,
  isMonthlyIncreaseAmount,
  monthlyIncreasePath,
  parseMonthlyIncreaseMontantParam,
} from "./config";
import {
  buildAllProfileIncreaseEstimates,
  buildIncreaseComparisonRows,
  estimateNetMonthlyGainFromGrossIncrease,
} from "./data";
import {
  buildMonthlyIncreaseEditorial,
  buildMonthlyIncreaseFaqItems,
  buildMonthlyIncreaseSeoMeta,
  getNearbyMonthlyIncreaseAmounts,
} from "./content";
import { buildIncreaseCalculatorPrefillHref } from "./prefill";

describe("série augmentation mensuelle (pilote 50 €)", () => {
  it("ne publie que le montant 50 €", () => {
    expect(MONTHLY_INCREASE_AMOUNTS).toEqual([50]);
    expect(isMonthlyIncreaseAmount(50)).toBe(true);
    expect(isMonthlyIncreaseAmount(100)).toBe(false);
    expect(parseMonthlyIncreaseMontantParam("50")).toBe(50);
    expect(parseMonthlyIncreaseMontantParam("100")).toBeNull();
    expect(monthlyIncreasePath(50)).toBe("/augmentation-salaire-mensuelle-50-euros-brut");
    expect(monthlyIncreasePath(50)).toContain("mensuelle");
  });

  it("calcule les gains nets des trois profils pour +50 € brut", () => {
    const estimates = buildAllProfileIncreaseEstimates(50);
    expect(estimates.nonExecutive.netMonthlyGain).toBe(roundCent(50 * 0.78));
    expect(estimates.executive.netMonthlyGain).toBe(
      roundCent(50 * getProfileCoefficient("executive")),
    );
    expect(estimates.publicService.netMonthlyGain).toBe(roundCent(50 * 0.81));
    expect(estimates.nonExecutive.netAnnualGain).toBe(
      roundCent(estimates.nonExecutive.netMonthlyGain * 12),
    );
    expect(estimateNetMonthlyGainFromGrossIncrease(50)).toBe(39);
  });

  it("génère le tableau 25 / 50 / 75 / 100 autour de 50 € (sans 0 €)", () => {
    const rows = buildIncreaseComparisonRows(50);
    expect(rows.map((row) => row.grossMonthlyIncrease)).toEqual([25, 50, 75, 100]);
    expect(rows.find((row) => row.isCurrent)?.grossMonthlyIncrease).toBe(50);
  });

  it("applique le SEO pilote sans tiret cadratin et avec « mensuelle »", () => {
    const seo = buildMonthlyIncreaseSeoMeta(50);
    const estimates = buildAllProfileIncreaseEstimates(50);
    const faq = buildMonthlyIncreaseFaqItems(50, estimates);
    const editorial = buildMonthlyIncreaseEditorial(50, estimates);

    expect(seo.h1).toMatch(/^Une augmentation mensuelle de 50[\u00a0\u202f ]€ brut : combien en net \?$/);
    expect(seo.title).toMatch(
      /^Augmentation mensuelle de 50[\u00a0\u202f ]€ brut : combien en net \?$/,
    );
    expect([...seo.title].length).toBeLessThanOrEqual(60);
    expect(seo.description).toMatch(/non-cadre, cadre ou fonction publique/);
    expect(seo.description).toMatch(/estimez gratuitement votre augmentation/);
    expect([...seo.description].length).toBeLessThanOrEqual(210);
    expect(seo.answerH2).toMatch(
      /^Combien rapporte une augmentation mensuelle de 50[\u00a0\u202f ]€ brut en net \?$/,
    );
    expect(faq[0]?.question).toMatch(
      /^Quel est le gain net d'une augmentation de 50[\u00a0\u202f ]€ brut \?$/,
    );
    expect(faq[2]?.answer).toContain("Pour un calcul personnalisé");
    expect(faq[2]?.answer).toContain("bulletin de salaire reste la référence officielle");

    const blob = [
      seo.title,
      seo.description,
      seo.h1,
      seo.answerH2,
      ...faq.flatMap((item) => [item.question, item.answer]),
      ...editorial.flatMap((section) => [section.title, ...section.paragraphs]),
    ].join(" ");
    expect(blob).not.toContain("\u2014");
  });

  it("préremplit le calculateur d'augmentation", () => {
    expect(buildIncreaseCalculatorPrefillHref(50, "nonExecutive")).toBe(
      "/calculateurs/augmentation-salaire?augmentation=50&profil=non-cadre",
    );
    expect(buildIncreaseCalculatorPrefillHref(75, "executive")).toContain("profil=cadre");
  });

  it("prépare les montants proches sans lier de pages non publiées", () => {
    expect(getNearbyMonthlyIncreaseAmounts(50)).toEqual([]);
    expect(isMonthlyIncreaseAmount(100)).toBe(false);
  });
});
