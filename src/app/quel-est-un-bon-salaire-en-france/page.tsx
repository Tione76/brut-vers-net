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

const SLUG = "quel-est-un-bon-salaire-en-france";

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

export default async function QuelEstUnBonSalaireEnFrancePage() {
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
        <GuideAuthorMeta updatedAt={guide.updatedAt} readingTime={readingTime} />
        <GuideArticle
          introduction={guide.introduction}
          introSummary={guide.introSummary}
          quickSummary={guide.quickSummary}
          toc={toc}
          sections={guide.sections}
          faq={guide.faq}
          faqTitle={guide.faqTitle}
          faqIntro={guide.faqIntro}
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
