import { parseFrenchNumber, parseSalaryAmount } from "@/site/salary-calculator";
import { DISMISSAL_CONFIG, MAX_DISMISSAL_SALARY_AMOUNT } from "./config";
import type { DismissalCompensationInput } from "./types";

export function parseWholeNumber(raw: string): number | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return null;
  }
  if (!/^\d+$/.test(trimmed)) {
    return null;
  }
  const value = Number.parseInt(trimmed, 10);
  return Number.isFinite(value) ? value : null;
}

export function validateSeniority(
  yearsRaw: string,
  monthsRaw: string,
): string | null {
  const years = parseWholeNumber(yearsRaw);
  const months = parseWholeNumber(monthsRaw);

  if (years === null) {
    return "Indiquez un nombre d'années entier (0 à 60).";
  }
  if (months === null) {
    return "Indiquez un nombre de mois entier (0 à 11).";
  }
  if (years < 0 || years > DISMISSAL_CONFIG.maxSeniorityYears) {
    return `Indiquez une ancienneté en années comprise entre 0 et ${DISMISSAL_CONFIG.maxSeniorityYears}.`;
  }
  if (months < 0 || months > DISMISSAL_CONFIG.maxSeniorityExtraMonths) {
    return "Indiquez un nombre de mois compris entre 0 et 11.";
  }
  if (years === 0 && months === 0) {
    return "Indiquez votre ancienneté.";
  }
  return null;
}

export function validatePositiveSalary(raw: string, fieldLabel: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return `Saisissez ${fieldLabel}.`;
  }
  const value = parseSalaryAmount(trimmed);
  if (value === null || !Number.isFinite(value) || value <= 0) {
    return `Saisissez ${fieldLabel} supérieur à zéro.`;
  }
  if (value > MAX_DISMISSAL_SALARY_AMOUNT) {
    return "Montant trop élevé pour ce simulateur.";
  }
  return null;
}

export function validateOptionalAmount(raw: string, fieldLabel: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return null;
  }
  const value = parseSalaryAmount(trimmed);
  if (value === null || !Number.isFinite(value) || value < 0) {
    return `Saisissez ${fieldLabel} valide.`;
  }
  if (value > MAX_DISMISSAL_SALARY_AMOUNT) {
    return "Montant trop élevé pour ce simulateur.";
  }
  return null;
}

/** Première erreur bloquante (hors cas déjà résolus par le moteur). */
export function getPrimaryValidationError(
  input: DismissalCompensationInput,
): string | null {
  if (input.mixedWorkTime) {
    return null;
  }

  const seniorityError = validateSeniority(input.seniorityYears, input.seniorityMonths);
  if (seniorityError) {
    return seniorityError;
  }

  if (input.situation === "grossMisconduct") {
    return null;
  }

  const years = parseWholeNumber(input.seniorityYears) ?? 0;
  const months = parseWholeNumber(input.seniorityMonths) ?? 0;
  const totalMonths = years * 12 + months;

  if (input.situation === "standard" && totalMonths < DISMISSAL_CONFIG.minSeniorityMonths) {
    return null;
  }

  const avg12Error = validatePositiveSalary(
    input.average12Months,
    totalMonths < 12
      ? "le salaire brut moyen sur les mois travaillés"
      : "le salaire brut moyen des 12 derniers mois",
  );
  if (avg12Error) {
    return avg12Error;
  }

  if (input.average3Months.trim()) {
    const avg3Error = validatePositiveSalary(
      input.average3Months,
      "le salaire brut moyen des 3 derniers mois",
    );
    if (avg3Error) {
      return avg3Error;
    }
  }

  if (input.hasBonus) {
    const bonusError = validatePositiveSalary(
      input.bonusAmount,
      "le montant brut de la prime",
    );
    if (bonusError) {
      return bonusError;
    }
  }

  if (input.conventionKnowledge === "yes" && input.conventionAmount.trim()) {
    const conventionError = validateOptionalAmount(
      input.conventionAmount,
      "un montant conventionnel",
    );
    if (conventionError) {
      return conventionError;
    }
  }

  return null;
}

export function parseOptionalSalary(raw: string): number | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return null;
  }
  return parseSalaryAmount(trimmed);
}

export function parseRequiredSalary(raw: string): number | null {
  return parseSalaryAmount(raw.trim());
}

export { parseFrenchNumber };
