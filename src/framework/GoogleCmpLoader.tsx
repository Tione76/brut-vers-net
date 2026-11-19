"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useSite } from "@/framework/SiteProvider";
import {
  ensureGoogleFcNamespace,
  pauseAdSenseAdRequests,
} from "@/framework/consent/google-cmp";
import {
  ADSENSE_PUBLISHER_ID,
  ADSENSE_SCRIPT_SRC,
  ADS_DIFFUSION_ENABLED,
} from "@/site/ads";

/**
 * Charge le tag AdSense pour déployer la CMP Google (message européen),
 * dès la première visite, sans attendre un consentement publicitaire maison.
 *
 * La pause des requêtes pubs est initialisée dans `app/layout.tsx` (head)
 * puis réaffirmée ici. Tant que ADS_DIFFUSION_ENABLED est false, on ne
 * lève jamais pauseAdRequests.
 */
export function GoogleCmpLoader() {
  const { analytics } = useSite();
  const clientId = analytics.googleAdsenseClientId || ADSENSE_PUBLISHER_ID;

  useEffect(() => {
    ensureGoogleFcNamespace();
    pauseAdSenseAdRequests();

    if (ADS_DIFFUSION_ENABLED) return;
    const id = window.setInterval(() => {
      pauseAdSenseAdRequests();
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!clientId) return null;

  const src =
    clientId === ADSENSE_PUBLISHER_ID
      ? ADSENSE_SCRIPT_SRC
      : `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;

  return (
    <Script
      id="google-adsense-cmp"
      src={src}
      strategy="afterInteractive"
      crossOrigin="anonymous"
      async
      onLoad={() => {
        pauseAdSenseAdRequests();
      }}
    />
  );
}
