import type { FaqItem } from "@/framework/types";
import { getCanonicalUrl } from "./metadata";

export interface JsonLdSiteInput {
  url: string;
  name: string;
  language: string;
  logo: { src: string };
  contact: { email: string };
}

export interface SchemaImageInput {
  url: string;
  width?: number;
  height?: number;
  caption?: string;
}

function buildImageObject(site: JsonLdSiteInput, image: SchemaImageInput) {
  return {
    "@type": "ImageObject" as const,
    url: image.url.startsWith("http") ? image.url : `${site.url}${image.url}`,
    ...(image.width && { width: image.width }),
    ...(image.height && { height: image.height }),
    ...(image.caption && { caption: image.caption }),
  };
}

export function buildWebApplicationSchema(
  site: JsonLdSiteInput,
  title: string,
  description: string,
  options?: { dateModified?: string; image?: SchemaImageInput },
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    description,
    url: site.url,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    inLanguage: site.language,
    ...(options?.dateModified && { dateModified: options.dateModified }),
    ...(options?.image && { image: buildImageObject(site, options.image) }),
  };
}

export function buildOrganizationSchema(site: JsonLdSiteInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}${site.logo.src}`,
    contactPoint: {
      "@type": "ContactPoint",
      email: site.contact.email,
      contactType: "customer service",
      availableLanguage: site.language,
    },
  };
}

export function buildBreadcrumbSchema(
  site: JsonLdSiteInput,
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(site.url, item.path),
    })),
  };
}

export function buildFaqSchema(faq: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function buildWebPageSchema(
  site: JsonLdSiteInput,
  title: string,
  description: string,
  path: string,
  image?: SchemaImageInput,
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: getCanonicalUrl(site.url, path),
    inLanguage: site.language,
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    ...(image && { primaryImageOfPage: buildImageObject(site, image) }),
  };
}

/** Pages listant des guides ou outils */
export function buildCollectionPageSchema(
  site: JsonLdSiteInput,
  title: string,
  description: string,
  path: string,
  image?: SchemaImageInput,
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: getCanonicalUrl(site.url, path),
    inLanguage: site.language,
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    ...(image && { image: buildImageObject(site, image) }),
  };
}
