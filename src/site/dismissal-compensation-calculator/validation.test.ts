import { describe, expect, it } from "vitest";
import {
  getPrimaryValidationError,
  parseWholeNumber,
  validateSeniority,
} from "./validation";
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

describe("validateSeniority", () => {
  it("refuse les mois > 11", () => {
    expect(validateSeniority("2", "12")).toContain("0 et 11");
  });

  it("refuse les décimales", () => {
    expect(parseWholeNumber("2,5")).toBeNull();
    expect(validateSeniority("2,5", "0")).not.toBeNull();
  });

  it("accepte 0 an et 8 mois", () => {
    expect(validateSeniority("0", "8")).toBeNull();
  });
});

describe("getPrimaryValidationError", () => {
  it("exige un salaire lorsque l'ancienneté ouvre droit", () => {
    expect(
      getPrimaryValidationError(
        baseInput({
          seniorityYears: "1",
          seniorityMonths: "0",
          average12Months: "",
        }),
      ),
    ).toContain("salaire");
  });

  it("n'exige pas de salaire sous 8 mois (résultat 0 géré par le moteur)", () => {
    expect(
      getPrimaryValidationError(
        baseInput({
          seniorityYears: "0",
          seniorityMonths: "5",
          average12Months: "",
        }),
      ),
    ).toBeNull();
  });
});
