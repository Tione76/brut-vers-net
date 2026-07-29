import { describe, expect, it } from "vitest";
import {
  DEFAULT_SALARY_INPUT_MODE,
  isHourlySalaryField,
  isPeriodSalaryField,
  mapActiveInputForModeSwitch,
} from "./salary-input-mode";

describe("salary-input-mode", () => {
  it("utilise le mode période (mensuel/annuel) par défaut", () => {
    expect(DEFAULT_SALARY_INPUT_MODE).toBe("period");
  });

  it("détecte les champs horaires et périodiques", () => {
    expect(isHourlySalaryField("grossHourly")).toBe(true);
    expect(isHourlySalaryField("netHourly")).toBe(true);
    expect(isHourlySalaryField("grossMonthly")).toBe(false);
    expect(isPeriodSalaryField("grossMonthly")).toBe(true);
    expect(isPeriodSalaryField("netAnnual")).toBe(true);
    expect(isPeriodSalaryField("grossHourly")).toBe(false);
  });

  it("mappe mensuel/annuel vers horaire lors du passage en mode horaire", () => {
    expect(mapActiveInputForModeSwitch("hourly", "grossMonthly")).toBe("grossHourly");
    expect(mapActiveInputForModeSwitch("hourly", "grossAnnual")).toBe("grossHourly");
    expect(mapActiveInputForModeSwitch("hourly", "netMonthly")).toBe("netHourly");
    expect(mapActiveInputForModeSwitch("hourly", "netAnnual")).toBe("netHourly");
    expect(mapActiveInputForModeSwitch("hourly", "grossHourly")).toBe("grossHourly");
  });

  it("mappe horaire vers mensuel lors du retour au mode période", () => {
    expect(mapActiveInputForModeSwitch("period", "grossHourly")).toBe("grossMonthly");
    expect(mapActiveInputForModeSwitch("period", "netHourly")).toBe("netMonthly");
    expect(mapActiveInputForModeSwitch("period", "grossAnnual")).toBe("grossAnnual");
    expect(mapActiveInputForModeSwitch("period", null)).toBeNull();
  });
});
