/** Données éditoriales du hub /nos-outils (provisoire Brut vers Net) */

export const TOOL_HUB_TEASERS: Record<string, string> = {
  "brut-vers-net":
    "Estimez prochainement votre salaire net à partir de votre salaire brut.",
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
