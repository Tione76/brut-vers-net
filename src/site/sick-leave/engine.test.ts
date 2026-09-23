import { describe, expect, it } from "vitest";
import {
  allocateEmployerMaintienDays,
  calculateSickLeaveSalary,
  computeCompletedSeniorityYears,
  computeDailyIjssGross,
  computeIjssNetIndicative,
  computeLegalEmployerComplement,
  countInclusiveCalendarDays,
  getIjssUnsupportedReason,
  getLegalMaintienSchedule,
  IJSS_BAREMES,
  IJSS_JUNE_2026_INCONSISTENT_MESSAGE,
  IJSS_SMIC_MULTIPLIER,
  parseIsoDateOnly,
  selectIjssBareme,
  truncateCent,
  multiplyDailyByDays,
  finalizeMaintienTotal,
  dailyLegalComplement,
} from "./engine";

describe("sick-leave dates", () => {
  it("compte les jours calendaires de façon inclusive", () => {
    expect(countInclusiveCalendarDays("2026-09-01", "2026-09-01")).toBe(1);
    expect(countInclusiveCalendarDays("2026-09-01", "2026-09-03")).toBe(3);
    expect(countInclusiveCalendarDays("2026-09-01", "2026-09-04")).toBe(4);
    expect(countInclusiveCalendarDays("2026-09-01", "2026-09-07")).toBe(7);
    expect(countInclusiveCalendarDays("2026-09-01", "2026-09-08")).toBe(8);
    expect(countInclusiveCalendarDays("2026-09-01", "2026-09-15")).toBe(15);
  });

  it("gère les changements de mois et d'année", () => {
    expect(countInclusiveCalendarDays("2026-01-28", "2026-02-02")).toBe(6);
    expect(countInclusiveCalendarDays("2025-12-30", "2026-01-02")).toBe(4);
  });

  it("refuse les dates invalides ou inversées", () => {
    expect(countInclusiveCalendarDays("2026-09-10", "2026-09-01")).toBeNull();
    expect(countInclusiveCalendarDays("", "2026-09-01")).toBeNull();
    expect(parseIsoDateOnly("2026-02-30")).toBeNull();
  });
});

describe("sick-leave IJSS formula", () => {
  const julyBareme = selectIjssBareme("2026-07-15")!;

  it("reproduit l'exemple officiel 3 × 2 000 € → 32,87 €", () => {
    const result = computeDailyIjssGross([2000, 2000, 2000], julyBareme);
    expect(result.dailyBaseSalary).toBe(65.75);
    expect(result.dailyIjssGross).toBe(32.87);
  });

  it("tronque au centime puis applique le plafond publié, sans exception", () => {
    const ceiling = julyBareme.monthlyCeiling;
    const result = computeDailyIjssGross([ceiling, ceiling, ceiling], julyBareme);
    const truncated = truncateCent((ceiling * 3) / 91.25 / 2);
    expect(result.dailyIjssGross).toBe(truncated);
    expect(result.dailyIjssGross).toBe(42.96);
    expect(julyBareme.maxDailyIjssGross).toBe(42.97);
    expect(julyBareme.monthlyCeiling).toBe(2613.83);
  });

  it("plafonne un salaire supérieur au plafond", () => {
    const result = computeDailyIjssGross([4000, 4000, 4000], julyBareme);
    expect(result.ceilingApplied).toBe(true);
    expect(result.dailyIjssGross).toBe(42.96);
    expect(result.dailyIjssGross).toBeLessThanOrEqual(julyBareme.maxDailyIjssGross);
  });

  it("accepte des salaires différents sous plafond", () => {
    const result = computeDailyIjssGross([1800, 2000, 2200], julyBareme);
    expect(result.cappedTotal).toBe(6000);
    expect(result.dailyIjssGross).toBe(32.87);
  });

  it("calcule 2 500 € et un montant juste sous le plafond", () => {
    const mid = computeDailyIjssGross([2500, 2500, 2500], julyBareme);
    expect(mid.dailyIjssGross).toBe(truncateCent((2500 * 3) / 91.25 / 2));
    expect(mid.ceilingApplied).toBe(false);

    const justUnder = computeDailyIjssGross([2613, 2613, 2613], julyBareme);
    expect(justUnder.ceilingApplied).toBe(false);
    expect(justUnder.dailyIjssGross).toBe(truncateCent((2613 * 3) / 91.25 / 2));
    expect(justUnder.dailyIjssGross).toBeLessThan(julyBareme.maxDailyIjssGross);
  });

  it("sélectionne le barème selon la date de début", () => {
    expect(selectIjssBareme("2026-06-15")).toBeNull();
    expect(selectIjssBareme("2026-07-01")?.maxDailyIjssGross).toBe(42.97);
    expect(IJSS_BAREMES.length).toBe(1);
  });

  it("estime le net IJSS avant PAS (CSG 6,2 % + CRDS 0,5 %)", () => {
    expect(computeIjssNetIndicative(32.87)).toBe(truncateCent(32.87 * 0.933));
  });
});

