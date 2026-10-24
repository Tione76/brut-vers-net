/**
 * Audit exhaustif des 451 fiches net → brut (vagues 1 + 2).
 * Contrôles statiques : SEO, calculs, JSON-LD, sitemap, tableaux, FAQ, maillage.
 */
import { describe, expect, it } from "vitest";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import { roundCent } from "@/site/salary-calculator/conversions";
import { getAllPublicPages, isPathIndexable } from "@/site/public-pages";
import { schemaIds } from "@/site/schema";
import { NET_TO_GROSS_SERIES_COVER } from "@/site/guides/covers";
import { siteConfig } from "@/site/site.config";
import {
  NET_TO_GROSS_AMOUNTS,
  NET_TO_GROSS_HUB_BREADCRUMB_LABEL,
  NET_TO_GROSS_HUB_PATH,
  isNetToGrossAmount,
  netToGrossPath,
} from "./config";
import { buildAllProfileEstimates } from "./data";
import {
  buildSeriesEditorial,
  buildSeriesFaqItems,
  buildSeriesSeoMeta,
  getSeriesNearbyAmounts,
} from "./page-1500-content";
import {
  assertRedesignIntermediateHasNoDedicatedUrls,
  buildRedesignEndCtaHref,
  buildRedesignIntermediateNets,
  buildRedesignPageJsonLd,
  buildRedesignSeoMeta,
  netToGrossOpenGraphType,
} from "./page-1650";
import {
  REDESIGN_DATE_PUBLISHED,
  REDESIGN_WAVE1_DATE_MODIFIED,
  REDESIGN_WAVE2_DATE_MODIFIED,
  getControlWave1Amounts,
  getNetToGrossRedesignDateModified,
  getRedesignWave1Amounts,
  getRedesignWave2Amounts,
  isNetToGrossRedesign,
  isRedesignWave1Amount,
} from "./redesign-wave";

const siteOrigin = siteConfig.url.replace(/\/$/, "");

