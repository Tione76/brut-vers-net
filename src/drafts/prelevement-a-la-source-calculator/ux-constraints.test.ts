import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { createEmptyPersonIncomeState, toPersonIncomeInput } from "./person-income-state";

const root = join(__dirname);

function read(relativePath: string): string {
  return readFileSync(join(root, relativePath), "utf8");
}

describe("PAS UX : champs retirés", () => {
  it("mode simple : pas de temps de travail ni de mois rémunérés", () => {
    const source = read("PasCalculator.tsx");
    expect(source).not.toMatch(/Temps de travail/);
    expect(source).not.toMatch(/Nombre de mois/);
    expect(source).not.toMatch(/WORK_TIME_PERCENT/);
    expect(source).not.toMatch(/SALARY_MONTHS_OPTIONS/);
    expect(source).not.toMatch(/workTimePercent/);
    expect(source).not.toMatch(/salaryMonths/);
  });

  it("mode personnalisé : pas de temps de travail ni de mois rémunérés", () => {
    const form = read("PasPersonalizedForm.tsx");
    const fields = read("PersonIncomeFields.tsx");
    const combined = form + fields;
    expect(combined).not.toMatch(/Temps de travail/);
    expect(combined).not.toMatch(/Nombre de mois/);
    expect(combined).not.toMatch(/WORK_TIME_PERCENT/);
    expect(combined).not.toMatch(/SALARY_MONTHS_OPTIONS/);
  });

  it("salaire par défaut, net imposable en option", () => {
    const fields = read("PersonIncomeFields.tsx");
    expect(fields).toContain("Je connais mon net imposable annuel");
    expect(fields).toContain("Je préfère renseigner mon salaire");
    expect(fields).toContain("Valeur présente sur votre avis d");
    expect(fields).not.toContain("Je ne connais pas mon net imposable annuel");
    expect(createEmptyPersonIncomeState().useSalaryOnly).toBe(true);
  });

  it("mode simple et personnalisé partagent PersonIncomeFields", () => {
    const simple = read("PasCalculator.tsx");
    const perso = read("PasPersonalizedForm.tsx");
    expect(simple).toContain("PersonIncomeFields");
    expect(perso).toContain("PersonIncomeFields");
  });

  it("étapes personnalisées incluent le statut avant les revenus", () => {
    const form = read("PasPersonalizedForm.tsx");
    expect(form).toContain("Statut professionnel du déclarant");
    expect(form).toContain("Revenus du déclarant");
    expect(form).toContain("Statut professionnel du conjoint");
    expect(form).toContain("Revenus du conjoint");
  });
});

describe("priorité des modes de saisie", () => {
  it("mode salaire ignore un net imposable résiduel", () => {
    const input = toPersonIncomeInput({
      ...createEmptyPersonIncomeState(),
      useSalaryOnly: true,
      taxableAnnualRaw: "99999",
      referenceField: "grossMonthly",
      grossMonthly: "2500",
    });
    expect(input.taxableAnnualRaw).toBe("");
    expect(input.salaryValue).toBe("2500");
  });

  it("mode net imposable ignore un salaire résiduel", () => {
    const input = toPersonIncomeInput({
      ...createEmptyPersonIncomeState(),
      useSalaryOnly: false,
      taxableAnnualRaw: "28000",
      referenceField: "grossMonthly",
      grossMonthly: "5000",
    });
    expect(input.taxableAnnualRaw).toBe("28000");
    expect(input.salaryValue).toBe("");
  });
});
