import { describe, expect, it } from "vitest";
import { formatCurrency, roundCent } from "@/site/salary-calculator";
import {
  calculateDismissalCompensation,
  calculateLegalBaseAmount,
  resolveReferenceSalary,
  seniorityToYears,
} from "./engine";
import type { DismissalCompensationInput } from "./types";

function baseInput(
  overrides: Partial<DismissalCompensationInput> = {},
): DismissalCompensationInput {
  return {
    situation: "standard",
    seniorityYears: "4",
    seniorityMonths: "0",
    average12Months: "2000",
    average3Months: "",
    hasBonus: false,
    bonusAmount: "",
    bonusKind: "annual",
    conventionKnowledge: "unknown",
    conventionAmount: "",
    mixedWorkTime: false,
    ...overrides,
  };
}

describe("seniorityToYears", () => {
  it("convertit les mois en fraction d'année", () => {
    expect(seniorityToYears(12, 9)).toBe(12.75);
    expect(seniorityToYears(3, 6)).toBe(3.5);
    expect(seniorityToYears(0, 8)).toBeCloseTo(8 / 12, 10);
  });
});

describe("calculateLegalBaseAmount", () => {
  it("calcule 2 000 € × 1/4 × 4 ans = 2 000 €", () => {
    const result = calculateLegalBaseAmount(2000, 4);
    expect(result.legalBaseAmount).toBe(2000);
    expect(result.secondBracketAmount).toBe(0);
  });

  it("calcule 1 500 € × 1/4 × 3,5 ans = 1 312,50 €", () => {
    const result = calculateLegalBaseAmount(1500, 3.5);
    expect(result.legalBaseAmount).toBe(1312.5);
  });

  it("calcule exactement 10 ans : 2 400 × 1/4 × 10 = 6 000 €", () => {
    expect(calculateLegalBaseAmount(2400, 10).legalBaseAmount).toBe(6000);
  });

  it("calcule au-delà de 10 ans en deux tranches (1 500 €, 12 ans 9 mois)", () => {
    const result = calculateLegalBaseAmount(1500, 12.75);
    expect(result.firstBracketAmount).toBe(3750);
    expect(result.secondBracketAmount).toBe(1375);
    expect(result.legalBaseAmount).toBe(5125);
  });

  it("calcule 2 500 € sur 12 ans 9 mois", () => {
    const result = calculateLegalBaseAmount(2500, 12.75);
    expect(result.firstBracketAmount).toBe(6250);
    expect(result.secondBracketAmount).toBe(2291.67);
    expect(result.legalBaseAmount).toBe(8541.67);
  });
});

describe("resolveReferenceSalary", () => {
  it("retient la moyenne des 3 mois si plus favorable", () => {
    const result = resolveReferenceSalary({
      average12: 2400,
      average3: 2600,
      bonusMonthlyProration: 0,
      totalMonths: 24,
    });
    expect(result.referenceSalary).toBe(2600);
    expect(result.referenceMethod).toBe("average3");
  });

  it("retient la moyenne des 12 mois dans le cas inverse", () => {
    const result = resolveReferenceSalary({
      average12: 2700,
      average3: 2600,
      bonusMonthlyProration: 0,
      totalMonths: 24,
    });
    expect(result.referenceSalary).toBe(2700);
    expect(result.referenceMethod).toBe("average12");
  });

  it("proratise une prime annuelle sur la moyenne des 3 mois", () => {
    const result = resolveReferenceSalary({
      average12: 2500,
      average3: 2500,
      bonusMonthlyProration: roundCent(1200 / 12),
      totalMonths: 24,
    });
    expect(result.referenceSalary).toBe(2600);
    expect(result.referenceMethod).toBe("average3");
  });
});

describe("calculateDismissalCompensation", () => {
  it("retourne 0 € sous 8 mois d'ancienneté", () => {
    const result = calculateDismissalCompensation(
      baseInput({
        seniorityYears: "0",
        seniorityMonths: "7",
        average12Months: "2000",
      }),
    );
    expect(result?.retainedAmount).toBe(0);
    expect(result?.zeroReason).toBe("belowMinSeniority");
  });

  it("calcule proportionnellement à 8 mois", () => {
    const result = calculateDismissalCompensation(
      baseInput({
        seniorityYears: "0",
        seniorityMonths: "8",
        average12Months: "2400",
        average3Months: "",
      }),
    );
    expect(result).not.toBeNull();
    expect(result?.retainedAmount).toBe(
      roundCent(2400 * (1 / 4) * (8 / 12)),
    );
  });

  it("calcule un cas inférieur à 10 ans", () => {
    const result = calculateDismissalCompensation(
      baseInput({
        seniorityYears: "4",
        seniorityMonths: "0",
        average12Months: "2000",
      }),
    );
    expect(result?.retainedAmount).toBe(2000);
  });

  it("calcule avec mois incomplets", () => {
    const result = calculateDismissalCompensation(
      baseInput({
        seniorityYears: "3",
        seniorityMonths: "6",
        average12Months: "1500",
      }),
    );
    expect(result?.retainedAmount).toBe(1312.5);
  });

  it("double l'indemnité en inaptitude professionnelle", () => {
    const result = calculateDismissalCompensation(
      baseInput({
        situation: "professionalUnfitness",
        seniorityYears: "4",
        seniorityMonths: "0",
        average12Months: "2000",
      }),
    );
    expect(result?.legalBaseAmount).toBe(2000);
    expect(result?.retainedAmount).toBe(4000);
    expect(result?.professionalUnfitnessApplied).toBe(true);
  });

  it("neutralise le résultat en faute grave ou lourde", () => {
    const result = calculateDismissalCompensation(
      baseInput({ situation: "grossMisconduct" }),
    );
    expect(result?.retainedAmount).toBe(0);
    expect(result?.zeroReason).toBe("grossMisconduct");
  });

  it("retient le montant conventionnel s'il est plus favorable", () => {
    const result = calculateDismissalCompensation(
      baseInput({
        seniorityYears: "10",
        seniorityMonths: "0",
        average12Months: "3200",
        conventionKnowledge: "yes",
        conventionAmount: "10000",
      }),
    );
    expect(result?.legalAmount).toBe(8000);
    expect(result?.retainedAmount).toBe(10000);
    expect(result?.retainedSource).toBe("convention");
  });

  it("bloque le calcul simplifié en cas d'alternance temps plein / partiel", () => {
    const result = calculateDismissalCompensation(
      baseInput({ mixedWorkTime: true }),
    );
    expect(result?.zeroReason).toBe("mixedWorkTime");
    expect(result?.retainedAmount).toBe(0);
  });

  it("accepte la virgule française et ne produit pas NaN", () => {
    const result = calculateDismissalCompensation(
      baseInput({
        average12Months: "2 500,50",
        average3Months: "2 600,75",
        seniorityYears: "5",
        seniorityMonths: "0",
      }),
    );
    expect(result).not.toBeNull();
    const values = [
      result!.referenceSalary,
      result!.legalAmount,
      result!.retainedAmount,
      result!.firstBracketAmount,
    ];
    values.forEach((value) => {
      expect(Number.isFinite(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(0);
    });
    expect(result!.summaryBrief).toContain(formatCurrency(result!.retainedAmount));
  });
});
