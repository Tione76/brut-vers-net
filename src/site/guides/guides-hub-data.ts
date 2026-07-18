import type { FaqItem } from "@/framework/types";

/** Contenu visible du hub /guides (hors title / meta SEO). */

export const GUIDES_HUB_PAGE_SUBTITLE =
  "Comprendre simplement votre salaire, votre fiche de paie et les principales règles de rémunération grâce à des guides clairs, illustrés et régulièrement mis à jour.";

export const GUIDES_HUB_LIST_TITLE = "Choisissez le guide adapté à votre situation";

export const GUIDES_HUB_LIST_INTRO =
  "Que vous souhaitiez comprendre le salaire brut et le salaire net, lire une fiche de paie, clarifier les cotisations salariales ou anticiper le prélèvement à la source, sélectionnez l'article qui répond à votre question.";

/** Résumés courts des cartes (homogènes) ; ne remplacent pas la meta description SEO des guides. */
export const GUIDE_HUB_TEASERS: Record<string, string> = {
  "comment-est-calcule-le-salaire-net":
    "Comprenez pourquoi le salaire brut et le salaire net diffèrent, et ce que chaque étape de la rémunération représente.",
  "comment-lire-une-fiche-de-paie":
    "Repérez les lignes essentielles de votre bulletin : brut, cotisations, net avant impôt, prélèvement à la source et net versé.",
  "comment-calculer-son-salaire-net":
    "Calculez votre salaire net étape par étape, avec un exemple concret, avant de vérifier le résultat dans le simulateur.",
  "cotisations-salariales-pourquoi-brut-plus-eleve-que-net":
    "Découvrez à quoi servent les cotisations salariales et pourquoi elles réduisent le montant perçu.",
  "prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne":
    "Comprenez le prélèvement à la source, son taux, et son impact sur le salaire net versé.",
};

export function getGuideHubTeaser(slug: string): string | undefined {
  return GUIDE_HUB_TEASERS[slug];
}

export const GUIDES_HUB_FAQ: FaqItem[] = [
  {
    question: "Quels sujets abordent les guides ?",
    answer:
      "Ils traitent des notions liées à la rémunération : différence entre salaire brut et salaire net, cotisations salariales, lecture de la fiche de paie, prélèvement à la source et méthodes de calcul. Chaque article peut être lu indépendamment.",
  },
  {
    question: "Les guides sont-ils gratuits ?",
    answer:
      "Oui. Tous les guides de Brut-vers-Net.fr sont accessibles gratuitement, sans création de compte.",
  },
  {
    question: "Les explications sont-elles adaptées aux débutants ?",
    answer:
      "Oui. Les textes sont rédigés dans un langage simple, avec des exemples concrets et une progression étape par étape, pour rester accessibles même sans connaissance préalable de la paie.",
  },
  {
    question: "Les guides remplacent-ils un conseil professionnel ?",
    answer:
      "Non. Ces contenus sont informatifs et pédagogiques. Ils ne constituent pas un conseil juridique, fiscal ou social personnalisé. Pour une situation particulière, adressez-vous à un professionnel ou à votre service paie.",
  },
];
