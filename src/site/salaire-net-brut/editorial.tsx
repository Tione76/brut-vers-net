import Link from "next/link";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { formatCurrency } from "@/site/salary-calculator/parsing";
import {
  buildAllProfileEstimates,
  buildComparisonRows,
  buildFaqItems,
  buildNearbyLinks,
  buildPageCopy,
  formatNetShort,
} from "./data";
import { NET_TO_GROSS_PROFILES, NET_TO_GROSS_UPDATED_AT } from "./config";
import { MiniCalculatorCta } from "./mini-calculator-cta";
import "./salaire-net-brut.css";

interface NetToGrossPageContentProps {
  netMonthly: number;
}

export function NetToGrossPageContent({ netMonthly }: NetToGrossPageContentProps) {
  const estimates = buildAllProfileEstimates(netMonthly);
  const rows = buildComparisonRows(netMonthly);
  const faq = buildFaqItems(netMonthly);
  const nearby = buildNearbyLinks(netMonthly);
  const copy = buildPageCopy(netMonthly);
  const netLabel = formatNetShort(netMonthly);
  const revisedLabel = new Date(NET_TO_GROSS_UPDATED_AT).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const profileCards = NET_TO_GROSS_PROFILES.map((profile) => estimates[profile]);
  const editorialSections = [
    { id: "non-cadre", section: copy.nonExecutive },
    { id: "cadre", section: copy.executive },
    { id: "fonction-publique", section: copy.publicService },
  ] as const;

  return (
    <div className="net-gross">
      <PageBreadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: `${netLabel} net` },
        ]}
      />

      <p className="net-gross__intro">{copy.intro}</p>

      <section className="net-gross__hero" aria-labelledby="net-gross-answer">
        <h2 id="net-gross-answer" className="net-gross__answer-title">
          Pour toucher environ <strong>{netLabel} nets par mois</strong>
        </h2>

        <div className="net-gross__cards">
          {profileCards.map((estimate) => (
            <article key={estimate.profile} className="net-gross__card">
              <h3 className="net-gross__card-title">{estimate.profileLabel}</h3>
              <dl className="net-gross__card-grid">
                <div>
                  <dt>Brut mensuel</dt>
                  <dd>{formatCurrency(estimate.grossMonthly)}</dd>
                </div>
                <div>
                  <dt>Brut annuel</dt>
                  <dd>{formatCurrency(estimate.grossAnnual)}</dd>
                </div>
                <div>
                  <dt>Brut horaire</dt>
                  <dd>{formatCurrency(estimate.grossHourly)}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        <p className="net-gross__result-note">
          Estimations avant prélèvement à la source. Base horaire&nbsp;:{" "}
          {estimates.nonExecutive.monthlyHours.toLocaleString("fr-FR")}&nbsp;h / mois à temps
          plein. Coefficients alignés sur le simulateur.
        </p>
      </section>

      <MiniCalculatorCta defaultGrossMonthly={estimates.nonExecutive.grossMonthly} />

      {editorialSections.map(({ id, section }) => (
        <section
          key={id}
          className="net-gross__explain"
          aria-labelledby={`net-gross-${id}`}
        >
          <h2 id={`net-gross-${id}`} className="net-gross__h2">
            {section.title}
          </h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </section>
      ))}

      <section className="net-gross__table-section" aria-labelledby="net-gross-table-title">
        <h2 id="net-gross-table-title" className="net-gross__h2">
          Autour de {netLabel} nets
        </h2>
        <p className="net-gross__table-intro">{copy.tableIntro}</p>
        <div className="net-gross__table-wrap">
          <table className="net-gross__table">
            <caption className="net-gross__sr-only">
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
                  className={row.isCurrent ? "net-gross__table-row--current" : undefined}
                >
                  <td>
                    {formatNetShort(row.netMonthly)}
                    {row.isCurrent ? (
                      <span className="net-gross__badge"> montant recherché</span>
                    ) : null}
                  </td>
                  <td>{formatCurrency(row.nonExecutive)}</td>
                  <td>{formatCurrency(row.executive)}</td>
                  <td>{formatCurrency(row.publicService)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="net-gross__faq" aria-labelledby="net-gross-faq-title">
        <h2 id="net-gross-faq-title" className="net-gross__h2">
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

      <section className="net-gross__nearby" aria-labelledby="net-gross-nearby-title">
        <h2 id="net-gross-nearby-title" className="net-gross__h2">
          Montants proches
        </h2>
        <ul className="net-gross__nearby-list">
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
    </div>
  );
}
