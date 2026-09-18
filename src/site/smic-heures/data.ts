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

/** Title Google : sans année (l'année reste dans le H1 et l'éditorial). */
export const SMIC_HOURS_SEO_TITLE =
  "SMIC selon le nombre d'heures : tableau brut et net";

export const SMIC_HOURS_META_DESCRIPTION =
  "Calculez le SMIC brut et net pour 20 h, 24 h, 25 h, 28 h, 30 h, 32 h, 35 h ou 39 h par semaine. Tableau complet et heures supplémentaires.";

export const SMIC_HOURS_BREADCRUMB = "SMIC selon les heures";

export const SMIC_HOURS_SUBTITLE =
  "Salaire mensuel au SMIC pour chaque durée contractuelle de 10 h à 39 h par semaine, avec estimation nette et hypothèses clairement affichées.";

/** Fraîcheur visible de la page heures (barème + article). */
export const SMIC_HOURS_FRESHNESS_LINE =
  `${SMIC_BAREME_APPLICABLE_LINE}. ${SMIC_BAREME_VERIFIED_LINE}. Article mis à jour le ${SMIC_HOURS_UPDATED_AT_LABEL}.`;

/**
 * Formulation juridique unique pour la majoration HS retenue sur cette page.
 * Ne jamais présenter +25 % comme un taux universel.
 */
export const SMIC_HOURS_OVERTIME_HYPOTHESIS =
  `Cette page retient la majoration légale applicable à défaut d'accord : +${OVERTIME_MAJORATION_ASSUMPTION_PERCENT} % pour les quatre premières heures supplémentaires. Un accord collectif peut prévoir un autre taux, dans le respect du minimum légal de 10 %.`;

/** Source Code du travail : durée légale et heures supplémentaires. */
export const SMIC_HOURS_CODE_TRAVAIL_HS = {
  org: "Légifrance",
  label: "Code du travail : durée légale et heures supplémentaires",
  href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006189631/",
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
    ? ` (dont heures supplémentaires majorées à +${result.majorationPercent}\u00a0% selon l'hypothèse légale retenue sur cette page)`
    : "";

  return `Pour ${hours} par semaine au SMIC actuellement applicable, le salaire est estimé à ${brut} brut par mois et environ ${net} net avant prélèvement à la source${overtimeNote}.`;
}

export const SMIC_HOURS_METHOD_NOTE =
  `Mensualisation : heures hebdomadaires × 52 ÷ 12. Brut = heures mensualisées × ${SMIC_LABELS.hourlyGross}/h. À 35 h : brut mensuel officiel et net mensuel indicatif Service-Public. De 36 h à 39 h : ${SMIC_HOURS_OVERTIME_HYPOTHESIS} Net estimé, avant prélèvement à la source.`;

/**
 * Estimation du net (documentée pour la méthodologie) :
 * - jusqu'à 35 h : ratio Service-Public (net mensuel / brut mensuel à 35 h) ;
 * - au-delà : net indicatif 35 h + estimation HS (coef. non-cadre 0,78 + réduction cotisations 11,31 %).
 */
export const SMIC_HOURS_NET_METHOD_SUMMARY =
  "Le net n'est jamais un montant légal. Jusqu'à 35 h, il est estimé via le ratio indicatif Service-Public à temps plein (net mensuel indicatif ÷ brut mensuel officiel). De 36 h à 39 h, la part des heures supplémentaires réutilise la logique du calculateur d'heures supplémentaires : coefficient salarié non-cadre 0,78, puis réduction de cotisations estimée = brut des HS × 11,31 % (plafond Urssaf retenu comme hypothèse technique du site lorsque les taux de droit commun s'appliquent).";

/** Notes sous le tableau (remplacent l'ancienne colonne Remarque). */
export const SMIC_HOURS_TABLE_FOOTNOTES = [
  "24 h : durée minimale habituelle du temps partiel en l'absence de disposition conventionnelle différente, sauf dérogations.",
  "35 h : durée légale, brut mensuel officiel et net mensuel indicatif Service-Public.",
  `36 h à 39 h : ${SMIC_HOURS_OVERTIME_HYPOTHESIS}`,
] as const;
