import { describe, expect, it } from "vitest";
import {
  IT_COMMERCE_IV_BASE,
  IT_COMMERCE_IV_CONTINGENZA,
  IT_COMMERCE_IV_TOTAL,
  IT_COMMERCE_TERZO_ELEMENTO,
  IT_COMMERCE_VII_BASE,
  IT_COMMERCE_VII_CONTINGENZA,
  IT_COMMERCE_VII_EXTRA_BASE,
  IT_COMMERCE_VII_TOTAL,
  IT_METAL_D1,
  IT_METAL_D1_ANNUAL_13,
  IT_METAL_D1_HALF,
  IT_PEDAGOGICAL_ANNUAL_13,
  IT_PEDAGOGICAL_ANNUAL_14,
  IT_PEDAGOGICAL_MONTHLY,
} from "./data";
import { annualFromMonthly, formatItEuro, prorataMonthly } from "./engine";

describe("salaire minimum Italie - engine", () => {
  it("annualise une mensualité sans inventer un diviseur horaire", () => {
    expect(annualFromMonthly(IT_PEDAGOGICAL_MONTHLY, 13)).toBe(19500);
    expect(annualFromMonthly(IT_PEDAGOGICAL_MONTHLY, 14)).toBe(21000);
    expect(IT_PEDAGOGICAL_ANNUAL_13).toBe(19500);
    expect(IT_PEDAGOGICAL_ANNUAL_14).toBe(21000);
    expect(IT_PEDAGOGICAL_ANNUAL_13).not.toBe(IT_PEDAGOGICAL_ANNUAL_14);
    expect(annualFromMonthly(IT_METAL_D1, 13)).toBe(IT_METAL_D1_ANNUAL_13);
    expect(IT_METAL_D1_ANNUAL_13).toBe(23204.22);
  });

  it("proratise une mensualité sans toucher aux indemnités", () => {
    expect(prorataMonthly(IT_METAL_D1, 0.5)).toBe(IT_METAL_D1_HALF);
    expect(IT_METAL_D1_HALF).toBe(892.47);
    expect(prorataMonthly(IT_COMMERCE_IV_TOTAL, 0)).toBe(0);
  });

  it("compose les totaux commerce sans omettre l'élément additionnel du niveau VII", () => {
    expect(
      IT_COMMERCE_IV_BASE + IT_COMMERCE_IV_CONTINGENZA + IT_COMMERCE_TERZO_ELEMENTO,
    ).toBeCloseTo(IT_COMMERCE_IV_TOTAL, 2);
    expect(
      IT_COMMERCE_VII_BASE +
        IT_COMMERCE_VII_EXTRA_BASE +
        IT_COMMERCE_VII_CONTINGENZA +
        IT_COMMERCE_TERZO_ELEMENTO,
    ).toBeCloseTo(IT_COMMERCE_VII_TOTAL, 2);
  });

  it("formate les euros sans inventer un montant national", () => {
    expect(formatItEuro(1292.46).replace(/\s/g, " ")).toBe("1 292,46 €");
    expect(formatItEuro(IT_METAL_D1).replace(/\s/g, " ")).toContain("1 784,94");
  });
});
