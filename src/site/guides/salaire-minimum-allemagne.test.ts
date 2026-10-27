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
import {
  DE_MIN_WAGE_CURRENT_FROM_LABEL,
  DE_MIN_WAGE_H1,
  DE_MIN_WAGE_LABELS,
  DE_MIN_WAGE_META_DESCRIPTION,
  DE_MIN_WAGE_NEXT_FROM_LABEL,
  DE_MIN_WAGE_PATH,
  DE_MIN_WAGE_SEO_TITLE,
  DE_MIN_WAGE_SLUG,
} from "@/site/salaire-minimum-allemagne";

const SLUG = DE_MIN_WAGE_SLUG;
const PATH = DE_MIN_WAGE_PATH;

describe("guide salaire minimum Allemagne", () => {
  it("est enregistré sur l'URL canonique sans année", () => {
    const guide = getGuideBySlug(SLUG);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(PATH);
    expect(PATH).not.toMatch(/2026|2027/);
    expect(guides.some((entry) => entry.slug === SLUG)).toBe(true);
    expect(existsSync(join(process.cwd(), "src/app/salaire-minimum-allemagne/page.tsx"))).toBe(
      true,
    );
  });

  it("conserve H1 avec 2026, title et meta sans année", () => {
    const guide = getGuideBySlug(SLUG)!;
    expect(guide.title).toBe(DE_MIN_WAGE_H1);
    expect(guide.title).toContain("2026");
    expect(guide.seoTitle).toBe(DE_MIN_WAGE_SEO_TITLE);
    expect(guide.seoTitle).not.toMatch(/2026|2027/);
    expect(guide.seoTitle?.endsWith("(mis à jour)")).toBe(true);
    expect(guide.description).toBe(DE_MIN_WAGE_META_DESCRIPTION);
    expect(guide.description).not.toMatch(/2026|2027/);
    expect(guide.breadcrumbLabel).toBe("Salaire minimum Allemagne");
  });

  it("distingue montant actuel et montant futur", () => {
    const guide = getGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain(DE_MIN_WAGE_LABELS.currentHourlyShort);
    expect(blob).toContain(DE_MIN_WAGE_LABELS.nextHourlyShort);
    expect(blob).toContain(DE_MIN_WAGE_CURRENT_FROM_LABEL);
    expect(blob).toContain(DE_MIN_WAGE_NEXT_FROM_LABEL);
    expect(blob).toContain("pas encore applicable");
    expect(blob).toContain(DE_MIN_WAGE_LABELS.monthly35);
    expect(blob).toContain(DE_MIN_WAGE_LABELS.monthly40);
    expect(blob).not.toContain("\u2014");
  });

  it("est indexable, présent au sitemap et au hub, hors menu principal", () => {
    expect(isPathIndexable(PATH)).toBe(true);
    expect(getAllPublicPages().some((page) => page.path === PATH)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === PATH)).toBe(true);
    expect(getGuideTocGroups(SLUG)).toBeTruthy();
    expect(computeReadingTime(getGuideBySlug(SLUG)!)).toBeGreaterThan(6);

    const cover = getGuideCover(SLUG)!;
    expect(cover.src).toBe("/images/covers/guides/salaire-minimum-allemagne.webp");
    expect(existsSync(join(process.cwd(), "public", cover.src))).toBe(true);
    expect(formatCoverCredit(cover.credit)).toBe("Photo de Niklas Jeromin via Pexels");
    expect(getCoverLicenseUrl(cover.credit)).toBe("https://www.pexels.com/license/");
    expect(cover.alt.toLowerCase()).toContain("drapeau");
    expect(cover.alt.toLowerCase()).toContain("reichstag");
    expect(cover.credit.acquireLicensePage).toBeUndefined();
    expect(computeReadingTime(getGuideBySlug(SLUG)!)).toBeGreaterThan(6);

    const navBlob = JSON.stringify(getMainNavItems());
    expect(navBlob).not.toContain(PATH);
    expect(navBlob).not.toContain("Salaire minimum Allemagne");
  });

  it("est maillé depuis /smic-europe et renvoie vers /smic-europe", () => {
    const europe = readFileSync(
      join(process.cwd(), "src/site/smic-europe/data.ts"),
      "utf8",
    );
    expect(europe).toContain('href: "/salaire-minimum-allemagne"');
    expect(europe).toContain("voir le guide du salaire minimum en Allemagne");

    const guide = getGuideBySlug(SLUG)!;
    const links = JSON.stringify(guide);
    expect(links).toContain("/smic-europe");
    expect(links).toContain("Comparer les salaires minimums en Europe");
    expect(links).toContain("/smic");
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

    const article = graph["@graph"].find((node) => node["@type"] === "Article")!;
    expect(article.headline).toBe(DE_MIN_WAGE_H1);
    expect(article.description).toBe(DE_MIN_WAGE_META_DESCRIPTION);

    const crumbs = graph["@graph"].find((node) => node["@type"] === "BreadcrumbList") as {
      itemListElement: Array<{ name: string }>;
    };
    expect(crumbs.itemListElement.map((item) => item.name)).toEqual([
      "Accueil",
      "Salaire minimum Allemagne",
    ]);

    const toc = buildGuideTocH2(guide).map((entry) => entry.id);
    expect(toc).toContain("montant-horaire");
    expect(toc).toContain("equivalent-mensuel");
    expect(toc).toContain("questions-frequentes");
    expect(toc).toContain("methodologie-sources");
  });

  it("n'utilise pas le convertisseur brut-net français pour l'Allemagne", () => {
    const source = readFileSync(
      join(process.cwd(), "src/site/guides/data/salaire-minimum-allemagne.ts"),
      "utf8",
    );
    expect(source).toContain("ne doit pas servir à estimer le net");
    expect(source).not.toMatch(/href:\s*"\/"/);
  });

  it("corrige minijob, chômage de longue durée, Eurostat et typographie", () => {
    const guide = getGuideBySlug(SLUG)!;
    expect(guide.introSummary).toBeUndefined();
    const blob = JSON.stringify(guide);
    expect(blob).toContain("immédiatement avant");
    expect(blob).toContain("ne fait pas automatiquement perdre le statut");
    expect(blob).toContain("par rapport au SMIC français");
    expect(blob).toContain("un plancher national");
    expect(blob).toContain("38,8");
    expect(blob).toContain("4,345");
    expect(blob).not.toContain("vs SMIC");
    expect(blob).not.toContain("une plancher");
    expect(blob).not.toContain("Depuis juillet 2025");
    expect(blob).not.toContain("régime social n'est plus celui du minijob");
    expect(blob).toContain(DE_MIN_WAGE_LABELS.frMonthly35);
  });

  it("clarifie comparaison FR, minimum général et lien BMAS branches", () => {
    const guide = getGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("SMIC allemand");
    expect(blob).toContain("gesetzlicher Mindestlohn");
    expect(blob).toContain("estimation mensuelle, car son minimum légal est fixé à l'heure");
    expect(blob).not.toContain("ne sont pas calculés exactement de la même façon");
    expect(blob).toContain("salaire minimum légal général est de");
    expect(blob).not.toContain("Seul 13,90");
    expect(blob).not.toContain("Seul 13\u202f90");
    expect(blob).toContain("Branchenmindestlohn");
    expect(blob).toContain("Ce que ce guide ne permet pas de calculer");
    expect(blob).not.toContain("Hors périmètre de cette page");
    expect(blob).toContain("nomenclature européenne NACE");
  });

  it("expose les métadonnées Eurostat en lien direct et omet WebPage.about organisation", () => {
    const guide = getGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain(
      "https://ec.europa.eu/eurostat/cache/metadata/EN/earn_minw_esms.htm",
    );
    expect(blob).toContain("conversion mensuelle allemande");

    const graph = buildGuideJsonLd(guide) as {
      "@graph": Array<Record<string, unknown>>;
    };
    const webPage = graph["@graph"].find((node) => node["@type"] === "WebPage");
    expect(webPage?.about).toBeUndefined();
    expect(webPage?.mainEntity).toEqual({
      "@id": "https://www.brut-vers-net.fr/salaire-minimum-allemagne#article",
    });
  });
});
