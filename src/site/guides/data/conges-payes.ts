import type { Guide } from "../types";

const SP_F2258 = "https://www.service-public.fr/particuliers/vosdroits/F2258";
const SP_F682 = "https://www.service-public.fr/particuliers/vosdroits/F682";
const SP_F35697 = "https://www.service-public.fr/particuliers/vosdroits/F35697";
const SP_F37482 = "https://www.service-public.fr/particuliers/vosdroits/F37482";
const CDTN_CONGES = "https://code.travail.gouv.fr/fiche-service-public/conges-payes";
const CDTN_L3141_1 = "https://code.travail.gouv.fr/code-du-travail/l3141-1";
const CDTN_L3141_3 = "https://code.travail.gouv.fr/code-du-travail/l3141-3";
const CDTN_L3141_12 = "https://code.travail.gouv.fr/code-du-travail/l3141-12";
const CDTN_L3141_13 = "https://code.travail.gouv.fr/code-du-travail/l3141-13";
const CDTN_L3141_16 = "https://code.travail.gouv.fr/code-du-travail/l3141-16";
const CDTN_L3141_14 = "https://code.travail.gouv.fr/code-du-travail/l3141-14";
const CDTN_L3141_17 = "https://code.travail.gouv.fr/code-du-travail/l3141-17";
const CDTN_L3141_19 = "https://code.travail.gouv.fr/code-du-travail/l3141-19";
const CDTN_L3141_19_3 = "https://code.travail.gouv.fr/code-du-travail/l3141-19-3";
const CDTN_L3141_29 = "https://code.travail.gouv.fr/code-du-travail/l3141-29";
const SP_F33927 = "https://www.service-public.fr/particuliers/vosdroits/F33927";
const CDTN_REPORT =
  "https://code.travail.gouv.fr/fiche-service-public/un-salarie-peut-il-reporter-ses-jours-de-conges-non-pris-sur-lannee-suivante";
const CDTN_REFUS =
  "https://code.travail.gouv.fr/fiche-service-public/un-employeur-peut-il-refuser-des-conges-demandes-par-le-salarie";
const SP_F12803 = "https://www.service-public.fr/particuliers/vosdroits/F12803";
const CDTN_RECLAMATION =
  "https://code.travail.gouv.fr/modeles-de-courriers/reclamation-de-conges-payes";
const LEGI_L3141_3 =
  "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033020826";
const LEGI_L3141_16 =
  "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035652687";

const FICHE_PAIE_HREF = "/guides/comment-lire-une-fiche-de-paie";
const SOLDE_HREF = "/solde-de-tout-compte";
const ARRET_MALADIE_HREF = "/salaire-arret-maladie";
const INTERIM_HREF = "/salaire-interim-calcul-brut-net";
const BRUT_NET_HREF = "/";

const META_DESCRIPTION =
  "Congés payés dans le secteur privé : découvrez vos droits, les règles pour poser vos vacances, les délais, les refus, les jours fériés et les reports.";

/**
 * Guide 1 du cocon congés payés : fonctionnement et règles (secteur privé).
 * URL canonique : /conges-payes
 * Hors périmètre : calcul financier de l'indemnité compensatrice (guide ultérieur).
 * Solde de jours : voir /solde-conges-payes.
 */
