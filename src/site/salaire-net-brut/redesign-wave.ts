import { NET_TO_GROSS_AMOUNTS, isNetToGrossAmount } from "./config";

/** Exception intentionnelle de la vague 1 : 1 650 € déjà refondu malgré le pas impair. */
export const REDESIGN_WAVE1_EXCEPTION_NET = 1650 as const;

/** Dernier montant pair (pas de 20 € depuis 1 500 €) inclus dans la vague 1. */
export const REDESIGN_WAVE1_EVEN_MAX = 5980 as const;

/**
 * Ancien montant terminal du groupe témoin (vague 1).
 * Conservé pour documentation et tests d'historique ; la vague 2 l'inclut désormais.
 */
export const CONTROL_ENDPOINT_NET = 6000 as const;

/**
 * Date historique de première publication de la série.
 * Ne pas aligner sur la date de build.
 */
export const REDESIGN_DATE_PUBLISHED = "2026-07-15";

/**
 * Date réelle de la vague 1 (identique à la mise en ligne de 1 650 €).
 * Ne pas réécrire pour les 226 fiches déjà modernisées.
 */
export const REDESIGN_WAVE1_DATE_MODIFIED = "2026-10-09";

/**
 * Date de modification de contenu de la vague 2 (préparation locale).
 * À ajuster uniquement si la publication effective a lieu un autre jour.
 */
export const REDESIGN_WAVE2_DATE_MODIFIED = "2026-10-24";

/**
 * Montants pairs 1 500, 1 520, … 5 980 (hors 6 000).
 * 1 650 € n'appartient pas à cette suite : il est ajouté à part.
 */
export function isRedesignWave1EvenAmount(netMonthly: number): boolean {
  return (
    isNetToGrossAmount(netMonthly) &&
    netMonthly >= 1500 &&
    netMonthly <= REDESIGN_WAVE1_EVEN_MAX &&
    (netMonthly - 1500) % 20 === 0
  );
}

/** Fiches modernisées lors de la vague 1 (226). */
export function isRedesignWave1Amount(netMonthly: number): boolean {
  return isRedesignWave1EvenAmount(netMonthly) || netMonthly === REDESIGN_WAVE1_EXCEPTION_NET;
}

/**
 * Fiches qui reçoivent le modèle validé 1 650 €.
 * Vague 2 : toute la série publiée (`NET_TO_GROSS_AMOUNTS`).
 */
export function isNetToGrossRedesign(netMonthly: number): boolean {
  return isNetToGrossAmount(netMonthly);
}

export function getRedesignWave1Amounts(): number[] {
  return NET_TO_GROSS_AMOUNTS.filter(isRedesignWave1Amount);
}

/** Montants de la vague 2 (= ancien groupe témoin de la vague 1). */
export function getRedesignWave2Amounts(): number[] {
  return NET_TO_GROSS_AMOUNTS.filter((amount) => !isRedesignWave1Amount(amount));
}

/**
 * Groupe témoin restant.
 * Après la vague 2 : vide (toutes les fiches sont au modèle refondu).
 */
export function getControlWave1Amounts(): number[] {
  return NET_TO_GROSS_AMOUNTS.filter((amount) => !isNetToGrossRedesign(amount));
}

/** `dateModified` calendaire selon la vague d'appartenance. */
export function getNetToGrossRedesignDateModified(netMonthly: number): string {
  return isRedesignWave1Amount(netMonthly)
    ? REDESIGN_WAVE1_DATE_MODIFIED
    : REDESIGN_WAVE2_DATE_MODIFIED;
}
