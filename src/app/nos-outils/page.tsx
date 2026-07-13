import { config, seoConfig } from "@/site";
import { getAllCalculators } from "@/site/navigation/calculators-registry";
import { GuidePageLayout } from "@/site/guides";
import { coverToOgInput, coverToSchemaImage, TOOLS_HUB_COVER } from "@/site/guides/covers";
import { ToolListCard } from "@/site/tools/ToolListCard";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { buildBreadcrumbSchema, buildCollectionPageSchema } from "@/framework/seo/json-ld";
import "@/site/guides/guide-page.css";
import "@/site/tools/tools-hub.css";

const hub = seoConfig.toolsHub;
const NOINDEX = { index: false, follow: false } as const;

export const metadata = buildPageMetadata(config, seoConfig, {
  title: hub.title,
  description: hub.description,
  path: hub.path,
  ogImage: coverToOgInput(TOOLS_HUB_COVER),
  robots: NOINDEX,
});

export default function ToolsHubPage() {
  const calculators = getAllCalculators();

  return (
    <>
      <JsonLd
        data={[
          buildCollectionPageSchema(
            config,
            hub.title,
            hub.description,
            hub.path,
            coverToSchemaImage(TOOLS_HUB_COVER),
          ),
          buildBreadcrumbSchema(config, [
            { name: "Accueil", path: "/" },
            { name: hub.h1, path: hub.path },
          ]),
        ]}
      />
      <GuidePageLayout title={hub.h1} subtitle={hub.subtitle}>
        <PageBreadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Outils" },
          ]}
        />
        <section className="tools-hub-hero" aria-labelledby="tools-hub-hero-title">
          <h2 id="tools-hub-hero-title" className="tools-hub-hero__title">
            Les outils disponibles
          </h2>
          <p className="tools-hub-hero__intro">Contenu en cours de rédaction.</p>
          <div className="tool-list-grid">
            {calculators.map((tool) => (
              <ToolListCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      </GuidePageLayout>
    </>
  );
}
