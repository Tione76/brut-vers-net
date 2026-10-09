import Link from "next/link";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { ShareBlock } from "@/framework/design/components/ShareBlock";
import { CoverFigure, GuideAuthorMeta } from "@/site/guides";
import { NET_TO_GROSS_SERIES_COVER } from "@/site/guides/covers";
import {
  buildAllProfileEstimates,
  buildComparisonRows,
  formatNetShort,
  type ComparisonRow,
} from "./data";
import {
  NET_TO_GROSS_HUB_BREADCRUMB_LABEL,
  NET_TO_GROSS_HUB_PATH,
  NET_TO_GROSS_PROFILES,
  NET_TO_GROSS_UPDATED_AT,
  netToGrossPath,
} from "./config";
import { MiniCalculatorCta1500 } from "./mini-calculator-cta-1500";
import {
  buildSeriesEditorial,
  buildSeriesFaqItems,
  getSeriesNearbyAmounts,
  seriesBreadcrumbLabel,
} from "./page-1500-content";
import {
  PAGE_1650_ANSWER_H2,
  PAGE_1650_CALCULATOR_BUTTON,
  PAGE_1650_CALCULATOR_HEADING,
  PAGE_1650_CALCULATOR_INTRO,
  PAGE_1650_ROUNDING_NOTE,
  PAGE_1650_TABLE_H2,
  PAGE_1650_TABLE_INTRO,
  PAGE_1650_DATE_MODIFIED,
  PAGE_1650_FAQ_HOME_CALCULATOR_LABEL,
  PAGE_1650_TAX_SECTION_ID,
  build1650IntermediateRows,
  isNetToGross1650Prototype,
  split1650FaqHomeCalculatorAnswer,
} from "./page-1650";
import { Page1650NearbySection } from "./page-1650-nearby";
import { Page1650EndCta, Page1650PedagogySections } from "./page-1650-sections";
import { Page1650ResultCards } from "./page-1650-result-cards";
import "./salaire-net-brut.css";
import "./page-1500.css";
import "./page-1650.css";

function formatEuroAmount(value: number): string {
  return formatNetShort(Math.round(value));
}

const CARD_TONE: Record<string, string> = {
  nonExecutive: "non-cadre",
  executive: "cadre",
  publicService: "public",
};

