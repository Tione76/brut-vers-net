import { getProfileCoefficient } from "./config";
import {
  annualToMonthly,
  hourlyToMonthly,
  monthlyToAnnual,
  monthlyToHourly,
  roundCent,
} from "./conversions";
import { parseSalaryAmount } from "./parsing";
import type { CalculatorInput, CalculatorResult, SalaryInputField } from "./types";

const GROSS_FIELDS: ReadonlySet<SalaryInputField> = new Set([
  "grossHourly",
  "grossMonthly",
  "grossAnnual",
]);

function grossFromActiveInput(
  activeInput: SalaryInputField,
  value: number,
  workTimePercent: number,
  salaryMonths: number,
): number {
  switch (activeInput) {
    case "grossHourly":
      return hourlyToMonthly(value, workTimePercent);
    case "grossMonthly":
      return value;
    case "grossAnnual":
      return annualToMonthly(value, salaryMonths);
    default:
      return 0;
  }
}

function netFromActiveInput(
  activeInput: SalaryInputField,
  value: number,
  workTimePercent: number,
  salaryMonths: number,
): number {
  switch (activeInput) {
    case "netHourly":
      return hourlyToMonthly(value, workTimePercent);
    case "netMonthly":
      return value;
    case "netAnnual":
      return annualToMonthly(value, salaryMonths);
    default:
      return 0;
  }
}

export function applyWithholdingAmounts(
  netMonthly: number,
  netAnnual: number,
  taxableMonthly: number,
  taxableAnnual: number,
  withholdingTaxRate: number,
): Pick<
  CalculatorResult,
  "withholdingMonthly" | "withholdingAnnual" | "netAfterTaxMonthly" | "netAfterTaxAnnual"
> {
  const withholdingRate = withholdingTaxRate / 100;
  const withholdingMonthly = taxableMonthly * withholdingRate;
  const withholdingAnnual = taxableAnnual * withholdingRate;

  return {
    withholdingMonthly: roundCent(withholdingMonthly),
    withholdingAnnual: roundCent(withholdingAnnual),
    netAfterTaxMonthly: roundCent(netMonthly - withholdingMonthly),
    netAfterTaxAnnual: roundCent(netAnnual - withholdingAnnual),
  };
}

export function calculateSalary(input: CalculatorInput): CalculatorResult | null {
  const { activeInput, activeValue, profile, workTimePercent, salaryMonths, withholdingTaxRate } =
    input;

  if (!activeInput) {
    return null;
  }

  const parsedActive = parseSalaryAmount(activeValue);
  if (parsedActive === null) {
    return null;
  }

  const coefficient = getProfileCoefficient(profile);
  if (coefficient <= 0) {
    return null;
  }

  let grossMonthly: number;
  let netMonthly: number;

  if (GROSS_FIELDS.has(activeInput)) {
    grossMonthly = grossFromActiveInput(activeInput, parsedActive, workTimePercent, salaryMonths);
    netMonthly = grossMonthly * coefficient;
  } else {
    netMonthly = netFromActiveInput(activeInput, parsedActive, workTimePercent, salaryMonths);
    grossMonthly = netMonthly / coefficient;
  }

  const grossHourly = monthlyToHourly(grossMonthly, workTimePercent);
  const grossAnnual = monthlyToAnnual(grossMonthly, salaryMonths);
  const netHourly = monthlyToHourly(netMonthly, workTimePercent);
  const netAnnual = monthlyToAnnual(netMonthly, salaryMonths);

  const withholding = applyWithholdingAmounts(
    netMonthly,
    netAnnual,
    netMonthly,
    netAnnual,
    withholdingTaxRate,
  );

  return {
    grossHourly: roundCent(grossHourly),
    grossMonthly: roundCent(grossMonthly),
    grossAnnual: roundCent(grossAnnual),
    netHourly: roundCent(netHourly),
    netMonthly: roundCent(netMonthly),
    netAnnual: roundCent(netAnnual),
    ...withholding,
  };
}

export function buildCalculatorInput(
  state: {
    activeInput: SalaryInputField | null;
    salaryFields: Record<SalaryInputField, string>;
    profile: CalculatorInput["profile"];
    workTimePercent: number;
    salaryMonths: CalculatorInput["salaryMonths"];
    withholdingTaxRate: number;
  },
): CalculatorInput | null {
  if (!state.activeInput) {
    return null;
  }

  return {
    activeInput: state.activeInput,
    activeValue: state.salaryFields[state.activeInput],
    profile: state.profile,
    workTimePercent: state.workTimePercent,
    salaryMonths: state.salaryMonths,
    withholdingTaxRate: state.withholdingTaxRate,
  };
}
