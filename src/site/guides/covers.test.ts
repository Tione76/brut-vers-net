/**
 * Mapping couverture : route / identifiant → fichier covers/
 */
import { describe, expect, it } from "vitest";
import {
  CALCULATOR_COVERS,
  FAQ_COVER,
  GUIDE_COVERS,
  GUIDES_HUB_COVER,
  HOME_COVER,
  TOOLS_HUB_COVER,
  formatCoverCredit,
  getCalculatorCover,
  getGuideCover,
  toAbsoluteAssetUrl,
} from "./covers";

describe("covers registry", () => {
  it("maps each calculator to a dedicated webp under /images/covers/", () => {
    for (const [id, cover] of Object.entries(CALCULATOR_COVERS)) {
      expect(cover.src.startsWith("/images/covers/"), id).toBe(true);
      expect(cover.src.endsWith(".webp"), id).toBe(true);
      expect(cover.alt.length).toBeGreaterThan(5);
      expect(cover.credit.photographer.length).toBeGreaterThan(1);
      expect(["Pexels", "Unsplash"]).toContain(cover.credit.source);
    }
    expect(getCalculatorCover("augmentation-salaire").src).toContain(
      "Calculateur-augmentation-salaire.webp",
    );
    expect(getCalculatorCover("indemnite-licenciement").src).toContain(
      "Simulateur-indemnit",
    );
  });

  it("maps each guide slug to a dedicated cover", () => {
    expect(Object.keys(GUIDE_COVERS)).toEqual(
      expect.arrayContaining([
        "comment-est-calcule-le-salaire-net",
        "comment-calculer-son-salaire-net",
        "comment-lire-une-fiche-de-paie",
        "cotisations-salariales-pourquoi-brut-plus-eleve-que-net",
        "prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne",
      ]),
    );
    expect(getGuideCover("comment-est-calcule-le-salaire-net")?.src).toContain(
      "Comment-calculer-salaire-net.webp",
    );
  });

  it("exposes hub and FAQ covers with credits", () => {
    expect(HOME_COVER.src).toContain("Calculateur-brut-vers-net.webp");
    expect(GUIDES_HUB_COVER.src).toContain("Guides-salaire-im");
    expect(TOOLS_HUB_COVER.src).toContain("Calculateurs-salaire.webp");
    expect(FAQ_COVER.src).toContain("Questions-sur-le-salaire.webp");
    expect(formatCoverCredit(HOME_COVER.credit)).toBe("Photo de Kindel Media via Pexels");
  });

  it("encodes accents in absolute asset URLs", () => {
    const url = toAbsoluteAssetUrl(
      "https://brut-vers-net.fr",
      "/images/covers/guides/Prélèvement-à-la-source.webp",
    );
    expect(url).toContain("Pr%C3%A9l%C3%A8vement-%C3%A0-la-source.webp");
    expect(url).not.toContain("localhost");
  });
});
