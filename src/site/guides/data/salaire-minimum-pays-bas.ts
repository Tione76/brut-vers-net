import type { Guide } from "../types";
import {
  NL_COMPARE_FR_FROM_LABEL,
  NL_EUROSTAT_DATASET,
  NL_EUROSTAT_PERIOD,
  NL_EUROSTAT_PERIOD_LABEL,
  NL_HOURLY_FROM_LABEL,
  NL_HOUSING_REFORM_ANNOUNCED_ON_LABEL,
  NL_HOUSING_REFORM_TARGET_LABEL,
  NL_MIN_WAGE_BREADCRUMB,
  NL_MIN_WAGE_H1,
  NL_MIN_WAGE_LABELS as L,
  NL_MIN_WAGE_META_DESCRIPTION,
  NL_MIN_WAGE_PATH,
  NL_MIN_WAGE_PUBLISHED_AT,
  NL_MIN_WAGE_SEO_TITLE,
  NL_MIN_WAGE_SLUG,
  NL_MIN_WAGE_SOURCES as S,
  NL_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  NL_MIN_WAGE_SUBTITLE,
  NL_MIN_WAGE_UPDATED_AT,
  NL_NMW_EFFECTS_FROM_LABEL,
  NL_NMW_STCRT,
  NL_PREVIOUS_FROM_LABEL,
  NL_PREVIOUS_UNTIL_LABEL,
  NL_2027_ANNOUNCED_ON_LABEL,
  NL_2027_DECREE,
  NL_2027_DECREE_DATE_LABEL,
  NL_2027_EFFECTS_FROM_LABEL,
} from "@/site/salaire-minimum-pays-bas";

const SMIC_EUROPE_HREF = "/smic-europe";
const SMIC_EUROPE_NL_HREF = "/smic-europe#salaire-minimum-pays-bas";
const SMIC_HREF = "/smic";
const DE_HREF = "/salaire-minimum-allemagne";
const BE_HREF = "/salaire-minimum-belgique";

/**
 * Guide pays : salaire minimum néerlandais (wettelijk minimumuurloon).
 * URL canonique : /salaire-minimum-pays-bas
 */
