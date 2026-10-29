/**
 * Source de vérité éditoriale : /salaire-minimum-espagne
 *
 * Title SEO evergreen (sans année, avec « (mis à jour) »).
 * H1 et contenu portent l'année éditoriale des données vérifiées.
 *
 * Checklist de maintenance (ne pas afficher au lecteur) :
 * - nouveau décret annuel du SMI (BOE) ;
 * - règles de compensation et d'absorption (art. 3 du décret + art. 26-27 ET) ;
 * - durée du travail (art. 34 ET : 40 h, pas 37,5 h tant que non publiée) ;
 * - fiscalité IRPF si mentionnée (DA 61ª LIRPF / décret-loi de l'année) ;
 * - régimes particuliers (contrats ≤ 120 jours, emploi à domicile) ;
 * - comparaison France : SMIC_CURRENT du site ;
 * - FAQ, H1, dates published/updated/verified ;
 * - fiche Espagne de /smic-europe (méthode Eurostat inchangée).
 * Pas de bascule automatique au 1er janvier sans texte applicable.
 */

import { SMIC_CURRENT, SMIC_EFFECTIVE_FROM_LABEL } from "@/site/smic/data";
import {
  annualFromFourteenPayments,
  formatEsEuro,
  formatEsPercent,
  percentDiffVsBase,
  prorataOfficialAmount,
  twelveFromFourteenPayments,
} from "./engine";

export const ES_MIN_WAGE_SLUG = "salaire-minimum-espagne";
export const ES_MIN_WAGE_PATH = "/salaire-minimum-espagne";

export const ES_MIN_WAGE_EDITORIAL_YEAR = 2026;

/**
 * Dates éditoriales.
 * - PUBLISHED_AT : date de première mise en ligne réelle. À figer une fois publiée.
 * - UPDATED_AT : à avancer seulement en cas de changement réel du contenu.
 * JSON-LD : datetime complet pour éviter le placeholder partagé T09:00:00+02:00,
 * inexact le 29 octobre 2026 (CET, UTC+1).
 * 00:00:00+01:00 marque le jour civil à Paris, pas une heure de mise en ligne mesurée.
 * Première mise en ligne : 29 octobre 2026.
 */
export const ES_MIN_WAGE_PUBLISHED_AT = "2026-10-29T00:00:00+01:00";
export const ES_MIN_WAGE_UPDATED_AT = "2026-10-29T00:00:00+01:00";
export const ES_MIN_WAGE_UPDATED_AT_LABEL = "29 octobre 2026";

export const ES_MIN_WAGE_SOURCES_VERIFIED_AT = "2026-10-29";
export const ES_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL = "29 octobre 2026";

export const ES_MIN_WAGE_H1 =
  "Salaire minimum en Espagne en 2026 : montants et règles";

export const ES_MIN_WAGE_SEO_TITLE =
  "Salaire minimum en Espagne : montants et règles (mis à jour)";

export const ES_MIN_WAGE_META_DESCRIPTION =
  "Consultez le salario mínimo interprofesional (SMI) en Espagne : 1 221 € brut par versement sur 14 paies, ou 1 424,50 € sur 12, et les règles utiles pour les salariés et les frontaliers.";

export const ES_MIN_WAGE_BREADCRUMB = "Salaire minimum Espagne";

export const ES_MIN_WAGE_SUBTITLE =
  "Salario mínimo interprofesional, 12 ou 14 versements, et règles pour les salariés et les frontaliers.";

/** Décret actuellement applicable. */
export const ES_SMI_DECREE_DATE = "2026-02-18";
export const ES_SMI_DECREE_DATE_LABEL = "18 février 2026";
export const ES_SMI_PUBLISHED_ON = "2026-02-19";
export const ES_SMI_PUBLISHED_ON_LABEL = "19 février 2026";
export const ES_SMI_IN_FORCE_FROM = "2026-02-20";
export const ES_SMI_IN_FORCE_FROM_LABEL = "20 février 2026";

/** Effets rétroactifs : le montant 2026 s'applique depuis le 1er janvier. */
export const ES_SMI_EFFECTS_FROM = "2026-01-01";
export const ES_SMI_EFFECTS_FROM_LABEL = "1er janvier 2026";
export const ES_SMI_EFFECTS_UNTIL = "2026-12-31";
export const ES_SMI_EFFECTS_UNTIL_LABEL = "31 décembre 2026";

export const ES_SMI_INCREASE_PERCENT = 3.1;
export const ES_SMI_INCREASE_PERCENT_LABEL = "3,1 %";
export const ES_SMI_INCREASE_PER_PAYMENT = 37;
export const ES_SMI_INCREASE_ANNUAL = 518;

