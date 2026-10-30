import {
  UK_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
  UK_MIN_WAGE_LABELS as L,
  UK_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  UK_NMW_EFFECTS_FROM_LABEL,
} from "./data";
import "./key-figures.css";

const TITLE_ID = "essentiel-salaire-minimum-royaume-uni";

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
 * Encadré « L'essentiel » propre à /salaire-minimum-royaume-uni.
 */
export function UkMinWageKeyFigures() {
  return (
    <section className="uk-mw-key" aria-labelledby={TITLE_ID}>
      <h2 id={TITLE_ID} className="uk-mw-key__title">
        {UK_MIN_WAGE_AMOUNTS_BLOCK_TITLE}
      </h2>

      <div className="uk-mw-key__item uk-mw-key__item--current">
        <div className="uk-mw-key__head">
          <span className="uk-mw-key__icon">
            <WalletIcon />
          </span>
          <h3 className="uk-mw-key__label">National Living Wage</h3>
          <span className="uk-mw-key__badge uk-mw-key__badge--current">En vigueur</span>
        </div>
        <p className="uk-mw-key__figure">
          <span className="uk-mw-key__amount">{L.nlw}</span>{" "}
          <span className="uk-mw-key__unit">brut par heure</span>
        </p>
        <p className="uk-mw-key__caption">
          21 ans et plus · hors taux apprenti applicable
        </p>
        <p className="uk-mw-key__meta">
          Effets au {UK_NMW_EFFECTS_FROM_LABEL}. Ce n&apos;est pas un salaire
          mensuel unique.
        </p>
      </div>

      <div className="uk-mw-key__item uk-mw-key__item--example">
        <div className="uk-mw-key__head">
          <span className="uk-mw-key__icon">
            <CalendarIcon />
          </span>
          <h3 className="uk-mw-key__label">
            Exemple à {L.hours375} h par semaine
          </h3>
        </div>
        <p className="uk-mw-key__figure uk-mw-key__figure--secondary">
          <span className="uk-mw-key__amount">{L.monthly375}</span>{" "}
          <span className="uk-mw-key__unit">brut par mois</span>
        </p>
        <p className="uk-mw-key__nuance">
          Moyenne indicative sur 52 semaines. Ce n&apos;est pas un minimum
          mensuel publié par le gouvernement.
        </p>
        <p className="uk-mw-key__meta">
          <a href="#bareme-age">Voir le barème par âge</a>
          {" · "}
          <a href="#evolution">Taux annoncés pour 2027</a>.
        </p>
      </div>

      <p className="uk-mw-key__footer">
        Vérification documentaire le {UK_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}.
      </p>
    </section>
  );
}
