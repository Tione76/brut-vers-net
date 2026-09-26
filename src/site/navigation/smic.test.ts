import { describe, expect, it } from "vitest";
import { smicNavigation } from "./smic";
import { guidesNavigation } from "@/site/guides/navigation";

describe("navigation header SMIC", () => {
  it("expose les sous-menus SMIC avec les libellés exacts", () => {
    expect(smicNavigation).toHaveLength(3);
    expect(smicNavigation[0]?.href).toBe("/smic");
    expect(smicNavigation[0]?.shortTitle).toBe("SMIC: montants brut et net");
    expect(smicNavigation[1]?.href).toBe("/smic-selon-nombre-heures");
    expect(smicNavigation[1]?.shortTitle).toBe("SMIC selon le nombre d'heures");
    expect(smicNavigation[2]?.href).toBe("/evolution-smic");
    expect(smicNavigation[2]?.shortTitle).toBe("Évolution du SMIC");
    expect(smicNavigation.map((item) => item.href)).toEqual([
      ...new Set(smicNavigation.map((item) => item.href)),
    ]);
  });

  it("n'apparaît plus dans le dropdown Nos guides", () => {
    expect(guidesNavigation.some((item) => item.slug === "smic")).toBe(false);
  });
});
