/**
 * Source de vérité éditoriale : /salaire-minimum-suisse
 *
 * Title SEO evergreen (sans année, avec « (mis à jour) »).
 * H1 et contenu portent l'année éditoriale des données vérifiées.
 *
 * Mise à jour (aucune bascule automatique au 1er janvier) :
 * - vérifier chaque taux cantonal et communal sur la page officielle compétente ;
 * - distinguer en vigueur / futur fixé / adopté non en vigueur ;
 * - recalculer exemples mensuels et conversions BCE via les constantes ;
 * - aligner la fiche Suisse de /smic-europe après vérification officielle ;
 * - mettre à jour FAQ, encadré et dates published/updated/verified.
 */

import { SMIC_CURRENT, SMIC_EFFECTIVE_FROM_LABEL } from "@/site/smic/data";
import {
  chfToEur,
  formatChf,
  formatChfHourly,
  formatChfRange,
  formatEur,
  formatPercent,
  monthlyFromHourlyWeekly,
  percentDiffVsBase,
} from "./engine";

export const CH_MIN_WAGE_SLUG = "salaire-minimum-suisse";
export const CH_MIN_WAGE_PATH = "/salaire-minimum-suisse";

export const CH_MIN_WAGE_EDITORIAL_YEAR = 2026;

export const CH_MIN_WAGE_PUBLISHED_AT = "2026-10-28";
export const CH_MIN_WAGE_UPDATED_AT = "2026-10-28";
export const CH_MIN_WAGE_UPDATED_AT_LABEL = "28 octobre 2026";

export const CH_MIN_WAGE_SOURCES_VERIFIED_AT = "2026-10-28";
export const CH_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL = "28 octobre 2026";

export const CH_MIN_WAGE_H1 =
  "Salaire minimum en Suisse en 2026 : montants et règles par canton";

export const CH_MIN_WAGE_SEO_TITLE =
  "Salaire minimum en Suisse : montants par canton (mis à jour)";

export const CH_MIN_WAGE_META_DESCRIPTION =
  "Quel salaire minimum en Suisse ? Consultez les montants par canton, les exemples mensuels, les règles des CCT et les repères pour les frontaliers.";

export const CH_MIN_WAGE_BREADCRUMB = "Salaire minimum Suisse";

export const CH_MIN_WAGE_SUBTITLE =
  "Pas de minimum national unique : montants cantonaux, CCT, CTT et repères pour les frontaliers, en francs suisses.";

export const CH_MIN_WAGE_AMOUNTS_BLOCK_TITLE =
  "L'essentiel sur le salaire minimum en Suisse en 2026";

/** Taux de change BCE : francs suisses pour 1 euro (référence, pas un cours bancaire). */
export const CH_ECB_CHF_PER_EUR = 0.9247;
export const CH_ECB_RATE_DATE = "2026-10-28";
export const CH_ECB_RATE_DATE_LABEL = "28 octobre 2026";
export const CH_ECB_RATE_SOURCE_LABEL =
  "Banque centrale européenne, taux de référence euro";
export const CH_ECB_RATE_HREF =
  "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/eurofxref-graph-chf.en.html";
/** Série historique quotidienne : permet de retrouver la valeur du 28 octobre 2026. */
export const CH_ECB_SERIES_HREF =
  "https://data.ecb.europa.eu/data/datasets/EXR/EXR.D.CHF.EUR.SP00.A";
export const CH_ECB_SERIES_LABEL =
  "Série quotidienne CHF pour 1 euro (EXR.D.CHF.EUR.SP00.A)";

export const CH_EXAMPLE_WEEKLY_HOURS = [40, 42] as const;
export type ChExampleWeeklyHours = (typeof CH_EXAMPLE_WEEKLY_HOURS)[number];

export type ChMinWageStatus =
  | "in-force"
  | "future-set"
  | "adopted-not-in-force"
  | "no-general-minimum";

export type ChMinWageKind = "canton" | "city" | "sector";

export interface ChMinWageTerritory {
  id: string;
  name: string;
  kind: ChMinWageKind;
  status: ChMinWageStatus;
  hourly?: number;
  hourlyMin?: number;
  hourlyMax?: number;
  currency: "CHF";
  from?: string;
  fromLabel?: string;
  futureHourly?: number;
  futureFrom?: string;
  futureFromLabel?: string;
  particularHourly?: number;
  particularLabel?: string;
  scope: string;
  sourceKey: keyof typeof CH_MIN_WAGE_SOURCES;
}

