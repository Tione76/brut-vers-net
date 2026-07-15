import { MAX_SALARY_AMOUNT } from "@/site/salary-calculator/config";
import { parseFrenchNumber, parseSalaryAmount } from "@/site/salary-calculator/parsing";
import { MAX_INCREASE_EUROS, MAX_INCREASE_PERCENT } from "./config";
import type { IncreaseType, SalaryIncreaseInput } from "./types";

export function validateCurrentSalary(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return "Saisissez votre salaire actuel.";
  }
  const value = parseSalaryAmount(trimmed);
  if (value === null || value <= 0) {
    return "Saisissez un salaire actuel supérieur à zéro.";
  }
  if (value > MAX_SALARY_AMOUNT) {
    return "Montant trop élevé pour ce simulateur.";
  }
  return null;
}

export function validateIncreaseEuros(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return "Saisissez une augmentation mensuelle ou annuelle.";
  }
  const value = parseSalaryAmount(trimmed);
  if (value === null) {
    return "Saisissez un montant valide.";
  }
  if (value <= 0) {
    return "L'augmentation doit être supérieure à 0 €.";
  }
  if (value > MAX_INCREASE_EUROS) {
    return "Montant d'augmentation trop élevé pour ce simulateur.";
  }
  return null;
}

export function validateIncreasePercent(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return "Saisissez le pourcentage d'augmentation.";
  }
  const value = parseFrenchNumber(trimmed);
  if (value === null) {
    return "Saisissez un pourcentage numérique valide (ex. : 5 ou 5,5).";
  }
  if (value <= 0) {
    return "Saisissez une augmentation supérieure à zéro.";
  }
  if (value > MAX_INCREASE_PERCENT) {
    return "Saisissez un pourcentage compris entre 0 et 100 %.";
  }
  return null;
}

/** Retourne la première erreur bloquante à afficher (une seule à la fois). */
export function getPrimaryValidationError(input: SalaryIncreaseInput): string | null {
  const salaryError = validateCurrentSalary(input.currentSalaryValue);
  if (salaryError) {
    return salaryError;
  }

  if (input.increaseType === "euros") {
    if (!input.increaseReferenceField || !input.increaseValue.trim()) {
      return "Saisissez une augmentation mensuelle ou annuelle.";
    }
    return validateIncreaseEuros(input.increaseValue);
  }

  return validateIncreasePercent(input.increaseValue);
}

export function isIncreaseValueProvided(type: IncreaseType, raw: string): boolean {
  return raw.trim().length > 0;
}
