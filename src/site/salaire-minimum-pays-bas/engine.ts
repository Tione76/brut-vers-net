/**
 * Calculs pédagogiques pour le salaire minimum néerlandais.
 * Les taux horaires officiels restent la référence. Les équivalents
 * mensuels, annuels et le pécule d'exemple sont arrondis à la fin.
 */

import { roundCent } from "@/site/salary-calculator/conversions";

export type NlOrdinaryRates = {
  adult: number;
  age20: number;
  age19: number;
  age18: number;
  age17: number;
  age16: number;
  age15: number;
};

export type NlBblRates = {
  age20: number;
  age19: number;
  age18: number;
};

/**
 * Moyenne mensuelle pédagogique : taux × heures × 52 ÷ 12.
 * Ce n'est pas un minimum mensuel publié, ni la seule formule de paie.
 */
export function monthlyFromHourlyWeekly(
  hourlyRate: number,
  weeklyHours: number,
): number {
  if (weeklyHours <= 0) return 0;
  return roundCent((hourlyRate * weeklyHours * 52) / 12);
}

/** Repère annuel au taux actuel : taux × heures × 52. */
export function annualFromHourlyWeekly(
  hourlyRate: number,
  weeklyHours: number,
): number {
  if (weeklyHours <= 0) return 0;
  return roundCent(hourlyRate * weeklyHours * 52);
}

/** Pécule pédagogique : pourcentage du repère annuel, arrondi une fois. */
export function holidayAllowanceFromAnnual(
  annualGross: number,
  rate = 0.08,
): number {
  if (annualGross <= 0) return 0;
  return roundCent(annualGross * rate);
}

export function percentDiffVsBase(value: number, base: number): number {
  if (base === 0) return 0;
  return Math.round(((value - base) / base) * 1000) / 10;
}

/**
 * Taux horaire applicable selon l'âge et, le cas échéant, un contrat BBL.
 * Le barème BBL distinct ne concerne que 18, 19 et 20 ans.
 */
export function nlLegalHourlyRate(
  age: number,
  ordinary: NlOrdinaryRates,
  options?: { inBbl?: boolean; bbl?: NlBblRates },
): number {
  if (options?.inBbl && options.bbl && age >= 18 && age <= 20) {
    if (age === 20) return options.bbl.age20;
    if (age === 19) return options.bbl.age19;
    return options.bbl.age18;
  }
  if (age >= 21) return ordinary.adult;
  if (age === 20) return ordinary.age20;
  if (age === 19) return ordinary.age19;
  if (age === 18) return ordinary.age18;
  if (age === 17) return ordinary.age17;
  if (age === 16) return ordinary.age16;
  return ordinary.age15;
}

export function formatNlEuro(amount: number, digits = 2): string {
  return `${amount.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })} €`;
}

export function formatNlPercent(value: number, digits = 1): string {
  return `${value.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })} %`;
}
