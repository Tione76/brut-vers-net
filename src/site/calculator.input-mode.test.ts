import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const calculatorSource = readFileSync(join(process.cwd(), "src/site/calculator.tsx"), "utf8");
const layoutCss = readFileSync(
  join(process.cwd(), "src/site/salary-calculator-layout.css"),
  "utf8",
);

describe("calculateur : mode de saisie UI", () => {
  it("place Mensuel et Annuel avant Horaire, avec séparateur", () => {
    const periodBlock = calculatorSource.indexOf("PERIOD_MATRIX_ROWS.map");
    const separator = calculatorSource.indexOf("salary-calc__matrix-separator");
    const hourlyRow = calculatorSource.indexOf("salary-calc__matrix-row--hourly");

    expect(periodBlock).toBeGreaterThan(-1);
    expect(separator).toBeGreaterThan(periodBlock);
    expect(hourlyRow).toBeGreaterThan(separator);
    expect(calculatorSource).toContain("DEFAULT_SALARY_INPUT_MODE");
    expect(layoutCss).toContain(".salary-calc__matrix-separator");
  });

  it("intègre la ligne Horaire avec case et infobulle, sans sélecteur au-dessus", () => {
    expect(calculatorSource).toContain("HOURLY_MATRIX_ROW");
    expect(calculatorSource).toContain("HourlyModeInfoButton");
    expect(calculatorSource).toContain('type="checkbox"');
    expect(calculatorSource).toContain("handleHourlyModeToggle");
    expect(calculatorSource).toContain('aria-label="Calculer à partir d\'un taux horaire"');
    expect(calculatorSource).toContain("<strong>temps partiel</strong>");
    expect(calculatorSource).toContain("<strong>taux horaire</strong>");
    expect(calculatorSource).toContain("workTimePercentInput");
    expect(calculatorSource).toContain("salary-calc__hourly-panel");
    expect(calculatorSource).not.toContain("salary-calc__hourly-toggle");
    expect(calculatorSource).not.toContain("Calculer à partir d&apos;un taux horaire</span>");
  });

  it("grise Horaire par défaut et Mensuel/Annuel en mode horaire", () => {
    expect(calculatorSource).toContain("isHourlyMode");
    expect(calculatorSource).toContain("readOnly: !isHourlyMode");
    expect(calculatorSource).toContain("readOnly: isHourlyMode");
    expect(calculatorSource).toContain("calc-input--computed");
    expect(calculatorSource).toContain("Ces montants sont calculés automatiquement");
    expect(calculatorSource).toContain("salary-calc__hourly-panel--open");
  });

  it("réutilise le moteur existant sans seconde logique brut/net", () => {
    expect(calculatorSource).toContain("calculateSalary");
    expect(calculatorSource).toContain("mapActiveInputForModeSwitch");
    expect(calculatorSource).not.toContain("hourlyToMonthly(");
    expect(calculatorSource).not.toContain("coefficient");
  });

  it("conserve les styles d'info, de case et de panneau horaire", () => {
    expect(layoutCss).toContain(".salary-calc__hourly-check");
    expect(layoutCss).toContain(".salary-calc__tooltip");
    expect(layoutCss).toContain("position: fixed");
    expect(layoutCss).toContain("background: #f5f5f5");
    expect(layoutCss).toContain("width: 24px");
    expect(layoutCss).toContain("height: 24px");
    expect(layoutCss).toContain(".salary-calc__row-heading");
    expect(layoutCss).toContain(".salary-calc__hourly-panel");
    expect(layoutCss).not.toContain(".salary-calc__hourly-toggle");
    expect(calculatorSource).toContain("updatePlacement");
  });
});
