import { describe, expect, it } from "vitest";
import {
  annualToMonthly,
  hourlyToMonthly,
  monthlyToAnnual,
  monthlyToHourly,
} from "@/site/salary-calculator/conversions";

describe("conversions", () => {
  it("convertit horaire vers mensuel à 100 %", () => {
    expect(hourlyToMonthly(20, 100)).toBeCloseTo(3033.4, 2);
  });

  it("convertit horaire vers mensuel à 80 %", () => {
    expect(hourlyToMonthly(20, 80)).toBeCloseTo(2426.72, 2);
  });

  it("convertit mensuel vers horaire", () => {
    expect(monthlyToHourly(3033.4, 100)).toBeCloseTo(20, 2);
  });

  it("convertit mensuel vers annuel sur 12 mois", () => {
    expect(monthlyToAnnual(3000, 12)).toBe(36000);
  });

  it("convertit mensuel vers annuel sur 13 mois", () => {
    expect(monthlyToAnnual(3000, 13)).toBe(39000);
  });

  it("convertit annuel vers mensuel sur 16 mois", () => {
    expect(annualToMonthly(48000, 16)).toBe(3000);
  });
});
