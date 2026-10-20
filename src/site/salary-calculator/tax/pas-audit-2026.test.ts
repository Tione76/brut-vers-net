import { describe, expect, it } from "vitest";
import {
  applyWithholdingAmounts,
  buildCalculatorInput,
  calculateSalary,
} from "@/site/salary-calculator/engine";
import { buildTaxableIncomeEstimate } from "@/site/salary-calculator/taxable-income/2026/estimate-taxable-income";
import {
  estimateNeutralWithholdingRate,
  NEUTRAL_WITHHOLDING_RATE_2026,
} from "@/site/salary-calculator/tax";
import type { EmploymentProfile, SalaryMonths } from "@/site/salary-calculator/types";

/**
 * Grille métropole BOFiP / CGI 204 H III, applicable à compter du 1er mai 2026.
 * Valeurs indépendantes du moteur (source réglementaire, pas d'ancien snapshot interne).
 */
const OFFICIAL_METROPOLE_BRACKETS_FROM_2026_05_01 = [
  { minInclusive: 0, maxExclusive: 1635, rate: 0 },
  { minInclusive: 1635, maxExclusive: 1698, rate: 0.5 },
  { minInclusive: 1698, maxExclusive: 1807, rate: 1.3 },
  { minInclusive: 1807, maxExclusive: 1928, rate: 2.1 },
  { minInclusive: 1928, maxExclusive: 2060, rate: 2.9 },
  { minInclusive: 2060, maxExclusive: 2170, rate: 3.5 },
  { minInclusive: 2170, maxExclusive: 2315, rate: 4.1 },
  { minInclusive: 2315, maxExclusive: 2738, rate: 5.3 },
  { minInclusive: 2738, maxExclusive: 3135, rate: 7.5 },
  { minInclusive: 3135, maxExclusive: 3571, rate: 9.9 },
  { minInclusive: 3571, maxExclusive: 4019, rate: 11.9 },
  { minInclusive: 4019, maxExclusive: 4690, rate: 13.8 },
  { minInclusive: 4690, maxExclusive: 5624, rate: 15.8 },
  { minInclusive: 5624, maxExclusive: 7037, rate: 17.9 },
  { minInclusive: 7037, maxExclusive: 8789, rate: 20 },
  { minInclusive: 8789, maxExclusive: 12200, rate: 24 },
  { minInclusive: 12200, maxExclusive: 16523, rate: 28 },
  { minInclusive: 16523, maxExclusive: 25937, rate: 33 },
  { minInclusive: 25937, maxExclusive: 55558, rate: 38 },
  { minInclusive: 55558, maxExclusive: Number.POSITIVE_INFINITY, rate: 43 },
] as const;

function officialRateForBase(base: number): number {
  const bracket = OFFICIAL_METROPOLE_BRACKETS_FROM_2026_05_01.find(
    (item) => base >= item.minInclusive && base < item.maxExclusive,
  );
  return bracket?.rate ?? 43;
}

function simulateGrossMonthly(params: {
  grossMonthly: number;
  profile?: EmploymentProfile;
  salaryMonths?: SalaryMonths;
  workTimePercent?: number;
}) {
  const profile = params.profile ?? "nonExecutive";
  const salaryMonths = params.salaryMonths ?? 12;
  const workTimePercent = params.workTimePercent ?? 100;

  const input = buildCalculatorInput({
    activeInput: "grossMonthly",
    salaryFields: {
      grossHourly: "",
      grossMonthly: String(params.grossMonthly),
      grossAnnual: "",
      netHourly: "",
      netMonthly: "",
      netAnnual: "",
    },
    profile,
    workTimePercent,
    salaryMonths,
    withholdingTaxRate: 0,
  });

  if (!input) {
    throw new Error("input invalide");
  }

  const base = calculateSalary(input);
  if (!base) {
    throw new Error("calcul invalide");
  }

  const taxable = buildTaxableIncomeEstimate({
    netMonthly: base.netMonthly,
    grossMonthly: base.grossMonthly,
    salaryMonths,
  });

  const rate = estimateNeutralWithholdingRate(taxable.taxableIncomeMonthly).rate;
  const officialRate = officialRateForBase(taxable.taxableIncomeMonthly);
  const afterTax = applyWithholdingAmounts(
    base.netMonthly,
    base.netAnnual,
    taxable.taxableIncomeMonthly,
    taxable.taxableIncomeAnnual,
    rate,
  );

  return {
    grossMonthly: base.grossMonthly,
    netMonthly: base.netMonthly,
    taxableMonthly: taxable.taxableIncomeMonthly,
    rate,
    officialRate,
    withholdingMonthly: afterTax.withholdingMonthly,
    netAfterTaxMonthly: afterTax.netAfterTaxMonthly,
    employerHealth: taxable.employerHealthContributionMonthly,
  };
}

