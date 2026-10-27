import type { Guide } from "../types";
import {
  SOLDE_CONGES_DESCRIPTION,
  SOLDE_CONGES_H1,
  SOLDE_CONGES_PATH,
  SOLDE_CONGES_PUBLISHED_AT,
  SOLDE_CONGES_SEO_TITLE,
  SOLDE_CONGES_SLUG,
  SOLDE_CONGES_SUBTITLE,
  SOLDE_CONGES_TOOL_DESCRIPTION,
  SOLDE_CONGES_TOOL_NAME,
  SOLDE_CONGES_UPDATED_AT,
} from "@/site/solde-conges-payes/data";

const SP_F2258 = "https://www.service-public.fr/particuliers/vosdroits/F2258";
const SP_F2262 = "https://www.service-public.fr/particuliers/vosdroits/F2262";
const SP_F35697 = "https://www.service-public.fr/particuliers/vosdroits/F35697";
const SP_F37482 = "https://www.service-public.fr/particuliers/vosdroits/F37482";
const SP_F33927 = "https://www.service-public.fr/particuliers/vosdroits/F33927";
const CDTN_CONGES = "https://code.travail.gouv.fr/fiche-service-public/conges-payes";
const SP_F36509 =
  "https://www.service-public.fr/particuliers/vosdroits/F36509";
const CDTN_L3141_2 = "https://code.travail.gouv.fr/code-du-travail/l3141-2";
const CDTN_L3141_3 = "https://code.travail.gouv.fr/code-du-travail/l3141-3";
const CDTN_L3141_4 = "https://code.travail.gouv.fr/code-du-travail/l3141-4";
const CDTN_L3141_5 = "https://code.travail.gouv.fr/code-du-travail/l3141-5";
const CDTN_L3141_5_1 = "https://code.travail.gouv.fr/code-du-travail/l3141-5-1";
const CDTN_L3141_7 = "https://code.travail.gouv.fr/code-du-travail/l3141-7";
const CDTN_L3141_8 = "https://code.travail.gouv.fr/code-du-travail/l3141-8";
const CDTN_L3141_12 = "https://code.travail.gouv.fr/code-du-travail/l3141-12";
const CDTN_L3141_13 = "https://code.travail.gouv.fr/code-du-travail/l3141-13";
const CDTN_L3141_19_1 = "https://code.travail.gouv.fr/code-du-travail/l3141-19-1";
const CDTN_L3141_19_2 = "https://code.travail.gouv.fr/code-du-travail/l3141-19-2";
const CDTN_L3141_19_3 = "https://code.travail.gouv.fr/code-du-travail/l3141-19-3";
const CDTN_L3141_29 = "https://code.travail.gouv.fr/code-du-travail/l3141-29";
const LEGI_L3141_3 =
  "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033020826";
const AUTHOR_HREF = "/auteur/antoine";

const CONGES_PAYES_HREF = "/conges-payes";
const FICHE_PAIE_HREF = "/guides/comment-lire-une-fiche-de-paie";
const SOLDE_TOUT_COMPTE_HREF = "/solde-de-tout-compte";
const ARRET_MALADIE_HREF = "/salaire-arret-maladie";
const BRUT_NET_HREF = "/";

/**
 * Guide 2 du cocon congés payés : solde, compteurs et lecture du bulletin.
 * URL canonique : /solde-conges-payes
 * Hors périmètre : règles générales déjà couvertes par /conges-payes ;
 * calcul financier de l'indemnité compensatrice (guide ultérieur).
 */
