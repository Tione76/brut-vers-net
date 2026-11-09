import { config, seoConfig } from "@/site";
import { JsonLd } from "@/framework/JsonLd";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { GuideAuthorMeta, GuidePageLayout } from "@/site/guides";
import { coverToOgInput, HOME_COVER } from "@/site/guides/covers";
import { isPathIndexable } from "@/site/public-pages";
import {
  GROSS_TO_NET_UPDATED_AT,
  GrossToNetHubPageContent,
  GrossToNetPageSidebar,
  buildGrossToNetHubPayload,
} from "@/site/salaire-brut-net";
const hub = buildGrossToNetHubPayload();

export const metadata = buildPageMetadata(config, seoConfig, {
  title: hub.seo.title,
  description: hub.seo.description,
  path: hub.path,
  ogImage: coverToOgInput(HOME_COVER),
  openGraphType: "article",
  robots: isPathIndexable(hub.path) ? undefined : { index: false, follow: false },
});

export default function GrossToNetHubRoutePage() {
  return (
    <>
      <JsonLd data={hub.jsonLd} />
      <GuidePageLayout
        title={hub.seo.h1}
        subtitle={hub.seo.subtitle}
        prose={false}
        sidebar={<GrossToNetPageSidebar grossMonthly={1000} />}
      >
        <PageBreadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Tous les salaires bruts mensuels convertis en net" },
          ]}
        />
        <GuideAuthorMeta updatedAt={GROSS_TO_NET_UPDATED_AT} />
        <GrossToNetHubPageContent />
      </GuidePageLayout>
    </>
  );
}
