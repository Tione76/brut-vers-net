import type { FaqItem } from "@/framework/types";
import { FAQ_INTERNAL_LINKS as L } from "./faq-page-links";

export type FaqAnswerSegment = string | { href: string; link: string };

export interface FaqPageItem {
  question: string;
  answer: FaqAnswerSegment[];
}

export interface FaqPageCategory {
  id: string;
  title: string;
  tocLabel: string;
  items: FaqPageItem[];
}

/** Métadonnées SEO déjà validées (ne pas modifier sans validation). */
export const FAQ_PAGE_META = {
  title: "Questions fréquentes sur le salaire et la rémunération",
  description:
    "Toutes les réponses à vos questions sur le salaire, la rémunération, les cotisations, la fiche de paie, le prélèvement à la source et bien plus.",
};

export const FAQ_PAGE_H1 = "Questions fréquentes sur le salaire et la rémunération";

export const FAQ_PAGE_SUBTITLE =
  "Salaire brut, salaire net, cotisations, fiche de paie, prélèvement à la source et outils de calcul.";

export const FAQ_PAGE_INTRO =
  "Retrouvez les réponses aux questions les plus fréquentes sur le salaire et la rémunération en France : salaire brut et net, cotisations, fiche de paie, prélèvement à la source, augmentation, heures supplémentaires et indemnité de licenciement. Utilisez également nos calculateurs et consultez nos guides pour approfondir chaque sujet.";

/** Date éditoriale stable : à mettre à jour manuellement après une révision significative du contenu. */
export const FAQ_PAGE_UPDATED = "17 juillet 2026";

export const FAQ_PAGE_OUTRO_SEGMENTS: FaqAnswerSegment[] = [
  "Pour aller plus loin, explorez la ",
  L.toolsHub,
  " ou consultez la ",
  L.guidesHub,
  ". Les réponses de cette FAQ sont générales : votre fiche de paie, votre convention collective et votre situation personnelle restent les références en cas de doute.",
];

