import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import {
  buildGrossToNetOgAlt,
  buildGrossToNetOgImageInput,
  grossToNetOgImagePath,
  GROSS_TO_NET_OG_CONTENT_TYPE,
  GROSS_TO_NET_OG_SIZE,
  GROSS_TO_NET_OG_STATIC_PATH,
} from "./og-image";

describe("og-image série salaire brut → net", () => {
  it("pointe vers l’image sociale statique unique de la série 1200×630", () => {
    expect(grossToNetOgImagePath(1550)).toBe(GROSS_TO_NET_OG_STATIC_PATH);
    expect(grossToNetOgImagePath(2000)).toBe(GROSS_TO_NET_OG_STATIC_PATH);
    const input = buildGrossToNetOgImageInput(1550);
    expect(input).toEqual({
      url: GROSS_TO_NET_OG_STATIC_PATH,
      width: GROSS_TO_NET_OG_SIZE.width,
      height: GROSS_TO_NET_OG_SIZE.height,
      alt: buildGrossToNetOgAlt(1550),
      type: GROSS_TO_NET_OG_CONTENT_TYPE,
    });
    expect(buildGrossToNetOgImageInput(2000).alt).toBe(buildGrossToNetOgAlt(2000));
    expect(buildGrossToNetOgImageInput(2000).url).toBe(input.url);
    expect(GROSS_TO_NET_OG_CONTENT_TYPE).toBe("image/jpeg");
  });

  it("expose un fichier JPEG public et plus de route ImageResponse", () => {
    expect(
      existsSync(resolve(process.cwd(), `public${GROSS_TO_NET_OG_STATIC_PATH}`)),
    ).toBe(true);
    expect(
      existsSync(resolve(process.cwd(), "src/app/salaire-brut-net/opengraph-image.tsx")),
    ).toBe(false);
    expect(
      existsSync(resolve(process.cwd(), "src/app/salaire-brut-net/[montant]/opengraph-image.tsx")),
    ).toBe(false);
    expect(
      existsSync(resolve(process.cwd(), "src/site/salaire-brut-net/og-image-jsx.tsx")),
    ).toBe(false);
  });
});
