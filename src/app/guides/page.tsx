import { config, seoConfig } from "@/site";
import { GuidesHubSidebar, GuidePageLayout } from "@/site/guides";
import { coverToOgInput, coverToSchemaImage, GUIDES_HUB_COVER } from "@/site/guides/covers";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { buildBreadcrumbSchema, buildCollectionPageSchema } from "@/framework/seo/json-ld";
import "@/site/guides/guide-page.css";

const hub = seoConfig.guidesHub;
const NOINDEX = { index: false, follow: false } as const;

export const metadata = buildPageMetadata(config, seoConfig, {
  title: hub.title,
  description: hub.description,
  path: hub.path,
  ogImage: coverToOgInput(GUIDES_HUB_COVER),
  robots: NOINDEX,
});

export default function GuidesHubPage() {
  return (
    <>
      <JsonLd
        data={[
          buildCollectionPageSchema(
            config,
            hub.title,
            hub.description,
            hub.path,
            coverToSchemaImage(GUIDES_HUB_COVER),
          ),
          buildBreadcrumbSchema(config, [
            { name: "Accueil", path: "/" },
            { name: hub.h1, path: hub.path },
          ]),
        ]}
      />
      <GuidePageLayout title={hub.h1} subtitle={hub.subtitle} sidebar={<GuidesHubSidebar />}>
        <PageBreadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Guides" },
          ]}
        />
        <div className="prose">
          <p>Contenu en cours de rédaction.</p>
        </div>
      </GuidePageLayout>
    </>
  );
}
