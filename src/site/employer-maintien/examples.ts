import {
  calculateSickLeaveSalary,
  computeLegalEmployerComplement,
  type LegalEmployerComplementResult,
} from "@/site/sick-leave/engine";

function dailyIjss(monthlyGrossUsual: number, stopStartIso: string): number {
  const result = calculateSickLeaveSalary({
    monthlyGrossUsual,
    stopStartIso,
    stopEndIso: stopStartIso,
    ijssCarenceMode: "standard3Days",
    employerComplementMode: "none",
    seniorityYears: 0,
    employerEligibilityConfirmed: false,
    subrogation: "unknown",
  });
  if (!result) {
    throw new Error(`IJSS journalière indisponible (${monthlyGrossUsual} €, ${stopStartIso})`);
  }
  return result.dailyIjssGross;
}

function mustMaintien(
  input: Parameters<typeof computeLegalEmployerComplement>[0],
): LegalEmployerComplementResult {
  const result = computeLegalEmployerComplement(input);
  if (!result) {
    throw new Error(
      `Maintien légal invalide (${input.stopStartIso} → ${input.stopEndIso}, ${input.monthlyGrossUsual} €)`,
    );
  }
  return result;
}

const DAILY_IJSS_2000 = dailyIjss(2000, "2026-09-07");

const base = {
  monthlyGrossUsual: 2000,
  eligibilityConfirmed: true,
  dailyIjssGross: DAILY_IJSS_2000,
} as const;

/** Arrêt de 7 jours : aucun complément légal. */
export const ex7j = mustMaintien({
  ...base,
  stopStartIso: "2026-09-07",
  stopEndIso: "2026-09-13",
  seniorityYears: 3,
});

/** Arrêt de 14 jours, 1 à 5 ans d'ancienneté. */
export const ex14j = mustMaintien({
  ...base,
  stopStartIso: "2026-09-07",
  stopEndIso: "2026-09-20",
  seniorityYears: 3,
});

/** Arrêt de 45 jours : 30 jours à 90 %, puis 8 jours aux deux tiers. */
export const ex45j = mustMaintien({
  ...base,
  stopStartIso: "2026-09-01",
  stopEndIso: "2026-10-15",
  seniorityYears: 3,
  dailyIjssGross: dailyIjss(2000, "2026-09-01"),
});

/** Droits de la première tranche déjà consommés. */
export const exDroitsPartiels = mustMaintien({
  ...base,
  stopStartIso: "2026-09-07",
  stopEndIso: "2026-09-20",
  seniorityYears: 3,
  daysAlreadyUsedFirstPeriod: 30,
  daysAlreadyUsedSecondPeriod: 0,
});

/** Moins d'un an d'ancienneté. */
export const exSansAnciennete = mustMaintien({
  ...base,
  stopStartIso: "2026-09-07",
  stopEndIso: "2026-09-20",
  seniorityYears: 0,
});

/** Droits des deux tranches déjà épuisés. */
export const exDroitsEpuises = mustMaintien({
  ...base,
  stopStartIso: "2026-09-07",
  stopEndIso: "2026-09-20",
  seniorityYears: 3,
  daysAlreadyUsedFirstPeriod: 30,
  daysAlreadyUsedSecondPeriod: 30,
});

/** Arrêt plus long que les droits encore disponibles (1 an d'ancienneté). */
export const exLongStop = mustMaintien({
  ...base,
  stopStartIso: "2026-09-01",
  stopEndIso: "2026-11-30",
  seniorityYears: 1,
  dailyIjssGross: dailyIjss(2000, "2026-09-01"),
});

export const EMPLOYER_MAINTIEN_EXAMPLE_DAILY_IJSS = DAILY_IJSS_2000;
