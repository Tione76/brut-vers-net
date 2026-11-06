import {
  BANK_OFFERS,
  offerProductRel,
  type BankOffer,
  type BankWelcomePromo,
} from "./data";
import { formatCents } from "./engine";
import "./bank-cards.css";

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M3 9.2 7.1 13.2 15 4.8"
        stroke="#F28539"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function welcomeAmountParts(cents: number): { value: string; unit: string } {
  const label = formatCents(cents);
  return {
    value: label.replace(/\u00a0€$/, ""),
    unit: "€",
  };
}

function WelcomePromo({ promo }: { promo: BankWelcomePromo }) {
  if (promo.kind === "none") {
    return (
      <div className="bp-card__promo bp-card__promo--empty">
        <p className="bp-card__promo-banner">Offre de bienvenue</p>
        <div className="bp-card__promo-body">
          <p className="bp-card__promo-none">{promo.note}</p>
        </div>
      </div>
    );
  }

  const amount = welcomeAmountParts(promo.amountCents);

  return (
    <div className="bp-card__promo">
      <p className="bp-card__promo-banner">Offre de bienvenue</p>
      <div className="bp-card__promo-body">
        {promo.isMaximum ? <p className="bp-card__promo-prefix">Jusqu&apos;à</p> : null}
        <p className="bp-card__promo-amount">
          {amount.value}
          <span className="bp-card__promo-unit">&nbsp;{amount.unit}</span>
        </p>
        <p className="bp-card__promo-suffix">offerts</p>
        <p className="bp-card__promo-hint">{promo.conditionsShort}</p>
      </div>
    </div>
  );
}

export type BankCardProps = {
  offer: BankOffer;
  /** Variante plus courte pour les analyses. */
  compact?: boolean;
  /** Affiche le lien interne « Comprendre cette offre ». */
  showUnderstandLink?: boolean;
};

/**
 * Carte d'offre : lien principal étendu (offre officielle) + lien secondaire interne.
 * Aucun lien imbriqué. Fonctionne sans JavaScript pour la navigation externe.
 */
export function BankCard({
  offer,
  compact = false,
  showUnderstandLink = !compact,
}: BankCardProps) {
  const benefits = compact ? offer.compactBenefits : offer.cardBenefits;
  const rel = offerProductRel(offer);

  return (
    <article
      className={`bp-card${compact ? " bp-card--compact" : ""}`}
      data-bank-id={offer.id}
    >
      <header className="bp-card__header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={`bp-card__logo bp-card__logo--${offer.logoDisplay}`}
          src={offer.logoSrc}
          alt=""
          width={offer.logoWidth}
          height={offer.logoHeight}
          decoding="async"
          loading={compact ? "lazy" : "eager"}
        />
        <h3 className="bp-card__offer">
          <span className="bp-card__sr">{offer.bankName}. </span>
          {offer.cardSubtitle}
        </h3>
      </header>

      <div className="bp-card__body">
        <WelcomePromo promo={offer.welcome} />

        <div className="bp-card__points">
          <p className="bp-card__points-title">Les avantages</p>
          <ul className="bp-card__benefits">
            {benefits.map((benefit) => (
              <li key={`${benefit.prefix ?? ""}${benefit.strong}${benefit.suffix ?? ""}`}>
                <CheckIcon />
                <span>
                  {benefit.prefix ?? ""}
                  <strong>{benefit.strong}</strong>
                  {benefit.suffix ?? ""}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bp-card__action">
          <a
            className="bp-card__cta"
            href={offer.productUrl}
            rel={rel}
            target="_blank"
            aria-label={`Voir l'offre ${offer.bankName} ${offer.offerName} (site officiel)`}
          >
            Voir l&apos;offre
            <span className="bp-card__cta-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>

      {showUnderstandLink ? (
        <p className="bp-card__understand-wrap">
          <a
            className="bp-card__understand"
            href={`#${offer.decryptAnchor}`}
            data-bp-open-tab="detail"
            data-bp-scroll-to={offer.decryptAnchor}
          >
            Comprendre cette offre
          </a>
        </p>
      ) : null}
    </article>
  );
}

export function BankOfferCards() {
  return (
    <div className="bp-cards" id="bp-cards-top">
      <h2 className="bp-cards__title">Comparer les comptes</h2>
      <ul className="bp-cards__list">
        {BANK_OFFERS.map((offer) => (
          <li key={offer.id}>
            <BankCard offer={offer} />
          </li>
        ))}
      </ul>
    </div>
  );
}
