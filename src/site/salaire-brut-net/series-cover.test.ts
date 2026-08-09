import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { formatCoverCredit, GROSS_TO_NET_SERIES_COVER } from "@/site/guides/covers";
import { buildWebPageJsonLd } from "@/site/schema";
import { buildGrossToNetSeoMeta } from "./content";
import { grossToNetPath } from "./config";
import {
  buildGrossToNetOgAlt,
  buildGrossToNetOgImageInput,
  formatGrossToNetOgHeadline,
  grossToNetOgImagePath,
} from "./og-image";

describe("cover série salaire brut mensuel → net", () => {
  it("centralise l’image éditoriale dans le template et le Schema", () => {
    expect(GROSS_TO_NET_SERIES_COVER.src).toBe(
      "/images/covers/series/Salaire-brut-mensuel-en-net.webp",
    );
    expect(formatCoverCredit(GROSS_TO_NET_SERIES_COVER.credit)).toBe(
      "Photo de Mikhail Nilov via Pexels",
    );

    const pageSource = readFileSync(
      resolve(process.cwd(), "src/site/salaire-brut-net/page-1000.tsx"),
      "utf8",
    );
    const routeSource = readFileSync(
      resolve(process.cwd(), "src/app/salaire-brut-net/[montant]/page.tsx"),
      "utf8",
    );
    const draftSource = readFileSync(
      resolve(process.cwd(), "src/drafts/salaire-brut-net/prepare.ts"),
      "utf8",
    );

    expect(pageSource).toContain("CoverFigure");
    expect(pageSource).toContain("GROSS_TO_NET_SERIES_COVER");
    expect(pageSource.indexOf("ShareBlock")).toBeLessThan(pageSource.indexOf("CoverFigure"));
    expect(pageSource.indexOf("CoverFigure")).toBeLessThan(
      pageSource.indexOf("editorialSections.map"),
    );
    expect(routeSource).toContain("GROSS_TO_NET_SERIES_COVER");
    expect(routeSource).toContain("buildGrossToNetOgImageInput");
    expect(routeSource).not.toMatch(/ogImage:\s*coverToOgInput\(GROSS_TO_NET_SERIES_COVER\)/);
    expect(draftSource).toContain("GROSS_TO_NET_SERIES_COVER");
    expect(draftSource).toContain("buildGrossToNetOgImageInput");
  });

  it("conserve ImageObject éditorial distinct de l’image OG dynamique", () => {
    const amount = 1550;
    const seo = buildGrossToNetSeoMeta(amount);
    const path = grossToNetPath(amount);
    const og = buildGrossToNetOgImageInput(amount);
    const jsonLd = buildWebPageJsonLd({
      path,
      name: seo.title,
      description: seo.description,
      breadcrumbs: [
        { name: "Accueil", path: "/" },
        { name: seo.title, path },
      ],
      cover: GROSS_TO_NET_SERIES_COVER,
      withAuthor: true,
    });
    const graph = (jsonLd as { "@graph"?: Array<Record<string, unknown>> })["@graph"] ?? [];
    const imageNode = graph.find(
      (node) =>
        node["@type"] === "ImageObject" &&
        typeof node.url === "string" &&
        node.url.includes("Salaire-brut-mensuel-en-net.webp"),
    ) as
      | {
          url?: string;
          contentUrl?: string;
          width?: number;
          height?: number;
          caption?: string;
          creditText?: string;
        }
      | undefined;

    expect(og.url).toBe(grossToNetOgImagePath(amount));
    expect(og.width).toBe(1200);
    expect(og.height).toBe(630);
    expect(og.type).toBe("image/png");
    expect(formatGrossToNetOgHeadline(amount)).toBe("1\u202f550\u00a0€ BRUT / MOIS");
    expect(buildGrossToNetOgAlt(amount)).toContain("1\u202f550");
    expect(imageNode?.url).toContain("Salaire-brut-mensuel-en-net.webp");
    expect(imageNode?.contentUrl).toBe(imageNode?.url);
    expect(imageNode?.width).toBe(1200);
    expect(imageNode?.height).toBe(800);
    expect(imageNode?.caption).toBe(GROSS_TO_NET_SERIES_COVER.alt);
    expect(imageNode?.creditText).toBe("Photo de Mikhail Nilov via Pexels");
  });
});
