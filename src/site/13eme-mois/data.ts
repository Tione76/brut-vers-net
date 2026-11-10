/**
 * Données et calculs du guide /13eme-mois.
 * Exemples chiffrés conditionnels, sans moteur de paie.
 */

import { roundCent } from "@/site/salary-calculator";

export const THIRTEENTH_SLUG = "13eme-mois";
export const THIRTEENTH_PATH = "/13eme-mois";
export const THIRTEENTH_BREADCRUMB = "13ᵉ mois";

export const THIRTEENTH_H1 =
  "13ᵉ mois : calcul, montant net et conditions pour le toucher";

export const THIRTEENTH_SEO_TITLE =
  "13e mois : calcul, net et conditions (mis à jour)";

export const THIRTEENTH_META_DESCRIPTION =
  "Le 13e mois est-il compris dans votre salaire annuel ou versé en plus ? Calcul, net, prorata, départ et conditions pour vérifier votre paie.";

export const THIRTEENTH_SUBTITLE =
  "Le 13ᵉ mois est-il compris dans votre salaire annuel ou versé en plus ? Combien pouvez-vous toucher si vous arrivez en cours d'année ou quittez l'entreprise ? Voici comment comprendre votre contrat et vérifier le montant sur votre paie.";

/**
 * Première publication publique (Europe/Paris).
 * Ne pas modifier publishedAt lors d'une correction ultérieure.
 */
export const THIRTEENTH_PUBLISHED_AT = "2026-11-10T17:43:19+01:00";
export const THIRTEENTH_UPDATED_AT = "2026-11-10T17:43:19+01:00";

/** Date de contrôle des sources pour ce guide. */
export const THIRTEENTH_SOURCES_CHECKED_ON = "2026-11-10";
export const THIRTEENTH_SOURCES_CHECKED_ON_LABEL = "10 novembre 2026";

/** Exemple A : rémunération annuelle déjà fixée, versée en 13 échéances. */
export const THIRTEENTH_ANNUAL_FIXED_GROSS = 30000;

/** Exemple B : salaire mensuel de base. */
export const THIRTEENTH_MONTHLY_BASE_GROSS = 2500;

/** Exemples de salaire de base pour le tableau « un mois de salaire ». */
export const THIRTEENTH_BASE_EXAMPLES = [2000, 2500, 3000] as const;

/** Exemple de prorata (6/12). */
export const THIRTEENTH_PRORATA_FULL_A = 2500;
export const THIRTEENTH_PRORATA_MONTHS_A = 6;
export const THIRTEENTH_PRORATA_DENOM_A = 12;

/** Exemple de prorata (9/12). */
export const THIRTEENTH_PRORATA_FULL_B = 2400;
export const THIRTEENTH_PRORATA_MONTHS_B = 9;
export const THIRTEENTH_PRORATA_DENOM_B = 12;

/** Exemple temps partiel : base déjà proportionnelle. */
export const THIRTEENTH_PART_TIME_BASE_GROSS = 2000;

