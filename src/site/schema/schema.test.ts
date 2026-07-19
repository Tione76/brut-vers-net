import { describe, expect, it } from "vitest";
import { toSchemaDateTime } from "./types";
import { buildPersonNode } from "./nodes/person";
import { buildArticleNode } from "./nodes/article";
import { getGuideBySlug } from "@/site/guides/registry";

describe("schema datetime and author", () => {
  it("normalise YYYY-MM-DD en ISO 8601 avec heure et fuseau", () => {
    expect(toSchemaDateTime("2026-07-14")).toBe("2026-07-14T09:00:00+02:00");
  });

  it("conserve un datetime déjà complet", () => {
    expect(toSchemaDateTime("2026-07-14T09:00:00+02:00")).toBe(
      "2026-07-14T09:00:00+02:00",
    );
  });

  it("émet Person avec le nom Antoine", () => {
    expect(buildPersonNode().name).toBe("Antoine");
    expect(buildPersonNode()["@id"]).toBe("https://brut-vers-net.fr/#author");
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
