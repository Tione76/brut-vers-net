import type { Guide } from "../types";
import {
  CAF_HOME,
  FORFAIT_ASS_AER_GENERAL,
  FORFAIT_ASS_AER_MAYOTTE,
  formatEuro,
  FRANCE_TRAVAIL_HOME,
  FRANCE_TRAVAIL_PRIME,
  LEGIFRANCE_2025_1212,
  LEGIFRANCE_2025_1213,
  MSA_HOME,
  PRIME_DE_NOEL_BAREME_CAPTION,
  PRIME_DE_NOEL_BREADCRUMB,
  PRIME_DE_NOEL_H1,
  PRIME_DE_NOEL_META_DESCRIPTION,
  PRIME_DE_NOEL_PATH,
  PRIME_DE_NOEL_PAYMENT_DATE_2025_LABEL,
  PRIME_DE_NOEL_PUBLISHED_AT,
  PRIME_DE_NOEL_SEO_TITLE,
  PRIME_DE_NOEL_SLUG,
  PRIME_DE_NOEL_STATUS_NOTICE,
  PRIME_DE_NOEL_SUBTITLE,
  PRIME_DE_NOEL_UPDATED_AT,
  PRIME_DE_NOEL_VERIFIED_ON_LABEL,
  RSA_TABLE_GENERAL_ROWS,
  RSA_TABLE_MAYOTTE_ROWS,
  ASSEMBLEE_AMENDEMENT_PLF_2026,
  SERVICE_PUBLIC_A14502,
  SERVICE_PUBLIC_F1325,
  SOURCES,
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
    PRIME_DE_NOEL_STATUS_NOTICE,
    `Vérification documentaire : ${PRIME_DE_NOEL_VERIFIED_ON_LABEL}, à partir des textes et pages officielles listés en fin d'article.`,
  ],
  introSummary: {
    title: "L'essentiel à retenir",
    items: [
      "Bénéficiaires selon les dernières règles officielles (2025) : foyers au RSA, à l'ASS, à l'AER ou à la prime forfaitaire pour reprise d'activité, avec un droit au mois de référence.",
      `Montant de référence hors Mayotte : ${formatEuro(152.45)} pour une personne seule au RSA sans enfant (forfait ASS / AER identique).`,
      "Calendrier 2026 : aucune date de versement officielle n'a encore été publiée.",
      "Organismes payeurs : CAF ou MSA pour le RSA ; France Travail pour l'ASS, l'AER et la prime forfaitaire.",
      "Versement automatique : aucune demande spécifique en principe ; tenez à jour votre RIB et votre situation familiale.",
    ],
  },
  sections: [
    {
      id: "montant-prime-de-noel-2026",
      title: "Quel est le montant de la prime de Noël en 2026 ?",
      blocks: [
        {
          type: "paragraph",
          text: "Pour les bénéficiaires du RSA hors Mayotte, le montant dépendait de la composition du foyer. Ce n'est pas le montant du RSA mensuel : c'est une aide séparée, versée une seule fois. Les tableaux ci-dessous reprennent le barème 2025, dernière référence officielle disponible.",
        },
        {
          type: "table",
          caption: `${PRIME_DE_NOEL_BAREME_CAPTION}. RSA hors Mayotte. Sources : Service-Public F1325, actualité Service-Public A14502 et décret n° 2025-1212.`,
          headers: ["Enfants à charge", "Personne seule", "Couple"],
          rows: RSA_TABLE_GENERAL_ROWS,
          stackOnMobile: true,
          rowHeader: true,
          accent: "brand",
          numeric: true,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Barème et conditions détaillés :",
          label: "fiche Service-Public F1325",
          href: SERVICE_PUBLIC_F1325,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Tableau officiel jusqu'à cinq enfants :",
          label: "actualité Service-Public A14502",
          href: SERVICE_PUBLIC_A14502,
        },
        {
          type: "paragraph",
          text: `Pour l'ASS, l'AER et la prime forfaitaire pour reprise d'activité hors Mayotte, le montant 2025 était forfaitaire : ${formatEuro(FORFAIT_ASS_AER_GENERAL)}. Le nombre d'enfants n'augmentait pas ce forfait. L'organisme payeur était France Travail.`,
        },
        {
          type: "paragraph",
          text: "Un parent isolé bénéficiaire du RSA relevait du barème « personne seule » avec enfants. Ce barème de la prime de Noël ne se confond ni avec le RSA majoré pour isolement, ni avec la majoration d'isolement de la prime d'activité : chaque dispositif a ses propres règles.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Exemple 1 (barème 2025) : personne seule au RSA, sans enfant, hors Mayotte : ${formatEuro(152.45)}.`,
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
          text: "En 2025, la prime de Noël était destinée aux foyers ayant droit au RSA, à l'ASS, à l'AER ou à la prime forfaitaire pour reprise d'activité au titre de novembre 2025 ou, à défaut, de décembre 2025. Les bénéficiaires de la seule prime d'activité, de la seule allocation aux adultes handicapés (AAH) ou de la seule allocation d'aide au retour à l'emploi (ARE) n'y avaient pas droit.",
        },
        {
          type: "paragraph",
          text: "La prime forfaitaire pour reprise d'activité est un dispositif ancien, distinct de la prime d'activité actuelle. Elle restait citée par le décret 2025 pour d'éventuels droits résiduels. Un salarié qui reprend un emploi aujourd'hui ne demande pas automatiquement cette prestation.",
        },
        {
          type: "paragraph",
          text: "L'allocation équivalent retraite (AER) est une ancienne allocation, encore applicable dans certaines situations résiduelles. Elle ne concerne pas tous les retraités.",
        },
        {
          type: "table",
          caption:
            "Situations de référence 2025. Un droit possible suppose aussi la période et les conditions du décret applicable.",
          headers: ["Situation", "Droit possible", "Condition essentielle"],
          rows: [
            [
              "RSA (CAF ou MSA)",
              "Oui, sous conditions",
              "Droit au RSA en novembre ou, à défaut, en décembre 2025, avec un montant dû non nul",
            ],
            [
              "ASS (France Travail)",
              "Oui, sous conditions",
              "Droit à l'ASS au titre de novembre ou décembre 2025, sauf si la prime a déjà été versée au titre du RSA",
            ],
            [
              "AER (France Travail)",
              "Oui, sous conditions",
              "Droit à l'AER au titre de novembre ou décembre 2025 (hors Mayotte : voir section Mayotte)",
            ],
            [
              "Prime forfaitaire pour reprise d'activité",
              "Oui, sous conditions",
              "Droit résiduel à cette ancienne prime au titre de novembre ou décembre 2025",
            ],
            [
              "Prime d'activité seule",
              "Non au titre de cette prestation",
              "Pas d'ouverture de droit 2025 par la seule prime d'activité",
            ],
            [
              "AAH seule",
              "Non au titre de cette prestation",
              "Pas d'ouverture de droit 2025 par la seule AAH",
            ],
            [
              "ARE seule",
              "Non au titre de cette prestation",
              "L'allocation chômage classique ne suffisait pas à elle seule",
            ],
          ],
          stackOnMobile: true,
          rowHeader: true,
          accent: "brand",
        },
        {
          type: "list",
          items: [
            "En 2025, le texte retenait un droit au titre de novembre ou, à défaut, de décembre.",
            "Si le droit commençait seulement en décembre 2025, Service-Public indiquait un versement à partir de janvier 2026 (toujours au titre de la campagne 2025).",
            "Être inscrit comme bénéficiaire du RSA ne suffisait pas toujours : si aucun montant de RSA n'était dû pour la période de référence, le foyer ne remplissait pas la condition du décret 2025-1212 (article 3).",
            "Être inscrit à France Travail ne suffisait pas : il fallait une allocation éligible.",
            "Une seule aide était due par foyer, même si plusieurs prestations étaient perçues.",
            "Deux membres du même foyer n'ouvraient pas droit à deux primes distinctes au titre du même foyer.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Texte réglementaire hors Mayotte :",
          label: "décret n° 2025-1212",
          href: LEGIFRANCE_2025_1212,
        },
      ],
      subsections: [
        {
          id: "prime-de-noel-2026-foyers-sans-enfant",
          title:
            "Prime de Noël 2026 : les personnes sans enfant resteront-elles concernées ?",
          blocks: [
            {
              type: "paragraph",
              text: "Le projet de budget 2026 avait envisagé de réserver la prime de Noël aux foyers ayant au moins un enfant à charge. Le 28 janvier 2026, le gouvernement a annoncé renoncer à cette restriction et maintenir le dispositif pour les bénéficiaires habituels, y compris les personnes sans enfant.",
            },
            {
              type: "paragraph",
              text: "Cette annonce ne constitue toutefois pas le barème officiel de la campagne de Noël 2026. Les montants, les modalités définitives et le calendrier de versement restent à confirmer par les textes et communications officiels. L'éligibilité dépend toujours des prestations perçues (RSA, ASS, AER ou prime forfaitaire) et des conditions réglementaires applicables.",
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
          text: `Pour la campagne 2025, Service-Public indiquait un versement à partir du ${PRIME_DE_NOEL_PAYMENT_DATE_2025_LABEL} pour les personnes qui avaient droit au RSA, à l'ASS ou à l'AER au mois de novembre 2025. Pour un droit ouvert en décembre 2025, le paiement pouvait intervenir à partir de janvier 2026 : il s'agit toujours de la campagne 2025, pas de celle de 2026.`,
        },
        {
          type: "paragraph",
          text: "La date de mise en paiement n'est pas toujours celle du crédit visible sur le compte. Les délais bancaires varient selon l'établissement.",
        },
        {
          type: "list",
          items: [
            "CAF et MSA pour les foyers au RSA.",
            "France Travail pour l'ASS, l'AER et la prime forfaitaire.",
            "En cas d'absence de paiement, vérifiez d'abord l'éligibilité et l'espace personnel, avant de conclure à une erreur.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Calendrier officiel de la campagne 2025 :",
          label: "actualité Service-Public A14502",
          href: SERVICE_PUBLIC_A14502,
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
          text: "L'organisme payeur dépend de l'allocation qui ouvre le droit, pas du seul fait d'être allocataire ou demandeur d'emploi.",
        },
        {
          type: "table",
          caption: "Organismes payeurs selon la situation de référence 2025.",
          headers: ["Situation", "Organisme", "Démarche habituelle"],
          rows: [
            ["RSA régime général", "CAF", "Versement automatique"],
            ["RSA régime agricole", "MSA", "Versement automatique"],
            ["ASS", "France Travail", "Versement automatique"],
            ["AER", "France Travail", "Versement automatique"],
            [
              "Prime forfaitaire pour reprise d'activité",
              "France Travail",
              "Versement automatique",
            ],
          ],
          stackOnMobile: true,
          rowHeader: true,
          accent: "brand",
        },
        {
          type: "paragraph",
          text: "Maintenez à jour votre RIB, votre adresse et votre composition familiale. Consultez les paiements dans votre espace personnel. Lorsque le même foyer était éligible à la fois au titre de l'ASS, de l'AER ou de la prime forfaitaire (article 1 du décret n° 2025-1212) et au titre du RSA (article 3), l'article 5 prévoyait de conserver la première aide versée et, le cas échéant, de compléter la différence si le montant dû au titre du RSA était plus élevé.",
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
              text: "Selon les règles 2025, la prime d'activité seule n'ouvrait pas droit à la prime de Noël. Un foyer pouvait toutefois être concerné s'il percevait aussi une allocation éligible (RSA, ASS, AER ou prime forfaitaire), avec un droit au mois de référence.",
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
              text: "En 2025, l'AAH seule n'ouvrait pas droit à la prime de Noël. Un foyer pouvait toutefois être concerné s'il remplissait les conditions d'une autre allocation éligible.",
            },
          ],
        },
        {
          id: "prime-de-noel-et-are",
          title: "Prime de Noël et ARE",
          blocks: [
            {
              type: "paragraph",
              text: "Percevoir l'allocation d'aide au retour à l'emploi (ARE) ne suffisait pas. France Travail versait la prime au titre de l'ASS, de l'AER ou de la prime forfaitaire, pas au simple titre de l'ARE.",
            },
          ],
        },
        {
          id: "prime-de-noel-et-ass",
          title: "Prime de Noël et ASS",
          blocks: [
            {
              type: "paragraph",
              text: `Pour l'ASS, le montant 2025 était forfaitaire (${formatEuro(FORFAIT_ASS_AER_GENERAL)} hors Mayotte, ${formatEuro(FORFAIT_ASS_AER_MAYOTTE)} à Mayotte), indépendamment du nombre d'enfants. Le paiement était automatique via France Travail.`,
            },
          ],
        },
        {
          id: "prime-de-noel-et-retraite",
          title: "Prime de Noël et retraite",
          blocks: [
            {
              type: "paragraph",
              text: "Tous les retraités n'étaient pas concernés. Seule l'allocation équivalent retraite (AER), encore applicable dans certaines situations résiduelles, figurait parmi les prestations ouvrant droit hors Mayotte. Une retraite classique ne suffisait pas à elle seule.",
            },
          ],
        },
        {
          id: "prime-de-noel-et-travail",
          title: "Prime de Noël et activité professionnelle",
          blocks: [
            {
              type: "paragraph",
              text: "Travailler n'excluait pas automatiquement le foyer. Ce qui comptait, c'était le droit à une allocation éligible au titre du mois de référence, avec les réserves prévues par le décret, notamment un RSA non nul.",
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
          caption: `${PRIME_DE_NOEL_BAREME_CAPTION}. RSA à Mayotte. Source : Service-Public F1325 et décret n° 2025-1213.`,
          headers: ["Enfants à charge", "Personne seule", "Couple"],
          rows: RSA_TABLE_MAYOTTE_ROWS,
          stackOnMobile: true,
          rowHeader: true,
          accent: "brand",
          numeric: true,
        },
        {
          type: "paragraph",
          text: `Pour l'ASS et la prime forfaitaire à Mayotte, le forfait 2025 était de ${formatEuro(FORFAIT_ASS_AER_MAYOTTE)}, conformément à l'article 1 du décret n° 2025-1213.`,
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            `Pour l'AER à Mayotte, les informations publiées par Service-Public et le décret spécifique de 2025 ne présentent pas exactement le même périmètre. En cas de doute, demandez confirmation à France Travail.`,
            `Références : Service-Public F1325 (forfait ${formatEuro(FORFAIT_ASS_AER_MAYOTTE)}) et décret n° 2025-1213, article 1 (ASS et prime forfaitaire cités expressément).`,
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Texte réglementaire mahorais :",
          label: "décret n° 2025-1213",
          href: LEGIFRANCE_2025_1213,
        },
        {
          type: "paragraph",
          text: "Pour la Guadeloupe, la Martinique, la Guyane et La Réunion, Service-Public rattache le barème au tableau général (hors Mayotte).",
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
          intro: "Page France Travail dédiée à l'aide de fin d'année :",
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
          text: "En 2025, aucune demande spécifique n'était en principe nécessaire. Le paiement suivait les fichiers des organismes. L'absence de versement n'est pas toujours une erreur.",
        },
        {
          type: "checklist",
          title: "Vérifications utiles",
          items: [
            "Confirmer que vous releviez d'une allocation ouvrant droit.",
            "Vérifier le mois de référence (novembre ou décembre pour 2025).",
            "Contrôler RIB, adresse et composition familiale.",
            "Consulter l'historique des paiements CAF, MSA ou France Travail.",
            "Pour un droit ouvert en décembre 2025, tenir compte d'un éventuel paiement à partir de janvier 2026.",
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
          text: "Selon Service-Public, la prime de Noël n'est pas imposable et n'a pas à être déclarée à l'impôt sur le revenu. Cette règle figure dans la fiche F1325 vérifiée en décembre 2025.",
        },
        {
          type: "paragraph",
          text: "Une seule aide est due par foyer. Percevoir plusieurs prestations n'ouvrait pas automatiquement plusieurs primes. Le décret n° 2025-1212 (article 5) organisait, le cas échéant, un complément différentiel lorsque le montant dû au titre du RSA était supérieur à l'aide déjà versée au titre de l'ASS, de l'AER ou de la prime forfaitaire.",
        },
        {
          type: "paragraph",
          text: "Recevoir la prime de Noël et cumuler d'autres prestations sociales sont deux questions distinctes. Aucune source consultée pour cette page ne décrit un effet automatique de la prime sur l'ensemble des autres aides.",
        },
      ],
    },
  ],
  faqTitle: "Questions fréquentes",
  faqIntro: `Réponses courtes fondées sur le barème 2025, vérifié le ${PRIME_DE_NOEL_VERIFIED_ON_LABEL}.`,
  faq: [
    {
      question: "Qui aura droit à la prime de Noël en 2026 ?",
      answer:
        "Les bénéficiaires exacts 2026 seront fixés par le décret et les communications officielles de l'année. En 2025, étaient concernés les foyers au RSA, à l'ASS, à l'AER ou à la prime forfaitaire pour reprise d'activité, avec un droit au mois de référence.",
    },
    {
      question: "Quel sera le montant de la prime de Noël en 2026 ?",
      answer:
        "Le montant 2026 n'est pas encore officiellement publié. La dernière référence connue est le barème 2025 : par exemple 152,45 € pour une personne seule au RSA sans enfant hors Mayotte, ou le même forfait pour l'ASS.",
    },
    {
      question: "Quand sera versée la prime de Noël 2026 ?",
      answer:
        `Aucune date officielle 2026 n'a été trouvée au ${PRIME_DE_NOEL_VERIFIED_ON_LABEL}. Pour la campagne 2025, le versement a commencé le 16 décembre pour les droits de novembre, et à partir de janvier 2026 pour les droits ouverts en décembre 2025.`,
    },
    {
      question: "Peut-on toucher la prime de Noël avec la prime d'activité ?",
      answer:
        "En 2025, la prime d'activité seule n'ouvrait pas droit à la prime de Noël. Un foyer pouvait être concerné s'il percevait aussi une allocation éligible, avec un droit au mois de référence.",
    },
    {
      question: "Les bénéficiaires de l'AAH ont-ils droit à la prime de Noël ?",
      answer:
        "En 2025, l'AAH seule n'ouvrait pas droit à la prime de Noël. Un foyer pouvait toutefois être concerné s'il remplissait les conditions d'une autre allocation éligible.",
    },
    {
      question: "Les chômeurs peuvent-ils recevoir la prime de Noël ?",
      answer:
        "Pas au seul titre de l'ARE. En 2025, France Travail versait la prime pour l'ASS, l'AER ou la prime forfaitaire, lorsque les conditions de droit étaient remplies.",
    },
    {
      question: "Pourquoi n'ai-je pas reçu ma prime de Noël ?",
      answer:
        "Causes fréquentes : allocation non éligible, droit hors période de référence, RSA de montant nul, coordonnées bancaires inexactes, ou délai bancaire. Pour un droit ouvert en décembre 2025, le paiement pouvait intervenir à partir de janvier 2026. Vérifiez votre espace personnel puis contactez l'organisme compétent.",
    },
    {
      question: "La prime de Noël est-elle imposable ?",
      answer:
        "Selon Service-Public, non. Elle n'a pas à être déclarée à l'impôt sur le revenu d'après la fiche F1325 vérifiée en décembre 2025.",
    },
    {
      question: "La prime de Noël est-elle versée par personne ou par foyer ?",
      answer:
        "Par foyer. Le décret 2025 prévoyait une seule aide par foyer, même en présence de plusieurs prestations. Mayotte dispose d'un barème distinct : voir la section dédiée.",
    },
  ],
  conclusion: {
    title: "À retenir",
    keyPoints: [
      "Selon les dernières règles officielles (campagne 2025), la prime concernait surtout le RSA, l'ASS, l'AER et, le cas échéant, la prime forfaitaire pour reprise d'activité.",
      "L'organisme payeur suit l'allocation : CAF ou MSA pour le RSA, France Travail pour l'ASS, l'AER et la prime forfaitaire.",
      "Les paiements se consultent dans l'espace personnel de l'organisme compétent ; aucune demande n'était en principe nécessaire en 2025.",
      "Les tableaux de cette page sont ceux de 2025, faute de barème officiel 2026 à la date de vérification.",
      "Les sources institutionnelles et les décrets sont listés en fin d'article.",
    ],
    closingText:
      "Dès qu'un décret ou une communication officielle fixera la campagne 2026, les montants et le calendrier de cette page seront mis à jour.",
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
        text: `Informations vérifiées le ${PRIME_DE_NOEL_VERIFIED_ON_LABEL}. Aucun décret 2026 n'a été identifié à cette date. Les tableaux reproduisent uniquement le barème 2025 publié.`,
      },
      {
        type: "paragraph",
        text: "Méthode : les montants jusqu'à cinq enfants sont repris des tableaux publiés par Service-Public (notamment F1325 et A14502). Pour les foyers plus nombreux, la majoration par enfant supplémentaire suit les règles indiquées dans le barème applicable. Les forfaits ASS, AER hors Mayotte et prime forfaitaire sont ceux du territoire concerné. Aucune extrapolation pour 2026. La nuance AER à Mayotte est détaillée dans la section Mayotte.",
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
