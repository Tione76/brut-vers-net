import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import {
  SIRDATA_CMP_ID,
  SIRDATA_CONFIG_ID,
  SIRDATA_DISPLAY_UI_HREF,
  SIRDATA_PARTNER_ID,
  preferencesFromConsentModeUpdate,
  readLatestConsentModeUpdate,
  readSirdataConsentPreferences,
} from "./sirdata-cmp";

describe("sirdata-cmp", () => {
  const originalDataLayer = globalThis.window?.dataLayer;

  beforeEach(() => {
    vi.stubGlobal("window", {
      dataLayer: [],
    });
  });

  afterEach(() => {
    if (originalDataLayer !== undefined) {
      vi.stubGlobal("window", { dataLayer: originalDataLayer });
    }
    vi.unstubAllGlobals();
  });

  it("expose les identifiants Sirdata Essentials attendus", () => {
    expect(SIRDATA_PARTNER_ID).toBe("55742");
    expect(SIRDATA_CONFIG_ID).toBe("z5brz");
    expect(SIRDATA_CMP_ID).toBe(92);
    expect(SIRDATA_DISPLAY_UI_HREF).toContain("Sddan.cmp.displayUI");
  });

  it("mappe Consent Mode update vers les préférences site", () => {
    const denied = preferencesFromConsentModeUpdate({
      analytics_storage: "denied",
      ad_storage: "denied",
    });
    expect(denied.analytics).toBe(false);
    expect(denied.advertising).toBe(false);

    const granted = preferencesFromConsentModeUpdate({
      analytics_storage: "granted",
      ad_storage: "granted",
    });
    expect(granted.analytics).toBe(true);
    expect(granted.advertising).toBe(true);
  });

  it("lit le dernier consent update du dataLayer sans convertir un défaut seul", () => {
    window.dataLayer = [
      ["consent", "default", { analytics_storage: "denied", ad_storage: "denied" }],
    ];
    expect(readLatestConsentModeUpdate()).toBeNull();
    expect(readSirdataConsentPreferences()).toBeNull();

    window.dataLayer.push([
      "consent",
      "update",
      { analytics_storage: "granted", ad_storage: "denied" },
    ]);
    expect(readSirdataConsentPreferences()).toEqual(
      expect.objectContaining({ analytics: true, advertising: false }),
    );
  });
});
