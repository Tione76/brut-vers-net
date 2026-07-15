import { describe, expect, it } from "vitest";
import { EMPLOYMENT_PROFILES } from "@/site/salary-calculator/config";
import { calculateSalary } from "@/site/salary-calculator/engine";
import type { EmploymentProfile } from "@/site/salary-calculator/types";
import {
  annualFromMonthly,
  calculateSalaryIncrease,
  monthlyFromAnnual,
  resolveCurrentGrossMonthly,
  resolveMonthlyIncreaseEuros,
} from "./engine";
import type { SalaryIncreaseInput } from "./types";

const profiles = EMPLOYMENT_PROFILES.map((profile) => profile.id);

function baseInput(overrides: Partial<SalaryIncreaseInput> = {}): SalaryIncreaseInput {
  return {
    referenceField: "grossMonthly",
    currentSalaryValue: "2500",
    increaseType: "euros",
    increaseReferenceField: "grossMonthlyIncrease",
    increaseValue: "200",
    profile: "nonExecutive",
    salaryMonths: 12,
    withholdingRateMode: "auto",
    manualWithholdingRate: 0,
    ...overrides,
  };
}

describe("calculateSalaryIncrease euros", () => {
  it("calcule le nouveau brut et le gain brut mensuel", () => {
    const result = calculateSalaryIncrease(baseInput());

    expect(result).not.toBeNull();
    expect(result?.before.grossMonthly).toBe(2500);
    expect(result?.after.grossMonthly).toBe(2700);
    expect(result?.gain.grossMonthly).toBe(200);
    expect(result?.gain.grossAnnual).toBe(2400);
  });

  it("calcule un gain net cohérent avec le moteur principal", () => {
    const result = calculateSalaryIncrease(baseInput());
    const baseline = calculateSalary({
      activeInput: "grossMonthly",
      activeValue: "2500",
      profile: "nonExecutive",
      workTimePercent: 100,
      salaryMonths: 12,
      withholdingTaxRate: 0,
    });

    expect(result).not.toBeNull();
    expect(baseline).not.toBeNull();
    expect(result?.before.netMonthly).toBe(baseline?.netMonthly);
    expect(result?.gain.netMonthly).toBeCloseTo(
      (result?.after.netMonthly ?? 0) - (result?.before.netMonthly ?? 0),
      2,
    );
    expect(result?.gain.netAnnual).toBeCloseTo(result!.gain.netMonthly * 12, 2);
  });

  it("formule une phrase de synthèse unique", () => {
    const result = calculateSalaryIncrease(baseInput());
    expect(result?.summaryBrief).toContain("augmentation brute");
    expect(result?.summaryBrief).toContain("12 mois");
  });
});

describe("calculateSalaryIncrease gross annual reference", () => {
  it("convertit 32 500 € annuels sur 13 mois en 2 500 € mensuels", () => {
    expect(resolveCurrentGrossMonthly("grossAnnual", "32500", "nonExecutive", 13)).toBe(2500);
  });

  it("applique +200 € sur un brut mensuel issu du brut annuel", () => {
    const result = calculateSalaryIncrease(
      baseInput({
        referenceField: "grossAnnual",
        currentSalaryValue: "30000",
        salaryMonths: 12,
        increaseReferenceField: "grossMonthlyIncrease",
        increaseValue: "200",
      }),
    );

    expect(result).not.toBeNull();
    expect(result?.before.grossMonthly).toBe(2500);
    expect(result?.after.grossMonthly).toBe(2700);
  });

  it("applique 5 % sur 30 000 € brut annuel", () => {
    const result = calculateSalaryIncrease(
      baseInput({
        referenceField: "grossAnnual",
        currentSalaryValue: "30000",
        salaryMonths: 12,
        increaseType: "percent",
        increaseReferenceField: null,
        increaseValue: "5",
      }),
    );

    expect(result).not.toBeNull();
    expect(result?.before.grossMonthly).toBe(2500);
    expect(result?.after.grossMonthly).toBe(2625);
  });
});

