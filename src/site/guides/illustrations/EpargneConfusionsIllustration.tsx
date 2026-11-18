import { euro, MARGIN_SUBSCRIPTION_EUR } from "@/site/epargner-petit-salaire";

const ONE_SHOT_EUR = 40;

const ITEMS = [
  {
    marker: "↻",
    kind: "Économie qui se répète",
    title: `${euro(MARGIN_SUBSCRIPTION_EUR)} de moins tous les mois`,
    text: "Un abonnement résilié ou un forfait réduit libère la même somme chaque mois, tant que vous ne le reprenez pas.",
  },
  {
    marker: "1×",
    kind: "Somme reçue une seule fois",
    title: `${euro(ONE_SHOT_EUR)} une seule fois`,
    text: "Une vente ou un remboursement aide à constituer une réserve, mais ne revient pas le mois suivant.",
  },
  {
    marker: "→",
    kind: "Paiement décalé",
    title: "Facture payée plus tard",
    text: "La dépense n'a pas disparu : elle tombera plus tard. Garder cet argent de côté évite une mauvaise surprise.",
  },
] as const;

/** Trois situations proches, à ne pas confondre : repères neutres, sans notion de faute. */
export function EpargneConfusionsIllustration() {
  return (
    <div className="eps-confusions">
      <ul className="eps-confusions__list" aria-label="Trois situations à ne pas confondre">
        {ITEMS.map((item) => (
          <li key={item.title} className="eps-confusions__card">
            <span className="eps-confusions__marker" aria-hidden="true">
              {item.marker}
            </span>
            <p className="eps-confusions__kind">{item.kind}</p>
            <p className="eps-confusions__title">{item.title}</p>
            <p className="eps-confusions__text">{item.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
