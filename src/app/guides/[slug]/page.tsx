import { notFound } from "next/navigation";
import { config, seoConfig } from "@/site";
import {
  buildArticleSchema,
  buildGuideTocH2,
  computeReadingTime,
  getAllGuideSlugs,
  getGuideBySlug,
  GuideArticle,
  GuidePageLayout,
  GuidePageSidebar,
  resolveGuideCover,
} from "@/site/guides";
import { coverToOgInput } from "@/site/guides/covers";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/framework/seo/json-ld";
import { isPathIndexable } from "@/site/public-pages";
import "@/site/guides/guide-page.css";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  const path = `/guides/${slug}`;
  const cover = resolveGuideCover(guide);
  const indexable = isPathIndexable(path);

  return buildPageMetadata(config, seoConfig, {
    title: guide.seoTitle ?? guide.title,
    description: guide.description,
    path,
    ogImage: cover ? coverToOgInput(cover) : undefined,
    robots: indexable ? undefined : { index: false, follow: false },
  });
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const path = `/guides/${slug}`;
  const readingTime = computeReadingTime(guide);
  const toc = buildGuideTocH2(guide);

  return (
    <>
      <JsonLd
        data={[
          buildArticleSchema(config, guide, path),
          buildBreadcrumbSchema(config, [
            { name: "Accueil", path: "/" },
            { name: seoConfig.guidesHub.h1, path: seoConfig.guidesHub.path },
            { name: guide.title, path },
          ]),
          ...(guide.faq.length > 0 ? [buildFaqSchema(guide.faq)] : []),
        ]}
      />
      <GuidePageLayout
        title={guide.title}
        subtitle={guide.subtitle}
        sidebar={<GuidePageSidebar slug={slug} />}
      >
        <PageBreadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Guides", href: seoConfig.guidesHub.path },
            { label: guide.title },
          ]}
        />
        <p className="guide-meta">
          {readingTime} min de lecture · Mis à jour le{" "}
          {new Date(guide.updatedAt).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
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
        />
      </GuidePageLayout>
    </>
  );
}
