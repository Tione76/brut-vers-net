/**
 * Données centralisées du guide /epargner-petit-salaire.
 * Taux et plafonds réglementaires : une seule source de vérité pour la page.
 */

export const EPARGNE_SLUG = "epargner-petit-salaire";
export const EPARGNE_PATH = "/epargner-petit-salaire";
export const EPARGNE_BREADCRUMB = "Épargner avec un petit salaire";
export const EPARGNE_NAV_LABEL = "Épargner avec un petit salaire";
export const EPARGNE_CATEGORY_LABEL = "Budget et épargne";

export const EPARGNE_H1 = "Comment épargner avec un petit salaire ?";
export const EPARGNE_SEO_TITLE =
  "Épargner avec un petit salaire : comment faire ?";
export const EPARGNE_META_DESCRIPTION =
  "Découvrez combien mettre de côté avec un petit salaire, comment prévoir vos factures et où garder vos premières économies. Trois exemples chiffrés.";
export const EPARGNE_SUBTITLE =
  "Combien pouvez-vous mettre de côté avec un petit salaire ? Des exemples chiffrés pour trouver une somme adaptée à votre budget et savoir où placer vos premières économies.";

/** Première mise en ligne publique (Europe/Paris). */
export const EPARGNE_PUBLISHED_AT = "2026-11-18T16:00:00+01:00";
/** Dernière modification éditoriale réelle. */
export const EPARGNE_UPDATED_AT = "2026-11-18T16:00:00+01:00";

export const EPARGNE_SOURCES_CHECKED_ON = "2026-11-18";
export const EPARGNE_SOURCES_CHECKED_ON_LABEL = "18 novembre 2026";
export const EPARGNE_RATES_APPLY_FROM_LABEL = "1er août 2026";

/** Taux réglementés vérifiés sur Service-Public (applicables à partir du 1er août 2026). */
export const LIVRET_A_RATE_PERCENT = 1.7;
export const LIVRET_A_RATE_FROM = "2026-08-01";
export const LIVRET_A_RATE_LABEL = "1,7\u00a0%";
export const LIVRET_A_CEILING_EUR = 22950;

export const LDDS_RATE_PERCENT = 1.7;
export const LDDS_RATE_FROM = "2026-08-01";
export const LDDS_RATE_LABEL = "1,7\u00a0%";
export const LDDS_CEILING_EUR = 12000;

export const LEP_RATE_PERCENT = 2.5;
export const LEP_RATE_FROM = "2026-02-01";
export const LEP_RATE_CONFIRMED_THROUGH = "2026-08-01";
export const LEP_RATE_LABEL = "2,5\u00a0%";
export const LEP_CEILING_EUR = 10000;
export const LEP_OPENING_MIN_EUR = 30;
export const LEP_RFR_METROPOLE_1_PART_EUR = 23028;
export const LEP_RFR_METROPOLE_2_PARTS_EUR = 35326;

/** Exemple « garder l'argent économisé » : 12 + 8 + 15 = 35. */
export const MARGIN_SUBSCRIPTION_EUR = 12;
export const MARGIN_PHONE_EUR = 8;
export const MARGIN_AVOIDABLE_EUR = 15;
export const MARGIN_MONTHLY_EUR =
  MARGIN_SUBSCRIPTION_EUR + MARGIN_PHONE_EUR + MARGIN_AVOIDABLE_EUR;
export const MARGIN_TO_LIVRET_EUR = 20;
export const MARGIN_KEEP_ON_ACCOUNT_EUR = 15;
export const MARGIN_ANNUAL_VERSEMENTS_EUR = MARGIN_TO_LIVRET_EUR * 12;

/** Provisions pour factures prévues (exemple fictif). */
export const PROVISION_INSURANCE_ANNUAL_EUR = 240;
export const PROVISION_CAR_ANNUAL_EUR = 180;
export const PROVISION_GIFTS_ANNUAL_EUR = 120;
export const PROVISION_INSURANCE_MONTHLY_EUR = PROVISION_INSURANCE_ANNUAL_EUR / 12;
export const PROVISION_CAR_MONTHLY_EUR = PROVISION_CAR_ANNUAL_EUR / 12;
export const PROVISION_GIFTS_MONTHLY_EUR = PROVISION_GIFTS_ANNUAL_EUR / 12;
export const PROVISION_TOTAL_ANNUAL_EUR =
  PROVISION_INSURANCE_ANNUAL_EUR +
  PROVISION_CAR_ANNUAL_EUR +
  PROVISION_GIFTS_ANNUAL_EUR;
export const PROVISION_TOTAL_MONTHLY_EUR =
  PROVISION_INSURANCE_MONTHLY_EUR +
  PROVISION_CAR_MONTHLY_EUR +
  PROVISION_GIFTS_MONTHLY_EUR;

/** Décompte « combien ce mois-ci » (exemple fictif). */
export const COMBIEN_ON_ACCOUNT_EUR = 45;
export const COMBIEN_GROCERIES_EUR = 25;
export const COMBIEN_KEEP_EUR = 10;
export const COMBIEN_TO_SAVE_EUR =
  COMBIEN_ON_ACCOUNT_EUR - COMBIEN_GROCERIES_EUR - COMBIEN_KEEP_EUR;

