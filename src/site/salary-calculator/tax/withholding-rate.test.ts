import { describe, expect, it } from "vitest";
import { applyWithholdingAmounts, calculateSalary } from "@/site/salary-calculator/engine";
import {
  clampWithholdingRate,
  estimateNeutralWithholdingRate,
  formatWithholdingRatePercent,
  resolveEffectiveWithholdingRate,
} from "@/site/salary-calculator/tax";

describe("resolveEffectiveWithholdingRate", () => {
  it("retourne 0 % sans salaire", () => {
    const result = resolveEffectiveWithholdingRate("auto", null, 5);
    expect(result.rate).toBe(0);
    expect(result.estimate).toBeNull();
    expect(result.hasSalary).toBe(false);
  });

  it("estime automatiquement le taux en mode auto", () => {
    const result = resolveEffectiveWithholdingRate("auto", 1950, 0);
    expect(result.rate).toBe(2.9);
    expect(result.estimate?.rate).toBe(2.9);
    expect(result.hasSalary).toBe(true);
  });

  it("met à jour le taux en mode auto quand le salaire change", () => {
    const low = resolveEffectiveWithholdingRate("auto", 1500, 0);
    const high = resolveEffectiveWithholdingRate("auto", 4000, 0);
    expect(low.rate).not.toBe(high.rate);
  });

  it("conserve le taux manuel en mode manual", () => {
    const result = resolveEffectiveWithholdingRate("manual", 1950, 11.5);
    expect(result.rate).toBe(11.5);
    expect(result.estimate).toBeNull();
  });

  it("conserve le taux manuel même si le salaire change", () => {
    const result = resolveEffectiveWithholdingRate("manual", 4000, 7.2);
    expect(result.rate).toBe(7.2);
  });

  it("revient au taux estimé en repassant en mode auto", () => {
    const manual = resolveEffectiveWithholdingRate("manual", 1950, 15);
    expect(manual.rate).toBe(15);
    const auto = resolveEffectiveWithholdingRate("auto", 1950, 15);
    expect(auto.rate).toBe(2.9);
  });
});

describe("clampWithholdingRate", () => {
  it("borne le taux entre 0 et 43", () => {
    expect(clampWithholdingRate(-1)).toBe(0);
    expect(clampWithholdingRate(50)).toBe(43);
  });

  it("conserve une décimale", () => {
    expect(clampWithholdingRate(5.34)).toBe(5.3);
  });
});

describe("formatWithholdingRatePercent", () => {
  it("affiche une décimale uniquement si nécessaire", () => {
    expect(formatWithholdingRatePercent(0)).toBe("0 %");
    expect(formatWithholdingRatePercent(0.5)).toBe("0,5 %");
    expect(formatWithholdingRatePercent(5.3)).toBe("5,3 %");
    expect(formatWithholdingRatePercent(43)).toBe("43 %");
  });
});

describe("withholding after-tax amounts", () => {
  it("recalcule le net mensuel et annuel après impôt", () => {
    const base = calculateSalary({
      activeInput: "grossMonthly",
      activeValue: "3000",
      profile: "nonExecutive",
      workTimePercent: 100,
      salaryMonths: 12,
      withholdingTaxRate: 0,
    });

    expect(base).not.toBeNull();

    const afterTax = applyWithholdingAmounts(
      base!.netMonthly,
      base!.netAnnual,
      base!.netMonthly,
      base!.netAnnual,
      10,
    );
    expect(afterTax.withholdingMonthly).toBeCloseTo(base!.netMonthly * 0.1, 2);
    expect(afterTax.netAfterTaxMonthly).toBeCloseTo(base!.netMonthly * 0.9, 2);
    expect(afterTax.netAfterTaxAnnual).toBeCloseTo(base!.netAnnual * 0.9, 2);
  });

  it("applique 0 % et 43 % sans NaN", () => {
    const base = calculateSalary({
      activeInput: "grossMonthly",
      activeValue: "5000",
      profile: "nonExecutive",
      workTimePercent: 100,
      salaryMonths: 12,
      withholdingTaxRate: 0,
    });

    expect(base).not.toBeNull();

    const zero = applyWithholdingAmounts(
      base!.netMonthly,
      base!.netAnnual,
      base!.netMonthly,
      base!.netAnnual,
      0,
    );
    expect(zero.netAfterTaxMonthly).toBe(base!.netMonthly);
    expect(Number.isFinite(zero.netAfterTaxAnnual)).toBe(true);

    const max = applyWithholdingAmounts(
      base!.netMonthly,
      base!.netAnnual,
      base!.netMonthly,
      base!.netAnnual,
      43,
    );
    expect(max.netAfterTaxMonthly).toBeLessThan(base!.netMonthly);
    expect(Number.isFinite(max.netAfterTaxAnnual)).toBe(true);
  });

  it("aligne le taux auto sur le barème pour un salaire saisi", () => {
    const base = calculateSalary({
      activeInput: "grossMonthly",
      activeValue: "2500",
      profile: "nonExecutive",
      workTimePercent: 100,
      salaryMonths: 12,
      withholdingTaxRate: 0,
    });

    expect(base).not.toBeNull();

    const resolved = resolveEffectiveWithholdingRate("auto", base!.netMonthly, 0);
    const expected = estimateNeutralWithholdingRate(base!.netMonthly).rate;
    expect(resolved.rate).toBe(expected);
  });
});

describe("reset behavior", () => {
  it("revient à 0 % sans salaire après reset simulé", () => {
    const result = resolveEffectiveWithholdingRate("auto", null, 0);
    expect(result.rate).toBe(0);
    expect(result.hasSalary).toBe(false);
  });
});
