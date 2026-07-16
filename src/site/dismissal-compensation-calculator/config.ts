/**
 * Paramètres métier de l'indemnité légale de licenciement (secteur privé, CDI).
 *
 * Sources principales :
 * - Code du travail (indemnité légale, ancienneté minimale, salaire de référence)
 * - Service-Public : indemnité de licenciement
 */

export const DISMISSAL_PATH = "/calculateurs/indemnite-licenciement";

export const DISMISSAL_CALCULATOR_ID = "indemnite-licenciement";

export const DISMISSAL_DISCLAIMER =
  "Ce calculateur concerne principalement les salariés en CDI du secteur privé. Les CDD, la fonction publique, les changements successifs de temps de travail, certaines absences, les conventions collectives particulières et les situations contentieuses peuvent nécessiter un calcul spécifique.";

export const DISMISSAL_CONFIG = {
  year: 2026,
  lastReviewedAt: "2026-07-16",
  /** Ancienneté minimale (mois) pour ouvrir l'indemnité légale dans le cas général. */
  minSeniorityMonths: 8,
  /** Seuil de la première tranche (années). */
  firstBracketYears: 10,
  /** Coefficient jusqu'à 10 ans : 1/4 de mois de salaire par année. */
  firstBracketRate: 1 / 4,
  /** Coefficient au-delà de 10 ans : 1/3 de mois de salaire par année. */
  secondBracketRate: 1 / 3,
  /** Multiplicateur pour inaptitude d'origine professionnelle. */
  professionalUnfitnessMultiplier: 2,
  maxSeniorityYears: 60,
  maxSeniorityExtraMonths: 11,
} as const;

export const MAX_DISMISSAL_SALARY_AMOUNT = 10_000_000;
