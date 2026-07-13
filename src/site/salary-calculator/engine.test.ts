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
