/**
 * Source de vérité éditoriale : /salaire-minimum-portugal
 *
 * Title SEO evergreen (sans année, avec « (mis à jour) »).
 * H1 et contenu portent l'année éditoriale des données vérifiées.
 *
 * Checklist de maintenance (ne pas afficher au lecteur) :
 * - RMMG continentale (Decreto-Lei annuel) ;
 * - textes régionaux Madère et Açores ;
 * - indemnités de vacances et de Noël (art. 263-264 CT) ;
 * - cotisations salariales du régime général ;
 * - fiscalité IRS si mentionnée (tables de retenue, minimum d'existence) ;
 * - trajectoire 2027 (accord / OE ; un futur décret ne s'applique qu'à sa date d'effet) ;
 * - comparaison France : SMIC_CURRENT du site ;
 * - FAQ, H1, dates published/updated/verified ;
 * - fiche Portugal de /smic-europe (méthode Eurostat inchangée).
 * Pas de bascule automatique sur une annonce future.
 */

import { SMIC_CURRENT, SMIC_EFFECTIVE_FROM_LABEL } from "@/site/smic/data";
import {
  annualFromFourteenPayments,
  formatPtEuro,
  formatPtPercent,
  hourlyFromMonthly,
  percentDiffVsBase,
  prorataOfficialAmount,
  twelveFromFourteenPayments,
} from "./engine";

export const PT_MIN_WAGE_SLUG = "salaire-minimum-portugal";
export const PT_MIN_WAGE_PATH = "/salaire-minimum-portugal";

export const PT_MIN_WAGE_EDITORIAL_YEAR = 2026;

/**
 * Dates éditoriales.
 * - PUBLISHED_AT : préparée pour une mise en ligne le 30 octobre 2026.
 *   La page n'est pas encore publiée tant qu'il n'y a pas commit / déploiement.
 * - UPDATED_AT : cette passe éditoriale du 30 octobre 2026.
 * JSON-LD : datetime complet, jour civil à Paris (CET, UTC+1 après le changement d'heure).
 * 00:00:00+01:00 ne prétend pas à une heure de mise en ligne mesurée.
 */
export const PT_MIN_WAGE_PUBLISHED_AT = "2026-10-30T00:00:00+01:00";
export const PT_MIN_WAGE_UPDATED_AT = "2026-10-30T00:00:00+01:00";
export const PT_MIN_WAGE_UPDATED_AT_LABEL = "30 octobre 2026";

export const PT_MIN_WAGE_SOURCES_VERIFIED_AT = "2026-10-29";
export const PT_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL = "29 octobre 2026";

export const PT_MIN_WAGE_H1 =
  "Salaire minimum au Portugal en 2026 : montants et règles";

export const PT_MIN_WAGE_SEO_TITLE =
  "Salaire minimum au Portugal : montants et règles (mis à jour)";

export const PT_MIN_WAGE_META_DESCRIPTION =
  "Consultez la retribuição mínima mensal garantida (RMMG) au Portugal : 920 € brut par mois sur le continent, 966 € aux Açores et 980 € à Madère, avec 12 mensualités et deux indemnités supplémentaires.";

export const PT_MIN_WAGE_BREADCRUMB = "Salaire minimum Portugal";

export const PT_MIN_WAGE_SUBTITLE =
  "Retribuição mínima mensal garantida, 12 ou 14 versements, et différences entre continent, Madère et Açores.";

/** Decreto-Lei n.º 139/2025, publié le 29 décembre 2025. */
export const PT_RMMG_DECREE = "Decreto-Lei n.º 139/2025";
export const PT_RMMG_PUBLISHED_ON = "2025-12-29";
export const PT_RMMG_PUBLISHED_ON_LABEL = "29 décembre 2025";
export const PT_RMMG_IN_FORCE_FROM = "2025-12-30";
export const PT_RMMG_IN_FORCE_FROM_LABEL = "30 décembre 2025";
export const PT_RMMG_EFFECTS_FROM = "2026-01-01";
export const PT_RMMG_EFFECTS_FROM_LABEL = "1er janvier 2026";
export const PT_RMMG_EFFECTS_UNTIL = "2026-12-31";
export const PT_RMMG_EFFECTS_UNTIL_LABEL = "31 décembre 2026";

/**
 * RMMG continentale 2026, DL 139/2025, articles 2 et 3.
 * Champ territorial : Portugal continental. Temps plein de référence.
 */
