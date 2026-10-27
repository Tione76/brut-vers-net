import { notFound } from "next/navigation";
import { config, seoConfig } from "@/site";
import {
  buildGuideTocH2,
  computeReadingTime,
  getGuideBySlug,
  getGuidePublicPath,
  GuideArticle,
  GuideAuthorMeta,
  GuidePageLayout,
  GuidePageSidebar,
  resolveGuideCover,
} from "@/site/guides";
import { coverToOgInput } from "@/site/guides/covers";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata, getCanonicalUrl } from "@/framework/seo/metadata";
import { buildGuideJsonLd } from "@/site/schema";
import { isPathIndexable } from "@/site/public-pages";
import {
  SOLDE_CONGES_CALCULATOR_ID,
  SOLDE_CONGES_HEADER_CTA,
  SOLDE_CONGES_SLUG,
  SoldeCongesPayesCalculator,
} from "@/site/solde-conges-payes";

const SLUG = SOLDE_CONGES_SLUG;

export async function generateMetadata() {
  const guide = getGuideBySlug(SLUG);
  if (!guide) return {};

  const path = getGuidePublicPath(guide);
  const cover = resolveGuideCover(guide);
  const indexable = isPathIndexable(path);

  return buildPageMetadata(config, seoConfig, {
    title: guide.seoTitle ?? guide.title,
    description: guide.description,
    path,
    ogImage: cover ? coverToOgInput(cover) : undefined,
    robots: indexable ? undefined : { index: false, follow: false },
    openGraphType: "article",
  });
}

export default async function SoldeCongesPayesPage() {
  const guide = getGuideBySlug(SLUG);
  if (!guide) notFound();

  const path = getGuidePublicPath(guide);
  const readingTime = computeReadingTime(guide);
  const toc = buildGuideTocH2(guide);
  const shareTitle = guide.seoTitle ?? guide.title;

  return (
    <>
      <JsonLd data={buildGuideJsonLd(guide)} />
      <GuidePageLayout
        title={guide.title}
        subtitle={guide.subtitle}
        sidebar={<GuidePageSidebar slug={SLUG} />}
        headerActions={
          <div className="guide-header__actions">
            <a href={`#${SOLDE_CONGES_CALCULATOR_ID}`} className="guide-header__cta">
              {SOLDE_CONGES_HEADER_CTA}
            </a>
          </div>
        }
      >
        <PageBreadcrumb
          items={
            guide.breadcrumbLabel
              ? [{ label: "Accueil", href: "/" }, { label: guide.breadcrumbLabel }]
              : [
                  { label: "Accueil", href: "/" },
                  { label: "Guides", href: seoConfig.guidesHub.path },
                  { label: guide.title },
                ]
          }
        />
        <GuideAuthorMeta updatedAt={guide.updatedAt} readingTime={readingTime} />
        <GuideArticle
          slug={guide.slug}
          introduction={guide.introduction}
          introSummary={guide.introSummary}
          quickSummary={guide.quickSummary}
          toc={toc}
          sections={guide.sections}
          faq={guide.faq}
          faqTitle={guide.faqTitle}
          faqIntro={guide.faqIntro}
          faqSectionId={guide.faqSectionId}
          conclusion={guide.conclusion}
          bibliography={guide.bibliography}
          cover={resolveGuideCover(guide)}
          share={{
            url: getCanonicalUrl(config.url, path),
            title: shareTitle,
            description: guide.description,
          }}
          sectionSlots={{
            [SOLDE_CONGES_CALCULATOR_ID]: <SoldeCongesPayesCalculator />,
          }}
        />
      </GuidePageLayout>
    </>
  );
}
