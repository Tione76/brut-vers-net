export interface TaxableIncomeInputs {
  netMonthly: number;
  grossMonthly: number;
  salaryMonths: number;
}

export interface TaxableIncomeEstimateDetail {
  netSalaryMonthly: number;
  taxableIncomeMonthly: number;
  taxableIncomeAnnual: number;
  csgBaseMonthly: number;
  deductibleCsgMonthly: number;
  nonDeductibleCsgMonthly: number;
  crdsMonthly: number;
  employerHealthContributionMonthly: number;
  taxableAdjustmentsMonthly: number;
  version: string;
  assumptions: readonly string[];
  isEstimation: true;
}

export interface TaxableIncomeQuickEstimate {
  taxableMonthly: number;
  taxableAnnual: number;
  version: string;
  isEstimation: true;
}

