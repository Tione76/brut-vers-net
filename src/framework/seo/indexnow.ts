import { randomBytes } from "node:crypto";

import { siteConfig } from "@/site/site.config";

const INDEXNOW_API_URL = "https://api.indexnow.org/IndexNow";
const MAX_URLS_PER_REQUEST = 10_000;
const KEY_PATTERN = /^[a-zA-Z0-9-]{8,128}$/;

export type IndexNowConfig = {
  key: string;
  host: string;
  siteOrigin: string;
  keyLocation: string;
};

export type IndexNowNotifyResult = {
  ok: boolean;
  status: number;
  submittedCount: number;
  batches: number;
  message?: string;
};

function readEnv(key: string): string {
  const raw = process.env[key] ?? "";
  return raw.trim().replace(/^["']|["']$/g, "");
}

/** Génère une clé IndexNow conforme (32 caractères hexadécimaux). */
export function generateIndexNowKey(byteLength = 16): string {
  return randomBytes(byteLength).toString("hex");
}

export function isValidIndexNowKey(key: string): boolean {
  return KEY_PATTERN.test(key);
}

/**
 * Lit la configuration IndexNow depuis les variables d'environnement.
 * INDEXNOW_KEY est requis. INDEXNOW_HOST est optionnel (dérivé de siteConfig.url).
 */
export function getIndexNowConfig(): IndexNowConfig | null {
  const key = readEnv("INDEXNOW_KEY");
  if (!key) return null;

  if (!isValidIndexNowKey(key)) {
    throw new Error(
      "INDEXNOW_KEY invalide : 8 à 128 caractères, lettres, chiffres ou tirets uniquement.",
    );
  }

  const siteOrigin = siteConfig.url.replace(/\/$/, "");
  const host = readEnv("INDEXNOW_HOST") || new URL(siteOrigin).host;
  const keyLocation = `${siteOrigin}/${key}.txt`;

  return { key, host, siteOrigin, keyLocation };
}

function chunkUrls<T>(items: readonly T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

function toAbsoluteUrl(input: string, siteOrigin: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  try {
    const url =
      trimmed.startsWith("http://") || trimmed.startsWith("https://")
        ? new URL(trimmed)
        : new URL(trimmed.startsWith("/") ? trimmed : `/${trimmed}`, `${siteOrigin}/`);

    if (url.pathname === "/" && !url.search) {
      return url.origin;
    }

    return `${url.origin}${url.pathname}${url.search}`;
  } catch {
    return null;
  }
}

function belongsToHost(url: string, host: string): boolean {
  try {
    return new URL(url).host === host;
  } catch {
    return false;
  }
}

/**
 * Normalise, déduplique et valide les URLs à soumettre pour le host configuré.
 */
export function normalizeIndexNowUrls(
  urls: string | readonly string[],
  config: IndexNowConfig = getIndexNowConfig() ?? {
    key: "",
    host: new URL(siteConfig.url).host,
    siteOrigin: siteConfig.url.replace(/\/$/, ""),
    keyLocation: "",
  },
): string[] {
  const list = Array.isArray(urls) ? urls : [urls];
  const seen = new Set<string>();

  for (const entry of list) {
    const absolute = toAbsoluteUrl(entry, config.siteOrigin);
    if (!absolute || !belongsToHost(absolute, config.host)) continue;
    seen.add(absolute);
  }

  return [...seen];
}

/**
 * Notifie IndexNow pour une ou plusieurs URLs (jusqu'à 10 000 par requête HTTP).
 * À appeler côté serveur uniquement (CLI / CI).
 * Automatisation : `.github/workflows/indexnow-production.yml`
 * via `scripts/notify-indexnow.mjs` (pas de route API publique).
 */
export async function notifyIndexNow(
  urls: string | readonly string[],
  options?: { endpoint?: string },
): Promise<IndexNowNotifyResult> {
  const config = getIndexNowConfig();
  if (!config) {
    return {
      ok: false,
      status: 0,
      submittedCount: 0,
      batches: 0,
      message: "INDEXNOW_KEY n'est pas configurée.",
    };
  }

  const normalized = normalizeIndexNowUrls(urls, config);
  if (normalized.length === 0) {
    return {
      ok: false,
      status: 0,
      submittedCount: 0,
      batches: 0,
      message: "Aucune URL valide à soumettre pour ce host.",
    };
  }

  const batches = chunkUrls(normalized, MAX_URLS_PER_REQUEST);
  const endpoint = options?.endpoint ?? INDEXNOW_API_URL;
  let lastStatus = 0;

  for (const urlList of batches) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: config.host,
        key: config.key,
        keyLocation: config.keyLocation,
        urlList,
      }),
    });

    lastStatus = response.status;

    if (lastStatus !== 200 && lastStatus !== 202) {
      const details = await response.text().catch(() => "");
      return {
        ok: false,
        status: lastStatus,
        submittedCount: normalized.length,
        batches: batches.length,
        message: details || `IndexNow a répondu ${lastStatus}.`,
      };
    }
  }

  return {
    ok: true,
    status: lastStatus,
    submittedCount: normalized.length,
    batches: batches.length,
  };
}