/**
 * SMI 2026, Real Decreto 126/2026, article 1.
 * 1 221 € par mois lorsque le salaire est fixé au mois ; 40,70 € par jour
 * lorsque le salaire est fixé au jour (hors part des dimanches et fêtes).
 */
export const ES_SMI_FOURTEEN_MONTHLY = 1221;
export const ES_SMI_DAILY = 40.7;
export const ES_SMI_PAYMENTS_FOURTEEN = 14;
export const ES_SMI_PAYMENTS_TWELVE = 12;

/** Plancher annuel du décret (art. 3.1) : 1 221 × 14. */
export const ES_SMI_ANNUAL = annualFromFourteenPayments(ES_SMI_FOURTEEN_MONTHLY);

/** Équivalent pédagogique sur 12 versements : 1 221 × 14 / 12. */
export const ES_SMI_TWELVE_MONTHLY = twelveFromFourteenPayments(ES_SMI_FOURTEEN_MONTHLY);

/**
 * Contrats à durée déterminée dont les services à une même entreprise
 * n'excèdent pas 120 jours (art. 4.1 du décret). Inclut dimanches, fêtes
 * et deux gratifications extraordinaires.
 */
export const ES_SMI_SHORT_CONTRACT_MAX_DAYS = 120;
export const ES_SMI_SHORT_CONTRACT_DAILY = 57.82;

/**
 * Emploi à domicile payé à l'heure, régime externe
 * (art. 4.2 du décret, RD 1620/2011). Inclut tous les éléments de rémunération.
 * Ce n'est pas le salaire horaire minimum de tous les salariés.
 */
export const ES_SMI_DOMESTIC_HOURLY = 9.55;

/** SMI 2025, Real Decreto 87/2025, article 1. */
export const ES_SMI_PREVIOUS_FOURTEEN_MONTHLY = 1184;
export const ES_SMI_PREVIOUS_DAILY = 39.47;
export const ES_SMI_PREVIOUS_ANNUAL = 16576;

/**
 * Durée maximale ordinaire de travail (art. 34.1 ET) :
 * 40 heures par semaine de travail effectif en moyenne annuelle.
 * Ce n'est pas forcément le temps plein conventionnel applicable.
 */
export const ES_LEGAL_MAX_WEEKLY_HOURS = 40;

/** Exemple pédagogique : mi-temps d'un temps plein comparable de 40 h. */
export const ES_PART_TIME_EXAMPLE_HOURS = 20;
export const ES_PART_TIME_EXAMPLE_FULL_TIME_HOURS = ES_LEGAL_MAX_WEEKLY_HOURS;
export const ES_PART_TIME_EXAMPLE_FOURTEEN = prorataOfficialAmount(
  ES_SMI_FOURTEEN_MONTHLY,
  ES_PART_TIME_EXAMPLE_HOURS,
  ES_PART_TIME_EXAMPLE_FULL_TIME_HOURS,
);
export const ES_PART_TIME_EXAMPLE_TWELVE = prorataOfficialAmount(
  ES_SMI_TWELVE_MONTHLY,
  ES_PART_TIME_EXAMPLE_HOURS,
  ES_PART_TIME_EXAMPLE_FULL_TIME_HOURS,
);
export const ES_PART_TIME_EXAMPLE_ANNUAL = prorataOfficialAmount(
  ES_SMI_ANNUAL,
  ES_PART_TIME_EXAMPLE_HOURS,
  ES_PART_TIME_EXAMPLE_FULL_TIME_HOURS,
);

/**
 * Cotisations salariales 2026, Orden PJC/297/2026.
 * Totaux : contingences communes + chômage + formation + MEI.
 */
export const ES_SS_WORKER_CC = 0.047;
export const ES_SS_WORKER_UNEMP_INDEF = 0.0155;
export const ES_SS_WORKER_UNEMP_TEMP = 0.016;
export const ES_SS_WORKER_FP = 0.001;
export const ES_SS_WORKER_MEI = 0.0015;
export const ES_SS_WORKER_INDEF_TOTAL =
  ES_SS_WORKER_CC + ES_SS_WORKER_UNEMP_INDEF + ES_SS_WORKER_FP + ES_SS_WORKER_MEI;
export const ES_SS_WORKER_TEMP_TOTAL =
  ES_SS_WORKER_CC + ES_SS_WORKER_UNEMP_TEMP + ES_SS_WORKER_FP + ES_SS_WORKER_MEI;
