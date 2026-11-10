import type { MetadataRoute } from "next";
import { config } from "@/site";
import { getSitemapEntries } from "@/site/public-pages";

/**
 * Convertit une date éditoriale stable en Date.
 * Accepte YYYY-MM-DD (minuit UTC) ou un datetime ISO complet déjà horodaté.
 * Ne pas utiliser `new Date()` à chaque build : lastModified doit refléter
 * une vraie mise à jour de contenu / SEO, pas la date de génération.
 */
function toLastModifiedDate(isoDate: string | undefined): Date {
  if (isoDate) {
    const parsed = /^\d{4}-\d{2}-\d{2}T/.test(isoDate)
      ? new Date(isoDate)
      : new Date(`${isoDate}T00:00:00.000Z`);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return new Date("2026-07-01T00:00:00.000Z");
}

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapEntries().map((page) => ({
    url: `${config.url}${page.path === "/" ? "" : page.path}`,
    lastModified: toLastModifiedDate(page.lastModified),
    changeFrequency: page.changefreq,
    priority: page.priority,
  }));
}
