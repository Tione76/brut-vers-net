import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getGuideBySlug } from "@/site/guides/registry";
import {
  ES_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
  ES_MIN_WAGE_LABELS as L,
  ES_MIN_WAGE_SLUG,
  ES_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  ES_SMI_EFFECTS_FROM_LABEL,
} from "./data";
import { EsMinWageKeyFigures } from "./EsMinWageKeyFigures";

const html = renderToStaticMarkup(createElement(EsMinWageKeyFigures));
const flat = (value: string) => value.replace(/\s+/g, " ");
const text = flat(
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&apos;/g, "'"),
);

describe("encadré L'essentiel (Espagne)", () => {
  it("met le SMI à 14 versements en avant, puis l'équivalent 12 et le total annuel", () => {
    expect(text).toContain(flat(ES_MIN_WAGE_AMOUNTS_BLOCK_TITLE));
    expect(text).toContain("En vigueur");
    expect(text).toContain("Salario mínimo interprofesional");
    expect(text).toContain(flat(`${L.fourteenMonthly} brut par versement`));
    expect(text).toContain("14 versements par an");
    expect(text).toContain(`Effets au ${ES_SMI_EFFECTS_FROM_LABEL}`);
    expect(text).toContain("Même total, 12 versements");
    expect(text).toContain(flat(`${L.twelveMonthly} brut par mois`));
    expect(text).toContain("Total annuel de référence");
    expect(text).toContain(flat(`${L.annual} brut par an`));
    expect(text).toContain("On ne travaille pas 14 mois.");
    expect(text).toContain(`Vérification documentaire le ${ES_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}.`);
  });

  it("suit l'ordre de lecture : 14 versements, 12 versements, annuel, vérification", () => {
    const order = [
      ES_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
      L.fourteenMonthly,
      "Même total, 12 versements",
      L.twelveMonthly,
      "Total annuel de référence",
      L.annual,
      ES_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
    ].map((needle) => text.indexOf(flat(needle)));
    expect(order.every((index) => index >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it("n'affiche pas de SMI régional ni le taux horaire d'emploi à domicile", () => {
    expect(text).not.toContain("Madrid");
    expect(text).not.toContain("Catalogne");
    expect(text).not.toContain("9,55");
    expect(text).not.toContain("37,5");
    expect(html).not.toMatch(/<h1/);
    expect(html).toMatch(/<section[^>]+aria-labelledby="essentiel-salaire-minimum-espagne"/);
    expect(html).toMatch(/<h2[^>]+id="essentiel-salaire-minimum-espagne"/);
    expect(html.match(/<h3/g)).toHaveLength(3);
    expect(html).not.toContain("\u2014");
    expect(html).toContain('href="#quatorze-versements"');
  });

  it("remplace le quickSummary partagé sur cette seule page", () => {
    expect(getGuideBySlug(ES_MIN_WAGE_SLUG)?.quickSummary).toBeUndefined();
    const page = readFileSync(
      join(process.cwd(), "src/app/salaire-minimum-espagne/page.tsx"),
      "utf8",
    );
    expect(page).toContain("afterIntroduction={<EsMinWageKeyFigures />}");
    expect(getGuideBySlug("smic")?.quickSummary).toBeDefined();
  });
});
