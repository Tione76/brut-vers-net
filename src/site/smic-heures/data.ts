import { formatCurrency } from "@/site/salary-calculator";
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
import { OVERTIME_MAJORATION_ASSUMPTION_PERCENT } from "./engine";

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
export const SMIC_HOURS_UPDATED_AT = "2026-09-18";

export const SMIC_HOURS_UPDATED_AT_LABEL = "18 septembre 2026";

export const SMIC_HOURS_H1 =
  `SMIC selon le nombre d'heures en ${SMIC_EDITORIAL_YEAR} : brut et net de 10 h à 39 h`;

export const SMIC_HOURS_SEO_TITLE =
  `SMIC selon le nombre d'heures : brut et net ${SMIC_EDITORIAL_YEAR}`;

export const SMIC_HOURS_META_DESCRIPTION =
  `Calculez le SMIC brut et net de 10 à 39 heures par semaine en ${SMIC_EDITORIAL_YEAR} : tableau complet, temps partiel, 35 h, 39 h et heures supplémentaires.`;

export const SMIC_HOURS_BREADCRUMB = "SMIC selon les heures";

export const SMIC_HOURS_SUBTITLE =
  "Salaire mensuel au SMIC pour chaque durée contractuelle de 10 h à 39 h par semaine, avec estimation nette et hypothèses clairement affichées.";

/** Fraîcheur visible de la page heures (barème + article). */
export const SMIC_HOURS_FRESHNESS_LINE =
  `${SMIC_BAREME_APPLICABLE_LINE}. ${SMIC_BAREME_VERIFIED_LINE}. Article mis à jour le ${SMIC_HOURS_UPDATED_AT_LABEL}.`;

/**
 * Formulation juridique complète (tableau / calculateur / 39 h / méthodologie).
 * Ne jamais présenter les 4 h de 36 à 39 comme la totalité de la règle légale.
 */
export const SMIC_HOURS_OVERTIME_HYPOTHESIS =
  `En l'absence de dispositions conventionnelles, les huit premières heures supplémentaires de la semaine, de la 36e à la 43e heure, sont majorées de ${OVERTIME_MAJORATION_ASSUMPTION_PERCENT} %. Le tableau s'arrêtant à 39 h, il applique cette majoration aux quatre heures comprises entre 36 h et 39 h. Un accord collectif peut fixer un autre taux, sans pouvoir descendre sous 10 %.`;

/** Phrase courte pour les rappels hors sections détaillées. */
export const SMIC_HOURS_OVERTIME_SHORT =
  `Entre 36 h et 39 h : majoration à +${OVERTIME_MAJORATION_ASSUMPTION_PERCENT} % (hypothèse légale à défaut d'accord ; plancher 10 %).`;

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
  `${SMIC_HOURS_NET_DISCLAIMER} Jusqu'à 35 h, le net est estimé via le ratio indicatif Service-Public à temps plein (net mensuel indicatif ÷ brut mensuel officiel). De 36 h à 39 h, la part des heures supplémentaires réutilise la logique du calculateur d'heures supplémentaires : coefficient salarié non-cadre 0,78, puis réduction de cotisations estimée = brut des HS × 11,31 % (plafond Urssaf retenu comme hypothèse technique du site lorsque les taux de droit commun s'appliquent). Chaque composante monétaire est arrondie au centime avant totalisation, comme dans le calculateur d'heures supplémentaires partagé.`;

export const SMIC_HOURS_SCOPE_DISCLAIMER =
  "Les calculs présentent le cas général à partir des règles et montants officiels cités ci-dessous. Ils ne remplacent pas l'examen d'un bulletin de paie, d'un accord collectif ou d'une situation individuelle.";

/** Notes sous le tableau (remplacent l'ancienne colonne Remarque). */
export const SMIC_HOURS_TABLE_FOOTNOTES = [
  "24 h : durée minimale habituelle du temps partiel en l'absence de disposition conventionnelle différente, sauf dérogations.",
  "35 h : durée légale, brut mensuel officiel et net mensuel indicatif Service-Public.",
  `36 h à 39 h : ${SMIC_HOURS_OVERTIME_SHORT}`,
] as const;
