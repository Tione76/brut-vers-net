import { describe, expect, it } from "vitest";

import { buildPageMetadata, buildRootMetadata, getCanonicalUrl } from "@/framework/seo/metadata";
import { seoConfig } from "@/site/seo.config";
import { siteConfig } from "@/site/site.config";

const WWW_ORIGIN = "https://www.brut-vers-net.fr";
/** Apex sans www : interdit pour les URL SEO générées. */
const APEX_ORIGIN_PATTERN = /^https:\/\/brut-vers-net\.fr(?![.\w])/;

describe("origine SEO canonique (www)", () => {
  it("centralise le domaine officiel sur www", () => {
    expect(siteConfig.url).toBe(WWW_ORIGIN);
    expect(siteConfig.url).not.toMatch(APEX_ORIGIN_PATTERN);
  });

  it("construit metadataBase et les canoniques depuis siteConfig.url (www)", () => {
    const root = buildRootMetadata(siteConfig, seoConfig);
    expect(root.metadataBase?.origin).toBe(WWW_ORIGIN);

    const path = "/smic-selon-nombre-heures";
    const canonical = getCanonicalUrl(siteConfig.url, path);
    expect(canonical).toBe(`${WWW_ORIGIN}${path}`);
    expect(canonical).not.toMatch(APEX_ORIGIN_PATTERN);

    const meta = buildPageMetadata(siteConfig, seoConfig, {
      title: "Exemple",
      description: "Description exemple",
      path,
    });

    expect(meta.alternates?.canonical).toBe(canonical);
    expect(meta.openGraph?.url).toBe(canonical);
    expect(String(meta.alternates?.canonical)).not.toMatch(APEX_ORIGIN_PATTERN);
    expect(String(meta.openGraph?.url)).not.toMatch(APEX_ORIGIN_PATTERN);
  });

  it("refuse une future dérive vers l'apex sans www pour toute page", () => {
    for (const path of ["/", "/smic", "/guides", "/faq", "/calculateurs/augmentation-salaire"]) {
      const url = getCanonicalUrl(siteConfig.url, path);
      expect(url.startsWith(WWW_ORIGIN)).toBe(true);
      expect(url).not.toMatch(APEX_ORIGIN_PATTERN);
    }
  });
});
