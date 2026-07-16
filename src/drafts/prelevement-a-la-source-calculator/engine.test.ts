import { describe, expect, it } from "vitest";
import { PAS_FULL_TIME_PERCENT, PAS_MONTHS_PER_YEAR } from "./config";
import {
  calculatePasWithholding,
  pasAnnualToMonthly,
  pasMonthlyToAnnual,
} from "./engine";
import type { PasCalculatorInput } from "./types";

function baseInput(overrides: Partial<PasCalculatorInput> = {}): PasCalculatorInput {
  return {
    taxableAnnualRaw: "",
    referenceField: "grossMonthly",
    currentSalaryValue: "2500",
    profile: "nonExecutive",
    withholdingRateMode: "auto",
    manualWithholdingRate: 0,
    ...overrides,
  };
}

describe("PAS constants (mode simple)", () => {
  it("fixe la base annuelle à 12 mois", () => {
    expect(PAS_MONTHS_PER_YEAR).toBe(12);
  });

  it("n'expose pas de temps de travail variable", () => {
    expect(PAS_FULL_TIME_PERCENT).toBe(100);
    expect(baseInput()).not.toHaveProperty("workTimePercent");
    expect(baseInput()).not.toHaveProperty("salaryMonths");
  });
});

describe("pasMonthlyToAnnual / pasAnnualToMonthly", () => {
  it("convertit sur 12 mois", () => {
    expect(pasMonthlyToAnnual(2500)).toBe(30000);
    expect(pasAnnualToMonthly(30000)).toBe(2500);
  });
});

describe("calculatePasWithholding", () => {
  it("estime un taux et un montant prélevé positifs", () => {
    const result = calculatePasWithholding(baseInput());
    expect(result).not.toBeNull();
    expect(result!.incomeSource).toBe("salary");
    expect(result!.withholdingRate).toBeGreaterThanOrEqual(0);
    expect(result!.withholdingMonthly).toBeGreaterThanOrEqual(0);
    expect(result!.netAfterTaxMonthly!).toBeLessThanOrEqual(result!.netMonthly!);
    expect(result!.netMonthly!).toBeLessThan(result!.grossMonthly!);
  });

  it("aligne brut annuel = brut mensuel × 12", () => {
    const result = calculatePasWithholding(baseInput({ currentSalaryValue: "2500" }));
    expect(result!.grossAnnual).toBe(pasMonthlyToAnnual(result!.grossMonthly!));
  });

  it("reconstitue depuis le brut annuel (÷ 12)", () => {
    const result = calculatePasWithholding(
      baseInput({
        referenceField: "grossAnnual",
        currentSalaryValue: "30000",
      }),
    );
    expect(result).not.toBeNull();
    expect(result!.grossMonthly).toBe(2500);
  });

  it("priorité au net imposable annuel direct", () => {
    const result = calculatePasWithholding(
      baseInput({
        taxableAnnualRaw: "28000",
        referenceField: "grossMonthly",
        currentSalaryValue: "5000",
      }),
    );
    expect(result).not.toBeNull();
    expect(result!.incomeSource).toBe("taxableAnnual");
    expect(result!.netMonthly).toBeNull();
    expect(result!.withholdingAnnual).toBeGreaterThan(0);
  });

  it("applique un taux manuel personnalisé", () => {
    const auto = calculatePasWithholding(baseInput());
    const manual = calculatePasWithholding(
      baseInput({ withholdingRateMode: "manual", manualWithholdingRate: 10 }),
    );
    expect(manual).not.toBeNull();
    expect(manual!.withholdingRate).toBe(10);
    expect(manual!.withholdingMonthly).toBeGreaterThan(auto!.withholdingMonthly);
  });

  it("reconstitue le brut depuis le net", () => {
    const fromGross = calculatePasWithholding(baseInput());
    const fromNet = calculatePasWithholding(
      baseInput({
        referenceField: "netMonthly",
        currentSalaryValue: String(fromGross!.netMonthly).replace(".", ","),
      }),
    );
    expect(fromNet).not.toBeNull();
    expect(fromNet!.grossMonthly).toBeCloseTo(fromGross!.grossMonthly!, 0);
  });

  it("recalcule quand le statut change", () => {
    const nonExec = calculatePasWithholding(baseInput({ profile: "nonExecutive" }));
    const exec = calculatePasWithholding(baseInput({ profile: "executive" }));
    expect(exec!.netMonthly).not.toBe(nonExec!.netMonthly);
  });

  it("retourne null sans salaire", () => {
    expect(
      calculatePasWithholding(baseInput({ referenceField: null, currentSalaryValue: "" })),
    ).toBeNull();
  });
});
