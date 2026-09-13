/**
 * Source de vérité : /salaire-alternance
 *
 * Montants d'apprentissage : grille Service-Public (fiche contrat d'apprentissage),
 * adossée au SMIC en vigueur (module `@/site/smic/data`).
 *
 * Ne jamais inventer de net, ni appliquer les exonérations d'apprentissage
 * au contrat de professionnalisation.
 */

import {
  SMIC_CURRENT,
  SMIC_EFFECTIVE_FROM,
  SMIC_EFFECTIVE_FROM_LABEL,
} from "@/site/smic/data";

export const ALTERNANCE_EDITORIAL_YEAR = 2026;

export const ALTERNANCE_PUBLISHED_AT = "2026-09-13";
export const ALTERNANCE_UPDATED_AT = "2026-09-13";
export const ALTERNANCE_UPDATED_AT_LABEL = "13 septembre 2026";

export const ALTERNANCE_SOURCES_VERIFIED_AT = "2026-09-13";
export const ALTERNANCE_SOURCES_VERIFIED_AT_LABEL = "13 septembre 2026";

export const ALTERNANCE_SMIC_MONTHLY_GROSS = SMIC_CURRENT.monthlyGross;
export const ALTERNANCE_SMIC_HOURLY_GROSS = SMIC_CURRENT.hourlyGross;
export const ALTERNANCE_SMIC_EFFECTIVE_FROM = SMIC_EFFECTIVE_FROM;
export const ALTERNANCE_SMIC_EFFECTIVE_FROM_LABEL = SMIC_EFFECTIVE_FROM_LABEL;

export const ALTERNANCE_SEO_TITLE =
  "Salaire en alternance : combien gagne un apprenti ou un alternant ?";

export const ALTERNANCE_H1 = `Salaire en alternance ${ALTERNANCE_EDITORIAL_YEAR} : combien gagne un apprenti ou un alternant ?`;

export const ALTERNANCE_META_DESCRIPTION =
  "Salaire en alternance : comparez les minima d'apprentissage et de professionnalisation selon l'âge, l'année de contrat et le SMIC en vigueur.";

export const ALTERNANCE_AMOUNTS_BLOCK_TITLE = `Le salaire d'un apprenti en ${ALTERNANCE_EDITORIAL_YEAR}`;

export const ALTERNANCE_FRESHNESS_LINE = `Barèmes applicables au ${ALTERNANCE_UPDATED_AT_LABEL} (SMIC en vigueur depuis le ${ALTERNANCE_SMIC_EFFECTIVE_FROM_LABEL}). Page mise à jour le ${ALTERNANCE_UPDATED_AT_LABEL}.`;

/** Contrats d'apprentissage conclus depuis le 1er mars 2025 : exonération cotisations salariales jusqu'à 50 % du SMIC. */
export const APPRENTICESHIP_EXEMPTION_RATE_SINCE_2025_03 = 0.5;
export const APPRENTICESHIP_EXEMPTION_THRESHOLD_GROSS =
  Math.round(ALTERNANCE_SMIC_MONTHLY_GROSS * APPRENTICESHIP_EXEMPTION_RATE_SINCE_2025_03 * 100) /
  100;

/** Contrats conclus au plus tard le 28 février 2025 : seuil historique 79 % du SMIC. */
export const APPRENTICESHIP_EXEMPTION_RATE_BEFORE_2025_03 = 0.79;
/** Montant affiché par Service-Public pour le seuil 79 % (arrondi officiel). */
export const APPRENTICESHIP_EXEMPTION_THRESHOLD_BEFORE_2025_03_GROSS = 1475;

/**
 * Limite d'exonération IR apprentis pour les revenus 2025 (déclaration 2026) :
 * SMIC annuel publié par Service-Public / impots.gouv.
 */
export const APPRENTICESHIP_INCOME_TAX_EXEMPTION_LIMIT_2025 = 21622;

/** Majoration réglementaire : +15 points du pourcentage (pas +15 %). */
export const APPRENTICESHIP_SHORT_CONTRACT_RATE_BONUS_POINTS = 15;

export type ApprenticeshipYear = 1 | 2 | 3;
export type ApprenticeshipAgeBand = "16-17" | "18-20" | "21-25" | "26+";

export const APPRENTICESHIP_RATES: Record<
  ApprenticeshipYear,
  Record<ApprenticeshipAgeBand, number>
> = {
  1: { "16-17": 27, "18-20": 43, "21-25": 53, "26+": 100 },
  2: { "16-17": 39, "18-20": 51, "21-25": 61, "26+": 100 },
  3: { "16-17": 55, "18-20": 67, "21-25": 78, "26+": 100 },
};

/**
 * Montants bruts mensuels minimums affichés par Service-Public
 * (fiche contrat d'apprentissage, vérifiée le 13 septembre 2026),
 * avec SMIC mensuel brut 1 867,02 €.
 */
export const APPRENTICESHIP_AMOUNTS: Record<
  ApprenticeshipYear,
  Record<ApprenticeshipAgeBand, number>
