"use client";

const CALCULATOR_ANCHOR_ID = "calculateur";

function scrollToCalculator() {
  document.getElementById(CALCULATOR_ANCHOR_ID)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function PasCalculatorCta() {
  return (
    <aside className="home-editorial__final-cta home-editorial__prose">
      <p className="home-editorial__final-cta-title">Testez votre prélèvement à la source</p>
      <p className="home-editorial__final-cta-text">
        Vous connaissez maintenant les mécanismes qui influencent le montant prélevé. Utilisez le
        simulateur en haut de page pour comparer un taux estimé et votre taux réel, puis visualiser
        immédiatement votre salaire après impôt.
      </p>
      <button type="button" className="home-editorial__final-cta-btn" onClick={scrollToCalculator}>
        Revenir au calculateur
      </button>
    </aside>
  );
}
