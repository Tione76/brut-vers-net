import { describe, expect, it } from "vitest";
import { getGuideBySlug, getGuidePublicPath, guides } from "@/site/guides/registry";
import {
  coverToOgInput,
  formatCoverCredit,
  getCoverLicenseUrl,
  getGuideCoverByHref,
  PEXELS_LICENSE_URL,
  resolveGuideCover,
} from "@/site/guides/covers";
import { buildGuideJsonLd } from "@/site/schema";
import { buildGuideTocH2 } from "@/site/guides/utils";
import { getGuideHubTeaser } from "@/site/guides/guides-hub-data";
import { getPlanDuSiteSections, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import { guidesNavigation } from "@/site/guides/navigation";
import { toolsNavigation } from "@/site/navigation/tools";
import { getAllCalculators } from "@/site/navigation/calculators-registry";
import { SITE_AUTHOR } from "@/site/author";
import {
  EMPLOYER_MAINTIEN_H1,
  EMPLOYER_MAINTIEN_HEADER_PRIMARY_CTA,
  EMPLOYER_MAINTIEN_HEADER_SECONDARY_CTA,
  EMPLOYER_MAINTIEN_CCN_NOTE,
  EMPLOYER_MAINTIEN_EXCLUSION_NOTE,
  EMPLOYER_MAINTIEN_HOW_TO_SECTION_ID,
  EMPLOYER_MAINTIEN_LIMITS_SECTION_ID,
  EMPLOYER_MAINTIEN_META_DESCRIPTION,
  EMPLOYER_MAINTIEN_METHOD_NOTE,
  EMPLOYER_MAINTIEN_METHODOLOGY_NOTE,
  EMPLOYER_MAINTIEN_RESULT_ESTIMATE_NOTE,
  EMPLOYER_MAINTIEN_ROUNDING_NOTE,
  EMPLOYER_MAINTIEN_ELIGIBILITY_LABEL,
  EMPLOYER_MAINTIEN_IJSS_FIELD_LABEL,
  EMPLOYER_MAINTIEN_PRIOR_RIGHTS_QUESTION,
  resolvePriorRightsDays,
  EMPLOYER_MAINTIEN_PATH,
  EMPLOYER_MAINTIEN_PUBLISHED_AT,
  EMPLOYER_MAINTIEN_SCOPE_DISCLAIMER,
  EMPLOYER_MAINTIEN_SEO_TITLE,
  EMPLOYER_MAINTIEN_SIMULATED_CASE,
  EMPLOYER_MAINTIEN_SIMULATED_CASE_VALUE,
  EMPLOYER_MAINTIEN_SLUG,
  EMPLOYER_MAINTIEN_SOURCES,
  EMPLOYER_MAINTIEN_SUBTITLE,
  EMPLOYER_MAINTIEN_UPDATED_AT,
  formatEuro,
} from "@/site/employer-maintien/data";
import {
  ex7j,
  ex14j,
  ex45j,
  exDroitsPartiels,
  exSansAnciennete,
  exDroitsEpuises,
  exLongStop,
} from "@/site/employer-maintien/examples";
import {
  calculateSickLeaveSalary,
  computeLegalEmployerComplement,
  finalizeMaintienTotal,
} from "@/site/sick-leave/engine";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { siteConfig } from "@/site/site.config";
import { seoConfig } from "@/site/seo.config";
import { buildPageMetadata } from "@/framework/seo/metadata";

const MOJIBAKE_RE = /âœ|â–|Ã©|Ã¨|Ã |Â |â€|�/;
const IJSS_CALCULATOR_ANCHOR_TEXT = "calculer le montant de vos IJSS";
const COVER_SRC = "/images/covers/guides/maintien-salaire-arret-maladie-prive.webp";
const COVER_ABSOLUTE = `https://www.brut-vers-net.fr${COVER_SRC}`;
const COVER_CREDIT = "Photo de Gustavo Fring via Pexels";
const COVER_ALT =
  "Homme masqué en manteau et écharpe, tenant des feuilles à un bureau blanc, avec casque audio, lunettes et ordinateur portable";

describe("page maintien de salaire arrêt maladie", () => {
  const slug = EMPLOYER_MAINTIEN_SLUG;
  const path = EMPLOYER_MAINTIEN_PATH;

  it("est enregistrée avec le chemin public dédié", () => {
    const guide = getGuideBySlug(slug);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(path);
    expect(guides.some((item) => item.slug === slug)).toBe(true);
  });

  it("est présente dans la navigation et le hub", () => {
    expect(guidesNavigation.some((item) => item.slug === slug)).toBe(true);
    expect(guidesNavigation.find((item) => item.slug === slug)?.shortTitle).toBe(
      "Maintien de salaire en arrêt maladie (privé)",
    );
    expect(getGuideHubTeaser(slug)).toBeTruthy();
  });

  it("est présente une seule fois dans Nos outils", () => {
    const toolNavHits = toolsNavigation.filter((item) => item.href === path);
    expect(toolNavHits).toHaveLength(1);
    expect(toolNavHits[0]?.shortTitle).toBe("Calculateur de maintien de salaire (privé)");
    expect(getAllCalculators().filter((item) => item.path === path)).toHaveLength(1);
  });

  it("expose le title, le H1 et la meta description imposés", () => {
    const guide = getGuideBySlug(slug)!;
    expect(EMPLOYER_MAINTIEN_SEO_TITLE).toBe(
      "Maintien de salaire en arrêt maladie (privé) : calcul et conditions",
    );
    expect(EMPLOYER_MAINTIEN_H1).toBe(
      "Maintien de salaire en arrêt maladie dans le privé : calcul et conditions",
    );
    expect(EMPLOYER_MAINTIEN_SUBTITLE).toContain("minimum légal");
    expect(guide.title).toBe(EMPLOYER_MAINTIEN_H1);
    expect(guide.seoTitle).toBe(EMPLOYER_MAINTIEN_SEO_TITLE);
    expect(guide.seoTitle).not.toBe(guide.title);
    expect(guide.subtitle).toBe(EMPLOYER_MAINTIEN_SUBTITLE);
    expect(guide.description).toBe(EMPLOYER_MAINTIEN_META_DESCRIPTION);
    expect(guide.publishedAt).toBe(EMPLOYER_MAINTIEN_PUBLISHED_AT);
    expect(guide.updatedAt).toBe(EMPLOYER_MAINTIEN_UPDATED_AT);
    expect(JSON.stringify(guide)).not.toContain("\u2014");
    expect(guide.seoTitle).not.toContain("| Brut vers Net");
    expect(guide.seoTitle).not.toContain("2026");
    expect(EMPLOYER_MAINTIEN_SEO_TITLE.length).toBeGreaterThan(50);
    expect(EMPLOYER_MAINTIEN_SEO_TITLE.length).toBeLessThanOrEqual(70);
    expect(EMPLOYER_MAINTIEN_META_DESCRIPTION.length).toBeGreaterThan(110);
    expect(EMPLOYER_MAINTIEN_META_DESCRIPTION.length).toBeLessThan(160);

    const metadata = buildPageMetadata(siteConfig, seoConfig, {
      title: guide.seoTitle ?? guide.title,
      description: guide.description,
      path,
      openGraphType: "article",
    });
    expect(metadata.title).toEqual({ absolute: EMPLOYER_MAINTIEN_SEO_TITLE });
    expect(metadata.openGraph?.title).toBe(EMPLOYER_MAINTIEN_SEO_TITLE);
    expect(metadata.openGraph?.url).toBe(`https://www.brut-vers-net.fr${path}`);
    expect((metadata.twitter as { title?: string } | undefined)?.title).toBe(
      EMPLOYER_MAINTIEN_SEO_TITLE,
    );
    expect(metadata.alternates?.canonical).toBe(`https://www.brut-vers-net.fr${path}`);
    expect(JSON.stringify(metadata)).not.toContain("localhost");
  });

  it("évite la cannibalisation avec les deux pages du cluster", () => {
    const guide = getGuideBySlug(slug)!;
    expect(guide.seoTitle).not.toContain("simulateur");
    expect(guide.title).not.toContain("combien allez-vous toucher");
    expect(guide.title).not.toContain("IJSS");
    expect(guide.seoTitle).not.toBe(
      "IJSS en arrêt maladie dans le privé : calcul et simulateur",
    );
    expect(guide.seoTitle).not.toBe(
      "Salaire en arrêt maladie dans le privé : montant et simulateur",
    );
    const blob = JSON.stringify(guide);
    expect(blob).toContain(IJSS_CALCULATOR_ANCHOR_TEXT);
    expect(blob).toContain("/calcul-ijss-arret-maladie");
    expect(blob).toContain("/salaire-arret-maladie");
    expect(blob).toContain("estimer votre revenu total pendant l'arrêt maladie");
  });

  it("est indexable et présente dans sitemap et plan du site", () => {
    expect(isPathIndexable(path)).toBe(true);
    expect(getSitemapEntries().filter((entry) => entry.path === path)).toHaveLength(1);
    expect(JSON.stringify(getPlanDuSiteSections())).toContain(path);
  });

  it("produit WebPage, Article, FAQ, WebApplication et un seul H1 logique", () => {
    const guide = getGuideBySlug(slug)!;
    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const article = graph.find((node) => node["@type"] === "Article") as Record<string, unknown>;
    const webpage = graph.find((node) => node["@type"] === "WebPage") as Record<string, unknown>;
    const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList");
    const faqPage = graph.find((node) => node["@type"] === "FAQPage") as {
      mainEntity?: { name: string; acceptedAnswer?: { text: string } }[];
    };
    const webApp = graph.find((node) => node["@type"] === "WebApplication") as Record<
      string,
      unknown
    >;

    expect(article.headline).toBe(EMPLOYER_MAINTIEN_H1);
    expect(webpage.name).toBe(EMPLOYER_MAINTIEN_H1);
    expect(article.description).toBe(EMPLOYER_MAINTIEN_META_DESCRIPTION);
    expect(article.url).toBe(`https://www.brut-vers-net.fr${path}`);
    expect(breadcrumb).toBeTruthy();
    expect(faqPage.mainEntity?.map((item) => item.name)).toEqual(
      guide.faq.map((item) => item.question),
    );
    expect(faqPage.mainEntity?.map((item) => item.acceptedAnswer?.text)).toEqual(
      guide.faq.map((item) => item.answer),
    );
    expect(guide.faq).toHaveLength(13);
    expect(webApp).toBeTruthy();
    expect(webApp.name).toBe("Calculateur de maintien de salaire en arrêt maladie");
    expect(webApp.offers).toEqual({
      "@type": "Offer",
      price: 0,
      priceCurrency: "EUR",
    });
    expect(webApp).not.toHaveProperty("aggregateRating");
    expect((webpage.mainEntity as { "@id"?: string })?.["@id"]).toContain("#article");
    const hasPart = webpage.hasPart as { "@id"?: string }[];
    expect(hasPart.some((part) => part["@id"]?.includes("#webapp"))).toBe(true);
    expect(hasPart.some((part) => part["@id"]?.includes("#faq"))).toBe(true);
    expect(JSON.stringify(graph)).not.toContain("localhost");
    const author = article.author as { "@id"?: string };
    const person = graph.find((node) => node["@id"] === author?.["@id"]) as {
      name?: string;
    };
    expect(person?.name).toBe(SITE_AUTHOR.name);
  });

  it("attache la couverture Gustavo Fring et un ImageObject cohérent", () => {
    const guide = getGuideBySlug(slug)!;
    const cover = resolveGuideCover(guide);
    const diskPath = join(process.cwd(), "public", COVER_SRC.replace(/^\//, ""));

    expect(existsSync(diskPath)).toBe(true);
    expect(statSync(diskPath).size).toBeGreaterThan(0);
    expect(cover?.src).toBe(COVER_SRC);
    expect(guide.coverImage?.src).toBe(COVER_SRC);
    expect(getGuideCoverByHref(path)?.src).toBe(COVER_SRC);
    expect(cover?.src).not.toContain("Calculateur-brut-vers-net");
    expect(cover?.width).toBe(1200);
    expect(cover?.height).toBe(800);
    expect(cover?.alt).toBe(COVER_ALT);
    expect(formatCoverCredit(cover!.credit)).toBe(COVER_CREDIT);
    expect(cover!.credit.photographer).toBe("Gustavo Fring");
    expect(cover!.credit.source).toBe("Pexels");
    expect(cover!.credit.acquireLicensePage).toBeUndefined();
    expect(cover!.credit.copyrightNotice).toBeUndefined();
    expect(getCoverLicenseUrl(cover!.credit)).toBe(PEXELS_LICENSE_URL);

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const article = graph.find((node) => node["@type"] === "Article") as Record<string, unknown>;
    const webpage = graph.find((node) => node["@type"] === "WebPage") as Record<string, unknown>;
    const webApp = graph.find((node) => node["@type"] === "WebApplication") as Record<
      string,
      unknown
    >;
    const image = graph.find(
      (node) => node["@id"] === `https://www.brut-vers-net.fr${path}#primaryimage`,
    ) as Record<string, unknown>;
    const pageImages = graph.filter(
      (node) =>
        node["@type"] === "ImageObject" && String(node["@id"] ?? "").includes(path),
    );
    const author = article.author as { "@id"?: string };
    const person = graph.find((node) => node["@id"] === author?.["@id"]) as {
      name?: string;
    };

    expect(pageImages).toHaveLength(1);
    expect(article.image).toEqual({
      "@id": `https://www.brut-vers-net.fr${path}#primaryimage`,
    });
    expect(article.thumbnailUrl).toBeUndefined();
    expect(webpage.primaryImageOfPage).toEqual({
      "@id": `https://www.brut-vers-net.fr${path}#primaryimage`,
    });
    expect(webApp.image).toBeUndefined();
    expect(image?.["@type"]).toBe("ImageObject");
    expect(image?.url).toBe(COVER_ABSOLUTE);
    expect(image?.contentUrl).toBe(COVER_ABSOLUTE);
    expect(image?.width).toBe(1200);
    expect(image?.height).toBe(800);
    expect(image?.encodingFormat).toBe("image/webp");
    expect(image?.creditText).toBe(COVER_CREDIT);
    expect(image?.representativeOfPage).toBe(true);
    expect((image?.creator as { name?: string })?.name).toBe("Gustavo Fring");
    expect(image?.license).toBe(PEXELS_LICENSE_URL);
    expect(image).not.toHaveProperty("acquireLicensePage");
    expect(image).not.toHaveProperty("copyrightNotice");
    expect(person?.name).toBe(SITE_AUTHOR.name);
    expect(JSON.stringify(graph)).not.toContain("localhost");
    expect(JSON.stringify(graph)).not.toContain("pexels.com/photo");

    const og = coverToOgInput(cover!);
    expect(og.url).toBe(COVER_SRC);
    expect(og.width).toBe(1200);
    expect(og.height).toBe(800);
    expect(og.alt).toBe(COVER_ALT);
    expect(og.type).toBe("image/webp");
    expect(getAllCalculators().find((item) => item.path === path)?.cover.src).toBe(
      COVER_SRC,
    );

    const metadata = buildPageMetadata(siteConfig, seoConfig, {
      title: guide.seoTitle ?? guide.title,
      description: guide.description,
      path,
      ogImage: og,
      openGraphType: "article",
    });
    const ogImage = metadata.openGraph?.images;
    const ogEntry = Array.isArray(ogImage) ? ogImage[0] : ogImage;
    expect(ogEntry).toMatchObject({
      url: COVER_ABSOLUTE,
      width: 1200,
      height: 800,
      alt: COVER_ALT,
      type: "image/webp",
    });
    const twitter = metadata.twitter as
      | { card?: string; images?: Array<string | { url?: string; alt?: string }> | string }
      | undefined;
    expect(twitter?.card).toBe("summary_large_image");
    const twitterImages = twitter?.images;
    const twitterEntry = Array.isArray(twitterImages) ? twitterImages[0] : twitterImages;
    expect(twitterEntry).toMatchObject({
      url: COVER_ABSOLUTE,
      alt: COVER_ALT,
    });
    expect(JSON.stringify(metadata)).not.toContain("localhost");
    expect(JSON.stringify(metadata)).not.toContain("Calculateur-brut-vers-net");
  });

  it("aligne les exemples éditoriaux sur le moteur partagé", () => {
    const legal = computeLegalEmployerComplement({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      seniorityYears: 3,
      eligibilityConfirmed: true,
      dailyIjssGross: ex14j.dailyIjssGross,
    })!;
    expect(ex14j.employerComplementGrossTotal).toBe(legal.employerComplementGrossTotal);
    expect(ex14j.employerComplementGrossTotal).toBe(184.16);
    expect(ex7j.employerComplementGrossTotal).toBe(0);
    expect(ex7j.employerComplementDays).toBe(0);
    expect(ex45j.firstDaysCovered).toBe(30);
    expect(ex45j.secondDaysCovered).toBe(8);
    expect(exDroitsPartiels.firstDaysCovered).toBe(0);
    expect(exSansAnciennete.eligibleApparent).toBe(false);
    expect(exDroitsEpuises.employerComplementDays).toBe(0);
    expect(exDroitsEpuises.employerComplementGrossTotal).toBe(0);
    expect(exLongStop.uncoveredAfterRightsDays).toBeGreaterThan(0);
    expect(ex14j.employerComplementGrossTotal).toBe(
      finalizeMaintienTotal(
        ex14j.firstPeriodDailyComplementExact * ex14j.employerComplementDays,
      ),
    );
    const full = calculateSickLeaveSalary({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      ijssCarenceMode: "standard3Days",
      employerComplementMode: "legalMinimum",
      seniorityYears: 3,
      employerEligibilityConfirmed: true,
      subrogation: "yes",
    })!;
    expect(ex14j.employerComplementGrossTotal).toBe(full.employerComplementGrossTotal);
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain(formatEuro(ex14j.employerComplementGrossTotal));
    expect(blob).toContain(formatEuro(ex7j.employerComplementGrossTotal));
  });

  it("cite les sources officielles et distingue carence CPAM et délai employeur", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    for (const source of Object.values(EMPLOYER_MAINTIEN_SOURCES)) {
      expect(blob).toContain(source.href);
    }
    expect(blob).toContain("LEGIARTI000054331868");
    expect(blob).toContain("90 %");
    expect(blob).toMatch(/deux tiers|2\/3|66,66/i);
    expect(blob).toMatch(/7 jours|sept jours|huitième|8e jour/);
    expect(blob).toMatch(/3 jours|trois jours/);
    expect(blob).toContain("fonction publique");
    expect(blob).toContain("À retenir : les IJSS ne sont pas le maintien de salaire");
    expect(blob).not.toContain("doctrine.fr");
    expect(blob).toContain("D1226-7");
    expect(blob).toContain("convention d'estimation");
    expect(blob).toContain("pas une méthode légale obligatoire");
    expect(blob).toContain(EMPLOYER_MAINTIEN_METHOD_NOTE);
    expect(blob).toContain(
      "rémunération que le salarié aurait perçue selon l'horaire pratiqué pendant l'absence",
    );
  });

  it("présente × 12 ÷ 365 comme convention d'estimation, pas comme méthode légale", () => {
    const guide = getGuideBySlug(slug)!;
    expect(JSON.stringify(guide)).toContain(EMPLOYER_MAINTIEN_METHOD_NOTE);
    expect(EMPLOYER_MAINTIEN_RESULT_ESTIMATE_NOTE).toContain(
      "salaire brut mensuel × 12 ÷ 365",
    );
    const methodology = guide.sections.find((section) => section.id === "methodologie-sources");
    const limits = guide.sections.find(
      (section) => section.id === EMPLOYER_MAINTIEN_LIMITS_SECTION_ID,
    );
    const howToCalc = guide.sections.find(
      (section) => section.id === "comment-calculer-le-maintien-legal",
    );
    expect(JSON.stringify(methodology)).toContain(EMPLOYER_MAINTIEN_METHOD_NOTE);
    expect(JSON.stringify(limits)).toContain(EMPLOYER_MAINTIEN_METHOD_NOTE);
    expect(JSON.stringify(howToCalc)).toContain(EMPLOYER_MAINTIEN_METHOD_NOTE);
    expect(JSON.stringify(howToCalc)).toContain("Ce n'est pas une méthode légale obligatoire.");
    const calc = readFileSync(
      join(process.cwd(), "src/site/employer-maintien/calculator.tsx"),
      "utf8",
    );
    expect(calc).toContain("EMPLOYER_MAINTIEN_RESULT_ESTIMATE_NOTE");
    expect(calc).toContain("EMPLOYER_MAINTIEN_METHOD_NOTE");
    expect(calc).toContain("Rémunération journalière estimée");
    expect(calc).toContain("EMPLOYER_MAINTIEN_ROUNDING_NOTE");
    expect(calc).toContain("EMPLOYER_MAINTIEN_ELIGIBILITY_LABEL");
    expect(calc).toContain("EMPLOYER_MAINTIEN_IJSS_FIELD_LABEL");
    expect(calc).not.toContain("label={EMPLOYER_MAINTIEN_IJSS_FIELD_LABEL}\n            suffix=");
    expect(calc).toContain("EMPLOYER_MAINTIEN_PRIOR_RIGHTS_QUESTION");
  });

  it("ne contient pas de lien interne cassé", () => {
    const guide = getGuideBySlug(slug)!;
    const hrefs = new Set<string>();
    const collect = (value: unknown) => {
      if (!value || typeof value !== "object") return;
      if (Array.isArray(value)) {
        value.forEach(collect);
        return;
      }
      const record = value as Record<string, unknown>;
      if (typeof record.href === "string" && record.href.startsWith("/")) {
        hrefs.add(record.href.split("#")[0]!);
      }
      Object.values(record).forEach(collect);
    };
    collect(guide);
    for (const href of hrefs) {
      if (href === path || href === "/") continue;
      if (href.startsWith("/guides/")) {
        const slugFromPath = href.replace("/guides/", "");
        expect(getGuideBySlug(slugFromPath) || href === "/guides").toBeTruthy();
        continue;
      }
      expect(isPathIndexable(href) || href === "/guides").toBe(true);
    }
  });

  it("ajoute les sections hybrides et place le sommaire après le simulateur", () => {
    const guide = getGuideBySlug(slug)!;
    const toc = buildGuideTocH2(guide);
    expect(toc[0]?.id).toBe(EMPLOYER_MAINTIEN_HOW_TO_SECTION_ID);
    expect(toc[1]?.id).toBe(EMPLOYER_MAINTIEN_LIMITS_SECTION_ID);
    expect(toc.some((entry) => entry.id === "quest-ce-que-le-maintien-de-salaire")).toBe(
      true,
    );
    expect(toc.some((entry) => entry.id === "questions-frequentes")).toBe(true);
    const pageSource = readFileSync(
      join(process.cwd(), "src/app/maintien-salaire-arret-maladie/page.tsx"),
      "utf8",
    );
    expect(pageSource).toContain("<EmployerMaintienCalculator />");
    expect(pageSource).toContain("SickLeaveClusterNav");
    expect(pageSource).toContain('current="maintien"');
    expect(pageSource).toContain("afterToc=");
    expect(pageSource).toContain('tocPlacement="after-slot"');
    expect(pageSource).toContain("EMPLOYER_MAINTIEN_HEADER_PRIMARY_CTA");
    expect(pageSource).toContain("headerActions");
    expect(EMPLOYER_MAINTIEN_HEADER_PRIMARY_CTA).toBe("Calculer le complément employeur");
    expect(EMPLOYER_MAINTIEN_HEADER_SECONDARY_CTA).toBe("Comprendre les règles");
    expect(pageSource.match(/<h1/g)).toBeNull();
  });

  it("évite le débordement horizontal aux largeurs cibles", () => {
    const css = [
      readFileSync(join(process.cwd(), "src/site/guides/guide-tool-band.css"), "utf8"),
      readFileSync(join(process.cwd(), "src/site/sick-leave/sick-leave.css"), "utf8"),
    ].join("\n");
    expect(css).toContain("overflow-x: clip");
    expect(css).toContain("max-width: 100%");
    expect(css).toContain("box-sizing: border-box");
    const calc = readFileSync(
      join(process.cwd(), "src/site/employer-maintien/calculator.tsx"),
      "utf8",
    );
    expect(calc).not.toContain("min-width: 400");
    expect(calc).not.toContain("width: 100vw");
    expect(css).toContain("sick-leave-calc__case");
    expect(css).toContain("overflow-wrap: anywhere");
  });

  it("remplace le menu Cas simulé par une mention informative du cas privé", () => {
    const calc = readFileSync(
      join(process.cwd(), "src/site/employer-maintien/calculator.tsx"),
      "utf8",
    );
    expect(calc).not.toContain("<select");
    expect(calc).not.toContain("<option");
    expect(calc).not.toContain("Votre situation");
    expect(calc).not.toContain("value=\"atmp\"");
    expect(calc).not.toContain("value=\"public\"");
    expect(calc).not.toContain("value=\"exclu\"");
    expect(calc).not.toContain("value=\"autre\"");
    expect(calc).not.toContain("MaintienScope");
    expect(calc).not.toContain("setScope(");
    expect(calc).toContain("EMPLOYER_MAINTIEN_SIMULATED_CASE_LABEL");
    expect(calc).toContain("EMPLOYER_MAINTIEN_SIMULATED_CASE_VALUE");
    expect(calc).toContain("EMPLOYER_MAINTIEN_CCN_NOTE");
    expect(calc).toContain("EMPLOYER_MAINTIEN_EXCLUSION_NOTE");
    expect(EMPLOYER_MAINTIEN_SIMULATED_CASE).toContain(
      "salarié mensualisé du secteur privé",
    );
    expect(EMPLOYER_MAINTIEN_SIMULATED_CASE_VALUE).toContain(
      "maladie ou accident non professionnel",
    );
    expect(EMPLOYER_MAINTIEN_CCN_NOTE).toContain(
      "convention collective ou un accord d'entreprise",
    );
    expect(EMPLOYER_MAINTIEN_CCN_NOTE).toContain("minimum légal prévu par le Code du travail");
  });

  it("conserve le périmètre privé dans l'article, sans simuler les cas exclus", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    const howTo = guide.sections.find(
      (section) => section.id === EMPLOYER_MAINTIEN_HOW_TO_SECTION_ID,
    );
    const limits = guide.sections.find(
      (section) => section.id === EMPLOYER_MAINTIEN_LIMITS_SECTION_ID,
    );
    const uncovered = guide.sections.find((section) => section.id === "situations-non-couvertes");
    const publicCompare = guide.sections.find((section) => section.id === "prive-et-public");
    const ccn = guide.sections.find(
      (section) => section.id === "convention-collective-plus-favorable",
    );
    expect(JSON.stringify(howTo)).toContain("part automatiquement du cas général");
    expect(JSON.stringify(howTo)).not.toContain("Confirmez le cas général");
    const howToSteps = howTo?.blocks?.find((block) => block.type === "steps");
    expect(howToSteps?.type).toBe("steps");
    expect(howToSteps && howToSteps.type === "steps" ? howToSteps.items : []).toHaveLength(
      8,
    );
    expect(JSON.stringify(howToSteps)).toContain("calculer le montant de vos IJSS");
    const formula = guide.sections.find(
      (section) => section.id === "comment-calculer-le-maintien-legal",
    );
    const formulaList = formula?.blocks?.find((block) => block.type === "list");
    expect(formulaList && formulaList.type === "list" ? formulaList.ordered : true).toBe(
      false,
    );
    expect(formulaList && formulaList.type === "list" ? formulaList.items : []).toHaveLength(
      6,
    );
    expect(JSON.stringify(formulaList)).toContain(
      "Estimer une rémunération journalière moyenne",
    );
    expect(JSON.stringify(formulaList)).toContain(
      "Ne compter les jours qu'après le délai de sept jours",
    );
    expect(JSON.stringify(limits)).toContain(EMPLOYER_MAINTIEN_SCOPE_DISCLAIMER);
    expect(JSON.stringify(limits)).toContain(EMPLOYER_MAINTIEN_EXCLUSION_NOTE);
    expect(JSON.stringify(uncovered)).toContain(
      "Elles ne sont pas proposées comme options du simulateur",
    );
    expect(JSON.stringify(uncovered)).not.toContain("Choisissez-les dans le simulateur");
    expect(JSON.stringify(ccn)).toContain(
      "De nombreux salariés du privé relèvent d'une convention collective susceptible de prévoir des garanties plus favorables",
    );
    expect(JSON.stringify(publicCompare)).toContain(
      "Aucun montant pour le secteur public n'est calculé sur cette page",
    );
    expect(blob).not.toContain("Choisissez-les dans le simulateur");
    const publicFaq = guide.faq.find((item) =>
      item.question.includes("fonction publique"),
    );
    expect(publicFaq?.answer).toContain("ne calcule aucun montant pour la fonction publique");
    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const faqPage = graph.find((node) => node["@type"] === "FAQPage") as {
      mainEntity?: { name: string; acceptedAnswer?: { text: string } }[];
    };
    expect(faqPage.mainEntity?.map((item) => item.acceptedAnswer?.text)).toEqual(
      guide.faq.map((item) => item.answer),
    );
    expect(faqPage.mainEntity?.some((item) =>
      item.acceptedAnswer?.text.includes("ne calcule aucun montant pour la fonction publique"),
    )).toBe(true);
  });

  it("ne contient pas de mojibake", () => {
    const guide = getGuideBySlug(slug)!;
    expect(JSON.stringify(guide)).not.toMatch(MOJIBAKE_RE);
    for (const relative of [
      "src/site/employer-maintien/calculator.tsx",
      "src/site/employer-maintien/data.ts",
      "src/app/maintien-salaire-arret-maladie/page.tsx",
      "src/site/guides/data/maintien-salaire-arret-maladie.ts",
    ]) {
      const content = readFileSync(join(process.cwd(), relative), "utf8");
      expect(content, relative).not.toMatch(MOJIBAKE_RE);
      expect(content, relative).not.toContain("\u2014");
    }
  });

  it("sécurise les droits antérieurs, l'IJSS brute et la confirmation", () => {
    expect(resolvePriorRightsDays("no", 12, 5)).toEqual({
      usedFirst: 0,
      usedSecond: 0,
      warnUnknown: false,
    });
    expect(resolvePriorRightsDays("yes", 12, 5)).toEqual({
      usedFirst: 12,
      usedSecond: 5,
      warnUnknown: false,
    });
    expect(resolvePriorRightsDays("unknown", 12, 5)).toEqual({
      usedFirst: 0,
      usedSecond: 0,
      warnUnknown: true,
    });
    expect(EMPLOYER_MAINTIEN_ELIGIBILITY_LABEL).toBe(
      "J'ai vérifié les principales conditions du minimum légal",
    );
    expect(EMPLOYER_MAINTIEN_IJSS_FIELD_LABEL).toContain("brute retenue");
    expect(EMPLOYER_MAINTIEN_PRIOR_RIGHTS_QUESTION).toContain("12 mois précédant");
    const calc = readFileSync(
      join(process.cwd(), "src/site/employer-maintien/calculator.tsx"),
      "utf8",
    );
    expect(calc).not.toContain("Je confirme remplir les conditions principales");
    expect(calc).toContain("Montant brut estimé");
    expect(calc).not.toContain("an(s)");
    expect(calc).not.toContain("jour(s)");
    expect(calc).toContain("formatLongDateFr");
  });

  it("aligne FAQ visible, GEO et méthodologie", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain(EMPLOYER_MAINTIEN_METHODOLOGY_NOTE);
    expect(blob).toContain(EMPLOYER_MAINTIEN_ROUNDING_NOTE);
    expect(blob).toContain(
      "Dans le cas général d'une maladie ou d'un accident non professionnel, le complément légal de l'employeur commence au huitième jour d'absence.",
    );
    expect(blob).toContain(
      "Cette exception ne s'applique pas à l'accident de trajet",
    );
    expect(blob).not.toContain("plusieurs arrêts dans l'année");
    expect(guide.faq.some((item) => item.question.includes("douze mois"))).toBe(true);
    expect(
      guide.faq.some((item) =>
        item.question.includes("délai de sept jours du complément employeur"),
      ),
    ).toBe(true);
    const ninety = guide.faq.find((item) => item.question.includes("90 %"));
    expect(ninety?.answer.startsWith("Non. Les 90 % correspondent")).toBe(true);
    expect(
      guide.faq.some((item) =>
        item.question.includes("complément employeur brut correspond-il"),
      ),
    ).toBe(true);
    expect(blob).toContain("code.travail.gouv.fr/code-du-travail/d1226-3");
    expect(blob).toContain("code.travail.gouv.fr/code-du-travail/d1226-7");
  });
});
