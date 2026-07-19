import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const analyticsSource = readFileSync(
  join(process.cwd(), "src/framework/AnalyticsScripts.tsx"),
  "utf8",
);
const siteConfigSource = readFileSync(
  join(process.cwd(), "src/site/site.config.ts"),
  "utf8",
);
const providerSource = readFileSync(
  join(process.cwd(), "src/framework/SiteProvider.tsx"),
  "utf8",
);

describe("Microsoft Clarity integration", () => {
  it("lit NEXT_PUBLIC_CLARITY_PROJECT_ID depuis la config centralisée", () => {
    expect(siteConfigSource).toContain("NEXT_PUBLIC_CLARITY_PROJECT_ID");
    expect(siteConfigSource).toContain("microsoftClarityId");
  });

  it("charge Clarity une seule fois via SiteProvider", () => {
    expect(providerSource).toContain("<ClarityLoader />");
    expect(providerSource.match(/ClarityLoader/g)?.length).toBe(2);
  });

  it("utilise Consent API V2 et n'initialise Clarity qu'après consentement analytique", () => {
    expect(analyticsSource).toContain("Clarity.consentV2");
    expect(analyticsSource).toContain("Clarity.init(projectId)");
    expect(analyticsSource).toContain("preferences.analytics");
    expect(analyticsSource).toContain("clarityInitialized");
    expect(analyticsSource).toContain('analytics_Storage: "denied"');
  });

  it("ne s'appuie pas sur Google Consent Mode pour piloter Clarity", () => {
    expect(analyticsSource).not.toContain("updateConsentMode");
    expect(analyticsSource).not.toContain("gtag");
  });
});