describe("increase sync helpers", () => {
  it("calcule l'augmentation annuelle depuis le mensuel sur 12 mois", () => {
    expect(annualFromMonthly(200, 12)).toBe(2400);
  });

  it("calcule l'augmentation mensuelle depuis l'annuel sur 12 mois", () => {
    expect(monthlyFromAnnual(2400, 12)).toBe(200);
  });

  it("calcule l'augmentation mensuelle depuis l'annuel sur 13 mois", () => {
    expect(monthlyFromAnnual(3000, 13)).toBeCloseTo(230.77, 2);
  });

  it("recalcule le mensuel quand les mois passent de 12 à 13 avec référence annuelle", () => {
    expect(resolveMonthlyIncreaseEuros("grossAnnualIncrease", "3000", 12)).toBe(250);
    expect(resolveMonthlyIncreaseEuros("grossAnnualIncrease", "3000", 13)).toBeCloseTo(230.77, 2);
  });

  it("conserve le mensuel quand les mois changent avec référence mensuelle", () => {
    expect(resolveMonthlyIncreaseEuros("grossMonthlyIncrease", "200", 12)).toBe(200);
    expect(resolveMonthlyIncreaseEuros("grossMonthlyIncrease", "200", 13)).toBe(200);
  });

  it("équivalents 200 € mensuels et 2 400 € annuels sur 12 mois", () => {
    const fromMonthly = calculateSalaryIncrease(
      baseInput({
        increaseReferenceField: "grossMonthlyIncrease",
        increaseValue: "200",
        salaryMonths: 12,
      }),
    );
    const fromAnnual = calculateSalaryIncrease(
      baseInput({
        increaseReferenceField: "grossAnnualIncrease",
        increaseValue: "2400",
        salaryMonths: 12,
      }),
    );

    expect(fromMonthly?.after.grossMonthly).toBe(fromAnnual?.after.grossMonthly);
    expect(fromMonthly?.gain.grossMonthly).toBe(fromAnnual?.gain.grossMonthly);
    expect(fromMonthly?.gain.netMonthly).toBeCloseTo(fromAnnual?.gain.netMonthly ?? 0, 2);
  });

  it("accepte la virgule française pour l'augmentation annuelle", () => {
    const monthly = resolveMonthlyIncreaseEuros("grossAnnualIncrease", "2 400,50", 12);
    expect(monthly).toBeCloseTo(200.04, 2);
  });

  it("refuse zéro et valeurs invalides", () => {
    expect(resolveMonthlyIncreaseEuros("grossMonthlyIncrease", "0", 12)).toBeNull();
    expect(resolveMonthlyIncreaseEuros("grossAnnualIncrease", "-100", 12)).toBeNull();
    expect(resolveMonthlyIncreaseEuros("grossMonthlyIncrease", "abc", 12)).toBeNull();
  });
});

describe("salary sync helpers", () => {
  it("synchronise brut mensuel vers annuel selon les mois", () => {
    expect(annualFromMonthly(2500, 12)).toBe(30000);
    expect(annualFromMonthly(2500, 13)).toBe(32500);
  });

  it("synchronise brut annuel vers mensuel selon les mois", () => {
    expect(monthlyFromAnnual(32500, 13)).toBe(2500);
    expect(monthlyFromAnnual(30000, 12)).toBe(2500);
  });

  it("recalcule le mensuel quand les mois passent de 12 à 13 après saisie annuelle", () => {
    expect(monthlyFromAnnual(30000, 12)).toBe(2500);
    expect(monthlyFromAnnual(30000, 13)).toBeCloseTo(2307.69, 2);
  });

  it("recalcule l'annuel quand les mois passent de 12 à 13 après saisie mensuelle", () => {
    expect(annualFromMonthly(2500, 12)).toBe(30000);
    expect(annualFromMonthly(2500, 13)).toBe(32500);
  });
});

describe("calculateSalaryIncrease percent", () => {
  it("applique un pourcentage sur le brut actuel", () => {
    const result = calculateSalaryIncrease(
      baseInput({
        currentSalaryValue: "3000",
        increaseType: "percent",
        increaseReferenceField: null,
        increaseValue: "5",
      }),
    );

    expect(result).not.toBeNull();
    expect(result?.after.grossMonthly).toBe(3150);
    expect(result?.gain.grossMonthly).toBe(150);
  });
});

