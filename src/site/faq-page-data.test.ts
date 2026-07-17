import { describe, expect, it } from "vitest";
import { FAQ_INTERNAL_LINKS } from "./faq-page-links";
import {
  FAQ_PAGE_H1,
  FAQ_PAGE_INTRO,
  FAQ_PAGE_META,
  FAQ_PAGE_OUTRO_SEGMENTS,
  faqPageCategories,
  getFaqPageSchemaItems,
  getFaqPageTocEntries,
} from "./faq-page-data";
function answerToPlainText(
  segments: Array<string | { href: string; link: string }>,
): string {
  return segments
    .map((seg) => (typeof seg === "string" ? seg : seg.link))
    .join("");
}

describe("FAQ page content", () => {
  const allItems = faqPageCategories.flatMap((category) => category.items);
  const allSegments = [
    ...allItems.flatMap((item) => item.answer),
    ...FAQ_PAGE_OUTRO_SEGMENTS,
  ];
  const linkedHrefs = new Set(
    allSegments
      .filter((seg): seg is { href: string; link: string } => typeof seg !== "string")
      .map((seg) => seg.href),
  );

  it("conserve les métadonnées SEO validées, le H1 et l'intro attendus", () => {
    expect(FAQ_PAGE_H1).toBe("Questions fréquentes sur le salaire et la rémunération");
    expect(FAQ_PAGE_META.title).toBe(
      "Questions fréquentes sur le salaire et la rémunération",
    );
    expect(FAQ_PAGE_META.description).toBe(
      "Toutes les réponses à vos questions sur le salaire, la rémunération, les cotisations, la fiche de paie, le prélèvement à la source et bien plus.",
    );
    expect(FAQ_PAGE_INTRO).toBe(
      "Retrouvez les réponses aux questions les plus fréquentes sur le salaire et la rémunération en France : salaire brut et net, cotisations, fiche de paie, prélèvement à la source, augmentation, heures supplémentaires et indemnité de licenciement. Utilisez également nos calculateurs et consultez nos guides pour approfondir chaque sujet.",
    );
  });

  it("remplace les doublons de calcul brut/net par des questions complémentaires", () => {
    const calcCategory = faqPageCategories.find((c) => c.id === "calcul-brut-vers-net");
    expect(calcCategory).toBeDefined();
    const questions = calcCategory!.items.map((item) => item.question);

    expect(questions).toContain("Comment calculer son salaire brut en net ?");
    expect(questions).toContain(
      "Comment calculer son salaire net à partir de son taux horaire brut ?",
    );
    expect(questions).toContain("Comment calculer un salaire net en brut ?");
    expect(questions).not.toContain(
      "Comment calculer un salaire net à partir d'un salaire brut mensuel ?",
    );
    expect(questions).not.toContain("Peut-on calculer un salaire net vers brut ?");
  });

  it("contient entre 35 et 40 questions réparties en 7 thématiques", () => {
    expect(faqPageCategories).toHaveLength(7);
    expect(allItems.length).toBeGreaterThanOrEqual(35);
    expect(allItems.length).toBeLessThanOrEqual(40);

    for (const category of faqPageCategories) {
      expect(category.items.length).toBeGreaterThanOrEqual(5);
      expect(category.items.length).toBeLessThanOrEqual(6);
    }
  });

  it("expose un sommaire avec des ancres stables", () => {
    const toc = getFaqPageTocEntries();
    expect(toc).toHaveLength(7);
    expect(toc.map((entry) => entry.id)).toEqual(faqPageCategories.map((c) => c.id));
    for (const entry of toc) {
      expect(entry.id).toMatch(/^[a-z0-9-]+$/);
      expect(entry.title.length).toBeGreaterThan(0);
    }
  });

  it("synchronise le JSON-LD FAQPage avec le contenu visible", () => {
    const schemaItems = getFaqPageSchemaItems();
    expect(schemaItems).toHaveLength(allItems.length);

    schemaItems.forEach((schemaItem, index) => {
      const visible = allItems[index];
      expect(schemaItem.question).toBe(visible.question);
      expect(schemaItem.answer).toBe(answerToPlainText(visible.answer));
      expect(schemaItem.answer.length).toBeGreaterThan(40);
    });
  });

  it("maille tous les calculateurs et guides attendus", () => {
    const expectedHrefs = Object.values(FAQ_INTERNAL_LINKS).map((link) => link.href);
    for (const href of expectedHrefs) {
      expect(linkedHrefs.has(href)).toBe(true);
    }
  });

  it("n'utilise pas le tiret cadratin", () => {
    const plain = [
      FAQ_PAGE_H1,
      ...allItems.map((item) => `${item.question} ${answerToPlainText(item.answer)}`),
      answerToPlainText(FAQ_PAGE_OUTRO_SEGMENTS),
    ].join("\n");

    expect(plain).not.toContain("\u2014");
  });

  it("rappelle le cadre hebdomadaire des majorations d'heures supplémentaires", () => {
    const overtimeCategory = faqPageCategories.find((c) => c.id === "heures-supplementaires");
    expect(overtimeCategory).toBeDefined();
    const plain = overtimeCategory!.items
      .map((item) => answerToPlainText(item.answer))
      .join(" ");

    expect(plain).toMatch(/semaine par semaine/);
    expect(plain).toMatch(/total mensuel/);
  });
});
