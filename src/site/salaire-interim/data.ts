import { formatCurrency } from "@/site/salary-calculator";
import {
  SMIC_CURRENT,
  SMIC_EDITORIAL_YEAR,
  SMIC_EFFECTIVE_FROM_LABEL,
  SMIC_LABELS,
  SMIC_VERIFIED_ON_LABEL,
} from "@/site/smic/data";
import type { InterimCalculationResult } from "./engine";
import {
  INTERIM_DEFAULT_ICCP_RATE_PERCENT,
  INTERIM_DEFAULT_IFM_RATE_PERCENT,
} from "./engine";

export const INTERIM_PATH = "/salaire-interim-calcul-brut-net";
export const INTERIM_SLUG = "salaire-interim-calcul-brut-net";
export const INTERIM_DEFAULT_MISSION_GROSS = 1000;

export const INTERIM_PUBLISHED_AT = "2026-09-18";
export const INTERIM_UPDATED_AT = "2026-09-18";
export const INTERIM_UPDATED_AT_LABEL = "18 septembre 2026";
export const INTERIM_RULES_VERIFIED_LABEL = SMIC_VERIFIED_ON_LABEL;

export const INTERIM_H1 =
  "Salaire en intérim : calcul du brut et du net avec IFM et congés payés";

export const INTERIM_SEO_TITLE =
  "Salaire en intérim : calcul brut/net, IFM et congés payés";

export const INTERIM_META_DESCRIPTION =
  "Calculez votre salaire en intérim : brut, net estimé, IFM et indemnité de congés payés. Formules, exemples, exceptions et simulateur gratuit.";

export const INTERIM_BREADCRUMB = "Salaire en intérim";

export const INTERIM_SUBTITLE =
  "Estimez le brut de mission, l'indemnité de fin de mission et l'indemnité compensatrice de congés payés, puis un net indicatif avant prélèvement à la source.";

/** Une seule ligne de fraîcheur (éviter le doublon « Règles vérifiées »). */
export const INTERIM_FRESHNESS_LINE =
  `Règles et sources officielles vérifiées le ${INTERIM_RULES_VERIFIED_LABEL}. Article mis à jour le ${INTERIM_UPDATED_AT_LABEL}. SMIC horaire de référence : ${SMIC_LABELS.hourlyGross} (depuis le ${SMIC_EFFECTIVE_FROM_LABEL}).`;

export const INTERIM_SOURCES = {
  contratTemp: {
    org: "Service-Public",
    label: "Contrat de travail temporaire (intérim)",
    href: "https://entreprendre.service-public.gouv.fr/vosdroits/F11215",
  },
  egaliteRemuneration: {
    org: "Légifrance",
    label: "Code du travail, article L1251-18 (égalité de rémunération)",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006901257",
  },
  iccp: {
    org: "Légifrance",
    label: "Code du travail, article L1251-19 (indemnité compensatrice de congés payés)",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000049461625",
  },
  ifm: {
    org: "Légifrance",
    label: "Code du travail, article L1251-32 (indemnité de fin de mission)",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006901285",
  },
  ifmSection: {
    org: "Légifrance",
    label: "Code du travail, articles L1251-29 à L1251-34 (IFM et exceptions)",
    href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006198550/",
  },
  paiementSalaire: {
    org: "Service-Public",
    label: "Paiement du salaire",
    href: "https://www.service-public.fr/particuliers/vosdroits/F2308",
  },
  paiementL3242_1: {
    org: "Légifrance",
    label: "Code du travail, article L3242-1 (périodicité du paiement du salaire)",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006902858",
  },
  paiementL3242_3: {
    org: "Légifrance",
    label: "Code du travail, article L3242-3 (salariés non mensualisés)",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006902860",
  },
  smic: {
    org: "Service-Public",
    label: "SMIC",
    href: "https://www.service-public.fr/particuliers/vosdroits/F2300",
  },
  heuresSup: {
    org: "Service-Public",
    label: "Heures supplémentaires",
    href: "https://www.service-public.fr/particuliers/vosdroits/F2391",
  },
} as const;

export const INTERIM_IFM_EXCEPTIONS = [
  "CDI conclu immédiatement avec l'entreprise utilisatrice",
  "Complément de formation professionnelle à l'issue de la mission",
  "Rupture anticipée à l'initiative du salarié",
  "Rupture pour faute grave",
  "Force majeure",
  "Contrat saisonnier, sauf disposition plus favorable",
] as const;

