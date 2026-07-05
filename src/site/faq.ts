/**
 * FAQ du site — page d'accueil et page /faq.
 */
export const faq = [
  {
    question: "Comment convertir un montant HT vers TTC ?",
    answer:
      "Multipliez le montant HT par (1 + taux de TVA). Exemple : 100 € HT vers TTC à 20 % donnent 120 € TTC, dont 20 € de TVA. Saisissez votre montant dans le calculateur HT vers TTC ci-dessus, choisissez le taux et cliquez sur Calculer.",
  },
  {
    question: "Comment passer un prix TTC vers HT ?",
    answer:
      "Divisez le montant TTC par (1 + taux de TVA). Exemple : 120 € TTC vers HT à 20 % = 100 € HT. Sélectionnez le mode « TTC vers HT » dans le calculateur pour effectuer ce calcul TTC vers HT automatiquement.",
  },
  {
    question: "Quelle est la formule du calcul HT vers TTC ?",
    answer:
      "TTC = HT × (1 + taux de TVA). Le montant de TVA = TTC − HT. Pour un calcul TTC vers HT : HT = TTC ÷ (1 + taux). Le calculateur applique ces formules selon le sens choisi.",
  },
  {
    question: "Quels taux de TVA utiliser pour un calcul HT vers TTC ?",
    answer:
      "Les principaux taux en France sont 20 % (normal), 10 %, 5,5 % et 2,1 %. Le taux dépend du bien ou du service vendu. Consultez notre guide sur les taux de TVA en France pour choisir le bon taux avant de convertir HT vers TTC.",
  },
  {
    question: "Ce calculateur HT vers TTC est-il gratuit ?",
    answer:
      "Oui. Le calculateur HT vers TTC et le calcul TTC vers HT sont entièrement gratuits, sans inscription. Les calculs sont effectués dans votre navigateur : aucun montant n'est transmis ni conservé.",
  },
  {
    question: "Puis-je convertir plusieurs montants HT vers TTC à la suite ?",
    answer:
      "Oui. Modifiez le montant ou le taux et cliquez à nouveau sur Calculer. Vous pouvez enchaîner autant de conversions HT vers TTC ou TTC vers HT que nécessaire, par exemple pour comparer plusieurs devis.",
  },
];
