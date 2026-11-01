import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getGuideBySlug } from "@/site/guides/registry";
import {
  IT_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
  IT_MIN_WAGE_LABELS as L,
  IT_MIN_WAGE_SLUG,
  IT_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
} from "./data";
import { ItMinWageKeyFigures } from "./ItMinWageKeyFigures";

const html = renderToStaticMarkup(createElement(ItMinWageKeyFigures));
const flat = (value: string) => value.replace(/\s+/g, " ");
const text = flat(
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&apos;/g, "'"),
);

describe("encadré L'essentiel (Italie)", () => {
  it("répond sans montant national ni exemple de branche en gros", () => {
    expect(text).toContain(flat(IT_MIN_WAGE_AMOUNTS_BLOCK_TITLE));
    expect(text).toContain("Pas de SMIC national unique");
    expect(text.split("Pas de SMIC national unique").length - 1).toBe(1);
    expect(text).not.toContain("Cadre italien");
    expect(text).not.toContain("Réponse principale");
    expect(text).toContain("Votre référence : le CCNL applicable");
    expect(text).toContain("Le montant dépend du secteur et du niveau");
    expect(text).toContain("Comparez aussi le nombre de mensualités");
    expect(text).toContain(`Vérification documentaire le ${IT_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}.`);
    expect(text).not.toContain(flat(L.commerceIvTotal));
    expect(text).not.toContain(flat(L.metalD1));
    expect(text).not.toContain("9 €");
    expect(text).not.toContain("0 €");
  });

  it("suit l'ordre : cadre, CCNL, secteur, mensualités, vérification", () => {
    const order = [
      IT_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
      "Pas de SMIC national unique",
      "Votre référence : le CCNL applicable",
      "Le montant dépend du secteur et du niveau",
      "Comparez aussi le nombre de mensualités",
      IT_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
    ].map((needle) => text.indexOf(flat(needle)));
    expect(order.every((index) => index >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it("n'ajoute ni H1 ni tiret cadratin, et lie les sections utiles", () => {
    expect(html).not.toMatch(/<h1/);
    expect(html).toMatch(/<section[^>]+aria-labelledby="essentiel-salaire-minimum-italie"/);
    expect(html).toMatch(/<h2[^>]+id="essentiel-salaire-minimum-italie"/);
    expect(html.match(/<h3/g)).toHaveLength(3);
    expect(html).not.toContain("\u2014");
    expect(html).toContain('href="#trouver-ccnl"');
    expect(html).toContain('href="#minima-par-secteur"');
    expect(html).toContain('href="#treizieme-quatorzieme-mois"');
  });

  it("remplace le quickSummary partagé sur cette seule page", () => {
    expect(getGuideBySlug(IT_MIN_WAGE_SLUG)?.quickSummary).toBeUndefined();
    const page = readFileSync(
      join(process.cwd(), "src/app/salaire-minimum-italie/page.tsx"),
      "utf8",
    );
    expect(page).toContain("afterIntroduction={<ItMinWageKeyFigures />}");
    expect(page).toContain("Dernière mise à jour le {IT_MIN_WAGE_UPDATED_AT_LABEL}");
    expect(page).not.toContain("GuideAuthorMeta");
  });
});
