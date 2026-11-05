/**
 * Source de vérité éditoriale : /banque-petit-salaire
 *
 * Tarifs et conditions centralisés. Une correction se propage aux cartes,
 * tableaux et exemples sans recopier les montants.
 *
 * Dates published/updated à figer au jour réel de publication.
 */

import { annualCents, formatCents, monthsCostCents } from "./engine";

export const BANK_GUIDE_SLUG = "banque-petit-salaire";
export const BANK_GUIDE_PATH = "/banque-petit-salaire";

export const BANK_GUIDE_PUBLISHED_AT = "2026-11-01T00:00:00+01:00";
export const BANK_GUIDE_UPDATED_AT = "2026-11-01T00:00:00+01:00";
export const BANK_GUIDE_UPDATED_AT_LABEL = "1er novembre 2026";
export const BANK_GUIDE_SOURCES_VERIFIED_AT = "2026-11-01";
export const BANK_GUIDE_SOURCES_VERIFIED_AT_LABEL = "1er novembre 2026";

export const BANK_GUIDE_H1 = "Quelle banque choisir avec un petit salaire ?";
export const BANK_GUIDE_SEO_TITLE = "Quelle banque choisir avec un petit salaire ? | Brut vers Net";
export const BANK_GUIDE_META_DESCRIPTION =
  "Au SMIC ou avec un petit revenu, comparez les frais, les conditions d'accès et les services utiles pour choisir une banque adaptée à votre budget.";
export const BANK_GUIDE_BREADCRUMB = "Banque petit salaire";
export const BANK_GUIDE_SUBTITLE =
  "Frais récurrents, conditions de gratuité et usages quotidiens, pour un compte individuel en France.";

export const UNUSED_SCENARIO_MONTHS = 3;

export const BANK_GUIDE_SOURCES = {
  boursobankWelcome: {
    org: "BoursoBank",
    label: "Carte Welcome",
    href: "https://www.boursobank.com/banque/carte-bancaire-gratuite-welcome",
  },
  boursobankWelcomeBonus: {
    org: "BoursoBank",
    label: "Offre de bienvenue Welcome (jusqu'à 180 €)",
    href: "https://www.boursobank.com/banque/carte-bancaire-gratuite-welcome",
    effectiveFrom: "6 octobre 2026",
  },
  boursobankAccount: {
    org: "BoursoBank",
    label: "Compte bancaire",
    href: "https://www.boursobank.com/banque/compte-bancaire",
  },
  boursobankTariffs: {
    org: "BoursoBank",
    label: "Brochure tarifaire applicable au 5 octobre 2026",
    href: "https://www.boursobank.com/content/brochure_tarifaire/boursorama_bt-new.pdf",
    effectiveFrom: "5 octobre 2026",
  },
  fortuneoAccount: {
    org: "Fortuneo",
    label: "Compte bancaire",
    href: "https://www.fortuneo.fr/compte-bancaire",
  },
  fortuneoCardGrant: {
    org: "Fortuneo",
    label: "Conditions d'octroi des cartes",
    href: "https://www.fortuneo.fr/compte-bancaire/conditions-octroi-carte-bancaire",
  },
  fortuneoUnusedFaq: {
    org: "Fortuneo",
    label: "Frais de non-utilisation de la carte",
    href: "https://www.fortuneo.fr/faq/a-quoi-correspondent-les-frais-de-non-utilisation-de-la-carte-sur-mon-compte-courant",
  },
  fortuneoTariffs: {
    org: "Fortuneo",
    label: "Conditions tarifaires au 6 août 2026",
    href: "https://www.fortuneo.fr/datas/files/tarifs_fortuneo.pdf",
    effectiveFrom: "6 août 2026",
  },
  helloOne: {
    org: "Hello bank!",
    label: "Offre Hello One",
    href: "https://www.hellobank.fr/fr/offre/compte-et-cartes/hello-one/",
  },
  helloOneWelcome: {
    org: "Hello bank!",
    label: "Prime de bienvenue Hello One (80 €)",
    href: "https://www.hellobank.fr/fr/offre/compte-et-cartes/hello-one/",
    validUntil: "8 décembre 2026",
  },
  helloTariffsPage: {
    org: "Hello bank!",
    label: "Page tarifs",
    href: "https://www.hellobank.fr/fr/tarifs/",
  },
  helloConditions: {
    org: "Hello bank!",
    label: "Conditions et réglementations",
    href: "https://www.hellobank.fr/fr/conditions-reglementations/",
  },
  helloTariffs: {
    org: "Hello bank!",
    label: "Brochure tarifaire au 1er octobre 2026",
    href: "https://www.hellobank.fr/content/dam/hellobank/rsc/contrib/document/pdf/tarifs-hellobank.pdf",
    effectiveFrom: "1er octobre 2026",
  },
  monabanqAccount: {
    org: "Monabanq",
    label: "Compte courant Pratiq+",
    href: "https://www.monabanq.com/fr/produits/compte_courant.html",
  },
  monabanqWelcome: {
    org: "Monabanq",
    label: "Prime d'ouverture de compte (jusqu'à 80 €)",
    href: "https://www.monabanq.com/fr/produits/compte_courant.html",
    effectiveFrom: "1er juillet 2026",
  },
  monabanqTariffs: {
    org: "Monabanq",
    label: "Guide de tarification au 1er octobre 2026",
    href: "https://www.monabanq.com/fr/pdf/tarifications/monabanq_tarification-no.pdf",
    effectiveFrom: "1er octobre 2026",
  },
  servicePublicDroitAuCompte: {
    org: "Service-Public",
    label: "Droit au compte (F2417)",
    href: "https://www.service-public.fr/particuliers/vosdroits/F2417",
  },
  bdfDroitAuCompte: {
    org: "Banque de France",
    label: "Droit au compte",
    href: "https://www.banque-france.fr/fr/a-votre-service/intervenants-sociaux/droit-au-compte",
  },
  bdfOffreFragile: {
    org: "Banque de France",
    label: "Plafonnement des frais et offre clientèle fragile",
    href: "https://www.banque-france.fr/fr/a-votre-service/particuliers/connaitre-pratiques-bancaires-assurance/compte-frais/le-plafonnement-des-frais-bancaires-et-loffre-clientele-fragile",
  },
} as const;

