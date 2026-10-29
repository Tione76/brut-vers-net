/**
 * Source de vérité éditoriale : /salaire-minimum-belgique
 *
 * Title SEO evergreen (sans année, avec « (mis à jour) »).
 * H1 et contenu portent l'année éditoriale des données vérifiées.
 *
 * Checklist de maintenance (ne pas afficher au lecteur) :
 * - nouveau montant du RMMMG (tableau CNT des montants des CCT) ;
 * - avenants à la CCT n° 43 (montant de base) et à la CCT n° 50 ;
 * - indexation du RMMMG (indice-pivot, communiqué CNT) vs indexation sectorielle ;
 * - barème étudiant / jeunes publié par le SPF Emploi ;
 * - quota Student at Work (heures à cotisations réduites) ;
 * - comparaison France : SMIC_CURRENT du site ;
 * - FAQ, H1, dates published/updated/verified ;
 * - fiche Belgique de /smic-europe (méthode Eurostat inchangée).
 * Pas de bascule automatique au 1er janvier sans texte applicable.
 */

import { SMIC_CURRENT, SMIC_EFFECTIVE_FROM_LABEL } from "@/site/smic/data";
import {
  formatBeEuro,
  formatBeHourly,
  formatBeMonthly,
  formatBePercent,
  indicativeHourlyFromMonthly,
  percentDiffVsBase,
  prorataOfficialMonthly,
} from "./engine";

export const BE_MIN_WAGE_SLUG = "salaire-minimum-belgique";
export const BE_MIN_WAGE_PATH = "/salaire-minimum-belgique";

export const BE_MIN_WAGE_EDITORIAL_YEAR = 2026;

/**
 * Dates éditoriales (YYYY-MM-DD).
 * - PUBLISHED_AT : date de première mise en ligne réelle. À figer une fois publiée ;
 *   ne pas la modifier lors des mises à jour ultérieures.
 * - UPDATED_AT : à avancer seulement en cas de changement réel du contenu.
 * JSON-LD : datetime complet pour éviter le placeholder partagé T09:00:00+02:00,
 * inexact le 29 octobre 2026 (CET, UTC+1, après le changement d'heure).
 * 00:00:00+01:00 marque le jour civil à Paris, pas une heure de mise en ligne mesurée.
 * À confirmer au jour réel de publication.
 */
export const BE_MIN_WAGE_PUBLISHED_AT = "2026-10-29T00:00:00+01:00";
export const BE_MIN_WAGE_UPDATED_AT = "2026-10-29T00:00:00+01:00";
export const BE_MIN_WAGE_UPDATED_AT_LABEL = "29 octobre 2026";

export const BE_MIN_WAGE_SOURCES_VERIFIED_AT = "2026-10-29";
export const BE_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL = "29 octobre 2026";

export const BE_MIN_WAGE_H1 =
  "Salaire minimum en Belgique en 2026 : montants et règles";

export const BE_MIN_WAGE_SEO_TITLE = "Salaire minimum en Belgique : montants et règles (mis à jour)";

export const BE_MIN_WAGE_META_DESCRIPTION =
  "Consultez le revenu minimum mensuel moyen garanti (RMMMG) en Belgique : montant brut actuel, barèmes sectoriels et règles utiles pour les salariés et les frontaliers.";

export const BE_MIN_WAGE_BREADCRUMB = "Salaire minimum Belgique";

export const BE_MIN_WAGE_SUBTITLE =
  "Revenu minimum mensuel moyen garanti, barèmes de commission paritaire et règles pour les salariés et les frontaliers.";

/** Durée hebdomadaire de référence pour l'équivalent horaire indicatif du SPF. */
export const BE_RMMMG_FULL_TIME_WEEKLY = 38;

/** Cotisation ONSS personnelle de base (hors bonus à l'emploi). */
export const BE_ONSS_PERSONAL_RATE = 0.1307;
export const BE_ONSS_PERSONAL_RATE_LABEL = "13,07 %";

