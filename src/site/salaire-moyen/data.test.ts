import { describe, expect, it } from "vitest";
import {
  PRIVATE_2024,
  PRIVATE_AGE_2024,
  PRIVATE_HISTORY_FACTS,
  PRIVATE_NET_MEAN_INDEX_CONSTANT,
  PRIVATE_PCS_2024,
  PRIVATE_REGIONS_2024,
  PRIVATE_SECTORS_2024,
  PUBLIC_2024,
  SALAIRE_MOYEN_EDITORIAL_YEAR,
  SALAIRE_MOYEN_FIELD_NOTE,
  SALAIRE_MOYEN_FRESHNESS_LINE,
  SALAIRE_MOYEN_H1,
  SALAIRE_MOYEN_LABELS,
  SALAIRE_MOYEN_META_DESCRIPTION,
  SALAIRE_MOYEN_METIER_POLICY,
  SALAIRE_MOYEN_PUBLISHED_AT,
  SALAIRE_MOYEN_SEO_TITLE,
  SALAIRE_MOYEN_SOURCES,
  SALAIRE_MOYEN_STAT_YEAR,
  SALAIRE_MOYEN_UPDATED_AT,
  STATS,
  euroMonth,
} from "./data";

describe("source de vérité salaire moyen France", () => {
  it("expose un Title evergreen et un H1 daté distincts de l'année statistique", () => {
    expect(SALAIRE_MOYEN_SEO_TITLE).toBe(
      "Salaire moyen en France : net, brut et médian | Mis à jour",
    );
    expect(SALAIRE_MOYEN_SEO_TITLE).not.toMatch(/20\d{2}/);
    expect(SALAIRE_MOYEN_SEO_TITLE).not.toMatch(/Brut-vers-Net/i);
    expect(SALAIRE_MOYEN_SEO_TITLE).not.toContain("\u2014");
    expect(SALAIRE_MOYEN_SEO_TITLE.toLowerCase()).not.toContain("métier");
    expect(SALAIRE_MOYEN_H1).toBe(
      `Salaire moyen en France en ${SALAIRE_MOYEN_EDITORIAL_YEAR} : combien gagnent les Français ?`,
    );
    expect(SALAIRE_MOYEN_STAT_YEAR).toBe(2024);
    expect(SALAIRE_MOYEN_STAT_YEAR).not.toBe(SALAIRE_MOYEN_EDITORIAL_YEAR);
    expect(SALAIRE_MOYEN_FRESHNESS_LINE).toContain(String(SALAIRE_MOYEN_STAT_YEAR));
    expect(SALAIRE_MOYEN_FRESHNESS_LINE).toContain("23 octobre 2025");
    expect(SALAIRE_MOYEN_FRESHNESS_LINE).not.toContain("\u2014");
    expect(SALAIRE_MOYEN_META_DESCRIPTION.length).toBeGreaterThan(120);
    expect(SALAIRE_MOYEN_META_DESCRIPTION.length).toBeLessThan(170);
    expect(SALAIRE_MOYEN_META_DESCRIPTION.toLowerCase()).not.toContain("métier");
    expect(SALAIRE_MOYEN_PUBLISHED_AT).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(SALAIRE_MOYEN_UPDATED_AT).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("refuse la promesse « par métier » faute de données métier précises", () => {
    expect(SALAIRE_MOYEN_METIER_POLICY.includeInTitle).toBe(false);
    expect(SALAIRE_MOYEN_METIER_POLICY.includeSection).toBe(false);
    expect(SALAIRE_MOYEN_METIER_POLICY.reason.toLowerCase()).toContain("pcs");
  });

  it("garde des chiffres centraux cohérents avec Insee Première 2079", () => {
    expect(PRIVATE_2024.meanNetMonthlyEqtp).toBe(2733);
    expect(PRIVATE_2024.meanGrossMonthlyEqtp).toBe(3602);
    expect(PRIVATE_2024.medianNetMonthlyEqtp).toBe(2190);
    expect(PRIVATE_2024.d1NetMonthlyEqtp).toBe(1492);
    expect(PRIVATE_2024.d9NetMonthlyEqtp).toBe(4334);
    expect(PRIVATE_2024.interdecileRatio).toBe(2.91);

    const computedGap =
      ((PRIVATE_2024.meanNetMonthlyEqtp - PRIVATE_2024.medianNetMonthlyEqtp) /
        PRIVATE_2024.meanNetMonthlyEqtp) *
      100;
    expect(Math.abs(computedGap - PRIVATE_2024.medianBelowMeanPercent)).toBeLessThan(0.05);

    const computedRatio = PRIVATE_2024.d9NetMonthlyEqtp / PRIVATE_2024.d1NetMonthlyEqtp;
    expect(Math.abs(computedRatio - PRIVATE_2024.interdecileRatio)).toBeLessThan(0.01);

    expect(PRIVATE_2024.meanGrossMonthlyEqtp).toBeGreaterThan(PRIVATE_2024.meanNetMonthlyEqtp);
    expect(PRIVATE_2024.meanNetMonthlyEqtp).toBeGreaterThan(PRIVATE_2024.medianNetMonthlyEqtp);
    expect(PRIVATE_PCS_2024.cadresNet).toBeGreaterThan(PRIVATE_PCS_2024.employesNet);
    expect(PRIVATE_SECTORS_2024.industrieNet).toBeGreaterThan(PRIVATE_SECTORS_2024.constructionNet);
    expect(PRIVATE_AGE_2024.from55plus).toBeGreaterThan(PRIVATE_AGE_2024.under25);
    expect(PUBLIC_2024.fpeNet).toBeGreaterThan(PUBLIC_2024.fptNet);
  });

  it("couvre toutes les régions Insee 2012733 sans inventer de montants", () => {
    expect(PRIVATE_REGIONS_2024).toHaveLength(19);
    expect(PRIVATE_REGIONS_2024[0]).toMatchObject({ id: "idf", net: 3479 });
    expect(PRIVATE_REGIONS_2024.some((region) => region.id === "occ" && region.net === 2470)).toBe(
      true,
    );
    expect(PRIVATE_REGIONS_2024.some((region) => region.id === "guy" && region.net === 2470)).toBe(
      true,
    );
    expect(PRIVATE_REGIONS_2024.at(-1)).toMatchObject({ id: "france", net: 2733 });
    const nets = PRIVATE_REGIONS_2024.filter((region) => region.id !== "france").map(
      (region) => region.net,
    );
    for (let i = 1; i < nets.length; i += 1) {
      expect(nets[i - 1]!).toBeGreaterThanOrEqual(nets[i]!);
    }
  });

  it("expose une série historique officielle en euros constants", () => {
    expect(PRIVATE_HISTORY_FACTS.gain1996to2024Percent).toBe(13.9);
    expect(PRIVATE_HISTORY_FACTS.index2024).toBe(113.9);
    expect(PRIVATE_HISTORY_FACTS.index2019).toBe(114.3);
    expect(PRIVATE_NET_MEAN_INDEX_CONSTANT[0]).toEqual({ year: 1996, index: 100.0 });
    expect(PRIVATE_NET_MEAN_INDEX_CONSTANT.at(-1)).toEqual({ year: 2024, index: 113.9 });
    expect(SALAIRE_MOYEN_SOURCES.inseeEssentielSalaires.href).toContain("7457170");
  });

  it("rattache chaque statistique à une source officielle complète", () => {
    for (const stat of STATS) {
      expect(Number.isFinite(stat.value)).toBe(true);
      expect(Number.isNaN(stat.value)).toBe(false);
      expect(stat.value).toBeGreaterThan(0);
      expect(stat.statisticalYear).toBe(2024);
      const source = SALAIRE_MOYEN_SOURCES[stat.sourceId];
      expect(source).toBeTruthy();
      expect(source.href.startsWith("https://www.insee.fr/")).toBe(true);
      expect(source.publishedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(source.verifiedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(source.title.length).toBeGreaterThan(10);
      expect(stat.scope.length).toBeGreaterThan(20);
    }

    const ids = STATS.map((stat) => stat.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(SALAIRE_MOYEN_FIELD_NOTE.toLowerCase()).toContain("eqtp");
  });

  it("formate les libellés FR sans tiret cadratin et avec espace insécable", () => {
    expect(SALAIRE_MOYEN_LABELS.meanNet).toContain("\u00a0");
    expect(SALAIRE_MOYEN_LABELS.meanNet.replace(/\u00a0/g, " ")).toBe("2 733 €");
    expect(SALAIRE_MOYEN_LABELS.medianNet.replace(/\u00a0/g, " ")).toBe("2 190 €");
    expect(SALAIRE_MOYEN_LABELS.meanGross.replace(/\u00a0/g, " ")).toBe("3 602 €");
    expect(euroMonth(2733)).toBe(SALAIRE_MOYEN_LABELS.meanNet);
    expect(JSON.stringify(SALAIRE_MOYEN_LABELS)).not.toContain("\u2014");
  });
});
