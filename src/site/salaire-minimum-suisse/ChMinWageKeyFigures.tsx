import {
  CH_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
  CH_MIN_WAGE_LABELS as L,
  CH_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  CH_MIN_WAGE_TERRITORIES as T,
} from "./data";
import "./key-figures.css";

const TITLE_ID = "essentiel-salaire-minimum-suisse";

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M9 4l6 2 5-2v16l-5 2-6-2-5 2V6l5-2z" />
      <path d="M9 4v16M15 6v16" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M12 21s7-5.4 7-11a7 7 0 10-14 0c0 5.6 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V6a2 2 0 012-2h4a2 2 0 012 2v1M3 13h18" />
    </svg>
  );
}

/**
 * Encadré « L'essentiel » propre à /salaire-minimum-suisse.
 * Ordre : absence de minimum national, exemple cantonal, CCT/CTT, vérification.
 */
export function ChMinWageKeyFigures() {
  return (
    <section className="ch-mw-key" aria-labelledby={TITLE_ID}>
      <h2 id={TITLE_ID} className="ch-mw-key__title">
        {CH_MIN_WAGE_AMOUNTS_BLOCK_TITLE}
      </h2>

      <div className="ch-mw-key__item ch-mw-key__item--lead">
        <div className="ch-mw-key__head">
          <span className="ch-mw-key__icon">
            <MapIcon />
          </span>
          <h3 className="ch-mw-key__label">Aucun salaire minimum national unique</h3>
          <span className="ch-mw-key__badge ch-mw-key__badge--lead">Cadre suisse</span>
        </div>
        <p className="ch-mw-key__statement">Le minimum dépend du territoire et des règles applicables à votre emploi.</p>
        <p className="ch-mw-key__meta">
          Les montants de cette page sont bruts et exprimés en francs suisses. Ils ne valent pas pour toute la Suisse.
        </p>
      </div>

      <div className="ch-mw-key__item ch-mw-key__item--canton">
        <div className="ch-mw-key__head">
          <span className="ch-mw-key__icon">
            <PinIcon />
          </span>
          <h3 className="ch-mw-key__label">Des montants différents selon le canton</h3>
          <span className="ch-mw-key__badge ch-mw-key__badge--example">Exemple cantonal</span>
        </div>
        <p className="ch-mw-key__figure">
          <span className="ch-mw-key__amount">{L.geneveHourlyShort}</span>{" "}
          <span className="ch-mw-key__unit">brut par heure, à Genève</span>
        </p>
        <p className="ch-mw-key__meta">
          En vigueur depuis le {T.geneve.fromLabel}. Ce n&apos;est pas un « SMIC suisse ».
        </p>
        <div className="ch-mw-key__example">
          <p className="ch-mw-key__example-label">Exemple officiel à Genève, 40&nbsp;h par semaine</p>
          <p className="ch-mw-key__figure">
            <span className="ch-mw-key__amount">{L.geneveMonthly40Official}</span>{" "}
            <span className="ch-mw-key__unit">brut par mois</span>
          </p>
          <p className="ch-mw-key__meta">Montant publié par le canton de Genève, pas un minimum mensuel national.</p>
        </div>
      </div>

      <div className="ch-mw-key__item ch-mw-key__item--sector">
        <div className="ch-mw-key__head">
          <span className="ch-mw-key__icon">
            <BriefcaseIcon />
          </span>
          <h3 className="ch-mw-key__label">Sans minimum cantonal ? Vérifiez votre secteur</h3>
        </div>
        <p className="ch-mw-key__text">
          Une convention collective de travail (CCT) ou un contrat-type de travail (CTT) peut fixer un plancher, y
          compris dans un canton sans minimum légal général.
        </p>
        <p className="ch-mw-key__meta">
          L&apos;articulation entre canton et CCT n&apos;est pas la même partout.{" "}
          <a href="#cct-ctt">Voir CCT et CTT</a>.
        </p>
      </div>

      <p className="ch-mw-key__footer">
        Vérification documentaire le {CH_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}.
      </p>
    </section>
  );
}
