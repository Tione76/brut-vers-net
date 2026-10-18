/**
 * Source de vérité : /prime-de-noel
 *
 * Au 18 octobre 2026, aucun décret 2026 n'a été trouvé sur Légifrance.
 * Les barèmes et dates ci-dessous sont ceux de 2025 (dernière référence officielle).
 *
 * Divergence documentaire Mayotte / AER :
 * - Service-Public F1325 et A14502 présentent l'AER à Mayotte (forfait 76,23 €).
 * - Le décret n° 2025-1213, article 1, cite expressément l'ASS et la prime forfaitaire,
 *   pas l'AER (malgré une mention dans le paragraphe « Objet »).
 */

export const PRIME_DE_NOEL_SLUG = "prime-de-noel";
export const PRIME_DE_NOEL_PATH = "/prime-de-noel";
export const PRIME_DE_NOEL_BREADCRUMB = "Prime de Noël";

/** Vérification documentaire réelle. */
export const PRIME_DE_NOEL_VERIFIED_ON = "2026-10-18";
export const PRIME_DE_NOEL_VERIFIED_ON_LABEL = "18 octobre 2026";

export const PRIME_DE_NOEL_PUBLISHED_AT = "2026-10-18";
export const PRIME_DE_NOEL_UPDATED_AT = "2026-10-18";

export const PRIME_DE_NOEL_SEO_TITLE =
  "Prime de Noël : montant, date et conditions (mis à jour)";

export const PRIME_DE_NOEL_H1 =
  "Prime de Noël 2026 : montant, date de versement et conditions";

export const PRIME_DE_NOEL_META_DESCRIPTION =
  "Prime de Noël 2026 : qui peut en bénéficier ? Consultez les derniers montants officiels, les conditions CAF, MSA et France Travail et les dates connues.";

export const PRIME_DE_NOEL_SUBTITLE =
  "Barèmes officiels 2025, conditions CAF / MSA / France Travail, et démarches utiles.";

/**
 * true uniquement lorsqu'un décret (ou barème officiel) 2026 est publié.
 * false : afficher le barème 2025 comme dernière référence connue.
 */
export const PRIME_DE_NOEL_YEAR_2026_CONFIRMED = false;

/** Année du barème réellement affiché dans les tableaux. */
export const PRIME_DE_NOEL_BAREME_YEAR = 2025;

export const PRIME_DE_NOEL_BAREME_CAPTION =
  "Barème officiel 2025 : dernière référence confirmée";

export const PRIME_DE_NOEL_STATUS_NOTICE =
  "Au 18 octobre 2026, les montants et la date de versement de la prime de Noël 2026 n'ont pas encore été officiellement annoncés. Les tableaux ci-dessous présentent les derniers barèmes confirmés, ceux de 2025.";

/** Date de versement 2025 pour les droits de novembre (campagne 2025). */
export const PRIME_DE_NOEL_PAYMENT_DATE_2025_LABEL = "16 décembre 2025";

export const FORFAIT_ASS_AER_GENERAL = 152.45;
export const FORFAIT_ASS_AER_MAYOTTE = 76.23;

export const SERVICE_PUBLIC_F1325 =
  "https://www.service-public.fr/particuliers/vosdroits/F1325";
export const SERVICE_PUBLIC_A14502 =
  "https://www.service-public.gouv.fr/particuliers/actualites/A14502";
export const LEGIFRANCE_2025_1212 =
  "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000053021069";
export const LEGIFRANCE_2025_1213 =
  "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000053021109";
export const FRANCE_TRAVAIL_PRIME =
  "https://www.francetravail.fr/candidat/mes-droits-aux-aides-et-allocati/aides-financieres-et-autres-allo/aide-exceptionnelle-de-fin-danne.html";
export const FRANCE_TRAVAIL_HOME = "https://www.francetravail.fr/";
export const CAF_HOME = "https://www.caf.fr/";
export const MSA_HOME = "https://www.msa.fr/";
export const CAF_COMMUNIQUE_2025 =
  "https://www.caf.fr/sites/default/files/medias/cnaf/251215primedeNoel.pdf";
