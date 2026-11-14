import type { Guide } from "../types";
import {
  buildPrimeDeNoelBibliographySourceBlocks,
  CAF_HOME,
  FORFAIT_ASS_AER_GENERAL,
  FORFAIT_ASS_AER_MAYOTTE,
  formatEuro,
  FRANCE_TRAVAIL_HOME,
  FRANCE_TRAVAIL_PRIME,
  MSA_HOME,
  PRIME_DE_NOEL_BAREME_CAPTION,
  PRIME_DE_NOEL_BREADCRUMB,
  PRIME_DE_NOEL_CAF_RESERVE,
  PRIME_DE_NOEL_H1,
  PRIME_DE_NOEL_META_DESCRIPTION,
  PRIME_DE_NOEL_PATH,
  PRIME_DE_NOEL_PAYMENT_FROM_DEC_LABEL,
  PRIME_DE_NOEL_PAYMENT_FROM_NOV_LABEL,
  PRIME_DE_NOEL_PUBLISHED_AT,
  PRIME_DE_NOEL_SEO_TITLE,
  PRIME_DE_NOEL_SLUG,
  PRIME_DE_NOEL_SUBTITLE,
  PRIME_DE_NOEL_UPDATED_AT,
  PRIME_DE_NOEL_VERIFIED_ON_LABEL,
  RSA_TABLE_GENERAL_ROWS,
  RSA_TABLE_MAYOTTE_ROWS,
  ASSEMBLEE_AMENDEMENT_PLF_2026,
  SERVICE_PUBLIC_F1325,
  TF1_AFP_PRIME_2026_28_JANVIER,
} from "@/site/prime-de-noel/data";

const PRIME_ACTIVITE_HREF = "/prime-activite";
const SMIC_HREF = "/smic";
const CALCULATEUR_HREF = "/";
const GUIDES_HUB = "/guides";

