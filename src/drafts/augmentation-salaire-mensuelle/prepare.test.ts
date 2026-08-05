import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import { roundCent } from "@/site/salary-calculator/conversions";
import {
  MONTHLY_INCREASE_AMOUNTS,
  PUBLISHED_MONTHLY_INCREASE_AMOUNTS,
  isMonthlyIncreaseAmount,
  monthlyIncreasePath,
  parseMonthlyIncreaseMontantParam,
} from "@/site/augmentation-salaire-mensuelle/config";
import { formatIncreaseShort } from "@/site/augmentation-salaire-mensuelle/data";
import {
  buildMonthlyIncreaseFaqItems,
  buildMonthlyIncreaseSeoMeta,
  getNearbyMonthlyIncreaseAmounts,
} from "@/site/augmentation-salaire-mensuelle/content";
import { buildAllProfileIncreaseEstimates } from "@/site/augmentation-salaire-mensuelle/data";
import { getAllPublicPages, getPlanDuSiteSections, getSitemapEntries } from "@/site/public-pages";
import { schemaIds } from "@/site/schema/ids";
import { siteConfig } from "@/site/site.config";
import {
  DRAFT_MONTHLY_INCREASE_AMOUNTS,
  DRAFT_MONTHLY_INCREASE_ENTRIES,
  assertExtendedSeriesPublished,
  getPreparedNearbyAmounts,
  isDraftMonthlyIncreaseAmount,
  prepareAllDraftMonthlyIncreaseFiches,
  prepareDraftMonthlyIncreaseFiche,
} from "./index";

const SAMPLE_AMOUNTS = [50, 60, 180, 300, 500] as const;
const FORMER_DRAFT_AMOUNTS = Array.from({ length: 45 }, (_, i) => 60 + i * 10);

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Évite les faux positifs du type « 50 € » dans « 150 € ». */
function containsStandaloneAmountLabel(haystack: string, label: string): boolean {
  return new RegExp(`(?<!\\d)${escapeRegExp(label)}`).test(haystack);
}

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

function collectJsonLdIds(value: unknown, acc: string[] = []): string[] {
  if (Array.isArray(value)) {
    for (const item of value) collectJsonLdIds(item, acc);
    return acc;
  }
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record["@id"] === "string") {
      acc.push(record["@id"]);
    }
    for (const item of Object.values(record)) collectJsonLdIds(item, acc);
  }
  return acc;
}

