import { describe, expect, it } from "vitest";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import {
  buildConversionTableRows,
  CONVERSION_TABLE_GROSS_MONTHLY,
  estimateNetMonthlyFromGross,
  example15HourlyNonExecutive,
  example2500NonExecutive,
  example36000AnnualNonExecutive,
} from "./home-editorial-data";

describe("home-editorial-data", () => {
  it("calcule le net mensuel avec les coefficients du moteur", () => {
    expect(estimateNetMonthlyFromGross(2500, "nonExecutive")).toBe(1950);
    expect(estimateNetMonthlyFromGross(2500, "executive")).toBe(1875);
    expect(estimateNetMonthlyFromGross(3000, "nonExecutive")).toBe(2340);
  });

  it("génère un tableau sans NaN ni Infinity", () => {
    const rows = buildConversionTableRows();
    expect(rows).toHaveLength(CONVERSION_TABLE_GROSS_MONTHLY.length);
    for (const row of rows) {
      expect(Number.isFinite(row.grossMonthly)).toBe(true);
      expect(Number.isFinite(row.netNonExecutive)).toBe(true);
      expect(Number.isFinite(row.netExecutive)).toBe(true);
      expect(row.netNonExecutive).toBe(
        Math.round(row.grossMonthly * getProfileCoefficient("nonExecutive") * 100) / 100,
      );
      expect(row.netExecutive).toBe(
        Math.round(row.grossMonthly * getProfileCoefficient("executive") * 100) / 100,
      );
    }
  });

  it("aligne les exemples pédagogiques sur le moteur", () => {
    const ex2500 = example2500NonExecutive();
    expect(ex2500.netMonthly).toBe(1950);

    const ex36000 = example36000AnnualNonExecutive();
    expect(ex36000.grossMonthly).toBe(3000);
    expect(ex36000.netMonthly).toBe(2340);

    const ex15 = example15HourlyNonExecutive();
    expect(ex15.grossMonthly).toBe(2275.05);
    expect(ex15.netMonthly).toBe(1774.54);
  });

  it("valide chaque ligne du tableau de conversion", () => {
    const expected: Record<number, { nonExecutive: number; executive: number }> = {
      1800: { nonExecutive: 1404, executive: 1350 },
      2000: { nonExecutive: 1560, executive: 1500 },
      2200: { nonExecutive: 1716, executive: 1650 },
      2500: { nonExecutive: 1950, executive: 1875 },
      3000: { nonExecutive: 2340, executive: 2250 },
      3500: { nonExecutive: 2730, executive: 2625 },
      4000: { nonExecutive: 3120, executive: 3000 },
      4500: { nonExecutive: 3510, executive: 3375 },
      5000: { nonExecutive: 3900, executive: 3750 },
    };

    for (const row of buildConversionTableRows()) {
      const ref = expected[row.grossMonthly];
      expect(ref).toBeDefined();
      expect(row.netNonExecutive).toBe(ref.nonExecutive);
      expect(row.netExecutive).toBe(ref.executive);
    }
  });
});
