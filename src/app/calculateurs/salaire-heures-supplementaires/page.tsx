import { config, seoConfig } from "@/site";
import { coverToOgInput, getCalculatorCover } from "@/site/guides/covers";
import { OvertimeSalaryPageSidebar } from "@/site/overtime-salary-calculator/overtime-sidebar";
import { ToolCalculatorPageLayout } from "@/framework/layouts/ToolCalculatorPageLayout";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { buildCalculatorJsonLd } from "@/site/schema";
import { isPathIndexable } from "@/site/public-pages";
import {
  OVERTIME_DISCLAIMER,
  OVERTIME_PATH,
} from "@/site/overtime-salary-calculator/config";
import OvertimeSalaryCalculator from "@/site/overtime-salary-calculator/OvertimeSalaryCalculator";
import {
  OvertimeSalaryEditorial,
  overtimeFaq,
} from "@/site/overtime-salary-calculator/overtime-editorial";
import { OVERTIME_EDITORIAL_UPDATED_AT } from "@/site/overtime-salary-calculator/overtime-editorial-data";

const calc = seoConfig.calculators["salaire-heures-supplementaires"];
const path = OVERTIME_PATH;
const cover = getCalculatorCover("salaire-heures-supplementaires");

export const metadata = buildPageMetadata(config, seoConfig, {
  title: calc.title,
  description: calc.description,
  path,
  ogImage: coverToOgInput(cover),
  robots: isPathIndexable(path) ? undefined : { index: false, follow: false },
});

export default function OvertimeSalaryCalculatorPage() {
  return (
    <>
      <JsonLd
        data={buildCalculatorJsonLd({
          path,
          name: calc.h1,
          description: calc.description,
          cover,
          faq: overtimeFaq,
          dateModified: OVERTIME_EDITORIAL_UPDATED_AT,
        })}
      />
      <ToolCalculatorPageLayout
        h1="Calculez votre salaire avec heures supplémentaires"
        subtitle={calc.subtitle}
        disclaimer={OVERTIME_DISCLAIMER}
        Calculator={OvertimeSalaryCalculator}
        variant="margin"
        sidebar={<OvertimeSalaryPageSidebar />}
        breadcrumb={
          <PageBreadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Outils", href: seoConfig.toolsHub.path },
              { label: calc.h1 },
            ]}
          />
        }
        editorial={<OvertimeSalaryEditorial />}
      />
    </>
  );
}
