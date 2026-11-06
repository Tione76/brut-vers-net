/**
 * Source de vérité : grille Syntec (IDCC 1486) et métadonnées du guide.
 *
 * Maintenance : à chaque négociation salariale de branche, recontrôler
 * - Légifrance (accords salaires IDCC 1486 + arrêté d'extension) ;
 * - Annexe III sur syntec.fr ;
 * - Code du travail numérique (contribution 1486) ;
 * - SMIC via `@/site/smic/data` (ne pas dupliquer un montant SMIC ici) ;
 * - article 7.1 et accord durée du travail (forfait jours / modalité missions).
 */

import {
  SMIC_CURRENT,
  SMIC_EFFECTIVE_FROM_LABEL,
  SMIC_LABELS,
  SMIC_MONTHLY_HOURS,
  SMIC_VERIFIED_ON_LABEL,
} from "@/site/smic/data";

export const SYNTEC_SLUG = "grille-salaire-syntec";
export const SYNTEC_PATH = "/grille-salaire-syntec";

export const SYNTEC_H1 =
  "Grille de salaire Syntec : quel minimum selon votre coefficient ? (mis à jour)";

export const SYNTEC_SEO_TITLE =
  "Grille de salaire Syntec par coefficient (mis à jour)";

export const SYNTEC_META_DESCRIPTION =
  "Consultez les minima Syntec ETAM et cadres par coefficient. Comprenez les règles sur le SMIC, les primes, le temps partiel et le forfait jours.";

export const SYNTEC_BREADCRUMB = "Grille Syntec";

export const SYNTEC_SUBTITLE =
  "Minima ETAM et ingénieurs/cadres, lecture du coefficient, comparaison avec le SMIC, temps partiel et forfaits.";

/** Première publication éditoriale de cette page. */
export const SYNTEC_PUBLISHED_AT = "2026-11-06";
/** Dernière révision éditoriale réelle de la page. */
export const SYNTEC_UPDATED_AT = "2026-11-06";

/** Date réelle de consultation des textes pour cette révision. */
export const SYNTEC_VERIFIED_ON = "2026-11-06";
export const SYNTEC_VERIFIED_ON_LABEL = "6 novembre 2026";

/** Accord de salaires retenu pour les montants affichés. */
export const SYNTEC_AGREEMENT = {
  title: "Accord du 26 juin 2024 relatif aux salaires minimaux (Annexe III)",
  signedOn: "2024-06-26",
  signedOnLabel: "26 juin 2024",
  extensionOrder: "Arrêté du 8 novembre 2024",
  extensionPublishedOn: "2024-11-27",
  extensionPublishedOnLabel: "27 novembre 2024",
  /** Entrée en application (JO + clause « au plus tôt le 1er janvier 2025 »). */
  effectiveFrom: "2025-01-01",
  effectiveFromLabel: "1er janvier 2025",
  nor: "ASET2450664M",
  idcc: "1486",
  officialTitle:
    "Convention collective nationale des bureaux d'études techniques, des cabinets d'ingénieurs-conseils et des sociétés de conseils",
  commonName: "Syntec-Cinov",
} as const;

export const SYNTEC_FRESHNESS_LINE = `Vérifié le ${SYNTEC_VERIFIED_ON_LABEL}. Date d'entrée en application de la grille : ${SYNTEC_AGREEMENT.effectiveFromLabel}.`;

export const SYNTEC_BASE_HOURS_NOTE = `Base de lecture usuelle : durée légale du travail à temps plein (${SMIC_LABELS.monthlyHours} h/mois, soit 35 h/semaine). Les montants de grille sont des minima bruts mensuels.`;

export type SyntecCategory = "ETAM" | "IC";

export type SyntecGridRow = {
  category: SyntecCategory;
  position: string;
  coefficient: number;
  monthlyGrossCents: number;
  /** True si le minimum conventionnel est inférieur au SMIC temps plein actuel. */
  belowSmic?: boolean;
  /** Précision classification (ex. âge pour IC 2.1). */
  note?: string;
  sourceHref: string;
  effectiveFrom: string;
};

function euroFromCents(cents: number): number {
  return cents / 100;
}

function formatEuroAmount(value: number, digits = 0): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
    .format(value)
    .replace(/\u202f|\u00a0| /g, "\u00a0");
}

export function formatSyntecEuro(cents: number, digits = 0): string {
  return `${formatEuroAmount(euroFromCents(cents), digits)}\u00a0€`;
}

