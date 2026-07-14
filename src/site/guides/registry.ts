import type { Guide } from "./types";
import { attachGuideCover } from "./covers";
import { commentEstCalculeLeSalaireNetGuide } from "./data/comment-est-calcule-le-salaire-net";
import { commentLireUneFicheDePaieGuide } from "./data/comment-lire-une-fiche-de-paie";

/** Guides publiés */
export const guides: Guide[] = [
  attachGuideCover(commentEstCalculeLeSalaireNetGuide),
  attachGuideCover(commentLireUneFicheDePaieGuide),
];

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
