import type { Guide } from "../types";
import {
  BANK_GUIDE_BREADCRUMB,
  BANK_GUIDE_H1,
  BANK_GUIDE_META_DESCRIPTION,
  BANK_GUIDE_PATH,
  BANK_GUIDE_PUBLISHED_AT,
  BANK_GUIDE_SEO_TITLE,
  BANK_GUIDE_SLUG,
  BANK_GUIDE_SOURCES as S,
  BANK_GUIDE_SOURCES_VERIFIED_AT_LABEL,
  BANK_GUIDE_SUBTITLE,
  BANK_GUIDE_UPDATED_AT,
  UNUSED_SCENARIO_MONTHS,
  getBankOffer,
  offerAnnualLabel,
  offerMonthlyLabel,
  offerRegularThreeMonthsLabel,
  offerUnusedMonthlyLabel,
  offerUnusedThreeMonthsLabel,
} from "@/site/banque-petit-salaire";

const SMIC_HREF = "/smic";
const CALCULATOR_HREF = "/";
const PRIME_ACTIVITE_HREF = "/guides/prime-activite";

const boursobank = getBankOffer("boursobank-welcome");
const fortuneo = getBankOffer("fortuneo-fosfo");
const hello = getBankOffer("hello-one");
const monabanq = getBankOffer("monabanq-pratiq-plus");

/**
 * Guide comparatif : quelle banque choisir avec un petit salaire ?
 * URL canonique : /banque-petit-salaire
 *
 * BROUILLON : présent dans `draftGuides` uniquement (pas dans le registre publié).
 * Voir `src/drafts/banque-petit-salaire/README.md`.
 */