export type BankOfferId =
  | "boursobank-welcome"
  | "fortuneo-fosfo"
  | "hello-one"
  | "monabanq-pratiq-plus";

export type BankCardBenefit = {
  prefix?: string;
  strong: string;
  suffix?: string;
};

export type BankCardPromo =
  | {
      kind: "welcome";
      amountCents: number;
      isMaximum: boolean;
      sourceUrl: string;
      periodLabel: string;
    }
  | {
      kind: "tariff";
      amountCents: number;
      suffix: string;
      hint?: string;
    };

export type BankOffer = {
  id: BankOfferId;
  bankName: string;
  formerName?: string;
  offerName: string;
  shortLabel: string;
  cardName: string;
  debitType: string;
  initials: string;
  monthlyIfConditionsMetCents: number;
  unusedMonthlyCents: number;
  freeCondition: string;
  unusedFeeLabel: string;
  incomeCondition: string;
  domiciliation: string;
  initialDeposit: string;
  needsExistingAccount: string;
  euroPayments: string;
  euroWithdrawals: string;
  atmNetwork: string;
  checkDeposit: string;
  cashDeposit: string;
  humanSupport: string;
  overdraft: string;
  tariffEffectiveFrom: string;
  productUrl: string;
  tariffUrl: string;
  decryptAnchor: string;
  benefits: [string, string, ...string[]];
  limit: string;
  usageProfile: string;
  whyInSelection: string;
  cardCondition: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  logoDisplay: "wide" | "mark";
  cardSubtitle: string;
  tariffHint: string;
  actionLead: string;
  notice: string;
  noIncomeMinimum: boolean;
  promo: BankCardPromo;
  cardBenefits: readonly BankCardBenefit[];
};