/** Quota d'heures étudiant à cotisations réduites (Student at Work, depuis le 1er janvier 2025). */
export const BE_STUDENT_REDUCED_HOURS = 650;
export const BE_STUDENT_REDUCED_HOURS_FROM = "2025-01-01";
export const BE_STUDENT_REDUCED_HOURS_FROM_LABEL = "1er janvier 2025";

/**
 * RMMMG actuellement applicable (indexation du 1er juillet 2026).
 * Source : tableau CNT des montants des CCT au 1er juillet 2026.
 * Ne pas confondre avec le montant de base de la CCT n° 43 coordonnée (2 189,81 €).
 */
export const BE_RMMMG_CURRENT_FROM = "2026-07-01";
export const BE_RMMMG_CURRENT_FROM_LABEL = "1er juillet 2026";
export const BE_RMMMG_ADULT_MONTHLY = 2233.61;
/** Horaire publié par le SPF Emploi (page contrat d'occupation d'étudiants), référence 38 h. */
export const BE_RMMMG_ADULT_HOURLY = 13.5644;

/** Palier 2026 n° 1 : indexation. */
export const BE_RMMMG_JAN_FROM = "2026-01-01";
export const BE_RMMMG_JAN_FROM_LABEL = "1er janvier 2026";
export const BE_RMMMG_JAN_MONTHLY = 2154.11;
export const BE_RMMMG_JAN_NATURE = "Indexation";

/**
 * Palier 2026 n° 2 : relevé du montant de base (CCT n° 43/18 du 24 mars 2026,
 * 3e phase de l'accord social de 2021). Ce chiffre reste le montant de base
 * inscrit dans la version coordonnée de mai 2026 ; il n'est plus le montant indexé actuel.
 */
export const BE_RMMMG_APR_FROM = "2026-04-01";
export const BE_RMMMG_APR_FROM_LABEL = "1er avril 2026";
export const BE_RMMMG_APR_MONTHLY = 2189.81;
export const BE_RMMMG_APR_NATURE = "Relevé du montant de base (CCT n° 43/18)";
export const BE_RMMMG_JUL_NATURE = "Indexation";

/** CCT n° 50 : pourcentages officiels (SPF Emploi, tableau étudiants, 1er juillet 2026). */
export const BE_STUDENT_PCT_21 = 100;
export const BE_STUDENT_PCT_20 = 90;
export const BE_STUDENT_PCT_19 = 85;
export const BE_STUDENT_PCT_18 = 79;
export const BE_STUDENT_PCT_17 = 73;
export const BE_STUDENT_PCT_16 = 67;

/** Mensuels et horaires publiés par le SPF (références temps plein, 1er juillet 2026). */
export const BE_STUDENT_20_MONTHLY = 2010.25;
export const BE_STUDENT_20_HOURLY = 12.2079;
export const BE_STUDENT_19_MONTHLY = 1898.57;
export const BE_STUDENT_19_HOURLY = 11.5297;
export const BE_STUDENT_18_MONTHLY = 1764.55;
export const BE_STUDENT_18_HOURLY = 10.7158;
export const BE_STUDENT_17_MONTHLY = 1630.54;
export const BE_STUDENT_17_HOURLY = 9.902;
export const BE_STUDENT_16_MONTHLY = 1496.52;
export const BE_STUDENT_16_HOURLY = 9.0881;

export const BE_RMMMG_PART_TIME_EXAMPLE_HOURS = 19;
export const BE_RMMMG_PART_TIME_EXAMPLE_MONTHLY = prorataOfficialMonthly(
  BE_RMMMG_ADULT_MONTHLY,
  BE_RMMMG_PART_TIME_EXAMPLE_HOURS,
  BE_RMMMG_FULL_TIME_WEEKLY,
);

export const BE_COMPARE_FR_HOURLY = SMIC_CURRENT.hourlyGross;
export const BE_COMPARE_FR_MONTHLY = SMIC_CURRENT.monthlyGross;
export const BE_COMPARE_FR_FROM_LABEL = SMIC_EFFECTIVE_FROM_LABEL;
export const BE_COMPARE_HOURLY_PCT_VS_FR = percentDiffVsBase(
  BE_RMMMG_ADULT_HOURLY,
  BE_COMPARE_FR_HOURLY,
);

