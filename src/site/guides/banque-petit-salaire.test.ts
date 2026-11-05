import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  draftGuides,
  getDraftGuideBySlug,
  getGuideBySlug,
  getGuidePublicPath,
  guides,
} from "./registry";
import { computeReadingTime } from "./utils";
import { buildGuideJsonLd } from "@/site/schema";
import { getGuideTocGroups } from "./toc-groups";
import { getAllPublicPages, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import { coverToOgInput, formatCoverCredit, getGuideCover } from "./covers";
import { getGuideHubTeaser } from "./guides-hub-data";
import { getMainNavItems } from "@/site/navigation/main-nav-data";
import { buildSearchIndex } from "@/site/navigation/site-search-index";
import {
  BANK_GUIDE_H1,
  BANK_GUIDE_META_DESCRIPTION,
  BANK_GUIDE_PATH,
  BANK_GUIDE_PUBLISHED_AT,
  BANK_GUIDE_SEO_TITLE,
  BANK_GUIDE_SLUG,
  BANK_GUIDE_UPDATED_AT,
  BANK_OFFERS,
  offerAnnualLabel,
  offerMonthlyLabel,
  offerUnusedThreeMonthsLabel,
} from "@/site/banque-petit-salaire";

const SLUG = BANK_GUIDE_SLUG;
const PATH = BANK_GUIDE_PATH;

describe("guide banque petit salaire (brouillon)", () => {
  it("reste hors registre publié et hors surfaces publiques", () => {
    expect(getGuideBySlug(SLUG)).toBeUndefined();
    expect(guides.some((entry) => entry.slug === SLUG)).toBe(false);
    expect(draftGuides.some((entry) => entry.slug === SLUG)).toBe(true);
    expect(getDraftGuideBySlug(SLUG)).toBeTruthy();
    expect(getGuidePublicPath(getDraftGuideBySlug(SLUG)!)).toBe(PATH);
    expect(PATH).not.toMatch(/2026|2027/);

    expect(isPathIndexable(PATH)).toBe(false);
    expect(getAllPublicPages().some((page) => page.path === PATH)).toBe(false);
    expect(getSitemapEntries().some((entry) => entry.path === PATH)).toBe(false);
    expect(buildSearchIndex().some((entry) => entry.href === PATH)).toBe(false);

    const navBlob = JSON.stringify(getMainNavItems());
    expect(navBlob).not.toContain(PATH);

    const page = readFileSync(
      join(process.cwd(), "src/app/banque-petit-salaire/page.tsx"),
      "utf8",
    );
    expect(page).toContain("notFound()");
    expect(page).toContain('NODE_ENV === "development"');
    expect(page).toContain("getDraftGuideBySlug");
  });

  it("conserve le contenu éditorial pour reprise ultérieure", () => {
    const guide = getDraftGuideBySlug(SLUG)!;
    expect(guide.title).toBe(BANK_GUIDE_H1);
    expect(guide.seoTitle).toBe(BANK_GUIDE_SEO_TITLE);
    expect(guide.seoTitle).toContain("Brut vers Net");
    expect(guide.description).toBe(BANK_GUIDE_META_DESCRIPTION);
    expect(guide.title).not.toMatch(/2026|2027/);
    expect(guide.seoTitle).not.toMatch(/2026|2027/);
    expect(guide.description).not.toMatch(/2026|2027/);
    expect(guide.breadcrumbLabel).toBe("Banque petit salaire");
    expect(computeReadingTime(guide)).toBeGreaterThan(8);
    expect(getGuideTocGroups(SLUG)).toBeTruthy();
    expect(getGuideHubTeaser(SLUG)).toContain("petit salaire");

    const cover = getGuideCover(SLUG)!;
    expect(cover.src).toBe("/images/covers/guides/banque-petit-salaire.webp");
    expect(existsSync(join(process.cwd(), "public", cover.src))).toBe(true);
    expect(formatCoverCredit(cover.credit)).toBe("Composition éditoriale Brut vers Net");
    expect(cover.credit.source).toBe("Editorial");
  });

  it("affiche les quatre offres dans le même ordre alphabétique, sans classement", () => {
    const guide = getDraftGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(BANK_OFFERS.map((offer) => offer.shortLabel)).toEqual([
      "BoursoBank Welcome",
      "Fortuneo Fosfo",
      "Hello bank! Hello One",
      "Monabanq Pratiq+",
    ]);
    expect(blob).toContain("ordre alphabétique");
    expect(blob).toContain("sans classement");
    expect(blob).not.toContain("meilleure banque");
    expect(blob).not.toContain("n°1");
    expect(blob).not.toContain("\u2014");
    expect(guide.introSummary).toBeUndefined();
    expect(guide.quickSummary).toBeUndefined();
  });

  it("propage les tarifs centralisés dans les tableaux", () => {
    const guide = getDraftGuideBySlug(SLUG)!;
    const frais = guide.sections.find((section) => section.id === "frais-conditions")!;
    const table = frais.blocks?.find((block) => block.type === "table");
    expect(table?.type).toBe("table");
    if (table?.type !== "table") return;
    const labels = table.rows.map((row) => row[0]);
    expect(labels).toEqual(BANK_OFFERS.map((offer) => offer.bankName));
    expect(table.rows[3]?.[2]).toBe(offerMonthlyLabel(BANK_OFFERS[3]!));
    expect(table.rows[3]?.[4]).toBe(offerAnnualLabel(BANK_OFFERS[3]!));

    const scenarios = guide.sections.find((section) => section.id === "gratuite-retraits-incidents")!;
    const scenarioTable = scenarios.blocks?.find(
      (block) => block.type === "table" && block.caption?.includes("Frais fixes sur"),
    );
    expect(scenarioTable?.type).toBe("table");
    if (scenarioTable?.type !== "table") return;
    expect(scenarioTable.rows[1]?.[2]).toBe(offerUnusedThreeMonthsLabel(BANK_OFFERS[1]!));
    expect(scenarioTable.rows[2]?.[2]).toBe(offerUnusedThreeMonthsLabel(BANK_OFFERS[2]!));
  });

  it("n'est plus maillé depuis /smic et ne contient pas de lien affilié", () => {
    const smic = readFileSync(join(process.cwd(), "src/site/guides/data/smic.ts"), "utf8");
    expect(smic).not.toContain('href: "/banque-petit-salaire"');
    expect(smic).not.toContain("/banque-petit-salaire");

    const guide = getDraftGuideBySlug(SLUG)!;
    const links = JSON.stringify(guide);
    expect(links).toContain("/smic");
    expect(links).toContain("/");
    expect(links).not.toContain("awin");
    expect(links).not.toContain("effinity");
    expect(links).not.toContain("moneyvox.fr");
    expect(links).toContain("boursobank.com");
    expect(links).toContain("fortuneo.fr");
    expect(links).toContain("hellobank.fr");
    expect(links).toContain("monabanq.com");
  });

  it("conserve un Schema Article utilisable à la republication", () => {
    const guide = getDraftGuideBySlug(SLUG)!;
    const graph = buildGuideJsonLd(guide) as {
      "@graph": Array<Record<string, unknown>>;
    };
    const types = graph["@graph"].map((node) => node["@type"]);
    expect(types).toContain("Article");
    expect(types).not.toContain("FAQPage");
    expect(types).toContain("BreadcrumbList");
    expect(types).toContain("WebPage");
    expect(types).not.toContain("WebApplication");
    expect(types).not.toContain("Product");
    expect(types).not.toContain("Offer");
    expect(types).not.toContain("AggregateRating");

    const article = graph["@graph"].find((node) => node["@type"] === "Article")!;
    expect(article.headline).toBe(BANK_GUIDE_H1);
    expect(article.description).toBe(BANK_GUIDE_META_DESCRIPTION);
    expect(guide.publishedAt).toBe(BANK_GUIDE_PUBLISHED_AT);
    expect(article.datePublished).toBe(BANK_GUIDE_PUBLISHED_AT);
    expect(article.dateModified).toBe(BANK_GUIDE_UPDATED_AT);

    const crumbs = graph["@graph"].find((node) => node["@type"] === "BreadcrumbList") as {
      itemListElement: Array<{ name: string }>;
    };
    expect(crumbs.itemListElement.map((item) => item.name)).toEqual([
      "Accueil",
      "Banque petit salaire",
    ]);

    expect(guide.sections.map((section) => section.id)).toEqual([
      "offres-decryptees",
      "frais-conditions",
      "quelle-offre",
      "ouvrir-compte-smic",
      "gratuite-retraits-incidents",
      "banque-payante",
      "difficultes-bancaires",
      "methode-selection",
    ]);
    expect(guide.includeFaqSchema).toBe(false);
    expect(guide.faq).toEqual([]);
    expect(guide.bibliography).toBeUndefined();
    expect(guide.faqTitle).toBeUndefined();

    const cover = getGuideCover(SLUG)!;
    const og = coverToOgInput(cover);
    expect(og.url).toBe("/images/covers/guides/banque-petit-salaire.webp");
    expect(og.type).toBe("image/webp");
  });

  it("présente BoursoBank sous son nom actuel dès la première occurrence", () => {
    const source = readFileSync(
      join(process.cwd(), "src/site/guides/data/banque-petit-salaire.ts"),
      "utf8",
    );
    expect(source).toContain("BoursoBank, anciennement Boursorama Banque");
    expect(source).not.toContain("Date.now");
    expect(source).not.toContain("awin");

    const page = readFileSync(
      join(process.cwd(), "src/app/banque-petit-salaire/page.tsx"),
      "utf8",
    );
    expect(page).toContain("BankOfferCards");
    expect(page).toContain("BankNeedBlocks");
    expect(page).toContain("afterIntroduction");
    expect(page).toContain("toc={[]}");
    expect(page).not.toContain("cover={resolveGuideCover(guide)}");
    expect(existsSync(join(process.cwd(), "src/drafts/banque-petit-salaire/README.md"))).toBe(
      true,
    );
  });
});
