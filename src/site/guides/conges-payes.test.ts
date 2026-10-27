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

const SLUG = "conges-payes";
const PATH = "/conges-payes";

const OFFICIAL_SOURCES = {
  f2258: "https://www.service-public.fr/particuliers/vosdroits/F2258",
  f682: "https://www.service-public.fr/particuliers/vosdroits/F682",
  f35697: "https://www.service-public.fr/particuliers/vosdroits/F35697",
  f37482: "https://www.service-public.fr/particuliers/vosdroits/F37482",
  f12803: "https://www.service-public.fr/particuliers/vosdroits/F12803",
  cdtnConges: "https://code.travail.gouv.fr/fiche-service-public/conges-payes",
  l3141_3: "https://code.travail.gouv.fr/code-du-travail/l3141-3",
  l3141_12: "https://code.travail.gouv.fr/code-du-travail/l3141-12",
  l3141_16: "https://code.travail.gouv.fr/code-du-travail/l3141-16",
  l3141_14: "https://code.travail.gouv.fr/code-du-travail/l3141-14",
  l3141_17: "https://code.travail.gouv.fr/code-du-travail/l3141-17",
  l3141_19: "https://code.travail.gouv.fr/code-du-travail/l3141-19",
  l3141_19_3: "https://code.travail.gouv.fr/code-du-travail/l3141-19-3",
  l3141_29: "https://code.travail.gouv.fr/code-du-travail/l3141-29",
  f33927: "https://www.service-public.fr/particuliers/vosdroits/F33927",
  report:
    "https://code.travail.gouv.fr/fiche-service-public/un-salarie-peut-il-reporter-ses-jours-de-conges-non-pris-sur-lannee-suivante",
  refus:
    "https://code.travail.gouv.fr/fiche-service-public/un-employeur-peut-il-refuser-des-conges-demandes-par-le-salarie",
  reclamation:
    "https://code.travail.gouv.fr/modeles-de-courriers/reclamation-de-conges-payes",
} as const;

const INTERNAL_HREFS = [
  "/guides/comment-lire-une-fiche-de-paie",
  "/solde-de-tout-compte",
  "/salaire-arret-maladie",
  "/salaire-interim-calcul-brut-net",
  "/",
] as const;

const REQUIRED_SECTION_IDS = [
  "definition-et-beneficiaires",
  "fonctionnement-conges-payes",
  "periode-de-prise",
  "comment-poser-ses-conges",
  "refus-des-conges",
  "imposer-des-dates",
  "conges-des-lembauche",
  "samedi-et-jours-feries",
  "cinq-semaines-dun-coup",
  "conges-non-pris",
  "situations-particulieres",
] as const;

