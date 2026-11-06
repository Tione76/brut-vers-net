import { notFound } from "next/navigation";
import Link from "next/link";
import { config, seoConfig } from "@/site";
import { SITE_AUTHOR } from "@/site/author";
import {
  computeReadingTimeFromText,
  getDraftGuideBySlug,
  getGuidePublicPath,
  GuidePageLayout,
  GuidePageSidebar,
} from "@/site/guides";
import { coverToOgInput, resolveGuideCover } from "@/site/guides/covers";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { ShareBlock } from "@/framework/design/components/ShareBlock";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata, getCanonicalUrl } from "@/framework/seo/metadata";
import {
  BANK_FAQ_ITEMS,
  BANK_GUIDE_DISCLOSURE,
  BANK_GUIDE_INTRO,
  BANK_GUIDE_SLUG,
  BANK_GUIDE_SOURCES_VERIFIED_AT_LABEL,
  BANK_NEED_BLOCKS,
  BANK_OFFERS,
  BankCompareTabs,
  BankMethodSection,
  BankOfferCards,
  buildBanquePetitSalaireJsonLd,
} from "@/site/banque-petit-salaire";

function bankGuideReadingText(): string {
  return [
    ...BANK_GUIDE_INTRO,
    BANK_GUIDE_DISCLOSURE,
    ...BANK_OFFERS.flatMap((offer) => [
      offer.analysisTitle,
      offer.whyInSelection,
      offer.considerIf,
      offer.compareIf,
      offer.freeCondition,
      offer.unusedFeeLabel,
      offer.initialDeposit,
      offer.checkDeposit,
      offer.cashDeposit,
    ]),
    ...BANK_NEED_BLOCKS.flatMap((item) => [item.need, item.answer]),
    ...BANK_FAQ_ITEMS.flatMap((item) => [item.question, item.answer]),
  ].join(" ");
}

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
  const readingTime = computeReadingTimeFromText(bankGuideReadingText());
  const shareTitle = guide.seoTitle ?? guide.title;
  const shareUrl = getCanonicalUrl(config.url, path);

  return (
    <>
      <JsonLd data={buildBanquePetitSalaireJsonLd(guide)} />
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

        <div className="prose">
          {BANK_GUIDE_INTRO.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
          <p className="bp-disclosure">{BANK_GUIDE_DISCLOSURE}</p>

          <BankOfferCards />
          <BankCompareTabs />
          <BankMethodSection />

          <ShareBlock
            url={shareUrl}
            title={shareTitle}
            description={guide.description}
          />
        </div>
      </GuidePageLayout>
    </>
  );
}
