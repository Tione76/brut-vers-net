import type { FaqItem } from "@/framework/types";

/** FAQ page d'accueil : affichage UI et Schema.org (via faq.ts). */
export const homeFaq: FaqItem[] = [
  {
    question: "Comment convertir un salaire brut vers net ?",
    answer:
      "Indiquez un montant brut horaire, mensuel ou annuel, choisissez votre profil (non-cadre, cadre ou fonction publique) et ajustez le temps de travail si besoin. Le net estimé avant impôt s'affiche dans les trois unités. C'est une estimation, pas une fiche de paie.",
  },
  {
    question: "Comment convertir un salaire net en brut ?",
    answer:
      "Saisissez votre net dans l'un des champs : le brut équivalent apparaît selon le profil choisi. Utile en négociation ou pour comparer une offre exprimée en net. Le profil cadre ou non-cadre modifie le résultat.",
  },
  {
    question: "Comment calculer un salaire horaire brut vers net ?",
    answer:
      "Entrez le brut horaire : la conversion repose sur 151,67 heures par mois à temps plein. En temps partiel, baissez le pourcentage de temps de travail pour proratiser le mensuel.",
  },
  {
    question: "Peut-on calculer un salaire annuel brut vers net ?",
    answer:
      "Oui. Renseignez le brut annuel et le nombre de mois (12 à 16). Les équivalents mensuels et horaires suivent. Indiquez 13 ou 14 mois si une prime annuelle est lissée sur l'année.",
  },
  {
    question: "Le calculateur fonctionne-t-il pour les cadres et la fonction publique ?",
    answer:
      "Oui : salarié non-cadre, salarié cadre et fonction publique, chacun avec un coefficient indicatif. Pour la fonction publique, il s'agit d'une estimation générale, sans primes ni indemnités spécifiques.",
  },
  {
    question: "Le prélèvement à la source est-il inclus ?",
    answer:
      "Oui. Un taux neutre estime le net après impôt. Remplacez-le par votre taux réel (bulletin ou impots.gouv.fr) pour un résultat plus proche de votre paie. Le taux dépend de votre foyer fiscal, pas du seul salaire.",
  },
  {
    question: "Le résultat du calculateur est-il fiable ?",
    answer:
      "Il donne un ordre de grandeur, pas un bulletin ligne par ligne. Primes, heures supplémentaires et avantages en nature ne sont pas intégrés. Pour un montant contractuel, consultez votre RH ou votre fiche de paie.",
  },
  {
    question: "Le calculateur Brut vers Net est-il gratuit ?",
    answer:
      "Oui, sans création de compte. Utilisable sur mobile ou ordinateur, autant de fois que nécessaire.",
  },
  {
    question: "Que deviennent les montants que je saisis ?",
    answer:
      "Ils restent dans votre navigateur pour produire la simulation : ils ne sont pas envoyés à un serveur à cette fin. Des cookies analytiques (Google Analytics, Microsoft Clarity) peuvent toutefois être déposés si vous les acceptez, conformément à notre politique cookies.",
  },
];
