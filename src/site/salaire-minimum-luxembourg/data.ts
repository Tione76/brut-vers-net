/**
 * Source de vérité éditoriale : /salaire-minimum-luxembourg
 *
 * Title SEO evergreen (sans année, avec « (mis à jour) »).
 * H1 et contenu portent l'année éditoriale des données vérifiées.
 *
 * Checklist de maintenance (ne pas afficher au lecteur) :
 * - nouveau barème SSM (ITM / CCSS) : montants mensuels et horaires officiels ;
 * - nouvelle tranche indiciaire (index STATEC, date d'effet) ;
 * - revalorisation structurelle (projet, adoption, publication, entrée en vigueur) ;
 * - qualification professionnelle (L.222-4) et barèmes jeunes ;
 * - contrats étudiants, vacances, stages, apprentissage (ITM / Guichet) ;
 * - comparaison France : SMIC_CURRENT du site ;
 * - FAQ, H1, dates published/updated/verified ;
 * - fiche Luxembourg de /smic-europe.
 * Pas de bascule automatique à la date du jour pour un projet non encore applicable.
 */

import { SMIC_CURRENT, SMIC_EFFECTIVE_FROM_LABEL } from "@/site/smic/data";
import {
  formatLuEuro,
  formatLuHourly,
  formatLuMonthly,
  formatLuPercent,
  percentDiffVsBase,
  prorataOfficialMonthly,
} from "./engine";

export const LU_MIN_WAGE_SLUG = "salaire-minimum-luxembourg";
export const LU_MIN_WAGE_PATH = "/salaire-minimum-luxembourg";

export const LU_MIN_WAGE_EDITORIAL_YEAR = 2026;

/**
 * Dates éditoriales (YYYY-MM-DD).
 * - PUBLISHED_AT : date de première mise en ligne réelle. À figer une fois publiée ;
 *   ne pas la modifier lors des mises à jour ultérieures.
 * - UPDATED_AT : à avancer seulement en cas de changement réel du contenu.
 * Le JSON-LD complète YYYY-MM-DD en T09:00:00+02:00 (convention site, pas une heure mesurée).
 * À confirmer au jour réel de mise en ligne.
 */
export const LU_MIN_WAGE_PUBLISHED_AT = "2026-10-29";
export const LU_MIN_WAGE_UPDATED_AT = "2026-10-28";
export const LU_MIN_WAGE_UPDATED_AT_LABEL = "28 octobre 2026";

export const LU_MIN_WAGE_SOURCES_VERIFIED_AT = "2026-10-28";
export const LU_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL = "28 octobre 2026";

export const LU_MIN_WAGE_H1 =
  "Salaire minimum au Luxembourg en 2026 : montants et règles";

export const LU_MIN_WAGE_SEO_TITLE =
  "Salaire minimum au Luxembourg : montants et règles (mis à jour)";

export const LU_MIN_WAGE_META_DESCRIPTION =
  "Consultez le salaire social minimum au Luxembourg : montants brut mensuel et horaire, distinction qualifié / non qualifié, et règles essentielles pour les salariés et les frontaliers.";

export const LU_MIN_WAGE_BREADCRUMB = "Salaire minimum Luxembourg";

export const LU_MIN_WAGE_SUBTITLE =
  "Salaire social minimum : barèmes brut, qualification, indexation et règles pour les salariés et les frontaliers.";

/** Barème actuellement applicable (indexation du 1er juin 2026). */
export const LU_SSM_CURRENT_FROM = "2026-06-01";
export const LU_SSM_CURRENT_FROM_LABEL = "1er juin 2026";
export const LU_SSM_CURRENT_INDEX = 992.24;
export const LU_SSM_CURRENT_INDEX_LABEL = "992,24";
export const LU_SSM_BASE_100 = 279.3;
export const LU_SSM_LEGAL_HOURS = 173;
export const LU_SSM_FULL_TIME_WEEKLY = 40;

/** Barème précédent 2026, avant la tranche indiciaire de juin. */
export const LU_SSM_PREVIOUS_FROM = "2026-01-01";
export const LU_SSM_PREVIOUS_FROM_LABEL = "1er janvier 2026";
export const LU_SSM_PREVIOUS_INDEX = 968.04;
export const LU_SSM_PREVIOUS_INDEX_LABEL = "968,04";
export const LU_SSM_PREVIOUS_ADULT_UNSKILLED_MONTHLY = 2703.74;
export const LU_SSM_PREVIOUS_ADULT_SKILLED_MONTHLY = 3244.48;

/** Montants officiels ITM / CCSS, actuellement applicables. */
export const LU_SSM_ADULT_UNSKILLED_MONTHLY = 2771.33;
export const LU_SSM_ADULT_UNSKILLED_HOURLY = 16.0192;
export const LU_SSM_ADULT_UNSKILLED_COEFF = 1;

export const LU_SSM_ADULT_SKILLED_MONTHLY = 3325.59;
export const LU_SSM_ADULT_SKILLED_HOURLY = 19.2231;
export const LU_SSM_ADULT_SKILLED_COEFF = 1.2;

