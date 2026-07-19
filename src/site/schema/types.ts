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

/**
 * Normalise une date Schema.org en ISO 8601 complet (heure + fuseau).
 * Accepte déjà un datetime complet, sinon complète YYYY-MM-DD à 09:00 Europe/Paris (UTC+2).
 */
export function toSchemaDateTime(value: string): string {
  if (/^\d{4}-\d{2}-\d{2}T/.test(value)) return value;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return `${value}T09:00:00+02:00`;
  return value;
}

export function ref(id: string): { "@id": string } {
  return { "@id": id };
}
