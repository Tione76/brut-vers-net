import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  OVERTIME_OFFICIAL_SOURCES,
  OVERTIME_SOURCES_VERIFIED_AT,
} from "./overtime-official-sources";
import { calculateOvertimeSalary, monthlyToHourlyGross } from "./engine";
import type { OvertimeSalaryInput } from "./types";
import { estimateOvertimeContributionRelief } from "./overtime/2026/contribution-relief";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import { roundCent } from "@/site/salary-calculator";

describe("overtime-official-sources", () => {
  it("expose huit sources https vérifiées", () => {
    expect(OVERTIME_SOURCES_VERIFIED_AT).toBe("2026-10-20");
    expect(OVERTIME_OFFICIAL_SOURCES).toHaveLength(8);
    for (const source of OVERTIME_OFFICIAL_SOURCES) {
      expect(source.href.startsWith("https://")).toBe(true);
      expect(source.title.length).toBeGreaterThan(8);
      expect(source.note.length).toBeGreaterThan(8);
    }
  });

  it("inclut F2391, Code du travail, F2617, URSSAF, F1911 et HCR", () => {
    const hrefs = OVERTIME_OFFICIAL_SOURCES.map((source) => source.href);
    expect(hrefs.some((href) => href.includes("F2391"))).toBe(true);
    expect(hrefs.some((href) => href.includes("LEGIARTI000033020373"))).toBe(true);
    expect(hrefs.some((href) => href.includes("LEGIARTI000038610166"))).toBe(true);
    expect(hrefs.some((href) => href.includes("LEGIARTI000033020341"))).toBe(true);
    expect(hrefs.some((href) => href.includes("F2617"))).toBe(true);
    expect(hrefs.some((href) => href.includes("reduction-cotisations-salariales"))).toBe(true);
    expect(hrefs.some((href) => href.includes("F1911"))).toBe(true);
    expect(hrefs.some((href) => href.includes("KALIARTI000005826386"))).toBe(true);
  });
});

describe("overtime editorial sources placement", () => {
  const editorialSource = readFileSync(
    join(process.cwd(), "src/site/overtime-salary-calculator/overtime-editorial.tsx"),
    "utf8",
  );

  it("place les sources après la FAQ et supprime l'ancien bloc vague", () => {
    expect(editorialSource).toContain('id="sources-officielles"');
    expect(editorialSource).toContain("OVERTIME_OFFICIAL_SOURCES");
    expect(editorialSource).not.toContain("Sources : Service-Public");
    expect(editorialSource).not.toContain("Contenu vérifié le");

    const faqTocIdx = editorialSource.indexOf('id: "faq-heures-supplementaires"');
    const sourcesTocIdx = editorialSource.indexOf('id: "sources-officielles"');
    const faqHeadingIdx = editorialSource.indexOf('id="faq-heures-supplementaires"');
    const sourcesSectionIdx = editorialSource.indexOf('id="sources-officielles"');
    expect(sourcesTocIdx).toBeGreaterThan(faqTocIdx);
    expect(sourcesSectionIdx).toBeGreaterThan(faqHeadingIdx);
  });
});

describe("exemples éditoriaux vs moteur actuel", () => {
  const base = (overrides: Partial<OvertimeSalaryInput> = {}): OvertimeSalaryInput => ({
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
  });

  it("2 000 € + 8 h à 25 %", () => {
    const result = calculateOvertimeSalary(base({ salaryValue: "2000", group1Hours: "8" }));
    const hourly = roundCent(monthlyToHourlyGross(2000));
    const expectedGross = roundCent(8 * hourly * 1.25);
    expect(result?.overtimeGrossTotal).toBe(expectedGross);
    expect(result?.overtimeNetGain).toBe(
      roundCent(expectedGross * getProfileCoefficient("nonExecutive") + estimateOvertimeContributionRelief(expectedGross)),
    );
  });

  it("2 500 € + 8 h à 25 % et 2 h à 50 %", () => {
    const result = calculateOvertimeSalary(base({ group1Hours: "8", group2Hours: "2" }));
    const hourly = roundCent(monthlyToHourlyGross(2500));
    const expectedGross = roundCent(8 * hourly * 1.25 + 2 * hourly * 1.5);
    expect(result?.overtimeGrossTotal).toBe(expectedGross);
  });

  it("2 500 € + 10 h à 25 %", () => {
    const result = calculateOvertimeSalary(base({ group1Hours: "10", group2Hours: "0" }));
    const hourly = roundCent(monthlyToHourlyGross(2500));
    const expectedGross = roundCent(10 * hourly * 1.25);
    expect(result?.overtimeGrossTotal).toBe(expectedGross);
  });

  it("3 000 € + 10 h à 25 %", () => {
    const result = calculateOvertimeSalary(
      base({ salaryValue: "3000", group1Hours: "10", group2Hours: "0" }),
    );
    const hourly = roundCent(monthlyToHourlyGross(3000));
    const expectedGross = roundCent(10 * hourly * 1.25);
    expect(result?.overtimeGrossTotal).toBe(expectedGross);
  });
});
