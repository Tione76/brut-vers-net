import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getGuideBySlug, getGuidePublicPath, guides, draftGuides } from "./registry";
import { buildGuideTocH2 } from "./utils";
import { buildGuideJsonLd } from "@/site/schema";
import { GUIDE_TOC_CONFIG } from "./toc-groups";
import { GUIDE_HUB_TEASERS } from "./guides-hub-data";
import {
  PRECARITE_H1,
  PRECARITE_META_DESCRIPTION,
  PRECARITE_PATH,
  PRECARITE_PUBLISHED_AT,
  PRECARITE_SEO_TITLE,
  PRECARITE_SLUG,
  PRECARITE_SUBTITLE,
  PRECARITE_UPDATED_AT,
  leaveBaseWithPrecarite,
  leaveIndemnityTenth,
  precariteGross,
  totalContractGross,
} from "@/site/prime-precarite";
import { getAllPublicPages, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import { buildSearchIndex } from "@/site/navigation/site-search-index";
import { formatCoverCredit, getGuideCoverByHref, resolveGuideCover } from "./covers";

describe("guide prime de précarité", () => {
  const slug = PRECARITE_SLUG;

  it("est enregistré sur /prime-precarite et indexable, sans toucher au brouillon banque", () => {
    const guide = getGuideBySlug(slug);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(PRECARITE_PATH);
    expect(guides.some((item) => item.slug === slug)).toBe(true);
    expect(draftGuides.some((item) => item.slug === "banque-petit-salaire")).toBe(true);
    expect(isPathIndexable(PRECARITE_PATH)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === PRECARITE_PATH)).toBe(true);
    expect(getAllPublicPages().some((page) => page.path === PRECARITE_PATH)).toBe(true);
    expect(buildSearchIndex().some((entry) => entry.href === PRECARITE_PATH)).toBe(true);
    expect(GUIDE_HUB_TEASERS[slug]).toBe(
      "À qui est due la prime de fin de CDD ? Retrouvez le calcul, les exceptions et la différence entre le brut, le net et les congés payés.",
    );
    expect(isPathIndexable("/banque-petit-salaire")).toBe(false);
  });

  it("conserve H1, title et meta sans année ni tiret cadratin", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    expect(guide.title).toBe(PRECARITE_H1);
    expect(guide.seoTitle).toBe(PRECARITE_SEO_TITLE);
    expect(guide.description).toBe(PRECARITE_META_DESCRIPTION);
    expect(guide.subtitle).toBe(PRECARITE_SUBTITLE);
    expect(guide.seoTitle).not.toMatch(/2025|2026|2027/);
    expect(guide.description).not.toMatch(/2025|2026|2027/);
    expect(blob).not.toContain("\u2014");
    expect(blob).not.toContain("NewsArticle");
    expect(guide.quickSummary?.variant).toBe("reperes");
    expect(guide.quickSummary?.items).toHaveLength(3);
    expect(guide.faq).toHaveLength(9);
    expect(guide.publishedAt).toBe(PRECARITE_PUBLISHED_AT);
    expect(guide.updatedAt).toBe(PRECARITE_UPDATED_AT);
    expect(PRECARITE_PUBLISHED_AT).toBe("2026-11-14");
  });

  it("vérifie les calculs du guide", () => {
    expect(totalContractGross(2000, 6)).toBe(12000);
    expect(precariteGross(12000, 0.1)).toBe(1200);
    expect(precariteGross(12000, 0.06)).toBe(720);
    expect(leaveBaseWithPrecarite(12000, 1200)).toBe(13200);
    expect(leaveIndemnityTenth(13200)).toBe(1320);
    expect(1200 + 1320).toBe(2520);
    expect(3 * 2000 + 3 * 2200).toBe(12600);
  });

  it("expose sommaire, FAQ et schema cohérents sans couverture inventée", () => {
    const guide = getGuideBySlug(slug)!;
    const toc = buildGuideTocH2(guide);
    const pageToc = toc.filter((entry) => entry.id !== "conclusion");
    expect(pageToc.map((entry) => entry.id)).toEqual([
      "definition",
      "droit-prime",
      "calcul",
      "taux-6-pourcent",
      "brut-net",
      "conges-payes",
      "versement",
      "rupture-anticipee",
      "interim",
      "verifier",
      "questions-frequentes",
      "methodologie-sources",
    ]);
    expect(GUIDE_TOC_CONFIG[slug]!.groups.at(-1)!.end).toBe(toc.length);
    expect(guide.faq.map((item) => item.question)).toHaveLength(9);
    expect(guide.includeFaqSchema).toBe(true);
    expect(guide.includeWebApplicationSchema).not.toBe(true);
    const cover = resolveGuideCover(guide);
    expect(cover?.src).toBe("/images/covers/guides/prime-precarite.webp");
    expect(getGuideCoverByHref(PRECARITE_PATH)?.src).toBe(cover?.src);
    expect(formatCoverCredit(cover!.credit)).toBe("Photo de Jakub Zerdzicki via Pexels");
    expect(cover?.width).toBe(1200);
    expect(cover?.height).toBe(800);

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const types = graph.map((node) => node["@type"]);
    expect(types).toContain("WebPage");
    expect(types).toContain("Article");
    expect(types).toContain("BreadcrumbList");
    expect(types).toContain("FAQPage");
    expect(types).not.toContain("NewsArticle");
    expect(types).not.toContain("HowTo");
    expect(types).not.toContain("WebApplication");

    const article = graph.find((node) => node["@type"] === "Article") as Record<
      string,
      unknown
    >;
    expect(article.headline).toBe(PRECARITE_H1);

    const faqPage = graph.find((node) => node["@type"] === "FAQPage") as {
      mainEntity: { name: string }[];
    };
    expect(faqPage.mainEntity).toHaveLength(9);
    expect(faqPage.mainEntity.map((item) => item.name)).toEqual(
      guide.faq.map((item) => item.question),
    );
  });

  it("reste hors actu et conserve le maillage entrant", () => {
    const pageSource = readFileSync(
      join(process.cwd(), "src/app/prime-precarite/page.tsx"),
      "utf8",
    );
    expect(pageSource).not.toContain("/actu");
    expect(pageSource).not.toContain("NewsArticle");

    const solde = readFileSync(
      join(process.cwd(), "src/site/guides/data/solde-de-tout-compte.ts"),
      "utf8",
    );
    const thirteenth = readFileSync(
      join(process.cwd(), "src/site/guides/data/13eme-mois.ts"),
      "utf8",
    );
    const interim = readFileSync(
      join(process.cwd(), "src/site/guides/data/salaire-interim-calcul-brut-net.ts"),
      "utf8",
    );
    expect(solde).toContain('href: "/prime-precarite"');
    expect(thirteenth).toContain('href: "/prime-precarite"');
    expect(interim).toContain('href: "/prime-precarite"');
  });
});
