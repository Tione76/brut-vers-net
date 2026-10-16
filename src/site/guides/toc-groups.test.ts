import { describe, expect, it } from "vitest";
import { buildTocBlocks } from "./GuideEditorialToc";
import { guides } from "./registry";
import { GUIDE_TOC_CONFIG, GUIDE_TOC_GROUPS, getGuideTocGroups } from "./toc-groups";
import { buildGuideTocH2 } from "./utils";

describe("GUIDE_TOC_CONFIG", () => {
  it("ne référence que des guides publiés", () => {
    const slugs = new Set(guides.map((guide) => guide.slug));
    for (const slug of Object.keys(GUIDE_TOC_CONFIG)) {
      expect(slugs.has(slug), `slug inconnu: ${slug}`).toBe(true);
    }
  });

  it("couvre 100 % des rubriques H2 sans trou ni chevauchement", () => {
    for (const guide of guides) {
      const groups = getGuideTocGroups(guide.slug);
      if (!groups) continue;

      const toc = buildGuideTocH2(guide);
      let cursor = 0;

      for (const group of groups) {
        expect(group.end).toBeGreaterThan(group.start);
        expect(group.start).toBe(cursor);
        expect(group.end).toBeLessThanOrEqual(toc.length);
        cursor = group.end;
      }
      expect(cursor).toBe(toc.length);

      const blocks = buildTocBlocks(toc.length, groups);
      expect(blocks.every((block) => block.kind === "group")).toBe(true);
    }
  });

  it("conserve les quatre groupes validés de /prime-activite", () => {
    expect(GUIDE_TOC_GROUPS["prime-activite"]).toEqual([
      { title: "Comprendre la prime", icon: "help", start: 0, end: 4 },
      { title: "Montants et calcul", icon: "calculator", start: 4, end: 8 },
      { title: "Déclarations et démarches", icon: "clipboard", start: 8, end: 12 },
      {
        title: "Vérifier ses droits et aller plus loin",
        icon: "badge",
        start: 12,
        end: 16,
      },
    ]);
  });
});
