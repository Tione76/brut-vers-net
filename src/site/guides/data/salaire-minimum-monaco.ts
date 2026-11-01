import type { Guide } from "../types";
import {
  MC_CAR_EMPLOYEE_RATE_LABEL,
  MC_COMPARE_FR_FROM_LABEL,
  MC_CONTRIBUTIONS_FROM_LABEL,
  MC_FULL_TIME_MONTHLY_HOURS,
  MC_FULL_TIME_WEEKLY,
  MC_MIN_WAGE_BREADCRUMB,
  MC_MIN_WAGE_H1,
  MC_MIN_WAGE_LABELS as L,
  MC_MIN_WAGE_META_DESCRIPTION,
  MC_MIN_WAGE_PATH,
  MC_MIN_WAGE_PUBLISHED_AT,
  MC_MIN_WAGE_SEO_TITLE,
  MC_MIN_WAGE_SLUG,
  MC_MIN_WAGE_SOURCES as S,
  MC_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  MC_MIN_WAGE_SUBTITLE,
  MC_MIN_WAGE_UPDATED_AT,
  MC_PART_TIME_20_HOURS,
  MC_PART_TIME_35_HOURS,
  MC_SMIC_CIRCULAR_DATE_LABEL,
  MC_SMIC_CURRENT_FROM_LABEL,
  MC_SMIC_JOURNAL_PUBLISHED_LABEL,
  MC_SMIC_PREVIOUS_FROM_LABEL,
  MC_UNEMPLOYMENT_EMPLOYEE_RATE_LABEL,
  MC_UNEMPLOYMENT_FROM_LABEL,
} from "@/site/salaire-minimum-monaco";

const SMIC_EUROPE_HREF = "/smic-europe";
const SMIC_EUROPE_MC_HREF = "/smic-europe#salaire-minimum-monaco";
const SMIC_HREF = "/smic";
const IT_HREF = "/salaire-minimum-italie";

const ADULT_SCOPE =
  "Salarié adulte relevant du barème général, temps plein de référence, secteur privé. Ces montants ne valent pas tels quels pour les apprentis, les mineurs, la fonction publique ou tous les régimes particuliers.";

/**
 * Guide pays : salaire minimum monégasque.
 * URL canonique : /salaire-minimum-monaco
 * Complète /smic-europe sans le remplacer.
 */
