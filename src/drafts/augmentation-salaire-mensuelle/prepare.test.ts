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
import { getNearbyMonthlyIncreaseAmounts } from "@/site/augmentation-salaire-mensuelle/content";
import { getAllPublicPages, getSitemapEntries } from "@/site/public-pages";
import { siteConfig } from "@/site/site.config";
import {
  DRAFT_MONTHLY_INCREASE_AMOUNTS,
  DRAFT_MONTHLY_INCREASE_ENTRIES,
  DRAFT_MONTHLY_INCREASE_STATUS,
  assertDraftsNotPublished,
  getPreparedNearbyAmounts,
  isDraftMonthlyIncreaseAmount,
  prepareDraftMonthlyIncreaseFiche,
} from "./index";

const SAMPLE_AMOUNTS = [60, 180, 300, 500] as const;

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

describe("brouillons augmentation mensuelle (60 → 500)", () => {
  it("liste exactement 45 montants draft de 60 à 500 par pas de 10", () => {
    expect(DRAFT_MONTHLY_INCREASE_AMOUNTS).toHaveLength(45);
    expect(DRAFT_MONTHLY_INCREASE_AMOUNTS[0]).toBe(60);
    expect(DRAFT_MONTHLY_INCREASE_AMOUNTS[44]).toBe(500);
    for (let i = 0; i < DRAFT_MONTHLY_INCREASE_AMOUNTS.length; i += 1) {
      expect(DRAFT_MONTHLY_INCREASE_AMOUNTS[i]).toBe(60 + i * 10);
      expect(DRAFT_MONTHLY_INCREASE_ENTRIES[i]).toEqual({
        amount: DRAFT_MONTHLY_INCREASE_AMOUNTS[i],
        status: DRAFT_MONTHLY_INCREASE_STATUS,
      });
    }
  });

  it.each(SAMPLE_AMOUNTS)("prépare la fiche %s € comme le modèle 50 €", (amount) => {
    const fiche = prepareDraftMonthlyIncreaseFiche(amount);
    const grossLabel = fiche.grossLabel;

    expect(fiche.status).toBe("draft");
    expect(fiche.path).toBe(`/augmentation-salaire-mensuelle-${amount}-euros-brut`);
    expect(fiche.path).toContain("mensuelle");
    expect(fiche.canonical).toBe(`${siteConfig.url}${fiche.path}`);
    expect(fiche.canonical).not.toContain("www.");
    expect(fiche.openGraphType).toBe("article");

    expect(fiche.seo.h1).toBe(`Une augmentation mensuelle de ${grossLabel} brut : combien en net ?`);
    expect(fiche.seo.answerH2).toBe(
      `Combien rapporte une augmentation mensuelle de ${grossLabel} brut en net ?`,
    );
    expect(fiche.seo.title).toBe(
      `Augmentation mensuelle de ${grossLabel} brut : combien en net ?`,
    );
    expect(fiche.seo.description).toContain("non-cadre, cadre ou fonction publique");
    expect(fiche.seo.openGraph.type).toBe("article");
    expect(fiche.seo.openGraph.siteName).toBe("Brut vers Net");

    expect(fiche.estimates.nonExecutive.netMonthlyGain).toBe(roundCent(amount * 0.78));
    expect(fiche.estimates.executive.netMonthlyGain).toBe(
      roundCent(amount * getProfileCoefficient("executive")),
    );
    expect(fiche.estimates.publicService.netMonthlyGain).toBe(roundCent(amount * 0.81));
    expect(fiche.estimates.nonExecutive.netAnnualGain).toBe(
      roundCent(fiche.estimates.nonExecutive.netMonthlyGain * 12),
    );

    expect(fiche.comparisonRows.map((row) => row.grossMonthlyIncrease)).toEqual([
      amount - 50,
      amount - 25,
      amount,
      amount + 25,
      amount + 50,
    ].filter((value) => value > 0));
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
    expect(fiche.nearbyLinks.every((link) => link.href === monthlyIncreasePath(link.grossMonthlyIncrease))).toBe(
      true,
    );

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
  });

  it("propose des montants proches voisins pour 180 €", () => {
    const nearby = getPreparedNearbyAmounts(180);
    expect(nearby).toEqual([170, 190, 160, 200, 150, 210, 140]);
  });
});

describe("anti-publication des brouillons augmentation mensuelle", () => {
  it("garde les brouillons hors de la liste publiée et de generateStaticParams", () => {
    assertDraftsNotPublished();
    expect(PUBLISHED_MONTHLY_INCREASE_AMOUNTS).toBe(MONTHLY_INCREASE_AMOUNTS);
    expect(MONTHLY_INCREASE_AMOUNTS).toEqual([50]);

    for (const amount of DRAFT_MONTHLY_INCREASE_AMOUNTS) {
      expect(isMonthlyIncreaseAmount(amount)).toBe(false);
      expect(isDraftMonthlyIncreaseAmount(amount)).toBe(true);
      expect(parseMonthlyIncreaseMontantParam(String(amount))).toBeNull();
    }
  });

  it("n'expose aucune URL brouillon dans le sitemap ni les pages publiques", () => {
    const publicPaths = new Set(getAllPublicPages().map((page) => page.path));
    const sitemapPaths = new Set(getSitemapEntries().map((entry) => entry.path));

    for (const amount of DRAFT_MONTHLY_INCREASE_AMOUNTS) {
      const path = monthlyIncreasePath(amount);
      expect(publicPaths.has(path)).toBe(false);
      expect(sitemapPaths.has(path)).toBe(false);
    }

    expect(publicPaths.has(monthlyIncreasePath(50))).toBe(true);
  });

  it("ne modifie pas le maillage public de la fiche 50 €", () => {
    expect(getNearbyMonthlyIncreaseAmounts(50)).toEqual([]);
  });

  it("n'est importé par aucune route app ni public-pages", () => {
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
  });
});
