/** Métadonnées provisoires page FAQ */
export type FaqAnswerSegment = string | { link: string; href: string };

export const FAQ_PAGE_META = {
  title: "FAQ Brut vers Net",
  description: "FAQ Brut vers Net à venir.",
};

export const FAQ_PAGE_H1 = "FAQ Brut vers Net";
export const FAQ_PAGE_SUBTITLE = "Contenu en cours de rédaction.";
export const FAQ_PAGE_INTRO = "FAQ Brut vers Net à venir.";
export const FAQ_PAGE_UPDATED = "2026-07-13";

export const faqPageCategories: {
  title: string;
  items: { question: string; answer: string }[];
}[] = [];

export function getFaqPageSchemaItems() {
  return faqPageCategories.flatMap((category) => category.items);
}
