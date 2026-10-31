import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { buildPageMetadata, getCanonicalUrl } from "@/framework/seo/metadata";
import { config, seoConfig } from "@/site";
import { getAllPublicPages, isPathIndexable } from "@/site/public-pages";
import { buildWebPageJsonLd } from "@/site/schema";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import {
  GROSS_TO_NET_AMOUNTS,
  GROSS_TO_NET_HUB_PATH,
  GROSS_TO_NET_INDEX_PATH,
  GROSS_TO_NET_UPDATED_AT,
  grossToNetPath,
} from "./config";
import { buildAllProfileNetEstimates, estimateNetMonthlyFromGross } from "./data";
import { buildGrossToNetAnnualCopy, buildGrossToNetTaxParagraphs } from "./content";
import {
  GROSS_TO_NET_REDESIGN_DATE_MODIFIED,
  PAGE_1000_DATE_MODIFIED,
  PAGE_1000_DATE_PUBLISHED,
  PAGE_1000_DESCRIPTION,
  PAGE_1000_GROSS,
  PAGE_1000_H1,
  PAGE_1000_TITLE,
  buildGrossToNetRedesignSeoMeta,
  buildPage1000AnnualFigures,
  buildPage1000ConversionExample,
  PAGE_1000_ANNUAL_H2,
  PAGE_1000_HOW_TO_CALCULATOR,
  PAGE_1000_TAX_H2,
  buildPage1000Editorial,
  buildPage1000EndCtaHref,
  buildPage1000HowToCoefficients,
  buildPage1000FaqItems,
  formatPilotEuro,
  isGrossToNet1000Pilot,
  resolveGrossToNetSeoMeta,
} from "./page-1000-pilot";

const routeSource = readFileSync(
  join(process.cwd(), "src/app/salaire-brut-net/[montant]/page.tsx"),
  "utf8",
);
const seriesSource = readFileSync(join(process.cwd(), "src/site/salaire-brut-net/page-1000.tsx"), "utf8");
const netToGross2150Route = readFileSync(
  join(process.cwd(), "src/app/net-vers-brut/[montant]/page.tsx"),
  "utf8",
);

