/**
 * Calculs pédagogiques pour /banque-petit-salaire.
 * Les montants sont stockés en centimes pour éviter les arrondis flottants.
 */

export function formatCents(cents: number): string {
  const euros = cents / 100;
  const fractionDigits = cents % 100 === 0 ? 0 : 2;
  return `${new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: 2,
  }).format(euros)}\u00a0€`;
}

export function annualCents(monthlyCents: number): number {
  return monthlyCents * 12;
}

export function monthsCostCents(monthlyCents: number, months: number): number {
  return monthlyCents * months;
}
