import type { EmploymentProfile } from "@/site/salary-calculator/types";

export type FamilySituation = "single" | "married" | "pacs" | "divorced";

export type ChildrenCountOption = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type IncomeReferenceField =
  | "taxableAnnual"
  | "grossMonthly"
  | "grossAnnual"
  | "netMonthly"
  | "netAnnual";

export interface PersonIncomeInput {
  /** Si renseigné et valide, prioritaire sur le salaire. */
  taxableAnnualRaw: string;
  referenceField: IncomeReferenceField | null;
  salaryValue: string;
  profile: EmploymentProfile;
}

export interface PersonalizedPasInput {
  situation: FamilySituation;
  children: ChildrenCountOption;
  declarant: PersonIncomeInput;
  spouse: PersonIncomeInput | null;
}

export interface PersonalizedPasResult {
  householdTaxableAnnual: number;
  declarantTaxableAnnual: number;
  spouseTaxableAnnual: number;
  fiscalParts: number;
  estimatedIncomeTaxAnnual: number;
  /** Taux personnalisé estimé (%), 1 décimale. */
  personalizedRatePercent: number;
  withholdingMonthly: number;
  withholdingAnnual: number;
  /** Net avant PAS du déclarant (mensuel), si reconstitué depuis un salaire ; sinon null. */
  declarantNetMonthly: number | null;
  netAfterTaxMonthly: number | null;
  netAfterTaxAnnual: number | null;
}
