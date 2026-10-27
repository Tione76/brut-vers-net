import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getGuideBySlug } from "@/site/guides/registry";
import {
  DE_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
  DE_MIN_WAGE_CURRENT_FROM_LABEL,
  DE_MIN_WAGE_LABELS as L,
  DE_MIN_WAGE_NEXT_FROM_LABEL,
  DE_MIN_WAGE_SLUG,
  DE_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
} from "./data";
import { DeMinWageKeyFigures } from "./DeMinWageKeyFigures";

const html = renderToStaticMarkup(createElement(DeMinWageKeyFigures));
const flat = (value: string) => value.replace(/\s+/g, " ");
const text = flat(
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x27;|&#39;/g, "'"),
);

describe("encadré L'essentiel (Allemagne)", () => {
  it("reprend les montants et dates des données sans les dupliquer", () => {
    expect(text).toContain(flat(DE_MIN_WAGE_AMOUNTS_BLOCK_TITLE));
    expect(text).toContain(flat(`${L.currentHourlyShort} brut par heure`));
    expect(text).toContain(`Depuis le ${DE_MIN_WAGE_CURRENT_FROM_LABEL}`);
    expect(text).toContain("Exemple pour 35 h par semaine");
    expect(text).toContain(flat(`${L.monthly35} brut par mois`));
    expect(text).toContain("Moyenne théorique calculée sur 52 semaines.");
    expect(text).toContain(flat(`${L.nextHourlyShort} brut par heure`));
    expect(text).toContain(`À partir du ${DE_MIN_WAGE_NEXT_FROM_LABEL}, pas encore applicable.`);
    expect(text).toContain(`Vérification documentaire le ${DE_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}.`);
  });

  it("suit l'ordre de lecture : actuel, mensuel, futur, vérification", () => {
    const order = [
      DE_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
      L.currentHourlyShort,
      L.monthly35,
      L.nextHourlyShort,
      DE_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
    ].map((needle) => text.indexOf(flat(needle)));
    expect(order.every((index) => index >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it("distingue actuel et futur par des libellés, pas seulement par la couleur", () => {
    expect(text).toContain("Salaire minimum actuel");
    expect(text).toContain("En vigueur");
    expect(text).toContain("Prochaine hausse");
    expect(text).toContain("À venir");
    expect(text.match(/pas encore applicable/g)).toHaveLength(1);
    expect(text).not.toContain("Mensuel variable");
  });

  it("n'ajoute ni H1 ni tiret cadratin, et lie le titre à la section", () => {
    expect(html).not.toMatch(/<h1/);
    expect(html).toMatch(/<section[^>]+aria-labelledby="essentiel-salaire-minimum-allemagne"/);
    expect(html).toMatch(/<h2[^>]+id="essentiel-salaire-minimum-allemagne"/);
    expect(html.match(/<h3/g)).toHaveLength(3);
    expect(html).not.toContain("\u2014");
    expect(html).toContain('href="#exceptions"');
  });

  it("remplace le quickSummary partagé sur cette seule page", () => {
    expect(getGuideBySlug(DE_MIN_WAGE_SLUG)?.quickSummary).toBeUndefined();
    const page = readFileSync(
      join(process.cwd(), "src/app/salaire-minimum-allemagne/page.tsx"),
      "utf8",
    );
    expect(page).toContain("afterIntroduction={<DeMinWageKeyFigures />}");
    expect(getGuideBySlug("smic")?.quickSummary).toBeDefined();
  });
});
