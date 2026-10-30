import {
  NL_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
  NL_MIN_WAGE_LABELS as L,
  NL_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  NL_NMW_EFFECTS_FROM_LABEL,
} from "./data";
import "./key-figures.css";

const TITLE_ID = "essentiel-salaire-minimum-pays-bas";

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18M16 13.5h2" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

/**
 * Encadré « L'essentiel » propre à /salaire-minimum-pays-bas.
 */
export function NlMinWageKeyFigures() {
  return (
    <section className="nl-mw-key" aria-labelledby={TITLE_ID}>
      <h2 id={TITLE_ID} className="nl-mw-key__title">
        {NL_MIN_WAGE_AMOUNTS_BLOCK_TITLE}
      </h2>

      <div className="nl-mw-key__item nl-mw-key__item--current">
        <div className="nl-mw-key__head">
          <span className="nl-mw-key__icon">
            <WalletIcon />
          </span>
          <h3 className="nl-mw-key__label">Wettelijk minimumuurloon</h3>
          <span className="nl-mw-key__badge nl-mw-key__badge--current">En vigueur</span>
        </div>
        <p className="nl-mw-key__figure">
          <span className="nl-mw-key__amount">{L.adult}</span>{" "}
          <span className="nl-mw-key__unit">brut par heure</span>
        </p>
        <p className="nl-mw-key__caption">
          21 ans et plus · Pays-Bas européens
        </p>
        <p className="nl-mw-key__meta">
          Depuis le {NL_NMW_EFFECTS_FROM_LABEL}. Ce n&apos;est pas un salaire
          mensuel unique.
        </p>
      </div>

      <div className="nl-mw-key__item nl-mw-key__item--example">
        <div className="nl-mw-key__head">
          <span className="nl-mw-key__icon">
            <CalendarIcon />
          </span>
          <h3 className="nl-mw-key__label">
            Exemple à {L.hours36} h par semaine
          </h3>
        </div>
        <p className="nl-mw-key__figure nl-mw-key__figure--secondary">
          <span className="nl-mw-key__amount">{L.monthly36}</span>{" "}
          <span className="nl-mw-key__unit">brut par mois</span>
        </p>
        <p className="nl-mw-key__nuance">
          Moyenne indicative sur 52 semaines, hors pécule de vacances. Ce
          n&apos;est pas un minimum mensuel légal.
        </p>
        <p className="nl-mw-key__meta">
          Le pécule de vacances s&apos;élève en général à au moins {L.holidayRate}{" "}
          du salaire brut concerné.{" "}
          <a href="#pecule-vacances">Voir le pécule de vacances</a>
          {" · "}
          <a href="#bareme-age">Barème par âge</a>.
        </p>
      </div>

      <p className="nl-mw-key__footer">
        Vérification documentaire le {NL_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}.
      </p>
    </section>
  );
}
