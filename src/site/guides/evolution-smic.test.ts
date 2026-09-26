import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { SITE_AUTHOR } from "@/site/author";
import { siteConfig } from "@/site/site.config";
import { seoConfig } from "@/site/seo.config";
import { buildGuideJsonLd } from "@/site/schema";
import { getPlanDuSiteSections, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import { getGuideHubTeaser } from "@/site/guides/guides-hub-data";
import { getGuideBySlug, getGuidePublicPath, guides } from "@/site/guides/registry";
import { buildPageMetadata } from "@/framework/seo/metadata";
import {
  PEXELS_LICENSE_URL,
  coverToOgInput,
  formatCoverCredit,
  getCoverLicenseUrl,
  getGuideCoverByHref,
  resolveGuideCover,
} from "@/site/guides/covers";
import {
  SMIC_HISTORY_EDITORIAL_YEAR,
  SMIC_HISTORY_H1,
  SMIC_HISTORY_META_DESCRIPTION,
  SMIC_HISTORY_PATH,
  SMIC_HISTORY_SEO_TITLE,
  SMIC_HISTORY_SLUG,
  SMIC_HISTORY_SOURCES,
  buildYearAnswer,
  largestLegalHourlyIncrease,
  yearAnchor,
} from "@/site/smic-history";

describe("page évolution du SMIC", () => {
  const slug = SMIC_HISTORY_SLUG;
  const path = SMIC_HISTORY_PATH;

  it("est enregistrée, indexable et présente dans le sitemap", () => {
    const guide = getGuideBySlug(slug);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(path);
    expect(guides.some((item) => item.slug === slug)).toBe(true);
    expect(isPathIndexable(path)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === path)).toBe(true);
    expect(JSON.stringify(getPlanDuSiteSections())).toContain(path);
    expect(getGuideHubTeaser(slug)).toBeTruthy();
  });

  it("expose un Title, un seul H1 et une meta description dédiés", () => {
    const guide = getGuideBySlug(slug)!;
    const smic = getGuideBySlug("smic")!;
    const hours = getGuideBySlug("smic-selon-nombre-heures")!;
    expect(guide.title).toBe(SMIC_HISTORY_H1);
    expect(guide.seoTitle).toBe(SMIC_HISTORY_SEO_TITLE);
    expect(guide.seoTitle).toBe("Évolution du SMIC depuis 1950 : historique et montants");
    expect(guide.description).toBe(SMIC_HISTORY_META_DESCRIPTION);
    expect(guide.seoTitle).not.toContain(String(SMIC_HISTORY_EDITORIAL_YEAR));
    expect(guide.seoTitle).not.toContain("| Brut vers Net");
    expect(guide.title).not.toBe(smic.title);
    expect(guide.seoTitle).not.toBe(smic.seoTitle);
    expect(guide.description).not.toBe(smic.description);
    expect(guide.title).not.toBe(hours.title);
    expect(guide.title).not.toBe("L'évolution du SMIC en France depuis 1950");
    expect(guide.conclusion.title).toBe("Conclusion");
    expect(guide.conclusion.title).not.toBe("Pour aller plus loin");
    expect(JSON.stringify(guide)).not.toContain("\u2014");
  });

  it("canonicalise vers elle-même sans FAQPage ni Dataset inventé", () => {
    const guide = getGuideBySlug(slug)!;
    expect(guide.includeFaqSchema).toBe(false);
    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const webpage = graph.find((node) => node["@type"] === "WebPage") as {
      url: string;
      headline?: string;
    };
    const article = graph.find((node) => node["@type"] === "Article");
    const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList");
    expect(webpage.url).toBe(`https://www.brut-vers-net.fr${path}`);
    expect(article).toBeTruthy();
    expect(breadcrumb).toBeTruthy();
    expect(graph.some((node) => node["@type"] === "FAQPage")).toBe(false);
    expect(graph.some((node) => node["@type"] === "Dataset")).toBe(false);
  });

  it("attache la couverture kaboompics.com et un ImageObject unique", () => {
    const guide = getGuideBySlug(slug)!;
    const cover = resolveGuideCover(guide)!;
    const coverSrc = "/images/covers/guides/evolution-smic-france.webp";
    const absoluteCover = `https://www.brut-vers-net.fr${coverSrc}`;
    const diskPath = join(process.cwd(), "public", coverSrc.replace(/^\//, ""));
    const creditExact = "Photo de kaboompics.com via Pexels";
    const altExact =
      "Main tenant un crayon et pointant un graphique financier épinglé sur un tableau blanc";

    expect(existsSync(diskPath)).toBe(true);
    expect(statSync(diskPath).size).toBeGreaterThan(0);
    expect(cover.src).toBe(coverSrc);
    expect(guide.coverImage?.src).toBe(coverSrc);
    expect(getGuideCoverByHref(path)?.src).toBe(coverSrc);
    expect(cover.src).not.toMatch(/[A-Z]/);
    expect(cover.src).not.toContain(" ");
    expect(cover.width).toBe(1200);
    expect(cover.height).toBe(800);
    expect(cover.alt).toBe(altExact);
    expect(cover.alt.toLowerCase()).not.toContain("smic");
    expect(cover.alt).not.toMatch(/19\d{2}|20\d{2}/);
    expect(cover.caption).toBe("L'évolution du SMIC en France depuis 1950");
    expect(formatCoverCredit(cover.credit)).toBe(creditExact);
    expect(cover.credit.photographer).toBe("kaboompics.com");
    expect(cover.credit.source).toBe("Pexels");
    expect(cover.credit.acquireLicensePage).toBeUndefined();
    expect(cover.credit.copyrightNotice).toBeUndefined();
    expect(getCoverLicenseUrl(cover.credit)).toBe(PEXELS_LICENSE_URL);

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const article = graph.find((node) => node["@type"] === "Article") as Record<string, unknown>;
    const webpage = graph.find((node) => node["@type"] === "WebPage") as Record<string, unknown>;
    const image = graph.find(
      (node) => node["@id"] === `https://www.brut-vers-net.fr${path}#primaryimage`,
    ) as Record<string, unknown>;
    const pageImages = graph.filter(
      (node) =>
        node["@type"] === "ImageObject" && String(node["@id"] ?? "").includes(path),
    );

    expect(pageImages).toHaveLength(1);
    expect(article.image).toEqual({
      "@id": `https://www.brut-vers-net.fr${path}#primaryimage`,
    });
    expect(article.author).toEqual({ "@id": "https://www.brut-vers-net.fr/#author" });
    expect(article.headline).toBe(guide.title);
    expect(article.headline).not.toBe(cover.caption);
    const authorPerson = graph.find(
      (node) => node["@id"] === "https://www.brut-vers-net.fr/#author",
    ) as { name?: string };
    expect(authorPerson?.name).toBe(SITE_AUTHOR.name);
    expect(webpage.primaryImageOfPage).toEqual({
      "@id": `https://www.brut-vers-net.fr${path}#primaryimage`,
    });
    expect(image?.["@type"]).toBe("ImageObject");
    expect(image?.url).toBe(absoluteCover);
    expect(image?.contentUrl).toBe(absoluteCover);
    expect(image?.width).toBe(1200);
    expect(image?.height).toBe(800);
    expect(image?.encodingFormat).toBe("image/webp");
    expect(image?.name).toBe(altExact);
    expect(image?.caption).toBe(cover.caption);
    expect(image?.creditText).toBe(creditExact);
    expect(image?.representativeOfPage).toBe(true);
    expect((image?.creator as { name?: string })?.name).toBe("kaboompics.com");
    expect(image?.license).toBe(PEXELS_LICENSE_URL);
    expect(image?.copyrightNotice).toBeUndefined();
    expect(image?.acquireLicensePage).toBeUndefined();
    expect(JSON.stringify(graph)).not.toContain("localhost");
    expect(JSON.stringify(graph)).not.toMatch(/pexels\.com\/photo\//i);

    const og = coverToOgInput(cover);
    expect(og.url).toBe(coverSrc);
    expect(og.width).toBe(1200);
    expect(og.height).toBe(800);
    expect(og.alt).toBe(altExact);
    expect(og.type).toBe("image/webp");

    const metadata = buildPageMetadata(siteConfig, seoConfig, {
      title: guide.seoTitle ?? guide.title,
      description: guide.description,
      path,
      ogImage: og,
      openGraphType: "article",
    });
    const ogImage = metadata.openGraph?.images;
    const ogEntry = Array.isArray(ogImage) ? ogImage[0] : ogImage;
    expect(ogEntry).toMatchObject({
      url: absoluteCover,
      width: 1200,
      height: 800,
      alt: altExact,
      type: "image/webp",
    });
    const twitter = metadata.twitter as
      | { card?: string; images?: Array<string | { url?: string; alt?: string }> | string }
      | undefined;
    expect(twitter?.card).toBe("summary_large_image");
    const twitterImages = twitter?.images;
    const twitterEntry = Array.isArray(twitterImages) ? twitterImages[0] : twitterImages;
    expect(twitterEntry).toMatchObject({
      url: absoluteCover,
      alt: altExact,
    });
    expect(JSON.stringify(metadata)).not.toContain("localhost");
  });

  it("place les ancres annuelles et le sommaire attendus", () => {
    const guide = getGuideBySlug(slug)!;
    const table = guide.sections
      .find((section) => section.id === "tableau-smic")
      ?.blocks?.find((block) => block.type === "table");
    expect(table && table.type === "table" ? table.rowHeader : false).toBe(true);
    const rowIds = table && table.type === "table" ? table.rowIds ?? [] : [];
    expect(rowIds).toContain("smic-2006");
    expect(rowIds).toContain("smic-2009");
    expect(rowIds).toContain("smic-2022");
    expect(rowIds).toContain(yearAnchor(SMIC_HISTORY_EDITORIAL_YEAR));
    expect(new Set(rowIds.filter(Boolean)).size).toBe(rowIds.filter(Boolean).length);

    const sectionIds = guide.sections.map((section) => section.id);
    for (const id of [
      "evolution-graphique",
      "tableau-smic",
      "decade-1950",
      "decade-1970",
      "decade-1980",
      "decade-1990",
      "decade-2000",
      "decade-2010",
      "decade-2020",
      "smic-inflation",
      "revalorisation",
      "methodologie-sources",
    ]) {
      expect(sectionIds).toContain(id);
    }
    expect(guide.faqSectionId).toBe("questions-frequentes");
  });

  it("rappelle SMIG 1950, SMIC 1970, 35 heures, multi-taux et brut", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("SMIG");
    expect(blob).toContain("1950");
    expect(blob).toContain("loi du 2 janvier 1970");
    expect(blob).not.toMatch(/le SMIC a été créé en 1950/i);
    expect(blob).not.toMatch(/SMIC a été créé en 1950/);
    expect(blob).toContain("35 heures");
    expect(blob).toContain("garanties mensuelles");
    expect(blob).toContain("plusieurs");
    expect(blob).toContain("conversion monétaire");
    expect(blob).toContain("pouvoir d'achat");
    expect(blob).toContain("montants bruts");
    expect(blob).toContain("Méthodologie et sources");
    expect(blob).toContain("https://www.insee.fr/fr/statistiques/1375188");
    expect(guide.faq.filter((item) => item.answer.includes("brut")).length).toBeGreaterThanOrEqual(4);
  });

  it("maille /smic, /smic-selon-nombre-heures, salaire moyen et cotisations", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("/smic");
    expect(blob).toContain("consulter le montant actuel du SMIC");
    expect(blob).toContain("/smic-selon-nombre-heures");
    expect(blob).toContain("voir le SMIC selon le nombre d'heures travaillées");
    expect(guide.conclusion.closingCta?.href).toBe("/smic");
    expect(guide.conclusion.closingCta?.label).toBe("Consulter le montant actuel du SMIC");
    expect(guide.conclusion.closingSecondaryLinks).toBeUndefined();
    expect(guide.conclusion.furtherReading?.title).toBe("Pour aller plus loin");
    expect(guide.conclusion.furtherReading?.items).toEqual([
      {
        title: "SMIC selon le nombre d'heures",
        description:
          "Calculez le SMIC brut et net pour chaque durée de 10 h à 39 h par semaine, y compris le temps partiel et les heures supplémentaires.",
        href: "/smic-selon-nombre-heures",
      },
      {
        title: "Différence entre brut et net",
        description:
          "Comprenez pourquoi le salaire brut n'est pas le montant versé : cotisations, nets et prélèvement à la source.",
        href: "/guides/comment-est-calcule-le-salaire-net",
      },
    ]);
    expect(blob).toContain("/salaire-moyen-france");
    expect(blob).toContain("/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net");

    const smic = JSON.stringify(getGuideBySlug("smic"));
    expect(smic).toContain("/evolution-smic");
    expect(smic).toContain("évolution du SMIC depuis sa création");

    const hours = JSON.stringify(getGuideBySlug("smic-selon-nombre-heures"));
    expect(hours).toContain("/evolution-smic");
    expect(hours).toContain("historique du taux horaire du SMIC");
  });

  it("structure les tableaux et les graphiques de façon accessible", () => {
    const guide = getGuideBySlug(slug)!;
    const tables = guide.sections.flatMap((section) =>
      (section.blocks ?? []).filter((block) => block.type === "table"),
    );
    expect(tables.length).toBeGreaterThanOrEqual(2);
    expect(tables.every((block) => block.type === "table" && Boolean(block.caption))).toBe(true);
    expect(
      tables.some((block) => block.type === "table" && block.rowHeader && block.stickyFirstColumn),
    ).toBe(true);

    const illustrations = guide.sections.flatMap((section) =>
      (section.blocks ?? []).filter((block) => block.type === "illustration"),
    );
    expect(illustrations.map((block) => (block.type === "illustration" ? block.id : ""))).toEqual(
      expect.arrayContaining([
        "smic-history-hourly-chart",
        "smic-history-inflation-chart",
        "smic-history-decade-nav",
        "smic-history-year-jump",
        "smic-history-timeline",
      ]),
    );
  });

  it("distingue fixation annuelle, seuil de 2 % et relèvement anticipé", () => {
    const guide = getGuideBySlug(slug)!;
    const revalo = guide.sections.find((section) => section.id === "revalorisation");
    const blob = JSON.stringify(revalo);
    expect(blob).toContain("1er janvier");
    expect(blob).toContain("fixation immédiatement antérieure");
    expect(blob).toContain("décret n° 2024-951");
    expect(blob).toContain("11,88");
    expect(blob).toContain("12,31");
    expect(blob).toContain(SMIC_HISTORY_SOURCES.codeTravailAnnuel.href);
    expect(blob).toContain(SMIC_HISTORY_SOURCES.codeTravailAutomatique.href);
    expect(blob).toContain(SMIC_HISTORY_SOURCES.decretNovembre2024.href);
    expect(blob).not.toContain("C'est ce mécanisme qui explique les multiples taux de 2021, 2022, 2023, 2024 ou 2026");
    expect(guide.includeFaqSchema).toBe(false);
  });

  it("formule 2025, 1970 et 1981 de façon autonome", () => {
    const answer2025 = buildYearAnswer(2025).text;
    expect(answer2025.startsWith("Pendant toute l'année 2025")).toBe(true);
    expect(answer2025).toContain("11,88");
    expect(answer2025).toContain("1er novembre 2024");
    expect(answer2025).toContain("1\u00a0801,80");
    expect(answer2025).toContain("Aucun nouveau taux n'est entré en vigueur en 2025");
    expect(answer2025).not.toContain("est passé à 11,88");

    const answer1970 = buildYearAnswer(1970).text;
    expect(answer1970).toContain("0,52\u00a0€");
    expect(answer1970).toContain("moyenne annuelle");
    expect(answer1970).toContain("ni un taux légal applicable à une date précise");
    expect(answer1970).toContain("ni un salaire qui aurait été versé en euros");

    const peak = largestLegalHourlyIncrease();
    expect(peak?.effectiveDate).toBe("1981-06-01");
    expect(peak?.changePercent).toBe(10);
    const peakFaq = getGuideBySlug(slug)!.faq.find((item) =>
      item.question.includes("plus forte augmentation"),
    )!;
    expect(peakFaq.answer).toContain("15,20 F");
    expect(peakFaq.answer).toContain("16,72 F");
    expect(peakFaq.answer).toContain("deux montants horaires successifs");
  });
});
