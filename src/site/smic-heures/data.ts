import { formatCurrency, roundCent } from "@/site/salary-calculator";
import { OVERTIME_CONFIG_2026 } from "@/site/overtime-salary-calculator/overtime/2026/config";
import {
  SMIC_BAREME_APPLICABLE_LINE,
  SMIC_BAREME_VERIFIED_LINE,
  SMIC_CURRENT,
  SMIC_EDITORIAL_YEAR,
  SMIC_EFFECTIVE_FROM_LABEL,
  SMIC_FRESHNESS_LINE,
  SMIC_LABELS,
  SMIC_SOURCES,
  SMIC_VERIFIED_ON_LABEL,
} from "@/site/smic/data";
import type { SmicHoursResult } from "./engine";
import {
  OVERTIME_MAJORATION_ASSUMPTION_PERCENT,
  OVERTIME_MAJORATION_GROUP2_PERCENT,
} from "./engine";

export {
  SMIC_BAREME_APPLICABLE_LINE,
  SMIC_BAREME_VERIFIED_LINE,
  SMIC_CURRENT,
  SMIC_EDITORIAL_YEAR,
  SMIC_EFFECTIVE_FROM_LABEL,
  SMIC_FRESHNESS_LINE,
  SMIC_LABELS,
  SMIC_SOURCES,
  SMIC_VERIFIED_ON_LABEL,
};

export const SMIC_HOURS_PATH = "/smic-selon-nombre-heures";
export const SMIC_HOURS_SLUG = "smic-selon-nombre-heures";

/** Date de publication initiale de l'article (ISO calendaire). */
export const SMIC_HOURS_PUBLISHED_AT = "2026-09-18";

/** Dernière modification éditoriale réelle de l'article. */
export const SMIC_HOURS_UPDATED_AT = "2026-09-29";

export const SMIC_HOURS_UPDATED_AT_LABEL = "29 septembre 2026";

export const SMIC_HOURS_H1 =
  `SMIC selon le nombre d'heures en ${SMIC_EDITORIAL_YEAR} : brut et net de 10 h à 44 h`;

export const SMIC_HOURS_SEO_TITLE =
  "SMIC selon le nombre d'heures : brut/net 10 h à 44 h (mis à jour)";

export const SMIC_HOURS_META_DESCRIPTION =
  "Consultez le SMIC brut et net estimé de 10 h à 44 h par semaine, avec le calcul des heures supplémentaires majorées à 25 % et 50 %.";

export const SMIC_HOURS_BREADCRUMB = "SMIC selon les heures";

export const SMIC_HOURS_SUBTITLE =
  "Salaire mensuel au SMIC pour chaque durée hebdomadaire de 10 h à 44 h par semaine, avec estimation nette et hypothèses clairement affichées.";

/** Fraîcheur visible de la page heures (barème + article). */
export const SMIC_HOURS_FRESHNESS_LINE =
  `${SMIC_BAREME_APPLICABLE_LINE}. ${SMIC_BAREME_VERIFIED_LINE}. Article mis à jour le ${SMIC_HOURS_UPDATED_AT_LABEL}.`;

/**
 * Formulation juridique complète (tableau / calculateur / 39 h / méthodologie).
 * Ne jamais présenter les 4 h de 36 à 39 comme la totalité de la règle légale.
 */
export const SMIC_HOURS_OVERTIME_HYPOTHESIS =
  `Les calculs du tableau utilisent les majorations légales applicables à défaut de dispositions conventionnelles différentes : +${OVERTIME_MAJORATION_ASSUMPTION_PERCENT} % de la 36e à la 43e heure, puis +${OVERTIME_MAJORATION_GROUP2_PERCENT} % à partir de la 44e. Un accord collectif peut fixer un autre taux, sans pouvoir descendre sous 10 %.`;

