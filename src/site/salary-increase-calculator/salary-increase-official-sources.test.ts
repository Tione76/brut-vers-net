import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  INCREASE_OFFICIAL_SOURCES,
  INCREASE_SOURCES_VERIFIED_AT,
} from "./salary-increase-official-sources";
import { calculateSalaryIncrease } from "./engine";
import type { SalaryIncreaseInput } from "./types";
import { salaryIncreaseFaq } from "./salary-increase-editorial-data";

describe("salary-increase-official-sources", () => {
  it("expose cinq sources https vérifiées", () => {
    expect(INCREASE_SOURCES_VERIFIED_AT).toBe("2026-10-20");
    expect(INCREASE_OFFICIAL_SOURCES).toHaveLength(5);
    for (const source of INCREASE_OFFICIAL_SOURCES) {
      expect(source.href.startsWith("https://")).toBe(true);
      expect(source.title.length).toBeGreaterThan(8);
      expect(source.note.length).toBeGreaterThan(8);
    }
  });

  it("inclut F2301, Mon-entreprise, CSG, PAS et BOFiP", () => {
    const hrefs = INCREASE_OFFICIAL_SOURCES.map((source) => source.href);
    expect(hrefs.some((href) => href.includes("F2301"))).toBe(true);
    expect(hrefs.some((href) => href.includes("mon-entreprise.urssaf.fr"))).toBe(true);
    expect(hrefs.some((href) => href.includes("F2971"))).toBe(true);
    expect(hrefs.some((href) => href.includes("F34732"))).toBe(true);
    expect(hrefs.some((href) => href.includes("BOI-BAREME-000037"))).toBe(true);
  });
});

describe("salary-increase editorial coherence", () => {
  const editorialSource = readFileSync(
    join(process.cwd(), "src/site/salary-increase-calculator/salary-increase-editorial.tsx"),
    "utf8",
  );

  it("place les sources après la FAQ et sans forfait mutuelle 40 €", () => {
    expect(editorialSource).toContain('id="sources-officielles"');
    expect(editorialSource).toContain("INCREASE_OFFICIAL_SOURCES");
    expect(editorialSource).toContain("taux non personnalisé");
    expect(editorialSource).not.toContain("40 €");
    expect(editorialSource).not.toMatch(/Maladie, retraite, chômage/);
    const faqTocIdx = editorialSource.indexOf('id: "faq"');
    const sourcesTocIdx = editorialSource.indexOf('id: "sources-officielles"');
    const faqIdx = editorialSource.indexOf('id="faq"');
    const sourcesIdx = editorialSource.indexOf('id="sources-officielles"');
    expect(sourcesTocIdx).toBeGreaterThan(faqTocIdx);
    expect(sourcesIdx).toBeGreaterThan(faqIdx);
  });

  it("FAQ sans chômage salarial actuel de droit commun", () => {
    const blob = salaryIncreaseFaq.map((item) => `${item.question} ${item.answer}`).join("\n");
    expect(blob).toMatch(/supprimée en 2018/);
    expect(blob).not.toMatch(/retraite, chômage, etc/);
  });
});

describe("+100 € brut sur 2 500 € : gain net après PAS (moteur actuel)", () => {
  it("conserve 78 € net avant PAS et 63,05 € net après PAS", () => {
    const input: SalaryIncreaseInput = {
      referenceField: "grossMonthly",
      currentSalaryValue: "2500",
      profile: "nonExecutive",
      salaryMonths: 12,
      increaseType: "euros",
      increaseReferenceField: "grossMonthlyIncrease",
      increaseValue: "100",
      withholdingRateMode: "auto",
      manualWithholdingRate: 0,
    };

    const result = calculateSalaryIncrease(input);
    expect(result?.gain.netMonthly).toBe(78);
    expect(result?.gain.netAfterTaxMonthly).toBe(63.05);
  });
});
