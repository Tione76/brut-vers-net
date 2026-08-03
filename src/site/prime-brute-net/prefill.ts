import { buildIncreaseCalculatorPrefillHref } from "@/site/augmentation-salaire-mensuelle/prefill";
import type { EmploymentProfile } from "@/site/salary-calculator/types";

/**
 * Réutilise le préremplissage du calculateur d'augmentation
 * (même logique : montant brut complémentaire → net).
 */
export function buildPrimeCalculatorPrefillHref(
  grossPrime: number,
  profile: EmploymentProfile,
): string {
  return buildIncreaseCalculatorPrefillHref(grossPrime, profile);
}
