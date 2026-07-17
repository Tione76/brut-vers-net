import { formatCurrency, roundCent } from "@/site/salary-calculator";
import { DISMISSAL_CONFIG } from "./config";
import type {
  DismissalCompensationInput,
  DismissalCompensationResult,
  ReferenceMethod,
} from "./types";
import {
  getPrimaryValidationError,
  parseOptionalSalary,
  parseRequiredSalary,
  parseWholeNumber,
} from "./validation";

/**
 * Références juridiques utilisées par ce moteur :
 * - L.1234-9 (droit à l'indemnité légale, sous conditions)
 * - R.1234-2 (formule 1/4 puis 1/3)
 * - L.1226-14 (inaptitude d'origine professionnelle : indemnité spéciale = double)
 * - L.1226-16 (base salariale spécifique en inaptitude d'origine professionnelle)
 * - Service-Public : indemnité de licenciement du salarié en CDI
 */

export function seniorityToYears(years: number, months: number): number {
  return years + months / 12;
}

export function formatSeniorityLabel(years: number, months: number): string {
  const yearPart =
    years === 0
      ? null
      : `${years} an${years > 1 ? "s" : ""}`;
  const monthPart =
    months === 0
      ? null
      : `${months} mois`;

  if (yearPart && monthPart) {
    return `${yearPart} et ${monthPart}`;
  }
  return yearPart ?? monthPart ?? "0 mois";
}

function referenceMethodLabel(method: ReferenceMethod, totalMonths: number): string {
  if (method === "professionalUnfitnessAverage3") {
    return "salaire brut mensuel moyen des 3 derniers mois avant la suspension";
  }
  if (method === "average3") {
    return "moyenne brute des 3 derniers mois";
  }
  if (method === "averageWorked" || totalMonths < 12) {
    return "moyenne brute sur tous les mois travaillés";
  }
  return "moyenne brute des 12 derniers mois";
}

/**
 * Calcule l'indemnité légale de base (hors cas de faute grave/lourde).
 * Les tranches sont calculées avec précision, puis arrondies au centime.
 *
 * Source juridique officielle :
 * - Code du travail, article R.1234-2 (1/4 puis 1/3 au-delà de 10 ans).
 */
export function calculateLegalBaseAmount(
  referenceSalary: number,
  seniorityInYears: number,
): {
  firstBracketYears: number;
  secondBracketYears: number;
  firstBracketAmount: number;
  secondBracketAmount: number;
  legalBaseAmount: number;
} {
  const firstBracketYears = Math.min(seniorityInYears, DISMISSAL_CONFIG.firstBracketYears);
  const secondBracketYears = Math.max(0, seniorityInYears - DISMISSAL_CONFIG.firstBracketYears);

  const firstBracketAmount = roundCent(
    referenceSalary * DISMISSAL_CONFIG.firstBracketRate * firstBracketYears,
  );
  const secondBracketAmount = roundCent(
    referenceSalary * DISMISSAL_CONFIG.secondBracketRate * secondBracketYears,
  );

  return {
    firstBracketYears,
    secondBracketYears,
    firstBracketAmount,
    secondBracketAmount,
    legalBaseAmount: roundCent(firstBracketAmount + secondBracketAmount),
  };
}

export function resolveReferenceSalary(params: {
  average12: number;
  average3: number | null;
  bonusMonthlyProration: number;
  totalMonths: number;
}): {
  referenceSalary: number;
  referenceMethod: ReferenceMethod;
  average3Effective: number | null;
} {
  const { average12, average3, bonusMonthlyProration, totalMonths } = params;
  const average3Effective =
    average3 === null ? null : roundCent(average3 + bonusMonthlyProration);

  const method12: ReferenceMethod = totalMonths < 12 ? "averageWorked" : "average12";

  if (average3Effective === null || average12 >= average3Effective) {
    return {
      referenceSalary: roundCent(average12),
      referenceMethod: method12,
      average3Effective,
    };
  }

  return {
    referenceSalary: average3Effective,
    referenceMethod: "average3",
    average3Effective,
  };
}

