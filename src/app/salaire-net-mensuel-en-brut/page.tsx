import { config, seoConfig } from "@/site";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { GuidePageLayout } from "@/site/guides";
import { isPathIndexable } from "@/site/public-pages";
import {
  NetToGrossHubPageContent,
  NetToGrossPageSidebar,
  buildNetToGrossHubOgImageInput,
  buildNetToGrossHubPayload,
} from "@/site/salaire-net-brut";
const hub = buildNetToGrossHubPayload();

export const metadata = buildPageMetadata(config, seoConfig, {
  title: hub.seo.title,
  description: hub.seo.description,
  path: hub.path,
  ogImage: buildNetToGrossHubOgImageInput(),
  openGraphType: "article",
  robots: isPathIndexable(hub.path) ? undefined : { index: false, follow: false },
});

export default function NetToGrossHubRoutePage() {
  return (
    <>
      <JsonLd data={hub.jsonLd} />
      <GuidePageLayout
        title={hub.seo.h1}
        subtitle={hub.seo.subtitle}
        prose={false}
        sidebar={<NetToGrossPageSidebar netMonthly={1500} />}
      >
        <NetToGrossHubPageContent />
      </GuidePageLayout>
    </>
  );
}
