import type { Guide } from "../types";
import {
  RC_BREADCRUMB,
  RC_EMPLOYER_CONTRIBUTION_RATE_2026,
  RC_EXAMPLE_REFERENCE_SALARY,
  RC_H1,
  RC_META_DESCRIPTION,
  RC_PASS_10_2026,
  RC_PASS_2026,
  RC_PASS_2_2026,
  RC_PASS_6_2026,
  RC_PATH,
  RC_PUBLISHED_AT,
  RC_SEO_TITLE,
  RC_SLUG,
  RC_SOURCES as S,
  RC_SOURCES_CHECKED_ON_LABEL,
  RC_SUBTITLE,
  RC_UNEMPLOYMENT_SPECIFIC_DELAY_CAP_DAYS,
  RC_UNEMPLOYMENT_SPECIFIC_DELAY_DIVISOR_2026,
  RC_UPDATED_AT,
  formatRcDivisor,
  formatRcEuroReadable,
  legalSeveranceGross,
  rcLegalExampleRows,
  unemploymentSpecificDelayDays,
  yearsFromCompleteMonths,
} from "@/site/indemnite-rupture-conventionnelle";

const SOLDE = "/solde-de-tout-compte";
const CONGES = "/conges-payes";
const SOLDE_CONGES = "/solde-conges-payes";
const TEMPS_PARTIEL = "/salaire-temps-partiel";
const FICHE_PAIE = "/guides/comment-lire-une-fiche-de-paie";

const REF = RC_EXAMPLE_REFERENCE_SALARY;
const LEGAL_ROWS = rcLegalExampleRows(REF);
const EX_5Y = legalSeveranceGross(REF, 5);
const EX_12_5Y = legalSeveranceGross(REF, 12.5);
const EX_6M = legalSeveranceGross(REF, yearsFromCompleteMonths(6));
const EX_FIRST_10 = legalSeveranceGross(REF, 10);
const BAND_BEYOND_2_5 = EX_12_5Y - EX_FIRST_10;

const FICTIVE_LEGAL = EX_5Y;
const FICTIVE_FAVORABLE = 4500;
const FICTIVE_AGREED = 6000;
const FICTIVE_NEGOTIATED_ABOVE_DUE = FICTIVE_AGREED - FICTIVE_FAVORABLE;
const FICTIVE_ABOVE_LEGAL = FICTIVE_AGREED - FICTIVE_LEGAL;
const DIFF_DAYS_ABOVE_LEGAL = unemploymentSpecificDelayDays(FICTIVE_ABOVE_LEGAL);
const DIVISOR_LABEL = formatRcDivisor(RC_UNEMPLOYMENT_SPECIFIC_DELAY_DIVISOR_2026);
const PRIME_ANNUELLE = 1200;
const SALAIRE_STABLE = 2400;
const PRIME_QUOTE_3M = Math.round((PRIME_ANNUELLE * 3) / 12);
const MOYENNE_3M =
  Math.round(((SALAIRE_STABLE * 3 + PRIME_QUOTE_3M) / 3) * 100) / 100;

function euro(value: number): string {
  return `${formatRcEuroReadable(value)}\u00a0€`;
}

function legalTableRows(): string[][] {
  return LEGAL_ROWS.map((row) => [
    row.seniorityLabel,
    row.calculation,
    `${formatRcEuroReadable(row.amount)}\u00a0€`,
  ]);
}

/**
 * Guide indemnité de rupture conventionnelle individuelle (secteur privé).
 * URL : /indemnite-rupture-conventionnelle
 */
