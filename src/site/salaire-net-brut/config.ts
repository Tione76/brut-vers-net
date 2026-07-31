import type { EmploymentProfile } from "@/site/salary-calculator/types";

/**
 * URL publique de la série :
 * /combien-gagner-brut-mensuel-pour-{montant}-net
 * (rewrite vers /net-vers-brut/[montant])
 */
export const NET_TO_GROSS_PATH_PREFIX = "/combien-gagner-brut-mensuel-pour-";
export const NET_TO_GROSS_PATH_SUFFIX = "-net";

/** Alias historique de la page modèle 1 500 €. */
export const NET_TO_GROSS_PATH_1500 = "/combien-gagner-brut-mensuel-pour-1500-net";

/** Route App Router interne (génération statique). */
export const NET_TO_GROSS_INTERNAL_BASE_PATH = "/net-vers-brut";

/** Ancien préfixe (redirections permanentes). */
export const NET_TO_GROSS_LEGACY_BASE_PATH = "/salaire-net-brut";

/** Ancien format d'URL publique (redirections). */
export const NET_TO_GROSS_LEGACY_PUBLIC_PREFIX = "/combien-gagner-brut-pour-";

/** Profil par défaut des estimations mises en avant. */
export const NET_TO_GROSS_DEFAULT_PROFILE: EmploymentProfile = "nonExecutive";

/** Profils affichés dans le bloc réponse et le tableau. */
export const NET_TO_GROSS_PROFILES: readonly EmploymentProfile[] = [
  "nonExecutive",
  "executive",
  "publicService",
] as const;

/** Nombre de mois pour l'équivalent annuel affiché. */
export const NET_TO_GROSS_SALARY_MONTHS = 12;

/**
 * Série complète : 1 500 € à 3 000 € nets, par pas de 100 €.
 * Ajouter un montant ici suffit à générer la page correspondante.
 */
export const NET_TO_GROSS_AMOUNTS = [
  1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900,
  3000,
] as const;

export type NetToGrossAmount = (typeof NET_TO_GROSS_AMOUNTS)[number];

export function isNetToGrossAmount(value: number): value is NetToGrossAmount {
  return (NET_TO_GROSS_AMOUNTS as readonly number[]).includes(value);
}

export function netToGrossPath(netMonthly: number): string {
  return `${NET_TO_GROSS_PATH_PREFIX}${netMonthly}${NET_TO_GROSS_PATH_SUFFIX}`;
}

export function parseNetToGrossMontantParam(raw: string): number | null {
  if (!/^\d+$/.test(raw)) {
    return null;
  }
  const value = Number(raw);
  return isNetToGrossAmount(value) ? value : null;
}

/** Date de révision éditoriale (alignée sur les coefficients du simulateur). */
export const NET_TO_GROSS_UPDATED_AT = "2026-07-15";

/** Paramètre URL du calculateur principal pour préremplir le brut mensuel. */
export const CALCULATOR_GROSS_QUERY_PARAM = "brut";

export function buildCalculatorPrefillHref(grossMonthly: number): string {
  const amount = Number.isFinite(grossMonthly) ? Math.round(grossMonthly * 100) / 100 : 0;
  return `/?${CALCULATOR_GROSS_QUERY_PARAM}=${encodeURIComponent(String(amount))}`;
}
