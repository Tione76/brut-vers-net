import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getGuideBySlug, getGuidePublicPath } from "@/site/guides/registry";
import { isPathIndexable } from "@/site/public-pages";
import {
  SICK_LEAVE_CLUSTER_ITEMS,
  SICK_LEAVE_CLUSTER_PATHS,
  SICK_LEAVE_CLUSTER_TITLE,
  SICK_LEAVE_CLUSTER_YOU_ARE_HERE,
  type SickLeaveClusterId,
} from "./cluster";
import type { Guide, GuideBlock } from "@/site/guides/types";

const CLUSTER_PAGES: { id: SickLeaveClusterId; slug: string }[] = [
  { id: "ijss", slug: "calcul-ijss-arret-maladie" },
  { id: "maintien", slug: "maintien-salaire-arret-maladie" },
  { id: "revenu", slug: "salaire-arret-maladie" },
];

function walkBlocks(guide: Guide, visit: (block: GuideBlock) => void) {
  for (const section of guide.sections) {
    for (const block of section.blocks ?? []) visit(block);
    for (const subsection of section.subsections ?? []) {
      for (const block of subsection.blocks) visit(block);
    }
    for (const block of section.closingBlocks ?? []) visit(block);
  }
}

function editorialHrefs(guide: Guide): string[] {
  const hrefs: string[] = [];
  walkBlocks(guide, (block) => {
    if (block.type === "internal-link") hrefs.push(block.href);
    if (block.type === "contextual-cta") hrefs.push(block.href);
    if (block.type === "list") {
      for (const item of block.items) {
        if (typeof item !== "string") hrefs.push(item.href);
      }
    }
  });
  for (const link of guide.conclusion.closingSecondaryLinks ?? []) {
    hrefs.push(link.href);
  }
  return hrefs;
}

function collectInternalAnchors(guide: Guide): { href: string; label: string }[] {
  const anchors: { href: string; label: string }[] = [];
  walkBlocks(guide, (block) => {
    if (block.type === "internal-link") {
      anchors.push({ href: block.href, label: block.label });
    }
    if (block.type === "list") {
      for (const item of block.items) {
        if (typeof item !== "string") {
          anchors.push({ href: item.href, label: item.label });
        }
      }
    }
  });
  for (const link of guide.conclusion.closingSecondaryLinks ?? []) {
    anchors.push({ href: link.href, label: link.label });
  }
  return anchors;
}

