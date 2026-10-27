import { describe, expect, it } from "vitest";
import {
  computeDualCounters,
  computePeriodBalance,
  computeSimpleBalance,
  countCompleteMonthsElapsed,
  estimateAcquisition,
  estimatePeriodAcquisition,
  formatDateFr,
  formatDateLongFr,
  formatDaysFr,
  localTodayIso,
  classifyOpeningBalance,
  computePayslipBalance,
  computePayslipCounterRemaining,
  OUVRES_PARTIAL_MESSAGE,
  OUVRES_YEARLY_EQUIVALENCE,
  parseDayInput,
  parseIsoDate,
  parseOptionalDayInput,
  resolveReferencePeriod,
} from "./engine";

describe("computeSimpleBalance", () => {
  it("calcule 20 acquis − 8 pris = 12", () => {
    expect(computeSimpleBalance({ acquired: 20, taken: 8 }).remaining).toBe(12);
  });

  it("ajoute des reports non déjà inclus : 20 − 8 + 2 = 14", () => {
    expect(
      computeSimpleBalance({ acquired: 20, taken: 8, carriedOver: 2 }).remaining,
    ).toBe(14);
  });

  it("conserve un solde négatif (anticipation)", () => {
    expect(computeSimpleBalance({ acquired: 10, taken: 12 }).remaining).toBe(-2);
  });

  it("accepte un solde nul explicite", () => {
    expect(computeSimpleBalance({ acquired: 0, taken: 0 }).remaining).toBe(0);
  });

  it("applique des ajustements signés", () => {
    expect(
      computeSimpleBalance({
        acquired: 20,
        taken: 8,
        adjustments: -1,
      }).remaining,
    ).toBe(11);
  });

  it("n'ajoute pas de report déjà inclus dans acquis (saisie utilisateur)", () => {
    expect(computeSimpleBalance({ acquired: 22, taken: 8 }).remaining).toBe(14);
    expect(
      computeSimpleBalance({ acquired: 20, taken: 8, carriedOver: 2 }).remaining,
    ).toBe(14);
  });

  it("gère les décimales", () => {
    expect(
      computeSimpleBalance({ acquired: 12.5, taken: 3.5, carriedOver: 1 }).remaining,
    ).toBe(10);
  });
});

describe("computeDualCounters", () => {
  it("calcule N-1 et N séparément puis le total arithmétique", () => {
    const result = computeDualCounters({
      nMinus1: { opening: 10, taken: 4 },
      n: { opening: 15, taken: 2, adjustments: 1 },
    });
    expect(result.nMinus1Remaining).toBe(6);
    expect(result.nRemaining).toBe(14);
    expect(result.arithmeticTotal).toBe(20);
  });

  it("autorise un compteur N négatif (anticipation)", () => {
    const result = computeDualCounters({
      nMinus1: { opening: 5, taken: 5 },
      n: { opening: 2, taken: 5 },
    });
    expect(result.nMinus1Remaining).toBe(0);
    expect(result.nRemaining).toBe(-3);
    expect(result.arithmeticTotal).toBe(-3);
  });
});

const emptyPayslipCounter = {
  absent: false,
  mode: "acquired-taken" as const,
  acquired: "",
  taken: "",
  remaining: "",
  adjAcquired: "",
  adjRemaining: "",
};

