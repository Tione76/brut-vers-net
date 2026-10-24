import { formatCurrency } from "@/site/salary-calculator";
import type { SalaryMonths } from "@/site/salary-calculator/types";
import { formatPercentFr } from "./format-percent";
import type {
  IncreaseReferenceField,
  IncreaseType,
  SalaryIncreaseResult,
} from "./types";

export type ComparisonPeriod = "monthly" | "annual";

export type ComparisonRow = {
  period: ComparisonPeriod;
  before: number;
  after: number;
};

export type ComparisonGroup = {
  id: "net" | "gross";
  label: string;
  shortLabel: string;
  rows: ComparisonRow[];
};

/**
 * Tableau Avant / Après : montants issus du moteur (mensuels et annuels déjà
 * calculés selon le nombre de mois rémunérés).
 */
export function buildComparisonGroups(result: SalaryIncreaseResult): ComparisonGroup[] {
  return [
    {
      id: "net",
      label: "Salaire net",
      shortLabel: "net",
      rows: [
        {
          period: "monthly",
          before: result.before.netMonthly,
          after: result.after.netMonthly,
        },
        {
          period: "annual",
          before: result.before.netAnnual,
          after: result.after.netAnnual,
        },
      ],
    },
    {
      id: "gross",
      label: "Salaire brut",
      shortLabel: "brut",
      rows: [
        {
          period: "monthly",
          before: result.before.grossMonthly,
          after: result.after.grossMonthly,
        },
        {
          period: "annual",
          before: result.before.grossAnnual,
          after: result.after.grossAnnual,
        },
      ],
    },
  ];
}

export function formatSignedCurrency(value: number): string {
  return value > 0 ? `+${formatCurrency(value)}` : formatCurrency(value);
}

export function buildAnnualFootnote(salaryMonths: SalaryMonths): string {
  return `* Projection annuelle calculée sur ${salaryMonths} mois de rémunération.`;
}

export function buildIncreaseBadge(
  result: SalaryIncreaseResult,
  increaseType: IncreaseType,
  increaseValue: string,
): string | null {
  if (increaseType === "percent") {
    const trimmed = increaseValue.trim().replace(".", ",");
    if (!trimmed) {
      return `+${formatPercentFr(result.percentGain.gross)} d'augmentation`;
    }
    const withSymbol = /%$/.test(trimmed) ? trimmed : `${trimmed}\u00a0%`;
    return `+${withSymbol} d'augmentation`;
  }

  if (result.gain.grossMonthly <= 0) {
    return null;
  }

  return `${formatSignedCurrency(result.gain.grossMonthly)} brut / mois`;
}

export function buildGainAnnouncement(result: SalaryIncreaseResult): string {
  return `Gain mensuel estimé : ${formatSignedCurrency(result.gain.netMonthly)} net avant prélèvement à la source, soit ${formatSignedCurrency(result.gain.grossMonthly)} brut. Nouveau salaire net mensuel : ${formatCurrency(result.after.netMonthly)}.`;
}

export function describeIncreaseInput(
  increaseType: IncreaseType,
  increaseReferenceField: IncreaseReferenceField | null,
  increaseValue: string,
  result: SalaryIncreaseResult,
): string {
  if (increaseType === "percent") {
    const trimmed = increaseValue.trim().replace(".", ",");
    const label = trimmed
      ? (/%$/.test(trimmed) ? trimmed : `${trimmed} %`)
      : formatPercentFr(result.percentGain.gross);
    return `${label} du salaire brut`;
  }

  if (increaseReferenceField === "grossAnnualIncrease") {
    return `${formatCurrency(result.gain.grossAnnual)} brut par an`;
  }

  return `${formatCurrency(result.gain.grossMonthly)} brut par mois`;
}
