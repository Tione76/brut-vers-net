/** Mockup pédagogique : zone prélèvement à la source sur une fiche de paie */
export function PrelevementSourceFichePaieIllustration() {
  return (
    <svg
      viewBox="0 0 720 320"
      role="img"
      aria-labelledby="pas-fiche-title pas-fiche-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="pas-fiche-title">{"Emplacement du prélèvement à la source sur une fiche de paie"}</title>
      <desc id="pas-fiche-desc">
        {"Extrait simplifié d'un bulletin de salaire mettant en évidence le net imposable, le taux de prélèvement à la source, le montant retenu et le net versé."}
      </desc>

      <defs>
        <filter id="pas-fiche-shadow" x="-4%" y="-4%" width="108%" height="108%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#161616" floodOpacity="0.06" />
        </filter>
      </defs>

      {/* Document */}
      <rect x="80" y="24" width="560" height="272" rx="12" fill="#ffffff" stroke="#e4e8ed" filter="url(#pas-fiche-shadow)" />

      {/* Net avant impôt (contexte) */}
      <rect x="96" y="44" width="528" height="40" rx="8" fill="#f7f9fb" stroke="#dde3ea" strokeWidth="1" />
      <text x="112" y="68" fill="#6b7280" fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">
        NET AVANT IMPÔT · après cotisations
      </text>
      <rect x="480" y="58" width="120" height="8" rx="2" fill="#e4e8ed" />

      {/* Zone PAS mise en avant */}
      <rect x="96" y="96" width="528" height="128" rx="10" fill="#fff4ed" stroke="#f28539" strokeWidth="2" />
      <rect x="96" y="96" width="6" height="128" rx="3" fill="#f28539" />
      <text x="118" y="122" fill="#f28539" fontSize="12" fontWeight="700" fontFamily="system-ui, sans-serif">
        PRÉLÈVEMENT À LA SOURCE
      </text>

      {/* Net imposable */}
      <rect x="112" y="136" width="496" height="32" rx="6" fill="#ffffff" stroke="#f2d5bc" strokeWidth="1" />
      <text x="128" y="156" fill="#161616" fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">
        Net imposable
      </text>
      <rect x="400" y="148" width="180" height="8" rx="2" fill="#f2d5bc" />

      {/* Taux */}
      <rect x="112" y="176" width="240" height="32" rx="6" fill="#ecfdf3" stroke="#b8d9c4" strokeWidth="1" />
      <text x="128" y="196" fill="#18753c" fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">
        Taux de PAS
      </text>
      <rect x="200" y="188" width="60" height="8" rx="2" fill="#b8d9c4" />

      {/* Montant retenu */}
      <rect x="368" y="176" width="240" height="32" rx="6" fill="#ecfdf3" stroke="#b8d9c4" strokeWidth="1" />
      <text x="384" y="196" fill="#18753c" fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">
        Montant retenu
      </text>
      <rect x="480" y="188" width="100" height="8" rx="2" fill="#b8d9c4" />

      {/* Net versé */}
      <rect x="96" y="240" width="528" height="44" rx="8" fill="#f28539" />
      <text x="118" y="268" fill="#fff6f0" fontSize="12" fontWeight="700" fontFamily="system-ui, sans-serif">
        NET VERSÉ · salaire net après impôt
      </text>
      <rect x="480" y="258" width="120" height="10" rx="2" fill="rgba(255,255,255,0.35)" />

      <text x="360" y="308" fill="#6b7280" fontSize="11" textAnchor="middle" fontFamily="system-ui, sans-serif">
        Schéma simplifié · zone fiscale du bulletin, après les cotisations salariales
      </text>
    </svg>
  );
}