export const CH_MIN_WAGE_TERRITORIES = {
  geneve: {
    id: "geneve",
    name: "Genève",
    kind: "canton",
    status: "in-force",
    hourly: 24.59,
    currency: "CHF",
    from: "2026-01-01",
    fromLabel: "1er janvier 2026",
    futureHourly: 24.73,
    futureFrom: "2027-01-01",
    futureFromLabel: "1er janvier 2027",
    particularHourly: 18.07,
    particularLabel: "agriculture et floriculture",
    scope: "Travailleurs habituellement occupés dans le canton, sous réserve des exceptions légales.",
    sourceKey: "geneveMontant",
  },
  neuchatel: {
    id: "neuchatel",
    name: "Neuchâtel",
    kind: "canton",
    status: "in-force",
    hourly: 21.35,
    currency: "CHF",
    from: "2026-01-01",
    fromLabel: "1er janvier 2026",
    particularHourly: 18.15,
    particularLabel: "agriculture, viticulture et horticulture",
    scope: "Relations de travail accomplies habituellement dans le canton, sous réserve des exceptions de la LEmpl.",
    sourceKey: "neuchatelMemento",
  },
  jura: {
    id: "jura",
    name: "Jura",
    kind: "canton",
    status: "in-force",
    hourly: 21.4,
    currency: "CHF",
    from: "2024-07-01",
    fromLabel: "1er juillet 2024",
    scope: "Rapports de travail sur le territoire jurassien. N'inclut pas les branches sous CCT étendue avec salaire minimum chiffré, ni les entreprises signataires d'une CCT avec minimum chiffré, ni certains CTT.",
    sourceKey: "jura",
  },
  baleVille: {
    id: "bale-ville",
    name: "Bâle-Ville",
    kind: "canton",
    status: "in-force",
    hourly: 22.2,
    currency: "CHF",
    from: "2026-01-01",
    fromLabel: "1er janvier 2026",
    futureHourly: 22.5,
    futureFrom: "2027-01-01",
    futureFromLabel: "1er janvier 2027",
    scope: "Lieu de travail dans le canton de Bâle-Ville. Ne s'applique pas dans les branches couvertes par une CCT étendue.",
    sourceKey: "baleVille",
  },
  tessin: {
    id: "tessin",
    name: "Tessin",
    kind: "canton",
    status: "in-force",
    hourlyMin: 20,
    hourlyMax: 20.5,
    currency: "CHF",
    from: "2026-01-01",
    fromLabel: "1er janvier 2026",
    scope: "Taux horaire brut par secteur (nomenclature des activités NOGA), calé sur 55 % de la médiane salariale nationale. Fourchette, pas un taux unique.",
    sourceKey: "tessin",
  },
  lucerneVille: {
    id: "lucerne-ville",
    name: "Ville de Lucerne",
    kind: "city",
    status: "in-force",
    hourly: 22.75,
    currency: "CHF",
    from: "2026-01-01",
    fromLabel: "1er janvier 2026",
    scope: "Personnes qui fournissent habituellement leur prestation de travail sur le territoire de la ville de Lucerne. Distinct du canton de Lucerne.",
    sourceKey: "lucerneVille",
  },
  zurichVille: {
    id: "zurich-ville",
    name: "Ville de Zurich",
    kind: "city",
    status: "adopted-not-in-force",
    hourly: 23.9,
    currency: "CHF",
    scope: "Règlement communal validé par le Tribunal fédéral le 12 mai 2026. La date d'entrée en vigueur n'est pas encore fixée. La ville indiquera cette date avec un préavis d'au moins six mois.",
    sourceKey: "zurichVille",
  },
  winterthour: {
    id: "winterthour",
    name: "Winterthour",
    kind: "city",
    status: "adopted-not-in-force",
    hourly: 23,
    currency: "CHF",
    scope: "Règlement communal validé par le Tribunal fédéral le 12 mai 2026. L'ordonnance d'exécution est en préparation. Rien ne change pour les employeurs et les salariés tant qu'elle n'est pas en vigueur.",
    sourceKey: "winterthour",
  },
} as const satisfies Record<string, ChMinWageTerritory>;

