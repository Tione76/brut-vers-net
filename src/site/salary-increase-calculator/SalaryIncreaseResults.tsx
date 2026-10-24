import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { formatCurrency } from "@/site/salary-calculator";
import { EMPLOYMENT_PROFILES } from "@/site/salary-calculator/config";
import type { EmploymentProfile, SalaryMonths } from "@/site/salary-calculator/types";
import { formatWithholdingRatePercent } from "@/site/salary-calculator/tax/format-withholding-rate";
import { formatPercentFr } from "./format-percent";
import {
  buildAnnualFootnote,
  buildComparisonGroups,
  buildGainAnnouncement,
  buildIncreaseBadge,
  describeIncreaseInput,
  formatSignedCurrency,
  type ComparisonPeriod,
} from "./results-display";
import type {
  IncreaseReferenceField,
  IncreaseType,
  SalaryIncreaseResult,
} from "./types";

export interface SalaryIncreaseResultsProps {
  result: SalaryIncreaseResult | null;
  salaryMonths: SalaryMonths;
  hasSalary: boolean;
  hasIncrease: boolean;
  validationError: string | null;
  withholdingRate: number;
  increaseType: IncreaseType;
  increaseReferenceField: IncreaseReferenceField | null;
  increaseValue: string;
  profile: EmploymentProfile;
}

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

function profileLabel(profile: EmploymentProfile): string {
  return EMPLOYMENT_PROFILES.find((item) => item.id === profile)?.label ?? profile;
}

function StepStatus({
  done,
  label,
  doneLabel,
}: {
  done: boolean;
  label: string;
  doneLabel: string;
}) {
  return (
    <li className={`inc-sim__step${done ? " inc-sim__step--done" : ""}`}>
      <span className="inc-sim__step-mark" aria-hidden="true">
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
      <span className="inc-sim__step-label">{label}</span>
      <span className="inc-sim__step-state">{done ? doneLabel : "À compléter"}</span>
    </li>
  );
}

function EmptyState({ hasSalary, hasIncrease }: { hasSalary: boolean; hasIncrease: boolean }) {
  let note =
    "Renseignez votre salaire et votre augmentation pour découvrir votre nouvelle rémunération.";
  if (hasSalary && !hasIncrease) {
    note = "Indiquez maintenant votre augmentation pour découvrir votre gain.";
  } else if (!hasSalary && hasIncrease) {
    note = "Indiquez votre salaire actuel pour calculer le gain de votre augmentation.";
  }

  return (
    <div className="inc-sim inc-sim--empty">
      <div className="inc-sim__hero inc-sim__hero--empty">
        <span className="inc-sim__empty-icon" aria-hidden="true">
          <Image
            src="/images/calculator/pictogram-coins-clean.webp"
            alt=""
            width={214}
            height={184}
            decoding="async"
            draggable={false}
          />
        </span>
        <p className="inc-sim__eyebrow">Votre estimation</p>
        <h3 className="inc-sim__empty-title">Découvrez votre augmentation en brut et en net</h3>
        <p className="inc-sim__empty-note">{note}</p>
      </div>
      <ol className="inc-sim__steps" aria-label="Informations nécessaires au calcul">
        <StepStatus done={hasSalary} label="Votre salaire actuel" doneLabel="Renseigné" />
        <StepStatus done={hasIncrease} label="Votre augmentation" doneLabel="Renseignée" />
      </ol>
    </div>
  );
}

