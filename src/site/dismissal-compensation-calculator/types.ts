export type DismissalSituation =
  | "standard"
  | "professionalUnfitness"
  | "grossMisconduct";

export type SpecialSituationKey =
  | "mixedWorkTime"
  | "recentSickLeaveOrTherapeuticPartTime"
  | "partTimeParentalLeave"
  | "otherContractInterruption";

export type BonusKind = "annual" | "exceptional";

export interface DismissalCompensationInput {
  situation: DismissalSituation;
  seniorityYears: string;
  seniorityMonths: string;
  /** Moyenne 12 mois, ou moyenne sur tous les mois travaillés si ancienneté < 12 mois. */
  average12Months: string;
  average3Months: string;
  /** Salaire spécifique en inaptitude pro (article L.1226-16). */
  professionalUnfitnessAverage3Months: string;
  hasBonus: boolean;
  bonusAmount: string;
  bonusKind: BonusKind;
  /** Parcours particulier : avertissement de fiabilité uniquement. */
  specialSituations: SpecialSituationKey[];
}

export type ReferenceMethod =
  | "average12"
  | "average3"
  | "averageWorked"
  | "professionalUnfitnessAverage3";

export interface DismissalCompensationResult {
  seniorityYears: number;
  seniorityMonths: number;
  seniorityTotalMonths: number;
  seniorityInYears: number;
  eligible: boolean;
  zeroReason: "belowMinSeniority" | "grossMisconduct" | null;
  hasSpecialSituationWarning: boolean;
  selectedSpecialSituations: SpecialSituationKey[];
  average12: number | null;
  average3: number | null;
  average3BeforeBonus: number | null;
  professionalUnfitnessAverage3: number | null;
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
  retainedAmount: number;
  retainedSource: "legal";
  resultLabel: string;
  summaryBrief: string;
}
