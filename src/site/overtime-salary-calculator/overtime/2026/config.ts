/**
 * Paramètres métier des heures supplémentaires (révision 2026).
 *
 * Sources :
 * - Service-Public F2391 : heures supplémentaires d'un salarié du secteur privé
 *   (majoration légale 25 % / 50 %, plancher conventionnel 10 %)
 * - Urssaf : réduction de cotisations salariales sur les heures supplémentaires
 *   (taux maximal 11,31 % lorsque les taux de droit commun s'appliquent)
 * - Service-Public F2617 : exonération d'impôt sur le revenu des heures
 *   supplémentaires (plafond annuel de rémunération nette imposable)
 */

export const OVERTIME_CONFIG_2026 = {
  year: 2026,
  lastReviewedAt: "2026-07-16",
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
