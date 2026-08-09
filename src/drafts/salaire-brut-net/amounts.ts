/**
 * Brouillons restants de la série « salaire brut mensuel → net » : 3 550 € → 6 000 €.
 * Vague 1 (1 000 → 3 500) publiée dans GROSS_TO_NET_AMOUNTS / PUBLISHED_GROSS_TO_NET_AMOUNTS.
 */

export const DRAFT_GROSS_TO_NET_STATUS = "draft" as const;

export type DraftGrossToNetStatus = typeof DRAFT_GROSS_TO_NET_STATUS;

/** Montants encore en brouillon (pas de 50 €). 3 550 → 6 000 = 50 fiches. */
export const DRAFT_GROSS_TO_NET_AMOUNTS: readonly number[] = Array.from(
  { length: (6000 - 3550) / 50 + 1 },
  (_, index) => 3550 + index * 50,
);

export type DraftGrossToNetAmount = (typeof DRAFT_GROSS_TO_NET_AMOUNTS)[number];

export interface DraftGrossToNetEntry {
  amount: number;
  status: DraftGrossToNetStatus;
}

export const DRAFT_GROSS_TO_NET_ENTRIES: readonly DraftGrossToNetEntry[] =
  DRAFT_GROSS_TO_NET_AMOUNTS.map((amount) => ({
    amount,
    status: DRAFT_GROSS_TO_NET_STATUS,
  }));

export function isDraftGrossToNetAmount(value: number): boolean {
  return DRAFT_GROSS_TO_NET_AMOUNTS.includes(value);
}

/**
 * Catalogue futur après publication complète : publiés + brouillons restants.
 */
export function buildFuturePublishedCatalog(
  published: readonly number[],
  drafts: readonly number[] = DRAFT_GROSS_TO_NET_AMOUNTS,
): number[] {
  return [...new Set([...published, ...drafts])].sort((a, b) => a - b);
}

/** Première moitié : déjà publiée (vide volontairement). */
export const DRAFT_GROSS_TO_NET_AMOUNTS_HALF_1: readonly number[] = [];

/** Seconde moitié encore en brouillon : 3 550 → 6 000. */
export const DRAFT_GROSS_TO_NET_AMOUNTS_HALF_2: readonly number[] = DRAFT_GROSS_TO_NET_AMOUNTS;
