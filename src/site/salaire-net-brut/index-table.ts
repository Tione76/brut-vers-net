import { PUBLISHED_NET_TO_GROSS_AMOUNTS, netToGrossPath } from "./config";
import { estimateGrossMonthlyFromNet, formatNetShort } from "./data";

export interface NetToGrossIndexRow {
  netMonthly: number;
  grossNonExecutive: number;
  grossExecutive: number;
  grossPublicService: number;
  href: string;
  netLabel: string;
  /** Repère visuel tous les 500 € (1 500, 2 000, …). */
  isMilestone: boolean;
}

export function netToGrossIndexRowId(netMonthly: number): string {
  return `index-row-${netMonthly}`;
}

export function isNetToGrossMilestoneAmount(netMonthly: number): boolean {
  return Number.isFinite(netMonthly) && netMonthly > 0 && netMonthly % 500 === 0;
}

/** Parse une saisie utilisateur (espaces, €, virgule). */
export function parseNetSearchInput(raw: string): number | null {
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

export interface PublishedNetLookup {
  amount: number;
  exact: boolean;
}

export function findPublishedNetNearest(
  target: number,
  catalog: readonly number[] = PUBLISHED_NET_TO_GROSS_AMOUNTS,
): PublishedNetLookup | null {
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
 * Tableau index de la série (net → brut), catalogue publié uniquement.
 */
export function buildNetToGrossIndexRows(
  catalog: readonly number[] = PUBLISHED_NET_TO_GROSS_AMOUNTS,
): NetToGrossIndexRow[] {
  return catalog.map((netMonthly) => {
    const grossNonExecutive = estimateGrossMonthlyFromNet(netMonthly, "nonExecutive");
    const grossExecutive = estimateGrossMonthlyFromNet(netMonthly, "executive");
    const grossPublicService = estimateGrossMonthlyFromNet(netMonthly, "publicService");

    return {
      netMonthly,
      grossNonExecutive,
      grossExecutive,
      grossPublicService,
      href: netToGrossPath(netMonthly),
      netLabel: formatNetShort(netMonthly),
      isMilestone: isNetToGrossMilestoneAmount(netMonthly),
    };
  });
}
