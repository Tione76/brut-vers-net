"use client";

const CALCULATOR_ANCHOR_ID = "calculateur";

function scrollToCalculator() {
  document
    .getElementById(CALCULATOR_ANCHOR_ID)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function DismissalCalculatorCta() {
  return (
    <aside className="home-editorial__final-cta home-editorial__prose">
      <p className="home-editorial__final-cta-title">
        Calculez gratuitement votre indemnité de licenciement
      </p>
      <p className="home-editorial__final-cta-text">
        Obtenez immédiatement une estimation du minimum légal à partir de votre salaire brut de
        référence, de votre ancienneté et de votre situation.
      </p>
      <button type="button" className="home-editorial__final-cta-btn" onClick={scrollToCalculator}>
        Calculer mon indemnité
      </button>
    </aside>
  );
}