export const indemniteRuptureConventionnelleGuide: Guide = {
  slug: RC_SLUG,
  publicPath: RC_PATH,
  breadcrumbLabel: RC_BREADCRUMB,
  title: RC_H1,
  seoTitle: RC_SEO_TITLE,
  description: RC_META_DESCRIPTION,
  subtitle: RC_SUBTITLE,
  publishedAt: RC_PUBLISHED_AT,
  updatedAt: RC_UPDATED_AT,
  includeFaqSchema: true,
  faqSectionId: "questions-frequentes",
  faqTitle: "Questions fréquentes sur l'indemnité de rupture conventionnelle",
  faqIntro:
    "Réponses courtes sur le minimum, le calcul, la négociation, les prélèvements et le chômage.",
  introduction: [
    "Vous envisagez une rupture conventionnelle et vous voulez savoir combien vous allez toucher ? Le montant dépend d'abord de votre salaire de référence, de votre ancienneté et des dispositions applicables dans votre entreprise. Un minimum doit être respecté, mais vous pouvez convenir avec votre employeur d'une indemnité supérieure.",
    "Le montant inscrit dans la convention ne représente toutefois pas forcément la somme totale versée à votre départ ni le montant net qui arrivera sur votre compte. Voici comment distinguer le minimum, la part négociée, les prélèvements éventuels et les autres sommes qui vous sont dues.",
    "Les exemples concernent une rupture conventionnelle individuelle d'un CDI dans le secteur privé, sous le régime général, sauf indication contraire. Ils ne couvrent ni la fonction publique, ni la rupture conventionnelle collective, ni une transaction séparée.",
  ],
  introSummary: {
    title: "L'essentiel",
    items: [
      "Vous pouvez percevoir une indemnité de rupture conventionnelle même avec moins de huit mois d'ancienneté.",
      "Le plancher légal se calcule à partir du salaire de référence et de l'ancienneté.",
      "Les dispositions applicables peuvent conduire à un minimum supérieur.",
      "Un montant supplémentaire peut être négocié.",
      "Brut, net et début d'indemnisation chômage sont trois questions différentes.",
    ],
  },
  sections: [
    {
      id: "montant-minimum",
      title: "Quel est le montant minimum d'une rupture conventionnelle ?",
      blocks: [
        {
          type: "paragraph",
          text: "La rupture conventionnelle individuelle repose sur un accord entre vous et votre employeur. Ce n'est ni une démission, ni un licenciement, et aucune des deux parties ne peut l'imposer seule. Lorsqu'elle est valablement conclue et homologuée (ou autorisée pour un salarié protégé), une indemnité spécifique doit être versée.",
        },
        {
          type: "paragraph",
          text: "Trois montants méritent d'être distingués. Le plancher issu de la formule légale constitue le premier niveau. Si une convention collective, un accord ou un usage plus favorable s'applique réellement à votre situation, le minimum dû peut être plus élevé. Enfin, vous pouvez convenir d'un montant encore supérieur : c'est la part négociée.",
        },
        {
          type: "paragraph",
          text: "Le barème légal n'est donc pas une proposition de négociation universelle. C'est un plancher. Votre convention peut déjà prévoir davantage, et l'employeur n'est pas tenu d'accepter une demande de rupture conventionnelle.",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Contrairement à l'indemnité légale de licenciement, aucune condition de huit mois d'ancienneté n'est exigée pour percevoir l'indemnité de rupture conventionnelle. Une ancienneté courte donne en pratique un montant calculé au prorata des mois complets, pas un forfait fixe dès le premier jour.",
          ],
        },
        {
          type: "paragraph",
          text: `Avec six mois d'ancienneté et un salaire de référence de ${euro(REF)}, le plancher légal s'écrit : ${euro(REF)} × 1/4 × 6/12 = ${euro(EX_6M)}.`,
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "À ne pas confondre : la rupture conventionnelle collective, la rupture amiable d'un CDD, une transaction et un départ volontaire à la retraite obéissent à d'autres règles. Les salariés protégés relèvent aussi d'une procédure particulière (autorisation de l'inspecteur du travail, pas l'homologation ordinaire).",
          ],
        },
      ],
    },
    {
      id: "comment-calculer",
      title: "Comment calculer votre indemnité ?",
      blocks: [
        {
          type: "paragraph",
          text: "La formule légale de référence (articles R. 1234-1 et R. 1234-2 du Code du travail) retient un quart de mois de salaire par année d'ancienneté pour les dix premières années, puis un tiers de mois par année au-delà. Pour une année incomplète, les mois complets entrent au prorata.",
        },
        {
          type: "paragraph",
          text: `Le tableau ci-dessous illustre cette formule avec un salaire de référence déjà déterminé de ${euro(REF)} (noté S dans les calculs longs). Hypothèses : ancienneté appréciée à la date effective de rupture du contrat, aucun minimum plus favorable applicable, aucun complément négocié, hors prélèvements et hors autres sommes de départ. Ce n'est pas un barème de sommes garanties à tous.`,
        },
        {
          type: "table",
          caption: `Exemples de plancher légal brut (S = ${euro(REF)})`,
          headers: [
            "Ancienneté",
            "Calcul",
            "Montant brut indicatif",
          ],
          rows: legalTableRows(),
          numeric: true,
          stackOnMobile: true,
        },
        {
          type: "paragraph",
          text: "Cinq ans d'ancienneté :",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `${euro(REF)} × 1/4 × 5 = ${euro(EX_5Y)}.`,
          ],
        },
        {
          type: "paragraph",
          text: "Douze ans et six mois, soit 2,5 années au-delà de dix ans (deux années et six mois, et non deux années et cinq mois) :",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Première tranche : ${euro(REF)} × 1/4 × 10 = ${euro(EX_FIRST_10)}.`,
            `Au-delà de dix ans : ${euro(REF)} × 1/3 × 2,5 = ${euro(BAND_BEYOND_2_5)}.`,
            `Total : ${euro(EX_12_5Y)}.`,
          ],
        },
        {
          type: "paragraph",
          text: "Un minimum plus favorable et une somme négociée (exemple fictif, sans rattachement à une convention réelle) :",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Résultat de la formule légale : ${euro(FICTIVE_LEGAL)}.`,
            `Minimum plus favorable effectivement applicable : ${euro(FICTIVE_FAVORABLE)}.`,
            `Montant finalement convenu : ${euro(FICTIVE_AGREED)}.`,
            `Dans cette hypothèse, ${euro(FICTIVE_FAVORABLE)} constitue le minimum dû. Le supplément négocié au-dessus de ce minimum est de ${euro(FICTIVE_NEGOTIATED_ABOVE_DUE)}. L'écart par rapport au plancher légal (${euro(FICTIVE_ABOVE_LEGAL)}) répond à une autre question, notamment pour l'assurance chômage.`,
          ],
        },
        {
          type: "internal-link",
          variant: "simulator",
          intro: "Pour une estimation officielle de l'indemnité spécifique de rupture conventionnelle :",
          label: S.cdtnSimulator.label,
          href: S.cdtnSimulator.href,
        },
      ],
    },
    {
      id: "salaire-de-reference",
      title: "Quel salaire de référence faut-il retenir ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le salaire de référence conditionne presque tout le calcul. On retient le salaire brut, pas le net versé sur votre compte. Les remboursements de frais ne se confondent pas avec la rémunération.",
        },
        {
          type: "paragraph",
          text: "A. Salaire de référence. Selon l'article R. 1234-4 du Code du travail, on compare la formule la plus avantageuse pour le salarié : la moyenne mensuelle des douze derniers mois (ou de l'ensemble des mois si l'ancienneté est inférieure à douze mois), ou la moyenne des trois derniers mois. Dans cette seconde méthode, une prime annuelle ou exceptionnelle versée pendant la période de trois mois n'entre qu'à due proportion.",
        },
        {
          type: "paragraph",
          text: "Selon l'espace documentaire TéléRC sur la rupture conventionnelle, la base de calcul de l'indemnité spécifique doit prendre en compte la moyenne la plus favorable des trois ou douze derniers mois versés avant la date de signature de la convention. Tout élément de rémunération exceptionnel doit être intégré au prorata. En cas d'absence non rémunérée, le salaire est reconstitué comme s'il avait été normalement perçu. Si la date de départ change ensuite, le service paie peut devoir actualiser le calcul : demandez le détail retenu pour le formulaire et pour le minimum dû.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Source officielle :",
          label: S.telercRcInfo.label,
          href: S.telercRcInfo.href,
        },
        {
          type: "paragraph",
          text: "B. Ancienneté. Pour le minimum légal, l'ancienneté s'apprécie jusqu'à la date effective de rupture du contrat fixée dans la convention. Si cette date est reportée, le calcul peut évoluer. Une formule conventionnelle peut toutefois retenir une autre borne : il faut alors lire le texte applicable, sans généraliser une règle venue d'un autre mode de rupture.",
        },
        {
          type: "paragraph",
          text: `Exemple de primes (méthode légale présentée ici). Salaire mensuel stable de ${euro(SALAIRE_STABLE)} et prime annuelle de ${euro(PRIME_ANNUELLE)} versée dans la période concernée. Sur douze mois : (${euro(SALAIRE_STABLE)} × 12 + ${euro(PRIME_ANNUELLE)}) ÷ 12 = ${euro(2500)}. Sur trois mois : part de prime à retenir = ${euro(PRIME_ANNUELLE)} × 3/12 = ${euro(PRIME_QUOTE_3M)}, puis (${euro(SALAIRE_STABLE)} × 3 + ${euro(PRIME_QUOTE_3M)}) ÷ 3 = ${euro(MOYENNE_3M)}. On ne compte pas les ${euro(PRIME_ANNUELLE)} intégralement dans cette seconde moyenne, car ils ne rémunèrent pas seulement trois mois.`,
        },
        {
          type: "paragraph",
          text: "Cette illustration concerne la méthode légale présentée, pas toutes les formules conventionnelles possibles.",
        },
        {
          type: "checklist",
          title: "Points à examiner dans l'assiette",
          items: [
            "Variables et primes : selon leur nature et la méthode retenue",
            "Arrêt maladie ou activité partielle : ne pas retenir aveuglément un salaire temporairement réduit",
            "Parcours temps plein / temps partiel : calcul adapté",
            "Congé parental ou temps partiel thérapeutique : vérification spécifique",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour situer un temps partiel dans le parcours :",
          label: "Salaire à temps partiel",
          href: TEMPS_PARTIEL,
        },
      ],
    },
    {
      id: "convention-collective",
      title: "Votre convention collective peut-elle prévoir davantage ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le résultat de la formule légale est un point de départ. Avant de retenir ce montant, vérifiez si des dispositions applicables vous donnent droit à davantage.",
        },
        {
          type: "paragraph",
          text: "L'IDCC ou le nom de la convention figure souvent sur le bulletin de paie et le contrat. Vous pouvez aussi utiliser l'outil officiel de recherche des conventions collectives. Ensuite, comparez les règles complètes : bénéficiaires, ancienneté, assiette, taux, conditions particulières et éventuelles majorations.",
        },
        {
          type: "paragraph",
          text: "Comparez les résultats des méthodes applicables dans leur ensemble : le taux, l'assiette et les conditions d'ancienneté doivent être examinés ensemble. Toutes les conventions ne s'appliquent pas de la même manière au minimum de la rupture conventionnelle : il faut vérifier le texte ou l'accord réellement applicable.",
        },
      ],
    },
    {
      id: "negociation",
      title: "Combien pouvez-vous négocier au-delà du minimum ?",
      blocks: [
        {
          type: "paragraph",
          text: "Un montant supérieur au minimum peut être convenu. Il n'existe pas, en revanche, de supplément standard garanti en nombre de mois de salaire.",
        },
        {
          type: "paragraph",
          text: "Préparez d'abord le calcul du minimum dû. Distinguez clairement ce qui est dû et ce qui est négocié. Examinez aussi la date de départ, la rémunération jusqu'à cette date et l'éventuel complément d'indemnité. Demandez une présentation écrite et distincte des sommes, puis anticipez les prélèvements et la période avant une éventuelle indemnisation chômage.",
        },
        {
          type: "paragraph",
          text: "Une somme plus élevée peut améliorer votre indemnité de départ tout en modifiant les prélèvements ou le début de votre indemnisation chômage. Ces effets doivent être examinés séparément.",
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Le montant négocié ne correspond pas à un barème prud'homal. Une rupture conventionnelle et une indemnisation décidée à la suite d'un litige répondent à des règles différentes.",
          ],
        },
      ],
    },
    {
      id: "brut-net-prelevements",
      title: "De l'indemnité brute au montant réellement reçu",
      blocks: [
        {
          type: "paragraph",
          text: "Le montant annoncé dans la convention est en général un montant brut. Pour savoir ce qui arrivera sur votre compte, il faut séparer quatre questions : l'indemnité brute convenue, les prélèvements éventuels supportés par le salarié, la part éventuellement imposable, et le coût supplémentaire supporté par l'employeur.",
        },
        {
          type: "paragraph",
          text: "Le convertisseur brut/net salarial du site n'est pas un convertisseur universel d'indemnités de rupture. N'appliquez pas un coefficient de salaire à cette indemnité.",
        },
        {
          type: "table",
          caption: "Prélèvements à distinguer",
          headers: ["Prélèvement", "Ce qui doit être vérifié"],
          rows: [
            [
              "Impôt sur le revenu",
              "Droit éventuel à une pension d'un régime légalement obligatoire au jour de la rupture effective, montant total de l'indemnité, limites fiscales comparées (dont 6 PASS).",
            ],
            [
              "Cotisations sociales",
              "Montant exclu de l'assiette selon les seuils applicables, dans la limite de 2 PASS ; assujettissement intégral si le montant dépasse 10 PASS.",
            ],
            [
              "CSG / CRDS",
              "Exonération limitée au plus faible entre le minimum légal ou conventionnel et la fraction exclue des cotisations ; pas d'abattement forfaitaire habituel des salaires sur la part assujettie.",
            ],
            [
              "Contribution patronale spécifique",
              "À la charge de l'employeur, sur la fraction exclue des cotisations. Ce n'est pas une retenue salariale.",
            ],
          ],
          stackOnMobile: true,
        },
        {
          type: "paragraph",
          text: "A. Impôt sur le revenu. Les droits à pension s'apprécient au jour de la rupture effective du contrat, tel qu'il est fixé dans la convention. Ce n'est pas seulement une question d'âge, ni le simple fait d'avoir déjà demandé la retraite. Si vous êtes en droit de bénéficier d'une pension d'un régime légalement obligatoire à cette date, l'indemnité est en principe imposable dès le premier euro.",
        },
        {
          type: "paragraph",
          text: "Sinon, l'exonération porte sur le montant total de l'indemnité, dans la limite la plus élevée entre : le montant légal ou conventionnel retenu par les textes fiscaux ; et le plus élevé entre deux fois la rémunération annuelle brute de l'année civile précédente et la moitié de l'indemnité totale, cette seconde branche étant plafonnée à six PASS. Ces limites se comparent ; elles ne s'additionnent pas. L'exonération ne peut pas dépasser l'indemnité réellement reçue.",
        },
        {
          type: "paragraph",
          text: `Repères PASS 2026 (métropole / outre-mer hors Mayotte) : 1 PASS = ${euro(RC_PASS_2026)} ; 2 PASS = ${euro(RC_PASS_2_2026)} ; 6 PASS = ${euro(RC_PASS_6_2026)} ; 10 PASS = ${euro(RC_PASS_10_2026)}. Chaque seuil a un usage précis dans le mécanisme concerné.`,
        },
        {
          type: "paragraph",
          text: "B. Cotisations sociales. Depuis l'harmonisation applicable aux ruptures dont le terme est postérieur au 31 août 2023, le régime social ne se déduit pas automatiquement du régime fiscal, y compris lorsqu'une pension est possible. L'exclusion d'assiette se calcule à hauteur du plus élevé de plusieurs seuils (minimum légal ou conventionnel, moitié de l'indemnité, double de la rémunération annuelle brute de l'année précédente), dans la limite de deux PASS. Deux PASS ne signifient donc pas qu'une indemnité inférieure à ce montant est automatiquement exonérée en totalité.",
        },
        {
          type: "paragraph",
          text: `Si le montant de l'indemnité dépasse dix PASS (${euro(RC_PASS_10_2026)} en 2026), ou cinq PASS en cas de cumul avec certaines indemnités de rupture du mandat social, elle est intégralement soumise aux cotisations. Les cas de cumul relèvent d'une vérification au cas par cas auprès de l'Urssaf.`,
        },
        {
          type: "paragraph",
          text: "C. CSG et CRDS. L'exonération de CSG/CRDS est limitée au plus faible des deux montants suivants : le minimum légal ou conventionnel, et la fraction exclue des cotisations sociales. Une indemnité peut donc rester en partie exonérée d'impôt tout en supportant de la CSG/CRDS. Au-delà de dix PASS (ou cinq PASS en cas de cumul avec certaines indemnités de mandat), l'assujettissement est intégral, sans abattement forfaitaire pour frais professionnels.",
        },
        {
          type: "paragraph",
          text: `D. Contribution patronale. Dans le régime applicable depuis janvier 2026, la contribution patronale spécifique est de ${Math.round(RC_EMPLOYER_CONTRIBUTION_RATE_2026 * 100)}\u00a0% sur la fraction de l'indemnité exclue de l'assiette des cotisations sociales. Elle est à la charge de l'employeur et augmente son coût ; elle n'est pas une retenue salariale déduite de votre indemnité.`,
        },
        {
          type: "paragraph",
          text: "Pour connaître le montant réellement versé, demandez un décompte distinguant indemnité brute, prélèvements et part imposable.",
        },
      ],
    },
    {
      id: "autres-sommes-depart",
      title: "Quelles autres sommes sont versées à votre départ ?",
      blocks: [
        {
          type: "paragraph",
          text: "L'indemnité de rupture conventionnelle n'est qu'une composante du départ. Le solde de tout compte récapitule différentes sommes dues à la fin du contrat. Ce n'est pas un synonyme de l'indemnité spécifique.",
        },
        {
          type: "table",
          caption: "Sommes souvent présentes au départ",
          headers: ["Somme", "S'ajoute-t-elle à l'indemnité ?", "Point à vérifier"],
          rows: [
            [
              "Dernier salaire",
              "Oui, distinct",
              "Jours travaillés jusqu'à la rupture",
            ],
            [
              "Primes acquises",
              "Selon leurs conditions",
              "Date d'exigibilité et conditions du contrat ou de l'accord",
            ],
            [
              "Indemnité compensatrice de congés payés",
              "Oui, distincte",
              "Congés acquis non pris",
            ],
            [
              "RTT / CET",
              "Selon l'accord",
              "Pas de paiement automatique de tous les RTT dans toutes les entreprises",
            ],
            [
              "Contrepartie de non-concurrence",
              "Si due",
              "Clause et conditions de mise en œuvre",
            ],
            [
              "Remboursements de frais",
              "Si restant dus",
              "Justificatifs et règles internes",
            ],
          ],
          stackOnMobile: true,
        },
        {
          type: "paragraph",
          text: "Le total brut des sommes de départ peut différer du virement reçu : le salaire, les congés payés et l'indemnité de rupture n'ont pas nécessairement le même traitement social et fiscal.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour une vue d'ensemble du départ, consultez le",
          label: "solde de tout compte",
          href: SOLDE,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Les droits à congés sont présentés dans le guide des",
          label: "congés payés",
          href: CONGES,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro:
            "Pour lire les compteurs de jours restants, distincts du calcul financier de l'indemnité compensatrice, voir le",
          label: "solde de congés payés",
          href: SOLDE_CONGES,
        },
      ],
    },
    {
      id: "calendrier-versement",
      title: "Quand l'indemnité doit-elle être versée ?",
      blocks: [
        {
          type: "paragraph",
          text: "Pour un salarié non protégé, le calendrier se lit en étapes : signature, délai de rétractation, demande et instruction d'homologation, date de rupture convenue, puis règlement des sommes dues.",
        },
        {
          type: "checklist",
          title: "Repères de procédure (cas général)",
          items: [
            "Quinze jours calendaires de rétractation à compter du lendemain de la signature",
            "Demande d'homologation possible dès le lendemain de la fin de ce délai",
            "Quinze jours ouvrables d'instruction à compter du lendemain de la réception",
            "Date de rupture au plus tôt le lendemain de l'homologation (ou de l'expiration du délai sans réponse)",
          ],
        },
        {
          type: "paragraph",
          text: "Ces délais peuvent être prolongés lorsque le dernier jour tombe un samedi, un dimanche ou un jour férié ou chômé. On ne peut donc pas annoncer un départ « exactement trente jours après la signature ».",
        },
        {
          type: "paragraph",
          text: "Il n'existe pas de préavis légal de rupture conventionnelle comparable au préavis de démission. Le contrat continue jusqu'à la date de rupture convenue. Signature, homologation, fin du contrat et arrivée du virement sont quatre dates différentes.",
        },
        {
          type: "paragraph",
          text: "L'indemnité spécifique et le dernier salaire deviennent en principe exigibles à la date de rupture. D'autres éléments, comme certaines primes, peuvent suivre leur propre échéance. Le règlement intervient souvent avec la dernière paie, mais un retard n'est pas automatiquement justifié par ce seul usage. La signature du reçu pour solde de tout compte n'est pas une condition pour recevoir les sommes dues.",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Les salariés protégés relèvent d'une autorisation de l'inspecteur du travail, avec des délais distincts de l'homologation ordinaire. Ne leur appliquez pas le calendrier général sans vérification.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Téléservice et formulaires :",
          label: S.telerc.label,
          href: S.telerc.href,
        },
      ],
    },
    {
      id: "consequences-chomage",
      title: "Quelles conséquences sur le chômage ?",
      blocks: [
        {
          type: "paragraph",
          text: "Une rupture conventionnelle peut ouvrir droit à l'ARE si les conditions d'affiliation et les autres conditions sont remplies. L'allocation ne commence pas nécessairement immédiatement après le départ.",
        },
        {
          type: "paragraph",
          text: "Plusieurs délais peuvent se succéder : un différé lié aux indemnités de rupture, un différé congés payés, un délai d'attente, puis la date de premier paiement après les démarches. La durée totale d'indemnisation est une question distincte du simple décalage de début.",
        },
        {
          type: "paragraph",
          text: "Point essentiel pour le différé spécifique : la base retenue ne se limite pas forcément au supplément négocié au-dessus du minimum conventionnel dû. Selon les règles Unédic, la part de l'indemnité de rupture conventionnelle qui dépasse l'indemnité légale de licenciement entre dans ce calcul.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Reprenons l'exemple fictif : minimum légal ${euro(FICTIVE_LEGAL)}, minimum plus favorable dû ${euro(FICTIVE_FAVORABLE)}, montant convenu ${euro(FICTIVE_AGREED)}.`,
            `Le supplément négocié au-dessus du minimum dû est de ${euro(FICTIVE_NEGOTIATED_ABOVE_DUE)}. L'écart par rapport au minimum légal est de ${euro(FICTIVE_ABOVE_LEGAL)}. Ces deux écarts répondent à deux questions différentes.`,
            `${euro(FICTIVE_ABOVE_LEGAL)} ÷ ${DIVISOR_LABEL} ≈ 25,72. La partie entière donne ${DIFF_DAYS_ABOVE_LEGAL} jours de différé spécifique dans cet exemple (diviseur Unédic ${DIVISOR_LABEL} pour 2026, plafond courant ${RC_UNEMPLOYMENT_SPECIFIC_DELAY_CAP_DAYS} jours hors motif économique). Ce n'est pas le délai total avant paiement : le différé congés payés et le délai d'attente suivent leurs propres règles.`,
          ],
        },
        {
          type: "paragraph",
          text: "À compter du 1er septembre 2026, pour une rupture conventionnelle individuelle dont la fin de contrat intervient à cette date ou après, la durée maximale d'indemnisation peut être plafonnée de façon spécifique. Ce plafond n'est ni un droit garanti à tous, ni le même mécanisme qu'un différé : il limite la durée maximale des droits ouverts, sous conditions.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le détail des droits après rupture conventionnelle :",
          label: S.unedicRc.label,
          href: S.unedicRc.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Page France Travail :",
          label: S.franceTravailRc.label,
          href: S.franceTravailRc.href,
        },
      ],
    },
    {
      id: "checklist-avant-signature",
      title: "Que vérifier avant de signer ?",
      blocks: [
        {
          type: "paragraph",
          text: "Avant de signer la convention, une vérification courte évite les mauvaises surprises sur le montant et sur le calendrier.",
        },
        {
          type: "checklist",
          title: "Checklist avant signature",
          items: [
            "Convention collective et dispositions applicables identifiées",
            "Salaire de référence vérifié",
            "Ancienneté jusqu'à la date de rupture vérifiée",
            "Calcul du minimum détaillé",
            "Complément négocié séparé",
            "Autres sommes de départ identifiées",
            "Estimation des prélèvements",
            "Date de fin de contrat cohérente",
            "Conséquences sur la période avant indemnisation examinées",
            "Exemplaire de la convention conservé",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour relire les lignes du dernier bulletin :",
          label: "Comment lire une fiche de paie",
          href: FICHE_PAIE,
        },
      ],
    },
  ],
  faq: [
    {
      question: "Peut-on toucher une indemnité avec moins de huit mois d'ancienneté ?",
      answer:
        "Oui. La rupture conventionnelle individuelle n'exige pas huit mois d'ancienneté. Le montant suit alors le prorata des mois complets selon la formule du minimum légal, sauf disposition plus favorable applicable.",
    },
    {
      question: "Le calcul se fait-il sur le salaire brut ou net ?",
      answer:
        "Sur le salaire brut de référence, selon les méthodes prévues pour l'indemnité légale. Le net bancaire n'est pas l'assiette de départ.",
    },
    {
      question: "L'indemnité est-elle identique à celle d'un licenciement ?",
      answer:
        "Le plancher ne peut pas être inférieur à l'indemnité légale de licenciement, ou à un minimum plus favorable applicable. Le régime, la procédure et l'éventuelle négociation restent propres à la rupture conventionnelle.",
    },
    {
      question: "Peut-on négocier davantage que le minimum ?",
      answer:
        "Oui, un montant supérieur peut être convenu. Aucun supplément standard en nombre de mois n'est garanti pour tous.",
    },
    {
      question: "Le montant brut correspond-il forcément au montant reçu ?",
      answer:
        "Non. Des prélèvements sociaux ou fiscaux peuvent s'appliquer selon votre situation. Demandez un décompte distinguant brut, retenues et part imposable.",
    },
    {
      question: "Les congés payés sont-ils inclus dans l'indemnité ?",
      answer:
        "Non. Les congés acquis non pris donnent en principe lieu à une indemnité compensatrice distincte, en plus de l'indemnité de rupture.",
    },
    {
      question: "L'indemnité est-elle versée dès la signature ?",
      answer:
        "Non. La rupture n'intervient qu'après les délais de rétractation et d'homologation (ou d'autorisation). L'indemnité spécifique est en principe due à la date de rupture ; d'autres sommes peuvent suivre leur propre échéance.",
    },
    {
      question: "Une indemnité plus élevée peut-elle retarder le chômage ?",
      answer:
        "Oui, la part qui dépasse le minimum légal peut allonger le différé spécifique d'indemnisation. D'autres délais (congés payés, délai d'attente) peuvent s'ajouter. Ce n'est pas la même chose que la durée maximale des droits.",
    },
  ],
  conclusion: {
    title: "Pour conclure",
    keyPoints: [],
    closingText:
      "Pour estimer ce que vous toucherez, calculez d'abord le minimum dû à partir du salaire de référence et de l'ancienneté, puis vérifiez les dispositions plus favorables et l'éventuel complément négocié. Demandez ensuite un décompte écrit des autres sommes de départ et des prélèvements, et examinez séparément le calendrier avant une éventuelle indemnisation chômage.",
    furtherReading: {
      title: "Pour aller plus loin",
      items: [
        {
          title: "Solde de tout compte",
          description: "Repérer toutes les sommes dues à la fin du contrat.",
          href: SOLDE,
        },
        {
          title: "Solde de congés payés",
          description: "Lire les compteurs de jours N et N-1 sur le bulletin.",
          href: SOLDE_CONGES,
        },
        {
          title: "Comment lire une fiche de paie",
          description: "Repérer brut, cotisations et net sur le bulletin.",
          href: FICHE_PAIE,
        },
        {
          title: S.cdtnSimulator.label,
          description: "Estimation officielle de l'indemnité spécifique de rupture conventionnelle.",
          href: S.cdtnSimulator.href,
        },
      ],
    },
  },
  bibliographyPlacement: "after-conclusion",
  bibliography: {
    id: "methodologie-sources",
    title: "Sources et méthode de vérification",
    blocks: [
      {
        type: "paragraph",
        text: `Contrôle des sources le ${RC_SOURCES_CHECKED_ON_LABEL}. Procédure et indemnité : Service-Public F19030 et F31539 (vérifiés le 26 juin 2026) ; Code du travail L. 1237-11 et suivants, R. 1234-1 à R. 1234-5 ; TéléRC (information rupture conventionnelle et FAQ).`,
      },
      {
        type: "paragraph",
        text: `Fiscalité : article 80 duodecies du CGI ; BOFiP BOI-RSA-CHAMP-20-40-10-30 (partie rupture conventionnelle) ; impots.gouv.fr. Cotisations, CSG/CRDS et contribution patronale : L. 242-1, L. 136-1-1 et L. 137-12 du Code de la sécurité sociale ; pages Urssaf (PASS 2026 = ${euro(RC_PASS_2026)} ; contribution patronale ${Math.round(RC_EMPLOYER_CONTRIBUTION_RATE_2026 * 100)}\u00a0% dans le régime applicable depuis janvier 2026).`,
      },
      {
        type: "paragraph",
        text: `Assurance chômage : fiches Unédic (différé spécifique : diviseur ${DIVISOR_LABEL} en 2026, nombre entier de jours, plafond courant ${RC_UNEMPLOYMENT_SPECIFIC_DELAY_CAP_DAYS} jours) et durée maximale après rupture conventionnelle individuelle à compter du 1er septembre 2026 ; pages France Travail et actualité Service-Public A18945.`,
      },
      {
        type: "paragraph",
        text: `Méthode : formule légale exacte puis arrondi monétaire au centime. Exemples pédagogiques à ${euro(REF)}. Les exemples présentent des montants bruts. Le montant net dépend du traitement social et fiscal de chaque somme.`,
      },
      {
        type: "list",
        items: [
          {
            text: `${S.servicePublicIndemnite.org} :`,
            href: S.servicePublicIndemnite.href,
            label: S.servicePublicIndemnite.label,
          },
          {
            text: `${S.bofipRc.org} :`,
            href: S.bofipRc.href,
            label: S.bofipRc.label,
          },
          {
            text: `${S.telercRcInfo.org} :`,
            href: S.telercRcInfo.href,
            label: S.telercRcInfo.label,
          },
          {
            text: `${S.urssafNouvelleAnnee.org} :`,
            href: S.urssafNouvelleAnnee.href,
            label: S.urssafNouvelleAnnee.label,
          },
          {
            text: `${S.urssafRc.org} :`,
            href: S.urssafRc.href,
            label: S.urssafRc.label,
          },
          {
            text: `${S.unedicDiffere.org} :`,
            href: S.unedicDiffere.href,
            label: S.unedicDiffere.label,
          },
          {
            text: `${S.unedicRc.org} :`,
            href: S.unedicRc.href,
            label: S.unedicRc.label,
          },
        ],
      },
    ],
  },
  sidebar: {
    calculator: {
      title: "Solde de tout compte",
      description: "Repérer l'indemnité et les autres sommes dues au départ.",
      href: SOLDE,
    },
    relatedGuides: [
      { title: "Solde de tout compte", href: SOLDE },
      { title: "Solde de congés payés", href: SOLDE_CONGES },
      { title: "Comment lire une fiche de paie", href: FICHE_PAIE },
    ],
  },
};
