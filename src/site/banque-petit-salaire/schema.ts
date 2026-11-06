/**
 * JSON-LD dédié au brouillon /banque-petit-salaire.
 * Réutilise les @id partagés (Organization, Person, Website) pour éviter les doublons.
 */
import type { Guide } from "@/site/guides/types";
import { absoluteUrl, schemaIds } from "@/site/schema/ids";
import { buildJsonLdGraph } from "@/site/schema/graph";
import { buildArticleNode } from "@/site/schema/nodes/article";
import { buildFaqPageNode } from "@/site/schema/nodes/faq";
import { buildLogoImageNode, buildOrganizationGraphNodes } from "@/site/schema/nodes/organization";
import { buildPersonNode } from "@/site/schema/nodes/person";
import { buildBreadcrumbNode, buildWebPageNode } from "@/site/schema/nodes/webpage";
import { buildWebsiteNode } from "@/site/schema/nodes/website";
import { pruneEmpty, ref, type JsonLdNode } from "@/site/schema/types";
import {
  BANK_FAQ_ITEMS,
  BANK_GUIDE_PATH,
  BANK_OFFERS,
  type BankOffer,
} from "./data";

function sharedNodes() {
  return [buildLogoImageNode(), ...buildOrganizationGraphNodes(), buildWebsiteNode()];
}

function bankAccountId(offer: BankOffer): string {
  return `${absoluteUrl(BANK_GUIDE_PATH)}#account-${offer.id}`;
}

function itemListId(): string {
  return `${absoluteUrl(BANK_GUIDE_PATH)}#offer-list`;
}

function buildBankAccountNode(offer: BankOffer): JsonLdNode {
  return pruneEmpty({
    "@type": "BankAccount",
    "@id": bankAccountId(offer),
    name: `${offer.bankName} ${offer.offerName}`,
    description: `${offer.cardSubtitle}. ${offer.cardCondition}`,
    url: offer.productUrl,
    provider: {
      "@type": "BankOrCreditUnion",
      name: offer.bankName,
      url: offer.productUrl,
    },
  });
}

function buildItemListNode(): JsonLdNode {
  return {
    "@type": "ItemList",
    "@id": itemListId(),
    name: "Quatre offres bancaires comparées (ordre alphabétique)",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: BANK_OFFERS.length,
    itemListElement: BANK_OFFERS.map((offer, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${offer.bankName} ${offer.offerName}`,
      url: `${absoluteUrl(BANK_GUIDE_PATH)}#${offer.decryptAnchor}`,
      item: ref(bankAccountId(offer)),
    })),
  };
}

/** Graphe sobre : WebPage, Article, BreadcrumbList, FAQPage, ItemList, BankAccount. */
export function buildBanquePetitSalaireJsonLd(guide: Guide): Record<string, unknown> {
  const path = BANK_GUIDE_PATH;
  const faqForSchema = BANK_FAQ_ITEMS.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));
  const faqNode = buildFaqPageNode(path, faqForSchema);

  return buildJsonLdGraph([
    ...sharedNodes(),
    buildPersonNode(),
    buildBreadcrumbNode(path, [
      { name: "Accueil", path: "/" },
      { name: guide.breadcrumbLabel ?? guide.title, path },
    ]),
    buildWebPageNode({
      path,
      name: guide.title,
      description: guide.description,
      hasPrimaryImage: false,
      mainEntityId: schemaIds.article(path),
      hasPartIds: faqNode ? [schemaIds.faq(path), itemListId()] : [itemListId()],
      about: false,
      datePublished: guide.publishedAt,
      dateModified: guide.updatedAt,
    }),
    buildArticleNode(guide, path),
    faqNode,
    buildItemListNode(),
    ...BANK_OFFERS.map(buildBankAccountNode),
  ]);
}
