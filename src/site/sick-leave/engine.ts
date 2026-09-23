import { formatLongDateFr } from "@/site/dates";
import {
  formatCalendarDaysFr,
  formatCompletedYearsFr,
  formatDaysFr,
} from "@/site/fr-copy";

/**
 * Moteur d'estimation du revenu pendant un arrêt maladie (secteur privé).
 *
 * Périmètre : maladie non professionnelle, salarié mensualisé, régime général,
 * minimum légal du complément employeur (L/D 1226).
 *
 * Arrondi IJSS : aucune règle de liquidation (troncature vs arrondi) n'est
 * confirmée par R323-4, R323-5, les circulaires DSS/CNAM consultées, Ameli
 * ou Service-Public. Les exemples officiels divergent (32,87 € vs 32,88 €
 * pour 3 × 2 000 €). Méthode unique retenue : troncature au centime du
 * résultat brut, puis comparaison à l'IJ maximale publiée, sans forcer
 * cette dernière. 42,97 € est le plafond officiel publié, pas forcément
 * le montant calculé au plafond mensuel Ameli.
 *
 * Sources : Ameli, Service-Public F3053, Code du travail L/D 1226.
 */

export const IJSS_DIVISOR = 91.25;
export const IJSS_RATE = 0.5;
/** Multiplicateur réglementaire depuis le 1er avril 2025 (arrêts débutant à compter de cette date). */
export const IJSS_SMIC_MULTIPLIER = 1.4;
/** Ancien multiplicateur pour les arrêts débutant avant le 1er avril 2025 (non simulé ici). */
export const IJSS_SMIC_MULTIPLIER_LEGACY = 1.8;
export const IJSS_CARENCE_DAYS_DEFAULT = 3;
export const EMPLOYER_CARENCE_DAYS_DEFAULT = 7;
export const CSG_RATE_ON_IJSS = 0.062;
export const CRDS_RATE_ON_IJSS = 0.005;
export const SOCIAL_LEVY_RATE_ON_IJSS = CSG_RATE_ON_IJSS + CRDS_RATE_ON_IJSS;

/**
 * Première date de début d'arrêt pour laquelle un barème publié cohérent
 * est conservé dans le moteur (1er juillet 2026).
 */
export const IJSS_EARLIEST_SUPPORTED_STOP_START = "2026-07-01";

export const IJSS_JUNE_2026_INCONSISTENT_MESSAGE =
  "Les sources officielles consultées présentent une incohérence pour cette période. Afin de ne pas afficher une estimation incertaine, le calculateur ne la prend pas en charge.";

export const IJSS_UNSUPPORTED_BAREME_MESSAGE =
  "Ce barème n'est pas simulé : le calculateur prend en charge les arrêts débutant à compter du 1er juillet 2026. Les arrêts antérieurs, y compris le régime à 1,8 SMIC avant le 1er avril 2025, ne sont pas estimés.";

export const MAINTENANCE_RATE_FIRST = 0.9;
/** Deux tiers exacts (66,66 % affichés côté UI). */
export const MAINTENANCE_RATE_SECOND = 2 / 3;

export const SICK_LEAVE_MAX_MONTHLY_GROSS = 100_000;
export const SICK_LEAVE_MAX_DURATION_DAYS = 365 * 3;

export type IjssCarenceMode = "standard3Days" | "waived";
export type EmployerComplementMode = "legalMinimum" | "none" | "customAmount";
export type SubrogationMode = "yes" | "no" | "unknown";

export type SickLeaveBareme = {
  /** Première date de début d'arrêt à laquelle ce barème s'applique (YYYY-MM-DD). */
  effectiveFrom: string;
  /** Dernière date de début inclusive, ou null si ouvert. */
  effectiveTo: string | null;
  /** Coefficient réglementaire appliqué au SMIC pour le plafond (1,4 depuis le 1er avril 2025). */
  smicMultiplier: typeof IJSS_SMIC_MULTIPLIER | typeof IJSS_SMIC_MULTIPLIER_LEGACY;
  monthlyCeiling: number;
  maxDailyIjssGross: number;
  /**
   * SMIC mensuel de référence retenu pour expliquer le plafond
   * (dernier jour du mois civil précédant l'arrêt, selon Ameli).
   */
  smicMonthlyReference: number;
  sourceLabel: string;
  notes: string;
  /** URL Ameli de référence pour ce barème. */
  sourceHref: string;
};

const AMELI_IJSS_MALADIE_HREF =
  "https://www.ameli.fr/assure/remboursements/indemnites-journalieres-maladie-maternite-paternite/indemnites-journalieres-pour-maladie/arret-maladie-salarie";

/**
 * Barèmes IJSS maladie (cas général) publiés par l'Assurance Maladie.
 * Sélection selon la date de début de l'arrêt.
 *
 * Périmètre limité au barème Ameli publié pour les arrêts débutant à compter
 * du 1er juillet 2026 (plafond 2 613,83 € / IJ max 42,97 €).
 *
 * Juin 2026 n'est pas simulé : les sources officielles consultées présentent
 * une incohérence sur le plafond mensuel. Aucun barème à 1,8 SMIC n'est simulé.
 */