export const LU_SSM_AGE_17_MONTHLY = 2217.06;
export const LU_SSM_AGE_17_HOURLY = 12.8154;
export const LU_SSM_AGE_17_COEFF = 0.8;

export const LU_SSM_AGE_15_MONTHLY = 2078.49;
export const LU_SSM_AGE_15_HOURLY = 12.0144;
export const LU_SSM_AGE_15_COEFF = 0.75;

/**
 * Engagement d'élève / étudiant pendant les vacances (ITM D2b7) :
 * au moins 80 % du SSM applicable selon l'âge.
 */
export const LU_SSM_VACATION_ADULT_MONTHLY = 2217.06;
export const LU_SSM_VACATION_ADULT_HOURLY = 12.8154;
export const LU_SSM_VACATION_AGE_17_MONTHLY = 1773.65;
export const LU_SSM_VACATION_AGE_17_HOURLY = 10.2523;
export const LU_SSM_VACATION_AGE_15_MONTHLY = 1662.8;
export const LU_SSM_VACATION_AGE_15_HOURLY = 9.6115;

/** Projet de revalorisation structurelle : pas encore applicable. */
export const LU_SSM_BILL_2027_NUMBER = "8837";
export const LU_SSM_BILL_2027_DEPOSITED_LABEL = "5 octobre 2026";
export const LU_SSM_BILL_2027_COMMISSION_LABEL = "8 octobre 2026";
export const LU_SSM_BILL_2027_STATUS = "En commission";
export const LU_SSM_BILL_2027_PROPOSED_FROM_LABEL = "1er janvier 2027";
export const LU_SSM_BILL_2027_PROPOSED_PCT = 3.8;

export const LU_SSM_PART_TIME_EXAMPLE_HOURS = 20;
export const LU_SSM_PART_TIME_EXAMPLE_MONTHLY = prorataOfficialMonthly(
  LU_SSM_ADULT_UNSKILLED_MONTHLY,
  LU_SSM_PART_TIME_EXAMPLE_HOURS,
  LU_SSM_FULL_TIME_WEEKLY,
);

export const LU_COMPARE_FR_HOURLY = SMIC_CURRENT.hourlyGross;
export const LU_COMPARE_FR_MONTHLY = SMIC_CURRENT.monthlyGross;
export const LU_COMPARE_FR_FROM_LABEL = SMIC_EFFECTIVE_FROM_LABEL;
export const LU_COMPARE_HOURLY_PCT_VS_FR = percentDiffVsBase(
  LU_SSM_ADULT_UNSKILLED_HOURLY,
  LU_COMPARE_FR_HOURLY,
);

export const LU_EUROSTAT_PERIOD_LABEL = "1er juillet 2026";
export const LU_EUROSTAT_MONTHLY = 2771;
export const LU_EUROSTAT_DATASET = "earn_mw_cur";

export const LU_MIN_WAGE_LABELS = {
  adultUnskilledMonthly: formatLuEuro(LU_SSM_ADULT_UNSKILLED_MONTHLY),
  adultUnskilledMonthlyLong: formatLuMonthly(LU_SSM_ADULT_UNSKILLED_MONTHLY),
  adultUnskilledHourly: formatLuEuro(LU_SSM_ADULT_UNSKILLED_HOURLY, 4),
  adultUnskilledHourlyLong: formatLuHourly(LU_SSM_ADULT_UNSKILLED_HOURLY),
  adultSkilledMonthly: formatLuEuro(LU_SSM_ADULT_SKILLED_MONTHLY),
  adultSkilledMonthlyLong: formatLuMonthly(LU_SSM_ADULT_SKILLED_MONTHLY),
  adultSkilledHourly: formatLuEuro(LU_SSM_ADULT_SKILLED_HOURLY, 4),
  adultSkilledHourlyLong: formatLuHourly(LU_SSM_ADULT_SKILLED_HOURLY),
  age17Monthly: formatLuEuro(LU_SSM_AGE_17_MONTHLY),
  age17Hourly: formatLuEuro(LU_SSM_AGE_17_HOURLY, 4),
  age15Monthly: formatLuEuro(LU_SSM_AGE_15_MONTHLY),
  age15Hourly: formatLuEuro(LU_SSM_AGE_15_HOURLY, 4),
  previousUnskilledMonthly: formatLuEuro(LU_SSM_PREVIOUS_ADULT_UNSKILLED_MONTHLY),
  previousSkilledMonthly: formatLuEuro(LU_SSM_PREVIOUS_ADULT_SKILLED_MONTHLY),
  vacationAdultMonthly: formatLuEuro(LU_SSM_VACATION_ADULT_MONTHLY),
  vacationAdultHourly: formatLuEuro(LU_SSM_VACATION_ADULT_HOURLY, 4),
  vacationAge17Monthly: formatLuEuro(LU_SSM_VACATION_AGE_17_MONTHLY),
  vacationAge17Hourly: formatLuEuro(LU_SSM_VACATION_AGE_17_HOURLY, 4),
  vacationAge15Monthly: formatLuEuro(LU_SSM_VACATION_AGE_15_MONTHLY),
  vacationAge15Hourly: formatLuEuro(LU_SSM_VACATION_AGE_15_HOURLY, 4),
  partTime20Monthly: formatLuEuro(LU_SSM_PART_TIME_EXAMPLE_MONTHLY),
  legalHours: LU_SSM_LEGAL_HOURS.toLocaleString("fr-FR"),
  indexCurrent: LU_SSM_CURRENT_INDEX_LABEL,
  indexPrevious: LU_SSM_PREVIOUS_INDEX_LABEL,
  coeffSkilled: "120 %",
  coeff17: "80 %",
  coeff15: "75 %",
  billPct: formatLuPercent(LU_SSM_BILL_2027_PROPOSED_PCT),
  frHourly: formatLuHourly(LU_COMPARE_FR_HOURLY),
  frHourlyShort: formatLuEuro(LU_COMPARE_FR_HOURLY),
  frMonthly35: formatLuEuro(LU_COMPARE_FR_MONTHLY),
  hourlyPctVsFr: formatLuPercent(LU_COMPARE_HOURLY_PCT_VS_FR),
  eurostatMonthly: formatLuEuro(LU_EUROSTAT_MONTHLY, 0),
};

