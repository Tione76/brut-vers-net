import type { Guide } from "../types";
import {
  BE_COMPARE_FR_FROM_LABEL,
  BE_EUROSTAT_DATASET,
  BE_EUROSTAT_PERIOD,
  BE_EUROSTAT_PERIOD_LABEL,
  BE_MIN_WAGE_BREADCRUMB,
  BE_MIN_WAGE_H1,
  BE_MIN_WAGE_LABELS as L,
  BE_MIN_WAGE_META_DESCRIPTION,
  BE_MIN_WAGE_PATH,
  BE_MIN_WAGE_PUBLISHED_AT,
  BE_MIN_WAGE_SEO_TITLE,
  BE_MIN_WAGE_SLUG,
  BE_MIN_WAGE_SOURCES as S,
  BE_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  BE_MIN_WAGE_SUBTITLE,
  BE_MIN_WAGE_UPDATED_AT,
  BE_RMMMG_APR_FROM_LABEL,
  BE_RMMMG_APR_NATURE,
  BE_RMMMG_CURRENT_FROM_LABEL,
  BE_RMMMG_FULL_TIME_WEEKLY,
  BE_RMMMG_JAN_FROM_LABEL,
  BE_RMMMG_JAN_NATURE,
  BE_RMMMG_JUL_NATURE,
  BE_RMMMG_PART_TIME_EXAMPLE_HOURS,
  BE_STUDENT_PCT_16,
  BE_STUDENT_PCT_17,
  BE_STUDENT_PCT_18,
  BE_STUDENT_PCT_19,
  BE_STUDENT_PCT_20,
  BE_STUDENT_PCT_21,
  BE_STUDENT_REDUCED_HOURS_FROM_LABEL,
} from "@/site/salaire-minimum-belgique";

const SMIC_EUROPE_HREF = "/smic-europe";
const SMIC_EUROPE_BE_HREF = "/smic-europe#salaire-minimum-belgique";
const SMIC_HREF = "/smic";
const DE_HREF = "/salaire-minimum-allemagne";
const LU_HREF = "/salaire-minimum-luxembourg";
const CLS_MAIL = "cls@emploi.belgique.be";

/**
 * Guide pays : salaire minimum belge (RMMMG et barèmes sectoriels).
 * URL canonique : /salaire-minimum-belgique
 * Complète /smic-europe sans le remplacer.
 */
