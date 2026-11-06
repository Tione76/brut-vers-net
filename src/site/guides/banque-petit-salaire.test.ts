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
import { getAllPublicPages, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import { getMainNavItems } from "@/site/navigation/main-nav-data";
import { buildSearchIndex } from "@/site/navigation/site-search-index";
import {
  BANK_FAQ_ITEMS,
  BANK_GUIDE_H1,
  BANK_GUIDE_META_DESCRIPTION,
  BANK_GUIDE_PATH,
  BANK_GUIDE_SEO_TITLE,
  BANK_GUIDE_SLUG,
  BANK_OFFERS,
  buildBanquePetitSalaireJsonLd,
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

    expect(isPathIndexable(PATH)).toBe(false);
    expect(getAllPublicPages().some((page) => page.path === PATH)).toBe(false);
    expect(getSitemapEntries().some((entry) => entry.path === PATH)).toBe(false);
    expect(buildSearchIndex().some((entry) => entry.href === PATH)).toBe(false);
    expect(JSON.stringify(getMainNavItems())).not.toContain(PATH);

    const page = readFileSync(
      join(process.cwd(), "src/app/banque-petit-salaire/page.tsx"),
      "utf8",
    );
    expect(page).toContain("notFound()");
    expect(page).toContain('NODE_ENV === "development"');
    expect(page).toContain("getDraftGuideBySlug");
    expect(page).toContain("BankCompareTabs");
  });

  it("conserve H1, title et meta sans année", () => {
    const guide = getDraftGuideBySlug(SLUG)!;
    expect(guide.title).toBe(BANK_GUIDE_H1);
    expect(guide.seoTitle).toBe(BANK_GUIDE_SEO_TITLE);
    expect(guide.description).toBe(BANK_GUIDE_META_DESCRIPTION);
    expect(guide.title).not.toMatch(/2026|2027/);
    expect(guide.seoTitle).not.toMatch(/2026|2027/);
    expect(guide.description).not.toMatch(/2026|2027/);
    expect(PATH).not.toMatch(/2026|2027/);
  });

  it("centralise quatre offres alphabétiques avec encart de bienvenue uniquement", () => {
    expect(BANK_OFFERS.map((offer) => offer.shortLabel)).toEqual([
      "BoursoBank Welcome",
      "Fortuneo Fosfo",
      "Hello bank! Hello One",
      "Monabanq Pratiq+",
    ]);
    for (const offer of BANK_OFFERS) {
      expect(offer.welcome.kind === "confirmed" || offer.welcome.kind === "none").toBe(true);
      expect(offer.isAffiliate).toBe(false);
      expect(offer.productUrl.startsWith("http")).toBe(true);
    }
    expect(BANK_OFFERS[0]!.welcome).toMatchObject({
      kind: "confirmed",
      amountCents: 18000,
      isMaximum: true,
    });
    expect(BANK_OFFERS[1]!.welcome).toMatchObject({
      kind: "confirmed",
      amountCents: 3000,
    });
    expect(offerMonthlyLabel(BANK_OFFERS[3]!)).toContain("3,90");
    expect(offerUnusedThreeMonthsLabel(BANK_OFFERS[1]!)).toContain("9");
  });

  it("n'est plus maillé depuis /smic", () => {
    const smic = readFileSync(join(process.cwd(), "src/site/guides/data/smic.ts"), "utf8");
    expect(smic).not.toContain("/banque-petit-salaire");
  });

  it("expose un graphe schema cohérent sans AggregateRating", () => {
    const guide = getDraftGuideBySlug(SLUG)!;
    const graph = buildBanquePetitSalaireJsonLd(guide) as {
      "@graph": Array<Record<string, unknown>>;
    };
    const types = graph["@graph"].map((node) => node["@type"]);
    expect(types).toContain("Article");
    expect(types).toContain("FAQPage");
    expect(types).toContain("ItemList");
    expect(types).toContain("BankAccount");
    expect(types).toContain("BreadcrumbList");
    expect(types).not.toContain("AggregateRating");
    expect(types).not.toContain("Product");
    expect(graph["@graph"].filter((node) => node["@type"] === "BankAccount")).toHaveLength(4);
    expect(BANK_FAQ_ITEMS.length).toBeGreaterThanOrEqual(6);
  });

  it("conserve le design des cartes et le lien secondaire", () => {
    const cards = readFileSync(
      join(process.cwd(), "src/site/banque-petit-salaire/BankOfferCards.tsx"),
      "utf8",
    );
    expect(cards).toContain("bp-card__cta");
    expect(cards).toContain("Comprendre cette offre");
    expect(cards).toContain("Offre de bienvenue");
    expect(cards).not.toContain('kind: "tariff"');
    expect(existsSync(join(process.cwd(), "src/drafts/banque-petit-salaire/README.md"))).toBe(
      true,
    );
  });
});
