/**
 * Vérifie les pages HTML générées pour la série augmentation mensuelle (50 → 500).
 * Usage : node scripts/verify-augmentation-mensuelle-html.mjs
 * Prérequis : npm run build
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const AMOUNTS = Array.from({ length: 46 }, (_, i) => 50 + i * 10);
const OUT_DIR = join(
  process.cwd(),
  ".next",
  "server",
  "app",
  "augmentation-salaire-mensuelle",
);

function publicPath(amount) {
  return `/augmentation-salaire-mensuelle-${amount}-euros-brut`;
}

function extract(html, pattern) {
  const match = html.match(pattern);
  return match?.[1]?.trim() ?? null;
}

function extractAll(html, pattern) {
  return [...html.matchAll(pattern)].map((match) => match[1].trim());
}

function decodeBasicEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'");
}

function findHtmlFile(amount) {
  const candidates = [
    join(OUT_DIR, `${amount}.html`),
    join(OUT_DIR, String(amount), "page.html"),
    join(OUT_DIR, String(amount), "index.html"),
  ];
  return candidates.find((path) => existsSync(path)) ?? null;
}

function auditHtml(amount, html) {
  const path = publicPath(amount);
  const title = extract(html, /<title>([^<]*)<\/title>/i);
  const h1Raw = extract(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const description =
    extract(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ??
    extract(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  const canonical =
    extract(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i) ??
    extract(html, /<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i);
  const ogType =
    extract(html, /<meta[^>]+property=["']og:type["'][^>]+content=["']([^"']*)["']/i) ??
    extract(html, /<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:type["']/i);
  const ogTitle =
    extract(html, /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i) ??
    extract(html, /<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:title["']/i);
  const ogDescription =
    extract(html, /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i) ??
    extract(html, /<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:description["']/i);
  const ogUrl =
    extract(html, /<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']*)["']/i) ??
    extract(html, /<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:url["']/i);
  const twitterCard =
    extract(html, /<meta[^>]+name=["']twitter:card["'][^>]+content=["']([^"']*)["']/i) ??
    extract(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']twitter:card["']/i);
  const twitterTitle =
    extract(html, /<meta[^>]+name=["']twitter:title["'][^>]+content=["']([^"']*)["']/i) ??
    extract(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']twitter:title["']/i);

  const schemaIds = extractAll(html, /"@id"\s*:\s*"([^"]+)"/g);
  const faqQuestionsVisible = extractAll(
    html,
    /class="faq-item__summary"[^>]*>\s*<span>([\s\S]*?)<\/span>/gi,
  ).map(decodeBasicEntities);
  const faqQuestionsSchema = extractAll(
    html,
    /"@type"\s*:\s*"Question"[\s\S]*?"name"\s*:\s*"((?:\\.|[^"\\])*)"/g,
  ).map((q) => decodeBasicEntities(q.replace(/\\"/g, '"')));

  if (!title || !h1Raw || !description || !canonical) {
    throw new Error(`Champs SEO manquants pour ${amount} €`);
  }

  return {
    amount,
    path,
    title: decodeBasicEntities(title),
    h1: decodeBasicEntities(h1Raw.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()),
    description: decodeBasicEntities(description),
    canonical: decodeBasicEntities(canonical),
    ogType,
    ogTitle: ogTitle ? decodeBasicEntities(ogTitle) : null,
    ogDescription: ogDescription ? decodeBasicEntities(ogDescription) : null,
    ogUrl: ogUrl ? decodeBasicEntities(ogUrl) : null,
    twitterCard,
    twitterTitle: twitterTitle ? decodeBasicEntities(twitterTitle) : null,
    schemaIds,
    faqQuestionsVisible,
    faqQuestionsSchema,
  };
}

function main() {
  if (!existsSync(OUT_DIR)) {
    throw new Error(`Dossier HTML introuvable : ${OUT_DIR}. Lancez npm run build.`);
  }

  const htmlFiles = readdirSync(OUT_DIR)
    .filter((name) => /^\d+\.html$/.test(name))
    .map((name) => Number(name.replace(/\.html$/, "")))
    .sort((a, b) => a - b);

  if (htmlFiles.length !== AMOUNTS.length) {
    console.error("HTML trouvés:", htmlFiles);
    throw new Error(`Attendu ${AMOUNTS.length} fichiers HTML, trouvé ${htmlFiles.length}.`);
  }

  for (let i = 0; i < AMOUNTS.length; i += 1) {
    if (htmlFiles[i] !== AMOUNTS[i]) {
      throw new Error(`Montant HTML inattendu : ${htmlFiles[i]} (attendu ${AMOUNTS[i]})`);
    }
  }

  const audits = [];
  for (const amount of AMOUNTS) {
    const filePath = findHtmlFile(amount);
    if (!filePath) {
      throw new Error(`HTML manquant pour ${amount} €`);
    }
    audits.push(auditHtml(amount, readFileSync(filePath, "utf8")));
  }

  const titles = new Set(audits.map((a) => a.title));
  const h1s = new Set(audits.map((a) => a.h1));
  const descriptions = new Set(audits.map((a) => a.description));
  const canonicals = new Set(audits.map((a) => a.canonical));
  const urls = new Set(audits.map((a) => a.path));
  const pageScopedIds = new Set();

    const pageIdOwner = new Map();

  for (const audit of audits) {
    if (audit.ogType !== "article") {
      throw new Error(`og:type invalide pour ${audit.amount} € : ${audit.ogType}`);
    }
    if (!audit.ogTitle || !audit.ogDescription || !audit.ogUrl) {
      throw new Error(`Open Graph incomplet pour ${audit.amount} €`);
    }
    if (audit.twitterCard !== "summary_large_image" || !audit.twitterTitle) {
      throw new Error(`Twitter Cards incomplètes pour ${audit.amount} €`);
    }
    if (audit.title === audit.h1) {
      throw new Error(`Title et H1 identiques pour ${audit.amount} €`);
    }
    if (!audit.canonical.endsWith(audit.path)) {
      throw new Error(`Canonical incorrect pour ${audit.amount} € : ${audit.canonical}`);
    }
    if (audit.faqQuestionsVisible.length === 0) {
      throw new Error(`FAQ visible absente pour ${audit.amount} €`);
    }
    if (audit.faqQuestionsSchema.length === 0) {
      throw new Error(`FAQPage absente pour ${audit.amount} €`);
    }
    if (audit.faqQuestionsVisible.length !== audit.faqQuestionsSchema.length) {
      throw new Error(`FAQ visible ≠ FAQPage (count) pour ${audit.amount} €`);
    }
    for (let i = 0; i < audit.faqQuestionsVisible.length; i += 1) {
      if (audit.faqQuestionsVisible[i] !== audit.faqQuestionsSchema[i]) {
        throw new Error(
          `FAQ mismatch ${audit.amount} € : "${audit.faqQuestionsVisible[i]}" ≠ "${audit.faqQuestionsSchema[i]}"`,
        );
      }
    }

    const uniqueOnPage = new Set(audit.schemaIds.filter((value) => value.includes(audit.path)));
    for (const id of uniqueOnPage) {
      const owner = pageIdOwner.get(id);
      if (owner !== undefined && owner !== audit.amount) {
        throw new Error(`@id Schema.org partagé entre ${owner} € et ${audit.amount} € : ${id}`);
      }
      pageIdOwner.set(id, audit.amount);
      pageScopedIds.add(id);
    }
  }

  if (titles.size !== 46) throw new Error(`Titles non uniques : ${titles.size}`);
  if (h1s.size !== 46) throw new Error(`H1 non uniques : ${h1s.size}`);
  if (descriptions.size !== 46) throw new Error(`Descriptions non uniques : ${descriptions.size}`);
  if (canonicals.size !== 46) throw new Error(`Canonicals non uniques : ${canonicals.size}`);
  if (urls.size !== 46) throw new Error(`URLs non uniques : ${urls.size}`);

  console.log(
    JSON.stringify(
      {
        ok: true,
        pages: 46,
        uniqueTitles: titles.size,
        uniqueH1: h1s.size,
        uniqueDescriptions: descriptions.size,
        uniqueCanonicals: canonicals.size,
        uniqueUrls: urls.size,
        uniquePageScopedSchemaIds: pageScopedIds.size,
        samples: audits
          .filter((a) => [50, 60, 180, 300, 500].includes(a.amount))
          .map((a) => ({
            amount: a.amount,
            title: a.title,
            h1: a.h1,
            path: a.path,
            ogType: a.ogType,
            faqCount: a.faqQuestionsVisible.length,
          })),
      },
      null,
      2,
    ),
  );
}

main();
