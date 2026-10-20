import { describe, expect, it } from "vitest";
import {
  resolveSidebarBundle,
  hasSidebarContent,
  SIDEBAR_LIMITS,
  sidebarPathsMatch,
} from "./sidebar";

function hrefsOf(items: { href: string }[]): string[] {
  return items.map((item) => item.href);
}

function expectNoDuplicates(...groups: { href: string }[][]) {
  const all = groups.flat().map((item) => item.href);
  expect(new Set(all).size).toBe(all.length);
}

describe("resolveSidebarBundle", () => {
  it("guide SMIC : 3 guides liés, jusqu'à 2 outils, récents, guides en premier", () => {
    const bundle = resolveSidebarBundle({
      pageType: "guide",
      currentPath: "/smic",
      currentGuideSlug: "smic",
    });
    expect(bundle.toolsFirst).toBe(false);
    expect(bundle.guides).toHaveLength(3);
    expect(hrefsOf(bundle.guides)).toEqual([
      "/smic-selon-nombre-heures",
      "/smic-europe",
      "/smic-hotelier",
    ]);
    expect(bundle.tools.length).toBeGreaterThanOrEqual(1);
    expect(bundle.tools.length).toBeLessThanOrEqual(SIDEBAR_LIMITS.guideMaxTools);
    expect(bundle.tools.some((tool) => tool.href === "/")).toBe(true);
    expect(bundle.tools.some((tool) => tool.href.includes("heures-supplementaires"))).toBe(
      true,
    );
    expect(bundle.recentGuides.length).toBeGreaterThan(0);
    expect(bundle.recentGuides.length).toBeLessThanOrEqual(SIDEBAR_LIMITS.guideMaxRecent);
    expect(bundle.guides.every((guide) => guide.href !== "/smic")).toBe(true);
    expectNoDuplicates(bundle.guides, bundle.recentGuides);
  });

  it("guide SMIC heures : 3 contextuels + outils liés", () => {
    const bundle = resolveSidebarBundle({
      pageType: "guide",
      currentPath: "/smic-selon-nombre-heures",
      currentGuideSlug: "smic-selon-nombre-heures",
    });
    expect(bundle.toolsFirst).toBe(false);
    expect(bundle.guides).toHaveLength(3);
    expect(bundle.guides[0]?.href).toBe("/smic");
    expect(bundle.tools.length).toBeGreaterThanOrEqual(1);
    expect(bundle.tools.length).toBeLessThanOrEqual(2);
    expect(bundle.guides.every((guide) => guide.href !== "/smic-selon-nombre-heures")).toBe(
      true,
    );
    expectNoDuplicates(bundle.guides, bundle.recentGuides);
  });

  it("guide SMIC Europe : pas de page courante, sections distinctes", () => {
    const bundle = resolveSidebarBundle({
      pageType: "guide",
      currentPath: "/smic-europe",
      currentGuideSlug: "smic-europe",
    });
    expect(bundle.guides.every((guide) => guide.href !== "/smic-europe")).toBe(true);
    expect(bundle.guides.length).toBeLessThanOrEqual(3);
    expect(bundle.tools.length).toBeLessThanOrEqual(2);
    expect(bundle.recentGuides.every((guide) => guide.href !== "/smic-europe")).toBe(true);
    expectNoDuplicates(bundle.guides, bundle.recentGuides);
  });

  it("guide SMIC hôtelier : heures sup prioritaire via discover", () => {
    const bundle = resolveSidebarBundle({
      pageType: "guide",
      currentPath: "/smic-hotelier",
      currentGuideSlug: "smic-hotelier",
    });
    expect(bundle.tools[0]?.href).toBe("/calculateurs/salaire-heures-supplementaires");
    expect(bundle.guides[0]?.href).toBe("/smic");
    expect(bundle.tools.length).toBeLessThanOrEqual(2);
  });

  it("prime de Noël : aides liées + outil, sans hub /guides", () => {
    const bundle = resolveSidebarBundle({
      pageType: "guide",
      currentPath: "/prime-de-noel",
      currentGuideSlug: "prime-de-noel",
    });
    expect(bundle.guides.some((guide) => guide.href === "/prime-activite")).toBe(true);
    expect(bundle.guides.every((guide) => guide.href !== "/guides")).toBe(true);
    expect(bundle.tools[0]?.href).toBe("/");
    expect(bundle.tools.length).toBeLessThanOrEqual(2);
    expectNoDuplicates(bundle.guides, bundle.recentGuides);
  });

  it("calculateur brut/net : 2 outils, 3 guides, puis récents", () => {
    const bundle = resolveSidebarBundle({
      pageType: "calculator",
      currentPath: "/",
    });
    expect(bundle.toolsFirst).toBe(true);
    expect(bundle.tools).toHaveLength(2);
    expect(hrefsOf(bundle.tools)).toEqual([
      "/calculateurs/salaire-heures-supplementaires",
      "/calculateurs/augmentation-salaire",
    ]);
    expect(bundle.guides).toHaveLength(3);
    expect(bundle.tools.every((tool) => tool.href !== "/")).toBe(true);
    expect(bundle.recentGuides.length).toBeGreaterThan(0);
    expect(bundle.recentGuides.length).toBeLessThanOrEqual(
      SIDEBAR_LIMITS.calculatorMaxRecent,
    );
    expectNoDuplicates(bundle.guides, bundle.recentGuides);
  });

  it("calculateur heures sup : outils complémentaires + 3 guides", () => {
    const bundle = resolveSidebarBundle({
      pageType: "calculator",
      currentPath: "/calculateurs/salaire-heures-supplementaires",
    });
    expect(bundle.toolsFirst).toBe(true);
    expect(bundle.tools.some((tool) => tool.href === "/")).toBe(true);
    expect(bundle.guides).toHaveLength(3);
    expect(
      bundle.tools.every(
        (tool) => !sidebarPathsMatch(tool.href, "/calculateurs/salaire-heures-supplementaires"),
      ),
    ).toBe(true);
    expectNoDuplicates(bundle.guides, bundle.recentGuides);
  });

  it("page auteur : 1–2 guides, aucun outil ni récents", () => {
    const bundle = resolveSidebarBundle({
      pageType: "author",
      currentPath: "/auteur/antoine",
    });
    expect(bundle.tools).toHaveLength(0);
    expect(bundle.recentGuides).toHaveLength(0);
    expect(bundle.guides.length).toBeGreaterThanOrEqual(1);
    expect(bundle.guides.length).toBeLessThanOrEqual(2);
  });

  it("pages institutionnelles : aucune recommandation", () => {
    const bundle = resolveSidebarBundle({
      pageType: "institutional",
      currentPath: "/contact",
    });
    expect(bundle.tools).toHaveLength(0);
    expect(bundle.guides).toHaveLength(0);
    expect(bundle.recentGuides).toHaveLength(0);
    expect(hasSidebarContent({ pageType: "institutional", currentPath: "/contact" })).toBe(
      false,
    );
  });

  it("les guides récents utilisent publishedAt et excluent les liés", () => {
    const bundle = resolveSidebarBundle({
      pageType: "guide",
      currentPath: "/smic",
      currentGuideSlug: "smic",
    });
    const related = new Set(hrefsOf(bundle.guides));
    for (const recent of bundle.recentGuides) {
      expect(related.has(recent.href)).toBe(false);
      expect(recent.href).not.toBe("/smic");
    }
  });
});
