import { formatCurrency } from "@/site/salary-calculator";
import type { SalaryMonths } from "@/site/salary-calculator/types";
import { formatWithholdingRatePercent } from "@/site/salary-calculator/tax/format-withholding-rate";
import type { IncreaseReferenceField, IncreaseType, SalaryIncreaseResult } from "./types";
import { formatPercentFr } from "./format-percent";

function GainAmount({ value, prefix = "+" }: { value: number; prefix?: string }) {
  return (
    <span className="increase-calc__gain-value" aria-label={`${prefix} ${formatCurrency(value)}`}>
      {prefix} {formatCurrency(value)}
    </span>
  );
}

function GainTile({
  value,
  label,
  primary = false,
}: {
  value: number;
  label: string;
  primary?: boolean;
}) {
  return (
    <div className={`increase-calc__gain-tile${primary ? " increase-calc__gain-tile--primary" : ""}`}>
      <p className="increase-calc__gain-tile-amount">
        <GainAmount value={value} />
        <span className="increase-calc__gain-unit"> / mois</span>
      </p>
      <p className="increase-calc__gain-tile-label">{label}</p>
    </div>
  );
}

function EmptyGainCard({ footerHint }: { footerHint: string }) {
  return (
    <div
      className="increase-calc__gain-card increase-calc__gain-card--placeholder"
      role="region"
      aria-labelledby="empty-gain-heading"
      aria-describedby="empty-gain-a11y-desc"
    >
      <h3 id="empty-gain-heading" className="increase-calc__results-title">
        Votre gain estimé
      </h3>

      <div className="increase-calc__empty-waiting">
        <p className="increase-calc__empty-waiting-lead">Votre résultat apparaîtra ici</p>
        <p className="increase-calc__empty-waiting-note">Le calcul se met à jour automatiquement.</p>
      </div>

      <div className="increase-calc__empty-slots">
        <div className="increase-calc__empty-slot">
          <span className="increase-calc__empty-slot-amount" aria-hidden="true">
            -- €
          </span>
          <span className="increase-calc__empty-slot-label">Gain net / mois</span>
        </div>
        <div className="increase-calc__empty-slot">
          <span className="increase-calc__empty-slot-amount" aria-hidden="true">
            -- €
          </span>
          <span className="increase-calc__empty-slot-label">Gain net / an</span>
        </div>
      </div>
      <p id="empty-gain-a11y-desc" className="increase-calc__sr-only">
        Le gain net mensuel et annuel sera affiché après la saisie.
      </p>

      <p className="increase-calc__empty-footer">{footerHint}</p>
    </div>
  );
}

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
}

