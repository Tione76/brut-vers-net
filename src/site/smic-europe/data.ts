/**
 * Source de vérité : salaires minimums européens (/smic-europe).
 *
 * Comparaisons UE : Eurostat earn_mw_cur, semestre 2026-S2 (situation au 1er juillet 2026),
 * extraction du 31 juillet 2026. Montants mensuels bruts comparables.
 * France : barème national du site pour le montant légal ; Eurostat arrondi à l'euro.
 */

import type { GuideListItem, GuideSubsection, GuideTable } from "@/site/guides/types";
import { SMIC_EFFECTIVE_FROM_LABEL, SMIC_LABELS } from "@/site/smic/data";

export const SMIC_EUROPE_PATH = "/smic-europe";
export const SMIC_EUROPE_SLUG = "smic-europe";

export const SMIC_EUROPE_EDITORIAL_YEAR = 2026;
export const SMIC_EUROPE_PUBLISHED_AT = "2026-09-29";
export const SMIC_EUROPE_UPDATED_AT = "2026-09-30";
export const SMIC_EUROPE_UPDATED_AT_LABEL = "30 septembre 2026";

export const SMIC_EUROPE_H1 =
  "SMIC en Europe 2026 : les salaires minimums pays par pays";

export const SMIC_EUROPE_SEO_TITLE =
  "SMIC en Europe : salaires minimums par pays (mis à jour)";

export const SMIC_EUROPE_META_DESCRIPTION =
  "Comparez les salaires minimums en Europe pays par pays et découvrez les montants en vigueur ainsi que les pays sans salaire minimum national.";

export const SMIC_EUROPE_BREADCRUMB = "SMIC en Europe";

export const SMIC_EUROPE_SUBTITLE =
  "Montants nationaux, équivalents mensuels Eurostat et pays sans salaire minimum national, à partir des sources officielles.";

export const EUROSTAT_DATASET = "earn_mw_cur";
export const EUROSTAT_PERIOD = "2026-S2";
export const EUROSTAT_PERIOD_LABEL = "1er juillet 2026";
export const EUROSTAT_EXTRACTED_AT = "2026-07-31";
export const EUROSTAT_EXTRACTED_AT_LABEL = "31 juillet 2026";

export const EUROSTAT_SOURCE = {
  org: "Eurostat",
  label: "Minimum wage statistics (earn_mw_cur)",
  href: "https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Minimum_wage_statistics",
  datasetHref:
    "https://ec.europa.eu/eurostat/databrowser/view/earn_mw_cur/default/table?lang=fr",
} as const;

export type MinimumStatus = "national" | "no-national" | "unverified-2026";
export type GeographicGroup = "eu" | "other-europe";

export type EuropeCountry = {
  code: string;
  slug: string;
  nameFr: string;
  inPhrase: string;
  group: GeographicGroup;
  status: MinimumStatus;
  /** Équivalent mensuel brut Eurostat en euros (2026-S2), si publié. */
  eurostatMonthlyEur?: number;
  eurostatPps?: number;
  nationalCurrencyAmount?: number;
  nationalCurrencyCode?: string;
  legalReference: string;
  typeLabel: string;
  referenceDateLabel: string;
  sourceName: string;
  sourceUrl: string;
  uses14Months?: boolean;
  extraParagraphs?: string[];
};

const EUROSTAT_URL = EUROSTAT_SOURCE.datasetHref;
const EMPTY = "-";

const nbspFmt = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

function tight(value: string): string {
  return value.replace(/\u202f|\u00a0| /g, "\u00a0");
}

export function formatEuroInt(value: number): string {
  return `${tight(nbspFmt.format(value))}\u00a0€`;
}

export function formatPps(value: number): string {
  return `${tight(nbspFmt.format(value))}\u00a0SPA`;
}

function formatNationalAmount(value: number, code: string): string {
  return `${tight(nbspFmt.format(value))}\u00a0${code}`;
}

function countryAnchor(slug: string): string {
  return `salaire-minimum-${slug}`;
}

export function europeCountryHref(slug: string): string {
  return `${SMIC_EUROPE_PATH}#${countryAnchor(slug)}`;
}