export const PT_RMMG_CONTINENTAL_MONTHLY = 920;
export const PT_RMMG_PAYMENTS_FOURTEEN = 14;
export const PT_RMMG_PAYMENTS_TWELVE = 12;

/** Calcul pédagogique : 920 × 14, année complète, droits complets. */
export const PT_RMMG_CONTINENTAL_ANNUAL = annualFromFourteenPayments(
  PT_RMMG_CONTINENTAL_MONTHLY,
);

/**
 * Mensualisation pédagogique du total annuel : 12 880 ÷ 12.
 * Ce n'est pas un second minimum mensuel légal.
 */
export const PT_RMMG_CONTINENTAL_TWELVE = twelveFromFourteenPayments(
  PT_RMMG_CONTINENTAL_MONTHLY,
);

/** RMMG 2025, Decreto-Lei n.º 112/2024. */
export const PT_RMMG_PREVIOUS_MONTHLY = 870;
export const PT_RMMG_PREVIOUS_ANNUAL = annualFromFourteenPayments(
  PT_RMMG_PREVIOUS_MONTHLY,
);
export const PT_RMMG_INCREASE_EUROS = 50;
export const PT_RMMG_INCREASE_PERCENT = 5.7;
export const PT_RMMG_INCREASE_PERCENT_LABEL = "5,7 %";

/**
 * Açores : acréscimo régional de 5 % sur la RMMG nationale
 * (DLR n.º 8/2002/A, art. 3, dans sa rédaction actuelle).
 * 920 × 1,05 = 966. Page régionale : effets au 1er janvier 2026.
 */
export const PT_AZORES_SURCHARGE_PERCENT = 5;
export const PT_AZORES_MONTHLY = 966;
export const PT_AZORES_ANNUAL = annualFromFourteenPayments(PT_AZORES_MONTHLY);
export const PT_AZORES_TWELVE = twelveFromFourteenPayments(PT_AZORES_MONTHLY);
export const PT_AZORES_EFFECTS_FROM_LABEL = "1er janvier 2026";

/**
 * Madère : DLR n.º 1/2026/M, art. 2 : 980 €.
 * Publication le 3 février 2026, effets au 1er janvier 2026 (art. 4).
 * Montant propre, distinct d'un simple pourcentage continental.
 */
export const PT_MADEIRA_MONTHLY = 980;
export const PT_MADEIRA_ANNUAL = annualFromFourteenPayments(PT_MADEIRA_MONTHLY);
export const PT_MADEIRA_TWELVE = twelveFromFourteenPayments(PT_MADEIRA_MONTHLY);
export const PT_MADEIRA_DECREE_PUBLISHED_ON_LABEL = "3 février 2026";
export const PT_MADEIRA_EFFECTS_FROM_LABEL = "1er janvier 2026";
export const PT_MADEIRA_PREVIOUS_MONTHLY = 915;
export const PT_MADEIRA_INCREASE_EUROS = 65;
export const PT_MADEIRA_INCREASE_PERCENT_LABEL = "7,1 %";
export const PT_MADEIRA_VS_CONTINENTAL_PERCENT_LABEL = "6,52 %";

/**
 * Durée maximale de la période normale de travail (art. 203.1 CT) :
 * 8 heures par jour et 40 heures par semaine, sous réserve du régime applicable.
 */
export const PT_LEGAL_MAX_DAILY_HOURS = 8;
export const PT_LEGAL_MAX_WEEKLY_HOURS = 40;

/** Exemple pédagogique : mi-temps d'un temps plein comparable de 40 h, continent. */
export const PT_PART_TIME_EXAMPLE_HOURS = 20;
export const PT_PART_TIME_EXAMPLE_FULL_TIME_HOURS = PT_LEGAL_MAX_WEEKLY_HOURS;
export const PT_PART_TIME_EXAMPLE_MONTHLY = prorataOfficialAmount(
  PT_RMMG_CONTINENTAL_MONTHLY,
  PT_PART_TIME_EXAMPLE_HOURS,
  PT_PART_TIME_EXAMPLE_FULL_TIME_HOURS,
);
export const PT_PART_TIME_EXAMPLE_TWELVE = prorataOfficialAmount(
  PT_RMMG_CONTINENTAL_TWELVE,
  PT_PART_TIME_EXAMPLE_HOURS,
  PT_PART_TIME_EXAMPLE_FULL_TIME_HOURS,
);
export const PT_PART_TIME_EXAMPLE_ANNUAL = prorataOfficialAmount(
  PT_RMMG_CONTINENTAL_ANNUAL,
  PT_PART_TIME_EXAMPLE_HOURS,
  PT_PART_TIME_EXAMPLE_FULL_TIME_HOURS,
);

