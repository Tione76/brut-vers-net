import { config, seoConfig } from "@/site";
import { JsonLd } from "@/framework/JsonLd";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { GuideAuthorMeta, GuidePageLayout } from "@/site/guides";
import { coverToOgInput, HOME_COVER } from "@/site/guides/covers";
import { isPathIndexable } from "@/site/public-pages";
import {
  GROSS_TO_NET_UPDATED_AT,
  GrossToNetIndexPageContent,
  GrossToNetPageSidebar,
  buildGrossToNetIndexPayload,
} from "@/site/salaire-brut-net";
const page = buildGrossToNetIndexPayload();

export const metadata = buildPageMetadata(config, seoConfig, {
  title: page.seo.title,
  description: page.seo.description,
  path: page.path,
  ogImage: coverToOgInput(HOME_COVER),
  openGraphType: "article",
  robots: isPathIndexable(page.path) ? undefined : { index: false, follow: false },
});

export default function GrossToNetIndexRoutePage() {
  return (
    <>
      <JsonLd data={page.jsonLd} />
      <GuidePageLayout
        title={page.seo.h1}
        subtitle={page.seo.subtitle}
        prose={false}
        sidebar={<GrossToNetPageSidebar grossMonthly={1000} />}
      >
        <PageBreadcrumb
          items={[
            { label: "Accueil", href: "/" },
            {
              label: "Tous les salaires bruts mensuels convertis en net",
              href: page.hubPath,
            },
            { label: "Tableau" },
          ]}
        />
        <GuideAuthorMeta updatedAt={GROSS_TO_NET_UPDATED_AT} />
        <GrossToNetIndexPageContent />
      </GuidePageLayout>
    </>
  );
}
