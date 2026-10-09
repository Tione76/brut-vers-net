import { notFound } from "next/navigation";
import { config, seoConfig } from "@/site";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata, getCanonicalUrl } from "@/framework/seo/metadata";
import { GuidePageLayout } from "@/site/guides";
import { NET_TO_GROSS_SERIES_COVER } from "@/site/guides/covers";
import { isPathIndexable } from "@/site/public-pages";
import { buildWebPageJsonLd } from "@/site/schema";
import {
  NET_TO_GROSS_AMOUNTS,
  NET_TO_GROSS_HUB_BREADCRUMB_LABEL,
  NET_TO_GROSS_HUB_PATH,
  NET_TO_GROSS_UPDATED_AT,
  NetToGrossSeriesPageContent,
  NetToGrossPageSidebar,
  buildNetToGrossOgImageInput,
  netToGrossPath,
  parseNetToGrossMontantParam,
} from "@/site/salaire-net-brut";
import {
  buildSeriesFaqItems,
  buildSeriesSeoMeta,
  seriesBreadcrumbLabel,
} from "@/site/salaire-net-brut/page-1500-content";
import { buildAllProfileEstimates } from "@/site/salaire-net-brut/data";
import {
  PAGE_1650_DATE_MODIFIED,
  PAGE_1650_DATE_PUBLISHED,
  build1650PageJsonLd,
  isNetToGross1650Prototype,
  netToGrossOpenGraphType,
} from "@/site/salaire-net-brut/page-1650";
interface PageProps {
  params: Promise<{ montant: string }>;
}

/**
 * Route interne SSG : /net-vers-brut/[montant]
 * URL publique SEO (rewrite) : /combien-gagner-brut-mensuel-pour-{montant}-net
 */
export function generateStaticParams() {
  return NET_TO_GROSS_AMOUNTS.map((montant) => ({
    montant: String(montant),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { montant: raw } = await params;
  const netMonthly = parseNetToGrossMontantParam(raw);
  if (netMonthly === null) {
    return {};
  }

  const seo = buildSeriesSeoMeta(netMonthly);
  const path = netToGrossPath(netMonthly);

  return buildPageMetadata(config, seoConfig, {
    title: seo.title,
    description: seo.description,
    path,
    ogImage: buildNetToGrossOgImageInput(netMonthly),
    openGraphType: netToGrossOpenGraphType(netMonthly),
    robots: isPathIndexable(path) ? undefined : { index: false, follow: false },
  });
}

export default async function NetToGrossAmountPage({ params }: PageProps) {
  const { montant: raw } = await params;
  const netMonthly = parseNetToGrossMontantParam(raw);

  if (netMonthly === null) {
    notFound();
  }

  const seo = buildSeriesSeoMeta(netMonthly);
  const path = netToGrossPath(netMonthly);
  const estimates = buildAllProfileEstimates(netMonthly);
  const faq = buildSeriesFaqItems(netMonthly, estimates);
  const jsonLdInput = {
    path,
    name: seo.title,
    description: seo.description,
    breadcrumbs: [
      { name: "Accueil", path: "/" },
      {
        name: NET_TO_GROSS_HUB_BREADCRUMB_LABEL,
        path: NET_TO_GROSS_HUB_PATH,
      },
      { name: seriesBreadcrumbLabel(netMonthly), path },
    ],
    cover: NET_TO_GROSS_SERIES_COVER,
    faq,
    withAuthor: true,
    dateModified: isNetToGross1650Prototype(netMonthly)
      ? PAGE_1650_DATE_MODIFIED
      : NET_TO_GROSS_UPDATED_AT,
    datePublished: isNetToGross1650Prototype(netMonthly)
      ? PAGE_1650_DATE_PUBLISHED
      : NET_TO_GROSS_UPDATED_AT,
  };

  return (
    <>
      <JsonLd
        data={
          isNetToGross1650Prototype(netMonthly)
            ? build1650PageJsonLd(jsonLdInput)
            : buildWebPageJsonLd(jsonLdInput)
        }
      />
      <GuidePageLayout
        title={seo.h1}
        subtitle="Réponse immédiate selon votre statut, avant prélèvement à la source."
        prose={false}
        sidebar={<NetToGrossPageSidebar netMonthly={netMonthly} />}
      >
        <NetToGrossSeriesPageContent
          netMonthly={netMonthly}
          share={{
            url: getCanonicalUrl(config.url, path),
            title: seo.title,
            description: seo.description,
          }}
        />
      </GuidePageLayout>
    </>
  );
}
