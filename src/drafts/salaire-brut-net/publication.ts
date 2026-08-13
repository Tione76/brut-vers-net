/**
 * Publication vague 2 effectuée : fiches 3 550 → 6 000.
 * Série complète : 1 000 → 6 000 (101 fiches) dans GROSS_TO_NET_AMOUNTS.
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

/** Vérifie que la série complète 1 000 → 6 000 est publiée et que les brouillons sont vides. */
export function assertSeriesFullyPublished(): void {
  if (PUBLISHED_GROSS_TO_NET_AMOUNTS !== GROSS_TO_NET_AMOUNTS) {
    throw new Error(
      "PUBLISHED_GROSS_TO_NET_AMOUNTS doit rester l'alias de GROSS_TO_NET_AMOUNTS.",
    );
  }
  if (GROSS_TO_NET_AMOUNTS.length !== 101) {
    throw new Error(
      `Attendu 101 montants publiés (1 000 → 6 000), reçu ${GROSS_TO_NET_AMOUNTS.length}.`,
    );
  }
  if (GROSS_TO_NET_AMOUNTS[0] !== 1000 || GROSS_TO_NET_AMOUNTS[100] !== 6000) {
    throw new Error("La série publiée doit aller de 1 000 € à 6 000 €.");
  }
  for (let i = 0; i < GROSS_TO_NET_AMOUNTS.length; i += 1) {
    if (GROSS_TO_NET_AMOUNTS[i] !== 1000 + i * 50) {
      throw new Error(`Montant inattendu à l'index ${i} : ${GROSS_TO_NET_AMOUNTS[i]}.`);
    }
  }
  if (DRAFT_GROSS_TO_NET_AMOUNTS_HALF_1.length !== 0) {
    throw new Error("DRAFT_GROSS_TO_NET_AMOUNTS_HALF_1 doit être vide après publication.");
  }
  if (DRAFT_GROSS_TO_NET_AMOUNTS_HALF_2.length !== 0) {
    throw new Error("DRAFT_GROSS_TO_NET_AMOUNTS_HALF_2 doit être vide après publication.");
  }
  if (DRAFT_GROSS_TO_NET_AMOUNTS.length !== 0) {
    throw new Error(
      `Des brouillons restent non publiés : ${DRAFT_GROSS_TO_NET_AMOUNTS.join(", ")}.`,
    );
  }
}

/** Alias explicite pour la vague 2. */
export function assertHalf2Published(): void {
  assertSeriesFullyPublished();
}

/** @deprecated Remplacé par assertSeriesFullyPublished après vague 2. */
export function assertHalf1Published(): void {
  assertSeriesFullyPublished();
}

/** @deprecated Remplacé par assertSeriesFullyPublished après vague 2. */
export function assertDraftsNotPublished(): void {
  assertSeriesFullyPublished();
}
