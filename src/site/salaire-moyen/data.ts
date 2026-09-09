/**
 * Source de vérité : salaires moyens / médians en France (page /salaire-moyen-france).
 *
 * Règle d'or : ne jamais inventer ni dériver un chiffre « officiel » sans source primaire.
 * Mise à jour : voir MAINTENANCE.md dans ce dossier.
 *
 * Année éditoriale (H1) ≠ année statistique des données Insee.
 */

/** Année affichée dans le H1 (article), pas dans le Title Google. */
export const SALAIRE_MOYEN_EDITORIAL_YEAR = 2026;

/** Dates éditoriales de la page (calendrier ISO, pas date de build). */
export const SALAIRE_MOYEN_PUBLISHED_AT = "2026-09-09";
export const SALAIRE_MOYEN_UPDATED_AT = "2026-09-09";
export const SALAIRE_MOYEN_UPDATED_AT_LABEL = "9 septembre 2026";

/**
 * Année statistique des chiffres centraux du secteur privé (Insee Première n° 2079).
 * Ce n'est PAS « le salaire moyen de 2026 ».
 */
export const SALAIRE_MOYEN_STAT_YEAR = 2024;

export const SALAIRE_MOYEN_SEO_TITLE =
  "Salaire moyen en France : net, brut et médian | Mis à jour";

export const SALAIRE_MOYEN_H1 = `Salaire moyen en France en ${SALAIRE_MOYEN_EDITORIAL_YEAR} : combien gagnent les Français ?`;

export const SALAIRE_MOYEN_META_DESCRIPTION =
  "Découvrez le salaire moyen en France et les derniers chiffres de l'Insee : net, brut, médian, mais aussi les écarts selon l'âge, le secteur et la région.";

export const SALAIRE_MOYEN_AMOUNTS_BLOCK_TITLE =
  "Salaire moyen en France : les chiffres à retenir";

/** Champ standard des statistiques centrales (privé, base Tous salariés). */
export const SALAIRE_MOYEN_PRIVATE_SCOPE =
  "Salariés du secteur privé en France, y compris apprentis, stagiaires et contrats aidés ; hors agriculture et particuliers employeurs. Salaires mensuels en équivalent temps plein (EQTP).";

export type SalaryMeasure = "mean" | "median" | "decile" | "centile" | "ratio" | "percent";
export type SalaryPayKind = "net" | "gross";
export type SalaryUnit = "eur_month_eqtp" | "percent" | "ratio";

export interface OfficialSource {
  id: string;
  org: string;
  title: string;
  href: string;
  publishedOn: string;
  publishedOnLabel: string;
  statisticalYear: number;
  notes?: string;
  verifiedOn: string;
}

export interface StatDatum {
  id: string;
  value: number;
  unit: SalaryUnit;
  measure: SalaryMeasure;
  payKind?: SalaryPayKind;
  label: string;
  statisticalYear: number;
  sourceId: string;
  scope: string;
  note?: string;
}

