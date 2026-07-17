/**
 * Paramètres métier de l'indemnité légale de licenciement (secteur privé, CDI).
 *
 * Sources juridiques officielles :
 * - Code du travail, article L.1234-9 (droit à l'indemnité légale)
 * - Code du travail, article R.1234-2 (formule 1/4 puis 1/3)
 * - Code du travail, article L.1226-14 (inaptitude pro : indemnité spéciale doublée + somme équivalente au préavis)
 * - Code du travail, article L.1226-16 (salaire de référence spécifique en inaptitude pro)
 * - Service-Public : "Indemnité de licenciement du salarié en CDI"
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
