import type { FaqItem } from "@/framework/types";
import type { GuideContextualCta } from "./types";
import {
  FRANCHISE_THRESHOLD_ROWS,
  FRANCHISE_THRESHOLDS_META,
  formatThreshold,
} from "./guide-franchise-thresholds";

const ventesRow = FRANCHISE_THRESHOLD_ROWS.find((r) => r.id === "ventes")!;
const servicesRow = FRANCHISE_THRESHOLD_ROWS.find((r) => r.id === "services")!;

export const CTA_CALCULATOR: GuideContextualCta = {
  type: "contextual-cta",
  text: "Vous voulez vérifier votre calcul ?",
  label: "Calculer immédiatement votre HT/TTC",
  href: "/",
};

export const GUIDE_FAQ: FaqItem[] = [
  {
    question: "Qui peut bénéficier de la franchise en base de TVA ?",
    answer:
      "En principe, toute personne physique ou morale exerçant une activité économique taxable (EI, micro-entrepreneur, EURL, SASU, SARL, SAS, artisan, commerçant, profession libérale…) peut relever de la franchise si son chiffre d'affaires reste sous les seuils de l'art. 293 B du CGI. Certaines activités ou opérations en sont exclues.",
  },
  {
    question: "Un micro-entrepreneur peut-il rester en micro-entreprise tout en étant assujetti à la TVA ?",
    answer:
      "Oui, en principe. Le régime micro-social et fiscal (micro-entreprise) est distinct du régime de TVA. Vous pouvez dépasser les seuils de franchise ou opter pour la TVA (art. 293 C) tout en conservant le statut de micro-entrepreneur, tant que les plafonds micro-entreprise sont respectés.",
  },
  {
    question: "Une EURL ou une SASU peut-elle bénéficier de la franchise ?",
    answer:
      "Oui, en principe. Le statut juridique (EURL, SASU, SARL, SAS…) n'empêche pas la franchise : seul le montant du chiffre d'affaires taxable et la nature de l'activité déterminent l'éligibilité (art. 293 B du CGI).",
  },
  {
    question: "Les professions libérales peuvent-elles être en franchise ?",
    answer:
      `Oui, en principe, pour les prestations de services relevant du BNC ou du BIC. Le seuil de base est de ${formatThreshold(servicesRow.base)} HT et le seuil majoré de ${formatThreshold(servicesRow.major)} HT en ${FRANCHISE_THRESHOLDS_META.year} (art. 293 B du CGI). Des seuils spécifiques s'appliquent en principe aux avocats et aux auteurs.`,
  },
  {
    question: "Un artisan peut-il bénéficier de la franchise en base de TVA ?",
    answer:
      `Oui, en principe. Un artisan vendant des marchandises ou exerçant une activité de vente/restauration relève du seuil ventes (${formatThreshold(ventesRow.base)} / ${formatThreshold(ventesRow.major)}). S'il ne facture que des prestations de services, le seuil services s'applique (${formatThreshold(servicesRow.base)} / ${formatThreshold(servicesRow.major)}).`,
  },
  {
    question: "Un photographe peut-il être en franchise de TVA ?",
    answer:
      `Oui, en principe, tant que ses recettes de prestations de services (séances, retouches, cession de droits) restent sous ${formatThreshold(servicesRow.base)} HT (seuil de base) et ${formatThreshold(servicesRow.major)} HT (seuil majoré) en ${FRANCHISE_THRESHOLDS_META.year} (art. 293 B du CGI).`,
  },
  {
    question: "Peut-on récupérer la TVA sur ses achats en franchise ?",
    answer:
      "Tant que vous êtes en franchise en base (art. 293 B du CGI), vous ne pouvez pas déduire la TVA sur vos achats professionnels — la taxe payée constitue une charge intégrale. Après sortie de franchise ou en cas d'option pour la TVA (art. 293 C), le droit à déduction peut s'ouvrir selon les règles applicables.",
  },
  {
    question: "Puis-je facturer de la TVA en franchise en base ?",
    answer:
      "Non, en principe. En franchise, vous ne devez pas facturer de TVA à vos clients. Facturer de la TVA sans y être assujetti constitue une irrégularité. Seul un assujetti ou un optant volontaire (art. 293 C) peut le faire.",
  },
  {
    question: "Comment sortir de la franchise en base de TVA ?",
    answer:
      "En principe, par dépassement des seuils (art. 293 B) ou par option volontaire (art. 293 C). Le dépassement du seuil de base en année N-1 entraîne l'assujettissement au 1er janvier suivant ; le dépassement du seuil majoré en année N, en principe, au jour du dépassement. L'option prend effet selon les règles de l'art. 293 C.",
  },
  {
    question: "Comment revenir en franchise après assujettissement ?",
    answer:
      "En principe, si votre chiffre d'affaires de l'année précédente est repassé sous le seuil de base et que vous n'avez pas exercé d'option volontaire (art. 293 C), vous pouvez redevenir franchisé au 1er janvier suivant. Après une option, la renonciation n'est possible qu'après 2 ans minimum.",
  },
  {
    question: "Que se passe-t-il si je dépasse les seuils de franchise ?",
    answer:
      `En principe, le simple dépassement du seuil de base (${formatThreshold(servicesRow.base)} services ou ${formatThreshold(ventesRow.base)} ventes) en année N-1 entraîne l'assujettissement au 1er janvier de l'année suivante. Le dépassement du seuil majoré (${formatThreshold(servicesRow.major)} ou ${formatThreshold(ventesRow.major)}) en cours d'année N, en principe, au jour du dépassement (art. 293 B du CGI).`,
  },
  {
    question:
      "Quelle est la différence entre le dépassement du seuil de base et du seuil majoré ?",
    answer:
      `Le seuil de base (${formatThreshold(servicesRow.base)} services / ${formatThreshold(ventesRow.base)} ventes) : si dépassé en année N-1, assujettissement au 1er janvier suivant. Le seuil majoré (${formatThreshold(servicesRow.major)} / ${formatThreshold(ventesRow.major)}) : tolérance en année N ; si dépassé en cours d'année, assujettissement en principe au jour du dépassement (art. 293 B du CGI).`,
  },
  {
    question: "Quelle mention doit figurer sur une facture en franchise ?",
    answer:
      'En principe, chaque facture doit comporter : « TVA non applicable, art. 293 B du CGI ». Aucun montant ni taux de TVA ne doit apparaître (art. 293 B et annexe II art. 242 nonies A du CGI).',
  },
  {
    question: "Comment rédiger une facture sans TVA en franchise ?",
    answer:
      "En principe : indiquez un prix net unique (pas de ligne HT/TVA séparée), la mention « TVA non applicable, art. 293 B du CGI », votre identité (SIRET) et celle du client. Numéro de TVA intracommunautaire : non requis pour une facture française classique en franchise ; des règles spécifiques peuvent s'appliquer pour les échanges intracommunautaires.",
  },
  {
    question: "Quelle TVA pour un micro-entrepreneur ?",
    answer:
      `En principe, sous les seuils de franchise (${formatThreshold(servicesRow.base)} / ${formatThreshold(ventesRow.base)} en ${FRANCHISE_THRESHOLDS_META.year}), le micro-entrepreneur ne facture pas de TVA : mention art. 293 B obligatoire. Au-delà, ou en cas d'option (art. 293 C), les taux ordinaires s'appliquent selon chaque opération (art. 278 et s. du CGI).`,
  },
  {
    question: "Dois-je déclarer la TVA en franchise ?",
    answer:
      "Non, en principe. La franchise dispense des déclarations et paiements de TVA (pas de CA3 ni CA12). Vous devez toutefois continuer à déclarer votre chiffre d'affaires et vos autres impôts (IR, IS, cotisations sociales).",
  },
  {
    question: "Comment savoir si je suis concerné par la franchise en base de TVA ?",
    answer:
      `En principe, comparez votre chiffre d'affaires taxable HT aux seuils ${FRANCHISE_THRESHOLDS_META.year} : ${formatThreshold(servicesRow.base)} / ${formatThreshold(servicesRow.major)} (services) ou ${formatThreshold(ventesRow.base)} / ${formatThreshold(ventesRow.major)} (ventes). Sous le seuil de base et sans option, vous êtes en franchise (art. 293 B du CGI).`,
  },
  {
    question: `Quels sont les seuils de franchise en base de TVA en ${FRANCHISE_THRESHOLDS_META.year} ?`,
    answer:
      `En ${FRANCHISE_THRESHOLDS_META.year} (${FRANCHISE_THRESHOLDS_META.legalRef}) : ventes de marchandises, restauration et hébergement — ${formatThreshold(ventesRow.base)} (base) et ${formatThreshold(ventesRow.major)} (majoré) ; prestations de services — ${formatThreshold(servicesRow.base)} (base) et ${formatThreshold(servicesRow.major)} (majoré). Montants susceptibles d'évolution par la loi de finances.`,
  },
  {
    question: "Qu'est-ce que l'article 293 B du CGI ?",
    answer:
      "L'art. 293 B du CGI institue la franchise en base de TVA : une exonération qui dispense, sous conditions de chiffre d'affaires, de facturer, collecter et reverser la TVA, sans droit à déduction sur les achats.",
  },
  {
    question: "Qu'est-ce que l'article 293 C du CGI ?",
    answer:
      "L'art. 293 C du CGI permet à une entreprise sous les seuils de franchise de demander volontairement l'assujettissement à la TVA, avec facturation HT + TVA et droit à déduction. L'option est en principe ferme pour 2 ans minimum.",
  },
  {
    question: "Quelle différence entre franchise en base et exonération de TVA ?",
    answer:
      "En principe, la franchise (art. 293 B) est une exonération liée au montant du CA, avec mention spécifique sur facture. D'autres exonérations (santé, formation, export…) relèvent d'articles distincts du CGI et ne supposent pas les mêmes seuils ni les mêmes mentions.",
  },
  {
    question: "Quelle différence entre franchise et assujettissement à la TVA ?",
    answer:
      "En franchise (art. 293 B) : pas de TVA facturée, pas de déduction, pas de déclaration TVA. Assujetti : TVA collectée sur les ventes, déductible sur les achats, déclarations CA3 ou CA12, numéro de TVA intracommunautaire en principe requis.",
  },
  {
    question: "Comment fonctionne l'option volontaire pour la TVA (art. 293 C) ?",
    answer:
      "En principe, toute entreprise sous les seuils peut demander l'assujettissement auprès du SIE. Effet : facturation HT + TVA, déduction sur achats, déclarations périodiques. Utile notamment si vos clients professionnels récupèrent la TVA.",
  },
  {
    question: "Quelle est la durée minimale de l'option volontaire pour la TVA ?",
    answer:
      "En principe, 2 ans minimum à compter de la prise d'effet (art. 293 C du CGI). L'option est renouvelable tacitement sauf renonciation dans les délais légaux.",
  },
  {
    question: "Peut-on renoncer à l'option volontaire (art. 293 C) ?",
    answer:
      "Oui, en principe, après la période minimale de 2 ans. La renonciation prend effet au 1er janvier de l'année suivante, sous réserve que le chiffre d'affaires reste sous les seuils de franchise (art. 293 B et 293 C du CGI).",
  },
  {
    question: "Faut-il un numéro de TVA intracommunautaire en franchise ?",
    answer:
      "Non requis pour une facture française classique en franchise — le SIRET (ou SIREN) suffit en principe. Des règles spécifiques peuvent toutefois s'appliquer pour les échanges intracommunautaires. Un numéro vous est attribué en cas d'assujettissement ou d'option volontaire (art. 293 C du CGI).",
  },
  {
    question: "Le projet de seuil unique à 25 000 € est-il toujours d'actualité ?",
    answer:
      "Non. La loi n° 2025-1044 du 3 novembre 2025 a abandonné le projet de seuil unique à 25 000 €. Les seuils historiques distincts (ventes / services) sont maintenus pour 2026 (art. 293 B du CGI).",
  },
  {
    question: "Comment s'applique le prorata en année de création ?",
    answer:
      "En principe, l'année de création ou de début d'activité, les seuils de franchise sont calculés au prorata temporis du nombre de jours d'activité sur l'année civile (art. 293 B du CGI). Exemple : activité débutée le 1er juillet → seuils divisés par 2.",
  },
  {
    question: "Comment gérer la franchise avec des activités mixtes (ventes et services) ?",
    answer:
      `En cas d'activité mixte, chaque catégorie de recettes est comparée à son propre seuil : ventes, restauration et hébergement (${formatThreshold(ventesRow.base)} / ${formatThreshold(ventesRow.major)}) d'un côté, prestations de services (${formatThreshold(servicesRow.base)} / ${formatThreshold(servicesRow.major)}) de l'autre. Le seuil ventes ne couvre pas les prestations de services. Un dépassement sur l'une des catégories peut entraîner l'assujettissement de l'ensemble de l'entreprise (art. 293 B du CGI).`,
  },
  {
    question: "La franchise convient-elle aux clients B2B ?",
    answer:
      "En principe, la franchise est moins avantageuse en B2B : vos clients assujettis ne peuvent pas récupérer de TVA sur vos factures. L'option volontaire (art. 293 C) peut être pertinente si vos clients sont majoritairement des entreprises.",
  },
  {
    question: "Quelles règles en Guyane et à Mayotte ?",
    answer:
      "En principe, des régimes spécifiques de TVA s'appliquent en Guyane et à Mayotte (taux et seuils distincts du régime métropolitain). Consultez le CGI et impots.gouv.fr pour les montants en vigueur dans ces départements.",
  },
  {
    question: "Un consultant ou développeur peut-il être en franchise ?",
    answer:
      `Oui, en principe, pour des prestations de services BIC ou BNC sous ${formatThreshold(servicesRow.base)} HT (base) et ${formatThreshold(servicesRow.major)} HT (majoré) en ${FRANCHISE_THRESHOLDS_META.year} (art. 293 B du CGI).`,
  },
  {
    question: "Un commerçant ou restaurateur utilise-t-il le seuil ventes ?",
    answer:
      `Oui, en principe. Les ventes de marchandises, la restauration et l'hébergement relèvent du seuil ventes : ${formatThreshold(ventesRow.base)} (base) et ${formatThreshold(ventesRow.major)} (majoré) en ${FRANCHISE_THRESHOLDS_META.year} (art. 293 B du CGI).`,
  },
  {
    question: "La franchise dispense-t-elle de déclarer son chiffre d'affaires ?",
    answer:
      "Non. La franchise dispense uniquement des déclarations de TVA. Vous devez toujours déclarer votre chiffre d'affaires (déclaration micro-entreprise, 2031, 2033, etc.) et acquitter vos impôts et cotisations sociales.",
  },
  {
    question: "Peut-on opter pour la TVA dès la création de l'entreprise ?",
    answer:
      "Oui, en principe. L'option pour l'assujettissement (art. 293 C du CGI) peut être formulée dès l'immatriculation ou en cours d'activité, pour une durée minimale de 2 ans. Elle prend effet selon les règles prévues par l'administration fiscale.",
  },
];

