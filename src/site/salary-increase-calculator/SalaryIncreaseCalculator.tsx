"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useCalculatorSlot } from "@/framework/SiteProvider";
import { SelectableOption, SelectableOptionGroup } from "@/site/components/SelectableOptionGroup";
import {
  DEFAULT_PROFILE,
  DEFAULT_SALARY_MONTHS,
  EMPLOYMENT_PROFILES,
  SALARY_MONTHS_OPTIONS,
  WITHHOLDING_TAX,
  WORK_TIME_PERCENT,
  annualToMonthly,
  buildTaxableIncomeEstimate,
  calculateSalary,
  clampWithholdingRate,
  formatAmountForInput,
  formatCurrency,
  formatWithholdingRatePercent,
  monthlyToAnnual,
  parseFrenchNumber,
  parseSalaryAmount,
  resolveEffectiveWithholdingRate,
  roundCent,
  type EmploymentProfile,
  type SalaryMonths,
  type WithholdingRateMode,
} from "@/site/salary-calculator";
import { calculateSalaryIncrease, resolveCurrentGrossMonthly } from "./engine";
import { IncreaseFormStep } from "./IncreaseFormStep";
import { SalaryIncreaseResults } from "./SalaryIncreaseResults";
import type { IncreaseReferenceField, IncreaseType, SalaryReferenceField } from "./types";
import { getPrimaryValidationError, validateCurrentSalary } from "./validation";
import "@/site/salary-calculator-layout.css";
import "./salary-increase-calculator.css";

function formatGrossField(value: number): string {
  return formatAmountForInput(value);
}

