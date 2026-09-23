"use client";

import { useId, useState } from "react";
import Link from "next/link";
import {
  calculateInterimSalary,
  parseInterimNumber,
  validateIfmRatePercent,
  validateIccpRatePercent,
  type InterimCalculationResult,
  type InterimInputMode,
  INTERIM_DEFAULT_ICCP_RATE_PERCENT,
  INTERIM_DEFAULT_IFM_RATE_PERCENT,
  INTERIM_MAX_GROSS,
  INTERIM_MAX_HOURLY_RATE,
  INTERIM_MAX_HOURS,
} from "./engine";
import {
  buildInterimCopyDetail,
  buildInterimCopySummary,
  formatEuro,
  formatEuroApprox,
  INTERIM_DEFAULT_MISSION_GROSS,
  INTERIM_HS_NET_WARNING,
  INTERIM_IFM_EXCEPTIONS,
  INTERIM_NET_DISCLAIMER,
  SMIC_LABELS,
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
    <button
      type="button"
      className="interim-calc__copy"
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

function Results({ result }: { result: InterimCalculationResult }) {
  const live = `Total brut ${formatEuro(result.totalGross)}, net estimé ${formatEuroApprox(result.netEstimated)}.`;

  return (
    <div className="interim-calc__results">
      <p className="visually-hidden" aria-live="polite" aria-atomic="true">
        {live}
      </p>
      <dl className="interim-calc__metrics">
        <div>
          <dt>Rémunération brute de la mission</dt>
          <dd>{formatEuro(result.missionGross)}</dd>
        </div>
        <div>
          <dt>Indemnité de fin de mission (IFM)</dt>
          <dd className="interim-calc__addon">
            {result.ifmAmount > 0 ? `+${formatEuro(result.ifmAmount)}` : formatEuro(0)}
          </dd>
        </div>
        <div>
          <dt>Indemnité compensatrice de congés payés</dt>
          <dd className="interim-calc__addon">+{formatEuro(result.iccpAmount)}</dd>
        </div>
      </dl>

      <div className="interim-calc__total-block">
        <dl className="interim-calc__metrics interim-calc__metrics--total">
          <div>
            <dt>Total brut avec indemnités</dt>
            <dd className="interim-calc__total">{formatEuro(result.totalGross)}</dd>
          </div>
          <div>
            <dt>
              Net estimé avant prélèvement à la source
              <span className="interim-calc__badge" aria-label="indicatif">
                {" "}
                Indicatif
              </span>
            </dt>
            <dd className="interim-calc__net">{formatEuroApprox(result.netEstimated)}</dd>
          </div>
        </dl>
      </div>

      {result.expenseReimbursements > 0 ? (
        <dl className="interim-calc__metrics interim-calc__metrics--expenses">
          <div>
            <dt>Remboursements de frais professionnels (hors salaire)</dt>
            <dd>{formatEuro(result.expenseReimbursements)}</dd>
          </div>
          <div>
            <dt>Total indicatif versé, remboursements de frais compris</dt>
            <dd>
              {formatEuroApprox(result.netEstimated)} +{" "}
              {formatEuro(result.expenseReimbursements)}
            </dd>
          </div>
        </dl>
      ) : null}

      <p className="interim-calc__note" role="status">
        L&apos;IFM et l&apos;indemnité de congés payés sont en principe versées
        en fin de mission avec le dernier salaire. Ne les confondez pas avec le
        salaire de base d&apos;un mois courant. {INTERIM_NET_DISCLAIMER}
      </p>

      {result.expenseReimbursements > 0 ? (
        <p className="interim-calc__warning">
          Les remboursements de frais ne font pas partie du salaire ni de
          l&apos;assiette de l&apos;IFM. Ils sont ajoutés uniquement dans le
          total indicatif versé.
        </p>
      ) : null}

      <details className="interim-calc__details">
        <summary>Voir le détail des formules</summary>
        <pre className="interim-calc__formula">{buildInterimCopyDetail(result)}</pre>
      </details>

      <div className="interim-calc__actions">
        <CopyButton
          label="Copier le résumé"
          getText={() => buildInterimCopySummary(result)}
        />
        <CopyButton
          label="Copier le détail"
          getText={() => buildInterimCopyDetail(result)}
        />
      </div>

      <p className="interim-calc__links">
        <a href="#methodologie-sources">Méthodologie et sources</a>
        {" · "}
        <Link href="/">Calculateur brut vers net</Link>
        {" · "}
        <Link href="/calculateurs/salaire-heures-supplementaires">
          Heures supplémentaires
        </Link>
      </p>
    </div>
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
  disabled,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  error?: string | null;
  suffix?: string;
  disabled?: boolean;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className="interim-calc__field">
      <label htmlFor={id}>
        {label}
        {suffix ? <span className="interim-calc__suffix"> ({suffix})</span> : null}
      </label>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
      />
      {hint ? (
        <p id={hintId} className="interim-calc__hint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="interim-calc__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function InterimSalaryCalculator() {
  const baseId = useId();
  const [mode, setMode] = useState<InterimInputMode>("missionGross");
  const [missionGross, setMissionGross] = useState(String(INTERIM_DEFAULT_MISSION_GROSS));
  const [hourlyDisplay, setHourlyDisplay] = useState("12,31");
  const [normalHours, setNormalHours] = useState("151,67");
  const [ot25, setOt25] = useState("0");
  const [ot50, setOt50] = useState("0");
  const [otherGross, setOtherGross] = useState("0");
  const [expenses, setExpenses] = useState("0");
  const [ifmDue, setIfmDue] = useState(true);
  const [ifmCustomRateEnabled, setIfmCustomRateEnabled] = useState(false);
  const [ifmRate, setIfmRate] = useState(String(INTERIM_DEFAULT_IFM_RATE_PERCENT));
  const [iccpRate, setIccpRate] = useState(String(INTERIM_DEFAULT_ICCP_RATE_PERCENT));

  const ifmRateValue = parseInterimNumber(ifmRate);
  const iccpRateValue = parseInterimNumber(iccpRate);
  const expensesValue = parseInterimNumber(expenses);

  const effectiveCustomRate = ifmDue && ifmCustomRateEnabled;
  const ifmValidation = validateIfmRatePercent(
    effectiveCustomRate ? ifmRateValue : INTERIM_DEFAULT_IFM_RATE_PERCENT,
    ifmDue,
    effectiveCustomRate,
  );
  const iccpValidation = validateIccpRatePercent(iccpRateValue);
  const expensesError =
    expenses.trim() !== "" &&
    (expensesValue === null ||
      expensesValue < 0 ||
      expensesValue > INTERIM_MAX_GROSS)
      ? "Indiquez un montant de frais valide (positif ou nul)."
      : null;

  let fieldError: string | null = null;
  let result: InterimCalculationResult | null = null;

  if (ifmValidation.ok && iccpValidation.ok && !expensesError) {
    const expenseAmount = expensesValue ?? 0;
    if (mode === "missionGross") {
      const gross = parseInterimNumber(missionGross);
      if (gross === null) {
        fieldError = "Indiquez la rémunération brute de la mission (nombre valide).";
      } else if (gross < 0 || gross > INTERIM_MAX_GROSS) {
        fieldError = "La rémunération brute de mission dépasse la borne autorisée.";
      } else {
        result = calculateInterimSalary({
          mode: "missionGross",
          missionGross: gross,
          ifmDue,
          ifmCustomRateEnabled: effectiveCustomRate,
          ifmRatePercent: ifmValidation.value,
          iccpRatePercent: iccpValidation.value,
          expenseReimbursements: expenseAmount,
        });
      }
    } else {
      const rate = parseInterimNumber(hourlyDisplay);
      const normal = parseInterimNumber(normalHours);
      const h25 = parseInterimNumber(ot25);
      const h50 = parseInterimNumber(ot50);
      const other = parseInterimNumber(otherGross);
      if (rate === null || rate <= 0 || rate > INTERIM_MAX_HOURLY_RATE) {
        fieldError = "Indiquez un taux horaire brut valide.";
      } else if (
        normal === null ||
        normal < 0 ||
        normal > INTERIM_MAX_HOURS ||
        h25 === null ||
        h25 < 0 ||
        h25 > INTERIM_MAX_HOURS ||
        h50 === null ||
        h50 < 0 ||
        h50 > INTERIM_MAX_HOURS
      ) {
        fieldError = "Indiquez des volumes d'heures valides (positifs ou nuls).";
      } else if (other === null || other < 0 || other > INTERIM_MAX_GROSS) {
        fieldError = "Indiquez un montant valide pour les autres éléments bruts.";
      } else {
        result = calculateInterimSalary({
          mode: "hourly",
          hourlyRate: rate,
          normalHours: normal,
          overtimeHours25: h25,
          overtimeHours50: h50,
          otherGrossElements: other,
          ifmDue,
          ifmCustomRateEnabled: effectiveCustomRate,
          ifmRatePercent: ifmValidation.value,
          iccpRatePercent: iccpValidation.value,
          expenseReimbursements: expenseAmount,
        });
      }
    }
  }

  const rateError = !ifmValidation.ok ? ifmValidation.error : null;
  const iccpError = !iccpValidation.ok ? iccpValidation.error : null;
  const blockingError = rateError || iccpError || expensesError || fieldError;

  return (
    <section
      id="calculateur-salaire-interim"
      className="interim-calc"
      aria-labelledby={`${baseId}-title`}
    >
      <h2 id={`${baseId}-title`} className="interim-calc__title">
        Simulateur de salaire en intérim : brut, net, IFM et congés payés
      </h2>
      <p className="interim-calc__intro">
        Estimez le brut de mission, l&apos;IFM et l&apos;indemnité de congés
        payés, puis un net indicatif. Le calculateur ne décide pas de vos droits
        individuels.
      </p>

      <div className="interim-calc__modes" role="group" aria-label="Mode de saisie">
        <button
          type="button"
          className={
            mode === "missionGross"
              ? "interim-calc__mode interim-calc__mode--active"
              : "interim-calc__mode"
          }
          aria-pressed={mode === "missionGross"}
          aria-label="À partir du brut de mission"
          onClick={() => setMode("missionGross")}
        >
          À partir du brut de mission
        </button>
        <button
          type="button"
          className={
            mode === "hourly"
              ? "interim-calc__mode interim-calc__mode--active"
              : "interim-calc__mode"
          }
          aria-pressed={mode === "hourly"}
          aria-label="À partir du taux horaire"
          onClick={() => setMode("hourly")}
        >
          À partir du taux horaire
        </button>
      </div>

      {mode === "missionGross" ? (
        <Field
          id={`${baseId}-gross`}
          label="Rémunération brute de la mission, avant IFM et congés payés"
          suffix="€"
          value={missionGross}
          onChange={setMissionGross}
          hint="Saisissez le salaire brut correspondant au travail effectué pendant la mission, primes de salaire incluses lorsqu'elles entrent dans la rémunération brute. N'ajoutez pas l'IFM, les congés payés ni les remboursements de frais."
        />
      ) : (
        <fieldset className="interim-calc__fieldset">
          <legend>Détail horaire</legend>
          <p className="interim-calc__period-hint" id={`${baseId}-period-hint`}>
            Saisissez toutes les heures de la même période : mission complète,
            semaine ou mois. N&apos;incluez pas les heures supplémentaires dans
            les heures normales.
          </p>
          <Field
            id={`${baseId}-rate`}
            label="Taux horaire brut"
            suffix="€"
            value={hourlyDisplay}
            onChange={setHourlyDisplay}
            hint={`Le SMIC horaire actuel est ${SMIC_LABELS.hourlyGross}, mais l'égalité de rémunération peut imposer un taux plus élevé.`}
          />
          <Field
            id={`${baseId}-normal`}
            label="Heures normales, hors heures supplémentaires"
            value={normalHours}
            onChange={setNormalHours}
          />
          <Field
            id={`${baseId}-ot25`}
            label="Heures supplémentaires majorées à 25 %"
            value={ot25}
            onChange={setOt25}
            hint="Indiquez les volumes déjà qualifiés. Un accord peut fixer d'autres taux."
          />
          <Field
            id={`${baseId}-ot50`}
            label="Heures supplémentaires majorées à 50 %"
            value={ot50}
            onChange={setOt50}
          />
          <Field
            id={`${baseId}-other`}
            label="Autres éléments bruts entrant dans la rémunération de mission"
            suffix="€"
            value={otherGross}
            onChange={setOtherGross}
            hint="Incluez uniquement les primes et éléments de salaire entrant dans la rémunération brute de mission. N'y ajoutez pas les remboursements de frais professionnels."
          />
        </fieldset>
      )}

      <fieldset className="interim-calc__fieldset">
        <legend>Indemnité de fin de mission (IFM)</legend>
        <div className="interim-calc__toggle" role="group" aria-label="Inclusion de l'IFM">
          <button
            type="button"
            className={
              ifmDue
                ? "interim-calc__mode interim-calc__mode--active"
                : "interim-calc__mode"
            }
            aria-pressed={ifmDue}
            onClick={() => {
              setIfmDue(true);
            }}
          >
            Avec IFM
          </button>
          <button
            type="button"
            className={
              !ifmDue
                ? "interim-calc__mode interim-calc__mode--active"
                : "interim-calc__mode"
            }
            aria-pressed={!ifmDue}
            onClick={() => {
              setIfmDue(false);
              setIfmCustomRateEnabled(false);
            }}
          >
            Sans IFM - cas particulier
          </button>
        </div>
        {!ifmDue ? (
          <p className="interim-calc__hint">
            Dans le cas général, l&apos;IFM est due à la fin de la mission.
            Sélectionnez « Sans IFM - cas particulier » uniquement si vous savez
            qu&apos;elle n&apos;est pas due dans votre situation. Le calculateur
            ne détermine pas automatiquement vos droits. Cas souvent cités :{" "}
            {INTERIM_IFM_EXCEPTIONS.join(" ; ")}.
          </p>
        ) : (
          <p className="interim-calc__hint">
            Dans le cas général, l&apos;IFM égale 10&nbsp;% de la rémunération
            totale brute due au titre de la mission et de ses éventuels
            renouvellements, sauf dispositions conventionnelles différentes.
          </p>
        )}
      </fieldset>

      <details className="interim-calc__advanced">
        <summary>Options avancées</summary>
        <div className="interim-calc__advanced-body">
          {ifmDue ? (
            <div className="interim-calc__custom-ifm">
              <label className="interim-calc__checkbox">
                <input
                  type="checkbox"
                  checked={ifmCustomRateEnabled}
                  onChange={(event) => {
                    setIfmCustomRateEnabled(event.target.checked);
                  }}
                />
                <span>
                  Utiliser un taux d&apos;IFM prévu par mon contrat ou ma
                  convention
                </span>
              </label>
              {ifmCustomRateEnabled ? (
                <Field
                  id={`${baseId}-ifm-rate`}
                  label="Taux de l'IFM"
                  suffix="%"
                  value={ifmRate}
                  onChange={setIfmRate}
                  error={rateError}
                  hint="10 % dans le cas général. Utilisez un autre taux uniquement s'il est prévu par votre contrat de mission, une convention ou un accord applicable. Le simulateur ne vérifie pas son applicabilité."
                />
              ) : (
                <p className="interim-calc__hint">
                  Taux retenu : 10&nbsp;% (cas général). Cochez l&apos;option
                  ci-dessus uniquement pour saisir un taux différent prévu par
                  votre contrat ou convention.
                </p>
              )}
            </div>
          ) : null}
          <Field
            id={`${baseId}-iccp-rate`}
            label="Taux de l'indemnité de congés payés"
            suffix="%"
            value={iccpRate}
            onChange={setIccpRate}
            error={iccpError}
            hint="Minimum légal de 10 %. L'indemnité est calculée sur le brut de mission augmenté de l'IFM lorsque celle-ci est due."
          />
          <Field
            id={`${baseId}-expenses`}
            label="Remboursements de frais professionnels, hors salaire"
            suffix="€"
            value={expenses}
            onChange={setExpenses}
            error={expensesError}
            hint="Indiquez uniquement les remboursements correspondant réellement à des frais professionnels. Certaines primes ou indemnités peuvent recevoir un traitement différent selon leur nature et leur qualification sur le bulletin."
          />
          <p className="interim-calc__hint">{INTERIM_HS_NET_WARNING}</p>
        </div>
      </details>

      {blockingError && !result ? (
        <p className="interim-calc__error" role="alert">
          {blockingError}
        </p>
      ) : null}

      {result ? (
        <Results result={result} />
      ) : (
        <p className="interim-calc__fallback">
          Complétez les champs pour afficher le détail IFM, congés payés et net
          estimé.
        </p>
      )}
    </section>
  );
}
