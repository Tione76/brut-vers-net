import { describe, expect, it } from "vitest";
import { getGuideBySlug, getGuidePublicPath, guides } from "@/site/guides/registry";
import { buildGuideJsonLd } from "@/site/schema";
import { buildGuideTocH2 } from "@/site/guides/utils";
import { getGuideHubTeaser } from "@/site/guides/guides-hub-data";
import { getPlanDuSiteSections, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import { guidesNavigation } from "@/site/guides/navigation";
import { toolsNavigation } from "@/site/navigation/tools";
import { getAllCalculators } from "@/site/navigation/calculators-registry";
import { SITE_AUTHOR } from "@/site/author";
import {
  IJSS_H1,
  IJSS_HEADER_PRIMARY_CTA,
  IJSS_HEADER_SECONDARY_CTA,
  IJSS_HOW_TO_SECTION_ID,
  IJSS_LIMITS_SECTION_ID,
  IJSS_META_DESCRIPTION,
  IJSS_PATH,
  IJSS_PERIMETER_FOLLOW,
  IJSS_PERIMETER_KICKER,
  IJSS_PERIMETER_NOTE,
  IJSS_PERIMETER_VALUE,
  IJSS_PUBLISHED_AT,
  IJSS_SEO_TITLE,
  IJSS_SLUG,
  IJSS_SOURCES,
  IJSS_SUBTITLE,
  IJSS_UPDATED_AT,
  IJSS_HUB_CARD_TITLE,
  SALARY_DURING_SICK_LEAVE_PATH,
} from "@/site/ijss";
import {
  calculateSickLeaveSalary,
  formatEuro,
} from "@/site/sick-leave";
import {
  PEXELS_LICENSE_URL,
  coverToOgInput,
  formatCoverCredit,
  getCoverLicenseUrl,
  getGuideCoverByHref,
  resolveGuideCover,
} from "@/site/guides/covers";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { siteConfig } from "@/site/site.config";
import { seoConfig } from "@/site/seo.config";
import { buildPageMetadata } from "@/framework/seo/metadata";

const MOJIBAKE_RE = /âœ|â–|Ã©|Ã¨|Ã |Â |â€|�/;

describe("page calcul IJSS arrêt maladie", () => {
  const slug = IJSS_SLUG;
  const path = IJSS_PATH;

  it("est enregistrée avec le chemin public dédié", () => {
    const guide = getGuideBySlug(slug);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(path);
    expect(guides.some((item) => item.slug === slug)).toBe(true);
  });

  it("expose le title, le H1 et la meta description imposés", () => {
    const guide = getGuideBySlug(slug)!;
    expect(IJSS_SEO_TITLE).toBe(
      "IJSS en arrêt maladie dans le privé : calcul et simulateur",
    );
    expect(IJSS_H1).toBe("Calculez vos IJSS en arrêt maladie (secteur privé) — barème 2026");
    expect(IJSS_SUBTITLE).toBe(
      "Estimez vos indemnités journalières de Sécurité sociale et consultez les règles de calcul, la carence et le plafond applicables aux salariés du privé.",
    );
    expect(guide.title).toBe(IJSS_H1);
    expect(guide.seoTitle).toBe(IJSS_SEO_TITLE);
    expect(guide.subtitle).toBe(IJSS_SUBTITLE);
    expect(guide.description).toBe(IJSS_META_DESCRIPTION);
    expect(guide.publishedAt).toBe(IJSS_PUBLISHED_AT);
    expect(guide.updatedAt).toBe(IJSS_UPDATED_AT);
    expect(JSON.stringify(guide).replaceAll(IJSS_H1, "")).not.toContain("\u2014");
    expect(guide.seoTitle).not.toContain("| Brut vers Net");
    expect(IJSS_META_DESCRIPTION.length).toBeGreaterThan(110);
    expect(IJSS_META_DESCRIPTION.length).toBeLessThan(160);

    const metadata = buildPageMetadata(siteConfig, seoConfig, {
      title: guide.seoTitle ?? guide.title,
      description: guide.description,
      path,
      openGraphType: "article",
    });
    expect(metadata.title).toEqual({ absolute: IJSS_SEO_TITLE });
    expect(metadata.openGraph?.title).toBe(IJSS_SEO_TITLE);
    expect(metadata.openGraph?.url).toBe(`https://www.brut-vers-net.fr${path}`);
    expect((metadata.twitter as { title?: string } | undefined)?.title).toBe(
      IJSS_SEO_TITLE,
    );
    expect(metadata.alternates?.canonical).toBe(
      `https://www.brut-vers-net.fr${path}`,
    );
  });

  it("est présente dans Nos guides, Nos outils et les hubs", () => {
    expect(guidesNavigation.find((item) => item.slug === slug)?.shortTitle).toBe(
      "Calcul des IJSS (privé)",
    );
    expect(getGuideHubTeaser(slug)).toBeTruthy();
    const toolHits = toolsNavigation.filter((item) => item.href === path);
    expect(toolHits).toHaveLength(1);
    expect(toolHits[0]?.shortTitle).toBe("Calculateur d'IJSS en arrêt maladie (privé)");
    expect(getAllCalculators().filter((item) => item.path === path)).toHaveLength(1);
  });

  it("est indexable une seule fois dans le sitemap", () => {
    expect(isPathIndexable(path)).toBe(true);
    expect(getSitemapEntries().filter((entry) => entry.path === path)).toHaveLength(1);
    expect(JSON.stringify(getPlanDuSiteSections())).toContain(path);
  });

  it("produit un Schema Article + Breadcrumb + FAQ sans MedicalWebPage", () => {
    const guide = getGuideBySlug(slug)!;
    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const article = graph.find((node) => node["@type"] === "Article") as Record<string, unknown>;
    const webpage = graph.find((node) => node["@type"] === "WebPage");
    const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList");
    const faqPage = graph.find((node) => node["@type"] === "FAQPage") as {
      mainEntity?: { name: string }[];
    };
    expect(article.headline).toBe(IJSS_H1);
    expect((webpage as { name?: string }).name).toBe(IJSS_H1);
    expect(article.description).toBe(IJSS_META_DESCRIPTION);
    expect(article.url).toBe(`https://www.brut-vers-net.fr${path}`);
    expect(webpage).toBeTruthy();
    expect(breadcrumb).toBeTruthy();
    expect(faqPage.mainEntity?.map((item) => item.name)).toEqual(
      guide.faq.map((item) => item.question),
    );
    const faqAnswers = (faqPage.mainEntity as { acceptedAnswer?: { text?: string } }[]).map(
      (item) => item.acceptedAnswer?.text,
    );
    expect(faqAnswers).toEqual(guide.faq.map((item) => item.answer));
    expect(guide.faq.length).toBeGreaterThanOrEqual(8);
    expect(guide.faq.length).toBeLessThanOrEqual(10);
    expect(JSON.stringify(graph)).not.toContain("localhost");
    expect(JSON.stringify(graph)).not.toMatch(/MedicalWebPage|MedicalCondition|SoftwareApplication/);
    const webApp = graph.find((node) => node["@type"] === "WebApplication") as Record<
      string,
      unknown
    >;
    expect(webApp.name).toBe("Calculateur d'IJSS en arrêt maladie");
    expect(webApp.name).not.toBe(IJSS_H1);
    expect(webApp.name).not.toBe(IJSS_SEO_TITLE);
    expect(webApp.operatingSystem).toBe("Any");
    expect(webApp.isAccessibleForFree).toBe(true);
    expect(webApp.offers).toEqual({
      "@type": "Offer",
      price: 0,
      priceCurrency: "EUR",
    });
    expect(webpage).toBeTruthy();
    expect((webpage as { mainEntity?: { "@id"?: string } }).mainEntity?.["@id"]).toContain(
      "#article",
    );
    const author = article.author as { "@id"?: string };
    const person = graph.find((node) => node["@id"] === author?.["@id"]) as {
      name?: string;
    };
    expect(person?.name).toBe(SITE_AUTHOR.name);
  });

  it("attache la couverture kaboompics.com et un ImageObject unique", () => {
    const guide = getGuideBySlug(slug)!;
    const cover = resolveGuideCover(guide)!;
    const coverSrc = "/images/covers/guides/calcul-ijss-prive.webp";
    const absoluteCover = `https://www.brut-vers-net.fr${coverSrc}`;
    const diskPath = join(process.cwd(), "public", coverSrc.replace(/^\//, ""));
    const creditExact = "Photo de kaboompics.com via Pexels";

    expect(existsSync(diskPath)).toBe(true);
    expect(statSync(diskPath).size).toBeGreaterThan(0);
    expect(
      existsSync(join(process.cwd(), "public/images/covers/guides/calcul-IJSS-privé.webp")),
    ).toBe(false);
    expect(cover.src).toBe(coverSrc);
    expect(guide.coverImage?.src).toBe(coverSrc);
    expect(getGuideCoverByHref(path)?.src).toBe(coverSrc);
    expect(cover.src).not.toMatch(/[A-Z]/);
    expect(cover.src).not.toContain(" ");
    expect(cover.width).toBe(1200);
    expect(cover.height).toBe(800);
    expect(cover.alt).toBe(
      "Calcul des indemnités journalières de Sécurité sociale pendant un arrêt maladie",
    );
    expect(cover.caption).toBe(
      "Calcul des IJSS en arrêt maladie dans le secteur privé",
    );
    expect(formatCoverCredit(cover.credit)).toBe(creditExact);
    expect(cover.credit.photographer).toBe("kaboompics.com");
    expect(cover.credit.source).toBe("Pexels");
    expect(getCoverLicenseUrl(cover.credit)).toBe(PEXELS_LICENSE_URL);

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
    expect(image?.url).toBe(absoluteCover);
    expect(image?.contentUrl).toBe(absoluteCover);
    expect(image?.width).toBe(1200);
    expect(image?.height).toBe(800);
    expect(image?.encodingFormat).toBe("image/webp");
    expect(image?.caption).toBe(cover.caption);
    expect(image?.creditText).toBe(creditExact);
    expect(image?.representativeOfPage).toBe(true);
    expect((image?.creator as { name?: string })?.name).toBe("kaboompics.com");
    expect(JSON.stringify(graph)).not.toContain("localhost");
    expect(JSON.stringify(graph)).not.toMatch(/calcul-IJSS|priv%C3%A9|privÃ/);

    const og = coverToOgInput(cover);
    expect(og.url).toBe(coverSrc);
    expect(og.width).toBe(1200);
    expect(og.height).toBe(800);
    expect(og.alt).toBe(cover.alt);
    expect(og.type).toBe("image/webp");
    expect(getAllCalculators().find((item) => item.path === path)?.cover.src).toBe(
      coverSrc,
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
      url: absoluteCover,
      width: 1200,
      height: 800,
      alt: cover.alt,
      type: "image/webp",
    });
    const twitter = metadata.twitter as
      | { card?: string; images?: Array<string | { url?: string; alt?: string }> | string }
      | undefined;
    expect(twitter?.card).toBe("summary_large_image");
    const twitterImages = twitter?.images;
    const twitterEntry = Array.isArray(twitterImages) ? twitterImages[0] : twitterImages;
    expect(twitterEntry).toMatchObject({
      url: absoluteCover,
      alt: cover.alt,
    });
    expect(JSON.stringify(metadata)).not.toContain("localhost");
  });

  it("maille vers et depuis la page salaire en arrêt maladie", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain(SALARY_DURING_SICK_LEAVE_PATH);
    expect(blob).toContain("/maintien-salaire-arret-maladie");
    expect(blob).toContain("calculer le complément versé par votre employeur");
    expect(blob).toContain("estimer votre revenu total pendant l'arrêt maladie");
    expect(blob).toContain("Vérifier le complément employeur");
    expect(guide.conclusion.closingSecondaryLinks?.map((link) => link.href)).toEqual([
      "/maintien-salaire-arret-maladie",
      "/salaire-arret-maladie",
    ]);
    const general = getGuideBySlug("salaire-arret-maladie")!;
    expect(JSON.stringify(general)).toContain(path);
  });

  it("cite la formule, la carence, le plafond et R323-4 actuel", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("91,25");
    expect(blob).toContain("50 %");
    expect(blob).toMatch(/3 jours|trois jours/);
    expect(blob).toContain("6,2");
    expect(blob).toContain("0,5");
    expect(blob).not.toContain("6.2 %");
    expect(blob).not.toContain("0.5 %");
    expect(blob).toContain(IJSS_SOURCES.cssR3234.href);
    expect(blob).toContain("LEGIARTI000051226486");
    expect(blob).toContain(IJSS_SOURCES.cssR3235.href);
    expect(IJSS_SOURCES.cssR3235.href).toContain("legifrance.gouv.fr");
    expect(blob).not.toContain("doctrine.fr");
    expect(blob).toContain(IJSS_SOURCES.smicJuin2026.href);
    expect(IJSS_SOURCES.smicJuin2026.href).toContain("JORFTEXT000054126589");
    expect(blob).not.toContain("revalorisation-annuelle-du-smic-au-1er-janvier-2026");
    expect(blob).not.toContain("2 552,24");
    expect(blob).toContain("incohérence");
    expect(blob).toContain("article R323-4");
    expect(blob).toContain("1 015");
    expect(blob).toContain("2 030");
    expect(blob).toContain("salaire rétabli");
    expect(blob).toContain("365");
    expect(blob).toMatch(/ne dépendent pas du statut cadre|indépendamment du statut cadre/i);
    expect(blob).not.toMatch(/selon que vous êtes cadre/i);
    expect(blob).not.toMatch(/les reverse/);
    expect(blob).not.toContain("LEGIARTI000006750009");
    expect(blob).toMatch(/ne dépendent pas du statut cadre|indépendamment du statut cadre/i);
    expect(blob).not.toMatch(/selon que vous êtes cadre/i);
  });

  it("aligne les exemples sur le moteur partagé", () => {
    const sample = calculateSickLeaveSalary({
      monthlyGrossUsual: 2000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      ijssCarenceMode: "standard3Days",
      employerComplementMode: "none",
      seniorityYears: 0,
      employerEligibilityConfirmed: false,
      subrogation: "unknown",
    })!;
    expect(sample.dailyIjssGross).toBe(32.87);
    expect(sample.ijssIndemnifiedDays).toBe(11);
    expect(sample.ijssGrossTotal).toBe(361.57);
    expect(sample.employerComplementGrossTotal).toBe(0);
    const capped = calculateSickLeaveSalary({
      monthlyGrossUsual: 4000,
      stopStartIso: "2026-09-07",
      stopEndIso: "2026-09-20",
      ijssCarenceMode: "standard3Days",
      employerComplementMode: "none",
      seniorityYears: 0,
      employerEligibilityConfirmed: false,
      subrogation: "unknown",
    })!;
    expect(capped.dailyIjssGross).toBe(42.96);
    expect(capped.bareme.maxDailyIjssGross).toBe(42.97);
    const guide = getGuideBySlug(slug)!;
    expect(JSON.stringify(guide)).toContain("42,96");
    expect(JSON.stringify(guide)).toContain("42,97");
    expect(JSON.stringify(guide)).toContain("plafond officiel publié");
    expect(JSON.stringify(guide)).toContain(
      "Un écart d'un centime peut exister selon la méthode d'arrondi utilisée par la CPAM.",
    );
    const examplesTable = guide.sections
      .find((section) => section.id === "exemples-calcul-ijss")
      ?.blocks?.find((block) => block.type === "table" && "headers" in block && block.headers.includes("Situation"));
    expect(examplesTable && examplesTable.type === "table" ? examplesTable.headers : []).toEqual([
      "Situation",
      "Carence",
      "Jours indemnisés",
      "IJ journalière estimée",
      "Total brut",
      "Après CSG/CRDS",
    ]);
    expect(
      examplesTable && examplesTable.type === "table" ? examplesTable.rows[0]?.length : 0,
    ).toBe(6);
    const durationTable = guide.sections
      .find((section) => section.id === "compter-les-jours-indemnises")
      ?.blocks?.find((block) => block.type === "table");
    expect(durationTable && durationTable.type === "table" ? durationTable.headers[0] : "").toBe(
      "Durée",
    );
    expect(JSON.stringify(guide)).not.toContain("85,93 × 50 %");
    const calcSource = readFileSync(
      join(process.cwd(), "src/site/ijss/IjssCalculator.tsx"),
      "utf8",
    );
    expect(calcSource).toContain("IJ journalière brute estimée");
    expect(calcSource).toContain(
      "Un écart d&apos;un centime peut exister avec le relevé de la CPAM.",
    );
    expect(calcSource).not.toContain(
      "L&apos;IJ journalière affichée est une estimation calculée",
    );
    expect(JSON.stringify(guide)).toContain(formatEuro(sample.ijssGrossTotal));
    expect(JSON.stringify(guide)).toContain(formatEuro(sample.ijssNetIndicativeTotal));
  });

  it("ne contient pas de mojibake", () => {
    const guide = getGuideBySlug(slug)!;
    expect(JSON.stringify(guide)).not.toMatch(MOJIBAKE_RE);
    for (const relative of [
      "src/site/ijss/IjssCalculator.tsx",
      "src/site/ijss/data.ts",
      "src/site/ijss/ijss-calculator.css",
      "src/site/guides/guide-tool-band.css",
      "src/app/calcul-ijss-arret-maladie/page.tsx",
      "src/site/guides/data/calcul-ijss-arret-maladie.ts",
      "src/site/guides/covers.ts",
    ]) {
      const content = readFileSync(join(process.cwd(), relative), "utf8");
      expect(content, relative).not.toMatch(MOJIBAKE_RE);
    }
  });

  it("synchronise le sommaire avec la FAQ", () => {
    const guide = getGuideBySlug(slug)!;
    const toc = buildGuideTocH2(guide);
    expect(toc.some((entry) => entry.id === "questions-frequentes")).toBe(true);
    expect(guide.breadcrumbLabel).toBe("Calcul des IJSS");
    expect(IJSS_HUB_CARD_TITLE).toContain("IJSS");
  });

  it("ajoute les deux sections hybrides au guide et au sommaire", () => {
    const guide = getGuideBySlug(slug)!;
    const toc = buildGuideTocH2(guide);
    expect(toc[0]).toEqual({
      id: IJSS_HOW_TO_SECTION_ID,
      title: "Comment utiliser le calculateur d'IJSS ?",
      level: 2,
    });
    expect(toc[1]).toEqual({
      id: IJSS_LIMITS_SECTION_ID,
      title: "Quelles sont les limites du calculateur d'IJSS ?",
      level: 2,
    });
    expect(toc.some((entry) => entry.id === "comment-calculer-les-ijss")).toBe(
      true,
    );
    expect(JSON.stringify(guide)).toContain(
      "Le relevé de paiement Ameli, l'attestation de salaire transmise par l'employeur et la décision de la CPAM restent les références pour connaître le montant réellement versé.",
    );
    const howTo = guide.sections.find((section) => section.id === IJSS_HOW_TO_SECTION_ID);
    const howToSteps = howTo?.blocks?.find((block) => block.type === "steps");
    expect(howToSteps?.type).toBe("steps");
    expect(howToSteps && howToSteps.type === "steps" ? howToSteps.items : []).toHaveLength(
      5,
    );
    const formula = guide.sections.find((section) => section.id === "comment-calculer-les-ijss");
    const formulaList = formula?.blocks?.find((block) => block.type === "list");
    expect(formulaList && formulaList.type === "list" ? formulaList.ordered : true).toBe(
      false,
    );
    expect(formulaList && formulaList.type === "list" ? formulaList.items : []).toHaveLength(
      5,
    );
  });

  it("place le sommaire après le calculateur, hors du bandeau", () => {
    const pageSource = readFileSync(
      join(process.cwd(), "src/app/calcul-ijss-arret-maladie/page.tsx"),
      "utf8",
    );
    expect(pageSource).toContain("<IjssCalculator />");
    expect(pageSource).toContain("SickLeaveClusterNav");
    expect(pageSource).toContain('current="ijss"');
    expect(pageSource).toContain("afterToc=");
    expect(pageSource).toContain('tocPlacement="after-slot"');
    expect(pageSource).not.toContain("afterIntroduction={<IjssCalculator />}");
    expect(pageSource).toContain("IJSS_HEADER_PRIMARY_CTA");
    expect(pageSource).toContain("IJSS_HEADER_SECONDARY_CTA");
    expect(pageSource).toContain("headerActions");
    expect(IJSS_HEADER_PRIMARY_CTA).toBe("Calculer mes IJSS");
    expect(IJSS_HEADER_SECONDARY_CTA).toBe("Comprendre le calcul et les règles");
  });

  it("affiche un périmètre AT/MP visible avant les champs du calculateur", () => {
    const calc = readFileSync(
      join(process.cwd(), "src/site/ijss/IjssCalculator.tsx"),
      "utf8",
    );
    const caseIdx = calc.indexOf("sick-leave-calc__case");
    const detailsIdx = calc.indexOf("Ce que calcule cet outil");
    const fieldsetIdx = calc.indexOf("Votre salaire");
    expect(caseIdx).toBeGreaterThan(-1);
    expect(caseIdx).toBeLessThan(detailsIdx);
    expect(caseIdx).toBeLessThan(fieldsetIdx);
    expect(calc).toContain("IJSS_PERIMETER_KICKER");
    expect(calc).toContain("IJSS_PERIMETER_VALUE");
    expect(calc).toContain("IJSS_PERIMETER_FOLLOW");
    expect(IJSS_PERIMETER_NOTE).toContain("maladie ou accident non professionnel");
    expect(IJSS_PERIMETER_VALUE).toContain("maladie ou accident non professionnel");
    expect(IJSS_PERIMETER_FOLLOW).toContain("accidents du travail");
    expect(IJSS_PERIMETER_FOLLOW).toContain("maladies professionnelles");
    expect(IJSS_PERIMETER_FOLLOW).toContain("accidents de trajet");
    expect(IJSS_PERIMETER_KICKER).toBe("Périmètre du calcul");
    const guide = getGuideBySlug(slug)!;
    const limits = guide.sections.find((section) => section.id === IJSS_LIMITS_SECTION_ID);
    const uncovered = guide.sections.find((section) => section.id === "situations-non-couvertes");
    expect(JSON.stringify(limits)).toContain("accidents du travail");
    expect(JSON.stringify(limits)).toContain("accidents de trajet");
    expect(JSON.stringify(limits)).toContain("maladies professionnelles");
    expect(uncovered?.title).toBe("Situations non couvertes par le calcul standard");
    expect(JSON.stringify(uncovered)).toContain(
      "Accident du travail, accident de trajet et maladie professionnelle",
    );
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
      employerComplementMode: "none",
      seniorityYears: 0,
      employerEligibilityConfirmed: false,
      subrogation: "unknown",
    })!;
    expect(sample.dailyIjssGross).toBe(32.87);
    expect(sample.ijssGrossTotal).toBe(361.57);
  });
});
