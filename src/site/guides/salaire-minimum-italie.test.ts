import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getGuideBySlug, getGuidePublicPath, guides } from "./registry";
import { buildGuideTocH2, computeReadingTime } from "./utils";
import { buildGuideJsonLd } from "@/site/schema";
import { getGuideTocGroups } from "./toc-groups";
import { getAllPublicPages, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import { formatCoverCredit, getGuideCover, getCoverLicenseUrl } from "./covers";
import { getGuideHubTeaser } from "./guides-hub-data";
import { getMainNavItems } from "@/site/navigation/main-nav-data";
import { smicNavigation } from "@/site/navigation/smic";
import { buildSearchIndex } from "@/site/navigation/site-search-index";
import {
  IT_COMMERCE_CNEL,
  IT_COMMERCE_FROM,
  IT_COMMERCE_IV_BASE,
  IT_COMMERCE_IV_TOTAL,
  IT_COMMERCE_MONTHS,
  IT_COMMERCE_VII_BASE,
  IT_COMMERCE_VII_TOTAL,
  IT_METAL_C3,
  IT_METAL_CNEL,
  IT_METAL_D1,
  IT_METAL_FROM,
  IT_METAL_MONTHS,
  IT_MIN_WAGE_H1,
  IT_MIN_WAGE_LABELS as L,
  IT_MIN_WAGE_META_DESCRIPTION,
  IT_MIN_WAGE_PATH,
  IT_MIN_WAGE_PUBLISHED_AT,
  IT_MIN_WAGE_SEO_TITLE,
  IT_MIN_WAGE_SLUG,
  IT_MIN_WAGE_UPDATED_AT,
  IT_SECTOR_EXAMPLES,
} from "@/site/salaire-minimum-italie";

const SLUG = IT_MIN_WAGE_SLUG;
const PATH = IT_MIN_WAGE_PATH;

describe("guide salaire minimum Italie", () => {
  it("est enregistré sur l'URL canonique sans année", () => {
    const guide = getGuideBySlug(SLUG);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(PATH);
    expect(PATH).not.toMatch(/2026|2027/);
    expect(guides.some((entry) => entry.slug === SLUG)).toBe(true);
    expect(existsSync(join(process.cwd(), "src/app/salaire-minimum-italie/page.tsx"))).toBe(
      true,
    );
  });

  it("conserve H1 avec 2026, title et meta sans année", () => {
    const guide = getGuideBySlug(SLUG)!;
    expect(guide.title).toBe(IT_MIN_WAGE_H1);
    expect(guide.title).toContain("2026");
    expect(guide.seoTitle).toBe(IT_MIN_WAGE_SEO_TITLE);
    expect(guide.seoTitle).not.toMatch(/2026|2027/);
    expect(guide.description).toBe(IT_MIN_WAGE_META_DESCRIPTION);
    expect(guide.description).not.toMatch(/2026|2027/);
    expect(guide.description).not.toMatch(/\d[\d\s]*,\d+\s*€/);
    expect(guide.breadcrumbLabel).toBe("Salaire minimum Italie");
  });

  it("présente le cadre CCNL sans inventer un SMIC national chiffré", () => {
    const guide = getGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("SMIC italien");
    expect(blob).toContain("CCNL");
    expect(blob).toContain("Contratto collettivo nazionale di lavoro");
    expect(blob).toContain(IT_COMMERCE_CNEL);
    expect(blob).toContain(IT_METAL_CNEL);
    expect(blob).toContain(L.commerceIvTotal);
    expect(blob).toContain(L.metalD1);
    expect(blob).toContain(L.domesticALiveIn);
    expect(blob).not.toContain("\u2014");
    expect(blob).not.toContain("le salaire minimum italien est de");
    expect(blob).not.toContain("le SMIC italien est compris");
    expect(blob).not.toContain("0,78");
    expect(blob).not.toContain("151,67");
    expect(blob).not.toContain("173,33");
    expect(guide.introSummary).toBeUndefined();
    expect(guide.quickSummary).toBeUndefined();
  });

  it("centralise les exemples chiffrés avec leurs champs indispensables", () => {
    const commerceIv = IT_SECTOR_EXAMPLES.commerceIvTotal;
    expect(commerceIv.ccnlName).toContain("Confcommercio");
    expect(commerceIv.cnelCode).toBe(IT_COMMERCE_CNEL);
    expect(commerceIv.amount).toBe(IT_COMMERCE_IV_TOTAL);
    expect(commerceIv.kind).toBe("total-fixed");
    expect(commerceIv.from).toBe(IT_COMMERCE_FROM);
    expect(commerceIv.months).toBe(IT_COMMERCE_MONTHS);
    expect(IT_SECTOR_EXAMPLES.commerceIvBase.amount).toBe(IT_COMMERCE_IV_BASE);
    expect(IT_SECTOR_EXAMPLES.commerceViiBase.amount).toBe(IT_COMMERCE_VII_BASE);
    expect(IT_SECTOR_EXAMPLES.commerceViiTotal.amount).toBe(IT_COMMERCE_VII_TOTAL);
    expect(IT_SECTOR_EXAMPLES.commerceIvBase.kind).not.toBe(
      IT_SECTOR_EXAMPLES.commerceIvTotal.kind,
    );

    const metal = IT_SECTOR_EXAMPLES.metalD1;
    expect(metal.cnelCode).toBe(IT_METAL_CNEL);
    expect(metal.amount).toBe(IT_METAL_D1);
    expect(metal.kind).toBe("tabellare");
    expect(metal.from).toBe(IT_METAL_FROM);
    expect(metal.months).toBe(IT_METAL_MONTHS);
    expect(IT_SECTOR_EXAMPLES.metalC3.amount).toBe(IT_METAL_C3);
    expect(IT_SECTOR_EXAMPLES.domesticAHourly.unit).toBe("hour");
    expect(IT_SECTOR_EXAMPLES.domesticALiveIn.unit).toBe("month");
  });

  it("est indexable, présent au sitemap et au hub, hors menus", () => {
    expect(isPathIndexable(PATH)).toBe(true);
    expect(getAllPublicPages().some((page) => page.path === PATH)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === PATH)).toBe(true);
    expect(getGuideTocGroups(SLUG)).toBeTruthy();
    expect(getGuideHubTeaser(SLUG)).toContain("Salaire minimum en Italie");
    expect(getGuideHubTeaser(SLUG)).not.toMatch(/\d[\d\s]*,\d+\s*€/);
    expect(computeReadingTime(getGuideBySlug(SLUG)!)).toBeGreaterThan(8);

    const cover = getGuideCover(SLUG)!;
    expect(cover.src).toBe("/images/covers/guides/salaire-minimum-italie.webp");
    expect(existsSync(join(process.cwd(), "public", cover.src))).toBe(true);
    expect(formatCoverCredit(cover.credit)).toBe("Photo de Kassandre Pedro via Pexels");
    expect(cover.credit.photographer).toBe("Kassandre Pedro");
    expect(getCoverLicenseUrl(cover.credit)).toBe("https://www.pexels.com/license/");
    expect(cover.alt.toLowerCase()).toContain("drapeau italien");
    expect(cover.alt.toLowerCase()).not.toContain("pexels");

    const navBlob = JSON.stringify(getMainNavItems());
    expect(navBlob).not.toContain(PATH);
    expect(navBlob).not.toContain("Salaire minimum Italie");
    expect(JSON.stringify(smicNavigation)).not.toContain(PATH);
    expect(buildSearchIndex().some((entry) => entry.href === PATH)).toBe(true);
  });

  it("est maillé depuis /smic-europe et renvoie vers les guides utiles", () => {
    const europe = readFileSync(join(process.cwd(), "src/site/smic-europe/data.ts"), "utf8");
    expect(europe).toContain("href: IT_MIN_WAGE_PATH");
    expect(europe).toContain("voir le guide du salaire minimum en Italie");
    const itCard = europe.slice(europe.indexOf('code: "IT"'), europe.indexOf('code: "XK"'));
    expect(itCard).toContain("Pas de salaire minimum national");
    expect(itCard).not.toMatch(/\d[\d\s]{2,}\d\s*€/);

    const guide = getGuideBySlug(SLUG)!;
    const links = JSON.stringify(guide);
    expect(links).toContain("/smic-europe");
    expect(links).toContain("/smic");
    expect(links).toContain("/salaire-minimum-suisse");
  });

  it("expose un Schema Article + FAQ + fil d'Ariane cohérents", () => {
    const guide = getGuideBySlug(SLUG)!;
    const graph = buildGuideJsonLd(guide) as {
      "@graph": Array<Record<string, unknown>>;
    };
    const types = graph["@graph"].map((node) => node["@type"]);
    expect(types).toContain("Article");
    expect(types).toContain("FAQPage");
    expect(types).toContain("BreadcrumbList");
    expect(types).toContain("WebPage");
    expect(types).not.toContain("WebApplication");
    expect(types).not.toContain("Product");
    expect(types).not.toContain("Offer");
    expect(types).not.toContain("AggregateRating");
    expect(types).not.toContain("MonetaryAmount");

    const article = graph["@graph"].find((node) => node["@type"] === "Article")!;
    expect(article.headline).toBe(IT_MIN_WAGE_H1);
    expect(article.description).toBe(IT_MIN_WAGE_META_DESCRIPTION);
    expect(guide.publishedAt).toBe(IT_MIN_WAGE_PUBLISHED_AT);
    expect(article.datePublished).toBe(IT_MIN_WAGE_PUBLISHED_AT);
    expect(article.dateModified).toBe(IT_MIN_WAGE_UPDATED_AT);

    const crumbs = graph["@graph"].find((node) => node["@type"] === "BreadcrumbList") as {
      itemListElement: Array<{ name: string }>;
    };
    expect(crumbs.itemListElement.map((item) => item.name)).toEqual([
      "Accueil",
      "Salaire minimum Italie",
    ]);

    const toc = buildGuideTocH2(guide).map((entry) => entry.id);
    expect(toc).toEqual([
      "existe-t-il-un-smic",
      "comment-salaire-minimum-fixe",
      "minima-par-secteur",
      "trouver-ccnl",
      "treizieme-quatorzieme-mois",
      "salaire-horaire",
      "salaire-net",
      "temps-partiel-apprentis",
      "salario-giusto",
      "france-italie",
      "verifier-offre",
      "trop-bas",
      "questions-frequentes",
      "methodologie-sources",
      "conclusion",
    ]);
    expect(guide.faq).toHaveLength(12);
    expect(guide.conclusion.title).toBe("À retenir");
    expect(guide.updatedAt).toBe(IT_MIN_WAGE_UPDATED_AT);

    const faqPage = graph["@graph"].find((node) => node["@type"] === "FAQPage") as {
      mainEntity: Array<{ name: string; acceptedAnswer: { text: string } }>;
    };
    expect(faqPage.mainEntity).toHaveLength(guide.faq!.length);
    expect(faqPage.mainEntity.map((item) => item.name)).toEqual(
      guide.faq!.map((item) => item.question),
    );
    expect(faqPage.mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
      guide.faq!.map((item) => item.answer),
    );

    const webPage = graph["@graph"].find((node) => node["@type"] === "WebPage");
    expect(webPage?.about).toBeUndefined();
    expect(webPage?.mainEntity).toEqual({
      "@id": "https://www.brut-vers-net.fr/salaire-minimum-italie#article",
    });
  });

  it("distingue TEC, 9 €, mensualités et bases salariales", () => {
    const source = readFileSync(
      join(process.cwd(), "src/site/guides/data/salaire-minimum-italie.ts"),
      "utf8",
    );
    expect(source).not.toMatch(/href:\s*"\/"/);
    expect(source).not.toContain("173 heures");
    expect(source).not.toContain("Date.now");
    expect(source).toContain("traitement économique global");
    expect(source).toContain("C.2179");

    const guide = getGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("pas un taux national obligatoire");
    expect(blob).toContain(
      `Au niveau VII, les ${L.commerceViiTotal} comprennent ${L.commerceViiBase} de salaire de base, ${L.commerceViiExtraBase} d'élément additionnel, ${L.commerceViiContingenza} d'indemnité de contingence et ${L.commerceTerzoElemento} de troisième élément.`,
    );
    expect(blob).toContain("Pour illustrer le calcul");
    expect(blob).toContain(L.pedagogicalMonthly);
    expect(blob).toContain("Le calculateur brut-net français de ce site ne calcule pas une paie italienne");
    const faq9 = guide.faq!.find((item) => item.question.includes("9 €"))!;
    expect(faq9.answer).toContain("pas un taux national en vigueur");
  });
});