export const banquePetitSalaireGuide: Guide = {
  slug: BANK_GUIDE_SLUG,
  publicPath: BANK_GUIDE_PATH,
  breadcrumbLabel: BANK_GUIDE_BREADCRUMB,
  title: BANK_GUIDE_H1,
  seoTitle: BANK_GUIDE_SEO_TITLE,
  description: BANK_GUIDE_META_DESCRIPTION,
  subtitle: BANK_GUIDE_SUBTITLE,
  publishedAt: BANK_GUIDE_PUBLISHED_AT,
  updatedAt: BANK_GUIDE_UPDATED_AT,
  includeFaqSchema: false,
  introduction: [
    "Vous cherchez une banque adaptée à un petit salaire ou à un revenu proche du SMIC ? Nous comparons quatre banques, leurs frais et leurs services pour vous aider à choisir un compte adapté à votre budget.",
    "Sélection non exhaustive, présentée par ordre alphabétique, sans classement.",
  ],
  sections: [
    {
      id: "offres-decryptees",
      title: "Les offres décryptées",
      blocks: [
        {
          type: "paragraph",
          text: "Détail de chaque offre, dans le même ordre alphabétique que les cartes.",
        },
      ],
      subsections: [
        {
          id: boursobank.decryptAnchor,
          title: "BoursoBank : Welcome, un compte à 0 € sans condition d'usage de la carte",
          blocks: [
            {
              type: "paragraph",
              text: `${boursobank.whyInSelection} BoursoBank, anciennement Boursorama Banque, commercialise Welcome sans condition de revenus, avec une carte Visa Classic à débit immédiat et autorisation systématique. La brochure applicable au ${boursobank.tariffEffectiveFrom} indique une carte physique ou dématérialisée gratuite sans condition d'utilisation pour les Welcome commandées à partir du 27 février 2026, hors refabrication et renouvellement.`,
            },
            {
              type: "paragraph",
              text: `Le coût fixe est donc de ${offerMonthlyLabel(boursobank)} par mois, soit ${offerAnnualLabel(boursobank)} sur 12 mois, si l'on s'en tient à la cotisation. Les paiements et retraits en euros sont décrits comme gratuits et illimités. L'offre convient à un usage quotidien par carte, y compris irrégulier, dès lors que la carte commandée est bien la Welcome récente.`,
            },
            {
              type: "paragraph",
              text: "Pour ouvrir le compte, un premier versement d'activation est demandé ; ce n'est pas un frais. Un RIB à votre nom en France peut être demandé. La domiciliation du salaire n'est pas exigée.",
            },
            {
              type: "list",
              items: [
                "Avantage : pas de revenu minimum, pas de cotisation liée à l'usage de la carte récente.",
                "Avantage : retraits en euros sans quota publié, utiles si vous sortez souvent des espèces.",
                "Limite : pas de dépôt d'espèces en agence, et remise de chèque plafonnée à 250 € sur 30 jours glissants.",
                "Limite : une Welcome commandée jusqu'au 27 février 2026 reste facturée 5 € par mois sans paiement par carte. Ultim n'est pas l'offre retenue ici : sa carte physique coûte 9 € par mois si elle n'est pas utilisée.",
              ],
            },
            {
              type: "paragraph",
              text: "Une autre offre de cette sélection peut convenir davantage si vous devez déposer des espèces, parler souvent à un conseiller, ou si vous voulez un parcours d'ouverture à 0 € via une application.",
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Offre officielle :",
              label: S.boursobankWelcome.label,
              href: S.boursobankWelcome.href,
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Brochure tarifaire :",
              label: S.boursobankTariffs.label,
              href: S.boursobankTariffs.href,
            },
          ],
        },
        {
          id: fortuneo.decryptAnchor,
          title: "Fortuneo : Fosfo, gratuité liée à un paiement par carte chaque mois",
          blocks: [
            {
              type: "paragraph",
              text: `${fortuneo.whyInSelection} Fosfo CB Mastercard est à débit immédiat, sans condition de revenus. Les conditions tarifaires au ${fortuneo.tariffEffectiveFrom} la disent gratuite sous réserve d'une opération de paiement par carte par mois civil. Un retrait au distributeur ne compte pas. À défaut, Fortuneo prélève ${offerUnusedMonthlyLabel(fortuneo)} le mois suivant.`,
            },
            {
              type: "paragraph",
              text: `Si vous payez une fois par carte chaque mois, le coût fixe est de ${offerMonthlyLabel(fortuneo)}, soit ${offerAnnualLabel(fortuneo)} sur 12 mois. L'offre convient à quelqu'un qui fait ses courses ou règle un abonnement par carte, même avec un petit revenu. Elle convient moins à une personne qui ne ferait que retirer des espèces.`,
            },
            {
              type: "paragraph",
              text: "L'ouverture via l'application Fosfo se fait à 0 €. Via le site, un versement de 50 € et un compte en France sont demandés. La domiciliation du salaire n'est pas exigée.",
            },
            {
              type: "list",
              items: [
                "Avantage : pas de revenu minimum, contrairement à Gold (2 200 € nets), exclue de cette sélection.",
                "Avantage : retraits et paiements en euros décrits comme gratuits, sans quota de DAB publié pour Fosfo.",
                "Limite : 3 € par mois sans paiement carte, soit 9 € sur trois mois sans achat.",
                "Limite : le parcours site demande 50 € et un RIB français ; seul le parcours application Fosfo s'ouvre à 0 €.",
              ],
            },
            {
              type: "paragraph",
              text: "Hello One peut être plus souple si un simple retrait doit aussi valoir pour la gratuité. Welcome récente évite toute condition d'usage. La prime de 80 € mise en avant par Fortuneo concerne la carte Gold, pas Fosfo.",
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Offre officielle :",
              label: S.fortuneoAccount.label,
              href: S.fortuneoAccount.href,
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Brochure tarifaire :",
              label: S.fortuneoTariffs.label,
              href: S.fortuneoTariffs.href,
            },
          ],
        },
        {
          id: hello.decryptAnchor,
          title: "Hello bank! : Hello One, 0 € si un paiement ou un retrait dans le mois",
          blocks: [
            {
              type: "paragraph",
              text: `${hello.whyInSelection} L'offre groupée comprend un compte de dépôt individuel sans frais de tenue de compte et une carte Visa Hello One à autorisation systématique. Elle s'adresse à une personne majeure capable, résidente en France, sans minimum de revenus, sous réserve d'acceptation.`,
            },
            {
              type: "paragraph",
              text: `La cotisation est de ${offerMonthlyLabel(hello)} si au moins un paiement ou un retrait a lieu dans le mois calendaire, sinon ${offerUnusedMonthlyLabel(hello)}. Sur 12 mois d'usage conforme, le coût fixe est de ${offerAnnualLabel(hello)}. Un mois incomplet de détention n'est pas facturé, selon la brochure au ${hello.tariffEffectiveFrom}. L'offre convient à un usage mixte, y compris si vous retirez plus que vous ne payez.`,
            },
            {
              type: "paragraph",
              text: "L'ouverture est à 0 € si l'identification biométrique aboutit. Sinon un versement initial de 10 € à 300 € est demandé depuis un compte à votre nom. La domiciliation du salaire n'est pas exigée.",
            },
            {
              type: "list",
              items: [
                "Avantage : un retrait suffit à la gratuité, contrairement à Fosfo.",
                "Avantage : dépôts de chèques (scan puis courrier, ou automate) et versements d'espèces aux automates BNP Paribas / Cash Services.",
                "Limite : hors réseau Cash Services, BNP Paribas et filiales, des frais de retrait peuvent s'appliquer. Le montant exact pour Hello One n'est pas isolé ici, le tableau tarifaire mélange plusieurs colonnes.",
                "Hello Prime, à partir de 1 500 € nets, est hors sujet pour cette page.",
              ],
            },
            {
              type: "paragraph",
              text: "Si vous n'utilisez presque jamais la carte, Welcome récente reste plus prévisible. Si vous voulez un conseiller et des dépôts dans le réseau Crédit Mutuel / CIC, Pratiq+ peut justifier son forfait.",
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Offre officielle :",
              label: S.helloOne.label,
              href: S.helloOne.href,
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Brochure tarifaire :",
              label: S.helloTariffs.label,
              href: S.helloTariffs.href,
            },
          ],
        },
        {
          id: monabanq.decryptAnchor,
          title: "Monabanq : Pratiq+, un forfait payant pour les dépôts et le conseiller",
          blocks: [
            {
              type: "paragraph",
              text: `${monabanq.whyInSelection} Pratiq+ est l'offre groupée actuellement commercialisée à ${offerMonthlyLabel(monabanq)}, soit ${offerAnnualLabel(monabanq)} par an, d'après le guide de tarification au ${monabanq.tariffEffectiveFrom}. L'ancien tarif à 2 € ou 3 € n'est plus celui de cette formule. Il n'y a pas de condition de revenus. La carte Visa est incluse.`,
            },
            {
              type: "paragraph",
              text: "Le forfait n'est pas une carte gratuite. Il peut malgré tout convenir à un petit budget si vous déposez des chèques, si vous avez parfois besoin d'espèces, et surtout si vous voulez un conseiller au téléphone, y compris le samedi. Le plafond de paiement publié pour un compte individuel est de 1 500 € sur 30 jours glissants, réajustable selon les revenus.",
            },
            {
              type: "paragraph",
              text: "Un premier versement d'activation est demandé ; le montant exact n'est pas publié de façon univoque. Il faut déjà détenir un compte à votre nom en France, dans l'EEE ou un pays SEPA équivalent (Royaume-Uni exclu). La domiciliation du salaire n'est pas exigée.",
            },
            {
              type: "list",
              items: [
                "Avantage : service client humain (téléphone, tchat, e-mail) avec des horaires larges.",
                "Avantage : 3 dépôts de chèques gratuits par trimestre dans le réseau Crédit Mutuel, CIC ou Cash Services.",
                "Limite : 46,80 € de cotisation sur 12 mois, dus même si vous n'utilisez pas la carte.",
                "Limite : un compte dans une banque SEPA éligible est exigé, Royaume-Uni exclu. Le montant du premier versement n'est pas confirmé ici.",
              ],
            },
            {
              type: "paragraph",
              text: "Si vous payez surtout par carte et n'avez pas besoin d'agence partenaire, Welcome, Fosfo ou Hello One évitent cette cotisation. Uniq (6 €) et Uniq+ (12 €) n'apportent pas, pour ce public, un service qui justifie le surcoût dans cette sélection.",
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Offre officielle :",
              label: S.monabanqAccount.label,
              href: S.monabanqAccount.href,
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Brochure tarifaire :",
              label: S.monabanqTariffs.label,
              href: S.monabanqTariffs.href,
            },
          ],
        },
      ],
    },
    {
      id: "frais-conditions",
      title: "Frais et conditions : le comparatif en un coup d'œil",
      blocks: [
        {
          type: "paragraph",
          text: "Coût mensuel lorsque les conditions de l'offre sont respectées, puis coût fixe sur 12 mois. Un premier versement n'est pas un frais : l'argent reste sur le compte.",
        },
        {
          type: "table",
          caption: `Frais fixes et conditions, vérifiés le ${BANK_GUIDE_SOURCES_VERIFIED_AT_LABEL}.`,
          headers: [
            "Banque",
            "Revenus",
            "Tarif mensuel",
            "Si la carte n'est pas utilisée",
            "Coût annuel",
          ],
          stackOnMobile: true,
          rowHeader: true,
          accent: "brand",
          rows: [
            [
              boursobank.bankName,
              "Sans minimum",
              offerMonthlyLabel(boursobank),
              "0 € (Welcome récente)",
              offerAnnualLabel(boursobank),
            ],
            [
              fortuneo.bankName,
              "Sans minimum",
              offerMonthlyLabel(fortuneo),
              "3 € par mois",
              offerAnnualLabel(fortuneo),
            ],
            [
              hello.bankName,
              "Sans minimum",
              offerMonthlyLabel(hello),
              "6 € par mois",
              offerAnnualLabel(hello),
            ],
            [
              monabanq.bankName,
              "Sans minimum",
              offerMonthlyLabel(monabanq),
              "Cotisation due",
              offerAnnualLabel(monabanq),
            ],
          ],
        },
      ],
    },
    {
      id: "quelle-offre",
      title: "Quelle offre correspond à vos habitudes ?",
      blocks: [
        {
          type: "paragraph",
          text: "Selon que vous payez par carte, retirez des espèces, déposez un chèque ou voulez parler à un conseiller, l'offre utile n'est pas forcément la même.",
        },
      ],
    },
    {
      id: "ouvrir-compte-smic",
      title: "Peut-on ouvrir un compte quand on gagne le SMIC ?",
      blocks: [
        {
          type: "paragraph",
          text: "Oui, le montant du salaire ne suffit pas, à lui seul, à fermer ou à ouvrir l'accès. Les quatre offres retenues n'imposent pas de revenu minimum. D'autres conditions restent applicables : justificatifs, résidence, premier versement, compte préexistant éventuel, et acceptation de la banque.",
        },
        {
          type: "list",
          items: [
            "Revenu minimum : aucune des offres retenues n'en fixe un. Cela ne veut pas dire « sans justificatif », « sans contrôle » ou « ouverture garantie ».",
            "Justificatif de revenus : il peut être demandé pour une autre carte de la même banque, par exemple Fortuneo Gold, sans l'être pour Fosfo.",
            "Domiciliation du salaire : non exigée pour ces quatre formules. La banque peut la proposer, notamment pour une prime de mobilité, sans en faire une condition d'entrée.",
            "Versement initial : c'est de l'argent déposé, pas un frais. Fortuneo Fosfo via l'application et Hello One en biométrie permettent 0 €. Ailleurs, un petit versement d'activation est souvent demandé.",
            "Utilisation mensuelle de la carte : distincte de l'ouverture. Elle déclenche ou non la gratuité chez Fortuneo et Hello bank!.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le montant du SMIC et ses explications, sans en faire un net unique :",
          label: "voir la page SMIC",
          href: SMIC_HREF,
        },
      ],
    },
    {
      id: "gratuite-retraits-incidents",
      title: "Gratuité, retraits, incidents : quels frais regarder ?",
      blocks: [
        {
          type: "paragraph",
          text: "Une carte « gratuite sous condition » n'est gratuite que si le geste prévu a bien lieu dans le mois : un paiement chez Fortuneo, un paiement ou un retrait chez Hello bank!. Welcome récente n'a plus cette condition. Pratiq+ n'est pas gratuite : c'est un forfait.",
        },
        {
          type: "list",
          items: [
            "Frais de non-utilisation : 3 € chez Fortuneo Fosfo, 6 € chez Hello One, 0 € pour Welcome récente, sans pénalité distincte chez Pratiq+.",
            "Retraits hors réseau : illimités en euros chez BoursoBank et Fortuneo selon les brochures. Chez Hello One, le gratuit se lit d'abord sur Cash Services, BNP Paribas et filiales.",
            "Dépôts facturés : chèques au-delà du quota Monabanq (2 €), espèces Monabanq au-delà d'un dépôt trimestriel (9 € selon la brochure). BoursoBank plafonne la remise de chèque.",
            "Options ajoutées : assurances moyens de paiement, seconde carte, visuel, ne font pas partie du coût fixe retenu ici.",
            "Découvert et incidents : un découvert n'est jamais garanti. Les frais d'incidents (rejet, commission d'intervention) sont hors de cette comparaison : aucune simulation inventée n'est proposée.",
          ],
        },
        {
          type: "table",
          caption: `Frais fixes sur ${UNUSED_SCENARIO_MONTHS} mois, hors incidents.`,
          headers: [
            "Banque",
            "Trois mois d'usage conforme",
            "Trois mois sans l'opération requise",
          ],
          stackOnMobile: true,
          rowHeader: true,
          accent: "brand",
          rows: [
            [
              boursobank.bankName,
              offerRegularThreeMonthsLabel(boursobank),
              offerUnusedThreeMonthsLabel(boursobank),
            ],
            [
              fortuneo.bankName,
              offerRegularThreeMonthsLabel(fortuneo),
              offerUnusedThreeMonthsLabel(fortuneo),
            ],
            [
              hello.bankName,
              offerRegularThreeMonthsLabel(hello),
              offerUnusedThreeMonthsLabel(hello),
            ],
            [
              monabanq.bankName,
              offerRegularThreeMonthsLabel(monabanq),
              offerUnusedThreeMonthsLabel(monabanq),
            ],
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Lecture : trois mois sans l'opération requise coûtent ${offerUnusedThreeMonthsLabel(boursobank)} avec Welcome récente, ${offerUnusedThreeMonthsLabel(fortuneo)} avec Fosfo, ${offerUnusedThreeMonthsLabel(hello)} avec Hello One, et ${offerUnusedThreeMonthsLabel(monabanq)} avec Pratiq+ (simple cotisation, pas une pénalité). Sur 12 mois d'usage conforme, les coûts fixes sont ${offerAnnualLabel(boursobank)}, ${offerAnnualLabel(fortuneo)}, ${offerAnnualLabel(hello)} et ${offerAnnualLabel(monabanq)}.`,
          ],
        },
      ],
    },
    {
      id: "banque-payante",
      title: "Une banque payante peut-elle être intéressante avec un petit budget ?",
      blocks: [
        {
          type: "paragraph",
          text: "Oui, si un service réellement utilisé justifie le prix. Monabanq Pratiq+ coûte 3,90 € par mois, soit 46,80 € par an. Ce n'est intéressant que si vous utilisez ce que le forfait contient et que les offres à 0 € ne couvrent pas : un conseiller humain, des dépôts de chèques dans un automate partenaire, éventuellement un dépôt d'espèces.",
        },
        {
          type: "paragraph",
          text: "Comparer 46,80 € à un besoin concret, pas à une économie inventée. Si vous ne déposez jamais de chèque et gérez tout sur une application, payer ce forfait n'apporte rien. À l'inverse, une offre à 0 € qui facture 6 € dès qu'un mois se passe sans carte peut coûter plus cher qu'un forfait connu, si votre usage est irrégulier.",
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Cette page ne recommande pas une formule payante pour ses assurances voyage, son cashback ou d'autres avantages premium inutiles au profil visé. Uniq et Uniq+ restent hors sélection pour cette raison.",
          ],
        },
      ],
    },
    {
      id: "difficultes-bancaires",
      title: "Petit salaire ou difficultés bancaires : quelles autres solutions ?",
      blocks: [
        {
          type: "paragraph",
          text: "Un salaire modeste, une fragilité financière reconnue, un refus d'ouverture et une interdiction bancaire sont quatre situations distinctes. Gagner le SMIC ne donne pas automatiquement droit à l'offre clientèle fragile. Un compte commercial de cette page n'est pas une solution garantie à une interdiction d'émettre des chèques.",
        },
        {
          type: "list",
          items: [
            "Salaire modeste : les offres comparées ici visent ce cas, avec leurs conditions ordinaires.",
            "Fragilité financière : la banque applique des critères réglementaires (surendettement, inscription FCC, incidents répétés, ressources sous un seuil qu'elle fixe). Elle doit proposer l'offre spécifique, que le client peut refuser.",
            "Offre clientèle fragile : au plus 3 € par mois, avec un plafonnement des frais d'incidents à 20 € par mois et 200 € par an, selon la Banque de France. Elle n'inclut en principe ni chéquier ni découvert.",
            "Refus d'ouverture : la banque peut refuser, même sans revenu minimum affiché. Une absence de réponse sous 15 jours vaut refus. Elle doit remettre une lettre et indiquer le droit au compte.",
            "Droit au compte : si vous n'avez aucun compte de dépôt en France, la Banque de France désigne un établissement qui doit ouvrir un compte avec les services bancaires de base, gratuits. L'interdit bancaire n'empêche pas cette procédure.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Service-Public, vérifié le 19 octobre 2026 :",
          label: S.servicePublicDroitAuCompte.label,
          href: S.servicePublicDroitAuCompte.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Banque de France, droit au compte :",
          label: S.bdfDroitAuCompte.label,
          href: S.bdfDroitAuCompte.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Banque de France, offre clientèle fragile :",
          label: S.bdfOffreFragile.label,
          href: S.bdfOffreFragile.href,
        },
      ],
    },
    {
      id: "methode-selection",
      title: "Comment avons-nous sélectionné ces offres ?",
      blocks: [
        {
          type: "paragraph",
          text: "La sélection est courte et non exhaustive. Elle vise un compte individuel, pour un usage personnel en France, avec une attention aux faibles revenus et au budget. Les frais fixes et les conditions d'usage ont été lus avant les promotions. Aucun classement, aucune note, aucun test utilisateur n'est revendiqué.",
        },
        {
          type: "list",
          items: [
            "BoursoBank Welcome, Fortuneo Fosfo, Hello bank! Hello One et Monabanq Pratiq+ : accessibilité, coût récurrent, conditions et limites vérifiables.",
            "BforBank BforBASIC a été examinée : 0 € avec un paiement ou un retrait, sinon 2 €, mais seulement 3 retraits euros gratuits puis 1 €, sans chéquier. Elle n'ajoute pas, pour ce public, un service absent des offres retenues.",
            "Revolut, N26 et Nickel n'ont pas été ajoutés : leur statut, leur réseau de dépôt ou leur usage ne se confondent pas avec un compte courant de banque en ligne de cette sélection.",
            "Les primes de bienvenue, y compris celles négociées par d'autres comparateurs, n'entrent pas dans le coût annuel structurel. Cette page n'affiche pas de montant promotionnel dans les cartes.",
            "Les liens vers les banques sont des liens ordinaires, sans tracking partenaire sur cette page au lancement.",
          ],
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            `Sources consultées le ${BANK_GUIDE_SOURCES_VERIFIED_AT_LABEL}. En cas d'écart, le document tarifaire daté de chaque banque prime sur la page marketing.`,
          ],
        },
      ],
    },
  ],
  faq: [],
  conclusion: {
    title: "À retenir",
    keyPoints: [
      "Regardez d'abord le coût qui revient chaque mois et la condition de gratuité, pas la prime de bienvenue.",
      "Welcome, Fosfo et Hello One peuvent rester à 0 € ; Pratiq+ coûte 3,90 € si le service humain et les dépôts vous sont utiles.",
      "Un salaire proche du SMIC n'ouvre pas à lui seul le droit au compte ni l'offre clientèle fragile.",
    ],
    closingText:
      "Avant d'ouvrir un compte, comparez vos usages, relisez le tarif en vigueur et les conditions de l'offre retenue.",
    closingCta: {
      label: "Estimer son salaire net",
      href: CALCULATOR_HREF,
    },
    furtherReading: {
      title: "Pour aller plus loin",
      items: [
        {
          title: "SMIC",
          description: "Montants officiels du salaire minimum, distincts d'un net unique.",
          href: SMIC_HREF,
        },
        {
          title: "Calculateur brut vers net",
          description: "Estimer le net à partir d'un brut, pour situer son budget.",
          href: CALCULATOR_HREF,
        },
        {
          title: "Prime d'activité",
          description: "Conditions et simulateur officiel, utiles avec un petit salaire.",
          href: PRIME_ACTIVITE_HREF,
        },
      ],
    },
  },
  sidebar: {
    calculator: {
      title: "Calculateur brut vers net",
      description: "Estimez votre salaire net à partir du brut.",
      href: CALCULATOR_HREF,
    },
    relatedGuides: [
      { title: "SMIC", href: SMIC_HREF },
      { title: "Prime d'activité", href: PRIME_ACTIVITE_HREF },
      { title: "Salaire moyen en France", href: "/salaire-moyen-france" },
    ],
  },
};