function buildSummary(params: {
  situation: DismissalCompensationInput["situation"];
  referenceSalary: number;
  years: number;
  months: number;
  retainedAmount: number;
  professionalUnfitnessApplied: boolean;
  zeroReason: DismissalCompensationResult["zeroReason"];
  retainedSource: "legal";
}): string {
  const seniorityLabel = formatSeniorityLabel(params.years, params.months);

  if (params.zeroReason === "grossMisconduct") {
    return "Dans le cas général, la faute grave ou la faute lourde prive le salarié de l'indemnité légale de licenciement. Des dispositions conventionnelles plus favorables peuvent exister.";
  }
  if (params.zeroReason === "belowMinSeniority") {
    return "Dans le cas général, l'indemnité légale de licenciement est ouverte à partir de 8 mois d'ancienneté ininterrompue. Une convention collective ou une situation particulière peut toutefois prévoir une règle plus favorable.";
  }
  if (params.zeroReason === "mixedWorkTime") {
    return "Le calcul doit être ventilé selon les périodes travaillées à temps plein et à temps partiel. Cette version simple ne couvre pas encore cette situation.";
  }

  if (params.professionalUnfitnessApplied) {
    return `Votre indemnité spéciale minimale est estimée à ${formatCurrency(params.retainedAmount)}, sur la base du double de l'indemnité légale pour une ancienneté de ${seniorityLabel}.`;
  }

  return `Avec un salaire de référence de ${formatCurrency(params.referenceSalary)} brut par mois et une ancienneté de ${seniorityLabel}, votre indemnité légale minimale est estimée à ${formatCurrency(params.retainedAmount)}.`;
}

