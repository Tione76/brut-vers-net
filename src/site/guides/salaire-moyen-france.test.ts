import { describe, expect, it } from "vitest";
import { getGuideBySlug, getGuidePublicPath, guides } from "./registry";
import { buildGuideJsonLd } from "@/site/schema";
import {
  formatCoverCredit,
  getCoverLicenseUrl,
  getGuideCoverByHref,
  PEXELS_LICENSE_URL,
  resolveGuideCover,
} from "./covers";
import {
  SALAIRE_MOYEN_FRESHNESS_LINE,
  SALAIRE_MOYEN_H1,
  SALAIRE_MOYEN_LABELS,
  SALAIRE_MOYEN_META_DESCRIPTION,
  SALAIRE_MOYEN_METIER_POLICY,
  SALAIRE_MOYEN_PUBLISHED_AT,
  SALAIRE_MOYEN_SEO_TITLE,
  SALAIRE_MOYEN_SOURCES,
  SALAIRE_MOYEN_STAT_YEAR,
  SALAIRE_MOYEN_UPDATED_AT,
} from "@/site/salaire-moyen/data";
import { getPlanDuSiteSections, getSitemapEntries, isPathIndexable } from "@/site/public-pages";

describe("page pilier salaire moyen France", () => {
  const slug = "salaire-moyen-france";

  it("est enregistrée avec le chemin public /salaire-moyen-france", () => {
    const guide = getGuideBySlug(slug);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe("/salaire-moyen-france");
    expect(guides.some((item) => item.slug === slug)).toBe(true);
  });

  it("est indexable et présente dans sitemap + plan du site", () => {
    expect(isPathIndexable("/salaire-moyen-france")).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === "/salaire-moyen-france")).toBe(true);
    const planBlob = JSON.stringify(getPlanDuSiteSections());
    expect(planBlob).toContain("/salaire-moyen-france");
  });

  it("expose Title evergreen, H1 daté, cover Pexels et FAQ Schema sans promesse métier", () => {
    const guide = getGuideBySlug(slug)!;
    expect(guide.title).toBe(SALAIRE_MOYEN_H1);
    expect(guide.seoTitle).toBe(SALAIRE_MOYEN_SEO_TITLE);
    expect(guide.description).toBe(SALAIRE_MOYEN_META_DESCRIPTION);
    expect(guide.publishedAt).toBe(SALAIRE_MOYEN_PUBLISHED_AT);
    expect(guide.updatedAt).toBe(SALAIRE_MOYEN_UPDATED_AT);
    expect(guide.breadcrumbLabel).toBe("Salaire moyen");
    expect(guide.quickSummary?.synthesis?.[0]).toBe(SALAIRE_MOYEN_FRESHNESS_LINE);
    expect(guide.quickSummary?.synthesis).toHaveLength(1);
    expect(guide.faq.length).toBeGreaterThanOrEqual(6);
    expect(guide.faq.length).toBeLessThanOrEqual(8);
    expect(SALAIRE_MOYEN_METIER_POLICY.includeSection).toBe(false);
    expect(guide.sections.some((section) => /métier/i.test(section.title))).toBe(false);
    expect(JSON.stringify(guide)).toContain(SALAIRE_MOYEN_LABELS.meanNet);
    expect(JSON.stringify(guide)).toContain(SALAIRE_MOYEN_LABELS.medianNet);
    expect(JSON.stringify(guide)).toContain(String(SALAIRE_MOYEN_STAT_YEAR));
    expect(JSON.stringify(guide)).toContain(SALAIRE_MOYEN_SOURCES.inseePrive2024.href);
    expect(JSON.stringify(guide)).toContain(SALAIRE_MOYEN_SOURCES.inseeEssentielSalaires.href);
    expect(JSON.stringify(guide)).toContain("3 100");
    expect(JSON.stringify(guide)).not.toContain("\u2014");
    expect(JSON.stringify(guide)).not.toContain("Référence fiscale");

    const cover = resolveGuideCover(guide);
    expect(cover?.src).toBe("/images/covers/guides/Salaire-moyen-France.webp");
    expect(getGuideCoverByHref("/salaire-moyen-france")?.src).toBe(cover?.src);
    expect(formatCoverCredit(cover!.credit)).toBe("Photo de olia danilevich via Pexels");
    expect(getCoverLicenseUrl(cover!.credit)).toBe(PEXELS_LICENSE_URL);
    expect(cover?.credit.acquireLicensePage).toBeUndefined();
    expect(cover?.credit.copyrightNotice).toBeUndefined();
    expect(cover?.width).toBe(1201);
    expect(cover?.height).toBe(801);

    const history = guide.sections.find((section) => section.id === "evolution-pouvoir-achat");
    const illustration = history?.blocks.find(
      (block) => block.type === "illustration" && block.id === "salaire-moyen-evolution-eqtp",
    );
    expect(illustration).toBeTruthy();

    const regions = guide.sections.find((section) => section.id === "selon-region");
    const regionTable = regions?.blocks.find((block) => block.type === "table");
    expect(regionTable && regionTable.type === "table" ? regionTable.rows.length : 0).toBe(19);

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const webpage = graph.find((node) => node["@type"] === "WebPage");
    const article = graph.find((node) => node["@type"] === "Article");
    const faq = graph.find((node) => node["@type"] === "FAQPage");
    const image = graph.find(
      (node) => node["@id"] === "https://brut-vers-net.fr/salaire-moyen-france#primaryimage",
    ) as Record<string, unknown> | undefined;
    const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList") as {
      itemListElement: { name: string }[];
    };
    expect(webpage?.["@id"]).toBe("https://brut-vers-net.fr/salaire-moyen-france#webpage");
    expect(article?.headline).toBe(SALAIRE_MOYEN_H1);
    expect(image?.["@type"]).toBe("ImageObject");
    expect(image?.url).toBe("https://brut-vers-net.fr/images/covers/guides/Salaire-moyen-France.webp");
    expect(image?.contentUrl).toBe(
      "https://brut-vers-net.fr/images/covers/guides/Salaire-moyen-France.webp",
    );
    expect(image?.width).toBe(1201);
    expect(image?.height).toBe(801);
    expect(image?.creditText).toBe("Photo de olia danilevich via Pexels");
    expect(image?.license).toBe(PEXELS_LICENSE_URL);
    expect(image?.acquireLicensePage).toBeUndefined();
    expect(image?.copyrightNotice).toBeUndefined();
    expect((image?.creator as { name: string })?.name).toBe("olia danilevich");
    expect(webpage?.primaryImageOfPage).toEqual({
      "@id": "https://brut-vers-net.fr/salaire-moyen-france#primaryimage",
    });
    expect(article?.image).toEqual({
      "@id": "https://brut-vers-net.fr/salaire-moyen-france#primaryimage",
    });
    expect(faq).toBeTruthy();
    const mainEntity = faq?.mainEntity as { name: string }[];
    expect(mainEntity.map((item) => item.name)).toEqual(guide.faq.map((item) => item.question));
    expect(breadcrumb.itemListElement.map((item) => item.name)).toEqual([
      "Accueil",
      "Salaire moyen",
    ]);
    expect(
      graph.filter(
        (node) =>
          node["@type"] === "ImageObject" &&
          typeof node.url === "string" &&
          String(node.url).includes("Salaire-moyen-France.webp"),
      ),
    ).toHaveLength(1);
  });
});
