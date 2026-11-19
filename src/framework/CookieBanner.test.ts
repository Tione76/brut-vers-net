import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const providerSource = readFileSync(join(root, "src/framework/SiteProvider.tsx"), "utf8");
const storageSource = readFileSync(join(root, "src/framework/consent/storage.ts"), "utf8");
const consentModeSource = readFileSync(
  join(root, "src/framework/consent/consent-mode.ts"),
  "utf8",
);
const googleCmpSource = readFileSync(join(root, "src/framework/consent/google-cmp.ts"), "utf8");
const cmpLoaderSource = readFileSync(join(root, "src/framework/GoogleCmpLoader.tsx"), "utf8");
const footerSource = readFileSync(
  join(root, "src/framework/design/components/SiteFooter.tsx"),
  "utf8",
);
const panelSource = readFileSync(join(root, "src/framework/CookiePreferencesPanel.tsx"), "utf8");
const analyticsSource = readFileSync(join(root, "src/framework/AnalyticsScripts.tsx"), "utf8");
const layoutSource = readFileSync(join(root, "src/app/layout.tsx"), "utf8");

describe("Migration CMP Google", () => {
  it("ne conserve plus la bannière ni la modale maison", () => {
    expect(existsSync(join(root, "src/framework/CookieBanner.tsx"))).toBe(false);
    expect(existsSync(join(root, "src/framework/CookiePreferences.tsx"))).toBe(false);
    expect(providerSource).not.toContain("CookieBanner");
    expect(providerSource).not.toContain("acceptAll");
    expect(providerSource).not.toContain("rejectAll");
  });

  it("invalide le stockage local maison sans conversion TCF", () => {
    expect(storageSource).toContain("clearLegacyConsentPreferences");
    expect(storageSource).toContain('CONSENT_STORAGE_KEY = "cookie-consent-preferences"');
    expect(storageSource).not.toContain("CONSENT_VERSION = 1");
    expect(providerSource).toContain("clearLegacyConsentPreferences");
    expect(googleCmpSource).not.toContain("cookie-consent-preferences");
  });

  it("charge la CMP via le tag AdSense avec pause des requêtes pubs", () => {
    expect(cmpLoaderSource).toContain('id="google-adsense-cmp"');
    expect(cmpLoaderSource).toContain("pauseAdSenseAdRequests");
    expect(cmpLoaderSource).toContain("crossOrigin=\"anonymous\"");
    expect(layoutSource).toContain("pauseAdRequests=1");
    expect(layoutSource).toContain("cookie-consent-preferences");
    expect(googleCmpSource).toContain("pauseAdRequests = 1");
    expect(providerSource).toContain("GoogleCmpLoader");
    expect(providerSource).toContain('eventStatus === "cmpuishown"');
    expect(providerSource).toContain('eventStatus === "useractioncomplete"');
  });

  it("conserve Consent Mode v2 en défaut denied", () => {
    expect(consentModeSource).toContain('analytics_storage: "denied"');
    expect(consentModeSource).toContain('ad_storage: "denied"');
    expect(providerSource).toContain("initConsentModeDefault");
  });

  it("bloque GA4 et Clarity tant que la mesure n'est pas acceptée", () => {
    expect(analyticsSource).toContain("preferences.analytics");
    expect(analyticsSource).toContain("consentReady");
    expect(analyticsSource).toContain('analytics_Storage: "denied"');
  });

  it("branche Gérer les cookies sur la révocation Google", () => {
    expect(providerSource).toContain("showGoogleCmpRevocationMessage");
    expect(footerSource).toContain("openPreferences");
    expect(footerSource).toContain("Gérer les cookies");
    expect(panelSource).toContain("openPreferences");
  });
});
