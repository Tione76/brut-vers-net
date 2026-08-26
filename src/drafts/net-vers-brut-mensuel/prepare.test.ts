import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { roundCent } from "@/site/salary-calculator/conversions";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import {
  NET_TO_GROSS_AMOUNTS,
  PUBLISHED_NET_TO_GROSS_AMOUNTS,
  isNetToGrossAmount,
  netToGrossPath,
  parseNetToGrossMontantParam,
} from "@/site/salaire-net-brut/config";
import { getSeriesNearbyAmounts } from "@/site/salaire-net-brut/page-1500-content";
import { buildNetToGrossHubPayload } from "@/site/salaire-net-brut/hub";
import { buildNetToGrossIndexRows } from "@/site/salaire-net-brut/index-table";
import {
  getAllPublicPages,
  getPlanDuSiteSections,
  getSitemapEntries,
  isPathIndexable,
} from "@/site/public-pages";
import { siteConfig } from "@/site/site.config";
import {
  DRAFT_NET_TO_GROSS_AMOUNTS,
  DRAFT_NET_TO_GROSS_ENTRIES,
  assertDraftsNotPublished,
  assertExtendedSeriesPublished,
  assertPublishedHundredsIntact,
  assertTenEuroIntermediatesPrepared,
  buildDraftNetToGrossPublicationBatches,
  buildFuturePublishedCatalog,
  isDraftNetToGrossAmount,
  prepareAllDraftNetToGrossFiches,
  prepareDraftNetToGrossFiche,
  getPreparedNearbyAmounts,
} from "./index";

const WAVE3_BATCH = [
  2510, 2520, 2530, 2540, 2550, 2560, 2570, 2580, 2590, 2610, 2620, 2630, 2640, 2650, 2660,
  2670, 2680, 2690, 2710, 2720, 2730, 2740, 2750, 2760, 2770, 2780, 2790, 2810, 2820, 2830,
  2840, 2850, 2860, 2870, 2880, 2890, 2910, 2920, 2930, 2940, 2950, 2960, 2970, 2980, 2990,
] as const;

const PUBLISHED_SAMPLES = [1500, 1550, 2010, 2510, 2750, 2990, 3100, 4000, 5000, 6000] as const;
const DRAFT_SAMPLES = [3010, 3050, 3550, 4550, 5010, 5550, 5990] as const;
const WAVE3_SEO_SAMPLES = [2510, 2750, 2990] as const;

function collectStrings(value: unknown, acc: string[] = []): string[] {
  if (typeof value === "string") {
    acc.push(value);
    return acc;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, acc);
    return acc;
  }
  if (value && typeof value === "object") {
    for (const item of Object.values(value)) collectStrings(item, acc);
  }
  return acc;
}

