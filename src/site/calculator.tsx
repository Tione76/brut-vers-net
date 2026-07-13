"use client";

import { useCallback, useMemo, useState } from "react";
import "@/site/salary-calculator-layout.css";
import { SelectableOption, SelectableOptionGroup } from "@/site/components/SelectableOptionGroup";
import {
  DEFAULT_PROFILE,
  DEFAULT_SALARY_MONTHS,
  EMPLOYMENT_PROFILES,
  SALARY_MONTHS_OPTIONS,
  WITHHOLDING_TAX,
  WORK_TIME_PERCENT,
  applyWithholdingAmounts,
  buildCalculatorInput,
  calculateSalary,
  clampWithholdingRate,
  buildTaxableIncomeEstimate,
  formatAmountForInput,
  formatWithholdingRatePercent,
  resolveEffectiveWithholdingRate,
  type EmploymentProfile,
  type SalaryFieldValues,
  type SalaryInputField,
  type SalaryMonths,
  type WithholdingRateMode,
  validateSalaryField,
  validateWorkTimePercent,
} from "@/site/salary-calculator";

const EMPTY_SALARY_FIELDS: SalaryFieldValues = {
  grossHourly: "",
  grossMonthly: "",
  grossAnnual: "",
  netHourly: "",
  netMonthly: "",
  netAnnual: "",
};

const SALARY_MATRIX_ROWS: {
  rowLabel: string;
  gross: SalaryInputField;
  net: SalaryInputField;
}[] = [
  { rowLabel: "Horaire", gross: "grossHourly", net: "netHourly" },
  { rowLabel: "Mensuel", gross: "grossMonthly", net: "netMonthly" },
  { rowLabel: "Annuel", gross: "grossAnnual", net: "netAnnual" },
];

const FIELD_LABELS: Record<SalaryInputField, string> = {
  grossHourly: "Salaire brut horaire",
  grossMonthly: "Salaire brut mensuel",
  grossAnnual: "Salaire brut annuel",
  netHourly: "Salaire net horaire",
  netMonthly: "Salaire net mensuel",
  netAnnual: "Salaire net annuel",
};

const FIELD_PLACEHOLDERS: Record<SalaryInputField, string> = {
  grossHourly: "Ex. : 16,50 €",
  grossMonthly: "Ex. : 2 500 €",
  grossAnnual: "Ex. : 30 000 €",
  netHourly: "Ex. : 12,87 €",
  netMonthly: "Ex. : 1 950 €",
  netAnnual: "Ex. : 23 400 €",
};

const AFTER_TAX_PLACEHOLDER = "Le résultat s'affichera ici";

