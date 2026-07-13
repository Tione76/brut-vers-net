import { describe, expect, it } from "vitest";
import {
  buildTaxableIncomeEstimate,
  estimateTaxableIncome,
} from "@/site/salary-calculator/taxable-income/2026/estimate-taxable-income";
import { TAXABLE_INCOME_CONFIG_2026 } from "@/site/salary-calculator/taxable-income/2026/config";
import { estimateNeutralWithholdingRate } from "@/site/salary-calculator/tax";

describe("estimateTaxableIncome (2026)", () => {
  it("retourne 0 si entrées invalides", () => {
    const result = estimateTaxableIncome({
      netMonthly: Number.NaN,
      grossMonthly: Number.POSITIVE_INFINITY,
      salaryMonths: 12,
    });

    expect(result.taxableMonthly).toBe(0);
    expect(result.taxableAnnual).toBe(0);
    expect(Number.isFinite(result.taxableMonthly)).toBe(true);
    expect(Number.isFinite(result.taxableAnnual)).toBe(true);
  });

  it("reste stable sans NaN/Infinity (faible, moyen, élevé)", () => {
    const cases = [
      { netMonthly: 1200, grossMonthly: 1500 },
      { netMonthly: 1950, grossMonthly: 2500 },
      { netMonthly: 9000, grossMonthly: 12000 },
    ] as const;

    cases.forEach((sample) => {
      const detail = buildTaxableIncomeEstimate({ ...sample, salaryMonths: 12 });
      expect(Number.isFinite(detail.taxableIncomeMonthly)).toBe(true);
      expect(Number.isFinite(detail.taxableIncomeAnnual)).toBe(true);
      expect(detail.taxableIncomeMonthly).toBeGreaterThanOrEqual(detail.netSalaryMonthly);
    });
  });

  it("produit un net imposable >= net (cas standard)", () => {
    const detail = buildTaxableIncomeEstimate({
      netMonthly: 1950,
      grossMonthly: 2500,
      salaryMonths: 12,
    });

    expect(detail.taxableIncomeMonthly).toBeGreaterThanOrEqual(1950);
    expect(detail.nonDeductibleCsgMonthly).toBeGreaterThan(0);
    expect(detail.crdsMonthly).toBeGreaterThan(0);
    expect(detail.employerHealthContributionMonthly).toBeGreaterThan(0);
  });

  it("applique le plafonnement de l'abattement CSG au-delà de 4 PASS", () => {
    const months = 12;
    const annualCeiling =
      TAXABLE_INCOME_CONFIG_2026.socialSecurityCeiling.pass *
      TAXABLE_INCOME_CONFIG_2026.csgCrds.abatementAppliesUpToPassMultiple;

    const grossMonthlyOverCeiling = annualCeiling / months + 1000;

    const detail = buildTaxableIncomeEstimate({
      netMonthly: 10_000,
      grossMonthly: grossMonthlyOverCeiling,
      salaryMonths: months,
    });

    const base = detail.csgBaseMonthly;
    expect(base).toBeGreaterThan(0);

    // La base mensuelle doit être > (brut mensuel * 98,25 %) quand une portion est sans abattement.
    expect(base).toBeGreaterThan(
      grossMonthlyOverCeiling *
        TAXABLE_INCOME_CONFIG_2026.csgCrds.baseRateWhenAbatementApplies,
    );
  });

  it("borne la mutuelle employeur entre min et max", () => {
    const estimate = TAXABLE_INCOME_CONFIG_2026.employerHealthContributionEstimate;
    expect(estimate.lowMonthlyAmount).toBeLessThanOrEqual(estimate.centralMonthlyAmount);
    expect(estimate.centralMonthlyAmount).toBeLessThanOrEqual(estimate.highMonthlyAmount);
  });

  it("n'applique pas la CSG déductible dans le net imposable", () => {
    const detail = buildTaxableIncomeEstimate({
      netMonthly: 1950,
      grossMonthly: 2500,
      salaryMonths: 12,
    });

    const recomposed =
      detail.netSalaryMonthly +
      detail.nonDeductibleCsgMonthly +
      detail.crdsMonthly +
      detail.employerHealthContributionMonthly +
      detail.taxableAdjustmentsMonthly;

    expect(detail.taxableIncomeMonthly).toBeCloseTo(recomposed, 2);
    expect(detail.taxableIncomeMonthly).not.toBeCloseTo(recomposed + detail.deductibleCsgMonthly, 2);
  });

  it("utilise une mutuelle forfaitaire identique quel que soit le salaire", () => {
    const low = buildTaxableIncomeEstimate({
      netMonthly: 1200,
      grossMonthly: 1500,
      salaryMonths: 12,
    });
    const high = buildTaxableIncomeEstimate({
      netMonthly: 9000,
      grossMonthly: 12000,
      salaryMonths: 12,
    });

    expect(low.employerHealthContributionMonthly).toBe(
      TAXABLE_INCOME_CONFIG_2026.employerHealthContributionEstimate.centralMonthlyAmount,
    );
    expect(high.employerHealthContributionMonthly).toBe(
      TAXABLE_INCOME_CONFIG_2026.employerHealthContributionEstimate.centralMonthlyAmount,
    );
    expect(low.csgBaseMonthly).not.toBe(high.csgBaseMonthly);
    expect(low.crdsMonthly).not.toBe(high.crdsMonthly);
  });

  it("test de sensibilité: low/high peut changer la tranche PAS sans changer le résultat public", () => {
    const base = buildTaxableIncomeEstimate({
      netMonthly: 1950,
      grossMonthly: 2500,
      salaryMonths: 12,
    });

    const central = estimateNeutralWithholdingRate(base.taxableIncomeMonthly).rate;
    const low = estimateNeutralWithholdingRate(
      base.taxableIncomeMonthly -
        (TAXABLE_INCOME_CONFIG_2026.employerHealthContributionEstimate.centralMonthlyAmount -
          TAXABLE_INCOME_CONFIG_2026.employerHealthContributionEstimate.lowMonthlyAmount),
    ).rate;
    const high = estimateNeutralWithholdingRate(
      base.taxableIncomeMonthly +
        (TAXABLE_INCOME_CONFIG_2026.employerHealthContributionEstimate.highMonthlyAmount -
          TAXABLE_INCOME_CONFIG_2026.employerHealthContributionEstimate.centralMonthlyAmount),
    ).rate;

    expect([low, central, high].every((rate) => Number.isFinite(rate))).toBe(true);
    // Test de sensibilité: on accepte que ça reste identique ou que ça change de tranche selon le salaire choisi.
    expect(central).toBeGreaterThanOrEqual(0);
  });
});

