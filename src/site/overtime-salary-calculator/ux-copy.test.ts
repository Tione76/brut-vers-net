import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { calculateOvertimeSalary } from "./engine";
import type { OvertimeSalaryInput } from "./types";

const root = dirname(fileURLToPath(import.meta.url));

function readSource(relativePath: string): string {
  return readFileSync(join(root, relativePath), "utf8");
}

function baseInput(overrides: Partial<OvertimeSalaryInput> = {}): OvertimeSalaryInput {
  return {
    referenceField: "grossMonthly",
    salaryValue: "2500",
    profile: "nonExecutive",
    group1Hours: "8",
    group2Hours: "3",
    majorationMode: "legal",
    majorationGroup1Percent: "25",
    majorationGroup2Percent: "50",
    projectionMode: "thisMonth",
    projectionMonths: 1,
    ...overrides,
  };
}

describe("finitions UX heures supplémentaires (copie & structure)", () => {
  const calculatorSource = readSource("OvertimeSalaryCalculator.tsx");
  const resultsSource = readSource("OvertimeSalaryResults.tsx");
  const cssSource = readSource("overtime-salary-calculator.css");

  it("conserve la saisie principale par salaire brut mensuel", () => {
    expect(calculatorSource).toContain("Salaire brut mensuel de base");
    expect(calculatorSource).toContain("Je connais uniquement mon salaire net");
  });

  it("n'expose plus la saisie par taux horaire brut", () => {
    expect(calculatorSource).not.toContain("Je connais uniquement mon taux horaire brut");
    expect(calculatorSource).not.toContain("Je préfère renseigner mon salaire mensuel");
    expect(calculatorSource).not.toContain('salaryEntryMode === "hourly"');
  });

  it("utilise le vocabulaire avant prélèvement à la source", () => {
    expect(calculatorSource).toContain("avant prélèvement à la source");
    expect(calculatorSource).not.toContain("avant impôt");
    expect(resultsSource).toContain("avant prélèvement à la source");
    expect(resultsSource).not.toContain("avant impôt");
  });

  it("utilise les libellés courts pour les heures", () => {
    expect(calculatorSource).toContain("Total d&apos;heures à 25 %");
    expect(calculatorSource).toContain("Total d&apos;heures à 50 %");
    expect(calculatorSource).not.toContain("Heures supplémentaires à 25 %");
  });

  it("met le mot Soit en blanc via une classe dédiée", () => {
    expect(resultsSource).toContain('className="overtime-results__soit"');
    expect(cssSource).toMatch(/\.overtime-results__soit\s*\{[^}]*color:\s*#ffffff/s);
  });

  it("conserve le détail du calcul et retire l'impact fiscal", () => {
    expect(resultsSource).toContain("Voir le détail du calcul");
    expect(resultsSource).toContain("Nouveau salaire brut mensuel");
    expect(resultsSource).not.toContain("Voir l&apos;impact fiscal estimé");
    expect(resultsSource).not.toContain("impact fiscal");
  });

  it("ne modifie pas les résultats numériques du moteur", () => {
    const result = calculateOvertimeSalary(baseInput());
    expect(result).not.toBeNull();
    expect(Number.isFinite(result!.newNetMonthly)).toBe(true);
    expect(Number.isFinite(result!.overtimeNetGain)).toBe(true);
    expect(Number.isFinite(result!.hourlyGrossBase)).toBe(true);
    expect(result!.newNetMonthly).toBe(result!.baseNetMonthly + result!.overtimeNetGain);
  });
});
