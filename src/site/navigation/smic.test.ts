import { describe, expect, it } from "vitest";
import { smicNavigation } from "./smic";
import { guidesNavigation } from "@/site/guides/navigation";
import { getMainNavItems } from "./main-nav-data";

describe("navigation header SMIC", () => {
  it("expose les sous-menus SMIC avec les libellés exacts", () => {
    expect(smicNavigation).toHaveLength(5);
    expect(smicNavigation[0]?.href).toBe("/smic");
    expect(smicNavigation[0]?.shortTitle).toBe("SMIC : montants brut et net");
    expect(smicNavigation[1]?.href).toBe("/smic-selon-nombre-heures");
    expect(smicNavigation[1]?.shortTitle).toBe("SMIC selon le nombre d'heures");
    expect(smicNavigation[2]?.href).toBe("/smic-hotelier");
    expect(smicNavigation[2]?.shortTitle).toBe("SMIC hôtelier (HCR)");
    expect(smicNavigation[3]?.href).toBe("/evolution-smic");
    expect(smicNavigation[3]?.shortTitle).toBe("Évolution du SMIC depuis 1950");
    expect(smicNavigation[4]?.href).toBe("/smic-europe");
    expect(smicNavigation[4]?.shortTitle).toBe("SMIC en Europe");
    expect(smicNavigation.map((item) => item.href)).toEqual([
      ...new Set(smicNavigation.map((item) => item.href)),
    ]);
  });

  it("n'apparaît plus dans le dropdown Nos guides", () => {
    expect(guidesNavigation.some((item) => item.slug === "smic")).toBe(false);
  });

  it("est branché dans Aides & droits comme quatrième colonne", () => {
    const aides = getMainNavItems().find((item) => item.id === "aides-droits");
    expect(aides?.kind).toBe("dropdown");
    if (aides?.kind === "dropdown" && aides.panel.kind === "mega") {
      const smicColumn = aides.panel.columns.find((column) => column.id === "smic");
      expect(smicColumn).toBeTruthy();
      expect(smicColumn?.icon).toBe("coins");
      expect(smicColumn?.links.map((link) => link.href)).toEqual(
        smicNavigation.map((item) => item.href),
      );
      expect(smicColumn?.links.map((link) => link.label)).toEqual(
        smicNavigation.map((item) => item.shortTitle),
      );
    }
  });
});