export const congesPayesGuide: Guide = {
  slug: "conges-payes",
  publicPath: "/conges-payes",
  breadcrumbLabel: "Congés payés",
  title: "Congés payés 2026 : droits et règles dans le privé",
  seoTitle: "Congés payés (privé) : droits et règles (mis à jour)",
  description: META_DESCRIPTION,
  subtitle:
    "Comprendre vos droits, poser vos vacances, les refus possibles, le décompte et les reports.",
  publishedAt: "2026-10-23",
  updatedAt: "2026-10-23",
  includeFaqSchema: true,
  faqSectionId: "questions-frequentes",
  faqTitle: "Questions fréquentes sur les congés payés",
  faqIntro:
    "Réponses directes aux questions les plus fréquentes sur les droits, les dates, les refus et le décompte.",
  introduction: [
    "Les congés payés sont des périodes de repos rémunérées. Dans le secteur privé, un salarié qui a travaillé une année complète bénéficie en principe de cinq semaines de congés. Ce guide explique qui y a droit, quand et comment les prendre, ce que l'employeur peut refuser ou imposer, et comment se décomptent le samedi et les jours fériés.",
  ],
  introSummary: {
    title: "L'essentiel",
    items: [
      "Tout salarié du privé a droit aux congés payés, quel que soit le type de contrat (CDI, CDD, intérim) et qu'il soit à temps plein ou à temps partiel.",
      "La durée légale correspond en principe à 2,5 jours ouvrables par mois de travail effectif, soit 30 jours ouvrables (cinq semaines) pour une année complète.",
      "Les congés peuvent être pris dès l'embauche, sous réserve de la période de prise et de l'ordre des départs.",
      "L'employeur organise les départs et peut refuser certaines dates ; un refus de dates ne supprime pas le droit aux congés.",
      "Le décompte dépend du système retenu (jours ouvrables ou jours ouvrés) et du traitement des jours fériés chômés.",
    ],
  },
  quickSummary: {
    title: "Parcours des congés payés",
    variant: "reading-order",
    items: [
      {
        kind: "level",
        rate: "1",
        title: "Acquisition",
        description: "Droits ouverts par le travail effectif ou assimilé",
      },
      { kind: "connector", rate: "↓", description: "" },
      {
        kind: "level",
        rate: "2",
        title: "Période de prise",
        description: "Fixée par accord ou par l'employeur (inclut mai-octobre)",
      },
      { kind: "connector", rate: "↓", description: "" },
      {
        kind: "level",
        rate: "3",
        title: "Demande et validation",
        description: "Dates souhaitées, ordre des départs, accord",
      },
      { kind: "connector", rate: "↓", description: "" },
      {
        kind: "level",
        rate: "4",
        title: "Décompte",
        description: "Jours ouvrables ou ouvrés, fériés, reprise",
      },
      { kind: "connector", rate: "↓", description: "" },
      {
        kind: "level",
        rate: "5",
        title: "Report ou fin de contrat",
        description: "Accord, maladie, indemnité compensatrice",
      },
    ],
    synthesis: [
      "Le droit aux congés est distinct du choix libre des dates et du calcul de l'indemnité.",
    ],
  },
  sections: [
    {
      id: "definition-et-beneficiaires",
      title: "C'est quoi les congés payés et qui y a droit ?",
      blocks: [
        {
          type: "paragraph",
          text: "Les congés payés sont des jours de repos pendant lesquels le salarié ne travaille pas et perçoit une indemnité de congés payés. Selon l'article L3141-1 du Code du travail, tout salarié a droit chaque année à un congé payé à la charge de l'employeur.",
        },
        {
          type: "paragraph",
          text: "Dans le secteur privé, le droit s'applique quel que soit le contrat (CDI, CDD ou intérim) et qu'il s'agisse d'un temps plein ou d'un temps partiel (Service-Public F2258). Il n'existe pas de condition générale d'ancienneté pour ouvrir le droit : les congés s'acquièrent au fil du travail effectif ou assimilé.",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Les congés payés ne se confondent pas avec les RTT (réduction du temps de travail), les congés sans solde, le congé parental ou les absences pour événements familiaux. Chaque dispositif a ses propres règles.",
          ],
        },
        {
          type: "table",
          caption: "Repères des principales règles des congés payés (secteur privé)",
          headers: ["Sujet", "Règle générale", "Point à vérifier"],
          stackOnMobile: true,
          rowHeader: true,
          rows: [
            [
              "Droit annuel",
              "2,5 jours ouvrables par mois, 30 jours max pour une année complète",
              "Convention plus favorable ; jours ouvrés équivalents",
            ],
            [
              "Première année",
              "Prise possible dès l'embauche (L3141-12)",
              "Période de prise et ordre des départs",
            ],
            [
              "Choix des dates",
              "Le salarié propose ; l'employeur organise les départs",
              "Accord, CSE, critères familiaux et d'ancienneté",
            ],
            [
              "Refus de dates",
              "Possible ; le droit aux congés demeure",
              "Refus non abusif ; nécessité de service",
            ],
            [
              "Modification des dates",
              "En principe au moins un mois avant le départ",
              "Circonstances exceptionnelles (L3141-16)",
            ],
            [
              "Report",
              "Pas de droit automatique hors cas prévus",
              "Accord, usage, maladie, maternité",
            ],
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Fiche officielle :",
          label: "Congés payés du salarié dans le secteur privé (F2258)",
          href: SP_F2258,
        },
      ],
    },
    {
      id: "fonctionnement-conges-payes",
      title: "Comment fonctionnent les congés payés en France ?",
      blocks: [
        {
          type: "paragraph",
          text: "Oui, les congés payés sont obligatoires dans le sens où le salarié a un droit au repos que l'employeur doit organiser. Ce n'est pas un avantage facultatif : l'employeur fixe la période de prise et l'ordre des départs, et le salarié ne peut pas renoncer librement à ses congés pour les monétiser, hors cas légaux (notamment fin de contrat). Les RTT, congés sans solde ou absences pour événements familiaux restent des dispositifs distincts.",
        },
        {
          type: "paragraph",
          text: "Le mécanisme repose sur trois étapes : l'acquisition des droits, la période de prise, puis le décompte des jours réellement posés. Selon l'article L3141-3 du Code du travail, pour une année complète de travail effectif chez le même employeur, le salarié a droit à 30 jours ouvrables, soit cinq semaines.",
        },
        {
          type: "paragraph",
          text: "La règle légale d'acquisition est de 2,5 jours ouvrables par mois de travail effectif. Lorsque le résultat n'est pas un entier, la durée est portée au nombre entier immédiatement supérieur (article L3141-7). De nombreuses entreprises décomptent en jours ouvrés (souvent 25 jours pour cinq semaines) : ce mode doit garantir des droits au moins égaux au calcul en jours ouvrables.",
        },
        {
          type: "paragraph",
          text: "La période de référence servant à mesurer l'acquisition est en principe du 1er juin de l'année N-1 au 31 mai de l'année N, sauf convention ou affiliation à une caisse de congés (BTP, spectacles, etc.) prévoyant d'autres dates (F2258). Elle ne se confond pas avec la période de prise des congés.",
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "Pendant ses congés payés, le salarié perçoit une indemnité de congés payés. Son montant est déterminé selon les règles légales, notamment par comparaison entre le maintien de salaire et la méthode du dixième. Ce guide ne détaille pas ces méthodes de calcul.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Texte consolidé :",
          label: "Article L3141-3 du Code du travail",
          href: CDTN_L3141_3,
        },
      ],
    },
    {
      id: "periode-de-prise",
      title: "Quand peut-on prendre ses congés payés ?",
      blocks: [
        {
          type: "paragraph",
          text: "La période de prise des congés est fixée soit par convention collective ou accord d'entreprise, soit, à défaut, par l'employeur après avis du comité social et économique (CSE) s'il existe (articles L3141-15 et L3141-16 du Code du travail). Elle est portée à la connaissance des salariés au moins deux mois avant son ouverture (F2258).",
        },
        {
          type: "paragraph",
          text: "Cette période peut s'étendre sur toute l'année. Selon l'article L3141-13 du Code du travail, elle doit toutefois comprendre, dans tous les cas, l'intervalle du 1er mai au 31 octobre. Cela ne signifie pas que tous les congés doivent obligatoirement être pris entre mai et octobre : une partie peut être prise hors de cette fenêtre selon l'organisation retenue et les règles de fractionnement.",
        },
        {
          type: "paragraph",
          text: "Le congé principal (jusqu'à 24 jours ouvrables continus) s'organise autour de cette période. Un minimum de 12 jours ouvrables continus doit en principe être pris entre le 1er mai et le 31 octobre, sauf règles conventionnelles différentes (F2258).",
        },
        {
          type: "callout",
          variant: "verify",
          paragraphs: [
            "Vérifiez votre convention collective et le calendrier affiché par l'entreprise : certaines organisations prévoient une période de prise sur douze mois, d'autres une fermeture annuelle.",
          ],
        },
      ],
    },
    {
      id: "comment-poser-ses-conges",
      title: "Comment poser ses congés payés ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le salarié informe l'employeur des dates qu'il souhaite. En pratique, la demande passe par le manager, les ressources humaines ou un outil interne (logiciel de congés, formulaire papier). L'employeur valide ou refuse les dates dans le cadre de l'ordre des départs.",
        },
        {
          type: "list",
          items: [
            "Adressez la demande selon la procédure de l'entreprise, idéalement par écrit.",
            "Indiquez clairement les dates de début et de reprise.",
            "Attendez la validation avant de réserver des billets non remboursables.",
            "Conservez une preuve de la demande et de la réponse (mail, validation logicielle, accusés).",
          ],
        },
        {
          type: "paragraph",
          text: "Il n'existe pas de délai légal unique imposant au salarié de demander ses congés X semaines à l'avance. Les délais de communication portent surtout sur l'employeur : période de prise portée à connaissance au moins deux mois avant ouverture ; ordre et dates de départ communiqués au moins un mois avant le départ (F2258 ; article L3141-16 du Code du travail).",
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Une demande envoyée ne vaut pas validation automatique. En pratique, attendez une réponse claire. Si l'employeur connaissait vos dates et n'a formulé aucun refus, Service-Public précise que le départ n'est pas en soi une faute (F12803) ; conservez néanmoins une preuve écrite.",
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Exemple : Léa souhaite une semaine du lundi 6 au dimanche 12 juillet. Elle pose sa demande mi-mai via l'outil RH. L'employeur confirme fin mai, plus d'un mois avant le départ. Les dates sont alors fixées ; leur modification est encadrée.",
          ],
        },
      ],
    },
    {
      id: "refus-des-conges",
      title: "Mon employeur peut-il refuser mes congés ?",
      blocks: [
        {
          type: "paragraph",
          text: "Oui. L'employeur peut refuser les dates demandées, notamment pour assurer la continuité du service, respecter l'ordre des départs ou éviter que trop de salariés partent en même temps (F2258). Ce refus porte sur les dates, pas sur l'existence du droit aux congés.",
        },
        {
          type: "paragraph",
          text: "Le salarié doit alors prendre ses congés à une autre date. Un refus répété qui empêcherait durablement toute prise de congés peut être contesté : l'employeur doit permettre l'exercice effectif du droit. En cas de désaccord durable, une réclamation écrite, l'inspection du travail ou le conseil de prud'hommes peuvent être envisagés.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Modèle officiel :",
          label: "Réclamation de congés payés (Code du travail numérique)",
          href: CDTN_RECLAMATION,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Fiche :",
          label: "Un employeur peut-il refuser des congés demandés ?",
          href: CDTN_REFUS,
        },
      ],
    },
    {
      id: "imposer-des-dates",
      title: "Mon employeur peut-il m'imposer des dates de congés ?",
      blocks: [
        {
          type: "paragraph",
          text: "Oui, dans le cadre de la fixation de la période de prise et de l'ordre des départs. À défaut d'accord, selon l'article L3141-16 du Code du travail, l'employeur définit ces éléments après avis du CSE s'il existe, en tenant compte notamment de la situation de famille, de la durée des services et d'une éventuelle activité chez d'autres employeurs. Selon l'article L3141-14, les conjoints mariés ou partenaires liés par un Pacs travaillant dans la même entreprise ont droit à un congé simultané.",
        },
        {
          type: "paragraph",
          text: "Les dates de départ sont communiquées au moins un mois à l'avance. Sauf circonstances exceptionnelles, l'employeur ne peut pas les modifier moins d'un mois avant le départ. Une fermeture temporaire peut aussi imposer des congés (F2258). Ces délais se distinguent des deux mois applicables à la communication de la période de prise.",
        },
        {
          type: "table",
          caption: "Ce que l'employeur peut ou ne peut pas faire (repères)",
          headers: ["Situation", "Règle générale", "Point à vérifier"],
          stackOnMobile: true,
          rowHeader: true,
          rows: [
            [
              "Fixer une période de prise",
              "Oui, via accord ou décision après avis du CSE",
              "Communication ≥ 2 mois avant ouverture",
            ],
            [
              "Refuser certaines dates",
              "Oui, dans le respect de l'organisation des départs",
              "Le droit aux congés reste acquis",
            ],
            [
              "Modifier un départ déjà fixé",
              "En principe ≥ 1 mois avant ; sinon circonstances exceptionnelles",
              "Motif et préavis réel",
            ],
            [
              "Imposer une fermeture",
              "Oui, congés pendant la fermeture temporaire",
              "Convention, information des salariés",
            ],
            [
              "Empêcher toute prise de congés",
              "Non : l'employeur doit permettre l'exercice du droit",
              "Report, usage, recours éventuel",
            ],
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Exemple (2026) : un départ est validé pour le mercredi 16 septembre. Le 25 août, l'employeur veut le décaler. Moins d'un mois avant le départ, la modification n'est possible qu'en cas de circonstances exceptionnelles. À défaut, le salarié peut s'appuyer sur les dates déjà communiquées et demander le maintien du départ prévu.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Texte :",
          label: "Article L3141-16 (période et ordre des départs)",
          href: CDTN_L3141_16,
        },
      ],
    },
    {
      id: "conges-des-lembauche",
      title: "Peut-on prendre des congés payés dès son embauche ?",
      blocks: [
        {
          type: "paragraph",
          text: "Oui. Selon l'article L3141-12 du Code du travail, le salarié bénéficie des congés payés dès son embauche, quelle que soit son ancienneté (F2258). Il doit toutefois respecter la période de prise et l'ordre des départs fixés dans l'entreprise : il ne choisit pas librement n'importe quelle date.",
        },
        {
          type: "paragraph",
          text: "Deux situations se distinguent. D'abord, les jours déjà acquis peuvent être posés dès qu'ils sont ouverts, sous réserve de l'organisation des départs. Ensuite, des congés anticipés peuvent être accordés au-delà des droits déjà acquis, uniquement avec l'accord de l'employeur ; celui-ci n'est pas tenu d'accepter (F12803).",
        },
        {
          type: "paragraph",
          text: "Si, à la rupture, le salarié a pris plus de congés que ses droits ouverts du fait de l'ordre des départs, l'article L3141-29 prévoit le remboursement du trop-perçu, sauf rupture provoquée par une faute lourde de l'employeur. Prendre des congés dès l'embauche n'entraîne donc pas automatiquement une dette.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Exemple : embauché le 1er mars, Karim demande trois jours en juin. S'ils correspondent à des droits déjà acquis et s'inscrivent dans la période de prise et l'ordre des départs, l'employeur peut les valider même sans année complète d'acquisition.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour aller plus loin :",
          label: "calculer votre solde de congés payés",
          href: "/solde-conges-payes",
        },
      ],
    },
    {
      id: "samedi-et-jours-feries",
      title: "Le samedi et les jours fériés comptent-ils dans les congés ?",
      blocks: [
        {
          type: "paragraph",
          text: "Cela dépend du mode de décompte. En jours ouvrables, on compte tous les jours de la semaine sauf le repos hebdomadaire (souvent le dimanche) et les jours fériés habituellement chômés : le samedi est donc en principe décompté (Service-Public F35697). En jours ouvrés, on compte les jours effectivement travaillés dans l'entreprise : souvent du lundi au vendredi, mais un commerce ouvert le samedi et fermé le lundi décomptera autrement. À temps partiel, un jour habituellement non travaillé peut être décompté s'il tombe dans la période d'absence (ex. semaine complète avec mercredi off : 6 jours ouvrables, F33927).",
        },
        {
          type: "table",
          caption: "Jours ouvrables et jours ouvrés : comparaison",
          headers: ["Critère", "Jours ouvrables", "Jours ouvrés"],
          stackOnMobile: true,
          rowHeader: true,
          rows: [
            [
              "Jours typiques",
              "Lundi à samedi (hors dimanche)",
              "Selon le calendrier de l'entreprise (souvent lun.-ven.)",
            ],
            [
              "Semaine complète",
              "6 jours",
              "5 jours",
            ],
            [
              "Cinq semaines",
              "30 jours",
              "Souvent 25 jours (équivalence)",
            ],
            [
              "Samedi",
              "En principe décompté",
              "Non, si ce n'est pas un jour ouvré",
            ],
            [
              "Jour férié chômé",
              "Non décompté",
              "Non décompté",
            ],
            [
              "Jour férié travaillé habituellement",
              "Décompté",
              "Décompté",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Un jour férié habituellement chômé dans l'entreprise n'est pas décompté des congés. S'il est habituellement travaillé, il est décompté (Service-Public F682). Le premier jour décompté est le premier jour où le salarié aurait dû travailler ; on décompte ensuite jusqu'à la reprise, sans compter le jour de reprise lui-même.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Exemple (jours ouvrables, sans jour férié, calendrier 2026) : congés du lundi 6 au vendredi 10 juillet 2026, reprise le lundi 13. Sont décomptés le lundi 6, mardi 7, mercredi 8, jeudi 9, vendredi 10 et samedi 11, soit 6 jours ouvrables. Le dimanche 12 n'est pas décompté ; le lundi 13 non plus, car c'est le jour de reprise.",
            "Exemple (jour férié chômé) : selon Service-Public (F682), un jeudi férié habituellement chômé pendant la semaine n'est pas décompté, ce qui réduit le nombre de jours posés. S'il est habituellement travaillé, il est décompté.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Définitions :",
          label: "Jour ouvrable, jour ouvré (F35697)",
          href: SP_F35697,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Fériés pendant les congés :",
          label: "Jour férié pendant les congés (F682)",
          href: SP_F682,
        },
      ],
    },
    {
      id: "cinq-semaines-dun-coup",
      title: "Peut-on prendre ses cinq semaines de congés d'un seul coup ?",
      blocks: [
        {
          type: "paragraph",
          text: "En principe non. Selon l'article L3141-17 du Code du travail, la durée des congés pouvant être pris en une seule fois ne peut excéder 24 jours ouvrables, soit quatre semaines. La cinquième semaine s'ajoute donc hors de ce bloc continu, sauf dérogation individuelle.",
        },
        {
          type: "paragraph",
          text: "Il peut être dérogé individuellement à cette limite lorsque le salarié justifie de contraintes géographiques particulières, ou de la présence au sein du foyer d'un enfant handicapé, d'un adulte handicapé, ou d'une personne âgée en perte d'autonomie (L3141-17 ; F2258). Ce n'est pas une simple faveur discrétionnaire de l'employeur : la dérogation suppose que l'une de ces situations est établie.",
        },
        {
          type: "paragraph",
          text: "Selon l'article L3141-19 du Code du travail, lorsque le congé principal dépasse 12 jours ouvrables, il peut être fractionné avec l'accord du salarié ; cet accord n'est pas requis si le fractionnement coïncide avec la fermeture de l'établissement. Une des fractions doit compter au moins 12 jours ouvrables continus entre deux jours de repos hebdomadaire, en principe entre le 1er mai et le 31 octobre. Des jours supplémentaires (un ou deux) peuvent s'ajouter si une partie du congé principal est prise hors de cette période, sous conditions et sans automaticité (F2258).",
        },
      ],
    },
    {
      id: "conges-non-pris",
      title: "Que deviennent les congés payés non pris ?",
      blocks: [
        {
          type: "paragraph",
          text: "En principe, les congés non pris à la fin de la période de prise ne se reportent pas automatiquement. Le report est possible en cas d'accord entre l'employeur et le salarié, d'usage ou de dispositions conventionnelles (F2258, fiche report CDTN). Affirmer que les congés sont « toujours perdus le 31 mai » est inexact : la date dépend de la période de prise fixée dans l'entreprise.",
        },
        {
          type: "paragraph",
          text: "L'employeur doit permettre la prise effective des congés. Si le salarié a été mis en mesure de les prendre et les refuse, ils peuvent être perdus. Après un congé de maternité ou d'adoption, le report des congés non pris est également prévu.",
        },
        {
          type: "paragraph",
          text: "En cas d'arrêt maladie, un report de 15 mois peut s'appliquer aux congés non pris pour ce motif et à ceux acquis pendant un arrêt couvrant toute la période de référence, éventuellement prolongé par accord (F37482). Selon l'article L3141-19-3, l'employeur informe le salarié dans le mois suivant la reprise, par un moyen permettant de dater la réception, du nombre de jours restants et de la date jusqu'à laquelle ils peuvent être pris. En cas général, cette information fait courir le report ; si l'arrêt a couvert toute la période de référence, le délai part en principe de la fin de celle-ci, avec suspension possible jusqu'à l'information. Il ne commence pas automatiquement à la seule fin d'arrêt.",
        },
        {
          type: "paragraph",
          text: "À la fin du contrat, les congés acquis non pris donnent lieu à une indemnité compensatrice. Travailler pour un autre employeur pendant ses congés est en principe interdit, sauf contrat de vendanges (F2258).",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "En fin de contrat :",
          label: "Solde de tout compte : congés et indemnités",
          href: SOLDE_HREF,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Arrêt maladie :",
          label: "Salaire en arrêt maladie",
          href: ARRET_MALADIE_HREF,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Report :",
          label: "Peut-on reporter des congés non pris ?",
          href: CDTN_REPORT,
        },
      ],
    },
    {
      id: "situations-particulieres",
      title: "Congés payés : quelles règles particulières selon sa situation ?",
      blocks: [
        {
          type: "paragraph",
          text: "Les règles de base sont les mêmes pour la plupart des salariés du privé. Quelques particularités orientent vers des points de vigilance, sans remplacer un guide dédié à chaque situation.",
        },
        {
          type: "table",
          caption: "Situations fréquentes et points de vigilance",
          headers: ["Situation", "Ce qu'il faut retenir"],
          stackOnMobile: true,
          rowHeader: true,
          rows: [
            [
              "CDI",
              "Droit commun : acquisition, période de prise, ordre des départs",
            ],
            [
              "CDD",
              "Mêmes règles d'acquisition ; à la fin du contrat, congés non pris → indemnité compensatrice",
            ],
            [
              "Temps partiel",
              "Même durée légale ; en jours ouvrables, un jour habituellement non travaillé peut être décompté (F33927)",
            ],
            [
              "Arrêt maladie",
              "Maladie non pro : 2 j. ouvrables/mois (max 24/période). AT/MP : assimilation en travail effectif. Report 15 mois possible (F37482)",
            ],
            [
              "Congé maternité / adoption",
              "Périodes assimilées ; report des congés non pris après le retour",
            ],
            [
              "Démission ou licenciement",
              "Congés acquis non pris → indemnité compensatrice au solde de tout compte",
            ],
            [
              "Intérim",
              "Congés souvent indemnisés en fin de mission (règles spécifiques)",
            ],
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Intérim :",
          label: "Salaire en intérim : IFM et congés payés",
          href: INTERIM_HREF,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Lire le compteur sur le bulletin :",
          label: "Comment lire une fiche de paie",
          href: FICHE_PAIE_HREF,
        },
      ],
    },
  ],
  faq: [
    {
      question: "Est-ce que tous les salariés ont droit aux congés payés ?",
      answer:
        "Oui, dans le secteur privé, tout salarié a droit aux congés payés, qu'il soit en CDI, CDD ou intérim, à temps plein ou à temps partiel. Le droit est prévu par l'article L3141-1 du Code du travail. Les modalités d'acquisition et de prise dépendent ensuite du travail effectif et des règles de l'entreprise.",
    },
    {
      question: "Combien de semaines de congés payés a-t-on par an ?",
      answer:
        "Pour une année complète de travail effectif, la durée légale est de 30 jours ouvrables, soit cinq semaines. L'acquisition se fait à raison de 2,5 jours ouvrables par mois. Une convention collective ou un usage peut être plus favorable. En jours ouvrés, l'équivalence courante est de 25 jours.",
    },
    {
      question: "Est-ce que je peux prendre des congés dès mon embauche ?",
      answer:
        "Oui. Selon l'article L3141-12 du Code du travail, les congés acquis peuvent être pris dès l'embauche, sous réserve de la période de prise et de l'ordre des départs. Au-delà des droits déjà ouverts, l'anticipation exige l'accord de l'employeur. Un remboursement n'est envisagé à la rupture que si, du fait de l'ordre des départs, plus de congés ont été pris que les droits réellement ouverts (L3141-29).",
    },
    {
      question: "Mon patron peut-il refuser mes vacances ?",
      answer:
        "Oui, l'employeur peut refuser les dates demandées pour des raisons d'organisation, tout en respectant le droit aux congés. Un refus de dates n'annule pas les jours acquis. En cas de refus répétés empêchant toute prise de congés, une réclamation écrite ou un recours peuvent être envisagés.",
    },
    {
      question: "Combien de temps à l'avance dois-je poser mes congés ?",
      answer:
        "La loi n'impose pas au salarié un délai unique de demande. En revanche, l'employeur doit porter la période de prise à connaissance au moins deux mois avant son ouverture et communiquer les dates de départ au moins un mois à l'avance. Suivez aussi la procédure interne de l'entreprise.",
    },
    {
      question: "Mon employeur peut-il changer mes dates de vacances ?",
      answer:
        "Une fois les dates fixées, selon l'article L3141-16 du Code du travail, l'employeur ne peut en principe les modifier moins d'un mois avant le départ, sauf circonstances exceptionnelles. Au-delà d'un mois, une modification reste possible dans le cadre de l'organisation des départs. Conservez la preuve des dates communiquées.",
    },
    {
      question: "Est-ce que le samedi compte dans mes congés payés ?",
      answer:
        "En décompte en jours ouvrables, oui : le samedi est en principe un jour ouvrable et est décompté. En jours ouvrés, le samedi n'est généralement pas décompté s'il n'est pas un jour ouvré de l'entreprise. Vérifiez le mode auprès du service paie ou dans les documents de l'entreprise ; il peut aussi figurer sur le bulletin.",
    },
    {
      question: "Les congés payés sont-ils obligatoires ?",
      answer:
        "Oui : le salarié a un droit au repos que l'employeur doit organiser. Ce n'est pas un avantage facultatif. L'employeur peut imposer des dates via l'ordre des départs ou une fermeture temporaire. Si vous refusez de les prendre alors que l'employeur vous y a mis en mesure, ils peuvent être perdus hors report prévu. Ils ne se confondent pas avec les RTT ou les congés sans solde.",
    },
    {
      question: "Peut-on garder ses congés pour l'année suivante ?",
      answer:
        "Pas automatiquement. Le report suppose en principe un accord, un usage ou des dispositions conventionnelles. Des reports spécifiques existent notamment en cas de maladie (période de 15 mois) ou après un congé de maternité ou d'adoption. La date limite dépend de la période de prise de l'entreprise.",
    },
    {
      question: "Est-ce que je perds mes congés si je suis en arrêt maladie ?",
      answer:
        "Pas automatiquement. En maladie non professionnelle, l'acquisition est en principe de 2 jours ouvrables par mois (max 24 par période). Un report de 15 mois peut s'appliquer ; après reprise, l'employeur doit informer le salarié sous un mois du solde et de la date limite de prise (L3141-19-3). Le point de départ du report dépend de cette information ou, si l'arrêt a couvert toute la période de référence, de la fin de celle-ci (F37482).",
    },
    {
      question: "Peut-on prendre cinq semaines de vacances d'un seul coup ?",
      answer:
        "En principe non. Selon l'article L3141-17 du Code du travail, les congés pris en une seule fois ne peuvent dépasser 24 jours ouvrables (quatre semaines). Une dérogation individuelle est possible si le salarié justifie de contraintes géographiques particulières, ou de la présence au foyer d'un enfant ou d'un adulte handicapé, ou d'une personne âgée en perte d'autonomie.",
    },
  ],
  conclusion: {
    title: "À retenir",
    keyPoints: [
      "Tout salarié du privé a droit aux congés payés ; cinq semaines pour une année complète en principe.",
      "Les dates sont organisées par l'employeur : un refus de dates ne supprime pas le droit.",
      "La période de prise doit inclure mai-octobre et peut s'étendre sur l'année.",
      "Samedi et jours fériés se décomptent selon le mode (ouvrables / ouvrés) et l'usage de l'entreprise.",
      "Le report n'est pas automatique ; maladie et fin de contrat ont des règles spécifiques.",
    ],
    closingText:
      "Pour contrôler le solde de congés à la rupture du contrat ou lire les lignes du bulletin, consultez les guides complémentaires du site.",
    closingCta: {
      label: "Voir le guide solde de tout compte",
      href: SOLDE_HREF,
    },
    furtherReading: {
      title: "Pour aller plus loin",
      items: [
        {
          title: "Comment lire une fiche de paie",
          description: "Repérer le compteur de congés sur le bulletin.",
          href: FICHE_PAIE_HREF,
        },
        {
          title: "Salaire en arrêt maladie",
          description: "Comprendre l'impact d'un arrêt sur la rémunération.",
          href: ARRET_MALADIE_HREF,
        },
        {
          title: "Salaire en intérim",
          description: "IFM et congés payés en fin de mission.",
          href: INTERIM_HREF,
        },
      ],
    },
  },
  bibliography: {
    id: "methodologie-sources",
    title: "Méthodologie et sources",
    blocks: [
      {
        type: "paragraph",
        text: "Guide destiné au secteur privé. Sources : Code du travail (L3141-1 et suivants, notamment L3141-14, L3141-17, L3141-19, L3141-19-3 et L3141-29), Service-Public F2258, F682, F35697, F37482, F12803 et F33927, Code du travail numérique. Vérification documentaire : 23 octobre 2026. Les conventions peuvent être plus favorables. Le calcul du solde de jours est traité dans le guide dédié. Hors périmètre : calcul financier détaillé de l'indemnité compensatrice.",
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
        label: "Jour férié pendant les congés (F682)",
        href: SP_F682,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Service-Public :",
        label: "Jour ouvrable, jour ouvré (F35697)",
        href: SP_F35697,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Service-Public :",
        label: "Congés payés pendant un arrêt maladie (F37482)",
        href: SP_F37482,
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
        label: "Article L3141-1 (droit au congé)",
        href: CDTN_L3141_1,
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
        intro: "Légifrance :",
        label: "Article L3141-3 (texte consolidé)",
        href: LEGI_L3141_3,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article L3141-12 (congés dès l'embauche)",
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
        label: "Article L3141-14 (congé simultané des couples)",
        href: CDTN_L3141_14,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article L3141-16 (ordre des départs)",
        href: CDTN_L3141_16,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Légifrance :",
        label: "Article L3141-16 (texte consolidé)",
        href: LEGI_L3141_16,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article L3141-17 (durée maximale du congé continu)",
        href: CDTN_L3141_17,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article L3141-19 (fractionnement)",
        href: CDTN_L3141_19,
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
        intro: "Service-Public :",
        label: "Congés payés à temps partiel (F33927)",
        href: SP_F33927,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Report des congés non pris",
        href: CDTN_REPORT,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Service-Public :",
        label: "Refus de congés demandés (F12803)",
        href: SP_F12803,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Refus de congés demandés",
        href: CDTN_REFUS,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Modèle de réclamation de congés payés",
        href: CDTN_RECLAMATION,
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
        title: "Solde de tout compte",
        href: SOLDE_HREF,
      },
      {
        title: "Comment lire une fiche de paie",
        href: FICHE_PAIE_HREF,
      },
      {
        title: "Salaire en arrêt maladie",
        href: ARRET_MALADIE_HREF,
      },
    ],
  },
};
