import { roundCent } from "../../conversions";
import { TAXABLE_INCOME_CONFIG_2026 } from "./config";
import type {
  TaxableIncomeEstimateDetail,
  TaxableIncomeInputs,
  TaxableIncomeQuickEstimate,
} from "./types";

function safeAmount(value: number): number {
  if (!Number.isFinite(value) || value < 0) {
    return 0;
  }
  return value;
}

export function estimateCsgBaseMonthly(
  params: {
    grossMonthly: number;
    salaryMonths: number;
  },
  config: typeof TAXABLE_INCOME_CONFIG_2026,
): number {
  const grossMonthlySafe = safeAmount(params.grossMonthly);
  const months = safeAmount(params.salaryMonths);

  if (grossMonthlySafe <= 0 || months <= 0) {
    return 0;
  }

  const grossAnnual = grossMonthlySafe * months;
  const ceilingAnnual =
    config.socialSecurityCeiling.pass * config.csgCrds.abatementAppliesUpToPassMultiple;

  const abatedAnnualPortion = Math.min(grossAnnual, ceilingAnnual);
  const nonAbatedAnnualPortion = Math.max(0, grossAnnual - ceilingAnnual);

  const baseAnnual =
    abatedAnnualPortion * config.csgCrds.baseRateWhenAbatementApplies + nonAbatedAnnualPortion;

  if (!Number.isFinite(baseAnnual) || baseAnnual <= 0) {
    return 0;
  }

  return roundCent(baseAnnual / 12);
}

export function estimateDeductibleCsgMonthly(
  csgBaseMonthly: number,
  config: typeof TAXABLE_INCOME_CONFIG_2026,
): number {
  const base = safeAmount(csgBaseMonthly);
  return roundCent(base * config.csgCrds.deductibleCsgRate);
}

export function estimateNonDeductibleCsgMonthly(
  csgBaseMonthly: number,
  config: typeof TAXABLE_INCOME_CONFIG_2026,
): number {
  const base = safeAmount(csgBaseMonthly);
  return roundCent(base * config.csgCrds.nonDeductibleCsgRate);
}

export function estimateCrdsMonthly(
  csgBaseMonthly: number,
  config: typeof TAXABLE_INCOME_CONFIG_2026,
): number {
  const base = safeAmount(csgBaseMonthly);
  return roundCent(base * config.csgCrds.crdsRate);
}

export function estimateEmployerHealthContributionMonthly(
  config: typeof TAXABLE_INCOME_CONFIG_2026,
): number {
  const amount = safeAmount(config.employerHealthContributionEstimate.centralMonthlyAmount);
  if (amount <= 0) {
    return 0;
  }
  return roundCent(amount);
}

export function estimateTaxableAdjustmentsMonthly(): number {
  return 0;
}

function emptyDetail(version: string, assumptions: readonly string[]): TaxableIncomeEstimateDetail {
  return {
    netSalaryMonthly: 0,
    taxableIncomeMonthly: 0,
    taxableIncomeAnnual: 0,
    csgBaseMonthly: 0,
    deductibleCsgMonthly: 0,
    nonDeductibleCsgMonthly: 0,
    crdsMonthly: 0,
    employerHealthContributionMonthly: 0,
    taxableAdjustmentsMonthly: 0,
    version,
    assumptions,
    isEstimation: true,
  };
}

export function buildTaxableIncomeEstimate(
  inputs: TaxableIncomeInputs,
  config: typeof TAXABLE_INCOME_CONFIG_2026 = TAXABLE_INCOME_CONFIG_2026,
): TaxableIncomeEstimateDetail {
  if (
    !Number.isFinite(inputs.netMonthly) ||
    !Number.isFinite(inputs.grossMonthly) ||
    !Number.isFinite(inputs.salaryMonths)
  ) {
    return emptyDetail(`${config.year}`, config.assumptions);
  }

  const netMonthly = safeAmount(inputs.netMonthly);
  const grossMonthly = safeAmount(inputs.grossMonthly);
  const salaryMonths = safeAmount(inputs.salaryMonths);

  if (netMonthly <= 0 && grossMonthly <= 0) {
    return emptyDetail(`${config.year}`, config.assumptions);
  }

  const csgBaseMonthly = estimateCsgBaseMonthly(
    { grossMonthly, salaryMonths },
    config,
  );
  const deductibleCsgMonthly = estimateDeductibleCsgMonthly(csgBaseMonthly, config);
  const nonDeductibleCsgMonthly = estimateNonDeductibleCsgMonthly(csgBaseMonthly, config);
  const crdsMonthly = estimateCrdsMonthly(csgBaseMonthly, config);
  const employerHealthContributionMonthly = estimateEmployerHealthContributionMonthly(config);
  const taxableAdjustmentsMonthly = estimateTaxableAdjustmentsMonthly();

  const taxableIncomeMonthly =
    netMonthly +
    nonDeductibleCsgMonthly +
    crdsMonthly +
    employerHealthContributionMonthly +
    taxableAdjustmentsMonthly;

  const taxableIncomeAnnual = taxableIncomeMonthly * salaryMonths;

  return {
    netSalaryMonthly: roundCent(netMonthly),
    taxableIncomeMonthly: roundCent(taxableIncomeMonthly),
    taxableIncomeAnnual: roundCent(taxableIncomeAnnual),
    csgBaseMonthly: roundCent(csgBaseMonthly),
    deductibleCsgMonthly: roundCent(deductibleCsgMonthly),
    nonDeductibleCsgMonthly: roundCent(nonDeductibleCsgMonthly),
    crdsMonthly: roundCent(crdsMonthly),
    employerHealthContributionMonthly: roundCent(employerHealthContributionMonthly),
    taxableAdjustmentsMonthly: roundCent(taxableAdjustmentsMonthly),
    version: `${config.year}`,
    assumptions: config.assumptions,
    isEstimation: true,
  };
}

export function estimateTaxableIncome(
  inputs: TaxableIncomeInputs,
): TaxableIncomeQuickEstimate {
  const detail = buildTaxableIncomeEstimate(inputs, TAXABLE_INCOME_CONFIG_2026);
  return {
    taxableMonthly: detail.taxableIncomeMonthly,
    taxableAnnual: detail.taxableIncomeAnnual,
    version: detail.version,
    isEstimation: true,
  };
}
