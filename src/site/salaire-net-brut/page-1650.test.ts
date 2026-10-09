import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import { monthlyToAnnual, roundCent } from "@/site/salary-calculator/conversions";
import { isPathIndexable } from "@/site/public-pages";
import { buildWebPageJsonLd, schemaIds } from "@/site/schema";
import { NET_TO_GROSS_SERIES_COVER } from "@/site/guides/covers";
import {
  NET_TO_GROSS_HUB_BREADCRUMB_LABEL,
  NET_TO_GROSS_HUB_PATH,
  NET_TO_GROSS_SALARY_MONTHS,
  NET_TO_GROSS_UPDATED_AT,
  isNetToGrossAmount,
  netToGrossPath,
} from "./config";
import {
  buildAllProfileEstimates,
  buildComparisonRows,
  estimateGrossMonthlyFromNet,
} from "./data";
import {
  buildSeriesEditorial,
  buildSeriesFaqItems,
  buildSeriesSeoMeta,
  getSeriesNearbyAmounts,
} from "./page-1500-content";
import {
  PAGE_1650_ANNUAL_H2,
  PAGE_1650_ANSWER_H2,
  PAGE_1650_CALCULATOR_BUTTON,
  PAGE_1650_CALCULATOR_HEADING,
  PAGE_1650_DATE_MODIFIED,
  PAGE_1650_DATE_PUBLISHED,
  PAGE_1650_END_CTA_H2,
  PAGE_1650_END_CTA_HREF,
  PAGE_1650_END_CTA_LINK_LABEL,
  PAGE_1650_END_CTA_TEXT,
  PAGE_1650_FAQ_HOME_CALCULATOR_LABEL,
  PAGE_1650_H1,
  PAGE_1650_HOW_TO_H2,
  PAGE_1650_INTERMEDIATE_NETS,
  PAGE_1650_NEARBY_H2,
  PAGE_1650_NEARBY_INTRO,
  PAGE_1650_NET,
  PAGE_1650_SEO,
  PAGE_1650_SIDEBAR_GUIDE_ENTRIES,
  PAGE_1650_SIDEBAR_TOOL_IDS,
  PAGE_1650_TABLE_H2,
  PAGE_1650_TABLE_INTRO,
  PAGE_1650_TAX_H2,
  assert1650IntermediateHasNoDedicatedUrls,
  build1650AnnualFigures,
  build1650ConversionExample,
  build1650IntermediateRows,
  build1650PageJsonLd,
  netToGrossOpenGraphType,
} from "./page-1650";

const pageSource = readFileSync(join(process.cwd(), "src/site/salaire-net-brut/page-1500.tsx"), "utf8");
const sectionsSource = readFileSync(
  join(process.cwd(), "src/site/salaire-net-brut/page-1650-sections.tsx"),
  "utf8",
);
const routeSource = readFileSync(
  join(process.cwd(), "src/app/net-vers-brut/[montant]/page.tsx"),
  "utf8",
);
const cssSource = readFileSync(join(process.cwd(), "src/site/salaire-net-brut/page-1650.css"), "utf8");
const otherCssSource = readFileSync(
  join(process.cwd(), "src/site/salaire-net-brut/page-1500.css"),
  "utf8",
);
const seriesSidebarSource = readFileSync(
  join(process.cwd(), "src/site/salaire-net-brut/sidebar.tsx"),
  "utf8",
);
const sidebar1650Source = readFileSync(
  join(process.cwd(), "src/site/salaire-net-brut/page-1650-sidebar.tsx"),
  "utf8",
);

