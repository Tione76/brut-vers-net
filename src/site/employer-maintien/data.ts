import { formatCurrency } from "@/site/salary-calculator";
import { formatLongDateFr } from "@/site/dates";
import {
  formatCalendarDaysFr,
  formatDaysFr,
  formatYearsFr,
} from "@/site/fr-copy";
import { SMIC_VERIFIED_ON_LABEL } from "@/site/smic/data";
import type { LegalEmployerComplementResult } from "@/site/sick-leave/engine";

export const EMPLOYER_MAINTIEN_PATH = "/maintien-salaire-arret-maladie";
export const EMPLOYER_MAINTIEN_SLUG = "maintien-salaire-arret-maladie";
export const EMPLOYER_MAINTIEN_CALCULATOR_ID = "simulateur-maintien-salaire";

export const EMPLOYER_MAINTIEN_PUBLISHED_AT = "2026-09-20";
export const EMPLOYER_MAINTIEN_UPDATED_AT = "2026-09-23";
export const EMPLOYER_MAINTIEN_UPDATED_AT_LABEL = "23 septembre 2026";

export const EMPLOYER_MAINTIEN_H1 =
  "Maintien de salaire en arrêt maladie dans le privé : calcul et conditions";

export const EMPLOYER_MAINTIEN_SEO_TITLE =
  "Maintien de salaire en arrêt maladie (privé) : calcul et conditions";

export const EMPLOYER_MAINTIEN_META_DESCRIPTION =
  "Calculez le maintien de salaire en arrêt maladie dans le privé : complément employeur, ancienneté, délai de 7 jours, taux de 90 % puis deux tiers.";

export const EMPLOYER_MAINTIEN_BREADCRUMB = "Maintien de salaire";

export const EMPLOYER_MAINTIEN_SUBTITLE =
  "Vérifiez si votre employeur doit compléter vos IJSS et estimez le minimum légal selon votre ancienneté, la durée de votre arrêt et les droits déjà utilisés.";

export const EMPLOYER_MAINTIEN_RULES_SECTION_ID = "quest-ce-que-le-maintien-de-salaire";
export const EMPLOYER_MAINTIEN_HOW_TO_SECTION_ID =
  "comment-utiliser-le-calculateur-maintien-salaire";
export const EMPLOYER_MAINTIEN_LIMITS_SECTION_ID =
  "limites-du-calculateur-maintien-salaire";

export const EMPLOYER_MAINTIEN_HEADER_PRIMARY_CTA = "Calculer le complément employeur";
export const EMPLOYER_MAINTIEN_HEADER_SECONDARY_CTA = "Comprendre les règles";

export const EMPLOYER_MAINTIEN_TOOL_NAV_TITLE =
  "Calculateur de maintien de salaire en arrêt maladie";

export const EMPLOYER_MAINTIEN_TOOL_TEASER =
  "Outil d'estimation du minimum légal du complément employeur : conditions, délai de sept jours, 90 % puis deux tiers. Ce n'est pas un calcul officiel ni une certification des droits.";

export const EMPLOYER_MAINTIEN_HUB_TEASER =
  "Complément employeur en arrêt maladie : conditions, ancienneté, délai de 7 jours et minimum légal.";

export const EMPLOYER_MAINTIEN_FRESHNESS_LINE =
  `Règles du Code du travail vérifiées le ${SMIC_VERIFIED_ON_LABEL}. Article mis à jour le ${EMPLOYER_MAINTIEN_UPDATED_AT_LABEL}.`;

export const IJSS_CALCULATOR_PATH = "/calcul-ijss-arret-maladie";
export const SALARY_DURING_SICK_LEAVE_PATH = "/salaire-arret-maladie";

