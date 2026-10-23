import type { Guide } from "../types";

const FICHE_PAIE_HREF = "/guides/comment-lire-une-fiche-de-paie";
const BRUT_NET_HREF = "/guides/comment-est-calcule-le-salaire-net";
const COTISATIONS_HREF = "/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net";
const PAS_HREF = "/guides/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne";
const INTERIM_HREF = "/salaire-interim-calcul-brut-net";
const HEURES_SUP_HREF = "/calculateurs/salaire-heures-supplementaires";
const INDEMNITE_LICENCIEMENT_HREF = "/calculateurs/indemnite-licenciement";

const CDTN_SOLDE = "https://code.travail.gouv.fr/fiche-service-public/solde-de-tout-compte";
const CDTN_L1234_20 = "https://code.travail.gouv.fr/code-du-travail/l1234-20";
const CDTN_MODELE_RECU =
  "https://code.travail.gouv.fr/modeles-de-courriers/recu-pour-solde-de-tout-compte";
const CDTN_DENONCIATION =
  "https://code.travail.gouv.fr/modeles-de-courriers/comment-denoncer-un-recu-pour-solde-de-tout-compte";
const CDTN_PRUDHOMMES =
  "https://code.travail.gouv.fr/fiche-service-public/saisir-le-conseil-de-prudhommes-cph";
const CDTN_SIM_LICENCIEMENT = "https://code.travail.gouv.fr/outils/indemnite-licenciement";
const CDTN_SIM_RUPTURE =
  "https://code.travail.gouv.fr/outils/indemnite-rupture-conventionnelle";
const CDTN_SIM_PRECARITE = "https://code.travail.gouv.fr/outils/indemnite-precarite";
const SP_F86 = "https://www.service-public.fr/particuliers/vosdroits/F86";
const SP_F21789 = "https://www.service-public.fr/particuliers/vosdroits/F21789";
const SP_F24661 = "https://www.service-public.fr/particuliers/vosdroits/F24661";
const SP_F803 = "https://www.service-public.fr/particuliers/vosdroits/F803";
const SP_F19030 = "https://www.service-public.fr/particuliers/vosdroits/F19030";
const SP_F11215 = "https://www.service-public.fr/particuliers/vosdroits/F11215";
const SP_F408 = "https://www.service-public.fr/particuliers/vosdroits/F408";
const SP_F987 = "https://www.service-public.fr/particuliers/vosdroits/F987";
const SP_F1643 = "https://www.service-public.fr/particuliers/vosdroits/F1643";
const SP_F2308 = "https://www.service-public.fr/particuliers/vosdroits/F2308";
const SP_F40 = "https://www.service-public.fr/particuliers/vosdroits/F40";
const CDTN_L1471_1 = "https://code.travail.gouv.fr/code-du-travail/l1471-1";
const CDTN_L3245_1 = "https://code.travail.gouv.fr/code-du-travail/l3245-1";
const CDTN_L1243_9 = "https://code.travail.gouv.fr/code-du-travail/l1243-9";
const CDTN_L1221_25 = "https://code.travail.gouv.fr/code-du-travail/l1221-25";
const CDTN_L3251_3 = "https://code.travail.gouv.fr/code-du-travail/l3251-3";
const CDTN_L1234_5 = "https://code.travail.gouv.fr/code-du-travail/l1234-5";
const CDTN_R1234_9 = "https://code.travail.gouv.fr/code-du-travail/r1234-9";
const SP_F37482 = "https://www.service-public.fr/particuliers/vosdroits/F37482";
const SP_F31539 =
  "https://entreprendre.service-public.gouv.fr/vosdroits/F31539";
const BOSS_INDEMNITES_RUPTURE =
  "https://boss.gouv.fr/portail/accueil/autres-elements-de-remuneration/indemnites-de-rupture.html";
const CASS_2000_96_43218 =
  "https://www.legifrance.gouv.fr/juri/id/JURITEXT000007042031";
const CASS_2018_16_13194 =
  "https://www.legifrance.gouv.fr/juri/id/JURITEXT000036718275";
const CASS_2026_25_12609 =
  "https://www.legifrance.gouv.fr/juri/id/JURITEXT000054929440";
const CASS_2026_25_14826 =
  "https://www.legifrance.gouv.fr/juri/id/JURITEXT000054929442";
const LEGI_L1234_20 =
  "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000019071122";
const CDTN_D1234_8 = "https://code.travail.gouv.fr/code-du-travail/d1234-8";

const META_DESCRIPTION =
  "Solde de tout compte : comment vérifier le calcul, les congés payés, les indemnités et les délais ? Signature, paiement et contestation expliqués.";

/**
 * Guide de référence : solde de tout compte (secteur privé).
 * URL canonique : /solde-de-tout-compte
 */
