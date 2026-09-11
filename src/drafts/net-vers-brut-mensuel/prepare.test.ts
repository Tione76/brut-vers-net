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
} from "./index";

const WAVE9_BATCH = [
  5510, 5520, 5530, 5540, 5550, 5560, 5570, 5580, 5590, 5610, 5620, 5630, 5640, 5650, 5660,
  5670, 5680, 5690, 5710, 5720, 5730, 5740, 5750, 5760, 5770, 5780, 5790, 5810, 5820, 5830,
  5840, 5850, 5860, 5870, 5880, 5890, 5910, 5920, 5930, 5940, 5950, 5960, 5970, 5980, 5990,
] as const;

const PUBLISHED_SAMPLES = [1500, 1550, 3510, 4490, 4990, 5010, 5490, 5510, 5750, 5990, 6000] as const;
const FORMER_DRAFT_SAMPLES = [5510, 5550, 5710, 5850, 5990] as const;
const WAVE9_SEO_SAMPLES = [5510, 5750, 5990] as const;

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

describe("publication vague 9 intermédiaires net→brut (5510 → 5990, série complète)", () => {
  it("valide 451 publiés + 0 brouillon + 451 totaux sans trou", () => {
    assertPublishedHundredsIntact();
    assertTenEuroIntermediatesPrepared();
    assertDraftsNotPublished();
    assertExtendedSeriesPublished();

    expect(NET_TO_GROSS_AMOUNTS).toHaveLength(451);
    expect(PUBLISHED_NET_TO_GROSS_AMOUNTS).toBe(NET_TO_GROSS_AMOUNTS);
    expect(NET_TO_GROSS_AMOUNTS[0]).toBe(1500);
    expect(NET_TO_GROSS_AMOUNTS[NET_TO_GROSS_AMOUNTS.length - 1]).toBe(6000);

    expect(DRAFT_NET_TO_GROSS_AMOUNTS).toHaveLength(0);
    expect(DRAFT_NET_TO_GROSS_ENTRIES).toHaveLength(0);
    expect(prepareAllDraftNetToGrossFiches()).toHaveLength(0);

    const future = buildFuturePublishedCatalog();
    expect(future).toHaveLength(451);
    expect(future[0]).toBe(1500);
    expect(future[450]).toBe(6000);
    expect(future).toEqual([...NET_TO_GROSS_AMOUNTS]);

    const publishedSet = new Set<number>(NET_TO_GROSS_AMOUNTS as readonly number[]);
    const draftSet = new Set(DRAFT_NET_TO_GROSS_AMOUNTS);

    for (const amount of WAVE9_BATCH) {
      expect(publishedSet.has(amount)).toBe(true);
      expect(draftSet.has(amount)).toBe(false);
      expect(isNetToGrossAmount(amount)).toBe(true);
      expect(isDraftNetToGrossAmount(amount)).toBe(false);
      expect(parseNetToGrossMontantParam(String(amount))).toBe(amount);
    }

    expect(isNetToGrossAmount(1510)).toBe(true);
    expect(isNetToGrossAmount(5490)).toBe(true);
    expect(isNetToGrossAmount(5510)).toBe(true);
    expect(isNetToGrossAmount(5990)).toBe(true);
    expect(isDraftNetToGrossAmount(5510)).toBe(false);
    expect(isDraftNetToGrossAmount(5990)).toBe(false);

    expect(buildDraftNetToGrossPublicationBatches(45)).toHaveLength(0);
  });
});

