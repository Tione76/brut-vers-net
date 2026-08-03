/**
 * Brouillons 3 100 € → 6 000 € : publiés dans NET_TO_GROSS_AMOUNTS.
 * Liste volontairement vide après publication (pas de SSG/sitemap séparés).
 */

export const DRAFT_NET_TO_GROSS_STATUS = "draft" as const;

export type DraftNetToGrossStatus = typeof DRAFT_NET_TO_GROSS_STATUS;

/** Plus aucun montant en brouillon (série 3 100 → 6 000 publiée). */
export const DRAFT_NET_TO_GROSS_AMOUNTS = [] as const;

export type DraftNetToGrossAmount = (typeof DRAFT_NET_TO_GROSS_AMOUNTS)[number];

export interface DraftNetToGrossEntry {
  amount: DraftNetToGrossAmount;
  status: DraftNetToGrossStatus;
}

export const DRAFT_NET_TO_GROSS_ENTRIES: readonly DraftNetToGrossEntry[] =
  DRAFT_NET_TO_GROSS_AMOUNTS.map((amount) => ({
    amount,
    status: DRAFT_NET_TO_GROSS_STATUS,
  }));

export function isDraftNetToGrossAmount(value: number): value is DraftNetToGrossAmount {
  return (DRAFT_NET_TO_GROSS_AMOUNTS as readonly number[]).includes(value);
}

/**
 * Catalogue futur après publication : publiés + brouillons restants (données uniquement).
 */
export function buildFuturePublishedCatalog(
  published: readonly number[],
  drafts: readonly number[] = DRAFT_NET_TO_GROSS_AMOUNTS,
): number[] {
  return [...published, ...drafts];
}
