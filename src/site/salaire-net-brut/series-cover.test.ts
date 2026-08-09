import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { formatCoverCredit, NET_TO_GROSS_SERIES_COVER } from "@/site/guides/covers";
import { buildWebPageJsonLd } from "@/site/schema";
import { buildSeriesSeoMeta } from "./page-1500-content";
import { NET_TO_GROSS_HUB_PATH, NET_TO_GROSS_INDEX_PATH, netToGrossPath } from "./config";
import {
  buildNetToGrossHubOgImageInput,
  buildNetToGrossIndexOgImageInput,
  buildNetToGrossOgImageInput,
  formatNetToGrossOgHeadline,
  netToGrossOgImagePath,
} from "./og-image-meta";
import { buildNetToGrossHubPayload } from "./hub";
import { buildNetToGrossIndexPayload } from "./series-index";
import { buildNetToGrossIndexRows } from "./index-table";
import { PUBLISHED_NET_TO_GROSS_AMOUNTS } from "./config";

describe("série net mensuel → brut : cover + hub + index", () => {
  it("centralise l’image éditoriale après le ShareBlock", () => {
    expect(NET_TO_GROSS_SERIES_COVER.src).toBe(
      "/images/covers/series/correspondance-salaire-brut-en-net.webp",
    );
    expect(formatCoverCredit(NET_TO_GROSS_SERIES_COVER.credit)).toBe(
      "Photo de Mikhail Nilov via Pexels",
    );

    const pageSource = readFileSync(
      resolve(process.cwd(), "src/site/salaire-net-brut/page-1500.tsx"),
      "utf8",
    );
    const routeSource = readFileSync(
      resolve(process.cwd(), "src/app/net-vers-brut/[montant]/page.tsx"),
      "utf8",
    );

    expect(pageSource).toContain("CoverFigure");
    expect(pageSource).toContain("NET_TO_GROSS_SERIES_COVER");
    expect(pageSource.indexOf("ShareBlock")).toBeLessThan(pageSource.indexOf("CoverFigure"));
    expect(pageSource.indexOf("CoverFigure")).toBeLessThan(
      pageSource.indexOf("editorialSections.map"),
    );
    expect(routeSource).toContain("buildNetToGrossOgImageInput");
    expect(routeSource).toContain("NET_TO_GROSS_SERIES_COVER");
    expect(
      existsSync(resolve(process.cwd(), "src/app/net-vers-brut/[montant]/opengraph-image.tsx")),
    ).toBe(true);
  });

  it("expose ImageObject éditorial distinct de l’OG dynamique", () => {
    const amount = 1500;
    const seo = buildSeriesSeoMeta(amount);
    const path = netToGrossPath(amount);
    const og = buildNetToGrossOgImageInput(amount);
    const jsonLd = buildWebPageJsonLd({
      path,
      name: seo.title,
      description: seo.description,
      breadcrumbs: [
        { name: "Accueil", path: "/" },
        { name: seo.title, path },
      ],
      cover: NET_TO_GROSS_SERIES_COVER,
      withAuthor: true,
    });
    const graph = (jsonLd as { "@graph"?: Array<Record<string, unknown>> })["@graph"] ?? [];
    const imageNode = graph.find(
      (node) =>
        node["@type"] === "ImageObject" &&
        typeof node.url === "string" &&
        node.url.includes("correspondance-salaire-brut-en-net.webp"),
    ) as { width?: number; height?: number; creditText?: string } | undefined;

    expect(og.url).toBe(netToGrossOgImagePath(amount));
    expect(og.width).toBe(1200);
    expect(og.height).toBe(630);
    expect(formatNetToGrossOgHeadline(amount)).toMatch(/1\u202f500.*€ NET \/ MOIS/);
    expect(imageNode?.width).toBe(1200);
    expect(imageNode?.height).toBe(800);
    expect(imageNode?.creditText).toBe("Photo de Mikhail Nilov via Pexels");
  });

  it("construit hub et index sans brouillons, intentions distinctes", () => {
    const hub = buildNetToGrossHubPayload();
    const index = buildNetToGrossIndexPayload();
    const rows = buildNetToGrossIndexRows();

    expect(hub.path).toBe(NET_TO_GROSS_HUB_PATH);
    expect(index.path).toBe(NET_TO_GROSS_INDEX_PATH);
    expect(hub.seo.h1).not.toBe(index.seo.h1);
    expect(hub.seo.title).not.toBe(index.seo.title);
    expect(hub.seo.title).toBe("Salaire net en brut : tous les montants mensuels");
    expect(hub.seo.h1).toBe("Tous les salaires nets mensuels convertis en brut");
    expect(index.seo.title).toBe("Tableau net en brut : salaires mensuels");
    expect(index.seo.h1).toBe("Tableau salaire net en brut : conversion mensuelle");
    expect(hub.seo.description).not.toBe(index.seo.description);
    expect(hub.faq[0]?.question).not.toBe(index.faq[0]?.question);
    expect(hub.catalogCount).toBe(PUBLISHED_NET_TO_GROSS_AMOUNTS.length);
    expect(rows).toHaveLength(PUBLISHED_NET_TO_GROSS_AMOUNTS.length);
    expect(rows[0]?.href).toBe(netToGrossPath(1500));
    expect(rows[rows.length - 1]?.href).toBe(netToGrossPath(6000));
    expect(buildNetToGrossHubOgImageInput().url).toBe(`${NET_TO_GROSS_HUB_PATH}/opengraph-image`);
    expect(buildNetToGrossIndexOgImageInput().url).toBe(
      `${NET_TO_GROSS_INDEX_PATH}/opengraph-image`,
    );
  });
});