const COUNTRIES: EuropeCountry[] = [
  {
    code: "AL",
    slug: "albanie",
    nameFr: "Albanie",
    inPhrase: "en Albanie",
    group: "other-europe",
    status: "national",
    eurostatMonthlyEur: 531,
    eurostatPps: 705,
    nationalCurrencyAmount: 50000,
    nationalCurrencyCode: "ALL",
    legalReference: "50 000 ALL brut / mois (devise nationale Eurostat)",
    typeLabel: "Salaire minimum national",
    referenceDateLabel: EUROSTAT_PERIOD_LABEL,
    sourceName: "Eurostat earn_mw_cur",
    sourceUrl: EUROSTAT_URL,
    extraParagraphs: [
      `En Albanie, un salaire minimum national existe. Eurostat publie ${formatEuroInt(531)} brut par mois au ${EUROSTAT_PERIOD_LABEL}, soit 50 000 ALL dans la série en devise nationale. Le pays n'est pas membre de l'UE ; il figure ici parce qu'il est dans le même dataset.`,
    ],
  },
  {
    code: "DE",
    slug: "allemagne",
    nameFr: "Allemagne",
    inPhrase: "en Allemagne",
    group: "eu",
    status: "national",
    eurostatMonthlyEur: 2343,
    eurostatPps: 2164,
    legalReference: "13,90 € brut / heure",
    typeLabel: "Salaire minimum légal horaire",
    referenceDateLabel: "1er janvier 2026 (horaire) ; Eurostat au 1er juillet 2026",
    sourceName: "Bundesregierung / Mindestlohnkommission ; Eurostat",
    sourceUrl: "https://www.bundesregierung.de/breg-de/aktuelles/mindestlohn-steigt-2391010",
    extraParagraphs: [
      "Le minimum légal allemand (Mindestlohn) est un taux horaire brut : 13,90 € depuis le 1er janvier 2026, selon le gouvernement fédéral et la Mindestlohnkommission. Une nouvelle étape à 14,60 € est prévue au 1er janvier 2027. Les recherches du type « SMIC Allemagne » correspondent à ce minimum, qui n'est pas appelé SMIC en droit allemand.",
      `Eurostat convertit ce taux en équivalent mensuel comparable : ${formatEuroInt(2343)} brut au ${EUROSTAT_PERIOD_LABEL}. Ce montant n'est pas nécessairement celui imprimé sur le bulletin : il dépend de la durée hebdomadaire retenue pour la conversion.`,
    ],
  },
  {
    code: "AD",
    slug: "andorre",
    nameFr: "Andorre",
    inPhrase: "en Andorre",
    group: "other-europe",
    status: "national",
    legalReference: "9,05 € brut / heure ; 1 568,67 € brut / mois (journée légale ordinaire)",
    typeLabel: "Salaire minimum interprofessionnel (légal)",
    referenceDateLabel: "1er juillet 2026",
    sourceName: "Govern d'Andorra, revalorisation extraordinaire du 1er juillet 2026",
    sourceUrl:
      "https://www.govern.ad/ca/w/el-govern-aprova-un-increment-extraordinari-del-salari-minim-del-2-8-fins-als-1-568-67-euros-mensuals",
    extraParagraphs: [
      "Le salaire minimum Andorre en vigueur depuis le 1er juillet 2026 est de 9,05 € brut par heure, soit 1 568,67 € brut par mois pour la journée légale ordinaire.",
      "Le Consell de Ministres a adopté une revalorisation extraordinaire de 2,8 % : le taux horaire passe de 8,80 € à 9,05 €, et le mensuel équivalent à la journée légale ordinaire se situe à 1 568,67 €. Les entreprises doivent adapter les rémunérations inférieures à ce plancher à compter du 1er juillet 2026. Le mensuel de début d'année était calculé ainsi : taux horaire × 40 heures × 52 semaines ÷ 12 mois. Les recherches du type « SMIC Andorre » correspondent à ce salaire minimum interprofessionnel, qui n'est pas le SMIC français. Ce n'est pas un net. Eurostat ne publie pas Andorre dans earn_mw_cur 2026-S2 : la colonne comparable indique « Non publié par Eurostat », sans conversion maison.",
    ],
  },
  {
    code: "AM",
    slug: "armenie",
    nameFr: "Arménie",
    inPhrase: "en Arménie",
    group: "other-europe",
    status: "national",
    legalReference: "75 000 AMD / mois (montant en vigueur, fixé depuis le 1er janvier 2023)",
    typeLabel: "Salaire minimum national mensuel",
    referenceDateLabel: "En vigueur en 2026, fixé depuis le 1er janvier 2023",
    sourceName: "ARLIS, loi HO-501-N (modification de la loi HO-66-N)",
    sourceUrl: "https://www.arlis.am/hy/acts/172110",
    extraParagraphs: [
      `Le salaire minimum en Arménie en vigueur en 2026 est de ${formatNationalAmount(75000, "AMD")} par mois, montant fixé depuis le 1er janvier 2023.`,
      "Ce plancher national figure à l'article 1 de la loi HO-66-N du 17 décembre 2003, tel que modifié par la loi HO-501-N du 7 décembre 2022 (entrée en vigueur le 1er janvier 2023). Le portail juridique ARLIS indique que cet acte est encore en vigueur. Pour un horaire normal de 40 heures, le taux horaire minimum légal est de 450 AMD. Ces montants n'incluent pas les impôts, cotisations obligatoires, primes ou suppléments. Aucune loi ultérieure portant le minimum à un autre montant pour 2025 ou 2026 n'a été identifiée. Eurostat ne publie pas l'Arménie dans earn_mw_cur 2026-S2. Cette page ne convertit pas les drams en euros.",
    ],
  },
  {
    code: "AT",
    slug: "autriche",
    nameFr: "Autriche",
    inPhrase: "en Autriche",
    group: "eu",
    status: "no-national",
    legalReference: "Pas de salaire minimum national",
    typeLabel: "Minima principalement fixés par conventions collectives",
    referenceDateLabel: EUROSTAT_PERIOD_LABEL,
    sourceName: "Eurostat earn_mw_cur",
    sourceUrl: EUROSTAT_URL,
    extraParagraphs: [
      "En Autriche, il n'existe pas de salaire minimum national unique. Les planchers salariaux relèvent surtout des conventions collectives de branche, très couvrantes. Eurostat classe le pays parmi ceux sans minimum national comparable.",
    ],
  },
  {
    code: "AZ",
    slug: "azerbaidjan",
    nameFr: "Azerbaïdjan",
    inPhrase: "en Azerbaïdjan",
    group: "other-europe",
    status: "national",
    legalReference: "400 AZN / mois (montant en vigueur, fixé depuis le 1er janvier 2025)",
    typeLabel: "Salaire minimum national mensuel",
    referenceDateLabel: "En vigueur en 2026, fixé depuis le 1er janvier 2025",
    sourceName: "Président de la République d'Azerbaïdjan, sərəncam du 23 décembre 2024",
    sourceUrl: "https://president.az/az/articles/view/67602",
    extraParagraphs: [
      `Le salaire minimum en Azerbaïdjan en vigueur en 2026 est de ${formatNationalAmount(400, "AZN")} par mois, montant fixé depuis le 1er janvier 2025.`,
      "Le décret présidentiel du 23 décembre 2024 fixe le salaire mensuel minimum à 400 manats à compter du 1er janvier 2025. Aucun décret ultérieur portant ce montant pour 2026 n'a été identifié. Ne pas confondre avec le minimum vital 2026 (300 manats), qui n'est pas le salaire minimum. Eurostat ne publie pas l'Azerbaïdjan dans earn_mw_cur 2026-S2. Cette page ne convertit pas les manats en euros.",
    ],
  },
  {
    code: "BE",
    slug: "belgique",
    nameFr: "Belgique",
    inPhrase: "en Belgique",
    group: "eu",
    status: "national",
    eurostatMonthlyEur: 2234,
    eurostatPps: 1922,
    legalReference: "2 233,61 € brut / mois (RMMMG, 18 ans et plus)",
    typeLabel: "Revenu minimum mensuel moyen garanti (CCT n° 43)",
    referenceDateLabel: "1er juillet 2026 (RMMMG) ; Eurostat au 1er juillet 2026",
    sourceName: "CNT, montants CCT au 1er juillet 2026 ; CCT n° 43/18 ; Eurostat",
    sourceUrl: "https://cnt-nar.be/fr/documents/montants-des-cct",
    extraParagraphs: [
      `En Belgique, le plancher interprofessionnel n'est pas appelé « SMIC » : c'est le revenu minimum mensuel moyen garanti (RMMMG), fixé par les CCT n° 43 et n° 50 du Conseil national du travail. Au 1er juillet 2026, il s'élève à 2 233,61 € brut par mois pour les 18 ans et plus. Eurostat publie ${formatEuroInt(2234)} brut par mois, soit le même montant arrondi à l'euro.`,
      "Ce montant a connu trois paliers en 2026 : 2 154,11 € au 1er janvier (indexation), 2 189,81 € au 1er avril, puis 2 233,61 € au 1er juillet (nouvelle indexation). La hausse d'avril n'est pas une simple indexation : la CCT n° 43/18 exécute la troisième phase de l'accord social de 2021 et relève le montant de base de 35 € brut, soit 35,70 € après indexation. Les minima de commission paritaire peuvent être plus élevés.",
    ],
  },
  {
    code: "BY",
    slug: "bielorussie",
    nameFr: "Biélorussie",
    inPhrase: "en Biélorussie",
    group: "other-europe",
    status: "national",
    legalReference: "858 BYN / mois",
    typeLabel: "Salaire minimum national mensuel",
    referenceDateLabel: "1er janvier 2026",
    sourceName: "Ministère du Travail et de la Protection sociale de Bélarus",
    sourceUrl: "https://mintrud.gov.by/ru/minimalnaya-zarabotnaya-plata-ru",
    extraParagraphs: [
      `Le salaire minimum en Biélorussie est de ${formatNationalAmount(858, "BYN")} par mois depuis le 1er janvier 2026.`,
      "Le ministère du Travail et de la Protection sociale le présente comme le standard social minimal que tout employeur doit respecter pour un temps de travail normal. Ce montant mensuel peut ensuite être indexé en cours d'année selon les règles belarusses. Eurostat ne publie pas la Biélorussie dans earn_mw_cur 2026-S2. Cette page ne convertit pas les roubles belarusses en euros.",
    ],
  },
  {
    code: "BA",
    slug: "bosnie-herzegovine",
    nameFr: "Bosnie-Herzégovine",
    inPhrase: "en Bosnie-Herzégovine",
    group: "other-europe",
    status: "no-national",
    legalReference: "Pas de salaire minimum national unique ; minima d'entités",
    typeLabel: "Minima légaux d'entités (FBiH et Republika Srpska)",
    referenceDateLabel: "1er janvier 2026 (entités)",
    sourceName: "Službene novine FBiH n° 100/25 ; Službeni glasnik RS n° 115/25",
    sourceUrl: "http://ppp.dws.ba/udocs/Odluka20o20iznosu20najniC5BEe20plaC487e20za2020206.20godinu.pdf",
    extraParagraphs: [
      "En Bosnie-Herzégovine, il n'existe pas de salaire minimum national unique applicable à tout le pays. Des minima légaux existent au niveau des entités.",
      "Ce n'est pas le même système que le Danemark ou l'Italie, où les planchers relèvent surtout des conventions collectives. Ici, chaque entité fixe un minimum légal. Dans la Fédération de Bosnie-Herzégovine, la décision n° 1930/2025 (Službene novine FBiH n° 100/25 du 31 décembre 2025) fixe la najniža plaća à 1 027 KM net pour toute l'année 2026. Dans la Republika Srpska, la décision publiée au Službeni glasnik RS n° 115/25 fixe, à compter du 1er janvier 2026, un plancher de base de 1 000 KM net (1 476,23 KM brut), avec des montants plus élevés selon le niveau de formation exigé pour le poste. Le district de Brčko n'est pas couvert par ces deux décisions. Cette page ne convertit pas les KM en euros et ne les présente pas comme un équivalent Eurostat.",
    ],
  },
  {
    code: "BG",
    slug: "bulgarie",
    nameFr: "Bulgarie",
    inPhrase: "en Bulgarie",
    group: "eu",
    status: "national",
    eurostatMonthlyEur: 620,
    eurostatPps: 993,
    nationalCurrencyAmount: 1213,
    nationalCurrencyCode: "BGN",
    legalReference: "1 213 BGN brut / mois",
    typeLabel: "Salaire minimum national",
    referenceDateLabel: "1er janvier 2026 (barème national) ; Eurostat au 1er juillet 2026",
    sourceName: "Държавен вестник, PMS n° 243/2025 ; Eurostat",
    sourceUrl: "https://dv.parliament.bg/DVWeb/showMaterialDV.jsp?idMat=238961",
    extraParagraphs: [
      `En Bulgarie, le salaire minimum national est de 1 213 BGN brut par mois depuis le 1er janvier 2026 (PMS n° 243 du 13 novembre 2025). Eurostat publie ${formatEuroInt(620)} brut par mois au ${EUROSTAT_PERIOD_LABEL}, soit l'équivalent en euros arrondi (le décret indique aussi 620,20 €).`,
    ],
  },
  {
    code: "CY",
    slug: "chypre",
    nameFr: "Chypre",
    inPhrase: "à Chypre",
    group: "eu",
    status: "national",
    eurostatMonthlyEur: 1088,
    eurostatPps: 1220,
    legalReference: "979 €, puis 1 088 € après 6 mois chez le même employeur",
    typeLabel: "Salaire minimum national (deux paliers)",
    referenceDateLabel: "1er janvier 2026 (barème national) ; Eurostat au 1er juillet 2026",
    sourceName: "Département des relations de travail (MLSI) ; Eurostat",
    sourceUrl:
      "https://www.mlsi.gov.cy/mlsi/dlr/dlr.nsf/All/1BC7DC1FA85737B9C22586870039FD04?OpenDocument=",
    extraParagraphs: [
      `À Chypre, le salaire minimum national à temps plein est de 979 € brut par mois pendant les six premiers mois chez le même employeur, puis de 1 088 € brut après six mois continus (arrêtés de 2022 et 2025, à compter du 1er janvier 2026). Eurostat publie ${formatEuroInt(1088)} brut par mois au ${EUROSTAT_PERIOD_LABEL}, soit le palier après six mois.`,
    ],
  },
  {
    code: "HR",
    slug: "croatie",
    nameFr: "Croatie",
    inPhrase: "en Croatie",
    group: "eu",
    status: "national",
    eurostatMonthlyEur: 1050,
    eurostatPps: 1339,
    legalReference: "1 050 € brut / mois",
    typeLabel: "Salaire minimum national",
    referenceDateLabel: "1er janvier 2026 (barème national) ; Eurostat au 1er juillet 2026",
    sourceName: "Narodne novine, Uredba o visini minimalne plaće za 2026. ; Eurostat",
    sourceUrl: "https://narodne-novine.nn.hr/clanci/sluzbeni/2025_10_132_1931.html",
    extraParagraphs: [
      `En Croatie, le salaire minimum national est de 1 050 € brut par mois du 1er janvier au 31 décembre 2026. Eurostat publie le même montant au ${EUROSTAT_PERIOD_LABEL}.`,
    ],
  },
  {
    code: "DK",
    slug: "danemark",
    nameFr: "Danemark",
    inPhrase: "au Danemark",
    group: "eu",
    status: "no-national",
    legalReference: "Pas de salaire minimum national",
    typeLabel: "Minima principalement fixés par conventions collectives",
    referenceDateLabel: EUROSTAT_PERIOD_LABEL,
    sourceName: "Eurostat earn_mw_cur",
    sourceUrl: EUROSTAT_URL,
    extraParagraphs: [
      "Au Danemark, il n'existe pas de salaire minimum national légal. Les rémunérations plancher sont négociées par branche. L'absence de SMIC danois au sens français ne signifie pas l'absence de protection salariale.",
    ],
  },
  {
    code: "ES",
    slug: "espagne",
    nameFr: "Espagne",
    inPhrase: "en Espagne",
    group: "eu",
    status: "national",
    eurostatMonthlyEur: 1425,
    eurostatPps: 1556,
    uses14Months: true,
    legalReference: "1 221 € brut / mois × 14 mensualités",
    typeLabel: "Salaire minimum interprofessionnel (SMI), 14 mensualités",
    referenceDateLabel: "1er janvier 2026 (SMI) ; Eurostat au 1er juillet 2026",
    sourceName: "BOE, Real Decreto 126/2026 ; Eurostat",
    sourceUrl: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-3815",
    extraParagraphs: [
      "Le salaire minimum interprofessionnel (SMI) est fixé à 1 221 € brut par mois, ou 40,70 € par jour, par le Real Decreto 126/2026, avec effets au 1er janvier 2026. Ce mensuel s'entend sur 14 mensualités (17 094 € brut par an).",
      `Eurostat ramène ce rythme à un équivalent sur 12 mois : ${formatEuroInt(1425)} brut au ${EUROSTAT_PERIOD_LABEL} (1 221 × 14 ÷ 12 = 1 424,50, arrondi à l'euro). Le chiffre Eurostat n'est donc pas le montant d'une seule fiche de paie à 14 versements.`,
    ],
  },
  {
    code: "EE",
    slug: "estonie",
    nameFr: "Estonie",
    inPhrase: "en Estonie",
    group: "eu",
    status: "national",
    eurostatMonthlyEur: 946,
    eurostatPps: 935,
    legalReference: "946 € brut / mois",
    typeLabel: "Salaire minimum national",
    referenceDateLabel: "1er avril 2026 (barème national) ; Eurostat au 1er juillet 2026",
    sourceName: "Riigi Teataja, règlement du 23 mars 2026 n° 36 ; Eurostat",
    sourceUrl: "https://www.riigiteataja.ee/akt/124032026005",
    extraParagraphs: [
      `En Estonie, le salaire minimum national est de 946 € brut par mois à temps plein depuis le 1er avril 2026. Eurostat publie le même montant au ${EUROSTAT_PERIOD_LABEL}. En SPA, cet équivalent est proche de ${formatPps(935)} : les prix locaux pèsent donc presque autant que le montant en euros courants.`,
    ],
  },
  {
    code: "FI",
    slug: "finlande",
    nameFr: "Finlande",
    inPhrase: "en Finlande",
    group: "eu",
    status: "no-national",
    legalReference: "Pas de salaire minimum national",
    typeLabel: "Minima principalement fixés par conventions collectives",
    referenceDateLabel: EUROSTAT_PERIOD_LABEL,
    sourceName: "Eurostat earn_mw_cur",
    sourceUrl: EUROSTAT_URL,
    extraParagraphs: [
      "En Finlande, il n'existe pas de salaire minimum national unique. Les minima sont surtout conventionnels, souvent étendus à toute une branche.",
    ],
  },
  {
    code: "FR",
    slug: "france",
    nameFr: "France",
    inPhrase: "en France",
    group: "eu",
    status: "national",
    eurostatMonthlyEur: 1867,
    eurostatPps: 1692,
    legalReference: `${SMIC_LABELS.hourlyGross} brut / h ; ${SMIC_LABELS.monthlyGross} brut / mois à 35 h`,
    typeLabel: "SMIC (salaire minimum interprofessionnel de croissance)",
    referenceDateLabel: `${SMIC_EFFECTIVE_FROM_LABEL} (barème national) ; Eurostat au 1er juillet 2026`,
    sourceName: "Service-Public / arrêté SMIC ; Eurostat",
    sourceUrl: "https://www.service-public.fr/particuliers/vosdroits/F2300",
    extraParagraphs: [
      `En France, le SMIC actuellement applicable est de ${SMIC_LABELS.hourlyGross} brut par heure, soit ${SMIC_LABELS.monthlyGross} brut par mois à 35 h, depuis le ${SMIC_EFFECTIVE_FROM_LABEL}. Le net mensuel indicatif publié par Service-Public est d'environ ${SMIC_LABELS.monthlyNet}.`,
      `Eurostat publie ${formatEuroInt(1867)} brut par mois au ${EUROSTAT_PERIOD_LABEL}, soit le même barème arrondi à l'euro. La revalorisation du 1er juin 2026 est donc bien celle du semestre juillet 2026, pas l'ancien montant de janvier.`,
    ],
  },
  {
    code: "GE",
    slug: "georgie",
    nameFr: "Géorgie",
    inPhrase: "en Géorgie",
    group: "other-europe",
    status: "unverified-2026",
    legalReference: "Donnée 2026 non vérifiée avec une source officielle suffisamment fiable",
    typeLabel: EMPTY,
    referenceDateLabel: EMPTY,
    sourceName: "Hors dataset Eurostat earn_mw_cur 2026-S2",
    sourceUrl: EUROSTAT_URL,
  },
  {
    code: "EL",
    slug: "grece",
    nameFr: "Grèce",
    inPhrase: "en Grèce",
    group: "eu",
    status: "national",
    eurostatMonthlyEur: 1073,
    eurostatPps: 1229,
    uses14Months: true,
    legalReference: "920 € brut / mois × 14 mensualités",
    typeLabel: "Salaire minimum national, 14 mensualités",
    referenceDateLabel: "1er avril 2026 (barème national) ; Eurostat au 1er juillet 2026",
    sourceName: "ministère grec du Travail, YA 8934/27.3.2026 ; Eurostat",
    sourceUrl:
      "https://ypergasias.gov.gr/ergasiakes-scheseis/syllogikes-ergasiakes-sxeseis/katotatos-misthos/",
    extraParagraphs: [
      `En Grèce, le salaire minimum national des employés à temps plein est de 920 € brut par mois depuis le 1er avril 2026 (décision ministérielle 8934/27.3.2026). Il est habituellement versé sur 14 mensualités.`,
      `Eurostat publie ${formatEuroInt(1073)} brut par mois au ${EUROSTAT_PERIOD_LABEL}, soit 920 × 14 ÷ 12 arrondi à l'euro. Le 1 073 € n'est pas le montant d'une seule paie à 14 versements.`,
    ],
  },
  {
    code: "HU",
    slug: "hongrie",
    nameFr: "Hongrie",
    inPhrase: "en Hongrie",
    group: "eu",
    status: "national",
    eurostatMonthlyEur: 906,
    eurostatPps: 1048,
    nationalCurrencyAmount: 322800,
    nationalCurrencyCode: "HUF",
    legalReference: "322 800 HUF brut / mois",
    typeLabel: "Salaire minimum national",
    referenceDateLabel: "1er janvier 2026 (barème national) ; Eurostat au 1er juillet 2026",
    sourceName: "426/2025. (XII. 23.) Korm. rendelet ; Eurostat",
    sourceUrl: "https://njt.hu/jogszabaly/2025-426-20-22",
    extraParagraphs: [
      `En Hongrie, le minimum général (minimálbér) est de 322 800 HUF brut par mois depuis le 1er janvier 2026. Pour certains emplois exigeant au moins un diplôme ou une qualification de niveau secondaire, un minimum garanti (garantált bérminimum) de 373 200 HUF brut par mois s'applique.`,
      `Eurostat retient 322 800 HUF au ${EUROSTAT_PERIOD_LABEL}, soit ${formatEuroInt(906)} en équivalent euros. Le forint, et non l'euro, est la référence du bulletin.`,
    ],
  },
  {
    code: "IE",
    slug: "irlande",
    nameFr: "Irlande",
    inPhrase: "en Irlande",
    group: "eu",
    status: "national",
    eurostatMonthlyEur: 2391,
    eurostatPps: 1756,
    legalReference: "14,15 € brut / heure (20 ans et plus)",
    typeLabel: "Salaire minimum national horaire",
    referenceDateLabel: "1er janvier 2026 (horaire) ; Eurostat au 1er juillet 2026",
    sourceName: "gov.ie / S.I. No. 472/2025 ; Eurostat",
    sourceUrl: "https://www.irishstatutebook.ie/eli/2025/si/472/made/en/html",
    extraParagraphs: [
      "En Irlande, le National Minimum Wage est un taux horaire. Depuis le 1er janvier 2026, il s'élève à 14,15 € brut par heure pour les 20 ans et plus (S.I. No. 472/2025 / gouvernement irlandais). Des taux inférieurs s'appliquent avant 20 ans.",
      `Eurostat convertit ce minimum horaire en équivalent mensuel brut comparable : ${formatEuroInt(2391)} au ${EUROSTAT_PERIOD_LABEL}. Ce n'est pas un net, et ce n'est pas forcément le brut d'un bulletin à temps partiel.`,
    ],
  },
  {
    code: "IS",
    slug: "islande",
    nameFr: "Islande",
    inPhrase: "en Islande",
    group: "other-europe",
    status: "no-national",
    legalReference: "Pas de salaire minimum national",
    typeLabel: "Minima principalement fixés par conventions collectives",
    referenceDateLabel: EUROSTAT_PERIOD_LABEL,
    sourceName: "Eurostat earn_mw_cur",
    sourceUrl: EUROSTAT_URL,
    extraParagraphs: [
      "En Islande, Eurostat n'enregistre pas de salaire minimum national comparable. Les planchers relèvent surtout des conventions collectives.",
    ],
  },
  {
    code: "IT",
    slug: "italie",
    nameFr: "Italie",
    inPhrase: "en Italie",
    group: "eu",
    status: "no-national",
    legalReference: "Pas de salaire minimum national",
    typeLabel: "Minima principalement fixés par conventions collectives",
    referenceDateLabel: EUROSTAT_PERIOD_LABEL,
    sourceName: "Eurostat earn_mw_cur",
    sourceUrl: EUROSTAT_URL,
    extraParagraphs: [
      "En Italie, il n'existe pas de salaire minimum national unique comparable à un SMIC. Les minima sont surtout conventionnels, par secteur. Un salarié peut donc avoir un plancher très différent selon la convention applicable. Eurostat ne publie pas de montant national pour l'Italie.",
    ],
  },
  {
    code: "XK",
    slug: "kosovo",
    nameFr: "Kosovo",
    inPhrase: "au Kosovo",
    group: "other-europe",
    status: "unverified-2026",
    legalReference: "Donnée 2026 non vérifiée avec une source officielle suffisamment fiable",
    typeLabel: EMPTY,
    referenceDateLabel: EMPTY,
    sourceName: "Hors dataset Eurostat earn_mw_cur 2026-S2",
    sourceUrl: EUROSTAT_URL,
  },
  {
    code: "LV",
    slug: "lettonie",
    nameFr: "Lettonie",
    inPhrase: "en Lettonie",
    group: "eu",
    status: "national",
    eurostatMonthlyEur: 780,
    eurostatPps: 938,
    legalReference: "780 € brut / mois",
    typeLabel: "Salaire minimum national",
    referenceDateLabel: "1er janvier 2026 (barème national) ; Eurostat au 1er juillet 2026",
    sourceName: "Likumi.lv, MK noteikumi Nr. 680 ; Eurostat",
    sourceUrl: "https://likumi.lv/ta/id/364502",
    extraParagraphs: [
      `En Lettonie, le salaire minimum national est de 780 € brut par mois à temps de travail normal depuis le 1er janvier 2026. Eurostat publie le même montant au ${EUROSTAT_PERIOD_LABEL}.`,
    ],
  },
  {
    code: "LI",
    slug: "liechtenstein",
    nameFr: "Liechtenstein",
    inPhrase: "au Liechtenstein",
    group: "other-europe",
    status: "no-national",
    legalReference: "Pas de salaire minimum national",
    typeLabel: "Minima principalement conventionnels (GAV / aveGAV)",
    referenceDateLabel: "Sources officielles LLV (BuA n° 078/2024)",
    sourceName: "Liechtensteinische Landesverwaltung (Amt für Volkswirtschaft ; BuA 078/2024)",
    sourceUrl:
      "https://www.llv.li/de/landesverwaltung/amt-fuer-volkswirtschaft/zentraler-unternehmensservice-eap-/grenzueberschreitende-dienstleistungen-aus-dem-ausland/entsendung-von-arbeitnehmern/einzuhaltende-bestimmungen-ueber-arbeits-und-beschaeftigungsbedingungen",
    extraParagraphs: [
      "Au Liechtenstein, il n'existe pas de salaire minimum national légal unique. Les planchers relèvent surtout des conventions collectives de branche (GAV), parfois rendues généralement obligatoires (aveGAV).",
      "L'administration nationale l'indique clairement : les salaires minimums définis se trouvent dans les aveGAV, pas dans une loi nationale unique. Un rapport du gouvernement au Landtag (BuA n° 078/2024) confirme l'absence de Mindestlohn légal à l'échelle du pays. Eurostat ne publie pas le Liechtenstein dans earn_mw_cur 2026-S2. Cette page ne retient donc aucun montant unique.",
    ],
  },
  {
    code: "LT",
    slug: "lituanie",
    nameFr: "Lituanie",
    inPhrase: "en Lituanie",
    group: "eu",
    status: "national",
    eurostatMonthlyEur: 1153,
    eurostatPps: 1393,
    legalReference: "1 153 € brut / mois",
    typeLabel: "Salaire minimum national",
    referenceDateLabel: "1er janvier 2026 (barème national) ; Eurostat au 1er juillet 2026",
    sourceName: "Inspection lituanienne du travail ; nutarimas n° 700/2025 ; Eurostat",
    sourceUrl: "https://vdi.lrv.lt/lt/naujienos/nuo-2026-m-sausio-1-d-didesnis-minimalus-darbo-uzmokestis-1xW/",
    extraParagraphs: [
      `En Lituanie, le salaire minimum national (MMA) est de 1 153 € brut par mois depuis le 1er janvier 2026. Eurostat publie le même montant au ${EUROSTAT_PERIOD_LABEL}.`,
    ],
  },
  {
    code: "LU",
    slug: "luxembourg",
    nameFr: "Luxembourg",
    inPhrase: "au Luxembourg",
    group: "eu",
    status: "national",
    eurostatMonthlyEur: 2771,
    eurostatPps: 2108,
    legalReference: "SSM non qualifié 18 ans+ : 2 703,74 € brut / mois au 1er janv. 2026",
    typeLabel: "Salaire social minimum (taux selon âge et qualification)",
    referenceDateLabel: "1er janvier 2026 (IGSS) ; Eurostat au 1er juillet 2026",
    sourceName: "IGSS / ADEM ; Eurostat",
    sourceUrl: "https://adem.public.lu/fr/actualites/adem/2026/01/ps202601.html",
    extraParagraphs: [
      "Au Luxembourg, le salaire social minimum (SSM) est un minimum national, avec des taux différents selon l'âge et la qualification. Les paramètres sociaux de l'IGSS retiennent, au 1er janvier 2026, 2 703,74 € brut par mois pour un salarié non qualifié de 18 ans et plus (indice 968,04), et 3 244,48 € pour un salarié qualifié.",
      `Eurostat publie ${formatEuroInt(2771)} brut par mois au ${EUROSTAT_PERIOD_LABEL}. L'écart avec le barème IGSS de janvier correspond à une actualisation entre les deux semestres, pas à un second « SMIC » luxembourgeois. Le chiffre Eurostat n'est pas le montant d'une fiche au 1er janvier.`,
    ],
  },
  {
    code: "MK",
    slug: "macedoine-du-nord",
    nameFr: "Macédoine du Nord",
    inPhrase: "en Macédoine du Nord",
    group: "other-europe",
    status: "national",
    eurostatMonthlyEur: 624,
    eurostatPps: 1142,
    nationalCurrencyAmount: 38507,
    nationalCurrencyCode: "MKD",
    legalReference: "38 507 MKD brut / mois (devise nationale Eurostat)",
    typeLabel: "Salaire minimum national",
    referenceDateLabel: EUROSTAT_PERIOD_LABEL,
    sourceName: "Eurostat earn_mw_cur",
    sourceUrl: EUROSTAT_URL,
    extraParagraphs: [
      `En Macédoine du Nord, un salaire minimum national existe. Eurostat retient 38 507 MKD brut par mois au ${EUROSTAT_PERIOD_LABEL}, soit ${formatEuroInt(624)} en équivalent euros.`,
    ],
  },
  {
    code: "MT",
    slug: "malte",
    nameFr: "Malte",
    inPhrase: "à Malte",
    group: "eu",
    status: "national",
    eurostatMonthlyEur: 994,
    eurostatPps: 1081,
    legalReference: "229,44 € brut / semaine (18 ans et plus)",
    typeLabel: "Salaire minimum national hebdomadaire",
    referenceDateLabel: "1er janvier 2026 (barème national) ; Eurostat au 1er juillet 2026",
    sourceName: "LN 289/2025 ; Eurostat",
    sourceUrl: "https://legislation.mt/eli/ln/2025/289/eng",
    extraParagraphs: [
      `À Malte, le barème légal est hebdomadaire : 229,44 € brut par semaine pour les salariés de 18 ans et plus depuis le 1er janvier 2026 (Legal Notice 289/2025). Eurostat convertit ce taux en équivalent mensuel comparable : ${formatEuroInt(994)} au ${EUROSTAT_PERIOD_LABEL} (229,44 × 52 ÷ 12, arrondi à l'euro).`,
    ],
  },
  {
    code: "MD",
    slug: "moldavie",
    nameFr: "Moldavie",
    inPhrase: "en Moldavie",
    group: "other-europe",
    status: "national",
    eurostatMonthlyEur: 313,
    nationalCurrencyAmount: 6300,
    nationalCurrencyCode: "MDL",
    legalReference: "6 300 MDL brut / mois (devise nationale Eurostat)",
    typeLabel: "Salaire minimum national",
    referenceDateLabel: EUROSTAT_PERIOD_LABEL,
    sourceName: "Eurostat earn_mw_cur",
    sourceUrl: EUROSTAT_URL,
    extraParagraphs: [
      `En Moldavie, Eurostat publie un équivalent de ${formatEuroInt(313)} brut par mois au ${EUROSTAT_PERIOD_LABEL} (6 300 MDL). Aucun standard de pouvoir d'achat n'est publié pour ce pays dans le même extrait 2026-S2.`,
    ],
  },
  {
    code: "MC",
    slug: "monaco",
    nameFr: "Monaco",
    inPhrase: "à Monaco",
    group: "other-europe",
    status: "national",
    legalReference: "12,31 € brut / heure ; 2 080,39 € brut / mois (39 h / 169 h) + indemnité exceptionnelle de 5 %",
    typeLabel: "SMIC (circulaire) et indemnité exceptionnelle de 5 %",
    referenceDateLabel: "1er juin 2026",
    sourceName: "Journal de Monaco, circulaire n° 2026-7 du 26 mai 2026",
    sourceUrl:
      "https://journaldemonaco.gouv.mc/Journaux/2026/Journal-8802/Circulaire-n-2026-7-du-26-mai-2026-relative-au-S.M.I.C.-Salaire-Minimum-Interprofessionnel-de-Croissance-applicable-a-compter-du-1er-juin-2026",
    extraParagraphs: [
      "Le SMIC Monaco applicable depuis le 1er juin 2026 est de 12,31 € brut par heure, soit 2 080,39 € brut par mois pour 39 heures hebdomadaires (169 heures par mois).",
      "Ces montants figurent dans la circulaire n° 2026-7 du 26 mai 2026, publiée au Journal de Monaco n° 8802. Ils reprennent le taux de la région économique voisine visée par la loi n° 739. Le salaire minimum Monaco ne se lit pas comme le SMIC français à 35 heures : la durée de référence monégasque est de 39 heures. En outre, l'arrêté ministériel n° 63-131 prévoit que les rémunérations minimales doivent être majorées d'une indemnité exceptionnelle de 5 %, non soumise aux cotisations sociales ni à la législation sur les accidents du travail. Eurostat ne publie pas Monaco dans earn_mw_cur 2026-S2.",
    ],
  },
  {
    code: "ME",
    slug: "montenegro",
    nameFr: "Monténégro",
    inPhrase: "au Monténégro",
    group: "other-europe",
    status: "national",
    eurostatMonthlyEur: 670,
    eurostatPps: 1014,
    legalReference: "600 € net / mois (jusqu'au niveau V) ; 800 € net (niveau VI et plus)",
    typeLabel: "Salaire minimum national net, selon le niveau de qualification",
    referenceDateLabel: "1er octobre 2024 (barème national) ; Eurostat au 1er juillet 2026",
    sourceName: "Službeni list CG n° 86/2024 ; Eurostat",
    sourceUrl: "https://www.sluzbenilist.me/propisi/387096",
    extraParagraphs: [
      `Au Monténégro, le barème légal est un minimum net : 600 € par mois jusqu'au niveau de qualification V, et 800 € à partir du niveau VI (loi publiée au Službeni list CG n° 86/2024, applicable depuis le 1er octobre 2024). Eurostat publie ${formatEuroInt(670)} brut par mois au ${EUROSTAT_PERIOD_LABEL} : c'est un équivalent brut comparable, pas le montant net du bulletin.`,
    ],
  },
  {
    code: "NO",
    slug: "norvege",
    nameFr: "Norvège",
    inPhrase: "en Norvège",
    group: "other-europe",
    status: "no-national",
    legalReference: "Pas de salaire minimum national",
    typeLabel: "Minima principalement fixés par conventions collectives",
    referenceDateLabel: EUROSTAT_PERIOD_LABEL,
    sourceName: "Eurostat earn_mw_cur",
    sourceUrl: EUROSTAT_URL,
    extraParagraphs: [
      "En Norvège, il n'existe pas de salaire minimum national unique. Des minima sectoriels peuvent être rendus obligatoires par extension de conventions collectives. Eurostat ne publie pas de montant national comparable.",
    ],
  },
  {
    code: "NL",
    slug: "pays-bas",
    nameFr: "Pays-Bas",
    inPhrase: "aux Pays-Bas",
    group: "eu",
    status: "national",
    eurostatMonthlyEur: 2338,
    eurostatPps: 2023,
    legalReference: "14,99 € brut / heure (21 ans et plus)",
    typeLabel: "Salaire minimum légal horaire",
    referenceDateLabel: "1er juillet 2026",
    sourceName: "Rijksoverheid ; Eurostat",
    sourceUrl:
      "https://www.rijksoverheid.nl/themas/werk/minimumloon/bedragen-minimumloon/bedragen-minimumloon-2026",
    extraParagraphs: [
      "Aux Pays-Bas, le minimum légal est un taux horaire depuis 2024. Au 1er juillet 2026, il s'élève à 14,99 € brut par heure pour les 21 ans et plus (Staatscourant 2026, n° 16505). Des taux jeunes plus bas s'appliquent de 15 à 20 ans.",
      `Eurostat publie un équivalent mensuel de ${formatEuroInt(2338)} brut au ${EUROSTAT_PERIOD_LABEL}. Le « referentiemaandloon » officiel de 2 337 € n'est plus le minimum dû au salarié : il sert surtout à d'autres barèmes. L'écart d'un euro avec Eurostat vient de l'arrondi et de la conversion horaire × durée.`,
    ],
  },
  {
    code: "PL",
    slug: "pologne",
    nameFr: "Pologne",
    inPhrase: "en Pologne",
    group: "eu",
    status: "national",
    eurostatMonthlyEur: 1119,
    eurostatPps: 1547,
    nationalCurrencyAmount: 4806,
    nationalCurrencyCode: "PLN",
    legalReference: "4 806 PLN brut / mois (devise nationale Eurostat)",
    typeLabel: "Salaire minimum national",
    referenceDateLabel: EUROSTAT_PERIOD_LABEL,
    sourceName: "Eurostat earn_mw_cur",
    sourceUrl: EUROSTAT_URL,
    extraParagraphs: [
      `En Pologne, un salaire minimum national existe. Eurostat retient 4 806 PLN brut par mois au ${EUROSTAT_PERIOD_LABEL}, soit ${formatEuroInt(1119)} en équivalent euros. L'équivalent en euros peut bouger si le zloty bouge, même sans changement du minimum en zlotys.`,
    ],
  },
  {
    code: "PT",
    slug: "portugal",
    nameFr: "Portugal",
    inPhrase: "au Portugal",
    group: "eu",
    status: "national",
    eurostatMonthlyEur: 1073,
    eurostatPps: 1240,
    uses14Months: true,
    legalReference: "920 € brut / mois × 14 mensualités",
    typeLabel: "Rétribution minimale mensuelle garantie (RMMG), 14 mensualités",
    referenceDateLabel: "1er janvier 2026 (RMMG) ; Eurostat au 1er juillet 2026",
    sourceName: "Decreto-Lei n.º 139/2025 ; Eurostat",
    sourceUrl: "https://www.dgert.gov.pt/retribuicao-minima-mensal-garantida-para-2026",
    extraParagraphs: [
      "Au Portugal, la retribuição mínima mensal garantida (RMMG) du continent est de 920 € brut par mois depuis le 1er janvier 2026 (Decreto-Lei n.º 139/2025). Comme en Espagne, le rythme usuel est de 14 mensualités.",
      "Les régions autonomes appliquent des montants différents : 966 € aux Açores et 980 € à Madère (Decreto Legislativo Regional n.º 1/2026/M pour Madère).",
      `Eurostat publie ${formatEuroInt(1073)} brut par mois au ${EUROSTAT_PERIOD_LABEL}, soit 920 × 14 ÷ 12 arrondi à l'euro. Le 1 073 € n'est pas le montant d'une seule paie à 14 versements.`,
    ],
  },
  {
    code: "CZ",
    slug: "republique-tcheque",
    nameFr: "République tchèque",
    inPhrase: "en République tchèque",
    group: "eu",
    status: "national",
    eurostatMonthlyEur: 923,
    eurostatPps: 1015,
    nationalCurrencyAmount: 22400,
    nationalCurrencyCode: "CZK",
    legalReference: "22 400 CZK brut / mois (devise nationale Eurostat)",
    typeLabel: "Salaire minimum national",
    referenceDateLabel: EUROSTAT_PERIOD_LABEL,
    sourceName: "Eurostat earn_mw_cur",
    sourceUrl: EUROSTAT_URL,
    extraParagraphs: [
      `En République tchèque (Tchéquie), un salaire minimum national existe. Eurostat retient 22 400 CZK brut par mois au ${EUROSTAT_PERIOD_LABEL}, soit ${formatEuroInt(923)} en équivalent euros.`,
    ],
  },
  {
    code: "RO",
    slug: "roumanie",
    nameFr: "Roumanie",
    inPhrase: "en Roumanie",
    group: "eu",
    status: "national",
    eurostatMonthlyEur: 825,
    eurostatPps: 1317,
    nationalCurrencyAmount: 4325,
    nationalCurrencyCode: "RON",
    legalReference: "4 325 RON brut / mois",
    typeLabel: "Salaire minimum national",
    referenceDateLabel: "1er juillet 2026 (barème national) ; Eurostat au 1er juillet 2026",
    sourceName: "ministère du Travail de Roumanie ; Eurostat",
    sourceUrl: "https://mmuncii.gov.ro/salariul-de-baza-minim-brut-pe-tara-garantat-in-plata-se-majoreaza/",
    extraParagraphs: [
      `En Roumanie, le salaire de base minimum brut garanti est de 4 325 lei par mois depuis le 1er juillet 2026. Eurostat retient le même montant au ${EUROSTAT_PERIOD_LABEL}, soit ${formatEuroInt(825)} en équivalent euros.`,
    ],
  },
  {
    code: "GB",
    slug: "royaume-uni",
    nameFr: "Royaume-Uni",
    inPhrase: "au Royaume-Uni",
    group: "other-europe",
    status: "national",
    legalReference: "12,71 £ brut / heure (National Living Wage, 21 ans et plus)",
    typeLabel: "Salaire minimum national horaire (barème par âge)",
    referenceDateLabel: "1er avril 2026",
    sourceName: "GOV.UK, National Living Wage",
    sourceUrl: "https://www.gov.uk/national-minimum-wage-rates",
    extraParagraphs: [
      "Au Royaume-Uni, un salaire minimum national existe, mais il n'apparaît plus dans le dataset Eurostat earn_mw_cur 2026-S2. Depuis le 1er avril 2026, le National Living Wage est de 12,71 £ brut par heure pour les 21 ans et plus (GOV.UK). Les 18-20 ans ont droit à 10,85 £, les moins de 18 ans et les apprentis à 8,00 £.",
      "Cette page ne convertit pas ce taux en euros au cours du jour : ce n'est pas l'équivalent mensuel harmonisé d'Eurostat. Le montant réellement versé dépend du nombre d'heures travaillées.",
    ],
  },
  {
    code: "SM",
    slug: "saint-marin",
    nameFr: "Saint-Marin",
    inPhrase: "à Saint-Marin",
    group: "other-europe",
    status: "no-national",
    legalReference: "Pas de salaire minimum national",
    typeLabel: "Minima principalement fixés par conventions collectives de secteur",
    referenceDateLabel: "Loi n° 59 du 9 mai 2016",
    sourceName: "Consiglio Grande e Generale, legge n° 59/2016",
    sourceUrl:
      "https://www.consigliograndeegenerale.sm/on-line/home/archivio-leggi-decreti-e-regolamenti/documento17084192.html",
    extraParagraphs: [
      "À Saint-Marin, il n'existe pas de salaire minimum national légal unique comparable à un SMIC. Les planchers salariaux relèvent des contrats collectifs nationaux de secteur.",
      "La loi n° 59 du 9 mai 2016 organise la liberté syndicale, la négociation collective et l'efficacité des contrats de secteur (industrie, artisanat, commerce, services, bâtiment, hôtellerie, banques, etc.). Un projet de modification de cette loi, examiné en seconde lecture en septembre 2026, porte sur la représentativité des partenaires sociaux, pas sur l'instauration d'un salaire minimum national légal. Aucun texte officiel consulté n'institue un plancher légal unique pour tout le territoire. Cette page ne retient donc aucun montant unique, qui relèverait d'une convention de branche et non d'un SMIC saint-marinais.",
    ],
  },
  {
    code: "RS",
    slug: "serbie",
    nameFr: "Serbie",
    inPhrase: "en Serbie",
    group: "other-europe",
    status: "national",
    eurostatMonthlyEur: 743,
    eurostatPps: 1094,
    nationalCurrencyAmount: 87207,
    nationalCurrencyCode: "RSD",
    legalReference: "87 207 RSD brut / mois (devise nationale Eurostat)",
    typeLabel: "Salaire minimum national",
    referenceDateLabel: EUROSTAT_PERIOD_LABEL,
    sourceName: "Eurostat earn_mw_cur",
    sourceUrl: EUROSTAT_URL,
    extraParagraphs: [
      `En Serbie, un salaire minimum national existe. Eurostat retient 87 207 RSD brut par mois au ${EUROSTAT_PERIOD_LABEL}, soit ${formatEuroInt(743)} en équivalent euros.`,
    ],
  },
  {
    code: "SK",
    slug: "slovaquie",
    nameFr: "Slovaquie",
    inPhrase: "en Slovaquie",
    group: "eu",
    status: "national",
    eurostatMonthlyEur: 915,
    eurostatPps: 1074,
    legalReference: "915 € brut / mois",
    typeLabel: "Salaire minimum national",
    referenceDateLabel: "1er janvier 2026 (barème national) ; Eurostat au 1er juillet 2026",
    sourceName: "MPSVR SR, oznámenie č. 245/2025 Z. z. ; Eurostat",
    sourceUrl:
      "https://www.employment.gov.sk/sk/praca-zamestnanost/vztah-zamestnanca-zamestnavatela/odmenovanie/minimalna-mzda/sumy-minimalnej-mzdy.html",
    extraParagraphs: [
      `En Slovaquie, le salaire minimum national est de 915 € brut par mois depuis le 1er janvier 2026. Eurostat publie le même montant au ${EUROSTAT_PERIOD_LABEL}.`,
    ],
  },
  {
    code: "SI",
    slug: "slovenie",
    nameFr: "Slovénie",
    inPhrase: "en Slovénie",
    group: "eu",
    status: "national",
    eurostatMonthlyEur: 1482,
    eurostatPps: 1660,
    legalReference: "1 481,88 € brut / mois",
    typeLabel: "Salaire minimum national",
    referenceDateLabel: "1er janvier 2026 (barème national) ; Eurostat au 1er juillet 2026",
    sourceName: "GOV.SI / Uradni list RS 6/2026 ; Eurostat",
    sourceUrl: "https://www.gov.si/teme/minimalna-placa/",
    extraParagraphs: [
      `En Slovénie, le salaire minimum national pour un temps plein est de 1 481,88 € brut par mois du 1er janvier au 31 décembre 2026 (décision ministérielle publiée à l'Uradni list RS n° 6/2026). Eurostat publie ${formatEuroInt(1482)} brut par mois au ${EUROSTAT_PERIOD_LABEL}, soit le même montant arrondi à l'euro.`,
    ],
  },
  {
    code: "SE",
    slug: "suede",
    nameFr: "Suède",
    inPhrase: "en Suède",
    group: "eu",
    status: "no-national",
    legalReference: "Pas de salaire minimum national",
    typeLabel: "Minima principalement fixés par conventions collectives",
    referenceDateLabel: EUROSTAT_PERIOD_LABEL,
    sourceName: "Eurostat earn_mw_cur",
    sourceUrl: EUROSTAT_URL,
    extraParagraphs: [
      "En Suède, il n'existe pas de salaire minimum national légal. Les planchers sont négociés par les partenaires sociaux. Eurostat ne publie pas de montant national comparable.",
    ],
  },
  {
    code: "CH",
    slug: "suisse",
    nameFr: "Suisse",
    inPhrase: "en Suisse",
    group: "other-europe",
    status: "no-national",
    legalReference: "Pas de salaire minimum national (fédéral)",
    typeLabel: "Minima cantonaux et/ou conventions collectives",
    referenceDateLabel: EUROSTAT_PERIOD_LABEL,
    sourceName: "Eurostat earn_mw_cur",
    sourceUrl: EUROSTAT_URL,
    extraParagraphs: [
      "En Suisse, il n'existe pas de salaire minimum fédéral. Une initiative populaire en ce sens a été rejetée en 2014. Eurostat ne publie donc pas de montant national comparable.",
      "Plusieurs cantons ont toutefois institué un minimum cantonal (notamment Genève, Bâle-Ville, Jura, Neuchâtel et Tessin). Ces taux horaires varient d'un canton à l'autre et peuvent coexister avec des conventions collectives étendues. Il n'y a pas de « SMIC suisse » unique à l'échelle du pays.",
    ],
  },
  {
    code: "TR",
    slug: "turquie",
    nameFr: "Turquie",
    inPhrase: "en Turquie",
    group: "other-europe",
    status: "national",
    eurostatMonthlyEur: 621,
    nationalCurrencyAmount: 33030,
    nationalCurrencyCode: "TRY",
    legalReference: "33 030 TRY brut / mois (devise nationale Eurostat)",
    typeLabel: "Salaire minimum national",
    referenceDateLabel: EUROSTAT_PERIOD_LABEL,
    sourceName: "Eurostat earn_mw_cur",
    sourceUrl: EUROSTAT_URL,
    extraParagraphs: [
      `En Turquie, Eurostat publie un équivalent de ${formatEuroInt(621)} brut par mois au ${EUROSTAT_PERIOD_LABEL} (33 030 TRY). L'extrait 2026-S2 ne contient pas de chiffre SPA pour ce pays. La conversion en euros dépend du taux de change retenu par Eurostat, pas du cours du jour.`,
    ],
  },
  {
    code: "UA",
    slug: "ukraine",
    nameFr: "Ukraine",
    inPhrase: "en Ukraine",
    group: "other-europe",
    status: "national",
    eurostatMonthlyEur: 169,
    nationalCurrencyAmount: 8647,
    nationalCurrencyCode: "UAH",
    legalReference: "8 647 UAH brut / mois (devise nationale Eurostat)",
    typeLabel: "Salaire minimum national",
    referenceDateLabel: EUROSTAT_PERIOD_LABEL,
    sourceName: "Eurostat earn_mw_cur",
    sourceUrl: EUROSTAT_URL,
    extraParagraphs: [
      `En Ukraine, Eurostat publie un équivalent de ${formatEuroInt(169)} brut par mois au ${EUROSTAT_PERIOD_LABEL} (8 647 UAH). Aucun SPA n'est publié pour ce pays dans le même extrait. Le chiffre en euros reflète aussi le taux de change retenu par Eurostat.`,
    ],
  },
  {
    code: "VA",
    slug: "vatican",
    nameFr: "Vatican",
    inPhrase: "au Vatican",
    group: "other-europe",
    status: "unverified-2026",
    legalReference: "Donnée 2026 non vérifiée avec une source officielle suffisamment fiable",
    typeLabel: EMPTY,
    referenceDateLabel: EMPTY,
    sourceName: "Hors dataset Eurostat earn_mw_cur 2026-S2",
    sourceUrl: EUROSTAT_URL,
  },
];

