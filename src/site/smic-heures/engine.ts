/**
 * Calcul du SMIC selon la durée hebdomadaire contractuelle (10 h à 39 h).
 *
 * Source des montants : `@/site/smic/data` (SMIC_CURRENT).
 * Heures supplémentaires (36–39 h) : même majoration légale de 1re tranche
 * et même estimation de réduction de cotisations que le calculateur
 * `/calculateurs/salaire-heures-supplementaires`.
 *
 * Net : estimation indicative (le SMIC légal est fixé en brut).
 * Arrondi : chaque composante monétaire au centime, comme le calculateur HS.
 */

import {
  SMIC_CURRENT,
  SMIC_MONTHLY_HOURS,
} from "@/site/smic/data";
import {
  getProfileCoefficient,
  roundCent,
} from "@/site/salary-calculator";
import { LEGAL_MAJORATION_GROUP1 } from "@/site/overtime-salary-calculator/config";
import { estimateOvertimeContributionRelief } from "@/site/overtime-salary-calculator";

export const SMIC_HOURS_MIN = 10;
export const SMIC_HOURS_MAX = 39;
export const SMIC_HOURS_DEFAULT = 35;
export const FULL_TIME_WEEKLY_HOURS = 35;

/** Durées mises en avant (accès rapide calculateur + surbrillance tableau). */
export const HIGHLIGHT_WEEKLY_HOURS = [
  20, 24, 25, 28, 30, 32, 35, 39,
] as const;

export type HighlightWeeklyHours = (typeof HIGHLIGHT_WEEKLY_HOURS)[number];

/** Majoration retenue pour la 36e à la 39e heure (hypothèse légale par défaut). */
export const OVERTIME_MAJORATION_ASSUMPTION_PERCENT = LEGAL_MAJORATION_GROUP1;

/** Ratio net/brut aligné sur les montants indicatifs Service-Public à 35 h. */
export function getSmicIndicativeNetRatio(): number {
  return SMIC_CURRENT.monthlyNetIndicative / SMIC_CURRENT.monthlyGross;
}

/**
 * Mensualisation usuelle : heures hebdomadaires × 52 ÷ 12.
 * Les heures ne sont pas arrondies ici ; l'arrondi monétaire suit la
 * convention partagée avec le calculateur d'heures supplémentaires
 * (composantes arrondies au centime avant agrégation).
 */
export function weeklyToMonthlyHours(weeklyHours: number): number {
  return (weeklyHours * 52) / 12;
}

export type SmicHoursResult = {
  weeklyHours: number;
  /** Heures mensualisées (total contractuel, y compris HS pour 36–39 h). */
  monthlyHours: number;
  monthlyGross: number;
  /** Net estimé avant prélèvement à la source. */
  monthlyNetEstimated: number;
  /** Projection sur 12 mois au taux SMIC actuellement applicable. */
  annualGrossProjection: number;
  annualNetProjection: number;
  hasOvertime: boolean;
  baseWeeklyHours: number;
  overtimeWeeklyHours: number;
  overtimeMonthlyHours: number;
  overtimeGross: number;
  overtimeNetGain: number;
  contributionRelief: number;
  majorationPercent: number;
  remark: string | null;
};

function estimateNetFromGrossRatio(monthlyGross: number): number {
  return roundCent(monthlyGross * getSmicIndicativeNetRatio());
}

/**
 * Calcule brut et net estimé pour une durée hebdomadaire contractuelle.
 * Retourne `null` si la valeur est hors plage ou non finie.
 */