export function calculateDismissalCompensation(
  input: DismissalCompensationInput,
): DismissalCompensationResult | null {
  if (getPrimaryValidationError(input)) {
    return null;
  }

  const years = parseWholeNumber(input.seniorityYears);
  const months = parseWholeNumber(input.seniorityMonths);
  if (years === null || months === null) {
    return null;
  }

  const totalMonths = years * 12 + months;
  const seniorityInYears = seniorityToYears(years, months);

  if (input.situation === "grossMisconduct") {
    return {
      seniorityYears: years,
      seniorityMonths: months,
      seniorityTotalMonths: totalMonths,
      seniorityInYears,
      eligible: false,
      zeroReason: "grossMisconduct",
      hasSpecialSituationWarning: input.specialSituations.length > 0,
      selectedSpecialSituations: input.specialSituations,
      average12: null,
      average3: null,
      average3BeforeBonus: null,
      professionalUnfitnessAverage3: null,
      bonusMonthlyProration: 0,
      referenceSalary: 0,
      referenceMethod: "average12",
      referenceMethodLabel: "",
      firstBracketYears: 0,
      secondBracketYears: 0,
      firstBracketAmount: 0,
      secondBracketAmount: 0,
      legalBaseAmount: 0,
      professionalUnfitnessApplied: false,
      legalAmount: 0,
      retainedAmount: 0,
      retainedSource: "legal",
      resultLabel: "Indemnité légale estimée",
      summaryBrief: buildSummary({
        situation: input.situation,
        referenceSalary: 0,
        years,
        months,
        retainedAmount: 0,
        professionalUnfitnessApplied: false,
        zeroReason: "grossMisconduct",
        retainedSource: "legal",
      }),
    };
  }

  if (
    input.situation === "standard" &&
    totalMonths < DISMISSAL_CONFIG.minSeniorityMonths
  ) {
    return {
      seniorityYears: years,
      seniorityMonths: months,
      seniorityTotalMonths: totalMonths,
      seniorityInYears,
      eligible: false,
      zeroReason: "belowMinSeniority",
      hasSpecialSituationWarning: input.specialSituations.length > 0,
      selectedSpecialSituations: input.specialSituations,
      average12: null,
      average3: null,
      average3BeforeBonus: null,
      professionalUnfitnessAverage3: null,
      bonusMonthlyProration: 0,
      referenceSalary: 0,
      referenceMethod: "average12",
      referenceMethodLabel: "",
      firstBracketYears: 0,
      secondBracketYears: 0,
      firstBracketAmount: 0,
      secondBracketAmount: 0,
      legalBaseAmount: 0,
      professionalUnfitnessApplied: false,
      legalAmount: 0,
      retainedAmount: 0,
      retainedSource: "legal",
      resultLabel: "Indemnité légale estimée",
      summaryBrief: buildSummary({
        situation: input.situation,
        referenceSalary: 0,
        years,
        months,
        retainedAmount: 0,
        professionalUnfitnessApplied: false,
        zeroReason: "belowMinSeniority",
        retainedSource: "legal",
      }),
    };
  }

  const professionalUnfitnessApplied = input.situation === "professionalUnfitness";
  const hasSpecialSituationWarning = input.specialSituations.length > 0;

  let average12: number | null = null;
  let average3BeforeBonus: number | null = null;
  let average3Effective: number | null = null;
  let bonusMonthlyProration = 0;
  let professionalUnfitnessAverage3: number | null = null;
  let referenceSalary = 0;
  let referenceMethod: ReferenceMethod = "average12";

  if (professionalUnfitnessApplied) {
    const professionalAverage = parseRequiredSalary(input.professionalUnfitnessAverage3Months);
    if (professionalAverage === null || professionalAverage <= 0) {
      return null;
    }
    professionalUnfitnessAverage3 = roundCent(professionalAverage);
    referenceSalary = professionalUnfitnessAverage3;
    referenceMethod = "professionalUnfitnessAverage3";
  } else {
    average12 = parseRequiredSalary(input.average12Months);
    if (average12 === null || average12 <= 0) {
      return null;
    }

    average3BeforeBonus = parseOptionalSalary(input.average3Months);
    if (input.hasBonus) {
      const bonus = parseRequiredSalary(input.bonusAmount);
      if (bonus === null || bonus <= 0) {
        return null;
      }
      bonusMonthlyProration =
        input.bonusKind === "annual" ? roundCent(bonus / 12) : roundCent(bonus / 3);
    }

    const referenceResolution = resolveReferenceSalary({
      average12: roundCent(average12),
      average3: average3BeforeBonus === null ? null : roundCent(average3BeforeBonus),
      bonusMonthlyProration,
      totalMonths,
    });
    referenceSalary = referenceResolution.referenceSalary;
    referenceMethod = referenceResolution.referenceMethod;
    average3Effective = referenceResolution.average3Effective;
  }

  const brackets = calculateLegalBaseAmount(referenceSalary, seniorityInYears);

  /**
   * Source juridique officielle :
   * - Code du travail, article L.1226-14 : indemnité spéciale = 2 x indemnité légale.
   */
  const legalAmount = professionalUnfitnessApplied
    ? roundCent(brackets.legalBaseAmount * DISMISSAL_CONFIG.professionalUnfitnessMultiplier)
    : brackets.legalBaseAmount;

  const retainedSource = "legal" as const;
  const retainedAmount = legalAmount;

  const resultLabel = professionalUnfitnessApplied
    ? "Minimum légal estimé en cas d'inaptitude d'origine professionnelle."
    : "Indemnité légale estimée";

  return {
    seniorityYears: years,
    seniorityMonths: months,
    seniorityTotalMonths: totalMonths,
    seniorityInYears,
    eligible: true,
    zeroReason: null,
    hasSpecialSituationWarning,
    selectedSpecialSituations: input.specialSituations,
    average12: average12 === null ? null : roundCent(average12),
    average3: average3Effective,
    average3BeforeBonus:
      average3BeforeBonus === null ? null : roundCent(average3BeforeBonus),
    professionalUnfitnessAverage3,
    bonusMonthlyProration,
    referenceSalary,
    referenceMethod,
    referenceMethodLabel: referenceMethodLabel(referenceMethod, totalMonths),
    firstBracketYears: brackets.firstBracketYears,
    secondBracketYears: brackets.secondBracketYears,
    firstBracketAmount: brackets.firstBracketAmount,
    secondBracketAmount: brackets.secondBracketAmount,
    legalBaseAmount: brackets.legalBaseAmount,
    professionalUnfitnessApplied,
    legalAmount,
    retainedAmount,
    retainedSource,
    resultLabel,
    summaryBrief: buildSummary({
      situation: input.situation,
      referenceSalary,
      years,
      months,
      retainedAmount,
      professionalUnfitnessApplied,
      zeroReason: null,
      retainedSource,
    }),
  };
}
