/**
 * Source de vérité éditoriale : /salaire-minimum-monaco
 *
 * Title SEO sans année. H1 et contenu portent l'année éditoriale des données vérifiées.
 *
 * Checklist de maintenance (ne pas afficher au lecteur) :
 * - circulaire SMIC (Journal de Monaco) : horaire, mensuel 39 h / 169 h, date d'effet ;
 * - circulaire barèmes complémentaires (jeunes, majorations, avantages en nature) ;
 * - circulaire apprentis ;
 * - indemnité de 5 % (arrêté n° 63-131, fiche Caisses Sociales) ;
 * - cotisations Caisses Sociales (taux souvent distincts de la date du SMIC) ;
 * - comparaison France : SMIC_CURRENT du site ;
 * - fiche Monaco de /smic-europe (pas de chiffre Eurostat fictif).
 * Pas de bascule automatique. Dates published/updated à figer à la mise en ligne.
 */

import { SMIC_CURRENT, SMIC_EFFECTIVE_FROM_LABEL, SMIC_LABELS } from "@/site/smic/data";
import {
  exceptionAllowance,
  formatMcEuro,
  prorataOfficialMonthly,
  totalBeforeDeductions,
} from "./engine";

export const MC_MIN_WAGE_SLUG = "salaire-minimum-monaco";
export const MC_MIN_WAGE_PATH = "/salaire-minimum-monaco";

export const MC_MIN_WAGE_EDITORIAL_YEAR = 2026;

/**
 * Dates éditoriales.
 * - PUBLISHED_AT : première mise en ligne le 1er novembre 2026 (Europe/Paris).
 * - UPDATED_AT : même jour civil pour cette première version.
 */
export const MC_MIN_WAGE_PUBLISHED_AT = "2026-11-01T00:00:00+01:00";
export const MC_MIN_WAGE_UPDATED_AT = "2026-11-01T00:00:00+01:00";
export const MC_MIN_WAGE_UPDATED_AT_LABEL = "1er novembre 2026";

export const MC_MIN_WAGE_SOURCES_VERIFIED_AT = "2026-11-01";
export const MC_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL = "1er novembre 2026";

export const MC_MIN_WAGE_H1 = "Salaire minimum à Monaco en 2026 : montants et règles";

export const MC_MIN_WAGE_SEO_TITLE = "Salaire minimum à Monaco : montants et règles";

export const MC_MIN_WAGE_META_DESCRIPTION =
  "Quel est le SMIC à Monaco ? Comprenez les montants, l'indemnité de 5 %, la référence de 39 heures et les règles utiles aux salariés et frontaliers.";

export const MC_MIN_WAGE_BREADCRUMB = "Salaire minimum Monaco";

export const MC_MIN_WAGE_SUBTITLE =
  "SMIC horaire, mensuel à 39 heures, indemnité de 5 % et règles pour les salariés et les frontaliers.";

export const MC_MIN_WAGE_AMOUNTS_BLOCK_TITLE =
  "L'essentiel sur le salaire minimum à Monaco";

export const MC_SMIC_CURRENT_FROM = "2026-06-01";
export const MC_SMIC_CURRENT_FROM_LABEL = "1er juin 2026";
export const MC_SMIC_CIRCULAR_DATE_LABEL = "26 mai 2026";
export const MC_SMIC_JOURNAL_PUBLISHED_LABEL = "5 juin 2026";
export const MC_SMIC_PREVIOUS_FROM = "2026-01-01";
export const MC_SMIC_PREVIOUS_FROM_LABEL = "1er janvier 2026";

export const MC_FULL_TIME_WEEKLY = 39;
export const MC_FULL_TIME_MONTHLY_HOURS = 169;

/** Taux horaire de base publié (circulaire n° 2026-7). */
export const MC_SMIC_HOURLY = 12.31;
/** Mensuel de référence publié pour 39 h / 169 h. Ne pas le recalculer. */
export const MC_SMIC_MONTHLY = 2080.39;
/** Minimum garanti publié, distinct du SMIC. */
export const MC_MINIMUM_GARANTI = 4.35;