export const LU_MIN_WAGE_AMOUNTS_BLOCK_TITLE =
  "L'essentiel sur le salaire minimum au Luxembourg en 2026";

export const LU_MIN_WAGE_SOURCES = {
  itmSalaires: {
    org: "ITM",
    label: "Salaires (barème du salaire social minimum)",
    href: "https://itm.public.lu/fr/conditions-travail/salaires.html",
  },
  itmHourly: {
    org: "ITM",
    label: "Calcul du salaire horaire et des heures supplémentaires (D5c9)",
    href: "https://itm.public.lu/fr/questions-reponses/droit-travail/duree-travail/c/c9.html",
  },
  itmQualified: {
    org: "ITM",
    label: "Salaire social minimum pour salariés qualifiés (D4a4)",
    href: "https://itm.public.lu/fr/questions-reponses/droit-travail/remuneration/a/a4.html",
  },
  itmBenefits: {
    org: "ITM",
    label: "Avantages en nature et salaire social minimum (D4b5)",
    href: "https://itm.public.lu/fr/questions-reponses/droit-travail/remuneration/b/b5.html",
  },
  itmSalaryElements: {
    org: "ITM",
    label: "Avantages en nature comme éléments du salaire (D4b2)",
    href: "https://itm.public.lu/fr/questions-reponses/droit-travail/remuneration/b/b2.html",
  },
  indexationLu: {
    org: "luxembourg.public.lu",
    label: "Niveau des salaires et mécanisme d'indexation",
    href: "https://luxembourg.public.lu/fr/vivre/qualite-de-vie/niveau-salaires.html",
  },
  itmStudents: {
    org: "ITM",
    label: "Rémunération des élèves et étudiants (D2b7)",
    href: "https://itm.public.lu/fr/questions-reponses/droit-travail/autres-contrats/b/b7.html",
  },
  guichetSsm: {
    org: "Guichet.lu",
    label: "Salaire social minimum, qualification et indexation",
    href: "https://guichet.public.lu/fr/entreprises/ressources-humaines/remuneration/paiement-remunerations/salaire.html",
  },
  guichetVacation: {
    org: "Guichet.lu",
    label: "Contrat d'étudiant pendant les vacances scolaires",
    href: "https://guichet.public.lu/fr/entreprises/ressources-humaines/contrat-convention/jeunes-actifs/etudiant.html",
  },
  guichetStudentCdd: {
    org: "Guichet.lu",
    label: "Contrat de travail à durée déterminée pour élèves et étudiants",
    href: "https://guichet.public.lu/fr/entreprises/ressources-humaines/contrat-convention/jeunes-actifs/contrat-etudiant-cdd.html",
  },
  guichetStage: {
    org: "Guichet.lu",
    label: "Convention de stage",
    href: "https://guichet.public.lu/fr/citoyens/travail/conditions-travail/contrat-jeunes-actifs/convention-stage.html",
  },
  ccssParams: {
    org: "CCSS",
    label: "Paramètres sociaux (salaire social minimum)",
    href: "https://ccss.public.lu/fr/parametres-sociaux.html",
  },
  chd8837: {
    org: "Chambre des députés",
    label: "Projet de loi n° 8837 (revalorisation du salaire social minimum)",
    href: "https://www.chd.lu/fr/dossier/8837",
  },
  chd8837Motifs: {
    org: "Legilux",
    label: "Exposé des motifs du projet de loi n° 8837",
    href: "https://legilux.public.lu/filestore/eli/dl/pl/2026/270/doc/dexpmot/1/fr/pdf/eli-dl-pl-2026-270-doc-dexpmot-1-fr-pdf.pdf",
  },
  codeTravail: {
    org: "Legilux",
    label: "Code du travail (livres II, titres I et II)",
    href: "https://legilux.public.lu/eli/etat/leg/code/travail",
  },
  servicePublicSmic: {
    org: "Service-Public",
    label: "SMIC (F2300)",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2300",
  },
} as const;