describe("calculateSalaryIncrease from net", () => {
  it("reconstitue le brut puis applique l'augmentation", () => {
    const fromGross = calculateSalaryIncrease(
      baseInput({ currentSalaryValue: "2500", increaseValue: "200" }),
    );
    const netStart = fromGross?.before.netMonthly ?? 0;

    const fromNet = calculateSalaryIncrease(
      baseInput({
        referenceField: "netMonthly",
        currentSalaryValue: String(netStart),
        increaseReferenceField: "grossMonthlyIncrease",
        increaseValue: "200",
      }),
    );

    expect(fromNet).not.toBeNull();
    expect(fromNet?.after.grossMonthly).toBe(fromGross?.after.grossMonthly);
    expect(fromNet?.gain.netMonthly).toBeCloseTo(fromGross?.gain.netMonthly ?? 0, 2);
  });
});

describe("calculateSalaryIncrease profiles", () => {
  it.each(profiles)("produit un gain net positif pour %s", (profile) => {
    const result = calculateSalaryIncrease(
      baseInput({ profile: profile as EmploymentProfile, increaseValue: "100" }),
    );

    expect(result).not.toBeNull();
    expect(result?.gain.netMonthly).toBeGreaterThan(0);
    expect(result?.gain.netMonthly).toBeLessThan(100);
  });
});

describe("calculateSalaryIncrease salary months", () => {
  it.each([12, 13] as const)("multiplie le gain annuel sur %s mois", (salaryMonths) => {
    const result = calculateSalaryIncrease(baseInput({ salaryMonths }));

    expect(result).not.toBeNull();
    expect(result?.gain.netAnnual).toBeCloseTo(result!.gain.netMonthly * salaryMonths, 2);
    expect(result?.summaryBrief).toContain(String(salaryMonths));
  });
});

describe("calculateSalaryIncrease withholding", () => {
  it("calcule le gain avant et après impôt sans montant négatif", () => {
    const result = calculateSalaryIncrease(
      baseInput({ withholdingRateMode: "manual", manualWithholdingRate: 10 }),
    );

    expect(result).not.toBeNull();
    expect(result?.gain.netAfterTaxMonthly).toBeGreaterThan(0);
    expect(result?.gain.netAfterTaxMonthly).toBeLessThan(result?.gain.netMonthly ?? 0);
    expect(result?.gain.netAfterTaxAnnual).toBeGreaterThan(0);
  });

  it("laisse le gain après impôt égal au gain avant impôt à 0 %", () => {
    const result = calculateSalaryIncrease(
      baseInput({ withholdingRateMode: "manual", manualWithholdingRate: 0 }),
    );

    expect(result).not.toBeNull();
    expect(result?.gain.netAfterTaxMonthly).toBe(result?.gain.netMonthly);
  });
});

describe("calculateSalaryIncrease edge cases", () => {
  it("retourne null sans salaire", () => {
    expect(
      calculateSalaryIncrease(baseInput({ currentSalaryValue: "", referenceField: null })),
    ).toBeNull();
  });

  it("refuse une augmentation nulle", () => {
    expect(
      calculateSalaryIncrease(
        baseInput({ increaseReferenceField: "grossMonthlyIncrease", increaseValue: "0" }),
      ),
    ).toBeNull();
  });

  it("retourne null sans référence d'augmentation en euros", () => {
    expect(
      calculateSalaryIncrease(
        baseInput({ increaseReferenceField: null, increaseValue: "200" }),
      ),
    ).toBeNull();
  });

  it("retourne null pour un pourcentage invalide", () => {
    expect(
      calculateSalaryIncrease(
        baseInput({ increaseType: "percent", increaseReferenceField: null, increaseValue: "150" }),
      ),
    ).toBeNull();
  });

  it("accepte la virgule française", () => {
    const result = calculateSalaryIncrease(
      baseInput({
        currentSalaryValue: "30 000,50",
        increaseReferenceField: "grossMonthlyIncrease",
        increaseValue: "200,25",
      }),
    );
    expect(result).not.toBeNull();
    expect(Number.isFinite(result?.after.grossMonthly ?? NaN)).toBe(true);
  });

  it("ne produit pas NaN ni Infinity", () => {
    const result = calculateSalaryIncrease(baseInput());
    const values = result
      ? [
          ...Object.values(result.before),
          ...Object.values(result.after),
          ...Object.values(result.gain),
          ...Object.values(result.percentGain),
        ]
      : [];

    values.forEach((value) => {
      expect(Number.isFinite(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(0);
    });
  });
});
