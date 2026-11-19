import type { ConsentPreferences } from "@/framework/types";

/** Identifiants Sirdata ABconsent (configuration z5brz / partenaire 55742). */
export const SIRDATA_PARTNER_ID = "55742";
export const SIRDATA_CONFIG_ID = "z5brz";
/** CMP enregistrée IAB Europe (Sirdata ABconsent). */
export const SIRDATA_CMP_ID = 92;

export const SIRDATA_STUB_SRC = `https://cache.consentframework.com/js/pa/${SIRDATA_PARTNER_ID}/c/${SIRDATA_CONFIG_ID}/stub`;
export const SIRDATA_CMP_SRC = `https://choices.consentframework.com/js/pa/${SIRDATA_PARTNER_ID}/c/${SIRDATA_CONFIG_ID}/cmp`;

/** Lien synchrone attendu par Sirdata pour le mode « Gérer dans le footer ». */
export const SIRDATA_DISPLAY_UI_HREF = "javascript:window.Sddan.cmp.displayUI();";

type SirdataCmpApi = {
  displayUI?: () => void;
};

type SirdataNamespace = {
  cmp?: SirdataCmpApi;
};

declare global {
  interface Window {
    Sddan?: SirdataNamespace;
    __tcfapi?: (
      command: string,
      version: number,
      callback: (...args: unknown[]) => void,
      ...rest: unknown[]
    ) => void;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function asConsentRecord(value: unknown): Record<string, string> | null {
  if (!value || typeof value !== "object") return null;
  return value as Record<string, string>;
}

/**
 * Lit le dernier `gtag('consent','update', …)` écrit dans dataLayer
 * (émis par Sirdata / Consent Mode). Ne réécrit pas les signaux.
 */
export function readLatestConsentModeUpdate(): Record<string, string> | null {
  const layer = window.dataLayer;
  if (!Array.isArray(layer)) return null;

  let latest: Record<string, string> | null = null;
  for (const entry of layer) {
    if (!entry) continue;

    // Format Arguments / tableau : ['consent','update', {…}]
    if (typeof entry === "object" && "0" in (entry as object)) {
      const row = entry as { 0?: unknown; 1?: unknown; 2?: unknown };
      if (row[0] === "consent" && row[1] === "update") {
        const rec = asConsentRecord(row[2]);
        if (rec) latest = rec;
      }
      continue;
    }

    if (Array.isArray(entry) && entry[0] === "consent" && entry[1] === "update") {
      const rec = asConsentRecord(entry[2]);
      if (rec) latest = rec;
    }
  }
  return latest;
}

export function preferencesFromConsentModeUpdate(
  update: Record<string, string>,
): ConsentPreferences {
  return {
    necessary: true,
    analytics: update.analytics_storage === "granted",
    advertising: update.ad_storage === "granted",
    timestamp: Date.now(),
  };
}

/**
 * Préférences site à partir des signaux Consent Mode déjà émis par Sirdata.
 * Retourne null s'il n'y a pas encore d'`update` (seul le default denied).
 */
export function readSirdataConsentPreferences(): ConsentPreferences | null {
  const update = readLatestConsentModeUpdate();
  if (!update) return null;
  if (
    typeof update.analytics_storage !== "string" &&
    typeof update.ad_storage !== "string"
  ) {
    return null;
  }
  return preferencesFromConsentModeUpdate(update);
}

/** Rouvre l'UI Sirdata (file d'attente courte si le script async n'est pas prêt). */
export function showSirdataCmpUI(): void {
  const run = () => {
    window.Sddan?.cmp?.displayUI?.();
  };
  if (typeof window.Sddan?.cmp?.displayUI === "function") {
    run();
    return;
  }
  let attempts = 0;
  const id = window.setInterval(() => {
    attempts += 1;
    if (typeof window.Sddan?.cmp?.displayUI === "function") {
      window.clearInterval(id);
      run();
      return;
    }
    if (attempts >= 50) window.clearInterval(id);
  }, 100);
}

export function whenTcfApiReady(fn: () => void): void {
  if (typeof window.__tcfapi === "function") {
    fn();
    return;
  }
  let attempts = 0;
  const id = window.setInterval(() => {
    attempts += 1;
    if (typeof window.__tcfapi === "function") {
      window.clearInterval(id);
      fn();
      return;
    }
    if (attempts >= 50) window.clearInterval(id);
  }, 100);
}
