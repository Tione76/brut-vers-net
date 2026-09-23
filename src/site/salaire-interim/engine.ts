/**
 * Moteur de calcul du salaire en intérim (IFM + ICCP + net estimé).
 *
 * Formules (cas général) :
 * - IFM = brut de mission × taux IFM (10 % par défaut ; autre taux via mode conventionnel)
 * - ICCP = (brut de mission + IFM) × taux ICCP (minimum légal 10 %)
 * - Total brut = brut de mission + IFM + ICCP (= × 1,21 si IFM 10 % + ICCP 10 %)
 *
 * Net : moteur central `@/site/salary-calculator` (coefficient profil).
 * Affichage page : arrondi à l'euro le plus proche (indicatif).
 * Arrondi des bruts : chaque composante monétaire au centime via `roundCent`.
 */

import {
  calculateSalary,
  roundCent,
  type EmploymentProfile,
} from "@/site/salary-calculator";
import { LEGAL_MAJORATION_GROUP1, LEGAL_MAJORATION_GROUP2 } from "@/site/overtime-salary-calculator/config";

export const INTERIM_DEFAULT_IFM_RATE_PERCENT = 10;
export const INTERIM_DEFAULT_ICCP_RATE_PERCENT = 10;
/** Taux d'IFM du cas général (pas un plancher absolu hors mode conventionnel). */
export const INTERIM_GENERAL_IFM_RATE_PERCENT = 10;
/** Minimum légal pour l'ICCP. */
export const INTERIM_MIN_ICCP_RATE_PERCENT = 10;
export const INTERIM_DEFAULT_PROFILE: EmploymentProfile = "nonExecutive";

export const INTERIM_MAX_HOURLY_RATE = 500;
export const INTERIM_MAX_HOURS = 400;
export const INTERIM_MAX_GROSS = 100_000;
export const INTERIM_MAX_RATE_PERCENT = 50;

/** @deprecated Alias du taux général 10 % ; ne pas utiliser comme plancher absolu. */
export const INTERIM_MIN_IFM_RATE_PERCENT = INTERIM_GENERAL_IFM_RATE_PERCENT;

export type InterimInputMode = "hourly" | "missionGross";

export type InterimCalculationInput = {
  mode: InterimInputMode;
  hourlyRate?: number;
  normalHours?: number;
  overtimeHours25?: number;
  overtimeHours50?: number;
  otherGrossElements?: number;
  missionGross?: number;
  ifmDue: boolean;
  /**
   * Active le taux d'IFM saisi (contrat / convention).
   * Sans activation : le cas général à 10 % s'applique.
   */
  ifmCustomRateEnabled?: boolean;
  ifmRatePercent: number;
  iccpRatePercent: number;
  expenseReimbursements?: number;
  profile?: EmploymentProfile;
};

export type InterimCalculationResult = {
  missionGross: number;
  normalHoursGross: number;
  overtime25Gross: number;
  overtime50Gross: number;
  otherGrossElements: number;
  ifmDue: boolean;
  ifmCustomRateEnabled: boolean;
  ifmRatePercent: number;
  ifmAmount: number;
  iccpRatePercent: number;
  iccpBase: number;
  iccpAmount: number;
  totalGross: number;
  grossMultiplier: number;
  netEstimated: number;
  netEstimatedRounded: number;
  expenseReimbursements: number;
  estimatedPayoutWithExpenses: number;
  profile: EmploymentProfile;
  majoration25Percent: number;
  majoration50Percent: number;
};

export type InterimParseResult =
  | { ok: true; value: number }
  | { ok: false; error: string };

export function parseInterimNumber(raw: string): number | null {
  const normalized = raw.trim().replace(/\s/g, "").replace(",", ".");
  if (!normalized) return null;
  if (!/^\d+(\.\d+)?$/.test(normalized)) return null;
  const value = Number(normalized);
  if (!Number.isFinite(value)) return null;
  return value;
}

export function validateNonNegative(
  value: number | null,
  label: string,
  max: number,
): InterimParseResult {
  if (value === null) {
    return { ok: false, error: `Indiquez ${label} (nombre positif).` };
  }
  if (value < 0) {
    return { ok: false, error: `${label} ne peut pas être négatif.` };
  }
  if (value > max) {
    return { ok: false, error: `${label} dépasse la borne autorisée.` };
  }
  return { ok: true, value };
}

