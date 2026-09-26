export type MinimumWageType = "SMIG" | "SMIC";
export type HistoryCurrency = "FRF_OLD" | "FRF" | "EUR";
export type HistorySeriesKind = "legal" | "insee-annual-average" | "milestone" | "continuation";

export interface SmicHistoryEntry {
  year: number;
  yearAnchor: string;
  isYearAnchor: boolean;
  effectiveDate: string | null;
  publicationDate: string | null;
  type: MinimumWageType;
  hourlyGross: number | null;
  monthlyGross: number | null;
  currency: HistoryCurrency;
  weeklyHours: 40 | 39 | 35 | null;
  monthlyHoursLabel: string | null;
  changePercent: number | null;
  sourceLabel: string;
  sourceUrl: string;
  note: string | null;
  isOfficial: boolean;
  isConverted: boolean;
  conversionMethod: string | null;
  seriesKind: HistorySeriesKind;
  hourlyGrossFrancs: number | null;
  euroConverted: number | null;
}

export interface SmicChartPoint {
  date: string;
  year: number;
  hourlyEur: number;
  isConverted: boolean;
  label: string;
}

export interface YearAnswer {
  year: number;
  heading: string;
  text: string;
}