export default function SalaryIncreaseCalculator() {
  const { setResult } = useCalculatorSlot();
  const [grossMonthly, setGrossMonthly] = useState("");
  const [grossAnnual, setGrossAnnual] = useState("");
  const [netMonthly, setNetMonthly] = useState("");
  const [referenceField, setReferenceField] = useState<SalaryReferenceField | null>(null);
  const [showNetInput, setShowNetInput] = useState(false);
  const [increaseType, setIncreaseType] = useState<IncreaseType>("euros");
  const [increaseMonthly, setIncreaseMonthly] = useState("");
  const [increaseAnnual, setIncreaseAnnual] = useState("");
  const [increaseReferenceField, setIncreaseReferenceField] = useState<IncreaseReferenceField | null>(
    null,
  );
  const [increasePercent, setIncreasePercent] = useState("");
  const [profile, setProfile] = useState<EmploymentProfile>(DEFAULT_PROFILE);
  const [salaryMonths, setSalaryMonths] = useState<SalaryMonths>(DEFAULT_SALARY_MONTHS);
  const [withholdingRateMode, setWithholdingRateMode] = useState<WithholdingRateMode>("auto");
  const [manualWithholdingRate, setManualWithholdingRate] = useState<number>(WITHHOLDING_TAX.default);

  const currentSalaryValue = useMemo(() => {
    if (referenceField === "grossAnnual") {
      return grossAnnual;
    }
    if (referenceField === "netMonthly") {
      return netMonthly;
    }
    if (referenceField === "grossMonthly") {
      return grossMonthly;
    }
    return "";
  }, [grossAnnual, grossMonthly, netMonthly, referenceField]);

  const increaseValue = useMemo(() => {
    if (increaseType === "percent") {
      return increasePercent;
    }
    if (increaseReferenceField === "grossAnnualIncrease") {
      return increaseAnnual;
    }
    if (increaseReferenceField === "grossMonthlyIncrease") {
      return increaseMonthly;
    }
    return "";
  }, [increaseAnnual, increaseMonthly, increasePercent, increaseReferenceField, increaseType]);

  const hasSalary = Boolean(referenceField && currentSalaryValue.trim());
  const hasIncrease =
    increaseType === "percent"
      ? Boolean(increasePercent.trim())
      : Boolean(increaseReferenceField && increaseValue.trim());

  const resolvedGrossMonthly = useMemo(() => {
    if (!referenceField || !currentSalaryValue.trim()) {
      return null;
    }
    return resolveCurrentGrossMonthly(referenceField, currentSalaryValue, profile, salaryMonths);
  }, [currentSalaryValue, profile, referenceField, salaryMonths]);

  const estimatedNetMonthly = useMemo(() => {
    if (resolvedGrossMonthly === null) {
      return null;
    }
    const calculation = calculateSalary({
      activeInput: "grossMonthly",
      activeValue: formatGrossField(resolvedGrossMonthly),
      profile,
      workTimePercent: WORK_TIME_PERCENT.default,
      salaryMonths,
      withholdingTaxRate: 0,
    });
    return calculation?.netMonthly ?? null;
  }, [profile, resolvedGrossMonthly, salaryMonths]);

  const calculatorInput = useMemo(
    () => ({
      referenceField,
      currentSalaryValue,
      increaseType,
      increaseReferenceField,
      increaseValue,
      profile,
      salaryMonths,
      withholdingRateMode,
      manualWithholdingRate,
    }),
    [
      referenceField,
      currentSalaryValue,
      increaseType,
      increaseReferenceField,
      increaseValue,
      profile,
      salaryMonths,
      withholdingRateMode,
      manualWithholdingRate,
    ],
  );

  const validationError = useMemo(() => {
    if (!hasSalary) {
      return null;
    }

    if (!hasIncrease) {
      return validateCurrentSalary(currentSalaryValue);
    }

    return getPrimaryValidationError(calculatorInput);
  }, [calculatorInput, currentSalaryValue, hasIncrease, hasSalary]);

  const result = useMemo(() => {
    if (validationError) {
      return null;
    }
    if (!hasSalary || !hasIncrease) {
      return null;
    }
    return calculateSalaryIncrease(calculatorInput);
  }, [calculatorInput, hasIncrease, hasSalary, validationError]);

  const withholdingResolution = useMemo(() => {
    const grossForRate = result?.after.grossMonthly ?? resolvedGrossMonthly;

    const taxableIncomeMonthly =
      grossForRate !== null
        ? buildTaxableIncomeEstimate({
            netMonthly:
              result?.after.netMonthly ??
              calculateSalary({
                activeInput: "grossMonthly",
                activeValue: formatGrossField(grossForRate),
                profile,
                workTimePercent: WORK_TIME_PERCENT.default,
                salaryMonths,
                withholdingTaxRate: 0,
              })?.netMonthly ??
              0,
            grossMonthly: grossForRate,
            salaryMonths,
          }).taxableIncomeMonthly
        : null;

    return resolveEffectiveWithholdingRate(
      withholdingRateMode,
      taxableIncomeMonthly,
      manualWithholdingRate,
    );
  }, [
    manualWithholdingRate,
    profile,
    resolvedGrossMonthly,
    result,
    salaryMonths,
    withholdingRateMode,
  ]);

  const syncFromGrossMonthly = useCallback(
    (rawValue: string) => {
      const parsed = parseSalaryAmount(rawValue);
      if (parsed === null || parsed <= 0) {
        return;
      }

      const monthly = roundCent(parsed);
      const annual = roundCent(monthlyToAnnual(monthly, salaryMonths));
      const calculation = calculateSalary({
        activeInput: "grossMonthly",
        activeValue: rawValue.trim(),
        profile,
        workTimePercent: WORK_TIME_PERCENT.default,
        salaryMonths,
        withholdingTaxRate: 0,
      });

      setGrossMonthly(rawValue);
      setGrossAnnual(formatGrossField(annual));
      if (calculation) {
        setNetMonthly(formatGrossField(calculation.netMonthly));
      }
    },
    [profile, salaryMonths],
  );

  const syncFromGrossAnnual = useCallback(
    (rawValue: string) => {
      const parsed = parseSalaryAmount(rawValue);
      if (parsed === null || parsed <= 0) {
        return;
      }

      const monthly = roundCent(annualToMonthly(parsed, salaryMonths));
      const calculation = calculateSalary({
        activeInput: "grossMonthly",
        activeValue: formatGrossField(monthly),
        profile,
        workTimePercent: WORK_TIME_PERCENT.default,
        salaryMonths,
        withholdingTaxRate: 0,
      });

      setGrossAnnual(rawValue);
      setGrossMonthly(formatGrossField(monthly));
      if (calculation) {
        setNetMonthly(formatGrossField(calculation.netMonthly));
      }
    },
    [profile, salaryMonths],
  );

  const syncFromNetMonthly = useCallback(
    (rawValue: string) => {
      const calculation = calculateSalary({
        activeInput: "netMonthly",
        activeValue: rawValue.trim(),
        profile,
        workTimePercent: WORK_TIME_PERCENT.default,
        salaryMonths,
        withholdingTaxRate: 0,
      });

      if (!calculation) {
        return;
      }

      setNetMonthly(rawValue);
      setGrossMonthly(formatGrossField(calculation.grossMonthly));
      setGrossAnnual(formatGrossField(calculation.grossAnnual));
    },
    [profile, salaryMonths],
  );

  const resyncFromReference = useCallback(
    (field: SalaryReferenceField, rawValue: string) => {
      if (field === "grossMonthly") {
        syncFromGrossMonthly(rawValue);
      } else if (field === "grossAnnual") {
        syncFromGrossAnnual(rawValue);
      } else {
        syncFromNetMonthly(rawValue);
      }
    },
    [syncFromGrossAnnual, syncFromGrossMonthly, syncFromNetMonthly],
  );

  const clearIncreaseFields = () => {
    setIncreaseMonthly("");
    setIncreaseAnnual("");
    setIncreaseReferenceField(null);
    setIncreasePercent("");
  };

  const syncFromIncreaseMonthly = useCallback(
    (rawValue: string) => {
      const parsed = parseSalaryAmount(rawValue);
      if (parsed === null || parsed <= 0) {
        return;
      }

      const monthly = roundCent(parsed);
      const annual = roundCent(monthlyToAnnual(monthly, salaryMonths));

      setIncreaseMonthly(rawValue);
      setIncreaseAnnual(formatGrossField(annual));
    },
    [salaryMonths],
  );

  const syncFromIncreaseAnnual = useCallback(
    (rawValue: string) => {
      const parsed = parseSalaryAmount(rawValue);
      if (parsed === null || parsed <= 0) {
        return;
      }

      const monthly = roundCent(annualToMonthly(parsed, salaryMonths));

      setIncreaseAnnual(rawValue);
      setIncreaseMonthly(formatGrossField(monthly));
    },
    [salaryMonths],
  );

  const resyncIncreaseFromReference = useCallback(
    (field: IncreaseReferenceField, rawValue: string) => {
      if (field === "grossMonthlyIncrease") {
        syncFromIncreaseMonthly(rawValue);
      } else {
        syncFromIncreaseAnnual(rawValue);
      }
    },
    [syncFromIncreaseAnnual, syncFromIncreaseMonthly],
  );

  const handleIncreaseMonthlyChange = (value: string) => {
    setIncreaseReferenceField(value.trim() ? "grossMonthlyIncrease" : null);
    if (!value.trim()) {
      clearIncreaseFields();
      return;
    }
    syncFromIncreaseMonthly(value);
  };

  const handleIncreaseAnnualChange = (value: string) => {
    setIncreaseReferenceField(value.trim() ? "grossAnnualIncrease" : null);
    if (!value.trim()) {
      clearIncreaseFields();
      return;
    }
    syncFromIncreaseAnnual(value);
  };

  const clearSalaryFields = () => {
    setGrossMonthly("");
    setGrossAnnual("");
    setNetMonthly("");
    setReferenceField(null);
    setShowNetInput(false);
  };

  const handleGrossMonthlyChange = (value: string) => {
    setShowNetInput(false);
    setReferenceField(value.trim() ? "grossMonthly" : null);
    if (!value.trim()) {
      clearSalaryFields();
      return;
    }
    syncFromGrossMonthly(value);
  };

  const handleGrossAnnualChange = (value: string) => {
    setShowNetInput(false);
    setReferenceField(value.trim() ? "grossAnnual" : null);
    if (!value.trim()) {
      clearSalaryFields();
      return;
    }
    syncFromGrossAnnual(value);
  };

  const handleNetMonthlyChange = (value: string) => {
    setReferenceField(value.trim() ? "netMonthly" : null);
    if (!value.trim()) {
      clearSalaryFields();
      return;
    }
    syncFromNetMonthly(value);
  };

  const handleProfileChange = (nextProfile: EmploymentProfile) => {
    setProfile(nextProfile);
    if (referenceField && currentSalaryValue.trim()) {
      resyncFromReference(referenceField, currentSalaryValue);
    }
  };

  const handleSalaryMonthsChange = (months: SalaryMonths) => {
    setSalaryMonths(months);
    if (referenceField && currentSalaryValue.trim()) {
      if (referenceField === "grossMonthly") {
        const parsed = parseSalaryAmount(grossMonthly);
        if (parsed !== null) {
          setGrossAnnual(formatGrossField(roundCent(monthlyToAnnual(parsed, months))));
        }
        resyncFromReference("grossMonthly", grossMonthly);
      } else if (referenceField === "grossAnnual") {
        const parsed = parseSalaryAmount(grossAnnual);
        if (parsed !== null) {
          setGrossMonthly(formatGrossField(roundCent(annualToMonthly(parsed, months))));
        }
        resyncFromReference("grossAnnual", grossAnnual);
      } else if (referenceField === "netMonthly") {
        resyncFromReference("netMonthly", netMonthly);
      }
    }

    if (increaseReferenceField && increaseValue.trim()) {
      if (increaseReferenceField === "grossMonthlyIncrease") {
        const parsed = parseSalaryAmount(increaseMonthly);
        if (parsed !== null) {
          setIncreaseAnnual(formatGrossField(roundCent(monthlyToAnnual(parsed, months))));
        }
        resyncIncreaseFromReference("grossMonthlyIncrease", increaseMonthly);
      } else {
        const parsed = parseSalaryAmount(increaseAnnual);
        if (parsed !== null) {
          setIncreaseMonthly(formatGrossField(roundCent(annualToMonthly(parsed, months))));
        }
        resyncIncreaseFromReference("grossAnnualIncrease", increaseAnnual);
      }
    }
  };

  const handleIncreaseTypeChange = (nextType: IncreaseType) => {
    setIncreaseType(nextType);
    clearIncreaseFields();
  };

  const handleWithholdingSliderChange = (value: number) => {
    setWithholdingRateMode("manual");
    setManualWithholdingRate(clampWithholdingRate(value));
  };

  const handleReset = () => {
    clearSalaryFields();
    setIncreaseType("euros");
    clearIncreaseFields();
    setProfile(DEFAULT_PROFILE);
    setSalaryMonths(DEFAULT_SALARY_MONTHS);
    setWithholdingRateMode("auto");
    setManualWithholdingRate(WITHHOLDING_TAX.default);
  };

  const percentEuroPreview = useMemo(() => {
    if (increaseType !== "percent" || !increasePercent.trim() || resolvedGrossMonthly === null) {
      return null;
    }
    const percent = parseFrenchNumber(increasePercent);
    if (percent === null || percent <= 0) {
      return null;
    }
    const monthly = roundCent(resolvedGrossMonthly * (percent / 100));
    const annual = roundCent(monthlyToAnnual(monthly, salaryMonths));
    return { monthly, annual };
  }, [increasePercent, increaseType, resolvedGrossMonthly, salaryMonths]);

  useEffect(() => {
    setResult(
      <SalaryIncreaseResults
        result={result}
        salaryMonths={salaryMonths}
        hasSalary={hasSalary}
        hasIncrease={hasIncrease}
        validationError={validationError}
        withholdingRate={withholdingResolution.rate}
        increaseType={increaseType}
        increaseReferenceField={increaseReferenceField}
        increaseValue={increaseValue}
      />,
    );
  }, [
    hasIncrease,
    hasSalary,
    increaseReferenceField,
    increaseType,
    increaseValue,
    result,
    salaryMonths,
    setResult,
    validationError,
    withholdingResolution.rate,
  ]);

  const withholdingHelpId = "increase-withholding-help";
  const withholdingHint =
    withholdingRateMode === "manual"
      ? "Taux modifié manuellement. Même taux appliqué avant et après augmentation."
      : "Taux estimé automatiquement, modifiable selon votre situation fiscale.";

  const step1Hint = showNetInput
    ? "Votre brut mensuel et annuel seront reconstitués automatiquement."
    : undefined;

  return (
    <div className="increase-calc calc-fields" aria-live="polite" aria-atomic="true">
      <ol className="increase-calc__steps">
        <IncreaseFormStep step={1} title="Indiquez votre salaire actuel" hint={step1Hint} essential>
          {!showNetInput ? (
            <>
              <div className="increase-calc__salary-row" role="group" aria-label="Salaire brut actuel">
                <div className="increase-calc__field">
                  <label htmlFor="currentGrossMonthly" className="calc-field-label">
                    Salaire brut mensuel actuel
                  </label>
                  <input
                    id="currentGrossMonthly"
                    name="currentGrossMonthly"
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="Ex. : 2 500 €"
                    value={grossMonthly}
                    onChange={(e) => handleGrossMonthlyChange(e.target.value)}
                    className="calc-input"
                  />
                </div>
                <div className="increase-calc__field">
                  <label htmlFor="currentGrossAnnual" className="calc-field-label">
                    Salaire brut annuel actuel
                  </label>
                  <input
                    id="currentGrossAnnual"
                    name="currentGrossAnnual"
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="Ex. : 30 000 €"
                    value={grossAnnual}
                    onChange={(e) => handleGrossAnnualChange(e.target.value)}
                    className="calc-input"
                  />
                </div>
              </div>

              {estimatedNetMonthly !== null ? (
                <p className="increase-calc__net-estimate">
                  Salaire net mensuel estimé avant impôt :{" "}
                  <strong>{formatCurrency(estimatedNetMonthly)}</strong>
                </p>
              ) : null}

              <button
                type="button"
                className="increase-calc__net-toggle salary-calc__link-action"
                onClick={() => setShowNetInput(true)}
              >
                Je connais uniquement mon salaire net
              </button>
            </>
          ) : (
            <div className="increase-calc__net-input">
              <label htmlFor="currentNetMonthly" className="calc-field-label">
                Salaire net mensuel actuel avant impôt
              </label>
              <input
                id="currentNetMonthly"
                name="currentNetMonthly"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="Ex. : 1 950 €"
                value={netMonthly}
                onChange={(e) => handleNetMonthlyChange(e.target.value)}
                className="calc-input"
              />
              <button
                type="button"
                className="salary-calc__link-action"
                onClick={() => {
                  setShowNetInput(false);
                  if (referenceField === "netMonthly") {
                    clearSalaryFields();
                  }
                }}
              >
                Revenir au salaire brut
              </button>
            </div>
          )}
        </IncreaseFormStep>

        <IncreaseFormStep step={2} title="Choisissez le type d'augmentation">
          <SelectableOptionGroup legend="Type d'augmentation" ariaLabel="Type d'augmentation">
            <SelectableOption
              name="increaseType"
              value="euros"
              label="En euros"
              checked={increaseType === "euros"}
              onChange={() => handleIncreaseTypeChange("euros")}
            />
            <SelectableOption
              name="increaseType"
              value="percent"
              label="En pourcentage"
              checked={increaseType === "percent"}
              onChange={() => handleIncreaseTypeChange("percent")}
            />
          </SelectableOptionGroup>
        </IncreaseFormStep>

        <IncreaseFormStep step={3} title="Saisissez le montant de l'augmentation" essential>
          {increaseType === "euros" ? (
            <div className="increase-calc__salary-row" role="group" aria-label="Augmentation brute">
              <div className="increase-calc__field">
                <label htmlFor="increaseGrossMonthly" className="calc-field-label">
                  Augmentation brute mensuelle
                </label>
                <input
                  id="increaseGrossMonthly"
                  name="increaseGrossMonthly"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="Ex. : 200 €"
                  value={increaseMonthly}
                  onChange={(e) => handleIncreaseMonthlyChange(e.target.value)}
                  className="calc-input increase-calc__input--essential"
                />
              </div>
              <div className="increase-calc__field">
                <label htmlFor="increaseGrossAnnual" className="calc-field-label">
                  Augmentation brute annuelle
                </label>
                <input
                  id="increaseGrossAnnual"
                  name="increaseGrossAnnual"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="Ex. : 2 400 €"
                  value={increaseAnnual}
                  onChange={(e) => handleIncreaseAnnualChange(e.target.value)}
                  className="calc-input increase-calc__input--essential"
                />
              </div>
            </div>
          ) : (
            <div className="increase-calc__field">
              <label htmlFor="increasePercent" className="calc-field-label">
                Pourcentage d{"'"}augmentation
              </label>
              <input
                id="increasePercent"
                name="increasePercent"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="Exemple : 5 %"
                value={increasePercent}
                onChange={(e) => setIncreasePercent(e.target.value)}
                className="calc-input increase-calc__input--essential"
                aria-describedby={
                  percentEuroPreview !== null ? "increase-percent-preview" : "increase-percent-hint"
                }
              />
              <p
                id={percentEuroPreview !== null ? "increase-percent-preview" : "increase-percent-hint"}
                className="salary-calc__hint salary-calc__hint--secondary"
              >
                {percentEuroPreview !== null
                  ? `${increasePercent.trim().replace(".", ",")} % représentent environ ${formatCurrency(percentEuroPreview.monthly)} brut par mois, soit ${formatCurrency(percentEuroPreview.annual)} brut par an sur ${salaryMonths} mois.`
                  : "Pourcentage appliqué au salaire brut actuel."}
              </p>
            </div>
          )}
        </IncreaseFormStep>

        <IncreaseFormStep step={4} title="Sélectionnez votre statut">
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
        </IncreaseFormStep>

        <IncreaseFormStep step={5} title="Indiquez le nombre de mois rémunérés">
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
        </IncreaseFormStep>

        <IncreaseFormStep step={6} title="Ajustez votre taux de prélèvement à la source">
          <div className="salary-calc__param increase-calc__withholding">
            <label htmlFor="withholdingTaxRate" className="calc-field-label" id="increase-withholding-label">
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
              aria-labelledby="increase-withholding-label"
              aria-describedby={withholdingHelpId}
              aria-valuemin={WITHHOLDING_TAX.min}
              aria-valuemax={WITHHOLDING_TAX.max}
              aria-valuenow={withholdingResolution.rate}
              aria-valuetext={formatWithholdingRatePercent(withholdingResolution.rate)}
            />
            <div className="increase-calc__step6-footer">
              <p id={withholdingHelpId} className="salary-calc__hint increase-calc__withholding-hint">
                {withholdingHint}
                {withholdingRateMode === "manual" ? (
                  <>
                    {" "}
                    <button
                      type="button"
                      className="salary-calc__link-action increase-calc__inline-action"
                      onClick={() => setWithholdingRateMode("auto")}
                    >
                      Utiliser le taux estimé
                    </button>
                  </>
                ) : null}
              </p>
              <button type="button" className="salary-calc__reset increase-calc__reset-inline" onClick={handleReset}>
                Réinitialiser
              </button>
            </div>
          </div>
        </IncreaseFormStep>
      </ol>
    </div>
  );
}
