import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const bannerSource = readFileSync(join(process.cwd(), "src/framework/CookieBanner.tsx"), "utf8");
const prefsSource = readFileSync(join(process.cwd(), "src/framework/CookiePreferences.tsx"), "utf8");
const providerSource = readFileSync(join(process.cwd(), "src/framework/SiteProvider.tsx"), "utf8");
const storageSource = readFileSync(join(process.cwd(), "src/framework/consent/storage.ts"), "utf8");
const consentModeSource = readFileSync(join(process.cwd(), "src/framework/consent/consent-mode.ts"), "utf8");

describe("Cookie consent modal UI", () => {
  it("réutilise acceptAll, rejectAll et openPreferences sans nouvelle logique de stockage", () => {
    expect(bannerSource).toContain("onClick={rejectAll}");
    expect(bannerSource).toContain("onClick={acceptAll}");
    expect(bannerSource).toContain("onClick={openPreferences}");
    expect(bannerSource).toContain("Continuer sans accepter");
    expect(bannerSource).toContain("Accepter et fermer");
    expect(bannerSource).toContain("Personnaliser");
    expect(bannerSource).toContain('href="/gestion-des-cookies"');
  });

  it("expose une vraie modale accessible et non refermable sans choix", () => {
    expect(bannerSource).toContain('role="dialog"');
    expect(bannerSource).toContain('aria-modal="true"');
    expect(bannerSource).toContain("preventEscape: true");
    expect(bannerSource).not.toContain("closePreferences");
  });

  it("conserve le panneau de préférences existant", () => {
    expect(bannerSource).toContain("CookiePreferences");
    expect(prefsSource).toContain("savePreferences");
    expect(prefsSource).toContain("Enregistrer mes choix");
    expect(prefsSource).not.toContain("Tout refuser");
    expect(prefsSource).not.toContain("Tout accepter");
  });
});

describe("Consent engine left unchanged", () => {
  it("persiste toujours dans cookie-consent-preferences version 1", () => {
    expect(storageSource).toContain('CONSENT_STORAGE_KEY = "cookie-consent-preferences"');
    expect(storageSource).toContain("CONSENT_VERSION = 1");
  });

  it("conserve Consent Mode v2 default denied et le mapping analytics/publicité", () => {
    expect(consentModeSource).toContain('analytics_storage: "denied"');
    expect(consentModeSource).toContain('ad_storage: "denied"');
    expect(consentModeSource).toContain("preferences.analytics");
    expect(consentModeSource).toContain("preferences.advertising");
  });

  it("conserve acceptAll / rejectAll dans SiteProvider", () => {
    expect(providerSource).toContain("analytics: true, advertising: true");
    expect(providerSource).toContain("analytics: false, advertising: false");
    expect(providerSource).toContain("initConsentModeDefault");
    expect(providerSource).not.toContain("@vercel/analytics");
  });
});
