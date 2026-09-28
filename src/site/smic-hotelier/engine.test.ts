import { describe, expect, it } from "vitest";
import { SMIC_CURRENT } from "@/site/smic/data";
import {
  applicableHourlyRate,
  buildHcrGridRow,
  getHcrGridRows,
  getHcrRow,
  HCR_CONVENTIONAL_RATES,
  HCR_MONTHLY_HOURS_AT_39,
  HCR_MONTHLY_OT_HOURS,
  HCR_OT_RATE_36_TO_39,
  HCR_OT_RATE_40_TO_43,
  HCR_OT_RATE_FROM_44,
  isCaughtBySmic,
  monthlyBaseAt35h,
  monthlyOvertimeAt39h,
  monthlyTotalAt39h,
} from "./engine";

describe("moteur SMIC hôtelier / HCR", () => {
  it("expose les quinze minima de l'avenant n° 33", () => {
    expect(HCR_CONVENTIONAL_RATES).toHaveLength(15);
    expect(HCR_CONVENTIONAL_RATES.map((item) => item.conventionalHourly)).toEqual([
      12.0, 12.08, 12.18, 12.28, 12.55, 13.17, 13.32, 13.54, 14.0, 14.4, 14.77, 15.4, 18.43,
      21.78, 28.12,
    ]);
  });

  it("retient le SMIC dès qu'une case de grille est inférieure", () => {
    expect(isCaughtBySmic(12.0)).toBe(true);
    expect(isCaughtBySmic(12.28)).toBe(true);
    expect(isCaughtBySmic(12.55)).toBe(false);
    expect(applicableHourlyRate(12.0)).toBe(SMIC_CURRENT.hourlyGross);
    expect(applicableHourlyRate(12.55)).toBe(12.55);
  });

  it("ne présente jamais un taux conventionnel sous SMIC comme taux payable", () => {
    for (const row of getHcrGridRows()) {
      expect(row.applicableHourly).toBeGreaterThanOrEqual(SMIC_CURRENT.hourlyGross);
      if (row.caughtBySmic) {
        expect(row.conventionalHourly).toBeLessThan(SMIC_CURRENT.hourlyGross);
        expect(row.applicableHourly).toBe(SMIC_CURRENT.hourlyGross);
      } else {
        expect(row.applicableHourly).toBe(row.conventionalHourly);
      }
    }
  });

  it("utilise le brut mensuel officiel du SMIC à 35 h, pas 12,31 × 151,67", () => {
    const smicFloor = getHcrRow(1, 1);
    expect(smicFloor.monthlyGross35h).toBe(SMIC_CURRENT.monthlyGross);
    expect(monthlyBaseAt35h(SMIC_CURRENT.hourlyGross)).toBe(1867.02);
    expect(monthlyBaseAt35h(12.55)).toBe(1903.46);
  });

  it("calcule 39 h comme 35 h de base plus 4 h majorées à +10 %", () => {
    expect(HCR_MONTHLY_OT_HOURS).toBeCloseTo((4 * 52) / 12, 10);
    expect(HCR_MONTHLY_HOURS_AT_39).toBe(169);

    const smicFloor = getHcrRow(1, 1);
    expect(smicFloor.overtimeGross39h).toBe(234.71);
    expect(smicFloor.monthlyGross39h).toBe(2101.73);

    const ii2 = getHcrRow(2, 2);
    expect(ii2.monthlyGross35h).toBe(1903.46);
    expect(ii2.overtimeGross39h).toBe(239.29);
    expect(ii2.monthlyGross39h).toBe(2142.75);

    const iii1 = getHcrRow(3, 1);
    expect(iii1.monthlyGross35h).toBe(2020.24);
    expect(iii1.overtimeGross39h).toBe(253.97);
    expect(iii1.monthlyGross39h).toBe(2274.21);

    const ii3 = getHcrRow(2, 3);
    expect(ii3.applicableHourly).toBe(13.17);
    expect(ii3.monthlyGross35h).toBe(1997.49);
    expect(ii3.overtimeGross39h).toBe(251.11);
    expect(ii3.monthlyGross39h).toBe(2248.6);
  });

  it("arrondit chaque composante au centime avant le total 39 h", () => {
    const overtime = monthlyOvertimeAt39h(13.32);
    const total = monthlyTotalAt39h(13.32);
    expect(overtime).toBe(253.97);
    expect(total).toBe(2020.24 + 253.97);
    expect(buildHcrGridRow({ level: 3, echelon: 1, conventionalHourly: 13.32 }).monthlyGross39h).toBe(
      total,
    );
  });

  it("produit le tableau 35 h / 39 h pour les quinze classifications", () => {
    const expected = [
      [1, 1, 12.31, 1867.02, 2101.73],
      [1, 2, 12.31, 1867.02, 2101.73],
      [1, 3, 12.31, 1867.02, 2101.73],
      [2, 1, 12.31, 1867.02, 2101.73],
      [2, 2, 12.55, 1903.46, 2142.75],
      [2, 3, 13.17, 1997.49, 2248.6],
      [3, 1, 13.32, 2020.24, 2274.21],
      [3, 2, 13.54, 2053.61, 2311.77],
      [3, 3, 14.0, 2123.38, 2390.31],
      [4, 1, 14.4, 2184.05, 2458.61],
      [4, 2, 14.77, 2240.17, 2521.78],
      [4, 3, 15.4, 2335.72, 2629.35],
      [5, 1, 18.43, 2795.28, 3146.68],
      [5, 2, 21.78, 3303.37, 3718.64],
      [5, 3, 28.12, 4264.96, 4801.11],
    ] as const;

    const rows = getHcrGridRows();
    expect(rows).toHaveLength(15);
    expected.forEach(([level, echelon, hourly, monthly35, monthly39], index) => {
      expect(rows[index]?.level).toBe(level);
      expect(rows[index]?.echelon).toBe(echelon);
      expect(rows[index]?.applicableHourly).toBe(hourly);
      expect(rows[index]?.monthlyGross35h).toBe(monthly35);
      expect(rows[index]?.monthlyGross39h).toBe(monthly39);
    });
  });

  it("conserve les majorations HCR 10 %, 20 % et 50 %", () => {
    expect(HCR_OT_RATE_36_TO_39).toBe(0.1);
    expect(HCR_OT_RATE_40_TO_43).toBe(0.2);
    expect(HCR_OT_RATE_FROM_44).toBe(0.5);
  });
});
