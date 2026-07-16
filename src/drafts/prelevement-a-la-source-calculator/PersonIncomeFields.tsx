"use client";

import { useCallback } from "react";
import { IncreaseFormStep } from "@/site/salary-increase-calculator/IncreaseFormStep";
import { syncSalaryFieldsFromReference } from "./personnalise/reconstruct-taxable";
import {
  createEmptyPersonIncomeState,
  type PersonIncomeState,
  type SalaryModeField,
} from "./person-income-state";

export type { PersonIncomeState, SalaryModeField } from "./person-income-state";
export {
  createEmptyPersonIncomeState,
  personHasIncome,
  resyncPersonIncomeAfterProfileChange,
  toPersonIncomeInput,
} from "./person-income-state";

interface PersonIncomeFieldsProps {
  idPrefix: string;
  title: string;
  stepNumber: number;
  state: PersonIncomeState;
  onChange: (next: PersonIncomeState) => void;
}

export function PersonIncomeFields({
  idPrefix,
  title,
  stepNumber,
  state,
  onChange,
}: PersonIncomeFieldsProps) {
  const applySync = useCallback(
    (field: SalaryModeField, rawValue: string, base: PersonIncomeState): PersonIncomeState => {
      if (!rawValue.trim()) {
        return {
          ...base,
          referenceField: null,
          grossMonthly: "",
          grossAnnual: "",
          netMonthly: "",
          netAnnual: "",
        };
      }

      const synced = syncSalaryFieldsFromReference(field, rawValue, base.profile);
      if (!synced) {
        return {
          ...base,
          referenceField: field,
          [field]: rawValue,
        };
      }

      return {
        ...base,
        referenceField: field,
        taxableAnnualRaw: "",
        useSalaryOnly: true,
        grossMonthly: field === "grossMonthly" ? rawValue : synced.grossMonthly,
        grossAnnual: field === "grossAnnual" ? rawValue : synced.grossAnnual,
        netMonthly: field === "netMonthly" ? rawValue : synced.netMonthly,
        netAnnual: field === "netAnnual" ? rawValue : synced.netAnnual,
      };
    },
    [],
  );

  const handleTaxableChange = (value: string) => {
    onChange({
      ...state,
      taxableAnnualRaw: value,
      useSalaryOnly: false,
      referenceField: null,
      grossMonthly: "",
      grossAnnual: "",
      netMonthly: "",
      netAnnual: "",
    });
  };

  const handleSalaryFieldChange = (field: SalaryModeField, value: string) => {
    onChange(applySync(field, value, { ...state, useSalaryOnly: true, taxableAnnualRaw: "" }));
  };

  const switchToSalaryMode = () => {
    onChange({
      ...createEmptyPersonIncomeState(state.profile),
      useSalaryOnly: true,
    });
  };

  const switchToTaxableMode = () => {
    onChange({
      ...createEmptyPersonIncomeState(state.profile),
      useSalaryOnly: false,
    });
  };

  return (
    <IncreaseFormStep step={stepNumber} title={title} essential>
      {state.useSalaryOnly ? (
        <>
          <div className="increase-calc__salary-row" role="group" aria-label="Salaire brut">
            <div className="increase-calc__field">
              <label htmlFor={`${idPrefix}-grossMonthly`} className="calc-field-label">
                Salaire brut mensuel
              </label>
              <input
                id={`${idPrefix}-grossMonthly`}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="Ex. : 2 500 €"
                value={state.grossMonthly}
                onChange={(e) => handleSalaryFieldChange("grossMonthly", e.target.value)}
                className="calc-input"
              />
            </div>
            <div className="increase-calc__field">
              <label htmlFor={`${idPrefix}-grossAnnual`} className="calc-field-label">
                Salaire brut annuel
              </label>
              <input
                id={`${idPrefix}-grossAnnual`}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="Ex. : 30 000 €"
                value={state.grossAnnual}
                onChange={(e) => handleSalaryFieldChange("grossAnnual", e.target.value)}
                className="calc-input"
              />
            </div>
          </div>

          <div
            className="increase-calc__salary-row"
            role="group"
            aria-label="Salaire net avant impôt"
          >
            <div className="increase-calc__field">
              <label htmlFor={`${idPrefix}-netMonthly`} className="calc-field-label">
                Salaire net mensuel avant impôt
              </label>
              <input
                id={`${idPrefix}-netMonthly`}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="Ex. : 1 950 €"
                value={state.netMonthly}
                onChange={(e) => handleSalaryFieldChange("netMonthly", e.target.value)}
                className="calc-input"
              />
            </div>
            <div className="increase-calc__field">
              <label htmlFor={`${idPrefix}-netAnnual`} className="calc-field-label">
                Salaire net annuel avant impôt
              </label>
              <input
                id={`${idPrefix}-netAnnual`}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="Ex. : 23 400 €"
                value={state.netAnnual}
                onChange={(e) => handleSalaryFieldChange("netAnnual", e.target.value)}
                className="calc-input"
              />
            </div>
          </div>

          <button
            type="button"
            className="increase-calc__net-toggle salary-calc__link-action"
            onClick={switchToTaxableMode}
          >
            Je connais mon net imposable annuel
          </button>
        </>
      ) : (
        <>
          <div className="increase-calc__field">
            <label htmlFor={`${idPrefix}-taxable`} className="calc-field-label">
              Net imposable annuel
            </label>
            <input
              id={`${idPrefix}-taxable`}
              name={`${idPrefix}-taxable`}
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="Ex. : 28 500 €"
              value={state.taxableAnnualRaw}
              onChange={(e) => handleTaxableChange(e.target.value)}
              className="calc-input"
            />
          </div>

          <p className="pas-calc__field-help">
            Valeur présente sur votre avis d&apos;imposition. Cette donnée permet l&apos;estimation
            la plus précise.
          </p>

          <button
            type="button"
            className="salary-calc__link-action"
            onClick={switchToSalaryMode}
          >
            Je préfère renseigner mon salaire
          </button>
        </>
      )}
    </IncreaseFormStep>
  );
}