describe("cocon arrêt maladie", () => {
  it("expose les trois routes canoniques indexables", () => {
    expect(SICK_LEAVE_CLUSTER_ITEMS).toHaveLength(3);
    expect(SICK_LEAVE_CLUSTER_TITLE).toBe(
      "Comprendre vos revenus pendant l'arrêt maladie",
    );
    expect(SICK_LEAVE_CLUSTER_YOU_ARE_HERE).toBe("Vous êtes ici");

    for (const { id, slug } of CLUSTER_PAGES) {
      const guide = getGuideBySlug(slug)!;
      const path = getGuidePublicPath(guide);
      expect(path).toBe(SICK_LEAVE_CLUSTER_PATHS[id]);
      expect(isPathIndexable(path)).toBe(true);
    }
  });

  it("relie chaque page aux deux autres dans le contenu éditorial", () => {
    for (const { id, slug } of CLUSTER_PAGES) {
      const guide = getGuideBySlug(slug)!;
      const hrefs = editorialHrefs(guide);
      const others = SICK_LEAVE_CLUSTER_ITEMS.filter((item) => item.id !== id);
      for (const item of others) {
        expect(hrefs, `${slug} → ${item.href}`).toContain(item.href);
      }
      expect(hrefs).not.toContain(SICK_LEAVE_CLUSTER_PATHS[id]);
    }
  });

  it("utilise des ancres descriptives, sans nouvel onglet ni nofollow", () => {
    const generic = /^(cliquez ici|en savoir plus|voir cette page|calculateur)$/i;
    for (const { slug } of CLUSTER_PAGES) {
      const guide = getGuideBySlug(slug)!;
      const anchors = collectInternalAnchors(guide).filter((item) =>
        Object.values(SICK_LEAVE_CLUSTER_PATHS).includes(
          item.href.replace(/#.*$/, "") as (typeof SICK_LEAVE_CLUSTER_PATHS)[SickLeaveClusterId],
        ),
      );
      expect(anchors.length).toBeGreaterThanOrEqual(2);
      for (const anchor of anchors) {
        expect(anchor.label.length).toBeGreaterThan(12);
        expect(anchor.label).not.toMatch(generic);
        expect(anchor.label.toLowerCase()).not.toBe("calculateur");
      }
    }

    const addedSources = [
      "src/site/sick-leave/SickLeaveClusterNav.tsx",
      "src/app/calcul-ijss-arret-maladie/page.tsx",
      "src/app/maintien-salaire-arret-maladie/page.tsx",
      "src/app/salaire-arret-maladie/page.tsx",
    ];
    for (const file of addedSources) {
      const source = readFileSync(join(process.cwd(), file), "utf8");
      expect(source).not.toMatch(/target=["']_blank["']/);
      expect(source).not.toMatch(/rel=["'][^"']*nofollow/);
    }
    const renderer = readFileSync(
      join(process.cwd(), "src/site/guides/GuideRenderer.tsx"),
      "utf8",
    );
    const secondary = renderer.slice(renderer.indexOf("closingSecondaryLinks"));
    expect(secondary).toContain("<Link href={link.href}>{link.label}</Link>");
    expect(secondary).not.toMatch(/target=["']_blank["']/);
    expect(secondary).not.toMatch(/rel=["'][^"']*nofollow/);
  });

  it("place le bloc commun après le calculateur, avec un état actif non cliquable", () => {
    const nav = readFileSync(
      join(process.cwd(), "src/site/sick-leave/SickLeaveClusterNav.tsx"),
      "utf8",
    );
    expect(nav).toContain("aria-current={isCurrent ? \"page\" : undefined}");
    expect(nav).toContain("SICK_LEAVE_CLUSTER_YOU_ARE_HERE");
    expect(nav).toContain("sick-leave-cluster__item--current");
    expect(nav).toContain("sick-leave-cluster__here");
    expect(nav).not.toMatch(/isCurrent[\s\S]{0,80}<Link/);

    const css = readFileSync(
      join(process.cwd(), "src/site/sick-leave/sick-leave-cluster.css"),
      "utf8",
    );
    expect(css).toContain("border-style: dashed");
    expect(css).toContain(":focus-visible");
    expect(css).toContain("overflow-wrap: anywhere");
    expect(css).not.toContain("width: 100vw");

    const pages: [string, SickLeaveClusterId][] = [
      ["src/app/calcul-ijss-arret-maladie/page.tsx", "ijss"],
      ["src/app/maintien-salaire-arret-maladie/page.tsx", "maintien"],
      ["src/app/salaire-arret-maladie/page.tsx", "revenu"],
    ];
    for (const [file, current] of pages) {
      const source = readFileSync(join(process.cwd(), file), "utf8");
      const afterToc = source.slice(source.indexOf("afterToc="));
      expect(afterToc.indexOf("SickLeaveClusterNav")).toBeGreaterThan(
        afterToc.search(/IjssCalculator|EmployerMaintienCalculator|SickLeaveSalaryCalculator/),
      );
      expect(source).toContain(`current="${current}"`);
    }
  });

  it("ajoute un lien entrant depuis le guide cotisations vers les IJSS", () => {
    const guide = getGuideBySlug("cotisations-salariales-pourquoi-brut-plus-eleve-que-net")!;
    const anchors = collectInternalAnchors(guide);
    expect(
      anchors.some(
        (item) =>
          item.href === SICK_LEAVE_CLUSTER_PATHS.ijss &&
          item.label === "montant des indemnités journalières",
      ),
    ).toBe(true);
  });
});
