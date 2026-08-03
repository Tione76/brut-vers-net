/**
 * Brouillons de la série « salaire brut mensuel → net » : 1 050 € → 6 000 € (pas de 50 €).
 * La fiche pilote 1 000 € reste dans GROSS_TO_NET_AMOUNTS (SSG local, hors sitemap).
 * Aucun de ces montants ne doit figurer dans GROSS_TO_NET_AMOUNTS tant qu'ils restent en brouillon.
 */

export const DRAFT_GROSS_TO_NET_STATUS = "draft" as const;

export type DraftGrossToNetStatus = typeof DRAFT_GROSS_TO_NET_STATUS;

/** Montants préparés, non publiés (pas de 50 €). 1 050 → 6 000 = 100 fiches. */
export const DRAFT_GROSS_TO_NET_AMOUNTS: readonly number[] = Array.from(
  { length: (6000 - 1050) / 50 + 1 },
  (_, index) => 1050 + index * 50,
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
 * Catalogue futur après publication : pilote / publiés + brouillons (données uniquement).
 * Ne pas utiliser pour generateStaticParams / sitemap tant que le statut est draft.
 */
export function buildFuturePublishedCatalog(
  published: readonly number[],
  drafts: readonly number[] = DRAFT_GROSS_TO_NET_AMOUNTS,
): number[] {
  return [...new Set([...published, ...drafts])].sort((a, b) => a - b);
}

/** Première moitié à publier (hors pilote 1 000 €) : 1 050 → 3 500. */
export const DRAFT_GROSS_TO_NET_AMOUNTS_HALF_1: readonly number[] =
  DRAFT_GROSS_TO_NET_AMOUNTS.filter((amount) => amount <= 3500);

/** Seconde moitié : 3 550 → 6 000. */
export const DRAFT_GROSS_TO_NET_AMOUNTS_HALF_2: readonly number[] =
  DRAFT_GROSS_TO_NET_AMOUNTS.filter((amount) => amount > 3500);
