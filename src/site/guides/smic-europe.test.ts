import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { getGuideBySlug, getGuidePublicPath, guides } from "./registry";
import {
  formatCoverCredit,
  getCoverLicenseUrl,
  getGuideCoverByHref,
  PEXELS_LICENSE_URL,
  resolveGuideCover,
} from "./covers";
import { buildGuideJsonLd } from "@/site/schema";
import { getGuideHubTeaser } from "@/site/guides/guides-hub-data";
import { getPlanDuSiteSections, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import { smicNavigation } from "@/site/navigation/smic";
import { guidesNavigation } from "./navigation";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { siteConfig } from "@/site/site.config";
import { seoConfig } from "@/site/seo.config";
import {
  COUNTRIES_UNVERIFIED,
  COUNTRIES_WITHOUT_NATIONAL,
  COUNTRIES_WITH_NATIONAL,
  COUNTRIES_WITH_SECTIONS,
  EU_COUNTRIES,
  EU_WITHOUT_NATIONAL_COUNT,
  EU_WITH_NATIONAL_COUNT,
  EUROPE_COUNTRIES,
  EUROSTAT_PERIOD,
  SMIC_EUROPE_H1,
  SMIC_EUROPE_META_DESCRIPTION,
  SMIC_EUROPE_META_LENGTH,
  SMIC_EUROPE_PATH,
  SMIC_EUROPE_PUBLISHED_AT,
  SMIC_EUROPE_SEO_TITLE,
  SMIC_EUROPE_SEO_TITLE_LENGTH,
  SMIC_EUROPE_SLUG,
  SMIC_EUROPE_UPDATED_AT,
  buildCountryLetterGroups,
  buildMainTable,
  buildTableLetterIndex,
  countryIndexLetter,
  europeCountryHref,
  tableLetterAnchor,
} from "@/site/smic-europe";
import { hasCountryFlag, flagIso, flagSrc } from "@/site/smic-europe/CountryFlag";

describe("page pilier SMIC en Europe", () => {
  const slug = SMIC_EUROPE_SLUG;
  const path = SMIC_EUROPE_PATH;
  const coverSrc = "/images/covers/guides/classement-smic-europe.webp";

  it("est enregistrée avec le chemin public /smic-europe", () => {
    const guide = getGuideBySlug(slug);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(path);
    expect(guides.some((item) => item.slug === slug)).toBe(true);
  });

  it("est indexable et présente dans sitemap, plan du site et hub guides", () => {
    expect(isPathIndexable(path)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === path)).toBe(true);
    expect(JSON.stringify(getPlanDuSiteSections())).toContain(path);
    expect(getGuideHubTeaser(slug)).toBeTruthy();
  });

  it("expose H1 daté, Title evergreen sans année, et FAQ visible sans FAQPage", () => {
    const guide = getGuideBySlug(slug)!;
    expect(guide.title).toBe(SMIC_EUROPE_H1);
    expect(guide.title).toContain("2026");
    expect(guide.seoTitle).toBe(SMIC_EUROPE_SEO_TITLE);
    expect(SMIC_EUROPE_SEO_TITLE).toBe("SMIC en Europe : salaires minimums par pays (mis à jour)");
    expect(SMIC_EUROPE_SEO_TITLE.endsWith("(mis à jour)")).toBe(true);
    expect(SMIC_EUROPE_SEO_TITLE).not.toMatch(/20\d{2}/);
    expect(SMIC_EUROPE_SEO_TITLE_LENGTH).toBe(SMIC_EUROPE_SEO_TITLE.length);
    expect(guide.description).toBe(SMIC_EUROPE_META_DESCRIPTION);
    expect(guide.description).not.toMatch(/20\d{2}/);
    expect(SMIC_EUROPE_META_LENGTH).toBe(SMIC_EUROPE_META_DESCRIPTION.length);
    expect(guide.introduction.join(" ")).not.toContain("earn_mw_cur");
    expect(
      JSON.stringify(guide.sections.find((section) => section.id === "methodologie-sources")),
    ).toContain("earn_mw_cur");
    expect(
      JSON.stringify(guide.sections.find((section) => section.id === "methodologie-sources")),
    ).toContain("https://www.drapeauxdespays.fr/");
    expect(
      JSON.stringify(guide.sections.find((section) => section.id === "methodologie-sources")),
    ).toContain("Icônes de drapeaux provenant du site");
    expect(guide.includeFaqSchema).toBe(false);
    expect(guide.faqSectionId).toBe("questions-frequentes");
    expect(guide.includeWebApplicationSchema).toBeFalsy();
    expect(guide.faq.length).toBeGreaterThanOrEqual(10);
    expect(JSON.stringify(guide)).not.toContain("\u2014");
    expect(JSON.stringify(guide).toLowerCase()).not.toContain("localhost");
    expect(guide.publishedAt).toBe(SMIC_EUROPE_PUBLISHED_AT);
    expect(guide.updatedAt).toBe(SMIC_EUROPE_UPDATED_AT);
    expect(guide.sections.filter((section) => section.title && !section.id.startsWith("salaire-minimum-")).length).toBeGreaterThan(
      0,
    );

    const metadata = buildPageMetadata(siteConfig, seoConfig, {
      title: guide.seoTitle ?? guide.title,
      description: guide.description,
      path,
      openGraphType: "article",
    });
    expect(metadata.title).toEqual({ absolute: SMIC_EUROPE_SEO_TITLE });
    expect(metadata.alternates?.canonical).toBe("https://www.brut-vers-net.fr/smic-europe");
    expect(metadata.robots).toBeUndefined();
  });

  it("attache la cover dédiée au registre et au Schema", () => {
    const guide = getGuideBySlug(slug)!;
    const cover = resolveGuideCover(guide);
    expect(cover?.src).toBe(coverSrc);
    expect(guide.coverImage?.src).toBe(cover?.src);
    expect(getGuideCoverByHref(path)?.src).toBe(cover?.src);
    expect(formatCoverCredit(cover!.credit)).toBe("Photo de Oliver via Pexels");
    expect(cover!.credit.photographer).toBe("Oliver");
    expect(cover!.credit.source).toBe("Pexels");
    expect(getCoverLicenseUrl(cover!.credit)).toBe(PEXELS_LICENSE_URL);
    expect(cover!.width).toBe(1200);
    expect(cover!.height).toBe(800);
    expect(cover!.alt.length).toBeGreaterThan(20);
    expect(cover!.alt.toLowerCase()).not.toContain("salaire");
    expect(cover!.alt).not.toMatch(/20\d{2}/);
    expect(cover!.alt).not.toMatch(/\d+\s*€/);
    expect(cover!.alt.toLowerCase()).not.toContain("classement");

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const image = graph.find(
      (node) => node["@id"] === `https://www.brut-vers-net.fr${path}#primaryimage`,
    ) as Record<string, unknown>;
    expect(image?.url).toBe(`https://www.brut-vers-net.fr${coverSrc}`);
    expect(image?.contentUrl).toBe(image?.url);
    expect(image?.width).toBe(1200);
    expect(image?.height).toBe(800);
    expect(image?.creditText).toBe("Photo de Oliver via Pexels");
  });

  it("émet WebPage, Article, BreadcrumbList, Person et Organization, sans FAQPage ni Dataset", () => {
    const guide = getGuideBySlug(slug)!;
    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const types = graph.map((node) => node["@type"]);

    expect(types).toContain("WebPage");
    expect(types).toContain("Article");
    expect(types).toContain("BreadcrumbList");
    expect(types).toContain("Person");
    expect(types).toContain("Organization");
    expect(types).not.toContain("FAQPage");
    expect(types).not.toContain("WebApplication");
    expect(types).not.toContain("Dataset");

    const webpage = graph.find((node) => node["@type"] === "WebPage") as Record<string, unknown>;
    const article = graph.find((node) => node["@type"] === "Article") as Record<string, unknown>;
    const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList") as {
      itemListElement: { name: string }[];
    };

    expect(webpage?.["@id"]).toBe(`https://www.brut-vers-net.fr${path}#webpage`);
    expect(webpage?.name).toBe(SMIC_EUROPE_H1);
    expect(String(webpage?.description)).not.toMatch(/20\d{2}/);
    expect(article?.headline).toBe(SMIC_EUROPE_H1);
    expect(article?.datePublished).toBe("2026-09-29T09:00:00+02:00");
    expect(article?.dateModified).toBe("2026-09-30T09:00:00+02:00");
    expect(graph.filter((node) => node["@type"] === "Person")).toHaveLength(1);
    expect(graph.filter((node) => node["@type"] === "Organization")).toHaveLength(1);
    expect(breadcrumb.itemListElement.map((item) => item.name)).toEqual(["Accueil", "SMIC en Europe"]);
  });

  it("couvre les 27 pays de l'UE, les pays hors UE retenus et distingue absence de minimum et donnée manquante", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    const table = buildMainTable();
    const euNames = [
      "Allemagne",
      "Autriche",
      "Belgique",
      "Bulgarie",
      "Chypre",
      "Croatie",
      "Danemark",
      "Espagne",
      "Estonie",
      "Finlande",
      "France",
      "Grèce",
      "Hongrie",
      "Irlande",
      "Italie",
      "Lettonie",
      "Lituanie",
      "Luxembourg",
      "Malte",
      "Pays-Bas",
      "Pologne",
      "Portugal",
      "République tchèque",
      "Roumanie",
      "Slovaquie",
      "Slovénie",
      "Suède",
    ];

    expect(EU_COUNTRIES).toHaveLength(27);
    expect(EU_WITH_NATIONAL_COUNT).toBe(22);
    expect(EU_WITHOUT_NATIONAL_COUNT).toBe(5);
    expect(EU_COUNTRIES.map((country) => country.nameFr).sort((a, b) => a.localeCompare(b, "fr"))).toEqual(
      euNames,
    );
    for (const name of [...euNames, "Suisse", "Royaume-Uni", "Norvège", "Islande"]) {
      expect(blob).toContain(name);
    }

    const tableCountries = table.rows.map((row) => row[0]);
    expect(tableCountries).toEqual([...tableCountries].sort((a, b) => a.localeCompare(b, "fr")));
    expect(table.rows.some((row) => row.includes("0 €") || row.includes("0\u00a0€"))).toBe(false);
    expect(table.stickyFirstColumn).toBe(true);
    expect(table.stackOnMobile).toBe(true);
    expect(table.rowHeader).toBe(true);

    const noNationalNames = COUNTRIES_WITHOUT_NATIONAL.map((country) => country.nameFr);
    expect(noNationalNames).toEqual([
      "Autriche",
      "Bosnie-Herzégovine",
      "Danemark",
      "Finlande",
      "Islande",
      "Italie",
      "Liechtenstein",
      "Norvège",
      "Saint-Marin",
      "Suède",
      "Suisse",
    ]);
    for (const country of COUNTRIES_WITHOUT_NATIONAL) {
      const row = table.rows.find((item) => item[0] === country.nameFr);
      expect(row?.[1]).toBe("Non");
      expect(row?.[3]).toBe("Pas de salaire minimum national");
      expect(row?.[2]).not.toMatch(/non vérifiée/i);
    }
    for (const country of COUNTRIES_UNVERIFIED) {
      const row = table.rows.find((item) => item[0] === country.nameFr);
      expect(row?.[3]).toBe("Donnée 2026 non vérifiée");
      expect(row?.[3]).not.toBe("Pas de salaire minimum national");
    }
    expect(COUNTRIES_UNVERIFIED.map((country) => country.nameFr)).toEqual([
      "Géorgie",
      "Kosovo",
      "Vatican",
    ]);
    expect(EUROSTAT_PERIOD).toBe("2026-S2");
    expect(COUNTRIES_WITH_NATIONAL.some((country) => country.code === "GB")).toBe(true);
    expect(COUNTRIES_WITH_NATIONAL.find((country) => country.code === "FR")?.eurostatMonthlyEur).toBe(1867);

    for (const code of ["AD", "AM", "AZ", "BY", "MC", "GB"]) {
      const country = COUNTRIES_WITH_NATIONAL.find((item) => item.code === code);
      expect(country).toBeTruthy();
      expect(country?.eurostatMonthlyEur).toBeUndefined();
      const row = table.rows.find((item) => item[0] === country!.nameFr);
      expect(row?.[1]).toBe("Oui");
      expect(row?.[3]).toBe("Non publié par Eurostat");
      expect(row?.[3]).not.toMatch(/€/);
    }
    const andorra = table.rows.find((item) => item[0] === "Andorre");
    expect(andorra?.[2]).toContain("9,05");
    expect(andorra?.[2]).toContain("1 568,67");
    const monaco = table.rows.find((item) => item[0] === "Monaco");
    expect(monaco?.[2]).toContain("12,31");
    expect(monaco?.[2]).toContain("2 080,39");
    expect(monaco?.[2]).toMatch(/5\s*%/);

    const bosnia = table.rows.find((item) => item[0] === "Bosnie-Herzégovine");
    expect(bosnia?.[2]).toMatch(/unique/);
    expect(bosnia?.[2]).toMatch(/entités/);
    expect(table.rowFlags).toHaveLength(table.rows.length);
    expect(table.rowFlags).toEqual(EUROPE_COUNTRIES.map((country) => country.code));
    const flagsDir = join(dirname(fileURLToPath(import.meta.url)), "../../../public/images/flags");
    const flagFiles = readdirSync(flagsDir).filter((name) => name.endsWith(".svg"));
    expect(flagFiles).toHaveLength(EUROPE_COUNTRIES.length);
    for (const country of EUROPE_COUNTRIES) {
      expect(hasCountryFlag(country.code)).toBe(true);
      expect(table.rows.some((row) => row[0] === country.nameFr)).toBe(true);
      expect(existsSync(join(flagsDir, `${flagIso(country.code).toLowerCase()}.svg`))).toBe(true);
    }
  });

  it("expose des ancres pays uniques et des sections indexables", () => {
    const guide = getGuideBySlug(slug)!;
    const subsectionIds = guide.sections.flatMap((section) => section.subsections?.map((item) => item.id) ?? []);
    const sectionIds = guide.sections.map((section) => section.id);
    const allIds = [...sectionIds, ...subsectionIds];
    expect(new Set(allIds).size).toBe(allIds.length);

    const requiredSlugs = [
      "allemagne",
      "andorre",
      "belgique",
      "espagne",
      "italie",
      "suisse",
      "france",
      "monaco",
      "portugal",
      "luxembourg",
      "pays-bas",
      "royaume-uni",
      "irlande",
      "armenie",
      "azerbaidjan",
      "bielorussie",
      "bosnie-herzegovine",
      "liechtenstein",
      "saint-marin",
    ];
    for (const countrySlug of requiredSlugs) {
      expect(subsectionIds).toContain(`salaire-minimum-${countrySlug}`);
      expect(europeCountryHref(countrySlug)).toBe(`/smic-europe#salaire-minimum-${countrySlug}`);
    }
    expect(subsectionIds).toHaveLength(COUNTRIES_WITH_SECTIONS.length);
    expect(guide.sections.some((section) => section.id === "tableau-salaires-minimums")).toBe(true);
    expect(guide.sections.some((section) => section.id === "pays-sans-minimum-national")).toBe(true);
    expect(guide.sections.some((section) => section.id === "methodologie-sources")).toBe(true);
    expect(JSON.stringify(guide.sections.find((section) => section.id === "tableau-salaires-minimums"))).not.toMatch(
      /Classement des SMIC/i,
    );

    const tableSection = guide.sections.find((section) => section.id === "tableau-salaires-minimums");
    const tableBlockIndex = tableSection?.blocks?.findIndex((block) => block.type === "table") ?? -1;
    const letterNavIndex =
      tableSection?.blocks?.findIndex(
        (block) => block.type === "illustration" && block.id === "smic-europe-table-letter-nav",
      ) ?? -1;
    expect(letterNavIndex).toBeGreaterThan(-1);
    expect(tableBlockIndex).toBeGreaterThan(letterNavIndex);

    const table = buildMainTable();
    const tableLetters = buildTableLetterIndex();
    expect(tableLetters.map((item) => item.letter).join("")).toBe("ABCDEFGHIKLMNPRSTUV");
    expect(tableLetters.find((item) => item.letter === "C")?.nameFr).toBe("Chypre");
    expect(tableLetters.find((item) => item.letter === "F")?.nameFr).toBe("Finlande");
    expect(tableLetters.find((item) => item.letter === "S")?.nameFr).toBe("Saint-Marin");
    const tableRowIds = table.rowIds ?? [];
    expect(new Set(tableRowIds.filter(Boolean)).size).toBe(tableLetters.length);
    for (const item of tableLetters) {
      const rowIndex = table.rows.findIndex((row) => countryIndexLetter(row[0]) === item.letter);
      expect(table.rows[rowIndex][0]).toBe(item.nameFr);
      expect(tableRowIds[rowIndex]).toBe(item.id);
      expect(item.id).toBe(tableLetterAnchor(item.letter));
      expect(allIds).not.toContain(item.id);
    }

    const nav = guide.sections.find((section) => section.id === "navigation-pays");
    expect(nav?.blocks?.some((block) => block.type === "illustration" && block.id === "smic-europe-country-nav")).toBe(
      true,
    );
    expect(JSON.stringify(nav)).not.toMatch(/Autres pays européens/);
    expect(JSON.stringify(nav)).not.toMatch(/Cliquez sur une lettre/);
    expect(readFileSync(join(dirname(fileURLToPath(import.meta.url)), "illustrations/SmicEuropeCountryNav.tsx"), "utf8")).not.toMatch(
      /Index alphabétique|smic-europe-nav__letters|smic-europe-nav__group-title|#pays-[a-z]/,
    );
    const navCss = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "guide-page.css"), "utf8");
    expect(navCss).toMatch(/\.smic-europe-nav__grid \{[\s\S]*repeat\(4/);
    expect(navCss).not.toMatch(/\.smic-europe-nav__name \{[\s\S]*?text-overflow:\s*ellipsis/);

    const letterGroups = buildCountryLetterGroups();
    const navCountries = letterGroups.flatMap((group) => group.countries);
    expect(navCountries.map((country) => country.nameFr)).toEqual(
      [...navCountries].sort((a, b) => a.nameFr.localeCompare(b.nameFr, "fr")).map((country) => country.nameFr),
    );
    expect(navCountries).toHaveLength(COUNTRIES_WITH_SECTIONS.length);
    expect(navCountries.filter((country) => country.group === "eu")).toHaveLength(27);
    expect(navCountries.some((country) => country.nameFr === "Géorgie")).toBe(false);
    expect(navCountries.some((country) => country.nameFr === "Kosovo")).toBe(false);
    expect(navCountries.some((country) => country.nameFr === "Vatican")).toBe(false);
    expect(guide.faq.some((item) => item.answer.includes("minima légaux d'entités"))).toBe(true);

    const countrySubs = guide.sections.flatMap((section) => section.subsections ?? []);
    expect(countrySubs).toHaveLength(COUNTRIES_WITH_SECTIONS.length);
    for (const country of COUNTRIES_WITH_SECTIONS) {
      const sub = countrySubs.find((item) => item.id === `salaire-minimum-${country.slug}`);
      expect(sub?.flagCode).toBe(country.code);
      expect(flagSrc(country.code)).toMatch(/^\/images\/flags\/[a-z]{2}\.svg$/);
    }
    expect(countrySubs.some((item) => item.id.includes("georgie"))).toBe(false);
    expect(navCss).toMatch(/#tableau-salaires-minimums \.guide-table-wrap--stack \.guide-table-scroll \{\s*display:\s*block;/);
    expect(navCss).not.toMatch(/\.smic-europe-nav__ue \{\s*margin-left:\s*auto;/);
    expect(
      readFileSync(join(dirname(fileURLToPath(import.meta.url)), "illustrations/SmicEuropeCountryNav.tsx"), "utf8"),
    ).toContain("smic-europe-nav__text");
  });

  it("est maillée depuis les pages SMIC proches, pas depuis le menu SMIC ni Nos guides", () => {
    const smic = JSON.stringify(getGuideBySlug("smic"));
    const hours = JSON.stringify(getGuideBySlug("smic-selon-nombre-heures"));
    const evolution = JSON.stringify(getGuideBySlug("evolution-smic"));
    expect(smic).toContain(path);
    expect(smic).toContain("voir les salaires minimums en Europe");
    expect(hours).toContain(path);
    expect(evolution).toContain(path);
    expect(smicNavigation.some((item) => item.href === path)).toBe(false);
    expect(guidesNavigation.some((item) => item.slug === slug)).toBe(false);
    expect(
      readFileSync(join(dirname(fileURLToPath(import.meta.url)), "../../app/smic-europe/page.tsx"), "utf8"),
    ).toContain("faqSectionId={guide.faqSectionId}");
    expect(
      readFileSync(join(dirname(fileURLToPath(import.meta.url)), "../../app/smic-europe/page.tsx"), "utf8"),
    ).not.toContain("revalidate");
    expect(EUROPE_COUNTRIES.some((country) => country.slug === "allemagne")).toBe(true);
  });

  it("distingue les barèmes nationaux vérifiés des équivalents Eurostat", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    const table = buildMainTable();
    const legal = (name: string) => table.rows.find((row) => row[0] === name)?.[2];
    const eurostat = (name: string) => table.rows.find((row) => row[0] === name)?.[3];

    expect(legal("Slovénie")).toBe("1 481,88 € brut / mois");
    expect(eurostat("Slovénie")).toMatch(/1\s?482/);
    expect(blob).not.toMatch(/13 versements/);
    expect(blob).not.toMatch(/13 mensualités/);
    expect(blob).not.toMatch(/Eurofound/);

    expect(legal("Belgique")).toContain("2 233,61");
    expect(legal("Belgique")).not.toMatch(/équivalent Eurostat/);
    expect(eurostat("Belgique")).toMatch(/2\s?234/);

    expect(legal("Chypre")).toContain("979");
    expect(legal("Chypre")).toContain("1 088");
    expect(eurostat("Chypre")).toMatch(/1\s?088/);

    expect(legal("Grèce")).toBe("920 € brut / mois × 14 mensualités");
    expect(eurostat("Grèce")).toMatch(/1\s?073/);

    expect(legal("Estonie")).toBe("946 € brut / mois");
    expect(legal("Malte")).toBe("229,44 € brut / semaine (18 ans et plus)");
    expect(eurostat("Malte")).toMatch(/994/);

    expect(legal("Hongrie")).toBe("322 800 HUF brut / mois");
    expect(legal("Roumanie")).toBe("4 325 RON brut / mois");
    expect(legal("Portugal")).toBe("920 € brut / mois × 14 mensualités");

    expect(legal("Bulgarie")).toBe("1 213 BGN brut / mois");
    expect(eurostat("Bulgarie")).toMatch(/620/);
    expect(legal("Croatie")).toBe("1 050 € brut / mois");
    expect(eurostat("Croatie")).toMatch(/1\s?050/);
    expect(legal("Lettonie")).toBe("780 € brut / mois");
    expect(legal("Lituanie")).toBe("1 153 € brut / mois");
    expect(legal("Monténégro")).toContain("600 € net");
    expect(legal("Monténégro")).toContain("800 € net");
    expect(eurostat("Monténégro")).toMatch(/670/);
    expect(legal("Slovaquie")).toBe("915 € brut / mois");
    for (const name of ["Bulgarie", "Croatie", "Lettonie", "Lituanie", "Monténégro", "Slovaquie"]) {
      expect(legal(name)).not.toMatch(/équivalent Eurostat/);
    }

    expect(blob).toContain("373 200");
    expect(blob).toContain("966");
    expect(blob).toContain("980");
    expect(blob).toContain("2022/2041");
    expect(blob).toContain("C-19/23");
    expect(COUNTRIES_UNVERIFIED.map((country) => country.nameFr)).toEqual([
      "Géorgie",
      "Kosovo",
      "Vatican",
    ]);
    expect(EUROPE_COUNTRIES.some((country) => country.code === "RU")).toBe(false);
  });
});
