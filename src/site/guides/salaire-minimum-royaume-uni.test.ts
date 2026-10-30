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
  UK_MIN_WAGE_H1,
  UK_MIN_WAGE_LABELS as L,
  UK_MIN_WAGE_META_DESCRIPTION,
  UK_MIN_WAGE_PATH,
  UK_MIN_WAGE_SEO_TITLE,
  UK_MIN_WAGE_SLUG,
  UK_NMW_EFFECTS_FROM_LABEL,
} from "@/site/salaire-minimum-royaume-uni";

const SLUG = UK_MIN_WAGE_SLUG;
const PATH = UK_MIN_WAGE_PATH;

describe("guide salaire minimum Royaume-Uni", () => {
  it("est enregistré sur l'URL canonique sans année", () => {
    const guide = getGuideBySlug(SLUG);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(PATH);
    expect(PATH).not.toMatch(/2026|2027/);
    expect(guides.some((entry) => entry.slug === SLUG)).toBe(true);
    expect(existsSync(join(process.cwd(), "src/app/salaire-minimum-royaume-uni/page.tsx"))).toBe(
      true,
    );
  });

  it("conserve H1 avec 2026, title et meta sans année", () => {
    const guide = getGuideBySlug(SLUG)!;
    expect(guide.title).toBe(UK_MIN_WAGE_H1);
    expect(guide.title).toContain("2026");
    expect(guide.seoTitle).toBe(UK_MIN_WAGE_SEO_TITLE);
    expect(guide.seoTitle).not.toMatch(/2026|2027/);
    expect(guide.seoTitle?.endsWith("(mis à jour)")).toBe(true);
    expect(guide.description).toBe(UK_MIN_WAGE_META_DESCRIPTION);
    expect(guide.description).not.toMatch(/2026|2027/);
    expect(guide.breadcrumbLabel).toBe("Salaire minimum Royaume-Uni");
  });

  it("présente le National Living Wage, les taux par âge et le vocabulaire officiel", () => {
    const guide = getGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("National Living Wage");
    expect(blob).toContain("National Minimum Wage");
    expect(blob).toContain("SMIC anglais");
    expect(blob).toContain(L.nlw);
    expect(blob).toContain(L.youth);
    expect(blob).toContain(L.apprentice);
    expect(blob).toContain(L.monthly375);
    expect(blob).toContain(UK_NMW_EFFECTS_FROM_LABEL);
    expect(blob).toContain("il n'existe pas de montant mensuel unique");
    expect(blob).not.toContain("\u2014");
    expect(guide.introSummary).toBeUndefined();
  });

  it("est indexable, présent au sitemap et au hub, hors menus", () => {
    expect(isPathIndexable(PATH)).toBe(true);
    expect(getAllPublicPages().some((page) => page.path === PATH)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === PATH)).toBe(true);
    expect(getGuideTocGroups(SLUG)).toBeTruthy();
    expect(getGuideHubTeaser(SLUG)).toContain("Salaire minimum au Royaume-Uni");
    expect(computeReadingTime(getGuideBySlug(SLUG)!)).toBeGreaterThan(8);

    const cover = getGuideCover(SLUG)!;
    expect(cover.src).toBe("/images/covers/guides/salaire-minimum-royaume-uni.webp");
    expect(existsSync(join(process.cwd(), "public", cover.src))).toBe(true);
    expect(formatCoverCredit(cover.credit)).toBe(
      "Photo de Oskar Młodziński via Pexels",
    );
    expect(cover.credit.photographer).toBe("Oskar Młodziński");
    expect(getCoverLicenseUrl(cover.credit)).toBe("https://www.pexels.com/license/");
    expect(cover.alt.toLowerCase()).toContain("union jack");
    expect(cover.alt.toLowerCase()).not.toContain("saint-georges");
    expect(cover.alt.toLowerCase()).not.toContain("drapeau anglais");
    expect(cover.alt.toLowerCase()).not.toContain("pexels");

    const navBlob = JSON.stringify(getMainNavItems());
    expect(navBlob).not.toContain(PATH);
    expect(navBlob).not.toContain("Salaire minimum Royaume-Uni");
    expect(JSON.stringify(smicNavigation)).not.toContain(PATH);
    expect(buildSearchIndex().some((entry) => entry.href === PATH)).toBe(true);
  });

  it("est maillé depuis /smic-europe et renvoie vers les guides utiles", () => {
    const europe = readFileSync(join(process.cwd(), "src/site/smic-europe/data.ts"), "utf8");
    expect(europe).toContain("href: UK_MIN_WAGE_PATH");
    expect(europe).toContain("voir le guide du salaire minimum au Royaume-Uni");
    expect(europe).toContain("12,71 £");
    expect(europe).toContain("earn_mw_cur 2026-S2");

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
    expect(article.headline).toBe(UK_MIN_WAGE_H1);
    expect(article.description).toBe(UK_MIN_WAGE_META_DESCRIPTION);
    expect(guide.publishedAt).toBe("2026-10-30T00:00:00+01:00");
    expect(article.datePublished).toBe("2026-10-30T00:00:00+01:00");
    expect(article.dateModified).toBe("2026-10-30T00:00:00+01:00");

    const crumbs = graph["@graph"].find((node) => node["@type"] === "BreadcrumbList") as {
      itemListElement: Array<{ name: string }>;
    };
    expect(crumbs.itemListElement.map((item) => item.name)).toEqual([
      "Accueil",
      "Salaire minimum Royaume-Uni",
    ]);

    const toc = buildGuideTocH2(guide).map((entry) => entry.id);
    expect(toc).toContain("montant-actuel");
    expect(toc).toContain("bareme-age");
    expect(toc).toContain("londres-living-wage");
    expect(toc).toContain("questions-frequentes");
    expect(toc).toContain("methodologie-sources");
    expect(toc).toContain("conclusion");
    expect(guide.faq).toHaveLength(13);
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
      "@id": "https://www.brut-vers-net.fr/salaire-minimum-royaume-uni#article",
    });
  });

  it("distingue légal, volontaire, net, 2027 et territoires", () => {
    const source = readFileSync(
      join(process.cwd(), "src/site/guides/data/salaire-minimum-royaume-uni.ts"),
      "utf8",
    );
    expect(source).toContain("ne s'applique pas à une paie britannique");
    expect(source).not.toMatch(/href:\s*"\/"/);
    expect(source).not.toContain("173 heures");
    expect(source).not.toContain("quatorze versements");
    expect(source).not.toContain("RMMMG");
    expect(source).toContain("Jersey");
    expect(source).toContain("Living Wage Foundation");
    expect(source).toContain("Fair Work Agency");
    expect(source).toContain("pas le taux déjà applicable");

    const guide = getGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("pas un minimum mensuel publié");
    expect(blob).toContain("Il n'existe pas de minimum net unique");
    expect(blob).toContain("passeport français ne suffit pas");
    expect(blob).toContain(L.announced2027Nlw);
    expect(blob).toContain(L.rlwLondon);
    expect(blob).toContain("Tous les employeurs londoniens n'y sont pas légalement tenus");
    const faq2027 = guide.faq!.find((item) => item.question === "Que prévoit avril 2027 ?")!;
    expect(faq2027.answer).toContain("pas le taux déjà applicable");
    expect(blob).not.toContain("Date.now");
  });

  it("corrige apprentis, pourboires, congés, conversions et crédit photo", () => {
    const guide = getGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("âge légal de fin de scolarité obligatoire");
    expect(blob).not.toContain("ayant quitté la scolarité obligatoire");
    expect(blob).not.toContain("gratifications");
    expect(blob).not.toContain("le taux de l'âge");
    expect(blob).not.toContain("Le The National Minimum Wage");
    expect(blob).toContain("En Angleterre, le salaire minimum légal suit le même barème");
    expect(blob).toContain("au plus tard le 1er mai 2027");
    expect(blob).toContain("pas le taux versé en argent");
    expect(blob).toContain("Grande-Bretagne (Angleterre, Écosse et pays de Galles)");
    expect(blob).toContain("nidirect");
    expect(blob).toContain(L.nlwEur);
    expect(blob).toContain(L.hourlyPctVsFr);
    expect(blob).toContain(L.monthly35Eur);
    expect(L.nlwEur).toContain("15,21");
    expect(L.hourlyPctVsFr).toContain("23,5");
    expect(L.monthly35Eur.replace(/\u202f|\u00a0/g, " ")).toBe("2 306,45 €");

    const apprenticeFaq = guide.faq!.find((item) => item.question === "Quel taux pour un apprenti ?")!;
    expect(apprenticeFaq.answer).toContain("ne bascule pas automatiquement");
    expect(apprenticeFaq.answer).toContain("19 ans");
    expect(apprenticeFaq.answer).not.toContain("le taux de l'âge");

    const tipsFaq = guide.faq!.find((item) => item.question === "Les pourboires comptent-ils ?")!;
    expect(tipsFaq.answer).not.toContain("gratifications");
    expect(tipsFaq.answer).toContain("primes de performance");
    expect(tipsFaq.answer).toContain("règles de calcul et de période");

    const londonFaq = guide.faq!.find(
      (item) => item.question === "Le minimum est-il différent à Londres ?",
    )!;
    expect(londonFaq.answer).toContain("au plus tard le 1er mai 2027");
    expect(londonFaq.answer).toContain("légalement tenus");

    const graph = JSON.stringify(buildGuideJsonLd(guide));
    expect(graph).toContain("Oskar Młodziński");
    expect(graph).toContain("Photo de Oskar Młodziński via Pexels");
    expect(graph).not.toContain("Boys in Bristol");
  });
});
