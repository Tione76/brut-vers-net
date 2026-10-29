import type { Guide } from "../types";
import {
  ES_COMPARE_FR_FROM_LABEL,
  ES_EUROSTAT_DATASET,
  ES_EUROSTAT_PERIOD,
  ES_EUROSTAT_PERIOD_LABEL,
  ES_MIN_WAGE_BREADCRUMB,
  ES_MIN_WAGE_H1,
  ES_MIN_WAGE_LABELS as L,
  ES_MIN_WAGE_META_DESCRIPTION,
  ES_MIN_WAGE_PATH,
  ES_MIN_WAGE_PUBLISHED_AT,
  ES_MIN_WAGE_SEO_TITLE,
  ES_MIN_WAGE_SLUG,
  ES_MIN_WAGE_SOURCES as S,
  ES_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL,
  ES_MIN_WAGE_SUBTITLE,
  ES_MIN_WAGE_UPDATED_AT,
  ES_PART_TIME_EXAMPLE_FULL_TIME_HOURS,
  ES_PART_TIME_EXAMPLE_HOURS,
  ES_SMI_DECREE_DATE_LABEL,
  ES_SMI_EFFECTS_FROM_LABEL,
  ES_SMI_IN_FORCE_FROM_LABEL,
  ES_SMI_PUBLISHED_ON_LABEL,
  ES_SMI_SHORT_CONTRACT_MAX_DAYS,
  ES_SS_WORKER_CC_LABEL,
  ES_SS_WORKER_FP_LABEL,
  ES_SS_WORKER_MEI_LABEL,
  ES_SS_WORKER_UNEMP_INDEF_LABEL,
  ES_SS_WORKER_UNEMP_TEMP_LABEL,
} from "@/site/salaire-minimum-espagne";

const SMIC_EUROPE_HREF = "/smic-europe";
const SMIC_EUROPE_ES_HREF = "/smic-europe#salaire-minimum-espagne";
const SMIC_HREF = "/smic";
const LU_HREF = "/salaire-minimum-luxembourg";
const BE_HREF = "/salaire-minimum-belgique";

/**
 * Guide pays : salaire minimum espagnol (SMI).
 * URL canonique : /salaire-minimum-espagne
 * Complète /smic-europe sans le remplacer.
 */
