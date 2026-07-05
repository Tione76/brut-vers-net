import type { FaqItem } from "@/framework/types";

/** Catégories et questions — texte brut pour Schema.org FAQPage */
export const faqPageCategories: { title: string; items: FaqItem[] }[] = [
  {
    title: "Calcul HT vers TTC",
    items: [
      {
        question: "Comment passer d'un prix HT à un prix TTC ?",
        answer:
          "Multipliez le montant hors taxes par (1 + taux de TVA), ou ajoutez simplement le montant de TVA au prix HT. Exemple à 20 % : 100 € HT × 1,20 = 120 € TTC. Utilisez le calculateur HT vers TTC pour obtenir le résultat instantanément selon le taux applicable.",
      },
      {
        question: "Comment calculer la TVA à partir d'un montant HT ?",
        answer:
          "Multipliez le montant HT par le taux de TVA en décimal. À 20 % : TVA = HT × 0,20. Pour 250 € HT, la TVA est de 50 € et le TTC de 300 €. Le montant TTC correspond au HT plus la TVA calculée.",
      },
      {
        question: "Quelle est la formule pour convertir HT vers TTC ?",
        answer:
          "La formule est TTC = HT × (1 + taux de TVA). Avec un taux de 10 %, un prix HT de 200 € devient 220 € TTC (200 × 1,10). Cette formule s'applique quel que soit le taux en vigueur pour votre produit ou service.",
      },
      {
        question: "Quelle est la différence entre HT, TVA et TTC ?",
        answer:
          "Le HT (hors taxes) est le montant facturé avant taxe. La TVA est l'impôt calculé sur ce montant. Le TTC (toutes taxes comprises) est le total payé par le client : HT + TVA. Sur une facture, les trois montants doivent apparaître distinctement.",
      },
      {
        question: "Que signifie prix hors taxes ?",
        answer:
          "Un prix hors taxes (HT) est un montant qui n'inclut pas la TVA. C'est le tarif de base utilisé par les professionnels assujettis pour établir devis et factures avant d'ajouter la taxe. Le client particulier paiera ensuite le prix TTC correspondant.",
      },
      {
        question: "Que signifie prix toutes taxes comprises ?",
        answer:
          "Un prix toutes taxes comprises (TTC) inclut la TVA. C'est le montant final affiché en magasin ou payé par le client. Pour retrouver le HT à partir d'un TTC, divisez par (1 + taux de TVA).",
      },
    ],
  },
  {
    title: "Calcul TTC vers HT",
    items: [
      {
        question: "Comment passer d'un prix TTC à un prix HT ?",
        answer:
          "Divisez le montant TTC par (1 + taux de TVA). Exemple à 20 % : 120 € TTC ÷ 1,20 = 100 € HT. Sélectionnez le mode TTC vers HT dans le calculateur pour effectuer ce calcul inverse automatiquement.",
      },
      {
        question: "Quelle est la formule pour retrouver le HT à partir du TTC ?",
        answer:
          "HT = TTC ÷ (1 + taux de TVA). À 5,5 %, un article à 105,50 € TTC correspond à 100 € HT (105,50 ÷ 1,055). La TVA incluse est la différence entre TTC et HT.",
      },
    ],
  },
  {
    title: "Taux de TVA",
    items: [
      {
        question: "Comment calculer une TVA à 20 % ?",
        answer:
          "TVA = montant HT × 0,20. Pour 100 € HT, la TVA est de 20 € et le TTC de 120 €. C'est le taux normal, applicable à la majorité des biens et services en France métropolitaine.",
      },
      {
        question: "Comment calculer une TVA à 10 % ?",
        answer:
          "TVA = montant HT × 0,10. Pour 100 € HT, la TVA est de 10 € et le TTC de 110 €. Ce taux intermédiaire concerne notamment la restauration, certains travaux de rénovation et le transport de voyageurs.",
      },
      {
        question: "Comment calculer une TVA à 5,5 % ?",
        answer:
          "TVA = montant HT × 0,055. Pour 100 € HT, la TVA est de 5,50 € et le TTC de 105,50 €. Ce taux réduit s'applique à l'alimentation de base, aux livres, à l'énergie et à certains équipements pour personnes handicapées.",
      },
      {
        question: "Comment calculer une TVA à 2,1 % ?",
        answer:
          "TVA = montant HT × 0,021. Pour 100 € HT, la TVA est de 2,10 € et le TTC de 102,10 €. Ce taux super-réduit concerne principalement les médicaments remboursables, la presse et les licences audiovisuelles.",
      },
      {
        question: "Quel taux de TVA appliquer en France ?",
        answer:
          "Le taux dépend de la nature du bien ou du service vendu : 20 % (normal), 10 %, 5,5 % ou 2,1 %. En cas de doute, consultez le guide complet sur les taux de TVA en France qui détaille les cas par activité et par territoire.",
      },
      {
        question: "Quand utiliser le taux normal de TVA à 20 % ?",
        answer:
          "Le taux de 20 % s'applique par défaut lorsqu'aucun taux réduit ou intermédiaire n'est prévu par la loi. La plupart des prestations de services, ventes de biens et produits non alimentaires y sont soumis.",
      },
      {
        question: "Quand utiliser le taux réduit de TVA à 5,5 % ?",
        answer:
          "Le taux de 5,5 % concerne une liste précise de produits et services : denrées alimentaires de base, livres, abonnements gaz et électricité, certains travaux d'amélioration de la qualité énergétique, etc. Vérifiez que votre activité entre bien dans le périmètre légal.",
      },
      {
        question: "Peut-on avoir plusieurs taux de TVA sur une même facture ?",
        answer:
          "Oui. Si une facture comporte des lignes soumises à des taux différents (par exemple des travaux à 10 % et des fournitures à 20 %), chaque ligne doit indiquer son taux, son montant HT, sa TVA et un total TTC global doit être calculé.",
      },
    ],
  },
  {
    title: "Facture et TVA",
    items: [
      {
        question: "Comment indiquer la TVA sur une facture ?",
        answer:
          "Une facture conforme doit mentionner le montant HT par ligne ou globalement, le taux de TVA applicable, le montant de TVA par taux et le total TTC. En cas de plusieurs taux, ventilez clairement chaque part de TVA. Le guide sur la facture conforme détaille toutes les mentions obligatoires.",
      },
    ],
  },
  {
    title: "Auto-entrepreneur, franchise et TVA",
    items: [
      {
        question: "Un auto-entrepreneur doit-il facturer la TVA ?",
        answer:
          "En principe, non s'il bénéficie de la franchise en base de TVA (article 293 B du CGI) et n'a pas dépassé les seuils de chiffre d'affaires. Dans ce cas, il facture en HT sans TVA et mentionne « TVA non applicable, art. 293 B du CGI ». Au-delà des seuils ou sur option, il devient assujetti.",
      },
      {
        question: "Qu'est-ce que la franchise en base de TVA ?",
        answer:
          "La franchise en base permet aux petites entreprises de ne pas facturer ni collecter la TVA tant que leur chiffre d'affaires reste sous certains plafonds (37 500 € ou 85 000 € selon l'activité). Pas de TVA collectée, pas de TVA déductible sur les achats. Le guide franchise en base de TVA explique les seuils et obligations.",
      },
      {
        question: "Quelle différence entre TVA collectée et TVA déductible ?",
        answer:
          "La TVA collectée est celle que vous facturez à vos clients sur vos ventes. La TVA déductible est celle payée sur vos achats professionnels et récupérable. La TVA due à l'État correspond en simplifié à collectée − déductible. Voir le guide TVA déductible et TVA collectée pour la mécanique complète.",
      },
    ],
  },
];

/** Liste aplatie pour JSON-LD FAQPage */
export function getFaqPageSchemaItems(): FaqItem[] {
  return faqPageCategories.flatMap((category) => category.items);
}

export const FAQ_PAGE_H1 =
  "Questions fréquentes sur le calcul HT vers TTC, la TVA et les prix TTC";

export const FAQ_PAGE_INTRO =
  "Vous devez convertir un montant HT vers TTC, retrouver un prix hors taxes à partir du TTC ou choisir le bon taux de TVA ? Retrouvez ici les réponses essentielles, avec des exemples chiffrés et des liens vers nos guides détaillés.";

export const FAQ_PAGE_META = {
  title: "FAQ TVA : calcul HT vers TTC, TTC vers HT et taux de TVA",
  description:
    "Réponses simples aux questions fréquentes sur le calcul HT vers TTC, le TTC vers HT, les taux de TVA, les factures et la franchise en base de TVA.",
};
