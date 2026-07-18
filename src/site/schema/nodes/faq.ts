import type { FaqItem } from "@/framework/types";
import { absoluteUrl, schemaIds } from "../ids";
import { pruneEmpty, ref, type JsonLdNode } from "../types";

/**
 * FAQPage uniquement si la page affiche réellement une FAQ.
 * Questions/réponses = mêmes données que les composants React.
 */
export function buildFaqPageNode(path: string, faq: FaqItem[]): JsonLdNode | null {
  if (faq.length === 0) return null;

  return pruneEmpty({
    "@type": "FAQPage",
    "@id": schemaIds.faq(path),
    url: absoluteUrl(path),
    isPartOf: ref(schemaIds.webpage(path)),
    mainEntity: faq.map((item) =>
      pruneEmpty({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      }),
    ),
  });
}
