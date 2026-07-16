import {
  WORK_TIME_PERCENT,
  calculateSalary,
  formatCurrency,
  getProfileCoefficient,
  parseFrenchNumber,
  parseSalaryAmount,
  roundCent,
} from "@/site/salary-calculator";
import type { EmploymentProfile } from "@/site/salary-calculator/types";
import {
  LEGAL_MAJORATION_GROUP1,
  LEGAL_MAJORATION_GROUP2,
  MONTHLY_HOURS_REFERENCE,
} from "./config";
import { estimateOvertimeContributionRelief } from "./overtime/2026/contribution-relief";
import type {
  OvertimeGroupBreakdown,
  OvertimeSalaryInput,
  OvertimeSalaryReferenceField,
  OvertimeSalaryResult,
} from "./types";
import { getPrimaryValidationError, parseOvertimeHours } from "./validation";

function grossMonthlyToInputValue(grossMonthly: number): string {
  return grossMonthly.toFixed(2).replace(".", ",");
}

export function monthlyToHourlyGross(monthly: number): number {
  return monthly / MONTHLY_HOURS_REFERENCE;
}

export function hourlyToMonthlyGross(hourly: number): number {
  return hourly * MONTHLY_HOURS_REFERENCE;
}

export function resolveGrossMonthlyFromReference(
  referenceField: OvertimeSalaryReferenceField,
  salaryValue: string,
  profile: EmploymentProfile,
): number | null {
  const parsed = parseSalaryAmount(salaryValue);
  if (parsed === null || parsed <= 0) {
    return null;
  }

  if (referenceField === "grossMonthly") {
    return roundCent(parsed);
  }

  if (referenceField === "grossHourly") {
    return roundCent(hourlyToMonthlyGross(parsed));
  }

  const fromNet = calculateSalary({
    activeInput: "netMonthly",
    activeValue: salaryValue.trim(),
    profile,
    workTimePercent: WORK_TIME_PERCENT.default,
    salaryMonths: 12,
    withholdingTaxRate: 0,
  });

  return fromNet ? fromNet.grossMonthly : null;
}

function resolveMajorationPercents(input: OvertimeSalaryInput): {
  group1: number;
  group2: number;
} | null {
  if (input.majorationMode === "legal") {
    return {
      group1: LEGAL_MAJORATION_GROUP1,
      group2: LEGAL_MAJORATION_GROUP2,
    };
  }

  const group1 = parseFrenchNumber(input.majorationGroup1Percent);
  const group2 = parseFrenchNumber(input.majorationGroup2Percent);
  if (group1 === null || group2 === null) {
    return null;
  }

  return { group1, group2 };
}

function buildGroupBreakdown(
  hours: number,
  majorationPercent: number,
  hourlyGrossBase: number,
): OvertimeGroupBreakdown {
  const hourlyValue = roundCent(hourlyGrossBase * (1 + majorationPercent / 100));
  const gross = roundCent(hours * hourlyGrossBase * (1 + majorationPercent / 100));

  return {
    hours,
    majorationPercent,
    hourlyValue,
    gross,
  };
}

function formatPercentFr(value: number): string {
  const formatted = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
  return `${formatted} %`;
}

function formatHoursFr(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 0,
    maximumFractionDigits: 2,
  }).format(value);
}

function buildSummaryBrief(
  group1: OvertimeGroupBreakdown,
  group2: OvertimeGroupBreakdown,
  overtimeHoursTotal: number,
  baseNetMonthly: number,
  newNetMonthly: number,
): string {
  const parts: string[] = [];
  if (group1.hours > 0) {
    parts.push(
      `${formatHoursFr(group1.hours)} majorée${group1.hours > 1 ? "s" : ""} à ${formatPercentFr(group1.majorationPercent)}`,
    );
  }
  if (group2.hours > 0) {
    parts.push(
      `${formatHoursFr(group2.hours)} majorée${group2.hours > 1 ? "s" : ""} à ${formatPercentFr(group2.majorationPercent)}`,
    );
  }

  const detail = parts.length > 0 ? `, dont ${parts.join(" et ")}` : "";

  return `Avec ${formatHoursFr(overtimeHoursTotal)} heure${overtimeHoursTotal > 1 ? "s" : ""} supplémentaire${overtimeHoursTotal > 1 ? "s" : ""} sur le mois${detail}, votre salaire net mensuel estimé passerait de ${formatCurrency(baseNetMonthly)} à ${formatCurrency(newNetMonthly)} avant prélèvement à la source.`;
}

