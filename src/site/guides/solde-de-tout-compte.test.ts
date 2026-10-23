import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getGuideBySlug, getGuidePublicPath, guides } from "./registry";
import { buildGuideTocH2 } from "./utils";
import { buildGuideJsonLd } from "@/site/schema";
import { getGuideTocGroups } from "./toc-groups";
import { getAllPublicPages } from "@/site/public-pages";
import {
  coverToOgInput,
  formatCoverCredit,
  getGuideCover,
  getGuideCoverByHref,
} from "./covers";
import { existsSync } from "node:fs";
import { schemaIds } from "@/site/schema/ids";

const SLUG = "solde-de-tout-compte";
const PATH = "/solde-de-tout-compte";

const OFFICIAL_SOURCES = {
  f86: "https://www.service-public.fr/particuliers/vosdroits/F86",
  f21789: "https://www.service-public.fr/particuliers/vosdroits/F21789",
  f24661: "https://www.service-public.fr/particuliers/vosdroits/F24661",
  f37482: "https://www.service-public.fr/particuliers/vosdroits/F37482",
  f803: "https://www.service-public.fr/particuliers/vosdroits/F803",
  f40: "https://www.service-public.fr/particuliers/vosdroits/F40",
  f1643: "https://www.service-public.fr/particuliers/vosdroits/F1643",
  f2308: "https://www.service-public.fr/particuliers/vosdroits/F2308",
  f31539: "https://entreprendre.service-public.gouv.fr/vosdroits/F31539",
  bossRupture:
    "https://boss.gouv.fr/portail/accueil/autres-elements-de-remuneration/indemnites-de-rupture.html",
  l1234_5: "https://code.travail.gouv.fr/code-du-travail/l1234-5",
  l1234_20: "https://code.travail.gouv.fr/code-du-travail/l1234-20",
  d1234_8: "https://code.travail.gouv.fr/code-du-travail/d1234-8",
  r1234_9: "https://code.travail.gouv.fr/code-du-travail/r1234-9",
  l1471_1: "https://code.travail.gouv.fr/code-du-travail/l1471-1",
  l3245_1: "https://code.travail.gouv.fr/code-du-travail/l3245-1",
  l1243_9: "https://code.travail.gouv.fr/code-du-travail/l1243-9",
  l1221_25: "https://code.travail.gouv.fr/code-du-travail/l1221-25",
  l3251_3: "https://code.travail.gouv.fr/code-du-travail/l3251-3",
  denonciation:
    "https://code.travail.gouv.fr/modeles-de-courriers/comment-denoncer-un-recu-pour-solde-de-tout-compte",
  simLicenciement: "https://code.travail.gouv.fr/outils/indemnite-licenciement",
  simPrecarite: "https://code.travail.gouv.fr/outils/indemnite-precarite",
} as const;

const INTERNAL_HREFS = [
  "/guides/comment-lire-une-fiche-de-paie",
  "/guides/comment-est-calcule-le-salaire-net",
  "/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net",
  "/guides/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne",
  "/salaire-interim-calcul-brut-net",
  "/calculateurs/indemnite-licenciement",
  "/calculateurs/salaire-heures-supplementaires",
  "/",
] as const;

const REQUIRED_SECTION_IDS = [
  "exemple-recu-commente",
  "verifier-solde-en-5-etapes",
  "cotisations-fiscalite-retenues",
  "contester-et-reclamer",
  "modele-courrier-reclamation",
  "erreurs-frequentes-et-checklist",
  "solde-periode-essai",
  "conges-pendant-arret-maladie",
  "exemple-c-licenciement",
] as const;