export const primeDeNoelGuide: Guide = {
  slug: PRIME_DE_NOEL_SLUG,
  publicPath: PRIME_DE_NOEL_PATH,
  breadcrumbLabel: PRIME_DE_NOEL_BREADCRUMB,
  title: PRIME_DE_NOEL_H1,
  seoTitle: PRIME_DE_NOEL_SEO_TITLE,
  description: PRIME_DE_NOEL_META_DESCRIPTION,
  subtitle: PRIME_DE_NOEL_SUBTITLE,
  publishedAt: PRIME_DE_NOEL_PUBLISHED_AT,
  updatedAt: PRIME_DE_NOEL_UPDATED_AT,
  includeFaqSchema: true,
  faqSectionId: "questions-frequentes",
  introduction: [
    "La prime de Noël, officiellement appelée aide exceptionnelle de fin d'année, est un versement forfaitaire unique destiné aux foyers qui perçoivent certains minima sociaux, notamment le revenu de solidarité active (RSA), l'allocation de solidarité spécifique (ASS) ou l'allocation équivalent retraite (AER). Elle est en principe payée automatiquement par la CAF, la MSA ou France Travail, sans formulaire spécifique.",
    `Le 10 novembre 2026, la CAF a annoncé les montants, les bénéficiaires et le calendrier de versement de la prime de Noël 2026. ${PRIME_DE_NOEL_CAF_RESERVE}`,
  ],
  introSummary: {
    title: "L'essentiel à retenir",
    items: [
      "Bénéficiaires annoncés pour 2026 : foyers au RSA, à l'ASS ou à l'AER en novembre ou décembre 2026.",
      `Montants annoncés hors Mayotte : ${formatEuro(152.45)} pour une personne seule au RSA sans enfant (forfait ASS / AER identique).`,
      `Versement annoncé : à partir du ${PRIME_DE_NOEL_PAYMENT_FROM_NOV_LABEL} pour les droits de novembre, à partir de ${PRIME_DE_NOEL_PAYMENT_FROM_DEC_LABEL} si le droit débute en décembre.`,
      "Organismes payeurs : CAF ou MSA pour le RSA ; France Travail pour l'ASS et l'AER.",
      "Versement automatique, une fois par foyer, non imposable : tenez à jour votre RIB et votre situation familiale.",
    ],
  },
  sections: [
    {
      id: "montant-prime-de-noel-2026",
      title: "Quel est le montant de la prime de Noël en 2026 ?",
      blocks: [
        {
          type: "paragraph",
          text: "Pour les bénéficiaires du RSA hors Mayotte, le montant dépend de la composition du foyer. Ce n'est pas le montant du RSA mensuel : c'est une aide séparée, versée une seule fois. Les tableaux ci-dessous reprennent les montants annoncés par la CAF pour la campagne 2026.",
        },
        {
          type: "table",
          caption: `${PRIME_DE_NOEL_BAREME_CAPTION}. RSA hors Mayotte. Source : publication du 10 novembre 2026.`,
          headers: ["Enfants à charge", "Personne seule", "Couple"],
          rows: RSA_TABLE_GENERAL_ROWS,
          stackOnMobile: true,
          rowHeader: true,
          accent: "brand",
          numeric: true,
        },
        {
          type: "paragraph",
          text: `Pour l'ASS et l'AER hors Mayotte, la CAF annonce un montant forfaitaire de ${formatEuro(FORFAIT_ASS_AER_GENERAL)}. Le nombre d'enfants n'augmente pas ce forfait. L'organisme payeur est France Travail.`,
        },
        {
          type: "paragraph",
          text: "Pour cinq enfants, le montant est calculé à partir du barème CAF et de la majoration de 60,98 € par enfant supplémentaire.",
        },
        {
          type: "paragraph",
          text: "Un parent isolé bénéficiaire du RSA relève du barème « personne seule » avec enfants. Ce barème de la prime de Noël ne se confond ni avec le RSA majoré pour isolement, ni avec la majoration d'isolement de la prime d'activité : chaque dispositif a ses propres règles.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Exemple 1 : personne seule au RSA, sans enfant, hors Mayotte : ${formatEuro(152.45)}.`,
            `Exemple 2 : couple au RSA, deux enfants, hors Mayotte : ${formatEuro(320.15)}.`,
            `Exemple 3 : parent seul au RSA, trois enfants, hors Mayotte : ${formatEuro(335.39)}.`,
            `Exemple 4 : bénéficiaire de l'ASS hors Mayotte : ${formatEuro(152.45)}, quel que soit le nombre d'enfants.`,
          ],
        },
      ],
    },
    {
      id: "qui-a-droit-prime-de-noel",
      title: "Qui a droit à la prime de Noël ?",
      blocks: [
        {
          type: "paragraph",
          text: "Pour la campagne 2026, la CAF annonce que la prime concerne les foyers ayant droit au RSA, à l'ASS ou à l'AER au titre de novembre 2026 ou, à défaut, de décembre 2026. Les bénéficiaires de la seule prime d'activité, de la seule allocation aux adultes handicapés (AAH) ou de la seule allocation d'aide au retour à l'emploi (ARE) ne sont pas visés par cette annonce.",
        },
        {
          type: "paragraph",
          text: "La prime forfaitaire pour reprise d'activité est un dispositif ancien, distinct de la prime d'activité actuelle. Elle figurait dans les décrets de campagnes antérieures pour d'éventuels droits résiduels, mais la publication CAF du 10 novembre 2026 ne la cite pas. Sa reconduction pour 2026 reste à confirmer par le décret.",
        },
        {
          type: "paragraph",
          text: "L'allocation équivalent retraite (AER) est une ancienne allocation, encore applicable dans certaines situations résiduelles. Elle ne concerne pas tous les retraités.",
        },
        {
          type: "table",
          caption: "Bénéficiaires annoncés par la CAF pour 2026.",
          headers: ["Situation", "Droit possible", "Condition essentielle"],
          rows: [
            [
              "RSA (CAF ou MSA)",
              "Oui, sous conditions",
              "Percevoir le RSA au titre de novembre ou décembre 2026.",
            ],
            [
              "ASS (France Travail)",
              "Oui, sous conditions",
              "Percevoir l'ASS au titre de novembre ou décembre 2026.",
            ],
            [
              "AER (France Travail)",
              "Oui, sous conditions",
              "Droit à l'AER au titre de novembre ou décembre 2026 (Mayotte : voir section Mayotte)",
            ],
            [
              "Prime d'activité seule",
              "Non au titre de cette prestation",
              "La seule prime d'activité n'ouvre pas droit",
            ],
            [
              "AAH seule",
              "Non au titre de cette prestation",
              "La seule AAH n'ouvre pas droit",
            ],
            [
              "ARE seule",
              "Non au titre de cette prestation",
              "L'allocation chômage classique ne suffit pas à elle seule",
            ],
          ],
          stackOnMobile: true,
          rowHeader: true,
          accent: "brand",
        },
        {
          type: "list",
          items: [
            "Période de référence annoncée : novembre 2026, ou décembre 2026 à défaut.",
            `Si le droit ne débute qu'en décembre 2026, la CAF indique un versement à partir de ${PRIME_DE_NOEL_PAYMENT_FROM_DEC_LABEL}.`,
            "Être inscrit à France Travail ne suffit pas : il faut une allocation éligible.",
            "Une seule aide est due par foyer, même si plusieurs prestations sont perçues.",
          ],
        },
      ],
      subsections: [
        {
          id: "prime-de-noel-2026-foyers-sans-enfant",
          title:
            "Prime de Noël 2026 : les foyers sans enfant sont-ils concernés ?",
          blocks: [
            {
              type: "paragraph",
              text: `Oui. Le tableau publié par la CAF comprend les personnes seules et les couples sans enfant. Hors Mayotte, le montant annoncé pour les bénéficiaires du RSA est de ${formatEuro(152.45)} pour une personne seule sans enfant et de ${formatEuro(228.68)} pour un couple sans enfant. Il faut toutefois percevoir une allocation ouvrant droit à cette aide : l'absence d'enfant ne suffit pas, à elle seule, à bénéficier de la prime.`,
            },
            {
              type: "paragraph",
              text: "Le projet de budget 2026 avait envisagé de réserver la prime aux foyers avec enfant ; le 28 janvier 2026, le gouvernement avait annoncé renoncer à cette restriction.",
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Contexte budgétaire (Assemblée nationale) :",
              label: "amendement n° II-3362 au PLF 2026",
              href: ASSEMBLEE_AMENDEMENT_PLF_2026,
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Annonce du 28 janvier 2026 (TF1 Info / AFP) :",
              label: "prime de Noël 2026 conservée pour tous les bénéficiaires",
              href: TF1_AFP_PRIME_2026_28_JANVIER,
            },
          ],
        },
      ],
    },
    {
      id: "date-versement-prime-de-noel",
      title: "Quand la prime de Noël est-elle versée ?",
      blocks: [
        {
          type: "paragraph",
          text: `Pour la campagne 2026, la CAF annonce un versement à partir du ${PRIME_DE_NOEL_PAYMENT_FROM_NOV_LABEL} pour les foyers qui ont droit au RSA, à l'ASS ou à l'AER au mois de novembre 2026. Si le droit ne débute qu'en décembre 2026, le paiement est annoncé à partir de ${PRIME_DE_NOEL_PAYMENT_FROM_DEC_LABEL}.`,
        },
        {
          type: "paragraph",
          text: "La date de mise en paiement n'est pas toujours celle du crédit visible sur le compte. Les délais bancaires varient selon l'établissement.",
        },
        {
          type: "list",
          items: [
            "CAF et MSA pour les foyers au RSA.",
            "France Travail pour l'ASS et l'AER.",
            "En cas d'absence de paiement, vérifiez d'abord l'éligibilité et l'espace personnel, avant de conclure à une erreur.",
          ],
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "Le calendrier mensuel habituel des prestations CAF n'est pas celui de la prime de Noël. La date de cette aide est fixée chaque année par les textes et communications de campagne.",
          ],
        },
      ],
    },
    {
      id: "qui-verse-prime-de-noel",
      title: "Qui verse la prime de Noël : CAF, MSA ou France Travail ?",
      blocks: [
        {
          type: "paragraph",
          text: "L'organisme payeur dépend de l'allocation éligible (RSA, ASS ou AER), pas du seul fait d'être allocataire ou demandeur d'emploi.",
        },
        {
          type: "table",
          caption:
            "Organismes payeurs annoncés pour 2026 (RSA, ASS, AER).",
          headers: ["Situation", "Organisme", "Démarche habituelle"],
          rows: [
            ["RSA régime général", "CAF", "Versement automatique"],
            ["RSA régime agricole", "MSA", "Versement automatique"],
            ["ASS", "France Travail", "Versement automatique"],
            ["AER", "France Travail", "Versement automatique"],
          ],
          stackOnMobile: true,
          rowHeader: true,
          accent: "brand",
        },
        {
          type: "paragraph",
          text: "Maintenez à jour votre RIB, votre adresse et votre composition familiale. Consultez les paiements dans votre espace personnel.",
        },
      ],
    },
    {
      id: "cas-particuliers-prime-de-noel",
      title: "Prime de Noël : RSA, prime d'activité, AAH et chômage",
      blocks: [
        {
          type: "paragraph",
          text: "Les prestations sociales ne s'équivalent pas. Une aide peut être perçue sans ouvrir droit à la prime de Noël.",
        },
      ],
      subsections: [
        {
          id: "prime-de-noel-et-prime-activite",
          title: "Prime de Noël et prime d'activité",
          blocks: [
            {
              type: "paragraph",
              text: "La prime d'activité seule n'ouvre pas droit à la prime de Noël. Un foyer peut toutefois être concerné s'il perçoit aussi une allocation éligible (RSA, ASS ou AER), avec un droit au mois de référence.",
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Pour les conditions et montants forfaitaires de la prime d'activité :",
              label: "conditions de la prime d'activité",
              href: PRIME_ACTIVITE_HREF,
            },
          ],
        },
        {
          id: "prime-de-noel-et-aah",
          title: "Prime de Noël et AAH",
          blocks: [
            {
              type: "paragraph",
              text: "L'AAH seule n'ouvre pas droit à la prime de Noël. Un foyer peut toutefois être concerné s'il remplit les conditions d'une autre allocation éligible.",
            },
          ],
        },
        {
          id: "prime-de-noel-et-are",
          title: "Prime de Noël et ARE",
          blocks: [
            {
              type: "paragraph",
              text: "Percevoir l'allocation d'aide au retour à l'emploi (ARE) ne suffit pas. France Travail verse la prime au titre de l'ASS ou de l'AER, pas au simple titre de l'ARE.",
            },
          ],
        },
        {
          id: "prime-de-noel-et-ass",
          title: "Prime de Noël et ASS",
          blocks: [
            {
              type: "paragraph",
              text: `Pour l'ASS, la CAF annonce un montant forfaitaire (${formatEuro(FORFAIT_ASS_AER_GENERAL)} hors Mayotte, ${formatEuro(FORFAIT_ASS_AER_MAYOTTE)} à Mayotte), indépendamment du nombre d'enfants. Le paiement est automatique via France Travail.`,
            },
          ],
        },
        {
          id: "prime-de-noel-et-retraite",
          title: "Prime de Noël et retraite",
          blocks: [
            {
              type: "paragraph",
              text: "Une pension de retraite ne donne pas, à elle seule, droit à la prime de Noël. L'AER, une ancienne allocation distincte d'une pension de retraite, figure parmi les prestations mentionnées par la CAF.",
            },
          ],
        },
        {
          id: "prime-de-noel-et-travail",
          title: "Prime de Noël et activité professionnelle",
          blocks: [
            {
              type: "paragraph",
              text: "Le fait de travailler n'exclut pas automatiquement le foyer. Pour bénéficier de la prime de Noël, il faut percevoir une allocation ouvrant droit à cette aide au titre de novembre ou décembre 2026.",
            },
          ],
        },
      ],
    },
    {
      id: "montant-prime-de-noel-mayotte",
      title: "Quel est le montant de la prime de Noël à Mayotte ?",
      blocks: [
        {
          type: "paragraph",
          text: "À Mayotte, les montants de la prime de Noël sont différents de ceux appliqués en métropole et dans les autres départements d'outre-mer.",
        },
        {
          type: "table",
          caption: `${PRIME_DE_NOEL_BAREME_CAPTION}. RSA à Mayotte. Source : publication du 10 novembre 2026.`,
          headers: ["Enfants à charge", "Personne seule", "Couple"],
          rows: RSA_TABLE_MAYOTTE_ROWS,
          stackOnMobile: true,
          rowHeader: true,
          accent: "brand",
          numeric: true,
        },
        {
          type: "paragraph",
          text: `Pour l'ASS et l'AER à Mayotte, la CAF annonce un forfait de ${formatEuro(FORFAIT_ASS_AER_MAYOTTE)}, indépendamment du nombre d'enfants. Pour toute question sur votre situation personnelle, contactez France Travail.`,
        },
        {
          type: "paragraph",
          text: "Pour la Guadeloupe, la Martinique, la Guyane et La Réunion, la CAF applique le tableau général hors Mayotte.",
        },
      ],
    },
    {
      id: "ou-verifier-droits-prime-de-noel",
      title: "Où vérifier ses droits à la prime de Noël ?",
      blocks: [
        {
          type: "paragraph",
          text: "Les droits et les paiements dépendent de votre situation administrative. Seuls les organismes compétents disposent de votre dossier et peuvent confirmer un versement.",
        },
        {
          type: "paragraph",
          text: "Orientez-vous selon l'allocation concernée, puis consultez votre espace personnel ou contactez l'organisme payeur.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "CAF : pour les bénéficiaires du RSA relevant de la CAF.",
          label: "Site de la CAF",
          href: CAF_HOME,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "MSA : pour les bénéficiaires du RSA relevant du régime agricole.",
          label: "Site de la MSA",
          href: MSA_HOME,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro:
            "France Travail : pour les bénéficiaires des allocations concernées, notamment l'ASS et l'AER.",
          label: "Site de France Travail",
          href: FRANCE_TRAVAIL_HOME,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro:
            "France Travail : page sur l'aide de fin d'année (rédigée pour la campagne 2025, non actualisée aux dates 2026) :",
          label: "Aide exceptionnelle de fin d'année",
          href: FRANCE_TRAVAIL_PRIME,
        },
      ],
    },
    {
      id: "demarches-et-absence-versement",
      title: "Comment recevoir la prime de Noël et que faire si elle n'arrive pas ?",
      blocks: [
        {
          type: "paragraph",
          text: "Aucune demande spécifique n'est en principe nécessaire : le paiement suit les fichiers des organismes. L'absence de versement n'est pas toujours une erreur.",
        },
        {
          type: "checklist",
          title: "Vérifications utiles",
          items: [
            "Confirmer que vous relevez d'une allocation ouvrant droit.",
            "Vérifier le mois de référence (novembre ou décembre 2026).",
            "Contrôler RIB, adresse et composition familiale.",
            "Consulter l'historique des paiements CAF, MSA ou France Travail.",
            `Pour un droit ouvert en décembre 2026, tenir compte d'un éventuel paiement à partir de ${PRIME_DE_NOEL_PAYMENT_FROM_DEC_LABEL}.`,
            "Contacter l'organisme compétent seulement après ces contrôles.",
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Ne transmettez aucune donnée personnelle à ce site. Les démarches se font exclusivement auprès de votre caisse ou de France Travail.",
          ],
        },
      ],
    },
    {
      id: "fiscalite-et-cumul",
      title: "La prime de Noël est-elle imposable ou cumulable avec d'autres aides ?",
      blocks: [
        {
          type: "paragraph",
          text: "La prime de Noël n'est pas imposable : vous n'avez pas à la déclarer à l'impôt sur le revenu, comme le précise la CAF.",
        },
        {
          type: "paragraph",
          text: "Une seule aide est due par foyer. Percevoir plusieurs prestations n'ouvre pas automatiquement plusieurs primes.",
        },
        {
          type: "paragraph",
          text: "Le versement de la prime de Noël ne permet pas, à lui seul, de déterminer vos droits aux autres prestations. Pour connaître les règles de cumul applicables à votre situation, consultez votre CAF, votre MSA ou France Travail.",
        },
      ],
    },
  ],
  faqTitle: "Questions fréquentes",
  faqIntro: `Réponses courtes fondées sur l'annonce CAF du 10 novembre 2026, vérifiée le ${PRIME_DE_NOEL_VERIFIED_ON_LABEL}.`,
  faq: [
    {
      question: "Qui aura droit à la prime de Noël en 2026 ?",
      answer:
        "Selon la CAF, les foyers percevant le RSA, l'ASS ou l'AER en novembre ou décembre 2026 sont concernés.",
    },
    {
      question: "Quel sera le montant de la prime de Noël en 2026 ?",
      answer:
        `Hors Mayotte : ${formatEuro(152.45)} pour une personne seule au RSA sans enfant, ${formatEuro(228.68)} pour un couple au RSA sans enfant, et ${formatEuro(152.45)} au titre de l'ASS ou de l'AER (forfait). À Mayotte, le forfait ASS / AER annoncé est de ${formatEuro(FORFAIT_ASS_AER_MAYOTTE)}. Les autres montants RSA figurent dans les tableaux de cette page.`,
    },
    {
      question: "Quand sera versée la prime de Noël 2026 ?",
      answer:
        `Versement annoncé à partir du ${PRIME_DE_NOEL_PAYMENT_FROM_NOV_LABEL} pour les droits de novembre 2026, et à partir de ${PRIME_DE_NOEL_PAYMENT_FROM_DEC_LABEL} lorsque le droit débute en décembre 2026. La date de crédit sur le compte peut varier selon la banque.`,
    },
    {
      question: "Peut-on toucher la prime de Noël avec la prime d'activité ?",
      answer:
        "La prime d'activité seule n'ouvre pas droit à la prime de Noël. Un foyer peut être concerné s'il perçoit aussi une allocation éligible (RSA, ASS ou AER), avec un droit au mois de référence.",
    },
    {
      question: "Les bénéficiaires de l'AAH ont-ils droit à la prime de Noël ?",
      answer:
        "L'AAH seule n'ouvre pas droit. Un foyer peut toutefois être concerné s'il remplit les conditions d'une autre allocation éligible annoncée par la CAF.",
    },
    {
      question: "Les chômeurs peuvent-ils recevoir la prime de Noël ?",
      answer:
        "Pas au seul titre de l'ARE. France Travail verse la prime pour l'ASS ou l'AER lorsque les conditions de droit sont remplies.",
    },
    {
      question: "Pourquoi n'ai-je pas reçu ma prime de Noël ?",
      answer:
        `Le versement est annoncé à partir du ${PRIME_DE_NOEL_PAYMENT_FROM_NOV_LABEL} pour les droits de novembre. Si votre droit débute en décembre, le paiement est annoncé à partir de ${PRIME_DE_NOEL_PAYMENT_FROM_DEC_LABEL}. Avant ces dates, l'absence de crédit sur votre compte n'est pas nécessairement une anomalie. Sinon, vérifiez l'allocation concernée, la période de référence, vos coordonnées bancaires, l'espace personnel de votre organisme et un éventuel délai bancaire, puis contactez l'organisme compétent.`,
    },
    {
      question: "La prime de Noël est-elle imposable ?",
      answer:
        "Non. Elle n'est pas imposable et ne se déclare pas à l'impôt sur le revenu, selon la CAF.",
    },
    {
      question: "La prime de Noël est-elle versée par personne ou par foyer ?",
      answer:
        "Par foyer, une seule fois. Mayotte dispose d'un barème distinct : voir la section dédiée.",
    },
  ],
  conclusion: {
    title: "À retenir",
    keyPoints: [
      "Pour 2026, la CAF annonce RSA, ASS et AER comme allocations ouvrant droit. Le montant dépend de l'allocation perçue, de la composition du foyer pour le RSA et du lieu de résidence.",
      `Le versement est annoncé à partir du ${PRIME_DE_NOEL_PAYMENT_FROM_NOV_LABEL} pour les droits de novembre, et à partir de ${PRIME_DE_NOEL_PAYMENT_FROM_DEC_LABEL} lorsque le droit débute en décembre.`,
      "CAF ou MSA pour le RSA, France Travail pour l'ASS et l'AER : paiement automatique, sans demande en principe.",
      "Les sources institutionnelles et l'historique des campagnes sont listés en fin d'article.",
    ],
    closingText:
      "Cette page sera actualisée dès parution du décret 2026 ou en cas de nouvelle communication officielle modifiant l'annonce CAF du 10 novembre 2026.",
    furtherReading: {
      title: "Pour aller plus loin",
      items: [
        {
          title: "Prime d'activité",
          description: "Conditions, forfaits et plafond de ressources.",
          href: PRIME_ACTIVITE_HREF,
        },
        {
          title: "SMIC : montants officiels",
          description: "Barème horaire et mensuel actuellement applicable.",
          href: SMIC_HREF,
        },
        {
          title: "Calculateur brut vers net",
          description: "Estimer un salaire net, distinct de la prime de Noël.",
          href: CALCULATEUR_HREF,
        },
        {
          title: "Tous les guides",
          description: "Salaire, aides et lecture de la fiche de paie.",
          href: GUIDES_HUB,
        },
      ],
    },
  },
  bibliography: {
    id: "sources-officielles",
    title: "Sources officielles et méthodologie",
    blocks: [
      {
        type: "paragraph",
        text: `Informations vérifiées le ${PRIME_DE_NOEL_VERIFIED_ON_LABEL}. Source principale : publication CAF du 10 novembre 2026, présentée sous réserve du décret.`,
      },
      {
        type: "paragraph",
        text: "Méthode : les montants RSA (0 à 4 enfants, majoration par enfant supplémentaire) et les forfaits ASS / AER reprennent l'annonce CAF 2026. La ligne « 5 enfants » du tableau métropolitain applique la majoration de 60,98 € au montant pour quatre enfants. Une seule aide est due par foyer.",
      },
      {
        type: "paragraph",
        text: "Pour la campagne 2025, l'attribution de la prime aux bénéficiaires du RSA supposait qu'un montant de RSA non nul soit dû au titre du mois de référence. Le décret n° 2025-1212 prévoyait aussi, le cas échéant, un complément différentiel lorsque le montant dû au titre du RSA dépassait l'aide déjà versée au titre de l'ASS ou de l'AER (article 5). Ces règles sont indiquées à titre historique : elles ne préjugent pas du texte de la campagne 2026.",
      },
      {
        type: "paragraph",
        text: "Pour Mayotte, l'article 1 du décret de 2025 énumérait l'ASS et la prime forfaitaire pour reprise d'activité. La publication CAF de 2026 mentionne l'ASS et l'AER ; le texte réglementaire de la campagne 2026 devra préciser ce périmètre.",
      },
      ...buildPrimeDeNoelBibliographySourceBlocks(),
      {
        type: "callout",
        variant: "legal",
        paragraphs: [
          "Cette page est informative. Elle ne remplace pas une notification CAF, MSA ou France Travail. En cas d'écart entre sources, le décret applicable et l'organisme payeur priment.",
        ],
      },
    ],
  },
  sidebar: {
    calculator: {
      title: "Calculateur brut vers net",
      description:
        "Estimez un salaire net à partir d'un brut. Outil distinct de la prime de Noël.",
      href: CALCULATEUR_HREF,
    },
    relatedGuides: [
      { title: "Prime d'activité", href: PRIME_ACTIVITE_HREF },
      { title: "SMIC : montants officiels", href: SMIC_HREF },
      { title: "Tous les guides", href: GUIDES_HUB },
    ],
    discover: [
      {
        title: "Service-Public : prime de Noël",
        href: SERVICE_PUBLIC_F1325,
      },
      {
        title: "France Travail : aide de fin d'année",
        href: FRANCE_TRAVAIL_PRIME,
      },
    ],
  },
};
