import { siteConfig as config } from "@/site/site.config";
import { pruneEmpty, ref, type JsonLdNode } from "../types";
import { schemaIds } from "../ids";

/**
 * WebSite global.
 * Pas de SearchAction : le site n'expose pas de moteur de recherche interne.
 */
export function buildWebsiteNode(): JsonLdNode {
  return pruneEmpty({
    "@type": "WebSite",
    "@id": schemaIds.website(),
    name: config.name,
    url: config.url,
    description: config.footerDescription,
    inLanguage: config.language,
    publisher: ref(schemaIds.organization()),
  });
}
