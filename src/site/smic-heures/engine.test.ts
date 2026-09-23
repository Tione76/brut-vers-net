import { describe, expect, it } from "vitest";
import { SMIC_CURRENT, SMIC_EFFECTIVE_FROM, SMIC_SOURCES } from "@/site/smic/data";
import { roundCent } from "@/site/salary-calculator";
import { LEGAL_MAJORATION_GROUP1 } from "@/site/overtime-salary-calculator/config";
import { estimateOvertimeContributionRelief } from "@/site/overtime-salary-calculator";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import {
  buildSmicHoursTable,
  calculateSmicForWeeklyHours,
  getSmicIndicativeNetRatio,
  OVERTIME_MAJORATION_ASSUMPTION_PERCENT,
  parseWeeklyHoursInput,
  SMIC_HOURS_DEFAULT,
  SMIC_HOURS_MAX,
  SMIC_HOURS_MIN,
  weeklyToMonthlyHours,
} from "./engine";

/** Valeurs de non-régression (audit 18/09/2026). */
const REGRESSION: Record<
  number,
  { gross: number; net: number; monthlyHours?: number }
> = {
  10: { gross: 533.43, net: 422.26 },
  20: { gross: 1066.87, net: 844.53 },
  24: { gross: 1280.24, net: 1013.44, monthlyHours: 104 },
  25: { gross: 1333.58, net: 1055.66 },
  28: { gross: 1493.61, net: 1182.34 },
  30: { gross: 1600.3, net: 1266.79, monthlyHours: 130 },
  32: { gross: 1706.99, net: 1351.25 },
  35: { gross: 1867.02, net: 1477.93 },
  36: { gross: 1933.7, net: 1537.48 },
  39: { gross: 2133.74, net: 1716.14 },
};

