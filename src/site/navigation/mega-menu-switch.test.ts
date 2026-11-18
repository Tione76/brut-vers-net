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
      "salaires-emploi",
      "aides-droits",
      "banque-epargne",
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

    openMenu("salaires-emploi");
    expect(openId).toBe("salaires-emploi");
    expect(openId).not.toBe("calculateurs");

    openMenu("aides-droits");
    expect(openId).toBe("aides-droits");

    openMenu("banque-epargne");
    expect(openId).toBe("banque-epargne");

    openMenu("calculateurs");
    expect(openId).toBe("calculateurs");

    // Lien sans panneau : ferme l'état ouvert
    closeMenu();
    expect(openId).toBeNull();
  });

  it("Conserve Actualités comme lien direct sans panneau", () => {
    const actu = getMainNavItems().find((item) => item.id === "actu");
    expect(actu?.kind).toBe("link");
    if (actu?.kind === "link") {
      expect(actu.href).toBe("/actu");
    }
  });
});
