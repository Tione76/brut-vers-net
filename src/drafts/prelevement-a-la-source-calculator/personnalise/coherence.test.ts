import { describe, expect, it } from "vitest";
import { calculatePasWithholding } from "../engine";
import { calculatePersonalizedPas } from "./engine";
import { isNeutralEquivalentHousehold } from "./household";
import type { PersonIncomeInput } from "./types";

function salaryDeclarant(grossMonthly: number): PersonIncomeInput {
  return {
    taxableAnnualRaw: "",
    referenceField: "grossMonthly",
    salaryValue: String(grossMonthly),
    profile: "nonExecutive",
  };
}

function simpleRate(grossMonthly: number): number {
  return calculatePasWithholding({
    taxableAnnualRaw: "",
    referenceField: "grossMonthly",
    currentSalaryValue: String(grossMonthly),
    profile: "nonExecutive",
    withholdingRateMode: "auto",
    manualWithholdingRate: 0,
  })!.withholdingRate;
}

function personalizedRate(grossMonthly: number): number {
  return calculatePersonalizedPas({
    situation: "single",
    children: 0,
    declarant: salaryDeclarant(grossMonthly),
    spouse: null,
  })!.personalizedRatePercent;
}

describe("isNeutralEquivalentHousehold", () => {
  it("célibataire / divorcé sans enfant", () => {
    expect(isNeutralEquivalentHousehold("single", 0)).toBe(true);
    expect(isNeutralEquivalentHousehold("divorced", 0)).toBe(true);
    expect(isNeutralEquivalentHousehold("married", 0)).toBe(false);
    expect(isNeutralEquivalentHousehold("pacs", 0)).toBe(false);
    expect(isNeutralEquivalentHousehold("single", 1)).toBe(false);
  });
});

describe("cohérence simulation simple ↔ personnalisée (célibataire, 0 enfant)", () => {
  const cases = [1800, 2000, 2500, 3000, 3500, 4000, 5000] as const;

  it.each(cases)("brut %s € : taux identiques", (gross) => {
    expect(personalizedRate(gross)).toBe(simpleRate(gross));
  });

  it("produit le tableau comparatif attendu", () => {
    const expected: Record<number, number> = {
      1800: 0,
      2000: 0.5,
      2500: 3.5,
      3000: 5.3,
      3500: 7.5,
      4000: 9.9,
      5000: 13.8,
    };

    const table = cases.map((gross) => {
      const simple = simpleRate(gross);
      const perso = personalizedRate(gross);
      return {
        brutMensuel: gross,
        situation: "Célibataire",
        simulationSimple: simple,
        simulationPersonnalisee: perso,
        ecart: Math.round((perso - simple) * 10) / 10,
      };
    });

    for (const row of table) {
      expect(row.ecart).toBe(0);
      expect(row.simulationSimple).toBe(expected[row.brutMensuel]);
      expect(row.simulationPersonnalisee).toBe(expected[row.brutMensuel]);
    }
  });

  it("reste distinct dès qu'il y a un conjoint", () => {
    const simple = simpleRate(2500);
    const married = calculatePersonalizedPas({
      situation: "married",
      children: 0,
      declarant: salaryDeclarant(2500),
      spouse: {
        taxableAnnualRaw: "30000",
        referenceField: "taxableAnnual",
        salaryValue: "",
        profile: "nonExecutive",
      },
    });
    expect(married).not.toBeNull();
    // Le foyer change la base : le taux n'a plus vocation à coller au neutre individuel.
    expect(married!.householdTaxableAnnual).toBeGreaterThan(married!.declarantTaxableAnnual);
    expect(typeof married!.personalizedRatePercent).toBe("number");
    expect(simple).toBe(3.5);
  });
});
