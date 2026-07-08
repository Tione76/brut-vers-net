"use client";

import { Suspense, useEffect } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useConsent, useSite } from "@/framework/SiteProvider";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

/** Envoie un page_view GA4 à chaque navigation App Router */
function GoogleAnalyticsPageView({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;

    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
      send_to: gaId,
    });
  }, [pathname, searchParams, gaId]);

  return null;
}

export function AnalyticsScripts() {
  const { analytics } = useSite();
  const { preferences, status } = useConsent();
  const gaId = analytics.googleAnalyticsId;

  if (!IS_PRODUCTION || !gaId || status === "pending" || !preferences.analytics) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
        gtag('js',new Date());gtag('config','${gaId}',{send_page_view:false});`}
      </Script>
      <Suspense fallback={null}>
        <GoogleAnalyticsPageView gaId={gaId} />
      </Suspense>
    </>
  );
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