/** Phrase courte pour les rappels hors sections détaillées. */
export const SMIC_HOURS_OVERTIME_SHORT =
  `Dans le cas général retenu ici, à défaut de dispositions conventionnelles différentes : les heures de la 36e à la 43e sont majorées de ${OVERTIME_MAJORATION_ASSUMPTION_PERCENT} %, puis les suivantes de ${OVERTIME_MAJORATION_GROUP2_PERCENT} %.`;

/** Source Code du travail : durée légale et heures supplémentaires (L3121-27 à L3121-40). */
export const SMIC_HOURS_CODE_TRAVAIL_HS = {
  org: "Légifrance",
  label: "Code du travail : durée légale et heures supplémentaires (L3121-27 à L3121-40)",
  href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006189631/",
} as const;

/** Source Service-Public sur les heures supplémentaires. */
export const SMIC_HOURS_SERVICE_PUBLIC_HS = {
  org: "Service-Public",
  label: "Heures supplémentaires : majoration et contingent",
  href: "https://www.service-public.fr/particuliers/vosdroits/F2391",
} as const;

/** Source Urssaf : réduction de cotisations salariales sur les heures supplémentaires. */
export const SMIC_HOURS_URSSAF_HS = {
  org: "Urssaf",
  label: "Heures supplémentaires : réduction de cotisations salariales",
  href: "https://www.urssaf.fr/accueil/employeur/cotisations/liste-cotisations/heures-supplementaires.html",
} as const;

/** Source Service-Public : durées maximales du travail. */
export const SMIC_HOURS_SERVICE_PUBLIC_DUREE = {
  org: "Service-Public",
  label: "Durée du travail d'un salarié du secteur privé à temps plein",
  href: "https://www.service-public.fr/particuliers/vosdroits/F1911",
} as const;

/** Source Légifrance : majorations HCR (régime hebdomadaire). */
export const SMIC_HOURS_HCR_AVENANT_2 = {
  org: "Légifrance",
  label:
    "Convention collective HCR : avenant n° 2 du 5 février 2007, article 4 (majorations)",
  href: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005826386",
} as const;

/** Source Code de la sécurité sociale : taux de réduction sur les HS. */
export const SMIC_HOURS_CSS_REDUCTION_HS = {
  org: "Légifrance",
  label:
    "Code de la sécurité sociale : articles D241-21 et D241-22 (réduction de cotisations sur les heures supplémentaires)",
  href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037947724",
} as const;

/** Source Code du travail : temps partiel et heures complémentaires. */
export const SMIC_HOURS_CODE_TRAVAIL_TEMPS_PARTIEL = {
  org: "Légifrance",
  label:
    "Code du travail : temps partiel (L3123-27, L3123-20, L3123-28, L3123-29)",
  href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006189633/",
} as const;

/** Source Service-Public : exonération d'impôt sur le revenu des heures supplémentaires. */
export const SMIC_HOURS_SERVICE_PUBLIC_IR = {
  org: "Service-Public",
  label: "Impôt sur le revenu : les heures supplémentaires sont-elles imposées ?",
  href: "https://www.service-public.fr/particuliers/vosdroits/F2617",
} as const;

