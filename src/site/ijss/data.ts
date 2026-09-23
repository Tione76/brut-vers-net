import { formatCurrency } from "@/site/salary-calculator";
import { SMIC_SOURCES, SMIC_VERIFIED_ON_LABEL } from "@/site/smic/data";
import {
  CSG_RATE_ON_IJSS,
  CRDS_RATE_ON_IJSS,
  CURRENT_IJSS_BAREME_JULY_2026,
  SICK_LEAVE_DEFAULT_MONTHLY_GROSS,
  SICK_LEAVE_PATH,
  SICK_LEAVE_SOURCES,
  type SickLeaveCalculationResult,
} from "@/site/sick-leave";

export const IJSS_PATH = "/calcul-ijss-arret-maladie";
export const IJSS_SLUG = "calcul-ijss-arret-maladie";

export const IJSS_PUBLISHED_AT = "2026-09-19";
export const IJSS_UPDATED_AT = "2026-09-20";
export const IJSS_UPDATED_AT_LABEL = "20 septembre 2026";

export const IJSS_H1 = "Calculez vos IJSS en arrêt maladie (secteur privé) — barème 2026";

export const IJSS_SEO_TITLE =
  "IJSS en arrêt maladie dans le privé : calcul et simulateur";

export const IJSS_META_DESCRIPTION =
  "Calculez vos IJSS d'arrêt maladie : montant par jour, 3 jours de carence, plafond, brut après CSG-CRDS et exemples pour les salariés du privé.";

export const IJSS_BREADCRUMB = "Calcul des IJSS";

export const IJSS_SUBTITLE =
  "Estimez vos indemnités journalières de Sécurité sociale et consultez les règles de calcul, la carence et le plafond applicables aux salariés du privé.";

export const IJSS_CALCULATOR_ID = "calculateur-ijss";
export const IJSS_RULES_SECTION_ID = "comment-calculer-les-ijss";
export const IJSS_HOW_TO_SECTION_ID = "comment-utiliser-le-calculateur-ijss";
export const IJSS_LIMITS_SECTION_ID = "limites-du-calculateur-ijss";

export const IJSS_HEADER_PRIMARY_CTA = "Calculer mes IJSS";
export const IJSS_HEADER_SECONDARY_CTA = "Comprendre le calcul et les règles";

export const IJSS_FRESHNESS_LINE = `Règles et barèmes vérifiés le ${SMIC_VERIFIED_ON_LABEL}. Article mis à jour le ${IJSS_UPDATED_AT_LABEL}.`;

export const IJSS_HUB_CARD_TITLE = "Indemnités journalières : calcul des IJSS";

export const IJSS_HUB_TEASER =
  "Comprenez la formule des IJSS, la carence, le plafond et le montant versé par l'Assurance Maladie.";

export const IJSS_TOOL_NAV_TITLE = "Calculateur d'IJSS en arrêt maladie";

export const IJSS_TOOL_TEASER =
  "Estimez l'IJSS journalière, les jours indemnisés et le total après carence.";

export const IJSS_GUIDE_NAV_SHORT = "Calcul des IJSS (privé)";

export const IJSS_SCOPE_DISCLAIMER =
  "Ce calculateur estime uniquement les IJSS maladie du salarié mensualisé du privé (régime général). Il ne calcule pas le complément employeur, le prélèvement à la source ni l'ouverture des droits. La CPAM reste seule compétente pour confirmer votre dossier.";

export const IJSS_PERIMETER_KICKER = "Périmètre du calcul";
export const IJSS_PERIMETER_VALUE =
  "salarié mensualisé du secteur privé, maladie ou accident non professionnel.";
export const IJSS_PERIMETER_FOLLOW =
  "Les accidents du travail, accidents de trajet et maladies professionnelles suivent des règles d'indemnisation différentes.";
export const IJSS_PERIMETER_NOTE = `Périmètre du calcul : ${IJSS_PERIMETER_VALUE} ${IJSS_PERIMETER_FOLLOW}`;

export const IJSS_RESULT_NOTE =
  "Les montants après CSG et CRDS sont indicatifs et présentés avant prélèvement à la source. Le versement réel dépend aussi de l'ouverture des droits, de l'attestation de salaire et, le cas échéant, de la subrogation.";

