export type DismissalSituation =
  | "standard"
  | "professionalUnfitness"
  | "grossMisconduct";

export type ConventionKnowledge = "unknown" | "no" | "yes";

export type BonusKind = "annual" | "exceptional";

export interface DismissalCompensationInput {
  situation: DismissalSituation;
  seniorityYears: string;
  seniorityMonths: string;
  /** Moyenne 12 mois, ou moyenne sur tous les mois travaillés si ancienneté < 12 mois. */
  average12Months: string;
  average3Months: string;
  hasBonus: boolean;
  bonusAmount: string;
  bonusKind: BonusKind;
  conventionKnowledge: ConventionKnowledge;
  conventionAmount: string;
  /** Case secondaire : alternance temps plein / temps partiel. */
  mixedWorkTime: boolean;
}

export type ReferenceMethod = "average12" | "average3" | "averageWorked";

export interface DismissalCompensationResult {
  seniorityYears: number;
  seniorityMonths: number;
  seniorityTotalMonths: number;
  seniorityInYears: number;
  eligible: boolean;
  zeroReason: "belowMinSeniority" | "grossMisconduct" | "mixedWorkTime" | null;
  average12: number | null;
  average3: number | null;
  average3BeforeBonus: number | null;
  bonusMonthlyProration: number;
  referenceSalary: number;
  referenceMethod: ReferenceMethod;
  referenceMethodLabel: string;
  firstBracketYears: number;
  secondBracketYears: number;
  firstBracketAmount: number;
  secondBracketAmount: number;
  legalBaseAmount: number;
  professionalUnfitnessApplied: boolean;
  legalAmount: number;
  conventionAmount: number | null;
  retainedAmount: number;
  retainedSource: "legal" | "convention";
  resultLabel: string;
  summaryBrief: string;
}
