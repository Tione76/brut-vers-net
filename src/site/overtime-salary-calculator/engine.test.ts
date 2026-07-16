import { describe, expect, it } from "vitest";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import { calculateSalary } from "@/site/salary-calculator/engine";
import { formatCurrency, roundCent } from "@/site/salary-calculator";
import {
  calculateOvertimeSalary,
  hourlyToMonthlyGross,
  monthlyToHourlyGross,
  resolveGrossMonthlyFromReference,
} from "./engine";
import { OVERTIME_CONFIG_2026 } from "./overtime/2026/config";
import { estimateOvertimeContributionRelief } from "./overtime/2026/contribution-relief";
import type { OvertimeSalaryInput } from "./types";

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

describe("monthly / hourly conversion", () => {
  it("convertit 2 500 € mensuels en taux horaire", () => {
    expect(monthlyToHourlyGross(2500)).toBeCloseTo(16.483, 3);
  });

  it("convertit un taux horaire en mensuel via 151,67 h", () => {
    expect(hourlyToMonthlyGross(12.5)).toBeCloseTo(1895.875, 3);
  });
});

describe("estimateOvertimeContributionRelief", () => {
  it("reproduit l'exemple Urssaf 156,25 € → 17,67 €", () => {
    expect(estimateOvertimeContributionRelief(156.25)).toBe(17.67);
  });
});

describe("calculateOvertimeSalary cas de base", () => {
  it("calcule 8 heures à 25 % pour 2 500 € brut non-cadre", () => {
    const result = calculateOvertimeSalary(baseInput());
    const hourly = roundCent(monthlyToHourlyGross(2500));
    const expectedGross = roundCent(8 * hourly * 1.25);

    expect(result).not.toBeNull();
    expect(result?.hourlyGrossBase).toBe(hourly);
    expect(result?.group1.hours).toBe(8);
    expect(result?.group1.majorationPercent).toBe(25);
    expect(result?.overtimeGrossTotal).toBe(expectedGross);
    expect(result?.contributionRelief).toBe(
      estimateOvertimeContributionRelief(expectedGross),
    );
    expect(result?.overtimeNetGain).toBe(
      roundCent(expectedGross * getProfileCoefficient("nonExecutive") + result!.contributionRelief),
    );
    expect(result?.newGrossMonthly).toBe(roundCent(2500 + expectedGross));
  });

  it("calcule 8 h à 25 % et 2 h à 50 %", () => {
    const result = calculateOvertimeSalary(
      baseInput({ group1Hours: "8", group2Hours: "2" }),
    );
    const hourly = roundCent(monthlyToHourlyGross(2500));
    const expectedGross = roundCent(8 * hourly * 1.25 + 2 * hourly * 1.5);

    expect(result).not.toBeNull();
    expect(result?.overtimeHoursTotal).toBe(10);
    expect(result?.overtimeGrossTotal).toBe(expectedGross);
    expect(result!.group1.gross + result!.group2.gross).toBe(expectedGross);
  });

  it("calcule 10 heures à 25 % pour un cadre à 3 000 €", () => {
    const result = calculateOvertimeSalary(
      baseInput({
        salaryValue: "3000",
        profile: "executive",
        group1Hours: "10",
        group2Hours: "0",
      }),
    );
    const hourly = roundCent(monthlyToHourlyGross(3000));
    const expectedGross = roundCent(10 * hourly * 1.25);
    const relief = estimateOvertimeContributionRelief(expectedGross);

    expect(result).not.toBeNull();
    expect(result?.overtimeGrossTotal).toBe(expectedGross);
    expect(result?.overtimeNetGain).toBe(
      roundCent(expectedGross * getProfileCoefficient("executive") + relief),
    );
    expect(result?.baseNetMonthly).toBe(
      calculateSalary({
        activeInput: "grossMonthly",
        activeValue: "3000",
        profile: "executive",
        workTimePercent: 100,
        salaryMonths: 12,
        withholdingTaxRate: 0,
      })?.netMonthly,
    );
  });
});

describe("références de salaire", () => {
  it("part d'un taux horaire brut", () => {
    const result = calculateOvertimeSalary(
      baseInput({
        referenceField: "grossHourly",
        salaryValue: "16,48",
        group1Hours: "8",
      }),
    );

    expect(result).not.toBeNull();
    expect(result?.hourlyGrossBase).toBeCloseTo(16.48, 2);
    expect(result?.baseGrossMonthly).toBe(
      resolveGrossMonthlyFromReference("grossHourly", "16,48", "nonExecutive"),
    );
  });

  it("part d'un salaire net mensuel", () => {
    const fromGross = calculateOvertimeSalary(baseInput({ salaryValue: "2500" }));
    expect(fromGross).not.toBeNull();

    const fromNet = calculateOvertimeSalary(
      baseInput({
        referenceField: "netMonthly",
        salaryValue: String(fromGross!.baseNetMonthly).replace(".", ","),
      }),
    );

    expect(fromNet).not.toBeNull();
    expect(fromNet?.baseGrossMonthly).toBeCloseTo(fromGross!.baseGrossMonthly, 0);
    expect(fromNet?.overtimeGrossTotal).toBeCloseTo(fromGross!.overtimeGrossTotal, 0);
  });
});

