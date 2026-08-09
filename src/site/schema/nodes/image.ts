import { absoluteAsset, pruneEmpty, type JsonLdNode, type SchemaCoverInput } from "../types";
import { schemaIds } from "../ids";

/** Image principale d'une page, issue du registre covers.ts. */
export function buildPrimaryImageNode(path: string, cover: SchemaCoverInput): JsonLdNode {
  const creditText =
    cover.credit && cover.credit.photographer && cover.credit.source
      ? `Photo de ${cover.credit.photographer} via ${cover.credit.source}`
      : undefined;

  return pruneEmpty({
    "@type": "ImageObject",
    "@id": schemaIds.primaryImage(path),
    url: absoluteAsset(cover.src),
    contentUrl: absoluteAsset(cover.src),
    width: cover.width,
    height: cover.height,
    caption: cover.alt,
    name: cover.alt,
    creditText,
  });
}
