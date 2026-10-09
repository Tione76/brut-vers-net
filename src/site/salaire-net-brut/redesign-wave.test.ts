import { describe, expect, it } from "vitest";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import { roundCent } from "@/site/salary-calculator/conversions";
import { getAllPublicPages, isPathIndexable } from "@/site/public-pages";
import { buildWebPageJsonLd, schemaIds } from "@/site/schema";
import { NET_TO_GROSS_SERIES_COVER } from "@/site/guides/covers";
import {
  NET_TO_GROSS_AMOUNTS,
  NET_TO_GROSS_HUB_BREADCRUMB_LABEL,
  NET_TO_GROSS_HUB_PATH,
  NET_TO_GROSS_UPDATED_AT,
  isNetToGrossAmount,
  netToGrossPath,
} from "./config";
import {
  buildAllProfileEstimates,
  buildComparisonRows,
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
  getControlWave1Amounts,
  getRedesignWave1Amounts,
  isNetToGrossRedesign,
} from "./redesign-wave";

const SAMPLE_REDESIGN = [1500, 1520, 1640, 1650, 1660, 2000, 3500, 5980] as const;
const SAMPLE_CONTROL = [1510, 1630, 1670, 5990, 6000] as const;

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
    dateModified: isNetToGrossRedesign(netMonthly)
      ? REDESIGN_WAVE1_DATE_MODIFIED
      : NET_TO_GROSS_UPDATED_AT,
    datePublished: isNetToGrossRedesign(netMonthly)
      ? REDESIGN_DATE_PUBLISHED
      : NET_TO_GROSS_UPDATED_AT,
  };
}