/**
 * Exemple horaire art. 271 : Rm = 920 €, n = 40 h.
 * (920 × 12) ÷ (52 × 40).
 */
export const PT_HOURLY_EXAMPLE_MONTHLY = PT_RMMG_CONTINENTAL_MONTHLY;
export const PT_HOURLY_EXAMPLE_WEEKLY_HOURS = PT_LEGAL_MAX_WEEKLY_HOURS;
export const PT_HOURLY_EXAMPLE = hourlyFromMonthly(
  PT_HOURLY_EXAMPLE_MONTHLY,
  PT_HOURLY_EXAMPLE_WEEKLY_HOURS,
);

/**
 * Art. 275.1 a) : réduction de 20 % pour praticante, apprenti, stagiaire
 * ou pessoa em formação (formando), en formation certifiée, dans les limites de durée.
 */
export const PT_TRAINING_REDUCTION_PERCENT = 20;
export const PT_TRAINING_FLOOR_MONTHLY = roundToCent(
  PT_RMMG_CONTINENTAL_MONTHLY * (1 - PT_TRAINING_REDUCTION_PERCENT / 100),
);
export const PT_TRAINING_MAX_MONTHS = 12;
export const PT_TRAINING_SHORT_MONTHS = 6;

function roundToCent(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Cotisation salariale du régime général, salarié ordinaire.
 * Gov.pt (mis à jour le 7 septembre 2026) : 11 % à la charge du salarié,
 * 23,75 % à la charge de l'employeur, 34,75 % au total.
 */
export const PT_SS_WORKER_RATE = 0.11;
export const PT_SS_WORKER_RATE_LABEL = "11 %";
export const PT_SS_EMPLOYER_RATE_LABEL = "23,75 %";
export const PT_SS_GLOBAL_RATE_LABEL = "34,75 %";
export const PT_SS_WORKER_CONTINENTAL = roundToCent(
  PT_RMMG_CONTINENTAL_MONTHLY * PT_SS_WORKER_RATE,
);
export const PT_NET_BEFORE_IRS_CONTINENTAL = roundToCent(
  PT_RMMG_CONTINENTAL_MONTHLY - PT_SS_WORKER_CONTINENTAL,
);

/**
 * Minimum d'existence 2026 (Lei n.º 73-A/2025 / Despacho n.º 233-A/2026) :
 * 12 880 €, égal au total annuel 920 × 14.
 */
export const PT_IRS_MINIMO_EXISTENCIA = 12880;

/**
 * Trajectoire de l'Acordo 2025-2028 et mention dans la présentation de l'OE 2027.
 * Ce n'est pas le taux déjà applicable.
 */
export const PT_RMMG_2027_ANNOUNCED = 970;
export const PT_RMMG_2028_ANNOUNCED = 1020;

export const PT_COMPARE_FR_HOURLY = SMIC_CURRENT.hourlyGross;
export const PT_COMPARE_FR_MONTHLY = SMIC_CURRENT.monthlyGross;
export const PT_COMPARE_FR_ANNUAL = SMIC_CURRENT.annualGross;
export const PT_COMPARE_FR_FROM_LABEL = SMIC_EFFECTIVE_FROM_LABEL;
export const PT_COMPARE_ANNUAL_PCT_VS_FR = percentDiffVsBase(
  PT_RMMG_CONTINENTAL_ANNUAL,
  PT_COMPARE_FR_ANNUAL,
);

/**
 * Eurostat earn_mw_cur, semestre 2026-S2, situation au 1er juillet 2026.
 * Même série que /smic-europe : 920 × 14 / 12 arrondi à 1 073.
 */
export const PT_EUROSTAT_PERIOD = "2026-S2";
export const PT_EUROSTAT_PERIOD_LABEL = "1er juillet 2026";
export const PT_EUROSTAT_MONTHLY = 1073;
export const PT_EUROSTAT_DATASET = "earn_mw_cur";

export const PT_MIN_WAGE_LABELS = {
  continentalMonthly: formatPtEuro(PT_RMMG_CONTINENTAL_MONTHLY, 0),
  continentalAnnual: formatPtEuro(PT_RMMG_CONTINENTAL_ANNUAL, 0),
  continentalTwelve: formatPtEuro(PT_RMMG_CONTINENTAL_TWELVE),
  previousMonthly: formatPtEuro(PT_RMMG_PREVIOUS_MONTHLY, 0),
  previousAnnual: formatPtEuro(PT_RMMG_PREVIOUS_ANNUAL, 0),
  increaseEuros: formatPtEuro(PT_RMMG_INCREASE_EUROS, 0),
  azoresMonthly: formatPtEuro(PT_AZORES_MONTHLY, 0),
  azoresAnnual: formatPtEuro(PT_AZORES_ANNUAL, 0),
  azoresTwelve: formatPtEuro(PT_AZORES_TWELVE),
  madeiraMonthly: formatPtEuro(PT_MADEIRA_MONTHLY, 0),
  madeiraAnnual: formatPtEuro(PT_MADEIRA_ANNUAL, 0),
  madeiraTwelve: formatPtEuro(PT_MADEIRA_TWELVE),
  madeiraPrevious: formatPtEuro(PT_MADEIRA_PREVIOUS_MONTHLY, 0),
  madeiraIncrease: formatPtEuro(PT_MADEIRA_INCREASE_EUROS, 0),
  partTimeMonthly: formatPtEuro(PT_PART_TIME_EXAMPLE_MONTHLY, 0),
  partTimeTwelve: formatPtEuro(PT_PART_TIME_EXAMPLE_TWELVE),
  partTimeAnnual: formatPtEuro(PT_PART_TIME_EXAMPLE_ANNUAL, 0),
  hourlyExample: formatPtEuro(PT_HOURLY_EXAMPLE),
  trainingFloor: formatPtEuro(PT_TRAINING_FLOOR_MONTHLY, 0),
  ssWorkerAmount: formatPtEuro(PT_SS_WORKER_CONTINENTAL),
  netBeforeIrs: formatPtEuro(PT_NET_BEFORE_IRS_CONTINENTAL),
  irsMinimo: formatPtEuro(PT_IRS_MINIMO_EXISTENCIA, 0),
  announced2027: formatPtEuro(PT_RMMG_2027_ANNOUNCED, 0),
  announced2028: formatPtEuro(PT_RMMG_2028_ANNOUNCED, 0),
  weeklyHours: PT_LEGAL_MAX_WEEKLY_HOURS.toLocaleString("fr-FR"),
  dailyHours: PT_LEGAL_MAX_DAILY_HOURS.toLocaleString("fr-FR"),
  partTimeHours: PT_PART_TIME_EXAMPLE_HOURS.toLocaleString("fr-FR"),
  ssWorker: PT_SS_WORKER_RATE_LABEL,
  ssEmployer: PT_SS_EMPLOYER_RATE_LABEL,
  frHourly: formatPtEuro(PT_COMPARE_FR_HOURLY),
  frMonthly35: formatPtEuro(PT_COMPARE_FR_MONTHLY),
  frAnnual: formatPtEuro(PT_COMPARE_FR_ANNUAL),
  annualPctVsFr: formatPtPercent(Math.abs(PT_COMPARE_ANNUAL_PCT_VS_FR)),
  eurostatMonthly: formatPtEuro(PT_EUROSTAT_MONTHLY, 0),
  increasePercent: PT_RMMG_INCREASE_PERCENT_LABEL,
};

export const PT_MIN_WAGE_AMOUNTS_BLOCK_TITLE =
  "L'essentiel sur le salaire minimum au Portugal en 2026";

export const PT_MIN_WAGE_SOURCES = {
  dl139: {
    org: "Diário da República",
    label: "Decreto-Lei n.º 139/2025, retribuição mínima mensal garantida pour 2026",
    href: "https://diariodarepublica.pt/dr/detalhe/decreto-lei/139-2025-992879809",
  },
  dgert2026: {
    org: "DGERT",
    label: "Retribuição mínima mensal garantida para 2026",
    href: "https://www.dgert.gov.pt/retribuicao-minima-mensal-garantida-para-2026",
  },
  dgertPdf: {
    org: "DGERT",
    label: "PDF du Decreto-Lei n.º 139/2025 (copie de consultation)",
    href: "https://www.dgert.gov.pt/wp-content/uploads/2026/05/Decreto-Lei-n.o-139_2025_RMMG.pdf",
  },
  dgertHistory: {
    org: "DGERT",
    label: "Évolution de la retribuição mínima mensal garantida (RMMG)",
    href: "https://www.dgert.gov.pt/evolucao-da-remuneracao-minima-mensal-garantida-rmmg",
  },
  dl112: {
    org: "Diário da República",
    label: "Decreto-Lei n.º 112/2024, RMMG pour 2025",
    href: "https://diariodarepublica.pt/dr/detalhe/decreto-lei/112-2024-900706889",
  },
  dlrMadeira: {
    org: "Diário da República",
    label: "Decreto Legislativo Regional n.º 1/2026/M, RMMG à Madère",
    href: "https://diariodarepublica.pt/dr/detalhe/decreto-legislativo-regional/1-2026-1033291312",
  },
  madeiraGov: {
    org: "Gouvernement régional de Madère",
    label: "RMMG à Madère en 2026 (Direction régionale du travail)",
    href: "https://www.madeira.gov.pt/drtrabalho/",
  },
  azoresPage: {
    org: "Gouvernement régional des Açores",
    label: "Salaire minimum régional actualisé (DRQPE)",
    href: "https://portal.azores.gov.pt/web/drqpe/salario-minimo-atualizado",
  },
  dlrAzores: {
    org: "Diário da República",
    label: "Decreto Legislativo Regional n.º 8/2002/A, acréscimo régional de 5 %",
    href: "https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-legislativo-regional/2002-119420465",
  },
  dlrAzores2023: {
    org: "Diário da República",
    label: "Decreto Legislativo Regional n.º 37/2023/A, 19e modification",
    href: "https://diariodarepublica.pt/dr/detalhe/decreto-legislativo-regional/37-2023-223045469",
  },
  codigoTrabalho: {
    org: "Diário da República",
    label: "Código do Trabalho, Lei n.º 7/2009, version consolidée",
    href: "https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2009-34546475",
  },
  dgertIrct: {
    org: "DGERT",
    label: "Outil de recherche des conventions collectives (IRCT)",
    href: "https://www.dgert.gov.pt/ferramenta-para-pesquisa-de-convencoes-coletivas",
  },
  ssContrib: {
    org: "gov.pt",
    label: "Contributions à la sécurité sociale des salariés",
    href: "https://www.gov.pt/pt/servicos/obter-informacoes-sobre-as-contribuicoes-para-a-seguranca-social-pagamento-de-entidade-empregadora-por-trabalhador-por-conta-de-outrem",
  },
  oeIrs2026: {
    org: "oe.gov.pt",
    label: "Tables de retenue à la source de l'IRS pour 2026",
    href: "https://www.oe.gov.pt/oe2026/noticias/publicadas-as-tabelas-de-retencao-na-fonte-do-irs-para-2026/",
  },
  despachoIrs: {
    org: "Diário da República",
    label: "Despacho n.º 233-A/2026, tables de retenue IRS continent",
    href: "https://diariodarepublica.pt/dr/detalhe/despacho/233-a-2026-998488151",
  },
  portariaRefeicao: {
    org: "Diário da República",
    label: "Portaria n.º 51-B/2026/1, indemnité de repas de la fonction publique",
    href: "https://diariodarepublica.pt/dr/detalhe/portaria/51-b-2026-1031110274",
  },
  act: {
    org: "ACT",
    label: "Autoridade para as Condições do Trabalho",
    href: "https://portal.act.gov.pt/",
  },
  irtAzores: {
    org: "IRT Açores",
    label: "Inspection régionale du travail des Açores",
    href: "https://irt.azores.gov.pt/",
  },
  govWork: {
    org: "gov.pt",
    label: "Travailler au Portugal",
    href: "https://www.gov.pt/guias/trabalhar-em-portugal",
  },
  acordo2025: {
    org: "Gouvernement portugais",
    label: "Acordo tripartido 2025-2028 sur la valorisation salariale",
    href: "https://www.portugal.gov.pt/gc24/comunicacao/noticias/governo-e-parceiros-sociais-assinam-novo-acordo-de-concertacao-social",
  },
  oe2027: {
    org: "Gouvernement portugais",
    label: "Présentation des priorités 2027, dont la RMMG annoncée à 970 €",
    href: "https://www.portugal.gov.pt/gc25/comunicacao/noticias/rendimentos-habitacao-servicos-publicos-o-que-pode-esperar-no-proximo-ano",
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
  atPortal: {
    org: "Autoridade Tributária",
    label: "Portal das Finanças",
    href: "https://www.portaldasfinancas.gov.pt/",
  },
};