export const salaireMinimumPaysBasGuide: Guide = {
  slug: NL_MIN_WAGE_SLUG,
  publicPath: NL_MIN_WAGE_PATH,
  breadcrumbLabel: NL_MIN_WAGE_BREADCRUMB,
  title: NL_MIN_WAGE_H1,
  seoTitle: NL_MIN_WAGE_SEO_TITLE,
  description: NL_MIN_WAGE_META_DESCRIPTION,
  subtitle: NL_MIN_WAGE_SUBTITLE,
  publishedAt: NL_MIN_WAGE_PUBLISHED_AT,
  updatedAt: NL_MIN_WAGE_UPDATED_AT,
  includeFaqSchema: true,
  faqSectionId: "questions-frequentes",
  faqTitle: "Questions fréquentes sur le salaire minimum aux Pays-Bas",
  faqIntro:
    "Réponses courtes sur les taux par âge, les exemples mensuels, le pécule, le BBL et 2027.",
  introduction: [
    `Depuis le ${NL_NMW_EFFECTS_FROM_LABEL}, le salaire minimum légal aux Pays-Bas est de ${L.adult} brut par heure pour les salariés de ${L.adultAge} ans et plus. Des taux inférieurs s'appliquent aux plus jeunes. Depuis 2024, le minimum est fixé à l'heure : le montant mensuel dépend du temps de travail. Le pécule de vacances doit être examiné séparément.`,
    "Le nom officiel est wettelijk minimumuurloon, le minimum horaire légal. Les 15-20 ans relèvent du minimumjeugdloon. Le vakantiegeld, ou vakantiebijslag, est le pécule de vacances, distinct du salaire des heures travaillées. En France, on dit souvent « SMIC néerlandais » : l'expression est courante, ce n'est pas le nom légal.",
  ],
  sections: [
    {
      id: "montant-actuel",
      title: "Quel est le salaire minimum aux Pays-Bas ?",
      blocks: [
        {
          type: "paragraph",
          text: `Le wettelijk minimumuurloon est un plancher horaire brut. Depuis le ${NL_HOURLY_FROM_LABEL}, il n'existe plus de minimum légal mensuel, hebdomadaire ou journalier unique. Pour les ${L.adultAge} ans et plus, le taux en vigueur depuis le ${NL_NMW_EFFECTS_FROM_LABEL} est ${L.adult} (${NL_NMW_STCRT}).`,
        },
        {
          type: "paragraph",
          text: "Ce guide présente le régime des Pays-Bas européens. Le même barème national s'applique à Amsterdam, Rotterdam, La Haye et dans les autres villes concernées : il n'existe pas de minimum légal général propre à Amsterdam. Une convention collective (CAO) ou un contrat peut prévoir davantage.",
        },
        {
          type: "paragraph",
          text: "En français, « Hollande » désigne souvent tout le pays. Le barème présenté ici est celui des Pays-Bas européens. Il ne s'étend pas automatiquement à Bonaire, Saint-Eustache et Saba, ni à Aruba, Curaçao ou Sint Maarten.",
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            `Le referentiemaandloon de ${L.referenceMonthly} sert surtout à l'indexation et à certaines prestations. Ce n'est plus le minimum mensuel dû à tous les salariés depuis 2024.`,
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour situer les Pays-Bas parmi les autres pays,",
          label: "comparer les salaires minimums en Europe",
          href: SMIC_EUROPE_HREF,
        },
      ],
    },
    {
      id: "bareme-age",
      title: "Quels montants selon l'âge ?",
      blocks: [
        {
          type: "table",
          caption: `Taux horaires bruts ordinaires depuis le ${NL_NMW_EFFECTS_FROM_LABEL} (Rijksoverheid, ${NL_NMW_STCRT}).`,
          headers: ["Âge", "Minimum horaire brut"],
          stackOnMobile: true,
          rowHeader: true,
          numeric: true,
          rows: [
            ["21 ans et plus", L.adult],
            ["20 ans", L.age20],
            ["19 ans", L.age19],
            ["18 ans", L.age18],
            ["17 ans", L.age17],
            ["16 ans", L.age16],
            ["15 ans", L.age15],
          ],
        },
        {
          type: "paragraph",
          text: "Le taux supérieur lié à l'âge s'applique à partir du jour de l'anniversaire.",
        },
        {
          type: "paragraph",
          text: "Ce barème ne comporte pas de taux pour les 13 et 14 ans. Cela ne signifie pas qu'ils ont un droit général à travailler : l'emploi des mineurs suit des restrictions distinctes du salaire minimum.",
        },
        {
          type: "list",
          items: [
            {
              text: "Barèmes 2026, Rijksoverheid (néerlandais).",
              href: S.rijkAmounts2026.href,
              label: S.rijkAmounts2026.org,
            },
            {
              text: "Quand le minimum s'applique, y compris l'anniversaire.",
              href: S.whenMinWage.href,
              label: S.whenMinWage.org,
            },
          ],
        },
      ],
    },
    {
      id: "mensuel-annuel",
      title: "Combien cela représente-t-il par mois ?",
      blocks: [
        {
          type: "paragraph",
          text: `Les montants ci-dessous sont des moyennes pédagogiques au taux de ${L.adult}, hors pécule de vacances : taux × heures hebdomadaires × 52 ÷ 12. On ne multiplie pas une semaine par quatre pour obtenir un mois.`,
        },
        {
          type: "table",
          caption: `Exemples pédagogiques, au taux de ${L.adult}, ${NL_NMW_EFFECTS_FROM_LABEL}. Ce ne sont pas des minima mensuels publiés.`,
          headers: [
            "Heures hebdomadaires",
            "Moyenne mensuelle brute hors pécule",
            "Repère annuel brut hors pécule",
          ],
          stackOnMobile: true,
          rowHeader: true,
          numeric: true,
          rows: [
            [`${L.hours20} h`, L.monthly20, L.annual20],
            [`${L.hours35} h`, L.monthly35, L.annual35],
            [`${L.hours36} h`, L.monthly36, L.annual36],
            [`${L.hours38} h`, L.monthly38, L.annual38],
            [`${L.hours40} h`, L.monthly40, L.annual40],
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `${L.hours36} h, ${L.hours38} h et ${L.hours40} h sont des hypothèses de durée, pas trois minima horaires. La durée du temps plein dépend du contrat ou de la convention. La moyenne sur 52 semaines sert à comparer : elle ne remplace pas le contrôle des heures retenues sur la paie.`,
          ],
        },
        {
          type: "paragraph",
          text: "Un mois peut compter davantage de jours de travail qu'un autre. Un salaire mensuel fixe peut être convenu si le nombre d'heures hebdomadaires est stable, selon les règles applicables. La formule × 52 ÷ 12 n'est pas la seule méthode de paie : le calendrier annuel et le rythme convenu peuvent compter.",
        },
        {
          type: "paragraph",
          text: "Les repères annuels au taux actuel ne reconstituent pas nécessairement les revenus réellement perçus en 2026 : le taux a changé en juillet.",
        },
      ],
    },
    {
      id: "pecule-vacances",
      title: "Pécule de vacances : que faut-il ajouter ?",
      blocks: [
        {
          type: "paragraph",
          text: `Trois notions distinctes : le salaire des heures de travail, le maintien de rémunération pendant les congés, et le pécule de vacances supplémentaire (vakantiegeld). Le pécule s'élève en principe à au moins ${L.holidayRate} du salaire brut annuel concerné.`,
        },
        {
          type: "paragraph",
          text: "Ce n'est pas un treizième ou un quatorzième mois légal. Il ne doit pas être ajouté discrètement au taux horaire officiel pour fabriquer un nouveau minimum. Il est souvent versé en mai ou juin, sans date unique obligatoire. D'autres modalités existent si elles sont encadrées, notamment par écrit ou par CAO.",
        },
        {
          type: "paragraph",
          text: "Une convention collective peut prévoir de ne pas verser de pécule distinct, à condition que la rémunération atteigne au moins 108 % du minimum. Ce n'est pas un choix que l'employeur peut décider seul. Pour un salaire supérieur à trois fois le minimum, un aménagement écrit est possible. Sur une offre « all-in », distinguez chaque composante et vérifiez le salaire retenu hors pécule.",
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `À ${L.hours36} h, avec une référence annuelle pédagogique de ${L.annual36} : pécule de ${L.holidayRate} ≈ ${L.holiday36}. Ensemble annuel indicatif ≈ ${L.annual36WithHoliday}. Ce n'est pas une reconstitution de toutes les paies 2026, ni de toutes les bases de calcul possibles.`,
          ],
        },
        {
          type: "paragraph",
          text: `Le salaire des congés et le pécule sont deux droits distincts. Le minimum légal de congés se mesure normalement à quatre fois la durée hebdomadaire de travail sur une année complète : ${L.hours36} h donnent ${L.holidayHours36} h.`,
        },
        {
          type: "list",
          items: [
            {
              text: "Pécule de vacances, Business.gov.nl (anglais).",
              href: S.holidayPay.href,
              label: S.holidayPay.org,
            },
            {
              text: "Heures de congés, Government.nl (anglais).",
              href: S.holidayHours.href,
              label: S.holidayHours.org,
            },
          ],
        },
      ],
    },
    {
      id: "apprentis-bbl",
      title: "Apprentis BBL, étudiants et stages",
      blocks: [
        {
          type: "paragraph",
          text: "Le BBL (beroepsbegeleidende leerweg) est un parcours néerlandais de formation professionnelle en alternance : en général plusieurs jours en entreprise et un jour à l'école. Les taux distincts ne concernent que les 18, 19 et 20 ans.",
        },
        {
          type: "table",
          caption: `Taux BBL depuis le ${NL_NMW_EFFECTS_FROM_LABEL}. Aux âges 15-17 ans et 21 ans et plus, le BBL reprend le barème ordinaire.`,
          headers: ["Âge", "Minimum BBL", "Minimum ordinaire"],
          stackOnMobile: true,
          rowHeader: true,
          numeric: true,
          rows: [
            ["20 ans", L.bbl20, L.age20],
            ["19 ans", L.bbl19, L.age19],
            ["18 ans", L.bbl18, L.age18],
          ],
        },
        {
          type: "paragraph",
          text: "Un emploi étudiant ordinaire suit le barème d'âge. Un contrat de travail BBL suit le barème BBL tant qu'il existe. Un stage pédagogique (stage de formation) n'a pas nécessairement un minimum légal d'indemnisation universel : une CAO peut prévoir une indemnité. Si le stagiaire accomplit en réalité du travail ordinaire, le minimum peut s'appliquer. Le titre « stage » ne décide pas à lui seul.",
        },
        {
          type: "list",
          items: [
            {
              text: "Barème BBL 2026 (néerlandais).",
              href: S.rijkBbl2026.href,
              label: S.rijkBbl2026.org,
            },
            {
              text: "Stages et minimum, Nederlandse Arbeidsinspectie (anglais).",
              href: S.internshipsNla.href,
              label: S.internshipsNla.org,
            },
          ],
        },
      ],
    },
    {
      id: "primes-heures",
      title: "Quelles primes et quelles heures comptent ?",
      blocks: [
        {
          type: "paragraph",
          text: "Entrent en principe dans le minimum : le salaire de base, le paiement des heures supplémentaires, certaines primes de performance ou de travail irrégulier, et les commissions régulières. Les pourboires peuvent compter s'ils font partie des conditions de travail convenues. Ils ne remplacent pas automatiquement une obligation patronale.",
        },
        {
          type: "paragraph",
          text: "Restent séparés, notamment : le pécule de vacances, les distributions de bénéfices, les versements occasionnels, les sommes différées (épargne, retraite patronale), les remboursements de frais et une allocation de fin d'année.",
        },
        {
          type: "paragraph",
          text: "Les heures supplémentaires doivent aussi respecter le minimum horaire, sans majoration légale automatique. Les heures de congés pris et les heures de maladie rémunérées comptent dans la durée retenue pour le minimum. Cela ne signifie pas que tout arrêt maladie est payé à 100 %.",
        },
        {
          type: "list",
          items: [
            {
              text: "Éléments qui comptent, Government.nl (anglais).",
              href: S.components.href,
              label: S.components.org,
            },
          ],
        },
      ],
    },
    {
      id: "cao-bulletin",
      title: "Convention collective et vérification du bulletin",
      blocks: [
        {
          type: "paragraph",
          text: "Une CAO (collectieve arbeidsovereenkomst) peut fixer un barème supérieur, une durée de temps plein, des primes ou un pécule. Un minimum conventionnel plus élevé s'impose. Un barème inférieur ne dispense pas de respecter le minimum légal applicable. Le code d'activité seul ne prouve pas le champ d'application.",
        },
        {
          type: "checklist",
          title: "À contrôler",
          items: [
            "Secteur, employeur et champ d'application de la CAO, y compris une éventuelle extension.",
            "Classification du poste et durée du temps plein.",
            "Barème à la bonne date, primes et pécule.",
            "Sur le bulletin : brutoloon (brut), nettoloon (net), loonheffing (retenue), loonheffingskorting (réduction de retenue), vakantiegeld (pécule), pensioenpremie (retraite).",
          ],
        },
      ],
    },
    {
      id: "salaire-net",
      title: "Quel salaire net peut-on attendre ?",
      blocks: [
        {
          type: "paragraph",
          text: "Il n'existe pas de minimum net unique, ni de coefficient français. Du brut partent notamment la loonheffing, d'éventuelles cotisations de retraite et d'autres retenues. Le résultat dépend de la résidence, de la situation personnelle, du calendrier du pécule et des autres revenus.",
        },
        {
          type: "paragraph",
          text: "La loonheffingskorting est une réduction de retenue, normalement appliquée à un seul revenu ou employeur à la fois. Ce n'est pas une prime patronale. Le net du bulletin n'est pas forcément le budget réellement disponible.",
        },
        {
          type: "paragraph",
          text: "L'assurance santé néerlandaise (zorgverzekering) est en principe une dépense personnelle distincte du net versé. L'aide zorgtoeslag existe sous conditions : elle n'est pas due à tous les salariés. Le convertisseur français de ce site ne s'applique pas à une paie néerlandaise.",
        },
        {
          type: "list",
          items: [
            {
              text: "Loonheffingskorting, Belastingdienst (néerlandais).",
              href: S.loonheffing.href,
              label: S.loonheffing.org,
            },
            {
              text: "Assurance santé de base, Government.nl (anglais).",
              href: S.healthInsurance.href,
              label: S.healthInsurance.org,
            },
          ],
        },
      ],
    },
    {
      id: "logement-assurance",
      title: "Logement et assurance : quelles retenues ?",
      blocks: [
        {
          type: "paragraph",
          text: `Les retenues d'impôt et de cotisations ne se confondent pas avec une retenue pour le logement fourni, ni avec le loyer réellement dû. Sous conditions, notamment une autorisation écrite et des exigences de qualité du logement, une retenue de logement peut atteindre ${L.housingShare} du minimum brut applicable. Ce n'est pas un plafond légal universel de loyer.`,
        },
        {
          type: "paragraph",
          text: `Pour l'assurance santé, si l'employeur paie la prime pour le salarié, avec procuration écrite et copie de la police, un plafond de retenue 2026 de ${L.healthDeductionAnnual} par an, soit ${L.healthDeductionMonthly} par mois, est indiqué. Ce n'est pas le prix obligatoire de l'assurance pour tout le monde, ni une cotisation salariale forfaitaire.`,
        },
        {
          type: "paragraph",
          text: `Une ancienne réduction progressive des retenues de logement, un temps évoquée pour 2026, n'a pas été mise en œuvre comme initialement prévu. Le ${NL_HOUSING_REFORM_ANNOUNCED_ON_LABEL}, le gouvernement a annoncé vouloir supprimer cette possibilité, articulée avec une réforme de protection locative, avec un objectif au ${NL_HOUSING_REFORM_TARGET_LABEL}. Ce n'est pas une interdiction déjà applicable.`,
        },
        {
          type: "list",
          items: [
            {
              text: "Retenues actuelles, Rijksoverheid (néerlandais).",
              href: S.housing.href,
              label: S.housing.org,
            },
            {
              text: "Annonce de réforme, septembre 2026 (néerlandais).",
              href: S.housingReform.href,
              label: S.housingReform.org,
            },
          ],
        },
      ],
    },
    {
      id: "francais-nl",
      title: "Français travaillant aux Pays-Bas : quels points vérifier ?",
      blocks: [
        {
          type: "paragraph",
          text: "Un salarié français a droit au même barème que les autres, selon l'âge et le contrat. La nationalité ne crée pas un taux inférieur. Pour un ressortissant européen, le droit de circuler et de travailler se distingue des formalités : inscription, BSN et assurance selon la situation.",
        },
        {
          type: "paragraph",
          text: "Un contrat local n'est pas un détachement. La fiscalité et la sécurité sociale se vérifient séparément. La France et les Pays-Bas n'ont pas de régime frontalier général analogue à celui de certains pays voisins. Cette page n'est pas un guide d'expatriation et ne donne pas de conseil fiscal individualisé.",
        },
        {
          type: "list",
          items: [
            {
              text: "Information pour travailler aux Pays-Bas, Work in NL (anglais).",
              href: S.workInNl.href,
              label: S.workInNl.org,
            },
          ],
        },
      ],
    },
    {
      id: "evolution",
      title: "Évolution et changements de 2027",
      blocks: [
        {
          type: "table",
          caption: "Taux horaires bruts ordinaires. 2027 : annonce du 29 octobre 2026, publication au Staatscourant non identifiée.",
          headers: [
            "Période",
            "21 ans et plus",
            "20 ans",
            "19 ans",
            "18 ans",
            "17 ans",
            "16 ans",
            "15 ans",
          ],
          stackOnMobile: true,
          rowHeader: true,
          numeric: true,
          rows: [
            [
              `${NL_PREVIOUS_FROM_LABEL} à ${NL_PREVIOUS_UNTIL_LABEL}`,
              L.previousAdult,
              L.previousAge20,
              L.previousAge19,
              L.previousAge18,
              L.previousAge17,
              L.previousAge16,
              L.previousAge15,
            ],
            [
              `Depuis ${NL_NMW_EFFECTS_FROM_LABEL}`,
              L.adult,
              L.age20,
              L.age19,
              L.age18,
              L.age17,
              L.age16,
              L.age15,
            ],
            [
              `${NL_2027_EFFECTS_FROM_LABEL}, annoncé`,
              L.announced2027Adult,
              L.announced2027Age20,
              L.announced2027Age19,
              L.announced2027Age18,
              L.announced2027Age17,
              L.announced2027Age16,
              L.announced2027Age15,
            ],
          ],
        },
        {
          type: "paragraph",
          text: `Le minimum horaire, en vigueur depuis le ${NL_HOURLY_FROM_LABEL}, est normalement révisé au 1er janvier et au 1er juillet. Le ${NL_2027_ANNOUNCED_ON_LABEL}, le ministre a annoncé ${L.announced2027Adult} au ${NL_2027_EFFECTS_FROM_LABEL} pour les 21 ans et plus. La lettre indique que le règlement est transmis pour publication au Staatscourant. Lors de la vérification du ${NL_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}, cette publication n'a pas été identifiée. Ce n'est pas le taux actuel.`,
        },
        {
          type: "paragraph",
          text: `Le décret du ${NL_2027_DECREE_DATE_LABEL}, publié au ${NL_2027_DECREE}, prévoit au ${NL_2027_EFFECTS_FROM_LABEL} de nouveaux pourcentages jeunes (20 ans : 87,5 % ; 19 ans : 75 % ; 18 ans : 62,5 % ; 17 ans : 50 % ; 16 ans : 40 % ; 15 ans : 30 %) et la disparition du barème BBL inférieur distinct. Les montants en euros du tableau reprennent la pièce jointe à la lettre d'indexation. Ils ne s'appliquent pas en octobre 2026.`,
        },
      ],
    },
    {
      id: "comparaison-france",
      title: "Comparaison avec la France",
      blocks: [
        {
          type: "paragraph",
          text: `Le SMIC français en vigueur depuis le ${NL_COMPARE_FR_FROM_LABEL} est de ${L.frHourly} brut de l'heure, soit ${L.frMonthly35} brut par mois à 35 heures (Service-Public, fiche F2300). À durée horaire comparable, le taux néerlandais adulte est supérieur d'environ ${L.hourlyPctVsFr}. Ce n'est pas une conclusion sur le pouvoir d'achat.`,
        },
        {
          type: "paragraph",
          text: `Comparer ${L.monthly40} à 40 h avec le SMIC français à 35 h n'a de sens que si l'on dit les durées. À 35 h, la moyenne néerlandaise hors pécule est ${L.monthly35}. Le pécule d'au moins ${L.holidayRate} s'ajoute ensuite : on ne compare pas une rémunération qui l'inclut à une autre qui l'exclut sans le préciser.`,
        },
        {
          type: "paragraph",
          text: `Depuis janvier 2024, la méthodologie Eurostat convertit le minimum néerlandais ainsi : taux horaire × 36 heures × 52 semaines ÷ 12. Avec ${L.adult}, cela donne ${L.monthly36}, soit environ ${L.eurostatMonthly} à l'euro près. Eurostat (${NL_EUROSTAT_DATASET}, ${NL_EUROSTAT_PERIOD}, situation au ${NL_EUROSTAT_PERIOD_LABEL}) publie ${L.eurostatMonthly} brut par mois. Notre exemple pédagogique à ${L.hours36} h reprend la même formule. Cette conversion n'ajoute pas les ${L.holidayRate} de pécule et n'est pas un minimum mensuel légal.`,
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour le détail de la fiche européenne,",
          label: "voir la fiche Pays-Bas de SMIC en Europe",
          href: SMIC_EUROPE_NL_HREF,
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
      title: "Comment agir en cas de sous-paiement ?",
      blocks: [
        {
          type: "checklist",
          title: "À contrôler",
          items: [
            "Âge et date de l'anniversaire.",
            "Contrat ordinaire ou BBL.",
            "Date et heures concernées, y compris congés pris et maladie rémunérée.",
            "Taux horaire applicable.",
            "Pécule de vacances.",
            "CAO, retenues, distinction brut / net.",
          ],
        },
        {
          type: "paragraph",
          text: "Demandez le détail à l'employeur ou à l'agence. Work in NL informe les personnes qui travaillent aux Pays-Bas. Pour le non-respect du minimum légal, la Nederlandse Arbeidsinspectie peut recevoir un signalement. Le contrôle du minimum légal ne recouvre pas automatiquement un barème conventionnel supérieur. Une assistance syndicale ou juridique peut être utile selon le problème.",
        },
        {
          type: "list",
          items: [
            {
              text: "Que faire en cas de sous-paiement, Government.nl (anglais).",
              href: S.underpaid.href,
              label: S.underpaid.org,
            },
            {
              text: "Signalement, Nederlandse Arbeidsinspectie (anglais).",
              href: S.reportNla.href,
              label: S.reportNla.org,
            },
            {
              text: "Work in NL.",
              href: S.workInNl.href,
              label: S.workInNl.org,
            },
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: "Quel est le salaire minimum actuel aux Pays-Bas ?",
      answer: `Depuis le ${NL_NMW_EFFECTS_FROM_LABEL}, le wettelijk minimumuurloon est de ${L.adult} brut par heure pour les 21 ans et plus. Des taux plus bas s'appliquent de 15 à 20 ans. C'est un taux horaire brut, pas un minimum mensuel unique.`,
    },
    {
      question: "Le salaire minimum néerlandais est-il brut ou net ?",
      answer:
        "Brut. Du brut partent notamment la loonheffing et d'éventuelles cotisations. Il n'existe pas de minimum net unique.",
    },
    {
      question: `Quel montant mensuel à ${L.hours36} h, ${L.hours38} h ou ${L.hours40} h ?`,
      answer: `Au taux de ${L.adult}, hors pécule, moyenne sur 52 semaines : environ ${L.monthly36} à ${L.hours36} h, ${L.monthly38} à ${L.hours38} h et ${L.monthly40} à ${L.hours40} h. Ce ne sont pas des minima mensuels publiés.`,
    },
    {
      question: "Le minimum est-il différent à Amsterdam ou à Rotterdam ?",
      answer:
        "Non. Le même barème national des Pays-Bas européens s'applique. Une CAO ou un contrat peut prévoir davantage. Il n'existe pas de minimum légal général propre à Amsterdam.",
    },
    {
      question: "Hollande et Pays-Bas, est-ce le même salaire minimum ?",
      answer:
        "Oui : en français, « Hollande » désigne souvent les Pays-Bas. Le même barème s'applique aux Pays-Bas européens. Il ne s'étend pas automatiquement à Bonaire, Saint-Eustache, Saba, Aruba, Curaçao ou Sint Maarten.",
    },
    {
      question: "Quel taux avant 21 ans ?",
      answer: `Depuis le ${NL_NMW_EFFECTS_FROM_LABEL} : ${L.age20} à 20 ans, ${L.age19} à 19 ans, ${L.age18} à 18 ans, ${L.age17} à 17 ans, ${L.age16} à 16 ans et ${L.age15} à 15 ans, hors BBL distinct.`,
    },
    {
      question: "Quel taux pour un apprenti BBL ?",
      answer: `Depuis le ${NL_NMW_EFFECTS_FROM_LABEL}, le BBL a un barème plus bas à 18, 19 et 20 ans (${L.bbl18}, ${L.bbl19} et ${L.bbl20}). Aux autres âges, le taux ordinaire s'applique. Ce barème distinct doit disparaître au ${NL_2027_EFFECTS_FROM_LABEL}.`,
    },
    {
      question: "Quand le taux augmente-t-il après un anniversaire ?",
      answer:
        "À partir du jour de l'anniversaire. L'employeur n'attend pas la période de paie suivante.",
    },
    {
      question: "Le pécule de vacances est-il compris dans le taux horaire ?",
      answer: `Non. Le vakantiegeld s'élève en principe à au moins ${L.holidayRate} en plus. Il n'est pas un treizième mois légal. Sur une offre « all-in », vérifiez le salaire hors pécule.`,
    },
    {
      question: "Les pourboires comptent-ils ?",
      answer:
        "Ils peuvent compter s'ils font partie des conditions de travail convenues. Ils ne remplacent pas automatiquement l'obligation de payer le minimum.",
    },
    {
      question: "Quelle retenue pour le logement ?",
      answer: `Sous conditions, notamment une autorisation écrite, jusqu'à ${L.housingShare} du minimum brut applicable. Ce n'est pas un plafond de loyer. Une suppression est visée au ${NL_HOUSING_REFORM_TARGET_LABEL}, ce n'est pas le droit actuel.`,
    },
    {
      question: "L'assurance santé est-elle déduite du minimum ?",
      answer: `L'assurance est en principe une dépense personnelle. Si l'employeur paie la prime avec procuration, un plafond de retenue 2026 de ${L.healthDeductionAnnual} par an est indiqué. Ce n'est pas le prix de l'assurance pour tout le monde. L'aide zorgtoeslag existe sous conditions.`,
    },
    {
      question: "Que prévoit janvier 2027 ?",
      answer: `Annonce du ${NL_2027_ANNOUNCED_ON_LABEL} : ${L.announced2027Adult} pour les 21 ans et plus. La réforme des pourcentages jeunes et la fin du barème BBL distinct sont déjà publiées (${NL_2027_DECREE}), avec effet au ${NL_2027_EFFECTS_FROM_LABEL}. Lors de la vérification du ${NL_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}, la publication au Staatscourant de l'indexation adulte n'a pas été identifiée : ce n'est pas encore le taux applicable.`,
    },
    {
      question: "Comment signaler un sous-paiement ?",
      answer:
        "Parlez-en à l'employeur. Puis Work in NL pour l'information, et la Nederlandse Arbeidsinspectie pour le non-respect du minimum légal.",
    },
  ],
  conclusion: {
    title: "À retenir",
    keyPoints: [
      `Depuis le ${NL_NMW_EFFECTS_FROM_LABEL} : ${L.adult} brut de l'heure pour les 21 ans et plus.`,
      `${L.monthly36} à ${L.hours36} h est une moyenne hors pécule, pas un minimum mensuel publié.`,
      `Le pécule de vacances s'élève en général à au moins ${L.holidayRate}, distinct du taux horaire.`,
      "L'annonce 2027 n'est pas le taux déjà applicable.",
    ],
    closingText:
      "Pour comparer les Pays-Bas aux autres pays européens ou relire le SMIC français, utilisez les guides liés ci-dessous.",
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
        {
          title: "Salaire minimum en Belgique",
          description: "RMMMG, commissions paritaires et règles frontaliers.",
          href: BE_HREF,
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
        text: `Sources consultées le ${NL_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}. Les taux 2026 reprennent Rijksoverheid et le ${NL_NMW_STCRT}. La réforme des jeunes et du BBL reprend le ${NL_2027_DECREE}. L'indexation 2027 reprend la lettre du ${NL_2027_ANNOUNCED_ON_LABEL} ; la publication au Staatscourant n'a pas été identifiée lors de la vérification. Le SMIC français reprend Service-Public F2300. Eurostat (${NL_EUROSTAT_DATASET}, ${NL_EUROSTAT_PERIOD}) publie ${L.eurostatMonthly} au ${NL_EUROSTAT_PERIOD_LABEL}, conversion horaire × 36 h × 52 ÷ 12, hors pécule.`,
      },
      {
        type: "list",
        items: [
          { text: `${S.rijkAmounts2026.label}.`, href: S.rijkAmounts2026.href, label: S.rijkAmounts2026.org },
          { text: `${S.rijkBbl2026.label}.`, href: S.rijkBbl2026.href, label: S.rijkBbl2026.org },
          { text: `${S.stcrt16505.label}.`, href: S.stcrt16505.href, label: S.stcrt16505.org },
          { text: `${S.wml.label}.`, href: S.wml.href, label: S.wml.org },
          { text: `${S.components.label}.`, href: S.components.href, label: S.components.org },
          { text: `${S.holidayPay.label}.`, href: S.holidayPay.href, label: S.holidayPay.org },
          { text: `${S.housing.label}.`, href: S.housing.href, label: S.housing.org },
          { text: `${S.housingReform.label}.`, href: S.housingReform.href, label: S.housingReform.org },
          { text: `${S.stb279.label}.`, href: S.stb279.href, label: S.stb279.org },
          { text: `${S.kamer2027.label}.`, href: S.kamer2027.href, label: S.kamer2027.org },
          { text: `${S.loonheffing.label}.`, href: S.loonheffing.href, label: S.loonheffing.org },
          { text: `${S.underpaid.label}.`, href: S.underpaid.href, label: S.underpaid.org },
          { text: `${S.reportNla.label}.`, href: S.reportNla.href, label: S.reportNla.org },
          { text: `${S.smicFr.label}.`, href: S.smicFr.href, label: S.smicFr.org },
          { text: `${S.eurostatData.label}.`, href: S.eurostatData.href, label: S.eurostatData.org },
          { text: `${S.eurostatMeta.label}.`, href: S.eurostatMeta.href, label: S.eurostatMeta.org },
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
      { title: "Salaire minimum en Belgique", href: BE_HREF },
    ],
    relatedSimulator: {
      title: "Fiche Pays-Bas (Europe)",
      description: "Fiche Pays-Bas et contexte européen.",
      href: SMIC_EUROPE_NL_HREF,
    },
  },
};
