import {
  NET_TO_GROSS_AMOUNTS,
  netToGrossPath,
} from "@/site/salaire-net-brut/config";
import { DRAFT_NET_TO_GROSS_AMOUNTS } from "./amounts";

/**
 * Priorité historique des montants proches (centaines publiées).
 * Conservée comme référence ; le nearby brouillon utilise la distance sur le catalogue futur.
 */
export const FUTURE_NEARBY_PREFERRED = [
  1600, 1700, 1800, 1900, 2000, 2500, 3000, 1500, 2100, 2200, 2300, 2400, 2600, 2700, 2800,
  2900, 3500, 4000, 4500, 5000, 5500, 6000, 3100, 3200, 3300, 3400, 3600, 3700, 3800, 3900,
  4100, 4200, 4300, 4400, 4600, 4700, 4800, 4900, 5100, 5200, 5300, 5400, 5600, 5700, 5800,
  5900,
] as const;

export type FutureNetToGrossAmount = number;

/**
 * Montants proches pour la préparation brouillon : voisins les plus proches
 * dans le catalogue futur (publiés + drafts), max 7, sans auto-lien.
 *
 * Le Nearby PUBLIC reste `getSeriesNearbyAmounts` (catalogue publié uniquement).
 */
export function getPreparedNearbyAmounts(
  netMonthly: number,
  catalog: readonly number[] = [...NET_TO_GROSS_AMOUNTS, ...DRAFT_NET_TO_GROSS_AMOUNTS],
): FutureNetToGrossAmount[] {
  return catalog
    .filter((amount) => amount !== netMonthly)
    .slice()
    .sort((a, b) => {
      const distanceA = Math.abs(a - netMonthly);
      const distanceB = Math.abs(b - netMonthly);
      if (distanceA !== distanceB) {
        return distanceA - distanceB;
      }
      return a - b;
    })
    .slice(0, 7);
}

export function getPreparedNearbyLinks(netMonthly: number) {
  return getPreparedNearbyAmounts(netMonthly).map((amount) => ({
    netMonthly: amount,
    href: netToGrossPath(amount),
  }));
}
