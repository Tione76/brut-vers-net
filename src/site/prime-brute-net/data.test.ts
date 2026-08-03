import { describe, expect, it } from "vitest";
import { getProfileCoefficient } from "@/site/salary-calculator/config";
import { roundCent } from "@/site/salary-calculator/conversions";
import { getAllPublicPages, getSitemapEntries, isPathIndexable } from "@/site/public-pages";
import {
  GROSS_PRIME_AMOUNTS,
  GROSS_PRIME_CALCULATOR_ANCHOR_ID,
  grossPrimePath,
  isGrossPrimeAmount,
  parseGrossPrimeMontantParam,
} from "./config";
import {
  buildAllProfilePrimeEstimates,
  buildGrossPrimeComparisonRows,
  estimateNetPrimeFromGross,
} from "./data";
import {
  buildGrossPrimeEditorial,
  buildGrossPrimeFaqItems,
  buildGrossPrimeSeoMeta,
  getNearbyGrossPrimeAmounts,
} from "./content";

describe("série prime brute → net (pilote 10 €)", () => {
  it("ne publie que le montant 10 €", () => {
    expect(GROSS_PRIME_AMOUNTS).toEqual([10]);
    expect(isGrossPrimeAmount(10)).toBe(true);
    expect(isGrossPrimeAmount(20)).toBe(false);
    expect(parseGrossPrimeMontantParam("10")).toBe(10);
    expect(parseGrossPrimeMontantParam("20")).toBeNull();
    expect(grossPrimePath(10)).toBe("/prime-brute-10-euros-en-net");
  });

  it("calcule les primes nettes des trois profils pour 10 € brut", () => {
    const estimates = buildAllProfilePrimeEstimates(10);
    expect(estimates.nonExecutive.netPrime).toBe(7.8);
    expect(estimates.executive.netPrime).toBe(7.5);
    expect(estimates.publicService.netPrime).toBe(8.1);
    expect(estimates.nonExecutive.netAnnualIfMonthly).toBe(93.6);
    expect(estimateNetPrimeFromGross(10, "executive")).toBe(
      roundCent(10 * getProfileCoefficient("executive")),
    );
  });

  it("génère le tableau 5 / 10 / 15 / 20 / 25 autour de 10 €", () => {
    const rows = buildGrossPrimeComparisonRows(10);
    expect(rows.map((row) => row.grossPrime)).toEqual([5, 10, 15, 20, 25]);
    expect(rows.find((row) => row.isCurrent)?.grossPrime).toBe(10);
    expect(rows.find((row) => row.isCurrent)?.netPrime).toBe(7.8);
    expect(rows.find((row) => row.isCurrent)?.netAnnualIfMonthly).toBe(93.6);
  });

  it("applique le SEO pilote sans tiret cadratin", () => {
    const seo = buildGrossPrimeSeoMeta(10);
    const estimates = buildAllProfilePrimeEstimates(10);
    const faq = buildGrossPrimeFaqItems(10, estimates);
    const editorial = buildGrossPrimeEditorial(10, estimates);

    expect(seo.h1).toMatch(/^Prime brute de 10[\u00a0\u202f ]?€ : combien touche-t-on en net \?$/);
    expect(seo.title).toMatch(/^Prime brute de 10[\u00a0\u202f ]?€ : combien en net \?$/);
    expect([...seo.title].length).toBeLessThanOrEqual(60);
    expect([...seo.title].length).toBeGreaterThanOrEqual(35);
    expect(seo.description).toMatch(/prime brute/);
    expect(seo.description).toMatch(/prime nette/);
    expect(seo.description).toMatch(/10/);
    expect(seo.description).toMatch(/estimation/);
    expect(seo.description).toMatch(/simulateur/);
    expect([...seo.description].length).toBeGreaterThanOrEqual(150);
    expect([...seo.description].length).toBeLessThanOrEqual(160);
    expect(seo.answerH2).toMatch(/prime brute en net/);
    expect(seo.subtitle).toMatch(
      /combien représente une prime brute de 10[\u00a0\u202f ]?€ en net selon votre statut/,
    );
    expect(faq).toHaveLength(3);
    expect(faq[2]?.answer).toContain("calculateur de prime brute en net situé plus haut");
    expect(faq[2]?.answer).not.toContain("salaire brut et net");

    const blob = [
      seo.title,
      seo.description,
      seo.h1,
      seo.answerH2,
      ...faq.flatMap((item) => [item.question, item.answer]),
      ...editorial.flatMap((section) => [section.title, ...section.paragraphs]),
    ].join(" ");
    expect(blob).not.toContain("\u2014");
  });

  it("expose l'ancre du mini-calculateur autonome", () => {
    expect(GROSS_PRIME_CALCULATOR_ANCHOR_ID).toBe("calculateur-prime-brute");
  });

  it("prépare les montants proches sans lien cassé", () => {
    expect(getNearbyGrossPrimeAmounts(10)).toEqual([]);
  });

  it("est enregistrée dans le sitemap et indexable", () => {
    const path = grossPrimePath(10);
    expect(getAllPublicPages().some((page) => page.path === path)).toBe(true);
    expect(getSitemapEntries().some((entry) => entry.path === path)).toBe(true);
    expect(isPathIndexable(path)).toBe(true);
  });
});
