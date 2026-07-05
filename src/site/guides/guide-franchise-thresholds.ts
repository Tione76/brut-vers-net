/**
 * Seuils franchise en base de TVA — source unique pour le guide et les illustrations.
 * Référence : art. 293 B du CGI — seuils applicables en 2026 (loi n° 2025-1044 du 3 nov. 2025 :
 * abandon du seuil unique à 25 000 €, maintien des seuils historiques).
 *
 * ⚠️ Mettre à jour ce fichier si la loi de finances modifie les montants.
 */
export const FRANCHISE_THRESHOLDS_META = {
  year: 2026,
  legalRef: "art. 293 B du CGI",
  sourceNote:
    "Seuils applicables en 2026 selon l'administration fiscale (service-public.fr). Susceptibles d'évolution par la loi de finances — vérifiez sur impots.gouv.fr ou entreprendre.service-public.fr.",
} as const;

export interface FranchiseThresholdRow {
  id: string;
  activity: string;
  base: number;
  major: number;
  examples: string;
}

export const FRANCHISE_THRESHOLD_ROWS: FranchiseThresholdRow[] = [
  {
    id: "ventes",
    activity: "Ventes de marchandises, restauration, hébergement",
    base: 85_000,
    major: 93_500,
    examples: "Commerce, artisanat, restauration, location meublée para-hôtelière",
  },
  {
    id: "services",
    activity: "Prestations de services (BIC, BNC, professions libérales)",
    base: 37_500,
    major: 41_250,
    examples: "Consultant, développeur, graphiste, coach, photographe",
  },
  {
    id: "avocats-reg",
    activity: "Avocats — activités réglementées (art. 293 B, I bis)",
    base: 50_000,
    major: 55_000,
    examples: "Prestations d'avocat dans le cadre de la profession",
  },
  {
    id: "avocats-autres",
    activity: "Avocats, auteurs, artistes-interprètes — autres activités",
    base: 35_000,
    major: 38_500,
    examples: "Cession de droits, activités annexes non réglementées",
  },
];

export function formatThreshold(amount: number): string {
  return `${new Intl.NumberFormat("fr-FR").format(amount)} €`;
}
