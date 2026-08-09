import Link from "next/link";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { ShareBlock } from "@/framework/design/components/ShareBlock";
import { GuideAuthorMeta } from "@/site/guides";
import { NET_TO_GROSS_HUB_BREADCRUMB_LABEL, NET_TO_GROSS_UPDATED_AT } from "./config";
import { buildNetToGrossHubPayload, netToGrossHubFicheDomId } from "./hub";
import { NetToGrossHubAmountSearch } from "./hub-search";
import "./salaire-net-brut.css";
import "./page-1500.css";
import "@/site/salaire-brut-net/hub.css";

/**
 * Contenu publié du hub de la série net mensuel → brut.
 * Navigation / catalogue : pas de tableau de comparaison (réservé à l'Index).
 */
export function NetToGrossHubPageContent() {
  const hub = buildNetToGrossHubPayload();
  const revisedLabel = new Date(NET_TO_GROSS_UPDATED_AT).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const publishedAmounts = hub.ficheLinks.map((link) => link.amount);

  return (
    <div className="net-gross net-gross-1500 gross-to-net-hub">
      <PageBreadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: NET_TO_GROSS_HUB_BREADCRUMB_LABEL },
        ]}
      />
      <GuideAuthorMeta updatedAt={NET_TO_GROSS_UPDATED_AT} />

      <section
        id="hub-trouver"
        className="net-gross-1500__explain"
        aria-labelledby="hub-trouver-title"
      >
        <h2 id="hub-trouver-title" className="net-gross-1500__h2">
          {hub.findSection.title}
        </h2>
        <p>{hub.findSection.intro}</p>
        <NetToGrossHubAmountSearch amounts={publishedAmounts} />

        <div className="gross-to-net-hub__paths">
          {hub.paths.map((path) => (
            <article key={path.id} className="gross-to-net-hub__path">
              <h3 className="gross-to-net-hub__path-title">{path.title}</h3>
              <p>{path.text}</p>
              <p>
                <Link href={path.href} className="gross-to-net-hub__path-cta">
                  {path.cta}
                </Link>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="hub-catalogue"
        className="net-gross-1500__nearby"
        aria-labelledby="hub-catalogue-title"
      >
        <h2 id="hub-catalogue-title" className="net-gross-1500__h2">
          {hub.catalog.title}
        </h2>
        <p className="gross-to-net-hub__catalog-intro">{hub.catalog.intro}</p>

        {hub.catalog.ranges.map((range) => (
          <div key={range.id} id={range.id} className="gross-to-net-hub__range">
            <h3 className="gross-to-net-hub__range-title">{range.title}</h3>
            <ul className="net-gross-1500__nearby-list gross-to-net-hub__fiche-list">
              {range.links.map((item) => (
                <li key={item.href}>
                  <Link
                    id={netToGrossHubFicheDomId(item.amount)}
                    href={item.href}
                    className="gross-to-net-hub__fiche"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section
        id="hub-methode"
        className="net-gross-1500__explain"
        aria-labelledby="hub-methode-title"
      >
        <h2 id="hub-methode-title" className="net-gross-1500__h2">
          {hub.methodology.title}
        </h2>
        {hub.methodology.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
        <p>
          Pour aller plus loin :{" "}
          <Link href={hub.methodology.guideLink.href}>{hub.methodology.guideLink.label}</Link>.
        </p>
      </section>

      <section
        id="hub-plus-loin"
        className="net-gross-1500__nearby gross-to-net-hub__further"
        aria-labelledby="hub-plus-loin-title"
      >
        <h2 id="hub-plus-loin-title" className="net-gross-1500__h2">
          Pour aller plus loin
        </h2>
        <ul className="net-gross-1500__nearby-list">
          {hub.furtherLinks.map((link) => (
            <li key={link.href + link.label}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="hub-faq" className="net-gross-1500__faq" aria-labelledby="hub-faq-title">
        <h2 id="hub-faq-title" className="net-gross-1500__h2">
          Questions fréquentes
        </h2>
        <div className="faq-list">
          {hub.faq.map((item) => (
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
        Contenu révisé le <time dateTime={NET_TO_GROSS_UPDATED_AT}>{revisedLabel}</time>.
      </p>

      <ShareBlock
        url={hub.canonical}
        title={hub.seo.title}
        description={hub.seo.description}
        contentType="fiche"
        variant="onLight"
      />
    </div>
  );
}
