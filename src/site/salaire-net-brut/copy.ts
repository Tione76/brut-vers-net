import { formatCurrency } from "@/site/salary-calculator/parsing";

export interface ProfileEstimateForCopy {
  coefficient: number;
  grossMonthly: number;
  grossAnnual: number;
  grossHourly: number;
  monthlyHours: number;
}

export interface ProfileSectionCopy {
  title: string;
  paragraphs: string[];
}

export interface PageCopyVariant {
  /** Phrase d'accroche sous le fil d'Ariane, avant le bloc réponse. */
  intro: string;
  /** Sous-titre du hero (GuidePageLayout). */
  subtitle: string;
  /** Intro courte au-dessus du tableau. */
  tableIntro: string;
  nonExecutive: ProfileSectionCopy;
  executive: ProfileSectionCopy;
  publicService: ProfileSectionCopy;
}

function pctFromCoefficient(coefficient: number): string {
  return `${Math.round((1 - coefficient) * 100)}`;
}

/**
 * Quatre variantes de formulation.
 * L'index dans la série détermine la variante (rotation).
 * Les montants restent calculés ; seuls le ton et les exemples changent.
 */
function buildVariants(
  netLabel: string,
  nonCadre: ProfileEstimateForCopy,
  cadre: ProfileEstimateForCopy,
  publicService: ProfileEstimateForCopy,
): PageCopyVariant[] {
  const nonCadrePct = pctFromCoefficient(nonCadre.coefficient);
  const cadrePct = pctFromCoefficient(cadre.coefficient);
  const publicPct = pctFromCoefficient(publicService.coefficient);
  const nonCadreGross = formatCurrency(nonCadre.grossMonthly);
  const cadreGross = formatCurrency(cadre.grossMonthly);
  const publicGross = formatCurrency(publicService.grossMonthly);
  const nonCadreHourly = formatCurrency(nonCadre.grossHourly);
  const cadreAnnual = formatCurrency(cadre.grossAnnual);
  const publicAnnual = formatCurrency(publicService.grossAnnual);
  const hours = nonCadre.monthlyHours.toLocaleString("fr-FR");

  return [
    {
      intro: `Vous visez environ ${netLabel} nets par mois. Voici l'ordre de grandeur du brut selon votre statut, avant prélèvement à la source.`,
      subtitle: `Estimation du salaire brut pour atteindre environ ${netLabel} nets mensuels.`,
      tableIntro: `Comparaison rapide autour de ${netLabel} nets : brut mensuel estimé selon le profil.`,
      nonExecutive: {
        title: "Salaire non-cadre",
        paragraphs: [
          `Dans le privé, un salarié non-cadre reverse en moyenne près de ${nonCadrePct} % de cotisations salariales. Pour approcher ${netLabel} nets, le brut mensuel se situe donc autour de ${nonCadreGross}.`,
          `Ce chiffre sert surtout à cadrer une offre ou un entretien. À temps plein, cela représente environ ${nonCadreHourly} brut de l'heure sur une base de ${hours} heures par mois.`,
          `Primes, mutuelle ou temps partiel peuvent écarter le résultat de cette moyenne. Le bulletin reste la référence.`,
        ],
      },
      executive: {
        title: "Salaire cadre",
        paragraphs: [
          `Le statut cadre entraîne en général des cotisations plus élevées, souvent autour de ${cadrePct} %. À net égal, le brut demandé monte : comptez près de ${cadreGross} pour viser ${netLabel} nets.`,
          `Sur une année à 12 mois, l'équivalent se situe vers ${cadreAnnual} bruts. Utile pour comparer une rémunération annuelle annoncée « cadre ».`,
          `Les régimes de retraite complémentaire et les accords d'entreprise font varier ce ratio. Traitez ce montant comme un repère, pas comme une promesse de fiche de paie.`,
        ],
      },
      publicService: {
        title: "Fonction publique",
        paragraphs: [
          `Chez un agent public, les retenues salariales sont souvent un peu plus faibles que dans le privé non-cadre, de l'ordre de ${publicPct} % en moyenne simplifiée. Pour ${netLabel} nets, le brut estimé tourne autour de ${publicGross}.`,
          `L'annuel correspondant (12 mois) approche ${publicAnnual}. Les indemnités et régimes particuliers (hospitalier, territorial, État) peuvent modifier nettement le résultat.`,
          `Cette estimation ignore les primes spécifiques. Pour un calcul plus proche de votre grille, utilisez le simulateur en choisissant le profil Fonction publique.`,
        ],
      },
    },
    {
      intro: `Combien faut-il gagner en brut pour toucher ${netLabel} net ? La réponse dépend surtout du statut. Les trois estimations ci-dessous donnent un premier ordre de grandeur.`,
      subtitle: `Repères brut mensuel, annuel et horaire pour ${netLabel} nets, selon le profil.`,
      tableIntro: `Autour de ${netLabel} nets, le brut évolue linéairement avec le coefficient de chaque statut.`,
      nonExecutive: {
        title: "Salaire non-cadre",
        paragraphs: [
          `Le cas le plus fréquent reste le salarié non-cadre. Avec un taux de cotisations salariales d'environ ${nonCadrePct} %, ${netLabel} nets correspondent à près de ${nonCadreGross} bruts mensuels.`,
          `Exemple simple : si une annonce affiche un brut proche de ce montant, le net avant impôt devrait se rapprocher de votre cible, hors cas particuliers.`,
          `Le prélèvement à la source n'est pas inclus ici. Il dépend de votre foyer et peut encore réduire le versé.`,
        ],
      },
      executive: {
        title: "Salaire cadre",
        paragraphs: [
          `Pour un cadre, la part salariale des cotisations est en moyenne plus lourde (environ ${cadrePct} %). Il faut donc viser un brut plus haut, autour de ${cadreGross}, pour le même net d'environ ${netLabel}.`,
          `C'est l'écart à garder en tête lors d'une négociation : à net souhaité égal, le package cadre part d'une base brute plus élevée.`,
          `Comparez toujours brut avec brut, et net avant impôt avec net avant impôt, pour éviter les malentendus.`,
        ],
      },
      publicService: {
        title: "Fonction publique",
        paragraphs: [
          `En fonction publique, le passage du brut au net suit d'autres règles de retenues. Notre estimation simplifiée place le brut près de ${publicGross} pour environ ${netLabel} nets.`,
          `Les éléments de rémunération (indemnité de résidence, NBI, heures supplémentaires) ne sont pas reproduits ligne à ligne.`,
          `Servez-vous de ce chiffre pour situer une rémunération indiciaire, puis affinez avec le calculateur si votre situation est atypique.`,
        ],
      },
    },
    {
      intro: `Pour ${netLabel} nets mensuels, le brut n'est pas unique. Privé non-cadre, cadre ou agent public : chaque profil a son propre ordre de grandeur.`,
      subtitle: `Trois estimations du brut pour un net d'environ ${netLabel} par mois.`,
      tableIntro: `Tableau indicatif : brut mensuel estimé pour des nets proches de ${netLabel}.`,
      nonExecutive: {
        title: "Salaire non-cadre",
        paragraphs: [
          `Avec un coefficient indicatif de ${(nonCadre.coefficient * 100).toFixed(0)} % (soit environ ${nonCadrePct} % de cotisations), le brut mensuel pour ${netLabel} nets s'établit autour de ${nonCadreGross}.`,
          `Traduction concrète : sur une base temps plein, le taux horaire brut associé est d'environ ${nonCadreHourly}.`,
          `Ce n'est pas un calcul Urssaf personnalisé. C'est une moyenne lisible pour décider vite si une offre est dans la bonne fourchette.`,
        ],
      },
      executive: {
        title: "Salaire cadre",
        paragraphs: [
          `Le profil cadre utilise un coefficient plus bas (${(cadre.coefficient * 100).toFixed(0)} %), donc un brut plus élevé : environ ${cadreGross} pour le même net.`,
          `En annuel sur 12 mois, cela donne près de ${cadreAnnual}. Pratique pour lire une proposition exprimée en package annuel.`,
          `Si votre convention prévoit des cotisations différentes, écartez-vous de cette moyenne et simulez votre cas.`,
        ],
      },
      publicService: {
        title: "Fonction publique",
        paragraphs: [
          `Pour un agent public, l'estimation retient un brut d'environ ${publicGross} afin d'approcher ${netLabel} nets avant impôt.`,
          `L'équivalent annuel indicatif est de ${publicAnnual}. Les régimes de retraite et de cotisation varient selon le versant.`,
          `Gardez ce montant comme point de départ, surtout si vous comparez une offre privée et une grille publique.`,
        ],
      },
    },
    {
      intro: `Objectif : ${netLabel} nets. Ci-dessous, le brut estimé pour trois situations courantes, calculé avec les mêmes coefficients que le simulateur Brut vers Net.`,
      subtitle: `Salaire brut estimé pour toucher environ ${netLabel} nets, avant prélèvement à la source.`,
      tableIntro: `Repères autour de ${netLabel} : non-cadre, cadre et fonction publique côte à côte.`,
      nonExecutive: {
        title: "Salaire non-cadre",
        paragraphs: [
          `Pour la majorité des salariés du privé, comptez près de ${nonCadreGross} bruts mensuels pour viser ${netLabel} nets. Cela reflète des cotisations salariales d'environ ${nonCadrePct} %.`,
          `Si l'on raisonne à l'heure, la référence temps plein se situe vers ${nonCadreHourly} brut.`,
          `Ajoutez ensuite votre propre réalité : 13e mois, primes variables ou mi-temps changeront le résultat final.`,
        ],
      },
      executive: {
        title: "Salaire cadre",
        paragraphs: [
          `Un cadre visant le même net devra en général négocier davantage de brut : environ ${cadreGross} mensuels, soit près de ${cadreAnnual} sur 12 mois.`,
          `L'écart avec le non-cadre vient surtout du niveau moyen des cotisations (environ ${cadrePct} %).`,
          `Utilisez cette fourchette pour préparer une discussion salariale, puis validez avec une simulation détaillée.`,
        ],
      },
      publicService: {
        title: "Fonction publique",
        paragraphs: [
          `L'estimation fonction publique place le brut mensuel vers ${publicGross} pour environ ${netLabel} nets.`,
          `C'est souvent un peu moins de brut que dans le privé non-cadre pour un net comparable, en raison de retenues moyennes différentes.`,
          `Les primes et indemnités propres à votre corps ou grade ne sont pas intégrées : affinez dès que vous disposez de votre traitement indiciaire.`,
        ],
      },
    },
  ];
}

export function getPageCopyVariant(
  netLabel: string,
  seriesIndex: number,
  estimates: {
    nonExecutive: ProfileEstimateForCopy;
    executive: ProfileEstimateForCopy;
    publicService: ProfileEstimateForCopy;
  },
): PageCopyVariant {
  const variants = buildVariants(
    netLabel,
    estimates.nonExecutive,
    estimates.executive,
    estimates.publicService,
  );
  const index = seriesIndex >= 0 ? seriesIndex % variants.length : 0;
  return variants[index];
}
