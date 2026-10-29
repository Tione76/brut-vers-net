import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getGuideBySlug } from "@/site/guides/registry";
import {
  BE_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
  BE_MIN_WAGE_LABELS as L,
  BE_MIN_WAGE_SLUG,
  BE_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  BE_RMMMG_CURRENT_FROM_LABEL,
} from "./data";
import { BeMinWageKeyFigures } from "./BeMinWageKeyFigures";

const html = renderToStaticMarkup(createElement(BeMinWageKeyFigures));
const flat = (value: string) => value.replace(/\s+/g, " ");
const text = flat(
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&apos;/g, "'"),
);

describe("encadré L'essentiel (Belgique)", () => {
  it("met le RMMMG en avant, avec la nuance moyenne, le barème sectoriel et l'horaire indicatif", () => {
    expect(text).toContain(flat(BE_MIN_WAGE_AMOUNTS_BLOCK_TITLE));
    expect(text).toContain("En vigueur");
    expect(text).toContain("Revenu minimum mensuel moyen garanti");
    expect(text).toContain(flat(`${L.adultMonthly} brut par mois`));
    expect(text).toContain("CCT n° 43");
    expect(text).toContain(`Depuis le ${BE_RMMMG_CURRENT_FROM_LABEL}`);
    expect(text).toContain("revenu moyen de référence, pas nécessairement le salaire de base");
    expect(text).toContain("Votre barème sectoriel compte");
    expect(text).toContain(flat(`${L.adultHourly} brut / heure`));
    expect(text).toContain("Ce n'est pas un salaire horaire belge universel");
    expect(text).toContain(`Vérification documentaire le ${BE_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}.`);
  });

  it("suit l'ordre de lecture : montant, nuance, secteur, horaire, vérification", () => {
    const order = [
      BE_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
      L.adultMonthly,
      "revenu moyen de référence",
      "Votre barème sectoriel compte",
      L.adultHourly,
      BE_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
    ].map((needle) => text.indexOf(flat(needle)));
    expect(order.every((index) => index >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it("n'affiche pas de SMIC régional ni de majoration qualifié copiée du Luxembourg", () => {
    expect(text).not.toContain("Wallonie");
    expect(text).not.toContain("Flandre");
    expect(text).not.toContain("qualifié");
    expect(text).not.toContain("120 %");
    expect(html).not.toMatch(/<h1/);
    expect(html).toMatch(/<section[^>]+aria-labelledby="essentiel-salaire-minimum-belgique"/);
    expect(html).toMatch(/<h2[^>]+id="essentiel-salaire-minimum-belgique"/);
    expect(html.match(/<h3/g)).toHaveLength(3);
    expect(html).not.toContain("\u2014");
    expect(html).toContain('href="#commission-paritaire"');
  });

  it("remplace le quickSummary partagé sur cette seule page", () => {
    expect(getGuideBySlug(BE_MIN_WAGE_SLUG)?.quickSummary).toBeUndefined();
    const page = readFileSync(
      join(process.cwd(), "src/app/salaire-minimum-belgique/page.tsx"),
      "utf8",
    );
    expect(page).toContain("afterIntroduction={<BeMinWageKeyFigures />}");
    expect(getGuideBySlug("smic")?.quickSummary).toBeDefined();
  });
});
