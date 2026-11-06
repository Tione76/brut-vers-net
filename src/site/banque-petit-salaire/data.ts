/**
 * Source de vérité éditoriale : /banque-petit-salaire (brouillon).
 *
 * Tarifs, primes, conditions et destinations centralisés.
 * Une correction se propage aux cartes, tableaux, analyses et JSON-LD.
 *
 * Vérification documentaire : 5 novembre 2026 (sources officielles banques +
 * Service-Public / Banque de France pour le droit au compte).
 */

import { annualCents, formatCents, monthsCostCents } from "./engine";

export const BANK_GUIDE_SLUG = "banque-petit-salaire";
export const BANK_GUIDE_PATH = "/banque-petit-salaire";

/** Dates figées manuellement, jamais recalculées au build. */
export const BANK_GUIDE_PUBLISHED_AT = "2026-11-01T00:00:00+01:00";
export const BANK_GUIDE_UPDATED_AT = "2026-11-05T00:00:00+01:00";
export const BANK_GUIDE_UPDATED_AT_LABEL = "5 novembre 2026";
export const BANK_GUIDE_SOURCES_VERIFIED_AT = "2026-11-05";
export const BANK_GUIDE_SOURCES_VERIFIED_AT_LABEL = "5 novembre 2026";

export const BANK_GUIDE_H1 = "Quelle banque choisir avec un petit salaire ?";
export const BANK_GUIDE_SEO_TITLE =
  "Quelle banque avec un petit salaire ? Comparatif (mis à jour)";
export const BANK_GUIDE_META_DESCRIPTION =
  "SMIC, temps partiel ou moins de 2 000 € nets : comparez quatre offres bancaires, leurs frais, leurs conditions et leurs services pour choisir votre compte.";
export const BANK_GUIDE_BREADCRUMB = "Banque petit salaire";
export const BANK_GUIDE_SUBTITLE =
  "Frais du quotidien, conditions de la carte et services utiles, pour un compte individuel en France.";

export const BANK_GUIDE_INTRO = [
  "Vous gagnez le SMIC, travaillez à temps partiel ou percevez moins de 2 000 € nets par mois ? Pour choisir votre banque, regardez surtout ce que le compte vous coûte au quotidien, les conditions de la carte et les services dont vous avez réellement besoin. Voici un comparatif de quatre offres pour vous aider à faire votre choix.",
] as const;

export const BANK_GUIDE_DISCLOSURE =
  "Sélection non exhaustive, présentée par ordre alphabétique, sans classement de qualité. Les liens mènent aux pages officielles des banques : aucun partenariat d'affiliation n'est configuré pour l'instant.";

export const UNUSED_SCENARIO_MONTHS = 3;