/**
 * Eurostat earn_mw_cur, semestre 2026-S2, situation au 1er juillet 2026.
 * Confirmé dans l'API officielle : Belgique, EUR, valeur 2234, mise à jour 31 juillet 2026.
 */
export const BE_EUROSTAT_PERIOD = "2026-S2";
export const BE_EUROSTAT_PERIOD_LABEL = "1er juillet 2026";
export const BE_EUROSTAT_MONTHLY = 2234;
export const BE_EUROSTAT_DATASET = "earn_mw_cur";

export const BE_MIN_WAGE_LABELS = {
  adultMonthly: formatBeEuro(BE_RMMMG_ADULT_MONTHLY),
  adultMonthlyLong: formatBeMonthly(BE_RMMMG_ADULT_MONTHLY),
  adultHourly: formatBeEuro(BE_RMMMG_ADULT_HOURLY, 4),
  adultHourlyLong: formatBeHourly(BE_RMMMG_ADULT_HOURLY),
  janMonthly: formatBeEuro(BE_RMMMG_JAN_MONTHLY),
  aprMonthly: formatBeEuro(BE_RMMMG_APR_MONTHLY),
  student20Monthly: formatBeEuro(BE_STUDENT_20_MONTHLY),
  student20Hourly: formatBeEuro(BE_STUDENT_20_HOURLY, 4),
  student19Monthly: formatBeEuro(BE_STUDENT_19_MONTHLY),
  student19Hourly: formatBeEuro(BE_STUDENT_19_HOURLY, 4),
  student18Monthly: formatBeEuro(BE_STUDENT_18_MONTHLY),
  student18Hourly: formatBeEuro(BE_STUDENT_18_HOURLY, 4),
  student17Monthly: formatBeEuro(BE_STUDENT_17_MONTHLY),
  student17Hourly: formatBeEuro(BE_STUDENT_17_HOURLY, 4),
  student16Monthly: formatBeEuro(BE_STUDENT_16_MONTHLY),
  student16Hourly: formatBeEuro(BE_STUDENT_16_HOURLY, 4),
  partTime19Monthly: formatBeEuro(BE_RMMMG_PART_TIME_EXAMPLE_MONTHLY),
  weeklyHours: BE_RMMMG_FULL_TIME_WEEKLY.toLocaleString("fr-FR"),
  studentHours: BE_STUDENT_REDUCED_HOURS.toLocaleString("fr-FR"),
  onssRate: BE_ONSS_PERSONAL_RATE_LABEL,
  frHourly: formatBeHourly(BE_COMPARE_FR_HOURLY),
  frHourlyShort: formatBeEuro(BE_COMPARE_FR_HOURLY),
  frMonthly35: formatBeEuro(BE_COMPARE_FR_MONTHLY),
  hourlyPctVsFr: formatBePercent(BE_COMPARE_HOURLY_PCT_VS_FR),
  eurostatMonthly: formatBeEuro(BE_EUROSTAT_MONTHLY, 0),
};

/** Contrôle interne : l'horaire SPF doit coller à mensuel / (38 × 52 / 12). */
export const BE_RMMMG_ADULT_HOURLY_FROM_MONTHLY = indicativeHourlyFromMonthly(
  BE_RMMMG_ADULT_MONTHLY,
  BE_RMMMG_FULL_TIME_WEEKLY,
);

export const BE_MIN_WAGE_AMOUNTS_BLOCK_TITLE =
  "L'essentiel sur le salaire minimum en Belgique en 2026";

