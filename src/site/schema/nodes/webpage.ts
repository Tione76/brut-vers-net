import { siteConfig as config } from "@/site/site.config";
import { absoluteUrl, schemaIds } from "../ids";
import { pruneEmpty, ref, type BreadcrumbItem, type JsonLdNode } from "../types";

export function buildBreadcrumbNode(path: string, items: BreadcrumbItem[]): JsonLdNode {
  return pruneEmpty({
    "@type": "BreadcrumbList",
    "@id": schemaIds.breadcrumb(path),
    itemListElement: items.map((item, index) =>
      pruneEmpty({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path),
      }),
    ),
  });
}

type WebPageOptions = {
  path: string;
  name: string;
  description: string;
  hasPrimaryImage?: boolean;
  /** @id of main entity (Article or FAQPage) */
  mainEntityId?: string;
  /** Additional related entities (e.g. FAQ on an Article page) */
  hasPartIds?: string[];
  dateModified?: string;
  datePublished?: string;
};

export function buildWebPageNode(options: WebPageOptions): JsonLdNode {
  const {
    path,
    name,
    description,
    hasPrimaryImage,
    mainEntityId,
    hasPartIds,
    dateModified,
    datePublished,
  } = options;

  return pruneEmpty({
    "@type": "WebPage",
    "@id": schemaIds.webpage(path),
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: config.language,
    isPartOf: ref(schemaIds.website()),
    about: ref(schemaIds.organization()),
    breadcrumb: ref(schemaIds.breadcrumb(path)),
    ...(hasPrimaryImage ? { primaryImageOfPage: ref(schemaIds.primaryImage(path)) } : {}),
    ...(mainEntityId ? { mainEntity: ref(mainEntityId) } : {}),
    ...(hasPartIds && hasPartIds.length > 0
      ? { hasPart: hasPartIds.map((id) => ref(id)) }
      : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
  });
}
