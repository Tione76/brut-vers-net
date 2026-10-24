import { describe, expect, it } from "vitest";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import { roundCent } from "@/site/salary-calculator/conversions";
import { getAllPublicPages, isPathIndexable } from "@/site/public-pages";
import { schemaIds } from "@/site/schema";
import { NET_TO_GROSS_SERIES_COVER } from "@/site/guides/covers";
import {
  NET_TO_GROSS_AMOUNTS,
  NET_TO_GROSS_HUB_BREADCRUMB_LABEL,
  NET_TO_GROSS_HUB_PATH,
  isNetToGrossAmount,
  netToGrossPath,
} from "./config";
import {
  buildAllProfileEstimates,
  estimateGrossMonthlyFromNet,
} from "./data";
import {
  buildSeriesEditorial,
  buildSeriesFaqItems,
  buildSeriesSeoMeta,
  getSeriesNearbyAmounts,
} from "./page-1500-content";
import {
  PAGE_1650_DATE_MODIFIED,
  PAGE_1650_DATE_PUBLISHED,
  PAGE_1650_H1,
  PAGE_1650_SEO,
  PAGE_1650_SIDEBAR_GUIDE_ENTRIES,
  PAGE_1650_SIDEBAR_TOOL_IDS,
  assertRedesignIntermediateHasNoDedicatedUrls,
  buildRedesignEndCtaHref,
  buildRedesignIntermediateNets,
  buildRedesignIntermediateRows,
  buildRedesignPageJsonLd,
  buildRedesignSeoMeta,
  netToGrossOpenGraphType,
} from "./page-1650";
import {
  CONTROL_ENDPOINT_NET,
  REDESIGN_DATE_PUBLISHED,
  REDESIGN_WAVE1_DATE_MODIFIED,
  REDESIGN_WAVE1_EVEN_MAX,
  REDESIGN_WAVE1_EXCEPTION_NET,
  REDESIGN_WAVE2_DATE_MODIFIED,
  getControlWave1Amounts,
  getNetToGrossRedesignDateModified,
  getRedesignWave1Amounts,
  getRedesignWave2Amounts,
  isNetToGrossRedesign,
} from "./redesign-wave";

const SAMPLE_WAVE1 = [1500, 1520, 1640, 1650, 1660, 2000, 3500, 5980] as const;
const SAMPLE_WAVE2 = [1510, 1630, 1670, 5990, 6000] as const;

function jsonLdInput(netMonthly: number) {
  const seo = buildSeriesSeoMeta(netMonthly);
  const path = netToGrossPath(netMonthly);
  return {
    path,
    name: seo.title,
    description: seo.description,
    breadcrumbs: [
      { name: "Accueil", path: "/" },
      { name: NET_TO_GROSS_HUB_BREADCRUMB_LABEL, path: NET_TO_GROSS_HUB_PATH },
      { name: `${netMonthly}`, path },
    ],
    cover: NET_TO_GROSS_SERIES_COVER,
    faq: buildSeriesFaqItems(netMonthly, buildAllProfileEstimates(netMonthly)),
    withAuthor: true,
    dateModified: getNetToGrossRedesignDateModified(netMonthly),
    datePublished: REDESIGN_DATE_PUBLISHED,
  };
}

