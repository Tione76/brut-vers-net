import {
  ES_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
  ES_MIN_WAGE_LABELS as L,
  ES_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  ES_SMI_EFFECTS_FROM_LABEL,
} from "./data";
import "./key-figures.css";

const TITLE_ID = "essentiel-salaire-minimum-espagne";

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

function SumIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M4 6h16M4 12h10M4 18h16" />
    </svg>
  );
}

/**
 * Encadré « L'essentiel » propre à /salaire-minimum-espagne.
 * Ordre : 14 versements, équivalent 12, total annuel, phrase pédagogique, dates.
 */
export function EsMinWageKeyFigures() {
  return (
    <section className="es-mw-key" aria-labelledby={TITLE_ID}>
      <h2 id={TITLE_ID} className="es-mw-key__title">
        {ES_MIN_WAGE_AMOUNTS_BLOCK_TITLE}
      </h2>

      <div className="es-mw-key__item es-mw-key__item--current">
        <div className="es-mw-key__head">
          <span className="es-mw-key__icon">
            <WalletIcon />
          </span>
          <h3 className="es-mw-key__label">Salario mínimo interprofesional</h3>
          <span className="es-mw-key__badge es-mw-key__badge--current">En vigueur</span>
        </div>
        <p className="es-mw-key__figure">
          <span className="es-mw-key__amount">{L.fourteenMonthly}</span>{" "}
          <span className="es-mw-key__unit">brut par versement</span>
        </p>
        <p className="es-mw-key__caption">
          14 versements par an · temps plein · montant brut
        </p>
        <p className="es-mw-key__meta">
          Effets au {ES_SMI_EFFECTS_FROM_LABEL}, y compris si le décret a été
          publié en février.
        </p>
      </div>

      <div className="es-mw-key__item es-mw-key__item--twelve">
        <div className="es-mw-key__head">
          <span className="es-mw-key__icon">
            <CalendarIcon />
          </span>
          <h3 className="es-mw-key__label">Même total, 12 versements</h3>
        </div>
        <p className="es-mw-key__figure es-mw-key__figure--secondary">
          <span className="es-mw-key__amount">{L.twelveMonthly}</span>{" "}
          <span className="es-mw-key__unit">brut par mois</span>
        </p>
        <p className="es-mw-key__meta">
          Lorsque les deux versements extraordinaires sont proratisés sur 12
          échéances.{" "}
          <a href="#quatorze-versements">Pourquoi deux montants mensuels</a>.
        </p>
      </div>

      <div className="es-mw-key__item es-mw-key__item--annual">
        <div className="es-mw-key__head">
          <span className="es-mw-key__icon">
            <SumIcon />
          </span>
          <h3 className="es-mw-key__label">Total annuel de référence</h3>
        </div>
        <p className="es-mw-key__figure es-mw-key__figure--secondary">
          <span className="es-mw-key__amount">{L.annual}</span>{" "}
          <span className="es-mw-key__unit">brut par an</span>
        </p>
        <p className="es-mw-key__nuance">
          C&apos;est la même référence annuelle, répartie autrement. On ne
          travaille pas 14 mois.
        </p>
      </div>

      <p className="es-mw-key__footer">
        Vérification documentaire le {ES_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}.
      </p>
    </section>
  );
}
