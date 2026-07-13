import { MAX_SALARY_AMOUNT } from "./config";

export function normalizeNumericInput(raw: string): string {
  return raw.trim().replace(/\s/g, "").replace(",", ".");
}

export function parseFrenchNumber(raw: string): number | null {
  const normalized = normalizeNumericInput(raw);
  if (!normalized) {
    return null;
  }

  if (!/^\d+(\.\d+)?$/.test(normalized)) {
    return null;
  }

  const value = Number(normalized);
  if (!Number.isFinite(value)) {
    return null;
  }

  return value;
}

export function parseSalaryAmount(raw: string): number | null {
  const value = parseFrenchNumber(raw);
  if (value === null) {
    return null;
  }
  if (value < 0 || value > MAX_SALARY_AMOUNT) {
    return null;
  }
  return value;
}

export function parsePercent(raw: string): number | null {
  const value = parseFrenchNumber(raw);
  if (value === null) {
    return null;
  }
  return value;
}

export function formatAmountForInput(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}
