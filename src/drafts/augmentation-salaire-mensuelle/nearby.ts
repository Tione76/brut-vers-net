import {
  MONTHLY_INCREASE_AMOUNTS,
  monthlyIncreasePath,
  type MonthlyIncreaseAmount,
} from "@/site/augmentation-salaire-mensuelle/config";
import { formatIncreaseShort } from "@/site/augmentation-salaire-mensuelle/data";
import {
  DRAFT_MONTHLY_INCREASE_AMOUNTS,
  type DraftMonthlyIncreaseAmount,
} from "./amounts";

export type FutureMonthlyIncreaseAmount = MonthlyIncreaseAmount | DraftMonthlyIncreaseAmount;

/**
 * Montants proches sur le catalogue futur (50 € publié + brouillons 60 → 500).
 * Priorité aux voisins les plus proches (ex. 180 → 170, 190, 160, 200…).
 * Données préparatoires uniquement : aucun maillage public.
 */
export function getPreparedNearbyAmounts(
  grossMonthlyIncrease: number,
  catalog: readonly number[] = [
    ...MONTHLY_INCREASE_AMOUNTS,
    ...DRAFT_MONTHLY_INCREASE_AMOUNTS,
  ],
): FutureMonthlyIncreaseAmount[] {
  return catalog
    .filter((amount) => amount !== grossMonthlyIncrease)
    .slice()
    .sort((a, b) => {
      const distanceA = Math.abs(a - grossMonthlyIncrease);
      const distanceB = Math.abs(b - grossMonthlyIncrease);
      if (distanceA !== distanceB) {
        return distanceA - distanceB;
      }
      return a - b;
    })
    .slice(0, 7) as FutureMonthlyIncreaseAmount[];
}

export function getPreparedNearbyLinks(grossMonthlyIncrease: number) {
  return getPreparedNearbyAmounts(grossMonthlyIncrease).map((amount) => ({
    grossMonthlyIncrease: amount,
    href: monthlyIncreasePath(amount),
    label: `Augmentation mensuelle de ${formatIncreaseShort(amount)} brut`,
  }));
}
