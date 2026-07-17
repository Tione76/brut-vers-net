import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = dirname(fileURLToPath(import.meta.url));

function readSource(relativePath: string): string {
  return readFileSync(join(root, relativePath), "utf8");
}

describe("UX inaptitude/fiabilisation (situations particulières) - indemnite de licenciement", () => {
  const resultsSource = readSource("DismissalCompensationResults.tsx");
  const cssSource = readSource("dismissal-compensation-calculator.css");
  const resultsLayoutSource = resultsSource.slice(
    resultsSource.indexOf("const dimmedClass = shouldDimResults"),
  );

  it("affiche l'encadré principal « Estimation à vérifier »", () => {
    expect(resultsSource).toContain("Estimation à vérifier");
    expect(resultsSource).toContain("aria-live=\"polite\"");
    expect(resultsSource).toContain("dismissal-results__warning");
  });

  it("place l'avertissement après le résultat principal et le détail, pas au-dessus", () => {
    const mainCardIndex = resultsLayoutSource.indexOf(
      "increase-calc__gain-card increase-calc__gain-card--filled",
    );
    const detailIndex = resultsLayoutSource.indexOf("Détail de votre estimation");
    const warningIndex = resultsLayoutSource.indexOf("TrustWarningPanel");
    const bonASavoirIndex = resultsLayoutSource.indexOf('aria-label="Bon à savoir"');

    expect(mainCardIndex).toBeGreaterThan(-1);
    expect(detailIndex).toBeGreaterThan(mainCardIndex);
    expect(warningIndex).toBeGreaterThan(detailIndex);
    expect(bonASavoirIndex).toBeGreaterThan(warningIndex);
  });

  it("grise uniquement les blocs de résultats, pas l'avertissement", () => {
    expect(cssSource).toContain(".dismissal-results__dimmed");
    expect(cssSource).toContain("opacity: 0.32");
    expect(cssSource).toContain("pointer-events: none");
    expect(resultsLayoutSource).toMatch(
      /<div className=\{dimmedClass\}>[\s\S]*<\/div>\s*\{shouldDimResults \? \([\s\S]*TrustWarningPanel/,
    );
    expect(resultsLayoutSource).toMatch(
      /TrustWarningPanel[\s\S]*<div className=\{dimmedClass\}>[\s\S]*Bon à savoir/,
    );
  });

  it("renforce visuellement le titre de l'avertissement", () => {
    expect(cssSource).toContain(".dismissal-results__warning-title");
    expect(cssSource).toContain("clamp(1.15rem, 2vw, 1.4rem)");
    expect(cssSource).toContain("font-weight: 700");
  });

  it("remplace le sous-titre par « Résultat indicatif non fiabilisé » et ajoute le badge « À vérifier »", () => {
    expect(resultsSource).toContain("Résultat indicatif non fiabilisé");
    expect(resultsSource).toContain("dismissal-results__verify-badge");
    expect(resultsSource).toContain("À vérifier");
  });

  it("désactive l'accordéon « Voir le détail du calcul » quand le résultat est grisé", () => {
    expect(resultsSource).toContain("Voir le détail du calcul");
    expect(resultsSource).toContain("tabIndex={shouldDimResults ? -1 : 0}");
    expect(resultsSource).toContain('aria-disabled={shouldDimResults ? "true" : undefined}');
  });

  it("affiche plusieurs explications (puces) si plusieurs situations sont sélectionnées", () => {
    expect(resultsSource).toContain("dismissal-results__warning-bullets");
    expect(resultsSource).toContain("selectedSpecialSituations.map");
  });
});

