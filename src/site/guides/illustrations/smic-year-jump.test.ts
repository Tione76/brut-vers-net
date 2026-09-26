import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SMIC_HISTORY_YEARS, yearAnchor } from "@/site/smic-history";
import { SmicYearJump } from "./SmicYearJump";

const html = renderToStaticMarkup(createElement(SmicYearJump));

describe("accès direct à une année du tableau", () => {
  it("propose chaque année de 1950 à 2026, vers l'ancre existante", () => {
    expect(html).toContain('id="smic-year-jump"');
    expect(html).toContain("Aller à l&#x27;année");
    expect(SMIC_HISTORY_YEARS[0]).toBe(1950);
    expect(SMIC_HISTORY_YEARS.at(-1)).toBe(2026);
    for (const year of SMIC_HISTORY_YEARS) {
      expect(html).toContain(`<option value="${year}">${year}</option>`);
    }
    expect(yearAnchor(2022)).toBe("smic-2022");
    expect(yearAnchor(2007)).toBe("smic-2007");
  });

  it("reste utilisable au clavier et n'invente pas une valeur annuelle", () => {
    expect(html).toContain("<select");
    expect(html).toContain('for="smic-year-jump"');
    expect(html).not.toContain("valeur de l'année");
    expect(html).toContain("première ligne de cette année");
  });
});
