/**
 * Calculs pédagogiques pour le salaire social minimum luxembourgeois.
 * Les montants officiels mensuels et horaires restent ceux publiés par l'ITM / la CCSS.
 * On ne reconstitue pas un montant officiel en multipliant un taux horaire déjà arrondi.
 */

import { roundCent } from "@/site/salary-calculator/conversions";

/** Prorata pédagogique d'un mensuel officiel temps plein. */
export function prorataOfficialMonthly(
  officialMonthly: number,
  weeklyHours: number,
  fullTimeWeeklyHours: number,
): number {
  if (fullTimeWeeklyHours <= 0) return 0;
  return roundCent((officialMonthly * weeklyHours) / fullTimeWeeklyHours);
}

export function percentDiffVsBase(value: number, base: number): number {
  if (base === 0) return 0;
  return Math.round(((value - base) / base) * 1000) / 10;
}

export function formatLuEuro(amount: number, digits = 2): string {
  return `${amount.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })} €`;
}

export function formatLuHourly(amount: number): string {
  return `${formatLuEuro(amount, 4)} brut / heure`;
}

export function formatLuMonthly(amount: number): string {
  return `${formatLuEuro(amount, 2)} brut / mois`;
}

export function formatLuPercent(value: number): string {
  return `${value.toLocaleString("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} %`;
}
