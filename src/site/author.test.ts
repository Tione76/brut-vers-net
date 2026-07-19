import { describe, expect, it } from "vitest";
import { SITE_AUTHOR } from "./author";
import { formatLongDateFr } from "./dates";
import { isPathIndexable, getAllPublicPages } from "./public-pages";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("auteur éditorial", () => {
  it("expose un chemin stable /auteur/antoine indexable", () => {
    expect(SITE_AUTHOR.path).toBe("/auteur/antoine");
    expect(SITE_AUTHOR.name).toBe("Antoine");
    expect(isPathIndexable(SITE_AUTHOR.path)).toBe(true);
    expect(getAllPublicPages().some((p) => p.path === SITE_AUTHOR.path)).toBe(true);
  });

  it("aligne la date affichée sur la date calendaire Schema.org", () => {
    expect(formatLongDateFr("2026-07-15")).toBe("15 juillet 2026");
    expect(formatLongDateFr("2026-07-15T09:00:00+02:00")).toBe("15 juillet 2026");
  });

  it("affiche l'auteur sur les pages guides", () => {
    const source = readFileSync(
      join(process.cwd(), "src/app/guides/[slug]/page.tsx"),
      "utf8",
    );
    expect(source).toContain("GuideAuthorMeta");
    expect(source).toContain("updatedAt={guide.updatedAt}");
  });
});