function byNameFr(a: EuropeCountry, b: EuropeCountry): number {
  return a.nameFr.localeCompare(b.nameFr, "fr");
}

export const EUROPE_COUNTRIES: EuropeCountry[] = [...COUNTRIES].sort(byNameFr);

export const EU_COUNTRIES = EUROPE_COUNTRIES.filter((c) => c.group === "eu");
export const OTHER_EUROPE_COUNTRIES = EUROPE_COUNTRIES.filter((c) => c.group === "other-europe");
export const COUNTRIES_WITH_NATIONAL = EUROPE_COUNTRIES.filter((c) => c.status === "national");
export const COUNTRIES_WITHOUT_NATIONAL = EUROPE_COUNTRIES.filter((c) => c.status === "no-national");
export const COUNTRIES_UNVERIFIED = EUROPE_COUNTRIES.filter((c) => c.status === "unverified-2026");
export const COUNTRIES_WITH_SECTIONS = EUROPE_COUNTRIES.filter((c) => c.status !== "unverified-2026");

export const EU_WITH_NATIONAL_COUNT = EU_COUNTRIES.filter((c) => c.status === "national").length;
export const EU_WITHOUT_NATIONAL_COUNT = EU_COUNTRIES.filter((c) => c.status === "no-national").length;

export function nationalCell(country: EuropeCountry): string {
  if (country.status === "national") return "Oui";
  if (country.status === "no-national") return "Non";
  return "Non déterminé ici";
}

