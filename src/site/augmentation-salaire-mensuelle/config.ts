import type { EmploymentProfile } from "@/site/salary-calculator/types";
import { SALARY_INCREASE_PATH } from "@/site/salary-increase-calculator/config";

/**
 * URL publique de la série :
 * /augmentation-salaire-mensuelle-{montant}-euros-brut
 * (rewrite vers /augmentation-salaire-mensuelle/[montant])
 */
export const MONTHLY_INCREASE_PATH_PREFIX = "/augmentation-salaire-mensuelle-";
export const MONTHLY_INCREASE_PATH_SUFFIX = "-euros-brut";

/** Route App Router interne (génération statique). */
export const MONTHLY_INCREASE_INTERNAL_BASE_PATH = "/augmentation-salaire-mensuelle";

/**
 * Montants publiés de la série.
 * Pilote : 50 € uniquement. Brouillons 60 → 500 € : `src/drafts/augmentation-salaire-mensuelle/`.
 */
export const MONTHLY_INCREASE_AMOUNTS = [50] as const;

/** Alias explicite : seuls ces montants sont publics (opposé aux brouillons). */
export const PUBLISHED_MONTHLY_INCREASE_AMOUNTS = MONTHLY_INCREASE_AMOUNTS;

export type MonthlyIncreaseAmount = (typeof MONTHLY_INCREASE_AMOUNTS)[number];

export const MONTHLY_INCREASE_DEFAULT_PROFILE: EmploymentProfile = "nonExecutive";

export const MONTHLY_INCREASE_PROFILES: readonly EmploymentProfile[] = [
  "nonExecutive",
  "executive",
  "publicService",
] as const;

/** Nombre de mois pour l'équivalent annuel du gain. */
export const MONTHLY_INCREASE_SALARY_MONTHS = 12;

/** Date de révision éditoriale (alignée sur les coefficients du simulateur). */
export const MONTHLY_INCREASE_UPDATED_AT = "2026-07-31";

export function isMonthlyIncreaseAmount(value: number): value is MonthlyIncreaseAmount {
  return (MONTHLY_INCREASE_AMOUNTS as readonly number[]).includes(value);
}

export function monthlyIncreasePath(grossMonthlyIncrease: number): string {
  return `${MONTHLY_INCREASE_PATH_PREFIX}${grossMonthlyIncrease}${MONTHLY_INCREASE_PATH_SUFFIX}`;
}

export function parseMonthlyIncreaseMontantParam(raw: string): number | null {
  if (!/^\d+$/.test(raw)) {
    return null;
  }
  const value = Number(raw);
  return isMonthlyIncreaseAmount(value) ? value : null;
}

/** Alias historique de la page pilote 50 €. */
export const MONTHLY_INCREASE_PATH_50 = monthlyIncreasePath(50);

/** Calculateur cible des redirections du mini-formulaire. */
export const MONTHLY_INCREASE_CALCULATOR_PATH = SALARY_INCREASE_PATH;
