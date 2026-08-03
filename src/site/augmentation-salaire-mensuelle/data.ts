import {
  getProfileCoefficient,
  getProfileLabel,
} from "@/site/salary-calculator/config";
import { monthlyToAnnual, roundCent } from "@/site/salary-calculator/conversions";
import { formatCurrency } from "@/site/salary-calculator/parsing";
import type { EmploymentProfile } from "@/site/salary-calculator/types";
import {
  MONTHLY_INCREASE_DEFAULT_PROFILE,
  MONTHLY_INCREASE_PROFILES,
  MONTHLY_INCREASE_SALARY_MONTHS,
} from "./config";

/** Libellé court sans décimales inutiles (ex. 50 €). */
export function formatIncreaseShort(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function estimateNetMonthlyGainFromGrossIncrease(
  grossMonthlyIncrease: number,
  profile: EmploymentProfile = MONTHLY_INCREASE_DEFAULT_PROFILE,
): number {
  return roundCent(grossMonthlyIncrease * getProfileCoefficient(profile));
}

export interface MonthlyIncreaseEstimate {
  grossMonthlyIncrease: number;
  profile: EmploymentProfile;
  profileLabel: string;
  coefficient: number;
  netMonthlyGain: number;
  netAnnualGain: number;
}

export function buildMonthlyIncreaseEstimate(
  grossMonthlyIncrease: number,
  profile: EmploymentProfile = MONTHLY_INCREASE_DEFAULT_PROFILE,
): MonthlyIncreaseEstimate {
  const netMonthlyGain = estimateNetMonthlyGainFromGrossIncrease(grossMonthlyIncrease, profile);
  return {
    grossMonthlyIncrease,
    profile,
    profileLabel: getProfileLabel(profile),
    coefficient: getProfileCoefficient(profile),
    netMonthlyGain,
    netAnnualGain: roundCent(monthlyToAnnual(netMonthlyGain, MONTHLY_INCREASE_SALARY_MONTHS)),
  };
}

export function buildAllProfileIncreaseEstimates(grossMonthlyIncrease: number): Record<
  (typeof MONTHLY_INCREASE_PROFILES)[number],
  MonthlyIncreaseEstimate
> {
  return {
    nonExecutive: buildMonthlyIncreaseEstimate(grossMonthlyIncrease, "nonExecutive"),
    executive: buildMonthlyIncreaseEstimate(grossMonthlyIncrease, "executive"),
    publicService: buildMonthlyIncreaseEstimate(grossMonthlyIncrease, "publicService"),
  };
}

export interface IncreaseComparisonRow {
  grossMonthlyIncrease: number;
  nonExecutive: number;
  executive: number;
  publicService: number;
  isCurrent: boolean;
}

/** Tableau autour du montant cible (25, 50, 75, 100 pour la fiche 50 € ; jamais 0 €). */
export function buildIncreaseComparisonRows(
  grossMonthlyIncrease: number,
): IncreaseComparisonRow[] {
  const offsets =
    grossMonthlyIncrease === 50
      ? [25, 50, 75, 100]
      : [
          grossMonthlyIncrease - 50,
          grossMonthlyIncrease - 25,
          grossMonthlyIncrease,
          grossMonthlyIncrease + 25,
          grossMonthlyIncrease + 50,
        ].filter((value) => value > 0);

  return offsets.map((gross) => ({
    grossMonthlyIncrease: gross,
    nonExecutive: estimateNetMonthlyGainFromGrossIncrease(gross, "nonExecutive"),
    executive: estimateNetMonthlyGainFromGrossIncrease(gross, "executive"),
    publicService: estimateNetMonthlyGainFromGrossIncrease(gross, "publicService"),
    isCurrent: gross === grossMonthlyIncrease,
  }));
}

export function formatEuroAmount(value: number): string {
  return formatCurrency(Math.round(value)).replace(",00", "");
}
