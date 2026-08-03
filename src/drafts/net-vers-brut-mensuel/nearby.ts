import {
  NET_TO_GROSS_AMOUNTS,
  netToGrossPath,
  type NetToGrossAmount,
} from "@/site/salaire-net-brut/config";
import { DRAFT_NET_TO_GROSS_AMOUNTS } from "./amounts";

/**
 * Priorité des montants proches sur la série complète 1 500 → 6 000 €.
 * Conservée ici comme référence ; le maillage public utilise NEARBY_PREFERRED
 * dans page-1500-content.ts.
 */
export const FUTURE_NEARBY_PREFERRED = [
  1600, 1700, 1800, 1900, 2000, 2500, 3000, 1500, 2100, 2200, 2300, 2400, 2600, 2700, 2800,
  2900, 3500, 4000, 4500, 5000, 5500, 6000, 3100, 3200, 3300, 3400, 3600, 3700, 3800, 3900,
  4100, 4200, 4300, 4400, 4600, 4700, 4800, 4900, 5100, 5200, 5300, 5400, 5600, 5700, 5800,
  5900,
] as const;

export type FutureNetToGrossAmount = NetToGrossAmount;

/**
 * Même logique que `getSeriesNearbyAmounts`, sur le catalogue publié (+ brouillons restants).
 */
export function getPreparedNearbyAmounts(
  netMonthly: number,
  catalog: readonly number[] = [...NET_TO_GROSS_AMOUNTS, ...DRAFT_NET_TO_GROSS_AMOUNTS],
): FutureNetToGrossAmount[] {
  const catalogSet = new Set(catalog);
  const ordered: number[] = [];

  for (const amount of FUTURE_NEARBY_PREFERRED) {
    if (amount !== netMonthly && catalogSet.has(amount) && !ordered.includes(amount)) {
      ordered.push(amount);
    }
  }
  for (const amount of catalog) {
    if (amount !== netMonthly && !ordered.includes(amount)) {
      ordered.push(amount);
    }
  }

  return ordered.slice(0, 7) as FutureNetToGrossAmount[];
}

export function getPreparedNearbyLinks(netMonthly: number) {
  return getPreparedNearbyAmounts(netMonthly).map((amount) => ({
    netMonthly: amount,
    href: netToGrossPath(amount),
  }));
}
