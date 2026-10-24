/**
 * Audit statique des 451 fiches net → brut (modèle refondu vagues 1+2).
 * Ne dépend pas d'un serveur HTTP : valide SEO, calculs, JSON-LD, sitemap, maillage.
 *
 * Usage : node --import tsx scripts/audit-net-to-gross-redesign.mjs
 */
import { getProfileCoefficient } from "../src/site/salary-calculator/config.ts";
import { roundCent } from "../src/site/salary-calculator/conversions.ts";
import { getAllPublicPages, isPathIndexable } from "../src/site/public-pages.ts";
import { schemaIds } from "../src/site/schema/index.ts";
import { NET_TO_GROSS_SERIES_COVER } from "../src/site/guides/covers.ts";
import {
  NET_TO_GROSS_AMOUNTS,
  NET_TO_GROSS_HUB_BREADCRUMB_LABEL,
  NET_TO_GROSS_HUB_PATH,
  isNetToGrossAmount,
  netToGrossPath,
} from "../src/site/salaire-net-brut/config.ts";
import {
  buildAllProfileEstimates,
  formatNetShort,
} from "../src/site/salaire-net-brut/data.ts";
import {
  buildSeriesEditorial,
  buildSeriesFaqItems,
  buildSeriesSeoMeta,
  getSeriesNearbyAmounts,
} from "../src/site/salaire-net-brut/page-1500-content.ts";
import {
  assertRedesignIntermediateHasNoDedicatedUrls,
  buildRedesignEndCtaHref,
  buildRedesignIntermediateNets,
  buildRedesignPageJsonLd,
  buildRedesignSeoMeta,
  netToGrossOpenGraphType,
} from "../src/site/salaire-net-brut/page-1650.ts";
import {
  REDESIGN_DATE_PUBLISHED,
  REDESIGN_WAVE1_DATE_MODIFIED,
  REDESIGN_WAVE2_DATE_MODIFIED,
  getControlWave1Amounts,
  getNetToGrossRedesignDateModified,
  getRedesignWave1Amounts,
  getRedesignWave2Amounts,
  isNetToGrossRedesign,
  isRedesignWave1Amount,
} from "../src/site/salaire-net-brut/redesign-wave.ts";
import { siteConfig } from "../src/site/site.config.ts";

const siteOrigin = siteConfig.url.replace(/\/$/, "");
const anomalies = [];
const titles = new Map();
const h1s = new Map();
const descriptions = new Map();
const tableOwner = new Map();

function pushIssue(amount, path, wave, issue) {
  anomalies.push({ amount, path, wave, issue });
}

function waveOf(amount) {
  return isRedesignWave1Amount(amount) ? "vague1" : "vague2";
}

console.log("=== Audit statique série net → brut (451 fiches) ===\n");

const wave1 = getRedesignWave1Amounts();
const wave2 = getRedesignWave2Amounts();
const control = getControlWave1Amounts();

if (NET_TO_GROSS_AMOUNTS.length !== 451) {
  pushIssue(0, "/", "global", `NET_TO_GROSS_AMOUNTS.length = ${NET_TO_GROSS_AMOUNTS.length} (attendu 451)`);
}
if (wave1.length !== 226) {
  pushIssue(0, "/", "global", `vague1 = ${wave1.length} (attendu 226)`);
}
if (wave2.length !== 225) {
  pushIssue(0, "/", "global", `vague2 = ${wave2.length} (attendu 225)`);
}
if (control.length !== 0) {
  pushIssue(0, "/", "global", `groupe témoin restant = ${control.length} (attendu 0)`);
}

const publicPages = getAllPublicPages();
const sitemapByPath = new Map(
  publicPages
    .filter((page) => page.path.includes("combien-gagner-brut-mensuel-pour-"))
    .map((page) => [page.path, page]),
);

let okCount = 0;

