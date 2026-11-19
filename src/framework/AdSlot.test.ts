import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const adSlotSource = readFileSync(join(process.cwd(), "src/framework/AdSlot.tsx"), "utf8");
const cmpLoaderSource = readFileSync(
  join(process.cwd(), "src/framework/GoogleCmpLoader.tsx"),
  "utf8",
);
const adsConfigSource = readFileSync(
  join(process.cwd(), "src/site/ads/ads.config.ts"),
  "utf8",
);
const siteShellSource = readFileSync(
  join(process.cwd(), "src/framework/design/components/SiteShell.tsx"),
  "utf8",
);
const guideRendererSource = readFileSync(
  join(process.cwd(), "src/site/guides/GuideRenderer.tsx"),
  "utf8",
);
const toolLayoutSource = readFileSync(
  join(process.cwd(), "src/framework/layouts/ToolCalculatorPageLayout.tsx"),
  "utf8",
);
const homeLayoutSource = readFileSync(
  join(process.cwd(), "src/framework/layouts/CalculatorPageLayout.tsx"),
  "utf8",
);
const homeEditorialSource = readFileSync(
  join(process.cwd(), "src/site/home-editorial.tsx"),
  "utf8",
);
const overtimeEditorialSource = readFileSync(
  join(process.cwd(), "src/site/overtime-salary-calculator/overtime-editorial.tsx"),
  "utf8",
);

describe("AdSense wiring", () => {
  it("monte les slots manuels via ManualAdSlotId et le garde-fou viewport", () => {
    expect(adSlotSource).toContain("useDesktopAds");
    expect(adSlotSource).toContain("isManualAdViewportAllowed");
    expect(adSlotSource).toContain("isAdPathExcluded");
    expect(adSlotSource).toContain("consentReady");
    expect(adSlotSource).toContain('status !== "pending"');
    expect(adSlotSource).not.toContain("preferences.advertising");
    expect(adSlotSource).toContain('slotId === "desktopInArticle"');
    expect(adSlotSource).toContain("fixedSize");
    expect(adSlotSource).toContain('display: "inline-block"');
    expect(adSlotSource).not.toContain("position:");
  });

  it("reprend AdSense après un choix CMP, sans exiger l'accord publicitaire", () => {
    expect(cmpLoaderSource).toContain('id="google-adsense-cmp"');
    expect(cmpLoaderSource).toContain('crossOrigin="anonymous"');
    expect(cmpLoaderSource).toContain("pauseAdSenseAdRequests");
    expect(cmpLoaderSource).toContain("ADS_DIFFUSION_ENABLED");
    expect(adsConfigSource).toContain("ADS_DIFFUSION_ENABLED = true");
    expect(cmpLoaderSource).toContain("resumeAdSenseAdRequests");
    expect(cmpLoaderSource).toContain("consentReady");
    expect(cmpLoaderSource).toContain('status !== "pending"');
    expect(cmpLoaderSource).not.toContain("preferences.advertising");
  });

  it("expose les bandeaux fixes sans auto/FWR et l'In-Article mobile coupable à part", () => {
    expect(adsConfigSource).toContain('adSlot: "5914149453"');
    expect(adsConfigSource).toContain('adSlot: "9463025573"');
    expect(adsConfigSource).toContain("fixedSize: { width: 728, height: 90 }");
    expect(adsConfigSource).toContain("fixedSize: { width: 320, height: 50 }");
    expect(adsConfigSource).toContain("resolveTopBannerSlotId");
    expect(adsConfigSource).toMatch(
      /desktopSidebar:[\s\S]*?desktopOnly:\s*true/,
    );
    expect(adsConfigSource).toContain("ADS_MOBILE_IN_ARTICLE_ENABLED = true");
    expect(adsConfigSource).toContain("isManualAdViewportAllowed");
  });

  it("place un seul bandeau haut dans SiteShell selon la largeur", () => {
    expect(siteShellSource).toContain("useTopBannerSlot");
    expect(siteShellSource).toContain("slotId={slotId}");
    expect(siteShellSource).not.toContain('slotId="desktopTopBanner"');
    expect(siteShellSource).not.toContain('slotId="mobileTopBanner"');
  });

  it("insère l'In-Article via le gabarit guide et après le chapô des calculateurs", () => {
    expect(guideRendererSource).toContain('slotId="desktopInArticle"');
    expect(guideRendererSource).toContain("showInArticleAfterLead");
    expect(guideRendererSource).toContain("showInArticleAfterQuickSummary");
    expect(adsConfigSource).toContain('"/smic": "after-quick-summary"');
    expect(homeLayoutSource).not.toContain('slotId="desktopInArticle"');
    expect(toolLayoutSource).not.toContain('slotId="desktopInArticle"');
    expect(homeEditorialSource).toContain('slotId="desktopInArticle"');
    expect(homeEditorialSource.indexOf("home-editorial__lead")).toBeLessThan(
      homeEditorialSource.indexOf('slotId="desktopInArticle"'),
    );
    expect(overtimeEditorialSource).toContain('slotId="desktopInArticle"');
    expect(overtimeEditorialSource.indexOf("home-editorial__lead")).toBeLessThan(
      overtimeEditorialSource.indexOf('slotId="desktopInArticle"'),
    );
    expect(homeEditorialSource.match(/slotId="desktopInArticle"/g)?.length).toBe(1);
    expect(overtimeEditorialSource.match(/slotId="desktopInArticle"/g)?.length).toBe(1);
  });
});