/** Repères mensuels / annuels (hors intérêts). */
export const MONTHLY_SAVE_SAMPLES = [10, 20, 50] as const;

/** Cas 1 : 12 + 8 + 10 = 30 ; 20 sur livret, 10 sur le compte. */
export const CASE_1 = {
  title: "Elle met 20 € de côté et garde 10 € sur son compte",
  subscriptionEur: 12,
  phoneEur: 8,
  otherEur: 10,
  otherLabel: "repas livrés moins fréquents",
  toLivretEur: 20,
  keepOnAccountEur: 10,
} as const;
export const CASE_1_SAVED_EUR =
  CASE_1.subscriptionEur + CASE_1.phoneEur + CASE_1.otherEur;
export const CASE_1_ANNUAL_EUR = CASE_1.toLivretEur * 12;

/** Cas 2 : même virement 60 €, fléché 45 + 15. */
export const CASE_2 = {
  title: "Il garde le même virement, mais prépare ses factures à part",
  transferEur: 60,
  billsEur: PROVISION_TOTAL_MONTHLY_EUR,
  emergencyEur: 15,
} as const;

/** Cas 3 : 1320 − 1260 − 40 − 20 = 0. */
export const CASE_3 = {
  title: "Ce mois-ci, il reste 0 € à mettre de côté",
  receivedEur: 1320,
  countedExpensesEur: 1260,
  tripEur: 40,
  healthEur: 20,
} as const;
export const CASE_3_LEFT_EUR =
  CASE_3.receivedEur -
  CASE_3.countedExpensesEur -
  CASE_3.tripEur -
  CASE_3.healthEur;

export function annualFromMonthly(monthly: number): number {
  return monthly * 12;
}

export function formatEpargneEuro(value: number): string {
  const digits = Number.isInteger(value) ? 0 : 2;
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
    .format(value)
    .replace(/\u202f|\u00a0| /g, "\u00a0");
}

export function euro(value: number): string {
  return `${formatEpargneEuro(value)}\u00a0€`;
}

export const EPARGNE_SOURCES = {
  mqdaOrganiser: {
    label: "Comment organiser son épargne ?",
    org: "Mes questions d'argent (Banque de France)",
    href: "https://www.mesquestionsdargent.fr/epargne-et-placements/quelques-notions-depargne-avant-dinvestir/comment-organiser-son-epargne",
  },
  mqdaPrecaution: {
    label: "Une épargne de précaution : pourquoi et comment faire ?",
    org: "Mes questions d'argent (Banque de France)",
    href: "https://www.mesquestionsdargent.fr/epargne-et-placements/epargne-de-precaution",
  },
  mqdaPcb: {
    label: "Point conseil budget",
    org: "Mes questions d'argent (Banque de France)",
    href: "https://www.mesquestionsdargent.fr/intervenants-sociaux-et-pcb/point-conseil-budget",
  },
  mqdaPcbCarte: {
    label: "Carte interactive des points conseil budget (PCB)",
    org: "Mes questions d'argent (Banque de France)",
    href: "https://www.mesquestionsdargent.fr/budget/se-faire-aider/carte-interactive-des-points-conseil-budget-pcb",
  },
  servicePublicLep: {
    label: "Livret d'épargne populaire (LEP)",
    org: "Service-Public",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2367",
  },
  servicePublicLivretA: {
    label: "Livret A",
    org: "Service-Public",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2365",
  },
  servicePublicLdds: {
    label: "Livret de développement durable et solidaire (LDDS)",
    org: "Service-Public",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2368",
  },
  servicePublicTauxAout2026: {
    label: "Livret A et LEP : évolution des taux à compter du 1er août 2026",
    org: "Service-Public",
    href: "https://www.service-public.gouv.fr/particuliers/actualites/A18000",
  },
  servicePublicLivretsCompare: {
    label: "Comptes et livrets d'épargne : quelles différences ?",
    org: "Service-Public",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F34393",
  },
  servicePublicPrimeActivite: {
    label: "Prime d'activité",
    org: "Service-Public",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2882",
  },
  servicePublicSurendettement: {
    label: "Surendettement : que faire ?",
    org: "Service-Public",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F16994",
  },
  servicePublicRemboursementAnticipe: {
    label: "Crédit à la consommation : règles du contrat (remboursement anticipé)",
    org: "Service-Public",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2451",
  },
  banqueFranceParticuliers: {
    label: "Particuliers : orientation et accompagnement",
    org: "Banque de France",
    href: "https://www.banque-france.fr/fr/a-votre-service/particuliers",
  },
  banqueFranceDifficultes: {
    label: "Faire face à des difficultés financières ou à des dettes",
    org: "Banque de France",
    href: "https://www.banque-france.fr/fr/a-votre-service/particuliers/faire-face-difficultes-financieres-ou-dettes",
  },
  servicePublicChequeEnergie: {
    label: "Savoir si on a droit au chèque énergie",
    org: "Service-Public",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/R59559",
  },
  servicePublicC2s: {
    label: "Estimer ses droits à la complémentaire santé solidaire",
    org: "Service-Public",
    href: "https://www.service-public.gouv.fr/particuliers/vosdroits/R13558",
  },
  annuairePcb: {
    label: "Annuaire des Points conseil budget",
    org: "Service-Public",
    href: "https://lannuaire.service-public.gouv.fr/navigation/pcb",
  },
} as const;
