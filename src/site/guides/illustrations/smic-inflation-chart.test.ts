import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  INFLATION_CHART_SUBTITLE,
  INFLATION_CHART_TITLE,
  INFLATION_LAST_POINT,
  SMIC_INFLATION_POINTS,
} from "@/site/smic-history/inflation-chart";
import { SmicInflationIllustration } from "./SmicInflationIllustration";

/** Entités HTML et espaces insécables normalisés pour comparer du texte lisible. */
function normalize(markup: string): string {
  return markup
    .replace(/&#x27;/g, "'")
    .replace(/&#xE9;|&eacute;/g, "é")
    .replace(/\u00a0/g, " ");
}

const html = normalize(renderToStaticMarkup(createElement(SmicInflationIllustration)));

describe("rendu initial du graphique des indices", () => {
  it("affiche titre, sous-titre et légende hors de la zone SVG", () => {
    const svg = html.slice(html.indexOf("<svg"), html.indexOf("</svg>"));
    expect(html).toContain(INFLATION_CHART_TITLE);
    expect(html).toContain(normalize(INFLATION_CHART_SUBTITLE));
    expect(html).toContain("Prix à la consommation, y compris tabac");
    expect(svg).not.toContain("<text");
    expect(svg).not.toContain(INFLATION_CHART_TITLE);
  });

  it("montre une observation publiée dès le rendu initial", () => {
    expect(html).toContain('class="smic-chart__readout-year">2025<');
    expect(html).toContain("4e trimestre");
    expect(html).toContain("octobre à décembre");
    expect(html).toContain(">260,54<");
    expect(html).toContain(">182,79<");
    expect(html).toContain("base 100 en mars 1990");
  });

  it("place le repère et les deux marqueurs à la même date", () => {
    const x = INFLATION_LAST_POINT.x;
    expect(html).toContain(`class="smic-chart__crosshair" style="left:${x}%"`);
    expect(html).toContain(
      `data-era="prices" style="left:${x}%;top:${INFLATION_LAST_POINT.yPrice}%"`,
    );
    expect(html).toContain(
      `data-era="smic" style="left:${x}%;top:${INFLATION_LAST_POINT.ySmic}%"`,
    );
  });

  it("reste consultable au clavier et décrit pour les lecteurs d'écran", () => {
    expect(html).toContain('role="group"');
    expect(html).toContain('tabindex="0"');
    expect(html).toContain('aria-describedby="smic-inflation-chart-description"');
    expect(html).toContain("Échap pour libérer la sélection");
    expect(html).toContain('aria-live="polite"');
  });

  it("propose les sélecteurs d'année et de trimestre, synchronisés sur la sélection", () => {
    expect(html).toContain('for="smic-inflation-chart-year"');
    expect(html).toContain('for="smic-inflation-chart-quarter"');
    expect(html).toContain('<option value="2025" selected="">2025</option>');
    expect(html).toContain(
      `<option value="${INFLATION_LAST_POINT.index}" selected="">4e trimestre 2025</option>`,
    );
    // Le trimestre est explicite : aucune option ne prétend valoir pour l'année.
    expect(html).not.toContain("<option value=\"2025\">Valeur de l'année</option>");
    expect(html.match(/<option value="\d+"[^>]*>\d(?:er|e) trimestre 2025<\/option>/g)).toHaveLength(4);
  });

  it("n'affiche le bouton Fermer qu'une fois la sélection verrouillée", () => {
    expect(html).not.toContain("smic-chart__close");
  });

  it("explique la lecture de l'indice sans conclure sur le pouvoir d'achat", () => {
    expect(html).toContain("Au-dessus de 100, l'indice a augmenté par rapport à mars 1990");
    expect(html).toContain("jamais un point intermédiaire");
    expect(html).toContain("des indices, pas des montants en euros");
    expect(html).toContain("sert à comparer les évolutions historiques");
    expect(html).toContain("différent de l'indice de référence utilisé pour la revalorisation légale");
    expect(html).toContain("ne suffit pas à conclure sur le pouvoir d'achat");
  });

  it("garde les graduations d'années lisibles", () => {
    for (const year of [1990, 2000, 2010, 2020, 2025]) {
      expect(html).toContain(`>${year}</span>`);
    }
    expect(html.match(/data-minor="true"/g)).toHaveLength(2);
  });

  it("dessine une observation par trimestre publié", () => {
    const smicPath = html.match(/smic-chart__line--smic" d="([^"]+)"/)?.[1] ?? "";
    expect(smicPath.match(/[ML]/g)).toHaveLength(SMIC_INFLATION_POINTS.length);
  });
});
