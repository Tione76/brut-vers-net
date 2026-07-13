/** Affiche un taux de prélèvement avec une décimale uniquement si nécessaire. */
export function formatWithholdingRatePercent(rate: number): string {
  if (!Number.isFinite(rate)) {
    return "0 %";
  }

  const rounded = Math.round(rate * 10) / 10;
  const hasDecimal = Math.abs(rounded % 1) > 0;

  const formatted = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: hasDecimal ? 1 : 0,
    maximumFractionDigits: 1,
  }).format(rounded);

  return `${formatted} %`;
}
