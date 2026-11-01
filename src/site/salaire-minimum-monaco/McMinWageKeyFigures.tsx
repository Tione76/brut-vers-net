import {
  MC_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
  MC_MIN_WAGE_LABELS as L,
  MC_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  MC_SMIC_CURRENT_FROM_LABEL,
} from "./data";
import "./key-figures.css";

const TITLE_ID = "essentiel-salaire-minimum-monaco";

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 11h18" />
    </svg>
  );
}

function PercentIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <circle cx="7.5" cy="7.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

/**
 * Encadré « L'essentiel » propre à /salaire-minimum-monaco.
 * Ordre : horaire de base, mensuel 39 h, 5 %, total avant retenues.
 */
export function McMinWageKeyFigures() {
  return (
    <section className="mc-mw-key" aria-labelledby={TITLE_ID}>
      <h2 id={TITLE_ID} className="mc-mw-key__title">
        {MC_MIN_WAGE_AMOUNTS_BLOCK_TITLE}
      </h2>

      <div className="mc-mw-key__item mc-mw-key__item--lead">
        <div className="mc-mw-key__head">
          <span className="mc-mw-key__icon">
            <ClockIcon />
          </span>
          <h3 className="mc-mw-key__label">Taux horaire de base</h3>
          <span className="mc-mw-key__badge">En vigueur</span>
        </div>
        <p className="mc-mw-key__figure">
          <span className="mc-mw-key__amount">{L.hourly}</span>{" "}
          <span className="mc-mw-key__unit">brut / heure</span>
        </p>
        <p className="mc-mw-key__meta">Depuis le {MC_SMIC_CURRENT_FROM_LABEL}.</p>
      </div>

      <div className="mc-mw-key__item">
        <div className="mc-mw-key__head">
          <span className="mc-mw-key__icon">
            <CalendarIcon />
          </span>
          <h3 className="mc-mw-key__label">Mensuel de référence</h3>
        </div>
        <p className="mc-mw-key__figure mc-mw-key__figure--secondary">
          <span className="mc-mw-key__amount">{L.monthly}</span>{" "}
          <span className="mc-mw-key__unit">brut par mois</span>
        </p>
        <p className="mc-mw-key__caption">
          {L.weeklyHours} h par semaine, soit {L.monthlyHours} h par mois
        </p>
        <p className="mc-mw-key__meta">Hors indemnité de 5 %.</p>
      </div>

      <div className="mc-mw-key__item">
        <div className="mc-mw-key__head">
          <span className="mc-mw-key__icon">
            <PercentIcon />
          </span>
          <h3 className="mc-mw-key__label">Indemnité exceptionnelle de 5 %</h3>
        </div>
        <p className="mc-mw-key__text">
          Distincte du salaire de base. Sur ce mensuel de référence : {L.monthly} × 5 % ={" "}
          {L.indemnity}.
        </p>
        <p className="mc-mw-key__meta">
          <a href="#indemnite-5-pourcent">Comment fonctionnent les 5 %</a>
        </p>
      </div>

      <p className="mc-mw-key__total">
        <span className="mc-mw-key__total-label">
          Base + indemnité de 5 %, avant déduction des cotisations applicables et avant impôt
          éventuel
        </span>
        <span className="mc-mw-key__total-value">{L.totalBeforeDeductions}</span>
        <span className="mc-mw-key__total-note">
          {L.monthly} + {L.indemnity}. Ce n&apos;est pas un salaire net.
        </span>
      </p>

      <p className="mc-mw-key__footer">
        Vérification documentaire le {MC_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}.
      </p>
    </section>
  );
}
