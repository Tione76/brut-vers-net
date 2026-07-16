import type { ChildrenCountOption, FamilySituation } from "./types";

/**
 * Foyer sans paramètre familial utile pour un taux « personnalisé ».
 * Dans ce cas, le mode personnalisé doit converger vers le taux neutre (mode simple).
 */
export function isNeutralEquivalentHousehold(
  situation: FamilySituation,
  children: ChildrenCountOption,
): boolean {
  if (children !== 0) {
    return false;
  }
  return situation === "single" || situation === "divorced";
}
