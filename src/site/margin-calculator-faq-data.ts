import type { FaqItem } from "@/framework/types";

/** FAQ page calculateur de marge — texte brut pour Schema.org */
export const marginCalculatorFaq: FaqItem[] = [
  {
    question: "Comment calculer une marge de 30 % ?",
    answer:
      "Multipliez le prix d'achat HT par 1,30 pour obtenir le prix de vente HT. Exemple : 100 € HT d'achat × 1,30 = 130 € HT de vente, soit 30 € de marge. Ajoutez ensuite la TVA pour obtenir le prix TTC.",
  },
  {
    question: "Quelle différence entre bénéfice et marge ?",
    answer:
      "La marge commerciale est la différence entre le prix de vente HT et le prix d'achat HT d'un produit. Le bénéfice (résultat net) tient compte de tous les charges de l'entreprise : loyer, salaires, cotisations, amortissements. Une marge positive ne garantit pas un bénéfice.",
  },
  {
    question: "Comment calculer son prix de vente ?",
    answer:
      "Partez du prix d'achat HT, ajoutez la marge souhaitée (en euros ou en pourcentage), puis ajoutez la TVA au prix de vente HT. Formule : prix de vente HT = prix d'achat HT × (1 + taux de marge / 100), puis prix TTC = prix de vente HT + TVA.",
  },
  {
    question: "Quel taux de marge viser ?",
    answer:
      "Il n'existe pas de taux universel : il dépend du secteur, de la concurrence et des charges fixes. En commerce, un taux de marque de 25 à 40 % est fréquent ; en restauration ou artisanat, les marges varient fortement. L'essentiel est de couvrir vos coûts et de dégager un résultat.",
  },
  {
    question: "Comment ajouter la TVA à un prix de vente ?",
    answer:
      "Multipliez le prix de vente HT par le taux de TVA applicable, puis ajoutez le résultat au HT. Exemple à 20 % : 140 € HT × 0,20 = 28 € de TVA, soit 168 € TTC. Le taux dépend de votre activité (20 %, 10 %, 5,5 % ou 2,1 % en France métropolitaine).",
  },
  {
    question: "Comment retrouver le prix TTC ?",
    answer:
      "Le prix TTC est égal au prix de vente HT plus le montant de TVA : TTC = HT + (HT × taux de TVA). Pour un prix de vente HT de 140 € et une TVA à 20 %, le TTC est de 168 €. Un calculateur de marge HT / TTC effectue ce calcul automatiquement.",
  },
  {
    question: "Qu'est-ce que la marge commerciale ?",
    answer:
      "La marge commerciale est l'écart entre le prix de vente HT et le prix d'achat HT. Elle rémunère l'activité du commerçant ou de l'artisan : stockage, conseil, service après-vente, risque commercial. Le calcul marge commerciale est la base de tout calcul prix de vente.",
  },
  {
    question: "Comment utiliser le coefficient multiplicateur ?",
    answer:
      "Le coefficient multiplicateur est le rapport prix de vente HT ÷ prix d'achat HT. Avec une marge de 40 % sur l'achat, le coefficient est 1,40 : il suffit de multiplier tout prix d'achat par 1,40 pour obtenir le prix de vente HT. Pratique pour tarifer rapidement un catalogue.",
  },
];
