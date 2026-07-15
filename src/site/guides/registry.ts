import type { Guide } from "./types";
import { attachGuideCover } from "./covers";
import { commentCalculerSonSalaireNetGuide } from "./data/comment-calculer-son-salaire-net";
import { commentEstCalculeLeSalaireNetGuide } from "./data/comment-est-calcule-le-salaire-net";
import { commentLireUneFicheDePaieGuide } from "./data/comment-lire-une-fiche-de-paie";
import { cotisationsSalarialesGuide } from "./data/cotisations-salariales-pourquoi-brut-plus-eleve-que-net";
import { prelevementALaSourceGuide } from "./data/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne";

/** Guides publiés */
export const guides: Guide[] = [
  attachGuideCover(commentEstCalculeLeSalaireNetGuide),
  attachGuideCover(commentLireUneFicheDePaieGuide),
  attachGuideCover(commentCalculerSonSalaireNetGuide),
  attachGuideCover(cotisationsSalarialesGuide),
  attachGuideCover(prelevementALaSourceGuide),
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
