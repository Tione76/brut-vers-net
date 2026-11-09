/**
 * Données et calculs du guide /indemnite-rupture-conventionnelle.
 * Exemples pédagogiques (salaire de référence 2 500 €) distincts d'un barème universel.
 */

import { roundCent } from "@/site/salary-calculator";

export const RC_SLUG = "indemnite-rupture-conventionnelle";
export const RC_PATH = "/indemnite-rupture-conventionnelle";
export const RC_BREADCRUMB = "Indemnité de rupture conventionnelle";

export const RC_H1 =
  "Indemnité de rupture conventionnelle : quel montant pouvez-vous toucher ?";

export const RC_SEO_TITLE =
  "Indemnité de rupture conventionnelle : montant et calcul (mis à jour)";

export const RC_META_DESCRIPTION =
  "Quel montant pour une rupture conventionnelle ? Comprenez le minimum, le calcul, les prélèvements et les sommes versées à votre départ.";

export const RC_SUBTITLE =
  "Minimum légal, salaire de référence, négociation, prélèvements et autres sommes dues au départ.";

/** Publication initiale du guide. */
export const RC_PUBLISHED_AT = "2026-11-08";

/** Dernière mise à jour éditoriale. */
export const RC_UPDATED_AT = "2026-11-08";

/** Date de contrôle des sources pour ce guide. */
export const RC_SOURCES_CHECKED_ON = "2026-11-08";
export const RC_SOURCES_CHECKED_ON_LABEL = "8 novembre 2026";

/** Salaire de référence mensuel brut des exemples pédagogiques. */
export const RC_EXAMPLE_REFERENCE_SALARY = 2500;

/** PASS 2026 (métropole / outre-mer hors Mayotte). */
export const RC_PASS_2026 = 48060;
export const RC_PASS_2_2026 = RC_PASS_2026 * 2;
export const RC_PASS_6_2026 = RC_PASS_2026 * 6;
export const RC_PASS_10_2026 = RC_PASS_2026 * 10;

/** Contribution patronale spécifique (L. 137-12), taux pour fin de contrat après le 1er janvier 2026. */
export const RC_EMPLOYER_CONTRIBUTION_RATE_2026 = 0.4;

/** Diviseur Unédic du différé spécifique pour 2026. */
export const RC_UNEMPLOYMENT_SPECIFIC_DELAY_DIVISOR_2026 = 111.8;

/** Plafond courant du différé spécifique (hors motif économique). */
export const RC_UNEMPLOYMENT_SPECIFIC_DELAY_CAP_DAYS = 150;

export const RC_SOURCES = {
  servicePublicRc: {
    label: "Rupture conventionnelle (secteur privé)",
    org: "Service-Public.fr",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F19030",
  },
  servicePublicIndemnite: {
    label: "Calcul de l'indemnité spécifique de rupture conventionnelle",
    org: "Service-Public.fr",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31539",
  },
  codeR1234_1: {
    label: "Code du travail : article R. 1234-1",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/code-du-travail/r1234-1",
  },
  codeR1234_2: {
    label: "Code du travail : article R. 1234-2",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/code-du-travail/r1234-2",
  },
  codeR1234_4: {
    label: "Code du travail : article R. 1234-4",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/code-du-travail/r1234-4",
  },
  codeL1237_13: {
    label: "Code du travail : article L. 1237-13",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/code-du-travail/l1237-13",
  },
  codeL1237_14: {
    label: "Code du travail : article L. 1237-14",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/code-du-travail/l1237-14",
  },
  telerc: {
    label: "TéléRC",
    org: "Ministère du Travail",
    href: "https://www.telerc.travail.gouv.fr/",
  },
  telercFaq: {
    label: "FAQ TéléRC",
    org: "Ministère du Travail",
    href: "https://www.telerc.travail.gouv.fr/espace-documentaire/faq",
  },
  cdtnSimulator: {
    label: "Simulateur d'indemnité de rupture conventionnelle",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/outils/indemnite-rupture-conventionnelle",
  },
  urssafPass: {
    label: "Plafonds de la Sécurité sociale",
    org: "Urssaf.fr",
    href: "https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/plafonds-securite-sociale.html",
  },
  urssafRc: {
    label: "Les indemnités de rupture conventionnelle",
    org: "Urssaf.fr",
    href: "https://www.urssaf.fr/accueil/employeur/embaucher-gerer-salaries/gerer-fin-relation-travail/rupture-conventionnelle.html",
  },
  urssafNouvelleAnnee: {
    label: "Ce qu'il faut savoir au 1er janvier 2026",
    org: "Urssaf.fr",
    href: "https://www.urssaf.fr/accueil/actualites/informations-nouvelle-annee.html",
  },
  telercRcInfo: {
    label: "Information sur la rupture conventionnelle",
    org: "TéléRC",
    href: "https://www.telerc.travail.gouv.fr/espace-documentaire/rupture-conventionnelle",
  },
  unedicDiffere: {
    label: "Différé d'indemnisation spécifique (indemnités supra-légales)",
    org: "Unédic",
    href: "https://www.unedic.org/la-reglementation/fiches-thematiques/differe-dindemnisation-specifique-en-cas-dindemnites-supra-legales",
  },
  unedicRc: {
    label: "Rupture conventionnelle et assurance chômage",
    org: "Unédic",
    href: "https://www.unedic.org/la-reglementation/fiches-thematiques/rupture-conventionnelle",
  },
  franceTravailRc: {
    label: "Je veux faire une rupture conventionnelle",
    org: "France Travail",
    href: "https://www.francetravail.fr/candidat/mes-droits-aux-aides-et-allocati/a-chaque-situation-son-allocatio/quelle-est-ma-situation-professi/je-perds-ou-je-quitte-un-emploi/je-veux-faire-une-rupture-conven.html",
  },
  servicePublicChomage2026: {
    label: "Rupture conventionnelle : durée maximale d'indemnisation au 1er septembre 2026",
    org: "Service-Public.fr",
    href: "https://www.service-public.gouv.fr/particuliers/actualites/A18945",
  },
  impotsIndemnites: {
    label: "Indemnités de licenciement et assimilées",
    org: "impots.gouv.fr",
    href: "https://www.impots.gouv.fr/particulier/indemnites-de-licenciement",
  },
  bofipRc: {
    label: "BOFiP : indemnité de rupture conventionnelle",
    org: "BOFiP-Impôts",
    href: "https://bofip.impots.gouv.fr/bofip/4935-PGP.html",
  },
} as const;