describe("computePayslipBalance", () => {
  it("A : acquis et pris → N-1 8, N 13, total 21", () => {
    const result = computePayslipBalance(
      {
        ...emptyPayslipCounter,
        acquired: "30",
        taken: "22",
      },
      {
        ...emptyPayslipCounter,
        acquired: "15",
        taken: "2",
      },
    );
    expect(result.kind).toBe("ready");
    if (result.kind === "ready") {
      expect(result.nMinus1?.remaining).toBe(8);
      expect(result.n?.remaining).toBe(13);
      expect(result.total).toBe(21);
      expect(result.both).toBe(true);
    }
  });

  it("B : soldes directs → total 21 sans nouvelle déduction", () => {
    const result = computePayslipBalance(
      {
        ...emptyPayslipCounter,
        mode: "remaining",
        remaining: "8",
      },
      {
        ...emptyPayslipCounter,
        mode: "remaining",
        remaining: "13",
      },
    );
    expect(result.kind).toBe("ready");
    if (result.kind === "ready") {
      expect(result.total).toBe(21);
      expect(result.nMinus1?.mode).toBe("remaining");
      expect(result.n?.mode).toBe("remaining");
    }
  });

  it("C : saisie mixte solde + acquis/pris → 21", () => {
    const result = computePayslipBalance(
      {
        ...emptyPayslipCounter,
        mode: "remaining",
        remaining: "8",
        taken: "99",
      },
      {
        ...emptyPayslipCounter,
        acquired: "15",
        taken: "2",
      },
    );
    expect(result.kind).toBe("ready");
    if (result.kind === "ready") {
      expect(result.total).toBe(21);
    }
  });

  it("D : jours pris masqués ne sont pas soustraits du solde direct", () => {
    expect(
      computePayslipCounterRemaining({
        mode: "remaining",
        remaining: 8,
      }),
    ).toBe(8);
    const result = computePayslipBalance(
      {
        ...emptyPayslipCounter,
        mode: "remaining",
        remaining: "8",
        taken: "5",
        acquired: "30",
      },
      { ...emptyPayslipCounter, absent: true },
    );
    expect(result.kind).toBe("ready");
    if (result.kind === "ready") {
      expect(result.total).toBe(8);
      expect(result.sole).toBe("nMinus1");
    }
  });

  it("E : correction liée au parcours solde seulement", () => {
    const result = computePayslipBalance(
      {
        ...emptyPayslipCounter,
        mode: "remaining",
        remaining: "8",
        adjRemaining: "-1",
        adjAcquired: "50",
      },
      { ...emptyPayslipCounter, absent: true },
    );
    expect(result.kind).toBe("ready");
    if (result.kind === "ready") {
      expect(result.total).toBe(7);
      expect(result.nMinus1?.adjustments).toBe(-1);
    }
  });

  it("F : zéro saisi valide, vide manquant", () => {
    const withZero = computePayslipBalance(
      {
        ...emptyPayslipCounter,
        acquired: "0",
        taken: "0",
      },
      { ...emptyPayslipCounter, absent: true },
    );
    expect(withZero.kind).toBe("ready");
    if (withZero.kind === "ready") {
      expect(withZero.total).toBe(0);
    }

    const incomplete = computePayslipBalance(
      {
        ...emptyPayslipCounter,
        acquired: "10",
        taken: "",
      },
      { ...emptyPayslipCounter, absent: true },
    );
    expect(incomplete.kind).toBe("error");
  });

  it("G : compteur incomplet → pas de somme partielle", () => {
    const result = computePayslipBalance(
      {
        ...emptyPayslipCounter,
        acquired: "30",
        taken: "22",
      },
      {
        ...emptyPayslipCounter,
        acquired: "15",
        taken: "",
      },
    );
    expect(result.kind).toBe("error");
  });

  it("H : compteur absent → résultat limité", () => {
    const result = computePayslipBalance(
      {
        ...emptyPayslipCounter,
        acquired: "30",
        taken: "22",
      },
      { ...emptyPayslipCounter, absent: true },
    );
    expect(result.kind).toBe("ready");
    if (result.kind === "ready") {
      expect(result.both).toBe(false);
      expect(result.sole).toBe("nMinus1");
      expect(result.total).toBe(8);
      expect(result.n).toBeNull();
    }
  });

  it("I : négatifs et décimales conservés", () => {
    const result = computePayslipBalance(
      {
        ...emptyPayslipCounter,
        mode: "remaining",
        remaining: "-2,5",
      },
      {
        ...emptyPayslipCounter,
        acquired: "12,5",
        taken: "1",
      },
    );
    expect(result.kind).toBe("ready");
    if (result.kind === "ready") {
      expect(result.nMinus1?.remaining).toBe(-2.5);
      expect(result.n?.remaining).toBe(11.5);
      expect(result.total).toBe(9);
    }
  });

  it("aucun compteur exploitable → empty", () => {
    expect(
      computePayslipBalance(
        { ...emptyPayslipCounter, absent: true },
        { ...emptyPayslipCounter, absent: true },
      ).kind,
    ).toBe("empty");
    expect(
      computePayslipBalance(emptyPayslipCounter, emptyPayslipCounter).kind,
    ).toBe("empty");
  });

  it("changement de parcours : champs de l'autre mode ne font pas un vide silencieux", () => {
    const result = computePayslipBalance(
      {
        ...emptyPayslipCounter,
        mode: "remaining",
        remaining: "",
        acquired: "30",
        taken: "22",
      },
      {
        ...emptyPayslipCounter,
        acquired: "15",
        taken: "2",
      },
    );
    expect(result.kind).toBe("error");
    if (result.kind === "error") {
      expect(result.message).toContain("solde restant");
    }
  });
});

