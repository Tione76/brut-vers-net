import type { Guide } from "../types";
import {
  UK_COMPARE_FR_FROM_LABEL,
  UK_ECB_RATE_LABEL,
  UK_MIN_WAGE_BREADCRUMB,
  UK_MIN_WAGE_H1,
  UK_MIN_WAGE_LABELS as L,
  UK_MIN_WAGE_META_DESCRIPTION,
  UK_MIN_WAGE_PATH,
  UK_MIN_WAGE_PUBLISHED_AT,
  UK_MIN_WAGE_SEO_TITLE,
  UK_MIN_WAGE_SLUG,
  UK_MIN_WAGE_SOURCES as S,
  UK_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  UK_MIN_WAGE_SUBTITLE,
  UK_MIN_WAGE_UPDATED_AT,
  UK_NMW_EFFECTS_FROM_LABEL,
  UK_NMW_SI,
  UK_NMW_SI_NUMBER,
  UK_PREVIOUS_FROM_LABEL,
  UK_PREVIOUS_UNTIL_LABEL,
  UK_RLW_ANNOUNCED_ON_LABEL,
  UK_RLW_IMPLEMENT_BY_LABEL,
  UK_2027_ANNOUNCED_ON_LABEL,
  UK_2027_EFFECTS_FROM_LABEL,
} from "@/site/salaire-minimum-royaume-uni";

const SMIC_EUROPE_HREF = "/smic-europe";
const SMIC_EUROPE_UK_HREF = "/smic-europe#salaire-minimum-royaume-uni";
const SMIC_HREF = "/smic";
const DE_HREF = "/salaire-minimum-allemagne";

/**
 * Guide pays : salaire minimum britannique (NMW / NLW).
 * URL canonique : /salaire-minimum-royaume-uni
 */