export function eurostatCell(country: EuropeCountry): string {
  if (country.status === "no-national") return "Pas de salaire minimum national";
  if (country.status === "unverified-2026") return "Donnée 2026 non vérifiée";
  if (country.eurostatMonthlyEur == null) return "Non publié par Eurostat";
  return formatEuroInt(country.eurostatMonthlyEur);
}

function headingFor(country: EuropeCountry): string {
  if (country.status === "no-national") {
    return `Existe-t-il un salaire minimum ${country.inPhrase} en ${SMIC_EUROPE_EDITORIAL_YEAR} ?`;
  }
  return `Quel est le salaire minimum ${country.inPhrase} en ${SMIC_EUROPE_EDITORIAL_YEAR} ?`;
}

function defaultOpening(country: EuropeCountry): string {
  if (country.status === "no-national") {
    return `${country.inPhrase.charAt(0).toUpperCase()}${country.inPhrase.slice(1)}, il n'existe pas de salaire minimum national unique au ${EUROSTAT_PERIOD_LABEL}.`;
  }
  if (country.eurostatMonthlyEur != null) {
    return `${country.inPhrase.charAt(0).toUpperCase()}${country.inPhrase.slice(1)}, un salaire minimum national existe. Eurostat publie un équivalent mensuel brut comparable de ${formatEuroInt(country.eurostatMonthlyEur)} au ${EUROSTAT_PERIOD_LABEL} (dataset ${EUROSTAT_DATASET}).`;
  }
  return `${country.inPhrase.charAt(0).toUpperCase()}${country.inPhrase.slice(1)}, un salaire minimum national existe, mais Eurostat ne publie pas d'équivalent mensuel dans ${EUROSTAT_DATASET} pour ${EUROSTAT_PERIOD}.`;
}

