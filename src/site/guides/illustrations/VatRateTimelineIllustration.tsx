import { ILLU as c } from "./tokens";

/** Chronologie — 4 étapes pour déterminer le taux de TVA */
export function VatRateTimelineIllustration() {
  const steps = [
    { num: "1", title: "Identifier la nature", lines: ["Bien ou service ?", "Secteur d'activité ?"] },
    { num: "2", title: "Catégorie CGI", lines: ["Articles 278 à 281", "du code général"] },
    { num: "3", title: "Appliquer le taux", lines: ["20 %, 10 %, 5,5 %", "ou 2,1 %"] },
    { num: "4", title: "Ventiler la facture", lines: ["Bases et montants", "de TVA par taux"] },
  ];

  return (
    <svg viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Chronologie en quatre étapes pour déterminer et appliquer le taux de TVA">
      <defs>
        <marker id="vrt-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill={c.brandMuted} />
        </marker>
      </defs>
      <rect width="720" height="280" fill={c.surfaceAlt} />
      <text x="360" y="28" textAnchor="middle" fill={c.text} fontSize="14" fontWeight="700" fontFamily={c.font}>
        Méthode en 4 étapes — du produit au taux
      </text>
      <text x="360" y="46" textAnchor="middle" fill={c.textMuted} fontSize="10" fontFamily={c.font}>
        Processus systématique pour choisir le bon taux et facturer correctement
      </text>

      <line x1="108" y1="118" x2="612" y2="118" stroke={c.brandMuted} strokeWidth="2" />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M ${168 + i * 148} 118 L ${208 + i * 148} 118`}
          stroke={c.brandMuted}
          strokeWidth="2"
          markerEnd="url(#vrt-arr)"
        />
      ))}

      {steps.map((step, i) => {
        const cx = 108 + i * 148;
        return (
          <g key={step.num}>
            <circle cx={cx} cy="118" r="28" fill={c.brand} />
            <text x={cx} y="124" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800" fontFamily={c.font}>{step.num}</text>
            <rect x={cx - 66} y="158" width="132" height="72" rx="8" fill={c.surface} stroke={c.border} strokeWidth="1.5" />
            <text x={cx} y="180" textAnchor="middle" fill={c.text} fontSize="11" fontWeight="700" fontFamily={c.font}>{step.title}</text>
            <text x={cx} y="200" textAnchor="middle" fill={c.textMuted} fontSize="9" fontFamily={c.font}>{step.lines[0]}</text>
            <text x={cx} y="216" textAnchor="middle" fill={c.textMuted} fontSize="9" fontFamily={c.font}>{step.lines[1]}</text>
          </g>
        );
      })}

      <rect x="120" y="248" width="480" height="24" rx="4" fill={c.brandLight} stroke={c.brandMuted} />
      <text x="360" y="264" textAnchor="middle" fill={c.brand} fontSize="9" fontWeight="600" fontFamily={c.font}>
        En cas de doute sur l&apos;étape 2 → consulter le BOFiP ou solliciter un avis fiscal
      </text>
    </svg>
  );
}
