import { describe, expect, it } from "vitest";
import { SMIC_CURRENT } from "@/site/smic/data";
import {
  complementaryHoursGross,
  fullTimeEquivalentGross,
  monthlyGrossFromHourlyRate,
  partTimeBaseGross,
  partTimeDurationRows,
  partTimeEightyRows,
  partTimeSmicRows,
  transportRefundBelowHalf,
} from "./data";
import { weeklyToMonthlyHours } from "@/site/smic-heures/engine";

describe("calculs salaire temps partiel", () => {
  it("calcule les repères du tableau pédagogique à 2 500 €", () => {
    const rows = partTimeDurationRows(2500);
    expect(rows.map((row) => row.weeklyHours)).toEqual([17.5, 20, 24, 28, 30, 35]);
    expect(rows[0]!.baseGross).toBe(1250);
    expect(rows[0]!.monthlyHours).toBe(75.83);
    expect(rows[1]!.baseGross).toBe(1428.57);
    expect(rows[2]!.baseGross).toBe(1714.29);
    expect(rows[2]!.monthlyHours).toBe(104);
    expect(rows[3]!.baseGross).toBe(2000);
    expect(rows[3]!.monthlyHours).toBe(121.33);
    expect(rows[4]!.baseGross).toBe(2142.86);
    expect(rows[5]!.baseGross).toBe(2500);
  });

  it("calcule le tableau 80 % et les formules clés", () => {
    const eighty = partTimeEightyRows();
    expect(eighty[0]).toEqual({
      fullTimeGross: 2000,
      atEightyGross: 1600,
      monthlyDrop: 400,
    });
    expect(eighty[1]).toEqual({
      fullTimeGross: 2500,
      atEightyGross: 2000,
      monthlyDrop: 500,
    });
    expect(partTimeBaseGross(2500, 24)).toBe(1714.29);
    expect(monthlyGrossFromHourlyRate(15, 24)).toBe(1560);
    expect(fullTimeEquivalentGross(1600, 0.8)).toBe(2000);
    expect(complementaryHoursGross(2, 15, 0.1)).toBe(33);
    expect(24 / 35).toBeCloseTo(0.6857, 4);
    expect(weeklyToMonthlyHours(24)).toBe(104);
    expect(transportRefundBelowHalf(40, 10)).toBe(22.86);
  });

  it("dérive les repères SMIC du taux horaire centralisé", () => {
    expect(SMIC_CURRENT.hourlyGross).toBe(12.31);
    const rows = partTimeSmicRows();
    expect(rows).toEqual([
      {
        label: "Mi-temps (17 h 30)",
        weeklyHours: 17.5,
        monthlyHours: 75.83,
        monthlyGross: 933.51,
      },
      {
        label: "24 heures",
        weeklyHours: 24,
        monthlyHours: 104,
        monthlyGross: 1280.24,
      },
      {
        label: "80 % (28 heures)",
        weeklyHours: 28,
        monthlyHours: 121.33,
        monthlyGross: 1493.61,
      },
    ]);
  });
});
