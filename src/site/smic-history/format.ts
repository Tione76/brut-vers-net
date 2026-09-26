import { EUR_FRF_OFFICIAL_RATE } from "./constants";

const MONTHS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
] as const;

export function formatFrNumber(value: number, digits: number): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
    .format(value)
    .replace(/\u202f|\u00a0| /g, "\u00a0");
}

export function formatEuro(value: number, digits = 2): string {
  return `${formatFrNumber(value, digits)}\u00a0€`;
}

export function formatFrancs(value: number, digits = 2): string {
  return `${formatFrNumber(value, digits)}\u00a0F`;
}

export function formatPercent(value: number, digits = 2): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${formatFrNumber(value, digits)}\u00a0%`;
}

export function formatFrenchDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  const monthLabel = MONTHS[month - 1];
  const dayLabel = day === 1 ? "1er" : String(day);
  return `${dayLabel} ${monthLabel} ${year}`;
}

export function convertFrfToEuro(francs: number): number {
  return Math.round((francs / EUR_FRF_OFFICIAL_RATE) * 100) / 100;
}

export function yearAnchor(year: number): string {
  return `smic-${year}`;
}

export function emptyCell(): string {
  return "-";
}
