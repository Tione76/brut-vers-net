import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getGuideBySlug } from "@/site/guides/registry";
import {
  UK_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
  UK_MIN_WAGE_LABELS as L,
  UK_MIN_WAGE_SLUG,
  UK_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  UK_NMW_EFFECTS_FROM_LABEL,
} from "./data";
import { UkMinWageKeyFigures } from "./UkMinWageKeyFigures";

const html = renderToStaticMarkup(createElement(UkMinWageKeyFigures));
const flat = (value: string) => value.replace(/\s+/g, " ");
const text = flat(
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&apos;/g, "'"),
);

describe("encadré L'essentiel (Royaume-Uni)", () => {
  it("met le National Living Wage en avant, puis l'exemple à 37,5 h", () => {
    expect(text).toContain(flat(UK_MIN_WAGE_AMOUNTS_BLOCK_TITLE));
    expect(text).toContain("En vigueur");
    expect(text).toContain("National Living Wage");
    expect(text).toContain(flat(`${L.nlw} brut par heure`));
    expect(text).toContain("21 ans et plus");
    expect(text).toContain("hors taux apprenti applicable");
    expect(text).toContain(`Effets au ${UK_NMW_EFFECTS_FROM_LABEL}`);
    expect(text).toContain(`Exemple à ${L.hours375} h par semaine`);
    expect(text).toContain(flat(`${L.monthly375} brut par mois`));
    expect(text).toContain("Moyenne indicative sur 52 semaines");
    expect(text).toContain(`Vérification documentaire le ${UK_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}.`);
  });

  it("suit l'ordre de lecture : montant horaire, exemple mensuel, vérification", () => {
    const order = [
      UK_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
      "En vigueur",
      L.nlw,
      "brut par heure",
      L.monthly375,
      "Moyenne indicative sur 52 semaines",
      UK_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
    ].map((needle) => text.indexOf(flat(needle)));
    expect(order.every((index) => index >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it("n'affiche pas tous les taux, ni 2027 comme chiffre dominant", () => {
    expect(text).not.toContain(L.youth);
    expect(text).not.toContain(L.announced2027Nlw);
    expect(text).not.toContain(L.rlwLondon);
    expect(html).not.toMatch(/<h1/);
    expect(html).toMatch(/<section[^>]+aria-labelledby="essentiel-salaire-minimum-royaume-uni"/);
    expect(html).toMatch(/<h2[^>]+id="essentiel-salaire-minimum-royaume-uni"/);
    expect(html.match(/<h3/g)).toHaveLength(2);
    expect(html).not.toContain("\u2014");
    expect(html).toContain('href="#bareme-age"');
    expect(html).toContain('href="#evolution"');
  });

  it("remplace le quickSummary partagé sur cette seule page", () => {
    expect(getGuideBySlug(UK_MIN_WAGE_SLUG)?.quickSummary).toBeUndefined();
    const page = readFileSync(
      join(process.cwd(), "src/app/salaire-minimum-royaume-uni/page.tsx"),
      "utf8",
    );
    expect(page).toContain("afterIntroduction={<UkMinWageKeyFigures />}");
    expect(getGuideBySlug("smic")?.quickSummary).toBeDefined();
  });
});
