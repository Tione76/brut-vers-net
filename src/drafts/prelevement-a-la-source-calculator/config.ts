export const PAS_DISCLAIMER =
  "Cette simulation fournit une estimation générale. Le montant réel dépend de votre taux fiscal, de votre net imposable et de votre situation personnelle. Ce calculateur ne remplace pas votre fiche de paie ni l'espace impots.gouv.fr.";

export const PAS_CALCULATOR_ID = "prelevement-a-la-source";

/** Ancienne URL publique : désactivée (brouillon dans src/drafts). */
export const PAS_PATH = "/calculateurs/prelevement-a-la-source";

/**
 * Base annuelle fixe propre au calculateur PAS uniquement.
 * Ne pas réutiliser pour Brut→Net / Augmentation.
 */
export const PAS_MONTHS_PER_YEAR = 12 as const;

/** Temps plein implicite : le salaire saisi est déjà celui effectivement perçu. */
export const PAS_FULL_TIME_PERCENT = 100 as const;
