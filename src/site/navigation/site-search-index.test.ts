import { describe, expect, it } from "vitest";
import { buildSearchIndex, searchSite } from "./site-search-index";

describe("site-search-index", () => {
  it("indexe calculateurs, guides et hubs", () => {
    const index = buildSearchIndex();
    expect(index.length).toBeGreaterThan(20);
    expect(index.some((entry) => entry.href === "/" && entry.category === "Calculateur")).toBe(
      true,
    );
    expect(index.some((entry) => entry.href === "/smic" && entry.category === "Guide")).toBe(true);
    expect(index.some((entry) => entry.href === "/guides")).toBe(true);
    expect(index.some((entry) => entry.href === "/nos-outils")).toBe(true);
  });

  it("retrouve des pages par titre sans accents", () => {
    const results = searchSite("prime activite");
    expect(results.some((entry) => entry.href === "/prime-activite")).toBe(true);
  });

  it("ne renvoie rien sous 2 caractères", () => {
    expect(searchSite("s")).toEqual([]);
  });
});
