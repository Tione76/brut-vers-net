import { describe, expect, it } from "vitest";
import { buildTocBlocks } from "./GuideEditorialToc";
import { guides } from "./registry";
import { getGuideTocGroups } from "./toc-groups";
import { buildGuideTocH2 } from "./utils";
import {
  hasOrphanBanner,
  planTocColumns,
  relativeImbalance,
  TOC_BALANCE_THRESHOLD,
  toBalanceBlocks,
  estimateColumnHeight,
  type BalanceBlock,
} from "./toc-column-balance";
import type { GuideTocEntry } from "./types";

function entriesFromTitles(titles: string[]): GuideTocEntry[] {
  return titles.map((title, index) => ({
    id: `e${index}`,
    title,
    level: 2 as const,
  }));
}

function planForSlug(slug: string) {
  const guide = guides.find((item) => item.slug === slug)!;
  const toc = buildGuideTocH2(guide);
  const blocks = toBalanceBlocks(buildTocBlocks(toc.length, getGuideTocGroups(slug)));
  return { toc, blocks, plan: planTocColumns(blocks, toc) };
}

function linkRange(blocks: BalanceBlock[]) {
  return blocks.flatMap((block) =>
    Array.from({ length: block.end - block.start }, (_, offset) => block.start + offset),
  );
}

function groupTitles(blocks: BalanceBlock[]) {
  return blocks
    .filter((block): block is Extract<BalanceBlock, { kind: "group" }> => block.kind === "group")
    .map((block) => block.title);
}

