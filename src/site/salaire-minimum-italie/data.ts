/**
 * Source de vérité éditoriale : /salaire-minimum-italie
 *
 * Title SEO sans année, avec « règles et minima par secteur ».
 * H1 et contenu portent l'année éditoriale des données vérifiées.
 *
 * Checklist de maintenance (ne pas afficher au lecteur) :
 * - cadre national (salario giusto, éventuel minimum légal unique) ;
 * - CCNL Confcommercio H011 : tranche du 1er novembre, suivante au 1er février 2027 ;
 * - CCNL Federmeccanica-Assistal C011 : minima au 1er juin, suivantes 2027 et 2028 ;
 * - barème travail domestique (accord annuel, table ministérielle) ;
 * - proposition 9 € / h (C.2179) tant qu'elle n'est pas loi ;
 * - comparaison France : SMIC_CURRENT du site ;
 * - fiche Italie de /smic-europe (méthode Eurostat inchangée).
 * Pas de bascule automatique. Dates published/updated à figer à la mise en ligne.
 */

import { SMIC_CURRENT, SMIC_EFFECTIVE_FROM_LABEL } from "@/site/smic/data";
import { annualFromMonthly, formatItEuro, prorataMonthly } from "./engine";

export const IT_MIN_WAGE_SLUG = "salaire-minimum-italie";
export const IT_MIN_WAGE_PATH = "/salaire-minimum-italie";

export const IT_MIN_WAGE_EDITORIAL_YEAR = 2026;

/**
 * Dates éditoriales.
 * - PUBLISHED_AT : première mise en ligne le 1er novembre 2026 (Europe/Paris).
 * - UPDATED_AT : même jour civil pour cette première version.
 */
export const IT_MIN_WAGE_PUBLISHED_AT = "2026-11-01T00:00:00+01:00";
export const IT_MIN_WAGE_UPDATED_AT = "2026-11-01T00:00:00+01:00";
export const IT_MIN_WAGE_UPDATED_AT_LABEL = "1er novembre 2026";

export const IT_MIN_WAGE_SOURCES_VERIFIED_AT = "2026-11-01";
export const IT_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL = "1er novembre 2026";

export const IT_MIN_WAGE_H1 =
  "Salaire minimum en Italie en 2026 : règles et minima par secteur";

export const IT_MIN_WAGE_SEO_TITLE =
  "Salaire minimum en Italie : règles et minima par secteur";

export const IT_MIN_WAGE_META_DESCRIPTION =
  "Existe-t-il un SMIC en Italie ? Comprenez les minima par secteur, les conventions collectives et les points à vérifier sur une offre ou une fiche de paie.";

export const IT_MIN_WAGE_BREADCRUMB = "Salaire minimum Italie";

export const IT_MIN_WAGE_SUBTITLE =
  "Pas de SMIC national unique : CCNL, minima par secteur et points à vérifier.";

export const IT_MIN_WAGE_AMOUNTS_BLOCK_TITLE =
  "L'essentiel sur le salaire minimum en Italie en 2026";

export const IT_COMPARE_FR_HOURLY = SMIC_CURRENT.hourlyGross;
export const IT_COMPARE_FR_MONTHLY = SMIC_CURRENT.monthlyGross;
export const IT_COMPARE_FR_FROM_LABEL = SMIC_EFFECTIVE_FROM_LABEL;

/** Hypothèse pédagogique, pas un minimum. */
export const IT_PEDAGOGICAL_MONTHLY = 1500;
export const IT_PEDAGOGICAL_MONTHS_13 = 13;
export const IT_PEDAGOGICAL_MONTHS_14 = 14;
export const IT_PEDAGOGICAL_ANNUAL_13 = annualFromMonthly(
  IT_PEDAGOGICAL_MONTHLY,
  IT_PEDAGOGICAL_MONTHS_13,
);
export const IT_PEDAGOGICAL_ANNUAL_14 = annualFromMonthly(
  IT_PEDAGOGICAL_MONTHLY,
  IT_PEDAGOGICAL_MONTHS_14,
);