export const soldeCongesPayesGuide: Guide = {
  slug: SOLDE_CONGES_SLUG,
  publicPath: SOLDE_CONGES_PATH,
  breadcrumbLabel: "Solde de congés payés",
  title: SOLDE_CONGES_H1,
  seoTitle: SOLDE_CONGES_SEO_TITLE,
  description: SOLDE_CONGES_DESCRIPTION,
  subtitle: SOLDE_CONGES_SUBTITLE,
  publishedAt: SOLDE_CONGES_PUBLISHED_AT,
  updatedAt: SOLDE_CONGES_UPDATED_AT,
  includeFaqSchema: true,
  includeWebApplicationSchema: true,
  webApplication: {
    name: SOLDE_CONGES_TOOL_NAME,
    description: SOLDE_CONGES_TOOL_DESCRIPTION,
  },
  faqSectionId: "questions-frequentes",
  faqTitle: "Questions fréquentes sur le solde de congés payés",
  faqIntro:
    "Réponses directes pour lire un compteur, calculer un solde restant et comprendre les cas particuliers.",
  introduction: [
    "Ce guide vous aide à comprendre et à estimer votre solde de congés payés si vous êtes salarié du secteur privé. Pour savoir combien de jours il vous reste, partez du bulletin ou de l'outil RH, dans la même unité (ouvrables ou ouvrés) et sur le même compteur. Lecture d'un compteur : solde restant = jours acquis + reports et crédits non déjà inclus − jours déjà déduits. Le calculateur de cette page propose aussi une estimation simplifiée par période. Aucune de ces lectures ne remplace à elle seule toutes les règles applicables.",
  ],
  introSummary: {
    title: "L'essentiel à retenir",
    items: [
      "En règle générale, 2,5 jours ouvrables sont acquis par mois de travail effectif.",
      "Pour une année complète, le droit annuel légal de base est de 30 jours ouvrables (cinq semaines), hors droits supplémentaires applicables.",
      "Un décompte en jours ouvrés est possible s'il reste au moins aussi favorable qu'en jours ouvrables.",
      "Beaucoup de bulletins affichent deux compteurs (souvent appelés N et N-1) : ce ne sont pas des appellations imposées par la loi.",
      "Reports, anticipations et absences particulières peuvent faire diverger le solde de ce que l'on imagine.",
    ],
  },
  sections: [
    {
      id: "simulateur-solde-conges",
      title: "Calculateur de solde de congés payés",
      blocks: [
        {
          type: "paragraph",
          text: "Le calculateur propose deux modes indépendants. L'estimation par période compte les mois civils complets écoulés depuis le début de la période (1er juin → 31 mai par défaut, année civile ou autre période) jusqu'à la date choisie : le mois en cours n'est pas pris en compte. Cette estimation suppose que vous étiez présent depuis le début de la période sélectionnée, sauf si vous signalez une embauche en cours de période. Le solde total combine le solde encore disponible au début de période, les acquis estimés, puis les jours pris depuis ce début. Une section complémentaire lit les compteurs du bulletin en mode « Acquis et pris » ou « Solde restant ».",
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "L'estimation par période ne reconstitue pas toutes les conséquences des absences ou des règles particulières. Le mode fiche de paie utilise les chiffres de votre bulletin, sans vérifier le calcul effectué par l'employeur. L'outil n'additionne pas jours ouvrés et jours ouvrables, ne convertit pas automatiquement 30 jours ouvrables en 25 jours ouvrés hors année complète, ne transforme pas un solde négatif en zéro, et n'invente pas de solde total lorsque les droits antérieurs manquent. En jours ouvrés, l'estimation des acquis n'est disponible que pour 12 mois complets ; pour une durée plus courte, utilisez le mode fiche de paie.",
          ],
        },
      ],
    },
    {
      id: "calcul-solde-conges-payes",
      title: "Comment calculer son solde de congés payés ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le solde de congés payés est le nombre de jours encore disponibles sur un compteur donné, après prise en compte des droits acquis, des jours déjà déduits du compteur et des mouvements de régularisation. Certains outils distinguent un solde comptable et un solde prévisionnel tenant compte de congés futurs réservés : le calculateur de cette page ne traite que les jours déjà déduits, pas les réservations futures.",
        },
        {
          type: "illustration",
          id: "solde-conges-lecture-compteur",
        },
        {
          type: "paragraph",
          text: "Trois lectures utiles, selon les données dont vous disposez :",
        },
        {
          type: "list",
          items: [
            "Estimation par période (simulateur) : solde de départ + acquis estimés − jours pris depuis le début de période + mouvements non déjà inclus.",
            "Bulletin avec colonnes acquis et pris : acquis − pris + corrections non déjà incluses.",
            "Bulletin avec solde restant déjà calculé : reprendre ce solde sans retirer à nouveau les jours pris.",
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "La formule « acquis + crédits − jours déduits » lit un compteur. Elle n'est pas la seule façon d'utiliser le calculateur : ne mélangez pas un solde déjà calculé avec une nouvelle déduction des jours pris.",
          ],
        },
        {
          type: "paragraph",
          text: "Le droit acquis n'est pas forcément immédiatement utilisable : la période de prise, l'ordre des départs et les règles d'anticipation conditionnent la disponibilité réelle. Un salarié peut donc avoir des jours « acquis » encore non « disponibles » selon le logiciel RH.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le cadre général des droits, voir",
          label: "les règles des congés payés dans le secteur privé",
          href: CONGES_PAYES_HREF,
        },
      ],
    },
    {
      id: "conges-n-n-1",
      title: "Que signifient les congés payés N et N-1 ?",
      blocks: [
        {
          type: "paragraph",
          text: "Beaucoup de logiciels de paie affichent deux compteurs de congés payés. L'un suit souvent la période d'acquisition en cours, l'autre les droits d'une période précédente encore suivis pour la prise. Les libellés « CP N » et « CP N-1 » sont des conventions logicielles : ce ne sont pas des appellations imposées par la loi.",
        },
        {
          type: "table",
          caption: "Lecture habituelle des compteurs N et N-1 (à vérifier sur votre bulletin)",
          headers: ["Compteur", "Signification habituelle", "À vérifier"],
          stackOnMobile: true,
          rowHeader: true,
          rows: [
            [
              "N",
              "Période d'acquisition courante",
              "Convention et libellés de l'entreprise",
            ],
            [
              "N-1",
              "Droits d'une période précédente",
              "Période de prise, reports et date limite éventuelle",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Deux compteurs servent surtout au suivi : séparer ce qui s'acquiert encore et ce qui reste à poser sur une période précédente. Cette séparation n'interdit pas, à elle seule, de poser des jours du compteur courant. Les dates de prise dépendent des règles de l'entreprise et de la validation des absences.",
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "N-1 ne signifie pas systématiquement « à utiliser avant le 31 mai ». Les dates dépendent de la période de référence et des règles de prise applicables dans l'entreprise (convention, accord, caisse de congés).",
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Exemple (jours ouvrables, valeurs fictives de compteur) : N-1 affiche 10 jours acquis et 5 déjà déduits → solde N-1 = 5. N affiche 12,5 jours acquis et 2 déjà déduits → solde N = 10,5. Total arithmétique = 15,5. Ce total ne garantit pas que tous les jours soient immédiatement posables.",
          ],
        },
      ],
    },
    {
      id: "fiche-de-paie",
      title: "Où trouver son solde de congés payés sur sa fiche de paie ?",
      blocks: [
        {
          type: "paragraph",
          text: "Sur le bulletin, cherchez un bloc ou une ligne « Congés payés », « CP », « CP N », « CP N-1 », « acquis », « pris », « solde », parfois « en cours » ou « disponibles ». La présentation varie selon le logiciel de paie : tous les bulletins n'affichent pas les mêmes colonnes.",
        },
        {
          type: "paragraph",
          text: "Si le bulletin ne détaille pas assez, consultez l'outil de gestion des absences (SIRH) ou demandez un relevé de compteur au service RH / paie. Le chiffre du bulletin reste une photographie à une date donnée : un congé validé après l'édition peut ne pas encore y figurer.",
        },
        {
          type: "table",
          caption: "Exemple pédagogique de compteurs sur un bulletin (données fictives)",
          headers: ["Libellé", "Acquis", "Pris", "Solde"],
          stackOnMobile: true,
          rows: [
            ["CP N-1", "30", "22", "8"],
            ["CP N", "15", "2", "13"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Dans le calculateur fiche de paie : mode « Acquis et pris » → saisir 30 et 22 puis 15 et 2 ; mode « Solde restant » → saisir directement 8 et 13. Total = 21. Ne soustrayez jamais à nouveau les jours pris des soldes 8 et 13. Vérifiez toujours l'unité indiquée près du compteur.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour situer les blocs du bulletin :",
          label: "Comment lire une fiche de paie",
          href: FICHE_PAIE_HREF,
        },
      ],
    },
    {
      id: "acquisition-conges",
      title: "Combien de jours de congés payés acquiert-on par mois ?",
      blocks: [
        {
          type: "paragraph",
          text: "En règle générale, le salarié du secteur privé acquiert 2,5 jours ouvrables de congés payés par mois de travail effectif chez le même employeur. Pour une année complète, le droit annuel légal de base est de 30 jours ouvrables (cinq semaines), hors droits supplémentaires applicables (article L3141-3 ; Service-Public F2258). Cette règle vaut pour le CDI comme pour le CDD, à temps plein comme à temps partiel : le temps partiel ne réduit pas, à lui seul, la durée des droits en semaines ; le décompte des jours posés suit ensuite le calendrier d'absence.",
        },
        {
          type: "paragraph",
          text: "Lorsque le droit acquis n'est pas un nombre entier, la durée du congé est portée au nombre entier immédiatement supérieur (article L3141-7). L'arrondi s'apprécie sur le droit total concerné. L'appliquer dans l'outil ne valide pas juridiquement toute la méthode simplifiée (mois civils complets).",
        },
        {
          type: "paragraph",
          text: "Dans les conditions prévues par la loi, une période équivalente à quatre semaines ou vingt-quatre jours de travail est assimilée à un mois de travail effectif pour déterminer la durée du congé (L3141-4). Certaines absences sont également assimilées à du travail effectif (L3141-5), avec des règles particulières pour certains arrêts maladie (L3141-5-1). Le simulateur utilise une estimation simplifiée fondée sur les mois civils complets : il ne reconstitue pas automatiquement tous les décomptes possibles en semaines ou en jours de travail. L'écart peut notamment apparaître en cas d'embauche en cours de mois ou de certaines absences ; le résultat peut différer selon la situation et les règles appliquées.",
        },
        {
          type: "paragraph",
          text: "De nombreuses entreprises décomptent en jours ouvrés. L'équivalence usuelle pour cinq semaines est alors de 25 jours ouvrés sur une année complète. Ce mode doit garantir des droits au moins égaux au calcul en jours ouvrables (F35697 ; F2258). 2,08 jours ouvrés par mois n'est pas une règle légale : c'est une division courante de 25 par 12. Le calculateur n'utilise cette équivalence que pour 12 mois complets ; il n'estime pas les acquis en jours ouvrés sur une période partielle.",
        },
        {
          type: "paragraph",
          text: "Un salarié nouvellement embauché acquiert au fil du travail effectif ou assimilé. Dans l'estimation par période, signalez une embauche en cours de période via « Signaler une situation particulière », sinon l'outil suppose une présence depuis le début de la période. À défaut, utilisez le mode fiche de paie.",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Les 30 jours ouvrables représentent le droit annuel légal de base, pas un plafond absolu de tous les compteurs. Des jours supplémentaires peuvent être accordés pour enfant à charge, sous conditions (L3141-8). Pour les salariés d'au moins 21 ans au 30 avril de l'année précédente, leur cumul avec le congé annuel légal ne peut pas dépasser 30 jours ouvrables. D'autres règles s'appliquent aux salariés de moins de 21 ans. Des jours de fractionnement ou des droits conventionnels, contractuels ou d'usage peuvent aussi s'ajouter selon les textes applicables. Ces jours ne sont pas attribués automatiquement par l'estimation standard : ne saisissez un ajustement que si le droit est établi et non déjà inclus dans le compteur ; le mode fiche de paie peut reprendre des compteurs qui les intègrent déjà.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Source officielle :",
          label: "Congés payés du salarié dans le secteur privé (F2258)",
          href: SP_F2258,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Temps partiel :",
          label:
            "Quels sont les droits à congés payés d'un salarié travaillant à temps partiel ? (F33927)",
          href: SP_F33927,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Équivalence d'un mois de travail :",
          label: "Article L3141-4",
          href: CDTN_L3141_4,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Jours pour enfant à charge :",
          label: "Article L3141-8",
          href: CDTN_L3141_8,
        },
      ],
    },
    {
      id: "jours-ouvres-ouvrables",
      title: "Jours ouvrés ou jours ouvrables : quelle différence pour mon solde ?",
      blocks: [
        {
          type: "paragraph",
          text: "Les jours ouvrables sont les jours pouvant légalement être travaillés : en principe six par semaine, hors repos hebdomadaire et jours fériés habituellement chômés. Les jours ouvrés sont les jours effectivement travaillés dans l'entreprise, souvent cinq par semaine. Les calendriers particuliers (commerce ouvert le samedi, repos un autre jour) peuvent modifier le décompte.",
        },
        {
          type: "table",
          caption: "Comparaison rapide jours ouvrables / jours ouvrés",
          headers: ["Notion", "Décompte usuel", "Effet sur une semaine de congés"],
          stackOnMobile: true,
          rowHeader: true,
          rows: [
            [
              "Jours ouvrables",
              "Souvent lundi à samedi",
              "Une semaine peut représenter 6 jours",
            ],
            [
              "Jours ouvrés",
              "Souvent lundi à vendredi",
              "Une semaine peut représenter 5 jours",
            ],
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Exemple : congés du lundi au dimanche dans une entreprise au repos le dimanche. En jours ouvrables, six jours sont en principe décomptés (lundi à samedi), hors jour férié habituellement chômé. En jours ouvrés « classique » lundi-vendredi, cinq jours sont décomptés. Dans cet exemple, le samedi est décompté en jours ouvrables ; il ne l'est généralement pas dans un décompte classique en jours ouvrés du lundi au vendredi. Le calendrier de repos et le mode retenu par l'entreprise restent déterminants.",
          ],
        },
        {
          type: "callout",
          variant: "error",
          paragraphs: [
            "Erreur fréquente : croire que le solde « diminue de six jours pour une semaine » alors que l'entreprise décompte en jours ouvrés. Vérifiez l'unité avant de conclure à une anomalie.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Définitions officielles :",
          label: "Jour ouvrable, jour ouvré (F35697)",
          href: SP_F35697,
        },
      ],
    },
    {
      id: "exemples-calcul",
      title: "Exemples de calcul du solde de congés payés",
      blocks: [
        {
          type: "paragraph",
          text: "Les exemples ci-dessous sont en jours ouvrables, sauf mention contraire. Ce sont des valeurs pédagogiques de compteurs ou de saisies, pas des calculs définitifs de droits légaux. Hypothèse : les reports saisis ne sont pas déjà inclus dans les jours acquis.",
        },
        {
          type: "table",
          caption: "Exemple du parcours par période (hypothèses pédagogiques)",
          headers: ["Élément", "Valeur"],
          stackOnMobile: true,
          rowHeader: true,
          rows: [
            ["Solde de départ", "5"],
            ["Acquis estimés (ex. 4 mois × 2,5)", "10"],
            ["Pris sur droits antérieurs", "2"],
            ["Pris sur période courante", "1"],
            ["Mouvements complémentaires", "0"],
            ["Résultat", "12"],
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Lecture bulletin (tableau de la section fiche de paie) : N-1 acquis 30 / pris 22 → 8 ; N acquis 15 / pris 2 → 13 ; total 21. En mode soldes, saisir 8 et 13 donne le même total, sans nouvelle déduction.",
            "Autres lectures de compteur : acquis 20 − pris 8 = 12 ; acquis 18 + report 4 (non inclus) − pris 7 = 15 ; anticipation acquis 6 − pris 9 = −3.",
            "Temps partiel : acquis 30 sur l'année, pris 10 → solde 20. Le temps partiel n'a pas réduit à lui seul le droit annuel en semaines.",
          ],
        },
      ],
    },
    {
      id: "conges-anticipes",
      title: "Peut-on prendre des congés payés dès son embauche ?",
      blocks: [
        {
          type: "paragraph",
          text: "Oui, le salarié peut prendre des congés dès l'embauche, sous réserve des règles de fixation des dates et de la période de prise (article L3141-12 ; F2258). Cela ne signifie pas qu'il peut imposer unilatéralement n'importe quelle date.",
        },
        {
          type: "list",
          items: [
            "Congés déjà acquis : droits ouverts au fil du travail effectif ou assimilé.",
            "Congés pris par anticipation : jours posés avant d'être entièrement acquis sur le compteur concerné, avec accord et organisation de l'employeur.",
            "Congés non encore acquis : ils n'existent pas encore comme droit ; une anticipation crée un solde négatif comptable tant que l'acquisition ne rattrape pas.",
          ],
        },
        {
          type: "paragraph",
          text: "L'employeur organise les départs. Un accord sur des dates anticipées n'efface pas le suivi du compteur : le solde peut rester négatif jusqu'à régularisation.",
        },
      ],
    },
    {
      id: "solde-negatif",
      title: "Pourquoi mon solde de congés payés est-il négatif ?",
      blocks: [
        {
          type: "paragraph",
          text: "Un solde négatif peut correspondre à des congés pris par anticipation, à une régularisation en cours, à une erreur de saisie, à une déduction sur le mauvais compteur, à un décalage de mise à jour du bulletin, ou à un changement de période. Distinguez le nombre de jours affiché, une éventuelle indemnité, et un éventuel remboursement : un compteur négatif n'est pas automatiquement une dette immédiatement exigible.",
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Demandez le détail du compteur à l'employeur (acquis, pris, reports, ajustements, unité) avant toute conclusion. En fin de contrat, l'article L3141-29 prévoit des règles particulières en cas de trop-perçu lié à l'ordre des départs ; il ne s'applique pas à tous les soldes négatifs en cours de contrat.",
          ],
        },
      ],
    },
    {
      id: "arret-maladie",
      title: "Comment les arrêts maladie influencent-ils les congés acquis ?",
      blocks: [
        {
          type: "paragraph",
          text: "Depuis le 24 avril 2024, pendant un arrêt pour maladie ou accident d'origine non professionnelle, le salarié acquiert des congés payés dans la limite de 2 jours ouvrables par mois d'arrêt, soit au plus 24 jours ouvrables au titre de ces périodes d'arrêt sur la période de référence (Service-Public F37482 et F2258). Ce plafond de 24 jours concerne l'acquisition pendant les arrêts non professionnels : il ne limite pas automatiquement le total d'une année qui comporte aussi des périodes travaillées (lesquelles ouvrent en principe 2,5 jours ouvrables par mois).",
        },
        {
          type: "paragraph",
          text: "En cas d'accident du travail ou de maladie professionnelle, l'acquisition suit en principe 2,5 jours ouvrables par mois pendant l'arrêt, dans la limite de 30 jours par période de référence (F37482). Des règles plus favorables peuvent s'appliquer.",
        },
        {
          type: "paragraph",
          text: "Les congés déjà acquis mais impossibles à prendre du fait de l'arrêt, ainsi que certains congés acquis pendant un arrêt couvrant toute la période de référence, peuvent bénéficier d'un report de 15 mois (L3141-19-1), avec un point de départ particulier en cas de longue suspension (L3141-19-2). Dans le mois suivant la reprise, l'employeur doit informer le salarié du nombre de jours disponibles et de la date limite pour les prendre (L3141-19-3 ; F37482).",
        },
        {
          type: "paragraph",
          text: "Si un arrêt survient pendant des congés déjà pris, le salarié qui a notifié l'arrêt à l'employeur a droit au report des jours de congé coïncidant avec l'arrêt (Service-Public F2262, qui rappelle l'arrêt de la Cour de cassation du 10 septembre 2025).",
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Ces cas sont trop dépendants des dates et de la nature de l'arrêt pour être reconstitués par l'estimation par période. Le mode fiche de paie peut reprendre des compteurs qui intègrent déjà ces effets, sans en contrôler l'exactitude juridique.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Acquisition pendant l'arrêt :",
          label: "Congés payés pendant un arrêt maladie (F37482)",
          href: SP_F37482,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Report pour maladie :",
          label: "Reporter des congés pour cause de maladie (F2262)",
          href: SP_F2262,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Sur le revenu pendant l'arrêt :",
          label: "Salaire en arrêt maladie",
          href: ARRET_MALADIE_HREF,
        },
      ],
    },
    {
      id: "conges-non-pris",
      title: "Que deviennent les congés payés non pris ?",
      blocks: [
        {
          type: "paragraph",
          text: "La période d'acquisition et la période de prise sont différentes. La période d'acquisition suit en droit commun souvent le 1er juin au 31 mai (ou une autre période prévue par accord). La période de prise fixée dans l'entreprise doit comprendre le 1er mai au 31 octobre (L3141-13 ; F2258) ; elle peut s'étendre au-delà. Ces dates ne constituent pas une échéance universelle de tous les compteurs, ni l'obligation de poser tous ses congés uniquement entre mai et octobre.",
        },
        {
          type: "paragraph",
          text: "Les congés acquis doivent être pris pendant la période de prise fixée dans l'entreprise. L'employeur fixe cette période, informe les salariés selon les modalités applicables, et doit mettre le salarié en mesure de prendre ses congés.",
        },
        {
          type: "paragraph",
          text: "Dans le cas général, le report des congés non pris n'est pas automatique. Il peut être accepté par l'employeur ou prévu par un accord ou un usage dans l'entreprise (F2258 ; F36509). Des règles particulières peuvent toutefois prévoir un report, notamment lorsque le salarié n'a pas pu prendre ses congés pour certaines raisons : maladie (F37482, F2262), ou retour d'un congé de maternité ou d'adoption (L3141-2).",
        },
        {
          type: "paragraph",
          text: "Il est inexact d'affirmer que les congés non pris sont automatiquement perdus au 31 mai ou au 31 octobre. Il est tout aussi inexact d'affirmer qu'ils sont automatiquement reportés dans tous les cas. La réponse est conditionnelle : période de prise applicable dans l'entreprise, information des salariés, cause de l'impossibilité de poser les jours, et textes applicables.",
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "En maladie, un report de 15 mois peut s'appliquer dans les situations prévues ; un accord peut prévoir une durée supérieure. À l'issue du délai applicable, les jours non pris peuvent être perdus (F37482).",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Report ordinaire :",
          label:
            "Un salarié peut-il reporter ses jours de congés non pris sur l'année suivante ? (F36509)",
          href: SP_F36509,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Période de prise :",
          label: "Article L3141-13",
          href: CDTN_L3141_13,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Retour de maternité ou d'adoption :",
          label: "Article L3141-2",
          href: CDTN_L3141_2,
        },
      ],
    },
    {
      id: "fin-contrat",
      title: "Que devient mon solde de congés payés à la fin de mon contrat ?",
      blocks: [
        {
          type: "paragraph",
          text: "À la fin du contrat (démission, licenciement, rupture conventionnelle, fin de CDD), les droits à congés payés non pris ouvrant droit à indemnisation donnent en principe lieu à une indemnité compensatrice de congés payés (Service-Public F2258). Le nombre de jours restants n'est pas le montant de l'indemnité : le calcul financier suit des méthodes légales distinctes.",
        },
        {
          type: "paragraph",
          text: "Ce guide ne calcule pas le montant de l'indemnité. Pour contrôler les sommes versées à la rupture, rapprochez le solde des lignes du solde de tout compte.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "À la rupture du contrat :",
          label: "Solde de tout compte",
          href: SOLDE_TOUT_COMPTE_HREF,
        },
      ],
    },
    {
      id: "verifier-contester",
      title: "Comment vérifier ou contester un solde incorrect ?",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Relever les compteurs",
              description:
                "Notez acquis, pris, solde, unité et période sur le bulletin et dans l'outil RH.",
            },
            {
              title: "Vérifier l'unité",
              description:
                "Ouvrables ou ouvrés : une semaine ne se lit pas de la même façon.",
            },
            {
              title: "Identifier la période",
              description:
                "Période d'acquisition et période de prise associées à chaque compteur.",
            },
            {
              title: "Reconstituer les prises",
              description:
                "Listez les absences réellement validées et le compteur sur lequel les jours ont été déduits (N ou N-1).",
            },
            {
              title: "Contrôler reports et régularisations",
              description:
                "Évitez le double comptage des jours déjà inclus dans « acquis ».",
            },
            {
              title: "Comparer avec les relevés RH",
              description:
                "Écart de date d'édition du bulletin, congé posé après coup, bascule de période.",
            },
            {
              title: "Demander une explication écrite",
              description:
                "Sollicitez le détail du compteur auprès de l'employeur ou du service paie.",
            },
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Exemple de demande : « Bonjour, mon bulletin de [mois] indique un solde CP de [X] jours. Pouvez-vous me communiquer le détail acquis / pris / reports pour les compteurs N et N-1, ainsi que l'unité de décompte ? Merci. »",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: "Comment savoir combien de jours de congés payés il me reste ?",
      answer:
        "Commencez par le solde affiché sur votre bulletin ou dans l'outil RH, dans la même unité que le compteur. Si seules les colonnes acquis et pris sont disponibles, calculez acquis − jours déjà déduits (+ crédits non déjà inclus). Si un solde restant est déjà indiqué, reprenez-le sans retirer à nouveau les jours pris.",
    },
    {
      question: "Comment calculer mon solde de congés payés ?",
      answer:
        "Trois parcours : (1) estimation par période = solde de départ + acquis estimés − jours pris depuis le début + mouvements non inclus ; (2) bulletin acquis/pris = acquis − pris + corrections non incluses ; (3) bulletin solde restant = reprendre le solde sans nouvelle déduction. Exemple de lecture de compteur : 20 acquis, 8 déduits, 2 reportés non inclus → 14.",
    },
    {
      question: "Où voir les congés payés restants sur ma fiche de paie ?",
      answer:
        "Cherchez un bloc Congés payés, CP N, CP N-1, acquis, pris ou solde. La présentation dépend du logiciel de paie. Si le détail manque, demandez un relevé au service RH ou consultez l'outil de gestion des absences.",
    },
    {
      question: "Que signifient CP N et CP N-1 ?",
      answer:
        "Ce sont en général deux compteurs logiciels : N pour la période d'acquisition courante, N-1 pour des droits d'une période précédente encore suivis. Ces libellés ne sont pas des appellations imposées par la loi. N-1 n'implique pas automatiquement une échéance au 31 mai.",
    },
    {
      question: "Combien de jours de congés payés acquiert-on par mois ?",
      answer:
        "En règle générale, 2,5 jours ouvrables par mois de travail effectif. Pour une année complète, le droit annuel légal de base est de 30 jours ouvrables (F2258, L3141-3), hors droits supplémentaires. Une période équivalente à quatre semaines ou vingt-quatre jours de travail peut compter pour un mois (L3141-4) ; le simulateur, lui, estime via les mois civils complets. En jours ouvrés, l'équivalence usuelle annuelle est de 25 jours, sous réserve d'un mode au moins aussi favorable. Le calculateur n'estime les acquis en jours ouvrés que pour 12 mois complets ; sinon, reprenez les compteurs du bulletin.",
    },
    {
      question: "Quelle différence entre congés acquis et congés disponibles ?",
      answer:
        "Les jours acquis sont les droits ouverts sur la période suivie. Les jours disponibles sont ceux que les règles de prise, l'outil RH et l'employeur permettent de poser immédiatement. Un droit acquis peut encore être soumis à la période de prise ou à une validation.",
    },
    {
      question: "Pourquoi mon solde de congés payés est-il négatif ?",
      answer:
        "Souvent parce que des congés ont été pris par anticipation, ou après une régularisation, une erreur de saisie, une déduction sur le mauvais compteur ou un décalage de mise à jour. Un solde négatif comptable n'est pas automatiquement une dette exigible : demandez le détail du compteur.",
    },
    {
      question: "Peut-on prendre des congés avant de les avoir acquis ?",
      answer:
        "Oui, par anticipation, avec l'organisation et l'accord de l'employeur, et sous réserve des règles de fixation des dates. Le compteur peut alors devenir négatif jusqu'à ce que l'acquisition rattrape les jours posés.",
    },
    {
      question: "Les congés payés non pris sont-ils perdus ?",
      answer:
        "Pas automatiquement. Dans le cas général, le report n'est pas automatique : il peut être accepté par l'employeur ou prévu par un accord ou un usage. Des règles particulières existent, notamment en maladie ou au retour d'un congé de maternité ou d'adoption. Il est faux de dire qu'ils sont toujours perdus au 31 mai, et faux de dire qu'ils sont toujours reportés.",
    },
    {
      question: "Comment compter une semaine de congés en jours ouvrables ?",
      answer:
        "En jours ouvrables, une semaine hors repos hebdomadaire et hors jour férié habituellement chômé peut représenter six jours (souvent lundi à samedi). Dans un décompte classique en jours ouvrés du lundi au vendredi, la même semaine peut représenter cinq jours ; le samedi n'y est généralement pas décompté. Vérifiez le mode de votre entreprise.",
    },
    {
      question: "Les salariés à temps partiel ont-ils autant de congés ?",
      answer:
        "Oui pour la durée en semaines : 2,5 jours ouvrables par mois de travail effectif, soit cinq semaines pour une année complète (F33927). Le décompte des jours posés suit ensuite le calendrier d'absence. Un compteur déjà établi sur le bulletin peut être relu via le mode fiche de paie.",
    },
    {
      question: "Acquiert-on des congés payés pendant un arrêt maladie ?",
      answer:
        "Oui. Pendant un arrêt non professionnel, depuis le 24 avril 2024, l'acquisition est en principe de 2 jours ouvrables par mois d'arrêt (max 24 au titre de ces périodes). Cela n'empêche pas d'acquérir 2,5 jours par mois sur les périodes travaillées de la même année. En AT/MP, l'acquisition pendant l'arrêt suit en principe 2,5 jours par mois (max 30) (F37482).",
    },
    {
      question: "Peut-on reporter des congés payés sur l'année suivante ?",
      answer:
        "Dans le cas général, non automatiquement : le report peut être accepté par l'employeur ou prévu par un accord ou un usage (F2258, F36509). Des règles particulières existent, notamment en maladie (report de 15 mois possible, L3141-19-1 et L3141-19-2 ; information après reprise, L3141-19-3) ou au retour d'un congé de maternité ou d'adoption (L3141-2). Un accord peut prévoir une durée de report maladie plus favorable (F37482, F2262).",
    },
    {
      question: "Que deviennent les congés restants à la fin du contrat ?",
      answer:
        "Les droits non pris ouvrant droit à indemnisation donnent en principe lieu à une indemnité compensatrice de congés payés (F2258), quel que soit le motif de rupture le plus courant. Le nombre de jours n'est pas le montant de l'indemnité.",
    },
  ],
  conclusion: {
    title: "À retenir",
    keyPoints: [
      "Lisez chaque compteur dans une seule unité : acquis, jours déjà déduits, crédits non inclus ou solde déjà calculé.",
      "N et N-1 sont des libellés logiciels ; ils ne fixent pas à eux seuls les dates de prise.",
      "2,5 jours ouvrables par mois et 30 jours de droit annuel de base restent le repère légal usuel, hors droits supplémentaires.",
      "Acquisition et prise sont distinctes : la période de prise doit comprendre le 1er mai au 31 octobre, sans échéance universelle de tous les compteurs.",
      "Un solde négatif peut être une anticipation : demandez le détail avant de conclure.",
      "L'estimation par période est simplifiée ; en jours ouvrés elle ne couvre que 12 mois complets. Le mode fiche de paie relit le bulletin sans le vérifier.",
    ],
    closingText:
      "Pour le cadre général des droits, consultez le guide congés payés. Pour la rupture du contrat, rapprochez votre solde du solde de tout compte.",
    closingCta: {
      label: "Voir les règles des congés payés",
      href: CONGES_PAYES_HREF,
    },
    furtherReading: {
      title: "Pour aller plus loin",
      items: [
        {
          title: "Congés payés (privé)",
          description: "Droits, période de prise, refus et décompte.",
          href: CONGES_PAYES_HREF,
        },
        {
          title: "Solde de tout compte",
          description: "Contrôler les sommes dues à la rupture.",
          href: SOLDE_TOUT_COMPTE_HREF,
        },
        {
          title: "Comment lire une fiche de paie",
          description: "Repérer les lignes du bulletin.",
          href: FICHE_PAIE_HREF,
        },
      ],
    },
  },
  bibliography: {
    id: "methodologie-sources",
    title: "Sources officielles et références",
    blocks: [
      {
        type: "paragraph",
        text: "Guide rédigé à partir des sources officielles citées, à destination des salariés du secteur privé. Vérification documentaire des sources officielles consultées : 27 octobre 2026. Sources principales : Code du travail (notamment L3141-2, L3141-3, L3141-4, L3141-5, L3141-5-1, L3141-7, L3141-8, L3141-12, L3141-13, L3141-19-1, L3141-19-2, L3141-19-3, L3141-29), Service-Public F2258, F2262, F35697, F36509, F37482 et F33927, Code du travail numérique, Légifrance. Les conventions collectives peuvent être plus favorables. Hors périmètre : calcul financier détaillé de l'indemnité compensatrice.",
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Auteur :",
        label: "Antoine, créateur de Brut vers Net",
        href: AUTHOR_HREF,
      },
      {
        type: "paragraph",
        text: "Textes et informations officielles :",
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Service-Public :",
        label: "Congés payés du salarié dans le secteur privé (F2258)",
        href: SP_F2258,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Service-Public :",
        label:
          "Un salarié peut-il acquérir des congés payés pendant un arrêt maladie ? (F37482)",
        href: SP_F37482,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Service-Public :",
        label:
          "Un salarié peut-il reporter des jours de congés payés pour cause de maladie ? (F2262)",
        href: SP_F2262,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Service-Public :",
        label:
          "Un salarié peut-il reporter ses jours de congés non pris sur l'année suivante ? (F36509)",
        href: SP_F36509,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Service-Public :",
        label:
          "Jour ouvrable, jour ouvré, jour franc, jour calendaire : quelles sont les différences ? (F35697)",
        href: SP_F35697,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Service-Public :",
        label:
          "Quels sont les droits à congés payés d'un salarié travaillant à temps partiel ? (F33927)",
        href: SP_F33927,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Congés payés du salarié dans le secteur privé",
        href: CDTN_CONGES,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article L3141-2 (retour de maternité ou d'adoption)",
        href: CDTN_L3141_2,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article L3141-3 (durée du congé)",
        href: CDTN_L3141_3,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article L3141-4 (équivalence d'un mois de travail)",
        href: CDTN_L3141_4,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article L3141-5 (périodes assimilées à du travail effectif)",
        href: CDTN_L3141_5,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article L3141-5-1 (acquisition pendant certains arrêts maladie)",
        href: CDTN_L3141_5_1,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article L3141-7 (arrondi)",
        href: CDTN_L3141_7,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article L3141-8 (jours pour enfant à charge)",
        href: CDTN_L3141_8,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article L3141-12 (prise dès l'embauche)",
        href: CDTN_L3141_12,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article L3141-13 (période de prise)",
        href: CDTN_L3141_13,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article L3141-19-1 (report de 15 mois)",
        href: CDTN_L3141_19_1,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article L3141-19-2 (point de départ en longue maladie)",
        href: CDTN_L3141_19_2,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article L3141-19-3 (information après reprise)",
        href: CDTN_L3141_19_3,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article L3141-29 (trop-perçu à la rupture)",
        href: CDTN_L3141_29,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Légifrance :",
        label: "Article L3141-3",
        href: LEGI_L3141_3,
      },
    ],
  },
  sidebar: {
    calculator: {
      title: "Calculateur brut vers net",
      description: "Estimez le net à partir d'un salaire brut.",
      href: BRUT_NET_HREF,
    },
    relatedGuides: [
      {
        title: "Congés payés (privé)",
        href: CONGES_PAYES_HREF,
      },
      {
        title: "Solde de tout compte",
        href: SOLDE_TOUT_COMPTE_HREF,
      },
      {
        title: "Comment lire une fiche de paie",
        href: FICHE_PAIE_HREF,
      },
    ],
    relatedSimulator: {
      title: "Calculateur de solde",
      description: "Estimer les jours restants à partir de vos compteurs.",
      href: `${SOLDE_CONGES_PATH}#simulateur-solde-conges`,
    },
  },
};