describe("audit PAS octobre 2026 : grille officielle vs moteur", () => {
  it("reproduit exactement la grille métropole BOFiP / CGI 204 H", () => {
    expect(NEUTRAL_WITHHOLDING_RATE_2026.effectiveFrom).toBe("2026-05-01");
    expect(NEUTRAL_WITHHOLDING_RATE_2026.brackets).toEqual(
      OFFICIAL_METROPOLE_BRACKETS_FROM_2026_05_01.map((bracket) => ({
        minInclusive: bracket.minInclusive,
        maxExclusive: bracket.maxExclusive,
        rate: bracket.rate,
      })),
    );
  });

  it.each([
    1500, 1800, 2000, 2200, 2500, 3000, 3500, 4000, 5000, 7000,
  ] as const)("non-cadre brut %s € : taux moteur = taux officiel sur la base estimée", (gross) => {
    const result = simulateGrossMonthly({ grossMonthly: gross });
    expect(result.employerHealth).toBe(0);
    expect(result.rate).toBe(result.officialRate);
    expect(result.rate).toBe(officialRateForBase(result.taxableMonthly));
  });

  it("cadre et fonction publique : même grille, bases différentes", () => {
    const nonExec = simulateGrossMonthly({ grossMonthly: 2500, profile: "nonExecutive" });
    const exec = simulateGrossMonthly({ grossMonthly: 2500, profile: "executive" });
    const publicService = simulateGrossMonthly({ grossMonthly: 2500, profile: "publicService" });

    expect(exec.netMonthly).toBeLessThan(nonExec.netMonthly);
    expect(publicService.netMonthly).toBeGreaterThan(nonExec.netMonthly);
    expect(exec.rate).toBe(officialRateForBase(exec.taxableMonthly));
    expect(publicService.rate).toBe(officialRateForBase(publicService.taxableMonthly));
  });

  it("13 mois et temps partiel restent cohérents avec la grille", () => {
    const months13 = simulateGrossMonthly({ grossMonthly: 2500, salaryMonths: 13 });
    const partTime = simulateGrossMonthly({
      grossMonthly: 2500,
      workTimePercent: 50,
    });

    expect(months13.rate).toBe(officialRateForBase(months13.taxableMonthly));
    expect(partTime.grossMonthly).toBe(2500);
    expect(partTime.rate).toBe(officialRateForBase(partTime.taxableMonthly));
  });

  it("seuils réglementaires : juste sous, sur et au-dessus", () => {
    const cases = [
      { base: 1634.99, rate: 0 },
      { base: 1635, rate: 0.5 },
      { base: 2059.99, rate: 2.9 },
      { base: 2060, rate: 3.5 },
      { base: 2737.99, rate: 5.3 },
      { base: 2738, rate: 7.5 },
    ] as const;

    for (const sample of cases) {
      expect(estimateNeutralWithholdingRate(sample.base).rate).toBe(sample.rate);
      expect(officialRateForBase(sample.base)).toBe(sample.rate);
    }
  });

  it("cas de référence non-cadre : valeurs attendues après suppression du forfait mutuelle", () => {
    const cases = [
      { gross: 1800, rate: 0 },
      { gross: 2000, rate: 0 },
      { gross: 2500, rate: 2.9 },
      { gross: 3000, rate: 5.3 },
      { gross: 4000, rate: 9.9 },
      { gross: 5000, rate: 13.8 },
    ] as const;

    for (const sample of cases) {
      const result = simulateGrossMonthly({ grossMonthly: sample.gross });
      expect(result.rate).toBe(sample.rate);
      expect(result.officialRate).toBe(sample.rate);
    }
  });
});
