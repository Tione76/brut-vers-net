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
  PT_MIN_WAGE_H1,
  PT_MIN_WAGE_LABELS as L,
  PT_MIN_WAGE_META_DESCRIPTION,
  PT_MIN_WAGE_PATH,
  PT_MIN_WAGE_SEO_TITLE,
  PT_MIN_WAGE_SLUG,
  PT_RMMG_EFFECTS_FROM_LABEL,
} from "@/site/salaire-minimum-portugal";

const SLUG = PT_MIN_WAGE_SLUG;
const PATH = PT_MIN_WAGE_PATH;

describe("guide salaire minimum Portugal", () => {
  it("est enregistré sur l'URL canonique sans année", () => {
    const guide = getGuideBySlug(SLUG);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(PATH);
    expect(PATH).not.toMatch(/2026|2027/);
    expect(guides.some((entry) => entry.slug === SLUG)).toBe(true);
    expect(existsSync(join(process.cwd(), "src/app/salaire-minimum-portugal/page.tsx"))).toBe(
      true,
    );
  });

  it("conserve H1 avec 2026, title et meta sans année", () => {
    const guide = getGuideBySlug(SLUG)!;
    expect(guide.title).toBe(PT_MIN_WAGE_H1);
    expect(guide.title).toContain("2026");
    expect(guide.seoTitle).toBe(PT_MIN_WAGE_SEO_TITLE);
    expect(guide.seoTitle).not.toMatch(/2026|2027/);
    expect(guide.seoTitle?.endsWith("(mis à jour)")).toBe(true);
    expect(guide.description).toBe(PT_MIN_WAGE_META_DESCRIPTION);
    expect(guide.description).not.toMatch(/2026|2027/);
    expect(guide.breadcrumbLabel).toBe("Salaire minimum Portugal");
  });

  it("présente la RMMG, les territoires et le vocabulaire officiel", () => {
    const guide = getGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("retribuição mínima mensal garantida");
    expect(blob).toContain("SMIC portugais");
    expect(blob).toContain(L.continentalMonthly);
    expect(blob).toContain(L.azoresMonthly);
    expect(blob).toContain(L.madeiraMonthly);
    expect(blob).toContain(L.continentalAnnual);
    expect(blob).toContain(L.continentalTwelve);
    expect(blob).toContain(PT_RMMG_EFFECTS_FROM_LABEL);
    expect(blob).toContain("On ne travaille pas 14 mois");
    expect(blob).not.toContain("RMMMG");
    expect(blob).not.toContain("\u2014");
    expect(guide.introSummary).toBeUndefined();
  });

  it("est indexable, présent au sitemap et au hub, hors menus", () => {
    expect(isPathIndexable(PATH)).toBe(true);
    expect(getAllPublicPages().some((page) => page.path === PATH)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === PATH)).toBe(true);
    expect(getGuideTocGroups(SLUG)).toBeTruthy();
    expect(getGuideHubTeaser(SLUG)).toContain("Salaire minimum au Portugal");
    expect(computeReadingTime(getGuideBySlug(SLUG)!)).toBeGreaterThan(8);

    const cover = getGuideCover(SLUG)!;
    expect(cover.src).toBe("/images/covers/guides/salaire-minimum-portugal.webp");
    expect(existsSync(join(process.cwd(), "public", cover.src))).toBe(true);
    expect(formatCoverCredit(cover.credit)).toBe("Photo de Russell Butcher via Pexels");
    expect(getCoverLicenseUrl(cover.credit)).toBe("https://www.pexels.com/license/");
    expect(cover.alt.toLowerCase()).toContain("drapeau");
    expect(cover.alt.toLowerCase()).toContain("portugais");
    expect(cover.alt.toLowerCase()).not.toContain("920");
    expect(cover.alt.toLowerCase()).not.toContain("pexels");

    const navBlob = JSON.stringify(getMainNavItems());
    expect(navBlob).not.toContain(PATH);
    expect(navBlob).not.toContain("Salaire minimum Portugal");
    expect(JSON.stringify(smicNavigation)).not.toContain(PATH);
    expect(buildSearchIndex().some((entry) => entry.href === PATH)).toBe(true);
  });

  it("est maillé depuis /smic-europe et renvoie vers les guides utiles", () => {
    const europe = readFileSync(join(process.cwd(), "src/site/smic-europe/data.ts"), "utf8");
    expect(europe).toContain("href: PT_MIN_WAGE_PATH");
    expect(europe).toContain("voir le guide du salaire minimum au Portugal");
    expect(europe).toContain("920 €");
    expect(europe).toContain("eurostatMonthlyEur: 1073");

    const guide = getGuideBySlug(SLUG)!;
    const links = JSON.stringify(guide);
    expect(links).toContain("/smic-europe");
    expect(links).toContain("Comparer les salaires minimums en Europe");
    expect(links).toContain("/smic");
    expect(links).toContain("/salaire-minimum-espagne");
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
    expect(article.headline).toBe(PT_MIN_WAGE_H1);
    expect(article.description).toBe(PT_MIN_WAGE_META_DESCRIPTION);
    expect(guide.publishedAt).toBe("2026-10-30T00:00:00+01:00");
    expect(article.datePublished).toBe("2026-10-30T00:00:00+01:00");
    expect(article.dateModified).toBe("2026-10-30T00:00:00+01:00");

    const crumbs = graph["@graph"].find((node) => node["@type"] === "BreadcrumbList") as {
      itemListElement: Array<{ name: string }>;
    };
    expect(crumbs.itemListElement.map((item) => item.name)).toEqual([
      "Accueil",
      "Salaire minimum Portugal",
    ]);

    const toc = buildGuideTocH2(guide).map((entry) => entry.id);
    expect(toc).toContain("montant-actuel");
    expect(toc).toContain("territoires");
    expect(toc).toContain("quatorze-versements");
    expect(toc).toContain("questions-frequentes");
    expect(toc).toContain("methodologie-sources");
    expect(toc).toContain("conclusion");
    expect(guide.faq).toHaveLength(12);
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
      "@id": "https://www.brut-vers-net.fr/salaire-minimum-portugal#article",
    });
  });

  it("distingue territoires, 12/14, horaire, net et 2027", () => {
    const source = readFileSync(
      join(process.cwd(), "src/site/guides/data/salaire-minimum-portugal.ts"),
      "utf8",
    );
    expect(source).toContain("ne s'applique pas à une paie portugaise");
    expect(source).not.toMatch(/href:\s*"\/"/);
    expect(source).not.toContain("173 heures");
    expect(source).not.toContain("RMMMG");
    expect(source).toContain("utilise 12, pas 14");
    expect(source).toContain("n'est pas dû à tous les salariés du privé");
    expect(source).toContain("minimum français de 24 heures");
    expect(source).toContain("n'ayant pas de frontière terrestre commune");
    expect(source).not.toContain("fait imputable au salarié");
    expect(source).not.toContain("praticien");
    expect(source).not.toContain("un formé");
    expect(source).not.toContain("jusqu'à ce montant");
    expect(source).not.toContain("diploma publié");
    expect(source).toContain("sans autres éléments de rémunération");
    expect(source).toContain("repère annualisé au taux en vigueur");
    expect(source).toContain("Portaria n.º 51-B/2026/1");

    const guide = getGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("pas un second minimum mensuel légal");
    expect(blob).toContain("Il n'existe pas de salaire minimum net unique");
    expect(blob).toContain("même plancher que les autres salariés de l'emploi");
    expect(blob).toContain("pas le taux déjà applicable");
    const netFaq = guide.faq!.find((item) => item.question === "Quel net dans un cas simple ?")!;
    expect(netFaq.answer).toContain(L.ssWorkerAmount);
    expect(netFaq.answer).toContain(L.netBeforeIrs);
    expect(netFaq.answer).toContain(`jusqu'à ${L.continentalMonthly} de rémunération mensuelle brute`);
    expect(netFaq.answer).not.toContain("jusqu'à ce montant");
    const faq2027 = guide.faq!.find((item) => item.question === "Que prévoit-on pour 2027 ?")!;
    expect(faq2027.answer).toContain("date d'effet");
    expect(faq2027.answer).not.toContain("n'est pas publié");
    expect(blob).toContain("earn_mw_cur");
    expect(blob).toContain("2026-S2");
    expect(blob).toContain("du seul fait de l'âge");
  });
});
