import { SMIC_CURRENT, SMIC_EDITORIAL_YEAR, SMIC_PREVIOUS } from "@/site/smic/data";
import {
  ANNUAL_REVALUATION_JANUARY_FROM,
  EUR_FRF_OFFICIAL_RATE,
  GMR_CONVERGENCE_END,
  LEGAL_WEEK_39_FROM,
  SMIC_HISTORY_SOURCES,
  SMIG_1950,
} from "./constants";
import { convertFrfToEuro, yearAnchor } from "./format";
import { INSEE_INFLATION_QUARTERS } from "./insee-inflation";
import { INSEE_LEGAL_RATES } from "./insee-legal-rates";
import type { InseeLegalRateRow } from "./insee-raw-types";
import { INSEE_PURCHASING_POWER } from "./insee-purchasing-power";
import { INSEE_SMIC39_1951_1979 } from "./insee-smic39";
import type { HistoryCurrency, SmicChartPoint, SmicHistoryEntry } from "./types";

function weeklyHoursFor(date: string): 40 | 39 | 35 {
  if (date < LEGAL_WEEK_39_FROM) return 40;
  if (date < GMR_CONVERGENCE_END) return 39;
  return 35;
}

function monthlyHoursLabel(hours: 40 | 39 | 35 | null, seriesKind: SmicHistoryEntry["seriesKind"]): string | null {
  if (hours === 40) return seriesKind === "insee-annual-average" ? "173,3 h / mois" : "40 h (env. 173,3 h / mois)";
  if (hours === 39) return "39 h (169 h / mois)";
  if (hours === 35) return "35 h (151,67 h / mois)";
  return null;
}

function gmrNote(effectiveDate: string): string | null {
  if (effectiveDate >= "2000-01-01" && effectiveDate < GMR_CONVERGENCE_END) {
    return "Période des 35 heures : le taux horaire coexiste avec des garanties mensuelles de rémunération. Le montant mensuel publié pour 169 h n'est pas une simple multiplication par 151,67 h.";
  }
  if (effectiveDate === GMR_CONVERGENCE_END) {
    return "Dernière étape de convergence des garanties mensuelles liées aux 35 heures. L'Insee publie désormais aussi le mensuel pour 151,67 h.";
  }
  return null;
}

function changePercent(current: number | null, previous: number | null): number | null {
  if (current == null || previous == null || previous === 0) return null;
  return Math.round(((current - previous) / previous) * 10000) / 100;
}

function legalHourlyEur(row: InseeLegalRateRow): number | null {
  if (row.hourlyGrossEur != null) return row.hourlyGrossEur;
  if (row.hourlyGrossFrf != null) return convertFrfToEuro(row.hourlyGrossFrf);
  return null;
}

function legalMonthly(
  row: InseeLegalRateRow,
): { amount: number | null; currency: HistoryCurrency; hours: 40 | 39 | 35 } {
  const hours = weeklyHoursFor(row.effectiveDate);
  if (row.monthlyGross151 != null) {
    return { amount: row.monthlyGross151, currency: "EUR", hours: 35 };
  }
  if (row.monthlyGross169Eur != null) {
    return { amount: row.monthlyGross169Eur, currency: "EUR", hours };
  }
  if (row.monthlyGross169Frf != null) {
    return { amount: row.monthlyGross169Frf, currency: "FRF", hours };
  }
  return { amount: null, currency: row.hourlyGrossEur != null ? "EUR" : "FRF", hours };
}

const SMIG_1950_ENTRY: SmicHistoryEntry = {
  year: 1950,
  yearAnchor: yearAnchor(1950),
  isYearAnchor: true,
  effectiveDate: SMIG_1950.decreeDate,
  publicationDate: SMIG_1950.decreeDate,
  type: "SMIG",
  hourlyGross: null,
  monthlyGross: null,
  currency: "FRF_OLD",
  weeklyHours: 40,
  monthlyHoursLabel: "40 h (durée légale de l'époque)",
  changePercent: null,
  sourceLabel: SMIG_1950.sourceLabel,
  sourceUrl: SMIG_1950.sourceUrl,
  note: `Le ${SMIG_1950.decreeLabel} fixe un SMIG compris entre ${SMIG_1950.lowestZoneOldFrancsPerHour} francs de l'heure dans la zone la moins favorable et ${SMIG_1950.parisOldFrancsPerHour} francs en région parisienne. Il n'existait pas un montant unique national.`,
  isOfficial: true,
  isConverted: false,
  conversionMethod: null,
  seriesKind: "milestone",
  hourlyGrossFrancs: null,
  euroConverted: null,
};

