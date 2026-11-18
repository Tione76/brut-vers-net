import { describe, expect, it } from "vitest";
import { buildHeaderNavEntries, getAllHeaderHrefs } from "./header-nav";
import { getMainNavItems } from "./main-nav-data";
import { smicNavigation } from "./smic";
import { existsSync } from "node:fs";
import { join } from "node:path";

describe("buildHeaderNavEntries", () => {
  it("expose les catégories de navigation dans l'ordre", () => {
    const entries = buildHeaderNavEntries();
    expect(entries.map((entry) => entry.label)).toEqual([
      "Calculateurs",
      "Salaires & emploi",
      "Aides & droits",
      "Banque & épargne",
      "Actualités",
    ]);
  });

  it("fait d'Actualités un lien direct vers /actu", () => {
    const actu = buildHeaderNavEntries().find((entry) => entry.id === "actu");
    expect(actu?.kind).toBe("link");
    if (actu?.kind === "link") {
      expect(actu.href).toBe("/actu");
    }
  });

  it("utilise une icône carrée pour Actualités", async () => {
    const { getNavIconSrc } = await import("./NavIcons");
    expect(getNavIconSrc("document", "square")).toBe(
      "/icons/nav/20-nav-actualites.svg?v=20261109b",
    );
    expect(existsSync(join(process.cwd(), "public/icons/nav/20-nav-actualites.svg"))).toBe(
      true,
    );
  });

  it("n'expose plus Tous les guides dans le menu principal", () => {
    expect(getMainNavItems().some((item) => item.id === "tous-les-guides")).toBe(false);
  });

  it("inclut le méga-menu Salaires & emploi sans colonne SMIC", () => {
    const salaires = getMainNavItems().find((item) => item.id === "salaires-emploi");
    expect(salaires?.kind).toBe("dropdown");
    if (salaires?.kind === "dropdown" && salaires.panel.kind === "mega") {
      expect(salaires.panel.columns.map((column) => column.title)).toEqual([
        "Rémunération",
        "Situations professionnelles",
        "Fiche de paie",
      ]);
      expect(salaires.panel.cta).toBeUndefined();
      expect(salaires.panel.columns.some((column) => column.id === "smic")).toBe(false);
    }
  });

  it("place SMIC en quatrième colonne de Aides & droits", () => {
    const aides = getMainNavItems().find((item) => item.id === "aides-droits");
    expect(aides?.kind).toBe("dropdown");
    if (aides?.kind === "dropdown" && aides.panel.kind === "mega") {
      expect(aides.panel.columns.map((column) => column.title)).toEqual([
        "Aides sociales",
        "Arrêt maladie",
        "Droits des salariés",
        "SMIC",
      ]);
      expect(aides.panel.cta).toBeUndefined();
      expect(aides.panel.columns.some((column) => column.id === "budget-epargne")).toBe(
        false,
      );
      const smicColumn = aides.panel.columns.find((column) => column.id === "smic");
      expect(smicColumn?.icon).toBe("coins");
      expect(smicColumn?.links.map((link) => link.href)).toEqual(
        smicNavigation.map((item) => item.href),
      );
      expect(smicColumn?.links.map((link) => link.label)).toEqual(
        smicNavigation.map((item) => item.shortTitle),
      );
      expect(
        smicColumn?.links.some((link) => link.href !== "/smic-europe" && /europe|italie|belgique|espagne|portugal|luxembourg|suisse|monaco|pays-bas|royaume/i.test(link.href)),
      ).toBe(false);
    }
  });

  it("expose Calculateurs en méga à 3 catégories et Banque & épargne en simple", () => {
    const calc = getMainNavItems().find((item) => item.id === "calculateurs");
    const banque = getMainNavItems().find((item) => item.id === "banque-epargne");
    expect(getMainNavItems().some((item) => item.id === "smic")).toBe(false);
    expect(calc?.kind).toBe("dropdown");
    expect(banque?.kind).toBe("dropdown");
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
    if (banque?.kind === "dropdown" && banque.panel.kind === "simple") {
      expect(banque.icon).toBe("banque");
      expect(banque.panel.links).toEqual([
        {
          href: "/epargner-petit-salaire",
          label: "Comment épargner avec un petit salaire ?",
          title: "Comment épargner avec un petit salaire ?",
        },
      ]);
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

  it("mappe l'icône Banque & épargne et réutilise l'icône ronde coins pour SMIC", async () => {
    const { getNavIconSrc } = await import("./NavIcons");
    expect(getNavIconSrc("coins", "circle")).toBe(
      "/icons/nav/14-mega-montants-calculs-smic.svg",
    );
    expect(getNavIconSrc("banque", "square")).toBe(
      "/icons/nav/22-nav-banque-epargne.svg",
    );
    expect(
      existsSync(join(process.cwd(), "public/icons/nav/14-mega-montants-calculs-smic.svg")),
    ).toBe(true);
    expect(
      existsSync(join(process.cwd(), "public/icons/nav/22-nav-banque-epargne.svg")),
    ).toBe(true);
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
    expect(hrefs).toContain("/actu");
    expect(hrefs).toContain("/nos-outils");
    expect(hrefs).toContain("/epargner-petit-salaire");
  });

  it("prépare l'emplacement public/logo.svg pour le logo définitif", () => {
    expect(existsSync(join(process.cwd(), "public/logo.svg"))).toBe(true);
  });
});
