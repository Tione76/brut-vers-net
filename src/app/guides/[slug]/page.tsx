import { notFound } from "next/navigation";
import Link from "next/link";
import { config, seoConfig } from "@/site";
import {
  buildArticleSchema,
  buildGuideTocH2,
  computeReadingTime,
  getAllGuideSlugs,
  getGuideBySlug,
  GuideArticle,
  GuidePageLayout,
  GuideSidebar,
} from "@/site/guides";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/framework/seo/json-ld";
import { coverToOgInput, resolveGuideCover } from "@/site/guides/covers";
import { formatDate } from "@/framework/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  const cover = guide.isTemplate ? undefined : resolveGuideCover(guide);

  return buildPageMetadata(config, seoConfig, {
    title: guide.isTemplate ? "Modèle officiel de guide" : guide.title,
    description: guide.description,
    path: `/guides/${slug}`,
    ogImage: cover ? coverToOgInput(cover) : undefined,
  });
}

function GuideBreadcrumb({ title, isTemplate }: { title: string; isTemplate?: boolean }) {
  return (
    <nav aria-label="Fil d'Ariane" className="guide-breadcrumb">
      <ol>
        <li>
          <Link href="/">Accueil</Link>
        </li>
        <li aria-hidden="true">›</li>
        {!isTemplate && (
          <>
            <li>
              <span>Guides</span>
            </li>
            <li aria-hidden="true">›</li>
          </>
        )}
        <li>
          <span aria-current="page">{isTemplate ? "Modèle de guide" : title}</span>
        </li>
      </ol>
    </nav>
  );
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const path = `/guides/${slug}`;
  const readingTime = computeReadingTime(guide);
  const toc = buildGuideTocH2(guide);
  const meta = [
    `Mis à jour le ${formatDate(guide.updatedAt)}`,
    `${readingTime} min de lecture`,
  ].join(" · ");

  return (
    <>
      <JsonLd
        data={[
          buildArticleSchema(config, guide, path),
          buildBreadcrumbSchema(config, [
            { name: "Accueil", path: "/" },
            ...(guide.isTemplate
              ? [{ name: "Modèle de guide", path }]
              : [
                  { name: "Guides", path: "/guides" },
                  { name: guide.title, path },
                ]),
          ]),
          buildFaqSchema(guide.faq),
        ]}
      />
      <GuidePageLayout
        title={guide.isTemplate ? "Modèle officiel de guide" : guide.title}
        subtitle={guide.subtitle}
        sidebar={
          <GuideSidebar
            calculator={guide.sidebar.calculator}
            relatedGuides={guide.isTemplate ? undefined : guide.sidebar.relatedGuides}
            relatedSimulator={guide.isTemplate ? undefined : guide.sidebar.relatedSimulator}
            discover={guide.isTemplate ? undefined : guide.sidebar.discover}
          />
        }
      >
        <GuideBreadcrumb title={guide.title} isTemplate={guide.isTemplate} />
        <p className="guide-meta">
          <em>{meta}</em>
        </p>
        {guide.isTemplate && (
          <aside className="prose-callout">
            <strong>Modèle éditorial</strong>
            <p>
              Cette page présente la structure officielle que chaque guide devra respecter.
              Les textes entre crochets sont des placeholders à remplacer par le contenu
              définitif.
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
        />
      </GuidePageLayout>
    </>
  );
}
