import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import { getAllPublicPages, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import { siteConfig } from "@/site/site.config";
import { DRAFT_GROSS_TO_NET_AMOUNTS } from "@/drafts/salaire-brut-net/amounts";
import {
  GROSS_TO_NET_HUB_PATH,
  GROSS_TO_NET_INDEX_PATH,
  PUBLISHED_GROSS_TO_NET_AMOUNTS,
  grossToNetPath,
} from "./config";
import {
  buildGrossToNetHubFaq,
  buildGrossToNetHubPayload,
  buildGrossToNetHubRanges,
  buildGrossToNetHubSeo,
} from "./hub";
import { buildGrossToNetIndexFaq, buildGrossToNetIndexSeo } from "./series-index";

describe("page Hub salaire brut mensuel en net", () => {
  it("reste accessible, indexable et différencié de l'Index", () => {
    const seo = buildGrossToNetHubSeo();
    const indexSeo = buildGrossToNetIndexSeo();
    const hub = buildGrossToNetHubPayload();

    expect(hub.path).toBe(GROSS_TO_NET_HUB_PATH);
    expect(hub.canonical).toBe(`${siteConfig.url}${GROSS_TO_NET_HUB_PATH}`);
    expect(hub.canonical).toBe("https://brut-vers-net.fr/salaire-brut-mensuel-en-net");
    expect(isPathIndexable(hub.path)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === hub.path)).toBe(true);
    expect(getAllPublicPages().some((page) => page.path === hub.path && page.indexable)).toBe(
      true,
    );

    expect(seo.h1).toBe("Tous les salaires bruts mensuels convertis en net");
    expect(seo.title).toBe("Salaire brut mensuel en net : toutes les fiches");
    expect(seo.title).not.toBe(seo.h1);
    expect(seo.title).not.toBe(indexSeo.title);
    expect(seo.h1).not.toBe(indexSeo.h1);
    expect(seo.description).not.toBe(indexSeo.description);
    expect(seo.subtitle).not.toBe(indexSeo.subtitle);
    expect([...seo.description].length).toBeLessThanOrEqual(160);
  });

  it("supprime le tableau et expose toutes les fiches publiées une seule fois", () => {
    const hub = buildGrossToNetHubPayload();
    const pageSource = readFileSync(
      resolve(process.cwd(), "src/site/salaire-brut-net/hub-page.tsx"),
      "utf8",
    );

    expect(pageSource).not.toContain("<table");
    expect(pageSource).not.toContain("indexRows");
    expect(hub).not.toHaveProperty("indexRows");
    expect(hub.ficheLinks).toHaveLength(51);
    expect(hub.catalogCount).toBe(51);

    const amounts = hub.ficheLinks.map((link) => link.amount);
    expect(amounts).toEqual([...PUBLISHED_GROSS_TO_NET_AMOUNTS]);
    expect(new Set(amounts).size).toBe(51);

    for (const link of hub.ficheLinks) {
      expect(link.href).toBe(grossToNetPath(link.amount));
      expect(link.amount).toBeLessThanOrEqual(3500);
    }
    for (const draft of DRAFT_GROSS_TO_NET_AMOUNTS) {
      expect(amounts).not.toContain(draft);
    }
  });

  it("regroupe les montants par tranches générées depuis le catalogue", () => {
    const ranges = buildGrossToNetHubRanges();
    expect(ranges.map((range) => [range.from, range.to])).toEqual([
      [1000, 1500],
      [1550, 2000],
      [2050, 2500],
      [2550, 3000],
      [3050, 3500],
    ]);
    expect(ranges.reduce((sum, range) => sum + range.links.length, 0)).toBe(51);

    const withFuture = buildGrossToNetHubRanges([...PUBLISHED_GROSS_TO_NET_AMOUNTS, 3550, 4000]);
    expect(withFuture.at(-1)).toMatchObject({ from: 3550, to: 4000 });
  });

  it("maille calculateur, Index et guides réels", () => {
    const hub = buildGrossToNetHubPayload();
    expect(hub.calculatorPath).toBe("/");
    expect(hub.indexPath).toBe(GROSS_TO_NET_INDEX_PATH);
    expect(hub.paths.map((path) => path.href)).toEqual(["/", GROSS_TO_NET_INDEX_PATH]);
    expect(hub.furtherLinks.map((link) => link.href)).toEqual([
      "/",
      GROSS_TO_NET_INDEX_PATH,
      "/guides/comment-calculer-son-salaire-net",
      "/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net",
    ]);
    expect(hub.methodology.paragraphs.join(" ")).toContain(
      getProfileCoefficient("nonExecutive").toFixed(2).replace(".", ","),
    );
  });

  it("synchronise FAQ Hub visible et FAQPage, distincte de l'Index", () => {
    const faq = buildGrossToNetHubFaq();
    const indexFaq = buildGrossToNetIndexFaq();
    const hub = buildGrossToNetHubPayload();
    const graph = (hub.jsonLd as { "@graph"?: Array<Record<string, unknown>> })["@graph"] ?? [];
    const faqNode = graph.find((node) => node["@type"] === "FAQPage") as
      | { mainEntity?: Array<{ name?: string; acceptedAnswer?: { text?: string } }> }
      | undefined;

    expect(faq).toHaveLength(4);
    expect(hub.faq).toEqual(faq);
    expect(faq.map((item) => item.question)).not.toEqual(indexFaq.map((item) => item.question));
    expect(faq.some((item) => item.question.includes("Quelle fiche choisir"))).toBe(true);
    expect(faqNode?.mainEntity).toHaveLength(4);
    for (let i = 0; i < faq.length; i += 1) {
      expect(faqNode?.mainEntity?.[i]?.name).toBe(faq[i]?.question);
      expect(faqNode?.mainEntity?.[i]?.acceptedAnswer?.text).toBe(faq[i]?.answer);
    }

    const types = graph.map((node) => node["@type"]);
    expect(types).toEqual(
      expect.arrayContaining([
        "WebPage",
        "BreadcrumbList",
        "FAQPage",
        "Organization",
        "WebSite",
        "Person",
      ]),
    );
  });
});
