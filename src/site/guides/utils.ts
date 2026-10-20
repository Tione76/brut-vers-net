import type { Guide, GuideBlock, GuideTocEntry } from "./types";

const WORDS_PER_MINUTE = 200;

/** Temps de lecture à partir d'un texte libre (même rythme que les guides : ~200 mots/min). */
export function computeReadingTimeFromText(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/**
 * Extrait le texte lisible d'un module TSX/TS éditorial (hors imports, classes et code).
 * Sert aux pages calculateurs dont le contenu n'est pas un Guide structuré.
 */
export function extractReadableTextFromModuleSource(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/(^|[^:])\/\/.*$/gm, "$1 ")
    .replace(/import\s+[\s\S]*?from\s+["'][^"']+["'];?/g, " ")
    .replace(/export\s+(?:type|interface|default)\b/g, " ")
    .replace(/className=(["'`])(?:(?!\1).)*\1/g, " ")
    .replace(/className=\{[\s\S]*?\}/g, " ")
    .replace(/\b(?:id|href|rel|target|aria-[\w-]+|dateTime|key)=(["'`])(?:(?!\1).)*\1/g, " ")
    .replace(/<(?:\/)?[A-Za-z][\w.-]*[^>]*>/g, " ")
    .replace(/\{[^}]*\}/g, " ")
    .replace(/&(?:apos|quot|amp|lt|gt|#\d+);/gi, " ")
    .replace(/["'`]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countWordsInBlock(block: GuideBlock): number {
  switch (block.type) {
    case "paragraph":
      return block.text.split(/\s+/).filter(Boolean).length;
    case "list":
      return block.items
        .map((item) =>
          typeof item === "string" ? item : `${item.text} ${item.label}`,
        )
        .join(" ")
        .split(/\s+/)
        .filter(Boolean).length;
    case "callout":
      return block.paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
    case "table":
      return [...block.headers, ...block.rows.flat()].join(" ").split(/\s+/).filter(Boolean).length;
    case "internal-link":
      return (block.intro ?? block.label).split(/\s+/).filter(Boolean).length;
    case "checklist":
      return block.items.join(" ").split(/\s+/).filter(Boolean).length;
    case "mistakes":
      return block.items.join(" ").split(/\s+/).filter(Boolean).length;
    case "steps":
      return block.items.map((s) => `${s.title} ${s.description}`).join(" ").split(/\s+/).filter(Boolean).length;
    case "illustration":
    case "image-placeholder":
      return 0;
    case "profession-faq":
      return block.items.map((i) => i.answer).join(" ").split(/\s+/).filter(Boolean).length;
    case "contextual-cta":
      return `${block.text} ${block.label}`.split(/\s+/).filter(Boolean).length;
  }
}

/** Calcule le temps de lecture à partir du contenu : ~200 mots/min */
export function computeReadingTime(guide: Guide): number {
  let words = guide.introduction.join(" ").split(/\s+/).filter(Boolean).length;
  if (guide.quickSummary) {
    words += guide.quickSummary.title.split(/\s+/).length;
    words += guide.quickSummary.items
      .map((i) => `${i.rate} ${i.title ?? ""} ${i.description ?? ""}`)
      .join(" ")
      .split(/\s+/).length;
    words += (guide.quickSummary.synthesis ?? []).join(" ").split(/\s+/).filter(Boolean).length;
  }
  words += guide.conclusion.keyPoints.join(" ").split(/\s+/).filter(Boolean).length;
  words += guide.conclusion.closingText.split(/\s+/).filter(Boolean).length;
  words += guide.faq.reduce(
    (acc, item) =>
      acc + item.question.split(/\s+/).length + item.answer.split(/\s+/).length,
    0,
  );

  for (const section of [...guide.sections, ...(guide.bibliography ? [guide.bibliography] : [])]) {
    for (const block of section.blocks ?? []) {
      words += countWordsInBlock(block);
    }
    for (const subsection of section.subsections ?? []) {
      for (const block of subsection.blocks) {
        words += countWordsInBlock(block);
      }
    }
    for (const block of section.closingBlocks ?? []) {
      words += countWordsInBlock(block);
    }
  }

  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** Sommaire H2 uniquement : sections + FAQ + conclusion */
export function buildGuideTocH2(guide: Guide): GuideTocEntry[] {
  const entries: GuideTocEntry[] = guide.sections.map((section) => ({
    id: section.id,
    title: section.title,
    level: 2 as const,
  }));

  const faqId = guide.faqSectionId ?? "faq";
  entries.push({
    id: faqId,
    title: guide.faqTitle ?? "Questions fréquentes",
    level: 2,
  });
  entries.push({
    id: "conclusion",
    title: guide.conclusion.title ?? "Conclusion",
    level: 2,
  });
  if (guide.bibliography) {
    entries.push({
      id: guide.bibliography.id,
      title: guide.bibliography.title,
      level: 2,
    });
  }

  return entries;
}

/** Sommaire complet H2 + H3 : usage interne */
export function buildGuideToc(guide: Guide): GuideTocEntry[] {
  const entries: GuideTocEntry[] = [];

  for (const section of guide.sections) {
    entries.push({ id: section.id, title: section.title, level: 2 });
    for (const subsection of section.subsections ?? []) {
      entries.push({ id: subsection.id, title: subsection.title, level: 3 });
    }
  }

  const faqId = guide.faqSectionId ?? "faq";
  entries.push({
    id: faqId,
    title: guide.faqTitle ?? "Questions fréquentes",
    level: 2,
  });
  entries.push({
    id: "conclusion",
    title: guide.conclusion.title ?? "Conclusion",
    level: 2,
  });
  if (guide.bibliography) {
    entries.push({
      id: guide.bibliography.id,
      title: guide.bibliography.title,
      level: 2,
    });
  }

  return entries;
}
