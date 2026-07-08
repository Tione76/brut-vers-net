import { config, seoConfig } from "@/site";
import { getAllCalculators } from "@/site/navigation/calculators-registry";
import { GuidePageLayout, ToolsHubSidebar } from "@/site/guides";
import { coverToOgInput, coverToSchemaImage, TOOLS_HUB_COVER } from "@/site/guides/covers";
import { ToolListCard } from "@/site/tools/ToolListCard";
import { ToolsHubEditorial } from "@/site/tools/tools-hub-editorial";
import { ToolsHubPicker } from "@/site/tools/tools-hub-picker";
import { ToolsHubReassurance } from "@/site/tools/tools-hub-reassurance";
import { TOOL_HUB_FAQ } from "@/site/tools/tools-hub-data";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildFaqSchema,
} from "@/framework/seo/json-ld";
import "@/site/guides/guide-page.css";
import "@/site/tools/tools-hub.css";

const hub = seoConfig.toolsHub;

export const metadata = buildPageMetadata(config, seoConfig, {
  title: hub.title,
  description: hub.description,
  path: hub.path,
  ogImage: coverToOgInput(TOOLS_HUB_COVER),
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
          buildFaqSchema(
            TOOL_HUB_FAQ.map((item) => ({
              question: item.question,
              answer: item.answer,
            })),
          ),
        ]}
      />
      <GuidePageLayout
        title={hub.h1}
        subtitle={hub.subtitle}
        sidebar={<ToolsHubSidebar />}
      >
        <PageBreadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Nos outils" },
          ]}
        />

        <section className="tools-hub-hero" aria-labelledby="tools-hub-hero-title">
          <h2 id="tools-hub-hero-title" className="tools-hub-hero__title">
            Les calculateurs disponibles
          </h2>
          <p className="tools-hub-hero__intro">
            Choisissez l&apos;outil adapté à votre besoin et lancez votre calcul en un clic.
          </p>
          <div className="tool-list-grid">
            {calculators.map((tool) => (
              <ToolListCard key={tool.id} tool={tool} />
            ))}
          </div>
          <ToolsHubReassurance />
        </section>

        <ToolsHubPicker />
        <ToolsHubEditorial />
      </GuidePageLayout>
    </>
  );
}
