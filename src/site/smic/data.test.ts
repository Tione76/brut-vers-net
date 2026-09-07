import { describe, expect, it } from "vitest";
import {
  SMIC_CURRENT,
  SMIC_CALENDAR_YEAR_2026,
  SMIC_EDITORIAL_YEAR,
  SMIC_FRESHNESS_LINE,
  SMIC_H1,
  SMIC_LABELS,
  SMIC_LAST_INCREASE_PERCENT,
  SMIC_META_DESCRIPTION,
  SMIC_MONTHLY_HOURS,
  SMIC_PREVIOUS,
  SMIC_SEO_TITLE,
  SMIC_VALIDITY_LINE,
} from "./data";

describe("source de vérité SMIC", () => {
  it("reste cohérente entre horaire, mensuel et hausse", () => {
    const impliedMonthly = Number((SMIC_CURRENT.hourlyGross * SMIC_MONTHLY_HOURS).toFixed(2));
    expect(Math.abs(impliedMonthly - SMIC_CURRENT.monthlyGross)).toBeLessThanOrEqual(0.05);

    const increase =
      ((SMIC_CURRENT.hourlyGross - SMIC_PREVIOUS.hourlyGross) / SMIC_PREVIOUS.hourlyGross) * 100;
    expect(Number(increase.toFixed(2))).toBe(SMIC_LAST_INCREASE_PERCENT);

    expect(Math.abs(SMIC_CURRENT.monthlyGross * 12 - SMIC_CURRENT.annualGross)).toBeLessThanOrEqual(
      0.05,
    );
  });

  it("expose un Title evergreen et un H1 daté", () => {
    expect(SMIC_SEO_TITLE).toBe(
      "SMIC : montant brut et net, horaire et mensuel | Mis à jour",
    );
    expect(SMIC_SEO_TITLE).not.toMatch(/20\d{2}/);
    expect(SMIC_SEO_TITLE).not.toContain("\u2014");
    expect(SMIC_SEO_TITLE).not.toMatch(/Brut-vers-Net/i);
    expect(SMIC_SEO_TITLE.startsWith("SMIC")).toBe(true);
    expect(SMIC_H1).toContain(String(SMIC_EDITORIAL_YEAR));
    expect(SMIC_H1).toBe(`SMIC ${SMIC_EDITORIAL_YEAR} : quel est le montant brut et net ?`);
    expect(SMIC_META_DESCRIPTION).not.toMatch(/20\d{2}/);
    expect(SMIC_FRESHNESS_LINE).toBe(SMIC_VALIDITY_LINE);
    expect(SMIC_FRESHNESS_LINE).toContain("1er juin 2026");
    expect(SMIC_FRESHNESS_LINE).toContain("7 septembre 2026");
    expect(SMIC_FRESHNESS_LINE).not.toContain("\u2014");
  });

  it("calcule le cumul brut théorique de l'année civile 2026", () => {
    const expected =
      SMIC_CALENDAR_YEAR_2026.monthsAtPreviousRate * SMIC_PREVIOUS.monthlyGross +
      SMIC_CALENDAR_YEAR_2026.monthsAtCurrentRate * SMIC_CURRENT.monthlyGross;
    expect(Number(expected.toFixed(2))).toBe(SMIC_CALENDAR_YEAR_2026.grossCumulative);
    expect(SMIC_CALENDAR_YEAR_2026.grossCumulative).toBe(22184.29);
    expect(SMIC_LABELS.calendarYearGrossCumulative.replace(/\u00a0/g, " ")).toBe("22 184,29 €");
  });

  it("formate les libellés FR utilisés par la page", () => {
    expect(SMIC_LABELS.hourlyGross.replace(/\u00a0/g, " ")).toBe("12,31 €");
    expect(SMIC_LABELS.monthlyGross.replace(/\u00a0/g, " ")).toBe("1 867,02 €");
    expect(SMIC_LABELS.hourlyNet.replace(/\u00a0/g, " ")).toBe("9,74 €");
    expect(SMIC_LABELS.monthlyNet.replace(/\u00a0/g, " ")).toBe("1 477,93 €");
    expect(SMIC_LABELS.monthlyGross).toContain("\u00a0");
  });
});
