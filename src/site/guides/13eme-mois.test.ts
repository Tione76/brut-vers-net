import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getGuideBySlug, getGuidePublicPath, guides, draftGuides } from "./registry";
import { buildGuideTocH2 } from "./utils";
import { buildGuideJsonLd } from "@/site/schema";
import {
  formatCoverCredit,
  getGuideCoverByHref,
  resolveGuideCover,
} from "./covers";
import { GUIDE_TOC_CONFIG } from "./toc-groups";
import { GUIDE_HUB_TEASERS } from "./guides-hub-data";
import {
  THIRTEENTH_H1,
  THIRTEENTH_META_DESCRIPTION,
  THIRTEENTH_PATH,
  THIRTEENTH_SEO_TITLE,
  THIRTEENTH_SLUG,
  THIRTEENTH_SUBTITLE,
  annualWithFullThirteenth,
  equalInstallmentGross,
  prorataThirteenthGross,
} from "@/site/13eme-mois";
import { getAllPublicPages, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import { buildSearchIndex } from "@/site/navigation/site-search-index";

describe("guide 13ᵉ mois", () => {
  const slug = THIRTEENTH_SLUG;

  it("est publié sur /13eme-mois et indexable, sans toucher au brouillon banque", () => {
    const guide = getGuideBySlug(slug);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(THIRTEENTH_PATH);
    expect(guides.some((item) => item.slug === slug)).toBe(true);
    expect(draftGuides.some((item) => item.slug === "banque-petit-salaire")).toBe(true);
    expect(isPathIndexable(THIRTEENTH_PATH)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === THIRTEENTH_PATH)).toBe(true);
    expect(getAllPublicPages().some((page) => page.path === THIRTEENTH_PATH)).toBe(true);
    expect(buildSearchIndex().some((entry) => entry.href === THIRTEENTH_PATH)).toBe(true);
    expect(GUIDE_HUB_TEASERS[slug]).toBeTruthy();
    expect(isPathIndexable("/banque-petit-salaire")).toBe(false);
  });

  it("conserve H1, title et meta sans année, sans tiret cadratin ni consignes internes", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    expect(guide.title).toBe(THIRTEENTH_H1);
    expect(guide.seoTitle).toBe(THIRTEENTH_SEO_TITLE);
    expect(guide.description).toBe(THIRTEENTH_META_DESCRIPTION);
    expect(guide.subtitle).toBe(THIRTEENTH_SUBTITLE);
    expect(guide.seoTitle).not.toMatch(/2025|2026|2027/);
    expect(guide.description).not.toMatch(/2025|2026|2027/);
    expect(blob).not.toContain("\u2014");
    expect(blob).not.toContain("méthode pédagogique");
    expect(blob).not.toContain("exemples pédagogiques");
    expect(blob).not.toContain("hypothèses pédagogiques");
    expect(blob).not.toContain("modèles juridiques universels");
    expect(blob).not.toContain("Aucun net inventé");
    expect(blob).not.toContain("bulletin fiable");
    expect(blob).not.toContain("NewsArticle");
    expect(blob).not.toContain("openai.com");
    expect(blob).not.toContain("chatgpt.com");
    expect(blob).not.toContain("cite turn");
    expect(blob).toContain("salariés du secteur privé");
    expect(guide.introduction).toHaveLength(1);
    expect(guide.introduction[0]).toContain(
      "Ce guide concerne les salariés du secteur privé en France.",
    );
    expect(blob).not.toContain(
      "Cette différence est importante pour comparer deux offres d'emploi",
    );
    expect(blob).toContain(
      "Pour comparer deux offres, regardez d'abord le total annuel brut garanti",
    );
    expect(guide.quickSummary?.variant).toBe("reperes");
    expect(blob).toContain("Est-il obligatoire ?");
    expect(blob).toContain("Quel montant ?");
    expect(blob).toContain("Et si vous partez ?");
    expect(blob).toContain("Pas dans toutes les entreprises");
    expect(blob).not.toContain('"variant":"retain"');
    expect(blob).toContain(
      "Vous pouvez avoir droit à une partie du 13ᵉ mois même si vous quittez l'entreprise avant son versement",
    );
    expect(blob).toContain(
      "pas le montant exact qui apparaîtra sur le bulletin du mois de versement",
    );
    expect(blob).toContain("calculateur de salaire brut en net");
    expect(blob).not.toContain("Calculateur salaire brut / net");
    expect(blob).toContain("salaire net annuel");
    expect(blob).toContain("obtenir-estimation");
  });

  it("vérifie les exemples chiffrés", () => {
    expect(equalInstallmentGross(30000, 13)).toBe(2307.69);
    expect(annualWithFullThirteenth(2000)).toBe(26000);
    expect(annualWithFullThirteenth(2500)).toBe(32500);
    expect(annualWithFullThirteenth(3000)).toBe(39000);
    expect(prorataThirteenthGross(2500, 6, 12)).toBe(1250);
    expect(prorataThirteenthGross(2400, 9, 12)).toBe(1800);
  });

  it("expose sommaire, couverture, FAQ et schema cohérents", () => {
    const guide = getGuideBySlug(slug)!;
    const toc = buildGuideTocH2(guide);
    const pageToc = toc.filter((entry) => entry.id !== "conclusion");
    expect(pageToc.map((entry) => entry.id)).toEqual([
      "droit-au-13eme-mois",
      "salaire-sur-13-mois",
      "comment-calculer",
      "prorata",
      "brut-en-net",
      "date-paiement",
      "depart",
      "temps-partiel-cdd-maladie",
      "imposable",
      "smic",
      "montant-incorrect",
      "questions-frequentes",
      "methodologie-sources",
    ]);
    expect(GUIDE_TOC_CONFIG[slug]!.groups.at(-1)!.end).toBe(toc.length);
    expect(guide.faq).toHaveLength(7);
    expect(guide.faq.map((item) => item.question)).toEqual([
      "Le 13ᵉ mois correspond-il toujours au salaire de décembre ?",
      "Un salaire annoncé sur 13 mois est-il plus avantageux ?",
      "Vais-je recevoir une prime entière si je commence en juillet ?",
      "Est-ce que je perds mon 13ᵉ mois si je démissionne ?",
      "Comment calculer le 13ᵉ mois à 80 % ?",
      "Le 13ᵉ mois est-il forcément payé en décembre ?",
      "Le 13ᵉ mois et la prime de Noël sont-ils la même chose ?",
    ]);
    for (const item of guide.faq) {
      expect(item.question.trim().length).toBeGreaterThan(0);
      expect(item.answer.trim().length).toBeGreaterThan(20);
    }

    const cover = resolveGuideCover(guide);
    expect(cover?.src).toBe("/images/covers/guides/13eme-mois-calcul-montants.webp");
    expect(getGuideCoverByHref(THIRTEENTH_PATH)?.src).toBe(cover?.src);
    expect(formatCoverCredit(cover!.credit)).toBe("Photo de Tiger Lily via Pexels");
    expect(cover?.width).toBe(1200);
    expect(cover?.height).toBe(800);

    expect(guide.includeWebApplicationSchema).not.toBe(true);
    expect(guide.includeFaqSchema).toBe(true);

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const types = graph.map((node) => node["@type"]);
    expect(types).toContain("WebPage");
    expect(types).toContain("Article");
    expect(types).toContain("BreadcrumbList");
    expect(types).toContain("FAQPage");
    expect(types).not.toContain("NewsArticle");

    const article = graph.find((node) => node["@type"] === "Article") as Record<
      string,
      unknown
    >;
    expect(article.headline).toBe(THIRTEENTH_H1);
    expect(article.inLanguage).toBe("fr");
    const imageNode = graph.find(
      (node) =>
        node["@type"] === "ImageObject" &&
        String(node["@id"] ?? "").includes("13eme-mois"),
    ) as Record<string, unknown> | undefined;
    expect(String(imageNode?.contentUrl ?? imageNode?.url ?? "")).toContain(
      "13eme-mois-calcul-montants.webp",
    );

    const faqPage = graph.find((node) => node["@type"] === "FAQPage") as {
      mainEntity: { name: string; acceptedAnswer: { text: string } }[];
    };
    expect(faqPage.mainEntity).toHaveLength(guide.faq.length);
    expect(faqPage.mainEntity.map((item) => item.name)).toEqual(
      guide.faq.map((item) => item.question),
    );
    expect(faqPage.mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(
      guide.faq.map((item) => item.answer),
    );
  });

  it("reste hors actu et conserve les sources officielles listées", () => {
    const pageSource = readFileSync(
      join(process.cwd(), "src/app/13eme-mois/page.tsx"),
      "utf8",
    );
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    expect(pageSource).not.toContain("/actu");
    expect(pageSource).not.toContain("NewsArticle");
    expect(blob).toContain("JURITEXT000007030031");
    expect(blob).toContain("JURITEXT000021225332");
    expect(blob).toContain("5605-PGP.html");
    expect(blob).toContain("LEGISCTA000006189459");
    expect(blob).toContain("LEGIARTI000006901219");
    expect(blob).toContain("QANR5L11QE8078.pdf");
    expect(blob).toContain("assiette-de-v%C3%A9rification-du-SMIC");
    expect(blob).toContain("vosdroits/F2301");
    expect(blob).toContain("vosdroits/F311");
    expect(blob).toContain("vosdroits/F33359");
    expect(blob).toContain("suppression-usage");
    expect(blob).toContain("indemnite-conges-payes");
    expect(blob).toContain("indemnité de fin de contrat");
    // F311 déjà en Sources : pas de seconde entrée bibliographique.
    expect(
      (JSON.stringify(guide.bibliography).match(/vosdroits\/F311/g) || []).length,
    ).toBe(1);
  });

  it("intègre le maillage entrant depuis les pages pertinentes", () => {
    const tempsPartiel = readFileSync(
      join(process.cwd(), "src/site/guides/data/salaire-temps-partiel.ts"),
      "utf8",
    );
    const solde = readFileSync(
      join(process.cwd(), "src/site/guides/data/solde-de-tout-compte.ts"),
      "utf8",
    );
    const calculNet = readFileSync(
      join(process.cwd(), "src/site/guides/data/comment-calculer-son-salaire-net.ts"),
      "utf8",
    );
    expect(tempsPartiel).toContain('href: "/13eme-mois"');
    expect(solde).toContain('href: "/13eme-mois"');
    expect(calculNet).toContain('href: "/13eme-mois"');
  });
});
