/**
 * Moteur de calcul du solde de congés payés.
 *
 * Deux approches complémentaires :
 * 1. Estimation par période de référence (acquis estimés jusqu'à une date).
 * 2. Lecture de compteurs fournis (mode fiche de paie N / N-1).
 *
 * Unités : ne jamais additionner jours ouvrés et jours ouvrables.
 * Sources : Service-Public F2258 ; L3141-3, L3141-7 ; Code du travail numérique.
 *
 * Hypothèses documentées (estimation par période) :
 * - Période par défaut : 1er juin → 31 mai (secteur privé, sauf accord).
 * - Mois comptés : mois civils complets écoulés depuis le début d'acquisition
 *   jusqu'à la date de calcul (un mois commencé non achevé n'est pas compté).
 * - Acquisition ouvrable : 2,5 × mois, plafond 30, arrondi L3141-7 sur le total.
 * - Ouvrés : équivalence usuelle 25 jours pour 12 mois seulement (pas 25/12).
 * - Les droits acquis sur la période courante ne sont pas assimilés au solde
 *   disponible tant que les droits antérieurs et l'imputation des jours pris
 *   ne sont pas connus.
 */

export type DayUnit = "ouvrables" | "ouvres";

export type PeriodKind = "june-may" | "calendar" | "custom";

export type ParsedDayInput =
  | { ok: true; value: number }
  | { ok: false; reason: "empty" | "invalid" };

export type SimpleBalanceInput = {
  acquired: number;
  taken: number;
  /** Jours reportés ou crédités non déjà inclus dans `acquired`. */
  carriedOver?: number;
  /** Autres ajustements (signe inclus : positif = crédit, négatif = débit). */
  adjustments?: number;
};

export type SimpleBalanceResult = {
  remaining: number;
  acquired: number;
  taken: number;
  carriedOver: number;
  adjustments: number;
};

export type CounterSliceInput = {
  /** Solde de départ / acquis / disponible selon le libellé du compteur. */
  opening: number;
  taken: number;
  adjustments?: number;
};

export type DualCountersInput = {
  nMinus1: CounterSliceInput;
  n: CounterSliceInput;
};

export type DualCountersResult = {
  nMinus1Remaining: number;
  nRemaining: number;
  arithmeticTotal: number;
};

export type AcquisitionEstimateInput = {
  months: number;
  unit: DayUnit;
};

export type AcquisitionEstimateResult =
  | {
      ok: true;
      estimatedDays: number;
      rawDays: number;
      months: number;
      unit: DayUnit;
      capped: boolean;
      note: string;
    }
  | {
      ok: false;
      reason: "invalid-months" | "ouvres-partial";
      message: string;
    };

export type DateParts = {
  year: number;
  month: number; // 1-12
  day: number;
};

export type ReferencePeriod = {
  start: DateParts;
  end: DateParts;
  kind: PeriodKind;
  label: string;
};

export type CustomPeriodStart = {
  /** Jour de début (1-31). */
  day: number;
  /** Mois de début (1-12). */
  month: number;
};

export type PeriodAcquisitionInput = {
  periodKind: PeriodKind;
  customStart?: CustomPeriodStart;
  /** Date ISO locale YYYY-MM-DD. */
  asOfIso: string;
  unit: DayUnit;
  /** Embauche en cours de période (ISO), optionnelle. */
  hireIso?: string | null;
  /** Départ en cours de période (ISO), optionnel. */
  leaveIso?: string | null;
};

export type PeriodAcquisitionResult =
  | {
      ok: true;
      period: ReferencePeriod;
      asOf: DateParts;
      acquisitionStart: DateParts;
      acquisitionEnd: DateParts;
      completeMonths: number;
      acquisition: AcquisitionEstimateResult & { ok: true };
    }
  | {
      ok: false;
      reason:
        | "invalid-as-of"
        | "invalid-custom-period"
        | "invalid-hire"
        | "invalid-leave"
        | "inverted-window"
        | "ouvres-partial"
        | "acquisition-failed";
      message: string;
    };