export const MC_SMIC_PREVIOUS_HOURLY = 12.02;
export const MC_SMIC_PREVIOUS_MONTHLY = 2031.38;

/** Indemnité de 5 % calculée sur le mensuel de référence, arrondie au centime. */
export const MC_INDEMNITY_MONTHLY = exceptionAllowance(MC_SMIC_MONTHLY);
/** Base + indemnité, avant cotisations applicables et avant impôt. */
export const MC_TOTAL_BEFORE_DEDUCTIONS = totalBeforeDeductions(MC_SMIC_MONTHLY);

/** Barèmes jeunes publiés (circulaire n° 2026-8), pas recalculés. */
export const MC_YOUTH_17_HOURLY = 11.08;
export const MC_YOUTH_17_WEEKLY = 432.12;
export const MC_YOUTH_17_MONTHLY = 1872.52;
export const MC_YOUTH_16_HOURLY = 9.85;
export const MC_YOUTH_16_WEEKLY = 384.15;
export const MC_YOUTH_16_MONTHLY = 1664.65;

export const MC_ADULT_WEEKLY = 480.09;
export const MC_OVERTIME_25_HOURLY = 15.39;
export const MC_OVERTIME_50_HOURLY = 18.47;

export const MC_PART_TIME_20_HOURS = 20;
export const MC_PART_TIME_35_HOURS = 35;
export const MC_PART_TIME_20_MONTHLY = prorataOfficialMonthly(
  MC_SMIC_MONTHLY,
  MC_PART_TIME_20_HOURS,
  MC_FULL_TIME_WEEKLY,
);
export const MC_PART_TIME_20_INDEMNITY = exceptionAllowance(MC_PART_TIME_20_MONTHLY);
export const MC_PART_TIME_20_TOTAL = totalBeforeDeductions(MC_PART_TIME_20_MONTHLY);
export const MC_PART_TIME_35_MONTHLY = prorataOfficialMonthly(
  MC_SMIC_MONTHLY,
  MC_PART_TIME_35_HOURS,
  MC_FULL_TIME_WEEKLY,
);

/** Première année d'apprentissage, montants publiés (circulaire n° 2026-9), base 169 h. */
export const MC_APPRENTICE_Y1_16 = 561.71;
export const MC_APPRENTICE_Y1_18 = 894.57;
export const MC_APPRENTICE_Y1_21 = 1102.61;

export const MC_COMPARE_FR_HOURLY = SMIC_CURRENT.hourlyGross;
export const MC_COMPARE_FR_MONTHLY = SMIC_CURRENT.monthlyGross;
export const MC_COMPARE_FR_FROM_LABEL = SMIC_EFFECTIVE_FROM_LABEL;

export const MC_CAR_EMPLOYEE_RATE_LABEL = "6,85 %";
export const MC_UNEMPLOYMENT_EMPLOYEE_RATE_LABEL = "2,40 %";
export const MC_CONTRIBUTIONS_FROM_LABEL = "1er octobre 2026";
export const MC_UNEMPLOYMENT_FROM_LABEL = "1er janvier 2026";

