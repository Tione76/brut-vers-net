"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useCalculatorSlot } from "@/framework/SiteProvider";
import { SelectableOption, SelectableOptionGroup } from "@/site/components/SelectableOptionGroup";
import {
  DEFAULT_PROFILE,
  WORK_TIME_PERCENT,
  calculateSalary,
  formatAmountForInput,
  formatCurrency,
  parseSalaryAmount,
  roundCent,
  type EmploymentProfile,
} from "@/site/salary-calculator";
import {
  LEGAL_MAJORATION_GROUP1,
  LEGAL_MAJORATION_GROUP2,
  OVERTIME_EMPLOYMENT_PROFILES,
} from "./config";
import { calculateOvertimeSalary, monthlyToHourlyGross } from "./engine";
import { OvertimeFormStep } from "./OvertimeFormStep";
import { OvertimeSalaryResults } from "./OvertimeSalaryResults";
import type { MajorationMode, OvertimeSalaryReferenceField } from "./types";
import {
  getHighHoursWarning,
  getLegalMajorationOrderHint,
  getPrimaryValidationError,
  parseOvertimeHours,
} from "./validation";
import "@/site/salary-calculator-layout.css";
import "@/site/salary-increase-calculator/salary-increase-calculator.css";
import "./overtime-salary-calculator.css";

function formatGrossField(value: number): string {
  return formatAmountForInput(value);
}

type SalaryEntryMode = "monthly" | "net";

