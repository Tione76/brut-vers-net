import type { Guide } from "@/site/guides/types";
import { resolveGuideCover } from "@/site/guides/covers";
import { siteConfig as config } from "@/site/site.config";
import { absoluteUrl, schemaIds } from "../ids";
import { pruneEmpty, ref, type JsonLdNode } from "../types";

/**
 * Article pour les guides publiés.
 * Propriétés limitées à ce que Google exploite réellement pour Article.
 */
export function buildArticleNode(guide: Guide, path: string): JsonLdNode {
  const cover = resolveGuideCover(guide);

  return pruneEmpty({
    "@type": "Article",
    "@id": schemaIds.article(path),
    headline: guide.title,
    description: guide.description,
    url: absoluteUrl(path),
    inLanguage: config.language,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    articleSection: "Guides",
    author: ref(schemaIds.person()),
    publisher: ref(schemaIds.organization()),
    mainEntityOfPage: ref(schemaIds.webpage(path)),
    isPartOf: ref(schemaIds.website()),
    ...(cover ? { image: ref(schemaIds.primaryImage(path)) } : {}),
  });
}