export {
  SMIC_CURRENT,
  SMIC_EDITORIAL_YEAR,
  SMIC_EFFECTIVE_FROM_LABEL,
  SMIC_LABELS,
  INTERIM_DEFAULT_IFM_RATE_PERCENT,
  INTERIM_DEFAULT_ICCP_RATE_PERCENT,
};

/** Montants bruts : centimes, format monétaire français. */
export function formatEuro(value: number): string {
  return formatCurrency(value);
}

const euroWholeFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

/** Net indicatif arrondi à l'euro, précédé de ≈ (page intérim uniquement). */
export function formatEuroApprox(value: number): string {
  return `≈\u00a0${euroWholeFormatter.format(Math.round(value))}`;
}

export function formatEuroApproxWord(value: number): string {
  return `environ ${euroWholeFormatter.format(Math.round(value))}`;
}

export function buildInterimCopySummary(result: InterimCalculationResult): string {
  const ifmLine = result.ifmDue
    ? `IFM (${result.ifmRatePercent}\u00a0%) : ${formatEuro(result.ifmAmount)}`
    : "IFM : 0 € (non incluse dans cette simulation)";
  return [
    `Rémunération brute de la mission : ${formatEuro(result.missionGross)}`,
    ifmLine,
    `Indemnité de congés payés (${result.iccpRatePercent}\u00a0%) : ${formatEuro(result.iccpAmount)}`,
    `Total brut avec indemnités : ${formatEuro(result.totalGross)}`,
    `Net estimé avant prélèvement à la source : ${formatEuroApprox(result.netEstimated)} (indicatif)`,
    result.expenseReimbursements > 0
      ? `Remboursements de frais professionnels (hors salaire) : ${formatEuro(result.expenseReimbursements)}`
      : null,
  ]
    .filter(Boolean)
    .join(" · ");
}

export function buildInterimCopyDetail(result: InterimCalculationResult): string {
  const lines = [
    "Détail du calcul salaire intérim",
    `Rémunération brute de la mission : ${formatEuro(result.missionGross)}`,
    result.ifmDue
      ? `IFM = ${formatEuro(result.missionGross)} × ${result.ifmRatePercent}\u00a0% = ${formatEuro(result.ifmAmount)}`
      : "IFM = 0 € (non incluse dans cette simulation)",
    `Base ICCP = ${formatEuro(result.missionGross)} + ${formatEuro(result.ifmAmount)} = ${formatEuro(result.iccpBase)}`,
    `ICCP = ${formatEuro(result.iccpBase)} × ${result.iccpRatePercent}\u00a0% = ${formatEuro(result.iccpAmount)}`,
    `Total brut avec indemnités = ${formatEuro(result.missionGross)} + ${formatEuro(result.ifmAmount)} + ${formatEuro(result.iccpAmount)} = ${formatEuro(result.totalGross)}`,
    `Net estimé (indicatif, avant prélèvement à la source) : ${formatEuroApprox(result.netEstimated)}`,
  ];
  if (result.expenseReimbursements > 0) {
    lines.push(
      `Remboursements de frais professionnels (séparés du salaire) : ${formatEuro(result.expenseReimbursements)}`,
      `Total indicatif versé, remboursements de frais compris : ${formatEuroApprox(result.netEstimated)} + ${formatEuro(result.expenseReimbursements)}`,
    );
  }
  return lines.join("\n");
}

export const INTERIM_NET_DISCLAIMER =
  "Estimation standard pour un salarié non-cadre, avant prélèvement à la source. Le résultat réel dépend notamment des cotisations du bulletin, de la mutuelle, de la prévoyance et de la situation du salarié.";

export const INTERIM_HS_NET_WARNING =
  "Les heures supplémentaires peuvent bénéficier, sous conditions et dans les limites légales, d'une réduction de cotisations salariales et d'une exonération d'impôt sur le revenu. Le net réel peut donc différer de l'estimation standard affichée ici. Le simulateur ne reproduit pas un bulletin de paie complet.";

export const INTERIM_SCOPE_DISCLAIMER =
  "Les calculs présentent le cas général à partir des règles et montants officiels cités. Ils ne remplacent pas l'examen d'un contrat de mission, d'une convention collective ou d'un bulletin de paie.";

export const INTERIM_SMIC_MONTHLY_FORMULA_NOTE =
  `SMIC mensuel brut officiel de ${SMIC_LABELS.monthlyGross} pour 35 heures par semaine, calculé à partir de la mensualisation exacte de 35 × 52 ÷ 12.`;