export default function OvertimeSalaryCalculator() {
  const { setResult } = useCalculatorSlot();

  const [grossMonthly, setGrossMonthly] = useState("");
  const [netMonthly, setNetMonthly] = useState("");
  const [referenceField, setReferenceField] = useState<OvertimeSalaryReferenceField | null>(null);
  const [salaryEntryMode, setSalaryEntryMode] = useState<SalaryEntryMode>("monthly");

  const [profile, setProfile] = useState<EmploymentProfile>(DEFAULT_PROFILE);

  const [group1Hours, setGroup1Hours] = useState("");
  const [group2Hours, setGroup2Hours] = useState("");

  const [majorationMode, setMajorationMode] = useState<MajorationMode>("legal");
  const [majorationGroup1Percent, setMajorationGroup1Percent] = useState(
    String(LEGAL_MAJORATION_GROUP1),
  );
  const [majorationGroup2Percent, setMajorationGroup2Percent] = useState(
    String(LEGAL_MAJORATION_GROUP2),
  );

  const salaryValue = useMemo(() => {
    if (referenceField === "netMonthly") {
      return netMonthly;
    }
    if (referenceField === "grossMonthly") {
      return grossMonthly;
    }
    return "";
  }, [grossMonthly, netMonthly, referenceField]);

  const hasSalary = Boolean(referenceField && salaryValue.trim());

  const hasHours = useMemo(() => {
    const h1 = parseOvertimeHours(group1Hours);
    const h2 = parseOvertimeHours(group2Hours);
    if (h1 === null || h2 === null) {
      return Boolean(group1Hours.trim() || group2Hours.trim());
    }
    return h1 + h2 > 0;
  }, [group1Hours, group2Hours]);

  const calculatorInput = useMemo(
    () => ({
      referenceField,
      salaryValue,
      profile,
      group1Hours,
      group2Hours,
      majorationMode,
      majorationGroup1Percent,
      majorationGroup2Percent,
      projectionMode: "thisMonth" as const,
      projectionMonths: 1,
    }),
    [
      group1Hours,
      group2Hours,
      majorationGroup1Percent,
      majorationGroup2Percent,
      majorationMode,
      profile,
      referenceField,
      salaryValue,
    ],
  );

  const validationError = useMemo(() => {
    if (!hasSalary) {
      return null;
    }
    if (!hasHours && !group1Hours.trim() && !group2Hours.trim()) {
      return null;
    }
    return getPrimaryValidationError(calculatorInput);
  }, [calculatorInput, group1Hours, group2Hours, hasHours, hasSalary]);

  const highHoursWarning = useMemo(
    () => getHighHoursWarning(group1Hours, group2Hours),
    [group1Hours, group2Hours],
  );

  const legalMajorationOrderHint = useMemo(() => {
    if (majorationMode !== "legal") {
      return null;
    }
    return getLegalMajorationOrderHint(group1Hours, group2Hours);
  }, [group1Hours, group2Hours, majorationMode]);

  const result = useMemo(() => {
    if (validationError || !hasSalary || !hasHours) {
      return null;
    }
    return calculateOvertimeSalary(calculatorInput);
  }, [calculatorInput, hasHours, hasSalary, validationError]);

  const estimatedHourlyGross = useMemo(() => {
    if (!hasSalary || referenceField !== "grossMonthly") {
      return null;
    }
    const monthly = parseSalaryAmount(grossMonthly);
    if (monthly === null || monthly <= 0) {
      return null;
    }
    return roundCent(monthlyToHourlyGross(monthly));
  }, [grossMonthly, hasSalary, referenceField]);

  const estimatedNetMonthly = useMemo(() => {
    if (!hasSalary || referenceField !== "grossMonthly") {
      return null;
    }
    const parsed = parseSalaryAmount(grossMonthly);
    if (parsed === null || parsed <= 0) {
      return null;
    }
    const calculation = calculateSalary({
      activeInput: "grossMonthly",
      activeValue: formatGrossField(roundCent(parsed)),
      profile,
      workTimePercent: WORK_TIME_PERCENT.default,
      salaryMonths: 12,
      withholdingTaxRate: 0,
    });
    return calculation?.netMonthly ?? null;
  }, [grossMonthly, hasSalary, profile, referenceField]);

  const syncFromGrossMonthly = useCallback(
    (rawValue: string) => {
      const parsed = parseSalaryAmount(rawValue);
      if (parsed === null || parsed <= 0) {
        return;
      }
      const calculation = calculateSalary({
        activeInput: "grossMonthly",
        activeValue: rawValue.trim(),
        profile,
        workTimePercent: WORK_TIME_PERCENT.default,
        salaryMonths: 12,
        withholdingTaxRate: 0,
      });
      setGrossMonthly(rawValue);
      if (calculation) {
        setNetMonthly(formatGrossField(calculation.netMonthly));
      }
    },
    [profile],
  );

  const syncFromNetMonthly = useCallback(
    (rawValue: string) => {
      const calculation = calculateSalary({
        activeInput: "netMonthly",
        activeValue: rawValue.trim(),
        profile,
        workTimePercent: WORK_TIME_PERCENT.default,
        salaryMonths: 12,
        withholdingTaxRate: 0,
      });
      if (!calculation) {
        return;
      }
      setNetMonthly(rawValue);
      setGrossMonthly(formatGrossField(calculation.grossMonthly));
    },
    [profile],
  );

  const resyncFromReference = useCallback(
    (field: OvertimeSalaryReferenceField, rawValue: string) => {
      if (field === "grossMonthly") {
        syncFromGrossMonthly(rawValue);
      } else if (field === "netMonthly") {
        syncFromNetMonthly(rawValue);
      }
    },
    [syncFromGrossMonthly, syncFromNetMonthly],
  );

  const clearSalaryFields = () => {
    setGrossMonthly("");
    setNetMonthly("");
    setReferenceField(null);
  };

  const handleGrossMonthlyChange = (value: string) => {
    setSalaryEntryMode("monthly");
    setReferenceField(value.trim() ? "grossMonthly" : null);
    if (!value.trim()) {
      clearSalaryFields();
      return;
    }
    syncFromGrossMonthly(value);
  };

  const handleNetMonthlyChange = (value: string) => {
    setSalaryEntryMode("net");
    setReferenceField(value.trim() ? "netMonthly" : null);
    if (!value.trim()) {
      clearSalaryFields();
      return;
    }
    syncFromNetMonthly(value);
  };

  const handleProfileChange = (nextProfile: EmploymentProfile) => {
    setProfile(nextProfile);
    if (referenceField && salaryValue.trim() && referenceField !== "grossHourly") {
      resyncFromReference(referenceField, salaryValue);
    }
  };

  const handleMajorationModeChange = (mode: MajorationMode) => {
    setMajorationMode(mode);
    if (mode === "legal") {
      setMajorationGroup1Percent(String(LEGAL_MAJORATION_GROUP1));
      setMajorationGroup2Percent(String(LEGAL_MAJORATION_GROUP2));
    }
  };

  useEffect(() => {
    setResult(
      <OvertimeSalaryResults
        result={result}
        hasSalary={hasSalary}
        hasHours={hasHours}
        validationError={validationError}
        highHoursWarning={highHoursWarning}
      />,
    );
  }, [hasHours, hasSalary, highHoursWarning, result, setResult, validationError]);

  const step1Hint =
    salaryEntryMode === "net"
      ? "Votre brut mensuel sera reconstitué automatiquement."
      : "Indiquez votre salaire habituel hors heures supplémentaires.";

  const reconstitutedGross =
    salaryEntryMode === "net" && grossMonthly.trim()
      ? parseSalaryAmount(grossMonthly)
      : null;

  return (
    <div className="increase-calc calc-fields" aria-live="polite" aria-atomic="true">
      <ol className="increase-calc__steps">
        <OvertimeFormStep step={1} title="Indiquez votre salaire de base" hint={step1Hint} essential>
          {salaryEntryMode === "monthly" ? (
            <>
              <div className="increase-calc__field">
                <label htmlFor="overtimeGrossMonthly" className="calc-field-label">
                  Salaire brut mensuel de base
                </label>
                <input
                  id="overtimeGrossMonthly"
                  name="overtimeGrossMonthly"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="Ex. : 2 500 €"
                  value={grossMonthly}
                  onChange={(e) => handleGrossMonthlyChange(e.target.value)}
                  className="calc-input"
                />
              </div>

              {estimatedHourlyGross !== null ? (
                <p className="increase-calc__net-estimate">
                  Taux horaire brut estimé : <strong>{formatCurrency(estimatedHourlyGross)}</strong>
                </p>
              ) : null}

              {estimatedNetMonthly !== null ? (
                <p className="increase-calc__net-estimate">
                  Salaire net mensuel estimé avant prélèvement à la source :{" "}
                  <strong>{formatCurrency(estimatedNetMonthly)}</strong>
                </p>
              ) : null}

              <button
                type="button"
                className="increase-calc__net-toggle salary-calc__link-action"
                onClick={() => {
                  setSalaryEntryMode("net");
                  if (referenceField !== "netMonthly") {
                    clearSalaryFields();
                  }
                }}
              >
                Je connais uniquement mon salaire net
              </button>
            </>
          ) : (
            <div className="increase-calc__net-input">
              <label htmlFor="overtimeNetMonthly" className="calc-field-label">
                Salaire net mensuel avant prélèvement à la source
              </label>
              <input
                id="overtimeNetMonthly"
                name="overtimeNetMonthly"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="Ex. : 1 950 €"
                value={netMonthly}
                onChange={(e) => handleNetMonthlyChange(e.target.value)}
                className="calc-input"
              />
              {reconstitutedGross !== null ? (
                <p className="increase-calc__net-estimate">
                  Salaire brut mensuel reconstitué :{" "}
                  <strong>{formatCurrency(reconstitutedGross)}</strong>
                </p>
              ) : null}
              <button
                type="button"
                className="salary-calc__link-action"
                onClick={() => {
                  setSalaryEntryMode("monthly");
                  if (referenceField === "netMonthly") {
                    clearSalaryFields();
                  }
                }}
              >
                Je préfère renseigner mon salaire brut
              </button>
            </div>
          )}
        </OvertimeFormStep>

        <OvertimeFormStep step={2} title="Sélectionnez votre statut professionnel" essential>
          <SelectableOptionGroup legend="Statut professionnel" ariaLabel="Statut professionnel">
            {OVERTIME_EMPLOYMENT_PROFILES.map((item) => (
              <SelectableOption
                key={item.id}
                name="overtimeProfile"
                value={item.id}
                label={item.label}
                checked={profile === item.id}
                onChange={() => handleProfileChange(item.id)}
              />
            ))}
          </SelectableOptionGroup>
        </OvertimeFormStep>

        <OvertimeFormStep
          step={3}
          title="Indiquez vos heures supplémentaires"
          hint="Les 8 premières heures supplémentaires d'une semaine sont généralement majorées à 25 %, puis les suivantes à 50 %."
          essential
        >
          <div className="increase-calc__salary-row" role="group" aria-label="Heures supplémentaires">
            <div className="increase-calc__field">
              <label htmlFor="overtimeGroup1Hours" className="calc-field-label">
                {majorationMode === "legal" ? (
                  <>
                    Total d&apos;heures à 25 %{" "}
                    <span className="overtime-hours-label__period">sur le mois</span>
                  </>
                ) : (
                  <>
                    Heures au premier taux{" "}
                    <span className="overtime-hours-label__period">sur le mois</span>
                  </>
                )}
              </label>
              <input
                id="overtimeGroup1Hours"
                name="overtimeGroup1Hours"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="Ex. : 8 h"
                value={group1Hours}
                onChange={(e) => setGroup1Hours(e.target.value)}
                className="calc-input"
              />
            </div>
            <div className="increase-calc__field">
              <label htmlFor="overtimeGroup2Hours" className="calc-field-label">
                {majorationMode === "legal" ? (
                  <>
                    Total d&apos;heures à 50 %{" "}
                    <span className="overtime-hours-label__period">sur le mois</span>
                  </>
                ) : (
                  <>
                    Heures au second taux{" "}
                    <span className="overtime-hours-label__period">sur le mois</span>
                  </>
                )}
              </label>
              <input
                id="overtimeGroup2Hours"
                name="overtimeGroup2Hours"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="Ex. : 2 h"
                value={group2Hours}
                onChange={(e) => setGroup2Hours(e.target.value)}
                className="calc-input"
              />
            </div>
          </div>
          {legalMajorationOrderHint ? (
            <p className="overtime-hours-coherence" role="status">
              {legalMajorationOrderHint}
            </p>
          ) : null}
        </OvertimeFormStep>

        <OvertimeFormStep step={4} title="Choisissez votre taux de majoration">
          <SelectableOptionGroup legend="Taux de majoration" ariaLabel="Taux de majoration">
            <SelectableOption
              name="majorationMode"
              value="legal"
              label="Taux légaux"
              checked={majorationMode === "legal"}
              onChange={() => handleMajorationModeChange("legal")}
            />
            <SelectableOption
              name="majorationMode"
              value="custom"
              label="Taux de mon entreprise"
              checked={majorationMode === "custom"}
              onChange={() => handleMajorationModeChange("custom")}
            />
          </SelectableOptionGroup>

          {majorationMode === "legal" ? (
            <p className="overtime-rates-summary">
              8 premières heures : +{LEGAL_MAJORATION_GROUP1} % · heures suivantes : +
              {LEGAL_MAJORATION_GROUP2} %
            </p>
          ) : (
            <>
              <p className="increase-calc__step-hint">
                Utilisez les taux indiqués par votre convention collective, votre contrat ou votre
                fiche de paie.
              </p>
              <div
                className="increase-calc__salary-row"
                role="group"
                aria-label="Taux de majoration personnalisés"
              >
                <div className="increase-calc__field">
                  <label htmlFor="majorationGroup1" className="calc-field-label">
                    Taux de majoration du premier groupe
                  </label>
                  <input
                    id="majorationGroup1"
                    name="majorationGroup1"
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="Ex. : 25 %"
                    value={majorationGroup1Percent}
                    onChange={(e) => setMajorationGroup1Percent(e.target.value)}
                    className="calc-input"
                  />
                </div>
                <div className="increase-calc__field">
                  <label htmlFor="majorationGroup2" className="calc-field-label">
                    Taux de majoration du second groupe
                  </label>
                  <input
                    id="majorationGroup2"
                    name="majorationGroup2"
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="Ex. : 50 %"
                    value={majorationGroup2Percent}
                    onChange={(e) => setMajorationGroup2Percent(e.target.value)}
                    className="calc-input"
                  />
                </div>
              </div>
            </>
          )}
        </OvertimeFormStep>
      </ol>
    </div>
  );
}
