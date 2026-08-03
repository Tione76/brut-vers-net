import Link from "next/link";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { ShareBlock } from "@/framework/design/components/ShareBlock";
import { GuideAuthorMeta } from "@/site/guides";
import {
  MONTHLY_INCREASE_PROFILES,
  MONTHLY_INCREASE_UPDATED_AT,
} from "./config";
import {
  buildAllProfileIncreaseEstimates,
  buildIncreaseComparisonRows,
  formatEuroAmount,
  formatIncreaseShort,
} from "./data";
import { MiniIncreaseCalculatorCta } from "./mini-calculator-cta";
import {
  buildMonthlyIncreaseEditorial,
  buildMonthlyIncreaseFaqItems,
  buildMonthlyIncreaseSeoMeta,
  getNearbyMonthlyIncreaseLinks,
  monthlyIncreaseBreadcrumbLabel,
} from "./content";
import "@/site/salaire-net-brut/salaire-net-brut.css";
import "@/site/salaire-net-brut/page-1500.css";

const CARD_TONE: Record<string, string> = {
  nonExecutive: "non-cadre",
  executive: "cadre",
  publicService: "public",
};

interface MonthlyIncreaseSeriesPageContentProps {
  grossMonthlyIncrease: number;
  share: {
    url: string;
    title: string;
    description?: string;
  };
}

/**
 * Template de la série « augmentation mensuelle ».
 * Pilote : 50 € brut. Seul le montant cible change lors de la généralisation.
 */
export function MonthlyIncreaseSeriesPageContent({
  grossMonthlyIncrease,
  share,
}: MonthlyIncreaseSeriesPageContentProps) {
  const estimates = buildAllProfileIncreaseEstimates(grossMonthlyIncrease);
  const rows = buildIncreaseComparisonRows(grossMonthlyIncrease);
  const faq = buildMonthlyIncreaseFaqItems(grossMonthlyIncrease, estimates);
  const editorialSections = buildMonthlyIncreaseEditorial(grossMonthlyIncrease, estimates);
  const seo = buildMonthlyIncreaseSeoMeta(grossMonthlyIncrease);
  const grossLabel = formatIncreaseShort(grossMonthlyIncrease);
  const revisedLabel = new Date(MONTHLY_INCREASE_UPDATED_AT).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const profileCards = MONTHLY_INCREASE_PROFILES.map((profile) => estimates[profile]);
  const nearby = getNearbyMonthlyIncreaseLinks(grossMonthlyIncrease);
  const idPrefix = `aug-mensuelle-${grossMonthlyIncrease}`;

  return (
    <div className="net-gross net-gross-1500">
      <PageBreadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: monthlyIncreaseBreadcrumbLabel(grossMonthlyIncrease) },
        ]}
      />
      <GuideAuthorMeta updatedAt={MONTHLY_INCREASE_UPDATED_AT} />

      <section className="net-gross-1500__hero" aria-labelledby={`${idPrefix}-answer`}>
        <h2 id={`${idPrefix}-answer`} className="net-gross-1500__answer-title">
          {seo.answerH2}
        </h2>

        <div className="net-gross-1500__cards">
          {profileCards.map((estimate) => (
            <article
              key={estimate.profile}
              className={`net-gross-1500__card net-gross-1500__card--${CARD_TONE[estimate.profile]}`}
            >
              <h3 className="net-gross-1500__card-title">{estimate.profileLabel}</h3>
              <p className="net-gross-1500__card-metric-label">Gain net mensuel</p>
              <p className="net-gross-1500__card-dominant">
                {formatEuroAmount(estimate.netMonthlyGain)}
              </p>
              <div className="net-gross-1500__card-annual">
                <p className="net-gross-1500__card-annual-value">
                  soit environ {formatEuroAmount(estimate.netAnnualGain)} nets par an
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="net-gross-1500__result-note">
          Une augmentation de {grossLabel} brut ne correspond jamais à {grossLabel} nets. Le
          montant réellement perçu dépend des cotisations sociales et de votre statut (non-cadre,
          cadre ou fonction publique). Notre estimation donne immédiatement un ordre de grandeur
          avant prélèvement à la source.
        </p>
      </section>

      <MiniIncreaseCalculatorCta defaultGrossMonthlyIncrease={grossMonthlyIncrease} />

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
          Gain net selon le montant de l&apos;augmentation mensuelle brute
        </h2>
        <p className="net-gross-1500__table-intro">
          Net mensuel estimé selon le profil, avant prélèvement à la source.
        </p>
        <div className="net-gross-1500__table-wrap">
          <table className="net-gross-1500__table">
            <caption className="net-gross-1500__sr-only">
              Conversion augmentation brute mensuelle vers gain net autour de {grossLabel}
            </caption>
            <thead>
              <tr>
                <th scope="col">Augmentation brute</th>
                <th scope="col">Non-cadre</th>
                <th scope="col">Cadre</th>
                <th scope="col">Fonction publique</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.grossMonthlyIncrease}
                  className={row.isCurrent ? "net-gross-1500__table-row--current" : undefined}
                >
                  <td>
                    {formatIncreaseShort(row.grossMonthlyIncrease)}
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
        <p className="net-gross-1500__result-note">
          Estimations mensuelles avant prélèvement à la source, calculées selon les coefficients
          utilisés par notre simulateur.
        </p>
      </section>

      <section className="net-gross-1500__faq" aria-labelledby={`${idPrefix}-faq-title`}>
        <h2 id={`${idPrefix}-faq-title`} className="net-gross-1500__h2">
          Questions fréquentes
        </h2>
        <div className="faq-list">
          {faq.map((item) => (
            <details key={item.question} className="faq-item">
              <summary className="faq-item__summary">
                <span>{item.question}</span>
                <span className="faq-chevron" aria-hidden="true">
                  ▾
                </span>
              </summary>
              <div className="faq-item__body">
                <p>{item.answer}</p>
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

      <p className="net-gross__updated">
        Contenu révisé le <time dateTime={MONTHLY_INCREASE_UPDATED_AT}>{revisedLabel}</time>.
        Chiffres alignés sur les coefficients du simulateur.
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