export const ELIGIBILITY_TABLE_ROWS: string[][] = [
  [
    "Micro-entrepreneur",
    "Oui",
    `CA HT sous ${formatThreshold(servicesRow.base)} (services) ou ${formatThreshold(ventesRow.base)} (ventes)`,
    "Coach freelance à 22 000 € HT/an",
  ],
  [
    "Entreprise individuelle (EI)",
    "Oui",
    "Mêmes seuils art. 293 B — régime réel ou micro",
    "Consultant EI à 30 000 € HT",
  ],
  [
    "SASU",
    "Oui",
    "Statut juridique indifférent — seuils de CA déterminants",
    "Développeur SASU à 35 000 € HT",
  ],
  [
    "EURL",
    "Oui",
    "IS ou IR — franchise si CA sous les plafonds",
    "Graphiste EURL à 28 000 € HT",
  ],
  [
    "SAS",
    "Oui",
    "PME sous les seuils — pas d'exclusion liée à la forme sociale",
    "Boutique en ligne SAS à 80 000 € HT (ventes)",
  ],
  [
    "SARL",
    "Oui",
    "Associé unique ou multiple — seuils identiques",
    "Artisan SARL à 60 000 € HT",
  ],
  [
    "Profession libérale",
    "Oui",
    `BNC — seuil services ${formatThreshold(servicesRow.base)} / ${formatThreshold(servicesRow.major)}`,
    "Avocat, médecin, architecte sous les plafonds",
  ],
  [
    "Artisan",
    "Oui",
    "Seuil ventes si marchandises ; seuil services si prestations seules",
    "Menuisier — ventes 50 000 € HT",
  ],
  [
    "Commerçant",
    "Oui",
    `Seuil ventes ${formatThreshold(ventesRow.base)} / ${formatThreshold(ventesRow.major)}`,
    "Boutique en ligne à 70 000 € HT",
  ],
  [
    "Consultant",
    "Oui",
    `Prestations BIC/BNC — ${formatThreshold(servicesRow.base)} / ${formatThreshold(servicesRow.major)}`,
    "Conseil stratégie à 40 000 € HT",
  ],
  [
    "Photographe",
    "Oui",
    "Prestations de services — seuil services applicable",
    "Séances photo à 18 000 € HT/an",
  ],
  [
    "Développeur",
    "Oui",
    "Prestations informatiques — BIC, seuil services",
    "Développement web à 32 000 € HT",
  ],
  [
    "Graphiste",
    "Oui",
    "Création graphique — BNC ou BIC selon activité",
    "Identité visuelle à 25 000 € HT",
  ],
  [
    "Coach",
    "Oui",
    "Prestations de coaching — BNC en principe",
    "Coaching individuel à 20 000 € HT",
  ],
];

