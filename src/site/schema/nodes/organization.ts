import { siteConfig as config } from "@/site/site.config";
import { HOME_COVER } from "@/site/guides/covers";
import { absoluteAsset, pruneEmpty, type JsonLdNode } from "../types";
import { schemaIds } from "../ids";

/** Logo de l'organisation (ImageObject dédié). */
export function buildLogoImageNode(): JsonLdNode {
  return pruneEmpty({
    "@type": "ImageObject",
    "@id": schemaIds.logo(),
    url: absoluteAsset(config.logo.src),
    contentUrl: absoluteAsset(config.logo.src),
    width: config.logo.width,
    height: config.logo.height,
    caption: config.logo.alt,
  });
}

/**
 * Organisation éditrice du site.
 * Une seule instance dans le graphe, réutilisée via @id (publisher, etc.).
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
    image: {
      "@type": "ImageObject",
      url: absoluteAsset(HOME_COVER.src),
      width: HOME_COVER.width,
      height: HOME_COVER.height,
      caption: HOME_COVER.alt,
    },
  });
}