export const IJSS_BAREMES: readonly SickLeaveBareme[] = [
  {
    effectiveFrom: "2026-07-01",
    effectiveTo: null,
    smicMultiplier: IJSS_SMIC_MULTIPLIER,
    monthlyCeiling: 2613.83,
    maxDailyIjssGross: 42.97,
    /** 1,4 × 1 867,02 € (SMIC au 1er juin 2026) ≈ 2 613,83 € Ameli. */
    smicMonthlyReference: 1867.02,
    sourceLabel: "Ameli (arrêts débutant à compter du 1er juillet 2026)",
    notes:
      "Plafond mensuel Ameli 2 613,83 € (Service-Public affiche parfois 2 613,82 €). IJ maximale publiée : 42,97 €. Multiplicateur 1,4 SMIC.",
    sourceHref: AMELI_IJSS_MALADIE_HREF,
  },
] as const;

export type MaintienSchedule = {
  firstPeriodDays: number;
  secondPeriodDays: number;
  firstRate: number;
  secondRate: number;
};

/**
 * Barème légal D1226-2 selon l'ancienneté révolue au 1er jour d'absence.
 * 30 jours à 90 %, puis 30 jours aux deux tiers, plus 10 jours par période
 * entière de 5 ans au-delà de l'année requise, plafonné à 90 jours par tranche.
 */
export function getLegalMaintienSchedule(seniorityYears: number): MaintienSchedule | null {
  if (!Number.isFinite(seniorityYears) || seniorityYears < 1) return null;
  const completed = Math.floor(seniorityYears);
  if (completed < 1) return null;
  const firstRate = MAINTENANCE_RATE_FIRST;
  const secondRate = MAINTENANCE_RATE_SECOND;
  const days = Math.min(90, 30 + Math.floor((completed - 1) / 5) * 10);
  return { firstPeriodDays: days, secondPeriodDays: days, firstRate, secondRate };
}

/** Ajoute un nombre de jours calendaires à une date ISO (YYYY-MM-DD). */
export function addCalendarDays(iso: string, days: number): string | null {
  const date = parseIsoDateOnly(iso);
  if (!date || !Number.isFinite(days)) return null;
  date.setUTCDate(date.getUTCDate() + days);
  return formatIsoDateOnly(date);
}

/**
 * Années révolues entre la date d'entrée et la date de référence
 * (premier jour d'absence). Null si une date est invalide ou si
 * l'entrée est postérieure à la référence.
 */
export function computeCompletedSeniorityYears(
  hireIso: string,
  referenceIso: string,
): number | null {
  const hire = parseIsoDateOnly(hireIso);
  const reference = parseIsoDateOnly(referenceIso);
  if (!hire || !reference) return null;
  if (reference.getTime() < hire.getTime()) return null;
  let years = reference.getUTCFullYear() - hire.getUTCFullYear();
  const month = hire.getUTCMonth();
  const hireDay = hire.getUTCDate();
  const lastDayOfMonth = new Date(
    Date.UTC(reference.getUTCFullYear(), month + 1, 0),
  ).getUTCDate();
  const anniversaryDay = Math.min(hireDay, lastDayOfMonth);
  const anniversary = new Date(
    Date.UTC(reference.getUTCFullYear(), month, anniversaryDay, 12, 0, 0),
  );
  if (reference.getTime() < anniversary.getTime()) years -= 1;
  return Math.max(0, years);
}

/** Troncature au centime (vers zéro pour les positifs), tolérante au flottant. */
export function truncateCent(value: number): number {
  if (!Number.isFinite(value)) return NaN;
  if (value >= 0) {
    return Math.floor(value * 100 + 1e-8) / 100;
  }
  return Math.ceil(value * 100 - 1e-8) / 100;
}

/** Multiplie un montant déjà tronqué au centime par un entier de jours. */
export function multiplyDailyByDays(dailyAmount: number, days: number): number {
  if (!Number.isFinite(dailyAmount) || !Number.isFinite(days) || days < 0) return NaN;
  return (Math.round(dailyAmount * 100) * days) / 100;
}

/** Arrondi au centime le plus proche (0,5 vers le haut pour les positifs). */
export function roundHalfUpCent(value: number): number {
  if (!Number.isFinite(value)) return NaN;
  return Math.floor(value * 100 + 0.5 + Number.EPSILON) / 100;
}

export function parseIsoDateOnly(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y!, m! - 1, d!, 12, 0, 0));
  if (
    date.getUTCFullYear() !== y ||
    date.getUTCMonth() !== m! - 1 ||
    date.getUTCDate() !== d
  ) {
    return null;
  }
  return date;
}

