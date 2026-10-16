/**
 * Source de vérité éditoriale : /prime-activite
 *
 * Barème métropole / DROM (hors particularités Mayotte signalées).
 * Vérifié le 16 octobre 2026 contre Service-Public, CAF, décrets 2026-222
 * et 2026-713, et circulaires CNAF. Ne pas aligner ces dates sur la date de build.
 *
 * publishedAt / updatedAt : dates de première mise en ligne prévues.
 * À aligner si le déploiement production a lieu un autre jour.
 */

export const PRIME_ACTIVITE_SLUG = "prime-activite";
export const PRIME_ACTIVITE_PATH = "/prime-activite";
export const PRIME_ACTIVITE_BREADCRUMB = "Prime d'activité";

export const PRIME_ACTIVITE_EDITORIAL_YEAR = 2026;

/** Vérification documentaire réelle (pas une date de mise en ligne). */
export const PRIME_ACTIVITE_VERIFIED_ON = "2026-10-16";
export const PRIME_ACTIVITE_VERIFIED_ON_LABEL = "16 octobre 2026";

/**
 * Première publication effective : à confirmer au déploiement.
 * Tant que la page n'est pas en production, ces constantes restent locales.
 */
export const PRIME_ACTIVITE_PUBLISHED_AT = "2026-10-15";
export const PRIME_ACTIVITE_UPDATED_AT = "2026-10-16";

export const PRIME_ACTIVITE_SEO_TITLE =
  "Prime d'activité : montants et plafonds (mis à jour)";

export const PRIME_ACTIVITE_H1 =
  "Prime d'activité 2026 : montants, plafonds et conditions";

export const PRIME_ACTIVITE_META_DESCRIPTION =
  "Prime d'activité : découvrez les montants, plafonds, conditions et changements en vigueur. Comprenez le calcul et vérifiez vos droits auprès de la CAF.";

export const PRIME_ACTIVITE_SUBTITLE =
  "Conditions, barème officiel, déclaration trimestrielle et simulateur de la CAF, sans calculateur maison.";

/** Décret n° 2026-222 : revalorisation 0,8 % et réforme de la bonification. */
export const PRIME_ACTIVITE_REFORM_FROM = "2026-04-01";
export const PRIME_ACTIVITE_REFORM_FROM_LABEL = "1er avril 2026";

/** Montant forfaitaire personne seule, décret 2026-222 art. 1. */
export const FORFAIT_SEUL = 638.28;
export const FORFAIT_SEUL_PREVIOUS = 633.21;
/**
 * Forfait Mayotte personne seule : décret n° 2026-713 du 31 juillet 2026, art. 1.
 * Applicable aux montants calculés à partir d'août 2026 (art. 4).
 */
export const FORFAIT_MAYOTTE = 460;
export const FORFAIT_MAYOTTE_FROM_LABEL = "août 2026";
export const FORFAIT_MAYOTTE_PREVIOUS = 319.14;

export const REVALORISATION_PERCENT = 0.8;

/** Part des revenus professionnels ajoutée dans la formule (Service-Public). */
export const REVENUS_PRO_RATE_PERCENT = 59.85;

/** Seuil de non-versement (Service-Public, art. D. 846-2 CSS). */
export const SEUIL_NON_VERSEMENT = 15;

/**
 * Bonification individuelle, article D. 843-2 CSS (décret 2026-222).
 * Borne basse : 59 × SMIC horaire brut. Borne haute : 138 × SMIC horaire brut (1,15 SMIC).
 * Montant max : 37,7 % du forfait de base.
 * Conversions en euros : SMIC horaire 12,31 € depuis le 1er juin 2026.
 */
export const SMIC_HOURLY_JAN = 12.02;
export const SMIC_HOURLY_JUN = 12.31;
export const BONIFICATION_HOURS_MIN = 59;
export const BONIFICATION_HOURS_MAX = 138;
export const BONIFICATION_MIN_INCOME = 726.29;
export const BONIFICATION_MAX_INCOME = 1698.78;
export const BONIFICATION_MAX_AMOUNT = 240.63;
export const BONIFICATION_MAX_RATE_PERCENT = 37.7;

/**
 * Conversions CNAF IT 2026-080 et barème CAF, calculées avec le SMIC du 1er janvier
 * (12,02 € × 59 h et × 138 h). Conservées pour expliquer l'écart avec le barème de juin.
 */
export const BONIFICATION_MIN_INCOME_JAN = 709.18;
export const BONIFICATION_MAX_INCOME_JAN = 1658.76;
export const SMIC_NET_CAF_APRIL = 1442.4;

