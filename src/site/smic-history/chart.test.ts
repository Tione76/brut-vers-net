import { describe, expect, it } from "vitest";
import {
  SMIC_CHART_ERA_CLIPS,
  SMIC_CHART_EURO_X,
  SMIC_CHART_LAST_STEP,
  SMIC_CHART_LINE_PATH,
  SMIC_CHART_SUBTITLE,
  SMIC_CHART_TITLE,
  SMIC_CHART_X_TICKS,
  SMIC_CHART_YEAR_GROUPS,
  SMIC_CHART_Y_TICKS,
  SMIC_HOURLY_STEPS,
  chartYearGroup,
  stepIndexAtX,
} from "./chart";
import { INSEE_LEGAL_RATES } from "./insee-legal-rates";
import { LEGAL_SMIC_ENTRIES } from "./series";

function stepAt(effectiveDate: string) {
  const step = SMIC_HOURLY_STEPS.find((item) => item.effectiveDate === effectiveDate);
  expect(step, `palier manquant pour ${effectiveDate}`).toBeTruthy();
  return step!;
}

describe("graphique en paliers du SMIC horaire brut", () => {
  it("reprend exactement les taux légaux Insee, sans en ajouter ni en perdre", () => {
    expect(SMIC_HOURLY_STEPS).toHaveLength(INSEE_LEGAL_RATES.length);
    expect(SMIC_HOURLY_STEPS.map((step) => step.effectiveDate)).toEqual(
      INSEE_LEGAL_RATES.map((row) => row.effectiveDate),
    );
    SMIC_HOURLY_STEPS.forEach((step, index) => {
      expect(step.index).toBe(index);
      if (index > 0) expect(step.x).toBeGreaterThan(SMIC_HOURLY_STEPS[index - 1]!.x);
    });
  });

  it("garde toutes les coordonnées dans la zone de dessin", () => {
    for (const step of SMIC_HOURLY_STEPS) {
      expect(step.x).toBeGreaterThanOrEqual(0);
      expect(step.xEnd).toBeLessThanOrEqual(100);
      expect(step.y).toBeGreaterThan(0);
      expect(step.y).toBeLessThanOrEqual(100);
    }
    for (const tick of SMIC_CHART_Y_TICKS) {
      expect(tick.y).toBeGreaterThanOrEqual(0);
      expect(tick.y).toBeLessThanOrEqual(100);
    }
    expect(SMIC_CHART_Y_TICKS.at(-1)).toMatchObject({ value: 0, y: 100, base: true });
  });

  it("trace une ligne continue, sans marche d'escalier", () => {
    const commands = SMIC_CHART_LINE_PATH.match(/[A-Za-z]/g) ?? [];
    expect(commands[0]).toBe("M");
    expect(new Set(commands.slice(1))).toEqual(new Set(["L"]));
    expect(commands).toHaveLength(SMIC_HOURLY_STEPS.length);
  });

  it("fait passer la ligne exactement par chaque taux publié", () => {
    const points = SMIC_CHART_LINE_PATH.split(/ (?=[ML] )/).map((part) => {
      const [, x, y] = part.split(" ");
      return { x: Number(x), y: Number(y) };
    });
    expect(points).toEqual(SMIC_HOURLY_STEPS.map((step) => ({ x: step.x, y: step.y })));
  });

  it("raccorde bord à bord les deux couleurs au passage à l'euro", () => {
    const { francs, euros } = SMIC_CHART_ERA_CLIPS;
    expect(francs.x).toBe(0);
    expect(francs.x + francs.width).toBeCloseTo(euros.x, 10);
    expect(euros.x).toBe(SMIC_CHART_EURO_X);
    expect(euros.x + euros.width).toBeCloseTo(100, 10);
  });

  it("colore chaque taux selon la monnaie dans laquelle il a été fixé", () => {
    for (const step of SMIC_HOURLY_STEPS) {
      const expected = step.effectiveDate < "2002-01-01" ? "francs" : "euros";
      expect(step.era, step.effectiveDate).toBe(expected);
      // La couleur suit la même frontière que le libellé de l'infobulle.
      expect(step.era === "francs").toBe(step.hourlyLabel.endsWith("F"));
      expect(step.x < SMIC_CHART_EURO_X).toBe(step.era === "francs");
    }
  });

  it("affiche l'année 2006, à revalorisation unique, avec sa date d'effet exacte", () => {
    const group = chartYearGroup(2006)!;
    expect(group.stepIndexes).toHaveLength(1);
    const step = SMIC_HOURLY_STEPS[group.stepIndexes[0]!]!;
    expect(step.effectiveDate).toBe("2006-07-01");
    expect(step.effectiveLabel).toBe("1er juillet 2006");
    expect(step.rangeLabel).toBe("Du 1er juillet 2006 au 30 juin 2007");
    expect(step.hourlyLabel).toBe("8,27\u00a0€");
    expect(step.secondaryLabel).toBe("Mensuel brut : 1\u00a0254,28\u00a0€ pour 151,67\u00a0h");
    expect(step.changeLabel).toBe("+2,99\u00a0%");
  });

  it("conserve les trois revalorisations de 2022 et leurs dates", () => {
    const group = chartYearGroup(2022)!;
    const steps = group.stepIndexes.map((index) => SMIC_HOURLY_STEPS[index]!);
    expect(steps.map((step) => step.effectiveDate)).toEqual([
      "2022-01-01",
      "2022-05-01",
      "2022-08-01",
    ]);
    expect(steps.map((step) => step.hourlyLabel)).toEqual([
      "10,57\u00a0€",
      "10,85\u00a0€",
      "11,07\u00a0€",
    ]);
    expect(steps[0]!.rangeLabel).toBe("Du 1er janvier 2022 au 30 avril 2022");
    expect(steps[2]!.rangeLabel).toBe("Du 1er août 2022 au 31 décembre 2022");
  });

  it("annonce le montant historique en francs avant son équivalent en euros", () => {
    const francs = stepAt("2001-07-01");
    expect(francs.hourlyLabel).toBe("43,72\u00a0F");
    expect(francs.secondaryLabel).toBe(
      "Équivalent après conversion monétaire : 6,67\u00a0€",
    );
    expect(francs.screenReaderLabel.indexOf("43,72")).toBeLessThan(
      francs.screenReaderLabel.indexOf("6,67"),
    );
    expect(francs.secondaryLabel).not.toMatch(/pouvoir d'achat|euros constants/);

    const euros = stepAt("2002-07-01");
    expect(euros.hourlyLabel).toBe("6,83\u00a0€");
    expect(euros.secondaryLabel).toBe("Mensuel brut : 1\u00a0154,27\u00a0€ pour 169\u00a0h");
  });

  it("place le repère du passage à l'euro entre les paliers de 2001 et 2002", () => {
    expect(SMIC_CHART_EURO_X).toBeGreaterThan(stepAt("2001-07-01").x);
    expect(SMIC_CHART_EURO_X).toBeLessThan(stepAt("2002-07-01").x);
  });

  it("termine sur le dernier taux applicable", () => {
    const last = LEGAL_SMIC_ENTRIES.filter((entry) => entry.seriesKind === "legal").at(-1)!;
    expect(SMIC_CHART_LAST_STEP.effectiveDate).toBe(last.effectiveDate);
    expect(SMIC_CHART_LAST_STEP.effectiveDate).toBe("2026-06-01");
    expect(SMIC_CHART_LAST_STEP.hourlyLabel).toBe("12,31\u00a0€");
    expect(SMIC_CHART_LAST_STEP.rangeLabel).toBe("Depuis le 1er juin 2026");
    expect(SMIC_CHART_LAST_STEP.xEnd).toBe(100);
  });

  it("rattache une année sans revalorisation au taux resté applicable", () => {
    const group = chartYearGroup(2025)!;
    expect(group.stepIndexes).toHaveLength(1);
    const step = SMIC_HOURLY_STEPS[group.stepIndexes[0]!]!;
    expect(step.effectiveDate).toBe("2024-11-01");
    expect(step.yearsCovered).toContain(2025);
    expect(step.year).not.toBe(2025);
  });

  it("couvre chaque année de la période avec au moins un palier sélectionnable", () => {
    expect(SMIC_CHART_YEAR_GROUPS[0]!.year).toBe(1980);
    expect(SMIC_CHART_YEAR_GROUPS.at(-1)!.year).toBe(2026);
    for (const group of SMIC_CHART_YEAR_GROUPS) {
      expect(group.stepIndexes.length).toBeGreaterThan(0);
    }
  });

  it("espace les graduations d'années et en garde trois sur mobile", () => {
    expect(SMIC_CHART_X_TICKS.map((tick) => tick.year)).toEqual([
      1980, 1990, 2000, 2010, 2020, 2026,
    ]);
    expect(SMIC_CHART_X_TICKS.filter((tick) => !tick.minor).map((tick) => tick.year)).toEqual([
      1980, 2000, 2026,
    ]);
    expect(SMIC_CHART_X_TICKS[0]!.x).toBe(0);
    expect(SMIC_CHART_X_TICKS.at(-1)!.x).toBeLessThan(100);
  });

  it("résout le palier applicable à une abscisse donnée", () => {
    const step = stepAt("2022-05-01");
    expect(stepIndexAtX(step.x)).toBe(step.index);
    expect(stepIndexAtX((step.x + step.xEnd) / 2)).toBe(step.index);
    expect(stepIndexAtX(-5)).toBe(0);
    expect(stepIndexAtX(100)).toBe(SMIC_CHART_LAST_STEP.index);
  });

  it("titre et sous-titre restent hors du dessin et sans tiret cadratin", () => {
    expect(SMIC_CHART_TITLE).toBe("Évolution du SMIC horaire brut");
    expect(SMIC_CHART_SUBTITLE).toContain("France hors Mayotte");
    expect(SMIC_CHART_SUBTITLE).toContain("euros publiés et francs convertis");
    expect(SMIC_CHART_SUBTITLE).toContain("1980-2026");
    expect(SMIC_CHART_SUBTITLE).not.toContain("euros courants");
    expect(JSON.stringify(SMIC_HOURLY_STEPS)).not.toContain("\u2014");
  });
});
