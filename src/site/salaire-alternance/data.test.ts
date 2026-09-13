import { describe, expect, it } from "vitest";
import {
  ALTERNANCE_H1,
  ALTERNANCE_LABELS,
  ALTERNANCE_META_DESCRIPTION,
  ALTERNANCE_PUBLISHED_AT,
  ALTERNANCE_SEO_TITLE,
  ALTERNANCE_SMIC_MONTHLY_GROSS,
  ALTERNANCE_SOURCES,
  ALTERNANCE_UPDATED_AT,
  APPRENTICESHIP_AMOUNTS,
  APPRENTICESHIP_EXEMPTION_THRESHOLD_GROSS,
  APPRENTICESHIP_INCOME_TAX_EXEMPTION_LIMIT_2025,
  APPRENTICESHIP_RATES,
  APPRENTICESHIP_SHORT_CONTRACT_RATE_BONUS_POINTS,
  computeApprenticeshipAmountFromRate,
  getApprenticeshipAgeBandCards,
  getApprenticeshipTableRows,
  PROFESSIONNALISATION_AMOUNTS,
} from "./data";
import { SMIC_CURRENT } from "@/site/smic/data";

describe("salaire-alternance/data", () => {
  it("réutilise le SMIC central et fixe le seuil d'exonération à 50 %", () => {
    expect(ALTERNANCE_SMIC_MONTHLY_GROSS).toBe(SMIC_CURRENT.monthlyGross);
    expect(ALTERNANCE_SMIC_MONTHLY_GROSS).toBe(1867.02);
    expect(APPRENTICESHIP_EXEMPTION_THRESHOLD_GROSS).toBe(933.51);
    expect(APPRENTICESHIP_INCOME_TAX_EXEMPTION_LIMIT_2025).toBe(21622);
  });

  it("expose le Title evergreen et le H1 daté distincts", () => {
    expect(ALTERNANCE_SEO_TITLE).toBe(
      "Salaire en alternance : combien gagne un apprenti ou un alternant ?",
    );
    expect(ALTERNANCE_SEO_TITLE).not.toMatch(/20\d{2}/);
    expect(ALTERNANCE_H1).toContain("2026");
    expect(ALTERNANCE_H1).not.toBe(ALTERNANCE_SEO_TITLE);
    expect(ALTERNANCE_META_DESCRIPTION.length).toBeGreaterThan(110);
    expect(ALTERNANCE_META_DESCRIPTION.length).toBeLessThan(170);
    expect(ALTERNANCE_PUBLISHED_AT).toBe("2026-09-13");
    expect(ALTERNANCE_UPDATED_AT).toBe("2026-09-13");
  });

  it("fixe la grille d'apprentissage Service-Public (pourcentages et montants)", () => {
    expect(APPRENTICESHIP_RATES[1]).toEqual({
      "16-17": 27,
      "18-20": 43,
      "21-25": 53,
      "26+": 100,
    });
    expect(APPRENTICESHIP_RATES[2]).toEqual({
      "16-17": 39,
      "18-20": 51,
      "21-25": 61,
      "26+": 100,
    });
    expect(APPRENTICESHIP_RATES[3]).toEqual({
      "16-17": 55,
      "18-20": 67,
      "21-25": 78,
      "26+": 100,
    });

    expect(APPRENTICESHIP_AMOUNTS[1]["16-17"]).toBe(504.09);
    expect(APPRENTICESHIP_AMOUNTS[1]["18-20"]).toBe(802.82);
    expect(APPRENTICESHIP_AMOUNTS[1]["21-25"]).toBe(989.52);
    expect(APPRENTICESHIP_AMOUNTS[1]["26+"]).toBe(1867.02);
    expect(APPRENTICESHIP_AMOUNTS[2]["16-17"]).toBe(728.14);
    expect(APPRENTICESHIP_AMOUNTS[2]["18-20"]).toBe(952.18);
    expect(APPRENTICESHIP_AMOUNTS[2]["21-25"]).toBe(1138.88);
    expect(APPRENTICESHIP_AMOUNTS[3]["16-17"]).toBe(1026.86);
    expect(APPRENTICESHIP_AMOUNTS[3]["18-20"]).toBe(1250.9);
    expect(APPRENTICESHIP_AMOUNTS[3]["21-25"]).toBe(1456.27);
    expect(APPRENTICESHIP_AMOUNTS[3]["26+"]).toBe(1867.02);
  });

  it("fixe les minima de professionnalisation Service-Public", () => {
    expect(PROFESSIONNALISATION_AMOUNTS["under-21"]["below-bac-pro"].amount).toBe(1026.86);
    expect(PROFESSIONNALISATION_AMOUNTS["under-21"]["bac-pro-or-equivalent"].amount).toBe(1213.57);
    expect(PROFESSIONNALISATION_AMOUNTS["21-25"]["below-bac-pro"].amount).toBe(1306.92);
    expect(PROFESSIONNALISATION_AMOUNTS["21-25"]["bac-pro-or-equivalent"].amount).toBe(1493.62);
    expect(PROFESSIONNALISATION_AMOUNTS["26+"]["below-bac-pro"].amount).toBe(1867.02);
  });

  it("génère un tableau apprentissage cohérent et des libellés non vides", () => {
    const rows = getApprenticeshipTableRows();
    expect(rows).toHaveLength(4);
    expect(rows[0][0]).toContain("16");
    expect(ALTERNANCE_LABELS.y1_16).toContain("504");
    expect(ALTERNANCE_LABELS.exemptionThreshold).toContain("933");
    expect(ALTERNANCE_SOURCES.servicePublicApprentissage.href).toContain("service-public");
  });

  it("expose des cartes d'âge verticales et une majoration de 15 points", () => {
    const cards = getApprenticeshipAgeBandCards();
    expect(cards).toHaveLength(4);
    expect(cards[0].details).toHaveLength(3);
    expect(cards[3].details).toHaveLength(1);
    expect(APPRENTICESHIP_SHORT_CONTRACT_RATE_BONUS_POINTS).toBe(15);
    // Les montants Service-Public font foi ; le recalcul SMIC × taux reste à 1 centime près.
    expect(
      Math.abs(computeApprenticeshipAmountFromRate(43) - APPRENTICESHIP_AMOUNTS[1]["18-20"]),
    ).toBeLessThanOrEqual(0.01);
    expect(
      Math.abs(computeApprenticeshipAmountFromRate(61) - APPRENTICESHIP_AMOUNTS[2]["21-25"]),
    ).toBeLessThanOrEqual(0.01);
    expect(APPRENTICESHIP_EXEMPTION_THRESHOLD_GROSS).toBe(
      Math.round(ALTERNANCE_SMIC_MONTHLY_GROSS * 0.5 * 100) / 100,
    );
  });
});