export const faqPageCategories: FaqPageCategory[] = [
  {
    id: "salaire-brut-et-net",
    title: "Salaire brut et salaire net",
    tocLabel: "Salaire brut et net",
    items: [
      {
        question: "Quelle est la différence entre le salaire brut et le salaire net ?",
        answer: [
          "Le salaire brut est le montant avant cotisations salariales, celui qui figure en général sur le contrat ou l'offre d'emploi. Le salaire net est ce qui reste après ces cotisations : on parle de net avant impôt, puis de net versé une fois le prélèvement à la source retiré. Pour suivre chaque étape de ce passage, consultez notre ",
          L.guideBrutNet,
          ".",
        ],
      },
      {
        question: "Pourquoi le salaire net est-il inférieur au salaire brut ?",
        answer: [
          "Parce que des cotisations salariales sont prélevées sur le salaire brut (maladie, retraite, chômage, CSG-CRDS, notamment). Ces retenues financent la protection sociale et réduisent mécaniquement le montant restant. Le prélèvement à la source peut ensuite encore diminuer le virement reçu. L'écart brut / net n'est donc pas une erreur de calcul : c'est le fonctionnement habituel de la rémunération en France.",
        ],
      },
      {
        question: "Quel pourcentage retirer du brut pour obtenir le net ?",
        answer: [
          "Aucun pourcentage unique ne s'applique à tous les salariés. Le passage du salaire brut au salaire net dépend des cotisations salariales, du statut (cadre, non-cadre, fonction publique), des plafonds et de la situation personnelle. À titre purement indicatif, on observe souvent autour de 22 % de retenues pour un non-cadre du privé, plutôt près de 25 % pour un cadre, et un peu moins pour certains agents publics, hors cas particuliers. Pour une estimation personnalisée plutôt qu'un pourcentage approximatif, utilisez le ",
          L.calcBrutNet,
          ".",
        ],
      },
      {
        question: "Quelle différence entre salaire net et salaire net imposable ?",
        answer: [
          "Le salaire net avant impôt correspond au brut diminué des cotisations salariales. Le net imposable est la base utilisée pour le prélèvement à la source : il part de ce net, puis réintègre certaines cotisations non déductibles, notamment une part de CSG. Sur une fiche de paie, les deux montants sont proches mais distincts ; ils ne répondent pas à la même question.",
        ],
      },
      {
        question: "Quelle différence entre salaire net avant impôt et salaire net versé ?",
        answer: [
          "Le net avant impôt est le salaire après cotisations salariales, avant le prélèvement à la source. Le net versé (souvent appelé net à payer) est le montant qui arrive sur votre compte après ce prélèvement. Quand on parle de « salaire après impôt », on désigne en général ce net versé. Le détail de chaque ligne se lit sur votre bulletin.",
        ],
      },
      {
        question: "Le salaire brut du contrat correspond-il au montant perçu ?",
        answer: [
          "Non. Le brut contractuel sert de base de calcul, pas de montant versé. Entre les deux interviennent les cotisations salariales, puis le prélèvement à la source le cas échéant, sans compter primes, absences ou heures supplémentaires. Pour estimer ce que vous pourriez percevoir, utilisez le ",
          L.calcBrutNet,
          ", puis comparez avec votre fiche de paie.",
        ],
      },
    ],
  },
  {
    id: "calcul-brut-vers-net",
    title: "Calcul du salaire brut vers net",
    tocLabel: "Calcul brut vers net",
    items: [
      {
        question: "Comment calculer son salaire brut en net ?",
        answer: [
          "Partez du salaire brut, retirez les cotisations salariales pour obtenir le net avant impôt, puis appliquez le prélèvement à la source si vous voulez le net versé. En pratique, on utilise souvent un coefficient selon le profil (cadre, non-cadre, fonction publique) pour obtenir un ordre de grandeur. Notre ",
          L.guideCalculerNet,
          " détaille la méthode pas à pas ; le ",
          L.calcBrutNet,
          " fournit une estimation immédiate.",
        ],
      },
      {
        question: "Comment calculer son salaire net à partir de son taux horaire brut ?",
        answer: [
          "Multipliez d'abord le taux horaire brut par le nombre d'heures du mois (151,67 heures à temps plein, proratisées en temps partiel) pour obtenir un brut mensuel, puis convertissez ce mensuel en net selon votre profil. Le calculateur accepte directement un montant horaire et affiche les équivalents mensuel et annuel. Saisissez votre taux dans le ",
          L.calcBrutNet,
          " pour obtenir une estimation sans recalculer à la main.",
        ],
      },
      {
        question: "Peut-on convertir un salaire annuel brut en salaire net ?",
        answer: [
          "Oui. Divisez d'abord l'annuel par le nombre de mois réellement payés (souvent 12, parfois 13 ou 14), convertissez le mensuel en net, puis remontez à l'année si besoin. Indiquez le bon nombre de mois pour ne pas fausser la comparaison. Cette conversion reste une estimation : primes variables et avantages en nature ne sont pas toujours intégrés. Le ",
          L.calcBrutNet,
          " gère ces conversions en une seule saisie.",
        ],
      },
      {
        question: "Le statut cadre ou non-cadre change-t-il le salaire net ?",
        answer: [
          "Oui, en général. À salaire brut égal, un cadre a souvent des cotisations salariales un peu plus élevées qu'un non-cadre, donc un net avant impôt un peu plus bas. La fonction publique suit encore une autre logique de retenues. C'est pourquoi toute estimation doit préciser le profil. Le résultat reste indicatif et ne remplace pas votre bulletin.",
        ],
      },
      {
        question: "Pourquoi le résultat brut vers net peut-il varier ?",
        answer: [
          "Parce que le net dépend du statut, du temps de travail, des plafonds de cotisations, des primes, des heures supplémentaires, de la convention collective et du taux de prélèvement à la source. Deux personnes avec le même brut mensuel peuvent donc obtenir des nets différents. Un calculateur donne un ordre de grandeur ; votre fiche de paie reste la référence.",
        ],
      },
      {
        question: "Comment calculer un salaire net en brut ?",
        answer: [
          "On reconstitue le brut à partir du net en appliquant, à l'envers, le coefficient ou le taux de cotisations adapté au profil. Cette conversion est utile en négociation ou pour comparer une offre exprimée en net. Cadre, non-cadre ou fonction publique modifient le résultat. Le ",
          L.calcBrutNet,
          " permet de saisir un net et d'obtenir le brut équivalent en estimation.",
        ],
      },
    ],
  },
  {
    id: "cotisations-et-fiche-de-paie",
    title: "Cotisations salariales et fiche de paie",
    tocLabel: "Cotisations et fiche de paie",
    items: [
      {
        question: "Que sont les cotisations salariales ?",
        answer: [
          "Ce sont les retenues prélevées sur votre salaire brut pour financer la Sécurité sociale, la retraite, l'assurance chômage et d'autres contributions, dont la CSG et la CRDS. Elles expliquent l'essentiel de l'écart entre salaire brut et salaire net avant impôt. Pour une explication détaillée, consultez notre ",
          L.guideCotisations,
          ".",
        ],
      },
      {
        question: "Quelles cotisations sont déduites du salaire brut ?",
        answer: [
          "On retrouve notamment, selon les cas, la part salariale liée à la maladie, la retraite de base et complémentaire, le chômage, la CSG, la CRDS et parfois d'autres contributions. L'employeur paie aussi des cotisations patronales : elles n'apparaissent pas comme une baisse de votre net, mais font partie du coût total du travail. Le détail exact figure ligne par ligne sur votre fiche de paie.",
        ],
      },
      {
        question: "Comment lire une fiche de paie ?",
        answer: [
          "Commencez par l'identité de l'employeur et du salarié, puis le salaire brut (salaire de base, primes, heures). Examinez ensuite le bloc des cotisations, puis les totaux : net imposable, net avant impôt, prélèvement à la source et net à payer. Notre ",
          L.guideFichePaie,
          " propose un parcours de lecture simple du haut vers le bas du bulletin.",
        ],
      },
      {
        question: "Où trouver le salaire net sur une fiche de paie ?",
        answer: [
          "Le montant réellement versé apparaît en général sous l'intitulé « net à payer » ou « net à payer après impôt sur le revenu ». Plus haut sur le bulletin, vous trouverez souvent le net avant impôt et le net imposable. Ne confondez pas ces libellés : seul le net à payer correspond au virement, hors acomptes ou régularisations particulières.",
        ],
      },
      {
        question: "Quelle différence entre net à payer et net imposable ?",
        answer: [
          "Le net à payer est ce que vous percevez après cotisations et, le cas échéant, après prélèvement à la source. Le net imposable sert de base au calcul de ce prélèvement et à la déclaration de revenus. Il peut être supérieur au net avant impôt, car certaines cotisations non déductibles y sont réintégrées. Les deux montants sont utiles, mais ne mesurent pas la même chose.",
        ],
      },
    ],
  },
  {
    id: "prelevement-a-la-source",
    title: "Prélèvement à la source et salaire après impôt",
    tocLabel: "Prélèvement à la source",
    items: [
      {
        question: "Qu'est-ce que le prélèvement à la source ?",
        answer: [
          "C'est le mode de recouvrement de l'impôt sur le revenu : l'employeur retient chaque mois une fraction de votre rémunération et la reverse à l'administration fiscale. Vous payez ainsi l'impôt au fil de l'eau, plutôt qu'en une fois l'année suivante. Notre ",
          L.guidePas,
          " explique le fonctionnement, les types de taux et leur lecture sur la fiche de paie.",
        ],
      },
      {
        question: "Comment le prélèvement à la source est-il calculé ?",
        answer: [
          "En multipliant le net imposable du mois par votre taux de prélèvement (personnalisé, individualisé ou non personnalisé). Le taux dépend de votre situation fiscale et des informations transmises par l'administration, pas uniquement du salaire du mois. Un changement de situation familiale ou de revenus peut entraîner une actualisation. Le détail des types de taux est présenté dans le ",
          L.guidePas,
          ".",
        ],
      },
      {
        question: "Sur quel montant le prélèvement à la source est-il appliqué ?",
        answer: [
          "Il s'applique sur le net imposable, pas directement sur le salaire brut ni sur le net avant impôt. Deux salariés avec le même brut peuvent donc voir un prélèvement différent si leur net imposable ou leur taux diverge. Sur la fiche de paie, la ligne de prélèvement précise en général la base et le taux utilisés.",
        ],
      },
      {
        question: "Quelle différence entre salaire net avant et après impôt ?",
        answer: [
          "Le net avant impôt est le salaire après cotisations salariales. Le net après impôt (net versé) retire en plus le prélèvement à la source. Lorsque vous comparez des offres ou simulez une rémunération, précisez toujours de quel net vous parlez. Le ",
          L.calcBrutNet,
          " estime les deux niveaux à partir d'un taux (neutre par défaut, ou votre taux réel).",
        ],
      },
      {
        question: "Pourquoi mon taux de prélèvement à la source peut-il changer ?",
        answer: [
          "Parce qu'il suit votre situation fiscale : évolution des revenus du foyer, naissance, mariage, divorce, départ à la retraite, ou choix d'un taux individualisé. Vous pouvez aussi demander une modulation auprès de l'administration fiscale si vos revenus changent fortement. Le nouvel taux s'applique ensuite via votre employeur, avec un délai de prise en compte.",
        ],
      },
    ],
  },
  {
    id: "augmentation-de-salaire",
    title: "Augmentation de salaire",
    tocLabel: "Augmentation de salaire",
    items: [
      {
        question: "Comment calculer une augmentation de salaire en pourcentage ?",
        answer: [
          "Appliquez le pourcentage au salaire brut actuel : nouveau brut = brut × (1 + taux). Exemple : 2 500 € brut avec +5 % devient 2 625 € brut (+125 €). Le gain net est ensuite inférieur, car les cotisations portent aussi sur la part augmentée. Notre ",
          L.calcAugmentation,
          " convertit automatiquement le pourcentage en euros bruts et nets.",
        ],
      },
      {
        question: "Comment calculer une augmentation de salaire en euros ?",
        answer: [
          "Ajoutez le montant annoncé à votre brut mensuel, puis estimez le nouveau net avec les mêmes règles de cotisations, et de prélèvement si besoin. Une hausse de 200 € brut ne donne pas 200 € net : seule une fraction devient gain net. Saisissez le montant dans le ",
          L.calcAugmentation,
          " pour obtenir le gain mensuel et annuel estimés.",
        ],
      },
      {
        question: "Quelle différence entre une augmentation brute et une augmentation nette ?",
        answer: [
          "L'augmentation brute est le surplus affiché sur le contrat ou l'avenant. L'augmentation nette est ce que vous gagnez réellement après cotisations, et éventuellement après prélèvement à la source. En entreprise, les hausses sont presque toujours exprimées en brut ; raisonner uniquement en brut peut donc surestimer le gain perçu.",
        ],
      },
      {
        question: "Comment connaître son nouveau salaire après une augmentation ?",
        answer: [
          "Calculez d'abord le nouveau brut, puis le nouveau net avant et après impôt. Tenez compte du nombre de mois payés (12, 13, etc.) pour l'impact annuel. Une simulation avec le ",
          L.calcAugmentation,
          " compare la situation avant / après et isole le gain net. Votre prochain bulletin confirmera le montant exact.",
        ],
      },
      {
        question: "Comment calculer le gain annuel d'une augmentation ?",
        answer: [
          "Multipliez le gain mensuel (brut ou net, selon ce que vous analysez) par le nombre de mois de rémunération. Sur 13 mois, le gain annuel est plus élevé que sur 12 mois pour une même hausse mensuelle. Le ",
          L.calcAugmentation,
          " affiche cet effet dès que vous choisissez le bon nombre de mois.",
        ],
      },
    ],
  },
  {
    id: "heures-supplementaires",
    title: "Heures supplémentaires et rémunération",
    tocLabel: "Heures supplémentaires",
    items: [
      {
        question: "Comment calculer son salaire avec des heures supplémentaires ?",
        answer: [
          "Calculez d'abord le taux horaire brut de base (souvent le salaire brut mensuel hors heures supplémentaires divisé par 151,67 à temps plein). Multipliez chaque heure majorée par ce taux selon la majoration applicable, puis ajoutez le résultat au salaire de base du mois. Notre ",
          L.calcHeuresSup,
          " estime aussi le passage au net, avec la réduction de cotisations salariales propre aux heures supplémentaires.",
        ],
      },
      {
        question: "Comment sont majorées les heures supplémentaires ?",
        answer: [
          "En l'absence d'accord différent, le Code du travail prévoit en principe une majoration de 25 %, puis de 50 %. Une convention collective ou un accord d'entreprise peut fixer d'autres taux, sans descendre normalement sous 10 %. Sur la fiche de paie, les quantités déjà classées à chaque taux apparaissent en général séparément.",
        ],
      },
      {
        question: "Quand les heures supplémentaires sont-elles majorées à 25 % ou 50 % ?",
        answer: [
          "Dans le régime légal habituel, les huit premières heures supplémentaires de la semaine sont généralement majorées de 25 %, puis les suivantes de 50 %. Cette répartition s'apprécie semaine par semaine : elle ne consiste pas à appliquer automatiquement « 8 heures à 25 % puis le reste à 50 % » sur un total mensuel. Recopiez de préférence les totaux déjà ventilés sur votre relevé ou votre bulletin.",
        ],
      },
      {
        question: "Les heures supplémentaires sont-elles calculées par semaine ou par mois ?",
        answer: [
          "Le décompte légal des majorations se fait en principe par semaine. Le bulletin, lui, peut totaliser sur le mois les heures déjà classées à 25 % et à 50 %. Pour estimer un salaire mensuel, il faut donc partir de ces totaux déjà ventilés, et non redistribuer arbitrairement un volume mensuel unique. Le ",
          L.calcHeuresSup,
          " demande précisément ces deux totaux.",
        ],
      },
      {
        question: "Comment estimer le gain net lié aux heures supplémentaires ?",
        answer: [
          "Calculez d'abord le brut des heures majorées, puis tenez compte des cotisations et, le cas échéant, du prélèvement à la source. Les heures supplémentaires bénéficient souvent d'une réduction de cotisations salariales et, sous conditions, d'une exonération d'impôt dans la limite d'un plafond annuel. Le ",
          L.calcHeuresSup,
          " fournit une estimation de ce gain net.",
        ],
      },
      {
        question: "Une convention collective peut-elle prévoir des règles différentes ?",
        answer: [
          "Oui. Un accord peut modifier les taux de majoration, le mode de décompte ou le recours au repos compensateur, dans le respect des minimums légaux. Avant de simuler, vérifiez les règles applicables dans votre entreprise ou votre branche. En cas de doute, votre bulletin et votre service RH restent les meilleures sources.",
        ],
      },
    ],
  },
  {
    id: "indemnite-de-licenciement",
    title: "Indemnité de licenciement",
    tocLabel: "Indemnité de licenciement",
    items: [
      {
        question: "Qui peut bénéficier de l'indemnité légale de licenciement ?",
        answer: [
          "Dans le cas général, l'indemnité légale concerne les salariés en CDI du secteur privé licenciés, dès lors que les conditions d'ouverture sont remplies. Elle n'est en principe pas due en cas de faute grave ou lourde. Une convention collective, un contrat ou un usage peut prévoir une indemnité conventionnelle plus favorable que ce minimum. Notre ",
          L.calcIndemnite,
          " estime uniquement le minimum légal (ou le régime spécial d'inaptitude professionnelle).",
        ],
      },
      {
        question: "Quelle ancienneté faut-il pour toucher une indemnité de licenciement ?",
        answer: [
          "Pour l'indemnité légale, l'ouverture se fait en général à partir de 8 mois d'ancienneté ininterrompue chez le même employeur. En dessous, aucune indemnité légale n'est due dans le cas standard, sauf disposition plus favorable. Une fois le droit ouvert, les années et mois complets d'ancienneté servent ensuite à calculer le montant.",
        ],
      },
      {
        question: "Comment calculer une indemnité de licenciement ?",
        answer: [
          "Pour l'indemnité légale, on part du salaire mensuel de référence le plus favorable et de l'ancienneté. Jusqu'à 10 ans, elle correspond en principe à un quart de mois de salaire par année d'ancienneté. Au-delà, on ajoute un tiers de mois de salaire par année (et mois complets) supplémentaire. Votre convention collective peut prévoir un calcul différent et plus favorable. Le ",
          L.calcIndemnite,
          " applique la logique légale pour une estimation indicative.",
        ],
      },
      {
        question: "Quel salaire de référence est utilisé ?",
        answer: [
          "Dans le cas général de l'indemnité légale, on retient la formule la plus avantageuse pour le salarié : la moyenne mensuelle brute des 12 derniers mois, ou un tiers de la rémunération brute des 3 derniers mois. Certaines primes peuvent entrer dans ce calcul, parfois au prorata. En inaptitude d'origine professionnelle, une règle de référence particulière s'applique.",
        ],
      },
      {
        question: "Comment l'indemnité évolue-t-elle après 10 ans d'ancienneté ?",
        answer: [
          "Le calcul légal se fait alors en deux tranches : 1/4 de mois de salaire par année jusqu'à 10 ans, puis 1/3 de mois de salaire pour chaque année et chaque mois complet au-delà. Les mois complets supplémentaires sont pris en compte proportionnellement ; de simples jours isolés ne valent pas automatiquement un mois complet. Une convention plus favorable peut encore améliorer ce minimum légal.",
        ],
      },
      {
        question: "Que se passe-t-il en cas d'inaptitude d'origine professionnelle ?",
        answer: [
          "Lorsque l'inaptitude résulte d'un accident du travail ou d'une maladie professionnelle, une indemnité spéciale minimale égale au double de l'indemnité légale peut être due, sauf disposition plus favorable. Le salaire de référence obéit alors à une règle particulière. Une indemnité compensatrice de préavis peut s'y ajouter ; elle n'est pas incluse dans le montant principal du simulateur. Cette estimation ne remplace pas un conseil juridique personnalisé.",
        ],
      },
    ],
  },
];

function answerToPlainText(segments: FaqAnswerSegment[]): string {
  return segments
    .map((seg) => (typeof seg === "string" ? seg : seg.link))
    .join("");
}

/** Items Schema.org FAQPage : même source que le contenu visible. */
export function getFaqPageSchemaItems(): FaqItem[] {
  return faqPageCategories.flatMap((category) =>
    category.items.map((item) => ({
      question: item.question,
      answer: answerToPlainText(item.answer),
    })),
  );
}

export function getFaqPageTocEntries() {
  return faqPageCategories.map((category) => ({
    id: category.id,
    title: category.tocLabel,
    level: 2 as const,
  }));
}
