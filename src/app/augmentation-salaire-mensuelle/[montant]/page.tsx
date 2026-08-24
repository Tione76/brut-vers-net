import { notFound } from "next/navigation";
import { config, seoConfig } from "@/site";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata, getCanonicalUrl } from "@/framework/seo/metadata";
import { GuidePageLayout } from "@/site/guides";
import { coverToOgInput, getCalculatorCover } from "@/site/guides/covers";
import { isPathIndexable } from "@/site/public-pages";
import { buildWebPageJsonLd } from "@/site/schema";
import {
  MONTHLY_INCREASE_AMOUNTS,
  MONTHLY_INCREASE_UPDATED_AT,
  MonthlyIncreasePageSidebar,
  MonthlyIncreaseSeriesPageContent,
  buildMonthlyIncreaseFaqItems,
  buildMonthlyIncreaseSeoMeta,
  monthlyIncreaseBreadcrumbLabel,
  monthlyIncreasePath,
  parseMonthlyIncreaseMontantParam,
} from "@/site/augmentation-salaire-mensuelle";
import { buildAllProfileIncreaseEstimates } from "@/site/augmentation-salaire-mensuelle/data";
interface PageProps {
  params: Promise<{ montant: string }>;
}

/**
 * Route interne SSG : /augmentation-salaire-mensuelle/[montant]
 * URL publique SEO (rewrite) : /augmentation-salaire-mensuelle-{montant}-euros-brut
 */
export function generateStaticParams() {
  return MONTHLY_INCREASE_AMOUNTS.map((montant) => ({
    montant: String(montant),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { montant: raw } = await params;
  const grossMonthlyIncrease = parseMonthlyIncreaseMontantParam(raw);
  if (grossMonthlyIncrease === null) {
    return {};
  }

  const seo = buildMonthlyIncreaseSeoMeta(grossMonthlyIncrease);
  const path = monthlyIncreasePath(grossMonthlyIncrease);
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

export default async function MonthlyIncreaseAmountPage({ params }: PageProps) {
  const { montant: raw } = await params;
  const grossMonthlyIncrease = parseMonthlyIncreaseMontantParam(raw);

  if (grossMonthlyIncrease === null) {
    notFound();
  }

  const seo = buildMonthlyIncreaseSeoMeta(grossMonthlyIncrease);
  const path = monthlyIncreasePath(grossMonthlyIncrease);
  const estimates = buildAllProfileIncreaseEstimates(grossMonthlyIncrease);
  const faq = buildMonthlyIncreaseFaqItems(grossMonthlyIncrease, estimates);
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
            { name: monthlyIncreaseBreadcrumbLabel(grossMonthlyIncrease), path },
          ],
          cover,
          faq,
          withAuthor: true,
          dateModified: MONTHLY_INCREASE_UPDATED_AT,
          datePublished: MONTHLY_INCREASE_UPDATED_AT,
        })}
      />
      <GuidePageLayout
        title={seo.h1}
        subtitle="Réponse immédiate selon votre statut, avant prélèvement à la source."
        prose={false}
        sidebar={<MonthlyIncreasePageSidebar grossMonthlyIncrease={grossMonthlyIncrease} />}
      >
        <MonthlyIncreaseSeriesPageContent
          grossMonthlyIncrease={grossMonthlyIncrease}
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