export type PriorRightsStatus = "unknown" | "known";

export type PeriodBalanceInput = {
  acquisition: PeriodAcquisitionResult & { ok: true };
  priorRightsStatus: PriorRightsStatus;
  /** Droits encore disponibles de la période précédente (si known). */
  priorAvailable?: number;
  /** Jours pris imputés aux droits de la période précédente. */
  takenPrior?: number;
  /** Jours pris imputés aux droits de la période courante (y compris anticipation). */
  takenCurrent?: number;
  carriedOver?: number;
  adjustments?: number;
};

export type PeriodBalanceMethodMeta = {
  /** Valeur avant arrondi L3141-7 (après plafond éventuel). */
  rawDays: number;
  capped: boolean;
  /** Début réel d'acquisition (peut être l'embauche). */
  acquisitionStart: DateParts;
  /** True si l'acquisition commence au début de période (pas d'embauche plus tardive). */
  assumesPresentFromPeriodStart: boolean;
};

export type PeriodBalanceResult =
  | {
      kind: "acquired-only";
      acquiredCurrent: number;
      unit: DayUnit;
      completeMonths: number;
      period: ReferencePeriod;
      asOf: DateParts;
      acquisitionNote: string;
      missingForBalance: string;
      method: PeriodBalanceMethodMeta;
    }
  | {
      kind: "remaining";
      remaining: number;
      acquiredCurrent: number;
      priorAvailable: number;
      takenPrior: number;
      takenCurrent: number;
      takenTotal: number;
      carriedOver: number;
      adjustments: number;
      unit: DayUnit;
      completeMonths: number;
      period: ReferencePeriod;
      asOf: DateParts;
      acquisitionNote: string;
      method: PeriodBalanceMethodMeta;
    }
  | {
      kind: "error";
      message: string;
    };

/** Plafond légal usuel pour une année complète en jours ouvrables (L3141-3). */
export const OUVRABLES_YEARLY_CAP = 30;
/** Acquisition légale mensuelle en jours ouvrables (L3141-3 / F2258). */
export const OUVRABLES_PER_MONTH = 2.5;
/** Équivalence usuelle annuelle en jours ouvrés (pas une règle légale universelle). */
export const OUVRES_YEARLY_EQUIVALENCE = 25;

/** Message UI / moteur : pas d'estimation partielle en jours ouvrés. */
export const OUVRES_PARTIAL_MESSAGE =
  "L'estimation des jours acquis en jours ouvrés n'est pas disponible pour cette durée. Vous pouvez utiliser les compteurs de votre fiche de paie ci-dessous.";

const MAX_ABS_DAYS = 500;
const MONTH_DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function parseDayInput(raw: string): ParsedDayInput {
  const trimmed = raw.trim().replace(",", ".");
  if (trimmed === "" || trimmed === "-" || trimmed === "+" || trimmed === ".") {
    return { ok: false, reason: "empty" };
  }
  if (!/^[+-]?\d+(\.\d+)?$/.test(trimmed)) {
    return { ok: false, reason: "invalid" };
  }
  const value = Number(trimmed);
  if (!Number.isFinite(value) || Math.abs(value) > MAX_ABS_DAYS) {
    return { ok: false, reason: "invalid" };
  }
  return { ok: true, value };
}

export function parseOptionalDayInput(raw: string): ParsedDayInput {
  if (raw.trim() === "") {
    return { ok: true, value: 0 };
  }
  return parseDayInput(raw);
}

/**
 * Classe le solde de départ pour l'UI : vide ≠ 0 ≠ invalide.
 * `0` est une valeur prête à l'emploi, jamais une absence de réponse.
 */
export type OpeningBalanceClass =
  | { status: "empty" }
  | { status: "invalid" }
  | { status: "ready"; value: number };