describe("guide congés payés", () => {
  it("est enregistré sur l'URL canonique privilégiée", () => {
    const guide = getGuideBySlug(SLUG);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(PATH);
    expect(guides.some((item) => item.slug === SLUG)).toBe(true);
    expect(getAllPublicPages().some((page) => page.path === PATH)).toBe(true);
    expect(isPathIndexable(PATH)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === PATH)).toBe(true);
  });

  it("conserve H1 avec 2026, title SEO et méta sans année, périmètre privé", () => {
    const guide = getGuideBySlug(SLUG)!;
    expect(guide.title).toBe("Congés payés 2026 : droits et règles dans le privé");
    expect(guide.title).toContain("2026");
    expect(guide.title).toContain("privé");
    expect(guide.seoTitle).toBe(
      "Congés payés (privé) : droits et règles (mis à jour)",
    );
    expect(guide.seoTitle).not.toMatch(/2026/);
    expect(guide.seoTitle?.endsWith("(mis à jour)")).toBe(true);
    expect(guide.seoTitle).toContain("(privé)");
    expect(guide.description).toBe(
      "Congés payés dans le secteur privé : découvrez vos droits, les règles pour poser vos vacances, les délais, les refus, les jours fériés et les reports.",
    );
    expect(guide.description).not.toMatch(/2026/);
    expect(guide.description.length).toBeGreaterThanOrEqual(110);
    expect(guide.description.length).toBeLessThanOrEqual(180);
    expect(guide.publishedAt).toBe("2026-10-23");
    expect(guide.updatedAt).toBe("2026-10-23");
  });

  it("structure le sommaire (11 rubriques + FAQ + À retenir + méthodologie)", () => {
    const guide = getGuideBySlug(SLUG)!;
    const toc = buildGuideTocH2(guide);
    expect(guide.sections).toHaveLength(11);
    expect(toc).toHaveLength(14);
    expect(toc.map((entry) => entry.id)).toEqual([
      ...REQUIRED_SECTION_IDS,
      "questions-frequentes",
      "conclusion",
      "methodologie-sources",
    ]);

    const groups = getGuideTocGroups(SLUG);
    expect(groups).toBeTruthy();
    expect(groups!.length).toBeGreaterThanOrEqual(3);
    expect(groups![groups!.length - 1].end).toBe(toc.length);
  });

  it("propose une FAQ synchronisée avec le Schema FAQPage", () => {
    const guide = getGuideBySlug(SLUG)!;
    expect(guide.faq.length).toBeGreaterThanOrEqual(9);
    expect(guide.faq.length).toBeLessThanOrEqual(11);

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const webpage = graph.find((node) => node["@type"] === "WebPage");
    const article = graph.find(
      (node) => node["@type"] === "Article" || node["@type"] === "BlogPosting",
    );
    const faq = graph.find((node) => node["@type"] === "FAQPage");
    const howTo = graph.find((node) => node["@type"] === "HowTo");
    const webApp = graph.find((node) => node["@type"] === "WebApplication");

    expect(webpage?.["@id"]).toBe(`https://www.brut-vers-net.fr${PATH}#webpage`);
    expect(article?.headline).toBe(guide.title);
    expect(article?.description).toBe(guide.description);
    expect(String(article?.datePublished)).toContain("2026-10-23");
    expect(String(article?.dateModified)).toContain("2026-10-23");
    expect(howTo).toBeUndefined();
    expect(webApp).toBeUndefined();

    const mainEntity = faq?.mainEntity as {
      name: string;
      acceptedAnswer: { text: string };
    }[];
    expect(mainEntity.map((item) => item.name)).toEqual(
      guide.faq.map((item) => item.question),
    );
    expect(mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
      guide.faq.map((item) => item.answer),
    );
  });

  it("reste dans la cible éditoriale sans calculer solde ni indemnité", () => {
    const guide = getGuideBySlug(SLUG)!;
    const source = JSON.stringify(guide);
    const minutes = computeReadingTime(guide);

    expect(minutes).toBeGreaterThanOrEqual(12);
    expect(minutes).toBeLessThanOrEqual(19);
    expect(getGuideHubTeaser(SLUG)).toBeTruthy();

    expect(source).toContain("2,5 jours ouvrables");
    expect(source).toContain("L3141-12");
    expect(source).toContain("L3141-16");
    expect(source).toContain("jours ouvrables");
    expect(source).toContain("jours ouvrés");
    expect(source).toContain("1er mai");
    expect(source).toContain("31 octobre");
    expect(source).toContain("15 mois");
    expect(source).toContain("fractionnement");
    expect(source).toContain("L3141-14");
    expect(source).toContain("L3141-17");
    expect(source).toContain("L3141-19");
    expect(source).toContain("L3141-19-3");
    expect(source).toContain("L3141-29");
    expect(source).toContain("Les congés payés sont-ils obligatoires ?");
    expect(source).toContain("enfant handicapé");
    expect(source).toContain("indemnité de congés payés");
    expect(source).toContain("16 septembre");
    expect(source).toContain("fermeture de l'établissement");
    expect(source).toContain("dans le mois suivant la reprise");
    expect(source).toContain("/solde-conges-payes");
    expect(source).toContain("calculer votre solde de congés payés");
    expect(source).not.toContain("indemnite-conges-payes");
    expect(source).not.toContain("n'est pas payé en salaire classique");
    expect(source).not.toContain("15 août");
    expect(source).not.toMatch(/—/);

    for (const href of Object.values(OFFICIAL_SOURCES)) {
      expect(source).toContain(href);
    }
    for (const href of INTERNAL_HREFS) {
      expect(source).toContain(href);
    }
  });

  it("expose page, couverture et crédits", () => {
    const pageSource = readFileSync(
      join(process.cwd(), "src/app/conges-payes/page.tsx"),
      "utf8",
    );
    expect(pageSource).toContain('const SLUG = "conges-payes"');

    expect(
      existsSync(join(process.cwd(), "public/images/covers/guides/conges-payes.webp")),
    ).toBe(true);

    const cover = getGuideCover(SLUG);
    expect(cover).toBeTruthy();
    expect(cover!.src).toBe("/images/covers/guides/conges-payes.webp");
    expect(getGuideCoverByHref(PATH)?.src).toBe(cover!.src);
    expect(formatCoverCredit(cover!.credit)).toBe(
      "Photo de allPhoto Bangkok via Pexels",
    );
    expect(cover!.credit.photographer).toBe("allPhoto Bangkok");
    expect(cover!.credit.source).toBe("Pexels");
    expect(cover!.credit.acquireLicensePage).toBeUndefined();
    expect(cover!.alt).toContain("mer turquoise");
    expect(cover!.alt.toLowerCase()).not.toContain("pexels");
    expect(cover!.width).toBe(1200);
    expect(cover!.height).toBe(800);

    const og = coverToOgInput(cover!);
    expect(og.url).toBe("/images/covers/guides/conges-payes.webp");

    const guide = getGuideBySlug(SLUG)!;
    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const primaryImage = graph.find(
      (node) => node["@id"] === schemaIds.primaryImage(PATH),
    ) as Record<string, unknown> | undefined;
    expect(primaryImage).toBeTruthy();
    expect(String(primaryImage?.url)).toContain("conges-payes.webp");
    expect(String(primaryImage?.contentUrl)).toContain("conges-payes.webp");
    expect(primaryImage?.creditText).toBe("Photo de allPhoto Bangkok via Pexels");
    expect(primaryImage?.name).toBe(cover!.alt);
    expect(primaryImage?.width).toBe(1200);
    expect(primaryImage?.height).toBe(800);
    expect((primaryImage?.creator as { name?: string } | undefined)?.name).toBe(
      "allPhoto Bangkok",
    );
  });
});
