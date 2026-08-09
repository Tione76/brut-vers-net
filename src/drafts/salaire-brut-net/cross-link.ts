/**
 * Compat brouillon : réexporte le maillage croisé publié + catalogue futur.
 */

export {
  CROSS_LINK_MAX_DISTANCE_EUR,
  findClosestCatalogAmount,
  getInverseGrossToNetLink,
  getInverseNetToGrossLink,
  type InverseGrossToNetLink,
  type InverseNetToGrossLink,
} from "@/site/salaire-brut-net/cross-link";

import {
  GROSS_TO_NET_AMOUNTS,
} from "@/site/salaire-brut-net/config";
import {
  getInverseGrossToNetLink as getPublishedInverseGrossToNetLink,
} from "@/site/salaire-brut-net/cross-link";
import type { EmploymentProfile } from "@/site/salary-calculator/types";
import { DRAFT_GROSS_TO_NET_AMOUNTS, buildFuturePublishedCatalog } from "./amounts";

/** Catalogue brut → net futur (publiés + brouillons restants). */
export function getFutureGrossToNetCatalog(): number[] {
  return buildFuturePublishedCatalog(GROSS_TO_NET_AMOUNTS, DRAFT_GROSS_TO_NET_AMOUNTS);
}

/** Sens inverse avec catalogue futur (tests / brouillons). */
export function getInverseGrossToNetLinkOnFutureCatalog(
  netMonthly: number,
  profile?: EmploymentProfile,
) {
  return getPublishedInverseGrossToNetLink(
    netMonthly,
    profile,
    getFutureGrossToNetCatalog(),
  );
}
