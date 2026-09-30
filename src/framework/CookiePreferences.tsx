"use client";

import { useCallback, useRef, useState } from "react";
import { useConsent } from "@/framework/SiteProvider";
import { useConsentDialog } from "@/framework/consent/useConsentDialog";
import { requestCustomizeFocus } from "@/framework/consent/customize-focus";

export function CookiePreferences() {
  const { preferences, savePreferences, closePreferences } = useConsent();
  const [analytics, setAnalytics] = useState(preferences.analytics);
  const [advertising, setAdvertising] = useState(preferences.advertising);
  const rootRef = useRef<HTMLDivElement>(null);

  const goBack = useCallback(() => {
    requestCustomizeFocus();
    closePreferences();
  }, [closePreferences]);

  useConsentDialog(rootRef, {
    enabled: true,
    preventEscape: false,
    onEscape: goBack,
  });

  const categories = [
    { id: "necessary", name: "Cookies strictement nécessaires", description: "Indispensables au fonctionnement du site.", required: true },
    { id: "analytics", name: "Cookies analytiques", description: "Mesure d'audience pour améliorer le service.", required: false },
    { id: "advertising", name: "Cookies publicitaires", description: "Publicités personnalisées.", required: false },
  ] as const;

  return (
    <div ref={rootRef} className="cookie-consent-root">
      <div className="cookie-consent-overlay" onClick={goBack} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-prefs-title"
        aria-describedby="cookie-prefs-desc"
        tabIndex={-1}
        className="cookie-consent-dialog cookie-consent-prefs"
      >
        <button type="button" className="cookie-consent-back" onClick={goBack}>
          <span aria-hidden="true">←</span>
          <span>Retour</span>
        </button>
        <h2 id="cookie-prefs-title" className="cookie-consent-title">
          Préférences de cookies
        </h2>
        <p id="cookie-prefs-desc" className="cookie-consent-prefs-intro">
          Choisissez les cookies que vous souhaitez autoriser. Vous pourrez modifier vos choix à tout moment.
        </p>
        <div className="cookie-consent-categories">
          {categories.map((cat) => {
            const isAnalytics = cat.id === "analytics";
            const isAdvertising = cat.id === "advertising";
            const checked = cat.required ? true : isAnalytics ? analytics : isAdvertising ? advertising : false;
            return (
              <div key={cat.id} className="cookie-consent-category">
                <div className="cookie-consent-category__copy">
                  <label htmlFor={`cookie-${cat.id}`} className="cookie-consent-category__name">
                    {cat.name}
                    {cat.required && (
                      <span className="cookie-consent-category__required"> (obligatoire)</span>
                    )}
                  </label>
                  <p className="cookie-consent-category__desc">{cat.description}</p>
                </div>
                <span className="cookie-consent-switch">
                  <input
                    type="checkbox"
                    id={`cookie-${cat.id}`}
                    role="switch"
                    checked={checked}
                    disabled={cat.required}
                    onChange={(e) => {
                      if (isAnalytics) setAnalytics(e.target.checked);
                      if (isAdvertising) setAdvertising(e.target.checked);
                    }}
                  />
                  <span className="cookie-consent-switch__ui" aria-hidden="true" />
                </span>
              </div>
            );
          })}
        </div>
        <div className="cookie-consent-actions cookie-consent-prefs-actions">
          <button
            type="button"
            className="cookie-consent-btn cookie-consent-btn--accept cookie-consent-prefs-save"
            onClick={() => savePreferences({ analytics, advertising })}
          >
            Enregistrer mes choix
          </button>
        </div>
      </div>
    </div>
  );
}