describe("publication vague 3 intermédiaires net→brut (2510 → 2990)", () => {
  it("valide 181 publiés + 270 brouillons + 451 totaux sans trou", () => {
    assertPublishedHundredsIntact();
    assertTenEuroIntermediatesPrepared();
    assertDraftsNotPublished();
    assertExtendedSeriesPublished();

    expect(NET_TO_GROSS_AMOUNTS).toHaveLength(181);
    expect(PUBLISHED_NET_TO_GROSS_AMOUNTS).toBe(NET_TO_GROSS_AMOUNTS);
    expect(NET_TO_GROSS_AMOUNTS[0]).toBe(1500);
    expect(NET_TO_GROSS_AMOUNTS[NET_TO_GROSS_AMOUNTS.length - 1]).toBe(6000);

    expect(DRAFT_NET_TO_GROSS_AMOUNTS).toHaveLength(270);
    expect(DRAFT_NET_TO_GROSS_ENTRIES).toHaveLength(270);
    expect(DRAFT_NET_TO_GROSS_AMOUNTS[0]).toBe(3010);
    expect(DRAFT_NET_TO_GROSS_AMOUNTS[269]).toBe(5990);
    expect(prepareAllDraftNetToGrossFiches()).toHaveLength(270);

    const future = buildFuturePublishedCatalog();
    expect(future).toHaveLength(451);
    expect(future[0]).toBe(1500);
    expect(future[450]).toBe(6000);

    const publishedSet = new Set<number>(NET_TO_GROSS_AMOUNTS as readonly number[]);
    const draftSet = new Set(DRAFT_NET_TO_GROSS_AMOUNTS);

    for (const amount of WAVE3_BATCH) {
      expect(publishedSet.has(amount)).toBe(true);
      expect(draftSet.has(amount)).toBe(false);
      expect(isNetToGrossAmount(amount)).toBe(true);
      expect(isDraftNetToGrossAmount(amount)).toBe(false);
      expect(parseNetToGrossMontantParam(String(amount))).toBe(amount);
    }

    for (const amount of DRAFT_NET_TO_GROSS_AMOUNTS) {
      expect(amount % 10).toBe(0);
      expect(amount % 100).not.toBe(0);
      expect(publishedSet.has(amount)).toBe(false);
      expect(isDraftNetToGrossAmount(amount)).toBe(true);
      expect(isNetToGrossAmount(amount)).toBe(false);
      expect(parseNetToGrossMontantParam(String(amount))).toBeNull();
    }

    expect(isNetToGrossAmount(1510)).toBe(true);
    expect(isNetToGrossAmount(2490)).toBe(true);
    expect(isNetToGrossAmount(2510)).toBe(true);
    expect(isNetToGrossAmount(2990)).toBe(true);
    expect(isDraftNetToGrossAmount(3010)).toBe(true);
    expect(isDraftNetToGrossAmount(5990)).toBe(true);
    expect(isNetToGrossAmount(3010)).toBe(false);

    expect(buildDraftNetToGrossPublicationBatches(45)).toHaveLength(6);
    expect(buildDraftNetToGrossPublicationBatches(45)[0]?.[0]).toBe(3010);
    expect(buildDraftNetToGrossPublicationBatches(45)[0]).toHaveLength(45);
  });
});

describe("anti-fuite publique des brouillons net→brut restants", () => {
  it("indexe les 181 publiés et exclut les drafts restants", () => {
    const publicPaths = new Set(getAllPublicPages().map((page) => page.path));
    const sitemapPaths = new Set(getSitemapEntries().map((entry) => entry.path));
    const planPaths = new Set(
      getPlanDuSiteSections().flatMap((section) => section.pages.map((page) => page.path)),
    );

    expect(NET_TO_GROSS_AMOUNTS).toHaveLength(181);
    for (const amount of NET_TO_GROSS_AMOUNTS) {
      const path = netToGrossPath(amount);
      expect(path).toBe(`/combien-gagner-brut-mensuel-pour-${amount}-net`);
      expect(publicPaths.has(path)).toBe(true);
      expect(sitemapPaths.has(path)).toBe(true);
      expect(planPaths.has(path)).toBe(true);
      expect(isPathIndexable(path)).toBe(true);
    }

    for (const amount of DRAFT_SAMPLES) {
      const path = netToGrossPath(amount);
      expect(publicPaths.has(path)).toBe(false);
      expect(sitemapPaths.has(path)).toBe(false);
      expect(planPaths.has(path)).toBe(false);
      expect(isPathIndexable(path)).toBe(false);
    }

    expect(prepareDraftNetToGrossFiche(1500).canonical).toBe(
      "https://brut-vers-net.fr/combien-gagner-brut-mensuel-pour-1500-net",
    );
  });

  it("intègre le lot au Hub/Index et exclut les drafts du Nearby public", () => {
    const hub = buildNetToGrossHubPayload();
    const indexRows = buildNetToGrossIndexRows();
    const hubAmounts = hub.ficheLinks.map((link) => link.amount);
    const indexAmounts = indexRows.map((row) => row.netMonthly);

    expect(hub.catalogCount).toBe(181);
    expect(hub.ficheLinks).toHaveLength(181);
    expect(indexRows).toHaveLength(181);
    expect(hubAmounts).toEqual([...NET_TO_GROSS_AMOUNTS]);
    expect(indexAmounts).toEqual([...NET_TO_GROSS_AMOUNTS]);

    for (const amount of WAVE3_BATCH) {
      expect(hubAmounts).toContain(amount);
      expect(indexAmounts).toContain(amount);
    }
    for (const draft of DRAFT_SAMPLES) {
      expect(hubAmounts).not.toContain(draft);
      expect(indexAmounts).not.toContain(draft);
    }

    for (const amount of PUBLISHED_SAMPLES) {
      const nearby = getSeriesNearbyAmounts(amount);
      expect(nearby).toHaveLength(7);
      expect(nearby).not.toContain(amount);
      expect(nearby.every((item) => isNetToGrossAmount(item))).toBe(true);
      expect(nearby.every((item) => !isDraftNetToGrossAmount(item))).toBe(true);
    }

    expect(getSeriesNearbyAmounts(2510)).toEqual([
      2500, 2520, 2490, 2530, 2480, 2540, 2470,
    ]);
  });

  it("n'importe pas le dossier drafts depuis les routes app ni public-pages", () => {
    const roots = [
      resolve(process.cwd(), "src/site/public-pages.ts"),
      resolve(process.cwd(), "src/site/site.config.ts"),
      resolve(process.cwd(), "src/app/net-vers-brut/[montant]/page.tsx"),
      resolve(process.cwd(), "src/app/salaire-net-mensuel-en-brut/page.tsx"),
      resolve(process.cwd(), "src/app/tableau-salaire-net-mensuel-en-brut/page.tsx"),
    ];

    const forbidden = /@\/drafts\/net-vers-brut-mensuel|drafts\/net-vers-brut-mensuel/;

    for (const filePath of roots) {
      const source = readFileSync(filePath, "utf8");
      expect(source).not.toMatch(forbidden);
    }

    const pageSource = readFileSync(roots[2]!, "utf8");
    expect(pageSource).toContain("NET_TO_GROSS_AMOUNTS.map");
    expect(pageSource).not.toContain("DRAFT_NET_TO_GROSS_AMOUNTS");
  });
});

