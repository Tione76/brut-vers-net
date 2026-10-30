import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getGuideBySlug } from "@/site/guides/registry";
import {
  PT_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
  PT_MIN_WAGE_LABELS as L,
  PT_MIN_WAGE_SLUG,
  PT_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  PT_RMMG_EFFECTS_FROM_LABEL,
} from "./data";
import { PtMinWageKeyFigures } from "./PtMinWageKeyFigures";

const html = renderToStaticMarkup(createElement(PtMinWageKeyFigures));
const flat = (value: string) => value.replace(/\s+/g, " ");
const text = flat(
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&apos;/g, "'"),
);

describe("encadré L'essentiel (Portugal)", () => {
  it("met le montant continental en avant, puis l'annuel, la moyenne 12 mois et les territoires", () => {
    expect(text).toContain(flat(PT_MIN_WAGE_AMOUNTS_BLOCK_TITLE));
    expect(text).toContain("En vigueur");
    expect(text).toContain("Retribuição mínima mensal garantida");
    expect(text).toContain("Portugal continental");
    expect(text).toContain(flat(`${L.continentalMonthly} brut par mois de référence`));
    expect(text).toContain(`Effets au ${PT_RMMG_EFFECTS_FROM_LABEL}`);
    expect(text).toContain("Repère annuel, continent");
    expect(text).toContain(flat(`${L.continentalAnnual} brut par an`));
    expect(text).toContain("Équivalent moyen sur 12 mois");
    expect(text).toContain(flat(`${L.continentalTwelve} brut par mois`));
    expect(text).toContain("pas un second salaire minimum mensuel légal");
    expect(text).toContain("Açores");
    expect(text).toContain(L.azoresMonthly);
    expect(text).toContain("Madère");
    expect(text).toContain(L.madeiraMonthly);
    expect(text).toContain(`Vérification documentaire le ${PT_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}.`);
  });

  it("suit l'ordre de lecture : continent, annuel, moyenne, territoires, vérification", () => {
    const order = [
      PT_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
      L.continentalMonthly,
      "Repère annuel, continent",
      L.continentalAnnual,
      "Équivalent moyen sur 12 mois",
      L.continentalTwelve,
      "Régions autonomes",
      L.azoresMonthly,
      PT_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
    ].map((needle) => text.indexOf(flat(needle)));
    expect(order.every((index) => index >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it("n'affiche pas Lisbonne comme minimum distinct ni un net universel", () => {
    expect(text).not.toContain("Lisbonne");
    expect(text).not.toContain("Porto");
    expect(text).not.toContain("Algarve");
    expect(text).not.toContain("818,80");
    expect(html).not.toMatch(/<h1/);
    expect(html).toMatch(/<section[^>]+aria-labelledby="essentiel-salaire-minimum-portugal"/);
    expect(html).toMatch(/<h2[^>]+id="essentiel-salaire-minimum-portugal"/);
    expect(html.match(/<h3/g)).toHaveLength(4);
    expect(html).not.toContain("\u2014");
    expect(html).toContain('href="#quatorze-versements"');
    expect(html).toContain('href="#territoires"');
  });

  it("remplace le quickSummary partagé sur cette seule page", () => {
    expect(getGuideBySlug(PT_MIN_WAGE_SLUG)?.quickSummary).toBeUndefined();
    const page = readFileSync(
      join(process.cwd(), "src/app/salaire-minimum-portugal/page.tsx"),
      "utf8",
    );
    expect(page).toContain("afterIntroduction={<PtMinWageKeyFigures />}");
    expect(getGuideBySlug("smic")?.quickSummary).toBeDefined();
  });
});
