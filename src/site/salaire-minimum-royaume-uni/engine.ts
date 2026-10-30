/**
 * Calculs pédagogiques pour le salaire minimum britannique.
 * Les taux horaires officiels restent la référence. Les équivalents
 * hebdomadaires, mensuels et annuels sont arrondis à la fin.
 */

import { roundCent } from "@/site/salary-calculator/conversions";

export type UkApprenticeshipStatus = {
  inApprenticeship: boolean;
  completedFirstYear: boolean;
};

/** Semaine brute : taux × heures. */
export function weeklyFromHourly(hourlyRate: number, weeklyHours: number): number {
  if (weeklyHours <= 0) return 0;
  return roundCent(hourlyRate * weeklyHours);
}

/**
 * Moyenne mensuelle pédagogique : taux × heures × 52 ÷ 12.
 * Ce n'est pas un minimum mensuel publié par le gouvernement.
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

/** Quatre semaines calendaires, distinctes d'un mois moyen. */
export function fourWeeksFromHourlyWeekly(
  hourlyRate: number,
  weeklyHours: number,
): number {
  if (weeklyHours <= 0) return 0;
  return roundCent(hourlyRate * weeklyHours * 4);
}

/**
 * Conversion livres → euros : 1 € = eurPerGbp £.
 * On divise les livres par ce taux. Arrondi seulement à la fin.
 */
export function gbpToEur(amountGbp: number, eurPerGbp: number): number {
  if (eurPerGbp <= 0) return 0;
  return roundCent(amountGbp / eurPerGbp);
}

export function percentDiffVsBase(value: number, base: number): number {
  if (base === 0) return 0;
  return Math.round(((value - base) / base) * 1000) / 10;
}

/**
 * Taux horaire applicable selon l'âge et, le cas échéant, l'apprentissage.
 * Ne gère pas l'âge de fin de scolarité obligatoire : le taux « moins de 18 ans »
 * suppose que la personne a déjà atteint cet âge.
 */
export function ukLegalHourlyRate(
  age: number,
  rates: { adult: number; youth: number; under18: number; apprentice: number },
  apprenticeship?: UkApprenticeshipStatus,
): number {
  const apprenticeRateApplies =
    Boolean(apprenticeship?.inApprenticeship) &&
    (age < 19 || (age >= 19 && !apprenticeship!.completedFirstYear));
  if (apprenticeRateApplies) return rates.apprentice;
  if (age >= 21) return rates.adult;
  if (age >= 18) return rates.youth;
  return rates.under18;
}

export function formatUkPound(amount: number, digits = 2): string {
  return `${amount.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })} £`;
}

export function formatUkEuro(amount: number, digits = 2): string {
  return `${amount.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })} €`;
}

export function formatUkPercent(value: number): string {
  return `${value.toLocaleString("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} %`;
}
