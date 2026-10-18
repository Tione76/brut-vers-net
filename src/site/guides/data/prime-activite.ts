import type { Guide } from "../types";
import {
  CAF_CTA_INTRO,
  CAF_CTA_LABEL,
  CAF_DEMARCHES_HREF,
  CAF_SIMULATOR_HREF,
  FORFAIT_ISOLEMENT_ROWS,
  FORFAIT_LOGEMENT,
  FORFAIT_MAYOTTE,
  FORFAIT_MAYOTTE_FROM_LABEL,
  FORFAIT_ROWS,
  FORFAIT_SEUL,
  FORFAIT_SEUL_PREVIOUS,
  PRIME_ACTIVITE_BREADCRUMB,
  PRIME_ACTIVITE_H1,
  PRIME_ACTIVITE_META_DESCRIPTION,
  PRIME_ACTIVITE_PATH,
  PRIME_ACTIVITE_PUBLISHED_AT,
  PRIME_ACTIVITE_REFORM_FROM_LABEL,
  PRIME_ACTIVITE_SEO_TITLE,
  PRIME_ACTIVITE_SLUG,
  PRIME_ACTIVITE_SUBTITLE,
  PRIME_ACTIVITE_UPDATED_AT,
  PRIME_ACTIVITE_VERIFIED_ON_LABEL,
  REVALORISATION_PERCENT,
  REVENUS_PRO_RATE_PERCENT,
  SEUIL_NON_VERSEMENT,
  SOURCES,
  STUDENT_INCOME_THRESHOLD,
  STUDENT_INCOME_THRESHOLD_CNAF_TRUNCATED,
  STUDENT_INCOME_THRESHOLD_MAYOTTE_FROM_JULY,
} from "@/site/prime-activite/data";

const SMIC_HREF = "/smic";
const SMIC_HOURS_HREF = "/smic-selon-nombre-heures";
const FICHE_PAIE_HREF = "/guides/comment-lire-une-fiche-de-paie";
const BRUT_NET_HREF = "/guides/comment-est-calcule-le-salaire-net";
const PAS_HREF = "/guides/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne";
const ALTERNANCE_HREF = "/salaire-alternance";
const INTERIM_HREF = "/salaire-interim-calcul-brut-net";
const CALCULATEUR_HREF = "/";
const GUIDES_HUB = "/guides";

const cafSimulatorLink = {
  type: "internal-link" as const,
  variant: "simulator" as const,
  intro: "Simulateur officiel :",
  label: CAF_CTA_LABEL,
  href: CAF_SIMULATOR_HREF,
};

