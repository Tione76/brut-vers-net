import { formatCurrency } from "@/site/salary-calculator";
import { formatSeniorityLabel } from "./engine";
import type { DismissalCompensationResult } from "./types";

type DismissalCompensationResultsProps = {
  result: DismissalCompensationResult | null;
  hasInputs: boolean;
  validationError: string | null;
};

function MoneyAmount({ value }: { value: number }) {
  return (
    <span className="increase-calc__gain-value" aria-label={formatCurrency(value)}>
      {formatCurrency(value)}
    </span>
  );
}

function EmptyCard({ footerHint }: { footerHint: string }) {
  return (
    <div
      className="increase-calc__gain-card increase-calc__gain-card--placeholder"
      role="region"
      aria-labelledby="dismissal-empty-heading"
    >
      <h3 id="dismissal-empty-heading" className="increase-calc__results-title">
        Votre indemnité estimée
      </h3>
      <div className="increase-calc__empty-waiting">
        <p className="increase-calc__empty-waiting-lead">Votre résultat apparaîtra ici</p>
        <p className="increase-calc__empty-waiting-note">
          Renseignez votre ancienneté et vos salaires bruts de référence.
        </p>
      </div>
      <div className="increase-calc__empty-slots">
        <div className="increase-calc__empty-slot">
          <span className="increase-calc__empty-slot-amount" aria-hidden="true">
            -- €
          </span>
          <span className="increase-calc__empty-slot-label">
            Indemnité légale minimale estimée
          </span>
        </div>
      </div>
      <p className="increase-calc__empty-footer">{footerHint}</p>
    </div>
  );
}

