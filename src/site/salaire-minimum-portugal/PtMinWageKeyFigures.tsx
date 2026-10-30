import {
  PT_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
  PT_MIN_WAGE_LABELS as L,
  PT_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  PT_RMMG_EFFECTS_FROM_LABEL,
} from "./data";
import "./key-figures.css";

const TITLE_ID = "essentiel-salaire-minimum-portugal";

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18M16 13.5h2" />
    </svg>
  );
}

function SumIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M4 6h16M4 12h10M4 18h16" />
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

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M9 4l6 2 5-2v16l-5 2-6-2-5 2V6l5-2z" />
      <path d="M9 4v16M15 6v16" />
    </svg>
  );
}

/**
 * Encadré « L'essentiel » propre à /salaire-minimum-portugal.
 * Ordre : continent, annuel, moyenne 12 mois, territoires, dates.
 */
export function PtMinWageKeyFigures() {
  return (
    <section className="pt-mw-key" aria-labelledby={TITLE_ID}>
      <h2 id={TITLE_ID} className="pt-mw-key__title">
        {PT_MIN_WAGE_AMOUNTS_BLOCK_TITLE}
      </h2>

      <div className="pt-mw-key__item pt-mw-key__item--current">
        <div className="pt-mw-key__head">
          <span className="pt-mw-key__icon">
            <WalletIcon />
          </span>
          <h3 className="pt-mw-key__label">Retribuição mínima mensal garantida</h3>
          <span className="pt-mw-key__badge pt-mw-key__badge--current">En vigueur</span>
        </div>
        <p className="pt-mw-key__figure">
          <span className="pt-mw-key__amount">{L.continentalMonthly}</span>{" "}
          <span className="pt-mw-key__unit">brut par mois de référence</span>
        </p>
        <p className="pt-mw-key__caption">
          Portugal continental · temps plein · montant brut
        </p>
        <p className="pt-mw-key__meta">
          Effets au {PT_RMMG_EFFECTS_FROM_LABEL}. Ce n&apos;est pas le montant
          identique à Madère ni aux Açores.
        </p>
      </div>

      <div className="pt-mw-key__item pt-mw-key__item--annual">
        <div className="pt-mw-key__head">
          <span className="pt-mw-key__icon">
            <SumIcon />
          </span>
          <h3 className="pt-mw-key__label">Repère annuel, continent</h3>
        </div>
        <p className="pt-mw-key__figure pt-mw-key__figure--secondary">
          <span className="pt-mw-key__amount">{L.continentalAnnual}</span>{" "}
          <span className="pt-mw-key__unit">brut par an</span>
        </p>
        <p className="pt-mw-key__meta">
          12 mensualités et deux indemnités supplémentaires, pour une année
          complète.{" "}
          <a href="#quatorze-versements">Pourquoi parle-t-on de 14 versements</a>.
        </p>
      </div>

      <div className="pt-mw-key__item pt-mw-key__item--twelve">
        <div className="pt-mw-key__head">
          <span className="pt-mw-key__icon">
            <CalendarIcon />
          </span>
          <h3 className="pt-mw-key__label">Équivalent moyen sur 12 mois</h3>
        </div>
        <p className="pt-mw-key__figure pt-mw-key__figure--secondary">
          <span className="pt-mw-key__amount">{L.continentalTwelve}</span>{" "}
          <span className="pt-mw-key__unit">brut par mois</span>
        </p>
        <p className="pt-mw-key__nuance">
          Moyenne brute pédagogique, indemnités incluses. Ce n&apos;est pas un
          second salaire minimum mensuel légal, ni le salaire de base
          obligatoire chaque mois.
        </p>
      </div>

      <div className="pt-mw-key__item pt-mw-key__item--territories">
        <div className="pt-mw-key__head">
          <span className="pt-mw-key__icon">
            <MapIcon />
          </span>
          <h3 className="pt-mw-key__label">Régions autonomes</h3>
        </div>
        <dl className="pt-mw-key__territories">
          <div className="pt-mw-key__territory">
            <dt>Açores</dt>
            <dd>{L.azoresMonthly} brut par mois</dd>
          </div>
          <div className="pt-mw-key__territory">
            <dt>Madère</dt>
            <dd>{L.madeiraMonthly} brut par mois</dd>
          </div>
        </dl>
        <p className="pt-mw-key__meta">
          <a href="#territoires">Tableau territorial et textes applicables</a>.
        </p>
      </div>

      <p className="pt-mw-key__footer">
        Vérification documentaire le {PT_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}.
      </p>
    </section>
  );
}