export default function Calculator() {
  const [salaryFields, setSalaryFields] = useState<SalaryFieldValues>(EMPTY_SALARY_FIELDS);
  const [activeInput, setActiveInput] = useState<SalaryInputField | null>(null);
  const [profile, setProfile] = useState<EmploymentProfile>(DEFAULT_PROFILE);
  const [workTimePercent, setWorkTimePercent] = useState<number>(WORK_TIME_PERCENT.default);
  const [salaryMonths, setSalaryMonths] = useState<SalaryMonths>(DEFAULT_SALARY_MONTHS);
  const [withholdingRateMode, setWithholdingRateMode] = useState<WithholdingRateMode>("auto");
  const [manualWithholdingRate, setManualWithholdingRate] = useState<number>(WITHHOLDING_TAX.default);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<SalaryInputField, string>>>({});

  const baseCalculation = useMemo(() => {
    const workTimeValidation = validateWorkTimePercent(workTimePercent);
    if (workTimeValidation) {
      return null;
    }

    const input = buildCalculatorInput({
      activeInput,
      salaryFields,
      profile,
      workTimePercent,
      salaryMonths,
      withholdingTaxRate: 0,
    });

    if (!input) {
      return null;
    }

    if (validateSalaryField(input.activeValue)) {
      return null;
    }

    return calculateSalary(input);
  }, [activeInput, profile, salaryFields, salaryMonths, workTimePercent]);

  const withholdingResolution = useMemo(
    () =>
      resolveEffectiveWithholdingRate(
        withholdingRateMode,
        baseCalculation
          ? buildTaxableIncomeEstimate({
              netMonthly: baseCalculation.netMonthly,
              grossMonthly: baseCalculation.grossMonthly,
              salaryMonths,
            }).taxableIncomeMonthly
          : null,
        manualWithholdingRate,
      ),
    [baseCalculation, manualWithholdingRate, salaryMonths, withholdingRateMode],
  );

  const calculation = useMemo(() => {
    if (!baseCalculation) {
      return null;
    }

    const taxableIncome = buildTaxableIncomeEstimate({
      netMonthly: baseCalculation.netMonthly,
      grossMonthly: baseCalculation.grossMonthly,
      salaryMonths,
    });

    const afterTax = applyWithholdingAmounts(
      baseCalculation.netMonthly,
      baseCalculation.netAnnual,
      taxableIncome.taxableIncomeMonthly,
      taxableIncome.taxableIncomeAnnual,
      withholdingResolution.rate,
    );

    return {
      ...baseCalculation,
      ...afterTax,
    };
  }, [baseCalculation, salaryMonths, withholdingResolution.rate]);

  const syncDerivedFields = useCallback(
    (sourceField: SalaryInputField, rawValue: string, nextCalculation: ReturnType<typeof calculateSalary>) => {
      if (!nextCalculation) {
        return;
      }

      const nextValues: SalaryFieldValues = { ...EMPTY_SALARY_FIELDS, [sourceField]: rawValue };
      const mapping: Record<SalaryInputField, number> = {
        grossHourly: nextCalculation.grossHourly,
        grossMonthly: nextCalculation.grossMonthly,
        grossAnnual: nextCalculation.grossAnnual,
        netHourly: nextCalculation.netHourly,
        netMonthly: nextCalculation.netMonthly,
        netAnnual: nextCalculation.netAnnual,
      };

      (Object.keys(mapping) as SalaryInputField[]).forEach((field) => {
        if (field !== sourceField) {
          nextValues[field] = formatAmountForInput(mapping[field]);
        }
      });

      setSalaryFields(nextValues);
    },
    [],
  );

  const runCalculation = useCallback(
    (
      sourceField: SalaryInputField,
      rawValue: string,
      nextState: {
        profile: EmploymentProfile;
        workTimePercent: number;
        salaryMonths: SalaryMonths;
      },
    ) => {
      const salaryError = rawValue.trim() ? validateSalaryField(rawValue) : null;
      setFieldErrors((prev) => ({ ...prev, [sourceField]: salaryError ?? undefined }));

      if (!rawValue.trim() || salaryError) {
        return;
      }

      const workTimeValidation = validateWorkTimePercent(nextState.workTimePercent);
      if (workTimeValidation) {
        return;
      }

      const input = buildCalculatorInput({
        activeInput: sourceField,
        salaryFields: { ...EMPTY_SALARY_FIELDS, [sourceField]: rawValue },
        profile: nextState.profile,
        workTimePercent: nextState.workTimePercent,
        salaryMonths: nextState.salaryMonths,
        withholdingTaxRate: 0,
      });

      if (!input) {
        return;
      }

      const nextCalculation = calculateSalary(input);
      if (nextCalculation) {
        syncDerivedFields(sourceField, rawValue, nextCalculation);
      }
    },
    [syncDerivedFields],
  );

  const handleSalaryChange = (field: SalaryInputField, value: string) => {
    setActiveInput(field);

    if (!value.trim()) {
      setSalaryFields(EMPTY_SALARY_FIELDS);
      setFieldErrors({});
      return;
    }

    setSalaryFields((prev) => ({ ...prev, [field]: value }));
    runCalculation(field, value, {
      profile,
      workTimePercent,
      salaryMonths,
    });
  };

  const handleProfileChange = (nextProfile: EmploymentProfile) => {
    setProfile(nextProfile);
    if (activeInput && salaryFields[activeInput].trim()) {
      runCalculation(activeInput, salaryFields[activeInput], {
        profile: nextProfile,
        workTimePercent,
        salaryMonths,
      });
    }
  };

  const handleWorkTimeChange = (value: number) => {
    setWorkTimePercent(value);
    if (activeInput && salaryFields[activeInput].trim()) {
      runCalculation(activeInput, salaryFields[activeInput], {
        profile,
        workTimePercent: value,
        salaryMonths,
      });
    }
  };

  const handleSalaryMonthsChange = (months: SalaryMonths) => {
    setSalaryMonths(months);
    if (activeInput && salaryFields[activeInput].trim()) {
      runCalculation(activeInput, salaryFields[activeInput], {
        profile,
        workTimePercent,
        salaryMonths: months,
      });
    }
  };

  const handleWithholdingSliderChange = (value: number) => {
    setWithholdingRateMode("manual");
    setManualWithholdingRate(clampWithholdingRate(value));
  };

  const handleUseEstimatedRate = () => {
    setWithholdingRateMode("auto");
  };

  const handleReset = () => {
    setSalaryFields(EMPTY_SALARY_FIELDS);
    setActiveInput(null);
    setProfile(DEFAULT_PROFILE);
    setWorkTimePercent(WORK_TIME_PERCENT.default);
    setSalaryMonths(DEFAULT_SALARY_MONTHS);
    setWithholdingRateMode("auto");
    setManualWithholdingRate(WITHHOLDING_TAX.default);
    setFieldErrors({});
  };

  const renderSalaryInput = (field: SalaryInputField) => {
    const errorId = `${field}-error`;
    const error = fieldErrors[field];

    return (
      <div className="salary-calc__cell">
        <label htmlFor={field} className="salary-calc__sr-only">
          {FIELD_LABELS[field]}
        </label>
        <input
          id={field}
          name={field}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder={FIELD_PLACEHOLDERS[field]}
          value={salaryFields[field]}
          onChange={(e) => handleSalaryChange(field, e.target.value)}
          className="calc-input"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        />
        {error ? (
          <p id={errorId} className="calc-field-error" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  };

  const afterTaxMonthly = calculation
    ? formatAmountForInput(calculation.netAfterTaxMonthly)
    : "";
  const afterTaxAnnual = calculation ? formatAmountForInput(calculation.netAfterTaxAnnual) : "";

  const withholdingHelpId = "withholding-help";
  const withholdingHint =
    withholdingRateMode === "manual"
      ? "Taux modifié manuellement."
      : withholdingResolution.hasSalary
        ? "Taux neutre estimé automatiquement selon le revenu mensuel. Vous pouvez le modifier."
        : "Le taux estimé sera proposé après la saisie d'un salaire.";

  return (
    <div className="salary-calc calc-fields" aria-live="polite" aria-atomic="true">
      <div className="salary-calc__matrix" role="group" aria-label="Grille des salaires brut et net">
        <div className="salary-calc__matrix-head" aria-hidden="true">
          <span className="salary-calc__matrix-corner" />
          <span className="calc-field-label salary-calc__col-head">Salaire brut</span>
          <span className="calc-field-label salary-calc__col-head">Salaire net</span>
        </div>

        {SALARY_MATRIX_ROWS.map((row) => (
          <div key={row.rowLabel} className="salary-calc__matrix-row">
            <span className="salary-calc__row-label">{row.rowLabel}</span>
            {renderSalaryInput(row.gross)}
            {renderSalaryInput(row.net)}
          </div>
        ))}
      </div>

      <SelectableOptionGroup legend="Statut professionnel" ariaLabel="Statut professionnel">
        {EMPLOYMENT_PROFILES.map((item) => (
          <SelectableOption
            key={item.id}
            name="employmentProfile"
            value={item.id}
            label={item.label}
            checked={profile === item.id}
            onChange={() => handleProfileChange(item.id)}
          />
        ))}
      </SelectableOptionGroup>

      <div className="salary-calc__param">
        <label htmlFor="workTimePercent" className="calc-field-label">
          Temps de travail : {workTimePercent} %
        </label>
        <input
          id="workTimePercent"
          name="workTimePercent"
          type="range"
          min={WORK_TIME_PERCENT.min}
          max={WORK_TIME_PERCENT.max}
          step={1}
          value={workTimePercent}
          onChange={(e) => handleWorkTimeChange(Number(e.target.value))}
          className="calc-range"
          aria-valuemin={WORK_TIME_PERCENT.min}
          aria-valuemax={WORK_TIME_PERCENT.max}
          aria-valuenow={workTimePercent}
        />
      </div>

      <SelectableOptionGroup
        legend="Nombre de mois de rémunération"
        ariaLabel="Nombre de mois de rémunération"
        compact
      >
        {SALARY_MONTHS_OPTIONS.map((months) => (
          <SelectableOption
            key={months}
            name="salaryMonths"
            value={String(months)}
            label={`${months} mois`}
            checked={salaryMonths === months}
            onChange={() => handleSalaryMonthsChange(months)}
            compact
          />
        ))}
      </SelectableOptionGroup>

      <div className="salary-calc__param">
        <label htmlFor="withholdingTaxRate" className="calc-field-label" id="withholding-label">
          Taux de prélèvement à la source : {formatWithholdingRatePercent(withholdingResolution.rate)}
        </label>
        <input
          id="withholdingTaxRate"
          name="withholdingTaxRate"
          type="range"
          min={WITHHOLDING_TAX.min}
          max={WITHHOLDING_TAX.max}
          step={WITHHOLDING_TAX.step}
          value={withholdingResolution.rate}
          onChange={(e) => handleWithholdingSliderChange(Number(e.target.value))}
          className="calc-range"
          aria-labelledby="withholding-label"
          aria-describedby={withholdingHelpId}
          aria-valuemin={WITHHOLDING_TAX.min}
          aria-valuemax={WITHHOLDING_TAX.max}
          aria-valuenow={withholdingResolution.rate}
          aria-valuetext={formatWithholdingRatePercent(withholdingResolution.rate)}
        />
        <p id={withholdingHelpId} className="salary-calc__hint">
          {withholdingHint}
        </p>
        <p className="salary-calc__hint salary-calc__hint--secondary">
          Votre taux réel dépend de votre foyer fiscal et peut différer de cette estimation.
        </p>
        {withholdingRateMode === "manual" ? (
          <button type="button" className="salary-calc__link-action" onClick={handleUseEstimatedRate}>
            Utiliser le taux estimé
          </button>
        ) : null}
      </div>

      <div className="salary-calc__after-tax" role="group" aria-label="Salaire net après prélèvement à la source">
        <div className="salary-calc__after-tax-field">
          <label htmlFor="netAfterTaxMonthly" className="calc-field-label">
            Net mensuel après impôt
          </label>
          <input
            id="netAfterTaxMonthly"
            name="netAfterTaxMonthly"
            type="text"
            readOnly
            tabIndex={-1}
            value={afterTaxMonthly}
            placeholder={AFTER_TAX_PLACEHOLDER}
            className="calc-input salary-calc__output"
            aria-readonly="true"
            aria-label={
              afterTaxMonthly
                ? `Net mensuel après impôt : ${afterTaxMonthly}`
                : "Net mensuel après impôt, en attente de calcul"
            }
          />
        </div>
        <div className="salary-calc__after-tax-field">
          <label htmlFor="netAfterTaxAnnual" className="calc-field-label">
            Net annuel après impôt
          </label>
          <input
            id="netAfterTaxAnnual"
            name="netAfterTaxAnnual"
            type="text"
            readOnly
            tabIndex={-1}
            value={afterTaxAnnual}
            placeholder={AFTER_TAX_PLACEHOLDER}
            className="calc-input salary-calc__output"
            aria-readonly="true"
            aria-label={
              afterTaxAnnual
                ? `Net annuel après impôt : ${afterTaxAnnual}`
                : "Net annuel après impôt, en attente de calcul"
            }
          />
        </div>
      </div>

      <div className="calc-col-actions salary-calc__actions">
        <button type="button" className="salary-calc__reset" onClick={handleReset}>
          Réinitialiser
        </button>
      </div>
    </div>
  );
}
