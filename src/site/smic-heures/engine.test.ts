import { describe, expect, it } from "vitest";
import { SMIC_CURRENT, SMIC_EFFECTIVE_FROM, SMIC_SOURCES } from "@/site/smic/data";
import { roundCent } from "@/site/salary-calculator";
import { LEGAL_MAJORATION_GROUP1 } from "@/site/overtime-salary-calculator/config";
import { estimateOvertimeContributionRelief } from "@/site/overtime-salary-calculator";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import {
  buildSmicHoursTable,
  buildSmicWeeklyOvertimeGainTable,
  calculateSmicForWeeklyHours,
  calculateSmicWeeklyOvertimeGain,
  getSmicIndicativeNetRatio,
  OVERTIME_MAJORATION_ASSUMPTION_PERCENT,
  OVERTIME_MAJORATION_GROUP2_PERCENT,
  parseWeeklyHoursInput,
  SMIC_HOURS_DEFAULT,
  SMIC_HOURS_MAX,
  SMIC_HOURS_MIN,
  smicOvertimeHourlyGross,
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
  it("expose la plage 10–44 h et les majorations légales 25 % / 50 %", () => {
    expect(SMIC_HOURS_MIN).toBe(10);
    expect(SMIC_HOURS_MAX).toBe(44);
    expect(SMIC_HOURS_DEFAULT).toBe(35);
    expect(OVERTIME_MAJORATION_ASSUMPTION_PERCENT).toBe(LEGAL_MAJORATION_GROUP1);
    expect(OVERTIME_MAJORATION_ASSUMPTION_PERCENT).toBe(25);
    expect(OVERTIME_MAJORATION_GROUP2_PERCENT).toBe(50);
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

  it("calcule toutes les heures entières de 10 à 44 sans NaN", () => {
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
    expect(table).toHaveLength(35);
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
    expect(calculateSmicForWeeklyHours(45)).toBeNull();
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
    expect(parseWeeklyHoursInput("44")).toBe(44);
    expect(parseWeeklyHoursInput("9")).toBeNull();
    expect(parseWeeklyHoursInput("45")).toBeNull();
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

  it("applique +25 % jusqu'à 43 h et +50 % à la 44e heure", () => {
    const r40 = calculateSmicForWeeklyHours(40)!;
    const r43 = calculateSmicForWeeklyHours(43)!;
    const r44 = calculateSmicForWeeklyHours(44)!;

    expect(r40.overtimeWeeklyHours).toBe(5);
    expect(r40.overtimeWeeklyHours25).toBe(5);
    expect(r40.overtimeWeeklyHours50).toBe(0);
    expect(r43.overtimeWeeklyHours).toBe(8);
    expect(r43.overtimeWeeklyHours25).toBe(8);
    expect(r43.overtimeWeeklyHours50).toBe(0);
    expect(r44.overtimeWeeklyHours).toBe(9);
    expect(r44.overtimeWeeklyHours25).toBe(8);
    expect(r44.overtimeWeeklyHours50).toBe(1);

    const expected40 = roundCent(
      weeklyToMonthlyHours(5) * SMIC_CURRENT.hourlyGross * 1.25,
    );
    expect(r40.overtimeGross).toBe(expected40);
    expect(r40.monthlyGross).toBe(roundCent(SMIC_CURRENT.monthlyGross + expected40));

    const gross25 = roundCent(
      weeklyToMonthlyHours(8) * SMIC_CURRENT.hourlyGross * 1.25,
    );
    const gross50 = roundCent(
      weeklyToMonthlyHours(1) * SMIC_CURRENT.hourlyGross * 1.5,
    );
    expect(r43.overtimeGross).toBe(gross25);
    expect(r44.overtimeGross25).toBe(gross25);
    expect(r44.overtimeGross50).toBe(gross50);
    expect(r44.overtimeGross).toBe(roundCent(gross25 + gross50));
    expect(r44.monthlyGross).toBeGreaterThan(r43.monthlyGross);

    const relief = estimateOvertimeContributionRelief(r44.overtimeGross);
    const otNet = roundCent(
      r44.overtimeGross * getProfileCoefficient("nonExecutive") + relief,
    );
    expect(r44.overtimeNetGain).toBe(otNet);
    expect(r44.monthlyNetEstimated).toBe(
      roundCent(SMIC_CURRENT.monthlyNetIndicative + otNet),
    );
  });

  it("aligne le gain d'heures supplémentaires hebdomadaires sur le contrat 35 h + HS", () => {
    const oneHour = calculateSmicWeeklyOvertimeGain(1)!;
    const r36 = calculateSmicForWeeklyHours(36)!;
    expect(oneHour.hoursAt25).toBe(1);
    expect(oneHour.hoursAt50).toBe(0);
    expect(oneHour.monthlyGross).toBe(r36.overtimeGross);
    expect(oneHour.monthlyNetGain).toBe(r36.overtimeNetGain);
    expect(oneHour.weeklyGross).toBe(roundCent(SMIC_CURRENT.hourlyGross * 1.25));

    const nineHours = calculateSmicWeeklyOvertimeGain(9)!;
    const r44 = calculateSmicForWeeklyHours(44)!;
    expect(nineHours.hoursAt25).toBe(8);
    expect(nineHours.hoursAt50).toBe(1);
    expect(nineHours.monthlyGross).toBe(r44.overtimeGross);
    expect(buildSmicWeeklyOvertimeGainTable()).toHaveLength(9);
  });

  it("fixe la valeur brute d'une heure supplémentaire à +25 % et à +50 %", () => {
    expect(smicOvertimeHourlyGross(25)).toBe(roundCent(SMIC_CURRENT.hourlyGross * 1.25));
    expect(smicOvertimeHourlyGross(50)).toBe(roundCent(SMIC_CURRENT.hourlyGross * 1.5));
    expect(smicOvertimeHourlyGross(25)).toBe(15.39);
    expect(smicOvertimeHourlyGross(50)).toBe(18.47);
  });

  it("aligne 4 h et 5 h supplémentaires hebdomadaires sur 39 h et 40 h", () => {
    const r39 = calculateSmicForWeeklyHours(39)!;
    const r40 = calculateSmicForWeeklyHours(40)!;
    const ot4 = calculateSmicWeeklyOvertimeGain(4)!;
    const ot5 = calculateSmicWeeklyOvertimeGain(5)!;
    expect(ot4.monthlyGross).toBe(r39.overtimeGross);
    expect(ot5.monthlyGross).toBe(r40.overtimeGross);
    expect(calculateSmicForWeeklyHours(41)!.overtimeWeeklyHours).toBe(6);
    expect(calculateSmicForWeeklyHours(42)!.overtimeWeeklyHours).toBe(7);
    expect(calculateSmicForWeeklyHours(37)!.overtimeWeeklyHours).toBe(2);
    expect(calculateSmicForWeeklyHours(38)!.overtimeWeeklyHours).toBe(3);
  });

  it("s'appuie sur la source SMIC centralisée", () => {
    expect(SMIC_EFFECTIVE_FROM).toBe("2026-06-01");
    expect(SMIC_SOURCES.servicePublic.href).toContain("F2300");
    expect(SMIC_SOURCES.arreteMai2026.href).toContain("JORFTEXT");
    expect(SMIC_SOURCES.tempsPartiel.href).toContain("F32428");
    expect(SMIC_CURRENT.hourlyGross).toBe(12.31);
  });

  it("n'arrondit pas les heures mensualisées avant le calcul monétaire", () => {
    const exactHours = weeklyToMonthlyHours(11);
    expect(exactHours).toBeCloseTo(47.6666666667, 8);
    expect(exactHours).not.toBe(47.67);

    const result = calculateSmicForWeeklyHours(11)!;
    expect(result.monthlyHours).toBe(exactHours);
    expect(result.monthlyGross).toBe(
      roundCent(exactHours * SMIC_CURRENT.hourlyGross),
    );
    expect(result.monthlyGross).not.toBe(
      roundCent(47.67 * SMIC_CURRENT.hourlyGross),
    );
  });
});
