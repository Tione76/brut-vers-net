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
  CH_MIN_WAGE_H1,
  CH_MIN_WAGE_LABELS as L,
  CH_MIN_WAGE_META_DESCRIPTION,
  CH_MIN_WAGE_PATH,
  CH_MIN_WAGE_SEO_TITLE,
  CH_MIN_WAGE_SLUG,
  CH_MIN_WAGE_TERRITORIES as T,
} from "@/site/salaire-minimum-suisse";

const SLUG = CH_MIN_WAGE_SLUG;
const PATH = CH_MIN_WAGE_PATH;

describe("guide salaire minimum Suisse", () => {
  it("est enregistré sur l'URL canonique sans année", () => {
    const guide = getGuideBySlug(SLUG);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(PATH);
    expect(PATH).not.toMatch(/2026|2027/);
    expect(guides.some((entry) => entry.slug === SLUG)).toBe(true);
    expect(existsSync(join(process.cwd(), "src/app/salaire-minimum-suisse/page.tsx"))).toBe(
      true,
    );
  });

  it("conserve H1 avec 2026, title et meta sans année", () => {
    const guide = getGuideBySlug(SLUG)!;
    expect(guide.title).toBe(CH_MIN_WAGE_H1);
    expect(guide.title).toContain("2026");
    expect(guide.seoTitle).toBe(CH_MIN_WAGE_SEO_TITLE);
    expect(guide.seoTitle).not.toMatch(/2026|2027/);
    expect(guide.seoTitle?.endsWith("(mis à jour)")).toBe(true);
    expect(guide.description).toBe(CH_MIN_WAGE_META_DESCRIPTION);
    expect(guide.description).not.toMatch(/2026|2027/);
    expect(guide.breadcrumbLabel).toBe("Salaire minimum Suisse");
  });

  it("affirme l'absence de minimum national et refuse le SMIC genevois universel", () => {
    const guide = getGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("pas de salaire minimum national unique");
    expect(blob).toContain("ce n'est pas le nom d'un dispositif national suisse");
    expect(blob).toContain(L.geneveHourlyShort);
    expect(blob).toContain(L.tessinRange);
    expect(blob).toContain("Fourchette par secteur NOGA");
    expect(blob).not.toContain("SMIC suisse unique");
    expect(blob).toContain("Il ne faut pas « prendre toujours le plus élevé »");
    expect(blob).not.toContain("\u2014");
    expect(guide.introSummary).toBeUndefined();
  });

  it("distingue canton, commune, actuel, futur et non encore applicable", () => {
    const guide = getGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(T.lucerneVille.kind).toBe("city");
    expect(T.lucerneVille.status).toBe("in-force");
    expect(T.zurichVille.status).toBe("adopted-not-in-force");
    expect(T.winterthour.status).toBe("adopted-not-in-force");
    expect(blob).toContain("Ville, pas le canton de Lucerne");
    expect(blob).toContain("Adopté, pas encore en vigueur");
    expect(blob).toContain("pas encore applicable");
    expect(blob).toContain("Aucun taux cantonal n'est exigible");
    expect(blob).toContain("Bâle-Ville et Bâle-Campagne");
    expect(blob).not.toMatch(/["']0(?:[.,]00)? CHF/);
  });

  it("est indexable, présent au sitemap et au hub, hors menus", () => {
    expect(isPathIndexable(PATH)).toBe(true);
    expect(getAllPublicPages().some((page) => page.path === PATH)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === PATH)).toBe(true);
    expect(getGuideTocGroups(SLUG)).toBeTruthy();
    expect(hubTeaser(SLUG)).toContain("pas de taux national");
    expect(computeReadingTime(getGuideBySlug(SLUG)!)).toBeGreaterThan(8);

    const cover = getGuideCover(SLUG)!;
    expect(cover.src).toBe("/images/covers/guides/salaire-minimum-suisse.webp");
    expect(existsSync(join(process.cwd(), "public", cover.src))).toBe(true);
    expect(formatCoverCredit(cover.credit)).toBe("Photo de Tommy (Teeeins) via Pexels");
    expect(getCoverLicenseUrl(cover.credit)).toBe("https://www.pexels.com/license/");
    expect(cover.alt.toLowerCase()).toContain("drapeau");
    expect(cover.alt.toLowerCase()).toContain("lac");
    expect(cover.alt.toLowerCase()).not.toContain("24,59");
    expect(cover.alt.toLowerCase()).not.toContain("pexels");
    expect(cover.credit.acquireLicensePage).toBeUndefined();

    const navBlob = JSON.stringify(getMainNavItems());
    expect(navBlob).not.toContain(PATH);
    expect(navBlob).not.toContain("Salaire minimum Suisse");
    expect(JSON.stringify(smicNavigation)).not.toContain(PATH);
  });

  it("est maillé depuis /smic-europe et renvoie vers /smic-europe", () => {
    const europe = readFileSync(
      join(process.cwd(), "src/site/smic-europe/data.ts"),
      "utf8",
    );
    expect(europe).toContain('href: "/salaire-minimum-suisse"');
    expect(europe).toContain("comprendre les salaires minimums en Suisse");
    expect(europe).toContain("Pas de salaire minimum national (fédéral)");

    const guide = getGuideBySlug(SLUG)!;
    const links = JSON.stringify(guide);
    expect(links).toContain("/smic-europe");
    expect(links).toContain("Comparer les salaires minimums en Europe");
    expect(links).toContain("/smic");
    expect(links).toContain("/salaire-minimum-allemagne");
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
    expect(article.headline).toBe(CH_MIN_WAGE_H1);
    expect(article.description).toBe(CH_MIN_WAGE_META_DESCRIPTION);

    const crumbs = graph["@graph"].find((node) => node["@type"] === "BreadcrumbList") as {
      itemListElement: Array<{ name: string }>;
    };
    expect(crumbs.itemListElement.map((item) => item.name)).toEqual([
      "Accueil",
      "Salaire minimum Suisse",
    ]);

    const toc = buildGuideTocH2(guide).map((entry) => entry.id);
    expect(toc).toContain("existe-t-il-un-smic");
    expect(toc).toContain("montants-cantonaux");
    expect(toc).toContain("geneve");
    expect(toc).toContain("questions-frequentes");
    expect(toc).toContain("methodologie-sources");

    const webPage = graph["@graph"].find((node) => node["@type"] === "WebPage");
    expect(webPage?.about).toBeUndefined();
    expect(webPage?.mainEntity).toEqual({
      "@id": "https://www.brut-vers-net.fr/salaire-minimum-suisse#article",
    });
  });

  it("n'utilise pas le convertisseur brut-net français pour la Suisse", () => {
    const source = readFileSync(
      join(process.cwd(), "src/site/guides/data/salaire-minimum-suisse.ts"),
      "utf8",
    );
    expect(source).toContain("ne s'applique pas à un salaire suisse");
    expect(source).not.toMatch(/href:\s*"\/"/);
    expect(source).toContain("taux × heures × 52 ÷ 12");
    expect(source).toContain("part du 13e");
  });

  it("précise le versement mensuel, les outils SECO et le statut tessinois 2027", () => {
    const guide = getGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("Période d'application");
    expect(blob).toContain("Du 1er janvier au 31 décembre 2026");
    expect(blob).toContain("décret exécutif du Conseil d'État du 7 octobre 2026");
    expect(blob).toContain("ne peut pas être compensée librement par une prime annuelle");
    expect(blob).toContain("ne permet pas de compenser un salaire inférieur au minimum pendant les autres mois");
    expect(blob).toContain("Recherche des salaires minimaux obligatoires");
    expect(blob).toContain("estimation statistique");
    expect(blob).toContain("Il n'existe pas de salaire minimum net national unique");
    expect(blob).toContain("nous vérifions le texte, sa date et les informations de l'autorité compétente");
    expect(blob).not.toContain("appréciation annuelle");
    expect(blob).not.toContain("En cas de divergence, la source locale l'emporte");
  });

  it("présente la réforme fédérale comme non entrée en vigueur et distingue Zurich, Lucerne et les jobs d'été", () => {
    const guide = getGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("Réforme fédérale : une évolution à suivre");
    expect(blob).toContain("n'est donc pas entrée en vigueur");
    expect(blob).toContain("sa date n'était pas encore fixée");
    expect(blob).not.toContain("Les CCT priment désormais partout");
    expect(blob).toContain("préavis d'au moins six mois");
    expect(blob).toContain("Ce maintien n'est pas une garantie définitive");
    expect(blob).toContain("75 % du salaire minimum ordinaire");
    expect(blob).toContain("18,44 CHF");
    expect(blob).toContain("60 jours par année civile");
    expect(blob).toContain("Les montants officiels sont repris tels quels");
    expect(blob).toContain("Les CCT étendues primeront-elles sur les minimums cantonaux");
    expect(guide.faq?.some((item) => item.answer.includes("n'est pas entrée en vigueur"))).toBe(
      true,
    );
  });
});
