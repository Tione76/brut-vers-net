import { NEUTRAL_WITHHOLDING_RATE_2026 } from "./neutral-rate";
import type { NeutralWithholdingEstimate } from "../neutral-rate.types";

export function estimateNeutralWithholdingRate(
  taxableMonthlyApprox: number,
): NeutralWithholdingEstimate {
  if (!Number.isFinite(taxableMonthlyApprox) || taxableMonthlyApprox < 0) {
    return {
      rate: 0,
      approximateBase: 0,
      bracketVersion: `${NEUTRAL_WITHHOLDING_RATE_2026.year}-${NEUTRAL_WITHHOLDING_RATE_2026.effectiveFrom}`,
      isEstimation: true,
      methodologyNote: NEUTRAL_WITHHOLDING_RATE_2026.methodologyNote,
    };
  }

  const bracket = NEUTRAL_WITHHOLDING_RATE_2026.brackets.find(
    (item) =>
      taxableMonthlyApprox >= item.minInclusive && taxableMonthlyApprox < item.maxExclusive,
  );

  const rate = bracket?.rate ?? NEUTRAL_WITHHOLDING_RATE_2026.brackets.at(-1)?.rate ?? 0;

  return {
    rate,
    approximateBase: taxableMonthlyApprox,
    bracketVersion: `${NEUTRAL_WITHHOLDING_RATE_2026.year}-${NEUTRAL_WITHHOLDING_RATE_2026.effectiveFrom}`,
    isEstimation: true,
    methodologyNote: NEUTRAL_WITHHOLDING_RATE_2026.methodologyNote,
  };
}

