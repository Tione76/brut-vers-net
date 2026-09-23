import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  FRENCH_MONTHS,
  formatIsoToFrenchInput,
  formatLongDateFr,
  parseFrenchDateInput,
  toIsoDateOnly,
} from "./dates";
import { calculateSickLeaveSalary } from "./sick-leave/engine";

describe("saisie de date française", () => {
  it("interprète 05/10/2026 comme le 5 octobre 2026", () => {
    expect(parseFrenchDateInput("05/10/2026")).toBe("2026-10-05");
    expect(formatLongDateFr("2026-10-05")).toBe("5 octobre 2026");
    expect(formatIsoToFrenchInput("2026-10-05")).toBe("05/10/2026");
  });

  it("n'interprète jamais 05/10/2026 comme le 10 mai", () => {
    expect(parseFrenchDateInput("05/10/2026")).not.toBe("2026-05-10");
    expect(parseFrenchDateInput("10/05/2026")).toBe("2026-05-10");
  });

  it("accepte les variantes courantes sans changer le jour et le mois", () => {
    expect(parseFrenchDateInput("5/10/2026")).toBe("2026-10-05");
    expect(parseFrenchDateInput("05.10.2026")).toBe("2026-10-05");
    expect(parseFrenchDateInput("05-10-2026")).toBe("2026-10-05");
    expect(parseFrenchDateInput("05102026")).toBe("2026-10-05");
    expect(parseFrenchDateInput("2026-10-05")).toBe("2026-10-05");
  });

  it("rejette les dates civiles invalides", () => {
    expect(parseFrenchDateInput("32/10/2026")).toBeNull();
    expect(parseFrenchDateInput("29/02/2025")).toBeNull();
    expect(toIsoDateOnly(2026, 13, 1)).toBeNull();
    expect(parseFrenchDateInput("octobre 2026")).toBeNull();
  });

  it("expose les mois en français dans l'ordre civil", () => {
    expect(FRENCH_MONTHS[8]).toBe("septembre");
    expect(FRENCH_MONTHS[9]).toBe("octobre");
    expect(FRENCH_MONTHS).not.toContain("September");
  });

  it("fait calculer le 5 octobre 2026, pas le 10 mai", () => {
    const october = calculateSickLeaveSalary({
      monthlyGrossUsual: 2000,
      stopStartIso: parseFrenchDateInput("05/10/2026")!,
      stopEndIso: parseFrenchDateInput("05/10/2026")!,
      ijssCarenceMode: "waived",
      employerComplementMode: "none",
      seniorityYears: 0,
      employerEligibilityConfirmed: false,
      subrogation: "unknown",
    });
    expect(october?.stopStartIso).toBe("2026-10-05");
    expect(october?.totalCalendarDays).toBe(1);
  });

  it("remplace les champs date natifs des trois calculateurs arrêt maladie", () => {
    const files = [
      "src/site/sick-leave/SickLeaveSalaryCalculator.tsx",
      "src/site/ijss/IjssCalculator.tsx",
      "src/site/employer-maintien/calculator.tsx",
    ];
    for (const file of files) {
      const source = readFileSync(join(process.cwd(), file), "utf8");
      expect(source).toContain("FrenchDateInput");
      expect(source).toContain('type === "date"');
      expect(source).not.toContain('<input type="date"');
    }
    const input = readFileSync(
      join(process.cwd(), "src/site/forms/FrenchDateInput.tsx"),
      "utf8",
    );
    expect(input).toContain('placeholder="jj/mm/aaaa"');
    expect(input).toContain("FRENCH_MONTHS");
    expect(input).not.toContain('type="date"');
  });
});
