/**
 * Brouillons de la série « augmentation mensuelle » : 60 € → 500 € (pas de 10 €).
 * La fiche 50 € est déjà publiée. Aucun de ces montants ne doit figurer dans
 * MONTHLY_INCREASE_AMOUNTS tant qu'ils restent en brouillon.
 */

export const DRAFT_MONTHLY_INCREASE_STATUS = "draft" as const;

export type DraftMonthlyIncreaseStatus = typeof DRAFT_MONTHLY_INCREASE_STATUS;

/** Montants préparés, non publiés (pas de 10 €). */
export const DRAFT_MONTHLY_INCREASE_AMOUNTS = [
  60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240,
  250, 260, 270, 280, 290, 300, 310, 320, 330, 340, 350, 360, 370, 380, 390, 400, 410, 420,
  430, 440, 450, 460, 470, 480, 490, 500,
] as const;

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
 * Catalogue futur après publication : publiés + brouillons (données uniquement).
 * Ne pas utiliser pour generateStaticParams / sitemap tant que le statut est draft.
 */
export function buildFuturePublishedCatalog(
  published: readonly number[],
  drafts: readonly number[] = DRAFT_MONTHLY_INCREASE_AMOUNTS,
): number[] {
  return [...published, ...drafts].sort((a, b) => a - b);
}
