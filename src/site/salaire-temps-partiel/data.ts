/**
 * Données et calculs du guide /salaire-temps-partiel.
 * Exemples pédagogiques (2 500 €, 15 €/h) distincts des montants SMIC réglementaires.
 * SMIC : importé depuis `@/site/smic/data`, sans duplication du taux horaire.
 */

import {
  SMIC_CURRENT,
  SMIC_EFFECTIVE_FROM_LABEL,
  SMIC_LABELS,
  SMIC_SOURCES,
} from "@/site/smic/data";
import { roundCent } from "@/site/salary-calculator";
import { weeklyToMonthlyHours } from "@/site/smic-heures/engine";

export const PART_TIME_SLUG = "salaire-temps-partiel";
export const PART_TIME_PATH = "/salaire-temps-partiel";
export const PART_TIME_BREADCRUMB = "Salaire à temps partiel";

export const PART_TIME_H1 =
  "Salaire à temps partiel : combien touche-t-on à 80 %, à mi-temps ou à 24 heures ?";

export const PART_TIME_SEO_TITLE =
  "Salaire à temps partiel : 80 %, mi-temps, 24 h (mis à jour)";

export const PART_TIME_META_DESCRIPTION =
  "Quel salaire à 80 %, à mi-temps ou à 24 heures ? Retrouvez les calculs du brut, les repères au SMIC et les points à vérifier pour estimer votre net.";

export const PART_TIME_SUBTITLE =
  "Calculer un salaire à 80 %, à mi-temps ou à 24 heures, et vérifier ce qui change réellement sur le net.";

/** Publication initiale du guide. */
export const PART_TIME_PUBLISHED_AT = "2026-11-08";

/** Dernière mise à jour éditoriale. */
export const PART_TIME_UPDATED_AT = "2026-11-08";

/**
 * Date de contrôle des sources SMIC pour ce guide (distincte de la date d'effet).
 * Ne pas confondre avec SMIC_VERIFIED_ON du module SMIC global.
 */
export const PART_TIME_SMIC_CHECKED_ON = "2026-11-08";
export const PART_TIME_SMIC_CHECKED_ON_LABEL = "8 novembre 2026";

/** Temps complet de référence des exemples (secteur privé, cas courant). */
export const PART_TIME_FULL_TIME_WEEKLY_HOURS = 35;

/** Salaire brut de base mensuel à temps plein utilisé dans les tableaux pédagogiques. */
export const PART_TIME_EXAMPLE_FULL_TIME_GROSS = 2500;

/** Taux horaire fictif pour les exemples hors SMIC. */
export const PART_TIME_EXAMPLE_HOURLY_RATE = 15;

export function formatPartTimeEuro(value: number, digits = 2): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
    .format(value)
    .replace(/\u202f|\u00a0| /g, "\u00a0");
}

/** Affichage lisible : sans ,00 inutiles dans les phrases. */
export function formatPartTimeEuroReadable(value: number): string {
  const rounded = roundCent(value);
  const digits = Number.isInteger(rounded) ? 0 : 2;
  return formatPartTimeEuro(rounded, digits);
}

export function formatPartTimeHours(value: number, digits = 2): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : digits,
    maximumFractionDigits: digits,
  })
    .format(value)
    .replace(/\u202f|\u00a0| /g, "\u00a0");
}

/** Salaire brut de base à temps partiel = brut temps plein × durée TP ÷ durée TC. */
export function partTimeBaseGross(
  fullTimeGross: number,
  partTimeWeeklyHours: number,
  fullTimeWeeklyHours: number = PART_TIME_FULL_TIME_WEEKLY_HOURS,
): number {
  return roundCent((fullTimeGross * partTimeWeeklyHours) / fullTimeWeeklyHours);
}

/** Brut mensualisé à partir d'un taux horaire et d'une durée hebdomadaire fixe. */
export function monthlyGrossFromHourlyRate(
  hourlyRate: number,
  weeklyHours: number,
): number {
  return roundCent(hourlyRate * weeklyToMonthlyHours(weeklyHours));
}

/** Équivalent temps plein = brut TP ÷ quotité (ex. 0,8 pour 80 %). */
export function fullTimeEquivalentGross(
  partTimeGross: number,
  workQuota: number,
): number {
  return roundCent(partTimeGross / workQuota);
}

