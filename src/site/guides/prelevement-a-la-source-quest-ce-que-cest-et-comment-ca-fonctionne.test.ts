import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getGuideBySlug } from "./registry";
import { buildGuideTocH2 } from "./utils";

const slug = "prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne";

const OFFICIAL_SOURCES = {
  pas: "https://www.service-public.fr/particuliers/vosdroits/F34009",
  fichePaie: "https://www.service-public.fr/particuliers/vosdroits/F559",
  changerTaux: "https://www.service-public.fr/particuliers/vosdroits/F35894",
  gererPas: "https://www.impots.gouv.fr/gerer-mon-prelevement-la-source",
  individualisation:
    "https://www.impots.gouv.fr/particulier/lindividualisation-des-taux-de-prelevement",
  baremeNeutre:
    "https://bofip.impots.gouv.fr/bofip/11255-PGP.html/identifiant=BOI-BAREME-000037-20260706",
} as const;

describe("prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne", () => {
  it("conserve le titre, la date de mise à jour et les métadonnées SEO", () => {
    const guide = getGuideBySlug(slug)!;
    expect(guide.title).toBe(
      "Prélèvement à la source : qu'est-ce que c'est et comment ça fonctionne ?",
    );
    expect(guide.updatedAt).toBe("2026-10-21");
    expect(guide.seoTitle).toBe("Prélèvement à la source : fonctionnement et calcul");
  });

  it("place la méthodologie et les sources après la conclusion, une seule fois", () => {
    const guide = getGuideBySlug(slug)!;
    const toc = buildGuideTocH2(guide);

    expect(guide.sections.some((section) => section.id === "methodologie-sources")).toBe(
      false,
    );
    expect(guide.bibliography?.id).toBe("methodologie-sources");
    expect(guide.bibliography?.title).toBe("Méthodologie et sources");
    expect(guide.bibliographyPlacement ?? "after-conclusion").toBe("after-conclusion");

    const faqIdx = toc.findIndex((entry) => entry.id === "faq");
    const conclusionIdx = toc.findIndex((entry) => entry.id === "conclusion");
    const methodoIdx = toc.findIndex((entry) => entry.id === "methodologie-sources");

    expect(toc).toHaveLength(14);
    expect(methodoIdx).toBeGreaterThan(faqIdx);
    expect(methodoIdx).toBeGreaterThan(conclusionIdx);
    expect(methodoIdx).toBe(toc.length - 1);
    expect(toc.filter((entry) => entry.id === "methodologie-sources")).toHaveLength(1);
  });

  it("rappelle les limites du simulateur et cite les sources fiscales retenues", () => {
    const guide = getGuideBySlug(slug)!;
    const bibliography = JSON.stringify(guide.bibliography);

    expect(bibliography).toContain("prélèvement à la source de l'impôt sur le revenu");
    expect(bibliography).toContain("ne détermine pas le taux fiscal personnel");
    expect(bibliography).toContain("ne correspond pas nécessairement à l'impôt définitif");
    expect(bibliography).toContain(OFFICIAL_SOURCES.pas);
    expect(bibliography).toContain(OFFICIAL_SOURCES.fichePaie);
    expect(bibliography).toContain(OFFICIAL_SOURCES.changerTaux);
    expect(bibliography).toContain(OFFICIAL_SOURCES.gererPas);
    expect(bibliography).toContain(OFFICIAL_SOURCES.individualisation);
    expect(bibliography).toContain(OFFICIAL_SOURCES.baremeNeutre);
  });

  it("branche la bibliographie depuis la page générique des guides", () => {
    const pageSource = readFileSync(
      join(process.cwd(), "src/app/guides/[slug]/page.tsx"),
      "utf8",
    );
    expect(pageSource).toContain("bibliography={guide.bibliography}");
    expect(pageSource).toContain("bibliographyPlacement={guide.bibliographyPlacement}");
  });
});