describe("parseDayInput", () => {
  it("accepte virgule et point", () => {
    expect(parseDayInput("12,5")).toEqual({ ok: true, value: 12.5 });
    expect(parseDayInput("8")).toEqual({ ok: true, value: 8 });
  });

  it("signale vide et invalide", () => {
    expect(parseDayInput("")).toEqual({ ok: false, reason: "empty" });
    expect(parseDayInput("abc")).toEqual({ ok: false, reason: "invalid" });
  });

  it("accepte 0 comme valeur valide", () => {
    expect(parseDayInput("0")).toEqual({ ok: true, value: 0 });
    expect(parseDayInput("0,0")).toEqual({ ok: true, value: 0 });
  });

  it("parseOptional traite le vide comme 0", () => {
    expect(parseOptionalDayInput("")).toEqual({ ok: true, value: 0 });
    expect(parseOptionalDayInput("-2")).toEqual({ ok: true, value: -2 });
  });
});

describe("classifyOpeningBalance", () => {
  it("distingue vide, 0 valide et invalide", () => {
    expect(classifyOpeningBalance("")).toEqual({ status: "empty" });
    expect(classifyOpeningBalance("   ")).toEqual({ status: "empty" });
    expect(classifyOpeningBalance("0")).toEqual({ status: "ready", value: 0 });
    expect(classifyOpeningBalance("5")).toEqual({ status: "ready", value: 5 });
    expect(classifyOpeningBalance("abc")).toEqual({ status: "invalid" });
  });
});

describe("estimateAcquisition", () => {
  it("estime 5 mois ouvrables avec arrondi L3141-7 : 12,5 → 13", () => {
    const result = estimateAcquisition({ months: 5, unit: "ouvrables" });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.rawDays).toBe(12.5);
      expect(result.estimatedDays).toBe(13);
    }
  });

  it("plafonne à 30 jours ouvrables pour 12 mois", () => {
    const result = estimateAcquisition({ months: 12, unit: "ouvrables" });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.estimatedDays).toBe(30);
      expect(result.capped).toBe(false);
    }
  });

  it("n'arrondit pas mois par mois (8 mois = 20, pas 24)", () => {
    const result = estimateAcquisition({ months: 8, unit: "ouvrables" });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.estimatedDays).toBe(20);
    }
  });

  it("refuse l'équivalence ouvrés hors année complète", () => {
    const result = estimateAcquisition({ months: 6, unit: "ouvres" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("ouvres-partial");
      expect(result.message).toBe(OUVRES_PARTIAL_MESSAGE);
      expect(result.message).not.toMatch(/ouvrables/i);
    }
  });

  it("propose 25 jours ouvrés pour 12 mois", () => {
    const result = estimateAcquisition({ months: 12, unit: "ouvres" });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.estimatedDays).toBe(OUVRES_YEARLY_EQUIVALENCE);
      expect(result.unit).toBe("ouvres");
    }
  });

  it("rejette des mois invalides", () => {
    expect(estimateAcquisition({ months: 13, unit: "ouvrables" }).ok).toBe(false);
    expect(estimateAcquisition({ months: 2.5, unit: "ouvrables" }).ok).toBe(false);
  });
});

