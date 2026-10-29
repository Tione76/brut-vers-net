import { describe, expect, it } from "vitest";
import {
  ES_COMPARE_ANNUAL_PCT_VS_FR,
  ES_COMPARE_FR_ANNUAL,
  ES_COMPARE_FR_MONTHLY,
  ES_COMPARE_TWELVE_PCT_VS_FR,
  ES_PART_TIME_EXAMPLE_ANNUAL,
  ES_PART_TIME_EXAMPLE_FOURTEEN,
  ES_PART_TIME_EXAMPLE_TWELVE,
  ES_SMI_ANNUAL,
  ES_SMI_FOURTEEN_MONTHLY,
  ES_SMI_PREVIOUS_ANNUAL,
  ES_SMI_PREVIOUS_FOURTEEN_MONTHLY,
  ES_SMI_TWELVE_MONTHLY,
  ES_SS_WORKER_INDEF_TOTAL,
  ES_SS_WORKER_TEMP_TOTAL,
} from "./data";
import {
  annualFromFourteenPayments,
  percentDiffVsBase,
  prorataOfficialAmount,
  twelveFromFourteenPayments,
} from "./engine";

describe("salaire minimum Espagne - engine", () => {
  it("relie 14 versements, équivalent 12 et total annuel officiels", () => {
    expect(ES_SMI_FOURTEEN_MONTHLY).toBe(1221);
    expect(annualFromFourteenPayments(1221)).toBe(17094);
    expect(ES_SMI_ANNUAL).toBe(17094);
    expect(twelveFromFourteenPayments(1221)).toBe(1424.5);
    expect(ES_SMI_TWELVE_MONTHLY).toBe(1424.5);
    expect(1221 * 14).toBe(17094);
  });

  it("reprend le SMI 2025 du décret précédent", () => {
    expect(ES_SMI_PREVIOUS_FOURTEEN_MONTHLY).toBe(1184);
    expect(ES_SMI_PREVIOUS_ANNUAL).toBe(16576);
    expect(1184 * 14).toBe(16576);
    expect(ES_SMI_ANNUAL - ES_SMI_PREVIOUS_ANNUAL).toBe(518);
  });

  it("proratise un mi-temps pédagogique sur 40 h", () => {
    expect(prorataOfficialAmount(1221, 20, 40)).toBe(610.5);
    expect(prorataOfficialAmount(1424.5, 20, 40)).toBe(712.25);
    expect(prorataOfficialAmount(17094, 20, 40)).toBe(8547);
    expect(ES_PART_TIME_EXAMPLE_FOURTEEN).toBe(610.5);
    expect(ES_PART_TIME_EXAMPLE_TWELVE).toBe(712.25);
    expect(ES_PART_TIME_EXAMPLE_ANNUAL).toBe(8547);
  });

  it("calcule l'écart annuel indicatif avec le SMIC français", () => {
    expect(ES_COMPARE_FR_MONTHLY).toBe(1867.02);
    expect(ES_COMPARE_FR_ANNUAL).toBe(22404.2);
    expect(percentDiffVsBase(17094, 22404.2)).toBe(ES_COMPARE_ANNUAL_PCT_VS_FR);
    expect(percentDiffVsBase(1424.5, 1867.02)).toBe(ES_COMPARE_TWELVE_PCT_VS_FR);
  });

  it("additionne les cotisations salariales 2026 sans inventer un net", () => {
    expect(Number(ES_SS_WORKER_INDEF_TOTAL.toFixed(4))).toBe(0.065);
    expect(Number(ES_SS_WORKER_TEMP_TOTAL.toFixed(4))).toBe(0.0655);
  });
});
