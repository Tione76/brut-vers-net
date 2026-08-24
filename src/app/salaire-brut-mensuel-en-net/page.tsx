import { config, seoConfig } from "@/site";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { GuidePageLayout } from "@/site/guides";
import { coverToOgInput, HOME_COVER } from "@/site/guides/covers";
import { isPathIndexable } from "@/site/public-pages";
import {
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
        <GrossToNetHubPageContent />
      </GuidePageLayout>
    </>
  );
}
