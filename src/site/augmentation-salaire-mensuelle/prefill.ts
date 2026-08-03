import type { EmploymentProfile } from "@/site/salary-calculator/types";
import { MONTHLY_INCREASE_CALCULATOR_PATH } from "./config";

/** Paramètres URL du calculateur d'augmentation (préremplissage). */
export const INCREASE_QUERY_PARAM = "augmentation";
export const INCREASE_PROFILE_QUERY_PARAM = "profil";

const PROFILE_TO_QUERY: Record<EmploymentProfile, string> = {
  nonExecutive: "non-cadre",
  executive: "cadre",
  publicService: "fonction-publique",
};

const QUERY_TO_PROFILE: Record<string, EmploymentProfile> = {
  "non-cadre": "nonExecutive",
  cadre: "executive",
  "fonction-publique": "publicService",
  nonExecutive: "nonExecutive",
  executive: "executive",
  publicService: "publicService",
};

export function profileToIncreaseQueryParam(profile: EmploymentProfile): string {
  return PROFILE_TO_QUERY[profile];
}

export function parseIncreaseProfileQueryParam(raw: string | null): EmploymentProfile | null {
  if (!raw) {
    return null;
  }
  return QUERY_TO_PROFILE[raw] ?? null;
}

export function buildIncreaseCalculatorPrefillHref(
  grossMonthlyIncrease: number,
  profile: EmploymentProfile,
): string {
  const amount = Number.isFinite(grossMonthlyIncrease)
    ? Math.round(grossMonthlyIncrease * 100) / 100
    : 0;
  const params = new URLSearchParams({
    [INCREASE_QUERY_PARAM]: String(amount),
    [INCREASE_PROFILE_QUERY_PARAM]: profileToIncreaseQueryParam(profile),
  });
  return `${MONTHLY_INCREASE_CALCULATOR_PATH}?${params.toString()}`;
}
