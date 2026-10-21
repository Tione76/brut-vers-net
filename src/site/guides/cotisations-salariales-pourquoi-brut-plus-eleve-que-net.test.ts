import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getGuideBySlug } from "./registry";
import { buildGuideTocH2 } from "./utils";

const slug = "cotisations-salariales-pourquoi-brut-plus-eleve-que-net";

const OFFICIAL_SOURCES = {
  urssafTaux:
    "https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/taux-cotisations-secteur-prive.html",
  cotisations: "https://www.service-public.fr/particuliers/vosdroits/F2302",
  fichePaie: "https://www.service-public.fr/particuliers/vosdroits/F559",
  agircArrco:
    "https://www.agirc-arrco.fr/entreprises/mon-entreprise/calculer-et-declarer/le-calcul-des-cotisations-de-retraite-complementaire/",
  urssafCsg:
    "https://www.urssaf.fr/accueil/employeur/cotisations/liste-cotisations/csg-crds.html",
  securiteSociale:
    "https://www.securite-sociale.fr/la-secu-cest-quoi/organisation/les-branches",
} as const;

describe("cotisations-salariales-pourquoi-brut-plus-eleve-que-net", () => {
  it("conserve le titre, la date de mise à jour et les métadonnées SEO", () => {
    const guide = getGuideBySlug(slug)!;
    expect(guide.title).toBe(
      "Cotisations salariales : pourquoi mon salaire brut est-il plus élevé que mon salaire net ?",
    );
    expect(guide.updatedAt).toBe("2026-10-21");
    expect(guide.seoTitle).toBe(
      "Cotisations salariales : pourquoi le salaire brut est plus élevé que le net ?",
    );
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

    expect(toc).toHaveLength(11);
    expect(methodoIdx).toBeGreaterThan(faqIdx);
    expect(methodoIdx).toBeGreaterThan(conclusionIdx);
    expect(methodoIdx).toBe(toc.length - 1);
    expect(toc.filter((entry) => entry.id === "methodologie-sources")).toHaveLength(1);
  });

  it("rappelle les coefficients indicatifs et cite les sources officielles retenues", () => {
    const guide = getGuideBySlug(slug)!;
    const bibliography = JSON.stringify(guide.bibliography);

    expect(bibliography).toContain("cotisations et contributions salariales");
    expect(bibliography).toContain("ne sont pas des taux réglementaires universels");
    expect(bibliography).toContain("Le bulletin de paie reste la référence");
    expect(bibliography).toContain(OFFICIAL_SOURCES.urssafTaux);
    expect(bibliography).toContain(OFFICIAL_SOURCES.cotisations);
    expect(bibliography).toContain(OFFICIAL_SOURCES.fichePaie);
    expect(bibliography).toContain(OFFICIAL_SOURCES.agircArrco);
    expect(bibliography).toContain(OFFICIAL_SOURCES.urssafCsg);
    expect(bibliography).toContain(OFFICIAL_SOURCES.securiteSociale);
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
