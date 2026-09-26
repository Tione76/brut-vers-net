import { describe, expect, it } from "vitest";
import {
  INFLATION_BASE_LABEL,
  INFLATION_CHART_SUBTITLE,
  INFLATION_CHART_TITLE,
  INFLATION_LAST_POINT,
  INFLATION_PRICE_PATH,
  INFLATION_SMIC_PATH,
  INFLATION_UNIT_LABEL,
  INFLATION_X_TICKS,
  INFLATION_YEAR_GROUPS,
  INFLATION_Y_TICKS,
  SMIC_INFLATION_POINTS,
  inflationIndexAtX,
  inflationIndexForYear,
  inflationYearGroup,
} from "./inflation-chart";
import { INSEE_INFLATION_QUARTERS } from "./insee-inflation";
import type { InseeInflationQuarter } from "./insee-raw-types";

function pointAt(quarter: string) {
  const point = SMIC_INFLATION_POINTS.find((item) => item.quarter === quarter);
  expect(point, `trimestre manquant : ${quarter}`).toBeTruthy();
  return point!;
}

describe("graphique des indices SMIC et prix", () => {
  it("reprend toutes les observations Insee, dans l'ordre chronologique", () => {
    expect(SMIC_INFLATION_POINTS).toHaveLength(INSEE_INFLATION_QUARTERS.length);
    const quarters = SMIC_INFLATION_POINTS.map((point) => point.quarter);
    expect([...quarters].sort()).toEqual(quarters);
    expect(quarters[0]).toBe("1990-T1");
    expect(quarters.at(-1)).toBe("2025-T4");
    expect(new Set(quarters).size).toBe(quarters.length);
  });

  it("n'affiche aucune observation incomplète ou reconstituée", () => {
    const published = new Map<string, InseeInflationQuarter>(
      INSEE_INFLATION_QUARTERS.map((row) => [row.quarter, row]),
    );
    for (const point of SMIC_INFLATION_POINTS) {
      const row = published.get(point.quarter)!;
      expect(row).toBeTruthy();
      expect(row.smicIndex).toBeGreaterThan(0);
      expect(row.priceIndex).toBeGreaterThan(0);
      // Les libellés de l'encart proviennent de la valeur publiée, sans arrondi maison.
      expect(Number(point.smicLabel.replace(/\u00a0/g, "").replace(",", "."))).toBeCloseTo(
        row.smicIndex,
        2,
      );
      expect(Number(point.priceLabel.replace(/\u00a0/g, "").replace(",", "."))).toBeCloseTo(
        row.priceIndex,
        2,
      );
    }
  });

  it("annonce la fréquence trimestrielle et la période exacte", () => {
    const point = pointAt("2022-T1");
    expect(point.year).toBe(2022);
    expect(point.quarterNumber).toBe(1);
    expect(point.periodLabel).toBe("1er trimestre 2022");
    expect(point.quarterLabel).toBe("1er trimestre");
    expect(point.monthsLabel).toBe("janvier à mars");
    expect(pointAt("2022-T3").periodLabel).toBe("3e trimestre 2022");
    expect(pointAt("2022-T4").monthsLabel).toBe("octobre à décembre");
    expect(pointAt("2022-T4").quarterLabel).toBe("4e trimestre");
  });

  it("fait correspondre exactement trimestre et indices affichés", () => {
    const point = pointAt("2022-T1");
    expect(point.smicLabel).toBe("231,81");
    expect(point.priceLabel).toBe("165,07");
    expect(point.screenReaderLabel).toContain("2022");
    expect(point.screenReaderLabel).toContain("1er trimestre");
    expect(point.screenReaderLabel).toContain("231,81");
    expect(point.screenReaderLabel).toContain("165,07");
    expect(point.screenReaderLabel).toContain(INFLATION_BASE_LABEL);

    expect(INFLATION_LAST_POINT.quarter).toBe("2025-T4");
    expect(INFLATION_LAST_POINT.smicLabel).toBe("260,54");
    expect(INFLATION_LAST_POINT.priceLabel).toBe("182,79");
  });

  it("garde la base 100 au bas de l'échelle, jamais un zéro trompeur", () => {
    const base = pointAt("1990-T1");
    expect(base.smicLabel).toBe("100,00");
    expect(base.priceLabel).toBe("100,00");
    expect(base.ySmic).toBe(100);
    expect(base.yPrice).toBe(100);
    expect(INFLATION_Y_TICKS.at(-1)).toMatchObject({ value: 100, y: 100, base: true });
    expect(INFLATION_Y_TICKS.every((tick) => tick.value >= 100)).toBe(true);
    for (const point of SMIC_INFLATION_POINTS) {
      expect(point.ySmic).toBeGreaterThanOrEqual(0);
      expect(point.ySmic).toBeLessThanOrEqual(100);
      expect(point.yPrice).toBeGreaterThanOrEqual(0);
      expect(point.yPrice).toBeLessThanOrEqual(100);
    }
  });

  it("trace deux lignes continues passant par chaque observation", () => {
    for (const path of [INFLATION_SMIC_PATH, INFLATION_PRICE_PATH]) {
      const commands = path.match(/[A-Za-z]/g) ?? [];
      expect(commands[0]).toBe("M");
      expect(new Set(commands.slice(1))).toEqual(new Set(["L"]));
      expect(commands).toHaveLength(SMIC_INFLATION_POINTS.length);
    }
    const smicPoints = INFLATION_SMIC_PATH.split(/ (?=[ML] )/).map((part) => {
      const [, x, y] = part.split(" ");
      return { x: Number(x), y: Number(y) };
    });
    expect(smicPoints).toEqual(SMIC_INFLATION_POINTS.map((p) => ({ x: p.x, y: p.ySmic })));
  });

  it("lit les deux séries au même trimestre, donc à la même abscisse", () => {
    const point = pointAt("2008-T3");
    expect(point.x).toBeGreaterThan(0);
    expect(point.x).toBeLessThan(100);
    // Un seul x par observation : le repère vertical vaut pour les deux courbes.
    expect(new Set(SMIC_INFLATION_POINTS.map((item) => item.x)).size).toBe(
      SMIC_INFLATION_POINTS.length,
    );
  });

  it("sélectionne l'observation publiée la plus proche du curseur", () => {
    const point = pointAt("2010-T1");
    expect(inflationIndexAtX(point.x)).toBe(point.index);
    const next = SMIC_INFLATION_POINTS[point.index + 1]!;
    expect(inflationIndexAtX(point.x + (next.x - point.x) * 0.4)).toBe(point.index);
    expect(inflationIndexAtX(point.x + (next.x - point.x) * 0.6)).toBe(next.index);
    expect(inflationIndexAtX(-10)).toBe(0);
    expect(inflationIndexAtX(140)).toBe(INFLATION_LAST_POINT.index);
  });

  it("enchaîne les trimestres sans trou ni observation inventée", () => {
    for (let index = 1; index < SMIC_INFLATION_POINTS.length; index += 1) {
      const previous = SMIC_INFLATION_POINTS[index - 1]!;
      const current = SMIC_INFLATION_POINTS[index]!;
      const expectedQuarter = previous.quarterNumber === 4 ? 1 : previous.quarterNumber + 1;
      const expectedYear = previous.quarterNumber === 4 ? previous.year + 1 : previous.year;
      expect(current.year).toBe(expectedYear);
      expect(current.quarterNumber).toBe(expectedQuarter);
    }
  });

  it("en changeant d'année, garde le même trimestre s'il est publié", () => {
    expect(SMIC_INFLATION_POINTS[inflationIndexForYear(2022, 3)]!.quarter).toBe("2022-T3");
    expect(SMIC_INFLATION_POINTS[inflationIndexForYear(1990)]!.quarter).toBe("1990-T1");
    expect(SMIC_INFLATION_POINTS[inflationIndexForYear(2025, 4)]!.quarter).toBe("2025-T4");
  });

  it("propose une année puis ses trimestres, sans valeur annuelle inventée", () => {
    expect(INFLATION_YEAR_GROUPS[0]!.year).toBe(1990);
    expect(INFLATION_YEAR_GROUPS.at(-1)!.year).toBe(2025);
    for (const group of INFLATION_YEAR_GROUPS) {
      expect(group.pointIndexes.length).toBeGreaterThan(0);
      expect(group.pointIndexes.length).toBeLessThanOrEqual(4);
      for (const index of group.pointIndexes) {
        expect(SMIC_INFLATION_POINTS[index]!.year).toBe(group.year);
      }
    }
    const group2022 = inflationYearGroup(2022)!;
    expect(group2022.pointIndexes.map((i) => SMIC_INFLATION_POINTS[i]!.quarter)).toEqual([
      "2022-T1",
      "2022-T2",
      "2022-T3",
      "2022-T4",
    ]);
  });

  it("espace les graduations d'années et en garde trois sur mobile", () => {
    expect(INFLATION_X_TICKS.map((tick) => tick.year)).toEqual([1990, 2000, 2010, 2020, 2025]);
    expect(INFLATION_X_TICKS.filter((tick) => !tick.minor).map((tick) => tick.year)).toEqual([
      1990, 2010, 2025,
    ]);
    expect(INFLATION_X_TICKS[0]!.x).toBe(0);
    expect(INFLATION_X_TICKS.at(-1)!.x).toBeLessThan(100);
    for (const tick of INFLATION_X_TICKS) {
      expect(pointAt(`${tick.year}-T1`).x).toBe(tick.x);
    }
  });

  it("garde le titre, le périmètre et la base hors de la zone de dessin", () => {
    expect(INFLATION_CHART_TITLE).toBe(
      "Indices Insee du SMIC horaire brut et des prix à la consommation",
    );
    expect(INFLATION_CHART_SUBTITLE).toContain("France métropolitaine puis France hors Mayotte");
    expect(INFLATION_CHART_SUBTITLE).toContain(INFLATION_BASE_LABEL);
    expect(INFLATION_CHART_SUBTITLE).toContain("1990-2025");
    expect(INFLATION_UNIT_LABEL).toContain("Indice");
    expect(JSON.stringify(SMIC_INFLATION_POINTS)).not.toContain("\u2014");
  });
});
