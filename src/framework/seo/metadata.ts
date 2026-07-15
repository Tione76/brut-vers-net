import type { Metadata } from "next";

export interface OgImageInput {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
}

export interface SeoRobotsInput {
  index: boolean;
  follow: boolean;
}

export interface SeoPageInput {
  title: string;
  description: string;
  path: string;
  ogImage?: string | OgImageInput;
  robots?: SeoRobotsInput;
  /** Ne pas émettre de canonical (404, erreurs) */
  noCanonical?: boolean;
}

export interface SiteSeoInput {
  url: string;
  name: string;
  author: string;
  locale: string;
  favicon: string;
  ogImage: string;
  analytics: { googleSearchConsoleId?: string };
}

export interface SeoDefaultsInput {
  titleTemplate: string;
  defaultDescription: string;
  twitterHandle?: string;
  home: { title: string; ogImage?: string | OgImageInput };
}

export function getCanonicalUrl(url: string, path: string): string {
  return `${url}${path === "/" ? "" : path}`;
}

function resolveOgImage(
  site: SiteSeoInput,
  pageImage?: string | OgImageInput,
): { absoluteUrl: string; meta: OgImageInput } {
  const fallback = pageImage ?? site.ogImage;
  const resolved: OgImageInput =
    typeof fallback === "string" ? { url: fallback } : fallback;
  const absoluteUrl = resolved.url.startsWith("http")
    ? resolved.url
    : `${site.url}${resolved.url}`;
  return { absoluteUrl, meta: { ...resolved, url: absoluteUrl } };
}

export function buildPageMetadata(
  site: SiteSeoInput,
  seo: SeoDefaultsInput,
  page: SeoPageInput,
): Metadata {
  const canonical = getCanonicalUrl(site.url, page.path);
  const { absoluteUrl, meta } = resolveOgImage(site, page.ogImage);
  const isGuidesPage = page.path === "/guides" || page.path.startsWith("/guides/");

  const ogImageEntry = {
    url: absoluteUrl,
    width: meta.width ?? 1200,
    height: meta.height ?? 630,
    alt: meta.alt ?? page.title,
    type: meta.type ?? "image/webp",
  };

  return {
    title: { absolute: page.title },
    description: page.description,
    authors: [{ name: site.author }],
    ...(page.robots && { robots: page.robots }),
    ...(!page.noCanonical && { alternates: { canonical } }),
    openGraph: {
      type: isGuidesPage ? "article" : "website",
      locale: site.locale.replace("-", "_"),
      url: canonical,
      siteName: site.name,
      title: page.title,
      description: page.description,
      images: [ogImageEntry],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [{ url: absoluteUrl, alt: ogImageEntry.alt }],
      ...(seo.twitterHandle && { site: seo.twitterHandle }),
    },
    ...(site.analytics.googleSearchConsoleId && {
      verification: { google: site.analytics.googleSearchConsoleId },
    }),
  };
}

export function buildRootMetadata(
  site: SiteSeoInput,
  seo: SeoDefaultsInput,
): Metadata {
  return {
    metadataBase: new URL(site.url),
    title: { default: seo.home.title, template: seo.titleTemplate },
    description: seo.defaultDescription,
    authors: [{ name: site.author }],
    icons: {
      icon: { url: site.favicon, rel: "icon", type: "image/png", sizes: "any" },
      shortcut: { url: site.favicon, rel: "shortcut icon", type: "image/png", sizes: "any" },
      apple: { url: "/logo-icon@2x.png?v=3", rel: "apple-touch-icon", type: "image/png", sizes: "any" },
    },
    manifest: "/manifest.webmanifest",
    ...(site.analytics.googleSearchConsoleId && {
      verification: { google: site.analytics.googleSearchConsoleId },
    }),
  };
}
