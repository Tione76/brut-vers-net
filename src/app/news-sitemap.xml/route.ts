import { buildNewsSitemapXml } from "@/site/actu";

/**
 * Sitemap Google Actualités.
 * Recalcule la fenêtre de 48 h à la requête (avec cache court),
 * sans rendre le reste du site dynamique.
 */
export const revalidate = 3600;

export function GET() {
  const xml = buildNewsSitemapXml(new Date());
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
