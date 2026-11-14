/**
 * Source de vérité : /prime-de-noel
 *
 * Campagne 2026 : informations publiées par la CAF le 10 novembre 2026
 * (sous réserve de la parution du décret).
 *
 * Références 2025 (décrets, fiche Service-Public) : campagne précédente
 * et règles non encore reprises par un texte 2026.
 */

export const PRIME_DE_NOEL_SLUG = "prime-de-noel";
export const PRIME_DE_NOEL_PATH = "/prime-de-noel";
export const PRIME_DE_NOEL_BREADCRUMB = "Prime de Noël";

export const PRIME_DE_NOEL_VERIFIED_ON = "2026-11-14";
export const PRIME_DE_NOEL_VERIFIED_ON_LABEL = "14 novembre 2026";

export const PRIME_DE_NOEL_PUBLISHED_AT = "2026-10-18";
export const PRIME_DE_NOEL_UPDATED_AT = "2026-11-14";

export const PRIME_DE_NOEL_SEO_TITLE =
  "Prime de Noël : montant, date et conditions (mis à jour)";

export const PRIME_DE_NOEL_H1 =
  "Prime de Noël 2026 : montant, date de versement et conditions";

export const PRIME_DE_NOEL_META_DESCRIPTION =
  "Prime de Noël 2026 : montants et calendrier annoncés par la CAF, conditions RSA, ASS, AER et organismes payeurs (CAF, MSA, France Travail).";

export const PRIME_DE_NOEL_SUBTITLE =
  "Informations CAF pour la campagne 2026 : montants annoncés, calendrier et bénéficiaires RSA, ASS et AER.";

/** true lorsque le décret de campagne est publié au Journal officiel. */
export const PRIME_DE_NOEL_DECREE_2026_PUBLISHED = false;

/** Année de la campagne visée par les tableaux (montants annoncés CAF). */
export const PRIME_DE_NOEL_BAREME_YEAR = 2026;

export const PRIME_DE_NOEL_BAREME_CAPTION =
  "Montants annoncés par la CAF pour 2026";

export const PRIME_DE_NOEL_CAF_RESERVE =
  "Ces informations restent sous réserve de la publication du décret.";

export const CAF_PRIME_2026_URL =
  "https://www.caf.fr/allocataires/actualites/actualites-nationales/prime-de-noel";

export const PRIME_DE_NOEL_PAYMENT_FROM_NOV_LABEL = "15 décembre 2026";
export const PRIME_DE_NOEL_PAYMENT_FROM_DEC_LABEL = "janvier 2027";

/** @deprecated conservé pour les passages historiques sur la campagne 2025. */
export const PRIME_DE_NOEL_PAYMENT_DATE_2025_LABEL = "16 décembre 2025";

/** @deprecated utiliser PRIME_DE_NOEL_DECREE_2026_PUBLISHED */
export const PRIME_DE_NOEL_YEAR_2026_CONFIRMED = PRIME_DE_NOEL_DECREE_2026_PUBLISHED;

export const FORFAIT_ASS_AER_GENERAL = 152.45;
export const FORFAIT_ASS_AER_MAYOTTE = 76.23;

export const SERVICE_PUBLIC_F1325 =
  "https://www.service-public.gouv.fr/particuliers/vosdroits/F1325";
export const LEGIFRANCE_2025_1212 =
  "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000053021069";
export const LEGIFRANCE_2025_1213 =
  "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000053021109";
export const FRANCE_TRAVAIL_PRIME =
  "https://www.francetravail.fr/candidat/mes-droits-aux-aides-et-allocati/aides-financieres-et-autres-allo/aide-exceptionnelle-de-fin-danne.html";
export const FRANCE_TRAVAIL_HOME = "https://www.francetravail.fr/";
export const CAF_HOME = "https://www.caf.fr/";
export const MSA_HOME = "https://www.msa.fr/";
export const ASSEMBLEE_AMENDEMENT_PLF_2026 =
  "https://www.assemblee-nationale.fr/dyn/17/amendements/1906C/AN/3362";