export const salaireMinimumEspagneGuide: Guide = {
  slug: ES_MIN_WAGE_SLUG,
  publicPath: ES_MIN_WAGE_PATH,
  breadcrumbLabel: ES_MIN_WAGE_BREADCRUMB,
  title: ES_MIN_WAGE_H1,
  seoTitle: ES_MIN_WAGE_SEO_TITLE,
  description: ES_MIN_WAGE_META_DESCRIPTION,
  subtitle: ES_MIN_WAGE_SUBTITLE,
  publishedAt: ES_MIN_WAGE_PUBLISHED_AT,
  updatedAt: ES_MIN_WAGE_UPDATED_AT,
  includeFaqSchema: true,
  faqSectionId: "questions-frequentes",
  faqTitle: "Questions fréquentes sur le salaire minimum en Espagne",
  faqIntro:
    "Réponses courtes sur le SMI, les 12 ou 14 versements, le temps partiel, le net et les frontaliers.",
  introduction: [
    `Le salaire minimum en Espagne s'appelle salario mínimo interprofesional, abrégé SMI. Depuis le ${ES_SMI_EFFECTS_FROM_LABEL}, il s'élève à ${L.fourteenMonthly} brut par versement pour un temps plein, sur 14 échéances, soit ${L.annual} brut sur une année complète. Lorsque les deux gratifications extraordinaires sont proratisées, l'équivalent est de ${L.twelveMonthly} brut par mois sur 12 versements. Le total annuel de référence reste le même.`,
    "En France, on parle souvent de « SMIC Espagne » ou de « SMIC espagnol ». L'expression est comprise, mais le terme officiel est le SMI. Ce montant est brut. Il n'est ni un salaire net, ni le salaire moyen, ni l'IPREM utilisé pour certaines prestations.",
  ],
  sections: [
    {
      id: "montant-actuel",
      title: "Quel est le salaire minimum en Espagne ?",
      blocks: [
        {
          type: "paragraph",
          text: `Le Gouvernement fixe chaque année le salario mínimo interprofesional, en application de l'article 27 de l'Estatuto de los Trabajadores. Pour 2026, le Real Decreto 126/2026 du ${ES_SMI_DECREE_DATE_LABEL} retient ${L.fourteenMonthly} brut par mois lorsque le salaire est fixé au mois, ou ${L.daily} brut par jour lorsque le salaire est fixé au jour. Il n'y a pas de distinction selon le sexe ni selon l'âge.`,
        },
        {
          type: "paragraph",
          text: `Le décret a été publié au Bulletin officiel de l'État le ${ES_SMI_PUBLISHED_ON_LABEL} et est entré en vigueur le ${ES_SMI_IN_FORCE_FROM_LABEL}. Ses effets portent toutefois sur toute l'année 2026, du ${ES_SMI_EFFECTS_FROM_LABEL} au 31 décembre. La publication de février n'est donc pas une hausse qui ne commencerait qu'en février : le montant 2026 est dû depuis janvier, avec régularisation le cas échéant.`,
        },
        {
          type: "paragraph",
          text: `Le SMI se calcule sur la rémunération en argent. Un avantage en nature ne peut pas réduire la somme d'argent correspondant au minimum. Le montant s'entend pour la journée légale de travail de l'activité. Si la durée de travail est inférieure au temps plein de référence, le SMI se perçoit au prorata. Pour le salaire journalier de ${L.daily}, la part des dimanches et jours fériés n'est pas incluse.`,
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            `Le plancher annuel retenu par le décret est de ${L.annual} brut à temps plein. Ce total sert de comparaison annuelle. Il n'autorise pas l'employeur à différer librement les salaires : l'article 29 du statut prévoit que le paiement des rémunérations périodiques ne peut dépasser un mois.`,
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          intro: "Pour situer l'Espagne parmi les autres pays européens,",
          label: "comparer les salaires minimums en Europe",
          href: SMIC_EUROPE_HREF,
        },
      ],
    },
    {
      id: "quatorze-versements",
      title: "Pourquoi 1 221 € sur 14 versements ou 1 424,50 € sur 12 ?",
      blocks: [
        {
          type: "paragraph",
          text: `Les deux chiffres décrivent la même référence annuelle, pas deux minima différents. L'article 31 de l'Estatuto de los Trabajadores reconnaît à la personne salariée deux gratifications extraordinaires par an, l'une à Noël, l'autre au mois fixé par convention collective ou par accord. La convention en fixe aussi le montant. On parle donc de 14 versements, ou 14 paies : 12 mensualités ordinaires et 2 gratifications. Cela ne signifie pas que l'on travaille 14 mois.`,
        },
        {
          type: "paragraph",
          text: `Le même article permet à la convention collective de proratiser ces gratifications sur les 12 mensualités. Ce n'est pas, en général, un choix libre du salarié ou de l'employeur au fil de l'eau : le mode de versement dépend du convenio colectivo applicable, éventuellement du contrat, dans le cadre prévu par la loi. L'Inspection du travail retient alors ${L.twelveMonthly} brut par mois pendant 12 mois, soit ${L.fourteenMonthly} plus la part des deux gratifications.`,
        },
        {
          type: "table",
          caption: `SMI brut de référence, année complète, temps plein (${ES_SMI_EFFECTS_FROM_LABEL}).`,
          headers: ["Mode de versement", "Montant brut", "Nombre de versements", "Total annuel"],
          stackOnMobile: true,
          rowHeader: true,
          rows: [
            ["14 versements", L.fourteenMonthly, "14", L.annual],
            ["12 versements, gratifications proratisées", L.twelveMonthly, "12", L.annual],
          ],
        },
        {
          type: "paragraph",
          text: `Ces montants supposent une année complète à temps plein, sur la référence SMI. En cas d'entrée ou de sortie en cours d'année, les droits aux gratifications extraordinaires dépendent notamment de leur acquisition, selon la convention et le statut. Le total annuel de ${L.annual} sert à comparer et à garantir le plancher. Il ne remplace pas l'obligation de payer chaque échéance à la date prévue.`,
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            `Sur une offre d'emploi, ${L.fourteenMonthly} « sur 14 paies » et ${L.twelveMonthly} « sur 12 paies » peuvent désigner le même SMI. Vérifiez le nombre de versements avant de comparer deux bruts mensuels.`,
          ],
        },
      ],
    },
    {
      id: "salaire-base-primes",
      title: "Salaire de base, primes et convention collective",
      blocks: [
        {
          type: "paragraph",
          text: "L'article 26 du statut définit le salaire comme l'ensemble des perceptions économiques, en argent ou en nature, pour le travail. Il distingue le salaire de base, fixé selon le temps ou l'ouvrage, et les compléments salariaux liés à la personne, au poste ou aux résultats de l'entreprise. Les remboursements de frais, les prestations de sécurité sociale et certaines indemnités de transfert, de suspension ou de licenciement ne sont pas du salaire.",
        },
        {
          type: "paragraph",
          text: "L'article 2 du décret 126/2026 prévoit que s'ajoutent au SMI, selon la convention et le contrat, les compléments salariaux de l'article 26.3, ainsi que l'accroissement garanti sur le salaire au temps en cas de rémunération à la prime ou au rendement. Toutes les primes ne s'ajoutent donc pas automatiquement, et toutes ne peuvent pas non plus être absorbées sans regarder le texte applicable.",
        },
        {
          type: "paragraph",
          text: `L'article 3 du même décret organise la compensation et l'absorption, en application de l'article 27.1 du statut. Si les salaires professionnels déjà perçus, dans leur ensemble et sur une base annuelle, dépassent le SMI, la hausse du minimum n'oblige pas à modifier la structure ni le montant de ces salaires. Le terme de comparaison annuel ne peut pas être inférieur à ${L.annual}, après prise en compte des compléments visés à l'article 2. Les salaires inférieurs à ce total doivent être relevés à due concurrence.`,
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Le communiqué du Conseil des ministres du 17 février 2026 annonce qu'une réglementation spécifique sera abordée pour éviter que la hausse du SMI soit intégrée dans des compléments déjà perçus. Au jour de vérification de cette page, le décret 126/2026 conserve les règles de compensation et d'absorption de l'article 3. Un communiqué sur une future réglementation ne suffit pas : tant qu'un texte applicable n'est pas publié, le droit en vigueur reste celui du décret et du statut.",
          ],
        },
        {
          type: "paragraph",
          text: "Le convenio colectivo, la convention collective, peut prévoir un barème plus favorable. Ce n'est pas un second SMI national. La convention a un champ territorial et professionnel. Le métier, à lui seul, ne désigne pas la convention applicable.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Identifier la convention applicable",
              description:
                "Le bulletin, le contrat ou l'employeur indiquent souvent le convenio. Sinon, le registre officiel REGCON permet de rechercher les conventions déposées.",
              href: S.regcon.href,
              label: "Ouvrir REGCON",
            },
            {
              title: "Vérifier le champ territorial et professionnel",
              description:
                "Une convention peut être d'entreprise, provinciale, autonome ou nationale. Le lieu de travail et l'activité comptent davantage que le nom usuel du métier.",
            },
            {
              title: "Trouver la classification du poste",
              description:
                "Le barème dépend du groupe, du niveau ou de la catégorie prévus par la convention, pas d'une équivalence improvisée avec un intitulé d'offre d'emploi.",
            },
            {
              title: "Consulter le barème et sa date",
              description:
                "Relevez le tableau de salaires en vigueur à la date considérée, y compris les avenants publiés au BOE ou au bulletin officiel autonome ou provincial.",
            },
            {
              title: "Vérifier la durée du travail et les éléments de rémunération",
              description:
                "Temps plein conventionnel, gratifications, ancienneté et compléments : le SMI national est un plancher, pas forcément le salaire dû.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Il n'existe pas de SMI légal général différent pour Madrid, Barcelone, la Catalogne ou les Canaries. Une convention provinciale ou autonome peut fixer un barème plus élevé, mais ce n'est pas un salaire minimum national régional. L'IPREM, indicateur public de revenu à effets multiples, sert surtout de référence pour des aides, des bourses ou des seuils administratifs. Ce n'est pas le SMI.",
        },
      ],
    },
    {
      id: "temps-travail",
      title: "Temps plein, temps partiel et question du taux horaire",
      blocks: [
        {
          type: "paragraph",
          text: `L'article 34 de l'Estatuto de los Trabajadores fixe la durée maximale ordinaire de travail de ${L.weeklyHours} heures par semaine, en moyenne annuelle. La durée concrète est celle du convenio ou du contrat, dans cette limite. Une proposition de journée à 37,5 heures n'est pas, au ${ES_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}, une règle déjà publiée au BOE.`,
        },
        {
          type: "paragraph",
          text: "Il faut distinguer le maximum légal, la durée conventionnelle, le temps plein comparable dans l'entreprise et la répartition réelle du travail. Le SMI de l'article 1 du décret s'entend pour la journée légale de l'activité. Un équivalent horaire unique pour tous les salariés n'est pas publié comme tel.",
        },
        {
          type: "callout",
          variant: "legal",
          paragraphs: [
            `Cette page n'affiche pas de « SMI horaire universel ». Diviser ${L.fourteenMonthly} par une moyenne d'heures mensuelles oublierait les gratifications extraordinaires. Le taux de ${L.domesticHourly} brut par heure effective concerne l'emploi à domicile payé à l'heure, dans le régime visé, pas l'ensemble des salariés.`,
          ],
        },
        {
          type: "paragraph",
          text: `À temps partiel, l'article 12 du statut retient une durée inférieure à celle d'un salarié à temps plein comparable. S'il n'y en a pas dans l'entreprise, on prend la journée à temps plein de la convention ou, à défaut, le maximum légal. Les droits de nature quantitative se reconnaissent en proportion du temps travaillé. Il n'existe pas de minimum français de 24 heures.`,
        },
        {
          type: "table",
          caption: `Exemple pédagogique : ${ES_PART_TIME_EXAMPLE_HOURS} h par semaine, si le temps plein comparable est de ${ES_PART_TIME_EXAMPLE_FULL_TIME_HOURS} h, année complète, référence SMI, montants bruts.`,
          headers: ["Mode de versement", "Montant brut", "Nombre de versements", "Total annuel"],
          stackOnMobile: true,
          rowHeader: true,
          rows: [
            ["14 versements", L.partTimeFourteen, "14", L.partTimeAnnual],
            ["12 versements, gratifications proratisées", L.partTimeTwelve, "12", L.partTimeAnnual],
          ],
        },
        {
          type: "paragraph",
          text: `Ces trois lectures désignent la même situation : un mi-temps d'un régime à ${ES_PART_TIME_EXAMPLE_FULL_TIME_HOURS} heures. Si le temps plein conventionnel est différent, 20 heures ne sont plus un mi-temps et les montants changent. La convention peut aussi prévoir un barème supérieur.`,
        },
      ],
    },
    {
      id: "cas-particuliers",
      title: "Emploi à domicile et contrats particuliers",
      blocks: [
        {
          type: "paragraph",
          text: `L'article 4.1 du décret vise les contrats à durée déterminée dont les services à une même entreprise n'excèdent pas ${ES_SMI_SHORT_CONTRACT_MAX_DAYS} jours. Ces personnes perçoivent, avec le SMI de l'article 1, la part des dimanches et fêtes ainsi que des deux gratifications extraordinaires, sans que le salaire professionnel puisse être inférieur à ${L.shortContractDaily} par journée légale dans l'activité. Ce montant journalier spécial ne s'applique pas à tous les CDD.`,
        },
        {
          type: "paragraph",
          text: "Pour les congés, le même article distingue deux cas. S'il n'y a pas de coïncidence entre la période de congés et la durée du contrat, la part du SMI correspondant aux congés légaux minimaux se verse avec le salaire. Dans les autres cas, la rémunération des congés suit l'article 38 du statut.",
        },
        {
          type: "paragraph",
          text: `L'article 4.2, qui renvoie au Real Decreto 1620/2011 sur la relation spéciale de service au foyer familial, fixe à ${L.domesticHourly} brut par heure effectivement travaillée le minimum des employées et employés de maison payés à l'heure, en régime externe. Ce taux inclut tous les éléments de rémunération. Comme pour le SMI général, seule la rémunération en argent entre dans le compte : l'avantage en nature ne peut pas minorer cette somme.`,
        },
        {
          type: "callout",
          variant: "verify",
          paragraphs: [
            `${L.domesticHourly} n'est pas le salaire horaire minimum de tous les salariés espagnols. Un salarié payé au mois, dans un autre secteur, se réfère d'abord au SMI de ${L.fourteenMonthly} sur 14 versements, ou à sa convention.`,
          ],
        },
      ],
    },
    {
      id: "jeunes",
      title: "Jeunes, étudiants et formation",
      blocks: [
        {
          type: "paragraph",
          text: `Le SMI 2026 ne distingue pas l'âge. Il n'existe pas d'abattement « étudiant » calqué sur un barème belge. En revanche, l'accès au travail reste encadré : l'article 6 du statut interdit, en principe, l'admission au travail des moins de 16 ans, hors autorisation exceptionnelle pour certains spectacles. Les 16-17 ans peuvent travailler dans les conditions prévues, avec des limites de durée, de nuit et d'heures supplémentaires.`,
        },
        {
          type: "paragraph",
          text: "Un stage n'est pas automatiquement un contrat de travail. Les pratiques universitaires ou de formation professionnelle suivent leur régime propre. Dès qu'il y a contrat de travail, le SMI, éventuellement proratisé selon le temps de travail effectif, et le convenio applicable servent de plancher.",
        },
        {
          type: "paragraph",
          text: "Le contrat formatif de l'article 11 du statut a deux modalités principales. Pour la formation en alternance, la rémunération est celle de la convention ; à défaut, elle ne peut pas être inférieure à 60 % la première année ni à 75 % la deuxième, par rapport au groupe professionnel correspondant, au prorata du temps de travail effectif. Dans tous les cas, elle ne peut pas être inférieure au SMI au prorata de ce temps. Pour le contrat visant la pratique professionnelle, la rémunération est celle de la convention ou, à défaut, du groupe correspondant, sans descendre sous le plancher de l'alternance ni sous le SMI proratisé.",
        },
      ],
    },
    {
      id: "salaire-net",
      title: "Quel salaire net ?",
      blocks: [
        {
          type: "paragraph",
          text: "Il n'existe pas de salaire minimum net unique en Espagne. Le brut du SMI est diminué des cotisations à la charge de la personne salariée, puis, le cas échéant, d'une retenue d'IRPF. Le résultat dépend du type de contrat, de la situation personnelle, d'autres revenus éventuels et du rythme de 12 ou 14 versements. Le convertisseur français de ce site ne s'applique pas à une paie espagnole.",
        },
        {
          type: "paragraph",
          text: `Pour 2026, l'Orden PJC/297/2026 retient, à la charge du salarié, ${ES_SS_WORKER_CC_LABEL} au titre des contingences communes, ${ES_SS_WORKER_UNEMP_INDEF_LABEL} au titre du chômage pour un contrat indéfini (${ES_SS_WORKER_UNEMP_TEMP_LABEL} pour un contrat à durée déterminée visé), ${ES_SS_WORKER_FP_LABEL} pour la formation professionnelle et ${ES_SS_WORKER_MEI_LABEL} pour le mécanisme d'équité intergénérationnelle (MEI). Au total, cela représente environ ${L.ssIndef} sur un contrat indéfini et ${L.ssTemp} sur un CDD concerné, avant toute autre cotisation particulière.`,
        },
        {
          type: "paragraph",
          text: `Ces taux s'appliquent aux bases de cotisation correspondantes, qui intègrent notamment la part proratisée des gratifications extraordinaires, même lorsqu'elles sont versées séparément. Ils ne permettent donc pas de calculer chaque versement net en appliquant simplement un pourcentage à ${L.fourteenMonthly}.`,
        },
        {
          type: "paragraph",
          text: `Sur l'impôt, le communiqué du Conseil des ministres présente le SMI comme « sans imposition ». Le texte applicable est plus précis. L'article 28 du Real Decreto-ley 5/2026, avec effets au ${ES_SMI_EFFECTS_FROM_LABEL}, réécrit la disposition additionnelle 61ª de la loi 35/2006. Il prévoit une déduction d'IRPF pour certains bas revenus du travail, sous conditions. Ce n'est pas une exonération universelle.`,
        },
        {
          type: "paragraph",
          text: `Les contribuables dont les revenus du travail d'une relation de travail ou statutaire n'excèdent pas ${L.irpfPhaseOut} par an, et qui n'ont pas d'autres revenus non exemptés supérieurs à ${L.irpfOtherIncome}, peuvent appliquer une déduction de ${L.irpfDeduction} si ces revenus du travail n'excèdent pas ${L.annual}. Au-delà, la déduction diminue progressivement.`,
        },
        {
          type: "callout",
          variant: "vigilance",
          paragraphs: [
            "Cette déduction peut conduire à une cotisation d'IRPF nulle pour une personne au SMI, sous conditions. Elle ne signifie pas que le brut égale le net, ni l'absence de cotisations sociales, ni l'absence de toute déclaration, ni une exonération inconditionnelle en présence d'autres revenus. La retenue sur le bulletin et l'impôt finalement dû à la déclaration peuvent aussi différer.",
          ],
        },
        {
          type: "paragraph",
          text: "Pour comprendre les règles fiscales applicables, consultez les outils d'information de l'Agencia Tributaria. L'Informador de Renta répond à des questions fiscales ; il ne calcule pas une fiche de paie ni un salaire net personnalisé.",
        },
        {
          type: "list",
          items: [
            {
              text: "Informador de Renta.",
              href: S.aeatInformador.href,
              label: S.aeatInformador.org,
            },
            {
              text: "Bases et types de cotisation.",
              href: S.ssCotizacion.href,
              label: S.ssCotizacion.org,
            },
          ],
        },
      ],
    },
    {
      id: "frontaliers",
      title: "Salariés français et frontaliers",
      blocks: [
        {
          type: "paragraph",
          text: "La nationalité française ne crée pas de barème salarial distinct. Un salarié occupé en Espagne relève du droit du travail applicable à cet emploi, du SMI ou de la convention collective, des cotisations espagnoles si c'est le régime d'affiliation, et de règles fiscales qui peuvent être celles de l'Espagne, de la France ou des deux, selon la résidence et la convention.",
        },
        {
          type: "paragraph",
          text: "Droit du travail, cotisations et fiscalité sont trois questions distinctes. Tous les salariés français en Espagne ne sont pas des travailleurs détachés. Le détachement a un régime propre, limité, qui ne s'improvise pas à partir de la seule nationalité.",
        },
        {
          type: "paragraph",
          text: "La convention fiscale franco-espagnole de 1995 maintient un régime de travailleurs frontaliers, précisé par le protocole et par l'accord complémentaire. Selon impots.gouv.fr, la zone frontalière correspond en principe à une profondeur de 20 kilomètres de part et d'autre de la frontière. Les personnes qui justifient de la qualité de frontalier par la carte prévue ne sont imposables, sur ces traitements et salaires, que dans l'État de résidence. Habiter en France et travailler en Espagne ne suffit donc pas, à soi seul, à fixer le pays d'imposition.",
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Cette page n'étend pas le sujet au télétravail, aux indépendants ni à l'ensemble des traitements publics. Pour l'impôt, vérifiez votre résidence fiscale et, le cas échéant, le régime frontalier auprès des administrations compétentes.",
          ],
        },
        {
          type: "list",
          items: [
            {
              text: "Fiche « Suis-je un travailleur frontalier ? ».",
              href: S.impotsFrontalier.href,
              label: S.impotsFrontalier.org,
            },
            {
              text: "Convention fiscale France-Espagne.",
              href: S.bofipEsp.href,
              label: S.bofipEsp.org,
            },
          ],
        },
      ],
    },
    {
      id: "evolution",
      title: "Hausse 2026 et prochaines évolutions",
      blocks: [
        {
          type: "paragraph",
          text: `Par rapport au Real Decreto 87/2025, le SMI 2026 augmente de ${L.increasePercent}. Le versement mensuel de référence passe de ${L.previousFourteen} à ${L.fourteenMonthly} brut, soit ${L.increasePerPayment} de plus sur 14 échéances, et ${L.increaseAnnual} de plus sur l'année, jusqu'à ${L.annual}.`,
        },
        {
          type: "table",
          caption: "SMI brut de référence à temps plein, 14 versements.",
          headers: ["Période", "Par versement", "Total annuel"],
          stackOnMobile: true,
          rowHeader: true,
          rows: [
            ["2025 (RD 87/2025)", L.previousFourteen, L.previousAnnual],
            ["2026 (RD 126/2026)", L.fourteenMonthly, L.annual],
          ],
        },
        {
          type: "paragraph",
          text: `Aucune hausse 2027 n'est applicable au ${ES_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}. Une proposition, un accord politique ou un calendrier ne remplacent pas un décret publié. Le SMI 2027 dépendra du texte qui sera adopté, après consultation des organisations syndicales et patronales les plus représentatives.`,
        },
      ],
    },
    {
      id: "comparaison-france",
      title: "Comparaison avec la France",
      blocks: [
        {
          type: "paragraph",
          text: `Le SMIC français actuellement retenu sur ce site est de ${L.frHourly} brut de l'heure, soit ${L.frMonthly35} brut par mois à 35 heures, depuis le ${ES_COMPARE_FR_FROM_LABEL} (fiche Service-Public F2300). L'annuel correspondant est de ${L.frAnnual} brut.`,
        },
        {
          type: "paragraph",
          text: `Comparer ${L.fourteenMonthly} sur 14 versements au SMIC mensuel français sur 12 mois n'a pas de sens sans ramener les deux à une même base. Sur l'année, le SMI espagnol de référence (${L.annual}) est inférieur d'environ ${L.annualPctVsFr} au SMIC français annuel. Sur 12 mois, l'équivalent espagnol de ${L.twelveMonthly} se compare à ${L.frMonthly35}, soit un écart d'environ ${L.twelvePctVsFr}. Ces pourcentages portent sur le brut. Ils ne disent rien du net ni du pouvoir d'achat.`,
        },
        {
          type: "paragraph",
          text: `Les durées de travail de référence diffèrent aussi : 35 heures en France pour le mensuel du SMIC, ${L.weeklyHours} heures au maximum légal espagnol, sous réserve d'une durée conventionnelle plus courte. Un salarié à 40 heures et un salarié à 35 heures ne correspondent pas à la même durée de travail.`,
        },
        {
          type: "paragraph",
          text: `Eurostat publie ${L.eurostatMonthly} brut par mois au ${ES_EUROSTAT_PERIOD_LABEL} (jeu ${ES_EUROSTAT_DATASET}, semestre ${ES_EUROSTAT_PERIOD}). Ce chiffre mensualise les versements supplémentaires : ${L.fourteenMonthly} × 14 ÷ 12 = ${L.twelveMonthly}, arrondi à l'euro. Ce n'est donc pas le montant d'une seule fiche de paie à 14 versements, et ce n'est pas un calcul personnel de cette page.`,
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
          label: "Consulter le guide du salaire minimum en Belgique",
          href: BE_HREF,
        },
      ],
    },
    {
      id: "verifier",
      title: "Comment vérifier sa paie et à qui s'adresser ?",
      blocks: [
        {
          type: "paragraph",
          text: "Avant de contester un bulletin, identifiez le profil (temps plein ou partiel, nombre de versements, CDD court, emploi à domicile), le convenio applicable, la classification du poste et la date du barème. Un salaire de base inférieur au SMI n'est pas, à lui seul, toujours irrégulier, mais il justifie de demander le détail du calcul annuel.",
        },
        {
          type: "list",
          items: [
            {
              text: "Texte du SMI 2026.",
              href: S.rd126.href,
              label: S.rd126.org,
            },
            {
              text: "Registre des conventions collectives.",
              href: S.regconConsulta.href,
              label: "REGCON",
            },
            {
              text: "Droits salariaux et démarche en cas de rémunération insuffisante.",
              href: S.oeitss.href,
              label: S.oeitss.org,
            },
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Demandez d'abord une explication à l'employeur. L'Inspection du travail et de la sécurité sociale (ITSS) peut recevoir une dénonciation ; l'origine est traitée comme confidentielle selon l'information publiée par l'OEITSS. Cette page ne fournit pas de conseil juridique personnalisé.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: "Quel est le salaire minimum actuel en Espagne ?",
      answer: `Depuis le ${ES_SMI_EFFECTS_FROM_LABEL}, le salario mínimo interprofesional (SMI) est de ${L.fourteenMonthly} brut par versement pour un temps plein, sur 14 échéances, soit ${L.annual} brut par an. Lorsque le salaire est fixé au jour, le décret retient ${L.daily} brut, hors part des dimanches et fêtes.`,
    },
    {
      question: "Quel est le SMIC espagnol sur 12 mois ?",
      answer: `Si les deux gratifications extraordinaires sont proratisées sur 12 mensualités, l'équivalent du SMI est de ${L.twelveMonthly} brut par mois. Le total annuel reste ${L.annual}. Ce mode de versement dépend notamment de la convention collective, ce n'est pas un second SMI.`,
    },
    {
      question: "Pourquoi parle-t-on de 14 versements ?",
      answer:
        "L'article 31 du statut reconnaît deux gratifications extraordinaires par an, en plus des 12 mensualités. On compte donc 14 paies. Cela ne signifie pas que l'on travaille 14 mois. La convention peut prévoir de les proratiser sur 12 versements.",
    },
    {
      question: "Quel est le minimum annuel ?",
      answer: `Le décret 126/2026 retient un plancher annuel de ${L.annual} brut à temps plein. C'est le terme de comparaison pour la compensation et l'absorption. Ce total ne permet pas de différer librement les salaires dus chaque mois.`,
    },
    {
      question: "Existe-t-il un minimum horaire unique ?",
      answer: `Non. Le SMI général est mensuel ou journalier. ${L.domesticHourly} brut par heure effective concerne l'emploi à domicile payé à l'heure, en régime externe. Ce n'est pas le salaire horaire minimum de tous les salariés en Espagne.`,
    },
    {
      question: "Quel montant pour un mi-temps ?",
      answer: `Le SMI se proratise selon le temps plein comparable. Exemple pédagogique : ${ES_PART_TIME_EXAMPLE_HOURS} h sur ${ES_PART_TIME_EXAMPLE_FULL_TIME_HOURS} h, année complète, référence SMI, soit ${L.partTimeFourteen} brut par versement sur 14 échéances, ou ${L.partTimeTwelve} sur 12, et ${L.partTimeAnnual} brut par an. Si le temps plein conventionnel n'est pas de 40 h, 20 h n'est plus un mi-temps.`,
    },
    {
      question: "Le salaire de base doit-il toujours égaler le SMI ?",
      answer: `Pas nécessairement chaque mois, ni pour chaque ligne du bulletin. Le décret compare surtout l'ensemble des salaires professionnels sur une base annuelle, sans descendre sous ${L.annual} à temps plein, et les compléments suivent la convention. À l'inverse, toutes les primes ne sont pas absorbables sans regarder le texte applicable.`,
    },
    {
      question: "Quel minimum pour un salarié à domicile ?",
      answer: `Pour l'emploi à domicile payé à l'heure, en régime externe, le décret fixe ${L.domesticHourly} brut par heure effectivement travaillée, tous éléments de rémunération inclus. Un salarié de ce régime payé au mois se réfère d'abord au SMI général, au prorata de sa durée de travail.`,
    },
    {
      question: "Le SMI est-il brut ou net ?",
      answer: `Le SMI est un montant brut. Pour un salarié du régime général sous contrat à durée indéterminée, hors situations particulières, les cotisations salariales 2026 représentent environ ${L.ssIndef}, avant IRPF. Une déduction d'impôt peut, sous conditions, annuler l'IRPF d'une personne au SMI. Cela n'égale pas brut et net.`,
    },
    {
      question: "Un étudiant a-t-il un minimum réduit ?",
      answer:
        "Non : le SMI 2026 ne prévoit pas de taux réduit selon l'âge. Un contrat de travail étudiant se proratise selon le temps de travail. Un stage n'est pas forcément un emploi salarié. Les contrats formatifs ont des règles propres, sans descendre sous le SMI au prorata du temps de travail effectif.",
    },
    {
      question: "Le SMI diffère-t-il selon la région ?",
      answer:
        "Non : il n'existe pas de SMI légal général distinct pour Madrid, Barcelone, la Catalogne ou les Canaries. Une convention collective provinciale ou autonome peut prévoir un barème plus élevé, ce qui n'en fait pas un salaire minimum national régional.",
    },
    {
      question: "Que faire si ma paie paraît insuffisante ?",
      answer: `Vérifiez le nombre de versements, le temps de travail, le convenio et la date du barème. Demandez le détail à l'employeur. L'Inspection du travail peut être saisie ; l'OEITSS décrit la démarche. Le décret 126/2026 et REGCON sont les textes et le registre de référence.`,
    },
  ],
  conclusion: {
    title: "À retenir",
    keyPoints: [
      `Depuis le ${ES_SMI_EFFECTS_FROM_LABEL} : ${L.fourteenMonthly} brut par versement sur 14 échéances, ou ${L.twelveMonthly} sur 12, pour un temps plein à la référence SMI.`,
      `Le total annuel de ${L.annual} brut est le même dans les deux lectures. On ne travaille pas 14 mois.`,
      "Le SMI est brut, national, sans distinction d'âge. La convention collective peut être plus favorable, sans créer un SMI régional.",
      "Il n'existe pas de net unique, ni de taux horaire universel, ni de hausse 2027 déjà applicable.",
    ],
    closingText:
      "Pour comparer l'Espagne aux autres pays européens ou approfondir le SMIC français, utilisez les guides liés ci-dessous.",
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
          title: "Salaire minimum en Belgique",
          description: "RMMMG, barèmes de commission paritaire et règles.",
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
        text: `Sources consultées le ${ES_MIN_WAGE_SOURCES_VERIFIED_AT_LABEL}. Les montants 2026 reprennent le Real Decreto 126/2026. Les règles de salaire, de SMI, de paiement, de gratifications, de temps partiel et de durée du travail reprennent l'Estatuto de los Trabajadores. Les cotisations reprennent l'Orden PJC/297/2026. La déduction IRPF reprend l'article 28 du Real Decreto-ley 5/2026. Le SMIC français reprend Service-Public F2300. Eurostat (${ES_EUROSTAT_DATASET}, ${ES_EUROSTAT_PERIOD}) publie ${L.eurostatMonthly} au ${ES_EUROSTAT_PERIOD_LABEL}, mensualisation distincte du versement à 14 paies.`,
      },
      {
        type: "list",
        items: [
          {
            text: `${S.rd126.label}.`,
            href: S.rd126.href,
            label: S.rd126.org,
          },
          {
            text: `${S.estatuto.label}.`,
            href: S.estatuto.href,
            label: S.estatuto.org,
          },
          {
            text: `${S.rd87.label}.`,
            href: S.rd87.href,
            label: S.rd87.org,
          },
          {
            text: `${S.mitesPress.label}.`,
            href: S.mitesPress.href,
            label: S.mitesPress.org,
          },
          {
            text: `${S.oeitss.label}.`,
            href: S.oeitss.href,
            label: S.oeitss.org,
          },
          {
            text: `${S.regcon.label}.`,
            href: S.regcon.href,
            label: S.regcon.org,
          },
          {
            text: `${S.ordenCotizacion.label}.`,
            href: S.ordenCotizacion.href,
            label: S.ordenCotizacion.org,
          },
          {
            text: `${S.ssCotizacion.label}.`,
            href: S.ssCotizacion.href,
            label: S.ssCotizacion.org,
          },
          {
            text: `${S.rdl5.label}.`,
            href: S.rdl5.href,
            label: S.rdl5.org,
          },
          {
            text: `${S.haciendaPress.label}.`,
            href: S.haciendaPress.href,
            label: S.haciendaPress.org,
          },
          {
            text: `${S.aeatInformador.label}.`,
            href: S.aeatInformador.href,
            label: S.aeatInformador.org,
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
          {
            text: `${S.impotsFrontalier.label}.`,
            href: S.impotsFrontalier.href,
            label: S.impotsFrontalier.org,
          },
          {
            text: `${S.bofipEsp.label}.`,
            href: S.bofipEsp.href,
            label: S.bofipEsp.org,
          },
          {
            text: `${S.jornadaGob.label}.`,
            href: S.jornadaGob.href,
            label: S.jornadaGob.org,
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
      { title: "Salaire minimum au Luxembourg", href: LU_HREF },
      { title: "Salaire minimum en Belgique", href: BE_HREF },
    ],
    relatedSimulator: {
      title: "Fiche Espagne (Europe)",
      description: "Fiche Espagne et contexte européen.",
      href: SMIC_EUROPE_ES_HREF,
    },
  },
};
