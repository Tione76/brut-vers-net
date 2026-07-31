import Link from "next/link";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { ShareBlock } from "@/framework/design/components/ShareBlock";
import { GuideAuthorMeta } from "@/site/guides";
import {
  buildAllProfileEstimates,
  buildComparisonRows,
  formatNetShort,
} from "./data";
import { netToGrossPath, NET_TO_GROSS_PROFILES, NET_TO_GROSS_UPDATED_AT } from "./config";
import { MiniCalculatorCta1500 } from "./mini-calculator-cta-1500";
import {
  buildSeriesEditorial,
  buildSeriesFaqItems,
  getSeriesNearbyAmounts,
  seriesBreadcrumbLabel,
} from "./page-1500-content";
import "./salaire-net-brut.css";
import "./page-1500.css";

function formatEuroAmount(value: number): string {
  return formatNetShort(Math.round(value));
}

const CARD_TONE: Record<string, string> = {
  nonExecutive: "non-cadre",
  executive: "cadre",
  publicService: "public",
};

interface NetToGrossSeriesPageContentProps {
  netMonthly: number;
  share: {
    url: string;
    title: string;
    description?: string;
  };
}

/**
 * Template de la série, calqué sur le modèle validé 1 500 €.
 * Seul le montant cible (et les calculs associés) change.
 */
export function NetToGrossSeriesPageContent({
  netMonthly,
  share,
}: NetToGrossSeriesPageContentProps) {
  const estimates = buildAllProfileEstimates(netMonthly);
  const rows = buildComparisonRows(netMonthly);
  const faq = buildSeriesFaqItems(netMonthly, estimates);
  const editorialSections = buildSeriesEditorial(netMonthly, estimates);
  const netLabel = formatNetShort(netMonthly);
  const revisedLabel = new Date(NET_TO_GROSS_UPDATED_AT).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const profileCards = NET_TO_GROSS_PROFILES.map((profile) => estimates[profile]);
  const nearby = getSeriesNearbyAmounts(netMonthly).map((amount) => ({
    href: netToGrossPath(amount),
    label: formatNetShort(amount),
  }));
  const idPrefix = `net-gross-${netMonthly}`;

  return (
    <div className="net-gross net-gross-1500">
      <PageBreadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: seriesBreadcrumbLabel(netMonthly) },
        ]}
      />
      <GuideAuthorMeta updatedAt={NET_TO_GROSS_UPDATED_AT} />

      <section className="net-gross-1500__hero" aria-labelledby={`${idPrefix}-answer`}>
        <h2 id={`${idPrefix}-answer`} className="net-gross-1500__answer-title">
          Quel salaire brut mensuel correspond à {netLabel} net&nbsp;?
        </h2>

        <div className="net-gross-1500__cards">
          {profileCards.map((estimate) => (
            <article
              key={estimate.profile}
              className={`net-gross-1500__card net-gross-1500__card--${CARD_TONE[estimate.profile]}`}
            >
              <h3 className="net-gross-1500__card-title">{estimate.profileLabel}</h3>
              <p className="net-gross-1500__card-metric-label">Salaire brut mensuel</p>
              <p className="net-gross-1500__card-dominant">
                {formatEuroAmount(estimate.grossMonthly)}
              </p>
              <div className="net-gross-1500__card-annual">
                <p className="net-gross-1500__card-metric-label">Salaire brut annuel</p>
                <p className="net-gross-1500__card-annual-value">
                  {formatEuroAmount(estimate.grossAnnual)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="net-gross-1500__result-note">
          Les montants ci-dessus correspondent à une estimation du salaire brut mensuel avant
          prélèvement à la source, calculée à partir des coefficients utilisés par notre simulateur.
        </p>
      </section>

      <MiniCalculatorCta1500 defaultNetMonthly={netMonthly} />

      <ShareBlock
        url={share.url}
        title={share.title}
        description={share.description}
        contentType="fiche"
        variant="onLight"
      />

      {editorialSections.map(({ id, title, paragraphs }) => (
        <section
          key={id}
          className="net-gross-1500__explain"
          aria-labelledby={`${idPrefix}-${id}`}
        >
          <h2 id={`${idPrefix}-${id}`} className="net-gross-1500__h2">
            {title}
          </h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </section>
      ))}

      <section
        className="net-gross-1500__table-section"
        aria-labelledby={`${idPrefix}-table-title`}
      >
        <h2 id={`${idPrefix}-table-title`} className="net-gross-1500__h2">
          Estimation du salaire brut pour des salaires nets proches de {netLabel}
        </h2>
        <p className="net-gross-1500__table-intro">
          Brut mensuel estimé selon le profil, avant prélèvement à la source.
        </p>
        <div className="net-gross-1500__table-wrap">
          <table className="net-gross-1500__table">
            <caption className="net-gross-1500__sr-only">
              Conversion salaire net vers brut autour de {netLabel}
            </caption>
            <thead>
              <tr>
                <th scope="col">Salaire net</th>
                <th scope="col">Non-cadre</th>
                <th scope="col">Cadre</th>
                <th scope="col">Fonction publique</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.netMonthly}
                  className={row.isCurrent ? "net-gross-1500__table-row--current" : undefined}
                >
                  <td>
                    {formatNetShort(row.netMonthly)}
                    {row.isCurrent ? (
                      <span className="net-gross-1500__badge"> Montant recherché</span>
                    ) : null}
                  </td>
                  <td>{formatEuroAmount(row.nonExecutive)}</td>
                  <td>{formatEuroAmount(row.executive)}</td>
                  <td>{formatEuroAmount(row.publicService)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="net-gross-1500__faq" aria-labelledby={`${idPrefix}-faq-title`}>
        <h2 id={`${idPrefix}-faq-title`} className="net-gross-1500__h2">
          Questions fréquentes
        </h2>
        <div className="faq-list">
          {faq.map((item, index) => (
            <details key={item.question} className="faq-item">
              <summary className="faq-item__summary">
                <span>{item.question}</span>
                <span className="faq-chevron" aria-hidden="true">
                  ▾
                </span>
              </summary>
              <div className="faq-item__body">
                {index === 2 ? (
                  <p>
                    Pour un calcul parfaitement personnalisé,{" "}
                    <Link href="/">utilisez notre calculateur de salaire brut et net</Link> :
                    indiquez votre brut ou votre net, choisissez votre profil et ajustez le temps de
                    travail ou le prélèvement à la source. Le bulletin de salaire reste la référence
                    officielle.
                  </p>
                ) : (
                  <p>{item.answer}</p>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="net-gross-1500__nearby" aria-labelledby={`${idPrefix}-nearby-title`}>
        <h2 id={`${idPrefix}-nearby-title`} className="net-gross-1500__h2">
          Montants proches
        </h2>
        <ul className="net-gross-1500__nearby-list">
          {nearby.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label} net en brut</Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="net-gross__updated">
        Contenu révisé le <time dateTime={NET_TO_GROSS_UPDATED_AT}>{revisedLabel}</time>. Chiffres
        alignés sur les coefficients du simulateur.
      </p>

      <ShareBlock
        url={share.url}
        title={share.title}
        description={share.description}
        contentType="fiche"
        variant="onLight"
      />
    </div>
  );
}
