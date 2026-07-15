/** Schéma pédagogique : où vont les cotisations salariales */
export function CotisationsSalarialesDestinationsIllustration() {
  return (
    <svg
      viewBox="0 0 720 280"
      role="img"
      aria-labelledby="cotisations-dest-title cotisations-dest-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="cotisations-dest-title">{"Destination des cotisations salariales"}</title>
      <desc id="cotisations-dest-desc">
        Représentation simplifiée du salaire brut réparti entre cotisations salariales et salaire net
        avant impôt, avec les principaux dispositifs financés.
      </desc>

      <defs>
        <filter id="cot-shadow" x="-4%" y="-4%" width="108%" height="108%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#161616" floodOpacity="0.06" />
        </filter>
      </defs>

      {/* Brut */}
      <rect x="24" y="100" width="120" height="72" rx="10" fill="#fff4ed" stroke="#f2d5bc" strokeWidth="1.5" filter="url(#cot-shadow)" />
      <text x="84" y="132" fill="#f28539" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">
        SALAIRE BRUT
      </text>
      <rect x="44" y="144" width="80" height="8" rx="2" fill="#f2d5bc" />

      <text x="160" y="140" fill="#f28539" fontSize="16" fontWeight="700" fontFamily="system-ui, sans-serif">→</text>

      {/* Cotisations */}
      <rect x="176" y="88" width="130" height="96" rx="10" fill="#ecfdf3" stroke="#b8d9c4" strokeWidth="1.5" filter="url(#cot-shadow)" />
      <text x="241" y="118" fill="#18753c" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">
        COTISATIONS
      </text>
      <text x="241" y="130" fill="#18753c" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">
        SALARIALES
      </text>
      <rect x="196" y="142" width="90" height="6" rx="2" fill="#b8d9c4" />
      <rect x="196" y="154" width="70" height="6" rx="2" fill="#b8d9c4" />
      <rect x="196" y="166" width="80" height="6" rx="2" fill="#b8d9c4" />

      {/* Flèches vers dispositifs */}
      <path d="M306 120 L340 120 L340 48 L374 48" stroke="#f28539" strokeWidth="1.5" fill="none" />
      <path d="M306 136 L340 136 L340 136 L374 136" stroke="#f28539" strokeWidth="1.5" fill="none" />
      <path d="M306 152 L340 152 L340 224 L374 224" stroke="#f28539" strokeWidth="1.5" fill="none" />
      <polygon points="374,44 382,48 374,52" fill="#f28539" />
      <polygon points="374,132 382,136 374,140" fill="#f28539" />
      <polygon points="374,220 382,224 374,228" fill="#f28539" />

      {/* Dispositifs */}
      <rect x="384" y="28" width="140" height="40" rx="8" fill="#fff4ed" stroke="#f2d5bc" strokeWidth="1" />
      <text x="454" y="52" fill="#161616" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="system-ui, sans-serif">
        Assurance maladie
      </text>

      <rect x="384" y="116" width="140" height="40" rx="8" fill="#fff4ed" stroke="#f2d5bc" strokeWidth="1" />
      <text x="454" y="140" fill="#161616" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="system-ui, sans-serif">
        Retraite
      </text>

      <rect x="384" y="204" width="140" height="40" rx="8" fill="#fff4ed" stroke="#f2d5bc" strokeWidth="1" />
      <text x="454" y="228" fill="#161616" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="system-ui, sans-serif">
        Protection sociale
      </text>

      <text x="548" y="140" fill="#f28539" fontSize="16" fontWeight="700" fontFamily="system-ui, sans-serif">→</text>

      {/* Net avant impôt */}
      <rect x="568" y="100" width="128" height="72" rx="10" fill="#f28539" filter="url(#cot-shadow)" />
      <text x="632" y="128" fill="#fff6f0" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">
        SALAIRE NET
      </text>
      <text x="632" y="140" fill="#fff6f0" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">
        AVANT IMPÔT
      </text>
      <rect x="588" y="152" width="88" height="8" rx="2" fill="rgba(255,255,255,0.35)" />

      <text x="360" y="268" fill="#6b7280" fontSize="11" textAnchor="middle" fontFamily="system-ui, sans-serif">
        Schéma simplifié : les cotisations salariales financent la protection sociale avant le net
      </text>
    </svg>
  );
}
