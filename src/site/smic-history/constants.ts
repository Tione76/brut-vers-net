import { SMIC_EDITORIAL_YEAR, SMIC_SOURCES } from "@/site/smic/data";

export const SMIC_HISTORY_SLUG = "evolution-smic";
export const SMIC_HISTORY_PATH = "/evolution-smic";
export const SMIC_HISTORY_BREADCRUMB = "Évolution du SMIC";

/** Millésime éditorial du contenu historique : même source que les pages SMIC. */
export const SMIC_HISTORY_EDITORIAL_YEAR = SMIC_EDITORIAL_YEAR;

export const SMIC_HISTORY_H1 =
  "Évolution du SMIC depuis sa création : historique année par année";

export const SMIC_HISTORY_SEO_TITLE =
  "Évolution du SMIC depuis 1950 : historique et montants";

export const SMIC_HISTORY_META_DESCRIPTION =
  "Découvrez l’évolution du SMIC depuis 1950 : montants horaires et mensuels, dates d’augmentation, ancien SMIC en francs et historique année par année.";

export const SMIC_HISTORY_PUBLISHED_AT = "2026-09-26";
export const SMIC_HISTORY_UPDATED_AT = "2026-09-26";
export const SMIC_HISTORY_VERIFIED_ON = "2026-09-26";
export const SMIC_HISTORY_VERIFIED_ON_LABEL = "26 septembre 2026";

/** Taux officiel de conversion (règlement CE n° 2866/98). Ce n'est pas un équivalent de pouvoir d'achat. */
export const EUR_FRF_OFFICIAL_RATE = 6.55957;

export const LEGAL_WEEK_39_FROM = "1982-02-01";
export const GMR_CONVERGENCE_END = "2005-07-01";
export const EURO_CASH_FROM = "2002-01-01";
export const ANNUAL_REVALUATION_JANUARY_FROM = 2010;

export const INSEE_SMIC_XLSX_URL =
  "https://www.insee.fr/fr/statistiques/fichier/1375188/marc-salair-smic.xlsx";

export const SMIC_HISTORY_SOURCES = {
  inseeAnnual: {
    label: "Salaire minimum interprofessionnel de croissance (Smic), données annuelles de 1980 à 2026",
    org: "Insee",
    href: "https://www.insee.fr/fr/statistiques/1375188",
  },
  inseeXlsx: {
    label: "Fichier Insee marc-salair-smic.xlsx (taux légaux, dates d'effet et parution au JO)",
    org: "Insee",
    href: INSEE_SMIC_XLSX_URL,
  },
  inseeMonthly35: {
    label: "Montant mensuel brut du SMIC pour 35 heures (série 000879877)",
    org: "Insee",
    href: "https://www.insee.fr/fr/statistiques/serie/000879877",
  },
  inseeLongSeries: {
    label: "Séries longues sur les salaires dans le secteur privé (SMIC39, SMIC35)",
    org: "Insee",
    href: "https://www.insee.fr/fr/statistiques/8668575",
  },
  ministereHistoire: {
    label: "Histoire du salaire minimum",
    org: "Ministère du Travail",
    href: "https://travail-emploi.gouv.fr/histoire-du-salaire-minimum",
  },
  ministereSmic: {
    label: "Le SMIC",
    org: "Ministère du Travail",
    href: "https://travail-emploi.gouv.fr/droit-du-travail/la-remuneration/article/le-smic",
  },
  loi1970: {
    label: "Loi n° 70-7 du 2 janvier 1970 portant réforme du salaire minimum garanti et création du salaire minimum de croissance",
    org: "Légifrance",
    href: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000000693898",
  },
  loi1950: {
    label: "Loi n° 50-205 du 11 février 1950 relative aux conventions collectives",
    org: "Légifrance",
    href: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000000693160",
  },
  servicePublic: SMIC_SOURCES.servicePublic,
  codeTravail: SMIC_SOURCES.codeTravailPrincipes,
  codeTravailAnnuel: {
    label: "Code du travail, article L. 3231-6 (fixation annuelle au 1er janvier)",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/code-du-travail/l3231-6",
  },
  codeTravailAutomatique: {
    label: "Code du travail, article L. 3231-5 (relèvement automatique en cours d'année)",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/code-du-travail/l3231-5",
  },
  codeTravailSupplementaire: {
    label: "Code du travail, article L. 3231-10 (relèvement supplémentaire en cours d'année)",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/code-du-travail/l3231-10",
  },
  decretNovembre2024: {
    label: "Décret n° 2024-951 du 23 octobre 2024 (relèvement anticipé au 1er novembre 2024)",
    org: "Légifrance",
    href: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000050392683",
  },
  ministereJuin2026: SMIC_SOURCES.ministereTravailRevaloJuin2026,
  inseeIpcDefinition: {
    label: "Indice des prix à la consommation (définition Insee)",
    org: "Insee",
    href: "https://www.insee.fr/fr/metadonnees/definition/c1557",
  },
  chatefp: {
    label: "Cahiers du CHATEFP n° 29 (2024) : l'État et les salaires depuis 1945",
    org: "Ministère du Travail",
    href: "https://travail-emploi.gouv.fr/sites/travail-emploi/files/2024-10/Cahiers%20du%20CHATEFP%2029%20-%202024%20-%20l%27%C3%89tat%20et%20les%20salaires%20depuis%201945%20-%20n%C3%A9gociations%20collectives%20et%20salaire%20minimum.pdf",
  },
} as const;

export const SMIG_1950 = {
  year: 1950,
  decreeDate: "1950-08-23",
  decreeLabel: "décret du 23 août 1950",
  parisOldFrancsPerHour: 78,
  lowestZoneOldFrancsPerHour: 64,
  sourceUrl: SMIC_HISTORY_SOURCES.chatefp.href,
  sourceLabel: SMIC_HISTORY_SOURCES.chatefp.label,
} as const;

export const ENRICHED_YEARS = [
  1950, 1970, 1980, 1990, 2000, 2002, 2005, 2006, 2008, 2009, 2010, 2015, 2020,
  2021, 2022, 2023, 2024, 2025, 2026,
] as const;

export const DECADE_NAV = [
  { id: "decade-1950", yearAnchor: "smic-1950", label: "1950-1959" },
  { id: "decade-1960", yearAnchor: "smic-1960", label: "1960-1969" },
  { id: "decade-1970", yearAnchor: "smic-1970", label: "1970-1979" },
  { id: "decade-1980", yearAnchor: "smic-1980", label: "1980-1989" },
  { id: "decade-1990", yearAnchor: "smic-1990", label: "1990-1999" },
  { id: "decade-2000", yearAnchor: "smic-2000", label: "2000-2009" },
  { id: "decade-2010", yearAnchor: "smic-2010", label: "2010-2019" },
  { id: "decade-2020", yearAnchor: "smic-2020", label: "2020 à aujourd'hui" },
] as const;
