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
  ALTERNANCE_H1,
  ALTERNANCE_META_DESCRIPTION,
  ALTERNANCE_SEO_TITLE,
} from "@/site/salaire-alternance/data";
import { getPlanDuSiteSections, getSitemapEntries, isPathIndexable } from "@/site/public-pages";

describe("page pilier salaire en alternance", () => {
  const slug = "salaire-alternance";
  const path = "/salaire-alternance";
  const coverSrc = "/images/covers/guides/salaire-apparenti-alternant.webp";
  const creditExact = "Photo par Gustavo Fring via Pexels";

  it("est enregistrée avec le chemin public /salaire-alternance", () => {
    const guide = getGuideBySlug(slug);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(path);
    expect(guides.some((item) => item.slug === slug)).toBe(true);
  });

  it("est indexable et présente dans sitemap + plan du site", () => {
    expect(isPathIndexable(path)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === path)).toBe(true);
    const planBlob = JSON.stringify(getPlanDuSiteSections());
    expect(planBlob).toContain(path);
  });

  it("attache la cover dédiée au registre et au Schema", () => {
    const guide = getGuideBySlug(slug)!;
    const cover = resolveGuideCover(guide);
    expect(cover?.src).toBe(coverSrc);
    expect(guide.coverImage?.src).toBe(cover?.src);
    expect(getGuideCoverByHref(path)?.src).toBe(cover?.src);
    expect(formatCoverCredit(cover!.credit)).toBe(creditExact);
    expect(cover!.credit.photographer).toBe("Gustavo Fring");
    expect(cover!.credit.source).toBe("Pexels");
    expect(cover!.credit.acquireLicensePage).toBeUndefined();
    expect(cover!.credit.copyrightNotice).toBeUndefined();
    expect(getCoverLicenseUrl(cover!.credit)).toBe(PEXELS_LICENSE_URL);
    expect(cover!.width).toBe(1200);
    expect(cover!.height).toBe(800);
    expect(cover!.alt.length).toBeGreaterThan(20);
    expect(cover!.alt.toLowerCase()).not.toContain("salaire");
    expect(cover!.alt).not.toMatch(/20\d{2}/);

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const image = graph.find(
      (node) => node["@id"] === `https://brut-vers-net.fr${path}#primaryimage`,
    ) as Record<string, unknown>;
    const webpage = graph.find((node) => node["@type"] === "WebPage") as Record<string, unknown>;
    const article = graph.find((node) => node["@type"] === "Article") as Record<string, unknown>;

    expect(image?.["@type"]).toBe("ImageObject");
    expect(image?.url).toBe(`https://brut-vers-net.fr${coverSrc}`);
    expect(image?.contentUrl).toBe(image?.url);
    expect(image?.width).toBe(1200);
    expect(image?.height).toBe(800);
    expect(image?.creditText).toBe(creditExact);
    expect(image?.license).toBe(PEXELS_LICENSE_URL);
    expect((image?.creator as { name: string })?.name).toBe("Gustavo Fring");
    expect(image?.acquireLicensePage).toBeUndefined();
    expect(image?.copyrightNotice).toBeUndefined();
    expect(String(image?.url)).not.toContain("localhost");
    expect(String(image?.url)).not.toMatch(/pexels\.com\/photo\//i);
    expect(webpage?.primaryImageOfPage).toEqual({
      "@id": `https://brut-vers-net.fr${path}#primaryimage`,
    });
    expect(article?.image).toEqual({
      "@id": `https://brut-vers-net.fr${path}#primaryimage`,
    });
    expect(graph.filter((node) => node["@type"] === "ImageObject" && String(node["@id"] ?? "").includes(path))).toHaveLength(1);
  });

  it("expose H1 daté, Title evergreen, FAQ et Schema", () => {
    const guide = getGuideBySlug(slug)!;
    expect(guide.title).toBe(ALTERNANCE_H1);
    expect(guide.seoTitle).toBe(ALTERNANCE_SEO_TITLE);
    expect(guide.seoTitle).not.toMatch(/20\d{2}/);
    expect(guide.description).toBe(ALTERNANCE_META_DESCRIPTION);
    expect(guide.breadcrumbLabel).toBe("Salaire alternance");
    expect(guide.publishedAt).toBe("2026-09-13");
    expect(guide.updatedAt).toBe("2026-09-13");
    expect(guide.faq.length).toBeGreaterThanOrEqual(10);
    expect(guide.faq.length).toBeLessThanOrEqual(15);
    expect(JSON.stringify(guide)).toContain("802,82");
    expect(JSON.stringify(guide)).toContain("1\u00a0867,02");
    expect(JSON.stringify(guide)).not.toContain("\u2014");
    expect(JSON.stringify(guide).toLowerCase()).not.toContain("localhost");

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const webpage = graph.find((node) => node["@type"] === "WebPage") as Record<string, unknown>;
    const article = graph.find((node) => node["@type"] === "Article") as Record<string, unknown>;
    const faq = graph.find((node) => node["@type"] === "FAQPage");
    const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList") as {
      itemListElement: { name: string }[];
    };

    expect(webpage?.["@id"]).toBe(`https://brut-vers-net.fr${path}#webpage`);
    expect(article?.headline).toBe(ALTERNANCE_H1);
    expect(article?.datePublished).toContain("2026-09-13");
    expect(article?.dateModified).toContain("2026-09-13");
    expect(faq).toBeTruthy();
    expect(breadcrumb.itemListElement.map((item) => item.name)).toEqual([
      "Accueil",
      "Salaire alternance",
    ]);
  });

  it("distingue apprentissage et professionnalisation dans le contenu", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("contrat d'apprentissage");
    expect(blob).toContain("contrat de professionnalisation");
    expect(blob).toContain("licence professionnelle");
    expect(blob).toContain("/smic");
    expect(guide.sections.some((section) => section.id.includes("professionnalisation"))).toBe(
      true,
    );
  });

  it("présente la grille apprentissage en blocs d'âge et couvre la majoration de 15 points", () => {
    const guide = getGuideBySlug(slug)!;
    expect(guide.quickSummary?.variant).toBe("age-bands");
    expect(guide.quickSummary?.items).toHaveLength(4);
    expect(guide.quickSummary?.items.every((item) => (item.details?.length ?? 0) > 0)).toBe(true);
    const blob = JSON.stringify(guide);
    expect(blob).toContain("15 points");
    expect(blob).not.toMatch(/majoré de 15\s*%/i);
    expect(blob).toContain("n'augmente pas la rémunération");
    expect(blob).not.toContain("âge à la conclusion du contrat qui détermine");
  });
});
