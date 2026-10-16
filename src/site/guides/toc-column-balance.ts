import type { GuideTocEntry } from "./types";
import type { GuideTocGroupIcon } from "./GuideEditorialToc";

/** Unité relative ≈ hauteur d'une rubrique d'une ligne. */
const ENTRY_BASE = 1;
/** Ligne supplémentaire estimée au-delà de ~42 caractères (largeur de colonne). */
const ENTRY_EXTRA_LINE = 0.55;
const CHARS_PER_LINE = 42;
/** Hauteur relative d'un bandeau de catégorie. */
const BANNER = 3.15;
/** Espacement entre deux groupes dans une colonne. */
const GROUP_GAP = 0.9;

/**
 * Seuil d'imbalance relative |L−R| / max(L,R).
 * En dessous : conserver les catégories entières (ex. /smic ≈ 0,06–0,15).
 * Au-dessus : autoriser une coupure de catégorie.
 */
export const TOC_BALANCE_THRESHOLD = 0.28;

/** Pénalité ajoutée au score pour une coupure éditorialement maladroite. */
const AWKWARD_SPLIT_PENALTY = 0.12;

export type BalanceBlock =
  | {
      kind: "group";
      title: string;
      icon: GuideTocGroupIcon;
      start: number;
      end: number;
    }
  | { kind: "loose"; start: number; end: number };

export interface ColumnPlan {
  left: BalanceBlock[];
  right: BalanceBlock[];
  /** true si une catégorie a été coupée. */
  split: boolean;
  imbalance: number;
}

function entryLines(title: string): number {
  const length = title.trim().length;
  if (length <= 0) return 1;
  return Math.max(1, Math.ceil(length / CHARS_PER_LINE));
}

export function estimateEntryHeight(title: string): number {
  return ENTRY_BASE + (entryLines(title) - 1) * ENTRY_EXTRA_LINE;
}

export function estimateBlockHeight(
  block: BalanceBlock,
  entries: GuideTocEntry[],
): number {
  let height = 0;
  if (block.kind === "group") {
    // Un seul bandeau par catégorie : les suites de rubriques (loose) n'en ont pas.
    height += BANNER;
    // Titre de bandeau long (retour à la ligne).
    if (block.title.length > 28) height += 0.45;
  }
  for (let index = block.start; index < block.end; index += 1) {
    const entry = entries[index];
    height += estimateEntryHeight(entry?.title ?? "");
  }
  return height;
}

export function estimateColumnHeight(
  blocks: BalanceBlock[],
  entries: GuideTocEntry[],
): number {
  if (blocks.length === 0) return 0;
  let height = 0;
  blocks.forEach((block, index) => {
    if (index > 0) height += GROUP_GAP;
    height += estimateBlockHeight(block, entries);
  });
  return height;
}

export function relativeImbalance(left: number, right: number): number {
  const max = Math.max(left, right, 0.0001);
  return Math.abs(left - right) / max;
}

function scorePlan(
  left: BalanceBlock[],
  right: BalanceBlock[],
  entries: GuideTocEntry[],
  split: boolean,
  awkward = false,
): ColumnPlan {
  const leftH = estimateColumnHeight(left, entries);
  const rightH = estimateColumnHeight(right, entries);
  let imbalance = relativeImbalance(leftH, rightH);
  if (awkward) imbalance += AWKWARD_SPLIT_PENALTY;
  if (split) imbalance += 0.02; // léger biais pour préférer les catégories entières à score égal
  return { left, right, split, imbalance };
}

/** Tout bandeau doit avoir ≥ 1 rubrique dans la même colonne. */
export function hasOrphanBanner(blocks: BalanceBlock[]): boolean {
  return blocks.some(
    (block) => block.kind === "group" && block.end <= block.start,
  );
}

function isAwkwardSplit(leftCount: number, rightCount: number): boolean {
  const min = Math.min(leftCount, rightCount);
  const max = Math.max(leftCount, rightCount);
  return min === 1 && max >= 4;
}

/**
 * Meilleure répartition en colonnes :
 * 1) catégories entières si imbalance ≤ seuil ;
 * 2) sinon coupure d'une catégorie, sans bandeau isolé.
 */
