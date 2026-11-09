import type { ActuArticle } from "../types";
import { ACTU_COVERS } from "../covers";

/**
 * Annonce gouvernementale du 9 novembre 2026.
 * Chiffres propres à l'événement, indépendants de SMIC_CURRENT.
 */
export const HAUSSE_SMIC_DECEMBRE_2026_FACTS = {
  announcedOnLabel: "9 novembre 2026",
  announcedIncreasePercentLabel: "1,6 %",
  effectiveFromLabel: "1er décembre 2026",
  announcedNetMonthlyLabel: "1 502 €",
  announcedNetGainApproxLabel: "24 €",
  currentHourlyGrossLabel: "12,31 €",
  currentMonthlyGrossLabel: "1 867,02 €",
  currentNetMonthlyIndicativeLabel: "1 477,93 €",
  currentEffectiveFromLabel: "1er juin 2026",
  previousIncreasePercentLabel: "2,41 %",
  conferenceLabel: "conférence sociale",
  conferencePlaceLabel: "Matignon",
  officialAnnouncementHref:
    "https://www.info.gouv.fr/actualite/conference-sociale-hausse-du-smic-de-1-6",
  juneRevaluationHref:
    "https://www.info.gouv.fr/actualite/le-smic-revalorise-le-1er-juin-2026",
  lcpAnnouncementHref:
    "https://lcp.fr/actualites/smic-a-1502-euros-prime-carburant-les-annonces-du-gouvernement-sur-le-pouvoir-d-achat",
  publicSenatSyndicatsHref:
    "https://www.publicsenat.fr/actualites/politique/hausse-du-smic-les-syndicats-jugent-la-reponse-insuffisante-et-la-cgt-appelle-a-la-greve-le-17-novembre",
  verifiedOnLabel: "9 novembre 2026",
  smicHoursGuideHref: "/smic-selon-nombre-heures",
  partTimeGuideHref: "/salaire-temps-partiel",
} as const;

export const hausseSmicDecembre2026Article: ActuArticle = {
  slug: "hausse-smic-decembre-2026",
  status: "published",
  title: "SMIC : une hausse de 1,6 % annoncée pour le 1er décembre",
  seoTitle: "SMIC : hausse de 1,6 % annoncée pour le 1er décembre 2026",
  description:
    "Le gouvernement annonce une hausse du SMIC de 1,6 % au 1er décembre 2026. Montant net annoncé, salariés concernés et conséquences sur la paie.",
  subtitle:
    "Le SMIC doit augmenter de 1,6 % au 1er décembre 2026, a annoncé le gouvernement à l'issue de la conférence sociale du 9 novembre. Pour un temps plein, le montant net annoncé atteint 1 502 € par mois, soit environ 24 € de plus qu'actuellement. La hausse concernera les rémunérations devenues inférieures au nouveau minimum.",
  shortTitle: "Hausse du SMIC en décembre 2026",
  excerpt:
    "Le gouvernement annonce une hausse du SMIC de 1,6 % au 1er décembre 2026. Net annoncé à 1 502 € pour un temps plein, soit environ 24 € de plus qu'aujourd'hui.",
  /** Première publication prévue (article pas encore déployé). */
  publishedAt: "2026-11-09T15:56:07+01:00",
  modifiedAt: "2026-11-09T15:56:07+01:00",
  authorName: "Antoine",
  category: "Actualités",
  cover: ACTU_COVERS["hausse-smic-decembre-2026"],
  readingTimeMinutes: 4,
  sources: [
    {
      title: "Conférence sociale : hausse du SMIC de 1,6 %",
      publisher: "info.gouv.fr",
      href: "https://www.info.gouv.fr/actualite/conference-sociale-hausse-du-smic-de-1-6",
      dateLabel: "9 novembre 2026",
    },
    {
      title:
        "Smic à 1.502 euros, prime carburant… : les annonces du gouvernement sur le pouvoir d'achat",
      publisher: "LCP",
      href: "https://lcp.fr/actualites/smic-a-1502-euros-prime-carburant-les-annonces-du-gouvernement-sur-le-pouvoir-d-achat",
      dateLabel: "9 novembre 2026",
    },
    {
      title:
        "Hausse du Smic : les syndicats jugent la réponse insuffisante et la CGT appelle à la grève le 17 novembre",
      publisher: "Public Sénat",
      href: "https://www.publicsenat.fr/actualites/politique/hausse-du-smic-les-syndicats-jugent-la-reponse-insuffisante-et-la-cgt-appelle-a-la-greve-le-17-novembre",
      dateLabel: "9 novembre 2026",
    },
    {
      title: "Le SMIC revalorisé le 1er juin 2026",
      publisher: "info.gouv.fr",
      href: "https://www.info.gouv.fr/actualite/le-smic-revalorise-le-1er-juin-2026",
      dateLabel: "18 mai 2026",
    },
  ],
};
