import {
  BANK_OFFERS,
  type BankCardPromo,
  type BankOffer,
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

function promoAmountParts(cents: number): { value: string; unit: string } {
  const label = formatCents(cents);
  return {
    value: label.replace(/\u00a0€$/, ""),
    unit: "€",
  };
}

function promoCopy(promo: BankCardPromo): {
  banner: string;
  prefix: string | null;
  suffix: string;
  hint: string | null;
} {
  if (promo.kind === "welcome") {
    return {
      banner: "Offre de bienvenue",
      prefix: promo.isMaximum ? "Jusqu'à" : null,
      suffix: "offerts",
      hint: null,
    };
  }
  return {
    banner: "Tarif mensuel",
    prefix: null,
    suffix: promo.suffix,
    hint: promo.hint ?? null,
  };
}

function BankCard({ offer }: { offer: BankOffer }) {
  const amount = promoAmountParts(offer.promo.amountCents);
  const copy = promoCopy(offer.promo);

  return (
    <article className="bp-card">
      <header className="bp-card__header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={`bp-card__logo bp-card__logo--${offer.logoDisplay}`}
          src={offer.logoSrc}
          alt=""
          width={offer.logoWidth}
          height={offer.logoHeight}
          decoding="async"
          loading="eager"
        />
        <h3 className="bp-card__offer">
          <span className="bp-card__sr">{offer.bankName}. </span>
          {offer.cardSubtitle}
        </h3>
      </header>

      <div className="bp-card__body">
        <div className="bp-card__promo">
          <p className="bp-card__promo-banner">{copy.banner}</p>
          <div className="bp-card__promo-body">
            {copy.prefix ? <p className="bp-card__promo-prefix">{copy.prefix}</p> : null}
            <p className="bp-card__promo-amount">
              {amount.value}
              <span className="bp-card__promo-unit">&nbsp;{amount.unit}</span>
            </p>
            <p className="bp-card__promo-suffix">{copy.suffix}</p>
            {copy.hint ? <p className="bp-card__promo-hint">{copy.hint}</p> : null}
          </div>
        </div>

        <div className="bp-card__points">
          <p className="bp-card__points-title">Les avantages</p>
          <ul className="bp-card__benefits">
            {offer.cardBenefits.map((benefit) => (
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
            rel="noopener noreferrer"
            target="_blank"
            aria-label={`Voir l'offre ${offer.bankName}`}
          >
            Voir l&apos;offre
            <span className="bp-card__cta-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

export function BankOfferCards() {
  return (
    <div className="bp-cards">
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
