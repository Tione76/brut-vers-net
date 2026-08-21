import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import { roundCent } from "@/site/salary-calculator/conversions";
import {
  GROSS_TO_NET_AMOUNTS,
  GROSS_TO_NET_HUB_PATH,
  GROSS_TO_NET_INDEX_PATH,
  PUBLISHED_GROSS_TO_NET_AMOUNTS,
  grossToNetPath,
  isGrossToNetAmount,
  parseGrossToNetMontantParam,
} from "@/site/salaire-brut-net/config";
import {
  buildGrossToNetHubPayload,
  buildGrossToNetHubSeo,
} from "@/site/salaire-brut-net/hub";
import { buildGrossToNetIndexPayload } from "@/site/salaire-brut-net/series-index";
import {
  buildAllProfileNetEstimates,
  formatGrossShort,
} from "@/site/salaire-brut-net/data";
import {
  buildGrossToNetFaqItems,
  buildGrossToNetSeoMeta,
  getNearbyGrossToNetAmounts,
} from "@/site/salaire-brut-net/content";
import { getInverseNetToGrossLink } from "@/site/salaire-brut-net/cross-link";
import { buildWebPageJsonLd } from "@/site/schema";
import { GROSS_TO_NET_SERIES_COVER } from "@/site/guides/covers";
import { getAllPublicPages, getPlanDuSiteSections, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import {
  DRAFT_GROSS_TO_NET_AMOUNTS,
  DRAFT_GROSS_TO_NET_AMOUNTS_HALF_1,
  DRAFT_GROSS_TO_NET_AMOUNTS_HALF_2,
  DRAFT_GROSS_TO_NET_ENTRIES,
  assertDraftsNotPublished,
  assertHalf2Published,
  assertSeriesFullyPublished,
  isDraftGrossToNetAmount,
  prepareAllDraftGrossToNetFiches,
  prepareDraftGrossToNetFiche,
  prepareDraftGrossToNetFichesHalf2,
  prepareDraftGrossToNetHub,
  prepareDraftGrossToNetIndexPage,
  getFutureGrossToNetCatalog,
  getPreparedNearbyAmounts,
} from "./index";

const PUBLISHED_SAMPLES = [1000, 2000, 3500, 3550, 4500, 6000] as const;
const FORMER_DRAFT_AMOUNTS = Array.from({ length: 50 }, (_, i) => 3550 + i * 50);

describe("publication vague 2 salaire brut mensuel → net (3 550 → 6 000)", () => {
  it("publie exactement 101 montants de 1 000 à 6 000 et vide les brouillons", () => {
    assertSeriesFullyPublished();
    assertHalf2Published();
    assertDraftsNotPublished();

    expect(GROSS_TO_NET_AMOUNTS).toHaveLength(101);
    expect(PUBLISHED_GROSS_TO_NET_AMOUNTS).toBe(GROSS_TO_NET_AMOUNTS);
    expect(GROSS_TO_NET_AMOUNTS[0]).toBe(1000);
    expect(GROSS_TO_NET_AMOUNTS[100]).toBe(6000);

    expect(DRAFT_GROSS_TO_NET_AMOUNTS_HALF_1).toEqual([]);
    expect(DRAFT_GROSS_TO_NET_AMOUNTS_HALF_2).toEqual([]);
    expect(DRAFT_GROSS_TO_NET_AMOUNTS).toHaveLength(0);
    expect(DRAFT_GROSS_TO_NET_ENTRIES).toHaveLength(0);
    expect(prepareAllDraftGrossToNetFiches()).toHaveLength(0);
    expect(prepareDraftGrossToNetFichesHalf2()).toHaveLength(0);

    for (const amount of FORMER_DRAFT_AMOUNTS) {
      expect(isGrossToNetAmount(amount)).toBe(true);
      expect(isDraftGrossToNetAmount(amount)).toBe(false);
      expect(parseGrossToNetMontantParam(String(amount))).toBe(amount);
    }
  });

  it("expose Hub, Index et les 101 fiches dans sitemap / pages publiques / plan du site", () => {
    const publicPaths = new Set(getAllPublicPages().map((page) => page.path));
    const sitemapPaths = new Set(getSitemapEntries().map((entry) => entry.path));
    const planPaths = new Set(
      getPlanDuSiteSections().flatMap((section) => section.pages.map((page) => page.path)),
    );

    expect(publicPaths.has(GROSS_TO_NET_HUB_PATH)).toBe(true);
    expect(publicPaths.has(GROSS_TO_NET_INDEX_PATH)).toBe(true);
    expect(sitemapPaths.has(GROSS_TO_NET_HUB_PATH)).toBe(true);
    expect(sitemapPaths.has(GROSS_TO_NET_INDEX_PATH)).toBe(true);
    expect(isPathIndexable(GROSS_TO_NET_HUB_PATH)).toBe(true);
    expect(isPathIndexable(GROSS_TO_NET_INDEX_PATH)).toBe(true);

    expect(GROSS_TO_NET_AMOUNTS).toHaveLength(101);
    for (const amount of GROSS_TO_NET_AMOUNTS) {
      const path = grossToNetPath(amount);
      expect(publicPaths.has(path)).toBe(true);
      expect(sitemapPaths.has(path)).toBe(true);
      expect(planPaths.has(path)).toBe(true);
      expect(isPathIndexable(path)).toBe(true);
    }

    for (const amount of PUBLISHED_SAMPLES) {
      expect(isPathIndexable(grossToNetPath(amount))).toBe(true);
    }
  });

  it("complète automatiquement le Hub et l'Index à 101 entrées", () => {
    const seo = buildGrossToNetHubSeo();
    const hub = buildGrossToNetHubPayload();
    const indexPage = buildGrossToNetIndexPayload();

    expect(seo.title).toBe("Salaire brut mensuel en net : toutes les fiches");
    expect(seo.h1).toBe("Tous les salaires bruts mensuels convertis en net");
    expect(hub.path).toBe(GROSS_TO_NET_HUB_PATH);
    expect(hub.catalogCount).toBe(101);
    expect(hub.ficheLinks).toHaveLength(101);
    expect(hub.ficheLinks.some((link) => link.href.includes("3550"))).toBe(true);
    expect(hub.ficheLinks.some((link) => link.href.includes("6000"))).toBe(true);
    expect(hub.catalog.ranges.reduce((sum, range) => sum + range.links.length, 0)).toBe(101);

    expect(indexPage.path).toBe(GROSS_TO_NET_INDEX_PATH);
    expect(indexPage.rowCount).toBe(101);
    expect(indexPage.table.rows[0]).toMatchObject({
      grossMonthly: 1000,
      netMonthly: 780,
      netNonExecutive: 780,
      netExecutive: 750,
      netPublicService: 810,
    });
    expect(indexPage.table.rows.at(-1)).toMatchObject({
      grossMonthly: 6000,
      netNonExecutive: roundCent(6000 * 0.78),
      netExecutive: roundCent(6000 * 0.75),
      netPublicService: roundCent(6000 * 0.81),
    });
  });

  it("propose 7 montants proches sur toute la série (sauf extrémités)", () => {
    expect(getNearbyGrossToNetAmounts(1000)).toEqual([
      1050, 1100, 1150, 1200, 1250, 1300, 1350,
    ]);
    expect(getNearbyGrossToNetAmounts(2000)).toEqual([
      1950, 2050, 1900, 2100, 1850, 2150, 1800,
    ]);
    expect(getNearbyGrossToNetAmounts(3500)).toEqual([
      3450, 3550, 3400, 3600, 3350, 3650, 3300,
    ]);
    expect(getNearbyGrossToNetAmounts(4500)).toHaveLength(7);
    expect(getNearbyGrossToNetAmounts(4500)).not.toContain(4500);
    expect(getNearbyGrossToNetAmounts(6000)).toEqual([
      5950, 5900, 5850, 5800, 5750, 5700, 5650,
    ]);
    expect(getNearbyGrossToNetAmounts(1000)).not.toContain(1000);
    expect(getPreparedNearbyAmounts(2000)).toEqual(getNearbyGrossToNetAmounts(2000));
  });

  it("maille le croisé bas / milieu / haut de gamme sans auto-lien", () => {
    expect(getInverseNetToGrossLink(1000)).toBeNull();
    expect(getInverseNetToGrossLink(1050)).toBeNull();

    const mid = getInverseNetToGrossLink(2000);
    expect(mid).not.toBeNull();
    expect(mid?.matchedNetMonthly).toBe(1560);
    expect(mid?.href).toBe("/combien-gagner-brut-mensuel-pour-1560-net");
    expect(mid?.teaser).toContain("inverse");

    const high = getInverseNetToGrossLink(6000);
    expect(high).not.toBeNull();
    expect(high?.matchedNetMonthly).toBe(4700);
    expect(high?.href).toBe("/combien-gagner-brut-mensuel-pour-4700-net");
    expect(high?.href).not.toContain("6000-euros-brut");
  });

  it("synchronise FAQ visible et FAQPage sur un échantillon de fiches", () => {
    for (const amount of [1000, 3550, 6000] as const) {
      const seo = buildGrossToNetSeoMeta(amount);
      const estimates = buildAllProfileNetEstimates(amount);
      const faq = buildGrossToNetFaqItems(amount, estimates);
      const path = grossToNetPath(amount);
      const jsonLd = buildWebPageJsonLd({
        path,
        name: seo.title,
        description: seo.description,
        breadcrumbs: [
          { name: "Accueil", path: "/" },
          { name: `${formatGrossShort(amount)} brut en net`, path },
        ],
        cover: GROSS_TO_NET_SERIES_COVER,
        faq,
        withAuthor: true,
      });
      const graph = (jsonLd as { "@graph"?: Array<Record<string, unknown>> })["@graph"] ?? [];
      const faqNode = graph.find((node) => node["@type"] === "FAQPage") as
        | { mainEntity?: Array<{ name?: string; acceptedAnswer?: { text?: string } }> }
        | undefined;

      expect(faq).toHaveLength(3);
      expect(faqNode?.mainEntity).toHaveLength(3);
      for (let i = 0; i < faq.length; i += 1) {
        expect(faqNode?.mainEntity?.[i]?.name).toBe(faq[i]?.question);
        expect(faqNode?.mainEntity?.[i]?.acceptedAnswer?.text).toBe(faq[i]?.answer);
      }
      expect(faq[0]?.question).toMatch(
        new RegExp(String(amount).replace(/(\d)(?=(\d{3})+$)/g, "$1[\\u00a0\\u202f ]?")),
      );
      expect(estimates.nonExecutive.netMonthly).toBe(
        roundCent(amount * getProfileCoefficient("nonExecutive")),
      );
    }
  });

  it("n'importe pas le dossier drafts depuis les routes app ni public-pages", () => {
    const forbiddenImport =
      /from\s+["']@\/drafts\/salaire-brut-net|from\s+["'][^"']*drafts\/salaire-brut-net/;
    const files = [
      resolve(process.cwd(), "src/site/public-pages.ts"),
      resolve(process.cwd(), "src/app/salaire-brut-net/[montant]/page.tsx"),
      resolve(process.cwd(), "src/app/salaire-brut-mensuel-en-net/page.tsx"),
      resolve(process.cwd(), "src/app/tableau-salaire-brut-mensuel-en-net/page.tsx"),
    ];

    for (const file of files) {
      expect(readFileSync(file, "utf8")).not.toMatch(forbiddenImport);
    }

    const pageSource = readFileSync(files[1]!, "utf8");
    expect(pageSource).toContain("GROSS_TO_NET_AMOUNTS.map");
    expect(pageSource).not.toContain("DRAFT_GROSS_TO_NET_AMOUNTS");
  });

  it("refuse de préparer une fiche déjà publiée via prepareDraft", () => {
    expect(() => prepareDraftGrossToNetFiche(1000)).toThrow(/hors brouillons/);
    expect(() => prepareDraftGrossToNetFiche(3550)).toThrow(/hors brouillons/);
    expect(() => prepareDraftGrossToNetFiche(6000)).toThrow(/hors brouillons/);
  });

  it("aligne les helpers brouillon sur le catalogue publié (101)", () => {
    const hub = prepareDraftGrossToNetHub();
    const indexPage = prepareDraftGrossToNetIndexPage();

    expect(hub.catalogCount).toBe(101);
    expect(hub.draftCount).toBe(0);
    expect(indexPage.rowCount).toBe(101);
    expect(getFutureGrossToNetCatalog()).toHaveLength(101);
  });
});