describe("vagues 1 et 2 de refonte net → brut", () => {
  it("répartit exactement 226 + 225 = 451, sans groupe témoin restant", () => {
    const wave1 = getRedesignWave1Amounts();
    const wave2 = getRedesignWave2Amounts();
    const control = getControlWave1Amounts();

    expect(NET_TO_GROSS_AMOUNTS).toHaveLength(451);
    expect(wave1).toHaveLength(226);
    expect(wave2).toHaveLength(225);
    expect(control).toHaveLength(0);
    expect(new Set([...wave1, ...wave2]).size).toBe(451);
    expect(wave1.every((amount) => isNetToGrossAmount(amount))).toBe(true);
    expect(wave2.every((amount) => isNetToGrossAmount(amount))).toBe(true);
    expect(NET_TO_GROSS_AMOUNTS.every((amount) => isNetToGrossRedesign(amount))).toBe(true);

    expect(wave1[0]).toBe(1500);
    expect(wave1.at(-1)).toBe(REDESIGN_WAVE1_EVEN_MAX);
    expect(wave1).toContain(REDESIGN_WAVE1_EXCEPTION_NET);
    expect(wave1).not.toContain(CONTROL_ENDPOINT_NET);

    expect(wave2[0]).toBe(1510);
    expect(wave2.at(-1)).toBe(CONTROL_ENDPOINT_NET);
    expect(wave2).not.toContain(REDESIGN_WAVE1_EXCEPTION_NET);

    const evenWithoutException = wave1.filter((amount) => amount !== 1650);
    expect(evenWithoutException).toHaveLength(225);
    expect(evenWithoutException.every((amount) => (amount - 1500) % 20 === 0)).toBe(true);
  });

  it("applique le modèle refondu à toute la série, y compris 6 000 €", () => {
    for (const amount of [...SAMPLE_WAVE1, ...SAMPLE_WAVE2]) {
      expect(isNetToGrossRedesign(amount)).toBe(true);
    }
    expect(isNetToGrossRedesign(6000)).toBe(true);
    expect(isNetToGrossRedesign(1490)).toBe(false);
  });

  it("produit des title, H1, meta, canonical et og:type uniques sur les deux vagues", () => {
    const titles = new Set<string>();
    const h1s = new Set<string>();
    const descriptions = new Set<string>();
    const sample = [...SAMPLE_WAVE1, ...SAMPLE_WAVE2];

    for (const amount of sample) {
      const seo = buildSeriesSeoMeta(amount);
      const expected = buildRedesignSeoMeta(amount);
      const path = netToGrossPath(amount);

      expect(seo).toEqual(expected);
      expect(seo.title).toBe(`${expected.h1.replace("combien ça fait ?", "calcul et conversion")}`);
      expect(seo.h1).toBe(expected.h1);
      expect(seo.description).toContain("non-cadre");
      expect(seo.title).not.toContain("2026");
      expect(seo.description).not.toContain("2026");
      expect(seo.title).not.toContain("\u2014");
      expect(path).toBe(`/combien-gagner-brut-mensuel-pour-${amount}-net`);
      expect(isPathIndexable(path)).toBe(true);
      expect(netToGrossOpenGraphType(amount)).toBe("website");

      if (amount !== 1650) {
        expect(seo.title).not.toContain("1 650");
        expect(seo.h1).not.toContain("1 650");
        expect(seo.description).not.toContain("1 650");
      }

      titles.add(seo.title);
      h1s.add(seo.h1);
      descriptions.add(seo.description);
    }

    expect(titles.size).toBe(sample.length);
    expect(h1s.size).toBe(sample.length);
    expect(descriptions.size).toBe(sample.length);
    expect(buildSeriesSeoMeta(1650).title).toBe(PAGE_1650_SEO.title);
    expect(buildSeriesSeoMeta(1650).h1).toBe(PAGE_1650_H1);
  });

  it("préserve dateModified vague 1 et applique la date vague 2", () => {
    expect(getNetToGrossRedesignDateModified(1500)).toBe(REDESIGN_WAVE1_DATE_MODIFIED);
    expect(getNetToGrossRedesignDateModified(1650)).toBe(REDESIGN_WAVE1_DATE_MODIFIED);
    expect(getNetToGrossRedesignDateModified(5980)).toBe(REDESIGN_WAVE1_DATE_MODIFIED);
    expect(getNetToGrossRedesignDateModified(1510)).toBe(REDESIGN_WAVE2_DATE_MODIFIED);
    expect(getNetToGrossRedesignDateModified(1630)).toBe(REDESIGN_WAVE2_DATE_MODIFIED);
    expect(getNetToGrossRedesignDateModified(6000)).toBe(REDESIGN_WAVE2_DATE_MODIFIED);
    expect(PAGE_1650_DATE_PUBLISHED).toBe(REDESIGN_DATE_PUBLISHED);
    expect(PAGE_1650_DATE_MODIFIED).toBe(REDESIGN_WAVE1_DATE_MODIFIED);
  });

  it("aligne JSON-LD, FAQ visible et dates sans pointer vers 1 650 € hors exception", () => {
    for (const amount of [...SAMPLE_WAVE1, ...SAMPLE_WAVE2]) {
      const seo = buildSeriesSeoMeta(amount);
      const document = buildRedesignPageJsonLd(jsonLdInput(amount));
      const graph = document["@graph"] as Record<string, unknown>[];
      const page = graph.find((node) => node["@type"] === "WebPage") as Record<string, unknown>;
      const faq = graph.find((node) => node["@type"] === "FAQPage") as {
        "@id": string;
        mainEntity: Array<{ name: string; acceptedAnswer: { text: string } }>;
      };
      const serialized = JSON.stringify(document);
      const visibleFaq = buildSeriesFaqItems(amount, buildAllProfileEstimates(amount));
      const expectedModified = getNetToGrossRedesignDateModified(amount);

      expect(() => JSON.parse(serialized)).not.toThrow();
      expect(page.name).toBe(seo.title);
      expect(page.description).toBe(seo.description);
      expect(page.url).toBe(`https://www.brut-vers-net.fr${netToGrossPath(amount)}`);
      expect(page).not.toHaveProperty("about");
      expect(page).not.toHaveProperty("mainEntity");
      expect(page.publisher).toEqual({ "@id": schemaIds.organization() });
      expect(page.hasPart).toEqual([{ "@id": schemaIds.faq(netToGrossPath(amount)) }]);
      expect(page.datePublished).toBe("2026-07-15T09:00:00+02:00");
      expect(page.dateModified).toBe(`${expectedModified}T09:00:00+02:00`);
      expect(faq["@id"]).toBe(schemaIds.faq(netToGrossPath(amount)));
      expect(faq.mainEntity.map((item) => item.name)).toEqual(visibleFaq.map((item) => item.question));
      expect(faq.mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
        visibleFaq.map((item) => item.answer),
      );
      expect(visibleFaq).toHaveLength(4);
      expect(buildSeriesEditorial(amount, buildAllProfileEstimates(amount))).toHaveLength(3);
      expect(graph.some((node) => node["@type"] === "Article")).toBe(false);
      expect(graph.some((node) => node["@type"] === "HowTo")).toBe(false);

      if (amount !== 1650) {
        expect(serialized).not.toContain("combien-gagner-brut-mensuel-pour-1650-net");
        expect(JSON.stringify(visibleFaq)).not.toContain("1 650");
      }
    }
  });

  it("calcule brut mensuel et annuel au moteur existant pour les échantillons", () => {
    for (const amount of [...SAMPLE_WAVE1, ...SAMPLE_WAVE2]) {
      const estimates = buildAllProfileEstimates(amount);
      expect(estimates.nonExecutive.grossMonthly).toBe(
        roundCent(amount / getProfileCoefficient("nonExecutive")),
      );
      expect(estimates.executive.grossMonthly).toBe(
        roundCent(amount / getProfileCoefficient("executive")),
      );
      expect(estimates.publicService.grossMonthly).toBe(
        roundCent(amount / getProfileCoefficient("publicService")),
      );
      expect(buildRedesignEndCtaHref(amount)).toBe(`/?net=${amount}&profil=non-cadre`);
    }
  });

  it("construit des tableaux N-5 à N+4 sans chevauchement sur les 451 fiches", () => {
    const seen = new Map<number, number>();
    for (const amount of NET_TO_GROSS_AMOUNTS) {
      const nets = buildRedesignIntermediateNets(amount);
      expect(nets).toHaveLength(10);
      expect(nets[0]).toBe(amount - 5);
      expect(nets[5]).toBe(amount);
      expect(nets[9]).toBe(amount + 4);
      expect(buildRedesignIntermediateRows(amount).filter((row) => row.isCurrent)).toHaveLength(1);
      for (const net of nets) {
        const owner = seen.get(net);
        expect(owner, `${net} déjà dans le tableau de ${owner}`).toBeUndefined();
        seen.set(net, amount);
      }
      expect(assertRedesignIntermediateHasNoDedicatedUrls(amount)).toHaveLength(9);
    }
    expect(seen.size).toBe(4510);
  });

  it("maille uniquement des URLs publiées, hors page courante", () => {
    for (const amount of [...SAMPLE_WAVE1, ...SAMPLE_WAVE2]) {
      const nearby = getSeriesNearbyAmounts(amount);
      expect(nearby).toHaveLength(7);
      expect(nearby).not.toContain(amount);
      expect(nearby.every((item) => isNetToGrossAmount(item))).toBe(true);
    }
  });

  it("compacte la sidebar à quatre liens et préremplit le calculateur", () => {
    expect(PAGE_1650_SIDEBAR_TOOL_IDS.length + PAGE_1650_SIDEBAR_GUIDE_ENTRIES.length).toBe(4);
    expect(buildRedesignEndCtaHref(1500)).toBe("/?net=1500&profil=non-cadre");
    expect(buildRedesignEndCtaHref(1510)).toBe("/?net=1510&profil=non-cadre");
    expect(buildRedesignEndCtaHref(6000)).toBe("/?net=6000&profil=non-cadre");
  });

  it("met à jour lastModified du sitemap selon la vague", () => {
    const pages = getAllPublicPages();
    expect(pages.find((page) => page.path === netToGrossPath(1650))?.lastModified).toBe(
      REDESIGN_WAVE1_DATE_MODIFIED,
    );
    expect(pages.find((page) => page.path === netToGrossPath(1500))?.lastModified).toBe(
      REDESIGN_WAVE1_DATE_MODIFIED,
    );
    expect(pages.find((page) => page.path === netToGrossPath(1510))?.lastModified).toBe(
      REDESIGN_WAVE2_DATE_MODIFIED,
    );
    expect(pages.find((page) => page.path === netToGrossPath(6000))?.lastModified).toBe(
      REDESIGN_WAVE2_DATE_MODIFIED,
    );
  });

  it("aligne 1 650 € sur le même modèle factorisé", () => {
    expect(buildRedesignSeoMeta(1650).title).toBe("1 650 € net en brut : calcul et conversion");
    expect(buildRedesignIntermediateNets(1650)).toEqual([
      1645, 1646, 1647, 1648, 1649, 1650, 1651, 1652, 1653, 1654,
    ]);
    expect(estimateGrossMonthlyFromNet(1650, "nonExecutive")).toBe(roundCent(1650 / 0.78));
  });
});
