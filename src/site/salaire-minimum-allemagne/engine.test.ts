import { describe, expect, it } from "vitest";
import {
  DE_COMPARE_FR_HOURLY,
  DE_COMPARE_FR_MONTHLY,
  DE_COMPARE_HOURLY_DIFF,
  DE_COMPARE_HOURLY_PCT_VS_FR,
  DE_COMPARE_MONTHLY_35_DIFF,
  DE_EUROSTAT_MONTHLY_COMPARABLE,
  DE_EUROSTAT_WEEKLY_HOURS_LABEL,
  DE_MIN_WAGE_CURRENT_HOURLY,
  DE_MIN_WAGE_EXAMPLE_MONTHLY,
  DE_MIN_WAGE_LABELS,
  DE_MIN_WAGE_NEXT_HOURLY,
  DE_MIN_WAGE_PREVIOUS_HOURLY,
  DE_MINIJOB_THEORETICAL_HOURS_AT_MIN,
  DE_RISE_2025_TO_2026_PCT,
  DE_RISE_2026_TO_2027_PCT,
} from "./data";
import {
  absoluteDiff,
  eurostatMonthlyFromHourly,
  monthlyFromHourlyWeekly,
  percentDiffVsBase,
} from "./engine";

describe("salaire minimum Allemagne - engine", () => {
  it("calcule les exemples mensuels (taux × heures × 52 / 12)", () => {
    expect(monthlyFromHourlyWeekly(13.9, 20)).toBe(1204.67);
    expect(monthlyFromHourlyWeekly(13.9, 35)).toBe(2108.17);
    expect(monthlyFromHourlyWeekly(13.9, 38)).toBe(2288.87);
    expect(monthlyFromHourlyWeekly(13.9, 39)).toBe(2349.1);
    expect(monthlyFromHourlyWeekly(13.9, 40)).toBe(2409.33);
  });

  it("expose les mêmes exemples dans les constantes éditoriales", () => {
    expect(DE_MIN_WAGE_EXAMPLE_MONTHLY[20]).toBe(1204.67);
    expect(DE_MIN_WAGE_EXAMPLE_MONTHLY[35]).toBe(2108.17);
    expect(DE_MIN_WAGE_EXAMPLE_MONTHLY[38]).toBe(2288.87);
    expect(DE_MIN_WAGE_EXAMPLE_MONTHLY[39]).toBe(2349.1);
    expect(DE_MIN_WAGE_EXAMPLE_MONTHLY[40]).toBe(2409.33);
  });

  it("reproduit l'équivalent mensuel Eurostat Allemagne", () => {
    expect(eurostatMonthlyFromHourly(13.9)).toBe(2343);
    expect(DE_EUROSTAT_MONTHLY_COMPARABLE).toBe(2343);
  });

  it("calcule l'écart avec le SMIC français", () => {
    expect(DE_COMPARE_FR_HOURLY).toBe(12.31);
    expect(absoluteDiff(DE_MIN_WAGE_CURRENT_HOURLY, DE_COMPARE_FR_HOURLY)).toBe(1.59);
    expect(DE_COMPARE_HOURLY_DIFF).toBe(1.59);
    expect(percentDiffVsBase(13.9, 12.31)).toBe(12.9);
    expect(DE_COMPARE_HOURLY_PCT_VS_FR).toBe(12.9);
  });

  it("calcule les hausses 2025→2026 et 2026→2027", () => {
    expect(percentDiffVsBase(DE_MIN_WAGE_CURRENT_HOURLY, DE_MIN_WAGE_PREVIOUS_HOURLY)).toBe(8.4);
    expect(DE_RISE_2025_TO_2026_PCT).toBe(8.4);
    expect(percentDiffVsBase(DE_MIN_WAGE_NEXT_HOURLY, DE_MIN_WAGE_CURRENT_HOURLY)).toBe(5);
    expect(DE_RISE_2026_TO_2027_PCT).toBe(5);
  });

  it("expose les libellés FR et le repère minijob", () => {
    expect(DE_COMPARE_FR_MONTHLY).toBe(1867.02);
    expect(DE_COMPARE_MONTHLY_35_DIFF).toBe(
      absoluteDiff(DE_MIN_WAGE_EXAMPLE_MONTHLY[35], DE_COMPARE_FR_MONTHLY),
    );
    expect(DE_MINIJOB_THEORETICAL_HOURS_AT_MIN).toBe(43.38);
    expect(DE_EUROSTAT_WEEKLY_HOURS_LABEL).toBe("38,8");
    expect(DE_MIN_WAGE_LABELS.eurostatMonthFactor).toBe("4,345");
  });
});
