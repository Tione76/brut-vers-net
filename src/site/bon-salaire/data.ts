/**
 * Source de vérité : /quel-est-un-bon-salaire-en-france
 *
 * Ne jamais inventer de percentile, convertir net↔brut, ni présenter
 * une statistique du privé EQTP comme « tous les Français ».
 *
 * Année éditoriale (H1) ≠ année statistique Insee.
 */

export const BON_SALAIRE_EDITORIAL_YEAR = 2026;

export const BON_SALAIRE_PUBLISHED_AT = "2026-09-12";
export const BON_SALAIRE_UPDATED_AT = "2026-09-12";
export const BON_SALAIRE_UPDATED_AT_LABEL = "12 septembre 2026";

/** Année statistique Insee Première n° 2079 (pas « salaire 2026 »). */
export const BON_SALAIRE_STAT_YEAR = 2024;

export const BON_SALAIRE_SEO_TITLE =
  "Quel est un bon salaire en France ? Les repères pour se situer";

export const BON_SALAIRE_H1 = `Quel est un bon salaire en France en ${BON_SALAIRE_EDITORIAL_YEAR} ?`;

export const BON_SALAIRE_META_DESCRIPTION =
  "Comparez votre net à la médiane et aux déciles Insee, puis voyez si 2 000 €, 3 000 € ou 5 000 € sont un bon salaire.";

export const BON_SALAIRE_AMOUNTS_BLOCK_TITLE = "Alors, c'est quoi un bon salaire ?";

export const BON_SALAIRE_PRIVATE_SCOPE =
  "Salariés du secteur privé en France, y compris apprentis, stagiaires et contrats aidés ; hors agriculture et particuliers employeurs. Salaires mensuels nets en équivalent temps plein (EQTP), avant prélèvement à la source.";

/** Rappel unique pour les lecteurs à temps partiel (à n'afficher qu'une fois). */
export const BON_SALAIRE_EQTP_PART_TIME_NOTE =
  "Si vous travaillez à temps partiel, comparez votre salaire ramené à un équivalent temps plein : un salaire perçu à 80 % ne doit pas être comparé directement aux montants EQTP de cette page.";

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

export const BON_SALAIRE_SOURCES = {
  inseePrive2024: {
    id: "inseePrive2024",
    org: "Insee",
    title: "Les salaires dans le secteur privé en 2024 (Insee Première n° 2079)",
    href: "https://www.insee.fr/fr/statistiques/8657156",
    publishedOn: "2025-10-23",
    publishedOnLabel: "23 octobre 2025",
    statisticalYear: 2024,
    notes:
      "Base Tous salariés 2024. Distribution nette EQTP (D1 à D9, P95, P99), moyennes nette et brute, PCS et moyennes par âge (encadré). Champ : apprentis, stagiaires et Mayotte inclus.",
    verifiedOn: "2026-09-12",
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
    notes:
      "Moyennes régionales (pas des médianes). Même champ que Insee Première n° 2079 (privé, EQTP, lieu de travail).",
    verifiedOn: "2026-09-12",
  },
  inseeEssentielSalaires: {
    id: "inseeEssentielSalaires",
    org: "Insee",
    title: "L'essentiel sur… les salaires",
    href: "https://www.insee.fr/fr/statistiques/7457170",
    publishedOn: "2025-12-16",
    publishedOnLabel: "mise à jour Insee (séries 1996-2024)",
    statisticalYear: 2024,
    notes: "Synthèse grand public ; chiffres parfois arrondis vs Première n° 2079.",
    verifiedOn: "2026-09-12",
  },
} as const satisfies Record<string, OfficialSource>;

/**
 * Distribution nette mensuelle EQTP, privé 2024.
 * Insee Première n° 2079, figure 3 (ensemble), paru le 23/10/2025.
 * Vérifié le 12/09/2026.
 */
export const PRIVATE_DISTRIBUTION_2024 = {
  d1: 1492,
  d2: 1669,
  d3: 1823,
  d4: 1992,
  median: 2190,
  d6: 2442,
  d7: 2785,
  d8: 3305,
  d9: 4334,
  p95: 5593,
  p99: 10261,
  meanNet: 2733,
  meanGross: 3602,
  /** Écart médiane / moyenne déclaré par l'Insee (−19,9 %). */
  medianBelowMeanPercent: 19.9,
  /** Rapport interdécile D9/D1. */
  interdecileRatio: 2.91,
} as const;

/** PCS - moyennes nettes EQTP privé 2024 (Insee Première n° 2079, figure 1). */
export const PRIVATE_PCS_MEAN_NET_2024 = {
  cadres: 4629,
  professionsIntermediaires: 2633,
  employes: 1941,
  ouvriers: 2051,
} as const;

