import { describe, expect, it } from "vitest";
import {
  UK_ANNUAL_20,
  UK_ANNUAL_35,
  UK_ANNUAL_375,
  UK_ANNUAL_40,
  UK_APPRENTICE_21_AFTER_YEAR,
  UK_APPRENTICE_21_FIRST_YEAR,
  UK_APPRENTICE_HOURLY,
  UK_COMPARE_FR_HOURLY,
  UK_CURRENT_RATES,
  UK_ECB_EUR_PER_GBP,
  UK_FOUR_WEEKS_375,
  UK_HOURLY_PCT_VS_FR,
  UK_MONTHLY_20,
  UK_MONTHLY_35,
  UK_MONTHLY_35_IN_EUR,
  UK_MONTHLY_375,
  UK_MONTHLY_40,
  UK_NLW_HOURLY,
  UK_NLW_IN_EUR,
  UK_OFFSET_DAILY,
  UK_OFFSET_WEEKLY,
  UK_RLW_LONDON,
  UK_RLW_UK,
  UK_UNDER18_HOURLY,
  UK_UNIFORM_EQUIVALENT,
  UK_YOUTH_HOURLY,
  UK_2027_NLW,
} from "./data";
import {
  annualFromHourlyWeekly,
  fourWeeksFromHourlyWeekly,
  gbpToEur,
  monthlyFromHourlyWeekly,
  ukLegalHourlyRate,
} from "./engine";

describe("salaire minimum Royaume-Uni - engine", () => {
  it("calcule semaine, moyenne mensuelle, annuel et quatre semaines sans x4 pour le mois", () => {
    expect(monthlyFromHourlyWeekly(12.71, 37.5)).toBe(2065.38);
    expect(UK_MONTHLY_375).toBe(2065.38);
    expect(annualFromHourlyWeekly(12.71, 37.5)).toBe(24784.5);
    expect(UK_ANNUAL_375).toBe(24784.5);
    expect(fourWeeksFromHourlyWeekly(12.71, 37.5)).toBe(1906.5);
    expect(UK_FOUR_WEEKS_375).toBe(1906.5);
    expect(UK_FOUR_WEEKS_375).not.toBe(UK_MONTHLY_375);

    expect(UK_MONTHLY_20).toBe(1101.53);
    expect(UK_ANNUAL_20).toBe(13218.4);
    expect(UK_MONTHLY_35).toBe(1927.68);
    expect(UK_ANNUAL_35).toBe(23132.2);
    expect(UK_MONTHLY_40).toBe(2203.07);
    expect(UK_ANNUAL_40).toBe(26436.8);
  });

  it("applique le taux apprenti selon l'âge et la première année, pas le diplôme", () => {
    expect(ukLegalHourlyRate(17, UK_CURRENT_RATES, {
      inApprenticeship: true,
      completedFirstYear: false,
    })).toBe(UK_APPRENTICE_HOURLY);
    expect(ukLegalHourlyRate(20, UK_CURRENT_RATES, {
      inApprenticeship: true,
      completedFirstYear: false,
    })).toBe(UK_APPRENTICE_HOURLY);
    expect(UK_APPRENTICE_21_FIRST_YEAR).toBe(8);
    expect(UK_APPRENTICE_21_AFTER_YEAR).toBe(UK_NLW_HOURLY);
    expect(ukLegalHourlyRate(17, UK_CURRENT_RATES, {
      inApprenticeship: true,
      completedFirstYear: true,
    })).toBe(UK_APPRENTICE_HOURLY);
    expect(ukLegalHourlyRate(18, UK_CURRENT_RATES, {
      inApprenticeship: true,
      completedFirstYear: true,
    })).toBe(UK_APPRENTICE_HOURLY);
    expect(ukLegalHourlyRate(20, UK_CURRENT_RATES, {
      inApprenticeship: true,
      completedFirstYear: true,
    })).toBe(UK_YOUTH_HOURLY);
    expect(ukLegalHourlyRate(25, UK_CURRENT_RATES)).toBe(UK_NLW_HOURLY);
    expect(ukLegalHourlyRate(19, UK_CURRENT_RATES)).toBe(UK_YOUTH_HOURLY);
    expect(ukLegalHourlyRate(17, UK_CURRENT_RATES)).toBe(UK_UNDER18_HOURLY);
  });

  it("convertit les livres en euros en divisant par le taux BCE 1 € = X £", () => {
    expect(UK_ECB_EUR_PER_GBP).toBe(0.83578);
    expect(gbpToEur(12.71, 0.83578)).toBe(15.21);
    expect(UK_NLW_IN_EUR).toBe(15.21);
    expect(UK_HOURLY_PCT_VS_FR).toBe(23.5);
    expect(UK_MONTHLY_35_IN_EUR).toBe(2306.45);
    expect(UK_MONTHLY_35_IN_EUR).not.toBe(
      gbpToEur(UK_MONTHLY_35, UK_ECB_EUR_PER_GBP),
    );
    expect(UK_COMPARE_FR_HOURLY).toBe(12.31);
  });

  it("distingue taux actuel, taux 2027 annoncé et Living Wage volontaire", () => {
    expect(UK_NLW_HOURLY).toBe(12.71);
    expect(UK_YOUTH_HOURLY).toBe(10.85);
    expect(UK_UNDER18_HOURLY).toBe(8);
    expect(UK_APPRENTICE_HOURLY).toBe(8);
    expect(UK_2027_NLW).toBe(13.21);
    expect(UK_2027_NLW).not.toBe(UK_NLW_HOURLY);
    expect(UK_RLW_UK).toBe(14.1);
    expect(UK_RLW_LONDON).toBe(15.45);
    expect(UK_OFFSET_DAILY).toBe(11.1);
    expect(UK_OFFSET_WEEKLY).toBe(77.7);
    expect(UK_UNIFORM_EQUIVALENT).toBe(12.625);
    expect(UK_UNIFORM_EQUIVALENT).toBeLessThan(UK_NLW_HOURLY);
  });
});
