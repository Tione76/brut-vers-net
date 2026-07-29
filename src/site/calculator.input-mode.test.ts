import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const calculatorSource = readFileSync(join(process.cwd(), "src/site/calculator.tsx"), "utf8");

describe("calculateur : mode de saisie UI", () => {
  it("expose une case à cocher pour le mode horaire, désactivée par défaut", () => {
    expect(calculatorSource).toContain("DEFAULT_SALARY_INPUT_MODE");
    expect(calculatorSource).toContain("Calculer à partir d&apos;un taux horaire");
    expect(calculatorSource).toContain('type="checkbox"');
    expect(calculatorSource).toContain("handleHourlyModeToggle");
    expect(calculatorSource).toContain("<strong>temps partiel</strong>");
    expect(calculatorSource).toContain("<strong>taux horaire</strong>");
    expect(calculatorSource).toContain("workTimePercentInput");
    expect(calculatorSource).toContain("handleWorkTimeDraftChange");
    expect(calculatorSource).toContain("validateWorkTimePercent");
    expect(calculatorSource).not.toContain("Choisissez votre mode de calcul");
    expect(calculatorSource).not.toContain("Salaire mensuel ou annuel");
    expect(calculatorSource).not.toContain("salary-calc__mode-group");
  });

  it("masque le temps de travail hors mode horaire et grise mensuel/annuel en mode horaire", () => {
    expect(calculatorSource).toContain("isHourlyMode");
    expect(calculatorSource).toContain("readOnly: isHourlyMode");
    expect(calculatorSource).toContain("calc-input--computed");
    expect(calculatorSource).toContain("HOURLY_MATRIX_ROW");
    expect(calculatorSource).toContain("Ces montants sont calculés automatiquement");
    expect(calculatorSource).toContain("salary-calc__hourly-fields");
  });

  it("réutilise le moteur existant sans seconde logique brut/net", () => {
    expect(calculatorSource).toContain("calculateSalary");
    expect(calculatorSource).toContain("mapActiveInputForModeSwitch");
    expect(calculatorSource).not.toContain("hourlyToMonthly(");
    expect(calculatorSource).not.toContain("coefficient");
  });
});