describe("guide solde de tout compte", () => {
  it("est enregistré sur l'URL canonique privilégiée", () => {
    const guide = getGuideBySlug(SLUG);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(PATH);
    expect(guides.some((item) => item.slug === SLUG)).toBe(true);
    expect(getAllPublicPages().some((page) => page.path === PATH)).toBe(true);
  });

  it("conserve H1 avec 2026, title SEO et méta sans année", () => {
    const guide = getGuideBySlug(SLUG)!;
    expect(guide.title).toBe(
      "Solde de tout compte 2026 : calcul, indemnités, délais et contestation",
    );
    expect(guide.title).toContain("2026");
    expect(guide.seoTitle).toBe(
      "Solde de tout compte : calcul, indemnités et délais (mis à jour)",
    );
    expect(guide.seoTitle).not.toMatch(/2026/);
    expect(guide.seoTitle?.endsWith("(mis à jour)")).toBe(true);
    expect(guide.description).not.toMatch(/2026/);
    expect(guide.description.length).toBeGreaterThanOrEqual(120);
    expect(guide.description.length).toBeLessThanOrEqual(180);
    expect(guide.publishedAt).toBe("2026-10-21");
    expect(guide.updatedAt).toBe("2026-10-23");
  });

  it("structure le sommaire (18 rubriques + FAQ + À retenir + méthodologie)", () => {
    const guide = getGuideBySlug(SLUG)!;
    const toc = buildGuideTocH2(guide);
    const groups = getGuideTocGroups(SLUG);

    expect(guide.sections).toHaveLength(18);
    expect(toc).toHaveLength(21);
    expect(toc[18]).toEqual({
      id: "questions-frequentes",
      title: "Questions fréquentes sur le solde de tout compte",
      level: 2,
    });
    expect(toc[19]).toEqual({ id: "conclusion", title: "À retenir", level: 2 });
    expect(toc[20]).toEqual({
      id: "methodologie-sources",
      title: "Méthodologie et sources",
      level: 2,
    });
    expect(guide.bibliography?.id).toBe("methodologie-sources");
    expect(guide.sections.some((section) => section.id === "methodologie-sources")).toBe(
      false,
    );
    expect(groups).toBeTruthy();
    expect(groups![groups!.length - 1].end).toBe(toc.length);
    expect(new Set(toc.map((entry) => entry.id)).size).toBe(toc.length);

    for (const id of REQUIRED_SECTION_IDS) {
      const inSections = guide.sections.some(
        (section) =>
          section.id === id ||
          section.subsections?.some((sub) => sub.id === id),
      );
      expect(inSections, id).toBe(true);
    }
  });

  it("propose une FAQ complète synchronisée avec le Schema FAQPage", () => {
    const guide = getGuideBySlug(SLUG)!;
    expect(guide.faq.length).toBe(12);

    const signatureFaq = guide.faq.find((item) =>
      item.question.includes("obligatoire de signer"),
    );
    expect(signatureFaq?.answer).toMatch(/n'est pas obligatoire/i);
    expect(signatureFaq?.answer).toMatch(/effet libératoire/i);

    const fiscalFaq = guide.faq.find((item) => item.question.includes("imposable"));
    expect(fiscalFaq?.answer).toMatch(/congés payés/i);
    expect(fiscalFaq?.answer).toMatch(/F408/);

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const webpage = graph.find((node) => node["@type"] === "WebPage");
    const article = graph.find(
      (node) => node["@type"] === "Article" || node["@type"] === "BlogPosting",
    );
    const faq = graph.find((node) => node["@type"] === "FAQPage");
    const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList");
    const howTo = graph.find((node) => node["@type"] === "HowTo");
    const webApp = graph.find((node) => node["@type"] === "WebApplication");

    expect(webpage?.["@id"]).toBe(`https://www.brut-vers-net.fr${PATH}#webpage`);
    expect(article?.headline).toBe(guide.title);
    expect(String(article?.datePublished)).toContain("2026-10-21");
    expect(String(article?.dateModified)).toContain("2026-10-23");
    expect(article?.author).toBeTruthy();
    expect(breadcrumb).toBeTruthy();
    expect(howTo).toBeUndefined();
    expect(webApp).toBeUndefined();

    const mainEntity = faq?.mainEntity as { name: string; acceptedAnswer: { text: string } }[];
    expect(mainEntity.map((item) => item.name)).toEqual(guide.faq.map((item) => item.question));
    expect(mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
      guide.faq.map((item) => item.answer),
    );
  });

  it("sécurise les points juridiques sensibles et les exemples chiffrés", () => {
    const guide = getGuideBySlug(SLUG)!;
    const source = JSON.stringify(guide);

    expect(source).toContain("effet libératoire");
    expect(source).toContain("prouver un paiement par d'autres moyens");
    expect(source).toContain("L3245-1");
    expect(source).toContain("L1243-9");
    expect(source).toContain("L1234-5");
    expect(source).toContain("6 %");
    expect(source).toContain("Aucune condition minimale d'ancienneté");
    expect(source).toContain("prorata des mois de présence");
    expect(source).toContain("délai de prévenance");
    expect(source).toContain("24 heures");
    expect(source).toContain("ne prolonge pas automatiquement");
    expect(source).toContain("Exemple pédagogique en montants bruts");
    expect(source).toContain("Détail des périodes prises en compte");
    expect(source).toContain("dénonciation formelle");
    expect(source).toContain("N'attendez pas la fin du délai");
    expect(source).toContain("date d'envoi");
    expect(source).toContain("16-13.194");
    expect(source).toContain("25-12.609");
    expect(source).toContain("25-14.826");
    expect(source).toContain("loi du 22 avril 2024");
    expect(source).toContain("Dans quels cas la prime de précarité n'est-elle pas due ?");
    expect(source).toContain("salaire exigible");
    expect(source).not.toContain("salaire net exigible");
    expect(source).toContain("transmission à France Travail");
    expect(source).toContain("R1234-9");
    expect(source).toContain("congés afférents au préavis");
    expect(source).toContain("Exemple chronologique fictif");

    expect(source).toContain("2 971,43 €");
    expect(source).toContain("4 972,00 €");
    expect(source).toContain("13 793,33 €");
    expect(source).not.toContain("13 233,33 €");

    expect(2400 * (5 / 21)).toBeCloseTo(571.428571, 5);
    expect(13200 * 0.1).toBe(1320);
    expect((13200 + 1320) / 10).toBe(1452);
    expect(2200 + 1320 + 1452).toBe(4972);
    expect(5 * (2800 / 4)).toBe(3500);
    expect(2800 * (10 / 21)).toBeCloseTo(1333.333333, 5);
    expect(5600 * 0.1).toBe(560);
    expect(2800 + 5600 + 560 + 3500 + 1333.33).toBeCloseTo(13793.33, 2);

    expect(source).not.toContain("calculateur de solde");
    expect(source).not.toContain("/calculateurs/solde");
    expect(source).toContain("il ne calcule pas l'intégralité du solde");
  });

  it("maille vers des routes internes existantes et des sources officielles", () => {
    const guide = getGuideBySlug(SLUG)!;
    const source = JSON.stringify(guide);
    const publicPaths = new Set(getAllPublicPages().map((page) => page.path));

    for (const href of INTERNAL_HREFS) {
      expect(source).toContain(href);
      if (href !== "/") {
        expect(publicPaths.has(href), href).toBe(true);
      }
    }

    for (const url of Object.values(OFFICIAL_SOURCES)) {
      expect(source).toContain(url);
    }
  });

  it("branche la page dédiée, la couverture dédiée et le Schema image", () => {
    const pageSource = readFileSync(
      join(process.cwd(), "src/app/solde-de-tout-compte/page.tsx"),
      "utf8",
    );
    expect(pageSource).toContain('const SLUG = "solde-de-tout-compte"');
    expect(pageSource).toContain("bibliography={guide.bibliography}");
    expect(pageSource).toContain('openGraphType: "article"');

    const coverPath = join(
      process.cwd(),
      "public/images/covers/guides/solde-de-tout-compte.webp",
    );
    expect(existsSync(coverPath)).toBe(true);

    const cover = getGuideCover(SLUG);
    expect(cover).toBeTruthy();
    expect(cover!.src).toBe("/images/covers/guides/solde-de-tout-compte.webp");
    expect(cover!.src).not.toContain("Comment-lire-fiche-de-paie");
    expect(getGuideCoverByHref(PATH)?.src).toBe(cover!.src);
    expect(cover!.width).toBe(1200);
    expect(cover!.height).toBe(801);
    expect(cover!.alt).toBe(
      "Personne en costume tenant un stylo au-dessus de documents ouverts sur un bureau",
    );
    expect(cover!.alt.toLowerCase()).not.toContain("solde de tout compte");
    expect(cover!.alt.toLowerCase()).not.toContain("kampus");
    expect(cover!.alt.toLowerCase()).not.toContain("pexels");
    expect(cover!.credit.photographer).toBe("Kampus Production");
    expect(cover!.credit.source).toBe("Pexels");
    expect(formatCoverCredit(cover!.credit)).toBe("Photo fr Kampus Production via Pexels");

    const guide = getGuideBySlug(SLUG)!;
    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const article = graph.find(
      (node) => node["@type"] === "Article" || node["@type"] === "BlogPosting",
    );
    const webpage = graph.find((node) => node["@type"] === "WebPage");
    const imageNodes = graph.filter((node) => node["@type"] === "ImageObject");
    const primaryImage = imageNodes.find(
      (node) => node["@id"] === schemaIds.primaryImage(PATH),
    );

    expect(article?.image).toEqual({ "@id": schemaIds.primaryImage(PATH) });
    expect(webpage?.primaryImageOfPage).toEqual({
      "@id": schemaIds.primaryImage(PATH),
    });
    expect(primaryImage).toBeTruthy();
    expect(String(primaryImage?.url)).toContain("solde-de-tout-compte.webp");
    expect(String(primaryImage?.contentUrl)).toContain("solde-de-tout-compte.webp");
    expect(primaryImage?.width).toBe(1200);
    expect(primaryImage?.height).toBe(801);
    expect(primaryImage?.creditText).toBe("Photo fr Kampus Production via Pexels");
    expect(primaryImage?.caption).toBe(cover!.alt);
    expect((primaryImage?.creator as { name?: string } | undefined)?.name).toBe(
      "Kampus Production",
    );
    expect(JSON.stringify(graph)).not.toContain("Comment-lire-fiche-de-paie");

    const og = coverToOgInput(cover!);
    expect(og.url).toBe("/images/covers/guides/solde-de-tout-compte.webp");
    expect(og.width).toBe(1200);
    expect(og.height).toBe(801);
    expect(og.alt).toBe(cover!.alt);

    const dataSource = readFileSync(
      join(process.cwd(), "src/site/guides/data/solde-de-tout-compte.ts"),
      "utf8",
    );
    expect(dataSource).not.toContain("—");
    expect(dataSource).toContain("n'est pas obligé de signer");
    expect(dataSource).toContain("quérable");
    expect(dataSource).toContain("Aucun texte du Code du travail ne fixe un délai universel");
  });
});