const BOURSOBANK_WELCOME: BankOffer = {
  id: "boursobank-welcome",
  bankName: "BoursoBank",
  formerName: "Boursorama Banque",
  offerName: "Welcome",
  shortLabel: "BoursoBank Welcome",
  cardName: "Visa Classic Welcome",
  debitType: "Débit immédiat, autorisation systématique",
  initials: "BB",
  monthlyIfConditionsMetCents: 0,
  unusedMonthlyCents: 0,
  freeCondition:
    "Carte physique ou dématérialisée gratuite sans condition d'utilisation, pour une Welcome commandée à partir du 27 février 2026 (hors refabrication et renouvellement).",
  unusedFeeLabel:
    "Aucun frais de non-utilisation pour une Welcome commandée à partir du 27 février 2026. Une Welcome commandée jusqu'à cette date reste facturée 5 € par mois sans paiement par carte.",
  incomeCondition: "Sans condition de revenus",
  domiciliation: "Non exigée pour l'offre Welcome",
  initialDeposit:
    "Un premier versement est demandé pour activer le compte. Ce n'est pas un frais : l'argent reste sur le compte. Le parcours public mentionne des paliers de prime à partir de 1 €, sans en faire un minimum d'ouverture élevé.",
  needsExistingAccount:
    "Un RIB à votre nom dans un établissement en France est demandé le cas échéant. L'ouverture reste soumise à l'acceptation de la banque. Le compte ne doit pas être débiteur pour l'octroi de la carte.",
  euroPayments: "Paiements en euros gratuits et illimités",
  euroWithdrawals: "Retraits en euros gratuits et illimités",
  atmNetwork: "Tous DAB en euros, sans quota publié pour Welcome",
  checkDeposit:
    "Encaissement de chèques possible. La brochure limite la remise de chèque à 250 € sur 30 jours glissants (hors offre professionnelle).",
  cashDeposit: "Pas de dépôt ni de retrait d'espèces en agence",
  humanSupport: "Aide 24h/24 via le chatbot Bourso.IA. Pas de conseiller d'agence mis en avant.",
  overdraft:
    "Un découvert autorisé peut exister après étude. Il n'est jamais présenté ici comme acquis à l'ouverture.",
  tariffEffectiveFrom: BANK_GUIDE_SOURCES.boursobankTariffs.effectiveFrom,
  productUrl: BANK_GUIDE_SOURCES.boursobankWelcome.href,
  tariffUrl: BANK_GUIDE_SOURCES.boursobankTariffs.href,
  decryptAnchor: "boursobank-welcome",
  benefits: [
    "0 € de cotisation, sans revenu minimum",
    "Carte récente sans frais de non-utilisation",
    "Paiements et retraits en euros illimités",
  ],
  limit: "Banque 100 % en ligne, sans dépôt d'espèces en agence.",
  cardCondition:
    "Gratuit sans condition d'utilisation pour une Welcome commandée à partir du 27 février 2026.",
  logoSrc: "/images/banques/boursobank.png",
  logoWidth: 350,
  logoHeight: 109,
  logoDisplay: "wide",
  cardSubtitle: "Compte individuel · Welcome",
  tariffHint: "sans condition d'utilisation",
  actionLead: "Un compte pour payer par carte au quotidien",
  notice:
    "la gratuité sans usage de la carte concerne les Welcome commandées à partir du 27 février 2026. Pas de dépôt d'espèces en agence.",
  noIncomeMinimum: true,
  promo: {
    kind: "welcome",
    amountCents: 18000,
    isMaximum: true,
    sourceUrl: BANK_GUIDE_SOURCES.boursobankWelcomeBonus.href,
    periodLabel: BANK_GUIDE_SOURCES.boursobankWelcomeBonus.effectiveFrom,
  },
  cardBenefits: [
    { prefix: "Compte à ", strong: "0 € / mois" },
    { strong: "Sans condition de revenus" },
    { prefix: "Paiements et retraits en euros ", strong: "sans frais" },
  ],
  usageProfile: "Paiements carte réguliers, peu d'espèces à déposer, budget serré.",
  whyInSelection:
    "C'est l'offre de la sélection sans condition de revenus et sans cotisation liée à l'usage de la carte, une fois la Welcome récente commandée.",
};

