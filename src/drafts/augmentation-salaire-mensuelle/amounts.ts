/**
 * Brouillons 60 € → 500 € : publiés dans MONTHLY_INCREASE_AMOUNTS.
 * Liste volontairement vide après publication (pas de SSG/sitemap séparés).
 */

export const DRAFT_MONTHLY_INCREASE_STATUS = "draft" as const;

export type DraftMonthlyIncreaseStatus = typeof DRAFT_MONTHLY_INCREASE_STATUS;

/** Plus aucun montant en brouillon (série 60 → 500 publiée). */
export const DRAFT_MONTHLY_INCREASE_AMOUNTS = [] as const;

export type DraftMonthlyIncreaseAmount = (typeof DRAFT_MONTHLY_INCREASE_AMOUNTS)[number];

export interface DraftMonthlyIncreaseEntry {
  amount: DraftMonthlyIncreaseAmount;
  status: DraftMonthlyIncreaseStatus;
}

export const DRAFT_MONTHLY_INCREASE_ENTRIES: readonly DraftMonthlyIncreaseEntry[] =
  DRAFT_MONTHLY_INCREASE_AMOUNTS.map((amount) => ({
    amount,
    status: DRAFT_MONTHLY_INCREASE_STATUS,
  }));

export function isDraftMonthlyIncreaseAmount(
  value: number,
): value is DraftMonthlyIncreaseAmount {
  return (DRAFT_MONTHLY_INCREASE_AMOUNTS as readonly number[]).includes(value);
}

/**
 * Catalogue futur après publication : publiés + brouillons restants (données uniquement).
 */
export function buildFuturePublishedCatalog(
  published: readonly number[],
  drafts: readonly number[] = DRAFT_MONTHLY_INCREASE_AMOUNTS,
): number[] {
  return [...published, ...drafts].sort((a, b) => a - b);
}
