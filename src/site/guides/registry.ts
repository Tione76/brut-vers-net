import type { Guide } from "./types";
import { attachGuideCover } from "./covers";
import { guideFactureConforme } from "./guide-facture-conforme";
import { guideFranchiseTva } from "./guide-franchise-tva";
import { guideTauxTva } from "./guide-taux-tva";
import { guideTvaAutoEntrepreneur } from "./guide-tva-auto-entrepreneur";
import { guideTvaDeductibleCollectee } from "./guide-tva-deductible-collectee";
import { OFFICIAL_GUIDE_MODEL } from "./template";

/** Guides publiés — ajouter ici chaque guide en respectant OFFICIAL_GUIDE_MODEL */
export const guides: Guide[] = [
  attachGuideCover(guideFactureConforme),
  attachGuideCover(guideTauxTva),
  attachGuideCover(guideFranchiseTva),
  attachGuideCover(guideTvaAutoEntrepreneur),
  attachGuideCover(guideTvaDeductibleCollectee),
];

export const GUIDE_MODEL_SLUG = "modele";

export function getGuideBySlug(slug: string): Guide | undefined {
  if (slug === GUIDE_MODEL_SLUG) return OFFICIAL_GUIDE_MODEL;
  return guides.find((guide) => guide.slug === slug);
}

export function getPublishedGuideSlugs(): string[] {
  return guides.map((guide) => guide.slug);
}

export function getAllGuideSlugs(): string[] {
  return [GUIDE_MODEL_SLUG, ...getPublishedGuideSlugs()];
}

/** Liens sidebar — tous les guides publiés (page d'accueil, listes) */
export function getGuidesSidebarLinks(): { title: string; href: string }[] {
  return guides.map((guide) => ({
    title: guide.title,
    href: `/guides/${guide.slug}`,
  }));
}
