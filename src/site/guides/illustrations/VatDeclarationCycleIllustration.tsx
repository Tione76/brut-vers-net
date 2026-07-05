import { ILLU as c } from "./tokens";

/** Cycle de déclaration TVA */
export function VatDeclarationCycleIllustration() {
  const steps = [
    { n: "1", title: "Facturation", desc: "TVA collectée" },
    { n: "2", title: "Achats pro", desc: "TVA déductible" },
    { n: "3", title: "Déclaration", desc: "CA3 mensuelle/trim." },
    { n: "4", title: "Paiement", desc: "Solde à l'État" },
  ];

  return (
    <svg viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cycle de déclaration et paiement de la TVA">
      <rect width="720" height="280" fill={c.surfaceAlt} />
      <text x="360" y="32" textAnchor="middle" fill={c.text} fontSize="13" fontWeight="700" fontFamily={c.font}>
        Cycle mensuel ou trimestriel de la TVA
      </text>

      {steps.map((step, i) => {
        const x = 60 + i * 168;
        return (
          <g key={step.n}>
            {i < 3 && (
              <path d={`M ${x + 56} 140 L ${x + 112} 140`} stroke={c.brandMuted} strokeWidth="2" markerEnd="url(#cyc)" />
            )}
            <circle cx={x + 28} cy="140" r="28" fill={c.brand} />
            <text x={x + 28} y="146" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="700" fontFamily={c.font}>{step.n}</text>
            <text x={x + 28} y="190" textAnchor="middle" fill={c.text} fontSize="11" fontWeight="600" fontFamily={c.font}>{step.title}</text>
            <text x={x + 28} y="210" textAnchor="middle" fill={c.textMuted} fontSize="10" fontFamily={c.font}>{step.desc}</text>
          </g>
        );
      })}

      <rect x="160" y="230" width="400" height="36" rx="6" fill={c.brandLight} stroke={c.brandMuted} />
      <text x="360" y="254" textAnchor="middle" fill={c.brand} fontSize="11" fontWeight="600" fontFamily={c.font}>
        Art. 287 et 287 A du CGI — déclaration de TVA obligatoire
      </text>

      <defs>
        <marker id="cyc" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill={c.brandMuted} />
        </marker>
      </defs>
    </svg>
  );
}
