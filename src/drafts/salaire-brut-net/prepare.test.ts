import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import { roundCent } from "@/site/salary-calculator/conversions";
import {
  GROSS_TO_NET_AMOUNTS,
  PUBLISHED_GROSS_TO_NET_AMOUNTS,
  grossToNetPath,
  isGrossToNetAmount,
  parseGrossToNetMontantParam,
} from "@/site/salaire-brut-net/config";
import { getNearbyGrossToNetAmounts } from "@/site/salaire-brut-net/content";
import { getAllPublicPages, getSitemapEntries } from "@/site/public-pages";
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

const SAMPLE_AMOUNTS = [1050, 2000, 3500, 6000] as const;

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

describe("brouillons salaire brut mensuel → net (1 050 → 6 000)", () => {
  it("liste exactement 100 montants draft de 1 050 à 6 000 par pas de 50", () => {
    expect(DRAFT_GROSS_TO_NET_AMOUNTS).toHaveLength(100);
    expect(DRAFT_GROSS_TO_NET_AMOUNTS[0]).toBe(1050);
    expect(DRAFT_GROSS_TO_NET_AMOUNTS[99]).toBe(6000);
    expect(DRAFT_GROSS_TO_NET_AMOUNTS_HALF_1).toHaveLength(50);
    expect(DRAFT_GROSS_TO_NET_AMOUNTS_HALF_2).toHaveLength(50);
    expect(DRAFT_GROSS_TO_NET_AMOUNTS_HALF_1.at(-1)).toBe(3500);
    expect(DRAFT_GROSS_TO_NET_AMOUNTS_HALF_2[0]).toBe(3550);
    for (let i = 0; i < DRAFT_GROSS_TO_NET_AMOUNTS.length; i += 1) {
      expect(DRAFT_GROSS_TO_NET_AMOUNTS[i]).toBe(1050 + i * 50);
      expect(DRAFT_GROSS_TO_NET_ENTRIES[i]).toEqual({
        amount: DRAFT_GROSS_TO_NET_AMOUNTS[i],
        status: DRAFT_GROSS_TO_NET_STATUS,
      });
    }
  });

  it.each(SAMPLE_AMOUNTS)("prépare la fiche %s € comme le modèle 1 000 €", (amount) => {
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
    expect(fiche.seo.openGraph.type).toBe("article");
    expect(fiche.seo.openGraph.siteName).toBe("Brut vers Net");

    expect(fiche.estimates.nonExecutive.netMonthly).toBe(roundCent(amount * 0.78));
    expect(fiche.estimates.executive.netMonthly).toBe(
      roundCent(amount * getProfileCoefficient("executive")),
    );
    expect(fiche.estimates.publicService.netMonthly).toBe(roundCent(amount * 0.81));
    expect(fiche.estimates.nonExecutive.netAnnual).toBe(
      roundCent(fiche.estimates.nonExecutive.netMonthly * 12),
    );

    expect(fiche.comparisonRows.map((row) => row.grossMonthly)).toEqual([
      amount - 100,
      amount - 50,
      amount,
      amount + 50,
      amount + 100,
    ].filter((value) => value > 0));
    expect(fiche.comparisonRows.find((row) => row.isCurrent)?.grossMonthly).toBe(amount);

    expect(fiche.faq).toHaveLength(3);
    expect(fiche.faq[0]?.question).toContain(grossLabel);
    expect(fiche.faq[2]?.answer).toContain("utilisez notre calculateur de salaire brut et net");
    expect(fiche.editorial).toHaveLength(3);

    expect(fiche.miniCalculator.title).toBe("Calculer un autre salaire brut");
    expect(fiche.miniCalculator.defaultProfile).toBe("nonExecutive");
    expect(fiche.miniCalculator.defaultGrossMonthly).toBe(amount);
    expect(fiche.miniCalculator.redirectExample).toBe(`/?brut=${amount}&profil=non-cadre`);

    expect(fiche.nearbyAmounts).toHaveLength(7);
    expect(fiche.nearbyAmounts).not.toContain(amount);
    expect(
      fiche.nearbyLinks.every((link) => link.href === grossToNetPath(link.grossMonthly)),
    ).toBe(true);

    expect(fiche.page.share.label).toBe("Partager cette fiche");
    expect(fiche.page.author.displayName).toBe("Antoine");
    expect(fiche.updatedAt).toBe("2026-07-15");
    expect(fiche.page.authorityNote).toContain("coefficients utilisés par notre simulateur");

    const graph = (fiche.jsonLd as { "@graph"?: unknown[] })["@graph"] ?? [];
    const types = graph.map((node) => (node as { "@type"?: string })["@type"]);
    expect(types).toEqual(expect.arrayContaining(["WebPage", "BreadcrumbList", "FAQPage"]));
    expect(types).toEqual(expect.arrayContaining(["Organization", "WebSite", "Person"]));

    const blob = collectStrings(fiche).join(" ");
    expect(blob).not.toContain("\u2014");
  });

  it("propose des montants proches voisins pour 2 000 €", () => {
    const nearby = getPreparedNearbyAmounts(2000);
    expect(nearby).toEqual([1950, 2050, 1900, 2100, 1850, 2150, 1800]);
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

  it("prépare le sens inverse net→brut vers brut→net sur le catalogue futur", () => {
    const link = getInverseGrossToNetLink(1500);
    expect(link).not.toBeNull();
    expect(link?.href).toMatch(/quel-salaire-net-mensuel-pour-\d+-euros-brut/);
    expect(getFutureGrossToNetCatalog()).toHaveLength(101);
  });
});

describe("hub et index brouillon salaire brut → net", () => {
  it("prépare le hub avec tableau, liens et FAQ", () => {
    const hub = prepareDraftGrossToNetHub();
    expect(hub.status).toBe("draft");
    expect(hub.path).toBe(DRAFT_GROSS_TO_NET_HUB_PATH);
    expect(hub.catalogCount).toBe(101);
    expect(hub.draftCount).toBe(100);
    expect(hub.ficheLinks).toHaveLength(101);
    expect(hub.indexRows).toHaveLength(101);
    expect(hub.faq).toHaveLength(3);
    expect(hub.editorial).toHaveLength(3);
    expect(hub.seo.title).toBe("Tous les salaires bruts mensuels convertis en net");
    expect(hub.seo.h1).toBe("Tous les salaires bruts mensuels convertis en net");
    expect(hub.page.breadcrumbLabel).toBe(
      "Tous les salaires bruts mensuels convertis en net",
    );
    expect(collectStrings(hub).join(" ")).not.toContain("\u2014");
  });

  it("prépare la page index avec un tableau automatique", () => {
    const indexPage = prepareDraftGrossToNetIndexPage();
    expect(indexPage.status).toBe("draft");
    expect(indexPage.path).toBe(DRAFT_GROSS_TO_NET_INDEX_PATH);
    expect(indexPage.rowCount).toBe(101);
    expect(indexPage.table.rows[0]).toMatchObject({
      grossMonthly: 1000,
      netMonthly: 780,
      isPilot: true,
    });
    expect(indexPage.table.rows[1]).toMatchObject({
      grossMonthly: 1050,
      netMonthly: roundCent(1050 * 0.78),
      isPilot: false,
    });
    expect(buildDraftGrossToNetIndexRows()).toHaveLength(101);
  });
});

describe("anti-publication des brouillons salaire brut → net", () => {
  it("garde les brouillons hors de la liste SSG et des indexables", () => {
    assertDraftsNotPublished();
    expect(GROSS_TO_NET_AMOUNTS).toEqual([1000]);
    expect(PUBLISHED_GROSS_TO_NET_AMOUNTS).toEqual([]);

    for (const amount of DRAFT_GROSS_TO_NET_AMOUNTS) {
      expect(isGrossToNetAmount(amount)).toBe(false);
      expect(isDraftGrossToNetAmount(amount)).toBe(true);
      expect(parseGrossToNetMontantParam(String(amount))).toBeNull();
    }
  });

  it("n'expose aucune URL brouillon dans le sitemap ni les pages publiques", () => {
    const publicPaths = new Set(getAllPublicPages().map((page) => page.path));
    const sitemapPaths = new Set(getSitemapEntries().map((entry) => entry.path));

    for (const amount of [1050, 2000, 3500, 6000] as const) {
      const path = grossToNetPath(amount);
      expect(publicPaths.has(path)).toBe(false);
      expect(sitemapPaths.has(path)).toBe(false);
    }

    expect(publicPaths.has(grossToNetPath(1000))).toBe(false);
    expect(sitemapPaths.has(grossToNetPath(1000))).toBe(false);
    expect(publicPaths.has(DRAFT_GROSS_TO_NET_HUB_PATH)).toBe(false);
    expect(publicPaths.has(DRAFT_GROSS_TO_NET_INDEX_PATH)).toBe(false);
    expect(sitemapPaths.has(DRAFT_GROSS_TO_NET_HUB_PATH)).toBe(false);
    expect(sitemapPaths.has(DRAFT_GROSS_TO_NET_INDEX_PATH)).toBe(false);
  });

  it("ne modifie pas le maillage public de la fiche pilote 1 000 €", () => {
    expect(getNearbyGrossToNetAmounts(1000)).toEqual([]);
  });

  it("n'est importé par aucune route app ni public-pages", () => {
    const forbiddenImport =
      /from\s+["']@\/drafts\/salaire-brut-net|from\s+["'][^"']*drafts\/salaire-brut-net/;
    const files = [
      resolve(process.cwd(), "src/site/public-pages.ts"),
      resolve(process.cwd(), "src/app/salaire-brut-net/[montant]/page.tsx"),
    ];

    for (const file of files) {
      expect(readFileSync(file, "utf8")).not.toMatch(forbiddenImport);
    }

    const pageSource = readFileSync(files[1]!, "utf8");
    expect(pageSource).toContain("GROSS_TO_NET_AMOUNTS.map");
    expect(pageSource).not.toContain("DRAFT_GROSS_TO_NET_AMOUNTS");
  });
});
