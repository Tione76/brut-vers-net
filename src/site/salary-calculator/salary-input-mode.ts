import type { SalaryInputField } from "./types";

/** Mode de saisie du calculateur (couche UI uniquement). */
export type SalaryInputMode = "period" | "hourly";

export const DEFAULT_SALARY_INPUT_MODE: SalaryInputMode = "period";

export function isHourlySalaryField(field: SalaryInputField): boolean {
  return field === "grossHourly" || field === "netHourly";
}

export function isPeriodSalaryField(field: SalaryInputField): boolean {
  return (
    field === "grossMonthly" ||
    field === "netMonthly" ||
    field === "grossAnnual" ||
    field === "netAnnual"
  );
}

/**
 * Lors d'un changement de mode, mappe le champ actif vers un champ compatible
 * afin de réutiliser les valeurs déjà dérivées par le moteur.
 */
export function mapActiveInputForModeSwitch(
  nextMode: SalaryInputMode,
  activeInput: SalaryInputField | null,
): SalaryInputField | null {
  if (!activeInput) {
    return null;
  }

  if (nextMode === "hourly") {
    if (activeInput === "grossMonthly" || activeInput === "grossAnnual") {
      return "grossHourly";
    }
    if (activeInput === "netMonthly" || activeInput === "netAnnual") {
      return "netHourly";
    }
    return activeInput;
  }

  if (activeInput === "grossHourly") {
    return "grossMonthly";
  }
  if (activeInput === "netHourly") {
    return "netMonthly";
  }
  return activeInput;
}
