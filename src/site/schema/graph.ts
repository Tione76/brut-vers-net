import { pruneEmpty, type JsonLdNode } from "./types";

/** Assemble un unique document JSON-LD (@graph). */
export function buildJsonLdGraph(nodes: Array<JsonLdNode | null | undefined>): Record<string, unknown> {
  const graph = nodes
    .filter((node): node is JsonLdNode => Boolean(node))
    .map((node) => pruneEmpty(node));

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
