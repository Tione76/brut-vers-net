import { describe, expect, it } from "vitest";
import { getGuideBySlug, getGuidePublicPath, guides } from "@/site/guides/registry";
import {
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
  SICK_LEAVE_H1,
  SICK_LEAVE_HEADER_PRIMARY_CTA,
  SICK_LEAVE_HEADER_SECONDARY_CTA,
  SICK_LEAVE_HOW_TO_SECTION_ID,
  SICK_LEAVE_LIMITS_SECTION_ID,
  SICK_LEAVE_META_DESCRIPTION,
  SICK_LEAVE_PATH,
  SICK_LEAVE_PERIMETER_FOLLOW,
  SICK_LEAVE_PERIMETER_KICKER,
  SICK_LEAVE_PERIMETER_NOTE,
  SICK_LEAVE_PERIMETER_VALUE,
  SICK_LEAVE_PUBLISHED_AT,
  SICK_LEAVE_SEO_TITLE,
  SICK_LEAVE_SLUG,
  SICK_LEAVE_SOURCES,
  SICK_LEAVE_SUBTITLE,
  SICK_LEAVE_UPDATED_AT,
  calculateSickLeaveSalary,
  formatEuro,
  buildSickLeaveCopySummary,
} from "@/site/sick-leave";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { siteConfig } from "@/site/site.config";
import { seoConfig } from "@/site/seo.config";
import { buildPageMetadata } from "@/framework/seo/metadata";

const MOJIBAKE_RE = /âœ|â–|Ã©|Ã¨|Ã |Â |â€|�/;
const COVER_SRC = "/images/covers/guides/salaire-arret-maladie.webp";
const COVER_ABSOLUTE = `https://www.brut-vers-net.fr${COVER_SRC}`;
const COVER_CREDIT = "Photo de Gustavo Fring via Pexels";
const COVER_ALT =
  "Homme en veste et écharpe se mouchant à un bureau lumineux, avec ordinateur portable, mouchoirs et casque audio";