function ComparisonTable({
  idPrefix,
  netLabel,
  title,
  intro,
  rows,
  highlightCurrent,
  allowHorizontalScroll,
}: {
  idPrefix: string;
  netLabel: string;
  title: string;
  intro: string;
  rows: ComparisonRow[];
  highlightCurrent?: boolean;
  allowHorizontalScroll?: boolean;
}) {
  return (
    <section
      className="net-gross-1500__table-section"
      aria-labelledby={`${idPrefix}-table-title`}
    >
      <h2 id={`${idPrefix}-table-title`} className="net-gross-1500__h2">
        {title}
      </h2>
      <p className="net-gross-1500__table-intro">{intro}</p>
      <div
        className="net-gross-1500__table-wrap"
        tabIndex={allowHorizontalScroll ? 0 : undefined}
        role={allowHorizontalScroll ? "region" : undefined}
        aria-label={
          allowHorizontalScroll
            ? `Tableau de conversion autour de ${netLabel}, défilement horizontal possible`
            : undefined
        }
      >
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
                aria-current={highlightCurrent && row.isCurrent ? "true" : undefined}
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
      {allowHorizontalScroll ? (
        <p className="net-gross-1650__table-scroll-hint">
          Faites défiler le tableau vers la droite pour comparer les trois profils.
        </p>
      ) : null}
    </section>
  );
}

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
  const is1650Prototype = isNetToGross1650Prototype(netMonthly);
  const estimates = buildAllProfileEstimates(netMonthly);
  const rows = is1650Prototype ? build1650IntermediateRows() : buildComparisonRows(netMonthly);
  const faq = buildSeriesFaqItems(netMonthly, estimates);
  const editorialSections = buildSeriesEditorial(netMonthly, estimates);
  const netLabel = formatNetShort(netMonthly);
  const pageUpdatedAt = is1650Prototype ? PAGE_1650_DATE_MODIFIED : NET_TO_GROSS_UPDATED_AT;
  const revisedLabel = new Date(pageUpdatedAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const profileCards = NET_TO_GROSS_PROFILES.map((profile) => estimates[profile]);
  const nearbyAmounts = is1650Prototype
    ? [...getSeriesNearbyAmounts(netMonthly)].sort((a, b) => a - b)
    : getSeriesNearbyAmounts(netMonthly);
  const nearby = nearbyAmounts.map((amount) => ({
    href: netToGrossPath(amount),
    label: formatNetShort(amount),
  }));
  const idPrefix = `net-gross-${netMonthly}`;
  const table = (
    <ComparisonTable
      idPrefix={idPrefix}
      netLabel={netLabel}
      title={
        is1650Prototype
          ? PAGE_1650_TABLE_H2
          : `Estimation du salaire brut pour des salaires nets proches de ${netLabel}`
      }
      intro={
        is1650Prototype
          ? PAGE_1650_TABLE_INTRO
          : "Brut mensuel estimé selon le profil, avant prélèvement à la source."
      }
      rows={rows}
      highlightCurrent={is1650Prototype}
      allowHorizontalScroll={is1650Prototype}
    />
  );

  return (
    <div className={`net-gross net-gross-1500${is1650Prototype ? " net-gross-1650" : ""}`}>
      <PageBreadcrumb
        items={[
          { label: "Accueil", href: "/" },
          {
            label: NET_TO_GROSS_HUB_BREADCRUMB_LABEL,
            href: NET_TO_GROSS_HUB_PATH,
          },
          { label: seriesBreadcrumbLabel(netMonthly) },
        ]}
      />
      <GuideAuthorMeta updatedAt={pageUpdatedAt} />

      <section className="net-gross-1500__hero" aria-labelledby={`${idPrefix}-answer`}>
        <h2 id={`${idPrefix}-answer`} className="net-gross-1500__answer-title">
          {is1650Prototype
            ? PAGE_1650_ANSWER_H2
            : `Quel salaire brut mensuel correspond à ${netLabel} net\u00a0?`}
        </h2>

        {is1650Prototype ? (
          <Page1650ResultCards cards={profileCards} />
        ) : (
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
        )}

        <p className="net-gross-1500__result-note">
          {is1650Prototype ? (
            <>
              Les montants ci-dessus correspondent à une estimation du salaire brut mensuel avant
              prélèvement à la source. {PAGE_1650_ROUNDING_NOTE}
            </>
          ) : (
            <>
              Les montants ci-dessus correspondent à une estimation du salaire brut mensuel avant
              prélèvement à la source, calculée à partir des coefficients utilisés par notre
              simulateur.
            </>
          )}
        </p>
      </section>

      <MiniCalculatorCta1500
        defaultNetMonthly={netMonthly}
        heading={is1650Prototype ? PAGE_1650_CALCULATOR_HEADING : undefined}
        intro={is1650Prototype ? PAGE_1650_CALCULATOR_INTRO : undefined}
        buttonLabel={is1650Prototype ? PAGE_1650_CALCULATOR_BUTTON : undefined}
        appearance={is1650Prototype ? "onBrand" : undefined}
      />

      {is1650Prototype ? table : null}

      <ShareBlock
        url={share.url}
        title={share.title}
        description={share.description}
        contentType="fiche"
        variant="onLight"
      />

      <CoverFigure
        cover={NET_TO_GROSS_SERIES_COVER}
        className="net-to-gross-series__cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 70vw, 720px"
      />

      {is1650Prototype ? <Page1650PedagogySections estimates={estimates} /> : null}

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

      {is1650Prototype ? null : table}

      <section className="net-gross-1500__faq" aria-labelledby={`${idPrefix}-faq-title`}>
        <h2 id={`${idPrefix}-faq-title`} className="net-gross-1500__h2">
          Questions fréquentes
        </h2>
        <div className="faq-list">
          {faq.map((item) => {
            const homeCalcParts =
              is1650Prototype && item.question.includes("précisément")
                ? split1650FaqHomeCalculatorAnswer(item.answer)
                : null;

            return (
            <details key={item.question} className="faq-item">
              <summary className="faq-item__summary">
                <span>{item.question}</span>
                <span className="faq-chevron" aria-hidden="true">
                  ▾
                </span>
              </summary>
              <div className="faq-item__body">
                {is1650Prototype && item.question.includes("avant ou après impôt") ? (
                  <p>
                    {item.answer}{" "}
                    <a href={`#${PAGE_1650_TAX_SECTION_ID}`}>
                      Comprendre le net avant prélèvement à la source
                    </a>
                    .
                  </p>
                ) : homeCalcParts ? (
                  <p>
                    {homeCalcParts.before}
                    <Link href="/">{PAGE_1650_FAQ_HOME_CALCULATOR_LABEL}</Link>
                    {homeCalcParts.after}
                  </p>
                ) : item.question.includes("personnalisé") ? (
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
            );
          })}
        </div>
      </section>

      {is1650Prototype ? (
        <Page1650NearbySection headingId={`${idPrefix}-nearby-title`} links={nearby} />
      ) : (
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
      )}

      {is1650Prototype ? <Page1650EndCta /> : null}

      <p className="net-gross__updated">
        Contenu révisé le <time dateTime={pageUpdatedAt}>{revisedLabel}</time>. Chiffres
        alignés sur les coefficients du simulateur.
      </p>

      {is1650Prototype ? null : (
        <ShareBlock
          url={share.url}
          title={share.title}
          description={share.description}
          contentType="fiche"
          variant="onLight"
        />
      )}
    </div>
  );
}
