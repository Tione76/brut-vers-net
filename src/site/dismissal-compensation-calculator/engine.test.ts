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
    professionalUnfitnessAverage3Months: "",
    hasBonus: false,
    bonusAmount: "",
    bonusKind: "annual",
    specialSituations: [],
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

  it("calcule 10 ans exactement", () => {
    const result = calculateDismissalCompensation(
      baseInput({
        seniorityYears: "10",
        seniorityMonths: "0",
        average12Months: "2400",
      }),
    );
    expect(result?.retainedAmount).toBe(6000);
  });

  it("calcule 10 ans et 1 mois", () => {
    const result = calculateDismissalCompensation(
      baseInput({
        seniorityYears: "10",
        seniorityMonths: "1",
        average12Months: "2400",
      }),
    );
    expect(result?.retainedAmount).toBe(roundCent(2400 * ((10 * 1 / 4) + (1 / 12) * (1 / 3))));
  });

  it("compare bien 12 mois vs 3 mois", () => {
    const result = calculateDismissalCompensation(
      baseInput({
        average12Months: "2400",
        average3Months: "2700",
      }),
    );
    expect(result?.referenceMethod).toBe("average3");
    expect(result?.referenceSalary).toBe(2700);
  });

  it("proratise une prime annuelle dans la comparaison", () => {
    const result = calculateDismissalCompensation(
      baseInput({
        average12Months: "2500",
        average3Months: "2500",
        hasBonus: true,
        bonusAmount: "1200",
        bonusKind: "annual",
      }),
    );
    expect(result?.bonusMonthlyProration).toBe(100);
    expect(result?.referenceMethod).toBe("average3");
    expect(result?.referenceSalary).toBe(2600);
  });

  it("double l'indemnité en inaptitude professionnelle", () => {
    const result = calculateDismissalCompensation(
      baseInput({
        situation: "professionalUnfitness",
        seniorityYears: "4",
        seniorityMonths: "0",
        professionalUnfitnessAverage3Months: "2100",
      }),
    );
    expect(result?.referenceMethod).toBe("professionalUnfitnessAverage3");
    expect(result?.referenceSalary).toBe(2100);
    expect(result?.legalBaseAmount).toBe(2100);
    expect(result?.retainedAmount).toBe(4200);
    expect(result?.professionalUnfitnessApplied).toBe(true);
    expect(result?.resultLabel).toBe("Minimum légal estimé en cas d'inaptitude d'origine professionnelle.");
  });

  it("neutralise le résultat en faute grave ou lourde", () => {
    const result = calculateDismissalCompensation(
      baseInput({ situation: "grossMisconduct" }),
    );
    expect(result?.retainedAmount).toBe(0);
    expect(result?.zeroReason).toBe("grossMisconduct");
  });

  it("n'applique jamais la comparaison 12/3 en inaptitude professionnelle", () => {
    const result = calculateDismissalCompensation(
      baseInput({
        situation: "professionalUnfitness",
        average12Months: "3200",
        average3Months: "4500",
        professionalUnfitnessAverage3Months: "2500",
      }),
    );
    expect(result?.referenceSalary).toBe(2500);
    expect(result?.average12).toBeNull();
    expect(result?.average3).toBeNull();
  });

  it("ne retourne jamais de montant négatif ni NaN avec situations particulières", () => {
    const result = calculateDismissalCompensation(
      baseInput({
        specialSituations: ["mixedWorkTime", "recentSickLeaveOrTherapeuticPartTime"],
      }),
    );
    expect(result).not.toBeNull();
    expect(result?.hasSpecialSituationWarning).toBe(true);
    expect(Number.isFinite(result!.retainedAmount)).toBe(true);
    expect(result!.retainedAmount).toBeGreaterThanOrEqual(0);
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

  it("change de mode sans conserver un salaire incompatible", () => {
    const professional = calculateDismissalCompensation(
      baseInput({
        situation: "professionalUnfitness",
        professionalUnfitnessAverage3Months: "2300",
      }),
    );
    const standard = calculateDismissalCompensation(
      baseInput({
        situation: "standard",
        average12Months: "2000",
      }),
    );
    expect(professional?.referenceMethod).toBe("professionalUnfitnessAverage3");
    expect(standard?.referenceMethod).not.toBe("professionalUnfitnessAverage3");
  });
});
