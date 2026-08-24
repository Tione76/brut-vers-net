import { config, seoConfig } from "@/site";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { GuidePageLayout } from "@/site/guides";
import { isPathIndexable } from "@/site/public-pages";
import {
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
        <NetToGrossIndexPageContent />
      </GuidePageLayout>
    </>
  );
}
