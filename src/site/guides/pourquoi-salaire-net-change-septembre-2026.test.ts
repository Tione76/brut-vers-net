import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getGuideBySlug, getGuidePublicPath, guides } from "./registry";
import { buildGuideTocH2 } from "./utils";
import { buildGuideJsonLd } from "@/site/schema";

const OFFICIAL_SOURCES = {
  f33890: "https://www.service-public.fr/particuliers/vosdroits/F33890",
  f34009: "https://www.service-public.fr/particuliers/vosdroits/F34009",
  f35894: "https://www.service-public.fr/particuliers/vosdroits/F35894",
  bofipModulation:
    "https://bofip.impots.gouv.fr/bofip/11263-PGP.html/identifiant=BOI-IR-PAS-20-30-20-10-20250507",
  bofipMiseEnOeuvre:
    "https://bofip.impots.gouv.fr/bofip/11355-PGP.html/identifiant=BOI-IR-PAS-20-30-20-20-20250507",
  impots: "https://www.impots.gouv.fr",
} as const;

describe("guide salaire net septembre 2026", () => {
  const slug = "pourquoi-salaire-net-change-septembre-2026";

  it("est enregistré avec le chemin public canonique demandé", () => {
    const guide = getGuideBySlug(slug);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe("/pourquoi-salaire-net-change-septembre-2026");
    expect(guides.some((item) => item.slug === slug)).toBe(true);
  });

  it("expose H1, title SEO et FAQ synchronisés pour le Schema", () => {
    const guide = getGuideBySlug(slug)!;
    expect(guide.title).toBe("Pourquoi mon salaire net a changé en septembre 2026 ?");
    expect(guide.seoTitle).toBe(
      "Pourquoi mon salaire net a baissé ou augmenté en septembre 2026 ?",
    );
    expect(guide.updatedAt).toBe("2026-10-21");
    expect(guide.faq.length).toBeGreaterThanOrEqual(6);
    expect(guide.faq.length).toBeLessThanOrEqual(8);

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const webpage = graph.find((node) => node["@type"] === "WebPage");
    const faq = graph.find((node) => node["@type"] === "FAQPage");
    expect(webpage?.["@id"]).toBe(
      "https://www.brut-vers-net.fr/pourquoi-salaire-net-change-septembre-2026#webpage",
    );
    expect(faq).toBeTruthy();
    const mainEntity = faq?.mainEntity as { name: string }[];
    expect(mainEntity.map((item) => item.name)).toEqual(guide.faq.map((item) => item.question));
  });

  it("fusionne les sources dans Méthodologie et sources après À retenir", () => {
    const guide = getGuideBySlug(slug)!;
    const toc = buildGuideTocH2(guide);

    expect(guide.sections.some((section) => section.id === "sources-officielles")).toBe(false);
    expect(guide.sections.some((section) => section.id === "methodologie-sources")).toBe(false);
    expect(guide.bibliography?.id).toBe("methodologie-sources");
    expect(guide.bibliography?.title).toBe("Méthodologie et sources");
    expect(guide.bibliographyPlacement ?? "after-conclusion").toBe("after-conclusion");
    expect(guide.conclusion.title).toBe("À retenir");

    expect(toc).toHaveLength(19);
    expect(toc[16]).toEqual({ id: "faq", title: "Questions fréquentes", level: 2 });
    expect(toc[17]).toEqual({ id: "conclusion", title: "À retenir", level: 2 });
    expect(toc[18]).toEqual({
      id: "methodologie-sources",
      title: "Méthodologie et sources",
      level: 2,
    });
    expect(toc.filter((entry) => entry.id === "methodologie-sources")).toHaveLength(1);
    expect(toc.some((entry) => entry.id === "sources-officielles")).toBe(false);
  });

  it("conserve les six références officielles et la mention de vérification", () => {
    const guide = getGuideBySlug(slug)!;
    const bibliography = JSON.stringify(guide.bibliography);

    expect(bibliography).toContain("Sources officielles vérifiées le 4 septembre 2026");
    expect(bibliography).toContain("comparer les bulletins d'août et septembre");
    expect(bibliography).toContain(OFFICIAL_SOURCES.f33890);
    expect(bibliography).toContain(OFFICIAL_SOURCES.f34009);
    expect(bibliography).toContain(OFFICIAL_SOURCES.f35894);
    expect(bibliography).toContain(OFFICIAL_SOURCES.bofipModulation);
    expect(bibliography).toContain(OFFICIAL_SOURCES.bofipMiseEnOeuvre);
    expect(bibliography).toContain(OFFICIAL_SOURCES.impots);
  });

  it("branche la bibliographie depuis la page dédiée", () => {
    const pageSource = readFileSync(
      join(process.cwd(), "src/app/pourquoi-salaire-net-change-septembre-2026/page.tsx"),
      "utf8",
    );
    expect(pageSource).toContain("bibliography={guide.bibliography}");
    expect(pageSource).toContain("bibliographyPlacement={guide.bibliographyPlacement}");
  });
});
