"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useConsent, useSite } from "@/framework/SiteProvider";
import {
  pauseAdSenseAdRequests,
  resumeAdSenseAdRequests,
} from "@/framework/consent/adsense-queue";
import {
  ADSENSE_PUBLISHER_ID,
  ADSENSE_SCRIPT_SRC,
  ADS_DIFFUSION_ENABLED,
} from "@/site/ads";

/**
 * Charge le tag AdSense (emplacements manuels uniquement).
 * Pause jusqu'à un choix CMP Sirdata valide ; AdSense applique ensuite le TCF /
 * Consent Mode (personnalisé, limité ou vide).
 */
export function AdSenseLoader() {
  const { analytics } = useSite();
  const { status, consentReady } = useConsent();
  const clientId = analytics.googleAdsenseClientId || ADSENSE_PUBLISHER_ID;

  useEffect(() => {
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
      id="google-adsense-loader"
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
