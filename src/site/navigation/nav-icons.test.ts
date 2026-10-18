import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getNavIconSrc } from "./NavIcons";
import { getMainNavItems } from "./main-nav-data";

describe("nav icons SVG pack", () => {
  it("résout les cinq icônes carrées du header vers des fichiers existants", () => {
    const items = getMainNavItems();
    for (const item of items) {
      const src = getNavIconSrc(item.icon, "square");
      expect(src, `square manquant pour ${item.id}`).toBeTruthy();
      expect(existsSync(join(process.cwd(), "public", src!.replace(/^\//, "")))).toBe(
        true,
      );
    }
  });

  it("résout les icônes rondes des panneaux et CTA", () => {
    const pairs: Array<{ id: Parameters<typeof getNavIconSrc>[0]; file: string }> = [
      { id: "calculator", file: "16-mega-tous-nos-outils.svg" },
      { id: "coins", file: "14-mega-montants-calculs-smic.svg" },
      { id: "euro", file: "06-mega-remuneration.svg" },
      { id: "briefcase", file: "07-mega-situations-professionnelles.svg" },
      { id: "document", file: "08-mega-fiche-de-paie.svg" },
      { id: "chart", file: "09-mega-calcul-rapide.svg" },
      { id: "hand", file: "10-mega-aides-sociales.svg" },
      { id: "medical", file: "11-mega-arret-maladie.svg" },
      { id: "shield", file: "12-mega-droits-des-salaries.svg" },
      { id: "book", file: "13-mega-comprendre-vos-droits.svg" },
      { id: "calcRemuneration", file: "17-mega-salaire-remuneration.svg" },
      { id: "calcSickLeave", file: "18-mega-arret-maladie-calculateurs.svg" },
      { id: "calcContract", file: "19-mega-fin-de-contrat.svg" },
    ];
    for (const pair of pairs) {
      const src = getNavIconSrc(pair.id, "circle");
      expect(src).toBe(`/icons/nav/${pair.file}`);
      expect(existsSync(join(process.cwd(), "public/icons/nav", pair.file))).toBe(true);
    }
  });

  it("ne mappe pas search vers un SVG du pack (fichier absent)", () => {
    expect(getNavIconSrc("search", "square")).toBeNull();
  });
});
