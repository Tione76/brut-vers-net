import { describe, expect, it } from "vitest";
import {
  NEUTRAL_WITHHOLDING_RATE_2026,
  estimateNeutralWithholdingRate,
} from "@/site/salary-calculator/tax";

describe("estimateNeutralWithholdingRate boundaries", () => {
  const boundaryCases = [
    { base: 0, rate: 0 },
    { base: 1634.99, rate: 0 },
    { base: 1635, rate: 0.5 },
    { base: 1697.99, rate: 0.5 },
    { base: 1698, rate: 1.3 },
    { base: 1806.99, rate: 1.3 },
    { base: 1807, rate: 2.1 },
    { base: 1927.99, rate: 2.1 },
    { base: 1928, rate: 2.9 },
    { base: 2059.99, rate: 2.9 },
    { base: 2060, rate: 3.5 },
    { base: 2169.99, rate: 3.5 },
    { base: 2170, rate: 4.1 },
    { base: 2314.99, rate: 4.1 },
    { base: 2315, rate: 5.3 },
    { base: 2737.99, rate: 5.3 },
    { base: 2738, rate: 7.5 },
    { base: 3134.99, rate: 7.5 },
    { base: 3135, rate: 9.9 },
    { base: 3570.99, rate: 9.9 },
    { base: 3571, rate: 11.9 },
    { base: 4018.99, rate: 11.9 },
    { base: 4019, rate: 13.8 },
    { base: 4689.99, rate: 13.8 },
    { base: 4690, rate: 15.8 },
    { base: 5623.99, rate: 15.8 },
    { base: 5624, rate: 17.9 },
    { base: 7036.99, rate: 17.9 },
    { base: 7037, rate: 20 },
    { base: 8788.99, rate: 20 },
    { base: 8789, rate: 24 },
    { base: 12199.99, rate: 24 },
    { base: 12200, rate: 28 },
    { base: 16522.99, rate: 28 },
    { base: 16523, rate: 33 },
    { base: 25936.99, rate: 33 },
    { base: 25937, rate: 38 },
    { base: 55557.99, rate: 38 },
    { base: 55558, rate: 43 },
    { base: 100000, rate: 43 },
  ] as const;

  it.each(boundaryCases)("base $base € → $rate %", ({ base, rate }) => {
    expect(estimateNeutralWithholdingRate(base).rate).toBe(rate);
  });

  it("couvre toutes les tranches du barème 2026", () => {
    expect(NEUTRAL_WITHHOLDING_RATE_2026.brackets).toHaveLength(20);
  });

  it("signale qu'il s'agit d'une estimation", () => {
    const result = estimateNeutralWithholdingRate(1950);
    expect(result.isEstimation).toBe(true);
    expect(result.approximateBase).toBe(1950);
    expect(result.rate).toBe(2.9);
  });
});

describe("estimateNeutralWithholdingRate examples", () => {
  it("estime 2,9 % pour une base mensuelle proche de 1 950 €", () => {
    expect(estimateNeutralWithholdingRate(1950).rate).toBe(2.9);
  });
});
