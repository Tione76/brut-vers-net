import { config, seoConfig } from "@/site";
import { coverToOgInput, getCalculatorCover } from "@/site/guides/covers";
import { DismissalCompensationPageSidebar } from "@/site/dismissal-compensation-calculator/dismissal-sidebar";
import { ToolCalculatorPageLayout } from "@/framework/layouts/ToolCalculatorPageLayout";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { buildCalculatorJsonLd } from "@/site/schema";
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
import { DISMISSAL_CONTENT_REVIEW_DATE } from "@/site/dismissal-compensation-calculator/dismissal-editorial-data";

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
        data={buildCalculatorJsonLd({
          path,
          name: calc.h1,
          description: calc.description,
          cover,
          faq: dismissalFaq,
          dateModified: DISMISSAL_CONTENT_REVIEW_DATE,
        })}
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
