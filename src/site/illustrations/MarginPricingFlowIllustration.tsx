import { ILLU as c } from "../guides/illustrations/tokens";

/** Schéma : achat HT → taux de marge → vente HT → TVA → TTC */
export function MarginPricingFlowIllustration() {
  const steps = [
    { label: "Prix d'achat HT", value: "100 €", fill: c.surface, stroke: c.border, text: c.text },
    { label: "Taux de marge", value: "+ 40 %", fill: c.brandLight, stroke: c.brandMuted, text: c.brand },
    { label: "Prix de vente HT", value: "140 €", fill: c.surface, stroke: c.border, text: c.text },
    { label: "TVA 20 %", value: "+ 28 €", fill: c.brandLight, stroke: c.brandMuted, text: c.brand },
    { label: "Prix TTC", value: "168 €", fill: c.brand, stroke: c.brand, text: "#ffffff", muted: "rgba(255,255,255,0.75)" },
  ];

  const boxW = 200;
  const boxH = 72;
  const startX = (720 - boxW) / 2;
  let y = 24;

  return (
    <svg
      viewBox="0 0 720 460"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Du prix d'achat HT au prix TTC : taux de marge, prix de vente HT, TVA"
    >
      <rect width="720" height="460" fill={c.surfaceAlt} />

      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const boxY = y;
        y += boxH + (isLast ? 0 : 36);

        return (
          <g key={step.label}>
            <rect
              x={startX}
              y={boxY}
              width={boxW}
              height={boxH}
              rx="8"
              fill={step.fill}
              stroke={step.stroke}
              strokeWidth="1.5"
            />
            <text
              x={startX + boxW / 2}
              y={boxY + 26}
              textAnchor="middle"
              fill={step.muted ?? c.textMuted}
              fontSize="10"
              fontWeight="600"
              letterSpacing="0.06em"
              fontFamily={c.font}
            >
              {step.label.toUpperCase()}
            </text>
            <text
              x={startX + boxW / 2}
              y={boxY + 54}
              textAnchor="middle"
              fill={step.text}
              fontSize="22"
              fontWeight="700"
              fontFamily={c.font}
            >
              {step.value}
            </text>
            {!isLast && (
              <path
                d={`M ${startX + boxW / 2} ${boxY + boxH + 4} L ${startX + boxW / 2} ${boxY + boxH + 28}`}
                stroke={c.brandMuted}
                strokeWidth="2"
                markerEnd="url(#margin-flow-arrow)"
              />
            )}
          </g>
        );
      })}

      <defs>
        <marker id="margin-flow-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill={c.brandMuted} />
        </marker>
      </defs>
    </svg>
  );
}