export function classifyOpeningBalance(raw: string): OpeningBalanceClass {
  const parsed = parseDayInput(raw);
  if (parsed.ok) return { status: "ready", value: parsed.value };
  return { status: parsed.reason };
}

/**
 * Solde restant = acquis + reports créditeurs + ajustements − pris.
 * Les reports ne doivent être saisis que s'ils ne sont pas déjà dans `acquired`.
 */
export function computeSimpleBalance(input: SimpleBalanceInput): SimpleBalanceResult {
  const acquired = input.acquired;
  const taken = input.taken;
  const carriedOver = input.carriedOver ?? 0;
  const adjustments = input.adjustments ?? 0;
  return {
    remaining: roundDays(acquired + carriedOver + adjustments - taken),
    acquired,
    taken,
    carriedOver,
    adjustments,
  };
}

export function computeCounterRemaining(input: CounterSliceInput): number {
  return roundDays(input.opening - input.taken + (input.adjustments ?? 0));
}

export function computeDualCounters(input: DualCountersInput): DualCountersResult {
  const nMinus1Remaining = computeCounterRemaining(input.nMinus1);
  const nRemaining = computeCounterRemaining(input.n);
  return {
    nMinus1Remaining,
    nRemaining,
    arithmeticTotal: roundDays(nMinus1Remaining + nRemaining),
  };
}

/** Mode de recopie bulletin pour un compteur (fiche de paie). */
export type PayslipCopyMode = "acquired-taken" | "remaining";

export type PayslipCounterId = "nMinus1" | "n";

export type PayslipCounterRaw = {
  absent: boolean;
  mode: PayslipCopyMode;
  acquired: string;
  taken: string;
  remaining: string;
  /** Correction liée au parcours acquis / pris uniquement. */
  adjAcquired: string;
  /** Correction liée au parcours solde restant uniquement. */
  adjRemaining: string;
};

export type PayslipCounterReady = {
  status: "ready";
  id: PayslipCounterId;
  mode: PayslipCopyMode;
  remaining: number;
  acquired?: number;
  taken?: number;
  remainingInput?: number;
  adjustments: number;
};

export type PayslipCounterResolved =
  | { status: "absent"; id: PayslipCounterId }
  | { status: "empty"; id: PayslipCounterId }
  | { status: "incomplete"; id: PayslipCounterId; message: string }
  | { status: "invalid"; id: PayslipCounterId; message: string }
  | PayslipCounterReady;

export type PayslipBalanceResult =
  | { kind: "empty" }
  | { kind: "error"; message: string }
  | {
      kind: "ready";
      nMinus1: PayslipCounterReady | null;
      n: PayslipCounterReady | null;
      total: number;
      both: boolean;
      sole: PayslipCounterId | null;
    };

const COUNTER_LABEL: Record<PayslipCounterId, string> = {
  nMinus1: "N-1",
  n: "N",
};

/**
 * Solde d'un compteur fiche de paie selon le parcours actif.
 * Parcours « remaining » : pas de nouvelle déduction des jours pris.
 */
export function computePayslipCounterRemaining(
  input:
    | {
        mode: "acquired-taken";
        acquired: number;
        taken: number;
        adjustments?: number;
      }
    | { mode: "remaining"; remaining: number; adjustments?: number },
): number {
  if (input.mode === "acquired-taken") {
    return computeCounterRemaining({
      opening: input.acquired,
      taken: input.taken,
      adjustments: input.adjustments,
    });
  }
  return roundDays(input.remaining + (input.adjustments ?? 0));
}