export function planTocColumns(
  sourceBlocks: BalanceBlock[],
  entries: GuideTocEntry[],
  threshold = TOC_BALANCE_THRESHOLD,
): ColumnPlan {
  if (sourceBlocks.length === 0) {
    return { left: [], right: [], split: false, imbalance: 0 };
  }

  if (sourceBlocks.length === 1 && sourceBlocks[0].kind === "loose") {
    return planFlatColumns(sourceBlocks[0], entries);
  }

  if (sourceBlocks.length === 1) {
    return { left: sourceBlocks, right: [], split: false, imbalance: 0 };
  }

  let bestWhole: ColumnPlan | null = null;
  for (let cut = 1; cut < sourceBlocks.length; cut += 1) {
    const left = sourceBlocks.slice(0, cut);
    const right = sourceBlocks.slice(cut);
    if (hasOrphanBanner(left) || hasOrphanBanner(right)) continue;
    const plan = scorePlan(left, right, entries, false);
    if (!bestWhole || plan.imbalance < bestWhole.imbalance) {
      bestWhole = plan;
    }
  }

  if (bestWhole && bestWhole.imbalance <= threshold) {
    return bestWhole;
  }

  let bestSplit: ColumnPlan | null = null;
  for (let groupIndex = 0; groupIndex < sourceBlocks.length; groupIndex += 1) {
    const block = sourceBlocks[groupIndex];
    if (block.kind !== "group") continue;
    const size = block.end - block.start;
    if (size < 2) continue;

    for (let keep = 1; keep < size; keep += 1) {
      // Bandeau uniquement à gauche ; la suite des rubriques continue à droite sans bandeau.
      const leftPart: BalanceBlock = {
        kind: "group",
        title: block.title,
        icon: block.icon,
        start: block.start,
        end: block.start + keep,
      };
      const rightPart: BalanceBlock = {
        kind: "loose",
        start: block.start + keep,
        end: block.end,
      };
      const left = [...sourceBlocks.slice(0, groupIndex), leftPart];
      const right = [rightPart, ...sourceBlocks.slice(groupIndex + 1)];
      if (hasOrphanBanner(left) || hasOrphanBanner(right)) continue;
      const awkward = isAwkwardSplit(keep, size - keep);
      const plan = scorePlan(left, right, entries, true, awkward);
      if (!bestSplit || plan.imbalance < bestSplit.imbalance) {
        bestSplit = plan;
      }
    }
  }

  if (bestSplit && bestWhole) {
    // Couper seulement si le gain est net par rapport au meilleur découpage entier.
    if (bestSplit.imbalance + 0.04 < bestWhole.imbalance) {
      return bestSplit;
    }
    return bestWhole;
  }

  return bestSplit ?? bestWhole ?? { left: sourceBlocks, right: [], split: false, imbalance: 0 };
}

function planFlatColumns(
  block: Extract<BalanceBlock, { kind: "loose" }>,
  entries: GuideTocEntry[],
): ColumnPlan {
  const size = block.end - block.start;
  if (size <= 1) {
    return { left: [block], right: [], split: false, imbalance: 0 };
  }

  let best: ColumnPlan | null = null;
  for (let keep = 1; keep < size; keep += 1) {
    const left: BalanceBlock[] = [
      { kind: "loose", start: block.start, end: block.start + keep },
    ];
    const right: BalanceBlock[] = [
      { kind: "loose", start: block.start + keep, end: block.end },
    ];
    const plan = scorePlan(left, right, entries, false);
    if (!best || plan.imbalance < best.imbalance) best = plan;
  }
  return best!;
}

/** Convertit les blocs issus de buildTocBlocks vers BalanceBlock. */
export function toBalanceBlocks(
  blocks: Array<
    | {
        kind: "group";
        title: string;
        icon: GuideTocGroupIcon;
        start: number;
        end: number;
      }
    | { kind: "loose"; start: number; end: number }
  >,
): BalanceBlock[] {
  return blocks.map((block) =>
    block.kind === "group"
      ? {
          kind: "group" as const,
          title: block.title,
          icon: block.icon,
          start: block.start,
          end: block.end,
        }
      : { kind: "loose" as const, start: block.start, end: block.end },
  );
}
