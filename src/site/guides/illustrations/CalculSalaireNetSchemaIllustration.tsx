/** Schéma pédagogique : les étapes du calcul brut vers net */
export function CalculSalaireNetSchemaIllustration() {
  return (
    <svg
      viewBox="0 0 720 200"
      role="img"
      aria-labelledby="calcul-schema-title calcul-schema-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="calcul-schema-title">{"Schéma du calcul du salaire net"}</title>
      <desc id="calcul-schema-desc">
        Représentation simplifiée du passage du salaire brut au salaire net versé en cinq étapes.
      </desc>

      <defs>
        <filter id="calc-shadow" x="-4%" y="-4%" width="108%" height="108%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#161616" floodOpacity="0.06" />
        </filter>
      </defs>

      {/* Brut */}
      <rect x="20" y="60" width="110" height="80" rx="10" fill="#fff4ed" stroke="#f2d5bc" strokeWidth="1.5" filter="url(#calc-shadow)" />
      <text x="75" y="92" fill="#f28539" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">
        BRUT
      </text>
      <text x="75" y="118" fill="#161616" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">
        2 500 €
      </text>

      <text x="148" y="104" fill="#f28539" fontSize="18" fontWeight="700" fontFamily="system-ui, sans-serif">−</text>

      {/* Cotisations */}
      <rect x="168" y="60" width="110" height="80" rx="10" fill="#ecfdf3" stroke="#b8d9c4" strokeWidth="1.5" filter="url(#calc-shadow)" />
      <text x="223" y="92" fill="#18753c" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">
        COTISATIONS
      </text>
      <text x="223" y="118" fill="#6b7280" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="system-ui, sans-serif">
        ~ 521 €
      </text>

      <text x="296" y="104" fill="#f28539" fontSize="18" fontWeight="700" fontFamily="system-ui, sans-serif">=</text>

      {/* Net avant impôt */}
      <rect x="316" y="60" width="120" height="80" rx="10" fill="#fff4ed" stroke="#f2d5bc" strokeWidth="1.5" filter="url(#calc-shadow)" />
      <text x="376" y="88" fill="#f28539" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">
        NET AVANT
      </text>
      <text x="376" y="100" fill="#f28539" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">
        IMPÔT
      </text>
      <text x="376" y="122" fill="#161616" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">
        1 978 €
      </text>

      <text x="454" y="104" fill="#f28539" fontSize="18" fontWeight="700" fontFamily="system-ui, sans-serif">−</text>

      {/* PAS */}
      <rect x="474" y="60" width="100" height="80" rx="10" fill="#ecfdf3" stroke="#b8d9c4" strokeWidth="1.5" filter="url(#calc-shadow)" />
      <text x="524" y="92" fill="#18753c" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">
        PAS
      </text>
      <text x="524" y="118" fill="#6b7280" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="system-ui, sans-serif">
        Taux perso.
      </text>

      <text x="592" y="104" fill="#f28539" fontSize="18" fontWeight="700" fontFamily="system-ui, sans-serif">=</text>

      {/* Net versé */}
      <rect x="612" y="60" width="88" height="80" rx="10" fill="#f28539" filter="url(#calc-shadow)" />
      <text x="656" y="92" fill="#fff6f0" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">
        NET VERSÉ
      </text>
      <text x="656" y="122" fill="#ffffff" fontSize="13" fontWeight="800" textAnchor="middle" fontFamily="system-ui, sans-serif">
        ?
      </text>

      {/* Légende */}
      <text x="360" y="178" fill="#6b7280" fontSize="11" textAnchor="middle" fontFamily="system-ui, sans-serif">
        Montants indicatifs · salarié non-cadre · 2 500 € brut
      </text>
    </svg>
  );
}
