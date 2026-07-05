import { ILLU as c } from "./tokens";

/** Pyramide des taux de TVA — infographie premium */
export function VatRatesPyramidIllustration() {
  const tiers = [
    { rate: "20 %", label: "Taux normal", sub: "Règle générale", w: 560, color: c.brand, icon: "◆" },
    { rate: "10 %", label: "Intermédiaire", sub: "Exceptions sectorielles", w: 430, color: "#245a8a", icon: "◇" },
    { rate: "5,5 %", label: "Réduit", sub: "Produits de première nécessité", w: 300, color: "#3a7ab5", icon: "○" },
    { rate: "2,1 %", label: "Particulier", sub: "Cas très encadrés", w: 170, color: c.brandMuted, icon: "·" },
  ];

  return (
    <svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pyramide des quatre taux de TVA en France métropolitaine">
      <defs>
        <linearGradient id="pyr-bg" x1="0" y1="0" x2="720" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f7f9fb" />
          <stop offset="100%" stopColor="#eef4fa" />
        </linearGradient>
      </defs>
      <rect width="720" height="400" fill="url(#pyr-bg)" />
      <text x="360" y="34" textAnchor="middle" fill={c.text} fontSize="15" fontWeight="700" fontFamily={c.font}>
        Pyramide des taux de TVA — métropole
      </text>
      <text x="360" y="54" textAnchor="middle" fill={c.textMuted} fontSize="10" fontFamily={c.font}>
        Du plus courant (20 %) aux exceptions les plus rares (2,1 %)
      </text>

      {tiers.map((tier, i) => {
        const x = (720 - tier.w) / 2;
        const y = 72 + i * 72;
        return (
          <g key={tier.rate}>
            <rect x={x} y={y} width={tier.w} height="58" rx="8" fill={tier.color} />
            <text x={x + 28} y={y + 26} fill="rgba(255,255,255,0.9)" fontSize="14" fontFamily={c.font}>{tier.icon}</text>
            <text x={360} y={y + 26} textAnchor="middle" fill="#fff" fontSize="22" fontWeight="800" fontFamily={c.font}>
              {tier.rate}
            </text>
            <text x={360} y={y + 44} textAnchor="middle" fill="rgba(255,255,255,0.88)" fontSize="11" fontWeight="600" fontFamily={c.font}>
              {tier.label}
            </text>
            <text x={360} y={y + 58} textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9" fontFamily={c.font}>
              {tier.sub}
            </text>
          </g>
        );
      })}

      <rect x="140" y="368" width="440" height="22" rx="4" fill={c.surface} stroke={c.border} />
      <text x="360" y="383" textAnchor="middle" fill={c.textMuted} fontSize="9" fontFamily={c.font}>
        Art. 278 à 281 du CGI — le taux dépend de la nature de l&apos;opération, pas du métier
      </text>
    </svg>
  );
}