export const THIRTEENTH_SOURCES = {
  servicePublicPrimes: {
    label: "Salaire, primes et avantages",
    org: "Service-Public",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2301",
  },
  servicePublicUsage: {
    label: "Qu'est-ce qu'un usage d'entreprise ?",
    org: "Service-Public",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F311",
  },
  cass1993: {
    label:
      "Cour de cassation, Assemblée plénière, 5 mars 1993, n° 89-43.464",
    org: "Légifrance",
    href: "https://www.legifrance.gouv.fr/juri/id/JURITEXT000007030031",
  },
  cass2009: {
    label:
      "Cour de cassation, chambre sociale, 28 octobre 2009, n° 08-40.842",
    org: "Légifrance",
    href: "https://www.legifrance.gouv.fr/juri/id/JURITEXT000021225332",
  },
  codeL3123_5: {
    label: "Code du travail : article L. 3123-5, temps partiel",
    org: "Légifrance",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033020084/",
  },
  codeL1242Cdd: {
    label: "Code du travail : articles L. 1242-14 et L. 1242-15, CDD",
    org: "Légifrance",
    href: "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006189459/",
  },
  codeL1243_8: {
    label: "Code du travail : article L. 1243-8, indemnité de fin de CDD",
    org: "Légifrance",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006901219/",
  },
  assembleeNationaleCddPrimes: {
    label:
      "Réponse ministérielle : prise en compte des primes annuelles dans l'indemnité de fin de CDD",
    org: "Assemblée nationale",
    href: "https://www.assemblee-nationale.fr/dyn/11/questions/QANR5L11QE8078.pdf",
  },
  codeL3245_1: {
    label: "Code du travail : article L. 3245-1, prescription salariale",
    org: "Légifrance",
    href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000027566295/",
  },
  codeTravailNumerique: {
    label: "Code du travail numérique",
    org: "Ministère du Travail",
    href: "https://code.travail.gouv.fr/",
  },
  monEntrepriseSmic: {
    label:
      "Prise en compte des rémunérations pour vérifier le SMIC",
    org: "Mon-entreprise Urssaf",
    href: "https://mon-entreprise.urssaf.fr/documentation/salari%C3%A9/r%C3%A9mun%C3%A9ration/assiette-de-v%C3%A9rification-du-SMIC",
  },
  servicePublicCongesPayes: {
    label: "Comment est calculée l'indemnité de congés payés du salarié ?",
    org: "Service-Public",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33359",
  },
  bofipPrimes: {
    label:
      "Indemnités, primes et gratifications des salariés du secteur privé",
    org: "BOFiP",
    href: "https://bofip.impots.gouv.fr/bofip/5605-PGP.html",
  },
} as const;

export function formatThirteenthEuro(value: number, digits = 2): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
    .format(value)
    .replace(/\u202f|\u00a0| /g, "\u00a0");
}

/** Affichage lisible : sans ,00 inutiles dans les phrases. */
export function formatThirteenthEuroReadable(value: number): string {
  const rounded = roundCent(value);
  const digits = Number.isInteger(rounded) ? 0 : 2;
  return formatThirteenthEuro(rounded, digits);
}

/** Échéance égale d'une rémunération annuelle répartie sur n versements. */
export function equalInstallmentGross(
  annualGross: number,
  installments: number,
): number {
  return roundCent(annualGross / installments);
}

/** Prime égale à un mois de salaire de base (hypothèse d'exemple). */
export function fullThirteenthFromBase(baseGross: number): number {
  return roundCent(baseGross);
}

/** Total annuel brut avec une prime égale à un mois de base. */
export function annualWithFullThirteenth(baseGross: number): number {
  return roundCent(baseGross * 12 + fullThirteenthFromBase(baseGross));
}

/**
 * Prorata d'exemple : prime complète × durée retenue ÷ durée totale.
 * Uniquement si le dispositif prévoit ce mode de calcul.
 */
export function prorataThirteenthGross(
  fullPrimeGross: number,
  retainedUnits: number,
  denominator: number,
): number {
  if (denominator <= 0) {
    throw new Error("Le dénominateur du prorata doit être strictement positif.");
  }
  return roundCent((fullPrimeGross * retainedUnits) / denominator);
}

export type ThirteenthBaseExampleRow = {
  baseGross: number;
  thirteenthGross: number;
  annualWithPrime: number;
};

export function thirteenthBaseExampleRows(
  bases: readonly number[] = THIRTEENTH_BASE_EXAMPLES,
): ThirteenthBaseExampleRow[] {
  return bases.map((baseGross) => ({
    baseGross,
    thirteenthGross: fullThirteenthFromBase(baseGross),
    annualWithPrime: annualWithFullThirteenth(baseGross),
  }));
}

export type OfferComparisonRow = {
  label: string;
  annualGross: number;
};

export function offerComparisonRows(): OfferComparisonRow[] {
  const monthly = THIRTEENTH_MONTHLY_BASE_GROSS;
  return [
    {
      label: `${formatThirteenthEuroReadable(monthly)}\u00a0€ par mois pendant douze mois`,
      annualGross: roundCent(monthly * 12),
    },
    {
      label: `${formatThirteenthEuroReadable(monthly)}\u00a0€ par mois, plus une prime de ${formatThirteenthEuroReadable(monthly)}\u00a0€`,
      annualGross: annualWithFullThirteenth(monthly),
    },
    {
      label: `${formatThirteenthEuroReadable(THIRTEENTH_ANNUAL_FIXED_GROSS)}\u00a0€ par an, répartis en treize versements`,
      annualGross: THIRTEENTH_ANNUAL_FIXED_GROSS,
    },
  ];
}