describe("taux de majoration personnalisés", () => {
  it("accepte 10 % et 25 %", () => {
    const result = calculateOvertimeSalary(
      baseInput({
        majorationMode: "custom",
        majorationGroup1Percent: "10",
        majorationGroup2Percent: "25",
        group1Hours: "8",
        group2Hours: "2",
      }),
    );
    const hourly = roundCent(monthlyToHourlyGross(2500));
    const expected = roundCent(8 * hourly * 1.1 + 2 * hourly * 1.25);

    expect(result).not.toBeNull();
    expect(result?.group1.majorationPercent).toBe(10);
    expect(result?.group2.majorationPercent).toBe(25);
    expect(result?.overtimeGrossTotal).toBe(expected);
  });

  it("accepte 20 % et 40 %", () => {
    const result = calculateOvertimeSalary(
      baseInput({
        majorationMode: "custom",
        majorationGroup1Percent: "20",
        majorationGroup2Percent: "40",
        group1Hours: "5",
        group2Hours: "5",
      }),
    );
    const hourly = roundCent(monthlyToHourlyGross(2500));

    expect(result?.overtimeGrossTotal).toBe(
      roundCent(5 * hourly * 1.2 + 5 * hourly * 1.4),
    );
  });
});

describe("heures et formats", () => {
  it("accepte uniquement des heures à 50 %", () => {
    const result = calculateOvertimeSalary(
      baseInput({ group1Hours: "0", group2Hours: "4" }),
    );
    const hourly = roundCent(monthlyToHourlyGross(2500));

    expect(result).not.toBeNull();
    expect(result?.group1.hours).toBe(0);
    expect(result?.group2.hours).toBe(4);
    expect(result?.overtimeGrossTotal).toBe(roundCent(4 * hourly * 1.5));
  });

  it("accepte les heures décimales avec virgule française", () => {
    const result = calculateOvertimeSalary(
      baseInput({ group1Hours: "1,25", group2Hours: "2,5" }),
    );

    expect(result).not.toBeNull();
    expect(result?.overtimeHoursTotal).toBe(3.75);
  });
});

describe("projection", () => {
  it.each([3, 6, 12] as const)("projette le gain sur %s mois", (months) => {
    const result = calculateOvertimeSalary(
      baseInput({
        projectionMode: "recurring",
        projectionMonths: months,
      }),
    );

    expect(result).not.toBeNull();
    expect(result?.projectionMonths).toBe(months);
    expect(result?.projectedOvertimeGross).toBe(
      roundCent(result!.overtimeGrossTotal * months),
    );
    expect(result?.projectedOvertimeNetGain).toBe(
      roundCent(result!.overtimeNetGain * months),
    );
  });
});

describe("hiérarchie et périodicité mensuelle", () => {
  it("calcule 8 h à 25 % et 3 h à 50 % pour 2 500 € (volume mensuel)", () => {
    const result = calculateOvertimeSalary(
      baseInput({ group1Hours: "8", group2Hours: "3" }),
    );
    const hourly = roundCent(monthlyToHourlyGross(2500));
    const expectedGross = roundCent(8 * hourly * 1.25 + 3 * hourly * 1.5);

    expect(result).not.toBeNull();
    expect(result?.hourlyGrossBase).toBe(hourly);
    expect(result?.overtimeHoursTotal).toBe(11);
    expect(result?.overtimeGrossTotal).toBe(expectedGross);
    expect(result?.newNetMonthly).toBe(
      roundCent(result!.baseNetMonthly + result!.overtimeNetGain),
    );
    expect(result!.newNetMonthly).toBeGreaterThan(result!.baseNetMonthly);
    expect(result!.overtimeNetGain).toBeGreaterThan(0);
  });

  it("accepte 10 heures à 25 % sur le mois (plusieurs semaines possibles)", () => {
    const result = calculateOvertimeSalary(
      baseInput({ group1Hours: "10", group2Hours: "0" }),
    );
    expect(result).not.toBeNull();
    expect(result?.group1.hours).toBe(10);
    expect(result?.overtimeGrossTotal).toBeGreaterThan(0);
  });

  it("met en avant le nouveau net et le gain dans la synthèse", () => {
    const result = calculateOvertimeSalary(
      baseInput({ group1Hours: "8", group2Hours: "3" }),
    );
    expect(result?.summaryBrief).toContain("sur le mois");
    expect(result?.summaryBrief).toContain(formatCurrency(result!.baseNetMonthly));
    expect(result?.summaryBrief).toContain(formatCurrency(result!.newNetMonthly));
    expect(result?.summaryBrief).not.toMatch(/brut et .+ net/);
  });

  it("reconstitue le brut depuis un salaire net", () => {
    const fromNet = resolveGrossMonthlyFromReference("netMonthly", "1950", "nonExecutive");
    expect(fromNet).not.toBeNull();
    expect(fromNet!).toBeGreaterThan(1950);

    const result = calculateOvertimeSalary(
      baseInput({
        referenceField: "netMonthly",
        salaryValue: "1950",
        group1Hours: "8",
        group2Hours: "0",
      }),
    );
    expect(result).not.toBeNull();
    expect(result?.baseGrossMonthly).toBe(fromNet);
  });

  it("accepte une référence moteur depuis un taux horaire (API interne, hors UI)", () => {
    const result = calculateOvertimeSalary(
      baseInput({
        referenceField: "grossHourly",
        salaryValue: "16,48",
        group1Hours: "8",
        group2Hours: "0",
      }),
    );
    expect(result).not.toBeNull();
    expect(result?.hourlyGrossBase).toBe(16.48);
    expect(result?.baseGrossMonthly).toBe(roundCent(hourlyToMonthlyGross(16.48)));
  });
});

