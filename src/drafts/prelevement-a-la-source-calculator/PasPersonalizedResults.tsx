import { formatCurrency, formatWithholdingRatePercent } from "@/site/salary-calculator";
import type { PersonalizedPasResult } from "./personnalise/types";

function formatApproxEuro(value: number): string {
  return formatCurrency(Math.round(value));
}

function EmptyPersonalizedCard() {
  return (
    <div
      className="increase-calc__gain-card increase-calc__gain-card--placeholder"
      role="region"
      aria-labelledby="pas-perso-empty-heading"
    >
      <h3 id="pas-perso-empty-heading" className="increase-calc__results-title">
        Votre estimation
      </h3>
      <div className="increase-calc__empty-waiting">
        <p className="increase-calc__empty-waiting-lead">Votre résultat apparaîtra ici</p>
        <p className="increase-calc__empty-waiting-note">
          Renseignez votre situation familiale et vos revenus.
        </p>
      </div>
      <div className="increase-calc__empty-slots">
        <div className="increase-calc__empty-slot">
          <span className="increase-calc__empty-slot-amount" aria-hidden="true">
            -- %
          </span>
          <span className="increase-calc__empty-slot-label">Taux personnalisé estimé</span>
        </div>
        <div className="increase-calc__empty-slot">
          <span className="increase-calc__empty-slot-amount" aria-hidden="true">
            -- €
          </span>
          <span className="increase-calc__empty-slot-label">Salaire net estimé après prélèvement</span>
        </div>
      </div>
      <p className="increase-calc__empty-footer">Complétez le formulaire pour lancer la simulation.</p>
    </div>
  );
}

export interface PasPersonalizedResultsProps {
  result: PersonalizedPasResult | null;
  hasIncome: boolean;
  validationError: string | null;
}

export function PasPersonalizedResults({
  result,
  hasIncome,
  validationError,
}: PasPersonalizedResultsProps) {
  if (validationError) {
    return (
      <div className="increase-calc-results">
        <p className="increase-calc__error" role="alert">
          {validationError}
        </p>
      </div>
    );
  }

  if (!hasIncome || !result) {
    return (
      <div className="increase-calc-results">
        <EmptyPersonalizedCard />
      </div>
    );
  }

  const rateLabel = formatWithholdingRatePercent(result.personalizedRatePercent);
  const showNetAfter = result.netAfterTaxMonthly !== null;

  return (
    <div className="increase-calc-results increase-calc-results--filled">
      <div className="increase-calc__gain-card increase-calc__gain-card--filled">
        <h3 className="increase-calc__results-title">Votre estimation</h3>

        <div className="increase-calc__gain-tiles">
          <div className="increase-calc__gain-tile increase-calc__gain-tile--primary">
            <p className="increase-calc__gain-tile-label">Taux personnalisé estimé</p>
            <p className="increase-calc__gain-tile-amount">
              <span className="increase-calc__gain-value">{rateLabel}</span>
            </p>
            <p className="increase-calc__gain-note">
              Estimation indicative basée sur votre foyer fiscal simulé.
            </p>
          </div>
        </div>

        <div className="increase-calc__after-grid pas-calc__main-grid" role="list">
          <div className="increase-calc__after-item increase-calc__after-item--highlight" role="listitem">
            <span className="increase-calc__after-label">Prélèvement mensuel estimé</span>
            <strong className="increase-calc__after-value">
              {formatCurrency(result.withholdingMonthly)}
            </strong>
            <span className="increase-calc__comparison-subtitle pas-calc__item-hint">
              prélevés chaque mois (estimation)
            </span>
          </div>
          {showNetAfter ? (
            <div
              className="increase-calc__after-item increase-calc__after-item--highlight pas-calc__net-after"
              role="listitem"
            >
              <span className="increase-calc__after-label">
                Salaire net estimé après prélèvement
              </span>
              <strong className="increase-calc__after-value">
                {formatCurrency(result.netAfterTaxMonthly!)}
              </strong>
              <span className="increase-calc__comparison-subtitle pas-calc__item-hint">
                estimés par mois après prélèvement
              </span>
            </div>
          ) : (
            <div className="increase-calc__after-item increase-calc__after-item--highlight" role="listitem">
              <span className="increase-calc__after-label">Prélèvement annuel estimé</span>
              <strong className="increase-calc__after-value">
                {formatCurrency(result.withholdingAnnual)}
              </strong>
              <span className="increase-calc__comparison-subtitle pas-calc__item-hint">
                sur la base du net imposable du déclarant
              </span>
            </div>
          )}
        </div>

        <div className="increase-calc__gain-annual">
          <p className="increase-calc__gain-annual-line">
            <span className="increase-calc__gain-annual-label">Montant annuel estimé :</span>{" "}
            <span className="increase-calc__gain-value">
              {formatCurrency(result.withholdingAnnual)}
            </span>
            <span className="increase-calc__gain-unit"> / an</span>
          </p>
          <p className="increase-calc__gain-annual-line">
            <span className="increase-calc__gain-annual-label">Parts fiscales estimées :</span>{" "}
            <span className="increase-calc__gain-value">
              {result.fiscalParts.toLocaleString("fr-FR", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 1,
              })}
            </span>
          </p>
        </div>
      </div>

      <p className="increase-calc__summary pas-calc__summary">
        Selon les informations renseignées, votre taux personnalisé est estimé à {rateLabel}. Cette
        estimation est basée sur votre situation familiale, le nombre d&apos;enfants déclaré et les
        revenus du foyer. Votre prélèvement mensuel est estimé à environ{" "}
        {formatApproxEuro(result.withholdingMonthly)}.
        {showNetAfter
          ? ` Votre salaire net après prélèvement est estimé à ${formatApproxEuro(result.netAfterTaxMonthly!)}.`
          : null}
      </p>

      <aside className="increase-calc__comparison" aria-label="Méthodologie">
        <p className="increase-calc__block-title">Comment cette estimation est-elle calculée ?</p>
        <p className="increase-calc__summary pas-calc__tip-body">
          Cette simulation reconstitue une estimation de votre revenu imposable puis applique les
          règles fiscales françaises afin d&apos;estimer votre taux personnalisé. Elle ne remplace
          pas le taux communiqué par la DGFiP, qui dépend de votre déclaration fiscale complète.
        </p>
      </aside>
    </div>
  );
}
