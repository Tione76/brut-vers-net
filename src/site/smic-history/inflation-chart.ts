import { formatFrNumber } from "./format";
import { SMIC_INFLATION_SERIES } from "./series";

/**
 * Modèle d'affichage du graphique des indices Insee (SMIC horaire brut et prix
 * à la consommation, base 100 en mars 1990).
 *
 * La série publiée est trimestrielle : chaque observation porte sur un
 * trimestre entier, jamais sur une année. Les deux indices sont publiés aux
 * mêmes trimestres ; seules les observations où les deux valeurs existent sont
 * retenues, aucune valeur n'est interpolée ni reconstituée.
 */

export interface InflationPoint {
  index: number;
  quarter: string;
  year: number;
  quarterNumber: number;
  /** Position temporelle, en % de la largeur du tracé. */
  x: number;
  ySmic: number;
  yPrice: number;
  /** « 4e trimestre 2025 », pour le sélecteur de période. */
  periodLabel: string;
  /** « 4e trimestre », sans l'année : l'encart affiche l'année à part. */
  quarterLabel: string;
  monthsLabel: string;
  smicLabel: string;
  priceLabel: string;
  screenReaderLabel: string;
}

export interface InflationYearGroup {
  year: number;
  pointIndexes: number[];
}

export interface InflationXTick {
  year: number;
  label: string;
  x: number;
  /** Masqué sur les écrans étroits pour éviter tout chevauchement. */
  minor: boolean;
}

export interface InflationYTick {
  value: number;
  label: string;
  y: number;
  /** Ligne de référence de l'indice 100. */
  base: boolean;
}

export const INFLATION_BASE_LABEL = "base 100 en mars 1990";

const QUARTER_MONTHS = [
  "janvier à mars",
  "avril à juin",
  "juillet à septembre",
  "octobre à décembre",
] as const;

/** Bornes de l'axe vertical : 100 est la référence, jamais un zéro trompeur. */
const Y_MIN = 100;
const Y_STEP = 40;

const OBSERVATIONS = SMIC_INFLATION_SERIES.filter(
  (row) => Number.isFinite(row.smicIndex) && Number.isFinite(row.priceIndex) && row.smicIndex > 0 && row.priceIndex > 0,
);

const COUNT = OBSERVATIONS.length;
const Y_PEAK = Math.max(...OBSERVATIONS.map((row) => Math.max(row.smicIndex, row.priceIndex)));
/** Plafond arrondi aux 20 points supérieurs : assez d'air sans écraser les courbes. */
const Y_MAX = Y_MIN + Math.ceil((Y_PEAK - Y_MIN) / 20) * 20;

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}

function xAt(index: number): number {
  return round((index / (COUNT - 1)) * 100);
}

function yAt(value: number): number {
  return round((1 - (value - Y_MIN) / (Y_MAX - Y_MIN)) * 100);
}

function indexLabel(value: number): string {
  return formatFrNumber(value, 2);
}

function quarterHeading(quarterNumber: number): string {
  return `${quarterNumber === 1 ? "1er" : `${quarterNumber}e`} trimestre`;
}

function periodLabel(year: number, quarterNumber: number): string {
  return `${quarterHeading(quarterNumber)} ${year}`;
}

function buildPoints(): InflationPoint[] {
  return OBSERVATIONS.map((row, index) => {
    const [yearPart, quarterPart] = row.quarter.split("-T");
    const year = Number(yearPart);
    const quarterNumber = Number(quarterPart);
    const quarter = quarterHeading(quarterNumber);
    const period = periodLabel(year, quarterNumber);
    const months = QUARTER_MONTHS[quarterNumber - 1]!;
    const smicLabel = indexLabel(row.smicIndex);
    const priceLabel = indexLabel(row.priceIndex);

    return {
      index,
      quarter: row.quarter,
      year,
      quarterNumber,
      x: xAt(index),
      ySmic: yAt(row.smicIndex),
      yPrice: yAt(row.priceIndex),
      periodLabel: period,
      quarterLabel: quarter,
      monthsLabel: months,
      smicLabel,
      priceLabel,
      screenReaderLabel: `${year}, ${quarter} (${months}) : indice du SMIC horaire brut ${smicLabel}, indice des prix à la consommation ${priceLabel}, ${INFLATION_BASE_LABEL}.`,
    };
  });
}

