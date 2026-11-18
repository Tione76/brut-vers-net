import type { Guide } from "../types";
import {
  CASE_2,
  COMBIEN_GROCERIES_EUR,
  COMBIEN_KEEP_EUR,
  COMBIEN_ON_ACCOUNT_EUR,
  COMBIEN_TO_SAVE_EUR,
  EPARGNE_BREADCRUMB,
  EPARGNE_H1,
  EPARGNE_META_DESCRIPTION,
  EPARGNE_PATH,
  EPARGNE_PUBLISHED_AT,
  EPARGNE_RATES_APPLY_FROM_LABEL,
  EPARGNE_SEO_TITLE,
  EPARGNE_SLUG,
  EPARGNE_SOURCES as S,
  EPARGNE_SOURCES_CHECKED_ON_LABEL,
  EPARGNE_SUBTITLE,
  EPARGNE_UPDATED_AT,
  LDDS_RATE_LABEL,
  LEP_OPENING_MIN_EUR,
  LEP_RATE_LABEL,
  LEP_RFR_METROPOLE_1_PART_EUR,
  LEP_RFR_METROPOLE_2_PARTS_EUR,
  LIVRET_A_RATE_LABEL,
  MARGIN_AVOIDABLE_EUR,
  MARGIN_PHONE_EUR,
  MARGIN_SUBSCRIPTION_EUR,
  MONTHLY_SAVE_SAMPLES,
  PROVISION_CAR_ANNUAL_EUR,
  PROVISION_GIFTS_ANNUAL_EUR,
  PROVISION_INSURANCE_ANNUAL_EUR,
  PROVISION_TOTAL_MONTHLY_EUR,
  annualFromMonthly,
  euro,
} from "@/site/epargner-petit-salaire";

const HOME = "/";
const SMIC = "/smic";
const PRIME_ACTIVITE = "/prime-activite";
const CALCULER_NET = "/guides/comment-calculer-son-salaire-net";
const TEMPS_PARTIEL = "/salaire-temps-partiel";
const ALTERNANCE = "/salaire-alternance";

/**
 * Guide de référence : épargner avec un petit salaire.
 * URL : /epargner-petit-salaire
 */