const FORTUNEO_FOSFO: BankOffer = {
  id: "fortuneo-fosfo",
  bankName: "Fortuneo",
  offerName: "Fosfo",
  shortLabel: "Fortuneo Fosfo",
  cardName: "Fosfo CB Mastercard",
  debitType: "Débit immédiat",
  initials: "F",
  monthlyIfConditionsMetCents: 0,
  unusedMonthlyCents: 300,
  freeCondition:
    "Carte gratuite sous réserve d'une opération de paiement par carte par mois civil, hors retrait DAB ou GAB.",
  unusedFeeLabel: "3 € par mois si aucun paiement par carte n'est constaté sur le mois civil.",
  incomeCondition: "Sans condition de revenus ni d'épargne chez Fortuneo",
  domiciliation: "Non exigée pour Fosfo",
  initialDeposit:
    "0 € via l'application pour Fosfo. 50 € via le site fortuneo.fr. Ce versement n'est pas un frais : il reste disponible sur le compte.",
  needsExistingAccount:
    "Un compte bancaire en France est demandé pour le parcours site (RIB et versement). Le parcours application Fosfo s'ouvre avec un justificatif d'identité et un selfie vidéo.",
  euroPayments: "Paiements en euros gratuits",
  euroWithdrawals: "Retraits en euros gratuits (hors frais éventuels du distributeur)",
  atmNetwork: "Tous DAB en euros, sans quota publié pour Fosfo",
  checkDeposit: "Remise de chèques en euros sur une banque française : gratuite",
  cashDeposit: "Pas de dépôt d'espèces en agence (banque en ligne)",
  humanSupport: "Service client joignable du lundi au samedi, par téléphone, e-mail et chat.",
  overdraft:
    "Un découvert autorisé peut être étudié. Il n'est jamais présenté ici comme garanti.",
  tariffEffectiveFrom: BANK_GUIDE_SOURCES.fortuneoTariffs.effectiveFrom,
  productUrl: BANK_GUIDE_SOURCES.fortuneoAccount.href,
  tariffUrl: BANK_GUIDE_SOURCES.fortuneoTariffs.href,
  decryptAnchor: "fortuneo-fosfo",
  benefits: [
    "0 € si vous payez une fois par carte chaque mois",
    "Sans condition de revenus",
    "Retraits en euros sans quota publié",
  ],
  limit: "Un retrait d'espèces ne compte pas pour la gratuité. Sans paiement carte : 3 € par mois.",
  cardCondition:
    "Gratuit si un paiement par carte a lieu chaque mois civil. Un retrait ne compte pas.",
  logoSrc: "/images/banques/fortuneo.png",
  logoWidth: 500,
  logoHeight: 500,
  logoDisplay: "mark",
  cardSubtitle: "Compte individuel · Fosfo",
  tariffHint: "avec un paiement par carte / mois",
  actionLead: "Un compte pour vos dépenses du quotidien",
  notice: "3 € facturés pour un mois sans paiement par carte. Un retrait ne suffit pas.",
  noIncomeMinimum: true,
  promo: {
    kind: "tariff",
    amountCents: 0,
    suffix: "par mois",
    hint: "avec un paiement par carte",
  },
  cardBenefits: [
    { prefix: "Compte à ", strong: "0 € / mois", suffix: " avec un paiement carte" },
    { strong: "Sans condition de revenus" },
    { prefix: "Paiements et retraits en euros ", strong: "sans frais" },
  ],
  usageProfile: "Au moins un achat par carte chaque mois, y compris si vous retirez souvent.",
  whyInSelection:
    "Fosfo reste accessible sans revenu minimum, avec une cotisation nulle dès qu'un vrai paiement carte a lieu dans le mois.",
};

