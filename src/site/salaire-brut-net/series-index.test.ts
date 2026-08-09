import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import { roundCent } from "@/site/salary-calculator/conversions";
import { getAllPublicPages, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import { siteConfig } from "@/site/site.config";
import { DRAFT_GROSS_TO_NET_AMOUNTS } from "@/drafts/salaire-brut-net/amounts";
import {
  GROSS_TO_NET_HUB_PATH,
  GROSS_TO_NET_INDEX_PATH,
  PUBLISHED_GROSS_TO_NET_AMOUNTS,
  grossToNetPath,
} from "./config";
import { estimateNetMonthlyFromGross } from "./data";
import { buildGrossToNetHubSeo } from "./hub";
import {
  buildGrossToNetIndexRows,
  findPublishedGrossNearest,
  grossToNetIndexRowId,
  isGrossToNetMilestoneAmount,
  parseGrossSearchInput,
} from "./index-table";
import {
  buildGrossToNetIndexFaq,
  buildGrossToNetIndexPayload,
  buildGrossToNetIndexSeo,
  buildGrossToNetIndexToc,
} from "./series-index";

const SAMPLE_AMOUNTS = [1000, 1500, 2000, 2500, 3000, 3500] as const;

describe("page Index tableau salaire brut mensuel en net", () => {
  it("construit exactement les montants publiés, sans brouillon ni doublon", () => {
    const rows = buildGrossToNetIndexRows();
    const amounts = rows.map((row) => row.grossMonthly);

    expect(rows).toHaveLength(PUBLISHED_GROSS_TO_NET_AMOUNTS.length);
    expect(rows).toHaveLength(51);
    expect(amounts).toEqual([...PUBLISHED_GROSS_TO_NET_AMOUNTS]);
    expect(new Set(amounts).size).toBe(amounts.length);
    expect(amounts[0]).toBe(1000);
    expect(amounts.at(-1)).toBe(3500);

    for (const draft of DRAFT_GROSS_TO_NET_AMOUNTS) {
      expect(amounts).not.toContain(draft);
    }
  });

  it("calcule les trois nets via les estimateurs / coefficients du site", () => {
    for (const amount of SAMPLE_AMOUNTS) {
      const row = buildGrossToNetIndexRows().find((item) => item.grossMonthly === amount);
      expect(row).toBeDefined();
      expect(row!.href).toBe(grossToNetPath(amount));
      expect(row!.netNonExecutive).toBe(estimateNetMonthlyFromGross(amount, "nonExecutive"));
      expect(row!.netExecutive).toBe(estimateNetMonthlyFromGross(amount, "executive"));
      expect(row!.netPublicService).toBe(estimateNetMonthlyFromGross(amount, "publicService"));
      expect(row!.netMonthly).toBe(row!.netNonExecutive);
      expect(row!.netNonExecutive).toBe(roundCent(amount * getProfileCoefficient("nonExecutive")));
      expect(row!.netExecutive).toBe(roundCent(amount * getProfileCoefficient("executive")));
      expect(row!.netPublicService).toBe(roundCent(amount * getProfileCoefficient("publicService")));
    }

    expect(buildGrossToNetIndexRows().find((row) => row.grossMonthly === 1000)).toMatchObject({
      netNonExecutive: 780,
      netExecutive: 750,
      netPublicService: 810,
    });
  });

  it("marque un repère visuel tous les 500 €", () => {
    const rows = buildGrossToNetIndexRows();
    for (const amount of SAMPLE_AMOUNTS) {
      expect(isGrossToNetMilestoneAmount(amount)).toBe(true);
      expect(rows.find((row) => row.grossMonthly === amount)?.isMilestone).toBe(true);
    }
    expect(isGrossToNetMilestoneAmount(1050)).toBe(false);
    expect(isGrossToNetMilestoneAmount(4000)).toBe(true);
    expect(rows.find((row) => row.grossMonthly === 1050)?.isMilestone).toBe(false);
    expect(rows.some((row) => row.grossMonthly > 3500)).toBe(false);
  });

  it("expose un mini-sommaire avec des ancres uniques", () => {
    const toc = buildGrossToNetIndexToc();
    const page = buildGrossToNetIndexPayload();
    const pageSource = readFileSync(
      resolve(process.cwd(), "src/site/salaire-brut-net/series-index-page.tsx"),
      "utf8",
    );

    expect(toc.map((entry) => entry.id)).toEqual([
      "index-table",
      "index-lire-tableau",
      "index-ecarts-statut",
      "index-calcul-precis",
      "index-faq",
    ]);
    expect(new Set(toc.map((entry) => entry.id)).size).toBe(toc.length);
    expect(page.toc).toEqual(toc);
    expect(pageSource).toContain('href={`#${entry.id}`}');
    expect(pageSource).toContain('id="index-table"');
    expect(pageSource).toContain("id={`index-${id}`}");
    expect(pageSource).toContain('id="index-faq"');
    expect(pageSource).toContain("Sur cette page");
  });

  it("navigue vers un montant exact ou le plus proche publié", () => {
    expect(parseGrossSearchInput("2 300 €")).toBe(2300);
    expect(parseGrossSearchInput("2300")).toBe(2300);
    expect(parseGrossSearchInput("")).toBeNull();
    expect(findPublishedGrossNearest(2300)).toEqual({ amount: 2300, exact: true });
    expect(findPublishedGrossNearest(2310)).toEqual({ amount: 2300, exact: false });
    expect(findPublishedGrossNearest(2326)).toEqual({ amount: 2350, exact: false });
    expect(grossToNetIndexRowId(2300)).toBe("index-row-2300");

    const pageSource = readFileSync(
      resolve(process.cwd(), "src/site/salaire-brut-net/series-index-page.tsx"),
      "utf8",
    );
    const searchSource = readFileSync(
      resolve(process.cwd(), "src/site/salaire-brut-net/series-index-search.tsx"),
      "utf8",
    );
    expect(pageSource).toContain("GrossToNetIndexTableSearch");
    expect(searchSource).toContain("Rechercher un salaire brut");
  });

  it("ne mentionne plus « Point de départ » et expose 4 colonnes", () => {
    const page = buildGrossToNetIndexPayload();
    const pageSource = readFileSync(
      resolve(process.cwd(), "src/site/salaire-brut-net/series-index-page.tsx"),
      "utf8",
    );

    expect(page.table.columns.map((column) => column.id)).toEqual([
      "gross",
      "nonExecutive",
      "executive",
      "publicService",
    ]);
    expect(pageSource).not.toMatch(/Point de départ/i);
    expect(pageSource).not.toContain("isPilot");
    expect(JSON.stringify(page)).not.toMatch(/Point de départ/i);
    expect(pageSource).toContain("Pour aller plus loin");
    expect(pageSource).not.toContain("Continuer dans la série");
    expect(JSON.stringify(page)).not.toMatch(/référence officielle/i);
  });

  it("aligne SEO : Title ≠ H1, différencié du Hub, canonical et indexation", () => {
    const seo = buildGrossToNetIndexSeo();
    const hubSeo = buildGrossToNetHubSeo();
    const page = buildGrossToNetIndexPayload();

    expect(seo.title).toBe("Tableau salaire brut mensuel en net");
    expect(seo.h1).toBe("Tableau salaire brut en net : conversion mensuelle");
    expect(seo.title).not.toBe(seo.h1);
    expect(seo.title).not.toBe(hubSeo.title);
    expect(seo.h1).not.toBe(hubSeo.h1);
    expect(seo.description).not.toBe(hubSeo.description);
    expect(seo.description).toContain("non-cadre");
    expect(seo.description).toContain("cadre");
    expect(seo.description).toContain("fonction publique");
    expect([...seo.description].length).toBeLessThanOrEqual(160);

    expect(page.path).toBe(GROSS_TO_NET_INDEX_PATH);
    expect(page.canonical).toBe(`${siteConfig.url}${GROSS_TO_NET_INDEX_PATH}`);
    expect(page.canonical).toBe("https://brut-vers-net.fr/tableau-salaire-brut-mensuel-en-net");
    expect(page.hubPath).toBe(GROSS_TO_NET_HUB_PATH);
    expect(page.calculatorPath).toBe("/");
    expect(isPathIndexable(page.path)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === page.path)).toBe(true);
    expect(getAllPublicPages().some((item) => item.path === page.path && item.indexable)).toBe(
      true,
    );
  });

  it("synchronise FAQ visible et FAQPage JSON-LD sans question redondante", () => {
    const faq = buildGrossToNetIndexFaq();
    const page = buildGrossToNetIndexPayload();
    const graph = (page.jsonLd as { "@graph"?: Array<Record<string, unknown>> })["@graph"] ?? [];
    const faqNode = graph.find((node) => node["@type"] === "FAQPage") as
      | { mainEntity?: Array<{ name?: string; acceptedAnswer?: { text?: string } }> }
      | undefined;

    expect(faq).toHaveLength(4);
    expect(page.faq).toEqual(faq);
    expect(faq.some((item) => item.question.includes("fiche de paie"))).toBe(true);
    expect(
      faq.some((item) =>
        item.question.includes(
          "Pourquoi le salaire net diffère-t-il entre un non-cadre, un cadre et la fonction publique",
        ),
      ),
    ).toBe(false);

    const nonExecutive = getProfileCoefficient("nonExecutive");
    expect(faq[1]?.answer).toContain(nonExecutive.toFixed(2).replace(".", ","));
    expect(faq[1]?.answer).toContain(String(Math.round((1 - nonExecutive) * 100)));

    expect(faqNode).toBeDefined();
    expect(faqNode?.mainEntity).toHaveLength(4);

    for (let i = 0; i < faq.length; i += 1) {
      expect(faqNode?.mainEntity?.[i]?.name).toBe(faq[i]?.question);
      expect(faqNode?.mainEntity?.[i]?.acceptedAnswer?.text).toBe(faq[i]?.answer);
    }

    const types = graph.map((node) => node["@type"]);
    expect(types).toEqual(
      expect.arrayContaining([
        "WebPage",
        "BreadcrumbList",
        "FAQPage",
        "Organization",
        "WebSite",
        "Person",
      ]),
    );
  });

  it("maille Hub, calculateur et fiches publiées uniquement", () => {
    const page = buildGrossToNetIndexPayload();
    const pageSource = readFileSync(
      resolve(process.cwd(), "src/site/salaire-brut-net/series-index-page.tsx"),
      "utf8",
    );

    expect(page.hubPath).toBe("/salaire-brut-mensuel-en-net");
    expect(page.calculatorPath).toBe("/");
    expect(pageSource).toContain("page.hubPath");
    expect(pageSource).toContain("page.calculatorPath");
    expect(pageSource).toContain("Pour aller plus loin");

    for (const row of page.table.rows) {
      expect(row.href).toBe(grossToNetPath(row.grossMonthly));
      expect(row.grossMonthly).toBeLessThanOrEqual(3500);
      expect(row.href).not.toContain("3550");
    }
  });
});