export const PRACTICAL_CASE_ROWS: string[][] = [
  [
    "Photographe",
    "Séances et retouches, BNC",
    "18 000 € HT",
    "Oui",
    "Non",
    "Séance mariage 800 € — TVA non applicable, art. 293 B du CGI",
  ],
  [
    "Consultant",
    "Conseil en management, BNC",
    "34 000 € HT",
    "Oui",
    "Non",
    "Mission 3 jours 1 500 € net — art. 293 B",
  ],
  [
    "Développeur",
    "Développement sur mesure, BIC",
    "39 000 € HT",
    "Oui (sous majoré)",
    "Non",
    "Site vitrine 2 400 € — art. 293 B",
  ],
  [
    "Graphiste",
    "Création logo et charte",
    "28 000 € HT",
    "Oui",
    "Non",
    "Logo 600 € — TVA non applicable, art. 293 B du CGI",
  ],
  [
    "Artisan",
    "Vente de meubles artisanaux, BIC",
    "55 000 € HT",
    "Oui",
    "Non",
    "Table sur mesure 1 200 € — art. 293 B",
  ],
  [
    "Restaurant",
    "Restauration sur place, BIC",
    "78 000 € HT",
    "Oui",
    "Non",
    "Menu 25 € — TVA non applicable, art. 293 B du CGI",
  ],
  [
    "Coach",
    "Coaching professionnel, BNC",
    "38 000 € HT",
    "Oui (sous majoré)",
    "Non",
    "Séance 150 € — art. 293 B",
  ],
  [
    "Formateur",
    "Formation professionnelle, BIC",
    "44 500 € HT",
    "Non (dépasse majoré)",
    "Oui (depuis dépassement)",
    "Journée formation 900 € HT + 180 € TVA (20 %)",
  ],
  [
    "Influenceur",
    "Sponsoring et partenariats, BNC/BIC",
    "25 000 € HT",
    "Oui",
    "Non",
    "Partenariat 2 000 € — art. 293 B",
  ],
  [
    "Agence web",
    "Sites et maintenance, BIC (prestations de services)",
    "36 000 € HT",
    "Oui",
    "Non",
    "Refonte site 4 500 € — art. 293 B du CGI",
  ],
];

