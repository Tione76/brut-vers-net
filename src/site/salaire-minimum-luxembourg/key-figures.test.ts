import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getGuideBySlug } from "@/site/guides/registry";
import {
  LU_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
  LU_MIN_WAGE_LABELS as L,
  LU_MIN_WAGE_SLUG,
  LU_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  LU_SSM_CURRENT_FROM_LABEL,
} from "./data";
import { LuMinWageKeyFigures } from "./LuMinWageKeyFigures";

const html = renderToStaticMarkup(createElement(LuMinWageKeyFigures));
const flat = (value: string) => value.replace(/\s+/g, " ");
const text = flat(
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x27;|&#39;/g, "'"),
);

describe("encadré L'essentiel (Luxembourg)", () => {
  it("met le mensuel adulte non qualifié en avant, puis l'horaire et le qualifié", () => {
    expect(text).toContain(flat(LU_MIN_WAGE_AMOUNTS_BLOCK_TITLE));
    expect(text).toContain("En vigueur");
    expect(text).toContain(flat(`${L.adultUnskilledMonthly} brut par mois`));
    expect(text).toContain("Adulte non qualifié · temps plein");
    expect(text).toContain(`Depuis le ${LU_SSM_CURRENT_FROM_LABEL}`);
    expect(text).toContain(flat(`${L.adultUnskilledHourly} brut / heure`));
    expect(text).toContain(flat(`${L.adultSkilledMonthly} brut par mois`));
    expect(text).toContain("Sous conditions de qualification professionnelle");
    expect(text).toContain("Des barèmes spécifiques s'appliquent aux moins de 18 ans.");
    expect(text).toContain(`Vérification documentaire le ${LU_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}.`);
  });

  it("suit l'ordre de lecture : mensuel, horaire, qualifié, jeunes, vérification", () => {
    const order = [
      LU_MIN_WAGE_AMOUNTS_BLOCK_TITLE,
      L.adultUnskilledMonthly,
      L.adultUnskilledHourly,
      L.adultSkilledMonthly,
      "moins de 18 ans",
      LU_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
    ].map((needle) => text.indexOf(flat(needle)));
    expect(order.every((index) => index >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it("n'affiche pas le projet 2027 et distingue le statut par un libellé", () => {
    expect(text).toContain("Salaire social minimum actuel");
    expect(text).not.toContain("À venir");
    expect(text).not.toContain("2027");
    expect(text).not.toContain("3,8");
    expect(html).not.toMatch(/<h1/);
    expect(html).toMatch(/<section[^>]+aria-labelledby="essentiel-salaire-minimum-luxembourg"/);
    expect(html).toMatch(/<h2[^>]+id="essentiel-salaire-minimum-luxembourg"/);
    expect(html.match(/<h3/g)).toHaveLength(3);
    expect(html).not.toContain("\u2014");
    expect(html).toContain('href="#qualification"');
  });

  it("remplace le quickSummary partagé sur cette seule page", () => {
    expect(getGuideBySlug(LU_MIN_WAGE_SLUG)?.quickSummary).toBeUndefined();
    const page = readFileSync(
      join(process.cwd(), "src/app/salaire-minimum-luxembourg/page.tsx"),
      "utf8",
    );
    expect(page).toContain("afterIntroduction={<LuMinWageKeyFigures />}");
    expect(getGuideBySlug("smic")?.quickSummary).toBeDefined();
  });
});
