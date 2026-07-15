import { describe, expect, it } from "vitest";
import {
  getPrimaryValidationError,
  validateCurrentSalary,
  validateIncreaseEuros,
  validateIncreasePercent,
} from "./validation";
import type { SalaryIncreaseInput } from "./types";

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

describe("validateCurrentSalary", () => {
  it("exige un salaire saisi", () => {
    expect(validateCurrentSalary("")).toBe("Saisissez votre salaire actuel.");
  });

  it("accepte la virgule française", () => {
    expect(validateCurrentSalary("2 500,50")).toBeNull();
  });
});

describe("validateIncreaseEuros", () => {
  it("exige une saisie", () => {
    expect(validateIncreaseEuros("")).toBe("Saisissez une augmentation mensuelle ou annuelle.");
  });

  it("refuse une valeur négative", () => {
    expect(validateIncreaseEuros("-10")).toBe("Saisissez un montant valide.");
  });

  it("refuse zéro", () => {
    expect(validateIncreaseEuros("0")).toBe("L'augmentation doit être supérieure à 0 €.");
  });
});

describe("validateIncreasePercent", () => {
  it("refuse au-delà de 100 %", () => {
    expect(validateIncreasePercent("101")).toBe(
      "Saisissez un pourcentage compris entre 0 et 100 %.",
    );
  });

  it("refuse zéro", () => {
    expect(validateIncreasePercent("0")).toBe("Saisissez une augmentation supérieure à zéro.");
  });

  it("accepte les décimales", () => {
    expect(validateIncreasePercent("5,5")).toBeNull();
  });
});

describe("getPrimaryValidationError", () => {
  it("priorise le salaire actuel", () => {
    expect(getPrimaryValidationError(baseInput({ currentSalaryValue: "" }))).toBe(
      "Saisissez votre salaire actuel.",
    );
  });

  it("exige une référence d'augmentation en euros", () => {
    expect(
      getPrimaryValidationError(
        baseInput({ increaseReferenceField: null, increaseValue: "" }),
      ),
    ).toBe("Saisissez une augmentation mensuelle ou annuelle.");
  });

  it("ne retourne qu'une seule erreur principale", () => {
    expect(
      getPrimaryValidationError(
        baseInput({ currentSalaryValue: "", increaseReferenceField: null, increaseValue: "" }),
      ),
    ).toBe("Saisissez votre salaire actuel.");
  });
});
