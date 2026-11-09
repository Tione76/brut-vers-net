import { absoluteUrl, schemaIds } from "../ids";
import { pruneEmpty, ref, type JsonLdNode } from "../types";

export function buildCollectionPageNode(input: {
  path: string;
  name: string;
  description: string;
  itemListId: string;
}): JsonLdNode {
  return pruneEmpty({
    "@type": "CollectionPage",
    "@id": schemaIds.webpage(input.path),
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: ref(schemaIds.website()),
    mainEntity: ref(input.itemListId),
    breadcrumb: ref(schemaIds.breadcrumb(input.path)),
  });
}

export function buildItemListNode(input: {
  path: string;
  name: string;
  items: { path: string; name: string }[];
}): JsonLdNode {
  const listId = `${absoluteUrl(input.path)}#itemlist`;

  return pruneEmpty({
    "@type": "ItemList",
    "@id": listId,
    name: input.name,
    numberOfItems: input.items.length,
    itemListElement: input.items.map((item, index) =>
      pruneEmpty({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(item.path),
        name: item.name,
      }),
    ),
  });
}

export function getItemListId(path: string): string {
  return `${absoluteUrl(path)}#itemlist`;
}
