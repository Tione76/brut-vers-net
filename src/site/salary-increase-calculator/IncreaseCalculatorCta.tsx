"use client";

const CALCULATOR_ANCHOR_ID = "calculateur";

function scrollToCalculator() {
  document.getElementById(CALCULATOR_ANCHOR_ID)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function IncreaseCalculatorCta() {
  return (
    <aside className="home-editorial__final-cta home-editorial__prose">
      <p className="home-editorial__final-cta-title">Testez votre augmentation de salaire</p>
      <p className="home-editorial__final-cta-text">
        Vous connaissez maintenant les principaux éléments qui influencent votre gain réel. Utilisez
        le simulateur situé en haut de cette page pour comparer différents scénarios et estimer
        immédiatement votre nouvelle rémunération.
      </p>
      <button type="button" className="home-editorial__final-cta-btn" onClick={scrollToCalculator}>
        Revenir au calculateur
      </button>
    </aside>
  );
}