export const BE_MIN_WAGE_SOURCES = {
  spfSalaire: {
    org: "SPF Emploi",
    label: "Salaire et revenu minimum mensuel moyen garanti",
    href: "https://emploi.belgique.be/fr/themes/remuneration/salaire",
  },
  cntMontants: {
    org: "CNT",
    label: "Montants des CCT (actualisation au 1er juillet 2026)",
    href: "https://cnt-nar.be/fr/documents/montants-des-cct",
  },
  cntTableauJuillet: {
    org: "CNT",
    label: "Tableau des montants des CCT au 1er juillet 2026 (PDF)",
    href: "https://cnt-nar.be/sites/default/files/documents/fr/Tableau-Tabel-Montants%20CCT-CAO%20Bedragen-2026-07-01.pdf",
  },
  cntDossier: {
    org: "CNT",
    label: "Dossier thématique salaire minimum (principes ; montant d'avril non actualisé en juillet)",
    href: "https://cnt-nar.be/fr/dossiers-thematiques/salaire-minimum",
  },
  cct43: {
    org: "CNT",
    label: "CCT n° 43, version coordonnée (mai 2026)",
    href: "https://cnt-nar.be/sites/default/files/documents/fr/CCT%20n%C2%B0%2043%20%28Version%20coordonn%C3%A9e%29%20-%20mai%202026.pdf",
  },
  salairesMin: {
    org: "SPF Emploi",
    label: "Banque de données des salaires minimums par commission paritaire",
    href: "https://www.salairesminimums.be/",
  },
  spfBaremes: {
    org: "SPF Emploi",
    label: "Salaires minimums par (sous-)commission paritaire",
    href: "https://emploi.belgique.be/fr/themes/remuneration/salaires-minimums-par-sous-commission-paritaire",
  },
  spfBaremesInfo: {
    org: "SPF Emploi",
    label: "Information concernant la banque de données et la CCT n° 50",
    href: "https://emploi.belgique.be/fr/themes/remuneration/salaires-minimums-par-sous-commission-paritaire/information-concernant-la",
  },
  spfStudent: {
    org: "SPF Emploi",
    label: "Contrat d'occupation d'étudiants (barème de référence au 1er juillet 2026)",
    href: "https://emploi.belgique.be/fr/themes/contrats-de-travail/contrats-de-travail-particuliers/contrat-doccupation-detudiants",
  },
  studentAtWork: {
    org: "Student at Work",
    label: "Quota d'heures et impact des cotisations",
    href: "https://www.studentatwork.be/fr/quota-heures-et-impact.html",
  },
  onssWorkbonus: {
    org: "ONSS",
    label: "Bonus à l'emploi (instructions ONSS)",
    href: "https://www.socialsecurity.be/employer/instructions/dmfa/fr/latest/instructions/deductions/workers_reductions/workbonus",
  },
  spfIndexation: {
    org: "SPF Emploi",
    label: "Indexation automatique des salaires",
    href: "https://emploi.belgique.be/fr/themes/remuneration/indexation-automatique-des-salaires",
  },
  spfDureeTravail: {
    org: "SPF Emploi",
    label: "Durée du travail et diminution de la durée du travail",
    href: "https://emploi.belgique.be/fr/themes/reglementation-du-travail/duree-du-travail-et-temps-de-repos/duree-du-travail-et-diminution",
  },
  spfPrecompte: {
    org: "SPF Finances",
    label: "Calcul du précompte professionnel",
    href: "https://finances.belgium.be/fr/entreprises/personnel_et_remuneration/precompte_professionnel/calcul",
  },
  taxCalc: {
    org: "SPF Finances",
    label: "Tax-Calc, estimation de l'impôt",
    href: "https://finances.belgium.be/fr/E-services/Tax-calc",
  },
  smicFr: {
    org: "Service-Public.fr",
    label: "SMIC (fiche F2300)",
    href: "https://www.service-public.fr/particuliers/vosdroits/F2300",
  },
  eurostatEarnMw: {
    org: "Eurostat",
    label: "Salaires minima mensuels (earn_mw_cur, 2026-S2, situation au 1er juillet 2026)",
    href: "https://ec.europa.eu/eurostat/databrowser/view/earn_mw_cur/default/table?lang=fr",
  },
};
