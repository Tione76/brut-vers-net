"use client";

import { useEffect } from "react";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useConsent, useSite } from "@/framework/SiteProvider";

const IS_PRODUCTION = process.env.NODE_ENV === "production";
const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

/** Évite un double Clarity.init() (Strict Mode / changements de préférences). */
let clarityInitialized = false;

type ClarityConsentState = "granted" | "denied";

function toClarityConsent(enabled: boolean): ClarityConsentState {
  return enabled ? "granted" : "denied";
}

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
 * Microsoft Clarity (Consent API V2).
 * - Script chargé une seule fois (layout via SiteProvider, pas à chaque route).
 * - Init uniquement après consentement analytique (pas de cookies Clarity avant accord).
 * - Retrait du consentement : consentV2 transmis immédiatement.
 * - Google Consent Mode ne pilote pas Clarity : on réutilise preferences.analytics / advertising.
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

      const consentOptions = {
        analytics_Storage: toClarityConsent(preferences.analytics),
        ad_Storage: toClarityConsent(preferences.advertising),
      };

      if (preferences.analytics) {
        if (!clarityInitialized) {
          Clarity.init(projectId);
          clarityInitialized = true;
        }
        Clarity.consentV2(consentOptions);
        return;
      }

      // Refus ou retrait : signal explicite seulement si Clarity a déjà été initialisé
      if (clarityInitialized || document.getElementById("clarity-script")) {
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