/** Fourchette 2027 : décret exécutif du 7 octobre 2026 (recueil 843.620), BU du 9 octobre 2026. */
export const CH_TESSIN_FUTURE_MIN = 20.5;
export const CH_TESSIN_FUTURE_MAX = 21;
export const CH_TESSIN_FUTURE_FROM = "2027-01-01";
export const CH_TESSIN_FUTURE_FROM_LABEL = "1er janvier 2027";
export const CH_TESSIN_CURRENT_UNTIL_LABEL = "31 décembre 2026";
export const CH_TESSIN_CURRENT_PERIOD_LABEL = "Du 1er janvier au 31 décembre 2026";

/** Genève : salaire de base horaire si versement en 13 mensualités (2026). */
export const CH_GENEVE_HOURLY_WITH_13TH = 22.7;

/** Mensuels officiels publiés par l'autorité (méthode locale, pas la formule du site). */
export const CH_OFFICIAL_MONTHLY = {
  geneve40: 4262.27,
  geneve41: 4368.82,
  neuchatel40: 3701,
  neuchatel42: 3886,
  baleVille40: 3847.93,
  baleVille41: 3944.27,
  baleVille42: 4040.4,
} as const;

export const CH_PEDAGOGICAL_MONTHLY = {
  geneve40: monthlyFromHourlyWeekly(CH_MIN_WAGE_TERRITORIES.geneve.hourly, 40),
  geneve42: monthlyFromHourlyWeekly(CH_MIN_WAGE_TERRITORIES.geneve.hourly, 42),
  neuchatel40: monthlyFromHourlyWeekly(CH_MIN_WAGE_TERRITORIES.neuchatel.hourly, 40),
  neuchatel42: monthlyFromHourlyWeekly(CH_MIN_WAGE_TERRITORIES.neuchatel.hourly, 42),
  jura40: monthlyFromHourlyWeekly(CH_MIN_WAGE_TERRITORIES.jura.hourly, 40),
  jura42: monthlyFromHourlyWeekly(CH_MIN_WAGE_TERRITORIES.jura.hourly, 42),
  baleVille40: monthlyFromHourlyWeekly(CH_MIN_WAGE_TERRITORIES.baleVille.hourly, 40),
  baleVille42: monthlyFromHourlyWeekly(CH_MIN_WAGE_TERRITORIES.baleVille.hourly, 42),
  tessinMin40: monthlyFromHourlyWeekly(CH_MIN_WAGE_TERRITORIES.tessin.hourlyMin, 40),
  tessinMax40: monthlyFromHourlyWeekly(CH_MIN_WAGE_TERRITORIES.tessin.hourlyMax, 40),
  tessinMin42: monthlyFromHourlyWeekly(CH_MIN_WAGE_TERRITORIES.tessin.hourlyMin, 42),
  tessinMax42: monthlyFromHourlyWeekly(CH_MIN_WAGE_TERRITORIES.tessin.hourlyMax, 42),
  lucerne40: monthlyFromHourlyWeekly(CH_MIN_WAGE_TERRITORIES.lucerneVille.hourly, 40),
  lucerne42: monthlyFromHourlyWeekly(CH_MIN_WAGE_TERRITORIES.lucerneVille.hourly, 42),
} as const;

export const CH_COMPARE_FR_HOURLY = SMIC_CURRENT.hourlyGross;
export const CH_COMPARE_FR_MONTHLY = SMIC_CURRENT.monthlyGross;
export const CH_COMPARE_FR_FROM_LABEL = SMIC_EFFECTIVE_FROM_LABEL;

export const CH_GENEVE_HOURLY_EUR = chfToEur(
  CH_MIN_WAGE_TERRITORIES.geneve.hourly,
  CH_ECB_CHF_PER_EUR,
);
export const CH_GENEVE_VS_FR_PCT = percentDiffVsBase(
  CH_GENEVE_HOURLY_EUR,
  CH_COMPARE_FR_HOURLY,
);

