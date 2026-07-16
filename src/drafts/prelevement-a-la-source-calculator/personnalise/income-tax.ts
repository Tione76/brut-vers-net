import { roundCent } from "@/site/salary-calculator";
import { PERSONALIZED_PAS_CONFIG } from "./config";
import { computeChildHalfParts } from "./quotient-familial";
import type { ChildrenCountOption } from "./types";

/**
 * Impôt sur le quotient (1 part), aligné sur les exemples Service-Public F1419.
 * Pour chaque tranche : (min(quotient, max) − (min − 1)) × taux, avec min=0 pour la 1re.
 */
export function computeTaxOnQuotient(quotient: number): number {
  if (!Number.isFinite(quotient) || quotient <= 0) {
    return 0;
  }

  let tax = 0;

  for (const bracket of PERSONALIZED_PAS_CONFIG.incomeTaxBrackets) {
    const start = bracket.minInclusive === 0 ? 0 : bracket.minInclusive - 1;
    if (quotient <= start) {
      continue;
    }
    const end = Math.min(quotient, bracket.maxInclusive);
    const slice = end - start;
    if (slice > 0 && bracket.rate > 0) {
      tax += slice * bracket.rate;
    }
    if (quotient <= bracket.maxInclusive) {
      break;
    }
  }

  return roundCent(tax);
}

export function computeHouseholdTaxBeforeCeiling(rni: number, parts: number): number {
  if (parts <= 0 || rni <= 0) {
    return 0;
  }
  return roundCent(computeTaxOnQuotient(rni / parts) * parts);
}

/**
 * Plafonnement du quotient familial : l'avantage enfants ne peut pas dépasser
 * ceiling × nombre de demi-parts enfants.
 */
export function applyQuotientFamilialCeiling(
  rni: number,
  parts: number,
  children: ChildrenCountOption,
  basePartsWithoutChildren: number,
): number {
  const taxWithChildren = computeHouseholdTaxBeforeCeiling(rni, parts);
  if (children === 0) {
    return taxWithChildren;
  }

  const taxWithoutChildren = computeHouseholdTaxBeforeCeiling(rni, basePartsWithoutChildren);
  const advantage = taxWithoutChildren - taxWithChildren;
  const maxAdvantage =
    PERSONALIZED_PAS_CONFIG.quotientFamilialCeilingPerHalfPart * computeChildHalfParts(children);

  if (advantage <= maxAdvantage) {
    return taxWithChildren;
  }

  return roundCent(taxWithChildren + (advantage - maxAdvantage));
}

export function estimateHouseholdIncomeTax(
  rni: number,
  parts: number,
  children: ChildrenCountOption,
  basePartsWithoutChildren: number,
): number {
  return applyQuotientFamilialCeiling(rni, parts, children, basePartsWithoutChildren);
}