/** Majoration d'heures complémentaires (exemple hebdomadaire). */
export function complementaryHoursGross(
  hours: number,
  hourlyRate: number,
  majorationRate: number,
): number {
  return roundCent(hours * hourlyRate * (1 + majorationRate));
}

/**
 * Prise en charge transport sous la moitié du temps complet :
 * remboursement temps plein × heures ÷ (moitié de la durée de référence).
 */
export function transportRefundBelowHalf(
  fullTimeRefund: number,
  weeklyHours: number,
  fullTimeWeeklyHours: number = PART_TIME_FULL_TIME_WEEKLY_HOURS,
): number {
  return roundCent((fullTimeRefund * weeklyHours) / (fullTimeWeeklyHours / 2));
}

export type PartTimeDurationRow = {
  label: string;
  weeklyHours: number;
  monthlyHours: number;
  baseGross: number;
  quotaLabel?: string;
};

function durationRow(
  label: string,
  weeklyHours: number,
  fullTimeGross: number = PART_TIME_EXAMPLE_FULL_TIME_GROSS,
): PartTimeDurationRow {
  return {
    label,
    weeklyHours,
    monthlyHours: roundCent(weeklyToMonthlyHours(weeklyHours)),
    baseGross: partTimeBaseGross(fullTimeGross, weeklyHours),
  };
}

/** Tableau de repères : même emploi, même taux horaire, hors variables. */
export function partTimeDurationRows(
  fullTimeGross: number = PART_TIME_EXAMPLE_FULL_TIME_GROSS,
): PartTimeDurationRow[] {
  return [
    durationRow("Mi-temps", 17.5, fullTimeGross),
    durationRow("20 h", 20, fullTimeGross),
    durationRow("24 h", 24, fullTimeGross),
    { ...durationRow("80 %", 28, fullTimeGross), quotaLabel: "80 %" },
    durationRow("30 h", 30, fullTimeGross),
    durationRow("Temps plein", 35, fullTimeGross),
  ];
}

export type PartTimeEightyRow = {
  fullTimeGross: number;
  atEightyGross: number;
  monthlyDrop: number;
};

export function partTimeEightyRows(
  fullTimeAmounts: readonly number[] = [2000, 2500, 3000, 3500],
): PartTimeEightyRow[] {
  return fullTimeAmounts.map((fullTimeGross) => {
    const atEightyGross = partTimeBaseGross(fullTimeGross, 28);
    return {
      fullTimeGross,
      atEightyGross,
      monthlyDrop: roundCent(fullTimeGross - atEightyGross),
    };
  });
}

export type PartTimeSmicRow = {
  label: string;
  weeklyHours: number;
  monthlyHours: number;
  monthlyGross: number;
};

/** Repères SMIC dérivés du taux horaire centralisé (pas de SMIC mensuel déjà arrondi). */
export function partTimeSmicRows(): PartTimeSmicRow[] {
  return (
    [
      { label: "Mi-temps (17 h 30)", weeklyHours: 17.5 },
      { label: "24 heures", weeklyHours: 24 },
      { label: "80 % (28 heures)", weeklyHours: 28 },
    ] as const
  ).map(({ label, weeklyHours }) => {
    const monthlyHours = weeklyToMonthlyHours(weeklyHours);
    return {
      label,
      weeklyHours,
      monthlyHours: roundCent(monthlyHours),
      monthlyGross: roundCent(monthlyHours * SMIC_CURRENT.hourlyGross),
    };
  });
}

export const PART_TIME_SMIC_CONTEXT = {
  hourlyGross: SMIC_CURRENT.hourlyGross,
  hourlyGrossLabel: SMIC_LABELS.hourlyGross,
  effectiveFromLabel: SMIC_EFFECTIVE_FROM_LABEL,
  checkedOnLabel: PART_TIME_SMIC_CHECKED_ON_LABEL,
  sourceHref: SMIC_SOURCES.servicePublic.href,
  arreteHref: SMIC_SOURCES.arreteMai2026.href,
  ministereHref: SMIC_SOURCES.ministereTravailRevaloJuin2026.href,
  caption: `Repères calculés avec le SMIC horaire brut de ${SMIC_LABELS.hourlyGross}, applicable depuis le ${SMIC_EFFECTIVE_FROM_LABEL}.`,
} as const;

