import { PUBLISHED_GROSS_TO_NET_AMOUNTS, grossToNetPath } from "./config";
import {
  estimateNetMonthlyFromGross,
  formatEuroAmount,
  formatGrossShort,
} from "./data";

export interface GrossToNetIndexRow {
  grossMonthly: number;
  /** Net non-cadre (compat Hub / affichage simplifié). */
  netMonthly: number;
  netNonExecutive: number;
  netExecutive: number;
  netPublicService: number;
  href: string;
  grossLabel: string;
  netLabel: string;
  /** Repère visuel tous les 500 € (1 000, 1 500, …). */
  isMilestone: boolean;
}

/** Identifiant DOM d'une ligne du tableau Index. */
export function grossToNetIndexRowId(grossMonthly: number): string {
  return `index-row-${grossMonthly}`;
}

/** Montants ronds (1 000, 1 500, 2 000, …) pour repères de lecture. */
export function isGrossToNetMilestoneAmount(grossMonthly: number): boolean {
  return Number.isFinite(grossMonthly) && grossMonthly > 0 && grossMonthly % 500 === 0;
}

/** Parse une saisie utilisateur (espaces, €, virgule). */
export function parseGrossSearchInput(raw: string): number | null {
  const cleaned = raw
    .trim()
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, "")
    .replace(/€/gi, "")
    .replace(",", ".");
  if (!cleaned) {
    return null;
  }
  const value = Number(cleaned);
  if (!Number.isFinite(value) || value <= 0) {
    return null;
  }
  return Math.round(value);
}

export interface PublishedGrossLookup {
  amount: number;
  exact: boolean;
}

/**
 * Trouve le montant publié exact, sinon le plus proche dans le catalogue.
 * Navigation uniquement : aucun recalcul de net.
 */
export function findPublishedGrossNearest(
  target: number,
  catalog: readonly number[] = PUBLISHED_GROSS_TO_NET_AMOUNTS,
): PublishedGrossLookup | null {
  if (!Number.isFinite(target) || catalog.length === 0) {
    return null;
  }
  if ((catalog as readonly number[]).includes(target)) {
    return { amount: target, exact: true };
  }

  let best = catalog[0]!;
  let bestDistance = Math.abs(best - target);
  for (const amount of catalog) {
    const distance = Math.abs(amount - target);
    if (distance < bestDistance || (distance === bestDistance && amount < best)) {
      best = amount;
      bestDistance = distance;
    }
  }
  return { amount: best, exact: false };
}

/**
 * Tableau index de la série (brut → net), catalogue publié uniquement.
 * Les trois nets utilisent les mêmes estimateurs / coefficients que les fiches.
 */
export function buildGrossToNetIndexRows(
  catalog: readonly number[] = PUBLISHED_GROSS_TO_NET_AMOUNTS,
): GrossToNetIndexRow[] {
  return catalog.map((grossMonthly) => {
    const netNonExecutive = estimateNetMonthlyFromGross(grossMonthly, "nonExecutive");
    const netExecutive = estimateNetMonthlyFromGross(grossMonthly, "executive");
    const netPublicService = estimateNetMonthlyFromGross(grossMonthly, "publicService");

    return {
      grossMonthly,
      netMonthly: netNonExecutive,
      netNonExecutive,
      netExecutive,
      netPublicService,
      href: grossToNetPath(grossMonthly),
      grossLabel: formatGrossShort(grossMonthly),
      netLabel: formatEuroAmount(netNonExecutive),
      isMilestone: isGrossToNetMilestoneAmount(grossMonthly),
    };
  });
}
