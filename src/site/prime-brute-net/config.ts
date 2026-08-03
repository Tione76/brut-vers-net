import type { EmploymentProfile } from "@/site/salary-calculator/types";
import { SALARY_INCREASE_PATH } from "@/site/salary-increase-calculator/config";

/**
 * URL publique de la série :
 * /prime-brute-{montant}-euros-en-net
 * (rewrite vers /prime-brute-net/[montant])
 */
export const GROSS_PRIME_PATH_PREFIX = "/prime-brute-";
export const GROSS_PRIME_PATH_SUFFIX = "-euros-en-net";

/** Route App Router interne (génération statique). */
export const GROSS_PRIME_INTERNAL_BASE_PATH = "/prime-brute-net";

/**
 * Montants publiés de la série (prime brute).
 * Pilote : 10 € uniquement.
 */
export const GROSS_PRIME_AMOUNTS = [10] as const;

export const PUBLISHED_GROSS_PRIME_AMOUNTS = GROSS_PRIME_AMOUNTS;

export type GrossPrimeAmount = (typeof GROSS_PRIME_AMOUNTS)[number];

export const GROSS_PRIME_DEFAULT_PROFILE: EmploymentProfile = "nonExecutive";

export const GROSS_PRIME_PROFILES: readonly EmploymentProfile[] = [
  "nonExecutive",
  "executive",
  "publicService",
] as const;

export const GROSS_PRIME_SALARY_MONTHS = 12;

/** Date de révision éditoriale (alignée sur les coefficients du simulateur). */
export const GROSS_PRIME_UPDATED_AT = "2026-07-15";

/** Ancre HTML du mini-calculateur autonome (FAQ + scroll). */
export const GROSS_PRIME_CALCULATOR_ANCHOR_ID = "calculateur-prime-brute";

/** Calculateur réutilisé pour affiner une autre prime (même logique qu'une hausse brute). */
export const GROSS_PRIME_CALCULATOR_PATH = SALARY_INCREASE_PATH;

export function isGrossPrimeAmount(value: number): value is GrossPrimeAmount {
  return (GROSS_PRIME_AMOUNTS as readonly number[]).includes(value);
}

export function grossPrimePath(grossPrime: number): string {
  return `${GROSS_PRIME_PATH_PREFIX}${grossPrime}${GROSS_PRIME_PATH_SUFFIX}`;
}

export function parseGrossPrimeMontantParam(raw: string): number | null {
  if (!/^\d+$/.test(raw)) {
    return null;
  }
  const value = Number(raw);
  return isGrossPrimeAmount(value) ? value : null;
}

export const GROSS_PRIME_PATH_10 = grossPrimePath(10);
