/**
 * Logique de sélection partagée par les graphiques consultables.
 *
 * Ces fonctions sont pures pour rester testables sans DOM : le composant se
 * contente d'y brancher ses gestionnaires d'événements. Une observation
 * verrouillée reste affichée tant que l'utilisateur ne la libère pas.
 */

export interface ChartSelection {
  index: number;
  pinned: boolean;
}

export function clampIndex(index: number, count: number): number {
  return Math.min(count - 1, Math.max(0, index));
}

/**
 * Clic ou toucher : verrouille l'observation visée. Recliquer la même la
 * libère, cliquer ailleurs déplace la sélection sans la déverrouiller.
 */
export function selectionOnClick(
  current: ChartSelection,
  index: number,
  released: ChartSelection,
  count: number,
): ChartSelection {
  const target = clampIndex(index, count);
  if (current.pinned && current.index === target) return released;
  return { index: target, pinned: true };
}

/**
 * Échap libère, les flèches et Début / Fin déplacent la sélection.
 * `null` signale une touche non gérée, à laisser au navigateur.
 */
export function selectionOnKey(
  current: ChartSelection,
  key: string,
  visible: number,
  released: ChartSelection,
  count: number,
): ChartSelection | null {
  if (key === "Escape") return current.pinned ? released : null;
  const targets: Record<string, number | undefined> = {
    ArrowLeft: visible - 1,
    ArrowRight: visible + 1,
    Home: 0,
    End: count - 1,
  };
  const target = targets[key];
  if (target === undefined) return null;
  return { index: clampIndex(target, count), pinned: true };
}

/** Tant qu'une observation est verrouillée, le survol ne la remplace pas. */
export function visibleIndex(current: ChartSelection, hoverIndex: number | null): number {
  if (current.pinned) return current.index;
  return hoverIndex ?? current.index;
}
