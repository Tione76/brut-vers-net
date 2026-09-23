import { absoluteUrl, schemaIds } from "../ids";
import { pruneEmpty, ref, type JsonLdNode } from "../types";

type WebApplicationInput = {
  path: string;
  name: string;
  description: string;
  operatingSystem?: string;
  includeFreeOffer?: boolean;
};

/**
 * WebApplication pour les calculateurs interactifs uniquement.
 * Propriétés limitées à des faits vérifiables (pas de notes, avis, prix ni téléchargements).
 */
export function buildWebApplicationNode(input: WebApplicationInput): JsonLdNode {
  const { path, name, description, operatingSystem = "Web", includeFreeOffer } =
    input;

  return pruneEmpty({
    "@type": "WebApplication",
    "@id": schemaIds.webApplication(path),
    name,
    description,
    url: absoluteUrl(path),
    applicationCategory: "FinanceApplication",
    operatingSystem,
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    isAccessibleForFree: true,
    publisher: ref(schemaIds.organization()),
    ...(includeFreeOffer
      ? {
          offers: {
            "@type": "Offer",
            price: 0,
            priceCurrency: "EUR",
          },
        }
      : {}),
  });
}
