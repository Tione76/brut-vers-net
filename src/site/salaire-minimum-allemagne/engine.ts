/**
 * Calculs pédagogiques pour le Mindestlohn allemand.
 * Le minimum légal est un taux horaire brut : le mensuel dépend des heures.
 */

import { roundCent } from "@/site/salary-calculator/conversions";

/** Formule pédagogique : taux × heures hebdo × 52 / 12. */
export function monthlyFromHourlyWeekly(
  hourlyGross: number,
  weeklyHours: number,
): number {
  return roundCent((hourlyGross * weeklyHours * 52) / 12);
}

/** Conversion Eurostat pour l'Allemagne depuis juillet 2025 : (horaire × 38,8) × 4,345. */
export function eurostatMonthlyFromHourly(
  hourlyGross: number,
  weeklyHours = 38.8,
  monthFactor = 4.345,
): number {
  return Math.round(hourlyGross * weeklyHours * monthFactor);
}

export function absoluteDiff(a: number, b: number): number {
  return roundCent(a - b);
}

/** Pourcentage d'écart par rapport à la base `base`, arrondi à 1 décimale. */
export function percentDiffVsBase(value: number, base: number): number {
  if (base === 0) return 0;
  return Math.round(((value - base) / base) * 1000) / 10;
}

export function formatDeEuro(amount: number, digits = 2): string {
  return `${amount.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })} €`;
}

export function formatDeHourly(amount: number): string {
  return `${formatDeEuro(amount)} brut / heure`;
}

export function formatDePercent(value: number): string {
  return `${value.toLocaleString("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} %`;
}
