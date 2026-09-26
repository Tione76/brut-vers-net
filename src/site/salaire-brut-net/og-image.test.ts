import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import {
  buildGrossToNetOgAlt,
  buildGrossToNetOgImageInput,
  formatGrossToNetOgHeadline,
  grossToNetOgImagePath,
  GROSS_TO_NET_OG_SIZE,
} from "./og-image";

describe("og-image série salaire brut → net", () => {
  it("formate les titres sociaux en français", () => {
    expect(formatGrossToNetOgHeadline(1000)).toMatch(/1\u202f000.*€ BRUT \/ MOIS/);
    expect(formatGrossToNetOgHeadline(1550)).toMatch(/1\u202f550.*€ BRUT \/ MOIS/);
    expect(formatGrossToNetOgHeadline(2000)).toMatch(/2\u202f000.*€ BRUT \/ MOIS/);
    expect(formatGrossToNetOgHeadline(2500)).toMatch(/2\u202f500.*€ BRUT \/ MOIS/);
    expect(formatGrossToNetOgHeadline(3500)).toMatch(/3\u202f500.*€ BRUT \/ MOIS/);
  });

  it("pointe vers l’image sociale unique de la série 1200×630", () => {
    expect(grossToNetOgImagePath(1550)).toBe("/salaire-brut-net/opengraph-image");
    expect(grossToNetOgImagePath(2000)).toBe("/salaire-brut-net/opengraph-image");
    const input = buildGrossToNetOgImageInput(1550);
    expect(input).toEqual({
      url: "/salaire-brut-net/opengraph-image",
      width: GROSS_TO_NET_OG_SIZE.width,
      height: GROSS_TO_NET_OG_SIZE.height,
      alt: buildGrossToNetOgAlt(1550),
      type: "image/png",
    });
    expect(buildGrossToNetOgImageInput(2000).alt).toBe(buildGrossToNetOgAlt(2000));
    expect(buildGrossToNetOgImageInput(2000).url).toBe(input.url);
  });

  it("s’appuie sur le fichier opengraph-image unique de la série", () => {
    expect(
      existsSync(resolve(process.cwd(), "src/app/salaire-brut-net/opengraph-image.tsx")),
    ).toBe(true);
    expect(
      existsSync(resolve(process.cwd(), "src/app/salaire-brut-net/[montant]/opengraph-image.tsx")),
    ).toBe(false);
  });
});