describe("sick-leave barèmes IJSS documentés", () => {
  it("ne conserve que le barème publié à compter du 1er juillet 2026", () => {
    expect(IJSS_BAREMES).toHaveLength(1);
    const july = IJSS_BAREMES[0]!;
    expect(july.effectiveFrom).toBe("2026-07-01");
    expect(july.effectiveTo).toBeNull();
    expect(july.smicMultiplier).toBe(IJSS_SMIC_MULTIPLIER);
    expect(july.monthlyCeiling).toBe(2613.83);
    expect(july.maxDailyIjssGross).toBe(42.97);
    expect(july.smicMonthlyReference).toBe(1867.02);
  });

  it("n'associe jamais juin 2026 à un plafond simulé (2 522,52 € ou 2 552,24 €)", () => {
    expect(selectIjssBareme("2026-06-01")).toBeNull();
    expect(selectIjssBareme("2026-06-30")).toBeNull();
    expect(
      IJSS_BAREMES.some(
        (b) => b.monthlyCeiling === 2522.52 || b.monthlyCeiling === 2552.24,
      ),
    ).toBe(false);
    expect(
      calculateSickLeaveSalary({
        monthlyGrossUsual: 4000,
        stopStartIso: "2026-06-15",
        stopEndIso: "2026-06-28",
        ijssCarenceMode: "standard3Days",
        employerComplementMode: "none",
        seniorityYears: 0,
        employerEligibilityConfirmed: false,
        subrogation: "unknown",
      }),
    ).toBeNull();
    expect(getIjssUnsupportedReason("2026-06-01")).toBe(
      IJSS_JUNE_2026_INCONSISTENT_MESSAGE,
    );
    expect(getIjssUnsupportedReason("2026-06-30")).toBe(
      IJSS_JUNE_2026_INCONSISTENT_MESSAGE,
    );
  });

  it("refuse un arrêt débutant le 31 mai 2026", () => {
    expect(selectIjssBareme("2026-05-31")).toBeNull();
    expect(getIjssUnsupportedReason("2026-05-31")).toBeTruthy();
    expect(
      calculateSickLeaveSalary({
        monthlyGrossUsual: 4000,
        stopStartIso: "2026-05-31",
        stopEndIso: "2026-06-13",
        ijssCarenceMode: "standard3Days",
        employerComplementMode: "none",
        seniorityYears: 0,
        employerEligibilityConfirmed: false,
        subrogation: "unknown",
      }),
    ).toBeNull();
  });

  it("applique le barème de juillet 2026 (1,4 SMIC, 2 613,83 €, IJ max publiée 42,97 €)", () => {
    const bareme = selectIjssBareme("2026-07-01")!;
    expect(bareme.smicMultiplier).toBe(1.4);
    expect(bareme.monthlyCeiling).toBe(2613.83);
    expect(bareme.maxDailyIjssGross).toBe(42.97);

    const atCeiling = computeDailyIjssGross(
      [2613.83, 2613.83, 2613.83],
      bareme,
    );
    expect(atCeiling.dailyIjssGross).toBe(42.96);
    expect(atCeiling.dailyIjssGross).toBeLessThanOrEqual(42.97);
  });

  it("produit les mêmes IJSS sur les deux calculateurs (mode IJSS seules)", () => {
    const shared = {
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      ijssCarenceMode: "standard3Days" as const,
      seniorityYears: 0,
      employerEligibilityConfirmed: false,
      subrogation: "unknown" as const,
    };
    const general = calculateSickLeaveSalary({
      ...shared,
      employerComplementMode: "legalMinimum",
    })!;
    const ijssOnly = calculateSickLeaveSalary({
      ...shared,
      employerComplementMode: "none",
    })!;
    expect(ijssOnly.dailyBaseSalary).toBe(general.dailyBaseSalary);
    expect(ijssOnly.dailyIjssGross).toBe(general.dailyIjssGross);
    expect(ijssOnly.bareme.monthlyCeiling).toBe(general.bareme.monthlyCeiling);
    expect(ijssOnly.ijssIndemnifiedDays).toBe(general.ijssIndemnifiedDays);
    expect(ijssOnly.ijssGrossTotal).toBe(general.ijssGrossTotal);
    expect(ijssOnly.ijssNetIndicativeTotal).toBe(general.ijssNetIndicativeTotal);
    expect(ijssOnly.employerComplementGrossTotal).toBe(0);
  });
});