describe("vague 1 de refonte net → brut", () => {
  it("répartit exactement 226 fiches refondues et 225 témoins sur 451 montants", () => {
    const redesigned = getRedesignWave1Amounts();
    const control = getControlWave1Amounts();

    expect(NET_TO_GROSS_AMOUNTS).toHaveLength(451);
    expect(redesigned).toHaveLength(226);
    expect(control).toHaveLength(225);
    expect(new Set([...redesigned, ...control]).size).toBe(451);
    expect(redesigned.every((amount) => isNetToGrossAmount(amount))).toBe(true);
    expect(control.every((amount) => isNetToGrossAmount(amount))).toBe(true);

    expect(redesigned[0]).toBe(1500);
    expect(redesigned.at(-1)).toBe(REDESIGN_WAVE1_EVEN_MAX);
    expect(redesigned).toContain(REDESIGN_WAVE1_EXCEPTION_NET);
    expect(redesigned).not.toContain(CONTROL_ENDPOINT_NET);

    expect(control[0]).toBe(1510);
    expect(control.at(-1)).toBe(CONTROL_ENDPOINT_NET);
    expect(control).not.toContain(REDESIGN_WAVE1_EXCEPTION_NET);

    const evenWithoutException = redesigned.filter((amount) => amount !== 1650);
    expect(evenWithoutException).toHaveLength(225);
    expect(evenWithoutException.every((amount) => (amount - 1500) % 20 === 0)).toBe(true);
  });

  it("marque 1 650 € comme exception et 6 000 € comme témoin", () => {
    expect(isNetToGrossRedesign(1650)).toBe(true);
    expect(isNetToGrossRedesign(1500)).toBe(true);
    expect(isNetToGrossRedesign(1520)).toBe(true);
    expect(isNetToGrossRedesign(1640)).toBe(true);
    expect(isNetToGrossRedesign(1660)).toBe(true);
    expect(isNetToGrossRedesign(5980)).toBe(true);
    expect(isNetToGrossRedesign(1510)).toBe(false);
    expect(isNetToGrossRedesign(1630)).toBe(false);
    expect(isNetToGrossRedesign(1670)).toBe(false);
    expect(isNetToGrossRedesign(5990)).toBe(false);
    expect(isNetToGrossRedesign(6000)).toBe(false);
  });

  it("produit des title, H1, meta, canonical et og:type uniques pour les fiches refondues", () => {
    const titles = new Set<string>();
    const h1s = new Set<string>();
    const descriptions = new Set<string>();

    for (const amount of SAMPLE_REDESIGN) {
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

    expect(titles.size).toBe(SAMPLE_REDESIGN.length);
    expect(h1s.size).toBe(SAMPLE_REDESIGN.length);
    expect(descriptions.size).toBe(SAMPLE_REDESIGN.length);
    expect(buildSeriesSeoMeta(1650).title).toBe(PAGE_1650_SEO.title);
    expect(buildSeriesSeoMeta(1650).h1).toBe(PAGE_1650_H1);
  });

  it("conserve le SEO, le JSON-LD article et les dates des fiches témoins", () => {
    for (const amount of SAMPLE_CONTROL) {
      const seo = buildSeriesSeoMeta(amount);
      expect(seo.h1).toContain("par mois");
      expect(seo.title).toMatch(/brut mensuel/);
      expect(seo.title).not.toContain("net en brut : calcul");
      expect(netToGrossOpenGraphType(amount)).toBe("article");
      expect(buildSeriesFaqItems(amount, buildAllProfileEstimates(amount))).toHaveLength(3);
      expect(buildSeriesEditorial(amount, buildAllProfileEstimates(amount))[0]?.title).toMatch(
        /^Quel salaire brut pour toucher/,
      );
      expect(buildComparisonRows(amount)).toHaveLength(5);

      const page = (buildWebPageJsonLd(jsonLdInput(amount))["@graph"] as Record<string, unknown>[]).find(
        (node) => node["@type"] === "WebPage",
      ) as Record<string, unknown>;
      expect(page.about).toEqual({ "@id": schemaIds.organization() });
      expect(page.mainEntity).toEqual({ "@id": schemaIds.faq(netToGrossPath(amount)) });
      expect(page).not.toHaveProperty("publisher");
      expect(page).not.toHaveProperty("hasPart");
      expect(page.datePublished).toBe("2026-07-15T09:00:00+02:00");
      expect(page.dateModified).toBe("2026-07-15T09:00:00+02:00");
    }
  });

  it("aligne JSON-LD, FAQ visible et dates de la vague 1 sans pointer vers 1 650 €", () => {
    for (const amount of SAMPLE_REDESIGN) {
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

      expect(() => JSON.parse(serialized)).not.toThrow();
      expect(page.name).toBe(seo.title);
      expect(page.description).toBe(seo.description);
      expect(page.url).toBe(`https://www.brut-vers-net.fr${netToGrossPath(amount)}`);
      expect(page).not.toHaveProperty("about");
      expect(page).not.toHaveProperty("mainEntity");
      expect(page.publisher).toEqual({ "@id": schemaIds.organization() });
      expect(page.hasPart).toEqual([{ "@id": schemaIds.faq(netToGrossPath(amount)) }]);
      expect(page.datePublished).toBe("2026-07-15T09:00:00+02:00");
      expect(page.dateModified).toBe("2026-10-09T09:00:00+02:00");
      expect(faq["@id"]).toBe(schemaIds.faq(netToGrossPath(amount)));
      expect(faq.mainEntity.map((item) => item.name)).toEqual(visibleFaq.map((item) => item.question));
      expect(faq.mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
        visibleFaq.map((item) => item.answer),
      );
      expect(graph.some((node) => node["@type"] === "Article")).toBe(false);
      expect(graph.some((node) => node["@type"] === "HowTo")).toBe(false);

      if (amount !== 1650) {
        expect(serialized).not.toContain("combien-gagner-brut-mensuel-pour-1650-net");
        expect(JSON.stringify(visibleFaq)).not.toContain("1 650");
      }
    }

    expect(PAGE_1650_DATE_PUBLISHED).toBe("2026-07-15");
    expect(PAGE_1650_DATE_MODIFIED).toBe("2026-10-09");
  });

  it("calcule brut mensuel et annuel au moteur existant pour les échantillons", () => {
    for (const amount of SAMPLE_REDESIGN) {
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

  it("construit des tableaux N-5 à N+4 sans chevauchement dans la vague 1", () => {
    const seen = new Map<number, number>();
    for (const amount of getRedesignWave1Amounts()) {
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
  });

  it("signale les chevauchements hérités entre tableaux refondus et tableaux témoins ±50 €", () => {
    const redesignNets = new Map<number, number>();
    for (const amount of getRedesignWave1Amounts()) {
      for (const net of buildRedesignIntermediateNets(amount)) {
        redesignNets.set(net, amount);
      }
    }

    const inherited: Array<{ control: number; net: number; redesignOwner: number }> = [];
    for (const amount of getControlWave1Amounts()) {
      for (const row of buildComparisonRows(amount)) {
        const owner = redesignNets.get(row.netMonthly);
        if (owner !== undefined) {
          inherited.push({ control: amount, net: row.netMonthly, redesignOwner: owner });
        }
      }
    }

    expect(inherited.length).toBeGreaterThan(0);
    expect(inherited.every((item) => item.net % 10 === 0)).toBe(true);
    expect(inherited.some((item) => item.control === 1510 && item.net === 1560)).toBe(true);
  });

  it("maille uniquement des URLs publiées, hors page courante", () => {
    for (const amount of [...SAMPLE_REDESIGN, ...SAMPLE_CONTROL]) {
      const nearby = getSeriesNearbyAmounts(amount);
      expect(nearby).toHaveLength(7);
      expect(nearby).not.toContain(amount);
      expect(nearby.every((item) => isNetToGrossAmount(item))).toBe(true);
    }
  });

  it("compacte la sidebar à six liens et préremplit le calculateur", () => {
    expect(PAGE_1650_SIDEBAR_TOOL_IDS.length + PAGE_1650_SIDEBAR_GUIDE_ENTRIES.length).toBe(6);
    expect(buildRedesignEndCtaHref(1500)).toBe("/?net=1500&profil=non-cadre");
    expect(buildRedesignEndCtaHref(5980)).toBe("/?net=5980&profil=non-cadre");
  });

  it("met à jour lastModified du sitemap uniquement pour la vague 1", () => {
    const pages = getAllPublicPages();
    expect(pages.find((page) => page.path === netToGrossPath(1650))?.lastModified).toBe(
      REDESIGN_WAVE1_DATE_MODIFIED,
    );
    expect(pages.find((page) => page.path === netToGrossPath(1500))?.lastModified).toBe(
      REDESIGN_WAVE1_DATE_MODIFIED,
    );
    expect(pages.find((page) => page.path === netToGrossPath(1510))?.lastModified).toBe(
      NET_TO_GROSS_UPDATED_AT,
    );
    expect(pages.find((page) => page.path === netToGrossPath(6000))?.lastModified).toBe(
      NET_TO_GROSS_UPDATED_AT,
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
