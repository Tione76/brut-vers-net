/**
 * Brouillons de la série « salaire brut mensuel → net ».
 * Série complète publiée (1 000 → 6 000) dans GROSS_TO_NET_AMOUNTS.
 * Liste volontairement vide après publication vague 2.
 */

export const DRAFT_GROSS_TO_NET_STATUS = "draft" as const;

export type DraftGrossToNetStatus = typeof DRAFT_GROSS_TO_NET_STATUS;

/** Plus aucun montant en brouillon (série 1 000 → 6 000 publiée). */
export const DRAFT_GROSS_TO_NET_AMOUNTS = [] as const;

export type DraftGrossToNetAmount = (typeof DRAFT_GROSS_TO_NET_AMOUNTS)[number];

export interface DraftGrossToNetEntry {
  amount: DraftGrossToNetAmount;
  status: DraftGrossToNetStatus;
}

export const DRAFT_GROSS_TO_NET_ENTRIES: readonly DraftGrossToNetEntry[] =
  DRAFT_GROSS_TO_NET_AMOUNTS.map((amount) => ({
    amount,
    status: DRAFT_GROSS_TO_NET_STATUS,
  }));

export function isDraftGrossToNetAmount(value: number): value is DraftGrossToNetAmount {
  return (DRAFT_GROSS_TO_NET_AMOUNTS as readonly number[]).includes(value);
}

/**
 * Catalogue futur après publication : publiés + brouillons restants.
 */
export function buildFuturePublishedCatalog(
  published: readonly number[],
  drafts: readonly number[] = DRAFT_GROSS_TO_NET_AMOUNTS,
): number[] {
  return [...new Set([...published, ...drafts])].sort((a, b) => a - b);
}

/** Première moitié : déjà publiée (vide volontairement). */
export const DRAFT_GROSS_TO_NET_AMOUNTS_HALF_1: readonly number[] = [];

/** Seconde moitié : publiée vague 2 (vide volontairement). */
export const DRAFT_GROSS_TO_NET_AMOUNTS_HALF_2: readonly number[] = [];