function currencySentence(country: EuropeCountry): string | null {
  if (country.nationalCurrencyAmount == null || !country.nationalCurrencyCode) return null;
  if (country.nationalCurrencyCode === "EUR") return null;
  return `En devise nationale, Eurostat retient ${formatNationalAmount(country.nationalCurrencyAmount, country.nationalCurrencyCode)} brut par mois pour la même date. L'équivalent en euros peut bouger si le taux de change change, même sans modification du minimum local.`;
}

export function buildCountrySubsection(country: EuropeCountry): GuideSubsection {
  const paragraphs = country.extraParagraphs?.length
    ? country.extraParagraphs
    : [defaultOpening(country), currencySentence(country)].filter((item): item is string => Boolean(item));

  const blocks: GuideSubsection["blocks"] = paragraphs.map((text) => ({ type: "paragraph" as const, text }));

  if (country.code === "FR") {
    blocks.push({
      type: "internal-link",
      variant: "guide",
      intro: "Pour le détail du barème français, du net indicatif et des règles de revalorisation,",
      label: "voir le montant et les règles du SMIC en France",
      href: "/smic",
    });
    blocks.push({
      type: "internal-link",
      variant: "guide",
      intro: "Pour le SMIC selon la durée hebdomadaire,",
      label: "consulter le SMIC brut et net selon le nombre d'heures",
      href: "/smic-selon-nombre-heures",
    });
  }

  blocks.push({
    type: "internal-link",
    variant: "guide",
    intro: "Source :",
    label: country.sourceName,
    href: country.sourceUrl,
  });

  return {
    id: countryAnchor(country.slug),
    title: headingFor(country),
    flagCode: country.code,
    blocks,
  };
}

