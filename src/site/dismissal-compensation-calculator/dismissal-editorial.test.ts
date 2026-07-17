import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  dismissalFaq,
  exampleFourYears2000,
  exampleTwelveYearsNineMonths2500,
} from "./dismissal-editorial-data";
import { formatCurrency } from "@/site/salary-calculator";

const root = dirname(fileURLToPath(import.meta.url));

function readSource(relativePath: string): string {
  return readFileSync(join(root, relativePath), "utf8");
}

describe("contenu éditorial - indemnité de licenciement", () => {
  const editorialSource = readSource("DismissalCompensationEditorial.tsx");
  const dataSource = readSource("dismissal-editorial-data.ts");
  const sidebarSource = readSource("dismissal-sidebar.tsx");
  const pageSource = readFileSync(
    join(root, "../../app/calculateurs/indemnite-licenciement/page.tsx"),
    "utf8",
  );

  it("ne mentionne plus la comparaison conventionnelle automatique", () => {
    const forbidden = [
      "montant conventionnel connu",
      "compare à l'estimation légale",
      "retient le plus élevé",
      "comparer un montant conventionnel",
    ];
    for (const phrase of forbidden) {
      expect(editorialSource).not.toContain(phrase);
      expect(dataSource).not.toContain(phrase);
    }
  });

  it("présente clairement le seuil de 8 mois", () => {
    expect(editorialSource).toContain("mois d&apos;ancienneté ininterrompue");
    expect(editorialSource).toContain("DISMISSAL_CONFIG.minSeniorityMonths");
    expect(dataSource).toContain("8 mois d'ancienneté ininterrompue");
  });

  it("explique les situations particulières et l'alerte du calculateur", () => {
    expect(editorialSource).toMatch(
      /Quand l(?:'|&apos;)estimation doit-elle être vérifiée \?/,
    );
    expect(editorialSource).toContain("id=\"quand-estimation-a-verifier\"");
    expect(editorialSource).toContain("temps plein / temps partiel");
    expect(editorialSource).toContain("alerte");
  });

  it("décrit les règles 1/4 puis 1/3", () => {
    expect(editorialSource).toContain("salaire de référence × 1/4 × ancienneté");
    expect(editorialSource).toContain("salaire de référence × 1/4 × 10");
    expect(editorialSource).toMatch(
      /1\/3 × nombre d(?:'|&apos;)années et de mois complets au-delà de 10 ans/,
    );
    expect(editorialSource).toContain(
      "Les mois complets au-delà de 10 ans sont également pris en compte proportionnellement",
    );
  });

  it("précise la nuance sur l'inaptitude professionnelle", () => {
    expect(editorialSource).toMatch(/double de l(?:'|&apos;)indemnité légale/);
    expect(editorialSource).toContain(
      "n&apos;est pas inclus dans le montant principal du calculateur",
    );
    expect(dataSource).toContain("règle particulière");
  });

  it("supprime la phrase illogique sur le calculateur Brut vers Net", () => {
    expect(editorialSource).not.toContain("Pour affiner votre salaire brut");
    expect(editorialSource).not.toMatch(/calculateur Brut vers Net/);
  });

  it("conserve un lien contextuel vers le calculateur d'heures supplémentaires", () => {
    expect(editorialSource).toContain("/calculateurs/salaire-heures-supplementaires");
  });

  it("expose des ancres uniques et cohérentes avec le sommaire", () => {
    const anchorIds = [
      "comment-calculer-indemnite",
      "qui-peut-recevoir",
      "salaire-reference",
      "anciennete",
      "moins-de-10-ans",
      "plus-de-10-ans",
      "convention-collective",
      "montants-exclus",
      "quand-estimation-a-verifier",
      "exemples-indemnite",
      "en-resume",
      "faq-indemnite-licenciement",
    ];

    for (const id of anchorIds) {
      expect(editorialSource).toContain(`id="${id}"`);
      expect(editorialSource).toContain(`href="#${id}"`);
    }

    const matches = editorialSource.match(/id="([^"]+)"/g) ?? [];
    const ids = matches.map((match) => match.slice(4, -1));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("utilise des libellés raccourcis dans le sommaire", () => {
    expect(editorialSource).toContain("Comment calculer l&apos;indemnité ?</a>");
    expect(editorialSource).toContain("Quel salaire est retenu ?</a>");
    expect(editorialSource).toContain("Indemnité jusqu&apos;à 10 ans</a>");
    expect(editorialSource).toContain("Indemnité après 10 ans</a>");
    expect(editorialSource).toContain("Convention collective</a>");
    expect(editorialSource).toContain("Montants non inclus</a>");
    expect(editorialSource).toMatch(/Situations nécessitant une vérification/);
    expect(editorialSource).toContain("Exemples de calcul</a>");
  });

  it("utilise des titres H2 complets dans le corps de page", () => {
    expect(editorialSource).toMatch(
      /Comment calculer l(?:'|&apos;)indemnité avec moins de 10 ans/,
    );
    expect(editorialSource).toMatch(
      /Comment calculer l(?:'|&apos;)indemnité après 10 ans d(?:'|&apos;)ancienneté \?/,
    );
    expect(editorialSource).not.toContain("Quelle indemnité avec moins de 10 ans");
    expect(editorialSource).not.toContain("Quelle indemnité après 10 ans d'ancienneté ?");
  });

  it("met à jour la question FAQ sur les mois supplémentaires", () => {
    expect(dataSource).toContain(
      "Comment les mois supplémentaires d'ancienneté sont-ils pris en compte ?",
    );
    expect(dataSource).not.toContain("Les mois incomplets d'ancienneté comptent-ils ?");
    expect(
      dismissalFaq.some((item) =>
        item.question.includes("Comment les mois supplémentaires d'ancienneté"),
      ),
    ).toBe(true);
  });

  it("expose une date de revue éditoriale explicite, non liée au build", () => {
    expect(dataSource).toContain('export const DISMISSAL_CONTENT_REVIEW_DATE = "2026-07-16"');
    expect(dataSource).toContain("Ne pas dériver automatiquement du build");
    expect(dataSource).not.toContain("DISMISSAL_CONFIG.lastReviewedAt");
    expect(editorialSource).toContain("DISMISSAL_CONTENT_REVIEW_DATE");
  });

  it("présente deux cartes d'exemples avec montant final mis en valeur", () => {
    expect(editorialSource).toContain("dismissal-example-card");
    expect(editorialSource).toContain("dismissal-example-card__total");
    expect(editorialSource).toContain("Reproduisez votre propre situation dans le calculateur");
  });

  it("compacte légèrement la sidebar sans en retirer les visuels", () => {
    expect(sidebarSource).toContain("dismissal-sidebar");
    expect(readSource("dismissal-compensation-calculator.css")).toContain(".dismissal-sidebar");
  });

  it("aligne la FAQ visible et le JSON-LD sur la même source", () => {
    expect(pageSource).toContain("buildFaqSchema(dismissalFaq)");
    expect(pageSource).toContain("from \"@/site/dismissal-compensation-calculator/DismissalCompensationEditorial\"");
    expect(dismissalFaq.length).toBe(16);
    expect(dismissalFaq.some((item) => item.question.includes("temps plein et à temps partiel"))).toBe(
      true,
    );
    expect(dismissalFaq.some((item) => item.question.includes("arrêt maladie ou un congé parental"))).toBe(
      true,
    );
  });

  it("conserve un CTA accessible vers le calculateur", () => {
    expect(editorialSource).toContain("DismissalCalculatorCta");
    expect(readSource("DismissalCalculatorCta.tsx")).toContain('CALCULATOR_ANCHOR_ID = "calculateur"');
    expect(readSource("DismissalCalculatorCta.tsx")).toContain("Calculer mon indemnité");
    expect(readSource("DismissalCalculatorCta.tsx")).toContain("scrollIntoView");
  });

  it("limite la sidebar à trois outils et trois guides", () => {
    expect(sidebarSource).toContain("CURATED_TOOL_IDS");
    expect(sidebarSource).toContain("brut-vers-net");
    expect(sidebarSource).toContain("augmentation-salaire");
    expect(sidebarSource).toContain("salaire-heures-supplementaires");
    expect(sidebarSource.match(/slug: "/g)?.length).toBe(3);
    expect(sidebarSource).not.toContain("comment-calculer-son-salaire-net");
  });

  it("génère des exemples cohérents avec le moteur", () => {
    const ex4 = exampleFourYears2000();
    const ex129 = exampleTwelveYearsNineMonths2500();

    expect(ex4?.retainedAmount).toBe(2000);
    expect(ex129?.retainedAmount).toBeCloseTo(8541.67, 2);
    expect(ex129?.firstBracketAmount).toBe(6250);
    expect(ex129?.secondBracketAmount).toBeCloseTo(2291.67, 2);

    expect(editorialSource).toContain("{example4YearsAmount}");
    expect(editorialSource).toContain("{example129Amount}");
    expect(editorialSource).toContain("{example129FirstBracketAmount}");
    expect(editorialSource).toContain("{example129SecondBracketAmount}");
    expect(formatCurrency(ex4!.retainedAmount)).toBe("2\u202f000,00\u00a0€");
  });
});
