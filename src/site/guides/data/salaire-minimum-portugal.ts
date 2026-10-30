import type { Guide } from "../types";
import {
  PT_COMPARE_FR_FROM_LABEL,
  PT_EUROSTAT_DATASET,
  PT_EUROSTAT_PERIOD,
  PT_EUROSTAT_PERIOD_LABEL,
  PT_HOURLY_EXAMPLE_WEEKLY_HOURS,
  PT_MADEIRA_DECREE_PUBLISHED_ON_LABEL,
  PT_MADEIRA_EFFECTS_FROM_LABEL,
  PT_MADEIRA_INCREASE_PERCENT_LABEL,
  PT_MADEIRA_VS_CONTINENTAL_PERCENT_LABEL,
  PT_MIN_WAGE_BREADCRUMB,
  PT_MIN_WAGE_H1,
  PT_MIN_WAGE_LABELS as L,
  PT_MIN_WAGE_META_DESCRIPTION,
  PT_MIN_WAGE_PATH,
  PT_MIN_WAGE_PUBLISHED_AT,
  PT_MIN_WAGE_SEO_TITLE,
  PT_MIN_WAGE_SLUG,
  PT_MIN_WAGE_SOURCES as S,
  PT_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  PT_MIN_WAGE_SUBTITLE,
  PT_MIN_WAGE_UPDATED_AT,
  PT_PART_TIME_EXAMPLE_FULL_TIME_HOURS,
  PT_PART_TIME_EXAMPLE_HOURS,
  PT_RMMG_DECREE,
  PT_RMMG_EFFECTS_FROM_LABEL,
  PT_RMMG_IN_FORCE_FROM_LABEL,
  PT_RMMG_PUBLISHED_ON_LABEL,
  PT_TRAINING_MAX_MONTHS,
  PT_TRAINING_SHORT_MONTHS,
} from "@/site/salaire-minimum-portugal";

const SMIC_EUROPE_HREF = "/smic-europe";
const SMIC_EUROPE_PT_HREF = "/smic-europe#salaire-minimum-portugal";
const SMIC_HREF = "/smic";
const ES_HREF = "/salaire-minimum-espagne";
const LU_HREF = "/salaire-minimum-luxembourg";

/**
 * Guide pays : salaire minimum portugais (RMMG).
 * URL canonique : /salaire-minimum-portugal
 * Complète /smic-europe sans le remplacer.
 */