export const INFO_GOUV_2025 =
  "https://www.info.gouv.fr/actualite/prime-de-noel-2025-montant-date-de-versement-et-beneficiaires";
/** Amendement PLF 2026 : opposition à la restriction aux foyers avec enfants. */
export const ASSEMBLEE_AMENDEMENT_PLF_2026 =
  "https://www.assemblee-nationale.fr/dyn/17/amendements/1906C/AN/3362";
/** Annonce gouvernementale relayée par l'AFP (28 janvier 2026). */
export const TF1_AFP_PRIME_2026_28_JANVIER =
  "https://www.tf1info.fr/politique/la-prime-de-noel-2026-conservee-pour-tous-les-beneficiaires-meme-s-ils-n-ont-pas-d-enfant-2421374.html";

export const SOURCES = [
  {
    org: "Service-Public",
    title: "Prime de Noël : comment en bénéficier ?",
    href: SERVICE_PUBLIC_F1325,
    date: "vérifié le 15 décembre 2025",
    about:
      "Conditions, barèmes RSA métropole / outre-mer et Mayotte, ASS / AER, versement automatique, non-imposition.",
  },
  {
    org: "Service-Public",
    title: "Ce qu'il faut savoir sur la prime de Noël 2025",
    href: SERVICE_PUBLIC_A14502,
    date: "mis à jour le 15 décembre 2025",
    about:
      "Calendrier 2025 et barème RSA hors Mayotte jusqu'à cinq enfants (457,35 € / 503,09 €).",
  },
  {
    org: "Assemblée nationale",
    title: "Amendement n° II-3362 au PLF 2026 (prime de Noël)",
    href: ASSEMBLEE_AMENDEMENT_PLF_2026,
    date: "déposé le 20 novembre 2025",
    about:
      "Contexte budgétaire : opposition au projet de réserver la prime aux foyers avec enfants à charge.",
  },
  {
    org: "TF1 Info / AFP",
    title: "Prime de Noël 2026 conservée pour tous les bénéficiaires",
    href: TF1_AFP_PRIME_2026_28_JANVIER,
    date: "28 janvier 2026",
    about:
      "Annonce gouvernementale : abandon de la restriction aux foyers avec enfants ; pas un barème réglementaire.",
  },
  {
    org: "Légifrance",
    title: "Décret n° 2025-1212 du 12 décembre 2025",
    href: LEGIFRANCE_2025_1212,
    date: "12 décembre 2025",
    about:
      "Aide exceptionnelle hors Mayotte : RSA (montant non nul), ASS, AER, prime forfaitaire. Forfait ASS / AER / prime forfaitaire 152,45 €. Une aide par foyer.",
  },
  {
    org: "Légifrance",
    title: "Décret n° 2025-1213 du 12 décembre 2025",
    href: LEGIFRANCE_2025_1213,
    date: "12 décembre 2025",
    about:
      "Aide exceptionnelle à Mayotte : RSA (montant non nul), ASS et prime forfaitaire (art. 1). Forfait 76,23 €. L'AER n'est pas citée à l'article 1.",
  },
  {
    org: "France Travail",
    title: "Aide exceptionnelle de fin d'année dite prime de Noël",
    href: FRANCE_TRAVAIL_PRIME,
    date: "campagne 2025",
    about:
      "ASS, AER et prime forfaitaire ; forfait 152,45 € (76,23 € à Mayotte) ; versement automatique à partir du 16 décembre 2025.",
  },
  {
    org: "CAF",
    title: "Communiqué prime de Noël (15 décembre 2025)",
    href: CAF_COMMUNIQUE_2025,
    date: "15 décembre 2025",
    about: "Communication institutionnelle sur le versement 2025.",
  },
  {
    org: "info.gouv.fr",
    title: "Prime de Noël 2025 : montant, date et bénéficiaires",
    href: INFO_GOUV_2025,
    date: "2025",
    about: "Synthèse gouvernementale de la campagne 2025.",
  },
] as const;

/**
 * Ordre H2 : montants, éligibilité, versement, organismes, cas, Mayotte,
 * vérification, démarches, fiscalité, puis FAQ / conclusion / sources.
 */
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