/**
 * Seuil étudiant / apprenti / élève stagiaire : 55 % du SMIC brut sur 169 h,
 * soit 78 % du SMIC net (R. 842-2 CSS, IT 2026-157).
 * Service-Public F33375 publie 1 144,21 € ; la CAF tronque à 1 144 € depuis juin 2026.
 */
export const STUDENT_INCOME_THRESHOLD = 1144.21;
export const STUDENT_INCOME_THRESHOLD_CNAF_TRUNCATED = 1144;
export const STUDENT_INCOME_THRESHOLD_JAN = 1117.26;
export const STUDENT_INCOME_THRESHOLD_MAYOTTE_FROM_JULY = 867;

export const FORFAIT_LOGEMENT = {
  onePerson: 76.59,
  twoPersons: 153.19,
  threeOrMore: 189.57,
} as const;

function nbspEuro(value: string): string {
  return value.replace(/\u202f|\u00a0| /g, "\u00a0");
}

export const FORFAIT_ROWS: { charge: string; seul: string; couple: string }[] = [
  { charge: "0", seul: nbspEuro("638,28 €"), couple: nbspEuro("957,42 €") },
  { charge: "1", seul: nbspEuro("957,42 €"), couple: nbspEuro("1 148,90 €") },
  { charge: "2", seul: nbspEuro("1 148,90 €"), couple: nbspEuro("1 340,39 €") },
  { charge: "Par personne supplémentaire", seul: nbspEuro("255,31 €"), couple: nbspEuro("255,31 €") },
];

/**
 * Forfaits majorés pour isolement (barème CAF PPA majorée).
 * Ce sont des bases de calcul, pas la prime versée.
 */
export const FORFAIT_ISOLEMENT_ROWS: {
  situation: string;
  majore: string;
}[] = [
  { situation: "Femme isolée enceinte", majore: nbspEuro("819,63 €") },
  {
    situation: "Parent isolé avec 1 enfant à charge",
    majore: nbspEuro("1 092,84 €"),
  },
  {
    situation: "Parent isolé avec 2 enfants à charge",
    majore: nbspEuro("1 366,05 €"),
  },
];

export const CAF_SIMULATOR_HREF = "https://wwwd.caf.fr/wps/portal/caffr/simulateurpa/";
export const CAF_DEMARCHES_HREF =
  "https://www.caf.fr/allocataires/aides-et-demarches/mes-demarches";
export const CAF_CTA_LABEL = "Accéder aux démarches et simulations de la CAF";
export const CAF_CTA_INTRO =
  "Le montant de la prime d'activité dépend de votre salaire, mais aussi de votre situation familiale, de votre logement et des autres ressources de votre foyer. Pour obtenir une estimation personnalisée, utilisez le simulateur officiel de la CAF.";