describe("profils et bascules", () => {
  it("produit un gain net différent selon le statut", () => {
    const nonExec = calculateOvertimeSalary(baseInput({ profile: "nonExecutive" }));
    const exec = calculateOvertimeSalary(baseInput({ profile: "executive" }));

    expect(nonExec).not.toBeNull();
    expect(exec).not.toBeNull();
    expect(nonExec?.overtimeGrossTotal).toBe(exec?.overtimeGrossTotal);
    expect(nonExec!.overtimeNetGain).toBeGreaterThan(exec!.overtimeNetGain);
  });

  it("aligne nouveau net = net de base + gain HS", () => {
    const result = calculateOvertimeSalary(baseInput());
    expect(result?.newNetMonthly).toBe(
      roundCent(result!.baseNetMonthly + result!.overtimeNetGain),
    );
  });
});

describe("exemple Urssaf 2026", () => {
  it("reproduit exactement 156,25 € brut et 17,67 € de réduction", () => {
    const { hourlyRate, overtimeHours, majorationPercent, overtimeGross, reliefAmount } =
      OVERTIME_CONFIG_2026.urssafExample;

    const result = calculateOvertimeSalary(
      baseInput({
        referenceField: "grossHourly",
        salaryValue: String(hourlyRate).replace(".", ","),
        group1Hours: String(overtimeHours),
        group2Hours: "0",
        majorationMode: "custom",
        majorationGroup1Percent: String(majorationPercent),
        majorationGroup2Percent: "50",
      }),
    );

    expect(result).not.toBeNull();
    expect(result?.hourlyGrossBase).toBe(hourlyRate);
    expect(result?.overtimeGrossTotal).toBe(overtimeGross);
    expect(result?.contributionRelief).toBe(reliefAmount);
    expect(estimateOvertimeContributionRelief(overtimeGross)).toBe(reliefAmount);
  });
});

describe("cas limites", () => {
  it("retourne null sans salaire", () => {
    expect(calculateOvertimeSalary(baseInput({ salaryValue: "" }))).toBeNull();
  });

  it("retourne null sans heures", () => {
    expect(
      calculateOvertimeSalary(baseInput({ group1Hours: "0", group2Hours: "0" })),
    ).toBeNull();
  });

  it("retourne null pour un taux inférieur à 10 %", () => {
    expect(
      calculateOvertimeSalary(
        baseInput({
          majorationMode: "custom",
          majorationGroup1Percent: "9",
          majorationGroup2Percent: "50",
        }),
      ),
    ).toBeNull();
  });

  it("ne produit pas NaN ni Infinity", () => {
    const result = calculateOvertimeSalary(
      baseInput({ group1Hours: "8", group2Hours: "2" }),
    );
    expect(result).not.toBeNull();

    const values = [
      result!.hourlyGrossBase,
      result!.group1.gross,
      result!.group2.gross,
      result!.overtimeGrossTotal,
      result!.contributionRelief,
      result!.overtimeNetGain,
      result!.baseGrossMonthly,
      result!.baseNetMonthly,
      result!.newGrossMonthly,
      result!.newNetMonthly,
      result!.projectedOvertimeGross,
      result!.projectedOvertimeNetGain,
    ];

    values.forEach((value) => {
      expect(Number.isFinite(value)).toBe(true);
    });
  });

  it("arrondit au centime de façon stable", () => {
    const a = calculateOvertimeSalary(baseInput({ group1Hours: "8", group2Hours: "2" }));
    const b = calculateOvertimeSalary(baseInput({ group1Hours: "8", group2Hours: "2" }));
    expect(a?.overtimeGrossTotal).toBe(b?.overtimeGrossTotal);
    expect(a?.overtimeNetGain).toBe(b?.overtimeNetGain);
  });

  it("formule une phrase de synthèse", () => {
    const result = calculateOvertimeSalary(
      baseInput({ group1Hours: "8", group2Hours: "2" }),
    );
    expect(result?.summaryBrief).toContain("heures supplémentaires");
    expect(result?.summaryBrief).toContain("sur le mois");
    expect(result?.summaryBrief).toContain("net");
  });
});
