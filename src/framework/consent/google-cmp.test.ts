import { describe, expect, it } from "vitest";
import {
  ConsentModePurposeStatus,
  isPurposeAllowed,
  preferencesFromGoogleConsentMode,
} from "./google-cmp";

describe("google-cmp consent mapping", () => {
  it("autorise GRANTED et NOT_APPLICABLE uniquement", () => {
    expect(isPurposeAllowed(ConsentModePurposeStatus.GRANTED)).toBe(true);
    expect(isPurposeAllowed(ConsentModePurposeStatus.NOT_APPLICABLE)).toBe(true);
    expect(isPurposeAllowed(ConsentModePurposeStatus.DENIED)).toBe(false);
    expect(isPurposeAllowed(ConsentModePurposeStatus.UNKNOWN)).toBe(false);
    expect(isPurposeAllowed(ConsentModePurposeStatus.NOT_CONFIGURED)).toBe(false);
    expect(isPurposeAllowed(undefined)).toBe(false);
  });

  it("mappe analytics et advertising sans convertir un refus", () => {
    const denied = preferencesFromGoogleConsentMode({
      analyticsStoragePurposeConsentStatus: ConsentModePurposeStatus.DENIED,
      adStoragePurposeConsentStatus: ConsentModePurposeStatus.DENIED,
      adUserDataPurposeConsentStatus: ConsentModePurposeStatus.DENIED,
      adPersonalizationPurposeConsentStatus: ConsentModePurposeStatus.DENIED,
    });
    expect(denied.analytics).toBe(false);
    expect(denied.advertising).toBe(false);

    const granted = preferencesFromGoogleConsentMode({
      analyticsStoragePurposeConsentStatus: ConsentModePurposeStatus.GRANTED,
      adStoragePurposeConsentStatus: ConsentModePurposeStatus.GRANTED,
      adUserDataPurposeConsentStatus: ConsentModePurposeStatus.GRANTED,
      adPersonalizationPurposeConsentStatus: ConsentModePurposeStatus.GRANTED,
    });
    expect(granted.analytics).toBe(true);
    expect(granted.advertising).toBe(true);
  });
});
