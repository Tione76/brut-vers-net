import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  DISMISSAL_OFFICIAL_SOURCES,
  DISMISSAL_SOURCES_VERIFIED_AT,
} from "./dismissal-official-sources";
import { calculateDismissalCompensation } from "./engine";
import type { DismissalCompensationInput } from "./types";

describe("dismissal-official-sources", () => {
  it("expose dix sources https vérifiées le 20 octobre 2026", () => {
    expect(DISMISSAL_SOURCES_VERIFIED_AT).toBe("2026-10-20");
    expect(DISMISSAL_OFFICIAL_SOURCES).toHaveLength(10);
    for (const source of DISMISSAL_OFFICIAL_SOURCES) {
      expect(source.href.startsWith("https://")).toBe(true);
      expect(source.title.length).toBeGreaterThan(8);
      expect(source.note.length).toBeGreaterThan(8);
    }
  });

  it("inclut F987, Code du travail, F31225 et le simulateur R57308", () => {
    const hrefs = DISMISSAL_OFFICIAL_SOURCES.map((source) => source.href);
    expect(hrefs.some((href) => href.includes("F987"))).toBe(true);
    expect(hrefs.some((href) => href.includes("LEGIARTI000035644154"))).toBe(true);
    expect(hrefs.some((href) => href.includes("LEGIARTI000035644692"))).toBe(true);
    expect(hrefs.some((href) => href.includes("LEGIARTI000035644687"))).toBe(true);
    expect(hrefs.some((href) => href.includes("LEGIARTI000035644695"))).toBe(true);
    expect(hrefs.some((href) => href.includes("LEGIARTI000018537562"))).toBe(true);
    expect(hrefs.some((href) => href.includes("F31225"))).toBe(true);
    expect(hrefs.some((href) => href.includes("LEGIARTI000006900981"))).toBe(true);
    expect(hrefs.some((href) => href.includes("LEGIARTI000006900983"))).toBe(true);
    expect(hrefs.some((href) => href.includes("R57308"))).toBe(true);
  });

  it("ne présente pas le simulateur Service-Public comme une validation de Brut vers Net", () => {
    const simulator = DISMISSAL_OFFICIAL_SOURCES.find((source) =>
      source.href.includes("R57308"),
    );
    expect(simulator?.note).toMatch(/ne constitue pas une validation/i);
  });
});

describe("dismissal editorial sources placement", () => {
  const editorialSource = readFileSync(
    join(process.cwd(), "src/site/dismissal-compensation-calculator/DismissalCompensationEditorial.tsx"),
    "utf8",
  );

  it("place les sources après la FAQ et supprime l'ancienne phrase de bas de page", () => {
    expect(editorialSource).toContain('id="sources-officielles"');
    expect(editorialSource).toContain("DISMISSAL_OFFICIAL_SOURCES");
    expect(editorialSource).not.toContain("Contenu vérifié le");
    expect(editorialSource).not.toContain("dismissal-editorial__sources");

    const faqTocIdx = editorialSource.indexOf('id: "faq-indemnite-licenciement"');
    const sourcesTocIdx = editorialSource.indexOf('id: "sources-officielles"');
    const faqHeadingIdx = editorialSource.indexOf('id="faq-indemnite-licenciement"');
    const sourcesSectionIdx = editorialSource.indexOf('id="sources-officielles"');
    expect(sourcesTocIdx).toBeGreaterThan(faqTocIdx);
    expect(sourcesSectionIdx).toBeGreaterThan(faqHeadingIdx);
  });

  it("distingue l'ancienneté d'ouverture du droit et celle du calcul", () => {
    expect(editorialSource).toContain("date d&apos;envoi de la lettre");
    expect(editorialSource).toContain("Deux notions d&apos;ancienneté");
  });
});

describe("cas limites alignés sur le barème légal", () => {
  const base = (
    overrides: Partial<DismissalCompensationInput> = {},
  ): DismissalCompensationInput => ({
    situation: "standard",
    seniorityYears: "4",
    seniorityMonths: "0",
    average12Months: "2000",
    average3Months: "",
    professionalUnfitnessAverage3Months: "",
    hasBonus: false,
    bonusAmount: "",
    bonusKind: "annual",
    specialSituations: [],
    ...overrides,
  });

  it("7 mois : 0 € ; 8 mois : prorata", () => {
    const seven = calculateDismissalCompensation(
      base({ seniorityYears: "0", seniorityMonths: "7" }),
    );
    const eight = calculateDismissalCompensation(
      base({ seniorityYears: "0", seniorityMonths: "8", average12Months: "2400" }),
    );
    expect(seven?.retainedAmount).toBe(0);
    expect(seven?.zeroReason).toBe("belowMinSeniority");
    expect(eight?.retainedAmount).toBe(400);
  });

  it("9 ans 11 mois, 10 ans, 10 ans 1 mois et 11 ans", () => {
    const nineEleven = calculateDismissalCompensation(
      base({ seniorityYears: "9", seniorityMonths: "11", average12Months: "2400" }),
    );
    const ten = calculateDismissalCompensation(
      base({ seniorityYears: "10", seniorityMonths: "0", average12Months: "2400" }),
    );
    const tenOne = calculateDismissalCompensation(
      base({ seniorityYears: "10", seniorityMonths: "1", average12Months: "2400" }),
    );
    const eleven = calculateDismissalCompensation(
      base({ seniorityYears: "11", seniorityMonths: "0", average12Months: "2400" }),
    );
    expect(nineEleven?.retainedAmount).toBe(5950);
    expect(ten?.retainedAmount).toBe(6000);
    expect(tenOne?.retainedAmount).toBe(6066.67);
    expect(eleven?.retainedAmount).toBe(6800);
  });

  it("inaptitude professionnelle double sans condition d'ancienneté à 4 mois", () => {
    const result = calculateDismissalCompensation(
      base({
        situation: "professionalUnfitness",
        seniorityYears: "0",
        seniorityMonths: "4",
        professionalUnfitnessAverage3Months: "2100",
      }),
    );
    expect(result?.retainedAmount).toBe(350);
    expect(result?.professionalUnfitnessApplied).toBe(true);
    expect(result?.zeroReason).toBeNull();
  });

  it("faute grave : 0 €", () => {
    const result = calculateDismissalCompensation(base({ situation: "grossMisconduct" }));
    expect(result?.retainedAmount).toBe(0);
    expect(result?.zeroReason).toBe("grossMisconduct");
  });
});
