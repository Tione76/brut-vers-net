import { formatCurrency } from "@/site/salary-calculator";
import { formatSeniorityLabel } from "./engine";
import type { DismissalCompensationResult, SpecialSituationKey } from "./types";

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

const SPECIAL_SITUATION_MESSAGES: Record<SpecialSituationKey, string> = {
  mixedWorkTime:
    "L'indemnité doit généralement être calculée proportionnellement à la durée de chaque période travaillée à temps plein et à temps partiel. Le calcul simplifié affiché ne tient pas compte de cette répartition.",
  recentSickLeaveOrTherapeuticPartTime:
    "Le salaire de référence peut devoir être recherché avant l'arrêt maladie ou le temps partiel thérapeutique. Le montant affiché peut donc être sous-estimé ou surestimé.",
  partTimeParentalLeave:
    "Un congé parental à temps partiel peut nécessiter une reconstitution ou une ventilation spécifique de la rémunération et de l'ancienneté.",
  otherContractInterruption:
    "Les effets dépendent de la nature exacte de la suspension ou de l'interruption. Certaines périodes comptent dans l'ancienneté, d'autres non.",
};

function TrustWarningPanel({
  selectedSpecialSituations,
}: {
  selectedSpecialSituations: SpecialSituationKey[];
}) {
  return (
    <aside
      className="dismissal-results__warning"
      aria-label="Estimation à vérifier"
      aria-live="polite"
    >
      <h3 className="dismissal-results__warning-title">Estimation à vérifier</h3>
      <p>
        Votre parcours comporte une situation particulière qui peut modifier l&apos;ancienneté
        retenue ou le salaire de référence. Le montant calculé ci-dessus est conservé uniquement à
        titre indicatif et ne doit pas être utilisé sans vérification complémentaire.
      </p>
      <p className="dismissal-results__warning-state">
        Résultat indicatif : situation particulière sélectionnée, vérification nécessaire.
      </p>
      <ul className="dismissal-results__warning-bullets">
        {selectedSpecialSituations.map((key) => (
          <li key={key}>{SPECIAL_SITUATION_MESSAGES[key]}</li>
        ))}
      </ul>
    </aside>
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
  const isProfessionalUnfitness = result.professionalUnfitnessApplied;
  const shouldDimResults = result.hasSpecialSituationWarning;
  const title = isProfessionalUnfitness
    ? "Votre indemnité spéciale de licenciement estimée"
    : result.zeroReason === "grossMisconduct"
      ? "Indemnité légale estimée"
      : "Votre indemnité de licenciement estimée";

  const dimmedClass = shouldDimResults ? "dismissal-results__dimmed" : undefined;

  return (
    <div className="increase-calc-results increase-calc-results--filled">
      <div className={dimmedClass}>
        <div className="increase-calc__gain-card increase-calc__gain-card--filled">
          <h3 className="increase-calc__results-title">{title}</h3>

          <p className="dismissal-results__hero-amount">
            <MoneyAmount value={result.retainedAmount} />
          </p>
          <p className="dismissal-results__hero-label">
            {shouldDimResults ? "Résultat indicatif non fiabilisé" : result.resultLabel}
          </p>
          {shouldDimResults ? <p className="dismissal-results__verify-badge">À vérifier</p> : null}

          <p className="dismissal-results__summary">{result.summaryBrief}</p>
        </div>

        {showDetailCards ? (
          <section
            className="increase-calc__after-block"
            aria-labelledby="dismissal-detail-title"
          >
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
            {isProfessionalUnfitness ? (
              <div className="dismissal-results__special-breakdown">
                <p>Indemnité légale de base : {formatCurrency(result.legalBaseAmount)}</p>
                <p>Doublement prévu pour l&apos;inaptitude professionnelle : ×2</p>
                <p>Indemnité spéciale estimée : {formatCurrency(result.retainedAmount)}</p>
                <p className="dismissal-results__special-caption">
                  Calculée sur la base du double de l&apos;indemnité légale minimale.
                </p>
              </div>
          ) : null}
        </section>
      ) : null}

        {result.professionalUnfitnessApplied ? (
          <aside className="dismissal-results__notice" aria-label="Préavis non inclus">
            <p className="dismissal-results__notice-title">Autre somme potentiellement due</p>
            <p>
              Une indemnité compensatrice d&apos;un montant égal au préavis peut également être due.
              Elle n&apos;est pas incluse dans cette estimation, car sa durée dépend notamment de votre
              situation et des règles applicables.
            </p>
          </aside>
        ) : null}
      </div>

      {shouldDimResults ? (
        <TrustWarningPanel selectedSpecialSituations={result.selectedSpecialSituations} />
      ) : null}

      <div className={dimmedClass}>
        <aside className="dismissal-results__notice" aria-label="Bon à savoir">
          <p className="dismissal-results__notice-title">Bon à savoir</p>
          <p>
            Cette estimation correspond au minimum légal dans le périmètre indiqué. Elle n&apos;inclut
            pas les congés payés, les sommes liées au préavis, une éventuelle indemnité prud&apos;homale
            ni les autres montants dus lors de la rupture. Votre convention collective, votre contrat
            ou un usage peut prévoir un montant plus favorable.
          </p>
        </aside>

        {result.eligible ? (
          <details className="increase-calc__accordion" aria-disabled={shouldDimResults ? "true" : undefined}>
            <summary
              className="increase-calc__accordion-summary"
              aria-disabled={shouldDimResults ? "true" : undefined}
              tabIndex={shouldDimResults ? -1 : 0}
              onClick={(e) => {
                if (shouldDimResults) e.preventDefault();
              }}
            >
              Voir le détail du calcul
            </summary>
            <div className="increase-calc__accordion-body">
              <ul className="increase-calc__details-list">
                <li>
                  {isProfessionalUnfitness
                    ? `Salaire de référence saisi (L.1226-16) : ${formatCurrency(
                        result.professionalUnfitnessAverage3 ?? 0,
                      )} / mois`
                    : `Moyenne brute saisie (12 mois ou mois travaillés) : ${formatCurrency(
                        result.average12 ?? 0,
                      )} / mois`}
                </li>
                {!isProfessionalUnfitness ? (
                  <li>
                    Moyenne brute des 3 derniers mois
                    {result.average3BeforeBonus !== null
                      ? ` : ${formatCurrency(result.average3BeforeBonus)} / mois`
                      : " : non renseignée"}
                  </li>
                ) : null}
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
                  Ancienneté :{" "}
                  {formatSeniorityLabel(result.seniorityYears, result.seniorityMonths)}{" "}
                  (soit{" "}
                  {result.seniorityInYears.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} année
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
                <li>Indemnité légale de base estimée : {formatCurrency(result.legalBaseAmount)}</li>
                {result.professionalUnfitnessApplied ? (
                  <li>
                    Doublement pour inaptitude d&apos;origine professionnelle :{" "}
                    {formatCurrency(result.legalAmount)} (préavis non inclus)
                  </li>
                ) : null}
                <li>Montant minimal estimé retenu : {formatCurrency(result.retainedAmount)}</li>
              </ul>
            </div>
          </details>
        ) : null}
      </div>
    </div>
  );
}
