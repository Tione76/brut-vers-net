import { config, seoConfig } from "@/site";
import { JsonLd } from "@/framework/JsonLd";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { GuideAuthorMeta, GuidePageLayout } from "@/site/guides";
import { isPathIndexable } from "@/site/public-pages";
import {
  NET_TO_GROSS_HUB_BREADCRUMB_LABEL,
  NET_TO_GROSS_UPDATED_AT,
  NetToGrossIndexPageContent,
  NetToGrossPageSidebar,
  buildNetToGrossIndexOgImageInput,
  buildNetToGrossIndexPayload,
} from "@/site/salaire-net-brut";
const page = buildNetToGrossIndexPayload();

export const metadata = buildPageMetadata(config, seoConfig, {
  title: page.seo.title,
  description: page.seo.description,
  path: page.path,
  ogImage: buildNetToGrossIndexOgImageInput(),
  openGraphType: "article",
  robots: isPathIndexable(page.path) ? undefined : { index: false, follow: false },
});

export default function NetToGrossIndexRoutePage() {
  return (
    <>
      <JsonLd data={page.jsonLd} />
      <GuidePageLayout
        title={page.seo.h1}
        subtitle={page.seo.subtitle}
        prose={false}
        sidebar={<NetToGrossPageSidebar netMonthly={1500} />}
      >
        <PageBreadcrumb
          items={[
            { label: "Accueil", href: "/" },
            {
              label: NET_TO_GROSS_HUB_BREADCRUMB_LABEL,
              href: page.hubPath,
            },
            { label: "Tableau" },
          ]}
        />
        <GuideAuthorMeta updatedAt={NET_TO_GROSS_UPDATED_AT} />
        <NetToGrossIndexPageContent />
      </GuidePageLayout>
    </>
  );
}
