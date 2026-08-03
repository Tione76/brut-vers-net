import type { EmploymentProfile } from "@/site/salary-calculator/types";
import { CALCULATOR_GROSS_QUERY_PARAM } from "@/site/salaire-net-brut/config";
import { profileToQueryParam } from "@/site/salaire-net-brut/prefill";

export function buildCalculatorGrossPrefillHref(
  grossMonthly: number,
  profile: EmploymentProfile,
): string {
  const amount = Number.isFinite(grossMonthly) ? Math.round(grossMonthly * 100) / 100 : 0;
  const params = new URLSearchParams({
    [CALCULATOR_GROSS_QUERY_PARAM]: String(amount),
    profil: profileToQueryParam(profile),
  });
  return `/?${params.toString()}`;
}
