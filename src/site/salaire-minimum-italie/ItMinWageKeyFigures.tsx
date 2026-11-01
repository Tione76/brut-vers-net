import {
  IT_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
  IT_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
} from "./data";
import "./key-figures.css";

const TITLE_ID = "essentiel-salaire-minimum-italie";

function FlagIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M4 5h10a2 2 0 012 2v9H6a2 2 0 01-2-2V5z" />
      <path d="M4 21V5" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M7 3h7l5 5v13a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
      <path d="M14 3v6h6" />
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

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 11h18" />
    </svg>
  );
}

/**
 * Encadré « L'essentiel » propre à /salaire-minimum-italie.
 * Ordre : absence de SMIC national, CCNL, secteur/niveau, mensualités.
 */
export function ItMinWageKeyFigures() {
  return (
    <section className="it-mw-key" aria-labelledby={TITLE_ID}>
      <h2 id={TITLE_ID} className="it-mw-key__title">
        {IT_MIN_WAGE_AMOUNTS_BLOCK_TITLE}
      </h2>

      <div className="it-mw-key__item it-mw-key__item--lead">
        <div className="it-mw-key__head">
          <span className="it-mw-key__icon">
            <FlagIcon />
          </span>
        </div>
        <p className="it-mw-key__statement">Pas de SMIC national unique</p>
        <p className="it-mw-key__meta">
          L&apos;Italie n&apos;a pas de taux légal unique comparable au SMIC français. Des protections existent
          malgré tout.
        </p>
      </div>

      <div className="it-mw-key__item">
        <div className="it-mw-key__head">
          <span className="it-mw-key__icon">
            <FileIcon />
          </span>
          <h3 className="it-mw-key__label">Votre référence : le CCNL applicable</h3>
        </div>
        <p className="it-mw-key__text">
          Le plancher se lit dans la convention collective nationale de travail, le CCNL, et dans le
          barème de la période concernée.
        </p>
        <p className="it-mw-key__meta">
          <a href="#trouver-ccnl">Comment trouver le CCNL</a>
        </p>
      </div>

      <div className="it-mw-key__item">
        <div className="it-mw-key__head">
          <span className="it-mw-key__icon">
            <LayersIcon />
          </span>
          <h3 className="it-mw-key__label">Le montant dépend du secteur et du niveau</h3>
        </div>
        <p className="it-mw-key__text">
          Deux salariés du même métier peuvent avoir des minima différents selon l&apos;activité de
          l&apos;entreprise, le champ conventionnel et la classification du poste.
        </p>
        <p className="it-mw-key__meta">
          <a href="#minima-par-secteur">Voir des exemples par secteur</a>
        </p>
      </div>

      <div className="it-mw-key__item it-mw-key__item--last">
        <div className="it-mw-key__head">
          <span className="it-mw-key__icon">
            <CalendarIcon />
          </span>
          <h3 className="it-mw-key__label">Comparez aussi le nombre de mensualités</h3>
        </div>
        <p className="it-mw-key__text">
          Certaines conventions prévoient 13 versements, d&apos;autres 14. Un mensuel identique ne donne
          pas le même annuel.
        </p>
        <p className="it-mw-key__meta">
          <a href="#treizieme-quatorzieme-mois">Treizième et quatorzième mois</a>
        </p>
      </div>

      <p className="it-mw-key__footer">
        Vérification documentaire le {IT_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}.
      </p>
    </section>
  );
}
