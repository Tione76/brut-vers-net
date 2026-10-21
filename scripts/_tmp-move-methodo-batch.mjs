import { readFileSync, writeFileSync } from "node:fs";

function moveSectionToBibliography(filePath, sectionId) {
  const text = readFileSync(filePath, "utf8");
  if (text.includes('bibliographyPlacement: "after-faq"')) {
    throw new Error(`${filePath}: already migrated`);
  }

  const re = new RegExp(`    \\{\\r?\\n      id: "${sectionId}",`);
  const m = re.exec(text);
  if (!m) throw new Error(`${filePath}: start not found for ${sectionId}`);
  const start = m.index;

  let i = start;
  let depth = 0;
  let inStr = null;
  let escaped = false;
  let end = -1;
  for (; i < text.length; i++) {
    const ch = text[i];
    if (inStr) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (ch === "\\") {
        escaped = true;
        continue;
      }
      if (ch === inStr) inStr = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inStr = ch;
      continue;
    }
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  if (end < 0) throw new Error(`${filePath}: end not found`);

  let consume = end;
  while (consume < text.length && /[ \t]/.test(text[consume])) consume++;
  if (text[consume] === ",") consume++;
  while (consume < text.length && text[consume] === "\r") consume++;
  if (text[consume] === "\n") consume++;

  const section = text.slice(start, end).trimEnd();
  const bibObj = section
    .split(/\r?\n/)
    .map((line) => (line.startsWith("    ") ? `  ${line.slice(4)}` : line))
    .join("\n");

  let without = text.slice(0, start) + text.slice(consume);
  without = without.replace(/,\s*\r?\n(\s*)\](\r?\n\s*faqTitle:)/, "\n$1]$2");

  const insertMarker = "  sidebar: {";
  const idx = without.indexOf(insertMarker);
  if (idx < 0) throw new Error(`${filePath}: sidebar not found`);

  const bibliographyBlock =
    `  bibliographyPlacement: "after-faq",\n` + `  bibliography: ${bibObj},\n`;
  const newText = without.slice(0, idx) + bibliographyBlock + without.slice(idx);
  writeFileSync(filePath, newText, "utf8");
  console.log(`OK ${filePath}`);
}

const jobs = [
  ["src/site/guides/data/smic-hotelier.ts", "sources-limites"],
  ["src/site/guides/data/smic-europe.ts", "methodologie-sources"],
  ["src/site/guides/data/evolution-smic.ts", "methodologie-sources"],
  ["src/site/guides/data/salaire-interim-calcul-brut-net.ts", "methodologie-sources"],
];

for (const [file, id] of jobs) {
  moveSectionToBibliography(file, id);
}
