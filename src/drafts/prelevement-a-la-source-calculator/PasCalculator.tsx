"use client";

import { useEffect, useMemo, useState } from "react";
import { useCalculatorSlot } from "@/framework/SiteProvider";
import { SelectableOption, SelectableOptionGroup } from "@/site/components/SelectableOptionGroup";
import { IncreaseFormStep } from "@/site/salary-increase-calculator/IncreaseFormStep";
import { EMPLOYMENT_PROFILES, type EmploymentProfile } from "@/site/salary-calculator";
import { calculatePasWithholding } from "./engine";
import {
  PasPersonalizedForm,
  usePersonalizedPasComputation,
} from "./PasPersonalizedForm";
import { PasPersonalizedResults } from "./PasPersonalizedResults";
import { PasResults } from "./PasResults";
import {
  PersonIncomeFields,
  createEmptyPersonIncomeState,
  personHasIncome,
  resyncPersonIncomeAfterProfileChange,
  toPersonIncomeInput,
  type PersonIncomeState,
} from "./PersonIncomeFields";
import type { ChildrenCountOption, FamilySituation } from "./personnalise/types";
import { getPrimaryValidationError } from "./validation";
import "@/site/salary-calculator-layout.css";
import "@/site/salary-increase-calculator/salary-increase-calculator.css";
import "./pas-calculator.css";

type PasMode = "simple" | "personalized";

function toSimpleCalculatorInput(income: PersonIncomeState) {
  const person = toPersonIncomeInput(income);
  if (!income.useSalaryOnly) {
    return {
      taxableAnnualRaw: person.taxableAnnualRaw,
      referenceField: null,
      currentSalaryValue: "",
      profile: income.profile,
      withholdingRateMode: "auto" as const,
      manualWithholdingRate: 0,
    };
  }

  const referenceField =
    person.referenceField === "taxableAnnual" ? null : person.referenceField;

  return {
    taxableAnnualRaw: "",
    referenceField,
    currentSalaryValue: person.salaryValue,
    profile: income.profile,
    withholdingRateMode: "auto" as const,
    manualWithholdingRate: 0,
  };
}

export default function PasCalculator() {
  const { setResult } = useCalculatorSlot();
  const [mode, setMode] = useState<PasMode>("simple");

  // --- Mode simple (même saisie revenus que le mode personnalisé) ---
  const [simpleIncome, setSimpleIncome] = useState<PersonIncomeState>(createEmptyPersonIncomeState);

  // --- Mode personnalisé ---
  const [situation, setSituation] = useState<FamilySituation>("single");
  const [childrenCount, setChildrenCount] = useState<ChildrenCountOption>(0);
  const [declarant, setDeclarant] = useState<PersonIncomeState>(createEmptyPersonIncomeState);
  const [spouse, setSpouse] = useState<PersonIncomeState>(createEmptyPersonIncomeState);

  const hasSimpleIncome = personHasIncome(simpleIncome);

  const calculatorInput = useMemo(() => toSimpleCalculatorInput(simpleIncome), [simpleIncome]);

  const validationError = useMemo(() => {
    if (!hasSimpleIncome) return null;
    return getPrimaryValidationError(calculatorInput);
  }, [calculatorInput, hasSimpleIncome]);

  const simpleResult = useMemo(() => {
    if (validationError || !hasSimpleIncome) return null;
    return calculatePasWithholding(calculatorInput);
  }, [calculatorInput, hasSimpleIncome, validationError]);

  const personalized = usePersonalizedPasComputation(
    situation,
    childrenCount,
    declarant,
    spouse,
  );

  const handleSimpleProfileChange = (profile: EmploymentProfile) => {
    setSimpleIncome(resyncPersonIncomeAfterProfileChange(simpleIncome, profile));
  };

  useEffect(() => {
    if (mode === "simple") {
      setResult(
        <PasResults
          result={simpleResult}
          hasSalary={hasSimpleIncome}
          validationError={validationError}
        />,
      );
      return;
    }

    setResult(
      <PasPersonalizedResults
        result={personalized.result}
        hasIncome={personalized.hasIncome}
        validationError={personalized.validationError}
      />,
    );
  }, [
    hasSimpleIncome,
    mode,
    personalized.hasIncome,
    personalized.result,
    personalized.validationError,
    setResult,
    simpleResult,
    validationError,
  ]);

  return (
    <div className="increase-calc calc-fields pas-calc" aria-live="polite" aria-atomic="true">
      <div className="pas-calc__mode">
        <SelectableOptionGroup legend="Type de simulation" ariaLabel="Type de simulation">
          <SelectableOption
            name="pasSimulationMode"
            value="simple"
            label="Simulation simple"
            checked={mode === "simple"}
            onChange={() => setMode("simple")}
          />
          <SelectableOption
            name="pasSimulationMode"
            value="personalized"
            label="Simulation personnalisée"
            checked={mode === "personalized"}
            onChange={() => setMode("personalized")}
          />
        </SelectableOptionGroup>
        <p className="pas-calc__mode-hint">
          {mode === "simple"
            ? "Estime un taux neutre à partir de votre salaire, sans tenir compte de votre foyer."
            : "Estime un taux personnalisé à partir de votre situation familiale et des revenus du foyer."}
        </p>
      </div>

      {mode === "simple" ? (
        <ol className="increase-calc__steps">
          <PersonIncomeFields
            idPrefix="pasSimple"
            title="Indiquez votre salaire"
            stepNumber={1}
            state={simpleIncome}
            onChange={setSimpleIncome}
          />

          <IncreaseFormStep step={2} title="Choisissez votre statut">
            <SelectableOptionGroup legend="Statut professionnel" ariaLabel="Statut professionnel">
              {EMPLOYMENT_PROFILES.map((item) => (
                <SelectableOption
                  key={item.id}
                  name="pasEmploymentProfile"
                  value={item.id}
                  label={item.label}
                  checked={simpleIncome.profile === item.id}
                  onChange={() => handleSimpleProfileChange(item.id)}
                />
              ))}
            </SelectableOptionGroup>
          </IncreaseFormStep>
        </ol>
      ) : (
        <PasPersonalizedForm
          situation={situation}
          childrenCount={childrenCount}
          declarant={declarant}
          spouse={spouse}
          onSituationChange={setSituation}
          onChildrenChange={setChildrenCount}
          onDeclarantChange={setDeclarant}
          onSpouseChange={setSpouse}
        />
      )}
    </div>
  );
}
