import {
  buildTaxableIncomeEstimate,
  resolveEffectiveWithholdingRate,
  roundCent,
} from "@/site/salary-calculator";
import { PAS_MONTHS_PER_YEAR } from "../config";
import { isNeutralEquivalentHousehold } from "./household";
import { estimateHouseholdIncomeTax } from "./income-tax";
import { computeFiscalParts } from "./quotient-familial";
import { resolvePersonTaxableAnnual } from "./reconstruct-taxable";
import type { PersonalizedPasInput, PersonalizedPasResult } from "./types";

function clampRatePercent(rate: number): number {
  if (!Number.isFinite(rate) || rate < 0) {
    return 0;
  }
  return Math.min(43, Math.round(rate * 10) / 10);
}

/**
 * Base imposable mensuelle alignée sur le mode simple lorsqu'on dispose du brut/net.
 * Sinon : net imposable annuel saisi ÷ 12.
 */
function resolveTaxableMonthlyForNeutral(
  resolved: NonNullable<ReturnType<typeof resolvePersonTaxableAnnual>>,
): { taxableMonthly: number; taxableAnnual: number } {
  if (resolved.grossMonthly !== null && resolved.netMonthly !== null) {
    const estimate = buildTaxableIncomeEstimate({
      netMonthly: resolved.netMonthly,
      grossMonthly: resolved.grossMonthly,
      salaryMonths: PAS_MONTHS_PER_YEAR,
    });
    return {
      taxableMonthly: estimate.taxableIncomeMonthly,
      taxableAnnual: estimate.taxableIncomeAnnual,
    };
  }

  return {
    taxableAnnual: resolved.taxableAnnual,
    taxableMonthly: roundCent(resolved.taxableAnnual / PAS_MONTHS_PER_YEAR),
  };
}

function buildResult(params: {
  householdTaxableAnnual: number;
  declarantTaxableAnnual: number;
  spouseTaxableAnnual: number;
  fiscalParts: number;
  estimatedIncomeTaxAnnual: number;
  personalizedRatePercent: number;
  declarantNetMonthly: number | null;
}): PersonalizedPasResult {
  const {
    householdTaxableAnnual,
    declarantTaxableAnnual,
    spouseTaxableAnnual,
    fiscalParts,
    estimatedIncomeTaxAnnual,
    personalizedRatePercent,
    declarantNetMonthly,
  } = params;

  const declarantTaxableMonthly = roundCent(declarantTaxableAnnual / PAS_MONTHS_PER_YEAR);
  const withholdingMonthly = roundCent(
    declarantTaxableMonthly * (personalizedRatePercent / 100),
  );
  const withholdingAnnual = roundCent(declarantTaxableAnnual * (personalizedRatePercent / 100));

  const netAfterTaxMonthly =
    declarantNetMonthly !== null ? roundCent(declarantNetMonthly - withholdingMonthly) : null;
  const netAfterTaxAnnual =
    netAfterTaxMonthly !== null
      ? roundCent(netAfterTaxMonthly * PAS_MONTHS_PER_YEAR)
      : null;

  return {
    householdTaxableAnnual,
    declarantTaxableAnnual,
    spouseTaxableAnnual,
    fiscalParts,
    estimatedIncomeTaxAnnual,
    personalizedRatePercent,
    withholdingMonthly,
    withholdingAnnual,
    declarantNetMonthly,
    netAfterTaxMonthly,
    netAfterTaxAnnual,
  };
}

/**
 * Cas célibataire / divorcé sans enfant : même logique que la simulation simple
 * (estimation net imposable partagée + grille de taux neutre BOFiP).
 */
function calculateAsNeutralEquivalent(
  input: PersonalizedPasInput,
  declarantResolved: NonNullable<ReturnType<typeof resolvePersonTaxableAnnual>>,
): PersonalizedPasResult {
  const { taxableMonthly, taxableAnnual } = resolveTaxableMonthlyForNeutral(declarantResolved);
  const rate = resolveEffectiveWithholdingRate("auto", taxableMonthly, 0).rate;

  return buildResult({
    householdTaxableAnnual: taxableAnnual,
    declarantTaxableAnnual: taxableAnnual,
    spouseTaxableAnnual: 0,
    fiscalParts: computeFiscalParts(input.situation, input.children),
    estimatedIncomeTaxAnnual: roundCent(taxableAnnual * (rate / 100)),
    personalizedRatePercent: clampRatePercent(rate),
    declarantNetMonthly: declarantResolved.netMonthly,
  });
}

/**
 * Cas avec conjoint et/ou enfants : estimation du taux via IR + quotient familial.
 */
function calculateAsIncomeTaxEstimate(
  input: PersonalizedPasInput,
  declarantResolved: NonNullable<ReturnType<typeof resolvePersonTaxableAnnual>>,
  spouseTaxableAnnual: number,
): PersonalizedPasResult {
  const declarantTaxableAnnual = declarantResolved.taxableAnnual;
  const householdTaxableAnnual = roundCent(declarantTaxableAnnual + spouseTaxableAnnual);

  const fiscalParts = computeFiscalParts(input.situation, input.children);
  const basePartsWithoutChildren =
    input.situation === "married" || input.situation === "pacs" ? 2 : 1;

  const estimatedIncomeTaxAnnual = estimateHouseholdIncomeTax(
    householdTaxableAnnual,
    fiscalParts,
    input.children,
    basePartsWithoutChildren,
  );

  const personalizedRatePercent = clampRatePercent(
    (estimatedIncomeTaxAnnual / householdTaxableAnnual) * 100,
  );

  return buildResult({
    householdTaxableAnnual,
    declarantTaxableAnnual,
    spouseTaxableAnnual,
    fiscalParts,
    estimatedIncomeTaxAnnual,
    personalizedRatePercent,
    declarantNetMonthly: declarantResolved.netMonthly,
  });
}

export function calculatePersonalizedPas(
  input: PersonalizedPasInput,
): PersonalizedPasResult | null {
  const declarantResolved = resolvePersonTaxableAnnual(input.declarant);
  if (!declarantResolved) {
    return null;
  }

  const needsSpouse = input.situation === "married" || input.situation === "pacs";
  let spouseTaxableAnnual = 0;
  if (needsSpouse) {
    if (!input.spouse) {
      return null;
    }
    const spouseResolved = resolvePersonTaxableAnnual(input.spouse);
    if (!spouseResolved) {
      return null;
    }
    spouseTaxableAnnual = spouseResolved.taxableAnnual;
  }

  if (isNeutralEquivalentHousehold(input.situation, input.children)) {
    return calculateAsNeutralEquivalent(input, declarantResolved);
  }

  const householdTaxableAnnual = roundCent(
    declarantResolved.taxableAnnual + spouseTaxableAnnual,
  );
  if (householdTaxableAnnual <= 0) {
    return null;
  }

  return calculateAsIncomeTaxEstimate(input, declarantResolved, spouseTaxableAnnual);
}
