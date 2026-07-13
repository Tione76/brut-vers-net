import { describe, expect, it } from "vitest";
import { parseSalaryAmount } from "@/site/salary-calculator/parsing";
import {
  validateSalaryField,
  validateWithholdingTaxRate,
  validateWorkTimePercent,
} from "@/site/salary-calculator/validation";

describe("parseSalaryAmount", () => {
  it("accepte une valeur vide", () => {
    expect(parseSalaryAmount("")).toBeNull();
  });

  it("accepte la virgule française", () => {
    expect(parseSalaryAmount("2500,50")).toBe(2500.5);
  });

  it("accepte les espaces de milliers", () => {
    expect(parseSalaryAmount("2 500")).toBe(2500);
  });

  it("refuse une valeur négative", () => {
    expect(parseSalaryAmount("-100")).toBeNull();
  });
});

describe("validation", () => {
  it("signale un montant invalide", () => {
    expect(validateSalaryField("abc")).toMatch(/numérique/i);
  });

  it("signale un temps de travail invalide", () => {
    expect(validateWorkTimePercent(5)).toMatch(/10 %/);
  });

  it("signale un taux de prélèvement invalide", () => {
    expect(validateWithholdingTaxRate("55")).toMatch(/43 %/);
  });
});

describe("reset defaults", () => {
  it("valide les bornes par défaut", () => {
    expect(validateWorkTimePercent(100)).toBeNull();
    expect(validateWithholdingTaxRate("0")).toBeNull();
    expect(validateSalaryField("")).toBeNull();
  });
});
