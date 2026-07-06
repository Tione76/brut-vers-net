import { ILLU as c } from "./tokens";

/** Plafonds CA auto-entrepreneur et franchise TVA */
export function AeFranchiseLimitsIllustration() {
  const bars = [
    { label: "Services (BNC/BIC)", base: 0.44, major: 0.49 },
    { label: "Ventes / restauration", base: 1, major: 1.1 },
  ];

  return (
    <svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Plafonds de chiffre d'affaires et franchise TVA">
      <rect width="720" height="300" fill={c.surfaceAlt} />
      <text x="360" y="32" textAnchor="middle" fill={c.text} fontSize="13" fontWeight="700" fontFamily={c.font}>
        Double plafond : micro-entreprise et franchise TVA
      </text>

      {bars.map((bar, i) => {
        const y = 70 + i * 100;
        return (
          <g key={bar.label}>
            <text x="48" y={y + 16} fill={c.text} fontSize="11" fontWeight="600" fontFamily={c.font}>{bar.label}</text>
            <rect x="200" y={y} width={400 * bar.base} height="24" rx="4" fill={c.brand} />
            <text x={200 + 400 * bar.base + 8} y={y + 17} fill={c.brand} fontSize="10" fontWeight="600" fontFamily={c.font}>Seuil base</text>
            <rect x="200" y={y + 36} width={400 * bar.major} height="16" rx="4" fill={c.brandMuted} opacity="0.6" />
            <text x={200 + 400 * bar.major + 8} y={y + 48} fill={c.textMuted} fontSize="10" fontFamily={c.font}>Seuil majoré</text>
          </g>
        );
      })}

      <rect x="48" y="230" width="624" height="48" rx="6" fill={c.brandLight} stroke={c.brandMuted} />
      <text x="360" y="252" textAnchor="middle" fill={c.text} fontSize="10" fontFamily={c.font}>
        Services : 37 500 € / 41 250 € — Ventes : 85 000 € / 93 500 €
      </text>
      <text x="360" y="268" textAnchor="middle" fill={c.textMuted} fontSize="9" fontFamily={c.font}>
        Seuils TVA (art. 293 B) — distincts des plafonds micro-fiscal
      </text>
    </svg>
  );
}
