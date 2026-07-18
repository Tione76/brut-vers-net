"use client";

import { useEffect } from "react";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useConsent, useSite } from "@/framework/SiteProvider";

const IS_PRODUCTION = process.env.NODE_ENV === "production";
const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

/**
 * Google Analytics 4 via @next/third-parties.
 * Chargé une seule fois, uniquement après consentement analytique (bandeau cookies).
 */
export function AnalyticsScripts() {
  const { analytics } = useSite();
  const { preferences, status } = useConsent();
  const gaId = analytics.googleAnalyticsId;

  if (!gaId || status === "pending" || !preferences.analytics) {
    return null;
  }

  return <GoogleAnalytics gaId={gaId} debugMode={IS_DEVELOPMENT} />;
}

export function AdSenseLoader() {
  const { analytics } = useSite();
  const { preferences, status } = useConsent();
  const clientId = analytics.googleAdsenseClientId;

  if (!clientId || status === "pending" || !preferences.advertising) return null;

  return (
    <Script
      id="google-adsense"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      strategy="lazyOnload"
      crossOrigin="anonymous"
    />
  );
}

/**
 * Microsoft Clarity : chargé uniquement en production, après consentement analytique.
 * Le script est importé dynamiquement pour ne pas impacter le bundle initial.
 */
export function ClarityLoader() {
  const { analytics } = useSite();
  const { preferences, status } = useConsent();
  const projectId = analytics.microsoftClarityId;

  useEffect(() => {
    if (!IS_PRODUCTION || !projectId || status === "pending") return;

    let cancelled = false;

    void import("@microsoft/clarity").then(({ default: Clarity }) => {
      if (cancelled) return;

      if (preferences.analytics) {
        Clarity.init(projectId);
        Clarity.consentV2({
          analytics_Storage: "granted",
          ad_Storage: preferences.advertising ? "granted" : "denied",
        });
        return;
      }

      if (document.getElementById("clarity-script")) {
        Clarity.consentV2({
          analytics_Storage: "denied",
          ad_Storage: "denied",
        });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [projectId, preferences.analytics, preferences.advertising, status]);

  return null;
}