export const SALAIRE_MOYEN_SOURCES: Record<string, OfficialSource> = {
  inseePrive2024: {
    id: "inseePrive2024",
    org: "Insee",
    title: "Les salaires dans le secteur privé en 2024 (Insee Première n° 2079)",
    href: "https://www.insee.fr/fr/statistiques/8657156",
    publishedOn: "2025-10-23",
    publishedOnLabel: "23 octobre 2025",
    statisticalYear: 2024,
    notes: "Base Tous salariés 2024. Champ élargi : apprentis, stagiaires et Mayotte inclus.",
    verifiedOn: "2026-09-09",
  },
  inseePcsRegions2024: {
    id: "inseePcsRegions2024",
    org: "Insee",
    title:
      "Salaire net mensuel moyen en EQTP par sexe et PCS dans le secteur privé en 2024 (comparaisons régionales)",
    href: "https://www.insee.fr/fr/statistiques/2012733",
    publishedOn: "2025-12-04",
    publishedOnLabel: "4 décembre 2025",
    statisticalYear: 2024,
    notes: "Même champ que Insee Première n° 2079 (privé, EQTP).",
    verifiedOn: "2026-09-09",
  },
  inseeFpe2024: {
    id: "inseeFpe2024",
    org: "Insee",
    title: "Les salaires dans la fonction publique de l'État en 2024 (Insee Première n° 2100)",
    href: "https://www.insee.fr/fr/statistiques/8986474",
    publishedOn: "2026-05-06",
    publishedOnLabel: "6 mai 2026",
    statisticalYear: 2024,
    notes: "Source Siasp. Champ distinct du secteur privé.",
    verifiedOn: "2026-09-09",
  },
  inseeFpt2024: {
    id: "inseeFpt2024",
    org: "Insee",
    title: "Les salaires dans la fonction publique territoriale en 2024 (Insee Première n° 2101)",
    href: "https://www.insee.fr/fr/statistiques/8984823",
    publishedOn: "2026-05-06",
    publishedOnLabel: "6 mai 2026",
    statisticalYear: 2024,
    notes: "Source Siasp. Champ distinct du secteur privé.",
    verifiedOn: "2026-09-09",
  },
  inseeFph2024: {
    id: "inseeFph2024",
    org: "Insee",
    title: "Les salaires dans la fonction publique hospitalière en 2024 (Insee Première n° 2102)",
    href: "https://www.insee.fr/fr/statistiques/8986438",
    publishedOn: "2026-05-06",
    publishedOnLabel: "6 mai 2026",
    statisticalYear: 2024,
    notes: "Source Siasp. Champ distinct du secteur privé.",
    verifiedOn: "2026-09-09",
  },
  inseeEssentielSalaires: {
    id: "inseeEssentielSalaires",
    org: "Insee",
    title: "L'essentiel sur… les salaires",
    href: "https://www.insee.fr/fr/statistiques/7457170",
    publishedOn: "2025-12-16",
    publishedOnLabel: "mise à jour Insee (séries 1996-2024)",
    statisticalYear: 2024,
    notes:
      "Indice du salaire net moyen EQTP en euros constants, base 100 en 1996. Arrondis d'affichage possibles vs Insee Première n° 2079.",
    verifiedOn: "2026-09-09",
  },
} as const;

const PRIVATE_SCOPE = SALAIRE_MOYEN_PRIVATE_SCOPE;

/** Chiffres centraux secteur privé 2024 (Insee Première n° 2079). */
export const PRIVATE_2024 = {
  meanNetMonthlyEqtp: 2733,
  meanGrossMonthlyEqtp: 3602,
  medianNetMonthlyEqtp: 2190,
  /** Écart médiane / moyenne déclaré par l'Insee (−19,9 %). */
  medianBelowMeanPercent: 19.9,
  d1NetMonthlyEqtp: 1492,
  d9NetMonthlyEqtp: 4334,
  /** Rapport interdécile D9/D1. */
  interdecileRatio: 2.91,
  p99NetMonthlyEqtp: 10261,
  meanNetCurrentEuroChangePercent: 2.8,
  meanGrossCurrentEuroChangePercent: 3.1,
  meanNetConstantEuroChangePercent: 0.8,
  inflationPercent: 2.0,
  genderGapWomenLowerPercent: 13.0,
  /** Champ alternatif hors apprentis/stagiaires et hors Mayotte. */
  meanNetExcludingApprenticesMayotte: 2814,
} as const;

export const PRIVATE_PCS_2024 = {
  cadresNet: 4629,
  cadresGross: 6224,
  professionsIntermediairesNet: 2633,
  professionsIntermediairesGross: 3475,
  employesNet: 1941,
  employesGross: 2500,
  ouvriersNet: 2051,
  ouvriersGross: 2659,
  womenNet: 2514,
  menNet: 2891,
} as const;

export const PRIVATE_SECTORS_2024 = {
  industrieNet: 3021,
  constructionNet: 2411,
  tertiaireNet: 2705,
  servicesFinanciersNet: 4123,
  informationCommunicationNet: 3853,
  hebergementRestaurationNet: 1979,
} as const;

/**
 * Salaires nets moyens EQTP par âge (champ principal : avec apprentis/stagiaires et Mayotte).
 * Source : encadré méthodologique Insee Première n° 2079.
 */
export const PRIVATE_AGE_2024 = {
  under25: 1622,
  from25to39: 2547,
  from40to49: 3007,
  from50to54: 3174,
  from55plus: 3266,
  /** Variante hors apprentis/stagiaires et hors Mayotte (moins de 25 ans). */
  under25ExcludingApprentices: 1865,
} as const;

