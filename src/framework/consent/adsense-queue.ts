/**
 * File d'attente AdSense (pause / reprise des requêtes de diffusion).
 * Indépendant de la CMP : Sirdata pilote Consent Mode ; ce module ne gère
 * que pauseAdRequests pour les emplacements manuels.
 */

type AdsByGoogleQueue = unknown[] & {
  pauseAdRequests?: number;
};

declare global {
  interface Window {
    adsbygoogle?: AdsByGoogleQueue;
  }
}

/**
 * Bloque les requêtes de diffusion AdSense tant que la diffusion
 * n'est pas explicitement réactivée.
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

/** Reprend les requêtes après un choix CMP valide. */
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