describe("sick-leave carence IJSS", () => {
  const base = {
    monthlyGrossUsual: 2000,
    stopStartIso: "2026-09-01",
    employerComplementMode: "none" as const,
    seniorityYears: 0,
    employerEligibilityConfirmed: false,
    subrogation: "unknown" as const,
    ijssCarenceMode: "standard3Days" as const,
  };

  it("n'indemnise aucune IJSS sur 3 jours", () => {
    const result = calculateSickLeaveSalary({ ...base, stopEndIso: "2026-09-03" })!;
    expect(result.ijssCarenceDays).toBe(3);
    expect(result.ijssIndemnifiedDays).toBe(0);
    expect(result.ijssGrossTotal).toBe(0);
  });

  it("indemnise 1 jour au 4e jour", () => {
    const result = calculateSickLeaveSalary({ ...base, stopEndIso: "2026-09-04" })!;
    expect(result.ijssIndemnifiedDays).toBe(1);
    expect(result.ijssGrossTotal).toBe(32.87);
  });

  it("indemnise 4 jours sur 7 jours d'arrêt", () => {
    const result = calculateSickLeaveSalary({ ...base, stopEndIso: "2026-09-07" })!;
    expect(result.totalCalendarDays).toBe(7);
    expect(result.ijssIndemnifiedDays).toBe(4);
    expect(result.ijssGrossTotal).toBe(multiplyDailyByDays(32.87, 4));
  });

  it("neutralise la carence lorsqu'elle est levée", () => {
    const result = calculateSickLeaveSalary({
      ...base,
      stopEndIso: "2026-09-03",
      ijssCarenceMode: "waived",
    })!;
    expect(result.ijssCarenceDays).toBe(0);
    expect(result.ijssIndemnifiedDays).toBe(3);
  });
  it("reproduit 14 jours à 2 000 € : 11 × 32,87 = 361,57", () => {
    const result = calculateSickLeaveSalary({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      ijssCarenceMode: "standard3Days",
      employerComplementMode: "none",
      seniorityYears: 0,
      employerEligibilityConfirmed: false,
      subrogation: "unknown",
    })!;
    expect(result.dailyIjssGross).toBe(32.87);
    expect(result.ijssIndemnifiedDays).toBe(11);
    expect(result.ijssGrossTotal).toBe(361.57);
    expect(result.employerComplementGrossTotal).toBe(0);
    expect(result.ijssNetIndicativeTotal).toBe(computeIjssNetIndicative(361.57));
  });
});

