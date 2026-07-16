import { formatCurrency } from "@/site/salary-calculator";
import type { OvertimeSalaryResult } from "./types";

type OvertimeSalaryResultsProps = {
  result: OvertimeSalaryResult | null;
  hasSalary: boolean;
  hasHours: boolean;
  validationError: string | null;
  highHoursWarning: string | null;
};

function MoneyAmount({
  value,
  prefix = "",
}: {
  value: number;
  prefix?: string;
}) {
  const label = prefix ? `${prefix} ${formatCurrency(value)}` : formatCurrency(value);
  return (
    <span className="increase-calc__gain-value" aria-label={label}>
      {prefix ? `${prefix} ` : null}
      {formatCurrency(value)}
    </span>
  );
}

function EmptyGainCard({ footerHint }: { footerHint: string }) {
  return (
    <div
      className="increase-calc__gain-card increase-calc__gain-card--placeholder"
      role="region"
      aria-labelledby="overtime-empty-gain-heading"
      aria-describedby="overtime-empty-gain-a11y-desc"
    >
      <h3 id="overtime-empty-gain-heading" className="increase-calc__results-title">
        Votre nouveau salaire avec heures supplémentaires
      </h3>

      <div className="increase-calc__empty-waiting">
        <p className="increase-calc__empty-waiting-lead">Votre résultat apparaîtra ici</p>
        <p className="increase-calc__empty-waiting-note">
          Renseignez votre salaire et vos heures supplémentaires.
        </p>
      </div>

      <div className="increase-calc__empty-slots">
        <div className="increase-calc__empty-slot">
          <span className="increase-calc__empty-slot-amount" aria-hidden="true">
            -- € net / mois
          </span>
          <span className="increase-calc__empty-slot-label">Nouveau salaire net</span>
        </div>
        <div className="increase-calc__empty-slot">
          <span className="increase-calc__empty-slot-amount" aria-hidden="true">
            -- € net de plus
          </span>
          <span className="increase-calc__empty-slot-label">Gain net / mois</span>
        </div>
      </div>
      <p id="overtime-empty-gain-a11y-desc" className="increase-calc__sr-only">
        Le nouveau salaire net et le gain apparaîtront après la saisie.
      </p>

      <p className="increase-calc__empty-footer">{footerHint}</p>
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
        <EmptyGainCard footerHint="Le calcul se met à jour automatiquement." />
      </div>
    );
  }

  if (!hasHours || !result) {
    return (
      <div className="increase-calc-results">
        <EmptyGainCard footerHint="Indiquez au moins une heure supplémentaire." />
      </div>
    );
  }

  const detailCards = [
    {
      label: "Nouveau salaire brut mensuel",
      value: result.newGrossMonthly,
    },
    {
      label: "Rémunération brute des heures supplémentaires",
      value: result.overtimeGrossTotal,
    },
  ];

  return (
    <div className="increase-calc-results increase-calc-results--filled">
      {highHoursWarning ? (
        <p className="increase-calc__hint" role="status">
          {highHoursWarning}
        </p>
      ) : null}

      <div className="increase-calc__gain-card increase-calc__gain-card--filled">
        <h3 className="increase-calc__results-title">
          Votre nouveau salaire avec heures supplémentaires
        </h3>

        <p className="overtime-results__hero-amount">
          <MoneyAmount value={result.newNetMonthly} />
          <span className="increase-calc__gain-unit"> / mois</span>
        </p>
        <p className="overtime-results__hero-label">
          Nouveau salaire net mensuel avant prélèvement à la source
        </p>

        <p className="overtime-results__secondary-amount">
          <span className="overtime-results__soit">Soit </span>
          <MoneyAmount value={result.overtimeNetGain} prefix="+" />
          <span className="increase-calc__gain-unit"> / mois</span>
        </p>
        <p className="overtime-results__secondary-label">
          Gain net estimé grâce aux heures supplémentaires
        </p>

        <p className="overtime-results__summary">{result.summaryBrief}</p>
      </div>

      <section className="increase-calc__after-block" aria-labelledby="overtime-detail-title">
        <h3 id="overtime-detail-title" className="increase-calc__results-title">
          Détail de votre rémunération
        </h3>
        <div className="increase-calc__after-grid">
          {detailCards.map((card) => (
            <div key={card.label} className="increase-calc__after-item">
              <span className="increase-calc__after-label">{card.label}</span>
              <strong className="increase-calc__after-value">
                {formatCurrency(card.value)}
                <span className="increase-calc__gain-unit"> / mois</span>
              </strong>
            </div>
          ))}
        </div>
      </section>

      <details className="increase-calc__accordion">
        <summary className="increase-calc__accordion-summary">Voir le détail du calcul</summary>
        <div className="increase-calc__accordion-body">
          <ul className="increase-calc__details-list">
            <li>
              Salaire brut mensuel de base : {formatCurrency(result.baseGrossMonthly)} / mois
            </li>
            <li>
              Taux horaire brut estimé : {formatCurrency(result.hourlyGrossBase)} / h
            </li>
            <li>
              Heures au premier taux : {result.group1.hours} h sur le mois (majoration{" "}
              {result.group1.majorationPercent} %)
            </li>
            <li>
              Valeur brute d&apos;une heure au premier taux :{" "}
              {formatCurrency(result.group1.hourlyValue)}
            </li>
            <li>Total brut du premier groupe : {formatCurrency(result.group1.gross)} / mois</li>
            <li>
              Heures au second taux : {result.group2.hours} h sur le mois (majoration{" "}
              {result.group2.majorationPercent} %)
            </li>
            <li>
              Valeur brute d&apos;une heure au second taux :{" "}
              {formatCurrency(result.group2.hourlyValue)}
            </li>
            <li>Total brut du second groupe : {formatCurrency(result.group2.gross)} / mois</li>
            <li>
              Rémunération brute totale des heures supplémentaires :{" "}
              {formatCurrency(result.overtimeGrossTotal)} / mois
            </li>
            <li>
              Réduction estimée de cotisations salariales :{" "}
              {formatCurrency(result.contributionRelief)}
            </li>
            <li>Salaire brut final : {formatCurrency(result.newGrossMonthly)} / mois</li>
            <li>
              Salaire net estimé final avant prélèvement à la source :{" "}
              {formatCurrency(result.newNetMonthly)} / mois
            </li>
            <li>Gain net estimé : {formatCurrency(result.overtimeNetGain)} / mois</li>
            <li>
              Hypothèses : salarié du secteur privé à temps plein (35 h), heures supplémentaires
              payées saisies sur le mois, estimation avant prélèvement à la source.
            </li>
          </ul>
        </div>
      </details>
    </div>
  );
}
