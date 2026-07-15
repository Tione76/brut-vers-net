import type { EmploymentProfile, SalaryMonths } from "@/site/salary-calculator/types";
import type { WithholdingRateMode } from "@/site/salary-calculator/tax/neutral-rate.types";

export type IncreaseType = "euros" | "percent";

export type SalaryReferenceField = "grossMonthly" | "grossAnnual" | "netMonthly";

export type IncreaseReferenceField = "grossMonthlyIncrease" | "grossAnnualIncrease";

export interface SalaryIncreaseInput {
  referenceField: SalaryReferenceField | null;
  currentSalaryValue: string;
  increaseType: IncreaseType;
  increaseReferenceField: IncreaseReferenceField | null;
  increaseValue: string;
  profile: EmploymentProfile;
  salaryMonths: SalaryMonths;
  withholdingRateMode: WithholdingRateMode;
  manualWithholdingRate: number;
}

export interface SalarySnapshot {
  grossMonthly: number;
  grossAnnual: number;
  netMonthly: number;
  netAnnual: number;
  netAfterTaxMonthly: number;
  netAfterTaxAnnual: number;
}

export interface SalaryIncreaseGains {
  grossMonthly: number;
  grossAnnual: number;
  netMonthly: number;
  netAnnual: number;
  netAfterTaxMonthly: number;
  netAfterTaxAnnual: number;
}

export interface SalaryIncreasePercentGains {
  gross: number;
  net: number;
}

export interface SalaryIncreaseResult {
  before: SalarySnapshot;
  after: SalarySnapshot;
  gain: SalaryIncreaseGains;
  percentGain: SalaryIncreasePercentGains;
  summaryBrief: string;
}
