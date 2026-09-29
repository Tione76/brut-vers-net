/**
 * Calcul du SMIC selon la durée hebdomadaire contractuelle (10 h à 44 h).
 *
 * Source des montants : `@/site/smic/data` (SMIC_CURRENT).
 * Heures supplémentaires : mêmes majorations légales supplétives (25 % / 50 %)
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
import {
  LEGAL_MAJORATION_GROUP1,
  LEGAL_MAJORATION_GROUP2,
} from "@/site/overtime-salary-calculator/config";
import { estimateOvertimeContributionRelief } from "@/site/overtime-salary-calculator";

export const SMIC_HOURS_MIN = 10;
export const SMIC_HOURS_MAX = 44;
export const SMIC_HOURS_DEFAULT = 35;
export const FULL_TIME_WEEKLY_HOURS = 35;

/** Huit premières heures supplémentaires : jusqu'à la 43e heure hebdomadaire. */
export const OVERTIME_GROUP1_WEEKLY_CAP = 8;

/** Durées mises en avant (surbrillance tableau). */
export const HIGHLIGHT_WEEKLY_HOURS = [
  20, 24, 25, 28, 30, 32, 35, 39, 40, 43, 44,
] as const;

/** Accès rapide calculateur : temps partiel. */
export const PART_TIME_CHIP_HOURS = [20, 24, 25, 28, 30, 32] as const;

/** Accès rapide calculateur : durée légale et heures supplémentaires. */
export const FULL_TIME_CHIP_HOURS = [35, 36, 39, 40, 44] as const;

export type HighlightWeeklyHours = (typeof HIGHLIGHT_WEEKLY_HOURS)[number];

/** Majoration retenue pour la 36e à la 43e heure (hypothèse légale par défaut). */
export const OVERTIME_MAJORATION_ASSUMPTION_PERCENT = LEGAL_MAJORATION_GROUP1;

/** Majoration retenue à partir de la 44e heure (hypothèse légale par défaut). */
export const OVERTIME_MAJORATION_GROUP2_PERCENT = LEGAL_MAJORATION_GROUP2;

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

export function smicOvertimeHourlyGross(majorationPercent: number): number {
  return roundCent(SMIC_CURRENT.hourlyGross * (1 + majorationPercent / 100));
}

function overtimeGrossForWeeklyHours(
  weeklyOvertimeHours: number,
  majorationPercent: number,
): number {
  if (weeklyOvertimeHours <= 0) return 0;
  return roundCent(
    weeklyToMonthlyHours(weeklyOvertimeHours) *
      SMIC_CURRENT.hourlyGross *
      (1 + majorationPercent / 100),
  );
}

function overtimeRemark(hours25: number, hours50: number): string {
  if (hours50 > 0) {
    const label25 = hours25 === 1 ? "1 h à +25 %" : `${hours25} h à +25 %`;
    const label50 = hours50 === 1 ? "1 h à +50 %" : `${hours50} h à +50 %`;
    return `Dont ${label25} et ${label50} (hypothèse légale à défaut d'accord ; plancher 10 %)`;
  }
  const hoursLabel =
    hours25 === 1 ? "1 h supplémentaire" : `${hours25} h supplémentaires`;
  return `Dont ${hoursLabel} à +${OVERTIME_MAJORATION_ASSUMPTION_PERCENT} % (hypothèse légale à défaut d'accord ; plancher 10 %)`;
}