export const soldeDeToutCompteGuide: Guide = {
  slug: "solde-de-tout-compte",
  publicPath: "/solde-de-tout-compte",
  breadcrumbLabel: "Solde de tout compte",
  title: "Solde de tout compte 2026 : calcul, indemnités, délais et contestation",
  seoTitle: "Solde de tout compte : calcul, indemnités et délais (mis à jour)",
  description: META_DESCRIPTION,
  subtitle:
    "Vérifier les sommes dues, les congés payés, les indemnités et les délais de signature ou de contestation.",
  publishedAt: "2026-10-21",
  updatedAt: "2026-10-23",
  faqSectionId: "questions-frequentes",
  faqTitle: "Questions fréquentes sur le solde de tout compte",
  faqIntro:
    "Réponses directes aux questions les plus fréquentes sur le calcul, la signature, les délais et la contestation.",
  introduction: [
    "Le solde de tout compte est le document qui inventorie les sommes versées au salarié à la fin du contrat : salaire restant dû, congés payés non pris, primes et, selon le motif, indemnités de rupture. Ce guide, destiné au secteur privé, aide à contrôler les montants et à agir en cas d'erreur.",
  ],
  introSummary: {
    title: "L'essentiel",
    items: [
      "Remise obligatoire à la fin du contrat ; la signature du reçu est facultative.",
      "Contenu variable selon le contrat et le motif : salaire, congés, primes, indemnités.",
      "Contrôlez chaque ligne avant de signer ; un reçu signé peut être dénoncé sous six mois pour les sommes mentionnées.",
      "Récupérez aussi certificat de travail, attestation France Travail et dernier bulletin (documents quérables).",
    ],
  },
  quickSummary: {
    title: "Parcours du solde de tout compte",
    variant: "reading-order",
    items: [
      { kind: "level", rate: "1", title: "Fin du contrat", description: "Fin du préavis ou départ effectif" },
      { kind: "connector", rate: "↓", description: "" },
      { kind: "level", rate: "2", title: "Calcul des sommes", description: "Salaire, congés, indemnités" },
      { kind: "connector", rate: "↓", description: "" },
      { kind: "level", rate: "3", title: "Remise des documents", description: "Solde, certificat, attestation" },
      { kind: "connector", rate: "↓", description: "" },
      { kind: "level", rate: "4", title: "Vérification", description: "Contrôle ligne par ligne" },
      { kind: "connector", rate: "↓", description: "" },
      { kind: "level", rate: "5", title: "Signature facultative", description: "Aucun effet libératoire sans signature" },
      { kind: "connector", rate: "↓", description: "" },
      { kind: "level", rate: "6", title: "Contestation éventuelle", description: "Délais selon la situation" },
    ],
    synthesis: [
      "Le solde inventorie les sommes versées ; signature, paiement et délais restent distincts.",
    ],
  },
  sections: [
    {
      id: "quest-ce-que-le-solde-de-tout-compte",
      title: "Qu'est-ce que le solde de tout compte ?",
      blocks: [
        {
          type: "paragraph",
          text: "Selon l'article L1234-20, le solde de tout compte inventorie les sommes versées lors de la rupture. Ce n'est pas un calcul automatique (Service-Public F86).",
        },
        {
          type: "list",
          items: [
            "Reçu pour solde de tout compte : inventaire des sommes versées à la rupture.",
            "Dernier bulletin : détail de la dernière période.",
            "Virement : net crédité après cotisations, retenues et éventuel prélèvement à la source.",
            "Autres documents : certificat de travail, attestation France Travail, état d'épargne salariale le cas échéant.",
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "La signature est facultative. Sans signature, pas d'effet libératoire L1234-20 (un paiement peut toutefois être prouvé autrement). Avec signature, l'effet libératoire ne porte que sur les sommes mentionnées, après le délai de dénonciation. Détails dans la section « Faut-il signer ? ».",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour lire le dernier bulletin :",
          label: "Comment lire une fiche de paie",
          href: FICHE_PAIE_HREF,
        },
      ],
    },
    {
      id: "solde-de-tout-compte-obligatoire",
      title: "Le solde de tout compte est-il obligatoire ?",
      blocks: [
        {
          type: "paragraph",
          text: "Oui. L'employeur doit le remettre pour tout contrat du secteur privé et tout motif de rupture (démission, licenciement, rupture conventionnelle, fin de CDD, etc.). Les agents publics et certains régimes particuliers peuvent relever de règles distinctes (L1234-20, F86, F21789).",
        },
      ],
    },
    {
      id: "contenu-solde-de-tout-compte",
      title: "Que doit contenir un solde de tout compte ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le reçu inventorie les sommes versées à la rupture (salaire du mois, indemnité compensatrice de congés payés (ICCP), préavis, indemnité de licenciement le cas échéant), mentionne le double exemplaire, la date et, s'il y a signature, celle du salarié. Les sommes encore inconnues (non-concurrence à venir, intéressement non calculé) n'ont pas à y figurer. Un reçu indiquant seulement une somme globale, sans détailler les montants versés, peut être privé de son effet libératoire, même s'il renvoie à un bulletin de paie annexé (Cass. soc. 14 février 2018, 16-16.617).",
        },
        {
          type: "table",
          caption: "Éléments fréquemment présents sur un solde de tout compte",
          headers: ["Élément", "Quand est-il dû ?", "Comment le vérifier ?"],
          stackOnMobile: true,
          rows: [
            [
              "Dernier salaire",
              "Toujours pour la période non encore payée",
              "Comparer avec le contrat, les heures et le dernier bulletin",
            ],
            [
              "Heures supplémentaires ou complémentaires",
              "Si effectuées et non déjà payées",
              "Relevé d'heures, planning, fiche de paie",
            ],
            [
              "Primes et commissions",
              "Selon contrat, usage ou convention",
              "Clauses, objectifs atteints, bulletins antérieurs",
            ],
            [
              "Congés payés non pris",
              "Droits acquis et non pris à la rupture (y compris faute lourde)",
              "Solde de congés + méthode du maintien ou du dixième",
            ],
            [
              "Indemnité compensatrice de préavis",
              "Si préavis dû et non effectué, notamment en cas de dispense par l'employeur (hors faute grave)",
              "Salaires et avantages qui auraient été perçus, congés payés afférents compris (L1234-5) ; pas un simple « mois × salaire » sans contrôle",
            ],
            [
              "Indemnité de licenciement",
              "CDI, ancienneté et motif ouvrant droit (pas en faute grave/lourde)",
              "Simulateur officiel ou convention collective",
            ],
            [
              "Indemnité de rupture conventionnelle",
              "Rupture conventionnelle homologuée (CDI)",
              "Minimum légal ou conventionnel, montant négocié",
            ],
            [
              "Prime de précarité (CDD)",
              "Fin de CDD, hors exceptions légales",
              "10 % en principe, parfois 6 % avec contreparties de formation",
            ],
            [
              "Indemnité de fin de mission (intérim)",
              "Fin de mission, hors exceptions",
              "En principe 10 % de la rémunération de la mission",
            ],
            [
              "Remboursements de frais",
              "Frais engagés et justifiés non encore remboursés",
              "Notes de frais, justificatifs (hors régime salarial)",
            ],
            [
              "Autres régularisations",
              "Trop-perçu, avance, prêt, avantages en nature",
              "Accord écrit, bulletins, justificatifs",
            ],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Ne mélangez pas remboursements de frais, salaire brut et indemnités de rupture. Leur régime social et fiscal peut différer. Un total unique « net » forfaitaire n'est pas fiable.",
          ],
        },
        {
          type: "table",
          caption: "Repères selon le type de rupture (secteur privé)",
          headers: [
            "Type de rupture",
            "Salaire restant dû",
            "Congés payés non pris",
            "Indemnité de rupture",
            "Préavis",
            "Particularités",
          ],
          stackOnMobile: true,
          rows: [
            [
              "Démission",
              "Oui",
              "Oui",
              "Non (sauf clause ou usage rare)",
              "Selon conditions ; dispense possible",
              "Pas d'indemnité de licenciement automatique",
            ],
            [
              "Licenciement (hors faute grave/lourde)",
              "Oui",
              "Oui",
              "Selon conditions (ancienneté, motif)",
              "Selon ancienneté ; indemnité compensatrice de préavis (ICP) si dispense employeur",
              "Comparer légal et conventionnel",
            ],
            [
              "Licenciement pour faute grave ou lourde",
              "Oui",
              "Oui",
              "Pas d'indemnité légale de licenciement",
              "En principe pas de préavis",
              "Les congés acquis restent dus",
            ],
            [
              "Rupture conventionnelle",
              "Oui",
              "Oui",
              "Indemnité spécifique (minimum légal)",
              "Pas de préavis classique ; date de rupture fixée",
              "Montant négociable au-dessus du minimum",
            ],
            [
              "Fin de CDD",
              "Oui",
              "Oui (souvent 1/10e)",
              "Prime de précarité selon conditions",
              "Sans objet en fin de terme",
              "Exceptions (CDI proposé, faute grave, etc.)",
            ],
            [
              "Intérim (fin de mission)",
              "Oui",
              "Oui (au moins 1/10e)",
              "Indemnité de fin de mission (IFM) selon conditions",
              "Sans objet en fin de mission",
              "Voir aussi le guide intérim du site",
            ],
            [
              "Période d'essai rompue",
              "Oui",
              "Oui",
              "En principe non",
              "Délai de prévenance éventuel",
              "Pas d'indemnité de licenciement",
            ],
          ],
        },
      ],
    },
    {
      id: "exemple-recu-commente",
      title: "Exemple de reçu pour solde de tout compte : comment lire chaque ligne ?",
      blocks: [
        {
          type: "paragraph",
          text: "Exemple pédagogique fictif (montants bruts). Comparez chaque ligne à votre situation ; il ne remplace pas le modèle officiel.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Camille Martin · Atelier Nord SA · CDI · Démission · Fin de contrat et reçu : 30 avril 2026 · Préavis effectué · Double exemplaire · Signature facultative.",
          ],
        },
        {
          type: "table",
          caption: "Reçu commenté (exemple fictif de démission)",
          headers: ["Ligne du reçu", "Montant brut", "Ce que cela signifie", "Comment vérifier"],
          stackOnMobile: true,
          rows: [
            [
              "Salaire du mois d'avril 2026",
              "2 400,00 €",
              "Rémunération de la dernière période travaillée",
              "Comparer avec le contrat et le bulletin d'avril",
            ],
            [
              "Indemnité compensatrice de congés payés",
              "571,43 €",
              "Droits acquis et non pris à la fin du contrat (ICCP)",
              "Compteur de congés + méthode du maintien ou du dixième",
            ],
            [
              "Indemnité de licenciement",
              "0,00 €",
              "Absente car une démission n'ouvre pas ce droit automatiquement",
              "Vérifier le motif de rupture sur le reçu",
            ],
            [
              "Remboursement de frais (note du 12/04)",
              "45,00 €",
              "Frais professionnels justifiés, hors salaire",
              "Justificatifs et politique de frais de l'entreprise",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Le virement peut être inférieur à la somme des bruts (cotisations, PAS, retenues). Les frais remboursés suivent souvent un régime distinct.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Modèle officiel :",
          label: "Reçu pour solde de tout compte",
          href: CDTN_MODELE_RECU,
        },
      ],
    },
    {
      id: "verifier-solde-en-5-etapes",
      title: "Vérifier son solde de tout compte en 5 étapes",
      blocks: [
        {
          type: "paragraph",
          text: "Fil conducteur pour croiser reçu, bulletins et justificatifs :",
        },
        {
          type: "steps",
          items: [
            {
              title: "Vérifier le dernier salaire",
              description:
                "Comparer la dernière période travaillée (jours, heures, absences) avec le bulletin et le contrat.",
            },
            {
              title: "Vérifier les congés",
              description:
                "Contrôler le solde de congés, les jours pris et l'indemnité compensatrice versée (ICCP).",
            },
            {
              title: "Vérifier les indemnités",
              description:
                "Ne retenir que celles ouvertes par le motif de rupture : licenciement, rupture conventionnelle, précarité, IFM, préavis.",
            },
            {
              title: "Vérifier les retenues",
              description:
                "Repérer avance, trop-perçu, mutuelle ou autres régularisations et exiger le détail écrit.",
            },
            {
              title: "Vérifier le paiement et les documents",
              description:
                "Comparer le net versé (virement) aux justificatifs, puis contrôler certificat, attestation France Travail et double exemplaire du reçu.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Rapprochement pédagogique (bases brutes homogènes) :",
        },
        {
          type: "table",
          caption: "Exemple de rapprochement (montants bruts indicatifs)",
          headers: ["Poste", "Montant dû", "Déjà payé", "Reste à payer", "Justificatif"],
          stackOnMobile: true,
          numeric: true,
          rows: [
            ["Dernier salaire (avril)", "2 400,00 €", "0,00 €", "2 400,00 €", "Bulletin"],
            ["Congés (ICCP)", "571,43 €", "0,00 €", "571,43 €", "Compteur"],
            ["Prime annuelle (si due)", "0,00 €", "0,00 €", "0,00 €", "Contrat"],
            ["Indemnité de rupture", "0,00 €", "0,00 €", "0,00 €", "Motif de départ"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Reproduisez ce tableau avec vos documents. Pour une indemnité de licenciement seule, un simulateur dédié : il ne calcule pas l'intégralité du solde.",
          ],
        },
        {
          type: "internal-link",
          variant: "calculator",
          intro: "Salaire brut restant :",
          label: "Calculateur salaire brut vers net",
          href: "/",
        },
        {
          type: "internal-link",
          variant: "calculator",
          intro: "Indemnité légale de licenciement :",
          label: "Simulateur d'indemnité de licenciement",
          href: INDEMNITE_LICENCIEMENT_HREF,
        },
      ],
    },
    {
      id: "conges-payes-non-pris",
      title: "Comment calculer les congés payés non pris ?",
      blocks: [
        {
          type: "paragraph",
          text: "Les congés acquis non pris donnent lieu à une ICCP, quelle que soit l'origine de la rupture, y compris faute lourde (F24661).",
        },
        {
          type: "paragraph",
          text: "En CDI, on compare maintien de salaire et règle du dixième ; le plus favorable est retenu. En CDD ou intérim, Service-Public retient en pratique 1/10e de la rémunération brute totale du contrat (souvent avec prime de précarité ou IFM), pas 10 % du seul dernier mois.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "CDI (maintien, jours ouvrés) : 2 400 €, mois de 21 jours, 5 jours non pris → 2 400 × 5 / 21 = 571,43 € brut. Le dixième peut être plus favorable.",
          ],
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Certaines entreprises (BTP, transport, spectacles) affiliées à une caisse de congés : l'employeur remet un certificat, la caisse verse l'indemnité.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Brut, cotisations et net :",
          label: "Comment est calculé le salaire net",
          href: BRUT_NET_HREF,
        },
      ],
      subsections: [
        {
          id: "conges-pendant-arret-maladie",
          title: "Arrêt maladie : les congés acquis comptent-ils dans le solde de tout compte ?",
          blocks: [
            {
              type: "paragraph",
              text: "Oui, s'ils n'ont pas été pris. Depuis la loi du 22 avril 2024 (maladie ordinaire à compter du 24 avril 2024), l'acquisition dépend de la nature de l'arrêt (F37482).",
            },
            {
              type: "list",
              items: [
                "Maladie ou accident non professionnels : 2 jours ouvrables par mois, plafond 24 jours par période d'acquisition.",
                "Accident du travail ou maladie professionnelle : en principe 2,5 jours ouvrables par mois, sans ce plafond de 24 jours.",
                "Acquisition, report et ICCP à la rupture sont trois mécanismes distincts.",
              ],
            },
            {
              type: "paragraph",
              text: "Les congés non pris en raison d'un arrêt maladie peuvent bénéficier d'une période de report de 15 mois, éventuellement prolongée par accord ; son point de départ dépend notamment de la situation du salarié et des informations communiquées par l'employeur (F37482). Ce report ne court pas automatiquement à compter de la rupture du contrat.",
            },
            {
              type: "paragraph",
              text: "Prescription : l'action en paiement de l'ICCP se prescrit en principe par trois ans à compter de la rupture (L3245-1 ; Cass. soc. 16 septembre 2026, 25-12.609), et non à la seule date du reçu. Lorsque l'action est recevable, des congés acquis depuis le 1er décembre 2009 peuvent être concernés sous réserve du report (25-14.826). Ces solutions ne s'appliquent pas mécaniquement à toute demande.",
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Fiche officielle :",
              label: "Congés payés pendant un arrêt maladie (F37482)",
              href: SP_F37482,
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Arrêt consulté :",
              label: "Cass. soc. 16 septembre 2026, 25-12.609",
              href: CASS_2026_25_12609,
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Arrêt consulté :",
              label: "Cass. soc. 16 septembre 2026, 25-14.826",
              href: CASS_2026_25_14826,
            },
          ],
        },
      ],
    },
    {
      id: "solde-apres-demission",
      title: "Solde de tout compte après une démission",
      blocks: [
        {
          type: "paragraph",
          text: "Pas d'indemnité de licenciement automatique. Restent dus le salaire, les heures et primes non payées, et l'ICCP. Préavis selon contrat, convention ou usage : s'il est dispensé par l'employeur, une ICP est en principe due ; si le salarié demande la dispense sans maintien de rémunération, vérifiez l'accord écrit.",
        },
      ],
    },
    {
      id: "solde-apres-licenciement",
      title: "Solde de tout compte après un licenciement",
      blocks: [
        {
          type: "paragraph",
          text: "Outre salaire et congés, le solde peut inclure une ICP et une indemnité de licenciement selon le motif et l'ancienneté.",
        },
        {
          type: "table",
          caption: "Effets possibles selon le motif (repères, hors conventions plus favorables)",
          headers: ["Situation", "Indemnité de licenciement", "Préavis", "Congés payés"],
          stackOnMobile: true,
          rows: [
            [
              "Motif personnel ou économique (hors faute grave/lourde)",
              "Selon conditions (ex. 8 mois d'ancienneté pour le légal)",
              "Selon ancienneté",
              "Dus s'ils restent acquis",
            ],
            [
              "Faute simple",
              "Oui si conditions d'ancienneté",
              "Oui en principe",
              "Dus",
            ],
            [
              "Faute grave",
              "Non (indemnité légale)",
              "Non en principe",
              "Dus",
            ],
            [
              "Faute lourde",
              "Non (indemnité légale)",
              "Non en principe",
              "Dus",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Indemnité légale minimale : 1/4 de mois par année jusqu'à 10 ans, puis 1/3 (R1234-2) ; la convention peut être plus favorable. Ne la confondez pas avec l'ICP ou l'ICCP. Une faute grave ou lourde n'efface pas l'ICCP, mais peut supprimer l'indemnité de licenciement et le préavis.",
        },
        {
          type: "internal-link",
          variant: "simulator",
          intro: "Simulateur maison :",
          label: "Calculer une indemnité de licenciement",
          href: INDEMNITE_LICENCIEMENT_HREF,
        },
        {
          type: "internal-link",
          variant: "simulator",
          intro: "Simulateur officiel :",
          label: "Indemnité de licenciement (CDTN)",
          href: CDTN_SIM_LICENCIEMENT,
        },
      ],
    },
    {
      id: "solde-apres-rupture-conventionnelle",
      title: "Solde de tout compte après une rupture conventionnelle",
      blocks: [
        {
          type: "paragraph",
          text: "Fin d'un CDI d'un commun accord : salaire restant dû, ICCP et indemnité spécifique. Aucune condition minimale d'ancienneté n'est exigée ; le montant ne peut être inférieur à l'indemnité légale de licenciement et peut être négocié au-dessus. En dessous de huit mois, le BOSS retient a minima un prorata des mois de présence : (salaire de référence mensuel × 1/4) × (mois / 12). Pas de préavis classique : date fixée dans la convention après homologation.",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Le simulateur officiel estime l'indemnité spécifique pour un CDI à temps plein, pas le reste du solde.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Fiche Service-Public :",
          label: "Rupture conventionnelle",
          href: SP_F19030,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Service-Public Entreprendre :",
          label: "Calcul de l'indemnité spécifique (F31539)",
          href: SP_F31539,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "BOSS :",
          label: "Indemnités de rupture (prorata si ancienneté inférieure à 8 mois)",
          href: BOSS_INDEMNITES_RUPTURE,
        },
        {
          type: "internal-link",
          variant: "simulator",
          intro: "Outil officiel :",
          label: "Simulateur d'indemnité de rupture conventionnelle",
          href: CDTN_SIM_RUPTURE,
        },
      ],
    },
    {
      id: "solde-fin-cdd",
      title: "Solde de tout compte à la fin d'un CDD",
      blocks: [
        {
          type: "paragraph",
          text: "Dernier salaire, ICCP et, le cas échéant, prime de précarité (indemnité de fin de contrat). Cas général : au moins 10 % de la rémunération brute totale du contrat (L1243-8) ; une convention ou un accord applicable peut la limiter à 6 % avec contreparties de formation (L1243-9). Exceptions fréquentes (F803, F40) :",
        },
        {
          type: "table",
          caption: "Dans quels cas la prime de précarité n'est-elle pas due ?",
          headers: ["Situation", "Prime due ?", "Conditions ou exceptions"],
          stackOnMobile: true,
          rows: [
            [
              "Cas général (fin de CDD à terme)",
              "Oui (10 %, parfois 6 %)",
              "Sauf exception légale ou accord applicable",
            ],
            [
              "Faute grave du salarié",
              "Non en principe",
              "Vérifier la qualification du motif",
            ],
            [
              "Rupture anticipée à l'initiative du salarié",
              "Non en principe",
              "Hors cas légaux particuliers",
            ],
            [
              "Force majeure",
              "Non en principe",
              "Événement imprévisible et irrésistible",
            ],
            [
              "Poursuite ou conclusion d'un CDI à l'issue",
              "Non en principe (L1243-8)",
              "Si les relations se poursuivent en CDI ; un simple renouvellement de CDD ne suffit pas à exclure la prime",
            ],
            [
              "Refus d'un CDI proposé",
              "Exclusion possible (L1243-10)",
              "Si le CDI proposé remplit les conditions légales, notamment un emploi identique ou similaire et une rémunération au moins équivalente ; vérifier les caractéristiques et les modalités de la proposition",
            ],
            [
              "Contrat saisonnier",
              "Non en principe",
              "Sauf disposition conventionnelle plus favorable",
            ],
            [
              "CDD d'usage",
              "Non en principe",
              "Sauf disposition conventionnelle plus favorable",
            ],
            [
              "Contrat de professionnalisation / apprentissage",
              "Non en principe",
              "Sauf disposition conventionnelle plus favorable",
            ],
            [
              "Certains contrats aidés (CUI-PEC, etc.)",
              "Non en principe",
              "Sauf disposition conventionnelle plus favorable",
            ],
            [
              "Contrat pendant vacances scolaires ou universitaires",
              "Non en principe",
              "Jeune pendant ses vacances ; usages éventuels à vérifier",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Ne confondez pas prime de précarité (CDD) et IFM (intérim). Voir aussi l'exemple B chiffré plus bas.",
          ],
        },
        {
          type: "internal-link",
          variant: "simulator",
          intro: "Outil officiel :",
          label: "Simulateur d'indemnité de précarité",
          href: CDTN_SIM_PRECARITE,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Fiche Service-Public :",
          label: "Prime de précarité en fin de CDD",
          href: SP_F803,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Fiche Service-Public :",
          label: "Fin d'un CDD (F40)",
          href: SP_F40,
        },
      ],
    },
    {
      id: "solde-interim-periode-essai",
      title: "Solde de tout compte en intérim et pendant la période d'essai",
      subsections: [
        {
          id: "solde-interim",
          title: "Contrat de mission (intérim)",
          blocks: [
            {
              type: "paragraph",
              text: "Fin de mission : IFM (souvent 10 % de la rémunération brute de la mission et renouvellements) et ICCP (au moins 1/10e, IFM comprise dans les exemples officiels), hors exceptions (faute grave, rupture anticipée du salarié, force majeure). Bases et exceptions peuvent différer du CDD.",
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Guide du site :",
              label: "Salaire en intérim : IFM et congés payés",
              href: INTERIM_HREF,
            },
          ],
        },
        {
          id: "solde-periode-essai",
          title: "Rupture de la période d'essai",
          blocks: [
            {
              type: "paragraph",
              text: "Pas d'indemnité de licenciement. Restent dus salaire, heures ou primes, et ICCP. Le délai de prévenance n'est pas un préavis de licenciement : il ne prolonge pas la période d'essai.",
            },
            {
              type: "table",
              caption: "Délais de prévenance légaux (période d'essai d'au moins une semaine)",
              headers: ["Initiative", "Durée de présence", "Délai de prévenance"],
              stackOnMobile: true,
              rows: [
                ["Employeur", "Moins de 8 jours", "24 heures"],
                ["Employeur", "De 8 jours à 1 mois", "48 heures"],
                ["Employeur", "De 1 mois à 3 mois", "2 semaines"],
                ["Employeur", "Après 3 mois", "1 mois"],
                ["Salarié", "Moins de 8 jours", "24 heures"],
                ["Salarié", "À partir de 8 jours", "48 heures"],
              ],
            },
            {
              type: "paragraph",
              text: "Non-respect du délai de prévenance par l'employeur : indemnité compensatrice en principe due (sauf faute grave), salaires et avantages jusqu'à la fin du délai, congés compris (L1221-25).",
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Fiche Service-Public :",
              label: "Période d'essai pour un salarié (F1643)",
              href: SP_F1643,
            },
          ],
        },
      ],
    },
    {
      id: "cotisations-fiscalite-retenues",
      title: "Cotisations, impôt, retenues et trop-perçus",
      blocks: [
        {
          type: "paragraph",
          text: "Pas de régime fiscal ou social unique : chaque ligne a le sien. N'appliquez jamais un taux net forfaitaire à tout le reçu.",
        },
      ],
      subsections: [
        {
          id: "quelles-sommes-cotisations-impot",
          title: "Quelles sommes sont soumises à cotisations et à l'impôt ?",
          blocks: [
            {
              type: "table",
              caption: "Repères prudents (secteur privé) : vérifier votre bulletin et la fiche F408",
              headers: ["Somme", "Cotisations sociales", "Impôt sur le revenu"],
              stackOnMobile: true,
              rows: [
                [
                  "Salaire restant dû",
                  "En principe oui",
                  "En principe oui",
                ],
                [
                  "Indemnité compensatrice de congés payés",
                  "En principe oui (comme du salaire)",
                  "En principe oui",
                ],
                [
                  "Indemnité compensatrice de préavis",
                  "En principe oui",
                  "En principe oui",
                ],
                [
                  "Prime de précarité / IFM",
                  "En principe oui",
                  "En principe oui",
                ],
                [
                  "Indemnité de licenciement",
                  "Exonération possible selon conditions et plafonds",
                  "Exonération possible selon conditions et plafonds",
                ],
                [
                  "Indemnité de rupture conventionnelle",
                  "Régime particulier selon situation (retraite ou non)",
                  "Régime particulier selon situation",
                ],
                [
                  "Remboursements de frais professionnels",
                  "En principe hors salaire s'ils sont justifiés",
                  "En principe non imposables s'ils sont justifiés",
                ],
              ],
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Fiscalité des indemnités :",
              label: "Service-Public F408",
              href: SP_F408,
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Lire cotisations et net :",
              label: "Cotisations salariales",
              href: COTISATIONS_HREF,
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Impôt retenu sur le bulletin :",
              label: "Prélèvement à la source",
              href: PAS_HREF,
            },
          ],
        },
        {
          id: "retenues-avances-trop-percus",
          title: "Avances, acomptes, trop-perçus et retenues",
          blocks: [
            {
              type: "list",
              items: [
                "Acompte : travail déjà effectué, imputé sur le salaire correspondant.",
                "Avance : avant le travail ; retenues successives ≤ 1/10e du salaire exigible (L3251-3).",
                "Trop-perçu : erreur de paie ; pas de compensation libre totale (L3251-1) ; exigez le détail écrit.",
                "Frais justifiés : créance distincte du salaire ; mutuelle / avantages en nature : à contrôler sur le bulletin.",
              ],
            },
            {
              type: "callout",
              variant: "example",
              paragraphs: [
                "Avance de 600 € restant due, salaire exigible 1 800 € : retenue d'avance ≤ 180 € sur l'échéance (1/10e), sauf autre régime.",
              ],
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Paiement du salaire et trop-perçu :",
              label: "Service-Public F2308",
              href: SP_F2308,
            },
          ],
        },
      ],
    },
    {
      id: "exemples-chiffres-solde",
      title: "Exemples chiffrés de soldes de tout compte",
      blocks: [
        {
          type: "paragraph",
          text: "Exemple pédagogique en montants bruts. Trois scénarios hors net personnalisé ; méthode de lecture seulement.",
        },
      ],
      subsections: [
        {
          id: "exemple-a-demission",
          title: "Exemple A : démission d'un CDI",
          blocks: [
            {
              type: "callout",
              variant: "example",
              paragraphs: [
                "CDI, démission, préavis effectué jusqu'au 30 avril 2026. Salaire 2 400 € ; mois à 21 jours ouvrés ; 5 jours de congés non pris ; pas d'indemnité de licenciement ; avril non encore payé.",
              ],
            },
            {
              type: "table",
              caption: "Lignes brutes indicatives du reçu (exemple A)",
              headers: ["Ligne", "Montant brut"],
              numeric: true,
              rows: [
                ["Salaire d'avril 2026 (période travaillée)", "2 400,00 €"],
                ["ICCP méthode du maintien (2 400 × 5 / 21)", "571,43 €"],
                ["Total restant à payer (lignes ci-dessus)", "2 971,43 €"],
              ],
            },
            {
              type: "paragraph",
              text: "2 400 × 5 / 21 ≈ 571,43 € ; total 2 971,43 €. Le dixième n'est pas recalculé ici ; s'il était plus favorable, il devrait être retenu.",
            },
          ],
        },
        {
          id: "exemple-b-cdd",
          title: "Exemple B : fin de CDD avec prime de précarité",
          blocks: [
            {
              type: "callout",
              variant: "example",
              paragraphs: [
                "CDD du 1er novembre 2025 au 30 avril 2026. 2 200 € × 6 = 13 200 € ; cinq premiers mois déjà payés ; aucun congé pris ; précarité 10 % ; pas d'exception ni accord à 6 %.",
              ],
            },
            {
              type: "table",
              caption: "Lignes brutes indicatives du reçu (exemple B)",
              headers: ["Ligne", "Montant brut"],
              numeric: true,
              rows: [
                ["Salaire d'avril 2026 (reste à payer)", "2 200,00 €"],
                ["Prime de précarité (10 % × 13 200)", "1 320,00 €"],
                ["Congés (1/10e × (13 200 + 1 320))", "1 452,00 €"],
                ["Total restant à payer (lignes ci-dessus)", "4 972,00 €"],
              ],
            },
            {
              type: "paragraph",
              text: "Les 11 000 € déjà payés ne sont pas recomptés. 13 200 × 10 % = 1 320 ; (13 200 + 1 320) / 10 = 1 452 ; total 4 972. À 6 % avec formation, la prime serait 792 € et les congés à recalculer.",
            },
          ],
        },
        {
          id: "exemple-c-licenciement",
          title: "Exemple C : licenciement (hors faute grave)",
          blocks: [
            {
              type: "callout",
              variant: "example",
              paragraphs: [
                "CDI, licenciement hors faute grave/lourde. Dernier jour travaillé 30 avril 2026 ; salaire d'avril 2 800 € dû ; dispense employeur de préavis mai-juin ; ancienneté 5 ans à la fin du préavis ; salaire de référence 2 800 € ; 10 jours ouvrés de congés antérieurs non pris ; mois à 21 jours ; pas de convention plus favorable.",
                "Détail des périodes prises en compte : (1) salaire d'avril ; (2) ICP mai-juin ; (3) ICCP sur 10 jours antérieurs ; (4) congés afférents au préavis (L1234-5), ici 10 % de l'ICP, distincts de l'ICCP.",
              ],
            },
            {
              type: "table",
              caption: "Lignes brutes indicatives du reçu (exemple C)",
              headers: ["Ligne", "Période / base", "Montant brut"],
              stackOnMobile: true,
              numeric: true,
              rows: [
                ["Salaire restant dû", "Avril 2026 travaillé", "2 800,00 €"],
                [
                  "Indemnité compensatrice de préavis (salaires)",
                  "Mai + juin non travaillés (2 × 2 800)",
                  "5 600,00 €",
                ],
                [
                  "Congés afférents au préavis (L1234-5)",
                  "5 600 × 10 % (hypothèse pédagogique)",
                  "560,00 €",
                ],
                ["Indemnité légale de licenciement", "5 × (2 800 / 4)", "3 500,00 €"],
                [
                  "ICCP (congés antérieurs non pris)",
                  "2 800 × 10 / 21",
                  "1 333,33 €",
                ],
                ["Total restant à payer", "Somme des lignes", "13 793,33 €"],
              ],
            },
            {
              type: "paragraph",
              text: "5 × 700 = 3 500 ; 2 800 × 10 / 21 ≈ 1 333,33 ; 5 600 × 10 % = 560 ; total 13 793,33 € brut. Les 560 € (congés afférents au préavis) et les 1 333,33 € (congés antérieurs) ne se chevauchent pas. Le 10 % sur l'ICP est pédagogique ; un maintien peut s'appliquer. L'indemnité de licenciement peut avoir un régime social/fiscal particulier.",
            },
            {
              type: "callout",
              variant: "vigilance",
              paragraphs: [
                "Préavis travaillé : pas d'ICP ni de congés afférents, mais salaire et acquisition normale. Vérifiez qu'aucune ligne ne cumule déjà les congés afférents dans l'ICP ou l'ICCP.",
              ],
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Régime fiscal des indemnités :",
              label: "Service-Public F408",
              href: SP_F408,
            },
          ],
        },
      ],
    },
    {
      id: "delais-remise-paiement",
      title: "Quand reçoit-on le solde de tout compte et quand est-il payé ?",
      blocks: [
        {
          type: "paragraph",
          text: "Distinguez fin du contrat, dernier jour travaillé, remise du reçu, exigibilité des sommes et virement. Remise à la fin du contrat ; en cas de dispense de préavis, dès le départ effectif possible. Documents quérables. Aucun texte du Code du travail ne fixe un délai universel de paiement de 8, 15 ou 30 jours.",
        },
        {
          type: "list",
          items: [
            "Fin du contrat : souvent fin du préavis, même non effectué.",
            "Dernier jour travaillé : peut être antérieur en cas de dispense.",
            "Exigibilité : chaque somme suit ses règles ; pas de délai unique « solde ».",
            "Virement : souvent selon le calendrier de paie ; comparez net et bulletin.",
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Exemple chronologique fictif (pas une règle légale). Fin de contrat 30 juin 2026, documents remis le même jour. Le 10 juillet, une ICCP mentionnée n'apparaît pas sur le compte : vérifier documents et virement, contacter la paie, formaliser une réclamation (et dénoncer si reçu signé), puis prud'hommes si besoin.",
          ],
        },
      ],
    },
    {
      id: "faut-il-signer-le-recu",
      title: "Faut-il signer le reçu pour solde de tout compte ?",
      blocks: [
        {
          type: "paragraph",
          text: "Non. Le salarié n'est pas obligé de signer. Le refus n'est pas sanctionné et ne permet pas de retenir les sommes dues. Sans signature, pas d'effet libératoire L1234-20 ; cela n'empêche pas de prouver un paiement par d'autres moyens (virement, bulletin, quittance). Avec signature, dénonciation possible dans les six mois pour les sommes mentionnées ; passé ce délai, l'effet libératoire s'applique à ces seules sommes.",
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Vérifiez chaque ligne, conservez votre exemplaire et la date. Vous pouvez refuser de signer en attendant des corrections, tout en réclamant les sommes non contestées.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Modèle officiel :",
          label: "Reçu pour solde de tout compte (Code du travail numérique)",
          href: CDTN_MODELE_RECU,
        },
      ],
    },
    {
      id: "contester-et-reclamer",
      title: "Contester, réclamer et dénoncer un solde de tout compte",
      blocks: [
        {
          type: "paragraph",
          text: "Le délai de six mois ne s'applique qu'à la dénonciation du reçu signé pour les sommes qui y figurent (L1234-20). Il ne prolonge pas automatiquement les délais de prescription.",
        },
        {
          type: "paragraph",
          text: "Dénonciation en principe par lettre recommandée avec avis de réception (LRAR) (D1234-8). Pour une LRAR, la date d'expédition est en principe la référence utile (Cass. soc. 16 mai 2000, 96-43.218, rendue sous l'ancien délai de deux mois ; le délai actuel reste de six mois, L1234-20). Si une saisine du conseil de prud'hommes est invoquée comme dénonciation, la convocation doit avoir été reçue par l'employeur dans les six mois (Cass. soc. 7 mars 2018, 16-13.194). Une saisine n'équivaut pas automatiquement à une dénonciation utile. Après dénonciation régulière, l'action au fond reste soumise à la prescription de la créance (L1471-1 / L3245-1).",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "N'attendez pas la fin du délai. Envoyez la LRAR tôt, conservez preuve d'expédition, avis de réception et copie. Dénoncer le reçu et agir au fond sont deux étapes distinctes.",
          ],
        },
        {
          type: "table",
          caption: "Repères de délais (à qualifier selon votre demande)",
          headers: ["Situation", "Mécanisme", "Repère de délai", "Texte utile"],
          stackOnMobile: true,
          rows: [
            [
              "Reçu signé, somme mentionnée",
              "Dénonciation puis action",
              "6 mois pour dénoncer (LRAR : date d'envoi en principe)",
              "L1234-20, D1234-8",
            ],
            [
              "Reçu signé, somme absente",
              "Pas d'effet libératoire sur cette somme",
              "Prescription selon la nature de la créance",
              "L1471-1 / L3245-1",
            ],
            [
              "Reçu non signé",
              "Pas d'effet libératoire L1234-20",
              "Prescription selon la nature de la créance",
              "L1471-1 / L3245-1",
            ],
            [
              "Action relative à la rupture",
              "Ex. contestation liée à la rupture",
              "En principe 12 mois à compter de la notification de la rupture",
              "L1471-1",
            ],
            [
              "Action relative à l'exécution",
              "Ex. frais professionnels",
              "En principe 2 ans",
              "L1471-1",
            ],
            [
              "Action en paiement du salaire",
              "Ex. heures supplémentaires, salaire",
              "En principe 3 ans (L3245-1)",
              "L3245-1",
            ],
          ],
        },
      ],
      subsections: [
        {
          id: "demarche-si-faux-ou-impaye",
          title: "Que faire si le solde est faux ou impayé ?",
          blocks: [
            {
              type: "steps",
              items: [
                {
                  title: "Vérifier les documents",
                  description:
                    "Reçu, bulletin, certificat, attestation France Travail, convention le cas échéant.",
                },
                {
                  title: "Réunir les justificatifs",
                  description:
                    "Contrat, heures, congés, frais, échanges écrits.",
                },
                {
                  title: "Contacter la paie",
                  description: "Correction chiffrée et nouveau reçu si besoin.",
                },
                {
                  title: "Formaliser par écrit",
                  description:
                    "Réclamation ci-dessous ; si reçu signé, dénonciation formelle aussi.",
                },
                {
                  title: "Recours",
                  description: "Prud'hommes si le désaccord persiste.",
                },
              ],
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Démarche officielle :",
              label: "Saisir le conseil de prud'hommes",
              href: CDTN_PRUDHOMMES,
            },
            {
              type: "internal-link",
              variant: "calculator",
              intro: "Pour contrôler des heures :",
              label: "Calculateur d'heures supplémentaires",
              href: HEURES_SUP_HREF,
            },
          ],
        },
        {
          id: "modele-courrier-reclamation",
          title: "Modèle de courrier pour demander la correction d'un solde de tout compte",
          blocks: [
            {
              type: "callout",
              variant: "warning",
              paragraphs: [
                "Ce modèle de réclamation ne remplace pas la dénonciation formelle d'un reçu signé et n'interrompt pas à lui seul un délai de prescription.",
              ],
            },
            {
              type: "callout",
              variant: "example",
              paragraphs: [
                "Objet : Demande de vérification et de régularisation du solde de tout compte",
                "[Lieu], le [Date]",
                "Madame, Monsieur,",
                "Mon contrat avec [Entreprise] a pris fin le [Date]. Reçu remis le [Date] [signé / non signé].",
                "Après vérification, je constate une différence concernant [somme concernée] : le montant indiqué est de [montant] €, alors que le montant qui me paraît dû est de [montant] €, pour les raisons suivantes : [explication].",
                "Merci de régulariser et de me transmettre, le cas échéant, un bulletin et un reçu corrigés.",
                "Pièces : [Liste]. Cordialement, [Nom · Adresse · Coordonnées]",
              ],
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Dénonciation formelle d'un reçu signé :",
              label: "Modèle officiel de dénonciation (Code du travail numérique)",
              href: CDTN_DENONCIATION,
            },
          ],
        },
      ],
    },
    {
      id: "documents-fin-de-contrat",
      title: "Quels documents récupérer à la fin du contrat ?",
      blocks: [
        {
          type: "table",
          caption: "Documents de fin de contrat (secteur privé)",
          headers: ["Document", "Utilité", "Remise", "Points à vérifier"],
          stackOnMobile: true,
          rows: [
            [
              "Certificat de travail",
              "Atteste l'emploi et sa durée",
              "Tenu à disposition à la fin du contrat",
              "Dates d'entrée/sortie, emploi",
            ],
            [
              "Attestation France Travail",
              "Ouvre les droits à l'allocation chômage",
              "Remise au salarié (quérable) et transmission à France Travail (R1234-9)",
              "Motif, salaires ; ne confondez pas remise et transmission",
            ],
            [
              "Reçu pour solde de tout compte",
              "Inventaire des sommes versées",
              "Idem",
              "Lignes, totaux, date, signature éventuelle",
            ],
            [
              "Dernier bulletin de paie",
              "Détail de la dernière période",
              "Selon rythme habituel de paie",
              "Brut, cotisations, net versé",
            ],
            [
              "État récapitulatif d'épargne salariale",
              "Si PEE, PEI ou Perco dans l'entreprise",
              "À la rupture",
              "Avoirs, modalités de déblocage",
            ],
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Fiche officielle :",
          label: "Documents à remettre au salarié (Service-Public F21789)",
          href: SP_F21789,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Code du travail numérique :",
          label: "Article R1234-9 (attestation France Travail)",
          href: CDTN_R1234_9,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Lire le dernier bulletin :",
          label: "Guide fiche de paie",
          href: FICHE_PAIE_HREF,
        },
      ],
    },
    {
      id: "erreurs-frequentes-et-checklist",
      title: "Erreurs fréquentes et checklist finale",
      blocks: [
        {
          type: "paragraph",
          text: "Contrôles fréquents avant de conclure à une erreur :",
        },
        {
          type: "table",
          caption: "Erreurs fréquentes : vérifier avant de conclure",
          headers: ["Erreur constatée", "Pourquoi elle arrive", "Comment la vérifier", "Que faire"],
          stackOnMobile: true,
          rows: [
            [
              "Congés payés oubliés",
              "Solde de congés mal repris",
              "Compteur + bulletins + méthode ICCP",
              "Réclamation chiffrée",
            ],
            [
              "Prime de précarité absente",
              "Exception mal appliquée ou oubli",
              "Type de CDD, proposition de CDI, motif de fin",
              "Comparer avec L1243-8 et F803",
            ],
            [
              "Indemnité de licenciement insuffisante",
              "Ancienneté ou salaire de référence erronés",
              "Simulateur + convention collective",
              "Demander le détail du calcul",
            ],
            [
              "Mauvais calcul du préavis",
              "Confusion dispense / non-paiement",
              "Qui a demandé la dispense ? Durée due ?",
              "Relance écrite",
            ],
            [
              "Prime ou commission manquante",
              "Objectifs ou usage non repris",
              "Contrat, avenants, historiques",
              "Justificatifs + réclamation",
            ],
            [
              "Heures supplémentaires manquantes",
              "Relevés incomplets",
              "Planning, pointeuse, bulletins",
              "Calculateur heures + courrier",
            ],
            [
              "Retenue incomprise",
              "Avance, trop-perçu, mutuelle",
              "Nature exacte et plafond applicable",
              "Exiger le détail écrit",
            ],
            [
              "Trop-perçu contesté",
              "Erreur de paie antérieure",
              "Bulletins concernés + calcul",
              "Contester le montant ou l'échelonnement",
            ],
            [
              "Brut confondu avec net",
              "Lecture globale du reçu",
              "Séparer cotisations, PAS, frais",
              "Comparer avec le virement",
            ],
            [
              "Date de fin incorrecte",
              "Préavis / dispense mal datés",
              "Lettre de rupture, convention, bulletins",
              "Faire corriger les documents",
            ],
          ],
        },
        {
          type: "checklist",
          title: "Checklist finale avant signature ou réclamation",
          items: [
            "Identité, dates de contrat et date de fin cohérentes",
            "Dernière période de salaire contrôlée",
            "Heures, primes et avantages dus",
            "Congés acquis, pris et ICCP",
            "Préavis : effectué, dispensé par l'employeur, ou demandé par le salarié",
            "Indemnités de rupture selon le motif",
            "Frais et retenues identifiés",
            "Bruts et net versé distingués",
            "Certificat, attestation France Travail, dernier bulletin",
            "Double exemplaire du reçu ; date de signature éventuelle",
            "Délai de dénonciation (si signé) et prescription selon la créance",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: "Comment calculer son solde de tout compte ?",
      answer:
        "Contrôlez chaque ligne : salaire restant dû, heures et primes, congés non pris, préavis éventuel, indemnités selon le motif, frais et retenues. Il n'existe pas de formule brut-net unique pour tout le reçu.",
    },
    {
      question: "Est-il obligatoire de signer le reçu pour solde de tout compte ?",
      answer:
        "Non. La signature n'est pas obligatoire. Sans signature, pas d'effet libératoire (L1234-20). L'employeur ne peut pas retenir les sommes pour ce motif. Un paiement peut être prouvé autrement (virement, bulletin).",
    },
    {
      question: "Quel est le délai pour recevoir le solde de tout compte ?",
      answer:
        "Remise à la fin du contrat ; en cas de dispense de préavis, dès le départ effectif possible. Documents quérables, tenus à disposition dans l'entreprise.",
    },
    {
      question: "L'employeur peut-il payer plus tard ?",
      answer:
        "Aucun délai unique de 8, 15 ou 30 jours. Chaque somme suit ses règles d'exigibilité. En cas de retard : relance écrite, puis prud'hommes si besoin.",
    },
    {
      question: "Combien de temps pour contester après signature ?",
      answer:
        "Dénonciation sous six mois par LRAR (D1234-8) pour les sommes mentionnées. Date d'envoi en principe pour une LRAR ; saisine du conseil de prud'hommes (CPH) : convocation reçue dans le délai (Cass. soc. 7 mars 2018, 16-13.194). Puis prescription selon la créance (1, 2 ou 3 ans).",
    },
    {
      question: "Peut-on contester un reçu non signé ?",
      answer:
        "Oui. Sans effet libératoire, réclamez dans les délais de prescription : 1 an (rupture), 2 ans (exécution), 3 ans (salaire).",
    },
    {
      question: "A-t-on droit à des indemnités après une démission ?",
      answer:
        "Pas d'indemnité de licenciement automatique. Restent dus salaire, congés non pris et, selon les cas, ICP. Vérifiez contrat et convention.",
    },
    {
      question: "Les congés payés sont-ils toujours payés ?",
      answer:
        "Oui pour les congés acquis non pris, y compris en faute lourde. Le calcul dépend du contrat (CDI, CDD, intérim) et parfois d'une caisse de congés.",
    },
    {
      question: "Comment calculer la prime de précarité d'un CDD ?",
      answer:
        "Cas général : au moins 10 % de la rémunération brute totale, hors exceptions. Un accord applicable peut la limiter à 6 % avec formation (L1243-9).",
    },
    {
      question: "Que faire si le montant est incorrect ou impayé ?",
      answer:
        "Vérifiez les pièces, contactez la paie, formalisez une réclamation. Si le reçu est signé, dénoncez-le sous six mois. Sinon, saisissez les prud'hommes. Le refus de signer ne justifie pas un non-paiement.",
    },
    {
      question: "Le solde de tout compte est-il imposable ?",
      answer:
        "Certaines sommes du solde de tout compte sont imposables, tandis que d'autres peuvent bénéficier d'exonérations. Salaire, congés payés (ICCP) et préavis (ICP) : en principe imposables et cotisés. Prime de précarité et IFM : en principe imposables. Indemnités de licenciement et de rupture conventionnelle : régime spécifique, exonérations possibles sous conditions. Frais professionnels justifiés : régime distinct. Voir Service-Public F408.",
    },
    {
      question: "Le solde de tout compte comprend-il le dernier salaire ?",
      answer:
        "Oui, lorsqu'il reste dû : salaire du mois ou de la fraction non encore payée, outre congés et indemnités éventuelles.",
    },
  ],
  conclusion: {
    title: "À retenir",
    keyPoints: [
      "Contrôlez chaque ligne (salaire, congés, préavis, indemnités) sans coefficient net unique.",
      "Signature facultative : sans signature, pas d'effet libératoire.",
      "Reçu signé : dénonciation sous six mois pour les sommes mentionnées ; prescriptions distinctes ensuite.",
      "Conservez justificatifs, certificat, attestation France Travail et dernier bulletin.",
      "En cas d'erreur ou d'impayé : réclamation écrite, puis prud'hommes si besoin.",
    ],
    closingText:
      "Pour estimer une indemnité de licenciement (un poste du solde, pas le solde entier), utilisez le simulateur du site ou l'outil officiel du Code du travail numérique.",
    closingCta: {
      label: "Estimer une indemnité de licenciement",
      href: INDEMNITE_LICENCIEMENT_HREF,
    },
    furtherReading: {
      title: "Pour aller plus loin",
      items: [
        {
          title: "Comment lire une fiche de paie",
          description: "Repérer brut, cotisations et net sur le dernier bulletin.",
          href: FICHE_PAIE_HREF,
        },
        {
          title: "Salaire en intérim",
          description: "IFM et congés payés en fin de mission.",
          href: INTERIM_HREF,
        },
        {
          title: "Différence brut / net",
          description: "Comprendre cotisations et montant versé.",
          href: BRUT_NET_HREF,
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
        text: "Guide destiné au secteur privé. Sources : Code du travail (L1234-5, L1234-20, D1234-7, D1234-8, R1234-9, L1471-1, L3245-1, L1243-8, L1243-9, L1221-25, L1221-26, L3251-1 à L3251-3), Service-Public et Code du travail numérique. Sources officielles vérifiées le 23 octobre 2026. Les exemples sont pédagogiques et ne remplacent pas un calcul individualisé ni une convention plus favorable.",
      },
      {
        type: "paragraph",
        text: "Textes et informations officielles :",
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Solde de tout compte",
        href: CDTN_SOLDE,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article L1234-5 (indemnité compensatrice de préavis)",
        href: CDTN_L1234_5,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article L1234-20",
        href: CDTN_L1234_20,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Légifrance :",
        label: "Article L1234-20 (texte consolidé)",
        href: LEGI_L1234_20,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article D1234-8 (dénonciation par LRAR)",
        href: CDTN_D1234_8,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article R1234-9 (attestation France Travail)",
        href: CDTN_R1234_9,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Service-Public :",
        label: "Solde de tout compte (F86)",
        href: SP_F86,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Service-Public :",
        label: "Documents de fin de contrat (F21789)",
        href: SP_F21789,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Service-Public :",
        label: "Indemnité compensatrice de congés payés (F24661)",
        href: SP_F24661,
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
        intro: "Service-Public :",
        label: "Prime de précarité (F803)",
        href: SP_F803,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Service-Public :",
        label: "Fin d'un CDD et exceptions (F40)",
        href: SP_F40,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "BOSS :",
        label: "Indemnités de rupture (dont rupture conventionnelle)",
        href: BOSS_INDEMNITES_RUPTURE,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Service-Public :",
        label: "Rupture conventionnelle (F19030)",
        href: SP_F19030,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Service-Public Entreprendre :",
        label: "Indemnité spécifique de rupture conventionnelle (F31539)",
        href: SP_F31539,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Service-Public :",
        label: "Contrat d'intérim (F11215)",
        href: SP_F11215,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Service-Public :",
        label: "Régime fiscal des indemnités (F408)",
        href: SP_F408,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Service-Public :",
        label: "Indemnité de licenciement du salarié en CDI (F987)",
        href: SP_F987,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article L1471-1 (prescription)",
        href: CDTN_L1471_1,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article L3245-1 (paiement du salaire)",
        href: CDTN_L3245_1,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article L1243-9 (précarité à 6 %)",
        href: CDTN_L1243_9,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article L1221-25 (délai de prévenance)",
        href: CDTN_L1221_25,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Article L3251-3 (avances et retenues)",
        href: CDTN_L3251_3,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Service-Public :",
        label: "Période d'essai (F1643)",
        href: SP_F1643,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Service-Public :",
        label: "Paiement du salaire et trop-perçu (F2308)",
        href: SP_F2308,
      },
      {
        type: "paragraph",
        text: "Jurisprudence consultée (pourvois cités dans le guide) :",
      },
      {
        type: "paragraph",
        text: "Cass. soc. 16 mai 2000, 96-43.218 : date d'expédition de la LRAR (sous l'ancien délai de deux mois ; délai actuel : six mois, L1234-20). Cass. soc. 7 mars 2018, 16-13.194 : saisine CPH valant dénonciation si convocation reçue dans les six mois. Cass. soc. 16 septembre 2026, 25-12.609 et 25-14.826 : prescription de l'ICCP à compter de la rupture ; congés depuis 2009 sous réserve du report.",
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Légifrance :",
        label: "Cass. soc. 16 mai 2000, 96-43.218",
        href: CASS_2000_96_43218,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Légifrance :",
        label: "Cass. soc. 7 mars 2018, 16-13.194",
        href: CASS_2018_16_13194,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Légifrance :",
        label: "Cass. soc. 16 septembre 2026, 25-12.609",
        href: CASS_2026_25_12609,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Légifrance :",
        label: "Cass. soc. 16 septembre 2026, 25-14.826",
        href: CASS_2026_25_14826,
      },
      {
        type: "paragraph",
        text: "Outils et modèles officiels (outils pratiques, pas des textes juridiques) :",
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Modèle de reçu pour solde de tout compte",
        href: CDTN_MODELE_RECU,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Dénoncer un reçu pour solde de tout compte",
        href: CDTN_DENONCIATION,
      },
      {
        type: "internal-link",
        variant: "guide",
        intro: "Code du travail numérique :",
        label: "Saisir le conseil de prud'hommes",
        href: CDTN_PRUDHOMMES,
      },
      {
        type: "internal-link",
        variant: "simulator",
        intro: "Simulateurs officiels :",
        label: "Indemnité de licenciement",
        href: CDTN_SIM_LICENCIEMENT,
      },
      {
        type: "internal-link",
        variant: "simulator",
        intro: "Simulateurs officiels :",
        label: "Indemnité de rupture conventionnelle",
        href: CDTN_SIM_RUPTURE,
      },
      {
        type: "internal-link",
        variant: "simulator",
        intro: "Simulateurs officiels :",
        label: "Indemnité de précarité",
        href: CDTN_SIM_PRECARITE,
      },
    ],
  },
  sidebar: {
    calculator: {
      title: "Indemnité de licenciement",
      description: "Estimez l'indemnité légale minimale (un poste du solde, pas le solde entier).",
      href: INDEMNITE_LICENCIEMENT_HREF,
    },
    relatedGuides: [
      {
        title: "Comment lire une fiche de paie",
        href: FICHE_PAIE_HREF,
      },
      {
        title: "Salaire en intérim : IFM et congés payés",
        href: INTERIM_HREF,
      },
      {
        title: "Différence brut / net",
        href: BRUT_NET_HREF,
      },
    ],
    relatedSimulator: {
      title: "Calculateur Brut vers Net",
      description: "Estimez le net d'un salaire brut restant dû.",
      href: "/",
    },
  },
};
