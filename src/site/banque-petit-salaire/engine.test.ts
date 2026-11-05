import { describe, expect, it } from "vitest";
import {
  BANK_OFFERS,
  getBankOffer,
  offerAnnualIfUsed,
  offerAnnualLabel,
  offerMonthlyLabel,
  offerUnusedThreeMonths,
  offerUnusedThreeMonthsLabel,
} from "./data";
import { annualCents, formatCents, monthsCostCents } from "./engine";

describe("banque petit salaire - calculs", () => {
  it("calcule les frais fixes annuels et les scénarios de non-utilisation depuis les centimes", () => {
    expect(annualCents(0)).toBe(0);
    expect(annualCents(390)).toBe(4680);
    expect(monthsCostCents(300, 3)).toBe(900);
    expect(monthsCostCents(600, 3)).toBe(1800);
    expect(formatCents(0)).toBe("0\u00a0€");
    expect(formatCents(390)).toBe("3,90\u00a0€");
    expect(formatCents(4680)).toBe("46,80\u00a0€");
  });

  it("propage les tarifs des quatre offres sans les additionner à une prime", () => {
    const boursobank = getBankOffer("boursobank-welcome");
    const fortuneo = getBankOffer("fortuneo-fosfo");
    const hello = getBankOffer("hello-one");
    const monabanq = getBankOffer("monabanq-pratiq-plus");

    expect(offerMonthlyLabel(boursobank)).toBe("0\u00a0€");
    expect(offerAnnualIfUsed(boursobank)).toBe(0);
    expect(offerUnusedThreeMonths(boursobank)).toBe(0);

    expect(offerAnnualIfUsed(fortuneo)).toBe(0);
    expect(offerUnusedThreeMonths(fortuneo)).toBe(900);
    expect(offerUnusedThreeMonthsLabel(fortuneo)).toBe("9\u00a0€");

    expect(offerAnnualIfUsed(hello)).toBe(0);
    expect(offerUnusedThreeMonths(hello)).toBe(1800);
    expect(offerUnusedThreeMonthsLabel(hello)).toBe("18\u00a0€");

    expect(offerMonthlyLabel(monabanq)).toBe("3,90\u00a0€");
    expect(offerAnnualIfUsed(monabanq)).toBe(4680);
    expect(offerAnnualLabel(monabanq)).toBe("46,80\u00a0€");
    expect(offerUnusedThreeMonths(monabanq)).toBe(1170);
  });

  it("conserve l'ordre alphabétique et une seule carte principale par banque", () => {
    expect(BANK_OFFERS.map((offer) => offer.bankName)).toEqual([
      "BoursoBank",
      "Fortuneo",
      "Hello bank!",
      "Monabanq",
    ]);
    expect(BANK_OFFERS.map((offer) => offer.id)).toEqual([
      "boursobank-welcome",
      "fortuneo-fosfo",
      "hello-one",
      "monabanq-pratiq-plus",
    ]);
  });
});