> = {
  1: { "16-17": 504.09, "18-20": 802.82, "21-25": 989.52, "26+": 1867.02 },
  2: { "16-17": 728.14, "18-20": 952.18, "21-25": 1138.88, "26+": 1867.02 },
  3: { "16-17": 1026.86, "18-20": 1250.9, "21-25": 1456.27, "26+": 1867.02 },
};

export const APPRENTICESHIP_AGE_BAND_LABELS: Record<ApprenticeshipAgeBand, string> = {
  "16-17": "16 à 17 ans",
  "18-20": "18 à 20 ans",
  "21-25": "21 à 25 ans",
  "26+": "26 ans et plus",
};

export const APPRENTICESHIP_YEAR_LABELS: Record<ApprenticeshipYear, string> = {
  1: "1re année",
  2: "2e année",
  3: "3e année",
};

export type ProfessionnalisationAgeBand = "under-21" | "21-25" | "26+";
export type ProfessionnalisationQualification = "below-bac-pro" | "bac-pro-or-equivalent";

export const PROFESSIONNALISATION_RATES: Record<
  ProfessionnalisationAgeBand,
  Record<ProfessionnalisationQualification, number | null>
> = {
  "under-21": {
    "below-bac-pro": 55,
    "bac-pro-or-equivalent": 65,
  },
  "21-25": {
    "below-bac-pro": 70,
    "bac-pro-or-equivalent": 80,
  },
  "26+": {
    "below-bac-pro": 100,
    "bac-pro-or-equivalent": 100,
  },
};

/**
 * Montants bruts mensuels minimums Service-Public (fiche contrat de professionnalisation).
 * À 26 ans et plus : SMIC, ou 85 % du salaire minimum conventionnel si plus favorable.
 */
export const PROFESSIONNALISATION_AMOUNTS: Record<
  ProfessionnalisationAgeBand,
  Record<ProfessionnalisationQualification, { rateLabel: string; amount: number }>
> = {
  "under-21": {
    "below-bac-pro": { rateLabel: "55 % du SMIC", amount: 1026.86 },
    "bac-pro-or-equivalent": { rateLabel: "65 % du SMIC", amount: 1213.57 },
  },
  "21-25": {
    "below-bac-pro": { rateLabel: "70 % du SMIC", amount: 1306.92 },
    "bac-pro-or-equivalent": { rateLabel: "80 % du SMIC", amount: 1493.62 },
  },
  "26+": {
    "below-bac-pro": {
      rateLabel: "100 % du SMIC (ou 85 % du SMC si plus favorable)",
      amount: 1867.02,
    },
    "bac-pro-or-equivalent": {
      rateLabel: "100 % du SMIC (ou 85 % du SMC si plus favorable)",
      amount: 1867.02,
    },
  },
};

export const ALTERNANCE_SOURCES = {
  servicePublicApprentissage: {
    label: "Contrat d'apprentissage",
    org: "Service-Public.fr",
    href: "https://www.service-public.fr/particuliers/vosdroits/F2918",
  },
  servicePublicProfessionnalisation: {
    label: "Contrat de professionnalisation",
    org: "Service-Public.fr",
    href: "https://www.service-public.fr/particuliers/vosdroits/F15478",
  },
  ministereApprentissage: {
    label: "Le contrat d'apprentissage",
    org: "Ministère du Travail",
    href: "https://travail-emploi.gouv.fr/le-contrat-dapprentissage",
  },
  ministereFaqAlternance: {
    label: "Questions-réponses : la formation en alternance",
    org: "Ministère du Travail",
    href: "https://travail-emploi.gouv.fr/questions-reponses-la-formation-en-alternance",
  },
  urssafApprentissage: {
    label: "Embaucher un alternant en contrat d'apprentissage",
    org: "URSSAF",
    href: "https://www.urssaf.fr/accueil/employeur/embaucher-gerer-salaries/embaucher/contrat-apprentissage.html",
  },
  servicePublicImpotApprenti: {
    label: "Impôt sur le revenu : comment est imposé le salaire d'un apprenti ?",
    org: "Service-Public.fr",
    href: "https://www.service-public.fr/particuliers/vosdroits/F11249",
  },
  smicPage: {
    label: "SMIC : montants actuellement applicables",
    org: "Brut vers Net",
    href: "/smic",
  },
} as const;

function formatEuro(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace(/\u202f|\u00a0| /g, "\u00a0");
}

export function formatAlternanceEuro(value: number): string {
  return `${formatEuro(value)}\u00a0€`;
}

/** Arrondi monétaire à 2 décimales (contrôle de cohérence avec les montants officiels). */
export function roundAlternanceEuro(value: number): number {
  return Math.round(value * 100) / 100;
}

export function computeApprenticeshipAmountFromRate(ratePercent: number): number {
  return roundAlternanceEuro((ALTERNANCE_SMIC_MONTHLY_GROSS * ratePercent) / 100);
}

