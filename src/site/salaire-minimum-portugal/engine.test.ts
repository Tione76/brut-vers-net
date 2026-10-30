import { describe, expect, it } from "vitest";
import {
  PT_COMPARE_ANNUAL_PCT_VS_FR,
  PT_COMPARE_FR_ANNUAL,
  PT_COMPARE_FR_MONTHLY,
  PT_HOURLY_EXAMPLE,
  PT_NET_BEFORE_IRS_CONTINENTAL,
  PT_PART_TIME_EXAMPLE_ANNUAL,
  PT_PART_TIME_EXAMPLE_MONTHLY,
  PT_PART_TIME_EXAMPLE_TWELVE,
  PT_RMMG_CONTINENTAL_ANNUAL,
  PT_RMMG_CONTINENTAL_MONTHLY,
  PT_RMMG_CONTINENTAL_TWELVE,
  PT_RMMG_PREVIOUS_ANNUAL,
  PT_RMMG_PREVIOUS_MONTHLY,
  PT_SS_WORKER_RATE,
  PT_TRAINING_FLOOR_MONTHLY,
  PT_AZORES_MONTHLY,
  PT_MADEIRA_MONTHLY,
} from "./data";
import {
  annualFromFourteenPayments,
  hourlyFromMonthly,
  percentDiffVsBase,
  prorataOfficialAmount,
  twelveFromFourteenPayments,
} from "./engine";

describe("salaire minimum Portugal - engine", () => {
  it("relie mensualité continentale, équivalent 12 et total annuel", () => {
    expect(PT_RMMG_CONTINENTAL_MONTHLY).toBe(920);
    expect(annualFromFourteenPayments(920)).toBe(12880);
    expect(PT_RMMG_CONTINENTAL_ANNUAL).toBe(12880);
    expect(twelveFromFourteenPayments(920)).toBe(1073.33);
    expect(PT_RMMG_CONTINENTAL_TWELVE).toBe(1073.33);
    expect(920 * 14).toBe(12880);
    expect(Math.round(1073.33 * 12 * 100) / 100).toBe(12879.96);
  });

  it("reprend la RMMG 2025 et les montants régionaux", () => {
    expect(PT_RMMG_PREVIOUS_MONTHLY).toBe(870);
    expect(PT_RMMG_PREVIOUS_ANNUAL).toBe(12180);
    expect(PT_RMMG_CONTINENTAL_ANNUAL - PT_RMMG_PREVIOUS_ANNUAL).toBe(700);
    expect(PT_AZORES_MONTHLY).toBe(966);
    expect(920 * 1.05).toBe(966);
    expect(PT_MADEIRA_MONTHLY).toBe(980);
  });

  it("applique la formule horaire de l'article 271 avec 12, pas 14", () => {
    expect(hourlyFromMonthly(920, 40)).toBe(5.31);
    expect(PT_HOURLY_EXAMPLE).toBe(5.31);
    expect((920 * 12) / (52 * 40)).toBeCloseTo(5.307692, 5);
  });

  it("proratise un mi-temps pédagogique sur 40 h", () => {
    expect(prorataOfficialAmount(920, 20, 40)).toBe(460);
    expect(prorataOfficialAmount(1073.33, 20, 40)).toBe(536.67);
    expect(prorataOfficialAmount(12880, 20, 40)).toBe(6440);
    expect(PT_PART_TIME_EXAMPLE_MONTHLY).toBe(460);
    expect(PT_PART_TIME_EXAMPLE_TWELVE).toBe(536.67);
    expect(PT_PART_TIME_EXAMPLE_ANNUAL).toBe(6440);
  });

  it("calcule l'écart annuel indicatif avec le SMIC français", () => {
    expect(PT_COMPARE_FR_MONTHLY).toBe(1867.02);
    expect(PT_COMPARE_FR_ANNUAL).toBe(22404.2);
    expect(percentDiffVsBase(12880, 22404.2)).toBe(PT_COMPARE_ANNUAL_PCT_VS_FR);
    expect(PT_COMPARE_ANNUAL_PCT_VS_FR).toBeLessThan(0);
  });

  it("illustre un net continental avant IRS sans l'étendre aux îles", () => {
    expect(PT_SS_WORKER_RATE).toBe(0.11);
    expect(PT_NET_BEFORE_IRS_CONTINENTAL).toBe(818.8);
    expect(PT_TRAINING_FLOOR_MONTHLY).toBe(736);
  });
});
