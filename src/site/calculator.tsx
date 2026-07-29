"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import "@/site/salary-calculator-layout.css";
import { SelectableOption, SelectableOptionGroup } from "@/site/components/SelectableOptionGroup";
import {
  DEFAULT_PROFILE,
  DEFAULT_SALARY_INPUT_MODE,
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
  mapActiveInputForModeSwitch,
  resolveEffectiveWithholdingRate,
  type EmploymentProfile,
  type SalaryFieldValues,
  type SalaryInputField,
  type SalaryInputMode,
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

const PERIOD_MATRIX_ROWS: {
  rowLabel: string;
  gross: SalaryInputField;
  net: SalaryInputField;
}[] = [
  { rowLabel: "Mensuel", gross: "grossMonthly", net: "netMonthly" },
  { rowLabel: "Annuel", gross: "grossAnnual", net: "netAnnual" },
];

const HOURLY_MATRIX_ROW = {
  rowLabel: "Horaire",
  gross: "grossHourly" as const,
  net: "netHourly" as const,
};

const FIELD_LABELS: Record<SalaryInputField, string> = {
  grossHourly: "Salaire brut horaire",
  grossMonthly: "Salaire brut mensuel",
  grossAnnual: "Salaire brut annuel",
  netHourly: "Salaire net horaire",
  netMonthly: "Salaire net mensuel",
  netAnnual: "Salaire net annuel",
};

const FIELD_PLACEHOLDERS: Record<SalaryInputField, string> = {
  grossHourly: "Ex. : 15 €",
  grossMonthly: "Ex. : 2 500 €",
  grossAnnual: "Ex. : 30 000 €",
  netHourly: "Ex. : 11,70 €",
  netMonthly: "Ex. : 1 950 €",
  netAnnual: "Ex. : 23 400 €",
};

function HourlyModeInfoButton() {
  const tooltipId = useId();
  const rootRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState({ top: 0, left: 0, width: 280 });

  const updatePlacement = useCallback(() => {
    const trigger = triggerRef.current;
    const tip = tipRef.current;
    if (!trigger || !tip) {
      return;
    }

    const margin = 12;
    const gap = 8;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const maxWidth = Math.min(320, viewportWidth - margin * 2);
    const minWidth = Math.min(260, maxWidth);
    const width = Math.max(minWidth, Math.min(maxWidth, tip.offsetWidth || minWidth));

    tip.style.width = `${width}px`;

    const triggerRect = trigger.getBoundingClientRect();
    const tipHeight = tip.offsetHeight;
    const tipWidth = tip.offsetWidth || width;

    let left = triggerRect.left + triggerRect.width / 2 - tipWidth / 2;
    left = Math.max(margin, Math.min(left, viewportWidth - tipWidth - margin));

    let top = triggerRect.bottom + gap;
    if (top + tipHeight > viewportHeight - margin) {
      top = triggerRect.top - tipHeight - gap;
    }
    top = Math.max(margin, Math.min(top, viewportHeight - tipHeight - margin));

    setPlacement({ top, left, width: tipWidth });
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    updatePlacement();
    const frame = window.requestAnimationFrame(updatePlacement);

    window.addEventListener("resize", updatePlacement);
    window.addEventListener("scroll", updatePlacement, true);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updatePlacement);
      window.removeEventListener("scroll", updatePlacement, true);
    };
  }, [open, updatePlacement]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const supportsHover = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  return (
    <span
      className="salary-calc__info"
      ref={rootRef}
      onMouseEnter={() => {
        if (supportsHover()) {
          setOpen(true);
        }
      }}
      onMouseLeave={() => {
        if (supportsHover() && document.activeElement !== triggerRef.current) {
          setOpen(false);
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className="salary-calc__info-trigger"
        aria-label="À propos du calcul à partir d'un taux horaire"
        aria-expanded={open}
        aria-controls={tooltipId}
        onClick={() => setOpen((current) => !current)}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          requestAnimationFrame(() => {
            if (!rootRef.current?.contains(document.activeElement)) {
              setOpen(false);
            }
          });
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M8 7.25V11.5M8 5.25h.01"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <span
        ref={tipRef}
        id={tooltipId}
        role="tooltip"
        className={`salary-calc__tooltip${open ? " salary-calc__tooltip--open" : ""}`}
        style={
          open
            ? {
                top: placement.top,
                left: placement.left,
                width: placement.width,
              }
            : undefined
        }
      >
        Recommandé si vous êtes à <strong>temps partiel</strong> ou si vous connaissez uniquement
        votre <strong>taux horaire</strong>.
      </span>
    </span>
  );
}

export default function Calculator() {
  const [inputMode, setInputMode] = useState<SalaryInputMode>(DEFAULT_SALARY_INPUT_MODE);
  const [salaryFields, setSalaryFields] = useState<SalaryFieldValues>(EMPTY_SALARY_FIELDS);
  const [activeInput, setActiveInput] = useState<SalaryInputField | null>(null);
  const [profile, setProfile] = useState<EmploymentProfile>(DEFAULT_PROFILE);
  const [workTimePercent, setWorkTimePercent] = useState<number>(WORK_TIME_PERCENT.default);
  const [workTimeDraft, setWorkTimeDraft] = useState<string | null>(null);
  const [salaryMonths, setSalaryMonths] = useState<SalaryMonths>(DEFAULT_SALARY_MONTHS);
  const [withholdingRateMode, setWithholdingRateMode] = useState<WithholdingRateMode>("auto");
  const [manualWithholdingRate, setManualWithholdingRate] = useState<number>(WITHHOLDING_TAX.default);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<SalaryInputField, string>>>({});

  const isHourlyMode = inputMode === "hourly";

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

  const handleInputModeChange = (nextMode: SalaryInputMode) => {
    if (nextMode === inputMode) {
      return;
    }

    setInputMode(nextMode);
    setFieldErrors({});

    const nextActive = mapActiveInputForModeSwitch(nextMode, activeInput);
    const nextWorkTime =
      nextMode === "period" ? WORK_TIME_PERCENT.default : workTimePercent;

    if (nextMode === "period") {
      setWorkTimePercent(WORK_TIME_PERCENT.default);
      setWorkTimeDraft(null);
    }

    if (nextActive && salaryFields[nextActive].trim()) {
      setActiveInput(nextActive);
      runCalculation(nextActive, salaryFields[nextActive], {
        profile,
        workTimePercent: nextWorkTime,
        salaryMonths,
      });
      return;
    }

    // Valeurs dérivées déjà présentes : basculer sur le champ compatible
    if (nextMode === "hourly" && salaryFields.grossHourly.trim()) {
      setActiveInput("grossHourly");
      runCalculation("grossHourly", salaryFields.grossHourly, {
        profile,
        workTimePercent: nextWorkTime,
        salaryMonths,
      });
      return;
    }

    if (nextMode === "period" && salaryFields.grossMonthly.trim()) {
      setActiveInput("grossMonthly");
      runCalculation("grossMonthly", salaryFields.grossMonthly, {
        profile,
        workTimePercent: nextWorkTime,
        salaryMonths,
      });
      return;
    }

    setActiveInput(nextActive);
  };

  const handleHourlyModeToggle = (checked: boolean) => {
    handleInputModeChange(checked ? "hourly" : "period");
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
    setWorkTimeDraft(null);
    if (activeInput && salaryFields[activeInput].trim()) {
      runCalculation(activeInput, salaryFields[activeInput], {
        profile,
        workTimePercent: value,
        salaryMonths,
      });
    }
  };

  const applyWorkTimePercent = (value: number) => {
    setWorkTimePercent(value);
    if (activeInput && salaryFields[activeInput].trim()) {
      runCalculation(activeInput, salaryFields[activeInput], {
        profile,
        workTimePercent: value,
        salaryMonths,
      });
    }
  };

  const handleWorkTimeDraftChange = (raw: string) => {
    const digitsOnly = raw.replace(/[^\d]/g, "");
    setWorkTimeDraft(digitsOnly);

    if (!digitsOnly) {
      return;
    }

    const parsed = Number(digitsOnly);
    if (validateWorkTimePercent(parsed) === null) {
      applyWorkTimePercent(parsed);
    }
  };

  const handleWorkTimeDraftBlur = () => {
    if (workTimeDraft === null) {
      return;
    }

    if (!workTimeDraft.trim()) {
      setWorkTimeDraft(null);
      return;
    }

    const parsed = Number(workTimeDraft);
    const fallback = workTimePercent;
    const rounded = Number.isFinite(parsed) ? Math.round(parsed) : fallback;
    const clamped = Math.min(
      WORK_TIME_PERCENT.max,
      Math.max(WORK_TIME_PERCENT.min, rounded),
    );

    if (validateWorkTimePercent(clamped) === null) {
      applyWorkTimePercent(clamped);
    }
    setWorkTimeDraft(null);
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
    setInputMode(DEFAULT_SALARY_INPUT_MODE);
    setSalaryFields(EMPTY_SALARY_FIELDS);
    setActiveInput(null);
    setProfile(DEFAULT_PROFILE);
    setWorkTimePercent(WORK_TIME_PERCENT.default);
    setWorkTimeDraft(null);
    setSalaryMonths(DEFAULT_SALARY_MONTHS);
    setWithholdingRateMode("auto");
    setManualWithholdingRate(WITHHOLDING_TAX.default);
    setFieldErrors({});
  };

  const renderSalaryInput = (field: SalaryInputField, options?: { readOnly?: boolean }) => {
    const errorId = `${field}-error`;
    const error = fieldErrors[field];
    const readOnly = Boolean(options?.readOnly);

    return (
      <div className="salary-calc__cell">
        <label htmlFor={field} className="salary-calc__sr-only">
          {FIELD_LABELS[field]}
          {readOnly ? " (calculé automatiquement)" : ""}
        </label>
        <input
          id={field}
          name={field}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder={readOnly ? undefined : FIELD_PLACEHOLDERS[field]}
          value={salaryFields[field]}
          readOnly={readOnly}
          tabIndex={readOnly ? -1 : undefined}
          onChange={readOnly ? undefined : (e) => handleSalaryChange(field, e.target.value)}
          className={`calc-input${readOnly ? " calc-input--computed" : ""}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          aria-readonly={readOnly ? true : undefined}
        />
        {error ? (
          <p id={errorId} className="calc-field-error" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  };

  const renderMatrixRow = (
    row: { rowLabel: string; gross: SalaryInputField; net: SalaryInputField },
    options?: { readOnly?: boolean },
  ) => (
    <div key={row.rowLabel} className="salary-calc__matrix-row">
      <span className="salary-calc__row-label">{row.rowLabel}</span>
      {renderSalaryInput(row.gross, options)}
      {renderSalaryInput(row.net, options)}
    </div>
  );

  const afterTaxMonthly = calculation
    ? formatAmountForInput(calculation.netAfterTaxMonthly)
    : "";
  const afterTaxAnnual = calculation ? formatAmountForInput(calculation.netAfterTaxAnnual) : "";

  const withholdingHelpId = "withholding-help";
  const withholdingHint =
    withholdingRateMode === "manual"
      ? "Taux fixé manuellement."
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

        {PERIOD_MATRIX_ROWS.map((row) =>
          renderMatrixRow(row, { readOnly: isHourlyMode }),
        )}

        {isHourlyMode ? (
          <p className="salary-calc__hint salary-calc__hint--computed salary-calc__hourly-fields">
            Ces montants sont calculés automatiquement à partir de votre taux horaire et de votre
            temps de travail.
          </p>
        ) : null}

        <div className="salary-calc__matrix-separator" role="separator" aria-hidden="true" />

        <div className="salary-calc__matrix-row salary-calc__matrix-row--hourly">
          <div className="salary-calc__row-heading">
            <span className="salary-calc__row-label" id="hourly-row-label">
              {HOURLY_MATRIX_ROW.rowLabel}
            </span>
            <HourlyModeInfoButton />
            <input
              id="hourlyInputMode"
              name="hourlyInputMode"
              type="checkbox"
              className="salary-calc__hourly-check"
              checked={isHourlyMode}
              onChange={(e) => handleHourlyModeToggle(e.target.checked)}
              aria-label="Calculer à partir d'un taux horaire"
            />
          </div>
          {renderSalaryInput(HOURLY_MATRIX_ROW.gross, { readOnly: !isHourlyMode })}
          {renderSalaryInput(HOURLY_MATRIX_ROW.net, { readOnly: !isHourlyMode })}
        </div>

        <div
          className={`salary-calc__hourly-panel${isHourlyMode ? " salary-calc__hourly-panel--open" : ""}`}
          inert={isHourlyMode ? undefined : true}
          aria-hidden={isHourlyMode ? undefined : true}
        >
          <div className="salary-calc__hourly-panel-inner">
            <div className="salary-calc__param salary-calc__param--in-matrix">
              <div className="salary-calc__work-time-label">
                <label htmlFor="workTimePercentInput" className="calc-field-label">
                  Temps de travail :
                </label>
                <span className="salary-calc__work-time-value">
                  <input
                    id="workTimePercentInput"
                    name="workTimePercentInput"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    className="calc-input salary-calc__work-time-input"
                    value={workTimeDraft ?? String(workTimePercent)}
                    onChange={(e) => handleWorkTimeDraftChange(e.target.value)}
                    onBlur={handleWorkTimeDraftBlur}
                    aria-label="Temps de travail en pourcentage"
                    aria-describedby="workTimePercent"
                    tabIndex={isHourlyMode ? undefined : -1}
                  />
                  <span className="salary-calc__work-time-suffix" aria-hidden="true">
                    %
                  </span>
                </span>
              </div>
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
                aria-label="Curseur du temps de travail"
                tabIndex={isHourlyMode ? undefined : -1}
              />
            </div>
          </div>
        </div>
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

      <div
        className="salary-calc__after-tax"
        role="group"
        aria-label="Salaire net après prélèvement à la source"
      >
        <div className="salary-calc__result-card">
          <p className="salary-calc__result-label" id="netAfterTaxMonthly-label">
            Net mensuel après impôt
          </p>
          <p
            className={`salary-calc__result-value${afterTaxMonthly ? " salary-calc__result-value--filled" : ""}`}
            aria-labelledby="netAfterTaxMonthly-label"
            aria-live="polite"
          >
            {afterTaxMonthly || "Le résultat s'affichera ici"}
          </p>
        </div>
        <div className="salary-calc__result-card">
          <p className="salary-calc__result-label" id="netAfterTaxAnnual-label">
            Net annuel après impôt
          </p>
          <p
            className={`salary-calc__result-value${afterTaxAnnual ? " salary-calc__result-value--filled" : ""}`}
            aria-labelledby="netAfterTaxAnnual-label"
            aria-live="polite"
          >
            {afterTaxAnnual || "Le résultat s'affichera ici"}
          </p>
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
