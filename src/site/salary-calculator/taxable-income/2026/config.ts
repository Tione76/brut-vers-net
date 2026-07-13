export const TAXABLE_INCOME_CONFIG_2026 = {
  year: 2026,
  lastReviewedAt: "2026-07-13",
  sources: {
    csgCrdsBase:
      "BOSS - Assiette générale (abattement forfaitaire de 1,75 %, assiette 98,25 %, limite 4 PASS)",
    socialSecurityCeiling:
      "Service-Public.fr - PASS 2026 (PMSS 4 005 €, PASS 48 060 €) - arrêté du 22 décembre 2025",
    employerHealthContributionTaxable:
      "BOFiP (CGI art. 83, 1° quater) - part employeur frais de santé imposable",
    employerHealthContributionEstimate:
      "DREES - La complémentaire santé d’entreprise (Édition 2024, fiche 13, enquête PSCE 2017) - ordre de grandeur de la participation employeur (montants en euros).",
  },
  assumptions: [
    "Le net imposable est estimé et n'est jamais affiché dans l'interface.",
    "Assiette CSG/CRDS: abattement forfaitaire de 1,75 % (98,25 %) dans la limite de 4 PASS, puis 100 % au-delà.",
    "CSG déductible calculée à titre informatif (non utilisée dans la base imposable).",
    "La mutuelle patronale est une estimation forfaitaire (non réglementaire) et n'est pas calculée à partir du salaire.",
    "Le montant réel de la part employeur dépend du contrat collectif et des garanties.",
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
  employerHealthContributionEstimate: {
    centralMonthlyAmount: 40,
    lowMonthlyAmount: 30,
    highMonthlyAmount: 55,
    methodology: "fixed_estimate",
    regulatory: false,
    note: "Hypothèse technique forfaitaire basée sur des ordres de grandeur publiés (montants en euros) et conservée volontairement simple. Ne dépend pas du salaire.",
  },
} as const;

