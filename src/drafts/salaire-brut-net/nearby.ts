import {
  GROSS_TO_NET_AMOUNTS,
  grossToNetPath,
} from "@/site/salaire-brut-net/config";
import { formatGrossShort } from "@/site/salaire-brut-net/data";
import { DRAFT_GROSS_TO_NET_AMOUNTS } from "./amounts";

/**
 * Montants proches sur le catalogue futur (publiés + brouillons restants).
 */
export function getPreparedNearbyAmounts(
  grossMonthly: number,
  catalog: readonly number[] = [
    ...GROSS_TO_NET_AMOUNTS,
    ...DRAFT_GROSS_TO_NET_AMOUNTS,
  ],
): number[] {
  return catalog
    .filter((amount) => amount !== grossMonthly)
    .slice()
    .sort((a, b) => {
      const distanceA = Math.abs(a - grossMonthly);
      const distanceB = Math.abs(b - grossMonthly);
      if (distanceA !== distanceB) {
        return distanceA - distanceB;
      }
      return a - b;
    })
    .slice(0, 7);
}

export function getPreparedNearbyLinks(grossMonthly: number) {
  return getPreparedNearbyAmounts(grossMonthly).map((amount) => ({
    grossMonthly: amount,
    href: grossToNetPath(amount),
    label: `${formatGrossShort(amount)} brut en net`,
  }));
}
