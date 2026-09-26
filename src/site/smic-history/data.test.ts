import { describe, expect, it } from "vitest";
import { SMIC_CURRENT, SMIC_EDITORIAL_YEAR, SMIC_PREVIOUS } from "@/site/smic/data";
import { EUR_FRF_OFFICIAL_RATE, SMIG_1950 } from "./constants";
import { convertFrfToEuro } from "./format";
import { INSEE_INFLATION_QUARTERS } from "./insee-inflation";
import { INSEE_LEGAL_RATES } from "./insee-legal-rates";
import { INSEE_SMIC39_1951_1979 } from "./insee-smic39";
import {
  CURRENT_LEGAL_RATE,
  LEGAL_SMIC_ENTRIES,
  SMIC_EURO_CHART_POINTS,
  SMIC_HISTORY,
  SMIC_HISTORY_YEARS,
  entriesForYear,
  firstEntryForYear,
  largestLegalHourlyIncrease,
} from "./series";

describe("série historique du SMIC", () => {
  it("couvre chaque année de 1950 à l'année éditoriale, dans l'ordre", () => {
    const years = SMIC_HISTORY_YEARS;
    expect(years[0]).toBe(1950);
    expect(years[years.length - 1]).toBe(SMIC_EDITORIAL_YEAR);
    for (let year = 1950; year <= SMIC_EDITORIAL_YEAR; year += 1) {
      expect(years).toContain(year);
    }
    const ordered = SMIC_HISTORY.every((entry, index, all) => {
      if (index === 0) return true;
      const previous = all[index - 1]!;
      return (
        previous.year < entry.year ||
        (previous.year === entry.year &&
          (previous.effectiveDate ?? "") <= (entry.effectiveDate ?? "9999"))
      );
    });
    expect(ordered).toBe(true);
  });

  it("distingue SMIG avant 1970 et SMIC à partir de 1970", () => {
    for (const entry of SMIC_HISTORY) {
      if (entry.year < 1970) expect(entry.type).toBe("SMIG");
      else expect(entry.type).toBe("SMIC");
    }
  });

  it("aligne monnaies et durées sur les périodes", () => {
    expect(SMIC_HISTORY.find((entry) => entry.year === 1950)?.currency).toBe("FRF_OLD");
    for (const entry of SMIC_HISTORY.filter((item) => item.seriesKind === "legal")) {
      if (entry.effectiveDate && entry.effectiveDate < "2001-07-01") {
        expect(entry.currency).toBe("FRF");
        expect(entry.hourlyGrossFrancs).not.toBeNull();
      }
      if (entry.effectiveDate && entry.effectiveDate >= "2002-07-01") {
        expect(entry.currency).toBe("EUR");
      }
      if (entry.effectiveDate && entry.effectiveDate < "1982-02-01") {
        expect(entry.weeklyHours).toBe(40);
      }
      if (
        entry.effectiveDate &&
        entry.effectiveDate >= "1982-02-01" &&
        entry.effectiveDate < "2005-07-01"
      ) {
        expect(entry.weeklyHours).toBe(39);
      }
      if (entry.effectiveDate && entry.effectiveDate >= "2005-07-01") {
        expect(entry.weeklyHours).toBe(35);
        expect(entry.monthlyGross).not.toBe(Number((entry.hourlyGross! * 151.67).toFixed(2)) || entry.monthlyGross);
      }
    }
  });

  it("n'invente aucun net et ne recalcule pas silencieusement 151,67 h avant 2005", () => {
    const blob = JSON.stringify(SMIC_HISTORY);
    expect(blob).not.toContain("hourlyNet");
    expect(blob).not.toContain("monthlyNet");
    const before35 = LEGAL_SMIC_ENTRIES.filter(
      (entry) => entry.effectiveDate && entry.effectiveDate < "2005-07-01",
    );
    for (const entry of before35) {
      expect(entry.monthlyHoursLabel).not.toContain("151,67");
    }
  });

  it("conserve plusieurs revalorisations la même année et ancre la première", () => {
    const year2022 = entriesForYear(2022);
    expect(year2022).toHaveLength(3);
    expect(year2022.filter((entry) => entry.isYearAnchor)).toHaveLength(1);
    expect(year2022[0]?.yearAnchor).toBe("smic-2022");
    expect(year2022.map((entry) => entry.effectiveDate)).toEqual([
      "2022-01-01",
      "2022-05-01",
      "2022-08-01",
    ]);
    expect(entriesForYear(2021)).toHaveLength(2);
    expect(entriesForYear(2023)).toHaveLength(2);
    expect(entriesForYear(2024)).toHaveLength(2);
    expect(entriesForYear(2026).some((entry) => entry.effectiveDate === "2026-01-01")).toBe(true);
    expect(entriesForYear(2026).some((entry) => entry.effectiveDate === "2026-06-01")).toBe(true);
  });

  it("annote 2000-2005 pour les garanties mensuelles", () => {
    const gmr = LEGAL_SMIC_ENTRIES.filter(
      (entry) =>
        entry.effectiveDate &&
        entry.effectiveDate >= "2000-01-01" &&
        entry.effectiveDate <= "2005-07-01",
    );
    expect(gmr.length).toBeGreaterThan(0);
    expect(gmr.every((entry) => entry.note?.includes("35 heures"))).toBe(true);
  });

  it("aligne les derniers taux sur SMIC_CURRENT / SMIC_PREVIOUS et l'Insee", () => {
    expect(CURRENT_LEGAL_RATE.hourlyGross).toBe(SMIC_CURRENT.hourlyGross);
    expect(CURRENT_LEGAL_RATE.monthlyGross).toBe(SMIC_CURRENT.monthlyGross);
    expect(CURRENT_LEGAL_RATE.effectiveDate).toBe("2026-06-01");
    const january = LEGAL_SMIC_ENTRIES.find((entry) => entry.effectiveDate === "2026-01-01");
    expect(january?.hourlyGross).toBe(SMIC_PREVIOUS.hourlyGross);
    expect(INSEE_LEGAL_RATES.some((row) => row.hourlyGrossEur === 12.31)).toBe(true);
    expect(INSEE_LEGAL_RATES.some((row) => row.effectiveDate === "2006-07-01" && row.hourlyGrossEur === 8.27)).toBe(
      true,
    );
  });

  it("documente 1950 comme un SMIG par zones, sans montant unique inventé", () => {
    const entry = SMIC_HISTORY.find((item) => item.year === 1950);
    expect(entry?.hourlyGross).toBeNull();
    expect(entry?.note).toContain(String(SMIG_1950.parisOldFrancsPerHour));
    expect(entry?.note).toContain(String(SMIG_1950.lowestZoneOldFrancsPerHour));
    expect(entry?.note).toContain("unique national");
  });

  it("marque les moyennes 1951-1979 comme converties et officielles", () => {
    expect(INSEE_SMIC39_1951_1979).toHaveLength(29);
    const converted = SMIC_HISTORY.filter((entry) => entry.seriesKind === "insee-annual-average");
    expect(converted.every((entry) => entry.isConverted && entry.isOfficial)).toBe(true);
    expect(converted.every((entry) => entry.conversionMethod === "insee-smic39-annual-average-euro")).toBe(
      true,
    );
  });

  it("convertit les francs au taux officiel sans le présenter comme un pouvoir d'achat", () => {
    expect(convertFrfToEuro(6.55957)).toBe(1);
    expect(EUR_FRF_OFFICIAL_RATE).toBe(6.55957);
    const july2001 = LEGAL_SMIC_ENTRIES.find((entry) => entry.effectiveDate === "2001-07-01");
    expect(july2001?.hourlyGrossFrancs).toBe(43.72);
    expect(july2001?.hourlyGross).toBe(6.67);
  });

  it("fournit une série graphique homogène issue des mêmes taux légaux", () => {
    expect(SMIC_EURO_CHART_POINTS.length).toBe(INSEE_LEGAL_RATES.length);
    expect(SMIC_EURO_CHART_POINTS.every((point) => point.hourlyEur > 0)).toBe(true);
    expect(INSEE_INFLATION_QUARTERS[0]?.quarter).toBe("2025-T4");
    expect(INSEE_INFLATION_QUARTERS.some((row) => row.quarter === "1990-T1" && row.smicIndex === 100)).toBe(
      true,
    );
  });

  it("aligne le tableau sur les séries Insee, sans recalculer les mensuels", () => {
    const averages = SMIC_HISTORY.filter((entry) => entry.seriesKind === "insee-annual-average");
    expect(averages).toHaveLength(INSEE_SMIC39_1951_1979.length);
    averages.forEach((entry, index) => {
      const row = INSEE_SMIC39_1951_1979[index]!;
      expect(entry.year).toBe(row.year);
      expect(entry.hourlyGross).toBe(row.hourlyGrossEur);
      expect(entry.monthlyGross).toBe(row.monthlyGrossEur);
      expect(entry.effectiveDate).toBeNull();
    });

    const legal = SMIC_HISTORY.filter((entry) => entry.seriesKind === "legal");
    expect(legal).toHaveLength(INSEE_LEGAL_RATES.length);
    legal.forEach((entry, index) => {
      const row = INSEE_LEGAL_RATES[index]!;
      expect(entry.year).toBe(row.year);
      expect(entry.effectiveDate).toBe(row.effectiveDate);
      if (row.hourlyGrossEur != null) expect(entry.hourlyGross).toBe(row.hourlyGrossEur);
      if (row.hourlyGrossFrf != null) expect(entry.hourlyGrossFrancs).toBe(row.hourlyGrossFrf);
      if (row.monthlyGross151 != null) expect(entry.monthlyGross).toBe(row.monthlyGross151);
      else if (row.monthlyGross169Eur != null) expect(entry.monthlyGross).toBe(row.monthlyGross169Eur);
      else if (row.monthlyGross169Frf != null) expect(entry.monthlyGross).toBe(row.monthlyGross169Frf);
    });

    expect(firstEntryForYear(1970)?.hourlyGross).toBe(0.52);
    expect(entriesForYear(1981).map((entry) => entry.hourlyGross)).toEqual([15.2, 16.72, 17.34, 17.76]);
    expect(largestLegalHourlyIncrease()?.effectiveDate).toBe("1981-06-01");
    expect(largestLegalHourlyIncrease()?.changePercent).toBe(10);
    expect(entriesForYear(1990)[0]?.hourlyGross).toBe(30.51);
    expect(entriesForYear(2006)[0]).toMatchObject({
      effectiveDate: "2006-07-01",
      hourlyGross: 8.27,
      monthlyGross: 1254.28,
    });
    expect(entriesForYear(2009)[0]).toMatchObject({
      effectiveDate: "2009-07-01",
      hourlyGross: 8.82,
    });
    expect(entriesForYear(2022).map((entry) => entry.hourlyGross)).toEqual([10.57, 10.85, 11.07]);
    expect(entriesForYear(2024).at(-1)).toMatchObject({
      effectiveDate: "2024-11-01",
      hourlyGross: 11.88,
      monthlyGross: 1801.8,
    });
    expect(entriesForYear(2025)).toHaveLength(1);
    expect(entriesForYear(2025)[0]?.seriesKind).toBe("continuation");
    expect(entriesForYear(2026).map((entry) => entry.hourlyGross)).toEqual([12.02, 12.31]);
  });

  it("valide les dates d'effet ISO des taux légaux", () => {
    for (const entry of LEGAL_SMIC_ENTRIES) {
      if (!entry.effectiveDate) continue;
      expect(entry.effectiveDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(new Date(`${entry.effectiveDate}T00:00:00Z`).getTime())).toBe(false);
    }
  });
});
