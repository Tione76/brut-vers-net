/** Visuel pédagogique : les 5 étapes pour calculer son salaire net */
export function CalculSalaireNetEtapesIllustration() {
  const steps = [
    { num: "1", title: "Salaire brut", color: "#f28539" },
    { num: "2", title: "Cotisations", color: "#18753c" },
    { num: "3", title: "Net avant impôt", color: "#f28539" },
    { num: "4", title: "Prélèvement", color: "#18753c" },
    { num: "5", title: "Net versé", color: "#f28539" },
  ];

  return (
    <svg
      viewBox="0 0 720 160"
      role="img"
      aria-labelledby="calcul-etapes-title calcul-etapes-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="calcul-etapes-title">{"Les cinq étapes du calcul du salaire net"}</title>
      <desc id="calcul-etapes-desc">
        Cinq étapes numérotées pour passer du salaire brut au salaire net versé.
      </desc>

      {steps.map((step, i) => {
        const x = 36 + i * 136;
        const isGreen = step.color === "#18753c";
        return (
          <g key={step.num}>
            <circle cx={x + 44} cy="52" r="28" fill={isGreen ? "#ecfdf3" : "#fff4ed"} stroke={isGreen ? "#b8d9c4" : "#f2d5bc"} strokeWidth="1.5" />
            <text x={x + 44} y="58" fill={step.color} fontSize="18" fontWeight="800" textAnchor="middle" fontFamily="system-ui, sans-serif">
              {step.num}
            </text>
            <text x={x + 44} y="108" fill="#161616" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="system-ui, sans-serif">
              {step.title}
            </text>
            {i < steps.length - 1 && (
              <text x={x + 88} y="56" fill="#f28539" fontSize="16" fontWeight="700" fontFamily="system-ui, sans-serif">
                →
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
