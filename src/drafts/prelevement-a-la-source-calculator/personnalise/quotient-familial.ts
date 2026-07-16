import type { ChildrenCountOption, FamilySituation } from "./types";

/**
 * Nombre de parts fiscales (version simplifiée v1).
 * - Célibataire / divorcé : 1 part
 * - Marié / pacsé : 2 parts
 * - Enfants : +0,5 pour les 2 premiers, +1 à partir du 3e
 * - « 7+ » = 7 enfants pour le calcul
 * Note : demi-part parent isolé non appliquée en v1.
 */
export function computeFiscalParts(
  situation: FamilySituation,
  children: ChildrenCountOption,
): number {
  const childCount = children;
  let parts = situation === "married" || situation === "pacs" ? 2 : 1;

  for (let i = 1; i <= childCount; i += 1) {
    parts += i <= 2 ? 0.5 : 1;
  }

  return parts;
}

/** Nombre de demi-parts liées aux enfants uniquement (pour le plafond QF). */
export function computeChildHalfParts(children: ChildrenCountOption): number {
  let halfParts = 0;
  for (let i = 1; i <= children; i += 1) {
    halfParts += i <= 2 ? 1 : 2;
  }
  return halfParts;
}
