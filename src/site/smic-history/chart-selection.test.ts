import { describe, expect, it } from "vitest";
import {
  clampIndex,
  selectionOnClick,
  selectionOnKey,
  visibleIndex,
  type ChartSelection,
} from "./chart-selection";

const COUNT = 144;
const RELEASED: ChartSelection = { index: COUNT - 1, pinned: false };

describe("sélection d'une observation sur un graphique consultable", () => {
  it("verrouille l'observation cliquée", () => {
    expect(selectionOnClick(RELEASED, 40, RELEASED, COUNT)).toEqual({ index: 40, pinned: true });
  });

  it("libère la sélection quand on reclique la même observation", () => {
    const pinned: ChartSelection = { index: 40, pinned: true };
    expect(selectionOnClick(pinned, 40, RELEASED, COUNT)).toEqual(RELEASED);
  });

  it("déplace la sélection sans la déverrouiller quand on clique ailleurs", () => {
    const pinned: ChartSelection = { index: 40, pinned: true };
    expect(selectionOnClick(pinned, 41, RELEASED, COUNT)).toEqual({ index: 41, pinned: true });
  });

  it("garde la valeur verrouillée malgré le survol d'une autre observation", () => {
    const pinned: ChartSelection = { index: 40, pinned: true };
    expect(visibleIndex(pinned, 12)).toBe(40);
    expect(visibleIndex(RELEASED, 12)).toBe(12);
    expect(visibleIndex(RELEASED, null)).toBe(RELEASED.index);
  });

  it("libère la sélection avec Échap, et seulement si elle est verrouillée", () => {
    const pinned: ChartSelection = { index: 40, pinned: true };
    expect(selectionOnKey(pinned, "Escape", 40, RELEASED, COUNT)).toEqual(RELEASED);
    expect(selectionOnKey(RELEASED, "Escape", 40, RELEASED, COUNT)).toBeNull();
  });

  it("parcourt les observations au clavier depuis celle qui est affichée", () => {
    expect(selectionOnKey(RELEASED, "ArrowLeft", 40, RELEASED, COUNT)).toEqual({
      index: 39,
      pinned: true,
    });
    expect(selectionOnKey(RELEASED, "ArrowRight", 40, RELEASED, COUNT)).toEqual({
      index: 41,
      pinned: true,
    });
    expect(selectionOnKey(RELEASED, "Home", 40, RELEASED, COUNT)).toEqual({
      index: 0,
      pinned: true,
    });
    expect(selectionOnKey(RELEASED, "End", 40, RELEASED, COUNT)).toEqual({
      index: COUNT - 1,
      pinned: true,
    });
  });

  it("laisse les autres touches au navigateur", () => {
    for (const key of ["Tab", "Enter", " ", "a", "PageDown"]) {
      expect(selectionOnKey(RELEASED, key, 40, RELEASED, COUNT)).toBeNull();
    }
  });

  it("ne sort jamais des observations disponibles", () => {
    expect(clampIndex(-3, COUNT)).toBe(0);
    expect(clampIndex(COUNT + 10, COUNT)).toBe(COUNT - 1);
    expect(selectionOnKey(RELEASED, "ArrowLeft", 0, RELEASED, COUNT)?.index).toBe(0);
    expect(selectionOnKey(RELEASED, "ArrowRight", COUNT - 1, RELEASED, COUNT)?.index).toBe(
      COUNT - 1,
    );
    expect(selectionOnClick(RELEASED, 999, RELEASED, COUNT).index).toBe(COUNT - 1);
  });
});
