export interface NeutralRateBracket {
  /** Base mensuelle minimale incluse (€). */
  minInclusive: number;
  /** Base mensuelle maximale exclue (€). Utiliser Infinity pour la dernière tranche. */
  maxExclusive: number;
  /** Taux neutre par défaut (%) applicable à compter du 1er mai 2026. */
  rate: number;
}

export interface NeutralWithholdingRateSchedule {
  year: number;
  effectiveFrom: string;
  territory: "metropolitan_france";
  sourceName: "BOFiP";
  sourceId: "BOI-BAREME-000037";
  legalReference: "Article 204 H du Code général des impôts";
  lastReviewedAt: string;
  methodologyNote: string;
  brackets: readonly NeutralRateBracket[];
}

export interface NeutralWithholdingEstimate {
  rate: number;
  approximateBase: number;
  bracketVersion: string;
  isEstimation: true;
  methodologyNote: string;
}

export type WithholdingRateMode = "auto" | "manual";
