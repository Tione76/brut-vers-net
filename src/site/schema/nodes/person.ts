import { absoluteUrl, schemaIds } from "../ids";
import { absoluteAsset, pruneEmpty, type JsonLdNode } from "../types";
import { SITE_AUTHOR } from "@/site/author";

/**
 * Auteur éditorial des articles.
 * @id stable (#author) réutilisé par tous les Article et par la page auteur.
 * Pas de nom de famille, diplôme, profil social ni image tant que non fournis.
 */
export function buildPersonNode(): JsonLdNode {
  return pruneEmpty({
    "@type": "Person",
    "@id": schemaIds.person(),
    name: SITE_AUTHOR.name,
    url: absoluteUrl(SITE_AUTHOR.path),
    description: SITE_AUTHOR.schemaDescription,
    jobTitle: SITE_AUTHOR.role,
    worksFor: { "@id": schemaIds.organization() },
    ...(SITE_AUTHOR.portrait
      ? { image: absoluteAsset(SITE_AUTHOR.portrait.src) }
      : {}),
  });
}