export const IJSS_DEFAULT_MONTHLY_GROSS = SICK_LEAVE_DEFAULT_MONTHLY_GROSS;

export const IJSS_CURRENT_BAREME = CURRENT_IJSS_BAREME_JULY_2026;

export const IJSS_SOURCES = {
  ameli: SICK_LEAVE_SOURCES.ameli,
  servicePublic: SICK_LEAVE_SOURCES.servicePublic,
  cssR3234: SICK_LEAVE_SOURCES.cssR3234,
  cssR3235: {
    org: "Légifrance",
    label: "Code de la sécurité sociale, article R323-5",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006749269",
  },
  cssL323: SICK_LEAVE_SOURCES.cssL323,
  urssafCsg: {
    org: "Urssaf",
    label: "CSG et CRDS sur les revenus de remplacement",
    href: "https://www.urssaf.fr/accueil/employeur/cotisations/liste-cotisations/csg-crds/revenus-remplacement.html",
  },
  cssL313: {
    org: "Légifrance",
    label: "Code de la sécurité sociale, articles L313-1 et suivants",
    href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006073189/LEGISCTA000006156066/",
  },
  smicJuin2026: {
    org: SMIC_SOURCES.arreteMai2026.org,
    label: SMIC_SOURCES.arreteMai2026.label,
    href: SMIC_SOURCES.arreteMai2026.href,
  },
} as const;

export const SALARY_DURING_SICK_LEAVE_PATH = SICK_LEAVE_PATH;

export function formatEuro(value: number): string {
  return formatCurrency(value);
}

export function buildIjssCopySummary(result: SickLeaveCalculationResult): string {
  return [
    `Arrêt du ${result.stopStartIso} au ${result.stopEndIso} inclus (${result.totalCalendarDays} j)`,
    `IJSS journalière brute : ${formatEuro(result.dailyIjssGross)}`,
    `Jours indemnisés : ${result.ijssIndemnifiedDays} (carence ${result.ijssCarenceDays} j)`,
    `Total IJSS brutes : ${formatEuro(result.ijssGrossTotal)}`,
    `IJSS après CSG et CRDS, avant impôt : ${formatEuro(result.ijssNetIndicativeTotal)}`,
    `Barème : ${result.bareme.sourceLabel}`,
  ].join(" · ");
}

export function buildIjssCopyDetail(result: SickLeaveCalculationResult): string {
  const lines = [
    `Total des trois salaires retenus : ${formatEuro(result.cappedTotal)}`,
    `Salaire journalier de base : ${formatEuro(result.cappedTotal)} ÷ 91,25 = ${formatEuro(result.dailyBaseSalary)}`,
    `IJ journalière brute estimée : ${formatEuro(result.dailyIjssGross)}`,
    `Durée totale : ${result.totalCalendarDays} jour(s) calendaire(s)`,
    `Carence : ${result.ijssCarenceDays} jour(s)`,
    `Jours indemnisés : ${result.ijssIndemnifiedDays}`,
    `IJSS brutes : ${formatEuro(result.dailyIjssGross)} × ${result.ijssIndemnifiedDays} = ${formatEuro(result.ijssGrossTotal)}`,
    `IJSS après CSG (${CSG_RATE_ON_IJSS * 100} %) et CRDS (${CRDS_RATE_ON_IJSS * 100} %) : ${formatEuro(result.ijssNetIndicativeTotal)} avant impôt`,
    `Plafond mensuel retenu : ${formatEuro(result.bareme.monthlyCeiling)} (${result.bareme.sourceLabel})`,
    `Plafond officiel publié : ${formatEuro(result.bareme.maxDailyIjssGross)} par jour`,
  ];
  if (
    result.ceilingApplied &&
    result.dailyIjssGross !== result.bareme.maxDailyIjssGross
  ) {
    lines.push(
      "Un écart d'un centime peut exister avec le relevé de la CPAM.",
    );
  }
  return ["Détail du calcul des IJSS", ...lines].join("\n");
}

export { CSG_RATE_ON_IJSS, CRDS_RATE_ON_IJSS };