export function resolvePayslipCounter(
  id: PayslipCounterId,
  raw: PayslipCounterRaw,
): PayslipCounterResolved {
  if (raw.absent) return { status: "absent", id };

  const hasAnyInput =
    raw.acquired.trim() !== "" ||
    raw.taken.trim() !== "" ||
    raw.remaining.trim() !== "" ||
    raw.adjAcquired.trim() !== "" ||
    raw.adjRemaining.trim() !== "";

  const adjRaw = raw.mode === "acquired-taken" ? raw.adjAcquired : raw.adjRemaining;
  const adjParsed = parseOptionalDayInput(adjRaw);
  if (!adjParsed.ok) {
    return {
      status: "invalid",
      id,
      message: `Saisissez une correction valide pour le compteur ${COUNTER_LABEL[id]}.`,
    };
  }

  if (raw.mode === "remaining") {
    const remTrim = raw.remaining.trim();
    if (remTrim === "") {
      if (!hasAnyInput) return { status: "empty", id };
      return {
        status: "incomplete",
        id,
        message: `Indiquez le solde restant du compteur ${COUNTER_LABEL[id]}.`,
      };
    }
    const remParsed = parseDayInput(raw.remaining);
    if (!remParsed.ok) {
      return {
        status: "invalid",
        id,
        message: `Saisissez un solde restant valide pour le compteur ${COUNTER_LABEL[id]} (0 est accepté).`,
      };
    }
    return {
      status: "ready",
      id,
      mode: "remaining",
      remaining: computePayslipCounterRemaining({
        mode: "remaining",
        remaining: remParsed.value,
        adjustments: adjParsed.value,
      }),
      remainingInput: remParsed.value,
      adjustments: adjParsed.value,
    };
  }

  const acqEmpty = raw.acquired.trim() === "";
  const takenEmpty = raw.taken.trim() === "";
  if (acqEmpty && takenEmpty) {
    if (!hasAnyInput) return { status: "empty", id };
    return {
      status: "incomplete",
      id,
      message: `Complétez le compteur ${COUNTER_LABEL[id]} : indiquez les jours acquis et les jours pris (saisissez 0 si la colonne est à zéro).`,
    };
  }
  if (acqEmpty || takenEmpty) {
    return {
      status: "incomplete",
      id,
      message: `Complétez le compteur ${COUNTER_LABEL[id]} : indiquez les jours acquis et les jours pris (saisissez 0 si la colonne est à zéro).`,
    };
  }

  const acqParsed = parseDayInput(raw.acquired);
  const takenParsed = parseDayInput(raw.taken);
  if (!acqParsed.ok || !takenParsed.ok) {
    return {
      status: "invalid",
      id,
      message: `Saisissez des nombres valides pour le compteur ${COUNTER_LABEL[id]} (0 est accepté).`,
    };
  }

  return {
    status: "ready",
    id,
    mode: "acquired-taken",
    remaining: computePayslipCounterRemaining({
      mode: "acquired-taken",
      acquired: acqParsed.value,
      taken: takenParsed.value,
      adjustments: adjParsed.value,
    }),
    acquired: acqParsed.value,
    taken: takenParsed.value,
    adjustments: adjParsed.value,
  };
}

/**
 * Agrège N et N-1 sans mélanger les parcours ni inventer un total partiel
 * lorsqu'un compteur actif est incomplet ou invalide.
 */
export function computePayslipBalance(
  nMinus1Raw: PayslipCounterRaw,
  nRaw: PayslipCounterRaw,
): PayslipBalanceResult {
  const n1 = resolvePayslipCounter("nMinus1", nMinus1Raw);
  const n = resolvePayslipCounter("n", nRaw);

  if (n1.status === "invalid") return { kind: "error", message: n1.message };
  if (n.status === "invalid") return { kind: "error", message: n.message };
  if (n1.status === "incomplete") return { kind: "error", message: n1.message };
  if (n.status === "incomplete") return { kind: "error", message: n.message };

  const n1Ready = n1.status === "ready" ? n1 : null;
  const nReady = n.status === "ready" ? n : null;

  if (!n1Ready && !nReady) return { kind: "empty" };

  if (n1Ready && nReady) {
    return {
      kind: "ready",
      nMinus1: n1Ready,
      n: nReady,
      total: roundDays(n1Ready.remaining + nReady.remaining),
      both: true,
      sole: null,
    };
  }

  const sole = n1Ready ?? nReady;
  if (!sole) return { kind: "empty" };

  return {
    kind: "ready",
    nMinus1: n1Ready,
    n: nReady,
    total: sole.remaining,
    both: false,
    sole: sole.id,
  };
}