export function calculateSmicForWeeklyHours(
  weeklyHours: number,
): SmicHoursResult | null {
  if (
    !Number.isFinite(weeklyHours) ||
    weeklyHours < SMIC_HOURS_MIN ||
    weeklyHours > SMIC_HOURS_MAX
  ) {
    return null;
  }

  if (weeklyHours <= FULL_TIME_WEEKLY_HOURS) {
    const isOfficialFullTime = weeklyHours === FULL_TIME_WEEKLY_HOURS;
    const monthlyHours = isOfficialFullTime
      ? SMIC_MONTHLY_HOURS
      : weeklyToMonthlyHours(weeklyHours);

    const monthlyGross = isOfficialFullTime
      ? SMIC_CURRENT.monthlyGross
      : roundCent(monthlyHours * SMIC_CURRENT.hourlyGross);

    const monthlyNetEstimated = isOfficialFullTime
      ? SMIC_CURRENT.monthlyNetIndicative
      : estimateNetFromGrossRatio(monthlyGross);

    return {
      weeklyHours,
      monthlyHours,
      monthlyGross,
      monthlyNetEstimated,
      annualGrossProjection: roundCent(monthlyGross * 12),
      annualNetProjection: roundCent(monthlyNetEstimated * 12),
      hasOvertime: false,
      baseWeeklyHours: weeklyHours,
      overtimeWeeklyHours: 0,
      overtimeMonthlyHours: 0,
      overtimeGross: 0,
      overtimeNetGain: 0,
      contributionRelief: 0,
      majorationPercent: OVERTIME_MAJORATION_ASSUMPTION_PERCENT,
      remark: null,
    };
  }

  const overtimeWeeklyHours = weeklyHours - FULL_TIME_WEEKLY_HOURS;
  const overtimeMonthlyHours = weeklyToMonthlyHours(overtimeWeeklyHours);
  const majorationPercent = OVERTIME_MAJORATION_ASSUMPTION_PERCENT;

  // Même logique monétaire que le moteur HS : taux × (1 + majoration/100) × heures.
  const overtimeGross = roundCent(
    overtimeMonthlyHours *
      SMIC_CURRENT.hourlyGross *
      (1 + majorationPercent / 100),
  );
  const contributionRelief = estimateOvertimeContributionRelief(overtimeGross);
  const coefficient = getProfileCoefficient("nonExecutive");
  const overtimeNetGain = roundCent(
    overtimeGross * coefficient + contributionRelief,
  );

  const monthlyGross = roundCent(SMIC_CURRENT.monthlyGross + overtimeGross);
  const monthlyNetEstimated = roundCent(
    SMIC_CURRENT.monthlyNetIndicative + overtimeNetGain,
  );

  const hoursLabel =
    overtimeWeeklyHours === 1
      ? "1 h supplémentaire"
      : `${overtimeWeeklyHours} h supplémentaires`;

  return {
    weeklyHours,
    monthlyHours: weeklyToMonthlyHours(weeklyHours),
    monthlyGross,
    monthlyNetEstimated,
    annualGrossProjection: roundCent(monthlyGross * 12),
    annualNetProjection: roundCent(monthlyNetEstimated * 12),
    hasOvertime: true,
    baseWeeklyHours: FULL_TIME_WEEKLY_HOURS,
    overtimeWeeklyHours,
    overtimeMonthlyHours,
    overtimeGross,
    overtimeNetGain,
    contributionRelief,
    majorationPercent,
    remark: `Dont ${hoursLabel} à +${majorationPercent} % (hypothèse légale à défaut d'accord ; plancher 10 %)`,
  };
}

/** Tableau complet 10 h → 39 h (entiers). */
export function buildSmicHoursTable(): SmicHoursResult[] {
  const rows: SmicHoursResult[] = [];
  for (let h = SMIC_HOURS_MIN; h <= SMIC_HOURS_MAX; h += 1) {
    const row = calculateSmicForWeeklyHours(h);
    if (row) rows.push(row);
  }
  return rows;
}

export function isHighlightWeeklyHours(hours: number): boolean {
  return (HIGHLIGHT_WEEKLY_HOURS as readonly number[]).includes(hours);
}

/**
 * Parse une saisie utilisateur (virgule ou point, espaces autorisés).
 * Accepte les décimales ; rejette NaN, hors plage, et valeurs négatives.
 */
export function parseWeeklyHoursInput(raw: string): number | null {
  const normalized = raw.trim().replace(/\s/g, "").replace(",", ".");
  if (!normalized) return null;
  if (!/^\d+(\.\d+)?$/.test(normalized)) return null;
  const value = Number(normalized);
  if (!Number.isFinite(value)) return null;
  if (value < SMIC_HOURS_MIN || value > SMIC_HOURS_MAX) return null;
  return value;
}