describe("publication augmentation mensuelle (60 → 500)", () => {
  it("publie exactement 46 montants de 50 à 500 et vide les brouillons", () => {
    assertExtendedSeriesPublished();
    expect(PUBLISHED_MONTHLY_INCREASE_AMOUNTS).toBe(MONTHLY_INCREASE_AMOUNTS);
    expect(MONTHLY_INCREASE_AMOUNTS).toHaveLength(46);
    expect(MONTHLY_INCREASE_AMOUNTS[0]).toBe(50);
    expect(MONTHLY_INCREASE_AMOUNTS[45]).toBe(500);
    expect(DRAFT_MONTHLY_INCREASE_AMOUNTS).toHaveLength(0);
    expect(DRAFT_MONTHLY_INCREASE_ENTRIES).toHaveLength(0);
    expect(prepareAllDraftMonthlyIncreaseFiches()).toHaveLength(0);

    for (const amount of FORMER_DRAFT_AMOUNTS) {
      expect(isMonthlyIncreaseAmount(amount)).toBe(true);
      expect(isDraftMonthlyIncreaseAmount(amount)).toBe(false);
      expect(parseMonthlyIncreaseMontantParam(String(amount))).toBe(amount);
    }
  });

  it("expose les 46 URLs une seule fois dans sitemap, pages publiques et plan du site", () => {
    const publicPaths = getAllPublicPages().map((page) => page.path);
    const sitemapPaths = getSitemapEntries().map((entry) => entry.path);
    const planPaths = getPlanDuSiteSections().flatMap((section) =>
      section.pages.map((page) => page.path),
    );

    const seriesPaths = MONTHLY_INCREASE_AMOUNTS.map((amount) => monthlyIncreasePath(amount));
    expect(seriesPaths).toHaveLength(46);
    expect(new Set(seriesPaths).size).toBe(46);

    for (const path of seriesPaths) {
      expect(path).toMatch(/^\/augmentation-salaire-mensuelle-\d+-euros-brut$/);
      expect(path).toContain("mensuelle");
      expect(publicPaths.filter((item) => item === path)).toHaveLength(1);
      expect(sitemapPaths.filter((item) => item === path)).toHaveLength(1);
      expect(planPaths.filter((item) => item === path)).toHaveLength(1);
    }
  });

  it("garantit l'unicité SEO / Schema.org sur les 46 pages sans fuite de montant", () => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    const h1s = new Set<string>();
    const canonicals = new Set<string>();
    const urls = new Set<string>();
    const schemaIdsCollected = new Set<string>();

    for (const amount of MONTHLY_INCREASE_AMOUNTS) {
      const fiche = prepareDraftMonthlyIncreaseFiche(amount);
      const label = formatIncreaseShort(amount);
      const seo = buildMonthlyIncreaseSeoMeta(amount);
      const faq = buildMonthlyIncreaseFaqItems(amount, buildAllProfileIncreaseEstimates(amount));

      expect(fiche.path).toBe(`/augmentation-salaire-mensuelle-${amount}-euros-brut`);
      expect(fiche.canonical).toBe(`${siteConfig.url}${fiche.path}`);
      expect(fiche.openGraphType).toBe("article");
      expect(fiche.seo.openGraph.type).toBe("article");
      expect(fiche.seo.twitter.card).toBe("summary_large_image");
      expect(fiche.seo.title).toBe(seo.title);
      expect(fiche.seo.description).toBe(seo.description);
      expect(fiche.seo.h1).toBe(seo.h1);
      expect(fiche.faq).toEqual(faq);

      titles.add(fiche.seo.title);
      descriptions.add(fiche.seo.description);
      h1s.add(fiche.seo.h1);
      canonicals.add(fiche.canonical);
      urls.add(fiche.path);

      const ids = collectJsonLdIds(fiche.jsonLd);
      expect(ids).toContain(schemaIds.webpage(fiche.path));
      expect(ids).toContain(schemaIds.faq(fiche.path));
      expect(ids).toContain(schemaIds.breadcrumb(fiche.path));
      expect(ids).toContain(schemaIds.organization());
      expect(ids).toContain(schemaIds.website());
      expect(ids).toContain(schemaIds.person());

      const pageScopedIds = [
        schemaIds.webpage(fiche.path),
        schemaIds.faq(fiche.path),
        schemaIds.breadcrumb(fiche.path),
        schemaIds.primaryImage(fiche.path),
      ].filter((id) => ids.includes(id));
      for (const id of pageScopedIds) {
        expect(schemaIdsCollected.has(id)).toBe(false);
        schemaIdsCollected.add(id);
      }

      const seoBlob = [
        fiche.seo.title,
        fiche.seo.description,
        fiche.seo.h1,
        fiche.seo.answerH2,
        fiche.canonical,
        fiche.path,
      ].join(" ");
      expect(seoBlob).toContain(label);

      for (const other of MONTHLY_INCREASE_AMOUNTS) {
        if (other === amount) continue;
        const otherLabel = formatIncreaseShort(other);
        expect(containsStandaloneAmountLabel(seoBlob, otherLabel)).toBe(false);
      }

      const nearby = getNearbyMonthlyIncreaseAmounts(amount);
      expect(nearby).toHaveLength(7);
      expect(nearby).not.toContain(amount);
      expect(nearby).toEqual(getPreparedNearbyAmounts(amount));
    }

    expect(titles.size).toBe(46);
    expect(descriptions.size).toBe(46);
    expect(h1s.size).toBe(46);
    expect(canonicals.size).toBe(46);
    expect(urls.size).toBe(46);
  });

  it("n'importe pas le dossier drafts depuis les routes app ni public-pages", () => {
    const forbiddenImport =
      /from\s+["']@\/drafts\/augmentation-salaire-mensuelle|from\s+["'][^"']*drafts\/augmentation-salaire-mensuelle/;
    const files = [
      resolve(process.cwd(), "src/site/public-pages.ts"),
      resolve(process.cwd(), "src/app/augmentation-salaire-mensuelle/[montant]/page.tsx"),
    ];

    for (const file of files) {
      expect(readFileSync(file, "utf8")).not.toMatch(forbiddenImport);
    }

    const pageSource = readFileSync(files[1]!, "utf8");
    expect(pageSource).toContain("MONTHLY_INCREASE_AMOUNTS.map");
    expect(pageSource).not.toContain("DRAFT_MONTHLY_INCREASE_AMOUNTS");
    expect(pageSource).toContain('openGraphType: "article"');
  });
});

