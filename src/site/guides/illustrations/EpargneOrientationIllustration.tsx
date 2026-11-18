import Link from "next/link";

const ROWS = [
  {
    situation: "Je finis souvent le mois à découvert",
    advice: "Repérez le paiement qui fait basculer le compte. Pausez le virement d'épargne s'il y contribue.",
    href: "#epargner-ou-rembourser",
    label: "Comprendre mon découvert",
  },
  {
    situation: "Je mets de côté, puis je reprends l'argent",
    advice: "Si c'est une facture prévisible, préparez-la à part plutôt que de toucher à votre réserve.",
    href: "#previsibles-et-imprevus",
    label: "Prévoir les factures à venir",
  },
  {
    situation: "Il me reste parfois un peu d'argent",
    advice: "Gardez de quoi tenir jusqu'à la prochaine paie, puis mettez de côté une partie du reste.",
    href: "#combien-mettre-de-cote",
    label: "Choisir un premier montant",
  },
  {
    situation: "Mon salaire change d'un mois à l'autre",
    advice: "Partez des mois bas. S'il ne reste rien, vous pouvez attendre un meilleur mois.",
    href: "#organiser-versements",
    label: "Adapter les versements",
  },
  {
    situation: "J'ai déjà une petite réserve",
    advice: "Vérifiez que vous pouvez récupérer l'argent vite si une dépense urgente arrive.",
    href: "#ou-conserver-premiere-epargne",
    label: "Où garder cette somme ?",
  },
] as const;

/** Carte d'orientation : cinq situations, conseil sous le titre, lien à droite. */
export function EpargneOrientationIllustration() {
  return (
    <div className="eps-orientation">
      <ul aria-label="Cinq situations et la partie du guide à lire en premier">
        {ROWS.map((row) => (
          <li key={row.href} className="eps-orientation__row">
            <div className="eps-orientation__body">
              <span className="eps-orientation__mark" aria-hidden="true" />
              <div className="eps-orientation__copy">
                <strong className="eps-orientation__situation">{row.situation}</strong>
                <span className="eps-orientation__advice">{row.advice}</span>
              </div>
            </div>
            <Link href={row.href} className="eps-orientation__link">
              {row.label}
              <span className="eps-orientation__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
