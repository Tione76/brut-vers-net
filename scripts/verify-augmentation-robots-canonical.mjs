/**
 * Vérifie robots + canonical des 46 fiches augmentation mensuelle (HTML post-build).
 * Usage : node scripts/verify-augmentation-robots-canonical.mjs
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const AMOUNTS = Array.from({ length: 46 }, (_, i) => 50 + i * 10);
const SITE_URL = "https://brut-vers-net.fr";
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

function metaContent(html, nameOrProperty, attr = "name") {
  return (
    extract(
      html,
      new RegExp(
        `<meta[^>]+${attr}=["']${nameOrProperty}["'][^>]+content=["']([^"']*)["']`,
        "i",
      ),
    ) ??
    extract(
      html,
      new RegExp(
        `<meta[^>]+content=["']([^"']*)["'][^>]+${attr}=["']${nameOrProperty}["']`,
        "i",
      ),
    )
  );
}

const issues = [];
const results = [];

for (const amount of AMOUNTS) {
  const path = publicPath(amount);
  const expectedCanonical = `${SITE_URL}${path}`;
  const htmlPath = join(OUT_DIR, `${amount}.html`);

  if (!existsSync(htmlPath)) {
    issues.push({ amount, error: "HTML manquant", path });
    continue;
  }

  const html = readFileSync(htmlPath, "utf8");
  const robots = metaContent(html, "robots");
  const googlebot = metaContent(html, "googlebot");
  const canonical =
    extract(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i) ??
    extract(html, /<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i);

  const robotsBlob = `${robots ?? ""} ${googlebot ?? ""}`.toLowerCase();
  const hasNoindex = robotsBlob.includes("noindex");
  const hasNofollow = robotsBlob.includes("nofollow");
  const hasExplicitIndex =
    robotsBlob.includes("index") && !robotsBlob.includes("noindex");
  const hasExplicitFollow =
    robotsBlob.includes("follow") && !robotsBlob.includes("nofollow");
  const canonicalOk = canonical === expectedCanonical;

  const row = {
    amount,
    path,
    robots: robots ?? "(absent → index, follow par défaut)",
    googlebot,
    canonical,
    expectedCanonical,
    hasNoindex,
    hasNofollow,
    hasExplicitIndex,
    hasExplicitFollow,
    canonicalOk,
  };

  results.push(row);

  if (hasNoindex || hasNofollow || !canonicalOk) {
    issues.push(row);
  }
}

console.log(
  JSON.stringify(
    {
      checked: AMOUNTS.length,
      ok: results.length - issues.length,
      issuesCount: issues.length,
      summary: {
        noneNoindex: results.every((r) => !r.hasNoindex),
        noneNofollow: results.every((r) => !r.hasNofollow),
        allCanonicalSelf: results.every((r) => r.canonicalOk),
        robotsMetaAbsentCount: results.filter((r) =>
          String(r.robots).startsWith("(absent"),
        ).length,
        robotsMetaPresentCount: results.filter(
          (r) => !String(r.robots).startsWith("(absent"),
        ).length,
      },
      samples: results.filter((r) => [50, 180, 500].includes(r.amount)),
      issues,
    },
    null,
    2,
  ),
);

if (issues.length > 0) process.exit(1);
