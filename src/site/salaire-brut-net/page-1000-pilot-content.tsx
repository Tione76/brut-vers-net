import Link from "next/link";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { ShareBlock } from "@/framework/design/components/ShareBlock";
import { CoverFigure, GuideAuthorMeta } from "@/site/guides";
import { GROSS_TO_NET_SERIES_COVER } from "@/site/guides/covers";
import { GuideSidebar } from "@/site/guides/GuideRenderer";
import { getGuideBySlug } from "@/site/guides/registry";
import { getGuidePublicPath } from "@/site/guides/paths";
import {
  getAllSidebarTools,
  getRecentGuideLinksForPath,
  type GuideSidebarLink,
  type SidebarTool,
} from "@/site/guides/sidebar";
import {
  Page1650BriefcaseIcon,
  Page1650LandmarkIcon,
  Page1650UserIcon,
} from "@/site/salaire-net-brut/page-1650-icons";
import {
  GROSS_TO_NET_HUB_PATH,
  GROSS_TO_NET_PROFILES,
  grossToNetPath,
} from "./config";
import {
  buildAllProfileNetEstimates,
  buildGrossToNetComparisonRows,
  type GrossToNetEstimate,
} from "./data";
import { MiniGrossToNetCalculatorCta } from "./mini-calculator-cta";
import {
  getNearbyGrossToNetAmounts,
  grossToNetBreadcrumbLabel,
} from "./content";
import {
  COTISATIONS_GUIDE_HREF,
  GROSS_TO_NET_REDESIGN_DATE_MODIFIED,
  PAGE_1000_CALCULATOR_BUTTON,
  PAGE_1000_CALCULATOR_HEADING,
  PAGE_1000_CALCULATOR_INTRO,
  PAGE_1000_CHECKLIST_H2,
  PAGE_1000_CHECKLIST_SECTION_ID,
  PAGE_1000_END_CTA_H2,
  PAGE_1000_END_CTA_LINK_LABEL,
  PAGE_1000_END_CTA_TEXT,
  PAGE_1000_FAQ_HOME_CALCULATOR_LABEL,
  PAGE_1000_HOW_TO_CALCULATOR,
  PAGE_1000_NEARBY_INTRO,
  PAGE_1000_RESULT_CAPTION,
  PAGE_1000_RESULT_NOTE,
  PAGE_1000_SITUATION_H2,
  PAGE_1000_SITUATION_SECTION_ID,
  PAGE_1000_SIDEBAR_GUIDE_ENTRIES,
  PAGE_1000_SIDEBAR_TOOL_IDS,
  PAGE_1000_TAX_SECTION_ID,
  buildGrossToNetChecklistText,
  buildGrossToNetHowToH2,
  buildGrossToNetNearbyH2,
  buildGrossToNetRedesignSeoMeta,
  buildGrossToNetTableH2,
  buildGrossToNetTableIntro,
  buildPage1000ConversionExample,
  buildPage1000EndCtaHref,
  buildPage1000FaqItems,
  buildPage1000HowToCoefficients,
  formatPilotEuro,
  grossToNetHowToSectionId,
  splitPage1000FaqHomeCalculatorAnswer,
} from "./page-1000-pilot";
import { GrossToNetAnnualSection, GrossToNetTaxSection } from "./tax-annual-sections";
import "@/site/salaire-net-brut/salaire-net-brut.css";
import "@/site/salaire-net-brut/page-1500.css";
import "@/site/salaire-net-brut/page-1650.css";
import "./page-1000-pilot.css";

const PROFILE_ICON = {
  nonExecutive: Page1650UserIcon,
  executive: Page1650BriefcaseIcon,
  publicService: Page1650LandmarkIcon,
} as const;

function formatCardAmount(value: number): string {
  return formatPilotEuro(Math.round(value));
}

