import { guides, getGuidePublicPath } from "@/site/guides/registry";
import { seoConfig } from "@/site/seo.config";
import { getAllCalculators } from "./calculators-registry";

export type SearchCategory = "Calculateur" | "Guide" | "Page";

export type SearchEntry = {
  href: string;
  title: string;
  description?: string;
  category: SearchCategory;
};

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

/** Index local léger : calculateurs + guides + hubs éditoriaux. */
export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  const seen = new Set<string>();

  const push = (entry: SearchEntry) => {
    if (seen.has(entry.href)) return;
    seen.add(entry.href);
    entries.push(entry);
  };

  for (const calc of getAllCalculators()) {
    push({
      href: calc.path,
      title: calc.shortTitle,
      description: calc.description,
      category: "Calculateur",
    });
  }

  for (const guide of guides) {
    push({
      href: getGuidePublicPath(guide),
      title: guide.breadcrumbLabel ?? guide.title,
      description: guide.description,
      category: "Guide",
    });
  }

  push({
    href: seoConfig.toolsHub.path,
    title: seoConfig.toolsHub.title,
    description: seoConfig.toolsHub.description,
    category: "Page",
  });
  push({
    href: seoConfig.guidesHub.path,
    title: seoConfig.guidesHub.title,
    description: seoConfig.guidesHub.description,
    category: "Page",
  });

  return entries;
}

export function searchSite(
  query: string,
  index: SearchEntry[] = buildSearchIndex(),
  limit = 12,
): SearchEntry[] {
  const q = normalize(query);
  if (q.length < 2) return [];
  const tokens = q.split(" ").filter((token) => token.length > 0);
  if (tokens.length === 0) return [];

  const scored = index
    .map((entry) => {
      const title = normalize(entry.title);
      const description = normalize(entry.description ?? "");
      const haystack = `${title} ${description} ${normalize(entry.category)}`;
      if (!tokens.every((token) => haystack.includes(token))) {
        return { entry, score: 0 };
      }
      let score = 0;
      if (title === q) score += 100;
      else if (title.startsWith(q)) score += 70;
      else if (title.includes(q)) score += 45;
      else if (tokens.every((token) => title.includes(token))) score += 40;
      if (description.includes(q) || tokens.every((token) => description.includes(token))) {
        score += 15;
      }
      if (normalize(entry.category).includes(q)) score += 5;
      return { entry, score };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title, "fr"));

  return scored.slice(0, limit).map((row) => row.entry);
}
