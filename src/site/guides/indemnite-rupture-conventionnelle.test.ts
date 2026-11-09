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
  RC_EXAMPLE_REFERENCE_SALARY,
  RC_H1,
  RC_META_DESCRIPTION,
  RC_PASS_2026,
  RC_PASS_2_2026,
  RC_PASS_6_2026,
  RC_PATH,
  RC_SEO_TITLE,
  RC_SLUG,
  RC_UNEMPLOYMENT_SPECIFIC_DELAY_DIVISOR_2026,
  formatRcDivisor,
  legalSeveranceGross,
  rcLegalExampleRows,
  unemploymentSpecificDelayDays,
  yearsFromCompleteMonths,
} from "@/site/indemnite-rupture-conventionnelle";
import { getAllPublicPages, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import { buildSearchIndex } from "@/site/navigation/site-search-index";

describe("guide indemnité rupture conventionnelle", () => {
  const slug = RC_SLUG;

  it("est publié sur /indemnite-rupture-conventionnelle et indexable", () => {
    const guide = getGuideBySlug(slug);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(RC_PATH);
    expect(guides.some((item) => item.slug === slug)).toBe(true);
    expect(draftGuides.some((item) => item.slug === "banque-petit-salaire")).toBe(true);
    expect(isPathIndexable(RC_PATH)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === RC_PATH)).toBe(true);
    expect(getAllPublicPages().some((page) => page.path === RC_PATH)).toBe(true);
    expect(buildSearchIndex().some((entry) => entry.href === RC_PATH)).toBe(true);
    expect(GUIDE_HUB_TEASERS[slug]).toBeTruthy();
    expect(isPathIndexable("/banque-petit-salaire")).toBe(false);
  });

  it("conserve H1, title et meta sans année, sans tiret cadratin ni consignes internes", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    expect(guide.title).toBe(RC_H1);
    expect(guide.seoTitle).toBe(RC_SEO_TITLE);
    expect(guide.description).toBe(RC_META_DESCRIPTION);
    expect(guide.seoTitle).not.toMatch(/2025|2026|2027/);
    expect(guide.description).not.toMatch(/2025|2026|2027/);
    expect(blob).not.toContain("\u2014");
    expect(blob).not.toContain("Aucun montant inventé");
    expect(blob).not.toContain("silencieusement");
    expect(blob).not.toContain("référence SEO");
    expect(blob).not.toContain("source centralisée");
    expect(blob).not.toContain("Nous n'avons pas créé de calculateur");
    expect(blob).toContain("Les exemples concernent une rupture conventionnelle individuelle");
    expect(blob).toContain(
      "Vous pouvez percevoir une indemnité de rupture conventionnelle même avec moins de huit mois d'ancienneté.",
    );
    expect(blob).not.toContain("sans reprendre la condition de huit mois");
    expect(blob).not.toContain("Créer un conflit fictif");
    expect(blob).not.toContain("faux total bancaire");
    expect(blob).not.toContain("Aucun convertisseur salarial");
    expect(blob).not.toContain("formule hybride");
    expect(blob).not.toContain("/calculateurs/indemnite-licenciement");
    expect(blob).not.toContain("/grille-salaire-syntec");
    expect(blob).toContain("S × 1/4 × 10 + S × 1/3 × 5");
    expect(blob).toContain("111,8");
    expect(blob).toContain("≈ 25,72");
    expect(blob).toContain("Ces limites se comparent ; elles ne s'additionnent pas");
  });

  it("vérifie les calculs légaux et le différé Unédic 2026", () => {
    expect(legalSeveranceGross(RC_EXAMPLE_REFERENCE_SALARY, 1)).toBe(625);
    expect(legalSeveranceGross(RC_EXAMPLE_REFERENCE_SALARY, 3)).toBe(1875);
    expect(legalSeveranceGross(RC_EXAMPLE_REFERENCE_SALARY, 5)).toBe(3125);
    expect(legalSeveranceGross(RC_EXAMPLE_REFERENCE_SALARY, 10)).toBe(6250);
    expect(legalSeveranceGross(RC_EXAMPLE_REFERENCE_SALARY, 15)).toBe(10416.67);
    expect(legalSeveranceGross(RC_EXAMPLE_REFERENCE_SALARY, 20)).toBe(14583.33);
    expect(legalSeveranceGross(RC_EXAMPLE_REFERENCE_SALARY, 12.5)).toBe(8333.33);
    expect(
      legalSeveranceGross(RC_EXAMPLE_REFERENCE_SALARY, yearsFromCompleteMonths(6)),
    ).toBe(312.5);

    const rows = rcLegalExampleRows();
    expect(rows.map((row) => row.amount)).toEqual([
      625, 1875, 3125, 6250, 10416.67, 14583.33,
    ]);

    expect(RC_PASS_2026).toBe(48060);
    expect(RC_PASS_2_2026).toBe(96120);
    expect(RC_PASS_6_2026).toBe(288360);
    expect(RC_UNEMPLOYMENT_SPECIFIC_DELAY_DIVISOR_2026).toBe(111.8);
    expect(formatRcDivisor()).toBe("111,8");
    // Unédic : nombre entier de jours (fraction non retenue). 2875 ÷ 111,8 ≈ 25,72 → 25.
    expect(unemploymentSpecificDelayDays(2875)).toBe(25);
    expect(unemploymentSpecificDelayDays(1372)).toBe(12);
  });

  it("expose sommaire sans conclusion, FAQ complète et schema cohérent", () => {
    const guide = getGuideBySlug(slug)!;
    const toc = buildGuideTocH2(guide);
    const pageToc = toc.filter((entry) => entry.id !== "conclusion");
    expect(pageToc.map((entry) => entry.id)).toEqual([
      "montant-minimum",
      "comment-calculer",
      "salaire-de-reference",
      "convention-collective",
      "negociation",
      "brut-net-prelevements",
      "autres-sommes-depart",
      "calendrier-versement",
      "consequences-chomage",
      "checklist-avant-signature",
      "questions-frequentes",
      "methodologie-sources",
    ]);
    expect(GUIDE_TOC_CONFIG[slug]!.groups.at(-1)!.end).toBe(pageToc.length);
    expect(guide.conclusion.keyPoints).toEqual([]);
    expect(guide.faq).toHaveLength(8);
    for (const item of guide.faq) {
      expect(item.question.trim().length).toBeGreaterThan(0);
      expect(item.answer.trim().length).toBeGreaterThan(20);
    }

    const cover = resolveGuideCover(guide);
    expect(cover?.src).toBe("/images/covers/guides/indemnite-rupture-conventionnelle.webp");
    expect(getGuideCoverByHref(RC_PATH)?.src).toBe(cover?.src);
    expect(formatCoverCredit(cover!.credit)).toBe("Photo de Jakub Zerdzicki via Pexels");
    expect(cover?.width).toBe(1200);
    expect(cover?.height).toBe(800);
    expect(cover?.alt.toLowerCase()).not.toContain("rupture");
    expect(cover?.alt.toLowerCase()).not.toContain("indemnité");

    expect(guide.includeWebApplicationSchema).not.toBe(true);

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
    expect(article?.headline).toBe(RC_H1);
    expect(article?.image).toBeTruthy();

    const image = graph.find(
      (node) =>
        node["@id"] === `https://www.brut-vers-net.fr${RC_PATH}#primaryimage`,
    ) as { url?: string; creditText?: string } | undefined;
    expect(image?.url).toContain("indemnite-rupture-conventionnelle.webp");
    expect(image?.creditText).toBe("Photo de Jakub Zerdzicki via Pexels");

    const faqPage = graph.find((node) => node["@type"] === "FAQPage") as {
      mainEntity?: Array<{ name?: string; acceptedAnswer?: { text?: string } }>;
    };
    expect(faqPage?.mainEntity).toHaveLength(8);
    for (const entity of faqPage?.mainEntity ?? []) {
      expect(entity.name?.trim().length).toBeGreaterThan(0);
      expect(entity.acceptedAnswer?.text?.trim().length).toBeGreaterThan(20);
    }
  });

  it("conserve le maillage entrant depuis le solde de tout compte", () => {
    const solde = readFileSync(
      join(process.cwd(), "src/site/guides/data/solde-de-tout-compte.ts"),
      "utf8",
    );
    expect(solde).toContain("/indemnite-rupture-conventionnelle");
  });
});
