"use client";

import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  computeCompletedSeniorityYears,
  computeLegalEmployerComplement,
  countInclusiveCalendarDays,
  parseSickLeaveNumber,
  type LegalEmployerComplementResult,
} from "@/site/sick-leave/engine";
import { formatLongDateFr } from "@/site/dates";
import { FrenchDateInput } from "@/site/forms/FrenchDateInput";
import {
  formatCalendarDaysFr,
  formatDaysFr,
  formatYearsFr,
} from "@/site/fr-copy";
import {
  buildMaintienCopyDetail,
  buildMaintienCopySummary,
  EMPLOYER_MAINTIEN_CALCULATOR_ID,
  EMPLOYER_MAINTIEN_CCN_NOTE,
  EMPLOYER_MAINTIEN_DEFAULT_MONTHLY_GROSS,
  EMPLOYER_MAINTIEN_ELIGIBILITY_LABEL,
  EMPLOYER_MAINTIEN_EXCLUSION_NOTE,
  EMPLOYER_MAINTIEN_IJSS_FIELD_HELP,
  EMPLOYER_MAINTIEN_IJSS_FIELD_LABEL,
  EMPLOYER_MAINTIEN_METHOD_NOTE,
  EMPLOYER_MAINTIEN_NET_RESULT_NOTE,
  EMPLOYER_MAINTIEN_PRIOR_RIGHTS_QUESTION,
  EMPLOYER_MAINTIEN_PRIOR_RIGHTS_UNKNOWN_WARNING,
  EMPLOYER_MAINTIEN_RESULT_ESTIMATE_NOTE,
  EMPLOYER_MAINTIEN_ROUNDING_NOTE,
  EMPLOYER_MAINTIEN_SCOPE_DISCLAIMER,
  EMPLOYER_MAINTIEN_SIMULATED_CASE_LABEL,
  EMPLOYER_MAINTIEN_SIMULATED_CASE_VALUE,
  EMPLOYER_MAINTIEN_SOURCES,
  EMPLOYER_MAINTIEN_VARIABLE_PAY_NOTE,
  EMPLOYER_MAINTIEN_VERIFY_NOTE,
  formatEuro,
  formatEuroPrecise,
  IJSS_CALCULATOR_PATH,
  resolvePriorRightsDays,
  SALARY_DURING_SICK_LEAVE_PATH,
  type PriorRightsAnswer,
} from "./data";
import "@/site/guides/guide-tool-band.css";

type CopyState = "idle" | "copied" | "error";

