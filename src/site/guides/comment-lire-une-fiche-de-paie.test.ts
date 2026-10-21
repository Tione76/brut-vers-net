import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getGuideBySlug } from "./registry";
import { buildGuideTocH2 } from "./utils";

const slug = "comment-lire-une-fiche-de-paie";

const OFFICIAL_SOURCES = {
  fichePaie: "https://www.service-public.fr/particuliers/vosdroits/F559",
  cotisations: "https://www.service-public.fr/particuliers/vosdroits/F2302",
  urssaf:
    "https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/taux-cotisations-secteur-prive.html",
  pas: "https://www.service-public.fr/particuliers/vosdroits/F34009",
  agircArrco:
    "https://www.agirc-arrco.fr/entreprises/mon-entreprise/calculer-et-declarer/le-calcul-des-cotisations-de-retraite-complementaire/",
} as const;

describe("comment-lire-une-fiche-de-paie", () => {
  it("conserve le titre, la date de mise à jour et les métadonnées SEO", () => {
    const guide = getGuideBySlug(slug)!;
    expect(guide.title).toBe("Comment lire une fiche de paie ?");
    expect(guide.updatedAt).toBe("2026-10-21");
    expect(guide.seoTitle).toBe("Comment lire une fiche de paie ? | Guide pratique");
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

    expect(toc).toHaveLength(12);
    expect(methodoIdx).toBeGreaterThan(faqIdx);
    expect(methodoIdx).toBeGreaterThan(conclusionIdx);
    expect(methodoIdx).toBe(toc.length - 1);
    expect(toc.filter((entry) => entry.id === "methodologie-sources")).toHaveLength(1);
  });

  it("rappelle le caractère indicatif des exemples et cite les cinq sources officielles", () => {
    const guide = getGuideBySlug(slug)!;
    const bibliography = JSON.stringify(guide.bibliography);

    expect(bibliography).toContain("méthode pédagogique de lecture du bulletin");
    expect(bibliography).toContain("ne constituent pas une reconstitution réglementaire exacte");
    expect(bibliography).toContain(OFFICIAL_SOURCES.fichePaie);
    expect(bibliography).toContain(OFFICIAL_SOURCES.cotisations);
    expect(bibliography).toContain(OFFICIAL_SOURCES.urssaf);
    expect(bibliography).toContain(OFFICIAL_SOURCES.pas);
    expect(bibliography).toContain(OFFICIAL_SOURCES.agircArrco);
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
