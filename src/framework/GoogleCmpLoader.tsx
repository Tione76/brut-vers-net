"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useConsent, useSite } from "@/framework/SiteProvider";
import {
  ensureGoogleFcNamespace,
  pauseAdSenseAdRequests,
  resumeAdSenseAdRequests,
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
 * Pause initiale jusqu'à un choix CMP valide (Autoriser ou Refuser).
 * AdSense applique ensuite Consent Mode (personnalisé, limité ou rien).
 * Si ADS_DIFFUSION_ENABLED est false, la pause n'est jamais levée.
 */
export function GoogleCmpLoader() {
  const { analytics } = useSite();
  const { status, consentReady } = useConsent();
  const clientId = analytics.googleAdsenseClientId || ADSENSE_PUBLISHER_ID;

  useEffect(() => {
    ensureGoogleFcNamespace();
    pauseAdSenseAdRequests();
  }, []);

  useEffect(() => {
    if (!ADS_DIFFUSION_ENABLED) {
      pauseAdSenseAdRequests();
      const id = window.setInterval(() => {
        pauseAdSenseAdRequests();
      }, 1000);
      return () => window.clearInterval(id);
    }

    const choiceRecorded = consentReady && status !== "pending";
    if (choiceRecorded) {
      resumeAdSenseAdRequests();
    } else {
      pauseAdSenseAdRequests();
    }
  }, [consentReady, status]);

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
        if (!ADS_DIFFUSION_ENABLED || !consentReady || status === "pending") {
          pauseAdSenseAdRequests();
        }
      }}
    />
  );
}