export const SYNTEC_SOURCES = {
  syntecConvention: {
    label: "Convention collective Syntec (accueil)",
    href: "https://www.syntec.fr/convention-collective/",
  },
  syntecAnnexe3: {
    label: "Annexe III - Salaires minimaux de branche (Syntec)",
    href: "https://www.syntec.fr/convention-collective/annexe-3-salaires-minimaux-de-branche/",
  },
  syntecClassificationEtam: {
    label: "Classification ETAM (Syntec)",
    href: "https://www.syntec.fr/convention-collective/classification-etam/",
  },
  syntecClassificationIc: {
    label: "Classification des ingénieurs et cadres (Syntec)",
    href: "https://www.syntec.fr/convention-collective/1627-2/",
  },
  syntecRemuneration: {
    label: "Rémunération - article 7.1 et suivants (Syntec)",
    href: "https://www.syntec.fr/convention-collective/maladie-accidents/",
  },
  cdtnMinimum: {
    label: "Salaire minimum - IDCC 1486 (Code du travail numérique)",
    href: "https://code.travail.gouv.fr/contribution/1486-quel-est-le-salaire-minimum",
  },
  legifranceConvention: {
    label: "Texte de la convention sur Légifrance",
    href: "https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000044253019",
  },
  legifranceAccordSalaires: {
    label: "Accord du 26 juin 2024 relatif aux salaires minimaux (texte complet)",
    href: "https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000050228699/",
  },
  legifranceRealisationMissions: {
    label: "Réalisation de missions - art. 3 (accord du 22 juin 1999)",
    href: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005851638",
  },
  legifranceForfaitJoursEligibilite: {
    label: "Forfait jours - conditions d'accès (art. 4.1)",
    href: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000049764136",
  },
  legifranceForfaitJours: {
    label: "Forfait jours - rémunération (art. 4.4)",
    href: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000049764138",
  },
  urssafSmic: {
    label: "Montant du SMIC (Urssaf)",
    href: "https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/montant-smic.html",
  },
  prescriptionSalaire: {
    label: "Prescription des salaires (Code du travail, art. L. 3245-1)",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000027566295",
  },
} as const;

const ACCORD_HREF = SYNTEC_SOURCES.legifranceAccordSalaires.href;
const EFFECTIVE = SYNTEC_AGREEMENT.effectiveFrom;

function withSmicFlag(row: Omit<SyntecGridRow, "belowSmic">): SyntecGridRow {
  return {
    ...row,
    belowSmic: euroFromCents(row.monthlyGrossCents) < SMIC_CURRENT.monthlyGross,
  };
}

/** Grille ETAM : montants bruts mensuels de l'accord du 26 juin 2024. */
export const SYNTEC_ETAM_ROWS: SyntecGridRow[] = [
  withSmicFlag({
    category: "ETAM",
    position: "1.1",
    coefficient: 240,
    monthlyGrossCents: 181_500,
    sourceHref: ACCORD_HREF,
    effectiveFrom: EFFECTIVE,
  }),
  withSmicFlag({
    category: "ETAM",
    position: "1.2",
    coefficient: 250,
    monthlyGrossCents: 184_500,
    sourceHref: ACCORD_HREF,
    effectiveFrom: EFFECTIVE,
  }),
  withSmicFlag({
    category: "ETAM",
    position: "2.1",
    coefficient: 275,
    monthlyGrossCents: 187_500,
    sourceHref: ACCORD_HREF,
    effectiveFrom: EFFECTIVE,
  }),
  withSmicFlag({
    category: "ETAM",
    position: "2.2",
    coefficient: 310,
    monthlyGrossCents: 190_500,
    sourceHref: ACCORD_HREF,
    effectiveFrom: EFFECTIVE,
  }),
  withSmicFlag({
    category: "ETAM",
    position: "2.3",
    coefficient: 355,
    monthlyGrossCents: 204_500,
    sourceHref: ACCORD_HREF,
    effectiveFrom: EFFECTIVE,
  }),
  withSmicFlag({
    category: "ETAM",
    position: "3.1",
    coefficient: 400,
    monthlyGrossCents: 218_500,
    sourceHref: ACCORD_HREF,
    effectiveFrom: EFFECTIVE,
  }),
  withSmicFlag({
    category: "ETAM",
    position: "3.2",
    coefficient: 450,
    monthlyGrossCents: 234_000,
    sourceHref: ACCORD_HREF,
    effectiveFrom: EFFECTIVE,
  }),
  withSmicFlag({
    category: "ETAM",
    position: "3.3",
    coefficient: 500,
    monthlyGrossCents: 249_000,
    sourceHref: ACCORD_HREF,
    effectiveFrom: EFFECTIVE,
  }),
];

/**
 * Grille ingénieurs et cadres.
 * Position 2.1 : deux coefficients selon l'âge (annexe classification IC).
 */
