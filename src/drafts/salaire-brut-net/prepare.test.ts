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
import { getNearbyGrossToNetAmounts } from "@/site/salaire-brut-net/content";
import { getAllPublicPages, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import { siteConfig } from "@/site/site.config";
import {
  DRAFT_GROSS_TO_NET_AMOUNTS,
  DRAFT_GROSS_TO_NET_AMOUNTS_HALF_1,
  DRAFT_GROSS_TO_NET_AMOUNTS_HALF_2,
  DRAFT_GROSS_TO_NET_ENTRIES,
  DRAFT_GROSS_TO_NET_HUB_PATH,
  DRAFT_GROSS_TO_NET_INDEX_PATH,
  DRAFT_GROSS_TO_NET_STATUS,
  assertDraftsNotPublished,
  assertHalf1Published,
  buildDraftGrossToNetIndexRows,
  getFutureGrossToNetCatalog,
  getInverseGrossToNetLink,
  getInverseNetToGrossLink,
  getPreparedNearbyAmounts,
  isDraftGrossToNetAmount,
  prepareDraftGrossToNetFiche,
  prepareDraftGrossToNetHub,
  prepareDraftGrossToNetIndexPage,
} from "./index";

const PUBLISHED_SAMPLES = [1000, 1050, 2000, 3500] as const;
const DRAFT_SAMPLES = [3550, 4500, 6000] as const;

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

describe("publication vague 1 salaire brut mensuel → net (1 000 → 3 500)", () => {
  it("publie exactement 51 montants et laisse 50 brouillons (3 550 → 6 000)", () => {
    assertHalf1Published();
    assertDraftsNotPublished();

    expect(GROSS_TO_NET_AMOUNTS).toHaveLength(51);
    expect(PUBLISHED_GROSS_TO_NET_AMOUNTS).toBe(GROSS_TO_NET_AMOUNTS);
    expect(GROSS_TO_NET_AMOUNTS[0]).toBe(1000);
    expect(GROSS_TO_NET_AMOUNTS[50]).toBe(3500);

    expect(DRAFT_GROSS_TO_NET_AMOUNTS_HALF_1).toEqual([]);
    expect(DRAFT_GROSS_TO_NET_AMOUNTS).toHaveLength(50);
    expect(DRAFT_GROSS_TO_NET_AMOUNTS_HALF_2).toHaveLength(50);
    expect(DRAFT_GROSS_TO_NET_AMOUNTS[0]).toBe(3550);
    expect(DRAFT_GROSS_TO_NET_AMOUNTS[49]).toBe(6000);

    for (let i = 0; i < DRAFT_GROSS_TO_NET_AMOUNTS.length; i += 1) {
      expect(DRAFT_GROSS_TO_NET_AMOUNTS[i]).toBe(3550 + i * 50);
      expect(DRAFT_GROSS_TO_NET_ENTRIES[i]).toEqual({
        amount: DRAFT_GROSS_TO_NET_AMOUNTS[i],
        status: DRAFT_GROSS_TO_NET_STATUS,
      });
      expect(isGrossToNetAmount(DRAFT_GROSS_TO_NET_AMOUNTS[i])).toBe(false);
      expect(isDraftGrossToNetAmount(DRAFT_GROSS_TO_NET_AMOUNTS[i])).toBe(true);
      expect(parseGrossToNetMontantParam(String(DRAFT_GROSS_TO_NET_AMOUNTS[i]))).toBeNull();
    }
  });

  it("expose Hub, Index et fiches 1 000 → 3 500 dans sitemap / pages publiques", () => {
    const publicPaths = new Set(getAllPublicPages().map((page) => page.path));
    const sitemapPaths = new Set(getSitemapEntries().map((entry) => entry.path));

    expect(publicPaths.has(GROSS_TO_NET_HUB_PATH)).toBe(true);
    expect(publicPaths.has(GROSS_TO_NET_INDEX_PATH)).toBe(true);
    expect(sitemapPaths.has(GROSS_TO_NET_HUB_PATH)).toBe(true);
    expect(sitemapPaths.has(GROSS_TO_NET_INDEX_PATH)).toBe(true);
    expect(isPathIndexable(GROSS_TO_NET_HUB_PATH)).toBe(true);
    expect(isPathIndexable(GROSS_TO_NET_INDEX_PATH)).toBe(true);

    for (const amount of PUBLISHED_SAMPLES) {
      const path = grossToNetPath(amount);
      expect(publicPaths.has(path)).toBe(true);
      expect(sitemapPaths.has(path)).toBe(true);
      expect(isPathIndexable(path)).toBe(true);
    }

    for (const amount of DRAFT_SAMPLES) {
      const path = grossToNetPath(amount);
      expect(publicPaths.has(path)).toBe(false);
      expect(sitemapPaths.has(path)).toBe(false);
      expect(isPathIndexable(path)).toBe(false);
    }
  });

  it("aligne title / H1 du hub publié", () => {
    const seo = buildGrossToNetHubSeo();
    const hub = buildGrossToNetHubPayload();
    expect(seo.title).toBe("Salaire brut mensuel en net : toutes les fiches");
    expect(seo.h1).toBe("Tous les salaires bruts mensuels convertis en net");
    expect(seo.title).not.toBe(seo.h1);
    expect(hub.path).toBe(GROSS_TO_NET_HUB_PATH);
    expect(hub.catalogCount).toBe(51);
    expect(hub.ficheLinks).toHaveLength(51);
    expect(hub.catalog.ranges.length).toBeGreaterThan(0);
    expect(hub.ficheLinks.some((link) => link.href.includes("3550"))).toBe(false);
  });

  it("aligne l'index publié sur les 51 fiches", () => {
    const indexPage = buildGrossToNetIndexPayload();
    expect(indexPage.path).toBe(GROSS_TO_NET_INDEX_PATH);
    expect(indexPage.rowCount).toBe(51);
    expect(indexPage.table.rows[0]).toMatchObject({
      grossMonthly: 1000,
      netMonthly: 780,
      netNonExecutive: 780,
      netExecutive: 750,
      netPublicService: 810,
    });
    expect(indexPage.table.rows.at(-1)).toMatchObject({
      grossMonthly: 3500,
      netNonExecutive: roundCent(3500 * 0.78),
      netExecutive: roundCent(3500 * 0.75),
      netPublicService: roundCent(3500 * 0.81),
    });
  });

  it("propose des montants proches sans auto-lien sur le catalogue publié", () => {
    expect(getNearbyGrossToNetAmounts(1000)).toEqual([
      1050, 1100, 1150, 1200, 1250, 1300, 1350,
    ]);
    expect(getNearbyGrossToNetAmounts(2000)).toEqual([
      1950, 2050, 1900, 2100, 1850, 2150, 1800,
    ]);
    expect(getNearbyGrossToNetAmounts(3500)).toEqual([
      3450, 3400, 3350, 3300, 3250, 3200, 3150,
    ]);
    expect(getNearbyGrossToNetAmounts(1000)).not.toContain(1000);
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
});

describe("brouillons restants salaire brut mensuel → net (3 550 → 6 000)", () => {
  it.each(DRAFT_SAMPLES)("prépare la fiche draft %s € comme le modèle 1 000 €", (amount) => {
    const fiche = prepareDraftGrossToNetFiche(amount);
    const grossLabel = fiche.grossLabel;

    expect(fiche.status).toBe("draft");
    expect(fiche.path).toBe(`/quel-salaire-net-mensuel-pour-${amount}-euros-brut`);
    expect(fiche.path).toContain("mensuel");
    expect(fiche.canonical).toBe(`${siteConfig.url}${fiche.path}`);
    expect(fiche.canonical).not.toContain("www.");
    expect(fiche.openGraphType).toBe("article");

    expect(fiche.seo.h1).toBe(`Quel salaire net mensuel pour ${grossLabel} brut par mois ?`);
    expect(fiche.seo.answerH2).toBe(`Quel salaire net pour ${grossLabel} brut par mois ?`);
    expect(fiche.seo.title).toBe(`${grossLabel} brut par mois : combien en net ?`);
    expect(fiche.seo.description).toContain("non-cadre, cadre ou fonction publique");
    expect([...fiche.seo.description].length).toBeLessThanOrEqual(160);

    expect(fiche.estimates.nonExecutive.netMonthly).toBe(roundCent(amount * 0.78));
    expect(fiche.estimates.executive.netMonthly).toBe(
      roundCent(amount * getProfileCoefficient("executive")),
    );
    expect(fiche.estimates.publicService.netMonthly).toBe(roundCent(amount * 0.81));

    expect(fiche.nearbyAmounts).toHaveLength(7);
    expect(fiche.nearbyAmounts).not.toContain(amount);
    expect(
      fiche.nearbyLinks.every((link) => link.href === grossToNetPath(link.grossMonthly)),
    ).toBe(true);

    const blob = collectStrings(fiche).join(" ");
    expect(blob).not.toContain("\u2014");
  });

  it("refuse de préparer une fiche déjà publiée via prepareDraft", () => {
    expect(() => prepareDraftGrossToNetFiche(1000)).toThrow(/hors brouillons/);
    expect(() => prepareDraftGrossToNetFiche(3500)).toThrow(/hors brouillons/);
  });

  it("prépare hub / index brouillon sur le catalogue futur (101)", () => {
    const hub = prepareDraftGrossToNetHub();
    const indexPage = prepareDraftGrossToNetIndexPage();

    expect(hub.path).toBe(DRAFT_GROSS_TO_NET_HUB_PATH);
    expect(hub.catalogCount).toBe(101);
    expect(hub.draftCount).toBe(50);
    expect(hub.seo.title).toBe("Salaire brut mensuel en net : toutes les fiches");
    expect(hub.seo.h1).toBe("Tous les salaires bruts mensuels convertis en net");
    expect(hub.catalog.ranges.reduce((sum, range) => sum + range.links.length, 0)).toBe(101);

    expect(indexPage.path).toBe(DRAFT_GROSS_TO_NET_INDEX_PATH);
    expect(indexPage.rowCount).toBe(101);
    expect(buildDraftGrossToNetIndexRows()).toHaveLength(101);
    expect(getFutureGrossToNetCatalog()).toHaveLength(101);
  });

  it("propose des montants proches voisins pour 2 000 € sur le catalogue futur", () => {
    expect(getPreparedNearbyAmounts(2000)).toEqual([
      1950, 2050, 1900, 2100, 1850, 2150, 1800,
    ]);
  });

  it("ne propose pas de maillage croisé si aucune fiche net→brut assez proche", () => {
    expect(getInverseNetToGrossLink(1000)).toBeNull();
    expect(getInverseNetToGrossLink(1050)).toBeNull();
  });

  it("prépare le maillage croisé quand une fiche net→brut existe à ≤ 50 €", () => {
    const link = getInverseNetToGrossLink(2000);
    expect(link).not.toBeNull();
    expect(link?.matchedNetMonthly).toBe(1600);
    expect(link?.href).toBe("/combien-gagner-brut-mensuel-pour-1600-net");
    expect(link?.teaser).toContain("inverse");
  });

  it("prépare le sens inverse net→brut vers brut→net", () => {
    const link = getInverseGrossToNetLink(1500);
    expect(link).not.toBeNull();
    expect(link?.href).toMatch(/quel-salaire-net-mensuel-pour-\d+-euros-brut/);
  });
});
