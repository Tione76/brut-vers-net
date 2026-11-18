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
  CASE_1_ANNUAL_EUR,
  CASE_1_SAVED_EUR,
  CASE_3_LEFT_EUR,
  COMBIEN_TO_SAVE_EUR,
  EPARGNE_H1,
  EPARGNE_META_DESCRIPTION,
  EPARGNE_PATH,
  EPARGNE_SEO_TITLE,
  EPARGNE_SLUG,
  LEP_RFR_METROPOLE_1_PART_EUR,
  MARGIN_ANNUAL_VERSEMENTS_EUR,
  MARGIN_MONTHLY_EUR,
  PROVISION_TOTAL_ANNUAL_EUR,
  PROVISION_TOTAL_MONTHLY_EUR,
  annualFromMonthly,
} from "@/site/epargner-petit-salaire";
import { getAllPublicPages, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import { buildSearchIndex } from "@/site/navigation/site-search-index";
import { getMainNavItems } from "@/site/navigation/main-nav-data";

describe("guide épargner avec un petit salaire", () => {
  const slug = EPARGNE_SLUG;

  it("est publié sur /epargner-petit-salaire et indexable", () => {
    const guide = getGuideBySlug(slug);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(EPARGNE_PATH);
    expect(guides.some((item) => item.slug === slug)).toBe(true);
    expect(draftGuides.some((item) => item.slug === "banque-petit-salaire")).toBe(true);
    expect(guides.some((item) => item.slug === "banque-petit-salaire")).toBe(false);
    expect(isPathIndexable(EPARGNE_PATH)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === EPARGNE_PATH)).toBe(true);
    expect(getAllPublicPages().some((page) => page.path === EPARGNE_PATH)).toBe(true);
    expect(buildSearchIndex().some((entry) => entry.href === EPARGNE_PATH)).toBe(true);
    expect(GUIDE_HUB_TEASERS[slug]).toBeTruthy();
  });

  it("conserve H1, title et meta sans année ni tiret cadratin", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    expect(guide.title).toBe(EPARGNE_H1);
    expect(guide.seoTitle).toBe(EPARGNE_SEO_TITLE);
    expect(guide.description).toBe(EPARGNE_META_DESCRIPTION);
    expect(guide.seoTitle).toBe("Épargner avec un petit salaire : comment faire ?");
    expect(guide.seoTitle).not.toMatch(/mis à jour/i);
    expect(guide.seoTitle).not.toMatch(/2025|2026|2027/);
    expect(guide.description).not.toMatch(/2025|2026|2027/);
    expect(guide.introSummary).toBeUndefined();
    expect(blob).not.toContain("\u2014");
    expect(blob).not.toContain("sans effort");
    expect(blob).not.toContain("Repères de cohérence");
    expect(blob).not.toContain("Synthèse opérationnelle");
    expect(blob).not.toContain("Ne présentez pas");
  });

  it("réconcilie les exemples chiffrés centralisés", () => {
    expect(MARGIN_MONTHLY_EUR).toBe(35);
    expect(MARGIN_ANNUAL_VERSEMENTS_EUR).toBe(240);
    expect(PROVISION_TOTAL_MONTHLY_EUR).toBe(45);
    expect(PROVISION_TOTAL_ANNUAL_EUR).toBe(540);
    expect(COMBIEN_TO_SAVE_EUR).toBe(10);
    expect(CASE_1_SAVED_EUR).toBe(30);
    expect(CASE_1_ANNUAL_EUR).toBe(240);
    expect(CASE_3_LEFT_EUR).toBe(0);
    expect(annualFromMonthly(10)).toBe(120);
    expect(annualFromMonthly(20)).toBe(240);
    expect(LEP_RFR_METROPOLE_1_PART_EUR).toBe(23028);
  });

  it("expose couverture Pexels, sommaire, FAQ et schema cohérents", () => {
    const guide = getGuideBySlug(slug)!;
    const toc = buildGuideTocH2(guide);
    const pageToc = toc.filter((entry) => entry.id !== "conclusion");
    expect(pageToc.map((entry) => entry.id)).toEqual([
      "par-ou-commencer",
      "degager-une-marge",
      "transformer-economie-en-epargne",
      "previsibles-et-imprevus",
      "combien-mettre-de-cote",
      "exemples-concrets",
      "organiser-versements",
      "epargner-ou-rembourser",
      "ou-conserver-premiere-epargne",
      "si-vous-ne-pouvez-pas-epargner",
      "plan-d-action",
      "questions-frequentes",
      "methodologie-sources",
    ]);
    expect(GUIDE_TOC_CONFIG[slug]!.groups.at(-1)!.end).toBe(toc.length);
    expect(guide.faq).toHaveLength(7);
    expect(guide.faq.some((item) => item.question.includes("LEP"))).toBe(true);
    expect(JSON.stringify(guide.faq)).toContain("revenu fiscal de référence");

    const cover = resolveGuideCover(guide);
    expect(cover?.src).toBe("/images/covers/guides/epargner-avec-petit-revenu.webp");
    expect(getGuideCoverByHref(EPARGNE_PATH)?.src).toBe(cover?.src);
    expect(formatCoverCredit(cover!.credit)).toBe("Photo de Dany Kurniawan via Pexels");
    expect(cover?.width).toBe(1200);
    expect(cover?.height).toBe(800);

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const types = graph.map((node) => node["@type"]);
    expect(types).toContain("WebPage");
    expect(types).toContain("Article");
    expect(types).toContain("BreadcrumbList");
    expect(types).toContain("FAQPage");
    expect(types).not.toContain("WebApplication");
    expect(guide.includeWebApplicationSchema).not.toBe(true);
  });

  it("apparaît dans Banque & épargne sans publier le brouillon banques", () => {
    const items = getMainNavItems();
    const navBlob = JSON.stringify(items);
    expect(navBlob).toContain(EPARGNE_PATH);
    expect(navBlob).not.toContain("Budget et épargne");
    expect(navBlob).toContain("Banque & épargne");
    expect(navBlob).not.toContain("/banque-petit-salaire");

    const banque = items.find((item) => item.id === "banque-epargne");
    expect(banque?.kind).toBe("dropdown");
    if (banque?.kind === "dropdown" && banque.panel.kind === "simple") {
      expect(banque.panel.links[0]?.href).toBe(EPARGNE_PATH);
      expect(banque.panel.links[0]?.label).toBe(
        "Comment épargner avec un petit salaire ?",
      );
    }

    const pageSource = readFileSync(
      join(process.cwd(), "src/app/epargner-petit-salaire/page.tsx"),
      "utf8",
    );
    expect(pageSource).toContain("buildGuideJsonLd");
    expect(pageSource).toContain("GuideArticle");
  });

  it("préserve le lien 2i Portage sur la fiche de paie", () => {
    const fiche = readFileSync(
      join(process.cwd(), "src/site/guides/data/comment-lire-une-fiche-de-paie.ts"),
      "utf8",
    );
    expect(fiche).toContain(
      "https://www.2iportage.com/code-ape-cest-quoi-guide-complet-code-ape-naf/",
    );
  });
});
