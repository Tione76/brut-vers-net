import type { EmploymentProfile } from "@/site/salary-calculator/types";
import type { WithholdingRateMode } from "@/site/salary-calculator/tax/neutral-rate.types";

export type SalaryReferenceField =
  | "grossMonthly"
  | "grossAnnual"
  | "netMonthly"
  | "netAnnual";

export interface PasCalculatorInput {
  /** Net imposable annuel saisi directement (prioritaire si valide). */
  taxableAnnualRaw: string;
  referenceField: SalaryReferenceField | null;
  currentSalaryValue: string;
  profile: EmploymentProfile;
  withholdingRateMode: WithholdingRateMode;
  manualWithholdingRate: number;
}

export interface PasCalculatorResult {
  grossMonthly: number | null;
  grossAnnual: number | null;
  netMonthly: number | null;
  netAnnual: number | null;
  withholdingRate: number;
  withholdingMonthly: number;
  withholdingAnnual: number;
  netAfterTaxMonthly: number | null;
  netAfterTaxAnnual: number | null;
  incomeSource: "salary" | "taxableAnnual";
}
