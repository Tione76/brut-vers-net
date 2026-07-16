import { parseFrenchNumber, parseSalaryAmount } from "@/site/salary-calculator";
import {
  HIGH_HOURS_WARNING_THRESHOLD,
  MAX_MAJORATION_PERCENT,
  MAX_OVERTIME_HOURS_PER_PERIOD,
  MAX_OVERTIME_SALARY_AMOUNT,
  MIN_MAJORATION_PERCENT,
} from "./config";
import type { OvertimeSalaryInput } from "./types";

export function parseOvertimeHours(raw: string): number | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return 0;
  }
  return parseFrenchNumber(trimmed);
}

export function validateBaseSalary(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return "Saisissez votre salaire de base.";
  }
  const value = parseSalaryAmount(trimmed);
  if (value === null || value <= 0) {
    return "Saisissez un salaire de base supérieur à zéro.";
  }
  if (value > MAX_OVERTIME_SALARY_AMOUNT) {
    return "Montant trop élevé pour ce simulateur.";
  }
  return null;
}

export function validateOvertimeHours(
  group1HoursRaw: string,
  group2HoursRaw: string,
): string | null {
  const group1 = parseOvertimeHours(group1HoursRaw);
  const group2 = parseOvertimeHours(group2HoursRaw);

  if (group1 === null || group2 === null) {
    return "Vérifiez le nombre d'heures renseigné.";
  }

  if (group1 < 0 || group2 < 0) {
    return "Vérifiez le nombre d'heures renseigné.";
  }

  const total = group1 + group2;
  if (total <= 0) {
    return "Indiquez au moins une heure supplémentaire.";
  }

  if (group1 > MAX_OVERTIME_HOURS_PER_PERIOD || group2 > MAX_OVERTIME_HOURS_PER_PERIOD) {
    return "Vérifiez le nombre d'heures renseigné.";
  }

  if (total > MAX_OVERTIME_HOURS_PER_PERIOD) {
    return "Vérifiez le nombre d'heures renseigné.";
  }

  return null;
}

export function validateMajorationPercent(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return "Saisissez un taux de majoration d'au moins 10 %.";
  }

  const value = parseFrenchNumber(trimmed);
  if (value === null) {
    return "Saisissez un pourcentage numérique valide (ex. : 25 ou 25,5).";
  }

  if (value < MIN_MAJORATION_PERCENT) {
    return "Saisissez un taux de majoration d'au moins 10 %.";
  }

  if (value > MAX_MAJORATION_PERCENT) {
    return `Saisissez un taux de majoration compris entre ${MIN_MAJORATION_PERCENT} et ${MAX_MAJORATION_PERCENT} %.`;
  }

  return null;
}

/** Avertissement non bloquant pour un volume d'heures élevé. */
export function getHighHoursWarning(
  group1HoursRaw: string,
  group2HoursRaw: string,
): string | null {
  const group1 = parseOvertimeHours(group1HoursRaw);
  const group2 = parseOvertimeHours(group2HoursRaw);
  if (group1 === null || group2 === null) {
    return null;
  }

  const total = group1 + group2;
  if (total > HIGH_HOURS_WARNING_THRESHOLD) {
    return `Vous avez saisi plus de ${HIGH_HOURS_WARNING_THRESHOLD} heures supplémentaires. Vérifiez que ce volume correspond bien à votre situation.`;
  }

  return null;
}

/**
 * Avertissement non bloquant : heures à 50 % avec moins de 8 h à 25 %.
 * Ne corrige jamais la saisie et n'empêche jamais le calcul.
 */
export function getLegalMajorationOrderHint(
  group1HoursRaw: string,
  group2HoursRaw: string,
): string | null {
  const group1 = parseOvertimeHours(group1HoursRaw);
  const group2 = parseOvertimeHours(group2HoursRaw);
  if (group1 === null || group2 === null) {
    return null;
  }

  if (group2 > 0 && group1 < 8) {
    return "Vérifiez votre saisie : avec les taux légaux, les heures à 50 % interviennent normalement après 8 heures majorées à 25 %. Certaines situations particulières peuvent toutefois expliquer une autre répartition.";
  }

  return null;
}

/** Retourne la première erreur bloquante à afficher (une seule à la fois). */
export function getPrimaryValidationError(input: OvertimeSalaryInput): string | null {
  if (!input.referenceField) {
    return "Saisissez votre salaire de base.";
  }

  const salaryError = validateBaseSalary(input.salaryValue);
  if (salaryError) {
    return salaryError;
  }

  const hoursError = validateOvertimeHours(input.group1Hours, input.group2Hours);
  if (hoursError) {
    return hoursError;
  }

  if (input.majorationMode === "custom") {
    const group1RateError = validateMajorationPercent(input.majorationGroup1Percent);
    if (group1RateError) {
      return group1RateError;
    }
    const group2RateError = validateMajorationPercent(input.majorationGroup2Percent);
    if (group2RateError) {
      return group2RateError;
    }
  }

  if (
    !Number.isFinite(input.projectionMonths) ||
    input.projectionMonths < 1 ||
    !Number.isInteger(input.projectionMonths)
  ) {
    return "Vérifiez la période sélectionnée.";
  }

  return null;
}