export const ES_SS_WORKER_CC_LABEL = "4,70 %";
export const ES_SS_WORKER_UNEMP_INDEF_LABEL = "1,55 %";
export const ES_SS_WORKER_UNEMP_TEMP_LABEL = "1,60 %";
export const ES_SS_WORKER_FP_LABEL = "0,10 %";
export const ES_SS_WORKER_MEI_LABEL = "0,15 %";
export const ES_SS_WORKER_INDEF_TOTAL_LABEL = "6,50 %";
export const ES_SS_WORKER_TEMP_TOTAL_LABEL = "6,55 %";

/**
 * Déduction IRPF 2026, DA 61ª de la loi 35/2006, rédigée par l'art. 28
 * du Real Decreto-ley 5/2026. Ce n'est pas une absence de cotisations.
 */
export const ES_IRPF_SMI_DEDUCTION = 590.89;
export const ES_IRPF_WORK_INCOME_PHASE_OUT = 20048.45;
export const ES_IRPF_OTHER_INCOME_LIMIT = 6500;
export const ES_IRPF_REDUCTION_RATE = 0.2;

export const ES_COMPARE_FR_HOURLY = SMIC_CURRENT.hourlyGross;
export const ES_COMPARE_FR_MONTHLY = SMIC_CURRENT.monthlyGross;
export const ES_COMPARE_FR_ANNUAL = SMIC_CURRENT.annualGross;
export const ES_COMPARE_FR_FROM_LABEL = SMIC_EFFECTIVE_FROM_LABEL;
export const ES_COMPARE_ANNUAL_PCT_VS_FR = percentDiffVsBase(
  ES_SMI_ANNUAL,
  ES_COMPARE_FR_ANNUAL,
);
export const ES_COMPARE_TWELVE_PCT_VS_FR = percentDiffVsBase(
  ES_SMI_TWELVE_MONTHLY,
  ES_COMPARE_FR_MONTHLY,
);

/**
 * Eurostat earn_mw_cur, semestre 2026-S2, situation au 1er juillet 2026.
 * Même série que /smic-europe : 1 221 × 14 / 12 = 1 424,50, arrondi à 1 425.
 */
export const ES_EUROSTAT_PERIOD = "2026-S2";
export const ES_EUROSTAT_PERIOD_LABEL = "1er juillet 2026";
export const ES_EUROSTAT_MONTHLY = 1425;
export const ES_EUROSTAT_DATASET = "earn_mw_cur";

export const ES_MIN_WAGE_LABELS = {
  fourteenMonthly: formatEsEuro(ES_SMI_FOURTEEN_MONTHLY, 0),
  twelveMonthly: formatEsEuro(ES_SMI_TWELVE_MONTHLY),
  annual: formatEsEuro(ES_SMI_ANNUAL, 0),
  annualExact: formatEsEuro(ES_SMI_ANNUAL),
  daily: formatEsEuro(ES_SMI_DAILY),
  shortContractDaily: formatEsEuro(ES_SMI_SHORT_CONTRACT_DAILY),
  domesticHourly: formatEsEuro(ES_SMI_DOMESTIC_HOURLY),
  previousFourteen: formatEsEuro(ES_SMI_PREVIOUS_FOURTEEN_MONTHLY, 0),
  previousAnnual: formatEsEuro(ES_SMI_PREVIOUS_ANNUAL, 0),
  increasePerPayment: formatEsEuro(ES_SMI_INCREASE_PER_PAYMENT, 0),
  increaseAnnual: formatEsEuro(ES_SMI_INCREASE_ANNUAL, 0),
  partTimeFourteen: formatEsEuro(ES_PART_TIME_EXAMPLE_FOURTEEN),
  partTimeTwelve: formatEsEuro(ES_PART_TIME_EXAMPLE_TWELVE),
  partTimeAnnual: formatEsEuro(ES_PART_TIME_EXAMPLE_ANNUAL, 0),
  weeklyHours: ES_LEGAL_MAX_WEEKLY_HOURS.toLocaleString("fr-FR"),
  partTimeHours: ES_PART_TIME_EXAMPLE_HOURS.toLocaleString("fr-FR"),
  irpfDeduction: formatEsEuro(ES_IRPF_SMI_DEDUCTION),
  irpfPhaseOut: formatEsEuro(ES_IRPF_WORK_INCOME_PHASE_OUT),
  irpfOtherIncome: formatEsEuro(ES_IRPF_OTHER_INCOME_LIMIT, 0),
  ssIndef: ES_SS_WORKER_INDEF_TOTAL_LABEL,
  ssTemp: ES_SS_WORKER_TEMP_TOTAL_LABEL,
  frHourly: formatEsEuro(ES_COMPARE_FR_HOURLY),
  frMonthly35: formatEsEuro(ES_COMPARE_FR_MONTHLY),
  frAnnual: formatEsEuro(ES_COMPARE_FR_ANNUAL),
  annualPctVsFr: formatEsPercent(Math.abs(ES_COMPARE_ANNUAL_PCT_VS_FR)),
  twelvePctVsFr: formatEsPercent(ES_COMPARE_TWELVE_PCT_VS_FR),
  eurostatMonthly: formatEsEuro(ES_EUROSTAT_MONTHLY, 0),
  increasePercent: ES_SMI_INCREASE_PERCENT_LABEL,
};