export const salaireMinimumPortugalGuide: Guide = {
  slug: PT_MIN_WAGE_SLUG,
  publicPath: PT_MIN_WAGE_PATH,
  breadcrumbLabel: PT_MIN_WAGE_BREADCRUMB,
  title: PT_MIN_WAGE_H1,
  seoTitle: PT_MIN_WAGE_SEO_TITLE,
  description: PT_MIN_WAGE_META_DESCRIPTION,
  subtitle: PT_MIN_WAGE_SUBTITLE,
  publishedAt: PT_MIN_WAGE_PUBLISHED_AT,
  updatedAt: PT_MIN_WAGE_UPDATED_AT,
  includeFaqSchema: true,
  faqSectionId: "questions-frequentes",
  faqTitle: "Questions fréquentes sur le salaire minimum au Portugal",
  faqIntro:
    "Réponses courtes sur la RMMG, les 12 ou 14 versements, les territoires, le temps partiel, le net et 2027.",
  introduction: [
    `Le salaire minimum au Portugal s'appelle retribuição mínima mensal garantida, abrégée RMMG. Depuis le ${PT_RMMG_EFFECTS_FROM_LABEL}, elle s'élève à ${L.continentalMonthly} brut par mois de référence sur le continent, pour un temps plein. Sur une année complète, 12 mensualités et deux indemnités supplémentaires donnent un total de ${L.continentalAnnual} brut. Ce n'est pas le même montant à Madère (${L.madeiraMonthly}) ni aux Açores (${L.azoresMonthly}).`,
    "En France, on parle souvent de « SMIC Portugal » ou de « SMIC portugais ». L'expression est comprise, mais le terme officiel est la RMMG. Ce montant est brut. Il n'est ni un salaire net, ni le salaire moyen, ni l'IAS utilisé pour certaines prestations.",
  ],
  sections: [
    {
      id: "montant-actuel",
      title: "Quel est le salaire minimum au Portugal ?",
      blocks: [
        {
          type: "paragraph",
          text: `Les règles de contrat et de rémunération détaillées ici concernent les salariés relevant du Código do Trabalho ; la fonction publique a ses propres barèmes et règles. Chaque année, un décret-loi fixe la retribuição mínima mensal garantida, après consultation de la Commission permanente de concertation sociale, en application de l'article 273. Pour 2026, le ${PT_RMMG_DECREE} du ${PT_RMMG_PUBLISHED_ON_LABEL} retient ${L.continentalMonthly} brut par mois. Le texte s'applique au territoire continental. Il n'y a pas de distinction selon le sexe ni selon l'âge pour ce plancher général.`,
        },
        {
          type: "paragraph",
          text: `Le décret entre en vigueur le ${PT_RMMG_IN_FORCE_FROM_LABEL} et produit ses effets au ${PT_RMMG_EFFECTS_FROM_LABEL}. La DGERT reprend le même montant et la même date. ${L.continentalMonthly} n'est donc pas un minimum identique dans tout le pays : Madère et les Açores ont leurs propres textes, présentés plus bas.`,
        },
        {
          type: "paragraph",
          text: "Sur une offre, le brut mensuel de référence n'est qu'une ligne : il faut aussi regarder les indemnités, le nombre de versements et les avantages. Selon l'article 274, certains éléments peuvent entrer dans l'appréciation du minimum, au-delà du seul salaire de base.",
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            `Le total ${L.continentalAnnual} brut n'est pas un barème annuel publié comme tel dans le décret. C'est le calcul 12 mensualités plus deux indemnités supplémentaires, pour une année complète à temps plein, à la référence continentale. Il sert à comparer, pas à remplacer le paiement de chaque échéance.`,
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour situer le Portugal parmi les autres pays européens,",
          label: "comparer les salaires minimums en Europe",
          href: SMIC_EUROPE_HREF,
        },
      ],
    },
    {
      id: "territoires",
      title: "Continent, Madère et Açores : quels montants ?",
      blocks: [
        {
          type: "paragraph",
          text: `Le ${PT_RMMG_DECREE} limite son champ au continent. Les régions autonomes peuvent fixer un minimum distinct. Ce ne sont pas des aides locales, ni le coût de la vie, ni un barème de Lisbonne, de Porto ou de l'Algarve. Le lieu de résidence ne détermine pas à lui seul le plancher : c'est le territoire applicable à l'emploi, et le texte qui le régit, qu'il faut identifier.`,
        },
        {
          type: "table",
          caption: `RMMG brute de référence, temps plein, année complète, droits complets. Les annuels sont des calculs (mensuel × 14), pas des barèmes annuels publiés.`,
          headers: [
            "Territoire",
            "Mensuel brut de référence",
            "Annuel de référence",
            "Date d'effet",
          ],
          stackOnMobile: true,
          rowHeader: true,
          rows: [
            [
              "Portugal continental",
              L.continentalMonthly,
              L.continentalAnnual,
              PT_RMMG_EFFECTS_FROM_LABEL,
            ],
            [
              "Région autonome des Açores",
              L.azoresMonthly,
              L.azoresAnnual,
              PT_RMMG_EFFECTS_FROM_LABEL,
            ],
            [
              "Région autonome de Madère",
              L.madeiraMonthly,
              L.madeiraAnnual,
              PT_MADEIRA_EFFECTS_FROM_LABEL,
            ],
          ],
        },
        {
          type: "paragraph",
          text: `Aux Açores, le Decreto Legislativo Regional n.º 8/2002/A, dans sa rédaction actuelle, majorée notamment par le Decreto Legislativo Regional n.º 37/2023/A, prévoit un acréscimo de 5 % sur le salaire minimum national des salariés. Sur ${L.continentalMonthly}, cela donne ${L.azoresMonthly}. La page de la Direction régionale de la qualification professionnelle et de l'emploi retient ce montant à compter du ${PT_RMMG_EFFECTS_FROM_LABEL}.`,
        },
        {
          type: "paragraph",
          text: `À Madère, le Decreto Legislativo Regional n.º 1/2026/M, publié le ${PT_MADEIRA_DECREE_PUBLISHED_ON_LABEL}, fixe la RMMG à ${L.madeiraMonthly}. L'article 4 produit des effets au ${PT_MADEIRA_EFFECTS_FROM_LABEL} : la publication de février n'est pas un report de la hausse. Par rapport au continent, l'écart est de ${PT_MADEIRA_VS_CONTINENTAL_PERCENT_LABEL}. Par rapport au minimum madérien précédent, la hausse est de ${L.madeiraIncrease}, soit ${PT_MADEIRA_INCREASE_PERCENT_LABEL}.`,
        },
        {
          type: "callout",
          variant: "verify",
          paragraphs: [
            "Les règles fiscales régionales (retenue IRS aux Açores ou à Madère) ne se déduisent pas de ces seuls minima. Un montant plus élevé n'implique pas automatiquement la même retenue, ni le même impôt final.",
          ],
        },
      ],
    },
    {
      id: "quatorze-versements",
      title: "Pourquoi parle-t-on de 14 versements ?",
      blocks: [
        {
          type: "paragraph",
          text: `On parle de 14 versements, ou 14 paies, parce que le salarié a droit, en plus des 12 mensualités ordinaires, à une indemnité de Noël (subsídio de Natal) et à une indemnité supplémentaire de vacances (subsídio de férias). Cela ne signifie pas que l'on travaille 14 mois. Sur le continent, à la référence minimale et pour une année complète, ${L.continentalMonthly} × 14 = ${L.continentalAnnual}.`,
        },
        {
          type: "paragraph",
          text: `L'article 263 du Código do Trabalho fixe l'indemnité de Noël à un mois de rémunération, à payer au plus tard le 15 décembre. Elle est proportionnelle au temps de service dans l'année d'embauche, de fin de contrat ou de suspension du contrat pour un motif concernant le salarié, selon les conditions légales.`,
        },
        {
          type: "paragraph",
          text: "L'article 264 distingue deux choses. Pendant les congés, le salarié reçoit la rémunération qu'il aurait eue s'il avait travaillé. En plus, il a droit au subsídio de férias, qui comprend la rémunération de base et d'autres prestations liées au mode d'exécution du travail, correspondant à la durée minimale des congés. Cette indemnité supplémentaire ne remplace pas le salaire des congés.",
        },
        {
          type: "paragraph",
          text: `Sauf accord écrit contraire, l'indemnité de vacances se paie avant le début des congés, et au prorata si les congés sont fractionnés. L'employeur ne choisit pas librement n'importe quel calendrier. Les duodécimos, c'est-à-dire le versement par douzièmes avec chaque mensualité, peuvent être prévus par un accord écrit ou par l'instrument de réglementation collective applicable, surtout pour l'indemnité de vacances. Pour l'indemnité de Noël, le Code impose toujours que le total soit payé au 15 décembre. D'anciens régimes temporaires de fractionnement n'ont plus cours. Une réforme examinée en 2026 n'a pas été adoptée.`,
        },
        {
          type: "table",
          caption: `Lecture pédagogique du total continental, année complète, temps plein (${PT_RMMG_EFFECTS_FROM_LABEL}).`,
          headers: ["Lecture", "Montant brut", "Précision"],
          stackOnMobile: true,
          rowHeader: true,
          rows: [
            [
              "Mensualité de référence",
              L.continentalMonthly,
              `Salaire de base de ${L.continentalMonthly}, sans autres éléments de rémunération`,
            ],
            [
              "Total annuel de référence",
              L.continentalAnnual,
              "12 mensualités et deux indemnités, calculé",
            ],
            [
              "Moyenne sur 12 mois",
              L.continentalTwelve,
              "Mensualisation pédagogique, pas un second minimum légal",
            ],
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `${L.continentalTwelve} vient de ${L.continentalAnnual} ÷ 12, arrondi au centime. ${L.continentalTwelve} × 12 ne redonne pas exactement ${L.continentalAnnual} : le total annuel exact vient du calcul non arrondi. Les paiements peuvent nécessiter un ajustement de centimes. Cette moyenne n'est pas le salaire de base obligatoire, ni un montant nécessairement versé chaque mois.`,
          ],
        },
        {
          type: "paragraph",
          text: "En cas d'entrée ou de sortie en cours d'année, les indemnités se calculent au prorata du temps de service. Certaines absences ou suspensions réduisent le droit. Ce guide n'entre pas dans le détail du calcul des congés : le bulletin et, le cas échéant, la convention restent la référence concrète.",
        },
      ],
    },
    {
      id: "salaire-base-primes",
      title: "Salaire de base, primes, repas et convention collective",
      blocks: [
        {
          type: "paragraph",
          text: "L'article 258 du Código do Trabalho définit la retribuição comme la prestation due en contrepartie du travail, selon le contrat, les normes qui le régissent ou les usages. Elle comprend la rémunération de base et d'autres prestations régulières et périodiques, en argent ou en nature. L'article 260 écarte notamment les notes de frais, certaines gratifications extraordinaires, des primes de mérite non garanties d'avance, et le subsídio de refeição lorsqu'il a le même régime que ces sommes.",
        },
        {
          type: "paragraph",
          text: "Pour le plancher mensuel, l'article 274 est plus précis. La RMMG inclut la valeur de certaines prestations en nature dues pour le travail normal, notamment l'alimentation ou le logement, les commissions sur ventes ou primes de production, et les gratifications qui constituent une rémunération au sens de l'article 260. Elle n'inclut pas un subsídio, un prémio, une gratification ou une autre prestation d'attribution accidentelle, ou portant sur une période supérieure à un mois. Les indemnités de Noël et de vacances, versées sur l'année, n'entrent donc pas dans le compte du mois.",
        },
        {
          type: "paragraph",
          text: "Lorsqu'un avantage en nature compte, il se valorise selon les prix courants de la région, dans des plafonds légaux. L'employeur ne le valorise pas librement.",
        },
        {
          type: "paragraph",
          text: "Le subsídio de alimentação, ou indemnité de repas, n'est pas dû à tous les salariés du privé par le seul Código do Trabalho. Il l'est si le contrat, le règlement interne, un usage de l'entreprise ou la convention l'impose. Dans la fonction publique, la Portaria n.º 51-B/2026/1 fixe le montant applicable en 2026 à 6,15 € par jour. Ce chiffre sert aussi de référence fiscale pour l'exonération, pas d'obligation universelle dans le privé. Fournir un repas et verser une indemnité de repas ne sont pas la même chose. On n'ajoute pas cette indemnité à la RMMG pour en faire un « SMIC portugais » plus élevé.",
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "Sur une offre, séparez le salaire de base, les indemnités, le nombre de versements et les avantages. Un brut « tout compris » peut mélanger des éléments qui ne se comparent pas.",
          ],
        },
        {
          type: "paragraph",
          text: "Un instrument de réglementation collective du travail (IRCT), souvent une convention collective, peut prévoir un barème supérieur. Le code d'activité de l'entreprise ne suffit pas à prouver qu'une convention s'applique. L'absence de résultat dans un moteur de recherche ne signifie pas qu'aucune convention n'existe.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Identifier le secteur",
              description:
                "Repérez l'activité, la catégorie et, si possible, l'instrument qui pourrait s'appliquer.",
            },
            {
              title: "Rechercher à la DGERT",
              description:
                "Utilisez l'outil officiel de recherche des conventions et le Boletim do Trabalho e Emprego.",
            },
            {
              title: "Vérifier le champ",
              description:
                "Contrôlez le champ professionnel et géographique, les parties signataires et une éventuelle portaria de extensão, qui peut étendre une convention à d'autres employeurs du secteur.",
            },
            {
              title: "Lire le barème à la bonne date",
              description:
                "Catégorie, ancienneté et date d'effet du tableau. Un barème plus élevé que la RMMG peut être dû.",
            },
          ],
        },
        {
          type: "list",
          items: [
            {
              text: "Recherche des conventions collectives.",
              href: S.dgertIrct.href,
              label: S.dgertIrct.org,
            },
          ],
        },
      ],
    },
    {
      id: "horaire-temps-partiel",
      title: "Quel montant par heure et à temps partiel ?",
      blocks: [
        {
          type: "paragraph",
          text: `L'article 203 du Código do Trabalho fixe la durée maximale de la période normale de travail à ${L.dailyHours} heures par jour et ${L.weeklyHours} heures par semaine, sauf régime plus favorable. Ce n'est pas forcément la durée concrète de tous les contrats : la convention ou le contrat peuvent prévoir moins, sans baisser la rémunération.`,
        },
        {
          type: "paragraph",
          text: `L'article 271 donne la valeur horaire de la rémunération mensuelle : (Rm × 12) ÷ (52 × n). Rm est la rémunération mensuelle. n est la durée hebdomadaire, en moyenne en cas d'adaptabilité. La formule utilise 12, pas 14 : elle ne s'applique pas à un montant déjà mensualisé avec les deux indemnités.`,
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Exemple, Portugal continental, salarié au plancher de ${L.continentalMonthly}, durée hebdomadaire de ${PT_HOURLY_EXAMPLE_WEEKLY_HOURS} heures. La formule de l'article 271 donne ${L.hourlyExample} brut de l'heure, arrondi au centime. Ce n'est pas un taux horaire universel pour tous les salariés du pays.`,
          ],
        },
        {
          type: "paragraph",
          text: `Le temps partiel, articles 150 et 154, est une période normale de travail inférieure à celle d'un temps plein comparable. La rémunération de base et les autres prestations se calculent, en principe, au prorata de la durée hebdomadaire. Il n'existe pas de minimum français de 24 heures.`,
        },
        {
          type: "paragraph",
          text: `Exemple pédagogique, continent, ${PT_PART_TIME_EXAMPLE_HOURS} heures si le temps plein comparable est de ${PT_PART_TIME_EXAMPLE_FULL_TIME_HOURS} heures, année complète, droits complets, référence minimale : ${L.partTimeMonthly} brut par mois de référence, ${L.partTimeAnnual} brut sur l'année, soit une moyenne pédagogique de ${L.partTimeTwelve} sur 12 mois. Ce n'est pas le salaire exact dû à tout salarié à ${PT_PART_TIME_EXAMPLE_HOURS} heures. Si la convention fixe un temps plein plus court ou un barème supérieur, le calcul change.`,
        },
      ],
    },
    {
      id: "jeunes",
      title: "Jeunes, stages et formation",
      blocks: [
        {
          type: "paragraph",
          text: `La RMMG générale ne baisse pas du seul fait de l'âge. Un étudiant qui a un emploi ordinaire se réfère au même plancher, éventuellement proratisé. L'article 275 prévoit toutefois des réductions encadrées, distinctes d'un abattement automatique pour tous les jeunes ou tous les stagiaires.`,
        },
        {
          type: "paragraph",
          text: `Pour une personne en pratique professionnelle, un apprenti, un stagiaire ou une personne en formation, lorsque cette formation est certifiée, la réduction est de 20 %. Sur le continent, le plancher correspondant est ${L.trainingFloor} brut par mois de référence. Cette réduction ne s'applique pas plus de ${PT_TRAINING_MAX_MONTHS} mois, y compris le temps de formation chez un autre employeur, documenté et visant la même qualification. Le délai passe à ${PT_TRAINING_SHORT_MONTHS} mois si la personne est déjà titulaire d'un cours technique professionnel ou d'une formation qualifiante pour le métier.`,
        },
        {
          type: "paragraph",
          text: "Un stage n'est pas automatiquement un contrat de travail. Les dispositifs de l'IEFP et certaines indemnités de formation suivent leur régime propre. Dès qu'il y a contrat de travail, le plancher de l'article 275, ou la RMMG entière, s'apprécie selon la situation réelle, pas selon le titre du document.",
        },
        {
          type: "paragraph",
          text: "Pour une capacité de travail réduite, l'article 275 prévoit une réduction égale à l'écart entre la capacité pleine et le coefficient de capacité effective pour l'activité, si cet écart dépasse 10 %, dans la limite de 50 %. La certification est faite, sur demande du salarié, du candidat à l'emploi ou de l'employeur, par le service public de l'emploi ou les services de santé. Ce n'est pas une liberté générale de l'employeur.",
        },
      ],
    },
    {
      id: "salaire-net",
      title: "Combien reste-t-il en net ?",
      blocks: [
        {
          type: "paragraph",
          text: "Il n'existe pas de salaire minimum net unique au Portugal. Le brut est diminué des cotisations salariales (quotização), puis, le cas échéant, d'une retenue d'IRS. Le résultat dépend du régime, des autres éléments du bulletin, du territoire de l'emploi et de la résidence fiscale. Le convertisseur français de ce site ne s'applique pas à une paie portugaise.",
        },
        {
          type: "paragraph",
          text: `Pour un salarié ordinaire du régime général, gov.pt retient ${L.ssWorker} à la charge du salarié et ${L.ssEmployer} à la charge de l'employeur. Ces taux ne sont pas universels : d'autres régimes existent. Sur une mensualité continentale de ${L.continentalMonthly}, ${L.ssWorker} représentent ${L.ssWorkerAmount}, soit ${L.netBeforeIrs} après ces cotisations, avant toute autre retenue.`,
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Exemple : emploi sur le continent, salarié ordinaire au taux de ${L.ssWorker}, mensualité de ${L.continentalMonthly} sans autre élément. Les cotisations salariales s'élèvent à ${L.ssWorkerAmount}, soit ${L.netBeforeIrs} après ces cotisations, avant IRS. Les tables continentales 2026 (Despacho n.º 233-A/2026) prévoient une retenue nulle jusqu'à ${L.continentalMonthly} de rémunération mensuelle brute, pour un résident fiscal du continent. Ce n'est pas un net universel, ni le résultat si des indemnités, un autre régime ou d'autres revenus s'ajoutent.`,
          ],
        },
        {
          type: "paragraph",
          text: `L'absence de retenue à la source n'est pas l'impôt final nul, ni l'absence de déclaration, ni l'absence de cotisations. La Lei n.º 73-A/2025 et le Despacho n.º 233-A/2026 actualisent le minimum d'existence à ${L.irsMinimo}, égal au total annuel de référence, et protègent la hausse de la RMMG. Le versement par douzièmes ne doit pas être traité comme une simple hausse de salaire mensuel sans regarder les règles fiscales propres aux indemnités.`,
        },
        {
          type: "paragraph",
          text: "Le territoire du salaire minimum est celui de l'emploi. Les tables de retenue dépendent de la résidence fiscale. Les tables visées ci-dessus concernent les résidents fiscaux du continent ; les Açores et Madère ont des tables distinctes. Le Portal das Finanças publie l'information fiscale officielle. Ce n'est pas un simulateur de fiche de paie personnalisée.",
        },
        {
          type: "list",
          items: [
            {
              text: "Contributions à la sécurité sociale.",
              href: S.ssContrib.href,
              label: S.ssContrib.org,
            },
            {
              text: "Tables de retenue IRS 2026.",
              href: S.oeIrs2026.href,
              label: S.oeIrs2026.org,
            },
            {
              text: "Portal das Finanças.",
              href: S.atPortal.href,
              label: S.atPortal.org,
            },
          ],
        },
      ],
    },
    {
      id: "francais-portugal",
      title: "Français travaillant au Portugal",
      blocks: [
        {
          type: "paragraph",
          text: "Un salarié français occupe, au Portugal, le même plancher que les autres salariés de l'emploi : celui du territoire applicable et, le cas échéant, de la convention. Un contrat local n'est pas un détachement. La résidence fiscale et l'affiliation à la sécurité sociale se déterminent selon le lieu de travail, la résidence et les règlements européens, pas selon le passeport. La France et le Portugal n'ayant pas de frontière terrestre commune, il n'existe pas de régime frontalier franco-portugais.",
        },
        {
          type: "list",
          items: [
            {
              text: "Guide administratif pour travailler au Portugal.",
              href: S.govWork.href,
              label: S.govWork.org,
            },
          ],
        },
      ],
    },
    {
      id: "evolution",
      title: "Évolution et prochaines hausses",
      blocks: [
        {
          type: "table",
          caption: "RMMG continentale brute, temps plein, mensualité de référence.",
          headers: ["Année", "Mensuel brut", "Texte", "Variation"],
          stackOnMobile: true,
          rowHeader: true,
          rows: [
            ["2025", L.previousMonthly, "Decreto-Lei n.º 112/2024", "en vigueur jusqu'au 31 décembre 2025"],
            [
              "2026",
              L.continentalMonthly,
              PT_RMMG_DECREE,
              `+ ${L.increaseEuros} (${L.increasePercent})`,
            ],
          ],
        },
        {
          type: "paragraph",
          text: `L'Acordo tripartido 2025-2028, signé le 1er octobre 2024, trace une trajectoire de + 50 € par an : ${L.previousMonthly} en 2025, ${L.continentalMonthly} en 2026, ${L.announced2027} en 2027, ${L.announced2028} en 2028. La présentation des priorités 2027 du Gouvernement reprend ${L.announced2027}. Vérifié le ${PT_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}, ce montant reste une annonce et une proposition budgétaire, pas le taux déjà applicable. L'application d'un futur décret dépendrait de la date d'effet qu'il fixerait.`,
        },
        {
          type: "paragraph",
          text: "Madère et les Açores suivent leurs propres textes. On n'applique pas automatiquement une projection continentale aux deux régions autonomes. Une proposition, un accord ou un calendrier ne remplacent pas le texte réglementaire applicable.",
        },
      ],
    },
    {
      id: "comparaison-france",
      title: "Comparaison avec la France",
      blocks: [
        {
          type: "paragraph",
          text: `Le SMIC français en vigueur depuis le ${PT_COMPARE_FR_FROM_LABEL} est de ${L.frHourly} brut de l'heure, soit ${L.frMonthly35} brut par mois à 35 heures et ${L.frAnnual} brut par an (Service-Public, fiche F2300). Comparer ${L.continentalMonthly} à ce mensuel français, comme si les calendriers étaient identiques, n'a pas de sens : d'un côté 12 mensualités plus deux indemnités, de l'autre un mensuel sur 12 mois à 35 heures.`,
        },
        {
          type: "paragraph",
          text: `Sur l'année, le total continental de référence (${L.continentalAnnual}) est inférieur d'environ ${L.annualPctVsFr} au SMIC annuel français de ${L.frAnnual}. Ce dernier est un repère annualisé au taux en vigueur depuis le ${PT_COMPARE_FR_FROM_LABEL}, pas nécessairement la somme perçue sur toute l'année civile 2026. Les durées de référence diffèrent (40 heures au Portugal, 35 heures en France pour ce mensuel). Le brut n'est pas le net. Ce pourcentage ne dit rien, à lui seul, du pouvoir d'achat.`,
        },
        {
          type: "paragraph",
          text: `Eurostat (${PT_EUROSTAT_DATASET}, ${PT_EUROSTAT_PERIOD}) publie ${L.eurostatMonthly} brut par mois au ${PT_EUROSTAT_PERIOD_LABEL}. Ce chiffre mensualise les versements supplémentaires : ${L.continentalMonthly} × 14 ÷ 12, arrondi à l'euro. Ce n'est pas le montant d'une seule paie à 14 versements, ni un calcul personnel présenté comme statistique Eurostat.`,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le détail de la méthode européenne,",
          label: "voir la fiche Portugal de SMIC en Europe",
          href: SMIC_EUROPE_PT_HREF,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le barème français,",
          label: "consulter le SMIC en France",
          href: SMIC_HREF,
        },
      ],
    },
    {
      id: "verifier",
      title: "Comment vérifier son salaire ?",
      blocks: [
        {
          type: "checklist",
          title: "À contrôler sur le bulletin et le contrat",
          items: [
            "Territoire de l'emploi : continent, Açores ou Madère.",
            "Salaire de base, indemnités, avantages et nombre de versements.",
            "Temps de travail comparé au temps plein de référence.",
            "Convention collective éventuellement applicable, à la bonne date.",
            "Cotisations salariales et retenue IRS, distinctes l'une de l'autre.",
          ],
        },
        {
          type: "paragraph",
          text: "Demandez le détail à l'employeur. Sur le continent, l'Autoridade para as Condições do Trabalho (ACT) est le service d'inspection du travail. Aux Açores, l'inspection régionale du travail (IRT) est compétente. À Madère, adressez-vous à la Direction régionale du travail. N'envoyez pas toutes les situations vers le seul service continental.",
        },
        {
          type: "list",
          items: [
            {
              text: "ACT, inspection du travail (continent).",
              href: S.act.href,
              label: S.act.org,
            },
            {
              text: "Inspection régionale du travail des Açores.",
              href: S.irtAzores.href,
              label: S.irtAzores.org,
            },
            {
              text: "Direction régionale du travail de Madère.",
              href: S.madeiraGov.href,
              label: S.madeiraGov.org,
            },
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: "Quel est le salaire minimum actuel au Portugal ?",
      answer: `Depuis le ${PT_RMMG_EFFECTS_FROM_LABEL}, la RMMG continentale est de ${L.continentalMonthly} brut par mois de référence, pour un temps plein. Aux Açores, le montant est de ${L.azoresMonthly}. À Madère, il est de ${L.madeiraMonthly}, avec effets à la même date malgré une publication en février.`,
    },
    {
      question: `Les ${L.continentalMonthly} sont-ils bruts ou nets ?`,
      answer: `${L.continentalMonthly} est un montant brut, sur le continent. Il reste des cotisations salariales, en général ${L.ssWorker} pour un salarié ordinaire du régime général, puis éventuellement une retenue d'IRS. Ce n'est pas un net, ni le montant des Açores ou de Madère.`,
    },
    {
      question: "Pourquoi parle-t-on de 14 versements ?",
      answer:
        "Parce que s'ajoutent aux 12 mensualités une indemnité de Noël et une indemnité supplémentaire de vacances. On ne travaille pas 14 mois. L'indemnité de vacances ne remplace pas le salaire versé pendant les congés.",
    },
    {
      question: "Quel est l'équivalent sur 12 mois ?",
      answer: `Pour une année complète au plancher continental, ${L.continentalAnnual} ÷ 12 donne ${L.continentalTwelve} après arrondi. C'est une mensualisation pédagogique. Ce n'est pas un second minimum mensuel légal, ni le salaire de base obligatoire chaque mois.`,
    },
    {
      question: "Quel minimum à Madère et aux Açores ?",
      answer: `Açores : ${L.azoresMonthly} brut par mois (majoration de 5 % prévue par le DLR n.º 8/2002/A). Madère : ${L.madeiraMonthly} brut par mois (DLR n.º 1/2026/M). Dans les deux cas, les effets courent au ${PT_RMMG_EFFECTS_FROM_LABEL}.`,
    },
    {
      question: "Quel montant pour un mi-temps ?",
      answer: `Exemple, continent, ${PT_PART_TIME_EXAMPLE_HOURS} heures si le temps plein comparable est de ${PT_PART_TIME_EXAMPLE_FULL_TIME_HOURS} heures, année complète, référence minimale : ${L.partTimeMonthly} brut par mois de référence, ${L.partTimeAnnual} sur l'année. Ce n'est pas le salaire de tout salarié à ${PT_PART_TIME_EXAMPLE_HOURS} heures.`,
    },
    {
      question: "Comment calculer la valeur horaire ?",
      answer: `L'article 271 retient (Rm × 12) ÷ (52 × n). Pour ${L.continentalMonthly} et ${PT_HOURLY_EXAMPLE_WEEKLY_HOURS} heures par semaine, cela donne ${L.hourlyExample} brut de l'heure. La formule utilise 12, pas 14.`,
    },
    {
      question: "L'indemnité de repas est-elle obligatoire ?",
      answer:
        "Pas pour tous les salariés du privé. Elle l'est si le contrat, la convention, un règlement interne ou un usage de l'entreprise l'impose. Le montant de la fonction publique sert de référence fiscale, pas d'obligation universelle.",
    },
    {
      question: "Quel net dans un cas simple ?",
      answer: `Emploi sur le continent, salarié ordinaire au taux de ${L.ssWorker}, mensualité de ${L.continentalMonthly} sans autre élément : cotisations salariales de ${L.ssWorkerAmount}, soit ${L.netBeforeIrs} après ces cotisations, avant IRS. Les tables continentales 2026 prévoient une retenue nulle jusqu'à ${L.continentalMonthly} de rémunération mensuelle brute, pour un résident fiscal du continent. Ce n'est pas un net universel. La résidence fiscale, qui détermine les tables, n'est pas le territoire du salaire.`,
    },
    {
      question: "Un jeune ou un stagiaire a-t-il un minimum réduit ?",
      answer: `Pas du seul fait de l'âge. L'article 275 prévoit 20 % de réduction pour une formation certifiée, soit ${L.trainingFloor} sur le continent, pendant au plus un an, six mois dans certains cas. Un stage n'est pas automatiquement un contrat de travail.`,
    },
    {
      question: "Que prévoit-on pour 2027 ?",
      answer: `L'accord 2025-2028 et la présentation de l'OE 2027 mentionnent ${L.announced2027} sur le continent. Vérifié le ${PT_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}, ce n'est pas le taux déjà applicable. Le plancher en vigueur reste celui de 2026. Un futur décret ne s'appliquerait qu'à compter de la date d'effet qu'il fixerait.`,
    },
    {
      question: "Que faire si mon salaire paraît trop faible ?",
      answer:
        "Vérifiez le territoire, le temps de travail, les versements et la convention. Demandez le détail à l'employeur. L'ACT est compétente sur le continent, l'IRT aux Açores, la Direction régionale du travail à Madère.",
    },
  ],
  conclusion: {
    title: "À retenir",
    keyPoints: [
      `Depuis le ${PT_RMMG_EFFECTS_FROM_LABEL} : ${L.continentalMonthly} brut par mois de référence sur le continent, ${L.azoresMonthly} aux Açores, ${L.madeiraMonthly} à Madère.`,
      `Le total continental de ${L.continentalAnnual} brut suppose 12 mensualités et deux indemnités, pour une année complète. On ne travaille pas 14 mois.`,
      `${L.continentalTwelve} est une moyenne pédagogique sur 12 mois, pas un second minimum légal.`,
      "La RMMG est brute. La convention peut être plus favorable. L'annonce 2027 n'est pas le taux déjà applicable.",
    ],
    closingText:
      "Pour comparer le Portugal aux autres pays européens ou approfondir le SMIC français, utilisez les guides liés ci-dessous.",
    closingCta: {
      label: "Comparer les salaires minimums en Europe",
      href: SMIC_EUROPE_HREF,
    },
    furtherReading: {
      title: "Pour aller plus loin",
      items: [
        {
          title: "SMIC en Europe",
          description: "Tableau européen, méthode Eurostat et fiches pays.",
          href: SMIC_EUROPE_HREF,
        },
        {
          title: "SMIC en France",
          description: "Montants horaires et mensuels officiels du SMIC.",
          href: SMIC_HREF,
        },
        {
          title: "Salaire minimum en Espagne",
          description: "SMI brut, 12 ou 14 versements et règles.",
          href: ES_HREF,
        },
        {
          title: "Salaire minimum au Luxembourg",
          description: "Salaire social minimum, qualification et indexation.",
          href: LU_HREF,
        },
      ],
    },
  },
  bibliography: {
    id: "methodologie-sources",
    title: "Sources officielles",
    blocks: [
      {
        type: "paragraph",
        text: `Sources consultées le ${PT_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}. Les montants continentaux 2026 reprennent le ${PT_RMMG_DECREE} (page DGERT et PDF de consultation). Madère reprend le DLR n.º 1/2026/M. Les Açores reprennent le DLR n.º 8/2002/A, dans sa rédaction actuelle, et la page régionale. Les règles de rémunération, d'indemnités, de temps partiel, de valeur horaire et de RMMG reprennent le Código do Trabalho. L'indemnité de repas de la fonction publique reprend la Portaria n.º 51-B/2026/1. Les cotisations reprennent gov.pt. L'IRS reprend le Despacho n.º 233-A/2026 et la présentation officielle des tables 2026. Le SMIC français reprend Service-Public F2300. Eurostat (${PT_EUROSTAT_DATASET}, ${PT_EUROSTAT_PERIOD}) publie ${L.eurostatMonthly} au ${PT_EUROSTAT_PERIOD_LABEL}, mensualisation distincte de la mensualité ordinaire.`,
      },
      {
        type: "list",
        items: [
          {
            text: `${S.dl139.label}.`,
            href: S.dl139.href,
            label: S.dl139.org,
          },
          {
            text: `${S.dgert2026.label}.`,
            href: S.dgert2026.href,
            label: S.dgert2026.org,
          },
          {
            text: `${S.dgertPdf.label}.`,
            href: S.dgertPdf.href,
            label: S.dgertPdf.org,
          },
          {
            text: `${S.dlrMadeira.label}.`,
            href: S.dlrMadeira.href,
            label: S.dlrMadeira.org,
          },
          {
            text: `${S.dlrAzores.label}.`,
            href: S.dlrAzores.href,
            label: S.dlrAzores.org,
          },
          {
            text: `${S.azoresPage.label}.`,
            href: S.azoresPage.href,
            label: S.azoresPage.org,
          },
          {
            text: `${S.codigoTrabalho.label}.`,
            href: S.codigoTrabalho.href,
            label: S.codigoTrabalho.org,
          },
          {
            text: `${S.dgertIrct.label}.`,
            href: S.dgertIrct.href,
            label: S.dgertIrct.org,
          },
          {
            text: `${S.ssContrib.label}.`,
            href: S.ssContrib.href,
            label: S.ssContrib.org,
          },
          {
            text: `${S.portariaRefeicao.label}.`,
            href: S.portariaRefeicao.href,
            label: S.portariaRefeicao.org,
          },
          {
            text: `${S.oeIrs2026.label}.`,
            href: S.oeIrs2026.href,
            label: S.oeIrs2026.org,
          },
          {
            text: `${S.despachoIrs.label}.`,
            href: S.despachoIrs.href,
            label: S.despachoIrs.org,
          },
          {
            text: `${S.act.label}.`,
            href: S.act.href,
            label: S.act.org,
          },
          {
            text: `${S.irtAzores.label}.`,
            href: S.irtAzores.href,
            label: S.irtAzores.org,
          },
          {
            text: `${S.acordo2025.label}.`,
            href: S.acordo2025.href,
            label: S.acordo2025.org,
          },
          {
            text: `${S.oe2027.label}.`,
            href: S.oe2027.href,
            label: S.oe2027.org,
          },
          {
            text: `${S.smicFr.label}.`,
            href: S.smicFr.href,
            label: S.smicFr.org,
          },
          {
            text: `${S.eurostatEarnMw.label}.`,
            href: S.eurostatEarnMw.href,
            label: S.eurostatEarnMw.org,
          },
        ],
      },
    ],
  },
  bibliographyPlacement: "after-faq",
  sidebar: {
    calculator: {
      title: "SMIC en France",
      description: "Montants officiels du SMIC français pour comparer les bases annuelles.",
      href: SMIC_HREF,
    },
    relatedGuides: [
      { title: "SMIC en Europe", href: SMIC_EUROPE_HREF },
      { title: "Salaire minimum en Espagne", href: ES_HREF },
      { title: "Salaire minimum au Luxembourg", href: LU_HREF },
    ],
    relatedSimulator: {
      title: "Fiche Portugal (Europe)",
      description: "Fiche Portugal et contexte européen.",
      href: SMIC_EUROPE_PT_HREF,
    },
  },
};
