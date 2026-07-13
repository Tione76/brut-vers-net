#!/usr/bin/env node
/**
 * Notifie IndexNow depuis la ligne de commande (CI, post-déploiement Vercel).
 *
 * Usage :
 *   INDEXNOW_KEY=... SITE_URL=https://brut-vers-net.fr node scripts/notify-indexnow.mjs /guides/foo
 *   INDEXNOW_KEY=... SITE_URL=https://brut-vers-net.fr node scripts/notify-indexnow.mjs --sitemap
 */

const INDEXNOW_API_URL = "https://api.indexnow.org/IndexNow";
const MAX_URLS_PER_REQUEST = 10_000;
const KEY_PATTERN = /^[a-zA-Z0-9-]{8,128}$/;

function readEnv(key) {
  const raw = process.env[key] ?? "";
  return raw.trim().replace(/^["']|["']$/g, "");
}

function siteOriginFromEnv() {
  const raw = readEnv("SITE_URL") || readEnv("NEXT_PUBLIC_SITE_URL") || "https://brut-vers-net.fr";
  return raw.replace(/\/$/, "");
}

function getConfig() {
  const key = readEnv("INDEXNOW_KEY");
  if (!key) {
    throw new Error("INDEXNOW_KEY est requis.");
  }
  if (!KEY_PATTERN.test(key)) {
    throw new Error("INDEXNOW_KEY invalide (8-128 caractères alphanumériques ou tirets).");
  }

  const siteOrigin = siteOriginFromEnv();
  const host = readEnv("INDEXNOW_HOST") || new URL(siteOrigin).host;

  return {
    key,
    host,
    siteOrigin,
    keyLocation: `${siteOrigin}/${key}.txt`,
  };
}

function toAbsoluteUrl(input, siteOrigin) {
  const trimmed = input.trim();
  if (!trimmed) return null;

  try {
    const url =
      trimmed.startsWith("http://") || trimmed.startsWith("https://")
        ? new URL(trimmed)
        : new URL(trimmed.startsWith("/") ? trimmed : `/${trimmed}`, `${siteOrigin}/`);
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}

function normalizeUrls(urls, config) {
  const seen = new Set();
  for (const entry of urls) {
    const absolute = toAbsoluteUrl(entry, config.siteOrigin);
    if (!absolute) continue;
    if (new URL(absolute).host !== config.host) continue;
    seen.add(absolute);
  }
  return [...seen];
}

async function fetchSitemapUrls(siteOrigin) {
  const response = await fetch(`${siteOrigin}/sitemap.xml`);
  if (!response.ok) {
    throw new Error(`Impossible de récupérer le sitemap (${response.status}).`);
  }
  const xml = await response.text();
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
  return matches.map((match) => match[1].trim());
}

async function notify(urlList, config) {
  const response = await fetch(INDEXNOW_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: config.host,
      key: config.key,
      keyLocation: config.keyLocation,
      urlList,
    }),
  });

  return response;
}

async function main() {
  const args = process.argv.slice(2);
  const useSitemap = args.includes("--sitemap");
  const urlArgs = args.filter((arg) => arg !== "--sitemap");

  const config = getConfig();
  let candidates = urlArgs;

  if (useSitemap) {
    const sitemapUrls = await fetchSitemapUrls(config.siteOrigin);
    candidates = [...candidates, ...sitemapUrls];
  }

  if (candidates.length === 0) {
    console.error("Indiquez au moins une URL ou utilisez --sitemap.");
    process.exit(1);
  }

  const urls = normalizeUrls(candidates, config);
  if (urls.length === 0) {
    console.error("Aucune URL valide pour le host configuré.");
    process.exit(1);
  }

  let submitted = 0;
  for (let i = 0; i < urls.length; i += MAX_URLS_PER_REQUEST) {
    const batch = urls.slice(i, i + MAX_URLS_PER_REQUEST);
    const response = await notify(batch, config);
    submitted += batch.length;

    if (response.status !== 200 && response.status !== 202) {
      const body = await response.text().catch(() => "");
      console.error(`Échec IndexNow (${response.status}) : ${body || "sans détail"}`);
      process.exit(1);
    }
  }

  console.log(`IndexNow : ${submitted} URL(s) soumise(s) pour ${config.host}.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