describe("fiche-test 1 000 € brut → net", () => {
  it("isole le SEO, le H1 et la meta sans « par mois » ni résultat chiffré", () => {
    const seo = resolveGrossToNetSeoMeta(PAGE_1000_GROSS);
    const metadata = buildPageMetadata(config, seoConfig, {
      title: seo.title,
      description: seo.description,
      path: grossToNetPath(PAGE_1000_GROSS),
    });

    expect(isGrossToNet1000Pilot(1000)).toBe(true);
    expect(isGrossToNet1000Pilot(1050)).toBe(false);
    expect(seo.title).toBe(PAGE_1000_TITLE);
    expect(seo.h1).toBe(PAGE_1000_H1);
    expect(seo.title).toBe("1 000 € brut en net : combien ça fait ?");
    expect(seo.h1).toBe(seo.title);
    expect(seo.title).not.toMatch(/par mois/i);
    expect(seo.h1).not.toMatch(/par mois/i);
    expect(seo.title).not.toMatch(/2026|mis à jour/i);
    expect(seo.description).toBe(PAGE_1000_DESCRIPTION);
    expect(seo.description).not.toMatch(/\d[\d\s\u00a0\u202f]*€/);
    expect(seo.description).not.toMatch(/780|750|810/);
    expect(metadata.title).toEqual({ absolute: PAGE_1000_TITLE });
    expect(metadata.alternates?.canonical).toBe(
      getCanonicalUrl(config.url, "/quel-salaire-net-mensuel-pour-1000-euros-brut"),
    );
    expect(isPathIndexable(grossToNetPath(PAGE_1000_GROSS))).toBe(true);
  });

  it("prend les trois nets dans le moteur existant", () => {
    const estimates = buildAllProfileNetEstimates(PAGE_1000_GROSS);
    const example = buildPage1000ConversionExample();
    const annual = buildPage1000AnnualFigures(estimates);

    expect(estimates.nonExecutive.netMonthly).toBe(
      estimateNetMonthlyFromGross(1000, "nonExecutive"),
    );
    expect(estimates.nonExecutive.netMonthly).toBe(780);
    expect(estimates.executive.netMonthly).toBe(750);
    expect(estimates.publicService.netMonthly).toBe(810);
    expect(example.coefficient).toBe(getProfileCoefficient("nonExecutive"));
    expect(example.netMonthly).toBe(780);
    expect(annual.grossAnnual).toBe(12_000);
    expect(annual.netAnnual).toBe(9_360);
  });

  it("synchronise la FAQ visible et le JSON-LD, avec date de modification locale", () => {
    const faq = buildPage1000FaqItems();
    const path = grossToNetPath(PAGE_1000_GROSS);
    const jsonLd = buildWebPageJsonLd({
      path,
      name: PAGE_1000_TITLE,
      description: PAGE_1000_DESCRIPTION,
      breadcrumbs: [
        { name: "Accueil", path: "/" },
        { name: PAGE_1000_TITLE, path },
      ],
      faq,
      withAuthor: true,
      datePublished: PAGE_1000_DATE_PUBLISHED,
      dateModified: PAGE_1000_DATE_MODIFIED,
    });
    const graph = (jsonLd as { "@graph"?: Array<Record<string, unknown>> })["@graph"] ?? [];
    const faqNode = graph.find((node) => node["@type"] === "FAQPage") as
      | { mainEntity?: Array<{ name?: string; acceptedAnswer?: { text?: string } }> }
      | undefined;
    const pageNode = graph.find((node) => node["@type"] === "WebPage") as
      | { datePublished?: string; dateModified?: string }
      | undefined;

    expect(faq).toHaveLength(5);
    expect(faqNode?.mainEntity).toHaveLength(5);
    expect(faq.some((item) => item.question.includes("prime"))).toBe(true);
    expect(faq.map((item) => `${item.question} ${item.answer}`).join(" ")).not.toMatch(
      /calcul précis/i,
    );
    for (let i = 0; i < faq.length; i += 1) {
      expect(faqNode?.mainEntity?.[i]?.name).toBe(faq[i]?.question);
      expect(faqNode?.mainEntity?.[i]?.acceptedAnswer?.text).toBe(faq[i]?.answer);
    }
    expect(PAGE_1000_DATE_PUBLISHED).toBe(GROSS_TO_NET_UPDATED_AT);
    expect(PAGE_1000_DATE_MODIFIED).toBe("2026-10-31");
    expect(GROSS_TO_NET_REDESIGN_DATE_MODIFIED).toBe("2026-10-31");
    expect(pageNode?.datePublished).toBe("2026-07-15T09:00:00+02:00");
    expect(pageNode?.dateModified).toBe("2026-10-31T09:00:00+02:00");
    expect(routeSource).toContain("GROSS_TO_NET_REDESIGN_DATE_MODIFIED");
    expect(routeSource).toContain("GROSS_TO_NET_UPDATED_AT");
    expect(routeSource).toContain("GrossToNet1000PageContent");
    expect(routeSource).toContain("buildPage1000FaqItems");
    expect(routeSource).not.toContain("isGrossToNet1000Pilot");
  });

  it("étend le modèle 1 000 € aux 101 fiches sans toucher au net → brut", () => {
    const pages = getAllPublicPages();
    const page1000 = pages.find((page) => page.path === grossToNetPath(1000));
    const page1050 = pages.find((page) => page.path === grossToNetPath(1050));
    const page2500 = pages.find((page) => page.path === grossToNetPath(2500));
    const page6000 = pages.find((page) => page.path === grossToNetPath(6000));
    const hub = pages.find((page) => page.path === GROSS_TO_NET_HUB_PATH);
    const index = pages.find((page) => page.path === GROSS_TO_NET_INDEX_PATH);
    const editorial = buildPage1000Editorial();
    const annualCopy = buildGrossToNetAnnualCopy(
      PAGE_1000_GROSS,
      buildAllProfileNetEstimates(PAGE_1000_GROSS),
    );
    const blob = [
      PAGE_1000_TITLE,
      PAGE_1000_H1,
      PAGE_1000_DESCRIPTION,
      PAGE_1000_HOW_TO_CALCULATOR,
      PAGE_1000_TAX_H2,
      PAGE_1000_ANNUAL_H2,
      buildPage1000HowToCoefficients(),
      ...buildGrossToNetTaxParagraphs(),
      ...annualCopy.paragraphs,
      annualCopy.grossCard.label,
      annualCopy.grossCard.hint,
      annualCopy.netCard.label,
      annualCopy.netCard.hint,
      ...buildPage1000FaqItems().flatMap((item) => [item.question, item.answer]),
      ...editorial.flatMap((section) => [section.title, ...section.paragraphs]),
    ].join(" ");

    expect(GROSS_TO_NET_AMOUNTS).toHaveLength(101);
    expect(page1000?.title).toBe(PAGE_1000_TITLE);
    expect(page1000?.lastModified).toBe(GROSS_TO_NET_REDESIGN_DATE_MODIFIED);
    expect(page1050?.title).toBe(buildGrossToNetRedesignSeoMeta(1050).title);
    expect(page1050?.lastModified).toBe(GROSS_TO_NET_REDESIGN_DATE_MODIFIED);
    expect(page2500?.title).toBe("2 500 € brut en net : combien ça fait ?");
    expect(page6000?.title).toBe("6 000 € brut en net : combien ça fait ?");
    expect(resolveGrossToNetSeoMeta(1050).title).toBe(
      buildGrossToNetRedesignSeoMeta(1050).title,
    );
    expect(resolveGrossToNetSeoMeta(2500).h1).toBe("2 500 € brut en net : combien ça fait ?");
    expect(resolveGrossToNetSeoMeta(6000).description).toContain("6 000 euros brut en net");
    expect(hub?.lastModified).toBe(GROSS_TO_NET_UPDATED_AT);
    expect(index?.lastModified).toBe(GROSS_TO_NET_UPDATED_AT);

    for (const amount of GROSS_TO_NET_AMOUNTS) {
      const page = pages.find((entry) => entry.path === grossToNetPath(amount));
      const seo = resolveGrossToNetSeoMeta(amount);
      const faq = buildPage1000FaqItems(amount);

      expect(page?.title).toBe(seo.title);
      expect(page?.lastModified).toBe(GROSS_TO_NET_REDESIGN_DATE_MODIFIED);
      expect(page?.indexable).toBe(true);
      expect(seo.title).toBe(`${formatPilotEuro(amount)} brut en net : combien ça fait ?`);
      expect(seo.h1).toBe(seo.title);
      expect(seo.description).not.toMatch(/\d[\d\s\u00a0\u202f]*€/);
      expect(faq).toHaveLength(5);
      expect(faq[0]?.question).toContain(formatPilotEuro(amount));
    }

    expect(seriesSource).toContain("GrossToNet1000PageContent");
    expect(netToGross2150Route).not.toContain("page-1000-pilot");
    expect(buildPage1000EndCtaHref()).toBe("/?brut=1000&profil=non-cadre");
    expect(buildPage1000EndCtaHref(2500)).toBe("/?brut=2500&profil=non-cadre");
    expect(blob).not.toContain("\u2014");
    expect(GROSS_TO_NET_UPDATED_AT).toBe("2026-07-15");
  });
});
