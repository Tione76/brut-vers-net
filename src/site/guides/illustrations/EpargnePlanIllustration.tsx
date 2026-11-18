const STEPS = [
  {
    title: "Repérez ce qui vous bloque",
    text: "Découvert qui revient, facture annuelle difficile, ou mois où il ne reste rien.",
  },
  {
    title: "Vérifiez une facture, un prélèvement ou une aide",
    text: "Ouvrez un document précis : dernière facture mobile, avis d'échéance, ou simulateur officiel.",
  },
  {
    title: "Changez une chose que vous pouvez vérifier le mois suivant",
    text: "Un forfait, un abonnement, ou l'organisation des courses : une seule action à contrôler.",
  },
  {
    title: "Choisissez une somme à mettre de côté",
    text: "Gardez d'abord de quoi payer jusqu'à la prochaine paie.",
  },
  {
    title: "Refaites le point à la prochaine paie et ajustez",
    text: "Si rien ne reste, regardez les aides et un Point conseil budget plutôt qu'un virement forcé.",
  },
] as const;

/** Plan en cinq étapes : pastilles orange numérotées sur un seul support. */
export function EpargnePlanIllustration() {
  return (
    <div className="eps-plan">
      <ol className="eps-plan__list" aria-label="Cinq étapes pour commencer ce mois-ci">
        {STEPS.map((step) => (
          <li key={step.title} className="eps-plan__step">
            <div>
              <p className="eps-plan__title">{step.title}</p>
              <p className="eps-plan__text">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
