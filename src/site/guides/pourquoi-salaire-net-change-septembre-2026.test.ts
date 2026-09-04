import { describe, expect, it } from "vitest";
import { getGuideBySlug, getGuidePublicPath, guides } from "./registry";
import { buildGuideJsonLd } from "@/site/schema";

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
    expect(guide.faq.length).toBeGreaterThanOrEqual(6);
    expect(guide.faq.length).toBeLessThanOrEqual(8);

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const webpage = graph.find((node) => node["@type"] === "WebPage");
    const faq = graph.find((node) => node["@type"] === "FAQPage");
    expect(webpage?.["@id"]).toBe(
      "https://brut-vers-net.fr/pourquoi-salaire-net-change-septembre-2026#webpage",
    );
    expect(faq).toBeTruthy();
    const mainEntity = faq?.mainEntity as { name: string }[];
    expect(mainEntity.map((item) => item.name)).toEqual(guide.faq.map((item) => item.question));
  });
});