export const epargnerPetitSalaireGuide: Guide = {
  slug: EPARGNE_SLUG,
  publicPath: EPARGNE_PATH,
  breadcrumbLabel: EPARGNE_BREADCRUMB,
  title: EPARGNE_H1,
  seoTitle: EPARGNE_SEO_TITLE,
  description: EPARGNE_META_DESCRIPTION,
  subtitle: EPARGNE_SUBTITLE,
  publishedAt: EPARGNE_PUBLISHED_AT,
  updatedAt: EPARGNE_UPDATED_AT,
  includeFaqSchema: true,
  faqSectionId: "questions-frequentes",
  faqTitle: "Questions fréquentes sur l'épargne avec un petit salaire",
  introduction: [
    "Le bon montant à épargner, c'est celui que vous pouvez laisser de côté jusqu'à la prochaine paie. Avant de faire un virement, regardez ce que vous devez encore payer d'ici là : factures, courses, transports. S'il vous reste un peu d'argent, essayez d'en mettre une partie de côté. Qu'il vous reste quelques euros ou que votre budget soit déjà dans le rouge, vous trouverez ci-dessous des solutions adaptées à votre situation.",
  ],
  sections: [
    {
      id: "par-ou-commencer",
      title: "Par où commencer selon votre situation ?",
      blocks: [
        {
          type: "paragraph",
          text: "Il n'y a pas un seul bon point de départ. Le plus utile est de repartir de ce qui vous gêne le plus aujourd'hui, puis de n'ouvrir que la partie du guide qui y répond.",
        },
        {
          type: "illustration",
          id: "epargne-orientation",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Si plusieurs situations vous concernent, commencez par celle qui coûte le plus cher ou qui vous inquiète le plus. C'est souvent le découvert. Avant de décider d'un virement, repérez aussi les factures à venir et distinguez-les des imprévus : ce ne sont pas les mêmes euros.",
          ],
        },
        {
          type: "paragraph",
          text: "Et s'il ne reste vraiment rien après vos dépenses essentielles, vous n'avez pas à vous forcer. Rendez-vous directement à la partie [Que faire si vous ne pouvez pas épargner ?](#si-vous-ne-pouvez-pas-epargner) : aides et accompagnement gratuit y sont indiqués.",
        },
      ],
    },
    {
      id: "degager-une-marge",
      title: "Comment trouver un peu d'argent à mettre de côté ?",
      blocks: [
        {
          type: "paragraph",
          text: "Il n'existe pas de classement valable pour tout le monde. En pratique, on regarde d'abord ce qui se répète chaque mois, puis ce qui relève de droits peu connus, et seulement ensuite ce qui est ponctuel. Une économie qui dure n'a pas le même poids qu'une vente unique.",
        },
        {
          type: "illustration",
          id: "epargne-confusions",
          caption:
            "Trois choses à ne pas confondre : une baisse durable d'une charge, une rentrée d'argent unique et une simple dépense repoussée.",
        },
      ],
      subsections: [
        {
          id: "forfait-et-abonnements",
          title: "Forfaits mobile et internet, abonnements",
          blocks: [
            {
              type: "paragraph",
              text: `Relisez vos derniers relevés et repérez ce qui est prélevé chaque mois. Un forfait dont le prix a augmenté après une promotion, une option que vous n'utilisez plus ou un abonnement oublié se corrigent souvent en un seul appel ou en quelques clics. Dans l'exemple fictif de ce guide, un abonnement de ${euro(MARGIN_SUBSCRIPTION_EUR)} par mois est résilié et un forfait coûte ${euro(MARGIN_PHONE_EUR)} de moins par mois.`,
            },
            {
              type: "paragraph",
              text: "Avant de résilier, vérifiez la durée d'engagement et les éventuels frais de sortie : une économie qui coûte un mois de pénalité n'est pas toujours rentable tout de suite.",
            },
          ],
        },
        {
          id: "assurances",
          title: "Assurances : comparer sans perdre en protection",
          blocks: [
            {
              type: "paragraph",
              text: "Comparer une assurance habitation ou auto a du sens, à condition de comparer des garanties équivalentes. Regardez en particulier la franchise : c'est la somme qui reste à votre charge en cas de sinistre. Une cotisation moins chère avec une franchise plus élevée peut vous coûter davantage le jour où vous en avez besoin.",
            },
            {
              type: "callout",
              variant: "vigilance",
              paragraphs: [
                "Ne supprimez pas une assurance utile pour « libérer » quelques euros par mois. Un sinistre non couvert peut coûter bien plus qu'une cotisation.",
              ],
            },
          ],
        },
        {
          id: "courses",
          title: "Courses et dépenses du quotidien",
          blocks: [
            {
              type: "paragraph",
              text: "Pas besoin de vous priver pour alléger le budget alimentaire. Une liste faite à l'avance, quelques repas prévus pour la semaine et des quantités adaptées au foyer suffisent souvent à réduire ce qui est jeté ou acheté sur un coup de tête. Essayez sur deux ou trois semaines, puis regardez ce qui a vraiment changé sur le compte.",
            },
          ],
        },
        {
          id: "prelevement-inutilise",
          title: "Un prélèvement pour quelque chose que vous n'utilisez pas",
          blocks: [
            {
              type: "paragraph",
              text: "Abonnement sportif, plateforme de vidéo, application payante, assurance en double : ce sont des dépenses qui continuent sans que vous y pensiez. Le plus simple est de les lister sur un ou deux relevés, puis de cocher celles que vous avez utilisées au cours des trois derniers mois.",
            },
            {
              type: "paragraph",
              text: `Dans l'exemple fictif, une dépense évitable de ${euro(MARGIN_AVOIDABLE_EUR)} par mois est supprimée.`,
            },
          ],
        },
        {
          id: "transport",
          title: "Transport : ce qui est réaliste, et ce qui ne l'est pas",
          blocks: [
            {
              type: "paragraph",
              text: "Changer de mode de transport dépend du lieu où vous habitez, de vos horaires et des alternatives qui existent vraiment autour de vous. Parfois, un abonnement mieux choisi, un covoiturage ponctuel ou un trajet à vélo suffisent à alléger le budget. Parfois, il n'y a pas de solution simple, et ce n'est pas un défaut de votre part.",
            },
            {
              type: "paragraph",
              text: "Pensez aussi à demander à votre employeur si une partie de votre abonnement de transports en commun peut être prise en charge.",
            },
          ],
        },
        {
          id: "droits-et-aides",
          title: "Aides auxquelles vous avez peut-être droit",
          blocks: [
            {
              type: "paragraph",
              text: "Une aide non demandée, c'est de l'argent qui n'arrive pas. Selon votre foyer et vos revenus, la prime d'activité, une aide au logement ou d'autres dispositifs peuvent changer ce qui vous reste. Aucun montant n'est promis ici : le droit et son calcul dépendent de votre situation.",
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Pour comprendre le fonctionnement de la",
              label: "prime d'activité",
              href: PRIME_ACTIVITE,
              outro:
                ", consultez notre guide, puis vérifiez votre situation sur le simulateur officiel de la CAF.",
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Repère officiel :",
              label: S.servicePublicPrimeActivite.label,
              href: S.servicePublicPrimeActivite.href,
              outro: `(${S.servicePublicPrimeActivite.org}).`,
            },
          ],
        },
        {
          id: "ressources-ponctuelles",
          title: "Rentrées d'argent ponctuelles",
          blocks: [
            {
              type: "paragraph",
              text: "Un remboursement, une prime exceptionnelle ou la revente d'un objet dont vous n'avez plus besoin peuvent aider à constituer une première réserve ou à absorber une facture. Ce sont toutefois des sommes uniques : ne les comptez pas comme un revenu qui reviendra le mois suivant, et ne vous engagez pas sur un virement mensuel qui en dépendrait.",
            },
          ],
        },
      ],
    },
    {
      id: "transformer-economie-en-epargne",
      title: "Comment garder l'argent que vous avez économisé ?",
      blocks: [
        {
          type: "paragraph",
          text: "Réduire une dépense ne crée pas automatiquement de l'épargne. Si la somme libérée reste sur le compte courant, elle se mélange au reste et finit par financer d'autres achats. Pour qu'elle reste de côté, il faut lui donner une place à part.",
        },
        {
          type: "paragraph",
          text: "Une fois une économie confirmée sur vos relevés, gardez de quoi payer jusqu'à la prochaine paie, puis mettez de côté une partie du reste. Les trois exemples plus bas montrent comment cela se traduit en montants concrets, sans refaire ici le même calcul.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Vérifiez combien vous avez vraiment économisé",
              description:
                "Après un ou deux mois, regardez vos relevés : la baisse est-elle bien là, et n'a-t-elle pas été remplacée par une autre dépense ?",
            },
            {
              title: "Gardez de quoi payer les dépenses qui arrivent",
              description:
                "Tout mettre de côté peut vous faire basculer à découvert au premier écart. Laissez une somme sur le compte pour les paiements encore à venir.",
            },
            {
              title: "Mettez de côté une partie de ce qu'il reste",
              description:
                "Virez cette part vers un livret, pour qu'elle ne se mélange plus au solde du quotidien.",
            },
          ],
        },
      ],
    },
    {
      id: "previsibles-et-imprevus",
      title: "Prévoir les factures qui ne tombent pas tous les mois",
      blocks: [
        {
          type: "paragraph",
          text: "Beaucoup de personnes épargnent, puis reprennent l'argent pour payer une assurance annuelle, une réparation ou la rentrée scolaire. Ce n'est pas un manque de volonté : ces dépenses étaient prévisibles, mais personne ne leur avait réservé de somme à part. Pour y voir plus clair, distinguez trois usages de l'argent mis de côté.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Une facture connue : une dépense qui reviendra à une date à peu près certaine (assurance annuelle, entretien du véhicule, cadeaux, fournitures scolaires). On la divise par le nombre de mois qui restent avant l'échéance.",
            "Une épargne de précaution : une réserve disponible pour un coup dur que vous ne pouviez pas prévoir (panne, frais de santé, perte de revenus).",
            "Un projet : une somme destinée à un objectif choisi (permis, électroménager, déménagement), avec une date et un montant visés.",
          ],
        },
        {
          type: "illustration",
          id: "epargne-provisions",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Sur l'épargne de précaution, Mes questions d'argent (Banque de France) propose une page d'explication :",
          label: S.mqdaPrecaution.label,
          href: S.mqdaPrecaution.href,
          outro: ".",
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Ne comptez pas les mêmes euros deux fois : une somme réservée à une facture connue n'est pas disponible pour un imprévu. Sinon, vous croyez disposer d'une réserve plus grande qu'elle ne l'est vraiment.",
          ],
        },
      ],
    },
    {
      id: "combien-mettre-de-cote",
      title: "Combien mettre de côté avec un petit salaire ?",
      blocks: [
        {
          type: "paragraph",
          text: `Avec un budget serré, le bon montant est celui qui reste après les factures prévues et qui peut vraiment rester de côté jusqu'à la prochaine paie. Par exemple, si ${euro(COMBIEN_ON_ACCOUNT_EUR)} restent sur le compte avant le prochain versement, que ${euro(COMBIEN_GROCERIES_EUR)} sont déjà réservés pour les courses et que vous voulez garder ${euro(COMBIEN_KEEP_EUR)} sur le compte, vous pouvez mettre ${euro(COMBIEN_TO_SAVE_EUR)} de côté ce mois-ci. Les chiffres sont fictifs, mais le raisonnement vaut pour d'autres montants.`,
        },
        {
          type: "illustration",
          id: "epargne-combien",
        },
        {
          type: "table",
          caption:
            "Ce que représentent de petits versements mensuels sur un an (hors intérêts, en supposant qu'ils soient tenus tous les mois)",
          headers: ["Versement mensuel", "Total versé sur 12 mois"],
          numeric: true,
          rowHeader: true,
          accent: "brand",
          rows: MONTHLY_SAVE_SAMPLES.map((monthly) => [
            euro(monthly),
            euro(annualFromMonthly(monthly)),
          ]),
        },
        {
          type: "paragraph",
          text: "La règle 50/30/20 (50 % de besoins, 30 % d'envies, 20 % d'épargne) est parfois citée comme repère, mais elle peut être irréaliste quand le logement et les charges essentielles absorbent déjà l'essentiel du budget. Aucun pourcentage ne s'applique à tout le monde.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour partir du bon chiffre, voir",
          label: "comment calculer son salaire net",
          href: CALCULER_NET,
          outro: ", puis retirez ce qui est déjà prévu.",
        },
      ],
    },
    {
      id: "exemples-concrets",
      title: "Trois exemples pour savoir combien mettre de côté",
      blocks: [
        {
          type: "paragraph",
          text: "Trois exemples fictifs. Votre situation (couple, enfants, dettes) peut être très différente.",
        },
        {
          type: "illustration",
          id: "epargne-trois-cas",
        },
        {
          type: "paragraph",
          text: `Si vos revenus dépendent de votre temps de travail ou de votre contrat, voir aussi [salaire à temps partiel](${TEMPS_PARTIEL}) et [salaire en alternance](${ALTERNANCE}).`,
        },
      ],
    },
    {
      id: "organiser-versements",
      title: "Quand mettre de l'argent de côté pour éviter le découvert ?",
      blocks: [
        {
          type: "paragraph",
          text: "Il n'y a pas de jour idéal. Le meilleur moment est celui où vous savez ce qui reste après les gros prélèvements (loyer, assurance, crédit, abonnements). Virer l'argent trop tôt peut vous mettre à découvert avant le dernier prélèvement du mois ; le virer trop tard, c'est souvent ne jamais le faire.",
        },
        {
          type: "illustration",
          id: "epargne-frise",
        },
        {
          type: "paragraph",
          text: "Testez d'abord un virement manuel. Si le montant tient, cherchez « virement permanent » dans l'application de votre banque, choisissez le livret, le montant et une date après les principaux prélèvements, en gardant de quoi payer le reste du mois. Vous pourrez ajuster ou suspendre ce virement si vos revenus changent : les menus dépendent de la banque.",
        },
        {
          type: "list",
          items: [
            "Revenus stables : un petit virement fixe, placé après les principaux prélèvements, peut être pratique une fois le montant testé.",
            "Revenus qui changent : partez d'un mois bas, quitte à verser 0 € certains mois, puis ajoutez un complément les meilleurs mois.",
            "Épargne souvent reprise : réduisez ou décalez le virement, et créez une somme à part pour les factures prévues.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour situer vos ressources, vous pouvez aussi consulter le",
          label: "guide du SMIC",
          href: SMIC,
          outro: ".",
        },
      ],
    },
    {
      id: "epargner-ou-rembourser",
      title: "Faut-il épargner quand on est à découvert ou qu'on rembourse un crédit ?",
      blocks: [
        {
          type: "paragraph",
          text: "Imaginons que votre compte passe à découvert le 25 du mois, et que vous venez de recevoir une petite prime. Mettre cet argent de côté ou combler le découvert ? Il n'y a pas de règle unique, mais quelques repères aident à décider.",
        },
        {
          type: "paragraph",
          text: "Le découvert, la mensualité d'un crédit et le remboursement anticipé ne sont pas la même chose. Un découvert récurrent peut entraîner des intérêts et des frais d'incident : regardez ce qui est réellement facturé sur votre relevé. La mensualité est une échéance prévue, qu'il faut continuer à payer. Le remboursement anticipé consiste à rembourser plus vite que prévu, ce qui peut être possible mais pas toujours avantageux.",
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Ouvrez votre dernier relevé et repérez les frais de rejet ou les commissions d'intervention. Si ces frais reviennent souvent, demandez à votre banque si elle vous a identifié comme client en situation de fragilité financière et si l'offre spécifique peut vous concerner.",
            "Selon la Banque de France, les frais d'incident sont plafonnés à 25 € par mois pour les clients identifiés comme fragiles. Avec l'offre spécifique (au maximum 3 € par mois), le plafond passe à 20 € par mois et 200 € par an. Ces plafonds concernent les frais d'incident, pas les intérêts du découvert, et ne s'appliquent pas automatiquement à tous les comptes.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Repère officiel :",
          label: S.banqueFranceDifficultes.label,
          href: S.banqueFranceDifficultes.href,
          outro: `(${S.banqueFranceDifficultes.org}).`,
        },
        {
          type: "list",
          items: [
            "En découvert régulier, réduire ce découvert passe en général avant d'augmenter un virement d'épargne.",
            "Une toute petite somme gardée de côté peut pourtant vous éviter d'être de nouveau à découvert au prochain imprévu.",
            "Un virement automatique d'épargne qui aggrave le découvert est contre-productif.",
            "Pour un crédit en cours, vérifiez le contrat avant tout remboursement anticipé.",
          ],
        },
        {
          type: "paragraph",
          text: "Selon les règles de Service-Public, un crédit à la consommation peut en principe être remboursé en totalité ou en partie à tout moment. Le prêteur peut toutefois demander une indemnité dans certains cas, notamment lorsque les sommes remboursées sur douze mois dépassent un certain seuil. Les conditions précises figurent sur la fiche officielle.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Repère officiel :",
          label: S.servicePublicRemboursementAnticipe.label,
          href: S.servicePublicRemboursementAnticipe.href,
          outro: `(${S.servicePublicRemboursementAnticipe.org}).`,
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Si les échéances deviennent difficiles à tenir, ne restez pas seul avec la situation. Un Point conseil budget peut examiner votre budget gratuitement et en toute confidentialité, et la Banque de France peut vous orienter.",
          ],
        },
        {
          type: "list",
          items: [
            {
              text: `${S.banqueFranceParticuliers.org} : ${S.banqueFranceParticuliers.label}.`,
              href: S.banqueFranceParticuliers.href,
              label: "Banque de France, particuliers",
            },
            {
              text: `${S.mqdaPcb.org} : ${S.mqdaPcb.label}.`,
              href: S.mqdaPcb.href,
              label: "Point conseil budget",
            },
          ],
        },
      ],
    },
    {
      id: "ou-conserver-premiere-epargne",
      title: "Sur quel livret mettre ses premières économies ?",
      blocks: [
        {
          type: "paragraph",
          text: "Pour une première réserve, vous avez besoin de pouvoir récupérer l'argent vite si une facture urgente arrive, sans risquer de le perdre. Les livrets réglementés répondent à ce besoin. Les taux ci-dessous sont ceux vérifiés sur Service-Public pour la période à partir du " +
            EPARGNE_RATES_APPLY_FROM_LABEL +
            " ; ils peuvent changer.",
        },
        {
          type: "illustration",
          id: "epargne-livrets",
        },
        {
          type: "paragraph",
          text: "Un livret ne protège pas totalement contre l'inflation : si les prix montent plus vite que le taux, le pouvoir d'achat de la somme peut baisser.",
        },
      ],
      subsections: [
        {
          id: "comment-savoir-lep",
          title: "Comment savoir si je peux ouvrir un LEP ?",
          blocks: [
            {
              type: "paragraph",
              text: `L'accès au LEP ne dépend pas de votre salaire mensuel, mais de votre revenu fiscal de référence (le montant qui porte ce nom sur l'avis d'impôt) et du nombre de parts de votre foyer fiscal. Un salaire proche du SMIC ne suffit donc pas pour savoir si vous y avez droit.`,
            },
            {
              type: "paragraph",
              text: `En France métropolitaine, le plafond de revenu fiscal de référence retenu pour 2026 est de ${euro(LEP_RFR_METROPOLE_1_PART_EUR)} pour une part fiscale et de ${euro(LEP_RFR_METROPOLE_2_PARTS_EUR)} pour deux parts. Les plafonds sont plus élevés avec davantage de parts et diffèrent en outre-mer. La banque vérifie la condition à l'ouverture, avec un versement initial d'au moins ${euro(LEP_OPENING_MIN_EUR)}.`,
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Pour les conditions complètes, consultez la fiche",
              label: S.servicePublicLep.label,
              href: S.servicePublicLep.href,
              outro: `(${S.servicePublicLep.org}).`,
            },
          ],
        },
      ],
    },
    {
      id: "si-vous-ne-pouvez-pas-epargner",
      title: "Que faire si vous ne pouvez pas épargner ?",
      blocks: [
        {
          type: "paragraph",
          text: "Avec des revenus modestes, si votre paie sert déjà à couvrir le nécessaire, il est possible que vous ne puissiez rien mettre de côté ce mois-ci. Le plus utile, dans ce cas, est de limiter les frais d'incident, de vérifier vos droits et de demander de l'aide à quelqu'un qui peut regarder votre budget avec vous.",
        },
        {
          type: "paragraph",
          text: "Pour des dépenses essentielles, deux pistes complémentaires existent : le [chèque énergie](https://www.service-public.gouv.fr/particuliers/vosdroits/R59559) et la [complémentaire santé solidaire](https://www.service-public.gouv.fr/particuliers/vosdroits/R13558). Une simulation officielle ne garantit pas une aide, mais elle permet de savoir si une demande mérite d'être engagée.",
        },
        {
          type: "checklist",
          title: "Premiers gestes",
          items: [
            "Vérifier vos droits (prime d'activité, aide au logement, autres aides) sans présumer du montant.",
            "Parler de vos difficultés de paiement à votre banque ou à un interlocuteur social avant que les incidents ne s'accumulent.",
            "Contacter un Point conseil budget (PCB) : le service est gratuit, confidentiel et personnalisé.",
            "Si les dettes pèsent trop lourd, vous informer sur la procédure de surendettement.",
          ],
        },
        {
          type: "paragraph",
          text: "Pour trouver un Point conseil budget près de chez vous, utilisez la carte de Mes questions d'argent ou l'annuaire de Service-Public.",
        },
        {
          type: "list",
          items: [
            {
              text: `${S.mqdaPcbCarte.org} : ${S.mqdaPcbCarte.label}.`,
              href: S.mqdaPcbCarte.href,
              label: "Carte des PCB",
            },
            {
              text: `${S.annuairePcb.org} : ${S.annuairePcb.label}.`,
              href: S.annuairePcb.href,
              label: "Annuaire des PCB",
            },
            {
              text: `${S.mqdaPcb.org} : ${S.mqdaPcb.label}.`,
              href: S.mqdaPcb.href,
              label: "Présentation des PCB",
            },
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "En cas de dettes que vous n'arrivez plus à rembourser, voir",
          label: S.servicePublicSurendettement.label,
          href: S.servicePublicSurendettement.href,
          outro: `(${S.servicePublicSurendettement.org}).`,
        },
      ],
    },
    {
      id: "plan-d-action",
      title: "Cinq étapes pour commencer ce mois-ci",
      blocks: [
        {
          type: "illustration",
          id: "epargne-plan",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "S'il ne reste rien à mettre de côté, passez directement à la section sur les aides et l'accompagnement plutôt que de forcer un virement.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: "Peut-on épargner avec le SMIC ?",
      answer:
        "Cela dépend de ce qui reste après le logement, les charges et la situation du foyer. Le SMIC donne un ordre de grandeur de revenus, pas une garantie qu'il reste quelque chose à mettre de côté. Regardez d'abord ce qu'il vous reste vraiment. S'il n'en reste rien, commencez par stabiliser le compte et vérifier vos droits.",
    },
    {
      question: "Est-ce utile de mettre 10 ou 20 € de côté ?",
      answer: `Oui, si cette somme reste vraiment de côté et ne vous met pas à découvert. Sur douze mois, ${euro(10)} par mois représentent ${euro(annualFromMonthly(10))} et ${euro(20)} par mois représentent ${euro(annualFromMonthly(20))}, hors intérêts. Au début, l'intérêt est surtout de prendre l'habitude et de créer un petit matelas.`,
    },
    {
      question: "Pourquoi dois-je reprendre mon épargne chaque mois ?",
      answer:
        "Souvent parce que des dépenses prévisibles mais irrégulières, comme l'assurance, l'entretien ou les cadeaux, n'ont pas de somme réservée. Séparer ces provisions de l'épargne de précaution évite de reprendre l'argent à chaque facture.",
    },
    {
      question: "Faut-il épargner en début ou en fin de mois ?",
      answer:
        "Ni l'un ni l'autre par principe. Le bon moment est celui où les principaux prélèvements sont passés et où vous savez ce qui reste. Un virement trop tôt peut provoquer un découvert, un virement trop tard n'a parfois jamais lieu.",
    },
    {
      question: "Peut-on ouvrir un LEP avec un petit salaire ?",
      answer: `Cela ne dépend pas du salaire seul, mais du revenu fiscal de référence et du nombre de parts de votre foyer fiscal, indiqués sur votre avis d'impôt. En métropole, le plafond retenu pour 2026 est de ${euro(LEP_RFR_METROPOLE_1_PART_EUR)} pour une part et de ${euro(LEP_RFR_METROPOLE_2_PARTS_EUR)} pour deux parts. Un salaire proche du SMIC ne garantit donc pas l'accès au LEP.`,
    },
    {
      question: "Comment faire avec un salaire qui change d'un mois à l'autre ?",
      answer:
        "Choisissez un petit montant calé sur un mois où vous gagnez le moins, puis ajoutez un complément les mois où il reste davantage. Évitez de régler le virement sur votre meilleur mois : c'est ce qui crée le plus souvent un découvert. Certains mois, verser 0 € reste une option.",
    },
    {
      question: "Faut-il épargner quand on est à découvert ?",
      answer:
        "En général, stabiliser le compte passe avant d'augmenter un virement d'épargne. Une toute petite somme gardée de côté peut parfois éviter un nouvel incident, mais un virement qui aggrave le découvert n'a pas de sens. Si la situation dure, un Point conseil budget ou la Banque de France peuvent vous orienter.",
    },
  ],
  faqIntro:
    "Des réponses courtes aux questions les plus fréquentes. Elles ne remplacent pas un accompagnement personnalisé.",
  bibliography: {
    id: "methodologie-sources",
    title: "Méthode et sources",
    blocks: [
      {
        type: "paragraph",
        text: "Ce guide propose des méthodes d'organisation, pas un conseil financier personnalisé. Il distingue ces méthodes, les règles officielles (livrets, plafonds, taux) et les exemples fictifs.",
      },
      {
        type: "paragraph",
        text: "Les exemples chiffrés sont inventés. Les totaux annuels sont calculés hors intérêts, en multipliant un montant mensuel par douze, et supposent que le versement soit tenu chaque mois.",
      },
      {
        type: "paragraph",
        text: `Taux et plafonds contrôlés le ${EPARGNE_SOURCES_CHECKED_ON_LABEL} sur Service-Public, applicables à partir du ${EPARGNE_RATES_APPLY_FROM_LABEL} : Livret A et LDDS à ${LIVRET_A_RATE_LABEL}, LEP à ${LEP_RATE_LABEL}. Ces valeurs évoluent par arrêté : vérifiez toujours la fiche officielle en vigueur.`,
      },
      {
        type: "paragraph",
        text: "Les liens vers la Banque de France et Mes questions d'argent renvoient à des notions utiles. Ils ne signifient pas que cet article a été relu ou approuvé par ces institutions.",
      },
      {
        type: "list",
        items: [
          {
            text: `${S.mqdaOrganiser.org} : ${S.mqdaOrganiser.label}.`,
            href: S.mqdaOrganiser.href,
            label: "Organiser son épargne",
          },
          {
            text: `${S.mqdaPrecaution.org} : ${S.mqdaPrecaution.label}.`,
            href: S.mqdaPrecaution.href,
            label: "Épargne de précaution",
          },
          {
            text: `${S.servicePublicLep.org} : ${S.servicePublicLep.label}.`,
            href: S.servicePublicLep.href,
            label: "LEP",
          },
          {
            text: `${S.servicePublicLivretA.org} : ${S.servicePublicLivretA.label}.`,
            href: S.servicePublicLivretA.href,
            label: "Livret A",
          },
          {
            text: `${S.servicePublicLdds.org} : ${S.servicePublicLdds.label}.`,
            href: S.servicePublicLdds.href,
            label: "LDDS",
          },
          {
            text: `${S.servicePublicTauxAout2026.org} : ${S.servicePublicTauxAout2026.label}.`,
            href: S.servicePublicTauxAout2026.href,
            label: "Évolution des taux",
          },
          {
            text: `${S.servicePublicRemboursementAnticipe.org} : ${S.servicePublicRemboursementAnticipe.label}.`,
            href: S.servicePublicRemboursementAnticipe.href,
            label: "Remboursement anticipé",
          },
          {
            text: `${S.banqueFranceDifficultes.org} : ${S.banqueFranceDifficultes.label}.`,
            href: S.banqueFranceDifficultes.href,
            label: "Difficultés financières",
          },
          {
            text: `${S.servicePublicChequeEnergie.org} : ${S.servicePublicChequeEnergie.label}.`,
            href: S.servicePublicChequeEnergie.href,
            label: "Chèque énergie",
          },
          {
            text: `${S.servicePublicC2s.org} : ${S.servicePublicC2s.label}.`,
            href: S.servicePublicC2s.href,
            label: "Complémentaire santé solidaire",
          },
          {
            text: `${S.mqdaPcb.org} : ${S.mqdaPcb.label}.`,
            href: S.mqdaPcb.href,
            label: "Points conseil budget",
          },
        ],
      },
    ],
  },
  bibliographyPlacement: "after-faq",
  conclusion: {
    title: "Pour conclure",
    keyPoints: [],
    closingText:
      "Épargner avec un petit salaire, c'est d'abord repérer ce qui reste après les factures prévues, puis choisir une somme que vous pouvez vraiment laisser de côté. Et si rien ne reste ce mois-ci, le bon réflexe est de vérifier vos droits et de demander de l'aide, pas de forcer un virement.",
    closingCta: {
      label: "Choisir ma première action",
      href: "#par-ou-commencer",
    },
    furtherReading: {
      title: "Pour aller plus loin",
      items: [
        {
          title: "SMIC : montants brut et net",
          description: "Les repères officiels du salaire minimum pour situer vos ressources.",
          href: SMIC,
        },
        {
          title: "Prime d'activité",
          description: "Conditions, montants forfaitaires et simulateur officiel.",
          href: PRIME_ACTIVITE,
        },
        {
          title: "Comment calculer son salaire net ?",
          description: "Comprendre le passage du brut au net versé après prélèvement à la source.",
          href: CALCULER_NET,
        },
      ],
    },
  },
  sidebar: {
    calculator: {
      title: "Calculateur Brut vers Net",
      description: "Estimez le net disponible à partir de votre brut.",
      href: HOME,
    },
    relatedGuides: [
      { title: "SMIC : montants brut et net", href: SMIC },
      { title: "Prime d'activité", href: PRIME_ACTIVITE },
      { title: "Comment calculer son salaire net ?", href: CALCULER_NET },
    ],
    discover: [
      { title: "Salaire à temps partiel", href: TEMPS_PARTIEL },
      { title: "Salaire en alternance", href: ALTERNANCE },
    ],
  },
};
