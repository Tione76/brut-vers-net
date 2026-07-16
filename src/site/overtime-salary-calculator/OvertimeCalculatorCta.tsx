"use client";

const CALCULATOR_ANCHOR_ID = "calculateur";

function scrollToCalculator() {
  document
    .getElementById(CALCULATOR_ANCHOR_ID)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function OvertimeCalculatorCta() {
  return (
    <aside className="home-editorial__final-cta home-editorial__prose">
      <p className="home-editorial__final-cta-title">
        Calculez gratuitement vos heures supplémentaires
      </p>
      <p className="home-editorial__final-cta-text">
        Obtenez immédiatement une estimation de votre gain brut, de votre gain net et de votre
        nouveau salaire mensuel.
      </p>
      <button type="button" className="home-editorial__final-cta-btn" onClick={scrollToCalculator}>
        Calculer mes heures supplémentaires
      </button>
    </aside>
  );
}
