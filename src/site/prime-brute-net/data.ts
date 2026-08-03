import {
  getProfileCoefficient,
  getProfileLabel,
} from "@/site/salary-calculator/config";
import { monthlyToAnnual, roundCent } from "@/site/salary-calculator/conversions";
import type { EmploymentProfile } from "@/site/salary-calculator/types";
import {
  GROSS_PRIME_DEFAULT_PROFILE,
  GROSS_PRIME_PROFILES,
  GROSS_PRIME_SALARY_MONTHS,
} from "./config";

/** Libellé court sans décimales inutiles (ex. 10 €). */
export function formatPrimeShort(grossPrime: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(grossPrime);
}

/** Affiche les centimes quand ils sont utiles (ex. 7,80 €). */
export function formatPrimeNet(value: number): string {
  const rounded = roundCent(value);
  const hasCents = Math.round(rounded * 100) % 100 !== 0;
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  }).format(rounded);
}

export function estimateNetPrimeFromGross(
  grossPrime: number,
  profile: EmploymentProfile = GROSS_PRIME_DEFAULT_PROFILE,
): number {
  return roundCent(grossPrime * getProfileCoefficient(profile));
}

export interface GrossPrimeEstimate {
  grossPrime: number;
  profile: EmploymentProfile;
  profileLabel: string;
  coefficient: number;
  netPrime: number;
  /** Cumul annuel si la même prime nette est versée chaque mois. */
  netAnnualIfMonthly: number;
}

export function buildGrossPrimeEstimate(
  grossPrime: number,
  profile: EmploymentProfile = GROSS_PRIME_DEFAULT_PROFILE,
): GrossPrimeEstimate {
  const netPrime = estimateNetPrimeFromGross(grossPrime, profile);
  return {
    grossPrime,
    profile,
    profileLabel: getProfileLabel(profile),
    coefficient: getProfileCoefficient(profile),
    netPrime,
    netAnnualIfMonthly: roundCent(monthlyToAnnual(netPrime, GROSS_PRIME_SALARY_MONTHS)),
  };
}

export function buildAllProfilePrimeEstimates(grossPrime: number): Record<
  (typeof GROSS_PRIME_PROFILES)[number],
  GrossPrimeEstimate
> {
  return {
    nonExecutive: buildGrossPrimeEstimate(grossPrime, "nonExecutive"),
    executive: buildGrossPrimeEstimate(grossPrime, "executive"),
    publicService: buildGrossPrimeEstimate(grossPrime, "publicService"),
  };
}

export interface GrossPrimeComparisonRow {
  grossPrime: number;
  /** Prime nette estimée (profil non-cadre, colonne principale du tableau). */
  netPrime: number;
  netAnnualIfMonthly: number;
  isCurrent: boolean;
}

/**
 * Tableau autour du montant cible.
 * Pilote 10 € : 5 / 10 / 15 / 20 / 25.
 */
export function buildGrossPrimeComparisonRows(grossPrime: number): GrossPrimeComparisonRow[] {
  const offsets =
    grossPrime === 10
      ? [5, 10, 15, 20, 25]
      : [
          grossPrime - 20,
          grossPrime - 10,
          grossPrime,
          grossPrime + 10,
          grossPrime + 20,
        ].filter((value) => value > 0);

  return offsets.map((gross) => {
    const netPrime = estimateNetPrimeFromGross(gross, GROSS_PRIME_DEFAULT_PROFILE);
    return {
      grossPrime: gross,
      netPrime,
      netAnnualIfMonthly: roundCent(monthlyToAnnual(netPrime, GROSS_PRIME_SALARY_MONTHS)),
      isCurrent: gross === grossPrime,
    };
  });
}
