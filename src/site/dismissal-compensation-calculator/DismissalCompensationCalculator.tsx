"use client";

import { useEffect, useMemo, useState } from "react";
import { useCalculatorSlot } from "@/framework/SiteProvider";
import { SelectableOption, SelectableOptionGroup } from "@/site/components/SelectableOptionGroup";
import { calculateDismissalCompensation } from "./engine";
import { DismissalFormStep } from "./DismissalFormStep";
import { DismissalCompensationResults } from "./DismissalCompensationResults";
import type {
  BonusKind,
  ConventionKnowledge,
  DismissalSituation,
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
  const [hasBonus, setHasBonus] = useState(false);
  const [bonusAmount, setBonusAmount] = useState("");
  const [bonusKind, setBonusKind] = useState<BonusKind>("annual");
  const [conventionKnowledge, setConventionKnowledge] =
    useState<ConventionKnowledge>("unknown");
  const [conventionAmount, setConventionAmount] = useState("");
  const [mixedWorkTime, setMixedWorkTime] = useState(false);

  const calculatorInput = useMemo(
    () => ({
      situation,
      seniorityYears,
      seniorityMonths,
      average12Months,
      average3Months,
      hasBonus,
      bonusAmount,
      bonusKind,
      conventionKnowledge,
      conventionAmount,
      mixedWorkTime,
    }),
    [
      average12Months,
      average3Months,
      bonusAmount,
      bonusKind,
      conventionAmount,
      conventionKnowledge,
      hasBonus,
      mixedWorkTime,
      seniorityMonths,
      seniorityYears,
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
  const hasSalaryInput = Boolean(average12Months.trim());
  const opensWithoutSalary =
    situation === "grossMisconduct" ||
    mixedWorkTime ||
    (hasSeniority &&
      totalMonths !== null &&
      totalMonths < 8 &&
      situation === "standard");

  const hasInputs = hasSeniority && (hasSalaryInput || opensWithoutSalary);

  const validationError = useMemo(() => {
    if (!hasSeniority) {
      return null;
    }
    return getPrimaryValidationError(calculatorInput);
  }, [calculatorInput, hasSeniority]);

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

  const average12Label =
    totalMonths !== null && totalMonths < 12
      ? "Salaire brut moyen sur tous les mois travaillés"
      : "Salaire brut moyen des 12 derniers mois";

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
              Accident du travail ou maladie professionnelle à l&apos;origine de l&apos;inaptitude.
              Dans ce cas, le simulateur calcule au minimum le double de l&apos;indemnité légale.
            </p>
          ) : null}
          {situation === "grossMisconduct" ? (
            <p className="increase-calc__step-hint">
              Dans le cas général, la faute grave ou la faute lourde prive le salarié de
              l&apos;indemnité légale de licenciement.
            </p>
          ) : null}
        </DismissalFormStep>

        <DismissalFormStep
          step={2}
          title="Indiquez votre ancienneté"
          hint="L'ancienneté servant au montant est généralement calculée jusqu'à la fin du préavis, même lorsqu'il n'est pas effectué dans certains cas."
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
          hint="Le calculateur retiendra automatiquement la moyenne la plus avantageuse."
          essential
        >
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
          ) : (
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
              <SelectableOptionGroup
                legend="Périodicité de la prime"
                ariaLabel="Périodicité de la prime"
              >
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
          )}
        </DismissalFormStep>

        <DismissalFormStep step={4} title="Vérification conventionnelle">
          <SelectableOptionGroup
            legend="Votre convention collective prévoit-elle un montant plus favorable ?"
            ariaLabel="Convention collective"
          >
            <SelectableOption
              name="conventionKnowledge"
              value="unknown"
              label="Je ne sais pas"
              checked={conventionKnowledge === "unknown"}
              onChange={() => setConventionKnowledge("unknown")}
            />
            <SelectableOption
              name="conventionKnowledge"
              value="no"
              label="Non"
              checked={conventionKnowledge === "no"}
              onChange={() => setConventionKnowledge("no")}
            />
            <SelectableOption
              name="conventionKnowledge"
              value="yes"
              label="Oui"
              checked={conventionKnowledge === "yes"}
              onChange={() => setConventionKnowledge("yes")}
            />
          </SelectableOptionGroup>

          {conventionKnowledge === "unknown" ? (
            <p className="increase-calc__step-hint">
              Vérifiez votre convention collective : elle peut prévoir une indemnité plus élevée.
            </p>
          ) : null}

          {conventionKnowledge === "yes" ? (
            <div className="increase-calc__field">
              <label htmlFor="conventionAmount" className="calc-field-label">
                Montant conventionnel connu (facultatif)
              </label>
              <input
                id="conventionAmount"
                name="conventionAmount"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="Ex. : 10 000 €"
                value={conventionAmount}
                onChange={(e) => setConventionAmount(e.target.value)}
                className="calc-input"
              />
            </div>
          ) : null}

          <label className="dismissal-checkbox">
            <input
              type="checkbox"
              checked={mixedWorkTime}
              onChange={(e) => setMixedWorkTime(e.target.checked)}
            />
            <span>J&apos;ai alterné temps plein et temps partiel</span>
          </label>
          {mixedWorkTime ? (
            <p className="increase-calc__step-hint">
              Le calcul doit être ventilé selon les périodes travaillées à temps plein et à temps
              partiel. Cette version simple ne couvre pas encore cette situation.
            </p>
          ) : null}
        </DismissalFormStep>
      </ol>
    </div>
  );
}
