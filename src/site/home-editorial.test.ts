import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { EMPLOYMENT_PROFILES } from "@/site/salary-calculator/config";

const editorialSource = readFileSync(
  join(process.cwd(), "src/site/home-editorial.tsx"),
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
    expect(editorialSource).toContain('href="#methodologie"');
    expect(editorialSource).toContain(">Méthode de calcul brut vers net</a>");
    expect(editorialSource).toContain('id="methodologie"');
    expect(editorialSource).toContain(
      "Comment notre calculateur convertit le salaire brut en net",
    );
    expect(editorialSource).not.toContain("Comment fonctionne notre calculateur ?");

    const methodologieToc = editorialSource.indexOf('href="#methodologie"');
    const faqToc = editorialSource.indexOf('href="#faq"');
    expect(methodologieToc).toBeGreaterThan(-1);
    expect(faqToc).toBeGreaterThan(methodologieToc);
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