export const ALTERNANCE_LABELS = {
  smicMonthly: formatAlternanceEuro(ALTERNANCE_SMIC_MONTHLY_GROSS),
  smicHourly: formatAlternanceEuro(ALTERNANCE_SMIC_HOURLY_GROSS),
  exemptionThreshold: formatAlternanceEuro(APPRENTICESHIP_EXEMPTION_THRESHOLD_GROSS),
  exemptionThresholdBefore2025: formatAlternanceEuro(
    APPRENTICESHIP_EXEMPTION_THRESHOLD_BEFORE_2025_03_GROSS,
  ),
  incomeTaxLimit2025: formatAlternanceEuro(APPRENTICESHIP_INCOME_TAX_EXEMPTION_LIMIT_2025),
  y1_16: formatAlternanceEuro(APPRENTICESHIP_AMOUNTS[1]["16-17"]),
  y1_18: formatAlternanceEuro(APPRENTICESHIP_AMOUNTS[1]["18-20"]),
  y1_21: formatAlternanceEuro(APPRENTICESHIP_AMOUNTS[1]["21-25"]),
  y1_26: formatAlternanceEuro(APPRENTICESHIP_AMOUNTS[1]["26+"]),
  y2_16: formatAlternanceEuro(APPRENTICESHIP_AMOUNTS[2]["16-17"]),
  y2_18: formatAlternanceEuro(APPRENTICESHIP_AMOUNTS[2]["18-20"]),
  y2_21: formatAlternanceEuro(APPRENTICESHIP_AMOUNTS[2]["21-25"]),
  y2_26: formatAlternanceEuro(APPRENTICESHIP_AMOUNTS[2]["26+"]),
  y3_16: formatAlternanceEuro(APPRENTICESHIP_AMOUNTS[3]["16-17"]),
  y3_18: formatAlternanceEuro(APPRENTICESHIP_AMOUNTS[3]["18-20"]),
  y3_21: formatAlternanceEuro(APPRENTICESHIP_AMOUNTS[3]["21-25"]),
  y3_26: formatAlternanceEuro(APPRENTICESHIP_AMOUNTS[3]["26+"]),
  proUnder21Base: formatAlternanceEuro(
    PROFESSIONNALISATION_AMOUNTS["under-21"]["below-bac-pro"].amount,
  ),
  proUnder21Bac: formatAlternanceEuro(
    PROFESSIONNALISATION_AMOUNTS["under-21"]["bac-pro-or-equivalent"].amount,
  ),
  pro2125Base: formatAlternanceEuro(
    PROFESSIONNALISATION_AMOUNTS["21-25"]["below-bac-pro"].amount,
  ),
  pro2125Bac: formatAlternanceEuro(
    PROFESSIONNALISATION_AMOUNTS["21-25"]["bac-pro-or-equivalent"].amount,
  ),
  pro26: formatAlternanceEuro(PROFESSIONNALISATION_AMOUNTS["26+"]["below-bac-pro"].amount),
} as const;

export type ApprenticeshipAgeBandCard = {
  band: ApprenticeshipAgeBand;
  title: string;
  details: string[];
  description?: string;
};

/** Cartes verticales du résumé apprentissage (âge → années). */
export function getApprenticeshipAgeBandCards(): ApprenticeshipAgeBandCard[] {
  const years: ApprenticeshipYear[] = [1, 2, 3];
  const bands: ApprenticeshipAgeBand[] = ["16-17", "18-20", "21-25", "26+"];

  return bands.map((band) => {
    const title = APPRENTICESHIP_AGE_BAND_LABELS[band];
    if (band === "26+") {
      return {
        band,
        title,
        details: [
          `Minimum : 100\u00a0% du SMIC · ${formatAlternanceEuro(APPRENTICESHIP_AMOUNTS[1]["26+"])}`,
        ],
        description: "Ou salaire minimum conventionnel si plus favorable.",
      };
    }

    const details = years.map((year) => {
      const rate = APPRENTICESHIP_RATES[year][band];
      const amount = formatAlternanceEuro(APPRENTICESHIP_AMOUNTS[year][band]);
      return `${APPRENTICESHIP_YEAR_LABELS[year]} : ${rate}\u00a0% · ${amount}`;
    });

    return {
      band,
      title,
      details,
      description:
        band === "21-25"
          ? "Ou même pourcentage du minimum conventionnel si plus favorable."
          : undefined,
    };
  });
}

/** Lignes du tableau principal apprentissage (âge × année). */
export function getApprenticeshipTableRows(): string[][] {
  const bands: ApprenticeshipAgeBand[] = ["16-17", "18-20", "21-25", "26+"];
  return bands.map((band) => {
    const label = APPRENTICESHIP_AGE_BAND_LABELS[band];
    const cell = (year: ApprenticeshipYear) => {
      const rate = APPRENTICESHIP_RATES[year][band];
      const amount = formatAlternanceEuro(APPRENTICESHIP_AMOUNTS[year][band]);
      if (band === "21-25" || band === "26+") {
        return `${rate}\u00a0% · ${amount}*`;
      }
      return `${rate}\u00a0% · ${amount}`;
    };
    return [label, cell(1), cell(2), cell(3)];
  });
}
