import type { MetadataRoute } from "next";
import { config } from "@/site";
import { NEWS_SITEMAP_PATH } from "@/site/actu/constants";

export default function robots(): MetadataRoute.Robots {
  const base = config.url.replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: [`${base}/sitemap.xml`, `${base}${NEWS_SITEMAP_PATH}`],
  };
}
