import type { EmploymentProfile } from "@/site/salary-calculator/types";

/** Paramètres URL du calculateur principal (préremplissage). */
export const CALCULATOR_NET_QUERY_PARAM = "net";
export const CALCULATOR_PROFILE_QUERY_PARAM = "profil";

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

export function profileToQueryParam(profile: EmploymentProfile): string {
  return PROFILE_TO_QUERY[profile];
}

export function parseProfileQueryParam(raw: string | null): EmploymentProfile | null {
  if (!raw) {
    return null;
  }
  return QUERY_TO_PROFILE[raw] ?? null;
}

export function buildCalculatorNetPrefillHref(
  netMonthly: number,
  profile: EmploymentProfile,
): string {
  const amount = Number.isFinite(netMonthly) ? Math.round(netMonthly * 100) / 100 : 0;
  const params = new URLSearchParams({
    [CALCULATOR_NET_QUERY_PARAM]: String(amount),
    [CALCULATOR_PROFILE_QUERY_PARAM]: profileToQueryParam(profile),
  });
  return `/?${params.toString()}`;
}
