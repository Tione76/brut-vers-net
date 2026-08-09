import Link from "next/link";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { ShareBlock } from "@/framework/design/components/ShareBlock";
import { CoverFigure, GuideAuthorMeta } from "@/site/guides";
import { GROSS_TO_NET_SERIES_COVER } from "@/site/guides/covers";
import {
  GROSS_TO_NET_HUB_PATH,
  GROSS_TO_NET_PROFILES,
  GROSS_TO_NET_UPDATED_AT,
} from "./config";
import { getInverseNetToGrossLink } from "./cross-link";
import {
  buildAllProfileNetEstimates,
  buildGrossToNetComparisonRows,
  formatEuroAmount,
  formatGrossShort,
} from "./data";
import { MiniGrossToNetCalculatorCta } from "./mini-calculator-cta";
import {
  GROSS_TO_NET_AUTHORITY_NOTE,
  buildGrossToNetEditorial,
  buildGrossToNetFaqItems,
  buildGrossToNetSeoMeta,
  getNearbyGrossToNetLinks,
  grossToNetBreadcrumbLabel,
} from "./content";
import "@/site/salaire-net-brut/salaire-net-brut.css";
import "@/site/salaire-net-brut/page-1500.css";

const CARD_TONE: Record<string, string> = {
  nonExecutive: "non-cadre",
  executive: "cadre",
  publicService: "public",
};

interface GrossToNetSeriesPageContentProps {
  grossMonthly: number;
  share: {
    url: string;
    title: string;
    description?: string;
  };
}

/**
 * Template de la série brut mensuel → net mensuel.
 * Pilote : 1 000 € brut. Seul le montant cible change lors de la généralisation.
 */
export function GrossToNetSeriesPageContent({
  grossMonthly,
  share,
}: GrossToNetSeriesPageContentProps) {
  const estimates = buildAllProfileNetEstimates(grossMonthly);
  const rows = buildGrossToNetComparisonRows(grossMonthly);
  const faq = buildGrossToNetFaqItems(grossMonthly, estimates);
  const editorialSections = buildGrossToNetEditorial(grossMonthly, estimates);
  const seo = buildGrossToNetSeoMeta(grossMonthly);
  const grossLabel = formatGrossShort(grossMonthly);
  const revisedLabel = new Date(GROSS_TO_NET_UPDATED_AT).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const profileCards = GROSS_TO_NET_PROFILES.map((profile) => estimates[profile]);
  const nearby = getNearbyGrossToNetLinks(grossMonthly);
  const inverseLink = getInverseNetToGrossLink(grossMonthly);
  const idPrefix = `gross-to-net-${grossMonthly}`;

  return (
    <div className="net-gross net-gross-1500">
      <PageBreadcrumb
        items={[
          { label: "Accueil", href: "/" },
          {
            label: "Tous les salaires bruts mensuels convertis en net",
            href: GROSS_TO_NET_HUB_PATH,
          },
          { label: grossToNetBreadcrumbLabel(grossMonthly) },
        ]}
      />
      <GuideAuthorMeta updatedAt={GROSS_TO_NET_UPDATED_AT} />

      <section className="net-gross-1500__hero" aria-labelledby={`${idPrefix}-answer`}>
        <h2 id={`${idPrefix}-answer`} className="net-gross-1500__answer-title">
          {seo.answerH2}
        </h2>
        <p className="net-gross-1500__table-intro">
          Estimation du salaire net mensuel avant prélèvement à la source selon votre statut.
        </p>

        <div className="net-gross-1500__cards">
          {profileCards.map((estimate) => (
            <article
              key={estimate.profile}
              className={`net-gross-1500__card net-gross-1500__card--${CARD_TONE[estimate.profile]}`}
            >
              <h3 className="net-gross-1500__card-title">{estimate.profileLabel}</h3>
              <p className="net-gross-1500__card-metric-label">Salaire net mensuel</p>
              <p className="net-gross-1500__card-dominant">
                {formatEuroAmount(estimate.netMonthly)}
              </p>
              <div className="net-gross-1500__card-annual">
                <p className="net-gross-1500__card-annual-value">
                  soit environ {formatEuroAmount(estimate.netAnnual)} nets par an
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="net-gross-1500__result-note">
          Les montants ci-dessus correspondent à une estimation du salaire net mensuel avant
          prélèvement à la source, calculée à partir des coefficients utilisés par notre
          simulateur.
        </p>
      </section>

      <p className="net-gross-1500__table-intro">
        Pour tester un autre salaire brut mensuel, utilisez le mini-calculateur.
      </p>

      <MiniGrossToNetCalculatorCta defaultGrossMonthly={grossMonthly} />

      <ShareBlock
        url={share.url}
        title={share.title}
        description={share.description}
        contentType="fiche"
        variant="onLight"
      />

      <CoverFigure
        cover={GROSS_TO_NET_SERIES_COVER}
        className="gross-to-net-series__cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 70vw, 720px"
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
          Salaire net estimé pour des salaires bruts mensuels proches de {grossLabel}
        </h2>
        <p className="net-gross-1500__table-intro">
          Net mensuel estimé selon le profil, avant prélèvement à la source.
        </p>
        <div className="net-gross-1500__table-wrap">
          <table className="net-gross-1500__table">
            <caption className="net-gross-1500__sr-only">
              Conversion salaire brut vers net autour de {grossLabel}
            </caption>
            <thead>
              <tr>
                <th scope="col">Salaire brut mensuel</th>
                <th scope="col">Non-cadre</th>
                <th scope="col">Cadre</th>
                <th scope="col">Fonction publique</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.grossMonthly}
                  className={row.isCurrent ? "net-gross-1500__table-row--current" : undefined}
                >
                  <td>
                    {formatGrossShort(row.grossMonthly)}
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
                    Pour un calcul personnalisé,{" "}
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

      {nearby.length > 0 ? (
        <section className="net-gross-1500__nearby" aria-labelledby={`${idPrefix}-nearby-title`}>
          <h2 id={`${idPrefix}-nearby-title`} className="net-gross-1500__h2">
            Montants proches
          </h2>
          <ul className="net-gross-1500__nearby-list">
            {nearby.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {inverseLink ? (
        <section
          className="net-gross-1500__explain"
          aria-labelledby={`${idPrefix}-inverse-title`}
        >
          <h2 id={`${idPrefix}-inverse-title`} className="net-gross-1500__h2">
            Calculer l&apos;inverse : du net vers le brut
          </h2>
          <p>{inverseLink.teaser}</p>
          <p>
            <Link href={inverseLink.href}>{inverseLink.label}</Link>
          </p>
        </section>
      ) : null}

      <p className="net-gross__updated">
        Contenu révisé le <time dateTime={GROSS_TO_NET_UPDATED_AT}>{revisedLabel}</time>.{" "}
        {GROSS_TO_NET_AUTHORITY_NOTE}
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