describe("planTocColumns", () => {
  it("conserve /smic en catégories entières (référence visuelle)", () => {
    const { plan, toc } = planForSlug("smic");
    expect(plan.split).toBe(false);
    expect(plan.left.map((block) => [block.start, block.end])).toEqual([
      [0, 4],
      [4, 9],
    ]);
    expect(plan.right.map((block) => [block.start, block.end])).toEqual([
      [9, 12],
      [12, 14],
      [14, 15],
    ]);
    expect(linkRange([...plan.left, ...plan.right])).toEqual(toc.map((_, index) => index));
    expect(plan.imbalance).toBeLessThanOrEqual(TOC_BALANCE_THRESHOLD);
  });

  it("améliore /smic-selon-nombre-heures par rapport au découpage 14/6", () => {
    const { plan, toc, blocks } = planForSlug("smic-selon-nombre-heures");
    const naive = {
      left: blocks.slice(0, 2),
      right: blocks.slice(2),
    };
    const naiveImbalance = relativeImbalance(
      estimateColumnHeight(naive.left, toc),
      estimateColumnHeight(naive.right, toc),
    );
    expect(plan.imbalance).toBeLessThan(naiveImbalance);
    expect(hasOrphanBanner(plan.left)).toBe(false);
    expect(hasOrphanBanner(plan.right)).toBe(false);
    expect(linkRange([...plan.left, ...plan.right])).toEqual(toc.map((_, index) => index));
    for (const block of [...plan.left, ...plan.right]) {
      if (block.kind === "group") {
        expect(block.end - block.start).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("répartit un sommaire plat sans catégories", () => {
    const entries = entriesFromTitles([
      "Rubrique 1",
      "Rubrique 2",
      "Rubrique 3",
      "Rubrique 4",
      "Rubrique 5",
      "Rubrique 6",
      "Rubrique 7",
    ]);
    const blocks = toBalanceBlocks(buildTocBlocks(7));
    const plan = planTocColumns(blocks, entries);
    expect(plan.split).toBe(false);
    expect(hasOrphanBanner(plan.left)).toBe(false);
    expect(linkRange([...plan.left, ...plan.right])).toEqual([0, 1, 2, 3, 4, 5, 6]);
    const leftN = plan.left.reduce((sum, block) => sum + (block.end - block.start), 0);
    expect(leftN).toBeGreaterThanOrEqual(3);
    expect(leftN).toBeLessThanOrEqual(4);
  });

  it("équilibre un sommaire à deux catégories", () => {
    const entries = entriesFromTitles([
      "A1",
      "A2",
      "A3",
      "A4",
      "B1",
      "B2",
      "B3",
      "B4",
    ]);
    const blocks = toBalanceBlocks(
      buildTocBlocks(8, [
        { title: "Groupe A", icon: "help", start: 0, end: 4 },
        { title: "Groupe B", icon: "badge", start: 4, end: 8 },
      ]),
    );
    const plan = planTocColumns(blocks, entries);
    expect(plan.split).toBe(false);
    expect(plan.left).toHaveLength(1);
    expect(plan.right).toHaveLength(1);
    expect(linkRange([...plan.left, ...plan.right])).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
  });

  it("conserve cinq catégories entières quand l'équilibre est satisfaisant", () => {
    const { plan } = planForSlug("smic");
    expect(plan.split).toBe(false);
    expect(plan.left.length + plan.right.length).toBe(5);
  });

  it("coupe une catégorie sans répéter le bandeau à droite", () => {
    const entries = entriesFromTitles(
      Array.from({ length: 12 }, (_, index) =>
        `Titre assez long pour forcer plusieurs lignes de texte ${index}`,
      ),
    );
    const blocks = toBalanceBlocks(
      buildTocBlocks(12, [
        { title: "Groupe A", icon: "help", start: 0, end: 10 },
        { title: "Groupe B", icon: "badge", start: 10, end: 12 },
      ]),
    );
    const wholeImbalance = relativeImbalance(
      estimateColumnHeight(blocks.slice(0, 1), entries),
      estimateColumnHeight(blocks.slice(1), entries),
    );
    const plan = planTocColumns(blocks, entries);
    expect(hasOrphanBanner(plan.left)).toBe(false);
    expect(hasOrphanBanner(plan.right)).toBe(false);
    if (wholeImbalance > TOC_BALANCE_THRESHOLD) {
      expect(plan.split).toBe(true);
      expect(plan.right[0]?.kind).toBe("loose");
      expect(groupTitles(plan.right)).not.toContain("Groupe A");
      expect(groupTitles([...plan.left, ...plan.right])).toEqual(["Groupe A", "Groupe B"]);
    }
    expect(linkRange([...plan.left, ...plan.right])).toEqual(
      entries.map((_, index) => index),
    );
  });

  it("n'isole jamais un bandeau lors d'une coupure", () => {
    const entries = entriesFromTitles(
      Array.from({ length: 12 }, (_, index) =>
        `Titre assez long pour forcer plusieurs lignes de texte ${index}`,
      ),
    );
    const blocks = toBalanceBlocks(
      buildTocBlocks(12, [
        { title: "Groupe A", icon: "help", start: 0, end: 10 },
        { title: "Groupe B", icon: "badge", start: 10, end: 12 },
      ]),
    );
    const plan = planTocColumns(blocks, entries);
    expect(hasOrphanBanner(plan.left)).toBe(false);
    expect(hasOrphanBanner(plan.right)).toBe(false);
    for (const block of [...plan.left, ...plan.right]) {
      if (block.kind === "group") {
        expect(block.end - block.start).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("gère une catégorie d'une seule rubrique près de la coupure", () => {
    const entries = entriesFromTitles([
      "Un",
      "Deux",
      "Trois",
      "Quatre",
      "Cinq",
      "Six",
      "Seul",
    ]);
    const blocks = toBalanceBlocks(
      buildTocBlocks(7, [
        { title: "A", icon: "help", start: 0, end: 3 },
        { title: "B", icon: "calculator", start: 3, end: 6 },
        { title: "C", icon: "badge", start: 6, end: 7 },
      ]),
    );
    const plan = planTocColumns(blocks, entries);
    expect(hasOrphanBanner(plan.left)).toBe(false);
    expect(hasOrphanBanner(plan.right)).toBe(false);
    expect(linkRange([...plan.left, ...plan.right])).toEqual([0, 1, 2, 3, 4, 5, 6]);
    const singles = [...plan.left, ...plan.right].filter(
      (block) => block.kind === "group" && block.title === "C",
    );
    expect(singles).toHaveLength(1);
    if (singles[0]?.kind === "group") {
      expect(singles[0].end - singles[0].start).toBe(1);
    }
  });

  it("préserve l'ordre impair et les titres très longs", () => {
    const entries = entriesFromTitles([
      "Titre très long qui occupe probablement deux lignes dans une colonne étroite du sommaire",
      "Court",
      "Encore un titre particulièrement long pour tester l'estimation de hauteur visuelle",
      "Moyen",
      "Petit",
    ]);
    const blocks = toBalanceBlocks(buildTocBlocks(5));
    const plan = planTocColumns(blocks, entries);
    expect(linkRange([...plan.left, ...plan.right])).toEqual([0, 1, 2, 3, 4]);
    const leftN = plan.left.reduce((sum, block) => sum + (block.end - block.start), 0);
    expect(leftN).toBeGreaterThanOrEqual(2);
    expect(leftN).toBeLessThanOrEqual(3);
  });

  it("ne duplique aucun bandeau sur les guides catégorisés", () => {
    for (const guide of guides) {
      const groups = getGuideTocGroups(guide.slug);
      if (!groups) continue;
      const { toc, plan } = planForSlug(guide.slug);
      expect(linkRange([...plan.left, ...plan.right])).toEqual(
        toc.map((_, index) => index),
      );
      expect(hasOrphanBanner(plan.left)).toBe(false);
      expect(hasOrphanBanner(plan.right)).toBe(false);
      const titles = groupTitles([...plan.left, ...plan.right]);
      expect(titles).toEqual([...new Set(titles)]);
      expect(titles).toEqual(groups.map((group) => group.title));
      if (plan.split) {
        expect(plan.right[0]?.kind).toBe("loose");
      }
    }
  });

  it("coupe comment-lire-une-fiche-de-paie sans bandeau (suite)", () => {
    const { plan, toc } = planForSlug("comment-lire-une-fiche-de-paie");
    expect(linkRange([...plan.left, ...plan.right])).toEqual(toc.map((_, index) => index));
    expect(groupTitles([...plan.left, ...plan.right])).toEqual([
      "Lire et comprendre sa fiche de paie",
      "Vérification et exemples pratiques",
      "Questions fréquentes et conclusion",
      "Méthodologie et sources",
    ]);
    if (plan.split) {
      expect(plan.right[0]?.kind).toBe("loose");
      expect(groupTitles(plan.right)).not.toContain(
        "Vérification et exemples pratiques",
      );
    }
  });

  it("hasOrphanBanner détecte un bandeau vide", () => {
    expect(
      hasOrphanBanner([
        { kind: "group", title: "X", icon: "help", start: 0, end: 0 },
      ]),
    ).toBe(true);
    expect(
      hasOrphanBanner([
        { kind: "group", title: "X", icon: "help", start: 0, end: 2 },
      ]),
    ).toBe(false);
  });
});