export function formatIsoDateOnly(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Nombre de jours calendaires inclusifs entre deux dates ISO. */
export function countInclusiveCalendarDays(
  startIso: string,
  endIso: string,
): number | null {
  const start = parseIsoDateOnly(startIso);
  const end = parseIsoDateOnly(endIso);
  if (!start || !end) return null;
  if (end.getTime() < start.getTime()) return null;
  return Math.round((end.getTime() - start.getTime()) / 86_400_000) + 1;
}

export function selectIjssBareme(stopStartIso: string): SickLeaveBareme | null {
  const start = parseIsoDateOnly(stopStartIso);
  if (!start) return null;
  const startMs = start.getTime();
  for (let i = IJSS_BAREMES.length - 1; i >= 0; i -= 1) {
    const bareme = IJSS_BAREMES[i]!;
    const from = parseIsoDateOnly(bareme.effectiveFrom);
    if (!from || startMs < from.getTime()) continue;
    if (bareme.effectiveTo) {
      const to = parseIsoDateOnly(bareme.effectiveTo);
      if (!to || startMs > to.getTime()) continue;
    }
    return bareme;
  }
  return null;
}

/** Message à afficher si la date de début n'est pas simulée, sinon null. */
export function getIjssUnsupportedReason(stopStartIso: string): string | null {
  if (selectIjssBareme(stopStartIso)) return null;
  const start = parseIsoDateOnly(stopStartIso);
  if (!start) return null;
  if (start.getUTCFullYear() === 2026 && start.getUTCMonth() === 5) {
    return IJSS_JUNE_2026_INCONSISTENT_MESSAGE;
  }
  return IJSS_UNSUPPORTED_BAREME_MESSAGE;
}

export function capMonthlySalary(salary: number, ceiling: number): number {
  if (!Number.isFinite(salary) || salary < 0) return NaN;
  return Math.min(salary, ceiling);
}

/**
 * IJSS journalière brute selon l'arbitrage d'arrondi documenté.
 */
export function computeDailyIjssGross(
  referenceSalaries: readonly [number, number, number],
  bareme: SickLeaveBareme,
): {
  cappedSalaries: [number, number, number];
  cappedTotal: number;
  dailyBaseSalary: number;
  dailyIjssGross: number;
  ceilingApplied: boolean;
} {
  const cappedSalaries: [number, number, number] = [
    capMonthlySalary(referenceSalaries[0], bareme.monthlyCeiling),
    capMonthlySalary(referenceSalaries[1], bareme.monthlyCeiling),
    capMonthlySalary(referenceSalaries[2], bareme.monthlyCeiling),
  ];
  const cappedTotal = cappedSalaries[0] + cappedSalaries[1] + cappedSalaries[2];
  const dailyBaseRaw = cappedTotal / IJSS_DIVISOR;
  const dailyBaseSalary = truncateCent(dailyBaseRaw);
  const rawIjss = dailyBaseRaw * IJSS_RATE;
  const dailyIjssGross = Math.min(
    truncateCent(rawIjss),
    bareme.maxDailyIjssGross,
  );
  const ceilingApplied = cappedSalaries.some(
    (salary, index) => salary < referenceSalaries[index]!,
  );
  return {
    cappedSalaries,
    cappedTotal: truncateCent(cappedTotal),
    dailyBaseSalary,
    dailyIjssGross,
    ceilingApplied,
  };
}

export function computeIjssNetIndicative(dailyOrTotalGross: number): number {
  return truncateCent(dailyOrTotalGross * (1 - SOCIAL_LEVY_RATE_ON_IJSS));
}

/** Salaire journalier théorique annualisé (convention d'estimation). */
export function theoreticalDailyGrossFromMonthly(monthlyGross: number): number {
  return (monthlyGross * 12) / 365;
}

/**
 * Total du complément légal : les décimales intermédiaires restent exactes,
 * seul le montant final est arrondi au centime le plus proche (0,5 vers le haut).
 */
export function finalizeMaintienTotal(value: number): number {
  return roundHalfUpCent(value);
}

export function dailyLegalComplement(
  targetDaily: number,
  dailyIjssGross: number,
  employerPrevoyanceDailyGross: number,
): number {
  return Math.max(0, targetDaily - dailyIjssGross - employerPrevoyanceDailyGross);
}

export type SickLeaveCalculationInput = {
  monthlyGrossUsual: number;
  /** Trois derniers salaires bruts ; défaut = trois fois le salaire habituel. */
  referenceSalaries?: [number, number, number];
  stopStartIso: string;
  stopEndIso: string;
  ijssCarenceMode: IjssCarenceMode;
  employerComplementMode: EmployerComplementMode;
  /** Ancienneté en années révolues au 1er jour d'absence. */
  seniorityYears: number;
  /** Conditions d'éligibilité confirmées par l'utilisateur (minimum légal). */
  employerEligibilityConfirmed: boolean;
  daysAlreadyUsedFirstPeriod?: number;
  daysAlreadyUsedSecondPeriod?: number;
  /** Montant brut total de complément connu (remplace le calcul légal). */
  customEmployerComplementGross?: number;
  /** Retenue brute d'absence connue (optionnelle). */
  knownAbsenceDeductionGross?: number | null;
  /**
   * Prestation journalière brute de prévoyance financée par l'employeur.
   * Déduite du complément légal uniquement. Défaut : 0.
   */
  employerPrevoyanceDailyGross?: number;
  subrogation: SubrogationMode;
};

export type LegalEmployerComplementInput = {
  monthlyGrossUsual: number;
  stopStartIso: string;
  stopEndIso: string;
  /** Ancienneté en années révolues au 1er jour d'absence. */
  seniorityYears: number;
  eligibilityConfirmed: boolean;
  /** IJSS journalière brute retenue dans la formule de complément. */
  dailyIjssGross: number;
  employerPrevoyanceDailyGross?: number;
  daysAlreadyUsedFirstPeriod?: number;
  daysAlreadyUsedSecondPeriod?: number;
};

export type LegalEmployerComplementResult = {
  stopStartIso: string;
  stopEndIso: string;
  totalCalendarDays: number;
  seniorityYears: number;
  eligibleApparent: boolean;
  eligibilityConfirmed: boolean;
  schedule: MaintienSchedule | null;
  remainingFirstDaysBeforeStop: number;
  remainingSecondDaysBeforeStop: number;
  remainingFirstDaysAfterStop: number;
  remainingSecondDaysAfterStop: number;
  usedFirst: number;
  usedSecond: number;
  employerCarenceDays: number;
  firstComplementDateIso: string | null;
  firstDaysCovered: number;
  secondDaysCovered: number;
  employerComplementDays: number;
  uncoveredDays: number;
  uncoveredCarenceDays: number;
  uncoveredAfterRightsDays: number;
  theoreticalDailyGross: number;
  theoreticalDailyGrossExact: number;
  dailyIjssGross: number;
  employerPrevoyanceDailyGross: number;
  firstPeriodTargetDaily: number;
  firstPeriodTargetDailyExact: number;
  secondPeriodTargetDaily: number;
  secondPeriodTargetDailyExact: number;
  firstPeriodDailyComplementExact: number;
  secondPeriodDailyComplementExact: number;
  firstPeriodComplementGross: number;
  secondPeriodComplementGross: number;
  employerComplementGrossTotal: number;
  ijssDeductedOnCoveredDaysGross: number;
  prevoyanceDeductedOnCoveredDaysGross: number;
  alerts: SickLeaveAlert[];
  detailLines: string[];
};

export type SickLeaveAlert = {
  code: string;
  severity: "info" | "warning";
  message: string;
};

export type SickLeaveCalculationResult = {
  stopStartIso: string;
  stopEndIso: string;
  totalCalendarDays: number;
  bareme: SickLeaveBareme;
  referenceSalaries: [number, number, number];
  cappedSalaries: [number, number, number];
  cappedTotal: number;
  dailyBaseSalary: number;
  dailyIjssGross: number;
  dailyIjssNetIndicative: number;
  ijssCarenceDays: number;
  ijssIndemnifiedDays: number;
  ijssGrossTotal: number;
  ijssNetIndicativeTotal: number;
  employerCarenceDays: number;
  employerComplementMode: EmployerComplementMode;
  seniorityYears: number;
  maintienSchedule: MaintienSchedule | null;
  employerComplementDays: number;
  employerComplementGrossTotal: number;
  theoreticalDailyGross: number;
  habitualIncomeForPeriod: number;
  estimatedIncomeForStop: number;
  estimatedLoss: number;
  knownAbsenceDeductionGross: number | null;
  subrogation: SubrogationMode;
  payerLabel: string;
  ceilingApplied: boolean;
  alerts: SickLeaveAlert[];
  detailLines: string[];
};

function buildPayerLabel(subrogation: SubrogationMode): string {
  if (subrogation === "yes") {
    return "IJSS versées à l'employeur (subrogation) ; complément versé par l'employeur";
  }
  if (subrogation === "no") {
    return "IJSS versées au salarié par la CPAM ; complément versé par l'employeur";
  }
  return "Circuit de versement non précisé (total des droits inchangé)";
}

/**
 * Répartit les jours de maintien employeur après carence légale.
 * Les jours déjà utilisés réduisent d'abord la 1re tranche, puis la 2e.
 */
export function allocateEmployerMaintienDays(
  indemnifiableCalendarDaysAfterCarence: number,
  schedule: MaintienSchedule,
  usedFirst: number,
  usedSecond: number,
): { firstDays: number; secondDays: number } {
  const remainingFirst = Math.max(0, schedule.firstPeriodDays - Math.max(0, usedFirst));
  const remainingSecond = Math.max(0, schedule.secondPeriodDays - Math.max(0, usedSecond));
  const firstDays = Math.min(indemnifiableCalendarDaysAfterCarence, remainingFirst);
  const remainingAfterFirst = indemnifiableCalendarDaysAfterCarence - firstDays;
  const secondDays = Math.min(remainingAfterFirst, remainingSecond);
  return { firstDays, secondDays };
}

function complementForDays(
  days: number,
  rate: number,
  theoreticalDailyGross: number,
  dailyIjssGross: number,
  employerPrevoyanceDailyGross: number,
): number {
  let total = 0;
  for (let i = 0; i < days; i += 1) {
    total += dailyLegalComplement(
      theoreticalDailyGross * rate,
      dailyIjssGross,
      employerPrevoyanceDailyGross,
    );
  }
  return total;
}

/**
 * Minimum légal du complément employeur (maladie non professionnelle).
 * Source unique pour le simulateur de revenu total et le calculateur de maintien.
 */
export function computeLegalEmployerComplement(
  input: LegalEmployerComplementInput,
): LegalEmployerComplementResult | null {
  const {
    monthlyGrossUsual,
    stopStartIso,
    stopEndIso,
    seniorityYears,
    eligibilityConfirmed,
    dailyIjssGross,
  } = input;

  if (
    !Number.isFinite(monthlyGrossUsual) ||
    monthlyGrossUsual < 0 ||
    monthlyGrossUsual > SICK_LEAVE_MAX_MONTHLY_GROSS
  ) {
    return null;
  }
  if (!Number.isFinite(dailyIjssGross) || dailyIjssGross < 0) return null;

  const employerPrevoyanceDailyGross = input.employerPrevoyanceDailyGross ?? 0;
  if (
    !Number.isFinite(employerPrevoyanceDailyGross) ||
    employerPrevoyanceDailyGross < 0
  ) {
    return null;
  }

  const totalCalendarDays = countInclusiveCalendarDays(stopStartIso, stopEndIso);
  if (totalCalendarDays === null || totalCalendarDays <= 0) return null;
  if (totalCalendarDays > SICK_LEAVE_MAX_DURATION_DAYS) return null;
  if (!Number.isFinite(seniorityYears) || seniorityYears < 0) return null;

  const usedFirst = input.daysAlreadyUsedFirstPeriod ?? 0;
  const usedSecond = input.daysAlreadyUsedSecondPeriod ?? 0;
  if (!Number.isFinite(usedFirst) || usedFirst < 0) return null;
  if (!Number.isFinite(usedSecond) || usedSecond < 0) return null;

  const theoreticalDailyGross = theoreticalDailyGrossFromMonthly(monthlyGrossUsual);
  const employerCarenceDays = Math.min(EMPLOYER_CARENCE_DAYS_DEFAULT, totalCalendarDays);
  const daysAfterEmployerCarence = Math.max(0, totalCalendarDays - employerCarenceDays);
  const firstComplementDateIso =
    totalCalendarDays >= EMPLOYER_CARENCE_DAYS_DEFAULT + 1
      ? addCalendarDays(stopStartIso, EMPLOYER_CARENCE_DAYS_DEFAULT)
      : null;

  const schedule = getLegalMaintienSchedule(seniorityYears);
  const remainingFirstDaysBeforeStop = schedule
    ? Math.max(0, schedule.firstPeriodDays - usedFirst)
    : 0;
  const remainingSecondDaysBeforeStop = schedule
    ? Math.max(0, schedule.secondPeriodDays - usedSecond)
    : 0;

  const eligibleApparent = Boolean(eligibilityConfirmed && schedule);
  let firstDaysCovered = 0;
  let secondDaysCovered = 0;
  let firstPeriodComplementGross = 0;
  let secondPeriodComplementGross = 0;

  if (eligibleApparent && schedule) {
    const allocated = allocateEmployerMaintienDays(
      daysAfterEmployerCarence,
      schedule,
      usedFirst,
      usedSecond,
    );
    firstDaysCovered = allocated.firstDays;
    secondDaysCovered = allocated.secondDays;
    firstPeriodComplementGross = complementForDays(
      firstDaysCovered,
      schedule.firstRate,
      theoreticalDailyGross,
      dailyIjssGross,
      employerPrevoyanceDailyGross,
    );
    secondPeriodComplementGross = complementForDays(
      secondDaysCovered,
      schedule.secondRate,
      theoreticalDailyGross,
      dailyIjssGross,
      employerPrevoyanceDailyGross,
    );
  }

  const employerComplementDays = firstDaysCovered + secondDaysCovered;
  const employerComplementGrossTotal = finalizeMaintienTotal(
    firstPeriodComplementGross + secondPeriodComplementGross,
  );
  const uncoveredCarenceDays = employerCarenceDays;
  const uncoveredAfterRightsDays = Math.max(
    0,
    daysAfterEmployerCarence - employerComplementDays,
  );
  const uncoveredDays = uncoveredCarenceDays + uncoveredAfterRightsDays;
  const remainingFirstDaysAfterStop = remainingFirstDaysBeforeStop - firstDaysCovered;
  const remainingSecondDaysAfterStop = remainingSecondDaysBeforeStop - secondDaysCovered;
  const firstPeriodTargetDaily = theoreticalDailyGross * MAINTENANCE_RATE_FIRST;
  const secondPeriodTargetDaily = theoreticalDailyGross * MAINTENANCE_RATE_SECOND;
  const ijssDeductedOnCoveredDaysGross = multiplyDailyByDays(
    dailyIjssGross,
    employerComplementDays,
  );
  const prevoyanceDeductedOnCoveredDaysGross = multiplyDailyByDays(
    employerPrevoyanceDailyGross,
    employerComplementDays,
  );

  const alerts: SickLeaveAlert[] = [];
  if (seniorityYears < 1) {
    alerts.push({
      code: "seniority-under-1",
      severity: "warning",
      message:
        "Avec moins d'un an d'ancienneté, le minimum légal de complément employeur ne s'applique pas.",
    });
  }
  if (totalCalendarDays < EMPLOYER_CARENCE_DAYS_DEFAULT + 1) {
    alerts.push({
      code: "short-stop-employer",
      severity: "info",
      message:
        "Pour un arrêt de moins de huit jours, le complément légal de l'employeur ne démarre pas encore dans le cas général.",
    });
  }
  if (!eligibilityConfirmed) {
    alerts.push({
      code: "eligibility-unconfirmed",
      severity: "warning",
      message:
        "Le minimum légal n'est calculé que si vous indiquez avoir vérifié les principales conditions.",
    });
  }
  if (usedFirst > 0 || usedSecond > 0) {
    alerts.push({
      code: "prior-rights-used",
      severity: "info",
      message:
        "Des jours de maintien déjà utilisés sur les douze mois précédents réduisent les droits restants.",
    });
  }
  if (employerPrevoyanceDailyGross > 0) {
    alerts.push({
      code: "prevoyance-deducted",
      severity: "info",
      message:
        "La part de prévoyance financée par l'employeur est déduite du complément légal, sans le rendre négatif.",
    });
  }
  if (uncoveredAfterRightsDays > 0 && eligibleApparent) {
    alerts.push({
      code: "rights-exhausted",
      severity: "info",
      message:
        "Une partie de l'arrêt n'est plus couverte par le minimum légal : les droits restants sont épuisés.",
    });
  }

  const firstPeriodTargetDailyExact = theoreticalDailyGross * MAINTENANCE_RATE_FIRST;
  const secondPeriodTargetDailyExact = theoreticalDailyGross * MAINTENANCE_RATE_SECOND;
  const firstPeriodDailyComplementExact = dailyLegalComplement(
    firstPeriodTargetDailyExact,
    dailyIjssGross,
    employerPrevoyanceDailyGross,
  );
  const secondPeriodDailyComplementExact = dailyLegalComplement(
    secondPeriodTargetDailyExact,
    dailyIjssGross,
    employerPrevoyanceDailyGross,
  );
  const firstComplementLabel = firstComplementDateIso
    ? formatLongDateFr(firstComplementDateIso)
    : "aucun (arrêt trop court)";

  const detailLines = [
    `Période d'arrêt : du ${formatLongDateFr(stopStartIso)} au ${formatLongDateFr(stopEndIso)} inclus (${formatCalendarDaysFr(totalCalendarDays)})`,
    `Ancienneté retenue : ${formatCompletedYearsFr(Math.floor(seniorityYears))}`,
    `Salaire journalier théorique (convention d'estimation : mensuel × 12 ÷ 365) : ${truncateCent(theoreticalDailyGross)} € brut`,
    `IJSS journalière brute retenue : ${truncateCent(dailyIjssGross)} €`,
    `Prévoyance journalière financée par l'employeur : ${truncateCent(employerPrevoyanceDailyGross)} €`,
    `Délai légal de sept jours du complément employeur : ${formatDaysFr(employerCarenceDays)}`,
    `Premier jour théorique de complément : ${firstComplementLabel}`,
    `Jours à 90 % : ${firstDaysCovered} ; jours aux deux tiers : ${secondDaysCovered}`,
    `Complément employeur brut estimé : ${employerComplementGrossTotal} €`,
    `Jours sans complément légal : ${uncoveredDays}`,
    "Les décimales intermédiaires sont conservées pendant le calcul. Le montant total est arrondi au centime le plus proche.",
  ];

  return {
    stopStartIso,
    stopEndIso,
    totalCalendarDays,
    seniorityYears,
    eligibleApparent,
    eligibilityConfirmed,
    schedule,
    remainingFirstDaysBeforeStop,
    remainingSecondDaysBeforeStop,
    remainingFirstDaysAfterStop,
    remainingSecondDaysAfterStop,
    usedFirst,
    usedSecond,
    employerCarenceDays,
    firstComplementDateIso,
    firstDaysCovered,
    secondDaysCovered,
    employerComplementDays,
    uncoveredDays,
    uncoveredCarenceDays,
    uncoveredAfterRightsDays,
    theoreticalDailyGross: truncateCent(theoreticalDailyGross),
    theoreticalDailyGrossExact: theoreticalDailyGross,
    dailyIjssGross: truncateCent(dailyIjssGross),
    employerPrevoyanceDailyGross: truncateCent(employerPrevoyanceDailyGross),
    firstPeriodTargetDaily: truncateCent(firstPeriodTargetDaily),
    firstPeriodTargetDailyExact,
    secondPeriodTargetDaily: truncateCent(secondPeriodTargetDaily),
    secondPeriodTargetDailyExact,
    firstPeriodDailyComplementExact,
    secondPeriodDailyComplementExact,
    firstPeriodComplementGross: finalizeMaintienTotal(firstPeriodComplementGross),
    secondPeriodComplementGross: finalizeMaintienTotal(secondPeriodComplementGross),
    employerComplementGrossTotal,
    ijssDeductedOnCoveredDaysGross,
    prevoyanceDeductedOnCoveredDaysGross,
    alerts,
    detailLines,
  };
}

export function calculateSickLeaveSalary(
  input: SickLeaveCalculationInput,
): SickLeaveCalculationResult | null {
  const {
    monthlyGrossUsual,
    stopStartIso,
    stopEndIso,
    ijssCarenceMode,
    employerComplementMode,
    seniorityYears,
    employerEligibilityConfirmed,
    subrogation,
  } = input;

  if (
    !Number.isFinite(monthlyGrossUsual) ||
    monthlyGrossUsual < 0 ||
    monthlyGrossUsual > SICK_LEAVE_MAX_MONTHLY_GROSS
  ) {
    return null;
  }

  const referenceSalaries: [number, number, number] = input.referenceSalaries ?? [
    monthlyGrossUsual,
    monthlyGrossUsual,
    monthlyGrossUsual,
  ];
  if (
    referenceSalaries.some(
      (salary) =>
        !Number.isFinite(salary) ||
        salary < 0 ||
        salary > SICK_LEAVE_MAX_MONTHLY_GROSS,
    )
  ) {
    return null;
  }

  const totalCalendarDays = countInclusiveCalendarDays(stopStartIso, stopEndIso);
  if (totalCalendarDays === null || totalCalendarDays <= 0) return null;
  if (totalCalendarDays > SICK_LEAVE_MAX_DURATION_DAYS) return null;

  const bareme = selectIjssBareme(stopStartIso);
  if (!bareme) return null;

  const ijssParts = computeDailyIjssGross(referenceSalaries, bareme);
  const ijssCarenceDays =
    ijssCarenceMode === "waived" ? 0 : Math.min(IJSS_CARENCE_DAYS_DEFAULT, totalCalendarDays);
  const ijssIndemnifiedDays = Math.max(0, totalCalendarDays - ijssCarenceDays);
  const ijssGrossTotal = multiplyDailyByDays(ijssParts.dailyIjssGross, ijssIndemnifiedDays);
  const dailyIjssNetIndicative = computeIjssNetIndicative(ijssParts.dailyIjssGross);
  const ijssNetIndicativeTotal = computeIjssNetIndicative(ijssGrossTotal);

  const theoreticalDailyGross = theoreticalDailyGrossFromMonthly(monthlyGrossUsual);
  const habitualIncomeForPeriod = truncateCent(theoreticalDailyGross * totalCalendarDays);

  const usedFirst = input.daysAlreadyUsedFirstPeriod ?? 0;
  const usedSecond = input.daysAlreadyUsedSecondPeriod ?? 0;

  let employerCarenceDays = Math.min(EMPLOYER_CARENCE_DAYS_DEFAULT, totalCalendarDays);
  let employerComplementGrossTotal = 0;
  let employerComplementDays = 0;
  let maintienSchedule: MaintienSchedule | null = getLegalMaintienSchedule(seniorityYears);

  if (employerComplementMode === "customAmount") {
    const custom = input.customEmployerComplementGross ?? NaN;
    if (!Number.isFinite(custom) || custom < 0 || custom > SICK_LEAVE_MAX_MONTHLY_GROSS * 3) {
      return null;
    }
    employerComplementGrossTotal = truncateCent(custom);
    employerComplementDays = 0;
    maintienSchedule = null;
  } else if (employerComplementMode === "legalMinimum") {
    const legal = computeLegalEmployerComplement({
      monthlyGrossUsual,
      stopStartIso,
      stopEndIso,
      seniorityYears,
      eligibilityConfirmed: employerEligibilityConfirmed,
      dailyIjssGross: ijssParts.dailyIjssGross,
      employerPrevoyanceDailyGross: input.employerPrevoyanceDailyGross ?? 0,
      daysAlreadyUsedFirstPeriod: usedFirst,
      daysAlreadyUsedSecondPeriod: usedSecond,
    });
    if (!legal) return null;
    employerCarenceDays = legal.employerCarenceDays;
    employerComplementDays = legal.employerComplementDays;
    employerComplementGrossTotal = legal.employerComplementGrossTotal;
    maintienSchedule = legal.schedule;
  } else {
    maintienSchedule = null;
  }

  const knownAbsence =
    input.knownAbsenceDeductionGross != null &&
    Number.isFinite(input.knownAbsenceDeductionGross) &&
    input.knownAbsenceDeductionGross >= 0
      ? truncateCent(input.knownAbsenceDeductionGross)
      : null;

  // Revenu estimé sur la période d'arrêt = IJSS + complément
  // (la retenue d'absence n'est pas un versement ; la perte compare au revenu habituel).
  const estimatedIncomeForStop = truncateCent(ijssGrossTotal + employerComplementGrossTotal);
  const estimatedLoss = truncateCent(
    knownAbsence != null
      ? knownAbsence - estimatedIncomeForStop
      : habitualIncomeForPeriod - estimatedIncomeForStop,
  );

  const alerts: SickLeaveAlert[] = [];
  if (seniorityYears < 1 && employerComplementMode === "legalMinimum") {
    alerts.push({
      code: "seniority-under-1",
      severity: "warning",
      message:
        "Avec moins d'un an d'ancienneté, le minimum légal de complément employeur ne s'applique pas.",
    });
  }
  if (ijssParts.ceilingApplied) {
    alerts.push({
      code: "ijss-ceiling",
      severity: "info",
      message: `Un ou plusieurs salaires de référence dépassent le plafond IJSS de ${bareme.monthlyCeiling.toFixed(2).replace(".", ",")} € : le calcul retient ce plafond.`,
    });
  }
  if (totalCalendarDays <= IJSS_CARENCE_DAYS_DEFAULT && ijssCarenceMode === "standard3Days") {
    alerts.push({
      code: "short-stop-ijss",
      severity: "info",
      message:
        "Pour un arrêt de trois jours ou moins, aucune IJSS n'est due dans le cas général (délai de carence).",
    });
  }
  if (totalCalendarDays < EMPLOYER_CARENCE_DAYS_DEFAULT + 1) {
    alerts.push({
      code: "short-stop-employer",
      severity: "info",
      message:
        "Pour un arrêt de moins de huit jours, le complément légal de l'employeur ne démarre pas encore dans le cas général.",
    });
  }
  if (employerComplementMode === "legalMinimum" && !employerEligibilityConfirmed) {
    alerts.push({
      code: "eligibility-unconfirmed",
      severity: "warning",
      message:
        "Le minimum légal n'est calculé que si vous confirmez remplir les conditions d'éligibilité.",
    });
  }
  if (usedFirst > 0 || usedSecond > 0) {
    alerts.push({
      code: "prior-rights-used",
      severity: "info",
      message:
        "Des jours de maintien déjà utilisés sur les douze mois précédents réduisent les droits restants.",
    });
  }

  const detailLines = [
    `Période d'arrêt : du ${stopStartIso} au ${stopEndIso} inclus (${totalCalendarDays} jour(s) calendaire(s))`,
    `Barème IJSS : plafond mensuel ${bareme.monthlyCeiling} €, IJ max ${bareme.maxDailyIjssGross} € (${bareme.sourceLabel})`,
    `Salaires de référence : ${referenceSalaries.map((s) => `${s} €`).join(" / ")}`,
    `Salaires plafonnés : ${ijssParts.cappedSalaries.map((s) => `${s} €`).join(" / ")} (total ${ijssParts.cappedTotal} €)`,
    `Salaire journalier de base = ${ijssParts.cappedTotal} ÷ ${IJSS_DIVISOR} → ${ijssParts.dailyBaseSalary} € (troncature au centime)`,
    `IJSS journalière brute = 50 % → ${ijssParts.dailyIjssGross} € (plafonnée à ${bareme.maxDailyIjssGross} €)`,
    `Carence IJSS : ${ijssCarenceDays} jour(s) ; jours indemnisés : ${ijssIndemnifiedDays}`,
    `IJSS brutes totales : ${ijssGrossTotal} €`,
    `CSG ${CSG_RATE_ON_IJSS * 100} % + CRDS ${CRDS_RATE_ON_IJSS * 100} % → IJSS nettes estimées avant PAS : ${ijssNetIndicativeTotal} €`,
    `Salaire journalier théorique (convention d'estimation : mensuel × 12 ÷ 365) : ${truncateCent(theoreticalDailyGross)} €`,
    `Carence complément employeur : ${employerCarenceDays} jour(s)`,
    `Complément employeur brut estimé : ${employerComplementGrossTotal} €`,
    `Total brut estimé pour la période d'arrêt (IJSS brutes + complément brut) : ${estimatedIncomeForStop} €`,
    `Revenu brut théorique pour la même durée : ${habitualIncomeForPeriod} €`,
    `Perte brute indicative : ${estimatedLoss} €`,
    `Subrogation : ${subrogation} - ${buildPayerLabel(subrogation)}`,
  ];

  return {
    stopStartIso,
    stopEndIso,
    totalCalendarDays,
    bareme,
    referenceSalaries,
    cappedSalaries: ijssParts.cappedSalaries,
    cappedTotal: ijssParts.cappedTotal,
    dailyBaseSalary: ijssParts.dailyBaseSalary,
    dailyIjssGross: ijssParts.dailyIjssGross,
    dailyIjssNetIndicative,
    ijssCarenceDays,
    ijssIndemnifiedDays,
    ijssGrossTotal,
    ijssNetIndicativeTotal,
    employerCarenceDays,
    employerComplementMode,
    seniorityYears,
    maintienSchedule,
    employerComplementDays,
    employerComplementGrossTotal,
    theoreticalDailyGross: truncateCent(theoreticalDailyGross),
    habitualIncomeForPeriod,
    estimatedIncomeForStop,
    estimatedLoss,
    knownAbsenceDeductionGross: knownAbsence,
    subrogation,
    payerLabel: buildPayerLabel(subrogation),
    ceilingApplied: ijssParts.ceilingApplied,
    alerts,
    detailLines,
  };
}

export function parseSickLeaveNumber(raw: string): number | null {
  const normalized = raw.trim().replace(/\s/g, "").replace(",", ".");
  if (!normalized) return null;
  const value = Number(normalized);
  if (!Number.isFinite(value)) return null;
  return value;
}
