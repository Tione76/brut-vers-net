import {
  DE_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
  DE_MIN_WAGE_CURRENT_FROM_LABEL,
  DE_MIN_WAGE_LABELS as L,
  DE_MIN_WAGE_NEXT_FROM_LABEL,
  DE_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
} from "./data";
import "./key-figures.css";

const TITLE_ID = "essentiel-salaire-minimum-allemagne";

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
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M4 16l5-5 4 4 7-7" />
      <path d="M14 8h6v6" />
    </svg>
  );
}

/**
 * Encadré « L'essentiel » propre à /salaire-minimum-allemagne.
 * Ordre de lecture imposé : taux actuel, exemple mensuel, taux futur, vérification.
 */
export function DeMinWageKeyFigures() {
  return (
    <section className="de-mw-key" aria-labelledby={TITLE_ID}>
      <h2 id={TITLE_ID} className="de-mw-key__title">
        {DE_MIN_WAGE_AMOUNTS_BLOCK_TITLE}
      </h2>

      <div className="de-mw-key__item de-mw-key__item--current">
        <div className="de-mw-key__head">
          <span className="de-mw-key__icon">
            <ClockIcon />
          </span>
          <h3 className="de-mw-key__label">Salaire minimum actuel</h3>
          <span className="de-mw-key__badge de-mw-key__badge--current">En vigueur</span>
        </div>
        <p className="de-mw-key__figure">
          <span className="de-mw-key__amount">{L.currentHourlyShort}</span>{" "}
          <span className="de-mw-key__unit">brut par heure</span>
        </p>
        <p className="de-mw-key__meta">
          Depuis le {DE_MIN_WAGE_CURRENT_FROM_LABEL}. Taux légal général, sous réserve des{" "}
          <a href="#exceptions">exceptions détaillées plus bas</a>.
        </p>
      </div>

      <div className="de-mw-key__item de-mw-key__item--monthly">
        <div className="de-mw-key__head">
          <span className="de-mw-key__icon">
            <CalendarIcon />
          </span>
          <h3 className="de-mw-key__label">Combien par mois ?</h3>
        </div>
        <p className="de-mw-key__text">
          Le montant dépend du nombre d&apos;heures travaillées : il n&apos;existe pas de salaire
          minimum mensuel légal unique.
        </p>
        <div className="de-mw-key__example">
          <p className="de-mw-key__example-label">Exemple pour 35&nbsp;h par semaine</p>
          <p className="de-mw-key__figure de-mw-key__figure--secondary">
            <span className="de-mw-key__amount">{L.monthly35}</span>{" "}
            <span className="de-mw-key__unit">brut par mois</span>
          </p>
          <p className="de-mw-key__meta">Moyenne théorique calculée sur 52&nbsp;semaines.</p>
        </div>
      </div>

      <div className="de-mw-key__item de-mw-key__item--next">
        <div className="de-mw-key__head">
          <span className="de-mw-key__icon">
            <TrendIcon />
          </span>
          <h3 className="de-mw-key__label">Prochaine hausse</h3>
          <span className="de-mw-key__badge de-mw-key__badge--next">À venir</span>
        </div>
        <p className="de-mw-key__figure de-mw-key__figure--tertiary">
          <span className="de-mw-key__amount">{L.nextHourlyShort}</span>{" "}
          <span className="de-mw-key__unit">brut par heure</span>
        </p>
        <p className="de-mw-key__meta">
          À partir du {DE_MIN_WAGE_NEXT_FROM_LABEL}, pas encore applicable.
        </p>
      </div>

      <p className="de-mw-key__footer">
        Vérification documentaire le {DE_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}.
      </p>
    </section>
  );
}
