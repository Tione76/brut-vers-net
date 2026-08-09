import Link from "next/link";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { ShareBlock } from "@/framework/design/components/ShareBlock";
import { GuideAuthorMeta } from "@/site/guides";
import { GROSS_TO_NET_UPDATED_AT } from "./config";
import { formatEuroAmount } from "./data";
import { grossToNetIndexRowId } from "./index-table";
import { buildGrossToNetIndexPayload } from "./series-index";
import { GrossToNetIndexTableSearch } from "./series-index-search";
import "@/site/salaire-net-brut/salaire-net-brut.css";
import "@/site/salaire-net-brut/page-1500.css";
import "./series-index.css";

/**
 * Contenu publié de la page index (tableau) de la série brut mensuel → net.
 */
export function GrossToNetIndexPageContent() {
  const page = buildGrossToNetIndexPayload();
  const revisedLabel = new Date(GROSS_TO_NET_UPDATED_AT).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const publishedAmounts = page.table.rows.map((row) => row.grossMonthly);

  return (
    <div className="net-gross net-gross-1500 gross-to-net-index">
      <PageBreadcrumb
        items={[
          { label: "Accueil", href: "/" },
          {
            label: "Tous les salaires bruts mensuels convertis en net",
            href: page.hubPath,
          },
          { label: "Tableau" },
        ]}
      />
      <GuideAuthorMeta updatedAt={GROSS_TO_NET_UPDATED_AT} />

      <nav className="gross-to-net-index__toc" aria-label="Sur cette page">
        <p className="gross-to-net-index__toc-title">Sur cette page</p>
        <ul className="gross-to-net-index__toc-list">
          {page.toc.map((entry) => (
            <li key={entry.id}>
              <a href={`#${entry.id}`}>{entry.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <section
        id="index-table"
        className="net-gross-1500__table-section gross-to-net-index__table-section"
        aria-labelledby="index-table-title"
      >
        <h2 id="index-table-title" className="net-gross-1500__h2">
          Tableau de conversion du salaire brut mensuel en net
        </h2>
        <p className="net-gross-1500__table-intro">{page.table.intro}</p>
        <GrossToNetIndexTableSearch amounts={publishedAmounts} />
        <div className="net-gross-1500__table-wrap gross-to-net-index__table-wrap">
          <table className="net-gross-1500__table gross-to-net-index__table">
            <caption className="net-gross-1500__sr-only">
              Tableau de conversion salaire brut mensuel en net pour non-cadre, cadre et fonction
              publique
            </caption>
            <thead>
              <tr>
                {page.table.columns.map((column) => (
                  <th key={column.id} scope="col">
                    <span className="gross-to-net-index__th-full">{column.full}</span>
                    <span className="gross-to-net-index__th-short">{column.short}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {page.table.rows.map((row) => (
                <tr
                  key={row.grossMonthly}
                  id={grossToNetIndexRowId(row.grossMonthly)}
                  tabIndex={-1}
                  className={
                    row.isMilestone ? "gross-to-net-index__row--milestone" : undefined
                  }
                >
                  <th scope="row" className="gross-to-net-index__gross">
                    <Link href={row.href}>{row.grossLabel}</Link>
                  </th>
                  <td>{formatEuroAmount(row.netNonExecutive)}</td>
                  <td>{formatEuroAmount(row.netExecutive)}</td>
                  <td>{formatEuroAmount(row.netPublicService)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="net-gross-1500__result-note">{page.table.footnote}</p>
      </section>

      {page.editorial.map(({ id, title, paragraphs }) => (
        <section
          key={id}
          id={`index-${id}`}
          className="net-gross-1500__explain"
          aria-labelledby={`index-editorial-${id}`}
        >
          <h2 id={`index-editorial-${id}`} className="net-gross-1500__h2">
            {title}
          </h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
          {id === "calcul-precis" ? (
            <p>
              Pour une estimation personnalisée, ouvrez le{" "}
              <Link href={page.calculatorPath}>calculateur salaire brut et net</Link> : indiquez votre
              brut, votre profil, le temps de travail et, si besoin, le prélèvement à la source.
            </p>
          ) : null}
        </section>
      ))}

      <section
        className="net-gross-1500__nearby gross-to-net-index__further"
        aria-labelledby="index-links-title"
      >
        <h2 id="index-links-title" className="net-gross-1500__h2">
          Pour aller plus loin
        </h2>
        <ul className="net-gross-1500__nearby-list">
          <li>
            <Link href={page.hubPath}>Tous les salaires bruts mensuels convertis en net</Link>
          </li>
          <li>
            <Link href={page.calculatorPath}>Calculateur salaire brut et net</Link>
          </li>
          {page.guideLinks.map((guide) => (
            <li key={guide.href}>
              <Link href={guide.href}>{guide.label}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="index-faq"
        className="net-gross-1500__faq"
        aria-labelledby="index-faq-title"
      >
        <h2 id="index-faq-title" className="net-gross-1500__h2">
          Questions fréquentes
        </h2>
        <div className="faq-list">
          {page.faq.map((item) => (
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

      <p className="net-gross__updated">
        Contenu révisé le <time dateTime={GROSS_TO_NET_UPDATED_AT}>{revisedLabel}</time>.
      </p>

      <ShareBlock
        url={page.canonical}
        title={page.seo.title}
        description={page.seo.description}
        contentType="fiche"
        variant="onLight"
      />
    </div>
  );
}
