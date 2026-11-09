import type { GuideCoverImage } from "@/site/guides/covers";

/**
 * Illustrations de la rubrique Actu.
 * Crédit fourni pour cette photo : Valentin Ivantsov via Pexels.
 * Les URLs exactes Pexels du photographe et de la photo n'ont pas été
 * retrouvées de façon certaine au moment de l'intégration : aucun lien inventé.
 */
export const ACTU_COVERS: Record<string, GuideCoverImage> = {
  "hausse-smic-decembre-2026": {
    src: "/images/covers/guides/hausse-smic-decembre-2026.webp",
    alt: "Drapeau français au sommet d'un bâtiment parisien",
    width: 1200,
    height: 800,
    credit: {
      photographer: "Valentin Ivantsov",
      source: "Pexels",
      text: "Photo de Valentin Ivantsov via Pexels",
    },
  },
};
