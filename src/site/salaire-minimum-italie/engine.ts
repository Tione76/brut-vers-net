/**
 * Calculs pédagogiques pour /salaire-minimum-italie.
 * Aucun moteur de paie italien : annualisation et prorata seulement
 * sous les hypothèses explicitement annoncées.
 */

import { roundCent } from "@/site/salary-calculator/conversions";

/** Annuel pédagogique : mensualité × nombre de versements. */
export function annualFromMonthly(monthlyGross: number, months: number): number {
  if (months <= 0) return 0;
  return roundCent(monthlyGross * months);
}

/** Prorata simple d'une mensualité brute (temps partiel), sans les indemnités. */
export function prorataMonthly(monthlyGross: number, fraction: number): number {
  if (fraction <= 0) return 0;
  return roundCent(monthlyGross * fraction);
}

export function formatItEuro(amount: number, digits = 2): string {
  return `${amount.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })} €`;
}
