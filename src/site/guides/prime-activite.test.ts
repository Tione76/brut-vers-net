import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { getGuideBySlug, getGuidePublicPath, guides } from "./registry";
import { buildGuideTocH2, computeReadingTime } from "./utils";
import { buildGuideJsonLd } from "@/site/schema";
import { getGuideHubTeaser } from "@/site/guides/guides-hub-data";
import { getPlanDuSiteSections, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import { guidesNavigation } from "./navigation";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { siteConfig } from "@/site/site.config";
import { seoConfig } from "@/site/seo.config";
import {
  coverToOgInput,
  formatCoverCredit,
  getCoverLicenseUrl,
  getGuideCoverByHref,
  PEXELS_LICENSE_URL,
  resolveGuideCover,
} from "./covers";
import { SITE_AUTHOR } from "@/site/author";
import {
  CAF_CTA_LABEL,
  CAF_SIMULATOR_HREF,
  FORFAIT_SEUL,
  PRIME_ACTIVITE_H1,
  PRIME_ACTIVITE_META_DESCRIPTION,
  PRIME_ACTIVITE_PATH,
  PRIME_ACTIVITE_PUBLISHED_AT,
  PRIME_ACTIVITE_SEO_TITLE,
  PRIME_ACTIVITE_SLUG,
  PRIME_ACTIVITE_TOC_GROUPS,
  PRIME_ACTIVITE_UPDATED_AT,
} from "@/site/prime-activite/data";

describe("guide prime d'activité", () => {
  const slug = PRIME_ACTIVITE_SLUG;
  const path = PRIME_ACTIVITE_PATH;

  it("est enregistrée avec le chemin public /prime-activite", () => {
    const guide = getGuideBySlug(slug);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(path);
    expect(guides.some((item) => item.slug === slug)).toBe(true);
  });

  it("est indexable et présente dans sitemap, plan du site et hub guides", () => {
    expect(isPathIndexable(path)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === path)).toBe(true);
    expect(JSON.stringify(getPlanDuSiteSections())).toContain(path);
    expect(getGuideHubTeaser(slug)).toBeTruthy();
    expect(guidesNavigation.some((item) => item.slug === slug)).toBe(true);
  });

  it("expose le Title evergreen, le H1 daté et la meta sans année", () => {
    const guide = getGuideBySlug(slug)!;
    expect(guide.title).toBe(PRIME_ACTIVITE_H1);
    expect(guide.title).toContain("2026");
    expect(guide.seoTitle).toBe(PRIME_ACTIVITE_SEO_TITLE);
    expect(PRIME_ACTIVITE_SEO_TITLE).toBe(
      "Prime d'activité : montants et plafonds (mis à jour)",
    );
    expect(PRIME_ACTIVITE_SEO_TITLE).not.toMatch(/20\d{2}/);
    expect(guide.description).toBe(PRIME_ACTIVITE_META_DESCRIPTION);
    expect(guide.description).not.toMatch(/20\d{2}/);
    expect(guide.includeFaqSchema).toBe(false);
    expect(guide.includeWebApplicationSchema).toBeFalsy();
    expect(guide.faq.length).toBeGreaterThanOrEqual(8);
    expect(JSON.stringify(guide)).not.toContain("\u2014");
    expect(JSON.stringify(guide).toLowerCase()).not.toContain("localhost");
    expect(guide.publishedAt).toBe(PRIME_ACTIVITE_PUBLISHED_AT);
    expect(guide.updatedAt).toBe(PRIME_ACTIVITE_UPDATED_AT);

    const metadata = buildPageMetadata(siteConfig, seoConfig, {
      title: guide.seoTitle ?? guide.title,
      description: guide.description,
      path,
      openGraphType: "article",
    });
    expect(metadata.title).toEqual({ absolute: PRIME_ACTIVITE_SEO_TITLE });
    expect(metadata.alternates?.canonical).toBe(
      "https://www.brut-vers-net.fr/prime-activite",
    );
    expect((metadata.openGraph as { type?: string } | undefined)?.type).toBe(
      "article",
    );
    expect(metadata.robots).toBeUndefined();
  });

  it("conserve un JSON-LD Article + WebPage sans FAQPage ni calculateur", () => {
    const guide = getGuideBySlug(slug)!;
    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const types = graph.map((node) => node["@type"]);
    expect(types).toContain("WebPage");
    expect(types).toContain("Article");
    expect(types).toContain("BreadcrumbList");
    expect(types).toContain("Organization");
    expect(types).toContain("WebSite");
    expect(types).toContain("Person");
    expect(types).not.toContain("FAQPage");
    expect(types).not.toContain("SoftwareApplication");
    expect(types).not.toContain("WebApplication");
    expect(types).not.toContain("HowTo");

    const webpage = graph.find((node) => node["@type"] === "WebPage") as Record<
      string,
      unknown
    >;
    const article = graph.find((node) => node["@type"] === "Article") as Record<
      string,
      unknown
    >;
    expect(webpage.mainEntity).toEqual({
      "@id": "https://www.brut-vers-net.fr/prime-activite#article",
    });
    expect(webpage.url).toBe("https://www.brut-vers-net.fr/prime-activite");
    expect(article.headline).toBe(PRIME_ACTIVITE_H1);
    expect(article.inLanguage).toBe("fr");
    expect(JSON.stringify(graph)).not.toContain("SoftwareApplication");
  });

  it("oriente vers le simulateur CAF sans calculateur maison", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain(CAF_SIMULATOR_HREF);
    expect(blob).toContain(CAF_CTA_LABEL);
    expect(blob).toContain(String(FORFAIT_SEUL).replace(".", ","));
    expect(blob).not.toMatch(/calculateur de prime d'activité/i);
    expect(guide.sections.some((section) => section.id === "montant-selon-le-salaire")).toBe(
      true,
    );
    const salarySection = guide.sections.find(
      (section) => section.id === "montant-selon-le-salaire",
    );
    const table = salarySection?.blocks?.find((block) => block.type === "table");
    expect(table && table.type === "table" && table.rows).toHaveLength(6);
  });

  it("maille vers des pages existantes du site", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("/smic");
    expect(blob).toContain("/smic-selon-nombre-heures");
    expect(blob).toContain("/guides/comment-lire-une-fiche-de-paie");
    expect(blob).toContain("/salaire-alternance");
    expect(blob).toContain("/salaire-interim-calcul-brut-net");
    expect(blob).not.toContain("/net-vers-brut/");
  });

  it("place la FAQ, la conclusion puis les sources officielles", () => {
    const guide = getGuideBySlug(slug)!;
    expect(guide.sections.some((section) => section.id === "sources-officielles")).toBe(
      false,
    );
    expect(guide.bibliography?.id).toBe("sources-officielles");
    expect(guide.bibliography?.title).toBe("Sources officielles et références");

    const toc = buildGuideTocH2(guide);
    const lastThree = toc.slice(-3).map((entry) => entry.title);
    expect(lastThree).toEqual([
      "Questions fréquentes",
      "À retenir",
      "Sources officielles et références",
    ]);
    expect(guide.conclusion.closingCta?.label).toBe(CAF_CTA_LABEL);
    expect(guide.conclusion.closingCta?.href).toBe(CAF_SIMULATOR_HREF);
    expect(computeReadingTime(guide)).toBeGreaterThanOrEqual(15);
    expect(computeReadingTime(guide)).toBeLessThanOrEqual(30);
  });

  it("applique le barème D. 843-2 au SMIC de juin et le forfait Mayotte 2026-713", () => {
    const blob = JSON.stringify(getGuideBySlug(slug)!);
    expect(blob).toContain("726,29");
    expect(blob).toContain("1 698,78");
    expect(blob).toContain("240,63");
    expect(blob).toContain("460");
    expect(blob).toContain("2026-713");
    expect(blob).not.toMatch(/319[\s\u00a0\u202f]*,[\s\u00a0\u202f]*14/);
    expect(blob).not.toContain("1 052,50");
    expect(blob).not.toContain("1 403,33");
    expect(blob).not.toContain("1 754,17");
    expect(blob).toContain("819,63");
    expect(blob).toContain("1 092,84");
    expect(blob).toContain("1 366,05");
    expect(blob).toContain("2 151");
    expect(blob).toContain(
      "ne s'applique pas au conjoint ni aux bénéficiaires de la prime d'activité majorée",
    );
    expect(blob).toContain("1 144,21");
    expect(blob).toMatch(/au moins égal à 1[\s\u00a0\u202f]144/);
  });

  it("dispose d'une route App Router dédiée", () => {
    const source = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "../../app/prime-activite/page.tsx"),
      "utf8",
    );
    expect(source).toContain("buildGuideJsonLd");
    expect(source).toContain("openGraphType: \"article\"");
    expect(source).toContain("PRIME_ACTIVITE_SLUG");
    expect(source).toContain('tocVariant="editorialOrange"');
    expect(source).toContain("tocGroups={PRIME_ACTIVITE_TOC_GROUPS}");
  });

  it("conserve le sommaire éditorial orange et les groupes de /prime-activite", () => {
    const pageDir = join(dirname(fileURLToPath(import.meta.url)), "../../app");
    const primePage = readFileSync(join(pageDir, "prime-activite/page.tsx"), "utf8");
    const renderer = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "GuideRenderer.tsx"),
      "utf8",
    );

    expect(primePage).toContain('tocVariant="editorialOrange"');
    expect(primePage).toContain("tocGroups={PRIME_ACTIVITE_TOC_GROUPS}");
    expect(primePage).toContain("slug={guide.slug}");
    expect(renderer).toContain("GuideEditorialToc");
    expect(renderer).toContain("getGuideTocGroups");
    expect(renderer).toContain('title = "Explorer ce guide"');
  });

  it("structure le sommaire en quatre catégories sans changer l'ordre des 16 rubriques", () => {
    const toc = buildGuideTocH2(getGuideBySlug(slug)!);
    expect(toc.map((entry) => entry.title)).toEqual([
      "Qu'est-ce que la prime d'activité ?",
      "Qui peut toucher la prime d'activité en 2026 ?",
      "Quels sont les plafonds de revenus de la prime d'activité ?",
      "Quel montant de prime d'activité selon son salaire ?",
      "Comment est calculée la prime d'activité ?",
      "Prime d'activité pour une personne seule, un couple ou une famille",
      "Peut-on toucher la prime d'activité avec le SMIC ?",
      "Qu'est-ce qui change pour la prime d'activité en 2026 ?",
      "Quels revenus faut-il déclarer à la CAF ?",
      "Comment demander la prime d'activité ?",
      "Quand la prime d'activité est-elle versée ?",
      "Situations particulières",
      "Comment vérifier ses droits avec le simulateur officiel ?",
      "Questions fréquentes",
      "À retenir",
      "Sources officielles et références",
    ]);
    expect(toc.map((entry) => entry.id)).toEqual([
      "quest-ce-que-la-prime-d-activite",
      "qui-peut-toucher-la-prime-d-activite-en-2026",
      "plafonds-de-revenus",
      "montant-selon-le-salaire",
      "comment-est-calculee-la-prime",
      "personne-seule-couple-famille",
      "prime-d-activite-et-smic",
      "changements-2026",
      "revenus-a-declarer",
      "comment-demander",
      "quand-est-elle-versee",
      "situations-particulieres",
      "simulateur-officiel",
      "questions-frequentes",
      "conclusion",
      "sources-officielles",
    ]);
    expect(new Set(toc.map((entry) => entry.id)).size).toBe(16);

    expect(PRIME_ACTIVITE_TOC_GROUPS.map((group) => group.title)).toEqual([
      "Comprendre la prime",
      "Montants et calcul",
      "Déclarations et démarches",
      "Vérifier ses droits et aller plus loin",
    ]);
    expect(PRIME_ACTIVITE_TOC_GROUPS.map((group) => [group.start, group.end])).toEqual([
      [0, 4],
      [4, 8],
      [8, 12],
      [12, 16],
    ]);

    const grouped = PRIME_ACTIVITE_TOC_GROUPS.flatMap((group) =>
      toc.slice(group.start, group.end),
    );
    expect(grouped.map((entry) => entry.id)).toEqual(toc.map((entry) => entry.id));
    expect(grouped).toHaveLength(16);

    const editorial = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "GuideEditorialToc.tsx"),
      "utf8",
    );
    const tocCss = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "guide-page.css"),
      "utf8",
    );
    expect(editorial).toContain("entries.slice(block.start, block.end)");
    expect(editorial).toContain('role="group"');
    expect(editorial).toContain("guide-toc__groups");
    expect(editorial).toContain("splitBlocksIntoColumns");
    expect(editorial).toContain("buildTocBlocks");
    expect(editorial).not.toContain("<h2");
    expect(editorial).not.toContain("<h3");
    expect(tocCss).toContain(".guide-toc--editorial .guide-toc__groups");
    expect(tocCss).toContain(".guide-toc--editorial .guide-toc__column");
    expect(tocCss).not.toContain("repeat(var(--toc-rows");
    expect(tocCss).toContain(".guide-toc__mobile[open] ~ .guide-toc__groups");
    expect(tocCss).toContain("border-left: 4px solid var(--ds-brand)");
    expect(tocCss).toContain(".guide-toc--editorial .guide-toc__group-heading");
    expect(tocCss).toMatch(/guide-toc__group-title[\s\S]*font-weight:\s*700/);
  });

  it("applique la variante orange aux trois tableaux sans changer les montants", () => {
    const guide = getGuideBySlug(slug)!;
    const tables = guide.sections.flatMap(
      (section) => section.blocks?.filter((block) => block.type === "table") ?? [],
    );
    expect(tables).toHaveLength(3);
    for (const table of tables) {
      expect(table.type === "table" && table.accent).toBe("brand");
      expect(table.type === "table" && table.stackOnMobile).toBe(true);
      expect(table.type === "table" && table.rowHeader).toBe(true);
    }
    expect(tables[0] && tables[0].type === "table" && tables[0].numeric).toBeFalsy();
    expect(tables[1] && tables[1].type === "table" && tables[1].numeric).toBe(true);
    expect(tables[2] && tables[2].type === "table" && tables[2].numeric).toBe(true);
    expect(tables[0] && tables[0].type === "table" && tables[0].rows[0]?.[0]).toBe(
      "1\u00a0200\u00a0€",
    );
    expect(tables[1] && tables[1].type === "table" && tables[1].rows[0]?.[1]).toBe(
      "638,28\u00a0€",
    );
  });

  it("attache la couverture Edmond Dantès et un ImageObject cohérent", () => {
    const coverSrc = "/images/covers/guides/Prime-activite-montant-plafond.webp";
    const coverAbsolute = `https://www.brut-vers-net.fr${coverSrc}`;
    const coverAlt =
      "Femme en veste beige travaillant sur un ordinateur portable à un bureau en bois, collègues attablés en arrière-plan dans un open space";
    const coverCredit = "Photo de Edmond Dantès via Pexels";
    const guide = getGuideBySlug(slug)!;
    const cover = resolveGuideCover(guide);
    const diskPath = join(process.cwd(), "public", coverSrc.replace(/^\//, ""));

    expect(existsSync(diskPath)).toBe(true);
    expect(statSync(diskPath).size).toBeGreaterThan(20_000);
    expect(statSync(diskPath).size).toBeLessThan(200_000);
    expect(cover?.src).toBe(coverSrc);
    expect(guide.coverImage?.src).toBe(coverSrc);
    expect(getGuideCoverByHref(path)?.src).toBe(coverSrc);
    expect(cover?.width).toBe(1200);
    expect(cover?.height).toBe(800);
    expect(cover?.alt).toBe(coverAlt);
    expect(cover?.alt.toLowerCase()).not.toContain("prime d'activité");
    expect(formatCoverCredit(cover!.credit)).toBe(coverCredit);
    expect(cover!.credit.photographer).toBe("Edmond Dantès");
    expect(cover!.credit.source).toBe("Pexels");
    expect(cover!.credit.acquireLicensePage).toBeUndefined();
    expect(cover!.credit.copyrightNotice).toBeUndefined();
    expect(getCoverLicenseUrl(cover!.credit)).toBe(PEXELS_LICENSE_URL);

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const article = graph.find((node) => node["@type"] === "Article") as Record<
      string,
      unknown
    >;
    const webpage = graph.find((node) => node["@type"] === "WebPage") as Record<
      string,
      unknown
    >;
    const image = graph.find(
      (node) => node["@id"] === `https://www.brut-vers-net.fr${path}#primaryimage`,
    ) as Record<string, unknown>;
    const pageImages = graph.filter(
      (node) =>
        node["@type"] === "ImageObject" && String(node["@id"] ?? "").includes(path),
    );
    const author = article.author as { "@id"?: string };
    const person = graph.find((node) => node["@id"] === author?.["@id"]) as {
      name?: string;
    };

    expect(pageImages).toHaveLength(1);
    expect(article.image).toEqual({
      "@id": `https://www.brut-vers-net.fr${path}#primaryimage`,
    });
    expect(webpage.primaryImageOfPage).toEqual({
      "@id": `https://www.brut-vers-net.fr${path}#primaryimage`,
    });
    expect(image?.["@type"]).toBe("ImageObject");
    expect(image?.url).toBe(coverAbsolute);
    expect(image?.contentUrl).toBe(coverAbsolute);
    expect(image?.width).toBe(1200);
    expect(image?.height).toBe(800);
    expect(image?.encodingFormat).toBe("image/webp");
    expect(image?.creditText).toBe(coverCredit);
    expect(image?.representativeOfPage).toBe(true);
    expect((image?.creator as { name?: string })?.name).toBe("Edmond Dantès");
    expect(image?.license).toBe(PEXELS_LICENSE_URL);
    expect(image).not.toHaveProperty("acquireLicensePage");
    expect(image).not.toHaveProperty("copyrightNotice");
    expect(person?.name).toBe(SITE_AUTHOR.name);
    expect(JSON.stringify(graph)).not.toContain("localhost");
    expect(JSON.stringify(graph)).not.toContain("pexels.com/photo");

    const og = coverToOgInput(cover!);
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
      url: coverAbsolute,
      width: 1200,
      height: 800,
      alt: coverAlt,
      type: "image/webp",
    });
    const twitter = metadata.twitter as
      | { card?: string; images?: Array<string | { url?: string; alt?: string }> | string }
      | undefined;
    expect(twitter?.card).toBe("summary_large_image");
    const twitterImages = twitter?.images;
    const twitterEntry = Array.isArray(twitterImages) ? twitterImages[0] : twitterImages;
    expect(twitterEntry).toMatchObject({
      url: coverAbsolute,
      alt: coverAlt,
    });
    expect(guide.publishedAt).toBe(PRIME_ACTIVITE_PUBLISHED_AT);
    expect(guide.updatedAt).toBe(PRIME_ACTIVITE_UPDATED_AT);
  });
});