export const salaireMinimumRoyaumeUniGuide: Guide = {
  slug: UK_MIN_WAGE_SLUG,
  publicPath: UK_MIN_WAGE_PATH,
  breadcrumbLabel: UK_MIN_WAGE_BREADCRUMB,
  title: UK_MIN_WAGE_H1,
  seoTitle: UK_MIN_WAGE_SEO_TITLE,
  description: UK_MIN_WAGE_META_DESCRIPTION,
  subtitle: UK_MIN_WAGE_SUBTITLE,
  publishedAt: UK_MIN_WAGE_PUBLISHED_AT,
  updatedAt: UK_MIN_WAGE_UPDATED_AT,
  includeFaqSchema: true,
  faqSectionId: "questions-frequentes",
  faqTitle: "Questions fréquentes sur le salaire minimum au Royaume-Uni",
  faqIntro:
    "Réponses courtes sur les taux par âge, les exemples mensuels, Londres, l'apprentissage et 2027.",
  introduction: [
    `Depuis le ${UK_NMW_EFFECTS_FROM_LABEL}, le salaire minimum légal au Royaume-Uni est de ${L.nlw} brut par heure pour les travailleurs de ${L.adultAge} ans et plus, hors situations relevant du taux apprenti. Les plus jeunes ont d'autres taux. Le salaire mensuel dépend du nombre d'heures rémunérées : il n'existe pas de montant mensuel unique comparable au SMIC français à 35 heures.`,
    "En France, on parle souvent de « SMIC anglais » ou de « SMIC Royaume-Uni ». L'expression est courante, mais le nom légal est le National Minimum Wage, dont le taux supérieur s'appelle National Living Wage. Worker est une catégorie juridique britannique, plus large que le seul salarié. Ce montant est brut, en livres sterling : ce n'est ni un salaire net, ni le real Living Wage volontaire.",
  ],
  sections: [
    {
      id: "montant-actuel",
      title: "Quel est le salaire minimum au Royaume-Uni ?",
      blocks: [
        {
          type: "paragraph",
          text: `Le National Minimum Wage Act 1998 et les National Minimum Wage Regulations 2015 fixent un plancher horaire pour la plupart des workers. ${UK_NMW_SI} (${UK_NMW_SI_NUMBER}) portent les taux au ${UK_NMW_EFFECTS_FROM_LABEL}. Le National Living Wage est le taux légal le plus élevé, lié à l'âge. Il n'a pas de rapport automatique avec le coût de la vie.`,
        },
        {
          type: "paragraph",
          text: `En Angleterre, le salaire minimum légal suit le même barème que dans les autres nations du Royaume-Uni. Le texte s'applique aussi en Écosse, au pays de Galles et en Irlande du Nord. Jersey, Guernesey et l'île de Man n'y sont pas automatiquement soumis. Il n'existe pas de minimum légal londonien distinct. Un contrat, un accord collectif ou un régime sectoriel peut prévoir davantage : le minimum n'est ni le salaire habituel, ni un plafond.`,
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "Le seuil du National Living Wage est de 21 ans depuis avril 2024. Les anciens seuils de 23 ans puis de 25 ans ne s'appliquent plus.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour situer le Royaume-Uni parmi les autres pays,",
          label: "comparer les salaires minimums en Europe",
          href: SMIC_EUROPE_HREF,
        },
      ],
    },
    {
      id: "bareme-age",
      title: "Quels taux selon l'âge et l'apprentissage ?",
      blocks: [
        {
          type: "table",
          caption: `Taux horaires bruts depuis le ${UK_NMW_EFFECTS_FROM_LABEL} (GOV.UK, ${UK_NMW_SI_NUMBER}).`,
          headers: ["Catégorie", "Taux brut horaire"],
          stackOnMobile: true,
          rowHeader: true,
          rows: [
            [
              "21 ans et plus, hors taux apprenti applicable",
              L.nlw,
            ],
            ["18 à 20 ans, hors taux apprenti applicable", L.youth],
            [
              "Moins de 18 ans ayant atteint l'âge légal de fin de scolarité obligatoire",
              L.under18,
            ],
            ["Apprentis remplissant les conditions du taux apprenti", L.apprentice],
          ],
        },
        {
          type: "paragraph",
          text: "Le taux « moins de 18 ans » n'est pas un droit automatique pour n'importe quel mineur. Il faut avoir atteint l'âge légal de fin de scolarité obligatoire, en général 16 ans, avec des modalités qui peuvent différer selon les nations du Royaume-Uni.",
        },
        {
          type: "paragraph",
          text: `Le taux apprenti s'applique si la personne a moins de 19 ans, ou si elle a 19 ans et plus pendant la première année de son apprentissage. Le barème correspondant à l'âge s'applique seulement à partir de 19 ans, une fois cette première année terminée, pas à l'obtention du diplôme. Un apprenti de moins de 19 ans reste au taux apprenti après sa première année. Exemple : un apprenti de 21 ans en première année a droit à ${L.apprentice}. Le même apprenti, première année achevée, a droit à ${L.nlw}.`,
        },
        {
          type: "paragraph",
          text: "Un emploi étudiant ordinaire, un apprentissage, un stage qui constitue une relation de travail, un stage obligatoire d'une formation britannique, une simple observation professionnelle et un véritable bénévolat ne se traitent pas de la même façon. Le mot intern, volunteer ou trainee ne décide pas des droits.",
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "Les étudiants d'un cursus d'enseignement supérieur ou complémentaire britannique peuvent être exemptés pendant un stage obligatoire d'au plus un an, s'il fait partie du cursus. L'exemption ne couvre pas un job d'appoint, une année sabbatique, ni un étudiant français hors de ce cadre. Un indépendant réel n'a pas droit au minimum ; une personne artificiellement présentée comme indépendante peut quand même en relever. Une personne au pair qui vit chez l'employeur sans en être la famille, et qui est traitée comme un membre du foyer, a en principe droit au minimum.",
          ],
        },
        {
          type: "list",
          items: [
            {
              text: "Qui a droit au minimum.",
              href: S.whoGets.href,
              label: S.whoGets.org,
            },
            {
              text: "Stages et internships.",
              href: S.internships.href,
              label: S.internships.org,
            },
          ],
        },
      ],
    },
    {
      id: "mensuel-annuel",
      title: "Combien cela représente-t-il par mois et par an ?",
      blocks: [
        {
          type: "paragraph",
          text: `Les montants ci-dessous sont des exemples au taux de ${L.nlw}, pour une durée hebdomadaire stable. Semaine : taux × heures. Moyenne mensuelle : taux × heures × 52 ÷ 12. Repère annuel : taux × heures × 52. On ne multiplie pas une semaine par quatre pour obtenir un mois.`,
        },
        {
          type: "table",
          caption: `Exemples pédagogiques, au taux de ${L.nlw}, ${UK_NMW_EFFECTS_FROM_LABEL}. Ce ne sont pas des minima mensuels publiés.`,
          headers: [
            "Heures hebdomadaires",
            "Moyenne mensuelle brute",
            "Repère annuel brut",
          ],
          stackOnMobile: true,
          rowHeader: true,
          rows: [
            [`${L.hours20} h`, L.monthly20, L.annual20],
            [`${L.hours35} h`, L.monthly35, L.annual35],
            [`${L.hours375} h`, L.monthly375, L.annual375],
            [`${L.hours40} h`, L.monthly40, L.annual40],
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `${L.hours375} h est une hypothèse fréquente, pas une durée légale universelle. Le repère annuel au taux actuel ne reconstitue pas nécessairement les sommes perçues pendant l'année civile 2026. Les heures variables, les absences et le contrat peuvent modifier la paie.`,
          ],
        },
        {
          type: "paragraph",
          text: `Payer chaque mois, c'est en général 12 échéances. Payer toutes les quatre semaines, c'est 13 périodes sur 52 semaines, pas un treizième mois. À ${L.hours375} h, quatre semaines représentent ${L.fourWeeks375}, alors que la moyenne mensuelle est ${L.monthly375}.`,
        },
        {
          type: "paragraph",
          text: "Sur une offre, le droit légal aux congés est de 5,6 semaines payées par an pour presque tous les workers. Les jours fériés britanniques (bank holidays) peuvent être inclus dans ce décompte : ils ne s'ajoutent pas automatiquement. Un temps partiel régulier conserve en principe ces 5,6 semaines, avec un nombre de jours ou d'heures adapté au rythme de travail. Les horaires irréguliers suivent des modalités distinctes. Ce n'est pas l'équivalent de deux mois de salaire supplémentaires.",
        },
        {
          type: "paragraph",
          text: "En Grande-Bretagne (Angleterre, Écosse et pays de Galles), pour les workers à horaires irréguliers ou employés une partie de l'année, et pour les années de congés commençant à partir du 1er avril 2024, un versement des congés avec le salaire (rolled-up holiday pay) peut être autorisé. Ce n'est pas le régime des horaires réguliers, ni celui de l'Irlande du Nord : nidirect indique que la rémunération des congés doit y être versée lors de leur prise, sans l'incorporer au taux horaire. Dans tous les cas, ce complément ne peut pas masquer un salaire de base inférieur au minimum.",
        },
        {
          type: "list",
          items: [
            {
              text: "Congés payés, GOV.UK.",
              href: S.holiday.href,
              label: S.holiday.org,
            },
            {
              text: "Réforme des congés en Grande-Bretagne, 2024.",
              href: S.holidayReforms.href,
              label: S.holidayReforms.org,
            },
            {
              text: "Congés en Irlande du Nord.",
              href: S.nidirectHolidays.href,
              label: S.nidirectHolidays.org,
            },
          ],
        },
      ],
    },
    {
      id: "periode-paie",
      title: "Quand une hausse doit-elle apparaître sur la paie ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le contrôle du minimum se fait sur une période de référence de paie (pay reference period) : la période que le salaire couvre, au plus un mois. La date du virement ne suffit pas à fixer le taux. Une hausse annuelle ou liée à l'âge s'applique à partir de la période de référence qui commence à cette date ou après.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Une période allant du 16 mars au 15 avril peut rester au taux précédent. Le nouveau taux s'applique à la période commençant le 16 avril. L'employeur n'a pas à découper chaque mois au jour anniversaire ou au 1er avril.",
          ],
        },
        {
          type: "list",
          items: [
            {
              text: "Période de référence, Acas.",
              href: S.acasIncrease.href,
              label: S.acasIncrease.org,
            },
            {
              text: "Calcul officiel du minimum.",
              href: S.calculating.href,
              label: S.calculating.org,
            },
          ],
        },
      ],
    },
    {
      id: "heures-elements",
      title: "Quelles heures et quels éléments de rémunération comptent ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le salaire affiché ne suffit pas : les heures retenues pour le contrôle comptent autant. Les règles varient selon le type de travail : travail au temps, travail salarié annualisé, travail à la pièce ou travail non mesuré. En principe, le travail réellement effectué, la formation liée au travail et les déplacements entre clients ou lieux d'intervention comptent. Le trajet domicile-travail ordinaire ne compte pas.",
        },
        {
          type: "paragraph",
          text: "L'attente ou la disponibilité imposée sur le lieu de travail compte souvent. Les pauses et les astreintes suivent des règles distinctes selon le type de travail. Si une personne est normalement censée dormir pendant une garde, avec un couchage adapté, le minimum ne couvre en principe que le temps où elle est éveillée pour travailler. Si la nuit est surtout consacrée au travail, avec seulement des pauses pour dormir quand c'est possible, toute la garde peut compter. Les conditions réelles l'emportent sur le titre du poste.",
        },
        {
          type: "paragraph",
          text: "La limite moyenne de 48 heures par semaine, en général sur 17 semaines, n'est pas la durée normale d'un temps plein. Certains adultes peuvent y renoncer (opt-out). Les moins de 18 ans ont des plafonds plus stricts. Une majoration française automatique des heures supplémentaires ne s'applique pas : le contrat britannique et le minimum légal sont deux questions distinctes.",
        },
        {
          type: "paragraph",
          text: "Les pourboires, les frais de service et les droits d'entrée ou de couvert concernés ne remplacent pas le minimum, qu'ils passent ou non par la paie. Certaines primes de performance, bonus et commissions peuvent entrer dans le calcul, selon les règles de la période de référence. Les majorations pour heures de nuit, dimanche ou heures supplémentaires ne sont pas prises en compte de la même façon. Certains frais imposés pour le travail, comme un uniforme non remboursé, peuvent faire passer la rémunération retenue sous le plancher. Un remboursement de frais n'est pas un salaire. Le minimum est un montant brut, avant impôt et cotisations.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Exemple selon la méthode GOV.UK, aux taux 2026 : une personne de 27 ans travaille ${L.hours40} h à ${L.uniformHourly}, soit ${L.uniformGross}. Elle paie ${L.uniformCost} de location d'uniforme non remboursés. Pour le contrôle, ${L.uniformGross} moins ${L.uniformCost}, divisé par 40 h, donne ${L.uniformEquivalent} de l'heure, donc moins de ${L.nlw}.`,
          ],
        },
        {
          type: "list",
          items: [
            {
              text: "Heures à prendre en compte.",
              href: S.hours.href,
              label: S.hours.org,
            },
            {
              text: "Vérifier si le minimum est atteint.",
              href: S.acasCheckPay.href,
              label: S.acasCheckPay.org,
            },
          ],
        },
      ],
    },
    {
      id: "logement",
      title: "Logement fourni par l'employeur : quelle règle ?",
      blocks: [
        {
          type: "paragraph",
          text: `L'accommodation offset est le seul avantage en nature qui peut entrer dans le calcul du minimum. Depuis avril 2026, il est de ${L.offsetDaily} par jour, soit ${L.offsetWeekly} pour sept jours. Ce n'est pas un montant ajouté automatiquement à la paie, ni un plafond légal universel de loyer. Les repas, la voiture ou d'autres avantages ne bénéficient pas de la même règle.`,
        },
        {
          type: "paragraph",
          text: "Si le logement est gratuit, l'offset s'ajoute à la rémunération retenue. Si le loyer facturé reste inférieur ou égal à l'offset, il n'a pas d'effet. S'il est supérieur, seule la différence au-delà de l'offset réduit la rémunération retenue. On ne déduit pas tout le loyer du salaire.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Exemple GOV.UK : John, 24 ans, est payé 10,60 £ de l'heure pour 30 h, avec un logement gratuit sept jours. ${L.offsetWeekly} s'ajoutent à sa rémunération retenue, soit un équivalent de 13,19 £ de l'heure pour vérifier le minimum, au-dessus de ${L.nlw}. Ce n'est pas le taux versé en argent.`,
          ],
        },
        {
          type: "list",
          items: [
            {
              text: "Taux de l'offset logement.",
              href: S.accommodation.href,
              label: S.accommodation.org,
            },
            {
              text: "Effet sur le calcul.",
              href: S.accommodationEffect.href,
              label: S.accommodationEffect.org,
            },
          ],
        },
      ],
    },
    {
      id: "londres-living-wage",
      title: "Londres et le real Living Wage : quelle différence ?",
      blocks: [
        {
          type: "paragraph",
          text: `Le minimum légal britannique n'a pas de majoration londonienne. Le real Living Wage est un taux volontaire calculé par la Living Wage Foundation. Annoncé le ${UK_RLW_ANNOUNCED_ON_LABEL} pour 2026-2027 : ${L.rlwUk} hors Londres, ${L.rlwLondon} à Londres. Chez les employeurs accrédités concernés, la mise en œuvre est demandée au plus tard le ${UK_RLW_IMPLEMENT_BY_LABEL}. Tous les employeurs n'appliquent pas ces taux, et tous ne les appliquent pas seulement à cette date.`,
        },
        {
          type: "table",
          caption: "Minimum légal et taux volontaires. Sources : GOV.UK et Living Wage Foundation.",
          headers: ["Dispositif", "Montant horaire", "Statut"],
          stackOnMobile: true,
          rowHeader: true,
          rows: [
            ["National Living Wage, 21 ans et plus", L.nlw, "Légal, tout le Royaume-Uni"],
            [
              "Real Living Wage hors Londres, 18 ans et plus",
              L.rlwUk,
              `Volontaire, au plus tard le ${UK_RLW_IMPLEMENT_BY_LABEL} chez les employeurs accrédités concernés`,
            ],
            [
              "London Living Wage, 18 ans et plus",
              L.rlwLondon,
              `Volontaire, Grand Londres, au plus tard le ${UK_RLW_IMPLEMENT_BY_LABEL} chez les employeurs accrédités concernés`,
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Tous les employeurs londoniens ne sont pas légalement tenus de payer le London Living Wage. Un employeur accrédité s'engage à l'appliquer selon le calendrier de la Foundation. Ce n'est pas une obligation légale générale, mais cet engagement a des conséquences pour lui.",
        },
      ],
    },
    {
      id: "salaire-net",
      title: "Quel salaire net peut-on attendre ?",
      blocks: [
        {
          type: "paragraph",
          text: "Il n'existe pas de minimum net unique. Du brut partent l'Income Tax, la National Insurance, éventuellement une retraite professionnelle, un prêt étudiant ou d'autres retenues. Le code fiscal, les revenus et le territoire fiscal (notamment l'Écosse) changent le résultat. Le convertisseur français de ce site ne s'applique pas à une paie britannique.",
        },
        {
          type: "paragraph",
          text: "Le minimum horaire change au 1er avril. L'année fiscale britannique commence le 6 avril. L'année fiscale actuelle est 2026-2027. L'abattement personnel standard (Personal Allowance) est de 12 570 £. Pour un salarié, la National Insurance de classe 1 est, pour la plupart des gens, de 8 % entre 242 £ et 967 £ par semaine, puis 2 % au-delà.",
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            "Le service officiel Estimate your Income Tax for the current year s'adresse aux salariés dont l'impôt et la National Insurance sont prélevés chaque mois par l'employeur. Pour l'année fiscale 2026-2027 (6 avril 2026 au 5 avril 2027), il estime le net après impôt, cotisations de retraite et, le cas échéant, remboursement de prêt étudiant. Ce n'est pas un simulateur de fiche de paie, et il ne contrôle pas le respect du minimum.",
          ],
        },
        {
          type: "list",
          items: [
            {
              text: "Estimer l'impôt et la National Insurance.",
              href: S.estimateTax.href,
              label: S.estimateTax.org,
            },
            {
              text: "Barèmes d'Income Tax.",
              href: S.incomeTax.href,
              label: S.incomeTax.org,
            },
            {
              text: "National Insurance : combien on paie.",
              href: S.ni.href,
              label: S.ni.org,
            },
          ],
        },
      ],
    },
    {
      id: "francais-uk",
      title: "Français travaillant au Royaume-Uni : quels points vérifier ?",
      blocks: [
        {
          type: "paragraph",
          text: "Un worker français a droit au même barème que les autres, selon l'âge et l'apprentissage. La nationalité ne crée pas un taux inférieur. Avoir droit au minimum et avoir le droit de travailler sont deux sujets différents. Depuis le Brexit, un passeport français ne suffit pas. Le statut migratoire, le visa ou une situation particulière se vérifient sur GOV.UK.",
        },
        {
          type: "paragraph",
          text: "Un contrat local n'est pas un détachement. La fiscalité et la protection sociale ne se déduisent pas du passeport. Cette page n'est pas un guide d'expatriation et ne donne pas de conseil fiscal individualisé.",
        },
        {
          type: "list",
          items: [
            {
              text: "Vérifier si un visa est nécessaire.",
              href: S.workUk.href,
              label: S.workUk.org,
            },
          ],
        },
      ],
    },
    {
      id: "evolution",
      title: "Évolution et taux annoncés pour 2027",
      blocks: [
        {
          type: "table",
          caption: "Taux horaires bruts. 2027 : annonce du 28 octobre 2026, pas encore applicable.",
          headers: [
            "Période",
            "21 ans et plus",
            "18-20 ans",
            "Moins de 18 ans",
            "Apprentis concernés",
          ],
          stackOnMobile: true,
          rowHeader: true,
          rows: [
            [
              `${UK_PREVIOUS_FROM_LABEL} à ${UK_PREVIOUS_UNTIL_LABEL}`,
              L.previousNlw,
              L.previousYouth,
              L.previousUnder18,
              L.previousApprentice,
            ],
            [
              `Depuis ${UK_NMW_EFFECTS_FROM_LABEL}`,
              L.nlw,
              L.youth,
              L.under18,
              L.apprentice,
            ],
            [
              `${UK_2027_EFFECTS_FROM_LABEL}, annoncé`,
              L.announced2027Nlw,
              L.announced2027Youth,
              L.announced2027Under18,
              L.announced2027Apprentice,
            ],
          ],
        },
        {
          type: "paragraph",
          text: `Le ${UK_2027_ANNOUNCED_ON_LABEL}, le gouvernement a annoncé qu'il acceptait les recommandations de la Low Pay Commission. GOV.UK les affiche désormais dans le tableau des taux, à la ligne avril 2027. Vérifié le ${UK_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}, ils ne sont pas encore applicables. Le texte en vigueur reste le ${UK_NMW_SI_NUMBER}. Une volonté politique de rapprocher les tranches d'âge n'est pas une suppression déjà en vigueur.`,
        },
      ],
    },
    {
      id: "comparaison-france",
      title: "Comparaison avec la France",
      blocks: [
        {
          type: "paragraph",
          text: `Le SMIC français en vigueur depuis le ${UK_COMPARE_FR_FROM_LABEL} est de ${L.frHourly} brut de l'heure, soit ${L.frMonthly35} brut par mois à 35 heures (Service-Public, fiche F2300). Au taux BCE du ${UK_ECB_RATE_LABEL} (1 € = 0,83578 £), ${L.nlw} correspondent à environ ${L.nlwEur}. À durée horaire comparable, le taux britannique adulte est supérieur d'environ ${L.hourlyPctVsFr}. Ce n'est pas un taux commercial garanti, ni une conclusion sur le pouvoir d'achat.`,
        },
        {
          type: "paragraph",
          text: `Comparer ${L.monthly40} à 40 h avec le SMIC français à 35 h n'a de sens que si l'on dit les durées. À 35 h, la moyenne britannique est ${L.monthly35}, soit environ ${L.monthly35Eur} au même change. Le brut n'est pas le net. Le repère annuel au taux actuel ne reconstitue pas les revenus réellement perçus sur toute l'année civile 2026.`,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le détail de la fiche européenne,",
          label: "voir la fiche Royaume-Uni de SMIC en Europe",
          href: SMIC_EUROPE_UK_HREF,
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
      title: "Comment vérifier son salaire et agir ?",
      blocks: [
        {
          type: "checklist",
          title: "À contrôler sur le bulletin et le contrat",
          items: [
            "Âge et, le cas échéant, situation d'apprentissage.",
            "Période de référence de paie, distincte de la date du virement.",
            "Taux horaire applicable.",
            "Heures à prendre en compte, pas seulement les heures affichées.",
            "Frais de travail, retenues et pourboires.",
            "Logement fourni par l'employeur.",
            "Distinction entre brut et net.",
          ],
        },
        {
          type: "paragraph",
          text: "Demandez le détail à l'employeur ou au service paie. Le calculateur officiel du minimum permet un premier contrôle. En Grande-Bretagne, Acas peut aider à formuler la demande. En Irlande du Nord, c'est la Labour Relations Agency. Un signalement se fait via le formulaire Pay and work rights. HMRC applique aujourd'hui le minimum pour le compte de la Fair Work Agency.",
        },
        {
          type: "list",
          items: [
            {
              text: "Calculateur officiel du minimum.",
              href: S.calculator.href,
              label: S.calculator.org,
            },
            {
              text: "Signalement Pay and work rights.",
              href: S.payRights.href,
              label: S.payRights.org,
            },
            {
              text: "Acas, Grande-Bretagne.",
              href: S.acas.href,
              label: S.acas.org,
            },
            {
              text: "Labour Relations Agency, Irlande du Nord.",
              href: S.lra.href,
              label: S.lra.org,
            },
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: "Quel est le salaire minimum actuel au Royaume-Uni ?",
      answer: `Depuis le ${UK_NMW_EFFECTS_FROM_LABEL}, le National Living Wage est de ${L.nlw} brut par heure pour les 21 ans et plus, hors taux apprenti. Les 18-20 ans ont ${L.youth}. Les moins de 18 ans ayant atteint l'âge légal de fin de scolarité obligatoire, et les apprentis concernés, ont ${L.apprentice}.`,
    },
    {
      question: `Quel montant mensuel à ${L.hours35} h ou ${L.hours375} h ?`,
      answer: `Au taux de ${L.nlw} et pour une durée stable : environ ${L.monthly35} brut par mois à ${L.hours35} h, et ${L.monthly375} à ${L.hours375} h (moyenne sur 52 semaines). Ce ne sont pas des minima mensuels publiés.`,
    },
    {
      question: "Le minimum est-il différent à Londres ?",
      answer: `Non pour le minimum légal. Le London Living Wage volontaire est de ${L.rlwLondon}, annoncé le ${UK_RLW_ANNOUNCED_ON_LABEL}. Chez les employeurs accrédités concernés, la mise en œuvre est demandée au plus tard le ${UK_RLW_IMPLEMENT_BY_LABEL}. Tous les employeurs londoniens n'y sont pas légalement tenus.`,
    },
    {
      question: "Angleterre, Écosse, pays de Galles et Irlande du Nord ont-ils le même taux légal ?",
      answer:
        "Oui pour le National Minimum Wage et le National Living Wage. Jersey, Guernesey et l'île de Man ne sont pas automatiquement dans ce barème. L'Income Tax écossais, lui, a ses propres tranches.",
    },
    {
      question: "Quel taux pour les 18-20 ans ?",
      answer: `${L.youth} brut par heure depuis le ${UK_NMW_EFFECTS_FROM_LABEL}, sauf si le taux apprenti s'applique.`,
    },
    {
      question: "Quel taux pour un apprenti ?",
      answer: `${L.apprentice} s'il a moins de 19 ans, ou s'il a 19 ans et plus et qu'il n'a pas encore terminé sa première année. Le barème correspondant à l'âge s'applique seulement à partir de 19 ans, une fois cette première année achevée. Un apprenti de moins de 19 ans ne bascule pas automatiquement après sa première année. Ce n'est pas l'obtention du diplôme qui fait changer le taux.`,
    },
    {
      question: "Un étudiant ou un stagiaire a-t-il droit au minimum ?",
      answer:
        "Un job étudiant ordinaire, oui, selon l'âge. Un stage obligatoire d'un cursus britannique d'au plus un an peut être exempté. Le titre intern ou volunteer ne décide pas. Une simple observation professionnelle n'est en général pas du travail.",
    },
    {
      question: "Quand le taux augmente-t-il après un anniversaire ?",
      answer:
        "À partir de la période de référence de paie qui commence le jour de la hausse ou après, pas forcément dès le virement suivant. L'employeur n'a pas à découper le mois au jour près.",
    },
    {
      question: "Les pourboires comptent-ils ?",
      answer:
        "Non. Pourboires, frais de service et droits d'entrée ou de couvert concernés ne comptent pas, même versés via la paie. Certaines primes de performance, bonus et commissions peuvent en revanche être pris en compte, selon les règles de calcul et de période.",
    },
    {
      question: "Le logement peut-il être pris en compte ?",
      answer: `Oui, dans la limite de l'accommodation offset : ${L.offsetDaily} par jour depuis avril 2026. Ce n'est pas un plafond de loyer, et les autres avantages en nature ne suivent pas la même règle.`,
    },
    {
      question: "Quel montant net ?",
      answer:
        "Il n'existe pas de net unique. Income Tax, National Insurance, retraite et autres retenues dépendent de la situation et, en Écosse, des tranches locales. Le service officiel Estimate your Income Tax donne une estimation pour l'année fiscale, pas une fiche de paie.",
    },
    {
      question: "Que prévoit avril 2027 ?",
      answer: `Annonce du ${UK_2027_ANNOUNCED_ON_LABEL} : ${L.announced2027Nlw} pour les 21 ans et plus, ${L.announced2027Youth} pour les 18-20 ans, ${L.announced2027Under18} pour les moins de 18 ans et les apprentis concernés. Vérifié le ${UK_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}, ce n'est pas le taux déjà applicable.`,
    },
    {
      question: "Comment vérifier un sous-paiement ?",
      answer:
        "Contrôlez l'âge, la période de paie, les heures et les frais. Parlez-en à l'employeur. Puis Acas en Grande-Bretagne, la Labour Relations Agency en Irlande du Nord, ou le formulaire Pay and work rights. HMRC agit pour la Fair Work Agency.",
    },
  ],
  conclusion: {
    title: "À retenir",
    keyPoints: [
      `Depuis le ${UK_NMW_EFFECTS_FROM_LABEL} : ${L.nlw} brut de l'heure pour les 21 ans et plus, hors taux apprenti.`,
      `Les 18-20 ans ont ${L.youth}. Les moins de 18 ans concernés et certains apprentis ont ${L.apprentice}.`,
      `${L.monthly375} à ${L.hours375} h est une moyenne sur 52 semaines, pas un minimum mensuel publié.`,
      "Le real Living Wage londonien est volontaire. L'annonce 2027 n'est pas le taux déjà applicable.",
    ],
    closingText:
      "Pour comparer le Royaume-Uni aux autres pays européens ou relire le SMIC français, utilisez les guides liés ci-dessous.",
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
        text: `Sources consultées le ${UK_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}. Les taux 2026 reprennent GOV.UK et ${UK_NMW_SI} (${UK_NMW_SI_NUMBER}). L'annonce 2027 reprend la publication LPC du ${UK_2027_ANNOUNCED_ON_LABEL} ; une phrase de cette page mentionne avril 2026, alors que le tableau et le titre concernent avril 2027. Les taux volontaires reprennent l'annonce datée de la Living Wage Foundation. Le change reprend la BCE du ${UK_ECB_RATE_LABEL}. Le SMIC français reprend Service-Public F2300.`,
      },
      {
        type: "list",
        items: [
          { text: `${S.govRates.label}.`, href: S.govRates.href, label: S.govRates.org },
          { text: `${S.si2026.label}.`, href: S.si2026.href, label: S.si2026.org },
          { text: `${S.lpc2026.label}.`, href: S.lpc2026.href, label: S.lpc2026.org },
          { text: `${S.lpc2027.label}.`, href: S.lpc2027.href, label: S.lpc2027.org },
          { text: `${S.whoGets.label}.`, href: S.whoGets.href, label: S.whoGets.org },
          { text: `${S.calculating.label}.`, href: S.calculating.href, label: S.calculating.org },
          { text: `${S.acasIncrease.label}.`, href: S.acasIncrease.href, label: S.acasIncrease.org },
          { text: `${S.accommodation.label}.`, href: S.accommodation.href, label: S.accommodation.org },
          { text: `${S.rlwAnnounce.label}.`, href: S.rlwAnnounce.href, label: S.rlwAnnounce.org },
          { text: `${S.ni.label}.`, href: S.ni.href, label: S.ni.org },
          { text: `${S.nidirectHolidays.label}.`, href: S.nidirectHolidays.href, label: S.nidirectHolidays.org },
          { text: `${S.estimateTax.label}.`, href: S.estimateTax.href, label: S.estimateTax.org },
          { text: `${S.disputes.label}.`, href: S.disputes.href, label: S.disputes.org },
          { text: `${S.nidirect.label}.`, href: S.nidirect.href, label: S.nidirect.org },
          { text: `${S.ecb.label}.`, href: S.ecb.href, label: S.ecb.org },
          { text: `${S.smicFr.label}.`, href: S.smicFr.href, label: S.smicFr.org },
        ],
      },
    ],
  },
  bibliographyPlacement: "after-faq",
  sidebar: {
    calculator: {
      title: "SMIC en France",
      description: "Montants officiels du SMIC français pour comparer les bases horaires.",
      href: SMIC_HREF,
    },
    relatedGuides: [
      { title: "SMIC en Europe", href: SMIC_EUROPE_HREF },
      { title: "Salaire minimum en Allemagne", href: DE_HREF },
      { title: "SMIC en France", href: SMIC_HREF },
    ],
    relatedSimulator: {
      title: "Fiche Royaume-Uni (Europe)",
      description: "Fiche Royaume-Uni et contexte européen.",
      href: SMIC_EUROPE_UK_HREF,
    },
  },
};
