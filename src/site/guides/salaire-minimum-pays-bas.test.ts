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
  NL_MIN_WAGE_H1,
  NL_MIN_WAGE_LABELS as L,
  NL_MIN_WAGE_META_DESCRIPTION,
  NL_MIN_WAGE_PATH,
  NL_MIN_WAGE_SEO_TITLE,
  NL_MIN_WAGE_SLUG,
  NL_NMW_EFFECTS_FROM_LABEL,
} from "@/site/salaire-minimum-pays-bas";

const SLUG = NL_MIN_WAGE_SLUG;
const PATH = NL_MIN_WAGE_PATH;

describe("guide salaire minimum Pays-Bas", () => {
  it("est enregistré sur l'URL canonique sans année", () => {
    const guide = getGuideBySlug(SLUG);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(PATH);
    expect(PATH).not.toMatch(/2026|2027/);
    expect(guides.some((entry) => entry.slug === SLUG)).toBe(true);
    expect(existsSync(join(process.cwd(), "src/app/salaire-minimum-pays-bas/page.tsx"))).toBe(
      true,
    );
  });

  it("conserve H1 avec 2026, title et meta sans année", () => {
    const guide = getGuideBySlug(SLUG)!;
    expect(guide.title).toBe(NL_MIN_WAGE_H1);
    expect(guide.title).toContain("2026");
    expect(guide.seoTitle).toBe(NL_MIN_WAGE_SEO_TITLE);
    expect(guide.seoTitle).not.toMatch(/2026|2027/);
    expect(guide.seoTitle?.endsWith("(mis à jour)")).toBe(true);
    expect(guide.description).toBe(NL_MIN_WAGE_META_DESCRIPTION);
    expect(guide.description).not.toMatch(/2026|2027/);
    expect(guide.breadcrumbLabel).toBe("Salaire minimum Pays-Bas");
  });

  it("présente le minimumuurloon, le pécule et le vocabulaire officiel", () => {
    const guide = getGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("wettelijk minimumuurloon");
    expect(blob).toContain("minimumjeugdloon");
    expect(blob).toContain("vakantiegeld");
    expect(blob).toContain("SMIC néerlandais");
    expect(blob).toContain(L.adult);
    expect(blob).toContain(L.monthly36);
    expect(blob).toContain(NL_NMW_EFFECTS_FROM_LABEL);
    expect(blob).toContain("le minimum est fixé à l'heure");
    expect(blob).not.toContain("\u2014");
    expect(guide.introSummary).toBeUndefined();
  });

  it("est indexable, présent au sitemap et au hub, hors menus", () => {
    expect(isPathIndexable(PATH)).toBe(true);
    expect(getAllPublicPages().some((page) => page.path === PATH)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === PATH)).toBe(true);
    expect(getGuideTocGroups(SLUG)).toBeTruthy();
    expect(getGuideHubTeaser(SLUG)).toContain("Salaire minimum aux Pays-Bas");
    expect(computeReadingTime(getGuideBySlug(SLUG)!)).toBeGreaterThan(8);

    const cover = getGuideCover(SLUG)!;
    expect(cover.src).toBe("/images/covers/guides/salaire-minimum-pays-bas.webp");
    expect(existsSync(join(process.cwd(), "public", cover.src))).toBe(true);
    expect(formatCoverCredit(cover.credit)).toBe(
      "Photo de Mike van Schoonderwalt via Pexels",
    );
    expect(cover.credit.photographer).toBe("Mike van Schoonderwalt");
    expect(getCoverLicenseUrl(cover.credit)).toBe("https://www.pexels.com/license/");
    expect(cover.alt.toLowerCase()).toContain("drapeau néerlandais");
    expect(cover.alt.toLowerCase()).not.toContain("pexels");

    const navBlob = JSON.stringify(getMainNavItems());
    expect(navBlob).not.toContain(PATH);
    expect(navBlob).not.toContain("Salaire minimum Pays-Bas");
    expect(JSON.stringify(smicNavigation)).not.toContain(PATH);
    expect(buildSearchIndex().some((entry) => entry.href === PATH)).toBe(true);
  });

  it("est maillé depuis /smic-europe et renvoie vers les guides utiles", () => {
    const europe = readFileSync(join(process.cwd(), "src/site/smic-europe/data.ts"), "utf8");
    expect(europe).toContain("href: NL_MIN_WAGE_PATH");
    expect(europe).toContain("voir le guide du salaire minimum aux Pays-Bas");
    expect(europe).toContain("14,99 €");
    expect(europe).toContain("earn_mw_cur 2026-S2");

    const guide = getGuideBySlug(SLUG)!;
    const links = JSON.stringify(guide);
    expect(links).toContain("/smic-europe");
    expect(links).toContain("Comparer les salaires minimums en Europe");
    expect(links).toContain("/smic");
    expect(links).toContain("/salaire-minimum-allemagne");
    expect(links).toContain("/salaire-minimum-belgique");
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
    expect(types).not.toContain("WebApplication");
    expect(types).not.toContain("Product");
    expect(types).not.toContain("Offer");

    const article = graph["@graph"].find((node) => node["@type"] === "Article")!;
    expect(article.headline).toBe(NL_MIN_WAGE_H1);
    expect(article.description).toBe(NL_MIN_WAGE_META_DESCRIPTION);
    expect(guide.publishedAt).toBe("2026-10-30T00:00:00+01:00");
    expect(article.datePublished).toBe("2026-10-30T00:00:00+01:00");
    expect(article.dateModified).toBe("2026-10-30T00:00:00+01:00");

    const crumbs = graph["@graph"].find((node) => node["@type"] === "BreadcrumbList") as {
      itemListElement: Array<{ name: string }>;
    };
    expect(crumbs.itemListElement.map((item) => item.name)).toEqual([
      "Accueil",
      "Salaire minimum Pays-Bas",
    ]);

    const toc = buildGuideTocH2(guide).map((entry) => entry.id);
    expect(toc).toContain("montant-actuel");
    expect(toc).toContain("bareme-age");
    expect(toc).toContain("pecule-vacances");
    expect(toc).toContain("questions-frequentes");
    expect(toc).toContain("methodologie-sources");
    expect(toc).toContain("conclusion");
    expect(guide.faq).toHaveLength(14);
    expect(guide.conclusion.title).toBe("À retenir");
    expect(guide.updatedAt).toBe("2026-10-30T00:00:00+01:00");

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
      "@id": "https://www.brut-vers-net.fr/salaire-minimum-pays-bas#article",
    });
  });

  it("distingue horaire, pécule, BBL, 2027 et territoires", () => {
    const source = readFileSync(
      join(process.cwd(), "src/site/guides/data/salaire-minimum-pays-bas.ts"),
      "utf8",
    );
    expect(source).not.toMatch(/href:\s*"\/"/);
    expect(source).not.toContain("173 heures");
    expect(source).not.toContain("5,6 semaines");
    expect(source).not.toContain("période de référence de paie");
    expect(source).toContain("Amsterdam");
    expect(source).toContain("Bonaire");
    expect(source).toContain("referentiemaandloon");
    expect(source).toContain("pas le taux actuel");

    const guide = getGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("pas un minimum mensuel publié");
    expect(blob).toContain("Il n'existe pas de minimum net unique");
    expect(blob).toContain(L.announced2027Adult);
    expect(blob).toContain("jour de l'anniversaire");
    const faq2027 = guide.faq!.find((item) => item.question === "Que prévoit janvier 2027 ?")!;
    expect(faq2027.answer).toContain("pas encore le taux applicable");
    expect(blob).not.toContain("Date.now");
  });
});
