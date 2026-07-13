import { WITHHOLDING_TAX } from "../config";
import { estimateNeutralWithholdingRate } from "./2026";
import type { NeutralWithholdingEstimate, WithholdingRateMode } from "./neutral-rate.types";

export interface ResolvedWithholdingRate {
  rate: number;
  estimate: NeutralWithholdingEstimate | null;
  hasSalary: boolean;
}

export function clampWithholdingRate(rate: number): number {
  if (!Number.isFinite(rate)) {
    return WITHHOLDING_TAX.default;
  }
  return Math.min(WITHHOLDING_TAX.max, Math.max(WITHHOLDING_TAX.min, Math.round(rate * 10) / 10));
}

export function resolveEffectiveWithholdingRate(
  mode: WithholdingRateMode,
  taxableMonthly: number | null,
  manualRate: number,
): ResolvedWithholdingRate {
  const hasSalary = taxableMonthly !== null && taxableMonthly > 0;

  if (!hasSalary) {
    return {
      rate: WITHHOLDING_TAX.default,
      estimate: null,
      hasSalary: false,
    };
  }

  if (mode === "auto") {
    const estimate = estimateNeutralWithholdingRate(taxableMonthly);
    return {
      rate: estimate.rate,
      estimate,
      hasSalary: true,
    };
  }

  return {
    rate: clampWithholdingRate(manualRate),
    estimate: null,
    hasSalary: true,
  };
}
