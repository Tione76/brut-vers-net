import {
  EPARGNE_RATES_APPLY_FROM_LABEL,
  euro,
  LDDS_CEILING_EUR,
  LDDS_RATE_LABEL,
  LEP_CEILING_EUR,
  LEP_RATE_LABEL,
  LIVRET_A_CEILING_EUR,
  LIVRET_A_RATE_LABEL,
} from "@/site/epargner-petit-salaire";

const CARDS = [
  {
    key: "lep",
    name: "LEP",
    full: "Livret d'épargne populaire",
    rate: LEP_RATE_LABEL,
    ceiling: LEP_CEILING_EUR,
    who: "Sous conditions de revenus.",
    highlight: true,
  },
  {
    key: "livret-a",
    name: "Livret A",
    full: null,
    rate: LIVRET_A_RATE_LABEL,
    ceiling: LIVRET_A_CEILING_EUR,
    who: "Sans condition de revenus.",
    highlight: false,
  },
  {
    key: "ldds",
    name: "LDDS",
    full: "Livret de développement durable et solidaire",
    rate: LDDS_RATE_LABEL,
    ceiling: LDDS_CEILING_EUR,
    who: "Sans condition de revenus. Domicile fiscal en France. Une personne rattachée au foyer fiscal de ses parents ne peut pas en ouvrir un.",
    highlight: false,
  },
] as const;

/** Trois fiches livrets comparables. Le LEP est mis en avant sans badge de taux. */
export function EpargneLivretsIllustration() {
  return (
    <div className="eps-livrets">
      <ul className="eps-livrets__grid" aria-label="Comparatif LEP, Livret A et LDDS">
        {CARDS.map((card) => (
          <li
            key={card.key}
            className={card.highlight ? "eps-livret eps-livret--lep" : "eps-livret"}
          >
            <div className="eps-livret__head">
              <p className="eps-livret__name">{card.name}</p>
              <p className="eps-livret__rate">
                <span className="eps-livret__rate-label">Taux annuel</span>
                <span className="eps-livret__rate-value">{card.rate}</span>
              </p>
            </div>
            {card.full ? <p className="eps-livret__full">{card.full}</p> : null}
            <p className="eps-livret__ceiling">
              <span className="eps-livret__meta-label">Plafond de dépôts</span>
              <span className="eps-livret__meta-value">{euro(card.ceiling)}</span>
            </p>
            <div className="eps-livret__who">
              <p className="eps-livret__who-label">Qui peut l&apos;ouvrir ?</p>
              <p className="eps-livret__who-text">{card.who}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="eps-livrets__note">
        Sur ces trois livrets, l&apos;argent reste disponible et les intérêts sont exonérés d&apos;impôt
        sur le revenu et de prélèvements sociaux. Taux applicables à partir du{" "}
        {EPARGNE_RATES_APPLY_FROM_LABEL}. Le versement initial et la façon de rapatrier l&apos;argent
        sur le compte courant dépendent de votre banque.
      </p>
    </div>
  );
}
