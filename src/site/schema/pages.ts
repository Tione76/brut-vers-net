import { seoConfig } from "@/site/seo.config";
import { SITE_AUTHOR } from "@/site/author";
import type { FaqItem } from "@/framework/types";
import type { Guide } from "@/site/guides/types";
import type { GuideCoverImage } from "@/site/guides/covers";
import { resolveGuideCover } from "@/site/guides/covers";
import { buildJsonLdGraph } from "./graph";
import { schemaIds } from "./ids";
import { buildLogoImageNode, buildOrganizationNode } from "./nodes/organization";
import { buildWebsiteNode } from "./nodes/website";
import { buildPersonNode } from "./nodes/person";
import { buildPrimaryImageNode } from "./nodes/image";
import { buildBreadcrumbNode, buildWebPageNode } from "./nodes/webpage";
import { buildFaqPageNode } from "./nodes/faq";
import { buildArticleNode } from "./nodes/article";
import { buildWebApplicationNode } from "./nodes/webapplication";
import type { BreadcrumbItem } from "./types";

const sharedNodes = () => [buildLogoImageNode(), buildOrganizationNode(), buildWebsiteNode()];

type PageBaseInput = {
  path: string;
  name: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  cover?: GuideCoverImage | null;
  faq?: FaqItem[];
  dateModified?: string;
  datePublished?: string;
};

/** Page générique (contact, légal, hubs, FAQ) : pas de WebApplication. */
export function buildWebPageJsonLd(input: PageBaseInput): Record<string, unknown> {
  const { path, name, description, breadcrumbs, cover, faq = [], dateModified, datePublished } =
    input;
  const faqNode = buildFaqPageNode(path, faq);
  const hasCover = Boolean(cover);

  return buildJsonLdGraph([
    ...sharedNodes(),
    ...(hasCover && cover ? [buildPrimaryImageNode(path, cover)] : []),
    buildBreadcrumbNode(path, breadcrumbs),
    buildWebPageNode({
      path,
      name,
      description,
      hasPrimaryImage: hasCover,
      mainEntityId: faqNode ? schemaIds.faq(path) : undefined,
      dateModified,
      datePublished,
    }),
    faqNode,
  ]);
}

/**
 * Page calculateur interactif : WebPage.mainEntity → WebApplication.
 * FAQ éventuelle en hasPart (pas en mainEntity).
 */
function buildInteractiveCalculatorJsonLd(input: PageBaseInput): Record<string, unknown> {
  const { path, name, description, breadcrumbs, cover, faq = [], dateModified, datePublished } =
    input;
  const faqNode = buildFaqPageNode(path, faq);
  const hasCover = Boolean(cover);
  const webAppNode = buildWebApplicationNode({ path, name, description });

  return buildJsonLdGraph([
    ...sharedNodes(),
    ...(hasCover && cover ? [buildPrimaryImageNode(path, cover)] : []),
    buildBreadcrumbNode(path, breadcrumbs),
    buildWebPageNode({
      path,
      name,
      description,
      hasPrimaryImage: hasCover,
      mainEntityId: schemaIds.webApplication(path),
      hasPartIds: faqNode ? [schemaIds.faq(path)] : undefined,
      dateModified,
      datePublished,
    }),
    webAppNode,
    faqNode,
  ]);
}

/** Page d'accueil (calculateur Brut vers Net). */
export function buildHomeJsonLd(input: {
  name: string;
  description: string;
  cover: GuideCoverImage;
  faq: FaqItem[];
  dateModified?: string;
}): Record<string, unknown> {
  return buildInteractiveCalculatorJsonLd({
    path: "/",
    name: input.name,
    description: input.description,
    breadcrumbs: [{ name: "Accueil", path: "/" }],
    cover: input.cover,
    faq: input.faq,
    dateModified: input.dateModified,
  });
}

/** Guide publié : WebPage + Article (+ FAQ si présente). Pas de WebApplication. */
export function buildGuideJsonLd(guide: Guide): Record<string, unknown> {
  const path = `/guides/${guide.slug}`;
  const cover = resolveGuideCover(guide);
  const faqNode = buildFaqPageNode(path, guide.faq);
  const hasCover = Boolean(cover);

  return buildJsonLdGraph([
    ...sharedNodes(),
    buildPersonNode(),
    ...(hasCover && cover ? [buildPrimaryImageNode(path, cover)] : []),
    buildBreadcrumbNode(path, [
      { name: "Accueil", path: "/" },
      { name: "Guides", path: seoConfig.guidesHub.path },
      { name: guide.title, path },
    ]),
    buildWebPageNode({
      path,
      name: guide.title,
      description: guide.description,
      hasPrimaryImage: hasCover,
      mainEntityId: schemaIds.article(path),
      hasPartIds: faqNode ? [schemaIds.faq(path)] : undefined,
      datePublished: guide.publishedAt,
      dateModified: guide.updatedAt,
    }),
    buildArticleNode(guide, path),
    faqNode,
  ]);
}

/** Hub /guides ou /nos-outils (WebPage, pas CollectionPage ni WebApplication). */
export function buildHubJsonLd(input: {
  path: string;
  name: string;
  description: string;
  hubLabel: string;
  cover: GuideCoverImage;
  faq: FaqItem[];
}): Record<string, unknown> {
  return buildWebPageJsonLd({
    path: input.path,
    name: input.name,
    description: input.description,
    breadcrumbs: [
      { name: "Accueil", path: "/" },
      { name: input.hubLabel, path: input.path },
    ],
    cover: input.cover,
    faq: input.faq,
  });
}

/** Calculateur secondaire interactif. */
export function buildCalculatorJsonLd(input: {
  path: string;
  name: string;
  description: string;
  cover: GuideCoverImage;
  faq: FaqItem[];
  dateModified?: string;
}): Record<string, unknown> {
  return buildInteractiveCalculatorJsonLd({
    path: input.path,
    name: input.name,
    description: input.description,
    breadcrumbs: [
      { name: "Accueil", path: "/" },
      { name: "Outils", path: seoConfig.toolsHub.path },
      { name: input.name, path: input.path },
    ],
    cover: input.cover,
    faq: input.faq,
    dateModified: input.dateModified,
  });
}

/** Page auteur : WebPage.mainEntity → Person (@id global #author, sans doublon). */
export function buildAuthorJsonLd(): Record<string, unknown> {
  const path = SITE_AUTHOR.path;

  return buildJsonLdGraph([
    ...sharedNodes(),
    buildPersonNode(),
    buildBreadcrumbNode(path, [
      { name: "Accueil", path: "/" },
      { name: SITE_AUTHOR.name, path },
    ]),
    buildWebPageNode({
      path,
      name: SITE_AUTHOR.name,
      description: SITE_AUTHOR.metaDescription,
      mainEntityId: schemaIds.person(),
    }),
  ]);
}
