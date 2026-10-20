import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { EMPLOYMENT_PROFILES } from "@/site/salary-calculator/config";

const editorialSource = readFileSync(
  join(process.cwd(), "src/site/home-editorial.tsx"),
  "utf8",
);
const sourcesSource = readFileSync(
  join(process.cwd(), "src/site/home-official-sources.tsx"),
  "utf8",
);
const layoutSource = readFileSync(
  join(process.cwd(), "src/framework/layouts/CalculatorPageLayout.tsx"),
  "utf8",
);

const guideSlugs = [
  "comment-est-calcule-le-salaire-net",
  "comment-calculer-son-salaire-net",
  "cotisations-salariales-pourquoi-brut-plus-eleve-que-net",
  "prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne",
  "comment-lire-une-fiche-de-paie",
] as const;

describe("home-editorial : méthodologie", () => {
  it("conserve l'ancre #methodologie et met à jour titre + sommaire", () => {
    expect(editorialSource).toContain('id: "methodologie"');
    expect(editorialSource).toContain("Méthode de calcul brut vers net");
    expect(editorialSource).toContain('id="methodologie"');
    expect(editorialSource).toContain(
      "Comment notre calculateur convertit le salaire brut en net",
    );
    expect(editorialSource).not.toContain("Comment fonctionne notre calculateur ?");

    const methodologieToc = editorialSource.indexOf('id: "methodologie"');
    const faqToc = editorialSource.indexOf('id: "faq"');
    const sourcesToc = editorialSource.indexOf('id: "sources-officielles"');
    expect(methodologieToc).toBeGreaterThan(-1);
    expect(faqToc).toBeGreaterThan(methodologieToc);
    expect(sourcesToc).toBeGreaterThan(faqToc);
  });

  it("expose une section sources officielles après la FAQ", () => {
    expect(editorialSource).toContain('id: "sources-officielles"');
    expect(sourcesSource).toContain('id="sources-officielles"');
    expect(sourcesSource).toContain("Sources officielles et références");
    expect(sourcesSource).toContain("HOME_OFFICIAL_SOURCES");
    expect(sourcesSource).toContain("taux non personnalisé");
    expect(layoutSource).toContain("HomeOfficialSourcesSection");
    const faqSectionIdx = layoutSource.indexOf('id="faq"');
    const sourcesImportIdx = layoutSource.indexOf("<HomeOfficialSourcesSection");
    expect(faqSectionIdx).toBeGreaterThan(-1);
    expect(sourcesImportIdx).toBeGreaterThan(faqSectionIdx);
    expect(editorialSource).not.toContain("Assurance chômage</li>");
  });

  it("ne décrit plus de majoration forfaitaire de mutuelle dans le net imposable", () => {
    expect(editorialSource).not.toContain("40 €");
    expect(editorialSource).not.toContain("40 euros");
    expect(editorialSource).toMatch(/Aucun montant forfaitaire de\s+mutuelle patronale/);
    expect(editorialSource).toContain("net avant impôt + CSG non déductible + CRDS");
  });

  it("documente coefficients, formules, sources et base horaire", () => {
    expect(editorialSource).toContain("buildMethodologyProfiles");
    expect(editorialSource).toContain("METHODOLOGY_MONTHLY_HOURS_LABEL");
    expect(editorialSource).toContain("Les coefficients utilisés");
    expect(editorialSource).toContain(
      "Ces coefficients correspondent à une estimation moyenne des cotisations sociales selon",
    );
    expect(editorialSource).toContain("Principe de calcul");
    expect(editorialSource).toContain(
      "Salaire net estimé avant impôt = salaire brut × coefficient du profil",
    );
    expect(editorialSource).toContain(
      "Salaire net après impôt = salaire net estimé avant impôt − prélèvement à la source",
    );
    expect(editorialSource).toContain(
      "Salaire brut estimé = salaire net avant impôt ÷ coefficient du profil",
    );
    expect(editorialSource).toContain(
      "Salaire mensuel brut = taux horaire brut × {METHODOLOGY_MONTHLY_HOURS_LABEL} heures ×",
    );
    expect(editorialSource).toContain("Sources et méthode");
    expect(editorialSource).toContain("À retenir");

    for (const profile of EMPLOYMENT_PROFILES) {
      expect(editorialSource).toContain("contributionSharePercent");
      expect(profile.coefficient).toBeGreaterThan(0);
    }
  });

  it("propose un maillage interne unique vers des guides existants", () => {
    for (const slug of guideSlugs) {
      const href = `/guides/${slug}`;
      expect(editorialSource).toContain(href);
      const occurrences = editorialSource.split(href).length - 1;
      expect(occurrences).toBe(1);
    }
  });

  it("n'utilise pas de tiret cadratin", () => {
    expect(editorialSource).not.toContain("\u2014");
  });
});
