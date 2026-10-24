import { formatCurrency, roundCent } from "@/site/salary-calculator";
import type { OvertimeSalaryResult } from "./types";

/**
 * Projection annuelle : même convention que le moteur pour ses projections
 * (montant mensuel arrondi au centime × nombre de mois), sur 12 mois, sans
 * treizième mois ni prime.
 */
export const ANNUAL_PROJECTION_MONTHS = 12;

export function projectAnnual(monthly: number): number {
  return roundCent(monthly * ANNUAL_PROJECTION_MONTHS);
}

export type ComparisonPeriod = "monthly" | "annual";

export type ComparisonRow = {
  period: ComparisonPeriod;
  before: number;
  after: number;
};

export type ComparisonGroup = {
  id: "net" | "gross";
  /** Libellé complet : « Salaire net », « Salaire brut ». */
  label: string;
  /** Partie courte conservée visuellement sur les petites largeurs. */
  shortLabel: string;
  rows: ComparisonRow[];
};

export function buildComparisonGroups(result: OvertimeSalaryResult): ComparisonGroup[] {
  return [
    {
      id: "net",
      label: "Salaire net",
      shortLabel: "net",
      rows: [
        { period: "monthly", before: result.baseNetMonthly, after: result.newNetMonthly },
        {
          period: "annual",
          before: projectAnnual(result.baseNetMonthly),
          after: projectAnnual(result.newNetMonthly),
        },
      ],
    },
    {
      id: "gross",
      label: "Salaire brut",
      shortLabel: "brut",
      rows: [
        { period: "monthly", before: result.baseGrossMonthly, after: result.newGrossMonthly },
        {
          period: "annual",
          before: projectAnnual(result.baseGrossMonthly),
          after: projectAnnual(result.newGrossMonthly),
        },
      ],
    },
  ];
}

export function formatSignedCurrency(value: number): string {
  return value > 0 ? `+${formatCurrency(value)}` : formatCurrency(value);
}

export function formatHours(hours: number): string {
  return `${hours.toLocaleString("fr-FR", { maximumFractionDigits: 2 })}\u00a0h`;
}

export function formatOvertimeHoursBadge(hours: number): string {
  return `${formatHours(hours)} ${hours >= 2 ? "supplémentaires" : "supplémentaire"}`;
}

export function buildGainAnnouncement(result: OvertimeSalaryResult): string {
  return `Gain mensuel estimé : ${formatSignedCurrency(result.overtimeNetGain)} net, soit ${formatSignedCurrency(result.overtimeGrossTotal)} brut. Nouveau salaire net mensuel : ${formatCurrency(result.newNetMonthly)}.`;
}
