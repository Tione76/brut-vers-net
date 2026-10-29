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
import {
  LU_MIN_WAGE_H1,
  LU_MIN_WAGE_LABELS as L,
  LU_MIN_WAGE_META_DESCRIPTION,
  LU_MIN_WAGE_PATH,
  LU_MIN_WAGE_SEO_TITLE,
  LU_MIN_WAGE_SLUG,
  LU_SSM_CURRENT_FROM_LABEL,
} from "@/site/salaire-minimum-luxembourg";

const SLUG = LU_MIN_WAGE_SLUG;
const PATH = LU_MIN_WAGE_PATH;

describe("guide salaire minimum Luxembourg", () => {
  it("est enregistré sur l'URL canonique sans année", () => {
    const guide = getGuideBySlug(SLUG);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(PATH);
    expect(PATH).not.toMatch(/2026|2027/);
    expect(guides.some((entry) => entry.slug === SLUG)).toBe(true);
    expect(existsSync(join(process.cwd(), "src/app/salaire-minimum-luxembourg/page.tsx"))).toBe(
      true,
    );
  });

  it("conserve H1 avec 2026, title et meta sans année", () => {
    const guide = getGuideBySlug(SLUG)!;
    expect(guide.title).toBe(LU_MIN_WAGE_H1);
    expect(guide.title).toContain("2026");
    expect(guide.seoTitle).toBe(LU_MIN_WAGE_SEO_TITLE);
    expect(guide.seoTitle).not.toMatch(/2026|2027/);
    expect(guide.seoTitle?.endsWith("(mis à jour)")).toBe(true);
    expect(guide.description).toBe(LU_MIN_WAGE_META_DESCRIPTION);
    expect(guide.description).not.toMatch(/2026|2027/);
    expect(guide.breadcrumbLabel).toBe("Salaire minimum Luxembourg");
  });

  it("présente le barème de juin, la qualification et le vocabulaire officiel", () => {
    const guide = getGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("salaire social minimum");
    expect(blob).toContain("SMIC luxembourgeois");
    expect(blob).toContain(L.adultUnskilledMonthly);
    expect(blob).toContain(L.adultUnskilledHourly);
    expect(blob).toContain(L.adultSkilledMonthly);
    expect(blob).toContain(LU_SSM_CURRENT_FROM_LABEL);
    expect(blob).toContain("n'est pas automatique dès qu'on a un diplôme");
    expect(blob).toContain("métier effectivement exercé");
    expect(blob).not.toContain("Tout salarié diplômé");
    expect(blob).not.toContain("\u2014");
    expect(guide.introSummary).toBeUndefined();
  });

  it("est indexable, présent au sitemap et au hub, hors menus", () => {
    expect(isPathIndexable(PATH)).toBe(true);
    expect(getAllPublicPages().some((page) => page.path === PATH)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === PATH)).toBe(true);
    expect(getGuideTocGroups(SLUG)).toBeTruthy();
    expect(hubTeaser(SLUG)).toContain("Salaire social minimum au Luxembourg");
    expect(computeReadingTime(getGuideBySlug(SLUG)!)).toBeGreaterThan(8);

    const cover = getGuideCover(SLUG)!;
    expect(cover.src).toBe("/images/covers/guides/salaire-minimum-luxembourg.webp");
    expect(existsSync(join(process.cwd(), "public", cover.src))).toBe(true);
    expect(formatCoverCredit(cover.credit)).toBe("Photo de aboodi vesakaran via Pexels");
    expect(getCoverLicenseUrl(cover.credit)).toBe("https://www.pexels.com/license/");
    expect(cover.alt.toLowerCase()).toContain("drapeau");
    expect(cover.alt.toLowerCase()).toContain("luxembourgeois");
    expect(cover.alt.toLowerCase()).not.toContain("2771");
    expect(cover.alt.toLowerCase()).not.toContain("pexels");

    const navBlob = JSON.stringify(getMainNavItems());
    expect(navBlob).not.toContain(PATH);
    expect(navBlob).not.toContain("Salaire minimum Luxembourg");
    expect(JSON.stringify(smicNavigation)).not.toContain(PATH);
  });

  it("est maillé depuis /smic-europe et renvoie vers les guides utiles", () => {
    const europe = readFileSync(join(process.cwd(), "src/site/smic-europe/data.ts"), "utf8");
    expect(europe).toContain('href: LU_MIN_WAGE_PATH');
    expect(europe).toContain("voir le guide du salaire minimum au Luxembourg");
    expect(europe).toContain(LU_SSM_CURRENT_FROM_LABEL);

    const guide = getGuideBySlug(SLUG)!;
    const links = JSON.stringify(guide);
    expect(links).toContain("/smic-europe");
    expect(links).toContain("Comparer les salaires minimums en Europe");
    expect(links).toContain("/smic");
    expect(links).toContain("/salaire-minimum-allemagne");
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
    expect(types).not.toContain("WebApplication");
    expect(types).not.toContain("Product");
    expect(types).not.toContain("Offer");

    const article = graph["@graph"].find((node) => node["@type"] === "Article")!;
    expect(article.headline).toBe(LU_MIN_WAGE_H1);
    expect(article.description).toBe(LU_MIN_WAGE_META_DESCRIPTION);
    expect(guide.publishedAt).toBe("2026-10-29");
    expect(article.datePublished).toBe("2026-10-29T09:00:00+02:00");

    const crumbs = graph["@graph"].find((node) => node["@type"] === "BreadcrumbList") as {
      itemListElement: Array<{ name: string }>;
    };
    expect(crumbs.itemListElement.map((item) => item.name)).toEqual([
      "Accueil",
      "Salaire minimum Luxembourg",
    ]);

    const toc = buildGuideTocH2(guide).map((entry) => entry.id);
    expect(toc).toContain("montant-actuel");
    expect(toc).toContain("qualification");
    expect(toc).toContain("questions-frequentes");
    expect(toc).toContain("methodologie-sources");
    expect(guide.faq).toHaveLength(10);

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
      "@id": "https://www.brut-vers-net.fr/salaire-minimum-luxembourg#article",
    });
  });

  it("n'utilise pas le convertisseur français et distingue étudiants, net et projet 2027", () => {
    const source = readFileSync(
      join(process.cwd(), "src/site/guides/data/salaire-minimum-luxembourg.ts"),
      "utf8",
    );
    expect(source).toContain("ne doit pas être utilisé pour un salaire luxembourgeois");
    expect(source).not.toMatch(/href:\s*"\/"/);
    expect(source).toContain("conversion théorique sur 52 semaines");
    expect(source).not.toContain("taux × heures hebdomadaires × 52 ÷ 12");
    expect(source).toContain("n'est pas adopté");
    expect(source).toContain("moyenne semestrielle");
    expect(source).toContain("Consulter le guide du salaire minimum en Allemagne");
    expect(source).toContain("Consulter le guide des salaires minimums en Suisse");

    const guide = getGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("Il n'existe pas une seule règle « étudiant »");
    expect(blob).toContain("Contrat d'engagement pendant les vacances");
    expect(blob).toContain("ce n'est pas un contrat de travail");
    expect(blob).toContain("CDD étudiant pendant l'année scolaire");
    expect(blob).toContain("Il n'existe pas de salaire minimum net unique");
    expect(blob).toContain("quelle que soit leur nationalité");
    expect(blob).toContain("projet de loi n° 8837");
    expect(blob).toContain("Ce texte n'est pas adopté, pas publié");
    expect(blob).toContain("Ce n'est pas une hausse annuelle à date fixe");
  });
});
