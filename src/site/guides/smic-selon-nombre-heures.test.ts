import { describe, expect, it } from "vitest";
import { getGuideBySlug, getGuidePublicPath, guides } from "@/site/guides/registry";
import { buildGuideJsonLd } from "@/site/schema";
import {
  formatCoverCredit,
  getCoverLicenseUrl,
  getGuideCoverByHref,
  PEXELS_LICENSE_URL,
  resolveGuideCover,
} from "@/site/guides/covers";
import { getGuideHubTeaser } from "@/site/guides/guides-hub-data";
import { getPlanDuSiteSections, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import {
  SMIC_HOURS_FRESHNESS_LINE,
  SMIC_HOURS_H1,
  SMIC_HOURS_META_DESCRIPTION,
  SMIC_HOURS_PATH,
  SMIC_HOURS_PUBLISHED_AT,
  SMIC_HOURS_SEO_TITLE,
  SMIC_HOURS_SLUG,
  SMIC_HOURS_UPDATED_AT,
} from "@/site/smic-heures/data";
import { calculateSmicForWeeklyHours, formatEuro } from "@/site/smic-heures";
import { SMIC_CURRENT, SMIC_LABELS, SMIC_SOURCES } from "@/site/smic/data";

describe("page SMIC selon le nombre d'heures", () => {
  const slug = SMIC_HOURS_SLUG;
  const path = SMIC_HOURS_PATH;

  it("est enregistrée avec le chemin public dédié", () => {
    const guide = getGuideBySlug(slug);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(path);
    expect(guides.some((item) => item.slug === slug)).toBe(true);
  });

  it("attache la cover Alena Darmel au registre, OG et Schema", () => {
    const guide = getGuideBySlug(slug)!;
    const cover = resolveGuideCover(guide);
    expect(cover?.src).toBe("/images/covers/guides/SMIC-selon-nombre-heures.webp");
    expect(guide.coverImage?.src).toBe(cover?.src);
    expect(getGuideCoverByHref(path)?.src).toBe(cover?.src);
    expect(formatCoverCredit(cover!.credit)).toBe("Photo de Alena Darmel via Pexels");
    expect(getCoverLicenseUrl(cover!.credit)).toBe(PEXELS_LICENSE_URL);
    expect(cover!.width).toBe(1200);
    expect(cover!.height).toBe(800);
    expect(cover!.alt).toBe(
      "Équipe en réunion autour d'une table examinant des documents et des graphiques dans un bureau",
    );

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const image = graph.find(
      (node) => node["@id"] === `https://www.brut-vers-net.fr${path}#primaryimage`,
    ) as Record<string, unknown>;
    const webpage = graph.find((node) => node["@type"] === "WebPage") as Record<string, unknown>;
    const article = graph.find((node) => node["@type"] === "Article") as Record<string, unknown>;
    expect(image?.["@type"]).toBe("ImageObject");
    expect(image?.url).toBe(
      "https://www.brut-vers-net.fr/images/covers/guides/SMIC-selon-nombre-heures.webp",
    );
    expect(image?.contentUrl).toBe(image?.url);
    expect(image?.width).toBe(1200);
    expect(image?.height).toBe(800);
    expect(image?.creditText).toBe("Photo de Alena Darmel via Pexels");
    expect(image?.license).toBe(PEXELS_LICENSE_URL);
    expect((image?.creator as { name: string })?.name).toBe("Alena Darmel");
    expect(webpage?.primaryImageOfPage).toEqual({
      "@id": `https://www.brut-vers-net.fr${path}#primaryimage`,
    });
    expect(article?.image).toEqual({
      "@id": `https://www.brut-vers-net.fr${path}#primaryimage`,
    });
    expect(graph.find((node) => node["@type"] === "FAQPage")).toBeUndefined();
  });

  it("est indexable et présente dans sitemap, plan du site et hub guides", () => {
    expect(isPathIndexable(path)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === path)).toBe(true);
    const planBlob = JSON.stringify(getPlanDuSiteSections());
    expect(planBlob).toContain(path);
    expect(getGuideHubTeaser(slug)).toBeTruthy();
  });

  it("expose H1, title et description distincts de /smic", () => {
    const guide = getGuideBySlug(slug)!;
    const smic = getGuideBySlug("smic")!;
    expect(guide.title).toBe(SMIC_HOURS_H1);
    expect(guide.seoTitle).toBe(SMIC_HOURS_SEO_TITLE);
    expect(guide.description).toBe(SMIC_HOURS_META_DESCRIPTION);
    expect(guide.title).not.toBe(smic.title);
    expect(guide.seoTitle).not.toBe(smic.seoTitle);
    expect(guide.description).not.toBe(smic.description);
    expect(JSON.stringify(guide)).not.toContain("\u2014");
    expect(guide.publishedAt).toBe(SMIC_HOURS_PUBLISHED_AT);
    expect(guide.updatedAt).toBe(SMIC_HOURS_UPDATED_AT);
    expect(guide.introSummary?.items.some((item) => item.includes(SMIC_HOURS_FRESHNESS_LINE))).toBe(
      true,
    );
  });

  it("conserve une FAQ HTML visible sans Schema FAQPage", () => {
    const guide = getGuideBySlug(slug)!;
    expect(guide.faq.length).toBeGreaterThanOrEqual(10);
    expect(guide.includeFaqSchema).toBe(false);
    expect(guide.faqSectionId).toBe("questions-frequentes");

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const faqPage = graph.find((node) => node["@type"] === "FAQPage");
    expect(faqPage).toBeUndefined();
    const article = graph.find((node) => node["@type"] === "Article");
    expect(article).toBeTruthy();
    const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList");
    expect(breadcrumb).toBeTruthy();
  });

  it("canonicalise vers elle-même et non vers /smic", () => {
    const guide = getGuideBySlug(slug)!;
    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const webpage = graph.find((node) => node["@type"] === "WebPage") as {
      url: string;
      "@id": string;
      datePublished: string;
      dateModified: string;
    };
    expect(webpage.url).toBe(`https://www.brut-vers-net.fr${path}`);
    expect(String(webpage["@id"])).toContain(path);
    expect(webpage.datePublished).toContain("2026-09-18");
    expect(webpage.dateModified).toContain("2026-09-18");
  });

  it("expose les ancres recherchées et les sources officielles à jour", () => {
    const guide = getGuideBySlug(slug)!;
    const ids = [
      "tableau-smic",
      "methode-calcul",
      "smic-20-heures",
      "smic-24-heures",
      "smic-25-heures",
      "smic-28-heures",
      "smic-30-heures",
      "smic-32-heures",
      "smic-35-heures",
      "smic-39-heures",
    ];
    for (const id of ids) {
      const found =
        guide.sections.some((s) => s.id === id) ||
        guide.sections.some((s) => s.subsections?.some((sub) => sub.id === id));
      expect(found).toBe(true);
    }
    const blob = JSON.stringify(guide);
    expect(blob).toContain(SMIC_SOURCES.tempsPartiel.href);
    expect(blob).toContain(SMIC_SOURCES.arreteMai2026.href);
    expect(blob).toContain(
      "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006189631/",
    );
    expect(blob).not.toContain("F2460");
    expect(blob).not.toContain("plus recherchées");
    expect(blob).not.toContain("fréquemment recherchée");
    expect(blob).not.toContain("accord collectif plus favorable");
    expect(blob).not.toContain("cas général métropolitain");
  });

  it("aligne FAQ et exemples sur le moteur de calcul", () => {
    const guide = getGuideBySlug(slug)!;
    const r20 = calculateSmicForWeeklyHours(20)!;
    const r35 = calculateSmicForWeeklyHours(35)!;
    expect(guide.faq.some((item) => item.answer.includes(formatEuro(r20.monthlyNetEstimated)))).toBe(
      true,
    );
    expect(r35.monthlyGross).toBe(SMIC_CURRENT.monthlyGross);
    expect(guide.introSummary?.items.some((item) => item.includes(SMIC_LABELS.hourlyGross))).toBe(
      true,
    );
  });

  it("est liée depuis la page /smic", () => {
    const smic = getGuideBySlug("smic")!;
    const blob = JSON.stringify(smic.sections);
    expect(blob).toContain(path);
    expect(blob).toContain(
      "voir le SMIC brut et net selon le nombre d'heures travaillées",
    );
  });
});