export function SalaryIncreaseResults({
  result,
  hasSalary,
  hasIncrease,
  validationError,
  withholdingRate,
}: SalaryIncreaseResultsProps) {
  if (validationError) {
    return (
      <div className="increase-calc-results">
        <p className="increase-calc__error" role="alert">
          {validationError}
        </p>
      </div>
    );
  }

  if (!hasSalary) {
    return (
      <div className="increase-calc-results">
        <EmptyGainCard footerHint="Commencez par renseigner votre salaire." />
      </div>
    );
  }

  if (!hasIncrease || !result) {
    return (
      <div className="increase-calc-results">
        <EmptyGainCard footerHint="Indiquez votre augmentation." />
      </div>
    );
  }

  const { before, after, gain, percentGain } = result;

  const newSalaryCards = [
    {
      label: "Net après prélèvement à la source",
      value: after.netAfterTaxMonthly,
      highlight: true,
      unit: " / mois",
    },
    {
      label: "Net avant prélèvement à la source",
      value: after.netMonthly,
      highlight: false,
      unit: " / mois",
    },
    { label: "Brut mensuel", value: after.grossMonthly, highlight: false, unit: " / mois" },
    { label: "Brut annuel", value: after.grossAnnual, highlight: false, unit: " / an" },
  ];

  return (
    <div className="increase-calc-results increase-calc-results--filled">
      <div className="increase-calc__gain-card increase-calc__gain-card--filled">
        <h3 className="increase-calc__results-title">Votre gain estimé</h3>

        <div className="increase-calc__gain-tiles">
          <GainTile
            value={gain.netAfterTaxMonthly}
            label="Net après prélèvement à la source"
            primary
          />
          <GainTile value={gain.netMonthly} label="Net avant prélèvement à la source" />
        </div>

        <div className="increase-calc__gain-annual">
          <p className="increase-calc__gain-annual-line">
            <span className="increase-calc__gain-annual-label">Gain annuel après prélèvement :</span>{" "}
            <GainAmount value={gain.netAfterTaxAnnual} />
            <span className="increase-calc__gain-unit"> / an</span>
          </p>
          <p className="increase-calc__gain-annual-line">
            <span className="increase-calc__gain-annual-label">Gain annuel avant prélèvement :</span>{" "}
            <GainAmount value={gain.netAnnual} />
            <span className="increase-calc__gain-unit"> / an</span>
          </p>
        </div>

        <p className="increase-calc__gain-context">
          Simulation basée sur une augmentation de {formatCurrency(gain.grossMonthly)} brut par mois.
        </p>
      </div>

      <section className="increase-calc__after-block" aria-labelledby="after-increase-title">
        <h3 id="after-increase-title" className="increase-calc__results-title">
          Votre nouveau salaire
        </h3>
        <div className="increase-calc__after-grid">
          {newSalaryCards.map((card) => (
            <div
              key={card.label}
              className={`increase-calc__after-item${card.highlight ? " increase-calc__after-item--highlight" : ""}`}
            >
              <span className="increase-calc__after-label">{card.label}</span>
              <strong className="increase-calc__after-value">
                {formatCurrency(card.value)}
                <span className="increase-calc__gain-unit">{card.unit}</span>
              </strong>
            </div>
          ))}
        </div>
      </section>

      <section className="increase-calc__comparison" aria-labelledby="comparison-title">
        <h3 id="comparison-title" className="increase-calc__block-title">
          Comparaison avant / après
        </h3>
        <p className="increase-calc__comparison-subtitle">Comparaison des montants mensuels</p>
        <table className="increase-calc__table increase-calc__table--compact">
          <caption className="increase-calc__sr-only">
            Comparaison mensuelle avant et après augmentation
          </caption>
          <thead>
            <tr>
              <th scope="col">Indicateur</th>
              <th scope="col">Avant</th>
              <th scope="col">Après</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Brut</th>
              <td>{formatCurrency(before.grossMonthly)}</td>
              <td className="increase-calc__col-after">{formatCurrency(after.grossMonthly)}</td>
            </tr>
            <tr>
              <th scope="row">Net avant prélèvement</th>
              <td>{formatCurrency(before.netMonthly)}</td>
              <td className="increase-calc__col-after">{formatCurrency(after.netMonthly)}</td>
            </tr>
            <tr className="increase-calc__row--emphasis">
              <th scope="row">Net après prélèvement</th>
              <td>{formatCurrency(before.netAfterTaxMonthly)}</td>
              <td className="increase-calc__col-after">{formatCurrency(after.netAfterTaxMonthly)}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <details className="increase-calc__accordion">
        <summary className="increase-calc__accordion-summary">Voir le détail du calcul</summary>
        <div className="increase-calc__accordion-body">
          <ul className="increase-calc__details-list">
            <li>Gain brut mensuel : + {formatCurrency(gain.grossMonthly)}</li>
            <li>Gain brut annuel : + {formatCurrency(gain.grossAnnual)}</li>
            <li>
              Gain net mensuel avant prélèvement à la source : + {formatCurrency(gain.netMonthly)}
            </li>
            <li>
              Gain net annuel avant prélèvement à la source : + {formatCurrency(gain.netAnnual)}
            </li>
            <li>
              Gain net mensuel après prélèvement à la source : +{" "}
              {formatCurrency(gain.netAfterTaxMonthly)}
            </li>
            <li>
              Gain net annuel après prélèvement à la source : +{" "}
              {formatCurrency(gain.netAfterTaxAnnual)}
            </li>
            <li>Progression brute estimée : {formatPercentFr(percentGain.gross)}</li>
            <li>Progression nette estimée : {formatPercentFr(percentGain.net)}</li>
            {withholdingRate > 0 ? (
              <li>Taux de prélèvement à la source appliqué : {formatWithholdingRatePercent(withholdingRate)}</li>
            ) : null}
          </ul>
        </div>
      </details>
    </div>
  );
}
