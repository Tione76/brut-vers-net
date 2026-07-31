import {
  BASE_MONTHLY_HOURS_AT_FULL_TIME,
  getProfileCoefficient,
  getProfileLabel,
} from "@/site/salary-calculator/config";
import { monthlyToAnnual, monthlyToHourly, roundCent } from "@/site/salary-calculator/conversions";
import { formatCurrency } from "@/site/salary-calculator/parsing";
import type { EmploymentProfile } from "@/site/salary-calculator/types";
import {
  isNetToGrossAmount,
  NET_TO_GROSS_AMOUNTS,
  NET_TO_GROSS_DEFAULT_PROFILE,
  NET_TO_GROSS_PROFILES,
  NET_TO_GROSS_SALARY_MONTHS,
  netToGrossPath,
  type NetToGrossAmount,
} from "./config";
import { getPageCopyVariant, type PageCopyVariant } from "./copy";

export function formatNetLabel(netMonthly: number): string {
  return formatCurrency(netMonthly).replace(",00", "");
}

/** Libellé court sans décimales inutiles (ex. 1 500 €). */
export function formatNetShort(netMonthly: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(netMonthly);
}

export function estimateGrossMonthlyFromNet(
  netMonthly: number,
  profile: EmploymentProfile = NET_TO_GROSS_DEFAULT_PROFILE,
): number {
  const coefficient = getProfileCoefficient(profile);
  if (coefficient <= 0) {
    return 0;
  }
  return roundCent(netMonthly / coefficient);
}

export interface NetToGrossEstimate {
  netMonthly: number;
  profile: EmploymentProfile;
  profileLabel: string;
  coefficient: number;
  grossMonthly: number;
  grossAnnual: number;
  grossHourly: number;
  monthlyHours: number;
}

export function buildNetToGrossEstimate(
  netMonthly: number,
  profile: EmploymentProfile = NET_TO_GROSS_DEFAULT_PROFILE,
): NetToGrossEstimate {
  const grossMonthly = estimateGrossMonthlyFromNet(netMonthly, profile);
  return {
    netMonthly,
    profile,
    profileLabel: getProfileLabel(profile),
    coefficient: getProfileCoefficient(profile),
    grossMonthly,
    grossAnnual: roundCent(monthlyToAnnual(grossMonthly, NET_TO_GROSS_SALARY_MONTHS)),
    grossHourly: roundCent(monthlyToHourly(grossMonthly, 100)),
    monthlyHours: BASE_MONTHLY_HOURS_AT_FULL_TIME,
  };
}

export function buildAllProfileEstimates(netMonthly: number): Record<
  (typeof NET_TO_GROSS_PROFILES)[number],
  NetToGrossEstimate
> {
  return {
    nonExecutive: buildNetToGrossEstimate(netMonthly, "nonExecutive"),
    executive: buildNetToGrossEstimate(netMonthly, "executive"),
    publicService: buildNetToGrossEstimate(netMonthly, "publicService"),
  };
}

export interface ComparisonRow {
  netMonthly: number;
  nonExecutive: number;
  executive: number;
  publicService: number;
  isCurrent: boolean;
}

/** Tableau compact autour du montant cible (±100 €, pas de 50 €). */
export function buildComparisonRows(netMonthly: number): ComparisonRow[] {
  const offsets = [-100, -50, 0, 50, 100];
  return offsets.map((offset) => {
    const net = netMonthly + offset;
    return {
      netMonthly: net,
      nonExecutive: estimateGrossMonthlyFromNet(net, "nonExecutive"),
      executive: estimateGrossMonthlyFromNet(net, "executive"),
      publicService: estimateGrossMonthlyFromNet(net, "publicService"),
      isCurrent: offset === 0,
    };
  });
}

/** Montants proches pour le maillage interne (hors page courante). */
export function getNearbyNetAmounts(netMonthly: number): NetToGrossAmount[] {
  const preferred = [1400, 1600, 1700, 1800, 2000, 2500, 3000, 1500, 1900, 2200];
  const fromSeries = NET_TO_GROSS_AMOUNTS.filter((amount) => amount !== netMonthly);

  const ordered: number[] = [];
  for (const amount of preferred) {
    if (amount !== netMonthly && isNetToGrossAmount(amount) && !ordered.includes(amount)) {
      ordered.push(amount);
    }
  }
  for (const amount of fromSeries) {
    if (!ordered.includes(amount)) {
      ordered.push(amount);
    }
  }

  return ordered.slice(0, 7) as NetToGrossAmount[];
}

export interface NearbyLink {
  netMonthly: number;
  href: string;
  label: string;
}

export function buildNearbyLinks(netMonthly: number): NearbyLink[] {
  return getNearbyNetAmounts(netMonthly).map((amount) => ({
    netMonthly: amount,
    href: netToGrossPath(amount),
    label: formatNetShort(amount),
  }));
}

export function buildPageSeo(netMonthly: number) {
  const netLabel = formatNetShort(netMonthly);
  const estimates = buildAllProfileEstimates(netMonthly);
  const seriesIndex = NET_TO_GROSS_AMOUNTS.findIndex((amount) => amount === netMonthly);
  const copy = getPageCopyVariant(netLabel, seriesIndex, estimates);
  const nonCadreGross = formatNetShort(estimates.nonExecutive.grossMonthly);

  return {
    title: `Combien faut-il gagner en brut pour toucher ${netLabel} net ?`,
    description: `Pour toucher environ ${netLabel} nets par mois, comptez près de ${nonCadreGross} bruts en non-cadre (estimation). Comparaison cadre et fonction publique, tableau et simulation gratuite.`,
    h1: `Combien faut-il gagner en brut pour toucher ${netLabel} net ?`,
    subtitle: copy.subtitle,
  };
}

export function buildPageCopy(netMonthly: number): PageCopyVariant {
  const estimates = buildAllProfileEstimates(netMonthly);
  const seriesIndex = NET_TO_GROSS_AMOUNTS.findIndex((amount) => amount === netMonthly);
  return getPageCopyVariant(formatNetShort(netMonthly), seriesIndex, estimates);
}

export function buildFaqItems(netMonthly: number) {
  const estimates = buildAllProfileEstimates(netMonthly);
  const netLabel = formatNetShort(netMonthly);
  const nonCadre = formatCurrency(estimates.nonExecutive.grossMonthly);
  const cadre = formatCurrency(estimates.executive.grossMonthly);
  const publicService = formatCurrency(estimates.publicService.grossMonthly);

  return [
    {
      question: `Combien faut-il gagner en brut pour toucher ${netLabel} net ?`,
      answer: `Selon le profil, comptez environ ${nonCadre} bruts pour un salarié non-cadre, ${cadre} pour un cadre et ${publicService} pour un agent de la fonction publique. Ces montants visent ${netLabel} nets avant prélèvement à la source.`,
    },
    {
      question: "Pourquoi ce montant est-il une estimation ?",
      answer:
        "Les cotisations réelles dépendent de votre contrat, de votre convention, des primes et parfois d'un régime particulier. Nous utilisons des coefficients moyens alignés sur le simulateur, utiles pour un ordre de grandeur, pas pour reproduire une fiche de paie.",
    },
    {
      question: "Comment obtenir un calcul parfaitement personnalisé ?",
      answer:
        "Ouvrez le calculateur Brut vers Net, indiquez votre brut ou votre net, choisissez votre profil et ajustez le temps de travail ou le prélèvement à la source. Le bulletin de salaire reste la référence officielle.",
    },
  ];
}
