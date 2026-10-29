import {
  LU_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
  LU_MIN_WAGE_LABELS as L,
  LU_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  LU_SSM_CURRENT_FROM_LABEL,
} from "./data";
import "./key-figures.css";

const TITLE_ID = "essentiel-salaire-minimum-luxembourg";

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18M16 13.5h2" />
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

function BadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="8" r="4" />
      <path d="M6 20v-1a6 6 0 0112 0v1" />
    </svg>
  );
}

/**
 * Encadré « L'essentiel » propre à /salaire-minimum-luxembourg.
 * Ordre : mensuel adulte non qualifié, horaire, qualifié, jeunes, vérification.
 */
export function LuMinWageKeyFigures() {
  return (
    <section className="lu-mw-key" aria-labelledby={TITLE_ID}>
      <h2 id={TITLE_ID} className="lu-mw-key__title">
        {LU_MIN_WAGE_AMOUNTS_BLOCK_TITLE}
      </h2>

      <div className="lu-mw-key__item lu-mw-key__item--current">
        <div className="lu-mw-key__head">
          <span className="lu-mw-key__icon">
            <WalletIcon />
          </span>
          <h3 className="lu-mw-key__label">Salaire social minimum actuel</h3>
          <span className="lu-mw-key__badge lu-mw-key__badge--current">En vigueur</span>
        </div>
        <p className="lu-mw-key__figure">
          <span className="lu-mw-key__amount">{L.adultUnskilledMonthly}</span>{" "}
          <span className="lu-mw-key__unit">brut par mois</span>
        </p>
        <p className="lu-mw-key__caption">Adulte non qualifié · temps plein</p>
        <p className="lu-mw-key__meta">Depuis le {LU_SSM_CURRENT_FROM_LABEL}.</p>
      </div>

      <div className="lu-mw-key__item lu-mw-key__item--hourly">
        <div className="lu-mw-key__head">
          <span className="lu-mw-key__icon">
            <ClockIcon />
          </span>
          <h3 className="lu-mw-key__label">Repère horaire</h3>
        </div>
        <p className="lu-mw-key__figure lu-mw-key__figure--secondary">
          <span className="lu-mw-key__amount">{L.adultUnskilledHourly}</span>{" "}
          <span className="lu-mw-key__unit">brut / heure</span>
        </p>
        <p className="lu-mw-key__meta">
          Taux officiel, base de {L.legalHours}&nbsp;heures. Même catégorie : adulte non qualifié.
        </p>
      </div>

      <div className="lu-mw-key__item lu-mw-key__item--skilled">
        <div className="lu-mw-key__head">
          <span className="lu-mw-key__icon">
            <BadgeIcon />
          </span>
          <h3 className="lu-mw-key__label">Adulte qualifié</h3>
        </div>
        <p className="lu-mw-key__figure lu-mw-key__figure--tertiary">
          <span className="lu-mw-key__amount">{L.adultSkilledMonthly}</span>{" "}
          <span className="lu-mw-key__unit">brut par mois</span>
        </p>
        <p className="lu-mw-key__meta">
          Sous conditions de qualification professionnelle.{" "}
          <a href="#qualification">Voir qui y a droit</a>.
        </p>
      </div>

      <p className="lu-mw-key__youth">
        Des barèmes spécifiques s&apos;appliquent aux moins de 18 ans.
      </p>

      <p className="lu-mw-key__footer">
        Vérification documentaire le {LU_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}.
      </p>
    </section>
  );
}