/**
 * Salaires nets moyens EQTP par région (lieu de travail) - Insee 2012733.
 * Triés du plus élevé au plus bas ; la ligne France est la référence nationale.
 */
export const PRIVATE_REGIONS_2024 = [
  { id: "idf", label: "Île-de-France", net: 3479 },
  { id: "ara", label: "Auvergne-Rhône-Alpes", net: 2634 },
  { id: "paca", label: "Provence-Alpes-Côte d'Azur", net: 2569 },
  { id: "occ", label: "Occitanie", net: 2470 },
  { id: "guy", label: "Guyane", net: 2470 },
  { id: "ges", label: "Grand Est", net: 2455 },
  { id: "hdf", label: "Hauts-de-France", net: 2447 },
  { id: "mtq", label: "Martinique", net: 2440 },
  { id: "pdl", label: "Pays de la Loire", net: 2437 },
  { id: "nor", label: "Normandie", net: 2432 },
  { id: "cvl", label: "Centre-Val de Loire", net: 2426 },
  { id: "naq", label: "Nouvelle-Aquitaine", net: 2409 },
  { id: "glp", label: "Guadeloupe", net: 2405 },
  { id: "bre", label: "Bretagne", net: 2395 },
  { id: "bfc", label: "Bourgogne-Franche-Comté", net: 2390 },
  { id: "cor", label: "Corse", net: 2303 },
  { id: "reu", label: "La Réunion", net: 2237 },
  { id: "myt", label: "Mayotte", net: 2159 },
  { id: "france", label: "France (référence)", net: 2733 },
] as const;

/**
 * Indice du salaire net moyen EQTP en euros constants (base 100 = 1996).
 * Source : Insee, « L'essentiel sur… les salaires » (tableau d'évolution privé).
 * Points retenus pour le graphique ; la série annuelle complète figure sur la page Insee.
 */
export const PRIVATE_NET_MEAN_INDEX_CONSTANT = [
  { year: 1996, index: 100.0 },
  { year: 2000, index: 103.6 },
  { year: 2008, index: 107.9 },
  { year: 2012, index: 109.7 },
  { year: 2019, index: 114.3 },
  { year: 2020, index: 117.8 },
  { year: 2022, index: 114.1 },
  { year: 2023, index: 113.0 },
  { year: 2024, index: 113.9 },
] as const;

export const PRIVATE_HISTORY_FACTS = {
  /** Hausse cumulée 1996 → 2024 en euros constants (ensemble). */
  gain1996to2024Percent: 13.9,
  /** Moyenne annuelle approximative indiquée par l'Insee. */
  annualAverageGainPercent: 0.5,
  indexBaseYear: 1996,
  index2024: 113.9,
  index2019: 114.3,
} as const;

/**
 * Fonction publique 2024 (Siasp) - ne pas comparer mécaniquement au privé sans avertissement.
 * Ensemble FP : figure publiée dans Insee Première n° 2100 (ligne « Ensemble de la fonction publique »).
 */
export const PUBLIC_2024 = {
  ensembleNet: 2742,
  ensembleConstantChangePercent: 1.7,
  fpeNet: 3018,
  fpeConstantChangePercent: 2.6,
  fptNet: 2317,
  fptConstantChangePercent: 1.3,
  fphNet: 2896,
  fphConstantChangePercent: 0.7,
} as const;

