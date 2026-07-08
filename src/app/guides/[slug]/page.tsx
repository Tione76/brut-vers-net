import { notFound } from "next/navigation";
import { config, seoConfig } from "@/site";
import {
  buildArticleSchema,
  buildGuideTocH2,
  computeReadingTime,
  getGuideBySlug,
  getPublishedGuideSlugs,
  GUIDE_MODEL_SLUG,
  GuideArticle,
  GuidePageLayout,
  GuidePageSidebar,
} from "@/site/guides";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/framework/seo/json-ld";
import { coverToOgInput, resolveGuideCover } from "@/site/guides/covers";
import { getGuideSeoMetadata } from "@/site/guides/guide-seo-metadata";
import { formatDate } from "@/framework/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

const IS_DEV = process.env.NODE_ENV === "development";

export function generateStaticParams() {
  const slugs = getPublishedGuideSlugs();
  if (IS_DEV) {
    return [...slugs, GUIDE_MODEL_SLUG].map((slug) => ({ slug }));
  }
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  const cover = guide.isTemplate ? undefined : resolveGuideCover(guide);
  const seoMeta = getGuideSeoMetadata(slug);

  return buildPageMetadata(config, seoConfig, {
    title: guide.isTemplate ? "Modèle officiel de guide" : (seoMeta?.title ?? guide.title),
    description: seoMeta?.description ?? guide.description,
    path: `/guides/${slug}`,
    ogImage: cover ? coverToOgInput(cover) : undefined,
    ...(guide.isTemplate && { robots: { index: false, follow: false } }),
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  if (guide.isTemplate && !IS_DEV) {
    notFound();
  }

  const path = `/guides/${slug}`;
  const readingTime = computeReadingTime(guide);
  const toc = buildGuideTocH2(guide);
  const meta = [
    `Mis à jour le ${formatDate(guide.updatedAt)}`,
    `${readingTime} min de lecture`,
  ].join(" · ");

  const breadcrumbItems = guide.isTemplate
    ? [
        { label: "Accueil", href: "/" },
        { label: "Modèle de guide" },
      ]
    : [
        { label: "Accueil", href: "/" },
        { label: "Guides TVA", href: seoConfig.guidesHub.path },
        { label: guide.title },
      ];

  return (
    <>
      <JsonLd
        data={[
          ...(guide.isTemplate ? [] : [buildArticleSchema(config, guide, path)]),
          buildBreadcrumbSchema(config, [
            { name: "Accueil", path: "/" },
            ...(guide.isTemplate
              ? [{ name: "Modèle de guide", path }]
              : [
                  { name: "Guides TVA", path: seoConfig.guidesHub.path },
                  { name: guide.title, path },
                ]),
          ]),
          ...(guide.isTemplate ? [] : [buildFaqSchema(guide.faq)]),
        ]}
      />
      <GuidePageLayout
        title={guide.isTemplate ? "Modèle officiel de guide" : guide.title}
        subtitle={guide.subtitle}
        sidebar={guide.isTemplate ? undefined : <GuidePageSidebar slug={slug} />}
      >
        <PageBreadcrumb items={breadcrumbItems} />
        <p className="guide-meta">
          <em>{meta}</em>
        </p>
        {guide.isTemplate && (
          <aside className="prose-callout">
            <strong>Modèle éditorial</strong>
            <p>
              Cette page présente la structure officielle que chaque guide devra respecter.
              Les textes entre crochets sont des placeholders à remplacer par le contenu
              définitif. Elle n&apos;est accessible qu&apos;en environnement de développement
              et n&apos;est pas indexée par les moteurs de recherche.
            </p>
          </aside>
        )}
        <GuideArticle
          introduction={guide.introduction}
          quickSummary={guide.quickSummary}
          toc={toc}
          sections={guide.sections}
          faq={guide.faq}
          faqTitle={guide.faqTitle}
          conclusion={guide.conclusion}
          isTemplate={guide.isTemplate}
        />
      </GuidePageLayout>
    </>
  );
}
