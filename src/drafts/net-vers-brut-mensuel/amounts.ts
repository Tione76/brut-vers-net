/**
 * Brouillons intermédiaires Net → Brut : pas de 10 € restants.
 *
 * Publiés : centaines 1 500 → 6 000 + vague 1 (1 510 → 1 990 hors centaines)
 * dans `NET_TO_GROSS_AMOUNTS` / `PUBLISHED_NET_TO_GROSS_AMOUNTS`.
 *
 * Brouillons restants : 2 010 → 5 990 (hors multiples de 100) = 360 fiches.
 */

import { NET_TO_GROSS_AMOUNTS } from "@/site/salaire-net-brut/config";

export const DRAFT_NET_TO_GROSS_STATUS = "draft" as const;

export type DraftNetToGrossStatus = typeof DRAFT_NET_TO_GROSS_STATUS;

/**
 * Montants nets intermédiaires encore en brouillon (pas de 10 €).
 * Vague 1 (1 510 → 1 990) déjà publiée.
 */
export const DRAFT_NET_TO_GROSS_AMOUNTS: readonly number[] = Array.from(
  { length: (5990 - 2010) / 10 + 1 },
  (_, index) => 2010 + index * 10,
).filter((amount) => amount % 100 !== 0);

export type DraftNetToGrossAmount = (typeof DRAFT_NET_TO_GROSS_AMOUNTS)[number];

export interface DraftNetToGrossEntry {
  amount: number;
  status: DraftNetToGrossStatus;
}

export const DRAFT_NET_TO_GROSS_ENTRIES: readonly DraftNetToGrossEntry[] =
  DRAFT_NET_TO_GROSS_AMOUNTS.map((amount) => ({
    amount,
    status: DRAFT_NET_TO_GROSS_STATUS,
  }));

export function isDraftNetToGrossAmount(value: number): boolean {
  return DRAFT_NET_TO_GROSS_AMOUNTS.includes(value);
}

/**
 * Catalogue futur après publication progressive : publiés + brouillons restants.
 */
export function buildFuturePublishedCatalog(
  published: readonly number[] = NET_TO_GROSS_AMOUNTS,
  drafts: readonly number[] = DRAFT_NET_TO_GROSS_AMOUNTS,
): number[] {
  return [...new Set([...published, ...drafts])].sort((a, b) => a - b);
}

/** Découpe les brouillons en lots pour une publication progressive. */
export function buildDraftNetToGrossPublicationBatches(
  batchSize = 45,
  drafts: readonly number[] = DRAFT_NET_TO_GROSS_AMOUNTS,
): number[][] {
  if (batchSize < 1) {
    throw new Error("batchSize doit être >= 1.");
  }
  const batches: number[][] = [];
  for (let index = 0; index < drafts.length; index += batchSize) {
    batches.push([...drafts.slice(index, index + batchSize)]);
  }
  return batches;
}
