/**
 * Publication des fiches 60 → 500 € (effectuée).
 *
 * Source de vérité :
 * - publiés : `PUBLISHED_MONTHLY_INCREASE_AMOUNTS` / `MONTHLY_INCREASE_AMOUNTS`
 *   dans `src/site/augmentation-salaire-mensuelle/config.ts` (50 → 500)
 * - brouillons : `DRAFT_MONTHLY_INCREASE_AMOUNTS` dans `./amounts.ts` (vide)
 */

import {
  MONTHLY_INCREASE_AMOUNTS,
  PUBLISHED_MONTHLY_INCREASE_AMOUNTS,
} from "@/site/augmentation-salaire-mensuelle/config";
import { DRAFT_MONTHLY_INCREASE_AMOUNTS } from "./amounts";

export const PUBLICATION_CHECKLIST = [
  "Ajouter DRAFT_MONTHLY_INCREASE_AMOUNTS à MONTHLY_INCREASE_AMOUNTS (config.ts)",
  "Vider DRAFT_MONTHLY_INCREASE_AMOUNTS (ou le marquer publié)",
  "Brancher getNearbyMonthlyIncreaseAmounts sur le catalogue complet (ou reprendre getPreparedNearbyAmounts)",
  "Vérifier generateStaticParams / sitemap / plan du site (automatiques via la liste publiée)",
  "Mettre à jour les tests de série (URLs, nearby, anti-fuite de montants)",
  "Lancer lint, tests et build",
] as const;

/** Vérifie que la vague 60 → 500 est publiée et que les brouillons sont vides. */
export function assertExtendedSeriesPublished(): void {
  if (PUBLISHED_MONTHLY_INCREASE_AMOUNTS !== MONTHLY_INCREASE_AMOUNTS) {
    throw new Error(
      "PUBLISHED_MONTHLY_INCREASE_AMOUNTS doit rester l'alias de MONTHLY_INCREASE_AMOUNTS.",
    );
  }
  if (DRAFT_MONTHLY_INCREASE_AMOUNTS.length !== 0) {
    throw new Error(
      `Des brouillons restent non publiés : ${DRAFT_MONTHLY_INCREASE_AMOUNTS.join(", ")}.`,
    );
  }
  if (MONTHLY_INCREASE_AMOUNTS.length !== 46) {
    throw new Error(
      `Attendu 46 montants publiés (50 → 500), reçu ${MONTHLY_INCREASE_AMOUNTS.length}.`,
    );
  }
  if (MONTHLY_INCREASE_AMOUNTS[0] !== 50 || MONTHLY_INCREASE_AMOUNTS[45] !== 500) {
    throw new Error("La série publiée doit aller de 50 € à 500 €.");
  }
  for (let i = 0; i < MONTHLY_INCREASE_AMOUNTS.length; i += 1) {
    if (MONTHLY_INCREASE_AMOUNTS[i] !== 50 + i * 10) {
      throw new Error(`Montant inattendu à l'index ${i} : ${MONTHLY_INCREASE_AMOUNTS[i]}.`);
    }
  }
}

/** @deprecated Remplacé par assertExtendedSeriesPublished après publication. */
export function assertDraftsNotPublished(): void {
  assertExtendedSeriesPublished();
}
