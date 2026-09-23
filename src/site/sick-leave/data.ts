import { formatCurrency } from "@/site/salary-calculator";
import { SMIC_VERIFIED_ON_LABEL } from "@/site/smic/data";
import type { SickLeaveCalculationResult } from "./engine";
import { IJSS_BAREMES } from "./engine";

export const SICK_LEAVE_PATH = "/salaire-arret-maladie";
export const SICK_LEAVE_SLUG = "salaire-arret-maladie";

export const SICK_LEAVE_PUBLISHED_AT = "2026-09-19";
export const SICK_LEAVE_UPDATED_AT = "2026-09-20";
export const SICK_LEAVE_UPDATED_AT_LABEL = "20 septembre 2026";

export const SICK_LEAVE_H1 =
  "Salaire en arrêt maladie dans le privé : combien allez-vous toucher ?";

export const SICK_LEAVE_SEO_TITLE =
  "Salaire en arrêt maladie dans le privé : montant et simulateur";

export const SICK_LEAVE_META_DESCRIPTION =
  "Estimez votre salaire pendant un arrêt maladie dans le privé : IJSS, jours de carence, complément employeur et perte de revenu.";

export const SICK_LEAVE_BREADCRUMB = "Salaire en arrêt maladie";

export const SICK_LEAVE_SUBTITLE =
  "Estimez votre revenu pendant un arrêt maladie (IJSS et complément employeur) et consultez les règles de calcul applicables aux salariés du privé.";

export const SICK_LEAVE_CALCULATOR_ID = "simulateur-salaire-arret-maladie";
export const SICK_LEAVE_RULES_SECTION_ID = "comment-est-paye-un-arret-maladie";
export const SICK_LEAVE_HOW_TO_SECTION_ID =
  "comment-utiliser-le-simulateur-salaire-arret-maladie";
export const SICK_LEAVE_LIMITS_SECTION_ID =
  "limites-du-simulateur-salaire-arret-maladie";

export const SICK_LEAVE_HEADER_PRIMARY_CTA = "Estimer mon salaire";
export const SICK_LEAVE_HEADER_SECONDARY_CTA = "Comprendre le calcul et les règles";

export const SICK_LEAVE_FRESHNESS_LINE =
  `Règles et sources officielles vérifiées le ${SMIC_VERIFIED_ON_LABEL}. Article mis à jour le ${SICK_LEAVE_UPDATED_AT_LABEL}. Barèmes IJSS datés selon le début de l'arrêt.`;

export const SICK_LEAVE_SOURCES = {
  ameli: {
    org: "Assurance Maladie",
    label: "Arrêt de travail pour maladie : les indemnités journalières du salarié",
    href: "https://www.ameli.fr/assure/remboursements/indemnites-journalieres-maladie-maternite-paternite/indemnites-journalieres-pour-maladie/arret-maladie-salarie",
  },
  servicePublic: {
    org: "Service-Public",
    label: "Arrêt maladie : indemnités journalières versées au salarié",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F3053",
  },
  codeTravail: {
    org: "Code du travail numérique",
    label: "Arrêt maladie : quel maintien de salaire ?",
    href: "https://code.travail.gouv.fr/contribution/en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire",
  },
  cssR3234: {
    org: "Légifrance",
    label: "Code de la sécurité sociale, article R323-4",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000051226486",
  },
  cssL323: {
    org: "Légifrance",
    label: "Code de la sécurité sociale, articles L323-1 à L323-7",
    href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006073189/LEGISCTA000006172583/",
  },
  travailL1226: {
    org: "Légifrance",
    label: "Code du travail, articles L1226-1 et L1226-1-1",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006900863",
  },
  travailD1226: {
    org: "Légifrance",
    label: "Code du travail, articles D1226-1 à D1226-8",
    href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000018537808/",
  },
} as const;

export const SICK_LEAVE_BRUT_TOTAL_NOTE =
  "Le total affiché est brut. Les IJSS supportent notamment la CSG et la CRDS, tandis que le complément employeur est soumis aux prélèvements applicables. Le montant réellement versé dépend aussi de votre convention, de votre prévoyance, de la retenue d'absence et du prélèvement à la source.";

export const SICK_LEAVE_NET_DISCLAIMER =
  "Estimation indicative avant prélèvement à la source. Le bulletin réel dépend de la retenue d'absence, des cotisations, de la convention collective, de la prévoyance et de votre taux de PAS.";

export const SICK_LEAVE_SCOPE_DISCLAIMER =
  "Le simulateur traite le cas général : maladie non professionnelle, salarié mensualisé du privé, régime général, minimum légal du complément employeur. Il ne remplace pas l'examen de votre contrat, de votre convention ou de votre bulletin.";

export const SICK_LEAVE_PERIMETER_KICKER = "Périmètre de la simulation";
export const SICK_LEAVE_PERIMETER_VALUE =
  "salarié mensualisé du secteur privé, maladie ou accident non professionnel.";
export const SICK_LEAVE_PERIMETER_FOLLOW =
  "Le calcul ne s'applique pas aux accidents du travail, accidents de trajet ou maladies professionnelles.";
export const SICK_LEAVE_PERIMETER_NOTE = `Périmètre de la simulation : ${SICK_LEAVE_PERIMETER_VALUE} ${SICK_LEAVE_PERIMETER_FOLLOW}`;

export const SICK_LEAVE_DEFAULT_MONTHLY_GROSS = 2000;

export const CURRENT_IJSS_BAREME_JULY_2026 = IJSS_BAREMES[IJSS_BAREMES.length - 1]!;

export function formatEuro(value: number): string {
  return formatCurrency(value);
}

export function formatEuroApprox(value: number): string {
  return formatCurrency(value);
}

export function buildSickLeaveCopySummary(result: SickLeaveCalculationResult): string {
  return [
    `Arrêt du ${result.stopStartIso} au ${result.stopEndIso} inclus (${result.totalCalendarDays} j)`,
    `IJSS brutes : ${formatEuro(result.ijssGrossTotal)} (${result.ijssIndemnifiedDays} j × ${formatEuro(result.dailyIjssGross)})`,
    `IJSS nettes indicatives avant PAS : ${formatEuro(result.ijssNetIndicativeTotal)}`,
    `Complément employeur brut estimé : ${formatEuro(result.employerComplementGrossTotal)}`,
    `Total brut estimé pour la période d'arrêt : ${formatEuro(result.estimatedIncomeForStop)} (indicatif)`,
    `Revenu brut théorique pour la même durée : ${formatEuro(result.habitualIncomeForPeriod)}`,
    `Perte brute indicative : ${formatEuro(result.estimatedLoss)}`,
    result.payerLabel,
    `Barème : ${result.bareme.sourceLabel}`,
  ].join(" · ");
}

export function buildSickLeaveCopyDetail(result: SickLeaveCalculationResult): string {
  return ["Détail du calcul salaire arrêt maladie", ...result.detailLines].join("\n");
}
