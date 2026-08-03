/**
 * Publication future des brouillons 1 050 → 6 000 € (série brut mensuel → net).
 *
 * Source de vérité actuelle :
 * - SSG pilote : `GROSS_TO_NET_AMOUNTS` = [1000] dans `src/site/salaire-brut-net/config.ts`
 * - indexables : `PUBLISHED_GROSS_TO_NET_AMOUNTS` = [] (hors sitemap)
 * - brouillons : `DRAFT_GROSS_TO_NET_AMOUNTS` dans `./amounts.ts`
 *
 * Cette série n'est pas encore enregistrée dans `public-pages.ts`.
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

/** Rappel : tant que les listes sont disjointes, rien n'est publié. */
export function assertDraftsNotPublished(): void {
  const ssg = new Set<number>(GROSS_TO_NET_AMOUNTS as readonly number[]);
  const published = new Set<number>(PUBLISHED_GROSS_TO_NET_AMOUNTS as readonly number[]);

  for (const amount of DRAFT_GROSS_TO_NET_AMOUNTS) {
    if (ssg.has(amount)) {
      throw new Error(`Le brouillon ${amount} est déjà dans GROSS_TO_NET_AMOUNTS.`);
    }
    if (published.has(amount)) {
      throw new Error(`Le brouillon ${amount} est déjà dans PUBLISHED_GROSS_TO_NET_AMOUNTS.`);
    }
  }

  if ((PUBLISHED_GROSS_TO_NET_AMOUNTS as readonly number[]).length > 0) {
    throw new Error(
      "PUBLISHED_GROSS_TO_NET_AMOUNTS doit rester vide tant que la série n'est pas publiée.",
    );
  }

  if (DRAFT_GROSS_TO_NET_AMOUNTS_HALF_1.length + DRAFT_GROSS_TO_NET_AMOUNTS_HALF_2.length !==
    DRAFT_GROSS_TO_NET_AMOUNTS.length) {
    throw new Error("Les moitiés de publication ne couvrent pas tous les brouillons.");
  }
}
