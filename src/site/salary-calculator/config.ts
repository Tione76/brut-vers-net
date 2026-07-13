import type { EmploymentProfile, SalaryMonths } from "./types";

export interface EmploymentProfileConfig {
  id: EmploymentProfile;
  label: string;
  coefficient: number;
  description: string;
}

export const SALARY_CALCULATOR_META = {
  updatedAt: "2026-07-13",
  estimationNote:
    "Coefficients indicatifs issus de taux moyens de retenues salariales ou de charges sociales observés en France. Ils ne remplacent pas une fiche de paie.",
} as const;

/**
 * Coefficients Brut vers Net (net = brut × coefficient).
 * Valeurs estimatives, arrondies pour la lisibilité, revues au 13/07/2026.
 */
export const EMPLOYMENT_PROFILES: readonly EmploymentProfileConfig[] = [
  {
    id: "nonExecutive",
    label: "Salarié non-cadre",
    coefficient: 0.78,
    description:
      "Estimation pour un salarié non-cadre du secteur privé, hors cas particuliers (taux moyen de cotisations salariales d'environ 22 %).",
  },
  {
    id: "executive",
    label: "Salarié cadre",
    coefficient: 0.75,
    description:
      "Estimation pour un salarié cadre du secteur privé, avec cotisations salariales généralement plus élevées (environ 25 %).",
  },
  {
    id: "publicService",
    label: "Fonction publique",
    coefficient: 0.81,
    description:
      "Estimation générale pour un agent public, hors primes et indemnités spécifiques (retenues salariales souvent autour de 19 à 21 %).",
  },
] as const;

export const DEFAULT_PROFILE: EmploymentProfile = "nonExecutive";

export const BASE_MONTHLY_HOURS_AT_FULL_TIME = 151.67;
export const WEEKLY_HOURS_AT_FULL_TIME = 35;

export const WORK_TIME_PERCENT = {
  min: 10,
  max: 100,
  default: 100,
} as const;

export const SALARY_MONTHS_OPTIONS: readonly SalaryMonths[] = [12, 13, 14, 15, 16];

export const DEFAULT_SALARY_MONTHS: SalaryMonths = 12;

export const WITHHOLDING_TAX = {
  min: 0,
  max: 43,
  step: 0.1,
  default: 0,
} as const;

/** Limite technique pour éviter les dépassements numériques. */
export const MAX_SALARY_AMOUNT = 10_000_000;

export function getProfileCoefficient(profile: EmploymentProfile): number {
  const found = EMPLOYMENT_PROFILES.find((item) => item.id === profile);
  if (!found) {
    return EMPLOYMENT_PROFILES[0].coefficient;
  }
  return found.coefficient;
}

export function getProfileLabel(profile: EmploymentProfile): string {
  const found = EMPLOYMENT_PROFILES.find((item) => item.id === profile);
  return found?.label ?? EMPLOYMENT_PROFILES[0].label;
}
