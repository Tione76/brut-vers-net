/**
 * Mapping couverture : route / identifiant → fichier covers/
 */
import { describe, expect, it } from "vitest";
import {
  CALCULATOR_COVERS,
  FAQ_COVER,
  GUIDE_COVERS,
  GUIDES_HUB_COVER,
  GROSS_TO_NET_SERIES_COVER,
  HOME_COVER,
  NET_TO_GROSS_SERIES_COVER,
  PEXELS_LICENSE_URL,
  TOOLS_HUB_COVER,
  formatCoverCredit,
  getCalculatorCover,
  getCoverLicenseUrl,
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
        "pourquoi-salaire-net-change-septembre-2026",
        "smic",
        "smic-hotelier",
        "smic-europe",
        "evolution-smic",
        "salaire-interim-calcul-brut-net",
        "salaire-arret-maladie",
        "calcul-ijss-arret-maladie",
        "maintien-salaire-arret-maladie",
        "salaire-moyen-france",
        "quel-est-un-bon-salaire-en-france",
        "salaire-alternance",
      ]),
    );
    expect(getGuideCover("comment-est-calcule-le-salaire-net")?.src).toContain(
      "Comment-calculer-salaire-net.webp",
    );
    const interimCover = getGuideCover("salaire-interim-calcul-brut-net");
    expect(interimCover?.src).toBe(
      "/images/covers/guides/Salaire-brut-net-interim.webp",
    );
    expect(formatCoverCredit(interimCover!.credit)).toBe(
      "Photo de Tiger Lily via Pexels",
    );
    expect(interimCover?.width).toBe(1200);
    expect(interimCover?.height).toBe(800);
    expect(interimCover?.alt).toBe(
      "Deux agents logistiques transportant des cartons dans un entrepôt",
    );
    const arretMaladieCover = getGuideCover("salaire-arret-maladie");
    expect(arretMaladieCover?.src).toBe(
      "/images/covers/guides/salaire-arret-maladie.webp",
    );
    expect(formatCoverCredit(arretMaladieCover!.credit)).toBe(
      "Photo de Gustavo Fring via Pexels",
    );
    expect(arretMaladieCover?.credit.photographer).toBe("Gustavo Fring");
    expect(arretMaladieCover?.credit.source).toBe("Pexels");
    expect(arretMaladieCover?.credit.text).toBe("Photo de Gustavo Fring via Pexels");
    expect(arretMaladieCover?.width).toBe(1200);
    expect(arretMaladieCover?.height).toBe(800);
    expect(arretMaladieCover?.alt).toBe(
      "Homme en veste et écharpe se mouchant à un bureau lumineux, avec ordinateur portable, mouchoirs et casque audio",
    );
    expect(arretMaladieCover?.alt.toLowerCase()).not.toContain("salaire");
    expect(arretMaladieCover?.alt.toLowerCase()).not.toContain("gustavo");
    expect(arretMaladieCover?.alt.toLowerCase()).not.toContain("pexels");
    const ijssCover = getGuideCover("calcul-ijss-arret-maladie");
    expect(ijssCover?.src).toBe("/images/covers/guides/calcul-ijss-prive.webp");
    expect(ijssCover?.src).not.toMatch(/[A-Z]/);
    expect(ijssCover?.src).not.toMatch(/[éèàùâêîôûçÉÈÀÙ]/);
    expect(ijssCover?.src).not.toContain(" ");
    expect(formatCoverCredit(ijssCover!.credit)).toBe(
      "Photo de kaboompics.com via Pexels",
    );
    expect(ijssCover?.credit.photographer).toBe("kaboompics.com");
    expect(ijssCover?.credit.source).toBe("Pexels");
    expect(ijssCover?.credit.text).toBe("Photo de kaboompics.com via Pexels");
    expect(ijssCover?.credit.acquireLicensePage).toBeUndefined();
    expect(ijssCover?.credit.copyrightNotice).toBeUndefined();
    expect(getCoverLicenseUrl(ijssCover!.credit)).toBe(PEXELS_LICENSE_URL);
    expect(ijssCover?.width).toBe(1200);
    expect(ijssCover?.height).toBe(800);
    expect(ijssCover?.alt).toBe(
      "Calcul des indemnités journalières de Sécurité sociale pendant un arrêt maladie",
    );
    expect(ijssCover?.caption).toBe(
      "Calcul des IJSS en arrêt maladie dans le secteur privé",
    );
    expect(ijssCover?.alt.toLowerCase()).not.toContain("kaboompics");
    expect(ijssCover?.alt.toLowerCase()).not.toContain("pexels");
    expect(ijssCover?.alt.toLowerCase()).not.toMatch(/^image de|^photo de/);
    const maintienCover = getGuideCover("maintien-salaire-arret-maladie");
    expect(maintienCover?.src).toBe(
      "/images/covers/guides/maintien-salaire-arret-maladie-prive.webp",
    );
    expect(formatCoverCredit(maintienCover!.credit)).toBe(
      "Photo de Gustavo Fring via Pexels",
    );
    expect(maintienCover?.credit.photographer).toBe("Gustavo Fring");
    expect(maintienCover?.credit.source).toBe("Pexels");
    expect(maintienCover?.credit.text).toBe("Photo de Gustavo Fring via Pexels");
    expect(maintienCover?.credit.acquireLicensePage).toBeUndefined();
    expect(maintienCover?.credit.copyrightNotice).toBeUndefined();
    expect(getCoverLicenseUrl(maintienCover!.credit)).toBe(PEXELS_LICENSE_URL);
    expect(maintienCover?.width).toBe(1200);
    expect(maintienCover?.height).toBe(800);
    expect(maintienCover?.alt).toBe(
      "Homme masqué en manteau et écharpe, tenant des feuilles à un bureau blanc, avec casque audio, lunettes et ordinateur portable",
    );
    expect(maintienCover?.alt.toLowerCase()).not.toContain("salaire");
    expect(maintienCover?.alt.toLowerCase()).not.toContain("gustavo");
    expect(maintienCover?.alt.toLowerCase()).not.toContain("pexels");
    expect(maintienCover?.alt.toLowerCase()).not.toMatch(/^image de|^photo de/);
    const septCover = getGuideCover("pourquoi-salaire-net-change-septembre-2026");
    expect(septCover?.src).toBe(
      "/images/covers/guides/Pourquoi-salaire-net-change-septembre-2026.webp",
    );
    expect(septCover?.src).not.toContain("Prélèvement-à-la-source");
    expect(formatCoverCredit(septCover!.credit)).toBe("Photo de Jakub Zerdzicki via Pexels");
    expect(septCover?.width).toBe(1200);
    expect(septCover?.height).toBe(801);

    const smicCover = getGuideCover("smic");
    expect(smicCover?.src).toBe("/images/covers/guides/SMIC-horaire-mensuel-brut-net.webp");
    expect(formatCoverCredit(smicCover!.credit)).toBe("Photo de Mikhail Nilov via Pexels");
    expect(smicCover?.credit.photographer).toBe("Mikhail Nilov");
    expect(smicCover?.credit.source).toBe("Pexels");
    expect(smicCover?.credit.acquireLicensePage).toBeUndefined();
    expect(smicCover?.credit.copyrightNotice).toBeUndefined();
    expect(getCoverLicenseUrl(smicCover!.credit)).toBe(PEXELS_LICENSE_URL);
    expect(smicCover?.width).toBe(1200);
    expect(smicCover?.height).toBe(800);
    expect(smicCover?.alt.length).toBeGreaterThan(20);
    expect(smicCover?.alt).not.toMatch(/SMIC/i);
    expect(smicCover?.alt).not.toMatch(/\d+\s*€/);

    const evolutionSmicCover = getGuideCover("evolution-smic");
    expect(evolutionSmicCover?.src).toBe(
      "/images/covers/guides/evolution-smic-france.webp",
    );
    expect(evolutionSmicCover?.src).not.toMatch(/[A-Z]/);
    expect(evolutionSmicCover?.src).not.toContain(" ");
    expect(formatCoverCredit(evolutionSmicCover!.credit)).toBe(
      "Photo de kaboompics.com via Pexels",
    );
    expect(evolutionSmicCover?.credit.photographer).toBe("kaboompics.com");
    expect(evolutionSmicCover?.credit.source).toBe("Pexels");
    expect(evolutionSmicCover?.credit.text).toBe("Photo de kaboompics.com via Pexels");
    expect(evolutionSmicCover?.credit.acquireLicensePage).toBeUndefined();
    expect(evolutionSmicCover?.credit.copyrightNotice).toBeUndefined();
    expect(getCoverLicenseUrl(evolutionSmicCover!.credit)).toBe(PEXELS_LICENSE_URL);
    expect(evolutionSmicCover?.width).toBe(1200);
    expect(evolutionSmicCover?.height).toBe(800);
    expect(evolutionSmicCover?.alt).toBe(
      "Main tenant un crayon et pointant un graphique financier épinglé sur un tableau blanc",
    );
    expect(evolutionSmicCover?.caption).toBe(
      "L'évolution du SMIC en France depuis 1950",
    );
    expect(evolutionSmicCover?.alt.toLowerCase()).not.toContain("smic");
    expect(evolutionSmicCover?.alt.toLowerCase()).not.toContain("kaboompics");
    expect(evolutionSmicCover?.alt.toLowerCase()).not.toContain("pexels");
    expect(evolutionSmicCover?.alt).not.toMatch(/19\d{2}|20\d{2}/);

    const salaireMoyenCover = getGuideCover("salaire-moyen-france");
    expect(salaireMoyenCover?.src).toBe("/images/covers/guides/Salaire-moyen-France.webp");
    expect(formatCoverCredit(salaireMoyenCover!.credit)).toBe(
      "Photo de olia danilevich via Pexels",
    );
    expect(salaireMoyenCover?.credit.photographer).toBe("olia danilevich");
    expect(salaireMoyenCover?.credit.source).toBe("Pexels");
    expect(salaireMoyenCover?.credit.acquireLicensePage).toBeUndefined();
    expect(salaireMoyenCover?.credit.copyrightNotice).toBeUndefined();
    expect(getCoverLicenseUrl(salaireMoyenCover!.credit)).toBe(PEXELS_LICENSE_URL);
    expect(salaireMoyenCover?.width).toBe(1201);
    expect(salaireMoyenCover?.height).toBe(801);
    expect(salaireMoyenCover?.alt.length).toBeGreaterThan(20);
    expect(salaireMoyenCover?.alt.toLowerCase()).not.toContain("salaire");
    expect(salaireMoyenCover?.alt).not.toMatch(/20\d{2}/);
    expect(salaireMoyenCover?.alt).not.toMatch(/\d+\s*€/);

    const bonSalaireCover = getGuideCover("quel-est-un-bon-salaire-en-france");
    expect(bonSalaireCover?.src).toBe("/images/covers/guides/bon-salaire-en-france.webp");
    expect(formatCoverCredit(bonSalaireCover!.credit)).toBe(
      "Photo de kaboompics via Pexels",
    );
    expect(bonSalaireCover?.credit.photographer).toBe("kaboompics");
    expect(bonSalaireCover?.credit.source).toBe("Pexels");
    expect(bonSalaireCover?.credit.acquireLicensePage).toBeUndefined();
    expect(bonSalaireCover?.credit.copyrightNotice).toBeUndefined();
    expect(getCoverLicenseUrl(bonSalaireCover!.credit)).toBe(PEXELS_LICENSE_URL);
    expect(bonSalaireCover?.width).toBe(1200);
    expect(bonSalaireCover?.height).toBe(800);
    expect(bonSalaireCover?.alt.length).toBeGreaterThan(20);
    expect(bonSalaireCover?.alt.toLowerCase()).not.toContain("salaire");
    expect(bonSalaireCover?.alt).not.toMatch(/20\d{2}/);
    expect(bonSalaireCover?.alt).not.toMatch(/\d+\s*€/);
    expect(bonSalaireCover?.alt.toLowerCase()).not.toContain("kaboompics");
    expect(bonSalaireCover?.alt.toLowerCase()).not.toContain("pexels");

    const salaireAlternanceCover = getGuideCover("salaire-alternance");
    expect(salaireAlternanceCover?.src).toBe(
      "/images/covers/guides/salaire-apparenti-alternant.webp",
    );
    expect(formatCoverCredit(salaireAlternanceCover!.credit)).toBe(
      "Photo par Gustavo Fring via Pexels",
    );
    expect(salaireAlternanceCover?.credit.photographer).toBe("Gustavo Fring");
    expect(salaireAlternanceCover?.credit.source).toBe("Pexels");
    expect(salaireAlternanceCover?.credit.text).toBe("Photo par Gustavo Fring via Pexels");
    expect(salaireAlternanceCover?.credit.acquireLicensePage).toBeUndefined();
    expect(salaireAlternanceCover?.credit.copyrightNotice).toBeUndefined();
    expect(getCoverLicenseUrl(salaireAlternanceCover!.credit)).toBe(PEXELS_LICENSE_URL);
    expect(salaireAlternanceCover?.width).toBe(1200);
    expect(salaireAlternanceCover?.height).toBe(800);
    expect(salaireAlternanceCover?.alt.length).toBeGreaterThan(20);
    expect(salaireAlternanceCover?.alt.toLowerCase()).not.toContain("salaire");
    expect(salaireAlternanceCover?.alt).not.toMatch(/20\d{2}/);
    expect(salaireAlternanceCover?.alt).not.toMatch(/\d+\s*€/);
    expect(salaireAlternanceCover?.alt.toLowerCase()).not.toContain("gustavo");
    expect(salaireAlternanceCover?.alt.toLowerCase()).not.toContain("pexels");

    const smicHotelierCover = getGuideCover("smic-hotelier");
    expect(smicHotelierCover?.src).toBe("/images/covers/guides/smic-hotelier.webp");
    expect(formatCoverCredit(smicHotelierCover!.credit)).toBe(
      "Photo de cottonbro studio via Pexels",
    );
    expect(smicHotelierCover?.width).toBe(1200);
    expect(smicHotelierCover?.height).toBe(800);
    expect(smicHotelierCover?.alt.toLowerCase()).not.toContain("salaire");
    expect(smicHotelierCover?.alt).not.toMatch(/20\d{2}/);

    const smicEuropeCover = getGuideCover("smic-europe");
    expect(smicEuropeCover?.src).toBe("/images/covers/guides/classement-smic-europe.webp");
    expect(formatCoverCredit(smicEuropeCover!.credit)).toBe("Photo de Oliver via Pexels");
    expect(smicEuropeCover?.width).toBe(1200);
    expect(smicEuropeCover?.height).toBe(800);
    expect(smicEuropeCover?.alt).toBe(
      "Drapeaux de la France, de l'Union européenne et de l'Allemagne flottant sur une colline, sous un ciel bleu",
    );
    expect(smicEuropeCover?.alt.toLowerCase()).not.toContain("salaire");
    expect(smicEuropeCover?.alt).not.toMatch(/20\d{2}/);
    expect(smicEuropeCover?.alt).not.toMatch(/\d+\s*€/);
    expect(smicEuropeCover?.alt.toLowerCase()).not.toContain("classement");
  });

  it("exposes hub and FAQ covers with credits", () => {
    expect(HOME_COVER.src).toContain("Calculateur-brut-vers-net.webp");
    expect(GUIDES_HUB_COVER.src).toContain("Guides-salaire-im");
    expect(TOOLS_HUB_COVER.src).toContain("Calculateurs-salaire.webp");
    expect(FAQ_COVER.src).toContain("Questions-sur-le-salaire.webp");
    expect(formatCoverCredit(HOME_COVER.credit)).toBe("Photo de Kindel Media via Pexels");
  });

  it("expose la cover unique de la série salaire brut mensuel → net", () => {
    expect(GROSS_TO_NET_SERIES_COVER.src).toBe(
      "/images/covers/series/Salaire-brut-mensuel-en-net.webp",
    );
    expect(GROSS_TO_NET_SERIES_COVER.width).toBe(1200);
    expect(GROSS_TO_NET_SERIES_COVER.height).toBe(800);
    expect(formatCoverCredit(GROSS_TO_NET_SERIES_COVER.credit)).toBe(
      "Photo de Mikhail Nilov via Pexels",
    );
    expect(GROSS_TO_NET_SERIES_COVER.alt).not.toMatch(/\d+\s*€/);
    expect(GROSS_TO_NET_SERIES_COVER.alt.length).toBeGreaterThan(20);
  });

  it("résout la licence Pexels sans inventer d'autres sources", () => {
    expect(getCoverLicenseUrl({ source: "Pexels" })).toBe(PEXELS_LICENSE_URL);
    expect(getCoverLicenseUrl({ source: "Unsplash" })).toBeUndefined();
  });

  it("expose la cover unique de la série salaire net mensuel → brut", () => {
    expect(NET_TO_GROSS_SERIES_COVER.src).toBe(
      "/images/covers/series/correspondance-salaire-brut-en-net.webp",
    );
    expect(NET_TO_GROSS_SERIES_COVER.width).toBe(1200);
    expect(NET_TO_GROSS_SERIES_COVER.height).toBe(800);
    expect(formatCoverCredit(NET_TO_GROSS_SERIES_COVER.credit)).toBe(
      "Photo de Mikhail Nilov via Pexels",
    );
    expect(NET_TO_GROSS_SERIES_COVER.alt).not.toMatch(/\d+\s*€/);
    expect(NET_TO_GROSS_SERIES_COVER.alt.length).toBeGreaterThan(20);
  });

  it("encodes accents in absolute asset URLs", () => {
    const url = toAbsoluteAssetUrl(
      "https://www.brut-vers-net.fr",
      "/images/covers/guides/Prélèvement-à-la-source.webp",
    );
    expect(url).toContain("Pr%C3%A9l%C3%A8vement-%C3%A0-la-source.webp");
    expect(url).not.toContain("localhost");
  });

  it("preserves cache-busting query strings on absolute asset URLs", () => {
    expect(toAbsoluteAssetUrl("https://www.brut-vers-net.fr", "/logo.png?v=2")).toBe(
      "https://www.brut-vers-net.fr/logo.png?v=2",
    );
  });
});