export const salaireMinimumMonacoGuide: Guide = {
  slug: MC_MIN_WAGE_SLUG,
  publicPath: MC_MIN_WAGE_PATH,
  breadcrumbLabel: MC_MIN_WAGE_BREADCRUMB,
  title: MC_MIN_WAGE_H1,
  seoTitle: MC_MIN_WAGE_SEO_TITLE,
  description: MC_MIN_WAGE_META_DESCRIPTION,
  subtitle: MC_MIN_WAGE_SUBTITLE,
  publishedAt: MC_MIN_WAGE_PUBLISHED_AT,
  updatedAt: MC_MIN_WAGE_UPDATED_AT,
  includeFaqSchema: true,
  faqSectionId: "questions-frequentes",
  faqTitle: "Questions fréquentes sur le salaire minimum à Monaco",
  faqIntro:
    "Réponses courtes sur le SMIC monégasque, les 5 %, les 39 heures, le net et les frontaliers.",
  introduction: [
    `Depuis le ${MC_SMIC_CURRENT_FROM_LABEL}, le SMIC à Monaco s'élève à ${L.hourly} brut de l'heure. Pour ${L.weeklyHours} heures par semaine, soit ${L.monthlyHours} heures par mois, la base publiée est de ${L.monthly} brut. L'indemnité exceptionnelle de 5 % représente ${L.indemnity} sur cette base, soit ${L.totalBeforeDeductions} au total avant les retenues applicables. Ce total n'est pas un salaire net. Un minimum professionnel peut aussi dépasser le SMIC.`,
  ],
  sections: [
    {
      id: "montant-actuel",
      title: "Quel est le salaire minimum à Monaco ?",
      blocks: [
        {
          type: "paragraph",
          text: `Le SMIC, salaire minimum interprofessionnel de croissance, est le plancher légal de rémunération horaire. À Monaco, il reprend le taux de la région économique voisine visée par la loi n° 739. L'indemnité de 5 % s'ajoute à ce plancher, sans se confondre avec le net.`,
        },
        {
          type: "paragraph",
          text: ADULT_SCOPE,
        },
        {
          type: "table",
          caption: `SMIC général depuis le ${MC_SMIC_CURRENT_FROM_LABEL} (circulaire n° 2026-7).`,
          headers: ["Élément", "Montant", "Périmètre"],
          stackOnMobile: true,
          rowHeader: true,
          rows: [
            ["Taux horaire de base", L.hourly, "Brut / heure"],
            [
              "Mensuel de référence",
              L.monthly,
              `${L.weeklyHours} h / semaine, ${L.monthlyHours} h / mois, hors 5 %`,
            ],
            ["Indemnité de 5 % (exemple)", L.indemnity, `${L.monthly} × 5 %, arrondi au centime`],
            [
              "Base + indemnité de 5 %",
              L.totalBeforeDeductions,
              "Avant cotisations applicables et avant impôt",
            ],
          ],
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            `${L.totalBeforeDeductions} n'est pas un salaire net, ni le montant garanti sur le compte bancaire.`,
          ],
        },
        {
          type: "paragraph",
          text: `La circulaire publie aussi un « minimum garanti » de ${L.minGaranti}. Ce n'est pas un second salaire minimum : il sert à certains calculs, notamment d'avantages en nature, pas à remplacer le SMIC.`,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Source :",
          label: S.circular2026_7.label,
          href: S.circular2026_7.href,
        },
      ],
    },
    {
      id: "indemnite-5-pourcent",
      title: "Comment fonctionne l'indemnité de 5 % ?",
      blocks: [
        {
          type: "paragraph",
          text: "L'arrêté ministériel n° 63-131 du 21 mai 1963 prévoit que les rémunérations minimales sont majorées d'une indemnité exceptionnelle de 5 % de leur montant. Les circulaires SMIC le rappellent à chaque revalorisation.",
        },
        {
          type: "paragraph",
          text: `Exemple sur le mensuel de référence : ${L.monthly} × 5 % = ${L.indemnity}. La somme des deux montants affichés est ${L.totalBeforeDeductions} : base plus indemnité, avant cotisations applicables et avant impôt éventuel.`,
        },
        {
          type: "paragraph",
          text: "La fiche des Caisses Sociales précise le régime. L'indemnité est obligatoire et non soumise à cotisations sociales lorsque les rémunérations de référence sont égales aux minima définis par la loi sur les salaires. Calculée sur des rémunérations supérieures, cette prime perd son caractère obligatoire. Si elle est malgré tout maintenue, elle devient un élément de rémunération à intégrer dans le salaire à déclarer.",
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Tous les salariés n'ont pas droit à 5 % de plus sur leur salaire réel. L'indemnité porte sur les rémunérations minimales. Un salaire convenu plus élevé, un minimum professionnel ou une présentation déjà intégrée sur le bulletin changent la lecture.",
          ],
        },
        {
          type: "paragraph",
          text: "Pour vérifier un bulletin, distinguez le minimum légal, le minimum professionnel, le salaire réellement convenu, et l'indemnité éventuellement déjà identifiée. Un litige individuel se lit sur le contrat, le bulletin et le régime réellement applicables.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Textes :",
          label: S.arretes63131.label,
          href: S.arretes63131.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Régime social :",
          label: S.csmFivePercent.label,
          href: S.csmFivePercent.href,
        },
      ],
    },
    {
      id: "39-heures",
      title: "Pourquoi le calcul se fait-il sur 39 heures ?",
      blocks: [
        {
          type: "paragraph",
          text: `L'ordonnance-loi n° 677 fixe la durée du travail du régime général concerné à ${L.weeklyHours} heures par semaine. La circulaire convertit cette durée en ${L.monthlyHours} heures par mois : ${L.weeklyHours} × 52 ÷ 12 = ${L.monthlyHours}.`,
        },
        {
          type: "paragraph",
          text: "Ce n'est pas la durée française de 35 heures. Les heures 36 à 39 d'un contrat soumis aux règles monégasques ne sont pas des heures supplémentaires françaises.",
        },
        {
          type: "paragraph",
          text: `${L.monthlyHours} heures ne sont pas la durée de chaque contrat. Un aménagement du temps de travail, une durée équivalente ou un horaire contractuel inférieur changent le calcul. Le montant se vérifie sur la durée et les règles réellement applicables.`,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Texte :",
          label: S.hours677.label,
          href: S.hours677.href,
        },
      ],
    },
    {
      id: "salaire-minimum-net",
      title: "Quel salaire minimum net à Monaco ?",
      blocks: [
        {
          type: "paragraph",
          text: `Le SMIC de base (${L.hourly} ou ${L.monthly}) n'est pas le net. L'indemnité de 5 % n'est pas le net non plus. Le net de paie dépend des retenues salariales. L'impôt personnel est encore distinct : il dépend de la situation fiscale, notamment de la résidence.`,
        },
        {
          type: "paragraph",
          text: "Il n'existe pas de coefficient universel applicable à toutes les situations. Les coefficients français 0,78, 0,75 ou 0,81 ne s'appliquent pas. Le calculateur brut-net français de ce site ne calcule pas une paie monégasque.",
        },
        {
          type: "paragraph",
          text: `Les taux des Caisses Sociales peuvent changer sans que le SMIC bouge. Les barèmes consultés pour un employeur à titre professionnel distinguent, au ${MC_CONTRIBUTIONS_FROM_LABEL}, des parts employeur (CCSS notamment) et des parts salariales. Côté salarié, la CAR affiche ${MC_CAR_EMPLOYEE_RATE_LABEL}. L'assurance chômage affiche ${MC_UNEMPLOYMENT_EMPLOYEE_RATE_LABEL} depuis le ${MC_UNEMPLOYMENT_FROM_LABEL}. La CMRC, retraite complémentaire, est répartie 60 % employeur et 40 % salarié selon les tranches publiées.`,
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "Lorsque l'indemnité de 5 % est due sur les minima légaux, elle n'entre pas dans l'assiette des cotisations sociales. On ne calcule donc pas les retenues sur la somme base + 5 % comme si tout était cotisable.",
          ],
        },
        {
          type: "paragraph",
          text: "Un SMIC net unique n'est pas publié ici : un montant unique exigerait un profil, des assiettes, des plafonds et des arrondis complets, au-delà d'un taux unique. Pour simuler, il faut le bulletin, le régime (général, gens de maison ou autre), la date des taux et le traitement réel des 5 %. Le résultat obtenu resterait un net de paie avant impôt, pas un net officiel universel.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Barèmes sociaux :",
          label: S.csmCotisations.label,
          href: S.csmCotisations.href,
        },
      ],
    },
    {
      id: "minimum-professionnel",
      title: "SMIC ou minimum professionnel : lequel vérifier ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le SMIC est une référence de base. L'article 11 de la loi n° 739 et l'arrêté n° 63-131 prévoient que les minima de salaires, primes et indemnités ne peuvent pas être inférieurs à ceux pratiqués, pour des conditions de travail identiques, dans les mêmes professions de la région économique voisine, Nice ou, à défaut, les Alpes-Maritimes.",
        },
        {
          type: "paragraph",
          text: "Un minimum de qualification, de profession ou de convention peut donc dépasser le SMIC. Les montants à calculer selon la durée du travail s'obtiennent avec les règles monégasques de durée, pas en copiant un mensuel français à 35 heures dans une grille à 39 heures.",
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "Toutes les conventions collectives françaises ne s'appliquent pas automatiquement à Monaco. Comparez des conditions de travail identiques, avec les règles de durée monégasques.",
          ],
        },
        {
          type: "paragraph",
          text: "Sur une offre, vérifiez la qualification, le coefficient, les fonctions, la grille, la date d'effet, la durée et le régime des 5 %. Un barème générique hôtelier, commerce, nettoyage ou bâtiment ne remplace pas la grille du poste.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Texte :",
          label: S.law739.label,
          href: S.law739.href,
        },
      ],
    },
    {
      id: "temps-partiel-heures-supplementaires",
      title: "Temps partiel et heures supplémentaires",
      blocks: [
        {
          type: "paragraph",
          text: "Le temps partiel et les heures supplémentaires ne se confondent pas. L'indemnité de 5 % n'est pas une majoration d'heures supplémentaires. La durée mensuelle de 169 heures sert à payer une rémunération régulière de référence, pas à qualifier à elle seule des heures supplémentaires.",
        },
        {
          type: "paragraph",
          text: `Temps partiel : le minimum se calcule sur la durée contractuelle et les règles pertinentes. Exemple avec un salaire de ${L.monthly} pour ${L.weeklyHours} h : à ${MC_PART_TIME_20_HOURS} h, la base proratisée est ${L.partTime20Monthly} (${L.monthly} × ${MC_PART_TIME_20_HOURS} / ${MC_FULL_TIME_WEEKLY}). L'indemnité de 5 % sur cette base est ${L.partTime20Indemnity}, soit ${L.partTime20Total} avant cotisations applicables et avant impôt. Ce n'est pas un barème officiel publié.`,
        },
        {
          type: "paragraph",
          text: `Autre exemple pédagogique : ${MC_PART_TIME_35_HOURS} h donnent une base de ${L.partTime35Monthly}. Ce n'est pas le SMIC français à 35 heures, même si le taux horaire de base est aujourd'hui identique.`,
        },
        {
          type: "paragraph",
          text: `Heures supplémentaires : au-delà de ${L.weeklyHours} heures par semaine, ou de la durée considérée comme équivalente, l'ordonnance-loi n° 677 prévoit une majoration minimale de 25 % pour les huit premières heures, puis de 50 % pour les suivantes, sous réserve des exceptions du texte (travaux urgents, récupération notamment). La circulaire n° 2026-8 publie, pour le SMIC adulte, ${L.overtime25} (+ 25 %) et ${L.overtime50} (+ 50 %) de l'heure : ce sont des taux majorés de référence. Ils n'incluent pas l'indemnité de 5 %, qui reste distincte.`,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Taux majorés :",
          label: S.circular2026_8.label,
          href: S.circular2026_8.href,
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Les heures 36 à 39 d'un horaire de ${L.weeklyHours} heures ne sont pas des heures supplémentaires. Le seuil se lit dans le texte monégasque, pas dans le Code du travail français.`,
          ],
        },
      ],
    },
    {
      id: "jeunes-apprentis",
      title: "Jeunes salariés et apprentis",
      blocks: [
        {
          type: "paragraph",
          text: "Un jeune salarié non apprenti, un apprenti et un stagiaire ne relèvent pas du même barème. Les montants ci-dessous sont ceux publiés, pas des recalculs à partir d'un taux horaire déjà arrondi.",
        },
      ],
      subsections: [
        {
          id: "jeunes-salaries",
          title: "Jeunes salariés non apprentis",
          blocks: [
            {
              type: "paragraph",
              text: `La circulaire n° 2026-8 publie des barèmes par âge, applicables au ${MC_SMIC_CURRENT_FROM_LABEL}. L'indemnité de 5 % s'applique aussi à ces rémunérations minimales, selon les mêmes textes.`,
            },
            {
              type: "table",
              caption: `SMIC publié par âge depuis le ${MC_SMIC_CURRENT_FROM_LABEL} (circulaire n° 2026-8), hors indemnité de 5 %.`,
              headers: ["Âge", "Horaire brut", "Hebdomadaire brut", "Mensuel brut"],
              stackOnMobile: true,
              rowHeader: true,
              rows: [
                ["18 ans et plus", L.hourly, L.adultWeekly, L.monthly],
                ["De 17 à 18 ans", L.youth17Hourly, L.youth17Weekly, L.youth17Monthly],
                ["De 16 à 17 ans", L.youth16Hourly, L.youth16Weekly, L.youth16Monthly],
              ],
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Source :",
              label: S.circular2026_8.label,
              href: S.circular2026_8.href,
            },
          ],
        },
        {
          id: "apprentis",
          title: "Apprentis",
          blocks: [
            {
              type: "paragraph",
              text: `La circulaire n° 2026-9 publie la rémunération minimale des apprentis liés par contrat d'apprentissage, au ${MC_SMIC_CURRENT_FROM_LABEL}, base ${MC_FULL_TIME_MONTHLY_HOURS} heures. Le pourcentage s'applique au SMIC ou au salaire minimum conventionnel de l'emploi s'il est plus favorable, arrondi au centime supérieur.`,
            },
            {
              type: "table",
              caption: `Première année d'apprentissage depuis le ${MC_SMIC_CURRENT_FROM_LABEL} (extrait de la circulaire n° 2026-9).`,
              headers: ["Âge", "Mensuel brut publié", "Pourcentage"],
              stackOnMobile: true,
              rowHeader: true,
              rows: [
                ["16 / 17 ans", L.apprenticeY1_16, "27 %"],
                ["18 / 20 ans", L.apprenticeY1_18, "43 %"],
                ["21 ans et plus", L.apprenticeY1_21, "53 %"],
              ],
            },
            {
              type: "paragraph",
              text: "Les 2e et 3e années, ainsi que les formations complémentaires après contrat, figurent dans la même circulaire. Le texte rappelle aussi l'indemnité de 5 %. Un stage n'est pas un contrat d'apprentissage.",
            },
            {
              type: "internal-link",
              variant: "guide",
              intro: "Barème complet :",
              label: S.circular2026_9.label,
              href: S.circular2026_9.href,
            },
          ],
        },
      ],
    },
    {
      id: "revalorisation",
      title: "Quand le SMIC à Monaco est-il revalorisé ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le SMIC monégasque suit la référence de la région économique voisine, puis est porté à la connaissance des partenaires sociaux par circulaire au Journal de Monaco.",
        },
        {
          type: "list",
          items: [
            `Texte : circulaire n° 2026-7 du ${MC_SMIC_CIRCULAR_DATE_LABEL}.`,
            `Publication : Journal de Monaco n° 8802 du ${MC_SMIC_JOURNAL_PUBLISHED_LABEL}.`,
            `Date d'effet : ${MC_SMIC_CURRENT_FROM_LABEL}.`,
            `Vérification de cet article : ${MC_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}.`,
          ],
        },
        {
          type: "paragraph",
          text: `Au ${MC_SMIC_PREVIOUS_FROM_LABEL}, le rappel de la circulaire apprentis indiquait ${L.previousHourly} brut de l'heure et ${L.previousMonthly} brut par mois. Le barème actuel a pris effet le ${MC_SMIC_CURRENT_FROM_LABEL}. Ce n'est pas le cumul de toute l'année civile 2026.`,
        },
        {
          type: "paragraph",
          text: "Aucune hausse 2027 n'est encore publiée ou officiellement identifiée. Tant qu'un texte d'effet n'existe pas, le barème en vigueur reste celui du 1er juin 2026.",
        },
      ],
    },
    {
      id: "france-monaco",
      title: "France et Monaco : pourquoi les mensuels diffèrent-ils ?",
      blocks: [
        {
          type: "paragraph",
          text: `Depuis le ${MC_COMPARE_FR_FROM_LABEL}, le taux horaire de base est le même des deux côtés : ${L.frHourly} brut. Un même taux horaire ne donne pas le même mensuel, ni le même net.`,
        },
        {
          type: "table",
          caption: "Repères pour comparer un SMIC français et un SMIC monégasque, sans en faire un classement de niveau de vie.",
          headers: ["Point", "France", "Monaco"],
          stackOnMobile: true,
          rowHeader: true,
          rows: [
            ["Taux horaire de référence", `${L.frHourly} brut / h`, `${L.hourly} brut / h`],
            [
              "Durée de référence du mensuel",
              `${L.frWeeklyHours} h par semaine, soit ${L.frMonthlyHours} h par mois`,
              `${L.weeklyHours} h par semaine, soit ${L.monthlyHours} h par mois`,
            ],
            [
              "Base mensuelle brute",
              `${L.frMonthly} brut / mois`,
              `${L.monthly} brut / mois`,
            ],
            ["Indemnité exceptionnelle", "Pas d'équivalent 5 %", `5 % sur les minima, soit ${L.indemnity} dans l'exemple`],
            ["Cotisations", "Régime français", "Caisses Sociales de Monaco"],
            [
              "Fiscalité",
              "Selon la résidence et les règles françaises",
              "Selon la résidence fiscale, distincte du lieu de travail",
            ],
          ],
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            `À taux horaire identique dans cette comparaison, la différence entre les bases mensuelles vient de la durée retenue : ${L.frWeeklyHours} heures en France contre ${L.weeklyHours} heures à Monaco. L'indemnité monégasque de 5 % s'ajoute séparément. Pour comparer les montants réellement perçus, il faut ensuite examiner les cotisations et la situation fiscale.`,
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le SMIC français, distinct du SMIC monégasque,",
          label: "consulter les montants officiels du SMIC",
          href: SMIC_HREF,
        },
      ],
    },
    {
      id: "frontaliers-france",
      title: "Habiter en France et travailler à Monaco",
      blocks: [
        {
          type: "paragraph",
          text: "Habiter à Nice, Menton ou ailleurs en France ne crée pas un SMIC différent pour le même poste à Monaco. Le minimum de rémunération se lit dans les règles du poste, pas dans le code postal du salarié.",
        },
        {
          type: "list",
          items: [
            "Minimum de rémunération du poste : SMIC, éventuellement minimum professionnel, durée et 5 %.",
            "Affiliation sociale : en principe les Caisses Sociales de Monaco pour un emploi sur place.",
            "Résidence fiscale et imposition : distinctes du lieu de travail.",
            "Autorisation de travailler : embauche et permis de travail via le Service de l'Emploi, selon la loi n° 629.",
          ],
        },
        {
          type: "paragraph",
          text: "Travailler à Monaco ne signifie pas ne pas payer d'impôt. Tous les Français ne sont pas exonérés. Tous les résidents de Monaco n'ont pas le même régime fiscal. L'absence de retenue française par l'employeur n'est pas une absence d'impôt à payer.",
        },
        {
          type: "paragraph",
          text: "Un résident fiscal français qui travaille à Monaco reste, en principe, imposable en France sur ses revenus. La doctrine fiscale française vise aussi les personnes qui résident en France et travaillent à Monaco. Aucun crédit d'impôt, abattement ou taux de prélèvement n'est déduit d'office de ces revenus.",
        },
        {
          type: "paragraph",
          text: "Les Français qui résident à Monaco relèvent de la convention fiscale de 1963 : certaines personnes restent imposables en France, d'autres en sont hors champ selon des exceptions précises. Ce n'est pas un guide fiscal exhaustif.",
        },
        {
          type: "paragraph",
          text: "Pour travailler à Monaco, l'employeur passe en principe par une autorisation d'embauchage et un permis de travail auprès du Service de l'Emploi. Un citoyen de l'Union européenne ne commence pas un emploi sans les formalités requises.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Fiscalité :",
          label: S.bofip.label,
          href: S.bofip.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Embauche :",
          label: S.directionTravail.label,
          href: S.directionTravail.href,
        },
      ],
    },
    {
      id: "verifier-bulletin",
      title: "Comment vérifier son bulletin ou une offre ?",
      blocks: [
        {
          type: "checklist",
          title: "Points à contrôler",
          items: [
            "Date et barème applicables.",
            "Durée hebdomadaire et mensuelle.",
            "Catégorie et qualification.",
            "Minimum professionnel éventuel.",
            "Salaire de base.",
            "Indemnité de 5 % : si un montant est annoncé « indemnité de 5 % comprise », vérifiez la base et le 5 % à part.",
            "Heures supplémentaires.",
            "Avantages et autres éléments pertinents.",
            "Retenues salariales.",
            "Différence entre net de paie et impôt personnel.",
          ],
        },
        {
          type: "paragraph",
          text: "Cinq pour cent de la base ne sont pas 5 % du net. Un avantage en nature ne s'ajoute pas et ne se déduit pas de la même façon selon qu'on parle de valorisation sociale, de rémunération minimale ou du régime concerné. Les valeurs nourriture ou logement d'un tableau officiel ne sont pas un barème de loyer ou de coût de la vie.",
        },
      ],
    },
    {
      id: "recours",
      title: "Que faire si le minimum semble ne pas être respecté ?",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Demander le détail au service paie",
              description:
                "Faites préciser le barème, la durée, le minimum professionnel éventuel et le régime des 5 %.",
            },
            {
              title: "Réunir contrat, bulletins et horaires",
              description:
                "Ces documents permettent de comparer le versé aux règles applicables à la période.",
            },
            {
              title: "Vérifier la grille et les 5 %",
              description:
                "Un montant annoncé « indemnité de 5 % comprise » peut encore mélanger base, indemnité et d'autres éléments.",
            },
            {
              title: "Contacter l'Inspection du Travail",
              description:
                "L'Inspection du Travail de Monaco informe, contrôle le paiement des salaires et peut recevoir un salarié. Un rendez-vous ou un message ne garantit ni inspection, ni rappel, ni délai.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Pour un litige monégasque, l'autorité normalement compétente n'est pas l'inspection du travail française.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Démarche :",
          label: S.inspection.label,
          href: S.inspection.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Rendez-vous :",
          label: S.inspectionRdv.label,
          href: S.inspectionRdv.href,
        },
      ],
    },
  ],
  faq: [
    {
      question: "Quel est le SMIC à Monaco ?",
      answer: `Depuis le ${MC_SMIC_CURRENT_FROM_LABEL}, le taux horaire de base est de ${L.hourly} brut. Pour ${L.weeklyHours} heures par semaine (${L.monthlyHours} h par mois), le mensuel de référence publié est de ${L.monthly} brut, hors indemnité de 5 %.`,
    },
    {
      question: "Combien représente le salaire minimum pour 39 heures ?",
      answer: `La circulaire publie ${L.monthly} brut pour ${L.weeklyHours} heures par semaine, soit ${L.monthlyHours} heures par mois, depuis le ${MC_SMIC_CURRENT_FROM_LABEL}. Ce montant est la base, pas le net, et pas encore l'indemnité de 5 %.`,
    },
    {
      question: "Les 5 % sont-ils compris dans le montant annoncé ?",
      answer: `Pas dans le taux horaire de ${L.hourly} ni dans le mensuel de ${L.monthly}. Sur ce mensuel, 5 % représentent ${L.indemnity}. La somme ${L.totalBeforeDeductions} est la base + l'indemnité, avant cotisations applicables et avant impôt.`,
    },
    {
      question: "Tous les salariés ont-ils droit à 5 % sur leur salaire réel ?",
      answer:
        "Non. L'indemnité est obligatoire sur les rémunérations minimales. Au-dessus des minima, elle n'est plus obligatoire. Si elle est maintenue, elle devient un élément de salaire à déclarer.",
    },
    {
      question: "Quel est le SMIC net à Monaco ?",
      answer:
        "Il n'existe pas de net unique. Le net de paie dépend des cotisations salariales, dont les taux peuvent changer sans que le SMIC change. L'impôt personnel est distinct.",
    },
    {
      question: "Pourquoi le mensuel est-il différent de celui de la France ?",
      answer: `Le taux horaire de base est le même (${L.frHourly}). La différence entre les bases mensuelles vient de la durée : ${L.frWeeklyHours} heures en France (${L.frMonthly}) contre ${L.weeklyHours} heures à Monaco (${L.monthly}). L'indemnité monégasque de 5 % s'ajoute séparément. Les cotisations et la fiscalité interviennent ensuite pour comparer les nets.`,
    },
    {
      question: "Les heures 36 à 39 sont-elles supplémentaires ?",
      answer: `Non, pas dans le régime général à ${L.weeklyHours} heures. Les majorations d'heures supplémentaires s'appliquent au-delà de cette durée, ou de la durée équivalente, selon l'ordonnance-loi n° 677.`,
    },
    {
      question: "Un résident français a-t-il le même minimum pour le même poste ?",
      answer:
        "Oui pour le minimum de rémunération du poste. Habiter en France ne crée pas un SMIC différent à Monaco. L'affiliation sociale et l'impôt personnel se lisent à part.",
    },
    {
      question: "Travailler à Monaco dispense-t-il de payer l'impôt en France ?",
      answer:
        "Non. Un résident fiscal français reste en principe imposable en France. L'absence de retenue par l'employeur monégasque n'efface pas l'impôt personnel.",
    },
    {
      question: "Quel minimum s'applique aux jeunes et aux apprentis ?",
      answer: `La circulaire n° 2026-8 publie des barèmes par âge (par exemple ${L.youth17Monthly} brut par mois de 17 à 18 ans, hors 5 %). Les apprentis relèvent de la circulaire n° 2026-9, selon l'âge et l'année de contrat.`,
    },
    {
      question: "Un minimum professionnel peut-il dépasser le SMIC ?",
      answer:
        "Oui. La loi n° 739 et l'arrêté n° 63-131 renvoient aux minima de la région économique voisine pour des conditions de travail identiques, avec les règles de durée monégasques.",
    },
    {
      question: "Où vérifier son salaire ou demander de l'aide ?",
      answer:
        "Demandez d'abord le détail au service paie, avec contrat et bulletins. L'Inspection du Travail de Monaco peut informer et contrôler. Ce n'est pas l'inspection française pour un litige monégasque.",
    },
  ],
  conclusion: {
    title: "À retenir",
    keyPoints: [
      `Vérifiez le barème en vigueur, la durée réelle et, le cas échéant, un minimum professionnel supérieur au SMIC.`,
      "Distinguez le SMIC de base, l'indemnité de 5 %, les cotisations et l'impôt personnel.",
      "Habiter en France ne change pas le minimum du poste à Monaco, ni n'efface l'impôt personnel.",
    ],
    closingText:
      "Pour comparer Monaco aux autres pays européens ou relire le SMIC français, utilisez les guides liés ci-dessous.",
    closingCta: {
      label: "Comparer les salaires minimums en Europe",
      href: SMIC_EUROPE_HREF,
    },
    furtherReading: {
      title: "Pour aller plus loin",
      items: [
        {
          title: "SMIC en Europe",
          description: "Fiche Monaco et tableau européen, sans chiffre Eurostat fictif.",
          href: SMIC_EUROPE_HREF,
        },
        {
          title: "SMIC en France",
          description: "Montants horaires et mensuels officiels du SMIC.",
          href: SMIC_HREF,
        },
        {
          title: "Salaire minimum en Italie",
          description: "Pays voisin sans SMIC national unique, avec des règles différentes.",
          href: IT_HREF,
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
        text: `Sources consultées le ${MC_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}. Les montants du SMIC reprennent les circulaires du Journal de Monaco. L'indemnité de 5 % sur le mensuel de référence est un calcul dérivé, arrondi au centime, distinct des montants publiés. En cas de divergence, le texte applicable prime. Le SMIC français reprend la donnée centralisée du site.`,
      },
      {
        type: "list",
        items: [
          { text: `${S.circular2026_7.label}.`, href: S.circular2026_7.href, label: S.circular2026_7.org },
          { text: `${S.circular2026_8.label}.`, href: S.circular2026_8.href, label: S.circular2026_8.org },
          { text: `${S.circular2026_9.label}.`, href: S.circular2026_9.href, label: S.circular2026_9.org },
          { text: `${S.law739.label}.`, href: S.law739.href, label: S.law739.org },
          { text: `${S.arretes63131.label}.`, href: S.arretes63131.href, label: S.arretes63131.org },
          { text: `${S.csmFivePercent.label}.`, href: S.csmFivePercent.href, label: S.csmFivePercent.org },
          { text: `${S.hours677.label}.`, href: S.hours677.href, label: S.hours677.org },
          { text: `${S.csmCotisations.label}.`, href: S.csmCotisations.href, label: S.csmCotisations.org },
          { text: `${S.inspection.label}.`, href: S.inspection.href, label: S.inspection.org },
          { text: `${S.directionTravail.label}.`, href: S.directionTravail.href, label: S.directionTravail.org },
          { text: `${S.bofip.label}.`, href: S.bofip.href, label: S.bofip.org },
          { text: `${S.smicFr.label}.`, href: S.smicFr.href, label: S.smicFr.org },
        ],
      },
      {
        type: "callout",
        variant: "vigilance",
        paragraphs: [
          "Cette page concerne principalement les salariés du secteur privé. Elle n'est pas une grille des traitements de la fonction publique monégasque et n'estime pas un salaire net personnalisé.",
        ],
      },
    ],
  },
  bibliographyPlacement: "after-faq",
  sidebar: {
    calculator: {
      title: "SMIC en France",
      description: "Montants officiels du SMIC français, pour une comparaison brute distincte.",
      href: SMIC_HREF,
    },
    relatedGuides: [
      { title: "SMIC en Europe", href: SMIC_EUROPE_HREF },
      { title: "Salaire minimum en Italie", href: IT_HREF },
      { title: "Fiche Monaco (Europe)", href: SMIC_EUROPE_MC_HREF },
    ],
    relatedSimulator: {
      title: "Fiche Monaco (Europe)",
      description: "SMIC monégasque dans le tableau européen, sans chiffre Eurostat fictif.",
      href: SMIC_EUROPE_MC_HREF,
    },
  },
};