export const hoursFormatter = new Intl.NumberFormat("fr-FR", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatHoursValue(value: number): string {
  return hoursFormatter.format(value).replace(/\u202f|\u00a0| /g, "\u00a0");
}

export function formatEuro(value: number): string {
  return formatCurrency(value);
}

export function formatWeeklyHoursLabel(hours: number): string {
  return `${formatHoursValue(hours)}\u00a0h`;
}

export function buildCopySummary(result: SmicHoursResult): string {
  const hours = formatWeeklyHoursLabel(result.weeklyHours);
  const brut = formatEuro(result.monthlyGross);
  const net = formatEuro(result.monthlyNetEstimated);
  const overtimeNote = result.hasOvertime
    ? ` (${SMIC_HOURS_OVERTIME_SHORT})`
    : "";

  return `Pour ${hours} par semaine au SMIC actuellement applicable, le salaire est estimé à ${brut} brut par mois et environ ${net} net avant prélèvement à la source${overtimeNote}.`;
}

export const SMIC_HOURS_METHOD_NOTE =
  `Mensualisation : heures hebdomadaires × 52 ÷ 12. Brut = heures mensualisées × ${SMIC_LABELS.hourlyGross}/h. À 35 h : brut mensuel officiel et net mensuel indicatif Service-Public. ${SMIC_HOURS_OVERTIME_HYPOTHESIS} Net estimé avant prélèvement à la source.`;

export const SMIC_HOURS_NET_DISCLAIMER =
  "Le montant net affiché est une estimation indicative. Le SMIC légal est fixé en brut ; le net réel dépend de la situation du salarié et de son bulletin de paie. Les montants sont indiqués avant prélèvement à la source.";

/**
 * Estimation du net (documentée pour la méthodologie).
 * Convention d'arrondi alignée sur le calculateur d'heures supplémentaires :
 * chaque composante monétaire (brut HS, réduction de cotisations, gain net HS,
 * totaux) est arrondie au centime avant agrégation.
 */
export const SMIC_HOURS_NET_METHOD_SUMMARY =
  `${SMIC_HOURS_NET_DISCLAIMER} Jusqu'à 35 h, le net n'est pas un montant légal par durée : il est estimé via le ratio indicatif Service-Public à temps plein (net mensuel indicatif ÷ brut mensuel officiel). À 35 h, le net repris est celui publié par Service-Public, à titre indicatif. Au-delà de 35 h, la part des heures supplémentaires réutilise la logique du calculateur d'heures supplémentaires : coefficient salarié non-cadre 0,78 (approximation du site, retenues d'environ 22 %), puis une réduction de cotisations salariales d'assurance vieillesse estimée. Cette réduction correspond, dans la limite de 11,31 %, à la somme des cotisations d'assurance vieillesse légales et conventionnelles obligatoires effectivement à la charge du salarié (articles D241-21 et D241-22 du Code de la sécurité sociale). 11,31 % n'est donc pas un taux garanti pour tous : c'est le maximum retenu ici lorsque les cotisations concernées permettent de l'atteindre. Ce n'est pas une exonération de toutes les cotisations, ni de la CSG ou de la CRDS. Chaque composante monétaire est arrondie au centime avant totalisation, comme dans le calculateur d'heures supplémentaires partagé.`;

export const SMIC_HOURS_SCOPE_DISCLAIMER =
  "Les calculs présentent le cas général à partir des règles et montants officiels cités dans cette page. Ils ne remplacent pas l'examen d'un bulletin de paie, d'un accord collectif ou d'une situation individuelle.";

export const SMIC_HOURS_HOURS_ROUNDING_NOTE =
  "Les heures mensualisées affichées dans le tableau sont arrondies à deux décimales pour la lecture. Les calculs monétaires utilisent la valeur exacte heures hebdomadaires × 52 ÷ 12, sans arrondi préalable des heures. Exemple : 11 h correspondent à 47,666... heures mensualisées ; l'affichage peut indiquer 47,67 h, mais le brut est calculé sur 11 × 52 ÷ 12.";

export const SMIC_HOURS_WEEKLY_MONEY_ROUNDING_NOTE =
  "Les montants hebdomadaires affichés sont arrondis au centime pour faciliter la lecture. Les montants mensuels sont calculés directement à partir des valeurs non arrondies : multiplier un montant hebdomadaire affiché par 52 ÷ 12 peut donc produire un écart d'un centime.";

/** Projection à taux constant : mensuel officiel × 12, pas un cumul civil. */
export const SMIC_HOURS_ANNUAL_GROSS_PROJECTION_35H = roundCent(
  SMIC_CURRENT.monthlyGross * 12,
);

export const SMIC_HOURS_ANNUAL_PROJECTION_NOTE =
  `À taux constant, le SMIC mensuel actuel de ${SMIC_LABELS.monthlyGross} correspond à ${formatEuro(SMIC_HOURS_ANNUAL_GROSS_PROJECTION_35H)} brut sur douze mois. Cette projection ne correspond pas nécessairement au cumul réellement perçu sur l'année civile lorsqu'une revalorisation intervient en cours d'année.`;

export const SMIC_HOURS_ANNUAL_OTHER_DURATIONS_NOTE =
  "Pour les autres durées, les colonnes annuelles du tableau sont des projections du calculateur : montant mensuel × 12 au taux actuellement applicable.";

export const SMIC_HOURS_TEMPS_PARTIEL_CODE_NOTE =
  "Temps partiel : L3123-27 (durée minimale supplétive de 24 h) ; L3123-20 (possibilité conventionnelle de porter les heures complémentaires jusqu'au tiers) ; L3123-28 (limite supplétive au dixième) ; L3123-29 (majorations supplétives des heures complémentaires).";

export const SMIC_HOURS_IR_EXEMPTION_NOTE =
  `Les heures supplémentaires peuvent être exonérées d'impôt sur le revenu dans la limite de ${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(OVERTIME_CONFIG_2026.incomeTaxExemptionAnnualCeiling)} € de rémunération nette imposable par an (revenus ${SMIC_EDITORIAL_YEAR}). Cette règle fiscale concerne l'impôt sur le revenu et n'est pas intégrée au calcul du net avant impôt affiché par le tableau.`;

export const SMIC_HOURS_DURATION_MAX_NOTE =
  "Le tableau calcule le salaire théorique d'une durée hebdomadaire stable. Il ne dit pas si cette durée est autorisée dans votre situation. Dans le cas général, le travail effectif ne doit pas dépasser 48 h sur une même semaine, ni 44 h en moyenne sur 12 semaines consécutives. Des dérogations existent (accord, circonstances exceptionnelles, autorisation de l'inspection du travail). Les heures supplémentaires s'inscrivent aussi dans un contingent annuel (220 h par défaut en l'absence d'accord). Au-delà du contingent applicable, une contrepartie obligatoire en repos s'ajoute à la majoration. 40 h à 44 h ne sont donc pas automatiquement illégales.";

export const SMIC_HOURS_OVERTIME_QUALIFICATION_NOTE =
  "Dans le cas général présenté ici, les heures accomplies à la demande de l'employeur au-delà de la durée légale de 35 h sont traitées comme des heures supplémentaires.";

export const SMIC_HOURS_COMPENSATORY_REST_NOTE =
  "Le tableau suppose que les heures supplémentaires sont rémunérées. Selon les dispositions applicables, tout ou partie de leur rémunération majorée peut être remplacée par un repos compensateur équivalent ; ce cas n'est pas simulé ici.";

export const SMIC_HOURS_HCR_SHORT =
  "Dans le régime hebdomadaire des hôtels, cafés et restaurants, la convention collective prévoit +10 % de la 36e à la 39e heure, +20 % de la 40e à la 43e et +50 % à partir de la 44e (avenant n° 2 du 5 février 2007, article 4). Ce n'est pas le calcul de cette page.";

/** Notes sous le tableau (remplacent l'ancienne colonne Remarque). */
export const SMIC_HOURS_TABLE_FOOTNOTES = [
  "10 h à 23 h : durées inférieures à la durée minimale de 24 h applicable à défaut de disposition conventionnelle fixant une autre durée minimale, sous réserve des dérogations prévues.",
  "24 h : durée minimale applicable à défaut de disposition conventionnelle fixant une autre durée minimale, sous réserve des dérogations prévues.",
  "35 h : durée légale, brut mensuel officiel et net mensuel indicatif Service-Public.",
  `36 h à 43 h : les heures au-delà de 35 h sont calculées ici avec +${OVERTIME_MAJORATION_ASSUMPTION_PERCENT} % (hypothèse légale à défaut d'accord).`,
  `44 h : 8 h à +${OVERTIME_MAJORATION_ASSUMPTION_PERCENT} % et 1 h à +${OVERTIME_MAJORATION_GROUP2_PERCENT} % dans l'hypothèse légale retenue ici.`,
] as const;