describe("surfaces publiques net→brut après série complète", () => {
  it(
    "indexe les 451 publiés (vague 9 incluse)",
    () => {
      const publicPaths = new Set(getAllPublicPages().map((page) => page.path));
      const sitemapPaths = new Set(getSitemapEntries().map((entry) => entry.path));
      const planPaths = new Set(
        getPlanDuSiteSections().flatMap((section) => section.pages.map((page) => page.path)),
      );

      expect(NET_TO_GROSS_AMOUNTS).toHaveLength(451);
      expect(publicPaths.size).toBeGreaterThanOrEqual(451);
      expect(sitemapPaths.size).toBeGreaterThanOrEqual(451);

      for (const amount of WAVE9_BATCH) {
        const path = netToGrossPath(amount);
        expect(path).toBe(`/combien-gagner-brut-mensuel-pour-${amount}-net`);
        expect(publicPaths.has(path)).toBe(true);
        expect(sitemapPaths.has(path)).toBe(true);
        expect(planPaths.has(path)).toBe(true);
        expect(isPathIndexable(path)).toBe(true);
      }

      for (const amount of FORMER_DRAFT_SAMPLES) {
        const path = netToGrossPath(amount);
        expect(publicPaths.has(path)).toBe(true);
        expect(sitemapPaths.has(path)).toBe(true);
        expect(planPaths.has(path)).toBe(true);
        expect(isPathIndexable(path)).toBe(true);
      }

      // Spot-check du catalogue complet (échantillon + bornes)
      for (const amount of [1500, 2500, 3500, 4500, 5500, 6000, ...PUBLISHED_SAMPLES] as const) {
        const path = netToGrossPath(amount);
        expect(publicPaths.has(path)).toBe(true);
        expect(sitemapPaths.has(path)).toBe(true);
        expect(isPathIndexable(path)).toBe(true);
      }

      expect(prepareDraftNetToGrossFiche(1500).canonical).toBe(
        "https://brut-vers-net.fr/combien-gagner-brut-mensuel-pour-1500-net",
      );
    },
    90_000,
  );

  it("intègre le lot au Hub/Index et recalcule le Nearby public sans draft", () => {
    const hub = buildNetToGrossHubPayload();
    const indexRows = buildNetToGrossIndexRows();
    const hubAmounts = hub.ficheLinks.map((link) => link.amount);
    const indexAmounts = indexRows.map((row) => row.netMonthly);

    expect(hub.catalogCount).toBe(451);
    expect(hub.ficheLinks).toHaveLength(451);
    expect(indexRows).toHaveLength(451);
    expect(hubAmounts).toEqual([...NET_TO_GROSS_AMOUNTS]);
    expect(indexAmounts).toEqual([...NET_TO_GROSS_AMOUNTS]);

    for (const amount of WAVE9_BATCH) {
      expect(hubAmounts).toContain(amount);
      expect(indexAmounts).toContain(amount);
    }

    for (const amount of PUBLISHED_SAMPLES) {
      const nearby = getSeriesNearbyAmounts(amount);
      expect(nearby).toHaveLength(7);
      expect(nearby).not.toContain(amount);
      expect(nearby.every((item) => isNetToGrossAmount(item))).toBe(true);
      expect(nearby.every((item) => !isDraftNetToGrossAmount(item))).toBe(true);
    }

    expect(getSeriesNearbyAmounts(5510)).toEqual([
      5500, 5520, 5490, 5530, 5480, 5540, 5470,
    ]);
    expect(getSeriesNearbyAmounts(5990)).toEqual([
      5980, 6000, 5970, 5960, 5950, 5940, 5930,
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

describe("SEO / Schema des fiches vague 9", () => {
  it.each(WAVE9_SEO_SAMPLES)("prépare la fiche publiée %s € sans fuite de montant", (amount) => {
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

  it(
    "garantit des titles et H1 uniques sur tout le catalogue publié",
    () => {
      const titles = new Set<string>();
      const h1s = new Set<string>();
      for (const amount of NET_TO_GROSS_AMOUNTS) {
        const fiche = prepareDraftNetToGrossFiche(amount);
        expect(titles.has(fiche.seo.title)).toBe(false);
        expect(h1s.has(fiche.seo.h1)).toBe(false);
        titles.add(fiche.seo.title);
        h1s.add(fiche.seo.h1);
      }
      expect(titles.size).toBe(451);
      expect(h1s.size).toBe(451);
    },
    45_000,
  );
});

describe("anciens brouillons désormais publiés", () => {
  it.each(FORMER_DRAFT_SAMPLES)("prépare la fiche publiée %s € (ex-draft)", (amount) => {
    const fiche = prepareDraftNetToGrossFiche(amount);
    expect(fiche.status).toBe("published");
    expect(fiche.path).toBe(`/combien-gagner-brut-mensuel-pour-${amount}-net`);
    expect(fiche.nearbyAmounts).toEqual(getSeriesNearbyAmounts(amount));
    expect(fiche.estimates.executive.grossMonthly).toBe(
      roundCent(amount / getProfileCoefficient("executive")),
    );
  });
});