export const SOURCES = [
  {
    org: "Service-Public",
    title: "Prime d'activité : salarié ou fonctionnaire",
    href: "https://www.service-public.fr/particuliers/vosdroits/F2882",
    date: "1er juin 2026",
    about: "Conditions, forfaits, formule, bonification à 726,29 € / 1 698,78 € / 240,63 € et démarches CAF / MSA.",
  },
  {
    org: "Service-Public",
    title: "Prime d'activité : étudiant, stagiaire, apprenti",
    href: "https://www.service-public.fr/particuliers/vosdroits/F33375",
    date: "1er juin 2026",
    about: "Seuil de revenu d'activité 1 144,21 € et exclusion de la gratification de stage.",
  },
  {
    org: "Service-Public",
    title: "Quelles sont les ressources prises en compte pour le calcul du droit à la prime d'activité ?",
    href: "https://www.service-public.fr/particuliers/vosdroits/F39753",
    date: "1er juillet 2026",
    about: "Ressources du foyer et montant net social.",
  },
  {
    org: "Service-Public",
    title: "La prime d'activité revalorisée en 2026",
    href: "https://www.service-public.fr/particuliers/actualites/A18815",
    date: "mise à jour le 22 juillet 2026",
    about: "Actualité qui cite encore 2 000 € et 3 450 € comme exemples de sortie, et 1 117,26 € pour les étudiants.",
  },
  {
    org: "Légifrance",
    title: "Décret n° 2026-222 du 30 mars 2026",
    href: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000053733855",
    date: "30 mars 2026",
    about: "Forfait 638,28 €, bonification à 37,7 % et 138 fois le SMIC horaire. Initialement hors Mayotte (art. 4).",
  },
  {
    org: "Légifrance",
    title: "Décret n° 2026-713 du 31 juillet 2026",
    href: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054594347",
    date: "31 juillet 2026",
    about: "Convergence Mayotte : forfait 460 € pour une personne seule, applicable aux montants calculés à partir d'août 2026. Alignement de paramètres de bonification.",
  },
  {
    org: "CAF",
    title: "La prime d'activité augmente en 2026",
    href: "https://www.caf.fr/allocataires/actualites/actualites-nationales/la-prime-d-activite-augmente-en-2026",
    date: "7 avril 2026",
    about: "Calendrier des versements et montant net social. Antérieur au décret Mayotte 2026-713.",
  },
  {
    org: "CAF",
    title: "Les réponses à vos questions sur l'évolution de la prime d'activité en 2026",
    href: "https://www.caf.fr/allocataires/actualites/actualites-nationales/les-reponses-vos-questions-sur-l-evolution-de-la-prime-d-activite-en-2026",
    date: "3 juillet 2026",
    about: "Palier 1,15 SMIC actualisé à 1 698,78 €. Les DROM y sont cités sans réserver Mayotte.",
  },
  {
    org: "CNAF",
    title: "IT 2026-080 : modification du calcul de la bonification",
    href: "https://www.caf.fr/sites/default/files/medias/cnaf/Nous_connaitre/qui%20sommes%20nous/Textes%20de%20r%C3%A9f%C3%A9rence/Circulaires/2026/IT-%202026-080.pdf",
    date: "2 avril 2026",
    about: "59 et 138 SMIC horaire, 240,63 €, point de sortie indicatif passant d'environ 2 000 € à 2 151 €. Champ : métropole et DOM, hors Mayotte.",
  },
  {
    org: "CNAF",
    title: "IT 2026-157 : seuil apprentis, étudiants et élèves stagiaires",
    href: "https://www.caf.fr/sites/default/files/medias/cnaf/Nous_connaitre/qui%20sommes%20nous/Textes%20de%20r%C3%A9f%C3%A9rence/Circulaires/2026/IT%202026-157.pdf",
    date: "2 juillet 2026",
    about: "55 % du SMIC brut sur 169 h. Troncature à 1 144 € depuis juin 2026. Exception : conjoint et bénéficiaires de la PPA majorée. Mayotte : 867 € au 1er juillet 2026.",
  },
  {
    org: "Ministère du Travail et des Solidarités",
    title: "Revalorisation annuelle des prestations sociales au 1er avril 2026",
    href: "https://solidarites.gouv.fr/revalorisation-annuelle-des-prestations-sociales-au-1er-avril-2026",
    date: "31 mars 2026",
    about: "Forfait métropole 638,28 €. Le montant Mayotte indiqué sur cette page ministérielle est antérieur au décret n° 2026-713 (460 € à partir d'août 2026).",
  },
  {
    org: "economie.gouv.fr",
    title: "Prime d'activité : pouvez-vous en bénéficier ?",
    href: "https://www.economie.gouv.fr/particuliers/vie-en-entreprise/prime-dactivite-pouvez-vous-en-beneficier",
    date: "31 mars 2026",
    about: "Formule, forfait 638,28 € et forfait logement. Les seuils étudiants (1 117,26 €) et de bonification (709,18 €) n'ont pas été actualisés après le SMIC de juin 2026.",
  },
  {
    org: "CAF",
    title: "Barème prime d'activité",
    href: "https://www.caf.fr/professionnels/offres-et-services/accompagnement-des-allocataires/bareme-prime-d-activite",
    date: "forfaits 2026, bonification encore convertie au 1er janvier",
    about: "Forfaits non majorés, forfaits majorés d'isolement (819,63 € / 1 092,84 € / 1 366,05 €) et forfaits logement. Bornes de bonification encore à 709,18 € et 1 658,76 €.",
  },
  {
    org: "CAF",
    title: "Simulateur prime d'activité",
    href: CAF_SIMULATOR_HREF,
    date: "interface officielle consultée le 16 octobre 2026",
    about: "Estimation indicative, sans conservation des données saisies.",
  },
] as const;

export const PRIME_ACTIVITE_SEO_TITLE_LENGTH = PRIME_ACTIVITE_SEO_TITLE.length;
export const PRIME_ACTIVITE_META_LENGTH = PRIME_ACTIVITE_META_DESCRIPTION.length;

/**
 * Groupes visuels du sommaire : indices sur la liste H2 existante.
 * N'altère ni l'ordre des sections ni les ancres.
 */
export const PRIME_ACTIVITE_TOC_GROUPS = [
  { title: "Comprendre la prime", icon: "help" as const, start: 0, end: 4 },
  { title: "Montants et calcul", icon: "calculator" as const, start: 4, end: 8 },
  { title: "Déclarations et démarches", icon: "clipboard" as const, start: 8, end: 12 },
  {
    title: "Vérifier ses droits et aller plus loin",
    icon: "badge" as const,
    start: 12,
    end: 16,
  },
];
