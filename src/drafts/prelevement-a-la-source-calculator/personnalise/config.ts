/**
 * Configuration fiscale du simulateur de taux personnalisé estimé (page PAS uniquement).
 * Ne pas importer dans les moteurs Brut→Net / Augmentation.
 */

export const PERSONALIZED_PAS_CONFIG = {
  year: 2026,
  lastReviewedAt: "2026-07-16",
  sources: {
    incomeTaxScale: "Service-Public.fr F1419 - barème IR revenus 2025 (LF 2026)",
    quotientFamilialCeiling: "Plafond du quotient familial 1 807 € par demi-part (exemples Service-Public 2026)",
    csgCrdsBase: "BOSS - assiette CSG/CRDS 98,25 % (abattement 1,75 %)",
  },
  /** Barème IR progressif par part (revenus 2025, barème 2026). Bornes inclusives sur le min. */
  incomeTaxBrackets: [
    { minInclusive: 0, maxInclusive: 11600, rate: 0 },
    { minInclusive: 11601, maxInclusive: 29579, rate: 0.11 },
    { minInclusive: 29580, maxInclusive: 84577, rate: 0.3 },
    { minInclusive: 84578, maxInclusive: 181917, rate: 0.41 },
    { minInclusive: 181918, maxInclusive: Number.POSITIVE_INFINITY, rate: 0.45 },
  ] as const,
  /** Plafond d'avantage fiscal par demi-part liée aux enfants (couple ou isolé hors bonus parent isolé). */
  quotientFamilialCeilingPerHalfPart: 1807,
  csgCrds: {
    baseRateWhenAbatementApplies: 0.9825,
    nonDeductibleCsgRate: 0.024,
    crdsRate: 0.005,
  },
} as const;