for (const amount of NET_TO_GROSS_AMOUNTS) {
  const path = netToGrossPath(amount);
  const wave = waveOf(amount);
  const pageIssues = [];
  const note = (issue) => pageIssues.push(issue);

  if (!isNetToGrossRedesign(amount)) {
    note("isNetToGrossRedesign = false");
  }

  const seo = buildSeriesSeoMeta(amount);
  const expected = buildRedesignSeoMeta(amount);
  if (JSON.stringify(seo) !== JSON.stringify(expected)) {
    note("SEO différent de buildRedesignSeoMeta");
  }
  if (!seo.title.includes("net en brut : calcul et conversion")) {
    note(`Title hors modèle : ${seo.title}`);
  }
  if (!seo.h1.includes("net en brut : combien ça fait ?")) {
    note(`H1 hors modèle : ${seo.h1}`);
  }
  if (!seo.description.includes("non-cadre")) {
    note("Meta description sans non-cadre");
  }
  if (seo.title.includes("2026") || seo.description.includes("2026")) {
    note("Année 2026 dans title ou meta");
  }
  if (seo.title.includes("\u2014") || seo.h1.includes("\u2014") || seo.description.includes("\u2014")) {
    note("Tiret cadratin présent");
  }
  if (path !== `/combien-gagner-brut-mensuel-pour-${amount}-net`) {
    note(`Path inattendu : ${path}`);
  }
  if (!isPathIndexable(path)) {
    note("Path non indexable");
  }
  if (netToGrossOpenGraphType(amount) !== "website") {
    note(`og:type = ${netToGrossOpenGraphType(amount)} (attendu website)`);
  }

  const titleKey = seo.title;
  if (!titles.has(titleKey)) titles.set(titleKey, []);
  titles.get(titleKey).push(amount);
  if (!h1s.has(seo.h1)) h1s.set(seo.h1, []);
  h1s.get(seo.h1).push(amount);
  if (!descriptions.has(seo.description)) descriptions.set(seo.description, []);
  descriptions.get(seo.description).push(amount);

  const label = formatNetShort(amount);
  if (!seo.title.includes(label.replace(" €", "")) && !seo.title.includes(label)) {
    // formatNetShort uses narrow spaces; title uses same helper via redesign
    if (!seo.title.includes(String(amount)) && !seo.h1.includes(label.slice(0, 5))) {
      note(`Montant absent du title : ${seo.title}`);
    }
  }

  const estimates = buildAllProfileEstimates(amount);
  const expectedNonExec = roundCent(amount / getProfileCoefficient("nonExecutive"));
  if (estimates.nonExecutive.grossMonthly !== expectedNonExec) {
    note(
      `Brut non-cadre ${estimates.nonExecutive.grossMonthly} ≠ ${expectedNonExec}`,
    );
  }

  const faq = buildSeriesFaqItems(amount, estimates);
  const editorial = buildSeriesEditorial(amount, estimates);
  if (faq.length !== 4) note(`FAQ length = ${faq.length} (attendu 4)`);
  if (editorial.length !== 3) note(`Editorial length = ${editorial.length} (attendu 3)`);

  const faqBlob = JSON.stringify(faq);
  if (amount !== 1650 && faqBlob.includes("1 650")) {
    note("FAQ pointe vers 1 650 €");
  }
  if (faqBlob.includes("\u2014")) note("Tiret cadratin dans FAQ");

  const nets = buildRedesignIntermediateNets(amount);
  if (nets.length !== 10) note(`Tableau length = ${nets.length}`);
  if (nets[0] !== amount - 5 || nets[5] !== amount || nets[9] !== amount + 4) {
    note(`Plage tableau incorrecte : ${nets[0]}…${nets[9]}`);
  }
  for (const net of nets) {
    const owner = tableOwner.get(net);
    if (owner !== undefined) {
      note(`Chevauchement tableau : ${net} déjà chez ${owner}`);
    } else {
      tableOwner.set(net, amount);
    }
  }
  const dedicated = assertRedesignIntermediateHasNoDedicatedUrls(amount);
  if (dedicated.length !== 9) {
    note(`Intermédiaires hors URLs dédiées = ${dedicated.length} (attendu 9)`);
  }

  const nearby = getSeriesNearbyAmounts(amount);
  if (nearby.length !== 7) note(`Nearby length = ${nearby.length}`);
  if (nearby.includes(amount)) note("Nearby inclut la page courante");
  if (!nearby.every((item) => isNetToGrossAmount(item))) {
    note("Nearby contient un montant non publié");
  }

  const cta = buildRedesignEndCtaHref(amount);
  if (cta !== `/?net=${amount}&profil=non-cadre`) {
    note(`CTA incorrect : ${cta}`);
  }

  const dateModified = getNetToGrossRedesignDateModified(amount);
  const expectedDate = isRedesignWave1Amount(amount)
    ? REDESIGN_WAVE1_DATE_MODIFIED
    : REDESIGN_WAVE2_DATE_MODIFIED;
  if (dateModified !== expectedDate) {
    note(`dateModified = ${dateModified} (attendu ${expectedDate})`);
  }

  const sitemapPage = sitemapByPath.get(path);
  if (!sitemapPage) {
    note("Absente du sitemap (getAllPublicPages)");
  } else if (sitemapPage.lastModified !== expectedDate) {
    note(`sitemap lastModified = ${sitemapPage.lastModified} (attendu ${expectedDate})`);
  }

  const document = buildRedesignPageJsonLd({
    path,
    name: seo.title,
    description: seo.description,
    breadcrumbs: [
      { name: "Accueil", path: "/" },
      { name: NET_TO_GROSS_HUB_BREADCRUMB_LABEL, path: NET_TO_GROSS_HUB_PATH },
      { name: `${amount}`, path },
    ],
    cover: NET_TO_GROSS_SERIES_COVER,
    faq,
    withAuthor: true,
    dateModified,
    datePublished: REDESIGN_DATE_PUBLISHED,
  });

  let serialized;
  try {
    serialized = JSON.stringify(document);
    JSON.parse(serialized);
  } catch (error) {
    note(`JSON-LD invalide : ${error}`);
    serialized = "";
  }

  const graph = Array.isArray(document["@graph"]) ? document["@graph"] : [];
  const page = graph.find((node) => node["@type"] === "WebPage");
  const faqNode = graph.find((node) => node["@type"] === "FAQPage");
  if (!page) note("JSON-LD WebPage manquant");
  if (!faqNode) note("JSON-LD FAQPage manquant");
  if (page) {
    if (page.about) note("WebPage.about présent (interdit)");
    if (page.mainEntity) note("WebPage.mainEntity présent (interdit)");
    if (!page.publisher || page.publisher["@id"] !== schemaIds.organization()) {
      note("WebPage.publisher manquant ou incorrect");
    }
    const expectedHasPart = [{ "@id": schemaIds.faq(path) }];
    if (JSON.stringify(page.hasPart) !== JSON.stringify(expectedHasPart)) {
      note("WebPage.hasPart incorrect");
    }
    if (page.url !== `${siteOrigin}${path}`) {
      note(`WebPage.url = ${page.url}`);
    }
    if (page.name !== seo.title) note("WebPage.name ≠ title");
    if (page.description !== seo.description) note("WebPage.description ≠ meta");
    if (page.datePublished !== `${REDESIGN_DATE_PUBLISHED}T09:00:00+02:00`) {
      note(`datePublished JSON-LD = ${page.datePublished}`);
    }
    if (page.dateModified !== `${expectedDate}T09:00:00+02:00`) {
      note(`dateModified JSON-LD = ${page.dateModified}`);
    }
  }
  if (faqNode) {
    const names = (faqNode.mainEntity || []).map((item) => item.name);
    const visible = faq.map((item) => item.question);
    if (JSON.stringify(names) !== JSON.stringify(visible)) {
      note("FAQ JSON-LD ≠ FAQ visible");
    }
  }
  if (graph.some((node) => node["@type"] === "Article")) note("Type Article présent");
  if (graph.some((node) => node["@type"] === "HowTo")) note("Type HowTo présent");
  if (amount !== 1650 && serialized.includes("combien-gagner-brut-mensuel-pour-1650-net")) {
    note("JSON-LD pointe vers URL 1650");
  }

  if (pageIssues.length === 0) {
    okCount += 1;
  } else {
    for (const issue of pageIssues) {
      pushIssue(amount, path, wave, issue);
    }
  }
}

