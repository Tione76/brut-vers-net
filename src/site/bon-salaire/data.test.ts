import { describe, expect, it } from "vitest";
import {
  BENCHMARK_NET_MONTHLY,
  BENCHMARK_SITUATIONS,
  BON_SALAIRE_EQTP_PART_TIME_NOTE,
  BON_SALAIRE_H1,
  BON_SALAIRE_META_DESCRIPTION,
  BON_SALAIRE_PRIVATE_SCOPE,
  BON_SALAIRE_PUBLISHED_AT,
  BON_SALAIRE_SEO_TITLE,
  BON_SALAIRE_SOURCES,
  BON_SALAIRE_STAT_YEAR,
  BON_SALAIRE_UPDATED_AT,
  DISTRIBUTION_SCALE_POINTS,
  PRIVATE_AGE_MEAN_NET_2024,
  PRIVATE_DISTRIBUTION_2024,
  PRIVATE_PCS_MEAN_NET_2024,
  PRIVATE_REGION_MEAN_NET_2024,
} from "./data";

describe("bon-salaire/data", () => {
  it("centralise Title, H1, meta et dates distinctes de l'année statistique", () => {
    expect(BON_SALAIRE_SEO_TITLE).toBe(
      "Quel est un bon salaire en France ? Les repères pour se situer",
    );
    expect(BON_SALAIRE_SEO_TITLE).not.toMatch(/20\d{2}/);
    expect(BON_SALAIRE_SEO_TITLE).not.toBe(BON_SALAIRE_H1);
    expect(BON_SALAIRE_H1).toBe("Quel est un bon salaire en France en 2026 ?");
    expect(BON_SALAIRE_META_DESCRIPTION).toBe(
      "Comparez votre net à la médiane et aux déciles Insee, puis voyez si 2 000 €, 3 000 € ou 5 000 € sont un bon salaire.",
    );
    expect(BON_SALAIRE_META_DESCRIPTION.length).toBeGreaterThan(100);
    expect(BON_SALAIRE_META_DESCRIPTION.length).toBeLessThan(160);
    expect(BON_SALAIRE_META_DESCRIPTION).not.toMatch(/20\d{2}/);
    expect(BON_SALAIRE_META_DESCRIPTION).toContain("2 000");
    expect(BON_SALAIRE_PUBLISHED_AT).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(BON_SALAIRE_UPDATED_AT).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(BON_SALAIRE_STAT_YEAR).toBe(2024);
    expect(BON_SALAIRE_STAT_YEAR).not.toBe(2026);
  });

  it("garde l'ordre des seuils de distribution (D1 < … < P99)", () => {
    const d = PRIVATE_DISTRIBUTION_2024;
    expect(d.d1).toBeLessThan(d.d2);
    expect(d.d2).toBeLessThan(d.d3);
    expect(d.d3).toBeLessThan(d.d4);
    expect(d.d4).toBeLessThan(d.median);
    expect(d.median).toBeLessThan(d.d6);
    expect(d.d6).toBeLessThan(d.d7);
    expect(d.d7).toBeLessThan(d.d8);
    expect(d.d8).toBeLessThan(d.d9);
    expect(d.d9).toBeLessThan(d.p95);
    expect(d.p95).toBeLessThan(d.p99);
    expect(d.median).toBeLessThan(d.meanNet);
    expect(d.meanNet).toBeLessThan(d.meanGross);
  });

  it("fixe les seuils Insee Première 2079 vérifiés", () => {
    const d = PRIVATE_DISTRIBUTION_2024;
    expect(d.d1).toBe(1492);
    expect(d.d4).toBe(1992);
    expect(d.median).toBe(2190);
    expect(d.d6).toBe(2442);
    expect(d.d7).toBe(2785);
    expect(d.d8).toBe(3305);
    expect(d.d9).toBe(4334);
    expect(d.p95).toBe(5593);
    expect(d.p99).toBe(10261);
    expect(d.meanNet).toBe(2733);
    expect(d.meanGross).toBe(3602);
    expect(d.interdecileRatio).toBe(2.91);
  });

  it("associe chaque famille de chiffres à la bonne URL Insee", () => {
    expect(BON_SALAIRE_SOURCES.inseePrive2024.href).toBe(
      "https://www.insee.fr/fr/statistiques/8657156",
    );
    expect(BON_SALAIRE_SOURCES.inseePcsRegions2024.href).toBe(
      "https://www.insee.fr/fr/statistiques/2012733",
    );
    expect(BON_SALAIRE_SOURCES.inseePcsRegions2024.notes.toLowerCase()).toContain(
      "moyennes",
    );
    expect(BON_SALAIRE_SOURCES.inseePrive2024.notes.toLowerCase()).toContain("âge");
  });

  it("conserve les moyennes d'âge du champ principal Première 2079", () => {
    expect(PRIVATE_AGE_MEAN_NET_2024.under25).toBe(1622);
    expect(PRIVATE_AGE_MEAN_NET_2024.from25to39).toBe(2547);
    expect(PRIVATE_AGE_MEAN_NET_2024.from40to49).toBe(3007);
    expect(PRIVATE_AGE_MEAN_NET_2024.from55plus).toBe(3266);
    expect(PRIVATE_AGE_MEAN_NET_2024.under25ExcludingApprentices).toBe(1865);
  });

  it("rappelle la comparaison EQTP pour le temps partiel", () => {
    expect(BON_SALAIRE_EQTP_PART_TIME_NOTE.toLowerCase()).toContain("temps partiel");
    expect(BON_SALAIRE_EQTP_PART_TIME_NOTE).toContain("80");
    expect(BON_SALAIRE_EQTP_PART_TIME_NOTE).toContain("EQTP");
  });

  it("pointe vers des URL Insee https officielles", () => {
    for (const source of Object.values(BON_SALAIRE_SOURCES)) {
      expect(source.href.startsWith("https://www.insee.fr/")).toBe(true);
      expect(source.statisticalYear).toBe(2024);
      expect(source.verifiedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("décrit les montants 2 000–5 000 € sans inventer de percentiles précis", () => {
    expect([...BENCHMARK_NET_MONTHLY]).toEqual([2000, 2500, 3000, 4000, 5000]);
    for (const amount of BENCHMARK_NET_MONTHLY) {
      const situation = BENCHMARK_SITUATIONS[amount];
      expect(situation.vsOfficialThresholds.length).toBeGreaterThan(20);
      expect(situation.vsOfficialThresholds).not.toMatch(/\d+\s*%\s*des Français/i);
      expect(situation.vsOfficialThresholds).not.toMatch(/plus que \d+\s*%/i);
    }
    expect(BENCHMARK_SITUATIONS[2000].tableMeaning).toMatch(/médiane/i);
    expect(BENCHMARK_SITUATIONS[5000].tableMeaning).toMatch(/D9|top 10/i);
  });

  it("ordonne l'échelle visuelle", () => {
    const values = DISTRIBUTION_SCALE_POINTS.map((point) => point.value);
    for (let i = 1; i < values.length; i += 1) {
      expect(values[i]!).toBeGreaterThan(values[i - 1]!);
    }
  });

  it("rappelle un champ privé EQTP (pas la population générale)", () => {
    expect(BON_SALAIRE_PRIVATE_SCOPE.toLowerCase()).toContain("privé");
    expect(BON_SALAIRE_PRIVATE_SCOPE).toContain("EQTP");
    expect(BON_SALAIRE_PRIVATE_SCOPE.toLowerCase()).not.toContain("tous les français");
  });

  it("conserve des moyennes PCS / âge / région cohérentes", () => {
    expect(PRIVATE_PCS_MEAN_NET_2024.cadres).toBe(4629);
    expect(PRIVATE_PCS_MEAN_NET_2024.professionsIntermediaires).toBe(2633);
    expect(PRIVATE_PCS_MEAN_NET_2024.employes).toBe(1941);
    expect(PRIVATE_PCS_MEAN_NET_2024.ouvriers).toBe(2051);
    expect(PRIVATE_REGION_MEAN_NET_2024.ileDeFrance).toBe(3479);
    expect(PRIVATE_PCS_MEAN_NET_2024.cadres).toBeGreaterThan(
      PRIVATE_PCS_MEAN_NET_2024.professionsIntermediaires,
    );
    expect(PRIVATE_PCS_MEAN_NET_2024.employes).toBeLessThan(
      PRIVATE_PCS_MEAN_NET_2024.ouvriers,
    );
    expect(PRIVATE_AGE_MEAN_NET_2024.under25).toBeLessThan(
      PRIVATE_AGE_MEAN_NET_2024.from25to39,
    );
    expect(PRIVATE_AGE_MEAN_NET_2024.from55plus).toBeGreaterThan(
      PRIVATE_AGE_MEAN_NET_2024.from40to49,
    );
    expect(PRIVATE_REGION_MEAN_NET_2024.ileDeFrance).toBeGreaterThan(
      PRIVATE_REGION_MEAN_NET_2024.france,
    );
    expect(PRIVATE_REGION_MEAN_NET_2024.nouvelleAquitaine).toBeLessThan(
      PRIVATE_REGION_MEAN_NET_2024.france,
    );
  });
});
