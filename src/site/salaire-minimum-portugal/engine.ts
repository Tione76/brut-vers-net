/**
 * Calculs pédagogiques pour la RMMG portugaise.
 * Les montants officiels des décrets restent la référence.
 * Les équivalents 12 mois, proratas et valeur horaire sont arrondis à la fin.
 */

import { roundCent } from "@/site/salary-calculator/conversions";

/** Total annuel à partir du montant mensuel de référence sur 14 échéances. */
export function annualFromFourteenPayments(monthlyAmount: number): number {
  return roundCent(monthlyAmount * 14);
}

/**
 * Équivalent moyen sur 12 mois : (mensuel × 14) / 12, arrondi au centime.
 * Ce n'est pas un second minimum mensuel légal.
 */
export function twelveFromFourteenPayments(monthlyAmount: number): number {
  return roundCent((monthlyAmount * 14) / 12);
}

/** Prorata pédagogique d'un montant officiel temps plein. */
export function prorataOfficialAmount(
  officialAmount: number,
  weeklyHours: number,
  fullTimeWeeklyHours: number,
): number {
  if (fullTimeWeeklyHours <= 0) return 0;
  return roundCent((officialAmount * weeklyHours) / fullTimeWeeklyHours);
}

/**
 * Valeur horaire de l'article 271 du Código do Trabalho :
 * (Rm × 12) ÷ (52 × n). Rm est la rémunération mensuelle, n la durée
 * hebdomadaire. La formule utilise 12, pas 14.
 */
export function hourlyFromMonthly(monthlyAmount: number, weeklyHours: number): number {
  if (weeklyHours <= 0) return 0;
  return roundCent((monthlyAmount * 12) / (52 * weeklyHours));
}

export function percentDiffVsBase(value: number, base: number): number {
  if (base === 0) return 0;
  return Math.round(((value - base) / base) * 1000) / 10;
}

export function formatPtEuro(amount: number, digits = 2): string {
  return `${amount.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })} €`;
}

export function formatPtPercent(value: number): string {
  return `${value.toLocaleString("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} %`;
}