for (const [title, amounts] of titles) {
  if (amounts.length > 1) {
    pushIssue(amounts[0], netToGrossPath(amounts[0]), "global", `Title dupliqué : ${title}`);
  }
}
for (const [h1, amounts] of h1s) {
  if (amounts.length > 1) {
    pushIssue(amounts[0], netToGrossPath(amounts[0]), "global", `H1 dupliqué : ${h1}`);
  }
}
for (const [desc, amounts] of descriptions) {
  if (amounts.length > 1) {
    pushIssue(
      amounts[0],
      netToGrossPath(amounts[0]),
      "global",
      `Meta description dupliquée sur ${amounts.length} fiches`,
    );
  }
}

if (tableOwner.size !== 4510) {
  pushIssue(0, "/", "global", `Couverture tableaux = ${tableOwner.size} (attendu 4510)`);
}

const byWave = { vague1: 0, vague2: 0, global: 0 };
for (const item of anomalies) {
  byWave[item.wave] = (byWave[item.wave] || 0) + 1;
}

const uniqueBroken = new Set(anomalies.filter((a) => a.amount > 0).map((a) => a.path));

console.log(`Fiches contrôlées : ${NET_TO_GROSS_AMOUNTS.length}`);
console.log(`Fiches conformes  : ${okCount}`);
console.log(`Fiches avec anomalies : ${uniqueBroken.size}`);
console.log(`Anomalies totales : ${anomalies.length}`);
console.log(`  dont vague1 : ${byWave.vague1 || 0}`);
console.log(`  dont vague2 : ${byWave.vague2 || 0}`);
console.log(`  dont global : ${byWave.global || 0}`);
console.log(`Titles uniques : ${titles.size}/${NET_TO_GROSS_AMOUNTS.length}`);
console.log(`H1 uniques     : ${h1s.size}/${NET_TO_GROSS_AMOUNTS.length}`);
console.log(`Meta uniques   : ${descriptions.size}/${NET_TO_GROSS_AMOUNTS.length}`);
console.log(`Sitemap série  : ${sitemapByPath.size}/${NET_TO_GROSS_AMOUNTS.length}`);
console.log(`Groupe témoin  : ${control.length}`);
console.log(`Vague 1 / 2    : ${wave1.length} / ${wave2.length}`);

if (anomalies.length > 0) {
  console.log("\n--- Détail des anomalies (max 80) ---");
  for (const item of anomalies.slice(0, 80)) {
    console.log(`[${item.wave}] ${item.path || "/"} : ${item.issue}`);
  }
  if (anomalies.length > 80) {
    console.log(`… +${anomalies.length - 80} autres`);
  }
  process.exit(1);
}

console.log("\nAucune anomalie détectée sur les contrôles statiques exécutés.");
process.exit(0);
