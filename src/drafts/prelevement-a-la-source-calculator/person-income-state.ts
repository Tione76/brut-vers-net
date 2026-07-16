import { DEFAULT_PROFILE, type EmploymentProfile } from "@/site/salary-calculator";
import {
  parseSalaryAmount,
  syncSalaryFieldsFromReference,
} from "./personnalise/reconstruct-taxable";
import type { IncomeReferenceField, PersonIncomeInput } from "./personnalise/types";

export type SalaryModeField = Exclude<IncomeReferenceField, "taxableAnnual">;

export interface PersonIncomeState {
  taxableAnnualRaw: string;
  /** true = saisie salaire (défaut) ; false = net imposable annuel direct. */
  useSalaryOnly: boolean;
  referenceField: SalaryModeField | null;
  grossMonthly: string;
  grossAnnual: string;
  netMonthly: string;
  netAnnual: string;
  profile: EmploymentProfile;
}

export function createEmptyPersonIncomeState(
  profile: EmploymentProfile = DEFAULT_PROFILE,
): PersonIncomeState {
  return {
    taxableAnnualRaw: "",
    useSalaryOnly: true,
    referenceField: null,
    grossMonthly: "",
    grossAnnual: "",
    netMonthly: "",
    netAnnual: "",
    profile,
  };
}

export function toPersonIncomeInput(state: PersonIncomeState): PersonIncomeInput {
  if (!state.useSalaryOnly) {
    return {
      taxableAnnualRaw: state.taxableAnnualRaw,
      referenceField: "taxableAnnual",
      salaryValue: "",
      profile: state.profile,
    };
  }

  const field = state.referenceField;
  const salaryValue =
    field === "grossMonthly"
      ? state.grossMonthly
      : field === "grossAnnual"
        ? state.grossAnnual
        : field === "netMonthly"
          ? state.netMonthly
          : field === "netAnnual"
            ? state.netAnnual
            : "";

  return {
    taxableAnnualRaw: "",
    referenceField: field,
    salaryValue,
    profile: state.profile,
  };
}

export function personHasIncome(state: PersonIncomeState): boolean {
  if (!state.useSalaryOnly) {
    const taxable = parseSalaryAmount(state.taxableAnnualRaw);
    return taxable !== null && taxable > 0;
  }
  if (!state.referenceField) {
    return false;
  }
  const value =
    state.referenceField === "grossMonthly"
      ? state.grossMonthly
      : state.referenceField === "grossAnnual"
        ? state.grossAnnual
        : state.referenceField === "netMonthly"
          ? state.netMonthly
          : state.netAnnual;
  const parsed = parseSalaryAmount(value);
  return parsed !== null && parsed > 0;
}

/** Resynchronise les salaires après un changement de statut professionnel. */
export function resyncPersonIncomeAfterProfileChange(
  state: PersonIncomeState,
  profile: EmploymentProfile,
): PersonIncomeState {
  if (!state.useSalaryOnly || !state.referenceField) {
    return { ...state, profile };
  }

  const current =
    state.referenceField === "grossMonthly"
      ? state.grossMonthly
      : state.referenceField === "grossAnnual"
        ? state.grossAnnual
        : state.referenceField === "netMonthly"
          ? state.netMonthly
          : state.netAnnual;

  if (!current.trim()) {
    return { ...state, profile };
  }

  const synced = syncSalaryFieldsFromReference(state.referenceField, current, profile);
  if (!synced) {
    return { ...state, profile };
  }

  return {
    ...state,
    profile,
    grossMonthly:
      state.referenceField === "grossMonthly" ? current : synced.grossMonthly,
    grossAnnual: state.referenceField === "grossAnnual" ? current : synced.grossAnnual,
    netMonthly: state.referenceField === "netMonthly" ? current : synced.netMonthly,
    netAnnual: state.referenceField === "netAnnual" ? current : synced.netAnnual,
  };
}
