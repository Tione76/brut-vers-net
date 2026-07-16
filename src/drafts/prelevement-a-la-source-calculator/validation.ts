import { MAX_SALARY_AMOUNT } from "@/site/salary-calculator/config";
import { parseSalaryAmount } from "@/site/salary-calculator/parsing";
import type { PasCalculatorInput } from "./types";

export function validateCurrentSalary(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return "Saisissez votre salaire.";
  }
  const value = parseSalaryAmount(trimmed);
  if (value === null || value <= 0) {
    return "Saisissez un salaire supérieur à zéro.";
  }
  if (value > MAX_SALARY_AMOUNT) {
    return "Montant trop élevé pour ce simulateur.";
  }
  return null;
}

export function validateTaxableAnnual(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return "Saisissez votre net imposable annuel.";
  }
  const value = parseSalaryAmount(trimmed);
  if (value === null || value <= 0) {
    return "Saisissez un montant supérieur à zéro.";
  }
  if (value > MAX_SALARY_AMOUNT) {
    return "Montant trop élevé pour ce simulateur.";
  }
  return null;
}

export function getPrimaryValidationError(input: PasCalculatorInput): string | null {
  const taxable = parseSalaryAmount(input.taxableAnnualRaw);
  if (taxable !== null && taxable > 0) {
    return validateTaxableAnnual(input.taxableAnnualRaw);
  }

  if (!input.referenceField || !input.currentSalaryValue.trim()) {
    return "Saisissez votre salaire.";
  }

  return validateCurrentSalary(input.currentSalaryValue);
}
