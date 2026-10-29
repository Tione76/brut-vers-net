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
  ES_MIN_WAGE_H1,
  ES_MIN_WAGE_LABELS as L,
  ES_MIN_WAGE_META_DESCRIPTION,
  ES_MIN_WAGE_PATH,
  ES_MIN_WAGE_SEO_TITLE,
  ES_MIN_WAGE_SLUG,
  ES_SMI_EFFECTS_FROM_LABEL,
} from "@/site/salaire-minimum-espagne";

const SLUG = ES_MIN_WAGE_SLUG;
const PATH = ES_MIN_WAGE_PATH;

describe("guide salaire minimum Espagne", () => {
  it("est enregistré sur l'URL canonique sans année", () => {
    const guide = getGuideBySlug(SLUG);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(PATH);
    expect(PATH).not.toMatch(/2026|2027/);
    expect(guides.some((entry) => entry.slug === SLUG)).toBe(true);
    expect(existsSync(join(process.cwd(), "src/app/salaire-minimum-espagne/page.tsx"))).toBe(
      true,
    );
  });

  it("conserve H1 avec 2026, title et meta sans année", () => {
    const guide = getGuideBySlug(SLUG)!;
    expect(guide.title).toBe(ES_MIN_WAGE_H1);
    expect(guide.title).toContain("2026");
    expect(guide.seoTitle).toBe(ES_MIN_WAGE_SEO_TITLE);
    expect(guide.seoTitle).not.toMatch(/2026|2027/);
    expect(guide.seoTitle?.endsWith("(mis à jour)")).toBe(true);
    expect(guide.description).toBe(ES_MIN_WAGE_META_DESCRIPTION);
    expect(guide.description).not.toMatch(/2026|2027/);
    expect(guide.breadcrumbLabel).toBe("Salaire minimum Espagne");
  });

  it("présente le SMI, les 12 ou 14 versements et le vocabulaire officiel", () => {
    const guide = getGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("salario mínimo interprofesional");
    expect(blob).toContain("SMIC espagnol");
    expect(blob).toContain(L.fourteenMonthly);
    expect(blob).toContain(L.twelveMonthly);
    expect(blob).toContain(L.annual);
    expect(blob).toContain(ES_SMI_EFFECTS_FROM_LABEL);
    expect(blob).toContain("On ne travaille pas 14 mois");
    expect(blob).not.toContain("\u2014");
    expect(guide.introSummary).toBeUndefined();
  });

  it("est indexable, présent au sitemap et au hub, hors menus", () => {
    expect(isPathIndexable(PATH)).toBe(true);
    expect(getAllPublicPages().some((page) => page.path === PATH)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === PATH)).toBe(true);
    expect(getGuideTocGroups(SLUG)).toBeTruthy();
    expect(getGuideHubTeaser(SLUG)).toContain("Salaire minimum en Espagne");
    expect(computeReadingTime(getGuideBySlug(SLUG)!)).toBeGreaterThan(8);

    const cover = getGuideCover(SLUG)!;
    expect(cover.src).toBe("/images/covers/guides/salaire-minimum-espagne.webp");
    expect(existsSync(join(process.cwd(), "public", cover.src))).toBe(true);
    expect(formatCoverCredit(cover.credit)).toBe("Photo de Ovedenie Photography via Pexels");
    expect(getCoverLicenseUrl(cover.credit)).toBe("https://www.pexels.com/license/");
    expect(cover.alt.toLowerCase()).toContain("drapeau");
    expect(cover.alt.toLowerCase()).toContain("espagnol");
    expect(cover.alt.toLowerCase()).not.toContain("1221");
    expect(cover.alt.toLowerCase()).not.toContain("pexels");

    const navBlob = JSON.stringify(getMainNavItems());
    expect(navBlob).not.toContain(PATH);
    expect(navBlob).not.toContain("Salaire minimum Espagne");
    expect(JSON.stringify(smicNavigation)).not.toContain(PATH);
    expect(buildSearchIndex().some((entry) => entry.href === PATH)).toBe(true);
  });

  it("est maillé depuis /smic-europe et renvoie vers les guides utiles", () => {
    const europe = readFileSync(join(process.cwd(), "src/site/smic-europe/data.ts"), "utf8");
    expect(europe).toContain("href: ES_MIN_WAGE_PATH");
    expect(europe).toContain("voir le guide du salaire minimum en Espagne");
    expect(europe).toContain("1 221 €");
    expect(europe).toContain("eurostatMonthlyEur: 1425");

    const guide = getGuideBySlug(SLUG)!;
    const links = JSON.stringify(guide);
    expect(links).toContain("/smic-europe");
    expect(links).toContain("Comparer les salaires minimums en Europe");
    expect(links).toContain("/smic");
    expect(links).toContain("/salaire-minimum-luxembourg");
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
    expect(article.headline).toBe(ES_MIN_WAGE_H1);
    expect(article.description).toBe(ES_MIN_WAGE_META_DESCRIPTION);
    expect(guide.publishedAt).toBe("2026-10-29T00:00:00+01:00");
    expect(article.datePublished).toBe("2026-10-29T00:00:00+01:00");

    const crumbs = graph["@graph"].find((node) => node["@type"] === "BreadcrumbList") as {
      itemListElement: Array<{ name: string }>;
    };
    expect(crumbs.itemListElement.map((item) => item.name)).toEqual([
      "Accueil",
      "Salaire minimum Espagne",
    ]);

    const toc = buildGuideTocH2(guide).map((entry) => entry.id);
    expect(toc).toContain("montant-actuel");
    expect(toc).toContain("quatorze-versements");
    expect(toc).toContain("salaire-base-primes");
    expect(toc).toContain("questions-frequentes");
    expect(toc).toContain("methodologie-sources");
    expect(guide.faq).toHaveLength(12);

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
      "@id": "https://www.brut-vers-net.fr/salaire-minimum-espagne#article",
    });
  });

  it("distingue rétroactivité, absorption, horaire, net et régions", () => {
    const source = readFileSync(
      join(process.cwd(), "src/site/guides/data/salaire-minimum-espagne.ts"),
      "utf8",
    );
    expect(source).toContain("ne s'applique pas à une paie espagnole");
    expect(source).not.toMatch(/href:\s*"\/"/);
    expect(source).not.toContain("173 heures");
    expect(source).toContain("compensation et l'absorption");
    expect(source).toContain("future réglementation");
    expect(source).toContain("n'affiche pas de « SMI horaire universel »");
    expect(source).toContain("emploi à domicile payé à l'heure");
    expect(source).toContain("minimum français de 24 heures");

    const guide = getGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("pas une hausse qui ne commencerait qu'en février");
    expect(blob).toContain("Il n'existe pas de salaire minimum net unique");
    expect(blob).toContain("La nationalité française ne crée pas");
    expect(blob).toContain("Aucune hausse 2027 n'est applicable");
    expect(blob).toContain("earn_mw_cur");
    expect(blob).toContain("2026-S2");
    expect(blob).toContain("37,5 heures n'est pas");
    expect(blob).toContain("pas de SMI légal général distinct");
  });
});
