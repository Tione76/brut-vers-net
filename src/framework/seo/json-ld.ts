import type { FaqItem } from "@/framework/types";
import { getCanonicalUrl } from "./metadata";

export interface JsonLdSiteInput {
  url: string;
  name: string;
  language: string;
  logo: { src: string };
  contact: { email: string };
}

export function buildWebApplicationSchema(
  site: JsonLdSiteInput,
  title: string,
  description: string,
  options?: { dateModified?: string },
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
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: getCanonicalUrl(site.url, path),
    inLanguage: site.language,
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
  };
}
