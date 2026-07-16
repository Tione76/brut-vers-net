import { describe, expect, it } from "vitest";
import { PAS_MONTHS_PER_YEAR } from "../config";
import { calculatePersonalizedPas } from "./engine";
import { computeTaxOnQuotient, estimateHouseholdIncomeTax } from "./income-tax";
import { computeFiscalParts } from "./quotient-familial";
import {
  resolvePersonTaxableAnnual,
  syncSalaryFieldsFromReference,
} from "./reconstruct-taxable";
import type { PersonalizedPasInput, PersonIncomeInput } from "./types";
import {
  createEmptyPersonIncomeState,
  personHasIncome,
  toPersonIncomeInput,
} from "../person-income-state";
import { needsSpouse } from "../family";

function personTaxable(annual: number, profile: PersonIncomeInput["profile"] = "nonExecutive"): PersonIncomeInput {
  return {
    taxableAnnualRaw: String(annual),
    referenceField: "taxableAnnual",
    salaryValue: "",
    profile,
  };
}

function personSalary(
  field: Exclude<PersonIncomeInput["referenceField"], "taxableAnnual" | null>,
  value: string,
  profile: PersonIncomeInput["profile"] = "nonExecutive",
): PersonIncomeInput {
  return {
    taxableAnnualRaw: "",
    referenceField: field,
    salaryValue: value,
    profile,
  };
}

function baseInput(overrides: Partial<PersonalizedPasInput> = {}): PersonalizedPasInput {
  return {
    situation: "single",
    children: 0,
    declarant: personTaxable(30000),
    spouse: null,
    ...overrides,
  };
}

describe("computeFiscalParts", () => {
  it("célibataire sans enfant = 1", () => {
    expect(computeFiscalParts("single", 0)).toBe(1);
  });
  it("marié 1 enfant = 2,5", () => {
    expect(computeFiscalParts("married", 1)).toBe(2.5);
  });
  it("marié 2 enfants = 3", () => {
    expect(computeFiscalParts("married", 2)).toBe(3);
  });
  it("marié 3 enfants = 4", () => {
    expect(computeFiscalParts("married", 3)).toBe(4);
  });
  it("7 enfants = parts cohérentes", () => {
    expect(computeFiscalParts("single", 7)).toBe(1 + 0.5 + 0.5 + 1 + 1 + 1 + 1 + 1);
  });
});

describe("needsSpouse (UI)", () => {
  it("uniquement Marié et Pacsé", () => {
    expect(needsSpouse("married")).toBe(true);
    expect(needsSpouse("pacs")).toBe(true);
    expect(needsSpouse("single")).toBe(false);
    expect(needsSpouse("divorced")).toBe(false);
  });
});

describe("computeTaxOnQuotient (exemples Service-Public)", () => {
  it("célibataire 30 000 € → 2 103,99 €", () => {
    expect(computeTaxOnQuotient(30000)).toBe(2103.99);
  });
});

describe("estimateHouseholdIncomeTax (exemples Service-Public)", () => {
  it("couple 60 000 € sans enfant → 4 207,98 €", () => {
    expect(estimateHouseholdIncomeTax(60000, 2, 0, 2)).toBe(4207.98);
  });

  it("couple 60 000 € avec 1 enfant → 3 410 €", () => {
    expect(estimateHouseholdIncomeTax(60000, 2.5, 1, 2)).toBe(3410);
  });

  it("couple 90 000 € avec 1 enfant → plafonnement ≈ 11 400,98 €", () => {
    expect(estimateHouseholdIncomeTax(90000, 2.5, 1, 2)).toBe(11400.98);
  });

  it("couple 90 000 € avec 2 enfants → ≈ 9 593,98 €", () => {
    expect(estimateHouseholdIncomeTax(90000, 3, 2, 2)).toBe(9593.98);
  });
});

