import { siteConfig as config } from "@/site/site.config";
import { pruneEmpty, type JsonLdNode } from "../types";
import { schemaIds } from "../ids";

/**
 * Auteur éditorial des articles.
 * Source unique : config.author (aucune duplication par guide).
 */
export function buildPersonNode(): JsonLdNode {
  return pruneEmpty({
    "@type": "Person",
    "@id": schemaIds.person(),
    name: config.author,
    url: config.url,
  });
}
