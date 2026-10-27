import { siteConfig as config } from "@/site/site.config";
import { absoluteUrl, schemaIds } from "../ids";
import {
  pruneEmpty,
  ref,
  toSchemaDateTime,
  type BreadcrumbItem,
  type JsonLdNode,
} from "../types";

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
  /** Auteur éditorial (même @id Person que les guides). */
  withAuthor?: boolean;
  /**
   * Sujet de la page (schema.org/about).
   * - undefined : Organisation du site (comportement historique des pages outil / légales)
   * - false : omis (guides éditoriaux : le sujet est déjà porté par mainEntity → Article)
   * - { "@id" } : référence explicite
   */
  about?: { "@id": string } | false;
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
    withAuthor,
    about,
    dateModified,
    datePublished,
  } = options;

  const aboutNode =
    about === false ? undefined : about === undefined ? ref(schemaIds.organization()) : about;

  return pruneEmpty({
    "@type": "WebPage",
    "@id": schemaIds.webpage(path),
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: config.language,
    isPartOf: ref(schemaIds.website()),
    ...(aboutNode ? { about: aboutNode } : {}),
    breadcrumb: ref(schemaIds.breadcrumb(path)),
    ...(withAuthor ? { author: ref(schemaIds.person()) } : {}),
    ...(hasPrimaryImage ? { primaryImageOfPage: ref(schemaIds.primaryImage(path)) } : {}),
    ...(mainEntityId ? { mainEntity: ref(mainEntityId) } : {}),
    ...(hasPartIds && hasPartIds.length > 0
      ? { hasPart: hasPartIds.map((id) => ref(id)) }
      : {}),
    ...(datePublished ? { datePublished: toSchemaDateTime(datePublished) } : {}),
    ...(dateModified ? { dateModified: toSchemaDateTime(dateModified) } : {}),
  });
}
