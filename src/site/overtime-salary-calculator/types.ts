import type { EmploymentProfile } from "@/site/salary-calculator/types";

export type OvertimeSalaryReferenceField = "grossMonthly" | "grossHourly" | "netMonthly";
/** `grossHourly` reste supporté par le moteur (tests / API interne) mais n'est plus exposé dans l'UI. */

export type MajorationMode = "legal" | "custom";

export type OvertimeProjectionMode = "thisMonth" | "recurring";

export interface OvertimeSalaryInput {
  referenceField: OvertimeSalaryReferenceField | null;
  salaryValue: string;
  /** En pratique : nonExecutive | executive (pas de fonction publique en v1). */
  profile: EmploymentProfile;
  group1Hours: string;
  group2Hours: string;
  majorationMode: MajorationMode;
  /** Pourcentage saisi (mode personnalisé) ; ignoré en mode légal. */
  majorationGroup1Percent: string;
  majorationGroup2Percent: string;
  projectionMode: OvertimeProjectionMode;
  /** Nombre de mois de projection (1 si « ce mois uniquement »). */
  projectionMonths: number;
}

export interface OvertimeGroupBreakdown {
  hours: number;
  majorationPercent: number;
  hourlyValue: number;
  gross: number;
}

export interface OvertimeSalaryResult {
  hourlyGrossBase: number;
  group1: OvertimeGroupBreakdown;
  group2: OvertimeGroupBreakdown;
  overtimeHoursTotal: number;
  overtimeGrossTotal: number;
  contributionRelief: number;
  /** Gain net estimé avant prélèvement à la source. */
  overtimeNetGain: number;
  baseGrossMonthly: number;
  baseNetMonthly: number;
  newGrossMonthly: number;
  newNetMonthly: number;
  projectionMonths: number;
  projectedOvertimeGross: number;
  projectedOvertimeNetGain: number;
  summaryBrief: string;
}