function ComparisonTable({
  result,
  salaryMonths,
}: {
  result: SalaryIncreaseResult;
  salaryMonths: SalaryMonths;
}) {
  const groups = buildComparisonGroups(result);

  return (
    <div className="inc-sim__compare">
      <table className="inc-sim__table" role="table">
        <caption className="inc-sim__compare-title">Votre rémunération avant / après</caption>
        <thead role="rowgroup">
          <tr role="row">
            <th scope="col" role="columnheader" className="inc-sim__th-period">
              Période
            </th>
            <th scope="col" role="columnheader" className="inc-sim__col inc-sim__col--before">
              Avant
            </th>
            <th scope="col" role="columnheader" className="inc-sim__col inc-sim__col--after">
              Après
            </th>
          </tr>
        </thead>
        {groups.map((group) => (
          <tbody
            key={group.id}
            role="rowgroup"
            className={`inc-sim__group inc-sim__group--${group.id}`}
          >
            <tr role="row" className="inc-sim__group-row">
              <th scope="rowgroup" role="rowheader" className="inc-sim__group-label">
                <span className="inc-sim__group-prefix">Salaire </span>
                {group.shortLabel}
              </th>
              <td role="cell" className="inc-sim__col inc-sim__col--before" aria-hidden="true" />
              <td role="cell" className="inc-sim__col inc-sim__col--after" aria-hidden="true" />
            </tr>
            {group.rows.map((row) => (
              <tr key={row.period} role="row" className="inc-sim__row">
                <th scope="row" role="rowheader" className="inc-sim__period">
                  {PERIOD_LABELS[row.period]}
                  {row.period === "annual" ? (
                    <>
                      <span aria-hidden="true">*</span>
                      <span className="inc-sim__sr-only">
                        {" "}
                        (projection sur {salaryMonths} mois)
                      </span>
                    </>
                  ) : null}
                </th>
                <td role="cell" className="inc-sim__col inc-sim__col--before inc-sim__amount">
                  {formatCurrency(row.before)}
                </td>
                <td role="cell" className="inc-sim__col inc-sim__col--after inc-sim__amount">
                  {formatCurrency(row.after)}
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
      <p className="inc-sim__footnote">{buildAnnualFootnote(salaryMonths)}</p>
    </div>
  );
}

export function SalaryIncreaseResults({
  result,
  salaryMonths,
  hasSalary,
  hasIncrease,
  validationError,
  withholdingRate,
  increaseType,
  increaseReferenceField,
  increaseValue,
  profile,
}: SalaryIncreaseResultsProps) {
  const computed = !validationError && hasSalary && hasIncrease ? result : null;
  const announcement = useSettledAnnouncement(computed ? buildGainAnnouncement(computed) : "");

  let content: ReactNode;

  if (validationError) {
    content = (
      <div className="inc-sim inc-sim--error">
        <div className="inc-sim__hero inc-sim__hero--error">
          <p className="inc-sim__eyebrow">Votre estimation</p>
          <p className="inc-sim__error" role="alert">
            {validationError}
          </p>
        </div>
      </div>
    );
  } else if (!computed) {
    content = <EmptyState hasSalary={hasSalary} hasIncrease={hasIncrease} />;
  } else {
    const badge = buildIncreaseBadge(computed, increaseType, increaseValue);
    const showPasBlock = computed.gain.netAfterTaxMonthly !== computed.gain.netMonthly;

    content = (
      <div className="inc-sim inc-sim--filled">
        <section className="inc-sim__hero" aria-labelledby="inc-sim-gain-label">
          <div className="inc-sim__hero-top">
            <h3 id="inc-sim-gain-label" className="inc-sim__eyebrow">
              Votre gain mensuel estimé
            </h3>
            {badge ? <span className="inc-sim__badge">{badge}</span> : null}
          </div>
          <p className="inc-sim__gain">
            <span className="inc-sim__gain-value">
              {formatSignedCurrency(computed.gain.netMonthly)}
            </span>
            <span className="inc-sim__gain-unit">net</span>
          </p>
          <p className="inc-sim__gross">
            <span className="inc-sim__gross-prefix">Soit</span>
            <span className="inc-sim__gross-value">
              {formatSignedCurrency(computed.gain.grossMonthly)} brut
            </span>
          </p>
          <p className="inc-sim__hero-note">Net estimé avant prélèvement à la source</p>
        </section>

        <ComparisonTable result={computed} salaryMonths={salaryMonths} />

        {showPasBlock ? (
          <section className="inc-sim__pas" aria-labelledby="inc-sim-pas-title">
            <h4 id="inc-sim-pas-title" className="inc-sim__pas-title">
              Après prélèvement à la source ({formatWithholdingRatePercent(withholdingRate)})
            </h4>
            <dl className="inc-sim__pas-grid">
              <div className="inc-sim__pas-row">
                <dt>Gain net mensuel</dt>
                <dd>{formatSignedCurrency(computed.gain.netAfterTaxMonthly)}</dd>
              </div>
              <div className="inc-sim__pas-row">
                <dt>Gain net annuel</dt>
                <dd>{formatSignedCurrency(computed.gain.netAfterTaxAnnual)}</dd>
              </div>
              <div className="inc-sim__pas-row">
                <dt>Nouveau net mensuel</dt>
                <dd>{formatCurrency(computed.after.netAfterTaxMonthly)}</dd>
              </div>
            </dl>
          </section>
        ) : null}

        <details className="inc-sim__details">
          <summary className="inc-sim__details-summary">
            <span>Comprendre mon calcul</span>
            <span className="inc-sim__chevron" aria-hidden="true" />
          </summary>
          <div className="inc-sim__details-body">
            <dl className="inc-sim__lines">
              <div className="inc-sim__line">
                <dt>Salaire brut mensuel de départ</dt>
                <dd>{formatCurrency(computed.before.grossMonthly)}</dd>
              </div>
              <div className="inc-sim__line">
                <dt>Augmentation brute saisie</dt>
                <dd>
                  {describeIncreaseInput(
                    increaseType,
                    increaseReferenceField,
                    increaseValue,
                    computed,
                  )}
                </dd>
              </div>
              <div className="inc-sim__line inc-sim__line--total">
                <dt>Augmentation brute mensuelle</dt>
                <dd>{formatSignedCurrency(computed.gain.grossMonthly)}</dd>
              </div>
              <div className="inc-sim__line">
                <dt>Progression brute estimée</dt>
                <dd>{formatPercentFr(computed.percentGain.gross)}</dd>
              </div>
              <div className="inc-sim__line">
                <dt>Progression nette estimée</dt>
                <dd>{formatPercentFr(computed.percentGain.net)}</dd>
              </div>
              <div className="inc-sim__line">
                <dt>Statut professionnel</dt>
                <dd>{profileLabel(profile)}</dd>
              </div>
              <div className="inc-sim__line">
                <dt>Nombre de mois rémunérés</dt>
                <dd>{salaryMonths}</dd>
              </div>
              <div className="inc-sim__line">
                <dt>Taux de prélèvement à la source</dt>
                <dd>{formatWithholdingRatePercent(withholdingRate)}</dd>
              </div>
            </dl>
            <p className="inc-sim__assumptions">
              Hypothèses : estimation avant et après prélèvement à la source selon le taux saisi ou
              estimé. Les montants annuels respectent le nombre de mois de rémunération sélectionné.
              Le calcul ne remplace pas une fiche de paie.
            </p>
          </div>
        </details>
      </div>
    );
  }

  return (
    <div className="inc-sim-root">
      <div aria-live="off">{content}</div>
      <p className="inc-sim__sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </div>
  );
}
