import { toAbsoluteAssetUrl } from "@/site/guides/covers";
import { siteConfig as config } from "@/site/site.config";

export type JsonLdNode = Record<string, unknown>;

export type SchemaCoverInput = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type BreadcrumbItem = {
  name: string;
  path: string;
};

/** Retire les valeurs vides pour éviter les propriétés Schema.org invalides. */
export function pruneEmpty<T>(value: T): T {
  if (Array.isArray(value)) {
    return value
      .map((item) => pruneEmpty(item))
      .filter((item) => item !== undefined && item !== null && item !== "") as T;
  }
  if (value && typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
      if (entry === undefined || entry === null || entry === "") continue;
      const pruned = pruneEmpty(entry);
      if (pruned === undefined || pruned === null || pruned === "") continue;
      if (typeof pruned === "object" && !Array.isArray(pruned) && Object.keys(pruned).length === 0) {
        continue;
      }
      result[key] = pruned;
    }
    return result as T;
  }
  return value;
}

export function absoluteAsset(path: string): string {
  return toAbsoluteAssetUrl(config.url, path);
}

export function ref(id: string): { "@id": string } {
  return { "@id": id };
}