describe("conversions et priorité (mode personnalisé)", () => {
  it("utilise une base fixe de 12 mois", () => {
    expect(PAS_MONTHS_PER_YEAR).toBe(12);
  });

  it("priorité au net imposable annuel direct", () => {
    const resolved = resolvePersonTaxableAnnual({
      taxableAnnualRaw: "28000",
      referenceField: "grossMonthly",
      salaryValue: "5000",
      profile: "nonExecutive",
    });
    expect(resolved!.taxableAnnual).toBe(28000);
    expect(resolved!.netMonthly).toBeNull();
  });

  it("reconstitue depuis brut mensuel", () => {
    const resolved = resolvePersonTaxableAnnual(personSalary("grossMonthly", "2500"));
    expect(resolved).not.toBeNull();
    expect(resolved!.grossMonthly).toBe(2500);
    expect(resolved!.taxableAnnual).toBeGreaterThan(0);
  });

  it("reconstitue depuis brut annuel (÷ 12)", () => {
    const fromMonthly = resolvePersonTaxableAnnual(personSalary("grossMonthly", "2500"));
    const fromAnnual = resolvePersonTaxableAnnual(personSalary("grossAnnual", "30000"));
    expect(fromAnnual!.grossMonthly).toBe(2500);
    expect(fromAnnual!.taxableAnnual).toBe(fromMonthly!.taxableAnnual);
  });

  it("reconstitue depuis net mensuel", () => {
    const resolved = resolvePersonTaxableAnnual(personSalary("netMonthly", "1950"));
    expect(resolved).not.toBeNull();
    expect(resolved!.netMonthly).toBe(1950);
    expect(resolved!.taxableAnnual).toBeGreaterThan(0);
  });

  it("reconstitue depuis net annuel", () => {
    const fromMonthly = resolvePersonTaxableAnnual(personSalary("netMonthly", "1950"));
    const fromAnnual = resolvePersonTaxableAnnual(personSalary("netAnnual", "23400"));
    expect(fromAnnual!.netMonthly).toBeCloseTo(fromMonthly!.netMonthly!, 0);
    expect(fromAnnual!.taxableAnnual).toBeCloseTo(fromMonthly!.taxableAnnual, 0);
  });

  it("synchronise les champs salaire sur 12 mois", () => {
    const synced = syncSalaryFieldsFromReference("grossMonthly", "2500", "nonExecutive");
    expect(synced).not.toBeNull();
    expect(synced!.grossAnnual.replace(/\s/g, "")).toMatch(/30000/);
  });

  it("statuts différents déclarant / conjoint", () => {
    const result = calculatePersonalizedPas(
      baseInput({
        situation: "married",
        declarant: personSalary("grossMonthly", "2500", "nonExecutive"),
        spouse: personSalary("grossMonthly", "2500", "publicService"),
      }),
    );
    expect(result).not.toBeNull();
    expect(result!.spouseTaxableAnnual).not.toBe(result!.declarantTaxableAnnual);
  });

  it("changement de statut recalcule la reconstitution", () => {
    const nonExec = resolvePersonTaxableAnnual(personSalary("grossMonthly", "2500", "nonExecutive"));
    const exec = resolvePersonTaxableAnnual(personSalary("grossMonthly", "2500", "executive"));
    expect(exec!.taxableAnnual).not.toBe(nonExec!.taxableAnnual);
  });
});

describe("bascule UI sans valeur résiduelle", () => {
  it("toPersonIncomeInput ignore le salaire en mode net imposable", () => {
    const state = {
      ...createEmptyPersonIncomeState(),
      useSalaryOnly: false,
      taxableAnnualRaw: "28000",
      referenceField: "grossMonthly" as const,
      grossMonthly: "5000",
    };
    const input = toPersonIncomeInput(state);
    expect(input.taxableAnnualRaw).toBe("28000");
    expect(input.salaryValue).toBe("");
    expect(input.referenceField).toBe("taxableAnnual");
  });

  it("toPersonIncomeInput ignore le net imposable en mode salaire", () => {
    const state = {
      ...createEmptyPersonIncomeState(),
      useSalaryOnly: true,
      taxableAnnualRaw: "99999",
      referenceField: "grossMonthly" as const,
      grossMonthly: "2500",
    };
    const input = toPersonIncomeInput(state);
    expect(input.taxableAnnualRaw).toBe("");
    expect(input.salaryValue).toBe("2500");
    expect(input.referenceField).toBe("grossMonthly");
  });

  it("personHasIncome ne mélange pas les modes", () => {
    const taxableOnly = {
      ...createEmptyPersonIncomeState(),
      taxableAnnualRaw: "20000",
      useSalaryOnly: false,
    };
    const salaryOnly = {
      ...createEmptyPersonIncomeState(),
      useSalaryOnly: true,
      referenceField: "grossMonthly" as const,
      grossMonthly: "2500",
      taxableAnnualRaw: "",
    };
    expect(personHasIncome(taxableOnly)).toBe(true);
    expect(personHasIncome(salaryOnly)).toBe(true);
    expect(
      personHasIncome({
        ...createEmptyPersonIncomeState(),
        useSalaryOnly: true,
        taxableAnnualRaw: "20000",
      }),
    ).toBe(false);
  });
});

