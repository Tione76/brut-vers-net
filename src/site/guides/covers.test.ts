/**
 * Mapping couverture : route / identifiant → fichier OG
 * Garde les noms de fichiers d'origine (casse, accents, espaces).
 */
import { describe, expect, it } from "vitest";
import {
  CALCULATOR_COVERS,
  FAQ_COVER,
  GUIDE_COVERS,
  GUIDES_HUB_COVER,
  HOME_COVER,
  TOOLS_HUB_COVER,
  getCalculatorCover,
  getGuideCover,
  toAbsoluteAssetUrl,
} from "./covers";

describe("covers registry", () => {
  it("maps each calculator to a dedicated webp under /images/og/", () => {
    for (const [id, cover] of Object.entries(CALCULATOR_COVERS)) {
      expect(cover.src.startsWith("/images/og/"), id).toBe(true);
      expect(cover.src.endsWith(".webp"), id).toBe(true);
      expect(cover.width).toBe(1200);
      expect(cover.height).toBe(630);
      expect(cover.alt.length).toBeGreaterThan(5);
    }
    expect(getCalculatorCover("augmentation-salaire").src).toContain(
      "calcul-augmentation-de-salaire.webp",
    );
    expect(getCalculatorCover("indemnite-licenciement").src).toContain(
      "Calcul-indemnit",
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
      "Diff",
    );
  });

  it("exposes hub and FAQ covers", () => {
    expect(HOME_COVER.src).toContain("Calculer-salaire-brut-vers-net.webp");
    expect(GUIDES_HUB_COVER.src).toContain("Guides.webp");
    expect(TOOLS_HUB_COVER.src).toContain("Nos outils.webp");
    expect(FAQ_COVER.src).toContain("FAQ.webp");
  });

  it("encodes accents and spaces in absolute asset URLs", () => {
    const url = toAbsoluteAssetUrl(
      "https://brut-vers-net.fr",
      "/images/og/Le-prélèvement-à-la-source.webp",
    );
    expect(url).toBe(
      "https://brut-vers-net.fr/images/og/Le-pr%C3%A9l%C3%A8vement-%C3%A0-la-source.webp",
    );
    expect(url).not.toContain("localhost");

    const spaced = toAbsoluteAssetUrl(
      "https://brut-vers-net.fr",
      "/images/og/Nos outils.webp",
    );
    expect(spaced).toContain("Nos%20outils.webp");
  });
});
