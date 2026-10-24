import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { formatCurrency } from "@/site/salary-calculator";
import { MONTHLY_HOURS_REFERENCE } from "./config";
import {
  buildComparisonGroups,
  buildGainAnnouncement,
  formatHours,
  formatOvertimeHoursBadge,
  formatSignedCurrency,
  type ComparisonPeriod,
} from "./results-display";
import type { OvertimeGroupBreakdown, OvertimeSalaryResult } from "./types";

type OvertimeSalaryResultsProps = {
  result: OvertimeSalaryResult | null;
  hasSalary: boolean;
  hasHours: boolean;
  validationError: string | null;
  highHoursWarning: string | null;
};

const ANNOUNCEMENT_DELAY_MS = 900;

const PERIOD_LABELS: Record<ComparisonPeriod, string> = {
  monthly: "Mensuel",
  annual: "Annuel",
};

function useSettledAnnouncement(message: string): string {
  const [settled, setSettled] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setSettled(message), ANNOUNCEMENT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [message]);

  return settled;
}

function StepStatus({ done, label, doneLabel }: { done: boolean; label: string; doneLabel: string }) {
  return (
    <li className={`ot-sim__step${done ? " ot-sim__step--done" : ""}`}>
      <span className="ot-sim__step-mark" aria-hidden="true">
        {done ? (
          <svg viewBox="0 0 16 16" width="12" height="12" focusable="false">
            <path
              d="m3.5 8.5 3 3 6-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
      <span className="ot-sim__step-label">{label}</span>
      <span className="ot-sim__step-state">{done ? doneLabel : "À compléter"}</span>
    </li>
  );
}

function EmptyState({ hasSalary, hasHours }: { hasSalary: boolean; hasHours: boolean }) {
  let note =
    "Renseignez votre salaire et vos heures supplémentaires pour découvrir votre nouvelle rémunération.";
  if (hasSalary && !hasHours) {
    note =
      "Indiquez maintenant vos heures supplémentaires à 25 % ou à 50 % pour découvrir votre gain.";
  } else if (!hasSalary && hasHours) {
    note = "Indiquez votre salaire de base pour calculer le gain de vos heures supplémentaires.";
  }

  return (
    <div className="ot-sim ot-sim--empty">
      <div className="ot-sim__hero ot-sim__hero--empty">
        <span className="ot-sim__empty-icon" aria-hidden="true">
          <Image
            src="/images/calculator/pictogram-coins-clean.webp"
            alt=""
            width={214}
            height={184}
            decoding="async"
            draggable={false}
          />
        </span>
        <p className="ot-sim__eyebrow">Votre estimation</p>
        <h3 className="ot-sim__empty-title">Découvrez votre gain en brut et en net</h3>
        <p className="ot-sim__empty-note">{note}</p>
      </div>
      <ol className="ot-sim__steps" aria-label="Informations nécessaires au calcul">
        <StepStatus done={hasSalary} label="Votre salaire de base" doneLabel="Renseigné" />
        <StepStatus done={hasHours} label="Vos heures supplémentaires" doneLabel="Renseignées" />
      </ol>
    </div>
  );
}

function GroupDetailRow({ group }: { group: OvertimeGroupBreakdown }) {
  return (
    <div className="ot-sim__line">
      <dt>
        {formatHours(group.hours)} majorées à {group.majorationPercent.toLocaleString("fr-FR")}
        &nbsp;%
        <span className="ot-sim__line-sub">{formatCurrency(group.hourlyValue)} brut par heure</span>
      </dt>
      <dd>{formatCurrency(group.gross)}</dd>
    </div>
  );
}

function ComparisonTable({ result }: { result: OvertimeSalaryResult }) {
  const groups = buildComparisonGroups(result);

  return (
    <div className="ot-sim__compare">
      <table className="ot-sim__table" role="table">
        <caption className="ot-sim__compare-title">Votre rémunération avant / après</caption>
        <thead role="rowgroup">
          <tr role="row">
            <th scope="col" role="columnheader" className="ot-sim__th-period">
              Période
            </th>
            <th scope="col" role="columnheader" className="ot-sim__col ot-sim__col--before">
              Avant
            </th>
            <th scope="col" role="columnheader" className="ot-sim__col ot-sim__col--after">
              Après
            </th>
          </tr>
        </thead>
        {groups.map((group) => (
          <tbody key={group.id} role="rowgroup" className={`ot-sim__group ot-sim__group--${group.id}`}>
            <tr role="row" className="ot-sim__group-row">
              <th scope="rowgroup" role="rowheader" className="ot-sim__group-label">
                <span className="ot-sim__group-prefix">Salaire </span>
                {group.shortLabel}
              </th>
              <td role="cell" className="ot-sim__col ot-sim__col--before" aria-hidden="true" />
              <td role="cell" className="ot-sim__col ot-sim__col--after" aria-hidden="true" />
            </tr>
            {group.rows.map((row) => (
              <tr key={row.period} role="row" className="ot-sim__row">
                <th scope="row" role="rowheader" className="ot-sim__period">
                  {PERIOD_LABELS[row.period]}
                  {row.period === "annual" ? (
                    <>
                      <span aria-hidden="true">*</span>
                      <span className="ot-sim__sr-only"> (projection sur 12 mois)</span>
                    </>
                  ) : null}
                </th>
                <td role="cell" className="ot-sim__col ot-sim__col--before ot-sim__amount">
                  {formatCurrency(row.before)}
                </td>
                <td role="cell" className="ot-sim__col ot-sim__col--after ot-sim__amount">
                  {formatCurrency(row.after)}
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
      <p className="ot-sim__footnote">
        * Projection annuelle sur 12 mois, avec les mêmes heures supplémentaires chaque mois.
      </p>
    </div>
  );
}

export function OvertimeSalaryResults({
  result,
  hasSalary,
  hasHours,
  validationError,
  highHoursWarning,
}: OvertimeSalaryResultsProps) {
  const computed = !validationError && hasSalary && hasHours ? result : null;
  const announcement = useSettledAnnouncement(computed ? buildGainAnnouncement(computed) : "");

  let content: ReactNode;

  if (validationError) {
    content = (
      <div className="ot-sim ot-sim--error">
        <div className="ot-sim__hero ot-sim__hero--error">
          <p className="ot-sim__eyebrow">Votre estimation</p>
          <p className="ot-sim__error" role="alert">
            {validationError}
          </p>
        </div>
      </div>
    );
  } else if (!computed) {
    content = <EmptyState hasSalary={hasSalary} hasHours={hasHours} />;
  } else {
    content = (
      <div className="ot-sim ot-sim--filled">
        <section className="ot-sim__hero" aria-labelledby="ot-sim-gain-label">
          <div className="ot-sim__hero-top">
            <h3 id="ot-sim-gain-label" className="ot-sim__eyebrow">
              Votre gain mensuel estimé
            </h3>
            <span className="ot-sim__badge">{formatOvertimeHoursBadge(computed.overtimeHoursTotal)}</span>
          </div>
          <p className="ot-sim__gain">
            <span className="ot-sim__gain-value">{formatSignedCurrency(computed.overtimeNetGain)}</span>
            <span className="ot-sim__gain-unit">net</span>
          </p>
          <p className="ot-sim__gross">
            <span className="ot-sim__gross-prefix">Soit</span>
            <span className="ot-sim__gross-value">
              {formatSignedCurrency(computed.overtimeGrossTotal)} brut
            </span>
          </p>
          <p className="ot-sim__hero-note">Net estimé avant prélèvement à la source</p>
        </section>

        {highHoursWarning ? (
          <p className="ot-sim__warning" role="status">
            {highHoursWarning}
          </p>
        ) : null}

        <ComparisonTable result={computed} />

        <details className="ot-sim__details">
          <summary className="ot-sim__details-summary">
            <span>Comprendre mon calcul</span>
            <span className="ot-sim__chevron" aria-hidden="true" />
          </summary>
          <div className="ot-sim__details-body">
            <dl className="ot-sim__lines">
              <div className="ot-sim__line">
                <dt>Salaire brut mensuel de base</dt>
                <dd>{formatCurrency(computed.baseGrossMonthly)}</dd>
              </div>
              <div className="ot-sim__line">
                <dt>
                  Taux horaire brut estimé
                  <span className="ot-sim__line-sub">
                    Salaire de base divisé par{" "}
                    {MONTHLY_HOURS_REFERENCE.toLocaleString("fr-FR")}&nbsp;h par mois
                  </span>
                </dt>
                <dd>{formatCurrency(computed.hourlyGrossBase)}&nbsp;/&nbsp;h</dd>
              </div>
              {computed.group1.hours > 0 ? <GroupDetailRow group={computed.group1} /> : null}
              {computed.group2.hours > 0 ? <GroupDetailRow group={computed.group2} /> : null}
              <div className="ot-sim__line ot-sim__line--total">
                <dt>Rémunération brute des heures supplémentaires</dt>
                <dd>{formatCurrency(computed.overtimeGrossTotal)}</dd>
              </div>
              <div className="ot-sim__line">
                <dt>
                  Réduction estimée de cotisations salariales
                  <span className="ot-sim__line-sub">Incluse dans le gain net</span>
                </dt>
                <dd>{formatCurrency(computed.contributionRelief)}</dd>
              </div>
            </dl>
            <p className="ot-sim__assumptions">
              Hypothèses : salarié du secteur privé à temps plein (35 h), heures supplémentaires
              payées saisies sur le mois, estimation avant prélèvement à la source.
            </p>
          </div>
        </details>
      </div>
    );
  }

  return (
    <div className="ot-sim-root">
      <div aria-live="off">{content}</div>
      <p className="ot-sim__sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </div>
  );
}
