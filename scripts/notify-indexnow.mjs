#!/usr/bin/env node
/**
 * Notification IndexNow (CLI / CI uniquement, jamais côté client).
 *
 * Modes :
 *   npm run indexnow:notify           → diff catalogue Net→Brut (streaming)
 *   npm run indexnow:notify:dry       → liste les URL détectées sans envoyer
 *   npm run indexnow:notify:full      → sitemap live complet (secours manuel)
 *   npm run indexnow:notify:full:dry  → liste le sitemap sans envoyer
 *   node scripts/notify-indexnow.mjs /chemin [/autre…]
 *
 * Automatisation : `.github/workflows/indexnow-production.yml`
 * (uniquement après un déploiement Vercel Production réussi).
 *
 * Variables d'environnement :
 *   INDEXNOW_KEY          (requis sauf --dry-run)
 *   SITE_URL              (optionnel, défaut https://brut-vers-net.fr)
 *   INDEXNOW_HOST         (optionnel, dérivé de SITE_URL)
 *   INDEXNOW_BEFORE_REF   (optionnel, défaut HEAD^)
 *   INDEXNOW_AFTER_REF    (optionnel, défaut HEAD)
 */

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  NET_TO_GROSS_CONFIG_RELATIVE_PATH,
  detectChangedNetToGrossPathsFromConfigSources,
  shouldSkipBulkCatalogBootstrap,
} from "./lib/indexnow-changed-urls.mjs";

const INDEXNOW_API_URL = "https://api.indexnow.org/IndexNow";
const MAX_URLS_PER_REQUEST = 10_000;
const KEY_PATTERN = /^[a-zA-Z0-9-]{8,128}$/;
const DEFAULT_SITE_ORIGIN = "https://brut-vers-net.fr";
const SUCCESS_STATUSES = new Set([200, 202]);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

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

function getConfig({ requireKey }) {
  const siteOrigin = siteOriginFromEnv();
  const host = readEnv("INDEXNOW_HOST") || new URL(siteOrigin).host;
  const key = readEnv("INDEXNOW_KEY");

  if (requireKey) {
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
  }

  return {
    key: key || "",
    host,
    siteOrigin,
    keyLocation: key
      ? `${siteOrigin}/${key}.txt`
      : `${siteOrigin}/<INDEXNOW_KEY>.txt`,
  };
}

function toAbsoluteUrl(input, siteOrigin) {
  const trimmed = input.trim();
  if (!trimmed) return null;

  try {
    const url =
      trimmed.startsWith("http://") || trimmed.startsWith("https://")
        ? new URL(trimmed)
        : new URL(
            trimmed.startsWith("/") ? trimmed : `/${trimmed}`,
            `${siteOrigin}/`,
          );

    url.hash = "";

    if (url.pathname === "/" && !url.search) {
      return url.origin;
    }

    return `${url.origin}${url.pathname}${url.search}`;
  } catch {
    return null;
  }
}

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
      if (parsed.host !== config.host || parsed.host.startsWith("www.")) {
        log(`URL ignorée (non canonique / externe) : ${absolute}`);
        continue;
      }
      if (
        parsed.pathname.includes("opengraph-image") ||
        parsed.pathname.includes("/api/") ||
        parsed.pathname.endsWith("sitemap.xml") ||
        parsed.pathname.endsWith("robots.txt")
      ) {
        log(`URL ignorée (route technique / OG) : ${absolute}`);
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

async function fetchLiveSitemapUrls(
  siteOrigin,
  { retries = 5, delayMs = 5000 } = {},
) {
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
        `Échec récupération sitemap : ${
          error instanceof Error ? error.message : error
        }`,
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

function gitShowFile(ref, relativePath) {
  try {
    return execFileSync("git", ["show", `${ref}:${relativePath}`], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch {
    return null;
  }
}

function detectChangedPathsFromGit() {
  const beforeRef = readEnv("INDEXNOW_BEFORE_REF") || "HEAD^";
  const afterRef = readEnv("INDEXNOW_AFTER_REF") || "HEAD";
  const relativePath = NET_TO_GROSS_CONFIG_RELATIVE_PATH;

  log(`Diff catalogue Net→Brut : ${beforeRef} → ${afterRef} (${relativePath})`);

  const afterSource = gitShowFile(afterRef, relativePath);
  if (afterSource === null) {
    throw new Error(`Impossible de lire ${relativePath} à la ref ${afterRef}.`);
  }

  const beforeSource = gitShowFile(beforeRef, relativePath) ?? "";
  const detection = detectChangedNetToGrossPathsFromConfigSources(
    beforeSource,
    afterSource,
  );

  log(
    `Catalogue publié : ${detection.beforeCount} → ${detection.afterCount} ` +
      `(+${detection.addedAmounts.length} montant(s)).`,
  );

  if (
    shouldSkipBulkCatalogBootstrap(
      detection.beforeCount,
      detection.addedAmounts.length,
    )
  ) {
    log(
      "Garde-fou : catalogue « avant » vide et trop de nouveaux montants. " +
        "Aucune soumission automatique (utilisez indexnow:notify:full en secours manuel).",
    );
    return [];
  }

  return detection.paths;
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
  const sitemap = flags.has("--sitemap");
  const dryRun = flags.has("--dry-run");

  let mode = "changed";
  if (sitemap) mode = "sitemap";
  else if (urlArgs.length > 0) mode = "manual";
  if (flags.has("--changed")) mode = "changed";

  return { mode, dryRun, urlArgs };
}

function printDryRun(urls) {
  console.log("IndexNow dry-run");
  console.log(`${urls.length} URL(s)`);
  console.log("");
  for (const url of urls) {
    console.log(`- ${url}`);
  }
  log("Dry-run : aucun appel à l'API IndexNow.");
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const config = getConfig({ requireKey: !options.dryRun });

  log(`Host canonique : ${config.host}`);
  log(`Mode : ${options.mode}${options.dryRun ? " (dry-run)" : ""}`);
  if (!options.dryRun) {
    log(`keyLocation : ${config.keyLocation}`);
  }

  let candidates = [];
  if (options.mode === "manual") {
    candidates = [...options.urlArgs];
  } else if (options.mode === "sitemap") {
    candidates = await fetchLiveSitemapUrls(config.siteOrigin);
  } else {
    candidates = detectChangedPathsFromGit();
  }

  const urls = normalizeUrls(candidates, config);

  if (urls.length === 0) {
    log("Aucune URL pertinente à soumettre (streaming : rien à faire).");
    process.exit(0);
  }

  log(`${urls.length} URL(s) unique(s) prête(s) à l'envoi.`);

  if (options.dryRun) {
    printDryRun(urls);
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
