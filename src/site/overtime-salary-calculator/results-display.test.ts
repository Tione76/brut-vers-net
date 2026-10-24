import { describe, expect, it } from "vitest";
import { calculateOvertimeSalary } from "./engine";
import {
  buildComparisonGroups,
  buildGainAnnouncement,
  formatOvertimeHoursBadge,
  formatSignedCurrency,
  projectAnnual,
} from "./results-display";
import type { OvertimeSalaryInput } from "./types";

function input(overrides: Partial<OvertimeSalaryInput> = {}): OvertimeSalaryInput {
  return {
    referenceField: "grossMonthly",
    salaryValue: "2500",
    profile: "nonExecutive",
    group1Hours: "8",
    group2Hours: "",
    majorationMode: "legal",
    majorationGroup1Percent: "25",
    majorationGroup2Percent: "50",
    projectionMode: "thisMonth",
    projectionMonths: 1,
    ...overrides,
  };
}

const scenarios: Array<[string, Partial<OvertimeSalaryInput>]> = [
  ["25 % uniquement", {}],
  ["50 % uniquement", { group1Hours: "", group2Hours: "4" }],
  ["mélange 25 % et 50 %", { group1Hours: "8", group2Hours: "3" }],
  ["valeurs décimales", { group1Hours: "7,5", group2Hours: "1,25" }],
  [
    "taux personnalisés",
    {
      majorationMode: "custom",
      majorationGroup1Percent: "10",
      majorationGroup2Percent: "35",
      group2Hours: "12",
    },
  ],
  ["salaire faible", { salaryValue: "1100" }],
  ["salaire élevé", { salaryValue: "48000", group2Hours: "10" }],
  ["cadre", { profile: "executive", group2Hours: "2" }],
];

describe("affichage des résultats heures supplémentaires", () => {
  it.each(scenarios)("tableau cohérent avec le moteur (%s)", (_label, overrides) => {
    const result = calculateOvertimeSalary(input(overrides));
    expect(result).not.toBeNull();
    const [net, gross] = buildComparisonGroups(result!);

    expect(net.rows[0]).toEqual({
      period: "monthly",
      before: result!.baseNetMonthly,
      after: result!.newNetMonthly,
    });
    expect(gross.rows[0]).toEqual({
      period: "monthly",
      before: result!.baseGrossMonthly,
      after: result!.newGrossMonthly,
    });

    const netAnnualGap = Math.round((net.rows[1].after - net.rows[1].before) * 100);
    const grossAnnualGap = Math.round((gross.rows[1].after - gross.rows[1].before) * 100);
    expect(netAnnualGap).toBe(Math.round(result!.overtimeNetGain * 1200));
    expect(grossAnnualGap).toBe(Math.round(result!.overtimeGrossTotal * 1200));
  });

  it("conserve les valeurs de référence 2 500 € et 8 h à 25 %", () => {
    const result = calculateOvertimeSalary(input())!;
    expect(result.overtimeNetGain).toBe(147.18);
    expect(result.overtimeGrossTotal).toBe(164.8);
    expect(result.newNetMonthly).toBe(2097.18);
    expect(result.newGrossMonthly).toBe(2664.8);

    const [net, gross] = buildComparisonGroups(result);
    expect(net.rows[1]).toEqual({ period: "annual", before: 23400, after: 25166.16 });
    expect(gross.rows[1]).toEqual({ period: "annual", before: 30000, after: 31977.6 });
  });

  it("projette sur 12 mois au centime", () => {
    expect(projectAnnual(2097.18)).toBe(25166.16);
    expect(projectAnnual(0)).toBe(0);
  });

  it("affiche un gain nul comme un vrai montant", () => {
    expect(formatSignedCurrency(0)).toMatch(/^0,00/);
    expect(formatSignedCurrency(12.5)).toMatch(/^\+12,50/);
  });

  it("accorde le badge d'heures", () => {
    expect(formatOvertimeHoursBadge(1)).toMatch(/supplémentaire$/);
    expect(formatOvertimeHoursBadge(1.5)).toMatch(/supplémentaire$/);
    expect(formatOvertimeHoursBadge(8)).toMatch(/supplémentaires$/);
  });

  it("annonce une phrase courte aux lecteurs d'écran", () => {
    const result = calculateOvertimeSalary(input())!;
    const message = buildGainAnnouncement(result);
    expect(message).toContain("net");
    expect(message).toContain("brut");
    expect(message).not.toContain("\u2014");
  });
});