export const EMPLOYER_MAINTIEN_SOURCES = {
  l1226: {
    org: "Légifrance",
    label: "Code du travail, article L1226-1",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000054331868",
  },
  d1226: {
    org: "Légifrance",
    label: "Code du travail, articles D1226-1 à D1226-8",
    href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000018482982/",
  },
  d1226_3: {
    org: "Code du travail numérique",
    label: "Code du travail, article D1226-3",
    href: "https://code.travail.gouv.fr/code-du-travail/d1226-3",
  },
  d1226_4: {
    org: "Code du travail numérique",
    label: "Code du travail, article D1226-4",
    href: "https://code.travail.gouv.fr/code-du-travail/d1226-4",
  },
  d1226_5: {
    org: "Code du travail numérique",
    label: "Code du travail, article D1226-5",
    href: "https://code.travail.gouv.fr/code-du-travail/d1226-5",
  },
  d1226_6: {
    org: "Code du travail numérique",
    label: "Code du travail, article D1226-6",
    href: "https://code.travail.gouv.fr/code-du-travail/d1226-6",
  },
  d1226_7: {
    org: "Code du travail numérique",
    label: "Code du travail, article D1226-7",
    href: "https://code.travail.gouv.fr/code-du-travail/d1226-7",
  },
  d1226_8: {
    org: "Code du travail numérique",
    label: "Code du travail, article D1226-8",
    href: "https://code.travail.gouv.fr/code-du-travail/d1226-8",
  },
  f490: {
    org: "Service-Public",
    label: "Congé de maladie d'un fonctionnaire",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F490",
  },
  f491: {
    org: "Service-Public",
    label: "Congé de maladie d'un agent contractuel de la fonction publique",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F491",
  },
  f3053: {
    org: "Service-Public",
    label: "Arrêt maladie : indemnités journalières versées au salarié",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F3053",
  },
  ameli: {
    org: "Assurance Maladie",
    label: "Arrêt de travail pour maladie : les indemnités journalières du salarié",
    href: "https://www.ameli.fr/assure/remboursements/indemnites-journalieres-maladie-maternite-paternite/indemnites-journalieres-pour-maladie/arret-maladie-salarie",
  },
} as const;

export const EMPLOYER_MAINTIEN_SCOPE_DISCLAIMER =
  "Ce calculateur estime uniquement le minimum légal du complément employeur pour un salarié mensualisé du privé, en maladie ou accident non professionnel.";

export const EMPLOYER_MAINTIEN_SIMULATED_CASE_LABEL = "Cas simulé";
export const EMPLOYER_MAINTIEN_SIMULATED_CASE_VALUE =
  "salarié mensualisé du secteur privé, maladie ou accident non professionnel";
export const EMPLOYER_MAINTIEN_SIMULATED_CASE = `${EMPLOYER_MAINTIEN_SIMULATED_CASE_LABEL} : ${EMPLOYER_MAINTIEN_SIMULATED_CASE_VALUE}`;

export const EMPLOYER_MAINTIEN_CCN_NOTE =
  "Ce simulateur estime uniquement le minimum légal prévu par le Code du travail. Votre convention collective ou un accord d'entreprise peut prévoir un maintien plus favorable.";

export const EMPLOYER_MAINTIEN_EXCLUSION_NOTE =
  "Ce calcul ne couvre pas la fonction publique, les accidents du travail et maladies professionnelles, les accidents de trajet, ni les catégories exclues du minimum légal de l'article L1226-1. Il n'intègre pas automatiquement les règles plus favorables d'une convention collective ou d'un accord d'entreprise.";

export const EMPLOYER_MAINTIEN_METHOD_NOTE =
  "La formule salaire brut mensuel × 12 ÷ 365 est une convention d'estimation du simulateur, pas une méthode légale obligatoire. L'article D1226-7 retient la rémunération que le salarié aurait perçue selon l'horaire pratiqué pendant l'absence. La retenue réelle du bulletin peut donc différer selon le mois, les heures de travail, la convention collective et la méthode de paie.";

export const EMPLOYER_MAINTIEN_RESULT_ESTIMATE_NOTE =
  "Estimation calculée à partir d'une rémunération journalière moyenne égale au salaire brut mensuel × 12 ÷ 365. Votre employeur peut utiliser une autre méthode de paie pour déterminer la rémunération correspondant à l'absence.";

export const EMPLOYER_MAINTIEN_ROUNDING_NOTE =
  "Les décimales intermédiaires sont conservées pendant le calcul. Le montant total est arrondi au centime le plus proche.";

export const EMPLOYER_MAINTIEN_VARIABLE_PAY_NOTE =
  "Le salaire brut mensuel habituel ne permet pas toujours de reconstituer exactement la rémunération que le salarié aurait perçue pendant son absence. Les primes, commissions, heures supplémentaires habituelles, changements d'horaire, variations mensuelles et autres éléments de rémunération peuvent modifier le résultat réel du bulletin. Le simulateur utilise une moyenne annuelle simplifiée.";

export const EMPLOYER_MAINTIEN_FORMULA =
  "Complément légal brut journalier = max(0 ; objectif légal − IJSS brute retenue − part de prévoyance financée par l'employeur)";

export const EMPLOYER_MAINTIEN_FORMULA_POINTS = [
  "Objectif de 90 % de la rémunération brute de référence pendant la première période.",
  "Objectif des deux tiers pendant la seconde période.",
  "Seules les périodes encore disponibles sont prises en compte.",
  "Le résultat ne peut pas être négatif.",
] as const;

export const EMPLOYER_MAINTIEN_IJSS_FIELD_LABEL =
  "IJSS journalière brute retenue pour le calcul (€)";