describe("audit exhaustif 451 fiches net → brut", () => {
  it("valide le périmètre 226 + 225 sans groupe témoin", () => {
    expect(NET_TO_GROSS_AMOUNTS).toHaveLength(451);
    expect(getRedesignWave1Amounts()).toHaveLength(226);
    expect(getRedesignWave2Amounts()).toHaveLength(225);
    expect(getControlWave1Amounts()).toHaveLength(0);
    expect(NET_TO_GROSS_AMOUNTS.every((amount) => isNetToGrossRedesign(amount))).toBe(true);
  });

  it("contrôle SEO, calculs, JSON-LD, sitemap, tableaux et maillage sur les 451 fiches", { timeout: 120_000 }, () => {
    const anomalies: string[] = [];
    const titles = new Map<string, number[]>();
    const h1s = new Map<string, number[]>();
    const descriptions = new Map<string, number[]>();
    const tableOwner = new Map<number, number>();
    const sitemapByPath = new Map(
      getAllPublicPages()
        .filter((page) => page.path.includes("combien-gagner-brut-mensuel-pour-"))
        .map((page) => [page.path, page] as const),
    );

    let wave1Ok = 0;
    let wave2Ok = 0;

    for (const amount of NET_TO_GROSS_AMOUNTS) {
      const path = netToGrossPath(amount);
      const wave = isRedesignWave1Amount(amount) ? "vague1" : "vague2";
      const issues: string[] = [];
      const note = (issue: string) => issues.push(`[${wave}] ${path}: ${issue}`);

      const seo = buildSeriesSeoMeta(amount);
      const expected = buildRedesignSeoMeta(amount);
      if (JSON.stringify(seo) !== JSON.stringify(expected)) {
        note("SEO ≠ buildRedesignSeoMeta");
      }
      if (!seo.title.endsWith("net en brut : calcul et conversion")) {
        note(`title hors modèle: ${seo.title}`);
      }
      if (!seo.h1.endsWith("net en brut : combien ça fait ?")) {
        note(`h1 hors modèle: ${seo.h1}`);
      }
      if (!seo.description.includes("non-cadre")) note("meta sans non-cadre");
      if (seo.title.includes("2026") || seo.description.includes("2026")) {
        note("année 2026 dans title/meta");
      }
      if ([seo.title, seo.h1, seo.description].some((t) => t.includes("\u2014"))) {
        note("tiret cadratin");
      }
      if (!isPathIndexable(path)) note("non indexable");
      if (netToGrossOpenGraphType(amount) !== "website") note("og:type ≠ website");

      const pushUnique = (map: Map<string, number[]>, key: string) => {
        const list = map.get(key) ?? [];
        list.push(amount);
        map.set(key, list);
      };
      pushUnique(titles, seo.title);
      pushUnique(h1s, seo.h1);
      pushUnique(descriptions, seo.description);

      const estimates = buildAllProfileEstimates(amount);
      if (
        estimates.nonExecutive.grossMonthly !==
        roundCent(amount / getProfileCoefficient("nonExecutive"))
      ) {
        note("brut non-cadre incohérent");
      }

      const faq = buildSeriesFaqItems(amount, estimates);
      const editorial = buildSeriesEditorial(amount, estimates);
      if (faq.length !== 4) note(`FAQ=${faq.length}`);
      if (editorial.length !== 3) note(`editorial=${editorial.length}`);
      if (amount !== 1650 && JSON.stringify(faq).includes("1 650")) {
        note("FAQ pointe vers 1650");
      }

      const nets = buildRedesignIntermediateNets(amount);
      if (nets.length !== 10 || nets[0] !== amount - 5 || nets[9] !== amount + 4) {
        note("plage tableau incorrecte");
      }
      for (const net of nets) {
        const owner = tableOwner.get(net);
        if (owner !== undefined) note(`chevauchement ${net} avec ${owner}`);
        else tableOwner.set(net, amount);
      }
      if (assertRedesignIntermediateHasNoDedicatedUrls(amount).length !== 9) {
        note("intermédiaires dédiés incorrects");
      }

      const nearby = getSeriesNearbyAmounts(amount);
      if (nearby.length !== 7 || nearby.includes(amount)) note("nearby incorrect");
      if (!nearby.every((item) => isNetToGrossAmount(item))) note("nearby hors série");

      if (buildRedesignEndCtaHref(amount) !== `/?net=${amount}&profil=non-cadre`) {
        note("CTA incorrect");
      }

      const expectedDate = isRedesignWave1Amount(amount)
        ? REDESIGN_WAVE1_DATE_MODIFIED
        : REDESIGN_WAVE2_DATE_MODIFIED;
      if (getNetToGrossRedesignDateModified(amount) !== expectedDate) {
        note("dateModified incorrecte");
      }
      const sitemapPage = sitemapByPath.get(path);
      if (!sitemapPage) note("absente sitemap");
      else if (sitemapPage.lastModified !== expectedDate) {
        note(`sitemap lastModified=${sitemapPage.lastModified}`);
      }

      const document = buildRedesignPageJsonLd({
        path,
        name: seo.title,
        description: seo.description,
        breadcrumbs: [
          { name: "Accueil", path: "/" },
          { name: NET_TO_GROSS_HUB_BREADCRUMB_LABEL, path: NET_TO_GROSS_HUB_PATH },
          { name: `${amount}`, path },
        ],
        cover: NET_TO_GROSS_SERIES_COVER,
        faq,
        withAuthor: true,
        dateModified: expectedDate,
        datePublished: REDESIGN_DATE_PUBLISHED,
      });
      const graph = document["@graph"] as Record<string, unknown>[];
      const page = graph.find((node) => node["@type"] === "WebPage") as
        | Record<string, unknown>
        | undefined;
      const faqNode = graph.find((node) => node["@type"] === "FAQPage") as
        | { mainEntity: Array<{ name: string }> }
        | undefined;
      if (!page) note("WebPage manquant");
      else {
        if (page.about) note("WebPage.about");
        if (page.mainEntity) note("WebPage.mainEntity");
        if (
          !page.publisher ||
          (page.publisher as { "@id": string })["@id"] !== schemaIds.organization()
        ) {
          note("publisher incorrect");
        }
        if (page.url !== `${siteOrigin}${path}`) note("url JSON-LD");
        if (page.name !== seo.title) note("name ≠ title");
        if (page.dateModified !== `${expectedDate}T09:00:00+02:00`) {
          note("dateModified JSON-LD");
        }
        if (page.datePublished !== `${REDESIGN_DATE_PUBLISHED}T09:00:00+02:00`) {
          note("datePublished JSON-LD");
        }
      }
      if (!faqNode) note("FAQPage manquant");
      else if (
        JSON.stringify(faqNode.mainEntity.map((item) => item.name)) !==
        JSON.stringify(faq.map((item) => item.question))
      ) {
        note("FAQ JSON-LD ≠ visible");
      }
      if (graph.some((node) => node["@type"] === "Article" || node["@type"] === "HowTo")) {
        note("types Schema interdits");
      }

      if (issues.length === 0) {
        if (wave === "vague1") wave1Ok += 1;
        else wave2Ok += 1;
      } else {
        anomalies.push(...issues);
      }
    }

    for (const [key, amounts] of titles) {
      if (amounts.length > 1) anomalies.push(`title dupliqué: ${key}`);
    }
    for (const [key, amounts] of h1s) {
      if (amounts.length > 1) anomalies.push(`h1 dupliqué: ${key}`);
    }
    for (const [key, amounts] of descriptions) {
      if (amounts.length > 1) {
        anomalies.push(`meta dupliquée sur ${amounts.length} fiches (${key.slice(0, 40)}…)`);
      }
    }
    if (tableOwner.size !== 4510) {
      anomalies.push(`couverture tableaux=${tableOwner.size} (attendu 4510)`);
    }
    if (sitemapByPath.size !== 451) {
      anomalies.push(`sitemap série=${sitemapByPath.size} (attendu 451)`);
    }

    if (anomalies.length > 0) {
      const preview = anomalies.slice(0, 40).join("\n");
      expect.fail(
        `${anomalies.length} anomalie(s). Conformes vague1=${wave1Ok} vague2=${wave2Ok}.\n${preview}`,
      );
    }

    expect(wave1Ok).toBe(226);
    expect(wave2Ok).toBe(225);
    expect(titles.size).toBe(451);
    expect(h1s.size).toBe(451);
    expect(descriptions.size).toBe(451);
  });
});