export const SYNTEC_IC_ROWS: SyntecGridRow[] = [
  withSmicFlag({
    category: "IC",
    position: "1.1",
    coefficient: 95,
    monthlyGrossCents: 213_500,
    sourceHref: ACCORD_HREF,
    effectiveFrom: EFFECTIVE,
  }),
  withSmicFlag({
    category: "IC",
    position: "1.2",
    coefficient: 100,
    monthlyGrossCents: 224_000,
    sourceHref: ACCORD_HREF,
    effectiveFrom: EFFECTIVE,
  }),
  withSmicFlag({
    category: "IC",
    position: "2.1",
    coefficient: 105,
    monthlyGrossCents: 231_500,
    note: "Moins de 26 ans",
    sourceHref: ACCORD_HREF,
    effectiveFrom: EFFECTIVE,
  }),
  withSmicFlag({
    category: "IC",
    position: "2.1",
    coefficient: 115,
    monthlyGrossCents: 253_000,
    note: "26 ans au moins",
    sourceHref: ACCORD_HREF,
    effectiveFrom: EFFECTIVE,
  }),
  withSmicFlag({
    category: "IC",
    position: "2.2",
    coefficient: 130,
    monthlyGrossCents: 285_000,
    sourceHref: ACCORD_HREF,
    effectiveFrom: EFFECTIVE,
  }),
  withSmicFlag({
    category: "IC",
    position: "2.3",
    coefficient: 150,
    monthlyGrossCents: 327_500,
    sourceHref: ACCORD_HREF,
    effectiveFrom: EFFECTIVE,
  }),
  withSmicFlag({
    category: "IC",
    position: "3.1",
    coefficient: 170,
    monthlyGrossCents: 365_000,
    sourceHref: ACCORD_HREF,
    effectiveFrom: EFFECTIVE,
  }),
  withSmicFlag({
    category: "IC",
    position: "3.2",
    coefficient: 210,
    monthlyGrossCents: 449_500,
    sourceHref: ACCORD_HREF,
    effectiveFrom: EFFECTIVE,
  }),
  withSmicFlag({
    category: "IC",
    position: "3.3",
    coefficient: 270,
    monthlyGrossCents: 575_500,
    sourceHref: ACCORD_HREF,
    effectiveFrom: EFFECTIVE,
  }),
];

/** Lignes ETAM : position (* si sous SMIC), coefficient, minimum brut. */
export function etamTableRows(): string[][] {
  return SYNTEC_ETAM_ROWS.map((row) => [
    row.belowSmic ? `${row.position}*` : row.position,
    String(row.coefficient),
    formatSyntecEuro(row.monthlyGrossCents),
  ]);
}

/** Lignes IC : position, coefficient, minimum brut (sans colonne de notes vides). */
export function icTableRows(): string[][] {
  return SYNTEC_IC_ROWS.map((row) => [
    row.position,
    String(row.coefficient),
    formatSyntecEuro(row.monthlyGrossCents),
  ]);
}

export function etamBelowSmicPositions(): string[] {
  return SYNTEC_ETAM_ROWS.filter((row) => row.belowSmic).map((row) => row.position);
}

/** Exemples pédagogiques (hypothèses fictives, montants sourcés). */
export const SYNTEC_EXAMPLES = {
  etamFullTime: {
    position: "2.2",
    coefficient: 310,
    monthlyGrossCents: 190_500,
  },
  /** Contrôle annuel : minimum 2 185 €, paie mensuelle retenue 2 100 €. */
  annualControl: {
    position: "3.1",
    coefficient: 400,
    monthlyMinimumCents: 218_500,
    monthlyRetainedCents: 210_000,
    months: 12,
  },
  etamPartTime: {
    position: "3.1",
    coefficient: 400,
    monthlyGrossCents: 218_500,
    ratio: 0.8,
    weeklyHours: 28,
    referenceWeeklyHours: 35,
  },
  cadreForfaitJours: {
    position: "3.1",
    coefficient: 170,
    monthlyGrossCents: 365_000,
    rate: 1.2,
  },
  /** Illustration distincte : même dispositif, autre classification (122 %). */
  cadreForfaitJoursPosition23: {
    position: "2.3",
    coefficient: 150,
    monthlyGrossCents: 327_500,
    rate: 1.22,
  },
} as const;

export function partTimeMinimumCents(fullTimeCents: number, ratio: number): number {
  return Math.round(fullTimeCents * ratio);
}

export function forfaitAnnualMinimumCents(
  monthlyGrossCents: number,
  rate: number,
): number {
  return Math.round(monthlyGrossCents * 12 * rate);
}

export function forfaitMonthlyEquivalentCents(
  monthlyGrossCents: number,
  rate: number,
): number {
  return Math.round(monthlyGrossCents * rate);
}

export function annualReferenceCents(monthlyMinimumCents: number, months = 12): number {
  return monthlyMinimumCents * months;
}

export function annualRetainedCents(monthlyRetainedCents: number, months = 12): number {
  return monthlyRetainedCents * months;
}

export function monthlyFloor95Cents(monthlyMinimumCents: number): number {
  return Math.round(monthlyMinimumCents * 0.95);
}

export const SYNTEC_SMIC_CONTEXT = {
  monthlyGrossLabel: SMIC_LABELS.monthlyGross,
  effectiveFromLabel: SMIC_EFFECTIVE_FROM_LABEL,
  verifiedOnLabel: SMIC_VERIFIED_ON_LABEL,
  monthlyHoursLabel: SMIC_LABELS.monthlyHours,
  monthlyHours: SMIC_MONTHLY_HOURS,
} as const;
