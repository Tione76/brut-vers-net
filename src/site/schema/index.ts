/**
 * Données structurées Schema.org (JSON-LD).
 * Source unique : pages → build*JsonLd → un seul script @graph.
 */
export {
  buildHomeJsonLd,
  buildGuideJsonLd,
  buildHubJsonLd,
  buildCalculatorJsonLd,
  buildWebPageJsonLd,
  buildAuthorJsonLd,
} from "./pages";
export { buildJsonLdGraph } from "./graph";
export { schemaIds, absoluteUrl } from "./ids";