const HELLO_ONE: BankOffer = {
  id: "hello-one",
  bankName: "Hello bank!",
  offerName: "Hello One",
  shortLabel: "Hello bank! Hello One",
  cardName: "Visa Hello One",
  debitType: "Autorisation systématique",
  initials: "H",
  monthlyIfConditionsMetCents: 0,
  unusedMonthlyCents: 600,
  freeCondition:
    "0 € si au moins un paiement ou un retrait avec la carte Hello One a lieu dans le mois calendaire. Sinon 6 € par mois.",
  unusedFeeLabel: "6 € par mois sans paiement ni retrait carte dans le mois calendaire.",
  incomeCondition: "Sans minimum de revenus",
  domiciliation: "Non exigée. La domiciliation des revenus reste libre.",
  initialDeposit:
    "0 € si l'identification biométrique aboutit. Sinon versement initial de 10 € à 300 € depuis un compte à votre nom dans l'EEE ou un pays SEPA équivalent. Ce versement n'est pas un frais.",
  needsExistingAccount:
    "Un compte préexistant est nécessaire si la biométrie n'est pas finalisée, pour réaliser le versement initial. Résident français, majeur capable, usage non professionnel.",
  euroPayments: "Paiements par carte sans frais, en France comme à l'étranger selon la page produit",
  euroWithdrawals:
    "Gratuits aux automates Cash Services, BNP Paribas et filiales (réseaux Global Network et Global Alliance).",
  atmNetwork:
    "Réseau Cash Services, BNP Paribas et filiales. Hors de ce périmètre, des frais peuvent s'appliquer : le tableau de la brochure mélange plusieurs colonnes de cartes, le montant Hello One n'est donc pas repris ici comme un tarif catégorique.",
  checkDeposit:
    "Dépôt possible : scan dans l'application puis envoi postal, automate Cash Services, ou agence BNP Paribas.",
  cashDeposit: "Versement d'espèces possible dans un automate de dépôt BNP Paribas ou Cash Services, sans frais selon la brochure.",
  humanSupport:
    "Conseillers Hello Team au 0 800 848 400, du lundi au vendredi de 8 h à 20 h et le samedi de 8 h à 18 h.",
  overdraft:
    "La carte interroge le solde avant paiement. Un découvert n'est pas mis en avant comme un service de l'offre Hello One.",
  tariffEffectiveFrom: BANK_GUIDE_SOURCES.helloTariffs.effectiveFrom,
  productUrl: BANK_GUIDE_SOURCES.helloOne.href,
  tariffUrl: BANK_GUIDE_SOURCES.helloTariffs.href,
  decryptAnchor: "hello-one",
  benefits: [
    "0 € avec un paiement ou un retrait dans le mois",
    "Sans minimum de revenus",
    "Dépôt de chèques et d'espèces via Cash Services / BNP Paribas",
  ],
  limit:
    "Retraits gratuits surtout dans le réseau Cash Services et BNP Paribas. Sans usage de la carte : 6 € par mois.",
  cardCondition: "0 € avec un paiement ou un retrait dans le mois, sinon 6 €.",
  logoSrc: "/images/banques/hello-bank.png",
  logoWidth: 1415,
  logoHeight: 1557,
  logoDisplay: "mark",
  cardSubtitle: "Compte individuel · Hello One",
  tariffHint: "avec un paiement ou un retrait / mois",
  actionLead: "Un compte pour mixer carte, chèques et espèces",
  notice:
    "6 € par mois sans paiement ni retrait. Les retraits gratuits concernent surtout le réseau Cash Services et BNP Paribas.",
  noIncomeMinimum: true,
  promo: {
    kind: "welcome",
    amountCents: 8000,
    isMaximum: false,
    sourceUrl: BANK_GUIDE_SOURCES.helloOneWelcome.href,
    periodLabel: BANK_GUIDE_SOURCES.helloOneWelcome.validUntil,
  },
  cardBenefits: [
    { prefix: "Compte à ", strong: "0 € / mois", suffix: " avec un paiement ou un retrait" },
    { strong: "Sans condition de revenus" },
    { prefix: "Paiements par carte ", strong: "sans frais" },
  ],
  usageProfile: "Usages mixtes carte et espèces, besoin de déposer un chèque de temps en temps.",
  whyInSelection:
    "Hello One combine l'absence de revenu minimum, une gratuité possible via un retrait, et un accès physique aux automates du groupe BNP Paribas.",
};