describe("calculatePersonalizedPas", () => {
  it("célibataire 30 000 € net imposable → taux neutre (aligné mode simple)", () => {
    const result = calculatePersonalizedPas(baseInput());
    expect(result).not.toBeNull();
    // 30 000 / 12 = 2 500 € mensuels → tranche neutre 5,3 %
    expect(result!.personalizedRatePercent).toBe(5.3);
  });

  it("marié avec conjoint recalcule le foyer", () => {
    const result = calculatePersonalizedPas(
      baseInput({
        situation: "married",
        declarant: personTaxable(30000),
        spouse: personTaxable(30000),
        children: 0,
      }),
    );
    expect(result).not.toBeNull();
    expect(result!.householdTaxableAnnual).toBe(60000);
    expect(result!.personalizedRatePercent).toBe(7);
  });

  it("ajouter des enfants diminue le taux estimé", () => {
    const without = calculatePersonalizedPas(
      baseInput({
        situation: "married",
        declarant: personTaxable(45000),
        spouse: personTaxable(45000),
        children: 0,
      }),
    );
    const withKids = calculatePersonalizedPas(
      baseInput({
        situation: "married",
        declarant: personTaxable(45000),
        spouse: personTaxable(45000),
        children: 2,
      }),
    );
    expect(without!.personalizedRatePercent).toBeGreaterThan(withKids!.personalizedRatePercent);
  });

  it("retourne null sans revenu déclarant", () => {
    expect(
      calculatePersonalizedPas(
        baseInput({
          declarant: {
            ...personTaxable(0),
            taxableAnnualRaw: "",
            referenceField: null,
            salaryValue: "",
          },
        }),
      ),
    ).toBeNull();
  });

  it("exige le conjoint si marié", () => {
    expect(
      calculatePersonalizedPas(
        baseInput({
          situation: "married",
          spouse: null,
        }),
      ),
    ).toBeNull();
  });

  it("pacsé se comporte comme marié pour les parts", () => {
    const married = calculatePersonalizedPas(
      baseInput({
        situation: "married",
        declarant: personTaxable(40000),
        spouse: personTaxable(20000),
        children: 1,
      }),
    );
    const pacs = calculatePersonalizedPas(
      baseInput({
        situation: "pacs",
        declarant: personTaxable(40000),
        spouse: personTaxable(20000),
        children: 1,
      }),
    );
    expect(married!.fiscalParts).toBe(2.5);
    expect(pacs!.personalizedRatePercent).toBe(married!.personalizedRatePercent);
  });

  it("divorcé suit le barème célibataire", () => {
    const single = calculatePersonalizedPas(baseInput({ situation: "single", children: 1 }));
    const divorced = calculatePersonalizedPas(baseInput({ situation: "divorced", children: 1 }));
    expect(divorced!.fiscalParts).toBe(single!.fiscalParts);
    expect(divorced!.personalizedRatePercent).toBe(single!.personalizedRatePercent);
  });

  it("prélèvement annuel = mensuel × 12", () => {
    const result = calculatePersonalizedPas(baseInput());
    expect(result!.withholdingAnnual).toBeCloseTo(
      result!.withholdingMonthly * PAS_MONTHS_PER_YEAR,
      1,
    );
  });
});
