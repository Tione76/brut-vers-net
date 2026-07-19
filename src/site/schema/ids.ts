import { getCanonicalUrl } from "@/framework/seo/metadata";
import { siteConfig as config } from "@/site/site.config";

const siteUrl = () => config.url.replace(/\/$/, "");

/** @id de page : toujours absolu, avec `/#fragment` sur l'accueil pour rester cohérent. */
function pageFragmentId(path: string, fragment: string): string {
  if (path === "/") return `${siteUrl()}/#${fragment}`;
  return `${getCanonicalUrl(config.url, path)}#${fragment}`;
}

/** Identifiants stables du graphe de connaissances. */
export const schemaIds = {
  organization: () => `${siteUrl()}/#organization`,
  website: () => `${siteUrl()}/#website`,
  person: () => `${siteUrl()}/#author`,
  logo: () => `${siteUrl()}/#logo`,
  webpage: (path: string) => pageFragmentId(path, "webpage"),
  article: (path: string) => pageFragmentId(path, "article"),
  webApplication: (path: string) => pageFragmentId(path, "webapp"),
  faq: (path: string) => pageFragmentId(path, "faq"),
  breadcrumb: (path: string) => pageFragmentId(path, "breadcrumb"),
  primaryImage: (path: string) => pageFragmentId(path, "primaryimage"),
} as const;

export function absoluteUrl(path: string): string {
  return getCanonicalUrl(config.url, path);
}