/**
 * Estimation d'acquisition standard (hors absences particulières).
 * En jours ouvrables : 2,5 × mois, plafond 30, arrondi au jour supérieur
 * sur le total (L3141-7), pas mois par mois.
 * En jours ouvrés : uniquement l'équivalence annuelle de 25 jours pour 12 mois.
 */
export function estimateAcquisition(
  input: AcquisitionEstimateInput,
): AcquisitionEstimateResult {
  const months = input.months;
  if (!Number.isFinite(months) || months < 0 || months > 12 || !Number.isInteger(months)) {
    return {
      ok: false,
      reason: "invalid-months",
      message: "Indiquez un nombre entier de mois entre 0 et 12.",
    };
  }

  if (input.unit === "ouvres") {
    if (months !== 12) {
      return {
        ok: false,
        reason: "ouvres-partial",
        message: OUVRES_PARTIAL_MESSAGE,
      };
    }
    return {
      ok: true,
      estimatedDays: OUVRES_YEARLY_EQUIVALENCE,
      rawDays: OUVRES_YEARLY_EQUIVALENCE,
      months,
      unit: "ouvres",
      capped: false,
      note: "Équivalence usuelle de 25 jours ouvrés pour cinq semaines, sous réserve que le mode de l'employeur soit au moins aussi favorable qu'en jours ouvrables.",
    };
  }

  const raw = months * OUVRABLES_PER_MONTH;
  const cappedRaw = Math.min(raw, OUVRABLES_YEARLY_CAP);
  const estimatedDays = roundUpIfFractional(cappedRaw);
  return {
    ok: true,
    estimatedDays,
    rawDays: cappedRaw,
    months,
    unit: "ouvrables",
    capped: raw > OUVRABLES_YEARLY_CAP,
    note:
      estimatedDays !== cappedRaw
        ? "Lorsque le droit acquis n'est pas entier, la durée est portée au nombre entier immédiatement supérieur (article L3141-7)."
        : months === 12
          ? "Plafond usuel de 30 jours ouvrables pour une année complète de travail effectif."
          : "Estimation standard hors absences particulières et hors droits conventionnels supplémentaires.",
  };
}

/** Date du jour en ISO locale YYYY-MM-DD (sans dépendre du fuseau UTC). */
export function localTodayIso(now: Date = new Date()): string {
  return formatIso(toParts(now));
}

export function parseIsoDate(iso: string): DateParts | null {
  const trimmed = iso.trim();
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (!isValidDateParts(year, month, day)) return null;
  return { year, month, day };
}

