import { describe, expect, it } from "vitest";
import {
  THIRTEENTH_ANNUAL_FIXED_GROSS,
  THIRTEENTH_BASE_EXAMPLES,
  THIRTEENTH_MONTHLY_BASE_GROSS,
  THIRTEENTH_PRORATA_DENOM_A,
  THIRTEENTH_PRORATA_DENOM_B,
  THIRTEENTH_PRORATA_FULL_A,
  THIRTEENTH_PRORATA_FULL_B,
  THIRTEENTH_PRORATA_MONTHS_A,
  THIRTEENTH_PRORATA_MONTHS_B,
  annualWithFullThirteenth,
  equalInstallmentGross,
  offerComparisonRows,
  prorataThirteenthGross,
  thirteenthBaseExampleRows,
} from "./data";

describe("calculs pédagogiques 13ᵉ mois", () => {
  it("répartit 30 000 € sur 13 échéances avec arrondi au centime", () => {
    expect(equalInstallmentGross(THIRTEENTH_ANNUAL_FIXED_GROSS, 13)).toBe(2307.69);
    expect(2307.69 * 13).toBeCloseTo(30000, 1);
  });

  it("calcule les totaux annuels avec une prime égale à un mois de base", () => {
    expect(annualWithFullThirteenth(2000)).toBe(26000);
    expect(annualWithFullThirteenth(2500)).toBe(32500);
    expect(annualWithFullThirteenth(3000)).toBe(39000);
    expect(THIRTEENTH_BASE_EXAMPLES).toEqual([2000, 2500, 3000]);

    const rows = thirteenthBaseExampleRows();
    expect(rows.map((row) => row.annualWithPrime)).toEqual([26000, 32500, 39000]);
  });

  it("applique les proratas conditionnels 6/12 et 9/12", () => {
    expect(
      prorataThirteenthGross(
        THIRTEENTH_PRORATA_FULL_A,
        THIRTEENTH_PRORATA_MONTHS_A,
        THIRTEENTH_PRORATA_DENOM_A,
      ),
    ).toBe(1250);
    expect(
      prorataThirteenthGross(
        THIRTEENTH_PRORATA_FULL_B,
        THIRTEENTH_PRORATA_MONTHS_B,
        THIRTEENTH_PRORATA_DENOM_B,
      ),
    ).toBe(1800);
  });

  it("compare les offres 12 mois, 13 mois et rémunération annuelle répartie", () => {
    const rows = offerComparisonRows();
    expect(rows.map((row) => row.annualGross)).toEqual([
      THIRTEENTH_MONTHLY_BASE_GROSS * 12,
      32500,
      THIRTEENTH_ANNUAL_FIXED_GROSS,
    ]);
  });
});
