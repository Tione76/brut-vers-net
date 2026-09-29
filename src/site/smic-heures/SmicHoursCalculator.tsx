"use client";

import { useId, useState } from "react";
import Link from "next/link";
import {
  calculateSmicForWeeklyHours,
  FULL_TIME_CHIP_HOURS,
  PART_TIME_CHIP_HOURS,
  parseWeeklyHoursInput,
  SMIC_HOURS_DEFAULT,
  SMIC_HOURS_MAX,
  SMIC_HOURS_MIN,
  type SmicHoursResult,
} from "./engine";
import {
  buildCopySummary,
  formatEuro,
  formatHoursValue,
  formatWeeklyHoursLabel,
  SMIC_BAREME_APPLICABLE_LINE,
  SMIC_BAREME_VERIFIED_LINE,
  SMIC_HOURS_METHOD_NOTE,
} from "./data";

type CopyState = "idle" | "copied" | "error";

function CopyButton({
  label,
  getText,
}: {
  label: string;
  getText: () => string;
}) {
  const [state, setState] = useState<CopyState>("idle");

  async function handleCopy() {
    const text = getText();
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
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
    state === "copied"
      ? "Copié"
      : state === "error"
        ? "Copie indisponible"
        : label;

  return (
    <button
      type="button"
      className="smic-heures-calc__copy"
      onClick={handleCopy}
      aria-label={label}
    >
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

function ResultPanel({ result }: { result: SmicHoursResult }) {
  const liveSummary = `Pour ${formatWeeklyHoursLabel(result.weeklyHours)} : ${formatEuro(result.monthlyGross)} brut, environ ${formatEuro(result.monthlyNetEstimated)} net estimé.`;

  return (
    <div className="smic-heures-calc__results">
      <p className="visually-hidden" aria-live="polite" aria-atomic="true">
        {liveSummary}
      </p>
      <dl className="smic-heures-calc__metrics">
        <div>
          <dt>Heures mensualisées</dt>
          <dd>{formatHoursValue(result.monthlyHours)}{"\u00a0"}h</dd>
        </div>
        <div>
          <dt>Brut mensuel</dt>
          <dd>{formatEuro(result.monthlyGross)}</dd>
        </div>
        <div>
          <dt>
            Net mensuel estimé{" "}
            <span className="smic-heures-calc__badge">Indicatif</span>
          </dt>
          <dd>{formatEuro(result.monthlyNetEstimated)}</dd>
        </div>
        <div>
          <dt>Projection brute sur 12 mois (mensuel × 12)</dt>
          <dd>{formatEuro(result.annualGrossProjection)}</dd>
        </div>
        <div>
          <dt>Projection nette estimée sur 12 mois (mensuel × 12)</dt>
          <dd>{formatEuro(result.annualNetProjection)}</dd>
        </div>
      </dl>

      {result.hasOvertime ? (
        <p className="smic-heures-calc__overtime-note" role="status">
          Au-delà de 35{"\u00a0"}h :{" "}
          {result.overtimeWeeklyHours50 > 0
            ? `${formatHoursValue(result.overtimeWeeklyHours25)}\u00a0h à +${result.majorationPercent}\u00a0% et ${formatHoursValue(result.overtimeWeeklyHours50)}\u00a0h à +50\u00a0%`
            : `${formatHoursValue(result.overtimeWeeklyHours)}\u00a0h supplémentaires majorées à +${result.majorationPercent}\u00a0%`}{" "}
          (hypothèse légale à défaut d&apos;accord). Gain brut estimé des
          majorations : {formatEuro(result.overtimeGross)}.
        </p>
      ) : null}

      <p className="smic-heures-calc__validity">
        {SMIC_BAREME_APPLICABLE_LINE}. {SMIC_BAREME_VERIFIED_LINE}. Net estimé
        avant prélèvement à la source.
      </p>

      <div className="smic-heures-calc__actions">
        <CopyButton
          label="Copier le brut mensuel"
          getText={() => formatEuro(result.monthlyGross)}
        />
        <CopyButton
          label="Copier le net mensuel estimé"
          getText={() => formatEuro(result.monthlyNetEstimated)}
        />
        <CopyButton
          label="Copier le résumé"
          getText={() => buildCopySummary(result)}
        />
      </div>

      <p className="smic-heures-calc__method-link">
        <a href="#methodologie-sources">Voir la méthodologie et les sources</a>
        {" · "}
        <Link href="/calculateurs/salaire-heures-supplementaires">
          Calculateur d&apos;heures supplémentaires
        </Link>
      </p>
    </div>
  );
}

function ChipGroup({
  label,
  hours,
  weeklyHours,
  error,
  onApply,
}: {
  label: string;
  hours: readonly number[];
  weeklyHours: number;
  error: string | null;
  onApply: (hours: number) => void;
}) {
  return (
    <div className="smic-heures-calc__quick-group" role="group" aria-label={label}>
      <p className="smic-heures-calc__quick-label">{label}</p>
      {hours.map((value) => {
        const selected = weeklyHours === value && !error;
        return (
          <button
            key={value}
            type="button"
            className={
              selected
                ? "smic-heures-calc__chip smic-heures-calc__chip--active"
                : "smic-heures-calc__chip"
            }
            aria-pressed={selected}
            onClick={() => onApply(value)}
          >
            {formatWeeklyHoursLabel(value)}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Îlot client : sélecteur d'heures + résultats.
 * Les montants du tableau SSR restent disponibles sans JavaScript.
 */
export function SmicHoursCalculator() {
  const inputId = useId();
  const [weeklyHours, setWeeklyHours] = useState(SMIC_HOURS_DEFAULT);
  const [inputValue, setInputValue] = useState(String(SMIC_HOURS_DEFAULT));
  const [error, setError] = useState<string | null>(null);

  const result = calculateSmicForWeeklyHours(weeklyHours);

  function applyHours(hours: number) {
    setWeeklyHours(hours);
    setInputValue(String(hours));
    setError(null);
  }

  function handleInputChange(raw: string) {
    setInputValue(raw);
    const parsed = parseWeeklyHoursInput(raw);
    if (parsed === null) {
      setError(
        `Indiquez une durée entre ${SMIC_HOURS_MIN} et ${SMIC_HOURS_MAX} heures par semaine.`,
      );
      return;
    }
    setWeeklyHours(parsed);
    setError(null);
  }

  return (
    <section
      className="smic-heures-calc"
      aria-labelledby="smic-heures-calc-title"
    >
      <h2 id="smic-heures-calc-title" className="smic-heures-calc__title">
        Calculez votre SMIC selon vos heures
      </h2>
      <p className="smic-heures-calc__intro">
        Choisissez la durée hebdomadaire prévue au contrat. Les montants
        utilisent le SMIC actuellement applicable.
      </p>

      <div className="smic-heures-calc__quick">
        <ChipGroup
          label="Temps partiel"
          hours={PART_TIME_CHIP_HOURS}
          weeklyHours={weeklyHours}
          error={error}
          onApply={applyHours}
        />
        <ChipGroup
          label="35 h et heures supplémentaires"
          hours={FULL_TIME_CHIP_HOURS}
          weeklyHours={weeklyHours}
          error={error}
          onApply={applyHours}
        />
      </div>

      <div className="smic-heures-calc__field">
        <label htmlFor={inputId}>
          Heures par semaine ({SMIC_HOURS_MIN} à {SMIC_HOURS_MAX})
        </label>
        <input
          id={inputId}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={inputValue}
          onChange={(event) => handleInputChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : `${inputId}-hint`}
        />
        <p id={`${inputId}-hint`} className="smic-heures-calc__hint">
          Valeur par défaut : {SMIC_HOURS_DEFAULT}
          {"\u00a0"}h. Décimales acceptées (ex. 22,5).
        </p>
        {error ? (
          <p
            id={`${inputId}-error`}
            className="smic-heures-calc__error"
            role="alert"
          >
            {error}
          </p>
        ) : null}
      </div>

      {result && !error ? (
        <ResultPanel result={result} />
      ) : (
        <p className="smic-heures-calc__fallback">
          Consultez le tableau ci-dessous pour les montants de 10{"\u00a0"}h à
          44{"\u00a0"}h, disponibles sans JavaScript.
        </p>
      )}

      <p className="smic-heures-calc__footnote">{SMIC_HOURS_METHOD_NOTE}</p>
    </section>
  );
}
