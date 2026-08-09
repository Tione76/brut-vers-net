/**
 * Publication vague 1 effectuée (Hub + Index + 1 000 → 3 500).
 * Vague 2 : fiches 3 550 → 6 000 encore en brouillon.
 */

import {
  GROSS_TO_NET_AMOUNTS,
  PUBLISHED_GROSS_TO_NET_AMOUNTS,
} from "@/site/salaire-brut-net/config";
import {
  DRAFT_GROSS_TO_NET_AMOUNTS,
  DRAFT_GROSS_TO_NET_AMOUNTS_HALF_1,
  DRAFT_GROSS_TO_NET_AMOUNTS_HALF_2,
} from "./amounts";

export const PUBLICATION_CHECKLIST_HALF_1 = [
  "Publier dès la vague 1 le hub « Tous les salaires bruts mensuels convertis en net » (DRAFT_GROSS_TO_NET_HUB_PATH) + public-pages",
  "Publier dès la vague 1 la page Index (DRAFT_GROSS_TO_NET_INDEX_PATH) + public-pages",
  "Ajouter le pilote 1 000 € à PUBLISHED_GROSS_TO_NET_AMOUNTS",
  "Ajouter DRAFT_GROSS_TO_NET_AMOUNTS_HALF_1 (1 050 → 3 500) à GROSS_TO_NET_AMOUNTS",
  "Aligner PUBLISHED_GROSS_TO_NET_AMOUNTS sur les montants publiés (SSG + sitemap)",
  "Enregistrer la série dans public-pages.ts (comme net→brut)",
  "Brancher getNearbyGrossToNetAmounts sur le catalogue publié (ou reprendre getPreparedNearbyAmounts)",
  "Afficher le maillage croisé (inverseLink) uniquement si getInverseNetToGrossLink(...) !== null",
  "Retirer de DRAFT_GROSS_TO_NET_AMOUNTS les montants de la moitié 1",
  "Mettre à jour les tests anti-fuite / nearby / hub / index",
  "Lancer lint, tests et build",
] as const;

export const PUBLICATION_CHECKLIST_HALF_2 = [
  "Publier uniquement les fiches restantes DRAFT_GROSS_TO_NET_AMOUNTS_HALF_2 (3 550 → 6 000)",
  "Aligner PUBLISHED_GROSS_TO_NET_AMOUNTS (hub et index déjà publiés en vague 1)",
  "Vider DRAFT_GROSS_TO_NET_AMOUNTS (série complète publiée)",
  "Vérifier que le Hub et l'Index se complètent automatiquement via le catalogue",
  "Vérifier montants proches et maillage croisé sur un échantillon haut de gamme",
  "Mettre à jour les tests",
  "Lancer lint, tests et build",
] as const;

export const PUBLICATION_CHECKLIST = [
  ...PUBLICATION_CHECKLIST_HALF_1,
  ...PUBLICATION_CHECKLIST_HALF_2,
] as const;

/** Vérifie que la vague 1 est publiée et que seule la moitié 2 reste en brouillon. */
export function assertHalf1Published(): void {
  if (PUBLISHED_GROSS_TO_NET_AMOUNTS !== GROSS_TO_NET_AMOUNTS) {
    throw new Error(
      "PUBLISHED_GROSS_TO_NET_AMOUNTS doit rester l'alias de GROSS_TO_NET_AMOUNTS.",
    );
  }
  if (GROSS_TO_NET_AMOUNTS.length !== 51) {
    throw new Error(
      `Attendu 51 montants publiés (1 000 → 3 500), reçu ${GROSS_TO_NET_AMOUNTS.length}.`,
    );
  }
  if (GROSS_TO_NET_AMOUNTS[0] !== 1000 || GROSS_TO_NET_AMOUNTS[50] !== 3500) {
    throw new Error("La vague 1 publiée doit aller de 1 000 € à 3 500 €.");
  }
  if (DRAFT_GROSS_TO_NET_AMOUNTS_HALF_1.length !== 0) {
    throw new Error("DRAFT_GROSS_TO_NET_AMOUNTS_HALF_1 doit être vide après publication.");
  }
  if (DRAFT_GROSS_TO_NET_AMOUNTS.length !== 50 || DRAFT_GROSS_TO_NET_AMOUNTS_HALF_2.length !== 50) {
    throw new Error("Il doit rester exactement 50 brouillons (3 550 → 6 000).");
  }
  if (DRAFT_GROSS_TO_NET_AMOUNTS[0] !== 3550 || DRAFT_GROSS_TO_NET_AMOUNTS[49] !== 6000) {
    throw new Error("Les brouillons restants doivent aller de 3 550 € à 6 000 €.");
  }

  const published = new Set<number>(PUBLISHED_GROSS_TO_NET_AMOUNTS as readonly number[]);
  for (const amount of DRAFT_GROSS_TO_NET_AMOUNTS) {
    if (published.has(amount)) {
      throw new Error(`Le brouillon ${amount} est déjà publié.`);
    }
  }
}

/** @deprecated Remplacé par assertHalf1Published après vague 1. */
export function assertDraftsNotPublished(): void {
  assertHalf1Published();
}
