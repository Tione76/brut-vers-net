import { hausseSmicDecembre2026Article } from "./articles/hausse-smic-decembre-2026";
import type { ActuArticle } from "./types";
import { getActuPublicPath } from "./types";

/** Catalogue complet (publiés + brouillons). */
const allArticles: ActuArticle[] = [hausseSmicDecembre2026Article];

function byPublishedDesc(a: ActuArticle, b: ActuArticle): number {
  return b.publishedAt.localeCompare(a.publishedAt);
}

/** Articles publiés, du plus récent au plus ancien. */
export function getPublishedActuArticles(): ActuArticle[] {
  return allArticles.filter((article) => article.status === "published").sort(byPublishedDesc);
}

export function getAllActuArticles(): ActuArticle[] {
  return [...allArticles];
}

export function getActuArticleBySlug(slug: string): ActuArticle | undefined {
  return allArticles.find((article) => article.slug === slug);
}

export function getPublishedActuArticleBySlug(slug: string): ActuArticle | undefined {
  const article = getActuArticleBySlug(slug);
  return article?.status === "published" ? article : undefined;
}

export function getPublishedActuSlugs(): string[] {
  return getPublishedActuArticles().map((article) => article.slug);
}

export function getLatestPublishedActuArticle(): ActuArticle | undefined {
  return getPublishedActuArticles()[0];
}

export function isActuArticleIndexable(article: ActuArticle): boolean {
  return article.status === "published";
}

export { getActuPublicPath };
