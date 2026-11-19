import { describe, expect, it } from "vitest";
import {
  ADSENSE_DASHBOARD_EXCLUSIONS,
  ADSENSE_PUBLISHER_ID,
  MANUAL_AD_SLOTS,
} from "./ads.config";
import { getInArticlePlacement, isAdPathExcluded } from "./path-rules";

describe("AdSense path rules", () => {
  it("exclut les pages légales, contact et partenariat par chemin exact", () => {
    expect(isAdPathExcluded("/mentions-legales")).toBe(true);
    expect(isAdPathExcluded("/politique-de-confidentialite")).toBe(true);
    expect(isAdPathExcluded("/gestion-des-cookies")).toBe(true);
    expect(isAdPathExcluded("/contact")).toBe(true);
    expect(isAdPathExcluded("/devenir-partenaire")).toBe(true);
    expect(isAdPathExcluded("/mentions-legales/")).toBe(true);
  });

  it("laisse les pages de contenu éligibles", () => {
    expect(isAdPathExcluded("/")).toBe(false);
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

  it("expose les trois slots manuels et l'éditeur attendus", () => {
    expect(ADSENSE_PUBLISHER_ID).toBe("ca-pub-6823212353384678");
    expect(MANUAL_AD_SLOTS.desktopTopBanner.adSlot).toBe("5914149453");
    expect(MANUAL_AD_SLOTS.desktopSidebar.adSlot).toBe("8155627429");
    expect(MANUAL_AD_SLOTS.desktopInArticle.adSlot).toBe("6161561464");
  });

  it("fournit la liste AdSense des pages exclues pour l'ancre", () => {
    expect(ADSENSE_DASHBOARD_EXCLUSIONS).toContain(
      "https://www.brut-vers-net.fr/mentions-legales",
    );
    expect(ADSENSE_DASHBOARD_EXCLUSIONS).toContain(
      "https://brut-vers-net.fr/contact",
    );
    expect(ADSENSE_DASHBOARD_EXCLUSIONS).toHaveLength(10);
  });
});
