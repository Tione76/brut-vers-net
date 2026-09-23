"use client";

import { useId, useState } from "react";
import Link from "next/link";
import {
  calculateSickLeaveSalary,
  countInclusiveCalendarDays,
  getIjssUnsupportedReason,
  parseSickLeaveNumber,
  type EmployerComplementMode,
  type IjssCarenceMode,
  type SickLeaveCalculationResult,
  type SubrogationMode,
} from "./engine";
import {
  buildSickLeaveCopyDetail,
  buildSickLeaveCopySummary,
  formatEuro,
  SICK_LEAVE_BRUT_TOTAL_NOTE,
  SICK_LEAVE_CALCULATOR_ID,
  SICK_LEAVE_DEFAULT_MONTHLY_GROSS,
  SICK_LEAVE_PERIMETER_FOLLOW,
  SICK_LEAVE_PERIMETER_KICKER,
  SICK_LEAVE_PERIMETER_VALUE,
  SICK_LEAVE_SCOPE_DISCLAIMER,
  SICK_LEAVE_SOURCES,
} from "./data";
import { FrenchDateInput } from "@/site/forms/FrenchDateInput";
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

function Results({ result }: { result: SickLeaveCalculationResult }) {
  const live = `Total brut estimé ${formatEuro(result.estimatedIncomeForStop)}, perte brute indicative ${formatEuro(result.estimatedLoss)}.`;

  return (
    <div className="sick-leave-calc__results">
      <p className="visually-hidden" aria-live="polite" aria-atomic="true">
        {live}
      </p>

      <div className="sick-leave-calc__hero-result">
        <p className="sick-leave-calc__hero-label">
          Total brut estimé pour la période d&apos;arrêt{" "}
          <span className="sick-leave-calc__badge">INDICATIF</span>
        </p>
        <p className="sick-leave-calc__hero-value">
          {formatEuro(result.estimatedIncomeForStop)}
        </p>
      </div>

      <div className="sick-leave-calc__parts">
        <div className="sick-leave-calc__part-card">
          <p className="sick-leave-calc__part-label">IJSS brutes sur la période</p>
          <p className="sick-leave-calc__part-value">{formatEuro(result.ijssGrossTotal)}</p>
        </div>
        <div className="sick-leave-calc__part-card">
          <p className="sick-leave-calc__part-label">Complément employeur brut estimé</p>
          <p className="sick-leave-calc__part-value">
            {formatEuro(result.employerComplementGrossTotal)}
          </p>
        </div>
      </div>

      <p className="sick-leave-calc__brut-note">{SICK_LEAVE_BRUT_TOTAL_NOTE}</p>

      <div className="sick-leave-calc__compare">
        <div className="sick-leave-calc__compare-card">
          <p className="sick-leave-calc__part-label">
            Revenu brut théorique pour la même durée
          </p>
          <p className="sick-leave-calc__compare-value">
            {formatEuro(result.habitualIncomeForPeriod)}
          </p>
        </div>
        <div className="sick-leave-calc__compare-card sick-leave-calc__compare-card--loss">
          <p className="sick-leave-calc__part-label">
            Perte brute indicative{" "}
            <span className="sick-leave-calc__badge">INDICATIF</span>
          </p>
          <p className="sick-leave-calc__loss-value">{formatEuro(result.estimatedLoss)}</p>
        </div>
      </div>

      <dl className="sick-leave-calc__secondary">
        <div>
          <dt>IJSS nettes indicatives avant prélèvement à la source</dt>
          <dd>{formatEuro(result.ijssNetIndicativeTotal)}</dd>
        </div>
        <div>
          <dt>Circuit de versement</dt>
          <dd>{result.payerLabel}</dd>
        </div>
      </dl>

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

      <details className="sick-leave-calc__details">
        <summary>Voir le détail du calcul</summary>
        <dl className="sick-leave-calc__metrics">
          <div>
            <dt>Durée totale de l&apos;arrêt</dt>
            <dd>{result.totalCalendarDays} jour(s) calendaire(s)</dd>
          </div>
          <div>
            <dt>Jours de carence IJSS</dt>
            <dd>{result.ijssCarenceDays}</dd>
          </div>
          <div>
            <dt>Jours indemnisés par la Sécurité sociale</dt>
            <dd>{result.ijssIndemnifiedDays}</dd>
          </div>
          <div>
            <dt>Salaire journalier de base retenu</dt>
            <dd>{formatEuro(result.dailyBaseSalary)}</dd>
          </div>
          <div>
            <dt>IJSS journalière brute</dt>
            <dd>{formatEuro(result.dailyIjssGross)}</dd>
          </div>
          <div>
            <dt>Jours de carence du complément employeur</dt>
            <dd>{result.employerCarenceDays}</dd>
          </div>
        </dl>
        <pre className="sick-leave-calc__formula">{buildSickLeaveCopyDetail(result)}</pre>
      </details>

      <div className="sick-leave-calc__actions">
        <CopyButton label="Copier le résumé" getText={() => buildSickLeaveCopySummary(result)} />
        <CopyButton label="Copier le détail" getText={() => buildSickLeaveCopyDetail(result)} />
      </div>

      <p className="sick-leave-calc__links">
        <a href="#methodologie-sources">Méthodologie et sources</a>
        {" · "}
        <Link href="/calcul-ijss-arret-maladie">
          Estimer d&apos;abord vos IJSS journalières
        </Link>
        {" · "}
        <Link href="/maintien-salaire-arret-maladie">
          Comprendre les conditions du maintien de salaire
        </Link>
        {" · "}
        <Link href="/">Calculateur brut vers net</Link>
        {" · "}
        <a href={SICK_LEAVE_SOURCES.ameli.href} rel="noopener noreferrer" target="_blank">
          Ameli
        </a>
      </p>
    </div>
  );
}

