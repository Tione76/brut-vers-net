/**
 * Calculs HCR (IDCC 1979) : comparaison SMIC / minima d'avenant,
 * mensualisation 35 h et 39 h avec majoration des 36e-39e heures.
 *
 * Arrondi : chaque composante monétaire est arrondie au centime
 * (même convention que le calculateur d'heures supplémentaires).
 * À 35 h, lorsque le SMIC s'impose, le brut mensuel officiel publié
 * est retenu à la place de 12,31 × 151,67 (écart d'arrondi).
 */

import { roundCent } from "@/site/salary-calculator/conversions";
import { SMIC_CURRENT, SMIC_MONTHLY_HOURS } from "@/site/smic/data";

export const HCR_IDCC = 1979;

export const HCR_WEEKLY_LEGAL_HOURS = 35;
export const HCR_WEEKLY_CONVENTIONAL_HOURS = 39;
export const HCR_STRUCTURAL_OT_WEEKLY_HOURS = 4;

/** Base mensualisée affichée sur la plupart des bulletins (35 × 52 ÷ 12). */
export const HCR_BASE_MONTHLY_HOURS = SMIC_MONTHLY_HOURS;

/** Volume exact des 4 heures supplémentaires hebdomadaires mensualisées. */
export const HCR_MONTHLY_OT_HOURS = (HCR_STRUCTURAL_OT_WEEKLY_HOURS * 52) / 12;

/** 39 × 52 ÷ 12. */
export const HCR_MONTHLY_HOURS_AT_39 = (HCR_WEEKLY_CONVENTIONAL_HOURS * 52) / 12;

export const HCR_OT_RATE_36_TO_39 = 0.1;
export const HCR_OT_RATE_40_TO_43 = 0.2;
export const HCR_OT_RATE_FROM_44 = 0.5;

/** Minimum garanti (repas HCR), même arrêté que le SMIC du 1er juin 2026. */
export const MINIMUM_GARANTI = 4.35;

/** SMIC horaire brut à Mayotte, arrêté du 22 mai 2026. */
export const MAYOTTE_SMIC_HOURLY = 9.56;

export type HcrLevel = 1 | 2 | 3 | 4 | 5;
export type HcrEchelon = 1 | 2 | 3;

export type HcrClassification = {
  level: HcrLevel;
  echelon: HcrEchelon;
  conventionalHourly: number;
};

/**
 * Quinze minima horaires de l'avenant n° 33 du 19 juin 2024, article 2.
 * Valeurs conventionnelles brutes, avant comparaison avec le SMIC.
 */
export const HCR_CONVENTIONAL_RATES: readonly HcrClassification[] = [
  { level: 1, echelon: 1, conventionalHourly: 12.0 },
  { level: 1, echelon: 2, conventionalHourly: 12.08 },
  { level: 1, echelon: 3, conventionalHourly: 12.18 },
  { level: 2, echelon: 1, conventionalHourly: 12.28 },
  { level: 2, echelon: 2, conventionalHourly: 12.55 },
  { level: 2, echelon: 3, conventionalHourly: 13.17 },
  { level: 3, echelon: 1, conventionalHourly: 13.32 },
  { level: 3, echelon: 2, conventionalHourly: 13.54 },
  { level: 3, echelon: 3, conventionalHourly: 14.0 },
  { level: 4, echelon: 1, conventionalHourly: 14.4 },
  { level: 4, echelon: 2, conventionalHourly: 14.77 },
  { level: 4, echelon: 3, conventionalHourly: 15.4 },
  { level: 5, echelon: 1, conventionalHourly: 18.43 },
  { level: 5, echelon: 2, conventionalHourly: 21.78 },
  { level: 5, echelon: 3, conventionalHourly: 28.12 },
] as const;

const LEVEL_ROMAN: Record<HcrLevel, string> = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
};

export function hcrLevelLabel(level: HcrLevel): string {
  return LEVEL_ROMAN[level];
}

export function applicableHourlyRate(
  conventionalHourly: number,
  smicHourly: number = SMIC_CURRENT.hourlyGross,
): number {
  return Math.max(conventionalHourly, smicHourly);
}

