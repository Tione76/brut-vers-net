"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { SOLDE_CONGES_CALCULATOR_ID } from "./data";
import {
  classifyOpeningBalance,
  computePayslipBalance,
  computePeriodBalance,
  estimatePeriodAcquisition,
  formatDateLongFr,
  formatDaysFr,
  localTodayIso,
  parseDayInput,
  parseIsoDate,
  parseOptionalDayInput,
  resolveReferencePeriod,
  type DateParts,
  type DayUnit,
  type PayslipBalanceResult,
  type PayslipCopyMode,
  type PayslipCounterId,
  type PayslipCounterRaw,
  type PeriodBalanceResult,
  type PeriodKind,
  type PriorRightsStatus,
} from "./engine";

type PeriodLiveResult =
  | { error: string; ouvresPartial?: boolean }
  | { value: PeriodBalanceResult };
import "./solde-conges-payes.css";
import "@/site/guides/guide-tool-band.css";

type PayslipCounterFields = PayslipCounterRaw & {
  adjOpen: boolean;
};

type DualState = {
  nMinus1: PayslipCounterFields;
  n: PayslipCounterFields;
};

type SpecialFlags = {
  sickLeave: boolean;
  workAccident: boolean;
  midHire: boolean;
  midLeave: boolean;
  parental: boolean;
  conventionalExtra: boolean;
  partTime: boolean;
  anticipation: boolean;
};

type DetailRow = {
  label: string;
  value: string;
  emphasize?: boolean;
};

const EMPTY_PAYSLIP_COUNTER: PayslipCounterFields = {
  absent: false,
  mode: "acquired-taken",
  acquired: "",
  taken: "",
  remaining: "",
  adjAcquired: "",
  adjRemaining: "",
  adjOpen: false,
};

const EMPTY_DUAL: DualState = {
  nMinus1: { ...EMPTY_PAYSLIP_COUNTER },
  n: { ...EMPTY_PAYSLIP_COUNTER },
};

function toPayslipRaw(fields: PayslipCounterFields): PayslipCounterRaw {
  return {
    absent: fields.absent,
    mode: fields.mode,
    acquired: fields.acquired,
    taken: fields.taken,
    remaining: fields.remaining,
    adjAcquired: fields.adjAcquired,
    adjRemaining: fields.adjRemaining,
  };
}

function payslipModeLabel(mode: PayslipCopyMode): string {
  return mode === "acquired-taken" ? "Acquis et pris" : "Solde restant";
}

function payslipCounterTitle(id: PayslipCounterId): string {
  return id === "nMinus1"
    ? "Congés de la période précédente (N-1)"
    : "Congés de la période en cours (N)";
}

const EMPTY_SPECIAL: SpecialFlags = {
  sickLeave: false,
  workAccident: false,
  midHire: false,
  midLeave: false,
  parental: false,
  conventionalExtra: false,
  partTime: false,
  anticipation: false,
};

const ANNOUNCEMENT_DELAY_MS = 900;

const MONTH_OPTIONS = [
  { value: 1, label: "janvier" },
  { value: 2, label: "février" },
  { value: 3, label: "mars" },
  { value: 4, label: "avril" },
  { value: 5, label: "mai" },
  { value: 6, label: "juin" },
  { value: 7, label: "juillet" },
  { value: 8, label: "août" },
  { value: 9, label: "septembre" },
  { value: 10, label: "octobre" },
  { value: 11, label: "novembre" },
  { value: 12, label: "décembre" },
];

