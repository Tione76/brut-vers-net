import { config, seoConfig } from "@/site";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { GuidePageLayout } from "@/site/guides";
import { coverToOgInput, HOME_COVER } from "@/site/guides/covers";
import { isPathIndexable } from "@/site/public-pages";
import {
  GrossToNetIndexPageContent,
  GrossToNetPageSidebar,
  buildGrossToNetIndexPayload,
} from "@/site/salaire-brut-net";
import "@/site/guides/guide-page.css";

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
        <GrossToNetIndexPageContent />
      </GuidePageLayout>
    </>
  );
}
