import { config, seoConfig } from "@/site";
import { coverToOgInput, getCalculatorCover } from "@/site/guides/covers";
import { SalaryIncreasePageSidebar } from "@/site/salary-increase-calculator/salary-increase-sidebar";
import { ToolCalculatorPageLayout } from "@/framework/layouts/ToolCalculatorPageLayout";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { buildCalculatorJsonLd } from "@/site/schema";
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
const cover = getCalculatorCover("augmentation-salaire");

export const metadata = buildPageMetadata(config, seoConfig, {
  title: calc.title,
  description: calc.description,
  path,
  ogImage: coverToOgInput(cover),
  robots: isPathIndexable(path) ? undefined : { index: false, follow: false },
});

export default function SalaryIncreaseCalculatorPage() {
  return (
    <>
      <JsonLd
        data={buildCalculatorJsonLd({
          path,
          name: calc.h1,
          description: calc.description,
          cover,
          faq: salaryIncreaseFaq,
          dateModified: SALARY_INCREASE_EDITORIAL_UPDATED_AT,
        })}
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
