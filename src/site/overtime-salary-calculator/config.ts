import {
  BASE_MONTHLY_HOURS_AT_FULL_TIME,
  EMPLOYMENT_PROFILES,
  MAX_SALARY_AMOUNT,
} from "@/site/salary-calculator/config";
import type { EmploymentProfileConfig } from "@/site/salary-calculator/config";

export const OVERTIME_PATH = "/calculateurs/salaire-heures-supplementaires";

export const OVERTIME_CALCULATOR_ID = "salaire-heures-supplementaires";

export const OVERTIME_DISCLAIMER =
  "Ce calculateur concerne les salariés à temps plein du secteur privé sur une base de 35 heures. Les heures complémentaires, les forfaits jours et certaines conventions collectives suivent des règles différentes.";

/** Plafond technique de saisie pour une période (mois). */
export const MAX_OVERTIME_HOURS_PER_PERIOD = 200;

/** Seuil d'avertissement (non bloquant) pour un volume d'heures élevé. */
export const HIGH_HOURS_WARNING_THRESHOLD = 80;

export const MIN_MAJORATION_PERCENT = 10;

export const MAX_MAJORATION_PERCENT = 200;

export const LEGAL_MAJORATION_GROUP1 = 25;

export const LEGAL_MAJORATION_GROUP2 = 50;

/** Durée mensualisée de référence à temps plein (35 h / semaine). */
export const MONTHLY_HOURS_REFERENCE = BASE_MONTHLY_HOURS_AT_FULL_TIME;

export const MAX_OVERTIME_SALARY_AMOUNT = MAX_SALARY_AMOUNT;

/** Profils disponibles dans ce calculateur (secteur privé uniquement). */
export const OVERTIME_EMPLOYMENT_PROFILES: readonly EmploymentProfileConfig[] =
  EMPLOYMENT_PROFILES.filter(
    (profile): profile is EmploymentProfileConfig =>
      profile.id === "nonExecutive" || profile.id === "executive",
  );
