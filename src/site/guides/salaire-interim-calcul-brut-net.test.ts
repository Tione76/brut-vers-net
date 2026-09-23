import { describe, expect, it } from "vitest";
import { getGuideBySlug, getGuidePublicPath, guides } from "@/site/guides/registry";
import { buildGuideJsonLd } from "@/site/schema";
import {
  formatCoverCredit,
  getCoverLicenseUrl,
  getGuideCoverByHref,
  PEXELS_LICENSE_URL,
  resolveGuideCover,
} from "@/site/guides/covers";
import { getGuideHubTeaser } from "@/site/guides/guides-hub-data";
import { getPlanDuSiteSections, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import { guidesNavigation } from "@/site/guides/navigation";
import {
  INTERIM_FRESHNESS_LINE,
  INTERIM_H1,
  INTERIM_META_DESCRIPTION,
  INTERIM_PATH,
  INTERIM_PUBLISHED_AT,
  INTERIM_SEO_TITLE,
  INTERIM_SLUG,
  INTERIM_SMIC_MONTHLY_FORMULA_NOTE,
  INTERIM_SOURCES,
  INTERIM_UPDATED_AT,
  INTERIM_DEFAULT_MISSION_GROSS,
  INTERIM_HS_NET_WARNING,
  calculateInterimSalary,
  formatEuro,
  formatEuroApprox,
  SMIC_CURRENT,
} from "@/site/salaire-interim";
import { buildGuideTocH2 } from "@/site/guides/utils";
import { SITE_AUTHOR } from "@/site/author";

describe("page salaire intérim", () => {
  const slug = INTERIM_SLUG;
  const path = INTERIM_PATH;

  it("est enregistrée avec le chemin public dédié", () => {
    const guide = getGuideBySlug(slug);
    expect(guide).toBeTruthy();
    expect(getGuidePublicPath(guide!)).toBe(path);
    expect(guides.some((item) => item.slug === slug)).toBe(true);
  });

  it("est présente dans la navigation guides", () => {
    expect(guidesNavigation.some((item) => item.slug === slug)).toBe(true);
  });

  it("attache la cover Tiger Lily et des métadonnées Schema cohérentes", () => {
    const guide = getGuideBySlug(slug)!;
    const cover = resolveGuideCover(guide);
    const coverSrc = "/images/covers/guides/Salaire-brut-net-interim.webp";
    const absoluteCover =
      "https://www.brut-vers-net.fr/images/covers/guides/Salaire-brut-net-interim.webp";
    const creditExact = "Photo de Tiger Lily via Pexels";

    expect(cover?.src).toBe(coverSrc);
    expect(guide.coverImage?.src).toBe(coverSrc);
    expect(getGuideCoverByHref(path)?.src).toBe(coverSrc);
    expect(cover?.src).not.toContain("Comment-lire-fiche-de-paie");
    expect(cover?.width).toBe(1200);
    expect(cover?.height).toBe(800);
    expect(cover?.alt).toBe(
      "Deux agents logistiques transportant des cartons dans un entrepôt",
    );
    expect(cover?.alt.length).toBeGreaterThan(0);
    expect(cover?.alt.toLowerCase()).not.toContain("tiger lily");
    expect(cover?.alt.toLowerCase()).not.toContain("pexels");
    expect(cover?.alt.toLowerCase()).not.toContain("intérimaire");
    expect(formatCoverCredit(cover!.credit)).toBe(creditExact);
    expect(cover!.credit.photographer).toBe("Tiger Lily");
    expect(cover!.credit.source).toBe("Pexels");
    expect(getCoverLicenseUrl(cover!.credit)).toBe(PEXELS_LICENSE_URL);

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const article = graph.find((node) => node["@type"] === "Article") as Record<string, unknown>;
    const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList");
    const image = graph.find(
      (node) => node["@id"] === `https://www.brut-vers-net.fr${path}#primaryimage`,
    ) as Record<string, unknown>;

    expect(article).toBeTruthy();
    expect(breadcrumb).toBeTruthy();
    expect(article.headline).toBe(INTERIM_H1);
    expect(article.image).toEqual({
      "@id": `https://www.brut-vers-net.fr${path}#primaryimage`,
    });
    expect(image?.["@type"]).toBe("ImageObject");
    expect(image?.url).toBe(absoluteCover);
    expect(image?.contentUrl).toBe(absoluteCover);
    expect(image?.width).toBe(1200);
    expect(image?.height).toBe(800);
    expect(image?.encodingFormat).toBe("image/webp");
    expect(image?.creditText).toBe(creditExact);
    expect(image?.representativeOfPage).toBe(true);
    expect((image?.creator as { "@type"?: string; name: string })?.["@type"]).toBe(
      "Person",
    );
    expect((image?.creator as { name: string })?.name).toBe("Tiger Lily");
    expect(JSON.stringify(graph)).not.toContain("Comment-lire-fiche-de-paie");

    const author = article.author as { "@id"?: string } | undefined;
    expect(author?.["@id"]).toBe("https://www.brut-vers-net.fr/#author");
    const person = graph.find((node) => node["@id"] === author?.["@id"]) as
      | { name?: string }
      | undefined;
    expect(person?.name).toBeTruthy();
    expect(person?.name).not.toBe("Tiger Lily");
  });

  it("expose la cover via Open Graph (coverToOgInput)", async () => {
    const { coverToOgInput } = await import("@/site/guides/covers");
    const cover = resolveGuideCover(getGuideBySlug(slug)!)!;
    const og = coverToOgInput(cover);
    expect(og.url).toBe("/images/covers/guides/Salaire-brut-net-interim.webp");
    expect(og.width).toBe(1200);
    expect(og.height).toBe(800);
    expect(og.alt).toBe(cover.alt);
    expect(og.type).toBe("image/webp");
    expect(og.url).not.toContain("Comment-lire-fiche-de-paie");
  });
  it("est indexable et présente dans sitemap, plan du site et hub guides", () => {
    expect(isPathIndexable(path)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === path)).toBe(true);
    const planBlob = JSON.stringify(getPlanDuSiteSections());
    expect(planBlob).toContain(path);
    expect(getGuideHubTeaser(slug)).toBeTruthy();
  });

  it("expose H1, title et description SEO attendus", () => {
    const guide = getGuideBySlug(slug)!;
    expect(guide.title).toBe(INTERIM_H1);
    expect(guide.seoTitle).toBe(INTERIM_SEO_TITLE);
    expect(guide.description).toBe(INTERIM_META_DESCRIPTION);
    expect(JSON.stringify(guide)).not.toContain("\u2014");
    expect(guide.publishedAt).toBe(INTERIM_PUBLISHED_AT);
    expect(guide.updatedAt).toBe(INTERIM_UPDATED_AT);
    expect(guide.introSummary?.items.some((item) => item.includes("21 %"))).toBe(true);
    expect(guide.introduction.some((p) => p.includes("1 210") || p.includes(formatEuro(1210)))).toBe(
      true,
    );
  });

  it("ne présente pas 12,31 × 151,67 comme origine du SMIC mensuel officiel", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    expect(blob).not.toMatch(/12,31[^"]*151,67[^"]*1\s*867,02/);
    expect(blob).not.toMatch(/151,67[^"]*12,31[^"]*1\s*867,02/);
    expect(blob).toContain(INTERIM_SMIC_MONTHLY_FORMULA_NOTE);
    expect(blob).toContain("35 × 52 ÷ 12");
  });

  it("n'affiche la fraîcheur qu'une seule fois dans la méthodologie", () => {
    const guide = getGuideBySlug(slug)!;
    const methodo = guide.sections.find((s) => s.id === "methodologie-sources");
    const methodoText = JSON.stringify(methodo);
    const matches = methodoText.match(/Règles et sources officielles vérifiées/g) ?? [];
    expect(matches.length).toBe(1);
    expect(methodoText).not.toMatch(/Règles vérifiées le .*Règles et sources/);
    expect(methodoText).toContain(INTERIM_FRESHNESS_LINE);
  });

  it("expose une FAQ HTML visible avec Schema FAQPage aligné", () => {
    const guide = getGuideBySlug(slug)!;
    expect(guide.faq.length).toBeGreaterThanOrEqual(15);
    expect(guide.includeFaqSchema).not.toBe(false);
    expect(guide.faqSectionId).toBe("questions-frequentes");

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const faqPage = graph.find((node) => node["@type"] === "FAQPage") as {
      mainEntity?: { name: string; acceptedAnswer?: { text: string } }[];
    };
    expect(faqPage).toBeTruthy();
    expect((faqPage.mainEntity ?? []).map((item) => item.name)).toEqual(
      guide.faq.map((item) => item.question),
    );
    const smicFaq = guide.faq.find((item) =>
      item.question.includes("35 heures au SMIC"),
    );
    expect(smicFaq?.answer).toContain("environ");
    expect(smicFaq?.answer).toMatch(/1[\u00a0\u202f ]?762/);
    expect(smicFaq?.answer).not.toMatch(/1[\u00a0\u202f ]?762,09/);
    expect(smicFaq?.answer).toContain("35 × 52 ÷ 12");
  });

  it("cite les sources officielles obligatoires", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    for (const source of Object.values(INTERIM_SOURCES)) {
      expect(blob).toContain(source.href);
    }
    expect(blob).toContain(INTERIM_FRESHNESS_LINE.split(".")[0]);
    expect(INTERIM_SOURCES.egaliteRemuneration.href).toContain("LEGIARTI000006901257");
  });

  it("contient les sections éditoriales principales", () => {
    const guide = getGuideBySlug(slug)!;
    const ids = guide.sections.map((section) => section.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        "comment-est-calcule-le-salaire-interim",
        "calcul-ifm-interim",
        "calcul-conges-payes-interim",
        "pourquoi-21-pourcent",
        "exemples-calcul-salaire-interim",
        "quand-sont-verses-salaire-ifm-conges",
        "que-faut-il-inclure-dans-le-calcul",
        "taux-horaire-interim-et-smic",
        "verifier-fiche-de-paie-interim",
        "situations-non-couvertes",
        "methodologie-sources",
      ]),
    );
  });

  it("aligne les exemples éditoriaux sur le moteur avec net approximatif", () => {
    const smic = calculateInterimSalary({
      mode: "missionGross",
      missionGross: SMIC_CURRENT.monthlyGross,
      ifmDue: true,
      ifmRatePercent: 10,
      iccpRatePercent: 10,
    })!;
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain(formatEuro(smic.totalGross));
    expect(blob).toContain(formatEuro(smic.ifmAmount));
    expect(blob).toContain(formatEuro(smic.iccpAmount));
    expect(blob).toContain(formatEuroApprox(smic.netEstimated));
    expect(blob).toContain("compense les droits à congés payés acquis");
  });

  it("ne contient pas de lien interne cassé vers des routes absentes", () => {
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
      if (href === path) continue;
      if (href === "/") continue;
      if (href.startsWith("/guides/")) {
        const slugFromPath = href.replace("/guides/", "");
        expect(getGuideBySlug(slugFromPath) || href === "/guides").toBeTruthy();
        continue;
      }
      expect(
        isPathIndexable(href) ||
          href === "/calculateurs/salaire-heures-supplementaires" ||
          href === "/smic" ||
          href === "/smic-selon-nombre-heures" ||
          href === "/guides",
      ).toBe(true);
    }
  });

  it("corrige la périodicité du salaire et les formulations juridiques", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    expect(blob).not.toContain("souvent mensuelle");
    expect(blob).not.toMatch(/payé mois par mois|souvent mensuel/i);
    expect(blob).toContain("au moins deux fois par mois");
    expect(blob).toContain("seize jours");
    expect(blob).toContain("LEGIARTI000006902858");
    expect(blob).toContain("LEGIARTI000006902860");
    expect(blob).toContain("F2308");
    expect(blob).toMatch(/IFM[\s\S]*fin de la mission/);
    expect(blob).not.toContain("IFM due / non retenue");
    expect(blob).not.toContain("IFM non retenue");
    expect(blob).toContain("Avec IFM");
    expect(blob).toContain("Sans IFM - cas particulier");
    expect(blob).not.toContain("cas exclusifs");
    expect(blob).toContain("cas d'exclusion");
    expect(blob).not.toContain("coefficient 1.21");
    expect(blob).toContain("coefficient de 1,21");
    expect(blob).toContain(
      "L'indemnité compensatrice de congés payés (ICCP) est au minimum égale",
    );
    expect(blob).toContain("Un intérimaire peut-il être payé uniquement au SMIC ?");
    expect(blob).not.toContain(
      "Le taux horaire d'un intérimaire peut-il être limité au SMIC ?",
    );
  });

  it("nuance les frais, paniers et déplacements", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain(
      "Remboursements de frais professionnels et traitement particulier de certaines primes ou indemnités de panier, de repas ou de déplacement",
    );
    expect(blob).toContain("Dépend de leur qualification");
    expect(blob).toContain(
      "Les remboursements de frais professionnels n'entrent pas dans la rémunération brute utilisée par ce calculateur",
    );
    expect(blob).not.toMatch(
      /toutes les indemnités de (panier|déplacement).*hors assiette/i,
    );
    expect(blob).not.toContain(
      "Indemnités de déplacement, de repas ou de panier (affichables comme frais, hors assiette IFM)",
    );
  });

  it("avertit prudemment sur les heures supplémentaires sans plafond fiscal chiffré", () => {
    const guide = getGuideBySlug(slug)!;
    const blob = JSON.stringify(guide);
    expect(blob).toContain("réduction de cotisations salariales");
    expect(blob).toContain("exonération d'impôt sur le revenu");
    expect(INTERIM_HS_NET_WARNING).toContain("réduction de cotisations salariales");
    expect(blob).not.toMatch(/5\s*000\s*€|plafond fiscal de/i);
    const hsSection = guide.sections
      .flatMap((section) => section.subsections ?? [])
      .find((sub) => sub.id === "exemple-heures-supplementaires");
    expect(JSON.stringify(hsSection)).toContain(INTERIM_HS_NET_WARNING);
  });

  it("utilise 1 000 € comme valeur initiale du calculateur", () => {
    expect(INTERIM_DEFAULT_MISSION_GROSS).toBe(1000);
    const result = calculateInterimSalary({
      mode: "missionGross",
      missionGross: INTERIM_DEFAULT_MISSION_GROSS,
      ifmDue: true,
      ifmRatePercent: 10,
      iccpRatePercent: 10,
    })!;
    expect(result.missionGross).toBe(1000);
    expect(result.ifmAmount).toBe(100);
    expect(result.iccpAmount).toBe(110);
    expect(result.totalGross).toBe(1210);
    expect(formatEuroApprox(result.netEstimated)).toMatch(/^≈/);
    expect(formatEuroApprox(result.netEstimated)).not.toMatch(/,\d{2}/);
  });

  it("synchronise le sommaire avec la FAQ et la conclusion renommée", () => {
    const guide = getGuideBySlug(slug)!;
    const toc = buildGuideTocH2(guide);
    expect(toc.some((entry) => entry.id === "questions-frequentes")).toBe(true);
    expect(toc.some((entry) => entry.id === "faq")).toBe(false);
    expect(toc.find((entry) => entry.id === "conclusion")?.title).toBe(
      "Vérifiez le calcul de votre salaire en intérim",
    );
    expect(toc.some((entry) => entry.title === "Conclusion")).toBe(false);
    expect(guide.conclusion.keyPoints).toEqual([]);
    expect(guide.conclusion.closingCta?.label).toBe("Recalculer mon salaire en intérim");
  });

  it("conserve l'auteur éditorial et n'inscrit pas localhost dans le JSON-LD", () => {
    const guide = getGuideBySlug(slug)!;
    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    const blob = JSON.stringify(graph);
    expect(blob).not.toContain("localhost");
    const article = graph.find((node) => node["@type"] === "Article") as {
      author?: { "@id"?: string };
    };
    const person = graph.find(
      (node) => node["@id"] === article.author?.["@id"],
    ) as { name?: string };
    expect(person?.name).toBe(SITE_AUTHOR.name);
  });
});
