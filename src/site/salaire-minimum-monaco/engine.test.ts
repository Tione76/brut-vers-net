import { describe, expect, it } from "vitest";
import {
  MC_COMPARE_FR_HOURLY,
  MC_COMPARE_FR_MONTHLY,
  MC_FULL_TIME_MONTHLY_HOURS,
  MC_FULL_TIME_WEEKLY,
  MC_INDEMNITY_MONTHLY,
  MC_PART_TIME_20_INDEMNITY,
  MC_PART_TIME_20_MONTHLY,
  MC_PART_TIME_20_TOTAL,
  MC_SMIC_HOURLY,
  MC_SMIC_MONTHLY,
  MC_TOTAL_BEFORE_DEDUCTIONS,
  MC_YOUTH_16_MONTHLY,
  MC_YOUTH_17_MONTHLY,
} from "./data";
import {
  exceptionAllowance,
  prorataOfficialMonthly,
  totalBeforeDeductions,
} from "./engine";

describe("salaire minimum Monaco - engine", () => {
  it("reprend les montants publiés sans reconstruire le mensuel depuis l'horaire", () => {
    expect(MC_SMIC_HOURLY).toBe(12.31);
    expect(MC_SMIC_MONTHLY).toBe(2080.39);
    expect(MC_FULL_TIME_WEEKLY).toBe(39);
    expect(MC_FULL_TIME_MONTHLY_HOURS).toBe(169);
    expect(MC_YOUTH_17_MONTHLY).toBe(1872.52);
    expect(MC_YOUTH_16_MONTHLY).toBe(1664.65);
  });

  it("calcule l'indemnité de 5 % sur la base mensuelle, arrondie au centime", () => {
    expect(exceptionAllowance(2080.39)).toBe(104.02);
    expect(MC_INDEMNITY_MONTHLY).toBe(104.02);
    expect(totalBeforeDeductions(2080.39)).toBe(2184.41);
    expect(MC_TOTAL_BEFORE_DEDUCTIONS).toBe(2184.41);
    expect(MC_TOTAL_BEFORE_DEDUCTIONS).not.toBe(MC_SMIC_MONTHLY);
  });

  it("ne multiplie pas un horaire déjà arrondi pour retrouver le total des 5 %", () => {
    const wrongHourlyShortcut = Number((12.31 * 1.05).toFixed(2)) * 169;
    expect(wrongHourlyShortcut).not.toBe(MC_TOTAL_BEFORE_DEDUCTIONS);
  });

  it("proratise un mensuel officiel à temps partiel avant d'appliquer les 5 %", () => {
    expect(prorataOfficialMonthly(2080.39, 20, 39)).toBe(1066.87);
    expect(MC_PART_TIME_20_MONTHLY).toBe(1066.87);
    expect(MC_PART_TIME_20_INDEMNITY).toBe(53.34);
    expect(MC_PART_TIME_20_TOTAL).toBe(1120.21);
  });

  it("aligne le taux horaire français centralisé, sans en faire le mensuel monégasque", () => {
    expect(MC_COMPARE_FR_HOURLY).toBe(12.31);
    expect(MC_COMPARE_FR_MONTHLY).toBe(1867.02);
    expect(MC_COMPARE_FR_MONTHLY).not.toBe(MC_SMIC_MONTHLY);
  });
});
