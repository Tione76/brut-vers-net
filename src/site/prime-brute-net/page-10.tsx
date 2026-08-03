import Link from "next/link";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { ShareBlock } from "@/framework/design/components/ShareBlock";
import { GuideAuthorMeta } from "@/site/guides";
import {
  GROSS_PRIME_CALCULATOR_ANCHOR_ID,
  GROSS_PRIME_PROFILES,
  GROSS_PRIME_UPDATED_AT,
} from "./config";
import {
  buildAllProfilePrimeEstimates,
  buildGrossPrimeComparisonRows,
  formatPrimeNet,
  formatPrimeShort,
} from "./data";
import { MiniGrossPrimeCalculatorCta } from "./mini-calculator-cta";
import {
  GROSS_PRIME_AUTHORITY_NOTE,
  buildGrossPrimeEditorial,
  buildGrossPrimeFaqItems,
  buildGrossPrimeSeoMeta,
  getNearbyGrossPrimeLinks,
  grossPrimeBreadcrumbLabel,
} from "./content";
import "@/site/salaire-net-brut/salaire-net-brut.css";
import "@/site/salaire-net-brut/page-1500.css";
import "./prime-brute-net.css";

const CARD_TONE: Record<string, string> = {
  nonExecutive: "non-cadre",
  executive: "cadre",
  publicService: "public",
};

interface GrossPrimeSeriesPageContentProps {
  grossPrime: number;
  share: {
    url: string;
    title: string;
    description?: string;
  };
}

/**
 * Template de la série prime brute → net.
 * Pilote : 10 €. Seul le montant cible change lors de la généralisation.
 */
export function GrossPrimeSeriesPageContent({
  grossPrime,
  share,
}: GrossPrimeSeriesPageContentProps) {
  const estimates = buildAllProfilePrimeEstimates(grossPrime);
  const rows = buildGrossPrimeComparisonRows(grossPrime);
  const faq = buildGrossPrimeFaqItems(grossPrime, estimates);
  const editorialSections = buildGrossPrimeEditorial(grossPrime, estimates);
  const seo = buildGrossPrimeSeoMeta(grossPrime);
  const grossLabel = formatPrimeShort(grossPrime);
  const revisedLabel = new Date(GROSS_PRIME_UPDATED_AT).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const profileCards = GROSS_PRIME_PROFILES.map((profile) => estimates[profile]);
  const nearby = getNearbyGrossPrimeLinks(grossPrime);
  const idPrefix = `gross-prime-${grossPrime}`;
  const calculatorHref = `#${GROSS_PRIME_CALCULATOR_ANCHOR_ID}`;

  return (
    <div className="net-gross net-gross-1500 gross-prime-series">
      <PageBreadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: grossPrimeBreadcrumbLabel(grossPrime) },
        ]}
      />
      <GuideAuthorMeta updatedAt={GROSS_PRIME_UPDATED_AT} />

      <section className="net-gross-1500__hero" aria-labelledby={`${idPrefix}-answer`}>
        <h2 id={`${idPrefix}-answer`} className="net-gross-1500__answer-title">
          {seo.answerH2}
        </h2>
        <p className="net-gross-1500__table-intro">{seo.cardsIntro}</p>

        <div className="net-gross-1500__cards">
          {profileCards.map((estimate) => (
            <article
              key={estimate.profile}
              className={`net-gross-1500__card net-gross-1500__card--${CARD_TONE[estimate.profile]}`}
            >
              <h3 className="net-gross-1500__card-title">{estimate.profileLabel}</h3>
              <p className="net-gross-1500__card-metric-label">Prime nette estimée</p>
              <p className="net-gross-1500__card-dominant">
                {formatPrimeNet(estimate.netPrime)}
              </p>
              <div className="net-gross-1500__card-annual">
                <p className="net-gross-1500__card-annual-value">
                  Si cette prime est versée chaque mois : environ{" "}
                  {formatPrimeNet(estimate.netAnnualIfMonthly)} nets par an
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="net-gross-1500__result-note">
          Les montants ci-dessus correspondent à une estimation de la prime nette avant
          prélèvement à la source, calculée à partir des coefficients utilisés par notre
          simulateur.
        </p>
      </section>

      <MiniGrossPrimeCalculatorCta defaultGrossPrime={grossPrime} />

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
          Conversion des primes brutes proches de {grossLabel}
        </h2>
        <p className="net-gross-1500__table-intro">
          Estimation non-cadre avant prélèvement à la source. La dernière colonne suppose que la
          même prime nette est versée chaque mois.
        </p>
        <div className="net-gross-1500__table-wrap">
          <table className="net-gross-1500__table">
            <caption className="net-gross-1500__sr-only">
              Conversion prime brute vers net autour de {grossLabel}
            </caption>
            <thead>
              <tr>
                <th scope="col">Prime brute</th>
                <th scope="col">Prime nette estimée</th>
                <th scope="col">
                  <span className="gross-prime-table__th-stack">
                    Si cette prime est
                    <br />
                    versée chaque mois
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.grossPrime}
                  className={row.isCurrent ? "net-gross-1500__table-row--current" : undefined}
                >
                  <td>
                    {formatPrimeShort(row.grossPrime)}
                    {row.isCurrent ? (
                      <span className="net-gross-1500__badge"> Montant recherché</span>
                    ) : null}
                  </td>
                  <td>{formatPrimeNet(row.netPrime)}</td>
                  <td>{formatPrimeNet(row.netAnnualIfMonthly)} / an</td>
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
                    Pour un calcul personnalisé, utilisez notre{" "}
                    <a href={calculatorHref}>calculateur de prime brute en net</a> situé plus haut
                    sur cette page. Indiquez simplement le montant de votre prime brute et
                    choisissez votre statut (non-cadre, cadre ou fonction publique). Le résultat
                    est calculé immédiatement.
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

      <p className="net-gross__updated">
        Contenu révisé le <time dateTime={GROSS_PRIME_UPDATED_AT}>{revisedLabel}</time>.{" "}
        {GROSS_PRIME_AUTHORITY_NOTE}
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