export const IT_COMMERCE_CNEL = "H011";
export const IT_COMMERCE_FROM = "2026-11-01";
export const IT_COMMERCE_FROM_LABEL = "1er novembre 2026";
export const IT_COMMERCE_MONTHS = 14;
export const IT_COMMERCE_NAME =
  "CCNL Terziario, Distribuzione e Servizi (Confcommercio)";
export const IT_COMMERCE_SIGNATORIES =
  "Confcommercio, FILCAMS-CGIL, FISASCAT-CISL, UILTuCS";

/** Salaire de base (paga base) mensuel brut, niveau IV. */
export const IT_COMMERCE_IV_BASE = 1292.46;
/** Indemnité de contingence (contingenza), niveau IV. */
export const IT_COMMERCE_IV_CONTINGENZA = 524.22;
/** Élément additionnel de salaire de base, niveau VII uniquement. */
export const IT_COMMERCE_VII_EXTRA_BASE = 5.16;
/** Salaire de base (paga base) mensuel brut, niveau VII. */
export const IT_COMMERCE_VII_BASE = 897.53;
/** Indemnité de contingence (contingenza), niveau VII. */
export const IT_COMMERCE_VII_CONTINGENZA = 517.51;
/** Troisième élément (terzo elemento) du barème national retenu. */
export const IT_COMMERCE_TERZO_ELEMENTO = 2.07;
/** Total conventionnel fixe mensuel brut, niveau IV. */
export const IT_COMMERCE_IV_TOTAL = 1818.75;
/** Total conventionnel fixe mensuel brut, niveau VII. */
export const IT_COMMERCE_VII_TOTAL = 1422.27;

export const IT_METAL_CNEL = "C011";
export const IT_METAL_FROM = "2026-06-01";
export const IT_METAL_FROM_LABEL = "1er juin 2026";
export const IT_METAL_MONTHS = 13;
export const IT_METAL_NAME =
  "CCNL Industria metalmeccanica e installazione di impianti (Federmeccanica-Assistal)";
export const IT_METAL_SIGNATORIES =
  "Federmeccanica, Assistal, FIM-CISL, FIOM-CGIL, UILM-UIL";

/** Minimo tabellare mensuel brut, niveau D1 (ex 2e). */
export const IT_METAL_D1 = 1784.94;
/** Minimo tabellare mensuel brut, niveau C3 (ex 5e). */
export const IT_METAL_C3 = 2211.43;

export const IT_METAL_D1_ANNUAL_13 = annualFromMonthly(
  IT_METAL_D1,
  IT_METAL_MONTHS,
);
export const IT_METAL_D1_HALF = prorataMonthly(IT_METAL_D1, 0.5);

export const IT_DOMESTIC_FROM = "2026-01-01";
export const IT_DOMESTIC_FROM_LABEL = "1er janvier 2026";
export const IT_DOMESTIC_ISTAT = 1;
export const IT_DOMESTIC_NAME = "CCNL lavoro domestico";
export const IT_DOMESTIC_SIGNATORIES =
  "FIDALDO, DOMINA, FEDERCOLF, FILCAMS-CGIL, FISASCAT-CISL, UILTuCS";

/** Mensuel brut, salarié vivant au domicile (convivente), niveau A. */
export const IT_DOMESTIC_A_LIVE_IN = 908.1;
/** Mensuel brut, salarié vivant au domicile (convivente), niveau CS. */
export const IT_DOMESTIC_CS_LIVE_IN = 1193.84;
/** Horaire brut, salarié ne vivant pas au domicile (non convivente), niveau A. */
export const IT_DOMESTIC_A_HOURLY = 6.51;
/** Horaire brut, salarié ne vivant pas au domicile (non convivente), niveau CS. */
export const IT_DOMESTIC_CS_HOURLY = 8.3;
/** Mensuel brut, présence de nuit, niveau unique. */
export const IT_DOMESTIC_NIGHT_PRESENCE = 811.09;

