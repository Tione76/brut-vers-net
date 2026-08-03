import { notFound } from "next/navigation";
import { config, seoConfig } from "@/site";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata, getCanonicalUrl } from "@/framework/seo/metadata";
import { GuidePageLayout } from "@/site/guides";
import { coverToOgInput, getCalculatorCover } from "@/site/guides/covers";
import { isPathIndexable } from "@/site/public-pages";
import { buildWebPageJsonLd } from "@/site/schema";
import {
  GROSS_PRIME_AMOUNTS,
  GROSS_PRIME_UPDATED_AT,
  GrossPrimePageSidebar,
  GrossPrimeSeriesPageContent,
  buildGrossPrimeFaqItems,
  buildGrossPrimeSeoMeta,
  grossPrimeBreadcrumbLabel,
  grossPrimePath,
  parseGrossPrimeMontantParam,
} from "@/site/prime-brute-net";
import { buildAllProfilePrimeEstimates } from "@/site/prime-brute-net/data";
import "@/site/guides/guide-page.css";

interface PageProps {
  params: Promise<{ montant: string }>;
}

/**
 * Route interne SSG : /prime-brute-net/[montant]
 * URL publique SEO (rewrite) : /prime-brute-{montant}-euros-en-net
 */
export function generateStaticParams() {
  return GROSS_PRIME_AMOUNTS.map((montant) => ({
    montant: String(montant),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { montant: raw } = await params;
  const grossPrime = parseGrossPrimeMontantParam(raw);
  if (grossPrime === null) {
    return {};
  }

  const seo = buildGrossPrimeSeoMeta(grossPrime);
  const path = grossPrimePath(grossPrime);
  const cover = getCalculatorCover("augmentation-salaire");

  return buildPageMetadata(config, seoConfig, {
    title: seo.title,
    description: seo.description,
    path,
    ogImage: coverToOgInput(cover),
    openGraphType: "article",
    robots: isPathIndexable(path) ? undefined : { index: false, follow: false },
  });
}

export default async function GrossPrimeAmountPage({ params }: PageProps) {
  const { montant: raw } = await params;
  const grossPrime = parseGrossPrimeMontantParam(raw);

  if (grossPrime === null) {
    notFound();
  }

  const seo = buildGrossPrimeSeoMeta(grossPrime);
  const path = grossPrimePath(grossPrime);
  const estimates = buildAllProfilePrimeEstimates(grossPrime);
  const faq = buildGrossPrimeFaqItems(grossPrime, estimates);
  const cover = getCalculatorCover("augmentation-salaire");

  return (
    <>
      <JsonLd
        data={buildWebPageJsonLd({
          path,
          name: seo.title,
          description: seo.description,
          breadcrumbs: [
            { name: "Accueil", path: "/" },
            { name: grossPrimeBreadcrumbLabel(grossPrime), path },
          ],
          cover,
          faq,
          withAuthor: true,
          dateModified: GROSS_PRIME_UPDATED_AT,
          datePublished: GROSS_PRIME_UPDATED_AT,
        })}
      />
      <GuidePageLayout
        title={seo.h1}
        subtitle={seo.subtitle}
        prose={false}
        sidebar={<GrossPrimePageSidebar grossPrime={grossPrime} />}
      >
        <GrossPrimeSeriesPageContent
          grossPrime={grossPrime}
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
