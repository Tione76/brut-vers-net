import type { EmploymentProfile } from "@/site/salary-calculator/types";

/**
 * URL publique de la série :
 * /quel-salaire-net-mensuel-pour-{montant}-euros-brut
 * (rewrite vers /salaire-brut-net/[montant])
 */
export const GROSS_TO_NET_PATH_PREFIX = "/quel-salaire-net-mensuel-pour-";
export const GROSS_TO_NET_PATH_SUFFIX = "-euros-brut";

/** Route App Router interne (génération statique). */
export const GROSS_TO_NET_INTERNAL_BASE_PATH = "/salaire-brut-net";

/**
 * Montants de la série (brut mensuel) générés en SSG.
 * Pilote : 1 000 € uniquement. Pas encore dans public-pages (hors sitemap / indexation).
 * Pour publier : ajouter les montants ici ET les enregistrer dans public-pages.ts.
 */
export const GROSS_TO_NET_AMOUNTS = [1000] as const;

/**
 * Montants indexables / sitemap. Vide tant que la fiche pilote n'est pas validée.
 * À aligner sur GROSS_TO_NET_AMOUNTS lors de la publication.
 */
export const PUBLISHED_GROSS_TO_NET_AMOUNTS = [] as const;

export type GrossToNetAmount = (typeof GROSS_TO_NET_AMOUNTS)[number];

export const GROSS_TO_NET_DEFAULT_PROFILE: EmploymentProfile = "nonExecutive";

export const GROSS_TO_NET_PROFILES: readonly EmploymentProfile[] = [
  "nonExecutive",
  "executive",
  "publicService",
] as const;

export const GROSS_TO_NET_SALARY_MONTHS = 12;

/** Date de révision éditoriale (alignée sur les coefficients du simulateur). */
export const GROSS_TO_NET_UPDATED_AT = "2026-07-15";

export function isGrossToNetAmount(value: number): value is GrossToNetAmount {
  return (GROSS_TO_NET_AMOUNTS as readonly number[]).includes(value);
}

export function grossToNetPath(grossMonthly: number): string {
  return `${GROSS_TO_NET_PATH_PREFIX}${grossMonthly}${GROSS_TO_NET_PATH_SUFFIX}`;
}

export function parseGrossToNetMontantParam(raw: string): number | null {
  if (!/^\d+$/.test(raw)) {
    return null;
  }
  const value = Number(raw);
  return isGrossToNetAmount(value) ? value : null;
}

/** Alias historique de la page pilote 1 000 €. */
export const GROSS_TO_NET_PATH_1000 = grossToNetPath(1000);
