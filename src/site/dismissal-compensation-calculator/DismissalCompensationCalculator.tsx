"use client";

import { useEffect, useMemo, useState } from "react";
import { useCalculatorSlot } from "@/framework/SiteProvider";
import { SelectableOption, SelectableOptionGroup } from "@/site/components/SelectableOptionGroup";
import { calculateDismissalCompensation } from "./engine";
import { DismissalFormStep } from "./DismissalFormStep";
import { DismissalCompensationResults } from "./DismissalCompensationResults";
import type {
  BonusKind,
  DismissalSituation,
  SpecialSituationKey,
} from "./types";
import { getPrimaryValidationError, parseWholeNumber } from "./validation";
import "@/site/salary-calculator-layout.css";
import "@/site/salary-increase-calculator/salary-increase-calculator.css";
import "./dismissal-compensation-calculator.css";

export default function DismissalCompensationCalculator() {
  const { setResult } = useCalculatorSlot();

  const [situation, setSituation] = useState<DismissalSituation>("standard");
  const [seniorityYears, setSeniorityYears] = useState("");
  const [seniorityMonths, setSeniorityMonths] = useState("");
  const [average12Months, setAverage12Months] = useState("");
  const [average3Months, setAverage3Months] = useState("");
  const [professionalUnfitnessAverage3Months, setProfessionalUnfitnessAverage3Months] = useState("");
  const [hasBonus, setHasBonus] = useState(false);
  const [bonusAmount, setBonusAmount] = useState("");
  const [bonusKind, setBonusKind] = useState<BonusKind>("annual");
  const [showSpecialSituations, setShowSpecialSituations] = useState(false);
  const [specialSituations, setSpecialSituations] = useState<SpecialSituationKey[]>([]);

  const calculatorInput = useMemo(
    () => ({
      situation,
      seniorityYears,
      seniorityMonths,
      average12Months,
      average3Months,
      professionalUnfitnessAverage3Months,
      hasBonus,
      bonusAmount,
      bonusKind,
      specialSituations,
    }),
    [
      average12Months,
      average3Months,
      bonusAmount,
      bonusKind,
      hasBonus,
      professionalUnfitnessAverage3Months,
      seniorityMonths,
      seniorityYears,
      specialSituations,
      situation,
    ],
  );

  const totalMonths = useMemo(() => {
    const years = parseWholeNumber(seniorityYears);
    const months = parseWholeNumber(seniorityMonths);
    if (years === null || months === null) {
      return null;
    }
    return years * 12 + months;
  }, [seniorityMonths, seniorityYears]);

  const hasSeniority = Boolean(seniorityYears.trim() || seniorityMonths.trim());
  const hasSalaryInput =
    situation === "professionalUnfitness"
      ? Boolean(professionalUnfitnessAverage3Months.trim())
      : Boolean(average12Months.trim());
  const opensWithoutSalary =
    situation === "grossMisconduct" || (hasSeniority && totalMonths !== null && totalMonths < 8);

  const hasInputs = hasSeniority && (hasSalaryInput || opensWithoutSalary);

  const validationError = useMemo(() => {
    if (!hasSeniority) {
      return null;
    }
    return getPrimaryValidationError(calculatorInput);
  }, [calculatorInput, hasSeniority]);

  useEffect(() => {
    if (situation === "professionalUnfitness") {
      setAverage12Months("");
      setAverage3Months("");
    } else {
      setProfessionalUnfitnessAverage3Months("");
    }
  }, [situation]);

  const result = useMemo(() => {
    if (!hasInputs || validationError) {
      return null;
    }
    return calculateDismissalCompensation(calculatorInput);
  }, [calculatorInput, hasInputs, validationError]);

  useEffect(() => {
    setResult(
      <DismissalCompensationResults
        result={result}
        hasInputs={hasInputs}
        validationError={validationError}
      />,
    );
  }, [hasInputs, result, setResult, validationError]);

  const average12Label = totalMonths !== null && totalMonths < 12
    ? "Salaire brut moyen sur tous les mois travaillés"
    : "Salaire brut moyen des 12 derniers mois";

  const toggleSpecialSituation = (key: SpecialSituationKey) => {
    setSpecialSituations((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  };

  return (
    <div className="increase-calc calc-fields" aria-live="polite" aria-atomic="true">
      <ol className="increase-calc__steps">
        <DismissalFormStep
          step={1}
          title="Précisez votre situation"
          hint="Le motif peut modifier ou supprimer l'indemnité légale."
          essential
        >
          <SelectableOptionGroup legend="Situation" ariaLabel="Situation de licenciement">
            <SelectableOption
              name="dismissalSituation"
              value="standard"
              label="Licenciement standard"
              checked={situation === "standard"}
              onChange={() => setSituation("standard")}
            />
            <SelectableOption
              name="dismissalSituation"
              value="professionalUnfitness"
              label="Inaptitude d'origine professionnelle"
              checked={situation === "professionalUnfitness"}
              onChange={() => setSituation("professionalUnfitness")}
            />
            <SelectableOption
              name="dismissalSituation"
              value="grossMisconduct"
              label="Faute grave ou faute lourde"
              checked={situation === "grossMisconduct"}
              onChange={() => setSituation("grossMisconduct")}
            />
          </SelectableOptionGroup>
          {situation === "professionalUnfitness" ? (
            <p className="increase-calc__step-hint">
              Accident du travail ou maladie professionnelle.
            </p>
          ) : null}
          {situation === "grossMisconduct" ? (
            <p className="increase-calc__step-hint">
              Dans le cas général, une faute grave ou lourde prive le salarié de l&apos;indemnité
              légale de licenciement. Une disposition conventionnelle plus favorable peut toutefois
              exister.
            </p>
          ) : null}
        </DismissalFormStep>

        <DismissalFormStep
          step={2}
          title="Indiquez votre ancienneté"
          hint="Indiquez l'ancienneté retenue jusqu'à la date effective de rupture, généralement à la fin du préavis. En cas de suspension ou d'interruption particulière, vérifiez la durée exacte à retenir."
          essential
        >
          <div className="increase-calc__salary-row" role="group" aria-label="Ancienneté">
            <div className="increase-calc__field">
              <label htmlFor="dismissalYears" className="calc-field-label">
                Années complètes
              </label>
              <input
                id="dismissalYears"
                name="dismissalYears"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="Ex. : 12"
                value={seniorityYears}
                onChange={(e) => setSeniorityYears(e.target.value)}
                className="calc-input"
              />
            </div>
            <div className="increase-calc__field">
              <label htmlFor="dismissalMonths" className="calc-field-label">
                Mois complets supplémentaires
              </label>
              <input
                id="dismissalMonths"
                name="dismissalMonths"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="Ex. : 9"
                value={seniorityMonths}
                onChange={(e) => setSeniorityMonths(e.target.value)}
                className="calc-input"
              />
            </div>
          </div>
        </DismissalFormStep>

        <DismissalFormStep
          step={3}
          title="Renseignez vos salaires bruts de référence"
          hint={
            situation === "professionalUnfitness"
              ? "Pour ce cas, le salaire de référence repose sur la moyenne que vous auriez perçue sur les 3 derniers mois avant la suspension."
              : "Le calculateur retiendra automatiquement la moyenne la plus avantageuse."
          }
          essential
        >
          {situation === "professionalUnfitness" ? (
            <div className="increase-calc__field">
              <label htmlFor="dismissalProfessionalAvg3" className="calc-field-label">
                Salaire brut mensuel moyen que vous auriez perçu durant les 3 derniers mois
              </label>
              <span className="dismissal-field-caption">
                Indiquez la rémunération moyenne que vous auriez normalement reçue à votre poste
                avant l&apos;arrêt lié à l&apos;accident du travail ou à la maladie professionnelle,
                en incluant les primes et avantages habituels.
              </span>
              <input
                id="dismissalProfessionalAvg3"
                name="dismissalProfessionalAvg3"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="Ex. : 2 650 €"
                value={professionalUnfitnessAverage3Months}
                onChange={(e) => setProfessionalUnfitnessAverage3Months(e.target.value)}
                className="calc-input"
              />
              {!hasBonus ? (
                <button
                  type="button"
                  className="salary-calc__link-action"
                  onClick={() => setHasBonus(true)}
                >
                  Je souhaite détailler les primes et avantages
                </button>
              ) : null}
            </div>
          ) : (
            <>
              <div
                className="increase-calc__salary-row"
                role="group"
                aria-label="Salaires bruts de référence"
              >
                <div className="increase-calc__field">
                  <label htmlFor="dismissalAvg12" className="calc-field-label">
                    {average12Label}
                  </label>
                  <span className="dismissal-field-caption">Brut mensuel moyen</span>
                  <input
                    id="dismissalAvg12"
                    name="dismissalAvg12"
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="Ex. : 2 500 €"
                    value={average12Months}
                    onChange={(e) => setAverage12Months(e.target.value)}
                    className="calc-input"
                    disabled={situation === "grossMisconduct"}
                  />
                </div>
                <div className="increase-calc__field">
                  <label htmlFor="dismissalAvg3" className="calc-field-label">
                    Salaire brut moyen des 3 derniers mois
                  </label>
                  <span className="dismissal-field-caption">Brut mensuel moyen</span>
                  <input
                    id="dismissalAvg3"
                    name="dismissalAvg3"
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="Ex. : 2 650 €"
                    value={average3Months}
                    onChange={(e) => setAverage3Months(e.target.value)}
                    className="calc-input"
                    disabled={situation === "grossMisconduct"}
                  />
                </div>
              </div>

              {!hasBonus ? (
                <button
                  type="button"
                  className="salary-calc__link-action"
                  onClick={() => setHasBonus(true)}
                  disabled={situation === "grossMisconduct"}
                >
                  J&apos;ai perçu une prime annuelle ou exceptionnelle
                </button>
              ) : null}
            </>
          )}

          {hasBonus ? (
            <div className="dismissal-bonus-block">
              <div className="increase-calc__field">
                <label htmlFor="dismissalBonus" className="calc-field-label">
                  Montant brut de la prime
                </label>
                <input
                  id="dismissalBonus"
                  name="dismissalBonus"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="Ex. : 1 200 €"
                  value={bonusAmount}
                  onChange={(e) => setBonusAmount(e.target.value)}
                  className="calc-input"
                />
              </div>
              <SelectableOptionGroup legend="Périodicité de la prime" ariaLabel="Périodicité de la prime">
                <SelectableOption
                  name="bonusKind"
                  value="annual"
                  label="Prime annuelle"
                  checked={bonusKind === "annual"}
                  onChange={() => setBonusKind("annual")}
                />
                <SelectableOption
                  name="bonusKind"
                  value="exceptional"
                  label="Prime exceptionnelle versée sur les 3 derniers mois"
                  checked={bonusKind === "exceptional"}
                  onChange={() => setBonusKind("exceptional")}
                />
              </SelectableOptionGroup>
              <button
                type="button"
                className="salary-calc__link-action"
                onClick={() => {
                  setHasBonus(false);
                  setBonusAmount("");
                }}
              >
                Masquer la prime
              </button>
            </div>
          ) : null}
        </DismissalFormStep>
      </ol>
      <section className="dismissal-special-section" aria-label="Situations particulières">
        <p className="dismissal-special-section__title">
          Votre parcours comporte-t-il une situation particulière ?
        </p>
        <label className="dismissal-checkbox">
          <input
            type="checkbox"
            checked={showSpecialSituations}
            onChange={(e) => {
              const checked = e.target.checked;
              setShowSpecialSituations(checked);
              if (!checked) {
                setSpecialSituations([]);
              }
            }}
          />
          <span>
            J&apos;ai connu une interruption ou un changement important de situation au cours de mon
            contrat
          </span>
        </label>
        {showSpecialSituations ? (
          <div className="dismissal-special-choices" role="group" aria-label="Situations particulières">
            <button
              type="button"
              className={`dismissal-chip${specialSituations.includes("mixedWorkTime") ? " dismissal-chip--selected" : ""}`}
              onClick={() => toggleSpecialSituation("mixedWorkTime")}
            >
              alternance entre temps plein et temps partiel
            </button>
            <button
              type="button"
              className={`dismissal-chip${specialSituations.includes("recentSickLeaveOrTherapeuticPartTime") ? " dismissal-chip--selected" : ""}`}
              onClick={() => toggleSpecialSituation("recentSickLeaveOrTherapeuticPartTime")}
            >
              arrêt maladie ou temps partiel thérapeutique au cours des derniers mois
            </button>
            <button
              type="button"
              className={`dismissal-chip${specialSituations.includes("partTimeParentalLeave") ? " dismissal-chip--selected" : ""}`}
              onClick={() => toggleSpecialSituation("partTimeParentalLeave")}
            >
              congé parental à temps partiel
            </button>
            <button
              type="button"
              className={`dismissal-chip${specialSituations.includes("otherContractInterruption") ? " dismissal-chip--selected" : ""}`}
              onClick={() => toggleSpecialSituation("otherContractInterruption")}
            >
              autre suspension ou interruption du contrat
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
}
