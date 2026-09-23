"use client";

import { useId, useState } from "react";
import Link from "next/link";
import {
  calculateSickLeaveSalary,
  countInclusiveCalendarDays,
  getIjssUnsupportedReason,
  parseSickLeaveNumber,
  type IjssCarenceMode,
  type SickLeaveCalculationResult,
} from "@/site/sick-leave";
import {
  buildIjssCopyDetail,
  buildIjssCopySummary,
  formatEuro,
  IJSS_CALCULATOR_ID,
  IJSS_DEFAULT_MONTHLY_GROSS,
  IJSS_PERIMETER_FOLLOW,
  IJSS_PERIMETER_KICKER,
  IJSS_PERIMETER_VALUE,
  IJSS_RESULT_NOTE,
  IJSS_SCOPE_DISCLAIMER,
  IJSS_SOURCES,
  SALARY_DURING_SICK_LEAVE_PATH,
  CSG_RATE_ON_IJSS,
  CRDS_RATE_ON_IJSS,
} from "./data";
import { FrenchDateInput } from "@/site/forms/FrenchDateInput";
import "./ijss-calculator.css";

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
  const socialLevies = Math.round(
    (result.ijssGrossTotal - result.ijssNetIndicativeTotal) * 100,
  ) / 100;
  const live = `IJSS journalière brute ${formatEuro(result.dailyIjssGross)}, ${result.ijssIndemnifiedDays} jours indemnisés, total brut ${formatEuro(result.ijssGrossTotal)}, après CSG et CRDS ${formatEuro(result.ijssNetIndicativeTotal)}.`;

  return (
    <div className="sick-leave-calc__results">
      <p className="visually-hidden" aria-live="polite" aria-atomic="true">
        {live}
      </p>

      <div className="sick-leave-calc__hero-result">
        <p className="sick-leave-calc__hero-label">
          Total des IJSS brutes{" "}
          <span className="sick-leave-calc__badge">INDICATIF</span>
        </p>
        <p className="sick-leave-calc__hero-value">{formatEuro(result.ijssGrossTotal)}</p>
      </div>

      <div className="sick-leave-calc__parts">
        <div className="sick-leave-calc__part-card">
          <p className="sick-leave-calc__part-label">IJ journalière brute estimée</p>
          <p className="sick-leave-calc__part-value">{formatEuro(result.dailyIjssGross)}</p>
        </div>
        <div className="sick-leave-calc__part-card">
          <p className="sick-leave-calc__part-label">Nombre de jours indemnisés</p>
          <p className="sick-leave-calc__part-value">{result.ijssIndemnifiedDays}</p>
        </div>
      </div>

      <div className="sick-leave-calc__compare">
        <div className="sick-leave-calc__compare-card sick-leave-calc__compare-card--loss">
          <p className="sick-leave-calc__part-label">
            IJSS après CSG et CRDS, avant impôt{" "}
            <span className="sick-leave-calc__badge">INDICATIF</span>
          </p>
          <p className="sick-leave-calc__loss-value">
            {formatEuro(result.ijssNetIndicativeTotal)}
          </p>
        </div>
        <div className="sick-leave-calc__compare-card">
          <p className="sick-leave-calc__part-label">
            Prélèvements sociaux estimés (CSG {CSG_RATE_ON_IJSS * 100} % + CRDS{" "}
            {CRDS_RATE_ON_IJSS * 100} %)
          </p>
          <p className="sick-leave-calc__compare-value">{formatEuro(socialLevies)}</p>
        </div>
      </div>

      <p className="sick-leave-calc__brut-note">{IJSS_RESULT_NOTE}</p>

      <dl className="sick-leave-calc__secondary">
        <div>
          <dt>Durée totale de l&apos;arrêt</dt>
          <dd>{result.totalCalendarDays} jour(s) calendaire(s)</dd>
        </div>
        <div>
          <dt>Jours de carence</dt>
          <dd>{result.ijssCarenceDays}</dd>
        </div>
        <div>
          <dt>Salaire journalier de base</dt>
          <dd>{formatEuro(result.dailyBaseSalary)}</dd>
        </div>
        <div>
          <dt>Plafond mensuel retenu</dt>
          <dd>{formatEuro(result.bareme.monthlyCeiling)}</dd>
        </div>
        <div>
          <dt>Plafond officiel publié</dt>
          <dd>{formatEuro(result.bareme.maxDailyIjssGross)} par jour</dd>
        </div>
      </dl>
      {result.ceilingApplied &&
      result.dailyIjssGross !== result.bareme.maxDailyIjssGross ? (
        <p className="sick-leave-calc__hint">
          Un écart d&apos;un centime peut exister avec le relevé de la CPAM.
        </p>
      ) : null}

      {result.alerts
        .filter((alert) => !/complément|employeur|ancienneté|éligibilité/i.test(alert.message))
        .map((alert) => (
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
        <pre className="sick-leave-calc__formula">{buildIjssCopyDetail(result)}</pre>
        <dl className="sick-leave-calc__metrics">
          <div>
            <dt>Salaires retenus après plafonnement</dt>
            <dd>
              {result.cappedSalaries.map((salary) => formatEuro(salary)).join(" · ")}
            </dd>
          </div>
          <div>
            <dt>Barème appliqué</dt>
            <dd>{result.bareme.sourceLabel}</dd>
          </div>
        </dl>
      </details>

      <div className="sick-leave-calc__actions">
        <CopyButton label="Copier le résumé" getText={() => buildIjssCopySummary(result)} />
        <CopyButton label="Copier le détail" getText={() => buildIjssCopyDetail(result)} />
      </div>

      <p className="sick-leave-calc__links">
        <a href="#methodologie-sources">Méthodologie et sources</a>
        {" · "}
        <Link href={SALARY_DURING_SICK_LEAVE_PATH}>
          Estimer le salaire total pendant l&apos;arrêt
        </Link>
        {" · "}
        <Link href="/maintien-salaire-arret-maladie">
          Vérifier si votre employeur doit compléter vos IJSS
        </Link>
        {" · "}
        <a href={IJSS_SOURCES.ameli.href} rel="noopener noreferrer" target="_blank">
          Ameli
        </a>
      </p>
    </div>
  );
}

export function IjssCalculator() {
  const baseId = useId();
  const endHelpId = `${baseId}-end-help`;
  const [scopeOpen, setScopeOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [monthlyGross, setMonthlyGross] = useState(String(IJSS_DEFAULT_MONTHLY_GROSS));
  const [customRefs, setCustomRefs] = useState(false);
  const [salary1, setSalary1] = useState(String(IJSS_DEFAULT_MONTHLY_GROSS));
  const [salary2, setSalary2] = useState(String(IJSS_DEFAULT_MONTHLY_GROSS));
  const [salary3, setSalary3] = useState(String(IJSS_DEFAULT_MONTHLY_GROSS));
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [ijssCarenceMode, setIjssCarenceMode] =
    useState<IjssCarenceMode>("standard3Days");

  const monthlyValue = parseSickLeaveNumber(monthlyGross);
  const s1 = parseSickLeaveNumber(salary1);
  const s2 = parseSickLeaveNumber(salary2);
  const s3 = parseSickLeaveNumber(salary3);
  const missingDates = !startDate || !endDate;

  let fieldError: string | null = null;
  let result: SickLeaveCalculationResult | null = null;

  if (monthlyValue === null || monthlyValue < 0) {
    fieldError = "Indiquez un salaire brut mensuel valide.";
  } else if (missingDates) {
    fieldError = null;
  } else if (
    customRefs &&
    (s1 === null || s2 === null || s3 === null || s1 < 0 || s2 < 0 || s3 < 0)
  ) {
    fieldError = "Indiquez trois salaires de référence valides.";
  } else {
    result = calculateSickLeaveSalary({
      monthlyGrossUsual: monthlyValue,
      referenceSalaries: customRefs
        ? ([s1!, s2!, s3!] as [number, number, number])
        : undefined,
      stopStartIso: startDate,
      stopEndIso: endDate,
      ijssCarenceMode,
      employerComplementMode: "none",
      seniorityYears: 0,
      employerEligibilityConfirmed: false,
      subrogation: "unknown",
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
      id={IJSS_CALCULATOR_ID}
      className="guide-tool-band"
      aria-labelledby={`${baseId}-title`}
    >
      <div className="sick-leave-calc">
      <header className="sick-leave-calc__header">
        <h2 id={`${baseId}-title`} className="sick-leave-calc__title">
          Calculateur d&apos;IJSS en arrêt maladie
        </h2>
        <p className="sick-leave-calc__intro">
          Estimez l&apos;indemnité journalière brute, les jours indemnisés et le
          total versé par l&apos;Assurance Maladie.
        </p>
        <div className="sick-leave-calc__case" role="note">
          <p className="sick-leave-calc__case-kicker">{IJSS_PERIMETER_KICKER}</p>
          <p className="sick-leave-calc__case-value">{IJSS_PERIMETER_VALUE}</p>
          <p className="sick-leave-calc__case-follow">{IJSS_PERIMETER_FOLLOW}</p>
        </div>
        <details
          className="sick-leave-calc__scope"
          open={scopeOpen}
          onToggle={(event) =>
            setScopeOpen((event.currentTarget as HTMLDetailsElement).open)
          }
        >
          <summary aria-expanded={scopeOpen}>Ce que calcule cet outil</summary>
          <p>{IJSS_SCOPE_DISCLAIMER}</p>
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
          La date de fin est incluse dans le décompte. Les jours sont calendaires
          (week-ends et jours fériés compris).
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
        <p className="sick-leave-calc__hint">
          N&apos;activez l&apos;absence de carence que si vous savez qu&apos;elle
          ne s&apos;applique pas à votre arrêt (prolongation, reprise courte ou
          certaines situations liées à une ALD, selon les conditions
          officielles).
        </p>
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
          <p className="sick-leave-calc__hint">
            Le barème (plafond mensuel et IJ maximale) est choisi automatiquement
            selon la date de début de l&apos;arrêt, pour les arrêts débutant à
            compter du 1er juillet 2026. Aucune option cadre/non-cadre n&apos;est
            demandée : les taux CSG et CRDS sur les IJSS ne dépendent pas de ce
            statut.
          </p>
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
          afficher l&apos;estimation des IJSS.
        </p>
      )}
      </div>
    </section>
  );
}