export function formatRcEuro(value: number, digits = 2): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
    .format(value)
    .replace(/\u202f|\u00a0| /g, "\u00a0");
}

/** Affichage lisible : sans ,00 inutiles dans les phrases. */
export function formatRcEuroReadable(value: number): string {
  const rounded = roundCent(value);
  const digits = Number.isInteger(rounded) ? 0 : 2;
  return formatRcEuro(rounded, digits);
}

/**
 * Plancher issu de la formule légale (R. 1234-1 et R. 1234-2) :
 * 1/4 de mois par année jusqu'à 10 ans, 1/3 au-delà.
 * `years` peut être fractionnaire (ex. 2,5 pour 2 ans et 6 mois).
 */
export function legalSeveranceGross(
  referenceMonthlyGross: number,
  years: number,
): number {
  if (!Number.isFinite(referenceMonthlyGross) || !Number.isFinite(years) || years <= 0) {
    return 0;
  }
  const firstBandYears = Math.min(years, 10);
  const beyondTenYears = Math.max(years - 10, 0);
  const amount =
    referenceMonthlyGross * 0.25 * firstBandYears +
    referenceMonthlyGross * (1 / 3) * beyondTenYears;
  return roundCent(amount);
}

/** Ancienneté en années à partir de mois complets (prorata R. 1234-1). */
export function yearsFromCompleteMonths(months: number): number {
  if (!Number.isFinite(months) || months <= 0) return 0;
  return months / 12;
}

export type RcLegalExampleRow = {
  seniorityLabel: string;
  years: number;
  calculation: string;
  amount: number;
};

export function rcLegalExampleRows(
  referenceMonthlyGross: number = RC_EXAMPLE_REFERENCE_SALARY,
): RcLegalExampleRow[] {
  const specs: Array<{ seniorityLabel: string; years: number; calculation: string }> = [
    {
      seniorityLabel: "1 an",
      years: 1,
      calculation: `${formatRcEuroReadable(referenceMonthlyGross)}\u00a0€ × 1/4 × 1`,
    },
    {
      seniorityLabel: "3 ans",
      years: 3,
      calculation: `${formatRcEuroReadable(referenceMonthlyGross)}\u00a0€ × 1/4 × 3`,
    },
    {
      seniorityLabel: "5 ans",
      years: 5,
      calculation: `${formatRcEuroReadable(referenceMonthlyGross)}\u00a0€ × 1/4 × 5`,
    },
    {
      seniorityLabel: "10 ans",
      years: 10,
      calculation: `${formatRcEuroReadable(referenceMonthlyGross)}\u00a0€ × 1/4 × 10`,
    },
    {
      seniorityLabel: "15 ans",
      years: 15,
      calculation: `S × 1/4 × 10 + S × 1/3 × 5`,
    },
    {
      seniorityLabel: "20 ans",
      years: 20,
      calculation: `S × 1/4 × 10 + S × 1/3 × 10`,
    },
  ];

  return specs.map((row) => ({
    ...row,
    amount: legalSeveranceGross(referenceMonthlyGross, row.years),
  }));
}

/**
 * Différé spécifique Unédic : part supra-légale ÷ diviseur de l'année.
 * Le règlement retient le nombre entier de jours (la fraction n'est pas comptée) ;
 * les exemples de la fiche Unédic sont cohérents avec cette règle
 * (ex. 1 372 ÷ 111,8 → 12 jours).
 */
export function unemploymentSpecificDelayDays(
  supraLegalGross: number,
  divisor: number = RC_UNEMPLOYMENT_SPECIFIC_DELAY_DIVISOR_2026,
  capDays: number = RC_UNEMPLOYMENT_SPECIFIC_DELAY_CAP_DAYS,
): number {
  if (!Number.isFinite(supraLegalGross) || supraLegalGross <= 0) return 0;
  if (!Number.isFinite(divisor) || divisor <= 0) return 0;
  const raw = Math.floor(supraLegalGross / divisor);
  return Math.min(raw, capDays);
}

/** Affichage du diviseur Unédic avec virgule française (111,8). */
export function formatRcDivisor(
  value: number = RC_UNEMPLOYMENT_SPECIFIC_DELAY_DIVISOR_2026,
): string {
  return String(value).replace(".", ",");
}