export function buildMainTable(): GuideTable {
  return {
    type: "table",
    caption: `Salaires minimums en Europe en ${SMIC_EUROPE_EDITORIAL_YEAR}, pays par pays. Colonne euros : équivalent mensuel brut Eurostat au ${EUROSTAT_PERIOD_LABEL} lorsqu'il existe. Ordre alphabétique, pas un classement.`,
    headers: [
      "Pays",
      "Salaire minimum national ?",
      "Montant légal de référence",
      "Équivalent mensuel brut Eurostat",
      "Type de minimum",
      "Date de référence",
    ],
    rows: EUROPE_COUNTRIES.map((country) => [
      country.nameFr,
      nationalCell(country),
      country.legalReference,
      eurostatCell(country),
      country.typeLabel,
      country.referenceDateLabel,
    ]),
    rowFlags: EUROPE_COUNTRIES.map((country) => country.code),
    rowIds: EUROPE_COUNTRIES.map((country) => {
      const letter = countryIndexLetter(country.nameFr);
      const first = EUROPE_COUNTRIES.find((item) => countryIndexLetter(item.nameFr) === letter);
      return first?.code === country.code ? tableLetterAnchor(letter) : undefined;
    }),
    stackOnMobile: true,
    rowHeader: true,
    stickyFirstColumn: true,
  };
}