export const primeActiviteGuide: Guide = {
  slug: PRIME_ACTIVITE_SLUG,
  publicPath: PRIME_ACTIVITE_PATH,
  breadcrumbLabel: PRIME_ACTIVITE_BREADCRUMB,
  title: PRIME_ACTIVITE_H1,
  seoTitle: PRIME_ACTIVITE_SEO_TITLE,
  description: PRIME_ACTIVITE_META_DESCRIPTION,
  subtitle: PRIME_ACTIVITE_SUBTITLE,
  publishedAt: PRIME_ACTIVITE_PUBLISHED_AT,
  updatedAt: PRIME_ACTIVITE_UPDATED_AT,
  includeFaqSchema: false,
  faqSectionId: "questions-frequentes",
  introduction: [
    "La prime d'activité est un complément de revenus versé par la CAF ou la MSA aux personnes qui travaillent et dont les ressources du foyer restent modestes. Salariés, fonctionnaires, indépendants, apprentis et étudiants salariés peuvent y prétendre, sous conditions d'âge, de résidence et de revenus.",
    "Son montant n'est pas un pourcentage fixe du salaire. Il dépend du montant net social, de la composition du foyer, du logement, des autres ressources et d'une bonification individuelle. Depuis le 1er avril 2026, le forfait de base a été revalorisé de 0,8 % et la bonification a été réformée.",
    `Les règles et barèmes ci-dessous ont été vérifiés le ${PRIME_ACTIVITE_VERIFIED_ON_LABEL}. Pour un montant personnalisé, seule une simulation officielle de la CAF ou de la MSA est fiable.`,
  ],
  introSummary: {
    title: "L'essentiel à retenir",
    items: [
      "Public concerné : personnes d'au moins 18 ans qui exercent une activité professionnelle et résident en France de façon stable, sous conditions de séjour.",
      "Le droit se calcule sur les ressources de tout le foyer, pas seulement sur votre salaire.",
      "Le montant déclaré est le montant net social, pas le net à payer ni le net imposable.",
      "Les droits sont revus tous les trois mois via une déclaration trimestrielle, souvent préremplie.",
      "Organisme compétent : CAF pour le régime général, MSA pour le régime agricole.",
      "Il n'existe pas un plafond unique valable pour tous. La simulation officielle reste la référence.",
    ],
  },
  sections: [
    {
      id: "quest-ce-que-la-prime-d-activite",
      title: "Qu'est-ce que la prime d'activité ?",
      blocks: [
        {
          type: "paragraph",
          text: "La prime d'activité complète les revenus professionnels des travailleurs aux ressources modestes. Elle n'est pas un salaire, ni une réduction d'impôt, ni le RSA. Elle vise à rendre l'activité plus rémunératrice que l'inactivité, tout en tenant compte de la situation du foyer.",
        },
        {
          type: "paragraph",
          text: "Elle a succédé au RSA activité et à la prime pour l'emploi. Le calcul reste familial : les revenus du conjoint, les enfants à charge, les aides au logement et d'autres ressources peuvent augmenter ou réduire le montant, parfois jusqu'à le faire tomber sous le seuil de versement.",
        },
        {
          type: "list",
          items: [
            "La CAF verse la prime si vous dépendez du régime général.",
            "La MSA la verse si vous dépendez du régime agricole.",
            "La prime n'est pas imposable.",
            `En dessous de ${SEUIL_NON_VERSEMENT} €, elle n'est pas versée.`,
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Le RSA soutient les personnes sans ressources suffisantes. La prime d'activité complète des revenus d'activité. On peut passer de l'un à l'autre, ou les voir se succéder, mais ce ne sont pas la même prestation.",
          ],
        },
      ],
    },
    {
      id: "qui-peut-toucher-la-prime-d-activite-en-2026",
      title: "Qui peut toucher la prime d'activité en 2026 ?",
      blocks: [
        {
          type: "paragraph",
          text: "Pour ouvrir un droit, il faut en principe avoir 18 ans ou plus, exercer une activité professionnelle (salariée ou non) avec des revenus modestes, et résider en France de manière stable et effective. Les travailleurs détachés temporairement en France n'y ont pas droit.",
        },
      ],
      subsections: [
        {
          id: "salaries-et-fonctionnaires",
          title: "Salariés et fonctionnaires",
          blocks: [
            {
              type: "paragraph",
              text: "Les salariés du privé, les agents publics et les personnes en activité partielle peuvent demander la prime si les autres conditions sont remplies. Le temps partiel n'exclut pas le droit : il change surtout le niveau de revenu pris en compte.",
            },
          ],
        },
        {
          id: "travailleurs-independants",
          title: "Travailleurs indépendants et auto-entrepreneurs",
          blocks: [
            {
              type: "paragraph",
              text: "Les non-salariés relèvent des mêmes principes, avec des modalités propres pour les revenus d'activité. Le simulateur de la CAF demande notamment un bénéfice de l'année N-2 et le dernier chiffre d'affaires. Ces éléments ne se lisent pas comme un salaire net mensuel.",
            },
            {
              type: "callout",
              variant: "warning",
              paragraphs: [
                "Ne convertissez pas un chiffre d'affaires de micro-entreprise en « équivalent salaire » pour estimer la prime. Le traitement réglementaire des non-salariés est distinct. Utilisez le simulateur officiel.",
              ],
            },
          ],
        },
        {
          id: "etudiants-apprentis-alternants",
          title: "Étudiants, apprentis et alternants",
          blocks: [
            {
              type: "paragraph",
              text: `Oui, à partir de 18 ans, si votre revenu d'activité dépasse ${STUDENT_INCOME_THRESHOLD.toLocaleString("fr-FR")} € par mois, ou si vous assumez seul la charge d'un ou plusieurs enfants. Service-Public a confirmé ce seuil le 1er juin 2026.`,
            },
            {
              type: "paragraph",
              text: `La CAF retient ${STUDENT_INCOME_THRESHOLD_CNAF_TRUNCATED.toLocaleString("fr-FR")} € : elle compare le salaire après arrondi à l'euro inférieur. Le revenu doit atteindre ce niveau chacun des trois mois du trimestre. La gratification de stage ne compte pas ; le salaire d'apprentissage, lui, compte. Cette condition de revenu minimum ne s'applique pas au conjoint ni aux bénéficiaires de la prime d'activité majorée.`,
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Pour les minima de rémunération en apprentissage et en contrat de professionnalisation :",
              label: "salaire en alternance",
              href: ALTERNANCE_HREF,
            },
          ],
        },
        {
          id: "temps-partiel-et-autres-ressources",
          title: "Temps partiel et autres revenus",
          blocks: [
            {
              type: "paragraph",
              text: "Travailler à temps partiel n'interdit pas la prime. En revanche, chômage, indemnités journalières, pension alimentaire, revenus du conjoint ou aides au logement peuvent modifier le calcul. L'activité reste le point d'entrée ; le foyer fait le résultat.",
            },
          ],
        },
      ],
      closingBlocks: [
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "Les conditions de séjour des Européens et des étrangers d'un autre pays sont précisées par Service-Public. En cas de doute sur un titre de séjour, consultez la fiche officielle avant de conclure.",
          ],
        },
      ],
    },
    {
      id: "plafonds-de-revenus",
      title: "Quels sont les plafonds de revenus de la prime d'activité ?",
      blocks: [
        {
          type: "paragraph",
          text: "Il n'existe pas un plafond unique applicable à tous les salariés. Le droit dépend de la composition du foyer, des revenus professionnels, des revenus du conjoint, des enfants à charge, des autres ressources, du logement et des bonifications.",
        },
        {
          type: "list",
          items: [
            "Le montant forfaitaire est la base du calcul, pas la somme versée.",
            "La bonification individuelle varie selon les revenus d'activité de chaque travailleur du foyer.",
            "Les ressources du foyer, y compris un forfait logement dans certains cas, sont retranchées.",
            `Si le résultat tombe sous ${SEUIL_NON_VERSEMENT} €, rien n'est versé.`,
          ],
        },
        {
          type: "paragraph",
          text: "Service-Public cite encore, dans une actualité du 22 juillet 2026, deux exemples antérieurs à la réforme : 2 000 € nets pour une personne seule, et 3 450 € nets pour un couple avec deux enfants dont un seul membre travaille. Ce sont des illustrations, pas un plafond valable pour tous.",
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "L'instruction CNAF IT 2026-080 indique que, pour le cas de référence étudié, le point de sortie indicatif passe d'environ 2 000 € avant la réforme à environ 2 151 € après. Ce n'est pas un plafond universel : le droit réel dépend de la composition du foyer, des autres ressources et de la situation de logement. Pour un cas précis, utilisez le simulateur de la CAF.",
          ],
        },
        {
          type: "paragraph",
          text: "Ne confondez pas quatre notions : le plafond d'éligibilité (variable), le montant forfaitaire (638,28 € pour une personne seule), la bonification (complément individuel) et le montant réellement versé (résultat du calcul, éventuellement nul).",
        },
      ],
    },
    {
      id: "montant-selon-le-salaire",
      title: "Quel montant de prime d'activité selon son salaire ?",
      blocks: [
        {
          type: "paragraph",
          text: "À 1 200 €, 1 500 € ou 1 800 € de montant net social, le montant versé n'est pas un pourcentage du salaire. Il dépend du foyer, du logement et d'une bonification qui augmente jusqu'à 1 698,78 € de revenu d'activité, puis reste plafonnée à 240,63 €.",
        },
        {
          type: "table",
          caption:
            "Lecture des règles en vigueur au 16 octobre 2026 pour une personne seule, sans enfant, en métropole, avec des revenus d'activité stables. Le tableau n'indique pas un montant de prime versé.",
          headers: ["Montant net social mensuel", "Ce que ce salaire change pour le calcul"],
          rows: [
            [
              "1\u00a0200\u00a0€",
              "Au-dessus du seuil étudiant ou apprenti (1 144,21 €) et du seuil d'ouverture de la bonification (726,29 €). La bonification n'a pas encore atteint 240,63 €. Sans autre ressource, un droit reste souvent possible. Une aide au logement ajoute 76,59 € aux ressources.",
            ],
            [
              "1\u00a0400\u00a0€",
              "Proche de l'exemple de SMIC utilisé par la CAF au printemps 2026 (1 442,40 €). La bonification continue d'augmenter. Un conjoint, un enfant ou un logement gratuit peuvent déjà réduire, voire annuler, le versement.",
            ],
            [
              "1\u00a0500\u00a0€",
              "Toujours sous le palier de bonification maximale (1 698,78 €). Le complément individuel n'est donc pas encore au maximum. C'est un niveau où une personne seule peut encore être éligible, et où un second revenu dans le foyer pèse beaucoup.",
            ],
            [
              "1\u00a0600\u00a0€",
              "Encore sous 1 698,78 € : la bonification monte encore un peu si le revenu d'activité augmente. Au-delà, ce n'est plus le cas. APL, logement gratuit ou revenus du conjoint restent décisifs.",
            ],
            [
              "1\u00a0800\u00a0€",
              "Au-dessus de 1 698,78 € : la bonification est déjà au maximum (240,63 €) et ne progresse plus. Les ressources du foyer, elles, continuent d'augmenter, donc le montant versé a tendance à baisser.",
            ],
            [
              "2\u00a0000\u00a0€",
              "Exemple de sortie encore cité par Service-Public pour une personne seule, correspondant au niveau d'avant la réforme. Selon la CNAF, le point de sortie indicatif du cas de référence passe ensuite vers environ 2 151 €. Ce n'est pas un plafond unique : foyer, logement et autres ressources restent décisifs.",
            ],
          ],
          stackOnMobile: true,
          rowHeader: true,
          accent: "brand",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Même pour une personne seule, le résultat change si vous touchez une aide au logement, si vous êtes logé gratuitement ou propriétaire sans emprunt, ou si d'autres ressources s'ajoutent. Pour un montant personnalisé, utilisez le simulateur de la CAF.",
          ],
        },
      ],
      subsections: [
        {
          id: "estimez-votre-prime-caf",
          title: "Estimez votre prime d'activité avec la CAF",
          blocks: [
            {
              type: "callout",
              variant: "advice",
              paragraphs: [CAF_CTA_INTRO],
            },
            cafSimulatorLink,
          ],
        },
      ],
    },
    {
      id: "comment-est-calculee-la-prime",
      title: "Comment est calculée la prime d'activité ?",
      blocks: [
        {
          type: "paragraph",
          text: `Service-Public publie la formule suivante : montant de la prime = (montant forfaitaire éventuellement majoré + ${REVENUS_PRO_RATE_PERCENT.toString().replace(".", ",")} % des revenus professionnels + bonifications individuelles) − les ressources prises en compte du foyer.`,
        },
        {
          type: "steps",
          items: [
            {
              title: "Le montant forfaitaire",
              description: `Base officielle : ${FORFAIT_SEUL.toString().replace(".", ",")} € pour une personne seule depuis le ${PRIME_ACTIVITE_REFORM_FROM_LABEL}. Il est majoré selon le conjoint et les personnes à charge.`,
            },
            {
              title: "Les revenus professionnels",
              description: `${REVENUS_PRO_RATE_PERCENT.toString().replace(".", ",")} % des revenus d'activité du foyer sont ajoutés. Pour un salarié, le montant de référence est le montant net social.`,
            },
            {
              title: "Les bonifications individuelles",
              description:
                "Chaque personne du foyer qui travaille peut recevoir ce complément. En dessous de 726,29 € de revenu d'activité moyen, il est nul. Entre 726,29 € et 1 698,78 €, il augmente progressivement jusqu'à 240,63 €. Au-delà, il reste à 240,63 € : un salaire plus élevé n'augmente plus ce complément, mais continue d'être compté dans les ressources.",
            },
            {
              title: "Les ressources du foyer",
              description:
                "On retranche les ressources prises en compte : revenus d'activité, certaines prestations, autres ressources, et parfois un forfait logement.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Une partie des revenus d'activité est donc ajoutée (59,85 % plus, le cas échéant, la bonification), puis l'ensemble des ressources du foyer est retranché. C'est pour cela qu'un salaire plus élevé n'augmente pas forcément la prime : passé 1 698,78 €, la bonification ne monte plus, alors que les ressources, elles, continuent de monter.",
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "Seuils et montant maximal : Service-Public, fiche vérifiée le 1er juin 2026, et article D. 843-2 du code de la sécurité sociale. Le barème professionnel CAF affiche encore 709,18 € et 1 658,76 €, calculés avec le SMIC de janvier. La règle applicable suit le SMIC horaire en vigueur, soit 12,31 € depuis le 1er juin 2026.",
          ],
        },
      ],
    },
    {
      id: "personne-seule-couple-famille",
      title: "Prime d'activité pour une personne seule, un couple ou une famille",
      blocks: [
        {
          type: "paragraph",
          text: `Le tableau ci-dessous reprend les montants forfaitaires officiels. Ce ne sont pas les sommes versées chaque mois. Pour une personne seule sans enfant, la base est ${FORFAIT_SEUL.toString().replace(".", ",")} € depuis le ${PRIME_ACTIVITE_REFORM_FROM_LABEL}.`,
        },
        {
          type: "table",
          caption:
            "Montants forfaitaires de la prime d'activité. Source : Service-Public, fiche vérifiée le 1er juin 2026. Barème issu du décret n° 2026-222 du 30 mars 2026.",
          headers: [
            "Enfants ou personnes à charge",
            "Vous vivez seul",
            "Vous êtes en couple",
          ],
          rows: FORFAIT_ROWS.map((row) => [row.charge, row.seul, row.couple]),
          stackOnMobile: true,
          rowHeader: true,
          accent: "brand",
          numeric: true,
        },
        {
          type: "paragraph",
          text: "Un couple avec un seul salaire n'est pas traité comme une personne seule. Le forfait de base passe, sans enfant, de 638,28 € à 957,42 €, mais les ressources prises en compte sont celles des deux membres du foyer. Une seule bonification peut s'ouvrir, celle de la personne qui travaille, si son revenu dépasse 726,29 €.",
        },
        {
          type: "paragraph",
          text: "Un couple avec deux salaires peut ouvrir deux bonifications, une par personne qui dépasse 726,29 €. Les deux revenus d'activité sont toutefois ajoutés aux ressources. Selon les montants, le second salaire peut donc augmenter la prime, ou la réduire.",
        },
        {
          type: "paragraph",
          text: "Pour un parent isolé (célibataire, divorcé, séparé, veuf, ou femme enceinte), le montant forfaitaire peut être majoré. La majoration pour isolement est soumise à des conditions particulières : elle peut durer 12 mois, continus ou non, sur une période de 18 mois, et jusqu'aux 3 ans du plus jeune enfant le cas échéant.",
        },
        {
          type: "table",
          caption:
            "Montants forfaitaires majorés pour isolement. Source : barème CAF de la prime d'activité. Ce sont des bases de calcul, pas la prime effectivement versée.",
          headers: ["Situation", "Montant forfaitaire majoré"],
          rows: FORFAIT_ISOLEMENT_ROWS.map((row) => [row.situation, row.majore]),
          stackOnMobile: true,
          rowHeader: true,
          accent: "brand",
          numeric: true,
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Ces forfaits majorés ne sont pas un montant garanti de prime. Un forfait plus élevé n'entraîne pas automatiquement une prime plus élevée : les ressources du foyer, le logement et les autres prestations restent retranchés dans le calcul.",
          ],
        },
      ],
    },
    {
      id: "prime-d-activite-et-smic",
      title: "Peut-on toucher la prime d'activité avec le SMIC ?",
      blocks: [
        {
          type: "paragraph",
          text: "Oui, un salarié au SMIC peut être éligible, surtout s'il vit seul, sans autre ressource importante. Ce n'est pourtant pas automatique : un conjoint mieux rémunéré, des APL ou un logement gratuit peuvent réduire ou annuler le droit.",
        },
        {
          type: "paragraph",
          text: "La bonification maximale est atteinte à 1 698,78 € de revenu d'activité (Service-Public, 1er juin 2026). Un salarié au SMIC à temps plein se situe en principe sous ce palier, donc encore dans la partie où la bonification peut augmenter. À temps partiel, seul le montant net social réellement perçu compte : un mi-temps au SMIC n'est pas traité comme un temps plein.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Barème du SMIC actuellement applicable :",
          label: "SMIC brut et net, horaire et mensuel",
          href: SMIC_HREF,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour un temps partiel ou des heures supplémentaires :",
          label: "SMIC selon le nombre d'heures",
          href: SMIC_HOURS_HREF,
        },
      ],
    },
    {
      id: "changements-2026",
      title: "Qu'est-ce qui change pour la prime d'activité en 2026 ?",
      blocks: [
        {
          type: "paragraph",
          text: `Deux mouvements se superposent. D'abord une revalorisation annuelle de ${REVALORISATION_PERCENT.toString().replace(".", ",")} %, qui a fait passer le forfait d'une personne seule de ${FORFAIT_SEUL_PREVIOUS.toString().replace(".", ",")} € à ${FORFAIT_SEUL.toString().replace(".", ",")} €. Ensuite une réforme de la bonification, entrée en vigueur au ${PRIME_ACTIVITE_REFORM_FROM_LABEL}.`,
        },
        {
          type: "list",
          items: [
            "La bonification atteint son maximum à 1 698,78 € de revenu d'activité (1,15 SMIC), au lieu d'environ 1 SMIC auparavant.",
            "Son montant maximal est fixé à 37,70 % du forfait de base, soit 240,63 €.",
            "Le plafond de ressources est relevé, ce qui peut faire entrer de nouveaux foyers.",
            "Aucune démarche spécifique n'est demandée aux allocataires déjà en paiement : le nouveau calcul s'applique au renouvellement du trimestre.",
          ],
        },
        {
          type: "paragraph",
          text: "Parce que la prime se calcule par trimestre, l'effet n'est pas apparu le 1er avril sur tous les comptes. La CAF a indiqué des premiers versements concernés à partir de l'été 2026 : juillet (déclaration février-mars-avril), août (mars-avril-mai) ou septembre (avril-mai-juin).",
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "Au 16 octobre 2026, cette réforme n'est plus à venir : elle s'applique déjà, dès lors que le trimestre de référence inclut avril 2026. Si votre prime n'a pas encore bougé, le décalage vient souvent du calendrier de déclaration, pas d'une réforme reportée.",
          ],
        },
        {
          type: "paragraph",
          text: `À Mayotte, le décret n° 2026-713 du 31 juillet 2026 fixe le forfait d'une personne seule à ${FORFAIT_MAYOTTE.toString().replace(".", ",")} €, applicable aux montants calculés à partir d'${FORFAIT_MAYOTTE_FROM_LABEL}. Ce texte aligne aussi certains paramètres de bonification sur ceux du reste du territoire, dans le cadre de la première étape de convergence sociale.`,
        },
      ],
    },
    {
      id: "revenus-a-declarer",
      title: "Quels revenus faut-il déclarer à la CAF ?",
      blocks: [
        {
          type: "paragraph",
          text: "La CAF et la MSA demandent le montant net social, pas le net à payer ni le net imposable. Cette ligne figure sur le bulletin de salaire et sur certains relevés de prestations.",
        },
        {
          type: "list",
          items: [
            {
              text: "Le montant net social est le montant à déclarer pour la prime d'activité et le RSA. Il a une ligne dédiée sur le bulletin.",
              href: FICHE_PAIE_HREF,
              label: "Comment lire une fiche de paie",
            },
            {
              text: "Le net à payer est la somme virée sur le compte, après le prélèvement à la source. Ce n'est pas le montant à déclarer.",
              href: PAS_HREF,
              label: "Prélèvement à la source",
            },
            {
              text: "Le net imposable sert au calcul de l'impôt. Le net avant impôt, souvent affiché juste au-dessus du prélèvement à la source, n'est pas non plus le montant net social.",
              href: BRUT_NET_HREF,
              label: "Différence entre brut et net",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Depuis le 1er mars 2025 à la CAF, et depuis le 1er juillet 2025 à la MSA, une grande partie des ressources est préremplie. Salaires, chômage, retraites, pensions et arrêts maladie apparaissent en montant net social. Vous devez vérifier, valider, et ajouter ce qui manque, par exemple une pension alimentaire.",
        },
        {
          type: "paragraph",
          text: "Avec le préremplissage, la déclaration ne porte plus sur le mois précédent et les deux d'avant, mais sur les mois M-2, M-3 et M-4. Exemple de Service-Public : pour une déclaration de mars 2025, les ressources préremplies sont celles de novembre 2024, décembre 2024 et janvier 2025. Le montant calculé reste ensuite le même pendant trois mois.",
        },
        {
          type: "callout",
          variant: "error",
          paragraphs: [
            "Déclarer le net versé sur le compte à la place du montant net social fausse le calcul. Si une ligne préremplie vous semble fausse, signalez-la dans la déclaration plutôt que de la laisser passer.",
          ],
        },
      ],
    },
    {
      id: "comment-demander",
      title: "Comment demander la prime d'activité ?",
      blocks: [
        {
          type: "paragraph",
          text: "Une simulation favorable n'équivaut pas à une attribution. Il faut déposer une demande auprès de l'organisme compétent, puis suivre les déclarations trimestrielles.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Vérifier les conditions",
              description:
                "Âge, activité, résidence, séjour. Pour un étudiant ou un apprenti, contrôlez aussi le seuil de revenu d'activité.",
            },
            {
              title: "Simuler vos droits",
              description: "Utilisez le simulateur officiel. Le résultat est indicatif.",
              href: CAF_SIMULATOR_HREF,
              label: "Simulateur CAF",
            },
            {
              title: "Déposer la demande",
              description:
                "CAF pour le régime général, MSA pour le régime agricole. Conservez vos bulletins et le montant net social.",
              href: CAF_DEMARCHES_HREF,
              label: "Démarches CAF",
            },
            {
              title: "Suivre la notification",
              description:
                "En cas d'accord, le droit est notifié pour trois mois. Le montant reste stable pendant ce trimestre, même si vos ressources bougent.",
            },
            {
              title: "Déclarer chaque trimestre",
              description:
                "Vérifiez les ressources préremplies, corrigez si besoin, et signalez un changement de famille, de logement ou d'activité.",
            },
          ],
        },
      ],
    },
    {
      id: "quand-est-elle-versee",
      title: "Quand la prime d'activité est-elle versée ?",
      blocks: [
        {
          type: "paragraph",
          text: "La prime est mensuelle. Service-Public indique qu'elle est due à partir du 1er jour du mois de la demande, et qu'un droit de mars, par exemple, est versé en avril. La date exacte du virement dépend de votre caisse : il n'existe pas un jour unique national.",
        },
        {
          type: "paragraph",
          text: "Le montant est figé pendant trois mois. Un changement de salaire en cours de trimestre ne recale pas immédiatement la prime. Il sera pris en compte au trimestre suivant, via la déclaration.",
        },
        {
          type: "list",
          items: [
            "Hospitalisation d'une personne seule sans personne à charge : le montant peut être réduit de moitié, sauf grossesse.",
            "Incarcération : le versement doit être suspendu ; à défaut, un trop-perçu sera réclamé.",
            "Perte des conditions d'éligibilité : arrêt au 1er jour du mois concerné.",
            "Trop-perçu : récupération possible pendant deux ans, souvent par retenue sur d'autres prestations.",
          ],
        },
      ],
    },
    {
      id: "situations-particulieres",
      title: "Situations particulières",
      blocks: [
        {
          type: "paragraph",
          text: "Ces situations n'ont pas un barème à part. Elles précisent une condition ou une ressource.",
        },
      ],
      subsections: [
        {
          id: "etudiant-salarie",
          title: "Étudiant salarié",
          blocks: [
            {
              type: "paragraph",
              text: `Le seuil est ${STUDENT_INCOME_THRESHOLD.toLocaleString("fr-FR")} € par mois (Service-Public). La CAF retient ${STUDENT_INCOME_THRESHOLD_CNAF_TRUNCATED.toLocaleString("fr-FR")} € après arrondi, chacun des trois mois du trimestre. En dessous, un job étudiant ne suffit pas, sauf si vous assumez seul un enfant. Cette condition de revenu minimum ne s'applique pas au conjoint ni aux bénéficiaires de la prime d'activité majorée.`,
            },
          ],
        },
        {
          id: "apprenti-alternant",
          title: "Apprenti et alternant",
          blocks: [
            {
              type: "paragraph",
              text: "Le salaire d'apprentissage compte. Beaucoup de grilles d'apprentissage restent sous le seuil étudiant/apprenti : dans ce cas, le droit personnel n'est ouvert que si vous assumez seul un enfant, ou si un autre revenu d'activité complète le mois.",
            },
          ],
        },
        {
          id: "auto-entrepreneur",
          title: "Auto-entrepreneur et indépendant",
          blocks: [
            {
              type: "paragraph",
              text: "Le chiffre d'affaires n'est pas un salaire. La CAF et la MSA utilisent des règles propres aux non-salariés. Préparez bénéfice, chiffre d'affaires et, le cas échéant, les montants déjà connus de l'administration fiscale.",
            },
          ],
        },
        {
          id: "interimaire-temps-partiel",
          title: "Intérimaire et temps partiel",
          blocks: [
            {
              type: "paragraph",
              text: "Les missions courtes font varier le net social d'un mois à l'autre. Le droit se lit sur la moyenne du trimestre de référence, pas sur la seule semaine travaillée.",
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Pour comprendre le brut de mission, l'IFM et les congés payés :",
              label: "salaire en intérim",
              href: INTERIM_HREF,
            },
          ],
        },
        {
          id: "chomage-rsa-apl",
          title: "Chômage, RSA et APL",
          blocks: [
            {
              type: "paragraph",
              text: "Une reprise d'activité tout en percevant encore des allocations chômage peut ouvrir un droit, car il y a un revenu professionnel. Les allocations elles-mêmes restent des ressources.",
            },
            {
              type: "paragraph",
              text: "Si vous êtes déjà au RSA et que vous retrouvez un travail, la CAF indique qu'elle calcule automatiquement les droits à la prime d'activité. RSA et prime d'activité ne se cumulent pas comme deux salaires : le foyer est recalculé.",
            },
            {
              type: "paragraph",
              text: `Les APL n'annulent pas par principe la prime. Elles déclenchent en revanche un forfait logement ajouté aux ressources : ${FORFAIT_LOGEMENT.onePerson.toString().replace(".", ",")} € pour une personne, ${FORFAIT_LOGEMENT.twoPersons.toString().replace(".", ",")} € pour deux personnes, ${FORFAIT_LOGEMENT.threeOrMore.toString().replace(".", ",")} € pour trois personnes ou plus (economie.gouv.fr et barème CAF).`,
            },
          ],
        },
        {
          id: "parent-isole-mayotte",
          title: "Parent isolé et Mayotte",
          blocks: [
            {
              type: "paragraph",
              text: "Le parent isolé peut bénéficier d'un forfait majoré, distinct du forfait d'une personne seule (par exemple 819,63 €, 1 092,84 € ou 1 366,05 € selon la situation). Ce sont des bases de calcul, pas un versement automatique. La majoration pour isolement reste soumise à des conditions particulières.",
            },
            {
              type: "paragraph",
              text: `À Mayotte, le forfait d'une personne seule est de ${FORFAIT_MAYOTTE.toString().replace(".", ",")} € pour les montants calculés à partir d'${FORFAIT_MAYOTTE_FROM_LABEL} (décret n° 2026-713). Le seuil apprentis, étudiants et élèves stagiaires y est de ${STUDENT_INCOME_THRESHOLD_MAYOTTE_FROM_JULY.toLocaleString("fr-FR")} € depuis le 1er juillet 2026.`,
            },
          ],
        },
      ],
    },
    {
      id: "simulateur-officiel",
      title: "Comment vérifier ses droits avec le simulateur officiel ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le simulateur de la CAF donne une estimation. Il le dit lui-même : le montant pourra différer lors de l'étude du dossier. Les conditions de séjour des étrangers ne sont pas testées dans l'outil.",
        },
        {
          type: "checklist",
          title: "À préparer avant la simulation",
          items: [
            "Montant net social de chaque mois demandé, pour vous et les membres du foyer.",
            "Situation familiale : vie seul, couple, enfants ou personnes à charge.",
            "Logement : locataire, propriétaire, logé gratuitement, aide au logement.",
            "Autres ressources : chômage, IJ, pensions, pension alimentaire, AAH, rente AT/MP.",
            "Si vous êtes indépendant : bénéfice N-2 et dernier chiffre d'affaires.",
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Trop de paramètres familiaux et de logement échappent à un salaire unique. Pour une estimation personnalisée, utilisez le simulateur officiel de la CAF.",
          ],
        },
        {
          type: "internal-link",
          variant: "simulator",
          intro: "Accès direct :",
          label: CAF_CTA_LABEL,
          href: CAF_SIMULATOR_HREF,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour enchaîner avec une demande :",
          label: "page officielle des démarches CAF",
          href: CAF_DEMARCHES_HREF,
        },
      ],
    },
  ],
  faqTitle: "Questions fréquentes",
  faqIntro:
    "Réponses courtes, alignées sur le barème vérifié le 16 octobre 2026.",
  faq: [
    {
      question: "Quel salaire ne faut-il pas dépasser pour toucher la prime d'activité ?",
      answer:
        "Il n'existe pas un salaire unique à ne pas dépasser. Avant la réforme, Service-Public citait environ 2 000 € nets pour une personne seule comme exemple de sortie ; la CNAF retient ensuite un point de sortie indicatif vers 2 151 € pour son cas de référence. Ce n'est pas un plafond universel : le droit dépend du foyer, du logement et des autres ressources.",
    },
    {
      question: "Peut-on toucher la prime d'activité avec 1 800 € nets ?",
      answer:
        "Parfois oui, parfois non. À 1 800 € de montant net social, la bonification est déjà au maximum (240,63 € à partir de 1 698,78 €). Un conjoint, des enfants ou une aide au logement décident ensuite si un montant reste dû.",
    },
    {
      question: "Peut-on toucher la prime d'activité avec 2 000 € nets ?",
      answer:
        "Pour une personne seule, 2 000 € était l'exemple de sortie avant la réforme. Selon la CNAF, le point de sortie indicatif du cas de référence passe ensuite vers environ 2 151 €. Ce n'est pas un plafond unique : certains foyers peuvent encore avoir un droit, d'autres non.",
    },
    {
      question: "La prime d'activité est-elle imposable ?",
      answer:
        "Non. Service-Public et economie.gouv.fr indiquent qu'elle n'est pas imposable et n'a pas à être déclarée à l'administration fiscale.",
    },
    {
      question: "La prime d'activité dépend-elle du salaire brut ou net ?",
      answer:
        "Ni du brut, ni du net à payer. Le montant à vérifier sur le bulletin est le montant net social. C'est lui qui est prérempli dans la déclaration trimestrielle.",
    },
    {
      question: "Les APL diminuent-elles la prime d'activité ?",
      answer:
        "Une aide au logement déclenche un forfait logement, ajouté aux ressources du foyer. Cela réduit le résultat du calcul, sans signifier que les APL et la prime sont incompatibles.",
    },
    {
      question: "Peut-on toucher la prime d'activité en étant étudiant ?",
      answer:
        "Oui, à partir de 18 ans, si le revenu d'activité mensuel dépasse 1 144,21 €, ou s'il est au moins égal à 1 144 € pour le calcul CAF, ou si vous assumez seul un ou plusieurs enfants. Cette condition de revenu minimum ne s'applique pas au conjoint ni aux bénéficiaires de la prime d'activité majorée. La gratification de stage ne compte pas.",
    },
    {
      question: "Peut-on cumuler RSA et prime d'activité ?",
      answer:
        "Ce ne sont pas deux aides indépendantes que l'on additionne à la main. Si vous êtes au RSA et que vous reprenez une activité, la CAF recalcule les droits. Le foyer peut basculer vers la prime d'activité selon les ressources.",
    },
    {
      question: "Faut-il refaire une demande tous les trois mois ?",
      answer:
        "Non. Après l'attribution, vous déclarez vos ressources chaque trimestre. Vous ne redéposez une demande que si le droit a été fermé et que vous souhaitez le rouvrir.",
    },
    {
      question: "Pourquoi ma prime d'activité a-t-elle baissé ?",
      answer:
        "Le trimestre de référence a changé, un salaire a augmenté, un conjoint a repris une activité, une aide au logement est entrée dans le calcul, ou la composition du foyer a changé. La réforme 2026 n'explique pas une baisse : elle revalorise le forfait et, pour certains revenus, la bonification.",
    },
    {
      question: "Quand la réforme 2026 est-elle appliquée ?",
      answer:
        "Au 1er avril 2026 pour le calcul, avec un effet visible sur les versements selon votre trimestre, souvent entre juillet et septembre 2026. Au 16 octobre 2026, la réforme est en vigueur. À Mayotte, le forfait de 460 € s'applique aux montants calculés à partir d'août 2026.",
    },
    {
      question: "Peut-on toucher la prime d'activité en micro-entreprise ?",
      answer:
        "Oui, si vous exercez une activité indépendante et remplissez les autres conditions. Le chiffre d'affaires ne se traduit pas en prime par une règle du type « X % du CA ». Passez par le simulateur officiel.",
    },
  ],
  conclusion: {
    title: "À retenir",
    keyPoints: [
      "La prime d'activité complète un revenu d'activité ; elle n'est pas un salaire ni le RSA.",
      "Le barème de base d'une personne seule est 638,28 € depuis le 1er avril 2026, ce n'est pas le montant versé.",
      "Le montant à déclarer est le montant net social.",
      "Il n'y a pas de plafond unique ; le foyer, le logement et les autres ressources pèsent autant que le salaire.",
      "La réforme d'avril 2026 est déjà en vigueur ; le calendrier de déclaration explique les écarts de versement.",
    ],
    closingText:
      "Pour une estimation personnalisée, utilisez le simulateur de la CAF, puis déposez une demande si le test est encourageant.",
    closingCta: {
      label: CAF_CTA_LABEL,
      href: CAF_SIMULATOR_HREF,
    },
    furtherReading: {
      title: "Pour aller plus loin",
      items: [
        {
          title: "Prime de Noël",
          description: "Montants de référence, date de versement et conditions CAF / MSA / France Travail.",
          href: "/prime-de-noel",
        },
        {
          title: "SMIC brut et net",
          description: "Barème horaire et mensuel actuellement applicable.",
          href: SMIC_HREF,
        },
        {
          title: "Lire une fiche de paie",
          description: "Repérer le montant net social sur le bulletin.",
          href: FICHE_PAIE_HREF,
        },
        {
          title: "Calculateur brut vers net",
          description: "Estimer un net à partir d'un brut, distinct de la prime d'activité.",
          href: CALCULATEUR_HREF,
        },
        {
          title: "Tous les guides",
          description: "Salaire, cotisations, prélèvement à la source et fiches pratiques.",
          href: GUIDES_HUB,
        },
      ],
    },
  },
  bibliography: {
    id: "sources-officielles",
    title: "Sources officielles et références",
    blocks: [
      {
        type: "paragraph",
        text: `Informations vérifiées le ${PRIME_ACTIVITE_VERIFIED_ON_LABEL}. Les liens pointent vers les documents utilisés pour rédiger cette page, pas vers des pages d'accueil génériques.`,
      },
      ...SOURCES.map((source) => ({
        type: "internal-link" as const,
        variant: "guide" as const,
        intro: `${source.org}, ${source.date} :`,
        label: source.title,
        href: source.href,
      })),
      {
        type: "callout",
        variant: "legal",
        paragraphs: [
          "Cette page est informative. Elle ne remplace pas une notification CAF ou MSA, ni un conseil personnalisé. En cas d'écart entre deux publications officielles, le décret, la circulaire applicable et le simulateur de votre caisse priment sur un exemple grand public.",
        ],
      },
    ],
  },
  sidebar: {
    calculator: {
      title: "Calculateur brut vers net",
      description: "Estimez un salaire net à partir d'un brut. Ce n'est pas un simulateur de prime d'activité.",
      href: CALCULATEUR_HREF,
    },
    relatedGuides: [
      { title: "Prime de Noël", href: "/prime-de-noel" },
      { title: "SMIC : montants officiels", href: SMIC_HREF },
      { title: "SMIC selon le nombre d'heures", href: SMIC_HOURS_HREF },
      { title: "Comment lire une fiche de paie", href: FICHE_PAIE_HREF },
      { title: "Salaire en alternance", href: ALTERNANCE_HREF },
      { title: "Tous les guides", href: GUIDES_HUB },
    ],
    discover: [
      { title: "Différence brut / net", href: BRUT_NET_HREF },
      { title: "Prélèvement à la source", href: PAS_HREF },
    ],
  },
};
