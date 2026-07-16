import { describe, expect, it } from "vitest";
import type { OvertimeSalaryInput } from "./types";
import {
  getHighHoursWarning,
  getLegalMajorationOrderHint,
  getPrimaryValidationError,
  validateBaseSalary,
  validateMajorationPercent,
  validateOvertimeHours,
} from "./validation";

function baseInput(overrides: Partial<OvertimeSalaryInput> = {}): OvertimeSalaryInput {
  return {
    referenceField: "grossMonthly",
    salaryValue: "2500",
    profile: "nonExecutive",
    group1Hours: "8",
    group2Hours: "0",
    majorationMode: "legal",
    majorationGroup1Percent: "25",
    majorationGroup2Percent: "50",
    projectionMode: "thisMonth",
    projectionMonths: 1,
    ...overrides,
  };
}

describe("validateBaseSalary", () => {
  it("exige un salaire saisi", () => {
    expect(validateBaseSalary("")).toBe("Saisissez votre salaire de base.");
  });

  it("accepte la virgule française", () => {
    expect(validateBaseSalary("2 500,50")).toBeNull();
  });

  it("refuse zéro", () => {
    expect(validateBaseSalary("0")).toBe("Saisissez un salaire de base supérieur à zéro.");
  });
});

describe("validateOvertimeHours", () => {
  it("exige au moins une heure", () => {
    expect(validateOvertimeHours("0", "0")).toBe(
      "Indiquez au moins une heure supplémentaire.",
    );
    expect(validateOvertimeHours("", "")).toBe(
      "Indiquez au moins une heure supplémentaire.",
    );
  });

  it("accepte une seule des deux saisies", () => {
    expect(validateOvertimeHours("8", "0")).toBeNull();
    expect(validateOvertimeHours("", "2")).toBeNull();
  });

  it("refuse un total trop élevé", () => {
    expect(validateOvertimeHours("150", "60")).toBe(
      "Vérifiez le nombre d'heures renseigné.",
    );
  });

  it("accepte les décimales françaises", () => {
    expect(validateOvertimeHours("1,25", "2,5")).toBeNull();
  });
});

describe("validateMajorationPercent", () => {
  it("refuse un taux inférieur à 10 %", () => {
    expect(validateMajorationPercent("9")).toBe(
      "Saisissez un taux de majoration d'au moins 10 %.",
    );
  });

  it("refuse un champ vide", () => {
    expect(validateMajorationPercent("")).toBe(
      "Saisissez un taux de majoration d'au moins 10 %.",
    );
  });

  it("accepte 10 % et les décimales", () => {
    expect(validateMajorationPercent("10")).toBeNull();
    expect(validateMajorationPercent("25,5")).toBeNull();
  });
});

describe("getPrimaryValidationError", () => {
  it("priorise le salaire vide", () => {
    expect(getPrimaryValidationError(baseInput({ salaryValue: "" }))).toBe(
      "Saisissez votre salaire de base.",
    );
  });

  it("signale l'absence d'heures", () => {
    expect(
      getPrimaryValidationError(baseInput({ group1Hours: "0", group2Hours: "0" })),
    ).toBe("Indiquez au moins une heure supplémentaire.");
  });

  it("signale un taux inférieur à 10 % en mode personnalisé", () => {
    expect(
      getPrimaryValidationError(
        baseInput({
          majorationMode: "custom",
          majorationGroup1Percent: "8",
          majorationGroup2Percent: "50",
        }),
      ),
    ).toBe("Saisissez un taux de majoration d'au moins 10 %.");
  });

  it("ne retourne qu'une seule erreur principale", () => {
    expect(
      getPrimaryValidationError(
        baseInput({ salaryValue: "", group1Hours: "", group2Hours: "" }),
      ),
    ).toBe("Saisissez votre salaire de base.");
  });

  it("n'exige pas les taux personnalisés en mode légal", () => {
    expect(
      getPrimaryValidationError(
        baseInput({
          majorationMode: "legal",
          majorationGroup1Percent: "",
          majorationGroup2Percent: "",
        }),
      ),
    ).toBeNull();
  });
});

describe("getHighHoursWarning", () => {
  it("avertit au-delà du seuil sans bloquer", () => {
    expect(getHighHoursWarning("70", "20")).toContain("80");
    expect(validateOvertimeHours("70", "20")).toBeNull();
  });
});

describe("getLegalMajorationOrderHint", () => {
  it("signale des heures à 50 % avec moins de 8 h à 25 %", () => {
    expect(getLegalMajorationOrderHint("4", "2")).toContain("après 8 heures");
  });

  it("ne signale rien si le premier groupe atteint 8 h", () => {
    expect(getLegalMajorationOrderHint("8", "2")).toBeNull();
  });

  it("ne signale rien sans heures à 50 %", () => {
    expect(getLegalMajorationOrderHint("4", "0")).toBeNull();
  });

  it("ne bloque jamais le calcul", () => {
    expect(validateOvertimeHours("4", "2")).toBeNull();
    expect(
      getPrimaryValidationError(
        baseInput({
          group1Hours: "4",
          group2Hours: "2",
        }),
      ),
    ).toBeNull();
  });
});
