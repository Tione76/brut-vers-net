/** Titres et descriptions SEO des guides (balises <title> et meta description uniquement). */
export const GUIDE_SEO_METADATA: Record<string, { title: string; description: string }> = {
  "quels-sont-les-taux-de-tva-en-france": {
    title: "Les taux de TVA en France : le guide complet",
    description:
      "Découvrez les 4 taux de TVA en France selon votre activité : restauration, travaux, alimentation, services… Guide complet avec exemples.",
  },
  "franchise-en-base-de-tva": {
    title: "Franchise en base de TVA : qui est concerné et quels seuils ?",
    description:
      "Découvrez les règles de facturation, les mentions obligatoires, les seuils applicables et des exemples concrets pour éviter les erreurs de TVA.",
  },
  "comment-faire-une-facture-conforme": {
    title: "Faire une facture conforme : mentions obligatoires et modèle",
    description:
      "Apprenez à créer une facture conforme grâce à notre guide complet, avec les mentions obligatoires, un modèle de facture et des exemples pratiques.",
  },
  "tva-et-auto-entrepreneur": {
    title: "TVA et auto-entrepreneur : seuils, facturation et obligations",
    description:
      "Comprenez le fonctionnement de la TVA en micro-entreprise, quand la facturer, la franchise en base et les seuils applicables.",
  },
  "tva-deductible-et-tva-collectee": {
    title: "TVA déductible et TVA collectée : calcul et différences",
    description:
      "Comprenez comment récupérer la TVA, calculer la TVA nette, remplir vos déclarations et éviter les erreurs grâce à des exemples concrets.",
  },
};

export function getGuideSeoMetadata(slug: string) {
  return GUIDE_SEO_METADATA[slug];
}