describe("sick-leave complément employeur", () => {
  it("mappe les tranches d'ancienneté légales", () => {
    expect(getLegalMaintienSchedule(0)).toBeNull();
    expect(getLegalMaintienSchedule(0.9)).toBeNull();
    expect(getLegalMaintienSchedule(1)?.firstPeriodDays).toBe(30);
    expect(getLegalMaintienSchedule(1)?.secondPeriodDays).toBe(30);
    expect(getLegalMaintienSchedule(5)?.firstPeriodDays).toBe(30);
    expect(getLegalMaintienSchedule(5.9)?.firstPeriodDays).toBe(30);
    expect(getLegalMaintienSchedule(6)?.firstPeriodDays).toBe(40);
    expect(getLegalMaintienSchedule(6)?.secondPeriodDays).toBe(40);
    expect(getLegalMaintienSchedule(10)?.firstPeriodDays).toBe(40);
    expect(getLegalMaintienSchedule(11)?.firstPeriodDays).toBe(50);
    expect(getLegalMaintienSchedule(11)?.secondPeriodDays).toBe(50);
    expect(getLegalMaintienSchedule(16)?.firstPeriodDays).toBe(60);
    expect(getLegalMaintienSchedule(16)?.secondPeriodDays).toBe(60);
    expect(getLegalMaintienSchedule(21)?.firstPeriodDays).toBe(70);
    expect(getLegalMaintienSchedule(21)?.secondPeriodDays).toBe(70);
    expect(getLegalMaintienSchedule(26)?.firstPeriodDays).toBe(80);
    expect(getLegalMaintienSchedule(26)?.secondPeriodDays).toBe(80);
    expect(getLegalMaintienSchedule(30)?.firstPeriodDays).toBe(80);
    expect(getLegalMaintienSchedule(31)?.firstPeriodDays).toBe(90);
    expect(getLegalMaintienSchedule(31)?.secondPeriodDays).toBe(90);
    expect(getLegalMaintienSchedule(40)?.firstPeriodDays).toBe(90);
  });

  it("n'ouvre pas le complément avant le 8e jour", () => {
    const result = calculateSickLeaveSalary({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-01",
      stopEndIso: "2026-09-07",
      ijssCarenceMode: "standard3Days",
      employerComplementMode: "legalMinimum",
      seniorityYears: 3,
      employerEligibilityConfirmed: true,
      subrogation: "no",
    })!;
    expect(result.employerComplementGrossTotal).toBe(0);
    expect(result.employerComplementDays).toBe(0);
  });

  it("calcule un complément à partir du 8e jour et déduit les IJSS", () => {
    const result = calculateSickLeaveSalary({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-01",
      stopEndIso: "2026-09-15",
      ijssCarenceMode: "standard3Days",
      employerComplementMode: "legalMinimum",
      seniorityYears: 3,
      employerEligibilityConfirmed: true,
      subrogation: "no",
    })!;
    expect(result.employerCarenceDays).toBe(7);
    expect(result.employerComplementDays).toBe(8);
    expect(result.employerComplementGrossTotal).toBeGreaterThan(0);
    // Chaque jour : max(0, 90% × théorique − IJSS) > 0 pour 2000 €
    expect(result.estimatedIncomeForStop).toBe(
      truncateCent(result.ijssGrossTotal + result.employerComplementGrossTotal),
    );
  });

  it("refuse le complément légal sans confirmation d'éligibilité", () => {
    const result = calculateSickLeaveSalary({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-01",
      stopEndIso: "2026-09-15",
      ijssCarenceMode: "standard3Days",
      employerComplementMode: "legalMinimum",
      seniorityYears: 3,
      employerEligibilityConfirmed: false,
      subrogation: "no",
    })!;
    expect(result.employerComplementGrossTotal).toBe(0);
  });

  it("n'accorde aucun complément sous un an d'ancienneté", () => {
    const result = calculateSickLeaveSalary({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-01",
      stopEndIso: "2026-09-30",
      ijssCarenceMode: "standard3Days",
      employerComplementMode: "legalMinimum",
      seniorityYears: 0.5,
      employerEligibilityConfirmed: true,
      subrogation: "no",
    })!;
    expect(result.employerComplementGrossTotal).toBe(0);
  });

  it("réduit les droits déjà consommés", () => {
    const allocated = allocateEmployerMaintienDays(40, getLegalMaintienSchedule(3)!, 30, 0);
    expect(allocated.firstDays).toBe(0);
    expect(allocated.secondDays).toBe(30);
  });

  it("ne produit jamais un complément négatif", () => {
    const result = calculateSickLeaveSalary({
      monthlyGrossUsual: 1200,
      stopStartIso: "2026-09-01",
      stopEndIso: "2026-09-30",
      ijssCarenceMode: "standard3Days",
      employerComplementMode: "legalMinimum",
      seniorityYears: 3,
      employerEligibilityConfirmed: true,
      subrogation: "no",
    })!;
    expect(result.employerComplementGrossTotal).toBeGreaterThanOrEqual(0);
  });
});