function formatDayAmount(value: number): string {
  const abs = Math.abs(value);
  const formatted = Number.isInteger(abs)
    ? String(abs)
    : abs.toLocaleString("fr-FR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
  return value < 0 ? `−${formatted}` : formatted;
}

function dayWord(value: number): string {
  return Math.abs(value) === 0 || Math.abs(value) === 1 ? "jour" : "jours";
}

function unitAdjective(value: number, unit: DayUnit): string {
  if (unit === "ouvrables") {
    return Math.abs(value) === 1 ? "ouvrable" : "ouvrables";
  }
  return Math.abs(value) === 1 ? "ouvré" : "ouvrés";
}

function remainingAtPhrase(
  value: number,
  asOf: DateParts,
  negative: boolean,
): string {
  if (negative) {
    return `Solde au ${formatDateLongFr(asOf)}`;
  }
  const rest = Math.abs(value) === 1 ? "Restant" : "Restants";
  return `${rest} au ${formatDateLongFr(asOf)}`;
}

type IncompleteReason =
  | "unknown"
  | "empty-opening"
  | "invalid-opening"
  | "period-unverified";

function incompleteCallout(reason: IncompleteReason): string {
  switch (reason) {
    case "empty-opening":
      return "Votre solde total ne peut pas être déterminé sans vos congés restants au début de la période.";
    case "invalid-opening":
      return "Saisissez un nombre valide pour le solde de départ afin d'estimer le total.";
    case "period-unverified":
      return "La période ou la date a changé : vérifiez le solde de départ et les jours pris, puis confirmez pour afficher le total.";
    case "unknown":
    default:
      return "Votre solde total ne peut pas être déterminé sans vos congés restants au début de la période.";
  }
}

function signedDays(value: number, forcePlus = false): string {
  const absLabel = formatDaysFr(Math.abs(value));
  if (value < 0) return `− ${absLabel}`;
  if (value > 0 || forcePlus) return `+ ${absLabel}`;
  return absLabel;
}

function useSettledAnnouncement(message: string): string {
  const [settled, setSettled] = useState("");

  useEffect(() => {
    if (!message) {
      setSettled("");
      return;
    }
    const timer = window.setTimeout(() => setSettled(message), ANNOUNCEMENT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [message]);

  return settled;
}

function HelpDetails({
  summary,
  children,
}: {
  summary: string;
  children: ReactNode;
}) {
  return (
    <details className="scp-calc__help">
      <summary className="scp-calc__help-summary">{summary}</summary>
      <div className="scp-calc__help-body">{children}</div>
    </details>
  );
}

function FormStep({
  step,
  title,
  titleId,
  children,
}: {
  step: number;
  title: string;
  titleId: string;
  children: ReactNode;
}) {
  return (
    <li className="scp-calc__step" aria-labelledby={titleId}>
      <div className="scp-calc__step-marker" aria-hidden="true">
        <span className="scp-calc__step-badge">{step}</span>
      </div>
      <div className="scp-calc__step-body">
        <h4 className="scp-calc__step-title" id={titleId}>
          {title}
        </h4>
        {children}
      </div>
    </li>
  );
}

function DetailList({ rows }: { rows: DetailRow[] }) {
  return (
    <dl className="scp-calc__detail-list">
      {rows.map((row) => (
        <div
          key={`${row.label}-${row.value}`}
          className={
            row.emphasize
              ? "scp-calc__detail-row scp-calc__detail-row--total"
              : "scp-calc__detail-row"
          }
        >
          <dt>{row.label}</dt>
          <dd>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function UnderstandAccordion({
  id,
  rows,
  notes,
}: {
  id: string;
  rows: DetailRow[];
  notes?: string[];
}) {
  return (
    <details className="scp-calc__understand" id={id}>
      <summary className="scp-calc__understand-summary">Comprendre mon calcul</summary>
      <div className="scp-calc__understand-body">
        <DetailList rows={rows} />
        {notes?.map((note) => (
          <p key={note} className="scp-calc__understand-note">
            {note}
          </p>
        ))}
      </div>
    </details>
  );
}

function acquisitionMethodRows(
  result: Exclude<PeriodBalanceResult, { kind: "error" }>,
): DetailRow[] {
  const rows: DetailRow[] = [
    {
      label: "Période d'acquisition",
      value: result.period.label,
    },
    {
      label: "Début retenu pour l'acquisition",
      value: formatDateLongFr(result.method.acquisitionStart),
    },
    {
      label: "Date de calcul",
      value: formatDateLongFr(result.asOf),
    },
    {
      label: "Mois civils complets retenus",
      value: String(result.completeMonths),
    },
  ];
  if (result.unit === "ouvrables") {
    rows.push({
      label: "Taux utilisé",
      value: "2,5 jours ouvrables par mois civil complet",
    });
    rows.push({
      label: "Plafond annuel usuel",
      value: "30 jours ouvrables (droit de base, hors droits supplémentaires)",
    });
    if (result.method.rawDays !== result.acquiredCurrent) {
      rows.push({
        label: "Avant arrondi (L3141-7)",
        value: formatDaysFr(result.method.rawDays),
      });
      rows.push({
        label: "Après arrondi",
        value: formatDaysFr(result.acquiredCurrent),
      });
    }
  } else {
    rows.push({
      label: "Hypothèse jours ouvrés",
      value: "25 jours pour 12 mois complets uniquement (équivalence usuelle)",
    });
  }
  if (result.method.capped) {
    rows.push({
      label: "Plafond appliqué",
      value: "Oui (30 jours ouvrables)",
    });
  }
  return rows;
}

function acquisitionMethodNotes(
  result: Exclude<PeriodBalanceResult, { kind: "error" }>,
): string[] {
  const notes = [
    "L'estimation standard compte les mois civils complets écoulés. Le mois en cours n'est pas pris en compte. Votre compteur employeur peut donc afficher un montant différent.",
    result.acquisitionNote,
  ];
  if (result.method.assumesPresentFromPeriodStart) {
    notes.unshift(
      "Cette estimation suppose que vous étiez présent dans l'entreprise depuis le début de la période sélectionnée. En cas d'embauche en cours de période, utilisez « Signaler une situation particulière » ou le mode fiche de paie.",
    );
  } else {
    notes.unshift(
      `Début d'acquisition adapté à la date d'embauche saisie (${formatDateLongFr(result.method.acquisitionStart)}).`,
    );
  }
  return notes;
}

function PeriodResultHero({
  result,
  understandId,
  incompleteReason,
}: {
  result: Exclude<PeriodBalanceResult, { kind: "error" }>;
  understandId: string;
  incompleteReason?: IncompleteReason;
}) {
  if (result.kind === "acquired-only") {
    const rows: DetailRow[] = [
      {
        label: "Acquis estimés sur la période",
        value: formatDaysFr(result.acquiredCurrent),
        emphasize: true,
      },
      ...acquisitionMethodRows(result),
    ];

    return (
      <div className="scp-calc__hero" role="status">
        <p className="scp-calc__eyebrow">Vos jours acquis estimés</p>
        <div className="scp-calc__gain">
          <span className="scp-calc__gain-value">
            {formatDayAmount(result.acquiredCurrent)}
          </span>
          <span className="scp-calc__gain-unit">
            {dayWord(result.acquiredCurrent)}{" "}
            {unitAdjective(result.acquiredCurrent, result.unit)}
          </span>
        </div>
        <p className="scp-calc__gain-context">Sur la période en cours</p>
        <p className="scp-calc__gain-date">
          Au {formatDateLongFr(result.asOf)}
        </p>
        <p className="scp-calc__method-hint">
          Estimation sur mois civils complets (mois en cours non compté).
        </p>
        <p className="scp-calc__hero-callout">
          {incompleteCallout(incompleteReason ?? "unknown")}
        </p>
        <p className="scp-calc__hero-reserve">
          Estimation simplifiée selon vos saisies. Vérifiez votre solde sur
          votre fiche de paie.
        </p>
        <UnderstandAccordion
          id={understandId}
          rows={rows}
          notes={acquisitionMethodNotes(result)}
        />
      </div>
    );
  }

  const negative = result.remaining < 0;
  const zero = result.remaining === 0;
  const rows: DetailRow[] = [];

  rows.push({
    label: `Solde des périodes précédentes au ${formatDateLongFr(result.period.start)}`,
    value: signedDays(result.priorAvailable, true),
  });
  rows.push({
    label: "Acquis estimés sur la période",
    value: signedDays(result.acquiredCurrent, true),
  });
  if (result.takenPrior !== 0) {
    rows.push({
      label: "Pris sur congés des périodes précédentes",
      value: signedDays(-Math.abs(result.takenPrior)),
    });
  }
  if (result.takenCurrent !== 0) {
    rows.push({
      label: "Pris sur congés de la période en cours",
      value: signedDays(-Math.abs(result.takenCurrent)),
    });
  }
  if (result.carriedOver !== 0) {
    rows.push({
      label: "Reports ou crédits (non déjà inclus)",
      value: signedDays(result.carriedOver, true),
    });
  }
  if (result.adjustments !== 0) {
    rows.push({
      label: "Ajustements (non déjà inclus)",
      value: signedDays(result.adjustments, true),
    });
  }
  rows.push({
    label: "Solde estimé",
    value: formatDaysFr(result.remaining),
    emphasize: true,
  });
  rows.push(...acquisitionMethodRows(result));

  const notes = acquisitionMethodNotes(result);
  if (negative) {
    notes.unshift(
      "Solde négatif : cela peut notamment correspondre à des congés pris par anticipation ou à une régularisation.",
    );
  }

  return (
    <div
      className={negative ? "scp-calc__hero scp-calc__hero--negative" : "scp-calc__hero"}
      role="status"
    >
      <p className="scp-calc__eyebrow">
        {negative ? "Solde estimé" : "Votre solde estimé"}
      </p>
      <div className="scp-calc__gain">
        <span className="scp-calc__gain-value">
          {formatDayAmount(result.remaining)}
        </span>
        <span className="scp-calc__gain-unit">
          {dayWord(result.remaining)} {unitAdjective(result.remaining, result.unit)}
        </span>
      </div>
      <p className="scp-calc__gain-context">
        {remainingAtPhrase(result.remaining, result.asOf, negative)}
      </p>
      <p className="scp-calc__method-hint">
        Estimation sur mois civils complets (mois en cours non compté).
      </p>
      {zero ? (
        <p className="scp-calc__hero-callout">
          Votre solde estimé est nul selon les informations saisies.
        </p>
      ) : null}
      {negative ? (
        <p className="scp-calc__hero-callout">
          Votre solde estimé est négatif. Cela peut notamment correspondre à des
          congés pris par anticipation ou à une régularisation.
        </p>
      ) : null}
      <p className="scp-calc__hero-reserve">
        Estimation simplifiée selon vos saisies. Vérifiez votre solde sur votre
        fiche de paie.
      </p>
      <UnderstandAccordion id={understandId} rows={rows} notes={notes} />
    </div>
  );
}

function DualResultHero({
  result,
  unit,
  understandId,
}: {
  result: Extract<PayslipBalanceResult, { kind: "ready" }>;
  unit: DayUnit;
  understandId: string;
}) {
  const { total, nMinus1, n, both, sole } = result;
  const negative = total < 0;

  const title = both
    ? "Total des soldes renseignés"
    : sole === "nMinus1"
      ? "Solde du compteur N-1"
      : "Solde du compteur N";

  const rows: DetailRow[] = [];
  const notes: string[] = [];

  function pushCounterRows(
    label: string,
    counter: NonNullable<typeof nMinus1>,
  ) {
    rows.push({
      label: `${label} : parcours`,
      value: payslipModeLabel(counter.mode),
    });
    if (counter.mode === "acquired-taken") {
      rows.push({
        label: `${label} : jours acquis`,
        value: formatDaysFr(counter.acquired ?? 0),
      });
      rows.push({
        label: `${label} : jours pris`,
        value: formatDaysFr(counter.taken ?? 0),
      });
    } else {
      rows.push({
        label: `${label} : solde restant indiqué`,
        value: formatDaysFr(counter.remainingInput ?? 0),
      });
    }
    if (counter.adjustments !== 0) {
      rows.push({
        label: `${label} : correction`,
        value: signedDays(counter.adjustments, true),
      });
    }
    rows.push({
      label: `${label} : solde`,
      value: formatDaysFr(counter.remaining),
      emphasize: !both,
    });
  }

  if (nMinus1) pushCounterRows("N-1", nMinus1);
  if (n) pushCounterRows("N", n);
  if (both) {
    rows.push({
      label: "Total des soldes renseignés",
      value: formatDaysFr(total),
      emphasize: true,
    });
  }
  rows.push({
    label: "Unité",
    value: unit === "ouvrables" ? "Jours ouvrables" : "Jours ouvrés",
  });

  if (!both) {
    notes.push(
      "Résultat limité au compteur renseigné. Cela ne signifie pas que l'autre compteur est juridiquement inexistant.",
    );
  }
  notes.push(
    "Le total arithmétique ne signifie pas nécessairement que tous les jours sont immédiatement utilisables.",
  );
  if (negative) {
    notes.unshift(
      "Solde négatif : cela peut notamment correspondre à des congés pris par anticipation ou à une régularisation.",
    );
  }

  return (
    <div
      className={negative ? "scp-calc__hero scp-calc__hero--negative" : "scp-calc__hero"}
      role="status"
    >
      <p className="scp-calc__eyebrow">{title}</p>
      <div className="scp-calc__gain">
        <span className="scp-calc__gain-value">{formatDayAmount(total)}</span>
        <span className="scp-calc__gain-unit">
          {dayWord(total)} {unitAdjective(total, unit)}
        </span>
      </div>
      {negative ? (
        <p className="scp-calc__hero-callout">
          Votre solde calculé est négatif. Cela peut notamment correspondre à
          des congés pris par anticipation ou à une régularisation.
        </p>
      ) : null}
      {!both ? (
        <p className="scp-calc__hero-callout">
          Résultat limité au compteur{" "}
          {sole === "nMinus1" ? "N-1" : "N"}. Si l&apos;autre compteur figure
          sur votre bulletin, renseignez-le ou indiquez qu&apos;il n&apos;y
          apparaît pas.
        </p>
      ) : null}
      <p className="scp-calc__hero-reserve">
        D&apos;après les chiffres de votre bulletin. Les dates et conditions de
        prise restent à vérifier auprès de votre employeur.
      </p>
      <UnderstandAccordion id={understandId} rows={rows} notes={notes} />
    </div>
  );
}

function PayslipCounterBlock({
  idPrefix,
  counterId,
  fields,
  onChange,
}: {
  idPrefix: string;
  counterId: PayslipCounterId;
  fields: PayslipCounterFields;
  onChange: (next: PayslipCounterFields) => void;
}) {
  const title = payslipCounterTitle(counterId);
  const modeGroupId = `${idPrefix}-mode-label`;
  const adjKey = fields.mode === "acquired-taken" ? "adjAcquired" : "adjRemaining";
  const adjValue = fields[adjKey];
  const adjPanelId = `${idPrefix}-adj-panel`;

  return (
    <fieldset className="scp-calc__fieldset scp-calc__payslip-counter">
      <legend className="scp-calc__legend">{title}</legend>

      <label className="scp-calc__absent">
        <input
          type="checkbox"
          checked={fields.absent}
          onChange={(e) =>
            onChange({ ...fields, absent: e.target.checked })
          }
        />
        <span>Ce compteur n&apos;apparaît pas sur mon bulletin</span>
      </label>

      {!fields.absent ? (
        <>
          <div
            className="scp-calc__mode-group"
            role="group"
            aria-labelledby={modeGroupId}
          >
            <p className="scp-calc__mode-label" id={modeGroupId}>
              Que souhaitez-vous recopier ?
            </p>
            <div className="scp-calc__mode-row">
              <button
                type="button"
                className="scp-calc__mode-choice"
                aria-pressed={fields.mode === "acquired-taken"}
                onClick={() =>
                  onChange({ ...fields, mode: "acquired-taken" })
                }
              >
                Acquis et pris
              </button>
              <button
                type="button"
                className="scp-calc__mode-choice"
                aria-pressed={fields.mode === "remaining"}
                onClick={() => onChange({ ...fields, mode: "remaining" })}
              >
                Solde restant
              </button>
            </div>
          </div>

          {fields.mode === "acquired-taken" ? (
            <div className="scp-calc__payslip-fields">
              <div className="scp-calc__grid scp-calc__grid--2">
                <div className="scp-calc__field">
                  <label
                    className="scp-calc__label"
                    htmlFor={`${idPrefix}-acquired`}
                  >
                    Jours acquis
                  </label>
                  <input
                    id={`${idPrefix}-acquired`}
                    className="scp-calc__input"
                    inputMode="decimal"
                    value={fields.acquired}
                    onChange={(e) =>
                      onChange({ ...fields, acquired: e.target.value })
                    }
                    placeholder="Ex. 30"
                    autoComplete="off"
                  />
                </div>
                <div className="scp-calc__field">
                  <label
                    className="scp-calc__label"
                    htmlFor={`${idPrefix}-taken`}
                  >
                    Jours pris
                  </label>
                  <input
                    id={`${idPrefix}-taken`}
                    className="scp-calc__input"
                    inputMode="decimal"
                    value={fields.taken}
                    onChange={(e) =>
                      onChange({ ...fields, taken: e.target.value })
                    }
                    placeholder="Ex. 22"
                    autoComplete="off"
                  />
                </div>
              </div>
              <p className="scp-calc__hint">
                Recopiez les colonnes « Acquis » et « Pris » de ce compteur.
              </p>
              {counterId === "nMinus1" ? (
                <HelpDetails summary="Droits reportés ou solde déjà calculé ?">
                  <p>
                    Si votre bulletin indique des droits reportés avant
                    déduction des jours pris, vous pouvez les renseigner dans
                    « Jours acquis ». S&apos;il indique déjà un solde après
                    déduction, choisissez « Solde restant ».
                  </p>
                </HelpDetails>
              ) : (
                <p className="scp-calc__hint">
                  Les jours pris doivent correspondre au compteur N. Recopiez
                  les jours déjà déduits sur votre bulletin.
                </p>
              )}
            </div>
          ) : (
            <div className="scp-calc__payslip-fields">
              <div className="scp-calc__field">
                <label
                  className="scp-calc__label"
                  htmlFor={`${idPrefix}-remaining`}
                >
                  Solde restant indiqué
                </label>
                <input
                  id={`${idPrefix}-remaining`}
                  className="scp-calc__input"
                  inputMode="decimal"
                  value={fields.remaining}
                  onChange={(e) =>
                    onChange({ ...fields, remaining: e.target.value })
                  }
                  placeholder="Ex. 8"
                  autoComplete="off"
                />
              </div>
              <p className="scp-calc__hint scp-calc__hint--critical">
                Ce nombre tient déjà compte des jours pris : ne les retirez pas
                une deuxième fois.
              </p>
            </div>
          )}

          <div className="scp-calc__payslip-adj">
            <button
              type="button"
              className="scp-calc__option-trigger scp-calc__option-trigger--compact"
              aria-expanded={fields.adjOpen}
              aria-controls={adjPanelId}
              onClick={() =>
                onChange({ ...fields, adjOpen: !fields.adjOpen })
              }
            >
              <span>
                {fields.adjOpen
                  ? "Masquer la correction"
                  : "Ajouter une correction"}
              </span>
              <span
                className={
                  fields.adjOpen
                    ? "scp-calc__accordion-chevron scp-calc__accordion-chevron--open"
                    : "scp-calc__accordion-chevron"
                }
                aria-hidden="true"
              >
                ▾
              </span>
            </button>
            {fields.adjOpen ? (
              <div id={adjPanelId} className="scp-calc__payslip-adj-panel">
                <p className="scp-calc__hint">
                  Uniquement si cette correction n&apos;est pas déjà comprise
                  dans les chiffres recopiés.
                </p>
                <div className="scp-calc__field">
                  <label
                    className="scp-calc__label"
                    htmlFor={`${idPrefix}-adj`}
                  >
                    Correction en jours (+ ou −)
                  </label>
                  <input
                    id={`${idPrefix}-adj`}
                    className="scp-calc__input"
                    inputMode="decimal"
                    value={adjValue}
                    onChange={(e) =>
                      onChange({ ...fields, [adjKey]: e.target.value })
                    }
                    placeholder="Ex. -1"
                    autoComplete="off"
                  />
                </div>
              </div>
            ) : null}
            {!fields.adjOpen && adjValue.trim() !== "" ? (
              <p className="scp-calc__advanced-note">
                Correction prise en compte
              </p>
            ) : null}
          </div>
        </>
      ) : (
        <p className="scp-calc__empty scp-calc__empty--tight">
          Ce compteur est exclu du calcul. Cela ne signifie pas que les droits
          correspondants sont juridiquement inexistants.
        </p>
      )}
    </fieldset>
  );
}

export function SoldeCongesPayesCalculator() {
  const baseId = useId();
  const payslipRef = useRef<HTMLElement | null>(null);
  const [periodUnit, setPeriodUnit] = useState<DayUnit>("ouvrables");
  const [dualUnit, setDualUnit] = useState<DayUnit>("ouvrables");
  const [periodKind, setPeriodKind] = useState<PeriodKind>("june-may");
  const [customStartDay, setCustomStartDay] = useState("1");
  const [customStartMonth, setCustomStartMonth] = useState("4");
  const [asOfIso, setAsOfIso] = useState("");
  const [priorStatus, setPriorStatus] = useState<PriorRightsStatus | "">("");
  const [priorAvailable, setPriorAvailable] = useState("");
  const [takenPrior, setTakenPrior] = useState("");
  const [takenCurrent, setTakenCurrent] = useState("");
  const [carriedOver, setCarriedOver] = useState("");
  const [adjustments, setAdjustments] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [specialOpen, setSpecialOpen] = useState(false);
  const [special, setSpecial] = useState<SpecialFlags>(EMPTY_SPECIAL);
  const [hireIso, setHireIso] = useState("");
  const [leaveIso, setLeaveIso] = useState("");
  const [dual, setDual] = useState<DualState>(EMPTY_DUAL);
  const [dualOpen, setDualOpen] = useState(false);
  const [periodInputsStale, setPeriodInputsStale] = useState(false);

  useEffect(() => {
    setAsOfIso(localTodayIso());
  }, []);

  function markPeriodInputsStaleIfNeeded() {
    const hasBalanceInputs =
      priorStatus === "known" ||
      priorAvailable.trim() !== "" ||
      takenPrior.trim() !== "" ||
      takenCurrent.trim() !== "";
    if (hasBalanceInputs) setPeriodInputsStale(true);
  }

  function resetPeriodMode() {
    setPeriodKind("june-may");
    setCustomStartDay("1");
    setCustomStartMonth("4");
    setAsOfIso(localTodayIso());
    setPeriodUnit("ouvrables");
    setPriorStatus("");
    setPriorAvailable("");
    setTakenPrior("");
    setTakenCurrent("");
    setCarriedOver("");
    setAdjustments("");
    setAdvancedOpen(false);
    setSpecialOpen(false);
    setSpecial(EMPTY_SPECIAL);
    setHireIso("");
    setLeaveIso("");
    setPeriodInputsStale(false);
  }

  function resetDualMode() {
    setDual({
      nMinus1: { ...EMPTY_PAYSLIP_COUNTER },
      n: { ...EMPTY_PAYSLIP_COUNTER },
    });
    setDualUnit("ouvrables");
  }

  function onPeriodKindChange(next: PeriodKind) {
    markPeriodInputsStaleIfNeeded();
    setPeriodKind(next);
  }

  function openPayslipPanel() {
    setDualOpen(true);
    // Double rAF : attendre le rendu du panneau avant scroll / focus.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        payslipRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        document.getElementById(`${baseId}-dual-trigger`)?.focus();
      });
    });
  }

  const customStart = {
    day: Number(customStartDay),
    month: Number(customStartMonth),
  };

  const asOfParts = asOfIso ? parseIsoDate(asOfIso) : null;
  const resolvedPeriod =
    asOfParts != null
      ? resolveReferencePeriod(
          asOfParts,
          periodKind,
          periodKind === "custom" ? customStart : undefined,
        )
      : null;
  const periodStart =
    resolvedPeriod?.ok === true ? resolvedPeriod.period.start : null;
  const periodStartLabel = periodStart
    ? formatDateLongFr(periodStart)
    : "début de période";
  const asOfLabel = asOfParts ? formatDateLongFr(asOfParts) : "date de calcul";

  const periodAcquisition = (() => {
    if (!asOfIso) return null;
    return estimatePeriodAcquisition({
      periodKind,
      customStart: periodKind === "custom" ? customStart : undefined,
      asOfIso,
      unit: periodUnit,
      hireIso: special.midHire && hireIso ? hireIso : null,
      leaveIso: special.midLeave && leaveIso ? leaveIso : null,
    });
  })();

  const openingBalance = classifyOpeningBalance(priorAvailable);
  /** Étape 3 seulement si Oui + solde de départ prêt (0 inclus, vide exclu). */
  const showTakenSplit =
    priorStatus === "known" && openingBalance.status === "ready";
  const allowFullBalance = showTakenSplit && !periodInputsStale;

  const periodLive: PeriodLiveResult | null = (() => {
    if (!periodAcquisition) return null;
    if (!periodAcquisition.ok) {
      return {
        error: periodAcquisition.message,
        ouvresPartial: periodAcquisition.reason === "ouvres-partial",
      };
    }

    if (!allowFullBalance || openingBalance.status !== "ready") {
      return {
        value: computePeriodBalance({
          acquisition: periodAcquisition,
          priorRightsStatus: "unknown",
        }),
      };
    }

    const takenPriorParsed = parseOptionalDayInput(takenPrior);
    const takenCurrentParsed = parseOptionalDayInput(takenCurrent);
    const carriedParsed = parseOptionalDayInput(carriedOver);
    const adjParsed = parseOptionalDayInput(adjustments);
    if (
      !takenPriorParsed.ok ||
      !takenCurrentParsed.ok ||
      !carriedParsed.ok ||
      !adjParsed.ok
    ) {
      return {
        error: "Saisissez des nombres valides pour les jours pris et ajustements.",
      };
    }

    return {
      value: computePeriodBalance({
        acquisition: periodAcquisition,
        priorRightsStatus: "known",
        priorAvailable: openingBalance.value,
        takenPrior: takenPriorParsed.value,
        takenCurrent: takenCurrentParsed.value,
        carriedOver: carriedParsed.value,
        adjustments: adjParsed.value,
      }),
    };
  })();

  const dualBalance = computePayslipBalance(
    toPayslipRaw(dual.nMinus1),
    toPayslipRaw(dual.n),
  );

  const advancedHasNonZero = (() => {
    const carried = parseOptionalDayInput(carriedOver);
    const adj = parseOptionalDayInput(adjustments);
    if (!carried.ok || !adj.ok) return false;
    return carried.value !== 0 || adj.value !== 0;
  })();

  const specialActive =
    special.sickLeave ||
    special.workAccident ||
    special.midHire ||
    special.midLeave ||
    special.parental ||
    special.conventionalExtra ||
    special.partTime ||
    special.anticipation;

  const specialLimitVisible =
    special.sickLeave ||
    special.workAccident ||
    special.parental ||
    special.conventionalExtra ||
    special.partTime;

  const takenPriorParsedForWarn = parseDayInput(takenPrior);
  const showTakenExceedsOpening =
    showTakenSplit &&
    openingBalance.status === "ready" &&
    takenPriorParsedForWarn.ok &&
    takenPriorParsedForWarn.value > openingBalance.value;

  const periodValue: Exclude<PeriodBalanceResult, { kind: "error" }> | null =
    (() => {
      if (!periodLive || !("value" in periodLive)) return null;
      const value = periodLive.value;
      if (!value || value.kind === "error") return null;
      return value;
    })();
  const periodError =
    periodLive && "error" in periodLive
      ? periodLive.error
      : periodLive &&
          "value" in periodLive &&
          periodLive.value?.kind === "error"
        ? periodLive.value.message
        : null;
  const ouvresPartialUnavailable =
    periodLive != null &&
    "error" in periodLive &&
    periodLive.ouvresPartial === true;

  const incompleteReason: IncompleteReason | undefined =
    periodValue?.kind === "acquired-only"
      ? periodInputsStale && priorStatus === "known"
        ? "period-unverified"
        : priorStatus === "known" && openingBalance.status === "invalid"
          ? "invalid-opening"
          : priorStatus === "known" && openingBalance.status === "empty"
            ? "empty-opening"
            : "unknown"
      : undefined;

  const dualValue =
    dualBalance.kind === "ready" ? dualBalance : null;
  const dualError =
    dualBalance.kind === "error" ? dualBalance.message : null;

  const announcement = (() => {
    if (periodValue?.kind === "remaining") {
      return `Solde estimé : ${formatDaysFr(periodValue.remaining)} ${unitAdjective(periodValue.remaining, periodValue.unit)}.`;
    }
    if (periodValue?.kind === "acquired-only") {
      return `Jours acquis estimés : ${formatDaysFr(periodValue.acquiredCurrent)} ${unitAdjective(periodValue.acquiredCurrent, periodValue.unit)}.`;
    }
    if (dualOpen && dualValue) {
      const label = dualValue.both
        ? "Total des soldes renseignés"
        : dualValue.sole === "nMinus1"
          ? "Solde du compteur N-1"
          : "Solde du compteur N";
      return `${label} (fiche de paie) : ${formatDaysFr(dualValue.total)} ${unitAdjective(dualValue.total, dualUnit)}.`;
    }
    return "";
  })();
  const settledAnnouncement = useSettledAnnouncement(announcement);

  const dualPanelId = `${baseId}-dual-panel`;
  const dualTriggerId = `${baseId}-dual-trigger`;

  return (
    <div
      className="guide-tool-band"
      aria-label="Calculateur de solde de congés payés"
      data-calculator={SOLDE_CONGES_CALCULATOR_ID}
    >
      <div className="scp-calc">
        <h3 className="scp-calc__title">Combien de jours de congés me reste-t-il ?</h3>
        <p className="scp-calc__subtitle">
          Renseignez votre période et vos congés déjà pris pour estimer votre
          solde.
        </p>
        <p className="scp-calc__scope">Cet outil concerne les salariés du secteur privé.</p>

        <div className="scp-calc__panel">
          <ol className="scp-calc__steps">
            <FormStep
              step={1}
              title="Votre période"
              titleId={`${baseId}-step-1`}
            >
              <div className="scp-calc__field">
                <label className="scp-calc__label" htmlFor={`${baseId}-period`}>
                  Période d&apos;acquisition
                </label>
                <select
                  id={`${baseId}-period`}
                  className="scp-calc__select scp-calc__select--full"
                  value={periodKind}
                  onChange={(e) =>
                    onPeriodKindChange(e.target.value as PeriodKind)
                  }
                >
                  <option value="june-may">Du 1er juin au 31 mai</option>
                  <option value="calendar">Du 1er janvier au 31 décembre</option>
                  <option value="custom">Autre période</option>
                </select>
                <HelpDetails summary="Quelle période choisir ?">
                  <p>
                    Dans le secteur privé, la période habituelle va du 1er juin
                    au 31 mai, sauf accord prévoyant une autre organisation
                    (par exemple l&apos;année civile).
                  </p>
                </HelpDetails>
              </div>

              {periodKind === "custom" ? (
                <div className="scp-calc__grid scp-calc__grid--2">
                  <div className="scp-calc__field">
                    <label className="scp-calc__label" htmlFor={`${baseId}-cday`}>
                      Jour de début
                    </label>
                    <select
                      id={`${baseId}-cday`}
                      className="scp-calc__select scp-calc__select--full"
                      value={customStartDay}
                      onChange={(e) => {
                        markPeriodInputsStaleIfNeeded();
                        setCustomStartDay(e.target.value);
                      }}
                    >
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={String(d)}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="scp-calc__field">
                    <label
                      className="scp-calc__label"
                      htmlFor={`${baseId}-cmonth`}
                    >
                      Mois de début
                    </label>
                    <select
                      id={`${baseId}-cmonth`}
                      className="scp-calc__select scp-calc__select--full"
                      value={customStartMonth}
                      onChange={(e) => {
                        markPeriodInputsStaleIfNeeded();
                        setCustomStartMonth(e.target.value);
                      }}
                    >
                      {MONTH_OPTIONS.map((m) => (
                        <option key={m.value} value={String(m.value)}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="scp-calc__hint scp-calc__hint--span">
                    La date de fin est calculée un an moins un jour après le
                    début.
                  </p>
                </div>
              ) : null}

              <div className="scp-calc__grid scp-calc__grid--2">
                <div className="scp-calc__field">
                  <label className="scp-calc__label" htmlFor={`${baseId}-asof`}>
                    Calculer mon solde au
                  </label>
                  <input
                    id={`${baseId}-asof`}
                    className="scp-calc__input"
                    type="date"
                    value={asOfIso}
                    onChange={(e) => {
                      markPeriodInputsStaleIfNeeded();
                      setAsOfIso(e.target.value);
                    }}
                  />
                </div>

                <div className="scp-calc__field">
                  <label className="scp-calc__label" htmlFor={`${baseId}-unit`}>
                    Décompte des congés
                  </label>
                  <select
                    id={`${baseId}-unit`}
                    className="scp-calc__select scp-calc__select--full"
                    value={periodUnit}
                    onChange={(e) => setPeriodUnit(e.target.value as DayUnit)}
                  >
                    <option value="ouvrables">Jours ouvrables</option>
                    <option value="ouvres">Jours ouvrés</option>
                  </select>
                  <p className="scp-calc__hint">
                    Utilisez la même unité que sur votre fiche de paie.
                  </p>
                  <HelpDetails summary="Jours ouvrables ou ouvrés ?">
                    <p>
                      Jours ouvrables : généralement 6 par semaine. Jours
                      ouvrés : généralement 5 par semaine. Conservez la même
                      unité pour toutes les valeurs saisies. En jours ouvrés,
                      l&apos;estimation des acquis ne couvre que 12 mois
                      complets (équivalence usuelle de 25 jours) ; pour une
                      durée plus courte, utilisez les compteurs de votre fiche
                      de paie.
                    </p>
                  </HelpDetails>
                </div>
              </div>
            </FormStep>

            <FormStep
              step={2}
              title="Vos congés restants au début de la période"
              titleId={`${baseId}-step-2`}
            >
              <div className="scp-calc__field">
                <p className="scp-calc__label" id={`${baseId}-prior-label`}>
                  Savez-vous combien de jours il vous restait au{" "}
                  {periodStartLabel} ?
                </p>
                <div
                  className="scp-calc__choice-row"
                  role="group"
                  aria-labelledby={`${baseId}-prior-label`}
                >
                  <button
                    type="button"
                    className="scp-calc__choice"
                    aria-pressed={priorStatus === "known"}
                    onClick={() => setPriorStatus("known")}
                  >
                    Oui
                  </button>
                  <button
                    type="button"
                    className="scp-calc__choice"
                    aria-pressed={priorStatus === "unknown"}
                    onClick={() => {
                      setPriorStatus("unknown");
                      setPeriodInputsStale(false);
                    }}
                  >
                    Je ne sais pas
                  </button>
                </div>
              </div>

              {priorStatus === "known" ? (
                <div className="scp-calc__field scp-calc__field--compact-end">
                  <label className="scp-calc__label" htmlFor={`${baseId}-prior`}>
                    Jours restants au {periodStartLabel}
                  </label>
                  <input
                    id={`${baseId}-prior`}
                    className="scp-calc__input"
                    inputMode="decimal"
                    value={priorAvailable}
                    onChange={(e) => setPriorAvailable(e.target.value)}
                    placeholder="Ex. 8 (ou 0)"
                    autoComplete="off"
                    aria-invalid={openingBalance.status === "invalid"}
                    aria-describedby={
                      openingBalance.status === "empty"
                        ? `${baseId}-prior-zero-hint`
                        : openingBalance.status === "invalid"
                          ? `${baseId}-prior-error`
                          : undefined
                    }
                  />
                  <p className="scp-calc__hint scp-calc__hint--critical">
                    Jours des périodes précédentes encore disponibles à cette
                    date.
                  </p>
                  {openingBalance.status === "empty" ? (
                    <p
                      id={`${baseId}-prior-zero-hint`}
                      className="scp-calc__hint scp-calc__hint--guide"
                    >
                      Indiquez 0 si aucun jour ne vous restait à cette date.
                    </p>
                  ) : null}
                  {openingBalance.status === "invalid" ? (
                    <p
                      id={`${baseId}-prior-error`}
                      className="scp-calc__field-error"
                      role="alert"
                    >
                      Saisissez un nombre valide (0 est accepté).
                    </p>
                  ) : null}
                  <HelpDetails summary="Quel nombre renseigner ?">
                    <p>
                      Recherchez le solde de congés des périodes précédentes
                      encore disponible au début de la période choisie. Les
                      jours déjà pris avant cette date sont déjà déduits : ne
                      les renseignez pas à nouveau à l&apos;étape 3.
                    </p>
                    <p>
                      Si vous connaissez seulement votre solde actuel, déjà
                      diminué des congés pris depuis cette date, ne
                      l&apos;utilisez pas ici comme solde de départ. Vous pouvez
                      utiliser le calcul avec votre fiche de paie ci-dessous.
                    </p>
                    <p>
                      N&apos;ajoutez pas dans les reports des jours déjà compris
                      dans ce solde de départ.
                    </p>
                  </HelpDetails>
                </div>
              ) : null}

              {priorStatus === "unknown" ? (
                <p className="scp-calc__empty scp-calc__empty--tight">
                  Nous pouvons estimer vos jours acquis sur la période en
                  cours, mais pas votre solde total.
                </p>
              ) : null}
            </FormStep>

            {showTakenSplit ? (
              <FormStep
                step={3}
                title="Vos jours déjà pris"
                titleId={`${baseId}-step-3`}
              >
                <p className="scp-calc__hint scp-calc__hint--critical">
                  Indiquez les jours pris du {periodStartLabel} au {asOfLabel}.
                </p>
                <div className="scp-calc__grid scp-calc__grid--2">
                  <div className="scp-calc__field">
                    <label
                      className="scp-calc__label"
                      htmlFor={`${baseId}-taken-prior`}
                    >
                      Pris sur vos congés des périodes précédentes
                    </label>
                    <input
                      id={`${baseId}-taken-prior`}
                      className="scp-calc__input"
                      inputMode="decimal"
                      value={takenPrior}
                      onChange={(e) => setTakenPrior(e.target.value)}
                      placeholder="Ex. 6"
                      autoComplete="off"
                    />
                  </div>
                  <div className="scp-calc__field">
                    <label
                      className="scp-calc__label"
                      htmlFor={`${baseId}-taken-current`}
                    >
                      Pris sur vos congés de la période en cours
                    </label>
                    <input
                      id={`${baseId}-taken-current`}
                      className="scp-calc__input"
                      inputMode="decimal"
                      value={takenCurrent}
                      onChange={(e) => setTakenCurrent(e.target.value)}
                      placeholder="Ex. 2"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <p className="scp-calc__hint">
                  Utilisez les jours déduits de chaque compteur sur votre fiche
                  de paie.
                </p>
                {showTakenExceedsOpening ? (
                  <p className="scp-calc__warn" role="status">
                    Vous avez indiqué plus de jours pris que de jours
                    disponibles au début de la période. Vérifiez le solde de
                    départ et le compteur sur lequel ces jours ont été déduits.
                  </p>
                ) : null}
                <HelpDetails summary="Je ne sais pas sur quelle période ils ont été déduits">
                  <p>
                    Une mauvaise répartition entre les compteurs fausse le
                    solde. Si vous ignorez le compteur concerné, utilisez le
                    calcul à partir des compteurs N et N-1 de votre fiche de
                    paie.
                  </p>
                  <button
                    type="button"
                    className="scp-calc__link-btn"
                    onClick={openPayslipPanel}
                  >
                    Ouvrir le calcul avec ma fiche de paie
                  </button>
                </HelpDetails>
              </FormStep>
            ) : null}
          </ol>

          {periodInputsStale && priorStatus === "known" ? (
            <div className="scp-calc__stale" role="status">
              <p>
                Vous avez changé la période ou la date de calcul. Vérifiez que
                le solde de départ et les jours pris correspondent bien à ces
                nouvelles dates. L&apos;estimation des acquis reste affichée ;
                le solde total n&apos;est repris qu&apos;après confirmation.
              </p>
              <button
                type="button"
                className="scp-calc__btn scp-calc__btn--secondary"
                onClick={() => setPeriodInputsStale(false)}
              >
                J&apos;ai vérifié mes saisies
              </button>
            </div>
          ) : null}

          <div className="scp-calc__options">
            <p className="scp-calc__options-kicker">Facultatif</p>
            <button
              type="button"
              className="scp-calc__option-trigger"
              aria-expanded={advancedOpen}
              aria-controls={`${baseId}-advanced`}
              onClick={() => setAdvancedOpen((open) => !open)}
            >
              <span>
                {advancedOpen
                  ? "Masquer les reports ou ajustements"
                  : "Ajouter des reports ou ajustements"}
              </span>
              <span
                className={
                  advancedOpen
                    ? "scp-calc__accordion-chevron scp-calc__accordion-chevron--open"
                    : "scp-calc__accordion-chevron"
                }
                aria-hidden="true"
              >
                ▾
              </span>
            </button>
            {!advancedOpen && advancedHasNonZero ? (
              <p className="scp-calc__advanced-note">
                Reports ou ajustements pris en compte
              </p>
            ) : null}
            {advancedOpen ? (
              <div id={`${baseId}-advanced`} className="scp-calc__advanced">
                <p className="scp-calc__hint scp-calc__hint--critical">
                  Ajoutez uniquement les jours qui ne sont pas déjà compris dans
                  vos autres saisies.
                </p>
                <div className="scp-calc__grid scp-calc__grid--2">
                  <div className="scp-calc__field">
                    <label
                      className="scp-calc__label"
                      htmlFor={`${baseId}-carried`}
                    >
                      Jours reportés ou crédités
                    </label>
                    <input
                      id={`${baseId}-carried`}
                      className="scp-calc__input"
                      inputMode="decimal"
                      value={carriedOver}
                      onChange={(e) => setCarriedOver(e.target.value)}
                      placeholder="Ex. 2"
                      autoComplete="off"
                    />
                    <p className="scp-calc__hint">
                      Seulement s&apos;ils ne sont pas déjà inclus dans le
                      solde de départ.
                    </p>
                  </div>
                  <div className="scp-calc__field">
                    <label className="scp-calc__label" htmlFor={`${baseId}-adj`}>
                      Autres ajustements
                    </label>
                    <input
                      id={`${baseId}-adj`}
                      className="scp-calc__input"
                      inputMode="decimal"
                      value={adjustments}
                      onChange={(e) => setAdjustments(e.target.value)}
                      placeholder="Ex. -1 ou 1"
                      autoComplete="off"
                    />
                    <p className="scp-calc__hint">
                      Positif = crédit, négatif = débit. Jusqu&apos;à la date
                      de calcul.
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            <button
              type="button"
              className="scp-calc__option-trigger"
              aria-expanded={specialOpen}
              aria-controls={`${baseId}-special`}
              onClick={() => setSpecialOpen((open) => !open)}
            >
              <span>
                {specialOpen
                  ? "Masquer la situation particulière"
                  : "Signaler une situation particulière"}
              </span>
              <span
                className={
                  specialOpen
                    ? "scp-calc__accordion-chevron scp-calc__accordion-chevron--open"
                    : "scp-calc__accordion-chevron"
                }
                aria-hidden="true"
              >
                ▾
              </span>
            </button>
            {!specialOpen && specialActive ? (
              <p className="scp-calc__advanced-note">
                Situation particulière signalée
              </p>
            ) : null}
            {specialOpen ? (
              <div id={`${baseId}-special`} className="scp-calc__advanced">
                <fieldset className="scp-calc__special-set">
                  <legend className="scp-calc__sr-only">
                    Situations particulières
                  </legend>
                  {(
                    [
                      ["sickLeave", "Arrêt maladie non professionnel"],
                      [
                        "workAccident",
                        "Accident du travail ou maladie professionnelle",
                      ],
                      ["midHire", "Embauche pendant la période de référence"],
                      ["midLeave", "Départ de l'entreprise pendant la période"],
                      [
                        "parental",
                        "Congé parental ou autre absence particulière",
                      ],
                      [
                        "conventionalExtra",
                        "Congés supplémentaires conventionnels",
                      ],
                      ["partTime", "Travail à temps partiel"],
                      ["anticipation", "Congés pris par anticipation"],
                    ] as const
                  ).map(([key, label]) => (
                    <label key={key} className="scp-calc__check">
                      <input
                        type="checkbox"
                        checked={special[key]}
                        onChange={(e) =>
                          setSpecial((s) => ({
                            ...s,
                            [key]: e.target.checked,
                          }))
                        }
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </fieldset>

                {special.midHire ? (
                  <div className="scp-calc__field" style={{ marginTop: "0.75rem" }}>
                    <label className="scp-calc__label" htmlFor={`${baseId}-hire`}>
                      Date d&apos;embauche
                    </label>
                    <input
                      id={`${baseId}-hire`}
                      className="scp-calc__input"
                      type="date"
                      value={hireIso}
                      onChange={(e) => setHireIso(e.target.value)}
                    />
                  </div>
                ) : null}

                {special.midLeave ? (
                  <div className="scp-calc__field" style={{ marginTop: "0.75rem" }}>
                    <label
                      className="scp-calc__label"
                      htmlFor={`${baseId}-leave`}
                    >
                      Date de départ
                    </label>
                    <input
                      id={`${baseId}-leave`}
                      className="scp-calc__input"
                      type="date"
                      value={leaveIso}
                      onChange={(e) => setLeaveIso(e.target.value)}
                    />
                  </div>
                ) : null}

                {specialLimitVisible ? (
                  <p className="scp-calc__warn" role="status">
                    L&apos;estimation standard peut être inexacte pour cette
                    situation. Reportez-vous à votre bulletin ou au service RH.
                  </p>
                ) : null}
                {special.anticipation ? (
                  <p className="scp-calc__hint" style={{ marginTop: "0.55rem" }}>
                    Saisissez les anticipations dans « Pris sur vos congés de
                    la période en cours ».
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>

          {specialLimitVisible && !specialOpen ? (
            <p className="scp-calc__warn" role="status">
              Une situation particulière est signalée : l&apos;estimation
              standard peut être inexacte.
            </p>
          ) : null}

          {periodError ? (
            <div className="scp-calc__error-block" role="alert">
              <p className="scp-calc__error">{periodError}</p>
              {ouvresPartialUnavailable ? (
                <button
                  type="button"
                  className="scp-calc__link-btn"
                  onClick={openPayslipPanel}
                >
                  Ouvrir le calcul avec ma fiche de paie
                </button>
              ) : null}
            </div>
          ) : null}
          {periodValue ? (
            <PeriodResultHero
              result={periodValue}
              understandId={`${baseId}-understand-period`}
              incompleteReason={incompleteReason}
            />
          ) : null}

          <div className="scp-calc__actions scp-calc__actions--quiet">
            <button
              type="button"
              className="scp-calc__btn scp-calc__btn--quiet"
              onClick={resetPeriodMode}
            >
              Réinitialiser
            </button>
          </div>

          <section
            ref={payslipRef}
            className="scp-calc__payslip"
            aria-labelledby={`${baseId}-payslip-title`}
            id={`${SOLDE_CONGES_CALCULATOR_ID}-fiche-paie`}
            style={{ scrollMarginTop: "5.5rem" }}
          >
            <h4
              className="scp-calc__payslip-title"
              id={`${baseId}-payslip-title`}
            >
              Vous connaissez vos compteurs de congés ?
            </h4>
            <p className="scp-calc__payslip-desc">
              Calculez votre solde avec les compteurs de votre fiche de paie.
            </p>
            <button
              type="button"
              id={dualTriggerId}
              className="scp-calc__accordion-trigger"
              aria-expanded={dualOpen}
              aria-controls={dualPanelId}
              onClick={() => setDualOpen((open) => !open)}
            >
              <span className="scp-calc__accordion-label">
                {dualOpen
                  ? "Masquer le calcul avec ma fiche de paie"
                  : "Calculer avec ma fiche de paie"}
              </span>
              <span
                className={
                  dualOpen
                    ? "scp-calc__accordion-chevron scp-calc__accordion-chevron--open"
                    : "scp-calc__accordion-chevron"
                }
                aria-hidden="true"
              >
                ▾
              </span>
            </button>

            {dualOpen ? (
              <div
                id={dualPanelId}
                className="scp-calc__accordion-panel"
                role="region"
                aria-labelledby={dualTriggerId}
              >
                <div className="scp-calc__field">
                  <label
                    className="scp-calc__label"
                    htmlFor={`${baseId}-unit-dual`}
                  >
                    Décompte des congés
                  </label>
                  <select
                    id={`${baseId}-unit-dual`}
                    className="scp-calc__select scp-calc__select--full"
                    value={dualUnit}
                    onChange={(e) => setDualUnit(e.target.value as DayUnit)}
                  >
                    <option value="ouvrables">Jours ouvrables</option>
                    <option value="ouvres">Jours ouvrés</option>
                  </select>
                  <p className="scp-calc__hint">
                    Utilisez les chiffres d&apos;un même bulletin, dans la même
                    unité.
                  </p>
                </div>

                <p className="scp-calc__counter-hint">
                  Ces intitulés peuvent varier selon votre fiche de paie.
                </p>

                <PayslipCounterBlock
                  idPrefix={`${baseId}-n1`}
                  counterId="nMinus1"
                  fields={dual.nMinus1}
                  onChange={(next) =>
                    setDual((d) => ({ ...d, nMinus1: next }))
                  }
                />

                <PayslipCounterBlock
                  idPrefix={`${baseId}-n`}
                  counterId="n"
                  fields={dual.n}
                  onChange={(next) => setDual((d) => ({ ...d, n: next }))}
                />

                {dualBalance.kind === "empty" ? (
                  <p className="scp-calc__empty">
                    Renseignez au moins un compteur pour afficher le résultat.
                    Saisissez 0 si une colonne du bulletin est à zéro.
                  </p>
                ) : null}
                {dualError ? (
                  <p className="scp-calc__error" role="alert">
                    {dualError}
                  </p>
                ) : null}
                {dualValue ? (
                  <DualResultHero
                    result={dualValue}
                    unit={dualUnit}
                    understandId={`${baseId}-understand-dual`}
                  />
                ) : null}

                <div className="scp-calc__actions scp-calc__actions--quiet">
                  <button
                    type="button"
                    className="scp-calc__btn scp-calc__btn--quiet"
                    onClick={resetDualMode}
                  >
                    Réinitialiser le calcul fiche de paie
                  </button>
                </div>
              </div>
            ) : null}
          </section>

          <p className="scp-calc__footnote">
            Outil indicatif : estimation simplifiée ou lecture arithmétique du
            bulletin, pas un moteur de paie complet. Les calculs s&apos;effectuent
            dans votre navigateur ; les valeurs ne sont pas envoyées à un serveur
            de calcul. L&apos;audience du site peut être mesurée selon votre
            consentement aux cookies.
          </p>

          <div
            className="scp-calc__sr-only"
            aria-live="polite"
            aria-atomic="true"
          >
            {settledAnnouncement}
          </div>
        </div>
      </div>
    </div>
  );
}