function buildPre1980Entries(): SmicHistoryEntry[] {
  return INSEE_SMIC39_1951_1979.map((row, index, all) => {
    const previous = all[index - 1];
    const weeklyHours = row.year < 1982 ? 40 : 39;
    return {
      year: row.year,
      yearAnchor: yearAnchor(row.year),
      isYearAnchor: true,
      effectiveDate: null,
      publicationDate: null,
      type: row.year < 1970 ? "SMIG" : "SMIC",
      hourlyGross: row.hourlyGrossEur,
      monthlyGross: row.monthlyGrossEur,
      currency: "EUR" as const,
      weeklyHours,
      monthlyHoursLabel: monthlyHoursLabel(weeklyHours, "insee-annual-average"),
      changePercent: previous
        ? changePercent(row.hourlyGrossEur, previous.hourlyGrossEur)
        : null,
      sourceLabel: SMIC_HISTORY_SOURCES.inseeLongSeries.label,
      sourceUrl: SMIC_HISTORY_SOURCES.inseeLongSeries.href,
      note: "Moyenne annuelle Insee (série SMIC39), convertie en euros. Ce n'est pas le taux du Journal officiel à une date précise, ni une valeur en euros constants.",
      isOfficial: true,
      isConverted: true,
      conversionMethod: "insee-smic39-annual-average-euro",
      seriesKind: "insee-annual-average" as const,
      hourlyGrossFrancs: null,
      euroConverted: row.hourlyGrossEur,
    };
  });
}

function buildLegalEntries(): SmicHistoryEntry[] {
  const seenYears = new Set<number>();
  return INSEE_LEGAL_RATES.map((row, index, all) => {
    const isYearAnchor = !seenYears.has(row.year);
    seenYears.add(row.year);
    const previous = all[index - 1];
    const monthly = legalMonthly(row);
    const currency: HistoryCurrency = row.hourlyGrossEur != null ? "EUR" : "FRF";
    const hourly = currency === "EUR" ? row.hourlyGrossEur : row.hourlyGrossFrf;
    const previousHourlyEur = previous ? legalHourlyEur(previous) : null;
    const currentHourlyEur = legalHourlyEur(row);
    const converted = currency === "FRF" && row.hourlyGrossFrf != null
      ? convertFrfToEuro(row.hourlyGrossFrf)
      : null;
    const notes = [
      gmrNote(row.effectiveDate),
      converted != null
        ? `Équivalent après conversion monétaire : ${converted.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} € (1 € = ${EUR_FRF_OFFICIAL_RATE.toLocaleString("fr-FR")} F). Ce n'est pas un équivalent de pouvoir d'achat.`
        : null,
    ].filter(Boolean);

    return {
      year: row.year,
      yearAnchor: yearAnchor(row.year),
      isYearAnchor,
      effectiveDate: row.effectiveDate,
      publicationDate: row.publicationDate,
      type: "SMIC" as const,
      hourlyGross: hourly,
      monthlyGross: monthly.amount,
      currency,
      weeklyHours: monthly.hours,
      monthlyHoursLabel: monthlyHoursLabel(monthly.hours, "legal"),
      changePercent:
        previous && row.hourlyGrossFrf != null && previous.hourlyGrossFrf != null
          ? changePercent(row.hourlyGrossFrf, previous.hourlyGrossFrf)
          : changePercent(currentHourlyEur, previousHourlyEur),
      sourceLabel: SMIC_HISTORY_SOURCES.inseeAnnual.label,
      sourceUrl: SMIC_HISTORY_SOURCES.inseeAnnual.href,
      note: notes.length > 0 ? notes.join(" ") : null,
      isOfficial: true,
      isConverted: false,
      conversionMethod: converted != null ? "official-eur-frf-2866-98" : null,
      seriesKind: "legal" as const,
      hourlyGrossFrancs: row.hourlyGrossFrf,
      euroConverted: converted ?? row.hourlyGrossEur,
    };
  });
}