export type SmicHoursResult = {
  weeklyHours: number;
  /** Heures mensualisées (total contractuel, y compris HS au-delà de 35 h). */
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
  overtimeGross25: number;
  overtimeGross50: number;
  overtimeNetGain: number;
  contributionRelief: number;
  overtimeWeeklyHours25: number;
  overtimeWeeklyHours50: number;
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
      overtimeGross25: 0,
      overtimeGross50: 0,
      overtimeNetGain: 0,
      contributionRelief: 0,
      overtimeWeeklyHours25: 0,
      overtimeWeeklyHours50: 0,
      majorationPercent: OVERTIME_MAJORATION_ASSUMPTION_PERCENT,
      remark: null,
    };
  }

  const overtimeWeeklyHours = weeklyHours - FULL_TIME_WEEKLY_HOURS;
  const overtimeWeeklyHours25 = Math.min(
    overtimeWeeklyHours,
    OVERTIME_GROUP1_WEEKLY_CAP,
  );
  const overtimeWeeklyHours50 = Math.max(
    overtimeWeeklyHours - OVERTIME_GROUP1_WEEKLY_CAP,
    0,
  );
  const overtimeMonthlyHours = weeklyToMonthlyHours(overtimeWeeklyHours);
  const overtimeGross25 = overtimeGrossForWeeklyHours(
    overtimeWeeklyHours25,
    OVERTIME_MAJORATION_ASSUMPTION_PERCENT,
  );
  const overtimeGross50 = overtimeGrossForWeeklyHours(
    overtimeWeeklyHours50,
    OVERTIME_MAJORATION_GROUP2_PERCENT,
  );
  const overtimeGross = roundCent(overtimeGross25 + overtimeGross50);
  const contributionRelief = estimateOvertimeContributionRelief(overtimeGross);
  const coefficient = getProfileCoefficient("nonExecutive");
  const overtimeNetGain = roundCent(
    overtimeGross * coefficient + contributionRelief,
  );

  const monthlyGross = roundCent(SMIC_CURRENT.monthlyGross + overtimeGross);
  const monthlyNetEstimated = roundCent(
    SMIC_CURRENT.monthlyNetIndicative + overtimeNetGain,
  );

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
    overtimeGross25,
    overtimeGross50,
    overtimeNetGain,
    contributionRelief,
    overtimeWeeklyHours25,
    overtimeWeeklyHours50,
    majorationPercent: OVERTIME_MAJORATION_ASSUMPTION_PERCENT,
    remark: overtimeRemark(overtimeWeeklyHours25, overtimeWeeklyHours50),
  };
}

/** Tableau complet 10 h → 44 h (entiers). */
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

export type SmicWeeklyOvertimeGain = {
  weeklyOvertimeHours: number;
  hoursAt25: number;
  hoursAt50: number;
  weeklyGross: number;
  monthlyGross: number;
  monthlyNetGain: number;
};

/** Gain d'un volume d'heures supplémentaires *par semaine* au SMIC (1 à 9 h). */
export function calculateSmicWeeklyOvertimeGain(
  weeklyOvertimeHours: number,
): SmicWeeklyOvertimeGain | null {
  if (
    !Number.isFinite(weeklyOvertimeHours) ||
    weeklyOvertimeHours < 1 ||
    weeklyOvertimeHours > OVERTIME_GROUP1_WEEKLY_CAP + 1
  ) {
    return null;
  }
  const result = calculateSmicForWeeklyHours(
    FULL_TIME_WEEKLY_HOURS + weeklyOvertimeHours,
  );
  if (!result) return null;
  return {
    weeklyOvertimeHours,
    hoursAt25: result.overtimeWeeklyHours25,
    hoursAt50: result.overtimeWeeklyHours50,
    weeklyGross: roundCent(
      result.overtimeWeeklyHours25 *
        SMIC_CURRENT.hourlyGross *
        (1 + OVERTIME_MAJORATION_ASSUMPTION_PERCENT / 100) +
        result.overtimeWeeklyHours50 *
          SMIC_CURRENT.hourlyGross *
          (1 + OVERTIME_MAJORATION_GROUP2_PERCENT / 100),
    ),
    monthlyGross: result.overtimeGross,
    monthlyNetGain: result.overtimeNetGain,
  };
}

export function buildSmicWeeklyOvertimeGainTable(): SmicWeeklyOvertimeGain[] {
  const rows: SmicWeeklyOvertimeGain[] = [];
  for (let h = 1; h <= OVERTIME_GROUP1_WEEKLY_CAP + 1; h += 1) {
    const row = calculateSmicWeeklyOvertimeGain(h);
    if (row) rows.push(row);
  }
  return rows;
}
