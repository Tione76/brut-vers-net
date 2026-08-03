import {
  getProfileCoefficient,
  getProfileLabel,
} from "@/site/salary-calculator/config";
import { monthlyToAnnual, roundCent } from "@/site/salary-calculator/conversions";
import type { EmploymentProfile } from "@/site/salary-calculator/types";
import {
  GROSS_TO_NET_DEFAULT_PROFILE,
  GROSS_TO_NET_PROFILES,
  GROSS_TO_NET_SALARY_MONTHS,
} from "./config";

/** Libellé court sans décimales inutiles (ex. 1 000 €). */
export function formatGrossShort(grossMonthly: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(grossMonthly);
}

export function estimateNetMonthlyFromGross(
  grossMonthly: number,
  profile: EmploymentProfile = GROSS_TO_NET_DEFAULT_PROFILE,
): number {
  return roundCent(grossMonthly * getProfileCoefficient(profile));
}

export interface GrossToNetEstimate {
  grossMonthly: number;
  profile: EmploymentProfile;
  profileLabel: string;
  coefficient: number;
  netMonthly: number;
  netAnnual: number;
}

export function buildGrossToNetEstimate(
  grossMonthly: number,
  profile: EmploymentProfile = GROSS_TO_NET_DEFAULT_PROFILE,
): GrossToNetEstimate {
  const netMonthly = estimateNetMonthlyFromGross(grossMonthly, profile);
  return {
    grossMonthly,
    profile,
    profileLabel: getProfileLabel(profile),
    coefficient: getProfileCoefficient(profile),
    netMonthly,
    netAnnual: roundCent(monthlyToAnnual(netMonthly, GROSS_TO_NET_SALARY_MONTHS)),
  };
}

export function buildAllProfileNetEstimates(grossMonthly: number): Record<
  (typeof GROSS_TO_NET_PROFILES)[number],
  GrossToNetEstimate
> {
  return {
    nonExecutive: buildGrossToNetEstimate(grossMonthly, "nonExecutive"),
    executive: buildGrossToNetEstimate(grossMonthly, "executive"),
    publicService: buildGrossToNetEstimate(grossMonthly, "publicService"),
  };
}

export interface GrossToNetComparisonRow {
  grossMonthly: number;
  nonExecutive: number;
  executive: number;
  publicService: number;
  isCurrent: boolean;
}

/** Tableau autour du montant cible (900…1 100 pour la fiche 1 000 € ; jamais 0 €). */
export function buildGrossToNetComparisonRows(
  grossMonthly: number,
): GrossToNetComparisonRow[] {
  const offsets =
    grossMonthly === 1000
      ? [900, 950, 1000, 1050, 1100]
      : [
          grossMonthly - 100,
          grossMonthly - 50,
          grossMonthly,
          grossMonthly + 50,
          grossMonthly + 100,
        ].filter((value) => value > 0);

  return offsets.map((gross) => ({
    grossMonthly: gross,
    nonExecutive: estimateNetMonthlyFromGross(gross, "nonExecutive"),
    executive: estimateNetMonthlyFromGross(gross, "executive"),
    publicService: estimateNetMonthlyFromGross(gross, "publicService"),
    isCurrent: gross === grossMonthly,
  }));
}

export function formatEuroAmount(value: number): string {
  return formatGrossShort(Math.round(value));
}