/**
 * Valide le taux d'IFM.
 * - Sans IFM : taux ignoré.
 * - Cas général (mode conventionnel inactif) : 10 % uniquement.
 * - Mode conventionnel : tout taux strictement positif jusqu'à la borne max.
 */
export function validateIfmRatePercent(
  rate: number | null,
  ifmDue: boolean,
  customRateEnabled = false,
): InterimParseResult {
  if (!ifmDue) {
    return { ok: true, value: INTERIM_DEFAULT_IFM_RATE_PERCENT };
  }
  if (!customRateEnabled) {
    if (rate !== null && rate !== INTERIM_GENERAL_IFM_RATE_PERCENT) {
      return {
        ok: false,
        error:
          "Activez le taux prévu par votre contrat ou convention pour saisir un taux d'IFM différent de 10\u00a0%.",
      };
    }
    return { ok: true, value: INTERIM_GENERAL_IFM_RATE_PERCENT };
  }
  if (rate === null) {
    return { ok: false, error: "Indiquez le taux de l'IFM (nombre valide)." };
  }
  if (rate <= 0) {
    return {
      ok: false,
      error: "Le taux d'IFM doit être strictement positif.",
    };
  }
  if (rate > INTERIM_MAX_RATE_PERCENT) {
    return { ok: false, error: "Le taux d'IFM dépasse la borne autorisée." };
  }
  return { ok: true, value: rate };
}

/** Valide le taux d'ICCP (minimum légal 10 %). Pas de correction silencieuse. */
export function validateIccpRatePercent(rate: number | null): InterimParseResult {
  if (rate === null) {
    return {
      ok: false,
      error: "Indiquez le taux de l'indemnité de congés payés (nombre valide).",
    };
  }
  if (rate < INTERIM_MIN_ICCP_RATE_PERCENT) {
    return {
      ok: false,
      error: `L'indemnité compensatrice de congés payés ne peut pas être inférieure à ${INTERIM_MIN_ICCP_RATE_PERCENT}\u00a0% (minimum légal).`,
    };
  }
  if (rate > INTERIM_MAX_RATE_PERCENT) {
    return {
      ok: false,
      error: "Le taux de l'indemnité de congés payés dépasse la borne autorisée.",
    };
  }
  return { ok: true, value: rate };
}

export function computeMissionGrossFromHours(input: {
  hourlyRate: number;
  normalHours: number;
  overtimeHours25: number;
  overtimeHours50: number;
  otherGrossElements: number;
}): {
  missionGross: number;
  normalHoursGross: number;
  overtime25Gross: number;
  overtime50Gross: number;
} {
  const normalHoursGross = roundCent(input.hourlyRate * input.normalHours);
  const overtime25Gross = roundCent(
    input.hourlyRate * input.overtimeHours25 * (1 + LEGAL_MAJORATION_GROUP1 / 100),
  );
  const overtime50Gross = roundCent(
    input.hourlyRate * input.overtimeHours50 * (1 + LEGAL_MAJORATION_GROUP2 / 100),
  );
  const missionGross = roundCent(
    normalHoursGross +
      overtime25Gross +
      overtime50Gross +
      roundCent(input.otherGrossElements),
  );
  return { missionGross, normalHoursGross, overtime25Gross, overtime50Gross };
}

export function computeIfmAmount(
  missionGross: number,
  ifmDue: boolean,
  ifmRatePercent: number,
): number {
  if (!ifmDue || missionGross <= 0) return 0;
  return roundCent(missionGross * (ifmRatePercent / 100));
}

export function computeIccpAmount(
  missionGross: number,
  ifmAmount: number,
  iccpRatePercent: number,
): number {
  const base = roundCent(missionGross + ifmAmount);
  return roundCent(base * (iccpRatePercent / 100));
}

export function estimateInterimNet(
  totalGross: number,
  profile: EmploymentProfile = INTERIM_DEFAULT_PROFILE,
): number | null {
  if (!Number.isFinite(totalGross) || totalGross < 0) return null;
  const result = calculateSalary({
    activeInput: "grossMonthly",
    activeValue: String(totalGross).replace(".", ","),
    profile,
    workTimePercent: 100,
    salaryMonths: 12,
    withholdingTaxRate: 0,
  });
  return result?.netMonthly ?? null;
}