export const MC_MIN_WAGE_LABELS = {
  hourly: formatMcEuro(MC_SMIC_HOURLY),
  monthly: formatMcEuro(MC_SMIC_MONTHLY),
  indemnity: formatMcEuro(MC_INDEMNITY_MONTHLY),
  totalBeforeDeductions: formatMcEuro(MC_TOTAL_BEFORE_DEDUCTIONS),
  minGaranti: formatMcEuro(MC_MINIMUM_GARANTI),
  previousHourly: formatMcEuro(MC_SMIC_PREVIOUS_HOURLY),
  previousMonthly: formatMcEuro(MC_SMIC_PREVIOUS_MONTHLY),
  youth17Hourly: formatMcEuro(MC_YOUTH_17_HOURLY),
  youth17Weekly: formatMcEuro(MC_YOUTH_17_WEEKLY),
  youth17Monthly: formatMcEuro(MC_YOUTH_17_MONTHLY),
  youth16Hourly: formatMcEuro(MC_YOUTH_16_HOURLY),
  youth16Weekly: formatMcEuro(MC_YOUTH_16_WEEKLY),
  youth16Monthly: formatMcEuro(MC_YOUTH_16_MONTHLY),
  adultWeekly: formatMcEuro(MC_ADULT_WEEKLY),
  overtime25: formatMcEuro(MC_OVERTIME_25_HOURLY),
  overtime50: formatMcEuro(MC_OVERTIME_50_HOURLY),
  partTime20Monthly: formatMcEuro(MC_PART_TIME_20_MONTHLY),
  partTime20Indemnity: formatMcEuro(MC_PART_TIME_20_INDEMNITY),
  partTime20Total: formatMcEuro(MC_PART_TIME_20_TOTAL),
  partTime35Monthly: formatMcEuro(MC_PART_TIME_35_MONTHLY),
  apprenticeY1_16: formatMcEuro(MC_APPRENTICE_Y1_16),
  apprenticeY1_18: formatMcEuro(MC_APPRENTICE_Y1_18),
  apprenticeY1_21: formatMcEuro(MC_APPRENTICE_Y1_21),
  frHourly: formatMcEuro(MC_COMPARE_FR_HOURLY),
  frMonthly: formatMcEuro(MC_COMPARE_FR_MONTHLY),
  frWeeklyHours: "35",
  frMonthlyHours: SMIC_LABELS.monthlyHours,
  weeklyHours: String(MC_FULL_TIME_WEEKLY),
  monthlyHours: String(MC_FULL_TIME_MONTHLY_HOURS),
  partTime20Hours: String(MC_PART_TIME_20_HOURS),
  partTime35Hours: String(MC_PART_TIME_35_HOURS),
};

