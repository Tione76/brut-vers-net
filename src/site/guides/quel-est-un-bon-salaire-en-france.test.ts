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
  BON_SALAIRE_EQTP_PART_TIME_NOTE,
  BON_SALAIRE_FRESHNESS_LINE,
  BON_SALAIRE_H1,
  BON_SALAIRE_LABELS,
  BON_SALAIRE_META_DESCRIPTION,
  BON_SALAIRE_PUBLISHED_AT,
  BON_SALAIRE_SEO_TITLE,
  BON_SALAIRE_SOURCES,
  BON_SALAIRE_STAT_YEAR,
  BON_SALAIRE_UPDATED_AT,
} from "@/site/bon-salaire/data";
import {
  SALAIRE_MOYEN_H1,
  SALAIRE_MOYEN_SEO_TITLE,
} from "@/site/salaire-moyen/data";
import { getPlanDuSiteSections, getSitemapEntries, isPathIndexable } from "@/site/public-pages";

describe("page pilier bon salaire en France", () => {
  const slug = "quel-est-un-bon-salaire-en-france";
  const path = "/quel-est-un-bon-salaire-en-france";

  it("est enregistrée avec le chemin public /quel-est-un-bon-salaire-en-france", () => {
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

  it("ne cannibalise pas la page salaire moyen France", () => {
    const guide = getGuideBySlug(slug)!;
    const salaireMoyen = getGuideBySlug("salaire-moyen-france")!;

    expect(guide.title).toBe(BON_SALAIRE_H1);
    expect(guide.seoTitle).toBe(BON_SALAIRE_SEO_TITLE);
    expect(guide.title).not.toBe(SALAIRE_MOYEN_H1);
    expect(guide.seoTitle).not.toBe(SALAIRE_MOYEN_SEO_TITLE);
    expect(guide.title).not.toBe(salaireMoyen.title);
    expect(guide.seoTitle).not.toBe(salaireMoyen.seoTitle);
    expect(getGuidePublicPath(guide)).not.toBe(getGuidePublicPath(salaireMoyen));
  });

  it("expose contenu, FAQ, cover Pexels, illustration et sources", () => {
    const guide = getGuideBySlug(slug)!;
    expect(guide.description).toBe(BON_SALAIRE_META_DESCRIPTION);
    expect(guide.publishedAt).toBe(BON_SALAIRE_PUBLISHED_AT);
    expect(guide.updatedAt).toBe(BON_SALAIRE_UPDATED_AT);
    expect(guide.breadcrumbLabel).toBe("Bon salaire");
    expect(guide.quickSummary?.synthesis?.[0]).toBe(BON_SALAIRE_FRESHNESS_LINE);
    expect(guide.faq.length).toBeGreaterThanOrEqual(8);
    expect(guide.faq.length).toBeLessThanOrEqual(12);
    expect(JSON.stringify(guide)).toContain(BON_SALAIRE_LABELS.median);
    expect(JSON.stringify(guide)).toContain(BON_SALAIRE_LABELS.meanNet);
    expect(JSON.stringify(guide)).toContain(String(BON_SALAIRE_STAT_YEAR));
    expect(JSON.stringify(guide)).toContain(BON_SALAIRE_SOURCES.inseePrive2024.href);
    expect(JSON.stringify(guide)).toContain(BON_SALAIRE_EQTP_PART_TIME_NOTE);
    expect(JSON.stringify(guide)).not.toMatch(/médiane nationale/i);
    expect(guide.faq.every((item) => item.answer.length < 320)).toBe(true);

    const cover = resolveGuideCover(guide);
    expect(cover?.src).toBe("/images/covers/guides/bon-salaire-en-france.webp");
    expect(guide.coverImage?.src).toBe(cover?.src);
    expect(getGuideCoverByHref(path)?.src).toBe(cover?.src);
    expect(formatCoverCredit(cover!.credit)).toBe("Photo de kaboompics via Pexels");
    expect(getCoverLicenseUrl(cover!.credit)).toBe(PEXELS_LICENSE_URL);
    expect(cover?.credit.acquireLicensePage).toBeUndefined();
    expect(cover?.credit.copyrightNotice).toBeUndefined();
    expect(cover?.width).toBe(1200);
    expect(cover?.height).toBe(800);

    const lead = guide.sections.find((section) => section.id === "reponse-courte");
    expect(lead?.title).toBe("Réponse courte");

    const distribution = guide.sections.find(
      (section) => section.id === "ou-se-situe-votre-salaire",
    );
    const illustration = distribution?.blocks?.find(
      (block) =>
        block.type === "illustration" && block.id === "bon-salaire-distribution-scale",
    );
    expect(illustration).toBeTruthy();

    const comfort = guide.sections
      .flatMap((section) => section.blocks ?? [])
      .find(
        (block) =>
          block.type === "illustration" && block.id === "bon-salaire-comfort-matrix",
      );
    expect(comfort).toBeTruthy();

    expect(guide.sections.some((section) => section.id === "trois-mille-net")).toBe(true);
    expect(
      guide.sections.some((section) =>
        section.title.includes("médiane est souvent le meilleur repère"),
      ),
    ).toBe(true);

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const webpage = graph.find((node) => node["@type"] === "WebPage");
    const article = graph.find((node) => node["@type"] === "Article");
    const faq = graph.find((node) => node["@type"] === "FAQPage");
    const image = graph.find(
      (node) =>
        node["@id"] === `https://brut-vers-net.fr${path}#primaryimage`,
    ) as Record<string, unknown> | undefined;
    const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList") as {
      itemListElement: { name: string }[];
    };
    expect(webpage?.["@id"]).toBe(`https://brut-vers-net.fr${path}#webpage`);
    expect(article?.headline).toBe(BON_SALAIRE_H1);
    expect(image?.["@type"]).toBe("ImageObject");
    expect(image?.url).toBe(
      "https://brut-vers-net.fr/images/covers/guides/bon-salaire-en-france.webp",
    );
    expect(image?.contentUrl).toBe(image?.url);
    expect(image?.width).toBe(1200);
    expect(image?.height).toBe(800);
    expect(image?.creditText).toBe("Photo de kaboompics via Pexels");
    expect(image?.license).toBe(PEXELS_LICENSE_URL);
    expect(image?.acquireLicensePage).toBeUndefined();
    expect(image?.copyrightNotice).toBeUndefined();
    expect((image?.creator as { name: string })?.name).toBe("kaboompics");
    expect(String(image?.url)).not.toContain("localhost");
    expect(webpage?.primaryImageOfPage).toEqual({
      "@id": `https://brut-vers-net.fr${path}#primaryimage`,
    });
    expect(article?.image).toEqual({
      "@id": `https://brut-vers-net.fr${path}#primaryimage`,
    });
    expect(
      graph.filter(
        (node) =>
          node["@type"] === "ImageObject" &&
          String(node.url ?? "").includes("bon-salaire-en-france.webp"),
      ),
    ).toHaveLength(1);
    expect(faq).toBeTruthy();
    const mainEntity = faq?.mainEntity as { name: string }[];
    expect(mainEntity.map((item) => item.name)).toEqual(
      guide.faq.map((item) => item.question),
    );
    expect(breadcrumb.itemListElement.map((item) => item.name)).toEqual([
      "Accueil",
      "Bon salaire",
    ]);
  });
});
