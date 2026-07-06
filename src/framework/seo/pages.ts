export interface ExtraPage {
  slug: string;
  title: string;
  description: string;
  sections: { title: string; content: string }[];
}

export interface SeoConfigShape {
  extraPages: ExtraPage[];
  calculators?: {
    marginHtTtc: { path: string };
  };
}

export interface SitemapEntry {
  path: string;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: number;
}

export function getAllPages(seo: SeoConfigShape): SitemapEntry[] {
  const calculatorPages: SitemapEntry[] = seo.calculators
    ? Object.values(seo.calculators).map((calc) => ({
        path: calc.path,
        changefreq: "monthly" as const,
        priority: 0.9,
      }))
    : [];

  return [
    { path: "/", changefreq: "weekly", priority: 1 },
    ...calculatorPages,
    { path: "/contact", changefreq: "monthly", priority: 0.5 },
    { path: "/faq", changefreq: "monthly", priority: 0.7 },
    { path: "/simulateurs", changefreq: "monthly", priority: 0.7 },
    { path: "/plan-du-site", changefreq: "monthly", priority: 0.4 },
    { path: "/gestion-des-cookies", changefreq: "yearly", priority: 0.3 },
    { path: "/politique-de-confidentialite", changefreq: "yearly", priority: 0.3 },
    { path: "/politique-de-cookies", changefreq: "yearly", priority: 0.3 },
    { path: "/mentions-legales", changefreq: "yearly", priority: 0.3 },
    ...seo.extraPages.map((p) => ({
      path: `/${p.slug}`,
      changefreq: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

export function getExtraPageSlugs(seo: SeoConfigShape): string[] {
  return seo.extraPages.map((p) => p.slug);
}

export function getExtraPage(seo: SeoConfigShape, slug: string) {
  return seo.extraPages.find((p) => p.slug === slug);
}
