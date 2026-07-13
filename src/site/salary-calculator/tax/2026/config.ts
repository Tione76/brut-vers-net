import type { NeutralWithholdingRateSchedule } from "../neutral-rate.types";

export const NEUTRAL_WITHHOLDING_RATE_SCHEDULE_2026: NeutralWithholdingRateSchedule = {
  year: 2026,
  effectiveFrom: "2026-05-01",
  territory: "metropolitan_france",
  sourceName: "BOFiP",
  sourceId: "BOI-BAREME-000037",
  legalReference: "Article 204 H du Code général des impôts",
  lastReviewedAt: "2026-07-13",
  methodologyNote:
    "Grille officielle des taux par défaut. Le calculateur applique ce barème à une estimation de revenu net imposable mensuel, qui reste indicative.",
  brackets: [
    { minInclusive: 0, maxExclusive: 1635, rate: 0 },
    { minInclusive: 1635, maxExclusive: 1698, rate: 0.5 },
    { minInclusive: 1698, maxExclusive: 1807, rate: 1.3 },
    { minInclusive: 1807, maxExclusive: 1928, rate: 2.1 },
    { minInclusive: 1928, maxExclusive: 2060, rate: 2.9 },
    { minInclusive: 2060, maxExclusive: 2170, rate: 3.5 },
    { minInclusive: 2170, maxExclusive: 2315, rate: 4.1 },
    { minInclusive: 2315, maxExclusive: 2738, rate: 5.3 },
    { minInclusive: 2738, maxExclusive: 3135, rate: 7.5 },
    { minInclusive: 3135, maxExclusive: 3571, rate: 9.9 },
    { minInclusive: 3571, maxExclusive: 4019, rate: 11.9 },
    { minInclusive: 4019, maxExclusive: 4690, rate: 13.8 },
    { minInclusive: 4690, maxExclusive: 5624, rate: 15.8 },
    { minInclusive: 5624, maxExclusive: 7037, rate: 17.9 },
    { minInclusive: 7037, maxExclusive: 8789, rate: 20 },
    { minInclusive: 8789, maxExclusive: 12200, rate: 24 },
    { minInclusive: 12200, maxExclusive: 16523, rate: 28 },
    { minInclusive: 16523, maxExclusive: 25937, rate: 33 },
    { minInclusive: 25937, maxExclusive: 55558, rate: 38 },
    { minInclusive: 55558, maxExclusive: Number.POSITIVE_INFINITY, rate: 43 },
  ],
};