export const TF1_AFP_PRIME_2026_28_JANVIER =
  "https://www.tf1info.fr/politique/la-prime-de-noel-2026-conservee-pour-tous-les-beneficiaires-meme-s-ils-n-ont-pas-d-enfant-2421374.html";

export const SOURCES_CAMPAIGN_2026 = [
  {
    org: "CAF",
    title: "Prime de Noël 2026 : tout savoir",
    href: CAF_PRIME_2026_URL,
    date: "publié le 10 novembre 2026",
  },
] as const;

export const SOURCES_HISTORIQUE_2025 = [
  {
    org: "Service-Public",
    title: "Prime de Noël : comment en bénéficier ?",
    href: SERVICE_PUBLIC_F1325,
    date: "fiche 2025 (consultée le 14 novembre 2026)",
  },
  {
    org: "Légifrance",
    title: "Décret n° 2025-1212 du 12 décembre 2025",
    href: LEGIFRANCE_2025_1212,
    date: "12 décembre 2025",
  },
  {
    org: "Légifrance",
    title: "Décret n° 2025-1213 du 12 décembre 2025",
    href: LEGIFRANCE_2025_1213,
    date: "12 décembre 2025",
  },
] as const;

type PrimeDeNoelSourceLink = {
  org: string;
  title: string;
  href: string;
  date: string;
};

function mapSourceToLinkBlock(source: PrimeDeNoelSourceLink) {
  return {
    type: "internal-link" as const,
    variant: "guide" as const,
    intro: `${source.org}, ${source.date} :`,
    label: source.title,
    href: source.href,
  };
}

/** Liens affichés dans la bibliographie du guide (groupés 2026 / historique 2025). */
export function buildPrimeDeNoelBibliographySourceBlocks() {
  return [
    {
      type: "paragraph" as const,
      text: "Informations pour la campagne 2026",
    },
    ...SOURCES_CAMPAIGN_2026.map(mapSourceToLinkBlock),
    {
      type: "paragraph" as const,
      text: "Références historiques : campagne 2025",
    },
    ...SOURCES_HISTORIQUE_2025.map(mapSourceToLinkBlock),
  ];
}

export const PRIME_DE_NOEL_TOC_GROUPS = [
  { title: "Montants et éligibilité", icon: "clipboard" as const, start: 0, end: 2 },
  { title: "Versement et organismes", icon: "clipboard" as const, start: 2, end: 4 },
  {
    title: "Cas particuliers et territoires",
    icon: "scale" as const,
    start: 4,
    end: 7,
  },
  {
    title: "Démarches, questions et sources",
    icon: "badge" as const,
    start: 7,
    end: 12,
  },
];

export function formatEuro(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

function nbspEuro(value: string): string {
  return value.replace(/\u202f|\u00a0| /g, "\u00a0");
}

export const RSA_TABLE_GENERAL_ROWS: string[][] = [
  ["0", nbspEuro("152,45 €"), nbspEuro("228,68 €")],
  ["1", nbspEuro("228,68 €"), nbspEuro("274,41 €")],
  ["2", nbspEuro("274,41 €"), nbspEuro("320,15 €")],
  ["3", nbspEuro("335,39 €"), nbspEuro("381,13 €")],
  ["4", nbspEuro("396,37 €"), nbspEuro("442,11 €")],
  ["5", nbspEuro("457,35 €"), nbspEuro("503,09 €")],
  ["Par enfant supplémentaire", nbspEuro("+60,98 €"), nbspEuro("+60,98 €")],
];

export const RSA_TABLE_MAYOTTE_ROWS: string[][] = [
  ["0", nbspEuro("76,23 €"), nbspEuro("114,35 €")],
  ["1", nbspEuro("114,35 €"), nbspEuro("137,21 €")],
  ["2", nbspEuro("137,21 €"), nbspEuro("160,08 €")],
  ["3", nbspEuro("160,08 €"), nbspEuro("182,95 €")],
  ["4", nbspEuro("167,71 €"), nbspEuro("190,58 €")],
  ["Par enfant supplémentaire", nbspEuro("+7,62 €"), nbspEuro("+7,62 €")],
];