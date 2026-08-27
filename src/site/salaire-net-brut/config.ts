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

/** Hub de la série (navigation / catalogue). */
export const NET_TO_GROSS_HUB_PATH = "/salaire-net-mensuel-en-brut";

/** Libellé court du Hub dans les breadcrumbs (fiches / index / Schema). */
export const NET_TO_GROSS_HUB_BREADCRUMB_LABEL = "Salaire net en brut";

/** Page index / tableau de la série. */
export const NET_TO_GROSS_INDEX_PATH = "/tableau-salaire-net-mensuel-en-brut";

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

/** Centaines historiques toujours publiées (1 500 → 6 000, pas de 100). */
const NET_TO_GROSS_HUNDREDS: readonly number[] = Array.from(
  { length: 46 },
  (_, index) => 1500 + index * 100,
);

function tenEuroBatch(from: number, to: number): number[] {
  return Array.from({ length: (to - from) / 10 + 1 }, (_, index) => from + index * 10).filter(
    (amount) => amount % 100 !== 0,
  );
}

/**
 * Lots d'intermédiaires (pas de 10 €) déjà publiés.
 * Vague 1 : 1 510 → 1 990
 * Vague 2 : 2 010 → 2 490
 * Vague 3 : 2 510 → 2 990
 * Vague 4 : 3 010 → 3 490
 */
const NET_TO_GROSS_PUBLISHED_TEN_EURO_BATCHES: readonly number[] = [
  ...tenEuroBatch(1510, 1990),
  ...tenEuroBatch(2010, 2490),
  ...tenEuroBatch(2510, 2990),
  ...tenEuroBatch(3010, 3490),
];

/**
 * Montants publiés (SSG + sitemap + Hub + Index + Nearby public).
 * Ajouter un montant ici suffit à générer la page.
 */
export const NET_TO_GROSS_AMOUNTS: readonly number[] = [
  ...new Set([...NET_TO_GROSS_HUNDREDS, ...NET_TO_GROSS_PUBLISHED_TEN_EURO_BATCHES]),
].sort((a, b) => a - b);

/** Alias explicite : seuls ces montants sont publics. */
export const PUBLISHED_NET_TO_GROSS_AMOUNTS = NET_TO_GROSS_AMOUNTS;

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
