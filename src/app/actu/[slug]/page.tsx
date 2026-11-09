import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { config, seoConfig } from "@/site";
import {
  ACTU_HUB_PATH,
  ACTU_NAV_LABEL,
  ACTU_RSS_PATH,
  ActuAuthorMeta,
  getActuPublicPath,
  getPublishedActuArticleBySlug,
  getPublishedActuSlugs,
} from "@/site/actu";
import { HausseSmicDecembre2026Body } from "@/site/actu/content/hausse-smic-decembre-2026";
import "@/site/actu/actu.css";
import {
  ActuPageSidebar,
  CoverFigure,
  GuideMastheadShare,
  GuidePageLayout,
} from "@/site/guides";
import { coverToOgInput } from "@/site/guides/covers";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata, getCanonicalUrl } from "@/framework/seo/metadata";
import { buildActuArticleJsonLd } from "@/site/schema";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const ARTICLE_BODIES: Record<string, () => ReactNode> = {
  "hausse-smic-decembre-2026": () => <HausseSmicDecembre2026Body />,
};

export function generateStaticParams() {
  return getPublishedActuSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getPublishedActuArticleBySlug(slug);
  if (!article) return {};

  const path = getActuPublicPath(article);
  const base = buildPageMetadata(config, seoConfig, {
    title: article.seoTitle ?? article.title,
    description: article.description,
    path,
    ogImage: coverToOgInput(article.cover),
    openGraphType: "article",
    robots: {
      index: true,
      follow: true,
    },
  });

  return {
    ...base,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      ...base.alternates,
      types: {
        "application/rss+xml": getCanonicalUrl(config.url, ACTU_RSS_PATH),
      },
    },
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.modifiedAt,
      section: article.category,
      authors: [article.authorName],
      locale: config.locale.replace("-", "_"),
    },
  };
}

export default async function ActuArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getPublishedActuArticleBySlug(slug);
  if (!article) notFound();

  const path = getActuPublicPath(article);
  const Body = ARTICLE_BODIES[slug];
  if (!Body) notFound();

  const shareUrl = getCanonicalUrl(config.url, path);

  return (
    <>
      <JsonLd data={buildActuArticleJsonLd(article)} />
      <GuidePageLayout
        title={article.title}
        subtitle={article.subtitle}
        sidebar={<ActuPageSidebar currentPath={path} />}
      >
        <PageBreadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: ACTU_NAV_LABEL, href: ACTU_HUB_PATH },
            { label: article.shortTitle },
          ]}
        />
        <ActuAuthorMeta
          publishedAt={article.publishedAt}
          modifiedAt={article.modifiedAt}
          readingTimeMinutes={article.readingTimeMinutes}
        />
        <GuideMastheadShare
          url={shareUrl}
          title={article.seoTitle ?? article.title}
          description={article.description}
        />
        <CoverFigure cover={article.cover} priority />
        <Body />
      </GuidePageLayout>
    </>
  );
}
