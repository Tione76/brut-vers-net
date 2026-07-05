import { ILLU as c } from "./tokens";

/** Arbre de décision — quel taux appliquer */
export function VatRateSelectionIllustration() {
  const branches = [
    { label: "Produit alimentaire", rate: "5,5 %", x: 48, note: "Hors restauration" },
    { label: "Travaux rénovation", rate: "10 %", x: 260, note: "Logement +2 ans" },
    { label: "Prestation courante", rate: "20 %", x: 472, note: "Règle par défaut" },
  ];

  return (
    <svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Arbre de décision pour choisir le taux de TVA">
      <rect width="720" height="420" fill={c.surfaceAlt} />
      <text x="360" y="28" textAnchor="middle" fill={c.text} fontSize="14" fontWeight="700" fontFamily={c.font}>
        Quel taux appliquer ? — logique de décision
      </text>

      <rect x="250" y="44" width="220" height="52" rx="26" fill={c.brand} />
      <text x="360" y="68" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9" fontWeight="600" letterSpacing="0.05em" fontFamily={c.font}>ÉTAPE 1</text>
      <text x="360" y="86" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="600" fontFamily={c.font}>Nature exacte du bien ou service ?</text>

      <path d="M 360 96 L 360 118" stroke={c.brandMuted} strokeWidth="2" />
      <path d="M 124 118 L 596 118" stroke={c.brandMuted} strokeWidth="2" />
      {branches.map((b) => (
        <path key={b.x} d={`M ${b.x + 100} 118 L ${b.x + 100} 138`} stroke={c.brandMuted} strokeWidth="2" />
      ))}

      {branches.map((b) => (
        <g key={b.label}>
          <rect x={b.x} y="138" width="200" height="72" rx="8" fill={c.surface} stroke={c.border} strokeWidth="1.5" />
          <text x={b.x + 100} y="164" textAnchor="middle" fill={c.text} fontSize="11" fontWeight="600" fontFamily={c.font}>{b.label}</text>
          <rect x={b.x + 52} y="174" width="96" height="28" rx="14" fill={c.brandLight} stroke={c.brandMuted} />
          <text x={b.x + 100} y="193" textAnchor="middle" fill={c.brand} fontSize="13" fontWeight="800" fontFamily={c.font}>{b.rate}</text>
          <text x={b.x + 100} y="218" textAnchor="middle" fill={c.textMuted} fontSize="9" fontFamily={c.font}>{b.note}</text>
        </g>
      ))}

      <rect x="80" y="248" width="560" height="148" rx="10" fill={c.brandLight} stroke={c.brandMuted} strokeWidth="1" />
      <text x="360" y="276" textAnchor="middle" fill={c.brand} fontSize="12" fontWeight="700" fontFamily={c.font}>⚠ Cas particuliers à vérifier</text>
      <text x="100" y="304" fill={c.text} fontSize="11" fontFamily={c.font}>• Médicaments remboursables → 2,1 % (art. 281)</text>
      <text x="100" y="326" fill={c.text} fontSize="11" fontFamily={c.font}>• Restauration sur place → 10 % (art. 279)</text>
      <text x="100" y="348" fill={c.text} fontSize="11" fontFamily={c.font}>• Livres papier et numériques → 5,5 % (art. 278-0 bis)</text>
      <text x="400" y="304" fill={c.text} fontSize="11" fontFamily={c.font}>• Export hors UE → exonération (art. 262 I)</text>
      <text x="400" y="326" fill={c.text} fontSize="11" fontFamily={c.font}>• Livraison intracommunautaire B2B → 0 %</text>
      <text x="400" y="348" fill={c.text} fontSize="11" fontFamily={c.font}>• En cas de doute → taux normal ou avis fiscal</text>
    </svg>
  );
}
