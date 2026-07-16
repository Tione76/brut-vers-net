/** Données éditoriales du hub /nos-outils (provisoire Brut vers Net) */

export const TOOL_HUB_TEASERS: Record<string, string> = {
  "brut-vers-net":
    "Estimez prochainement votre salaire net à partir de votre salaire brut.",
  "augmentation-salaire":
    "Estimez ce que votre augmentation brute représente réellement en net chaque mois et sur une année.",
  "salaire-heures-supplementaires":
    "Estimez le brut et le net de vos heures supplémentaires, puis votre nouveau salaire mensuel.",
};

export function getToolHubTeaser(id: string): string | undefined {
  return TOOL_HUB_TEASERS[id];
}

export const TOOL_HUB_REASSURANCE = [
  "Gratuit",
  "Sans inscription",
  "Calcul instantané",
] as const;

export const TOOL_PICKER = [] as const;
export const TOOL_HUB_BENEFITS = [] as const;
export const TOOL_MATCH_ROWS = [] as const;
export const TOOL_HUB_GUIDE_LINKS = [] as const;
export const TOOL_HUB_ERRORS = [] as const;
export const TOOL_HUB_CALCULATIONS = [] as const;

export interface ToolsHubFaqItem {
  question: string;
  answer: string;
}

export const TOOL_HUB_FAQ: ToolsHubFaqItem[] = [];
