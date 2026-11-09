import Link from "next/link";
import {
  HAUSSE_SMIC_DECEMBRE_2026_FACTS as F,
  hausseSmicDecembre2026Article,
} from "../articles/hausse-smic-decembre-2026";

const SMIC_GUIDE_HREF = "/smic";

/**
 * Corps éditorial de l'actualité SMIC décembre 2026.
 */
export function HausseSmicDecembre2026Body() {
  const sources = hausseSmicDecembre2026Article.sources;

  return (
    <div className="actu-article-body">
      <div className="guide-intro">
        <p>
          Réunis à {F.conferencePlaceLabel} le {F.announcedOnLabel}, le
          Gouvernement et les partenaires sociaux ont tenu une{" "}
          {F.conferenceLabel} consacrée aux salaires et au pouvoir d&apos;achat. À
          son issue,{" "}
          <a href={F.officialAnnouncementHref} rel="noopener noreferrer" target="_blank">
            le Gouvernement a annoncé
          </a>{" "}
          une revalorisation du SMIC de {F.announcedIncreasePercentLabel},
          applicable dès le {F.effectiveFromLabel}, plutôt qu&apos;à
          l&apos;échéance annuelle de janvier.
        </p>
      </div>

      <section className="actu-en-bref" aria-labelledby="actu-en-bref-title">
        <header className="actu-en-bref__header">
          <p className="actu-en-bref__eyebrow">En bref</p>
          <h2 id="actu-en-bref-title" className="actu-en-bref__title">
            La hausse du SMIC en 3 repères
          </h2>
        </header>
        <dl className="actu-en-bref__grid">
          <div className="actu-en-bref__item">
            <span className="actu-en-bref__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
                <path
                  d="M4 16.5 10 10l3.5 3.5L20 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 7h6v6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <dt className="actu-en-bref__value">+{F.announcedIncreasePercentLabel}</dt>
            <dd className="actu-en-bref__label">Hausse annoncée</dd>
          </div>
          <div className="actu-en-bref__item">
            <span className="actu-en-bref__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
                <rect
                  x="3.5"
                  y="5"
                  width="17"
                  height="15"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M8 3.5v3M16 3.5v3M3.5 10h17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <dt className="actu-en-bref__value actu-en-bref__value--date">
              1er décembre
              <span className="actu-en-bref__value-sub">2026</span>
            </dt>
            <dd className="actu-en-bref__label">Application annoncée</dd>
          </div>
          <div className="actu-en-bref__item">
            <span className="actu-en-bref__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
                <rect
                  x="3.5"
                  y="6.5"
                  width="17"
                  height="12"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M3.5 10.5h17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="16.5" cy="14.5" r="1.25" fill="currentColor" />
              </svg>
            </span>
            <dt className="actu-en-bref__value">{F.announcedNetMonthlyLabel}</dt>
            <dd className="actu-en-bref__label">
              Net mensuel annoncé
              <span className="actu-en-bref__label-sub">pour un temps plein</span>
            </dd>
          </div>
        </dl>
        <p className="actu-en-bref__note">
          Montant net indicatif. Le minimum légal est fixé en brut.
        </p>
      </section>

      <section className="guide-section" id="revalorisation-avancee-decembre">
        <h2>Une revalorisation avancée au 1er décembre</h2>
        <p>
          En temps normal, le SMIC est revalorisé chaque année au 1er janvier.
          Des hausses peuvent aussi intervenir en cours d&apos;année selon les
          mécanismes prévus par le code du travail. La dernière en date est
          entrée en vigueur le {F.currentEffectiveFromLabel} :{" "}
          <a href={F.juneRevaluationHref} rel="noopener noreferrer" target="_blank">
            le Gouvernement avait alors annoncé une hausse de{" "}
            {F.previousIncreasePercentLabel}
          </a>
          .
        </p>
        <p>
          L&apos;annonce du {F.announcedOnLabel} anticipe la prochaine
          revalorisation au {F.effectiveFromLabel}. Autrement dit, le nouveau
          minimum doit s&apos;appliquer un mois plus tôt que l&apos;échéance
          annuelle habituelle. Au {F.verifiedOnLabel}, le texte réglementaire
          précisant le futur barème brut n&apos;avait pas encore été identifié.
        </p>
        <p>
          D&apos;après{" "}
          <a href={F.lcpAnnouncementHref} rel="noopener noreferrer" target="_blank">
            LCP
          </a>
          , les {F.announcedIncreasePercentLabel} annoncés regroupent la
          revalorisation automatique liée à l&apos;inflation, initialement
          attendue en janvier, et un coup de pouce décidé par le gouvernement.
          Ce pourcentage désigne donc l&apos;augmentation totale présentée, et
          non un supplément qui viendrait s&apos;ajouter en entier à
          l&apos;indexation habituelle. L&apos;anticipation de décembre ne
          permet pas, à elle seule, de conclure sur d&apos;éventuels
          ajustements ultérieurs.
        </p>
        <p>
          À la sortie de la conférence, plusieurs organisations syndicales ont
          jugé la mesure insuffisante,{" "}
          <a
            href={F.publicSenatSyndicatsHref}
            rel="noopener noreferrer"
            target="_blank"
          >
            rapporte Public Sénat
          </a>
          . Selon l&apos;estimation de Sophie Binet, secrétaire générale de la
          CGT, environ 18 € de la hausse correspondraient à
          l&apos;indexation déjà attendue en janvier, le reste relevant d&apos;un
          coup de pouce qu&apos;elle évalue à cinq euros. La CGT a appelé à une
          journée de grève et de manifestation le 17 novembre.
        </p>
      </section>

      <section className="guide-section" id="montant-net-annonce">
        <h2>
          Un SMIC net annoncé à {F.announcedNetMonthlyLabel}, soit environ{" "}
          {F.announcedNetGainApproxLabel} de plus
        </h2>
        <p>
          Depuis le {F.currentEffectiveFromLabel}, le minimum légal s&apos;établit
          à {F.currentHourlyGrossLabel} brut de l&apos;heure, soit{" "}
          {F.currentMonthlyGrossLabel} brut par mois pour 35 heures. Le net
          mensuel de référence est estimé à {F.currentNetMonthlyIndicativeLabel}.
        </p>
        <p>
          Le montant annoncé par le Gouvernement pour décembre atteint{" "}
          {F.announcedNetMonthlyLabel} nets pour un temps plein. La comparaison
          avec le repère actuel donne environ {F.announcedNetGainApproxLabel} de
          plus par mois. Ce n&apos;est pas un gain individuel garanti : le
          minimum légal est fixé en brut, le net varie selon les cotisations et
          les retenues, et le montant reçu sur le compte peut encore dépendre du
          prélèvement à la source.
        </p>
      </section>

      <section className="guide-section" id="salaries-concernes">
        <h2>Quels salariés verront leur rémunération augmenter ?</h2>
        <p>
          Les rémunérations qui se situeraient sous le nouveau minimum devront
          être ajustées à son entrée en vigueur. Cela concerne d&apos;abord les
          salariés payés exactement au SMIC actuel. Cela peut aussi toucher
          ceux qui gagnent légèrement plus aujourd&apos;hui, mais resteraient
          sous le futur seuil.
        </p>
        <p>
          En revanche, gagner davantage que le nouveau minimum ne donne pas
          automatiquement droit à une hausse de {F.announcedIncreasePercentLabel}.
          Les primes, les grilles conventionnelles et les autres éléments du
          bulletin ne suivent pas forcément le même mouvement.
        </p>
        <p>
          À temps partiel, le minimum brut dépend du nombre d&apos;heures
          rémunérées. Le net ne correspond pas nécessairement au même prorata
          exact, notamment en présence de retenues fixes. Pour détailler ces
          cas, voir aussi notre{" "}
          <Link href={F.smicHoursGuideHref}>
            guide du SMIC selon le nombre d&apos;heures
          </Link>{" "}
          et notre{" "}
          <Link href={F.partTimeGuideHref}>guide du salaire à temps partiel</Link>
          .
        </p>
      </section>

      <section className="guide-section" id="paie-de-decembre">
        <h2>Une hausse attendue sur la paie de décembre</h2>
        <p>
          Si le calendrier annoncé est confirmé par le texte réglementaire, le
          nouveau minimum concernera le travail effectué à partir du{" "}
          {F.effectiveFromLabel}. Il s&apos;appliquera donc à la rémunération de
          décembre, même lorsque l&apos;employeur verse ce salaire début janvier.
        </p>
        <p>
          La date du virement ne décale pas la prise d&apos;effet : ce qui
          compte, c&apos;est la période travaillée. Pour retrouver les montants
          actuellement applicables et les explications sur le salaire brut et
          net, consultez notre <Link href={SMIC_GUIDE_HREF}>guide du SMIC</Link>.
        </p>
      </section>

      <section className="guide-section" id="sources">
        <h2>Sources</h2>
        <ul className="actu-sources">
          {sources.map((source) => (
            <li key={source.href}>
              <a href={source.href} rel="noopener noreferrer" target="_blank">
                {source.title}
              </a>
              {" · "}
              {source.publisher}
              {source.dateLabel ? ` · ${source.dateLabel}` : null}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
