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

/** Hub de la série (publié vague 1). */
export const GROSS_TO_NET_HUB_PATH = "/salaire-brut-mensuel-en-net";

/** Page index / tableau de la série (publié vague 1). */
export const GROSS_TO_NET_INDEX_PATH = "/tableau-salaire-brut-mensuel-en-net";

/**
 * Montants publiés : 1 000 € → 3 500 € brut mensuel, par pas de 50 €.
 * Vague 2 (3 550 → 6 000) : encore en brouillon dans `src/drafts/salaire-brut-net/`.
 */
export const GROSS_TO_NET_AMOUNTS = [
  1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700,
  1750, 1800, 1850, 1900, 1950, 2000, 2050, 2100, 2150, 2200, 2250, 2300, 2350, 2400, 2450,
  2500, 2550, 2600, 2650, 2700, 2750, 2800, 2850, 2900, 2950, 3000, 3050, 3100, 3150, 3200,
  3250, 3300, 3350, 3400, 3450, 3500,
] as const;

/** Alias explicite : montants indexables / sitemap / maillage public. */
export const PUBLISHED_GROSS_TO_NET_AMOUNTS = GROSS_TO_NET_AMOUNTS;

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

export function isPublishedGrossToNetAmount(value: number): boolean {
  return (PUBLISHED_GROSS_TO_NET_AMOUNTS as readonly number[]).includes(value);
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
