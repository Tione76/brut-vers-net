import { NET_TO_GROSS_AMOUNTS, isNetToGrossAmount } from "./config";

/** Exception intentionnelle : 1 650 € est déjà refondu malgré le pas impair. */
export const REDESIGN_WAVE1_EXCEPTION_NET = 1650 as const;

/** Dernier montant pair (pas de 20 € depuis 1 500 €) inclus dans la vague 1. */
export const REDESIGN_WAVE1_EVEN_MAX = 5980 as const;

/** 6 000 € reste témoin pour conserver exactement 225 fiches de contrôle. */
export const CONTROL_ENDPOINT_NET = 6000 as const;

/**
 * Date historique de première publication de la série.
 * Ne pas aligner sur la date de build.
 */
export const REDESIGN_DATE_PUBLISHED = "2026-07-15";

/**
 * Date réelle de la vague 1 (identique à la mise en ligne de 1 650 €).
 * À ajuster uniquement si la publication a lieu un autre jour.
 */
export const REDESIGN_WAVE1_DATE_MODIFIED = "2026-10-09";

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

/** Fiches qui reçoivent le modèle validé 1 650 €. */
export function isNetToGrossRedesign(netMonthly: number): boolean {
  return isRedesignWave1EvenAmount(netMonthly) || netMonthly === REDESIGN_WAVE1_EXCEPTION_NET;
}

export function getRedesignWave1Amounts(): number[] {
  return NET_TO_GROSS_AMOUNTS.filter(isNetToGrossRedesign);
}

export function getControlWave1Amounts(): number[] {
  return NET_TO_GROSS_AMOUNTS.filter((amount) => !isNetToGrossRedesign(amount));
}
