import { notFound } from "next/navigation";
import Link from "next/link";
import { config, seoConfig } from "@/site";
import { SITE_AUTHOR } from "@/site/author";
import {
  buildGuideTocH2,
  computeReadingTime,
  getGuideBySlug,
  getGuidePublicPath,
  GuideArticle,
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
  MC_MIN_WAGE_SLUG,
  MC_MIN_WAGE_UPDATED_AT_LABEL,
} from "@/site/salaire-minimum-monaco";
import { McMinWageKeyFigures } from "@/site/salaire-minimum-monaco/McMinWageKeyFigures";

const SLUG = MC_MIN_WAGE_SLUG;

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

export default async function SalaireMinimumMonacoPage() {
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
        <p className="guide-meta">
          Par{" "}
          <Link href={SITE_AUTHOR.path} className="guide-meta__author">
            {SITE_AUTHOR.name}
          </Link>
          <span aria-hidden="true"> · </span>
          <span>{readingTime} min de lecture</span>
          <span aria-hidden="true"> · </span>
          <span>Dernière mise à jour le {MC_MIN_WAGE_UPDATED_AT_LABEL}</span>
        </p>
        <GuideArticle
          slug={guide.slug}
          introduction={guide.introduction}
          introSummary={guide.introSummary}
          quickSummary={guide.quickSummary}
          afterIntroduction={<McMinWageKeyFigures />}
          toc={toc}
          sections={guide.sections}
          faq={guide.faq}
          faqTitle={guide.faqTitle}
          faqIntro={guide.faqIntro}
          faqSectionId={guide.faqSectionId}
          bibliography={guide.bibliography}
          bibliographyPlacement={guide.bibliographyPlacement}
          conclusion={guide.conclusion}
          cover={resolveGuideCover(guide)}
          share={{
            url: getCanonicalUrl(config.url, path),
            title: shareTitle,
            description: guide.description,
          }}
        />
      </GuidePageLayout>
    </>
  );
}