export function buildCountryNavItems(countries: EuropeCountry[]): GuideListItem[] {
  return countries.map((country) => ({
    text: "·",
    href: europeCountryHref(country.slug),
    label: country.nameFr,
  }));
}

export function countryIndexLetter(nameFr: string): string {
  const first = nameFr.normalize("NFD").replace(/\p{M}/gu, "").charAt(0);
  return first.toUpperCase();
}

export function countryLetterAnchor(letter: string): string {
  return `pays-${letter.toLowerCase()}`;
}

export function tableLetterAnchor(letter: string): string {
  return `table-pays-${letter.toLowerCase()}`;
}

export type TableLetterIndexItem = {
  letter: string;
  id: string;
  nameFr: string;
};

export function buildTableLetterIndex(
  countries: EuropeCountry[] = EUROPE_COUNTRIES,
): TableLetterIndexItem[] {
  const items: TableLetterIndexItem[] = [];
  const seen = new Set<string>();
  for (const country of countries) {
    const letter = countryIndexLetter(country.nameFr);
    if (seen.has(letter)) {
      continue;
    }
    seen.add(letter);
    items.push({
      letter,
      id: tableLetterAnchor(letter),
      nameFr: country.nameFr,
    });
  }
  return items;
}

export type CountryLetterGroup = {
  letter: string;
  id: string;
  countries: EuropeCountry[];
};

