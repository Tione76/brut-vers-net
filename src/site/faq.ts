/**
 * FAQ du site — page d'accueil (Schema.org) et source des questions.
 */
export const faq = [
  {
    question: "Comment convertir un montant HT vers TTC ?",
    answer:
      "Multipliez le montant HT par (1 + taux de TVA). Exemple : 100 € HT à 20 % donnent 120 € TTC, dont 20 € de TVA. Saisissez votre montant dans le calculateur : le résultat se met à jour instantanément.",
  },
  {
    question: "Comment passer un prix TTC vers HT ?",
    answer:
      "Divisez le montant TTC par (1 + taux de TVA). Exemple : 120 € TTC à 20 % = 100 € HT. Sélectionnez le mode TTC vers HT dans le calculateur pour effectuer ce calcul automatiquement.",
  },
  {
    question: "Quelle est la formule du calcul HT vers TTC ?",
    answer:
      "TTC = HT × (1 + taux de TVA). Le montant de TVA = TTC − HT (ou HT × taux de TVA). Pour un calcul TTC vers HT : HT = TTC ÷ (1 + taux). Le calculateur applique ces formules et arrondit les montants au centime d'euro.",
  },
  {
    question: "Quels taux de TVA utiliser pour un calcul HT vers TTC ?",
    answer:
      "En France métropolitaine, les principaux taux sont 20 % (normal), 10 %, 5,5 % et 2,1 %. Le taux dépend du bien ou du service vendu. La Corse et certains DOM appliquent des régimes particuliers. Consultez le guide sur les taux de TVA en France pour choisir le bon taux.",
  },
  {
    question: "Ce calculateur HT vers TTC est-il gratuit ?",
    answer:
      "Oui. Le calculateur HT vers TTC et le calcul TTC vers HT sont entièrement gratuits, sans inscription. Les calculs sont effectués dans votre navigateur : aucun montant n'est transmis ni conservé.",
  },
  {
    question: "Puis-je convertir plusieurs montants HT vers TTC à la suite ?",
    answer:
      "Oui. Modifiez le montant ou le taux : le résultat se met à jour aussitôt. Vous pouvez enchaîner autant de conversions HT vers TTC ou TTC vers HT que nécessaire.",
  },
];
