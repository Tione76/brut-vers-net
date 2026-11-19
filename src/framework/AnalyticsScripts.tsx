"use client";

import { useEffect } from "react";
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
 * Google Analytics 4 : chargé uniquement après acceptation de la mesure
 * (Consent Mode analytics via CMP Google). Retrait → démontage React + update denied.
 */
export function AnalyticsScripts() {
  const { analytics } = useSite();
  const { preferences, status, consentReady } = useConsent();
  const gaId = analytics.googleAnalyticsId;

  if (!gaId || !consentReady || status === "pending" || !preferences.analytics) {
    return null;
  }

  return <GoogleAnalytics gaId={gaId} debugMode={IS_DEVELOPMENT} />;
}

/**
 * Microsoft Clarity (Consent API V2).
 * Init seulement si analytics accordé. Retrait : consentV2 denied immédiatement.
 */
export function ClarityLoader() {
  const { analytics } = useSite();
  const { preferences, status, consentReady } = useConsent();
  const projectId = analytics.microsoftClarityId;

  useEffect(() => {
    if (!IS_PRODUCTION || !projectId) return;
    if (!consentReady || status === "pending") {
      if (clarityInitialized || document.getElementById("clarity-script")) {
        void import("@microsoft/clarity").then(({ default: Clarity }) => {
          Clarity.consentV2({
            analytics_Storage: "denied",
            ad_Storage: "denied",
          });
        });
      }
      return;
    }

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
  }, [
    projectId,
    preferences.analytics,
    preferences.advertising,
    status,
    consentReady,
  ]);

  return null;
}
