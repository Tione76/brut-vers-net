import { describe, expect, it } from "vitest";
import { toSchemaDateTime } from "./types";
import { buildPersonNode } from "./nodes/person";
import { buildArticleNode } from "./nodes/article";
import { buildWebApplicationNode } from "./nodes/webapplication";
import {
  buildHomeJsonLd,
  buildCalculatorJsonLd,
  buildGuideJsonLd,
  buildWebPageJsonLd,
  buildAuthorJsonLd,
} from "./pages";
import { getGuideBySlug } from "@/site/guides/registry";
import { HOME_COVER, getCalculatorCover } from "@/site/guides/covers";

describe("schema datetime and author", () => {
  it("normalise YYYY-MM-DD en ISO 8601 avec heure et fuseau", () => {
    expect(toSchemaDateTime("2026-07-14")).toBe("2026-07-14T09:00:00+02:00");
  });

  it("conserve un datetime déjà complet", () => {
    expect(toSchemaDateTime("2026-07-14T09:00:00+02:00")).toBe(
      "2026-07-14T09:00:00+02:00",
    );
  });

  it("émet Person avec le nom Antoine et l'URL de la page auteur", () => {
    expect(buildPersonNode().name).toBe("Antoine");
    expect(buildPersonNode()["@id"]).toBe("https://brut-vers-net.fr/#author");
    expect(buildPersonNode().url).toBe("https://brut-vers-net.fr/auteur/antoine");
  });

  it("émet Article avec dates ISO complètes", () => {
    const guide = getGuideBySlug("comment-est-calcule-le-salaire-net");
    expect(guide).toBeTruthy();
    const article = buildArticleNode(guide!, `/guides/${guide!.slug}`);
    expect(article.datePublished).toBe("2026-07-14T09:00:00+02:00");
    expect(article.dateModified).toBe("2026-07-15T09:00:00+02:00");
    expect(article.author).toEqual({ "@id": "https://brut-vers-net.fr/#author" });
  });
});

describe("WebApplication sur calculateurs interactifs", () => {
  it("émet un WebApplication minimal et vérifiable", () => {
    const node = buildWebApplicationNode({
      path: "/calculateurs/augmentation-salaire",
      name: "Calculateur d'augmentation de salaire",
      description: "Description test",
    });

    expect(node).toEqual({
      "@type": "WebApplication",
      "@id": "https://brut-vers-net.fr/calculateurs/augmentation-salaire#webapp",
      name: "Calculateur d'augmentation de salaire",
      description: "Description test",
      url: "https://brut-vers-net.fr/calculateurs/augmentation-salaire",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      isAccessibleForFree: true,
      publisher: { "@id": "https://brut-vers-net.fr/#organization" },
    });
    expect(node).not.toHaveProperty("aggregateRating");
    expect(node).not.toHaveProperty("offers");
    expect(node).not.toHaveProperty("downloadUrl");
  });

  it("relie WebPage.mainEntity au WebApplication sur l'accueil et les calculateurs", () => {
    const home = buildHomeJsonLd({
      name: "Calculateur Brut vers Net",
      description: "Description accueil",
      cover: HOME_COVER,
      faq: [{ question: "Q ?", answer: "R." }],
    });
    const homeGraph = home["@graph"] as Record<string, unknown>[];
    const homePage = homeGraph.find((n) => n["@type"] === "WebPage");
    const homeApp = homeGraph.find((n) => n["@type"] === "WebApplication");
    const homeFaq = homeGraph.find((n) => n["@type"] === "FAQPage");

    expect(homeApp).toBeTruthy();
    expect(homePage?.mainEntity).toEqual({ "@id": "https://brut-vers-net.fr/#webapp" });
    expect(homePage?.hasPart).toEqual([{ "@id": "https://brut-vers-net.fr/#faq" }]);
    expect(homeFaq).toBeTruthy();

    const calc = buildCalculatorJsonLd({
      path: "/calculateurs/indemnite-licenciement",
      name: "Calculez votre indemnité de licenciement",
      description: "Description calculateur",
      cover: getCalculatorCover("indemnite-licenciement"),
      faq: [],
    });
    const calcGraph = calc["@graph"] as Record<string, unknown>[];
    expect(calcGraph.some((n) => n["@type"] === "WebApplication")).toBe(true);
    expect(calcGraph.find((n) => n["@type"] === "WebPage")?.mainEntity).toEqual({
      "@id": "https://brut-vers-net.fr/calculateurs/indemnite-licenciement#webapp",
    });
  });

  it("n'ajoute pas WebApplication aux guides ni aux pages éditoriales", () => {
    const guide = getGuideBySlug("comment-est-calcule-le-salaire-net");
    expect(guide).toBeTruthy();
    const guideGraph = buildGuideJsonLd(guide!)["@graph"] as Record<string, unknown>[];
    expect(guideGraph.some((n) => n["@type"] === "WebApplication")).toBe(false);

    const legal = buildWebPageJsonLd({
      path: "/mentions-legales",
      name: "Mentions légales",
      description: "d",
      breadcrumbs: [
        { name: "Accueil", path: "/" },
        { name: "Mentions", path: "/mentions-legales" },
      ],
    });
    const legalGraph = legal["@graph"] as Record<string, unknown>[];
    expect(legalGraph.some((n) => n["@type"] === "WebApplication")).toBe(false);
  });
});

describe("page auteur Schema.org", () => {
  it("réutilise le même @id Person sans doublon", () => {
    const graph = buildAuthorJsonLd()["@graph"] as Record<string, unknown>[];
    const persons = graph.filter((n) => n["@type"] === "Person");
    expect(persons).toHaveLength(1);
    expect(persons[0]["@id"]).toBe("https://brut-vers-net.fr/#author");
    expect(persons[0].url).toBe("https://brut-vers-net.fr/auteur/antoine");
    expect(graph.find((n) => n["@type"] === "WebPage")?.mainEntity).toEqual({
      "@id": "https://brut-vers-net.fr/#author",
    });
  });
});