export const EMPLOYER_MAINTIEN_IJSS_FIELD_HELP =
  "Indiquez le montant journalier brut avant CSG et CRDS, figurant sur votre attestation de paiement. Si vos IJSS ont été réduites, suspendues ou ne sont pas encore versées, le montant à retenir pour le calcul du complément peut être différent du montant effectivement reçu.";

export const EMPLOYER_MAINTIEN_PRIOR_RIGHTS_QUESTION =
  "Avez-vous déjà reçu un complément de salaire de votre employeur au cours des 12 mois précédant le début de cet arrêt ?";

export const EMPLOYER_MAINTIEN_PRIOR_RIGHTS_UNKNOWN_WARNING =
  "Le résultat peut être surestimé si des droits ont déjà été utilisés. Vérifiez vos précédents bulletins de paie ou contactez le service paie.";

export const EMPLOYER_MAINTIEN_ELIGIBILITY_LABEL =
  "J'ai vérifié les principales conditions du minimum légal";

export const EMPLOYER_MAINTIEN_NET_RESULT_NOTE =
  "Le montant net effectivement versé sera inférieur après les prélèvements applicables.";

export const EMPLOYER_MAINTIEN_VERIFY_NOTE =
  "Les textes applicables, votre convention collective, votre bulletin de paie et les explications de votre service paie permettent de vérifier le résultat. En cas de désaccord persistant, un représentant du personnel, une organisation syndicale, un professionnel du droit ou le conseil de prud'hommes peuvent être sollicités selon la situation.";

export const EMPLOYER_MAINTIEN_METHODOLOGY_NOTE =
  "Cette page présente le minimum légal prévu par le Code du travail. Les textes cités sont vérifiés sur Légifrance et comparés aux informations de Service-Public et de l'Assurance Maladie. Les règles plus favorables des conventions collectives ne sont pas appliquées automatiquement.";

export type PriorRightsAnswer = "no" | "yes" | "unknown";

export function resolvePriorRightsDays(
  answer: PriorRightsAnswer,
  usedFirst: number,
  usedSecond: number,
): { usedFirst: number; usedSecond: number; warnUnknown: boolean } {
  if (answer === "yes") {
    return { usedFirst, usedSecond, warnUnknown: false };
  }
  return { usedFirst: 0, usedSecond: 0, warnUnknown: answer === "unknown" };
}

export const EMPLOYER_MAINTIEN_DEFAULT_MONTHLY_GROSS = 2000;

export const EMPLOYER_MAINTIEN_DURATION_ROWS: string[][] = [
  ["Moins de 1 an", "Aucune", "Aucune", "Pas de minimum légal"],
  ["De 1 à 5 ans", "30 jours", "30 jours", "60 jours"],
  ["De 6 à 10 ans", "40 jours", "40 jours", "80 jours"],
  ["De 11 à 15 ans", "50 jours", "50 jours", "100 jours"],
  ["De 16 à 20 ans", "60 jours", "60 jours", "120 jours"],
  ["De 21 à 25 ans", "70 jours", "70 jours", "140 jours"],
  ["De 26 à 30 ans", "80 jours", "80 jours", "160 jours"],
  ["31 ans et plus", "90 jours", "90 jours", "180 jours"],
];

export function formatEuro(value: number): string {
  return formatCurrency(value);
}

export function formatEuroPrecise(value: number, fractionDigits = 4): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

export function buildMaintienCopySummary(result: LegalEmployerComplementResult): string {
  return [
    `Arrêt du ${formatLongDateFr(result.stopStartIso)} au ${formatLongDateFr(result.stopEndIso)} inclus (${formatCalendarDaysFr(result.totalCalendarDays)})`,
    `Éligibilité apparente au minimum légal : ${result.eligibleApparent ? "oui" : "non"}`,
    `Ancienneté retenue : ${formatYearsFr(Math.floor(result.seniorityYears))}`,
    `Délai légal de sept jours du complément employeur : ${formatDaysFr(result.employerCarenceDays)}`,
    `Premier jour théorique de complément : ${result.firstComplementDateIso ? formatLongDateFr(result.firstComplementDateIso) : "aucun"}`,
    `Jours à 90 % : ${result.firstDaysCovered} ; jours aux deux tiers : ${result.secondDaysCovered}`,
    `Complément employeur brut estimé : ${formatEuro(result.employerComplementGrossTotal)}`,
    `IJSS journalière brute retenue : ${formatEuro(result.dailyIjssGross)}`,
    `Jours sans complément légal : ${result.uncoveredDays}`,
    EMPLOYER_MAINTIEN_ROUNDING_NOTE,
    EMPLOYER_MAINTIEN_RESULT_ESTIMATE_NOTE,
  ].join(" · ");
}

export function buildMaintienCopyDetail(result: LegalEmployerComplementResult): string {
  return ["Détail du minimum légal de maintien de salaire", ...result.detailLines].join(
    "\n",
  );
}