const MONABANQ_PRATIQ_PLUS: BankOffer = {
  id: "monabanq-pratiq-plus",
  bankName: "Monabanq",
  offerName: "Pratiq+",
  shortLabel: "Monabanq Pratiq+",
  cardName: "Visa Classic Pratiq+",
  debitType: "Débit immédiat (différé possible plus tard, après étude)",
  initials: "M",
  monthlyIfConditionsMetCents: 390,
  unusedMonthlyCents: 390,
  freeCondition: "Aucune : cotisation de 3,90 € par mois, carte Visa incluse.",
  unusedFeeLabel:
    "Pas de pénalité de non-utilisation distincte : la cotisation de 3,90 € reste due chaque mois.",
  incomeCondition: "Sans condition de revenus",
  domiciliation: "Non exigée pour souscrire Pratiq+",
  initialDeposit:
    "Un premier versement est demandé pour activer le compte et recevoir la carte. Le montant exact n'est pas publié de façon univoque sur la page produit consultée. Ce versement, s'il est requis, reste de l'argent sur le compte.",
  needsExistingAccount:
    "Il faut déjà détenir un compte à votre nom dans une banque en France, dans l'EEE ou un pays SEPA équivalent (Royaume-Uni exclu). Résidence en France métropolitaine ou DROM-COM.",
  euroPayments: "Paiements en euros gratuits. Plafond de 1 500 € sur 30 jours glissants, ajustable selon les revenus.",
  euroWithdrawals: "Retraits en euros gratuits",
  atmNetwork: "Retraits en euros sans frais selon la brochure, sans quota de réseau distinct publié pour Pratiq+",
  checkDeposit:
    "3 dépôts de chèques gratuits par trimestre aux automates Crédit Mutuel, CIC ou Cash Services, puis 2 € par dépôt.",
  cashDeposit:
    "Brochure au 1er octobre 2026 : 1 dépôt d'espèces gratuit par trimestre aux automates Crédit Mutuel, CIC ou Cash Services, puis 9 €. La page produit résume parfois ces dépôts comme payants.",
  humanSupport:
    "Conseillers par téléphone, tchat et e-mail, du lundi au vendredi de 8 h à 21 h et le samedi de 8 h à 16 h 30 (0 800 006 526).",
  overdraft:
    "Une facilité de caisse peut être étudiée. Elle n'est jamais garantie. Le compte ne peut pas rester débiteur plus de 30 jours consécutifs.",
  tariffEffectiveFrom: BANK_GUIDE_SOURCES.monabanqTariffs.effectiveFrom,
  productUrl: BANK_GUIDE_SOURCES.monabanqAccount.href,
  tariffUrl: BANK_GUIDE_SOURCES.monabanqTariffs.href,
  decryptAnchor: "monabanq-pratiq-plus",
  benefits: [
    "Conseiller humain joignable, y compris le samedi",
    "Dépôts de chèques dans le réseau Crédit Mutuel / CIC",
    "Sans condition de revenus",
  ],
  limit: "3,90 € dus chaque mois, soit 46,80 € par an, même sans usage de la carte.",
  cardCondition: "Aucune gratuité : cotisation de 3,90 € par mois, carte Visa incluse.",
  logoSrc: "/images/banques/monabanq.png",
  logoWidth: 512,
  logoHeight: 512,
  logoDisplay: "mark",
  cardSubtitle: "Compte individuel · Pratiq+",
  tariffHint: "carte Visa incluse",
  actionLead: "Un forfait si vous avez besoin d'un conseiller",
  notice:
    "3,90 € dus chaque mois, soit 46,80 € par an, même sans usage de la carte. Plafond de paiement de 1 500 € sur 30 jours.",
  noIncomeMinimum: true,
  promo: {
    kind: "welcome",
    amountCents: 8000,
    isMaximum: true,
    sourceUrl: BANK_GUIDE_SOURCES.monabanqWelcome.href,
    periodLabel: BANK_GUIDE_SOURCES.monabanqWelcome.effectiveFrom,
  },
  cardBenefits: [
    { prefix: "Compte à ", strong: "3,90 € / mois" },
    { strong: "Sans condition de revenus" },
    { prefix: "Paiements et retraits en euros ", strong: "sans frais" },
  ],
  usageProfile: "Besoin de parler à quelqu'un et de déposer chèques ou espèces, même avec un petit budget.",
  whyInSelection:
    "C'est la seule offre payante retenue : le forfait achète un contact humain et des dépôts physiques, pas une carte premium.",
};