export function formatIso(parts: DateParts): string {
  return `${String(parts.year).padStart(4, "0")}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
}

export function formatDateFr(parts: DateParts): string {
  return `${String(parts.day).padStart(2, "0")}/${String(parts.month).padStart(2, "0")}/${parts.year}`;
}

const MONTH_NAMES_FR = [
  "",
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

/** Date longue française, ex. « 1er juin 2026 » ou « 26 octobre 2026 ». */
export function formatDateLongFr(parts: DateParts): string {
  const month = MONTH_NAMES_FR[parts.month] ?? "";
  const day = parts.day === 1 ? "1er" : String(parts.day);
  return `${day} ${month} ${parts.year}`;
}

export function daysInMonth(year: number, month: number): number {
  if (month === 2) return isLeapYear(year) ? 29 : 28;
  return MONTH_DAYS[month] ?? 0;
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function isValidCustomPeriodStart(start: CustomPeriodStart): boolean {
  if (!Number.isInteger(start.month) || start.month < 1 || start.month > 12) {
    return false;
  }
  if (!Number.isInteger(start.day) || start.day < 1 || start.day > 31) {
    return false;
  }
  // Autoriser le 29 février comme début (années non bissextiles → 28 février).
  if (start.month === 2) return start.day <= 29;
  return start.day <= (MONTH_DAYS[start.month] ?? 0);
}

/**
 * Résout la période de référence qui contient la date de calcul
 * (ou qui se termine juste avant un début de nouvelle période).
 */
export function resolveReferencePeriod(
  asOf: DateParts,
  kind: PeriodKind,
  customStart?: CustomPeriodStart,
):
  | { ok: true; period: ReferencePeriod }
  | { ok: false; message: string } {
  if (kind === "june-may") {
    const startsThisYear = asOf.month > 6 || (asOf.month === 6 && asOf.day >= 1);
    const startYear = startsThisYear ? asOf.year : asOf.year - 1;
    const start: DateParts = { year: startYear, month: 6, day: 1 };
    const end: DateParts = { year: startYear + 1, month: 5, day: 31 };
    return {
      ok: true,
      period: {
        start,
        end,
        kind,
        label: `Du ${formatDateFr(start)} au ${formatDateFr(end)}`,
      },
    };
  }

  if (kind === "calendar") {
    const start: DateParts = { year: asOf.year, month: 1, day: 1 };
    const end: DateParts = { year: asOf.year, month: 12, day: 31 };
    return {
      ok: true,
      period: {
        start,
        end,
        kind,
        label: `Du ${formatDateFr(start)} au ${formatDateFr(end)}`,
      },
    };
  }

  if (!customStart || !isValidCustomPeriodStart(customStart)) {
    return {
      ok: false,
      message:
        "Indiquez un jour et un mois de début valides pour la période personnalisée.",
    };
  }

  const startThisYear = clampDay({
    year: asOf.year,
    month: customStart.month,
    day: customStart.day,
  });
  const startsThisYear = compareParts(asOf, startThisYear) >= 0;
  const startYear = startsThisYear ? asOf.year : asOf.year - 1;
  const start = clampDay({
    year: startYear,
    month: customStart.month,
    day: customStart.day,
  });
  const end = periodEndFromStart(start);
  return {
    ok: true,
    period: {
      start,
      end,
      kind,
      label: `Du ${formatDateFr(start)} au ${formatDateFr(end)}`,
    },
  };
}

/**
 * Nombre de mois civils complets écoulés de `from` (inclus comme début)
 * jusqu'à `to` (non inclus comme mois achevé si le jour n'est pas atteint).
 * Ex. 01/06 → 01/12 = 6 ; 01/06 → 30/11 = 5 ; 01/06 → 01/06 = 0.
 */
export function countCompleteMonthsElapsed(from: DateParts, to: DateParts): number {
  if (compareParts(to, from) <= 0) return 0;
  let months =
    (to.year - from.year) * 12 + (to.month - from.month);
  if (to.day < from.day) months -= 1;
  return Math.max(0, months);
}

/**
 * Estime les jours acquis sur la période de référence jusqu'à la date choisie.
 * Ne demande pas de date d'embauche sauf si elle est fournie (embauche en cours).
 */
export function estimatePeriodAcquisition(
  input: PeriodAcquisitionInput,
): PeriodAcquisitionResult {
  const asOf = parseIsoDate(input.asOfIso);
  if (!asOf) {
    return {
      ok: false,
      reason: "invalid-as-of",
      message: "Indiquez une date de calcul valide.",
    };
  }

  const resolved = resolveReferencePeriod(
    asOf,
    input.periodKind,
    input.customStart,
  );
  if (!resolved.ok) {
    return {
      ok: false,
      reason: "invalid-custom-period",
      message: resolved.message,
    };
  }

  let acquisitionStart = resolved.period.start;
  if (input.hireIso) {
    const hire = parseIsoDate(input.hireIso);
    if (!hire) {
      return {
        ok: false,
        reason: "invalid-hire",
        message: "Indiquez une date d'embauche valide.",
      };
    }
    if (compareParts(hire, resolved.period.end) > 0) {
      return {
        ok: false,
        reason: "invalid-hire",
        message:
          "La date d'embauche est postérieure à la fin de la période de référence.",
      };
    }
    if (compareParts(hire, acquisitionStart) > 0) {
      acquisitionStart = hire;
    }
  }

  let acquisitionEnd = asOf;
  if (compareParts(acquisitionEnd, resolved.period.end) > 0) {
    acquisitionEnd = resolved.period.end;
  }
  if (input.leaveIso) {
    const leave = parseIsoDate(input.leaveIso);
    if (!leave) {
      return {
        ok: false,
        reason: "invalid-leave",
        message: "Indiquez une date de départ valide.",
      };
    }
    if (compareParts(leave, acquisitionEnd) < 0) {
      acquisitionEnd = leave;
    }
  }

  if (compareParts(acquisitionEnd, acquisitionStart) < 0) {
    return {
      ok: false,
      reason: "inverted-window",
      message:
        "La fenêtre d'acquisition est incohérente (début postérieur à la date de calcul).",
    };
  }

  // Mois civils complets jusqu'à la date de calcul. Si la date atteint la fin
  // de période, on compte jusqu'au lendemain du dernier jour (ex. 01/06 → 31/05
  // suivant = 12 mois), sans inventer de prorata pour le mois en cours.
  const exclusiveEnd =
    compareParts(acquisitionEnd, resolved.period.end) >= 0
      ? addDays(resolved.period.end, 1)
      : acquisitionEnd;
  const completeMonths = Math.min(
    12,
    countCompleteMonthsElapsed(acquisitionStart, exclusiveEnd),
  );

  const acquisition = estimateAcquisition({
    months: completeMonths,
    unit: input.unit,
  });
  if (!acquisition.ok) {
    return {
      ok: false,
      reason:
        acquisition.reason === "ouvres-partial"
          ? "ouvres-partial"
          : "acquisition-failed",
      message: acquisition.message,
    };
  }

  return {
    ok: true,
    period: resolved.period,
    asOf,
    acquisitionStart,
    acquisitionEnd,
    completeMonths,
    acquisition,
  };
}

/**
 * Construit le résultat affiché : acquis seuls, ou solde restant si les
 * droits antérieurs et l'imputation des jours pris sont connus.
 * Aucune répartition automatique N / N-1 n'est inventée.
 */
export function computePeriodBalance(
  input: PeriodBalanceInput,
): PeriodBalanceResult {
  if (!input.acquisition.ok) {
    return { kind: "error", message: "Estimation d'acquisition indisponible." };
  }

  const acquiredCurrent = input.acquisition.acquisition.estimatedDays;
  const unit = input.acquisition.acquisition.unit;
  const method: PeriodBalanceMethodMeta = {
    rawDays: input.acquisition.acquisition.rawDays,
    capped: input.acquisition.acquisition.capped,
    acquisitionStart: input.acquisition.acquisitionStart,
    assumesPresentFromPeriodStart:
      compareParts(
        input.acquisition.acquisitionStart,
        input.acquisition.period.start,
      ) <= 0,
  };
  const baseMeta = {
    acquiredCurrent,
    unit,
    completeMonths: input.acquisition.completeMonths,
    period: input.acquisition.period,
    asOf: input.acquisition.asOf,
    acquisitionNote: input.acquisition.acquisition.note,
    method,
  };

  if (input.priorRightsStatus !== "known" || input.priorAvailable === undefined) {
    return {
      kind: "acquired-only",
      ...baseMeta,
      missingForBalance:
        "Pour estimer votre solde total, indiquez combien de jours il vous restait au début de la période (ou 0 s'il n'en restait plus).",
    };
  }

  const priorAvailable = input.priorAvailable;
  const takenPrior = input.takenPrior ?? 0;
  const takenCurrent = input.takenCurrent ?? 0;
  const carriedOver = input.carriedOver ?? 0;
  const adjustments = input.adjustments ?? 0;

  if (
    !Number.isFinite(priorAvailable) ||
    !Number.isFinite(takenPrior) ||
    !Number.isFinite(takenCurrent) ||
    !Number.isFinite(carriedOver) ||
    !Number.isFinite(adjustments)
  ) {
    return {
      kind: "error",
      message: "Saisissez des nombres valides pour les jours pris et les droits antérieurs.",
    };
  }

  const remaining = roundDays(
    priorAvailable +
      acquiredCurrent +
      carriedOver +
      adjustments -
      takenPrior -
      takenCurrent,
  );

  return {
    kind: "remaining",
    remaining,
    priorAvailable,
    takenPrior,
    takenCurrent,
    takenTotal: roundDays(takenPrior + takenCurrent),
    carriedOver,
    adjustments,
    ...baseMeta,
  };
}

export function formatDaysFr(value: number): string {
  const normalized = roundDays(value);
  const abs = Math.abs(normalized);
  const formatted = Number.isInteger(abs)
    ? String(abs)
    : abs.toLocaleString("fr-FR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
  const signed = normalized < 0 ? `−${formatted}` : formatted;
  const unit = abs === 0 || abs === 1 ? "jour" : "jours";
  return `${signed} ${unit}`;
}

export function unitLabel(unit: DayUnit): string {
  return unit === "ouvrables" ? "jours ouvrables" : "jours ouvrés";
}

function roundDays(value: number): number {
  return Math.round(value * 100) / 100;
}

/** Arrondi au jour entier supérieur si le droit n'est pas entier (L3141-7). */
function roundUpIfFractional(value: number): number {
  if (Number.isInteger(value)) return value;
  return Math.ceil(value - Number.EPSILON);
}

function toParts(date: Date): DateParts {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
}

function isValidDateParts(year: number, month: number, day: number): boolean {
  if (!Number.isInteger(year) || year < 1900 || year > 2100) return false;
  if (!Number.isInteger(month) || month < 1 || month > 12) return false;
  if (!Number.isInteger(day) || day < 1) return false;
  return day <= daysInMonth(year, month);
}

function clampDay(parts: DateParts): DateParts {
  const max = daysInMonth(parts.year, parts.month);
  return { ...parts, day: Math.min(parts.day, max) };
}

function compareParts(a: DateParts, b: DateParts): number {
  if (a.year !== b.year) return a.year - b.year;
  if (a.month !== b.month) return a.month - b.month;
  return a.day - b.day;
}

/**
 * Fin de période annuelle : veille du même jour/mois l'année suivante.
 * Si le jour de début n'existe pas l'année suivante (29 février), la fin
 * est le dernier jour valide de ce mois (28 février).
 */
function periodEndFromStart(start: DateParts): DateParts {
  const nextYear = start.year + 1;
  const dim = daysInMonth(nextYear, start.month);
  if (start.day > dim) {
    return { year: nextYear, month: start.month, day: dim };
  }
  return addDays(
    { year: nextYear, month: start.month, day: start.day },
    -1,
  );
}

function addDays(parts: DateParts, delta: number): DateParts {
  // Calcul civil via timestamp UTC midi pour éviter les bascules DST.
  const utc = Date.UTC(parts.year, parts.month - 1, parts.day, 12, 0, 0);
  const next = new Date(utc + delta * 86_400_000);
  return {
    year: next.getUTCFullYear(),
    month: next.getUTCMonth() + 1,
    day: next.getUTCDate(),
  };
}