export const STATS: readonly StatDatum[] = [
  {
    id: "private-mean-net-2024",
    value: PRIVATE_2024.meanNetMonthlyEqtp,
    unit: "eur_month_eqtp",
    measure: "mean",
    payKind: "net",
    label: "Salaire net moyen (privé, EQTP)",
    statisticalYear: 2024,
    sourceId: "inseePrive2024",
    scope: PRIVATE_SCOPE,
  },
  {
    id: "private-mean-gross-2024",
    value: PRIVATE_2024.meanGrossMonthlyEqtp,
    unit: "eur_month_eqtp",
    measure: "mean",
    payKind: "gross",
    label: "Salaire brut moyen (privé, EQTP)",
    statisticalYear: 2024,
    sourceId: "inseePrive2024",
    scope: PRIVATE_SCOPE,
  },
  {
    id: "private-median-net-2024",
    value: PRIVATE_2024.medianNetMonthlyEqtp,
    unit: "eur_month_eqtp",
    measure: "median",
    payKind: "net",
    label: "Salaire net médian (privé, EQTP)",
    statisticalYear: 2024,
    sourceId: "inseePrive2024",
    scope: PRIVATE_SCOPE,
  },
  {
    id: "private-d1-net-2024",
    value: PRIVATE_2024.d1NetMonthlyEqtp,
    unit: "eur_month_eqtp",
    measure: "decile",
    payKind: "net",
    label: "1er décile net (D1)",
    statisticalYear: 2024,
    sourceId: "inseePrive2024",
    scope: PRIVATE_SCOPE,
  },
  {
    id: "private-d9-net-2024",
    value: PRIVATE_2024.d9NetMonthlyEqtp,
    unit: "eur_month_eqtp",
    measure: "decile",
    payKind: "net",
    label: "9e décile net (D9)",
    statisticalYear: 2024,
    sourceId: "inseePrive2024",
    scope: PRIVATE_SCOPE,
  },
  {
    id: "private-cadres-net-2024",
    value: PRIVATE_PCS_2024.cadresNet,
    unit: "eur_month_eqtp",
    measure: "mean",
    payKind: "net",
    label: "Cadres (y compris chefs d'entreprise salariés)",
    statisticalYear: 2024,
    sourceId: "inseePrive2024",
    scope: PRIVATE_SCOPE,
    note: "Catégorie socioprofessionnelle, pas un métier précis.",
  },
  {
    id: "private-employes-net-2024",
    value: PRIVATE_PCS_2024.employesNet,
    unit: "eur_month_eqtp",
    measure: "mean",
    payKind: "net",
    label: "Employés",
    statisticalYear: 2024,
    sourceId: "inseePrive2024",
    scope: PRIVATE_SCOPE,
  },
  {
    id: "public-ensemble-net-2024",
    value: PUBLIC_2024.ensembleNet,
    unit: "eur_month_eqtp",
    measure: "mean",
    payKind: "net",
    label: "Ensemble de la fonction publique",
    statisticalYear: 2024,
    sourceId: "inseeFpe2024",
    scope:
      "Agents de la fonction publique (Siasp), hors militaires, apprentis, etc. selon le champ Insee. Non directement superposable au champ privé.",
  },
] as const;

function formatEuroInteger(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace(/\u202f|\u00a0| /g, "\u00a0");
}

function formatPercent(value: number, digits = 1): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
    .format(value)
    .replace(/\u202f|\u00a0| /g, "\u00a0");
}

export function euroMonth(value: number): string {
  return `${formatEuroInteger(value)}\u00a0€`;
}

export function percentLabel(value: number, digits = 1): string {
  return `${formatPercent(value, digits)}\u00a0%`;
}

