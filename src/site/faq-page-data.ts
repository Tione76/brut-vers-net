import type { FaqItem } from "@/framework/types";
import { FAQ_INTERNAL_LINKS as L } from "./faq-page-links";

export type FaqAnswerSegment = string | { href: string; link: string };

export interface FaqPageItem {
  question: string;
  answer: FaqAnswerSegment[];
}

export interface FaqPageCategory {
  title: string;
  items: FaqPageItem[];
}

export const FAQ_PAGE_H1 =
  "FAQ TVA : questions fréquentes sur les calculs HT, TTC et la TVA";

export const FAQ_PAGE_INTRO =
  "Cette page répond aux questions les plus fréquentes sur le calcul HT vers TTC, le calcul TTC vers HT, les taux de TVA, les factures, la TVA des entreprises, la franchise en base, les auto-entrepreneurs et la TVA collectée / déductible. Chaque réponse est rédigée pour être claire et fiable ; nos guides détaillés permettent d'aller plus loin sur chaque sujet.";

export const FAQ_PAGE_UPDATED = "juillet 2026";

export const FAQ_PAGE_META = {
  title: "FAQ TVA : calcul HT TTC, taux de TVA et factures",
  description:
    "Réponses simples aux questions fréquentes sur le calcul HT vers TTC, le TTC vers HT, les taux de TVA, les factures, la franchise en base et les auto-entrepreneurs.",
};