function CopyButton({ label, getText }: { label: string; getText: () => string }) {
  const [state, setState] = useState<CopyState>("idle");

  async function handleCopy() {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(getText());
        setState("copied");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
    window.setTimeout(() => setState("idle"), 2000);
  }

  const statusLabel =
    state === "copied" ? "Copié" : state === "error" ? "Copie indisponible" : label;

  return (
    <button type="button" className="sick-leave-calc__copy" onClick={handleCopy} aria-label={label}>
      {statusLabel}
      <span className="visually-hidden" aria-live="polite">
        {state === "copied"
          ? "Résultat copié dans le presse-papiers."
          : state === "error"
            ? "La copie automatique n'est pas disponible."
            : ""}
      </span>
    </button>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  hint,
  error,
  suffix,
  type = "text",
  className,
  describedBy,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  error?: string | null;
  suffix?: string;
  type?: "text" | "date" | "number";
  className?: string;
  describedBy?: string;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className={`sick-leave-calc__field${className ? ` ${className}` : ""}`}>
      <label htmlFor={id}>
        {label}
        {suffix ? <span className="sick-leave-calc__suffix"> ({suffix})</span> : null}
      </label>
      {type === "date" ? (
        <FrenchDateInput
          id={id}
          value={value}
          onChange={onChange}
          ariaInvalid={Boolean(error)}
          ariaDescribedBy={
            [describedBy, hintId, errorId].filter(Boolean).join(" ") || undefined
          }
        />
      ) : (
        <input
          id={id}
          type={type}
          inputMode={type === "text" ? "decimal" : undefined}
          autoComplete="off"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            [describedBy, hintId, errorId].filter(Boolean).join(" ") || undefined
          }
        />
      )}
      {hint ? (
        <p id={hintId} className="sick-leave-calc__hint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="sick-leave-calc__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Results({
  result,
  priorRightsUnknown,
}: {
  result: LegalEmployerComplementResult;
  priorRightsUnknown: boolean;
}) {
  const live = `Montant brut estimé ${formatEuro(result.employerComplementGrossTotal)}, ${formatDaysFr(result.firstDaysCovered)} couverts à 90 %, ${formatDaysFr(result.secondDaysCovered)} couverts aux deux tiers, ${formatDaysFr(result.uncoveredDays)} sans complément légal.`;

  return (
    <div className="sick-leave-calc__results" id="maintien-resultats">
      <p className="visually-hidden" aria-live="polite" aria-atomic="true">
        {live}
      </p>

      <div className="sick-leave-calc__hero-result">
        <p className="sick-leave-calc__hero-label">
          Montant brut estimé <span className="sick-leave-calc__badge">INDICATIF</span>
        </p>
        <p className="sick-leave-calc__hero-value">
          {formatEuro(result.employerComplementGrossTotal)}
        </p>
        <p className="sick-leave-calc__hero-kicker">Complément employeur brut estimé</p>
      </div>

      <p className="sick-leave-calc__brut-note">{EMPLOYER_MAINTIEN_NET_RESULT_NOTE}</p>
      <p className="sick-leave-calc__brut-note">
        L&apos;employeur ne verse pas 90 % du salaire en plus des IJSS. Il complète
        les IJSS, et le cas échéant la part de prévoyance qu&apos;il finance, pour
        atteindre 90 % puis les deux tiers de la rémunération brute de référence.
      </p>
      <p className="sick-leave-calc__brut-note">{EMPLOYER_MAINTIEN_ROUNDING_NOTE}</p>
      <p className="sick-leave-calc__brut-note">{EMPLOYER_MAINTIEN_RESULT_ESTIMATE_NOTE}</p>
      <p className="sick-leave-calc__brut-note">{EMPLOYER_MAINTIEN_VARIABLE_PAY_NOTE}</p>

      <div className="sick-leave-calc__compare sick-leave-calc__compare--priority">
        <div className="sick-leave-calc__compare-card">
          <p className="sick-leave-calc__part-label">Jours couverts à 90 %</p>
          <p className="sick-leave-calc__compare-value">{result.firstDaysCovered}</p>
        </div>
        <div className="sick-leave-calc__compare-card">
          <p className="sick-leave-calc__part-label">Jours couverts aux deux tiers</p>
          <p className="sick-leave-calc__compare-value">{result.secondDaysCovered}</p>
        </div>
        <div className="sick-leave-calc__compare-card">
          <p className="sick-leave-calc__part-label">Jours sans complément légal</p>
          <p className="sick-leave-calc__compare-value">{result.uncoveredDays}</p>
        </div>
      </div>

      <details className="sick-leave-calc__details">
        <summary>Voir le détail du calcul</summary>
        <dl className="sick-leave-calc__secondary">
          <div>
            <dt>Éligibilité apparente au minimum légal</dt>
            <dd>{result.eligibleApparent ? "Oui" : "Non"}</dd>
          </div>
          <div>
            <dt>Ancienneté retenue au premier jour de l&apos;arrêt</dt>
            <dd>{formatYearsFr(Math.floor(result.seniorityYears))}</dd>
          </div>
          <div>
            <dt>Durée totale de l&apos;arrêt</dt>
            <dd>{formatCalendarDaysFr(result.totalCalendarDays)}</dd>
          </div>
          <div>
            <dt>Délai légal de sept jours du complément employeur</dt>
            <dd>{formatDaysFr(result.employerCarenceDays)}</dd>
          </div>
          <div>
            <dt>Premier jour théorique du complément</dt>
            <dd>
              {result.firstComplementDateIso
                ? formatLongDateFr(result.firstComplementDateIso)
                : "Aucun (arrêt trop court)"}
            </dd>
          </div>
          <div>
            <dt>Rémunération journalière estimée</dt>
            <dd>{formatEuroPrecise(result.theoreticalDailyGrossExact)}</dd>
          </div>
          <div>
            <dt>Objectif journalier à 90 %</dt>
            <dd>{formatEuroPrecise(result.firstPeriodTargetDailyExact)} brut</dd>
          </div>
          <div>
            <dt>Objectif journalier aux deux tiers</dt>
            <dd>{formatEuroPrecise(result.secondPeriodTargetDailyExact)} brut</dd>
          </div>
          <div>
            <dt>IJSS journalière brute déduite</dt>
            <dd>{formatEuro(result.dailyIjssGross)}</dd>
          </div>
          <div>
            <dt>IJSS déduites sur les jours couverts</dt>
            <dd>{formatEuro(result.ijssDeductedOnCoveredDaysGross)}</dd>
          </div>
          <div>
            <dt>Part de prévoyance déduite</dt>
            <dd>{formatEuro(result.prevoyanceDeductedOnCoveredDaysGross)}</dd>
          </div>
          <div>
            <dt>Droits consommés avant cet arrêt</dt>
            <dd>
              {formatDaysFr(result.usedFirst)} à 90 % · {formatDaysFr(result.usedSecond)} aux
              deux tiers
            </dd>
          </div>
          <div>
            <dt>Droits restant après cet arrêt</dt>
            <dd>
              {formatDaysFr(result.remainingFirstDaysAfterStop)} à 90 % ·{" "}
              {formatDaysFr(result.remainingSecondDaysAfterStop)} aux deux tiers
            </dd>
          </div>
          <div>
            <dt>Jours sans droit restant</dt>
            <dd>
              {formatDaysFr(result.uncoveredDays)} ({formatDaysFr(result.uncoveredCarenceDays)}{" "}
              de délai, {formatDaysFr(result.uncoveredAfterRightsDays)} hors droits)
            </dd>
          </div>
          <div>
            <dt>Complément brut de la première tranche</dt>
            <dd>{formatEuro(result.firstPeriodComplementGross)}</dd>
          </div>
          <div>
            <dt>Complément brut de la seconde tranche</dt>
            <dd>{formatEuro(result.secondPeriodComplementGross)}</dd>
          </div>
        </dl>
        <p className="sick-leave-calc__hint">{EMPLOYER_MAINTIEN_METHOD_NOTE}</p>
      </details>

      {priorRightsUnknown ? (
        <p className="sick-leave-calc__warning">{EMPLOYER_MAINTIEN_PRIOR_RIGHTS_UNKNOWN_WARNING}</p>
      ) : null}

      {result.alerts.map((alert) => (
        <p
          key={alert.code}
          className={
            alert.severity === "warning"
              ? "sick-leave-calc__warning"
              : "sick-leave-calc__hint"
          }
        >
          {alert.message}
        </p>
      ))}

      <p className="sick-leave-calc__warning">{EMPLOYER_MAINTIEN_CCN_NOTE}</p>
      <p className="sick-leave-calc__hint">{EMPLOYER_MAINTIEN_VERIFY_NOTE}</p>

      <div className="sick-leave-calc__actions">
        <CopyButton label="Copier le résumé" getText={() => buildMaintienCopySummary(result)} />
        <CopyButton label="Copier le détail" getText={() => buildMaintienCopyDetail(result)} />
      </div>

      <p className="sick-leave-calc__links">
        <Link href={SALARY_DURING_SICK_LEAVE_PATH}>
          Estimer votre revenu total pendant l&apos;arrêt maladie
        </Link>
        {" · "}
        <Link href={IJSS_CALCULATOR_PATH}>Calculer le montant de vos IJSS</Link>
        {" · "}
        <a href={EMPLOYER_MAINTIEN_SOURCES.l1226.href} rel="noopener noreferrer" target="_blank">
          Article L1226-1
        </a>
      </p>
    </div>
  );
}

export function EmployerMaintienCalculator() {
  const baseId = useId();
  const endHelpId = `${baseId}-end-help`;
  const ijssHelpId = `${baseId}-ijss-help`;
  const priorHelpId = `${baseId}-prior-help`;
  const resultsId = `${baseId}-results`;
  const [scopeOpen, setScopeOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [monthlyGross, setMonthlyGross] = useState(
    String(EMPLOYER_MAINTIEN_DEFAULT_MONTHLY_GROSS),
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [dailyIjss, setDailyIjss] = useState("");
  const [priorRights, setPriorRights] = useState<PriorRightsAnswer>("no");
  const [usedFirst, setUsedFirst] = useState("0");
  const [usedSecond, setUsedSecond] = useState("0");
  const [prevoyance, setPrevoyance] = useState("");
  const [eligibilityConfirmed, setEligibilityConfirmed] = useState(false);

  function handleReset() {
    setMonthlyGross(String(EMPLOYER_MAINTIEN_DEFAULT_MONTHLY_GROSS));
    setStartDate("");
    setEndDate("");
    setHireDate("");
    setDailyIjss("");
    setPriorRights("no");
    setUsedFirst("0");
    setUsedSecond("0");
    setPrevoyance("");
    setEligibilityConfirmed(false);
    setAdvancedOpen(false);
  }

  const monthlyValue = parseSickLeaveNumber(monthlyGross);
  const dailyIjssValue = parseSickLeaveNumber(dailyIjss);
  const usedFirstValue = parseSickLeaveNumber(usedFirst);
  const usedSecondValue = parseSickLeaveNumber(usedSecond);
  const prevoyanceValue =
    prevoyance.trim() === "" ? 0 : parseSickLeaveNumber(prevoyance);
  const missingCore = !startDate || !endDate || !hireDate || dailyIjss.trim() === "";
  const seniorityYears =
    startDate && hireDate ? computeCompletedSeniorityYears(hireDate, startDate) : null;
  const priorResolved =
    usedFirstValue !== null && usedSecondValue !== null
      ? resolvePriorRightsDays(priorRights, usedFirstValue, usedSecondValue)
      : null;

  let fieldError: string | null = null;
  let result: LegalEmployerComplementResult | null = null;

  if (monthlyValue === null || monthlyValue < 0) {
    fieldError = "Indiquez un salaire brut mensuel valide.";
  } else if (missingCore) {
    fieldError = null;
  } else if (dailyIjssValue === null || dailyIjssValue < 0) {
    fieldError = "Indiquez une IJSS journalière brute valide, ou calculez-la via le lien.";
  } else if (priorRights === "yes" && (usedFirstValue === null || usedFirstValue < 0)) {
    fieldError = "Indiquez un nombre de jours déjà utilisés à 90 % valide.";
  } else if (priorRights === "yes" && (usedSecondValue === null || usedSecondValue < 0)) {
    fieldError = "Indiquez un nombre de jours déjà utilisés aux deux tiers valide.";
  } else if (prevoyanceValue === null || prevoyanceValue < 0) {
    fieldError = "Indiquez une prestation journalière de prévoyance valide, ou laissez vide.";
  } else if (seniorityYears === null) {
    fieldError =
      "La date d'entrée doit être antérieure ou égale au premier jour de l'arrêt.";
  } else if (countInclusiveCalendarDays(startDate, endDate) === null) {
    fieldError =
      "Impossible de calculer avec ces dates. Vérifiez que la fin est postérieure ou égale au début.";
  } else {
    result = computeLegalEmployerComplement({
      monthlyGrossUsual: monthlyValue,
      stopStartIso: startDate,
      stopEndIso: endDate,
      seniorityYears,
      eligibilityConfirmed,
      dailyIjssGross: dailyIjssValue,
      employerPrevoyanceDailyGross: prevoyanceValue,
      daysAlreadyUsedFirstPeriod: priorResolved?.usedFirst ?? 0,
      daysAlreadyUsedSecondPeriod: priorResolved?.usedSecond ?? 0,
    });
    if (!result) {
      fieldError =
        "Impossible de calculer avec ces montants ou ces dates. Vérifiez les valeurs saisies.";
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = document.getElementById(resultsId);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      id={EMPLOYER_MAINTIEN_CALCULATOR_ID}
      className="guide-tool-band"
      aria-labelledby={`${baseId}-title`}
    >
      <form className="sick-leave-calc" onSubmit={handleSubmit}>
        <header className="sick-leave-calc__header">
          <h2 id={`${baseId}-title`} className="sick-leave-calc__title">
            Simulateur du maintien légal employeur
          </h2>
          <p className="sick-leave-calc__intro">
            Estimez le complément minimal dû par l&apos;employeur dans le secteur
            privé, après déduction des IJSS.
          </p>
          <div className="sick-leave-calc__case" role="note">
            <p className="sick-leave-calc__case-kicker">
              {EMPLOYER_MAINTIEN_SIMULATED_CASE_LABEL}
            </p>
            <p className="sick-leave-calc__case-value">
              {EMPLOYER_MAINTIEN_SIMULATED_CASE_VALUE}
            </p>
          </div>
          <p className="sick-leave-calc__case-note">{EMPLOYER_MAINTIEN_CCN_NOTE}</p>
          <details
            className="sick-leave-calc__scope"
            open={scopeOpen}
            onToggle={(event) =>
              setScopeOpen((event.currentTarget as HTMLDetailsElement).open)
            }
          >
            <summary aria-expanded={scopeOpen}>Ce que calcule cet outil</summary>
            <p>{EMPLOYER_MAINTIEN_SCOPE_DISCLAIMER}</p>
            <p>{EMPLOYER_MAINTIEN_EXCLUSION_NOTE}</p>
          </details>
        </header>

        <fieldset className="sick-leave-calc__fieldset">
          <legend>1. Salaire et dates</legend>
          <Field
            id={`${baseId}-gross`}
            label="Salaire brut mensuel habituel"
            suffix="€"
            value={monthlyGross}
            onChange={setMonthlyGross}
            hint="Rémunération brute que vous auriez perçue en travaillant, avant retenue d'absence."
            className="sick-leave-calc__field--full"
          />
          <div className="sick-leave-calc__dates-grid">
            <Field
              id={`${baseId}-start`}
              label="Date de début de l'arrêt"
              type="date"
              value={startDate}
              onChange={setStartDate}
            />
            <Field
              id={`${baseId}-end`}
              label="Date de fin de l'arrêt incluse"
              type="date"
              value={endDate}
              onChange={setEndDate}
              describedBy={endHelpId}
            />
          </div>
          <p id={endHelpId} className="sick-leave-calc__dates-help">
            La date de fin est incluse dans le décompte.
          </p>
        </fieldset>

        <fieldset className="sick-leave-calc__fieldset">
          <legend>2. Ancienneté</legend>
          <Field
            id={`${baseId}-hire`}
            label="Date d'entrée dans l'entreprise"
            type="date"
            value={hireDate}
            onChange={setHireDate}
            hint="L'ancienneté est calculée au premier jour de l'absence, en années révolues."
            className="sick-leave-calc__field--full"
          />
        </fieldset>

        <fieldset className="sick-leave-calc__fieldset">
          <legend>3. IJSS</legend>
          <Field
            id={`${baseId}-ijss`}
            label={EMPLOYER_MAINTIEN_IJSS_FIELD_LABEL}
            value={dailyIjss}
            onChange={setDailyIjss}
            describedBy={ijssHelpId}
            className="sick-leave-calc__field--full"
          />
          <p id={ijssHelpId} className="sick-leave-calc__hint">
            {EMPLOYER_MAINTIEN_IJSS_FIELD_HELP}{" "}
            <Link href={IJSS_CALCULATOR_PATH}>Calculer le montant de vos IJSS</Link>.
          </p>
        </fieldset>

        <fieldset className="sick-leave-calc__fieldset">
          <legend>4. Droits déjà utilisés</legend>
          <fieldset className="sick-leave-calc__choice" aria-describedby={priorHelpId}>
            <legend className="sick-leave-calc__choice-legend">
              {EMPLOYER_MAINTIEN_PRIOR_RIGHTS_QUESTION}
            </legend>
            <div className="sick-leave-calc__toggle sick-leave-calc__toggle--3">
              {(
                [
                  ["no", "Non"],
                  ["yes", "Oui"],
                  ["unknown", "Je ne sais pas"],
                ] as const
              ).map(([value, label]) => (
                <label
                  key={value}
                  className={`sick-leave-calc__mode${priorRights === value ? " sick-leave-calc__mode--active" : ""}`}
                >
                  <input
                    type="radio"
                    name={`${baseId}-prior`}
                    value={value}
                    checked={priorRights === value}
                    onChange={() => setPriorRights(value)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
          <p id={priorHelpId} className="sick-leave-calc__hint">
            Les droits se décomptent sur les douze mois précédant le début de cet
            arrêt, pas du 1er janvier au 31 décembre.
          </p>
          {priorRights === "unknown" ? (
            <p className="sick-leave-calc__warning">
              {EMPLOYER_MAINTIEN_PRIOR_RIGHTS_UNKNOWN_WARNING}
            </p>
          ) : null}
          {priorRights === "yes" ? (
            <div className="sick-leave-calc__grid-2">
              <Field
                id={`${baseId}-used-first`}
                label="Jours déjà utilisés dans la tranche à 90 %"
                value={usedFirst}
                onChange={setUsedFirst}
              />
              <Field
                id={`${baseId}-used-second`}
                label="Jours déjà utilisés dans la tranche aux deux tiers"
                value={usedSecond}
                onChange={setUsedSecond}
              />
            </div>
          ) : null}
        </fieldset>

        <fieldset className="sick-leave-calc__fieldset">
          <legend>5. Conditions du minimum légal</legend>
          <label className="sick-leave-calc__checkbox">
            <input
              type="checkbox"
              checked={eligibilityConfirmed}
              onChange={(event) => setEligibilityConfirmed(event.target.checked)}
            />
            <span>{EMPLOYER_MAINTIEN_ELIGIBILITY_LABEL}</span>
          </label>
          <p className="sick-leave-calc__hint">
            Cocher cette case ne certifie pas l&apos;ouverture des droits. Elle
            indique seulement que vous avez lu les conditions principales.
          </p>
          <ul className="sick-leave-calc__conditions">
            <li>Au moins un an d&apos;ancienneté au premier jour d&apos;absence</li>
            <li>Incapacité constatée par certificat médical</li>
            <li>
              Justification dans les 48 heures, sous réserve des exceptions légales
            </li>
            <li>Prise en charge par la Sécurité sociale</li>
            <li>
              Soins en France, dans l&apos;Union européenne ou dans l&apos;Espace
              économique européen
            </li>
            <li>
              Non-appartenance aux catégories exclues, et absence de fraude avérée
              visant l&apos;obtention des indemnités journalières
            </li>
          </ul>
        </fieldset>

        <details
          className="sick-leave-calc__advanced"
          open={advancedOpen}
          onToggle={(event) =>
            setAdvancedOpen((event.currentTarget as HTMLDetailsElement).open)
          }
        >
          <summary aria-expanded={advancedOpen}>Options avancées</summary>
          <div className="sick-leave-calc__advanced-body">
            <Field
              id={`${baseId}-prevoyance`}
              label="Prestation journalière brute de prévoyance financée par l'employeur"
              suffix="€"
              value={prevoyance}
              onChange={setPrevoyance}
              hint="Seule la part financée par l'employeur est déduite. Laissez vide s'il n'y en a pas."
              className="sick-leave-calc__field--full"
            />
          </div>
        </details>

        <div className="sick-leave-calc__actions">
          <button type="submit" className="sick-leave-calc__submit">
            Calculer mon maintien de salaire
          </button>
          <button type="button" className="sick-leave-calc__reset" onClick={handleReset}>
            Réinitialiser
          </button>
        </div>

        <div id={resultsId}>
          {fieldError ? (
            <p className="sick-leave-calc__error" role="alert">
              {fieldError}
            </p>
          ) : result ? (
            <Results result={result} priorRightsUnknown={priorRights === "unknown"} />
          ) : (
            <p className="sick-leave-calc__fallback" role="status">
              Indiquez votre salaire, vos dates, votre date d&apos;entrée et
              l&apos;IJSS journalière pour afficher l&apos;estimation du minimum
              légal.
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
