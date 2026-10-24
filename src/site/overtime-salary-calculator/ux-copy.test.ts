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

  it("renforce la lisibilité typographique du formulaire sans toucher au CSS partagé", () => {
    expect(calculatorSource).toContain("overtime-form");
    expect(cssSource).toContain(".overtime-form .increase-calc__step-title");
    expect(cssSource).toContain("font-size: 1.125rem");
    expect(cssSource).toContain(".overtime-form .increase-calc__step-hint");
    expect(cssSource).toContain(".overtime-form .calc-field-label");
    expect(cssSource).toContain(".ot-sim__gain-value");
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

  it("met en avant le gain net puis le gain brut du moteur", () => {
    expect(resultsSource).toContain('className="ot-sim ot-sim--filled"');
    expect(resultsSource).toContain("Votre gain mensuel estimé");
    expect(resultsSource).toContain("formatSignedCurrency(computed.overtimeNetGain)");
    expect(resultsSource).toContain("formatSignedCurrency(computed.overtimeGrossTotal)");
    expect(resultsSource).toContain("Net estimé avant prélèvement à la source");
    expect(resultsSource).not.toContain("summaryBrief");
    expect(cssSource).toContain("--ot-card: #fffdf9");
    expect(cssSource).toContain("#d1fae5");
    expect(cssSource).not.toContain("#8fe0a8");
  });

  it("affiche un vrai tableau comparatif avant / après", () => {
    expect(resultsSource).toContain("<table");
    expect(resultsSource).toContain("Votre rémunération avant / après");
    expect(resultsSource).toContain('scope="col"');
    expect(resultsSource).toContain("Avant");
    expect(resultsSource).toContain("Après");
    expect(resultsSource).toContain(
      "Projection annuelle sur 12 mois, avec les mêmes heures supplémentaires chaque mois.",
    );
    expect(cssSource).toContain(".ot-sim__col--before");
    expect(cssSource).toContain(".ot-sim__col--after");
  });

  it("propose un état vide accueillant, sans montants fictifs", () => {
    expect(resultsSource).toContain("Votre estimation");
    expect(resultsSource).toContain("Découvrez votre gain en brut et en net");
    expect(resultsSource).toContain(
      "Renseignez votre salaire et vos heures supplémentaires pour découvrir votre nouvelle rémunération.",
    );
    expect(resultsSource).not.toContain("\u2014");
  });

  it("n'annonce pas toute la carte aux lecteurs d'écran à chaque saisie", () => {
    expect(resultsSource).toContain('aria-live="off"');
    expect(resultsSource).toContain('role="status"');
  });

  it("conserve le détail du calcul et retire l'impact fiscal", () => {
    expect(resultsSource).toContain("Comprendre mon calcul");
    expect(resultsSource).toContain("Taux horaire brut estimé");
    expect(resultsSource).toContain("Salaire brut mensuel de base");
    expect(resultsSource).toContain("Rémunération brute des heures supplémentaires");
    expect(resultsSource).toContain("Réduction estimée de cotisations salariales");
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
