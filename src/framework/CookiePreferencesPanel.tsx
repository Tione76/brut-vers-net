"use client";

import { useConsent } from "@/framework/SiteProvider";

export function CookiePreferencesPanel() {
  const { openPreferences } = useConsent();

  return (
    <>
      <p>
        Vous pouvez à tout moment modifier vos préférences concernant les cookies analytiques et
        publicitaires via le message de consentement Google. Les cookies strictement nécessaires au
        fonctionnement du site ne peuvent pas être désactivés.
      </p>
      <p>
        <button type="button" className="ds-btn ds-btn--primary" onClick={openPreferences}>
          Gérer mes préférences
        </button>
      </p>
    </>
  );
}