describe("fiches publiées 50 / 60 / 180 / 300 / 500", () => {
  it.each(SAMPLE_AMOUNTS)(
    "couvre URL, SEO, profils, tableau, FAQ, mini-calc, nearby et partage pour %s €",
    (amount) => {
      const fiche = prepareDraftMonthlyIncreaseFiche(amount);
      const grossLabel = fiche.grossLabel;

      expect(fiche.status).toBe("published");
      expect(fiche.path).toBe(`/augmentation-salaire-mensuelle-${amount}-euros-brut`);
      expect(fiche.path).toContain("mensuelle");
      expect(fiche.canonical).toBe(`${siteConfig.url}${fiche.path}`);
      expect(fiche.canonical).not.toContain("www.");
      expect(fiche.openGraphType).toBe("article");

      expect(fiche.seo.h1).toBe(
        `Combien rapporte une augmentation mensuelle de ${grossLabel} brut ?`,
      );
      expect(fiche.seo.h1).not.toBe(fiche.seo.title);
      expect(fiche.seo.answerH2).toBe(
        `Combien rapporte une augmentation mensuelle de ${grossLabel} brut en net ?`,
      );
      expect(fiche.seo.title).toBe(
        `Augmentation mensuelle de ${grossLabel} brut : combien en net ?`,
      );
      expect(fiche.seo.description).toContain("non-cadre, cadre ou fonction publique");
      expect(fiche.seo.openGraph.type).toBe("article");
      expect(fiche.seo.openGraph.siteName).toBe("Brut vers Net");
      expect(fiche.seo.openGraph.url).toBe(fiche.canonical);
      expect(fiche.seo.twitter.card).toBe("summary_large_image");

      expect(fiche.estimates.nonExecutive.netMonthlyGain).toBe(roundCent(amount * 0.78));
      expect(fiche.estimates.executive.netMonthlyGain).toBe(
        roundCent(amount * getProfileCoefficient("executive")),
      );
      expect(fiche.estimates.publicService.netMonthlyGain).toBe(roundCent(amount * 0.81));
      expect(fiche.estimates.nonExecutive.netAnnualGain).toBe(
        roundCent(fiche.estimates.nonExecutive.netMonthlyGain * 12),
      );

      if (amount === 50) {
        expect(fiche.comparisonRows.map((row) => row.grossMonthlyIncrease)).toEqual([
          25, 50, 75, 100,
        ]);
      } else {
        expect(fiche.comparisonRows.map((row) => row.grossMonthlyIncrease)).toEqual(
          [amount - 50, amount - 25, amount, amount + 25, amount + 50].filter(
            (value) => value > 0,
          ),
        );
      }
      expect(fiche.comparisonRows.find((row) => row.isCurrent)?.grossMonthlyIncrease).toBe(amount);
      expect(fiche.comparisonRows.every((row) => row.grossMonthlyIncrease > 0)).toBe(true);

      expect(fiche.faq).toHaveLength(3);
      expect(fiche.faq[0]?.question).toContain(grossLabel);
      expect(fiche.faq[2]?.answer).toContain("Pour un calcul personnalisé");
      expect(fiche.editorial).toHaveLength(3);

      expect(fiche.miniCalculator.title).toBe("Vous souhaitez estimer une autre augmentation ?");
      expect(fiche.miniCalculator.defaultProfile).toBe("nonExecutive");
      expect(fiche.miniCalculator.defaultGrossMonthlyIncrease).toBe(amount);
      expect(fiche.miniCalculator.redirectExample).toBe(
        `/calculateurs/augmentation-salaire?augmentation=${amount}&profil=non-cadre`,
      );

      expect(fiche.nearbyAmounts).toHaveLength(7);
      expect(fiche.nearbyAmounts).not.toContain(amount);
      expect(fiche.nearbyLinks).toHaveLength(7);
      expect(
        fiche.nearbyLinks.every(
          (link, index) => link.href === monthlyIncreasePath(fiche.nearbyAmounts[index]!),
        ),
      ).toBe(true);

      expect(fiche.page.share.label).toBe("Partager cette fiche");
      expect(fiche.page.author.displayName).toBe("Antoine");
      expect(fiche.updatedAt).toBe("2026-07-31");

      const graph = (fiche.jsonLd as { "@graph"?: unknown[] })["@graph"] ?? [];
      const types = graph.map((node) => (node as { "@type"?: string })["@type"]);
      expect(types).toEqual(expect.arrayContaining(["WebPage", "BreadcrumbList", "FAQPage"]));
      expect(types).toEqual(expect.arrayContaining(["Organization", "WebSite", "Person"]));

      const blob = collectStrings(fiche).join(" ");
      expect(blob).not.toContain("\u2014");
      expect(blob).not.toMatch(/combien-gagner-brut-mensuel|net-vers-brut/);
    },
  );

  it("propose des montants proches voisins pour 50 / 180 / 300 / 490 / 500 €", () => {
    expect(getNearbyMonthlyIncreaseAmounts(50)).toEqual([60, 70, 80, 90, 100, 110, 120]);
    expect(getNearbyMonthlyIncreaseAmounts(180)).toEqual([170, 190, 160, 200, 150, 210, 140]);
    expect(getNearbyMonthlyIncreaseAmounts(300)).toEqual([290, 310, 280, 320, 270, 330, 260]);
    expect(getNearbyMonthlyIncreaseAmounts(490)).toEqual([480, 500, 470, 460, 450, 440, 430]);
    expect(getNearbyMonthlyIncreaseAmounts(500)).toEqual([490, 480, 470, 460, 450, 440, 430]);
    expect(getPreparedNearbyAmounts(180)).toEqual([170, 190, 160, 200, 150, 210, 140]);
  });
});
