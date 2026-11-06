import { describe, expect, it } from "vitest";
import { getGuideBySlug, getGuidePublicPath, guides } from "./registry";
import { buildGuideTocH2 } from "./utils";
import { buildGuideJsonLd } from "@/site/schema";
import { formatCoverCredit, getGuideCoverByHref, resolveGuideCover } from "./covers";
import { GUIDE_TOC_CONFIG } from "./toc-groups";
import { GUIDE_HUB_TEASERS } from "./guides-hub-data";
import {
  SYNTEC_AGREEMENT,
  SYNTEC_ETAM_ROWS,
  SYNTEC_EXAMPLES,
  SYNTEC_H1,
  SYNTEC_IC_ROWS,
  SYNTEC_META_DESCRIPTION,
  SYNTEC_PATH,
  SYNTEC_SEO_TITLE,
  SYNTEC_SLUG,
  SYNTEC_SOURCES,
  annualReferenceCents,
  annualRetainedCents,
  etamBelowSmicPositions,
  etamTableRows,
  forfaitAnnualMinimumCents,
  formatSyntecEuro,
  icTableRows,
  monthlyFloor95Cents,
} from "@/site/grille-salaire-syntec";
import { SMIC_CURRENT } from "@/site/smic/data";
import { getAllPublicPages, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import { buildSearchIndex } from "@/site/navigation/site-search-index";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("guide grille salaire Syntec", () => {
  const slug = SYNTEC_SLUG;

  it("est enregistrée sur /grille-salaire-syntec et indexable", () => {
    const guide = getGuideBySlug(slug);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(SYNTEC_PATH);
    expect(guides.some((item) => item.slug === slug)).toBe(true);
    expect(isPathIndexable(SYNTEC_PATH)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === SYNTEC_PATH)).toBe(true);
    expect(getAllPublicPages().some((page) => page.path === SYNTEC_PATH)).toBe(true);
    expect(buildSearchIndex().some((entry) => entry.href === SYNTEC_PATH)).toBe(true);
    expect(GUIDE_HUB_TEASERS[slug]).toBeTruthy();
  });

  it("conserve H1, title et meta sans année", () => {
    const guide = getGuideBySlug(slug)!;
    expect(guide.title).toBe(SYNTEC_H1);
    expect(guide.seoTitle).toBe(SYNTEC_SEO_TITLE);
    expect(guide.description).toBe(SYNTEC_META_DESCRIPTION);
    expect(guide.seoTitle).toBe("Grille de salaire Syntec par coefficient (mis à jour)");
    expect(guide.seoTitle).toMatch(/\(mis à jour\)$/);
    expect(guide.seoTitle).not.toMatch(/2025|2026|2027/);
    expect(guide.description).not.toMatch(/2025|2026|2027/);
    expect(SYNTEC_PATH).not.toMatch(/2025|2026|2027/);
    expect(JSON.stringify(guide)).not.toContain("\u2014");
    expect(JSON.stringify(guide)).not.toContain("@/site/smic/data");
    expect(JSON.stringify(guide)).not.toContain("source centralisée");
    expect(JSON.stringify(guide)).not.toContain("Sans précision particulière");
    expect(JSON.stringify(guide)).not.toContain("prime exceptionnelle inventée");
    expect(JSON.stringify(guide)).not.toContain("signé l'année précédente");
    expect(JSON.stringify(guide)).not.toContain("Quatre contrôles distincts existent");
  });

  it("centralise la grille ETAM et IC de l'accord du 26 juin 2024", () => {
    expect(SYNTEC_ETAM_ROWS).toHaveLength(8);
    expect(SYNTEC_IC_ROWS).toHaveLength(9);
    expect(SYNTEC_ETAM_ROWS[0]).toMatchObject({
      position: "1.1",
      coefficient: 240,
      monthlyGrossCents: 181_500,
      belowSmic: true,
    });
    expect(etamBelowSmicPositions()).toEqual(["1.1", "1.2"]);
    expect(etamTableRows()[0]).toEqual(["1.1*", "240", formatSyntecEuro(181_500)]);
    expect(etamTableRows()[0]).toHaveLength(3);
    expect(icTableRows()[0]).toHaveLength(3);
    expect(SYNTEC_IC_ROWS.filter((row) => row.position === "2.1")).toHaveLength(2);
    expect(SYNTEC_ETAM_ROWS[0]!.monthlyGrossCents / 100).toBeLessThan(SMIC_CURRENT.monthlyGross);
    expect(SYNTEC_AGREEMENT.effectiveFrom).toBe("2025-01-01");
    expect(SYNTEC_SOURCES.legifranceAccordSalaires.href).toContain("KALITEXT000050228699");

    const annualGap =
      annualReferenceCents(SYNTEC_EXAMPLES.annualControl.monthlyMinimumCents) -
      annualRetainedCents(SYNTEC_EXAMPLES.annualControl.monthlyRetainedCents);
    expect(annualGap).toBe(102_000);
    expect(monthlyFloor95Cents(218_500)).toBe(207_575);
    expect(
      forfaitAnnualMinimumCents(
        SYNTEC_EXAMPLES.cadreForfaitJours.monthlyGrossCents,
        SYNTEC_EXAMPLES.cadreForfaitJours.rate,
      ),
    ).toBe(5_256_000);
    expect(
      forfaitAnnualMinimumCents(
        SYNTEC_EXAMPLES.cadreForfaitJoursPosition23.monthlyGrossCents,
        SYNTEC_EXAMPLES.cadreForfaitJoursPosition23.rate,
      ),
    ).toBe(4_794_600);
    expect(SYNTEC_SOURCES.legifranceRealisationMissions.href).toContain(
      "KALIARTI000005851638",
    );
    expect(SYNTEC_SOURCES.prescriptionSalaire.href).toContain(
      "LEGIARTI000027566295",
    );
  });

  it("expose couverture dédiée, sommaire et schema sans WebApplication", () => {
    const guide = getGuideBySlug(slug)!;
    const toc = buildGuideTocH2(guide);
    expect(toc.map((entry) => entry.id)).toEqual([
      "grilles-minima-etam-cadres",
      "convention-syntec-qui-concerne",
      "trouver-comprendre-coefficient",
      "quel-salaire-comparer",
      "temps-partiel-heures-forfaits",
      "exemples-lecture",
      "ecart-apparent-demarches",
      "questions-frequentes",
      "conclusion",
      "methodologie-sources",
    ]);
    expect(GUIDE_TOC_CONFIG[slug]!.groups.at(-1)!.end).toBe(toc.length);

    const cover = resolveGuideCover(guide);
    expect(cover?.src).toBe("/images/covers/guides/grille-salaire-syntec.webp");
    expect(getGuideCoverByHref(SYNTEC_PATH)?.src).toBe(cover?.src);
    expect(formatCoverCredit(cover!.credit)).toBe("Photo de Tima Miroshnichenko via Pexels");
    expect(cover?.alt.toLowerCase()).not.toContain("bulletin de paie");

    expect(guide.includeWebApplicationSchema).not.toBe(true);
    expect(guide.faq.length).toBeGreaterThanOrEqual(11);
    expect(
      guide.faq.some((item) =>
        item.question.includes("lorsque la grille Syntec augmente"),
      ),
    ).toBe(true);
    expect(guide.sections.some((section) => section.id === "exemples-lecture")).toBe(true);
    expect(JSON.stringify(guide)).toContain("#tableau-etam");
    expect(JSON.stringify(guide)).toContain("#tableau-cadres");
    expect(JSON.stringify(guide)).toContain("KALIARTI000005851638");
    expect(JSON.stringify(guide)).toContain(
      "minimum conventionnel brut mensuel proratisé",
    );
    expect(JSON.stringify(guide)).toContain(
      "Une rémunération mensuelle peut dépasser le seuil conventionnel de 95 %",
    );

    const fiche = readFileSync(
      join(process.cwd(), "src/site/guides/data/comment-lire-une-fiche-de-paie.ts"),
      "utf8",
    );
    expect(fiche).toContain("/grille-salaire-syntec");

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const types = graph.map((node) => node["@type"]);
    expect(types).toContain("WebPage");
    expect(types).toContain("Article");
    expect(types).toContain("BreadcrumbList");
    expect(types).toContain("FAQPage");
    expect(types).not.toContain("WebApplication");
    expect(types).not.toContain("Product");
    expect(types).not.toContain("Dataset");

    const image = graph.find(
      (node) => node["@id"] === `https://www.brut-vers-net.fr${SYNTEC_PATH}#primaryimage`,
    ) as { url?: string } | undefined;
    expect(image?.url).toContain("grille-salaire-syntec.webp");

    const article = graph.find((node) => node["@type"] === "Article") as {
      headline?: string;
    };
    expect(article?.headline).toBe(SYNTEC_H1);
  });
});
