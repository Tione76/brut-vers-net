import { seoConfig } from "@/site/seo.config";
import { SITE_AUTHOR } from "@/site/author";
import type { FaqItem } from "@/framework/types";
import type { Guide } from "@/site/guides/types";
import type { GuideCoverImage } from "@/site/guides/covers";
import { resolveGuideCover } from "@/site/guides/covers";
import { getGuidePublicPath } from "@/site/guides/paths";
import { buildJsonLdGraph } from "./graph";
import { schemaIds } from "./ids";
import { buildLogoImageNode, buildOrganizationGraphNodes } from "./nodes/organization";
import { buildWebsiteNode } from "./nodes/website";
import { buildPersonNode } from "./nodes/person";
import { buildPrimaryImageNode } from "./nodes/image";
import { buildBreadcrumbNode, buildWebPageNode } from "./nodes/webpage";
import { buildFaqPageNode } from "./nodes/faq";
import { buildArticleNode } from "./nodes/article";
import { buildNewsArticleNode } from "./nodes/news-article";
import {
  buildCollectionPageNode,
  buildItemListNode,
  getItemListId,
} from "./nodes/collection-page";
import { buildWebApplicationNode } from "./nodes/webapplication";
import type { ActuArticle } from "@/site/actu/types";
import { getActuPublicPath } from "@/site/actu/types";
import { ACTU_HUB_PATH, ACTU_NAV_LABEL, ACTU_SECTION_LABEL } from "@/site/actu/constants";
import type { BreadcrumbItem } from "./types";

const sharedNodes = () => [buildLogoImageNode(), ...buildOrganizationGraphNodes(), buildWebsiteNode()];

type PageBaseInput = {
  path: string;
  name: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  cover?: GuideCoverImage | null;
  faq?: FaqItem[];
  /** Inclut Person (#author) et WebPage.author, comme Article.author sur les guides. */
  withAuthor?: boolean;
  dateModified?: string;
  datePublished?: string;
};

/** Page générique (contact, légal, hubs, FAQ) : pas de WebApplication. */
export function buildWebPageJsonLd(input: PageBaseInput): Record<string, unknown> {
  const {
    path,
    name,
    description,
    breadcrumbs,
    cover,
    faq = [],
    withAuthor,
    dateModified,
    datePublished,
  } = input;
  const faqNode = buildFaqPageNode(path, faq);
  const hasCover = Boolean(cover);

  return buildJsonLdGraph([
    ...sharedNodes(),
    ...(withAuthor ? [buildPersonNode()] : []),
    ...(hasCover && cover ? [buildPrimaryImageNode(path, cover)] : []),
    buildBreadcrumbNode(path, breadcrumbs),
    buildWebPageNode({
      path,
      name,
      description,
      hasPrimaryImage: hasCover,
      mainEntityId: faqNode ? schemaIds.faq(path) : undefined,
      withAuthor,
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
  const path = getGuidePublicPath(guide);
  const cover = resolveGuideCover(guide);
  const faqNode =
    guide.includeFaqSchema === false ? null : buildFaqPageNode(path, guide.faq);
  const webAppNode =
    guide.includeWebApplicationSchema && guide.webApplication
      ? buildWebApplicationNode({
          path,
          name: guide.webApplication.name,
          description: guide.webApplication.description,
          operatingSystem: "Any",
          includeFreeOffer: true,
        })
      : null;
  const hasCover = Boolean(cover);
  const hasPartIds = [
    ...(faqNode ? [schemaIds.faq(path)] : []),
    ...(webAppNode ? [schemaIds.webApplication(path)] : []),
  ];

  return buildJsonLdGraph([
    ...sharedNodes(),
    buildPersonNode(),
    ...(hasCover && cover ? [buildPrimaryImageNode(path, cover)] : []),
    buildBreadcrumbNode(
      path,
      guide.breadcrumbLabel
        ? [
            { name: "Accueil", path: "/" },
            { name: guide.breadcrumbLabel, path },
          ]
        : [
            { name: "Accueil", path: "/" },
            { name: "Guides", path: seoConfig.guidesHub.path },
            { name: guide.title, path },
          ],
    ),
    buildWebPageNode({
      path,
      name: guide.title,
      description: guide.description,
      hasPrimaryImage: hasCover,
      mainEntityId: schemaIds.article(path),
      hasPartIds: hasPartIds.length > 0 ? hasPartIds : undefined,
      // Le sujet est l'Article (mainEntity), pas l'Organisation du site.
      about: false,
      datePublished: guide.publishedAt,
      dateModified: guide.updatedAt,
    }),
    buildArticleNode(guide, path),
    faqNode,
    webAppNode,
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

/** Article d'actualité : WebPage + NewsArticle (+ ImageObject + BreadcrumbList). */
export function buildActuArticleJsonLd(article: ActuArticle): Record<string, unknown> {
  const path = getActuPublicPath(article);

  return buildJsonLdGraph([
    ...sharedNodes(),
    buildPersonNode(),
    buildPrimaryImageNode(path, article.cover),
    buildBreadcrumbNode(path, [
      { name: "Accueil", path: "/" },
      { name: ACTU_NAV_LABEL, path: ACTU_HUB_PATH },
      { name: article.shortTitle, path },
    ]),
    buildWebPageNode({
      path,
      name: article.title,
      description: article.description,
      hasPrimaryImage: true,
      mainEntityId: schemaIds.article(path),
      about: false,
      datePublished: article.publishedAt,
      dateModified: article.modifiedAt,
    }),
    buildNewsArticleNode(article),
  ]);
}

/** Rubrique /actu : CollectionPage + ItemList des articles réellement visibles. */
export function buildActuHubJsonLd(input: {
  name: string;
  description: string;
  articles: ActuArticle[];
}): Record<string, unknown> {
  const path = ACTU_HUB_PATH;
  const itemListId = getItemListId(path);
  const itemList = buildItemListNode({
    path,
    name: `${ACTU_SECTION_LABEL} publiées`,
    items: input.articles.map((article) => ({
      path: getActuPublicPath(article),
      name: article.title,
    })),
  });

  return buildJsonLdGraph([
    ...sharedNodes(),
    buildBreadcrumbNode(path, [
      { name: "Accueil", path: "/" },
      { name: ACTU_NAV_LABEL, path },
    ]),
    buildCollectionPageNode({
      path,
      name: input.name,
      description: input.description,
      itemListId,
    }),
    itemList,
  ]);
}
