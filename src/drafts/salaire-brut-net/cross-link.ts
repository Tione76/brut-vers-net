/**
 * Maillage croisé préparé entre :
 * - série A : salaire brut mensuel → net (`salaire-brut-net`)
 * - série B : salaire net mensuel → brut (`salaire-net-brut`)
 *
 * Aucun affichage public tant que la fiche inverse n'existe pas dans le catalogue fourni.
 * Ne pas importer depuis une route App tant que le maillage n'est pas publié.
 */

import {
  NET_TO_GROSS_AMOUNTS,
  netToGrossPath,
} from "@/site/salaire-net-brut/config";
import { estimateGrossMonthlyFromNet, formatNetShort } from "@/site/salaire-net-brut/data";
import {
  GROSS_TO_NET_AMOUNTS,
  GROSS_TO_NET_DEFAULT_PROFILE,
  grossToNetPath,
} from "@/site/salaire-brut-net/config";
import {
  estimateNetMonthlyFromGross,
  formatGrossShort,
} from "@/site/salaire-brut-net/data";
import type { EmploymentProfile } from "@/site/salary-calculator/types";
import { DRAFT_GROSS_TO_NET_AMOUNTS, buildFuturePublishedCatalog } from "./amounts";

/** Écart max (en €) pour accepter une fiche inverse « proche ». */
export const CROSS_LINK_MAX_DISTANCE_EUR = 50;

export function findClosestCatalogAmount(
  target: number,
  catalog: readonly number[],
  maxDistance = CROSS_LINK_MAX_DISTANCE_EUR,
): number | null {
  if (catalog.length === 0) {
    return null;
  }
  let best: number | null = null;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const amount of catalog) {
    const distance = Math.abs(amount - target);
    if (
      distance < bestDistance ||
      (distance === bestDistance && best !== null && amount < best)
    ) {
      best = amount;
      bestDistance = distance;
    }
  }
  if (best === null || bestDistance > maxDistance) {
    return null;
  }
  return best;
}

export interface InverseNetToGrossLink {
  direction: "gross-to-net → net-to-gross";
  estimatedNetMonthly: number;
  matchedNetMonthly: number;
  href: string;
  label: string;
  teaser: string;
}

/**
 * Depuis une fiche brut → net, retrouve la fiche net → brut la plus proche
 * du net estimé (profil non-cadre par défaut).
 */
export function getInverseNetToGrossLink(
  grossMonthly: number,
  profile: EmploymentProfile = GROSS_TO_NET_DEFAULT_PROFILE,
  netToGrossCatalog: readonly number[] = NET_TO_GROSS_AMOUNTS,
): InverseNetToGrossLink | null {
  const estimatedNetMonthly = Math.round(estimateNetMonthlyFromGross(grossMonthly, profile));
  const matchedNetMonthly = findClosestCatalogAmount(estimatedNetMonthly, netToGrossCatalog);
  if (matchedNetMonthly === null) {
    return null;
  }
  const netLabel = formatNetShort(matchedNetMonthly);
  return {
    direction: "gross-to-net → net-to-gross",
    estimatedNetMonthly,
    matchedNetMonthly,
    href: netToGrossPath(matchedNetMonthly),
    label: `${netLabel} net en brut`,
    teaser: `Vous recherchez l'inverse ? Découvrez quel salaire brut permet d'obtenir environ ${netLabel} net par mois.`,
  };
}

export interface InverseGrossToNetLink {
  direction: "net-to-gross → gross-to-net";
  estimatedGrossMonthly: number;
  matchedGrossMonthly: number;
  href: string;
  label: string;
  teaser: string;
}

/**
 * Depuis une fiche net → brut, retrouve la fiche brut → net la plus proche
 * du brut estimé. Catalogue futur par défaut (pilote + brouillons).
 */
export function getInverseGrossToNetLink(
  netMonthly: number,
  profile: EmploymentProfile = GROSS_TO_NET_DEFAULT_PROFILE,
  grossToNetCatalog: readonly number[] = buildFuturePublishedCatalog(
    GROSS_TO_NET_AMOUNTS,
    DRAFT_GROSS_TO_NET_AMOUNTS,
  ),
): InverseGrossToNetLink | null {
  const estimatedGrossMonthly = Math.round(estimateGrossMonthlyFromNet(netMonthly, profile));
  const matchedGrossMonthly = findClosestCatalogAmount(
    estimatedGrossMonthly,
    grossToNetCatalog,
  );
  if (matchedGrossMonthly === null) {
    return null;
  }
  const grossLabel = formatGrossShort(matchedGrossMonthly);
  return {
    direction: "net-to-gross → gross-to-net",
    estimatedGrossMonthly,
    matchedGrossMonthly,
    href: grossToNetPath(matchedGrossMonthly),
    label: `${grossLabel} brut en net`,
    teaser: `Vous recherchez l'inverse ? Découvrez quel salaire net correspond à environ ${grossLabel} brut par mois.`,
  };
}

/** Catalogue brut → net futur (1 000 + 1 050…6 000). */
export function getFutureGrossToNetCatalog(): number[] {
  return buildFuturePublishedCatalog(GROSS_TO_NET_AMOUNTS, DRAFT_GROSS_TO_NET_AMOUNTS);
}
