import { describe, expect, it } from "vitest";
import { getGuideBySlug, getGuidePublicPath, guides } from "./registry";
import {
  formatCoverCredit,
  getCoverLicenseUrl,
  getGuideCoverByHref,
  PEXELS_LICENSE_URL,
  resolveGuideCover,
} from "./covers";
import { buildGuideJsonLd } from "@/site/schema";
import {
  SMIC_AMOUNTS_BLOCK_TITLE,
  SMIC_CURRENT,
  SMIC_EDITORIAL_YEAR,
  SMIC_EFFECTIVE_FROM,
  SMIC_FRESHNESS_LINE,
  SMIC_H1,
  SMIC_LABELS,
  SMIC_LAST_INCREASE_PERCENT,
  SMIC_PREVIOUS,
  SMIC_SEO_TITLE,
  SMIC_SOURCES,
} from "@/site/smic/data";
import { getPlanDuSiteSections, getSitemapEntries, isPathIndexable } from "@/site/public-pages";

describe("page pilier SMIC", () => {
  const slug = "smic";

  it("est enregistrée avec le chemin public /smic", () => {
    const guide = getGuideBySlug(slug);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe("/smic");
    expect(guides.some((item) => item.slug === slug)).toBe(true);
  });

  it("est indexable et présente dans sitemap + plan du site", () => {
    expect(isPathIndexable("/smic")).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === "/smic")).toBe(true);
    const planBlob = JSON.stringify(getPlanDuSiteSections());
    expect(planBlob).toContain("/smic");
  });

  it("attache la cover dédiée au registre et au Schema", () => {
    const guide = getGuideBySlug(slug)!;
    const cover = resolveGuideCover(guide);
    expect(cover?.src).toBe("/images/covers/guides/SMIC-horaire-mensuel-brut-net.webp");
    expect(guide.coverImage?.src).toBe(cover?.src);
    expect(getGuideCoverByHref("/smic")?.src).toBe(cover?.src);
    expect(formatCoverCredit(cover!.credit)).toBe("Photo de Mikhail Nilov via Pexels");
    expect(getCoverLicenseUrl(cover!.credit)).toBe(PEXELS_LICENSE_URL);
    expect(cover!.width).toBe(1200);
    expect(cover!.height).toBe(800);

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const image = graph.find(
      (node) => node["@id"] === "https://brut-vers-net.fr/smic#primaryimage",
    ) as Record<string, unknown>;
    const webpage = graph.find((node) => node["@type"] === "WebPage") as Record<string, unknown>;
    const article = graph.find((node) => node["@type"] === "Article") as Record<string, unknown>;
    expect(image?.["@type"]).toBe("ImageObject");
    expect(image?.url).toBe(
      "https://brut-vers-net.fr/images/covers/guides/SMIC-horaire-mensuel-brut-net.webp",
    );
    expect(image?.contentUrl).toBe(image?.url);
    expect(image?.width).toBe(1200);
    expect(image?.height).toBe(800);
    expect(image?.creditText).toBe("Photo de Mikhail Nilov via Pexels");
    expect(image?.license).toBe(PEXELS_LICENSE_URL);
    expect((image?.creator as { name: string })?.name).toBe("Mikhail Nilov");
    expect(image?.acquireLicensePage).toBeUndefined();
    expect(image?.copyrightNotice).toBeUndefined();
    expect(String(image?.url)).not.toContain("localhost");
    expect(webpage?.primaryImageOfPage).toEqual({
      "@id": "https://brut-vers-net.fr/smic#primaryimage",
    });
    expect(article?.image).toEqual({ "@id": "https://brut-vers-net.fr/smic#primaryimage" });
  });

  it("expose H1 daté, Title evergreen et FAQ synchronisés pour le Schema", () => {
    const guide = getGuideBySlug(slug)!;
    expect(guide.title).toBe(SMIC_H1);
    expect(guide.seoTitle).toBe(SMIC_SEO_TITLE);
    expect(guide.seoTitle).not.toMatch(/20\d{2}/);
    expect(guide.title).toContain(String(SMIC_EDITORIAL_YEAR));
    expect(guide.quickSummary?.title).toBe(SMIC_AMOUNTS_BLOCK_TITLE);
    expect(guide.quickSummary?.synthesis?.[0]).toBe(SMIC_FRESHNESS_LINE);
    expect(guide.faq.length).toBeGreaterThanOrEqual(7);
    expect(guide.faq.length).toBeLessThanOrEqual(10);
    expect(guide.breadcrumbLabel).toBe("SMIC");
    expect(guide.updatedAt).toBe("2026-09-07");
    expect(JSON.stringify(guide)).toContain("Annuel (12 mois au taux actuel)");
    expect(JSON.stringify(guide)).toContain(SMIC_LABELS.calendarYearGrossCumulative);
    expect(JSON.stringify(guide)).toContain("prime d'activité et le RSA");
    expect(guide.sections.some((s) => s.id === "sources-officielles")).toBe(true);
    expect(JSON.stringify(guide)).toContain(SMIC_SOURCES.arreteMai2026.href);

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const webpage = graph.find((node) => node["@type"] === "WebPage");
    const article = graph.find((node) => node["@type"] === "Article");
    const faq = graph.find((node) => node["@type"] === "FAQPage");
    const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList") as {
      itemListElement: { name: string }[];
    };
    expect(webpage?.["@id"]).toBe("https://brut-vers-net.fr/smic#webpage");
    expect(webpage?.datePublished).toBeTruthy();
    expect(webpage?.dateModified).toBeTruthy();
    expect(article?.headline).toBe(SMIC_H1);
    expect(faq).toBeTruthy();
    const mainEntity = faq?.mainEntity as { name: string }[];
    expect(mainEntity.map((item) => item.name)).toEqual(guide.faq.map((item) => item.question));
    expect(breadcrumb.itemListElement.map((item) => item.name)).toEqual(["Accueil", "SMIC"]);
  });

  it("réutilise la source de vérité des montants sans divergence", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain(SMIC_LABELS.hourlyGross);
    expect(blob).toContain(SMIC_LABELS.monthlyGross);
    expect(blob).toContain(SMIC_LABELS.hourlyNet);
    expect(blob).toContain(SMIC_LABELS.monthlyNet);
    expect(blob).toContain(SMIC_LABELS.annualGross);
    expect(SMIC_EFFECTIVE_FROM).toBe("2026-06-01");
    expect(SMIC_CURRENT.hourlyGross).toBe(12.31);
    expect(SMIC_CURRENT.monthlyGross).toBe(1867.02);
    expect(SMIC_PREVIOUS.hourlyGross).toBe(12.02);
    expect(SMIC_LAST_INCREASE_PERCENT).toBe(2.41);
  });
});