export function SickLeaveSalaryCalculator() {
  const baseId = useId();
  const endHelpId = `${baseId}-end-help`;
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [conditionsOpen, setConditionsOpen] = useState(false);
  const [scopeOpen, setScopeOpen] = useState(false);
  const [monthlyGross, setMonthlyGross] = useState(
    String(SICK_LEAVE_DEFAULT_MONTHLY_GROSS),
  );
  const [customRefs, setCustomRefs] = useState(false);
  const [salary1, setSalary1] = useState(String(SICK_LEAVE_DEFAULT_MONTHLY_GROSS));
  const [salary2, setSalary2] = useState(String(SICK_LEAVE_DEFAULT_MONTHLY_GROSS));
  const [salary3, setSalary3] = useState(String(SICK_LEAVE_DEFAULT_MONTHLY_GROSS));
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [ijssCarenceMode, setIjssCarenceMode] =
    useState<IjssCarenceMode>("standard3Days");
  const [employerMode, setEmployerMode] =
    useState<EmployerComplementMode>("legalMinimum");
  const [seniorityYears, setSeniorityYears] = useState("3");
  const [eligibilityConfirmed, setEligibilityConfirmed] = useState(false);
  const [usedFirst, setUsedFirst] = useState("0");
  const [usedSecond, setUsedSecond] = useState("0");
  const [customComplement, setCustomComplement] = useState("");
  const [knownAbsence, setKnownAbsence] = useState("");
  const [subrogation, setSubrogation] = useState<SubrogationMode>("unknown");

  const monthlyValue = parseSickLeaveNumber(monthlyGross);
  const seniorityValue = parseSickLeaveNumber(seniorityYears);
  const s1 = parseSickLeaveNumber(salary1);
  const s2 = parseSickLeaveNumber(salary2);
  const s3 = parseSickLeaveNumber(salary3);
  const usedFirstValue = parseSickLeaveNumber(usedFirst) ?? 0;
  const usedSecondValue = parseSickLeaveNumber(usedSecond) ?? 0;
  const customComplementValue = parseSickLeaveNumber(customComplement);
  const knownAbsenceValue =
    knownAbsence.trim() === "" ? null : parseSickLeaveNumber(knownAbsence);

  let fieldError: string | null = null;
  let result: SickLeaveCalculationResult | null = null;
  const missingDates = !startDate || !endDate;

  if (monthlyValue === null || monthlyValue < 0) {
    fieldError = "Indiquez un salaire brut mensuel valide.";
  } else if (missingDates) {
    fieldError = null;
  } else if (
    employerMode === "legalMinimum" &&
    (seniorityValue === null || seniorityValue < 0)
  ) {
    fieldError = "Indiquez une ancienneté valide en années.";
  } else if (
    customRefs &&
    (s1 === null || s2 === null || s3 === null || s1 < 0 || s2 < 0 || s3 < 0)
  ) {
    fieldError = "Indiquez trois salaires de référence valides.";
  } else if (
    employerMode === "customAmount" &&
    (customComplementValue === null || customComplementValue < 0)
  ) {
    fieldError = "Indiquez le complément brut connu, ou choisissez un autre mode.";
  } else if (knownAbsenceValue !== null && knownAbsenceValue < 0) {
    fieldError = "La retenue brute pour absence ne peut pas être négative.";
  } else {
    result = calculateSickLeaveSalary({
      monthlyGrossUsual: monthlyValue,
      referenceSalaries: customRefs
        ? ([s1, s2, s3] as [number, number, number])
        : undefined,
      stopStartIso: startDate,
      stopEndIso: endDate,
      ijssCarenceMode,
      employerComplementMode: employerMode,
      seniorityYears: seniorityValue ?? 0,
      employerEligibilityConfirmed: eligibilityConfirmed,
      daysAlreadyUsedFirstPeriod: usedFirstValue,
      daysAlreadyUsedSecondPeriod: usedSecondValue,
      customEmployerComplementGross:
        employerMode === "customAmount" ? customComplementValue ?? undefined : undefined,
      knownAbsenceDeductionGross: knownAbsenceValue,
      subrogation,
    });
    if (!result) {
      const datesOk =
        countInclusiveCalendarDays(startDate, endDate) !== null;
      fieldError =
        datesOk
          ? getIjssUnsupportedReason(startDate) ??
            "Impossible de calculer avec ces dates ou montants. Vérifiez que la fin est postérieure ou égale au début."
          : "Impossible de calculer avec ces dates ou montants. Vérifiez que la fin est postérieure ou égale au début.";
    }
  }

  return (
    <section
      id={SICK_LEAVE_CALCULATOR_ID}
      className="guide-tool-band"
      aria-labelledby={`${baseId}-title`}
    >
      <div className="sick-leave-calc">
      <header className="sick-leave-calc__header">
        <h2 id={`${baseId}-title`} className="sick-leave-calc__title">
          Simulateur de salaire en arrêt maladie dans le privé
        </h2>
        <p className="sick-leave-calc__intro">
          Estimez vos IJSS brutes, le complément employeur et votre perte brute
          indicative pendant la période d&apos;arrêt.
        </p>
        <p className="sick-leave-calc__intro-note">
          Les IJSS nettes sont affichées séparément, avant prélèvement à la source.
        </p>
        <div className="sick-leave-calc__case" role="note">
          <p className="sick-leave-calc__case-kicker">{SICK_LEAVE_PERIMETER_KICKER}</p>
          <p className="sick-leave-calc__case-value">{SICK_LEAVE_PERIMETER_VALUE}</p>
          <p className="sick-leave-calc__case-follow">{SICK_LEAVE_PERIMETER_FOLLOW}</p>
        </div>
        <details
          className="sick-leave-calc__scope"
          open={scopeOpen}
          onToggle={(event) =>
            setScopeOpen((event.currentTarget as HTMLDetailsElement).open)
          }
        >
          <summary aria-expanded={scopeOpen}>Ce que calcule cet outil</summary>
          <p>{SICK_LEAVE_SCOPE_DISCLAIMER}</p>
        </details>
      </header>

      <fieldset className="sick-leave-calc__fieldset">
        <legend>Votre salaire</legend>
        <Field
          id={`${baseId}-gross`}
          label="Salaire brut mensuel habituel"
          suffix="€"
          value={monthlyGross}
          onChange={(value) => {
            setMonthlyGross(value);
            if (!customRefs) {
              setSalary1(value);
              setSalary2(value);
              setSalary3(value);
            }
          }}
          hint="Exemple de démonstration : 2 000 €. Adaptez à votre situation."
          className="sick-leave-calc__field--full"
        />
        <label className="sick-leave-calc__checkbox">
          <input
            type="checkbox"
            checked={customRefs}
            onChange={(event) => setCustomRefs(event.target.checked)}
          />
          <span>Préciser les trois derniers salaires bruts (s&apos;ils diffèrent)</span>
        </label>
        {customRefs ? (
          <div className="sick-leave-calc__grid-3">
            <Field
              id={`${baseId}-s1`}
              label="Salaire brut du mois M-1"
              suffix="€"
              value={salary1}
              onChange={setSalary1}
            />
            <Field
              id={`${baseId}-s2`}
              label="Salaire brut du mois M-2"
              suffix="€"
              value={salary2}
              onChange={setSalary2}
            />
            <Field
              id={`${baseId}-s3`}
              label="Salaire brut du mois M-3"
              suffix="€"
              value={salary3}
              onChange={setSalary3}
            />
          </div>
        ) : null}
      </fieldset>

      <fieldset className="sick-leave-calc__fieldset">
        <legend>Votre arrêt</legend>
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
        <legend>Carence des IJSS</legend>
        <div
          className="sick-leave-calc__toggle sick-leave-calc__toggle--2"
          role="group"
          aria-label="Carence IJSS"
        >
          <button
            type="button"
            className={
              ijssCarenceMode === "standard3Days"
                ? "sick-leave-calc__mode sick-leave-calc__mode--active"
                : "sick-leave-calc__mode"
            }
            aria-pressed={ijssCarenceMode === "standard3Days"}
            onClick={() => setIjssCarenceMode("standard3Days")}
          >
            Arrêt initial : 3 jours de carence
          </button>
          <button
            type="button"
            className={
              ijssCarenceMode === "waived"
                ? "sick-leave-calc__mode sick-leave-calc__mode--active"
                : "sick-leave-calc__mode"
            }
            aria-pressed={ijssCarenceMode === "waived"}
            onClick={() => setIjssCarenceMode("waived")}
          >
            Aucune carence IJSS - cas particulier
          </button>
        </div>
        <p className="sick-leave-calc__hint" id={`${baseId}-carence-help`}>
          Dans le cas général, les IJSS commencent au 4e jour. L&apos;absence de
          carence concerne notamment certaines prolongations, reprises
          inférieures ou égales à 48 heures et certains arrêts liés à une ALD,
          selon les conditions officielles.{" "}
          <a href={SICK_LEAVE_SOURCES.servicePublic.href} rel="noopener noreferrer" target="_blank">
            Voir Service-Public
          </a>
          .
        </p>
      </fieldset>

      <fieldset className="sick-leave-calc__fieldset">
        <legend>Complément employeur</legend>
        <div
          className="sick-leave-calc__toggle sick-leave-calc__toggle--3"
          role="group"
          aria-label="Mode complément employeur"
        >
          <button
            type="button"
            className={
              employerMode === "legalMinimum"
                ? "sick-leave-calc__mode sick-leave-calc__mode--active"
                : "sick-leave-calc__mode"
            }
            aria-pressed={employerMode === "legalMinimum"}
            onClick={() => setEmployerMode("legalMinimum")}
          >
            Calculer le minimum légal
          </button>
          <button
            type="button"
            className={
              employerMode === "none"
                ? "sick-leave-calc__mode sick-leave-calc__mode--active"
                : "sick-leave-calc__mode"
            }
            aria-pressed={employerMode === "none"}
            onClick={() => setEmployerMode("none")}
          >
            Ne pas inclure de complément
          </button>
          <button
            type="button"
            className={
              employerMode === "customAmount"
                ? "sick-leave-calc__mode sick-leave-calc__mode--active"
                : "sick-leave-calc__mode"
            }
            aria-pressed={employerMode === "customAmount"}
            onClick={() => setEmployerMode("customAmount")}
          >
            J&apos;indique un montant connu
          </button>
        </div>

        {employerMode === "legalMinimum" ? (
          <>
            <Field
              id={`${baseId}-seniority`}
              label="Ancienneté dans l'entreprise (années révolues)"
              value={seniorityYears}
              onChange={setSeniorityYears}
              hint="Au moins un an est requis pour le minimum légal."
            />
            <p className="sick-leave-calc__hint">
              Votre convention collective, un accord d&apos;entreprise, votre
              contrat ou une prévoyance peut prévoir un maintien plus favorable.
            </p>
          </>
        ) : null}

        {employerMode === "customAmount" ? (
          <Field
            id={`${baseId}-custom-complement`}
            label="Complément brut prévu par mon employeur"
            suffix="€"
            value={customComplement}
            onChange={setCustomComplement}
          />
        ) : null}
      </fieldset>

      {employerMode === "legalMinimum" ? (
        <fieldset className="sick-leave-calc__fieldset">
          <legend>Conditions du minimum légal</legend>
          <label className="sick-leave-calc__checkbox">
            <input
              type="checkbox"
              checked={eligibilityConfirmed}
              onChange={(event) => setEligibilityConfirmed(event.target.checked)}
            />
            <span>Je confirme remplir les autres conditions du minimum légal</span>
          </label>
          <details
            className="sick-leave-calc__mini-details"
            open={conditionsOpen}
            onToggle={(event) =>
              setConditionsOpen((event.currentTarget as HTMLDetailsElement).open)
            }
          >
            <summary aria-expanded={conditionsOpen}>Voir les conditions</summary>
            <ul className="sick-leave-calc__conditions">
              <li>
                Arrêt justifié dans le délai prévu, généralement 48 heures, sous
                réserve des exceptions légales
              </li>
              <li>Prise en charge par la Sécurité sociale</li>
              <li>
                Soins dans la zone géographique prévue par l&apos;article L1226-1
                (France, Union européenne ou État partie à l&apos;EEE)
              </li>
              <li>
                Non-appartenance aux catégories exclues (travailleur à domicile,
                saisonnier, intermittent, temporaire)
              </li>
              <li>
                Autres exclusions prévues par le texte en vigueur, notamment en
                cas de fraude avérée
              </li>
            </ul>
          </details>
        </fieldset>
      ) : null}

      <details
        className="sick-leave-calc__advanced"
        open={advancedOpen}
        onToggle={(event) =>
          setAdvancedOpen((event.currentTarget as HTMLDetailsElement).open)
        }
      >
        <summary aria-expanded={advancedOpen}>Options avancées</summary>
        <div className="sick-leave-calc__advanced-body">
          <div className="sick-leave-calc__grid-2">
            <Field
              id={`${baseId}-used-first`}
              label="Jours déjà indemnisés (1re tranche) sur 12 mois"
              value={usedFirst}
              onChange={setUsedFirst}
            />
            <Field
              id={`${baseId}-used-second`}
              label="Jours déjà indemnisés (2e tranche) sur 12 mois"
              value={usedSecond}
              onChange={setUsedSecond}
            />
          </div>
          <Field
            id={`${baseId}-absence`}
            label="Retenue brute pour absence indiquée sur mon bulletin (optionnel)"
            suffix="€"
            value={knownAbsence}
            onChange={setKnownAbsence}
            hint="Si renseignée, elle remplace la proratisation estimative pour calculer la perte."
            className="sick-leave-calc__field--full"
          />
          <fieldset className="sick-leave-calc__fieldset">
            <legend>Votre employeur pratique-t-il la subrogation ?</legend>
            <div
              className="sick-leave-calc__toggle sick-leave-calc__toggle--3"
              role="group"
              aria-label="Subrogation"
            >
              {(
                [
                  ["yes", "Oui"],
                  ["no", "Non"],
                  ["unknown", "Je ne sais pas"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={
                    subrogation === value
                      ? "sick-leave-calc__mode sick-leave-calc__mode--active"
                      : "sick-leave-calc__mode"
                  }
                  aria-pressed={subrogation === value}
                  onClick={() => setSubrogation(value)}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="sick-leave-calc__hint">
              La subrogation change le circuit de versement des IJSS, pas le
              total des droits estimés.
            </p>
          </fieldset>
        </div>
      </details>

      {fieldError ? (
        <p className="sick-leave-calc__error" role="alert">
          {fieldError}
        </p>
      ) : null}

      {result ? (
        <Results result={result} />
      ) : (
        <p className="sick-leave-calc__fallback" role="status">
          Indiquez votre salaire ainsi que les dates de début et de fin pour
          afficher l&apos;estimation.
        </p>
      )}
      </div>
    </section>
  );
}
