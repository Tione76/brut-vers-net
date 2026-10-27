import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getGuideBySlug, getGuidePublicPath, guides } from "./registry";
import { buildGuideTocH2, computeReadingTime } from "./utils";
import { buildGuideJsonLd } from "@/site/schema";
import { getGuideTocGroups } from "./toc-groups";
import { getAllPublicPages, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import {
  coverToOgInput,
  formatCoverCredit,
  getGuideCover,
  getGuideCoverByHref,
} from "./covers";
import { getGuideHubTeaser } from "./guides-hub-data";
import { schemaIds } from "@/site/schema/ids";
import {
  SOLDE_CONGES_DESCRIPTION,
  SOLDE_CONGES_H1,
  SOLDE_CONGES_PATH,
  SOLDE_CONGES_SEO_TITLE,
  SOLDE_CONGES_SLUG,
} from "@/site/solde-conges-payes/data";

const SLUG = SOLDE_CONGES_SLUG;
const PATH = SOLDE_CONGES_PATH;

const OFFICIAL_SOURCES = {
  f2258: "https://www.service-public.fr/particuliers/vosdroits/F2258",
  f2262: "https://www.service-public.fr/particuliers/vosdroits/F2262",
  f35697: "https://www.service-public.fr/particuliers/vosdroits/F35697",
  f37482: "https://www.service-public.fr/particuliers/vosdroits/F37482",
  f33927: "https://www.service-public.fr/particuliers/vosdroits/F33927",
  f36509: "https://www.service-public.fr/particuliers/vosdroits/F36509",
  cdtnConges: "https://code.travail.gouv.fr/fiche-service-public/conges-payes",
  l3141_2: "https://code.travail.gouv.fr/code-du-travail/l3141-2",
  l3141_3: "https://code.travail.gouv.fr/code-du-travail/l3141-3",
  l3141_4: "https://code.travail.gouv.fr/code-du-travail/l3141-4",
  l3141_5: "https://code.travail.gouv.fr/code-du-travail/l3141-5",
  l3141_5_1: "https://code.travail.gouv.fr/code-du-travail/l3141-5-1",
  l3141_7: "https://code.travail.gouv.fr/code-du-travail/l3141-7",
  l3141_12: "https://code.travail.gouv.fr/code-du-travail/l3141-12",
  l3141_19_3: "https://code.travail.gouv.fr/code-du-travail/l3141-19-3",
  l3141_29: "https://code.travail.gouv.fr/code-du-travail/l3141-29",
} as const;

const INTERNAL_HREFS = [
  "/conges-payes",
  "/guides/comment-lire-une-fiche-de-paie",
  "/solde-de-tout-compte",
  "/salaire-arret-maladie",
  "/",
] as const;

const REQUIRED_SECTION_IDS = [
  "calcul-solde-conges-payes",
  "simulateur-solde-conges",
  "conges-n-n-1",
  "fiche-de-paie",
  "jours-ouvres-ouvrables",
  "acquisition-conges",
  "exemples-calcul",
  "conges-anticipes",
  "arret-maladie",
  "conges-non-pris",
  "fin-contrat",
  "questions-frequentes",
] as const;

describe("guide solde de congés payés", () => {
  it("est enregistré sur l'URL canonique /solde-conges-payes", () => {
    const guide = getGuideBySlug(SLUG);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(PATH);
    expect(guides.some((item) => item.slug === SLUG)).toBe(true);
    expect(getAllPublicPages().some((page) => page.path === PATH)).toBe(true);
    expect(isPathIndexable(PATH)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === PATH)).toBe(true);
    const sitemap = getSitemapEntries().find((entry) => entry.path === PATH);
    expect(sitemap?.lastModified).toBe("2026-10-27");
  });

  it("conserve H1 avec 2026, title et meta sans année", () => {
    const guide = getGuideBySlug(SLUG)!;
    expect(guide.title).toBe(SOLDE_CONGES_H1);
    expect(guide.title).toContain("2026");
    expect(guide.seoTitle).toBe(SOLDE_CONGES_SEO_TITLE);
    expect(guide.seoTitle).not.toMatch(/2026/);
    expect(guide.seoTitle).toContain("(privé)");
    expect(guide.description).toBe(SOLDE_CONGES_DESCRIPTION);
    expect(guide.description).not.toMatch(/2026/);
    expect(guide.publishedAt).toBe("2026-10-25");
    expect(guide.updatedAt).toBe("2026-10-27");
    expect(guide.breadcrumbLabel).toBe("Solde de congés payés");
  });

  it("affiche le périmètre secteur privé comme le guide /conges-payes", () => {
    const guide = getGuideBySlug(SLUG)!;
    expect(guide.title).toBe(
      "Solde de congés payés 2026 : combien de jours vous reste-t-il ? (privé)",
    );
    expect(guide.seoTitle).toBe("Calculez votre solde de congés payés (privé)");
    expect(guide.description).toContain("dans le privé");
    expect(guide.introduction[0]).toMatch(/^Ce guide vous aide .* salarié du secteur privé\./);
    expect(guide.webApplication?.description).toContain("secteur privé");

    const nav = readFileSync(join(process.cwd(), "src/site/navigation/main-nav-data.ts"), "utf8");
    expect(nav).toContain('label: "Solde de congés payés (privé)"');
    expect(nav).toContain('label: "Congés payés (privé)"');

    const calculator = readFileSync(
      join(process.cwd(), "src/site/solde-conges-payes/SoldeCongesPayesCalculator.tsx"),
      "utf8",
    );
    expect(calculator.match(/Cet outil concerne les salariés du secteur privé\./g)).toHaveLength(1);
  });

  it("structure le sommaire et les ancres demandées", () => {
    const guide = getGuideBySlug(SLUG)!;
    const toc = buildGuideTocH2(guide);
    const ids = toc.map((entry) => entry.id);
    for (const id of REQUIRED_SECTION_IDS) {
      expect(ids).toContain(id);
    }
    expect(ids).toContain("conclusion");
    expect(ids).toContain("methodologie-sources");
    expect(getGuideTocGroups(SLUG)).toBeTruthy();
    expect(computeReadingTime(guide)).toBeGreaterThan(8);
  });

  it("place l'encart de lecture du compteur dans la section calcul, sans doublon", () => {
    const guide = getGuideBySlug(SLUG)!;
    expect(guide.quickSummary).toBeUndefined();
    const isCounterCard = (block: { type: string; id?: string }) =>
      block.type === "illustration" && block.id === "solde-conges-lecture-compteur";
    const sectionsWithCard = guide.sections.filter((section) =>
      (section.blocks ?? []).some(isCounterCard),
    );
    expect(sectionsWithCard.map((section) => section.id)).toEqual(["calcul-solde-conges-payes"]);
    const blocks = sectionsWithCard[0]!.blocks!;
    expect(blocks[0]?.type).toBe("paragraph");
    expect(blocks.findIndex(isCounterCard)).toBe(1);
    const calloutText = blocks
      .flatMap((block) => (block.type === "callout" ? block.paragraphs : []))
      .join(" ");
    expect(calloutText).not.toContain("20 + 2");

    const card = readFileSync(
      join(process.cwd(), "src/site/guides/illustrations/SoldeCongesCompteurIllustration.tsx"),
      "utf8",
    );
    expect(card).toContain("Comment lire un compteur de congés ?");
    expect(card).toContain("ne déduisez");
    expect(card).toContain("jours ouvrables ou");
    expect(card).not.toContain("\u2014");
  });

  it("couvre le périmètre solde sans cannibaliser le guide général", () => {
    const source = readFileSync(
      join(process.cwd(), "src/site/guides/data/solde-conges-payes.ts"),
      "utf8",
    );
    expect(source).toContain("/conges-payes");
    expect(source).toContain("les règles des congés payés dans le secteur privé");
    expect(source).toContain("CP N");
    expect(source).toContain("N-1");
    expect(source).toContain("2,5 jours ouvrables");
    expect(source).toContain("jours ouvrés");
    expect(source).toContain("12 mois complets");
    expect(source).toContain("période de prise");
    expect(source).toContain("L3141-13");
    expect(source).toContain("L3141-8");
    expect(source).toContain("L3141-4");
    expect(source).toContain("quatre semaines ou vingt-quatre jours");
    expect(source).toContain("mois civils complets");
    expect(source).toContain("ne peut pas dépasser 30 jours ouvrables");
    expect(source).toContain("Dans le cas général, le report");
    expect(source).toContain(
      "Dans cet exemple, le samedi est décompté en jours ouvrables",
    );
    expect(source).toContain("/auteur/antoine");
    expect(source).toContain("secteur privé");
    expect(source).not.toContain("fonction publique");
    expect(source).not.toContain("/indemnite-conges-payes");
    expect(source).not.toMatch(/—/);
    for (const href of Object.values(OFFICIAL_SOURCES)) {
      expect(source).toContain(href);
    }
    for (const href of INTERNAL_HREFS) {
      expect(source).toContain(href);
    }
  });

  it("expose page, calculateur, couverture et Schema", () => {
    const pageSource = readFileSync(
      join(process.cwd(), "src/app/solde-conges-payes/page.tsx"),
      "utf8",
    );
    expect(pageSource).toContain("SoldeCongesPayesCalculator");
    expect(pageSource).toContain("sectionSlots");
    expect(pageSource).toContain("SOLDE_CONGES_CALCULATOR_ID");
    expect(SOLDE_CONGES_PATH).toBe("/solde-conges-payes");

    expect(
      existsSync(
        join(process.cwd(), "src/site/solde-conges-payes/SoldeCongesPayesCalculator.tsx"),
      ),
    ).toBe(true);
    expect(
      existsSync(join(process.cwd(), "public/images/covers/guides/solde-conges-payes.webp")),
    ).toBe(true);
    expect(
      existsSync(join(process.cwd(), "public/images/covers/guides/conges-payes.webp")),
    ).toBe(true);

    const cover = getGuideCover(SLUG);
    expect(cover).toBeTruthy();
    expect(cover!.src).toBe("/images/covers/guides/solde-conges-payes.webp");
    expect(cover!.width).toBe(1200);
    expect(cover!.height).toBe(797);
    expect(cover!.alt).toBe(
      "Club de plage vu de haut avec parasols turquoise et blancs, chaises longues rayées bleues et mer turquoise",
    );
    expect(cover!.alt.toLowerCase()).not.toContain("pexels");
    expect(cover!.alt).not.toContain("2026");
    expect(formatCoverCredit(cover!.credit)).toBe(
      "Photo de Helena Jankovičová Kováčová via Pexels",
    );
    expect(cover!.caption).toBe("Photo de Helena Jankovičová Kováčová via Pexels");
    expect(getGuideCoverByHref(PATH)?.src).toBe(cover!.src);
    expect(getGuideCover("conges-payes")?.src).toBe(
      "/images/covers/guides/conges-payes.webp",
    );
    expect(getGuideHubTeaser(SLUG)).toBeTruthy();

    const guide = getGuideBySlug(SLUG)!;
    expect(guide.includeWebApplicationSchema).toBe(true);
    expect(guide.includeFaqSchema).not.toBe(false);

    const jsonLd = buildGuideJsonLd(guide);
    const graph = jsonLd["@graph"] as Record<string, unknown>[];
    expect(graph.some((node) => node["@type"] === "Article")).toBe(true);
    expect(graph.some((node) => node["@type"] === "FAQPage")).toBe(true);
    expect(graph.some((node) => node["@type"] === "WebApplication")).toBe(true);
    expect(graph.some((node) => node["@type"] === "BreadcrumbList")).toBe(true);

    const article = graph.find((node) => node["@type"] === "Article")!;
    expect(article.headline).toBe(SOLDE_CONGES_H1);
    expect(JSON.stringify(article)).toContain(PATH);
    expect(article.image).toEqual({ "@id": schemaIds.primaryImage(PATH) });

    const primaryImage = graph.find(
      (node) => node["@id"] === schemaIds.primaryImage(PATH),
    ) as Record<string, unknown>;
    expect(primaryImage["@type"]).toBe("ImageObject");
    expect(String(primaryImage.url)).toContain("/images/covers/guides/solde-conges-payes.webp");
    expect(String(primaryImage.contentUrl)).toContain(
      "/images/covers/guides/solde-conges-payes.webp",
    );
    expect(primaryImage.width).toBe(1200);
    expect(primaryImage.height).toBe(797);
    expect(primaryImage.caption).toBe(
      "Photo de Helena Jankovičová Kováčová via Pexels",
    );
    expect(primaryImage.creditText).toBe(
      "Photo de Helena Jankovičová Kováčová via Pexels",
    );
    expect(primaryImage.creator).toEqual({
      "@type": "Person",
      name: "Helena Jankovičová Kováčová",
    });

    const webApp = graph.find((node) => node["@type"] === "WebApplication")!;
    expect(webApp["@id"]).toBe(schemaIds.webApplication(PATH));
    expect(String(webApp.description)).toMatch(/fiche de paie|compteurs/i);
    expect(String(webApp.description)).toMatch(/ouvrés/i);
    expect(String(webApp.description)).not.toMatch(
      /estimation partielle en jours ouvrés/i,
    );

    const og = coverToOgInput(cover!);
    expect(og.url).toBe("/images/covers/guides/solde-conges-payes.webp");
    expect(og.width).toBe(1200);
    expect(og.height).toBe(797);
    expect(og.alt).toBe(cover!.alt);
  });
});