/** Ordre alphabétique des banques. Ce n'est pas un classement. */
export const BANK_OFFERS: readonly BankOffer[] = [
  BOURSOBANK_WELCOME,
  FORTUNEO_FOSFO,
  HELLO_ONE,
  MONABANQ_PRATIQ_PLUS,
];

export type BankNeedBlock = {
  id: string;
  need: string;
  answer: string;
};

export const BANK_NEED_BLOCKS: readonly BankNeedBlock[] = [
  {
    id: "paiements-carte",
    need: "Je paie régulièrement par carte",
    answer:
      "Welcome, Fosfo et Hello One peuvent rester à 0 €. Chez Fortuneo, un paiement par mois suffit. Chez Hello bank!, un paiement ou un retrait suffit.",
  },
  {
    id: "carte-rare",
    need: "J'utilise rarement ma carte",
    answer:
      "Welcome récente reste à 0 € sans usage. Fosfo facture 3 € et Hello One 6 € sans l'opération requise. Pratiq+ reste à 3,90 €, usage ou non.",
  },
  {
    id: "retraits",
    need: "Je retire souvent des espèces",
    answer:
      "BoursoBank et Fortuneo décrivent des retraits en euros sans quota publié. Hello One est gratuit surtout dans le réseau Cash Services et BNP Paribas. Un retrait ne rend pas Fosfo gratuite.",
  },
  {
    id: "depots",
    need: "Je dois déposer des chèques ou des espèces",
    answer:
      "Hello One couvre chèques et espèces via BNP Paribas / Cash Services. Pratiq+ permet des dépôts dans le réseau Crédit Mutuel / CIC. BoursoBank et Fortuneo n'offrent pas de dépôt d'espèces en agence.",
  },
  {
    id: "conseiller",
    need: "Je souhaite joindre un conseiller",
    answer:
      "Hello bank! et Monabanq mettent en avant un service humain, y compris le samedi chez Monabanq. Fortuneo propose un service client lundi-samedi. BoursoBank s'appuie surtout sur un chatbot.",
  },
  {
    id: "premier-versement",
    need: "J'ai peu d'argent pour un premier versement",
    answer:
      "Fosfo via l'application et Hello One en biométrie s'ouvrent à 0 €. Ailleurs, un versement d'activation est souvent demandé : ce n'est pas un frais, mais l'argent doit être disponible.",
  },
];

export function getBankOffer(id: BankOfferId): BankOffer {
  const offer = BANK_OFFERS.find((item) => item.id === id);
  if (!offer) {
    throw new Error(`Offre bancaire inconnue : ${id}`);
  }
  return offer;
}

export function offerAnnualIfUsed(offer: BankOffer): number {
  return annualCents(offer.monthlyIfConditionsMetCents);
}

export function offerUnusedThreeMonths(offer: BankOffer): number {
  return monthsCostCents(offer.unusedMonthlyCents, UNUSED_SCENARIO_MONTHS);
}

export function offerMonthlyLabel(offer: BankOffer): string {
  return formatCents(offer.monthlyIfConditionsMetCents);
}

export function offerAnnualLabel(offer: BankOffer): string {
  return formatCents(offerAnnualIfUsed(offer));
}

export function offerUnusedMonthlyLabel(offer: BankOffer): string {
  return formatCents(offer.unusedMonthlyCents);
}

export function offerUnusedThreeMonthsLabel(offer: BankOffer): string {
  return formatCents(offerUnusedThreeMonths(offer));
}

export function offerRegularThreeMonths(offer: BankOffer): number {
  return monthsCostCents(offer.monthlyIfConditionsMetCents, UNUSED_SCENARIO_MONTHS);
}

export function offerRegularThreeMonthsLabel(offer: BankOffer): string {
  return formatCents(offerRegularThreeMonths(offer));
}