export const PART_TIME_SOURCES = {
  servicePublicTempsPartiel: {
    label: "Temps partiel d'un salarié dans le secteur privé",
    org: "Service-Public.fr",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F32428",
  },
  servicePublicSmic: {
    label: "Smic (salaire minimum interprofessionnel de croissance)",
    org: "Service-Public.fr",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2300",
  },
  arreteSmicMai2026: {
    label: "Arrêté du 22 mai 2026 relatif au relèvement du salaire minimum de croissance",
    org: "Légifrance",
    href: "https://www.legifrance.gouv.fr/eli/arrete/2026/5/22/TRST2612929A/jo/texte",
  },
  ministereSmic: {
    label: "Le SMIC",
    org: "Ministère du Travail",
    href: "https://travail-emploi.gouv.fr/droit-du-travail/la-remuneration/article/le-smic",
  },
  codeL3123_5: {
    label: "Code du travail : article L. 3123-5 (droits, rémunération, ancienneté)",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/code-du-travail/l3123-5",
  },
  codeL3123_6: {
    label: "Code du travail : article L. 3123-6 (contrat de travail)",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/code-du-travail/l3123-6",
  },
  codeL3123_7: {
    label: "Code du travail : article L. 3123-7 (durée minimale et dérogations)",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/code-du-travail/l3123-7",
  },
  codeL3123_9: {
    label: "Code du travail : article L. 3123-9 (plafond des heures complémentaires)",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/code-du-travail/l3123-9",
  },
  codeL3123_19: {
    label: "Code du travail : article L. 3123-19 (durée minimale conventionnelle)",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/code-du-travail/l3123-19",
  },
  codeL3123_20: {
    label: "Code du travail : article L. 3123-20 (limite des heures complémentaires jusqu'au tiers)",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/code-du-travail/l3123-20",
  },
  codeL3123_21: {
    label: "Code du travail : article L. 3123-21 (majoration conventionnelle)",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/code-du-travail/l3123-21",
  },
  codeL3123_22: {
    label: "Code du travail : article L. 3123-22 (complément d'heures)",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/code-du-travail/l3123-22",
  },
  codeL3123_27: {
    label: "Code du travail : article L. 3123-27 (durée minimale supplétive de 24 heures)",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/code-du-travail/l3123-27",
  },
  codeL3123_28: {
    label: "Code du travail : article L. 3123-28 (plafond supplétif du dixième)",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/code-du-travail/l3123-28",
  },
  codeL3123_29: {
    label: "Code du travail : article L. 3123-29 (majorations supplétives 10 % / 25 %)",
    org: "Code du travail numérique",
    href: "https://code.travail.gouv.fr/code-du-travail/l3123-29",
  },
  servicePublicConges: {
    label: "Droits à congés payés d'un salarié à temps partiel",
    org: "Service-Public.fr",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33927",
  },
  servicePublicLicenciement: {
    label: "Indemnité de licenciement du salarié en CDI",
    org: "Service-Public.fr",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F987",
  },
  servicePublicRetraite: {
    label: "Durée d'assurance retraite du salarié du secteur privé",
    org: "Service-Public.fr",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1761",
  },
  servicePublicTransport: {
    label: "Prise en charge des frais de transports publics des salariés",
    org: "Service-Public Entreprendre",
    href: "https://entreprendre.service-public.gouv.fr/vosdroits/F37900",
  },
  servicePublicFonctionPublique: {
    label: "Temps partiel dans la fonction publique",
    org: "Service-Public.fr",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F486",
  },
  ameliTpt: {
    label: "Reprendre le travail après un arrêt maladie (temps partiel thérapeutique)",
    org: "Ameli.fr",
    href: "https://www.ameli.fr/assure/droits-demarches/maladie-accident-hospitalisation/arret-travail-maladie/reprendre-travail-apres-arret-maladie",
  },
  servicePublicPrimeActivite: {
    label: "Prime d'activité",
    org: "Service-Public.fr",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2882",
  },
  servicePublicPrepare: {
    label: "Prestation partagée d'éducation de l'enfant (PreParE)",
    org: "Service-Public.fr",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2332",
  },
  monEntrepriseBrutNet: {
    label: "Simulateur salaire brut / net",
    org: "Urssaf (mon-entreprise.urssaf.fr)",
    href: "https://mon-entreprise.urssaf.fr/simulateurs/salaire-brut-net",
  },
} as const;
