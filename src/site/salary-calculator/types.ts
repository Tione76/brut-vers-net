export type EmploymentProfile =
  | "nonExecutive"
  | "executive"
  | "publicService";

export type SalaryInputField =
  | "grossHourly"
  | "grossMonthly"
  | "grossAnnual"
  | "netHourly"
  | "netMonthly"
  | "netAnnual";

export type SalaryMonths = 12 | 13 | 14 | 15 | 16;

export type SalaryFieldValues = Record<SalaryInputField, string>;

export interface CalculatorInput {
  activeInput: SalaryInputField | null;
  activeValue: string;
  profile: EmploymentProfile;
  workTimePercent: number;
  salaryMonths: SalaryMonths;
  withholdingTaxRate: number;
}

export interface CalculatorResult {
  grossHourly: number;
  grossMonthly: number;
  grossAnnual: number;
  netHourly: number;
  netMonthly: number;
  netAnnual: number;
  withholdingMonthly: number;
  withholdingAnnual: number;
  netAfterTaxMonthly: number;
  netAfterTaxAnnual: number;
}

export interface CalculatorState {
  salaryFields: SalaryFieldValues;
  activeInput: SalaryInputField | null;
  profile: EmploymentProfile;
  workTimePercent: number;
  salaryMonths: SalaryMonths;
  withholdingTaxRate: string;
}
