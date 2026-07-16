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
  if (method === "average3") {
    return "moyenne brute des 3 derniers mois";
  }
  if (method === "averageWorked" || totalMonths < 12) {
    return "moyenne brute sur tous les mois travaillés";
  }
  return "moyenne brute des 12 derniers mois";
}

/**
 * Calcule l'indemnité légale de base (sans doublement inaptitude).
 * Les tranches sont calculées avec précision, puis arrondies au centime.
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
  retainedSource: "legal" | "convention";
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

  if (params.retainedSource === "convention") {
    return `Avec un salaire de référence de ${formatCurrency(params.referenceSalary)} brut par mois et une ancienneté de ${seniorityLabel}, le montant conventionnel saisi (${formatCurrency(params.retainedAmount)}) est plus favorable que l'indemnité légale minimale estimée.`;
  }

  if (params.professionalUnfitnessApplied) {
    return `Votre indemnité spéciale minimale, calculée sur la base du double de l'indemnité légale, est estimée à ${formatCurrency(params.retainedAmount)} pour un salaire de référence de ${formatCurrency(params.referenceSalary)} brut par mois et une ancienneté de ${seniorityLabel}.`;
  }

  return `Avec un salaire de référence de ${formatCurrency(params.referenceSalary)} brut par mois et une ancienneté de ${seniorityLabel}, votre indemnité légale minimale est estimée à ${formatCurrency(params.retainedAmount)}.`;
}

export function calculateDismissalCompensation(
  input: DismissalCompensationInput,
): DismissalCompensationResult | null {
  if (input.mixedWorkTime) {
    return {
      seniorityYears: 0,
      seniorityMonths: 0,
      seniorityTotalMonths: 0,
      seniorityInYears: 0,
      eligible: false,
      zeroReason: "mixedWorkTime",
      average12: null,
      average3: null,
      average3BeforeBonus: null,
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
      conventionAmount: null,
      retainedAmount: 0,
      retainedSource: "legal",
      resultLabel: "Indemnité minimale estimée",
      summaryBrief: buildSummary({
        situation: input.situation,
        referenceSalary: 0,
        years: 0,
        months: 0,
        retainedAmount: 0,
        professionalUnfitnessApplied: false,
        zeroReason: "mixedWorkTime",
        retainedSource: "legal",
      }),
    };
  }

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
      average12: null,
      average3: null,
      average3BeforeBonus: null,
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
      conventionAmount: null,
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
      average12: null,
      average3: null,
      average3BeforeBonus: null,
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
      conventionAmount: null,
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

  const average12 = parseRequiredSalary(input.average12Months);
  if (average12 === null || average12 <= 0) {
    return null;
  }

  const average3BeforeBonus = parseOptionalSalary(input.average3Months);
  let bonusMonthlyProration = 0;
  if (input.hasBonus) {
    const bonus = parseRequiredSalary(input.bonusAmount);
    if (bonus === null || bonus <= 0) {
      return null;
    }
    bonusMonthlyProration =
      input.bonusKind === "annual" ? roundCent(bonus / 12) : roundCent(bonus / 3);
  }

  const { referenceSalary, referenceMethod, average3Effective } = resolveReferenceSalary({
    average12: roundCent(average12),
    average3: average3BeforeBonus === null ? null : roundCent(average3BeforeBonus),
    bonusMonthlyProration,
    totalMonths,
  });

  const brackets = calculateLegalBaseAmount(referenceSalary, seniorityInYears);
  const professionalUnfitnessApplied = input.situation === "professionalUnfitness";
  const legalAmount = professionalUnfitnessApplied
    ? roundCent(brackets.legalBaseAmount * DISMISSAL_CONFIG.professionalUnfitnessMultiplier)
    : brackets.legalBaseAmount;

  let conventionAmount: number | null = null;
  if (input.conventionKnowledge === "yes" && input.conventionAmount.trim()) {
    conventionAmount = parseOptionalSalary(input.conventionAmount);
    if (conventionAmount !== null) {
      conventionAmount = roundCent(conventionAmount);
    }
  }

  const retainedSource =
    conventionAmount !== null && conventionAmount > legalAmount ? "convention" : "legal";
  const retainedAmount =
    retainedSource === "convention" && conventionAmount !== null
      ? conventionAmount
      : legalAmount;

  const resultLabel = professionalUnfitnessApplied
    ? "Indemnité spéciale minimale estimée"
    : "Indemnité minimale estimée";

  return {
    seniorityYears: years,
    seniorityMonths: months,
    seniorityTotalMonths: totalMonths,
    seniorityInYears,
    eligible: true,
    zeroReason: null,
    average12: roundCent(average12),
    average3: average3Effective,
    average3BeforeBonus:
      average3BeforeBonus === null ? null : roundCent(average3BeforeBonus),
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
    conventionAmount,
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
