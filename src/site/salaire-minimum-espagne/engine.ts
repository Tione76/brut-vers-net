/**
 * Calculs pédagogiques pour le SMI espagnol.
 * Les montants officiels du décret restent la référence.
 * Les équivalents 12 versements et les proratas sont arrondis à la fin.
 */

import { roundCent } from "@/site/salary-calculator/conversions";

/** Total annuel à partir du montant par versement sur 14 échéances. */
export function annualFromFourteenPayments(amountPerPayment: number): number {
  return roundCent(amountPerPayment * 14);
}

/** Équivalent mensuel sur 12 versements : (montant × 14) / 12, arrondi au centime. */
export function twelveFromFourteenPayments(amountPerPayment: number): number {
  return roundCent((amountPerPayment * 14) / 12);
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

export function percentDiffVsBase(value: number, base: number): number {
  if (base === 0) return 0;
  return Math.round(((value - base) / base) * 1000) / 10;
}

export function formatEsEuro(amount: number, digits = 2): string {
  return `${amount.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })} €`;
}

export function formatEsPercent(value: number): string {
  return `${value.toLocaleString("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} %`;
}