export const BANK_GUIDE_SOURCES = {
  boursobankWelcome: {
    org: "BoursoBank",
    label: "Carte Welcome",
    href: "https://www.boursobank.com/banque/carte-bancaire-gratuite-welcome",
    consultedAt: BANK_GUIDE_SOURCES_VERIFIED_AT,
  },
  boursobankWelcomeBonus: {
    org: "BoursoBank",
    label: "Offre de bienvenue Welcome (jusqu'à 180 €)",
    href: "https://www.boursobank.com/banque/carte-bancaire-gratuite-welcome",
    effectiveFrom: "6 octobre 2026",
    consultedAt: BANK_GUIDE_SOURCES_VERIFIED_AT,
  },
  boursobankTariffs: {
    org: "BoursoBank",
    label: "Brochure tarifaire applicable au 5 octobre 2026",
    href: "https://www.boursobank.com/content/brochure_tarifaire/boursorama_bt-new.pdf",
    effectiveFrom: "5 octobre 2026",
    consultedAt: BANK_GUIDE_SOURCES_VERIFIED_AT,
  },
  fortuneoAccount: {
    org: "Fortuneo",
    label: "Compte bancaire",
    href: "https://www.fortuneo.fr/compte-bancaire",
    consultedAt: BANK_GUIDE_SOURCES_VERIFIED_AT,
  },
  fortuneoWelcome: {
    org: "Fortuneo",
    label: "Offres de bienvenue (Fosfo)",
    href: "https://www.fortuneo.fr/offres-speciales-fortuneo",
    consultedAt: BANK_GUIDE_SOURCES_VERIFIED_AT,
  },
  fortuneoUnusedFaq: {
    org: "Fortuneo",
    label: "Frais de non-utilisation de la carte",
    href: "https://www.fortuneo.fr/faq/a-quoi-correspondent-les-frais-de-non-utilisation-de-la-carte-sur-mon-compte-courant",
    consultedAt: BANK_GUIDE_SOURCES_VERIFIED_AT,
  },
  fortuneoTariffs: {
    org: "Fortuneo",
    label: "Conditions tarifaires",
    href: "https://www.fortuneo.fr/files/fortuneo-tarifs-09022026.pdf",
    effectiveFrom: "9 février 2026",
    consultedAt: BANK_GUIDE_SOURCES_VERIFIED_AT,
  },
  helloOne: {
    org: "Hello bank!",
    label: "Offre Hello One",
    href: "https://www.hellobank.fr/fr/offre/compte-et-cartes/hello-one/",
    consultedAt: BANK_GUIDE_SOURCES_VERIFIED_AT,
  },
  helloOneWelcome: {
    org: "Hello bank!",
    label: "Prime de bienvenue Hello One (80 €)",
    href: "https://www.hellobank.fr/fr/offre/compte-et-cartes/hello-one/",
    validUntil: "8 décembre 2026",
    consultedAt: BANK_GUIDE_SOURCES_VERIFIED_AT,
  },
  helloTariffs: {
    org: "Hello bank!",
    label: "Brochure tarifaire",
    href: "https://www.hellobank.fr/content/dam/hellobank/rsc/contrib/document/pdf/tarifs-hellobank.pdf",
    effectiveFrom: "1er octobre 2026",
    consultedAt: BANK_GUIDE_SOURCES_VERIFIED_AT,
  },
  monabanqAccount: {
    org: "Monabanq",
    label: "Compte courant Pratiq+",
    href: "https://www.monabanq.com/fr/pratiq-plus-visa-classic.html",
    consultedAt: BANK_GUIDE_SOURCES_VERIFIED_AT,
  },
  monabanqWelcome: {
    org: "Monabanq",
    label: "Prime d'ouverture de compte",
    href: "https://www.monabanq.com/fr/produits/compte_courant.html",
    effectiveFrom: "1er juillet 2026",
    consultedAt: BANK_GUIDE_SOURCES_VERIFIED_AT,
  },
  monabanqTariffs: {
    org: "Monabanq",
    label: "Guide de tarification au 1er octobre 2026",
    href: "https://www.monabanq.com/fr/pdf/tarifications/monabanq_tarification-no.pdf",
    effectiveFrom: "1er octobre 2026",
    consultedAt: BANK_GUIDE_SOURCES_VERIFIED_AT,
  },
  servicePublicDroitAuCompte: {
    org: "Service-Public",
    label: "Droit au compte (F2417)",
    href: "https://www.service-public.fr/particuliers/vosdroits/F2417",
    consultedAt: BANK_GUIDE_SOURCES_VERIFIED_AT,
  },
  bdfDroitAuCompte: {
    org: "Banque de France",
    label: "Droit au compte",
    href: "https://www.banque-france.fr/fr/a-votre-service/intervenants-sociaux/droit-au-compte",
    consultedAt: BANK_GUIDE_SOURCES_VERIFIED_AT,
  },
  bdfOffreFragile: {
    org: "Banque de France",
    label: "Plafonnement des frais et offre clientèle fragile",
    href: "https://www.banque-france.fr/fr/a-votre-service/particuliers/connaitre-pratiques-bancaires-assurance/compte-frais/le-plafonnement-des-frais-bancaires-et-loffre-clientele-fragile",
    consultedAt: BANK_GUIDE_SOURCES_VERIFIED_AT,
  },
  servicePublicMobilite: {
    org: "Service-Public",
    label: "Mobilité bancaire (F24089)",
    href: "https://www.service-public.fr/particuliers/vosdroits/F24089",
    consultedAt: BANK_GUIDE_SOURCES_VERIFIED_AT,
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

/** Encart gauche : exclusivement une offre de bienvenue (jamais un tarif). */
export type BankWelcomePromo =
  | {
      kind: "confirmed";
      amountCents: number;
      isMaximum: boolean;
      conditionsShort: string;
      sourceUrl: string;
      code?: string;
      validUntil?: string;
      effectiveFrom?: string;
    }
  | {
      kind: "none";
      note: string;
    };

export type BankOffer = {
  id: BankOfferId;
  bankName: string;
  formerName?: string;
  offerName: string;
  shortLabel: string;
  cardName: string;
  debitType: string;
  monthlyIfConditionsMetCents: number;
  unusedMonthlyCents: number;
  freeCondition: string;
  unusedFeeLabel: string;
  incomeCondition: string;
  domiciliation: string;
  initialDeposit: string;
  initialDepositShort: string;
  needsExistingAccount: string;
  euroPayments: string;
  euroWithdrawals: string;
  atmNetwork: string;
  checkDeposit: string;
  checkDepositShort: string;
  cashDeposit: string;
  cashDepositShort: string;
  humanSupport: string;
  overdraft: string;
  tariffEffectiveFrom: string;
  /** URL officielle (aucune affiliation configurée). */
  productUrl: string;
  tariffUrl: string;
  isAffiliate: false;
  decryptAnchor: string;
  limit: string;
  usageProfile: string;
  whyInSelection: string;
  cardCondition: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
  logoDisplay: "wide" | "mark";
  cardSubtitle: string;
  analysisTitle: string;
  considerIf: string;
  compareIf: string;
  welcome: BankWelcomePromo;
  cardBenefits: readonly BankCardBenefit[];
  compactBenefits: readonly BankCardBenefit[];
};

const BOURSOBANK_WELCOME: BankOffer = {
  id: "boursobank-welcome",
  bankName: "BoursoBank",
  formerName: "Boursorama Banque",
  offerName: "Welcome",
  shortLabel: "BoursoBank Welcome",
  cardName: "Visa Classic Welcome",
  debitType: "Débit immédiat, autorisation systématique",
  monthlyIfConditionsMetCents: 0,
  unusedMonthlyCents: 0,
  freeCondition:
    "Carte physique ou dématérialisée gratuite sans condition d'utilisation, pour une Welcome commandée à partir du 27 février 2026 (hors refabrication et renouvellement).",
  unusedFeeLabel:
    "Aucun frais de non-utilisation pour une Welcome commandée à partir du 27 février 2026. Une Welcome commandée jusqu'à cette date reste facturée 5 € par mois sans paiement par carte.",
  incomeCondition: "Sans condition de revenus",
  domiciliation: "Non exigée pour l'offre Welcome",
  initialDeposit:
    "Un premier versement est demandé pour activer le compte. Ce n'est pas un frais : l'argent reste disponible. Les paliers de la prime de bienvenue commencent dès 1 € versé ; le plafond de 40 € pour le versement exige au moins 300 €.",
  initialDepositShort: "Versement d'activation demandé",
  needsExistingAccount:
    "Un RIB à votre nom dans un établissement en France peut être demandé. L'ouverture reste soumise à l'acceptation de la banque.",
  euroPayments: "Paiements en euros gratuits et illimités",
  euroWithdrawals: "Retraits en euros gratuits et illimités",
  atmNetwork: "Tous DAB en euros, sans quota publié pour Welcome",
  checkDeposit:
    "Encaissement de chèques possible. La brochure limite la remise de chèque à 250 € sur 30 jours glissants (hors offre professionnelle).",
  checkDepositShort: "Oui, plafonné à 250 € / 30 jours",
  cashDeposit: "Pas de dépôt ni de retrait d'espèces en agence",
  cashDepositShort: "Non proposé en agence",
  humanSupport: "Aide 24h/24 via le chatbot Bourso.IA. Pas de conseiller d'agence mis en avant.",
  overdraft:
    "Un découvert autorisé peut exister après étude. Il n'est jamais présenté ici comme acquis à l'ouverture.",
  tariffEffectiveFrom: BANK_GUIDE_SOURCES.boursobankTariffs.effectiveFrom,
  productUrl: BANK_GUIDE_SOURCES.boursobankWelcome.href,
  tariffUrl: BANK_GUIDE_SOURCES.boursobankTariffs.href,
  isAffiliate: false,
  decryptAnchor: "boursobank-welcome",
  limit: "Banque 100 % en ligne, sans dépôt d'espèces en agence.",
  cardCondition:
    "Gratuit sans condition d'utilisation pour une Welcome commandée à partir du 27 février 2026.",
  logoSrc: "/images/banques/boursobank.png",
  logoWidth: 350,
  logoHeight: 109,
  logoDisplay: "wide",
  cardSubtitle: "Compte individuel · Welcome",
  analysisTitle: "BoursoBank Welcome : un compte quotidien sans cotisation liée à l'usage",
  considerIf:
    "Vous voulez surtout un compte à 0 € pour payer et retirer en euros, sans condition de revenus ni d'usage de la carte récente.",
  compareIf:
    "Vous devez déposer des espèces, parler souvent à un conseiller, ou préférez un parcours d'ouverture sans versement via une application.",
  welcome: {
    kind: "confirmed",
    amountCents: 18000,
    isMaximum: true,
    conditionsShort:
      "Nouveau client, 1er compte individuel, code BBKOPE180. Jusqu'à 180 € : 20 € à l'ouverture, jusqu'à 40 € selon le 1er versement, 40 € avec 1 opération carte / mois pendant 3 mois, 80 € avec EasyMove. Offre à partir du 6 octobre 2026.",
    sourceUrl: BANK_GUIDE_SOURCES.boursobankWelcomeBonus.href,
    code: "BBKOPE180",
    effectiveFrom: BANK_GUIDE_SOURCES.boursobankWelcomeBonus.effectiveFrom,
  },
  cardBenefits: [
    { prefix: "Compte à ", strong: "0 € / mois" },
    { strong: "Sans condition de revenus" },
    { prefix: "Paiements et retraits en euros ", strong: "sans frais" },
  ],
  compactBenefits: [
    { prefix: "Compte à ", strong: "0 € / mois" },
    { strong: "Sans condition de revenus" },
  ],
  usageProfile: "Paiements carte réguliers ou irréguliers, peu d'espèces à déposer.",
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
  monthlyIfConditionsMetCents: 0,
  unusedMonthlyCents: 300,
  freeCondition:
    "Carte gratuite sous réserve d'une opération de paiement par carte par mois civil, hors retrait DAB ou GAB.",
  unusedFeeLabel: "3 € par mois si aucun paiement par carte n'est constaté sur le mois civil.",
  incomeCondition: "Sans condition de revenus ni d'épargne chez Fortuneo",
  domiciliation: "Non exigée pour Fosfo",
  initialDeposit:
    "0 € via l'application pour Fosfo. 50 € via le site fortuneo.fr. Ce versement n'est pas un frais : il reste disponible sur le compte.",
  initialDepositShort: "0 € via l'app · 50 € via le site",
  needsExistingAccount:
    "Un compte bancaire en France est demandé pour le parcours site (RIB et versement). Le parcours application Fosfo s'ouvre avec un justificatif d'identité et un selfie vidéo.",
  euroPayments: "Paiements en euros gratuits",
  euroWithdrawals: "Retraits en euros gratuits (hors frais éventuels du distributeur)",
  atmNetwork: "Tous DAB en euros, sans quota publié pour Fosfo",
  checkDeposit: "Remise de chèques en euros sur une banque française : gratuite",
  checkDepositShort: "Gratuit",
  cashDeposit: "Pas de dépôt d'espèces en agence (banque en ligne)",
  cashDepositShort: "Non proposé en agence",
  humanSupport: "Service client joignable du lundi au samedi, par téléphone, e-mail et chat.",
  overdraft:
    "Un découvert autorisé peut être étudié. Il n'est jamais présenté ici comme garanti.",
  tariffEffectiveFrom: BANK_GUIDE_SOURCES.fortuneoTariffs.effectiveFrom,
  productUrl: BANK_GUIDE_SOURCES.fortuneoAccount.href,
  tariffUrl: BANK_GUIDE_SOURCES.fortuneoTariffs.href,
  isAffiliate: false,
  decryptAnchor: "fortuneo-fosfo",
  limit: "Un retrait d'espèces ne compte pas pour la gratuité. Sans paiement carte : 3 € par mois.",
  cardCondition:
    "Gratuit si un paiement par carte a lieu chaque mois civil. Un retrait ne compte pas.",
  logoSrc: "/images/banques/fortuneo.png",
  logoWidth: 500,
  logoHeight: 500,
  logoDisplay: "mark",
  cardSubtitle: "Compte individuel · Fosfo",
  analysisTitle: "Fortuneo Fosfo : gratuité liée à un vrai paiement carte chaque mois",
  considerIf:
    "Vous payez au moins une fois par carte chaque mois et voulez un compte sans condition de revenus, éventuellement ouvert à 0 € via l'application.",
  compareIf:
    "Vous utilisez rarement la carte, ou vous voulez éviter toute cotisation même sans paiement mensuel.",
  welcome: {
    kind: "confirmed",
    amountCents: 3000,
    isMaximum: false,
    conditionsShort:
      "1ère ouverture d'un compte avec carte Fosfo CB Mastercard, puis 5 paiements carte sous 90 jours. Code BIENVENUEFTO. Ne confondez pas avec la prime Gold.",
    sourceUrl: BANK_GUIDE_SOURCES.fortuneoWelcome.href,
    code: "BIENVENUEFTO",
  },
  cardBenefits: [
    { prefix: "Compte à ", strong: "0 € / mois", suffix: " avec un paiement carte" },
    { strong: "Sans condition de revenus" },
    { prefix: "Paiements et retraits en euros ", strong: "sans frais" },
  ],
  compactBenefits: [
    { prefix: "Compte à ", strong: "0 € / mois", suffix: " si 1 paiement / mois" },
    { strong: "Sans condition de revenus" },
  ],
  usageProfile: "Au moins un achat par carte chaque mois.",
  whyInSelection:
    "Fosfo reste accessible sans revenu minimum, avec une cotisation nulle dès qu'un paiement carte a lieu dans le mois.",
};

const HELLO_ONE: BankOffer = {
  id: "hello-one",
  bankName: "Hello bank!",
  offerName: "Hello One",
  shortLabel: "Hello bank! Hello One",
  cardName: "Visa Hello One",
  debitType: "Autorisation systématique",
  monthlyIfConditionsMetCents: 0,
  unusedMonthlyCents: 600,
  freeCondition:
    "0 € si au moins un paiement ou un retrait avec la carte Hello One a lieu dans le mois calendaire. Sinon 6 € par mois.",
  unusedFeeLabel: "6 € par mois sans paiement ni retrait carte dans le mois calendaire.",
  incomeCondition: "Sans minimum de revenus",
  domiciliation: "Non exigée. La domiciliation des revenus reste libre.",
  initialDeposit:
    "0 € si l'identification biométrique aboutit. Sinon versement initial de 10 € à 300 € depuis un compte à votre nom dans l'EEE ou un pays SEPA équivalent. Ce versement n'est pas un frais.",
  initialDepositShort: "0 € en biométrie · sinon 10 à 300 €",
  needsExistingAccount:
    "Un compte préexistant est nécessaire si la biométrie n'est pas finalisée, pour le versement initial. Résident français, majeur capable, usage non professionnel.",
  euroPayments: "Paiements par carte sans frais, en France comme à l'étranger selon la page produit",
  euroWithdrawals:
    "Gratuits aux automates Cash Services, BNP Paribas et filiales (réseaux Global Network et Global Alliance).",
  atmNetwork:
    "Réseau Cash Services, BNP Paribas et filiales. Hors de ce périmètre, des frais peuvent s'appliquer.",
  checkDeposit:
    "Dépôt possible : scan dans l'application puis envoi postal, automate Cash Services, ou agence BNP Paribas.",
  checkDepositShort: "Oui (app, Cash Services, BNP)",
  cashDeposit:
    "Versement d'espèces possible dans un automate de dépôt BNP Paribas ou Cash Services, sans frais selon la brochure.",
  cashDepositShort: "Oui via BNP / Cash Services",
  humanSupport:
    "Conseillers Hello Team au 0 800 848 400, du lundi au vendredi de 8 h à 20 h et le samedi de 8 h à 18 h.",
  overdraft:
    "La carte interroge le solde avant paiement. Un découvert n'est pas mis en avant comme un service de l'offre Hello One.",
  tariffEffectiveFrom: BANK_GUIDE_SOURCES.helloTariffs.effectiveFrom,
  productUrl: BANK_GUIDE_SOURCES.helloOne.href,
  tariffUrl: BANK_GUIDE_SOURCES.helloTariffs.href,
  isAffiliate: false,
  decryptAnchor: "hello-one",
  limit:
    "Retraits gratuits surtout dans le réseau Cash Services et BNP Paribas. Sans usage de la carte : 6 € par mois.",
  cardCondition: "0 € avec un paiement ou un retrait dans le mois, sinon 6 €.",
  logoSrc: "/images/banques/hello-bank.png",
  logoWidth: 1415,
  logoHeight: 1557,
  logoDisplay: "mark",
  cardSubtitle: "Compte individuel · Hello One",
  analysisTitle: "Hello One : gestion en ligne et opérations via le réseau BNP Paribas",
  considerIf:
    "Vous voulez pouvoir déposer chèques ou espèces via Cash Services / BNP Paribas, et joindre un conseiller aux horaires publiés.",
  compareIf:
    "Vous retirez surtout hors réseau BNP / Cash Services, ou vous voulez éviter toute cotisation sans aucun usage de carte.",
  welcome: {
    kind: "confirmed",
    amountCents: 8000,
    isMaximum: false,
    conditionsShort:
      "80 € pour une 1re ouverture Hello One (ou Duo). Demande validée au plus tard le 8 décembre 2026, confirmation d'ouverture sous 30 jours. Exclut les clients déjà titulaires d'un compte Hello bank! (sauf cas joint limité).",
    sourceUrl: BANK_GUIDE_SOURCES.helloOneWelcome.href,
    validUntil: BANK_GUIDE_SOURCES.helloOneWelcome.validUntil,
  },
  cardBenefits: [
    { prefix: "Compte à ", strong: "0 € / mois", suffix: " avec un paiement ou un retrait" },
    { strong: "Sans condition de revenus" },
    { prefix: "Paiements par carte ", strong: "sans frais" },
  ],
  compactBenefits: [
    { prefix: "Compte à ", strong: "0 € / mois", suffix: " si usage carte" },
    { strong: "Dépôts physiques possibles" },
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
  monthlyIfConditionsMetCents: 390,
  unusedMonthlyCents: 390,
  freeCondition: "Aucune : cotisation de 3,90 € par mois, carte Visa incluse.",
  unusedFeeLabel:
    "Pas de pénalité de non-utilisation distincte : la cotisation de 3,90 € reste due chaque mois.",
  incomeCondition: "Sans condition de revenus",
  domiciliation: "Non exigée pour souscrire Pratiq+",
  initialDeposit:
    "Un premier versement est demandé pour activer le compte et recevoir la carte. Le montant exact n'est pas publié de façon univoque sur la page produit consultée. Ce versement, s'il est requis, reste de l'argent sur le compte.",
  initialDepositShort: "Versement d'activation demandé",
  needsExistingAccount:
    "Il faut déjà détenir un compte à votre nom dans une banque en France, dans l'EEE ou un pays SEPA équivalent (Royaume-Uni exclu). Résidence en France métropolitaine ou DROM-COM.",
  euroPayments:
    "Paiements en euros gratuits. Plafond de 1 500 € sur 30 jours glissants, ajustable selon les revenus.",
  euroWithdrawals: "Retraits en euros gratuits",
  atmNetwork:
    "Retraits en euros sans frais selon la brochure, sans quota de réseau distinct publié pour Pratiq+",
  checkDeposit:
    "3 dépôts de chèques gratuits par trimestre aux automates Crédit Mutuel, CIC ou Cash Services, puis 2 € par dépôt.",
  checkDepositShort: "3 gratuits / trimestre, puis 2 €",
  cashDeposit:
    "Brochure au 1er octobre 2026 : 1 dépôt d'espèces gratuit par trimestre aux automates Crédit Mutuel, CIC ou Cash Services, puis 9 €.",
  cashDepositShort: "1 gratuit / trimestre, puis 9 €",
  humanSupport:
    "Conseillers par téléphone, tchat et e-mail, du lundi au vendredi de 8 h à 21 h et le samedi de 8 h à 16 h 30 (0 800 006 526).",
  overdraft:
    "Une facilité de caisse peut être étudiée. Elle n'est jamais garantie. Le compte ne peut pas rester débiteur plus de 30 jours consécutifs.",
  tariffEffectiveFrom: BANK_GUIDE_SOURCES.monabanqTariffs.effectiveFrom,
  productUrl: BANK_GUIDE_SOURCES.monabanqAccount.href,
  tariffUrl: BANK_GUIDE_SOURCES.monabanqTariffs.href,
  isAffiliate: false,
  decryptAnchor: "monabanq-pratiq-plus",
  limit: "3,90 € dus chaque mois, soit 46,80 € par an, même sans usage de la carte.",
  cardCondition: "Aucune gratuité : cotisation de 3,90 € par mois, carte Visa incluse.",
  logoSrc: "/images/banques/monabanq.png",
  logoWidth: 512,
  logoHeight: 512,
  logoDisplay: "mark",
  cardSubtitle: "Compte individuel · Pratiq+",
  analysisTitle: "Monabanq Pratiq+ : un forfait payant pour un contact humain et des dépôts",
  considerIf:
    "Vous acceptez 3,90 € / mois pour joindre un conseiller (y compris le samedi) et déposer chèques ou espèces dans le réseau Crédit Mutuel / CIC.",
  compareIf:
    "Vous voulez avant tout minimiser les frais fixes et n'avez pas besoin d'un contact humain fréquent.",
  welcome: {
    kind: "confirmed",
    amountCents: 8000,
    isMaximum: true,
    conditionsShort:
      "Jusqu'à 80 € pour l'ouverture : 20 € à l'ouverture + 60 € si au moins 300 € versés dans le mois suivant. Autres paliers (carte, mobilité, fidélité) existent sous conditions séparées. Offre nouveaux clients depuis le 1er juillet 2026.",
    sourceUrl: BANK_GUIDE_SOURCES.monabanqWelcome.href,
    effectiveFrom: BANK_GUIDE_SOURCES.monabanqWelcome.effectiveFrom,
  },
  cardBenefits: [
    { prefix: "Compte à ", strong: "3,90 € / mois" },
    { strong: "Sans condition de revenus" },
    { prefix: "Conseiller joignable ", strong: "y compris le samedi" },
  ],
  compactBenefits: [
    { prefix: "Compte à ", strong: "3,90 € / mois" },
    { strong: "Conseiller humain" },
  ],
  usageProfile: "Besoin de parler à quelqu'un et de déposer chèques ou espèces.",
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
  relatedOfferIds: readonly BankOfferId[];
};

export const BANK_NEED_BLOCKS: readonly BankNeedBlock[] = [
  {
    id: "reduire-frais",
    need: "Je veux surtout réduire mes frais bancaires",
    answer:
      "Comparez d'abord la cotisation réelle selon votre usage. Welcome récente reste à 0 € sans condition d'utilisation. Fosfo et Hello One restent à 0 € seulement si la condition mensuelle est remplie. Pratiq+ coûte 3,90 € chaque mois.",
    relatedOfferIds: ["boursobank-welcome", "fortuneo-fosfo", "hello-one"],
  },
  {
    id: "carte-rare",
    need: "J'utilise rarement ma carte",
    answer:
      "Welcome récente reste à 0 € sans usage. Fosfo facture 3 € et Hello One 6 € sans l'opération requise. Pratiq+ reste à 3,90 €, usage ou non.",
    relatedOfferIds: ["boursobank-welcome", "monabanq-pratiq-plus"],
  },
  {
    id: "especes",
    need: "Je retire ou dépose régulièrement des espèces",
    answer:
      "Hello One permet des dépôts d'espèces via BNP Paribas / Cash Services. Pratiq+ propose des dépôts dans le réseau Crédit Mutuel / CIC, avec franchise limitée. BoursoBank et Fortuneo n'offrent pas de dépôt d'espèces en agence. Chez Fortuneo, un retrait ne rend pas la carte gratuite.",
    relatedOfferIds: ["hello-one", "monabanq-pratiq-plus"],
  },
  {
    id: "conseiller",
    need: "Je souhaite pouvoir joindre un conseiller",
    answer:
      "Hello bank! publie un numéro Hello Team avec horaires en semaine et le samedi. Monabanq met en avant téléphone, tchat et e-mail, y compris le samedi. Fortuneo propose un service client lundi-samedi. BoursoBank s'appuie surtout sur un chatbot.",
    relatedOfferIds: ["hello-one", "monabanq-pratiq-plus", "fortuneo-fosfo"],
  },
  {
    id: "premier-versement",
    need: "J'ai peu d'argent disponible pour le premier versement",
    answer:
      "Fosfo via l'application et Hello One en biométrie peuvent s'ouvrir à 0 €. Ailleurs, un versement d'activation est souvent demandé : ce n'est pas un frais, mais l'argent doit être disponible. Chez BoursoBank, le maximum de la part « premier versement » de la prime exige 300 €.",
    relatedOfferIds: ["fortuneo-fosfo", "hello-one", "boursobank-welcome"],
  },
];

export type BankFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const BANK_FAQ_ITEMS: readonly BankFaqItem[] = [
  {
    id: "domiciliation-salaire",
    question: "Faut-il verser son salaire dans la nouvelle banque ?",
    answer:
      "Non pour les quatre offres de cette sélection : aucune n'exige la domiciliation du salaire pour souscrire Welcome, Fosfo, Hello One ou Pratiq+. Vous pouvez y faire virer votre salaire plus tard si cela vous arrange, ou conserver un autre compte pour les revenus.",
  },
  {
    id: "conserver-ancien-compte",
    question: "Peut-on conserver son ancien compte ?",
    answer:
      "Oui. Rien n'oblige à fermer immédiatement l'ancien compte. Beaucoup de personnes gardent les deux le temps de vérifier virements, prélèvements et réception de la nouvelle carte. Fermez l'ancien compte seulement quand la transition est stable.",
  },
  {
    id: "sans-cdi",
    question: "Peut-on ouvrir un compte sans CDI ?",
    answer:
      "Les offres retenues ici n'annoncent pas de condition de type de contrat de travail. La banque vérifie toutefois identité, résidence et situation, et peut refuser l'ouverture. Un petit salaire ou un CDD ne garantit ni l'acceptation ni l'accès à une offre réglementée.",
  },
  {
    id: "autorisation-systematique",
    question: "Une carte à autorisation systématique convient-elle à tous les usages ?",
    answer:
      "Elle interroge le solde (ou l'autorisation) avant la plupart des paiements. Cela limite les dettes involontaires, mais certains paiements hors ligne, péages ou réservations peuvent être refusés. Vérifiez les usages qui comptent pour vous avant de choisir Welcome ou Hello One.",
  },
  {
    id: "sans-versement",
    question: "Peut-on ouvrir un compte sans premier versement ?",
    answer:
      "Parfois : Fosfo via l'application Fortuneo et Hello One avec identification biométrique réussie sont présentés à 0 € d'ouverture. Les autres parcours demandent souvent un versement d'activation, qui reste votre argent sur le compte.",
  },
  {
    id: "refus-ouverture",
    question: "Que faire après un refus d'ouverture ?",
    answer:
      "Demandez les motifs possibles et vérifiez vos justificatifs. Si aucune banque ne vous ouvre de compte de dépôt, le droit au compte auprès de la Banque de France peut être engagé selon la procédure Service-Public. Un salaire au SMIC n'ouvre pas automatiquement ce droit.",
  },
];

export function getBankOffer(id: BankOfferId): BankOffer {
  const offer = BANK_OFFERS.find((item) => item.id === id);
  if (!offer) {
    throw new Error(`Offre bancaire inconnue : ${id}`);
  }
  return offer;
}

export function offerProductRel(offer: BankOffer): string {
  return offer.isAffiliate ? "sponsored noopener noreferrer" : "noopener noreferrer";
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
