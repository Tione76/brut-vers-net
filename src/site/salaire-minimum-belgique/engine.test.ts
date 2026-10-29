import { describe, expect, it } from "vitest";
import {
  BE_COMPARE_FR_HOURLY,
  BE_COMPARE_FR_MONTHLY,
  BE_COMPARE_HOURLY_PCT_VS_FR,
  BE_RMMMG_ADULT_HOURLY,
  BE_RMMMG_ADULT_HOURLY_FROM_MONTHLY,
  BE_RMMMG_ADULT_MONTHLY,
  BE_RMMMG_FULL_TIME_WEEKLY,
  BE_RMMMG_PART_TIME_EXAMPLE_MONTHLY,
  BE_STUDENT_16_HOURLY,
  BE_STUDENT_16_MONTHLY,
  BE_STUDENT_17_HOURLY,
  BE_STUDENT_17_MONTHLY,
  BE_STUDENT_18_HOURLY,
  BE_STUDENT_18_MONTHLY,
  BE_STUDENT_19_HOURLY,
  BE_STUDENT_19_MONTHLY,
  BE_STUDENT_20_HOURLY,
  BE_STUDENT_20_MONTHLY,
} from "./data";
import { indicativeHourlyFromMonthly, percentDiffVsBase, prorataOfficialMonthly } from "./engine";

describe("salaire minimum Belgique - engine", () => {
  it("reprend le mensuel CNT et l'horaire SPF sans reconstruire le mensuel depuis l'horaire arrondi", () => {
    expect(BE_RMMMG_ADULT_MONTHLY).toBe(2233.61);
    expect(BE_RMMMG_ADULT_HOURLY).toBe(13.5644);
    expect(BE_RMMMG_FULL_TIME_WEEKLY).toBe(38);
    expect(BE_RMMMG_ADULT_HOURLY_FROM_MONTHLY).toBe(13.5644);
    expect(indicativeHourlyFromMonthly(2233.61, 38)).toBe(13.5644);
    expect(BE_RMMMG_ADULT_HOURLY * ((38 * 52) / 12)).not.toBe(BE_RMMMG_ADULT_MONTHLY);
  });

  it("reprend les barèmes étudiants publiés par le SPF, sans reconstruire l'horaire depuis le mensuel arrondi", () => {
    expect(Number((BE_RMMMG_ADULT_MONTHLY * 0.9).toFixed(2))).toBe(BE_STUDENT_20_MONTHLY);
    expect(Number((BE_RMMMG_ADULT_MONTHLY * 0.85).toFixed(2))).toBe(BE_STUDENT_19_MONTHLY);
    expect(Number((BE_RMMMG_ADULT_MONTHLY * 0.79).toFixed(2))).toBe(BE_STUDENT_18_MONTHLY);
    expect(Number((BE_RMMMG_ADULT_MONTHLY * 0.73).toFixed(2))).toBe(BE_STUDENT_17_MONTHLY);
    expect(Number((BE_RMMMG_ADULT_MONTHLY * 0.67).toFixed(2))).toBe(BE_STUDENT_16_MONTHLY);
    expect(BE_STUDENT_20_HOURLY).toBe(12.2079);
    expect(BE_STUDENT_19_HOURLY).toBe(11.5297);
    expect(BE_STUDENT_18_HOURLY).toBe(10.7158);
    expect(BE_STUDENT_17_HOURLY).toBe(9.902);
    expect(BE_STUDENT_16_HOURLY).toBe(9.0881);
    expect(indicativeHourlyFromMonthly(BE_STUDENT_20_MONTHLY, 38)).not.toBe(BE_STUDENT_20_HOURLY);
  });

  it("proratise un mensuel officiel à temps partiel", () => {
    expect(prorataOfficialMonthly(2233.61, 19, 38)).toBe(1116.81);
    expect(BE_RMMMG_PART_TIME_EXAMPLE_MONTHLY).toBe(1116.81);
  });

  it("calcule l'écart horaire indicatif avec le SMIC français", () => {
    expect(BE_COMPARE_FR_HOURLY).toBe(12.31);
    expect(BE_COMPARE_FR_MONTHLY).toBe(1867.02);
    expect(percentDiffVsBase(13.5644, 12.31)).toBe(10.2);
    expect(BE_COMPARE_HOURLY_PCT_VS_FR).toBe(10.2);
  });
});
