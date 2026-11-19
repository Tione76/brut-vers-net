/**
 * Ancien stockage de la CMP maison (version 1).
 * Conservé uniquement pour invalidation : ne plus lire ni convertir en consentement Google/TCF.
 */
export const CONSENT_STORAGE_KEY = "cookie-consent-preferences";

/** @deprecated Ne plus utiliser pour appliquer un consentement. */
export const CONSENT_LEGACY_VERSION = 1;

/**
 * Supprime les choix locaux de la bannière maison.
 * Un ancien « Accepter et fermer » ne doit jamais devenir un consentement TCF/Google.
 */
export function clearLegacyConsentPreferences(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/** True si une entrée legacy est encore présente (avant purge). */
export function hasLegacyConsentRecord(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}