export function isCaughtBySmic(
  conventionalHourly: number,
  smicHourly: number = SMIC_CURRENT.hourlyGross,
): boolean {
  return conventionalHourly < smicHourly;
}

/**
 * Brut mensuel de base à 35 h.
 * Si le SMIC s'impose, on retient le montant mensuel officiel (1 867,02 €),
 * et non le produit horaire × 151,67 h.
 */
export function monthlyBaseAt35h(
  applicableHourly: number,
  smicHourly: number = SMIC_CURRENT.hourlyGross,
  smicMonthly: number = SMIC_CURRENT.monthlyGross,
): number {
  if (applicableHourly === smicHourly) {
    return smicMonthly;
  }
  return roundCent(applicableHourly * HCR_BASE_MONTHLY_HOURS);
}

/** Rémunération des 4 heures supplémentaires hebdomadaires mensualisées, majorées à +10 %. */
export function monthlyOvertimeAt39h(applicableHourly: number): number {
  return roundCent(applicableHourly * (1 + HCR_OT_RATE_36_TO_39) * HCR_MONTHLY_OT_HOURS);
}

export function monthlyTotalAt39h(
  applicableHourly: number,
  smicHourly: number = SMIC_CURRENT.hourlyGross,
  smicMonthly: number = SMIC_CURRENT.monthlyGross,
): number {
  return roundCent(
    monthlyBaseAt35h(applicableHourly, smicHourly, smicMonthly) +
      monthlyOvertimeAt39h(applicableHourly),
  );
}

export type HcrGridRow = {
  level: HcrLevel;
  echelon: HcrEchelon;
  levelLabel: string;
  conventionalHourly: number;
  applicableHourly: number;
  caughtBySmic: boolean;
  monthlyGross35h: number;
  overtimeGross39h: number;
  monthlyGross39h: number;
};

export function buildHcrGridRow(
  classification: HcrClassification,
  smicHourly: number = SMIC_CURRENT.hourlyGross,
  smicMonthly: number = SMIC_CURRENT.monthlyGross,
): HcrGridRow {
  const applicableHourly = applicableHourlyRate(classification.conventionalHourly, smicHourly);
  const caughtBySmic = isCaughtBySmic(classification.conventionalHourly, smicHourly);
  const monthlyGross35h = monthlyBaseAt35h(applicableHourly, smicHourly, smicMonthly);
  const overtimeGross39h = monthlyOvertimeAt39h(applicableHourly);
  return {
    level: classification.level,
    echelon: classification.echelon,
    levelLabel: hcrLevelLabel(classification.level),
    conventionalHourly: classification.conventionalHourly,
    applicableHourly,
    caughtBySmic,
    monthlyGross35h,
    overtimeGross39h,
    monthlyGross39h: roundCent(monthlyGross35h + overtimeGross39h),
  };
}

export function getHcrGridRows(
  smicHourly: number = SMIC_CURRENT.hourlyGross,
  smicMonthly: number = SMIC_CURRENT.monthlyGross,
): HcrGridRow[] {
  return HCR_CONVENTIONAL_RATES.map((classification) =>
    buildHcrGridRow(classification, smicHourly, smicMonthly),
  );
}

export function getHcrRow(
  level: HcrLevel,
  echelon: HcrEchelon,
  smicHourly: number = SMIC_CURRENT.hourlyGross,
  smicMonthly: number = SMIC_CURRENT.monthlyGross,
): HcrGridRow {
  const classification = HCR_CONVENTIONAL_RATES.find(
    (item) => item.level === level && item.echelon === echelon,
  );
  if (!classification) {
    throw new Error(`Classification HCR inconnue : niveau ${level} échelon ${echelon}`);
  }
  return buildHcrGridRow(classification, smicHourly, smicMonthly);
}

export function formatHcrEuro(value: number): string {
  return `${new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace(/\u202f|\u00a0| /g, "\u00a0")}\u00a0€`;
}

export function formatHcrHours(value: number, digits = 2): string {
  return `${new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
    .format(value)
    .replace(/\u202f|\u00a0| /g, "\u00a0")}\u00a0h`;
}

export function formatHcrRate(value: number): string {
  return formatHcrEuro(value);
}