describe("SEO / Schema des fiches vague 3", () => {
  it.each(WAVE3_SEO_SAMPLES)("prépare la fiche publiée %s € sans fuite de montant", (amount) => {
    const fiche = prepareDraftNetToGrossFiche(amount);
    const netLabel = fiche.netLabel;

    expect(fiche.status).toBe("published");
    expect(fiche.path).toBe(`/combien-gagner-brut-mensuel-pour-${amount}-net`);
    expect(fiche.canonical).toBe(`${siteConfig.url}${fiche.path}`);
    expect(fiche.canonical).not.toContain("www.");
    expect(fiche.seo.h1).toContain(netLabel);
    expect(fiche.seo.title).toContain(netLabel);
    expect(fiche.seo.description).toContain(netLabel);
    expect(fiche.estimates.nonExecutive.grossMonthly).toBe(roundCent(amount / 0.78));
    expect(fiche.faq).toHaveLength(3);
    expect(fiche.nearbyAmounts.every((item) => isNetToGrossAmount(item))).toBe(true);
    expect(fiche.nearbyAmounts.every((item) => !isDraftNetToGrossAmount(item))).toBe(true);

    const graph = (fiche.jsonLd as { "@graph"?: unknown[] })["@graph"] ?? [];
    const types = graph.map((node) => (node as { "@type"?: string })["@type"]);
    expect(types).toEqual(
      expect.arrayContaining([
        "WebPage",
        "BreadcrumbList",
        "FAQPage",
        "Organization",
        "WebSite",
        "Person",
        "ImageObject",
      ]),
    );

    const blob = collectStrings(fiche).join(" ");
    expect(blob).not.toContain("\u2014");
  });

  it("garantit des titles et H1 uniques sur tout le catalogue publié", () => {
    const titles = new Set<string>();
    const h1s = new Set<string>();
    for (const amount of NET_TO_GROSS_AMOUNTS) {
      const fiche = prepareDraftNetToGrossFiche(amount);
      expect(titles.has(fiche.seo.title)).toBe(false);
      expect(h1s.has(fiche.seo.h1)).toBe(false);
      titles.add(fiche.seo.title);
      h1s.add(fiche.seo.h1);
    }
    expect(titles.size).toBe(181);
    expect(h1s.size).toBe(181);
  });
});

describe("brouillons restants représentatifs", () => {
  it.each(DRAFT_SAMPLES)("prépare encore la fiche draft %s €", (amount) => {
    const fiche = prepareDraftNetToGrossFiche(amount);
    expect(fiche.status).toBe("draft");
    expect(fiche.path).toBe(`/combien-gagner-brut-mensuel-pour-${amount}-net`);
    expect(fiche.nearbyAmounts).toEqual(getPreparedNearbyAmounts(amount));
    expect(fiche.estimates.executive.grossMonthly).toBe(
      roundCent(amount / getProfileCoefficient("executive")),
    );
  });
});