export const ES_MIN_WAGE_AMOUNTS_BLOCK_TITLE =
  "L'essentiel sur le salaire minimum en Espagne en 2026";

export const ES_MIN_WAGE_SOURCES = {
  rd126: {
    org: "BOE",
    label: "Real Decreto 126/2026, de 18 de febrero, salario mínimo interprofesional para 2026",
    href: "https://www.boe.es/eli/es/rd/2026/02/18/126/con",
  },
  rd126Consulta: {
    org: "BOE",
    label: "Version consolidée BOE-A-2026-3815",
    href: "https://www.boe.es/buscar/act.php?id=BOE-A-2026-3815",
  },
  rd87: {
    org: "BOE",
    label: "Real Decreto 87/2025, salario mínimo interprofesional para 2025",
    href: "https://www.boe.es/eli/es/rd/2025/02/11/87",
  },
  estatuto: {
    org: "BOE",
    label: "Estatuto de los Trabajadores, texte refondu (RDL 2/2015)",
    href: "https://www.boe.es/eli/es/rdlg/2015/10/23/2/con",
  },
  mitesPress: {
    org: "Ministère du Travail",
    label: "Conseil des ministres : hausse de 3,1 % du SMI à 1 221 €",
    href: "https://prensa.mites.gob.es/webPrensa/listado-noticia/noticia/4505",
  },
  oeitss: {
    org: "Inspection du travail (OEITSS)",
    label: "Droits des personnes travaillant en Espagne, SMI et versements extraordinaires",
    href: "https://oeitss.gob.es/informacion-y-normativa/informacion-personas-trabajadoras-extranjeras/espanol/informacion-general",
  },
  regcon: {
    org: "MITES",
    label: "REGCON, registre officiel des conventions collectives",
    href: "https://expinterweb.mites.gob.es/regcon/",
  },
  regconConsulta: {
    org: "MITES",
    label: "Consultation publique REGCON",
    href: "https://expinterweb.mites.gob.es/regcon/pub/consultaPublica",
  },
  ssCotizacion: {
    org: "Sécurité sociale",
    label: "Bases et types de cotisation 2026",
    href: "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/CotizacionRecaudacionTrabajadores/36537/36556",
  },
  ordenCotizacion: {
    org: "BOE",
    label: "Orden PJC/297/2026, normes de cotisation pour 2026",
    href: "https://www.boe.es/buscar/act.php?id=BOE-A-2026-7296",
  },
  rdl5: {
    org: "BOE",
    label: "Real Decreto-ley 5/2026, article 28 (déduction IRPF liée au SMI)",
    href: "https://www.boe.es/buscar/act.php?id=BOE-A-2026-3810",
  },
  haciendaPress: {
    org: "Ministère des Finances",
    label: "Communiqué : déduction IRPF 2026 pour les bas revenus",
    href: "https://www.hacienda.gob.es/gl-ES/Prensa/Noticias/paginas/2026/20260217-np-cm-smi-deduccion-2026.aspx",
  },
  aeatInformador: {
    org: "Agencia Tributaria",
    label: "Informador de Renta",
    href: "https://www2.agenciatributaria.gob.es/wlpl/AVAC-CALC/InformadorRenta",
  },
  aeatSede: {
    org: "Agencia Tributaria",
    label: "Siège électronique de l'Agence tributaire",
    href: "https://sede.agenciatributaria.gob.es/",
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
  impotsFrontalier: {
    org: "impots.gouv.fr",
    label: "Suis-je un travailleur frontalier ?",
    href: "https://www.impots.gouv.fr/particulier/questions/suis-je-bien-un-travailleur-frontalier",
  },
  bofipEsp: {
    org: "BOFIP",
    label: "Convention fiscale France-Espagne (impôts sur le revenu et la fortune)",
    href: "https://bofip.impots.gouv.fr/bofip/3019-PGP.html/identifiant=BOI-INT-CVB-ESP-20241128",
  },
  jornadaGob: {
    org: "administracion.gob.es",
    label: "Journée de travail, congés et repos (article 34)",
    href: "https://administracion.gob.es/pag_Home/es/Tu-espacio-europeo/derechos-obligaciones/ciudadanos/trabajo-jubilacion/condiciones-trabajo/jornada-permisos.html",
  },
};
