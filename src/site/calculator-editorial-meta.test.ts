import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getAllCalculators } from "@/site/navigation/calculators-registry";
import {
  CALCULATOR_EDITORIAL_UPDATED_AT,
  computeCalculatorEditorialReadingTime,
} from "./calculator-editorial-meta";
import { SICK_LEAVE_UPDATED_AT } from "./sick-leave/data";
import { IJSS_UPDATED_AT } from "./ijss/data";
import { EMPLOYER_MAINTIEN_UPDATED_AT } from "./employer-maintien/data";
import { HOME_EDITORIAL_UPDATED_AT } from "./home-editorial-data";
import { OVERTIME_EDITORIAL_UPDATED_AT } from "./overtime-salary-calculator/overtime-editorial-data";
import { SALARY_INCREASE_EDITORIAL_UPDATED_AT } from "./salary-increase-calculator/salary-increase-editorial-data";
import { DISMISSAL_CONTENT_REVIEW_DATE } from "./dismissal-compensation-calculator/dismissal-editorial-data";

describe("calculateurs : meta éditoriale harmonisée", () => {
  it("recense exactement 7 calculateurs publics", () => {
    const calculators = getAllCalculators();
    expect(calculators).toHaveLength(7);
    expect(calculators.map((calc) => calc.id)).toEqual([
      "brut-vers-net",
      "augmentation-salaire",
      "salaire-heures-supplementaires",
      "salaire-arret-maladie",
      "calcul-ijss-arret-maladie",
      "maintien-salaire-arret-maladie",
      "indemnite-licenciement",
    ]);
  });

  it("fixe la date éditoriale au 20 octobre 2026 sur tous les calculateurs", () => {
    expect(CALCULATOR_EDITORIAL_UPDATED_AT).toBe("2026-10-20");
    expect(HOME_EDITORIAL_UPDATED_AT).toBe("2026-10-20");
    expect(OVERTIME_EDITORIAL_UPDATED_AT).toBe("2026-10-20");
    expect(SALARY_INCREASE_EDITORIAL_UPDATED_AT).toBe("2026-10-20");
    expect(DISMISSAL_CONTENT_REVIEW_DATE).toBe("2026-10-20");
    expect(SICK_LEAVE_UPDATED_AT).toBe("2026-10-20");
    expect(IJSS_UPDATED_AT).toBe("2026-10-20");
    expect(EMPLOYER_MAINTIEN_UPDATED_AT).toBe("2026-10-20");
  });

  it("ajoute GuideAuthorMeta sur l'accueil et les 3 pages /calculateurs", () => {
    const files = [
      "src/app/page.tsx",
      "src/app/calculateurs/augmentation-salaire/page.tsx",
      "src/app/calculateurs/salaire-heures-supplementaires/page.tsx",
      "src/app/calculateurs/indemnite-licenciement/page.tsx",
    ];
    for (const file of files) {
      const source = readFileSync(join(process.cwd(), file), "utf8");
      expect(source).toContain("GuideAuthorMeta");
      expect(source).toContain("CALCULATOR_EDITORIAL_UPDATED_AT");
    }
    const homeLayout = readFileSync(
      join(process.cwd(), "src/framework/layouts/CalculatorPageLayout.tsx"),
      "utf8",
    );
    expect(homeLayout).toContain("authorMeta");
  });

  it("conserve le fil d'Ariane Accueil › Outils › calculateur sans doublon", () => {
    const files = [
      "src/app/calculateurs/augmentation-salaire/page.tsx",
      "src/app/calculateurs/salaire-heures-supplementaires/page.tsx",
      "src/app/calculateurs/indemnite-licenciement/page.tsx",
    ];
    for (const file of files) {
      const source = readFileSync(join(process.cwd(), file), "utf8");
      expect(source).toContain("PageBreadcrumb");
      expect(source).toContain('label: "Outils"');
      expect(source.match(/<PageBreadcrumb/g)?.length).toBe(1);
    }
  });

  it("ne crée pas de fil d'Ariane Accueil › Accueil sur la page d'accueil", () => {
    const homePage = readFileSync(join(process.cwd(), "src/app/page.tsx"), "utf8");
    const homeLayout = readFileSync(
      join(process.cwd(), "src/framework/layouts/CalculatorPageLayout.tsx"),
      "utf8",
    );
    expect(homePage).toContain("GuideAuthorMeta");
    expect(homePage).not.toContain("PageBreadcrumb");
    expect(homeLayout).not.toContain("PageBreadcrumb");
  });

  it("calcule un temps de lecture distinct par article (méthode guides)", () => {
    const home = computeCalculatorEditorialReadingTime([
      "src/site/home-editorial.tsx",
      "src/site/home-editorial-data.ts",
      "src/site/home-faq.tsx",
      "src/site/home-faq-data.ts",
      "src/site/home-official-sources.tsx",
    ]);
    const overtime = computeCalculatorEditorialReadingTime([
      "src/site/overtime-salary-calculator/overtime-editorial.tsx",
      "src/site/overtime-salary-calculator/overtime-editorial-data.ts",
      "src/site/overtime-salary-calculator/overtime-official-sources.ts",
    ]);
    const increase = computeCalculatorEditorialReadingTime([
      "src/site/salary-increase-calculator/salary-increase-editorial.tsx",
      "src/site/salary-increase-calculator/salary-increase-editorial-data.ts",
      "src/site/salary-increase-calculator/salary-increase-official-sources.ts",
    ]);
    const dismissal = computeCalculatorEditorialReadingTime([
      "src/site/dismissal-compensation-calculator/DismissalCompensationEditorial.tsx",
      "src/site/dismissal-compensation-calculator/dismissal-editorial-data.ts",
      "src/site/dismissal-compensation-calculator/dismissal-official-sources.ts",
    ]);

    for (const minutes of [home, overtime, increase, dismissal]) {
      expect(minutes).toBeGreaterThanOrEqual(3);
      expect(minutes).toBeLessThanOrEqual(40);
    }
    const unique = new Set([home, overtime, increase, dismissal]);
    expect(unique.size).toBeGreaterThanOrEqual(2);
  });

  it("place authorMeta après le breadcrumb dans le layout outil", () => {
    const layout = readFileSync(
      join(process.cwd(), "src/framework/layouts/ToolCalculatorPageLayout.tsx"),
      "utf8",
    );
    const breadcrumbIdx = layout.indexOf("{breadcrumb}");
    const authorMetaIdx = layout.indexOf("{authorMeta}");
    const editorialIdx = layout.indexOf("{editorial}");
    expect(authorMetaIdx).toBeGreaterThan(breadcrumbIdx);
    expect(editorialIdx).toBeGreaterThan(authorMetaIdx);
  });
});
