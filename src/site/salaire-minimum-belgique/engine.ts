/**
 * Calculs pédagogiques pour le RMMMG belge.
 * Les mensuels officiels (CNT / SPF) et l'horaire publié par le SPF restent la référence.
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

/** Équivalent horaire indicatif : mensuel / (heures hebdo × 52 / 12). Arrondi à 4 décimales, à la fin. */
export function indicativeHourlyFromMonthly(
  officialMonthly: number,
  weeklyHours: number,
): number {
  const hoursPerMonth = (weeklyHours * 52) / 12;
  if (hoursPerMonth <= 0) return 0;
  return Number((officialMonthly / hoursPerMonth).toFixed(4));
}

export function percentDiffVsBase(value: number, base: number): number {
  if (base === 0) return 0;
  return Math.round(((value - base) / base) * 1000) / 10;
}

export function formatBeEuro(amount: number, digits = 2): string {
  return `${amount.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })} €`;
}

export function formatBeHourly(amount: number): string {
  return `${formatBeEuro(amount, 4)} brut / heure`;
}

export function formatBeMonthly(amount: number): string {
  return `${formatBeEuro(amount, 2)} brut / mois`;
}

export function formatBePercent(value: number): string {
  return `${value.toLocaleString("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} %`;
}
