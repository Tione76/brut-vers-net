import { MAX_SALARY_AMOUNT, WITHHOLDING_TAX, WORK_TIME_PERCENT } from "./config";
import { parseFrenchNumber, parseSalaryAmount } from "./parsing";

export function validateSalaryField(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return null;
  }

  const normalized = trimmed.replace(/\s/g, "").replace(",", ".");
  if (!/^\d+(\.\d+)?$/.test(normalized)) {
    return "Saisissez un montant numérique valide (ex. : 2 500 ou 2500,50).";
  }

  const value = Number(normalized);
  if (!Number.isFinite(value)) {
    return "Montant invalide.";
  }
  if (value < 0) {
    return "Le montant ne peut pas être négatif.";
  }
  if (value > MAX_SALARY_AMOUNT) {
    return "Montant trop élevé pour ce simulateur.";
  }

  return null;
}

export function validateWorkTimePercent(value: number): string | null {
  if (!Number.isFinite(value)) {
    return "Temps de travail invalide.";
  }
  if (value < WORK_TIME_PERCENT.min || value > WORK_TIME_PERCENT.max) {
    return `Le temps de travail doit être compris entre ${WORK_TIME_PERCENT.min} % et ${WORK_TIME_PERCENT.max} %.`;
  }
  return null;
}

export function validateWithholdingTaxRateValue(value: number): string | null {
  if (!Number.isFinite(value)) {
    return "Taux de prélèvement invalide.";
  }
  if (value < WITHHOLDING_TAX.min || value > WITHHOLDING_TAX.max) {
    return `Le taux doit être compris entre ${WITHHOLDING_TAX.min} % et ${WITHHOLDING_TAX.max} %.`;
  }
  return null;
}

export function validateWithholdingTaxRate(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return null;
  }

  const value = parseFrenchNumber(raw);
  if (value === null) {
    return "Saisissez un taux numérique valide (ex. : 5 ou 12,5).";
  }
  return validateWithholdingTaxRateValue(value);
}

export function isSalaryAmountValid(raw: string): boolean {
  return parseSalaryAmount(raw) !== null;
}
