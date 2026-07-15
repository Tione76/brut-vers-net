import {
  WORK_TIME_PERCENT,
  applyWithholdingAmounts,
  annualToMonthly,
  buildTaxableIncomeEstimate,
  calculateSalary,
  formatCurrency,
  monthlyToAnnual,
  parseFrenchNumber,
  parseSalaryAmount,
  resolveEffectiveWithholdingRate,
  roundCent,
} from "@/site/salary-calculator";
import type { EmploymentProfile, SalaryMonths } from "@/site/salary-calculator/types";
import type { WithholdingRateMode } from "@/site/salary-calculator/tax/neutral-rate.types";
import type {
  IncreaseReferenceField,
  IncreaseType,
  SalaryIncreaseGains,
  SalaryIncreaseInput,
  SalaryIncreasePercentGains,
  SalaryIncreaseResult,
  SalaryReferenceField,
  SalarySnapshot,
} from "./types";
import { getPrimaryValidationError } from "./validation";

function grossMonthlyToInputValue(grossMonthly: number): string {
  return grossMonthly.toFixed(2).replace(".", ",");
}

function snapshotFromGrossMonthly(
  grossMonthly: number,
  profile: EmploymentProfile,
  salaryMonths: SalaryMonths,
  withholdingRateMode: WithholdingRateMode,
  manualWithholdingRate: number,
): SalarySnapshot | null {
  if (!Number.isFinite(grossMonthly) || grossMonthly <= 0) {
    return null;
  }

  const workTimePercent = WORK_TIME_PERCENT.default;
  const base = calculateSalary({
    activeInput: "grossMonthly",
    activeValue: grossMonthlyToInputValue(grossMonthly),
    profile,
    workTimePercent,
    salaryMonths,
    withholdingTaxRate: 0,
  });

  if (!base) {
    return null;
  }

  const taxableIncome = buildTaxableIncomeEstimate({
    netMonthly: base.netMonthly,
    grossMonthly: base.grossMonthly,
    salaryMonths,
  });

  const withholdingResolution = resolveEffectiveWithholdingRate(
    withholdingRateMode,
    taxableIncome.taxableIncomeMonthly,
    manualWithholdingRate,
  );

  const afterTax = applyWithholdingAmounts(
    base.netMonthly,
    base.netAnnual,
    taxableIncome.taxableIncomeMonthly,
    taxableIncome.taxableIncomeAnnual,
    withholdingResolution.rate,
  );

  return {
    grossMonthly: base.grossMonthly,
    grossAnnual: base.grossAnnual,
    netMonthly: base.netMonthly,
    netAnnual: base.netAnnual,
    netAfterTaxMonthly: afterTax.netAfterTaxMonthly,
    netAfterTaxAnnual: afterTax.netAfterTaxAnnual,
  };
}

export function resolveCurrentGrossMonthly(
  referenceField: SalaryReferenceField,
  currentSalaryValue: string,
  profile: EmploymentProfile,
  salaryMonths: SalaryMonths,
): number | null {
  const workTimePercent = WORK_TIME_PERCENT.default;
  const parsed = parseSalaryAmount(currentSalaryValue);
  if (parsed === null || parsed <= 0) {
    return null;
  }

  if (referenceField === "grossMonthly") {
    return roundCent(parsed);
  }

  if (referenceField === "grossAnnual") {
    return roundCent(annualToMonthly(parsed, salaryMonths));
  }

  const fromNet = calculateSalary({
    activeInput: "netMonthly",
    activeValue: currentSalaryValue.trim(),
    profile,
    workTimePercent,
    salaryMonths,
    withholdingTaxRate: 0,
  });

  return fromNet ? fromNet.grossMonthly : null;
}

export function resolveMonthlyIncreaseEuros(
  referenceField: IncreaseReferenceField,
  value: string,
  salaryMonths: SalaryMonths,
): number | null {
  const parsed = parseSalaryAmount(value);
  if (parsed === null || parsed <= 0) {
    return null;
  }

  if (referenceField === "grossMonthlyIncrease") {
    return roundCent(parsed);
  }

  return roundCent(annualToMonthly(parsed, salaryMonths));
}

function applyIncreaseToGross(
  currentGrossMonthly: number,
  increaseType: IncreaseType,
  increaseReferenceField: IncreaseReferenceField | null,
  increaseValue: string,
  salaryMonths: SalaryMonths,
): number | null {
  if (increaseType === "euros") {
    if (!increaseReferenceField) {
      return null;
    }
    const euros = resolveMonthlyIncreaseEuros(increaseReferenceField, increaseValue, salaryMonths);
    if (euros === null || euros <= 0) {
      return null;
    }
    return roundCent(currentGrossMonthly + euros);
  }

  const percent = parseFrenchNumber(increaseValue);
  if (percent === null || percent <= 0) {
    return null;
  }

  return roundCent(currentGrossMonthly * (1 + percent / 100));
}

