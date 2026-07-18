/** Contenu éditorial visible du hub /nos-outils (hors métadonnées SEO). */

import type { FaqItem } from "@/framework/types";

export const TOOLS_HUB_PAGE_H1 = "Nos outils de simulation salariale";

export const TOOLS_HUB_PAGE_SUBTITLE =
  "Découvrez nos simulateurs gratuits pour estimer votre salaire net, mesurer l'impact d'une augmentation ou comparer différents scénarios de rémunération. Nos outils sont simples, rapides et mis à jour selon la réglementation française.";

export const TOOLS_HUB_TOOLS_SECTION_TITLE =
  "Choisissez le simulateur adapté à votre situation";

export const TOOLS_HUB_TOOLS_SECTION_INTRO =
  "Que vous souhaitiez estimer votre salaire net, calculer vos heures supplémentaires, mesurer l'impact d'une augmentation ou anticiper une indemnité de licenciement, sélectionnez simplement le simulateur correspondant à votre besoin.";

export const TOOL_HUB_TEASERS: Record<string, string> = {
  "brut-vers-net":
    "Estimez votre salaire net à partir de votre salaire brut, selon votre profil et votre temps de travail.",
  "augmentation-salaire":
    "Mesurez ce qu'une augmentation brute représente réellement en net, chaque mois et sur une année.",
  "salaire-heures-supplementaires":
    "Calculez le brut et le net de vos heures supplémentaires, puis votre nouveau salaire mensuel.",
  "indemnite-licenciement":
    "Estimez le montant minimal de l'indemnité légale selon votre salaire de référence et votre ancienneté.",
};

export function getToolHubTeaser(id: string): string | undefined {
  return TOOL_HUB_TEASERS[id];
}

/** Libellés CTA des cartes (flèche ajoutée dans le composant). */
export const TOOL_HUB_CTAS: Record<string, string> = {
  "brut-vers-net": "Calculer votre salaire net",
  "augmentation-salaire": "Simuler votre augmentation",
  "salaire-heures-supplementaires": "Calculer vos heures supplémentaires",
  "indemnite-licenciement": "Calculer votre indemnité",
};

export function getToolHubCta(id: string): string {
  return TOOL_HUB_CTAS[id] ?? "Ouvrir l'outil";
}

export const TOOL_HUB_REASSURANCE = [
  "Gratuit",
  "Sans inscription",
  "Calcul instantané",
] as const;

export const TOOL_HUB_FAQ: FaqItem[] = [
  {
    question: "Les simulateurs sont-ils gratuits ?",
    answer:
      "Oui. Tous les outils proposés sur Brut-vers-Net.fr sont accessibles gratuitement et sans création de compte.",
  },
  {
    question: "Les résultats sont-ils exacts ?",
    answer:
      "Les résultats sont des estimations calculées à partir des informations saisies et des principales règles françaises. Ils peuvent différer d'une fiche de paie réelle selon la convention collective, les avantages, les primes ou la situation personnelle.",
  },
  {
    question: "Mes données sont-elles enregistrées ?",
    answer:
      "Les calculateurs fonctionnent localement dans votre navigateur : les montants saisis servent à produire la simulation et ne sont pas envoyés à un serveur à cette fin. Des cookies de mesure d'audience peuvent toutefois être déposés si vous les acceptez, conformément à notre politique de confidentialité.",
  },
  {
    question: "Quel simulateur choisir ?",
    answer:
      "Utilisez le calculateur brut-net pour convertir un salaire, le simulateur d'augmentation pour comparer une nouvelle rémunération, le calculateur d'heures supplémentaires pour estimer leur impact et le simulateur d'indemnité de licenciement pour obtenir une première estimation.",
  },
];

export const TOOL_PICKER = [] as const;
export const TOOL_HUB_BENEFITS = [] as const;
export const TOOL_MATCH_ROWS = [] as const;
export const TOOL_HUB_GUIDE_LINKS = [] as const;
export const TOOL_HUB_ERRORS = [] as const;
export const TOOL_HUB_CALCULATIONS = [] as const;
