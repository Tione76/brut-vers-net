import { describe, expect, it } from "vitest";
import {
  ADSENSE_DASHBOARD_EXCLUSIONS,
  ADSENSE_PUBLISHER_ID,
  ADS_DIFFUSION_ENABLED,
  ADS_MOBILE_IN_ARTICLE_ENABLED,
  MANUAL_AD_SLOTS,
  isManualAdViewportAllowed,
  resolveTopBannerSlotId,
} from "./ads.config";
import { getInArticlePlacement, isAdPathExcluded } from "./path-rules";

describe("AdSense path rules", () => {
  it("exclut l'accueil, les pages légales, contact et partenariat par chemin exact", () => {
    expect(isAdPathExcluded("/")).toBe(true);
    expect(isAdPathExcluded("/mentions-legales")).toBe(true);
    expect(isAdPathExcluded("/politique-de-confidentialite")).toBe(true);
    expect(isAdPathExcluded("/gestion-des-cookies")).toBe(true);
    expect(isAdPathExcluded("/contact")).toBe(true);
    expect(isAdPathExcluded("/devenir-partenaire")).toBe(true);
    expect(isAdPathExcluded("/mentions-legales/")).toBe(true);
  });

  it("laisse les pages de contenu éligibles", () => {
    expect(isAdPathExcluded("/smic")).toBe(false);
    expect(isAdPathExcluded("/guides")).toBe(false);
    expect(isAdPathExcluded("/nos-outils")).toBe(false);
  });

  it("ne traite pas un lien vers les mentions comme exclusion de la page courante", () => {
    expect(isAdPathExcluded("/epargner-petit-salaire")).toBe(false);
  });

  it("place l'In-Article après les montants sur /smic", () => {
    expect(getInArticlePlacement("/smic")).toBe("after-quick-summary");
    expect(getInArticlePlacement("/smic/")).toBe("after-quick-summary");
  });

  it("expose les slots manuels et l'éditeur attendus", () => {
    expect(ADSENSE_PUBLISHER_ID).toBe("ca-pub-6823212353384678");
    expect(ADS_DIFFUSION_ENABLED).toBe(true);
    expect(MANUAL_AD_SLOTS.desktopTopBanner.adSlot).toBe("5914149453");
    expect(MANUAL_AD_SLOTS.desktopTopBanner.fixedSize).toEqual({
      width: 728,
      height: 90,
    });
    expect(MANUAL_AD_SLOTS.desktopTopBanner.format).toBeUndefined();
    expect(MANUAL_AD_SLOTS.desktopTopBanner.fullWidthResponsive).toBeUndefined();
    expect(MANUAL_AD_SLOTS.mobileTopBanner.adSlot).toBe("4949154780");
    expect(MANUAL_AD_SLOTS.mobileTopBanner.fullBleedHeightPx).toBe(60);
    expect(MANUAL_AD_SLOTS.mobileTopBanner.fixedSize).toBeUndefined();
    expect(MANUAL_AD_SLOTS.mobileTopBanner.format).toBeUndefined();
    expect(MANUAL_AD_SLOTS.mobileTopBanner.fullWidthResponsive).toBeUndefined();
    expect(MANUAL_AD_SLOTS.desktopSidebar.adSlot).toBe("8155627429");
    expect(MANUAL_AD_SLOTS.desktopSidebar.format).toBe("auto");
    expect(MANUAL_AD_SLOTS.desktopSidebar.fullWidthResponsive).toBe(true);
    expect(MANUAL_AD_SLOTS.desktopInArticle.adSlot).toBe("6161561464");
    expect(MANUAL_AD_SLOTS.desktopSidebar.desktopOnly).toBe(true);
    expect(MANUAL_AD_SLOTS.desktopInArticle.desktopOnly).toBe(true);
  });

  it("choisit le bandeau selon la largeur disponible (mobile pleine largeur sous 728)", () => {
    expect(resolveTopBannerSlotId(800)).toBe("desktopTopBanner");
    expect(resolveTopBannerSlotId(728)).toBe("desktopTopBanner");
    expect(resolveTopBannerSlotId(727)).toBe("mobileTopBanner");
    expect(resolveTopBannerSlotId(320)).toBe("mobileTopBanner");
    expect(resolveTopBannerSlotId(319)).toBe("mobileTopBanner");
    expect(resolveTopBannerSlotId(1)).toBe("mobileTopBanner");
  });

  it("autorise les bandeaux haut sur tous viewports et réserve le latéral à l'ordinateur", () => {
    expect(isManualAdViewportAllowed("desktopTopBanner", false)).toBe(true);
    expect(isManualAdViewportAllowed("desktopTopBanner", true)).toBe(true);
    expect(isManualAdViewportAllowed("mobileTopBanner", false)).toBe(true);
    expect(isManualAdViewportAllowed("mobileTopBanner", true)).toBe(true);
    expect(isManualAdViewportAllowed("desktopSidebar", false)).toBe(false);
    expect(isManualAdViewportAllowed("desktopSidebar", true)).toBe(true);
    expect(isManualAdViewportAllowed("desktopInArticle", true)).toBe(true);
    expect(isManualAdViewportAllowed("desktopInArticle", false)).toBe(
      ADS_MOBILE_IN_ARTICLE_ENABLED,
    );
  });

  it("fournit la liste AdSense des pages exclues pour l'ancre", () => {
    expect(ADSENSE_DASHBOARD_EXCLUSIONS).toContain(
      "https://www.brut-vers-net.fr/",
    );
    expect(ADSENSE_DASHBOARD_EXCLUSIONS).toContain(
      "https://www.brut-vers-net.fr/mentions-legales",
    );
    expect(ADSENSE_DASHBOARD_EXCLUSIONS).toContain(
      "https://brut-vers-net.fr/contact",
    );
    expect(ADSENSE_DASHBOARD_EXCLUSIONS).toHaveLength(12);
  });
});