export const faqPageCategories: FaqPageCategory[] = [
  {
    title: "Calcul HT vers TTC",
    items: [
      {
        question: "Comment passer d'un prix HT à un prix TTC ?",
        answer: [
          "Pour convertir un prix hors taxes en prix toutes taxes comprises, multipliez le montant HT par (1 + taux de TVA), ou ajoutez au HT le montant de TVA calculé. Exemple à 20 % : 100 € HT × 1,20 = 120 € TTC (dont 20 € de TVA). Le taux dépend du bien ou du service vendu. Utilisez le ",
          L.calc,
          " pour obtenir le TTC instantanément selon le taux applicable à votre opération.",
        ],
      },
      {
        question: "Quelle est la formule pour calculer le TTC à partir du HT ?",
        answer: [
          "La formule est TTC = HT × (1 + taux de TVA). À 10 %, un prix HT de 200 € devient 220 € TTC (200 × 1,10). À 5,5 %, le coefficient est 1,055. Cette règle s'applique quel que soit le taux en vigueur. Pour choisir le bon coefficient, consultez le ",
          L.guideTaux,
          " ; le ",
          L.calc,
          " applique la formule et arrondit au centime d'euro.",
        ],
      },
      {
        question: "Comment calculer la TVA à partir d'un prix HT ?",
        answer: [
          "Multipliez le montant HT par le taux de TVA exprimé en décimal : TVA = HT × taux. À 20 %, pour 250 € HT, la TVA est de 50 € (250 × 0,20) et le TTC de 300 €. Le TTC correspond toujours à HT + TVA. Le ",
          L.calc,
          " calcule automatiquement la TVA et le TTC à partir de votre montant hors taxes, pour chaque taux disponible.",
        ],
      },
      {
        question: "Comment calculer une TVA à 20 % ?",
        answer: [
          "TVA = montant HT × 0,20. Pour 100 € HT, la TVA est de 20 € et le TTC de 120 €. C'est le taux normal en France métropolitaine, applicable par défaut lorsqu'aucun taux réduit ou intermédiaire n'est prévu. Vérifiez toutefois la nature de votre opération : certains biens et services relèvent d'autres taux. Le ",
          L.guideTaux,
          " détaille les activités concernées par chaque taux.",
        ],
      },
      {
        question: "Comment calculer une TVA à 10 % ?",
        answer: [
          "TVA = montant HT × 0,10. Pour 100 € HT, la TVA est de 10 € et le TTC de 110 €. Ce taux intermédiaire concerne notamment la restauration (sous conditions), certains travaux de rénovation dans des logements anciens et le transport de voyageurs. Avant de l'appliquer, confirmez que votre prestation entre dans le périmètre légal via le ",
          L.guideTaux,
          ".",
        ],
      },
      {
        question: "Comment calculer une TVA à 5,5 % ?",
        answer: [
          "TVA = montant HT × 0,055. Pour 100 € HT, la TVA est de 5,50 € et le TTC de 105,50 €. Ce taux réduit s'applique à une liste précise : denrées alimentaires de base, livres, abonnements d'énergie, certains travaux d'amélioration énergétique, etc. Le taux doit correspondre à chaque ligne de facture. Consultez le ",
          L.guideTaux,
          " pour vérifier l'éligibilité de vos produits ou services.",
        ],
      },
      {
        question: "Comment calculer une TVA à 2,1 % ?",
        answer: [
          "TVA = montant HT × 0,021. Pour 100 € HT, la TVA est de 2,10 € et le TTC de 102,10 €. Ce taux particulier (super-réduit) concerne notamment les médicaments remboursables par la Sécurité sociale, la presse et certaines licences audiovisuelles. Son champ d'application est étroit : ne l'utilisez que si votre opération y est expressément soumise. Le ",
          L.guideTaux,
          " recense les cas concernés.",
        ],
      },
      {
        question: "Pourquoi le prix TTC est-il supérieur au prix HT ?",
        answer: [
          "Le prix TTC inclut la TVA, impôt indirect collecté par l'entreprise pour le compte de l'État. Le HT correspond au montant commercial avant taxe ; la TVA vient s'y ajouter selon le taux applicable. C'est pourquoi le TTC est toujours supérieur au HT lorsque la vente est taxable. En franchise en base, l'entreprise ne facture pas de TVA : le prix affiché au client correspond alors au HT. Voir le ",
          L.guideFranchise,
          " pour ce régime.",
        ],
      },
      {
        question: "Comment arrondir un calcul de TVA ?",
        answer: [
          "En pratique comptable et sur les factures, les montants de TVA et les totaux TTC s'arrondissent au centime d'euro (deux décimales). Calculez d'abord la TVA ligne par ligne ou sur le total HT selon vos usages, puis arrondissez le résultat. De légers écarts peuvent apparaître si l'on arrondit la TVA avant ou après le cumul des lignes : l'important est d'être cohérent sur toute la facture. Le ",
          L.calc,
          " arrondit automatiquement au centime.",
        ],
      },
    ],
  },
  {
    title: "Calcul TTC vers HT",
    items: [
      {
        question: "Comment passer d'un prix TTC à un prix HT ?",
        answer: [
          "Divisez le montant TTC par (1 + taux de TVA). Exemple à 20 % : 120 € TTC ÷ 1,20 = 100 € HT. Cette opération inverse permet de retrouver le montant hors taxes à partir d'un prix toutes taxes comprises. Sélectionnez le mode TTC vers HT dans le ",
          L.calc,
          " pour effectuer ce calcul automatiquement, quel que soit le taux sélectionné.",
        ],
      },
      {
        question: "Quelle formule utiliser pour retrouver le HT à partir du TTC ?",
        answer: [
          "HT = TTC ÷ (1 + taux de TVA). À 5,5 %, un article à 105,50 € TTC correspond à 100 € HT (105,50 ÷ 1,055). Le montant de TVA inclus est la différence : TTC − HT. Cette formule est indispensable dès que vous partez d'un prix affiché en magasin ou d'un total TTC sur une facture. Vérifiez vos résultats avec le ",
          L.calc,
          " en mode TTC vers HT.",
        ],
      },
      {
        question: "Pourquoi ne faut-il pas simplement retirer 20 % d'un prix TTC ?",
        answer: [
          "Retirer 20 % d'un prix TTC revient à calculer 20 % du TTC, alors que la TVA représente 20 % du HT — pas du TTC. Sur 120 € TTC à 20 %, soustraire 20 % donne 96 €, ce qui est faux : le HT est 100 €. La bonne méthode est HT = TTC ÷ 1,20. Cette confusion est l'une des erreurs les plus fréquentes en calcul de prix. Utilisez le ",
          L.calc,
          " en mode inverse pour éviter ce piège.",
        ],
      },
      {
        question: "Comment retrouver uniquement le montant de TVA ?",
        answer: [
          "Deux méthodes équivalentes : TVA = TTC − HT, ou TVA = TTC × taux ÷ (1 + taux). Exemple à 20 % : pour 120 € TTC, TVA = 120 − 100 = 20 €, ou 120 × 0,20 ÷ 1,20 = 20 €. Commencez par retrouver le HT en divisant le TTC par (1 + taux), puis soustrayez-le du TTC. Le ",
          L.calc,
          " affiche séparément le HT, la TVA et le TTC.",
        ],
      },
      {
        question: "Comment calculer le HT avec un taux de TVA différent ?",
        answer: [
          "La méthode reste identique : HT = TTC ÷ (1 + taux). Changez uniquement le coefficient diviseur selon le taux applicable à la ligne concernée (1,10 pour 10 %, 1,055 pour 5,5 %, 1,021 pour 2,1 %). Sur une facture multi-taux, appliquez le calcul ligne par ligne. Le ",
          L.guideTaux,
          " aide à identifier le taux de chaque opération ; le ",
          L.calc,
          " permet de basculer entre les taux en un clic.",
        ],
      },
      {
        question: "Comment vérifier un prix TTC sur une facture ?",
        answer: [
          "Contrôlez que, pour chaque ligne, TTC = HT + TVA et que la TVA correspond au taux indiqué (TVA = HT × taux). Recalculez le HT à partir du TTC avec HT = TTC ÷ (1 + taux) et comparez au montant figurant sur la facture. Vérifiez aussi les totaux par taux et le total général. Le ",
          L.guideFacture,
          " détaille la présentation attendue ; le ",
          L.calc,
          " sert de contrôle rapide.",
        ],
      },
    ],
  },
  {
    title: "Taux de TVA",
    items: [
      {
        question: "Quels sont les taux de TVA en France ?",
        answer: [
          "En France métropolitaine, les principaux taux sont 20 % (normal), 10 % (intermédiaire), 5,5 % (réduit) et 2,1 % (particulier). La Corse et certains territoires d'outre-mer appliquent des taux spécifiques. Le taux dépend de la nature du bien ou du service, pas du choix du vendeur. Le ",
          L.guideTaux,
          " présente chaque taux avec des exemples par activité, territoire et cas particuliers.",
        ],
      },
      {
        question: "Quand appliquer le taux normal de 20 % ?",
        answer: [
          "Le taux de 20 % s'applique par défaut lorsqu'aucun taux réduit ou intermédiaire n'est prévu par la loi. Il concerne la majorité des ventes de biens, prestations de services, prestations intellectuelles et opérations non classées dans une catégorie spécifique. Avant de facturer, vérifiez qu'aucune exception ne s'applique à votre activité. Le ",
          L.guideTaux,
          " recense les principales exceptions et les taux alternatifs.",
        ],
      },
      {
        question: "Quand appliquer le taux intermédiaire de 10 % ?",
        answer: [
          "Le taux de 10 % concerne une liste limitée d'opérations : notamment certains travaux de rénovation dans des logements de plus de deux ans (sous conditions et attestation), la restauration sur place ou à emporter (selon les cas), le transport de voyageurs, les entrées de spectacles, etc. Chaque cas a ses conditions précises. Consultez le ",
          L.guideTaux,
          " avant d'appliquer ce taux sur vos devis et factures.",
        ],
      },
      {
        question: "Quand appliquer le taux réduit de 5,5 % ?",
        answer: [
          "Le taux de 5,5 % s'applique notamment aux denrées alimentaires de base, aux livres, aux abonnements de gaz et d'électricité, à certains équipements pour personnes handicapées et à des travaux d'amélioration de la qualité énergétique éligibles. La liste est fixée par la loi : une prestation non visée ne peut pas y être soumise, même à la demande du client. Le ",
          L.guideTaux,
          " détaille les produits et services éligibles.",
        ],
      },
      {
        question: "Quand appliquer le taux particulier de 2,1 % ?",
        answer: [
          "Le taux de 2,1 % est réservé à des catégories très spécifiques : médicaments remboursables par la Sécurité sociale, certaines publications de presse, licences de retransmission audiovisuelle, etc. Son usage est rare dans la vie courante d'une entreprise. Si vous n'êtes pas certain de l'éligibilité, référez-vous au ",
          L.guideTaux,
          " ou à la documentation de l'administration fiscale avant de facturer.",
        ],
      },
      {
        question: "Peut-on avoir plusieurs taux de TVA sur une même facture ?",
        answer: [
          "Oui. Lorsqu'une facture comporte des lignes soumises à des taux différents (par exemple des travaux à 10 % et des fournitures à 20 %), chaque ligne doit indiquer son taux, son montant HT et sa TVA. Les totaux de TVA sont ventilés par taux, puis cumulés pour le TTC global. Cette présentation est obligatoire pour la clarté du client et la déclaration de TVA. Le ",
          L.guideFacture,
          " montre comment structurer une facture multi-taux.",
        ],
      },
      {
        question: "Comment choisir le bon taux de TVA ?",
        answer: [
          "Identifiez d'abord la nature juridique de chaque bien ou service vendu, puis le territoire d'imposition (métropole, Corse, DOM…). Le taux découle de la loi, pas de votre secteur en général : deux prestations d'une même entreprise peuvent relever de taux différents. En cas de doute, consultez le ",
          L.guideTaux,
          " qui croise activités, exemples et références légales. Une erreur de taux expose à un redressement.",
        ],
      },
      {
        question: "Existe-t-il des taux différents en Corse ou en Outre-mer ?",
        answer: [
          "Oui. La Corse applique des taux spécifiques (notamment 10 %, 2,10 % et 0,90 % selon les opérations). En outre-mer, des taux en vigueur localement (octroi de mer, TVA spécifique) peuvent s'appliquer selon le territoire (Guadeloupe, Martinique, Guyane, Réunion, Mayotte). Les règles diffèrent de la métropole : ne transposez pas automatiquement les taux hexagonaux. Le ",
          L.guideTaux,
          " consacre une section aux spécificités territoriales.",
        ],
      },
    ],
  },
  {
    title: "Facture et TVA",
    items: [
      {
        question: "Comment indiquer la TVA sur une facture ?",
        answer: [
          "Chaque ligne taxable doit comporter le montant HT, le taux de TVA applicable et le montant de TVA correspondant. Le bas de facture présente un récapitulatif par taux (base HT, montant de TVA) et le total TTC. Si plusieurs taux coexistent, ventilez-les clairement. Les montants doivent être cohérents et arrondis au centime. Le ",
          L.guideFacture,
          " détaille la mise en page attendue avec des exemples commentés.",
        ],
      },
      {
        question: "Quelles mentions TVA sont obligatoires sur une facture ?",
        answer: [
          "Une facture conforme mentionne notamment le numéro de TVA intracommunautaire du vendeur, la date, l'identification des parties, la désignation des biens ou services, le prix unitaire HT, les rabais, le taux de TVA, le montant de TVA et le total TTC. En franchise en base, la mention « TVA non applicable, art. 293 B du CGI » remplace la ventilation de TVA. Le ",
          L.guideFacture,
          " liste l'ensemble des mentions légales avec des cas pratiques.",
        ],
      },
      {
        question: "Que faire si une facture comporte le mauvais taux de TVA ?",
        answer: [
          "Un taux erroné doit être corrigé : émettez un avoir (note de crédit) sur la facture initiale, puis refacturez avec le bon taux. Ne corrigez pas informellement un document déjà transmis. Si vous êtes le client, demandez une facture rectificative avant de déduire la TVA. L'erreur de taux peut entraîner un redressement et des intérêts de retard. Le ",
          L.guideFacture,
          " et le ",
          L.guideTaux,
          " aident à prévenir cette situation.",
        ],
      },
      {
        question: "Comment facturer plusieurs taux de TVA ?",
        answer: [
          "Ventilez vos lignes par taux : chaque prestation ou produit sur une ligne distincte avec son HT, son taux et sa TVA. En pied de facture, regroupez les bases HT et les montants de TVA par taux avant d'afficher le total TTC. Cette ventilation facilite la déclaration CA3 et la lecture par le client. Le ",
          L.guideFacture,
          " propose un exemple de facture mixte (plusieurs taux sur un même document).",
        ],
      },
      {
        question: "Comment calculer la TVA sur un devis ?",
        answer: [
          "Appliquez la même logique que sur une facture : pour chaque ligne, calculez TVA = HT × taux, puis TTC = HT + TVA. Indiquez clairement si les montants sont présentés en HT ou en TTC, et précisez le taux retenu. Un devis doit permettre au client de comprendre le montant final à payer. Utilisez le ",
          L.calc,
          " pour vérifier vos totaux ; le ",
          L.guideFacture,
          " rappelle les bonnes pratiques de présentation.",
        ],
      },
      {
        question: "Comment calculer la TVA après une remise ?",
        answer: [
          "La TVA s'applique sur le prix HT net, après remise. Exemple : 1 000 € HT − 10 % de remise = 900 € HT de base taxable ; à 20 %, TVA = 180 € et TTC = 1 080 €. La remise doit figurer sur la facture avant le calcul de la TVA. Ne calculez pas la TVA sur le montant brut puis déduisez la remise. Le ",
          L.calc,
          " peut servir à contrôler le TTC après application d'une remise sur le HT.",
        ],
      },
    ],
  },
  {
    title: "Auto-entrepreneur et franchise en base",
    items: [
      {
        question: "Un auto-entrepreneur doit-il facturer la TVA ?",
        answer: [
          "En principe, non s'il bénéficie de la franchise en base de TVA (article 293 B du CGI) et respecte les seuils de chiffre d'affaires. Il facture alors en HT sans TVA et applique la mention obligatoire. Au-delà des seuils ou sur option pour la TVA, il devient assujetti et doit collecter la TVA. Les règles spécifiques aux micro-entrepreneurs sont détaillées dans le ",
          L.guideAe,
          " et le ",
          L.guideFranchise,
          ".",
        ],
      },
      {
        question: "Qu'est-ce que la franchise en base de TVA ?",
        answer: [
          "La franchise en base permet aux entreprises dont le chiffre d'affaires reste sous certains plafonds de ne pas facturer ni collecter la TVA. En contrepartie, elles ne déduisent pas la TVA sur leurs achats. Les seuils varient selon l'activité (par exemple 85 000 € pour les ventes, 37 500 € pour les services en 2026). Le ",
          L.guideFranchise,
          " explique les plafonds, la mention sur facture et les conséquences d'un dépassement.",
        ],
      },
      {
        question: "Quelle mention mettre sur une facture sans TVA ?",
        answer: [
          "Les entreprises en franchise en base doivent faire figurer la mention « TVA non applicable, art. 293 B du CGI » sur leurs factures, devis et notes. Aucun montant de TVA ni de TTC distinct du HT n'est alors attendu pour la taxe. Cette mention informe le client que la TVA n'a pas été collectée. Le ",
          L.guideFacture,
          " montre des exemples de factures avec et sans TVA.",
        ],
      },
      {
        question: "À partir de quand un auto-entrepreneur doit-il facturer la TVA ?",
        answer: [
          "L'assujettissement intervient lors du dépassement des seuils de franchise (seuil de base ou seuil majoré selon les cas), ou dès le premier jour du mois de déclaration si l'option pour la TVA a été exercée. Dès lors, la TVA doit figurer sur les factures émises. Les modalités de passage et les délais sont expliqués dans le ",
          L.guideAe,
          " — vérifiez votre situation dès que votre chiffre d'affaires approche les plafonds.",
        ],
      },
      {
        question: "Peut-on récupérer la TVA en franchise en base ?",
        answer: [
          "Non. Une entreprise en franchise en base ne collecte pas la TVA sur ses ventes et ne peut pas déduire celle payée sur ses achats professionnels : la TVA d'achat constitue un coût pour elle. C'est le contrepartie de l'exonération. Si vous souhaitez récupérer la TVA sur vos dépenses, vous devez être assujetti (option ou dépassement de seuil). Voir le ",
          L.guideFranchise,
          " et le ",
          L.guideDeductible,
          " pour comparer les régimes.",
        ],
      },
      {
        question: "Une société peut-elle bénéficier de la franchise en base ?",
        answer: [
          "Oui, sous conditions de chiffre d'affaires. La franchise en base n'est pas réservée aux auto-entrepreneurs : une EURL, une SARL ou une autre société peut en bénéficier si son CA reste sous les plafonds applicables à son activité. Les mêmes règles de seuils et de mention sur facture s'appliquent. Le ",
          L.guideFranchise,
          " détaille les conditions communes à toutes les formes juridiques éligibles.",
        ],
      },
    ],
  },
  {
    title: "TVA collectée et TVA déductible",
    items: [
      {
        question: "Qu'est-ce que la TVA collectée ?",
        answer: [
          "La TVA collectée est la taxe que vous facturez à vos clients sur vos ventes de biens ou services. Vous l'encaissez avec le prix de vente, mais elle n'appartient pas à l'entreprise : elle doit être reversée à l'État après déduction éventuelle de la TVA sur vos achats. Elle apparaît sur vos factures émises et se déclare périodiquement (CA3). Le ",
          L.guideDeductible,
          " explique comment la suivre et la déclarer.",
        ],
      },
      {
        question: "Qu'est-ce que la TVA déductible ?",
        answer: [
          "La TVA déductible est celle que vous payez à vos fournisseurs sur des achats professionnels éligibles. Sous conditions (facture conforme, opération taxable, absence d'exclusion), vous pouvez l'imputer sur votre déclaration pour réduire la TVA à reverser. Elle figure sur vos factures d'achat. Le droit à déduction repose principalement sur l'article 271 du CGI. Le ",
          L.guideDeductible,
          " détaille les conditions et les dépenses exclues ou limitées.",
        ],
      },
      {
        question: "Quelle différence entre TVA collectée et TVA déductible ?",
        answer: [
          "La TVA collectée provient de vos ventes (vous la percevez pour l'État) ; la TVA déductible provient de vos achats (vous pouvez la récupérer). La TVA due se calcule en simplifié par : collectée − déductible. Un solde négatif forme un crédit de TVA reportable ou remboursable. Cette mécanique ne s'applique qu'aux entreprises assujetties, pas aux franchisés en base. Approfondissez avec le ",
          L.guideDeductible,
          ".",
        ],
      },
      {
        question: "Comment calculer la TVA à reverser ?",
        answer: [
          "Totalisez la TVA collectée sur la période (ventes), totalisez la TVA déductible (achats éligibles), puis soustrayez : TVA due = TVA collectée − TVA déductible. Appliquez le coefficient de déduction si votre activité est mixte (opérations taxables et exonérées). Un résultat positif est à payer ; un résultat négatif constitue un crédit. Le ",
          L.guideDeductible,
          " détaille la déclaration CA3 et les exemples chiffrés.",
        ],
      },
      {
        question: "Qu'est-ce qu'un crédit de TVA ?",
        answer: [
          "Un crédit de TVA apparaît lorsque la TVA déductible dépasse la TVA collectée sur une période (investissements en début d'activité, saisonnalité…). Il est reporté sur les déclarations suivantes ou peut faire l'objet d'une demande de remboursement si les seuils applicables sont atteints. Il ne s'agit pas d'un « bénéfice », mais d'un trop-perçu temporaire de TVA. Le ",
          L.guideDeductible,
          " explique les cases CA3 et les modalités de remboursement.",
        ],
      },
      {
        question: "Quand peut-on récupérer la TVA sur un achat professionnel ?",
        answer: [
          "La déduction est possible si vous êtes assujetti à la TVA, disposez d'une facture conforme, la TVA a été légalement facturée, la dépense sert votre activité taxable et aucune exclusion ne s'applique (certaines dépenses de réception, cadeaux, véhicules de tourisme…). En franchise en base, aucune récupération n'est possible. Le ",
          L.guideDeductible,
          " propose une checklist et des exemples par type de dépense.",
        ],
      },
    ],
  },
  {
    title: "Erreurs fréquentes",
    items: [
      {
        question: "Pourquoi enlever 20 % d'un prix TTC est faux ?",
        answer: [
          "Parce que 20 % de TVA s'applique sur le HT, pas sur le TTC. Retirer 20 % du TTC sous-estime le montant hors taxes. Exemple : 120 € TTC à 20 % — soustraire 20 % donne 96 €, alors que le HT est 100 €. La formule correcte est HT = TTC ÷ 1,20. Cette erreur fausse les devis, les marges et les déclarations. Utilisez le ",
          L.calc,
          " en mode TTC vers HT pour sécuriser vos calculs.",
        ],
      },
      {
        question: "Quelle erreur éviter avec les taux de TVA ?",
        answer: [
          "L'erreur la plus courante est d'appliquer un taux réduit ou intermédiaire sans vérifier que l'opération y est éligible. Chaque taux a un périmètre légal précis : un travaux à 10 % exige des conditions (logement, attestation…), la restauration a des règles spécifiques. Appliquer le mauvais taux expose à un redressement. Avant de facturer, croisez votre prestation avec le ",
          L.guideTaux,
          " et documentez votre choix.",
        ],
      },
      {
        question: "Pourquoi confondre HT et TTC peut fausser un devis ?",
        answer: [
          "Si vous cotez un projet en HT alors que le client compare des prix TTC (ou l'inverse), les montants ne sont pas comparables et le devis peut être accepté ou refusé sur une base erronée. Précisez systématiquement si vos montants sont HT ou TTC, et ventilez la TVA. Pour fixer un prix de revente cohérent, le ",
          L.margin,
          " aide à intégrer marge et TVA. Le ",
          L.guideFacture,
          " rappelle les bonnes pratiques de présentation.",
        ],
      },
      {
        question: "Pourquoi la TVA n'est-elle pas toujours un coût pour l'entreprise ?",
        answer: [
          "Pour une entreprise assujettie, la TVA payée sur les achats professionnels éligibles est en principe déductible : elle ne pèse pas sur le résultat, car elle vient en déduction de la TVA collectée. En revanche, en franchise en base, la TVA d'achat n'est pas récupérable et constitue bien un coût. La TVA collectée n'appartient jamais à l'entreprise : elle est due à l'État. Le ",
          L.guideDeductible,
          " explique cette mécanique en détail.",
        ],
      },
      {
        question: "Que vérifier avant d'envoyer une facture avec TVA ?",
        answer: [
          "Contrôlez : le bon taux par ligne, la cohérence HT + TVA = TTC, les mentions obligatoires (dont le n° de TVA du vendeur), l'identification du client, la date et la numérotation. Vérifiez aussi que vous êtes bien assujetti (ou la mention franchise le cas échéant). Une facture erronée complique la comptabilité du client et peut bloquer sa déduction. Le ",
          L.guideFacture,
          " propose une checklist complète avant envoi.",
        ],
      },
    ],
  },
];

function answerToPlainText(segments: FaqAnswerSegment[]): string {
  return segments.map((seg) => (typeof seg === "string" ? seg : seg.link)).join("");
}

/** Liste aplatie pour JSON-LD FAQPage */
export function getFaqPageSchemaItems(): FaqItem[] {
  return faqPageCategories.flatMap((category) =>
    category.items.map((item) => ({
      question: item.question,
      answer: answerToPlainText(item.answer),
    })),
  );
}