/** Libellés FR prêts à afficher (consommation unique dans le guide). */
export const SALAIRE_MOYEN_LABELS = {
  meanNet: euroMonth(PRIVATE_2024.meanNetMonthlyEqtp),
  meanGross: euroMonth(PRIVATE_2024.meanGrossMonthlyEqtp),
  medianNet: euroMonth(PRIVATE_2024.medianNetMonthlyEqtp),
  d1: euroMonth(PRIVATE_2024.d1NetMonthlyEqtp),
  d9: euroMonth(PRIVATE_2024.d9NetMonthlyEqtp),
  p99: euroMonth(PRIVATE_2024.p99NetMonthlyEqtp),
  medianGap: percentLabel(PRIVATE_2024.medianBelowMeanPercent),
  interdecile: String(PRIVATE_2024.interdecileRatio).replace(".", ","),
  netCurrentChange: percentLabel(PRIVATE_2024.meanNetCurrentEuroChangePercent),
  grossCurrentChange: percentLabel(PRIVATE_2024.meanGrossCurrentEuroChangePercent),
  netConstantChange: percentLabel(PRIVATE_2024.meanNetConstantEuroChangePercent),
  inflation: percentLabel(PRIVATE_2024.inflationPercent),
  genderGap: percentLabel(PRIVATE_2024.genderGapWomenLowerPercent),
  meanNetExclApprentices: euroMonth(PRIVATE_2024.meanNetExcludingApprenticesMayotte),
  cadresNet: euroMonth(PRIVATE_PCS_2024.cadresNet),
  cadresGross: euroMonth(PRIVATE_PCS_2024.cadresGross),
  piNet: euroMonth(PRIVATE_PCS_2024.professionsIntermediairesNet),
  piGross: euroMonth(PRIVATE_PCS_2024.professionsIntermediairesGross),
  employesNet: euroMonth(PRIVATE_PCS_2024.employesNet),
  employesGross: euroMonth(PRIVATE_PCS_2024.employesGross),
  ouvriersNet: euroMonth(PRIVATE_PCS_2024.ouvriersNet),
  ouvriersGross: euroMonth(PRIVATE_PCS_2024.ouvriersGross),
  womenNet: euroMonth(PRIVATE_PCS_2024.womenNet),
  menNet: euroMonth(PRIVATE_PCS_2024.menNet),
  industrieNet: euroMonth(PRIVATE_SECTORS_2024.industrieNet),
  constructionNet: euroMonth(PRIVATE_SECTORS_2024.constructionNet),
  tertiaireNet: euroMonth(PRIVATE_SECTORS_2024.tertiaireNet),
  financeNet: euroMonth(PRIVATE_SECTORS_2024.servicesFinanciersNet),
  infoComNet: euroMonth(PRIVATE_SECTORS_2024.informationCommunicationNet),
  hebergementNet: euroMonth(PRIVATE_SECTORS_2024.hebergementRestaurationNet),
  ageUnder25: euroMonth(PRIVATE_AGE_2024.under25),
  ageUnder25Excl: euroMonth(PRIVATE_AGE_2024.under25ExcludingApprentices),
  age25to39: euroMonth(PRIVATE_AGE_2024.from25to39),
  age40to49: euroMonth(PRIVATE_AGE_2024.from40to49),
  age50to54: euroMonth(PRIVATE_AGE_2024.from50to54),
  age55plus: euroMonth(PRIVATE_AGE_2024.from55plus),
  publicEnsemble: euroMonth(PUBLIC_2024.ensembleNet),
  publicEnsembleChange: percentLabel(PUBLIC_2024.ensembleConstantChangePercent),
  fpeNet: euroMonth(PUBLIC_2024.fpeNet),
  fpeChange: percentLabel(PUBLIC_2024.fpeConstantChangePercent),
  fptNet: euroMonth(PUBLIC_2024.fptNet),
  fptChange: percentLabel(PUBLIC_2024.fptConstantChangePercent),
  fphNet: euroMonth(PUBLIC_2024.fphNet),
  fphChange: percentLabel(PUBLIC_2024.fphConstantChangePercent),
  historyGain: percentLabel(PRIVATE_HISTORY_FACTS.gain1996to2024Percent),
  historyAnnual: percentLabel(PRIVATE_HISTORY_FACTS.annualAverageGainPercent),
  historyIndex2024: String(PRIVATE_HISTORY_FACTS.index2024).replace(".", ","),
  historyIndex2019: String(PRIVATE_HISTORY_FACTS.index2019).replace(".", ","),
} as const;

export const SALAIRE_MOYEN_FRESHNESS_LINE = `Dernières données disponibles : ${SALAIRE_MOYEN_STAT_YEAR}. Publication Insee (privé) : ${SALAIRE_MOYEN_SOURCES.inseePrive2024.publishedOnLabel}. Article mis à jour le ${SALAIRE_MOYEN_UPDATED_AT_LABEL}.`;

export const SALAIRE_MOYEN_FIELD_NOTE =
  "Ces montants concernent les salariés du secteur privé en équivalent temps plein (EQTP). Ce ne sont pas les salaires de l'ensemble des Français, ni un salaire « typique » garanti. Les travailleurs indépendants (artisans, commerçants, professions libérales, micro-entrepreneurs, etc.) ne sont pas inclus dans ces statistiques salariales ; leurs revenus font l'objet de statistiques distinctes.";

/** Décision éditoriale documentée : pas de section « par métier ». */
export const SALAIRE_MOYEN_METIER_POLICY = {
  includeInTitle: false,
  includeSection: false,
  reason:
    "Les données Insee mobilisées ici portent sur des catégories socioprofessionnelles (PCS) et des secteurs, pas sur des métiers précis vérifiables et comparables. Une moyenne « cadres » ne peut pas être présentée comme le salaire d'un métier nommé.",
} as const;