export const IT_MIN_WAGE_LABELS = {
  commerceIvBase: formatItEuro(IT_COMMERCE_IV_BASE),
  commerceIvContingenza: formatItEuro(IT_COMMERCE_IV_CONTINGENZA),
  commerceIvTotal: formatItEuro(IT_COMMERCE_IV_TOTAL),
  commerceViiBase: formatItEuro(IT_COMMERCE_VII_BASE),
  commerceViiExtraBase: formatItEuro(IT_COMMERCE_VII_EXTRA_BASE),
  commerceViiContingenza: formatItEuro(IT_COMMERCE_VII_CONTINGENZA),
  commerceViiTotal: formatItEuro(IT_COMMERCE_VII_TOTAL),
  commerceTerzoElemento: formatItEuro(IT_COMMERCE_TERZO_ELEMENTO),
  metalD1: formatItEuro(IT_METAL_D1),
  metalC3: formatItEuro(IT_METAL_C3),
  metalD1Annual13: formatItEuro(IT_METAL_D1_ANNUAL_13),
  metalD1Half: formatItEuro(IT_METAL_D1_HALF),
  domesticALiveIn: formatItEuro(IT_DOMESTIC_A_LIVE_IN),
  domesticCsLiveIn: formatItEuro(IT_DOMESTIC_CS_LIVE_IN),
  domesticAHourly: formatItEuro(IT_DOMESTIC_A_HOURLY),
  domesticCsHourly: formatItEuro(IT_DOMESTIC_CS_HOURLY),
  domesticNightPresence: formatItEuro(IT_DOMESTIC_NIGHT_PRESENCE),
  pedagogicalMonthly: formatItEuro(IT_PEDAGOGICAL_MONTHLY),
  pedagogicalAnnual13: formatItEuro(IT_PEDAGOGICAL_ANNUAL_13),
  pedagogicalAnnual14: formatItEuro(IT_PEDAGOGICAL_ANNUAL_14),
  frHourly: formatItEuro(IT_COMPARE_FR_HOURLY),
  frMonthly: formatItEuro(IT_COMPARE_FR_MONTHLY),
  domesticIstat: `${IT_DOMESTIC_ISTAT.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} %`,
};

