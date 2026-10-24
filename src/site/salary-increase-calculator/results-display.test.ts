import { describe, expect, it } from "vitest";
import { calculateSalaryIncrease } from "./engine";
import {
  buildAnnualFootnote,
  buildComparisonGroups,
  buildGainAnnouncement,
  buildIncreaseBadge,
  formatSignedCurrency,
} from "./results-display";
import type { SalaryIncreaseInput } from "./types";

function input(overrides: Partial<SalaryIncreaseInput> = {}): SalaryIncreaseInput {
  return {
    referenceField: "grossMonthly",
    currentSalaryValue: "2500",
    increaseType: "euros",
    increaseReferenceField: "grossMonthlyIncrease",
    increaseValue: "200",
    profile: "nonExecutive",
    salaryMonths: 12,
    withholdingRateMode: "manual",
    manualWithholdingRate: 0,
    ...overrides,
  };
}

describe("affichage des résultats augmentation de salaire", () => {
  it("aligne le tableau Avant / Après sur le moteur (12 mois)", () => {
    const result = calculateSalaryIncrease(input())!;
    const [net, gross] = buildComparisonGroups(result);

    expect(net.rows[0]).toEqual({
      period: "monthly",
      before: result.before.netMonthly,
      after: result.after.netMonthly,
    });
    expect(gross.rows[0]).toEqual({
      period: "monthly",
      before: 2500,
      after: 2700,
    });
    expect(gross.rows[1]).toEqual({
      period: "annual",
      before: result.before.grossAnnual,
      after: result.after.grossAnnual,
    });
    expect(gross.rows[1].after - gross.rows[1].before).toBe(result.gain.grossAnnual);
    expect(result.gain.grossAnnual).toBe(2400);
  });

  it("respecte 13 mois pour les montants annuels du tableau", () => {
    const result = calculateSalaryIncrease(input({ salaryMonths: 13 }))!;
    const [, gross] = buildComparisonGroups(result);

    expect(result.gain.grossAnnual).toBe(result.gain.grossMonthly * 13);
    expect(gross.rows[1].after - gross.rows[1].before).toBe(result.gain.grossAnnual);
    expect(buildAnnualFootnote(13)).toContain("13 mois");
  });

  it("présente le gain net avant prélèvement comme montant principal", () => {
    const result = calculateSalaryIncrease(
      input({ withholdingRateMode: "manual", manualWithholdingRate: 10 }),
    )!;

    expect(result.gain.netMonthly).toBe(result.after.netMonthly - result.before.netMonthly);
    expect(result.gain.netAfterTaxMonthly).not.toBe(result.gain.netMonthly);
    expect(buildGainAnnouncement(result)).toContain("avant prélèvement à la source");
    expect(buildGainAnnouncement(result)).toContain(formatSignedCurrency(result.gain.netMonthly));
  });

  it("construit un badge cohérent euros ou pourcentage", () => {
    const euros = calculateSalaryIncrease(input())!;
    expect(buildIncreaseBadge(euros, "euros", "200")).toMatch(/brut \/ mois$/);

    const percent = calculateSalaryIncrease(
      input({
        increaseType: "percent",
        increaseReferenceField: null,
        increaseValue: "5",
      }),
    )!;
    expect(buildIncreaseBadge(percent, "percent", "5")).toBe("+5\u00a0% d'augmentation");
  });

  it("affiche un gain nul comme un vrai montant", () => {
    expect(formatSignedCurrency(0)).toMatch(/^0,00/);
    expect(formatSignedCurrency(12.5)).toMatch(/^\+12,50/);
  });
});
