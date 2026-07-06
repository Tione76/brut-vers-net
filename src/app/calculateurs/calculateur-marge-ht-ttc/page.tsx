import { config, seoConfig } from "@/site";
import MarginCalculator from "@/site/margin-calculator";
import { MarginCalculatorEditorial } from "@/site/margin-calculator-editorial";
import { coverToOgInput, MARGIN_CALCULATOR_COVER } from "@/site/guides/covers";
import { ToolPageSidebar } from "@/site/guides/GuidePageSidebar";
import { ToolCalculatorPageLayout } from "@/framework/layouts/ToolCalculatorPageLayout";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebApplicationSchema } from "@/framework/seo/json-ld";
import { marginCalculatorFaq } from "@/site/margin-calculator-faq-data";

const page = seoConfig.calculators.marginHtTtc;

export const metadata = buildPageMetadata(config, seoConfig, {
  title: page.title,
  description: page.description,
  path: page.path,
  ogImage: coverToOgInput(MARGIN_CALCULATOR_COVER),
});

export default function MarginCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          buildWebApplicationSchema(config, page.title, page.description, {
            dateModified: "2026-07-01",
          }),
          buildBreadcrumbSchema(config, [
            { name: "Accueil", path: "/" },
            { name: page.h1, path: page.path },
          ]),
          buildFaqSchema(marginCalculatorFaq),
        ]}
      />
      <ToolCalculatorPageLayout
        h1={page.h1}
        Calculator={MarginCalculator}
        editorial={<MarginCalculatorEditorial />}
        sidebar={<ToolPageSidebar currentPath={page.path} />}
        variant="margin"
      />
    </>
  );
}
