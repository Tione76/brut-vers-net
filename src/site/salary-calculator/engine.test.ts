import { describe, expect, it } from "vitest";
import { EMPLOYMENT_PROFILES } from "@/site/salary-calculator/config";
import { calculateSalary } from "@/site/salary-calculator/engine";
import type { EmploymentProfile } from "@/site/salary-calculator/types";

const profiles = EMPLOYMENT_PROFILES.map((profile) => profile.id);

describe("calculateSalary profiles", () => {
  it.each(profiles)("calcule un brut mensuel pour %s", (profile) => {
    const result = calculateSalary({
      activeInput: "grossMonthly",
      activeValue: "3000",
      profile: profile as EmploymentProfile,
      workTimePercent: 100,
      salaryMonths: 12,
      withholdingTaxRate: 0,
    });

    expect(result).not.toBeNull();
    expect(result?.grossMonthly).toBe(3000);
    expect(result?.netMonthly).toBeGreaterThan(0);
    expect(result?.netMonthly).toBeLessThan(3000);
  });
});

describe("calculateSalary reciprocity", () => {
  it.each(profiles)("reste réciproque brut/net pour %s", (profile) => {
    const grossResult = calculateSalary({
      activeInput: "grossMonthly",
      activeValue: "2800",
      profile: profile as EmploymentProfile,
      workTimePercent: 100,
      salaryMonths: 12,
      withholdingTaxRate: 0,
    });

    expect(grossResult).not.toBeNull();

    const netResult = calculateSalary({
      activeInput: "netMonthly",
      activeValue: String(grossResult?.netMonthly),
      profile: profile as EmploymentProfile,
      workTimePercent: 100,
      salaryMonths: 12,
      withholdingTaxRate: 0,
    });

    expect(netResult).not.toBeNull();
    expect(Math.abs((netResult?.grossMonthly ?? 0) - 2800)).toBeLessThanOrEqual(0.01);
  });
});

describe("calculateSalary withholding", () => {
  it.each([0, 5, 10, 20])("applique un prélèvement de %s %", (rate) => {
    const result = calculateSalary({
      activeInput: "grossMonthly",
      activeValue: "3000",
      profile: "nonExecutive",
      workTimePercent: 100,
      salaryMonths: 12,
      withholdingTaxRate: rate,
    });

    expect(result).not.toBeNull();
    expect(result?.withholdingMonthly).toBeCloseTo((result?.netMonthly ?? 0) * (rate / 100), 2);
    expect(result?.netAfterTaxMonthly).toBeCloseTo(
      (result?.netMonthly ?? 0) - (result?.withholdingMonthly ?? 0),
      2,
    );
  });

  it("accepte un taux décimal", () => {
    const result = calculateSalary({
      activeInput: "grossMonthly",
      activeValue: "3000",
      profile: "nonExecutive",
      workTimePercent: 100,
      salaryMonths: 12,
      withholdingTaxRate: 7.5,
    });

    expect(result?.withholdingMonthly).toBeCloseTo((result?.netMonthly ?? 0) * 0.075, 2);
  });
});

describe("calculateSalary empty input", () => {
  it("retourne null sans valeur active", () => {
    expect(
      calculateSalary({
        activeInput: null,
        activeValue: "",
        profile: "nonExecutive",
        workTimePercent: 100,
        salaryMonths: 12,
        withholdingTaxRate: 0,
      }),
    ).toBeNull();
  });
});

describe("calculateSalary horaire (moteur existant)", () => {
  it("dérive le mensuel depuis un brut horaire à 100 %", () => {
    const result = calculateSalary({
      activeInput: "grossHourly",
      activeValue: "20",
      profile: "nonExecutive",
      workTimePercent: 100,
      salaryMonths: 12,
      withholdingTaxRate: 0,
    });

    expect(result).not.toBeNull();
    expect(result?.grossHourly).toBe(20);
    expect(result?.grossMonthly).toBeCloseTo(3033.4, 2);
    expect(result?.grossAnnual).toBeCloseTo(36400.8, 2);
  });

  it("réduit le mensuel/annuel à 80 % sans changer le taux horaire", () => {
    const result = calculateSalary({
      activeInput: "grossHourly",
      activeValue: "20",
      profile: "nonExecutive",
      workTimePercent: 80,
      salaryMonths: 12,
      withholdingTaxRate: 0,
    });

    expect(result).not.toBeNull();
    expect(result?.grossHourly).toBe(20);
    expect(result?.grossMonthly).toBeCloseTo(2426.72, 2);
    expect(result?.grossAnnual).toBeCloseTo(29120.64, 2);
  });

  it("prend en compte le nombre de mois en mode horaire", () => {
    const result12 = calculateSalary({
      activeInput: "grossHourly",
      activeValue: "20",
      profile: "nonExecutive",
      workTimePercent: 100,
      salaryMonths: 12,
      withholdingTaxRate: 0,
    });
    const result13 = calculateSalary({
      activeInput: "grossHourly",
      activeValue: "20",
      profile: "nonExecutive",
      workTimePercent: 100,
      salaryMonths: 13,
      withholdingTaxRate: 0,
    });

    expect(result12?.grossMonthly).toBeCloseTo(result13?.grossMonthly ?? 0, 2);
    expect(result13?.grossAnnual).toBeCloseTo((result12?.grossMonthly ?? 0) * 13, 2);
  });

  it("ne modifie pas le mensuel quand le mode période est actif et le temps de travail change", () => {
    const at100 = calculateSalary({
      activeInput: "grossMonthly",
      activeValue: "3000",
      profile: "nonExecutive",
      workTimePercent: 100,
      salaryMonths: 12,
      withholdingTaxRate: 0,
    });
    const at80 = calculateSalary({
      activeInput: "grossMonthly",
      activeValue: "3000",
      profile: "nonExecutive",
      workTimePercent: 80,
      salaryMonths: 12,
      withholdingTaxRate: 0,
    });

    expect(at100?.grossMonthly).toBe(3000);
    expect(at80?.grossMonthly).toBe(3000);
    expect(at100?.netMonthly).toBe(at80?.netMonthly);
    expect(at80?.grossHourly).toBeGreaterThan(at100?.grossHourly ?? 0);
  });
});
