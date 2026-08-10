import { absoluteAsset, pruneEmpty, type JsonLdNode, type SchemaCoverInput } from "../types";
import { schemaIds } from "../ids";
import { formatCoverCredit, getCoverLicenseUrl } from "@/site/guides/covers";

function buildCreatorPerson(name: string): JsonLdNode {
  return {
    "@type": "Person",
    name,
  };
}

/**
 * Champs ImageObject dérivés d'une cover du registre (sans @id).
 * creator / license / options : uniquement si données réelles.
 */
export function buildCoverImageObjectFields(cover: SchemaCoverInput): JsonLdNode {
  const credit = cover.credit;
  const creditText =
    credit && credit.photographer && credit.source ? formatCoverCredit(credit) : undefined;
  const license = credit ? getCoverLicenseUrl(credit) : undefined;

  return pruneEmpty({
    "@type": "ImageObject",
    url: absoluteAsset(cover.src),
    contentUrl: absoluteAsset(cover.src),
    width: cover.width,
    height: cover.height,
    caption: cover.alt,
    name: cover.alt,
    creditText,
    ...(credit?.photographer
      ? { creator: buildCreatorPerson(credit.photographer) }
      : {}),
    license,
    acquireLicensePage: credit?.acquireLicensePage,
    copyrightNotice: credit?.copyrightNotice,
  });
}

/** Image principale d'une page, issue du registre covers.ts. */
export function buildPrimaryImageNode(path: string, cover: SchemaCoverInput): JsonLdNode {
  return pruneEmpty({
    ...buildCoverImageObjectFields(cover),
    "@id": schemaIds.primaryImage(path),
  });
}

/**
 * Image de l'organisation (HOME_COVER), @id stable partagé sur tout le site.
 * Même richesse de métadonnées que le primaryImage pour une cover Pexels.
 */
export function buildOrganizationImageNode(cover: SchemaCoverInput): JsonLdNode {
  return pruneEmpty({
    ...buildCoverImageObjectFields(cover),
    "@id": schemaIds.organizationImage(),
  });
}