describe("sick-leave subrogation et totaux", () => {
  it("conserve le même total avec ou sans subrogation", () => {
    const shared = {
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-01",
      stopEndIso: "2026-09-15",
      ijssCarenceMode: "standard3Days" as const,
      employerComplementMode: "legalMinimum" as const,
      seniorityYears: 4,
      employerEligibilityConfirmed: true,
    };
    const withSub = calculateSickLeaveSalary({ ...shared, subrogation: "yes" })!;
    const without = calculateSickLeaveSalary({ ...shared, subrogation: "no" })!;
    expect(withSub.estimatedIncomeForStop).toBe(without.estimatedIncomeForStop);
    expect(withSub.payerLabel).not.toBe(without.payerLabel);
  });
});

describe("sick-leave scénarios de référence", () => {
  it("calcule le cas 2 000 € sur 14 jours avec confirmation", () => {
    const result = calculateSickLeaveSalary({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      ijssCarenceMode: "standard3Days",
      employerComplementMode: "legalMinimum",
      seniorityYears: 3,
      employerEligibilityConfirmed: true,
      subrogation: "yes",
    })!;
    expect(result.totalCalendarDays).toBe(14);
    expect(result.dailyIjssGross).toBe(32.87);
    expect(result.ijssIndemnifiedDays).toBe(11);
    expect(result.ijssGrossTotal).toBe(361.57);
    expect(result.employerComplementDays).toBe(7);
    expect(result.employerComplementGrossTotal).toBe(184.16);
    expect(result.estimatedIncomeForStop).toBe(
      truncateCent(result.ijssGrossTotal + result.employerComplementGrossTotal),
    );
  });

  it("ne calcule pas le complément légal tant que l'éligibilité n'est pas confirmée", () => {
    const unconfirmed = calculateSickLeaveSalary({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      ijssCarenceMode: "standard3Days",
      employerComplementMode: "legalMinimum",
      seniorityYears: 3,
      employerEligibilityConfirmed: false,
      subrogation: "no",
    })!;
    expect(unconfirmed.employerComplementGrossTotal).toBe(0);
    expect(unconfirmed.alerts.some((a) => a.code === "eligibility-unconfirmed")).toBe(true);
  });

  it("ignore la confirmation hors mode minimum légal", () => {
    const none = calculateSickLeaveSalary({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      ijssCarenceMode: "standard3Days",
      employerComplementMode: "none",
      seniorityYears: 3,
      employerEligibilityConfirmed: true,
      subrogation: "no",
    })!;
    expect(none.employerComplementGrossTotal).toBe(0);

    const custom = calculateSickLeaveSalary({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      ijssCarenceMode: "standard3Days",
      employerComplementMode: "customAmount",
      seniorityYears: 3,
      employerEligibilityConfirmed: false,
      customEmployerComplementGross: 250,
      subrogation: "no",
    })!;
    expect(custom.employerComplementGrossTotal).toBe(250);
  });

  it("couvre 31 jours, plafond et arrêt long sur deux tranches", () => {
    const d31 = calculateSickLeaveSalary({
      monthlyGrossUsual: 2500,
      stopStartIso: "2026-09-01",
      stopEndIso: "2026-10-01",
      ijssCarenceMode: "standard3Days",
      employerComplementMode: "legalMinimum",
      seniorityYears: 3,
      employerEligibilityConfirmed: true,
      subrogation: "unknown",
    })!;
    expect(d31.totalCalendarDays).toBe(31);
    expect(d31.employerComplementDays).toBe(24);

    const capped = calculateSickLeaveSalary({
      monthlyGrossUsual: 4000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      ijssCarenceMode: "standard3Days",
      employerComplementMode: "legalMinimum",
      seniorityYears: 3,
      employerEligibilityConfirmed: true,
      subrogation: "no",
    })!;
    expect(capped.dailyIjssGross).toBe(42.96);

    const longStop = calculateSickLeaveSalary({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-01",
      stopEndIso: "2026-11-30",
      ijssCarenceMode: "standard3Days",
      employerComplementMode: "legalMinimum",
      seniorityYears: 12,
      employerEligibilityConfirmed: true,
      subrogation: "yes",
    })!;
    expect(longStop.totalCalendarDays).toBe(91);
    expect(longStop.employerComplementDays).toBe(84);
  });
});

