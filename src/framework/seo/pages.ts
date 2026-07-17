export interface ExtraPage {
  slug: string;
  title: string;
  description: string;
  sections: { title: string; content: string }[];
}

export interface SeoConfigShape {
  extraPages: ExtraPage[];
  calculators?: Record<string, { path: string }>;
}

export interface SitemapEntry {
  path: string;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: number;
  /** Date ISO (YYYY-MM-DD) de dernière modification significative. */
  lastModified?: string;
}

/**
 * @deprecated Utiliser getSitemapEntries() depuis @/site/public-pages
 * Conservé pour getExtraPageSlugs / getExtraPage (routes [slug] optionnelles).
 */
export function getAllPages(seo: SeoConfigShape): SitemapEntry[] {
  // Re-export minimal pour rétrocompatibilité : le sitemap utilise public-pages.ts
  void seo;
  return [];
}

export function getExtraPageSlugs(seo: SeoConfigShape): string[] {
  return seo.extraPages.map((p) => p.slug);
}

export function getExtraPage(seo: SeoConfigShape, slug: string) {
  return seo.extraPages.find((p) => p.slug === slug);
}