export const IT_MIN_WAGE_SOURCES = {
  eurostat: {
    org: "Eurostat",
    label: "Salaires minimums mensuels (earn_mw_cur) : l'Italie n'a pas de montant national",
    href: "https://ec.europa.eu/eurostat/databrowser/view/earn_mw_cur/default/table?lang=fr",
  },
  eurostatMeta: {
    org: "Eurostat",
    label: "Métadonnées des salaires minimums (earn_minw)",
    href: "https://ec.europa.eu/eurostat/cache/metadata/en/earn_minw_esms.htm",
  },
  constitution36: {
    org: "Presidenza del Consiglio / Costituzione",
    label: "Constitution italienne, article 36 (rémunération proportionnée et suffisante)",
    href: "https://presidenza.governo.it/Governo/Costituzione/1_titolo3.html",
  },
  constitution39: {
    org: "Presidenza del Consiglio / Costituzione",
    label: "Constitution italienne, article 39 (organisation syndicale)",
    href: "https://presidenza.governo.it/Governo/Costituzione/1_titolo3.html",
  },
  ministryCcnl: {
    org: "Ministère italien du Travail",
    label: "Contratti collettivi nazionali di lavoro",
    href: "https://distaccoue.lavoro.gov.it/it-it/Aree-Tematiche/Area-Tematica/id/3/Contratti-collettivi-nazionali",
  },
  ministryLevel: {
    org: "Ministère italien du Travail",
    label: "Éléments déterminant le niveau de rémunération",
    href: "https://www.lavoro.gov.it/sportello-unico-digitale/termini-e-condizioni-di-impiego/elementi-determinanti-stabilire-il-livello",
  },
  cnelArchive: {
    org: "CNEL",
    label: "Archive officielle des contrats collectifs",
    href: "https://www.cnel.it/archivio-contratti",
  },
  cnelPrivate: {
    org: "CNEL",
    label: "Contrats collectifs du secteur privé",
    href: "https://www.cnel.it/archivio-contratti/entra-nell-archivio/contratti-collettivi-del-settore-privato",
  },
  law144: {
    org: "Gazzetta Ufficiale / Normattiva",
    label: "Loi du 26 septembre 2025 n° 144 (délégation, sans taux national chiffré)",
    href: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2025-09-26;144",
  },
  dl62: {
    org: "Gazzetta Ufficiale",
    label: "Décret-loi du 30 avril 2026 n° 62",
    href: "https://www.gazzettaufficiale.it/eli/id/2026/04/30/26G00082/sg",
  },
  law112: {
    org: "Gazzetta Ufficiale",
    label: "Loi de conversion du 25 juin 2026 n° 112",
    href: "https://www.gazzettaufficiale.it/eli/id/2026/06/27/26G00128/SG",
  },
  coordinated112: {
    org: "Gazzetta Ufficiale",
    label: "Texte coordonné du décret-loi n° 62/2026 converti par la loi n° 112/2026",
    href: "https://www.gazzettaufficiale.it/atto/vediMenuHTML?atto.codiceRedazionale=26A03291&atto.dataPubblicazioneGazzetta=2026-06-27&tipoSerie=serie_generale&tipoVigenza=originario",
  },
  camera2179: {
    org: "Camera dei deputati",
    label: "Proposition de loi C.2179 (projet de salario minimo, 9 € brut par heure)",
    href: "https://www.camera.it/leg19/126?tab=&leg=19&idDocumento=2179&sede=&tipo=",
  },
  camera2179Dossier: {
    org: "Camera dei deputati, Servizio Studi",
    label: "Dossier LA0222 sur la proposition C.2179 (8 avril 2026)",
    href: "https://documenti.camera.it/leg19/dossier/testi/LA0222.htm",
  },
  commerceConfcommercio: {
    org: "Confcommercio Milano",
    label: "Testo unico CCNL Terziario, Distribuzione e Servizi du 3 février 2026 (H011)",
    href: "https://www.confcommerciomilano.it/it/contratti_lavoro/contrattazione_collettiva/ccnl_terziario_T_U_2026.html",
  },
  commerceFilcams: {
    org: "FILCAMS-CGIL",
    label: "Barème CCNL Terziario Confcommercio applicable au 1er novembre 2026",
    href: "https://www.filcams.cgil.it/page/confcommercio_terziario",
  },
  commerceTerzo: {
    org: "Enbil Brescia / Confcommercio",
    label: "Troisième élément (terzo elemento) et montants territoriaux du CCNL Terziario",
    href: "https://www.enbilbrescia.it/contratto/ccnl-e-tabelle-retributive-2",
  },
  metalFim: {
    org: "FIM-CISL",
    label: "Minima tabellari Federmeccanica-Assistal au 1er juin 2026",
    href: "https://www.fim-cisl.it/2026/06/15/ccnl-federmeccanica-assistal-2025-2028-nuovi-minimi-tabellari-giugno-2026/",
  },
  metalRenewal: {
    org: "FIM-CISL",
    label: "Renouvellement du CCNL metalmeccanici du 22 novembre 2025",
    href: "https://www.fim-cisl.it/2025/11/22/ccnl-metalmeccanici-rinnovato-il-contratto-aumento-mensile-di-205-32-euro-pari-al-964-superiori-al-dato-inflattivo-ipca/",
  },
  domesticNews: {
    org: "Ministère italien du Travail",
    label: "Accord sur les minima du travail domestique 2026",
    href: "https://www.lavoro.gov.it/notizie/pagine/lavoro-domestico-accordo-sui-minimi-retributivi-2026",
  },
  domesticTable: {
    org: "Ministère italien du Travail",
    label: "Table des minima du travail domestique, à compter du 1er janvier 2026",
    href: "https://www.lavoro.gov.it/temi-e-priorita-rapporti-di-lavoro-e-relazioni-industriali/focus/tabella-lavoro-domestico-2026",
  },
  domesticCcnl: {
    org: "Cassacolf",
    label: "CCNL lavoro domestico : classification, horaires et treizième mois",
    href: "https://www.cassacolf.it/chi-siamo/ccnl/",
  },
  hours66: {
    org: "Normattiva",
    label: "D.Lgs. n° 66/2003 sur l'aménagement du temps de travail",
    href: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2003-04-08;66",
  },
  apprenticeship81: {
    org: "Normattiva",
    label: "D.Lgs. n° 81/2015, dispositions sur l'apprentissage",
    href: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2015-06-15;81",
  },
  inlWorkers: {
    org: "Ispettorato Nazionale del Lavoro",
    label: "Services et formulaires pour les travailleurs",
    href: "https://www.ispettorato.gov.it/servizi-e-modulistica/per-i-lavoratori/",
  },
  inps: {
    org: "INPS",
    label: "Institut national de prévoyance sociale",
    href: "https://www.inps.it/",
  },
  entrate: {
    org: "Agenzia delle Entrate",
    label: "Administration fiscale italienne",
    href: "https://www.agenziaentrate.gov.it/",
  },
  smicFr: {
    org: "Service-Public.fr",
    label: "SMIC (fiche F2300)",
    href: "https://www.service-public.fr/particuliers/vosdroits/F2300",
  },
};

