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
import {
  DRAFT_GROSS_TO_NET_AMOUNTS,
  buildFuturePublishedCatalog,
} from "./amounts";

export interface GrossToNetIndexRow {
  grossMonthly: number;
  netMonthly: number;
  href: string;
  grossLabel: string;
  netLabel: string;
  isPilot: boolean;
}

/**
 * Tableau index de la série (brut → net) pour un profil donné.
 * Généré automatiquement à partir du catalogue fourni.
 */
export function buildGrossToNetIndexRows(
  catalog: readonly number[] = buildFuturePublishedCatalog(GROSS_TO_NET_AMOUNTS),
  profile: EmploymentProfile = GROSS_TO_NET_DEFAULT_PROFILE,
): GrossToNetIndexRow[] {
  return catalog.map((grossMonthly) => {
    const netMonthly = estimateNetMonthlyFromGross(grossMonthly, profile);
    return {
      grossMonthly,
      netMonthly,
      href: grossToNetPath(grossMonthly),
      grossLabel: formatGrossShort(grossMonthly),
      netLabel: formatGrossShort(Math.round(netMonthly)),
      isPilot: grossMonthly === 1000,
    };
  });
}

/** Index brouillon : pilote 1 000 € + tous les montants draft. */
export function buildDraftGrossToNetIndexRows(
  profile: EmploymentProfile = GROSS_TO_NET_DEFAULT_PROFILE,
): GrossToNetIndexRow[] {
  return buildGrossToNetIndexRows(
    buildFuturePublishedCatalog(GROSS_TO_NET_AMOUNTS, DRAFT_GROSS_TO_NET_AMOUNTS),
    profile,
  );
}
