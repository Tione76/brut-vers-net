import type { ActuArticle } from "@/site/actu/types";
import { getActuPublicPath } from "@/site/actu/types";
import { siteConfig as config } from "@/site/site.config";
import { absoluteUrl, schemaIds } from "../ids";
import { pruneEmpty, ref, toSchemaDateTime, type JsonLdNode } from "../types";

/**
 * NewsArticle pour la rubrique Actu.
 * Reflète le texte visible : pas de FAQ, HowTo ni LiveBlogPosting.
 */
export function buildNewsArticleNode(article: ActuArticle): JsonLdNode {
  const path = getActuPublicPath(article);

  return pruneEmpty({
    "@type": "NewsArticle",
    "@id": schemaIds.article(path),
    headline: article.title,
    description: article.description,
    url: absoluteUrl(path),
    inLanguage: config.locale,
    datePublished: toSchemaDateTime(article.publishedAt),
    dateModified: toSchemaDateTime(article.modifiedAt),
    articleSection: article.category,
    author: ref(schemaIds.person()),
    publisher: ref(schemaIds.organization()),
    mainEntityOfPage: ref(schemaIds.webpage(path)),
    isPartOf: ref(schemaIds.website()),
    image: ref(schemaIds.primaryImage(path)),
  });
}
