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
import { getAllPublicPages, getPlanDuSiteSections, getSitemapEntries } from "@/site/public-pages";
import { siteConfig } from "@/site/site.config";
import {
  DRAFT_NET_TO_GROSS_AMOUNTS,
  DRAFT_NET_TO_GROSS_ENTRIES,
  assertExtendedSeriesPublished,
  isDraftNetToGrossAmount,
  prepareAllDraftNetToGrossFiches,
  prepareDraftNetToGrossFiche,
} from "./index";

const SAMPLE_AMOUNTS = [3100, 4000, 5000, 6000] as const;
const FORMER_DRAFT_AMOUNTS = Array.from({ length: 30 }, (_, i) => 3100 + i * 100);

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

function otherSampleLeakPattern(current: number): RegExp {
  const others = SAMPLE_AMOUNTS.filter((amount) => amount !== current);
  const parts = others.map((amount) => {
    const plain = String(amount);
    const spaced = plain.replace(/(\d)(?=(\d{3})+$)/g, "$1[\\u00a0\\u202f ]?");
    return `(?:${plain}|${spaced})`;
  });
  return new RegExp(parts.join("|"));
}

describe("publication net→brut mensuel (3 100 → 6 000)", () => {
  it("publie exactement 46 montants de 1500 à 6000 et vide les brouillons", () => {
    assertExtendedSeriesPublished();
    expect(PUBLISHED_NET_TO_GROSS_AMOUNTS).toBe(NET_TO_GROSS_AMOUNTS);
    expect(NET_TO_GROSS_AMOUNTS).toHaveLength(46);
    expect(NET_TO_GROSS_AMOUNTS[0]).toBe(1500);
    expect(NET_TO_GROSS_AMOUNTS[45]).toBe(6000);
    expect(DRAFT_NET_TO_GROSS_AMOUNTS).toHaveLength(0);
    expect(DRAFT_NET_TO_GROSS_ENTRIES).toHaveLength(0);
    expect(prepareAllDraftNetToGrossFiches()).toHaveLength(0);

    for (const amount of FORMER_DRAFT_AMOUNTS) {
      expect(isNetToGrossAmount(amount)).toBe(true);
      expect(isDraftNetToGrossAmount(amount)).toBe(false);
      expect(parseNetToGrossMontantParam(String(amount))).toBe(amount);
    }
  });

  it("expose les 30 nouvelles URLs dans sitemap, pages publiques et plan du site", () => {
    const publicPaths = new Set(getAllPublicPages().map((page) => page.path));
    const sitemapPaths = new Set(getSitemapEntries().map((entry) => entry.path));
    const planPaths = new Set(
      getPlanDuSiteSections().flatMap((section) => section.pages.map((page) => page.path)),
    );

    expect(NET_TO_GROSS_AMOUNTS).toHaveLength(46);
    for (const amount of NET_TO_GROSS_AMOUNTS) {
      const path = netToGrossPath(amount);
      expect(path).toBe(`/combien-gagner-brut-mensuel-pour-${amount}-net`);
      expect(path).toContain("mensuel");
      expect(publicPaths.has(path)).toBe(true);
      expect(sitemapPaths.has(path)).toBe(true);
      expect(planPaths.has(path)).toBe(true);
    }

    for (const amount of FORMER_DRAFT_AMOUNTS) {
      expect(publicPaths.has(netToGrossPath(amount))).toBe(true);
      expect(sitemapPaths.has(netToGrossPath(amount))).toBe(true);
    }
  });

  it("conserve le maillage 1 500 € et lie les nouvelles pages sans auto-lien", () => {
    expect(getSeriesNearbyAmounts(1500)).toEqual([
      1600, 1700, 1800, 1900, 2000, 2500, 3000,
    ]);
    const nearby3000 = getSeriesNearbyAmounts(3000);
    expect(nearby3000).toHaveLength(7);
    expect(nearby3000).not.toContain(3000);
    expect(nearby3000.every((amount) => isNetToGrossAmount(amount))).toBe(true);

    for (const amount of SAMPLE_AMOUNTS) {
      const nearby = getSeriesNearbyAmounts(amount);
      expect(nearby).toHaveLength(7);
      expect(nearby).not.toContain(amount);
      expect(nearby.every((item) => isNetToGrossAmount(item))).toBe(true);
      expect(nearby).toEqual([1600, 1700, 1800, 1900, 2000, 2500, 3000]);
    }
  });

  it("n'importe pas le dossier drafts depuis les routes app ni public-pages", () => {
    const roots = [
      resolve(process.cwd(), "src/site/public-pages.ts"),
      resolve(process.cwd(), "src/site/site.config.ts"),
      resolve(process.cwd(), "src/app/net-vers-brut/[montant]/page.tsx"),
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

describe("fiches publiées 3100 / 4000 / 5000 / 6000", () => {
  it.each(SAMPLE_AMOUNTS)("couvre URL, SEO, profils, tableau, FAQ, mini-calc et nearby pour %s €", (amount) => {
    const fiche = prepareDraftNetToGrossFiche(amount);
    const netLabel = fiche.netLabel;

    expect(fiche.status).toBe("published");
    expect(fiche.path).toBe(`/combien-gagner-brut-mensuel-pour-${amount}-net`);
    expect(fiche.path).toContain("mensuel");
    expect(fiche.canonical).toBe(`${siteConfig.url}${fiche.path}`);
    expect(fiche.canonical).not.toContain("www.");

    expect(fiche.seo.h1).toBe(
      `Combien faut-il gagner en brut par mois pour toucher ${netLabel} net ?`,
    );
    expect(fiche.seo.answerH2).toBe(
      `Quel salaire brut mensuel correspond à ${netLabel} net ?`,
    );
    expect(fiche.seo.title).toBe(
      `Quel salaire brut mensuel pour toucher ${netLabel} net ?`,
    );
    expect(fiche.seo.title).not.toContain("Calcul gratuit");
    expect(fiche.seo.description).toBe(
      `À combien correspond un salaire de ${netLabel} net par mois en salaire brut ? Consultez immédiatement l'estimation selon votre statut, puis calculez gratuitement votre salaire brut ou net avec notre simulateur.`,
    );

    expect(fiche.estimates.nonExecutive.grossMonthly).toBe(roundCent(amount / 0.78));
    expect(fiche.estimates.executive.grossMonthly).toBe(
      roundCent(amount / getProfileCoefficient("executive")),
    );
    expect(fiche.estimates.publicService.grossMonthly).toBe(roundCent(amount / 0.81));
    expect(fiche.estimates.nonExecutive.grossAnnual).toBe(
      roundCent(fiche.estimates.nonExecutive.grossMonthly * 12),
    );

    expect(fiche.comparisonRows.map((row) => row.netMonthly)).toEqual([
      amount - 100,
      amount - 50,
      amount,
      amount + 50,
      amount + 100,
    ]);
    expect(fiche.comparisonRows.find((row) => row.isCurrent)?.netMonthly).toBe(amount);

    expect(fiche.faq).toHaveLength(3);
    expect(fiche.faq[0]?.question).toContain(netLabel);
    expect(fiche.editorial).toHaveLength(3);
    expect(fiche.editorial[0]?.id).toBe("non-cadre");

    expect(fiche.miniCalculator.title).toBe("Calculer un autre salaire net");
    expect(fiche.miniCalculator.defaultProfile).toBe("nonExecutive");
    expect(fiche.miniCalculator.defaultNetMonthly).toBe(amount);
    expect(fiche.miniCalculator.netFieldLabel).toBe("Salaire net mensuel");
    expect(fiche.miniCalculator.submitLabel).toBe("Calculer en brut");
    expect(fiche.miniCalculator.redirectExample).toBe(
      `/?net=${amount}&profil=non-cadre`,
    );

    expect(fiche.nearbyAmounts).toHaveLength(7);
    expect(fiche.nearbyAmounts).not.toContain(amount);
    expect(getSeriesNearbyAmounts(amount)).toEqual(fiche.nearbyAmounts);
    expect(fiche.nearbyLinks.every((link) => link.href === netToGrossPath(link.netMonthly))).toBe(
      true,
    );

    expect(fiche.page.share.label).toBe("Partager cette fiche");
    expect(fiche.page.author.displayName).toBe("Antoine");
    expect(fiche.page.author.withReadingTime).toBe(false);
    expect(fiche.updatedAt).toBe("2026-07-15");

    expect(fiche.seo.openGraph.siteName).toBe("Brut vers Net");
    expect(fiche.seo.openGraph.url).toBe(fiche.canonical);
    expect(fiche.seo.twitter.card).toBe("summary_large_image");

    const graph = (fiche.jsonLd as { "@graph"?: unknown[] })["@graph"] ?? [];
    const types = graph.map((node) => (node as { "@type"?: string })["@type"]);
    expect(types).toEqual(expect.arrayContaining(["WebPage", "BreadcrumbList", "FAQPage"]));
    expect(types).toEqual(expect.arrayContaining(["Organization", "WebSite"]));
    expect(types).toContain("Person");

    const webpage = graph.find((node) => (node as { "@type"?: string })["@type"] === "WebPage") as {
      "@id"?: string;
      name?: string;
    };
    expect(webpage?.["@id"]).toContain(String(amount));
    expect(webpage?.name).toBe(fiche.seo.title);

    const blob = collectStrings(fiche).join(" ");
    expect(blob).not.toContain("\u2014");
    expect(blob).not.toMatch(otherSampleLeakPattern(amount));
    expect(blob).not.toMatch(/1[\u00a0\u202f ]?500/);
  });
});