describe("page salaire arrêt maladie", () => {
  const slug = SICK_LEAVE_SLUG;
  const path = SICK_LEAVE_PATH;

  it("est enregistrée avec le chemin public dédié", () => {
    const guide = getGuideBySlug(slug);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(path);
    expect(guides.some((item) => item.slug === slug)).toBe(true);
  });

  it("est présente dans la navigation et le hub", () => {
    expect(guidesNavigation.some((item) => item.slug === slug)).toBe(true);
    expect(guidesNavigation.find((item) => item.slug === slug)?.shortTitle).toBe(
      "Salaire en arrêt maladie (privé)",
    );
    expect(getGuideHubTeaser(slug)).toBeTruthy();
  });

  it("est présente une seule fois dans Nos outils et sur /nos-outils", () => {
    const toolNavHits = toolsNavigation.filter((item) => item.href === path);
    expect(toolNavHits).toHaveLength(1);
    expect(toolNavHits[0]?.shortTitle).toBe("Simulateur de salaire en arrêt maladie (privé)");
    const calcHits = getAllCalculators().filter((item) => item.path === path);
    expect(calcHits).toHaveLength(1);
    expect(calcHits[0]?.shortTitle).toBe("Simulateur de salaire en arrêt maladie");
    expect(calcHits[0]?.cover.src).toBe(COVER_SRC);
  });

  it("expose le title, le H1 et la meta description imposés", () => {
    const guide = getGuideBySlug(slug)!;
    expect(SICK_LEAVE_SEO_TITLE).toBe(
      "Salaire en arrêt maladie dans le privé : montant et simulateur",
    );
    expect(SICK_LEAVE_H1).toBe(
      "Salaire en arrêt maladie dans le privé : combien allez-vous toucher ?",
    );
    expect(SICK_LEAVE_SUBTITLE).toBe(
      "Estimez votre revenu pendant un arrêt maladie (IJSS et complément employeur) et consultez les règles de calcul applicables aux salariés du privé.",
    );
    expect(guide.title).toBe(SICK_LEAVE_H1);
    expect(guide.seoTitle).toBe(SICK_LEAVE_SEO_TITLE);
    expect(guide.seoTitle).not.toBe(guide.title);
    expect(guide.subtitle).toBe(SICK_LEAVE_SUBTITLE);
    expect(guide.description).toBe(SICK_LEAVE_META_DESCRIPTION);
    expect(guide.publishedAt).toBe(SICK_LEAVE_PUBLISHED_AT);
    expect(guide.updatedAt).toBe(SICK_LEAVE_UPDATED_AT);
    expect(JSON.stringify(guide)).not.toContain("\u2014");
    expect(guide.seoTitle).not.toContain("| Brut vers Net");

    const metadata = buildPageMetadata(siteConfig, seoConfig, {
      title: guide.seoTitle ?? guide.title,
      description: guide.description,
      path,
      openGraphType: "article",
    });
    expect(metadata.title).toEqual({ absolute: SICK_LEAVE_SEO_TITLE });
    expect(metadata.openGraph?.title).toBe(SICK_LEAVE_SEO_TITLE);
    expect(metadata.openGraph?.url).toBe(`https://www.brut-vers-net.fr${path}`);
    expect((metadata.twitter as { title?: string } | undefined)?.title).toBe(
      SICK_LEAVE_SEO_TITLE,
    );
    expect(metadata.alternates?.canonical).toBe(
      `https://www.brut-vers-net.fr${path}`,
    );
  });

  it("est indexable et présente dans sitemap et plan du site", () => {
    expect(isPathIndexable(path)).toBe(true);
    expect(getSitemapEntries().filter((entry) => entry.path === path)).toHaveLength(1);
    expect(JSON.stringify(getPlanDuSiteSections())).toContain(path);
  });

  it("produit un Schema Article + Breadcrumb + FAQ synchronisée", () => {
    const guide = getGuideBySlug(slug)!;
    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const article = graph.find((node) => node["@type"] === "Article") as Record<string, unknown>;
    const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList");
    const faqPage = graph.find((node) => node["@type"] === "FAQPage") as {
      mainEntity?: { name: string; acceptedAnswer?: { text: string } }[];
    };
    expect(article.headline).toBe(SICK_LEAVE_H1);
    const webpage = graph.find((node) => node["@type"] === "WebPage") as Record<
      string,
      unknown
    >;
    expect(webpage?.name).toBe(SICK_LEAVE_H1);
    expect(graph.some((node) => node["@type"] === "WebApplication")).toBe(false);
    expect(article.description).toBe(SICK_LEAVE_META_DESCRIPTION);
    expect(article.url).toBe(`https://www.brut-vers-net.fr${path}`);
    expect(breadcrumb).toBeTruthy();
    expect(faqPage.mainEntity?.map((item) => item.name)).toEqual(
      guide.faq.map((item) => item.question),
    );
    expect(guide.faq.length).toBeGreaterThanOrEqual(15);
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
    expect(getCoverLicenseUrl(cover!.credit)).toBe(PEXELS_LICENSE_URL);

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const article = graph.find((node) => node["@type"] === "Article") as Record<string, unknown>;
    const webpage = graph.find((node) => node["@type"] === "WebPage") as Record<string, unknown>;
    const image = graph.find(
      (node) => node["@id"] === `https://www.brut-vers-net.fr${path}#primaryimage`,
    ) as Record<string, unknown>;
    const author = article.author as { "@id"?: string };
    const person = graph.find((node) => node["@id"] === author?.["@id"]) as {
      name?: string;
    };

    expect(article.image).toEqual({
      "@id": `https://www.brut-vers-net.fr${path}#primaryimage`,
    });
    expect(webpage.primaryImageOfPage).toEqual({
      "@id": `https://www.brut-vers-net.fr${path}#primaryimage`,
    });
    expect(image?.["@type"]).toBe("ImageObject");
    expect(image?.url).toBe(COVER_ABSOLUTE);
    expect(image?.contentUrl).toBe(COVER_ABSOLUTE);
    expect(image?.width).toBe(1200);
    expect(image?.height).toBe(800);
    expect(image?.encodingFormat).toBe("image/webp");
    expect(image?.creditText).toBe(COVER_CREDIT);
    expect(image?.representativeOfPage).toBe(true);
    expect((image?.creator as { name?: string })?.name).toBe("Gustavo Fring");
    expect(person?.name).toBe(SITE_AUTHOR.name);
    expect(JSON.stringify(graph)).not.toContain("localhost");
  });

  it("utilise les libellés brut/net clarifiés", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("total brut estimé");
    expect(blob).toContain("revenu brut théorique");
    expect(blob).toContain("perte brute indicative");
    expect(blob).toMatch(/ALD exonérante|affection de longue durée exonérante/i);
    expect(blob).not.toMatch(/affection de longue durée sont exonérées/i);
    expect(blob).toContain(SICK_LEAVE_SOURCES.cssR3234.href);
    const sample = calculateSickLeaveSalary({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      ijssCarenceMode: "standard3Days",
      employerComplementMode: "legalMinimum",
      seniorityYears: 3,
      employerEligibilityConfirmed: true,
      subrogation: "yes",
    })!;
    expect(sample.dailyIjssGross).toBe(32.87);
    expect(sample.ijssIndemnifiedDays).toBe(11);
    expect(sample.ijssGrossTotal).toBe(361.57);
    expect(sample.employerComplementDays).toBe(7);
    expect(sample.employerComplementGrossTotal).toBe(184.16);
    const summary = buildSickLeaveCopySummary(sample);
    expect(summary).toContain("Total brut estimé");
    expect(summary).toContain("Perte brute indicative");
    expect(summary).not.toMatch(/Total estimé période/);
  });

  it("ne contient pas de mojibake dans le guide ni dans les sources calculateur", () => {
    const guide = getGuideBySlug(slug)!;
    expect(JSON.stringify(guide)).not.toMatch(MOJIBAKE_RE);
    const calcFiles = [
      "src/site/sick-leave/SickLeaveSalaryCalculator.tsx",
      "src/site/sick-leave/sick-leave.css",
      "src/site/sick-leave/data.ts",
      "src/site/guides/data/salaire-arret-maladie.ts",
      "src/app/salaire-arret-maladie/page.tsx",
      "src/site/guides/guide-tool-band.css",
    ];
    for (const relative of calcFiles) {
      const content = readFileSync(join(process.cwd(), relative), "utf8");
      expect(content, relative).not.toMatch(MOJIBAKE_RE);
      expect(content, relative).not.toContain("âœ");
      expect(content, relative).not.toContain("â–");
    }
  });

  it("place une intro courte avant le simulateur et l'exemple après l'image", () => {
    const guide = getGuideBySlug(slug)!;
    expect(guide.introduction).toHaveLength(1);
    expect(guide.introduction[0]).toContain("IJSS à partir du 4e jour");
    expect(guide.introduction[0]).not.toContain("361,57");
    expect(guide.introduction[0]).not.toContain("545,72");
    const example = guide.sections.find((section) => section.id === "reponse-courte");
    expect(example?.title).toContain("Exemple rapide");
    const lead = JSON.stringify(example);
    expect(lead).toContain("IJSS brutes");
    expect(lead).toContain("Complément employeur brut");
    expect(lead).toContain("Total brut estimé");
    expect(lead).toMatch(/Perte brute indicative/i);
    expect(lead).toMatch(/IJSS nettes indicatives/i);
  });

  it("synchronise le sommaire avec la FAQ et la conclusion", () => {
    const guide = getGuideBySlug(slug)!;
    const toc = buildGuideTocH2(guide);
    expect(toc.some((entry) => entry.id === "questions-frequentes")).toBe(true);
    expect(toc.find((entry) => entry.id === "conclusion")?.title).toContain("arrêt maladie");
    expect(guide.conclusion.keyPoints).toEqual([]);
  });

  it("cite les sources officielles et les notions GEO clés", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    for (const source of Object.values(SICK_LEAVE_SOURCES)) {
      expect(blob).toContain(source.href);
    }
    expect(blob).toContain("91,25");
    expect(blob).toContain("50 %");
    expect(blob).toMatch(/3 jours|trois jours/);
    expect(blob).toMatch(/7 jours|sept jours|8e jour|huitième/);
    expect(blob).toContain("90 %");
    expect(blob).toMatch(/66,66|2\/3|deux tiers/i);
    expect(blob).toContain("subrogation");
    expect(blob).toMatch(/2[\u00a0\u202f ]?613,83/);
    expect(blob).toContain("32,87");
    expect(blob).toContain("/calcul-ijss-arret-maladie");
    expect(blob).toContain("/maintien-salaire-arret-maladie");
    expect(blob).toContain("Comprendre le calcul du complément légal employeur");
  });

  it("aligne les exemples éditoriaux sur le moteur", () => {
    const sample = calculateSickLeaveSalary({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-01",
      stopEndIso: "2026-09-07",
      ijssCarenceMode: "standard3Days",
      employerComplementMode: "none",
      seniorityYears: 0,
      employerEligibilityConfirmed: false,
      subrogation: "unknown",
    })!;
    expect(sample.dailyIjssGross).toBe(32.87);
    expect(sample.ijssIndemnifiedDays).toBe(4);
    const guide = getGuideBySlug(slug)!;
    expect(JSON.stringify(guide)).toContain(formatEuro(sample.dailyIjssGross));
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
      expect(
        isPathIndexable(href) ||
          href === "/smic" ||
          href === "/salaire-interim-calcul-brut-net" ||
          href === "/guides" ||
          href === "/calculateurs/salaire-heures-supplementaires",
      ).toBe(true);
    }
  });

  it("ajoute les deux sections hybrides au guide et au sommaire", () => {
    const guide = getGuideBySlug(slug)!;
    const toc = buildGuideTocH2(guide);
    expect(toc[0]).toEqual({
      id: SICK_LEAVE_HOW_TO_SECTION_ID,
      title: "Comment utiliser le simulateur de salaire en arrêt maladie ?",
      level: 2,
    });
    expect(toc[1]).toEqual({
      id: SICK_LEAVE_LIMITS_SECTION_ID,
      title: "Quelles sont les limites du simulateur de salaire en arrêt maladie ?",
      level: 2,
    });
    expect(toc.some((entry) => entry.id === "comment-est-paye-un-arret-maladie")).toBe(
      true,
    );
    expect(JSON.stringify(guide)).toContain(
      "Le bulletin de paie, l'attestation de salaire, la convention collective, le relevé Ameli et la décision de la CPAM restent les références pour connaître les montants réellement dus et versés.",
    );
    const howTo = guide.sections.find(
      (section) => section.id === SICK_LEAVE_HOW_TO_SECTION_ID,
    );
    const howToSteps = howTo?.blocks?.find((block) => block.type === "steps");
    expect(howToSteps?.type).toBe("steps");
    expect(howToSteps && howToSteps.type === "steps" ? howToSteps.items : []).toHaveLength(
      6,
    );
    const ijssSection = guide.sections.find((section) => section.id === "calcul-des-ijss-maladie");
    const ijssList = ijssSection?.blocks?.find((block) => block.type === "list");
    expect(ijssList && ijssList.type === "list" ? ijssList.ordered : true).toBe(false);
    expect(ijssList && ijssList.type === "list" ? ijssList.items : []).toHaveLength(5);
  });

  it("place le sommaire après le simulateur, hors du bandeau", () => {
    const pageSource = readFileSync(
      join(process.cwd(), "src/app/salaire-arret-maladie/page.tsx"),
      "utf8",
    );
    expect(pageSource).toContain("<SickLeaveSalaryCalculator />");
    expect(pageSource).toContain("SickLeaveClusterNav");
    expect(pageSource).toContain('current="revenu"');
    expect(pageSource).toContain("afterToc=");
    expect(pageSource).toContain('tocPlacement="after-slot"');
    expect(pageSource).not.toMatch(/afterIntroduction=\{<SickLeaveSalaryCalculator/);
    expect(pageSource).toContain("SICK_LEAVE_HEADER_PRIMARY_CTA");
    expect(pageSource).toContain("SICK_LEAVE_HEADER_SECONDARY_CTA");
    expect(pageSource).toContain("headerActions");
    expect(SICK_LEAVE_HEADER_PRIMARY_CTA).toBe("Estimer mon salaire");
    expect(SICK_LEAVE_HEADER_SECONDARY_CTA).toBe(
      "Comprendre le calcul et les règles",
    );
    expect(pageSource.match(/<SickLeaveSalaryCalculator/g)).toHaveLength(1);
    const renderer = readFileSync(
      join(process.cwd(), "src/site/guides/GuideRenderer.tsx"),
      "utf8",
    );
    expect(renderer).toContain("Aller au sommaire");
    expect(renderer).toContain('id = "sommaire"');
    expect(renderer).toContain("guide-toc__mobile");
    expect(renderer).not.toContain("guide-toc__details");
    expect(renderer).toContain("{tocAfterSlot ? tocBlock : null}");
  });

  it("affiche un périmètre AT/MP visible avant les champs du simulateur", () => {
    const calc = readFileSync(
      join(process.cwd(), "src/site/sick-leave/SickLeaveSalaryCalculator.tsx"),
      "utf8",
    );
    const caseIdx = calc.indexOf("sick-leave-calc__case");
    const detailsIdx = calc.indexOf("Ce que calcule cet outil");
    const fieldsetIdx = calc.indexOf("Votre salaire");
    expect(caseIdx).toBeGreaterThan(-1);
    expect(caseIdx).toBeLessThan(detailsIdx);
    expect(caseIdx).toBeLessThan(fieldsetIdx);
    expect(calc).toContain("SICK_LEAVE_PERIMETER_KICKER");
    expect(calc).toContain("SICK_LEAVE_PERIMETER_VALUE");
    expect(calc).toContain("SICK_LEAVE_PERIMETER_FOLLOW");
    expect(SICK_LEAVE_PERIMETER_NOTE).toContain("maladie ou accident non professionnel");
    expect(SICK_LEAVE_PERIMETER_VALUE).toContain("maladie ou accident non professionnel");
    expect(SICK_LEAVE_PERIMETER_FOLLOW).toContain("accidents du travail");
    expect(SICK_LEAVE_PERIMETER_FOLLOW).toContain("maladies professionnelles");
    expect(SICK_LEAVE_PERIMETER_FOLLOW).toContain("accidents de trajet");
    expect(SICK_LEAVE_PERIMETER_KICKER).toBe("Périmètre de la simulation");
    const guide = getGuideBySlug(slug)!;
    const limits = guide.sections.find((section) => section.id === SICK_LEAVE_LIMITS_SECTION_ID);
    expect(JSON.stringify(limits)).toContain("accident du travail");
    expect(JSON.stringify(limits)).toContain("accident de trajet");
    expect(JSON.stringify(limits)).toContain("maladie professionnelle");
    const css = [
      readFileSync(join(process.cwd(), "src/site/guides/guide-tool-band.css"), "utf8"),
      readFileSync(join(process.cwd(), "src/site/sick-leave/sick-leave.css"), "utf8"),
    ].join("\n");
    expect(css).toContain("overflow-x: clip");
    expect(css).toContain("overflow-wrap: anywhere");
    expect(css).toContain("sick-leave-calc__case");
    expect(calc).not.toContain("min-width: 400");
    expect(calc).not.toContain("width: 100vw");
    const sample = calculateSickLeaveSalary({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      ijssCarenceMode: "standard3Days",
      employerComplementMode: "legalMinimum",
      seniorityYears: 3,
      employerEligibilityConfirmed: true,
      subrogation: "yes",
    })!;
    expect(sample.dailyIjssGross).toBe(32.87);
    expect(sample.employerComplementGrossTotal).toBe(184.16);
  });
});
