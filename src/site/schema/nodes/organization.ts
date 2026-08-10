import { siteConfig as config } from "@/site/site.config";
import { SITE_AUTHOR } from "@/site/author";
import { HOME_COVER } from "@/site/guides/covers";
import { absoluteAsset, pruneEmpty, type JsonLdNode } from "../types";
import { schemaIds } from "../ids";
import { buildOrganizationImageNode } from "./image";

/**
 * Logo propriétaire du site (créé par Antoine / Brut vers Net).
 * Pas de licence publique : license / acquireLicensePage volontairement absents.
 */
export function buildLogoImageNode(): JsonLdNode {
  return pruneEmpty({
    "@type": "ImageObject",
    "@id": schemaIds.logo(),
    url: absoluteAsset(config.logo.src),
    contentUrl: absoluteAsset(config.logo.src),
    width: config.logo.width,
    height: config.logo.height,
    name: config.logo.alt,
    caption: config.logo.alt,
    creator: {
      "@type": "Person",
      name: SITE_AUTHOR.name,
    },
    copyrightNotice: `© ${config.domain}`,
  });
}

/**
 * Organisation éditrice du site.
 * Une seule instance dans le graphe, réutilisée via @id (publisher, etc.).
 * image → ImageObject dédié (#organization-image) basé sur HOME_COVER.
 */
export function buildOrganizationNode(): JsonLdNode {
  return pruneEmpty({
    "@type": "Organization",
    "@id": schemaIds.organization(),
    name: config.name,
    url: config.url,
    email: config.contact.email,
    description: config.footerDescription,
    logo: { "@id": schemaIds.logo() },
    image: { "@id": schemaIds.organizationImage() },
  });
}

/** Nœuds Organization + ImageObject organisation (à inclure dans le graphe). */
export function buildOrganizationGraphNodes(): JsonLdNode[] {
  return [buildOrganizationImageNode(HOME_COVER), buildOrganizationNode()];
}
