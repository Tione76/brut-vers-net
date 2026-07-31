/**
 * Audit automatique des 16 pages « salaire net → brut mensuel ».
 * Usage : node --import tsx scripts/audit-net-to-gross-series.mjs [baseUrl]
 */
import { NET_TO_GROSS_AMOUNTS, netToGrossPath } from "../src/site/salaire-net-brut/config.ts";
import { formatNetShort } from "../src/site/salaire-net-brut/data.ts";
import { buildSeriesSeoMeta, getSeriesNearbyAmounts } from "../src/site/salaire-net-brut/page-1500-content.ts";
import { getSitemapEntries } from "../src/site/public-pages.ts";
import { siteConfig } from "../src/site/site.config.ts";

const baseUrl = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const siteOrigin = siteConfig.url.replace(/\/$/, "");

function normalizeSpaces(text) {
  return text
    .replace(/&#x27;/gi, "'")
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/[\u00a0\u202f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTag(html, regex) {
  const match = html.match(regex);
  return match ? normalizeSpaces(match[1]) : null;
}

function extractMeta(html, name) {
  const re = new RegExp(
    `<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']*)["']`,
    "i",
  );
  const reAlt = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["']${name}["']`,
    "i",
  );
  return extractTag(html, re) ?? extractTag(html, reAlt);
}

function extractAll(html, regex) {
  const out = [];
  let m;
  const re = new RegExp(regex.source, regex.flags.includes("g") ? regex.flags : `${regex.flags}g`);
  while ((m = re.exec(html)) !== null) {
    out.push(m[1]);
  }
  return out;
}

function amountPatterns(amount) {
  const label = formatNetShort(amount);
  const plain = normalizeSpaces(label);
  // Variantes possibles dans le HTML
  return [
    plain,
    plain.replace(" €", "€"),
    String(amount),
    amount.toLocaleString("fr-FR"),
  ];
}

function containsAmount(text, amount) {
  if (!text) return false;
  const normalized = normalizeSpaces(text);
  const label = normalizeSpaces(formatNetShort(amount));
  if (normalized.includes(label)) return true;
  // Ex. "1500" isolé dans une URL ou un id est OK ; on cherche le libellé monétaire
  return false;
}

function parseJsonLdBlocks(html) {
  const scripts = extractAll(
    html,
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i,
  );
  return scripts.map((raw) => {
    try {
      return { ok: true, data: JSON.parse(raw.trim()) };
    } catch (error) {
      return { ok: false, error: String(error), raw: raw.slice(0, 120) };
    }
  });
}

function collectTypes(node, acc = new Set()) {
  if (!node || typeof node !== "object") return acc;
  if (Array.isArray(node)) {
    for (const item of node) collectTypes(item, acc);
    return acc;
  }
  if (node["@type"]) {
    const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
    for (const t of types) acc.add(t);
  }
  if (Array.isArray(node["@graph"])) {
    for (const item of node["@graph"]) collectTypes(item, acc);
  }
  return acc;
}

function collectGraphNodeIds(node, acc = []) {
  if (!node || typeof node !== "object") return acc;
  const graph = Array.isArray(node["@graph"]) ? node["@graph"] : [node];
  for (const item of graph) {
    if (item && typeof item === "object" && typeof item["@id"] === "string" && item["@type"]) {
      acc.push(item["@id"]);
    }
  }
  return acc;
}

async function fetchPage(path) {
  const url = `${baseUrl}${path}`;
  const res = await fetch(url, { redirect: "follow" });
  const html = await res.text();
  return { url, status: res.status, finalUrl: res.url, html };
}

async function checkLink(path) {
  try {
    const res = await fetch(`${baseUrl}${path}`, { method: "GET", redirect: "follow" });
    return { path, status: res.status, ok: res.status >= 200 && res.status < 400 };
  } catch (error) {
    return { path, status: 0, ok: false, error: String(error) };
  }
}

const anomalies = [];
const report = [];
const titles = new Map();
const descriptions = new Map();

const sitemapPaths = new Set(
  getSitemapEntries()
    .map((e) => e.path)
    .filter((p) => p.includes("combien-gagner-brut-mensuel-pour-")),
);

console.log(`Audit série net→brut sur ${baseUrl}\n`);

for (const amount of NET_TO_GROSS_AMOUNTS) {
  const path = netToGrossPath(amount);
  const expected = buildSeriesSeoMeta(amount);
  const expectedLabel = normalizeSpaces(formatNetShort(amount));
  const pageAnomalies = [];

  let fetched;
  try {
    fetched = await fetchPage(path);
  } catch (error) {
    pageAnomalies.push(`Fetch impossible : ${error}`);
    anomalies.push({ amount, path, issues: pageAnomalies });
    continue;
  }

  const { status, html, finalUrl } = fetched;

  if (status !== 200) {
    pageAnomalies.push(`HTTP ${status} (attendu 200)`);
  }

  if (!finalUrl.includes(path) && !finalUrl.endsWith(path)) {
    // Accept rewrite keeping path in browser; Next may expose internal path on some setups
    if (!finalUrl.includes(String(amount))) {
      pageAnomalies.push(`URL finale inattendue : ${finalUrl}`);
    }
  }

  const title = extractTag(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const metaDescription =
    extractMeta(html, "description") ?? extractMeta(html, "og:description");
  const canonical =
    extractTag(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ??
    extractTag(html, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  const ogUrl = extractMeta(html, "og:url");
  const h1s = extractAll(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i).map((h) =>
    normalizeSpaces(h.replace(/<[^>]+>/g, "")),
  );

  // Unicité title / description (collecte globale)
  if (title) {
    const key = normalizeSpaces(title);
    if (!titles.has(key)) titles.set(key, []);
    titles.get(key).push(amount);
  } else {
    pageAnomalies.push("Title manquant");
  }

  if (metaDescription) {
    const key = normalizeSpaces(metaDescription);
    if (!descriptions.has(key)) descriptions.set(key, []);
    descriptions.get(key).push(amount);
  } else {
    pageAnomalies.push("Meta description manquante");
  }

  if (h1s.length !== 1) {
    pageAnomalies.push(`Nombre de H1 = ${h1s.length} (attendu 1)`);
  } else if (!containsAmount(h1s[0], amount)) {
    pageAnomalies.push(`H1 ne contient pas ${expectedLabel} : « ${h1s[0]} »`);
  }

  const expectedCanonical = `${siteOrigin}${path}`;
  if (!canonical) {
    pageAnomalies.push("Canonical manquante");
  } else if (normalizeSpaces(canonical) !== expectedCanonical) {
    pageAnomalies.push(`Canonical incorrecte : ${canonical} (attendu ${expectedCanonical})`);
  }

  if (ogUrl && normalizeSpaces(ogUrl) !== expectedCanonical) {
    pageAnomalies.push(`og:url incorrecte : ${ogUrl}`);
  }

  if (title && normalizeSpaces(title) !== normalizeSpaces(expected.title)) {
    pageAnomalies.push(`Title différent du modèle : « ${title} »`);
  }
  if (metaDescription && normalizeSpaces(metaDescription) !== normalizeSpaces(expected.description)) {
    pageAnomalies.push(`Meta description différente du modèle`);
  }

  // Mauvaise valeur dans champs SEO / H1
  for (const other of NET_TO_GROSS_AMOUNTS) {
    if (other === amount) continue;
    const fields = [
      ["title", title],
      ["meta", metaDescription],
      ["h1", h1s[0]],
    ];
    for (const [name, value] of fields) {
      if (value && containsAmount(value, other) && !containsAmount(value, amount)) {
        pageAnomalies.push(`${name} contient ${formatNetShort(other)} sans le montant de page`);
      }
      // Si le title/h1 contient un autre montant de la série en plus du bon
      if (name !== "meta" && value && containsAmount(value, other)) {
        pageAnomalies.push(`${name} contient une mauvaise valeur ${normalizeSpaces(formatNetShort(other))}`);
      }
    }
  }

  // JSON-LD
  const jsonLdBlocks = parseJsonLdBlocks(html);
  if (jsonLdBlocks.length === 0) {
    pageAnomalies.push("Aucun JSON-LD trouvé");
  }
  const types = new Set();
  const ids = [];
  for (const block of jsonLdBlocks) {
    if (!block.ok) {
      pageAnomalies.push(`JSON-LD invalide : ${block.error}`);
      continue;
    }
    collectTypes(block.data, types);
    collectGraphNodeIds(block.data, ids);
    const serialized = JSON.stringify(block.data);
    if (!serialized.includes(path) && !serialized.includes(encodeURI(path))) {
      // IDs often use full URL with path
      if (!serialized.includes(String(amount))) {
        pageAnomalies.push("JSON-LD ne référence pas le montant/chemin de la page");
      }
    }
    // Wrong amount in WebPage name
    const graph = Array.isArray(block.data["@graph"]) ? block.data["@graph"] : [block.data];
    for (const node of graph) {
      if (node?.["@type"] === "WebPage" || node?.["@type"] === "FAQPage") {
        const name = node.name || "";
        if (name && containsAmount(name, amount) === false && node["@type"] === "WebPage") {
          // WebPage name is the title SEO which includes amount
          if (!containsAmount(name, amount)) {
            pageAnomalies.push(`WebPage.name sans montant page : « ${normalizeSpaces(name)} »`);
          }
        }
        for (const other of NET_TO_GROSS_AMOUNTS) {
          if (other === amount) continue;
          if (node.name && containsAmount(node.name, other)) {
            pageAnomalies.push(`JSON-LD name contient ${normalizeSpaces(formatNetShort(other))}`);
          }
        }
      }
      if (node?.["@type"] === "BreadcrumbList") {
        const items = node.itemListElement || [];
        const last = items[items.length - 1];
        const lastName = last?.name || last?.item?.name || "";
        if (lastName && !containsAmount(String(lastName), amount) && !normalizeSpaces(String(lastName)).includes(String(amount))) {
          // breadcrumb uses "X € net en brut"
          if (!normalizeSpaces(String(lastName)).includes(normalizeSpaces(formatNetShort(amount)).replace(" €", ""))) {
            pageAnomalies.push(`Breadcrumb final incohérent : « ${normalizeSpaces(String(lastName))} »`);
          }
        }
      }
    }
  }

  const requiredTypes = ["WebPage", "BreadcrumbList", "FAQPage", "Organization", "WebSite"];
  for (const t of requiredTypes) {
    if (![...types].some((x) => x === t || (Array.isArray(x) && x.includes(t)))) {
      // types set has strings
      if (!types.has(t)) pageAnomalies.push(`JSON-LD : type manquant ${t}`);
    }
  }

  const duplicateIds = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (duplicateIds.length > 0) {
    pageAnomalies.push(`JSON-LD @id en doublon : ${[...new Set(duplicateIds)].join(", ")}`);
  }

  // Sitemap
  if (!sitemapPaths.has(path)) {
    pageAnomalies.push("Absente du sitemap");
  }

  // Liens internes
  const hrefs = extractAll(html, /href=["'](\/[^"'#]*)["']/i);
  const internal = [...new Set(hrefs)].filter(
    (h) => h.startsWith("/") && !h.startsWith("//") && !h.startsWith("/_next"),
  );
  const broken = [];
  for (const href of internal) {
    const result = await checkLink(href);
    if (!result.ok) broken.push(`${href} → ${result.status || result.error}`);
  }
  if (broken.length > 0) {
    pageAnomalies.push(`Liens internes cassés : ${broken.join(" ; ")}`);
  }

  // Nearby ne doit pas pointer vers soi
  const nearby = getSeriesNearbyAmounts(amount);
  if (nearby.includes(amount)) {
    pageAnomalies.push("Montants proches inclut la page courante");
  }

  report.push({
    amount,
    path,
    status,
    title,
    h1: h1s[0] || null,
    issues: pageAnomalies.length,
  });

  if (pageAnomalies.length > 0) {
    anomalies.push({ amount, path, issues: pageAnomalies });
    console.log(`✗ ${path}`);
    for (const issue of pageAnomalies) console.log(`  - ${issue}`);
  } else {
    console.log(`✓ ${path}`);
  }
}

// Unicité globale
console.log("\n--- Unicité globale ---");
for (const [title, amounts] of titles) {
  if (amounts.length > 1) {
    const msg = `Title dupliqué sur ${amounts.join(", ")} : « ${title} »`;
    console.log(`✗ ${msg}`);
    anomalies.push({ amount: amounts[0], path: netToGrossPath(amounts[0]), issues: [msg] });
  }
}
for (const [desc, amounts] of descriptions) {
  if (amounts.length > 1) {
    const msg = `Meta description dupliquée sur ${amounts.join(", ")}`;
    console.log(`✗ ${msg}`);
    anomalies.push({ amount: amounts[0], path: netToGrossPath(amounts[0]), issues: [msg] });
  }
}

if (sitemapPaths.size !== NET_TO_GROSS_AMOUNTS.length) {
  console.log(
    `✗ Sitemap : ${sitemapPaths.size} URLs mensuelles (attendu ${NET_TO_GROSS_AMOUNTS.length})`,
  );
}

console.log("\n=== RÉSUMÉ ===");
console.log(`Pages auditées : ${NET_TO_GROSS_AMOUNTS.length}`);
console.log(`Pages avec anomalies : ${new Set(anomalies.map((a) => a.path)).size}`);
console.log(`Titles uniques : ${titles.size}/${NET_TO_GROSS_AMOUNTS.length}`);
console.log(`Meta uniques : ${descriptions.size}/${NET_TO_GROSS_AMOUNTS.length}`);

if (anomalies.length === 0) {
  console.log("Aucune anomalie détectée.");
  process.exit(0);
}

process.exit(1);
