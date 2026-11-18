const STEPS = [
  {
    day: "28",
    title: "La paie arrive",
    text: "Le salaire est versé sur le compte.",
  },
  {
    day: "5",
    title: "Le loyer passe",
    text: "La plus grosse dépense du mois quitte le compte.",
  },
  {
    day: "8",
    title: "Vérifiez ce qu'il reste",
    text: "Après les principaux prélèvements, regardez le solde avant de décider du virement. D'autres paiements peuvent encore rester à prévoir.",
  },
] as const;

/** Frise de trois dates fictives : paie, loyer, puis contrôle du reste. */
export function EpargneFriseIllustration() {
  return (
    <div className="eps-frise">
      <ol className="eps-frise__list" aria-label="Ordre des dates dans le mois, exemple fictif">
        {STEPS.map((step) => (
          <li key={step.day} className="eps-frise__item">
            <span className="eps-frise__dot" aria-hidden="true" />
            <p className="eps-frise__day">Le {step.day}</p>
            <p className="eps-frise__title">{step.title}</p>
            <p className="eps-frise__text">{step.text}</p>
          </li>
        ))}
      </ol>
      <p className="eps-frise__note">
        Dates fictives. Le meilleur moment est celui où vous savez réellement ce qu&apos;il reste
        jusqu&apos;à la prochaine paie.
      </p>
    </div>
  );
}
