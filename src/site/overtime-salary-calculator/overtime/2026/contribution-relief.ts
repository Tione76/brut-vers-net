import { roundCent } from "@/site/salary-calculator";
import { OVERTIME_CONFIG_2026 } from "./config";

/**
 * Estime la réduction de cotisations salariales sur la rémunération brute
 * des heures supplémentaires (majoration incluse).
 *
 * Formule Urssaf lorsque les taux de droit commun s'appliquent :
 * réduction = brut HS × min(taux effectif, 11,31 %).
 * Ici on retient le plafond 11,31 % (cas le plus fréquent sous le PASS).
 */
export function estimateOvertimeContributionRelief(overtimeGross: number): number {
  if (!Number.isFinite(overtimeGross) || overtimeGross <= 0) {
    return 0;
  }

  return roundCent(overtimeGross * OVERTIME_CONFIG_2026.maxEmployeeContributionReliefRate);
}
