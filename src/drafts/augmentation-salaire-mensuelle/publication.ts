/**
 * Publication future des brouillons 60 → 500 €.
 *
 * Source de vérité actuelle :
 * - publiés : `PUBLISHED_MONTHLY_INCREASE_AMOUNTS` / `MONTHLY_INCREASE_AMOUNTS`
 *   dans `src/site/augmentation-salaire-mensuelle/config.ts` (pilote 50 €)
 * - brouillons : `DRAFT_MONTHLY_INCREASE_AMOUNTS` dans `./amounts.ts`
 *
 * Une publication idéale se limite à déplacer les montants brouillons
 * vers la liste publiée (et à vider les brouillons), puis à brancher
 * le maillage « Montants proches » sur le catalogue complet.
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

/** Rappel : tant que les listes sont disjointes, rien n'est publié. */
export function assertDraftsNotPublished(): void {
  const published = new Set<number>(PUBLISHED_MONTHLY_INCREASE_AMOUNTS as readonly number[]);
  for (const amount of DRAFT_MONTHLY_INCREASE_AMOUNTS) {
    if (published.has(amount)) {
      throw new Error(`Le brouillon ${amount} est déjà dans MONTHLY_INCREASE_AMOUNTS.`);
    }
  }
  if (PUBLISHED_MONTHLY_INCREASE_AMOUNTS !== MONTHLY_INCREASE_AMOUNTS) {
    throw new Error(
      "PUBLISHED_MONTHLY_INCREASE_AMOUNTS doit rester l'alias de MONTHLY_INCREASE_AMOUNTS.",
    );
  }
}