describe("prototype page 1 650 € net en brut", () => {
  it("isole le SEO title, la meta description et le H1 autour de 1650 net en brut", () => {
    const seo1650 = buildSeriesSeoMeta(1650);
    const seo1600 = buildSeriesSeoMeta(1600);

    expect(seo1650.title).toBe("1 650 € net en brut : calcul et conversion");
    expect(seo1650.title).toBe(PAGE_1650_SEO.title);
    expect(seo1650.description).toBe(PAGE_1650_SEO.description);
    expect(seo1650.h1).toBe("1 650 € net en brut : combien ça fait ?");
    expect(seo1650.h1).toBe(PAGE_1650_H1);
    expect(seo1650.answerH2).toBe(PAGE_1650_ANSWER_H2);
    expect(seo1650.title).not.toContain("mis à jour");
    expect(seo1650.title).not.toContain("2026");
    expect(seo1650.description).not.toContain("mis à jour");
    expect(seo1650.description).not.toContain("2026");
    expect(seo1650.title).not.toContain("1645");
    expect(seo1650.description).not.toContain("1645");
    expect(seo1650.title).not.toContain("\u2014");
    expect(seo1650.description).not.toContain("\u2014");

    expect(seo1600.title).toMatch(/brut mensuel/);
    expect(seo1600.title).not.toBe(PAGE_1650_SEO.title);
    expect(seo1600.description).not.toBe(PAGE_1650_SEO.description);
    expect(seo1600.h1).toContain("par mois");
    expect(seo1600.h1).not.toBe(PAGE_1650_H1);
  });

  it("conserve l'URL, la canonical auto-référente et l'indexabilité", () => {
    const path = netToGrossPath(1650);
    expect(path).toBe("/combien-gagner-brut-mensuel-pour-1650-net");
    expect(isPathIndexable(path)).toBe(true);
    expect(routeSource).toContain("getCanonicalUrl(config.url, path)");
    expect(routeSource).toContain("buildSeriesSeoMeta(netMonthly)");
  });

  it("construit le tableau 1645-1654 avec le moteur existant et met 1650 en avant", () => {
    const rows = build1650IntermediateRows();
    const estimates = buildAllProfileEstimates(1650);

    expect(rows.map((row) => row.netMonthly)).toEqual([...PAGE_1650_INTERMEDIATE_NETS]);
    expect(rows).toHaveLength(10);

    const current = rows.find((row) => row.isCurrent);
    expect(current?.netMonthly).toBe(PAGE_1650_NET);
    expect(current?.nonExecutive).toBe(estimates.nonExecutive.grossMonthly);
    expect(current?.executive).toBe(estimates.executive.grossMonthly);
    expect(current?.publicService).toBe(estimates.publicService.grossMonthly);
    expect(estimates.nonExecutive.grossAnnual).toBe(
      roundCent(monthlyToAnnual(estimates.nonExecutive.grossMonthly, NET_TO_GROSS_SALARY_MONTHS)),
    );

    for (const row of rows) {
      expect(row.nonExecutive).toBe(estimateGrossMonthlyFromNet(row.netMonthly, "nonExecutive"));
      expect(row.executive).toBe(estimateGrossMonthlyFromNet(row.netMonthly, "executive"));
      expect(row.publicService).toBe(estimateGrossMonthlyFromNet(row.netMonthly, "publicService"));
      expect(row.nonExecutive).toBe(roundCent(row.netMonthly / getProfileCoefficient("nonExecutive")));
      expect(row.executive).toBe(roundCent(row.netMonthly / getProfileCoefficient("executive")));
      expect(row.publicService).toBe(roundCent(row.netMonthly / getProfileCoefficient("publicService")));
    }

    expect(buildComparisonRows(1650).map((row) => row.netMonthly)).toEqual([
      1550, 1600, 1650, 1700, 1750,
    ]);
  });

  it("ne crée pas d'URL ni de lien vers les euros intermédiaires", () => {
    const missingPaths = assert1650IntermediateHasNoDedicatedUrls();
    expect(missingPaths).toHaveLength(9);
    for (const path of missingPaths) {
      const amount = Number(path.match(/(\d+)-net$/)?.[1]);
      expect(isNetToGrossAmount(amount)).toBe(false);
    }
    expect(pageSource).not.toContain("netToGrossPath(row.netMonthly)");
    expect(PAGE_1650_TABLE_H2).toBe("De 1 645 à 1 654 € net : équivalents en brut");
    expect(PAGE_1650_TABLE_INTRO).toContain("1 645 € à 1 654 €");
  });

  it("place le tableau 1650 après le calculateur et avant la photo, sans second partage", () => {
    const calcIndex = pageSource.indexOf("<MiniCalculatorCta1500");
    const table1650Index = pageSource.indexOf("{is1650Prototype ? table : null}");
    const coverIndex = pageSource.indexOf("<CoverFigure");
    const otherTableIndex = pageSource.indexOf("{is1650Prototype ? null : table}");
    const pedagogyIndex = pageSource.indexOf("<Page1650PedagogySections");
    const shareCount = pageSource.match(/<ShareBlock/g)?.length ?? 0;

    expect(calcIndex).toBeGreaterThan(-1);
    expect(table1650Index).toBeGreaterThan(calcIndex);
    expect(pageSource.indexOf("<ShareBlock")).toBeGreaterThan(table1650Index);
    expect(coverIndex).toBeGreaterThan(pageSource.indexOf("<ShareBlock"));
    expect(pedagogyIndex).toBeGreaterThan(coverIndex);
    expect(otherTableIndex).toBeGreaterThan(coverIndex);
    expect(pageSource).toContain("net-gross-1650");
    expect(pageSource).toContain("PAGE_1650_ROUNDING_NOTE");
    expect(pageSource).toContain("is1650Prototype ? null : (");
    expect(shareCount).toBe(2);
    expect(pageSource.match(/is1650Prototype \? table : null/g)?.length).toBe(1);
    expect(PAGE_1650_CALCULATOR_HEADING).toBe("Calculez votre salaire brut");
    expect(PAGE_1650_CALCULATOR_BUTTON).toBe("Calculer mon salaire brut");
    expect(pageSource).toContain("PAGE_1650_ANSWER_H2");
    expect(pageSource).toContain("Page1650NearbySection");
  });

  it("n'expose qu'un tableau 1645-1654 et laisse les autres fiches sur ±50 €", () => {
    const rows1650 = build1650IntermediateRows();
    expect(rows1650.map((row) => row.netMonthly)).toEqual([
      1645, 1646, 1647, 1648, 1649, 1650, 1651, 1652, 1653, 1654,
    ]);
    expect(buildComparisonRows(1640).map((row) => row.netMonthly)).toEqual([
      1540, 1590, 1640, 1690, 1740,
    ]);
    expect(buildComparisonRows(1660).map((row) => row.netMonthly)).toEqual([
      1560, 1610, 1660, 1710, 1760,
    ]);
    expect(buildSeriesSeoMeta(1640).title).toMatch(/brut mensuel/);
    expect(buildSeriesSeoMeta(1660).title).toMatch(/brut mensuel/);
    expect(buildSeriesSeoMeta(1600).title).not.toBe(PAGE_1650_SEO.title);
  });

  it("aligne la pédagogie et l'annuel sur le moteur existant, sans exemple fiscal fictif", () => {
    const estimates = buildAllProfileEstimates(1650);
    const example = build1650ConversionExample();
    const annual = build1650AnnualFigures(estimates);

    expect(example.coefficient).toBe(0.78);
    expect(example.exactGrossMonthly).toBe(roundCent(1650 / 0.78));
    expect(example.roundedGrossMonthly).toBe(2115);
    expect(Math.round(estimates.nonExecutive.grossMonthly)).toBe(2115);
    expect(Math.round(estimates.executive.grossMonthly)).toBe(2200);
    expect(Math.round(estimates.publicService.grossMonthly)).toBe(2037);

    expect(annual.netAnnual).toBe(19800);
    expect(annual.grossAnnualRounded).toBe(25385);
    expect(annual.grossAnnual).toBe(estimates.nonExecutive.grossAnnual);

    expect(PAGE_1650_HOW_TO_H2).toBe("Comment calculer le salaire brut correspondant à 1 650 € net ?");
    expect(PAGE_1650_ANNUAL_H2).toBe("1 650 € net par mois : combien cela représente-t-il par an ?");
    expect(PAGE_1650_TAX_H2).toBe("1 650 € net : avant ou après prélèvement à la source ?");
    expect(PAGE_1650_ANSWER_H2).toBe("1 650 € net : combien en brut selon votre statut ?");
    expect(PAGE_1650_NEARBY_H2).toBe("Comparez les salaires nets proches de 1 650 €");

    expect(sectionsSource).not.toContain("82,50");
    expect(sectionsSource).not.toContain("1 567,50");
    expect(sectionsSource).not.toContain("taux fictif");
    expect(sectionsSource).not.toContain("net-gross-1650__tax");
    expect(cssSource).not.toContain("net-gross-1650__tax");
  });

  it("raccourcit l'éditorial et la FAQ sans toucher aux autres fiches", () => {
    const estimates1650 = buildAllProfileEstimates(1650);
    const estimates1600 = buildAllProfileEstimates(1600);
    const editorial1650 = buildSeriesEditorial(1650, estimates1650);
    const editorial1600 = buildSeriesEditorial(1600, estimates1600);
    const faq1650 = buildSeriesFaqItems(1650, estimates1650);
    const faq1600 = buildSeriesFaqItems(1600, estimates1600);

    expect(editorial1650).toHaveLength(3);
    expect(editorial1650[0]?.title).toMatch(/^Quel brut pour toucher/);
    expect(editorial1650.flatMap((section) => section.paragraphs).length).toBeLessThan(
      editorial1600.flatMap((section) => section.paragraphs).length,
    );
    expect(faq1650).toHaveLength(4);
    expect(faq1650.some((item) => item.question.includes("Combien faut-il gagner"))).toBe(false);
    expect(faq1650.some((item) => item.question.includes("avant ou après impôt"))).toBe(true);
    expect(faq1650.some((item) => item.question.includes("selon le statut"))).toBe(true);
    expect(faq1600).toHaveLength(3);
    expect(faq1600[0]?.question).toContain("Combien faut-il gagner");

    const nearby = getSeriesNearbyAmounts(1650);
    expect(nearby).toEqual([1640, 1660, 1630, 1670, 1620, 1680, 1610]);
    expect([...nearby].sort((a, b) => a - b)).toEqual([1610, 1620, 1630, 1640, 1660, 1670, 1680]);
    expect(nearby).not.toContain(1645);
    expect(nearby.every((amount) => isNetToGrossAmount(amount))).toBe(true);
    expect(PAGE_1650_NEARBY_INTRO).toContain("conversions net en brut");
    expect(pageSource).toContain("[...getSeriesNearbyAmounts(netMonthly)].sort");

    const blob = [
      ...editorial1650.flatMap((section) => [section.title, ...section.paragraphs]),
      ...faq1650.flatMap((item) => [item.question, item.answer]),
      PAGE_1650_TABLE_INTRO,
      PAGE_1650_HOW_TO_H2,
      PAGE_1650_ANNUAL_H2,
      PAGE_1650_TAX_H2,
      PAGE_1650_END_CTA_H2,
      PAGE_1650_END_CTA_TEXT,
      PAGE_1650_END_CTA_LINK_LABEL,
    ].join(" ");
    expect(blob).not.toContain("\u2014");
    expect(blob).not.toMatch(/1645 net en brut/);
    expect(pageSource).toContain("Page1650PedagogySections");
    expect(sectionsSource).toContain("COTISATIONS_GUIDE_HREF");
    expect(sectionsSource).toContain('href="/"');
    expect(sectionsSource).not.toContain("PAS_GUIDE_HREF");
    expect(cssSource).toContain(".net-gross-1650");
    expect(cssSource).toContain(".net-gross-1650__nearby-card");
    expect(otherCssSource).not.toContain(".net-gross-1650");
  });

  it("isole le JSON-LD WebPage et l'og:type website sans toucher à 1640 ni 1660", () => {
    const jsonLdInput = (netMonthly: number) => {
      const seo = buildSeriesSeoMeta(netMonthly);
      const path = netToGrossPath(netMonthly);
      const estimates = buildAllProfileEstimates(netMonthly);
      return {
        path,
        name: seo.title,
        description: seo.description,
        breadcrumbs: [
          { name: "Accueil", path: "/" },
          { name: NET_TO_GROSS_HUB_BREADCRUMB_LABEL, path: NET_TO_GROSS_HUB_PATH },
          { name: `${netMonthly}`, path },
        ],
        cover: NET_TO_GROSS_SERIES_COVER,
        faq: buildSeriesFaqItems(netMonthly, estimates),
        withAuthor: true,
        dateModified:
          netMonthly === 1650 ? PAGE_1650_DATE_MODIFIED : NET_TO_GROSS_UPDATED_AT,
        datePublished:
          netMonthly === 1650 ? PAGE_1650_DATE_PUBLISHED : NET_TO_GROSS_UPDATED_AT,
      };
    };

    const document1650 = build1650PageJsonLd(jsonLdInput(1650));
    const graph1650 = document1650["@graph"] as Record<string, unknown>[];
    const page1650 = graph1650.find((node) => node["@type"] === "WebPage") as Record<
      string,
      unknown
    >;
    const faq1650 = graph1650.find((node) => node["@type"] === "FAQPage") as {
      mainEntity: Array<{ name: string; acceptedAnswer: { text: string } }>;
    };
    const serialized = JSON.stringify(document1650);

    expect(() => JSON.parse(serialized)).not.toThrow();
    expect(page1650.name).toBe(PAGE_1650_SEO.title);
    expect(page1650.description).toBe(PAGE_1650_SEO.description);
    expect(page1650.url).toBe(
      "https://www.brut-vers-net.fr/combien-gagner-brut-mensuel-pour-1650-net",
    );
    expect(page1650).not.toHaveProperty("about");
    expect(page1650).not.toHaveProperty("mainEntity");
    expect(page1650.publisher).toEqual({ "@id": schemaIds.organization() });
    expect(page1650.hasPart).toEqual([{ "@id": schemaIds.faq(netToGrossPath(1650)) }]);
    expect(PAGE_1650_DATE_PUBLISHED).toBe("2026-07-15");
    expect(PAGE_1650_DATE_MODIFIED).toBe("2026-10-09");
    expect(page1650.datePublished).toBe("2026-07-15T09:00:00+02:00");
    expect(page1650.dateModified).toBe("2026-10-09T09:00:00+02:00");
    expect(graph1650.some((node) => node["@type"] === "Article")).toBe(false);
    expect(graph1650.some((node) => node["@type"] === "WebApplication")).toBe(false);
    expect(graph1650.some((node) => node["@type"] === "SoftwareApplication")).toBe(false);
    expect(graph1650.some((node) => node["@type"] === "HowTo")).toBe(false);
    expect(graph1650.filter((node) => node["@type"] === "BreadcrumbList")).toHaveLength(1);
    expect(graph1650.filter((node) => node["@type"] === "FAQPage")).toHaveLength(1);
    expect(faq1650.mainEntity).toHaveLength(4);
    expect(faq1650.mainEntity[3]?.acceptedAnswer.text).toContain(
      PAGE_1650_FAQ_HOME_CALCULATOR_LABEL,
    );
    expect(serialized).not.toContain("82,50");
    expect(serialized).not.toContain("1 567,50");

    const graph1640 = buildWebPageJsonLd(jsonLdInput(1640))["@graph"] as Record<string, unknown>[];
    const page1640 = graph1640.find((node) => node["@type"] === "WebPage") as Record<
      string,
      unknown
    >;
    expect(page1640.about).toEqual({ "@id": schemaIds.organization() });
    expect(page1640.mainEntity).toEqual({ "@id": schemaIds.faq(netToGrossPath(1640)) });
    expect(page1640).not.toHaveProperty("publisher");
    expect(page1640).not.toHaveProperty("hasPart");
    expect(page1640.datePublished).toBe("2026-07-15T09:00:00+02:00");
    expect(page1640.dateModified).toBe("2026-07-15T09:00:00+02:00");

    const graph1660 = buildWebPageJsonLd(jsonLdInput(1660))["@graph"] as Record<string, unknown>[];
    const page1660 = graph1660.find((node) => node["@type"] === "WebPage") as Record<
      string,
      unknown
    >;
    expect(page1660.about).toEqual({ "@id": schemaIds.organization() });
    expect(page1660.mainEntity).toEqual({ "@id": schemaIds.faq(netToGrossPath(1660)) });
    expect(page1660).not.toHaveProperty("publisher");

    expect(netToGrossOpenGraphType(1650)).toBe("website");
    expect(netToGrossOpenGraphType(1640)).toBe("article");
    expect(netToGrossOpenGraphType(1660)).toBe("article");
    expect(routeSource).toContain("netToGrossOpenGraphType(netMonthly)");
    expect(routeSource).toContain("build1650PageJsonLd");
    expect(routeSource).toContain("buildWebPageJsonLd(jsonLdInput)");
  });

  it("compacte la sidebar 1650 et ajoute un CTA net→brut sans toucher aux autres fiches", () => {
    expect(PAGE_1650_SIDEBAR_TOOL_IDS).toEqual([
      "brut-vers-net",
      "augmentation-salaire",
      "salaire-heures-supplementaires",
    ]);
    expect(PAGE_1650_SIDEBAR_GUIDE_ENTRIES).toHaveLength(3);
    expect(PAGE_1650_SIDEBAR_TOOL_IDS.length + PAGE_1650_SIDEBAR_GUIDE_ENTRIES.length).toBe(6);
    expect(PAGE_1650_END_CTA_HREF).toBe("/?net=1650&profil=non-cadre");
    expect(PAGE_1650_END_CTA_H2).toBe("Vous souhaitez convertir un autre montant ?");
    expect(PAGE_1650_END_CTA_LINK_LABEL).toBe("Calculer mon salaire net en brut");

    expect(seriesSidebarSource).toContain("isNetToGross1650Prototype");
    expect(seriesSidebarSource).toContain("Page1650Sidebar");
    expect(seriesSidebarSource).toContain('pageType="home"');
    expect(sidebar1650Source).not.toContain("salaire-arret-maladie");
    expect(sidebar1650Source).not.toContain("indemnite-licenciement");
    expect(pageSource).toContain("Page1650EndCta");
    expect(sectionsSource).toContain("PAGE_1650_END_CTA_HREF");
    expect(cssSource).toContain(".net-gross-1650__end-cta");
    expect(otherCssSource).not.toContain(".net-gross-1650__end-cta");
  });
});
