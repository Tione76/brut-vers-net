import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getGuideBySlug } from "@/site/guides/registry";
import {
  CH_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
  CH_MIN_WAGE_LABELS as L,
  CH_MIN_WAGE_SLUG,
  CH_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  CH_MIN_WAGE_TERRITORIES as T,
} from "./data";
import { ChMinWageKeyFigures } from "./ChMinWageKeyFigures";

const html = renderToStaticMarkup(createElement(ChMinWageKeyFigures));
const flat = (value: string) => value.replace(/\s+/g, " ");
const text = flat(
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&apos;/g, "'"),
);

describe("encadré L'essentiel (Suisse)", () => {
  it("reprend les données de la page sans en faire un SMIC national", () => {
    expect(text).toContain(flat(CH_MIN_WAGE_AMOUNTS_BLOCK_TITLE));
    expect(text).toContain("Aucun salaire minimum national unique");
    expect(text).toContain(flat(L.geneveHourlyShort));
    expect(text).toContain("brut par heure, à Genève");
    expect(text).toContain(`En vigueur depuis le ${T.geneve.fromLabel}`);
    expect(text).toContain("Ce n'est pas un « SMIC suisse »");
    expect(text).toContain(flat(L.geneveMonthly40Official));
    expect(text).toContain("Montant publié par le canton de Genève");
    expect(text).toContain("convention collective de travail (CCT)");
    expect(text).toContain("contrat-type de travail (CTT)");
    expect(text).toContain(`Vérification documentaire le ${CH_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}.`);
  });

  it("suit l'ordre : cadre, exemple cantonal, secteur, vérification", () => {
    const order = [
      CH_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
      "Aucun salaire minimum national unique",
      L.geneveHourlyShort,
      L.geneveMonthly40Official,
      "Sans minimum cantonal",
      CH_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
    ].map((needle) => text.indexOf(flat(needle)));
    expect(order.every((index) => index >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it("n'isole pas le taux genevois ni un mensuel national", () => {
    expect(text).toContain("Exemple cantonal");
    expect(text).toContain("à Genève");
    expect(text).not.toContain("SMIC suisse unique");
    expect(text).not.toContain("salaire minimum mensuel national");
    expect(text).not.toContain(L.tessinRange);
    expect(text).not.toContain(L.zurichHourlyShort);
  });

  it("n'ajoute ni H1 ni tiret cadratin, et lie le titre à la section CCT", () => {
    expect(html).not.toMatch(/<h1/);
    expect(html).toMatch(/<section[^>]+aria-labelledby="essentiel-salaire-minimum-suisse"/);
    expect(html).toMatch(/<h2[^>]+id="essentiel-salaire-minimum-suisse"/);
    expect(html.match(/<h3/g)).toHaveLength(3);
    expect(html).not.toContain("\u2014");
    expect(html).toContain('href="#cct-ctt"');
  });

  it("remplace le quickSummary partagé sur cette seule page", () => {
    expect(getGuideBySlug(CH_MIN_WAGE_SLUG)?.quickSummary).toBeUndefined();
    const page = readFileSync(
      join(process.cwd(), "src/app/salaire-minimum-suisse/page.tsx"),
      "utf8",
    );
    expect(page).toContain("afterIntroduction={<ChMinWageKeyFigures />}");
    expect(getGuideBySlug("smic")?.quickSummary).toBeDefined();
    expect(getGuideBySlug("salaire-minimum-allemagne")?.quickSummary).toBeUndefined();
  });
});