function GrossToNet1000ResultCards({ cards }: { cards: GrossToNetEstimate[] }) {
  return (
    <div className="net-gross-1650__result-grid">
      {cards.map((estimate) => {
        const Icon = PROFILE_ICON[estimate.profile];
        return (
          <article key={estimate.profile} className="net-gross-1650__result-card">
            <header className="net-gross-1650__result-head">
              <span className="net-gross-1650__result-icon" aria-hidden="true">
                <Icon />
              </span>
              <h3 className="net-gross-1650__result-title">{estimate.profileLabel}</h3>
            </header>
            <p className="net-gross-1650__result-amount">{formatCardAmount(estimate.netMonthly)}</p>
            <p className="net-gross-1650__result-caption">{PAGE_1000_RESULT_CAPTION}</p>
          </article>
        );
      })}
    </div>
  );
}

function GrossToNet1000Sidebar({
  currentPath,
  grossMonthly,
}: {
  currentPath: string;
  grossMonthly: number;
}) {
  const byId = new Map(getAllSidebarTools().map((tool) => [tool.id, tool]));
  const calculatorHref = buildPage1000EndCtaHref(grossMonthly);
  const tools: SidebarTool[] = PAGE_1000_SIDEBAR_TOOL_IDS.flatMap((id) => {
    const tool = byId.get(id);
    if (!tool) return [];
    return [
      {
        ...tool,
        description:
          id === "brut-vers-net"
            ? "Convertissez un autre salaire brut en net selon votre statut."
            : id === "salaire-heures-supplementaires"
              ? "Estimez vos heures sup en brut et en net."
              : tool.description,
        href: id === "brut-vers-net" ? calculatorHref : tool.href,
      },
    ];
  });

  const curatedGuides: GuideSidebarLink[] = PAGE_1000_SIDEBAR_GUIDE_ENTRIES.flatMap(
    ({ slug, title }) => {
      const guide = getGuideBySlug(slug);
      if (!guide) return [];
      return [
        {
          slug: guide.slug,
          title,
          href: getGuidePublicPath(guide),
          description: guide.subtitle || guide.description,
        },
      ];
    },
  );

  const recentGuides = getRecentGuideLinksForPath(
    [...curatedGuides.map((guide) => guide.href), currentPath],
    currentPath,
    10,
  );

  return (
    <aside className="article-sidebar net-gross-1650-sidebar" aria-label="Maillage interne">
      <div className="article-sidebar__slot article-sidebar__slot--ad" hidden aria-hidden="true" />
      <div className="article-sidebar__recommendations">
        <GuideSidebar
          tools={tools}
          guides={curatedGuides}
          recentGuides={recentGuides}
          guidesSectionTitle="À lire aussi"
          guidesBlockVariant="also-read"
          showTools
          toolsFirst
        />
      </div>
    </aside>
  );
}

export function GrossToNet1000PageSidebar({ grossMonthly }: { grossMonthly: number }) {
  return <GrossToNet1000Sidebar currentPath={grossToNetPath(grossMonthly)} grossMonthly={grossMonthly} />;
}

interface GrossToNet1000PageContentProps {
  grossMonthly: number;
  share: {
    url: string;
    title: string;
    description?: string;
  };
}

