export const TAXABLE_INCOME_CONFIG_2026 = {
  year: 2026,
  lastReviewedAt: "2026-10-20",
  sources: {
    csgCrdsBase:
      "BOSS - Assiette générale (abattement forfaitaire de 1,75 %, assiette 98,25 %, limite 4 PASS)",
    socialSecurityCeiling:
      "Service-Public.fr - PASS 2026 (PMSS 4 005 €, PASS 48 060 €) - arrêté du 22 décembre 2025",
    employerHealthContributionTaxable:
      "BOFiP (CGI art. 83, 1° quater) - part employeur frais de santé imposable lorsqu'elle figure au bulletin",
    pasNeutralGrid:
      "BOFiP BOI-BAREME-000037 (identifiant BOI-BAREME-000037-20260706) et CGI art. 204 H III - grille métropole à compter du 1er mai 2026",
  },
  assumptions: [
    "Le net imposable est estimé et n'est jamais affiché dans l'interface.",
    "Assiette CSG/CRDS: abattement forfaitaire de 1,75 % (98,25 %) dans la limite de 4 PASS, puis 100 % au-delà.",
    "CSG déductible calculée à titre informatif (non utilisée dans la base imposable).",
    "La part employeur de complémentaire santé n'est pas majorée forfaitairement : son montant réel varie selon le contrat et n'est pas connu du simulateur.",
    "Sans cette information, le net imposable estimé peut rester légèrement inférieur au net imposable réel du bulletin.",
  ] as const,
  socialSecurityCeiling: {
    pmss: 4005,
    pass: 48060,
  },
  csgCrds: {
    professionalExpensesAbatementRate: 0.0175,
    baseRateWhenAbatementApplies: 0.9825,
    abatementAppliesUpToPassMultiple: 4,
    deductibleCsgRate: 0.068,
    nonDeductibleCsgRate: 0.024,
    crdsRate: 0.005,
  },
  /**
   * Mutuelle patronale : volontairement à 0.
   * Une majoration forfaitaire (ex. 40 €) n'a pas de fondement réglementaire unique
   * et pouvait faire basculer artificiellement certaines bases dans une tranche PAS supérieure.
   */
  employerHealthContributionEstimate: {
    centralMonthlyAmount: 0,
    lowMonthlyAmount: 0,
    highMonthlyAmount: 0,
    methodology: "omitted_unknown_contract_amount",
    regulatory: false,
    note: "Non estimée : le montant imposable de la part employeur dépend du contrat collectif. Le simulateur ne majore plus la base d'un forfait arbitraire.",
  },
} as const;

