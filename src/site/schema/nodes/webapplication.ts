import { absoluteUrl, schemaIds } from "../ids";
import { pruneEmpty, ref, type JsonLdNode } from "../types";

type WebApplicationInput = {
  path: string;
  name: string;
  description: string;
};

/**
 * WebApplication pour les calculateurs interactifs uniquement.
 * Propriétés limitées à des faits vérifiables (pas de notes, avis, prix ni téléchargements).
 */
export function buildWebApplicationNode(input: WebApplicationInput): JsonLdNode {
  const { path, name, description } = input;

  return pruneEmpty({
    "@type": "WebApplication",
    "@id": schemaIds.webApplication(path),
    name,
    description,
    url: absoluteUrl(path),
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    isAccessibleForFree: true,
    publisher: ref(schemaIds.organization()),
  });
}