describe("dates et périodes", () => {
  it("parse et formate des dates ISO locales", () => {
    expect(parseIsoDate("2026-12-01")).toEqual({ year: 2026, month: 12, day: 1 });
    expect(parseIsoDate("2026-02-30")).toBeNull();
    expect(formatDateFr({ year: 2026, month: 6, day: 1 })).toBe("01/06/2026");
    expect(formatDateLongFr({ year: 2026, month: 6, day: 1 })).toBe("1er juin 2026");
    expect(formatDateLongFr({ year: 2026, month: 10, day: 26 })).toBe(
      "26 octobre 2026",
    );
  });

  it("localTodayIso suit le calendrier local (pas UTC)", () => {
    const iso = localTodayIso(new Date(2027, 5, 15, 23, 30, 0));
    expect(iso).toBe("2027-06-15");
  });

  it("résout la période 1er juin → 31 mai selon la date", () => {
    const mid = resolveReferencePeriod(
      { year: 2026, month: 12, day: 1 },
      "june-may",
    );
    expect(mid.ok).toBe(true);
    if (mid.ok) {
      expect(mid.period.start).toEqual({ year: 2026, month: 6, day: 1 });
      expect(mid.period.end).toEqual({ year: 2027, month: 5, day: 31 });
    }

    const beforeJune = resolveReferencePeriod(
      { year: 2026, month: 5, day: 15 },
      "june-may",
    );
    expect(beforeJune.ok).toBe(true);
    if (beforeJune.ok) {
      expect(beforeJune.period.start).toEqual({ year: 2025, month: 6, day: 1 });
      expect(beforeJune.period.end).toEqual({ year: 2026, month: 5, day: 31 });
    }
  });

  it("résout la période calendaire et une période personnalisée", () => {
    const cal = resolveReferencePeriod(
      { year: 2028, month: 3, day: 10 },
      "calendar",
    );
    expect(cal.ok).toBe(true);
    if (cal.ok) {
      expect(cal.period.start).toEqual({ year: 2028, month: 1, day: 1 });
      expect(cal.period.end).toEqual({ year: 2028, month: 12, day: 31 });
    }

    const custom = resolveReferencePeriod(
      { year: 2026, month: 8, day: 1 },
      "custom",
      { day: 1, month: 4 },
    );
    expect(custom.ok).toBe(true);
    if (custom.ok) {
      expect(custom.period.start).toEqual({ year: 2026, month: 4, day: 1 });
      expect(custom.period.end).toEqual({ year: 2027, month: 3, day: 31 });
    }
  });

  it("compte les mois civils complets sans durée fixe de 30 jours", () => {
    expect(
      countCompleteMonthsElapsed(
        { year: 2026, month: 6, day: 1 },
        { year: 2026, month: 12, day: 1 },
      ),
    ).toBe(6);
    expect(
      countCompleteMonthsElapsed(
        { year: 2026, month: 6, day: 1 },
        { year: 2026, month: 11, day: 30 },
      ),
    ).toBe(5);
    expect(
      countCompleteMonthsElapsed(
        { year: 2026, month: 6, day: 1 },
        { year: 2026, month: 6, day: 1 },
      ),
    ).toBe(0);
  });

  it("gère une année bissextile dans une période personnalisée", () => {
    const leap = resolveReferencePeriod(
      { year: 2024, month: 3, day: 1 },
      "custom",
      { day: 29, month: 2 },
    );
    expect(leap.ok).toBe(true);
    if (leap.ok) {
      expect(leap.period.start).toEqual({ year: 2024, month: 2, day: 29 });
      expect(leap.period.end).toEqual({ year: 2025, month: 2, day: 28 });
    }
  });
});

