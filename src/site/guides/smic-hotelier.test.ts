import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { getGuideBySlug, getGuidePublicPath, guides } from "./registry";
import {
  formatCoverCredit,
  getCoverLicenseUrl,
  getGuideCoverByHref,
  PEXELS_LICENSE_URL,
  resolveGuideCover,
} from "./covers";
import { buildGuideJsonLd } from "@/site/schema";
import {
  SMIC_HOTELIER_H1,
  SMIC_HOTELIER_META_DESCRIPTION,
  SMIC_HOTELIER_PATH,
  SMIC_HOTELIER_SEO_TITLE,
  SMIC_HOTELIER_SLUG,
} from "@/site/smic-hotelier/data";
import { HCR_EXAMPLE_II_2 } from "@/site/smic-hotelier/data";
import { getPlanDuSiteSections, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import { smicNavigation } from "@/site/navigation/smic";
import { guidesNavigation } from "./navigation";

describe("page pilier SMIC hôtelier", () => {
  const slug = SMIC_HOTELIER_SLUG;
  const path = SMIC_HOTELIER_PATH;
  const coverSrc = "/images/covers/guides/smic-hotelier.webp";

  it("est enregistrée avec le chemin public /smic-hotelier", () => {
    const guide = getGuideBySlug(slug);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(path);
    expect(guides.some((item) => item.slug === slug)).toBe(true);
  });

  it("est indexable et présente dans sitemap + plan du site", () => {
    expect(isPathIndexable(path)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === path)).toBe(true);
    const planBlob = JSON.stringify(getPlanDuSiteSections());
    expect(planBlob).toContain(path);
  });

  it("expose H1 daté, Title evergreen sans année, et FAQ visible sans FAQPage", () => {
    const guide = getGuideBySlug(slug)!;
    expect(guide.title).toBe(SMIC_HOTELIER_H1);
    expect(guide.title).toContain("2026");
    expect(guide.seoTitle).toBe(SMIC_HOTELIER_SEO_TITLE);
    expect(SMIC_HOTELIER_SEO_TITLE).toBe("SMIC hôtelier : grille HCR et salaire à 39 h (mis à jour)");
    expect(SMIC_HOTELIER_SEO_TITLE.endsWith("(mis à jour)")).toBe(true);
    expect(SMIC_HOTELIER_SEO_TITLE).not.toMatch(/20\d{2}/);
    expect(guide.description).toBe(SMIC_HOTELIER_META_DESCRIPTION);
    expect(guide.description).not.toMatch(/20\d{2}/);
    expect(guide.includeFaqSchema).toBe(false);
    expect(guide.faqSectionId).toBe("questions-frequentes");
    expect(guide.includeWebApplicationSchema).toBeFalsy();
    expect(guide.faq.length).toBeGreaterThanOrEqual(8);
    expect(JSON.stringify(guide)).not.toContain("\u2014");
    expect(JSON.stringify(guide).toLowerCase()).not.toContain("localhost");
  });

  it("attache la cover dédiée au registre et au Schema", () => {
    const guide = getGuideBySlug(slug)!;
    const cover = resolveGuideCover(guide);
    expect(cover?.src).toBe(coverSrc);
    expect(guide.coverImage?.src).toBe(cover?.src);
    expect(getGuideCoverByHref(path)?.src).toBe(cover?.src);
    expect(formatCoverCredit(cover!.credit)).toBe("Photo de cottonbro studio via Pexels");
    expect(cover!.credit.photographer).toBe("cottonbro studio");
    expect(cover!.credit.source).toBe("Pexels");
    expect(getCoverLicenseUrl(cover!.credit)).toBe(PEXELS_LICENSE_URL);
    expect(cover!.width).toBe(1200);
    expect(cover!.height).toBe(800);
    expect(cover!.alt.length).toBeGreaterThan(20);
    expect(cover!.alt.toLowerCase()).not.toContain("salaire");
    expect(cover!.alt).not.toMatch(/20\d{2}/);
    expect(cover!.alt).not.toMatch(/\d+\s*€/);

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const image = graph.find(
      (node) => node["@id"] === `https://www.brut-vers-net.fr${path}#primaryimage`,
    ) as Record<string, unknown>;
    expect(image?.url).toBe(`https://www.brut-vers-net.fr${coverSrc}`);
    expect(image?.width).toBe(1200);
    expect(image?.height).toBe(800);
  });

  it("émet WebPage, Article, BreadcrumbList, Person et Organization, sans FAQPage", () => {
    const guide = getGuideBySlug(slug)!;
    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const types = graph.map((node) => node["@type"]);

    expect(types).toContain("WebPage");
    expect(types).toContain("Article");
    expect(types).toContain("BreadcrumbList");
    expect(types).toContain("Person");
    expect(types).toContain("Organization");
    expect(types).not.toContain("FAQPage");
    expect(types).not.toContain("WebApplication");

    const webpage = graph.find((node) => node["@type"] === "WebPage") as Record<string, unknown>;
    const article = graph.find((node) => node["@type"] === "Article") as Record<string, unknown>;
    const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList") as {
      itemListElement: { name: string }[];
    };

    expect(webpage?.["@id"]).toBe(`https://www.brut-vers-net.fr${path}#webpage`);
    expect(webpage?.name).toBe(SMIC_HOTELIER_H1);
    expect(String(webpage?.description)).not.toMatch(/20\d{2}/);
    expect(article?.headline).toBe(SMIC_HOTELIER_H1);
    expect(article?.datePublished).toContain("2026-09-28");
    expect(article?.dateModified).toContain("2026-09-28");
    expect(graph.filter((node) => node["@type"] === "Person")).toHaveLength(1);
    expect(graph.filter((node) => node["@type"] === "Organization")).toHaveLength(1);
    expect(breadcrumb.itemListElement.map((item) => item.name)).toEqual([
      "Accueil",
      "SMIC hôtelier",
    ]);
  });

  it("présente la comparaison SMIC/grille et les exemples 35 h / 39 h", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("12,00");
    expect(blob).toContain("12,31");
    expect(blob).toContain("1\u00a0867,02");
    expect(blob).toContain("2\u00a0101,73");
    expect(blob).toContain("2\u00a0142,75");
    expect(blob).toContain("avenant n° 33");
    expect(blob).toContain("IDCC 1979");
    expect(blob).toContain("/smic");
    expect(blob).toContain("/smic-selon-nombre-heures");
    expect(guide.sections.some((section) => section.id === "grille-salaires-hcr")).toBe(true);
    expect(guide.sections.some((section) => section.id === "salaire-hcr-35-heures")).toBe(true);
    expect(guide.sections.some((section) => section.id === "salaire-hcr-39-heures")).toBe(true);
    expect(guide.sections.some((section) => section.id === "heures-supplementaires-hcr")).toBe(true);
    expect(guide.sections.some((section) => section.id === "smic-hotelier-net")).toBe(true);
    expect(guide.sections.some((section) => section.id === "repas-hcr")).toBe(true);
    expect(guide.sections.some((section) => section.id === "verifier-salaire-hcr-fiche-de-paie")).toBe(
      true,
    );
    expect(HCR_EXAMPLE_II_2.applicableHourly).toBe(12.55);
    expect(blob.toLowerCase()).not.toContain("expression de recherche");
    expect(blob.toLowerCase()).not.toContain("mot-clé");
    expect(blob).not.toMatch(/cinq heures/i);
    expect(blob).toContain("/guides/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne");
  });

  it("est maillée depuis les pages SMIC proches, le brut/net, le calculateur d'heures sup et le menu SMIC, pas depuis Nos guides", () => {
    const smic = JSON.stringify(getGuideBySlug("smic"));
    const hours = JSON.stringify(getGuideBySlug("smic-selon-nombre-heures"));
    const fiche = JSON.stringify(getGuideBySlug("comment-lire-une-fiche-de-paie"));
    const brutNet = JSON.stringify(getGuideBySlug("comment-est-calcule-le-salaire-net"));
    const overtimeEditorial = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "../overtime-salary-calculator/overtime-editorial.tsx"),
      "utf8",
    );
    const overtimeSidebar = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "../overtime-salary-calculator/overtime-sidebar.tsx"),
      "utf8",
    );
    expect(smic).toContain(path);
    expect(hours).toContain(path);
    expect(fiche).toContain(path);
    expect(brutNet).toContain(path);
    expect(fiche).toContain("vérifiez le SMIC hôtelier et la grille HCR");
    expect(brutNet).toContain("consulter le SMIC hôtelier et les minima HCR");
    expect(overtimeEditorial).toContain('href="/smic-hotelier"');
    expect(overtimeSidebar).toContain('href: "/smic-hotelier"');
    expect(smicNavigation.some((item) => item.href === path)).toBe(true);
    expect(guidesNavigation.some((item) => item.slug === slug)).toBe(false);
    expect(
      readFileSync(join(dirname(fileURLToPath(import.meta.url)), "../../app/smic-hotelier/page.tsx"), "utf8"),
    ).toContain("faqSectionId={guide.faqSectionId}");
  });
});
