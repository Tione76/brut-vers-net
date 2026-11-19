"use client";

import { CmpPreferencesLink } from "@/framework/CmpPreferencesLink";

export function CookiePreferencesPanel() {
  return (
    <>
      <p>
        Vous pouvez à tout moment modifier vos préférences concernant les cookies analytiques et
        publicitaires via la plate-forme de consentement Sirdata ABconsent. Les cookies strictement
        nécessaires au fonctionnement du site ne peuvent pas être désactivés.
      </p>
      <p>
        <CmpPreferencesLink className="ds-btn ds-btn--primary">
          Gérer mes préférences
        </CmpPreferencesLink>
      </p>
    </>
  );
}
