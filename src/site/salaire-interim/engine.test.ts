import { describe, expect, it } from "vitest";
import { SMIC_CURRENT } from "@/site/smic/data";
import { roundCent } from "@/site/salary-calculator";
import {
  calculateInterimSalary,
  computeIfmAmount,
  computeIccpAmount,
  computeMissionGrossFromHours,
  parseInterimNumber,
  validateIfmRatePercent,
  validateIccpRatePercent,
} from "./engine";
import { formatEuroApprox, formatEuroApproxWord } from "./data";

describe("salaire-interim engine", () => {
  it("cas 1 - 1 000 € : IFM 100, ICCP 110, total 1 210", () => {
    const result = calculateInterimSalary({
      mode: "missionGross",
      missionGross: 1000,
      ifmDue: true,
      ifmRatePercent: 10,
      iccpRatePercent: 10,
    });
    expect(result).not.toBeNull();
    expect(result!.ifmAmount).toBe(100);
    expect(result!.iccpBase).toBe(1100);
    expect(result!.iccpAmount).toBe(110);
    expect(result!.totalGross).toBe(1210);
    expect(result!.grossMultiplier).toBe(1.21);
    expect(result!.netEstimated).toBe(roundCent(1210 * 0.78));
    expect(result!.netEstimatedRounded).toBe(Math.round(result!.netEstimated));
    expect(formatEuroApprox(result!.netEstimated)).toMatch(/^≈/);
  });

  it("cas 2 - sans IFM : ICCP sur le seul brut de mission", () => {
    const result = calculateInterimSalary({
      mode: "missionGross",
      missionGross: 2000,
      ifmDue: false,
      ifmRatePercent: 10,
      iccpRatePercent: 10,
    })!;
    expect(result.ifmAmount).toBe(0);
    expect(result.ifmRatePercent).toBe(0);
    expect(result.iccpAmount).toBe(200);
    expect(result.totalGross).toBe(2200);
  });

  it("cas 3 - 14 € × 151,67 h (exemple utilisateur, pas SMIC officiel)", () => {
    const result = calculateInterimSalary({
      mode: "hourly",
      hourlyRate: 14,
      normalHours: 151.67,
      overtimeHours25: 0,
      overtimeHours50: 0,
      otherGrossElements: 0,
      ifmDue: true,
      ifmRatePercent: 10,
      iccpRatePercent: 10,
    })!;
    expect(result.missionGross).toBe(2123.38);
    expect(result.ifmAmount).toBe(212.34);
    expect(result.iccpAmount).toBe(233.57);
    expect(result.totalGross).toBe(2569.29);
  });

  it("cas 4 - mission courte 15 € × 35 h", () => {
    const result = calculateInterimSalary({
      mode: "hourly",
      hourlyRate: 15,
      normalHours: 35,
      overtimeHours25: 0,
      overtimeHours50: 0,
      otherGrossElements: 0,
      ifmDue: true,
      ifmRatePercent: 10,
      iccpRatePercent: 10,
    })!;
    expect(result.missionGross).toBe(525);
    expect(result.ifmAmount).toBe(52.5);
    expect(result.iccpAmount).toBe(57.75);
    expect(result.totalGross).toBe(635.25);
  });

  it("cas 5 - heures supplémentaires 14 € / 140 + 8 + 2", () => {
    const parts = computeMissionGrossFromHours({
      hourlyRate: 14,
      normalHours: 140,
      overtimeHours25: 8,
      overtimeHours50: 2,
      otherGrossElements: 0,
    });
    expect(parts.normalHoursGross).toBe(1960);
    expect(parts.overtime25Gross).toBe(140);
    expect(parts.overtime50Gross).toBe(42);
    expect(parts.missionGross).toBe(2142);

    const result = calculateInterimSalary({
      mode: "hourly",
      hourlyRate: 14,
      normalHours: 140,
      overtimeHours25: 8,
      overtimeHours50: 2,
      otherGrossElements: 0,
      ifmDue: true,
      ifmRatePercent: 10,
      iccpRatePercent: 10,
    })!;
    expect(result.missionGross).toBe(2142);
    expect(result.ifmAmount).toBe(214.2);
    expect(result.iccpAmount).toBe(235.62);
    expect(result.totalGross).toBe(2591.82);
    expect(result.netEstimatedRounded).toBe(2022);
  });

  it("cas 6 - SMIC mensuel officiel via constante centralisée", () => {
    const missionGross = SMIC_CURRENT.monthlyGross;
    expect(missionGross).toBe(1867.02);
    expect(roundCent(12.31 * 151.67)).toBe(1867.06);
    expect(roundCent(12.31 * 151.67)).not.toBe(missionGross);

    const ifm = computeIfmAmount(missionGross, true, 10);
    const iccp = computeIccpAmount(missionGross, ifm, 10);
    expect(ifm).toBe(186.7);
    expect(iccp).toBe(205.37);
    expect(roundCent(missionGross + ifm + iccp)).toBe(2259.09);

    const result = calculateInterimSalary({
      mode: "missionGross",
      missionGross,
      ifmDue: true,
      ifmRatePercent: 10,
      iccpRatePercent: 10,
    })!;
    expect(result.totalGross).toBe(2259.09);
    expect(result.netEstimatedRounded).toBe(1762);
  });

  it("IFM standard = 10 %", () => {
    const result = calculateInterimSalary({
      mode: "missionGross",
      missionGross: 1000,
      ifmDue: true,
      ifmRatePercent: 10,
      iccpRatePercent: 10,
    })!;
    expect(result.ifmRatePercent).toBe(10);
    expect(result.ifmAmount).toBe(100);
    expect(result.ifmCustomRateEnabled).toBe(false);
  });

  it("taux personnalisé inférieur à 10 % refusé sans mode conventionnel", () => {
    expect(validateIfmRatePercent(6, true, false).ok).toBe(false);
    expect(
      calculateInterimSalary({
        mode: "missionGross",
        missionGross: 1000,
        ifmDue: true,
        ifmCustomRateEnabled: false,
        ifmRatePercent: 6,
        iccpRatePercent: 10,
      }),
    ).toBeNull();
  });

  it("taux personnalisé de 6 % accepté après activation du mode conventionnel", () => {
    expect(validateIfmRatePercent(6, true, true).ok).toBe(true);
    const result = calculateInterimSalary({
      mode: "missionGross",
      missionGross: 1000,
      ifmDue: true,
      ifmCustomRateEnabled: true,
      ifmRatePercent: 6,
      iccpRatePercent: 10,
    })!;
    expect(result.ifmAmount).toBe(60);
    expect(result.iccpAmount).toBe(106);
    expect(result.totalGross).toBe(1166);
    expect(result.ifmCustomRateEnabled).toBe(true);
  });

  it("taux IFM négatif ou nul refusé en mode conventionnel", () => {
    expect(validateIfmRatePercent(0, true, true).ok).toBe(false);
    expect(validateIfmRatePercent(-1, true, true).ok).toBe(false);
    expect(
      calculateInterimSalary({
        mode: "missionGross",
        missionGross: 1000,
        ifmDue: true,
        ifmCustomRateEnabled: true,
        ifmRatePercent: 0,
        iccpRatePercent: 10,
      }),
    ).toBeNull();
  });

  it("ICCP à 9,99 % toujours refusée", () => {
    expect(validateIccpRatePercent(9.99).ok).toBe(false);
    expect(
      calculateInterimSalary({
        mode: "missionGross",
        missionGross: 1000,
        ifmDue: true,
        ifmRatePercent: 10,
        iccpRatePercent: 9.99,
      }),
    ).toBeNull();
  });

  it("sans IFM = 0 €, indépendamment du taux précédemment saisi", () => {
    expect(validateIfmRatePercent(6, false, true).ok).toBe(true);
    const result = calculateInterimSalary({
      mode: "missionGross",
      missionGross: 2000,
      ifmDue: false,
      ifmCustomRateEnabled: true,
      ifmRatePercent: 6,
      iccpRatePercent: 10,
    })!;
    expect(result.ifmAmount).toBe(0);
    expect(result.ifmRatePercent).toBe(0);
    expect(result.iccpAmount).toBe(200);
    expect(result.totalGross).toBe(2200);
  });

  it("autorise un taux IFM supérieur à 10 % en mode conventionnel", () => {
    const result = calculateInterimSalary({
      mode: "missionGross",
      missionGross: 1000,
      ifmDue: true,
      ifmCustomRateEnabled: true,
      ifmRatePercent: 15,
      iccpRatePercent: 10,
    })!;
    expect(result.ifmAmount).toBe(150);
    expect(result.iccpAmount).toBe(115);
    expect(result.totalGross).toBe(1265);
  });

  it("cas 10 - frais hors assiette et hors net salarial", () => {
    const result = calculateInterimSalary({
      mode: "missionGross",
      missionGross: 1000,
      ifmDue: true,
      ifmRatePercent: 10,
      iccpRatePercent: 10,
      expenseReimbursements: 80,
    })!;
    expect(result.ifmAmount).toBe(100);
    expect(result.iccpAmount).toBe(110);
    expect(result.totalGross).toBe(1210);
    expect(result.expenseReimbursements).toBe(80);
    expect(result.estimatedPayoutWithExpenses).toBe(
      roundCent(result.netEstimatedRounded + 80),
    );
  });

  it("parse et valide les bornes", () => {
    expect(parseInterimNumber("1 000,50")).toBe(1000.5);
    expect(parseInterimNumber("14,50")).toBe(14.5);
    expect(parseInterimNumber("14.50")).toBe(14.5);
    expect(parseInterimNumber("")).toBeNull();
    expect(parseInterimNumber("-2")).toBeNull();
    expect(parseInterimNumber("abc")).toBeNull();

    expect(
      calculateInterimSalary({
        mode: "missionGross",
        missionGross: -1,
        ifmDue: true,
        ifmRatePercent: 10,
        iccpRatePercent: 10,
      }),
    ).toBeNull();
  });

  it("formate le net approximatif sans centimes trompeurs", () => {
    expect(formatEuroApprox(943.8)).toBe("≈\u00a0944\u00a0€");
    expect(formatEuroApproxWord(1762.09)).toMatch(/environ/);
    expect(formatEuroApproxWord(1762.09)).not.toContain(",09");
  });
});