export function calculateOvertimeSalary(
  input: OvertimeSalaryInput,
): OvertimeSalaryResult | null {
  if (getPrimaryValidationError(input)) {
    return null;
  }

  if (!input.referenceField) {
    return null;
  }

  const baseGrossMonthly = resolveGrossMonthlyFromReference(
    input.referenceField,
    input.salaryValue,
    input.profile,
  );
  if (baseGrossMonthly === null) {
    return null;
  }

  const hours1 = parseOvertimeHours(input.group1Hours);
  const hours2 = parseOvertimeHours(input.group2Hours);
  if (hours1 === null || hours2 === null) {
    return null;
  }

  const majorations = resolveMajorationPercents(input);
  if (!majorations) {
    return null;
  }

  const hourlyGrossBase = roundCent(monthlyToHourlyGross(baseGrossMonthly));

  const group1 = buildGroupBreakdown(hours1, majorations.group1, hourlyGrossBase);
  const group2 = buildGroupBreakdown(hours2, majorations.group2, hourlyGrossBase);

  // Recalcule le total brut à partir des heures et du taux non arrondi pour coller
  // à l'exemple Urssaf (12,50 × 1,25 × 10 = 156,25 exactement).
  const overtimeGrossTotal = roundCent(
    hours1 * hourlyGrossBase * (1 + majorations.group1 / 100) +
      hours2 * hourlyGrossBase * (1 + majorations.group2 / 100),
  );

  const contributionRelief = estimateOvertimeContributionRelief(overtimeGrossTotal);
  const coefficient = getProfileCoefficient(input.profile);
  const overtimeNetGain = roundCent(overtimeGrossTotal * coefficient + contributionRelief);

  const baseSalary = calculateSalary({
    activeInput: "grossMonthly",
    activeValue: grossMonthlyToInputValue(baseGrossMonthly),
    profile: input.profile,
    workTimePercent: WORK_TIME_PERCENT.default,
    salaryMonths: 12,
    withholdingTaxRate: 0,
  });

  if (!baseSalary) {
    return null;
  }

  const newGrossMonthly = roundCent(baseGrossMonthly + overtimeGrossTotal);
  const newNetMonthly = roundCent(baseSalary.netMonthly + overtimeNetGain);

  const projectionMonths =
    input.projectionMode === "thisMonth" ? 1 : Math.max(1, input.projectionMonths);

  const overtimeHoursTotal = roundCent(hours1 + hours2);
  const projectedOvertimeGross = roundCent(overtimeGrossTotal * projectionMonths);
  const projectedOvertimeNetGain = roundCent(overtimeNetGain * projectionMonths);

  // Ajuste les totaux de groupe pour que group1.gross + group2.gross = overtimeGrossTotal
  // tout en conservant un arrondi au centime sur chaque ligne.
  const group1Gross = roundCent(hours1 * hourlyGrossBase * (1 + majorations.group1 / 100));
  const group2Gross = roundCent(overtimeGrossTotal - group1Gross);

  const group1Final: OvertimeGroupBreakdown = { ...group1, gross: group1Gross };
  const group2Final: OvertimeGroupBreakdown = { ...group2, gross: group2Gross };

  return {
    hourlyGrossBase,
    group1: group1Final,
    group2: group2Final,
    overtimeHoursTotal,
    overtimeGrossTotal,
    contributionRelief,
    overtimeNetGain,
    baseGrossMonthly,
    baseNetMonthly: baseSalary.netMonthly,
    newGrossMonthly,
    newNetMonthly,
    projectionMonths,
    projectedOvertimeGross,
    projectedOvertimeNetGain,
    summaryBrief: buildSummaryBrief(
      group1Final,
      group2Final,
      overtimeHoursTotal,
      baseSalary.netMonthly,
      newNetMonthly,
    ),
  };
}
