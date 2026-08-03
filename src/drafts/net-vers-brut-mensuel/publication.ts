/**
 * Publication des fiches 3 100 → 6 000 € (effectuée).
 *
 * Source de vérité :
 * - publiés : `PUBLISHED_NET_TO_GROSS_AMOUNTS` / `NET_TO_GROSS_AMOUNTS`
 *   dans `src/site/salaire-net-brut/config.ts` (1 500 → 6 000)
 * - brouillons : `DRAFT_NET_TO_GROSS_AMOUNTS` dans `./amounts.ts` (vide)
 */

import { NET_TO_GROSS_AMOUNTS, PUBLISHED_NET_TO_GROSS_AMOUNTS } from "@/site/salaire-net-brut/config";
import { DRAFT_NET_TO_GROSS_AMOUNTS } from "./amounts";

export const PUBLICATION_CHECKLIST = [
  "Ajouter DRAFT_NET_TO_GROSS_AMOUNTS à NET_TO_GROSS_AMOUNTS (config.ts)",
  "Vider DRAFT_NET_TO_GROSS_AMOUNTS (ou le marquer publié)",
  "Étendre NEARBY_PREFERRED dans page-1500-content.ts avec le catalogue futur",
  "Vérifier generateStaticParams / sitemap / plan du site (automatiques via la liste publiée)",
  "Mettre à jour les tests de série (URLs, nearby, anti-fuite de montants)",
  "Lancer lint, tests et build",
] as const;

/** Vérifie que la vague 3 100 → 6 000 est publiée et que les brouillons sont vides. */
export function assertExtendedSeriesPublished(): void {
  if (PUBLISHED_NET_TO_GROSS_AMOUNTS !== NET_TO_GROSS_AMOUNTS) {
    throw new Error("PUBLISHED_NET_TO_GROSS_AMOUNTS doit rester l'alias de NET_TO_GROSS_AMOUNTS.");
  }
  if (DRAFT_NET_TO_GROSS_AMOUNTS.length !== 0) {
    throw new Error(
      `Des brouillons restent non publiés : ${DRAFT_NET_TO_GROSS_AMOUNTS.join(", ")}.`,
    );
  }
  if (NET_TO_GROSS_AMOUNTS.length !== 46) {
    throw new Error(`Attendu 46 montants publiés (1 500 → 6 000), reçu ${NET_TO_GROSS_AMOUNTS.length}.`);
  }
  if (NET_TO_GROSS_AMOUNTS[0] !== 1500 || NET_TO_GROSS_AMOUNTS[45] !== 6000) {
    throw new Error("La série publiée doit aller de 1 500 € à 6 000 €.");
  }
  for (let i = 0; i < NET_TO_GROSS_AMOUNTS.length; i += 1) {
    if (NET_TO_GROSS_AMOUNTS[i] !== 1500 + i * 100) {
      throw new Error(`Montant inattendu à l'index ${i} : ${NET_TO_GROSS_AMOUNTS[i]}.`);
    }
  }
}

/** @deprecated Remplacé par assertExtendedSeriesPublished après publication. */
export function assertDraftsNotPublished(): void {
  assertExtendedSeriesPublished();
}