export function calculateInterimSalary(
  input: InterimCalculationInput,
): InterimCalculationResult | null {
  const profile = input.profile ?? INTERIM_DEFAULT_PROFILE;
  const ifmCustomRateEnabled = Boolean(input.ifmCustomRateEnabled);

  const ifmCheck = validateIfmRatePercent(
    input.ifmRatePercent,
    input.ifmDue,
    ifmCustomRateEnabled,
  );
  if (!ifmCheck.ok) return null;
  const iccpCheck = validateIccpRatePercent(input.iccpRatePercent);
  if (!iccpCheck.ok) return null;

  const ifmRatePercent = ifmCheck.value;
  const iccpRatePercent = iccpCheck.value;

  let missionGross = 0;
  let normalHoursGross = 0;
  let overtime25Gross = 0;
  let overtime50Gross = 0;
  let otherGrossElements = 0;

  if (input.mode === "hourly") {
    const hourlyRate = input.hourlyRate ?? NaN;
    const normalHours = input.normalHours ?? 0;
    const overtimeHours25 = input.overtimeHours25 ?? 0;
    const overtimeHours50 = input.overtimeHours50 ?? 0;
    otherGrossElements = input.otherGrossElements ?? 0;

    if (
      !Number.isFinite(hourlyRate) ||
      hourlyRate <= 0 ||
      hourlyRate > INTERIM_MAX_HOURLY_RATE
    ) {
      return null;
    }
    for (const hours of [normalHours, overtimeHours25, overtimeHours50]) {
      if (!Number.isFinite(hours) || hours < 0 || hours > INTERIM_MAX_HOURS) {
        return null;
      }
    }
    if (
      !Number.isFinite(otherGrossElements) ||
      otherGrossElements < 0 ||
      otherGrossElements > INTERIM_MAX_GROSS
    ) {
      return null;
    }

    const parts = computeMissionGrossFromHours({
      hourlyRate,
      normalHours,
      overtimeHours25,
      overtimeHours50,
      otherGrossElements,
    });
    missionGross = parts.missionGross;
    normalHoursGross = parts.normalHoursGross;
    overtime25Gross = parts.overtime25Gross;
    overtime50Gross = parts.overtime50Gross;
  } else {
    missionGross = input.missionGross ?? NaN;
    if (
      !Number.isFinite(missionGross) ||
      missionGross < 0 ||
      missionGross > INTERIM_MAX_GROSS
    ) {
      return null;
    }
    missionGross = roundCent(missionGross);
  }

  const expenseReimbursements = roundCent(
    Math.max(0, input.expenseReimbursements ?? 0),
  );
  if (expenseReimbursements > INTERIM_MAX_GROSS) {
    return null;
  }

  const ifmAmount = computeIfmAmount(missionGross, input.ifmDue, ifmRatePercent);
  const iccpBase = roundCent(missionGross + ifmAmount);
  const iccpAmount = computeIccpAmount(missionGross, ifmAmount, iccpRatePercent);
  const totalGross = roundCent(missionGross + ifmAmount + iccpAmount);
  const grossMultiplier =
    missionGross > 0 ? roundCent((totalGross / missionGross) * 100) / 100 : 0;

  const netEstimated = estimateInterimNet(totalGross, profile);
  if (netEstimated === null) {
    return null;
  }

  const netEstimatedRounded = Math.round(netEstimated);

  return {
    missionGross,
    normalHoursGross,
    overtime25Gross,
    overtime50Gross,
    otherGrossElements: roundCent(otherGrossElements),
    ifmDue: input.ifmDue,
    ifmCustomRateEnabled: input.ifmDue ? ifmCustomRateEnabled : false,
    ifmRatePercent: input.ifmDue ? ifmRatePercent : 0,
    ifmAmount,
    iccpRatePercent,
    iccpBase,
    iccpAmount,
    totalGross,
    grossMultiplier,
    netEstimated,
    netEstimatedRounded,
    expenseReimbursements,
    estimatedPayoutWithExpenses: roundCent(
      netEstimatedRounded + expenseReimbursements,
    ),
    profile,
    majoration25Percent: LEGAL_MAJORATION_GROUP1,
    majoration50Percent: LEGAL_MAJORATION_GROUP2,
  };
}
