import { notFound } from "next/navigation";
import { config, seoConfig } from "@/site";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata, getCanonicalUrl } from "@/framework/seo/metadata";
import { GuidePageLayout } from "@/site/guides";
import { GROSS_TO_NET_SERIES_COVER } from "@/site/guides/covers";
import { isPathIndexable } from "@/site/public-pages";
import { buildWebPageJsonLd } from "@/site/schema";
import {
  GROSS_TO_NET_AMOUNTS,
  GROSS_TO_NET_UPDATED_AT,
  GrossToNetPageSidebar,
  GrossToNetSeriesPageContent,
  buildGrossToNetFaqItems,
  buildGrossToNetOgImageInput,
  buildGrossToNetSeoMeta,
  grossToNetBreadcrumbLabel,
  grossToNetPath,
  parseGrossToNetMontantParam,
} from "@/site/salaire-brut-net";
import { buildAllProfileNetEstimates } from "@/site/salaire-brut-net/data";
interface PageProps {
  params: Promise<{ montant: string }>;
}

/**
 * Route interne SSG : /salaire-brut-net/[montant]
 * URL publique SEO (rewrite) : /quel-salaire-net-mensuel-pour-{montant}-euros-brut
 */
export function generateStaticParams() {
  return GROSS_TO_NET_AMOUNTS.map((montant) => ({
    montant: String(montant),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { montant: raw } = await params;
  const grossMonthly = parseGrossToNetMontantParam(raw);
  if (grossMonthly === null) {
    return {};
  }

  const seo = buildGrossToNetSeoMeta(grossMonthly);
  const path = grossToNetPath(grossMonthly);

  return buildPageMetadata(config, seoConfig, {
    title: seo.title,
    description: seo.description,
    path,
    ogImage: buildGrossToNetOgImageInput(grossMonthly),
    openGraphType: "article",
    robots: isPathIndexable(path) ? undefined : { index: false, follow: false },
  });
}

export default async function GrossToNetAmountPage({ params }: PageProps) {
  const { montant: raw } = await params;
  const grossMonthly = parseGrossToNetMontantParam(raw);

  if (grossMonthly === null) {
    notFound();
  }

  const seo = buildGrossToNetSeoMeta(grossMonthly);
  const path = grossToNetPath(grossMonthly);
  const estimates = buildAllProfileNetEstimates(grossMonthly);
  const faq = buildGrossToNetFaqItems(grossMonthly, estimates);

  return (
    <>
      <JsonLd
        data={buildWebPageJsonLd({
          path,
          name: seo.title,
          description: seo.description,
          breadcrumbs: [
            { name: "Accueil", path: "/" },
            {
              name: "Tous les salaires bruts mensuels convertis en net",
              path: "/salaire-brut-mensuel-en-net",
            },
            { name: grossToNetBreadcrumbLabel(grossMonthly), path },
          ],
          cover: GROSS_TO_NET_SERIES_COVER,
          faq,
          withAuthor: true,
          dateModified: GROSS_TO_NET_UPDATED_AT,
          datePublished: GROSS_TO_NET_UPDATED_AT,
        })}
      />
      <GuidePageLayout
        title={seo.h1}
        subtitle={seo.subtitle}
        prose={false}
        sidebar={<GrossToNetPageSidebar grossMonthly={grossMonthly} />}
      >
        <GrossToNetSeriesPageContent
          grossMonthly={grossMonthly}
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
