import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getGuideBySlug, getGuidePublicPath, guides } from "./registry";
import { buildGuideTocH2, computeReadingTime } from "./utils";
import { buildGuideJsonLd } from "@/site/schema";
import { getGuideTocGroups } from "./toc-groups";
import { getAllPublicPages, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import { formatCoverCredit, getGuideCover, getCoverLicenseUrl } from "./covers";
import { getGuideHubTeaser as hubTeaser } from "./guides-hub-data";
import { getMainNavItems } from "@/site/navigation/main-nav-data";
import { smicNavigation } from "@/site/navigation/smic";
import { buildSearchIndex } from "@/site/navigation/site-search-index";
import {
  BE_MIN_WAGE_H1,
  BE_MIN_WAGE_LABELS as L,
  BE_MIN_WAGE_META_DESCRIPTION,
  BE_MIN_WAGE_PATH,
  BE_MIN_WAGE_SEO_TITLE,
  BE_MIN_WAGE_SLUG,
  BE_RMMMG_CURRENT_FROM_LABEL,
} from "@/site/salaire-minimum-belgique";

const SLUG = BE_MIN_WAGE_SLUG;
const PATH = BE_MIN_WAGE_PATH;

describe("guide salaire minimum Belgique", () => {
  it("est enregistré sur l'URL canonique sans année", () => {
    const guide = getGuideBySlug(SLUG);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(PATH);
    expect(PATH).not.toMatch(/2026|2027/);
    expect(guides.some((entry) => entry.slug === SLUG)).toBe(true);
    expect(existsSync(join(process.cwd(), "src/app/salaire-minimum-belgique/page.tsx"))).toBe(
      true,
    );
  });

  it("conserve H1 avec 2026, title et meta sans année", () => {
    const guide = getGuideBySlug(SLUG)!;
    expect(guide.title).toBe(BE_MIN_WAGE_H1);
    expect(guide.title).toContain("2026");
    expect(guide.seoTitle).toBe(BE_MIN_WAGE_SEO_TITLE);
    expect(guide.seoTitle).not.toMatch(/2026|2027/);
    expect(guide.seoTitle?.endsWith("(mis à jour)")).toBe(true);
    expect(guide.description).toBe(BE_MIN_WAGE_META_DESCRIPTION);
    expect(guide.description).not.toMatch(/2026|2027/);
    expect(guide.breadcrumbLabel).toBe("Salaire minimum Belgique");
  });

  it("présente le RMMMG de juillet, le vocabulaire officiel et la nuance moyenne", () => {
    const guide = getGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("revenu minimum mensuel moyen garanti");
    expect(blob).toContain("SMIC belge");
    expect(blob).toContain(L.adultMonthly);
    expect(blob).toContain(L.adultHourly);
    expect(blob).toContain(BE_RMMMG_CURRENT_FROM_LABEL);
    expect(blob).toContain("revenu moyen de référence");
    expect(blob).toContain("commission paritaire");
    expect(blob).not.toContain("majoration générale");
    expect(blob).not.toContain("\u2014");
    expect(guide.introSummary).toBeUndefined();
  });

  it("est indexable, présent au sitemap et au hub, hors menus", () => {
    expect(isPathIndexable(PATH)).toBe(true);
    expect(getAllPublicPages().some((page) => page.path === PATH)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === PATH)).toBe(true);
    expect(getGuideTocGroups(SLUG)).toBeTruthy();
    expect(hubTeaser(SLUG)).toContain("Salaire minimum en Belgique");
    expect(computeReadingTime(getGuideBySlug(SLUG)!)).toBeGreaterThan(8);

    const cover = getGuideCover(SLUG)!;
    expect(cover.src).toBe("/images/covers/guides/salaire-minimum-belgique.webp");
    expect(existsSync(join(process.cwd(), "public", cover.src))).toBe(true);
    expect(formatCoverCredit(cover.credit)).toBe("Photo de aboodi vesakaran via Pexels");
    expect(getCoverLicenseUrl(cover.credit)).toBe("https://www.pexels.com/license/");
    expect(cover.alt.toLowerCase()).toContain("drapeau");
    expect(cover.alt.toLowerCase()).toContain("belge");
    expect(cover.alt.toLowerCase()).not.toContain("2233");
    expect(cover.alt.toLowerCase()).not.toContain("pexels");

    const navBlob = JSON.stringify(getMainNavItems());
    expect(navBlob).not.toContain(PATH);
    expect(navBlob).not.toContain("Salaire minimum Belgique");
    expect(JSON.stringify(smicNavigation)).not.toContain(PATH);
    expect(buildSearchIndex().some((entry) => entry.href === PATH)).toBe(true);
  });

  it("est maillé depuis /smic-europe et renvoie vers les guides utiles", () => {
    const europe = readFileSync(join(process.cwd(), "src/site/smic-europe/data.ts"), "utf8");
    expect(europe).toContain("href: BE_MIN_WAGE_PATH");
    expect(europe).toContain("voir le guide du salaire minimum en Belgique");
    expect(europe).toContain("2 233,61");
    expect(europe).toContain("eurostatMonthlyEur: 2234");

    const guide = getGuideBySlug(SLUG)!;
    const links = JSON.stringify(guide);
    expect(links).toContain("/smic-europe");
    expect(links).toContain("Comparer les salaires minimums en Europe");
    expect(links).toContain("/smic");
    expect(links).toContain("/salaire-minimum-allemagne");
    expect(links).toContain("/salaire-minimum-luxembourg");
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
    expect(article.headline).toBe(BE_MIN_WAGE_H1);
    expect(article.description).toBe(BE_MIN_WAGE_META_DESCRIPTION);
    expect(guide.publishedAt).toBe("2026-10-29T00:00:00+01:00");
    expect(article.datePublished).toBe("2026-10-29T00:00:00+01:00");

    const crumbs = graph["@graph"].find((node) => node["@type"] === "BreadcrumbList") as {
      itemListElement: Array<{ name: string }>;
    };
    expect(crumbs.itemListElement.map((item) => item.name)).toEqual([
      "Accueil",
      "Salaire minimum Belgique",
    ]);

    const toc = buildGuideTocH2(guide).map((entry) => entry.id);
    expect(toc).toContain("montant-actuel");
    expect(toc).toContain("rmmmg-moyen");
    expect(toc).toContain("commission-paritaire");
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
      "@id": "https://www.brut-vers-net.fr/salaire-minimum-belgique#article",
    });
  });

  it("distingue adultes, étudiants, 38 h, net et régions", () => {
    const source = readFileSync(
      join(process.cwd(), "src/site/guides/data/salaire-minimum-belgique.ts"),
      "utf8",
    );
    expect(source).toContain("ne doit pas être utilisé pour un salaire belge");
    expect(source).not.toMatch(/href:\s*"\/"/);
    expect(source).toContain("× 52 / 12");
    expect(source).not.toContain("173 heures");
    expect(source).toContain("CCT n° 50 est supplétive");
    expect(source).toContain("Student at Work est de");
    expect(source).not.toContain("475");
    expect(source).not.toContain("600 heures");
    expect(source).toContain("n'ont pas trois SMIC généraux");
    expect(source).toContain("Âge de l'étudiant");
    expect(source).toContain("plafond légal prévu");
    expect(source).toContain("majorations pour heures supplémentaires");

    const guide = getGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("contrat de travail ordinaire");
    expect(blob).toContain("n'applique pas à ce profil les pourcentages");
    expect(blob).toContain("Il n'existe pas de salaire minimum net unique");
    expect(blob).toContain("La nationalité française ne modifie pas");
    expect(blob).toContain("Le pays d'imposition doit être déterminé");
    expect(blob).toContain("Aucune hausse 2027 n'est applicable");
    expect(blob).toContain("earn_mw_cur");
    expect(blob).toContain("2026-S2");
  });
});
