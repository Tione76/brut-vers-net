import {
  BASE_MONTHLY_HOURS_AT_FULL_TIME,
  DEFAULT_SALARY_MONTHS,
  EMPLOYMENT_PROFILES,
  getProfileCoefficient,
  SALARY_MONTHS_OPTIONS,
} from "@/site/salary-calculator/config";
import { hourlyToMonthly, roundCent } from "@/site/salary-calculator/conversions";
import { formatCurrency } from "@/site/salary-calculator/parsing";
import type { EmploymentProfile } from "@/site/salary-calculator/types";

/** Date de révision éditoriale (alignée sur SALARY_CALCULATOR_META.updatedAt). */
export const HOME_EDITORIAL_UPDATED_AT = "2026-07-13";

/** Bruts mensuels affichés dans le tableau de conversion. */
export const CONVERSION_TABLE_GROSS_MONTHLY = [
  1800, 2000, 2200, 2500, 3000, 3500, 4000, 4500, 5000,
] as const;

/**
 * Estimation net mensuel avant prélèvement à la source.
 * Même formule que le moteur : net = brut × coefficient profil.
 */
export function estimateNetMonthlyFromGross(
  grossMonthly: number,
  profile: EmploymentProfile,
): number {
  const coefficient = getProfileCoefficient(profile);
  return roundCent(grossMonthly * coefficient);
}

export interface ConversionTableRow {
  grossMonthly: number;
  netNonExecutive: number;
  netExecutive: number;
}

export function buildConversionTableRows(): ConversionTableRow[] {
  return CONVERSION_TABLE_GROSS_MONTHLY.map((grossMonthly) => ({
    grossMonthly,
    netNonExecutive: estimateNetMonthlyFromGross(grossMonthly, "nonExecutive"),
    netExecutive: estimateNetMonthlyFromGross(grossMonthly, "executive"),
  }));
}

export function formatEditorialEuro(value: number): string {
  return formatCurrency(value);
}

export function formatEditorialCoefficient(coefficient: number): string {
  return coefficient.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatEditorialHours(hours: number): string {
  return hours.toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

/** Profils et coefficients lus depuis le moteur (documentation méthodologie). */
export interface MethodologyProfileDoc {
  id: EmploymentProfile;
  label: string;
  coefficient: number;
  coefficientLabel: string;
  contributionSharePercent: number;
  description: string;
}

export function buildMethodologyProfiles(): MethodologyProfileDoc[] {
  return EMPLOYMENT_PROFILES.map((profile) => ({
    id: profile.id,
    label: profile.label,
    coefficient: profile.coefficient,
    coefficientLabel: formatEditorialCoefficient(profile.coefficient),
    contributionSharePercent: Math.round((1 - profile.coefficient) * 100),
    description: profile.description,
  }));
}

/** Constantes méthodologie alignées sur le moteur. */
export const METHODOLOGY_MONTHLY_HOURS = BASE_MONTHLY_HOURS_AT_FULL_TIME;
export const METHODOLOGY_SALARY_MONTHS = SALARY_MONTHS_OPTIONS;
export const METHODOLOGY_MONTHLY_HOURS_LABEL = formatEditorialHours(
  BASE_MONTHLY_HOURS_AT_FULL_TIME,
);

/** Exemple pédagogique : 2 500 € brut mensuels, non-cadre. */
export function example2500NonExecutive() {
  const grossMonthly = 2500;
  return {
    grossMonthly,
    netMonthly: estimateNetMonthlyFromGross(grossMonthly, "nonExecutive"),
  };
}

/** Exemple pédagogique : 36 000 € brut annuels sur 12 mois, non-cadre. */
export function example36000AnnualNonExecutive() {
  const grossAnnual = 36_000;
  const grossMonthly = roundCent(grossAnnual / DEFAULT_SALARY_MONTHS);
  return {
    grossAnnual,
    grossMonthly,
    netMonthly: estimateNetMonthlyFromGross(grossMonthly, "nonExecutive"),
  };
}

/** Exemple pédagogique : 15 € brut horaire à temps plein, non-cadre. */
export function example15HourlyNonExecutive() {
  const grossHourly = 15;
  const grossMonthly = roundCent(hourlyToMonthly(grossHourly, 100));
  return {
    grossHourly,
    grossMonthly,
    monthlyHours: BASE_MONTHLY_HOURS_AT_FULL_TIME,
    netMonthly: estimateNetMonthlyFromGross(grossMonthly, "nonExecutive"),
  };
}

export interface PracticalCase {
  title: string;
  situation: string;
  input: string;
  estimate: string;
  verify: string;
}

/** Cas pratiques affichés en cartes (montants issus du moteur). */
export function buildPracticalCases(): PracticalCase[] {
  const offer = example36000AnnualNonExecutive();
  const negotiation = example2500NonExecutive();

  return [
    {
      title: "Comparer une offre d'emploi",
      situation: `Une entreprise propose ${formatEditorialEuro(offer.grossAnnual)} brut annuels.`,
      input: "Brut annuel, profil non-cadre, 12 mois, temps plein.",
      estimate: `Environ ${formatEditorialEuro(offer.netMonthly)} net mensuels estimés avant impôt.`,
      verify: "Primes, treizième mois, avantages et convention applicable.",
    },
    {
      title: "Préparer une négociation salariale",
      situation: `Vous visez ${formatEditorialEuro(negotiation.netMonthly)} net par mois.`,
      input: "Net mensuel, profil adapté (cadre ou non-cadre).",
      estimate: `Environ ${formatEditorialEuro(negotiation.grossMonthly)} brut mensuels équivalents (non-cadre).`,
      verify: "Fourchettes conventionnelles et raisonnement employeur en brut ou coût global.",
    },
    {
      title: "Évaluer un temps partiel",
      situation: "Un poste à 80 % reprend le même brut horaire qu'un temps plein.",
      input: "Brut horaire et temps de travail à 80 %.",
      estimate: "Net mensuel proportionnel au temps partiel, comparable au temps plein.",
      verify: "Primes ou indemnités parfois non proratisées de la même façon.",
    },
  ];
}