export function DismissalCompensationResults({
  result,
  hasInputs,
  validationError,
}: DismissalCompensationResultsProps) {
  if (validationError) {
    return (
      <div className="increase-calc-results">
        <p className="increase-calc__error" role="alert">
          {validationError}
        </p>
      </div>
    );
  }

  if (!hasInputs || !result) {
    return (
      <div className="increase-calc-results">
        <EmptyCard footerHint="Le calcul se met à jour automatiquement." />
      </div>
    );
  }

  const showSecondBracket = result.secondBracketYears > 0 && result.eligible;
  const showDetailCards = result.eligible;

  return (
    <div className="increase-calc-results increase-calc-results--filled">
      <div className="increase-calc__gain-card increase-calc__gain-card--filled">
        <h3 className="increase-calc__results-title">
          Votre indemnité de licenciement estimée
        </h3>

        <p className="dismissal-results__hero-amount">
          <MoneyAmount value={result.retainedAmount} />
        </p>
        <p className="dismissal-results__hero-label">{result.resultLabel}</p>

        <p className="dismissal-results__summary">{result.summaryBrief}</p>
      </div>

      {showDetailCards ? (
        <section className="increase-calc__after-block" aria-labelledby="dismissal-detail-title">
          <h3 id="dismissal-detail-title" className="increase-calc__results-title">
            Détail de votre estimation
          </h3>
          <div className="increase-calc__after-grid">
            <div className="increase-calc__after-item">
              <span className="increase-calc__after-label">Salaire de référence retenu</span>
              <strong className="increase-calc__after-value">
                {formatCurrency(result.referenceSalary)}
                <span className="increase-calc__gain-unit"> brut / mois</span>
              </strong>
            </div>
            <div className="increase-calc__after-item">
              <span className="increase-calc__after-label">Ancienneté prise en compte</span>
              <strong className="increase-calc__after-value">
                {formatSeniorityLabel(result.seniorityYears, result.seniorityMonths)}
              </strong>
            </div>
            <div className="increase-calc__after-item">
              <span className="increase-calc__after-label">
                Part correspondant aux 10 premières années
              </span>
              <strong className="increase-calc__after-value">
                {formatCurrency(result.firstBracketAmount)}
              </strong>
            </div>
            {showSecondBracket ? (
              <div className="increase-calc__after-item">
                <span className="increase-calc__after-label">
                  Part correspondant aux années au-delà de 10 ans
                </span>
                <strong className="increase-calc__after-value">
                  {formatCurrency(result.secondBracketAmount)}
                </strong>
              </div>
            ) : null}
          </div>

          <p className="dismissal-results__method">
            Méthode retenue : {result.referenceMethodLabel}
            {result.referenceMethod === "average3" && result.average12 !== null
              ? ", plus avantageuse que la moyenne des 12 derniers mois (ou mois travaillés)"
              : result.average3 !== null && result.referenceMethod !== "average3"
                ? ", plus avantageuse que la moyenne des 3 derniers mois"
                : ""}
            .
          </p>
        </section>
      ) : null}

      {result.professionalUnfitnessApplied ? (
        <p className="dismissal-results__note" role="note">
          Une indemnité compensatrice équivalente au préavis peut également être due. Elle n&apos;est
          pas incluse dans cette estimation.
        </p>
      ) : null}

      <aside className="dismissal-results__notice" aria-label="Bon à savoir">
        <p className="dismissal-results__notice-title">Bon à savoir</p>
        <p>
          Cette estimation correspond au minimum légal. Votre convention collective, votre contrat
          de travail ou un usage dans l&apos;entreprise peut prévoir une indemnité plus favorable.
        </p>
        <p>
          Le résultat n&apos;inclut pas le préavis, les congés payés restants, une éventuelle
          indemnité prud&apos;homale ni les autres sommes dues lors de la rupture.
        </p>
      </aside>

      {result.eligible ? (
        <details className="increase-calc__accordion">
          <summary className="increase-calc__accordion-summary">Voir le détail du calcul</summary>
          <div className="increase-calc__accordion-body">
            <ul className="increase-calc__details-list">
              <li>
                Moyenne brute saisie (12 mois ou mois travaillés) :{" "}
                {formatCurrency(result.average12 ?? 0)} / mois
              </li>
              <li>
                Moyenne brute des 3 derniers mois
                {result.average3BeforeBonus !== null
                  ? ` : ${formatCurrency(result.average3BeforeBonus)} / mois`
                  : " : non renseignée"}
              </li>
              {result.bonusMonthlyProration > 0 ? (
                <li>
                  Proratisation de la prime : + {formatCurrency(result.bonusMonthlyProration)} / mois
                </li>
              ) : null}
              <li>
                Salaire de référence retenu : {formatCurrency(result.referenceSalary)} brut / mois (
                {result.referenceMethodLabel})
              </li>
              <li>
                Ancienneté : {formatSeniorityLabel(result.seniorityYears, result.seniorityMonths)}{" "}
                (soit {result.seniorityInYears.toLocaleString("fr-FR", { maximumFractionDigits: 2 })}{" "}
                année
                {result.seniorityInYears > 1 ? "s" : ""})
              </li>
              <li>
                Tranche jusqu&apos;à 10 ans :{" "}
                {result.firstBracketYears.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} ×
                1/4 × {formatCurrency(result.referenceSalary)} ={" "}
                {formatCurrency(result.firstBracketAmount)}
              </li>
              {result.secondBracketYears > 0 ? (
                <li>
                  Tranche au-delà de 10 ans :{" "}
                  {result.secondBracketYears.toLocaleString("fr-FR", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  × 1/3 × {formatCurrency(result.referenceSalary)} ={" "}
                  {formatCurrency(result.secondBracketAmount)}
                </li>
              ) : null}
              <li>
                Indemnité légale de base estimée : {formatCurrency(result.legalBaseAmount)}
              </li>
              {result.professionalUnfitnessApplied ? (
                <li>
                  Doublement pour inaptitude d&apos;origine professionnelle :{" "}
                  {formatCurrency(result.legalAmount)}
                </li>
              ) : null}
              {result.conventionAmount !== null ? (
                <li>
                  Montant conventionnel saisi : {formatCurrency(result.conventionAmount)}
                  {result.retainedSource === "convention"
                    ? " (retenu car plus favorable)"
                    : " (inférieur ou égal au minimum légal)"}
                </li>
              ) : null}
              <li>Montant minimal estimé retenu : {formatCurrency(result.retainedAmount)}</li>
            </ul>
          </div>
        </details>
      ) : null}
    </div>
  );
}
