import Link from "next/link";
import {
  BANK_GUIDE_DISCLOSURE,
  BANK_GUIDE_SOURCES as S,
  BANK_GUIDE_SOURCES_VERIFIED_AT_LABEL,
  BANK_OFFERS,
} from "./data";
import "./bank-cards.css";

export function BankMethodSection() {
  return (
    <section className="bp-method" aria-labelledby="bp-method-title">
      <h2 id="bp-method-title">Comment avons-nous comparé ces offres&nbsp;?</h2>
      <p>
        Périmètre : compte de dépôt individuel en France, usage personnel, avec une carte de
        paiement. Nous avons retenu quatre formules sans condition de revenus publiée, utiles pour
        un budget proche du SMIC ou inférieur à 2&nbsp;000&nbsp;€ nets. La sélection est non
        exhaustive. L&apos;ordre est alphabétique, sans classement.
      </p>
      <p>
        Critères retenus : cotisation réelle selon l&apos;usage, conditions d&apos;ouverture,
        premier versement, paiements et retraits en euros, dépôts de chèques ou d&apos;espèces,
        canaux de contact, et primes de bienvenue applicables à la formule présentée.
      </p>
      <p>
        Sources consultées le {BANK_GUIDE_SOURCES_VERIFIED_AT_LABEL} : pages produit et brochures
        tarifaires des banques, plus les fiches{" "}
        <a href={S.servicePublicDroitAuCompte.href} rel="noopener noreferrer" target="_blank">
          Service-Public
        </a>{" "}
        et{" "}
        <a href={S.bdfDroitAuCompte.href} rel="noopener noreferrer" target="_blank">
          Banque de France
        </a>{" "}
        pour le droit au compte. Analyse documentaire : nous n&apos;avons pas testé les parcours
        d&apos;ouverture en conditions réelles ni interrogé de clients.
      </p>
      <p>{BANK_GUIDE_DISCLOSURE}</p>
      <ul className="bp-method__sources">
        {BANK_OFFERS.map((offer) => (
          <li key={offer.id}>
            <a href={offer.productUrl} rel="noopener noreferrer" target="_blank">
              {offer.shortLabel}
            </a>
            {" · "}
            <a href={offer.tariffUrl} rel="noopener noreferrer" target="_blank">
              Tarifs ({offer.tariffEffectiveFrom})
            </a>
          </li>
        ))}
      </ul>
      <p>
        Pour estimer un salaire net de référence avant de choisir un compte, vous pouvez utiliser le{" "}
        <Link href="/">calculateur brut vers net</Link> ou consulter le guide sur le{" "}
        <Link href="/smic">SMIC</Link>.
      </p>
      <p className="bp-method__back">
        <a href="#bp-cards-top">Revoir les quatre offres</a>
      </p>
    </section>
  );
}
