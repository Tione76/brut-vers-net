import {
  BE_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
  BE_MIN_WAGE_LABELS as L,
  BE_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  BE_RMMMG_CURRENT_FROM_LABEL,
} from "./data";
import "./key-figures.css";

const TITLE_ID = "essentiel-salaire-minimum-belgique";

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18M16 13.5h2" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 16l9 5 9-5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

/**
 * Encadré « L'essentiel » propre à /salaire-minimum-belgique.
 * Ordre : RMMMG actuel, nuance « moyen », barème sectoriel, horaire indicatif, vérification.
 */
export function BeMinWageKeyFigures() {
  return (
    <section className="be-mw-key" aria-labelledby={TITLE_ID}>
      <h2 id={TITLE_ID} className="be-mw-key__title">
        {BE_MIN_WAGE_AMOUNTS_BLOCK_TITLE}
      </h2>

      <div className="be-mw-key__item be-mw-key__item--current">
        <div className="be-mw-key__head">
          <span className="be-mw-key__icon">
            <WalletIcon />
          </span>
          <h3 className="be-mw-key__label">Revenu minimum mensuel moyen garanti</h3>
          <span className="be-mw-key__badge be-mw-key__badge--current">En vigueur</span>
        </div>
        <p className="be-mw-key__figure">
          <span className="be-mw-key__amount">{L.adultMonthly}</span>{" "}
          <span className="be-mw-key__unit">brut par mois</span>
        </p>
        <p className="be-mw-key__caption">
          Salariés du secteur privé visés par la CCT n° 43 · 18 ans et plus · temps plein
        </p>
        <p className="be-mw-key__meta">Depuis le {BE_RMMMG_CURRENT_FROM_LABEL}.</p>
        <p className="be-mw-key__nuance">
          Ce montant est un revenu moyen de référence, pas nécessairement le salaire de
          base de chaque mois.
        </p>
      </div>

      <div className="be-mw-key__item be-mw-key__item--sector">
        <div className="be-mw-key__head">
          <span className="be-mw-key__icon">
            <LayersIcon />
          </span>
          <h3 className="be-mw-key__label">Votre barème sectoriel compte</h3>
        </div>
        <p className="be-mw-key__meta">
          Le minimum de votre commission paritaire peut être plus élevé. C&apos;est lui
          qu&apos;il faut vérifier en premier.{" "}
          <a href="#commission-paritaire">Comment trouver sa commission paritaire</a>.
        </p>
      </div>

      <div className="be-mw-key__item be-mw-key__item--hourly">
        <div className="be-mw-key__head">
          <span className="be-mw-key__icon">
            <ClockIcon />
          </span>
          <h3 className="be-mw-key__label">Équivalent horaire indicatif</h3>
        </div>
        <p className="be-mw-key__figure be-mw-key__figure--secondary">
          <span className="be-mw-key__amount">{L.adultHourly}</span>{" "}
          <span className="be-mw-key__unit">brut / heure</span>
        </p>
        <p className="be-mw-key__meta">
          Référence {L.weeklyHours}&nbsp;heures par semaine. Ce n&apos;est pas un salaire
          horaire belge universel, ni le minimum sectoriel applicable.
        </p>
      </div>

      <p className="be-mw-key__footer">
        Vérification documentaire le {BE_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}.
      </p>
    </section>
  );
}