export const ERRORS_ROWS: string[][] = [
  [
    "Facturer de la TVA en franchise",
    "Confusion entre franchise et assujettissement",
    "Redressement, pénalités, remboursement au client",
    "Vérifier son régime avant chaque facture ; mention art. 293 B",
  ],
  [
    "Oublier la mention art. 293 B",
    "Obligation légale sur chaque facture (annexe II art. 242 nonies A)",
    "Facture non conforme, rejet par le client ou l'administration",
    "Modèle de facture avec mention préremplie",
  ],
  [
    "Déduire la TVA sur ses achats",
    "Droit à déduction réservé aux assujettis",
    "Redressement sur déductions indues",
    "Comptabiliser la TVA en charge intégrale",
  ],
  [
    "Confondre seuil de base et seuil majoré",
    "Deux paliers distincts (art. 293 B)",
    "Assujettissement inopiné ou retard de préparation",
    `Suivre les deux seuils : base ${formatThreshold(servicesRow.base)} / majoré ${formatThreshold(servicesRow.major)} (services)`,
  ],
  [
    "Ne pas anticiper le dépassement",
    "Absence de suivi mensuel du CA",
    "Factures à réémettre, trésorerie impactée",
    "Alerte à 80 % du seuil majoré ; simulateur HT/TTC",
  ],
  [
    "Conserver un n° TVA intracommunautaire obsolète",
    "Numéro attribué avant retour en franchise",
    "Déclarations indues, confusion avec les clients",
    "Faire radier le numéro auprès du SIE si retour en franchise",
  ],
  [
    "Afficher des prix TTC en franchise",
    "Les prix sont nets de taxe pour le client",
    "Malentendu commercial, litige sur le montant dû",
    "Indiquer un prix unique net ; pas de ligne TVA",
  ],
  [
    "Mélanger ventes et services sans suivi séparé",
    "Deux seuils distincts (art. 293 B)",
    "Dépassement non détecté sur une catégorie",
    "Comptabilité analytique par type de recettes",
  ],
];
