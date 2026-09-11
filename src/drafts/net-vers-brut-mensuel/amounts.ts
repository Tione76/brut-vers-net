/**
 * Brouillons intermédiaires Net → Brut : pas de 10 € restants.
 *
 * Publiés : centaines 1 500 → 6 000
 * + vague 1 (1 510 → 1 990)
 * + vague 2 (2 010 → 2 490)
 * + vague 3 (2 510 → 2 990)
 * + vague 4 (3 010 → 3 490)
 * + vague 5 (3 510 → 3 990)
 * + vague 6 (4 010 → 4 490)
 * + vague 7 (4 510 → 4 990)
 * + vague 8 (5 010 → 5 490)
 * + vague 9 (5 510 → 5 990)
 *
 * Brouillons restants : aucun (série complète, 451 fiches).
 */

import { NET_TO_GROSS_AMOUNTS } from "@/site/salaire-net-brut/config";

export const DRAFT_NET_TO_GROSS_STATUS = "draft" as const;

export type DraftNetToGrossStatus = typeof DRAFT_NET_TO_GROSS_STATUS;

/**
 * Montants nets intermédiaires encore en brouillon (pas de 10 €).
 * Vagues 1 à 9 publiées : plus aucun brouillon.
 */
export const DRAFT_NET_TO_GROSS_AMOUNTS: readonly number[] = [];

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
