import { getCanonicalUrl } from "@/framework/seo/metadata";
import { resolveGuideCover } from "./covers";
import type { Guide } from "./types";

interface ArticleSiteInput {
  url: string;
  name: string;
  author: string;
  language: string;
  logo: { src: string };
}

/** Données structurées Article — Google Search */
export function buildArticleSchema(site: ArticleSiteInput, guide: Guide, path: string) {
  const url = getCanonicalUrl(site.url, path);
  const cover = resolveGuideCover(guide);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    author: {
      "@type": "Organization",
      name: site.author,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}${site.logo.src}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    inLanguage: site.language,
    keywords: guide.keywords.join(", "),
    ...(cover && {
      image: {
        "@type": "ImageObject",
        url: `${site.url}${cover.src}`,
        width: cover.width,
        height: cover.height,
        caption: cover.alt,
      },
    }),
  };
}
