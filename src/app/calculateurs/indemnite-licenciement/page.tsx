import { config, seoConfig } from "@/site";
import { coverToOgInput, coverToSchemaImage, getCalculatorCover } from "@/site/guides/covers";
import { DismissalCompensationPageSidebar } from "@/site/dismissal-compensation-calculator/dismissal-sidebar";
import { ToolCalculatorPageLayout } from "@/framework/layouts/ToolCalculatorPageLayout";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildWebApplicationSchema,
} from "@/framework/seo/json-ld";
import { isPathIndexable } from "@/site/public-pages";
import {
  DISMISSAL_DISCLAIMER,
  DISMISSAL_PATH,
} from "@/site/dismissal-compensation-calculator/config";
import DismissalCompensationCalculator from "@/site/dismissal-compensation-calculator/DismissalCompensationCalculator";
import {
  DismissalCompensationEditorial,
  dismissalFaq,
} from "@/site/dismissal-compensation-calculator/DismissalCompensationEditorial";
import { DISMISSAL_EDITORIAL_UPDATED_AT } from "@/site/dismissal-compensation-calculator/dismissal-editorial-data";

const calc = seoConfig.calculators["indemnite-licenciement"];
const path = DISMISSAL_PATH;
const cover = getCalculatorCover("indemnite-licenciement");

export const metadata = buildPageMetadata(config, seoConfig, {
  title: calc.title,
  description: calc.description,
  path,
  ogImage: coverToOgInput(cover),
  robots: isPathIndexable(path) ? undefined : { index: false, follow: false },
});

export default function DismissalCompensationCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          buildWebApplicationSchema(config, calc.h1, calc.description, {
            dateModified: DISMISSAL_EDITORIAL_UPDATED_AT,
            image: coverToSchemaImage(cover),
          }),
          buildBreadcrumbSchema(config, [
            { name: "Accueil", path: "/" },
            { name: "Outils", path: seoConfig.toolsHub.path },
            { name: calc.h1, path },
          ]),
          buildFaqSchema(dismissalFaq),
        ]}
      />
      <ToolCalculatorPageLayout
        h1="Calculez votre indemnité de licenciement"
        subtitle={calc.subtitle}
        disclaimer={DISMISSAL_DISCLAIMER}
        Calculator={DismissalCompensationCalculator}
        variant="margin"
        sidebar={<DismissalCompensationPageSidebar />}
        breadcrumb={
          <PageBreadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Outils", href: seoConfig.toolsHub.path },
              { label: calc.h1 },
            ]}
          />
        }
        editorial={<DismissalCompensationEditorial />}
      />
    </>
  );
}