export function GrossToNet1000PageContent({
  grossMonthly,
  share,
}: GrossToNet1000PageContentProps) {
  const estimates = buildAllProfileNetEstimates(grossMonthly);
  const rows = buildGrossToNetComparisonRows(grossMonthly);
  const faq = buildPage1000FaqItems(grossMonthly);
  const example = buildPage1000ConversionExample(grossMonthly);
  const howToCoefficients = buildPage1000HowToCoefficients(grossMonthly);
  const seo = buildGrossToNetRedesignSeoMeta(grossMonthly);
  const grossLabel = formatPilotEuro(grossMonthly);
  const nearby = getNearbyGrossToNetAmounts(grossMonthly).map((amount) => ({
    href: grossToNetPath(amount),
    label: formatPilotEuro(amount),
  }));
  const profileCards = GROSS_TO_NET_PROFILES.map((profile) => estimates[profile]);
  const revisedLabel = new Date(GROSS_TO_NET_REDESIGN_DATE_MODIFIED).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const idPrefix = `gross-to-net-${grossMonthly}`;
  const howToTitleId = `${idPrefix}-how-to-title`;
  const annualTitleId = `${idPrefix}-annual-title`;
  const taxTitleId = `${idPrefix}-tax-title`;
  const endCtaTitleId = `${idPrefix}-end-cta-title`;

  return (
    <div className="net-gross net-gross-1500 net-gross-1650 gross-to-net-1000">
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
      <GuideAuthorMeta updatedAt={GROSS_TO_NET_REDESIGN_DATE_MODIFIED} />

      <ShareBlock
        url={share.url}
        title={share.title}
        description={share.description}
        contentType="fiche"
        variant="onLight"
        layout="masthead"
      />

      <section className="net-gross-1500__hero" aria-labelledby={`${idPrefix}-answer`}>
        <h2 id={`${idPrefix}-answer`} className="net-gross-1500__answer-title">
          {seo.answerH2}
        </h2>
        <GrossToNet1000ResultCards cards={profileCards} />
        <p className="net-gross-1500__result-note">{PAGE_1000_RESULT_NOTE}</p>
      </section>

      <MiniGrossToNetCalculatorCta
        defaultGrossMonthly={grossMonthly}
        heading={PAGE_1000_CALCULATOR_HEADING}
        intro={PAGE_1000_CALCULATOR_INTRO}
        buttonLabel={PAGE_1000_CALCULATOR_BUTTON}
        profileGroupLabel="Statut professionnel"
        appearance="onBrand"
      />

      <section
        className="net-gross-1500__table-section"
        aria-labelledby={`${idPrefix}-table-title`}
      >
        <h2 id={`${idPrefix}-table-title`} className="net-gross-1500__h2">
          {buildGrossToNetTableH2(grossMonthly)}
        </h2>
        <div
          className="net-gross-1500__table-wrap"
          tabIndex={0}
          role="region"
          aria-label={`Tableau de conversion autour de ${grossLabel}, défilement horizontal possible`}
        >
          <table className="net-gross-1500__table">
            <caption className="gross-to-net-1000__table-caption">
              {buildGrossToNetTableIntro(grossMonthly)}
            </caption>
            <thead>
              <tr>
                <th scope="col">Montant brut</th>
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
                  aria-current={row.isCurrent ? "true" : undefined}
                >
                  <td>
                    <span className="gross-to-net-1000__amount-cell">
                      <span>{formatPilotEuro(row.grossMonthly)}</span>
                      {row.isCurrent ? (
                        <span className="net-gross-1500__badge">Montant recherché</span>
                      ) : null}
                    </span>
                  </td>
                  <td>{formatCardAmount(row.nonExecutive)}</td>
                  <td>{formatCardAmount(row.executive)}</td>
                  <td>{formatCardAmount(row.publicService)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="net-gross-1650__table-scroll-hint">
          Faites défiler le tableau vers la droite pour comparer les trois profils.
        </p>
      </section>

      <CoverFigure
        cover={GROSS_TO_NET_SERIES_COVER}
        className="gross-to-net-series__cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 70vw, 720px"
      />

      <section
        id={grossToNetHowToSectionId(grossMonthly)}
        className="net-gross-1650__section"
        aria-labelledby={howToTitleId}
      >
        <h2 id={howToTitleId} className="net-gross-1500__h2">
          {buildGrossToNetHowToH2(grossMonthly)}
        </h2>
        <p>{howToCoefficients}</p>
        <div className="net-gross-1650__formula">
          <p className="net-gross-1650__formula-kicker">Exemple salarié non-cadre</p>
          <p className="net-gross-1650__formula-eq">
            {grossLabel} × {example.coefficientLabel}
          </p>
          <p className="net-gross-1650__formula-result">= {example.netLabel} net estimé</p>
        </div>
        <p>
          {PAGE_1000_HOW_TO_CALCULATOR} Pour comprendre l&apos;écart entre brut et net, consultez le{" "}
          <Link href={COTISATIONS_GUIDE_HREF}>guide sur les cotisations salariales</Link>.
        </p>
      </section>

      <GrossToNetTaxSection titleId={taxTitleId} />

      <GrossToNetAnnualSection
        grossMonthly={grossMonthly}
        estimates={estimates}
        titleId={annualTitleId}
      />

      <section
        id={PAGE_1000_SITUATION_SECTION_ID}
        className="net-gross-1500__explain"
        aria-labelledby={`${idPrefix}-situation`}
      >
        <h2 id={`${idPrefix}-situation`} className="net-gross-1500__h2">
          {PAGE_1000_SITUATION_H2}
        </h2>
        <p>
          À montant brut identique, les retenues peuvent varier selon le contrat, le régime de
          cotisations, la mutuelle et les éléments de rémunération.
        </p>
        <p>
          <strong>Salarié non-cadre :</strong> le contrat, la mutuelle et les éventuelles primes
          peuvent modifier le net réellement perçu.
        </p>
        <p>
          <strong>Salarié cadre :</strong> le coefficient retenu sert à l&apos;estimation. Il ne
          signifie pas que tous les cadres supportent systématiquement trois points de retenues
          supplémentaires par rapport aux non-cadres.
        </p>
        <p>
          <strong>Fonction publique :</strong> le résultat dépend notamment du statut de titulaire
          ou de contractuel, des cotisations et des primes ou indemnités.
        </p>
      </section>

      <section
        id={PAGE_1000_CHECKLIST_SECTION_ID}
        className="net-gross-1650__section"
        aria-labelledby={`${idPrefix}-checklist`}
      >
        <h2 id={`${idPrefix}-checklist`} className="net-gross-1500__h2">
          {PAGE_1000_CHECKLIST_H2}
        </h2>
        <p>{buildGrossToNetChecklistText(grossMonthly)}</p>
      </section>

      <section className="net-gross-1500__faq" aria-labelledby={`${idPrefix}-faq-title`}>
        <h2 id={`${idPrefix}-faq-title`} className="net-gross-1500__h2">
          Questions fréquentes
        </h2>
        <div className="faq-list">
          {faq.map((item) => {
            const homeCalcParts = splitPage1000FaqHomeCalculatorAnswer(item.answer);

            return (
              <details key={item.question} className="faq-item">
                <summary className="faq-item__summary">
                  <span>{item.question}</span>
                  <span className="faq-chevron" aria-hidden="true">
                    ▾
                  </span>
                </summary>
                <div className="faq-item__body">
                  {item.question.includes("avant ou après impôt") ? (
                    <p>
                      {item.answer}{" "}
                      <a href={`#${PAGE_1000_TAX_SECTION_ID}`}>
                        Comprendre le net avant prélèvement à la source
                      </a>
                      .
                    </p>
                  ) : homeCalcParts ? (
                    <p>
                      {homeCalcParts.before}
                      <Link href="/">{PAGE_1000_FAQ_HOME_CALCULATOR_LABEL}</Link>
                      {homeCalcParts.after}
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

      <section className="net-gross-1650__nearby" aria-labelledby={`${idPrefix}-nearby-title`}>
        <h2 id={`${idPrefix}-nearby-title`} className="net-gross-1500__h2">
          {buildGrossToNetNearbyH2(grossMonthly)}
        </h2>
        <p className="net-gross-1650__nearby-intro">{PAGE_1000_NEARBY_INTRO}</p>
        <div className="net-gross-1650__nearby-panel">
          <ul className="net-gross-1650__nearby-grid">
            {nearby.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch={false}
                  className="net-gross-1650__nearby-card"
                  aria-label={`${item.label} brut → net`}
                >
                  <span className="net-gross-1650__nearby-amount">{item.label}</span>
                  <span className="net-gross-1650__nearby-hint">brut → net</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="net-gross-1650__end-cta" aria-labelledby={endCtaTitleId}>
        <h2 id={endCtaTitleId} className="net-gross-1500__h2">
          {PAGE_1000_END_CTA_H2}
        </h2>
        <p>{PAGE_1000_END_CTA_TEXT}</p>
        <Link href={buildPage1000EndCtaHref(grossMonthly)} className="net-gross-1650__end-cta-link">
          {PAGE_1000_END_CTA_LINK_LABEL}
        </Link>
      </section>

      <p className="net-gross__updated">
        Contenu révisé le <time dateTime={GROSS_TO_NET_REDESIGN_DATE_MODIFIED}>{revisedLabel}</time>. Chiffres
        alignés sur les coefficients du simulateur.
      </p>
    </div>
  );
}