export const CH_MIN_WAGE_LABELS = {
  geneveHourly: formatChfHourly(CH_MIN_WAGE_TERRITORIES.geneve.hourly),
  geneveHourlyShort: formatChf(CH_MIN_WAGE_TERRITORIES.geneve.hourly),
  geneveFuture: formatChf(CH_MIN_WAGE_TERRITORIES.geneve.futureHourly),
  geneveAgri: formatChf(CH_MIN_WAGE_TERRITORIES.geneve.particularHourly),
  geneve13thBase: formatChf(CH_GENEVE_HOURLY_WITH_13TH),
  geneveMonthly40Official: formatChf(CH_OFFICIAL_MONTHLY.geneve40),
  geneveMonthly41Official: formatChf(CH_OFFICIAL_MONTHLY.geneve41),
  geneveMonthly42Pedagogical: formatChf(CH_PEDAGOGICAL_MONTHLY.geneve42),
  neuchatelHourly: formatChfHourly(CH_MIN_WAGE_TERRITORIES.neuchatel.hourly),
  neuchatelHourlyShort: formatChf(CH_MIN_WAGE_TERRITORIES.neuchatel.hourly),
  neuchatelAgri: formatChf(CH_MIN_WAGE_TERRITORIES.neuchatel.particularHourly),
  neuchatelMonthly40Official: formatChf(CH_OFFICIAL_MONTHLY.neuchatel40, 0),
  neuchatelMonthly42Official: formatChf(CH_OFFICIAL_MONTHLY.neuchatel42, 0),
  juraHourly: formatChfHourly(CH_MIN_WAGE_TERRITORIES.jura.hourly),
  juraHourlyShort: formatChf(CH_MIN_WAGE_TERRITORIES.jura.hourly),
  juraMonthly40: formatChf(CH_PEDAGOGICAL_MONTHLY.jura40),
  juraMonthly42: formatChf(CH_PEDAGOGICAL_MONTHLY.jura42),
  baleVilleHourly: formatChfHourly(CH_MIN_WAGE_TERRITORIES.baleVille.hourly),
  baleVilleHourlyShort: formatChf(CH_MIN_WAGE_TERRITORIES.baleVille.hourly),
  baleVilleFuture: formatChf(CH_MIN_WAGE_TERRITORIES.baleVille.futureHourly),
  baleVilleMonthly40Official: formatChf(CH_OFFICIAL_MONTHLY.baleVille40),
  baleVilleMonthly42Official: formatChf(CH_OFFICIAL_MONTHLY.baleVille42),
  tessinRange: formatChfRange(
    CH_MIN_WAGE_TERRITORIES.tessin.hourlyMin,
    CH_MIN_WAGE_TERRITORIES.tessin.hourlyMax,
  ),
  tessinFutureRange: formatChfRange(CH_TESSIN_FUTURE_MIN, CH_TESSIN_FUTURE_MAX),
  lucerneHourly: formatChfHourly(CH_MIN_WAGE_TERRITORIES.lucerneVille.hourly),
  lucerneHourlyShort: formatChf(CH_MIN_WAGE_TERRITORIES.lucerneVille.hourly),
  zurichHourlyShort: formatChf(CH_MIN_WAGE_TERRITORIES.zurichVille.hourly),
  winterthourHourlyShort: formatChf(CH_MIN_WAGE_TERRITORIES.winterthour.hourly),
  geneveHourlyEur: formatEur(CH_GENEVE_HOURLY_EUR),
  frHourlyShort: formatEur(CH_COMPARE_FR_HOURLY),
  frMonthly35: formatEur(CH_COMPARE_FR_MONTHLY),
  geneveVsFrPct: formatPercent(CH_GENEVE_VS_FR_PCT),
  ecbChfPerEur: CH_ECB_CHF_PER_EUR.toLocaleString("fr-FR", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }),
};

