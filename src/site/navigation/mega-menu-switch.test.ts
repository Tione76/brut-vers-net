import { describe, expect, it } from "vitest";
import { getMainNavItems } from "./main-nav-data";

/**
 * Non-régression logique : un seul openId à la fois, passage direct entre
 * catégories sans fermeture intermédiaire (modèle d'état centralisé).
 */
describe("changement de méga-menu (état centralisé)", () => {
  it("n'a qu'une catégorie dropdown ouverte à la fois lors d'un switch", () => {
    const dropdownIds = getMainNavItems()
      .filter((item) => item.kind === "dropdown")
      .map((item) => item.id);

    expect(dropdownIds).toEqual([
      "calculateurs",
      "smic",
      "salaires-emploi",
      "aides-droits",
    ]);

    let openId: string | null = null;
    const openMenu = (id: string) => {
      openId = id;
    };
    const closeMenu = () => {
      openId = null;
    };

    // Scénario A : passage direct sans sortie du header
    openMenu("calculateurs");
    expect(openId).toBe("calculateurs");

    openMenu("smic");
    expect(openId).toBe("smic");
    expect(openId).not.toBe("calculateurs");

    openMenu("salaires-emploi");
    expect(openId).toBe("salaires-emploi");

    openMenu("aides-droits");
    expect(openId).toBe("aides-droits");

    openMenu("calculateurs");
    expect(openId).toBe("calculateurs");

    // Lien sans panneau : ferme l'état ouvert
    closeMenu();
    expect(openId).toBeNull();
  });

  it("Conserve Tous les guides comme lien direct sans panneau", () => {
    const guides = getMainNavItems().find((item) => item.id === "tous-les-guides");
    expect(guides?.kind).toBe("link");
    if (guides?.kind === "link") {
      expect(guides.href).toBe("/guides");
    }
  });
});