/**
 * Âges - moyennes nettes EQTP.
 * Source : encadré Insee Première n° 2079 (champ principal avec apprentis/stagiaires et Mayotte).
 * Ne pas mélanger avec une autre diffusion « Base Tous salariés » au périmètre différent.
 */
export const PRIVATE_AGE_MEAN_NET_2024 = {
  under25: 1622,
  from25to39: 2547,
  from40to49: 3007,
  from50to54: 3174,
  from55plus: 3266,
  under25ExcludingApprentices: 1865,
} as const;

/** Régions - Insee 2012733 (lieu de travail, privé EQTP 2024). */
export const PRIVATE_REGION_MEAN_NET_2024 = {
  ileDeFrance: 3479,
  france: 2733,
  auvergneRhoneAlpes: 2634,
  nouvelleAquitaine: 2409,
} as const;

function formatEuroInteger(value: number): string {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 })
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

const D = PRIVATE_DISTRIBUTION_2024;

export const BON_SALAIRE_LABELS = {
  d1: euroMonth(D.d1),
  d2: euroMonth(D.d2),
  d3: euroMonth(D.d3),
  d4: euroMonth(D.d4),
  median: euroMonth(D.median),
  d6: euroMonth(D.d6),
  d7: euroMonth(D.d7),
  d8: euroMonth(D.d8),
  d9: euroMonth(D.d9),
  p95: euroMonth(D.p95),
  p99: euroMonth(D.p99),
  meanNet: euroMonth(D.meanNet),
  meanGross: euroMonth(D.meanGross),
  medianGap: percentLabel(D.medianBelowMeanPercent),
  interdecile: String(D.interdecileRatio).replace(".", ","),
  cadres: euroMonth(PRIVATE_PCS_MEAN_NET_2024.cadres),
  pi: euroMonth(PRIVATE_PCS_MEAN_NET_2024.professionsIntermediaires),
  employes: euroMonth(PRIVATE_PCS_MEAN_NET_2024.employes),
  ouvriers: euroMonth(PRIVATE_PCS_MEAN_NET_2024.ouvriers),
  ageUnder25: euroMonth(PRIVATE_AGE_MEAN_NET_2024.under25),
  age25to39: euroMonth(PRIVATE_AGE_MEAN_NET_2024.from25to39),
  age40to49: euroMonth(PRIVATE_AGE_MEAN_NET_2024.from40to49),
  age55plus: euroMonth(PRIVATE_AGE_MEAN_NET_2024.from55plus),
  idf: euroMonth(PRIVATE_REGION_MEAN_NET_2024.ileDeFrance),
  ara: euroMonth(PRIVATE_REGION_MEAN_NET_2024.auvergneRhoneAlpes),
  naq: euroMonth(PRIVATE_REGION_MEAN_NET_2024.nouvelleAquitaine),
  amount1500: euroMonth(1500),
  amount2000: euroMonth(2000),
  amount2500: euroMonth(2500),
  amount3000: euroMonth(3000),
  amount4000: euroMonth(4000),
  amount5000: euroMonth(5000),
} as const;

export const BON_SALAIRE_FRESHNESS_LINE = `Dernières données disponibles : ${BON_SALAIRE_STAT_YEAR}. Publication Insee (privé) : ${BON_SALAIRE_SOURCES.inseePrive2024.publishedOnLabel}. Article mis à jour le ${BON_SALAIRE_UPDATED_AT_LABEL}.`;

export const BON_SALAIRE_FIELD_NOTE = BON_SALAIRE_PRIVATE_SCOPE;

/** Réponse courte (~80 mots) affichée juste sous le H1. */
export const BON_SALAIRE_SHORT_ANSWER = `Il n'existe pas de montant officiel définissant un bon salaire en France. En ${BON_SALAIRE_STAT_YEAR}, le repère statistique le plus utile est la médiane : ${BON_SALAIRE_LABELS.median} net mensuels en équivalent temps plein dans le privé. Autour de 3 000\u00a0€, on se situe déjà au-dessus de la moyenne nette du privé en EQTP ; au-dessus de ${BON_SALAIRE_LABELS.d9}, on entre parmi les 10\u00a0% des salariés les mieux rémunérés du champ étudié. Mais un bon salaire dépend aussi du logement, de la ville, du ménage et des charges.`;

export const BENCHMARK_NET_MONTHLY = [2000, 2500, 3000, 4000, 5000] as const;
export type BenchmarkNetMonthly = (typeof BENCHMARK_NET_MONTHLY)[number];

export interface BenchmarkSituation {
  amount: BenchmarkNetMonthly;
  label: string;
  /** Position relative aux seuls seuils officiels. */
  vsOfficialThresholds: string;
  /** Une ligne pour tableau. */
  tableMeaning: string;
  /** Ce qu'on peut affirmer avec certitude. */
  canAffirm: string;
  /** Ce qu'on ne peut pas conclure. */
  cannotConclude: string;
  /** Rappel contextuel (logement, ménage, charges). */
  contextNote: string;
}

