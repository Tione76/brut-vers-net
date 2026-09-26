import { EUR_FRF_OFFICIAL_RATE, EURO_CASH_FROM } from "./constants";
import { formatEuro, formatFrancs, formatFrenchDate, formatPercent } from "./format";
import { LEGAL_SMIC_ENTRIES } from "./series";
import type { SmicHistoryEntry } from "./types";

/**
 * Modèle d'affichage du graphique du SMIC horaire brut.
 *
 * Toutes les valeurs proviennent de `LEGAL_SMIC_ENTRIES` : aucun montant n'est
 * ressaisi ici. Les coordonnées sont exprimées en pourcentage pour que le SVG
 * puisse être étiré (`preserveAspectRatio="none"`), l'épaisseur du trait étant
 * maintenue par `vector-effect="non-scaling-stroke"`.
 *
 * Un « step » désigne ici un taux publié et sa période d'application, pas une
 * marche dessinée : la courbe relie les taux successifs par des segments
 * obliques, qui ne sont qu'une liaison visuelle entre deux valeurs publiées.
 */

export interface SmicHourlyStep {
  index: number;
  year: number;
  /** Date d'effet du taux, en % de la largeur du tracé. */
  x: number;
  /** Date d'effet du taux suivant, en % de la largeur du tracé. */
  xEnd: number;
  /** Montant, en % de la hauteur du tracé (0 = haut). */
  y: number;
  /** Monnaie dans laquelle le taux a été fixé, qui détermine la couleur. */
  era: "francs" | "euros";
  effectiveDate: string;
  effectiveLabel: string;
  rangeLabel: string;
  hourlyLabel: string;
  secondaryLabel: string;
  changeLabel: string | null;
  /** Années pendant lesquelles ce montant a été applicable. */
  yearsCovered: number[];
  screenReaderLabel: string;
}

export interface ChartYearGroup {
  year: number;
  stepIndexes: number[];
}

export interface ChartXTick {
  year: number;
  label: string;
  x: number;
  /** Masqué sur les écrans étroits pour éviter tout chevauchement. */
  minor: boolean;
}

export interface ChartYTick {
  value: number;
  label: string;
  y: number;
  base: boolean;
}

const STEPS_SOURCE: SmicHistoryEntry[] = LEGAL_SMIC_ENTRIES.filter(
  (entry): entry is SmicHistoryEntry & { effectiveDate: string; euroConverted: number } =>
    entry.seriesKind === "legal" && entry.effectiveDate != null && entry.euroConverted != null,
);

const FIRST_ENTRY = STEPS_SOURCE[0]!;
const LAST_ENTRY = STEPS_SOURCE[STEPS_SOURCE.length - 1]!;

const START_YEAR = FIRST_ENTRY.year;
const END_YEAR = LAST_ENTRY.year;
const DOMAIN_START = `${START_YEAR}-01-01`;
const DOMAIN_END = `${END_YEAR}-12-31`;

/** Plafond de l'axe vertical, arrondi à l'euro au-dessus du dernier taux. */
const Y_MAX = Math.ceil(Math.max(...STEPS_SOURCE.map((entry) => entry.euroConverted!)) + 0.5);
const Y_STEP = 3;

const DAY_MS = 86_400_000;

function toTime(iso: string): number {
  const [year, month, day] = iso.split("-").map(Number);
  return Date.UTC(year!, month! - 1, day!);
}

function toIso(time: number): string {
  return new Date(time).toISOString().slice(0, 10);
}

const T_START = toTime(DOMAIN_START);
const T_SPAN = toTime(DOMAIN_END) - T_START;

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}

function xAt(iso: string): number {
  return round(((toTime(iso) - T_START) / T_SPAN) * 100);
}

function yAt(value: number): number {
  return round((1 - value / Y_MAX) * 100);
}

function yearsBetween(fromIso: string, toIsoExclusive: string): number[] {
  const first = Number(fromIso.slice(0, 4));
  const last = Number(toIso(toTime(toIsoExclusive) - DAY_MS).slice(0, 4));
  const years: number[] = [];
  for (let year = first; year <= last; year += 1) years.push(year);
  return years;
}

function monthlyHoursShort(entry: SmicHistoryEntry): string | null {
  if (entry.weeklyHours === 35) return "151,67\u00a0h";
  if (entry.weeklyHours === 39) return "169\u00a0h";
  if (entry.weeklyHours === 40) return "173,3\u00a0h";
  return null;
}

/**
 * Montant historique d'abord, dans la monnaie de l'époque. L'équivalent en
 * euros n'est qu'une conversion monétaire, jamais un pouvoir d'achat.
 */
function labelsFor(entry: SmicHistoryEntry): { hourly: string; secondary: string } {
  if (entry.hourlyGrossFrancs != null) {
    return {
      hourly: formatFrancs(entry.hourlyGrossFrancs),
      secondary: `Équivalent après conversion monétaire : ${formatEuro(entry.euroConverted!)}`,
    };
  }
  const hours = monthlyHoursShort(entry);
  const monthly = entry.monthlyGross;
  return {
    hourly: formatEuro(entry.hourlyGross!),
    secondary:
      monthly != null && hours != null
        ? `Mensuel brut : ${formatEuro(monthly)} pour ${hours}`
        : `Montant publié en euros`,
  };
}

