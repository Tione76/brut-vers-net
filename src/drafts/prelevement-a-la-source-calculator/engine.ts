import {
  applyWithholdingAmounts,
  buildTaxableIncomeEstimate,
  calculateSalary,
  parseSalaryAmount,
  resolveEffectiveWithholdingRate,
  roundCent,
  type EmploymentProfile,
  type SalaryInputField,
} from "@/site/salary-calculator";
import type { WithholdingRateMode } from "@/site/salary-calculator/tax/neutral-rate.types";
import { PAS_FULL_TIME_PERCENT, PAS_MONTHS_PER_YEAR } from "./config";
import type { PasCalculatorInput, PasCalculatorResult, SalaryReferenceField } from "./types";
import { getPrimaryValidationError } from "./validation";

function grossMonthlyToInputValue(grossMonthly: number): string {
  return grossMonthly.toFixed(2).replace(".", ",");
}

/** Conversion mensuel ↔ annuel fixe (12 mois), propre au calculateur PAS. */
export function pasMonthlyToAnnual(monthly: number): number {
  return roundCent(monthly * PAS_MONTHS_PER_YEAR);
}

export function pasAnnualToMonthly(annual: number): number {
  return roundCent(annual / PAS_MONTHS_PER_YEAR);
}

/** Appel calculateSalary avec base PAS figée (12 mois, temps plein). */
export function calculatePasSalaryBase(input: {
  activeInput: Extract<
    SalaryInputField,
    "grossMonthly" | "grossAnnual" | "netMonthly" | "netAnnual"
  >;
  activeValue: string;
  profile: EmploymentProfile;
}) {
  return calculateSalary({
    activeInput: input.activeInput,
    activeValue: input.activeValue,
    profile: input.profile,
    workTimePercent: PAS_FULL_TIME_PERCENT,
    salaryMonths: PAS_MONTHS_PER_YEAR,
    withholdingTaxRate: 0,
  });
}

export function resolveCurrentGrossMonthly(
  referenceField: SalaryReferenceField,
  currentSalaryValue: string,
  profile: EmploymentProfile,
): number | null {
  const parsed = parseSalaryAmount(currentSalaryValue);
  if (parsed === null || parsed <= 0) {
    return null;
  }

  if (referenceField === "grossMonthly") {
    return roundCent(parsed);
  }

  if (referenceField === "grossAnnual") {
    return pasAnnualToMonthly(parsed);
  }

  if (referenceField === "netAnnual") {
    const fromNetAnnual = calculatePasSalaryBase({
      activeInput: "netAnnual",
      activeValue: currentSalaryValue.trim(),
      profile,
    });
    return fromNetAnnual ? fromNetAnnual.grossMonthly : null;
  }

  const fromNet = calculatePasSalaryBase({
    activeInput: "netMonthly",
    activeValue: currentSalaryValue.trim(),
    profile,
  });

  return fromNet ? fromNet.grossMonthly : null;
}

function calculateFromTaxableAnnual(
  taxableAnnual: number,
  withholdingRateMode: WithholdingRateMode,
  manualWithholdingRate: number,
): PasCalculatorResult {
  const taxableMonthly = pasAnnualToMonthly(taxableAnnual);
  const withholdingResolution = resolveEffectiveWithholdingRate(
    withholdingRateMode,
    taxableMonthly,
    manualWithholdingRate,
  );

  const withholdingMonthly = roundCent(taxableMonthly * (withholdingResolution.rate / 100));
  const withholdingAnnual = roundCent(taxableAnnual * (withholdingResolution.rate / 100));

  return {
    grossMonthly: null,
    grossAnnual: null,
    netMonthly: null,
    netAnnual: null,
    withholdingRate: withholdingResolution.rate,
    withholdingMonthly,
    withholdingAnnual,
    netAfterTaxMonthly: null,
    netAfterTaxAnnual: null,
    incomeSource: "taxableAnnual",
  };
}

export function calculatePasWithholding(input: PasCalculatorInput): PasCalculatorResult | null {
  if (getPrimaryValidationError(input)) {
    return null;
  }

  const taxableDirect = parseSalaryAmount(input.taxableAnnualRaw);
  if (taxableDirect !== null && taxableDirect > 0) {
    return calculateFromTaxableAnnual(
      roundCent(taxableDirect),
      input.withholdingRateMode,
      input.manualWithholdingRate,
    );
  }

  if (!input.referenceField || !input.currentSalaryValue.trim()) {
    return null;
  }

  const grossMonthly = resolveCurrentGrossMonthly(
    input.referenceField,
    input.currentSalaryValue,
    input.profile,
  );

  if (grossMonthly === null) {
    return null;
  }

  const base = calculatePasSalaryBase({
    activeInput: "grossMonthly",
    activeValue: grossMonthlyToInputValue(grossMonthly),
    profile: input.profile,
  });

  if (!base) {
    return null;
  }

  const taxableIncome = buildTaxableIncomeEstimate({
    netMonthly: base.netMonthly,
    grossMonthly: base.grossMonthly,
    salaryMonths: PAS_MONTHS_PER_YEAR,
  });

  const withholdingResolution = resolveEffectiveWithholdingRate(
    input.withholdingRateMode,
    taxableIncome.taxableIncomeMonthly,
    input.manualWithholdingRate,
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
    withholdingRate: withholdingResolution.rate,
    withholdingMonthly: afterTax.withholdingMonthly,
    withholdingAnnual: afterTax.withholdingAnnual,
    netAfterTaxMonthly: afterTax.netAfterTaxMonthly,
    netAfterTaxAnnual: afterTax.netAfterTaxAnnual,
    incomeSource: "salary",
  };
}

export type { WithholdingRateMode };
