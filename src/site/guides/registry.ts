import type { Guide } from "./types";

/** Guides publiés : vide en attendant le contenu Brut vers Net */
export const guides: Guide[] = [];

export const GUIDE_MODEL_SLUG = "modele";

export function getGuideBySlug(slug: string): Guide | undefined {
  if (slug === GUIDE_MODEL_SLUG) return undefined;
  return guides.find((guide) => guide.slug === slug);
}

export function getPublishedGuideSlugs(): string[] {
  return guides.map((guide) => guide.slug);
}

export function getAllGuideSlugs(): string[] {
  return getPublishedGuideSlugs();
}
