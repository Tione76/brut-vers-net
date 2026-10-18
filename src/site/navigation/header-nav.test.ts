import { describe, expect, it } from "vitest";
import { buildHeaderNavEntries, getAllHeaderHrefs } from "./header-nav";
import { getMainNavItems } from "./main-nav-data";
import { existsSync } from "node:fs";
import { join } from "node:path";

describe("buildHeaderNavEntries", () => {
  it("expose les cinq catégories de la maquette dans l'ordre", () => {
    const entries = buildHeaderNavEntries();
    expect(entries.map((entry) => entry.label)).toEqual([
      "Calculateurs",
      "SMIC",
      "Salaires & emploi",
      "Aides & droits",
      "Tous les guides",
    ]);
  });

  it("fait de Tous les guides un lien direct vers /guides", () => {
    const guides = buildHeaderNavEntries().find((entry) => entry.id === "tous-les-guides");
    expect(guides?.kind).toBe("link");
    if (guides?.kind === "link") {
      expect(guides.href).toBe("/guides");
    }
  });

  it("inclut le méga-menu Salaires & emploi avec CTA calculateurs", () => {
    const salaires = getMainNavItems().find((item) => item.id === "salaires-emploi");
    expect(salaires?.kind).toBe("dropdown");
    if (salaires?.kind === "dropdown" && salaires.panel.kind === "mega") {
      expect(salaires.panel.columns.map((column) => column.title)).toEqual([
        "Rémunération",
        "Situations professionnelles",
        "Fiche de paie",
      ]);
      expect(salaires.panel.cta?.href).toBe("/nos-outils");
      expect(salaires.panel.cta?.buttonLabel).toBe("Voir les calculateurs");
    }
  });

  it("expose SMIC en spotlight et Calculateurs en méga à 3 catégories", () => {
    const smic = getMainNavItems().find((item) => item.id === "smic");
    const calc = getMainNavItems().find((item) => item.id === "calculateurs");
    expect(smic?.kind).toBe("dropdown");
    expect(calc?.kind).toBe("dropdown");
    if (smic?.kind === "dropdown" && smic.panel.kind === "spotlight") {
      expect(smic.panel.links).toHaveLength(5);
      expect(smic.panel.cta.href).toBe("/smic");
    }
    if (calc?.kind === "dropdown" && calc.panel.kind === "mega") {
      expect(calc.panel.layout).toBe("calc");
      expect(calc.panel.intro?.title).toBe("Calculateurs");
      expect(calc.panel.columns.map((column) => column.title)).toEqual([
        "Salaire & rémunération",
        "Arrêt maladie",
        "Fin de contrat",
      ]);
      const hrefs = calc.panel.columns.flatMap((column) =>
        column.links.map((link) => link.href),
      );
      expect(hrefs).toEqual([
        "/",
        "/calculateurs/augmentation-salaire",
        "/calculateurs/salaire-heures-supplementaires",
        "/salaire-arret-maladie",
        "/calcul-ijss-arret-maladie",
        "/maintien-salaire-arret-maladie",
        "/calculateurs/indemnite-licenciement",
      ]);
      expect(calc.panel.cta?.href).toBe("/nos-outils");
      expect(calc.panel.cta?.buttonLabel).toBe("Voir tous les outils");
    }
  });

  it("mappe les icônes SVG 17-19 pour les sous-catégories Calculateurs", async () => {
    const { getNavIconSrc } = await import("./NavIcons");
    expect(getNavIconSrc("calcRemuneration", "circle")).toBe(
      "/icons/nav/17-mega-salaire-remuneration.svg",
    );
    expect(getNavIconSrc("calcSickLeave", "circle")).toBe(
      "/icons/nav/18-mega-arret-maladie-calculateurs.svg",
    );
    expect(getNavIconSrc("calcContract", "circle")).toBe(
      "/icons/nav/19-mega-fin-de-contrat.svg",
    );
    for (const file of [
      "17-mega-salaire-remuneration.svg",
      "18-mega-arret-maladie-calculateurs.svg",
      "19-mega-fin-de-contrat.svg",
    ]) {
      expect(existsSync(join(process.cwd(), "public/icons/nav", file))).toBe(true);
    }
  });

  it("n'expose que des routes locales existantes dans app/", () => {
    const hrefs = getAllHeaderHrefs();
    expect(hrefs.length).toBeGreaterThan(10);
    for (const href of hrefs) {
      expect(href.startsWith("/")).toBe(true);
      expect(href).not.toMatch(/^https?:/);
    }
    expect(hrefs).toContain("/");
    expect(hrefs).toContain("/smic");
    expect(hrefs).toContain("/smic-europe");
    expect(hrefs).toContain("/prime-de-noel");
    expect(hrefs).toContain("/prime-activite");
    expect(hrefs).toContain("/guides");
    expect(hrefs).toContain("/nos-outils");
  });

  it("prépare l'emplacement public/logo.svg pour le logo définitif", () => {
    expect(existsSync(join(process.cwd(), "public/logo.svg"))).toBe(true);
  });
});
