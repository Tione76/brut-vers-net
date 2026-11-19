import type { ConsentPreferences } from "@/framework/types";

/** Statuts documentés par googlefc.ConsentModePurposeStatusEnum */
export const ConsentModePurposeStatus = {
  UNKNOWN: 0,
  GRANTED: 1,
  DENIED: 2,
  NOT_APPLICABLE: 3,
  NOT_CONFIGURED: 4,
} as const;

export type GoogleFcConsentModeUserStatus = {
  adStoragePurposeConsentStatus?: number;
  adUserDataPurposeConsentStatus?: number;
  adPersonalizationPurposeConsentStatus?: number;
  analyticsStoragePurposeConsentStatus?: number;
};

type GoogleFcApi = {
  callbackQueue: Array<Record<string, () => void> | (() => void)>;
  showRevocationMessage?: () => void;
  getGoogleConsentModeValues?: () => GoogleFcConsentModeUserStatus;
  ConsentModePurposeStatusEnum?: Record<string, number>;
};

type AdsByGoogleQueue = unknown[] & {
  pauseAdRequests?: number;
  requestNonPersonalizedAds?: number;
};

declare global {
  interface Window {
    googlefc?: GoogleFcApi;
    adsbygoogle?: AdsByGoogleQueue;
    __tcfapi?: (
      command: string,
      version: number,
      callback: (...args: unknown[]) => void,
      ...rest: unknown[]
    ) => void;
  }
}

export function ensureGoogleFcNamespace(): GoogleFcApi {
  const w = window;
  w.googlefc = w.googlefc || { callbackQueue: [] };
  w.googlefc.callbackQueue = w.googlefc.callbackQueue || [];
  return w.googlefc;
}

/**
 * Bloque les requêtes de diffusion AdSense (slots + ancre) tant que la
 * diffusion n'est pas explicitement réactivée plus tard.
 * À appeler avant le chargement du tag, puis après onLoad (le script peut
 * remplacer la file initiale).
 */
export function pauseAdSenseAdRequests(): void {
  const existing = window.adsbygoogle as AdsByGoogleQueue | undefined;
  if (existing && typeof existing === "object") {
    existing.pauseAdRequests = 1;
    return;
  }
  const queue: AdsByGoogleQueue = [];
  queue.pauseAdRequests = 1;
  window.adsbygoogle = queue;
}

/** Reprend les requêtes de diffusion après accord publicitaire (et flag activé). */
export function resumeAdSenseAdRequests(): void {
  const existing = window.adsbygoogle as AdsByGoogleQueue | undefined;
  if (existing && typeof existing === "object") {
    existing.pauseAdRequests = 0;
    return;
  }
  const queue: AdsByGoogleQueue = [];
  queue.pauseAdRequests = 0;
  window.adsbygoogle = queue;
}

export function isAdSenseAdRequestsPaused(): boolean {
  const queue = window.adsbygoogle as AdsByGoogleQueue | undefined;
  return queue?.pauseAdRequests === 1;
}

/**
 * Finalité accordée pour débloquer un outil :
 * - GRANTED : accepté
 * - NOT_APPLICABLE : hors périmètre UE (le message EU ne s'applique pas)
 * DENIED / UNKNOWN / NOT_CONFIGURED : bloqué
 */
export function isPurposeAllowed(status: number | undefined): boolean {
  return (
    status === ConsentModePurposeStatus.GRANTED ||
    status === ConsentModePurposeStatus.NOT_APPLICABLE
  );
}

export function preferencesFromGoogleConsentMode(
  values: GoogleFcConsentModeUserStatus,
): ConsentPreferences {
  const analytics = isPurposeAllowed(values.analyticsStoragePurposeConsentStatus);
  const advertising = isPurposeAllowed(values.adStoragePurposeConsentStatus);

  return {
    necessary: true,
    analytics,
    advertising,
    timestamp: Date.now(),
  };
}

export function readGoogleConsentPreferences(): ConsentPreferences | null {
  const values = window.googlefc?.getGoogleConsentModeValues?.();
  if (!values) return null;
  return preferencesFromGoogleConsentMode(values);
}

export function queueGoogleFcCallback(key: string, fn: () => void): void {
  const fc = ensureGoogleFcNamespace();
  fc.callbackQueue.push({ [key]: fn });
}

export function showGoogleCmpRevocationMessage(): void {
  ensureGoogleFcNamespace();
  const run = () => {
    window.googlefc?.showRevocationMessage?.();
  };
  if (typeof window.googlefc?.showRevocationMessage === "function") {
    run();
    return;
  }
  queueGoogleFcCallback("CONSENT_API_READY", run);
}
