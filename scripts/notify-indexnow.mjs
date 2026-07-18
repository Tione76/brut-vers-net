#!/usr/bin/env node
/**
 * Notification IndexNow (CLI / CI uniquement, jamais côté client).
 *
 * Usage :
 *   npm run indexnow:notify          → sitemap live → API IndexNow
 *   npm run indexnow:notify:dry      → liste les URL sans envoyer
 *   node scripts/notify-indexnow.mjs /chemin [/autre…]
 *
 * Automatisation : `.github/workflows/indexnow-production.yml`
 * (uniquement après un déploiement Vercel Production réussi).
 *
 * Garde-fous :
 *   - déduplication stricte ;
 *   - host canonique uniquement (pas d'URL externes) ;
 *   - HTTPS uniquement ;
 *   - source = sitemap public (pages indexables uniquement, donc pas de noindex).
 *
 * Variables d'environnement :
 *   INDEXNOW_KEY   (requis)
 *   SITE_URL       (optionnel, défaut https://brut-vers-net.fr)
 *   INDEXNOW_HOST  (optionnel, dérivé de SITE_URL)
 */

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const INDEXNOW_API_URL = "https://api.indexnow.org/IndexNow";
const MAX_URLS_PER_REQUEST = 10_000;
const KEY_PATTERN = /^[a-zA-Z0-9-]{8,128}$/;
const DEFAULT_SITE_ORIGIN = "https://brut-vers-net.fr";
/** Seuls 200 et 202 sont considérés comme un succès explicite. */
const SUCCESS_STATUSES = new Set([200, 202]);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

/** Charge .env.local en local si présent (sans écraser les variables déjà définies). */
function loadLocalEnvFile() {
  const envPath = path.join(ROOT, ".env.local");
  if (!existsSync(envPath)) return;
  const content = readFileSync(envPath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadLocalEnvFile();

function readEnv(key) {
  const raw = process.env[key] ?? "";
  return raw.trim().replace(/^["']|["']$/g, "");
}

function log(message) {
  console.log(`[indexnow] ${message}`);
}

function logError(message) {
  console.error(`[indexnow] ${message}`);
}

function siteOriginFromEnv() {
  const raw =
    readEnv("SITE_URL") || readEnv("NEXT_PUBLIC_SITE_URL") || DEFAULT_SITE_ORIGIN;
  return raw.replace(/\/$/, "");
}

function getConfig() {
  const key = readEnv("INDEXNOW_KEY");
  if (!key) {
    throw new Error(
      "INDEXNOW_KEY est requis (secret GitHub Actions ou .env.local).",
    );
  }
  if (!KEY_PATTERN.test(key)) {
    throw new Error(
      "INDEXNOW_KEY invalide (8-128 caractères alphanumériques ou tirets).",
    );
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

    if (url.pathname === "/" && !url.search) {
      return url.origin;
    }

    return `${url.origin}${url.pathname}${url.search}`;
  } catch {
    return null;
  }
}

/**
 * Déduplique et ne conserve que les URL HTTPS du host canonique.
 * Les pages noindex ne figurent pas dans le sitemap public.
 */
function normalizeUrls(urls, config) {
  const seen = new Set();
  for (const entry of urls) {
    const absolute = toAbsoluteUrl(entry, config.siteOrigin);
    if (!absolute) continue;

    try {
      const parsed = new URL(absolute);
      if (parsed.protocol !== "https:") {
        log(`URL ignorée (non HTTPS) : ${absolute}`);
        continue;
      }
      if (parsed.host !== config.host) {
        log(`URL ignorée (non canonique / externe) : ${absolute}`);
        continue;
      }
    } catch {
      continue;
    }

    seen.add(absolute);
  }
  return [...seen];
}

function extractLocsFromXml(xml) {
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((match) =>
    match[1].trim(),
  );
}

async function fetchLiveSitemapUrls(siteOrigin, { retries = 5, delayMs = 5000 } = {}) {
  const sitemapUrl = `${siteOrigin}/sitemap.xml`;
  let lastError = null;

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      log(`Téléchargement du sitemap (${attempt}/${retries}) : ${sitemapUrl}`);
      const response = await fetch(sitemapUrl, {
        headers: { Accept: "application/xml,text/xml,*/*" },
        redirect: "follow",
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const xml = await response.text();
      const urls = extractLocsFromXml(xml);
      if (urls.length === 0) {
        throw new Error("Aucune balise <loc> dans le sitemap.");
      }
      log(`Sitemap live : ${urls.length} URL(s).`);
      return urls;
    } catch (error) {
      lastError = error;
      logError(
        `Échec récupération sitemap : ${error instanceof Error ? error.message : error}`,
      );
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  throw new Error(
    `Impossible de récupérer ${sitemapUrl} : ${
      lastError instanceof Error ? lastError.message : lastError
    }`,
  );
}

async function postIndexNow(urlList, config) {
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

  const body = await response.text().catch(() => "");
  return { status: response.status, body };
}

function parseArgs(argv) {
  const flags = new Set(argv.filter((arg) => arg.startsWith("--")));
  const urlArgs = argv.filter((arg) => !arg.startsWith("--"));
  return {
    sitemap: flags.has("--sitemap") || (flags.size === 0 && urlArgs.length === 0),
    dryRun: flags.has("--dry-run"),
    urlArgs,
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const config = getConfig();

  log(`Host canonique : ${config.host}`);
  log(`keyLocation : ${config.keyLocation}`);

  let candidates = [...options.urlArgs];
  if (options.sitemap || candidates.length === 0) {
    candidates = [...candidates, ...(await fetchLiveSitemapUrls(config.siteOrigin))];
  }

  const urls = normalizeUrls(candidates, config);
  if (urls.length === 0) {
    logError("Aucune URL valide à soumettre pour ce host.");
    process.exit(1);
  }

  log(`${urls.length} URL(s) unique(s) prête(s) à l'envoi.`);

  if (options.dryRun) {
    for (const url of urls) {
      console.log(url);
    }
    log("Dry-run : aucun appel à l'API IndexNow.");
    process.exit(0);
  }

  let submitted = 0;
  for (let i = 0; i < urls.length; i += MAX_URLS_PER_REQUEST) {
    const batch = urls.slice(i, i + MAX_URLS_PER_REQUEST);
    const batchIndex = Math.floor(i / MAX_URLS_PER_REQUEST) + 1;
    const totalBatches = Math.ceil(urls.length / MAX_URLS_PER_REQUEST);

    log(`Envoi du lot ${batchIndex}/${totalBatches} (${batch.length} URL(s))…`);

    const { status, body } = await postIndexNow(batch, config);

    if (!SUCCESS_STATUSES.has(status)) {
      logError(
        `Échec IndexNow (HTTP ${status}) : ${body || "sans détail"}. ` +
          "Seuls HTTP 200 et 202 sont acceptés.",
      );
      process.exit(1);
    }

    submitted += batch.length;
    log(`Lot ${batchIndex} accepté (HTTP ${status}).`);
  }

  log(`Succès : ${submitted} URL(s) soumise(s) pour ${config.host}.`);
}

main().catch((error) => {
  logError(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