describe("maintien légal employeur (primitives partagées)", () => {
  const dailyIjss2000 = calculateSickLeaveSalary({
    monthlyGrossUsual: 2000,
    stopStartIso: "2026-09-07",
    stopEndIso: "2026-09-20",
    ijssCarenceMode: "standard3Days",
    employerComplementMode: "none",
    seniorityYears: 0,
    employerEligibilityConfirmed: false,
    subrogation: "unknown",
  })!.dailyIjssGross;

  it("compte exactement un an d'ancienneté à la date anniversaire", () => {
    expect(computeCompletedSeniorityYears("2025-09-07", "2026-09-07")).toBe(1);
    expect(computeCompletedSeniorityYears("2025-09-08", "2026-09-07")).toBe(0);
    expect(computeCompletedSeniorityYears("2020-09-07", "2026-09-07")).toBe(6);
    expect(computeCompletedSeniorityYears("2026-09-08", "2026-09-07")).toBeNull();
  });

  it("refuse une date de fin antérieure au début et les valeurs non numériques", () => {
    expect(
      computeLegalEmployerComplement({
        monthlyGrossUsual: 2000,
        stopStartIso: "2026-09-20",
        stopEndIso: "2026-09-07",
        seniorityYears: 3,
        eligibilityConfirmed: true,
        dailyIjssGross: dailyIjss2000,
      }),
    ).toBeNull();
    expect(
      computeLegalEmployerComplement({
        monthlyGrossUsual: Number.NaN,
        stopStartIso: "2026-09-07",
        stopEndIso: "2026-09-20",
        seniorityYears: 3,
        eligibilityConfirmed: true,
        dailyIjssGross: dailyIjss2000,
      }),
    ).toBeNull();
    expect(
      computeLegalEmployerComplement({
        monthlyGrossUsual: -10,
        stopStartIso: "2026-09-07",
        stopEndIso: "2026-09-20",
        seniorityYears: 3,
        eligibilityConfirmed: true,
        dailyIjssGross: dailyIjss2000,
      }),
    ).toBeNull();
    expect(
      computeLegalEmployerComplement({
        monthlyGrossUsual: 2000,
        stopStartIso: "2026-09-07",
        stopEndIso: "2026-09-20",
        seniorityYears: 3,
        eligibilityConfirmed: true,
        dailyIjssGross: -1,
      }),
    ).toBeNull();
  });

  it("n'ouvre aucun complément légal sous un an, même avec confirmation", () => {
    const result = computeLegalEmployerComplement({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      seniorityYears: 0,
      eligibilityConfirmed: true,
      dailyIjssGross: dailyIjss2000,
    })!;
    expect(result.eligibleApparent).toBe(false);
    expect(result.employerComplementGrossTotal).toBe(0);
    expect(result.employerComplementDays).toBe(0);
    expect(result.schedule).toBeNull();
  });

  it("ouvre le barème 30 + 30 dès exactement un an", () => {
    const result = computeLegalEmployerComplement({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      seniorityYears: 1,
      eligibilityConfirmed: true,
      dailyIjssGross: dailyIjss2000,
    })!;
    expect(result.schedule?.firstPeriodDays).toBe(30);
    expect(result.schedule?.secondPeriodDays).toBe(30);
    expect(result.employerComplementDays).toBe(7);
    expect(result.firstComplementDateIso).toBe("2026-09-14");
  });

  it("démarre au huitième jour et laisse 7 jours sans complément", () => {
    const seven = computeLegalEmployerComplement({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-13",
      seniorityYears: 3,
      eligibilityConfirmed: true,
      dailyIjssGross: dailyIjss2000,
    })!;
    expect(seven.totalCalendarDays).toBe(7);
    expect(seven.employerComplementDays).toBe(0);
    expect(seven.employerComplementGrossTotal).toBe(0);
    expect(seven.firstComplementDateIso).toBeNull();
    expect(seven.uncoveredDays).toBe(7);

    const eight = computeLegalEmployerComplement({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-14",
      seniorityYears: 3,
      eligibilityConfirmed: true,
      dailyIjssGross: dailyIjss2000,
    })!;
    expect(eight.totalCalendarDays).toBe(8);
    expect(eight.employerComplementDays).toBe(1);
    expect(eight.firstComplementDateIso).toBe("2026-09-14");
    expect(eight.firstDaysCovered).toBe(1);
  });

  it("traverse la tranche à 90 % puis celle aux deux tiers", () => {
    const result = computeLegalEmployerComplement({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-01",
      stopEndIso: "2026-10-15",
      seniorityYears: 3,
      eligibilityConfirmed: true,
      dailyIjssGross: dailyIjss2000,
    })!;
    expect(result.totalCalendarDays).toBe(45);
    expect(result.firstDaysCovered).toBe(30);
    expect(result.secondDaysCovered).toBe(8);
    expect(result.employerComplementDays).toBe(38);
    expect(result.uncoveredCarenceDays).toBe(7);
    expect(result.firstPeriodComplementGross).toBeGreaterThan(
      result.secondPeriodComplementGross,
    );
  });

  it("déduit les IJSS et ne produit jamais un complément négatif", () => {
    const withIjss = computeLegalEmployerComplement({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      seniorityYears: 3,
      eligibilityConfirmed: true,
      dailyIjssGross: dailyIjss2000,
    })!;
    const withoutIjss = computeLegalEmployerComplement({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      seniorityYears: 3,
      eligibilityConfirmed: true,
      dailyIjssGross: 0,
    })!;
    expect(withIjss.employerComplementGrossTotal).toBeLessThan(
      withoutIjss.employerComplementGrossTotal,
    );
    const highIjss = computeLegalEmployerComplement({
      monthlyGrossUsual: 1200,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      seniorityYears: 3,
      eligibilityConfirmed: true,
      dailyIjssGross: 200,
    })!;
    expect(highIjss.employerComplementGrossTotal).toBe(0);
  });

  it("déduit la part de prévoyance financée par l'employeur", () => {
    const base = computeLegalEmployerComplement({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      seniorityYears: 3,
      eligibilityConfirmed: true,
      dailyIjssGross: dailyIjss2000,
    })!;
    const withPrev = computeLegalEmployerComplement({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      seniorityYears: 3,
      eligibilityConfirmed: true,
      dailyIjssGross: dailyIjss2000,
      employerPrevoyanceDailyGross: 5,
    })!;
    expect(withPrev.employerComplementGrossTotal).toBeLessThan(
      base.employerComplementGrossTotal,
    );
    expect(withPrev.prevoyanceDeductedOnCoveredDaysGross).toBe(35);
    expect(withPrev.alerts.some((alert) => alert.code === "prevoyance-deducted")).toBe(
      true,
    );
  });

  it("réduit les droits déjà consommés et signale une période épuisée", () => {
    const reduced = computeLegalEmployerComplement({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      seniorityYears: 3,
      eligibilityConfirmed: true,
      dailyIjssGross: dailyIjss2000,
      daysAlreadyUsedFirstPeriod: 30,
      daysAlreadyUsedSecondPeriod: 0,
    })!;
    expect(reduced.firstDaysCovered).toBe(0);
    expect(reduced.secondDaysCovered).toBe(7);
    expect(reduced.remainingFirstDaysBeforeStop).toBe(0);

    const exhausted = computeLegalEmployerComplement({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      seniorityYears: 3,
      eligibilityConfirmed: true,
      dailyIjssGross: dailyIjss2000,
      daysAlreadyUsedFirstPeriod: 30,
      daysAlreadyUsedSecondPeriod: 30,
    })!;
    expect(exhausted.employerComplementDays).toBe(0);
    expect(exhausted.employerComplementGrossTotal).toBe(0);
    expect(exhausted.uncoveredAfterRightsDays).toBe(7);
    expect(exhausted.alerts.some((alert) => alert.code === "rights-exhausted")).toBe(
      true,
    );
  });

  it("reproduit 2 000 € sur 14 jours : 184,16 € de complément après 7 jours de délai", () => {
    const result = computeLegalEmployerComplement({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      seniorityYears: 3,
      eligibilityConfirmed: true,
      dailyIjssGross: dailyIjss2000,
    })!;
    expect(result.totalCalendarDays).toBe(14);
    expect(result.dailyIjssGross).toBe(32.87);
    expect(result.employerComplementDays).toBe(7);
    expect(result.uncoveredDays).toBe(7);
    expect(result.uncoveredCarenceDays).toBe(7);
    expect(result.employerComplementGrossTotal).toBe(184.16);
    expect(result.theoreticalDailyGross).toBe(65.75);
    expect(result.firstPeriodTargetDaily).toBe(59.17);
    expect(result.dailyIjssGross).toBe(32.87);
    expect(result.firstPeriodTargetDailyExact).toBeGreaterThan(result.firstPeriodTargetDaily);
    expect(
      finalizeMaintienTotal(
        dailyLegalComplement(
          result.firstPeriodTargetDaily,
          result.dailyIjssGross,
          0,
        ) * result.employerComplementDays,
      ),
    ).toBe(184.1);
    expect(
      finalizeMaintienTotal(
        result.firstPeriodDailyComplementExact * result.employerComplementDays,
      ),
    ).toBe(184.16);
    expect(result.detailLines.some((line) => line.includes("convention d'estimation"))).toBe(
      true,
    );
    expect(result.detailLines.some((line) => line.includes("arrondi au centime le plus proche"))).toBe(
      true,
    );
    expect(result.detailLines.join(" ")).toContain("14 septembre 2026");
    expect(result.detailLines.join(" ")).not.toContain("an(s)");
    expect(result.detailLines.join(" ")).not.toContain("jour(s)");
  });

  it("conserve le même complément de 14 jours aux seuils d'ancienneté 1, 6, 11, 16, 21, 26 et 31 ans", () => {
    for (const seniorityYears of [1, 6, 11, 16, 21, 26, 31]) {
      const result = computeLegalEmployerComplement({
        monthlyGrossUsual: 2000,
        stopStartIso: "2026-09-07",
        stopEndIso: "2026-09-20",
        seniorityYears,
        eligibilityConfirmed: true,
        dailyIjssGross: dailyIjss2000,
      })!;
      expect(result.employerComplementDays, `${seniorityYears} ans`).toBe(7);
      expect(result.employerComplementGrossTotal, `${seniorityYears} ans`).toBe(184.16);
      expect(result.firstDaysCovered, `${seniorityYears} ans`).toBe(7);
      expect(result.secondDaysCovered, `${seniorityYears} ans`).toBe(0);
    }
  });

  it("reste cohérent avec le simulateur de revenu total", () => {
    const full = calculateSickLeaveSalary({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      ijssCarenceMode: "standard3Days",
      employerComplementMode: "legalMinimum",
      seniorityYears: 3,
      employerEligibilityConfirmed: true,
      subrogation: "yes",
    })!;
    const legal = computeLegalEmployerComplement({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      seniorityYears: 3,
      eligibilityConfirmed: true,
      dailyIjssGross: full.dailyIjssGross,
    })!;
    expect(legal.employerComplementGrossTotal).toBe(full.employerComplementGrossTotal);
    expect(legal.employerComplementDays).toBe(full.employerComplementDays);
    expect(legal.employerCarenceDays).toBe(full.employerCarenceDays);
  });
});