const L = BON_SALAIRE_LABELS;

/** Comparaisons aux seuls seuils officiels (aucune interpolation de percentile). */
export const BENCHMARK_SITUATIONS: Record<BenchmarkNetMonthly, BenchmarkSituation> = {
  2000: {
    amount: 2000,
    label: L.amount2000,
    vsOfficialThresholds: `Proche du 4e décile (${L.d4}), inférieur à la médiane (${L.median}).`,
    tableMeaning: "Sous la médiane, autour du 4e décile",
    canAffirm:
      "On peut affirmer que ce niveau se situe sous la médiane du privé en EQTP : plus de la moitié des salariés du champ gagnent davantage.",
    cannotConclude:
      "On ne peut pas en déduire un percentile précis, ni conclure automatiquement à un niveau de vie « bas » pour le ménage.",
    contextNote:
      "Selon le loyer, la ville et la composition du foyer, ce net peut rester tenable ou devenir très contraint.",
  },
  2500: {
    amount: 2500,
    label: L.amount2500,
    vsOfficialThresholds: `Supérieur à la médiane (${L.median}) et au 6e décile (${L.d6}), inférieur au 7e décile (${L.d7}).`,
    tableMeaning: "Au-dessus de la médiane, entre D6 et D7",
    canAffirm:
      "On peut affirmer que ce salaire dépasse la médiane et se situe entre le 6e et le 7e décile du champ étudié.",
    cannotConclude:
      "On ne peut pas inventer un rang exact (par exemple « 65e percentile ») entre ces deux seuils.",
    contextNote:
      "Le confort réel dépend surtout du logement et des charges fixes, pas seulement de ce positionnement statistique.",
  },
  3000: {
    amount: 3000,
    label: L.amount3000,
    vsOfficialThresholds: `Supérieur à la médiane et au 7e décile (${L.d7}), inférieur au 8e décile (${L.d8}). Aussi supérieur à la moyenne nette (${L.meanNet}).`,
    tableMeaning: "Au-dessus de la moyenne, entre D7 et D8",
    canAffirm:
      "On peut affirmer que ce salaire est supérieur à la médiane et à la moyenne nette du privé en EQTP, et qu'il se situe entre le 7e et le 8e décile.",
    cannotConclude:
      "Cette statistique ne permet pas, à elle seule, de dire si le niveau de vie est élevé pour un ménage donné.",
    contextNote:
      "Avec le même net, une personne seule à loyer modéré et un foyer avec enfants dans un logement coûteux ne vivent pas la même réalité.",
  },
  4000: {
    amount: 4000,
    label: L.amount4000,
    vsOfficialThresholds: `Supérieur au 8e décile (${L.d8}), inférieur au 9e décile (${L.d9}).`,
    tableMeaning: "Entre D8 et D9 (hors top 10 %)",
    canAffirm:
      "On peut affirmer que ce niveau se situe dans le haut de la distribution, entre le 8e et le 9e décile, donc encore hors des 10 % les mieux payés du champ.",
    cannotConclude:
      "On ne peut pas le ranger dans le top 10 % ni lui attribuer un percentile inventé.",
    contextNote:
      "Même dans le haut de l'échelle, le confort reste conditionné par le coût du logement et les charges du ménage.",
  },
  5000: {
    amount: 5000,
    label: L.amount5000,
    vsOfficialThresholds: `Supérieur au 9e décile (${L.d9}) : dans les 10 % les mieux payés du champ. Inférieur au 95e centile (${L.p95}).`,
    tableMeaning: "Au-dessus de D9 (top 10 %), sous P95",
    canAffirm:
      "On peut affirmer que ce salaire dépasse le 9e décile : il appartient aux 10 % les mieux rémunérés du champ privé EQTP, tout en restant sous le 95e centile.",
    cannotConclude:
      "Cela ne signifie pas automatiquement « richesse » au sens du patrimoine ou du niveau de vie du ménage.",
    contextNote:
      "Un haut salaire et un fort patrimoine sont deux notions distinctes ; le contexte de vie reste décisif.",
  },
};

export const DISTRIBUTION_SCALE_POINTS = [
  { id: "d1", label: "D1", value: D.d1, hint: "10 % gagnent moins" },
  { id: "median", label: "Médiane", value: D.median, hint: "50 % gagnent moins" },
  { id: "mean", label: "Moyenne", value: D.meanNet, hint: "Moyenne arithmétique" },
  { id: "d9", label: "D9", value: D.d9, hint: "10 % gagnent plus" },
  { id: "p99", label: "P99", value: D.p99, hint: "1 % gagne plus" },
] as const;