export const salaireMinimumBelgiqueGuide: Guide = {
  slug: BE_MIN_WAGE_SLUG,
  publicPath: BE_MIN_WAGE_PATH,
  breadcrumbLabel: BE_MIN_WAGE_BREADCRUMB,
  title: BE_MIN_WAGE_H1,
  seoTitle: BE_MIN_WAGE_SEO_TITLE,
  description: BE_MIN_WAGE_META_DESCRIPTION,
  subtitle: BE_MIN_WAGE_SUBTITLE,
  publishedAt: BE_MIN_WAGE_PUBLISHED_AT,
  updatedAt: BE_MIN_WAGE_UPDATED_AT,
  includeFaqSchema: true,
  faqSectionId: "questions-frequentes",
  faqTitle: "Questions fréquentes sur le salaire minimum en Belgique",
  faqIntro:
    "Réponses courtes sur le RMMMG, les barèmes sectoriels, le net, les étudiants et les frontaliers.",
  introduction: [
    `Depuis le ${BE_RMMMG_CURRENT_FROM_LABEL}, le revenu minimum mensuel moyen garanti (RMMMG) s'élève à ${L.adultMonthly} brut par mois pour un salarié de 18 ans et plus, à temps plein, visé par la convention collective de travail (CCT) n° 43. Ce plancher interprofessionnel concerne surtout les salariés du secteur privé relevant de ce cadre. Il n'est pas un SMIC légal unique, et le barème de votre commission paritaire (CP) peut être plus élevé.`,
    "En France, on parle souvent de « SMIC belge ». L'expression est comprise, mais le dispositif officiel est différent : il n'existe pas de salaire minimum interprofessionnel de croissance à la française.",
  ],
  sections: [
    {
      id: "montant-actuel",
      title: "Quel est le salaire minimum en Belgique ?",
      blocks: [
        {
          type: "paragraph",
          text: `Le plancher interprofessionnel n'est pas un SMIC voté par la loi. C'est le revenu minimum mensuel moyen garanti, fixé par les CCT n° 43 et n° 50 du Conseil national du travail (CNT). Depuis le ${BE_RMMMG_CURRENT_FROM_LABEL}, le montant de référence pour un salarié de 18 ans et plus, à temps plein, est de ${L.adultMonthlyLong}. Ce montant est brut.`,
        },
        {
          type: "paragraph",
          text: "La CCT n° 43 vise surtout les travailleurs occupés dans les liens d'un contrat de travail ordinaire, à partir de 18 ans. Elle n'englobe pas automatiquement toute la fonction publique, les indépendants, ni tous les apprentis. Les 18-20 ans sous contrat d'occupation d'étudiant relèvent, le cas échéant, de la CCT n° 50.",
        },
        {
          type: "paragraph",
          text: `Trois paliers se sont succédé en 2026. La hausse d'avril relève le montant de base (CCT n° 43/18, troisième phase de l'accord social de 2021) : ce n'est pas une simple indexation. Le montant actuel est celui de juillet, pas celui d'avril encore affiché sur certaines pages.`,
        },
        {
          type: "table",
          caption: `RMMMG brut de référence, 18 ans et plus, temps plein (tableau CNT des montants des CCT).`,
          headers: ["Date d'effet", "Montant brut", "Nature du changement"],
          stackOnMobile: true,
          rowHeader: true,
          rows: [
            [BE_RMMMG_JAN_FROM_LABEL, L.janMonthly, BE_RMMMG_JAN_NATURE],
            [BE_RMMMG_APR_FROM_LABEL, L.aprMonthly, BE_RMMMG_APR_NATURE],
            [BE_RMMMG_CURRENT_FROM_LABEL, L.adultMonthly, BE_RMMMG_JUL_NATURE],
          ],
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            `Le montant de base inscrit dans la CCT n° 43 coordonnée de mai 2026 reste ${L.aprMonthly}. Ce n'est plus le montant indexé applicable depuis juillet. Le dossier thématique du CNT peut encore afficher le palier d'avril : pour le chiffre actuel, le tableau des montants des CCT fait foi.`,
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour situer la Belgique parmi les autres pays européens,",
          label: "comparer les salaires minimums en Europe",
          href: SMIC_EUROPE_HREF,
        },
      ],
    },
    {
      id: "rmmmg-moyen",
      title: "Pourquoi le RMMMG n'est-il pas un simple salaire de base mensuel ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le sigle RMMMG signifie revenu minimum mensuel moyen garanti. Le mot « moyen » n'est pas un détail. Le plancher porte sur un revenu moyen de référence, pas automatiquement sur le salaire de base versé chaque mois.",
        },
        {
          type: "paragraph",
          text: "La CCT n° 43 retient, pour cette appréciation, des rémunérations en espèces ou en nature et certaines primes ou avantages liés au travail normal. Des sommes qui portent sur une période plus longue, par exemple un treizième mois ou une prime de fin d'année, peuvent entrer dans le calcul si le droit est acquis et si le paiement intervient dans les douze mois. Un décompte est alors prévu au moment du paiement. Si la moyenne reste inférieure au RMMMG, l'employeur verse la différence. Si le contrat se termine avant ce paiement, le décompte se fait à ce moment.",
        },
        {
          type: "paragraph",
          text: "Certaines sommes n'entrent pas dans cette moyenne, notamment les majorations pour heures supplémentaires, des prestations sociales pendant une suspension du contrat (maladie, chômage temporaire) et le pécule de vacances, simple ou double, sous réserve des précisions de la CCT. Les avantages non récurrents liés aux résultats, visés par la CCT n° 90, sont exclus dans la limite du plafond légal prévu.",
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Respecter le RMMMG, respecter le barème de la commission paritaire et payer la rémunération prévue au contrat sont trois obligations distinctes. Le caractère « moyen » du RMMMG n'autorise pas à verser n'importe quel salaire chaque mois en promettant une compensation en fin d'année. Le barème sectoriel applicable, lui, s'apprécie selon ses propres règles.",
          ],
        },
      ],
    },
    {
      id: "commission-paritaire",
      title: "Quel minimum s'applique selon votre commission paritaire ?",
      blocks: [
        {
          type: "paragraph",
          text: "En Belgique, le salaire minimum réellement dû est souvent celui de la commission paritaire, abrégée CP, ou de la sous-commission paritaire, abrégée SCP. Ces organes concluent des conventions collectives de travail, abrégées CCT, qui fixent des barèmes, des classifications de fonctions et, souvent, des règles d'indexation propres au secteur.",
        },
        {
          type: "paragraph",
          text: "Le RMMMG du CNT est un plancher interprofessionnel. Le barème sectoriel peut être plus élevé. Le SPF Emploi précise aussi que les commissions paritaires peuvent choisir le contenu et le mécanisme d'indexation de leur propre RMMMG sectoriel, sans descendre sous le montant de base du CNT. Comme les dates d'indexation peuvent différer, un RMMMG sectoriel peut, temporairement, rester en dessous du montant CNT déjà indexé. Ce n'est donc pas une simple règle « le plus élevé des deux, à tout moment ».",
        },
        {
          type: "paragraph",
          text: "Le diplôme, l'intitulé du métier ou le lieu de travail (Wallonie, Bruxelles, Flandre) ne suffisent pas, à eux seuls, à désigner la commission compétente.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Repérer le numéro de commission paritaire",
              description:
                "Sur la fiche de paie, le numéro de CP est en principe indiqué. Sans fiche, le champ de compétence de chaque (sous-)commission est décrit sur le site du SPF Emploi.",
            },
            {
              title: "Ouvrir la base officielle",
              description:
                "La banque de données des salaires minimums reprend les barèmes sectoriels enregistrés, pas les salaires réellement versés dans chaque entreprise.",
              href: S.salairesMin.href,
              label: "salairesminimums.be",
            },
            {
              title: "Choisir la date pertinente",
              description:
                "Les barèmes évoluent avec les CCT et les indexations. Vérifiez la date d'application affichée pour votre commission.",
            },
            {
              title: "Identifier la catégorie de fonction",
              description:
                "Le minimum dépend de la classification, de l'ancienneté éventuelle et des conditions prévues par la CCT, pas seulement du nom du métier.",
            },
            {
              title: "Vérifier le régime de travail",
              description:
                "Temps plein, temps partiel, durée hebdomadaire de référence du secteur : le montant affiché n'est pas toujours un mensuel à 38 heures.",
            },
          ],
        },
        {
          type: "callout",
          variant: "verify",
          paragraphs: [
            "Depuis le 1er septembre 2022, le SPF n'actualise plus les données des commissions de moins de 2 000 travailleurs. La (sous-)commission paritaire compétente reste l'interprète de sa CCT. Si le barème de votre commission n'est pas actualisé, consultez la CCT correspondante ou demandez confirmation au Contrôle des lois sociales.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Mode d'emploi de la base et précisions sur la CCT n° 50 :",
          label: "information concernant la banque de données (SPF Emploi)",
          href: S.spfBaremesInfo.href,
        },
      ],
    },
    {
      id: "horaire-temps-partiel",
      title: "Combien cela représente-t-il à l'heure et à temps partiel ?",
      blocks: [
        {
          type: "paragraph",
          text: `Depuis le 1er janvier 2003, la durée hebdomadaire de travail est en principe de ${L.weeklyHours} heures. Cette durée peut être effective, ou moyenne : une semaine de 40 heures n'est pas automatiquement deux heures supplémentaires, si le régime prévoit un repos compensatoire qui ramène la moyenne à ${L.weeklyHours} heures (par exemple 12 jours de repos compensatoire).`,
        },
        {
          type: "paragraph",
          text: `Le SPF Emploi publie un équivalent horaire indicatif du RMMMG : ${L.adultHourly} brut, obtenu en divisant ${L.adultMonthly} par (${L.weeklyHours} × 52 / 12). Ce n'est pas un salaire horaire belge universel. Il ne remplace pas le minimum horaire de votre commission paritaire.`,
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `À temps partiel, la CCT n° 35 prévoit un prorata du RMMMG temps plein de la commission paritaire compétente, ou du RMMMG du CNT s'il n'y a pas de minimum sectoriel. Exemple indicatif : ${BE_RMMMG_PART_TIME_EXAMPLE_HOURS} h par semaine sur une référence de ${BE_RMMMG_FULL_TIME_WEEKLY} h, soit un RMMMG proratisé d'environ ${L.partTime19Monthly} brut par mois (${L.adultMonthly} × ${BE_RMMMG_PART_TIME_EXAMPLE_HOURS} / ${BE_RMMMG_FULL_TIME_WEEKLY}).`,
          ],
        },
      ],
    },
    {
      id: "jeunes-etudiants",
      title: "Quelles règles pour les jeunes et les étudiants ?",
      blocks: [
        {
          type: "paragraph",
          text: "Quatre situations se distinguent. Un salarié ordinaire majeur, un salarié mineur, un étudiant sous contrat d'occupation d'étudiant et un alternant ou apprenti relevant d'un régime spécifique ne relèvent pas du même plancher.",
        },
        {
          type: "paragraph",
          text: `Un salarié de 18 à 20 ans occupé dans les liens d'un contrat de travail ordinaire relève de la CCT n° 43, donc de ${L.adultMonthlyLong} à temps plein. On n'applique pas à ce profil les pourcentages « étudiants ».`,
        },
        {
          type: "paragraph",
          text: "La CCT n° 50 est supplétive. Elle ne s'applique que s'il n'existe pas de dispositions sectorielles pour les salaires jeunes (moins de 18 ans) ou les salaires étudiants (moins de 21 ans), ou si la commission n'est pas constituée. Si le barème sectoriel vise les travailleurs sans exclure les jeunes ou les étudiants, c'est ce barème qui s'applique, pas la CCT n° 50.",
        },
        {
          type: "table",
          caption: `Références interprofessionnelles à temps plein pour les étudiants, publiées par le SPF Emploi au ${BE_RMMMG_CURRENT_FROM_LABEL}, sous réserve des dispositions sectorielles applicables. Les moins de 21 ans peuvent relever de la CCT n° 50 ; à partir de 21 ans, la référence relève de la CCT n° 43.`,
          headers: ["Âge de l'étudiant", "Pourcentage", "Mensuel brut temps plein", "Horaire indicatif (38 h)"],
          stackOnMobile: true,
          rowHeader: true,
          rows: [
            [`21 ans et plus`, `${BE_STUDENT_PCT_21} %`, L.adultMonthly, L.adultHourly],
            [`20 ans`, `${BE_STUDENT_PCT_20} %`, L.student20Monthly, L.student20Hourly],
            [`19 ans`, `${BE_STUDENT_PCT_19} %`, L.student19Monthly, L.student19Hourly],
            [`18 ans`, `${BE_STUDENT_PCT_18} %`, L.student18Monthly, L.student18Hourly],
            [`17 ans`, `${BE_STUDENT_PCT_17} %`, L.student17Monthly, L.student17Hourly],
            [`16 ans`, `${BE_STUDENT_PCT_16} %`, L.student16Monthly, L.student16Hourly],
          ],
        },
        {
          type: "paragraph",
          text: "Pour un job à temps partiel, la rémunération dépend du nombre d'heures et du barème applicable.",
        },
        {
          type: "paragraph",
          text: `Depuis le ${BE_STUDENT_REDUCED_HOURS_FROM_LABEL}, le quota Student at Work est de ${L.studentHours} heures par année civile à cotisations réduites. Travailler davantage n'est pas interdit : au-delà, les cotisations ordinaires s'appliquent. Cotisations, fiscalité et allocations familiales restent des questions distinctes.`,
        },
        {
          type: "callout",
          variant: "verify",
          paragraphs: [
            "Les allocations d'apprentissage ou d'alternance ne figurent pas dans la banque de données des salaires minimums. Pour un contrat d'alternance, vérifiez le régime applicable plutôt que le tableau ci-dessus.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Quota et cotisations :",
          label: "heures Student at Work",
          href: S.studentAtWork.href,
        },
      ],
    },
    {
      id: "brut-net",
      title: "Combien reste-t-il en net ?",
      blocks: [
        {
          type: "paragraph",
          text: "Il n'existe pas de salaire minimum net unique en Belgique. Retirer automatiquement 13,07 % puis un taux d'impôt forfaitaire ne donne pas un net fiable.",
        },
        {
          type: "paragraph",
          text: `Le brut est d'abord diminué des cotisations personnelles à l'Office national de sécurité sociale (ONSS), dont le taux de base est de ${L.onssRate}. Le bonus à l'emploi peut réduire, parfois jusqu'à annuler, cette retenue pour les bas salaires. Le précompte professionnel, retenu ensuite, dépend de la situation familiale, des personnes à charge et des règles fiscales en vigueur. Le convertisseur français du site ne doit pas être utilisé pour un salaire belge.`,
        },
        {
          type: "paragraph",
          text: "Pour une estimation, il faut au minimum le brut, le régime de travail, la situation familiale et le statut (salarié ordinaire, étudiant, etc.). Les instructions ONSS détaillent le bonus à l'emploi. Le SPF Finances publie les règles du précompte et l'outil Tax-Calc pour une estimation annuelle de l'impôt, ce qui n'équivaut pas à un simulateur de fiche de paie.",
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Instructions officielles :",
          label: "bonus à l'emploi (ONSS)",
          href: S.onssWorkbonus.href,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Fiscalité :",
          label: "calcul du précompte professionnel (SPF Finances)",
          href: S.spfPrecompte.href,
        },
      ],
    },
    {
      id: "frontaliers",
      title: "Quelles règles pour les frontaliers français ?",
      blocks: [
        {
          type: "paragraph",
          text: "La nationalité française ne modifie pas le minimum applicable. Un salarié occupé en Belgique sous contrat de travail a droit au RMMMG et, le cas échéant, au barème de sa commission paritaire, dans les mêmes conditions qu'un résident belge.",
        },
        {
          type: "paragraph",
          text: "Trois questions restent distinctes : le droit du travail (salaire minimum, CP, durée du travail), la sécurité sociale (affiliation et cotisations) et l'impôt. Habiter en France ne diminue pas le plancher belge. En revanche, le lieu d'imposition, le télétravail et l'application de la convention fiscale dépendent de la situation personnelle. Le pays d'imposition doit être déterminé selon votre situation et les règles fiscales applicables.",
        },
        {
          type: "paragraph",
          text: "Bruxelles, la Wallonie et la Flandre n'ont pas trois SMIC généraux différents. Des aides régionales peuvent exister, mais elles ne se confondent ni avec le RMMMG ni avec le barème sectoriel.",
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Pour le barème, partez de la fiche de paie belge et de salairesminimums.be. Pour la sécurité sociale et l'impôt, les organismes compétents (ONSS, SPF Finances, administration fiscale française) restent la référence.",
          ],
        },
      ],
    },
    {
      id: "indexation",
      title: "Comment fonctionnent les augmentations et l'indexation ?",
      blocks: [
        {
          type: "paragraph",
          text: "Trois mécanismes se distinguent. Une augmentation conventionnelle du RMMMG, comme celle du 1er avril 2026 (relevé du montant de base par la CCT n° 43/18), n'est pas une indexation. L'indexation du RMMMG, comme celle du 1er janvier et du 1er juillet 2026, suit le passage d'un indice-pivot. L'indexation sectorielle, elle, dépend des CCT de chaque commission paritaire.",
        },
        {
          type: "paragraph",
          text: "Il n'existe pas de loi générale qui indexerait tous les salaires belges à la même date et au même taux. Le SPF Emploi décrit un système fondé sur l'indice santé, lissé sur quatre mois, puis des mécanismes sectoriels : certains secteurs suivent un pivot, d'autres des dates fixes. Tous les salaires n'augmentent donc pas ensemble.",
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Aucune hausse 2027 n'est applicable à la date de vérification de ce guide. Une annonce, un accord, une CCT signée, un texte applicable et une prévision d'inflation ne sont pas équivalents. Le barème du 1er juillet 2026 reste le montant actuel.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Présentation officielle :",
          label: "indexation automatique des salaires (SPF Emploi)",
          href: S.spfIndexation.href,
        },
      ],
    },
    {
      id: "comparaison-france",
      title: "Comparaison avec le SMIC français",
      blocks: [
        {
          type: "paragraph",
          text: `Le SMIC français applicable depuis le ${BE_COMPARE_FR_FROM_LABEL} est de ${L.frHourlyShort} brut par heure, soit ${L.frMonthly35} brut par mois pour 35 heures. Le RMMMG belge de référence est de ${L.adultMonthly} brut par mois depuis le ${BE_RMMMG_CURRENT_FROM_LABEL}, avec un équivalent horaire indicatif de ${L.adultHourly} sur ${L.weeklyHours} heures.`,
        },
        {
          type: "paragraph",
          text: `Le SMIC français et le RMMMG belge ne sont pas construits à l'identique. L'un est un salaire minimum interprofessionnel de croissance, horaire et mensuel, pour une durée légale de 35 heures. L'autre est un revenu mensuel moyen garanti, articulé avec des barèmes sectoriels, sur une durée de référence de ${L.weeklyHours} heures. Le brut ne mesure ni le net ni le pouvoir d'achat.`,
        },
        {
          type: "paragraph",
          text: `En horaire brut indicatif, le RMMMG est supérieur d'environ ${L.hourlyPctVsFr} au SMIC français. On ne présente pas ${L.adultMonthly} et ${L.frMonthly35} comme deux temps plein identiques : les durées de référence diffèrent. L'équivalent horaire belge n'est pas un salaire horaire universel.`,
        },
        {
          type: "paragraph",
          text: `Eurostat publie ${L.eurostatMonthly} brut par mois au ${BE_EUROSTAT_PERIOD_LABEL} (jeu ${BE_EUROSTAT_DATASET}, semestre ${BE_EUROSTAT_PERIOD}), soit le montant CNT arrondi à l'euro. Ce chiffre statistique n'est pas le barème juridique : le montant applicable reste ${L.adultMonthly}.`,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le barème français,",
          label: "voir le SMIC en France",
          href: SMIC_HREF,
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "Consulter le guide du salaire minimum au Luxembourg",
          href: LU_HREF,
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "Consulter le guide du salaire minimum en Allemagne",
          href: DE_HREF,
        },
      ],
    },
    {
      id: "verifier",
      title: "Comment vérifier sa rémunération et à qui s'adresser ?",
      blocks: [
        {
          type: "paragraph",
          text: "Avant de contester une paie, identifiez le profil (contrat ordinaire, étudiant, temps partiel), le numéro de commission paritaire, le barème correspondant à la fonction et à la date, puis les éléments retenus pour le RMMMG. Un salaire de base inférieur au RMMMG n'est pas, à lui seul, la preuve d'une irrégularité, mais il justifie de demander le détail du calcul.",
        },
        {
          type: "list",
          items: [
            {
              text: "Montants actualisés du RMMMG.",
              href: S.cntMontants.href,
              label: S.cntMontants.org,
            },
            {
              text: "Barèmes par commission paritaire.",
              href: S.salairesMin.href,
              label: "salairesminimums.be",
            },
            {
              text: "Fonctionnement du salaire et du RMMMG.",
              href: S.spfSalaire.href,
              label: S.spfSalaire.org,
            },
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            `Demandez d'abord une explication à l'employeur. La Direction générale Contrôle des lois sociales peut être contactée à ${CLS_MAIL}. Cette page ne fournit pas de conseil juridique personnalisé.`,
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: "Quel est le salaire minimum actuel en Belgique ?",
      answer: `Depuis le ${BE_RMMMG_CURRENT_FROM_LABEL}, le revenu minimum mensuel moyen garanti (RMMMG) pour un salarié de 18 ans et plus, à temps plein, visé par la CCT n° 43, est de ${L.adultMonthly} brut par mois. Le barème de la commission paritaire peut être plus élevé.`,
    },
    {
      question: "Existe-t-il un SMIC belge ?",
      answer:
        "Non, pas au sens du SMIC français. L'expression « SMIC belge » est utilisée par les lecteurs français, mais le dispositif officiel est le revenu minimum mensuel moyen garanti, fixé par convention collective, et les barèmes de commission paritaire.",
    },
    {
      question: "Le RMMMG correspond-il au salaire de base mensuel ?",
      answer: `Pas automatiquement. Le RMMMG est un revenu moyen de référence (${L.adultMonthly} brut par mois depuis le ${BE_RMMMG_CURRENT_FROM_LABEL} pour le profil visé). Certaines primes portant sur une période plus longue peuvent entrer dans l'appréciation, selon la CCT n° 43. Cela n'autorise pas à sous-payer chaque mois en promettant une compensation annuelle.`,
    },
    {
      question: "Comment trouver le minimum de ma commission paritaire ?",
      answer:
        "Repérez le numéro de commission paritaire sur la fiche de paie, puis consultez la banque de données officielle salairesminimums.be à la date pertinente, pour la catégorie de fonction et le régime de travail. Le diplôme ou l'intitulé du métier ne désignent pas seuls la commission compétente.",
    },
    {
      question: "Quel équivalent horaire pour 38 heures ?",
      answer: `Le SPF publie ${L.adultHourly} brut par heure, en divisant le RMMMG mensuel par (${L.weeklyHours} × 52 / 12). C'est un équivalent indicatif, pas un salaire horaire belge universel, ni le minimum sectoriel applicable.`,
    },
    {
      question: "Quel minimum à temps partiel ?",
      answer: `Le RMMMG se proratise selon la CCT n° 35, par rapport au temps plein de la commission compétente ou, à défaut, du CNT. Exemple pédagogique : ${BE_RMMMG_PART_TIME_EXAMPLE_HOURS} h sur ${BE_RMMMG_FULL_TIME_WEEKLY} h, soit environ ${L.partTime19Monthly} brut par mois de RMMMG proratisé. Ce n'est pas le salaire contractuel exact garanti à tous.`,
    },
    {
      question: "Quel minimum pour un étudiant ?",
      answer: `Un étudiant sous contrat d'occupation d'étudiant relève des références interprofessionnelles du SPF Emploi si le secteur n'a pas ses propres barèmes : CCT n° 50 pour les moins de 21 ans, CCT n° 43 à partir de 21 ans. Les mensuels publiés (par exemple ${L.student20Monthly} à 20 ans) sont des références à temps plein. Pour un job à temps partiel, la rémunération dépend du nombre d'heures et du barème applicable. Un salarié ordinaire de 18 à 20 ans n'est pas soumis à ces pourcentages.`,
    },
    {
      question: "Quel montant net peut-on attendre ?",
      answer: `Il n'existe pas de net unique. Le brut est diminué des cotisations ONSS (taux de base ${L.onssRate}, éventuellement réduit par le bonus à l'emploi) puis du précompte professionnel, qui dépend de la situation personnelle. Le convertisseur français du site ne s'applique pas.`,
    },
    {
      question: "Les frontaliers français ont-ils le même barème ?",
      answer:
        "Oui pour le droit du travail : la nationalité française ne change pas le RMMMG ni le barème de commission paritaire d'un salarié occupé en Belgique. La sécurité sociale et l'impôt sont des questions distinctes. Le pays d'imposition doit être déterminé selon votre situation et les règles fiscales applicables.",
    },
    {
      question: "Y a-t-il un minimum différent selon la région ?",
      answer:
        "Non : il n'existe pas trois SMIC généraux pour Bruxelles, la Wallonie et la Flandre. Le plancher interprofessionnel et les barèmes de commission paritaire s'appliquent selon le cadre conventionnel, pas selon la région de résidence.",
    },
    {
      question: "Quand intervient la prochaine augmentation ?",
      answer: `Aucune hausse future n'est applicable à la date de vérification de ce guide (${BE_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}). Le montant actuel date du ${BE_RMMMG_CURRENT_FROM_LABEL}. Une indexation ou un avenant conventionnel pourra le modifier, sans bascule automatique au 1er janvier.`,
    },
    {
      question: "Que faire si ma rémunération paraît trop basse ?",
      answer: `Vérifiez le type de contrat, le numéro de commission paritaire, le barème à la date considérée et les éléments retenus pour le RMMMG. Demandez le détail à l'employeur, puis contactez le Contrôle des lois sociales (${CLS_MAIL}) si nécessaire.`,
    },
  ],
  conclusion: {
    title: "À retenir",
    keyPoints: [
      `En vigueur depuis le ${BE_RMMMG_CURRENT_FROM_LABEL} : ${L.adultMonthly} brut par mois de RMMMG pour un salarié de 18 ans et plus, à temps plein, visé par la CCT n° 43.`,
      "Ce montant est un revenu moyen de référence, pas nécessairement le salaire de base de chaque mois.",
      "Le barème de la commission paritaire est souvent le minimum réellement dû ; il se vérifie sur salairesminimums.be.",
      "Il n'existe pas de net unique, ni de SMIC distinct par région, ni de hausse 2027 déjà applicable.",
    ],
    closingText:
      "Pour comparer la Belgique aux autres pays européens ou approfondir le SMIC français, utilisez les guides liés ci-dessous.",
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
          title: "Salaire minimum au Luxembourg",
          description: "Salaire social minimum, qualification et indexation.",
          href: LU_HREF,
        },
        {
          title: "Salaire minimum en Allemagne",
          description: "Mindestlohn horaire, estimations mensuelles et règles.",
          href: DE_HREF,
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
        text: `Sources consultées le ${BE_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}. Le montant actuellement applicable reprend le tableau CNT des montants des CCT au ${BE_RMMMG_CURRENT_FROM_LABEL}. Les règles du RMMMG, des commissions paritaires, de l'indexation, de la durée du travail et des étudiants reprennent le SPF Emploi, la CCT n° 43 coordonnée et Student at Work. Le SMIC français reprend Service-Public F2300. Eurostat (${BE_EUROSTAT_DATASET}, ${BE_EUROSTAT_PERIOD}) publie ${L.eurostatMonthly} au ${BE_EUROSTAT_PERIOD_LABEL}, arrondi distinct du barème CNT.`,
      },
      {
        type: "list",
        items: [
          {
            text: `${S.spfSalaire.label}.`,
            href: S.spfSalaire.href,
            label: S.spfSalaire.org,
          },
          {
            text: `${S.cntMontants.label}.`,
            href: S.cntMontants.href,
            label: S.cntMontants.org,
          },
          {
            text: `${S.cntTableauJuillet.label}.`,
            href: S.cntTableauJuillet.href,
            label: S.cntTableauJuillet.org,
          },
          {
            text: `${S.cct43.label}.`,
            href: S.cct43.href,
            label: S.cct43.org,
          },
          {
            text: `${S.cntDossier.label}.`,
            href: S.cntDossier.href,
            label: S.cntDossier.org,
          },
          {
            text: `${S.salairesMin.label}.`,
            href: S.salairesMin.href,
            label: S.salairesMin.org,
          },
          {
            text: `${S.spfBaremesInfo.label}.`,
            href: S.spfBaremesInfo.href,
            label: S.spfBaremesInfo.org,
          },
          {
            text: `${S.spfStudent.label}.`,
            href: S.spfStudent.href,
            label: S.spfStudent.org,
          },
          {
            text: `${S.studentAtWork.label}.`,
            href: S.studentAtWork.href,
            label: S.studentAtWork.org,
          },
          {
            text: `${S.onssWorkbonus.label}.`,
            href: S.onssWorkbonus.href,
            label: S.onssWorkbonus.org,
          },
          {
            text: `${S.spfIndexation.label}.`,
            href: S.spfIndexation.href,
            label: S.spfIndexation.org,
          },
          {
            text: `${S.spfDureeTravail.label}.`,
            href: S.spfDureeTravail.href,
            label: S.spfDureeTravail.org,
          },
          {
            text: `${S.spfPrecompte.label}.`,
            href: S.spfPrecompte.href,
            label: S.spfPrecompte.org,
          },
          {
            text: `${S.taxCalc.label}.`,
            href: S.taxCalc.href,
            label: S.taxCalc.org,
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
      description: "Montants officiels du SMIC français pour comparer les taux horaires.",
      href: SMIC_HREF,
    },
    relatedGuides: [
      { title: "SMIC en Europe", href: SMIC_EUROPE_HREF },
      { title: "Salaire minimum au Luxembourg", href: LU_HREF },
      { title: "Salaire minimum en Allemagne", href: DE_HREF },
    ],
    relatedSimulator: {
      title: "Fiche Belgique (Europe)",
      description: "Fiche Belgique et contexte européen.",
      href: SMIC_EUROPE_BE_HREF,
    },
  },
};
