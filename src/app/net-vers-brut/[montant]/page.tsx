import { notFound } from "next/navigation";
import { config, seoConfig } from "@/site";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata, getCanonicalUrl } from "@/framework/seo/metadata";
import { GuidePageLayout } from "@/site/guides";
import { coverToOgInput, HOME_COVER } from "@/site/guides/covers";
import { isPathIndexable } from "@/site/public-pages";
import { buildWebPageJsonLd } from "@/site/schema";
import {
  NET_TO_GROSS_AMOUNTS,
  NET_TO_GROSS_UPDATED_AT,
  NetToGrossSeriesPageContent,
  NetToGrossPageSidebar,
  netToGrossPath,
  parseNetToGrossMontantParam,
} from "@/site/salaire-net-brut";
import {
  buildSeriesFaqItems,
  buildSeriesSeoMeta,
  seriesBreadcrumbLabel,
} from "@/site/salaire-net-brut/page-1500-content";
import { buildAllProfileEstimates } from "@/site/salaire-net-brut/data";
import "@/site/guides/guide-page.css";

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
    ogImage: coverToOgInput(HOME_COVER),
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

  return (
    <>
      <JsonLd
        data={buildWebPageJsonLd({
          path,
          name: seo.title,
          description: seo.description,
          breadcrumbs: [
            { name: "Accueil", path: "/" },
            { name: seriesBreadcrumbLabel(netMonthly), path },
          ],
          cover: HOME_COVER,
          faq,
          withAuthor: true,
          dateModified: NET_TO_GROSS_UPDATED_AT,
          datePublished: NET_TO_GROSS_UPDATED_AT,
        })}
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
