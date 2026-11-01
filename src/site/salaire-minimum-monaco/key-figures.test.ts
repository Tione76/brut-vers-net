import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getGuideBySlug } from "@/site/guides/registry";
import {
  MC_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
  MC_MIN_WAGE_LABELS as L,
  MC_MIN_WAGE_SLUG,
  MC_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  MC_SMIC_CURRENT_FROM_LABEL,
} from "./data";
import { McMinWageKeyFigures } from "./McMinWageKeyFigures";

const html = renderToStaticMarkup(createElement(McMinWageKeyFigures));
const flat = (value: string) => value.replace(/\s+/g, " ");
const text = flat(
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&apos;/g, "'"),
);

describe("encadré L'essentiel (Monaco)", () => {
  it("met l'horaire de base en avant, puis le mensuel, les 5 % et le total avant retenues", () => {
    expect(text).toContain(flat(MC_MIN_WAGE_AMOUNTS_BLOCK_TITLE));
    expect(text).toContain("En vigueur");
    expect(text).toContain(flat(`${L.hourly} brut / heure`));
    expect(text).toContain(`Depuis le ${MC_SMIC_CURRENT_FROM_LABEL}`);
    expect(text).toContain("39 h par semaine, soit 169 h par mois");
    expect(text).toContain("Hors indemnité de 5 %");
    expect(text).toContain(flat(L.indemnity));
    expect(text).toContain(
      "Base + indemnité de 5 %, avant déduction des cotisations applicables et avant impôt éventuel",
    );
    expect(text).toContain(flat(L.totalBeforeDeductions));
    expect(text).toContain("Ce n'est pas un salaire net");
    expect(text).toContain(`Vérification documentaire le ${MC_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}.`);
  });

  it("n'emploie pas de libellés de conception et ne présente pas le total comme un net", () => {
    expect(text).not.toContain("Réponse principale");
    expect(text).not.toContain("Cadre national");
    expect(text).not.toContain("Bloc de statut");
    expect(text).toContain("Ce n'est pas un salaire net");
    expect(html).not.toMatch(/<h1/);
    expect(html).toMatch(/<section[^>]+aria-labelledby="essentiel-salaire-minimum-monaco"/);
    expect(html).toMatch(/<h2[^>]+id="essentiel-salaire-minimum-monaco"/);
    expect(html.match(/<h3/g)).toHaveLength(3);
    expect(html).not.toContain("\u2014");
    expect(html).toContain('href="#indemnite-5-pourcent"');
  });

  it("remplace le quickSummary partagé sur cette seule page", () => {
    expect(getGuideBySlug(MC_MIN_WAGE_SLUG)?.quickSummary).toBeUndefined();
    const page = readFileSync(
      join(process.cwd(), "src/app/salaire-minimum-monaco/page.tsx"),
      "utf8",
    );
    expect(page).toContain("afterIntroduction={<McMinWageKeyFigures />}");
    expect(page).toContain("Dernière mise à jour le {MC_MIN_WAGE_UPDATED_AT_LABEL}");
    expect(page).not.toContain("GuideAuthorMeta");
  });
});
