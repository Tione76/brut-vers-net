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
const sirdataSource = readFileSync(join(root, "src/framework/consent/sirdata-cmp.ts"), "utf8");
const adsenseLoaderSource = readFileSync(join(root, "src/framework/AdSenseLoader.tsx"), "utf8");
const footerSource = readFileSync(
  join(root, "src/framework/design/components/SiteFooter.tsx"),
  "utf8",
);
const panelSource = readFileSync(join(root, "src/framework/CookiePreferencesPanel.tsx"), "utf8");
const analyticsSource = readFileSync(join(root, "src/framework/AnalyticsScripts.tsx"), "utf8");
const layoutSource = readFileSync(join(root, "src/app/layout.tsx"), "utf8");
const cmpLinkSource = readFileSync(join(root, "src/framework/CmpPreferencesLink.tsx"), "utf8");

describe("Migration CMP Sirdata ABconsent", () => {
  it("ne conserve plus la bannière ni la modale maison", () => {
    expect(existsSync(join(root, "src/framework/CookieBanner.tsx"))).toBe(false);
    expect(existsSync(join(root, "src/framework/CookiePreferences.tsx"))).toBe(false);
    expect(existsSync(join(root, "src/framework/GoogleCmpLoader.tsx"))).toBe(false);
    expect(providerSource).not.toContain("CookieBanner");
    expect(providerSource).not.toContain("googlefc");
    expect(providerSource).not.toContain("GoogleCmpLoader");
  });

  it("invalide le stockage local maison sans conversion TCF/Sirdata", () => {
    expect(storageSource).toContain("clearLegacyConsentPreferences");
    expect(storageSource).toContain('CONSENT_STORAGE_KEY = "cookie-consent-preferences"');
    expect(providerSource).toContain("clearLegacyConsentPreferences");
    expect(sirdataSource).not.toContain("cookie-consent-preferences");
  });

  it("charge Sirdata stub synchrone puis CMP async avant AdSense", () => {
    expect(sirdataSource).toContain("cache.consentframework.com/js/pa/");
    expect(sirdataSource).toContain("choices.consentframework.com/js/pa/");
    expect(sirdataSource).toContain('SIRDATA_PARTNER_ID = "55742"');
    expect(sirdataSource).toContain('SIRDATA_CONFIG_ID = "z5brz"');
    expect(layoutSource).toContain("SIRDATA_STUB_SRC");
    expect(layoutSource).toContain("SIRDATA_CMP_SRC");
    expect(layoutSource).toContain('data-cfasync="false"');
    expect(layoutSource).toContain('referrerPolicy="unsafe-url"');
    expect(layoutSource).toContain("pauseAdRequests=1");
    expect(layoutSource).not.toContain("googlefc");
    const stubScriptIdx = layoutSource.indexOf("src={SIRDATA_STUB_SRC}");
    const cmpScriptIdx = layoutSource.indexOf("src={SIRDATA_CMP_SRC}");
    const pauseIdx = layoutSource.indexOf("pauseAdRequests=1");
    expect(stubScriptIdx).toBeGreaterThan(-1);
    expect(cmpScriptIdx).toBeGreaterThan(-1);
    expect(layoutSource).toContain('strategy="afterInteractive"');
    expect(pauseIdx).toBeGreaterThan(-1);
    expect(pauseIdx).toBeLessThan(stubScriptIdx);
  });

  it("conserve Consent Mode v2 en défaut denied sans réécriture site", () => {
    expect(consentModeSource).toContain('analytics_storage: "denied"');
    expect(consentModeSource).toContain('ad_storage: "denied"');
    expect(providerSource).toContain("initConsentModeDefault");
    expect(providerSource).not.toContain("updateConsentMode");
  });

  it("bloque GA4 et Clarity tant que la mesure n'est pas acceptée", () => {
    expect(analyticsSource).toContain("preferences.analytics");
    expect(analyticsSource).toContain("consentReady");
    expect(analyticsSource).toContain('analytics_Storage: "denied"');
  });

  it("branche Gérer les cookies sur displayUI Sirdata (href synchrone)", () => {
    expect(providerSource).toContain("showSirdataCmpUI");
    expect(footerSource).toContain("CmpPreferencesLink");
    expect(footerSource).toContain("Gérer les cookies");
    expect(panelSource).toContain("Gérer mes préférences");
    expect(cmpLinkSource).toContain("SIRDATA_DISPLAY_UI_HREF");
    expect(cmpLinkSource).toContain("dangerouslySetInnerHTML");
    expect(sirdataSource).toContain("Sddan.cmp.displayUI");
  });

  it("charge AdSense via AdSenseLoader avec pause jusqu'au choix", () => {
    expect(adsenseLoaderSource).toContain('id="google-adsense-loader"');
    expect(adsenseLoaderSource).toContain("pauseAdSenseAdRequests");
    expect(adsenseLoaderSource).toContain("resumeAdSenseAdRequests");
    expect(providerSource).toContain("AdSenseLoader");
  });
});
