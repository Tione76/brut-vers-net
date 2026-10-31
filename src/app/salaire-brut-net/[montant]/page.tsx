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
  GrossToNet1000PageContent,
  GrossToNet1000PageSidebar,
  GROSS_TO_NET_REDESIGN_DATE_MODIFIED,
  buildGrossToNetOgImageInput,
  buildPage1000FaqItems,
  grossToNetBreadcrumbLabel,
  grossToNetPath,
  parseGrossToNetMontantParam,
  resolveGrossToNetSeoMeta,
} from "@/site/salaire-brut-net";

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

  const seo = resolveGrossToNetSeoMeta(grossMonthly);
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

  const seo = resolveGrossToNetSeoMeta(grossMonthly);
  const path = grossToNetPath(grossMonthly);
  const faq = buildPage1000FaqItems(grossMonthly);

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
          dateModified: GROSS_TO_NET_REDESIGN_DATE_MODIFIED,
          datePublished: GROSS_TO_NET_UPDATED_AT,
        })}
      />
      <GuidePageLayout
        title={seo.h1}
        subtitle={seo.subtitle}
        prose={false}
        sidebar={<GrossToNet1000PageSidebar grossMonthly={grossMonthly} />}
      >
        <GrossToNet1000PageContent
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
