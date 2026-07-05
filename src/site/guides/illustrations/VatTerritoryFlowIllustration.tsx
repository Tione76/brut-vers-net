import { ILLU as c } from "./tokens";

/** Flux territorial — France, UE, hors UE */
export function VatTerritoryFlowIllustration() {
  const zones = [
    {
      title: "France",
      subtitle: "Métropole & DOM",
      rate: "20 %",
      rateLabel: "Taux normal",
      detail: "TVA facturée et reversée en France",
      x: 48,
      accent: c.brand,
    },
    {
      title: "Union européenne",
      subtitle: "Livraison B2B",
      rate: "0 %",
      rateLabel: "Autoliquidation",
      detail: "TVA due par l'acheteur (art. 283-2)",
      x: 260,
      accent: "#245a8a",
    },
    {
      title: "Hors UE",
      subtitle: "Export de biens",
      rate: "Exonération",
      rateLabel: "Export",
      detail: "Pas de TVA française (art. 262 I)",
      x: 472,
      accent: "#3a7ab5",
    },
  ];

  return (
    <svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma des taux de TVA selon le territoire : France, UE et hors UE">
      <defs>
        <marker id="vtf-arr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8" fill={c.brandMuted} />
        </marker>
      </defs>
      <rect width="720" height="320" fill={c.surfaceAlt} />
      <text x="360" y="28" textAnchor="middle" fill={c.text} fontSize="14" fontWeight="700" fontFamily={c.font}>
        Territoire d&apos;imposition — où applique-t-on la TVA ?
      </text>
      <text x="360" y="46" textAnchor="middle" fill={c.textMuted} fontSize="10" fontFamily={c.font}>
        Le lieu de la transaction détermine le régime fiscal applicable
      </text>

      {zones.map((zone, i) => (
        <g key={zone.title}>
          {i > 0 && (
            <path
              d={`M ${zones[i - 1].x + 200} 168 L ${zone.x - 12} 168`}
              stroke={c.brandMuted}
              strokeWidth="2.5"
              markerEnd="url(#vtf-arr)"
            />
          )}
          <rect x={zone.x} y="72" width="200" height="192" rx="10" fill={c.surface} stroke={c.border} strokeWidth="1.5" />
          <rect x={zone.x} y="72" width="200" height="6" rx="10" fill={zone.accent} />
          <text x={zone.x + 100} y="104" textAnchor="middle" fill={c.text} fontSize="13" fontWeight="700" fontFamily={c.font}>{zone.title}</text>
          <text x={zone.x + 100} y="122" textAnchor="middle" fill={c.textMuted} fontSize="9" fontFamily={c.font}>{zone.subtitle}</text>
          <rect x={zone.x + 40} y="136" width="120" height="52" rx="26" fill={zone.accent} />
          <text x={zone.x + 100} y="158" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9" fontWeight="600" fontFamily={c.font}>{zone.rateLabel}</text>
          <text x={zone.x + 100} y="178" textAnchor="middle" fill="#fff" fontSize={zone.rate === "Exonération" ? 14 : 22} fontWeight="800" fontFamily={c.font}>{zone.rate}</text>
          <text x={zone.x + 100} y="212" textAnchor="middle" fill={c.textSecondary} fontSize="9" fontFamily={c.font}>{zone.detail}</text>
        </g>
      ))}

      <rect x="80" y="278" width="560" height="32" rx="6" fill={c.brandLight} stroke={c.brandMuted} strokeWidth="1" />
      <text x="360" y="299" textAnchor="middle" fill={c.brand} fontSize="10" fontWeight="600" fontFamily={c.font}>
        France → TVA locale · UE B2B → autoliquidation · Export → exonération
      </text>
    </svg>
  );
}
