import { absoluteUrl, schemaIds } from "../ids";
import { pruneEmpty, type JsonLdNode } from "../types";
import { SITE_AUTHOR } from "@/site/author";

/**
 * Auteur éditorial des articles.
 * @id stable (#author) réutilisé par tous les Article et par la page auteur.
 */
export function buildPersonNode(): JsonLdNode {
  return pruneEmpty({
    "@type": "Person",
    "@id": schemaIds.person(),
    name: SITE_AUTHOR.name,
    url: absoluteUrl(SITE_AUTHOR.path),
  });
}
