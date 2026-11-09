import { siteConfig } from "@/site/site.config";
import {
  ACTU_HUB_DESCRIPTION,
  ACTU_HUB_H1,
  ACTU_HUB_PATH,
  ACTU_RSS_PATH,
} from "./constants";
import { getPublishedActuArticles, getActuPublicPath } from "./registry";
import type { ActuArticle } from "./types";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function absoluteUrl(path: string): string {
  return `${siteConfig.url.replace(/\/$/, "")}${path}`;
}

function toRfc822(iso: string): string {
  return new Date(iso).toUTCString();
}

function buildItem(article: ActuArticle): string {
  const path = getActuPublicPath(article);
  const url = absoluteUrl(path);
  const title = article.seoTitle ?? article.title;
  const imageUrl = absoluteUrl(article.cover.src);

  return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${escapeXml(toRfc822(article.publishedAt))}</pubDate>
      <description>${escapeXml(article.excerpt)}</description>
      <enclosure url="${escapeXml(imageUrl)}" length="0" type="image/webp" />
    </item>`;
}

export function buildActuRssXml(): string {
  const articles = getPublishedActuArticles();
  const channelLink = absoluteUrl(ACTU_HUB_PATH);
  const selfLink = absoluteUrl(ACTU_RSS_PATH);
  const lastBuild = articles[0]?.modifiedAt ?? articles[0]?.publishedAt;
  const items = articles.map(buildItem).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(ACTU_HUB_H1)}</title>
    <link>${escapeXml(channelLink)}</link>
    <description>${escapeXml(ACTU_HUB_DESCRIPTION)}</description>
    <language>${escapeXml(siteConfig.language)}</language>
    <atom:link href="${escapeXml(selfLink)}" rel="self" type="application/rss+xml" />
${lastBuild ? `    <lastBuildDate>${escapeXml(toRfc822(lastBuild))}</lastBuildDate>` : ""}
${items}
  </channel>
</rss>
`;
}