function computeGains(before: SalarySnapshot, after: SalarySnapshot): SalaryIncreaseGains {
  return {
    grossMonthly: roundCent(after.grossMonthly - before.grossMonthly),
    grossAnnual: roundCent(after.grossAnnual - before.grossAnnual),
    netMonthly: roundCent(after.netMonthly - before.netMonthly),
    netAnnual: roundCent(after.netAnnual - before.netAnnual),
    netAfterTaxMonthly: roundCent(after.netAfterTaxMonthly - before.netAfterTaxMonthly),
    netAfterTaxAnnual: roundCent(after.netAfterTaxAnnual - before.netAfterTaxAnnual),
  };
}

function computePercentGains(before: SalarySnapshot, after: SalarySnapshot): SalaryIncreasePercentGains {
  const gross =
    before.grossMonthly > 0
      ? roundCent(((after.grossMonthly - before.grossMonthly) / before.grossMonthly) * 100)
      : 0;
  const net =
    before.netMonthly > 0
      ? roundCent(((after.netMonthly - before.netMonthly) / before.netMonthly) * 100)
      : 0;

  return { gross, net };
}

function formatPercentFr(value: number): string {
  const formatted = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  return `${formatted} %`;
}

function buildSummaryBrief(
  increaseType: IncreaseType,
  increaseReferenceField: IncreaseReferenceField | null,
  increaseValue: string,
  salaryMonths: SalaryMonths,
  gainNetMonthly: number,
  gainNetAnnual: number,
): string {
  let increaseLabel: string;

  if (increaseType === "euros") {
    const euros =
      increaseReferenceField !== null
        ? (resolveMonthlyIncreaseEuros(increaseReferenceField, increaseValue, salaryMonths) ?? 0)
        : 0;
    increaseLabel = `une augmentation brute de ${formatCurrency(euros)} par mois`;
  } else {
    const percent = parseFrenchNumber(increaseValue) ?? 0;
    increaseLabel = `une augmentation de ${formatPercentFr(percent)} de votre salaire brut`;
  }

  return `Avec ${increaseLabel}, votre salaire net avant impôt augmenterait d'environ ${formatCurrency(gainNetMonthly)} par mois, soit ${formatCurrency(gainNetAnnual)} sur ${salaryMonths} mois.`;
}

export function calculateSalaryIncrease(input: SalaryIncreaseInput): SalaryIncreaseResult | null {
  if (getPrimaryValidationError(input)) {
    return null;
  }

  if (!input.referenceField) {
    return null;
  }

  const currentGrossMonthly = resolveCurrentGrossMonthly(
    input.referenceField,
    input.currentSalaryValue,
    input.profile,
    input.salaryMonths,
  );

  if (currentGrossMonthly === null) {
    return null;
  }

  const newGrossMonthly = applyIncreaseToGross(
    currentGrossMonthly,
    input.increaseType,
    input.increaseReferenceField,
    input.increaseValue,
    input.salaryMonths,
  );

  if (newGrossMonthly === null || newGrossMonthly <= 0) {
    return null;
  }

  const before = snapshotFromGrossMonthly(
    currentGrossMonthly,
    input.profile,
    input.salaryMonths,
    input.withholdingRateMode,
    input.manualWithholdingRate,
  );

  const after = snapshotFromGrossMonthly(
    newGrossMonthly,
    input.profile,
    input.salaryMonths,
    input.withholdingRateMode,
    input.manualWithholdingRate,
  );

  if (!before || !after) {
    return null;
  }

  const gain = computeGains(before, after);
  const percentGain = computePercentGains(before, after);

  return {
    before,
    after,
    gain,
    percentGain,
    summaryBrief: buildSummaryBrief(
      input.increaseType,
      input.increaseReferenceField,
      input.increaseValue,
      input.salaryMonths,
      gain.netMonthly,
      gain.netAnnual,
    ),
  };
}

/** Utilitaire test : gain annuel brut à partir du mensuel et du nombre de mois. */
export function annualFromMonthly(monthly: number, salaryMonths: SalaryMonths): number {
  return roundCent(monthlyToAnnual(monthly, salaryMonths));
}

/** Utilitaire test : brut mensuel à partir du brut annuel et du nombre de mois. */
export function monthlyFromAnnual(annual: number, salaryMonths: SalaryMonths): number {
  return roundCent(annualToMonthly(annual, salaryMonths));
}
