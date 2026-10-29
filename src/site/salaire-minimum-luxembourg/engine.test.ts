import { describe, expect, it } from "vitest";
import {
  LU_COMPARE_FR_HOURLY,
  LU_COMPARE_FR_MONTHLY,
  LU_COMPARE_HOURLY_PCT_VS_FR,
  LU_SSM_ADULT_SKILLED_HOURLY,
  LU_SSM_ADULT_SKILLED_MONTHLY,
  LU_SSM_ADULT_UNSKILLED_HOURLY,
  LU_SSM_ADULT_UNSKILLED_MONTHLY,
  LU_SSM_AGE_15_HOURLY,
  LU_SSM_AGE_15_MONTHLY,
  LU_SSM_AGE_17_HOURLY,
  LU_SSM_AGE_17_MONTHLY,
  LU_SSM_FULL_TIME_WEEKLY,
  LU_SSM_LEGAL_HOURS,
  LU_SSM_PART_TIME_EXAMPLE_MONTHLY,
  LU_SSM_VACATION_ADULT_HOURLY,
  LU_SSM_VACATION_ADULT_MONTHLY,
} from "./data";
import { percentDiffVsBase, prorataOfficialMonthly } from "./engine";

describe("salaire minimum Luxembourg - engine", () => {
  it("reprend les mensuels officiels sans les reconstruire depuis l'horaire arrondi", () => {
    expect(LU_SSM_ADULT_UNSKILLED_MONTHLY).toBe(2771.33);
    expect(LU_SSM_ADULT_UNSKILLED_HOURLY).toBe(16.0192);
    expect(LU_SSM_ADULT_SKILLED_MONTHLY).toBe(3325.59);
    expect(LU_SSM_ADULT_SKILLED_HOURLY).toBe(19.2231);
    expect(LU_SSM_AGE_17_MONTHLY).toBe(2217.06);
    expect(LU_SSM_AGE_17_HOURLY).toBe(12.8154);
    expect(LU_SSM_AGE_15_MONTHLY).toBe(2078.49);
    expect(LU_SSM_AGE_15_HOURLY).toBe(12.0144);
    expect(Number((LU_SSM_ADULT_UNSKILLED_MONTHLY / LU_SSM_LEGAL_HOURS).toFixed(4))).toBe(
      LU_SSM_ADULT_UNSKILLED_HOURLY,
    );
    expect(LU_SSM_ADULT_UNSKILLED_HOURLY * LU_SSM_LEGAL_HOURS).not.toBe(
      LU_SSM_ADULT_UNSKILLED_MONTHLY,
    );
  });

  it("proratise un mensuel officiel à temps partiel", () => {
    expect(prorataOfficialMonthly(2771.33, 20, 40)).toBe(1385.67);
    expect(LU_SSM_PART_TIME_EXAMPLE_MONTHLY).toBe(1385.67);
    expect(LU_SSM_FULL_TIME_WEEKLY).toBe(40);
  });

  it("calcule l'écart horaire avec le SMIC français", () => {
    expect(LU_COMPARE_FR_HOURLY).toBe(12.31);
    expect(LU_COMPARE_FR_MONTHLY).toBe(1867.02);
    expect(percentDiffVsBase(16.0192, 12.31)).toBe(30.1);
    expect(LU_COMPARE_HOURLY_PCT_VS_FR).toBe(30.1);
  });

  it("aligne le job de vacances majeur sur 80 % du SSM adulte", () => {
    expect(LU_SSM_VACATION_ADULT_MONTHLY).toBe(2217.06);
    expect(LU_SSM_VACATION_ADULT_HOURLY).toBe(12.8154);
    expect(Number((LU_SSM_ADULT_UNSKILLED_MONTHLY * 0.8).toFixed(2))).toBe(
      LU_SSM_VACATION_ADULT_MONTHLY,
    );
  });
});
