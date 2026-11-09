import { siteConfig } from "@/site/site.config";
import {
  NEWS_PUBLICATION_LANGUAGE,
  NEWS_PUBLICATION_NAME,
  NEWS_SITEMAP_MAX_AGE_MS,
} from "./constants";
import { getPublishedActuArticles, getActuPublicPath } from "./registry";
import type { ActuArticle } from "./types";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function absoluteUrl(path: string): string {
  return `${siteConfig.url.replace(/\/$/, "")}${path}`;
}

/** Date de publication originale (pas la date d'ajout au sitemap). */
export function getActuPublicationDateIso(article: ActuArticle): string {
  return article.publishedAt;
}

/**
 * Articles éligibles au news sitemap : publiés depuis moins de 48 h
 * selon la date de publication originale.
 * Calculée à la requête pour rester exacte sans nouveau déploiement.
 */
export function getNewsSitemapArticles(now: Date = new Date()): ActuArticle[] {
  const cutoff = now.getTime() - NEWS_SITEMAP_MAX_AGE_MS;
  return getPublishedActuArticles().filter((article) => {
    const publishedMs = Date.parse(article.publishedAt);
    if (Number.isNaN(publishedMs)) return false;
    return publishedMs >= cutoff;
  });
}

export function buildNewsSitemapXml(now: Date = new Date()): string {
  const articles = getNewsSitemapArticles(now);
  const urls = articles
    .map((article) => {
      const loc = absoluteUrl(getActuPublicPath(article));
      const title = article.seoTitle ?? article.title;
      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(NEWS_PUBLICATION_NAME)}</news:name>
        <news:language>${escapeXml(NEWS_PUBLICATION_LANGUAGE)}</news:language>
      </news:publication>
      <news:publication_date>${escapeXml(getActuPublicationDateIso(article))}</news:publication_date>
      <news:title>${escapeXml(title)}</news:title>
    </news:news>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>
`;
}
