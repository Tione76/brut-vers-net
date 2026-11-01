/**
 * Calculs pédagogiques pour /salaire-minimum-monaco.
 * Les montants officiels horaires et mensuels restent ceux publiés par circulaire.
 * L'indemnité de 5 % se calcule sur la base pertinente, puis s'arrondit au centime.
 */

import { roundCent } from "@/site/salary-calculator/conversions";

export const MC_INDEMNITY_RATE = 0.05;

/** Indemnité exceptionnelle de 5 %, arrondie au centime. */
export function exceptionAllowance(base: number): number {
  return roundCent(base * MC_INDEMNITY_RATE);
}

/** Somme base + indemnité de 5 %, avant cotisations applicables et avant impôt. */
export function totalBeforeDeductions(base: number): number {
  return roundCent(base + exceptionAllowance(base));
}

/** Prorata pédagogique d'un mensuel officiel selon la durée hebdomadaire. */
export function prorataOfficialMonthly(
  officialMonthly: number,
  weeklyHours: number,
  fullTimeWeeklyHours: number,
): number {
  if (fullTimeWeeklyHours <= 0) return 0;
  return roundCent((officialMonthly * weeklyHours) / fullTimeWeeklyHours);
}

export function formatMcEuro(amount: number, digits = 2): string {
  return `${amount.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })} €`;
}
