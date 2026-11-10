import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getGuideBySlug, getGuidePublicPath, guides, draftGuides } from "./registry";
import { buildGuideTocH2 } from "./utils";
import { buildGuideJsonLd } from "@/site/schema";
import {
  formatCoverCredit,
  getGuideCoverByHref,
  resolveGuideCover,
} from "./covers";
import { GUIDE_TOC_CONFIG } from "./toc-groups";
import { GUIDE_HUB_TEASERS } from "./guides-hub-data";
import {
  PART_TIME_H1,
  PART_TIME_META_DESCRIPTION,
  PART_TIME_PATH,
  PART_TIME_SEO_TITLE,
  PART_TIME_SLUG,
  PART_TIME_SMIC_CONTEXT,
  transportRefundBelowHalf,
} from "@/site/salaire-temps-partiel";
import { getAllPublicPages, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import { buildSearchIndex } from "@/site/navigation/site-search-index";

describe("guide salaire temps partiel", () => {
  const slug = PART_TIME_SLUG;

  it("est publié sur /salaire-temps-partiel et indexable", () => {
    const guide = getGuideBySlug(slug);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(PART_TIME_PATH);
    expect(guides.some((item) => item.slug === slug)).toBe(true);
    expect(draftGuides.some((item) => item.slug === "banque-petit-salaire")).toBe(true);
    expect(isPathIndexable(PART_TIME_PATH)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === PART_TIME_PATH)).toBe(true);
    expect(getAllPublicPages().some((page) => page.path === PART_TIME_PATH)).toBe(true);
    expect(buildSearchIndex().some((entry) => entry.href === PART_TIME_PATH)).toBe(true);
    expect(GUIDE_HUB_TEASERS[slug]).toBeTruthy();
  });

  it("conserve H1, title et meta sans année, sans tiret cadratin ni consignes internes", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    expect(guide.title).toBe(PART_TIME_H1);
    expect(guide.seoTitle).toBe(PART_TIME_SEO_TITLE);
    expect(guide.description).toBe(PART_TIME_META_DESCRIPTION);
    expect(guide.seoTitle).not.toMatch(/2025|2026|2027/);
    expect(guide.description).not.toMatch(/2025|2026|2027/);
    expect(blob).not.toContain("\u2014");
    expect(blob).not.toContain("Aucun exemple de net inventé");
    expect(blob).not.toContain("aucun net non vérifié");
    expect(blob).not.toContain("silencieusement");
    expect(blob).not.toContain("source centralisée");
    expect(blob).not.toContain("ne le mensualisez pas");
    expect(blob).not.toContain("fabriquer un net");
    expect(blob).toContain("Les exemples concernent un salarié du secteur privé");
    expect(blob).toContain("0,80");
    expect(blob).toContain(PART_TIME_SMIC_CONTEXT.caption);
  });

  it("expose couverture, sommaire, FAQ complète et schema cohérent", () => {
    const guide = getGuideBySlug(slug)!;
    const toc = buildGuideTocH2(guide);
    const pageToc = toc.filter((entry) => entry.id !== "conclusion");
    expect(pageToc.map((entry) => entry.id)).toEqual([
      "salaire-selon-duree",
      "comment-calculer",
      "salaire-a-80-pourcent",
      "salaire-mi-temps",
      "salaire-24-heures",
      "smic-temps-partiel",
      "estimer-salaire-net",
      "perte-reelle",
      "primes-avantages",
      "heures-complementaires",
      "conges-anciennete-retraite",
      "aides-temps-partiel",
      "limites-prorata",
      "checklist-avant-signature",
      "questions-frequentes",
      "methodologie-sources",
    ]);
    expect(GUIDE_TOC_CONFIG[slug]!.groups.at(-1)!.end).toBe(toc.length);
    expect(guide.conclusion.title).toBe("Pour conclure");
    expect(guide.conclusion.keyPoints).toEqual([]);
    expect(guide.conclusion.closingText).toContain(
      "partez du salaire brut de base et de la durée de référence",
    );
    expect(JSON.stringify(guide)).toContain(
      "Les exemples de ce guide ne s'appliquent donc pas directement aux agents publics.",
    );
    expect(JSON.stringify(guide)).not.toContain(
      "Ne pas appliquer les règles du privé à un agent public",
    );

    expect(guide.faq).toHaveLength(8);
    for (const item of guide.faq) {
      expect(item.question.trim().length).toBeGreaterThan(0);
      expect(item.answer.trim().length).toBeGreaterThan(20);
    }
    expect(
      guide.faq.find((item) => item.question.includes("0,8"))?.answer,
    ).toContain("ordre de grandeur");

    const cover = resolveGuideCover(guide);
    expect(cover?.src).toBe("/images/covers/guides/salaire-temps-partiel.webp");
    expect(getGuideCoverByHref(PART_TIME_PATH)?.src).toBe(cover?.src);
    expect(formatCoverCredit(cover!.credit)).toBe("Photo de Hanna Pad via Pexels");
    expect(cover?.alt.toLowerCase()).not.toContain("bulletin");
    expect(cover?.alt.toLowerCase()).not.toContain("80 %");

    expect(guide.includeWebApplicationSchema).not.toBe(true);
    expect(transportRefundBelowHalf(40, 10)).toBe(22.86);

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const types = graph.map((node) => node["@type"]);
    expect(types).toContain("WebPage");
    expect(types).toContain("Article");
    expect(types).toContain("BreadcrumbList");
    expect(types).toContain("FAQPage");
    expect(types).not.toContain("WebApplication");

    const article = graph.find((node) => node["@type"] === "Article") as {
      headline?: string;
      image?: unknown;
    };
    expect(article?.headline).toBe(PART_TIME_H1);

    const image = graph.find(
      (node) => node["@id"] === `https://www.brut-vers-net.fr${PART_TIME_PATH}#primaryimage`,
    ) as { url?: string } | undefined;
    expect(image?.url).toContain("salaire-temps-partiel.webp");

    const faqPage = graph.find((node) => node["@type"] === "FAQPage") as {
      mainEntity?: Array<{ name?: string; acceptedAnswer?: { text?: string } }>;
    };
    expect(faqPage?.mainEntity).toHaveLength(8);
    for (const entity of faqPage?.mainEntity ?? []) {
      expect(entity.name?.trim().length).toBeGreaterThan(0);
      expect(entity.acceptedAnswer?.text?.trim().length).toBeGreaterThan(20);
    }
  });

  it("conserve le maillage entrant", () => {
    const hours = readFileSync(
      join(process.cwd(), "src/site/guides/data/smic-selon-nombre-heures.ts"),
      "utf8",
    );
    expect(hours).toContain("/salaire-temps-partiel");
    const calculer = readFileSync(
      join(process.cwd(), "src/site/guides/data/comment-calculer-son-salaire-net.ts"),
      "utf8",
    );
    expect(calculer).toContain("/salaire-temps-partiel");
    const fiche = readFileSync(
      join(process.cwd(), "src/site/guides/data/comment-lire-une-fiche-de-paie.ts"),
      "utf8",
    );
    expect(fiche).toContain("/salaire-temps-partiel");
  });
});
