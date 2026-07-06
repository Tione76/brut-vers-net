import { config, seoConfig, Calculator } from "@/site";
import { coverToOgInput, HOME_COVER } from "@/site/guides/covers";
import { CalculatorPageLayout } from "@/framework/layouts/CalculatorPageLayout";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildOrganizationSchema,
  buildWebApplicationSchema,
} from "@/framework/seo/json-ld";

export const metadata = buildPageMetadata(config, seoConfig, {
  title: seoConfig.home.title,
  description: seoConfig.home.description,
  path: "/",
  ogImage: coverToOgInput(HOME_COVER),
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          buildWebApplicationSchema(config, seoConfig.home.title, seoConfig.home.description, {
            dateModified: "2026-07-01",
          }),
          buildOrganizationSchema(config),
          buildBreadcrumbSchema(config, [{ name: "Accueil", path: "/" }]),
          buildFaqSchema(config.faq),
        ]}
      />
      <CalculatorPageLayout Calculator={Calculator} />
    </>
  );
}
