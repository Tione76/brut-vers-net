import { describe, expect, it } from "vitest";
import {
  NL_ADULT_HOURLY,
  NL_ANNUAL_20,
  NL_ANNUAL_35,
  NL_ANNUAL_36,
  NL_ANNUAL_36_WITH_HOLIDAY,
  NL_ANNUAL_38,
  NL_ANNUAL_40,
  NL_BBL_20,
  NL_COMPARE_FR_HOURLY,
  NL_CURRENT_BBL,
  NL_CURRENT_ORDINARY,
  NL_HOLIDAY_36,
  NL_HOURLY_PCT_VS_FR,
  NL_MONTHLY_20,
  NL_MONTHLY_35,
  NL_MONTHLY_36,
  NL_MONTHLY_38,
  NL_MONTHLY_40,
  NL_ORDINARY_20,
  NL_2027_ADULT,
} from "./data";
import {
  annualFromHourlyWeekly,
  holidayAllowanceFromAnnual,
  monthlyFromHourlyWeekly,
  nlLegalHourlyRate,
} from "./engine";

describe("salaire minimum Pays-Bas - engine", () => {
  it("calcule les moyennes mensuelles et annuelles sans x4 pour le mois", () => {
    expect(monthlyFromHourlyWeekly(14.99, 36)).toBe(2338.44);
    expect(NL_MONTHLY_36).toBe(2338.44);
    expect(annualFromHourlyWeekly(14.99, 36)).toBe(28061.28);
    expect(NL_ANNUAL_36).toBe(28061.28);
    expect(monthlyFromHourlyWeekly(14.99, 36) * 4).not.toBe(NL_MONTHLY_36);

    expect(NL_MONTHLY_20).toBe(1299.13);
    expect(NL_ANNUAL_20).toBe(15589.6);
    expect(NL_MONTHLY_35).toBe(2273.48);
    expect(NL_ANNUAL_35).toBe(27281.8);
    expect(NL_MONTHLY_38).toBe(2468.35);
    expect(NL_ANNUAL_38).toBe(29620.24);
    expect(NL_MONTHLY_40).toBe(2598.27);
    expect(NL_ANNUAL_40).toBe(31179.2);
  });

  it("calcule le pécule sur le repère annuel sans double arrondi", () => {
    expect(holidayAllowanceFromAnnual(28061.28, 0.08)).toBe(2244.9);
    expect(NL_HOLIDAY_36).toBe(2244.9);
    expect(NL_ANNUAL_36_WITH_HOLIDAY).toBe(30306.18);
    expect(NL_ANNUAL_36_WITH_HOLIDAY).toBe(NL_ANNUAL_36 + NL_HOLIDAY_36);
  });

  it("applique le barème BBL seulement de 18 à 20 ans", () => {
    expect(NL_BBL_20).toBe(9.22);
    expect(NL_ORDINARY_20).toBe(11.99);
    expect(nlLegalHourlyRate(18, NL_CURRENT_ORDINARY, {
      inBbl: true,
      bbl: NL_CURRENT_BBL,
    })).toBe(6.82);
    expect(nlLegalHourlyRate(21, NL_CURRENT_ORDINARY, {
      inBbl: true,
      bbl: NL_CURRENT_BBL,
    })).toBe(NL_ADULT_HOURLY);
    expect(nlLegalHourlyRate(16, NL_CURRENT_ORDINARY, {
      inBbl: true,
      bbl: NL_CURRENT_BBL,
    })).toBe(5.17);
    expect(nlLegalHourlyRate(25, NL_CURRENT_ORDINARY)).toBe(NL_ADULT_HOURLY);
  });

  it("distingue taux actuel, écart français et annonce 2027", () => {
    expect(NL_ADULT_HOURLY).toBe(14.99);
    expect(NL_COMPARE_FR_HOURLY).toBe(12.31);
    expect(NL_HOURLY_PCT_VS_FR).toBe(21.8);
    expect(NL_2027_ADULT).toBe(15.29);
    expect(NL_2027_ADULT).not.toBe(NL_ADULT_HOURLY);
  });
});
