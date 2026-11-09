import { describe, expect, it } from "vitest";
import {
  getActuPublicPath,
  getLatestPublishedActuArticle,
  getPublishedActuArticles,
} from "./registry";
import { buildActuRssXml } from "./rss";
import { buildNewsSitemapXml, getNewsSitemapArticles } from "./news-sitemap";
import { buildActuArticleJsonLd, buildActuHubJsonLd } from "@/site/schema";
import { hausseSmicDecembre2026Article } from "./articles/hausse-smic-decembre-2026";
import { ACTU_HUB_PATH } from "./constants";

describe("rubrique Actu", () => {
  it("expose uniquement les articles publiés", () => {
    const published = getPublishedActuArticles();
    expect(published.length).toBeGreaterThan(0);
    expect(published.every((article) => article.status === "published")).toBe(true);
    expect(getLatestPublishedActuArticle()?.slug).toBe("hausse-smic-decembre-2026");
  });

  it("centralise les faits d'annonce hors SMIC_CURRENT", () => {
    expect(hausseSmicDecembre2026Article.excerpt).toContain("1,6");
    expect(hausseSmicDecembre2026Article.excerpt).toContain("1 502");
    expect(hausseSmicDecembre2026Article.sources[0]?.href).toBe(
      "https://www.info.gouv.fr/actualite/conference-sociale-hausse-du-smic-de-1-6",
    );
    expect(getActuPublicPath(hausseSmicDecembre2026Article)).toBe(
      "/actu/hausse-smic-decembre-2026",
    );
  });

  it("produit un NewsArticle cohérent", () => {
    const jsonLd = buildActuArticleJsonLd(hausseSmicDecembre2026Article);
    const graph = (jsonLd as { "@graph": Array<Record<string, unknown>> })["@graph"];
    const news = graph.find((node) => node["@type"] === "NewsArticle");
    expect(news?.headline).toBe(hausseSmicDecembre2026Article.title);
    expect(news?.datePublished).toBe(hausseSmicDecembre2026Article.publishedAt);
    expect(news?.articleSection).toBe("Actualités");
    expect(String(news?.inLanguage)).toBe("fr-FR");
  });

  it("balise la rubrique en CollectionPage + ItemList", () => {
    const articles = getPublishedActuArticles();
    const jsonLd = buildActuHubJsonLd({
      name: "Actualités des salaires et du pouvoir d'achat",
      description: "test",
      articles,
    });
    const graph = (jsonLd as { "@graph": Array<Record<string, unknown>> })["@graph"];
    expect(graph.some((node) => node["@type"] === "CollectionPage")).toBe(true);
    const list = graph.find((node) => node["@type"] === "ItemList");
    expect(list?.numberOfItems).toBe(articles.length);
  });

  it("limite le news sitemap aux 48 dernières heures", () => {
    const inside = getNewsSitemapArticles(new Date("2026-11-10T12:00:00+01:00"));
    expect(inside.some((a) => a.slug === "hausse-smic-decembre-2026")).toBe(true);

    const outside = getNewsSitemapArticles(new Date("2026-11-12T16:00:00+01:00"));
    expect(outside.some((a) => a.slug === "hausse-smic-decembre-2026")).toBe(false);

    const xml = buildNewsSitemapXml(new Date("2026-11-10T12:00:00+01:00"));
    expect(xml).toContain("xmlns:news=");
    expect(xml).toContain("/actu/hausse-smic-decembre-2026");
    expect(xml).toContain(
      `<news:publication_date>${hausseSmicDecembre2026Article.publishedAt}</news:publication_date>`,
    );
  });

  it("génère un RSS valide pour la rubrique", () => {
    const xml = buildActuRssXml();
    expect(xml).toContain("<rss version=\"2.0\"");
    expect(xml).toContain(ACTU_HUB_PATH);
    expect(xml).toContain("/actu/hausse-smic-decembre-2026");
    expect(xml).toContain("<language>fr</language>");
  });
});
