import type { Guide } from "../types";
import {
  calculateInterimSalary,
  formatEuro,
  formatEuroApprox,
  formatEuroApproxWord,
  INTERIM_BREADCRUMB,
  INTERIM_FRESHNESS_LINE,
  INTERIM_H1,
  INTERIM_HS_NET_WARNING,
  INTERIM_IFM_EXCEPTIONS,
  INTERIM_META_DESCRIPTION,
  INTERIM_NET_DISCLAIMER,
  INTERIM_PATH,
  INTERIM_PUBLISHED_AT,
  INTERIM_SCOPE_DISCLAIMER,
  INTERIM_SEO_TITLE,
  INTERIM_SLUG,
  INTERIM_SMIC_MONTHLY_FORMULA_NOTE,
  INTERIM_SOURCES,
  INTERIM_SUBTITLE,
  INTERIM_UPDATED_AT,
  SMIC_CURRENT,
  SMIC_LABELS,
} from "@/site/salaire-interim";

const BRUT_VERS_NET = "/";
const SMIC_PATH = "/smic";
const SMIC_HOURS = "/smic-selon-nombre-heures";
const HS_CALC = "/calculateurs/salaire-heures-supplementaires";
const LIRE_FICHE = "/guides/comment-lire-une-fiche-de-paie";
const COTISATIONS =
  "/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net";
const PAS =
  "/guides/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne";
const GUIDES_HUB = "/guides";

function mustMission(missionGross: number, ifmDue = true) {
  const result = calculateInterimSalary({
    mode: "missionGross",
    missionGross,
    ifmDue,
    ifmRatePercent: 10,
    iccpRatePercent: 10,
  });
  if (!result) {
    throw new Error(`Calcul intérim invalide pour brut ${missionGross}`);
  }
  return result;
}

function mustHourly(hourlyRate: number, normalHours: number) {
  const result = calculateInterimSalary({
    mode: "hourly",
    hourlyRate,
    normalHours,
    overtimeHours25: 0,
    overtimeHours50: 0,
    otherGrossElements: 0,
    ifmDue: true,
    ifmRatePercent: 10,
    iccpRatePercent: 10,
  });
  if (!result) {
    throw new Error(`Calcul intérim invalide pour ${hourlyRate} € × ${normalHours} h`);
  }
  return result;
}

const ex1000 = mustMission(1000);
const exSmic = mustMission(SMIC_CURRENT.monthlyGross);
const ex14 = mustHourly(14, 151.67);
const ex15 = mustHourly(15, 35);
const exSansIfm = mustMission(2000, false);
const exHs = (() => {
  const result = calculateInterimSalary({
    mode: "hourly",
    hourlyRate: 14,
    normalHours: 140,
    overtimeHours25: 8,
    overtimeHours50: 2,
    otherGrossElements: 0,
    ifmDue: true,
    ifmRatePercent: 10,
    iccpRatePercent: 10,
  });
  if (!result) throw new Error("Exemple HS intérim invalide");
  return result;
})();

/**
 * Guide pilier : salaire en intérim (/salaire-interim-calcul-brut-net).
 * Montants : moteur `@/site/salaire-interim` + SMIC central + calculateSalary.
 */
