import { notFound } from "next/navigation";
import Link from "next/link";
import { config, seoConfig } from "@/site";
import { SITE_AUTHOR } from "@/site/author";
import {
  computeReadingTime,
  getDraftGuideBySlug,
  getGuidePublicPath,
  GuideArticle,
  GuidePageLayout,
  GuidePageSidebar,
} from "@/site/guides";
import { coverToOgInput, resolveGuideCover } from "@/site/guides/covers";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata, getCanonicalUrl } from "@/framework/seo/metadata";
import { buildGuideJsonLd } from "@/site/schema";
import {
  BANK_GUIDE_SLUG,
  BANK_GUIDE_SOURCES_VERIFIED_AT_LABEL,
  BankNeedBlocks,
  BankOfferCards,
} from "@/site/banque-petit-salaire";

const SLUG = BANK_GUIDE_SLUG;

/** Brouillon : accessible uniquement en développement local. */
function isDraftPreviewAllowed(): boolean {
  return process.env.NODE_ENV === "development";
}

export async function generateMetadata() {
  if (!isDraftPreviewAllowed()) {
    return {};
  }

  const guide = getDraftGuideBySlug(SLUG);
  if (!guide) return {};

  const path = getGuidePublicPath(guide);
  const cover = resolveGuideCover(guide);

  return buildPageMetadata(config, seoConfig, {
    title: guide.seoTitle ?? guide.title,
    description: guide.description,
    path,
    ogImage: cover ? coverToOgInput(cover) : undefined,
    robots: { index: false, follow: false },
    openGraphType: "article",
  });
}

export default async function BanquePetitSalairePage() {
  if (!isDraftPreviewAllowed()) {
    notFound();
  }

  const guide = getDraftGuideBySlug(SLUG);
  if (!guide) notFound();

  const path = getGuidePublicPath(guide);
  const readingTime = computeReadingTime(guide);
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
          {SITE_AUTHOR.portrait ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="guide-meta__photo"
              src={SITE_AUTHOR.portrait.src}
              alt=""
              width={56}
              height={56}
              decoding="async"
              aria-hidden="true"
            />
          ) : null}
          Par{" "}
          <Link href={SITE_AUTHOR.path} className="guide-meta__author">
            {SITE_AUTHOR.name}
          </Link>
          <span aria-hidden="true"> · </span>
          <span>{readingTime} min de lecture</span>
          <span aria-hidden="true"> · </span>
          <span>Tarifs vérifiés le {BANK_GUIDE_SOURCES_VERIFIED_AT_LABEL}</span>
        </p>
        <GuideArticle
          slug={guide.slug}
          introduction={guide.introduction}
          introSummary={guide.introSummary}
          quickSummary={guide.quickSummary}
          afterIntroduction={<BankOfferCards />}
          sectionSlots={{ "quelle-offre": <BankNeedBlocks /> }}
          toc={[]}
          sections={guide.sections}
          faq={[]}
          conclusion={guide.conclusion}
          cover={undefined}
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