const CONTINUATION_2025: SmicHistoryEntry = {
  year: 2025,
  yearAnchor: yearAnchor(2025),
  isYearAnchor: true,
  effectiveDate: "2024-11-01",
  publicationDate: "2024-10-24",
  type: "SMIC",
  hourlyGross: 11.88,
  monthlyGross: 1801.8,
  currency: "EUR",
  weeklyHours: 35,
  monthlyHoursLabel: monthlyHoursLabel(35, "continuation"),
  changePercent: 0,
  sourceLabel: SMIC_HISTORY_SOURCES.inseeAnnual.label,
  sourceUrl: SMIC_HISTORY_SOURCES.inseeAnnual.href,
  note: "Aucun nouveau taux n'est paru au Journal officiel en 2025. Le taux horaire brut du 1er novembre 2024 (11,88 €) est resté applicable toute l'année. L'Insee retient une moyenne annuelle de 11,88 €.",
  isOfficial: true,
  isConverted: false,
  conversionMethod: null,
  seriesKind: "continuation",
  hourlyGrossFrancs: null,
  euroConverted: 11.88,
};

function insertContinuation(entries: SmicHistoryEntry[]): SmicHistoryEntry[] {
  const next = [...entries];
  const after2024 = next.findIndex((entry) => entry.year === 2026);
  if (after2024 === -1) return [...next, CONTINUATION_2025];
  next.splice(after2024, 0, CONTINUATION_2025);
  return next;
}

export const SMIC_HISTORY: SmicHistoryEntry[] = [
  SMIG_1950_ENTRY,
  ...buildPre1980Entries(),
  ...insertContinuation(buildLegalEntries()),
];

export const SMIC_HISTORY_YEARS = [...new Set(SMIC_HISTORY.map((entry) => entry.year))];

export const LEGAL_SMIC_ENTRIES = SMIC_HISTORY.filter(
  (entry) => entry.seriesKind === "legal" || entry.seriesKind === "continuation",
);

export const CURRENT_LEGAL_RATE = LEGAL_SMIC_ENTRIES[LEGAL_SMIC_ENTRIES.length - 1]!;

export const SMIC_EURO_CHART_POINTS: SmicChartPoint[] = LEGAL_SMIC_ENTRIES.filter(
  (entry) => entry.seriesKind === "legal" && entry.euroConverted != null && entry.effectiveDate,
).map((entry) => ({
  date: entry.effectiveDate!,
  year: entry.year,
  hourlyEur: entry.euroConverted!,
  isConverted: entry.currency === "FRF",
  label: entry.effectiveDate!,
}));

export const SMIC_INFLATION_SERIES = [...INSEE_INFLATION_QUARTERS].sort((a, b) =>
  a.quarter.localeCompare(b.quarter),
);

export const SMIC_PURCHASING_POWER = INSEE_PURCHASING_POWER;

export function entriesForYear(year: number): SmicHistoryEntry[] {
  return SMIC_HISTORY.filter((entry) => entry.year === year);
}

export function firstEntryForYear(year: number): SmicHistoryEntry | undefined {
  return SMIC_HISTORY.find((entry) => entry.year === year && entry.isYearAnchor);
}

export function largestLegalHourlyIncrease(): SmicHistoryEntry | undefined {
  return LEGAL_SMIC_ENTRIES.filter(
    (entry) => entry.changePercent != null && entry.seriesKind === "legal",
  ).reduce<SmicHistoryEntry | undefined>((best, entry) => {
    if (!best || (entry.changePercent ?? 0) > (best.changePercent ?? 0)) return entry;
    return best;
  }, undefined);
}

export function assertCurrentRatesMatchSite(): void {
  if (CURRENT_LEGAL_RATE.hourlyGross !== SMIC_CURRENT.hourlyGross) {
    throw new Error("Le dernier taux historique ne correspond pas à SMIC_CURRENT.");
  }
  const january2026 = LEGAL_SMIC_ENTRIES.find(
    (entry) => entry.effectiveDate === "2026-01-01",
  );
  if (january2026?.hourlyGross !== SMIC_PREVIOUS.hourlyGross) {
    throw new Error("Le taux du 1er janvier 2026 ne correspond pas à SMIC_PREVIOUS.");
  }
  if (SMIC_EDITORIAL_YEAR < 2026) {
    throw new Error("Année éditoriale incohérente.");
  }
}

export { ANNUAL_REVALUATION_JANUARY_FROM };
