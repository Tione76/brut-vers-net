"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useConsent, useSite } from "@/framework/SiteProvider";
import { CookiePreferences } from "@/framework/CookiePreferences";
import { consumeCustomizeFocus } from "@/framework/consent/customize-focus";
import { useConsentDialog } from "@/framework/consent/useConsentDialog";

const CONSENT_DESCRIPTION =
  "Brut vers Net et ses partenaires utilisent des cookies ou technologies similaires pour mesurer l’audience et, avec votre accord, afficher des publicités personnalisées. Vous pouvez accepter, refuser ou personnaliser vos choix à tout moment.";

export function CookieBanner() {
  const { logo } = useSite();
  const { showBanner, showPreferences, acceptAll, rejectAll, openPreferences } = useConsent();
  const rootRef = useRef<HTMLDivElement>(null);

  useConsentDialog(rootRef, {
    enabled: showBanner && !showPreferences,
    preventEscape: true,
  });

  useEffect(() => {
    if (!consumeCustomizeFocus()) return;
    if (!showBanner || showPreferences) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById("cookie-consent-customize")?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [showBanner, showPreferences]);

  if (!showBanner && !showPreferences) return null;
  if (showPreferences) return <CookiePreferences />;

  return (
    <div ref={rootRef} className="cookie-consent-root">
      <div className="cookie-consent-overlay" aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-desc"
        tabIndex={-1}
        className="cookie-consent-dialog"
      >
        {logo ? (
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className="cookie-consent-logo"
            sizes="88px"
          />
        ) : null}
        <h2 id="cookie-consent-title" className="cookie-consent-title">
          Vos données, votre choix.
        </h2>
        <p id="cookie-consent-desc" className="cookie-consent-text">
          {CONSENT_DESCRIPTION}
        </p>
        <Link
          href="/gestion-des-cookies"
          target="_blank"
          rel="noopener noreferrer"
          className="cookie-consent-policy"
        >
          Politique cookies
        </Link>
        <div>
          <button type="button" className="cookie-consent-reject" onClick={rejectAll}>
            Continuer sans accepter →
          </button>
        </div>
        <div className="cookie-consent-actions">
          <button type="button" className="cookie-consent-btn cookie-consent-btn--accept" onClick={acceptAll}>
            Accepter et fermer
          </button>
          <button
            type="button"
            id="cookie-consent-customize"
            className="cookie-consent-btn cookie-consent-btn--customize"
            onClick={openPreferences}
          >
            Personnaliser
          </button>
        </div>
      </div>
    </div>
  );
}