export const salaireInterimGuide: Guide = {
  slug: INTERIM_SLUG,
  publicPath: INTERIM_PATH,
  breadcrumbLabel: INTERIM_BREADCRUMB,
  title: INTERIM_H1,
  seoTitle: INTERIM_SEO_TITLE,
  description: INTERIM_META_DESCRIPTION,
  subtitle: INTERIM_SUBTITLE,
  publishedAt: INTERIM_PUBLISHED_AT,
  updatedAt: INTERIM_UPDATED_AT,
  includeFaqSchema: true,
  faqSectionId: "questions-frequentes",
  introduction: [
    `Le salaire d'un intérimaire comprend sa rémunération brute de mission, à laquelle peuvent s'ajouter l'indemnité de fin de mission (IFM) et l'indemnité compensatrice de congés payés. Dans le cas général, avec une IFM de 10 %, les congés payés sont calculés sur le brut comprenant cette IFM : un brut de mission de 1 000 € donne donc ${formatEuro(ex1000.ifmAmount)} d'IFM et ${formatEuro(ex1000.iccpAmount)} de congés payés, soit ${formatEuro(ex1000.totalGross)} brut au total.`,
    "Le net reste une estimation, car il dépend des cotisations et de la situation du salarié. Utilisez le calculateur ci-dessous pour décomposer chaque ligne à partir de votre brut de mission ou de votre taux horaire.",
  ],
  introSummary: {
    title: "L'essentiel",
    items: [
      "L'intérimaire doit bénéficier d'une rémunération comparable à celle d'un salarié de qualification et de poste équivalents dans l'entreprise utilisatrice.",
      "L'IFM est de 10 % dans le cas général, sauf dispositions conventionnelles différentes (ou cas où elle n'est pas due).",
      "L'indemnité compensatrice de congés payés (ICCP) est au minimum égale à 10 % de la rémunération brute comprenant l'IFM lorsqu'elle est due.",
      "Dans le cas général à 10 % + 10 %, le total brut atteint 21 % de plus que le brut de mission.",
      "L'IFM et l'ICCP sont normalement versées en fin de mission, avec le dernier salaire.",
      "Le net affiché reste indicatif et est présenté avant prélèvement à la source.",
    ],
  },
  sections: [
    {
      id: "comment-est-calcule-le-salaire-interim",
      title: "Comment est calculé le salaire en intérim ?",
      blocks: [
        {
          type: "paragraph",
          text: "En intérim, l'agence de travail temporaire est l'employeur. L'entreprise utilisatrice accueille le salarié pour une mission. Le contrat de mission fixe notamment la qualification, le poste, la durée et la rémunération de référence.",
        },
        {
          type: "paragraph",
          text: "La rémunération brute de mission regroupe le salaire de base (taux horaire × heures) et, le cas échéant, les primes et accessoires de salaire dus au titre de l'égalité de rémunération. Les heures supplémentaires majorées s'ajoutent lorsqu'elles sont effectuées et qualifiées comme telles.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Rémunération brute de mission : base avant IFM et congés payés.",
            "IFM (indemnité de fin de mission, parfois appelée prime de précarité) : 10 % dans le cas général, sauf dispositions conventionnelles différentes.",
            "Indemnité compensatrice de congés payés : au minimum 10 % de la rémunération brute comprenant l'IFM lorsqu'elle est due.",
            "Net estimé : brut total après cotisations salariales, avant prélèvement à la source.",
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Le montant réellement versé peut encore différer du net avant impôt : prélèvement à la source, remboursements de frais, acomptes, retenues ou avantages. Distinguez toujours salaire et frais.",
          ],
        },
        {
          type: "internal-link",
          variant: "calculator",
          intro: "Pour convertir un brut quelconque en net estimé,",
          label: "utiliser le calculateur salaire brut vers net",
          href: BRUT_VERS_NET,
        },
      ],
    },
    {
      id: "calcul-ifm-interim",
      title: "Calcul de l'IFM en intérim",
      blocks: [
        {
          type: "paragraph",
          text: "L'indemnité de fin de mission (IFM) compense la précarité du contrat temporaire. Elle est parfois appelée « prime de précarité ». Dans le cas général, elle égale 10 % de la rémunération totale brute due au salarié pour la mission et ses éventuels renouvellements, sauf dispositions conventionnelles différentes.",
        },
        {
          type: "paragraph",
          text: "Elle est versée à la fin de la mission, en même temps que le dernier salaire, et figure sur le bulletin. Des dispositions conventionnelles peuvent prévoir des règles différentes. Utilisez un taux personnalisé uniquement lorsqu'il est prévu par votre contrat de mission, une convention ou un accord applicable.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Exemple : brut de mission ${formatEuro(1000)} → IFM à 10 % = ${formatEuro(ex1000.ifmAmount)}.`,
          ],
        },
        {
          type: "paragraph",
          text: "L'IFM n'est pas due dans certains cas prévus par le Code du travail et rappelés par Service-Public. Présentation informative (pas un diagnostic automatique) :",
        },
        {
          type: "list",
          ordered: false,
          items: [...INTERIM_IFM_EXCEPTIONS],
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "Le calculateur applique le choix « Avec IFM » ou « Sans IFM - cas particulier » sans déterminer automatiquement vos droits. En cas de doute, comparez le contrat, le bulletin et les textes officiels.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Texte officiel :",
          label: INTERIM_SOURCES.ifm.label,
          href: INTERIM_SOURCES.ifm.href,
        },
      ],
    },
    {
      id: "calcul-conges-payes-interim",
      title: "Calcul des congés payés en intérim",
      blocks: [
        {
          type: "paragraph",
          text: "Quelle que soit la durée de la mission, l'intérimaire a droit à une indemnité compensatrice de congés payés. Elle est normalement versée à la fin de la mission ou lors de la rupture, et apparaît souvent sur le reçu pour solde de tout compte.",
        },
        {
          type: "paragraph",
          text: "Le montant ne peut être inférieur à 10 % de la rémunération totale brute due au salarié. Lorsque l'IFM est due, elle entre dans cette base.",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Point fondamental : si l'IFM est due, ICCP = 10 % × (brut de mission + IFM). Ce n'est pas 10 % du seul brut de mission.",
          ],
        },
        {
          type: "paragraph",
          text: "Cette indemnité compense les droits à congés payés acquis pendant la mission. Elle est due pour chaque mission, quelle qu'en soit la durée, et est normalement versée au terme de la mission ou lors de sa rupture. Elle ne se confond ni avec le salaire de base du mois, ni avec l'IFM.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Référence :",
          label: INTERIM_SOURCES.iccp.label,
          href: INTERIM_SOURCES.iccp.href,
        },
      ],
    },
    {
      id: "pourquoi-21-pourcent",
      title: "Pourquoi IFM et congés payés représentent-ils 21 % ?",
      blocks: [
        {
          type: "paragraph",
          text: "Dans le cas général à 10 % d'IFM et 10 % de congés payés, le second pourcentage s'applique sur une base déjà majorée du premier. Le total n'est donc pas 20 %, mais 21 %.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Brut de mission : ${formatEuro(1000)}`,
            `IFM : 1 000 × 10 % = ${formatEuro(ex1000.ifmAmount)}`,
            `Base des congés payés : 1 000 + 100 = ${formatEuro(ex1000.iccpBase)}`,
            `Congés payés : 1 100 × 10 % = ${formatEuro(ex1000.iccpAmount)}`,
            `Total brut : 1 000 + 100 + 110 = ${formatEuro(ex1000.totalGross)}`,
            `Soit un coefficient de 1,21 : brut de mission × 1,21.`,
          ],
        },
        {
          type: "mistakes",
          title: "Erreur fréquente",
          items: [
            "Additionner simplement 10 % + 10 % et conclure à 20 %. Les congés payés étant calculés sur une base comprenant l'IFM, le supplément atteint 21 % dans le cas général.",
            "Croire que ces 21 % s'ajoutent chaque mois pendant une mission longue. L'IFM et l'ICCP sont en principe versées en fin de mission.",
          ],
        },
        {
          type: "paragraph",
          text: `Sans IFM, le calculateur retient ICCP = 10 % du brut de mission, soit un total brut de B × 1,10 (exemple : ${formatEuro(2000)} → ${formatEuro(exSansIfm.totalGross)}).`,
        },
      ],
    },
    {
      id: "exemples-calcul-salaire-interim",
      title: "Exemples de calcul d'un salaire en intérim",
      blocks: [
        {
          type: "paragraph",
          text: "Les montants ci-dessous sont produits par le même moteur que le calculateur. Le net est indicatif, avant prélèvement à la source.",
        },
      ],
      subsections: [
        {
          id: "exemple-smic-35-heures",
          title: "Exemple 1 – Mission au SMIC sur une base de 35 heures",
          blocks: [
            {
              type: "paragraph",
              text: `Avec le ${INTERIM_SMIC_MONTHLY_FORMULA_NOTE}`,
            },
            {
              type: "list",
              ordered: false,
              items: [
                `Brut de mission : ${formatEuro(exSmic.missionGross)}`,
                `IFM à 10 % : ${formatEuro(exSmic.ifmAmount)}`,
                `ICCP à 10 % : ${formatEuro(exSmic.iccpAmount)}`,
                `Total brut : ${formatEuro(exSmic.totalGross)}`,
                `Net estimé (indicatif) : ${formatEuroApprox(exSmic.netEstimated)}`,
              ],
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Pour le détail du SMIC selon la durée,",
              label: "voir le SMIC selon le nombre d'heures",
              href: SMIC_HOURS,
            },
          ],
        },
        {
          id: "exemple-14-euros-heure",
          title: "Exemple 2 – Taux horaire de 14 € et 151,67 heures saisies",
          blocks: [
            {
              type: "list",
              ordered: false,
              items: [
                `Brut de mission : 14 × 151,67 = ${formatEuro(ex14.missionGross)}`,
                `IFM : ${formatEuro(ex14.ifmAmount)}`,
                `ICCP : ${formatEuro(ex14.iccpAmount)}`,
                `Total brut : ${formatEuro(ex14.totalGross)}`,
                `Net estimé (indicatif) : ${formatEuroApprox(ex14.netEstimated)}`,
              ],
            },
            {
              type: "callout",
              variant: "hint",
              paragraphs: [
                "Il s'agit d'un exemple fondé sur les heures saisies, et non d'un montant réglementaire. Le volume 151,67 h est une référence de mensualisation courante à 35 h. Il ne justifie pas mathématiquement le SMIC mensuel officiel, calculé avec la mensualisation exacte 35 × 52 ÷ 12.",
              ],
            },
          ],
        },
        {
          id: "exemple-mission-courte",
          title: "Exemple 3 – Mission courte (15 € × 35 h)",
          blocks: [
            {
              type: "list",
              ordered: false,
              items: [
                `Brut : ${formatEuro(ex15.missionGross)}`,
                `IFM : ${formatEuro(ex15.ifmAmount)}`,
                `ICCP : ${formatEuro(ex15.iccpAmount)}`,
                `Total brut : ${formatEuro(ex15.totalGross)}`,
                `Net estimé (indicatif) : ${formatEuroApprox(ex15.netEstimated)}`,
              ],
            },
          ],
        },
        {
          id: "exemple-sans-ifm",
          title: "Exemple 4 – Cas sans IFM (brut de mission 2 000 €)",
          blocks: [
            {
              type: "list",
              ordered: false,
              items: [
                `IFM : ${formatEuro(exSansIfm.ifmAmount)}`,
                `ICCP : ${formatEuro(exSansIfm.iccpAmount)}`,
                `Total brut : ${formatEuro(exSansIfm.totalGross)}`,
                `Net estimé (indicatif) : ${formatEuroApprox(exSansIfm.netEstimated)}`,
              ],
            },
            {
              type: "callout",
              variant: "warning",
              paragraphs: [
                "Résultat mathématique lorsque l'absence d'IFM est retenue dans la simulation. Cela ne prouve pas, à lui seul, que l'IFM n'est pas due dans votre cas.",
              ],
            },
          ],
        },
        {
          id: "exemple-heures-supplementaires",
          title: "Exemple 5 – Avec heures supplémentaires",
          blocks: [
            {
              type: "paragraph",
              text: `Taux 14 €, 140 h normales (${formatEuro(exHs.normalHoursGross)}), 8 h à +25 % (${formatEuro(exHs.overtime25Gross)}), 2 h à +50 % (${formatEuro(exHs.overtime50Gross)}) : brut de mission ${formatEuro(exHs.missionGross)}, IFM ${formatEuro(exHs.ifmAmount)}, ICCP ${formatEuro(exHs.iccpAmount)}, total brut ${formatEuro(exHs.totalGross)}, net estimé ${formatEuroApprox(exHs.netEstimated)}.`,
            },
            {
              type: "callout",
              variant: "vigilance",
              paragraphs: [INTERIM_HS_NET_WARNING],
            },
            {
              type: "internal-link",
              variant: "simulator",
              intro: "Pour estimer plus finement les majorations,",
              label: "ouvrir le calculateur d'heures supplémentaires",
              href: HS_CALC,
            },
          ],
        },
      ],
    },
    {
      id: "quand-sont-verses-salaire-ifm-conges",
      title: "Quand les sommes sont-elles versées ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le salarié intérimaire fait partie des salariés qui ne bénéficient pas automatiquement de la mensualisation. En principe, son salaire doit donc être versé au moins deux fois par mois, avec un intervalle maximal de seize jours entre deux paiements.",
        },
        {
          type: "paragraph",
          text: "L'IFM et l'indemnité compensatrice de congés payés sont, quant à elles, normalement versées à la fin de la mission avec le dernier salaire.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Pendant la mission : versement de la rémunération correspondant au travail effectué, selon les règles de paiement applicables.",
            "En fin de mission : dernier salaire, IFM lorsqu'elle est due et indemnité compensatrice de congés payés.",
            "Le salaire courant ne doit pas être confondu avec le solde versé à la fin de la mission.",
          ],
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Sur une mission longue, les 21 % ne s'ajoutent pas automatiquement à chaque versement de salaire. L'IFM et l'ICCP interviennent surtout au solde de fin de mission, sauf pratique différente documentée sur vos bulletins.",
          ],
        },
      ],
    },
    {
      id: "que-faut-il-inclure-dans-le-calcul",
      title: "Que faut-il inclure dans le calcul ?",
      blocks: [
        {
          type: "table",
          caption: "Traitement des éléments dans le calculateur",
          headers: ["Élément", "Traitement dans le calcul", "Point de vigilance"],
          rows: [
            [
              "Heures normales",
              "Incluses dans le brut de mission",
              "Utiliser le taux contractuel",
            ],
            [
              "Heures supplémentaires",
              "Incluses avec leur majoration",
              "Accord collectif possible",
            ],
            [
              "Primes de salaire liées à la mission",
              "À inclure si elles entrent dans la rémunération brute",
              "Vérifier leur nature au contrat / bulletin",
            ],
            [
              "IFM",
              "Ajoutée si elle est retenue comme due",
              "10 % dans le cas général",
            ],
            [
              "ICCP",
              "Calculée après l'IFM",
              "Minimum de 10 %",
            ],
            [
              "Remboursements de frais professionnels",
              "Affichés séparément",
              "Uniquement lorsqu'ils correspondent réellement à des frais professionnels",
            ],
            [
              "Primes ou indemnités de panier, repas ou déplacement",
              "Dépend de leur qualification",
              "Vérifier le contrat et le bulletin de paie",
            ],
            [
              "Prélèvement à la source",
              "Non déduit du net principal",
              "Dépend du taux personnel",
            ],
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour comprendre le prélèvement à la source,",
          label: "lire le guide du prélèvement à la source",
          href: PAS,
        },
      ],
    },
    {
      id: "taux-horaire-interim-et-smic",
      title: "Un intérimaire peut-il être payé uniquement au SMIC ?",
      blocks: [
        {
          type: "paragraph",
          text: "Oui, mais seulement si cette rémunération respecte aussi le principe d'égalité de rémunération. L'intérimaire doit percevoir au moins la rémunération, les primes et les accessoires accordés à un salarié de qualification et de poste équivalents dans l'entreprise utilisatrice.",
        },
        {
          type: "paragraph",
          text: `Le SMIC (${SMIC_LABELS.hourlyGross} depuis le barème actuellement applicable) reste un plancher général. Il ne constitue jamais un plafond : l'égalité de rémunération (article L1251-18) peut imposer un montant plus élevé que le SMIC.`,
        },
        {
          type: "paragraph",
          text: "Le calculateur ne peut pas déterminer seul ce salaire de comparaison : il part des montants que vous saisissez.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Montants officiels du SMIC :",
          label: "consulter la page SMIC",
          href: SMIC_PATH,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Texte :",
          label: INTERIM_SOURCES.egaliteRemuneration.label,
          href: INTERIM_SOURCES.egaliteRemuneration.href,
        },
      ],
    },
    {
      id: "verifier-fiche-de-paie-interim",
      title: "Comment vérifier une fiche de paie d'intérim ?",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Taux horaire",
              description: "Comparez le taux du bulletin au contrat de mission.",
            },
            {
              title: "Heures normales",
              description: "Contrôlez le volume d'heures normales payées.",
            },
            {
              title: "Heures supplémentaires",
              description: "Vérifiez les majorations et les volumes.",
            },
            {
              title: "Primes et accessoires",
              description: "Identifiez ce qui entre dans la rémunération brute de mission.",
            },
            {
              title: "Base de l'IFM",
              description: "Repérez le brut de mission retenu pour l'indemnité de fin de mission.",
            },
            {
              title: "Taux de l'IFM",
              description: "Contrôlez le pourcentage appliqué (souvent 10 %).",
            },
            {
              title: "ICCP et IFM",
              description: "Vérifiez que l'indemnité de congés payés tient compte de l'IFM lorsqu'elle est due.",
            },
            {
              title: "Brut, net, PAS",
              description: "Distinguez salaire brut, net avant impôt, prélèvement à la source et net versé.",
            },
            {
              title: "Frais",
              description: "Séparez les remboursements de frais du salaire.",
            },
            {
              title: "Contrat et convention",
              description: "Comparez avec le contrat de mission et la convention collective applicable.",
            },
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour comprendre les lignes du bulletin,",
          label: "apprendre à lire une fiche de paie",
          href: LIRE_FICHE,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le détail des cotisations,",
          label: "comprendre les cotisations salariales",
          href: COTISATIONS,
        },
      ],
    },
    {
      id: "situations-non-couvertes",
      title: "Situations non couvertes par l'estimation standard",
      blocks: [
        {
          type: "paragraph",
          text: "Cette page traite le cas général du contrat de mission. Elle ne simule pas automatiquement :",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "CDI intérimaire",
            "Contrat d'apprentissage ou de professionnalisation",
            "Conventions collectives ou accords prévoyant des règles différentes",
            "Taux spécifiques de majoration des heures supplémentaires",
            "Situations particulières de rupture",
            "Mission saisonnière (IFM souvent exclue, sauf disposition plus favorable)",
            "Compte épargne-temps",
            "Primes dont l'assiette est particulière",
            "Retenues, acomptes ou saisies",
            "Mutuelle et prévoyance",
            "Remboursements de frais professionnels et traitement particulier de certaines primes ou indemnités de panier, de repas ou de déplacement",
            "Prélèvement à la source personnalisé",
            "Toute situation nécessitant une analyse personnalisée",
          ],
        },
      ],
    },
    {
      id: "methodologie-sources",
      title: "Méthodologie et sources",
      blocks: [
        {
          type: "paragraph",
          text: INTERIM_FRESHNESS_LINE,
        },
        {
          type: "paragraph",
          text: "Formules retenues par le calculateur :",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Brut de mission (mode horaire) = heures normales × taux + HS 25 % × taux × 1,25 + HS 50 % × taux × 1,50 + autres éléments bruts",
            "IFM = brut de mission × taux IFM (10 % dans le cas général, sauf dispositions conventionnelles) si incluse, sinon 0",
            "ICCP = (brut de mission + IFM) × taux ICCP (minimum légal 10 %)",
            "Total brut = brut de mission + IFM + ICCP",
            "Net estimé = moteur central brut/net du site (profil non-cadre, avant prélèvement à la source), affiché arrondi à l'euro",
            "Arrondi des bruts : chaque composante monétaire au centime (fonction roundCent partagée)",
            "Remboursements de frais : hors assiette IFM/ICCP et hors net salarial, ligne séparée",
          ],
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            INTERIM_SCOPE_DISCLAIMER,
            INTERIM_NET_DISCLAIMER,
            INTERIM_HS_NET_WARNING,
            "Cette page ne constitue pas un conseil juridique, fiscal ou social personnalisé.",
          ],
        },
        {
          type: "paragraph",
          text: "Sources officielles :",
        },
        {
          type: "list",
          ordered: false,
          items: Object.values(INTERIM_SOURCES).map((source) => ({
            text: `${source.org} :`,
            href: source.href,
            label: source.label,
          })),
        },
      ],
    },
  ],
  faqTitle: "Questions fréquentes",
  faqIntro:
    "Réponses courtes sur le calcul du salaire en intérim, l'IFM, les congés payés et le net estimé.",
  faq: [
    {
      question: "Comment calculer son salaire en intérim ?",
      answer: `Additionnez le brut de mission, l'IFM (si due) et l'indemnité de congés payés. Dans le cas général à 10 % + 10 %, le total brut égale le brut de mission × 1,21. Exemple : 1 000 € → ${formatEuro(ex1000.totalGross)}. Estimez ensuite le net avec le moteur brut/net (indicatif, avant prélèvement à la source).`,
    },
    {
      question: "Quel est le montant de l'IFM en intérim ?",
      answer:
        "Dans le cas général, l'IFM égale 10 % de la rémunération totale brute due pour la mission et ses renouvellements, sauf dispositions conventionnelles différentes. Certains cas d'exclusion sont précisés par Service-Public et le Code du travail.",
    },
    {
      question: "Comment calculer 10 % d'IFM ?",
      answer: `Multipliez le brut de mission par 0,10. Exemple : ${formatEuro(1000)} × 10 % = ${formatEuro(ex1000.ifmAmount)}.`,
    },
    {
      question: "Pourquoi l'IFM et les congés payés représentent-ils 21 % ?",
      answer:
        "Parce que les congés payés se calculent sur le brut de mission plus l'IFM. Avec 10 % puis 10 %, le facteur total est 1,21 et non 1,20.",
    },
    {
      question: "Les congés payés sont-ils calculés sur l'IFM ?",
      answer:
        "Oui, lorsque l'IFM est due : la base de l'indemnité compensatrice de congés payés comprend la rémunération brute et l'IFM.",
    },
    {
      question: "Quand l'IFM est-elle versée ?",
      answer:
        "En principe à la fin de la mission, avec le dernier salaire. Elle figure sur le bulletin correspondant.",
    },
    {
      question: "Dans quels cas l'IFM n'est-elle pas due ?",
      answer: `Parmi les cas souvent cités : ${INTERIM_IFM_EXCEPTIONS.join(" ; ")}. Vérifiez toujours votre situation au regard du contrat et des textes officiels.`,
    },
    {
      question: "L'IFM est-elle incluse dans le salaire brut ?",
      answer:
        "L'IFM s'ajoute à la rémunération de mission pour former le total brut avec indemnités. Elle n'est pas le salaire de base du mois courant.",
    },
    {
      question: "L'IFM et les congés payés sont-ils inclus dans le net ?",
      answer:
        "Ils entrent d'abord dans le total brut. Le net estimé est calculé sur ce total brut. Le bulletin réel peut différer selon les cotisations et le prélèvement à la source.",
    },
    {
      question: "Quel salaire en intérim pour 35 heures au SMIC ?",
      answer: `${INTERIM_SMIC_MONTHLY_FORMULA_NOTE} IFM ${formatEuro(exSmic.ifmAmount)}, ICCP ${formatEuro(exSmic.iccpAmount)}, total brut ${formatEuro(exSmic.totalGross)}, net estimé ${formatEuroApproxWord(exSmic.netEstimated)} (indicatif, avant prélèvement à la source).`,
    },
    {
      question: "Les heures supplémentaires sont-elles majorées en intérim ?",
      answer:
        "Oui, les règles de durée du travail et de majoration s'appliquent. Le calculateur laisse saisir les volumes déjà majorés à +25 % ou +50 % ; un accord peut fixer d'autres taux.",
    },
    {
      question: "Un intérimaire doit-il être payé comme un salarié de l'entreprise ?",
      answer:
        "Il doit bénéficier d'une rémunération au moins équivalente à celle d'un salarié de qualification et de poste équivalents dans l'entreprise utilisatrice (égalité de rémunération).",
    },
    {
      question: "Les paniers-repas et frais de déplacement entrent-ils dans l'IFM ?",
      answer:
        "Les remboursements de frais professionnels n'entrent pas dans la rémunération brute utilisée par ce calculateur. En revanche, le traitement d'une indemnité de panier, de repas ou de déplacement dépend de sa nature. Vérifiez sa qualification sur le contrat et le bulletin de paie.",
    },
    {
      question: "Comment vérifier une fiche de paie d'intérim ?",
      answer:
        "Contrôlez le taux, les heures, les primes, la base et le taux d'IFM, le calcul des congés payés (avec IFM si due), puis séparez frais, net avant impôt et prélèvement à la source.",
    },
    {
      question: "Le simulateur donne-t-il le montant exact qui sera versé ?",
      answer:
        "Non. Le net affiché reste indicatif et est présenté avant prélèvement à la source.",
    },
    {
      question: "Que devient l'IFM en cas d'embauche en CDI ?",
      answer:
        "Lorsqu'un CDI est conclu immédiatement avec l'entreprise utilisatrice à l'issue de la mission, l'IFM n'est en principe pas due. C'est l'un des cas d'exclusion rappelés par les sources officielles.",
    },
  ],
  conclusion: {
    title: "Vérifiez le calcul de votre salaire en intérim",
    keyPoints: [],
    closingText:
      "Utilisez le simulateur pour décomposer votre rémunération de mission, l'IFM et les congés payés, puis comparez chaque montant avec votre contrat et votre bulletin de paie.",
    closingCta: {
      label: "Recalculer mon salaire en intérim",
      href: `${INTERIM_PATH}#calculateur-salaire-interim`,
    },
  },
  sidebar: {
    calculator: {
      title: "Calculateur brut vers net",
      description: "Estimez votre salaire net à partir du brut.",
      href: BRUT_VERS_NET,
    },
    relatedGuides: [
      { title: "SMIC : montants officiels", href: SMIC_PATH },
      { title: "SMIC selon le nombre d'heures", href: SMIC_HOURS },
      { title: "Lire une fiche de paie", href: LIRE_FICHE },
      { title: "Cotisations salariales", href: COTISATIONS },
      { title: "Prélèvement à la source", href: PAS },
      { title: "Tous les guides", href: GUIDES_HUB },
    ],
    relatedSimulator: {
      title: "Heures supplémentaires",
      description: "Estimez le brut et le net des majorations.",
      href: HS_CALC,
    },
  },
};