export type ItExampleKind = "tabellare" | "total-fixed" | "hourly" | "monthly-domestic";

export interface ItSectorExample {
  id: string;
  ccnlName: string;
  cnelCode?: string;
  signatories: string;
  level: string;
  kind: ItExampleKind;
  kindLabel: string;
  amount: number;
  unit: "month" | "hour";
  unitLabel: string;
  from: string;
  fromLabel: string;
  months?: number;
  sourceKey: keyof typeof IT_MIN_WAGE_SOURCES;
}

export const IT_SECTOR_EXAMPLES = {
  commerceIvBase: {
    id: "commerce-iv-base",
    ccnlName: IT_COMMERCE_NAME,
    cnelCode: IT_COMMERCE_CNEL,
    signatories: IT_COMMERCE_SIGNATORIES,
    level: "IV",
    kind: "tabellare",
    kindLabel: "Paga base mensuelle brute",
    amount: IT_COMMERCE_IV_BASE,
    unit: "month",
    unitLabel: "brut par mois",
    from: IT_COMMERCE_FROM,
    fromLabel: IT_COMMERCE_FROM_LABEL,
    months: IT_COMMERCE_MONTHS,
    sourceKey: "commerceFilcams",
  },
  commerceIvTotal: {
    id: "commerce-iv-total",
    ccnlName: IT_COMMERCE_NAME,
    cnelCode: IT_COMMERCE_CNEL,
    signatories: IT_COMMERCE_SIGNATORIES,
    level: "IV",
    kind: "total-fixed",
    kindLabel: "Total conventionnel fixe mensuel brut",
    amount: IT_COMMERCE_IV_TOTAL,
    unit: "month",
    unitLabel: "brut par mois",
    from: IT_COMMERCE_FROM,
    fromLabel: IT_COMMERCE_FROM_LABEL,
    months: IT_COMMERCE_MONTHS,
    sourceKey: "commerceFilcams",
  },
  commerceViiBase: {
    id: "commerce-vii-base",
    ccnlName: IT_COMMERCE_NAME,
    cnelCode: IT_COMMERCE_CNEL,
    signatories: IT_COMMERCE_SIGNATORIES,
    level: "VII",
    kind: "tabellare",
    kindLabel: "Paga base mensuelle brute",
    amount: IT_COMMERCE_VII_BASE,
    unit: "month",
    unitLabel: "brut par mois",
    from: IT_COMMERCE_FROM,
    fromLabel: IT_COMMERCE_FROM_LABEL,
    months: IT_COMMERCE_MONTHS,
    sourceKey: "commerceFilcams",
  },
  commerceViiTotal: {
    id: "commerce-vii-total",
    ccnlName: IT_COMMERCE_NAME,
    cnelCode: IT_COMMERCE_CNEL,
    signatories: IT_COMMERCE_SIGNATORIES,
    level: "VII",
    kind: "total-fixed",
    kindLabel: "Total conventionnel fixe mensuel brut",
    amount: IT_COMMERCE_VII_TOTAL,
    unit: "month",
    unitLabel: "brut par mois",
    from: IT_COMMERCE_FROM,
    fromLabel: IT_COMMERCE_FROM_LABEL,
    months: IT_COMMERCE_MONTHS,
    sourceKey: "commerceFilcams",
  },
  metalD1: {
    id: "metal-d1",
    ccnlName: IT_METAL_NAME,
    cnelCode: IT_METAL_CNEL,
    signatories: IT_METAL_SIGNATORIES,
    level: "D1 (ex 2e)",
    kind: "tabellare",
    kindLabel: "Minimo tabellare mensuel brut",
    amount: IT_METAL_D1,
    unit: "month",
    unitLabel: "brut par mois",
    from: IT_METAL_FROM,
    fromLabel: IT_METAL_FROM_LABEL,
    months: IT_METAL_MONTHS,
    sourceKey: "metalFim",
  },
  metalC3: {
    id: "metal-c3",
    ccnlName: IT_METAL_NAME,
    cnelCode: IT_METAL_CNEL,
    signatories: IT_METAL_SIGNATORIES,
    level: "C3 (ex 5e)",
    kind: "tabellare",
    kindLabel: "Minimo tabellare mensuel brut",
    amount: IT_METAL_C3,
    unit: "month",
    unitLabel: "brut par mois",
    from: IT_METAL_FROM,
    fromLabel: IT_METAL_FROM_LABEL,
    months: IT_METAL_MONTHS,
    sourceKey: "metalFim",
  },
  domesticALiveIn: {
    id: "domestic-a-live-in",
    ccnlName: IT_DOMESTIC_NAME,
    signatories: IT_DOMESTIC_SIGNATORIES,
    level: "A, vivant au domicile",
    kind: "monthly-domestic",
    kindLabel: "Minimum mensuel brut (convivente)",
    amount: IT_DOMESTIC_A_LIVE_IN,
    unit: "month",
    unitLabel: "brut par mois",
    from: IT_DOMESTIC_FROM,
    fromLabel: IT_DOMESTIC_FROM_LABEL,
    sourceKey: "domesticTable",
  },
  domesticCsLiveIn: {
    id: "domestic-cs-live-in",
    ccnlName: IT_DOMESTIC_NAME,
    signatories: IT_DOMESTIC_SIGNATORIES,
    level: "CS, vivant au domicile",
    kind: "monthly-domestic",
    kindLabel: "Minimum mensuel brut (convivente)",
    amount: IT_DOMESTIC_CS_LIVE_IN,
    unit: "month",
    unitLabel: "brut par mois",
    from: IT_DOMESTIC_FROM,
    fromLabel: IT_DOMESTIC_FROM_LABEL,
    sourceKey: "domesticTable",
  },
  domesticAHourly: {
    id: "domestic-a-hourly",
    ccnlName: IT_DOMESTIC_NAME,
    signatories: IT_DOMESTIC_SIGNATORIES,
    level: "A, hors domicile",
    kind: "hourly",
    kindLabel: "Minimum horaire brut (non convivente)",
    amount: IT_DOMESTIC_A_HOURLY,
    unit: "hour",
    unitLabel: "brut par heure",
    from: IT_DOMESTIC_FROM,
    fromLabel: IT_DOMESTIC_FROM_LABEL,
    sourceKey: "domesticTable",
  },
  domesticCsHourly: {
    id: "domestic-cs-hourly",
    ccnlName: IT_DOMESTIC_NAME,
    signatories: IT_DOMESTIC_SIGNATORIES,
    level: "CS, hors domicile",
    kind: "hourly",
    kindLabel: "Minimum horaire brut (non convivente)",
    amount: IT_DOMESTIC_CS_HOURLY,
    unit: "hour",
    unitLabel: "brut par heure",
    from: IT_DOMESTIC_FROM,
    fromLabel: IT_DOMESTIC_FROM_LABEL,
    sourceKey: "domesticTable",
  },
} as const satisfies Record<string, ItSectorExample>;