export const SMIC_INFLATION_POINTS: InflationPoint[] = buildPoints();

export const INFLATION_LAST_POINT = SMIC_INFLATION_POINTS[SMIC_INFLATION_POINTS.length - 1]!;

const FIRST_YEAR = SMIC_INFLATION_POINTS[0]!.year;
const LAST_YEAR = INFLATION_LAST_POINT.year;

export const INFLATION_CHART_TITLE =
  "Indices Insee du SMIC horaire brut et des prix à la consommation";

export const INFLATION_CHART_SUBTITLE = `France métropolitaine puis France hors Mayotte · ${INFLATION_BASE_LABEL} · ${FIRST_YEAR}-${LAST_YEAR}`;

export const INFLATION_UNIT_LABEL = `Indice (${INFLATION_BASE_LABEL})`;

function linePath(pick: (point: InflationPoint) => number): string {
  return SMIC_INFLATION_POINTS.map(
    (point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${pick(point)}`,
  ).join(" ");
}

export const INFLATION_SMIC_PATH = linePath((point) => point.ySmic);
export const INFLATION_PRICE_PATH = linePath((point) => point.yPrice);

export const INFLATION_Y_TICKS: InflationYTick[] = Array.from(
  { length: Math.floor((Y_MAX - Y_MIN) / Y_STEP) + 1 },
  (_, index) => Y_MIN + (Math.floor((Y_MAX - Y_MIN) / Y_STEP) - index) * Y_STEP,
).map((value) => ({
  value,
  label: String(value),
  y: yAt(value),
  base: value === Y_MIN,
}));

export const INFLATION_YEAR_GROUPS: InflationYearGroup[] = Array.from(
  { length: LAST_YEAR - FIRST_YEAR + 1 },
  (_, index) => FIRST_YEAR + index,
)
  .map((year) => ({
    year,
    pointIndexes: SMIC_INFLATION_POINTS.filter((point) => point.year === year).map(
      (point) => point.index,
    ),
  }))
  .filter((group) => group.pointIndexes.length > 0);

function buildXTicks(): InflationXTick[] {
  const years: number[] = [];
  for (let year = Math.ceil(FIRST_YEAR / 10) * 10; year < LAST_YEAR; year += 10) years.push(year);
  if (years[0] !== FIRST_YEAR) years.unshift(FIRST_YEAR);
  years.push(LAST_YEAR);

  const middle = (FIRST_YEAR + LAST_YEAR) / 2;
  const closestToMiddle = years.reduce((best, year) =>
    Math.abs(year - middle) < Math.abs(best - middle) ? year : best,
  );
  const majors = new Set([years[0], years[years.length - 1], closestToMiddle]);

  return years.map((year) => ({
    year,
    label: String(year),
    x: SMIC_INFLATION_POINTS.find((point) => point.year === year)?.x ?? 0,
    minor: !majors.has(year),
  }));
}

export const INFLATION_X_TICKS: InflationXTick[] = buildXTicks();

export function inflationYearGroup(year: number): InflationYearGroup | undefined {
  return INFLATION_YEAR_GROUPS.find((group) => group.year === year);
}

/**
 * Premier trimestre publié de l'année, ou le même rang de trimestre s'il existe.
 * Ne fabrique jamais une moyenne annuelle.
 */
export function inflationIndexForYear(year: number, preferredQuarter?: number): number {
  const group = inflationYearGroup(year);
  if (!group) return 0;
  if (preferredQuarter != null) {
    const match = group.pointIndexes.find(
      (index) => SMIC_INFLATION_POINTS[index]!.quarterNumber === preferredQuarter,
    );
    if (match != null) return match;
  }
  return group.pointIndexes[0]!;
}

/** Observation publiée la plus proche d'une abscisse, en % de la largeur du tracé. */
export function inflationIndexAtX(xPercent: number): number {
  const raw = Math.round((xPercent / 100) * (COUNT - 1));
  return Math.min(COUNT - 1, Math.max(0, raw));
}
