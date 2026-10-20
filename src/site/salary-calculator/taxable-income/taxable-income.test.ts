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

  it("produit un net imposable >= net (cas standard) sans mutuelle forfaitaire", () => {
    const detail = buildTaxableIncomeEstimate({
      netMonthly: 1950,
      grossMonthly: 2500,
      salaryMonths: 12,
    });

    expect(detail.taxableIncomeMonthly).toBeGreaterThanOrEqual(1950);
    expect(detail.nonDeductibleCsgMonthly).toBeGreaterThan(0);
    expect(detail.crdsMonthly).toBeGreaterThan(0);
    expect(detail.employerHealthContributionMonthly).toBe(0);
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

    expect(base).toBeGreaterThan(
      grossMonthlyOverCeiling *
        TAXABLE_INCOME_CONFIG_2026.csgCrds.baseRateWhenAbatementApplies,
    );
  });

  it("n'ajoute plus de majoration forfaitaire de mutuelle", () => {
    const estimate = TAXABLE_INCOME_CONFIG_2026.employerHealthContributionEstimate;
    expect(estimate.centralMonthlyAmount).toBe(0);
    expect(estimate.lowMonthlyAmount).toBe(0);
    expect(estimate.highMonthlyAmount).toBe(0);
    expect(estimate.methodology).toBe("omitted_unknown_contract_amount");
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

  it("garde CSG/CRDS proportionnels au salaire sans mutuelle fixe", () => {
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

    expect(low.employerHealthContributionMonthly).toBe(0);
    expect(high.employerHealthContributionMonthly).toBe(0);
    expect(low.csgBaseMonthly).not.toBe(high.csgBaseMonthly);
    expect(low.crdsMonthly).not.toBe(high.crdsMonthly);
  });

  it("sélectionne la tranche PAS sur la base CSG/CRDS sans forfait mutuelle", () => {
    const base = buildTaxableIncomeEstimate({
      netMonthly: 1950,
      grossMonthly: 2500,
      salaryMonths: 12,
    });

    expect(base.taxableIncomeMonthly).toBeCloseTo(2021.23, 2);
    expect(estimateNeutralWithholdingRate(base.taxableIncomeMonthly).rate).toBe(2.9);
  });
});
