import type { MetadataRoute } from "next";
import { config } from "@/site";
import { getSitemapEntries } from "@/site/public-pages";

function resolveSitemapLastModified(): Date {
  const envValue =
    process.env.SITEMAP_LAST_MODIFIED ??
    process.env.NEXT_PUBLIC_SITEMAP_LAST_MODIFIED ??
    process.env.VERCEL_DEPLOYMENT_TIMESTAMP ??
    process.env.VERCEL_BUILD_TIMESTAMP;

  if (envValue) {
    const n = Number(envValue);
    if (Number.isFinite(n)) {
      // Vercel timestamps are often in seconds.
      return new Date(n < 1e12 ? n * 1000 : n);
    }
    const parsed = new Date(envValue);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }

  // Fallback stable date, derived from the last update metadata we already manage.
  const candidates = [
    config.legal?.privacy?.lastUpdated,
    config.legal?.cookies?.lastUpdated,
    config.legal?.mentions?.lastUpdated,
  ].filter(Boolean) as string[];

  const times = candidates
    .map((d) => new Date(d).getTime())
    .filter((t) => Number.isFinite(t));

  const max = times.length > 0 ? Math.max(...times) : new Date("2026-07-01").getTime();
  return new Date(max);
}

const SITEMAP_LAST_MODIFIED = resolveSitemapLastModified();

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapEntries().map((page) => ({
    url: `${config.url}${page.path === "/" ? "" : page.path}`,
    lastModified: SITEMAP_LAST_MODIFIED,
    changeFrequency: page.changefreq,
    priority: page.priority,
  }));
}
