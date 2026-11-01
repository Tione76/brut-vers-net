import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getGuideBySlug, getGuidePublicPath, guides } from "./registry";
import { buildGuideTocH2, computeReadingTime } from "./utils";
import { buildGuideJsonLd } from "@/site/schema";
import { getGuideTocGroups } from "./toc-groups";
import { getAllPublicPages, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import { coverToOgInput, formatCoverCredit, getGuideCover, getCoverLicenseUrl } from "./covers";
import { getGuideHubTeaser } from "./guides-hub-data";
import { getMainNavItems } from "@/site/navigation/main-nav-data";
import { smicNavigation } from "@/site/navigation/smic";
import { buildSearchIndex } from "@/site/navigation/site-search-index";
import {
  MC_MIN_WAGE_H1,
  MC_MIN_WAGE_LABELS as L,
  MC_MIN_WAGE_META_DESCRIPTION,
  MC_MIN_WAGE_PATH,
  MC_MIN_WAGE_PUBLISHED_AT,
  MC_MIN_WAGE_SEO_TITLE,
  MC_MIN_WAGE_SLUG,
  MC_MIN_WAGE_UPDATED_AT,
  MC_SMIC_CURRENT_FROM_LABEL,
} from "@/site/salaire-minimum-monaco";

const SLUG = MC_MIN_WAGE_SLUG;
const PATH = MC_MIN_WAGE_PATH;

describe("guide salaire minimum Monaco", () => {
  it("est enregistré sur l'URL canonique sans année", () => {
    const guide = getGuideBySlug(SLUG);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(PATH);
    expect(PATH).not.toMatch(/2026|2027/);
    expect(guides.some((entry) => entry.slug === SLUG)).toBe(true);
    expect(existsSync(join(process.cwd(), "src/app/salaire-minimum-monaco/page.tsx"))).toBe(true);
  });

  it("conserve H1 avec 2026, title et meta sans année", () => {
    const guide = getGuideBySlug(SLUG)!;
    expect(guide.title).toBe(MC_MIN_WAGE_H1);
    expect(guide.title).toContain("2026");
    expect(guide.seoTitle).toBe(MC_MIN_WAGE_SEO_TITLE);
    expect(guide.seoTitle).not.toMatch(/2026|2027/);
    expect(guide.description).toBe(MC_MIN_WAGE_META_DESCRIPTION);
    expect(guide.description).not.toMatch(/2026|2027/);
    expect(guide.breadcrumbLabel).toBe("Salaire minimum Monaco");
  });

  it("distingue base, indemnité de 5 % et absence de net unique", () => {
    const guide = getGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("SMIC");
    expect(blob).toContain(L.hourly);
    expect(blob).toContain(L.monthly);
    expect(blob).toContain(L.indemnity);
    expect(blob).toContain(L.totalBeforeDeductions);
    expect(blob).toContain(MC_SMIC_CURRENT_FROM_LABEL);
    expect(blob).toContain("avant cotisations applicables et avant impôt");
    expect(blob).toContain("n'est pas un salaire net");
    expect(blob).toContain("0,78, 0,75 ou 0,81 ne s'appliquent pas");
    expect(blob).not.toContain("\u2014");
    expect(guide.introSummary).toBeUndefined();
    expect(guide.quickSummary).toBeUndefined();
  });

  it("est indexable, présent au sitemap et au hub, hors menus", () => {
    expect(isPathIndexable(PATH)).toBe(true);
    expect(getAllPublicPages().some((page) => page.path === PATH)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === PATH)).toBe(true);
    expect(getGuideTocGroups(SLUG)).toBeTruthy();
    expect(getGuideHubTeaser(SLUG)).toContain("Salaire minimum à Monaco");
    expect(computeReadingTime(getGuideBySlug(SLUG)!)).toBeGreaterThan(8);

    const cover = getGuideCover(SLUG)!;
    expect(cover.src).toBe("/images/covers/guides/salaire-minimum-monaco.webp");
    expect(existsSync(join(process.cwd(), "public", cover.src))).toBe(true);
    expect(formatCoverCredit(cover.credit)).toBe("Photo recadrée de Francesco Querente via Pexels");
    expect(cover.credit.photographer).toBe("Francesco Querente");
    expect(cover.credit.acquireLicensePage).toBeUndefined();
    expect(getCoverLicenseUrl(cover.credit)).toBe("https://www.pexels.com/license/");
    expect(cover.alt.toLowerCase()).toContain("drapeau");
    expect(cover.alt.toLowerCase()).toContain("monégasque");
    expect(cover.alt.toLowerCase()).not.toContain("pexels");

    const navBlob = JSON.stringify(getMainNavItems());
    expect(navBlob).not.toContain(PATH);
    expect(navBlob).not.toContain("Salaire minimum Monaco");
    expect(JSON.stringify(smicNavigation)).not.toContain(PATH);
    expect(buildSearchIndex().some((entry) => entry.href === PATH)).toBe(true);
  });

  it("est maillé depuis /smic-europe et renvoie vers les guides utiles", () => {
    const europe = readFileSync(join(process.cwd(), "src/site/smic-europe/data.ts"), "utf8");
    expect(europe).toContain("href: MC_MIN_WAGE_PATH");
    expect(europe).toContain("voir le guide du salaire minimum à Monaco");
    const mcCard = europe.slice(europe.indexOf('code: "MC"'), europe.indexOf('code: "ME"'));
    expect(mcCard).not.toMatch(/eurostatMonthlyEur/);

    const guide = getGuideBySlug(SLUG)!;
    const links = JSON.stringify(guide);
    expect(links).toContain("/smic-europe");
    expect(links).toContain("/smic");
    expect(links).toContain("/salaire-minimum-italie");
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
    expect(types).toContain("WebPage");
    expect(types).not.toContain("WebApplication");
    expect(types).not.toContain("Product");
    expect(types).not.toContain("Offer");
    expect(types).not.toContain("AggregateRating");

    const article = graph["@graph"].find((node) => node["@type"] === "Article")!;
    expect(article.headline).toBe(MC_MIN_WAGE_H1);
    expect(article.description).toBe(MC_MIN_WAGE_META_DESCRIPTION);
    expect(guide.publishedAt).toBe(MC_MIN_WAGE_PUBLISHED_AT);
    expect(article.datePublished).toBe(MC_MIN_WAGE_PUBLISHED_AT);
    expect(article.dateModified).toBe(MC_MIN_WAGE_UPDATED_AT);

    const crumbs = graph["@graph"].find((node) => node["@type"] === "BreadcrumbList") as {
      itemListElement: Array<{ name: string }>;
    };
    expect(crumbs.itemListElement.map((item) => item.name)).toEqual([
      "Accueil",
      "Salaire minimum Monaco",
    ]);

    const toc = buildGuideTocH2(guide).map((entry) => entry.id);
    expect(toc).toEqual([
      "montant-actuel",
      "indemnite-5-pourcent",
      "39-heures",
      "salaire-minimum-net",
      "minimum-professionnel",
      "temps-partiel-heures-supplementaires",
      "jeunes-apprentis",
      "revalorisation",
      "france-monaco",
      "frontaliers-france",
      "verifier-bulletin",
      "recours",
      "questions-frequentes",
      "methodologie-sources",
      "conclusion",
    ]);
    expect(guide.faq).toHaveLength(12);
    expect(guide.conclusion.title).toBe("À retenir");
    expect(guide.updatedAt).toBe(MC_MIN_WAGE_UPDATED_AT);

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
      "@id": "https://www.brut-vers-net.fr/salaire-minimum-monaco#article",
    });

    const cover = getGuideCover(SLUG)!;
    const og = coverToOgInput(cover);
    expect(og.url).toBe("/images/covers/guides/salaire-minimum-monaco.webp");
    expect(og.type).toBe("image/webp");
    const coverImage = graph["@graph"].find(
      (node) =>
        node["@type"] === "ImageObject" &&
        String(node.url ?? node.contentUrl ?? "").includes("salaire-minimum-monaco.webp"),
    ) as Record<string, unknown> | undefined;
    expect(coverImage?.encodingFormat).toBe("image/webp");
    expect(coverImage?.creditText).toBe("Photo recadrée de Francesco Querente via Pexels");
    expect(coverImage?.creator).toEqual({ "@type": "Person", name: "Francesco Querente" });
  });

  it("ne présente pas les 5 % comme un net ni les 36-39 h comme des heures supplémentaires françaises", () => {
    const source = readFileSync(
      join(process.cwd(), "src/site/guides/data/salaire-minimum-monaco.ts"),
      "utf8",
    );
    expect(source).not.toContain("Date.now");
    expect(source).not.toContain("173 heures");
    expect(source).toContain("indemnité exceptionnelle de 5 %");
    expect(source).toContain("ne sont pas des heures supplémentaires");

    const guide = getGuideBySlug(SLUG)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("pas un salaire net");
    expect(blob).toContain("Un SMIC net unique n'est pas publié ici");
    expect(blob).not.toContain("Plus de 18 ans");
    expect(blob).toContain("18 ans et plus");
    expect(blob).toContain("indemnité de 5 % comprise");
    const faqNet = guide.faq!.find((item) => item.question.includes("SMIC net"))!;
    expect(faqNet.answer).toContain("pas de net unique");
    const faqFr = guide.faq!.find((item) => item.question.includes("différent de celui de la France"))!;
    expect(faqFr.answer).toContain("différence entre les bases mensuelles vient de la durée");
    expect(faqFr.answer).toContain("s'ajoute séparément");
  });
});
