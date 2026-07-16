import { formatCurrency, formatWithholdingRatePercent } from "@/site/salary-calculator";
import type { PasCalculatorResult } from "./types";

function formatApproxEuro(value: number): string {
  return formatCurrency(Math.round(value));
}

function EmptyPasCard() {
  return (
    <div
      className="increase-calc__gain-card increase-calc__gain-card--placeholder"
      role="region"
      aria-labelledby="pas-empty-heading"
    >
      <h3 id="pas-empty-heading" className="increase-calc__results-title">
        Votre estimation
      </h3>

      <div className="increase-calc__empty-waiting">
        <p className="increase-calc__empty-waiting-lead">Votre résultat apparaîtra ici</p>
        <p className="increase-calc__empty-waiting-note">Le calcul se met à jour automatiquement.</p>
      </div>

      <div className="increase-calc__empty-slots">
        <div className="increase-calc__empty-slot">
          <span className="increase-calc__empty-slot-amount" aria-hidden="true">
            -- %
          </span>
          <span className="increase-calc__empty-slot-label">Taux de prélèvement estimé</span>
        </div>
        <div className="increase-calc__empty-slot">
          <span className="increase-calc__empty-slot-amount" aria-hidden="true">
            -- €
          </span>
          <span className="increase-calc__empty-slot-label">Salaire réellement versé</span>
        </div>
      </div>

      <p className="increase-calc__empty-footer">Commencez par renseigner votre salaire.</p>
    </div>
  );
}

export interface PasResultsProps {
  result: PasCalculatorResult | null;
  hasSalary: boolean;
  validationError: string | null;
}

export function PasResults({ result, hasSalary, validationError }: PasResultsProps) {
  if (validationError) {
    return (
      <div className="increase-calc-results">
        <p className="increase-calc__error" role="alert">
          {validationError}
        </p>
      </div>
    );
  }

  if (!hasSalary || !result) {
    return (
      <div className="increase-calc-results">
        <EmptyPasCard />
      </div>
    );
  }

  const rateLabel = formatWithholdingRatePercent(result.withholdingRate);
  const showNetAfter = result.netAfterTaxMonthly !== null;

  return (
    <div className="increase-calc-results increase-calc-results--filled">
      <div className="increase-calc__gain-card increase-calc__gain-card--filled">
        <h3 className="increase-calc__results-title">Votre estimation</h3>

        <div className="increase-calc__gain-tiles">
          <div className="increase-calc__gain-tile increase-calc__gain-tile--primary">
            <p className="increase-calc__gain-tile-label">Taux de prélèvement estimé</p>
            <p className="increase-calc__gain-tile-amount">
              <span className="increase-calc__gain-value">{rateLabel}</span>
            </p>
            <p className="increase-calc__gain-note">Taux estimé de prélèvement à la source.</p>
          </div>
        </div>

        <div className="increase-calc__after-grid pas-calc__main-grid" role="list">
          <div className="increase-calc__after-item increase-calc__after-item--highlight" role="listitem">
            <span className="increase-calc__after-label">Prélèvement mensuel</span>
            <strong className="increase-calc__after-value">
              {formatCurrency(result.withholdingMonthly)}
            </strong>
            <span className="increase-calc__comparison-subtitle pas-calc__item-hint">
              prélevés chaque mois
            </span>
          </div>
          <div className="increase-calc__after-item increase-calc__after-item--highlight" role="listitem">
            <span className="increase-calc__after-label">
              {showNetAfter ? "Salaire réellement versé" : "Prélèvement annuel estimé"}
            </span>
            <strong className="increase-calc__after-value">
              {showNetAfter
                ? formatCurrency(result.netAfterTaxMonthly!)
                : formatCurrency(result.withholdingAnnual)}
            </strong>
            <span className="increase-calc__comparison-subtitle pas-calc__item-hint">
              {showNetAfter
                ? "estimés par mois après prélèvement"
                : "sur la base du net imposable saisi"}
            </span>
          </div>
        </div>

        <div className="increase-calc__gain-annual">
          <p className="increase-calc__gain-annual-line">
            <span className="increase-calc__gain-annual-label">Montant prélevé sur une année :</span>{" "}
            <span className="increase-calc__gain-value">
              {formatCurrency(result.withholdingAnnual)}
            </span>
            <span className="increase-calc__gain-unit"> / an</span>
          </p>
          {result.netMonthly !== null ? (
            <p className="increase-calc__gain-annual-line">
              <span className="increase-calc__gain-annual-label">Salaire net avant prélèvement :</span>{" "}
              <span className="increase-calc__gain-value">{formatCurrency(result.netMonthly)}</span>
              <span className="increase-calc__gain-unit"> / mois</span>
            </p>
          ) : null}
        </div>
      </div>

      <p className="increase-calc__summary pas-calc__summary">
        Selon les informations renseignées, votre taux de prélèvement est estimé à {rateLabel}.
        Environ {formatApproxEuro(result.withholdingMonthly)} seront prélevés chaque mois.
        {showNetAfter
          ? ` Votre salaire net estimé après prélèvement est d'environ ${formatApproxEuro(result.netAfterTaxMonthly!)} par mois.`
          : null}
      </p>

      <aside className="increase-calc__comparison" aria-label="Bon à savoir">
        <p className="increase-calc__block-title">Bon à savoir</p>
        <p className="increase-calc__summary pas-calc__tip-body">
          Le prélèvement à la source n&apos;est pas une cotisation sociale. Il s&apos;agit d&apos;un
          acompte sur votre impôt sur le revenu. Le taux dépend notamment de votre situation fiscale
          et familiale. Le résultat fourni ici constitue une estimation.
        </p>
      </aside>
    </div>
  );
}
