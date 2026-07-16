import { calculateSalary, parseSalaryAmount, roundCent } from "@/site/salary-calculator";
import type { EmploymentProfile } from "@/site/salary-calculator/types";
import { PAS_FULL_TIME_PERCENT, PAS_MONTHS_PER_YEAR } from "../config";
import { PERSONALIZED_PAS_CONFIG } from "./config";
import type { IncomeReferenceField, PersonIncomeInput } from "./types";

function estimateTaxableFromGrossNet(grossMonthly: number, netMonthly: number): number {
  const csgBase = roundCent(
    grossMonthly * PERSONALIZED_PAS_CONFIG.csgCrds.baseRateWhenAbatementApplies,
  );
  const nonDed = roundCent(csgBase * PERSONALIZED_PAS_CONFIG.csgCrds.nonDeductibleCsgRate);
  const crds = roundCent(csgBase * PERSONALIZED_PAS_CONFIG.csgCrds.crdsRate);
  return roundCent(netMonthly + nonDed + crds);
}

/**
 * Reconstitue un net imposable annuel estimé.
 * Priorité absolue au net imposable annuel saisi.
 * Sinon : conversion salaire (temps plein, 12 mois) + CSG/CRDS, sans mutuelle forfaitaire.
 */
export function resolvePersonTaxableAnnual(input: PersonIncomeInput): {
  taxableAnnual: number;
  netMonthly: number | null;
  grossMonthly: number | null;
} | null {
  const taxableRaw = parseSalaryAmount(input.taxableAnnualRaw);
  if (taxableRaw !== null && taxableRaw > 0) {
    return {
      taxableAnnual: roundCent(taxableRaw),
      netMonthly: null,
      grossMonthly: null,
    };
  }

  if (!input.referenceField || input.referenceField === "taxableAnnual") {
    return null;
  }

  const parsed = parseSalaryAmount(input.salaryValue);
  if (parsed === null || parsed <= 0) {
    return null;
  }

  let activeInput: "grossMonthly" | "grossAnnual" | "netMonthly" | "netAnnual";
  const activeValue = input.salaryValue.trim();

  switch (input.referenceField) {
    case "grossMonthly":
      activeInput = "grossMonthly";
      break;
    case "grossAnnual":
      activeInput = "grossAnnual";
      break;
    case "netMonthly":
      activeInput = "netMonthly";
      break;
    case "netAnnual":
      activeInput = "netAnnual";
      break;
    default:
      return null;
  }

  const base = calculateSalary({
    activeInput,
    activeValue,
    profile: input.profile,
    workTimePercent: PAS_FULL_TIME_PERCENT,
    salaryMonths: PAS_MONTHS_PER_YEAR,
    withholdingTaxRate: 0,
  });

  if (!base) {
    return null;
  }

  const taxableMonthly = estimateTaxableFromGrossNet(base.grossMonthly, base.netMonthly);
  return {
    taxableAnnual: roundCent(taxableMonthly * PAS_MONTHS_PER_YEAR),
    netMonthly: base.netMonthly,
    grossMonthly: base.grossMonthly,
  };
}

export function syncSalaryFieldsFromReference(
  field: IncomeReferenceField,
  rawValue: string,
  profile: EmploymentProfile,
): {
  grossMonthly: string;
  grossAnnual: string;
  netMonthly: string;
  netAnnual: string;
} | null {
  if (field === "taxableAnnual") {
    return null;
  }

  const base = calculateSalary({
    activeInput: field,
    activeValue: rawValue.trim(),
    profile,
    workTimePercent: PAS_FULL_TIME_PERCENT,
    salaryMonths: PAS_MONTHS_PER_YEAR,
    withholdingTaxRate: 0,
  });

  if (!base) {
    return null;
  }

  const fmt = (n: number) =>
    n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });

  return {
    grossMonthly: fmt(base.grossMonthly),
    grossAnnual: fmt(base.grossAnnual),
    netMonthly: fmt(base.netMonthly),
    netAnnual: fmt(base.netAnnual),
  };
}

export { parseSalaryAmount, roundCent };