describe("smic-heures engine", () => {
  it("expose la plage 10–39 h et la majoration légale de 1re tranche", () => {
    expect(SMIC_HOURS_MIN).toBe(10);
    expect(SMIC_HOURS_MAX).toBe(39);
    expect(SMIC_HOURS_DEFAULT).toBe(35);
    expect(OVERTIME_MAJORATION_ASSUMPTION_PERCENT).toBe(LEGAL_MAJORATION_GROUP1);
    expect(OVERTIME_MAJORATION_ASSUMPTION_PERCENT).toBe(25);
  });

  it("mensualise avec H × 52 ÷ 12 sans arrondi prématuré", () => {
    expect(weeklyToMonthlyHours(30)).toBeCloseTo(130, 10);
    expect(weeklyToMonthlyHours(20)).toBeCloseTo(86.6666666667, 8);
    expect(weeklyToMonthlyHours(24)).toBe(104);
    expect(weeklyToMonthlyHours(4)).toBeCloseTo(17.3333333333, 8);
  });

  it("retient les montants officiels exacts à 35 h", () => {
    const result = calculateSmicForWeeklyHours(35);
    expect(result).not.toBeNull();
    expect(result!.monthlyGross).toBe(SMIC_CURRENT.monthlyGross);
    expect(result!.monthlyNetEstimated).toBe(SMIC_CURRENT.monthlyNetIndicative);
    expect(result!.hasOvertime).toBe(false);
    expect(result!.annualGrossProjection).toBe(roundCent(SMIC_CURRENT.monthlyGross * 12));
  });

  it.each(Object.entries(REGRESSION).map(([h, expected]) => [Number(h), expected] as const))(
    "non-régression %i h",
    (hours, expected) => {
      const result = calculateSmicForWeeklyHours(hours)!;
      expect(result.monthlyGross).toBe(expected.gross);
      expect(result.monthlyNetEstimated).toBe(expected.net);
      if (expected.monthlyHours !== undefined) {
        expect(result.monthlyHours).toBe(expected.monthlyHours);
      }
      expect(result.annualGrossProjection).toBe(roundCent(expected.gross * 12));
      expect(result.annualNetProjection).toBe(roundCent(expected.net * 12));
    },
  );

  it("calcule toutes les heures entières de 10 à 39 sans NaN", () => {
    for (let h = SMIC_HOURS_MIN; h <= SMIC_HOURS_MAX; h += 1) {
      const result = calculateSmicForWeeklyHours(h);
      expect(result).not.toBeNull();
      expect(Number.isFinite(result!.monthlyGross)).toBe(true);
      expect(Number.isFinite(result!.monthlyNetEstimated)).toBe(true);
      expect(result!.monthlyGross).toBeGreaterThan(0);
      expect(result!.hasOvertime).toBe(h > 35);
    }
  });

  it("aligne le tableau et le calculateur pour chaque ligne", () => {
    const table = buildSmicHoursTable();
    expect(table).toHaveLength(30);
    for (const row of table) {
      const fromEngine = calculateSmicForWeeklyHours(row.weeklyHours)!;
      expect(row).toEqual(fromEngine);
    }
  });

  it("applique la majoration à +25 % entre 36 h et 39 h avec arrondi par composante", () => {
    const r36 = calculateSmicForWeeklyHours(36)!;
    const r39 = calculateSmicForWeeklyHours(39)!;

    expect(r36.hasOvertime).toBe(true);
    expect(r36.overtimeWeeklyHours).toBe(1);
    expect(r39.overtimeWeeklyHours).toBe(4);
    expect(r36.majorationPercent).toBe(25);
    expect(r39.majorationPercent).toBe(25);

    const otHours39 = weeklyToMonthlyHours(4);
    const expectedOtGross39 = roundCent(
      otHours39 * SMIC_CURRENT.hourlyGross * 1.25,
    );
    expect(r39.overtimeGross).toBe(expectedOtGross39);
    expect(r39.monthlyGross).toBe(
      roundCent(SMIC_CURRENT.monthlyGross + expectedOtGross39),
    );

    const relief = estimateOvertimeContributionRelief(expectedOtGross39);
    const otNet = roundCent(
      expectedOtGross39 * getProfileCoefficient("nonExecutive") + relief,
    );
    expect(r39.overtimeNetGain).toBe(otNet);
    expect(r39.monthlyNetEstimated).toBe(
      roundCent(SMIC_CURRENT.monthlyNetIndicative + otNet),
    );
    expect(r39.monthlyNetEstimated).toBe(1716.14);
    expect(r39.annualNetProjection).toBe(roundCent(1716.14 * 12));
  });

  it("sépare base 35 h et HS majorées à 36 h et 39 h", () => {
    const r36 = calculateSmicForWeeklyHours(36)!;
    const r39 = calculateSmicForWeeklyHours(39)!;
    expect(r36.baseWeeklyHours).toBe(35);
    expect(r39.baseWeeklyHours).toBe(35);
    expect(r36.monthlyGross).toBeGreaterThan(SMIC_CURRENT.monthlyGross);
    expect(r39.monthlyGross).toBeGreaterThan(r36.monthlyGross);
  });

  it("rejette les valeurs hors plage, vides, NaN et négatives", () => {
    expect(calculateSmicForWeeklyHours(9)).toBeNull();
    expect(calculateSmicForWeeklyHours(40)).toBeNull();
    expect(calculateSmicForWeeklyHours(Number.NaN)).toBeNull();
    expect(calculateSmicForWeeklyHours(-1)).toBeNull();
    expect(calculateSmicForWeeklyHours(Number.POSITIVE_INFINITY)).toBeNull();
    expect(parseWeeklyHoursInput("")).toBeNull();
    expect(parseWeeklyHoursInput("   ")).toBeNull();
  });

  it("accepte une saisie décimale valide (ex. 22,5 h)", () => {
    expect(parseWeeklyHoursInput("22,5")).toBe(22.5);
    expect(parseWeeklyHoursInput(" 30 ")).toBe(30);
    expect(parseWeeklyHoursInput("10")).toBe(10);
    expect(parseWeeklyHoursInput("39")).toBe(39);
    expect(parseWeeklyHoursInput("9")).toBeNull();
    expect(parseWeeklyHoursInput("40")).toBeNull();
    expect(parseWeeklyHoursInput("abc")).toBeNull();
    expect(parseWeeklyHoursInput("-12")).toBeNull();

    const half = calculateSmicForWeeklyHours(22.5)!;
    expect(half.monthlyGross).toBe(
      roundCent(weeklyToMonthlyHours(22.5) * SMIC_CURRENT.hourlyGross),
    );
    expect(half.monthlyNetEstimated).toBe(
      roundCent(half.monthlyGross * getSmicIndicativeNetRatio()),
    );
  });

  it("s'appuie sur la source SMIC centralisée", () => {
    expect(SMIC_EFFECTIVE_FROM).toBe("2026-06-01");
    expect(SMIC_SOURCES.servicePublic.href).toContain("F2300");
    expect(SMIC_SOURCES.arreteMai2026.href).toContain("JORFTEXT");
    expect(SMIC_SOURCES.tempsPartiel.href).toContain("F32428");
    expect(SMIC_CURRENT.hourlyGross).toBe(12.31);
  });
});
