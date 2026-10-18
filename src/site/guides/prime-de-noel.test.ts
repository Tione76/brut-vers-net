import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { getGuideBySlug, getGuidePublicPath, guides } from "./registry";
import { buildGuideTocH2, computeReadingTime } from "./utils";
import { buildGuideJsonLd } from "@/site/schema";
import { getGuideHubTeaser } from "@/site/guides/guides-hub-data";
import { getPlanDuSiteSections, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import { guidesNavigation } from "./navigation";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { siteConfig } from "@/site/site.config";
import { seoConfig } from "@/site/seo.config";
import { getGuideCover } from "./covers";
import {
  FORFAIT_ASS_AER_GENERAL,
  FORFAIT_ASS_AER_MAYOTTE,
  PRIME_DE_NOEL_H1,
  PRIME_DE_NOEL_META_DESCRIPTION,
  PRIME_DE_NOEL_PATH,
  PRIME_DE_NOEL_PUBLISHED_AT,
  PRIME_DE_NOEL_SEO_TITLE,
  PRIME_DE_NOEL_SLUG,
  PRIME_DE_NOEL_STATUS_NOTICE,
  PRIME_DE_NOEL_TOC_GROUPS,
  PRIME_DE_NOEL_UPDATED_AT,
  PRIME_DE_NOEL_YEAR_2026_CONFIRMED,
  RSA_TABLE_GENERAL_ROWS,
  RSA_TABLE_MAYOTTE_ROWS,
  SERVICE_PUBLIC_A14502,
} from "@/site/prime-de-noel/data";

describe("guide prime de Noël", () => {
  const slug = PRIME_DE_NOEL_SLUG;
  const path = PRIME_DE_NOEL_PATH;
  const guide = () => getGuideBySlug(slug)!;

  it("est enregistrée avec le chemin public /prime-de-noel", () => {
    expect(getGuideBySlug(slug)).toBeTruthy();
    expect(getGuidePublicPath(guide())).toBe(path);
    expect(guides.some((item) => item.slug === slug)).toBe(true);
  });

  it("est indexable et présente dans sitemap, plan du site et hub guides", () => {
    expect(isPathIndexable(path)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === path)).toBe(true);
    expect(JSON.stringify(getPlanDuSiteSections())).toContain(path);
    expect(getGuideHubTeaser(slug)).toBeTruthy();
    expect(getGuideHubTeaser(slug)).not.toMatch(/simulat/i);
    expect(guidesNavigation.some((item) => item.slug === slug)).toBe(true);
  });

  it("expose SEO title sans année, H1 et meta avec 2026", () => {
    const g = guide();
    expect(g.title).toBe(PRIME_DE_NOEL_H1);
    expect(g.title).toContain("2026");
    expect(g.seoTitle).toBe(PRIME_DE_NOEL_SEO_TITLE);
    expect(PRIME_DE_NOEL_SEO_TITLE).not.toMatch(/20\d{2}/);
    expect(PRIME_DE_NOEL_SEO_TITLE).toMatch(/\(mis à jour\)$/);
    expect(g.description).toBe(PRIME_DE_NOEL_META_DESCRIPTION);
    expect(g.description).toContain("2026");
    expect(g.description).not.toMatch(/simulat/i);
    expect(JSON.stringify(g)).not.toContain("\u2014");
    expect(PRIME_DE_NOEL_YEAR_2026_CONFIRMED).toBe(false);
    expect(JSON.stringify(g)).toContain(PRIME_DE_NOEL_STATUS_NOTICE);
    expect(g.introSummary?.items).toHaveLength(5);

    const metadata = buildPageMetadata(siteConfig, seoConfig, {
      title: g.seoTitle ?? g.title,
      description: g.description,
      path,
      openGraphType: "article",
    });
    expect(metadata.title).toEqual({ absolute: PRIME_DE_NOEL_SEO_TITLE });
    expect(metadata.alternates?.canonical).toBe(
      "https://www.brut-vers-net.fr/prime-de-noel",
    );
    expect(metadata.robots).toBeUndefined();
  });

  it("inclut FAQPage sans WebApplication dans le JSON-LD", () => {
    const g = guide();
    expect(g.includeWebApplicationSchema).toBeFalsy();
    const graph = buildGuideJsonLd(g)["@graph"] as Record<string, unknown>[];
    const types = graph.map((node) => node["@type"]);
    expect(types).toContain("WebPage");
    expect(types).toContain("Article");
    expect(types).toContain("FAQPage");
    expect(types).not.toContain("WebApplication");
    expect(types).toContain("BreadcrumbList");
  });

  it("dispose d'une route App Router sans simulateur", () => {
    const source = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "../../app/prime-de-noel/page.tsx"),
      "utf8",
    );
    expect(source).not.toContain("PrimeDeNoelSimulator");
    expect(source).not.toContain("sectionSlots");
    expect(source).not.toContain("prime-de-noel.css");
    expect(source).toContain("tocGroups={PRIME_DE_NOEL_TOC_GROUPS}");
  });

  it("ordonne le sommaire : éligibilité avant vérification des droits", () => {
    const toc = buildGuideTocH2(guide());
    expect(toc.map((entry) => entry.id)).toEqual([
      "montant-prime-de-noel-2026",
      "qui-a-droit-prime-de-noel",
      "date-versement-prime-de-noel",
      "qui-verse-prime-de-noel",
      "cas-particuliers-prime-de-noel",
      "montant-prime-de-noel-mayotte",
      "ou-verifier-droits-prime-de-noel",
      "demarches-et-absence-versement",
      "fiscalite-et-cumul",
      "questions-frequentes",
      "conclusion",
      "sources-officielles",
    ]);
    expect(toc.some((entry) => /simulat/i.test(entry.title))).toBe(false);
    expect(PRIME_DE_NOEL_TOC_GROUPS.at(-1)?.end).toBe(toc.length);
    expect(computeReadingTime(guide())).toBeGreaterThanOrEqual(8);
  });

  it("conserve les barèmes 2025 officiels RSA et forfaits ASS", () => {
    expect(RSA_TABLE_GENERAL_ROWS[0]).toEqual([
      "0",
      expect.stringContaining("152,45"),
      expect.stringContaining("228,68"),
    ]);
    expect(RSA_TABLE_GENERAL_ROWS[5]).toEqual([
      "5",
      expect.stringContaining("457,35"),
      expect.stringContaining("503,09"),
    ]);
    expect(RSA_TABLE_MAYOTTE_ROWS[0]).toEqual([
      "0",
      expect.stringContaining("76,23"),
      expect.stringContaining("114,35"),
    ]);
    expect(RSA_TABLE_MAYOTTE_ROWS[4]).toEqual([
      "4",
      expect.stringContaining("167,71"),
      expect.stringContaining("190,58"),
    ]);
    expect(FORFAIT_ASS_AER_GENERAL).toBe(152.45);
    expect(FORFAIT_ASS_AER_MAYOTTE).toBe(76.23);
  });

  it("clarifie RSA nul, janvier 2026 campagne 2025, AER Mayotte et contexte budgétaire", () => {
    const g = guide();
    const blob = JSON.stringify(g);
    expect(blob).toMatch(/montant dû non nul|montant de RSA n'était dû/i);
    expect(blob).toMatch(/à partir de janvier 2026/);
    expect(blob).toMatch(/campagne 2025/);
    expect(blob).toMatch(/2025-1213/);
    expect(blob).toMatch(/ne présentent pas exactement le même périmètre/i);
    expect(blob).toMatch(/demandez confirmation à France Travail/i);
    expect(blob).toMatch(/prime forfaitaire pour reprise d'activité est un dispositif ancien/i);
    expect(blob).toMatch(/allocation équivalent retraite \(AER\)/i);
    expect(blob).toMatch(/28 janvier 2026/);
    expect(blob).toMatch(/réserver la prime de Noël aux foyers ayant au moins un enfant/i);
    expect(blob).toMatch(/ne constitue toutefois pas le barème officiel/i);
    expect(blob).toMatch(/article 5/);
    expect(blob).toMatch(/A14502/);
    expect(blob).toMatch(/montants jusqu'à cinq enfants sont repris/i);
    expect(SERVICE_PUBLIC_A14502).toContain("A14502");
    expect(blob).not.toMatch(/title SEO/i);
    expect(blob).not.toMatch(/sera versée le 16 décembre 2026/i);
    expect(blob).not.toMatch(/simulat/i);
    expect(blob).not.toMatch(/n'extrapolez pas/i);
    expect(blob).not.toMatch(/Ne pas appliquer les montants métropolitains/i);

    const elig = g.sections.find((section) => section.id === "qui-a-droit-prime-de-noel");
    expect(elig?.subsections?.some((sub) => sub.id === "prime-de-noel-2026-foyers-sans-enfant")).toBe(
      true,
    );
    expect(PRIME_DE_NOEL_PUBLISHED_AT).toBe("2026-10-18");
    expect(PRIME_DE_NOEL_UPDATED_AT).toBe("2026-10-18");
    expect(g.publishedAt).toBe("2026-10-18");
    expect(g.updatedAt).toBe("2026-10-18");
  });

  it("fournit une FAQ concise (9 questions) sans réponse vide, avec AAH", () => {
    const faq = guide().faq ?? [];
    expect(faq.length).toBe(9);
    const questions = faq.map((item) => item.question);
    expect(new Set(questions).size).toBe(questions.length);
    expect(questions).toEqual([
      "Qui aura droit à la prime de Noël en 2026 ?",
      "Quel sera le montant de la prime de Noël en 2026 ?",
      "Quand sera versée la prime de Noël 2026 ?",
      "Peut-on toucher la prime de Noël avec la prime d'activité ?",
      "Les bénéficiaires de l'AAH ont-ils droit à la prime de Noël ?",
      "Les chômeurs peuvent-ils recevoir la prime de Noël ?",
      "Pourquoi n'ai-je pas reçu ma prime de Noël ?",
      "La prime de Noël est-elle imposable ?",
      "La prime de Noël est-elle versée par personne ou par foyer ?",
    ]);
    for (const item of faq) {
      expect(item.question.trim().length).toBeGreaterThan(10);
      expect(item.answer.trim().length).toBeGreaterThan(40);
    }
    const aah = faq.find((item) => /AAH/i.test(item.question));
    expect(aah?.answer).toMatch(/AAH seule n'ouvrait pas/i);
    const dateQ = faq.find((item) => /Quand sera versée/i.test(item.question));
    expect(dateQ?.answer).toMatch(/décembre 2025/);
    expect(dateQ?.answer).toMatch(/janvier 2026/);
  });

  it("utilise la couverture Gabriel Groza et l'image publique", () => {
    const cover = getGuideCover(slug);
    expect(cover?.src).toBe("/images/covers/guides/prime-de-noel.webp");
    expect(cover?.credit.photographer).toBe("Gabriel Groza");
    expect(cover?.credit.text).toBe("Photo de Gabriel Groza via Pexels");
    expect(cover?.alt).toMatch(/cadeaux|Noël|cheminée/i);
    expect(cover?.src).not.toContain("Prime-activite");
    const filePath = join(
      dirname(fileURLToPath(import.meta.url)),
      "../../../public/images/covers/guides/prime-de-noel.webp",
    );
    expect(existsSync(filePath)).toBe(true);
  });
});