function buildSteps(): SmicHourlyStep[] {
  return STEPS_SOURCE.map((entry, index) => {
    const effectiveDate = entry.effectiveDate!;
    const next = STEPS_SOURCE[index + 1];
    const endExclusive = next?.effectiveDate ?? toIso(toTime(DOMAIN_END) + DAY_MS);
    const effectiveLabel = formatFrenchDate(effectiveDate);
    const rangeLabel = next
      ? `Du ${effectiveLabel} au ${formatFrenchDate(toIso(toTime(endExclusive) - DAY_MS))}`
      : `Depuis le ${effectiveLabel}`;
    const { hourly, secondary } = labelsFor(entry);
    const changeLabel =
      entry.changePercent != null && entry.changePercent !== 0
        ? formatPercent(entry.changePercent)
        : null;

    return {
      index,
      year: entry.year,
      x: xAt(effectiveDate),
      xEnd: next ? xAt(next.effectiveDate!) : 100,
      y: yAt(entry.euroConverted!),
      era: effectiveDate < EURO_CASH_FROM ? "francs" : "euros",
      effectiveDate,
      effectiveLabel,
      rangeLabel,
      hourlyLabel: hourly,
      secondaryLabel: secondary,
      changeLabel,
      yearsCovered: yearsBetween(effectiveDate, endExclusive),
      screenReaderLabel: [
        `SMIC horaire brut de ${hourly} de l'heure`,
        rangeLabel,
        secondary,
        changeLabel ? `Variation : ${changeLabel}` : null,
      ]
        .filter(Boolean)
        .join(". ")
        .concat("."),
    };
  });
}

export const SMIC_HOURLY_STEPS: SmicHourlyStep[] = buildSteps();

export const SMIC_CHART_LAST_STEP = SMIC_HOURLY_STEPS[SMIC_HOURLY_STEPS.length - 1]!;

export const SMIC_CHART_TITLE = "Évolution du SMIC horaire brut";

export const SMIC_CHART_SUBTITLE = `France hors Mayotte · ${START_YEAR}-${END_YEAR} · euros publiés et francs convertis`;

/** Abscisse du passage à l'euro fiduciaire, qui sépare les deux couleurs. */
export const SMIC_CHART_EURO_X = xAt(EURO_CASH_FROM);

/**
 * Les deux fenêtres de découpe se touchent exactement au passage à l'euro :
 * la même courbe y est colorée en bleu puis en orange, sans trou ni recouvrement.
 */
export const SMIC_CHART_ERA_CLIPS = {
  francs: { x: 0, width: SMIC_CHART_EURO_X },
  euros: { x: SMIC_CHART_EURO_X, width: round(100 - SMIC_CHART_EURO_X) },
} as const;

/** Ligne brisée reliant chaque taux publié au suivant, sans marche d'escalier. */
export const SMIC_CHART_LINE_PATH = SMIC_HOURLY_STEPS.map(
  (step, index) => `${index === 0 ? "M" : "L"} ${step.x} ${step.y}`,
).join(" ");

export const SMIC_CHART_Y_TICKS: ChartYTick[] = Array.from(
  { length: Math.floor(Y_MAX / Y_STEP) + 1 },
  (_, index) => (Math.floor(Y_MAX / Y_STEP) - index) * Y_STEP,
).map((value) => ({
  value,
  label: String(value),
  y: yAt(value),
  base: value === 0,
}));

function buildXTicks(): ChartXTick[] {
  const years: number[] = [];
  for (let year = Math.ceil(START_YEAR / 10) * 10; year < END_YEAR; year += 10) years.push(year);
  if (years[0] !== START_YEAR) years.unshift(START_YEAR);
  years.push(END_YEAR);

  const middle = (START_YEAR + END_YEAR) / 2;
  const closestToMiddle = years.reduce((best, year) =>
    Math.abs(year - middle) < Math.abs(best - middle) ? year : best,
  );
  const majors = new Set([years[0], years[years.length - 1], closestToMiddle]);

  return years.map((year) => ({
    year,
    label: String(year),
    x: xAt(`${year}-01-01`),
    minor: !majors.has(year),
  }));
}

export const SMIC_CHART_X_TICKS: ChartXTick[] = buildXTicks();

export const SMIC_CHART_YEAR_GROUPS: ChartYearGroup[] = Array.from(
  { length: END_YEAR - START_YEAR + 1 },
  (_, index) => START_YEAR + index,
).map((year) => {
  const revaluations = SMIC_HOURLY_STEPS.filter((step) => step.year === year);
  if (revaluations.length > 0) {
    return { year, stepIndexes: revaluations.map((step) => step.index) };
  }
  const held = SMIC_HOURLY_STEPS.filter((step) => step.yearsCovered.includes(year));
  return { year, stepIndexes: held.map((step) => step.index) };
});

export function chartYearGroup(year: number): ChartYearGroup | undefined {
  return SMIC_CHART_YEAR_GROUPS.find((group) => group.year === year);
}

/** Taux applicable à une abscisse donnée, exprimée en % de la largeur du tracé. */
export function stepIndexAtX(xPercent: number): number {
  let index = 0;
  for (const step of SMIC_HOURLY_STEPS) {
    if (step.x > xPercent) break;
    index = step.index;
  }
  return index;
}

export const SMIC_CHART_CONVERSION_RATE_LABEL = `1\u00a0€ = ${EUR_FRF_OFFICIAL_RATE.toLocaleString("fr-FR", { minimumFractionDigits: 5 })}\u00a0F`;
