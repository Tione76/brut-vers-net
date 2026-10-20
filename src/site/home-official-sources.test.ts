import { describe, expect, it } from "vitest";
import {
  HOME_OFFICIAL_SOURCES,
  HOME_SOURCES_VERIFIED_AT,
} from "./home-official-sources";

describe("home-official-sources", () => {
  it("vérifie la date d'audit et des URL https stables", () => {
    expect(HOME_SOURCES_VERIFIED_AT).toBe("2026-10-20");
    expect(HOME_OFFICIAL_SOURCES.length).toBeGreaterThanOrEqual(7);

    for (const source of HOME_OFFICIAL_SOURCES) {
      expect(source.href.startsWith("https://")).toBe(true);
      expect(source.title.length).toBeGreaterThan(8);
      expect(source.org.length).toBeGreaterThan(2);
      expect(source.note.length).toBeGreaterThan(8);
    }
  });

  it("inclut les références fiscales précises (pas seulement la home impots.gouv)", () => {
    const hrefs = HOME_OFFICIAL_SOURCES.map((source) => source.href);
    expect(hrefs.some((href) => href.includes("bofip.impots.gouv.fr"))).toBe(true);
    expect(hrefs.some((href) => href.includes("BOI-BAREME-000037"))).toBe(true);
    expect(hrefs.some((href) => href.includes("legifrance.gouv.fr"))).toBe(true);
    expect(hrefs.some((href) => href.includes("mon-entreprise.urssaf.fr"))).toBe(true);
    expect(hrefs.every((href) => href !== "https://www.impots.gouv.fr/")).toBe(true);
  });
});
