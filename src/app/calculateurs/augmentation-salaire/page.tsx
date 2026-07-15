import { config, seoConfig } from "@/site";
import { coverToOgInput, coverToSchemaImage, HOME_COVER } from "@/site/guides/covers";
import { SalaryIncreasePageSidebar } from "@/site/salary-increase-calculator/salary-increase-sidebar";
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
  INCREASE_DISCLAIMER,
  SALARY_INCREASE_PATH,
} from "@/site/salary-increase-calculator/config";
import SalaryIncreaseCalculator from "@/site/salary-increase-calculator/SalaryIncreaseCalculator";
import {
  SalaryIncreaseEditorial,
  salaryIncreaseFaq,
} from "@/site/salary-increase-calculator/salary-increase-editorial";
import { SALARY_INCREASE_EDITORIAL_UPDATED_AT } from "@/site/salary-increase-calculator/salary-increase-editorial-data";

const calc = seoConfig.calculators["augmentation-salaire"];
const path = SALARY_INCREASE_PATH;

export const metadata = buildPageMetadata(config, seoConfig, {
  title: calc.title,
  description: calc.description,
  path,
  ogImage: coverToOgInput(HOME_COVER),
  robots: isPathIndexable(path) ? undefined : { index: false, follow: false },
});

export default function SalaryIncreaseCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          buildWebApplicationSchema(config, calc.h1, calc.description, {
            dateModified: SALARY_INCREASE_EDITORIAL_UPDATED_AT,
            image: coverToSchemaImage(HOME_COVER),
          }),
          buildBreadcrumbSchema(config, [
            { name: "Accueil", path: "/" },
            { name: "Outils", path: seoConfig.toolsHub.path },
            { name: calc.h1, path },
          ]),
          buildFaqSchema(salaryIncreaseFaq),
        ]}
      />
      <ToolCalculatorPageLayout
        h1="Calculez votre augmentation de salaire"
        subtitle={calc.subtitle}
        disclaimer={INCREASE_DISCLAIMER}
        Calculator={SalaryIncreaseCalculator}
        variant="margin"
        sidebar={<SalaryIncreasePageSidebar />}
        breadcrumb={
          <PageBreadcrumb
            items={[
              { label: "Accueil", href: "/" },
              { label: "Outils", href: seoConfig.toolsHub.path },
              { label: calc.h1 },
            ]}
          />
        }
        editorial={<SalaryIncreaseEditorial />}
      />
    </>
  );
}
