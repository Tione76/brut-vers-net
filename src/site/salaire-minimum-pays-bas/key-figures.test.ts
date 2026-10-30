import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getGuideBySlug } from "@/site/guides/registry";
import {
  NL_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
  NL_MIN_WAGE_LABELS as L,
  NL_MIN_WAGE_SLUG,
  NL_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  NL_NMW_EFFECTS_FROM_LABEL,
} from "./data";
import { NlMinWageKeyFigures } from "./NlMinWageKeyFigures";

const html = renderToStaticMarkup(createElement(NlMinWageKeyFigures));
const flat = (value: string) => value.replace(/\s+/g, " ");
const text = flat(
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&apos;/g, "'"),
);

describe("encadré L'essentiel (Pays-Bas)", () => {
  it("met le minimumuurloon en avant, puis l'exemple à 36 h hors pécule", () => {
    expect(text).toContain(flat(NL_MIN_WAGE_AMOUNTS_BLOCK_TITLE));
    expect(text).toContain("En vigueur");
    expect(text).toContain("Wettelijk minimumuurloon");
    expect(text).toContain(flat(`${L.adult} brut par heure`));
    expect(text).toContain("21 ans et plus");
    expect(text).toContain("Pays-Bas européens");
    expect(text).toContain(`Depuis le ${NL_NMW_EFFECTS_FROM_LABEL}`);
    expect(text).toContain(`Exemple à ${L.hours36} h par semaine`);
    expect(text).toContain(flat(`${L.monthly36} brut par mois`));
    expect(text).toContain("Moyenne indicative sur 52 semaines, hors pécule de vacances");
    expect(text).toContain("au moins 8 %");
    expect(text).toContain(`Vérification documentaire le ${NL_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}.`);
  });

  it("suit l'ordre de lecture : montant horaire, exemple mensuel, pécule, vérification", () => {
    const order = [
      NL_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
      "En vigueur",
      L.adult,
      "brut par heure",
      L.monthly36,
      "hors pécule de vacances",
      "8 %",
      NL_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
    ].map((needle) => text.indexOf(flat(needle)));
    expect(order.every((index) => index >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it("n'affiche pas tous les taux, ni 2027 comme chiffre dominant", () => {
    expect(text).not.toContain(L.age20);
    expect(text).not.toContain(L.bbl20);
    expect(text).not.toContain(L.announced2027Adult);
    expect(html).not.toMatch(/<h1/);
    expect(html).toMatch(/<section[^>]+aria-labelledby="essentiel-salaire-minimum-pays-bas"/);
    expect(html).toMatch(/<h2[^>]+id="essentiel-salaire-minimum-pays-bas"/);
    expect(html.match(/<h3/g)).toHaveLength(2);
    expect(html).not.toContain("\u2014");
    expect(html).toContain('href="#pecule-vacances"');
    expect(html).toContain('href="#bareme-age"');
  });

  it("remplace le quickSummary partagé sur cette seule page", () => {
    expect(getGuideBySlug(NL_MIN_WAGE_SLUG)?.quickSummary).toBeUndefined();
    const page = readFileSync(
      join(process.cwd(), "src/app/salaire-minimum-pays-bas/page.tsx"),
      "utf8",
    );
    expect(page).toContain("afterIntroduction={<NlMinWageKeyFigures />}");
    expect(getGuideBySlug("smic")?.quickSummary).toBeDefined();
  });
});
