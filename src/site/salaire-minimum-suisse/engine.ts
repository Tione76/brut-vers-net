/**
 * Calculs pédagogiques pour les minimums suisses.
 * Les montants légaux restent en CHF. Le mensuel dépend du canton, des heures
 * et de la méthode locale (13e salaire, indemnités).
 */

import { roundCent } from "@/site/salary-calculator/conversions";

/** Formule pédagogique : taux × heures hebdo × 52 / 12. */
export function monthlyFromHourlyWeekly(
  hourlyGross: number,
  weeklyHours: number,
): number {
  return roundCent((hourlyGross * weeklyHours * 52) / 12);
}

/** BCE : unités de franc suisse pour 1 euro. */
export function chfToEur(amountChf: number, chfPerEur: number): number {
  if (chfPerEur <= 0) return 0;
  return roundCent(amountChf / chfPerEur);
}

export function eurToChf(amountEur: number, chfPerEur: number): number {
  return roundCent(amountEur * chfPerEur);
}

export function formatChf(amount: number, digits = 2): string {
  return `${amount.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })} CHF`;
}

export function formatChfHourly(amount: number): string {
  return `${formatChf(amount)} brut / heure`;
}

export function formatChfRange(min: number, max: number, digits = 2): string {
  return `${formatChf(min, digits)} à ${formatChf(max, digits)}`;
}

export function formatEur(amount: number, digits = 2): string {
  return `${amount.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })} €`;
}

export function formatPercent(value: number): string {
  return `${value.toLocaleString("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} %`;
}

export function percentDiffVsBase(value: number, base: number): number {
  if (base === 0) return 0;
  return Math.round(((value - base) / base) * 1000) / 10;
}