export const CH_MIN_WAGE_SOURCES = {
  secoDetachement: {
    org: "SECO",
    label: "Détachement et recherche des salaires minimaux",
    href: "https://www.seco.admin.ch/fr/detachement-et-calculateur-de-salaires-minimaux",
  },
  secoMinima: {
    org: "SECO",
    label: "Recherche des salaires minimaux obligatoires (CCT et CTT)",
    href: "https://mindestlohnrechner.entsendung.admin.ch/",
  },
  secoSalaireUsuel: {
    org: "SECO",
    label: "Calculateur national de salaires (estimation statistique)",
    href: "https://nlr.seco.admin.ch/lohnberechnung",
  },
  secoCct: {
    org: "SECO",
    label: "Conventions collectives de travail (Confédération)",
    href: "https://www.seco.admin.ch/fr/convention-collectives-de-travail-confederation",
  },
  secoCtt: {
    org: "SECO",
    label: "Contrats-types de travail (Confédération)",
    href: "https://www.seco.admin.ch/fr/contrats-types-de-travail-confederation",
  },
  secoFaq: {
    org: "SECO",
    label: "Sources du droit privé du travail (CCT et CTT)",
    href: "https://www.seco.admin.ch/fr/faq-source-du-droit-prive-du-travail",
  },
  parlament24096: {
    org: "Parlement suisse",
    label: "Dossier 24.096 : extension de salaires minimaux de CCT",
    href: "https://www.parlament.ch/fr/ratsbetrieb/suche-curia-vista/geschaeft?AffairId=20240096",
  },
  fedlexLecct2026: {
    org: "Fedlex",
    label: "Modification du 19 juin 2026 de la LECCT (FF 2026 1770)",
    href: "https://www.fedlex.admin.ch/eli/fga/2026/1770/fr",
  },
  fedlexReferendum: {
    org: "Chancellerie fédérale",
    label: "Référendum contre la modification du 19 juin 2026 : aboutissement (FF 2026 2877)",
    href: "https://www.fedlex.admin.ch/eli/fga/2026/2877/fr",
  },
  geneveJobsEte: {
    org: "Canton de Genève",
    label: "Calcul du salaire minimum pour les jobs d'été",
    href: "https://www.ge.ch/document/calcul-du-salaire-minimum-jobs-ete",
  },
  lucerneMotion: {
    org: "Canton de Lucerne",
    label: "Motion 419 : réglementations des salaires minimaux (Grand Conseil)",
    href: "https://www.lu.ch/kr/parlamentsgeschaefte/detail?ges=6f90563a3b1d49a9a71d390794dde238",
  },
  geneve: {
    org: "Canton de Genève",
    label: "Appliquer le salaire minimum genevois",
    href: "https://www.ge.ch/appliquer-salaire-minimum-genevois",
  },
  geneveMontant: {
    org: "Canton de Genève",
    label: "Montant et calcul du salaire minimum genevois",
    href: "https://www.ge.ch/appliquer-salaire-minimum-genevois/montant-calcul-du-salaire-minimum",
  },
  geneveVersement: {
    org: "Canton de Genève",
    label: "Versement du salaire minimum genevois",
    href: "https://www.ge.ch/appliquer-salaire-minimum-genevois/versement-du-salaire-minimum",
  },
  geneveArrete: {
    org: "Canton de Genève",
    label: "Arrêté relatif au salaire minimum cantonal pour 2026 (ArSMC-2026)",
    href: "https://silgeneve.ch/legis/data/rsg_j1_05p03.htm",
  },
  neuchatel: {
    org: "Canton de Neuchâtel",
    label: "Conditions salariales",
    href: "https://www.ne.ch/themes/economie-et-emploi/conditions-de-travail/conditions-salariales",
  },
  neuchatelMemento: {
    org: "Canton de Neuchâtel",
    label: "Mémento sur le salaire minimum cantonal 2026",
    href: "https://www.ne.ch/sites/default/files/2026-02/SEMP_Memento_salaireminimum_2026_1.pdf",
  },
  neuchatelArchives: {
    org: "Canton de Neuchâtel",
    label: "Archives du salaire minimum neuchâtelois",
    href: "https://www.ne.ch/sites/default/files/2026-02/SEMP_salaireminimum_archives_1.pdf",
  },
  jura: {
    org: "Canton du Jura",
    label: "Salaires minimaux",
    href: "https://www.jura.ch/fr/Autorites/Administration/DES/Economie-et-Emploi-SEE/Conditions-de-travail/Conditions-de-travail/Salaires-minimaux.html",
  },
  baleVille: {
    org: "Canton de Bâle-Ville",
    label: "Kantonaler Mindestlohn (MiLo)",
    href: "https://www.bs.ch/wsu/awa/arbeitsbeziehungen/loehne/mindestlohn",
  },
  baleVilleCommunique: {
    org: "Canton de Bâle-Ville",
    label: "Communiqué du 26 octobre 2026 : 22,50 CHF au 1er janvier 2027",
    href: "https://www.bs.ch/medienmitteilungen/wsu/2026-kantonaler-mindestlohn-steigt-2027-auf-2250-franken-pro-stunde",
  },
  tessin: {
    org: "Canton du Tessin",
    label: "Salario minimo cantonale (USML)",
    href: "https://www4.ti.ch/dfe/de/usml/salariominimo/salario-minimo-cantonale",
  },
  tessinDecreto2026: {
    org: "Canton du Tessin",
    label: "Décret exécutif du 11 décembre 2025 (taux 2026, recueil 843.620)",
    href: "https://www3.ti.ch/CAN/RLeggi/public/index.php/raccolta-leggi/legge/num/865",
  },
  tessinDecreto2027: {
    org: "Canton du Tessin",
    label: "Recueil des lois : décret du 7 octobre 2026 (843.620), en vigueur le 1er janvier 2027",
    href: "https://m3.ti.ch/CAN/RLeggi/public/index.php/raccolta-leggi/entrataVigore/anno/2026",
  },
  tessinBu2027: {
    org: "Canton du Tessin",
    label: "Bulletin officiel 34/2026 : décret du 7 octobre 2026 (salaire minimum par secteur)",
    href: "https://www3.ti.ch/CAN/fu/2026/BU_034.pdf",
  },
  tessinFaq2027: {
    org: "Canton du Tessin",
    label: "FAQ salaire minimum du 12 octobre 2026 (décret du 7 octobre 2026, BU du 9 octobre 2026)",
    href: "https://www4.ti.ch/fileadmin/DFE/DE-USML/salario_minimo/20261012_-_FAQ_salario_minimo.pdf",
  },
  lucerneVille: {
    org: "Ville de Lucerne",
    label: "Mindestlohn Stadt Luzern",
    href: "https://www.stadtluzern.ch/projekte/finanzen/80830",
  },
  lucerneVote: {
    org: "Ville de Lucerne",
    label: "Maintien du règlement sur le salaire minimum (27 septembre 2026)",
    href: "https://www.stadtluzern.ch/aktuelles/newslist/2996410",
  },
  zurichVille: {
    org: "Ville de Zurich",
    label: "Mindestlohn Stadt Zürich",
    href: "https://www.stadt-zuerich.ch/de/lebenslagen/unterstuetzung-und-beratung/finanzielle-unterstuetzung/mindestlohn.html",
  },
  winterthour: {
    org: "Ville de Winterthour",
    label: "Mindestlohn in Winterthur",
    href: "https://stadt.winterthur.ch/themen/arbeit-steuern-wirtschaft/arbeit-arbeitslosigkeit/mindestlohn-winterthur",
  },
  tribunalFederal: {
    org: "Tribunal fédéral",
    label: "Arrêts du 12 mai 2026 (2C_28/2025 et 2C_30/2025)",
    href: "https://www.bger.ch/files/live/sites/tfl/files/pdf/fr/2c_0028_2025_2026_06_10_T_f_10_31_48.pdf",
  },
  vaud: {
    org: "Canton de Vaud",
    label: "Communiqué du 14 juin 2026 sur le principe constitutionnel",
    href: "https://www.vd.ch/actualites/communiques-de-presse-de-letat-de-vaud/detail/communique/le-conseil-detat-prend-acte-de-lacceptation-du-principe-dun-salaire-minimum-cantonal",
  },
  initiative2014: {
    org: "Chancellerie fédérale",
    label: "Votation du 18 mai 2014, initiative sur les salaires minimums",
    href: "https://www.bk.admin.ch/ch/d/pore/va/20140518/det583.html",
  },
  ecb: {
    org: "BCE",
    label: CH_ECB_RATE_SOURCE_LABEL,
    href: CH_ECB_RATE_HREF,
  },
  ecbSeries: {
    org: "BCE",
    label: CH_ECB_SERIES_LABEL,
    href: CH_ECB_SERIES_HREF,
  },
  servicePublicSmic: {
    org: "Service-Public.fr",
    label: "SMIC français (fiche F2300)",
    href: "https://www.service-public.fr/particuliers/vosdroits/F2300",
  },
};

export const CH_CANTONAL_IN_FORCE = [
  CH_MIN_WAGE_TERRITORIES.geneve,
  CH_MIN_WAGE_TERRITORIES.baleVille,
  CH_MIN_WAGE_TERRITORIES.jura,
  CH_MIN_WAGE_TERRITORIES.neuchatel,
  CH_MIN_WAGE_TERRITORIES.tessin,
] as const;
