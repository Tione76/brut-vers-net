import { siteConfig as config } from "@/site/site.config";
import { pruneEmpty, type JsonLdNode } from "../types";
import { schemaIds } from "../ids";

/**
 * Auteur éditorial des articles.
 * name = config.author ; @id stable réutilisé par tous les Article.
 */
export function buildPersonNode(): JsonLdNode {
  return pruneEmpty({
    "@type": "Person",
    "@id": schemaIds.person(),
    name: config.author,
    url: config.url,
  });
}