export function buildCountryLetterGroups(
  countries: EuropeCountry[] = COUNTRIES_WITH_SECTIONS,
): CountryLetterGroup[] {
  const groups = new Map<string, EuropeCountry[]>();
  for (const country of countries) {
    const letter = countryIndexLetter(country.nameFr);
    const list = groups.get(letter) ?? [];
    list.push(country);
    groups.set(letter, list);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b, "fr"))
    .map(([letter, list]) => ({
      letter,
      id: countryLetterAnchor(letter),
      countries: list,
    }));
}

export function buildPpsExampleTable(): GuideTable {
  const sampleCodes = ["DE", "BE", "BG", "EE", "FR", "LU"];
  const rows = EUROPE_COUNTRIES.filter(
    (country) => sampleCodes.includes(country.code) && country.eurostatMonthlyEur != null && country.eurostatPps != null,
  ).map((country) => [
    country.nameFr,
    formatEuroInt(country.eurostatMonthlyEur!),
    formatPps(country.eurostatPps!),
  ]);
  return {
    type: "table",
    caption: `Exemples d'équivalents Eurostat au ${EUROSTAT_PERIOD_LABEL} : euros courants et standard de pouvoir d'achat (SPA). Ce n'est pas un salaire versé.`,
    headers: ["Pays", "Équivalent mensuel brut (€)", "Équivalent en SPA"],
    rows,
    stackOnMobile: true,
    rowHeader: true,
  };
}

export const SMIC_EUROPE_SEO_TITLE_LENGTH = SMIC_EUROPE_SEO_TITLE.length;
export const SMIC_EUROPE_META_LENGTH = SMIC_EUROPE_META_DESCRIPTION.length;