export const MC_MIN_WAGE_SOURCES = {
  circular2026_7: {
    org: "Journal de Monaco",
    label: "Circulaire n° 2026-7 du 26 mai 2026, SMIC applicable au 1er juin 2026",
    href: "https://journaldemonaco.gouv.mc/Journaux/2026/Journal-8802/Circulaire-n-2026-7-du-26-mai-2026-relative-au-S.M.I.C.-Salaire-Minimum-Interprofessionnel-de-Croissance-applicable-a-compter-du-1er-juin-2026",
    documentDate: "2026-05-26",
    publishedAt: "2026-06-05",
    effectiveFrom: "2026-06-01",
    consultedAt: "2026-11-01",
    scope: "SMIC horaire, mensuel 39 h / 169 h, minimum garanti, rappel des 5 %",
  },
  circular2026_8: {
    org: "Journal de Monaco",
    label: "Circulaire n° 2026-8 du 26 mai 2026, barèmes complémentaires du SMIC",
    href: "https://journaldemonaco.gouv.mc/Journaux/2026/Journal-8802/Circulaire-n-2026-8-du-26-mai-2026-relative-au-S.M.I.C.-Salaire-Minimum-Interprofessionnel-de-Croissance-applicable-a-compter-du-1er-juin-2026",
    documentDate: "2026-05-26",
    publishedAt: "2026-06-05",
    effectiveFrom: "2026-06-01",
    consultedAt: "2026-11-01",
    scope: "Barèmes par âge, hebdomadaire, mensuel, majorations, avantages en nature",
  },
  circular2026_9: {
    org: "Journal de Monaco",
    label: "Circulaire n° 2026-9 du 26 mai 2026, rémunération minimale des apprentis",
    href: "https://journaldemonaco.gouv.mc/en/Journaux/2026/Journal-8802/Circulaire-n-2026-9-du-26-mai-2026-relative-a-la-remuneration-minimale-des-apprenti-e-s-lie-e-s-par-contrat-d-apprentissage-applicable-a-compter-du-1er-juin-2026",
    documentDate: "2026-05-26",
    publishedAt: "2026-06-05",
    effectiveFrom: "2026-06-01",
    consultedAt: "2026-11-01",
    scope: "Barème apprentis, rappel SMIC janvier et juin 2026, 5 %",
  },
  law739: {
    org: "Legimonaco",
    label: "Loi n° 739 du 16 mars 1963 sur le salaire, notamment article 11",
    href: "https://legimonaco.mc/tnc/loi/1963/03-16-739",
    documentDate: "1963-03-16",
    consultedAt: "2026-11-01",
    scope: "Salaire, minima, région économique voisine",
  },
  arretes63131: {
    org: "Legimonaco",
    label: "Arrêté ministériel n° 63-131 du 21 mai 1963 fixant les taux minima des salaires",
    href: "https://legimonaco.mc/tnc/arrete-ministeriel/1963/05-21-63-131",
    documentDate: "1963-05-21",
    consultedAt: "2026-11-01",
    scope: "Minima, indemnité exceptionnelle de 5 %, non-assujettissement social",
  },
  csmFivePercent: {
    org: "Caisses Sociales de Monaco",
    label: "Fiche Indemnité de 5 %",
    href: "https://www.caisses-sociales.mc/content/download/2201/12283",
    consultedAt: "2026-11-01",
    scope: "Caractère obligatoire et non cotisable sur les minima ; traitement d'une prime conservée au-dessus",
  },
  hours677: {
    org: "Legimonaco",
    label: "Ordonnance-loi n° 677 du 2 décembre 1959 sur la durée du travail",
    href: "https://legimonaco.mc/tnc/ordonnance-loi/1959/12-02-677",
    documentDate: "1959-12-02",
    consultedAt: "2026-11-01",
    scope: "Durée légale 39 h, majorations d'heures supplémentaires",
  },
  csmCotisations: {
    org: "Caisses Sociales de Monaco",
    label: "Cotisations des employeurs à titre professionnel",
    href: "https://www.caisses-sociales.mc/accueil/employeur/employeur/employeur-a-titre-professionnel/cotisations",
    consultedAt: "2026-11-01",
    scope: "Plafonds et taux CCSS, CAR, CMRC, assurance chômage au 1er octobre 2026",
  },
  inspection: {
    org: "Gouvernement princier",
    label: "Inspection du Travail",
    href: "https://monservicepublic.gouv.mc/thematiques/emploi/activite-salariee/relations-avec-l-entreprise/inspection-du-travail",
    consultedAt: "2026-11-01",
    scope: "Missions, contrôles des salaires, information des salariés",
  },
  inspectionRdv: {
    org: "Gouvernement princier",
    label: "Prendre rendez-vous avec l'Inspection du Travail",
    href: "https://monservicepublic.gouv.mc/thematiques/emploi/activite-salariee/informations-generales/prendre-rendez-vous-avec-l-inspection-du-travail",
    consultedAt: "2026-11-01",
    scope: "Prise de rendez-vous",
  },
  directionTravail: {
    org: "Gouvernement princier",
    label: "Direction du Travail (Service de l'Emploi et Inspection du Travail)",
    href: "https://monservicepublic.gouv.mc/annuaire-des-services-administratifs/departement-des-affaires-sociales-et-de-la-sante/direction-du-travail",
    consultedAt: "2026-11-01",
    scope: "Autorisation d'embauchage, permis de travail, loi n° 629",
  },
  bofip: {
    org: "BOFiP-Impôts",
    label: "BOI-INT-CVB-MCO-10 : convention fiscale France-Monaco, revenus des personnes physiques",
    href: "https://bofip.impots.gouv.fr/bofip/12995-PGP.html/identifiant%3DBOI-INT-CVB-MCO-10-20210602",
    documentDate: "2021-06-02",
    consultedAt: "2026-11-01",
    scope: "Résidents français, Français à Monaco, heures supplémentaires",
  },
  smicFr: {
    org: "Service-Public.fr / données du site",
    label: "SMIC français (fiche F2300, montants centralisés du site)",
    href: "https://www.service-public.fr/particuliers/vosdroits/F2300",
    consultedAt: "2026-11-01",
    scope: "Comparaison France, pas une source de droit du travail monégasque",
  },
};