describe("estimatePeriodAcquisition", () => {
  it("estime 6 mois au 1er décembre (juin → mai)", () => {
    const result = estimatePeriodAcquisition({
      periodKind: "june-may",
      asOfIso: "2026-12-01",
      unit: "ouvrables",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.completeMonths).toBe(6);
      expect(result.acquisition.estimatedDays).toBe(15);
      expect(result.period.start).toEqual({ year: 2026, month: 6, day: 1 });
    }
  });

  it("estime une année complète à la fin de période (30 jours)", () => {
    const result = estimatePeriodAcquisition({
      periodKind: "june-may",
      asOfIso: "2027-05-31",
      unit: "ouvrables",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.completeMonths).toBe(12);
      expect(result.acquisition.estimatedDays).toBe(30);
    }
  });

  it("donne 0 mois au premier jour de la période", () => {
    const result = estimatePeriodAcquisition({
      periodKind: "june-may",
      asOfIso: "2026-06-01",
      unit: "ouvrables",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.completeMonths).toBe(0);
      expect(result.acquisition.estimatedDays).toBe(0);
    }
  });

  it("passe au nouvel exercice au 1er juin", () => {
    const result = estimatePeriodAcquisition({
      periodKind: "june-may",
      asOfIso: "2027-06-01",
      unit: "ouvrables",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.period.start).toEqual({ year: 2027, month: 6, day: 1 });
      expect(result.completeMonths).toBe(0);
    }
  });

  it("fonctionne en année calendaire et en période personnalisée", () => {
    const cal = estimatePeriodAcquisition({
      periodKind: "calendar",
      asOfIso: "2026-07-01",
      unit: "ouvrables",
    });
    expect(cal.ok).toBe(true);
    if (cal.ok) {
      expect(cal.completeMonths).toBe(6);
      expect(cal.acquisition.estimatedDays).toBe(15);
    }

    const custom = estimatePeriodAcquisition({
      periodKind: "custom",
      customStart: { day: 1, month: 4 },
      asOfIso: "2026-10-01",
      unit: "ouvrables",
    });
    expect(custom.ok).toBe(true);
    if (custom.ok) {
      expect(custom.completeMonths).toBe(6);
    }
  });

  it("n'exige pas de date d'embauche pour un salarié présent depuis des années", () => {
    const result = estimatePeriodAcquisition({
      periodKind: "june-may",
      asOfIso: "2026-12-01",
      unit: "ouvrables",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.acquisitionStart).toEqual({ year: 2026, month: 6, day: 1 });
    }
  });

  it("prend en compte une embauche en cours de période", () => {
    const result = estimatePeriodAcquisition({
      periodKind: "june-may",
      asOfIso: "2026-12-01",
      unit: "ouvrables",
      hireIso: "2026-09-01",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.completeMonths).toBe(3);
      expect(result.acquisition.estimatedDays).toBe(8); // 7,5 → 8
    }
  });

  it("refuse l'équivalence ouvrés sur période partielle", () => {
    const result = estimatePeriodAcquisition({
      periodKind: "june-may",
      asOfIso: "2026-12-01",
      unit: "ouvres",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("ouvres-partial");
      expect(result.message).toBe(OUVRES_PARTIAL_MESSAGE);
    }
  });

  it("refuse ouvrés au 26 octobre 2026 sur juin–mai (moins de 12 mois)", () => {
    const result = estimatePeriodAcquisition({
      periodKind: "june-may",
      asOfIso: "2026-10-26",
      unit: "ouvres",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("ouvres-partial");
      expect(result.message).toBe(OUVRES_PARTIAL_MESSAGE);
    }
    // Même période en ouvrables : estimation disponible (4 mois → 10)
    const ouvrables = estimatePeriodAcquisition({
      periodKind: "june-may",
      asOfIso: "2026-10-26",
      unit: "ouvrables",
    });
    expect(ouvrables.ok).toBe(true);
    if (ouvrables.ok) {
      expect(ouvrables.completeMonths).toBe(4);
      expect(ouvrables.acquisition.estimatedDays).toBe(10);
      expect(ouvrables.acquisition.unit).toBe("ouvrables");
    }
  });

  it("propose 25 jours ouvrés en fin d'année complète", () => {
    const result = estimatePeriodAcquisition({
      periodKind: "june-may",
      asOfIso: "2027-05-31",
      unit: "ouvres",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.completeMonths).toBe(12);
      expect(result.acquisition.estimatedDays).toBe(OUVRES_YEARLY_EQUIVALENCE);
      expect(result.acquisition.unit).toBe("ouvres");
    }
  });

  it("refuse ouvrés si embauche en cours de période même en fin d'année", () => {
    const result = estimatePeriodAcquisition({
      periodKind: "june-may",
      asOfIso: "2027-05-31",
      unit: "ouvres",
      hireIso: "2026-09-01",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("ouvres-partial");
    }
  });

  it("accepte une date future et une date passée", () => {
    const future = estimatePeriodAcquisition({
      periodKind: "calendar",
      asOfIso: "2030-06-01",
      unit: "ouvrables",
    });
    expect(future.ok).toBe(true);
    if (future.ok) expect(future.completeMonths).toBe(5);

    const past = estimatePeriodAcquisition({
      periodKind: "calendar",
      asOfIso: "2020-03-01",
      unit: "ouvrables",
    });
    expect(past.ok).toBe(true);
    if (past.ok) expect(past.completeMonths).toBe(2);
  });
});

describe("computePeriodBalance", () => {
  const acquisition = estimatePeriodAcquisition({
    periodKind: "june-may",
    asOfIso: "2026-12-01",
    unit: "ouvrables",
  });

  it("affiche seulement les acquis si les droits antérieurs sont inconnus", () => {
    expect(acquisition.ok).toBe(true);
    if (!acquisition.ok) return;
    const result = computePeriodBalance({
      acquisition,
      priorRightsStatus: "unknown",
    });
    expect(result.kind).toBe("acquired-only");
    if (result.kind === "acquired-only") {
      expect(result.acquiredCurrent).toBe(15);
    }
  });

  it("calcule un solde restant lorsque les droits antérieurs sont connus", () => {
    if (!acquisition.ok) return;
    const result = computePeriodBalance({
      acquisition,
      priorRightsStatus: "known",
      priorAvailable: 10,
      takenPrior: 4,
      takenCurrent: 2,
      carriedOver: 1,
      adjustments: -1,
    });
    expect(result.kind).toBe("remaining");
    if (result.kind === "remaining") {
      // 10 + 15 + 1 - 1 - 4 - 2 = 19
      expect(result.remaining).toBe(19);
      expect(result.acquiredCurrent).toBe(15);
    }
  });

  it("applique solde de départ + acquis − pris (ex. 5 + 10 − 2 − 1 = 12)", () => {
    const acquisitionFixed = estimatePeriodAcquisition({
      periodKind: "june-may",
      asOfIso: "2026-10-25",
      unit: "ouvrables",
    });
    expect(acquisitionFixed.ok).toBe(true);
    if (!acquisitionFixed.ok) return;
    expect(acquisitionFixed.completeMonths).toBe(4);
    expect(acquisitionFixed.acquisition.estimatedDays).toBe(10);

    const result = computePeriodBalance({
      acquisition: acquisitionFixed,
      priorRightsStatus: "known",
      priorAvailable: 5,
      takenPrior: 2,
      takenCurrent: 1,
    });
    expect(result.kind).toBe("remaining");
    if (result.kind === "remaining") {
      expect(result.remaining).toBe(12);
      expect(result.method.assumesPresentFromPeriodStart).toBe(true);
      expect(result.method.rawDays).toBe(10);
    }
  });

  it("adapte le début d'acquisition à une embauche en cours de période", () => {
    const withHire = estimatePeriodAcquisition({
      periodKind: "june-may",
      asOfIso: "2026-10-25",
      unit: "ouvrables",
      hireIso: "2026-08-01",
    });
    expect(withHire.ok).toBe(true);
    if (!withHire.ok) return;
    expect(withHire.completeMonths).toBe(2);
    expect(withHire.acquisition.estimatedDays).toBe(5);
    const result = computePeriodBalance({
      acquisition: withHire,
      priorRightsStatus: "unknown",
    });
    expect(result.kind).toBe("acquired-only");
    if (result.kind === "acquired-only") {
      expect(result.method.assumesPresentFromPeriodStart).toBe(false);
    }
  });

  it("compte 0 mois si la date de calcul est avant ou au début de période", () => {
    const atStart = estimatePeriodAcquisition({
      periodKind: "june-may",
      asOfIso: "2026-06-01",
      unit: "ouvrables",
    });
    expect(atStart.ok).toBe(true);
    if (atStart.ok) expect(atStart.completeMonths).toBe(0);

    const before = estimatePeriodAcquisition({
      periodKind: "june-may",
      asOfIso: "2026-05-15",
      unit: "ouvrables",
    });
    expect(before.ok).toBe(true);
    if (before.ok) {
      // Période précédente juin 2025 → mai 2026, au 15/05/2026 : mois complets depuis 01/06/2025
      expect(before.completeMonths).toBeGreaterThanOrEqual(0);
      expect(before.period.start.year).toBe(2025);
    }
  });

  it("conserve un solde négatif si les prises sur antérieurs dépassent le départ", () => {
    const early = estimatePeriodAcquisition({
      periodKind: "june-may",
      asOfIso: "2026-06-01",
      unit: "ouvrables",
    });
    expect(early.ok).toBe(true);
    if (!early.ok) return;
    const result = computePeriodBalance({
      acquisition: early,
      priorRightsStatus: "known",
      priorAvailable: 0,
      takenPrior: 2,
      takenCurrent: 0,
    });
    expect(result.kind).toBe("remaining");
    if (result.kind === "remaining") {
      expect(result.remaining).toBe(-2);
    }
  });

  it("accepte des droits antérieurs à 0 et un solde négatif", () => {
    if (!acquisition.ok) return;
    const zeroPrior = computePeriodBalance({
      acquisition,
      priorRightsStatus: "known",
      priorAvailable: 0,
      takenPrior: 0,
      takenCurrent: 0,
    });
    expect(zeroPrior.kind).toBe("remaining");
    if (zeroPrior.kind === "remaining") {
      expect(zeroPrior.remaining).toBe(15);
    }

    const negative = computePeriodBalance({
      acquisition,
      priorRightsStatus: "known",
      priorAvailable: 0,
      takenPrior: 0,
      takenCurrent: 20,
    });
    expect(negative.kind).toBe("remaining");
    if (negative.kind === "remaining") {
      expect(negative.remaining).toBe(-5);
    }
  });
});

describe("unités ouvrables / ouvrés (période)", () => {
  it("bascule ouvrables → ouvrés sur période partielle : plus de résultat numérique", () => {
    const ouvrables = estimatePeriodAcquisition({
      periodKind: "june-may",
      asOfIso: "2026-10-26",
      unit: "ouvrables",
    });
    expect(ouvrables.ok).toBe(true);
    if (!ouvrables.ok) return;
    const remaining = computePeriodBalance({
      acquisition: ouvrables,
      priorRightsStatus: "known",
      priorAvailable: 5,
      takenPrior: 0,
      takenCurrent: 0,
    });
    expect(remaining.kind).toBe("remaining");
    if (remaining.kind === "remaining") {
      expect(remaining.unit).toBe("ouvrables");
      expect(remaining.remaining).toBe(15);
    }

    const ouvres = estimatePeriodAcquisition({
      periodKind: "june-may",
      asOfIso: "2026-10-26",
      unit: "ouvres",
    });
    expect(ouvres.ok).toBe(false);
    if (!ouvres.ok) {
      expect(ouvres.reason).toBe("ouvres-partial");
      // Pas de 0 de substitution ni de total calculable sans acquisition
      expect(ouvres.message).not.toMatch(/\b0\b/);
    }
  });

  it("bascule ouvrés → ouvrables : restauration de l'estimation", () => {
    const ouvres = estimatePeriodAcquisition({
      periodKind: "june-may",
      asOfIso: "2026-10-26",
      unit: "ouvres",
    });
    expect(ouvres.ok).toBe(false);

    const ouvrables = estimatePeriodAcquisition({
      periodKind: "june-may",
      asOfIso: "2026-10-26",
      unit: "ouvrables",
    });
    expect(ouvrables.ok).toBe(true);
    if (ouvrables.ok) {
      expect(ouvrables.acquisition.unit).toBe("ouvrables");
      expect(ouvrables.acquisition.estimatedDays).toBe(10);
    }
  });

  it("n'affiche pas de total restant si l'acquisition ouvrés est indisponible", () => {
    const failed = estimatePeriodAcquisition({
      periodKind: "june-may",
      asOfIso: "2026-10-26",
      unit: "ouvres",
    });
    expect(failed.ok).toBe(false);
    // Sans acquisition ok, computePeriodBalance n'est pas appelé côté UI
  });

  it("conserve le mode fiche de paie en jours ouvrés (chiffres recopiés)", () => {
    const result = computePayslipBalance(
      {
        ...emptyPayslipCounter,
        acquired: "20",
        taken: "5",
      },
      {
        ...emptyPayslipCounter,
        mode: "remaining",
        remaining: "8",
      },
    );
    expect(result.kind).toBe("ready");
    if (result.kind === "ready") {
      expect(result.total).toBe(23);
      expect(result.nMinus1?.remaining).toBe(15);
      expect(result.n?.remaining).toBe(8);
    }
  });

  it("n'applique pas de conversion 30/25 ni de taux 2,08 pour combler la limite", () => {
    const partial = estimateAcquisition({ months: 4, unit: "ouvres" });
    expect(partial.ok).toBe(false);
    if (!partial.ok) {
      expect(partial.message).not.toMatch(/2[,.]08/);
      expect(partial.message).not.toMatch(/30\s*\/\s*25/);
    }
  });
});

describe("formatDaysFr", () => {
  it("formate le signe négatif et le pluriel", () => {
    expect(formatDaysFr(-2)).toBe("−2 jours");
    expect(formatDaysFr(1)).toBe("1 jour");
    expect(formatDaysFr(0)).toBe("0 jour");
  });
});
