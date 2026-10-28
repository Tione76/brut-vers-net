import { describe, expect, it } from "vitest";
import {
  CH_COMPARE_FR_HOURLY,
  CH_ECB_CHF_PER_EUR,
  CH_GENEVE_HOURLY_EUR,
  CH_GENEVE_VS_FR_PCT,
  CH_MIN_WAGE_TERRITORIES as T,
  CH_OFFICIAL_MONTHLY,
  CH_PEDAGOGICAL_MONTHLY,
  CH_TESSIN_FUTURE_MAX,
  CH_TESSIN_FUTURE_MIN,
} from "./data";
import {
  chfToEur,
  eurToChf,
  monthlyFromHourlyWeekly,
  percentDiffVsBase,
} from "./engine";

describe("salaire minimum Suisse - engine", () => {
  it("calcule les conversions pédagogiques (taux × heures × 52 / 12)", () => {
    expect(monthlyFromHourlyWeekly(24.59, 40)).toBe(4262.27);
    expect(monthlyFromHourlyWeekly(24.59, 42)).toBe(4475.38);
    expect(monthlyFromHourlyWeekly(21.4, 40)).toBe(3709.33);
    expect(monthlyFromHourlyWeekly(21.4, 42)).toBe(3894.8);
    expect(monthlyFromHourlyWeekly(20, 40)).toBe(3466.67);
    expect(monthlyFromHourlyWeekly(20.5, 40)).toBe(3553.33);
  });

  it("aligne les constantes pédagogiques sur la formule", () => {
    expect(CH_PEDAGOGICAL_MONTHLY.geneve40).toBe(4262.27);
    expect(CH_PEDAGOGICAL_MONTHLY.geneve42).toBe(4475.38);
    expect(CH_PEDAGOGICAL_MONTHLY.jura40).toBe(3709.33);
    expect(CH_PEDAGOGICAL_MONTHLY.tessinMin40).toBe(3466.67);
    expect(CH_PEDAGOGICAL_MONTHLY.tessinMax40).toBe(3553.33);
  });

  it("reprend les mensuels officiels, y compris l'arrondi neuchâtelois au franc", () => {
    expect(CH_OFFICIAL_MONTHLY.geneve40).toBe(CH_PEDAGOGICAL_MONTHLY.geneve40);
    expect(CH_PEDAGOGICAL_MONTHLY.neuchatel40).toBe(3700.67);
    expect(CH_PEDAGOGICAL_MONTHLY.neuchatel42).toBe(3885.7);
    expect(CH_OFFICIAL_MONTHLY.neuchatel40).toBe(3701);
    expect(CH_OFFICIAL_MONTHLY.neuchatel42).toBe(3886);
    expect(CH_OFFICIAL_MONTHLY.neuchatel40).toBe(Math.round(CH_PEDAGOGICAL_MONTHLY.neuchatel40));
    expect(CH_OFFICIAL_MONTHLY.neuchatel42).toBe(Math.round(CH_PEDAGOGICAL_MONTHLY.neuchatel42));
    expect(CH_OFFICIAL_MONTHLY.baleVille40).toBe(3847.93);
    expect(CH_OFFICIAL_MONTHLY.baleVille42).toBe(4040.4);
  });

  it("convertit CHF ↔ EUR dans les deux sens au taux BCE daté", () => {
    expect(chfToEur(24.59, 0.9247)).toBe(26.59);
    expect(eurToChf(26.59, 0.9247)).toBe(24.59);
    expect(CH_ECB_CHF_PER_EUR).toBe(0.9247);
    expect(CH_GENEVE_HOURLY_EUR).toBe(26.59);
    expect(percentDiffVsBase(26.59, 12.31)).toBe(116);
    expect(CH_GENEVE_VS_FR_PCT).toBe(116);
    expect(CH_COMPARE_FR_HOURLY).toBe(12.31);
  });

  it("conserve une fourchette tessinoise, pas un taux unique", () => {
    expect("hourly" in T.tessin).toBe(false);
    expect(T.tessin.hourlyMin).toBe(20);
    expect(T.tessin.hourlyMax).toBe(20.5);
    expect(T.tessin.hourlyMin).not.toBe(T.tessin.hourlyMax);
    expect(CH_TESSIN_FUTURE_MIN).toBe(20.5);
    expect(CH_TESSIN_FUTURE_MAX).toBe(21);
    expect(CH_TESSIN_FUTURE_MIN).not.toBe(CH_TESSIN_FUTURE_MAX);
  });

  it("distingue les taux actuels des taux futurs déjà fixés", () => {
    expect(T.geneve.hourly).toBe(24.59);
    expect(T.geneve.futureHourly).toBe(24.73);
    expect(T.geneve.hourly).not.toBe(T.geneve.futureHourly);
    expect(T.baleVille.hourly).toBe(22.2);
    expect(T.baleVille.futureHourly).toBe(22.5);
    expect(T.jura.from).toBe("2024-07-01");
  });
});
