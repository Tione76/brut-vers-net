/**
 * Paramètres métier des heures supplémentaires (révision 2026).
 *
 * Sources (vérifiées le 20 octobre 2026) : voir overtime-official-sources.ts
 * - Service-Public F2391 / Code du travail L3121-28, L3121-33, L3121-36
 * - Urssaf : réduction salariale (taux maximal 11,31 % de droit commun)
 * - Service-Public F2617 : exonération IR (plafond 7 500 € nette imposable)
 */

export const OVERTIME_CONFIG_2026 = {
  year: 2026,
  lastReviewedAt: "2026-10-20",
  legalMajorationGroup1: 25,
  legalMajorationGroup2: 50,
  minConventionalMajorationPercent: 10,
  /** Taux maximal de réduction salariale (vieillesse + retraite complémentaire). */
  maxEmployeeContributionReliefRate: 0.1131,
  /** Plafond annuel d'exonération d'impôt (rémunération nette imposable). */
  incomeTaxExemptionAnnualCeiling: 7500,
  /**
   * Exemple officiel Urssaf 2026 :
   * 10 h × 12,50 € × 125 % = 156,25 € brut ; réduction 156,25 × 11,31 % = 17,67 €.
   */
  urssafExample: {
    hourlyRate: 12.5,
    overtimeHours: 10,
    majorationPercent: 25,
    overtimeGross: 156.25,
    reliefAmount: 17.67,
  },
} as const;

export type OvertimeConfig2026 = typeof OVERTIME_CONFIG_2026;
