import { config, seoConfig } from "@/site";
import {
  guides,
  GuidesHubSidebar,
  GuideListCard,
  GuidePageLayout,
} from "@/site/guides";
import { coverToOgInput, coverToSchemaImage, GUIDES_HUB_COVER } from "@/site/guides/covers";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { buildBreadcrumbSchema, buildCollectionPageSchema } from "@/framework/seo/json-ld";
import { isPathIndexable } from "@/site/public-pages";
import "@/site/guides/guide-page.css";

const hub = seoConfig.guidesHub;
const path = hub.path;
const indexable = isPathIndexable(path);

export const metadata = buildPageMetadata(config, seoConfig, {
  title: hub.title,
  description: hub.description,
  path,
  ogImage: coverToOgInput(GUIDES_HUB_COVER),
  robots: indexable ? undefined : { index: false, follow: false },
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
            path,
            coverToSchemaImage(GUIDES_HUB_COVER),
          ),
          buildBreadcrumbSchema(config, [
            { name: "Accueil", path: "/" },
            { name: hub.h1, path },
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
          <p>
            Nos guides vous aident à comprendre le salaire brut, le salaire net, les cotisations
            salariales et le calcul brut vers net. Chaque article est rédigé pour être lu facilement,
            même sans connaissance préalable de la paie.
          </p>
        </div>
        {guides.length > 0 && (
          <div className="guide-list-grid">
            {guides.map((guide) => (
              <GuideListCard key={guide.slug} guide={guide} />
            ))}
          </div>
        )}
      </GuidePageLayout>
    </>
  );
}
